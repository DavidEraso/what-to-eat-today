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
    public class AlmuerzoController : ApiController
    {
        // GET api/almuerzo
        public Object Get()
        {
            DALAlmuerzo DAL = new DALAlmuerzo();
            return DAL.ObtenerAlmuerzo();
        }

        // POST api/menu
        public bool Post(AlmuerzoDTO almuerzo)
        {
            DALAlmuerzo DAL = new DALAlmuerzo();
            DAL.CrearAlmuerzo(almuerzo);

            return true;
        }
    }
}
