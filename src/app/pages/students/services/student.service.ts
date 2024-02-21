import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { apiRoutes } from '../../../core/constants/routes';
import { IStudent } from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private students = signal<IStudent[]>([])
  private classes = signal<any[]>([])

  constructor(private http: HttpClient) { }

  getStudents(): Observable<any> {
    return this.http.get(environment.serverUrl + '/' + apiRoutes.students).pipe(
      tap((data: any) => this.students.set(data)),
    )
  }

  registerStudent(student: any) {
    return this.http.post(environment.serverUrl + '/' + apiRoutes.registerStudent, student)
  }

  updateStudent(student: any, id: string) {
    return this.http.put(environment.serverUrl + '/' + apiRoutes.updateStudent + '/' + id, student)
  }


  removeStudent(id: string) {
    return this.http.delete(environment.serverUrl + '/' + apiRoutes.deleteStudent + '/' + id)
  }


  getClasses(): Observable<any> {
    return this.http.get(environment.serverUrl + '/' + apiRoutes.classes).pipe(
      tap((data: any) => this.classes.set(data)),
    )
  }

}
