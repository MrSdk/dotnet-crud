using lesson5.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace lesson5.Db
{
    public class PharmDirectory : Controller
    {
        public PharmDirectory()
        { 

            if (!System.IO.File.Exists("C:\\Users\\Mr_Sdk\\source\\repos\\lesson5\\lesson5\\pharma.txt"))
            {
                TextWriter tw = new StreamWriter("pharma.txt");


                tw.Close();
            }
        }

// GET[ '/api/person' ]
        public List<PharmDetail> getPharms()
        {
            List<PharmDetail> pharms = new List<PharmDetail>{ };
             
                TextReader tr = new StreamReader("pharma.txt") ;

                string read;

                while ((read = tr.ReadLine()) != null)
                {
                    int id;
                    string name;
                    int price;
                    int count;
                    string description;

                   
                    string[] words = read.TrimStart(',').Split(',');
                  
                    id = int.Parse(words[0]);
                    name = words[1];
                    price = int.Parse(words[2]);
                    count = int.Parse(words[3]);
                    description = words[4];
                    pharms.Add(new PharmDetail { id=id,name=name,price=price,count=count,description= description });

                }

                tr.Close();
            

            return pharms;
        }

// GET[ '/api/person/{id}' ]
        public PharmDetail getOnePharm(int id)
        {
            return this.getPharms().Find(phar => phar.id == id);
        }

// POST[ '/api/person' ] 
        public void savePharm(PharmDetail newPharm)
        {
            List<PharmDetail> pharms = this.getPharms();

            pharms.Add(newPharm);
            this.saveAll(pharms);
        }

        private void saveAll(List<PharmDetail> pharms)
        {
            TextWriter tw = new StreamWriter("pharma.txt");

            foreach (PharmDetail pharm in pharms)
            {
                tw.Write(pharm.id + "," + pharm.name + "," + pharm.price + "," + pharm.count + "," + pharm.description + "\n");
            }

            tw.Close();
        }

        public int countPharms()
        {
            int count = 0;

            if (this.getPharms().Count != 0)
            {
                count = this.getPharms().Last().id;
            } 

            return count;
        }

        public Boolean findPharmByIdAndUpdate(int id,PharmDetail newPharm)
        {
            Boolean updated = false;
            List<PharmDetail> _pharms = this.getPharms();

            foreach( PharmDetail phar in _pharms )
            {
                if (phar.id == id)
                {
                    phar.name = newPharm.name;
                    phar.price = newPharm.price;
                    phar.count = newPharm.count;
                    phar.description = newPharm.description;
                    updated = true;
                }
            };

            if ( updated )
            {
                this.saveAll(_pharms);
            }

            return updated;
        }

        public Boolean findPharmByIdAndRemove(int id)
        {
            Boolean deleted = false;
            List<PharmDetail> _pharms = this.getPharms();
            var item = _pharms.First(x => x.id == id);
          
            deleted = _pharms.Remove(item);
            
            if (deleted)
            {
                this.saveAll(_pharms);
            }

            return deleted;
        }
         
    }
}
