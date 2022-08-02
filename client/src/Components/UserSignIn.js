import React, { useState } from "react";


const UserSignIn = () =>{

const [emailAddress, setEmailAddress] = useState('');
const [password, setPassword] = useState('');
const [errors, setErrors] = useState([]);



return(
        <main>
        <div className="form--centered">
            <h2>Sign In</h2>
            
            <form>
                <label for="emailAddress">Email Address</label>
                <input id="emailAddress" name="emailAddress" type="email" value="">
                <label for="password">Password</label>
                <input id="password" name="password" type="password" value="">
                <button class="button" type="submit">Sign In</button><button class="button button-secondary" onclick="event.preventDefault(); location.href='index.html';">Cancel</button>
            </form>
            <p>Don't have a user account? Click here to <a href="sign-up.html">sign up</a>!</p>
            
        </div>
    </main>

)

};
export default UserSignIn;