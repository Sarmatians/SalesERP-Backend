"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const typeorm_1 = require("@nestjs/typeorm");
const datasource_1 = require("../db/datasource");
const inventory_module_1 = require("./inventory/inventory.module");
const users_module_1 = require("./users/users.module");
const order_module_1 = require("./order/order.module");
const current_user_middleware_1 = require("./utility/middlewares/current-user.middleware");
const hrm_module_1 = require("./hrm/hrm.module");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const upload_module_1 = require("./upload/upload.module");
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(current_user_middleware_1.CurrentUserMiddleware)
            .forRoutes({ path: '*', method: common_1.RequestMethod.ALL });
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot(datasource_1.dataSourceOptions),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', 'upload'),
                serveRoot: '/upload',
            }),
            inventory_module_1.InventoryModule,
            users_module_1.UsersModule,
            order_module_1.OrderModule,
            hrm_module_1.HrmModule,
            upload_module_1.UploadModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map