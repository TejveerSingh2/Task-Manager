function openForm() {
    document.getElementById("myForm").style.display = "block";
}

function closeForm() {
    document.getElementById("myForm").style.display = "none";
}


// scripts.js
let data = [];

const tasksList = document.getElementById('tasks');
const addTaskForm = document.getElementById('add-task');

window.onload = () => {
    let localData = window.localStorage.getItem('tasks');
    JSON.parse(localData).forEach(task => {
        const newTask = createTask(task.title, task.description, task.dueDate, task.category);
        tasksList.appendChild(newTask);
    });
}

addTaskForm.addEventListener('click', () => {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const dueDate = document.getElementById('due-date').value;
    const category = document.getElementById('category').value;

    console.log(title, description, dueDate, category);

    const newTask = createTask(title, description, dueDate, category);
    tasksList.appendChild(newTask);
});

function createTask(title, description, dueDate, category) {
    const taskElement = document.createElement('li');
    let task = {
        title,
        description,
        dueDate,
        category,
        completed: false
    }
    data.push(task);
    window.localStorage.setItem("tasks", JSON.stringify(data));
    taskElement.innerHTML = `
        <h3>${title}</h3>
        <p>${description}</p>
        <p>Due Date: ${dueDate}</p>
        <p>Category: ${category}</p>
        <button class="complete-button">Mark as Completed</button>
        <button class="delete-button">Delete</button>
    `;

    const completeButton = taskElement.querySelector('.complete-button');
    completeButton.addEventListener('click', () => {
        data = data.map((item) => {
            if (item.title === title && item.description === description && item.dueDate === dueDate && item.category === category) {
                item.completed = true;
            }
            return item;
        });
        window.localStorage.setItem("tasks", JSON.stringify(data));
    });




    const deleteButton = taskElement.querySelector('.delete-button');
    deleteButton.addEventListener('click', () => {
        tasksList.removeChild(taskElement);
        window.localStorage.setItem("tasks", JSON.stringify(data.filter((item) => {
            return item.title !== title && item.description !== description && item.dueDate !== dueDate && item.category !== category;
        })));
    });
    // Add event listeners for the complete and delete buttons
    return taskElement;
}