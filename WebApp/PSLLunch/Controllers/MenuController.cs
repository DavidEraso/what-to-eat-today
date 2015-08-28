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
    public class MenuController : ApiController
    {
        // GET api/menu
        public Object Get(bool onlyActive)
        {
            DALMenu DAL = new DALMenu();
            return DAL.ObtenerMenu(onlyActive);
        }

        // POST api/menu
        public void Post(MenuDTO menu)
        {
            DALMenu DAL = new DALMenu();
            if (menu.Id != 0)
            {
                DAL.ActualizarMenu(menu);
            }
            else
            {
                DAL.CrearMenu(menu);
            }
        }

        // PUT api/menu
        public void Put(MenuDTO menu)
        {
            DALMenu DAL = new DALMenu();
            DAL.ActualizarMenu(menu);
        }

        // DELETE api/menu/5
        public void Delete(int id)
        {
            DALMenu DAL = new DALMenu();
            MenuDTO menu = new MenuDTO
            {
                Id = id
            };

            DAL.EliminarMenu(menu);
        }
    }
}
