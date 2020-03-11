import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmCrudComponent } from './pharm-crud.component';

describe('PharmCrudComponent', () => {
  let component: PharmCrudComponent;
  let fixture: ComponentFixture<PharmCrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PharmCrudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
