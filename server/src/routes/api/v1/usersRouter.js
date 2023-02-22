import express from "express";
import { User } from "../../../models/index.js";
import uploadImage from "../../../services/uploadImage.js";
import UserSerializer from "../../../serializers/UserSerializer.js";
import { ValidationError } from "objection";

const usersRouter = new express.Router();

usersRouter.post("/", async (req, res) => {
  const { email, password, username, passwordConfirmation } = req.body;
  try {
    const persistedUser = await User.query().insertAndFetch({ email, password, username });
    return req.login(persistedUser, () => {
      return res.status(201).json({ user: persistedUser });
    })
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data });
    }
    return res.status(500).json({ errors: error })
  }
})

usersRouter.post("/:userId/profile-image", uploadImage.single("image"), async (req, res) => {
  const { userId } = req.params
  try {
    const image_url = req.file.location
    const userToUpdate = await User.query().findById(userId)
    await userToUpdate.$query().patch({ image_url })
    return res.status(201).json({ image_url })
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

usersRouter.patch("/:userId", async (req, res) => {
  const { userId } = req.params
  const { body } = req
  try {
    const userUpdate = await User.query().findById(userId)
    const user = await userUpdate.$query().patchAndFetchById(userId, body)
    return res.status(200).json({ user })
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data })
    }
    return res.status(500).json({ error: error })
  }
})

usersRouter.get("/:username", async (req, res) => {
  const { params } = req
  const { username } = params
  try {
    const userProfile = await User.query().findOne({ username })
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
      return UserSerializer.getSummary(user)
    })
    return res.status(200).json({ users: serializedUsers })
  } catch (error) {
    return res.status(200).json({ errors: error })
  }
})

export default usersRouter;
