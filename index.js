const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// var db = mysql.createPool({
//   connectionLimit: 10,
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "gym_management_db",
// });

var db = mysql.createPool({
  connectionLimit: 10,
  host: "bjgr1jesl31jjxv5rcmu-mysql.services.clever-cloud.com",
  user: "ucxfeyaweansk3lu",
  password: "wUROvHozK3k8jE0nv4G6",
  database: "bjgr1jesl31jjxv5rcmu",
});

// DATABASE CONNECTION
// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "gym_management_db",
// });

// db.connect((error) => {
//   if (error) {
//     console.log("error");
//   } else {
//     console.log("connected");
//   }
// });

app.get("/", function (req, res) {
  res.send("Hello World!");
});

// REGISTER USER
app.post("/api/register", async (req, res) => {
  const sql =
    "INSERT INTO users (`name`,`username`,`role`,`password`) VALUES (?)";
  const values = [
    req.body.name,
    req.body.username,
    req.body.role,
    req.body.password,
  ];

  db.query(sql, [values], (err, data) => {
    if (err) {
      console.log(err.message);
      return res.json("Error");
    }
    return res.json(data);
  });
});

// CHANGE PASSWORD
app.patch("/api/update-password", async (req, res) => {
  const sql = `UPDATE users SET 
  password = "${req.body.password}"
  WHERE username = "${req.body.username}"`;

  db.query(sql, (err, data) => {
    if (err) {
      console.log(err.message);
      return res.json(err.message);
    }
    return res.json(data);
  });
});

// GET ALL USERS
app.get("/api/all-user", (req, res) => {
  const sql = `SELECT * FROM users`;
  db.query(sql, (err, data) => {
    if (err) {
      return res.json("Error");
    }
    return res.json(data);
  });
});

// GET USER INNER JOIN USER'S PROFILE
app.get("/api/users", (req, res) => {
  const sql = `SELECT * FROM users INNER JOIN user_profile ON users.username = user_profile.username`;
  db.query(sql, (err, data) => {
    if (err) {
      return res.json("Error");
    }
    return res.json(data);
  });
});

// LOGIN
app.post("/api/get-user", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const sql = `SELECT * FROM users WHERE username = ? AND password = ?`;
  db.query(sql, [username, password], (err, data) => {
    if (err) {
      return res.json(err.message);
    }
    return res.json(data);
  });
});

// VALIDATE USERNAME
app.post("/api/validate-user", async (req, res) => {
  const username = req.body.username;
  const sql = `SELECT * FROM users WHERE username = ?`;
  db.query(sql, username, (err, data) => {
    if (err) {
      return res.json(err.message);
    }
    return res.json(data);
  });
});

// GET USER INNER JOIN USER'S PROFILE USING USERNAME
app.post("/api/get-user-by-username", async (req, res) => {
  const username = req.body.username;
  const sql = `SELECT * FROM users INNER JOIN user_profile ON users.username = user_profile.username WHERE users.username = ?`;
  db.query(sql, [username], (err, data) => {
    if (err) {
      return res.json(err.message);
    }
    return res.json(data);
  });
});

// GET USER INNER JOIN USER'S PROFILE WITH ADDED BY CONDITION
app.post("/api/get-user-by-role", async (req, res) => {
  const added_by = req.body.added_by;
  const sql = `SELECT * FROM users INNER JOIN user_profile ON users.username = user_profile.username WHERE added_by = ?`;
  db.query(sql, [added_by], (err, data) => {
    if (err) {
      return res.json(err.message);
    }
    return res.json(data);
  });
});

// CREATE USER AND USER PROFILE
app.post("/api/create-user-profile", async (req, res) => {
  const sql =
    "INSERT INTO user_profile (`username`,`birthdate`,`age`,`gender`,`contact`,`address`,`medical_conditions`,`allergies`,`current_medication`,`family_doctor`,`doctor_contact`,`parent_name`,`parent_contact`,`parent_address`,`membership_type`,`mem_start_date`,`mem_end_date`,`added_by`) VALUES (?)";
  const values = [
    req.body.username,
    req.body.birthdate,
    req.body.age,
    req.body.gender,
    req.body.contact,
    req.body.address,
    req.body.medical_conditions,
    req.body.allergies,
    req.body.current_medication,
    req.body.family_doctor,
    req.body.doctor_contact,
    req.body.parent_name,
    req.body.parent_contact,
    req.body.parent_address,
    req.body.membership_type,
    req.body.mem_start_date,
    req.body.mem_end_date,
    req.body.added_by,
  ];

  db.query(sql, [values], (err, data) => {
    if (err) {
      console.log(err.message);
      return res.json("Error");
    }
    return res.json(data);
  });
});

// UPDATE USER
app.patch("/api/update-user", async (req, res) => {
  const sql = `UPDATE users u INNER JOIN user_profile up ON u.username = up.username SET 
  u.name = "${req.body.name}", 
  up.birthdate = "${req.body.birthdate}", 
  up.age = "${req.body.age}", 
  up.contact = "${req.body.contact}", 
  up.gender = "${req.body.gender}", 
  up.address = "${req.body.address}", 
  up.medical_conditions = "${req.body.medical_conditions}", 
  up.allergies = "${req.body.allergies}", 
  up.current_medication = "${req.body.current_medication}", 
  up.family_doctor = "${req.body.family_doctor}", 
  up.doctor_contact = "${req.body.doctor_contact}", 
  up.parent_name = "${req.body.parent_name}", 
  up.parent_contact = "${req.body.parent_contact}", 
  up.parent_address = "${req.body.parent_address}", 
  up.membership_type = "${req.body.membership_type}", 
  up.mem_start_date = "${req.body.mem_start_date}", 
  up.mem_end_date = "${req.body.mem_end_date}"
  WHERE u.username = "${req.body.username}"`;

  db.query(sql, (err, data) => {
    if (err) {
      console.log(err.message);
      return res.json("Error");
    }
    return res.json(data);
  });
});

// ROLES
app.post("/api/add-role", async (req, res) => {
  const sql = "INSERT INTO roles (`value`,`isActive`) VALUES (?)";
  const values = [req.body.role, req.body.isActive];

  db.query(sql, [values], (err, data) => {
    if (err) {
      return res.json(err.message);
    }
    return res.json(data);
  });
});

// GET ALL ACTIVE ROLES
app.get("/api/roles", (req, res) => {
  const sql = "SELECT * FROM roles WHERE isActive = 1";
  db.query(sql, (err, data) => {
    if (err) {
      return res.json(err.message);
    }
    return res.json(data);
  });
});

// CREATE MEAL PLANNING
app.post("/api/create-meal-planning", async (req, res) => {
  const sql =
    "INSERT INTO meal_plan (`username`, `diet_type`, `calories`, `sun_bf_meal`, `sun_lunch_meal`, `sun_dinner_meal`, `mon_bf_meal`, `mon_lunch_meal`, `mon_dinner_meal`, `tue_bf_meal`, `tue_lunch_meal`, `tue_dinner_meal`, `wed_bf_meal`, `wed_lunch_meal`, `wed_dinner_meal`, `thurs_bf_meal`, `thurs_lunch_meal`, `thurs_dinner_meal`, `fri_bf_meal`, `fri_lunch_meal`, `fri_dinner_meal`, `sat_bf_meal`, `sat_lunch_meal`, `sat_dinner_meal`) VALUES (?)";
  const values = [
    req.body.username,
    req.body.diet_type,
    req.body.calories,
    req.body.sun_bf_meal,
    req.body.sun_lunch_meal,
    req.body.sun_dinner_meal,
    req.body.mon_bf_meal,
    req.body.mon_lunch_meal,
    req.body.mon_dinner_meal,
    req.body.tue_bf_meal,
    req.body.tue_lunch_meal,
    req.body.tue_dinner_meal,
    req.body.wed_bf_meal,
    req.body.wed_lunch_meal,
    req.body.wed_dinner_meal,
    req.body.thurs_bf_meal,
    req.body.thurs_lunch_meal,
    req.body.thurs_dinner_meal,
    req.body.fri_bf_meal,
    req.body.fri_lunch_meal,
    req.body.fri_dinner_meal,
    req.body.sat_bf_meal,
    req.body.sat_lunch_meal,
    req.body.sat_dinner_meal,
  ];

  db.query(sql, [values], (err, data) => {
    if (err) {
      console.log(err.message);
      return res.json("Error");
    }
    return res.json(data);
  });
});

// GET MEAL PLAN USING USERNAME
app.post("/api/meal-plan", (req, res) => {
  const sql = "SELECT * FROM meal_plan WHERE username = ?";
  db.query(sql, req.body.username, (err, data) => {
    if (err) {
      return res.json(err.message);
    }
    return res.json(data);
  });
});

// UPDATE MEAL PLAN
app.patch("/api/update-meal-planning", async (req, res) => {
  const sql = `UPDATE meal_plan SET 
  diet_type = "${req.body.diet_type}",
  calories = "${req.body.calories}",
  sun_bf_meal = "${req.body.sun_bf_meal}",
  sun_lunch_meal = "${req.body.sun_lunch_meal}",
  sun_dinner_meal = "${req.body.sun_dinner_meal}",
  mon_bf_meal = "${req.body.mon_bf_meal}",
  mon_lunch_meal = "${req.body.mon_lunch_meal}",
  mon_dinner_meal = "${req.body.mon_dinner_meal}",
  tue_bf_meal = "${req.body.tue_bf_meal}",
  tue_lunch_meal = "${req.body.tue_lunch_meal}",
  tue_dinner_meal = "${req.body.tue_dinner_meal}",
  wed_bf_meal = "${req.body.wed_bf_meal}",
  wed_lunch_meal = "${req.body.wed_lunch_meal}",
  wed_dinner_meal = "${req.body.wed_dinner_meal}",
  thurs_bf_meal = "${req.body.thurs_bf_meal}",
  thurs_lunch_meal = "${req.body.thurs_lunch_meal}",
  thurs_dinner_meal = "${req.body.thurs_dinner_meal}",
  fri_bf_meal = "${req.body.fri_bf_meal}",
  fri_lunch_meal = "${req.body.fri_lunch_meal}",
  fri_dinner_meal = "${req.body.fri_dinner_meal}",
  sat_bf_meal = "${req.body.sat_bf_meal}",
  sat_lunch_meal = "${req.body.sat_lunch_meal}",
  sat_dinner_meal = "${req.body.sat_dinner_meal}"
  WHERE username = "${req.body.username}"`;

  db.query(sql, (err, data) => {
    if (err) {
      console.log(err.message);
      return res.json(err.message);
    }
    return res.json(data);
  });
});

// CREATE PRODUCT
app.post("/api/create-product", async (req, res) => {
  const sql =
    "INSERT INTO products (`product_name`,`image_url`,`description`,`price`,`added_by`,`added_date`) VALUES (?)";
  const values = [
    req.body.product_name,
    req.body.image_url,
    req.body.description,
    req.body.price,
    req.body.added_by,
    req.body.added_date,
  ];

  db.query(sql, [values], (err, data) => {
    if (err) {
      console.log(err.message);
      return res.json(err.message);
    }
    return res.json(data);
  });
});

// GET ALL PRODUCTS
app.get("/api/products", (req, res) => {
  const sql = "SELECT * FROM products";
  db.query(sql, (err, data) => {
    if (err) {
      return res.json(err.message);
    }
    return res.json(data);
  });
});

// GET PRODUCT WITH WHERE CONDITION
app.post("/api/get-product", (req, res) => {
  const sql = "SELECT * FROM products WHERE added_by = ?";
  db.query(sql, req.body.added_by, (err, data) => {
    if (err) {
      return res.json(err.message);
    }
    return res.json(data);
  });
});

// SELECT PRODUCT BY ID
app.post("/api/get-product-by-id", (req, res) => {
  const sql = "SELECT * FROM products WHERE id = ?";
  db.query(sql, req.body.id, (err, data) => {
    if (err) {
      return res.json(err.message);
    }
    return res.json(data);
  });
});

// UPDATE PRODUCT BY ID
app.patch("/api/update-product", async (req, res) => {
  const sql = `UPDATE products SET 
  product_name = "${req.body.product_name}",
  image_url = "${req.body.image_url}",
  description = "${req.body.description}",
  price = "${req.body.price}"
  WHERE id = "${req.body.id}"`;

  db.query(sql, (err, data) => {
    if (err) {
      console.log(err.message);
      return res.json(err.message);
    }
    return res.json(data);
  });
});

// ADD TO CART
app.post("/api/add-to-cart", async (req, res) => {
  const sql = `INSERT INTO cart (username, product_name, image_url, description, price, quantity, sub_total, status, added_date) VALUES (
    '${req.body.username}',
    '${req.body.product_name}',
    '${req.body.image_url}',
    '${req.body.description}',
    '${req.body.price}',
    '${req.body.quantity}',
    '${req.body.sub_total}',
    '${req.body.status}',
    '${req.body.added_date}')`;

  db.query(sql, (err, data) => {
    if (err) {
      return res.json(err.message);
    }
    return res.json(data);
  });
});

// UPDATE CART
app.patch("/api/update-cart", async (req, res) => {
  const sql = `UPDATE cart SET 
  quantity = "${req.body.quantity}",
  sub_total = "${req.body.sub_total}"
  WHERE id = "${req.body.id}"`;

  db.query(sql, (err, data) => {
    if (err) {
      console.log(err.message);
      return res.json(err.message);
    }
    return res.json(data);
  });
});

// DELETE CART
app.patch("/api/delete-cart", async (req, res) => {
  const sql = `DELETE FROM cart 
  WHERE id = "${req.body.id}"`;

  db.query(sql, (err, data) => {
    if (err) {
      console.log(err.message);
      return res.json(err.message);
    }
    return res.json(data);
  });
});

// GET CART ITEM BY USERNAME
app.post("/api/get-cart-by-id", (req, res) => {
  const sql = `SELECT * FROM cart WHERE username = "${req.body.username}" AND status = "${req.body.status}"`;
  db.query(sql, (err, data) => {
    if (err) {
      console.log(err.message);
      return res.json(err.message);
    }
    return res.json(data);
  });
});

// TRANSACTION
app.post("/api/transaction", async (req, res) => {
  const sql = `INSERT INTO transaction (username, fullname, contact, method, address, items, total, status, transaction_date) VALUES (
    '${req.body.username}',
    '${req.body.fullname}',
    '${req.body.contact}',
    '${req.body.method}',
    '${req.body.address}',
    '${req.body.items}',
    '${req.body.total}',
    '${req.body.status}',
    '${req.body.transaction_date}')`;

  db.query(sql, (err, data) => {
    if (err) {
      return res.json(err.message);
    }
    return res.json(data);
  });
});

// GET TRANSACTION BY STATUS
app.get("/api/get-transaction-by-status", (req, res) => {
  const sql = `SELECT * FROM transaction WHERE status = "pending"`;
  db.query(sql, (err, data) => {
    if (err) {
      console.log(err.message);
      return res.json(err.message);
    }
    return res.json(data);
  });
});

const port = 3031 || process.env.PORT;

app.listen(port, () => {
  console.log(`server running in port ${port}`);
});
