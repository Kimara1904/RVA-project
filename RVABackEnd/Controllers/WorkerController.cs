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
                if (worker.Role == "scholar")
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
        public IHttpActionResult Post(WorkerParameter worker)
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

            if (worker.Role == "scholar" && (worker.Faculty == null || worker.Faculty.Length == 0))
            {
                return BadRequest();
            }

            if (worker.Role == "scholar" && (worker.Index == null || worker.Index.Length == 0))
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
        public IHttpActionResult Put(string id, WorkerParameter workerParams)
        {
            if (workerParams == null)
            {
                return BadRequest();
            }

            if (id == null || id.Length == 0)
            {
                return BadRequest();
            }

            if (workerParams.Password == null || workerParams.Password.Length == 0)
            {
                return BadRequest();
            }

            if (workerParams.FirstName == null || workerParams.FirstName.Length == 0)
            {
                return BadRequest();
            }

            if (workerParams.LastName == null || workerParams.LastName.Length == 0)
            {
                return BadRequest();
            }

            if (workerParams.Role == null || workerParams.Role.Length == 0)
            {
                return BadRequest();
            }

            if (workerParams.Role == "scholar" && (workerParams.Faculty == null || workerParams.Faculty.Length == 0))
            {
                return BadRequest();
            }

            if (workerParams.Role == "scholar" && (workerParams.Index == null || workerParams.Index.Length == 0))
            {
                return BadRequest();
            }

            Worker modifyWorker;

            if (workerParams.Role == "scholar")
            {
                modifyWorker = new ScholarWorker()
                {
                    Username = id,
                    Password = workerParams.Password,
                    FirstName = workerParams.FirstName,
                    LastName = workerParams.LastName,
                    Role = workerParams.Role,
                    FacultyName = workerParams.Faculty,
                    Index = workerParams.Index
                };
            }
            else
            {
                modifyWorker = new Worker()
                {
                    Username = id,
                    Password = workerParams.Password,
                    FirstName = workerParams.FirstName,
                    LastName = workerParams.LastName,
                    Role = workerParams.Role
                };
            }

            if (!workerParams.Admin.ChangeWorkerList(modifyWorker, 'm'))
            {
                return NotFound();
            }

            return Ok(WorkerList.m_Worker.Find(w => w.Username.Equals(id)));
        }
    }
}
