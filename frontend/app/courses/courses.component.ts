import {Component, OnInit} from '@angular/core';
import {ICourseBrief} from './briefCourseInterface';
import {CourseService} from "./course.service";
import {UserService} from "../user/user.service";
import {Router} from "@angular/router";
import {PagerService} from "../pagerService/pager.service";

@Component({
    selector: 'course-comp',
    templateUrl: 'app/courses/courses.component.html',
    

})

export class  CoursesComponent implements OnInit
{
    courses : ICourseBrief[];
    pager : any = {};
    pagedItems : any[];
    findBy : string = '';
    errorMessage: string;

    constructor(private _courseService: CourseService, private _userService : UserService, private _router : Router,
                private pagerService : PagerService ){

    }

    getCourses(): void {
        this._courseService.getCoursesBrief()
            .subscribe(courses => {
                for (let course of courses){
                    course.course_logo = 'data:image/png;base64,' + course.course_logo;
                }
                this.courses = courses;
                    this.setPage(1);
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
    setPage(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }

        // get pager object from service
        this.pager = this.pagerService.getPager(this.courses.length, page);

        // get current page of items
        this.pagedItems = this.courses.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }
}
