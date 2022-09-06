///////////////////////////////////////////////////////////
//  Worker.cs
//  Implementation of the Class Worker
//  Generated by Enterprise Architect
//  Created on:      23-Aug-2022 22:15:53
//  Original author: sasa.devic
///////////////////////////////////////////////////////////

using System;
using System.Collections.Generic;
using System.Text;
using System.IO;



using productionpkg;
namespace productionpkg {
	public class Worker : IUser {

		private string firstName;
		private string lastName;
		private string password;
		private string username;
		private string role;
		public List<Production> m_Production;
		public List<IObserver> observers;

		public Worker(){
			observers = new List<IObserver>();
		}

		~Worker(){

		}

		public string FirstName{
			get => firstName;
			set => firstName = value;
		}

		public string LastName{
			get => lastName;
			set => lastName = value;
		}

		public string Password{
			get => password;
			set => password = value;
		}

		public string Username{
			get => username;
			set => username = value;
		}

        public string Role { 
			get => role; 
			set => role = value; 
		}
        public void Register(IObserver observer)
        {
			observers.Add(observer);
        }

		public void Unregister(IObserver observer)
        {
			observers.Remove(observer);
        }

		public int Notify(DateTime date)
        {
			int suma = 0;
            foreach (IObserver observer in observers)
            {
				suma += observer.Notify(this, date);
            }
			return suma;
        }

	}//end Worker

}//end namespace productionpkg