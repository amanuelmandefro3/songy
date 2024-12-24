# Songy

Songy - Addis Software Full-Stack Test Project

## Links

- [Frontend](https://songy-xi.vercel.app/)
- [Backend Swagger Documentation](https://songy-gbt1.onrender.com/api-docs/)

## Project Structure

- **Backend**
  - [.gitignore](backend/.gitignore)
  - [package.json](backend/package.json)
  - [Dockerfile](backend/Dockerfile)
  - [docker-compose.yml](backend/docker-compose.yml)
  - [src/app.ts](backend/src/app.ts)
- **Frontend**
  - [package.json](frontend/package.json)
  - [index.html](frontend/index.html)
  - [src/main.tsx](frontend/src/main.tsx)
  - [README.md](frontend/README.md)

## Getting Started

### Backend

1. Navigate to the `backend` directory:
    ```sh
    cd backend
    ```
2. Build the Docker containers:
    ```sh
    docker-compose build
    ```
3. Run the Docker containers:
    ```sh
    docker-compose up
    ```
4. The backend server will be running on `http://localhost:3000`.

### Frontend

1. Navigate to the `frontend` directory:
    ```sh
    cd frontend
    ```
2. Install dependencies:
    ```sh
    npm install
    ```
3. Run the development server:
    ```sh
    npm run dev
    ```
4. Build the project:
    ```sh
    npm run build
    ```

## Technologies Used

- **Backend**: TypeScript, Express, MongoDB, Swagger, Docker
- **Frontend**: React, TypeScript, Vite, Redux, Tailwind CSS