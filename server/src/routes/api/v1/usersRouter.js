import express from "express";
import { User } from "../../../models/index.js";
import { raw } from 'objection'
import UserSerializer from "../../../serializers/UserSerializer.js";

const usersRouter = new express.Router();

usersRouter.post("/", async (req, res) => {
  const { email, password, username, passwordConfirmation } = req.body;
  try {
    const persistedUser = await User.query().insertAndFetch({ email, password, username });
    return req.login(persistedUser, () => {
      return res.status(201).json({ user: persistedUser });
    })
  } catch (error) {
    console.log(error);
    return res.status(422).json({ errors: error });
  }
})

usersRouter.get("/:username", async (req, res) => {
  const { params, user } = req
  const { username } = params
  console.log(username);
  try {
    const userProfile = await User.query()
      .findOne({ username })
    if (!userProfile) {
      throw new Error("user not found")
    }
    const serializedUser = await UserSerializer.getDetails(userProfile)
    return res.status(200).json({ userProfile: serializedUser })
  } catch (error) {
    res.status(500).json({ errors: error })
  }
})

usersRouter.get("/", async (req, res) => {
  try {
    const users = await User.query()
    const serializedUsers = await users.map(user => {
      return UserSerializer.getUsername(user)
    })
    return res.status(200).json({ users: serializedUsers })
  } catch (error) {
    return res.status(200).json({ errors: error })
  }
})

export default usersRouter;
