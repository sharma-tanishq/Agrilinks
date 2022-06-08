# Steps to setup Locally
Clone the Repository: `git clone "url of this repo"`
Install MongoDB (if not installed)
Run MongoDB server
Change the `mongooseURI` in `connectDB.js` according to your local mongo server

## Test Cases :
POST request at `http://localhost:5000/api/reports`:  
Request 1 :  
{  
  "reportDetails": {  
    "userID": "user-1",  
    "marketID": "market-1",  
    "marketName": "Vashi Navi Mumbai",  
    "cmdtyID": "cmdty-1",  
    "marketType": "Mandi",  
    "cmdtyName": "Potato",  
    "priceUnit": "Pack",  
    "convFctr": 50,  
    "price": 700  
  }  
}  
Response:  
{  
    "status": "success",  
    "reportID": "62a0f17e8a57dc9246018c3f"  
}  

Request 2:  
{   
    "reportDetails": {  
      "userID": "user-2",  
      "marketID": "market-1",  
      "marketName": "Vashi Navi Mumbai",  
      "cmdtyID": "cmdty-1",  
      "cmdtyName": "Potato",  
      "priceUnit": "Quintal",  
      "convFctr": 100,  
      "price": 1600  
    }  
}  
Response:  
{
    "status": "success",  
    "reportID": "62a0f17e8a57dc9246018c3f"  
}  


Request 3(same as Request 1  i..e the userId is already present in the report that is being reffered):  
{  
  "reportDetails": {  
    "userID": "user-1",  
    "marketID": "market-1",  
    "marketName": "Vashi Navi Mumbai",  
    "cmdtyID": "cmdty-1",  
    "marketType": "Mandi",  
    "cmdtyName": "Potato",  
    "priceUnit": "Pack",  
    "convFctr": 50,  
    "price": 700  
  }  
}  

Response:  
{  
    "status": "failed",  
    "message": "User has sent request already"  
}  

Request 4 (If the request does not contain all values here does not contain userID):  
{  
  "reportDetails": {  
    "marketID": "market-1",  
    "marketName": "Vashi Navi Mumbai",  
    "cmdtyID": "cmdty-1",  
    "marketType": "Mandi",  
    "cmdtyName": "Potato",  
    "priceUnit": "Pack",  
    "convFctr": 50,  
    "price": 700  
  }  
}  

Response: Bad request userID not present  



GET request at `http://localhost:5000/api/reports`:  

Request 1: http://localhost:5000/api/reports?reportID=62a0f17e8a57dc9246018c3f  

Response:  
{  
    "_id": "62a0f17e8a57dc9246018c3f",  
    "cmdtyID": "cmdty-1",  
    "cmdtyName": "Potato",  
    "marketID": "market-1",  
    "marketName": "Vashi Navi Mumbai",  
    "users": [  
        "user-1",  
        "user-2"  
    ],  
    "priceUnit": "Kg",  
    "price": 15,  
    "timestamp": 1654714786100,  
    "__v": 1  
}  

Request 2 (sending wrong reportID and wrong format): http://localhost:5000/api/reports?reportID=aaaaaaaaaaaaaa  

Response: Bad Request  

Request 3 (sending wrong reportID but correct format): http://localhost:5000/api/reports?reportID=62a0f17e8a57dc9246018c3e  

Response: Report Not found  



## Technologies used :

1) Node.js  
2) Express  
3) JavaScript  

