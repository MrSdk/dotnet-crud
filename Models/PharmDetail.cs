using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace lesson5.Models
{
    public class PharmDetail
    {
        //[Key]
        public int id {get;set;}
        //[Column(TypeName="varchar(16)")]
        public string name {get;set;}
        public int price {get;set;}
        public int count {get;set; }
        //[Column(TypeName = "varchar(16)")]
        public string description {get;set;}
    }
}
