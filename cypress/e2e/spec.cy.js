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
    cy.get("input[name=title]").should("exist").should("be.visible");
    cy.get("input[name=urlToShorten]").should("exist").should("be.visible");
    cy.get("button").should("be.visible").contains("Shorten Please!");
  });

  it("should display a section with a list of urls", () => {
    cy.get("section")
      .get(".url")
      .should("have.length", "1")
      .first()
      .should("be.visible")
      .get("h3")
      .should("contain", "Awesome photo")
      .get("a")
      .should("contain", "http://localhost:3001/useshorturl/1");
  });

  it("Should show the users inputs in the forms input fields", () => {
    cy.get("form")
      .get("input[name=title]")
      .type("Potato")
      .get("input[name=urlToShorten]")
      .type("http://www.heynicepotato.com/helloworld");

    cy.get("form").get("input[name=title]").should("have.value", "Potato");

    cy.get("form")
      .get("input[name=urlToShorten]")
      .should("have.value", "http://www.heynicepotato.com/helloworld");
  });

  it("Should render the new shortened url after a successful post", () => {
    cy.intercept("POST", "http://localhost:3001/api/v1/urls", {
      statusCode: 201,
      ok: true,
      body: {
        id: 2,
        long_url: "http://www.heynicepotato.com/helloworld",
        short_url: "http://localhost:3001/useshorturl/2",
        title: "Potato",
      },
    });

    cy.get("form")
      .get("input[name=title]")
      .type("Potato")
      .get("input[name=urlToShorten]")
      .type("http://www.heynicepotato.com/helloworld")
      .get("button")
      .click();

    cy.get("section")
      .get(".url")
      .should("have.length", "2")
      .eq(1)
      .should("be.visible")
      .get("h3")
      .should("contain", "Potato")
      .get("a")
      .should("contain", "http://localhost:3001/useshorturl/2");
  });

  it("Should render an error message if the user tries to submit an incomplete form", () => {
    cy.get("form")
      .get("input[name=title]")
      .type("Potato")
      .get("button")
      .click();

    cy.get("p").should("contain", "Please fill out all inputs");
  });

  it("Should clear the inputs after a successful post", () => {
    cy.intercept("POST", "http://localhost:3001/api/v1/urls", {
      statusCode: 201,
      ok: true,
      body: {
        id: 2,
        long_url: "http://www.heynicepotato.com/helloworld",
        short_url: "http://localhost:3001/useshorturl/2",
        title: "Potato",
      },
    });

    cy.get("form")
      .get("input[name=title]")
      .type("Potato")
      .get("input[name=urlToShorten]")
      .type("http://www.heynicepotato.com/helloworld")
      .get("button")
      .click();

    cy.get("form")
      .get("input[name=title]")
      .should("have.value", "")
      .get("input[name=urlToShorten]")
      .should("have.value", "");
  });
});
