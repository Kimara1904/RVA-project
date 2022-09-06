using productionpkg;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RVABackEnd.Models.ParametersModel
{
    public class WorkerPOSTParameter
    {
        public WorkerPOSTParameter()
        {

        }

        public string Username { get; set; }
        public string Password { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Role { get; set; }
        public string Faculty { get; set; }
        public string Index { get; set; }
        public Admin Admin { get; set; }
    }
}