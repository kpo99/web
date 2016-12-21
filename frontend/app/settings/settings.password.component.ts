import {Component, OnInit} from '@angular/core';
import {IUser} from "../user/user";
import {LocalStorage, SessionStorage} from 'ng2-webstorage';
import {UserService} from "../user/user.service";
import {Router} from "@angular/router";
import {isEmpty} from "rxjs/operator/isEmpty";

@Component({

    templateUrl : './app/settings/settings.password.component.html'

})
export class SettingsPasswordComponent implements OnInit {

    currentPassword : string = '';
    newPassword : string = '';
    confirmedPassword : string = '';
    isChanged : boolean = false;
    
    constructor(private _userService : UserService, private _router : Router){}


    ngOnInit(): void {
    }

    onLogOut() : void {
        this._userService.logOut()
            .then(response => {
                this._router.navigate(['/welcome']);
            })
            .catch((error) => console.log(JSON.stringify(error)));
    }

    onUpdate() : void {
        var updateObj = {
            old_password : this.currentPassword,
            new_password : this.newPassword,
            confirm_password : this.confirmedPassword
        };

        this._userService.updatePassword(updateObj)
            .then(() => {
                this.currentPassword = null;
                this.newPassword = null;
                this.confirmedPassword = null;
                this.isChanged = true;
            })
            .catch((error) =>
            {
                console.log(JSON.stringify(error));
                this.isChanged = false;
            });
    }


    isDisable() : boolean{
        return (!this.currentPassword || (this.currentPassword.length === 0) || !this.newPassword ||
        (this.newPassword.length === 0) ||  !this.confirmedPassword || (this.confirmedPassword.length === 0)
        || (this.newPassword !== this.confirmedPassword));
    }



}
