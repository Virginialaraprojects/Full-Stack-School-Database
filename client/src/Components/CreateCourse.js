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
    const [ userId ] = useState(authenticatedUser.user.id);
    const [errors, setErrors] = useState([]);

//passes the create course function
const submit =() =>{
    const emailAddress = authenticatedUser.user.emailAddress;
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
    if(e.target.name ==='title'){
        setTitle(e.target.value)
    }else if (e.target.name ==='description'){
        setDescription(e.target.value)
    }else if (e.target.name === 'estimatedTime'){
        setEstimatedTime(e.target.value)
    }else if(e.target.name ==='materialsNeeded'){
        setMaterialsNeeded(e.target.value)
    }
}
//allows user to cancel and return to default
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
                submitButtonText =" Create Course"
                elements ={()=>(
                <React.Fragment>
                <div class="main--flex">
                        <div>
                        <label hmtlFor="courseTitle">Course Title</label>
                        <input id="courseTitle" name="courseTitle" type="text" onChange={change} value={title}/>

                        <p>By: {authenticatedUser.user.firstName} {authenticatedUser.user.lastName}</p>

                        <label htmlFor="courseDescription">Course Description</label>
                        <textarea id="courseDescription" name="courseDescription" type="text" onChange={change} value={description}></textarea>
                    </div>
                    <div>
                        <label htmlFor="estimatedTime">Estimated Time</label>
                        <input id="estimatedTime" name="estimatedTime" type="text" onChange={change} value={estimatedTime}/>

                        <label htmlFor="materialsNeeded">Materials Needed</label>
                        <textarea id="materialsNeeded" name="materialsNeeded" type="text" onChange={change} value={materialsNeeded}/>
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