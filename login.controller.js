const DBMODEL = require("../database/db.js").DBMODEL2;

exports.cultyvatehhslogin = async (request, response, next) => {
  let clientModel = request.body
  console.log(" Save User Info ");
  try {
    saveresult = await DBMODEL.dbhhslogin(clientModel);

    if (saveresult.status == "Success") {
      response.status(200).json({
        status: "Success",
        message:"Login Successfully"
      });
    } 
    else
    {
        response.status(200).json({ 
        status:"Error",
        Message:" Please check username and password"
      
    });
}

    
  } catch (err) {
    response.status(200).json({
      status: "Error",
      message: `Error: Unable to get user info Details`,
      details: err.message,
    });
  }
};