import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StreamChatComponent } from './stream-chat.component';

describe('StreamChatComponent', () => {
  let component: StreamChatComponent;
  let fixture: ComponentFixture<StreamChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StreamChatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StreamChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
