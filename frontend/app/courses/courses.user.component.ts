import {Component, OnInit, OnChanges, DoCheck} from '@angular/core';
import {ICourseBrief} from './briefCourseInterface';
import {CourseService} from "./course.service";
import {UserService} from "../user/user.service";
import {Router} from "@angular/router";
import {PagerService} from "../pagerService/pager.service";
import { ImageResult, ResizeOptions } from 'ng2-imageupload';

@Component({
    templateUrl: 'app/courses/courses.user.component.html',



})

export class  UserCoursesComponent implements OnInit, DoCheck
{
    courses : ICourseBrief[];
    courses_m : ICourseBrief[];
    pager : any = {};
    pagedItems : any[];
    findBy : string = '';
    errorMessage: string;
    curr_page : number = 1;
    src : string = '';
    courseUpdateObj : Object = {
        name : '',
        description : '',
        course_logo : ''

    };

    constructor(private _courseService: CourseService, private _userService : UserService, private _router : Router,
                private pagerService : PagerService ){

    }

    getCourses(): void {
        this._courseService.getCoursesBrief('/api/user/course?size=0&offset=0')
            .subscribe(courses => {
                    this.courses = courses;
                    this.courses_m = courses;
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

    setCourse(course_id :string) : void {
        this._courseService.courseView(course_id)
            .then(result => this.courseUpdateObj = result);

    }

    courseUpdate() : void {
        this._courseService.courseUpdate(this.courseUpdateObj)
            .then((course) => {
                for (let el of this.courses_m){
                    if (el._id === course._id)
                    {
                        el.name = course.name;
                        el.course_logo = course.course_logo;
                    }
                }
            })
            .catch(err => console.log(err.json()));
    }
    courseView(course_id : string) : void {
        this._courseService.courseView(course_id)
            .catch(err => console.log(JSON.stringify(err)));
    }

    onCourseDelete(course_id : string) : void {
        this._courseService.courseDelete(course_id)
            .then(course => {
                console.log(course._id);
                this.courses = this.courses.filter(function (el) {
                   return el._id !== course._id;
                });
            })
            .catch(err => console.log(err));
    }


    ngDoCheck() : void {
        this.findBy = this.findBy ? this.findBy.toLocaleLowerCase() : null;
        this.courses_m =  this.findBy ? this.courses.filter((course: ICourseBrief) =>
        course.name.toLocaleLowerCase().indexOf(this.findBy)!== -1) : this.courses;
        if (this.courses_m)
            this.setPage(this.curr_page);

    }

    selected(imageResult: ImageResult) {
        this.courseUpdateObj.course_logo = imageResult.resized
            && imageResult.resized.dataURL
            || imageResult.dataURL;
    }

    setPage(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        // get pager object from service
        console.log(this.courses_m.length);
        var len = this.courses_m.length;
        if (page >  Math.ceil(len  / 8))
            page = 1;
        if (len === 0)
            len = 1;
        this.curr_page = page;

        this.pager = this.pagerService.getPager(len, page);

        // get current page of items
        this.pagedItems = this.courses_m.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }
}
