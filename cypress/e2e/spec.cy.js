describe("landing page", () => {
  beforeEach(() => {
    cy.intercept("GET", "http://localhost:3001/api/v1/urls", {
      statusCode: 200,
      ok: true,
      fixture: "urls.json",
    });

    cy.visit("http://localhost:3000");
  });

  it("should display a header title", () => {
    cy.get("h1").should("be.visible").contains("URL Shortener");
  });

  it("should display a form with a title input, url input, and submit button", () => {
    cy.get("form").should("be.visible");
    cy.get("input").should("have.length", 2);
    cy.get("button").should("be.visible").contains("Shorten Please!");
  });

  

});
