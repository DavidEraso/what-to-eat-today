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
    public class GuarnicionController : ApiController
    {
        // GET api/guarnicion
        public Object Get(bool onlyActive)
        {
            DALGuarnicion DAL = new DALGuarnicion();
            return DAL.ObtenerGuarnicion(onlyActive);
        }

        // POST api/guarnicion
        public void Post(GuarnicionDTO guarnicion)
        {
            DALGuarnicion DAL = new DALGuarnicion();
            if (guarnicion.Id != 0)
            {
                DAL.ActualizarGuarnicion(guarnicion);
            }
            else
            {
                DAL.CrearGuarnicion(guarnicion);
            }
        }

        // PUT api/guarnicion
        public void Put(GuarnicionDTO guarnicion)
        {
            DALGuarnicion DAL = new DALGuarnicion();
            DAL.ActualizarGuarnicion(guarnicion);
        }

        // DELETE api/guarnicion/5
        public void Delete(int id)
        {
            DALGuarnicion DAL = new DALGuarnicion();
            GuarnicionDTO guarnicion = new GuarnicionDTO
            {
                Id = id
            };

            DAL.EliminarGuarnicion(guarnicion);
        }
    }
}
