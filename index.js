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

const students = [];

function insertStudent() {
  console.log("insertStudent");

  insertMoreStudents(1);
}

function showStudents() {
  console.log("showStudents");
  console.log(students);
  clearViewFactory();
  viewFactory();

  if (students.length > 999) {
    countStudentsEl[0].innerHTML = `<p style="font-size: 1.5rem">${students.length}</p>`;
  } else {
    countStudentsEl[0].innerHTML = `${students.length}`;
  }
}

function insertMoreStudents(number) {
  console.log("insertMoreStudents");

  for (let i = 0; i < number; i++) {
    const names = randomNames();

    const student = {
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
    students.push(student);
  }
  console.log("Students: ", students.length);
  saveStudentsToLocalStorage();
  showStudents();
}

function randomNumber(min, max) {
  return (number = Math.floor(Math.random() * (max - min) + 1) + min);
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
    firstName: firstNames[randomNumber(0, firstNames.length)],
    lastName: lastNames[randomNumber(0, lastNames.length)],
  };

  return firstAndLastName;
}

function viewFactory() {
  for (let key in students) {
    const card = document.createElement("div");
    card.dataset.card = key;
    const cardText = document.createTextNode(`${key}`);
    card.appendChild(cardText);

    const nameHeader = document.createElement("h1");
    const headerText = document.createTextNode(`${students[key].firstName}, ${students[key].lastName}`);
    nameHeader.appendChild(headerText);
    card.appendChild(nameHeader);

    const studentAge = document.createElement("h2");
    const ageText = document.createTextNode(`Alter: ${students[key].age}, Klasse: ${students[key].schoolClass}`);
    studentAge.appendChild(ageText);
    card.appendChild(studentAge);

    const scoreHeader = document.createElement("h2");
    const scoreHeaderText = document.createTextNode("Noten:");
    scoreHeader.appendChild(scoreHeaderText);
    card.appendChild(scoreHeader);

    for (const scoreCount in SCORE_TEXTS) {
      const score = document.createElement("h2");
      const scoreText = document.createTextNode(`${scoreCount}: ${students[key].score[SCORE_TEXTS[scoreCount]]}`);
      score.appendChild(scoreText);
      card.appendChild(score);
    }

    const actionBar = document.createElement("div");
    actionBar.classList.add("action-bar");

    // <span class="material-symbols-outlined">delete</span>
    const iconDelete = document.createElement("span");
    iconDelete.classList.add("material-symbols-outlined");
    const iconDeleteText = document.createTextNode("delete");
    iconDelete.setAttribute("onclick", `deleteStudent("${key}")`);
    iconDelete.appendChild(iconDeleteText);
    actionBar.appendChild(iconDelete);

    // <span class="material-symbols-outlined">edit</span>
    const iconEdit = document.createElement("span");
    iconEdit.classList.add("material-symbols-outlined");
    const iconEditText = document.createTextNode("edit");
    iconEdit.setAttribute("onclick", `editStudent("${key}")`);
    iconEdit.appendChild(iconEditText);
    actionBar.appendChild(iconEdit);

    // <span class="material-symbols-outlined">save</span>
    const iconSave = document.createElement("span");
    iconSave.classList.add("material-symbols-outlined");
    const iconSaveText = document.createTextNode("save");
    iconSave.setAttribute("onclick", `saveStudent("${key}")`);
    iconSave.appendChild(iconSaveText);
    actionBar.appendChild(iconSave);

    card.appendChild(actionBar);

    const hr = document.createElement("hr");
    card.appendChild(hr);

    displayOutputEl.appendChild(card);
  }
}

function clearViewFactory() {
  displayOutputEl.innerHTML = "";
}

function deleteStudent(key) {
  console.log("DELETE!", key);
  students.splice(key, 1);
  console.log("Studenst after del", students);
  showStudents();
}

function editStudent(key) {
  console.log("edit Student", key);

  const divElement = displayOutputEl.querySelector(`[data-card="${key}"`);
  console.log("Found div:", divElement);

  // prevents double execution
  if (divElement.dataset.selectet) {
    return;
  }

  divElement.dataset.selectet = "true";

  const html = `
  <div class="line-wrapper-out">
  <h3>Vorname: </h3> 
  <input data-id="firstName" value="${students[key].firstName}">
  <h3>Nachname: </h3>
  <input data-id="lastName"value="${students[key].lastName}">
  </div>
  
  <div class="line-wrapper-out">
  <h3>Alter: </h3>
  <input type="number" min="1" max="30" class="small-input" data-id="age" value="${students[key].age}">
  <h3>Klasse: </h3>
  <select class="small-input" id="schoolClass">
          <option value=${students[key].schoolClass}>${students[key].schoolClass}</option>
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
          <input id="english" type="number" min="1" max="6" value="${students[key].score.english}"/>
          
          <h4 for="german">Deutsch:</h4>
          <input id="german" type="number" min="1" max="6" value="${students[key].score.german}"/>
          
          <h4 for="math">Mathe:</h4>
          <input id="math" type="number" min="1" max="6" value="${students[key].score.math}"/>
        </div>
  </div>

  ${divElement.innerHTML}`;
  divElement.innerHTML = html;
}

function saveStudent(key) {
  console.log("Save Student", key);
  const divElement = displayOutputEl.querySelector(`[data-card="${key}"]`);
  console.log("Found div:", divElement);

  if (divElement.querySelector(`[data-id="firstName"]`) !== null) {
    students[key].firstName = divElement.querySelector(`[data-id="firstName"]`).value;
    students[key].lastName = divElement.querySelector(`[data-id="lastName"]`).value;
    students[key].age = divElement.querySelector(`[data-id="age"]`).value;
    students[key].schoolClass = divElement.querySelector("#schoolClass").value;
    students[key].score.english = divElement.querySelector("#english").value;
    students[key].score.german = divElement.querySelector("#german").value;
    students[key].score.math = divElement.querySelector("#math").value;

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

function LocalStorageClear() {
  localStorage.clear(LOCAL_STORAGE_KEY);
  students = [];
  showStudents();
}
