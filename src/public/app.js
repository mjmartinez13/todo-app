let tasks = [
    {
        title: 'Responde to Brand\' email',
        completed: false
    },
    {
        title: 'Develop Vidalux',
        completed: false
    }
]

searchTitle = {
    text: ''
};

// =========== RENDER STATUS LABEL
const renderStatusLable = function (status) {
    if (status.length > 0) {
        return `You have ${status.length} incompleted task`
    } else {
        return 'Congrats! you have completed all your tasks!'
    }
}


// ============ RENDER LIST
const renderPriorityList = function (tasks, searchTitle) {

    const statusLabel = document.querySelector("#incomple-task");

    const inCompleteTask = tasks.filter(function (task) {
        return task.completed === false;
    })

    statusLabel.textContent = renderStatusLable(inCompleteTask);

    const searchListResult = tasks.filter(function (task) {
        return task.title.toLocaleLowerCase().includes(searchTitle.text);
    });

    document.querySelector('#list').innerHTML = '';

    searchListResult.sort(function (a, b) {
        if (a.completed < b.completed) {
            return -1;
        } else if (a.completed > b.completed) {
            return 1;
        } else {
            return 0;
        }
    });

    searchListResult.forEach(priority => {

        const p = document.createElement('p');

        if (priority.completed) {
            p.classList.add('completed')
        }

        document.querySelector('#list').appendChild(p)
        p.textContent = priority.title

    });
}

renderPriorityList(tasks, searchTitle);

// ============ ADD NEW TASK
document.querySelector("#new-priority").addEventListener('submit', function (e) {
    e.preventDefault();
    if (e.target.priority.value) {
        tasks.unshift({ title: e.target.priority.value, completed: false })
        renderPriorityList(tasks, searchTitle);
        e.target.priority.value = ''
    }
})



// ============ COMPLETED TASK
document.querySelector("#list").addEventListener("click", function (e) {
    const priorityCompleted = e.target.textContent.toLocaleLowerCase();

    tasks.forEach(function (priority) {
        if (priority.title.toLocaleLowerCase() === priorityCompleted) {
            priority.completed ? priority.completed = false : priority.completed = true
        }
    })
    renderPriorityList(tasks, searchTitle);
});

// ============ SEARCH INPUT
document.querySelector('#search-task').addEventListener('input', function (e) {
    searchTitle.text = e.target.value.toLocaleLowerCase();
    renderPriorityList(tasks, searchTitle);
})
