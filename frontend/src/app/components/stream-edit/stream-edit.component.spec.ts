import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StreamEditComponent } from './stream-edit.component';

describe('StreamEditComponent', () => {
  let component: StreamEditComponent;
  let fixture: ComponentFixture<StreamEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StreamEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StreamEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
