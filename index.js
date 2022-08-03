const { query } = require("express");
const express = require("express");

const db = require("./connection/db");
const app = express();
const port = 5000;
const isLogin = false;

// database.conection;
db.connect((err, _, done) => {
  if (err) {
    return console.log(err);
  } else {
    console.log("Connection database success");
    done();
  }
});

app.set("view engine", "hbs");
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.static("images"));

// app.get("/index", (req, res) => {
//   res.send("index");
// });

app.get("/index", (req, res) => {
  db.connect((err, client, done) => {
    if (err) {
      console.log(err);
    }
    const query = "SELECT * FROM tb_project";

    client.query(query, (err, result) => {
      if (err) throw err;

      const data = result.rows;
      const newProject = data.map((project) => {
        project.author = `Mr. Agus Alfandi`;
        project.start_date = new Date(project.start_date);
        project.end_date = new Date(project.end_date);
        project.time = getFullTime(project.end_date, project.start_date);

        return project;
      });
      done();
      // console.log("database:", newProject);
      res.render("index", { addProject: newProject });
    });
  });
});

app.post("/updateData/:id", (req, res) => {
  const id = req.params.id;
  const { title, start_date, end_date, description, technologies } = req.body;
  db.connect((err, client, done) => {
    if (err) throw err;

    const query = `UPDATE tb_project 
    SET title = '${title}', 
    start_date = '${start_date}', 
    end_date = '${end_date}', 
    description = '${description}',
    technologies = '{${technologies}}'
    WHERE id = ${id}`;

    client.query(query, (err) => {
      if (err) console.log(err);

      // technologies = '${technologies}'
      // console.log(newData);
      done();
      res.redirect("/index");
    });
  });
});

app.get("/updateData/:id", (req, res) => {
  const id = req.params.id;

  db.connect((err, client, done) => {
    if (err) throw err;

    const query = `SELECT * FROM tb_project WHERE id = ${id}`;

    client.query(query, (err, result) => {
      if (err) throw err;

      done();
      // console.log(result.rows[0]);
      res.render("updateData", { Data: result.rows[0] });
    });
  });
  // console.log("data menta updatep:", Data);
});

app.post("/add-project", (req, res) => {
  const { title, start_date, end_date, description, technologies } = req.body;
  // data.author = "Agus Alfandi";
  db.connect((err, client, done) => {
    if (err) {
      console.log(err);
    }
    const query = `INSERT INTO tb_project(title, start_date, end_date, description, technologies) 
  VALUES ('${title}', '${start_date}', '${end_date}','${description}', '{${technologies}}')`;

    client.query(query, (err) => {
      if (err) throw err;
      done();
      res.redirect("/index");
    });
  });

  // console.log("data mentah", addProject);
});

app.get("/DetailProject/:id", (req, res) => {
  const id = req.params.id;
  // const { title, start_date, end_date, description, technologies } = req.body;
  db.connect((err, client, done) => {
    if (err) console.log(err);
    const query = `SELECT * FROM tb_project WHERE id = ${id}`;

    client.query(query, (err, result) => {
      done();
      if (err) throw err;

      let newData = result.rows;
      const newProject = newData.map((project) => {
        project.author = `Mr. Agus Alfandi`;
        project.start_date = new Date(project.start_date);
        project.end_date = new Date(project.end_date);
        project.time = getFullTime(project.end_date, project.start_date);

        return project;
      });

      // console.log("=============");
      // console.log("database detail:", newProject);
      res.render("DetailProject", { newData: newProject });
    });
  });
});

app.get("/delete-project/:id", (req, res) => {
  const id = req.params.id;
  db.connect((err, client, done) => {
    if (err) console.log(err);

    const query = `DELETE FROM tb_project WHERE id = ${id}`;

    client.query(query, (err) => {
      if (err) throw err;
      done();
    });
  });

  res.redirect("/index");
});

app.get("/updateData", (req, res) => {
  res.render("updateData");
});

app.get("/add-project", (req, res) => {
  res.render("add-project");
});

app.get("/Contact-me", (req, res) => {
  res.render("Contact-me");
});

app.listen(port, () => {
  console.log(`Exemple app listen port ${port} `);
});

function getFullTime(end_date, start_date) {
  let startMonth = start_date.getMonth();
  let endMonth = end_date.getMonth();
  let startYear = start_date.getFullYear();
  let endYear = end_date.getFullYear();

  if (startYear == endYear) {
    if (startMonth == endMonth) {
      month = 1;
      return "durasi " + month + " bulan";
    } else {
      month = endMonth - startMonth;
      return "durasi " + month + " bulan";
    }
  }

  if (endYear > startYear) {
    if (endYear - startYear == 1) {
      if (startMonth == endMonth) {
        return "durasi 1 tahun";
      } else if (startMonth > endMonth) {
        month = (startMonth - endMonth - 12) * -1;
        return "durasi " + month + " bulan";
      } else if (startMonth < endMonth) {
        month = endMonth - startMonth;
        return "durasi 1 tahun " + month + " bulan";
      }
    } else {
      year = endYear - startYear;
      if (startMonth == endMonth) {
        return "durasi " + year + " tahun";
      } else if (startMonth > endMonth) {
        year -= 1;
        month = (startMonth - endMonth - 12) * -1;
        return "durasi " + year + " tahun " + month + " bulan";
      } else if (startMonth < endMonth) {
        month = endMonth - startMonth;
        return "durasi " + year + " tahun " + month + " bulan";
      }
    }
  }
}
