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
var user_service_1 = require('../user/user.service');
var router_1 = require('@angular/router');
var WelcomeComponent = (function () {
    function WelcomeComponent(_userService, _router) {
        this._userService = _userService;
        this._router = _router;
        this.pageTitle = 'Lab Generator';
    }
    WelcomeComponent.prototype.onLogIn = function () {
        var _this = this;
        this._userService.logIn(this.username, this.password)
            .then(function (user) {
            _this.user = user;
            _this.username = '';
            _this.password = '';
            _this._router.navigate(['/courses']);
        })
            .catch(function (error) { return console.log(JSON.stringify(error)); });
    };
    WelcomeComponent.prototype.onLogOut = function () {
        var _this = this;
        this._userService.logOut()
            .then(function (response) { return _this._router.navigate(['/welcome']); })
            .catch(function (error) { return console.log(error); });
    };
    WelcomeComponent.prototype.ngOnInit = function () {
    };
    WelcomeComponent = __decorate([
        core_1.Component({
            selector: 'welcome-comp',
            templateUrl: 'app/welcome/welcome.component.html',
        }), 
        __metadata('design:paramtypes', [user_service_1.UserService, router_1.Router])
    ], WelcomeComponent);
    return WelcomeComponent;
}());
exports.WelcomeComponent = WelcomeComponent;
//# sourceMappingURL=welcome.component.js.map