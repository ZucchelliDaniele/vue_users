const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json')

const app = express();
const port = 3000;

//Setup connessione database
const db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'store'
});

//connetti al database
db.connect((err) => {
    if(err) {
        console.log("Errore di connessione al database", err);
    }
    else {
        console.log("Connesso al Database");
    }
})

app.use(cors());

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
})

app.get('/', (req, res) => {
    res.json("ciao")
});


app.get("/products", (_req, res) => {
  const QUERY = "SELECT * FROM products;";
  db.query(QUERY, (err, results) => {
    if (err) {
      console.log(`Error in query: ${err}`);
      res.status(500).send("Internal Server Error");
      return;
    }
    res.json(results);
  });
});

app.get("/customers", (_req, res) => {
    const QUERY = "SELECT * FROM customers;";
    db.query(QUERY, (err, results) => {
      if (err) {
        console.log(`Error in query: ${err}`);
        res.status(500).send("Internal Server Error");
        return;
      }
      res.json(results);
    });
  });

app.get("/products/:category", (req, res) => {
  const category = req.params.category;
  const QUERY = `SELECT * FROM products WHERE productLine = '${category}';`
  console.log(QUERY);
  db.query(QUERY, (err, results) => {
    if (err) {
      console.log(`Error in query: ${err}`);
      res.status(500).send("Internal Server Error");
      return;
    }
    res.json(results);
  });
});

app.get("/users", (_req, res) => {
  const QUERY = "SELECT * FROM customers;";
  db.query(QUERY, (err, results) => {
    if (err) {
      console.log(`Error in query: ${err}`);
      res.status(500).send("Internal Server Error");
      return;
    }
    res.json(results);
  });
});

app.get("/employees", (req, res) => {
  const email = req.params.email;
  const password = req.params.password;
  const QUERY = `SELECT * FROM employees;`;
  db.query(QUERY, (err, results) => {
    if (err) {
      console.log(`Error in query: ${err}`);
      res.status(500).send("Internal Server Error");
      return;
    }
    res.json(results);
  });
});