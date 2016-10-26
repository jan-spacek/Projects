using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Sockets;

namespace ConsoleMWS
{
    class Program
    {
        static NetworkStream stream;

        static List<Extension> extensions;

        static void Main(string[] args)
        {
            Console.WriteLine("\nMessageWaitingService has started.");

            extensions = new List<Extension>();

            Listener();
            //OnStart();

            Console.WriteLine("\nHit enter to continue...");
            Console.Read();
        }

        public static void OnStart()
        {
            int interval = int.Parse(ConfigurationSettings.AppSettings["monitoringInterval"]);

            System.Timers.Timer timer = new System.Timers.Timer();
            timer.Interval = interval * 1000;
            timer.Elapsed += new System.Timers.ElapsedEventHandler(Monitoring);
            timer.Start();
        }

        public static void Monitoring(object sender, System.Timers.ElapsedEventArgs args)
        {
            string path = ConfigurationSettings.AppSettings["mailboxPath"];
            string format = ConfigurationSettings.AppSettings["extensionFormat"];

            if (Directory.Exists(path) && stream != null)
            {
                DirectoryInfo dir = new DirectoryInfo(path);
                FileInfo[] files = dir.GetFiles().Where(f => f.Extension == ".ini").OrderBy(p => p.CreationTime).ToArray();
                List<string> onExtensions = new List<string>();

                foreach (FileInfo file in files)
                {
                    int index = file.Name.IndexOf(" ");
                    if (index > -1)
                    {
                        string number = int.Parse(file.Name.Remove(index)).ToString(format);

                        if (!onExtensions.Contains(number)) {
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
                                    Console.WriteLine(ext.number + " ON");
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
                    if (!onExtensions.Contains(ext.number) && ext.state) {
                        byte[] signal = ext.getLampSignal(false);
                        Console.WriteLine(ext.number + " OFF");
                        stream.Write(signal, 0, signal.Length);
                        ext.state = false;
                    }
                }
            }
        }

        public static void Listener()
        {
            TcpListener server = null;
            Int32 port = Int32.Parse(ConfigurationSettings.AppSettings["port"]);

            try
            {
                server = new TcpListener(IPAddress.Any, port);
                server.Start();
                Console.WriteLine("\nWaiting for a connection... ");

                // Buffer for reading data
                Byte[] bytes = new Byte[256];

                // Enter the listening loop. 
                while (true)
                {
                    if (server.Pending())
                    {
                        using (TcpClient client = server.AcceptTcpClient())
                        {
                            Console.WriteLine("\nAccept connection from client!");

                            String data = null;

                            // Get a stream object for reading and writing
                            stream = client.GetStream();

                            OnStart();

                            int i;

                            while ((i = stream.Read(bytes, 0, bytes.Length)) != 0)
                            {
                                data = System.Text.Encoding.ASCII.GetString(bytes, 0, i);
                                bytes = System.Text.Encoding.ASCII.GetBytes(data);

                                if (data.Substring(5, 2) == "98")
                                {
                                    Console.Write("\nDopyt PBX: " + data);

                                    string sApproval = data.Remove(5, 2).Insert(5, "93");
                                    string sResponse = data.Remove(5, 2).Insert(5, "99");
                                    Byte[] bApproval = System.Text.Encoding.ASCII.GetBytes(sApproval);
                                    Byte[] bResponse = System.Text.Encoding.ASCII.GetBytes(sResponse);

                                    stream.Write(bApproval, 0, bApproval.Length);
                                    Console.Write("Potvr MWS: " + sApproval);

                                    stream.Write(bResponse, 0, bResponse.Length);
                                    Console.Write("Odpov MWS: " + sResponse);
                                }
                                else if (data.Substring(5, 2) == "93")
                                {
                                    Console.Write("Potvr PBX: " + data);
                                }
                            }
                            client.Close();
                        }
                    }
                }
            }
            catch (SocketException e)
            {
                Console.WriteLine("SocketException: {0}", e);
            }
            finally
            {
                server.Stop();
            }
        }
    }

    class Extension
    {
        public string number;
        public bool state;     // 0 = OFF, 1 = ON

        public Extension(string number, bool state)
        {
            this.number = number;
            this.state = state;
        }

        public byte[] getLampSignal(bool state)
        {
            byte[] extension = System.Text.Encoding.ASCII.GetBytes(number);
            byte[] signal;
            byte[] end = new byte[] { 48, 49, 13, 10 };

            if (state)
                signal = new byte[] { 1, 48, 48, 48, 2, 48, 54 };
            else
                signal = new byte[] { 1, 48, 48, 48, 2, 48, 55 };

            byte[] result = new byte[signal.Length + extension.Length + end.Length];

            Buffer.BlockCopy(signal, 0, result, 0, signal.Length);
            Buffer.BlockCopy(extension, 0, result, signal.Length, extension.Length);
            Buffer.BlockCopy(end, 0, result, signal.Length + extension.Length, end.Length);
            
            return result;
        }
    }
}
