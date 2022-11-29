import { Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { Message } from '../message/message.model';
import { MessagesService } from '../message/messages.service';
import { Thread } from '../thread/thread.model';
import { ThreadsService } from '../thread/threads.service';

@Component({
  selector: 'app-chat-nav-bar',
  templateUrl: './chat-nav-bar.component.html',
  styleUrls: ['./chat-nav-bar.component.scss'],
})
export class ChatNavBarComponent implements OnInit {
  unreadMessagesCount: number;

  constructor(
    public messagesService: MessagesService,
    public threadsService: ThreadsService
  ) {}

  ngOnInit(): void {
    combineLatest([
      this.messagesService.messages,
      this.threadsService.currentThread,
    ])
      .pipe(
        map(([messages, currentThread]: [Message[], Thread]): void => {
          this.unreadMessagesCount = messages.reduce(
            (sum: number, m: Message) => {
              const messageIsInCurrentThread: boolean =
                m.thread && currentThread && currentThread.id === m.thread.id;
              if (m && !m.isRead && !messageIsInCurrentThread) {
                sum += 1;
              }
              return sum;
            },
            0
          );
        })
      )
      .subscribe();
  }
}
