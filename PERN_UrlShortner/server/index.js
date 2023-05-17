const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');
const pool = require("./db");
const  shortid = require("shortid");




///Middleware
app.use(cors());
app.use(express.json());   //// this middleware enables us to use req.body

///ROUTE-1///
// GET ALL SAVED URLs
app.get("/all" , async(req,res)=>{
    try {

        const allurl = await pool.query("SELECT * FROM urltable");
        res.json(allurl.rows);

    } catch (error) {
        console.log("error fetching urls");
    }
})

///ROUTE-2////
////POST URL AND SEND RESPONSE AS SHORTEN URL////
app.post("/shorten", async (req, res) => {
    try {
      const { originalUrl } = req.body;
  
      // Generate a unique short ID
      const shortUrl = shortid.generate();
  
      // Insert the URL into the database
      await pool.query(
        "INSERT INTO urltable (origUrl, shortUrl) VALUES ($1, $2)",
        [originalUrl, shortUrl]
      );
  
      res.json({ shortUrl });
    } catch (error) {
      console.log("Error shortening URL:", error);
      res.status(500).json({ error: "An error occurred" });
    }
  });


app.listen(port, () => {
    console.log(`Server is running at PORT: ${port}`);
  });