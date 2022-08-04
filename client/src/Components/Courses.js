import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../Context';


const Courses = () => {
    const context = useContext(Context);
    const[courses, setCourses] = useState([]);


    //fetches the courses from the database 
    useEffect( ()=>{
        context.data.fetchCourses()
            .then(courses => setCourses(courses))
    },[context.data]); //update everytime data changes

    //renders the courselist & create course screen
    return(
        <main>
        <div className="wrap main--grid">
            {courses.map((course)=>(
                <a className="course--module course--link" key = {course.id} href={`/courses/${course.id}`}>
                    <h2 className="course--label">Course</h2>
                    <h3 className="course--title">{course.title}</h3>
                </a>
            ))}

            <a className="course--module course--add--module" href="/courses/create">
                    <span className="course--add--title">
                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                        viewBox="0 0 13 13" className="add"><polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon></svg>
                        New Course
                    </span>
                </a>
        </div>
    </main>
    );
};

export default Courses;