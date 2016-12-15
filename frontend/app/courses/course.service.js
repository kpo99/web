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
var http_1 = require('@angular/http');
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/operator/map');
require('rxjs/add/operator/do');
require('rxjs/add/operator/catch');
var CourseService = (function () {
    function CourseService(_http) {
        this._http = _http;
        //private _courseUrl = 'http://127.0.0.1:3000/api/courses?size=0&offset=0';
        this.courseUrl = 'http://127.0.0.1:3000/api/user/course';
    }
    CourseService.prototype.getCoursesBrief = function (_courseUrl) {
        return this._http.get(_courseUrl)
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    CourseService.prototype.courseSubscribe = function (id) {
        return this._http.post(this.courseUrl, { id: id })
            .toPromise();
    };
    CourseService.prototype.courseView = function (course_id) {
        var params = new http_1.URLSearchParams();
        params.set('course_id', course_id);
        return this._http.get(this.courseUrl, { search: params })
            .toPromise()
            .then(function (response) { return response.json() || {}; });
    };
    CourseService.prototype.courseDelete = function (course_id) {
        var delObj = {
            id: ''
        };
        delObj.id = course_id;
        return this._http.delete(this.courseUrl, { body: delObj })
            .toPromise()
            .then(function (response) { return response.json() || {}; });
    };
    CourseService.prototype.courseUpdate = function (courseObject) {
        return this._http.put(this.courseUrl, courseObject)
            .toPromise()
            .then(function (res) { return res.json(); });
    };
    CourseService.prototype.courseCreate = function (courseObj) {
        return this._http.post(this.courseUrl, courseObj)
            .toPromise();
    };
    CourseService.prototype.handleError = function (error) {
        console.error(error);
        return Observable_1.Observable.throw(error.json().error || 'Server error');
    };
    CourseService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], CourseService);
    return CourseService;
}());
exports.CourseService = CourseService;
//# sourceMappingURL=course.service.js.map