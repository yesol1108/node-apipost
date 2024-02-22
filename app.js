const express = require('express');
const app = express();
const {connectDB, getDB } = require('./dbconnect.js')

// JSON 형태의 요청 body를 파싱하기 위해 express.json() 미들웨어를 사용합니다.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.set('view engint', 'ejs')


app.get('/', (req, res) => {
    res.sendFile(__dirname+"/views/index.html");
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

// POST /users 요청을 처리하는 라우터 핸들러입니다.
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

// Express 애플리케이션을 3000번 포트에서 실행합니다.
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
app.listen(port, ipaddress, () => {
  console.log('Server listening on port 8080');
});