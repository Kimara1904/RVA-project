///////////////////////////////////////////////////////////
//  CarCounter.cs
//  Implementation of the Class CarCounter
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
	public class CarCounter : IObserver {

		public CarCounter(){

		}

		~CarCounter(){

		}

		/// 
		/// <param name="worker"></param>
		public int Notify(Worker worker, DateTime date){
			int el = 0;
			int tire = 0;
			int engine = 0;
			int interior = 0;
			int metal = 0;
			int count = 0;

            foreach (Production production in worker.m_Production)
            {
                if (production.Date.Date == date.Date)
                {
					switch (production.m_Product.Type)
					{
						case "Electro":
							el += production.Count;
							break;
						case "Tire":
							tire += production.Count;
							break;
						case "Interior":
							interior += production.Count;
							break;
						case "Engine":
							engine += production.Count;
							break;
						case "MetalWork":
							metal += production.Count;
							break;
					}
				}
                

                if (el > 0 && tire > 0 && interior > 0 && engine > 0 && metal > 0)
                {
					count++;
					el--;
					tire--;
					interior--;
					engine--;
					metal--;
                }
            }
			return count;
		}

	}//end CarCounter

}//end namespace productionpkg