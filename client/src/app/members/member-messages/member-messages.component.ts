import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Message } from '../../_models/message';
import { MessageService } from '../../_services/message.service';
import { CommonModule } from '@angular/common';
import { TimeService } from '../../_services/time.service';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrl: './member-messages.component.css',
  standalone: true,
  imports: [CommonModule, FormsModule]
})

export class MemberMessagesComponent implements OnInit {
  @ViewChild('messageForm') messageForm?: NgForm;
  @Input() username?: string;
  messages: Message[] = [];
  messageContent = '';

  constructor(private messageService: MessageService, private timeService: TimeService) { }

  ngOnInit(): void {
    this.loadMessages();
  }

  sendMessage() {
    if (!this.username) return;
    this.messageService.sendMessage(this.username, this.messageContent).subscribe({
      next: message => {
        this.messages.push(message);
        this.messageForm?.reset();
      }
    })
  }

  loadMessages() {
    if (!this.username) return;
    this.messageService.getMessageThread(this.username).subscribe({
      next: messages => this.messages = messages
    });
  }

  getTimeAgo(lastActive: Date): string {
    return this.timeService.getTimeAgo(lastActive);
  }
}
