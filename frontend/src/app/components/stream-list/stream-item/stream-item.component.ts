import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import Hls from 'hls.js';
import { Stream } from 'src/app/types/stream.types';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-stream-item',
  templateUrl: './stream-item.component.html',
  styleUrls: ['./stream-item.component.scss']
})
export class StreamItemComponent implements OnInit {

  @Input() stream!: Stream;

  @ViewChild('preview', { static: true }) preview!: ElementRef<any>;

  loading: boolean = true;
  error: boolean = false;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadPreview();
  }

  loadPreview() {
    this.loading = true;
    this.error = false;

    let hls = new Hls({
      maxBufferLength: 1
    });

    hls.loadSource(`${environment.stream}/${this.stream._id }.m3u8`);
    hls.attachMedia(this.preview.nativeElement);

    this.preview.nativeElement.addEventListener('loadedmetadata', () => {
      this.loading = false;
      this.error = false;
    });

    setTimeout(() => {
      if(this.loading)
        this.error = true;
    }, 2500);
  }

  openStream() {
    if(!this.loading)
      this.router.navigate(['stream', this.stream._id]);
  }

}
