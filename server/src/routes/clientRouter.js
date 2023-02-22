import express from "express";
import getClientIndexPath from "../config/getClientIndexPath.js";

const router = new express.Router();

const clientRoutes = [
  "/",
  "/user-sessions/new",
  "/users/new",
  "/plans",
  "/plans/new",
  "/plans/:id",
  "/search/:q",
  "/games",
  "/games/:id/plans",
  "/games/new",
  "/users/:username",
  "/users",
]
router.get(clientRoutes, (req, res) => {
  res.sendFile(getClientIndexPath());
});

export default router;
