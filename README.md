# Color Picker

## Overview
This project is a color picker application built using HTML Canvas and TypeScript. It allows users to interact with an image and select colors from it while also zooming parts of the image.

## Installation
To get started with this project, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd color-picker
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

## Usage

### Build and Start the Application
To build and start the application, run:
```bash
npm start
```
This command compiles TypeScript files and starts a live server to serve the application on `http://localhost:8080`.

### Development Mode
For development with automatic TypeScript compilation, run:
```bash
npm run dev
```
This command watches TypeScript files for changes and recompiles them as needed.

## Scripts

- **build**: Compiles TypeScript files (`*.ts`) to JavaScript (`*.js`) using `tsc`.
- **serve**: Starts a live server using `live-server` to serve the application on `http://localhost:8080`.
- **start**: Runs `build` followed by `serve`.
- **dev**: Watches TypeScript files (`*.ts`) and recompiles them automatically using `tsc -w`.


## Dependencies

- **TypeScript**: Provides TypeScript language support for the project.
- **live-server**: Lightweight development server with live reloading capability.
- **nodemon**: Utility to monitor for changes in the TypeScript files and restart the server.
- **ts-node**: TypeScript execution environment for running TypeScript files without compilation.