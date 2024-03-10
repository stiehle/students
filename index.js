const firstNameEL = document.getElementById("firstName");
const lastNameEL = document.getElementById("lastName");
const ageEL = document.getElementById("age");
const schoolClassEl = document.getElementById("schoolClass");

const scoreEnglishEL = document.getElementById("english");
const scoreGermanEL = document.getElementById("german");
const scoreMathEL = document.getElementById("math");

const displayOutputEl = document.getElementsByClassName("output-wrapper")[0];

const students = [];

insertMoreStudent(100);

function insertStudent() {
  console.log("insertStudents");

  let student = {
    firstName: firstNameEL.value,
    lastName: lastNameEL.value,
    age: Number(age.value),
    scoolClass: Number(schoolClassEl.value),
    score: {
      english: Number(scoreEnglishEL.value),
      german: Number(scoreGermanEL.value),
      math: Number(scoreMathEL.value),
    },
  };

  // console.log(student);
  students.push(student);
  console.log(students);
}

function showStudents() {
  console.log("showStudents");
  console.log(students);
  clearOutput();
  showOutput2();
  randomNumber(5, 10);
}

function insertStudent() {
  console.log("insertStudents");

  let student = {
    firstName: firstNameEL.value,
    lastName: lastNameEL.value,
    age: Number(age.value),
    scoolClass: Number(schoolClassEl.value),
    score: {
      english: Number(scoreEnglishEL.value),
      german: Number(scoreGermanEL.value),
      math: Number(scoreMathEL.value),
    },
  };

  // students.push(student);
  students.unshift(student); //insert at first Position
  console.log(students);
  clearOutput();
  showOutput2(students);
}

function insertMoreStudent(number) {
  console.log("insertMoreStudents");

  for (let i = 0; i < number; i++) {
    let student = {
      firstName: randomNames().firstName,
      lastName: randomNames().lastName,
      // firstName: `Max ${i}`,
      // lastName: `Mustermann ${i}`,
      age: randomNumber(5, 15),
      scoolClass: randomNumber(1, 4),
      score: {
        english: randomNumber(1, 6),
        german: randomNumber(1, 6),
        math: randomNumber(1, 6),
      },
    };

    // console.log(student);
    students.push(student);
  }
  console.log(students);
}

function randomNumber(min, max) {
  let number;

  for (let i = 0; i < 10; i++) {
    number = Math.floor(Math.random() * (max - min) + 1) + min;
    //console.log(number);
    return number;
  }
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

function showOutput() {
  console.log("Output Studenten");
  let html = "";

  students.forEach((element) => {
    html += `
    <div>
    <h1> ${element.firstName}, ${element.lastName}</h1>
    <h2> Alter: ${element.age}, Klasse: ${element.scoolClass}</h2>
    <h2> Noten: </h2>
    <h2>Englisch: ${element.score.english}</h2>
    <h2>Deutsch: ${element.score.german}</h2>
    <h2>Mathe: ${element.score.math}</h2>
    <hr>
    </div>`;
  });
  displayOutputEl.innerHTML = html;
}

function showOutput2() {
  students.forEach((element) => {
    const card = document.createElement("div");
    const header = document.createElement("h1");
    const headerText = document.createTextNode(`${element.firstName}, ${element.lastName}`);
    header.appendChild(headerText);
    card.appendChild(header);

    const age = document.createElement("h2");
    const ageText = document.createTextNode(`Alter: ${element.age}, Klasse: ${element.scoolClass}`);
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

    for (let key in scoreTexts) {
      //console.log(key, scoreTexts[key]);
      const score = document.createElement("h2");
      const scoreText = document.createTextNode(`${key} ${element.score[scoreTexts[key]]}`);
      score.appendChild(scoreText);
      card.appendChild(score);
    }

    const hr = document.createElement("hr");
    card.appendChild(hr);

    displayOutputEl.appendChild(card);
  });
}

function clearOutput() {
  displayOutputEl.innerHTML = "";
}
