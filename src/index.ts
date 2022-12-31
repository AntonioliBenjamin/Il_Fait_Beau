import "dotenv/config";
import express from "express";
const port = +process.env.PORT;
import { routerWeather } from "./app/routes/weather";

// mongoose.connect("mongodb://127.0.0.1:27017/spotyone_data", (err) => {
//     if (err) {
//       throw err;
//     }
//     console.info("Connected to mongodb");
//   });
  
  const app = express();

  app.use(express.json());

  app.use("/weather", routerWeather)

  app.listen(port, () => {
    console.log(`listening on port ${port}`);
  });
  










// mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: pass,
//   database: 'weather'
// });


  // connect.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
//   const sql = "CREATE TABLE weather (city VARCHAR(128), tempInCelcius DECIMAL(4,2), humidity INT, windSpeed DECIMAL(4,2), lat DECIMAL(4,2), lon DECIMAL(4,2), createdAt BIGINT)";
//   connect.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("Table created");
//   });
// });