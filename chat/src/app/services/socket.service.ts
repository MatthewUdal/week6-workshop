import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import io, { Socket } from 'socket.io-client';

const SERVER_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket!: Socket;

  constructor() { }

  initSocket(){
    this.socket = io(SERVER_URL);
    return () => { this.socket.disconnect(); }
  }

  send(message: string){
    if (this.socket) { 
      this.socket.emit('message', message);
    } else {
      console.error('Socket not initialized');
    }
  }

  getMessage(){
    return new Observable<string>(observer => {
      if (this.socket) { 
        this.socket.on('message', (data: string) => { observer.next(data); });
      } else {
        observer.error('Socket not initialized');
      }
    });
  }
}
