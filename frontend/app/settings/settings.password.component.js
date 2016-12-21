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
        this.isChanged = false;
    }
    SettingsPasswordComponent.prototype.ngOnInit = function () {
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
        var _this = this;
        var updateObj = {
            old_password: this.currentPassword,
            new_password: this.newPassword,
            confirm_password: this.confirmedPassword
        };
        this._userService.updatePassword(updateObj)
            .then(function () {
            _this.currentPassword = null;
            _this.newPassword = null;
            _this.confirmedPassword = null;
            _this.isChanged = true;
        })
            .catch(function (error) {
            console.log(JSON.stringify(error));
            _this.isChanged = false;
        });
    };
    SettingsPasswordComponent.prototype.isDisable = function () {
        return (!this.currentPassword || (this.currentPassword.length === 0) || !this.newPassword ||
            (this.newPassword.length === 0) || !this.confirmedPassword || (this.confirmedPassword.length === 0)
            || (this.newPassword !== this.confirmedPassword));
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