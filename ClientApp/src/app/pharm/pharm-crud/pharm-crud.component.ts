import { Component, OnInit } from '@angular/core';
import { PharmService } from 'src/app/shared/service/pharm.service'; 
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms'; 
import Swal from 'sweetalert2'
import './../../shared/model/pharm.model';

@Component({
  selector: 'app-pharm-crud',
  templateUrl: './pharm-crud.component.html',
  styleUrls: ['./pharm-crud.component.css']
})
export class PharmCrudComponent implements OnInit {
  
  checkoutForm = new FormGroup({
    name: new FormControl('',Validators.required),
    price: new FormControl(0,Validators.required),
    count: new FormControl(0,Validators.required),
    description: new FormControl('',Validators.required),
  });
 
  updPharm = new FormGroup({
    id: new FormControl(0,Validators.required),
    name: new FormControl('',Validators.required),
    price: new FormControl(0,Validators.required),
    count: new FormControl(0,Validators.required),
    description: new FormControl('',Validators.required),
  });
  
  updSelected: Boolean = false;

  selected;
  pharms ;
  constructor(public pharmSvc: PharmService) {
    this.toNextSlider(1);  
    this.getPharms() 
  }

  ngOnInit(): void {
      
  }

  toNextSlider(id: Number){
    this.selected = new FormControl(id)
  }

  public save(){
    this.pharmSvc.save(this.checkoutForm.value).subscribe(res => {

       
      this.checkoutForm.setValue({ 
        name: '',
        price: 0,
        count: 0,
        description: ''
      })
      
      this.toNextSlider(1);  
      this.getPharms();

      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        onOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'success',
        title: 'Pharm was successfully added!'
      })
    });
  }

  public getPharms(){
    this.pharmSvc.getAll().subscribe( res => {
      this.pharms = res;
      console.log(this.pharms);
      
    } )

    //this.pharms = this.pharmSvc.pharms;
  }

  public selectPharm(id: number){
    let phar = this.pharms.find( phar => phar.id == id );
    
    this.updPharm.setValue({
      id: phar.id,
      name: phar.name,
      price: phar.price,
      count: phar.count,
      description: phar.description
    })
    
    this.updSelected = true;
  }

  public clear(){
    this.updPharm.setValue({
      id: 0,
      name: '',
      price: 0,
      count: 0,
      description: ''
    })
    this.updSelected = false;
  }

  public update(){
    
    this.pharmSvc.update(this.updPharm.get("id").value,this.updPharm.value).subscribe((res)=>{
      this.clear();
      this.getPharms();
      Swal.fire(
        '',
        'Pharm successfully updated',
        'success'
      )
    })

  }

  public delete(id: number){
      Swal.fire({
        title: 'Are you sure?', 
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          this.pharmSvc.delete(id).subscribe((res => {
            this.getPharms();
            Swal.fire(
              '',
              'Pharm was deleted!',
              'success'
            )
          }))
        }
      })
  }

}
