# Contributing to Steroid Guide

We love your input! We want to make contributing to Steroid Guide as easy and transparent as possible, whether it's:

- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features
- Becoming a maintainer

## We Develop with GitHub

We use GitHub to host code, to track issues and feature requests, as well as accept pull requests.

## We Use [Github Flow](https://guides.github.com/introduction/flow/index.html)

Pull requests are the best way to propose changes to the codebase. We actively welcome your pull requests:

1. Fork the repo and create your branch from `main`.
2. If you've added code that should be tested, add tests.
3. If you've changed APIs, update the documentation.
4. Ensure the test suite passes.
5. Make sure your code lints.
6. For documentation changes:
   - Run `npm run lint:md` to check markdown style
   - Run `npm run check:links` to verify all links are valid
   - Run `npm run check:spelling` to catch spelling errors
   - Run `npm run test:code-examples` to validate code examples
   - Keep documentation files under 10MB total size
7. Issue that pull request!

## Documentation Quality Standards

We maintain high documentation quality through automated checks:

1. **Markdown Style**: We follow consistent markdown formatting rules defined in `.markdownlint.json`. Common guidelines include:

   - Consistent header hierarchy
   - Proper list formatting
   - Code block syntax
   - Line length and spacing

2. **Link Validation**: All links in documentation must be valid and accessible. This includes:

   - Internal repository links
   - External references
   - API documentation links
   - Image references

3. **Spell Checking**: Documentation is spell-checked against:

   - Standard English dictionary
   - Project-specific terms in `.cspell.json`
   - Technical terminology

4. **Code Examples**: All code examples in documentation must be:

   - Syntactically correct
   - Properly formatted
   - Actually runnable
   - Up to date with current APIs

5. **Size Management**: To maintain performance:
   - Keep individual markdown files concise
   - Optimize images
   - Total documentation size should stay under 10MB

## Any contributions you make will be under the MIT Software License

In short, when you submit code changes, your submissions are understood to be under the same [MIT License](http://choosealicense.com/licenses/mit/) that covers the project. Feel free to contact the maintainers if that's a concern.

## Report bugs using GitHub's [issue tracker](../../issues)

We use GitHub issues to track public bugs. Report a bug by [opening a new issue](../../issues/new); it's that easy!

## Write bug reports with detail, background, and sample code

**Great Bug Reports** tend to have:

- A quick summary and/or background
- Steps to reproduce
  - Be specific!
  - Give sample code if you can.
- What you expected would happen
- What actually happens
- Notes (possibly including why you think this might be happening, or stuff you tried that didn't work)
- Screenshots (the project automatically generates screenshots during builds, check the `/screenshots` directory for reference)

## Visual Changes and Screenshots

The project maintains a collection of full-page screenshots for every route in the `/screenshots` directory. These are automatically updated during the build process to help track visual changes:

1. When making UI changes, run `npm run build` to update the screenshots
2. Include relevant screenshot changes in your pull request
3. Review the screenshot diffs to ensure your changes have the intended visual impact
4. For visual bugs, reference the relevant screenshots from the `/screenshots` directory

You can also manually capture screenshots using `npm run screenshots` (requires the development server to be running) if you need to document specific states or conditions.

## License

By contributing, you agree that your contributions will be licensed under its MIT License.
