import {Injectable} from '@angular/core'
import {Router,CanActivate} from "@angular/router";
import {Http} from '@angular/http'
import {UserService} from '../user/user.service'
import {LocalStorageService} from 'ng2-webstorage';

@Injectable()

export  class IsAuthorizedGuard implements CanActivate {


    constructor(private _http : Http, private _router : Router, private _userService : UserService,
                ){}

    canActivate() : boolean {
        if (this._userService.user != null)
            return true;
        else
        {
            this._router.navigate(['/welcome']);
            return false;
        }
    }


}