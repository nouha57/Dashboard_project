const express = require("express");
const router = express.Router();
const db = require('./models.js');


function setData(req, res){
    const date = req.body.date;
    const total_boards = req.body.total_boards;
    const ratio_defaut = req.body.ratio_defaut;
    const evolution_TRG = req.body.evolution_TRG;
    const obj_TRG = req.body.obj_TRG;

    db.query(
        "SELECT * FROM boards WHERE date = ? ;",[date],
        (err, result) => {
            if(err) res.status(400).send(err);
            if(result[0]) {

                db.query(
                    "UPDATE boards SET total_boards = ?, ratio_defaut = ?, evolution_TRG = ?, obj_TRG = ? WHERE date = ?;"
                    , [total_boards, ratio_defaut, evolution_TRG, obj_TRG, date],
                    (err, result) => {
                        if(err) res.status(400).send(err);
                        if(result) res.status(200).send(result);
                    }
                );

            }else{
                db.query(
                    "INSERT INTO boards (date, total_boards, ratio_defaut, evolution_TRG, obj_TRG) VALUES (?, ?, ?, ?, ?);"
                    , [date, total_boards, ratio_defaut, evolution_TRG, obj_TRG],
                    (err, result) => {
                        if(err) res.status(400).send(err);
                        if(result) res.status(200).send(result);
                    }
                );
            }
        }
    );
}

function getData(req, res){
    db.query("SELECT * FROM boards ;", (err, results) => {
      if(err) throw err;
      res.send(results);
    });
}

let boardsRoutes = (app) => {
  router.post("/setData", setData);  
  router.get("/getData", getData);

  app.use("/api/boards", router);
};

module.exports = boardsRoutes;