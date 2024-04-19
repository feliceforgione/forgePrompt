This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Setup Packages

### Prettier

- added `.prettierrc.json` config file
- added `.prettierignore` ignore file
- added prettier script command to `package.json`

### Eslint

- using the version that comes with next.js

### Husky

- added a `pre-commit` file that runs lint-staged command
- added a `pre-push` file that runs tests

### Lint Staged

- added `.lintstagedrc.json` config file to tell what files to run eslint and prettier on

## Validation

### Zod

## Utils

### Error Handling Function

- returns a function to wrap a function in try catch block and handle various errors (Zod, Error, Custom)

## Testing

### Vitest

- created a `tests` folder in root. Place tests here.
  - added a `setup.ts` file to simplify testing
- added test command in `package.json`
- added test:ui command in `package.json`
  - visit http://localhost:51204/**vitest**/
- added coverage command in `package.json`
  - `coverage` folder added to root.
    - right click on the `index.html` file and open in browser
  - Added `coverage` folder to `.gitignore`
- updated `vitest.config.ts` file
  - added global flag to true
  - added setupFiles list
- updated `tsconfig.json`
  - added "types": ["vitest/globals"]

### React Testing Library

### JSDOM

- DOM emulator
- Added `vitest.config.ts` to setup testing environment

### @testing-library/jest-dom

- Adds DOM related matchers and assertions

## Docker

## Postgres Database

- docker image
- update env values

## Prisma

- update env values
- create models in `./prisma/schema.prisma`
- push models to database using `npx migrate dev --name migrationName`

### Edit `next.config.mjs`

- Add the following output option
  ```
  const nextConfig = {
    output: "standalone",
  };
  ```

### Build the image

- `docker build . -t nextjs-app`

### Start the docker

- `docker run -p 3000:3000 nextjs-app`

## Miscellaneous

## .vscode folder

- added a `settings.json` file
  - adds a files.associations rule for tailwind

# Usage

## Docker Compose

- `docker compose up -d`
