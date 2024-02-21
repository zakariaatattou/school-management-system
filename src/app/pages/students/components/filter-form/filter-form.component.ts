import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { DialogComponent, DialogData } from '../../../../shared/components/dialog/dialog.component';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-filter-form',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, ReactiveFormsModule, CommonModule, MatButtonModule],
  templateUrl: './filter-form.component.html',
  styleUrl: './filter-form.component.scss'
})
export class FilterFormComponent implements OnInit {
  form: FormGroup;

  $classes = this.studentService.getClasses()

  constructor(private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private studentService: StudentService,
    public dialogRef: MatDialogRef<DialogComponent>) { }


  ngOnInit(): void {
    this.initForm()
  }


  initForm() {
    this.form = this.fb.group({
      className: [null]
    })
  }


  onReset() {
    this.form.reset();
    this.dialogRef.close({ event: 'reset', data: this.form.value });
  }

  onSave() {
    this.dialogRef.close({ event: 'filter', data: this.form.value });

  }
}
