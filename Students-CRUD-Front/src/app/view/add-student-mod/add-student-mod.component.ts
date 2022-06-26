import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { GetAllStudentSignalEmitterService } from 'src/app/services/emitters/get-all-student-signal-emitter.service';
import { StudentsDataProxyService } from 'src/app/services/http-proxy/students-data-proxy.service';

@Component({
  selector: 'app-add-student-mod',
  templateUrl: './add-student-mod.component.html',
  styleUrls: ['./add-student-mod.component.css']
})
export class AddStudentModComponent implements OnInit {

  uploadedImg!:any;  
  constructor(
    private studentsProxyS: StudentsDataProxyService,
    private dialog: MatDialog,
    private getAllStudentEmitter: GetAllStudentSignalEmitterService
  ) { }

  ngOnInit(): void {
  }

  studentForm:FormGroup = new FormGroup({
    name: new FormControl<string|null>(null, Validators.required),
    surname: new FormControl<string|null>(null),
    email: new FormControl<string|null>(null, [Validators.required, Validators.email]),
    image: new FormControl<string|null>(null),
    gender: new FormControl<string|null>(null)
  })

  onImageUpload(event: any) {
    const reader = new FileReader()
    reader.onload = () => {
      this.uploadedImg = reader.result;
    }
    reader.readAsDataURL(event.target.files[0])
  }

  onFormSubmit() {
    this.studentForm.value.image = this.uploadedImg;
    this.studentsProxyS.addStudent(this.studentForm.value)
    .subscribe((response) => {
      if(response) {
        this.getAllStudentEmitter.getAllStudentEmitter.emit(true)
        this.dialog.closeAll()
      }
    })
  }
}
