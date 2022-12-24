let express = require(`express`);
let app = express();
let dotenv = require("dotenv");
dotenv.config();
let port = process.env.PORT || 8091;
let mongo = require("mongodb");
let MongoClient = mongo.MongoClient;
let mongoliveurl = process.env.mongoliveurl;
let morgan = require("morgan");
const bodyParser = require("body-parser");
let cors = require("cors");

app.use(morgan("common"));
app.use(bodyParser.urlencoded({ extendeed: true }));
app.use(bodyParser.json());
app.use(cors());
let db;

//API TO GET LOCATION
app.get("/location", (req, res) => {
  db.collection("location")
    .find()
    .toArray((err, data) => {
      if (err) throw err;
      res.send(data);
    });
});

//API TO GET RESTURANT DATA
app.get("/resturantdata", (req, res) => {
  let query = {};
  let stateid = Number(req.query.stateid);
  let mealid = Number(req.query.mealid);
  if (stateid) {
    query = { state_id: stateid };
  } else if (mealid) {
    query = { "mealTypes.mealtype_id": mealid };
  } else {
    query = {};
  }
  db.collection("ResturantData")
    .find(query)
    .toArray((err, data) => {
      if (err) throw err;
      res.send(data);
    });
});

// API FOR QUICKSEAARCH OF MEALTYPE
app.get("/mealtype", (req, res) => {
  db.collection("mealType")
    .find()
    .toArray((err, data) => {
      if (err) throw err;
      res.send(data);
    });
});

//Restaurant wrt Meal & cuisine
app.get("/filter/:mealid", (req, res) => {
  let query = {};
  let mealid = Number(req.params.mealid);
  let cuisineid = Number(req.query.cuisineid);
  let lcost = Number(req.query.lcost);
  let hcost = Number(req.query.hcost);

  let sort = { cost: 1 };
  if (req.query.sort) {
    sort = { cost: req.query.sort };
  }
  if (cuisineid && lcost && hcost) {
    query = {
      "mealTypes.mealtype_id": mealid,
      "cuisines.cuisine_id": cuisineid,
      $and: [{ cost: { $gt: lcost, $lt: hcost } }],
    };
  } else if (lcost && hcost) {
    query = {
      "mealTypes.mealtype_id": mealid,
      $and: [{ cost: { $gt: lcost, $lt: hcost } }],
    };
  } else if (cuisineid) {
    query = {
      "mealTypes.mealtype_id": mealid,
      "cuisines.cuisine_id": cuisineid,
    };
  } else {
    query = { "mealTypes.mealtype_id": mealid };
  }

  db.collection("ResturantData")
    .find(query)
    .sort(sort)
    .toArray((err, data) => {
      if (err) throw err;
      res.send(data);
    });
});

//DETAILS OF RESTURANTS
app.get("/resturantdetails/:id", (req, res) => {
  let query = {};
  let id = Number(req.params.id);
  if (id) {
    query = { restaurant_id: id };
  }

  //   let id = mongo.ObjectId(req.params.id);
  //   if (id) {
  //     query = { _id: id };
  //   }

  db.collection("ResturantData")
    .find(query)
    .toArray((err, data) => {
      if (err) throw err;
      res.send(data);
    });
});

//MENU DETAILS WRT RESTURENT
app.get("/menu/:id", (req, res) => {
  let id = Number(req.params.id);

  db.collection("menu")
    .find({ restaurant_id: id })
    .toArray((err, data) => {
      if (err) throw err;
      res.send(data);
    });
});

//MENU DETAILS
app.post("/menuitem", (req, res) => {
  if (Array.isArray(req.body.id))
    db.collection("menu")
      .find({
        menu_id: { $in: req.body.id },
      })
      .toArray((err, result) => {
        res.send(result);
      });
  else {
    res.send("Invalid");
  }
});

//FOR ORDER PLACE
app.post("/placeorder", (req, res) => {
  db.collection("orders").insert(req.body, (err, result) => {
    res.send("order placed");
  });
});

// DETAILS ORDER
app.get("/orderdetail", (req, res) => {
  db.collection("orders")
    .find()
    .toArray((err, data) => {
      res.send(data);
    });
});

//UPDATE ORDERS
app.put("/updateorder/:id", (req, res) => {
  let oid = Number(req.params.id);

  db.collection("orders").updateOne(
    { orderid: oid },
    {
      $set: {
        status: req.body.status,
        bank_name: req.body.bank_name,
        date: req.body.date,
      },
    },
    (err, result) => {
      if (err) throw err;
      res.send("order updated");
    }
  );
});

// CHECK ORDER WRT EMAIL
app.get("/orderview/:email", (req, res) => {
  let emailid = req.params.email;
  let query = {};
  if (emailid) {
    query = { email: emailid };
  }
  db.collection("orders")
    .find(query)
    .toArray((err, data) => {
      if (err) throw err;
      res.send(data);
    });
});

// DELETE ORDERS

app.delete("/deleteorder/:id", (req, res) => {
  let _id = mongo.ObjectId(req.params.id);
  db.collection("orders").remove({ _id }, (err, result) => {
    if (err) throw err;
    res.send("Order Deleted");
  });
});

// //API To GET RESTURANT WRT CITY
// app.get("/cityresturant", (req, res) => {
//   let query = {};
//   let stateid = Number(req.query.stateid);
//   if (stateid) {
//     query = { state_id: stateid };
//   } else {
//     query = {};
//   }
//   db.collection("ResturantData")
//     .find(query)
//     .toArray((err, data) => {
//       if (err) throw err;
//       res.send(data);
//     });
// });

//DATABASE CONNECTIONS
MongoClient.connect(mongoliveurl, (err, client) => {
  if (err) throw err;
  db = client.db("sachindb");
  app.listen(port, () => {
    console.log(`Listing on port ${port}`);
  });
});
