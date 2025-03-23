import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css']
})
export class ClientFormComponent {
  clientForm: FormGroup;
  showModal = false;

  constructor(private fb: FormBuilder) {
    this.clientForm = this.fb.group({
      fullname: ['', [Validators.required, Validators.maxLength(60)]],
      document: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  submitForm() {
    if (this.clientForm.valid) {
      console.log('Cliente creado:', this.clientForm.value);
      this.closeModal();
      this.clientForm.reset();
    }
  }
}
