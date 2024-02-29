# Vepr Contributing Guidelines

Vepr is still in active development and in research mode, so any external
contributing is not expected at the moment. If you wish to dig into the project
internals and found yourself making what seem to be meaningful changes, here are
the conventions to consider before opening a pull request.

1. The code is written in JavaScript following ECMAScript 2017 standard. Just a
   handful of features from 2017 standard is being used frequently though. The
   code is being shipped as is, no additional compilation happening before
   publishing to NPM registry.
2. JSDoc syntax is used for most of the functions, public ones in particular.
   Type signatures need to be supported by [TypeScript][typescript-jsdoc] for
   better integration with Language Server Protocol and ability to generate
   typing files for the users.
3. Make sure to have [Prettier][prettier] integration enabled in your text
   editor of choice. It is better to keep the code formatting uniform to avoid
   unnecessary symbol shuffling. Ensure the integration picks up the project's
   Prettier config.
4. Testing code is written in TypeScript to ensure typings can also be verified
   as a part of writing integration tests.

[typescript-jsdoc]:
  https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html
[prettier]: https://prettier.io
