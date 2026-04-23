import express from "express";
import cors from "cors";
import productRoutes from "./routes/product.routes.js";
import errorHandler from "./middlewares/error.middleware.js";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

const app = express();

app.use(cors());
app.use(express.json());

const swaggerDoc = YAML.load("./swagger.yaml");

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use("/api/products", productRoutes);

app.use(errorHandler);

export default app;