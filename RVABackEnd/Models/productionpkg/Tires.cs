///////////////////////////////////////////////////////////
//  Pneumatici.cs
//  Implementation of the Class Pneumatici
//  Generated by Enterprise Architect
//  Created on:      23-Aug-2022 22:15:53
//  Original author: Miki
///////////////////////////////////////////////////////////

using System;
using System.Collections.Generic;
using System.Text;
using System.IO;



using productionpkg;
namespace productionpkg {
	[Serializable]
	public class Tires : Product {

		public Tires(){
			Type = "Tire";
			ProductivityPoints = 2.0;
		}

		~Tires(){

		}

	}//end Pneumatici

}//end namespace productionpkg