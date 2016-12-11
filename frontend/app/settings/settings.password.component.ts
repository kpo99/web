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
    
    constructor(private _userService : UserService, private _router : Router){}


    ngOnInit(): void {
        console.log('IN!!!');
    }

    onLogOut() : void {
        this._userService.logOut()
            .then(response => {
                this._router.navigate(['/welcome']);
            })
            .catch((error) => console.log(JSON.stringify(error)));
    }

    onUpdate() : void {
        
    }


    isDisable1() : boolean{
        return ((this.currentPassword.length === 0) || (this.newPassword.length === 0) ||  (this.confirmedPassword.length === 0));
    }



}
