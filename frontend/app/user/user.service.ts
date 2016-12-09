import {Injectable} from '@angular/core';
import  {Http,Response} from '@angular/http';
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

    constructor(private _http: Http){

    }

    logIn(username: string, password: string): Promise<IUser> {
        return this._http.post('/api/auth/logIn',{username: username,password: password})
            .toPromise()
            .then(res => {
                let user = <IUser>res.json();
                user.password = null;
                user.role = null;
                this.user = user;
                return  user || {}
            });
    }

    isAuthorized() : Promise<Object>
    {
        return this._http.get('/api/auth/isAuthorized').toPromise()
            .catch(err => console.log(JSON.stringify(err)));
    }
    signUp(userObj: Object) : Observable<IUser> {
        return this._http.post('/api/auth/signUp',userObj)
            .map((response : Response) => {
                return <IUser>response.json();
            });
           // .catch(this.handleError);
    }

    logOut() : Promise<Response> {
        this.user = null;
        return this._http.get('/api/auth/logOut')
            .toPromise();
            //.then(res => res.json() || {});
            
    }



    
}