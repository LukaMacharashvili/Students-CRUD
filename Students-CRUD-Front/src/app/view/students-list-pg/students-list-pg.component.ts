import { Component, EventEmitter, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GetAllStudentSignalEmitterService } from 'src/app/services/emitters/get-all-student-signal-emitter.service';
import { StudentsDataProxyService } from 'src/app/services/http-proxy/students-data-proxy.service';
import { AddStudentModComponent } from '../add-student-mod/add-student-mod.component';
import { UpdateStudentModComponent } from '../update-student-mod/update-student-mod.component';

@Component({
  selector: 'app-students-list-pg',
  templateUrl: './students-list-pg.component.html',
  styleUrls: ['./students-list-pg.component.css']
})
export class StudentsListPgComponent implements OnInit {

  studentsList!: any[];

  constructor(
    private studentsProxyS: StudentsDataProxyService,
    private dialog: MatDialog,
    private getAllStudentEmitter: GetAllStudentSignalEmitterService
  ) { }

  ngOnInit(): void {
    this.getAllStudents()
    this.getAllStudentEmitter.getAllStudentEmitter.subscribe((response: boolean) => {
      this.getAllStudents();
    })
  }

  getAllStudents() {
    this.studentsList = [];
    this.studentsProxyS.getAllStudent()
    .subscribe((response: any) => {
      this.studentsList = response;
    })
  };

  deleteStudent(id:string){
    this.studentsProxyS.deleteStudent(id)
    .subscribe((response) => {
      if(response) {
        this.getAllStudents()
      }
    })
  }

  openUpdateModal(id:string){
    this.dialog.open(UpdateStudentModComponent, {
      data: {
        id: id,
      },
    }) 
  }

  openAddNewStudentModal() {
    this.dialog.open(AddStudentModComponent);
  }
}
