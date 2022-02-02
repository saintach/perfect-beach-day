import {api, geocodingApi} from '../services/ApiService.js';

export class WeatherRouteHandler {
    async getTodayWeather(ctx, next) {
        // TODO: add validation for query parameters -- city, country, unit, language
        const { city, country, units, lang } = ctx.query;
        try {
            // First get lat/lon from city and country
            const geoResponse = await geocodingApi.get('/direct', {
                q: `${city},${country}`,
                limit: 1
            });
            // If there's no data, throw 400 error
            if (!geoResponse.data.length)
                ctx.badRequest("Please provide valid city and country.");
            // Otherwise proceed to getting today's weather data        
            const { lat, lon } = geoResponse.data[0];

            const response = await api.get('/onecall', {
                exclude: "minutely,daily", // exclude unnecessary data
                lat,
                lon,
                units,
                lang
            });
            ctx.ok(response.data);
            
        } catch(e) {
            ctx.badRequest(e); // TODO: Add error handler
        }
        return next();
    }
}