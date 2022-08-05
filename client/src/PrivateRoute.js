import React from 'react';
import{ Route, Redirect} from 'react-router-dom';
import { Consumer } from './Context';
//function destructures and renames the component props in it parameters.
const PrivateRoute =({component: Component, ...rest})=>{
    return(
        <Consumer>
            { context =>(
                <Route {...rest} 
                render={props =>context.authenticatedUser ?(//check with ther user is authenticated or not
                    <Component {...props}/>
                      ):(
                        <Redirect to='/signin' />// if not takes you to sigin page
                  )
                }
            />
            )}
        </Consumer>
    );

};

export default PrivateRoute;