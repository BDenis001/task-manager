
const input = document.getElementById("taskInput");
const button = document.getElementById("addTask");
const list = document.getElementById("taskList");
const counter = document.getElementById("taskCounter");
const filterButtons = document.querySelectorAll(".filter-btn");
const darkModeButton = document.getElementById("darkMode");

let tasks = [];
let currentFilter = "all";

function updateCounter() {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;

    counter.textContent =
        `Sarcini: ${total} | Active: ${total - completed} | Finalizate: ${completed}`;
}

function renderTasks() {
    list.innerHTML = "";

    const filteredTasks = tasks.filter(task => {
        if (currentFilter === "active") return !task.completed;
        if (currentFilter === "completed") return task.completed;
        return true;
    });

    filteredTasks.forEach(taskData => {
        const task = document.createElement("li");
        const taskText = document.createElement("span");
        const completeButton = document.createElement("button");
        const deleteButton = document.createElement("button");

        taskText.textContent = taskData.text;

        if (taskData.completed) {
            task.classList.add("completed");
        }

        completeButton.textContent = taskData.completed
            ? "Redeschide"
            : "Finalizează";

        completeButton.addEventListener("click", () => {
            taskData.completed = !taskData.completed;
            renderTasks();
        });

        deleteButton.textContent = "Șterge";
        deleteButton.addEventListener("click", () => {
            tasks = tasks.filter(item => item.id !== taskData.id);
            renderTasks();
        });

        task.append(taskText, completeButton, deleteButton);
        list.appendChild(task);
    });

    updateCounter();
}

function addTask() {
    const text = input.value.trim();

    if (text === "") {
        input.focus();
        return;
    }

    tasks.push({
        id: Date.now() + Math.random(),
        text: text,
        completed: false
    });

    input.value = "";
    renderTasks();
    input.focus();
}

button.addEventListener("click", addTask);

input.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        addTask();
    }
});

filterButtons.forEach(filterButton => {
    filterButton.addEventListener("click", () => {
        currentFilter = filterButton.dataset.filter;

        filterButtons.forEach(btn => {
            btn.classList.toggle("active", btn === filterButton);
        });

        renderTasks();
    });
});

darkModeButton.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});

renderTasks();
