const todo = document.querySelector("#todo");
const progress = document.querySelector("#progress");
const done = document.querySelector("#done");
let dragElement = null;

// console.log(todo, progress, done);


const tasks = document.querySelectorAll(".task");

tasks.forEach(task => {
    task.addEventListener("dragenter", (e) => {
        // console.log("dragenter", e);
        dragElement = task;
    });
})


function addDragEventOnColumn(column) {
    column.addEventListener("dragenter", (e) => {
        // console.log("dragenter", e);
        e.preventDefault();
        column.classList.add("hover-over");
    });

    column.addEventListener("dragleave", (e) => {
        // console.log("dragleave", e);
        e.preventDefault();
        column.classList.remove("hover-over");
    });
    
    
    column.addEventListener("dragover", (e) => {
        // console.log("dragover", e);
        e.preventDefault();
    });

    column.addEventListener("drop", (e) => {
        // console.log("drop", e);
        e.preventDefault();
        // console.log("Dropped",dragElement,column);
        column.appendChild(dragElement);
        column.classList.remove("hover-over");
    });
}

addDragEventOnColumn(todo);
addDragEventOnColumn(progress);
addDragEventOnColumn(done);




// Modal functionality
const toggleModalBtn = document.querySelector("#toggle-modal");
const modalBg = document.querySelector(".modal .bg");
const modal = document.querySelector(".modal");

toggleModalBtn.addEventListener("click", () => {
    modal.classList.toggle("active");
});

modalBg.addEventListener("click", () => {
    modal.classList.remove("active");
});