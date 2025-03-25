import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientProductsComponent } from './client-products.component';

describe('ClientProductsComponent', () => {
  let component: ClientProductsComponent;
  let fixture: ComponentFixture<ClientProductsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientProductsComponent]
    });
    fixture = TestBed.createComponent(ClientProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
