
var students = [
    {
        name: 'Tariq',
        rollNumber: 129,
        math: 98,
        eng: 85,
        urd: 89,
        sci: 90,
    },
    {
        name: 'Moiz',
        rollNumber: 211,
        math: 89,
        eng: 95,
        urd: 79,
        sci: 83,
    },
    {
        name: 'Ashraf',
        rollNumber: 113,
        math: 90,
        eng: 88,
        urd: 80,
        sci: 79,
    }
]
var main = document.getElementById('main')
var searched = document.getElementById("search")
function add() {
    for (var i = 0; i < students.length; i++) {
        main.innerHTML += `
<tr>
<td>${[i + 1]}</td>
<td>${students[i].name}</td>
<td>${students[i].rollNumber}</td>
<td>${students[i].math}</td>
<td>${students[i].eng}</td>
<td>${students[i].urd}</td>
<td>${students[i].sci}</td>
<td>${students[i].math + students[i].eng + students[i].urd + students[i].sci}</td>
<td>${((students[i].math + students[i].eng + students[i].urd + students[i].sci ) * 100 / 400).toFixed(2)}%</td>
<td><input type="button" value="Delete" class="delBtn" onclick="deleteRow(this)"></td>
<tr>
`};
}
add();
function search() {
    var found = false;
    for (i = 0; i < students.length; i++) {
        if (searched.value.toLowerCase() == students[i].name.toLowerCase()) {
            found = true;
            Swal.fire({
                // title: `Student Found!`,
                title: `Name: ${students[i].name}`,
                text: ` Maths: ${students[i].math} | English: ${students[i].eng} | Urdu: ${students[i].urd} | Science ${students[i].sci}} | Total: ${students[i].math + students[i].eng + students[i].urd + students[i].sci} | Percentage: ${((students[i].math + students[i].eng + students[i].urd + students[i].sci) * 100 / 400).toFixed(2)}%`,
                icon: 'success',
                confirmButtonText: 'Done'
            });
            searched.value = ""
        }
    }            
    if (found === false) {
        Swal.fire({
            icon: 'error',
            title: 'Error Finding Student',
            text: searched.value + ' Is Not In This List',
        })
        searched.value = ""
    }
}
function newStudent() {
    Swal.fire({
      title: 'Enter Student Details',
      html:
      '<input id="swal-input1" class="swal2-input" placeholder="Name">' +
        '<input id="swal-input2" class="swal2-input" placeholder="Roll Number">' +
        '<input id="swal-input3" class="swal2-input" placeholder="Math">' +
        '<input id="swal-input4" class="swal2-input" placeholder="English">' +
        '<input id="swal-input5" class="swal2-input" placeholder="Urdu">' +
        '<input id="swal-input6" class="swal2-input" placeholder="Science">', 
      focusConfirm: false,
      preConfirm: () => {
        const name = document.getElementById('swal-input1').value;
        const rollNumber = document.getElementById('swal-input2').value;
        const math = parseInt(document.getElementById('swal-input3').value);
        const eng = parseInt(document.getElementById('swal-input4').value);
        const urd = parseInt(document.getElementById('swal-input5').value);
        const sci = parseInt(document.getElementById('swal-input6').value);
  
        if (isNaN(math) || isNaN(eng) || isNaN(urd) || isNaN(sci)) {
          Swal.fire({
            icon: 'error',
            title: 'Invalid Input',
            text: 'Please enter numeric values for Math, English, Urdu, Science.',
          });
          return false; // Prevent closing the alert
        }
  
        return [name, rollNumber, math, eng, urd, sci];
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const formValues = result.value;
  
        const student = {
          name: formValues[0],
          rollNumber: parseInt(formValues[1]),
          math: parseInt(formValues[2]),
          eng: parseInt(formValues[3]),
          urd: parseInt(formValues[4]),
          sci: parseInt(formValues[5]),
        };
  
        students.push(student);
        const index = students.length - 1;
        main.innerHTML += `
          <tr>
            <td>${index + 1}</td>
            <td>${student.name}</td>
            <td>${student.rollNumber}</td>
            <td>${student.math}</td>
            <td>${student.eng}</td>
            <td>${student.urd}</td>
            <td>${student.sci}</td>
            <td>${student.math + student.eng + student.urd + student.sci}</td>
            <td>${((student.math + student.eng + student.urd + student.sci) * 100 / 400).toFixed(2)}%</td>
            <td><input type="button" class="delBtn" value="Delete" onclick="deleteRow(this)"></td>
          </tr>
        `;
      }
    });
  }

  // Delete Function
function deleteRow(r) {
  if (confirm('Are you sure to delete this record ?')) {
  var i = r.parentNode.parentNode.rowIndex;
  document.getElementById("table").deleteRow(i);
}}