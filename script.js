
const input = document.getElementById("taskInput");
const button = document.getElementById("addTask");
const list = document.getElementById("taskList");
const counter = document.getElementById("taskCounter");
const filterButtons = document.querySelectorAll(".filter-btn");
const darkModeButton = document.getElementById("darkMode");

const taskForm = document.getElementById("taskForm");
const totalStat = document.getElementById("totalStat");
const activeStat = document.getElementById("activeStat");
const completedStat = document.getElementById("completedStat");

let tasks = [];
let currentFilter = "all";

// Actualizeaza statisticile
function updateCounter() {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    const active = total - completed;

    counter.textContent = `${total} ${total === 1 ? "sarcină" : "sarcini"}`;

    if (totalStat) totalStat.textContent = total;
    if (activeStat) activeStat.textContent = active;
    if (completedStat) completedStat.textContent = completed;
}

// Afiseaza sarcinile in functie de filtrul selectat
function renderTasks() {
    list.innerHTML = "";

    const filteredTasks = tasks.filter(task => {
        if (currentFilter === "active") {
            return !task.completed;
        }

        if (currentFilter === "completed") {
            return task.completed;
        }

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

        completeButton.type = "button";
        completeButton.textContent = taskData.completed
            ? "Redeschide"
            : "Finalizează";

        completeButton.setAttribute(
            "aria-label",
            taskData.completed
                ? `Redeschide sarcina ${taskData.text}`
                : `Finalizează sarcina ${taskData.text}`
        );

        completeButton.addEventListener("click", () => {
            taskData.completed = !taskData.completed;
            renderTasks();
        });

        deleteButton.type = "button";
        deleteButton.textContent = "Șterge";
        deleteButton.setAttribute(
            "aria-label",
            `Șterge sarcina ${taskData.text}`
        );

        deleteButton.addEventListener("click", () => {
            tasks = tasks.filter(item => item.id !== taskData.id);
            renderTasks();
        });

        task.append(taskText, completeButton, deleteButton);
        list.appendChild(task);
    });

    updateCounter();
}

// Adauga o sarcina noua
function addTask(event) {
    if (event) {
        event.preventDefault();
    }

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

// Suporta formularul si butonul de adaugare
if (taskForm) {
    taskForm.addEventListener("submit", addTask);
} else if (button) {
    button.addEventListener("click", addTask);
}

// Filtrarea sarcinilor
filterButtons.forEach(filterButton => {
    filterButton.addEventListener("click", () => {
        currentFilter = filterButton.dataset.filter;

        filterButtons.forEach(btn => {
            btn.classList.toggle("active", btn === filterButton);
        });

        renderTasks();
    });
});

// Activarea sau dezactivarea modului intunecat
if (darkModeButton) {
    darkModeButton.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");

        const darkModeActive =
            document.body.classList.contains("dark-mode");

        darkModeButton.innerHTML = darkModeActive
            ? "☀ <span>Temă</span>"
            : "☾ <span>Temă</span>";
    });
}

// Afiseaza lista initiala
renderTasks();
