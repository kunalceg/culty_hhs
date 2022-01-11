const DBMODEL = require("../database/db.js").DBMODEL2;

exports.cultyvatehhscalibration = async (request, response, next) => {
  let clientModel = request.body
  console.log(" Save User Info ");
  try {
    saveresult = await DBMODEL.dbhhcalibration(clientModel);

    if (saveresult.status == "Success") {
      response.status(200).json({
        status: "Already device exist",
      });
    } else {
      response.status(200).json({
        status: "Please Select Soil type",
              });
    }
  } catch (err) {
    response.status(200).json({
      status: "Error",
      message: `Error: Unable to save Calibration info Details`,
      details: err.message,
    });
  }
};