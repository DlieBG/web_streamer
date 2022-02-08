import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Hls from 'hls.js';
import Fingerprint from '@fingerprintjs/fingerprintjs'
import { Observable } from 'rxjs';
import { Stream } from 'src/app/types/stream.types';
import { StreamService } from 'src/app/services/stream/stream.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-stream',
  templateUrl: './stream.component.html',
  styleUrls: ['./stream.component.scss']
})
export class StreamComponent implements OnInit {

  stream$!: Observable<Stream>;
  stream!: Stream;

  constructor(
    private route: ActivatedRoute,
    private streamService: StreamService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params) => {
        this.getStream(params['id']);
      }
    );
  }

  getStream(id: string) {
    this.stream$ = this.streamService.getStream(id);
    this.stream$.subscribe(
      (stream) => {
        this.stream = stream;
      }
    );
  }

}
