import {Component, OnInit, OnChanges, DoCheck} from '@angular/core';
import {ICourseBrief} from './briefCourseInterface';
import {CourseService} from "./course.service";
import {UserService} from "../user/user.service";
import {Router} from "@angular/router";
import {PagerService} from "../pagerService/pager.service";

@Component({
    selector: 'course-comp',
    templateUrl: 'app/courses/courses.component.html',

    

})

export class  CoursesComponent implements OnInit, DoCheck
{
    courses : ICourseBrief[];
    courses_m : ICourseBrief[];
    pager : any = {};
    pagedItems : any[];
    findBy : string = '';
    errorMessage: string;
    curr_page : number = 1;

    constructor(private _courseService: CourseService, private _userService : UserService, private _router : Router,
                private pagerService : PagerService ){

    }

    getCourses(): void {
        this._courseService.getCoursesBrief('/api/courses?size=0&offset=0')
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

    ngDoCheck() : void {
        this.findBy = this.findBy ? this.findBy.toLocaleLowerCase() : null;
        this.courses_m =  this.findBy ? this.courses.filter((course: ICourseBrief) =>
        course.name.toLocaleLowerCase().indexOf(this.findBy)!== -1) : this.courses;
        if (this.courses_m)
            this.setPage(this.curr_page);

    }

    onSubscribe(id : string) : void {
        this._courseService.courseSubscribe(id)
            .then(result => console.log(JSON.stringify(result)))
            .catch(err => JSON.stringify(err));
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
