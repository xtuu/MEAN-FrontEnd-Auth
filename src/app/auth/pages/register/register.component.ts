import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',

})
export class RegisterComponent {

  miFormulario: FormGroup = this.fb.group({
    name: ['Adrian', [Validators.required]],
    email: ['test1@test.com', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required, Validators.minLength(6)]],

  })


  constructor(
    private fb: FormBuilder
  ) { }


  registro() {
console.log(this.miFormulario.value)
console.log(this.miFormulario.valid)

  }

}
