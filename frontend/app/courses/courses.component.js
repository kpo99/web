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
var course_service_1 = require("./course.service");
var user_service_1 = require("../user/user.service");
var router_1 = require("@angular/router");
var pager_service_1 = require("../pagerService/pager.service");
var CoursesComponent = (function () {
    function CoursesComponent(_courseService, _userService, _router, pagerService) {
        this._courseService = _courseService;
        this._userService = _userService;
        this._router = _router;
        this.pagerService = pagerService;
        this.pager = {};
        this.findBy = '';
    }
    CoursesComponent.prototype.getCourses = function () {
        var _this = this;
        this._courseService.getCoursesBrief()
            .subscribe(function (courses) {
            for (var _i = 0, courses_1 = courses; _i < courses_1.length; _i++) {
                var course = courses_1[_i];
                course.course_logo = 'data:image/png;base64,' + course.course_logo;
            }
            _this.courses = courses;
            _this.setPage(1);
        }, function (error) { return _this.errorMessage = error; });
    };
    CoursesComponent.prototype.onLogOut = function () {
        var _this = this;
        this._userService.logOut()
            .then(function (response) {
            _this._router.navigate(['/welcome']);
        })
            .catch(function (error) { return console.log(JSON.stringify(error)); });
    };
    CoursesComponent.prototype.onAuth = function () {
        this._userService.isAuthorized()
            .then(function (response) { return console.log(JSON.stringify(response)); });
    };
    CoursesComponent.prototype.ngOnInit = function () {
        this.getCourses();
    };
    CoursesComponent.prototype.setPage = function (page) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        // get pager object from service
        this.pager = this.pagerService.getPager(this.courses.length, page);
        // get current page of items
        this.pagedItems = this.courses.slice(this.pager.startIndex, this.pager.endIndex + 1);
    };
    CoursesComponent = __decorate([
        core_1.Component({
            selector: 'course-comp',
            templateUrl: 'app/courses/courses.component.html',
        }), 
        __metadata('design:paramtypes', [course_service_1.CourseService, user_service_1.UserService, router_1.Router, pager_service_1.PagerService])
    ], CoursesComponent);
    return CoursesComponent;
}());
exports.CoursesComponent = CoursesComponent;
//# sourceMappingURL=courses.component.js.map