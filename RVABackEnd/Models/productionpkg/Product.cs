///////////////////////////////////////////////////////////
//  Product.cs
//  Implementation of the Class Product
//  Generated by Enterprise Architect
//  Created on:      23-Aug-2022 22:15:53
//  Original author: sasa.devic
///////////////////////////////////////////////////////////

using System;
using System.Collections.Generic;
using System.Text;
using System.IO;



namespace productionpkg {
	[Serializable]
	public abstract class Product {

		private double productivityPoints;
		private string type;

		public Product(){

		}

		~Product(){

		}

		public double ProductivityPoints{
			get{
				return productivityPoints;
			}
			set{
				productivityPoints = value;
			}
		}

		public string Type{
			get{
				return type;
			}
			set{
				type = value;
			}
		}

	}//end Product

}//end namespace productionpkg