import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GetAllStudentSignalEmitterService } from 'src/app/services/emitters/get-all-student-signal-emitter.service';
import { StudentsDataProxyService } from 'src/app/services/http-proxy/students-data-proxy.service';

@Component({
  selector: 'app-update-student-mod',
  templateUrl: './update-student-mod.component.html',
  styleUrls: ['./update-student-mod.component.css']
})
export class UpdateStudentModComponent implements OnInit {

  studentData:any = {};
  uploadedImage!:any;

  constructor(
      @Inject(MAT_DIALOG_DATA) public data: any,
      private studentProxyS: StudentsDataProxyService,
      private getAllStudentEmitter: GetAllStudentSignalEmitterService,
      private dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.getStudentById()
  }

  getStudentById() {
    this.studentProxyS.getStudentById(this.data.id)
    .subscribe((response: any) => {
        if(response) {
          this.studentData = response;
          this.uploadedImage = this.studentData.image
        }
    })
  }

  onImageUpload(event: any) {
    const reader = new FileReader()
    reader.onload = () => {
      this.uploadedImage = reader.result;
      this.studentData.image = reader.result;
    }
    reader.readAsDataURL(event.target.files[0])
  }

  onFormSubmit() {
    this.studentProxyS.updateStudent(this.studentData, this.data.id)
    .subscribe((response: any) => {
      this.getAllStudentEmitter.getAllStudentEmitter.emit(true)
      this.dialog.closeAll()
    })
  }

}
