"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_detail_entity_1 = require("./entity/user-detail.entity");
const user_entity_1 = require("./entity/user.entity");
const user_detail_repository_1 = require("./repository/user-detail.repository");
const user_repository_1 = require("./repository/user.repository");
const user_controller_1 = require("./user.controller");
const user_service_1 = require("./user.service");
let UserModule = class UserModule {
};
UserModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([user_entity_1.UserEntity, user_detail_entity_1.UserDetailEntity])],
        providers: [user_service_1.UserService, user_repository_1.UserRepository, user_detail_repository_1.UserDetailRepository],
        controllers: [user_controller_1.UserController],
        exports: [user_service_1.UserService, user_repository_1.UserRepository, user_detail_repository_1.UserDetailRepository]
    })
], UserModule);
exports.UserModule = UserModule;
//# sourceMappingURL=user.module.js.map