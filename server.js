// server.js
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const app = express();

app.use(cors());
app.use(express.json());

// MySQL Connection 
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root", 
  database: "user_directory",
  port: 3306
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error("MySQL connection failed:", err);
    process.exit(1);
  }
  console.log("MySQL Connected Successfully");
  
  initializeIndianData();
});


const initializeIndianData = () => {
  
  db.query("SELECT COUNT(*) as count FROM users", (err, results) => {
    if (err) {
      console.error("Error checking users:", err);
      return;
    }

    if (results[0].count === 0) {
      console.log("Adding Indian mock data to MySQL...");
      insertIndianData();
    } else {
      console.log("Database already has data");
    }
  });
};


const insertIndianData = () => {
  const indianFirstNames = [
    "Aarav", "Durga", "Rohan", "Ananya", "Vikram", "Neha", "Arjun", "Sneha", 
    "Rahul", "Pooja", "Karan", "Divya", "Amit", "Shreya", "Rajesh", "Meera",
    "Sanjay", "Anjali", "Vivek", "Kavita", "Deepak", "Sunita", "Manoj", "Lata",
    "Nitin", "Ritu", "Harish", "Madhu", "Suresh", "Geeta", "Akash", "Bhavna",
    "Chetan", "Dipika", "Esha", "Farhan", "Gautam", "Hema", "Ishaan", "Jhanvi"
  ];

  const indianLastNames = [
    "Sharma", "Patel", "Kumar", "Singh", "Gupta", "Reddy", "Mehta", "Joshi",
    "Desai", "Iyer", "Malhotra", "Choudhary", "Verma", "Nair", "Khanna", "Kapoor",
    "Rao", "Bhat", "Srinivasan", "Menon", "Agarwal", "Das", "Pillai", "Krishnan",
    "Bansal", "Saxena", "Chandra", "Gowda", "Tiwari", "Mishra", "Yadav", "Khan"
  ];

  const indianCities = {
    "Mumbai": ["400001", "400053", "400049", "400056"],
    "Delhi": ["110001", "110048", "110027", "110016"],
    "Bangalore": ["560001", "560038", "560066", "560100"],
    "Chennai": ["600042", "600020", "600040", "600028"],
    "Kolkata": ["700016", "700091", "700053", "700064"],
    "Hyderabad": ["500033", "500032", "500034", "500082"],
    "Pune": ["411001", "411057", "411014", "411007"],
    "Ahmedabad": ["380015", "380009", "380054", "380013"],
    "Jaipur": ["302001", "302017", "302020", "302039"]
  };

  const domains = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "company.in"];

  const insertPromises = [];

  for (let i = 0; i < 50; i++) {
    const firstName = indianFirstNames[Math.floor(Math.random() * indianFirstNames.length)];
    const lastName = indianLastNames[Math.floor(Math.random() * indianLastNames.length)];
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${domains[Math.floor(Math.random() * domains.length)]}`;
    
    const cities = Object.keys(indianCities);
    const city = cities[Math.floor(Math.random() * cities.length)];
    const zipcodes = indianCities[city];
    const zipcode = zipcodes[Math.floor(Math.random() * zipcodes.length)];

    const streets = [
      "MG Road", "Brigade Road", "Connaught Place", "Park Street", 
      "Jubilee Hills", "Koregaon Park", "Velachery", "Satellite Area",
      "Hinjewadi", "Salt Lake", "Whitefield", "Gachibowli",
      "Andheri West", "Adyar", "Sector 62", "Juhu",
      "Banjara Hills", "Indiranagar", "GK Colony", "Viman Nagar"
    ];

    const user = {
      name: `${firstName} ${lastName}`,
      email: email,
      phone: `+91-${Math.floor(90000 + Math.random() * 10000)}-${Math.floor(10000 + Math.random() * 90000)}`,
      street: `${Math.floor(100 + Math.random() * 900)} ${streets[Math.floor(Math.random() * streets.length)]}`,
      city: city,
      zipcode: zipcode,
      company: `${lastName} ${["Enterprises", "Industries", "Solutions", "Technologies", "Group", "Corp"][Math.floor(Math.random() * 6)]}`
    };

    const promise = new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO users (name, email, phone, street, city, zipcode, company) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [user.name, user.email, user.phone, user.street, user.city, user.zipcode, user.company],
        (err, results) => {
          if (err) {
            
            if (err.code === 'ER_DUP_ENTRY') {
              resolve();
            } else {
              reject(err);
            }
          } else {
            resolve(results);
          }
        }
      );
    });

    insertPromises.push(promise);
  }

  Promise.all(insertPromises)
    .then(() => console.log("Indian mock data inserted successfully"))
    .catch(err => console.error("Error inserting mock data:", err));
};


app.get("/users", (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search || "";

  const offset = (page - 1) * limit;

  let countQuery = "SELECT COUNT(*) as total FROM users";
  let dataQuery = "SELECT * FROM users";
  let queryParams = [];

  if (search) {
    const searchCondition = " WHERE name LIKE ? OR email LIKE ? OR city LIKE ?";
    countQuery += searchCondition;
    dataQuery += searchCondition;
    queryParams = [`%${search}%`, `%${search}%`, `%${search}%`];
  }

  dataQuery += " ORDER BY name LIMIT ? OFFSET ?";
  queryParams.push(limit, offset);

  db.query(countQuery, queryParams.slice(0, search ? 3 : 0), (err, countResults) => {
    if (err) {
      console.error("Error counting users:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    const totalUsers = countResults[0].total;
    const totalPages = Math.ceil(totalUsers / limit);

    db.query(dataQuery, queryParams, (err, users) => {
      if (err) {
        console.error("Error fetching users:", err);
        return res.status(500).json({ error: "Internal server error" });
      }

      const results = {
        currentPage: page,
        totalPages: totalPages,
        totalUsers: totalUsers,
        users: users,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      };

      res.json(results);
    });
  });
});


app.get("/users/:id", (req, res) => {
  const userId = req.params.id;

  db.query("SELECT * FROM users WHERE id = ?", [userId], (err, results) => {
    if (err) {
      console.error("Error fetching user:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(results[0]);
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});