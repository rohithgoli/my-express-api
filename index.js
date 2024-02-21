
const express = require("express");
const cors = require("cors");
const fetch = require("cross-fetch");

const app = express();

app.use(cors());
app.use(express.json());

const SWIGGY_URL = "https://www.swiggy.com/dapi/restaurants/list/v5?lat=17.25310&lng=80.14210";

app.get("/", async (req, res) => {
    try {
        res.status(200).json({
            success: true,
            message: "Proxy server is operational :-)",
            url: {
                food: process.env.FOOD_URL
            }
        })
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

app.get('/api/restaurants', async (req, res) => {
    
    fetch(SWIGGY_URL, {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
        }
    })
    .then(response => {
        if(!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        res.json(data);
    })
    .catch(error => {
        console.error(error);
        res.status(500).send('An error occurred');
    });
})

app.listen(3000, () => {
    console.log('Server running...')
})