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
//hhslogindashboard

exports.dbhhslogin = async function (clientModel){
  let pool = await poolPromise;
  let selectReq1 = await pool.request();
  let selectReq = await pool.request();
  
        let pullrecord1 = await selectReq1
        .input("username",DB.VarChar,clientModel.hhslogindashboard.username)
        .input("password",DB.VarChar,clientModel.hhslogindashboard.password)
        .query(`select * from hhslogindashboard where username=@username and password=@password`);
        if(pullrecord1.recordset.length>0)
        return {
        status: "Success",
        Message: "Login Succesfully",
      }
      else
      {
        return {
          status:"Error",
          Message:" Please check username and password"
        }

      }
      
 }


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
    if (resp.recordset.length == 0)
  {
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
           }

     }
           else
           {
            return {
              status: "Already Registered",
            }

      }
}


//hhscalibration

exports.dbhhcalibration = async function (clientModel) {
  let pool = await poolPromise;
  let insertreq1 = await pool.request();
  let selectReq1 = await pool.request();
  
   let resp = await selectReq1
   .input("deviceid",DB.VarChar,clientModel.hhssoilconfig.deviceid)
   .query("Select * from hhssoilconfig where deviceid=@deviceid");
        if (resp.recordset.length > 0) {
      return {
      status: "Success",
      Message: " Already device exist "
    }   
  } 

  else
  {
   return {
     status: "Plese select Soil type",
   }

}
}   
  

//hhssoildisplay

exports.dbsoildisplay = async function (clientModel){
  let pool = await poolPromise;
  let selectReq1 = await pool.request();
 
  let pullrecord1 = await selectReq1
 .input("deviceid", DB.VarChar, clientModel.hhssoilconfig.deviceid)
 .input("soiltype", DB.VarChar, clientModel.hhssoilconfig.soiltype)
		
 .query(`select  soiltype,Fieldcapacity,wiltingpoint,thresholdpoint,Threshold_percentage 
        from hhssoilconfig where deviceid=@deviceid and soiltype=@soiltype`);
  console.log(pullrecord1.recordset[0])

         let result = {
          "defaultsoilconfiguration" : pullrecord1.recordset[0]
        };
      return {
        status: "Success",
        Message: "Data Pulled",
        data:result
      };
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
     .input("temperature",DB.Float,clientModel.hhsfarmerdetails.temperature)
     .input("createddate",DB.Date,clientModel.hhsfarmerdetails.createddate)
     .query(`Insert into hhsfarmerdetails  (deviceid,farmername,soiltype,latitude,longitude,Fieldcapacity,wiltingpoint,thresholdpoint,soilmoisture,temperature,createddate)  values(@deviceid,@farmername,@soiltype,@latitude,@longitude,@Fieldcapacity,@wiltingpoint,@thresholdpoint,@soilmoisture,@temperature,GETDATE())`);
     console.log("input data : " + JSON.stringify(clientModel));
     return {
      status: "Success",
      Message: " Data inserted "
        };
      }
    
//hhsfarmerdetails
exports.dbhhsfarmerd = async function (clientModel){
  let pool = await poolPromise;
  let selectReq1 = await pool.request();
  
        let pullrecord1 = await selectReq1
        .query(`select * from hhsfarmerdetails`);
        console.log(pullrecord1.recordset)

        let result = {
          "farmerdetails" : pullrecord1.recordset
        };
      return {
        status: "Success",
        Message: "Data Pulled",
        data:result
      };
 }

//hhsregistraiondetails

 exports.dbhhsfarmreg = async function (clientModel){
  let pool = await poolPromise;
  let selectReq1 = await pool.request();
  
        let pullrecord1 = await selectReq1
        .query(`select * from hhsregistration`);
        console.log(pullrecord1.recordset)

        let result = {
          "registraion" : pullrecord1.recordset
        };
      return {
        status: "Success",
        Message: "Data Pulled",
        data:result
      };
 }

//hhssoilconfig

exports.dbhhssoilc = async function (clientModel){
  let pool = await poolPromise;
  let selectReq1 = await pool.request();
  
        let pullrecord1 = await selectReq1
        .query(`select *from hhssoilconfig`);
        console.log(pullrecord1.recordset)

        let result = {
          "soilconfig" : pullrecord1.recordset
        };
      return {
        status: "Success",
        Message: "Data Pulled",
        data:result
      };
 }

//DefaultSoilchart

exports.dbdsoilchart = async function (clientModel){
  let pool = await poolPromise;
  let selectReq = await pool.request();
  
        let pullrecord1 = await selectReq
        .query(`Select *from hhsdefaultsoilconfig as json`);
        console.log(pullrecord1.recordset)

        let result = {
          soil : pullrecord1.recordset
        };
      return {
        status: "Success",
          data:result
      };
 }
//Registration chart

exports.dbregchart = async function (clientModel){
  let pool = await poolPromise;
  let selectReq = await pool.request();
  
        let pullrecord1 = await selectReq
        .query(`SELECT
        convert(date,createdate) as 'Date',
        COUNT(Fullname)name,COUNT(deviceid)id
        FROM hhsregistration
        GROUP BY convert(date,createdate)`);
        console.log(pullrecord1.recordset)

        let result = {
          reg : pullrecord1.recordset
        };
      return {
        status: "Success",
          data:result
      };
 }
// Farmer Details Chart

exports.dbfarmchart = async function (clientModel){
  let pool = await poolPromise;
  let selectReq = await pool.request();
  
        let pullrecord1 = await selectReq
        .query(`select CONVERT(date,createddate)Date,
        COUNT(farmername)name
        from hhsfarmerdetails
        group by convert(date,createddate),deviceid`);
        console.log(pullrecord1.recordset)

        let result = {
          farmer : pullrecord1.recordset
        };
      return {
        status: "Success",
          data:result
      };
 }

// Location based farmer 

exports.dblocation = async function (clientModel){
  let pool = await poolPromise;
  let selectReq = await pool.request();
  
        let pullrecord1 = await selectReq
        .query(`select COUNT(farmername)name,
        COUNT(distinct deviceid)id, 
        latitude,longitude,deviceid
        from hhsfarmerdetails group by 
        latitude,longitude,deviceid`);
        console.log(pullrecord1.recordset)

        let result = {
          farmer : pullrecord1.recordset
        };
      return {
        status: "Success",
          data:result
      };
 }
//soilconfigChart

exports.dbsoilconfigChart = async function (clientModel){
  let pool = await poolPromise;
  let selectReq = await pool.request();
  
        let pullrecord1 = await selectReq
        .query(`select COUNT(deviceid)soil,
        deviceid from hhssoilconfig group by deviceid`);
        console.log(pullrecord1.recordset)

        let result = {
          farmer : pullrecord1.recordset
        };
      return {
        status: "Success",
          data:result
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

exports.dbhhshelp = async function (clientModel){
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
  .input("soilid",DB.Int,clientModel.hhssoilconfig.soilid)
  .query("Select * from hhssoilconfig where soilid=@soilid");	
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
  .input("soilid",DB.Int,clientModel.hhssoilconfig.soilid)
  .query(`Insert into hhssoilconfig (deviceid,soiltype,latitude,longitude,Fieldcapacity,wiltingpoint,thresholdpoint,Threshold_percentage,createddate,soilid)  values(@deviceid,@soiltype,@latitude,@longitude,@Fieldcapacity,@wiltingpoint,@thresholdpoint,@Threshold_percentage,GETDATE(),@soilid)`);
  console.log("input data : " + JSON.stringify(clientModel));
    return {
      status: "Success",
      Message: " Data inserted "
         }       
        }
        
        //snapshort soil config
         else{
          let resp2= await selectReq3
          .input("soilid",DB.Int,clientModel.hhssoilconfig.soilid)
          .query(`Insert into snappshothhssoilconfig select deviceid,soiltype,latitude,longitude,Fieldcapacity,wiltingpoint,thresholdpoint,Threshold_percentage,createddate from hhssoilconfig  where soilid=@soilid `)
          
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
          .input("soilid",DB.Int,clientModel.hhssoilconfig.soilid)
          .input("modifydate",DB.Date,clientModel.hhssoilconfig.modifydate)
          .query(`update hhssoilconfig set soiltype=@soiltype,latitude=@latitude,longitude=@longitude,
          Fieldcapacity=@Fieldcapacity,wiltingpoint=@wiltingpoint,thresholdpoint=@thresholdpoint,Threshold_percentage=@Threshold_percentage,modifydate=GETDATE() where soilid=@soilid`);
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
          "defaultsoilconfig" : pullrecord1.recordset[0]
        };
      return {
        status: "Success",
        Message: "Data Pulled",
        data:result
      };
    }
  