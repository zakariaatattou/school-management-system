import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { StudentService } from '../../services/student.service';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DialogComponent, DialogData } from '../../../../shared/components/dialog/dialog.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatNativeDateModule, NativeDateAdapter } from '@angular/material/core';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core'; // Adjust for your library

const MY_CUSTOM_FORMATS = {
  parse: {
    dateInput: 'MM/DD/YYYY', // Your custom format
  },
  display: {
    dateInput: 'MM/DD/YYYY', // Your custom format
  },
};


@Component({
  selector: 'app-form',
  standalone: true,
  providers: [{ provide: DateAdapter, useClass: NativeDateAdapter }, // Or your preferred implementation
  { provide: MAT_DATE_FORMATS, useValue: MY_CUSTOM_FORMATS }],
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, CommonModule,
    MatSelectModule,
    MatButtonModule, MatIconModule,
    MatNativeDateModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent implements OnInit {
  form: FormGroup;
  $classes = this.studentService.getClasses()

  constructor(private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private studentService: StudentService,
    public dialogRef: MatDialogRef<DialogComponent>) { }


  ngOnInit(): void {
    this.initForm(this.data?.student)

  }

  initForm(student?: any) {
    this.form = this.fb.group({
      firstName: [student ? student.firstName : null, Validators.required],
      lastName: [student ? student.lastName : null, Validators.required],
      age: [student ? student.age : null, Validators.required],
      address: [student ? student.address : null, Validators.required],
      dateOfBirth: [student ? student.dateOfBirth : null, Validators.required],
      gender: [student ? student.gender : null, Validators.required],
      className: [student ? student.className : null, Validators.required],
    })
  }


  onSave() {
    if (this.form.valid) {
      this.dialogRef.close({ event: this.data?.student ? 'update' : 'create', data: this.form.value });
    }
  }

  onCancel() {
    this.form.reset();
    this.dialogRef.close();
  }
}
