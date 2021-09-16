//  initializes Multer Storage engine and defines middleware function to save Excel file in uploads folder

const multer = require("multer");
var path = require('path');

const excelFilter = (req, file, cb) => {
  
  if (
    file.mimetype.includes("excel") ||
    file.mimetype.includes("spreadsheetml")
  ) {
    cb(null, true);
  } else {
    cb("Please upload only excel file.", false);
  }
};

const months = { 0: 'January', 1: 'February', 2: 'March', 3: 'April', 4: 'May', 5: 'June', 6: 'July', 7: 'August', 8: 'September', 9: 'October', 10: 'November', 11: 'December' }

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(process.cwd()) + "/public/uploads/" );
  },
  filename: (req, file, cb) => {
    let Now = new Date();
    let FullDate =  Now.getDate() + months[Now.getMonth()] + Now.getFullYear();
    let FullTime = Now.getHours() + "-" + Now.getMinutes() + "-" + Now.getSeconds();
    cb(null, `${FullDate} ${String(FullTime)} ${file.originalname}`);
  },
});

var uploadFile = multer({ storage: storage, fileFilter: excelFilter });
module.exports = uploadFile;