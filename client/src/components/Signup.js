import React, { useState } from "react";
import axios from "axios"
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router";
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"></link>

// SIgnup new Employee
const Signup = ({getEmployeeDetails, createNotification}) =>{
    const [signUpInfo,setSignUpInfo] = useState({"firstName":"","lastName":"", "email":"", "department":"","password":"","confirmPassword":"","employeeType":"Employee"});
    const navigate =useNavigate();
    //Sign up the employee details and make a api call to create employee account once all the conditions are satisfied
    const loginButtonHandler =(e)=>{
        e.preventDefault();
        console.log(signUpInfo);
        axios.post("http://localhost:5000/signup", signUpInfo).then(
            (res) =>{
                console.log("response got from signup using axios ", res);
                localStorage.setItem('accessToken',res.data);
                    console.log("Accesstoken is set now: ", localStorage.getItem("accessToken"))
                    if(localStorage.getItem("accessToken")){
                        console.log("Calling func.....")
                        getEmployeeDetails();
                        createNotification('success', 'Signed up successfully');
                        navigate('/login');
                    }
                    console.log(res.Error   )
            }
        ).catch((error)=>{
            const err=  JSON.stringify(error.response.data);
            // createNotification('success',{message:'Error all fields are mandatory'} );
            if(err == JSON.stringify("All fields are mandatory") ){
                console.log("inside")
                createNotification('error', 'All fields are mandatory');
            }
            if(err ==  JSON.stringify("Confirm password doesnot match!") ){
                createNotification('error', 'Confirm password doesnot match!');
            }
            if(err===  JSON.stringify("Email already exists") ){
                createNotification('error', 'Email already exists!');
            }
            console.log("error occured: ", err);
            
        })

    }
    return(
        <div  className="container " style={{margin:'5rem'}} >
             <div  className="row  "   >
                <div className="col-sm-9 col-md-7 col-lg-7 mx-auto">
                    <img src="https://blog.vantagecircle.com/content/images/2021/01/Employee-Management-Meaning-Importance-Tips-Tools---More.png"
                         className="border rounded"
                         style={{height: "100%", width:"100%"}} />
                </div>
                {/* backgroundImage:"url(https://thumbs.dreamstime.com/b/human-resources-hr-management-recruitment-employment-headhunting-concept-human-resources-hr-management-recruitment-employment-105427841.jpg)", height:"100%" */}
                
               
                    <div className="  h-100  col-sm-9 col-md-7 col-lg-5 mx-auto border rounded "  >
                        <h1>Logo</h1>
                        <h4 className="card-title text-center mb-5 fw-light fs-5">Sign Up</h4>
                        <form className="flex">
                            <div className="form-group">
                                    <label>First Name</label>
                                    <input type='text' className="form-control" placeholder="First Name" onChange={(e)=>{
                                        setSignUpInfo({...signUpInfo, firstName:e.target.value})
                                        console.log(signUpInfo); } } /> 
                            </div>  
                            <div className="form-group">
                                <label>Last Name</label>
                                <input type='text' className="form-control" placeholder="Last Name" onChange={(e)=>{
                                    setSignUpInfo({...signUpInfo, lastName:e.target.value})
                                    console.log(signUpInfo); } } /> 
                            </div>  
                            <div className="form-group">
                                <label>Email</label>
                                <input type='text' className="form-control" placeholder="Email" onChange={(e)=>{
                                    setSignUpInfo({...signUpInfo, email:e.target.value})
                                    console.log(signUpInfo); } } /> 
                            </div>  
                            <div>
                                <label>
                                Department
                                <br/>
                                <select  onChange={(e) =>{
                                    setSignUpInfo({...signUpInfo,department:e.target.value});
                                    console.log(signUpInfo); 
                                }} > 
                                    <option value="HR">HR</option>
                                    <option value="IT">IT</option>
                                    <option value="Sales">Sales</option>
                                    <option value="Production">Production</option>
                                    <option value="Marketing">Marketing</option>
                                </select>
                                </label>
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input type='password' className="form-control" placeholder="Password"
                                       onChange={(e)=>{
                                            setSignUpInfo({...signUpInfo, password:e.target.value})
                                            console.log(signUpInfo); 
                                        } } /> 
                            </div>  
                            <div className="form-group">
                                <label>Confirm Password</label>
                                <input type='password' className="form-control" placeholder="Confirm Password"
                                       onChange={(e)=>{
                                            setSignUpInfo({...signUpInfo, confirmPassword:e.target.value})
                                            console.log(signUpInfo); 
                                        } } /> 
                            </div>  
                            <br/>
                            
                            <button type="submit" className="btn btn-primary" onClick={loginButtonHandler}>Sign Up</button>
                            
                        </form>
                    </div>
            </div>
        </div>
            )
}

export default Signup;