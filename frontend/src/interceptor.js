import axios from 'axios';

export default function setupInterceptors(){

    axios.interceptors.response.use(response => {            
        return response;
    }, error => {
     
        if(error.response.message) {
            return Promise.reject(error);
        }
    

        if(error.request.status === 401 || error.request.status === 403) {
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            window.location.href = "/login";
        }

        
        return Promise.reject(error);
    });

    axios.interceptors.request.use(
        (config) => {
            console.log('intercepting request');
            const token = localStorage.getItem('token');
            if ( token != null ) {
                config.headers.Authorization = 'Bearer ' + token;
            }

            const user = localStorage.getItem('user');
            if (!user) {
               
                config.data = {
                    ...config.data,
                    usernameHelper: user.username
                };
            }

            return config;
        }, 
        (err) => {
            console.log("USAO ovdje");
            return Promise.reject(err);
        }
    );
} 
