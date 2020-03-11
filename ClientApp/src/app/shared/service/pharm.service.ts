import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import {map, catchError} from 'rxjs/operators';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PharmService {
  public pharms ;
  // public url = 'https://localhost:5001/api/pharm';
  public url = '/api/pharm';
  constructor(public HttpClient: HttpClient ) { 
    this.pharms = [
      { id: 1,name: "Anzibel",count:92,price: 7000,description:"Ozbekistonda ishlab chiqarilgan" },
      { id: 2,name: "Trimol",count:102,price: 2000,description:"Turkmanistonda ishlab chiqarilgan" },
      { id: 3,name: "Gletserin",count:35,price: 1000,description:"Americada ishlab chiqarilgan" },
      { id: 4,name: "Travmaset",count:299,price: 4400,description:"Xitoyda ishlab chiqarilgan" }
    ]; 
  }

  getAll(){
    return this.HttpClient.get( this.url ).pipe(
      map((result)=>{ return result; } ),
      catchError(this.errorHandler)
    );
  }

  save(obj) {
    return this.HttpClient.post(this.url,obj).pipe(
      map((result)=>{ return result; } ),
      catchError(this.errorHandler)
    );
  }

  update(id: number,body: Pharm){
    return this.HttpClient.put(this.url + "/" + id,body).pipe(
      map((result)=>{ return result; }),
      catchError(this.errorHandler)
    );
  }

  delete(id: number) {
    return this.HttpClient.delete(this.url + "/" + id).pipe(
      map((result)=>{ return result; }),
      catchError(this.errorHandler)
    );
  }

  public errorHandler(){
    Swal.fire({
      icon: 'error',
      title: '',
      text: 'Something went wrong!',
      //footer: '<a href>Why do I have this issue?</a>'
    })
    return throwError("Something went wrong!");
  }
}
