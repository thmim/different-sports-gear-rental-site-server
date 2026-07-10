import express, { Application, Request, Response } from "express";
import cors from "cors";
import config from "./config";
import cookieParser from "cookie-parser";
import { userRouter } from "./modules/user/user.route";
import { authRoute } from "./modules/auth/auth.route";
import { categoriesRoute } from "./modules/categories/categories.route";
import { gearItemRoute } from "./modules/gearItem/gearItem.route";
import { rentalOrderRoute } from "./modules/rentorder/rentOrder.route";
import { paymentRoute } from "./modules/payments/payments.route";
import { reviewRoute } from "./modules/review/review.route";
import { notFound } from "./middleware/notFound";
import { globalErrorHandler } from "./middleware/globalErrorHandler";
const app:Application = express();

app.use(cors({
    origin:config.app_url,
    credentials:true
}))

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.get("/", (req:Request,res:Response)=>{
    res.send(
        "I am ready"
    )

})

// register api
app.use("/api/auth",userRouter);
// login api
app.use("/api/auth",authRoute);
// update user
app.use("/api/admin/users",userRouter);
// create category by admin  and get categories by customer
app.use("/api",categoriesRoute);

// gear items create route
app.use("/api/provider",gearItemRoute);

app.use("/api/provider/gear",gearItemRoute);
app.use("/api/admin",gearItemRoute);

// get all user
app.use("/api/admin",userRouter);
// get single gear using id to see details
app.use("/api/gear/users",gearItemRoute);
// get all gear for everyone
app.use("/api/gear",gearItemRoute);

// rental order
app.use("/api",rentalOrderRoute);
app.use("/api/rentals",rentalOrderRoute);
app.use("/api/payment",paymentRoute);
app.use("/api/provider",rentalOrderRoute);
// update rental order status
app.use("/api/provider/orders",rentalOrderRoute);
// review post
app.use("/api",reviewRoute);

// route not found error handler middleware
app.use(notFound);

// global error handler
app.use(globalErrorHandler);

export default app;