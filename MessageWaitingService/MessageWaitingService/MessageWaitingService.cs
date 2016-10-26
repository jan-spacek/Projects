using System;
using System.Collections.Generic;
using System.Configuration;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Sockets;
using System.ServiceProcess;
using System.Threading;
using System.Timers;

namespace MessageWaitingService
{
    public partial class MessageWaitingService : ServiceBase
    {
        private EventLog eventLog;
        private Thread thread;
        private NetworkStream stream = null;
        private List<Extension> extensions = new List<Extension>();
        private Int32 eventId = 12345;
        private volatile bool _requestStop = false;
        private ManualResetEvent resetEvent = new ManualResetEvent(false);

        public MessageWaitingService()
        {
            InitializeComponent();

            ServiceName = "MessageWaitingService";

            AutoLog = false;

            if (!EventLog.SourceExists(ServiceName))
            {
                EventLog.CreateEventSource(ServiceName, "Application");
                return;
            }

            eventLog = new EventLog();
            eventLog.Source = ServiceName;
        }

        protected override void OnStart(string[] args)
        {
            int interval, port;

            int.TryParse(ConfigurationSettings.AppSettings["monitoringInterval"], out interval);
            int.TryParse(ConfigurationSettings.AppSettings["port"], out port);
            int.TryParse(ConfigurationSettings.AppSettings["eventId"], out eventId);

            _requestStop = false;

            thread = new Thread(() => Listening(port));
            thread.Start();

            System.Timers.Timer timer = new System.Timers.Timer();
            timer.Interval = interval * 1000;
            timer.Elapsed += new ElapsedEventHandler(Monitoring);
            timer.Start();
        }

        protected void Listening(int port)
        {
            byte[] bytes = new byte[256];

            TcpListener listener = new TcpListener(IPAddress.Any, port);
            listener.Start();
            eventLog.WriteEntry("Started listener", EventLogEntryType.Information, eventId);

            try
            {
                resetEvent.Reset();

                while (listener != null && !_requestStop)
                {
                    if (listener.Pending())
                    {
                        using (TcpClient client = listener.AcceptTcpClient())
                        {
                            int i;
                            string data = null;

                            eventLog.WriteEntry("Accept connection from client!", EventLogEntryType.Information, eventId);

                            stream = client.GetStream();

                            while ((i = stream.Read(bytes, 0, bytes.Length)) != 0 && !_requestStop)
                            {
                                data = System.Text.Encoding.ASCII.GetString(bytes, 0, i);
                                bytes = System.Text.Encoding.ASCII.GetBytes(data);

                                if (data.Substring(5, 2) == "98")
                                {
                                    string sApproval = data.Remove(5, 2).Insert(5, "93");
                                    string sResponse = data.Remove(5, 2).Insert(5, "99");
                                    byte[] bApproval = System.Text.Encoding.ASCII.GetBytes(sApproval);
                                    byte[] bResponse = System.Text.Encoding.ASCII.GetBytes(sResponse);

                                    stream.Write(bApproval, 0, bApproval.Length);
                                    stream.Write(bResponse, 0, bResponse.Length);
                                }
                            }

                            client.Close();
                        }
                    }
                    else
                    {
                        Thread.Sleep(1);
                    }
                }
            }
            catch (Exception e)
            {
                resetEvent.Set();
                eventLog.WriteEntry("SocketException: " + e.ToString(), EventLogEntryType.Error, eventId);
            }
            finally
            {
                listener.Stop();
                eventLog.WriteEntry("Listener done", EventLogEntryType.Information, eventId);
            }
        }

        protected void Monitoring(object sender, ElapsedEventArgs args)
        {
            try
            {
                string path = ConfigurationSettings.AppSettings["mailboxPath"],
                       format = ConfigurationSettings.AppSettings["extensionFormat"];
                bool logMonitoringInfo = ConfigurationSettings.AppSettings["logMonitoringInfo"] == "1";

                if (Directory.Exists(path) && stream != null)
                {
                    DirectoryInfo dir = new DirectoryInfo(path);
                    FileInfo[] files = dir.GetFiles().Where(f => f.Extension == ".ini").OrderBy(p => p.CreationTime).ToArray();
                    List<string> onExtensions = new List<string>();

                    if (logMonitoringInfo)
                        eventLog.WriteEntry("Monitoring " + path, EventLogEntryType.Information, eventId);

                    foreach (FileInfo file in files)
                    {
                        int index = file.Name.IndexOf(" ");
                        if (index > -1)
                        {
                            string number = int.Parse(file.Name.Remove(index)).ToString(format);

                            if (!onExtensions.Contains(number))
                            {
                                string content = File.ReadAllText(file.FullName);

                                if (!extensions.Where(e => e.number == number).Any())
                                {
                                    extensions.Add(new Extension(number, false));
                                }

                                if (!content.Contains("read=true"))
                                {
                                    Extension ext = extensions.Where(e => e.number == number).First();

                                    if (!ext.state)
                                    {
                                        byte[] signal = ext.getLampSignal(true);

                                        if (logMonitoringInfo)
                                            eventLog.WriteEntry(ext.number + " ON", EventLogEntryType.Information, eventId);

                                        stream.Write(signal, 0, signal.Length);
                                        ext.state = true;
                                    }

                                    onExtensions.Add(number);
                                }
                            }
                        }
                    }

                    foreach (Extension ext in extensions)
                    {
                        if (!onExtensions.Contains(ext.number) && ext.state)
                        {
                            byte[] signal = ext.getLampSignal(false);

                            if (logMonitoringInfo)
                                eventLog.WriteEntry(ext.number + " OFF", EventLogEntryType.Information, eventId);

                            stream.Write(signal, 0, signal.Length);
                            ext.state = false;
                        }
                    }
                }
            }
            catch (Exception e)
            {
                eventLog.WriteEntry("SocketException: " + e.ToString(), EventLogEntryType.Error, eventId);
            }
        }

        protected override void OnStop()
        {
            _requestStop = true;
            thread.Join();
            eventLog.WriteEntry("MessageWaitingService has stopped.", EventLogEntryType.Warning, eventId);
        }

        protected override void OnContinue()
        {
            eventLog.WriteEntry("MessageWaitingService continues.", EventLogEntryType.Information, eventId);
        }
    }
}
