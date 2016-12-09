import {Pipe,PipeTransform} from '@angular/core';
import {ICourseBrief} from './briefCourseInterface';


@Pipe({
    name : 'courseFilter'
})

export class CourseFilterPipe implements PipeTransform {

    transform(value : ICourseBrief[], filterBy: string) : ICourseBrief[]{
        filterBy = filterBy ? filterBy.toLocaleLowerCase() : null;
        return filterBy ? value.filter((course: ICourseBrief) =>
                course.name.toLocaleLowerCase().indexOf(filterBy)!== -1) : value;
    }

}