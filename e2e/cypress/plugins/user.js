/// <reference types="Cypress" />

const userSignIn = async (user) => {
  const got = await import("got")
  const resp = await got.got(`${Cypress.config().baseUrl}/api/v1/user-sessions`, {
    method: "POST",
    body: user,
    headers: {
      "Content-Type": "application/json"
    }
  })
  return resp
}


module.exports = { userSignIn }