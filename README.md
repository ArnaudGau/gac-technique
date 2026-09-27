# GAC Technical Case Study

A React and TypeScript application that imports a DSN file, parses it on the server, maps available employee data to ESG/CSRD questions, and exports the completed questionnaire as a Word document.

## Main features

- Server-side DSN file upload and parsing
- Recursive rendering of nested questions
- Automatic mapping and aggregation of employee data
- Controlled inputs for missing or editable answers
- Employee breakdown by contract category and gender
- Word (`.docx`) export
- Loading, success, and error states

## Running the project

### With Docker

Requirements:

- Docker with Docker Compose
- Make (optional)

Start the development environment:

```sh
make dev
```

The application is available at <http://localhost:44100>.

Useful commands:

```sh
make logs       # Display application logs
make down       # Stop and remove the development containers
make typecheck  # Run the TypeScript checks in Docker
make shell      # Open a shell in the application container
make clean      # Remove containers and the node_modules volume
```

Without Make, the equivalent commands are:

```sh
docker compose up --build -d
docker compose logs -f app
docker compose down
```

Run the automated tests in Docker:

```sh
docker compose run --rm app npm test
```

The host port can be changed if necessary:

```sh
APP_PORT=3000 make dev
```

### Without Docker

Requirements:

- Node.js 20 or later
- npm

Install the dependencies and start the application:

```sh
npm install
npm run dev
```

The application is available at <http://localhost:44100>.

Other useful commands:

```sh
npm test          # Run the automated tests
npm run typecheck # Run the TypeScript checks
npm run build     # Create the production frontend build
```

### Production image

```sh
make build
make start
```

The final image serves the compiled frontend as the non-privileged `node` user.

## Project structure

- `src/` contains the React application, questionnaire UI, upload component, and Word export.
- `server/dsn/` contains DSN parsing and employee extraction.
- `server/questions/` contains question CSV parsing.
- `server/answer/` contains mapping, normalization, and aggregation rules.
- `shared/` contains types shared by the frontend and backend.
- `data/` contains the example input files used by the case study.

The application intentionally separates parsing, extraction, business rules, aggregation, and presentation so that each concern can evolve and be tested independently.

## Use of AI

I used OpenAI Codex as a technical mentor and pair-programming assistant during this case study.

It was mainly used to:

- discuss architecture and data-modeling decisions;
- learn and clarify React and TypeScript concepts;
- review code and explain TypeScript errors;
- diagnose implementation and test failures;
- identify edge cases in the DSN parsing and aggregation logic;
- suggest automated tests and focused UI improvements.

I implemented and integrated the proposed changes incrementally, reviewed the generated code, and validated the result through TypeScript checks, automated tests, production builds, and manual testing.

Some focused changes, particularly the visual styling, were generated with AI assistance and then reviewed and adapted to the project.

## What I would improve next

1. **Extend the DSN mapping coverage**

   The current implementation deliberately supports a limited set of questions. I would add more mappings while keeping parsing, normalization, aggregation, and presentation concerns separated.

2. **Clarify and implement period averages**

   Calculating the average number of employees requires an explicit business definition and reliable period data. The current application allows these missing values to be entered manually.

3. **Add French and English language switching**

   The question source already contains French and English labels. I would preserve both during parsing and introduce an internationalization layer so users can switch language without reloading or duplicating components.

4. **Version the DSN reference data**

   Contract codes and other DSN nomenclatures evolve over time. I would introduce versioned reference data instead of keeping mapping rules directly in the application code.

5. **Improve validation and data provenance**

   I would clearly distinguish imported, calculated, manually entered, and manually overridden values. I would also add consistency checks between detailed rows and global totals.

6. **Add frontend tests**

   The server-side parsing and mapping logic is covered by automated tests. I would add React component and end-to-end tests for file upload, controlled inputs, table editing, error states, and Word export.

7. **Optimize the Word export bundle**

   The `docx` library increases the initial JavaScript bundle size. I would load it dynamically only when the user starts an export.

8. **Improve accessibility and UX**

   I would perform a complete keyboard and screen-reader review and add clearer progress feedback for longer imports and exports.

## Scope and trade-offs

This project prioritizes a small, demonstrable, and tested mapping flow over broad but incomplete DSN coverage. Some provided contract codes appear to be synthetic and do not match the official DSN nomenclature; unsupported values are therefore grouped explicitly under an `Other` category rather than being assigned an invented meaning.
