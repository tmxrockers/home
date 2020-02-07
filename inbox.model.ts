export class InboxModel {
  constructor(columns, rows) {
    this.columns = columns;
    this.rows = rows;
  }
  columns: InboxColumns[];
  rows: InboxRows[];
}

export interface InboxColumns {
  id: string;
  label: string;
  colSize?: number;
  align?: string;
}
export interface InboxRows {
  rowId: string;
  values: Array<any>;
  clickable?: boolean;
  data?: any;
  actions?: ActionButton[];
}

export interface ActionButton {
  actionId: string;
  menuItem: Array<ActionMenuItem>;
}
export interface ActionMenuItem {
  id: string;
  label: string;
  isMenuDisable?: boolean;
  data?: any;
}
