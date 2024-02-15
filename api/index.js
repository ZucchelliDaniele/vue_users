const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')

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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}))

app.post('/login', (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  console.log(email)
  console.log(password)

  db.query('SELECT * FROM employees WHERE email = ?', [email], (error, results) => {
    if(error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
    if(results.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const user = results[0];
    console.log(user)

    if(password !== user.pwd) {
      return res.status(401).json({ error: 'Invalid email or password' })
    }

    const token = jwt.sign( { userId: user.employeeNumber, name: user.lastName }, process.env.JWT_KEY );
    res.json({ user, token });

  });

});

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