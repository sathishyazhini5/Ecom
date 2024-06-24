# Backend app
## 1. Project Structure
### config: In future it should hold the configuration files for database, environment variables, and middleware functions. For now it just exports the env variables.
### controllers: API logic.
### middlwares: please add all middleware used in routes.
### routes: Defines API routes. 
1. Specify the URL path for the endpoint
2. ${path} is a placeholder for the base URL of your API
3. followed by middleware
4. then main logic
5. add the router in the index.ts.
### services: If an API logic is being reused in more than one conroller, please add it in the service folder.
### types: Contains TypeScript declaration files for type definitions used across the project. For example, if there are types used in vehicle controller, create a vehicle.ts file and add all vehicle types in it. Should not add database model types in it, database model types are generated and exported by `@prisma/client`
### utils: Utility functions, such as helppers, loggers and error handlers.
### app.ts: 
1.	Initializes the Express application
2.	loads pluggins
3.	checks health
4.	load routes
5.	configure swagger
6.	lastly handles error in backend if any error is not handled by mistake
## 2. How to setup project?
1.  Install Node version 18 or above
2.  Install pnpm using brew
3.  `pnpm init`
4.  `pnpm install`
5.  `pnpm prisma:generate`
6.  `pnpm dev` - this starts dev
