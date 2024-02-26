import { Component, Input, NgModule, OnInit } from '@angular/core';
import { Message } from '../../_models/message';
import { MessageService } from '../../_services/message.service';
import { CommonModule } from '@angular/common';
import { TimeService } from '../../_services/time.service';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrl: './member-messages.component.css',
  standalone: true,
  imports: [CommonModule]
})

export class MemberMessagesComponent implements OnInit {
  @Input() username?: string;
  messages: Message[] = [];

  constructor(private messageService: MessageService, private timeService: TimeService) { }

  ngOnInit(): void {
    this.loadMessages();
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
