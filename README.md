# AI Generated Images

Full-stack web app for generating images from text prompts, sharing them to a community feed, and managing likes and personal posts.

## Features
- Generate images with DALL·E via the OpenAI Images API
- Share generated images to a community gallery
- Search posts by name or prompt
- User authentication with JWT + bcrypt
- Like and save favorite images
- Cloudinary image hosting

## Tech Stack
- Frontend: React, Vite, Tailwind CSS, React Router
- Backend: Node.js, Express, MongoDB (Mongoose), JWT, bcryptjs
- Integrations: OpenAI Images API, Cloudinary

## Project Structure
- `client/` React frontend
- `server/` Express API and MongoDB models

## Screenshots
<img width="1440" height="900" alt="Screenshot 2026-02-08 at 11 17 46 AM" src="https://github.com/user-attachments/assets/742fc11a-55cf-4b0e-832f-eed920e6b25c" />
<img width="1440" height="900" alt="Screenshot 2026-02-08 at 11 18 47 AM" src="https://github.com/user-attachments/assets/02310a0e-6b75-49c6-8404-73a004a734b7" />
<img width="1440" height="900" alt="Screenshot 2026-02-08 at 11 19 29 AM" src="https://github.com/user-attachments/assets/4e63344f-3d5c-4047-aa25-d57fbd90ed81" />

## Environment Variables
Create a `.env` file in `server/` with:

```env
PORT=8080
MONGODB_URL=your_mongodb_connection_string
OPENAI_API_KEY=your_openai_api_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
JWT_SECRET=your_jwt_secret
```

## Getting Started

### 1) Install dependencies
```bash
cd server
npm install
```

```bash
cd client
npm install
```

### 2) Run the backend
```bash
cd server
npm start
```

The API runs at `http://localhost:8080` by default.

### 3) Run the frontend
```bash
cd client
npm run dev
```

The app runs at the Vite dev server URL shown in your terminal.

## API Routes (Summary)
- `POST /api/register` Register a new user
- `POST /api/login` Login and receive a JWT
- `POST /api/v1/dalle` Generate an image from a prompt
- `GET /api/v1/post` Get all posts
- `POST /api/v1/post` Create a new post (auth required)
- `GET /api/v1/post/:userId` Get a user’s posts (auth required)
- `POST /api/v1/post/:postId/like` Toggle like (auth required)
- `GET /api/v1/post/:userId/likes` Get user’s liked posts (auth required)
- `DELETE /api/v1/post/delete/:postId` Delete a post (auth required)

## Notes
- This project expects a running MongoDB instance and valid API keys.
- Cloudinary is used to store generated images for sharing.
