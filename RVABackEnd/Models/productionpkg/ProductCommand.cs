///////////////////////////////////////////////////////////
//  ProductCommand.cs
//  Implementation of the Class ProductCommand
//  Generated by Enterprise Architect
//  Created on:      23-Aug-2022 22:15:53
//  Original author: Miki
///////////////////////////////////////////////////////////

using System;
using System.Collections.Generic;
using System.Text;
using System.IO;



using productionpkg;
using RVABackend.productionpkg;

namespace productionpkg {
	public abstract class ProductCommand : IProductCommand {

		public ProductionList m_ProductionList;

		public ProductCommand(){

		}

		~ProductCommand(){

		}

		/// 
		/// <param name="production"></param>
		public abstract bool Execute(Production production);

	}//end ProductCommand

}//end namespace productionpkg