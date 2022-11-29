import { Component } from '@angular/core';
import { ChatExampleData } from './data/chat-example-data';
import { MessagesService } from './message/messages.service';
import { ThreadsService } from './thread/threads.service';
import { UsersService } from './user/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    public messagesService: MessagesService,
    public threadsService: ThreadsService,
    public usersService: UsersService
  ) {
    ChatExampleData.init(messagesService, threadsService, usersService);
  }
  foo = (intervals) => {
    if (intervals.length < 2) return intervals;

    intervals.sort((a, b) => a[0] - b[0]);

    const result = [];
    let previous = intervals[0];

    for (let i = 1; i < intervals.length; i += 1) {
      if (previous[1] >= intervals[i][0]) {
        previous = [previous[0], Math.max(previous[1], intervals[i][1])];
        console.log('previous', previous);
      } else {
        result.push(previous);
        previous = intervals[i];
      }
    }

    result.push(previous);
    console.log('result', result);
    return result;
  };
  ngOnInit() {
    //this.foo([[0,3],[6,10]]);
    //this.foo([[0,5],[3,10]]);
    //this.foo([[0,5],[2,4]]);
    this.foo([
      [7, 8],
      [3, 6],
      [2, 4],
    ]);
    // this.foo([
    //   [3, 6],
    //   [3, 4],
    //   [15, 20],
    //   [16, 17],
    //   [1, 4],
    //   [6, 10],
    //   [3, 6],
    // ]);
  }
}
