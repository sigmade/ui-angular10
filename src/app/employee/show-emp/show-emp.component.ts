import { Component, OnInit } from '@angular/core';
import {SharedService} from 'src/app/shared.service';

@Component({
  selector: 'app-show-emp',
  templateUrl: './show-emp.component.html',
  styleUrls: ['./show-emp.component.css']
})
export class ShowEmpComponent implements OnInit {

  constructor(private service:SharedService) { }

  
  EmployeeList:any=[];

  ModalTitle:string;
  ActvateAddEditEmpComp:boolean=false;
  emp:any;

  ngOnInit(): void {
    this.refreshEmplist();    
  }

  addClick(){
    this.emp={
      EmployeeId:0,
      EmployeeName:"",
      Department:"",
      DateOfJoining:"",
      PhotoFileName:"anonymous.png"
    }
    this.ModalTitle="Add Employee";
    this.ActvateAddEditEmpComp=true;
  }

  deleteClick(item){
    if(confirm('Are you sure??')){
      this.service.deleteEmployee(item.EmployeeId).subscribe(data=>{
        alert(data.toString());
        this.refreshEmplist();
      })
    }
  }

  editClick(item){
    this.emp=item;
    this.ModalTitle="Edit Employee";
    this.ActvateAddEditEmpComp=true;
  }

  closeClick(){
    this.ActvateAddEditEmpComp=false;
    this.refreshEmplist();
  }

  refreshEmplist(){
    this.service.getEmpList().subscribe(data=>{
      this.EmployeeList=data;
    })
  }

}
