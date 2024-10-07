# NestJS GraphQL XML Parser Challenge

This is a Nest.js back-end service that parses vehicle make data from an XML service, transforms it into JSON, stores the data in a PostgreSQL database using Prisma ORM, and exposes the data via a GraphQL API.

## Key Features

- Parses a vehicle make XML service and delivers a JSON response.
- JSON response is based on the following interfaces:

  ```ts
  interface VehicleMake {
    makeId: number;
    makeName: string;
    vehicleTypes: VehicleType[];
  }

  interface VehicleType {
    typeId: number;
    typeName: string;
  }
  ```

- Transformed data is stored in a PostgreSQL database using Prisma ORM.
- Exposes a GraphQL endpoint to access the stored data.
- Built using TypeScript.
- Dockerized for easy setup and deployment.

## Prerequisites

Make sure you have the following installed:

- [Docker](https://www.docker.com/get-started)
- [Node.js](https://nodejs.org/)

## How to Run

### 1. Clone the Repository

```bash
git clone https://github.com/mitri-dvp/nestjs-graphql-xml-challenge
cd nestjs-graphql-xml-challenge
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory. You can refer to the `.env.example` file or use the following sample variables:

```.env
# Server
PORT=3000

# Database
DATABASE_URL=postgresql://postgres:password@localhost:5432/mydb
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=password
POSTGRES_DB=mydb

# PgAdmin
PGADMIN_DEFAULT_EMAIL=admin@example.com
PGADMIN_DEFAULT_PASSWORD=password
```

### 4. Run Docker

To start the application and PostgreSQL database, run the following command:

```bash
docker-compose up -d
```

### 5. Access GraphQL Playground

Once the service is up, you can access the GraphQL Playground at:

```
http://localhost:3000/graphql
```

## Sample GraphQL Query

Use the following GraphQL query to fetch vehicle data:

```gql
query GetVehicles {
  vehicles {
    makeName
    makeId
    vehicleTypes {
      typeId
      typeName
    }
  }
}
```

## Sample Response

```json
[
  {
    "makeId": 123,
    "makeName": "MAKE_NAME",
    "vehicleTypes": [
      {
        "typeId": 456,
        "typeName": "TYPE_NAME"
      }
    ]
  }
]
```
