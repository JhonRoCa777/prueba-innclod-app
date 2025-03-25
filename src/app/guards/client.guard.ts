import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ClientService } from '../services/client.service';
import { firstValueFrom } from 'rxjs';

export const ClientGuard: CanActivateFn = async (route, state) => {

  const clientService = inject(ClientService);
  const router = inject(Router);

  try {
    const client = await firstValueFrom(clientService.getClientSubject());

    if (client.id > 0) return true;

    router.navigate(['/']);
    return false;
  }
  catch (error) {
    router.navigate(['/']);
    return false;
  }
};
