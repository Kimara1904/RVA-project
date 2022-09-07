using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RVABackEnd.Models.ParametersModel
{
    public class ProductionParameter
    {
        public ProductionParameter()
        {

        }

        public string Type { get; set; }
        public int Count { get; set; }
        public string Username { get; set; }
    }
}