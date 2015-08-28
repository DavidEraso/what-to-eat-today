using Common;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data
{
    public class DALEntrada
    {
        public bool CrearEntrada(EntradaDTO entrada)
        {
            using (var dbContext = new LunchPSLDBEntities())
            {
                dbContext.Entradas.Add(new Entradas
                {
                    EntradasId = entrada.Id,
                    Nombre = entrada.Nombre,
                    Activo = entrada.Activo
                });
                dbContext.SaveChanges();
                return true;
            }
        }

        public IList<EntradaDTO> ObtenerEntradas(bool onlyActive)
        {
            using (var dbContext = new LunchPSLDBEntities())
            {
                var entradas = (from entrada in dbContext.Entradas
                                where (entrada.Activo == true || onlyActive == false)
                                select new EntradaDTO
                                {
                                    Id = entrada.EntradasId,
                                    Nombre = entrada.Nombre,
                                    Activo = entrada.Activo,
                                    Cheched = (entrada.Activo ? "checked" : "")
                                }).ToList();

                return entradas;
            }
        }

        public bool ActualizarEntrada(EntradaDTO entrada)
        {
            using (var dbContext = new LunchPSLDBEntities())
            {
                Entradas entradaToUpdate = dbContext.Entradas.Where(s => s.EntradasId == entrada.Id).FirstOrDefault<Entradas>();
                entradaToUpdate.Nombre = entrada.Nombre;
                entradaToUpdate.Activo = entrada.Activo;
                dbContext.SaveChanges();
                return true;
            }
        }

        public bool EliminarEntrada(EntradaDTO entrada)
        {
            using (var dbContext = new LunchPSLDBEntities())
            {
                var entradaAEliminar = dbContext.Entradas.Where(s => s.EntradasId == entrada.Id).FirstOrDefault<Entradas>();

                dbContext.Entradas.Remove(entradaAEliminar);
                dbContext.SaveChanges();
                return true;
            }
        }
    }
}
