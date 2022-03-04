import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Stream, StreamCreateDto } from 'src/app/types/stream.types';
import { environment } from 'src/environments/environment';
import { IdentityService } from '../identity/identity.service';

@Injectable({
  providedIn: 'root'
})
export class StreamService {

  constructor(
    private httpClient: HttpClient,
    private identityService: IdentityService
  ) { }

  getStreams(): Observable<Stream[]> {
    return this.httpClient.get<Stream[]>(`${environment.api}/stream`);
  }

  getStream(id: string): Observable<Stream> {
    return this.httpClient.get<Stream>(`${environment.api}/stream/${id}`);
  }

  createStream(stream: StreamCreateDto): Observable<Stream> {
    stream.fingerprint = this.identityService.getFingerprint();
    
    return this.httpClient.post<Stream>(`${environment.api}/stream`, stream);  
  }

  updateStream(id: string, key: string, stream: Stream): Observable<any> {
    return this.httpClient.put(`${environment.api}/stream/${id}`, stream, { params: { key }});
  }

  deleteStream(id: string, key: string): Observable<any> {
    return this.httpClient.delete(`${environment.api}/stream/${id}`, { params: { key }});
  }

  viewerPing(id: string): Observable<Stream> {
    return this.httpClient.get<Stream>(`${environment.api}/stream/${id}/viewer`, { params: { fingerprint: this.identityService.getFingerprint() } });
  }

  synchronize(id: string, time: number): Observable<boolean> {
    return this.httpClient.get<boolean>(`${environment.api}/stream/${id}/synchronize`, { params: { key: this.identityService.getKey(id), time } });
  }

}
