using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RVABackEnd.Models.ParametersModel
{
    public class ProductionPOSTParameter
    {
        public ProductionPOSTParameter()
        {

        }

        public string Type { get; set; }
        public int Count { get; set; }
        public string Username { get; set; }
    }
}