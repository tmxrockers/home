import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import PptxGenJS from 'pptxgenjs';
import PSPDFKit from 'pspdfkit';

// interface TableCell {
//   label: string;
//   value: string;
// }

// interface TableHeader {
//   label: string;
// }

// interface TableRow {
//   cells: TableCell[];
// }

// interface Table {
//   caption: string;
//   headers: TableHeader[];
//   rows: TableRow[];
// }

export const TABLE_NAMES_F = ["Markiplier", "Jack", "Brian", "Paul", "Ev", "Ann", "Michelle", "Jenny", "Lara", "Kathryn"];
export const LOREM_IPSUM =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin condimentum dignissim velit vel luctus. Donec feugiat ipsum quis tempus blandit. Donec mattis mauris vel est dictum interdum. Pellentesque imperdiet nibh vitae porta ornare. Fusce non nisl lacus. Curabitur ut mattis dui. Ut pulvinar urna velit, vitae aliquam neque pulvinar eu. Fusce eget tellus eu lorem finibus mattis. Nunc blandit consequat arcu. Ut sed pharetra tortor, nec finibus ipsum. Pellentesque a est vitae ligula imperdiet rhoncus. Ut quis hendrerit tellus. Phasellus non malesuada mi. Suspendisse ullamcorper tristique odio fermentum elementum. Phasellus mattis mollis mauris, non mattis ligula dapibus quis. Quisque pretium metus massa. Curabitur condimentum consequat felis, id rutrum velit cursus vel. Proin nulla est, posuere in velit at, faucibus dignissim diam. Quisque quis erat euismod, malesuada erat eu, congue nisi. Ut risus lectus, auctor at libero sit amet, accumsan ultricies est. Donec eget iaculis enim. Nunc ac egestas tellus, nec efficitur magna. Sed nec nisl ut augue laoreet sollicitudin vitae nec quam. Vestibulum pretium nisl bibendum, tempor velit eu, semper velit. Nulla facilisi. Aenean quis purus sagittis, dapibus nibh eget, ornare nunc. Donec posuere erat quis ipsum facilisis, quis porttitor dui cursus. Etiam convallis arcu sapien, vitae placerat diam molestie sit amet. Vivamus sapien augue, porta sed tortor ut, molestie ornare nisl. Nullam sed mi turpis. Donec sed finibus risus. Nunc interdum semper mauris quis vehicula. Phasellus in nisl faucibus, pellentesque massa vel, faucibus urna. Proin sed tortor lorem. Curabitur eu nisi semper, placerat tellus sed, varius nulla. Etiam luctus ac purus nec aliquet. Phasellus nisl metus, dictum ultricies justo a, laoreet consectetur risus. Vestibulum vulputate in felis ac blandit. Aliquam erat volutpat. Sed quis ultrices lectus. Curabitur at scelerisque elit, a bibendum nisi. Integer facilisis ex dolor, vel gravida metus vestibulum ac. Aliquam condimentum fermentum rhoncus. Nunc tortor arcu, condimentum non ex consequat, porttitor maximus est. Duis semper risus odio, quis feugiat sem elementum nec. Nam mattis nec dui sit amet volutpat. Sed facilisis, nunc quis porta consequat, ante mi tincidunt massa, eget euismod sapien nunc eget sem. Curabitur orci neque, eleifend at mattis quis, malesuada ac nibh. Vestibulum sed laoreet dolor, ac facilisis urna. Vestibulum luctus id nulla at auctor. Nunc pharetra massa orci, ut pharetra metus faucibus eget. Etiam eleifend, tellus id lobortis molestie, sem magna elementum dui, dapibus ullamcorper nisl enim ac urna. Nam posuere ullamcorper tellus, ac blandit nulla vestibulum nec. Vestibulum ornare, ligula quis aliquet cursus, metus nisi congue nulla, vitae posuere elit mauris at justo. Nullam ut fermentum arcu, nec laoreet ligula. Morbi quis consectetur nisl, nec consectetur justo. Curabitur eget eros hendrerit, ullamcorper dolor non, aliquam elit. Aliquam mollis justo vel aliquam interdum. Aenean bibendum rhoncus ante a commodo. Vestibulum bibendum sapien a accumsan pharetra... Curabitur condimentum consequat felis, id rutrum velit cursus vel. Proin nulla est, posuere in velit at, faucibus dignissim diam. Quisque quis erat euismod, malesuada erat eu, congue nisi. Ut risus lectus, auctor at libero sit amet, accumsan ultricies est. Donec eget iaculis enim. Nunc ac egestas tellus, nec efficitur magna. Sed nec nisl ut augue laoreet sollicitudin vitae nec quam. Vestibulum pretium nisl bibendum, tempor velit eu, semper velit. Nulla facilisi. Aenean quis purus sagittis, dapibus nibh eget, ornare nunc. Donec posuere erat quis ipsum facilisis, quis porttitor dui cursus. Etiam convallis arcu sapien, vitae placerat diam molestie sit amet. Vivamus sapien augue, porta sed tortor ut, molestie ornare nisl. Nullam sed mi turpis. Donec sed finibus risus. Nunc interdum semper mauris quis vehicula. Phasellus in nisl faucibus, pellentesque massa vel, faucibus urna. Proin sed tortor lorem. Curabitur eu nisi semper, placerat tellus sed, varius nulla. Etiam luctus ac purus nec aliquet. Phasellus nisl metus, dictum ultricies justo a, laoreet consectetur risus. Vestibulum vulputate in felis ac blandit. Aliquam erat volutpat. Sed quis ultrices lectus. Curabitur at scelerisque elit, a bibendum nisi. Integer facilisis ex dolor, vel gravida metus vestibulum ac. Aliquam condimentum fermentum rhoncus. Nunc tortor arcu, condimentum non ex consequat, porttitor maximus est. Duis semper risus odio, quis feugiat sem elementum nec. Nam mattis nec dui sit amet volutpat. Sed facilisis, nunc quis porta consequat, ante mi tincidunt massa, eget euismod sapien nunc eget sem. Curabitur orci neque, eleifend at mattis quis, malesuada ac nibh. Vestibulum sed laoreet dolor, ac facilisis urna. Vestibulum luctus id nulla at auctor. Nunc pharetra massa orci, ut pharetra metus faucibus eget. Etiam eleifend, tellus id lobortis molestie, sem magna elementum dui, dapibus ullamcorper nisl enim ac urna. Nam posuere ullamcorper tellus, ac blandit nulla vestibulum nec. Vestibulum ornare, ligula quis aliquet cursus, metus nisi congue nulla, vitae posuere elit mauris at justo. Nullam ut fermentum arcu, nec laoreet ligula. Morbi quis consectetur nisl, nec consectetur justo. Curabitur eget eros hendrerit, ullamcorper dolor non, aliquam elit. Aliquam mollis justo vel aliquam interdum. Aenean bibendum rhoncus ante a commodo. Vestibulum bibendum sapien a accumsan pharetra.";
export const DEMO_TITLE_TEXTBK = { fontSize: 18, color: "2C355D", bold: true, breakLine: true, fontFace: "Calibri (Body)" };
export const DEMO_TITLE_TEXT = { fontSize: 16, color: "66666A", fontFace: "Calibri (Body)" };
export const DEMO_TITLE_OPTS = { fontSize: 18, color: "2C355D", bold: true, fontFace: "Calibri (Body)" };

@Component({
  selector: 'app-pptx-viewer',
  templateUrl: './pptx-viewer.component.html',
  styleUrls: ['./pptx-viewer.component.scss']
})
export class PptxViewerComponent {

  pptxUrl: any;
  urlSafe: any;

  constructor(private sanitizer: DomSanitizer) { }


  ngOnInit(): void {
    // Create a new presentation
    const pptx = new PptxGenJS();

    // Add a slide to the presentation
    const slide1 = pptx.addSlide();

    slide1.addText('Global Technology', { x: 3, y: 1.5, w: 5, h: 2.0, color: 'black', fontSize: 32, bold: true, fontFace: "Calibri (Body)", margin: 10 });

    slide1.addText('0+12 forecast', { x: 3.7, y: 2.0, w: 4, h: 2.0, color: 'black', fontSize: 24, fontFace: "Calibri Light (Headings)" });

    // Add a slide to the presentation
    const slide2 = pptx.addSlide({ sectionTitle: "Executive Summary: Global Technology" });

    let arrRows: PptxGenJS.TableRow[] = [];

    // slide2.addNotes("API Docs: https://gitbrent.github.io/PptxGenJS/docs/api-tables.html");
    // slide2.addText([{ text: "Executive Summary: Global Technology", options: DEMO_TITLE_TEXTBK }], {
    //   x: 0.23,
    //   y: 0.13,
    //   w: 8,
    //   h: 0.4,
    // });

    // slide2.addText(
    // 	[
    // 		{ text: "Executive Summary ", options: DEMO_TITLE_TEXT },
    // 		{ text: "- Global Technology", options: DEMO_TITLE_OPTS },
    // 	],
    // 	{ x: 0.5, y: 0.13, w: "90%", h: 0.5 }
    // );

    slide2.addText(
      [
        { text: "Global Technology ", options: { fontSize: 18, color: "2C355D", bold: true, fontFace: "Calibri (Body)" } },
        { text: "Month on Month (2024)", options: { fontSize: 16, color: "black", fontFace: "Calibri (Body)" } },
        { text: "\nAditya Basin", options: { fontSize: 14, color: "black", fontFace: "Calibri (Body)", margin: [0, 0, 0, 12] } },
      ],
      { x: 0.5, y: 0.13, w: "90%", h: 0.5 }
    );

    // ------------

    let json = this.generateJson();
    let colWArray: any = [];

    let tableHeaderRow: PptxGenJS.TableRow = [];
    json.table.headers.forEach(header => {
      if (header.staticColumnName === 'CATEGORY') {
        colWArray.push(1.3);
        tableHeaderRow.push({
          text: header.columnName,
          options: { color: "black", valign: "middle", bold: true, align: "right" }
        });
      } else {
        colWArray.push(0.6);
        tableHeaderRow.push({
          text: header.columnName,
          options: { color: "black", valign: "middle", bold: true, align: "center" }
        });
      }


    });

    arrRows.push(tableHeaderRow);

    json.table.rowDetails.forEach((rowDetail: any) => {
      let tableRows: PptxGenJS.TableRow = [];

      json.table.headers.forEach((headerObj: any) => {
        let rowCell: PptxGenJS.TableCell = {
          text: rowDetail[headerObj.staticColumnName]
        }

        let styleArrayFirst = ['Bank Employees', 'Total Contractors', 'Total Resources'];
        let styleArraySecond = ['SP - Time & Material', 'SP - Fiexd & Bid', 'SP - On', 'SP - Near/Off'];

        if (styleArrayFirst.includes(rowDetail[headerObj.staticColumnName])) {
          rowCell['options'] = { color: "black", valign: "bottom", bold: true, align: "left", margin: [0, 0, 0, 0.05] };
        }
        else if (styleArraySecond.includes(rowDetail[headerObj.staticColumnName])) {
          rowCell['options'] = { color: "black", valign: "bottom", align: "left", margin: [0, 0, 0, 0.25] };
        }
        else if (headerObj.staticColumnName === 'CATEGORY') {
          rowCell['options'] = { color: "black", valign: "bottom", align: "left", margin: [0, 0, 0, 0.10] };
        }
        else if (styleArrayFirst.includes(rowDetail.CATEGORY)) {
          rowCell['options'] = { color: "black", valign: "bottom", align: "right", bold: true, margin: [0, 0.05, 0, 0] };
        }
        else {
          rowCell['options'] = { color: "black", valign: "bottom", align: "right", margin: [0, 0.05, 0, 0] };
        }
        tableRows.push(rowCell);
      });

      arrRows.push(tableRows);
    });

    slide2.addTable(arrRows, {
      x: 0.5,
      y: 0.8,
      // w: 8,
      colW: colWArray,
      border: { pt: 0.2, color: "818181" },
      fontSize: 8,
      autoPage: true,
      // autoPageRepeatHeader: true,
      // verbose: false,

      // x: 1,
      // y: 1,
      // colW: colWArray,
      // border: { pt: 0.1, color: "818181" },
      // align: "left",
      // valign: "middle",
      // fontFace: "Segoe UI",
      // fontSize: 8,
      // autoPage: true,
      // autoPageRepeatHeader: true,
      // autoPageLineWeight: -0.4,
      // verbose: true,
    });

    slide2.addTable(arrRows, {
      x: 0.5,
      y: 3.1,
      // w: 8,
      colW: colWArray,
      border: { pt: 0.2, color: "818181" },
      fontSize: 8,
      // autoPage: true,
      // autoPageRepeatHeader: true,
      // verbose: false,

      // x: 1,
      // y: 1,
      // colW: colWArray,
      // border: { pt: 0.1, color: "818181" },
      // align: "left",
      // valign: "middle",
      // fontFace: "Segoe UI",
      // fontSize: 8,
      // autoPage: true,
      // autoPageRepeatHeader: true,
      // autoPageLineWeight: -0.4,
      // verbose: true,
    });


    // Convert the presentation to a Blob for the presentation
    pptx.write({ outputType: 'arraybuffer' }).then(blobContent => {
      const pptxBlob = new Blob([blobContent], { type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation' });

      // Create a blob URL
      const documentBlobObjectUrl = URL.createObjectURL(pptxBlob);
      this.pptxUrl = documentBlobObjectUrl;

      PSPDFKit.load({
        baseUrl: location.protocol + "//" + location.host + "/assets/",
        document: documentBlobObjectUrl,
        container: '#pspdfkit-container'
      })
        .then(instance => {
          // Make sure to revoke the object URL so the browser doesn't hold on to the blob object that's not needed any more.
          // URL.revokeObjectURL(documentBlobObjectUrl);
        });

    });

  }

  generateAndDisplayPptx() {
    window.open(this.pptxUrl, '_self');
  }


  generateJson() {
    return {
      table: {
        // caption: "Global Technology Month on Month (2024)",
        headers: [
          { columnId: '101', columnName: '', staticColumnName: 'CATEGORY', type: 'OTHERS' },
          { columnId: '102', columnName: 'Act\nNov-23', staticColumnName: 'ACT_NOV_23', type: 'RECENT_ACTUALS' },
          { columnId: '103', columnName: 'Jan-23', staticColumnName: 'CURR_JAN_23', type: 'ACTUAL' },
          { columnId: '104', columnName: 'Feb-23', staticColumnName: 'CURR_FEB_23', type: 'ACTUAL' },
          { columnId: '105', columnName: 'Mar-23', staticColumnName: 'CURR_MAR_23', type: 'ACTUAL' },
          { columnId: '106', columnName: 'Apr-23', staticColumnName: 'CURR_APR_23', type: 'ACTUAL' },
          { columnId: '107', columnName: 'May-23', staticColumnName: 'CURR_MAY_23', type: 'ACTUAL' },
          { columnId: '108', columnName: 'Jun-23', staticColumnName: 'CURR_JUN_23', type: 'ACTUAL' },
          { columnId: '109', columnName: 'Jul-23', staticColumnName: 'CURR_JUL_23', type: 'ACTUAL' },
          { columnId: '110', columnName: 'Aug-23', staticColumnName: 'CURR_AUG_23', type: 'ACTUAL' },
          { columnId: '111', columnName: 'Sep-23', staticColumnName: 'CURR_SEP_23', type: 'ACTUAL' },
          { columnId: '112', columnName: 'Oct-23', staticColumnName: 'CURR_OCT_23', type: 'ACTUAL' },
          { columnId: '113', columnName: 'Nov-23', staticColumnName: 'CURR_NOV_23', type: 'ACTUAL' },
          { columnId: '114', columnName: '10+2 Dec-23', staticColumnName: 'CURR_DEC_23', type: 'FORECAST' }
        ],
        rowDetails: [
          { CATEGORY: "Headcount", ACT_NOV_23: "26,991", CURR_JAN_23: "26,978", CURR_FEB_23: "26,978", CURR_MAR_23: "26,978", CURR_APR_23: "26,978", CURR_MAY_23: "26,978", CURR_JUN_23: "26,978", CURR_JUL_23: "26,978", CURR_AUG_23: "26,978", CURR_SEP_23: "26,978", CURR_OCT_23: "26,978", CURR_NOV_23: "26,978", CURR_DEC_23: "26,978" },
          { CATEGORY: "GBS India", ACT_NOV_23: "21,978", CURR_JAN_23: "21,978", CURR_FEB_23: "21,978", CURR_MAR_23: "21,978", CURR_APR_23: "21,978", CURR_MAY_23: "21,978", CURR_JUN_23: "21,978", CURR_JUL_23: "21,978", CURR_AUG_23: "21,978", CURR_SEP_23: "21,978", CURR_OCT_23: "21,978", CURR_NOV_23: "21,978", CURR_DEC_23: "21,978" },
          { CATEGORY: "GBS Dallas", ACT_NOV_23: "0", CURR_JAN_23: "0", CURR_FEB_23: "0", CURR_MAR_23: "0", CURR_APR_23: "0", CURR_MAY_23: "0", CURR_JUN_23: "0", CURR_JUL_23: "0", CURR_AUG_23: "0", CURR_SEP_23: "0", CURR_OCT_23: "0", CURR_NOV_23: "0", CURR_DEC_23: "0" },
          { CATEGORY: "Bank Employees", ACT_NOV_23: "48,969", CURR_JAN_23: "48,969", CURR_FEB_23: "48,969", CURR_MAR_23: "48,969", CURR_APR_23: "48,969", CURR_MAY_23: "48,969", CURR_JUN_23: "48,969", CURR_JUL_23: "48,969", CURR_AUG_23: "48,969", CURR_SEP_23: "48,969", CURR_OCT_23: "48,969", CURR_NOV_23: "48,969", CURR_DEC_23: "48,969" },
          { CATEGORY: "SP - Time & Material", ACT_NOV_23: "48,969", CURR_JAN_23: "48,969", CURR_FEB_23: "48,969", CURR_MAR_23: "48,969", CURR_APR_23: "48,969", CURR_MAY_23: "48,969", CURR_JUN_23: "48,969", CURR_JUL_23: "48,969", CURR_AUG_23: "48,969", CURR_SEP_23: "48,969", CURR_OCT_23: "48,969", CURR_NOV_23: "48,969", CURR_DEC_23: "48,969" },
          { CATEGORY: "SP - Fiexd & Bid", ACT_NOV_23: "48,969", CURR_JAN_23: "48,969", CURR_FEB_23: "48,969", CURR_MAR_23: "48,969", CURR_APR_23: "48,969", CURR_MAY_23: "48,969", CURR_JUN_23: "48,969", CURR_JUL_23: "48,969", CURR_AUG_23: "48,969", CURR_SEP_23: "48,969", CURR_OCT_23: "48,969", CURR_NOV_23: "48,969", CURR_DEC_23: "48,969" },
          { CATEGORY: "Strategic Partner", ACT_NOV_23: "48,969", CURR_JAN_23: "48,969", CURR_FEB_23: "48,969", CURR_MAR_23: "48,969", CURR_APR_23: "48,969", CURR_MAY_23: "48,969", CURR_JUN_23: "48,969", CURR_JUL_23: "48,969", CURR_AUG_23: "48,969", CURR_SEP_23: "48,969", CURR_OCT_23: "48,969", CURR_NOV_23: "48,969", CURR_DEC_23: "48,969" },
          { CATEGORY: "TCMS/Other", ACT_NOV_23: "48,969", CURR_JAN_23: "48,969", CURR_FEB_23: "48,969", CURR_MAR_23: "48,969", CURR_APR_23: "48,969", CURR_MAY_23: "48,969", CURR_JUN_23: "48,969", CURR_JUL_23: "48,969", CURR_AUG_23: "48,969", CURR_SEP_23: "48,969", CURR_OCT_23: "48,969", CURR_NOV_23: "48,969", CURR_DEC_23: "48,969" },
          { CATEGORY: "Total Contractors", ACT_NOV_23: "48,969", CURR_JAN_23: "48,969", CURR_FEB_23: "48,969", CURR_MAR_23: "48,969", CURR_APR_23: "48,969", CURR_MAY_23: "48,969", CURR_JUN_23: "48,969", CURR_JUL_23: "48,969", CURR_AUG_23: "48,969", CURR_SEP_23: "48,969", CURR_OCT_23: "48,969", CURR_NOV_23: "48,969", CURR_DEC_23: "48,969" },
          { CATEGORY: "Total Resources", ACT_NOV_23: "48,969", CURR_JAN_23: "48,969", CURR_FEB_23: "48,969", CURR_MAR_23: "48,969", CURR_APR_23: "48,969", CURR_MAY_23: "48,969", CURR_JUN_23: "48,969", CURR_JUL_23: "48,969", CURR_AUG_23: "48,969", CURR_SEP_23: "48,969", CURR_OCT_23: "48,969", CURR_NOV_23: "48,969", CURR_DEC_23: "48,969" },
          { CATEGORY: "SP - On", ACT_NOV_23: "48,969", CURR_JAN_23: "48,969", CURR_FEB_23: "48,969", CURR_MAR_23: "48,969", CURR_APR_23: "48,969", CURR_MAY_23: "48,969", CURR_JUN_23: "48,969", CURR_JUL_23: "48,969", CURR_AUG_23: "48,969", CURR_SEP_23: "48,969", CURR_OCT_23: "48,969", CURR_NOV_23: "48,969", CURR_DEC_23: "48,969" },
          { CATEGORY: "SP - Near/Off", ACT_NOV_23: "48,969", CURR_JAN_23: "48,969", CURR_FEB_23: "48,969", CURR_MAR_23: "48,969", CURR_APR_23: "48,969", CURR_MAY_23: "48,969", CURR_JUN_23: "48,969", CURR_JUL_23: "48,969", CURR_AUG_23: "48,969", CURR_SEP_23: "48,969", CURR_OCT_23: "48,969", CURR_NOV_23: "48,969", CURR_DEC_23: "48,969" }
          // Add more rows as needed
        ],
      },
    };
  };


}
