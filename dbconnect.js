const MongoClient = require("mongodb").MongoClient;

let dbconnection;

module.exports = {
  connectDB: function (callback) {
    return new Promise((resolve, reject) => {
    if (dbconnection) {
       resolve();
    }
    const url = "";
    MongoClient.connect(url)
      .then((client) => {
        dbconnection = client.db("vehicles");
        console.log("db connected!!");
        
        resolve();
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
    });
  },
  getDB: function(){
    return dbconnection
  }
};
