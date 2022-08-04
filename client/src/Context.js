import React, { Component } from 'react';
import Cookies from 'js-cookie';
import Data from "./Data";// import the data file with the helper class

export const Context = React.createContext();

//creat and export Provider component
export class Provider extends Component{

    state ={
        authenticatedUser: null,
        password: null,
    }

    constructor() {
        super();
        this.data =new Data();// intialize a new instance of Data class and assign a property 
        this.cookie = Cookies.get('authenticatedUser');
        this.state ={
            authenticatedUser :this.cookie ? JSON.parse(this.cookie) : null
        };
    }
    render(){
        const { authenticatedUser } =this.state;

        const value ={
            authenticatedUser,
            data:this.data,
            actions:{
                signIn: this.signIn,
                signOut:this.signOut
            }
        }
        return(
            <Context.Provider value ={value}>
                {this.props.children}
            </Context.Provider>
        );
    }
    //Signs in Valid user
        signIn =async (emailAddress, password) =>{
            const user = await this.data.getUser(emailAddress, password);
            const clientPassword = password;
            if(user !== null){
                user.clientPassword =clientPassword;
                this.setState(()=>{
                    return{
                        authenticatedUser: user,
                    };
                });
                Cookies.set('authenticatedUser',JSON.stringify(user),{expires:1})
            }
            return user;
        }
        //signout and removes cookies
        signOut= ()=>{
            this.setState({ authenticatedUser: null});
            Cookies.remove('authenticatedUser');
        }
    }
export const Consumer =Context.Consumer;

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */
export default function withContext(Component){
    return function ContextComponent(props){
        return(
            <Context.Consumer>
                {context => <Component {...props} context={context}/>}
            </Context.Consumer>
        );
    }
}

