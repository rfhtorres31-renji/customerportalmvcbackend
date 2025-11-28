


const authorizedUsers = [
  { name:"Ronnier", email: "rfhtorres@example.com", phoneNo: "09354215380" },
  { name:"Mark", email: "mark@example.com", phoneNo: "09987654321" },
]
const authentication = function (req, res) {
    
     if (req.body == null || Object.keys(req.body).length == 0) {
         return res.status(400).json({message:"Null Data"});
     }
     
     // Check if User Exist
     const user = authorizedUsers.find(u => u.email === req.body.email);

     if (user == undefined){
        return res.status(409).json({message:"User Doesn't Exist"});
     }

     //Check if phone number of that user is correct
     if (req.body.phoneNo != user.phoneNo){
         return res.status(409).json({message:"Phone number is incorrect"});
     }

     return res.status(200).json({message:"Login Successfully", user:user.name});

};



export default {authentication}
