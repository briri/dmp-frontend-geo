# Geo DMP Dashboard Coding Exercise

## Developer Notes

- The sort function doesn't provide any value given the IDs given as the dmp lists for each id is only one
- Sort does a client side sort, but there are usually server side sorting implementations that were not found
- Used Material UI as a quick fix for styling, but would normally more carefully consider styling options
- Tests setup as an example of how tests would be setup, does not provide good test coverage
- types are based on usage, not on api spec
- dmp record form within the scope of the exercise, and not based on expected ux spec
- In order for better accessibility and ease of development a form library should be implemented (ex: required field handling)
- Ran into CORS issues that seemed like they should be resolved server-side, so used browser extension as a workaround.
- Exercise was done while on vacation, so time was limited

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need to install the software and how to install them.

```bash
node --version
npm --version
```

Ensure that you have Node.js and npm installed on your system. If not, you can download and install them from [Node.js website](https://nodejs.org/).

### Installing

A step-by-step series of examples that tell you how to get a development environment running.

First, clone the repository:

```bash
git clone [repository URL]
cd [repository name]
```

Then install the dependencies:

```bash
npm install
```

### Running the Application

To run the application in development mode, execute:

```bash
npm run dev
```

This will start the Vite server. By default, the application will be available at `http://localhost:3000` in your browser.

### Building for Production

To build the application for production, use:

```bash
npm run build
```

This command will generate a `dist` directory with the compiled assets.

### Running Production Build Locally

If you want to test the production build on your local machine, you can use:

```bash
npm run preview
```

This will serve the content of the `dist` directory on a local web server, typically at `http://localhost:5000`.

## Contributing

Instructions for how to contribute to this project.

## License

This project is licensed under the [LICENSE NAME] License - see the LICENSE file for details
