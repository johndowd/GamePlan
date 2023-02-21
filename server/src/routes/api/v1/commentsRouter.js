import express from "express"
import { Comment } from "../../../models/index.js"
import CommentSerializer from "../../../serializers/CommentSerializer.js"

const commentsRouter = new express.Router()

commentsRouter.post("/:planId", async (req, res) => {
  const { body, user } = req
  const { planId } = req.params
  if (!user) {
    return res.status(401).json({ errors: "Not signed in" })
  }
  try {
    const comment = await Comment.query().insert({
      userId: user.id, planId, text: body.text
    })
    const serializedComment = await CommentSerializer.getDetails(comment)
    return res.status(201).json({ comment: serializedComment })
  } catch (error) {
    res.status(500).json({ errors: error })
  }
})

export default commentsRouter