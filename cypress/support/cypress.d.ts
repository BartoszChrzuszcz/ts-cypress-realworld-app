type LoginCredentials = {
  username: string;
  password: string;
};

type LoginSelectors = {
  usernameInputField: string;
  passwordInputField: string;
  rememberMeCheckbox: string;
  rememberMeLabel: string;
  signInButton: string;
  registerAnAccountLink: string;
};

// import { mount } from "cypress/react";

// Augment the Cypress namespace to include type definitions for
// your custom command.
// Alternatively, can be defined in cypress/support/component.d.ts
// with a <reference path="./component" /> at the top of your spec.

namespace Cypress {
  interface Chainable {
    loginSession(userCredentials: LoginCredentials): Chainable<VoidFunction>;
    login(username, password): Chainable<VoidFunction>;
    isVisible(): Chainable<VoidFunction>;
  }
}
