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

  @ViewChild('video', { static: true }) video!: ElementRef<any>;

  loading: boolean = true;
  error: boolean = false;

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
        this.loadVideo();
      }
    );
  }

  loadVideo() {
    let hls = new Hls({
      lowLatencyMode: true,
      autoStartLoad: true
    });

    hls.loadSource('http://10.16.2.3:81/live/' + this.stream._id + '.m3u8');
    hls.attachMedia(this.video.nativeElement);

    this.video.nativeElement.addEventListener('loadedmetadata', () => {
      this.loading = false;
      this.error = false;
    });

    setTimeout(() => {
      if(this.loading)
        this.error = true;
    }, 2500);
  }

  test() {
    console.log(this.video.nativeElement.currentTime);
    console.log(this.video.nativeElement.duration);
    console.log(this.video.nativeElement);
    this.video.nativeElement.currentTime = this.video.nativeElement.duration - 10;
    this.video.nativeElement.play();

    Fingerprint.load().then(fp => fp.get()).then(result => {
      console.log(result.visitorId);
    });
  }

}
