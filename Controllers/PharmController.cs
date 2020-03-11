using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http.Cors;
using lesson5.Db;
using lesson5.Models;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace lesson5.Controllers
{ 
    [Route("api/[controller]")]
    [ApiController]
    public class PharmController : PharmDirectory
    {
        public List<PharmDetail> pharms;
         
    public PharmController()
        {
            pharms = new List<PharmDetail>{
                new PharmDetail{ id=0,name="Sitromol",price=3000,count=97,description="some desc"},
            };
             
        }
         
        [HttpGet]
        public IEnumerable<PharmDetail> Get()
        {
             List<PharmDetail> _pharms = this.getPharms();
            
            return _pharms;
        }
         
        [HttpGet("{id}")]
        public JsonResult Get(int id)
        {

            PharmDetail newPharm = this.getOnePharm(id);

            if ( newPharm != null )
            {
                return new JsonResult(newPharm);
            }
            else
            {
                return new JsonResult(new { status=404, message="Pharm not found (" });
            }
            
        }
         
        [HttpPost]
        public JsonResult Post([FromBody] PharmDetail obj)
        {
            PharmDetail newPharm = new PharmDetail{ 
                id= this.countPharms() + 1,
                name= obj.name,
                price= obj.price,
                count= obj.count,
                description= obj.description,
            };

            this.savePharm(newPharm);
             
            return Json(new { success = true, newPharm = newPharm, msg = "Pharm successfully added !!!" });
        }
         
        [HttpPut("{id}")]
        public JsonResult Put(int id, [FromBody] PharmDetail pharm)
        {
            Boolean success = this.findPharmByIdAndUpdate(id, pharm);
            return Json( new { success = success } );
        }
         
        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            Boolean success = this.findPharmByIdAndRemove(id);
            return Json(new { success = success });
        }
    }
}
