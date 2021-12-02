const express = require("express");
const axios = require("axios");

const app = express();

app.use(express.json());

var request_count = 0;

app.get("/",(req,res)=>{
    res.send("Simple API Project");
})

app.get("/api/getdata",async (req,res)=>{
  if(request_count < 20){
      try {

        let external_api = await axios({
            method:"get",
            url:"https://randomuser.me/api/",
            timeout:5000
        });

        request_count++;
        console.log(request_count);
        res.send(external_api.data);
        
      } catch (error) {
          res.send({
              status:false,
              message : "Error To fecth External api data !!"
          });
      }
    return;
  }

  res.send({
      status:false,
      message : "20 Requests per minute is allow !!"
  });
  return;

});

app.listen(8000,(err)=>{
   if(err) return;
   console.log("Server running on port :",8000);

   setInterval(() => {
       request_count = 0;
   },60000);
});


