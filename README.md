# AI Article Summarizer - CSCI-210-01

## Overview

This repository contains an AI Article Summarizer built using the MERN (MongoDB, Express.js, React.js, Node.js) stack with Vite for the frontend. The application allows users to summarize articles by providing either the article text or a link to the article. 

## Features

- **Article Summarization**: Users can input article text or provide a link to an article for summarization.
- **User-Friendly Interface**: The React.js frontend, powered by Vite, provides an intuitive and user-friendly interface for easy interaction.
- **MongoDB Database**: MongoDB is used to store user data, including summarized articles for future reference.
- **Secure Authentication**: User authentication is implemented to ensure secure access to the summarization services.
- **Responsive Design**: The application is designed to be responsive, ensuring a seamless experience across different devices.

## Installation

1. **Clone the Repository:**
    ```bash
    git clone https://github.com/your-username/ai-article-summarizer.git
    cd ai-article-summarizer
    ```

2. **Install Dependencies:**
    - Backend:
        ```bash
        cd server
        npm install
        ```
    - Frontend:
        ```bash
        cd client
        npm install
        ```

3. **Set Up Environment Variables:**
    - Create a `.env` file in the `backend` directory with the following content:
        ```
        MONGODB_URI=<your-mongodb-uri>
        SECRET_KEY=<your-secret-key>
        ```

4. **Run the Application:**
    - Backend:
        ```bash
        cd server
        npm start
        ```
    - Frontend:
        ```bash
        cd client
        npm run dev
        ```

5. **Access the Application:**
    Open your browser and go to `http://localhost:5173` to use the AI Article Summarizer.

## Usage

1. **User Registration/Login:**
    - Users need to register or log in to access the article summarization services.

2. **Summarize an Article:**
    - After logging in, users can input article text or provide a link to an article for summarization.

3. **View Summarized Articles:**
    - Summarized articles are stored in the user's profile for future reference.


## Contributors

Utsav Ghimire and Aditya Dhakal


