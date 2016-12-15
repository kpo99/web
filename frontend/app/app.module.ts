import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {RouterModule} from '@angular/router'
import {MdlModule} from 'angular2-mdl';
import {HttpModule} from '@angular/http';
import { FormsModule } from '@angular/forms';
import {Ng2Webstorage} from 'ng2-webstorage';


import { AppComponent }  from './app.component';
import {WelcomeComponent} from './welcome/welcome.component';
import {CoursesComponent} from './courses/courses.component';
import {IsAuthorizedGuard} from './guards/isAuthorized-guard.service'
import {CourseService} from "./courses/course.service";
import {UserService} from "./user/user.service";
import {CourseFilterPipe} from "./courses/courses.pipe";
import {SettingsComponent} from './settings/settings.component';
import {SettingsPasswordComponent} from "./settings/settings.password.component";
import {PagerService} from "./pagerService/pager.service";
import {UserCoursesComponent} from "./courses/courses.user.component";
import {CourseDetailedComponent} from "./courseDetailed/course.detailed.component";
import {ImageUploadModule} from "ng2-imageupload";
import {CourseAddComponent} from "./courseAdd/course.add.component";

@NgModule({
  imports: [
      BrowserModule,
      MdlModule,
      HttpModule,
      FormsModule,
      ImageUploadModule,
      RouterModule.forRoot([
          {path: 'welcome', component: WelcomeComponent },
          {path: '', redirectTo: 'welcome', pathMatch: 'full'},
          {path: 'course/add', canActivate: [IsAuthorizedGuard], component: CourseAddComponent},
          {path: 'courses', canActivate: [IsAuthorizedGuard], component: CoursesComponent},
          {path: 'course/:id', canActivate: [IsAuthorizedGuard], component: CourseDetailedComponent},
          {path: 'courses/my', canActivate: [IsAuthorizedGuard], component: UserCoursesComponent},
          {path: 'settings', canActivate: [IsAuthorizedGuard], component: SettingsComponent},
          {path: 'settings/password', canActivate: [IsAuthorizedGuard], component: SettingsPasswordComponent},

          ]),
      RouterModule.forChild([
          {path: 'welcome', component: WelcomeComponent },

      ]),
      Ng2Webstorage
  ],
  declarations: [
      AppComponent,
      WelcomeComponent,
      CoursesComponent,
      CourseFilterPipe,
      SettingsComponent,
      SettingsPasswordComponent,
      UserCoursesComponent,
      CourseDetailedComponent,
      CourseAddComponent
  ],
  providers: [IsAuthorizedGuard,CourseService, UserService, PagerService],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
