const countStudentsEl = document.getElementsByName("countStudents");

const firstNameEL = document.getElementById("firstName");
const lastNameEL = document.getElementById("lastName");
const ageEL = document.getElementById("age");
const schoolClassEl = document.getElementById("schoolClass");
const scoreEnglishEL = document.getElementById("english");
const scoreGermanEL = document.getElementById("german");
const scoreMathEL = document.getElementById("math");

const displayOutputEl = document.getElementsByClassName("output-wrapper")[0];

document.addEventListener("DOMContentLoaded", loadStudentsFromLocalStorage);

const LOCAL_STORAGE_KEY = "students";

const SCORE_TEXTS = {
  Englisch: "english",
  Deutsch: "german",
  Mathe: "math",
};

let students = [];

function insertStudent() {
  console.log("insertStudent");

  insertMoreStudents(1);
}

function showStudents() {
  console.log("showStudents");
  console.log(students);
  clearStudentsList();
  createStudentsList();

  if (students.length > 999) {
    countStudentsEl[0].innerHTML = `<p class="text-small">${students.length}</p>`;
  } else {
    countStudentsEl[0].innerHTML = `${students.length}`;
  }
}

function insertMoreStudents(number) {
  console.log("insertMoreStudents");

  for (let i = 0; i < number; i++) {
    const names = getRandomNames();
    // console.log("NAME--", names, i);

    const student = {
      firstName: names.firstName,
      lastName: names.lastName,
      age: getRandomNumber(5, 15),
      schoolClass: getRandomNumber(1, 4),
      score: {
        english: getRandomNumber(1, 6),
        german: getRandomNumber(1, 6),
        math: getRandomNumber(1, 6),
      },
    };
    students.push(student);
  }
  console.log("Students: ", students.length);
  saveStudentsToLocalStorage();
  showStudents();
}

function getRandomNumber(min, max) {
  //console.log("-------------", min, max);
  return (number = Math.floor(Math.random() * (max - min) + 1) + min);
}

function getRandomNames() {
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
    firstName: firstNames[getRandomNumber(0, firstNames.length - 1)],
    lastName: lastNames[getRandomNumber(0, lastNames.length - 1)],
  };

  console.log("NAMES!--", firstAndLastName);

  return firstAndLastName;
}

function createStudentsList() {
  for (let index in students) {
    const card = document.createElement("div");
    card.dataset.id = index;
    const cardText = document.createTextNode(`${index}`);
    card.appendChild(cardText);

    const nameHeader = document.createElement("h1");
    const headerText = document.createTextNode(`${students[index].firstName}, ${students[index].lastName}`);
    nameHeader.appendChild(headerText);
    card.appendChild(nameHeader);

    const studentAge = document.createElement("h2");
    const ageText = document.createTextNode(`Alter: ${students[index].age}, Klasse: ${students[index].schoolClass}`);
    studentAge.appendChild(ageText);
    card.appendChild(studentAge);

    const scoreHeader = document.createElement("h2");
    const scoreHeaderText = document.createTextNode("Noten:");
    scoreHeader.appendChild(scoreHeaderText);
    card.appendChild(scoreHeader);

    for (const scoreCount in SCORE_TEXTS) {
      const score = document.createElement("h2");
      const scoreText = document.createTextNode(`${scoreCount}: ${students[index].score[SCORE_TEXTS[scoreCount]]}`);
      score.appendChild(scoreText);
      card.appendChild(score);
    }

    const actionBar = document.createElement("div");
    actionBar.classList.add("action-bar");

    // <span class="material-symbols-outlined">delete</span>
    const iconDelete = document.createElement("span");
    iconDelete.classList.add("material-symbols-outlined");
    const iconDeleteText = document.createTextNode("delete");
    iconDelete.setAttribute("onclick", `deleteStudent("${index}")`);
    iconDelete.appendChild(iconDeleteText);
    actionBar.appendChild(iconDelete);

    // <span class="material-symbols-outlined">edit</span>
    const iconEdit = document.createElement("span");
    iconEdit.classList.add("material-symbols-outlined");
    const iconEditText = document.createTextNode("edit");
    iconEdit.setAttribute("onclick", `editStudent("${index}")`);
    iconEdit.appendChild(iconEditText);
    actionBar.appendChild(iconEdit);

    // <span class="material-symbols-outlined">save</span>
    const iconSave = document.createElement("span");
    iconSave.classList.add("material-symbols-outlined");
    const iconSaveText = document.createTextNode("save");
    iconSave.setAttribute("onclick", `saveStudent("${index}")`);
    iconSave.appendChild(iconSaveText);
    actionBar.appendChild(iconSave);

    card.appendChild(actionBar);

    const hr = document.createElement("hr");
    card.appendChild(hr);

    displayOutputEl.appendChild(card);
  }
}

function clearStudentsList() {
  displayOutputEl.innerHTML = "";
}

function deleteStudent(index) {
  console.log("DELETE!", index);
  students.splice(index, 1);
  console.log("Studenst after del", students);
  showStudents();
}

function editStudent(index) {
  console.log("edit Student", index);

  const divElement = displayOutputEl.querySelector(`[data-id="${index}"`);
  console.log("Found div:", divElement);

  // prevents double execution
  if (divElement.dataset.selected) {
    return;
  }

  divElement.dataset.selected = "true";

  const html = `
  <div class="line-wrapper-out">
  <h3>Vorname: </h3> 
  <input data-id="firstName" value="${students[index].firstName}">
  <h3>Nachname: </h3>
  <input data-id="lastName"value="${students[index].lastName}">
  </div>
  
  <div class="line-wrapper-out">
  <h3>Alter: </h3>
  <input type="number" min="1" max="30" class="small-input" data-id="age" value="${students[index].age}">
  <h3>Klasse: </h3>
  <select class="small-input" id="schoolClass">
          <option value=${students[index].schoolClass}>${students[index].schoolClass}</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
  </select>
  </div>
  <div class="line-wrapper-out">
  <h3>Noten: </h3><br>
 
  <div class="score">
          <h4 for="english">Englisch:</h4>
          <input id="english" type="number" min="1" max="6" value="${students[index].score.english}"/>
          
          <h4 for="german">Deutsch:</h4>
          <input id="german" type="number" min="1" max="6" value="${students[index].score.german}"/>
          
          <h4 for="math">Mathe:</h4>
          <input id="math" type="number" min="1" max="6" value="${students[index].score.math}"/>
        </div>
  </div>

  ${divElement.innerHTML}`;
  divElement.innerHTML = html;
}

function saveStudent(index) {
  console.log("Save Student", index);
  const divElement = displayOutputEl.querySelector(`[data-id="${index}"]`);
  console.log("Found div:", divElement);

  if (divElement.querySelector(`[data-id="firstName"]`) !== null) {
    students[index].firstName = divElement.querySelector(`[data-id="firstName"]`).value;
    students[index].lastName = divElement.querySelector(`[data-id="lastName"]`).value;
    students[index].age = divElement.querySelector(`[data-id="age"]`).value;
    students[index].schoolClass = divElement.querySelector("#schoolClass").value;
    students[index].score.english = divElement.querySelector("#english").value;
    students[index].score.german = divElement.querySelector("#german").value;
    students[index].score.math = divElement.querySelector("#math").value;

    saveStudentsToLocalStorage();
    showStudents();
  } else {
    alert("Bitte zuerst die Daten ändern");
  }
}

function loadStudentsFromLocalStorage() {
  console.log("LOAD! students", LOCAL_STORAGE_KEY);

  const studentsLoad = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));

  if (studentsLoad !== null) {
    students = studentsLoad;
    showStudents();
  }
}

function saveStudentsToLocalStorage() {
  console.log("SAVE! Students");
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(students));
}

function clearLocalStorage() {
  localStorage.clear(LOCAL_STORAGE_KEY);
  students = [];
  showStudents();
}
