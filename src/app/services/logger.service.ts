import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  log(msg: string) {
    console.log(`[LOG]: ${msg}`);
  }
}
