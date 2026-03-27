console.log("JavaScript connected!");
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

/* ADD TASK */
addTaskBtn.addEventListener("click", () => {

    const taskText = taskInput.value;

    if(taskText === "") return;

    createTaskElement(taskText);

    saveTasks();

    taskInput.value = "";

});


/* CREATE TASK FUNCTION (Reusable) */
function createTaskElement(taskText, isCompleted = false){

    const li = document.createElement("li");

    if(isCompleted){
        li.classList.add("completed");
    }

    const span = document.createElement("span");
    span.textContent = taskText;

    span.addEventListener("click", () => {
        li.classList.toggle("completed");
        saveTasks(); // 👈 important
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";

    deleteBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        li.remove();
        saveTasks();
    });

    li.appendChild(span);
    li.appendChild(deleteBtn);

    taskList.appendChild(li);
}

/* SAVE TASKS */
function saveTasks(){

    const tasks = [];

    document.querySelectorAll("#taskList li").forEach(li => {

        const text = li.querySelector("span").textContent;
        const completed = li.classList.contains("completed");

        tasks.push({ text, completed });

    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}


/* LOAD TASKS */
function loadTasks(){

    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach(task => {

        createTaskElement(task.text, task.completed);

    });

}

loadTasks();
