import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StreamAdminListComponent } from './stream-admin-list.component';

describe('StreamAdminListComponent', () => {
  let component: StreamAdminListComponent;
  let fixture: ComponentFixture<StreamAdminListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StreamAdminListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StreamAdminListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
