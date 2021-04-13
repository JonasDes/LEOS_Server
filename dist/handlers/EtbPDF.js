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
const missiondiary_model_1 = __importDefault(require("../models/missiondiary.model"));
class EtbPDF {
    constructor(mission) {
        makePDF();
        function makePDF() {
            return __awaiter(this, void 0, void 0, function* () {
                const missiondiary = yield missiondiary_model_1.default.find({ mission }).populate('editor', 'name').populate('mission', 'name');
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
                function buildTableBody(data, columns) {
                    const body = [];
                    const header = ["Nr.", "Zeit", "Ereignis", "Bemerkung", "Editor"];
                    body.push(header);
                    data.forEach((row) => {
                        console.log(row.content);
                        // row.forEach((element: any) => {
                        //     console.log(element, element.length);
                        // });
                        const dataRow = [];
                        columns.forEach((column) => {
                            if (column === "editor") {
                                dataRow.push(row[column].name.toString());
                            }
                            else if (column === "content") {
                                let edits = "";
                                row.edit.forEach((element) => {
                                    var _a;
                                    edits += "\n" + ((_a = element === null || element === void 0 ? void 0 : element.data) === null || _a === void 0 ? void 0 : _a.content) + "\n";
                                });
                                dataRow.push(row[column].toString() + "\r\n" + edits);
                            }
                            else if (column === "comment") {
                                let edits = "";
                                row.edit.forEach((element) => {
                                    var _a;
                                    edits += "\n" + ((_a = element === null || element === void 0 ? void 0 : element.data) === null || _a === void 0 ? void 0 : _a.comment) + "\n";
                                });
                                dataRow.push(row[column].toString() + "\r\n" + edits);
                            }
                            else if (column === "timestamp") {
                                let edits = "";
                                row.edit.forEach((element) => {
                                    edits += "\n" + new Date((element === null || element === void 0 ? void 0 : element.timestamp) * 1).toLocaleTimeString('de-DE') + "\n";
                                });
                                dataRow.push(new Date(row[column] * 1).toLocaleTimeString('de-DE') + "\r\n" + edits);
                            }
                            else {
                                dataRow.push(row[column].toString());
                            }
                        });
                        body.push(dataRow);
                    });
                    return body;
                }
                function table(data, columns) {
                    return {
                        layout: 'lightHorizontalLines',
                        table: {
                            headerRows: 1,
                            widths: ['5%', '14%', '33%', '33%', '15%'],
                            body: buildTableBody(data, columns)
                        }
                    };
                }
                const docDefinition = {
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
                    footer: (currentPage, pageCount) => {
                        return { text: currentPage + " von " + pageCount, alignment: 'right', margin: [0, 0, 15, 0] };
                    },
                    permissions: {
                        printing: 'highResolution',
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
                printer.createPdfKitDocument(docDefinition);
                const pdfDoc = printer.createPdfKitDocument(docDefinition);
                const writeStream = fs.createWriteStream(dirname + '/TEST.pdf');
                pdfDoc.pipe(writeStream);
                pdfDoc.end();
            });
        }
    }
}
exports.default = EtbPDF;
//# sourceMappingURL=EtbPDF.js.map