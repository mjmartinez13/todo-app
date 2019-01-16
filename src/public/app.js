let tasks = [];

searchTitle = {
    text: ''
};




let fetchTodosList = function () {
    fetch('/todos').then(res => {
        return res.json()
    }).then(json => {
        tasks = json
        renderPriorityList(tasks, searchTitle)
    }).catch(err => {
        console.log(err)
    })
}

fetchTodosList();

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



// ============ ADD NEW TASK
document.querySelector("#new-priority").addEventListener('submit', function (e) {
    e.preventDefault();
    sendItemToApi(e.target.priority.value);
    fetchTodosList()
    e.target.priority.value = ''
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


// ============ SENDING TODO ITEM TO API

function sendItemToApi(item) {
    fetch('/todos', { 
        method: "POST", 
        headers: { "Content-Type": "application/json"}, 
        body: JSON.stringify({ title: item, completed: false })})
        .then(res => {
            console.log('It Worked')
        })
        .catch(err => { console.log(err) })
}



