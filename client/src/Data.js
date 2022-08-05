import config from "./config";
//helper class that provides utility methods to allow React client to talk to  api(express server)
export default class Data {
//method use to get  and post  request to the rest api
    api(path, method = 'GET', body=null, requiresAuth =false, credentials = null){
        //the url constants configures the request path based on url define in the config.js
            const url = config.apiBaseUrl + path;
        //send the request to HTTP method and to the request header &stringfies the body to a json string.    
            const options ={
                method,
                headers:{
                    "Content-Type": "application/json; charset=utf-8",
                },
            };


            if(body !== null){
                options.body = JSON.stringify(body);
            }


            //requiresAuth
            if(requiresAuth){
             const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);
                options.headers['Authorization'] = `Basic ${encodedCredentials}`;
            }
            //fetch return the new url  with the diffrent setting apply to the request (options)
            return fetch(url,options)
        }

        //"GET" a User
        //makes a GET requests to the user end point and returns a json object with user credentials
            async getUser(emailAddress, password){
                const response= await this.api('/users','GET', null, true,{emailAddress,password});
                //if the response is ok
            if(response.status === 200){
                return response.json().then(data=>data);
            }else if (response.status === 401){
                return null;
            }else{
                throw new Error();
            }
          }
            //create user function
            // makes a POST requests sending new user data to the user endpoint 
            async createUser(user){
                const response = await this.api('/users','POST',user);
                if(response.status === 201){
                    return[];
                }else if (response.status === 400){
                    return response.json().then(data=>{
                        return data.errors
                    });
                }else{
                    throw new Error();
                }
            }
            //'GET' all courses
            //makes a GET requests to the courses endpoint and returns a json object
            async fetchCourses(){
                const response = await this.api('/courses','GET', null);
                if(response.status === 200){
                    return response.json().then(data => data);
                }else if(response.status === 401){
                    //return null;
                    console.log(`Something went wrong:${response.status} error`)
                }else {
                    throw new Error();
                }
            }
            // 'GET' a course
            // makes a GET requests to the course endpoint and returns a json object
            async fetchCourse(id){
                const response= await this.api(`/courses/${id}`,'GET', null);
                if (response.status === 200){
                    return response.json().then(data=>data);
                }else if (response.status ===401){
                    console.log(`Something went wrong: ${response.status} error`)
                }else{
                    throw new Error();
                }
            }
            //create course function
            // makes a POST requests sending new course data to the courses endpoint 
            async createCourse(course, emailAddress, password){
                const response = await this.api(`/courses`, 'POST',course, true, {emailAddress, password});
                if (response.status === 201){
                    return[];
                }else if(response.status === 400){
                    return response.json().then(data=>{
                        return data.errors;
                    })
                }else{
                    throw new Error();
                }
            }

            //update a course 
            //makes a 'PUT' request to UPDATE (edit) a course 
           async updateCourse(course,id, emailAddress, password){
                const response = await this.api(`/courses/${id}`,'PUT',course,true,{emailAddress,password});
                if (response.status === 204){
                    return[];
                }else if(response.status === 400){
                    return response.json().then(data=>{ 
                        return data.errors;
                    });
                }else{
                    throw new Error();
                }
            }

            //delete a course
            //make a 'DELETE" request to delete a course
            async deleteCourse(id,emailAddress,password){
                const response = await this.api(`/courses/${id}`,'DELETE', null,true,{emailAddress, password});
                if (response.status === 204){
                    return[];
                }else if (response.status === 403){
                    return response.json().then(data =>{
                        return data.errors;
                    })
                }else{
                    throw new Error ();
                }
            }

};
