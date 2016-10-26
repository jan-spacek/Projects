using System.ServiceProcess;

namespace MessageWaitingService
{
    static class Program
    {
        /// <summary>
        /// The main entry point for the application.
        /// </summary>
        static void Main()
        {
            ServiceBase[] ServicesToRun;
            ServicesToRun = new ServiceBase[]
            {
                new MessageWaitingService()
            };
            ServiceBase.Run(ServicesToRun);
        }
    }
}
