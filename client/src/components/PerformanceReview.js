import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"></link>
// Performance review comments page, on submit of review comments it will make API call to update the comments in the DB
const PerformanceReview = ({employee,reviewComments,setReviewComments,addperformanceReviewComments})=>{
  console.log(employee);
   return(
    <>
        <h4 style={{margin:'5px'}}>Performance Review</h4>
    
      <div className='form col-6 border rounded' style={{margin:'1rem', alignSelf:'center', padding:'10px'}} >
        <div className='form-group'> 
            <label>Review For:</label>
            <h5>{employee.firstName}</h5>
        </div>
        <div className='form-group'> 
            <label>Department:</label>
            <h5>{employee.department}</h5>
        </div>
        <div className='form-group'> 
            <label>Overall Performance:</label>
            <br/>
            <textarea value={reviewComments.overallPerformance} style={{width:'50%'}} onChange={(e)=>{
                setReviewComments({...reviewComments, overallPerformance:e.target.value})
            }}></textarea>
        </div>
        <div>
            <label>Scope for Improvement:</label>
            <br/>
            <textarea value={reviewComments.scopeOfImprovement} style={{width:'50%'}} onChange={(e)=>{
                setReviewComments({...reviewComments, scopeOfImprovement:e.target.value})
            }}></textarea>
        </div>
        <br/>
        <label>Rating : {" "} </label>
        {/* <br/> */} 
        <select  
            //  onChange={(e) =>{
            //     setSignUpInfo({...signUpInfo,department:e.target.value});
            //     console.log(signUpInfo); 
            // }} 
            className='bg-dark' style={{color:'white'}}
            value={reviewComments.rating}  onChange={(e)=>{
                setReviewComments({...reviewComments, rating:e.target.value})
            }}
            > 
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
        </select>
        <br/>
        <br/>
        {/* <label>/label> */}
        <p>Note : 1 being lowest and 5 being highest</p>
        <button type="submit" className="btn btn-dark" onClick={addperformanceReviewComments}>Submit</button>
      </div>
      </>
   )
}

export default PerformanceReview;