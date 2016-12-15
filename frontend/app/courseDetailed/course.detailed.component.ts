import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../user/user.service";
import {CourseService} from "../courses/course.service";

@Component({
    selector: 'pm-app',
    templateUrl : './app/courseDetailed/course.detailed.component.html'

})
export class CourseDetailedComponent implements OnInit{

    course : any = {};

    constructor(private _route : ActivatedRoute, public _userService : UserService, private _courseService : CourseService){
        console.log();
    }

    ngOnInit() : void {
        this._courseService.courseView(this._route.snapshot.params['id'])
            .then(response => {
                this.course = response;

            })
            .catch(err => JSON.stringify(err));

    }
}
