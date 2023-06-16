import Login from './components/Login';
import Signup from './components/Signup';
// import WelcomePage from './components/WelcomePage';
import Employee from './components/Employee';
// import Evaluation from './components/Evaluation';
import Profile from './components/Profile';
import PerformanceReview from './components/PerformanceReview';
import ViewReviewComments from './components/ViewReviewComments';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

import React,{useEffect, useState} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate 
} from "react-router-dom";
import Navbar from './components/Navbar';
import axios from 'axios';

function App() {
  const [emplooyeeDetails,setEmplooyeeDetails] = useState("");
  const [allEmplooyeeDetails,setAllEmplooyeeDetails] = useState([]);
  const [reviewComments,setReviewComments] = useState([{reviewFor:'', overallPerformance:'',scopeOfImprovement:'',rating:''}]);
  const [feedbackComments,setFeedbackComments] = useState({feedback:'',performanceId:''});
  const [reviews, setReviews] = useState([]);
  const [feedback, setFeedback] = useState([]);

  // react notification handler 
  const createNotification = (type,message,title) => {
      switch (type) {
        case "info":
          NotificationManager.info(message);
          break;
        case "success":
          NotificationManager.success(message, title,3000);
          break;
        case "warning":
          NotificationManager.warning(message, title, 3000);
          break;
        case "error":
          NotificationManager.error(message, title, 5000)
          break;
      }
    // };
  };

useEffect(()  =>{
  // If accessToken is present then fetch the employee details
  if(localStorage.getItem("accessToken")){
    getEmployeeDetails();
  }

  console.log("Useeffect is triggered!", emplooyeeDetails.isAdmin);

},[]);

useEffect(()=>{
  // only when the user is admin then fetch all the employee details
  if(emplooyeeDetails.isAdmin){
    getAllEmployeeDetails();
  }
  // Fetch the performnce comments for the logged in user
  axios.get("/performance_comments",{
    method:'GET',
    headers:{
      'Authorization' :'Bearer '+localStorage.getItem("accessToken")
    }
  }).then((res)=>{
    console.log(res.data)
    setReviews(res.data);
    console.log("reviews are fetched and it is set");
    getFeedback();
  }) 
  // if(reviews){
  //   getFeedback();
  // }
},[emplooyeeDetails]);

//Fetch the feedback comments on the review present for the user
useEffect(()=>{
  console.log("inside get feedback : ", reviews)
  if(reviews.length===0){
    return ;
  }

  console.log("inside get feedback : ", reviews)
  reviews.forEach((review)=>{
        const performaceId =review._id;
          // console.log()
          console.log("Inside getFeedback request ......",typeof(review),performaceId) ;
          axios.get(`/feedback/${performaceId}`,{
            method:'GET',
            headers:{
              'Authorization':'Bearer '+ localStorage.getItem("accessToken")
            }
          }).then((res)=>{
            // console.log("resposnse received from feedback get call : ", res.status,res.data);
            // setFeedback([res.data]);
            feedback.push(res.data);
            
            console.log("resposnse received from feedback get call : ", res.status,res.data,feedback);
          })
          .catch((error)=>{
            console.log("error occured: ", error.response);
        })
  })
},[reviews]);
// Get details of current logged user
const getEmployeeDetails =async ()=>{
  console.log("Inside fetch request ......");
  await fetch("/profile",{
    method:'GET',
    headers:{
      'Authorization': 'Bearer '+ localStorage.getItem("accessToken")
    }
  }).then(
    
    response => response.json().then(
      data =>{
        console.log("Inside fetch request ......");
        setEmplooyeeDetails(data);
        console.log("cur employee details:", emplooyeeDetails);
        // if(emplooyeeDetails.isAdmin){
        //   getAllEmployeeDetails();
        // }
       
      }

    )
  ).catch(err=>{
    console.log(err);
  })
}
//Get details of all employees
const getAllEmployeeDetails =async ()=>{
  // createNotification('success', 'Added to Cart');
  console.log("Inside getAllEmployeeDetails......");
  await fetch("/employees",{
    method:'GET',
    headers:{
      'Authorization': 'Bearer '+ localStorage.getItem("accessToken")
    }
  }).then(
    
    response => response.json().then(
      data =>{
        console.log("Inside getAllEmployeeDetails ......");
        setAllEmplooyeeDetails(data);
        // console.log(allEmplooyeeDetails);
      }
    )
  ).catch(err=>{
    console.log(err);
  })
}

//Post performace review comments
const addperformanceReviewComments = async() =>{
  console.log("Inside addperformanceReviewComments......");
  axios.post("http://localhost:5000/performance_comments", reviewComments,{
    headers:{
      'Authorization': 'Bearer '+ localStorage.getItem("accessToken")
    }
  }).then(
            (res) =>{
                console.log("response got from signup using axios ", res);
                createNotification('success', 'Review submitted!');
            }
        ).catch((error)=>{
            console.log("error occured: ", error.response);
            createNotification('error', 'Error in submitting review!');
        })
}
//Get the feedback on review
const getFeedback = () =>{
  console.log("inside get feedback : ", reviews)
  if(reviews.length===0){
    return ;
  }

  console.log("inside get feedback : ", reviews)
  reviews.forEach((review)=>{
        const performaceId =review._id;
          // console.log()
          console.log("Inside getFeedback request ......",typeof(review),performaceId) ;
          axios.get(`/feedback/${performaceId}`,{
            method:'GET',
            headers:{
              'Authorization':'Bearer '+ localStorage.getItem("accessToken")
            }
          }).then((res)=>{
            // console.log("resposnse received from feedback get call : ", res.status,res.data);
            // setFeedback([res.data]);
            feedback.push(res.data);
            
            console.log("resposnse received from feedback get call : ", res.status,res.data,feedback);
          })
          .catch((error)=>{
            console.log("error occured: ", error.response);
        })
  })

}
///update all employee details
const updateAllEmployeeDetails =(employeeId,{updatedInfo}) =>{
  console.log("Employee update function:", updatedInfo, employeeId);
  const updatedArray = allEmplooyeeDetails.map((item) => {
    if (item._id === employeeId) {
      console.log("employee ID matched")
      return { ...updatedInfo };
    }
    return item;
  });
  console.log("Employee update function:", updatedArray);
  setAllEmplooyeeDetails(updatedArray);
  // console.log("Employee update function:", allEmplooyeeDetails);
  // navigate('/employees')
}

  return (
    <div className="App">
      <Router>
        <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route exact path="/login" element={<Login getEmployeeDetails={getEmployeeDetails} createNotification={createNotification}  />} />
          <Route path="/" element={<Navbar employee={emplooyeeDetails} setEmplooyeeDetails={setEmplooyeeDetails} />} >
            <Route path="/profile" element={<Profile emplooyeeDetails={emplooyeeDetails}/>} />
            <Route path="/employees" element={<Employee allEmplooyeeDetails={allEmplooyeeDetails} updateAllEmployeeDetails={updateAllEmployeeDetails} getAllEmployeeDetails={getAllEmployeeDetails} reviewComments={reviewComments} setReviewComments={setReviewComments}/>} />
            <Route path="/employees/add_review" element={<PerformanceReview employee={emplooyeeDetails} reviewComments={reviewComments} setReviewComments={setReviewComments} addperformanceReviewComments={addperformanceReviewComments} />} />
            {/* </Route> */}
            <Route path="/employee/review" element={<ViewReviewComments reviews={reviews} feedbackComments={feedbackComments} setFeedbackComments = {setFeedbackComments} feedback={feedback} getFeedback={getFeedback} createNotification={createNotification} />} />
            {/* <Route path="/employee/review" element={<Evaluation/>} /> */}
          </Route>
          
          <Route path="/signup" element={<Signup getEmployeeDetails={getEmployeeDetails}  createNotification={createNotification} />} />
          
          
        </Routes>
      </Router>
     
      <NotificationContainer />
 
    </div>
  );
}

export default App;
