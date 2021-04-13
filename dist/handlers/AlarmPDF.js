"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pdfmake_1 = __importDefault(require("pdfmake"));
const fs = __importStar(require("fs"));
const path_1 = __importDefault(require("path"));
const operation_model_1 = __importDefault(require("../models/operation.model"));
const keyword_model_1 = __importDefault(require("../models/keyword.model"));
class AlarmPDF {
    constructor(operationid) {
        makePDF();
        function makePDF() {
            return __awaiter(this, void 0, void 0, function* () {
                const operation = yield operation_model_1.default.findOne({ _id: operationid }).populate('editor', 'name').populate('vehicles', 'name');
                const keyword = yield keyword_model_1.default.findOne({ name: operation.keyword }).select(`nameLong`);
                const dirname = path_1.default.join(__dirname, '..', 'assets');
                const fonts = {
                    Roboto: {
                        normal: dirname + '/fonts/cour.ttf',
                        bold: dirname + '/fonts/courbd.ttf',
                        italics: dirname + '/fonts/couri.ttf',
                        bolditalics: dirname + '/fonts/courbi.ttf',
                    }
                };
                const printer = new pdfmake_1.default(fonts);
                const docDefinition = {
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
                            canvas: [
                                { type: 'line', x1: -40, y1: -5, x2: 480, y2: -5, lineWidth: 2 },
                            ]
                        },
                        {
                            text: [
                                { text: 'Alarmdruck 60 / ' + keyword.nameLong + ' / 07.02.2021 13:50:52', alignment: 'center' },
                            ]
                        },
                        {
                            margin: [0, 0, 0, 25],
                            canvas: [
                                { type: 'line', x1: -40, y1: -29, x2: 480, y2: -29, lineWidth: 2 },
                            ]
                        },
                        {
                            margin: [0, 0, 0, 20],
                            columns: [
                                {
                                    margin: [0, 0, 20, 10],
                                    width: 120,
                                    text: [{
                                            text: 'Einsatzanlass',
                                            bold: true
                                        }, '\nMeldebild\n\nStichwort\n\nMeldender\nMeldeweg\n\n', {
                                            text: 'Einsatzort',
                                            bold: true
                                        }, '\nObjekt\nOrt\nOrtsteil\nStraße\nBemerkung']
                                },
                                {
                                    // star-sized columns fill the remaining space
                                    // if there's more than one star-column, available width is divided equally
                                    width: '*',
                                    text: [{ text: operation.message, bold: true }, '\n', {
                                            text: 'Mit Sondersignal',
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
                                // headers are automatically repeated if the table spans over multiple pages
                                // you can declare how many rows should be treated as headers
                                headerRows: 1,
                                widths: [100, '*', '*', '*', '*', '*', '*'],
                                body: [
                                    [{ text: 'Einsatzmittel', bold: true },
                                        { text: 'alarmiert', bold: true },
                                        { text: 'Status 3', bold: true },
                                        { text: 'Status 4', bold: true },
                                        { text: 'Status 7', bold: true },
                                        { text: 'Status 8', bold: true },
                                        { text: 'Ende', bold: true }],
                                    ["21.RTW.4", '13:39:16', '13:40:01', '13:45:11', '14:00:46', '14:10:34', '14:25:21']
                                ]
                            }
                        }
                    ]
                };
                printer.createPdfKitDocument(docDefinition);
                const pdfDoc = printer.createPdfKitDocument(docDefinition);
                const writeStream = fs.createWriteStream(dirname + '/TEST.pdf');
                pdfDoc.pipe(writeStream);
                pdfDoc.end();
            });
        }
    }
}
exports.default = AlarmPDF;
//# sourceMappingURL=AlarmPDF.js.map