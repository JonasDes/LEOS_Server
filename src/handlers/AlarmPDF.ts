import PdfPrinter from "pdfmake";
import { TDocumentDefinitions } from "pdfmake/interfaces";
import * as fs from "fs";
import path from 'path'
import Operation from '../models/operation.model'
import Keyword from '../models/keyword.model'

class AlarmPDF {
    constructor(operationid: string) {
        makePDF()

        async function makePDF() {
            const operation = await Operation.findOne({ _id: operationid }).populate('editor', 'name').populate('vehicles', 'name')
            const vehicles: any = []
            vehicles.push([{ text: 'Einsatzmittel', bold: true },
            { text: 'alarmiert', bold: true },
            { text: 'Status 3', bold: true },
            { text: 'Status 4', bold: true },
            { text: 'Status 7', bold: true },
            { text: 'Status 8', bold: true },
            { text: 'Ende', bold: true }])

            operation.vehicles.forEach((vehicle: any) => {
                vehicles.push([vehicle.name, new Date(operation.timestamp * 1).toLocaleTimeString(), '13:40:01', '13:45:11', '14:00:46', '14:10:34', '14:25:21'])
            })


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

            const docDefinition: TDocumentDefinitions = {
                footer: {
                    columns: [
                        { text: 'JDeseive', alignment: 'left', margin: [20, 0, 20, 50] },
                        { text: 'Leitstelle Johannes Essen', alignment: 'right', margin: [20, 0, 20, 50] },
                    ]
                },
                pageSize: 'A4',
                pageOrientation: 'portrait',
                compress: true,
                pageMargins: [40, 15],
                info: {
                    title: 'Einsatztagebuch-',
                    author: 'MyLST',
                },
                content: [
                    {
                        margin: [0, 0, 0, 5],
                        canvas:
                            [
                                { type: 'line', x1: -40, y1: -5, x2: 480, y2: -5, lineWidth: 2 },
                            ]

                    },
                    {
                        text:
                            [
                                { text: 'Alarmdruck 60 / ' + operation.keyword + ' / ' + new Date(operation.timestamp * 1).toLocaleString(), alignment: 'center' },
                            ]
                    },
                    {
                        margin: [0, 0, 0, 25],
                        canvas:
                            [
                                { type: 'line', x1: -40, y1: -29, x2: 480, y2: -29, lineWidth: 2 },
                            ]

                    },
                    {
                        margin: [0, 0, 0, 20],
                        columns:
                            [
                                {
                                    margin: [0, 0, 20, 10],
                                    width: 120,
                                    text:
                                        [{
                                            text: 'Einsatzanlass',
                                            bold: true
                                        }, '\nMeldebild\n\nStichwort\n\nMeldender\nMeldeweg\n\n', {
                                            text: 'Einsatzort',
                                            bold: true
                                        }, '\nObjekt\nOrt\nOrtsteil\nStraße\nBemerkung']
                                },
                                {
                                    width: '*',
                                    text: [{ text: operation.message, bold: true }, '\n', {
                                        text: operation.priority ? 'Mit Sondersignal' : 'Ohne Sondersignal',
                                        bold: true
                                    }, '\n\n', { text: operation.keyword, bold: true }, '\n\n', {
                                        text: '11.EVT.1',
                                        bold: true
                                    }, '\n', { text: 'Funk', bold: true }, '\n\n\n', {
                                        text: operation.address.object,
                                        bold: true
                                    }, '\n', { text: operation.address.postcode + ', ' + operation.address.city, bold: true }, '\n', {
                                        text: '-',
                                        bold: true
                                    }, '\n', { text: operation.address.street + ' ' + operation.address.number, bold: true }, '\n', { text: '-', bold: true }]
                                },
                            ],
                    },

                    {
                        layout: 'noBorders',
                        table: {
                            headerRows: 1,
                            widths: [100, '*', '*', '*', '*', '*', '*'],
                            body: vehicles,
                        }
                    }
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

export default AlarmPDF