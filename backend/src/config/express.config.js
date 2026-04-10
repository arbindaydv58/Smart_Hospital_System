import express from "express"
import router from "./routes.config.js";

const app = express()


//*Routes
app.use("/api/v1",router)


export default app;