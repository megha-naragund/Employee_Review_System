import React,{useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'
import Dropdown from 'react-bootstrap/Dropdown';


import { useNavigate } from "react-router";
import axios from 'axios';
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"></link>

const EmployeeList = ({employeeDetails, allEmplooyeeDetails, updateAllEmployeeDetails, getAllEmployeeDetails,reviewComments,setReviewComments})=>{
    const navigate =useNavigate();
    const employeeId = employeeDetails._id;
    // Make the employee as Admin handler will make api call to make the employee as Admin
    const makeAdminHandler =async ()=>{
        console.log("Make admin handler called");
        axios.post("/make_admin", {employeeId},{
            method: 'POST',
            headers:{
                'Authorization': 'Bearer '+ localStorage.getItem("accessToken")
            }
        }).then((res)=> {
            console.log("Response recived after submitting the makeadmin: ", res.status,res.data);
            const updatedInfo = res.data;
            updateAllEmployeeDetails(employeeId,{updatedInfo});
            
        }).then((res)=>console.log("All employees details after updating", allEmplooyeeDetails));
    }
    // Delete the employee from the database handler, it will make api call to remove employee
    const deleteEmployee =async ()=>{
        console.log("Delete handler called");
        axios.post("/delete_employee", {employeeId},{
            method: 'POST',
            headers:{
                'Authorization': 'Bearer '+ localStorage.getItem("accessToken")
            }
        }).then((res)=> {
            console.log("Response recived after submitting the makeadmin: ", res.status,res.data);
            const updatedInfo = res.data;
            getAllEmployeeDetails();
        }).then((res)=>console.log("All employees details after updating", allEmplooyeeDetails))
        .catch((err)=> console.log(err));
    }
    return(
        // Render each Employee details
        <div className="container m-2" style={{width: 'auto', height: 'auto', padding: '10px', border:" 2px solid grey" ,borderRadius:"10px"}}> 
        <div className='row'>
            <div className='col-3'> 
                <div className='row'>
                    <div className='col-1'>
                        <i className="bi bi-person-circle" style={{fontSize: "2rem"}} ></i>
                    </div>
                    <div className='col  d-flex align-items-center justify-content-center' >
                        <h4> {employeeDetails.firstName} {employeeDetails.lastName} </h4>
                    </div>
                    
                </div>
            </div>
           
            <div className='col-2  d-flex align-items-center justify-content-center'>
               
                <h6 class=' align-middle'> {employeeDetails.department} </h6>
                
                {/* <h6 class=' align-middle'> {employeeDetails.isAdmin}</h6> */}
            </div>
            <div className='col-2  d-flex align-items-center justify-content-center'>
               
                <h6> {employeeDetails.email}</h6>
                
                
            </div>
            <div className='col-3  d-flex align-items-center justify-content-center'>
               
                <h6> {employeeDetails.isAdmin?'Admin':'Employee'}</h6>
                
                
            </div>
            <div className="col  d-flex align-items-center justify-content-center">
                {/* action buttons */}
            <Dropdown >
                <Dropdown.Toggle variant="link" id="dropdown-basic" style={{color:'black'}} class='hidden-arrow btn-dark bg-dark dropdown-toggle btn  btn-floating '>
                    <i class="bi bi-three-dots-vertical "></i>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    {!employeeDetails.isAdmin?<Dropdown.Item 
                        onClick={()=>{makeAdminHandler();
                            }} >
                            Make as Admin
                    </Dropdown.Item>:<></>}
                    <Dropdown.Item 
                        onClick={()=>{ 
                            setReviewComments({...reviewComments,reviewFor:employeeDetails._id});  
                            navigate('/employees/add_review');}}  >Add Review comments 
                    </Dropdown.Item>
                    <Dropdown.Item  onClick={()=>{deleteEmployee();} }>Remove Employee </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
             </div> 
            </div>
         </div>
    //   </div>
    )
        
}

export default EmployeeList;