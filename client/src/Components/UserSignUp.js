import React, { useState, useContext } from "react";
import Form from "./Form";
import { Context } from '../Context';
import { useHistory } from "react-router-dom";


const UserSignUp = () => {

    const history = useHistory();
    const context =useContext(Context);
    const[firstName, setFirstName] = useState('');
    const[lastName, setLastName] = useState('');
    const[emailAddress, setEmailAddress] = useState('');
    const[password, setPassword] = useState();
    const[errors, setErrors] = useState([]);

    //Submits info of new user
    const submit =()=>{
        const user ={
            firstName,
            lastName,
            emailAddress,
            password,
        }
        context.data.createUser(user)
        .then (errors =>{
            if(errors.length){
                setErrors(errors);
            }else{
                context.actions.signIn(user.emailAddress, user.password)
                    .then(()=>{history.push('/')
                });
                console.log(`${firstName} is successfully resgistered!`)
            }
        })
        .catch((err) =>{console.log(err);
        })
    }

    //stores the user input
    const change =(e) => {
        if(e.target.name ==='firstName'){
            setFirstName(e.target.value)
        }else if(e.target.name ==='lastName'){
            setLastName(e.target.value)
        }else if(e.target.name === 'emailAddress'){
            setEmailAddress(e.target.value)
        }else if( e.target.name === 'password'){
            setPassword(e.target.value)
        }
    }

     // allows user to cancel and returns to default
     const cancel =()=>{
        history.push('/');
    }
//renders signup page 
return (
    <main>
            <div className="form--centered">
                <h2>Sign Up</h2>
                
                <Form
                    cancel ={cancel}
                    errors ={errors}
                    submit= {submit}
                    submitButtonText = "Sign Up"
                    elements ={()=>(
                    <React.Fragment>
                    <label htmlFor="firstName">First Name</label>
                    <input id="firstName" name="firstName" type="text" onChange ={change} value={firstName}/>
                    <label htmlFor="lastName">Last Name</label>
                    <input id="lastName" name="lastName" type="text" onChange={change} value={lastName}/>
                    <label htmlFor="emailAddress">Email Address</label>
                    <input id="emailAddress" name="emailAddress" type="text" onChange={change} value={emailAddress}/>
                    <label htmlFor="password">Password</label>
                    <input id="password" name="password" type="password" onChange={change} value={password}/>
                    </React.Fragment>
                    )}
                />
                <p>Already have a user account? Click here to <a href="/signin">sign in</a>!</p>
            </div>
        </main>
)

};
export default UserSignUp;