import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";
// Displaying all the review comments that employee has received from other users
const Review = ({review,setFeedbackComments,feedbackComments,feedback,getFeedback,createNotification}) =>{
    const navigate =useNavigate();
    const [comments,setComments] = useState("");
    console.log("from reviews feedback content :", feedback);
    console.log("Reviews", review);
    const setFeedbackCommentsFunction =() =>{
        console.log("setFeedbackCommentsFunction ", comments,review._id);
        setFeedbackComments({feedback: comments, performanceId: review._id})
    }
    // Submit Feedback handler where employee can submit the feedback on reviews received
    const onSubmitFeedBack =()=>{
        console.log("from reviews onSubmitFeedBack content :", {feedback: comments, performanceId: review._id});
        axios.post("/feedback", {feedback: comments, performanceId: review._id},{
            method: 'POST',
            headers:{
                'Authorization': 'Bearer '+ localStorage.getItem("accessToken")
            }
        }).then(res=>{ console.log("Response recived after submitting the feedback: ", res.status,res.data );
    
        // getFeedback()
        window.location.reload();
        navigate('/employee/review');
        createNotification('success', 'Feedback submitted!');
     });

    }
    // Rendering the feedback if its already submitted
    console.log("Feedback from review page",feedback, review._id);
    const isFeedBack =  feedback.find((item) => {
        console.log("Validating the render feedback: ", item, review._id)
        if(item.performanceId === review._id){
            return item;
        }
    })
    console.log("isFeedBack ",isFeedBack);
    return(
        <div style={{ display:'block', height: '45rem'}}>
            <div style={{width: '50%', height: '25rem'}} > 
                <h2>Review:</h2>
                <div className="  m-2" style={{ padding: '50px', border:" 3px solid grey"}}>
                    {/* <h3>Review by :</h3>
                    <h5  >{review.reviewBy}</h5> */}
                    <h3>Overall Performance:</h3>
                    <h5  >{review.overallPerformance}</h5>
                    <h3>Scope for Improvement:</h3>
                    <h5>{review.scopeOfImprovement}</h5>
                    <h3>Rating: </h3>
                    <h5>{review.rating}</h5>
                </div>
            </div>
            <div style={{ width: '50%', height: '10rem', float:'right',}}>
                <h2>Your Feedback:</h2>
                { !isFeedBack? 
                    <div className="  m-2" style={{padding: '10px', border:" 3px solid grey"}}>
                        <textarea value={comments} onChange={(e)=> setComments(e.target.value)} style={{width:'50%', height:'8rem'}}>
                        </textarea>
                        <br/>
                        <br/>
                        <button type='submit' className="btn btn-dark" onClick={()=>{
                            // setFeedbackComments({});
                            console.log("comments on change: ", comments)
                            setFeedbackCommentsFunction();
                            onSubmitFeedBack();
                            setComments("");
                            
                            }}>Submit FeedBack</button>
                    </div> :
                    <div className="  m-2" style={{ width:'50%', height: 'auto', padding: '10px', border:" 3px solid grey"}}>
                            <p>  {isFeedBack.feedback} </p>
                    </div>}
            </div>
        </div>
    )
}

export default Review;