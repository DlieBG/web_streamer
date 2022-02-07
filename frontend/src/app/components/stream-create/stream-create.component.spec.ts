import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StreamCreateComponent } from './stream-create.component';

describe('StreamCreateComponent', () => {
  let component: StreamCreateComponent;
  let fixture: ComponentFixture<StreamCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StreamCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StreamCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
