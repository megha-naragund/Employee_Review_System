exports.errorHandler = (err,req,res,next)=>{
    const statusCode = req.statusCode || 500;
    switch(statusCode){
        case 400: res.json({
            title: "All fileds are mandatory!",
            message : err.message,
            stackTrace: err.stack
        })
        case 401: res.json({
            title: "You are not authorized!",
            message : err.message,
            stackTrace: err.stack
        })
        case 404: res.json({
            title: "Page not found!",
            message : err.message,
            stackTrace: err.stack
        })
        case 500: res.json({
            title: "Unknow error!",
            message : err.message,
            stackTrace: err.stack
        })
    }
}