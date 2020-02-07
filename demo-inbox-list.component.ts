import { Component, OnInit } from '@angular/core';
import { InboxModel, InboxColumns, InboxRows, ActionButton, ActionMenuItem } from '../../inbox/inbox.model';
import { InboxOnRowClickEvent } from '../../inbox/inbox.component';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-demo-inbox-list',
  templateUrl: './demo-inbox-list.component.html',
  styleUrls: ['./demo-inbox-list.component.scss']
})
export class DemoInboxListComponent implements OnInit {
  inboxModel: InboxModel[] = [];
  inboxColumns: InboxColumns[] = [];
  inboxRows: InboxRows[] = [];

  inboxSecondModel: InboxModel[] = [];
  inboxSecondColumns: InboxColumns[] = [];
  inboxSecondRows: InboxRows[] = [];

  inboxThirdModel: InboxModel[] = [];
  inboxThirdColumns: InboxColumns[] = [];
  inboxThirdRows: InboxRows[] = [];
  openActiveFirstAccordionByRowId: string = '';
  openActiveSecondAccordionByRowId: string = '4';
  openActiveThirdAccordionByRowId: string = '10';
  isFirstInboxHideRowFormat: InboxColumns[] = [];
  isSecondInboxHideRowFormat: InboxColumns[] = [];
  isThirdInboxHideRowFormat: InboxColumns[] = [];
  title: string;
  isFirstGroupInboxActive: Subject<boolean> = new Subject();
  isSecondGroupInboxActive: Subject<boolean> = new Subject();

  actionButton: ActionButton[] = [];
  actionMenuItem: ActionMenuItem[] = [];
  constructor() { }

  ngOnInit() {
    this.title = 'This is a demo title content';
    this.actionButton = [{
      actionId: 'hover-1',
      menuItem: this.actionMenuItem
    }];
    this.actionMenuItem = [{
      id: '1',
      label: 'Action-1',
    },
    {
      id: '2',
      label: 'Action-1'
    }];
    this.inboxColumns = [{
      id: 'no',
      label: 'Number',
      colSize: 2,
      align: 'left'
    }, {
      id: 'name',
      label: 'Name',
      colSize: 4,
      align: 'left'
    }, {
      id: 'age',
      label: 'Age',
      colSize: 2,
      align: 'right'
    }, {
      id: 'designation',
      label: 'Designation',
      colSize: 4,
      align: 'left'
    }, {
      id: 'salary',
      label: 'Salary',
      colSize: 4,
      align: 'left'
    },
    {
      id: 'address',
      label: 'Address',
      colSize: 5,
      align: 'left'
    },
    {
      id: 'state',
      label: 'State',
      colSize: 4,
      align: 'left'
    }];

    this.isFirstInboxHideRowFormat = [{
      id: 'no',
      label: 'Number',
      colSize: 2,
      align: 'left'
    }];

    this.isSecondInboxHideRowFormat = [{
      id: 'no',
      label: 'Number',
      colSize: 2,
      align: 'left'
    }];

    this.isThirdInboxHideRowFormat = [{
      id: 'no',
      label: 'Number',
      colSize: 2,
      align: 'left'
    }];

    for (let i = 1; i < 3; i++) {
      this.inboxRows.push({
        rowId: i.toString(),
        actions: this.actionButton,
        values: [{
          no: i.toString(),
          name: 'Loream ipsam-' + i,
          age: '24',
          designation: 'The Revange Doctor',
          salary: 24000 * i,
          address: 'Its very engaging street' + i,
          state: 'TamilNadu' + i
        }],
      });
    }
    this.inboxModel.push(new InboxModel(this.inboxColumns, this.inboxRows));

    this.inboxRows = [];

    for (let i = 4; i < 7; i++) {
      this.inboxRows.push({
        rowId: i.toString(),
        actions: this.actionButton,
        values: [{
          no: i.toString(),
          name: 'Loream ipsam-' + i,
          age: '24',
          designation: 'The Revange Doctor',
          salary: 24000 * i,
          address: 'Its very engaging street' + i,
          state: 'TamilNadu' + i
        }],
      });
    }
    this.inboxModel.push(new InboxModel(this.inboxColumns, this.inboxRows));

    for (let i = 4; i < 6; i++) {
      this.inboxSecondRows.push({
        rowId: i.toString(),
        values: [{
          no: i.toString(),
          name: 'Loream ipsam-' + i,
          age: '24',
          designation: 'The Revange Doctor',
          salary: 24000 * i,
          address: 'Its very engaging street' + i,
          state: 'TamilNadu' + i
        }],
        clickable: i === 4 ? false : true
      });
    }
    this.inboxSecondModel.push(new InboxModel(this.inboxColumns, this.inboxSecondRows));

    for (let i = 10; i < 12; i++) {
      this.inboxThirdRows.push({
        rowId: i.toString(),
        values: [{
          no: i.toString(),
          name: 'Loream ipsam-' + i,
          age: '24',
          designation: 'The Revange Doctor',
          salary: 24000 * i,
          address: 'Its very engaging street' + i,
          state: 'TamilNadu' + i
        }]
      });
    }
    this.inboxThirdModel.push(new InboxModel(this.inboxColumns, this.inboxThirdRows));
    console.log('foreach content inserted');
  }

  onSubRowClick(event: InboxOnRowClickEvent) {
    event.loading.next(true);
    setTimeout(() => {
      // this.openActiveAccordionByRowId = '4';
      event.loading.next(false);
    }, 1000);
  }

  onFirstRowClick(event: InboxOnRowClickEvent) {
    event.loading.next(true);
    // this.isFirstGroupInboxActive.next(true);
    setTimeout(() => {
      event.loading.next(false);
    }, 1000);
  }

  onSecondRowClick(event: InboxOnRowClickEvent) {
    event.loading.next(true);
    // this.openActiveFirstAccordionByRowId = null;
    // this.isFirstGroupInboxActive.next(false);
    // this.isSecondGroupInboxActive.next(true);
    setTimeout(() => {
      event.loading.next(false);
    }, 1000);
  }
}
