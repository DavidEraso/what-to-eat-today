using Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data
{
    public class DALMenu
    {
        public bool CrearMenu(MenuDTO menu)
        {
            using (var dbContext = new LunchPSLDBEntities())
            {
                dbContext.Menu.Add(new Menu
                {
                    MenuId = menu.Id,
                    Nombre = menu.Nombre,
                    Costo = menu.Costo,
                    Activo = menu.Activo
                });
                dbContext.SaveChanges();
                return true;
            }
        }

        public IList<MenuDTO> ObtenerMenu(bool onlyActive)
        {
            using (var dbContext = new LunchPSLDBEntities())
            {
                var menus = (from menu in dbContext.Menu
                                    where (menu.Activo == true || onlyActive == false)
                                    select new MenuDTO
                                    {
                                        Id = menu.MenuId,
                                        Nombre = menu.Nombre,
                                        Costo = menu.Costo,
                                        Activo = menu.Activo,
                                        Cheched = (menu.Activo ? "checked" : "")
                                    }).ToList();

                return menus;
            }
        }

        public bool ActualizarMenu(MenuDTO menu)
        {
            using (var dbContext = new LunchPSLDBEntities())
            {
                Menu menuToUpdate = dbContext.Menu.Where(s => s.MenuId == menu.Id).FirstOrDefault<Menu>();
                menuToUpdate.Nombre = menu.Nombre;
                menuToUpdate.Costo = menu.Costo;
                menuToUpdate.Activo = menu.Activo;
                dbContext.SaveChanges();
                return true;
            }
        }

        public bool EliminarMenu(MenuDTO menu)
        {
            using (var dbContext = new LunchPSLDBEntities())
            {
                var menuAEliminar = dbContext.Menu.Where(s => s.MenuId == menu.Id).FirstOrDefault<Menu>();

                dbContext.Menu.Remove(menuAEliminar);
                dbContext.SaveChanges();
                return true;
            }
        }

    }
}
