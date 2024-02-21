import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogData, DialogComponent } from '../../../../shared/components/dialog/dialog.component';
import { StudentService } from '../../services/student.service';

import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, MatTabsModule, MatTableModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  displayedColumns: string[] = ['Exam name', 'Exam grade'];
  dataSource = [
    {
      examName: "Exam 1",
      examGrade: 20,
    },
    {
      examName: "Exam 2",
      examGrade: 20,
    },
    {
      examName: "Exam 3",
      examGrade: 20,
    },
    {
      examName: "Exam 4",
      examGrade: 20,
    },
  ];
  constructor(private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialogRef: MatDialogRef<DialogComponent>) { }

}
