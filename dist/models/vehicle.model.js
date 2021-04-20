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
exports.VehicleSchema = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const station_model_1 = require("./station.model");
const vehicletype_model_1 = require("./vehicletype.model");
class Vehicle {
}
__decorate([
    typegoose_1.prop({ required: true }),
    __metadata("design:type", String)
], Vehicle.prototype, "name", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", String)
], Vehicle.prototype, "divera_id", void 0);
__decorate([
    typegoose_1.prop({ default: '2' }),
    __metadata("design:type", String)
], Vehicle.prototype, "fms", void 0);
__decorate([
    typegoose_1.prop({ default: '51.000000' }),
    __metadata("design:type", String)
], Vehicle.prototype, "lat", void 0);
__decorate([
    typegoose_1.prop({ default: '6.000000' }),
    __metadata("design:type", String)
], Vehicle.prototype, "lng", void 0);
__decorate([
    typegoose_1.prop({ ref: () => station_model_1.StationSchema, autopopulate: true }),
    __metadata("design:type", Object)
], Vehicle.prototype, "station", void 0);
__decorate([
    typegoose_1.prop({ ref: () => vehicletype_model_1.VehicleTypeSchema, autopopulate: true }),
    __metadata("design:type", Object)
], Vehicle.prototype, "type", void 0);
__decorate([
    typegoose_1.prop({ ref: 'Operation', type: typegoose_1.mongoose.Schema.Types.ObjectId }) // @TODO: https://typegoose.github.io/typegoose/docs/guides/advanced/reference-other-classes/#common-problems
    ,
    __metadata("design:type", Object)
], Vehicle.prototype, "operation", void 0);
exports.VehicleSchema = Vehicle;
exports.default = typegoose_1.getModelForClass(Vehicle);
//# sourceMappingURL=vehicle.model.js.map