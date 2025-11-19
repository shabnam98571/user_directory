
-- Create Database
CREATE DATABASE IF NOT EXISTS user_directory;
USE user_directory;

-- Create Users Table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20),
    street VARCHAR(100),
    city VARCHAR(50),
    zipcode VARCHAR(10),
    company VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert Indian Users Data
INSERT IGNORE INTO users (name, email, phone, street, city, zipcode, company) VALUES
('Aarav Sharma', 'aarav.sharma@gmail.com', '+91-98765-43210', '123 MG Road', 'Mumbai', '400001', 'Sharma Enterprises'),
('Priya Patel', 'priya.patel@yahoo.com', '+91-98765-43211', '456 Brigade Road', 'Bangalore', '560001', 'Patel Industries'),
('Rohan Kumar', 'rohan.kumar@hotmail.com', '+91-98765-43212', '789 Connaught Place', 'Delhi', '110001', 'Kumar & Sons'),
('Ananya Singh', 'ananya.singh@outlook.com', '+91-98765-43213', '321 Park Street', 'Kolkata', '700016', 'Singh Group'),
('Vikram Gupta', 'vikram.gupta@company.com', '+91-98765-43214', '654 Jubilee Hills', 'Hyderabad', '500033', 'Gupta Solutions'),
('Neha Reddy', 'neha.reddy@gmail.com', '+91-98765-43215', '987 Koregaon Park', 'Pune', '411001', 'Reddy Technologies'),
('Arjun Mehta', 'arjun.mehta@yahoo.com', '+91-98765-43216', '159 Velachery', 'Chennai', '600042', 'Mehta Corp'),
('Sneha Joshi', 'sneha.joshi@hotmail.com', '+91-98765-43217', '753 Satellite Area', 'Ahmedabad', '380015', 'Joshi Enterprises'),
('Rahul Desai', 'rahul.desai@outlook.com', '+91-98765-43218', '486 Hinjewadi', 'Pune', '411057', 'Desai Industries'),
('Pooja Iyer', 'pooja.iyer@company.com', '+91-98765-43219', '264 Salt Lake', 'Kolkata', '700091', 'Iyer Solutions'),
('Karan Malhotra', 'karan.malhotra@gmail.com', '+91-98765-43220', '931 Whitefield', 'Bangalore', '560066', 'Malhotra Group'),
('Divya Choudhary', 'divya.choudhary@yahoo.com', '+91-98765-43221', '675 Gachibowli', 'Hyderabad', '500032', 'Choudhary Tech'),
('Amit Verma', 'amit.verma@hotmail.com', '+91-98765-43222', '842 Andheri West', 'Mumbai', '400053', 'Verma Enterprises'),
('Shreya Nair', 'shreya.nair@outlook.com', '+91-98765-43223', '379 Adyar', 'Chennai', '600020', 'Nair Industries'),
('Rajesh Khanna', 'rajesh.khanna@company.com', '+91-98765-43224', '518 Sector 62', 'Noida', '201309', 'Khanna Solutions'),
('Meera Kapoor', 'meera.kapoor@gmail.com', '+91-98765-43225', '753 Juhu', 'Mumbai', '400049', 'Kapoor Group'),
('Sanjay Rao', 'sanjay.rao@yahoo.com', '+91-98765-43226', '194 Banjara Hills', 'Hyderabad', '500034', 'Rao Technologies'),
('Anjali Bhat', 'anjali.bhat@hotmail.com', '+91-98765-43227', '627 Indiranagar', 'Bangalore', '560038', 'Bhat Enterprises'),
('Vivek Srinivasan', 'vivek.srinivasan@outlook.com', '+91-98765-43228', '851 GK Colony', 'Delhi', '110048', 'Srinivasan Corp'),
('Kavita Menon', 'kavita.menon@company.com', '+91-98765-43229', '462 Viman Nagar', 'Pune', '411014', 'Menon Solutions'),
('Deepak Agarwal', 'deepak.agarwal@gmail.com', '+91-98765-43230', '139 Rajouri Garden', 'Delhi', '110027', 'Agarwal Group'),
('Sunita Das', 'sunita.das@yahoo.com', '+91-98765-43231', '974 New Alipore', 'Kolkata', '700053', 'Das Industries'),
('Manoj Pillai', 'manoj.pillai@hotmail.com', '+91-98765-43232', '285 Anna Nagar', 'Chennai', '600040', 'Pillai Tech'),
('Lata Krishnan', 'lata.krishnan@outlook.com', '+91-98765-43233', '716 Manjalpur', 'Vadodara', '390011', 'Krishnan Solutions'),
('Nitin Bansal', 'nitin.bansal@company.com', '+91-98765-43234', '553 Kharadi', 'Pune', '411014', 'Bansal Enterprises'),
('Ritu Saxena', 'ritu.saxena@gmail.com', '+91-98765-43235', '892 Model Town', 'Lucknow', '226001', 'Saxena Group'),
('Harish Chandra', 'harish.chandra@yahoo.com', '+91-98765-43236', '417 Aundh', 'Pune', '411007', 'Chandra Tech'),
('Madhu Gowda', 'madhu.gowda@hotmail.com', '+91-98765-43237', '734 Electronic City', 'Bangalore', '560100', 'Gowda Industries'),
('Suresh Tiwari', 'suresh.tiwari@outlook.com', '+91-98765-43238', '256 Salt Lake', 'Kolkata', '700064', 'Tiwari Solutions'),
('Geeta Mishra', 'geeta.mishra@company.com', '+91-98765-43239', '679 Hauz Khas', 'Delhi', '110016', 'Mishra Corp');

-- Display all users
SELECT * FROM users;

-- Summary Queries
SELECT 
    COUNT(*) as total_users,
    COUNT(DISTINCT city) as total_cities,
    COUNT(DISTINCT company) as total_companies
FROM users;

-- City-wise user distribution
SELECT 
    city, 
    COUNT(*) as user_count 
FROM users 
GROUP BY city 
ORDER BY user_count DESC;

-- Company-wise employee count
SELECT 
    company, 
    COUNT(*) as employee_count 
FROM users 
GROUP BY company 
ORDER BY employee_count DESC;