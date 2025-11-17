# Deployment Instructions for VZT Construction Management App

This document provides instructions on how to deploy the VZT Construction Management application to a web server.

## Overview

The VZT application is a "static" web application. This means it consists only of HTML, CSS, and JavaScript files that run directly in the user's browser. It does not require a complex backend server, making it very easy to deploy.

You can host this application on any service that supports static file hosting.

## Prerequisites

You will need a web hosting provider. Here are a few popular options for static websites:
*   **Netlify**: Offers a very simple drag-and-drop deployment process.
*   **Vercel**: Another excellent platform for deploying frontend applications.
*   **GitHub Pages**: If your code is hosted on GitHub, this is a convenient and free option.
*   **Traditional Web Hosting**: Any standard web hosting provider (like GoDaddy, Bluehost, etc.) that gives you access to a file manager or FTP to upload files.

## Required Files

The application consists of the following essential files. You will need to upload all of them to your web server:

*   `index.html`
*   `style.css`
*   `app.js`

## Deployment Steps

The general process is to upload the required files to the root directory of your website.

### Method 1: Using a Drag-and-Drop Service (like Netlify or Vercel)

1.  **Sign up**: Create an account with a service like [Netlify](https://www.netlify.com/) or [Vercel](https://vercel.com/).
2.  **Prepare a folder**: Create a folder on your computer and place the three required files (`index.html`, `style.css`, `app.js`) inside it.
3.  **Deploy**:
    *   On the Netlify dashboard, you will see a section to "drag and drop your site folder".
    *   Drag the folder you created in the previous step and drop it onto the designated area.
4.  **Done**: Netlify will automatically upload your files and provide you with a public URL for your application.

### Method 2: Using GitHub Pages

1.  **Create a GitHub Repository**: If you haven't already, create a new repository on [GitHub](https://github.com/) and push your code to it.
2.  **Enable GitHub Pages**:
    *   Go to your repository's **Settings** tab.
    *   In the left sidebar, click on **Pages**.
    *   Under "Build and deployment", select a **Source**. Choose `Deploy from a branch`.
    *   Select the branch your code is on (usually `main` or `master`).
    *   Click **Save**.
3.  **Access your site**: GitHub will provide you with a URL (e.g., `https://<your-username>.github.io/<your-repo-name>/`). It may take a few minutes for the site to become active.

### Method 3: Using a Traditional Web Host (FTP/File Manager)

1.  **Access your host's file manager**: Log in to your web hosting control panel (like cPanel) and open the File Manager.
2.  **Navigate to the public directory**: Find the root directory for your website. This is often called `public_html`, `www`, or `htdocs`.
3.  **Upload the files**: Upload the `index.html`, `style.css`, and `app.js` files into this directory.
4.  **Visit your domain**: Once the files are uploaded, you should be able to see the application by navigating to your domain name (e.g., `http://www.yourdomain.com`) in a web browser.

---

That's it! Once the files are on a web server, the application is ready to be used by anyone with the URL.
