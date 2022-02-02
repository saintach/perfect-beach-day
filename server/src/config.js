import dotenv from "dotenv";
dotenv.config();

const config = {
    api: {
        one_call_url: process.env.OPEN_WEATHER_ONE_CALL_API_URL,
        geocoding_url: process.env.OPEN_WEATHER_GEOCODING_API_URL,
        key: process.env.OPEN_WEATHER_API_KEY
    }
}

export default config;