using Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data
{
    public class DALCarne
    {
        public bool CrearCarne(CarneDTO carne)
        {
            using (var dbContext = new LunchPSLDBEntities())
            {
                dbContext.EjecutivoCarnes.Add(new EjecutivoCarnes
                {
                    EjecutivoCarnesId = carne.Id,
                    Nombre = carne.Nombre,
                    Activo = carne.Activo
                });
                dbContext.SaveChanges();
                return true;
            }
        }

        public IList<CarneDTO> ObtenerCarnes(bool onlyActive)
        {
            using (var dbContext = new LunchPSLDBEntities())
            {
                var carnes = (from carne in dbContext.EjecutivoCarnes
                              where (carne.Activo == true || onlyActive == false)
                                       select new CarneDTO
                                       {
                                           Id = carne.EjecutivoCarnesId,
                                           Nombre = carne.Nombre,
                                           Activo = carne.Activo,
                                           Cheched = (carne.Activo ? "checked" : "")
                                       }).ToList();

                return carnes;
            }
        }

        public bool ActualizarCarne(CarneDTO carne)
        {
            using (var dbContext = new LunchPSLDBEntities())
            {
                EjecutivoCarnes carneToUpdate = dbContext.EjecutivoCarnes.Where(s => s.EjecutivoCarnesId == carne.Id).FirstOrDefault<EjecutivoCarnes>();
                carneToUpdate.Nombre = carne.Nombre;
                carneToUpdate.Activo = carne.Activo;
                dbContext.SaveChanges();
                return true;
            }
        }

        public bool EliminarCarne(CarneDTO carne)
        {
            using (var dbContext = new LunchPSLDBEntities())
            {
                var carneAEliminar = dbContext.EjecutivoCarnes.Where(s => s.EjecutivoCarnesId == carne.Id).FirstOrDefault<EjecutivoCarnes>();

                dbContext.EjecutivoCarnes.Remove(carneAEliminar);
                dbContext.SaveChanges();
                return true;
            }
        }
    }
}
