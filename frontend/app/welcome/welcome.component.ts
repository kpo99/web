import {Component, OnInit} from '@angular/core';
import {UserService} from '../user/user.service';
import {IUser} from "../user/user";
import {Response} from "@angular/http";
import {Router} from '@angular/router'


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

    constructor(private _userService: UserService, private _router : Router){

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
    ngOnInit(): void {

    }
}
