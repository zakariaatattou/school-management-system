import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { DialogComponent } from '../../shared/components/dialog/dialog.component';
import { FormComponent } from './components/form/form.component';
import { StudentService } from './services/student.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { map, Observable, tap } from 'rxjs';
import { RouterLink } from '@angular/router';
import { ConfirmationDialogComponent } from '../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { FilterFormComponent } from './components/filter-form/filter-form.component';
import { ProfileComponent } from './components/profile/profile.component';
import { IStudent } from './models/student';
@Component({
  selector: 'app-students',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatTableModule, CommonModule, MatPaginatorModule, RouterLink],
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})
export class StudentsComponent implements AfterViewInit {
  displayedColumns: string[] = ['Fullname', 'Class', 'Age', 'Address', 'Date of Birth', 'Gender', 'actions'];
  $students = this.studentsService.getStudents();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(public dialog: MatDialog, public studentsService: StudentService) { }


  openDialog(): void {

  }

  ngAfterViewInit() {
    // this.$students['paginator'] = this.paginator;
  }


  onAddStudent() {
    const dialogRef = this.dialog.open(DialogComponent, {
      panelClass: 'custom-modalbox',
      width: '20vw',
      data: { component: FormComponent, title: "New Student" },
      enterAnimationDuration: 0,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.event === 'create') this.onRegisterStudentConfirmed(result.data)
    });
  }

  onRemoveStudent(id: string) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { title: "Action Confimation", message: "Are you sure you want to proceed with this action?" }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.onRemoveStudentConfirmed(id)
    })
  }


  onUpdateStudent(student: any) {
    const dialogRef = this.dialog.open(DialogComponent, {
      panelClass: 'custom-modalbox',
      width: '20vw',
      data: { component: FormComponent, title: "Update Student", student: student },
      enterAnimationDuration: 0,
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result.event === 'update') this.onUpdateStudentConfirmed(result.data, student._id)

    });
  }

  onFilter() {
    const dialogRef = this.dialog.open(DialogComponent, {
      panelClass: 'custom-modalbox',
      width: '20vw',
      data: { component: FilterFormComponent, title: "Filter Students" },
      enterAnimationDuration: 0,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.event === 'filter') {
        this.$students = this.studentsService.getStudents().pipe(
          map(data => data.filter((item: any) => item.className == result.data.className)),
        );
      } else {
        this.$students = this.studentsService.getStudents();
      }
    });
  }

  onViewProfile(student: IStudent) {
    const dialogRef = this.dialog.open(DialogComponent, {
      panelClass: 'custom-modalbox',
      width: '20vw',
      data: { component: ProfileComponent, title: student.firstName + ' ' + student.lastName + ' Profile', student: student },
      enterAnimationDuration: 0,
    });
  }


  onRegisterStudentConfirmed(student: any) {
    this.studentsService.registerStudent(student).subscribe(res => {
      this.$students = this.studentsService.getStudents();
      alert("Student was successfully added");
    })
  }

  onUpdateStudentConfirmed(student: any, id: string) {
    this.studentsService.updateStudent(student, id).subscribe(res => {
      this.$students = this.studentsService.getStudents();
      alert("Student was successfully updated");
    })
  }


  onRemoveStudentConfirmed(id: string) {
    this.studentsService.removeStudent(id).subscribe(res => {
      this.$students = this.studentsService.getStudents();
      alert("Student was successfully deleted");
    })
  }

}
