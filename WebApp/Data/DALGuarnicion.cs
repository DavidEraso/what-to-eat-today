using Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data
{
    public class DALGuarnicion
    {
        public bool CrearGuarnicion(GuarnicionDTO guarnicion)
        {
            using (var dbContext = new LunchPSLDBEntities())
            {
                dbContext.EjecutivoGuarniciones.Add(new EjecutivoGuarniciones
                {
                    EjecutivoGuarnicionesId = guarnicion.Id,
                    Nombre = guarnicion.Nombre,
                    Activo = guarnicion.Activo
                });
                dbContext.SaveChanges();
                return true;
            }
        }

        public IList<GuarnicionDTO> ObtenerGuarnicion(bool onlyActive)
        {
            using (var dbContext = new LunchPSLDBEntities())
            {
                var guarniciones = (from guarnicion in dbContext.EjecutivoGuarniciones
                                  where (guarnicion.Activo == true || onlyActive == false)
                              select new GuarnicionDTO
                              {
                                  Id = guarnicion.EjecutivoGuarnicionesId,
                                  Nombre = guarnicion.Nombre,
                                  Activo = guarnicion.Activo,
                                  Cheched = (guarnicion.Activo ? "checked" : "")
                              }).ToList();

                return guarniciones;
            }
        }

        public bool ActualizarGuarnicion(GuarnicionDTO guarnicion)
        {
            using (var dbContext = new LunchPSLDBEntities())
            {
                EjecutivoGuarniciones guarnicionToUpdate = dbContext.EjecutivoGuarniciones.Where(s => s.EjecutivoGuarnicionesId == guarnicion.Id).FirstOrDefault<EjecutivoGuarniciones>();
                guarnicionToUpdate.Nombre = guarnicion.Nombre;
                guarnicionToUpdate.Activo = guarnicion.Activo;
                dbContext.SaveChanges();
                return true;
            }
        }

        public bool EliminarGuarnicion(GuarnicionDTO guarnicion)
        {
            using (var dbContext = new LunchPSLDBEntities())
            {
                var guarnicionAEliminar = dbContext.EjecutivoGuarniciones.Where(s => s.EjecutivoGuarnicionesId == guarnicion.Id).FirstOrDefault<EjecutivoGuarniciones>();

                dbContext.EjecutivoGuarniciones.Remove(guarnicionAEliminar);
                dbContext.SaveChanges();
                return true;
            }
        }
    }
}
