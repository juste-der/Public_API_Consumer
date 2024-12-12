const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Host": "exercises-by-api-ninjas.p.rapidapi.com",
    "X-RapidAPI-Key": "90686aef92msh785337be2a378ebp13e3c7jsn2a3f8b9509ef",
  },
};

// const day1Exercises = [
//   {
//     name: "Seated Dumbbell Press",
//     gif: "gifs/dumbell-press.webp",
//   },
//   {
//     name: "Holman Overhead Press",
//     gif: "gifs/overhead-press.webp",
//   },
//   {
//     name: "Dumbbell Lateral Raise",
//     gif: "gifs/lateral-raise.webp",
//   },
//   {
//     name: "Dumbbell Front Raise",
//     gif: "gifs/fron-raise.webp",
//   },
//   {
//     name: "Triceps Pushdown - Rope Attachment",
//     gif: "gifs/triceps-pushdown.webp",
//   },
//   {
//     name: "Crunches",
//     gif: "gifs/crunches.webp",
//   },
//   {
//     name: "Bottoms Up",
//     gif: "gifs/bottoms-up.webp",
//   },
// ];
// const day2Exercises = [
//   {
//     name: "Bent Over Barbell Row",
//     gif: "gifs/bent-rows.webp",
//   },
//   {
//     name: "Holman Overhead Press",
//     gif: "gifs/overhead-press.webp",
//   },
//   {
//     name: "Lat pull-down",
//     gif: "gifs/lat-pulldo.webp",
//   },
//   {
//     name: "Dumbbell Front Raise",
//     gif: "gifs/fron-raise.webp",
//   },
//   {
//     name: "Triceps Pushdown - Rope Attachment",
//     gif: "gifs/triceps-pushdown.webp",
//   },
//   {
//     name: "Crunches",
//     gif: "gifs/crunches.webp",
//   },
//   {
//     name: "Bottoms Up",
//     gif: "gifs/bottoms-up.webp",
//   },
// ];

const day1Exercises = [
  "Seated Dumbbell Press",
  "Holman Overhead Press",
  "Dumbbell Lateral Raise",
  "Dumbbell Front Raise",
  "Triceps Pushdown - Rope Attachment",
  "Low cable overhead triceps extension",
  "Crunches",
  "Bottoms Up",
];

const day2Exercises = [
  "Bent Over Barbell Row",
  "Lat pull-down",
  "Seated Cable Rows",
  "Dumbbell Bicep Curl",
  "Incline Hammer Curls",
  "Bird Dog",
  "Plank",
];

//Function for displaying exercises day1 and day 2
async function displayExercisesForDays() {
  await displayExercises(day1Exercises, 1, "Day 1 - Push and Abdominal");
  await displayExercises(
    day2Exercises,
    day1Exercises.length + 1,
    "Day 2 - Pull and Back"
  );
}

//Function that fetches details for a specific list of exercises, one by one
async function displayExercises(exerciseNames, startIndex, dayTitle) {
  const dayHeading = document.createElement("h2");
  dayHeading.textContent = dayTitle;
  document.body.appendChild(dayHeading);

  for (let i = 0; i < exerciseNames.length; i++) {
    const exerciseName = exerciseNames[i];
    const exerciseNumber = startIndex + i;
    try {
      const response = await fetch(
        `https://exercises-by-api-ninjas.p.rapidapi.com/v1/exercises?name=${encodeURIComponent(
          exerciseName
        )}`,
        options
      );
      const data = await response.json();

      const exercise = data[0];

      const exerciseElement = document.createElement("div");
      exerciseElement.className = "exercise";

      const tableContainer = createTable(exerciseNumber);

      exerciseElement.innerHTML = `
          <h3>${exercise.name}</h3>
          <p><strong>Muscle Group:</strong> ${exercise.muscle}</p>
        `;

      document.body.appendChild(exerciseElement);
      document.body.appendChild(tableContainer);
    } catch (err) {
      console.error(err);
    }
  }
}

// Function to create table dynamically with unique number
function createTable(tableNumber) {
  const tableContainer = document.createElement("div");
  tableContainer.className = "table-container";

  const table = document.createElement("table");
  table.className = "data-table";
  table.id = `table-${tableNumber}`;

  const headerRow = document.createElement("tr");
  const headers = ["DATE", "SET", "WEIGHT", "REPS"];
  headers.forEach((header) => {
    const th = document.createElement("th");
    th.innerText = header;
    headerRow.appendChild(th);
  });
  table.appendChild(headerRow);

  const buttonContainer = document.createElement("div");
  buttonContainer.className = "button-container";

  const addButton = document.createElement("button");
  addButton.innerText = "Add Row";
  addButton.onclick = () => addRow(table);
  buttonContainer.appendChild(addButton);

  const saveButton = document.createElement("button");
  saveButton.innerText = "Save";
  saveButton.onclick = () => saveTableData(table);
  buttonContainer.appendChild(saveButton);

  tableContainer.appendChild(table);
  tableContainer.appendChild(buttonContainer);

  loadSavedData(table, tableNumber);

  return tableContainer;
}

// Function for adding a new row to the table
function addRow(table) {
  const row = table.insertRow();
  const headers = ["DATE", "SET", "WEIGHT", "REPS"];
  headers.forEach(() => {
    const cell = row.insertCell();
    cell.setAttribute("contenteditable", "true");
  });
}

// Function to save the table data to localStorage
function saveTableData(table) {
  const data = [];
  const rows = table.rows;

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    const rowData = [];
    for (let j = 0; j < row.cells.length; j++) {
      rowData.push(row.cells[j].innerText.trim());
    }
    data.push(rowData);
  }

  const tableId = table.id;
  localStorage.setItem(tableId, JSON.stringify(data));
}

// Function to load saved data from localStorage into the table
function loadSavedData(table, tableNumber) {
  const tableId = `table-${tableNumber}`;
  const savedData = JSON.parse(localStorage.getItem(tableId));

  if (savedData) {
    for (let i = 0; i < savedData.length; i++) {
      const rowData = savedData[i];
      const row = table.insertRow();
      for (let j = 0; j < rowData.length; j++) {
        const cell = row.insertCell(j);
        cell.innerText = rowData[j];
        cell.setAttribute("contenteditable", "true");
      }
    }
  }
}

displayExercisesForDays();
