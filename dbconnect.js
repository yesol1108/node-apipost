const MongoClient = require("mongodb").MongoClient;

let dbconnection;

module.exports = {
  connectDB: function (callback) {
    return new Promise((resolve, reject) => {
    if (dbconnection) {
       resolve();
    }
    const url = "mongodb+srv://lotrob88:XzaEhDYShKgl5AUC@cluster0.uhd6ccg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
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