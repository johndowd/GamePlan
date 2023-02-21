class CommentSerializer {
  static async getDetails(comment) {
    const allowedAttributes = ["id", "text", "createdAt"]
    const serializedComment = {}

    for (const attr of allowedAttributes) {
      serializedComment[attr] = comment[attr]
    }

    serializedComment.user = await comment.$relatedQuery("user")
    serializedComment.plan = await comment.$relatedQuery("plan")
    return serializedComment
  }
}

export default CommentSerializer