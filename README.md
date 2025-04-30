# Tact API Backend

This is the backend API for the Tact Department Management system, built with NestJS, GraphQL, Postgres and Prisma.


You can access the backend here: [render](https://tact-app.onrender.com)


## Overview

This API provides endpoints for user authentication (registration and login via REST) and GraphQL operations for managing departments and sub-departments. It uses JWT for securing GraphQL endpoints.

## Core Technologies

*   **Framework:** NestJS
*   **Language:** TypeScript
*   **API:** GraphQL (Code-first approach), REST (for Auth)
*   **ORM:** Prisma
*   **Database:** PostgreSQL (implied by typical Prisma usage, verify if different)
*   **Authentication:** JWT (JSON Web Tokens) via `@nestjs/jwt` and Passport (`passport-jwt`)
*   **Validation:** Zod, Class Transformer

## Features

*   **Authentication (REST):**
    *   `POST /auth/register`: User registration (username, password).
    *   `POST /auth/login`: User login, returns JWT `access_token`.
*   **GraphQL API (`/graphql`):**
    *   **Protected:** Requires valid JWT `Bearer` token in `Authorization` header (see [API Interaction](#api-interaction-graphql-playground) below).

    ### Departments

    #### `getDepartments`
    Fetches departments with pagination support. Returns a list of departments (`items`) and the total number of departments (`totalCount`). Takes an optional `pagination` input (`take`, `skip`).

    ```graphql
    query GetDepartments($pagination: PaginationInput) {
      getDepartments(pagination: $pagination) {
        items {
          id
          name
          subDepartments {
            id
            name
          }
        }
        totalCount
      }
    }
    ```
    *Example Variables (Page 1, 5 items):*
    ```json
    {
      "pagination": {
        "take": 5,
        "skip": 0
      }
    }
    ```
    *Example Variables (Fetch all - omit pagination):*
    ```json
    {}
    ```

    #### `getDepartmentById`
    Fetches a single department by its ID.

    ```graphql
    query GetDepartmentById($id: String!) {
      getDepartmentById(id: $id) {
        id
        name
        subDepartments {
          id
          name
        }
      }
    }
    ```
    *Example Variables:*
    ```json
    {
      "id": "your-department-uuid"
    }
    ```

    #### `createDepartment`
    Creates a new department, optionally with embedded sub-departments.

    ```graphql
    mutation CreateNewDepartment($input: CreateDepartmentInput!) {
      createDepartment(input: $input) {
        id
        name
        subDepartments {
          id
          name
        }
      }
    }
    ```
    *Example Variables (with sub-departments):*
    ```json
    {
      "input": {
        "name": "New Main Department",
        "subDepartments": [
          { "name": "New Sub 1" },
          { "name": "New Sub 2" }
        ]
      }
    }
    ```
    *Example Variables (without sub-departments):*
    ```json
    {
      "input": {
        "name": "Another Main Department"
      }
    }
    ```

    #### `updateDepartment`
    Updates an existing department's name.

    ```graphql
    mutation UpdateExistingDepartment($input: UpdateDepartmentInput!) {
      updateDepartment(input: $input) {
        id
        name
        subDepartments {
          id
          name
        }
      }
    }
    ```
    *Example Variables:*
    ```json
    {
      "input": {
        "id": "existing-department-uuid",
        "name": "Updated Department Name"
      }
    }
    ```

    #### `deleteDepartment`
    Deletes a department by its ID (cascades to sub-departments).

    ```graphql
    mutation DeleteExistingDepartment($id: String!) {
      deleteDepartment(id: $id) {
        id
        name
      }
    }
    ```
    *Example Variables:*
    ```json
    {
      "id": "department-uuid-to-delete"
    }
    ```

    ### Sub-Departments

    #### `getSubDepartments`
    Fetches all sub-departments.

    ```graphql
    query GetAllSubDepartments {
      getSubDepartments {
        id
        name
        departmentId
      }
    }
    ```
    *Example Variables:* `{}`

    #### `getSubDepartmentById`
    Fetches a single sub-department by its ID.

    ```graphql
    query GetSubDepartmentById($id: String!) {
      getSubDepartmentById(id: $id) {
        id
        name
        departmentId
      }
    }
    ```
    *Example Variables:*
    ```json
    {
      "id": "your-sub-department-uuid"
    }
    ```

    #### `createSubDepartment`
    Creates a new sub-department linked to an existing parent department.

    ```graphql
    mutation CreateNewSubDepartment($input: CreateSubDepartmentInput!) {
      createSubDepartment(input: $input) {
        id
        name
        departmentId
      }
    }
    ```
    *Example Variables:*
    ```json
    {
      "input": {
        "name": "Specific Sub-Department",
        "departmentId": "parent-department-uuid"
      }
    }
    ```

    #### `updateSubDepartment`
    Updates an existing sub-department's name.

    ```graphql
    mutation UpdateExistingSubDepartment($input: UpdateSubDepartmentInput!) {
      updateSubDepartment(input: $input) {
        id
        name
        departmentId
      }
    }
    ```
    *Example Variables:*
    ```json
    {
      "input": {
        "id": "sub-department-uuid-to-update",
        "name": "Updated Sub-Dept Name"
      }
    }
    ```

    #### `deleteSubDepartment`
    Deletes a sub-department by its ID.

    ```graphql
    mutation DeleteExistingSubDepartment($id: String!) {
      deleteSubDepartment(id: $id) {
        id
        name
        departmentId
      }
    }
    ```
    *Example Variables:*
    ```json
    {
      "id": "sub-department-uuid-to-delete"
    }
    ```
*   **Database:** Uses Prisma for database interactions and migrations.

## Project Structure

```
.
├── prisma/
│   ├── migrations/         # Database migration history
│   └── schema.prisma       # Prisma schema definition
├── src/
│   ├── auth/               # Authentication (REST Controller, Service, JWT Strategy, Guard)
│   ├── common/             # Common utilities, types (e.g., GraphQL types)
│   ├── departments/        # Departments module (Resolver, Service, DTOs)
│   ├── prisma/             # Prisma service module
│   ├── sub-departments/    # Sub-Departments module (Resolver, Service, DTOs)
│   ├── user/               # User service (used by Auth)
│   ├── app.module.ts       # Root application module
│   ├── app.service.ts      # Root app service (if any)
│   └── main.ts             # Application entry point
├── test/                  
├── .env                    # Environment variables (DATABASE_URL, JWT_SECRET)
├── .eslintrc.js
├── .gitignore
├── nest-cli.json
├── package.json
├── README.md               
├── schema.gql            
├── tsconfig.build.json
└── tsconfig.json
```

## Database Setup (Prisma)

This project uses Prisma to manage database schema and interactions.

1.  **Schema:** The database schema is defined in `prisma/schema.prisma`.
2.  **Migrations:** Prisma Migrate is used for database schema migrations.
    *   To create a new migration after changing `schema.prisma`:
        ```bash
        npx prisma migrate dev --name your_migration_name
        ```
    *   To apply pending migrations to the database:
        ```bash
        npx prisma migrate deploy
        ```
3.  **Prisma Client:** Prisma Client is generated based on the schema and used by services (`src/prisma/prisma.service.ts`) to interact with the database. It's automatically generated during `prisma migrate dev` or can be generated manually:
    ```bash
    npx prisma generate
    ```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```dotenv
# Example for PostgreSQL
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"

# Secret key for signing JWT tokens
JWT_SECRET="YOUR_SUPER_SECRET_KEY_CHANGE_ME"
```

*   Replace `USER`, `PASSWORD`, `HOST`, `PORT`, and `DATABASE` with your actual database connection details.
*   Replace `YOUR_SUPER_SECRET_KEY_CHANGE_ME` with a strong, unique secret key.

**Important:** Add `.env` to your `.gitignore` file to prevent committing secrets.

## Installation

1.  Clone the repository.
    ```bash
    git clone https://github.com/profsam97/tact-app.git
    ```
2.  Navigate to the project directory (`tact-app`).
3.  Install dependencies:
    ```bash
    npm install
    ```
4.  Set up your `.env` file as described above.
5.  Ensure your database server is running.
6.  Apply database migrations:
    ```bash
    npx prisma migrate deploy
    ```
    (Or use `npx prisma migrate dev` if you're developing and need to sync schema changes).

## Running the Application

```bash
# Development (with watch mode)
npm run start:dev

# Production build
npm run build

# Start production build
npm run start:prod
```

The application typically starts on port 3000 (configurable in `src/main.ts`).

## API Interaction (GraphQL Playground)

When the application is running in development mode (`npm run start:dev`), you can usually access the GraphQL Playground by navigating to [backend url](http://localhost:3000/graphql) in your browser.

*   **Authentication:** For protected queries/mutations, you'll need to obtain a JWT token from the `/auth/login` endpoint and include it in the HTTP Headers section of the Playground:
    ```json
    {
      "Authorization": "Bearer YOUR_JWT_TOKEN_HERE"
    }

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!
