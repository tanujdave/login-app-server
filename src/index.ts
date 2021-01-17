import "reflect-metadata";
import * as express from "express";
import * as dotenv from "dotenv";
import * as bodyParser from "body-parser";
import * as helmet from "helmet";
import * as cors from "cors";
import routes from "./routes";

// Create a new express application instance
const app = express();

// Initialize dotenv
dotenv.config();

// Call middlewares
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());

// Set all routes from routes folder
app.use("/", routes);

app.listen(3001, () => {
  console.log("Server started on port 3001");
});
