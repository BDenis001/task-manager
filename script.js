const input = document.getElementById("taskInput");
const button = document.getElementById("addTask");
const list = document.getElementById("taskList");

button.addEventListener("click", function () {
    if (input.value.trim() === "") return;

    const task = document.createElement("li");
    task.textContent = input.value;
task.addEventListener("click", function () {
    task.style.textDecoration = "line-through";
});

    list.appendChild(task);
    input.value = "";
});