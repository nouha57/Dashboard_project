const express = require("express");
const router = express.Router();
const db = require('./models.js');


function login(req, res){
    const username = req.body.username;
    const password = req.body.password;

    db.query(
        "SELECT * FROM users WHERE username = ? AND password = ?;", [username,password],
        (err, result) => {
            if(err) res.status(400).send(err);

            if(result.length > 0){
                res.status(200).send(result);
            } else {
                res.send({message: 'Wrong password or username'});
            }
        }
    );
}

function update(req, res){
    const username = req.body.username;
    const password = req.body.password;
    const oldPassword = req.body.oldPassword;

    db.query(
        "SELECT password FROM users WHERE username = ?;", [username],
        (err, result) => {
            if(err) res.status(400).send(err);

            if(result.length > 0 ){
                if(result[0].password === oldPassword){

                    db.query("UPDATE users SET password = ? WHERE username = ?;", [password, username],
                    (err, result) => {
                        if(err) res.status(400).send(err);
                        if(result) res.status(200).send({message: 'Update Successfully'});
                    });

                }else {
                    res.send({message: 'Wrong Password'});
                }
            } else {
                res.send({message: 'Wrong User Name'});
            }
        }
    );
}

let userRoutes = (app) => {
    router.post("/login", login);
    router.post("/update", update);
  
    app.use("/api/user", router);
};

module.exports = userRoutes;