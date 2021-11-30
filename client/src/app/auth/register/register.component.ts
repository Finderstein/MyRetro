import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
    form!: FormGroup;
    hide = true;

    constructor(private authService: AuthService) {}

    ngOnInit(): void {
        this.form = new FormGroup({
            firstName: new FormControl('', [
                Validators.required,
                Validators.minLength(3),
            ]),
            lastName: new FormControl('', [
                Validators.required,
                Validators.minLength(3),
            ]),
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [
                Validators.required,
                Validators.minLength(5),
            ]),
        });
    }

    onSubmit() {
        const data = { ...this.form.value };
        this.authService.register(
            data.firstName,
            data.lastName,
            data.email,
            data.password
        );
    }
}
