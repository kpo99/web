import { Component } from '@angular/core';
import { ImageResult, ResizeOptions } from 'ng2-imageupload';
import {Router} from "@angular/router";
import {UserService} from "../user/user.service";
import {CourseService} from "../courses/course.service";

@Component({

    templateUrl: './app/courseAdd/course.add.component.html'

})
export class CourseAddComponent {
    name : string = '';
    description : string = '';
    year : number;

    src: string = '';
    resizeOptions: ResizeOptions = {
        resizeMaxHeight: 300,
        resizeMaxWidth: 300
    };

    constructor(private _userService : UserService, private _router : Router, private _courseService : CourseService){}

    onLogOut() : void {
        this._userService.logOut()
            .then(response => {
                this._router.navigate(['/welcome']);
            })
            .catch((error) => console.log(JSON.stringify(error)));
    }

    courseCreate() : void {
          let courseObj : Object =   {
              name : this.name,
              year : this.year,
              description : this.description,
              course_logo :  this.src
         };

         this._courseService.courseCreate(courseObj)
             .catch(err => console.log(JSON.stringify(err)));


    }

    isDisable() : boolean {
        return (!this.name || (this.name.length === 0) || !this.description || (this.description.length === 0)  ||
        !this.year || !this.src || (this.src.length === 0) || this.year < 2016 || this.year > 2020);
    }


    selected(imageResult: ImageResult) {
        this.src = imageResult.resized
            && imageResult.resized.dataURL
            || imageResult.dataURL;
        console.log(this.src);
    }


}
