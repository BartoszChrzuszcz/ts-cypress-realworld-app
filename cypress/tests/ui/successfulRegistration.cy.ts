// remake from POM to Cypress support folder selectors and helper functions

import { loginPage, userKB } from "../../pages/LoginPage";
import { registerPage } from "../../pages/RegisterPage";
import { defaultPassword } from "../../support/users";
import {
  preservedFirstName,
  preservedLastName,
  preservedUserName,
} from "../../support/randomizedFakerData";

describe("Registering an account", () => {
  before(() => {
    cy.visit("/signin");
  });

  it("Visits the login page and checks if the -- Dont have an account? Sign Up -- button is available", () => {
    cy.url().should("include", "/signin");
    loginPage.registerAnAccountLink.isVisible();
  });

  it("Navigates to the Account registration page and checks for required page elements and empty inputs error visibility", () => {
    cy.visit("/signin");
    loginPage.registerAnAccountLink.click();
    cy.url().should("include", "/signup");

    registerPage.formInputIds.forEach((inputId: string, index) => {
      cy.get(inputId).isVisible().click().blur();
      const helperText = registerPage.formInputHelperTexts[index];
      cy.contains(helperText).isVisible();
    });
  });

  it.only("Fills out the user registration form and registers a new user", () => {
    cy.visit("/signup");

    registerPage.firstNameInputField.type(preservedFirstName);
    registerPage.lastNameInputField.type(preservedLastName);
    registerPage.usernameInputField.type(preservedUserName);
    registerPage.passwordInputField.type(defaultPassword, { log: false });
    registerPage.confirmPasswordInputField.type(defaultPassword, { log: false });

    cy.intercept("POST", `**/users`).as("registerInterception");

    registerPage.signUpButton.click();

    cy.wait("@registerInterception").then((interception) => {
      const requestPayload = interception.request.body;

      // Assert against the request payload
      expect(requestPayload).to.deep.equal({
        firstName: preservedFirstName,
        lastName: preservedLastName,
        username: preservedUserName,
        password: defaultPassword,
        confirmPassword: defaultPassword,
      });
    });
  });
});
