const express = require('express');
const app = express();
const { Kafka } = require('kafkajs');
const request = require('request');
const {connectDB, getDB } = require('./dbconnect.js')

// JSON 형태의 요청 body를 파싱하기 위해 express.json() 미들웨어를 사용합니다.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.set('view engint', 'ejs')

// const kafka = new Kafka({
//     clientId: 'my-cluster-kafka',
//     brokers: ['my-cluster-kafka-bootstrap.efnalf-kafka-cluster.svc:9092']
//   })

// const consumer = kafka.consumer({groupId: 'vehicle-status-check-1'})

// const initKafka = async () => {
//     console.log("start subscribe kafka");
//     await consumer.connect()
//     await consumer.subscribe({ topic: 'vehicles', fromBeginning: true})
//     await consumer.run ({
//         eachMessage: async ({ topic, partition, message}) =>{
//             console.log({
//                 value: message.value.toString()
//             })
//         }
//     })
// }

// app.get('/consume', (req,res) => {
//     initKafka()
// })

const geturl = 'http://vehicles-tracker-http-efnalf-kafka-cluster.apps.na46r.prod.ole.redhat.com/vehicle/metrics';

app.get('/', (req, res) => {
    // res.sendFile(__dirname+"/views/index.html");
    res.redirect("/list-vehicles")
})


app.get('/list', (req,res) => {
    connectDB()
    .then(async () => {
        const listdata = await getDB().collection('post').find().toArray(function (err, result) {
            console.log(result);
        })
        console.log(listdata);
        res.render("list.ejs", { list : listdata});
    });
})


app.get('/list-vehicles', (req,res) => {
    const data = request.get({
        url: geturl
    }, function(error, response, body) {
        console.log(JSON.parse(body));

        res.render("vehicles.ejs", { list : JSON.parse(body)});
    });
})


app.get('/list-payment', (req,res) => {
    const data = request.get({
        url: "http://large-payments-quarkus-smallrye-kafka-efnalf-kafka-cluster.apps.na46r.prod.ole.redhat.com/largePayments"
    }, function(error, response, body) {
        console.log(JSON.parse(body));

        res.render("payments.ejs", { list : JSON.parse(body)});
    });
})


// POST 
app.post('/post_vehicle', (req, res) => {
  // 요청 body에서 JSON 데이터를 추출하여 사용할 수 있습니다.
  console.log(req.body)
  // 추출한 데이터를 이용해 새로운 사용자를 생성하고, 응답으로 결과를 전송합니다.
  connectDB()
  .then(async ()=>{
   const data = await getDB().collection('post').insertOne(
    { vehicle: req.body.vehicleCount, positions_count: req.body.positionsCount }
   )

    //  res.status(200).json({products: data}) /*응답 : {"products":{"acknowledged":true,"insertedId":"65d78b198f05b836ea00a71d"}} */

        res.redirect('/');
    })
    
});

app.listen(8080, () => {
  console.log('Server listening on port 8080');
});

