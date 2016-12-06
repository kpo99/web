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

@NgModule({
  imports: [
      BrowserModule,
      MdlModule,
      HttpModule,
      FormsModule,
      RouterModule.forRoot([
          {path: 'welcome', component: WelcomeComponent },
          {path: '', redirectTo: 'welcome', pathMatch: 'full'},
          {path: 'courses', canActivate: [IsAuthorizedGuard], component: CoursesComponent}
          ]),
      Ng2Webstorage
  ],
  declarations: [
      AppComponent,
      WelcomeComponent,
      CoursesComponent
  ],
  providers: [IsAuthorizedGuard,CourseService, UserService],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
