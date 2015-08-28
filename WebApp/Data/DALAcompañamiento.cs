using Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data
{
    public class DALAcompañamiento
    {
        public bool CrearAcompañamiento(AcompañamientoDTO acompañamiento)
        {
            using (var dbContext = new LunchPSLDBEntities())
            {
                dbContext.Acompañamiento.Add(new Acompañamiento
                {
                    AcompañamientoId = acompañamiento.Id,
                    Nombre = acompañamiento.Nombre,
                    Activo = acompañamiento.Activo
                });
                dbContext.SaveChanges();
                return true;
            }
        }

        public IList<AcompañamientoDTO> ObtenerAcompañamientos(bool onlyActive)
        {
            using (var dbContext = new LunchPSLDBEntities())
            {
                var acompañamientos = (from acompañamiento in dbContext.Acompañamiento
                                       where (acompañamiento.Activo == true || onlyActive == false)
                                select new AcompañamientoDTO
                                {
                                    Id = acompañamiento.AcompañamientoId,
                                    Nombre = acompañamiento.Nombre,
                                    Activo = acompañamiento.Activo,
                                    Cheched = (acompañamiento.Activo ? "checked" : "")
                                }).ToList();

                return acompañamientos;
            }
        }

        public bool ActualizarAcompañamiento(AcompañamientoDTO acompañamiento)
        {
            using (var dbContext = new LunchPSLDBEntities())
            {
                Acompañamiento acompañamientoToUpdate = dbContext.Acompañamiento.Where(s => s.AcompañamientoId == acompañamiento.Id).FirstOrDefault<Acompañamiento>();
                acompañamientoToUpdate.Nombre = acompañamiento.Nombre;
                acompañamientoToUpdate.Activo = acompañamiento.Activo;
                dbContext.SaveChanges();
                return true;
            }
        }

        public bool EliminarAcompañamiento(AcompañamientoDTO acompañamiento)
        {
            using (var dbContext = new LunchPSLDBEntities())
            {
                var acompañamientoAEliminar = dbContext.Acompañamiento.Where(s => s.AcompañamientoId == acompañamiento.Id).FirstOrDefault<Acompañamiento>();

                dbContext.Acompañamiento.Remove(acompañamientoAEliminar);
                dbContext.SaveChanges();
                return true;
            }
        }
    }
}
