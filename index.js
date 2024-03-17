const countStudentsEl = document.getElementsByName("countStudents");
const firstNameEL = document.getElementById("firstName");
const lastNameEL = document.getElementById("lastName");
const ageEL = document.getElementById("age");
const schoolClassEl = document.getElementById("schoolClass");
const scoreEnglishEL = document.getElementById("english");
const scoreGermanEL = document.getElementById("german");
const scoreMathEL = document.getElementById("math");

const displayOutputEl = document.getElementsByClassName("output-wrapper")[0];

document.addEventListener("DOMContentLoaded", loadSchoolFromLocalStorage);

let school = {
  schoolId: 100,
  studentsId: 0,
  students: {},
  studentsCount: 0,
  schoolInfo: "Dev",
};

function insertStudent() {
  console.log("insertStudent");

  let student = {
    firstName: firstNameEL.value,
    lastName: lastNameEL.value,
    age: Number(age.value),
    schoolClass: Number(schoolClassEl.value),
    score: {
      english: Number(scoreEnglishEL.value),
      german: Number(scoreGermanEL.value),
      math: Number(scoreMathEL.value),
    },
  };

  let studentIdStart = school.studentsId + 1;
  console.log(studentIdStart);

  key = studentIdStart;
  school.students[key] = student;
  school.studentsId = key;
  school.studentsCount += 1;

  console.log(school, school.studentsId, school.students);

  showStudents();
}

function showStudents() {
  console.log("showStudents");
  console.log(school);

  clearOutput();
  showOutput3();
  setStudentsCount();
}

function insertMoreStudents(number) {
  console.log("insertMoreStudents");

  let studentIdStart = school.studentsId + 1;
  //console.log(studentIdStart);

  for (let i = 0; i < number; i++) {
    const names = randomNames();

    let student = {
      firstName: names.firstName,
      lastName: names.lastName,
      age: randomNumber(5, 15),
      schoolClass: randomNumber(1, 4),
      score: {
        english: randomNumber(1, 6),
        german: randomNumber(1, 6),
        math: randomNumber(1, 6),
      },
    };

    key = studentIdStart + i;
    school.students[key] = student;
    school.studentsId = key;
    school.studentsCount += 1;
  }

  //console.log(school, school.studentsId, school.students);
  console.log("school studentsId", school.studentsId);

  //showStudents();
}

function randomNumber(min, max) {
  let number = Math.floor(Math.random() * (max - min) + 1) + min;
  //console.log(number);
  return number;
}

function randomNames() {
  const firstNames = [
    "Max",
    "Alfreda",
    "Lindburg",
    "Richardo",
    "Angelica",
    "Anniken",
    "Adelade",
    "Hardman",
    "Alexander",
    "Brice",
    "Bret",
    "Mell",
    "Cameron",
    "Rowan",
  ];
  const lastNames = [
    "Mustermann",
    "Dienst",
    "Lindemann",
    "Lippert",
    "Burgert",
    "Bahlmann",
    "Feldberg",
    "Lingel",
    "Berk",
    "Rosemeyer",
    "Watts",
    "Mcclure",
    "Booth",
    "Lewis",
    "Mason",
    "Sweeney",
    "King",
    "Harper",
    "Ball",
    "Peck",
  ];

  firstAndLastName = {
    firstName: firstNames[Math.floor(Math.random() * firstNames.length)],
    lastName: lastNames[Math.floor(Math.random() * lastNames.length)],
  };

  return firstAndLastName;
}

function showOutput3() {
  for (let key in school.students) {
    //console.log(key, school.students[key]);

    const card = document.createElement("div");
    const cardText = document.createTextNode(`${key}`);
    card.appendChild(cardText);

    const header = document.createElement("h1");
    const headerText = document.createTextNode(`${school.students[key].firstName}, ${school.students[key].lastName}`);
    header.appendChild(headerText);
    card.appendChild(header);

    const age = document.createElement("h2");
    const ageText = document.createTextNode(`Alter: ${school.students[key].age}, Klasse: ${school.students[key].schoolClass}`);
    age.appendChild(ageText);
    card.appendChild(age);

    const header2 = document.createElement("h2");
    const header2Text = document.createTextNode("Noten:");
    header2.appendChild(header2Text);
    card.appendChild(header2);

    let scoreTexts = {
      Englisch: "english",
      Deutsch: "german",
      Mathe: "math",
    };

    for (let key2 in scoreTexts) {
      //console.log(key, scoreTexts[key]);
      const score = document.createElement("h2");
      const scoreText = document.createTextNode(`${key2}: ${school.students[key].score[scoreTexts[key2]]}`);
      score.appendChild(scoreText);
      card.appendChild(score);
    }

    const actionBar = document.createElement("div");
    actionBar.classList.add("action-bar");

    //<span class="material-symbols-outlined">delete</span>
    const iconDelete = document.createElement("span");
    iconDelete.classList.add("material-symbols-outlined");
    const iconDeleteText = document.createTextNode("delete");
    iconDelete.setAttribute("onclick", `deleteStudent("${key}")`);
    iconDelete.appendChild(iconDeleteText);
    actionBar.appendChild(iconDelete);

    //<span class="material-symbols-outlined">edit</span>
    const iconEdit = document.createElement("span");
    iconEdit.classList.add("material-symbols-outlined");
    const iconEditText = document.createTextNode("edit");
    iconEdit.setAttribute("onclick", `editStudent("${key}")`);
    iconEdit.appendChild(iconEditText);
    actionBar.appendChild(iconEdit);

    //<span class="material-symbols-outlined">save</span>
    const iconSave = document.createElement("span");
    iconSave.classList.add("material-symbols-outlined");
    const iconSaveText = document.createTextNode("save");
    iconSave.setAttribute("onclick", `saveStudentToLocalStorage("${key}")`);
    iconSave.appendChild(iconSaveText);
    actionBar.appendChild(iconSave);

    card.appendChild(actionBar);

    const hr = document.createElement("hr");
    card.appendChild(hr);

    displayOutputEl.appendChild(card);
  }
}

function clearOutput() {
  displayOutputEl.innerHTML = "";
}

function deleteStudent(key) {
  console.log("DELETE!", key);

  delete school.students[key];
  school.studentsCount -= 1;

  // clearOutput();
  // showOutput3();
  // showStudents();

  const divElements = displayOutputEl.querySelectorAll(":scope > div");
  console.log("delete -->", divElements, divElements.length);

  divElements.forEach((element) => {
    if (element.firstChild.data === key) {
      console.log("Delete Found!", element, key);
      element.remove();
    }
  });
  showStudents();
}

//
// 1. Version
//
function editStudent1(key) {
  console.log("edit Student", key);
  setStudentToInput(key);

  const divElements = displayOutputEl.querySelectorAll("div");
  console.log(divElements, divElements.length);
  // console.log(divElements[2].childNodes[0].data);

  divElements.forEach((element) => {
    //console.log(element.childNodes[0].data);

    if (key === element.childNodes[0].data) {
      console.log("selectet", element);
      element.classList.add("selected");
    } else {
      element.classList.remove("selected");
    }
  });
}

//
// 2. Version
//
function editStudent2(key) {
  console.log("edit Student", key);
  setStudentToInput(key);

  const divElements = displayOutputEl.querySelectorAll(":scope > div");
  console.log("all div-->", divElements, divElements.length);

  divElements.forEach((element) => {
    if (element.className === "selected") {
      console.log("First SELECTED", element);
    }
  });

  const selectedElement = divElements[key - 1];
  console.log("--->", selectedElement, key);
  selectedElement.classList.add("selected");
}

//
// 3. Version
//
function editStudent3(key) {
  console.log("edit Student", key);
  setStudentToInput(key);

  //   const divElements = displayOutputEl.querySelectorAll(":scope > div");
  //   console.log("all div-->", divElements, divElements.length);

  //   const selectedElements = displayOutputEl.querySelectorAll("div.selected");
  //   console.log("all selected-->", selectedElements);
  //   selectedElements.forEach((element) => {
  //     element.classList.remove("selected");
  //   });

  //   const LastSelectedElement = divElements[key - 1];
  //   console.log("--->", LastSelectedElement, key);
  //   LastSelectedElement.classList.add("selected");
  // }

  const selectedElements = displayOutputEl.querySelectorAll("div.selected");
  console.log("all selected-->", selectedElements);
  selectedElements.forEach((element) => {
    element.classList.remove("selected");
  });

  const divElements = displayOutputEl.querySelectorAll(":scope > div");
  console.log("all div-->", divElements, divElements.length);

  divElements.forEach((element) => {
    if (element.childNodes[0].data === key) {
      console.log("Found!", element, key, element);
      element.classList.add("selected");
    }

    console.log("###", element.firstChild);
  });
}

//
// 4. Version
//
function editStudent(key) {
  console.log("edit Student", key);
  setStudentToInput(key);

  const selectedElements = displayOutputEl.querySelectorAll("div.selected");
  console.log("all selected-->", selectedElements);
  selectedElements.forEach((element) => {
    element.classList.remove("selected");
  });

  const divElements = displayOutputEl.querySelectorAll(":scope > div");
  console.log("all div-->", divElements, divElements.length);

  divElements.forEach((element) => {
    if (element.firstChild.data === key) {
      console.log("Found!", element, key);
      element.classList.add("selected");
    }
  });
}

function saveStudent(key) {
  console.log("SAVE!-->Student in School", key);
  school.students[key] = getStudentFromInput();

  console.log(school, school.studentsId, school.students);

  clearOutput();
  showOutput3();
}

function loadSchoolFromLocalStorage() {
  console.log("LOAD! school", school);

  let schoolLoad = JSON.parse(localStorage.getItem("school"));
  console.log("after load", schoolLoad);

  if (schoolLoad !== null) {
    school = schoolLoad;
    clearOutput();
    showOutput3();

    setStudentsCount();
  }
}

function saveSchoolToLocalStorage() {
  console.log("SAVE! school");
  localStorage.setItem("school", JSON.stringify(school));
  console.log("SAVE! school", school);
}

function saveStudentToLocalStorage(key) {
  console.log("SAVE! Student", key);

  saveStudent(key);

  let student = { students: { [key]: school.students[key] } };
  console.log(student);

  localStorage.setItem("student", JSON.stringify(student));
}

function getStudentFromInput() {
  let student = {
    firstName: firstNameEL.value,
    lastName: lastNameEL.value,
    age: Number(age.value),
    schoolClass: Number(schoolClassEl.value),
    score: {
      english: Number(scoreEnglishEL.value),
      german: Number(scoreGermanEL.value),
      math: Number(scoreMathEL.value),
    },
  };

  return student;
}

function setStudentToInput(key) {
  console.log("set Student", key);

  firstNameEL.value = school.students[key].firstName;
  lastNameEL.value = school.students[key].lastName;
  ageEL.value = school.students[key].age;
  schoolClassEl.value = school.students[key].schoolClass;
  scoreEnglishEL.value = school.students[key].score["english"];
  scoreGermanEL.value = school.students[key].score["german"];
  scoreMathEL.value = school.students[key].score["math"];
}

function setStudentsCount() {
  console.log("studentsCount", school.studentsCount);
  countStudentsEl[0].innerHTML = school.studentsCount;
  return school.studentsCount;
}
