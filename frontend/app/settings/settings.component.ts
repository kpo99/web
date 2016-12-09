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



}
