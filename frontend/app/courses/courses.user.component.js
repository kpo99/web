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
var UserCoursesComponent = (function () {
    function UserCoursesComponent(_courseService, _userService, _router, pagerService) {
        this._courseService = _courseService;
        this._userService = _userService;
        this._router = _router;
        this.pagerService = pagerService;
        this.pager = {};
        this.findBy = '';
        this.curr_page = 1;
        this.src = '';
        this.courseUpdateObj = {
            name: '',
            description: '',
            course_logo: ''
        };
    }
    UserCoursesComponent.prototype.getCourses = function () {
        var _this = this;
        this._courseService.getCoursesBrief('/api/user/course?size=0&offset=0')
            .subscribe(function (courses) {
            _this.courses = courses;
            _this.courses_m = courses;
            _this.setPage(1);
        }, function (error) { return _this.errorMessage = error; });
    };
    UserCoursesComponent.prototype.onLogOut = function () {
        var _this = this;
        this._userService.logOut()
            .then(function (response) {
            _this._router.navigate(['/welcome']);
        })
            .catch(function (error) { return console.log(JSON.stringify(error)); });
    };
    UserCoursesComponent.prototype.onAuth = function () {
        this._userService.isAuthorized()
            .then(function (response) { return console.log(JSON.stringify(response)); });
    };
    UserCoursesComponent.prototype.ngOnInit = function () {
        this.getCourses();
    };
    UserCoursesComponent.prototype.setCourse = function (course_id) {
        var _this = this;
        this._courseService.courseView(course_id)
            .then(function (result) { return _this.courseUpdateObj = result; });
    };
    UserCoursesComponent.prototype.courseUpdate = function () {
        var _this = this;
        this._courseService.courseUpdate(this.courseUpdateObj)
            .then(function (course) {
            for (var _i = 0, _a = _this.courses_m; _i < _a.length; _i++) {
                var el = _a[_i];
                if (el._id === course._id) {
                    el.name = course.name;
                    el.course_logo = course.course_logo;
                }
            }
        })
            .catch(function (err) { return console.log(err.json()); });
    };
    UserCoursesComponent.prototype.courseView = function (course_id) {
        this._courseService.courseView(course_id)
            .catch(function (err) { return console.log(JSON.stringify(err)); });
    };
    UserCoursesComponent.prototype.onCourseDelete = function (course_id) {
        var _this = this;
        this._courseService.courseDelete(course_id)
            .then(function (course) {
            console.log(course._id);
            _this.courses = _this.courses.filter(function (el) {
                return el._id !== course._id;
            });
        })
            .catch(function (err) { return console.log(err); });
    };
    UserCoursesComponent.prototype.ngDoCheck = function () {
        var _this = this;
        this.findBy = this.findBy ? this.findBy.toLocaleLowerCase() : null;
        this.courses_m = this.findBy ? this.courses.filter(function (course) {
            return course.name.toLocaleLowerCase().indexOf(_this.findBy) !== -1;
        }) : this.courses;
        if (this.courses_m)
            this.setPage(this.curr_page);
    };
    UserCoursesComponent.prototype.selected = function (imageResult) {
        this.courseUpdateObj.course_logo = imageResult.resized
            && imageResult.resized.dataURL
            || imageResult.dataURL;
    };
    UserCoursesComponent.prototype.setPage = function (page) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        // get pager object from service
        console.log(this.courses_m.length);
        var len = this.courses_m.length;
        if (page > Math.ceil(len / 8))
            page = 1;
        if (len === 0)
            len = 1;
        this.curr_page = page;
        this.pager = this.pagerService.getPager(len, page);
        // get current page of items
        this.pagedItems = this.courses_m.slice(this.pager.startIndex, this.pager.endIndex + 1);
    };
    UserCoursesComponent = __decorate([
        core_1.Component({
            templateUrl: 'app/courses/courses.user.component.html',
        }), 
        __metadata('design:paramtypes', [course_service_1.CourseService, user_service_1.UserService, router_1.Router, pager_service_1.PagerService])
    ], UserCoursesComponent);
    return UserCoursesComponent;
}());
exports.UserCoursesComponent = UserCoursesComponent;
//# sourceMappingURL=courses.user.component.js.map