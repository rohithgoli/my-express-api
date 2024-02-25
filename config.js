const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    FOOD_URL: process.env.FOOD_URL,
    FOOD_MORE_URL: process.env.FOOD_MORE_URL,
    FOOD_BASE_URL: process.env.FOOD_BASE_URL
}