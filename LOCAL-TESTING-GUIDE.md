# How to Test `flexy-flag` in a Local React Project

This guide will walk you through setting up a local React project to test your `flexy-flag` package without publishing it to npm. This process, known as "linking," allows you to use your package in another project on your machine as if it were installed from the registry.

## Prerequisites

- Node.js (v18+ recommended)
- Your `flexy-flag` project folder.
- A terminal or command prompt.

---

## Step 1: Build and Link Your `flexy-flag` Package

First, you need to build your package and then create a global link to it.

1.  **Navigate to your package directory:**

    ```bash
    cd /Users/afaq/Documents/OPENSOURCE/flexy-flag/
    ```

2.  **Install dependencies and build the project:**
    This step compiles your TypeScript code into JavaScript in the `dist` folder, which is what other projects will consume.

    ```bash
    npm install
    npm run build
    ```

    > **Important**: You must re-run `npm run build` every time you make changes to your package's source code for them to appear in the test project.

3.  **Create the global link:**
    This command tells npm to create a symbolic link from your global `node_modules` folder to your project directory.
    ```bash
    npm link
    ```
    You should see a success message confirming the link was created.

---

## Step 2: Create a New React Test Project

Now, let's create a separate, clean React project to test `flexy-flag`. We'll use Vite for a fast and modern setup.

1.  **Navigate to a different directory** (e.g., your Desktop or a `projects` folder). Do **not** create this inside your `flexy-flag` folder.

    ```bash
    cd ~/Desktop
    ```

2.  **Create a new React + TypeScript project with Vite:**

    ```bash
    npm create vite@latest my-flag-test-app -- --template react-ts
    ```

3.  **Navigate into your new test app and install its dependencies:**
    ```bash
    cd my-flag-test-app
    npm install
    ```

---

## Step 3: Link `flexy-flag` to Your Test Project

Now, connect the global link you created in Step 1 to your new test project.

1.  **Inside the `my-flag-test-app` directory, run:**
    ```bash
    npm link flexy-flag
    ```
    This command creates a symbolic link inside your test app's `node_modules` folder that points to your local `flexy-flag` project. Your test app will now resolve `import ... from 'flexy-flag'` to your local code.

---

## Step 4: Use `flexy-flag` in Your React App

You can now import and use your components and functions from `flexy-flag` just like any other npm package.

1.  **Open `src/App.tsx`** in your `my-flag-test-app` project.
2.  **Replace its content with the following code** to test various features:

    ```tsx
    import './App.css';
    // This import will now resolve to your local flexy-flag project
    import { Flag } from 'flexy-flag';

    function App() {
      return (
        <div className='App'>
          <h1>flexy-flag Local Test</h1>
          <p>
            If you see the flags below, your local package is linked and working
            correctly!
          </p>
          <div className='flag-showcase'>
            <div className='flag-container'>
              <h3>United States (Default)</h3>
              <Flag code='US' size='64px' />
            </div>
            <div className='flag-container'>
              <h3>United Kingdom (Circle)</h3>
              <Flag code='GB' shape='circle' size='64px' />
            </div>
            <div className='flag-container'>
              <h3>Canada (Rounded)</h3>
              <Flag code='CA' shape='rounded' size='64px' />
            </div>
            <div className='flag-container'>
              <h3>Japan (Square)</h3>
              <Flag code='JP' shape='square' size='64px' ratio='1:1' />
            </div>
            <div className='flag-container'>
              <h3>Brazil (Pill)</h3>
              <Flag code='BR' shape='pill' width='90px' />
            </div>
            <div className='flag-container'>
              <h3>Invalid Flag (Should be empty)</h3>
              <Flag code='XX' size='64px' />
            </div>
          </div>
        </div>
      );
    }

    export default App;
    ```

3.  For better styling, open **`src/App.css`** and add these styles:
    ```css
    .flag-showcase {
      display: flex;
      flex-wrap: wrap;
      gap: 2rem;
      justify-content: center;
      margin-top: 2rem;
    }
    .flag-container {
      text-align: center;
      padding: 1rem;
      border: 1px solid #eee;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    }
    ```

---

## Step 5: Run the Test App

Start the development server to see your work.

1.  **From the `my-flag-test-app` directory, run:**

    ```bash
    npm run dev
    ```

2.  **Open your browser** to the URL provided (usually `http://localhost:5173`). You should see your React app displaying the flags from your local `flexy-flag` package.

---

## 🚨 Troubleshooting

### "Invalid Hook Call" Error

This is the most common problem when linking local React packages. It happens because your test app and your linked package might be using two different copies of React, which breaks hooks.

**Solution:** Tell Vite (the bundler for your test app) to always use the test app's version of React.

1.  Open `vite.config.ts` in your `my-flag-test-app` project.
2.  Add a `resolve.alias` configuration to force a single copy of React:

    ```ts
    import { defineConfig } from 'vite';
    import react from '@vitejs/plugin-react';
    import path from 'path'; // Make sure to import path

    // https://vitejs.dev/config/
    export default defineConfig({
      plugins: [react()],
      resolve: {
        alias: {
          react: path.resolve('./node_modules/react'),
          'react-dom': path.resolve('./node_modules/react-dom'),
        },
      },
    });
    ```

3.  Restart your dev server (`npm run dev`).

---

## How to Unlink

Once you're done testing, you can remove the links to clean up your environment.

1.  **In your test app (`my-flag-test-app`):**

    ```bash
    npm unlink flexy-flag
    ```

2.  **In your package (`flexy-flag`):**
    ```bash
    npm unlink
    ```
