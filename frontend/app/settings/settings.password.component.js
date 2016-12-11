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
var user_service_1 = require("../user/user.service");
var router_1 = require("@angular/router");
var SettingsPasswordComponent = (function () {
    function SettingsPasswordComponent(_userService, _router) {
        this._userService = _userService;
        this._router = _router;
        this.currentPassword = '';
        this.newPassword = '';
        this.confirmedPassword = '';
    }
    SettingsPasswordComponent.prototype.ngOnInit = function () {
        console.log('IN!!!');
    };
    SettingsPasswordComponent.prototype.onLogOut = function () {
        var _this = this;
        this._userService.logOut()
            .then(function (response) {
            _this._router.navigate(['/welcome']);
        })
            .catch(function (error) { return console.log(JSON.stringify(error)); });
    };
    SettingsPasswordComponent.prototype.onUpdate = function () {
    };
    SettingsPasswordComponent.prototype.isDisable1 = function () {
        return ((this.currentPassword.length === 0) || (this.newPassword.length === 0) || (this.confirmedPassword.length === 0));
    };
    SettingsPasswordComponent = __decorate([
        core_1.Component({
            templateUrl: './app/settings/settings.password.component.html'
        }), 
        __metadata('design:paramtypes', [user_service_1.UserService, router_1.Router])
    ], SettingsPasswordComponent);
    return SettingsPasswordComponent;
}());
exports.SettingsPasswordComponent = SettingsPasswordComponent;
//# sourceMappingURL=settings.password.component.js.map