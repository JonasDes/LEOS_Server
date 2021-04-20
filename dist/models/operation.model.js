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
exports.OperationSchema = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const vehicle_model_1 = require("./vehicle.model");
const user_model_1 = require("./user.model");
const mission_model_1 = require("./mission.model");
class Operation {
}
__decorate([
    typegoose_1.prop({ ref: () => vehicle_model_1.VehicleSchema }),
    __metadata("design:type", Array)
], Operation.prototype, "vehicles", void 0);
__decorate([
    typegoose_1.prop({ ref: () => user_model_1.UserSchema, required: true }),
    __metadata("design:type", Object)
], Operation.prototype, "editor", void 0);
__decorate([
    typegoose_1.prop({ ref: () => mission_model_1.MissionSchema, required: true }),
    __metadata("design:type", Object)
], Operation.prototype, "mission", void 0);
__decorate([
    typegoose_1.prop({ required: true }),
    __metadata("design:type", Object)
], Operation.prototype, "address", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", Object)
], Operation.prototype, "addressDestination", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", String)
], Operation.prototype, "timestamp", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", Boolean)
], Operation.prototype, "priority", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", String)
], Operation.prototype, "keyword", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", String)
], Operation.prototype, "message", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", Array)
], Operation.prototype, "edit", void 0);
exports.OperationSchema = Operation;
exports.default = typegoose_1.getModelForClass(Operation);
//# sourceMappingURL=operation.model.js.map