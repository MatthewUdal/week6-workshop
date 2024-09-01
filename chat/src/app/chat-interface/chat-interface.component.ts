import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SocketService } from '../services/socket.service';

@Component({
  selector: 'app-chat-interface',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './chat-interface.component.html',
  styleUrls: ['./chat-interface.component.css']
})
export class ChatInterfaceComponent implements OnInit {
  messagecontent: string = "";
  messages: string[] = [];
  ioConnection: any;

  constructor (private socketService: SocketService) {}

  ngOnInit(): void {
    this.initToConnection();
  }

  initToConnection(){
    this.socketService.initSocket();
    this.ioConnection = this.socketService.getMessage()
      .subscribe((message: string) => {
        this.messages.push(message);
      });
  }

  chat(){
    if(this.messagecontent){
      this.socketService.send(this.messagecontent);
      this.messagecontent = "";
    } else {
      console.log('no message');
    }
  }  
}
