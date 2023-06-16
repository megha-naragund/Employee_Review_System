import React from 'react';
import { useNavigate } from "react-router";
import 'bootstrap-icons/font/bootstrap-icons.css'
// Home page where logged in employee details will be displayed
const Employee = ({emplooyeeDetails})=>{
    const navigate = useNavigate();
    console.log("From profile page :", emplooyeeDetails)
    return(
            <div>{ (emplooyeeDetails === undefined || emplooyeeDetails === null || emplooyeeDetails=="")? navigate('/login'):
              <div class="card-group">
                <div class="card m-2" style={{width: 'auto', height: 'auto', padding: '50px', border:" 3px solid grey"}}>
                    <i class="bi bi-person-circle" style={{fontSize: "5rem"}} ></i>
                    <div class="card-body">
                    <h4 class="card-title">Name: {emplooyeeDetails.firstName} {emplooyeeDetails.lastName}</h4>
                    <h3 class="card-text">Overview: </h3>
                    <h4 class="card-text">Employee Type: {emplooyeeDetails.isAdmin ? "Admin" : "Employee"} </h4>
                    <h4 class="card-text">Department: {emplooyeeDetails.department} </h4>
                    <h4 class="card-text">JoiningDate: {emplooyeeDetails.joiningDate} </h4>
                    <h3 class="card-text">Contact </h3>
                    <h4 class="card-text">Email: {emplooyeeDetails.email} </h4>
                    </div>
                </div>
                
             </div>}
        </div>


           
    )
        
}

export default Employee;