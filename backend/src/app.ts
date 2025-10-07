import express from "express"
import cors from 'cors'
import { env } from "./config";
import employeeRoutes from "@routes/employee.routes";

const app = express();
app.use(express.json())
app.use(cors({ origin: env.CORS_ORIGIN }))

app.use("/api/employees", employeeRoutes);

app.get('/', (req, res) => {
    res.send('Employee Management API is running');
});


export default app