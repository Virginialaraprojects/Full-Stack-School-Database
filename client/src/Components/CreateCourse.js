import React, { useContext, useState, } from 'react';
import Form from './Form';
import { Context } from '../Context';
import { useHistory } from 'react-router-dom';


const CreateCourse =() => {

    const history = useHistory();
    const context = useContext(Context);
    const { authenticatedUser } = context;
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [estimatedTime, setEstimatedTime] = useState('');
    const [materialsNeeded, setMaterialsNeeded] = useState('');
    const [ userId ] = useState(authenticatedUser.id);///
    const [errors, setErrors] = useState([]);

//passes the create course function
const submit =() =>{
    const emailAddress = authenticatedUser.emailAddress;
    const password = authenticatedUser.clientPassword;
    const course = {
        title,
        description,
        estimatedTime,
        materialsNeeded,
        userId
    }
    context.data.createCourse(course, emailAddress, password)
        .then(errors =>{
            if(errors.length){
                setErrors(errors);
            }else{
                console.log('Course created!')
                history.push('/')
            }
        })
}

//stores the user input
const change =(e)=>{
    if(e.target.name ==='courseTitle'){
        setTitle(e.target.value)
    }else if (e.target.name ==='courseDescription'){
        setDescription(e.target.value)
    }else if (e.target.name === 'estimatedTime'){
        setEstimatedTime(e.target.value)
    }else if(e.target.name ==='materialsNeeded'){
        setMaterialsNeeded(e.target.value)
    }
}
//redirects the user back to home route if cancels the course form.
const cancel =()=>{
    history.push('/');
}


//render form to create a course
return (
    <main>
        <div className="wrap">
            <h2>Create Course</h2>
            <Form
                cancel={cancel}
                errors={errors}
                submit={submit}
                submitButtonText ="Create Course"
                elements ={()=>(
                <React.Fragment>
                <div className="main--flex">
                        <div>
                        <label hmtlfor="courseTitle">Course Title</label>
                        <input 
                        id="courseTitle" 
                        name="courseTitle" 
                        type="text" 
                        onChange={change} 
                        value={title}/>

                        <p>By: {authenticatedUser.firstName} {authenticatedUser.lastName}</p>

                        <label htmlFor="courseDescription">Course Description</label>
                        <textarea 
                        id="courseDescription" 
                        name="courseDescription" 
                        type="text" 
                        onChange={change} 
                        value={description}/>
                    </div>
                    <div>
                        <label htmlFor="estimatedTime">Estimated Time</label>
                        <input 
                        id="estimatedTime" 
                        name="estimatedTime"
                        type="text" 
                        onChange={change} 
                        value={estimatedTime}/>

                        <label htmlFor="materialsNeeded">Materials Needed</label>
                        <textarea 
                        id="materialsNeeded" 
                        name="materialsNeeded" 
                        type="text" 
                        onChange={change} 
                        value={materialsNeeded}/>
                    </div>
                </div>
                </React.Fragment>
                )}
                />
        </div>
    </main>
);

};

export default CreateCourse;