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
    public class AcompañamientoController : ApiController
    {
        // GET api/acompañamiento
        public Object Get(bool onlyActive)
        {
            DALAcompañamiento DAL = new DALAcompañamiento();
            return DAL.ObtenerAcompañamientos(onlyActive);
        }

        // POST api/acompañamiento
        public void Post(AcompañamientoDTO acompañamiento)
        {
            DALAcompañamiento DAL = new DALAcompañamiento();
            if (acompañamiento.Id != 0)
            {
                DAL.ActualizarAcompañamiento(acompañamiento);
            }
            else
            {
                DAL.CrearAcompañamiento(acompañamiento);
            }
        }

        // PUT api/acompañamiento
        public void Put(AcompañamientoDTO acompañamiento)
        {
            DALAcompañamiento DAL = new DALAcompañamiento();
            DAL.ActualizarAcompañamiento(acompañamiento);
        }

        // DELETE api/acompañamiento/5
        public void Delete(int id)
        {
            DALAcompañamiento DAL = new DALAcompañamiento();
            AcompañamientoDTO acompañamiento = new AcompañamientoDTO
            {
                Id = id
            };

            DAL.EliminarAcompañamiento(acompañamiento);
        }
    }
}
