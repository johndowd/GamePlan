const userSignIn = (user, url) => {
  cy.visit(`${url}/user-sessions/new`)
  cy.get("form").within(() => {
    cy.findByLabelText("Email").type(user.email);
    cy.findByLabelText("Password").type(user.password);
    cy.root().submit();
  })
}

export default userSignIn