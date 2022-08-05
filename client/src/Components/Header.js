import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../Context';


const Header =() =>{
    const { authenticatedUser } = useContext(Context);

//renders the top menu button for signing in, signup and signing out and the user if authenticated
return(
    <header>
            <div className="wrap header--flex">
                <h1 className="header--logo"><Link to="/">Courses</Link></h1>
                <nav>
                {authenticatedUser?
                <React.Fragment>
                    <ul className="header--signedin">
                        <li>
                            Welcome {authenticatedUser.firstName}
                        </li>
                        <li><Link to="/signout">Sign Out</Link></li>
                    </ul>
                </React.Fragment>
                :
                <React.Fragment>
                <ul className="header--signedout">
                        <li><Link to="/signup">Sign Up</Link></li>
                        <li><Link to="/signin">Sign In</Link></li>
                    </ul>
                </React.Fragment>
                }
                </nav>
            </div>
        </header>
)

};

export default Header;