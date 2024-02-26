import { Component, OnInit } from '@angular/core';
import { Message } from '../_models/message';
import { Pagination } from '../_models/pagination';
import { MessageService } from '../_services/message.service';
import { TimeService } from '../_services/time.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})
export class MessagesComponent implements OnInit {
  messages?: Message[];
  pagination?: Pagination;
  container = 'Unread';
  pageNumber = 1;
  pageSize = 5;

  constructor(private messageService: MessageService, private timeService: TimeService) { }

  ngOnInit() {
    this.loadMessages();
  }

  loadMessages() {
    this.messageService.getMessages(this.pageNumber, this.pageSize, this.container).subscribe({
      next: response => {
        this.messages = response.result;
        this.pagination = response.pagination;
      }
    });
  }

  pageChanged(event: any) {
    if (this.pageNumber !== event) {
      this.pageNumber = event;
      this.loadMessages();
    }
  }

  getFormattedDate(date: Date): string {
    return this.timeService.getTimeAgo(date);
  }
}
