import { Injectable } from '@angular/core';
import Fingerprint from '@fingerprintjs/fingerprintjs';

@Injectable({
  providedIn: 'root'
})
export class IdentityService {

  private fingerprint!: string;

  constructor() {
    this.loadFingerprint();
  }

  private loadFingerprint() {
    Fingerprint
      .load()
      .then(fp => fp.get())
      .then(
        (result) => {
          this.fingerprint = result.visitorId;
        }
      );
  }

  getFingerprint(): string {
    return this.fingerprint;
  }
}
