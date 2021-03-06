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
exports.ClubMember = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const Club_1 = require("./Club");
const User_1 = require("./User");
let ClubMember = class ClubMember extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryColumn(),
    __metadata("design:type", Number)
], ClubMember.prototype, "clubId", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Club_1.Club, (club) => club.followers),
    __metadata("design:type", Club_1.Club)
], ClubMember.prototype, "club", void 0);
__decorate([
    typeorm_1.PrimaryColumn(),
    __metadata("design:type", Number)
], ClubMember.prototype, "memberId", void 0);
__decorate([
    typeorm_1.ManyToOne(() => User_1.User, (u) => u.club_member),
    __metadata("design:type", User_1.User)
], ClubMember.prototype, "member", void 0);
ClubMember = __decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity()
], ClubMember);
exports.ClubMember = ClubMember;
//# sourceMappingURL=ClubMember.js.map