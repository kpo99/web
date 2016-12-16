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
require('rxjs/Rx');
var LabDetailedComponent = (function () {
    function LabDetailedComponent(_route, _router, _userService, _courseService) {
        this._route = _route;
        this._router = _router;
        this._userService = _userService;
        this._courseService = _courseService;
        this.aim = '';
        this.theme = '';
        this.task_description = '';
        console.log();
    }
    LabDetailedComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._courseService.courseGetLab(this._route.snapshot.params['course_id'], this._route.snapshot.params['lab_id'])
            .then(function (lab) {
            _this.aim = lab.aim;
            _this.theme = lab.theme;
            _this.task_description = lab.task_description;
            _this.number = lab.number;
            _this.user_id = lab.user_id;
            console.log(JSON.stringify(lab));
        })
            .catch(function (err) { return console.log(JSON.stringify(err)); });
    };
    LabDetailedComponent.prototype.labGenerate = function () {
        window.location.href = '/api/user/course/generate?course_id=' + this._route.snapshot.params['course_id'] + '&lab_id=' + this._route.snapshot.params['lab_id'];
    };
    LabDetailedComponent.prototype.downloadFile = function (data) {
        var blob = new Blob([data._body.toString()], { type: 'application/msword' });
        var url = window.URL.createObjectURL(blob);
        window.open(url);
    };
    LabDetailedComponent.prototype.onLogOut = function () {
        var _this = this;
        this._userService.logOut()
            .then(function (response) {
            _this._router.navigate(['/welcome']);
        })
            .catch(function (error) { return console.log(JSON.stringify(error)); });
    };
    LabDetailedComponent.prototype.labUpdate = function () {
        var updateObj = {
            course_id: this._route.snapshot.params['course_id'],
            lab_id: this._route.snapshot.params['lab_id'],
            code_examples: this.code_examples,
            summary: this.summary
        };
        this._courseService.courseUpdateLab(updateObj)
            .then(function (response) { return console.log(JSON.stringify(response)); })
            .catch(function (err) { return console.log(JSON.stringify(err)); });
    };
    LabDetailedComponent = __decorate([
        core_1.Component({
            templateUrl: './app/labDetailed/lab.detailed.component.html'
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router, user_service_1.UserService, course_service_1.CourseService])
    ], LabDetailedComponent);
    return LabDetailedComponent;
}());
exports.LabDetailedComponent = LabDetailedComponent;
//# sourceMappingURL=lab.detailed.component.js.map