using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common
{
    public class AlmuerzoDTO
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public int EntradaId { get; set; }
        public string EntradaNombre { get; set; }
        public int MenuId { get; set; }
        public string MenuNombre { get; set; }
        public int AcompañamientoID { get; set; }
        public string AcompañamientoNombre { get; set; }
        public int? CarneId { get; set; }
        public string CarneNombre { get; set; }
        public int? GuarnicionId { get; set; }
        public string GuarnicionNombre { get; set; }
        public int Costo { get; set; }
        public string Comentario { get; set; }
        public DateTime Fecha { get; set; }
        public int PagoTicket { get; set; }
        public int PagoSodexo { get; set; }
        public int PagoEfectivo { get; set; }
    }
}
