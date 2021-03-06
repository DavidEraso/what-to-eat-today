//------------------------------------------------------------------------------
// <auto-generated>
//    This code was generated from a template.
//
//    Manual changes to this file may cause unexpected behavior in your application.
//    Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Data
{
    using System;
    using System.Collections.Generic;
    
    public partial class Almuerzos
    {
        public int Id { get; set; }
        public string NombreUsuario { get; set; }
        public int EntradaId { get; set; }
        public int MenuId { get; set; }
        public int AcompañamientoId { get; set; }
        public Nullable<int> EjecutivoCarnesId { get; set; }
        public Nullable<int> EjecutivoGuarnicionId { get; set; }
        public string Comentario { get; set; }
        public System.DateTime Fecha { get; set; }
        public Nullable<int> PagoTicket { get; set; }
        public Nullable<int> PagoSodexo { get; set; }
        public Nullable<int> PagoEfectivo { get; set; }
    
        public virtual Acompañamiento Acompañamiento { get; set; }
        public virtual EjecutivoCarnes EjecutivoCarnes { get; set; }
        public virtual EjecutivoGuarniciones EjecutivoGuarniciones { get; set; }
        public virtual Entradas Entradas { get; set; }
        public virtual Menu Menu { get; set; }
    }
}
