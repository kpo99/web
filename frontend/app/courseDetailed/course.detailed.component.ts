import {Component, OnInit, RootRenderer} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../user/user.service";
import {CourseService} from "../courses/course.service";

@Component({
    templateUrl : './app/courseDetailed/course.detailed.component.html'

})
export class CourseDetailedComponent implements OnInit{

    course : any = {};
    aim : string = '';
    theme : string = '';
    task_description : string = '';
    number : number ;
    



    constructor(private _route : ActivatedRoute, private _router : Router, public _userService : UserService, private _courseService : CourseService){
    }

    ngOnInit() : void {
        this._courseService.courseView(this._route.snapshot.params['id'])
            .then(response => {
                this.course = response;

            })
            .catch(err => console.log(JSON.stringify(err)));

    }
    
    addLab() : void {
        var labObj = {
            id : this.course._id,
            aim : this.aim,
            theme : this.theme,
            task_description : this.task_description,
            number : this.number
        };

        this._courseService.courseAddLab(labObj)
            .then(() => this.ngOnInit())
            .catch(err => console.log(JSON.stringify(err)));
    }

    onLogOut() : void {
        this._userService.logOut()
            .then(response => {
                this._router.navigate(['/welcome']);
            })
            .catch((error) => console.log(JSON.stringify(error)));

    }
    
}
