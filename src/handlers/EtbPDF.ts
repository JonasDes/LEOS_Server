import PdfPrinter from "pdfmake";
import { TDocumentDefinitions } from "pdfmake/interfaces";
import * as fs from "fs";
import path from 'path'
import MissionDiary from "../models/missiondiary.model";

class EtbPDF {
    constructor(mission: string) {
        makePDF()
        async function makePDF() {
            const missiondiary = await MissionDiary.find({ mission }).populate('editor', 'name').populate('mission', 'name')
            const dirname = path.join(__dirname, '..', 'assets')
            const fonts = {
                Roboto: {
                    normal: dirname + '/fonts/cour.ttf',
                    bold: dirname + '/fonts/courbd.ttf',
                    italics: dirname + '/fonts/couri.ttf',
                    bolditalics: dirname + '/fonts/courbi.ttf',
                }
            };

            const printer = new PdfPrinter(fonts);

            function buildTableBody(data: any, columns: any) {
                const body = [];

                const header = ["Nr.", "Zeit", "Ereignis", "Bemerkung", "Editor"]

                body.push(header);

                data.forEach((row: any) => {

                    console.log(row.content);


                    // row.forEach((element: any) => {
                    //     console.log(element, element.length);
                    // });

                    const dataRow: any = [];
                    columns.forEach((column: any) => {





                        if (column === "editor") {
                            dataRow.push(row[column].name.toString());
                        } else if (column === "content") {
                            let edits = "";
                            row.edit.forEach((element: any) => {
                                edits += "\n" + element?.data?.content + "\n"

                            });
                            dataRow.push(row[column].toString() + "\r\n" + edits);
                        } else if (column === "comment") {
                            let edits = "";
                            row.edit.forEach((element: any) => {
                                edits += "\n" + element?.data?.comment + "\n"

                            });
                            dataRow.push(row[column].toString() + "\r\n" + edits);
                        } else if (column === "timestamp") {
                            let edits = "";
                            row.edit.forEach((element: any) => {
                                edits += "\n" + new Date(element?.timestamp * 1).toLocaleTimeString('de-DE') + "\n"

                            });
                            dataRow.push(new Date(row[column] * 1).toLocaleTimeString('de-DE') + "\r\n" + edits);
                        } else {
                            dataRow.push(row[column].toString());
                        }
                    })
                    body.push(dataRow);
                });

                return body;
            }
            function table(data: any, columns: any) {
                return {
                    layout: 'lightHorizontalLines', // optional
                    table: {
                        headerRows: 1,
                        widths: ['5%', '14%', '33%', '33%', '15%'],
                        body: buildTableBody(data, columns)
                    }
                };
            }

            const docDefinition: TDocumentDefinitions = {
                pageSize: 'A4',
                pageOrientation: 'portrait',
                compress: true,
                info: {
                    title: 'Einsatztagebuch-' + missiondiary[0].mission.name,
                    author: 'MyLST',
                },
                header: {
                    columns: [
                        {
                            text: 'Einsatztagebuch ' + missiondiary[0].mission.name,
                            bold: true,
                            alignment: 'center',
                            margin: [0, 10, 0, 0]
                        },
                    ]
                },
                footer:
                    (currentPage, pageCount) => {
                        return { text: currentPage + " von " + pageCount, alignment: 'right', margin: [0, 0, 15, 0] }
                    },
                permissions: {
                    printing: 'highResolution', // 'lowResolution'
                    modifying: false,
                    copying: false,
                    annotating: false,
                    fillingForms: false,
                    contentAccessibility: false,
                    documentAssembly: false,

                },
                content: [
                    table(missiondiary, ["entryId", 'timestamp', 'content', 'comment', 'editor']),
                ]

            };
            printer.createPdfKitDocument(docDefinition)
            const pdfDoc = printer.createPdfKitDocument(docDefinition)


            const writeStream = fs.createWriteStream(dirname + '/TEST.pdf');
            pdfDoc.pipe(writeStream);
            pdfDoc.end();
        }
    }
}

export default EtbPDF