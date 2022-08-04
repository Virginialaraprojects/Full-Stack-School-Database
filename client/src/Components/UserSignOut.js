import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom'

//signs out the authenticated user and redirects to default.
const UserSignOut = ({context}) => {
    useEffect(()=> 
    context.actions.signOut()
    );

    return(
        <Redirect to='/' />
    );
};
export default UserSignOut;