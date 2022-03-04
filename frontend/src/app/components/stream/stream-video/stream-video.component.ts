import { Component, ElementRef, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Stream } from 'src/app/types/stream.types';
import Hls from 'hls.js';
import { Observable } from 'rxjs';
import { StreamService } from 'src/app/services/stream/stream.service';
import { CronJob } from 'cron';
import { IdentityService } from 'src/app/services/identity/identity.service';
import { environment } from 'src/environments/environment';
import { io, Socket } from 'socket.io-client';

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
  
  socket!: Socket;
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
        this.subscribe(stream._id);

        this.cron = new CronJob('*/10 * * * * *', () => this.viewerPing(stream._id));
        this.cron.start();
      }
    );
  }

  ngOnDestroy(): void {
    this.cron.stop();
  }

  subscribe(id: string) {
    this.socket = io(environment.ws, {
      path: '/ws'
    });

    this.socket.on('connect', () => {
      this.socket.emit('subscribe', id);
    });

    this.socket.on('synchronize', this.onSynchronize.bind(this));
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
    this.loading = true;
    this.error = false
    
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

  synchronize() {
    this.streamService.synchronize(this.stream._id, 0).subscribe();
  }

  onSynchronize(time: number) {
    this.play();
  }

}
