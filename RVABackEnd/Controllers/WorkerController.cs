using productionpkg;
using RVABackEnd.Models.ParametersModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace RVABackEnd.Controllers
{
    public class WorkerController : ApiController
    {
        WorkerList workerList = new WorkerList(new Auth());

        [EnableCors(origins: "http://localhost:3000", headers: "*", methods: "*")]
        public List<Worker> Get()
        {
            return WorkerList.m_Worker;
        }

        [EnableCors(origins: "http://localhost:3000", headers: "*", methods: "*")]
        public Worker Get(string username, string password)
        {
            Worker worker = workerList.Login(username, password);
            return worker;
        }


        [EnableCors(origins: "http://localhost:3000", headers: "*", methods: "*")]
        public IHttpActionResult Get(string username, string password, int token, string date)
        {
            Worker worker = workerList.Login(username, password);
            int year = int.Parse(date.Split('-')[0]);
            int month = int.Parse(date.Split('-')[1]);
            int day = int.Parse(date.Split('-')[2]);

            if (worker == null)
            {
                return BadRequest();
            }

            if (date == null || date.Equals(""))
            {
                return BadRequest();
            }

            if (token == 1)
            {
                ICalculate calculate;
                if (worker is ScholarWorker)
                {
                    calculate = new CalculateForScholar();
                }
                else
                {
                    calculate = new CalculateForWorker();
                }

                return Ok(new SalaryCalculationForWorker(calculate).SalaryCalculation(worker, new DateTime(year, month, day)));
            }

            if (token == 2)
            {
                IObserver observer = new CarCounter();
                worker.Register(observer);
                int cnt = worker.Notify(new DateTime(year, month, day));
                worker.Unregister(observer);

                return Ok(cnt);
            }

            return BadRequest();
        }


        [EnableCors(origins: "http://localhost:3000", headers: "*", methods: "*")]
        public IHttpActionResult Post(WorkerPOSTParameter worker)
        {
            if (worker == null)
            {
                return BadRequest();
            }

            if (worker.Username == null || worker.Username.Length == 0)
            {
                return BadRequest();
            }

            if (worker.Password == null || worker.Password.Length == 0)
            {
                return BadRequest();
            }

            if (worker.FirstName == null || worker.FirstName.Length == 0)
            {
                return BadRequest();
            }

            if (worker.LastName == null || worker.LastName.Length == 0)
            {
                return BadRequest();
            }

            if (worker.Admin == null)
            {
                return BadRequest();
            }

            if (worker.Role == null || worker.Role.Length == 0)
            {
                return BadRequest();
            }

            Worker newWorker;

            if (worker.Role == "scholar")
            {
                newWorker = new ScholarWorker()
                {
                    Username = worker.Username,
                    Password = worker.Password,
                    FirstName = worker.FirstName,
                    LastName = worker.LastName,
                    Role = worker.Role,
                    FacultyName = worker.Faculty,
                    Index = worker.Index
                };
            }
            else
            {
                newWorker = new Worker()
                {
                    Username = worker.Username,
                    Password = worker.Password,
                    FirstName = worker.FirstName,
                    LastName = worker.LastName,
                    Role = worker.Role
                };
            }

            if (!worker.Admin.ChangeWorkerList(newWorker, 'a'))
            {
                return Conflict();
            }

            return Ok();
        }


        [EnableCors(origins: "http://localhost:3000", headers: "*", methods: "*")]
        public IHttpActionResult Put(Worker worker, Admin admin)
        {
            if (worker == null)
            {
                return BadRequest();
            }

            if (worker.Username == null || worker.Username.Length == 0)
            {
                return BadRequest();
            }

            if (worker.Password == null || worker.Password.Length == 0)
            {
                return BadRequest();
            }

            if (worker.FirstName == null || worker.FirstName.Length == 0)
            {
                return BadRequest();
            }

            if (worker.LastName == null || worker.LastName.Length == 0)
            {
                return BadRequest();
            }

            return Ok(admin.ChangeWorkerList(worker, 'm'));
        }
    }
}
