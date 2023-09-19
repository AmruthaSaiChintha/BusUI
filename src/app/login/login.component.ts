import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
  hasValidationErrors: boolean = false;

  constructor(private http: HttpClient, private formBuilder: FormBuilder) {}

  ngOnInit(): void {}

  get f() {
    return this.form.controls;
  }

  Login(): void {
    // Check if the form is valid
    if (this.form.invalid) {
      // If the form is invalid, do not proceed with login
      this.hasValidationErrors = true;
      return;
    }

    const email = this.form.value.email;
    const password = this.form.value.password;

    const param = { email, pwd: password };

    this.http.get<any>('https://localhost:44331/api/RegisterUsers/' + email + '/' + password).subscribe(data => {
      console.log(data);

      if (data.Status === 'Error') {
        alert(data.Message);
      } else {
        localStorage.setItem('User', JSON.stringify(data));

        if (data.value.userType === 'Admin') {
          window.location.href = '/adminDashboard';
        } else {
          window.location.href = '/customerDashboard';
        }
      }
    });
  }
}