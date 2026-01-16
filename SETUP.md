# Quick Setup Guide

## Step 1: Install Dependencies
```bash
npm install
```

## Step 2: Create .env File

Create a `.env` file in the root directory with the following content:

```env
# Google Gemini API Configuration
GEMINI_API_KEY=AIzaSyAJIrfUO12TQC_fVyYLw5PMOSpMwh1rJxQ
GEMINI_MODEL=gemini-1.5-flash

# MySQL Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=medical_assistant
DB_PORT=3306

# Server Configuration
PORT=3000
NODE_ENV=development

# File Upload Configuration
MAX_FILE_SIZE=5242880
UPLOAD_DIR=uploads
```

**Important**: Update `DB_PASSWORD` if your MySQL requires a password.

## Step 3: Setup MySQL Database

### Option A: Using MySQL Command Line
```bash
mysql -u root -p < database.sql
```

### Option B: Manual Setup
1. Open MySQL command line or MySQL Workbench
2. Run the SQL commands from `database.sql`
3. Or create database manually:
   ```sql
   CREATE DATABASE medical_assistant;
   USE medical_assistant;
   ```
4. The tables will be created automatically when the server starts

## Step 4: Start the Server
```bash
npm start
```

## Step 5: Access the Application
Open your browser and go to: `http://localhost:3000`

## Troubleshooting

### Database Connection Issues
- Make sure MySQL server is running
- Check if database exists: `SHOW DATABASES;`
- Verify credentials in `.env` file
- The app will work without database, but won't store history

### API Key Issues
- Verify the Gemini API key is correct
- Check internet connection
- Ensure API key has proper permissions

### Port Already in Use
- Change `PORT=3001` in `.env` file
- Or stop the process using port 3000

