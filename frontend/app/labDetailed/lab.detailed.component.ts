import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../user/user.service";
import {CourseService} from "../courses/course.service";
import 'rxjs/Rx' ;
import {Response} from "@angular/http";
import {win} from "@angular/platform-browser/src/facade/browser";

@Component({
    templateUrl : './app/labDetailed/lab.detailed.component.html'

})
export class LabDetailedComponent implements OnInit {


    aim: string = '';
    theme: string = '';
    task_description: string = '';
    number: number;
    code_examples : string;
    summary : string;
    user_id  : string;


    constructor(private _route: ActivatedRoute, private _router : Router , public _userService: UserService, private _courseService: CourseService) {
        console.log();
    }

    ngOnInit(): void {
        this._courseService.courseGetLab(this._route.snapshot.params['course_id'], this._route.snapshot.params['lab_id'])
            .then(lab => {
                this.aim = lab.aim;
                this.theme = lab.theme;
                this.task_description = lab.task_description;
                this.number = lab.number;
                this.user_id = lab.user_id;
                console.log(JSON.stringify(lab));

            })
            .catch(err => console.log(JSON.stringify(err)));

    }

    labGenerate() {

        window.location.href = '/api/user/course/generate?course_id=' + this._route.snapshot.params['course_id'] + '&lab_id=' + this._route.snapshot.params['lab_id'];

    }

    downloadFile(data: any) {
        var blob = new Blob([data._body.toString()], {type: 'application/msword'});
        var url = window.URL.createObjectURL(blob);
        window.open(url);
    }

    onLogOut() : void {
        this._userService.logOut()
            .then(response => {
                this._router.navigate(['/welcome']);
            })
            .catch((error) => console.log(JSON.stringify(error)));

    }

    labUpdate() : void {
        var updateObj = {
            course_id :  this._route.snapshot.params['course_id'],
            lab_id :  this._route.snapshot.params['lab_id'],
            code_examples : this.code_examples,
            summary : this.summary
        };
        this._courseService.courseUpdateLab(updateObj)
            .then(response => console.log(JSON.stringify(response)))
            .catch(err => console.log(JSON.stringify(err)));
    }



}