using System;

namespace MessageWaitingService
{
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
