const express = require('express');
const router = express.Router();
const Report = require('../models/report');
const mongoose=require('mongoose');

//request validator middleware to to verify request before processing
const requestValidator = require('../middleware/requestValidator');


router.post('/reports', requestValidator, async (req, res) => {
    let status = "failed";
    const currentDate = new Date();
    try {
        //checking wether cmdtyId,marketId already present or not
        let report = await Report.findOne({ cmdtyID: req.body.reportDetails.cmdtyID, marketID: req.body.reportDetails.marketID });
        //if present
        if (report) {
            //if the user has already sent request of same cmdty before
            if (report.users.includes(req.body.reportDetails.userID)) {
                return res.status(400).json({ status: status, message: "User has sent request already" })
            }
            try {
                report.timestamp = currentDate.getTime();
                await report.save();

                let price = req.body.reportDetails.price / req.body.reportDetails.convFctr;
                price += report.users.length * report.price;;
                price /= report.users.length + 1;
                report.price = price;
                await report.save();

                report.users.push(req.body.reportDetails.userID);
                await report.save();

            } catch (error) {
                console.log(error);
                res.status(500).json({ status: status, message: "Unable to create report" })
            }
            status = "success";
            return res.status(200).json({ status: status, reportID: report.id })
        }
        //creating new report
        else {
            try {
                let price = req.body.reportDetails.price / req.body.reportDetails.convFctr;
                report = await Report.create({
                    cmdtyID: req.body.reportDetails.cmdtyID,
                    cmdtyName: req.body.reportDetails.cmdtyName,
                    marketID: req.body.reportDetails.marketID,
                    marketName: req.body.reportDetails.marketName,
                    priceUnit: "Kg",
                    price: price,
                    users: [req.body.reportDetails.userID],
                    timestamp: currentDate.getTime(),
                })
                if (!report) {
                    return res.status(500).json({ status: status, message: "Unable to create report" })
                }
                else {
                    status = "success";
                    return res.status(200).json({ status: status, reportID: report.id })
                }
            } catch (error) {
                console.log(error);
                return res.status(500).json({ status: status, message: "Unable to create report" })
            }

        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: status, message: "Internal Server Error" })
    }
})

router.get('/reports', async (req, res) => {
    try {

        let reportID=req.query.reportID.toString().replace(/\n/g, '')

        if(!mongoose.isValidObjectId(reportID)){
            return res.status(400).send("Bad Request");
        }

        let report=await Report.findById(reportID);
        if(!report){

            return res.status(404).send("Report Not found");
        }
        else{
            return res.status(200).json(report);
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
})
module.exports = router