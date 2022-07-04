import { Component, OnInit , } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }
  get f() { return this.form.controls; }
  onSubmit() {
    if (this.form.invalid) {
      alert('Invalid form');
    } else {
      alert('Form submitted');
    }
  }
  ngOnInit(): void {
    
  }

}
