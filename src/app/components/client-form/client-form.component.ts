import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Client, ClientIS } from '../../models/client';
import { Subscription, take } from 'rxjs';
import { ClientService } from '../../services/client.service';
import { SweetUtilService } from '../../services/sweet-util.service';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css']
})
export class ClientFormComponent {

  client$: Client = ClientIS;
  private subscription!: Subscription;

  clientForm: FormGroup;
  showModal = false;

  constructor(private fb: FormBuilder, private clientService: ClientService) {
    this.clientForm = this.fb.group({
      id: ['', [Validators.required]],
      fullname: ['', [Validators.required, Validators.maxLength(60)]],
      document: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit() {
    this.clientService.getClientSubject().subscribe(client => {
      this.client$ = client;
      this.clientForm.patchValue(client);
    });
  }

  ngOnDestroy = () => this.subscription.unsubscribe();

  openModal = () => this.showModal = true;
  closeModal = () => this.showModal = false;

  submitForm() {
    if (this.clientForm.valid) {

      if(this.clientForm.value.id == 0) this.create();
      else this.update();

      this.closeModal();
    }
  }

  create(){
    this.clientService.create(this.clientForm.value)
    .pipe(take(1))
    .subscribe({
      next: (client) => {
        this.clientService.setClientSubject(client);
        SweetUtilService.success("Cliente Creado");
      },
      error: () => SweetUtilService.warning("Error al crear Cliente")
    });
  }

  update(){
    this.clientService.update(this.clientForm.value)
    .pipe(take(1))
    .subscribe({
      next: (client) => {
        this.clientService.setClientSubject(client);
        SweetUtilService.success("Cliente Actualizado");
      },
      error: () => SweetUtilService.warning("Error al actualizar Cliente")
    });
  }
}
