///////////////////////////////////////////////////////////
//  ScholarWorker.cs
//  Implementation of the Class ScholarWorker
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
	public class ScholarWorker : Worker, IScholarInfo {

		private string facultyName;
		private string index;

		public ScholarWorker(){

		}

		~ScholarWorker(){

		}

		public string FacultyName{
			get => facultyName;
			set => facultyName = value;
		}

		public string Index{
			get => index;
			set => index = value;
		}

	}//end ScholarWorker

}//end namespace productionpkg