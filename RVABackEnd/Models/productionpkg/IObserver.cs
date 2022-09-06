///////////////////////////////////////////////////////////
//  IObserver.cs
//  Implementation of the Interface IObserver
//  Generated by Enterprise Architect
//  Created on:      23-Aug-2022 22:15:52
//  Original author: Miki
///////////////////////////////////////////////////////////

using System;
using System.Collections.Generic;
using System.Text;
using System.IO;



namespace productionpkg {
	public interface IObserver  {

		/// 
		/// <param name="worker"></param>
		int Notify(Worker worker, DateTime date);
	}//end IObserver

}//end namespace productionpkg