import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StreamSecretsComponent } from './stream-secrets.component';

describe('StreamSecretsComponent', () => {
  let component: StreamSecretsComponent;
  let fixture: ComponentFixture<StreamSecretsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StreamSecretsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StreamSecretsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
