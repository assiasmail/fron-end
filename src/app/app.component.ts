import { Component, OnInit, ViewChild } from '@angular/core';
import { Employe } from './share/employe.model';
import { MatTableDataSource, MatTable } from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material/dialog';
import { EmployeComponent } from './employe/employe.component';
import { EmployeService } from './shared/employe.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  @ViewChild(MatTable, { static: false}) table: MatTable<Employe>;

  title = 'test-frontEnd';
  critere: string;
  datasource: MatTableDataSource<Employe>;
  displayedColumns = ['nom', 'prenom', 'adresse', 'dateNaissance','dateEntree', 'action'];
  
  constructor(private dialog: MatDialog, private service: EmployeService) {}

  ngOnInit(){
  this.critere = 'nom';
  this.datasource = new MatTableDataSource(this.service.employees);
  }


  onDelete(row: Employe){

   this.service.deleteEmploye(row.id);
   this.datasource = new MatTableDataSource(this.service.employees);
   
  }
  
  openDialog(row: Employe){
  
    this.service.setEmployeToEdit(row.id);
    let dialogRef = this.dialog.open(EmployeComponent,{
      maxWidth: '450px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.datasource = new MatTableDataSource(this.service.employees);
      
    });
  }
  onAdd(){
    let dialogRef = this.dialog.open(EmployeComponent,{
      maxWidth: '450px'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.datasource = new MatTableDataSource(this.service.employees);
      
    });
  }

  dedoublone(){
    this.service.dedoublonner(this.critere).subscribe(
      data =>{
          this.datasource = new MatTableDataSource(data);
      },
      error => {
         // console.log('error');
      }
      
    )
  
  }
}
