import { Injectable, OnInit } from '@angular/core';
import { Employe } from '../share/employe.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({'Content-type': 'application/json; charset=utf-8'})
};

@Injectable({
  providedIn: 'root'
})
export class EmployeService implements OnInit{

  employees: Employe[] = [
    {id: 1, nom: 'Smail', prenom: 'Assia', adresse: 'Cite 90 logts Draa El Iizan', dateNaissance: new Date('1989-02-12'), dateEntree: new Date('2017-05-07') },
    {id: 2, nom: 'Si Hadj Mohand', prenom: 'Walid', adresse: 'Dar el beida', dateNaissance: new Date('1985-09-22'),dateEntree:new Date('2010-02-12') },
    {id: 3,nom: 'Smail', prenom: 'Sihem', adresse: 'Draa El Mizan', dateNaissance: new Date('1985-03-23'),dateEntree:new Date('2016-09-01') },
  
  ];


  employeToEdit: Employe;
    
  

  constructor(private http: HttpClient) { }

  ngOnInit(){
      this.employeToEdit = new Employe();
  }

  getEmployeToEdit(){
    return this.employeToEdit;
  }

  setEmployeToEdit(id: number){
    this.employeToEdit = this.employees.find(emp => emp.id === id);
  }

  deleteEmploye(id: number){
    let index = this.employees.findIndex(emp => emp.id === id);
    this.employees.splice(index,1);
  }

  dedoublonner(critere: string){
 
     return this.http.post<Employe[]>('/server/filtreSalarie?critere='+critere, this.employees);
    
  }

  saveOrUpdate(employe: Employe){
    if(employe.id){
      let index = this.employees.findIndex(emp => emp.id === employe.id);
      this.employees[index].adresse = employe.adresse;
      this.employees[index].dateEntree = employe.dateEntree;
      this.employees[index].dateNaissance = employe.dateNaissance;
      this.employees[index].nom = employe.nom;
      this.employees[index].prenom = employe.prenom;
    }else{
       employe.id = this.employees.length + 1;
       this.employees.push(employe);
    }
  }
}
