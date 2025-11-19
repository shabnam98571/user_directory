# user_directory
A fully functional User Directory application built with HTML, CSS, JavaScript, and a backend powered by Node.js + Express with MySQL as the database. The project includes search, pagination, and user detail modal with clean UI and smooth API integration. Icons are integrated using LordIcons for a modern look.

A complete **User Directory Application** built using:

- **Frontend:** HTML, CSS, JavaScript  
- **Backend:** Node.js + Express  
- **Database:** MySQL  
- **Features:** Search, Pagination, User Detail Modal
- 
## 🚀 Features

✔ Paginated user list  
✔ Search by name, email, or city  
✔ User detail popup modal  
✔ Fully responsive UI  
✔ Backend auto-generates Indian users  
✔ Efficient API structure  
✔ Error handling included  

## 🔧 Backend Setup (Node + Express + MySQL)

### 1️⃣ Install Packages
Go inside backend folder:

--->cmd

cd backend
npm install
npm start

🛢 Database Setup (MySQL)
Create database first:
CREATE DATABASE user_directory;
Import SQL file:
user_directory.sql

Get Single User by ID
GET /users/:id

Parameters:

id - User ID (integer)

Example Requests:

http
GET http://localhost:5000/users/1
GET http://localhost:5000/users/25
Response:

json
{
  "id": 1,
  "name": "Aarav Sharma",
  "email": "aarav.sharma@gmail.com",
  "phone": "+91-98765-43210",
  "street": "123 MG Road",
  "city": "Mumbai",
  "zipcode": "400001",
  "company": "Sharma Enterprises",
  "created_at": "2025-01-19T21:17:18.000Z"
}

🧪 How to Run The Project (Step by Step)

1️⃣ Start MySQL
2️⃣ Import SQL file
3️⃣ Start backend using npm start
4️⃣ Open frontend/index.html in browser

