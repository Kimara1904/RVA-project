///////////////////////////////////////////////////////////
//  CalculateForWorker.cs
//  Implementation of the Class CalculateForWorker
//  Generated by Enterprise Architect
//  Created on:      23-Aug-2022 22:15:52
//  Original author: Miki
///////////////////////////////////////////////////////////

using System;
using System.Collections.Generic;
using System.Text;
using System.IO;



using productionpkg;
namespace productionpkg {
	public class CalculateForWorker : ICalculate {

		public CalculateForWorker(){

		}

		~CalculateForWorker(){

		}

		/// 
		/// <param name="worker"></param>
		public double Calculate(Worker worker, DateTime date){
			double points = 0;
			double salary;

			foreach (Production production in worker.m_Production)
			{
				if (production.Creator.Equals(worker.Username) && production.Date.Month == date.Month)
				{
					points += production.m_Product.ProductivityPoints * production.Count;
				}
			}

			salary = points * 500;

			return salary;
		}

	}//end CalculateForWorker

}//end namespace productionpkg