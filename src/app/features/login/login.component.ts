import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { LoginModel, LoginResponse } from 'src/app/core/models/login';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { SnackBarService } from 'src/app/core/services/snack/snack.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form!: FormGroup;
  destroyed$: Subject<boolean> = new Subject<boolean>();
  inputType = 'password';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snack: SnackBarService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      email: [],
      password: [],
    });
  }

  login(loginModel: LoginModel): void {
    this.authService.login(loginModel)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((result: LoginResponse) => {
        if (!result.success) {
          return this.snack.showError(result.errors.join('\n'));
        }

        this.router.navigate(['internal', 'main']);
      }
    );
  }

  changeInputType(): void {
    this.inputType == 'text' ? this.inputType = 'password' : this.inputType = 'text';
  }
}

