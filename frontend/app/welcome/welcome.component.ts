import {Component, OnInit} from '@angular/core';
import {UserService} from '../user/user.service';
import {IUser} from "../user/user";
import {Response} from "@angular/http";
import {Router} from '@angular/router'
import {CourseService} from "../courses/course.service";
import {ICourseBrief} from "../courses/briefCourseInterface";


@Component({
    selector: 'welcome-comp',
    templateUrl: 'app/welcome/welcome.component.html',
})

export class  WelcomeComponent implements OnInit
{
    pageTitle : string = 'Lab Generator';
    username : string;
    password : string;
    user : IUser;

    name : string = '';
    surname: string = '';
    patronymic : string = '';
    regUsername : string = '';
    regPassword : string = '';
    regPasswordConfirm : string = '';
    group_name : string = '';
    email : string = '';
    study_year  : number;





    constructor(private _userService: UserService, private _router : Router, private _courseService: CourseService){

    }

    onLogIn() : void {
        this._userService.logIn(this.username, this.password)
            .then(user => {
                this.user = user;
                this.username = '';
                this.password = '';
                this._router.navigate(['/courses']);
            })
            .catch((error) => console.log(JSON.stringify(error)));

    }

    onLogOut() : void {
        this._userService.logOut()
            .then(response => this._router.navigate(['/welcome']))
            .catch((error) => console.log(error));
    }

    onSignUp() : void {
        var userObj = {
            name : this.name,
            surname : this.surname,
            patronymic : this.patronymic,
            username : this.regUsername,
            password : this.regPassword,
            passwordConfirm : this.regPasswordConfirm,
            email : this.email,
            group_name : this.group_name,
            study_year : this.study_year
        };

        this._userService.signUp(userObj)
            .catch((error) => console.log(JSON.stringify(error)));
    }



    isDisabled() : boolean {
        return (!this.name || !this.surname || !this.regPassword || !this.regPasswordConfirm ||
        !this.regUsername || !this.group_name || !this.study_year || !this.email || (this.name.length < 3) ||
        (this.surname.length < 3) || (this.regUsername.length < 3) || (this.regPassword.length < 6) || (this.regPasswordConfirm.length < 6)
        || (this.group_name.length < 4) || (this.email.length < 12) || (this.regPassword !== this.regPasswordConfirm)
        || (this.study_year < 1) || (this.study_year > 6));
    }

    ngOnInit(): void {

    }
}
