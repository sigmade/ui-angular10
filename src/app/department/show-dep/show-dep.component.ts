import { Component, OnInit } from '@angular/core';
import { fromEventPattern } from 'rxjs';
import {SharedService} from 'src/app/shared.service';

@Component({
  selector: 'app-show-dep',
  templateUrl: './show-dep.component.html',
  styleUrls: ['./show-dep.component.css']
})
export class ShowDepComponent implements OnInit {

  constructor(private service:SharedService) { }

  DepartmentList:any=[];

  ModalTitle:string;
  ActvateAddEditDepComp:boolean=false;
  dep:any;

  ngOnInit(): void {
    this.refreshDeplist();    
  }

  addClick(){
    this.dep={
      DepartmentId:0,
      DepartmentName:""
    }
    this.ModalTitle="Add Department";
    this.ActvateAddEditDepComp=true;
  }

  deleteClick(item){
    if(confirm('Are you sure??')){
      this.service.deleteDepartment(item.DepartmentId).subscribe(data=>{
        alert(data.toString());
        this.refreshDeplist();
      })
    }
  }

  editClick(item){
    this.dep=item;
    this.ModalTitle="Edit Department";
    this.ActvateAddEditDepComp=true;
  }

  closeClick(){
    this.ActvateAddEditDepComp=false;
    this.refreshDeplist();
  }

  refreshDeplist(){
    this.service.getDepList().subscribe(data=>{
      this.DepartmentList=data;
    })
  }

}
