///////////////////////////////////////////////////////////
//  ModifyWorkerCommand.cs
//  Implementation of the Class ModifyWorkerCommand
//  Generated by Enterprise Architect
//  Created on:      23-Aug-2022 22:15:53
//  Original author: Miki
///////////////////////////////////////////////////////////

using System;
using System.Collections.Generic;
using System.Text;
using System.IO;



using productionpkg;
using RVABackEnd.DataBaseModels;

namespace productionpkg {
	public class ModifyWorkerCommand : WorkerCommand {

		public ModifyWorkerCommand(){

		}

		~ModifyWorkerCommand(){

		}

		/// 
		/// <param name="worker"></param>
		public override bool Execute(Worker worker){
			Worker check = WorkerList.m_Worker.Find(w => w.Username.Equals(worker.Username));
			WorkerData workerData = new WorkerData();

            if (check != null)
            {
				check.Password = worker.Password;
				check.FirstName = worker.FirstName;
				check.LastName = worker.LastName;
				check.Role = worker.Role;
				if (worker.Role.Equals("scholar"))
                {
					(check as ScholarWorker).FacultyName = (worker as ScholarWorker).FacultyName;
					(check as ScholarWorker).Index = (worker as ScholarWorker).Index;
				}
				workerData.Update(check);
				return true;
            }
			return false;
		}

	}//end ModifyWorkerCommand

}//end namespace productionpkg