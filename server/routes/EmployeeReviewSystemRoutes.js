const express = require("express");
const router = express.Router();


const feedbackController = require("../controllers/feedbackController");
const performanceController = require("../controllers/performanceController");
const employeeController = require("../controllers/employeeController");
const adminController = require("../controllers/adminController");
const validateToken = require("../middleware/validateToken");

//employee registration
 router.route('/signup').post (employeeController.register);
 router.route('/profile').get (validateToken, employeeController.emplooyeeDetails); // secure route
 router.route('/employees').get (validateToken, adminController.allEmployeeDetails); // secure route

 //make admin 
 router.route('/make_admin').post (validateToken, adminController.makeAdmin); // secure route
//delete employee
router.route('/delete_employee').post (validateToken, adminController.deleteEmployee); // secure route
 //Employee and admin login
 router.route('/login').post (employeeController.login);


 router.route('/performance_comments').post (validateToken, adminController.performaceComments); // secure route
 router.route('/performance_comments').get (validateToken, performanceController.reviews); // secure route


/// get and set feedback 
 router.route('/feedback').post (validateToken, feedbackController.setFeedback); // secure route
 router.route('/feedback/:performaceId').get  (validateToken, feedbackController.getFeedback); // secure route

module.exports = router;