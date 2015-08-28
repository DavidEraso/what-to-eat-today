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
    public class EntradasController : ApiController
    {
        // GET api/entradas
        public Object Get(bool onlyActive)
        {
            DALEntrada DAL = new DALEntrada();
            return DAL.ObtenerEntradas(onlyActive);
        }
                
        // POST api/entradas
        public void Post(EntradaDTO entrada)
        {
            DALEntrada DAL = new DALEntrada();
            if(entrada.Id != 0)
            {
                DAL.ActualizarEntrada(entrada);
            }
            else
            {
                DAL.CrearEntrada(entrada);
            }
        }

        // PUT api/entradas/5
        public void Put(EntradaDTO entrada)
        {
            DALEntrada DAL = new DALEntrada();
            DAL.ActualizarEntrada(entrada);
        }

        // DELETE api/values/5
        public void Delete(int id)
        {
            DALEntrada DAL = new DALEntrada();
            EntradaDTO entrada = new EntradaDTO { 
                Id = id
            };

            DAL.EliminarEntrada(entrada);
        }
    }
}
