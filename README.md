# TELEMED-AID


This service is part of the **TeleMed-Aid** platform. It handles user registration, authentication, and JWT-based authorization.
## 🛠️ Prerequisites
Before running this service, make sure you have:
- **Java 17+**
- **Maven**
- **MySQL running**
- **Eureka Discovery Server running on port `8761`**

## 🚀 Running the Service

### 1. Start Eureka Server
The Authentication Service registers itself with the Eureka Discovery Server.  
Make sure you start the Eureka Server **first**, on port `8761`.

## handle Enviroment variables
make `.env` file in root path 	`/authentication-service` then add those lines
`DB_USERNAME=database username`
`DB_PASSWORD=password`
