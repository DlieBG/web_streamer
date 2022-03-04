import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { IdentityService } from 'src/app/services/identity/identity.service';
import { StreamService } from 'src/app/services/stream/stream.service';
import { MatDialog } from '@angular/material/dialog';
import { NoAccessComponent } from './no-access/no-access.component';
import { Observable } from 'rxjs';
import { Stream } from 'src/app/types/stream.types';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-stream-edit',
  templateUrl: './stream-edit.component.html',
  styleUrls: ['./stream-edit.component.scss']
})
export class StreamEditComponent implements OnInit {

  key!: string;

  stream$!: Observable<Stream>;
  stream!: Stream;

  error: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
    private location: Location,
    private identityService: IdentityService,
    private streamService: StreamService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if(this.identityService.getKey(params['id'])) {
        this.key = this.identityService.getKey(params['id']);
        this.getStream(params['id']);
      }
      else
        this.showNoAccess();
    });
  }

  showNoAccess() {
    let dialog = this.dialog.open(NoAccessComponent, { disableClose: true });

    dialog.afterClosed().subscribe(() => {
      this.location.back();
    });
  }

  getStream(id: string) {
    this.stream$ = this.streamService.getStream(id);
    this.stream$.subscribe((stream) => this.stream = stream);
  }

  updateStream() {
    this.streamService.updateStream(this.stream._id, this.key, this.stream).subscribe({
      next: () => {
        this.snackbar.open('Stream aktualisiert', 'ok', { duration: 2500 });
        this.error = false;
      },
      error: (error) => {
        this.snackbar.open('Fehler beim Aktualisieren', 'ok', { duration: 3500 });
        console.log(error);
        this.error = true;
      }
    });
  }

  deleteStream() {
    this.streamService.deleteStream(this.stream._id, this.key).subscribe({
      next: () => {
        this.snackbar.open('Stream gelöscht', 'ok', { duration: 2500 });
        this.router.navigate(['/']);
        this.error = false;
      },
      error: (error) => {
        this.snackbar.open('Fehler beim Löschen', 'ok', { duration: 3500 });
        console.log(error);
        this.error = true;
      }
    });
  }

}
