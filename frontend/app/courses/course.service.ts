import {Injectable} from '@angular/core';
import  {Http,Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

import {ICourseBrief} from './briefCourseInterface';

@Injectable()

export class CourseService {
    private _courseUrl = 'http://localhost:3000/api/courses?size=0&offset=0';

    constructor(private _http : Http){

    }

    signIn(): Observable<Response> {
        return this._http.post('http://localhost:3000/api/auth/logIn', {username: 'kpo99', password: '12345'})
            .catch(this.handleError);
    }
    getCoursesBrief(): Observable<ICourseBrief[]> {


        return this._http.get(this._courseUrl,{ withCredentials: true })
                     .map((response: Response) => <ICourseBrief[]>response.json())
                        .do(data=>console.log('All: ' + JSON.stringify(data)))
                            .catch(this.handleError);
    }

    private handleError(error: Response)
    {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
