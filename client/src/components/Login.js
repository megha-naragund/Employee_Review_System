import React, { useState } from "react";
import axios from "axios"
import "./styles.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router";


<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"></link>


const Login = ({getEmployeeDetails, createNotification}) =>{
    const [loginInfo,setLoginInfo] = useState({"email":"", "password":"","employeeType":"Employee"});
    const navigate =useNavigate();
    
    //login with user email and credetials handler, it will make API call to validate the user 
    const loginButtonHandler =(e)=>{
        e.preventDefault();
        console.log(loginInfo);
        axios.post("http://localhost:5000/login", loginInfo).then(
            (res) =>{
                console.log("res.status:", res.status)
                //  if res status is success then navigate to dashboard page
                if(res.status === 200){
                    console.log(res.data);
                    localStorage.setItem('accessToken',res.data.accessToken);
                    console.log("Accesstoken is set now: ", localStorage.getItem("accessToken"))
                    if(localStorage.getItem("accessToken")){
                        console.log("Calling func.....")
                        getEmployeeDetails();
                    }
                    // setAccessToken(res.data.accessToken);
                    createNotification('success', 'Logged in successfully');
                    navigate('/profile');
                }
                console.log("response got from login using axios ", res);
            }
        ).catch((error)=>{
            //If error occured while login the user it will throw error
            createNotification('error', 'username or password is invalid');
            console.log("error occured: ", error.response);
        })

    }
    return(
        <div  className=" d-flex justify-content-center align-items-center vh-100 "  style={{width:'100%', height:'100%'}}>
            
            <div className="border " style={{ width:'50rem', display:'flex' ,justifyContent:'center', alignItems:'center', padding:'10px'}}>
                <div className=" d-flex justify-content-left   " style={{width:'50%'}}>
                    <img src="https://thumbs.dreamstime.com/b/human-resources-hr-management-recruitment-employment-headhunting-concept-human-resources-hr-management-recruitment-employment-105427841.jpg" 
                        width='100%' />
                </div>
                <div style={{width:'40%', margin:'5%'}}>
                    <form>
                        <div className="" >
                        <h4 className="text-align-center">Sign In</h4>
                                    <label>Email</label>
                                    <input type='text' className="form-control" placeholder="Email" onChange={(e)=>{
                                        setLoginInfo({...loginInfo, email:e.target.value})
                                        console.log(loginInfo); } } /> 
                        </div>
                        <div className="form">
                                        <label>Password</label>
                                        <input type='password' className="form-control" placeholder="Password"
                                            onChange={(e)=>{
                                                    setLoginInfo({...loginInfo, password:e.target.value})
                                                    console.log(loginInfo); 
                                                } } /> 
                        </div>  
                        <br/>
                                    
                        <button type="submit" className="btn btn-primary" onClick={loginButtonHandler}>Log In</button>
                        <div>Don't have a account?</div>
                        <button type="submit" className="btn btn-primary" onClick={()=> navigate('/signup')}>Sign Up</button>
                    </form>
                </div>
                   
            </div>
        </div>
    )
}

export default Login;
