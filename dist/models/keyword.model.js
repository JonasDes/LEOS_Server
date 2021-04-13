"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeywordSchema = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const vehicletype_model_1 = require("./vehicletype.model");
class Keyword {
}
__decorate([
    typegoose_1.prop({ required: true }),
    __metadata("design:type", String)
], Keyword.prototype, "name", void 0);
__decorate([
    typegoose_1.prop({ required: true }),
    __metadata("design:type", String)
], Keyword.prototype, "nameLong", void 0);
__decorate([
    typegoose_1.prop({ required: true }),
    __metadata("design:type", Boolean)
], Keyword.prototype, "priority", void 0);
__decorate([
    typegoose_1.prop({ ref: () => vehicletype_model_1.VehicleTypeSchema }),
    __metadata("design:type", Array)
], Keyword.prototype, "vehicles", void 0);
exports.KeywordSchema = Keyword;
exports.default = typegoose_1.getModelForClass(Keyword);
//# sourceMappingURL=keyword.model.js.map