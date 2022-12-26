### Tech Stack:
- Docker
- Typescript
- NestJS
- MongoDB

#### Notable libraries:
- Fastify: Web framework
- Mongoose: MongoDB interaction
- Passport: Authentication

### Install and Run:

```docker-compose up -d```

Tested on docker for Linux

The application is running on debug mode with file pooling, it may take a few seconds to transpile the application on the first run.

#### Node Container access: 

```docker exec -it backend-gyant /bin/bash```

#### Database access: 

```docker exec -it database-gyant /bin/bash```

##### Load sample data into mongodb
```
TODO_TODO_################################
```

### Tests:

##### To run the tests

```TODO_TODO_################################```

### Quality Tools:

##### Run linter

```docker exec -it backend-gyant npm run lint```

### Solution (backend only):

The following endpoints can be queried as stated in the postman collection.

- #### POST /signin (Log in)
1. Generates a jwt for authentication in order to achieve a true stateless application
2. Uses email and password for authenticating.

- #### GET /signout (Log out)
1. No backend logic as jwt invalidation is beyond the scope of this project.
2. JWT can be removed from the local storage on the frontend side to achieve the same result

- #### GET /case/open (Get open case)
1. Requires a user with "Doctor" authorization
2. Returns the oldest case that is still waiting for processing

- #### PATCH /case/:id (Update open case)
1. Requires a user with "Doctor" authorization
2. Updates an open case with a condition, time to label and doctor

##### Tests:
- Jest for tests (code coverage ~100%):
1) Integration: supertest & mongo memory server

### Remarks and future work:
1. Consider relational databases technologies for this kind of data
2. Improve JWT security (invalidation, expiration, scope, and so on)
3. GET /signin was left out of the project as there is no frontend

Doctor Case Label

Background

To obtain training data for our ML-based diagnosis, Gyant asks doctors to label medical cases
by reading the EHR (electronic health record) of a patient encounter and labeling it with a
diagnosis (condition).

An EHR is a text file that may look something like this:

The patient is a 32-year-old female who presents to Urgent Care complaining of a sore
throat that started 7 days ago. Developed into post nasal drip and then cough. No
measured fevers. Had chills and body aches at the onset that resolved after the first
day. A little facial headache with the congestion at times; better today. Some
pressure on and off in the ears, no pain, hearing loss, or tinnitus. Cough is mostly
dry, sometimes productive of clear sputum. Denies shortness of breath. Never smoker.
Has never needed inhalers. No history of pneumonia. Currently treating with ibuprofen
which helps. Tried some over-the-counter Mucinex ES and vitamin C.
A condition consists of an ICD-10 condition code and description, e.g.:

F411 
Generalized anxiety disorder

J00 Acute nasopharyngitis

Assignment
Create a web application that allows a doctor to review the EHR (one after another) and label it
with one of a number of conditions. The case id, doctor id, label, and time to label the case
should be recorded for each decision.

Data

Please find the list of conditions and sample cases here.

Technology

Back-end: Node.js (Nest.js or similar) and MongoDB

Front-end: React

Optionally, Typescript can be used. Make sure to provide all the steps required to setup and
launch your project in the README file.

Use Case
1) Doctor logs in using email/password (you can create a mock account in the DB)
2) The next case is presented
3) Doctor labels the case and moves on to the next one
4) When no more cases are left, a message "You are Done" is displayed
5) Doctor can log out and re-login at any point
   UI MockUp
   Notes
   ● Add a README.md file with detailed instructions you may find relevant, mainly on how
   to build (if necessary) and start the application.
   ● Make sure your service(s) and dependencies are fully configurable, especially regarding
   ports, to avoid conflict with other services and mongo instances.
   ● Make the smallest, atomic and logical commits possible with clear messages a