import express from "express";
import userSessionsRouter from "./api/v1/userSessionsRouter.js";
import usersRouter from "./api/v1/usersRouter.js";
import clientRouter from "./clientRouter.js";
import plansRouter from "./api/v1/plansRouter.js";
import signupsRouter from "./api/v1/signupsRouter.js";
import gamesRouter from "./api/v1/gamesRouter.js";

const rootRouter = new express.Router();

rootRouter.use("/", clientRouter)
rootRouter.use("/api/v1/user-sessions", userSessionsRouter)
rootRouter.use("/api/v1/users", usersRouter)
rootRouter.use("/api/v1/plans", plansRouter)
rootRouter.use("/api/v1/signups", signupsRouter)
rootRouter.use("/api/v1/games", gamesRouter)
//place your server-side routes here

export default rootRouter;
