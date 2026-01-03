# Full Setup Guide: Database, Admin User, and Environment Variables

This guide provides all the steps needed to set up your MongoDB database, create a secure admin user, and configure your environment variables.

---

## 1. How to Create Your First Admin User

Follow these steps exactly to create an admin user you can use to log in.

### Step 1: Generate a Secure Password Hash

Your password cannot be stored as plain text. You must create a "hash" of it.

1.  **Open your terminal** or command line.
2.  **Run the script** I created for you. Replace `"your_secret_password"` with the password you want to use:
    ```bash
    node scripts/hash-password.js "your_secret_password"
    ```
3.  The script will output a long string of characters. This is your hashed password. It will look something like this:
    `$2a$10$AbCDeFgHiJkLmNoPqRsTu.vWxyz...`
4.  **Copy this entire hash.** You will need it in the next step.

### Step 2: Add the Admin User to MongoDB Atlas

1.  **Log in to your MongoDB Atlas account.**
2.  Navigate to your cluster and click the **"Browse Collections"** button.
3.  On the left, you will see your databases. If you haven't created one, create a new database named `ambalan_cms`.
4.  Within the `ambalan_cms` database, create a new collection named `admins`.
5.  Click on the `admins` collection and then click the **"Insert Document"** button.
6.  A window will appear with a JSON editor. Paste the following template into it:

    ```json
    {
      "username": "admin",
      "passwordHash": "PASTE_YOUR_HASHED_PASSWORD_HERE",
      "name": "Default Admin",
      "role": "super_admin",
      "status": "active"
    }
    ```
7.  **IMPORTANT:** Replace `"PASTE_YOUR_HASHED_PASSWORD_HERE"` with the actual hash you copied from the script in Step 1.
8.  Click the **"Insert"** button.

You can now log in to the admin panel at `/admin/login` using the username `admin` and the password you chose.

---

## 2. Database Structure

Your database should have the following collections. The seeding script I will create next will automatically create the `pages` and `media` collections for you.

*   `admins`: Stores user credentials. (You just created this).
*   `pages`: Stores all editable website content.
*   `media`: A library of all your images and their URLs.

---

## 3. Required Environment Variables (.env)

These are the secret keys for your application. You must add these to your Netlify site settings under **Site configuration > Build & deploy > Environment**.

*   `MONGO_URI`
    *   **Purpose**: Your full MongoDB Atlas connection string. **Make sure you include the database name in the path (e.g., `.../<db-name>?retryWrites...`).** Use `ambalan_cms` for the database name.
    *   **Example**: `mongodb+srv://<user>:<password>@<cluster-url>/ambalan_cms?retryWrites=true&w=majority`

*   `JWT_SECRET`
    *   **Purpose**: A long, random, secret string for securing login sessions.
    *   **How to generate**: Use a password manager or run `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"` in your terminal.

*   `CLOUDINARY_CLOUD_NAME`
    *   **Purpose**: Your Cloudinary account's cloud name, found on your dashboard.

*   `CLOUDINARY_API_KEY`
    *   **Purpose**: Your Cloudinary account API Key.

*   `CLOUDINARY_API_SECRET`
    *   **Purpose**: Your Cloudinary account's secret key. This must be kept secret.

---
## 4. Development Mode (Optional)

To work on the site locally without needing to connect to the database every time, you can use development mode.

1.  In the root of your project, create a file named `.env.development`.
2.  Add this line to the file:
    ```
    VITE_APP_DEV_MODE=true
    ```
3.  When you run `npm run dev`, the site will use the local data from `src/data/` instead of fetching from the API.
