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
var user_service_1 = require("../user/user.service");
var course_service_1 = require("../courses/course.service");
var CourseAddComponent = (function () {
    function CourseAddComponent(_userService, _router, _courseService) {
        this._userService = _userService;
        this._router = _router;
        this._courseService = _courseService;
        this.name = '';
        this.description = '';
        this.src = '';
        this.resizeOptions = {
            resizeMaxHeight: 300,
            resizeMaxWidth: 300
        };
    }
    CourseAddComponent.prototype.onLogOut = function () {
        var _this = this;
        this._userService.logOut()
            .then(function (response) {
            _this._router.navigate(['/welcome']);
        })
            .catch(function (error) { return console.log(JSON.stringify(error)); });
    };
    CourseAddComponent.prototype.courseCreate = function () {
        var courseObj = {
            name: this.name,
            year: this.year,
            description: this.description,
            course_logo: this.src
        };
        this._courseService.courseCreate(courseObj)
            .catch(function (err) { return console.log(JSON.stringify(err)); });
    };
    CourseAddComponent.prototype.isDisable = function () {
        return (!this.name || (this.name.length === 0) || !this.description || (this.description.length === 0) ||
            !this.year || !this.src || (this.src.length === 0) || this.year < 2016 || this.year > 2020);
    };
    CourseAddComponent.prototype.selected = function (imageResult) {
        this.src = imageResult.resized
            && imageResult.resized.dataURL
            || imageResult.dataURL;
        console.log(this.src);
    };
    CourseAddComponent = __decorate([
        core_1.Component({
            templateUrl: './app/courseAdd/course.add.component.html'
        }), 
        __metadata('design:paramtypes', [user_service_1.UserService, router_1.Router, course_service_1.CourseService])
    ], CourseAddComponent);
    return CourseAddComponent;
}());
exports.CourseAddComponent = CourseAddComponent;
//# sourceMappingURL=course.add.component.js.map