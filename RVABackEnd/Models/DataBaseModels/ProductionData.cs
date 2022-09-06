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
            data = new List<Production>();
            ReadFile();
        }

        private void ReadFile()
        {
            if (!File.Exists(path))
                UpdateFile();
            using (TextReader r = new StreamReader(path))
            {
                data = (List<Production>)serializer.Deserialize(r);
            }
        }

        public void UpdateFile()
        {
            //Update file
            using (TextWriter w = new StreamWriter(path, false))
            {
                serializer.Serialize(w, data);
            }
        }


        public void Add(Production production)
        {
            data.Add(production);
            UpdateFile();
        }

        public bool Remove(Production production)
        {
            if (data.Remove(production))
            {
                UpdateFile();
                return true;
            }
            return false;
        }

        public List<Production> GetList()
        {
            return data;
        }
    }
}