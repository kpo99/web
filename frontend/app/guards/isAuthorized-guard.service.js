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
var core_1 = require('@angular/core');
var router_1 = require("@angular/router");
var http_1 = require('@angular/http');
var user_service_1 = require('../user/user.service');
var IsAuthorizedGuard = (function () {
    function IsAuthorizedGuard(_http, _router, _userService) {
        this._http = _http;
        this._router = _router;
        this._userService = _userService;
    }
    IsAuthorizedGuard.prototype.canActivate = function () {
        if (this._userService.user != null)
            return true;
        else {
            this._router.navigate(['/welcome']);
            return false;
        }
    };
    IsAuthorizedGuard = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, router_1.Router, user_service_1.UserService])
    ], IsAuthorizedGuard);
    return IsAuthorizedGuard;
}());
exports.IsAuthorizedGuard = IsAuthorizedGuard;
//# sourceMappingURL=isAuthorized-guard.service.js.map