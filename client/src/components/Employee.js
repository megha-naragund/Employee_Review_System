import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'
import EmployeeList from './EmployeeList';
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"></link>
// All the employee details list display when the logged in user is 'Admin'
const Employee = ({allEmplooyeeDetails, reviewComments,getAllEmployeeDetails, updateAllEmployeeDetails, setReviewComments})=>{
    console.log("all employee details: ", allEmplooyeeDetails);
    return(
        // header of Employee List
       <div>
        <div class='container'> 
        <div class='row'>
            <div class='col-3  d-flex align-items-center justify-content-center'> 
                <div class='row'>
                   <h2>Name</h2>
                </div>
            </div>       
            <div class='col-2  d-flex align-items-center justify-content-center' >
                <h2>Department</h2>
            </div>
            <div class='col-2  d-flex align-items-center justify-content-center'>
                <h2>Contact</h2>
            </div>
            <div class='col-3  d-flex align-items-center justify-content-center'>
                <h2>Employee Type</h2>
            </div>
            <div class="col-2  d-flex align-items-center justify-content-center">
                <h2>Actions</h2>
            </div>
         </div>
      </div>
        <div>
            {/* Iterating over all the employee details and rendering each Employee detail */}
          {allEmplooyeeDetails.length ===0 ?<>Loading...</>: <>  {allEmplooyeeDetails.map((employeeDetails)=>{
                return <EmployeeList employeeDetails={employeeDetails} getAllEmployeeDetails={getAllEmployeeDetails} updateAllEmployeeDetails={updateAllEmployeeDetails} setReviewComments={setReviewComments} reviewComments={reviewComments} />
            })} </> }

        </div>
      </div>
    )
        
}

export default Employee;