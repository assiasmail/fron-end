import { Component, OnInit, Inject } from '@angular/core';
import { Employe } from '../share/employe.model';
import { MatDialogRef, MatFormFieldControl, MAT_DIALOG_DATA } from '@angular/material';
import { EmployeService } from '../shared/employe.service';

@Component({
  selector: 'app-employe',
  templateUrl: './employe.component.html',
  styleUrls: ['./employe.component.css']
})
export class EmployeComponent implements OnInit {
  
  setDescribedByIds(ids: string[]): void {
    throw new Error("Method not implemented.");
  }
  onContainerClick(event: MouseEvent): void {
    throw new Error("Method not implemented.");
  }
  //,@Inject(MAT_DIALOG_DATA) public data: Employe
  employe: Employe;

  constructor(private dialogRef: MatDialogRef<EmployeComponent>,private service: EmployeService) { 
  
  }

  ngOnInit() {
   
    this.employe =  (Object.assign({},this.service.getEmployeToEdit()));

  }

  saveOrUpdate(){
    this.service.saveOrUpdate(this.employe);
  }
}
