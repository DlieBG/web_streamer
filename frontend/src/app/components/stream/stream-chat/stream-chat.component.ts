import { Component, Input, OnInit } from '@angular/core';
import { Stream } from 'src/app/types/stream.types';

@Component({
  selector: 'app-stream-chat',
  templateUrl: './stream-chat.component.html',
  styleUrls: ['./stream-chat.component.scss']
})
export class StreamChatComponent implements OnInit {

  @Input() stream!: Stream;

  constructor() { }

  ngOnInit(): void {
  }

}
