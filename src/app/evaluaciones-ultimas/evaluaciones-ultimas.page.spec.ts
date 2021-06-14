import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EvaluacionesUltimasPage } from './evaluaciones-ultimas.page';

describe('EvaluacionesUltimasPage', () => {
  let component: EvaluacionesUltimasPage;
  let fixture: ComponentFixture<EvaluacionesUltimasPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EvaluacionesUltimasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EvaluacionesUltimasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
