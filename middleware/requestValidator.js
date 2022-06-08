requestValidator=(req,res,next)=>{
    if(!req.body.reportDetails.userID){
        return res.status(400).send("Bad request userID not present")
    }
    else if(!req.body.reportDetails.marketID){
        return res.status(400).send("Bad request marketID not present")
    }
    else if(!req.body.reportDetails.marketName){
        return res.status(400).send("Bad request marketName not present")
    }
    else if(!req.body.reportDetails.cmdtyID){
        return res.status(400).send("Bad request cmdtyID not present")
    }
    else if(!req.body.reportDetails.cmdtyName){
        return res.status(400).send("Bad request cmdtyName not present")
    }
    else if(!req.body.reportDetails.priceUnit){
        return res.status(400).send("Bad request priceUnit not present")
    }
    else if(!req.body.reportDetails.convFctr){
        return res.status(400).send("Bad request Convert factor not present")
    }
    else if(!req.body.reportDetails.price){
        return res.status(400).send("Bad request price not present")
    }
    else{
        next();
    }
}
module.exports=requestValidator