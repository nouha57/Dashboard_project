// use read-excel-file to read Excel file in uploads folder, 
// then save data to MySQL database with Sequelize Model
// export functions for retrieving all files in database table

const db = require("./models.js");
const File = db.files;
const readXlsxFile = require("read-excel-file/node");
var path = require('path');

const XLSX = require("xlsx");

const upload = async (req, res) => {
  
  try {
    if (req.file == undefined) {
      return res.status(400).send("Please upload an excel file!");
    }

    let name = req.file.filename;
    let pathName = path.resolve(process.cwd()) + "/public/uploads/" + name;

    File.bulkCreate([
    { title: name,
      path: pathName
    }
    ])
    .then(() => {
      res.status(200).send({
        message: "Uploaded the file successfully: " + req.file.originalname,
      });
    })
    .catch((error) => {
      res.status(500).send({
        message: "Fail to import data into database!",
        error: error.message,
      });
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Could not upload the file: " + req.file.originalname,
    });
  }
};



const getTitels = (req, res) => {
  connection.query("SELECT * FROM 'files';", (err, results, fields) => {
    if(err) throw err;
    res.send(results);
  });
};

const getFiles = (req, res) => {
  File.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving data.",
      });
    });
};




const getData = async(req, res) => {
  try {
    const dt = await XLSX.readFile(`./public/uploads/${req.params.name}`, {});
    const first_worksheet = dt.Sheets[dt.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(first_worksheet, { header: 1 });
    
    res.send(data);
  } catch (err){
    console.log(err);
  }
};



module.exports = {
  upload,
  getFiles,
  getTitels,
  getData,
};