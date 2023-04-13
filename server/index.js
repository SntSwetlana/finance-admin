import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dorenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import clientRoutes from "./Routes/client.js"
import generalRoutes from "./Routes/general.js"
import managementRoutes from "./Routes/management.js"
import salesRoutes from "./Routes/sales.js"

//data imports
import User from "./models/User.js";
import Product from "./models/Product.js";
import ProductStat from "./models/ProductStat.js";
import Transaction from "./models/Transaction.js";
import OverallStat from "./models/OverallStat.js";
import { 
    dataUser,
    dataProduct,
    dataProductStat,
    dataTransaction,
    dataOverallStat,
} from "./data/index.js"

//config

dorenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);

//mongoose setup

const PORT = process.env.PORT || 9000;
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true, //optional parameters after MongoDB 3.5
    useUnifiedTopology: true,
}).then(()=>{
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`))
//    Product.insertMany(dataProduct);
//    ProductStat.insertMany(dataProductStat);
//    User.insertMany(dataUser);
//    Transaction.insertMany(dataTransaction);
    OverallStat.insertMany(dataOverallStat);

}).catch((error) => console.log(`${error}: didn't connect`))
