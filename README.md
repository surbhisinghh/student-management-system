# Student Management REST API

Lab Assignment 2 — Web Dev III (Node.js & Express Backend), Unit 2.

## Run

```bash
cd student-management-api
npm install
npm start
```

Server: http://localhost:3000

## Endpoints

| Method | Endpoint        | Description        | Success |
| ------ | --------------- | ------------------ | ------- |
| GET    | /               | Health message     | 200     |
| GET    | /students       | All students       | 200     |
| GET    | /students/:id   | Single student     | 200     |
| POST   | /students       | Create student     | 201     |
| PUT    | /students/:id   | Update student     | 200     |
| DELETE | /students/:id   | Delete student     | 200     |

Errors: 400 (invalid id / missing or invalid fields), 404 (student or route not found).

## Sample body (POST / PUT)

```json
{
  "name": "Aman",
  "age": 20,
  "course": "BTech CSE",
  "email": "aman@example.com"
}
```

Data is stored in a JavaScript array in `data/students.js` and lives only while the server runs.
