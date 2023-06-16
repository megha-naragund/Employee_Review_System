import React from "react";
import Review from "./Review";
// Iterate over all the review comments received by employee and render each review comment along with its feedback information
const ViewReviewComments = ({reviews,feedbackComments, setFeedbackComments,feedback,getFeedback,createNotification}) =>{
    // const reviews = employee.reviews;
    console.log("Reviews received from client:", reviews);
    const NoOfReviews =()=>{
        if(reviews.length === 0){
            return (
                <>No reviews yet!</>
            ) 
        }
        return(
            <div>
                {reviews.map((review)=> {
                    return <Review review = {review} setFeedbackComments={setFeedbackComments} feedbackComments={feedbackComments}  feedback={feedback} getFeedback={getFeedback} createNotification={createNotification} />
                })}
            </div>
        )
    }
    return(
    <div>
        <NoOfReviews />
    </div>
    )
}

export default ViewReviewComments;