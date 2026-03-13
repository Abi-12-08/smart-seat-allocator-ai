let students = [];

// ADD STUDENT MANUALLY
function addStudent(){

let name = document.getElementById("name").value;
let dept = document.getElementById("dept").value;

if(name === "" || dept === ""){
alert("Please enter student name and department");
return;
}

let student = {name:name, dept:dept};
students.push(student);

displayStudents();

document.getElementById("name").value="";
document.getElementById("dept").value="";
}


// DISPLAY STUDENTS
function displayStudents(){

let list = document.getElementById("studentList");
list.innerHTML="";

students.forEach(function(s){

let li=document.createElement("li");
li.innerText = s.name + " (" + s.dept + ")";
list.appendChild(li);

});

}


// GENERATE 30 STUDENTS
function generateStudents(){

students = [];

let names = [
"Amit","Rahul","Priya","Neha","Kiran","Arjun","Sneha","Vikram","Anita","Ravi",
"Divya","Karthik","Meena","Sanjay","Pooja","Naveen","Lakshmi","Ajay","Deepa","Harish",
"Manoj","Keerthi","Varun","Nisha","Ramesh","Suresh","Kavya","Anand","Swathi","Tarun"
];

let depts = ["CSE","ECE","IT","MECH","EEE"];

for(let i=0;i<30;i++){

let dept = depts[Math.floor(Math.random()*depts.length)];

let student = {
name:names[i],
dept:dept
};

students.push(student);

}

displayStudents();

}


// ALLOCATE SEATS
function allocateSeats(){

let seatsDiv = document.getElementById("seats");
seatsDiv.innerHTML="";

let rows = 5;
let cols = 6;

let rowLabels = ["A","B","C","D","E"];

let seatGrid = new Array(rows*cols).fill(null);
let used = new Array(students.length).fill(false);


// CHECK CONSTRAINT
function isValid(pos, student){

let rows = 5;
let cols = 6;

let r = Math.floor(pos / cols);
let c = pos % cols;


// LEFT
if(c > 0){
let left = seatGrid[pos-1];
if(left && left.dept === student.dept){
return false;
}
}


// RIGHT
if(c < cols-1){
let right = seatGrid[pos+1];
if(right && right.dept === student.dept){
return false;
}
}


// FRONT
if(r > 0){
let front = seatGrid[pos-cols];
if(front && front.dept === student.dept){
return false;
}
}


// BACK
if(r < rows-1){
let back = seatGrid[pos+cols];
if(back && back.dept === student.dept){
return false;
}

}

return true;

}


// BACKTRACKING FUNCTION
function solve(pos){

if(pos === rows*cols || pos === students.length){
return true;
}

for(let i=0;i<students.length;i++){

if(!used[i] && isValid(pos, students[i])){

seatGrid[pos] = students[i];
used[i] = true;

if(solve(pos+1)){
return true;
}

seatGrid[pos] = null;
used[i] = false;

}

}

return false;

}


solve(0);


// DISPLAY SEATS
let index=0;

for(let r=0;r<rows;r++){

for(let c=0;c<cols;c++){

let seat=document.createElement("div");
seat.className="seat";

let seatID = rowLabels[r] + (c+1);

if(seatGrid[index]){
seat.innerHTML = "<b>"+seatID+"</b><br>"+seatGrid[index].name+" ("+seatGrid[index].dept+")";
}
else{
seat.innerHTML = "<b>"+seatID+"</b><br>Empty";
}

seatsDiv.appendChild(seat);

index++;

}

}

}
function loadCSV(){

let file = document.getElementById("fileInput").files[0];

if(!file){
alert("Please select a CSV file");
return;
}

let reader = new FileReader();

reader.onload = function(e){

let text = e.target.result;
let lines = text.split("\n");

students = [];

for(let i=1;i<lines.length;i++){

let row = lines[i].split(",");

if(row.length >= 2){

let name = row[0].trim();
let dept = row[1].trim();

students.push({name:name, dept:dept});

}

}

displayStudents();

};

reader.readAsText(file);

}