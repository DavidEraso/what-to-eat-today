using Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business
{
    public class EntradaManager
    {
        public bool CrearEntrada(Entradas entrada)
        {
            try
            {
                DALEntrada DAL = new DALEntrada();

                DAL.CrearEntrada(entrada);

                return true;
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
}
