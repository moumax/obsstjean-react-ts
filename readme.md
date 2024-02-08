# How to start the project

## Technical stack

### Backend

- NodeJs (javascript) [https://nodejs.org/en]
- Express [https://expressjs.com/fr/]
- Argon2 [https://www.npmjs.com/package/argon2]
- Cookie-parser [https://www.npmjs.com/package/cookie-parser]
- Cors [https://www.npmjs.com/package/cors]
- JsonWebToken [https://www.npmjs.com/package/jsonwebtoken]
- Mysql2 [https://www.npmjs.com/package/mysql2]

### Frontend

- ReactJs (Typescript) [https://fr.legacy.reactjs.org/]
- ShadcnUi [https://ui.shadcn.com]
- Swr [https://swr.vercel.app/fr-FR]
- TailwindCss [https://tailwindcss.com/]
- Zod [https://zod.dev/]
- Lucid react [https://lucide.dev/]
- Leaflet [https://react-leaflet.js.org/]
- date-fns [https://date-fns.org/]

## Start the project

- Git clone this repo
- npm i
- on backend and frontend folder, npm i
- To install database, go to backend folder. Make sure de .db is named databased.db
- in backend folder, use npm run migrate. It will install the database automatically.

## Todo list

- 404 page
[] Add a 404 page

- Sun section
[] Add a loader on sun images when not displayed

- Photo section
[] Add Uploading photos and administration

- Members
[x] Update members's list in administration
[x] Add new section in member list (cotisations...)
[] Hydrate member's list

- Events
[x] Add function add event in administration
[] Fix events display in frontend
[] Remove in home the modifiers buttons
[] Add hours to events

- Users
[x] See what to put in the user cookie (email, role, name...)
[x] Add a role checker in backend with a middleware
[] Provide a way to send emails for inscription with a dynamic link if possible
[] Add a new status for users by default "member"
[] Add a function for users to modify email and password
