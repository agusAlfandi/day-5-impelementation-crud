let Projects = [];

function MyProject() {
  let title = document.getElementById("project-name").value;
  let dateStart = document.getElementById("start-input").value;
  let dateEnd = document.getElementById("end-input").value;
  let content = document.getElementById("desc").value;
  let node = document.getElementById("node");
  let react = document.getElementById("react");
  let next = document.getElementById("JavaScript");
  let type = document.getElementById("TypeScript");
  let image = document.getElementById("upload");
  //   console.log(title);
  //   console.log(content);
  //   console.log(image);

  let printIcon = "";

  if (node.checked == true) {
    printIcon += '<img value="node" id="node" src="./Assets/img/node.png">';
  }
  if (react.checked == true) {
    printIcon += '<img value="react" id="react" src="./Assets/img/react.png">';
  }
  if (next.checked == true) {
    printIcon +=
      '<img value="next" id="next" src="./Assets/img/javascript.png">';
  }
  if (type.checked == true) {
    printIcon += '<img value="type" id="type" src="./Assets/img/type.png">';
  }
  // {
  //   return alert("Please select one of the checkboxes");
  // }

  image = URL.createObjectURL(image.files[0]);
  dateStart = new Date(dateStart);
  dateEnd = new Date(dateEnd);

  let Project = {
    dateStart,
    dateEnd,
    title,
    content,
    image,
    printIcon,
    author: "Agus Alfandi",
    postAt: new Date(),
  };

  // console.log(Project);
  Projects.push(Project);
  renderProject();
}

// ${getDistanceTime(Projects[i].postAt)}

function renderProject() {
  let projectWrapper = document.getElementById("contents");

  projectWrapper.innerHTML = "";

  let lengthProjwct = Projects.length;
  for (let i = 0; i < lengthProjwct; i++) {
    projectWrapper.innerHTML += `
    <div class="card p-3 shadow m-5" style="width: 18rem">
    <a class="text-decoration-none text-black" href="./Page/DetailProject.html">
      <img
        src="${Projects[i].image}"
        class="rounded img-project mb-3" 
        alt="..."
      />
      <div class="card-body">
        <h5 class="card-title">${Projects[i].title}</h5>
        <p class="mb-1">
        ${getFullTime(Projects[i].dateEnd, Projects[i].dateStart)}
        </p>
        <p class="card-text p-desc-project">
          ${Projects[i].content}
        </p>
        <div class="icon mb-2">
          ${Projects[i].printIcon}
        </div>
    </a>
      <div class="d-flex justify-content-between">
        <a href="#" class="bg-black btn btn-primary project-list-edit"> Edit </a>
        <a href="#" class="bg-black btn btn-primary"> Delete </a>
      </div>
    </div>
  </div>`;
  }
  alert("Your project has been added successfully");
}

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
        return "durasi 1 tahun " + month + "bulan";
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

function firsProjectDisplay() {
  return `<div class="card p-3 shadow m-5" style="width: 18rem">
    <a class="text-decoration-none text-black" href="./Page/DetailProject.html">
      <img
        src="./assets/img/mobile app.jpg"
        class="rounded img-project mb-3" 
        alt="..."
      />
      <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="mb-1">Durasi</p>
        <p class="card-text p-desc-project">
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </p>
        <div class="icon mb-2">
          <img src="./assets/img/javascript.png" />
          <img src="./assets/img/node.png" />
          <img src="./assets/img/react.png" />
          <img src="./assets/img/type.png" />
        </div>
    </a>
      <div class="d-flex justify-content-between">
        <a href="#" class="bg-black btn btn-primary project-list-edit"> Edit </a>
        <a href="#" class="bg-black btn btn-primary"> Delete </a>
      </div>
    </div>
  </div>`;
}
