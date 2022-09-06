using productionpkg;
using RVABackend.productionpkg;
using RVABackEnd.DataBaseModels;
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
    public class ProductionController : ApiController
    {
        [EnableCors(origins: "http://localhost:3000", headers: "*", methods: "*")]
        public List<Production> Get()
        {
            return ProductionList.m_Production;
        }

        [EnableCors(origins: "http://localhost:3000", headers: "*", methods: "*")]
        public IHttpActionResult Post(ProductionPOSTParameter parameter)
        {
            IFactory factory = new ConcreteFactory();
            Production production = new Production();
            ProductionData productionData = new ProductionData("production");

            if (parameter == null)
            {
                return BadRequest();
            }

            if (parameter.Type == null || parameter.Type.Equals(""))
            {
                return BadRequest();
            }

            if (parameter.Count < 0)
            {
                return BadRequest();
            }

            if (parameter.Username == null || parameter.Username.Equals(""))
            {
                return BadRequest();
            }

            production.m_Product = factory.MakeProduct(parameter.Type);
            production.Count = parameter.Count;
            production.Creator = parameter.Username;
            //productionData.Add(production);
            ProductionList.m_Production.Add(production);
            return Ok(production);
        }

        [EnableCors(origins: "http://localhost:3000", headers: "*", methods: "*")]
        public IHttpActionResult Put(Production production, Admin admin)
        {
            if (production.m_Product.Type == null || production.m_Product.Type.Equals(""))
            {
                return BadRequest();
            }

            if (production.Count == 0)
            {
                return BadRequest();
            }

            if (production.Creator == null || production.Creator.Equals(""))
            {
                return BadRequest();
            }

            if (production.Date == null)
            {
                return BadRequest();
            }

            if (DateTime.Compare(production.Date, DateTime.Now) > 0)
            {
                return Conflict();
            }

            if (!admin.ChangeProduction(production, 'm'))
            {
                return NotFound();
            }

            return Ok();
        }

        [EnableCors(origins: "http://localhost:3000", headers: "*", methods: "*")]
        public IHttpActionResult Delete(int id, Admin admin)
        {
            Production production = ProductionList.m_Production.Find(p => p.Id == id);

            if (production == null)
            {
                return NotFound();
            }

            if (admin.ChangeProduction(production, 'd'))
            {
                return StatusCode(HttpStatusCode.NoContent);
            }

            return StatusCode(HttpStatusCode.InternalServerError);
        }
    }
}
