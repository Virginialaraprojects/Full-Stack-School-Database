import config from "./config";

class Data {

    api(path, method = 'GET', body=null, requiresAuth =false, credentials= null){
            const url = config.apiBaseUrl + path;
            
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
             const encodedCredentials = btoa(`${credentials.emailAddress}: ${credentials.password}`);
                options.headers['Authorization'] = `Basic ${encodedCredentials}`;
            }
            return fetch(url,options)
        }

        //create a get User
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
            //create the create user function
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
            //create the get all courses
            async fetchCourses(){
                const response = await this.api('/courses','GET', null);
                if(response.status === 200){
                    return response.json().then(data => data);
                }else if(response.status === 401){
                    console.log(`Something went wrong:${response.status} error`)
                }else {
                    throw new Error ();
                }
            }
            // create a course detail 
            async fetchCourse(id){
                const response= await this.api(`/courses/$ {id}`,'GET', null);
                if (response.status === 200){
                    return response.json().then(data=>data);
                }else if (response.status ===401){
                    console.log(`Something went wrong: ${response.status} error`)
                }else{
                    throw new Error();
                }
            }
            //create  a create course
            async createCourse(course, emailAddress, password){
                const response = await this.api('/courses', 'POST',course,true, {emailAddress, password});
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
export default Data;