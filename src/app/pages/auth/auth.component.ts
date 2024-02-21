import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormField, MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { webRoutes } from '../../core/constants/routes';
import { AuthService } from '../../core/services/auth.service';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [ReactiveFormsModule, MatInputModule, MatFormField, MatButtonModule, MatIconModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private userService: UserService) {

  }

  ngOnInit(): void {
    this.initForm()
  }

  initForm() {
    this.form = this.fb.group({
      email: ['teacher@schoolxyz.com', Validators.required],
      password: ['teacher@schoolxyz.com', Validators.required]
    })
  }

  onLogin() {
    if (this.form.valid) {
      this.authService.login(this.form.value.email, this.form.value.password).subscribe(res => {
        //Set autheticated user
        this.userService.setToken(res);
        //Redirect after successful authetication
        this.router.navigateByUrl('/' + webRoutes.students);
      }, err => {
        alert(err.message)
      })
    }
  }
}
