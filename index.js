const express = require("express");
const cors = require("cors");
const fetch = require("cross-fetch");
const {FOOD_URL, FOOD_MORE_URL, FOOD_BASE_URL} = require("./config");

const app = express();

app.use(cors());
app.use(express.json());

app.options('*', (req, res) => {
    res.status(204);
})

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
    
    fetch(FOOD_URL, {
        headers: {
            'Content-Type': 'application/json',
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

app.post('/api/restaurants', async(req, res) => {
    console.log(req.body.nextOffset);
    console.log(req.body._csrf);
    fetch(FOOD_MORE_URL, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Origin': FOOD_BASE_URL,
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
        },
        body: JSON.stringify({
            "lat": "17.25310",
            "lng": "80.14210",
            "nextOffset": req.body.nextOffset,
            "_csrf": req.body._csrf,
            "widgetOffset": {
              "NewListingView_category_bar_chicletranking_TwoRows": "",
              "NewListingView_category_bar_chicletranking_TwoRows_Rendition": "",
              "Restaurant_Group_WebView_SEO_PB_Theme": "",
              "collectionV5RestaurantListWidget_SimRestoRelevance_food_seo": req?.body?.widgetOffset?.collectionV5RestaurantListWidget_SimRestoRelevance_food_seo,
              "inlineFacetFilter": "",
              "restaurantCountWidget": ""
            }
        })
    })
    .then(response => {
        if(!response.ok) {
            console.log(response);
            throw new Error('Network Response not ok');
        }
        return response.json();
    })
    .then(data => {
        res.json(data);
    })
    .catch(error => {
        console.error(error);
        res.status(500).send('an error encountered');
    });
})

app.listen(3000, () => {
    console.log('Server running...')
})