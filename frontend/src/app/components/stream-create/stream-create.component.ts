import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StreamService } from 'src/app/services/stream/stream.service';
import { StreamCreateDto } from 'src/app/types/stream.types';
import { StreamSecretsComponent } from './stream-secrets/stream-secrets.component';

@Component({
  selector: 'app-stream-create',
  templateUrl: './stream-create.component.html',
  styleUrls: ['./stream-create.component.scss']
})
export class StreamCreateComponent implements OnInit {

  stream: StreamCreateDto = {
    description: ''
  } as StreamCreateDto;

  error: boolean = false;

  constructor(
    private dialog: MatDialog,
    private streamService: StreamService
  ) { }

  ngOnInit(): void {
  }

  createStream() {
    if(this.stream.name == '' || this.stream.name == undefined)
      this.error = true;
    else
      this.streamService.createStream(this.stream).subscribe({
        next: (stream) => {
          this.stream = stream;
          this.error = false;

          this.dialog.open(StreamSecretsComponent, { data: stream, disableClose: true });
        },
        error: (error) => {
          console.error(error);
          this.error = true;
        }
      });
  }

}
