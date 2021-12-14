const { sql } = require("googleapis/build/src/apis/sql");
const DB = require("mssql");
const { clear } = require("winston");
var db_config = require("../config/db.config.json");

//const comp = require("../controllers/authv1.controller");
const config = {
  user: db_config.user,
  password: db_config.password,
  server: db_config.server,
  database: db_config.database,
  options: {
    encrypt: db_config.options["encrypt"],
    enableArithAbort: db_config.options["enableArithAbort"],
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 70000,
    acquireTimeoutMillis: 40000,
    reapIntervalMillis: 1000,
  },
};

DB.on("error", (err) => {
  console.log("MSSQL exception raised ");
});

const poolPromise = new DB.ConnectionPool(config)
  .connect()
  .then((pool) => {
    console.log("Connected to MSSQL");
    return pool;
  })
  .catch((err) =>
    console.log("Database Connection Failed! Bad Config: " + err)
  );


//hhsregistration

 
  exports.dbhhsregistration = async function (clientModel) {
    let pool = await poolPromise;
    let selectReq1 = await pool.request();
    let insertreq1 = await pool.request();
    let selectReq2 = await pool.request();
    
    let resp = await insertreq1
    .input("fullname",DB.VarChar,clientModel.hhsregistration.fullname)
    .input("gender",DB.Char,clientModel.hhsregistration.gender)
    .input("phonenumber", DB.VarChar, clientModel.hhsregistration.phonenumber)
    .input("pincode",DB.Int,clientModel.hhsregistration.pincode)
    .input("address",DB.VarChar,clientModel.hhsregistration.address)
    .input("createdate",DB.VarChar,clientModel.hhsregistration.createdate)
    .input("deviceid",DB.VarChar,clientModel.hhsregistration.deviceid)
    .query("Select * from hhsregistration where phonenumber=@phonenumber");
    if (resp.recordset.length == 0) {
      let resp1= await selectReq1
      .input("fullname",DB.VarChar,clientModel.hhsregistration.fullname)
    .input("gender",DB.Char,clientModel.hhsregistration.gender)
    .input("phonenumber", DB.VarChar, clientModel.hhsregistration.phonenumber)
    .input("pincode",DB.Int,clientModel.hhsregistration.pincode)
    .input("address",DB.VarChar,clientModel.hhsregistration.address)
    .input("createdate",DB.VarChar,clientModel.hhsregistration.createdate)
    .input("deviceid",DB.VarChar,clientModel.hhsregistration.deviceid)
    .query(`Insert into hhsregistration  (fullname,gender,phonenumber,pincode,address,createdate,deviceid)  values(@fullname,@gender,@phonenumber,@pincode,@address,GETDATE(),@deviceid)`);
    console.log("input data : " + JSON.stringify(clientModel));
      return {
        status: "Success",
        Message: "Successfully Registered"
           }       }
           else{
            return {
              status: "Already Registered",
                   }

           }
}


    


//hhsfarmerdetails

exports.dbhhsfarmerdetails = async function (clientModel) {
  let pool = await poolPromise;
  let insertreq1 = await pool.request();
  

  
  let resp1 = await insertreq1
  .input("deviceid",DB.Int,clientModel.hhsfarmerdetails.deviceid)
  .input("farmername",DB.VarChar,clientModel.hhsfarmerdetails.farmername)
  .input("soiltype",DB.VarChar,clientModel.hhsfarmerdetails.soiltype)
  .input("latitude", DB.Float, clientModel.hhsfarmerdetails.latitude)
  .input("longitude",DB.Float,clientModel.hhsfarmerdetails.longitude)
  .input("Fieldcapacity",DB.Float,clientModel.hhsfarmerdetails.Fieldcapacity)
  .input("wiltingpoint",DB.Float,clientModel.hhsfarmerdetails.wiltingpoint)
  .input("thresholdpoint",DB.Float,clientModel.hhsfarmerdetails.thresholdpoint)
  .input("soilmoisture",DB.Float,clientModel.hhsfarmerdetails.soilmoisture)
  .input("createddate",DB.Date,clientModel.hhsfarmerdetails.createddate)
  .query(`Insert into hhsfarmerdetails  (deviceid,farmername,soiltype,latitude,longitude,Fieldcapacity,wiltingpoint,thresholdpoint,soilmoisture,createddate)  values(@deviceid,@farmername,@soiltype,@latitude,@longitude,@Fieldcapacity,@wiltingpoint,@thresholdpoint,@soilmoisture,GETDATE())`);
  console.log("input data : " + JSON.stringify(clientModel));
    return {
      status: "Success",
      Message: " Data inserted "
        };
      }
       



//hhscontactusinfo

exports.dbhhscontactusinfo = async function (clientModel){
  let pool = await poolPromise;
  let selectReq1 = await pool.request();
  
        let pullrecord1 = await selectReq1
        .query(`select setting_value from hhscultyvatesettings where setting_name= 'contact'`);
        console.log(pullrecord1.recordset[0].setting_value)

        let result = {
          "companydetails" : pullrecord1.recordset[0].setting_value
        };
      return {
        status: "Success",
        Message: "Data Pulled",
        data:result
      };
 }

 
 //hhsaboutusinfo

 exports.dbhhsaboutusinfo = async function (clientModel){
  let pool = await poolPromise;
  let selectReq1 = await pool.request();
  
  
        let pullrecord1 = await selectReq1
        .query(`select setting_value from hhscultyvatesettings where setting_name= 'about'`);
        console.log(pullrecord1.recordset[0].setting_value)

       let result = {
          "companydetails" : pullrecord1.recordset[0].setting_value
        };
      return {
        status: "Success",
        Message: "Data Pulled",
        data:result
      };
 }

//help

exports.dbhhshelpinfo = async function (clientModel){
  let pool = await poolPromise;
  let selectReq1 = await pool.request();
 
  
        let pullrecord1 = await selectReq1
        .query(`select setting_value from hhscultyvatesettings where setting_name= 'help'`);
        console.log(pullrecord1.recordset[0].setting_value)

       // var msg = pullrecord1.recordset

        let result = {
          "companydetails" : pullrecord1.recordset[0].setting_value
        };
      return {
        status: "Success",
        Message: "Data Pulled",
        data:result
      };
 }

 //terms & conditions

 exports.dbhhsterm = async function (clientModel){
  let pool = await poolPromise;
  let selectReq1 = await pool.request();
   let pullrecord1 = await selectReq1
        .query(`select setting_value from hhscultyvatesettings where setting_name= 'termsandconditions'`);
        console.log(pullrecord1.recordset[0].setting_value)

          let result = {
          "term" : pullrecord1.recordset[0].setting_value
        };
      return {
        status: "Success",
        Message: "terms & conditions",
        data:result
      };
 }



 // training

exports.dbhhstraining = async function (clientModel){
  let pool = await poolPromise;
  let selectReq3 = await pool.request();
   
        let pullrecord1 = await selectReq3
        .query(`select setting_value from hhscultyvatesettings where setting_name= 'training'`);
        console.log(pullrecord1.recordset[0].setting_value)

         let result = {
          "training" : pullrecord1.recordset[0].setting_value
        };
      return {
        status: "Success",
        Message: "Data Pulled",
        data:result
      };
 }



// soil configuration

exports.dbhhssoilconfig = async function (clientModel) {
  let pool = await poolPromise;
  let selectReq1 = await pool.request();
  let insertreq1 = await pool.request();
  let selectReq2 = await pool.request();
  let selectReq3 = await pool.request()
  
  let resp = await insertreq1
  .input("deviceid",DB.VarChar,clientModel.hhssoilconfig.deviceid)
  .input("soiltype",DB.VarChar,clientModel.hhssoilconfig.soiltype)
  .input("latitude", DB.Float, clientModel.hhssoilconfig.latitude)
  .input("longitude",DB.Float,clientModel.hhssoilconfig.longitude)
  .input("Fieldcapacity",DB.Float,clientModel.hhssoilconfig.Fieldcapacity)
  .input("wiltingpoint",DB.Float,clientModel.hhssoilconfig.wiltingpoint)
  .input("thresholdpoint",DB.Float,clientModel.hhssoilconfig.thresholdpoint)
  .input("Threshold_percentage",DB.Float,clientModel.hhssoilconfig.Threshold_percentage)
  .input("createddate",DB.Date,clientModel.hhssoilconfig.createddate)
  .query("Select * from hhssoilconfig where deviceid=@deviceid");	
  if (resp.recordset.length == 0) {
    
    // inserted data in soil config

    let resp1= await selectReq1
  .input("deviceid",DB.VarChar,clientModel.hhssoilconfig.deviceid)
  .input("soiltype",DB.VarChar,clientModel.hhssoilconfig.soiltype)
  .input("latitude", DB.Float, clientModel.hhssoilconfig.latitude)
  .input("longitude",DB.Float,clientModel.hhssoilconfig.longitude)
  .input("Fieldcapacity",DB.Float,clientModel.hhssoilconfig.Fieldcapacity)
  .input("wiltingpoint",DB.Float,clientModel.hhssoilconfig.wiltingpoint)
  .input("thresholdpoint",DB.Float,clientModel.hhssoilconfig.thresholdpoint)
  .input("Threshold_percentage",DB.Float,clientModel.hhssoilconfig.Threshold_percentage)
  .input("createddate",DB.Date,clientModel.hhssoilconfig.createddate)
  .query(`Insert into hhssoilconfig (deviceid,soiltype,latitude,longitude,Fieldcapacity,wiltingpoint,thresholdpoint,Threshold_percentage,createddate)  values(@deviceid,@soiltype,@latitude,@longitude,@Fieldcapacity,@wiltingpoint,@thresholdpoint,@Threshold_percentage,GETDATE())`);
  console.log("input data : " + JSON.stringify(clientModel));
    return {
      status: "Success",
      Message: " Data inserted "
         }       
        }
        
        //snapshort soil config
         else{
          let resp2= await selectReq3
          .input("deviceid",DB.VarChar,clientModel.hhssoilconfig.deviceid)
          .query(`Insert into snappshothhssoilconfig select deviceid,soiltype,latitude,longitude,Fieldcapacity,wiltingpoint,thresholdpoint,Threshold_percentage,createddate from hhssoilconfig  where deviceid=@deviceid `)
          
          //update soil config

          let resp3= await selectReq2
          .input("deviceid",DB.VarChar,clientModel.hhssoilconfig.deviceid)
          .input("soiltype",DB.VarChar,clientModel.hhssoilconfig.soiltype)
          .input("latitude", DB.Float, clientModel.hhssoilconfig.latitude)
          .input("longitude",DB.Float,clientModel.hhssoilconfig.longitude)
          .input("Fieldcapacity",DB.Float,clientModel.hhssoilconfig.Fieldcapacity)
          .input("wiltingpoint",DB.Float,clientModel.hhssoilconfig.wiltingpoint)
          .input("thresholdpoint",DB.Float,clientModel.hhssoilconfig.thresholdpoint)
          .input("Threshold_percentage",DB.Float,clientModel.hhssoilconfig.Threshold_percentage)
          .input("modifydate",DB.Date,clientModel.hhssoilconfig.modifydate)
          .query(`update hhssoilconfig set soiltype=@soiltype,latitude=@latitude,longitude=@longitude,
          Fieldcapacity=@Fieldcapacity,wiltingpoint=@wiltingpoint,thresholdpoint=@thresholdpoint,Threshold_percentage=@Threshold_percentage,modifydate=GETDATE() where deviceid=@deviceid`);
          return {
            status: "Success",
            Message:"soil data updated ",
                 }

         }
      
};
      


// Default soil configuration

exports.dbhhspullsoildetails = async function (clientModel){
  let pool = await poolPromise;
  let selectReq3 = await pool.request();
     let pullrecord1 = await selectReq3
		 .input("soiltype", DB.VarChar, clientModel.hhsdefaultsoilconfig.soiltype)
        .query(`select  * from hhsdefaultsoilconfig where soiltype=@soiltype `);
        console.log(pullrecord1.recordset[0])

       // var msg = pullrecord1.recordset

        let result = {
          "infodata" : pullrecord1.recordset[0]
        };
      return {
        status: "Success",
        Message: "Data Pulled",
        data:result
      };
    }
  