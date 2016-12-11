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
var ng2_webstorage_1 = require('ng2-webstorage');
var user_service_1 = require("../user/user.service");
var router_1 = require("@angular/router");
var SettingsComponent = (function () {
    function SettingsComponent(_userService, _router) {
        this._userService = _userService;
        this._router = _router;
    }
    SettingsComponent.prototype.ngOnInit = function () {
        this.user = this._userService.user;
    };
    SettingsComponent.prototype.onLogOut = function () {
        var _this = this;
        this._userService.logOut()
            .then(function (response) {
            _this._router.navigate(['/welcome']);
        })
            .catch(function (error) { return console.log(JSON.stringify(error)); });
    };
    SettingsComponent.prototype.onUpdate = function () {
        this._userService.update(this.user)
            .then(function (result) { return console.log(JSON.stringify(result)); })
            .catch(function (err) { return console.log(JSON.stringify(err)); });
    };
    SettingsComponent.prototype.isDisable = function () {
        return ((this.user.name.length === 0) || (this.user.surname.length === 0) ||
            (this.user.username.length === 0) || (this.user.patronymic.length === 0) ||
            (this.user.email.length === 0) || (this.user.group_name.length === 0) ||
            (this.user.study_year === null) || isNaN(this.user.study_year) || (this.user.study_year < 1) || (this.user.study_year > 6));
    };
    __decorate([
        ng2_webstorage_1.LocalStorage(), 
        __metadata('design:type', Object)
    ], SettingsComponent.prototype, "user", void 0);
    SettingsComponent = __decorate([
        core_1.Component({
            templateUrl: './app/settings/settings.component.html'
        }), 
        __metadata('design:paramtypes', [user_service_1.UserService, router_1.Router])
    ], SettingsComponent);
    return SettingsComponent;
}());
exports.SettingsComponent = SettingsComponent;
//# sourceMappingURL=settings.component.js.map