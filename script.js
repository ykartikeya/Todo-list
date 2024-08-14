document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addBtn = document.getElementById('addBtn');
    const taskList = document.getElementById('taskList');

    let editingTask = null;

    addBtn.addEventListener('click', () => {
        if (editingTask) {
            updateTask();
        } else {
            addTask();
        }
    });

    taskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            if (editingTask) {
                updateTask();
            } else {
                addTask();
            }
        }
    });

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === '') {
            alert('Please enter a task.');
            return;
        }

        const li = document.createElement('li');
        li.textContent = taskText;

        const actions = document.createElement('div');
        actions.classList.add('actions');

        const editBtn = document.createElement('button');
        editBtn.innerHTML = '<img src="edit-icon.png" alt="Edit">';
        editBtn.addEventListener('click', () => editTask(li));

        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = '<img src="delete-icon.png" alt="Delete">';
        deleteBtn.addEventListener('click', () => li.remove());

        actions.appendChild(editBtn);
        actions.appendChild(deleteBtn);

        li.appendChild(actions);
        li.addEventListener('click', () => {
            li.classList.toggle('completed');
        });

        taskList.appendChild(li);
        taskInput.value = '';
    }

    function editTask(li) {
        taskInput.value = li.firstChild.textContent;
        editingTask = li;
        addBtn.innerHTML = '<img src="update-icon.png" alt="Update">';
    }

    function updateTask() {
        editingTask.firstChild.textContent = taskInput.value;
        editingTask = null;
        taskInput.value = '';
        addBtn.innerHTML = '<img src="add-icon.png" alt="Add">';
    }
});
