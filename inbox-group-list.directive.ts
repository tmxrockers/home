import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appInboxGroupList]'
})
export class InboxGroupListDirective {
  @Input() groupInboxId: string;

  constructor(private elementRef: ElementRef) { }

  @HostListener('click') onClickEnter() {
    console.log('clicked');
  }

}
