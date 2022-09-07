///////////////////////////////////////////////////////////
//  Production.cs
//  Implementation of the Class Production
//  Generated by Enterprise Architect
//  Created on:      23-Aug-2022 22:15:53
//  Original author: sasa.devic
///////////////////////////////////////////////////////////

using System;
using System.Collections.Generic;
using System.Text;
using System.IO;



using productionpkg;
using System.Xml.Serialization;

namespace productionpkg {
	[XmlInclude(typeof(ElectricalInstallation))]
	[XmlInclude(typeof(Engine))]
	[XmlInclude(typeof(Tires))]
	[XmlInclude(typeof(MetalWork))]
	[XmlInclude(typeof(Interior))]
	[XmlInclude(typeof(Product))]
	public class Production {

		private int count;
		private DateTime date;
		private string creator;
		private int id;
		//[XmlElement("m_Product")]
		public productionpkg.Product m_Product;

        public Production(){
			Id = new Random().Next(100000);
			Date = DateTime.Now;
		}

		~Production(){

		}

		public int Count { get => count; set => count = value; }
		public DateTime Date { get => date; set => date = value; }
		public string Creator { get => creator; set => creator = value; }
		public int Id { get => id; set => id = value; }
    }//end Production

}//end namespace productionpkg