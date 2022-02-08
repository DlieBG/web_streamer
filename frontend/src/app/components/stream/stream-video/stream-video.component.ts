import { Component, ElementRef, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Stream } from 'src/app/types/stream.types';
import Hls from 'hls.js';
import { Observable } from 'rxjs';
import { StreamService } from 'src/app/services/stream/stream.service';
import { CronJob } from 'cron';
import { ThisReceiver } from '@angular/compiler';
import { IdentityService } from 'src/app/services/identity/identity.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-stream-video',
  templateUrl: './stream-video.component.html',
  styleUrls: ['./stream-video.component.scss']
})
export class StreamVideoComponent implements OnInit {

  @Input() stream$!: Observable<Stream>;
  stream!: Stream;

  @ViewChild('video', { static: true }) video!: ElementRef<any>;

  loading: boolean = true;
  error: boolean = false;
  
  cron!: CronJob;

  constructor(
    private streamService: StreamService,
    public identityService: IdentityService
  ) { }

  ngOnInit(): void {
    this.stream$.subscribe(
      (stream) => {
        this.stream = stream;
        this.loadVideo();

        this.cron = new CronJob('*/10 * * * * *', () => this.viewerPing(stream._id));
        this.cron.start();
      }
    );
  }

  ngOnDestroy(): void {
    this.cron.stop();
  }

  viewerPing(id: string) {
    if(this.video.nativeElement.paused)
      this.stream$ = this.streamService.getStream(id);
    else
      this.stream$ = this.streamService.viewerPing(id);

    this.stream$.subscribe(
      (stream) => {
        this.stream = stream;
        setTimeout(() => this.viewerPing(id), 10000);
      }
    );
  }

  loadVideo() {
    let hls = new Hls({
      lowLatencyMode: true,
      autoStartLoad: true
    });

    hls.loadSource(`${environment.stream}/${this.stream._id }.m3u8`);
    hls.attachMedia(this.video.nativeElement);

    this.video.nativeElement.addEventListener('loadedmetadata', () => {
      this.loading = false;
      this.error = false;

      this.play();
    });

    setTimeout(() => {
      if(this.loading)
        this.error = true;
    }, 2500);
  }

  play() {
    this.video.nativeElement.currentTime = this.video.nativeElement.duration - 10;
    this.video.nativeElement.play();
  }

  pause() {
    this.video.nativeElement.pause();
  }

  test() {
    // console.log(this.video.nativeElement.currentTime);
    // console.log(this.video.nativeElement.duration);
    // console.log(this.video.nativeElement);
    // this.video.nativeElement.currentTime = this.video.nativeElement.duration - 10;
    // this.video.nativeElement.play();
  }

}
