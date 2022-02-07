import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { StreamService } from 'src/app/services/stream/stream.service';
import { Stream } from 'src/app/types/stream.types';

@Component({
  selector: 'app-stream-list',
  templateUrl: './stream-list.component.html',
  styleUrls: ['./stream-list.component.scss']
})
export class StreamListComponent implements OnInit {

  streams$!: Observable<Stream[]>;
  streams!: Stream[];

  constructor(
    private streamService: StreamService
  ) { }

  ngOnInit(): void {
    this.getStreams();
  }

  getStreams() {
    this.streams$ = this.streamService.getStreams();
    this.streams$.subscribe(
      (streams) => {
        this.streams = streams;
      }
    );
  }

}
