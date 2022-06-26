import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class StudentsDataProxyService {

  constructor(private proxy: HttpClient) { }

  getAllStudent(){
    const fullUrl = `${environment.apiBaseUrl}/students`;
    return this.proxy.get(fullUrl);
  }

  getStudentById(id:string){
    const fullUrl = `${environment.apiBaseUrl}/students/${id}`;
    return this.proxy.get(fullUrl);
  }

  addStudent(studentData:any){
    const fullUrl = `${environment.apiBaseUrl}/students`;
    const headers = new HttpHeaders()
    .set('content-type', 'application/json');
    return this.proxy.post(fullUrl, studentData, { headers: headers })
  }

  updateStudent(studentData:any, id:string){
    const fullUrl = `${environment.apiBaseUrl}/students/${id}`;
    const headers = new HttpHeaders()
    .set('content-type', 'application/json');
    return this.proxy.put(fullUrl, studentData, { headers: headers })
  }
  
  deleteStudent(id:string){
    const fullUrl = `${environment.apiBaseUrl}/students/${id}`;
    return this.proxy.delete(fullUrl);
  }

}
