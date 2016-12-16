import {Injectable} from '@angular/core';
import  {Http, Response, URLSearchParams, Headers, BrowserXhr} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

import {ICourseBrief} from './briefCourseInterface';

@Injectable()

export class CourseService {
    //private _courseUrl = 'http://127.0.0.1:3000/api/courses?size=0&offset=0';
        private courseUrl = 'http://127.0.0.1:3000/api/user/course';


    constructor(private _http : Http){

    }

    getCoursesBrief(_courseUrl : string): Observable<ICourseBrief[]> {


        return this._http.get(_courseUrl)
                     .map((response: Response) => <ICourseBrief[]>response.json())
                            .catch(this.handleError);
    }

    courseSubscribe(id: string) : Promise<Response> {
        return this._http.post(this.courseUrl, {id: id})
            .toPromise();
    }

    courseView(course_id : string ) : Promise<Response> {
        let params: URLSearchParams = new URLSearchParams();
        params.set('course_id', course_id);

        return this._http.get(this.courseUrl, { search: params })
            .toPromise()
            .then((response : Response) => response.json() || {});
    }

    courseDelete(course_id : string ) : Promise<ICourseBrief> {
        let delObj = {
            id : ''
        };
        delObj.id = course_id;
        return this._http.delete(this.courseUrl, { body: delObj })
            .toPromise()
            .then((response : Response) => <ICourseBrief>response.json() || {});
    }

    courseUpdate(courseObject : Object) : Promise<Response> {
        return this._http.put(this.courseUrl, courseObject)
            .toPromise()
            .then(res => res.json());
    }

    courseCreate(courseObj : Object) : Promise<Response> {

        return this._http.post(this.courseUrl,courseObj)
            .toPromise()
            .then(res => res.json());
    }

    courseAddLab(labObj : Object ) : Promise<Response> {
        return this._http.post(this.courseUrl + '/lab', labObj)
            .toPromise()
            .then(response => response.json());
    }

    courseGetLab(course_id : string, lab_id : string) : Promise<Response>
    {
        let params: URLSearchParams = new URLSearchParams();
        params.set('course_id', course_id);
        params.set('lab_id', lab_id);

        return this._http.get(this.courseUrl + '/lab', {search: params})
            .toPromise()
            .then(res => res.json() || {});
    }


    courseGenerateLab(course_id : string, lab_id : string): Promise<Response>
    {
        let params: URLSearchParams = new URLSearchParams();
        params.set('course_id', course_id);
        params.set('lab_id', lab_id);

        return this._http.get(this.courseUrl + '/generate', {search: params})
            .toPromise();

    }

    courseUpdateLab(updateObj : Object) : Promise<Response>{
        return this._http.put(this.courseUrl + '/lab', updateObj)
            .toPromise();
    }



    private handleError(error: Response)
    {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
