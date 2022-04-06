const DBMODEL = require("../database/db.js").DBMODEL2;

exports.cultyvatefarmchart = async (request, response, next) => {
  let clientModel = request.body
  console.log(" Save User Info ");
  try {
    saveresult = await DBMODEL.dbfarmchart(clientModel);

    if (saveresult.status == "Success") {
      response.status(200).json({
        status: "Success",
        FarmerDetails : saveresult.data
      });
    } 
  } catch (err) {
    response.status(200).json({
      status: "Error",
      message: `Error: Unable to save user info Details`,
      details: err.message,
    });
  }
};