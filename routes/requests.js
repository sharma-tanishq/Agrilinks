const express = require('express');
const router = express.Router();
const Report = require('../models/report');
//request validator middleware to to verify request before processing
const requestUser = require('../middleware/requestValidator');


router.post('/reports', requestUser, async (req, res) => {
    let status = "failed";
    try {
        //checking wether cmdtyId,marketId already present or not
        let report = await Report.findOne({ cmdtyID: req.body.reportDetails.cmdtyID, marketID: req.body.reportDetails.marketID });
        //if present
        if (report) {
            //if the user has already sent request of same cmdty before
            if(report.users.includes(req.body.reportDetails.userID)){
                return res.status(400).json({status:status,message:"User has sent request already"})
            }
            try {
                let price=req.body.reportDetails.price/req.body.reportDetails.convFctr;
                price +=report.users.length * report.price;;
                price/=report.users.length+1;
                report.price=price;
                await report.save();
                report.users.push(req.body.reportDetails.userID);
                await report.save();
            } catch (error) {
                console.log(error);
                res.status(500).json({status:status,message:"Unable to create report"})
            }
            status="success";
            res.status(200).json({status:status,reportID:report.id})
        }
        //creating new report
        else {
            try {
                let price=req.body.reportDetails.price/req.body.reportDetails.convFctr;
                report = await Report.create({
                    cmdtyID:req.body.reportDetails.cmdtyID,
                    cmdtyName:req.body.reportDetails.cmdtyName,
                    marketID:req.body.reportDetails.marketID,
                    marketName:req.body.reportDetails.marketName,
                    priceUnit:"Kg",
                    price:price,
                    users:[req.body.reportDetails.userID],
                })
                if(!report){
                    res.status(500).json({status:status,message:"Unable to create report"})
                }
                else{
                    status="success";
                    res.status(200).json({status:status,reportID:report.id})
                }
            } catch (error) {
                console.log(error);
                res.status(500).json({status:status,message:"Unable to create report"})
            }
            
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: status, message: "Internal Server Error" })
    }
})
module.exports = router