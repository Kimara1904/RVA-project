using productionpkg;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Xml.Serialization;

namespace RVABackEnd.DataBaseModels
{
    public class ProductionData
    {
        List<Production> data;
        string path;
        XmlSerializer serializer = new XmlSerializer(typeof(List<Production>));

        public ProductionData(string fileName)
        {
            path = AppDomain.CurrentDomain.BaseDirectory + "App_Data/" + fileName + ".xml";
            ReadFile();
        }

        private void ReadFile()
        {
            if (!File.Exists(path))
                UpdateFile(new List<Production>());
            using (TextReader r = new StreamReader(path))
            {
                data = (List<Production>)serializer.Deserialize(r);
            }
        }

        public void UpdateFile(List<Production> productions)
        {
            data = productions;
            //Update file
            using (TextWriter w = new StreamWriter(path, false))
            {
                serializer.Serialize(w, data);
            }
        }

        public List<Production> GetList()
        {
            return data;
        }
    }
}