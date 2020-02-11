import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-detail-room',
  templateUrl: './detail-room.component.html',
  styleUrls: ['./detail-room.component.scss']
})
export class DetailRoomComponent implements OnInit {
  @Input() backButtonLable: string;
  @Input() headerLabel: string;
  @Input() detailFirstRowFirstValue: string;
  @Input() detailSecondRowFirstValue: string;
  @Input() detailSecondRowSecondValue: string;

  constructor() { }

  ngOnInit() {
  }

}
