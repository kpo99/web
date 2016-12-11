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
require('rxjs/add/operator/map');
require('rxjs/Rx');
require('rxjs/add/operator/catch');
var ng2_webstorage_1 = require('ng2-webstorage');
var UserService = (function () {
    function UserService(_http) {
        this._http = _http;
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
    }
    UserService.prototype.logIn = function (username, password) {
        var _this = this;
        return this._http.post('/api/auth/logIn', { username: username, password: password })
            .toPromise()
            .then(function (res) {
            var user = res.json();
            user.password = null;
            user.role = null;
            _this.user = user;
            return user || {};
        });
    };
    UserService.prototype.isAuthorized = function () {
        return this._http.get('/api/auth/isAuthorized').toPromise()
            .catch(function (err) { return console.log(JSON.stringify(err)); });
    };
    UserService.prototype.signUp = function (userObj) {
        return this._http.post('/api/auth/signUp', userObj)
            .map(function (response) {
            return response.json();
        });
        // .catch(this.handleError);
    };
    UserService.prototype.logOut = function () {
        this.user = null;
        return this._http.get('/api/auth/logOut')
            .toPromise();
        //.then(res => res.json() || {});
    };
    UserService.prototype.update = function (user) {
        var _this = this;
        return this._http.put('/api/user/', JSON.stringify(user), { headers: this.headers })
            .toPromise()
            .then(function (result) {
            _this.user = user;
            return result.json();
        });
    };
    __decorate([
        ng2_webstorage_1.LocalStorage(), 
        __metadata('design:type', Object)
    ], UserService.prototype, "user", void 0);
    UserService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map