import {Injectable} from '@angular/core';
import  {Http, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import {IUser} from "./user";
import {LocalStorage, SessionStorage} from 'ng2-webstorage';
import {LocalStorageService} from 'ng2-webstorage';

@Injectable()
export class UserService {

     @LocalStorage() public user : IUser;
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private _http: Http){

    }

    logIn(username: string, password: string): Promise<IUser> {
        return this._http.post('/api/auth/logIn',{username: username,password: password})
            .toPromise()
            .then(res => {
                let user = <IUser>res.json();
                user.password = null;
                this.user = user;
                return  user || {}
            });
    }

    isAuthorized() : Promise<Object>
    {
        return this._http.get('/api/auth/isAuthorized').toPromise()
            .catch(err => console.log(JSON.stringify(err)));
    }
    signUp(userObj: Object) : Promise<Response> {
        return this._http.post('/api/auth/signUp',userObj)
            .toPromise();
    }

    logOut() : Promise<Response> {
        this.user = null;
        return this._http.get('/api/auth/logOut')
            .toPromise();
            //.then(res => res.json() || {});
            
    }

    updatePassword(updateObj : Object) : Promise<Response> {
        return this._http.put('/api/user/password',updateObj)
            .toPromise();
    }

    update(user : IUser): Promise<Response> {
        return this._http.put('/api/user/', JSON.stringify(user), {headers: this.headers})
            .toPromise()
            .then(result => {
                this.user = user;
                return result.json();
            });
    }



    
}