import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetAllStudentSignalEmitterService {

  constructor() { }

  public getAllStudentEmitter: EventEmitter<boolean> = new EventEmitter();

}
