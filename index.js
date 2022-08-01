const express = require("express");

// const db = require("./connection/db");
const app = express();
const port = 5000;
const isLogin = false;
let addProject = [];

// database.conection
// db.connect((err, _, done) => {
//   if (err) {
//     return console.log(err);
//   } else {
//     console.log("Connection database success");
//     done();
//   }
// });

app.set("view engine", "hbs");
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));
// app.use(express.static("images"));

// app.get("/index", (req, res) => {
//   res.send("/index");
// });
// // console.log(__dirname);

app.get("/index", (req, res) => {
  // db.connect((err, client, done) => {
  //   if (err) {
  //     console.log(err);
  //   }
  //   const query = "SELECT * FROM  tb_project";

  //   client.query(query, (err, result) => {
  //     if (err) throw err;

  //     const data = result.rows;
  const newProject = addProject.map((project) => {
    project.author = `Mr. Agus Alfandi`;
    project.startDate = new Date(project.startDate);
    project.endDate = new Date(project.endDate);
    project.time = getFullTime(project.endDate, project.startDate);

    return project;
  });

  console.log("data jadi", addProject);
  res.render("index", { addProject: newProject });
});
// });
// done();
// });
// });

app.post("/updateData/:id", (req, res) => {
  const { id } = req.params;
  const { title, startDate, endDate, description } = req.body;

  addProject[id] = {
    ...addProject[id],
    title,
    startDate,
    endDate,
    description,
    // Image: req.body.Image,
  };

  res.redirect("/index");

  // res.send(Data);
});

app.get("/updateData/:id", (req, res) => {
  const { id } = req.params;
  const Data = addProject[id];
  console.log("data menta update:", Data);
  res.render("updateData", { Data: { ...Data, id } });
});

app.post("/add-project", (req, res) => {
  const data = req.body;
  data.author = "Agus Alfandi";
  data.postAt = new Date();

  // const tech = addProject.forEach((techno) => {
  //
  // data.technologies = tech;

  addProject.push(data);

  // console.log("data mentah", addProject);
  res.redirect("/index");
});

app.get("/DetailProject/:index", (req, res) => {
  const index = req.params.index;
  const project = addProject[index];
  const newProject = {
    ...project,
    startDate: new Date(project.startDate),
    endDate: new Date(project.endDate),
    time: getFullTime(project.endDate, project.startDate),
  };

  console.log(index);

  res.render("DetailProject", { project: newProject });
});

app.get("/delete-project/:index", (req, res) => {
  const index = req.params.index;
  addProject.splice(index, 1);

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

function getFullTime(endDate, startDate) {
  let startMonth = startDate.getMonth();
  let endMonth = endDate.getMonth();
  let startYear = startDate.getFullYear();
  let endYear = endDate.getFullYear();

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

// function checkBox(checkbox, checkbox1, checkbox2, checkbox3) {
//   if (checkbox == true) {
//     let checkbox = document.getElementById("node");
//     return (checkbox +=
//       '<img value="node" id="node" src="./public/img/node.png">');
//   }
//   console.log(checkbox);
//   if (checkbox1 == true) {
//     let checkbox1 = document.getElementById("react").src;
//     console.log(checkbox1);
//   }
//   if (checkbox2 == true) {
//     let checkbox2 = document.getElementById("javascript");
//     console.log(checkbox2);
//   }
//   if (checkbox3 == true) {
//     let checkbox3 = document.getElementById("typescript");
//     console.log(checkbox3);
//   }
// }
