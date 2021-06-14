import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalMatrizComportamientoPage } from './modal-matriz-comportamiento.page';

describe('ModalMatrizComportamientoPage', () => {
  let component: ModalMatrizComportamientoPage;
  let fixture: ComponentFixture<ModalMatrizComportamientoPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalMatrizComportamientoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalMatrizComportamientoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
