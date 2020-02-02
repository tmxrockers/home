import { Component, OnInit, Input, TemplateRef, ContentChild, Output, EventEmitter } from '@angular/core';
import { InboxModel, InboxRows, InboxColumns } from './inbox.model';
import { Subject } from 'rxjs';

export class InboxOnRowClickEvent {
  loading: Subject<boolean>;
  data: any;
}
@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss']
})
export class InboxComponent implements OnInit {
  @Input() title: string;
  @Input() models: InboxModel;
  @Input() openActiveAccordionByRowId: string;
  @Input() isInboxHeaderAvailable: boolean;
  @Input() isFormatRowContentAvailable: InboxColumns[] = [];
  @Input() isGroupInboxActive: Subject<boolean> = new Subject();;
  @Output() onRowClickEmit: EventEmitter<InboxOnRowClickEvent> = new EventEmitter<InboxOnRowClickEvent>();

  @ContentChild(TemplateRef, { static: false }) inboxListDetailContentTemplate: TemplateRef<any>;
  isLoading: boolean;
  activeAccordionRowId: string = null;
  loadingSubject: Subject<boolean> = new Subject();

  constructor() {
  }

  ngOnInit() {
    this.loadingSubject.subscribe(loading => {
      this.isLoading = loading;
    });

    this.isGroupInboxActive.subscribe(isGroupInboxActive => {
      if (isGroupInboxActive === false) {
        this.activeAccordionRowId = null;
      }
    });
  }

  onClickRow(row: InboxRows) {
    if (row.clickable === false) {
      return;
    }
    if (row.rowId === this.openActiveAccordionByRowId) {
      this.openActiveAccordionByRowId = null;
      this.activeAccordionRowId = null;
      return;
    }
    if (this.activeAccordionRowId !== row.rowId) {
      this.activeAccordionRowId = row.rowId;
      this.onRowClickEmit.emit({
        loading: this.loadingSubject,
        data: row.data
      });
    } else {
      this.activeAccordionRowId = null;
    }
  }
}
