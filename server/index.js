const express = require("express");
const app = express();
const cors=require('cors')

app.use(cors())
app.use(express.static(__dirname + "/../client/dist"));
const db = require ("./Database/index")



app.use(express.json());
app.use(express.urlencoded({extended: true}));
// require('./fake.js')()
const User = require('./Routers/user.routes.js')
const ProductRoutes=require("./Routers/products.routes.js")
const favorit=require("./Routers/favorit.routes.js")
const packs = require('./Routers/packs.routes.js')
const Authentication = require('./Routers/login.routers.js');
const messagesRouter = require('./Routers/messages.routers')
const Payment=require('./Routers/Payment.js')
const reviewRouter = require('./Routers/review.router.js');
const reviewzRouter = require('./Routers/reviewz.router.js');

const Notification = require('./Routers/Notification.routes.js')


app.use(cors()) 

app.use("/api/not", Notification);
app.use("/api/auth", Authentication);
app.use('/api/messages', messagesRouter);
app.use('/api/user', User);
app.use('/api/favorit', favorit);

app.use("/api/product", ProductRoutes);
app.use("/api/packs", packs);
app.use('/api/payment', Payment);
app.use('/api/review', reviewRouter);
app.use('/api/reviewz', reviewzRouter);

let port = 3000;
app.listen(port, function () {
  console.log(`listening on port ${port}`);
});
