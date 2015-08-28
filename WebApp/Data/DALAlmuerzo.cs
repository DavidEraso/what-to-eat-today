using Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data
{
    public class DALAlmuerzo
    {
        public bool CrearAlmuerzo(AlmuerzoDTO almuerzo)
        {
            using (var dbContext = new LunchPSLDBEntities())
            {
                int? carneID = null;
                int? guarnicionID = null;

                if (almuerzo.CarneId != 0)
                {
                    carneID = almuerzo.CarneId;
                }

                if (almuerzo.GuarnicionId != 0)
                {
                    guarnicionID = almuerzo.GuarnicionId;
                }

                dbContext.Almuerzos.Add(new Almuerzos
                {
                    NombreUsuario = almuerzo.Nombre,
                    AcompañamientoId = almuerzo.AcompañamientoID,
                    EjecutivoCarnesId = carneID,
                    EjecutivoGuarnicionId = guarnicionID,
                    EntradaId = almuerzo.EntradaId,
                    MenuId = almuerzo.MenuId,
                    Comentario = almuerzo.Comentario,
                    Fecha = DateTime.Now,
                    PagoEfectivo = almuerzo.PagoEfectivo,
                    PagoSodexo = almuerzo.PagoSodexo,
                    PagoTicket = almuerzo.PagoTicket
                });
                dbContext.SaveChanges();
                return true;
            }
        }

        public IList<AlmuerzoDTO> ObtenerAlmuerzo()
        {
            using (var dbContext = new LunchPSLDBEntities())
            {
                var fecha = DateTime.Now.Date.AddDays(-1).AddHours(23);
                
                var almuerzos = (from almuerzo in dbContext.Almuerzos
                                 join menu in dbContext.Menu on almuerzo.Menu.MenuId equals menu.MenuId
                                 where almuerzo.Fecha > fecha
                             select new AlmuerzoDTO
                             {
                                 Id = almuerzo.Id,
                                 Nombre = almuerzo.NombreUsuario,
                                 AcompañamientoID = almuerzo.Acompañamiento.AcompañamientoId,
                                 AcompañamientoNombre = almuerzo.Acompañamiento.Nombre,
                                 CarneId = almuerzo.EjecutivoCarnes.EjecutivoCarnesId,
                                 CarneNombre = almuerzo.EjecutivoCarnes.Nombre,
                                 EntradaId = almuerzo.Entradas.EntradasId,
                                 EntradaNombre = almuerzo.Entradas.Nombre,
                                 GuarnicionId = almuerzo.EjecutivoGuarniciones.EjecutivoGuarnicionesId,
                                 GuarnicionNombre = almuerzo.EjecutivoGuarniciones.Nombre,
                                 MenuId = almuerzo.Menu.MenuId,
                                 MenuNombre = almuerzo.Menu.Nombre,
                                 Comentario = almuerzo.Comentario,
                                 Costo = menu.Costo,
                                 Fecha = almuerzo.Fecha,
                                 PagoEfectivo = almuerzo.PagoEfectivo.Value,
                                 PagoSodexo = almuerzo.PagoSodexo.Value,
                                 PagoTicket = almuerzo.PagoTicket.Value
                             }).OrderBy(x=>x.Fecha).ToList();

                return almuerzos;
            }
        }
    }
}
