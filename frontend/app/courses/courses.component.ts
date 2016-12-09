import {Component, OnInit} from '@angular/core';
import {ICourseBrief} from './briefCourseInterface';
import {CourseService} from "./course.service";
import {UserService} from "../user/user.service";
import {Router} from "@angular/router";

@Component({
    selector: 'course-comp',
    templateUrl: 'app/courses/courses.component.html',
    

})

export class  CoursesComponent implements OnInit
{
    courses : ICourseBrief[];
    findBy : string = '';
    errorMessage: string;

    constructor(private _courseService: CourseService, private _userService : UserService, private _router : Router ){

    }

    getCourses(): void {
        this._courseService.getCoursesBrief()
            .subscribe(courses => {
                for (let course of courses){
                    course.course_logo = 'data:image/png;base64,' + course.course_logo;
                }
                this.courses = courses;
            },
                error => this.errorMessage = <any>error);
    }

    onLogOut() : void {
        this._userService.logOut()
            .then(response => {
                this._router.navigate(['/welcome']);
            })
            .catch((error) => console.log(JSON.stringify(error)));
    
    }

    onAuth(): void {
        this._userService.isAuthorized()
            .then(response => console.log(JSON.stringify(response)));
    }


    ngOnInit(): void{
       this.getCourses();

    }
}
