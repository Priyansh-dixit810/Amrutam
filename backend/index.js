require('dotenv').config();
const express = require('express');
const app= express();
const mongoose =require("mongoose");
const MongoStore = require("connect-mongo")
const port =process.env.PORT || 8080;
const cors = require("cors");
const url =process.env.MONGO_URL
const {Product} = require("./models/ProductModel.js");
const session= require("express-session");
const store = MongoStore.create({mongoUrl: url});
const {storage} = require("./cloudConfig.js");
const multer  = require('multer')
const upload = multer({storage});

const sessionOptions = {
    secret: process.env.SECRET_CODE,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: { maxAge: 1000 * 60 * 30 * 24 },
}

const allowedOrigins = [
  "http://localhost:5173",                    // Local dev
  "https://amrutam-frontend-ecru.vercel.app" // Production frontend
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true); 
    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(new Error(`CORS Error: ${origin} not allowed`), false);
    }
    return callback(null, true);
  },
  credentials: true
}));
app.use(express.json()); 
app.use(session(sessionOptions));

app.post("/generalInfo", upload.array('photos', 5), (req, res) => {
        console.log("Uploaded files:", req.files);
        const photoUrls = req.files.map(file => file.path || file.filename || file.url);
        req.session.generalInfo = { ...(req.session.generalInfo || {}), ...req.body, photoUrls };
        console.log("Session data:", req.session.generalInfo);
        res.json({ message: "Files uploaded successfully", photoUrls });
});


app.post("/benefits", (req,res)=>{
    let {primaryBenefits,secondaryBenefits} = req.body;
req.session.benefits = { ...(req.session.benefits || {}), primaryBenefits, secondaryBenefits };
    console.log(req.session);
    res.send("Done");
});

app.post("/properties",(req,res)=>{
    let {di,usage,ingredientName,duration} = req.body;
    req.session.properties = { ...(req.session.properties || {}), di, usage, ingredientName, duration };

    console.log(req.session);
    res.send("Done");
});
app.post("/faq",(req,res)=>{
    let {faq,apd}= req.body;
    req.session.faq = { ...(req.session.faq || {}), faq, apd };
    console.log(req.session);
    res.send("DOne");
});

app.get("/overview", (req,res)=>{
  console.log("Full session data:", req.session);
    const { generalInfo, benefits, properties, faq } = req.session;
    if (!generalInfo && !benefits && !properties && !faq) {
        console.log("Empty sesion:", req.session);
        return res.status(400).json({ message: "No data found in session" });
    }
    res.json({
        generalInfo: generalInfo || {},
        benefits: benefits || {},
        properties: properties || {},
        faq: faq || {}
    });
});

app.post("/overview", async (req, res) => {
  try {
    console.log( req.body); 

    const newProduct = new Product(req.body);
    await newProduct.save();

    res.status(201).json({
      message: "✅ Product saved successfully!",
      product: newProduct,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to save", error: err.message });
  }
});

app.get("/productList", async (req,res)=>{
    const products = await Product.find();
    res.json(products);
})
app.put("/details/activity/:id", async(req,res)=>{
    const {id} = req.params;
    const {status} = req.body
    const product = await Product.findByIdAndUpdate(id, {status} , {new: true});
    console.log(product);
    res.json(product);
})
app.put("/details/editInfo/:id", async (req,res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    const product = await Product.findByIdAndUpdate(
        id,
        { "generalInfo.name" : name, "generalInfo.description" : description },
        { new: true } 
    );
    console.log(product);
    res.json(product);
});


app.listen(port , ()=>{
    console.log("listening");
    mongoose.connect(url)
  .then(() => {
    console.log("✅ MongoDB connected");
  })
  .catch(err => {
    console.error("❌ MongoDB connection error:", err.message);
  });
    console.log("Connected");
})
