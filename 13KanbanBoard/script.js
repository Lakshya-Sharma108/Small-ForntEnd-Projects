const tasksData = {};


const todo = document.querySelector("#todo");
const progress = document.querySelector("#progress");
const done = document.querySelector("#done");
const columns = [todo, progress, done];
let dragElement = null;

if (localStorage.getItem("tasks")) {
    const data = JSON.parse(localStorage.getItem("tasks"));
    console.log(data);

    for (const col in data) {
        const column = document.querySelector(`#${col}`);
        data[col].forEach(task => {
            const div = document.createElement("div");
            div.classList.add("task");
            div.setAttribute("draggable", "true");

            div.innerHTML = `
                <h2>${task.title}</h2>
                <p>${task.desc}</p>
                <button class="delete-btn">Delete</button>
                `;
            column.appendChild(div);

            div.addEventListener("drag", (e) => {
                dragElement = div;
            });
        })

        const tasks = column.querySelectorAll(".task");
        const count = column.querySelector(".right");
        count.innerText = tasks.length;
    }
}

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
        e.preventDefault();

        column.appendChild(dragElement);
        column.classList.remove("hover-over");


        columns.forEach(col => {
            const tasks = col.querySelectorAll(".task");
            const count = col.querySelector(".right");
            // console.log(tasks.length);
            tasksData[col.id] = Array.from(tasks).map(t => {
                return {
                    title: t.querySelector("h2").innerText,
                    desc: t.querySelector("p").innerText
                }
            });
            // console.log(tasksData);
            localStorage.setItem("tasks", JSON.stringify(tasksData));
            count.innerText = tasks.length;
        });
    });
}

addDragEventOnColumn(todo);
addDragEventOnColumn(progress);
addDragEventOnColumn(done);






// Modal functionality
const toggleModalBtn = document.querySelector("#toggle-modal");
const modalBg = document.querySelector(".modal .bg");
const modal = document.querySelector(".modal");
const addTaskBtn = document.querySelector("#add-new-task");

toggleModalBtn.addEventListener("click", () => {
    modal.classList.toggle("active");
});

modalBg.addEventListener("click", () => {
    modal.classList.remove("active");
});

addTaskBtn.addEventListener("click", () => {
    const taskTitle = document.querySelector("#task-title-input").value;
    const taskDesc = document.querySelector("#task-desc-input").value;

    const div = document.createElement("div");
    div.classList.add("task");
    div.setAttribute("draggable", "true");
    div.innerHTML = `
        <h2>${taskTitle}</h2>
        <p>${taskDesc}</p>
        <button class="delete-btn">Delete</button>
        `;

    todo.appendChild(div);

    columns.forEach(col => {
        const tasks = col.querySelectorAll(".task");
        const count = col.querySelector(".right");
        // console.log(tasks.length);
        tasksData[col.id] = Array.from(tasks).map(t => {
            return {
                title: t.querySelector("h2").innerText,
                desc: t.querySelector("p").innerText
            }
        });
        // console.log(tasksData);
        localStorage.setItem("tasks", JSON.stringify(tasksData));
        count.innerText = tasks.length;
    });



    div.addEventListener("drag", (e) => {
        dragElement = div;
    });

    modal.classList.remove("active");
});
