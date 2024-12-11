/* x-rapid API acess key : 
90686aef92msh785337be2a378ebp13e3c7jsn2a3f8b9509ef */

/* EXCERCISE NAMES */
/* 
    Push + Abdominal Day 1:
    1. Seated Dumbbell Press
    2. Holman Overhead Press
    3. Dumbbell Lateral Raise
    4. Dumbbell Front Raise
    5. Triceps Pushdown - Rope Attachmen
    6. Low cable overhead triceps extension
    7. Crunches
    8. Bottoms Up

    Pull + Back Day 2:
    1. Bent Over Barbell Row 4x10
    2. Lat pull-down 
    3. Seated Cable Rows
    4. Dumbbell Bicep Curl
    5. Incline Hammer Curls
    7. Bird Dog
    8. Plank



*/

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Host": "exercises-by-api-ninjas.p.rapidapi.com",
    "X-RapidAPI-Key": "90686aef92msh785337be2a378ebp13e3c7jsn2a3f8b9509ef",
  },
};
fetch(
  "https://exercises-by-api-ninjas.p.rapidapi.com/v1/exercises?muscle=lats&name=pull-down",
  options
)
  .then((response) => response.json())
  .then((response) => console.log(response))
  .catch((err) => console.error(err));

document.addEventListener("DOMContentLoaded", () => {
  const table = document.getElementById("data-table");

  const savedData = JSON.parse(localStorage.getItem("exerciseData"));
  if (savedData) {
    for (let i = 0; i < savedData.length; i++) {
      const row = savedData[i];
      let tableRow = table.insertRow(i + 1);
      for (let j = 0; j < row.length; j++) {
        let cell = tableRow.insertCell(j);
        cell.innerText = row[j];
        cell.setAttribute("contenteditable", "true");
      }
    }
  }
});

function saveTableData() {
  const table = document.getElementById("data-table");
  const data = [];

  for (let i = 1; i < table.rows.length; i++) {
    const row = table.rows[i];
    const rowData = [];
    for (let j = 0; j < row.cells.length; j++) {
      rowData.push(row.cells[j].innerText.trim());
    }
    data.push(rowData);
  }

  localStorage.setItem("exerciseData", JSON.stringify(data));
}

function addRow() {
  let table = document.getElementById("data-table");
  let row = table.insertRow();

  for (let i = 0; i < 4; i++) {
    let cell = row.insertCell(i);
    cell.setAttribute("contenteditable", "true");
  }
}
