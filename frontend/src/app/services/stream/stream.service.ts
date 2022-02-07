import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Stream } from 'src/app/types/stream.types';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StreamService {

  constructor(private httpClient: HttpClient) { }

  getStreams(): Observable<Stream[]> {
    return this.httpClient.get<Stream[]>(`${environment.api}/stream`);
  }

  getStream(id: string): Observable<Stream> {
    return this.httpClient.get<Stream>(`${environment.api}/stream/${id}`);
  }

}
