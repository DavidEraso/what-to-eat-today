using Common;
using Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace PSLLunch.Controllers
{
    public class CarnesController : ApiController
    {
        // GET api/carnes
        public Object Get(bool onlyActive)
        {
            DALCarne DAL = new DALCarne();
            return DAL.ObtenerCarnes(onlyActive);
        }

        // POST api/carnes
        public void Post(CarneDTO carne)
        {
            DALCarne DAL = new DALCarne();
            if (carne.Id != 0)
            {
                DAL.ActualizarCarne(carne);
            }
            else
            {
                DAL.CrearCarne(carne);
            }
        }

        // PUT api/carnes
        public void Put(CarneDTO carne)
        {
            DALCarne DAL = new DALCarne();
            DAL.ActualizarCarne(carne);
        }

        // DELETE api/carnes/5
        public void Delete(int id)
        {
            DALCarne DAL = new DALCarne();
            CarneDTO carne = new CarneDTO
            {
                Id = id
            };

            DAL.EliminarCarne(carne);
        }
    }
}
