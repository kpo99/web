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
var platform_browser_1 = require('@angular/platform-browser');
var router_1 = require('@angular/router');
var angular2_mdl_1 = require('angular2-mdl');
var http_1 = require('@angular/http');
var forms_1 = require('@angular/forms');
var ng2_webstorage_1 = require('ng2-webstorage');
var app_component_1 = require('./app.component');
var welcome_component_1 = require('./welcome/welcome.component');
var courses_component_1 = require('./courses/courses.component');
var isAuthorized_guard_service_1 = require('./guards/isAuthorized-guard.service');
var course_service_1 = require("./courses/course.service");
var user_service_1 = require("./user/user.service");
var courses_pipe_1 = require("./courses/courses.pipe");
var settings_component_1 = require('./settings/settings.component');
var settings_password_component_1 = require("./settings/settings.password.component");
var pager_service_1 = require("./pagerService/pager.service");
var courses_user_component_1 = require("./courses/courses.user.component");
var course_detailed_component_1 = require("./courseDetailed/course.detailed.component");
var ng2_imageupload_1 = require("ng2-imageupload");
var course_add_component_1 = require("./courseAdd/course.add.component");
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                angular2_mdl_1.MdlModule,
                http_1.HttpModule,
                forms_1.FormsModule,
                ng2_imageupload_1.ImageUploadModule,
                router_1.RouterModule.forRoot([
                    { path: 'welcome', component: welcome_component_1.WelcomeComponent },
                    { path: '', redirectTo: 'welcome', pathMatch: 'full' },
                    { path: 'course/add', canActivate: [isAuthorized_guard_service_1.IsAuthorizedGuard], component: course_add_component_1.CourseAddComponent },
                    { path: 'courses', canActivate: [isAuthorized_guard_service_1.IsAuthorizedGuard], component: courses_component_1.CoursesComponent },
                    { path: 'course/:id', canActivate: [isAuthorized_guard_service_1.IsAuthorizedGuard], component: course_detailed_component_1.CourseDetailedComponent },
                    { path: 'courses/my', canActivate: [isAuthorized_guard_service_1.IsAuthorizedGuard], component: courses_user_component_1.UserCoursesComponent },
                    { path: 'settings', canActivate: [isAuthorized_guard_service_1.IsAuthorizedGuard], component: settings_component_1.SettingsComponent },
                    { path: 'settings/password', canActivate: [isAuthorized_guard_service_1.IsAuthorizedGuard], component: settings_password_component_1.SettingsPasswordComponent },
                ]),
                router_1.RouterModule.forChild([
                    { path: 'welcome', component: welcome_component_1.WelcomeComponent },
                ]),
                ng2_webstorage_1.Ng2Webstorage
            ],
            declarations: [
                app_component_1.AppComponent,
                welcome_component_1.WelcomeComponent,
                courses_component_1.CoursesComponent,
                courses_pipe_1.CourseFilterPipe,
                settings_component_1.SettingsComponent,
                settings_password_component_1.SettingsPasswordComponent,
                courses_user_component_1.UserCoursesComponent,
                course_detailed_component_1.CourseDetailedComponent,
                course_add_component_1.CourseAddComponent
            ],
            providers: [isAuthorized_guard_service_1.IsAuthorizedGuard, course_service_1.CourseService, user_service_1.UserService, pager_service_1.PagerService],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map