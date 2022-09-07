using productionpkg;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace RVABackend.productionpkg
{
    public class ProductionList
    {
        public static List<Production> m_Production = HttpContext.Current.Application["productions"] as List<Production>;

        public ProductionList()
        {
        }

        ~ProductionList()
        {

        }
    }
}
