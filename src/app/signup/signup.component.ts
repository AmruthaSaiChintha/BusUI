import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  form!: FormGroup;
  hasValidationErrors: boolean = false; // Define the property here

  constructor(
    public userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      userName: new FormControl('', [Validators.required]),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
      contact: new FormControl('', Validators.required),
    });
  }

  get f() {
    return this.form.controls;
  }

  submit() {
    // Check if the form is valid before submitting
    if (this.form.invalid) {
      this.hasValidationErrors = true; // Set the flag to true
      return; // Don't submit the form if it's invalid
    }

    console.log(this.form.value);
    if (this.form.value.password != this.form.value.confirmPassword) {
      alert("Password and Confirm Password must be the same!");
      return; // Don't proceed with submission
    }

    // Submit the form if it's valid
    this.userService.create(this.form.value).subscribe((res: any) => {
      console.log('Account signed up successfully!');
      this.router.navigateByUrl('login');
    });
  }
}