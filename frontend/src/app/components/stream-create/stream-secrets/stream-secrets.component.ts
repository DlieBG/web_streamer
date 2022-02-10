import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IdentityService } from 'src/app/services/identity/identity.service';
import { Stream } from 'src/app/types/stream.types';

@Component({
  templateUrl: './stream-secrets.component.html',
  styleUrls: ['./stream-secrets.component.scss']
})
export class StreamSecretsComponent implements OnInit {

  host!: string;
  obsServer!: string;
  obsStreamKey!: string;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public stream: Stream,
    private identityService: IdentityService
  ) { }

  ngOnInit(): void { 
    this.host = window.location.hostname;
    this.obsServer = `rtmp://${this.host}:1935/live`;
    this.obsStreamKey = `${this.stream._id}?key=${this.stream.key}`;

    this.identityService.setKey(this.stream._id, this.stream.key);
  }

}
