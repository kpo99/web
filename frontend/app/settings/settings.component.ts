import {Component, OnInit} from '@angular/core';
import {IUser} from "../user/user";
import {LocalStorage, SessionStorage} from 'ng2-webstorage';
import {UserService} from "../user/user.service";
import {Router} from "@angular/router";

@Component({

    templateUrl : './app/settings/settings.component.html'

})
export class SettingsComponent implements OnInit {

    @LocalStorage() public user : IUser;
    constructor(private _userService : UserService, private _router : Router){}


    ngOnInit(): void {
        this.user = this._userService.user;
    }

    onLogOut() : void {
        this._userService.logOut()
            .then(response => {
                this._router.navigate(['/welcome']);
            })
            .catch((error) => console.log(JSON.stringify(error)));
    }

    onUpdate() : void {
        this._userService.update(this.user)
            .then(result => console.log(JSON.stringify(result)))
            .catch(err => console.log(JSON.stringify(err)));
    }

    isDisable() : boolean{
         return ( !this.user.name || (this.user.name.length === 0) || !this.user.surname || (this.user.surname.length === 0) ||
                !this.user.username || (this.user.username.length === 0) || !this.user.patronymic || (this.user.patronymic.length === 0) ||
                !this.user.email ||  (this.user.email.length === 0) || ((!this.user.group_name ||(this.user.group_name.length === 0)) && this._userService.user.role === 'user')
                || (((this.user.study_year === null) || isNaN(this.user.study_year) || (this.user.study_year < 1) || (this.user.study_year > 6) ) && this._userService.user.role === 'user'));

    }



}
