using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApp.Configs
{
    public class EmailParameters
    {
        public string SendGridKey { get; set; }
        public string EmailFrom { get; set; }
        public string EmailTo { get; set; }
        public string Url { get; set; }
    }
}
