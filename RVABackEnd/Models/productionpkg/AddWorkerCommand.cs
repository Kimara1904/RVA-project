///////////////////////////////////////////////////////////
//  AddWorkerCommand.cs
//  Implementation of the Class AddWorkerCommand
//  Generated by Enterprise Architect
//  Created on:      23-Aug-2022 22:15:52
//  Original author: Miki
///////////////////////////////////////////////////////////

using System;
using System.Collections.Generic;
using System.Text;
using System.IO;



using productionpkg;
using RVABackEnd.DataBaseModels;

namespace productionpkg {
	public class AddWorkerCommand : WorkerCommand {

		public AddWorkerCommand(){

		}

		~AddWorkerCommand(){

		}

		/// 
		/// <param name="worker"></param>
		public override bool Execute(Worker worker){
			Worker check = WorkerList.m_Worker.Find(w => w.Username.Equals(worker.Username));
			WorkerData workerData = new WorkerData();
            if (check == null)
            {
				WorkerList.m_Worker.Add(worker);
				//workerData.Insert(worker);
				return true;
            }
			return false;
		}

	}//end AddWorkerCommand

}//end namespace productionpkg