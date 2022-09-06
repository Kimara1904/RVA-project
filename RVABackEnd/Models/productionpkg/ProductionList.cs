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
        public static List<Production> m_Production = new List<Production>()
        {
            new Production()
            {
                Id = 1, Count=1, Creator="pera", Date=DateTime.Now, m_Product = new ElectricalInstallation()
            },
            new Production()
            {
                Id = 2, Count=1, Creator="zika", Date=DateTime.Now, m_Product = new Tires()
            }
        };

        public ProductionList()
        {
        }

        ~ProductionList()
        {

        }
    }
}
