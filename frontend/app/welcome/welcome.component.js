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
var course_service_1 = require("../courses/course.service");
var WelcomeComponent = (function () {
    function WelcomeComponent(_userService, _router, _courseService) {
        this._userService = _userService;
        this._router = _router;
        this._courseService = _courseService;
        this.pageTitle = 'Lab Generator';
        this.name = '';
        this.surname = '';
        this.patronymic = '';
        this.regUsername = '';
        this.regPassword = '';
        this.regPasswordConfirm = '';
        this.group_name = '';
        this.email = '';
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
    WelcomeComponent.prototype.onSignUp = function () {
        var userObj = {
            name: this.name,
            surname: this.surname,
            patronymic: this.patronymic,
            username: this.regUsername,
            password: this.regPassword,
            passwordConfirm: this.regPasswordConfirm,
            email: this.email,
            group_name: this.group_name,
            study_year: this.study_year
        };
        this._userService.signUp(userObj)
            .catch(function (error) { return console.log(JSON.stringify(error)); });
    };
    WelcomeComponent.prototype.isDisabled = function () {
        return (!this.name || !this.surname || !this.regPassword || !this.regPasswordConfirm ||
            !this.regUsername || !this.group_name || !this.study_year || !this.email || (this.name.length < 3) ||
            (this.surname.length < 3) || (this.regUsername.length < 3) || (this.regPassword.length < 6) || (this.regPasswordConfirm.length < 6)
            || (this.group_name.length < 4) || (this.email.length < 12) || (this.regPassword !== this.regPasswordConfirm)
            || (this.study_year < 1) || (this.study_year > 6));
    };
    WelcomeComponent.prototype.ngOnInit = function () {
    };
    WelcomeComponent = __decorate([
        core_1.Component({
            selector: 'welcome-comp',
            templateUrl: 'app/welcome/welcome.component.html',
        }), 
        __metadata('design:paramtypes', [user_service_1.UserService, router_1.Router, course_service_1.CourseService])
    ], WelcomeComponent);
    return WelcomeComponent;
}());
exports.WelcomeComponent = WelcomeComponent;
//# sourceMappingURL=welcome.component.js.map