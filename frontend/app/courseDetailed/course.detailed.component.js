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
var CourseDetailedComponent = (function () {
    function CourseDetailedComponent(_route, _userService, _courseService) {
        this._route = _route;
        this._userService = _userService;
        this._courseService = _courseService;
        this.course = {};
        console.log();
    }
    CourseDetailedComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._courseService.courseView(this._route.snapshot.params['id'])
            .then(function (response) {
            _this.course = response;
            _this.course.course_logo = 'data:image/png;base64,' + _this.course.course_logo;
        })
            .catch(function (err) { return JSON.stringify(err); });
    };
    CourseDetailedComponent = __decorate([
        core_1.Component({
            selector: 'pm-app',
            templateUrl: './app/courseDetailed/course.detailed.component.html'
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, user_service_1.UserService, course_service_1.CourseService])
    ], CourseDetailedComponent);
    return CourseDetailedComponent;
}());
exports.CourseDetailedComponent = CourseDetailedComponent;
//# sourceMappingURL=course.detailed.component.js.map