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
    
    public partial class Menu
    {
        public Menu()
        {
            this.Almuerzos = new HashSet<Almuerzos>();
        }
    
        public int MenuId { get; set; }
        public string Nombre { get; set; }
        public int Costo { get; set; }
        public bool Activo { get; set; }
    
        public virtual ICollection<Almuerzos> Almuerzos { get; set; }
    }
}
