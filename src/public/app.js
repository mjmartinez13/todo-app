let todos = [];

searchTitle = {
    text: ''
};

fetchTodosList();

// ===========  STATUS LABEL
const renderStatusLable = function (status) {
    if (status.length > 0) {
        return `You have ${status.length} incompleted task`
    } else {
        return 'Congrats! you have completed all your todos!'
    }
}


// ============ RENDER LIST
const renderPriorityList = function (todos, searchTitle) {
    const statusLabel = document.querySelector("#incomple-task");

    const inCompleteTask = todos.filter(function (task) {
        return task.completed === false;
    })

    statusLabel.textContent = renderStatusLable(inCompleteTask);

    const searchListResult = todos.filter(function (task) {
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

        const div = document.createElement('div');
        div.classList.add('t-wrapper')
        if (priority.completed) {
            div.classList.add('completed')         
            div.innerHTML = "<div><input class='checkbox' type='checkbox' name=" + priority._id + " checked><span class='checkmark'></span></div><p>" + priority.title + "</p>";
        } else {
            div.innerHTML = "<div><input class='checkbox' type='checkbox' name=" + priority._id + "><span class='checkmark'></span></div><p>" + priority.title + "</p>";
        }
        document.querySelector('#list').appendChild(div)

    });
}

// ============ ADD NEW TASK
document.querySelector("#new-priority").addEventListener('submit', function (e) {
    e.preventDefault();
    if (e.target.priority.value) {
        sendItemToApi(e.target.priority.value);
        e.target.priority.value = ''
    }
})


// ============ COMPLETED TASK

document.addEventListener('change', function (e) {
    if (e.target.classList == 'checkbox') {

        fetch(`/todos/${e.target.name}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ })
        }).then( res => {
            fetchTodosList();
        })
        .catch(err => console.log(err))
    }

})


// ============ SEARCH INPUT
document.querySelector('#search-task').addEventListener('input', function (e) {
    searchTitle.text = e.target.value.toLocaleLowerCase();
    renderPriorityList(todos, searchTitle);
})



// ============ fetch website data

async function fetchTodosList() {
    const todosList = await fetch("/todos")
    const data = await todosList.json()

    todos = data.reverse();
    renderPriorityList(todos, searchTitle)
}


// ============ SENDING TODO ITEM TO API
async function sendItemToApi(item) {
    const response = await fetch('/todos', { 
        method: "POST", 
        headers: { "Content-Type": "application/json"}, 
        body: JSON.stringify({ title: item, completed: false })})

        if (response) {
            fetchTodosList()
        }
        
}



// ============ Clear all task
document.querySelector('#clear-btn').addEventListener('click', function(e) {
    // e.preventDefault()
    clearCompletedTask();
})



async function clearCompletedTask() {
    const response = await fetch('/todos', {
        method: "PUT"
    })
    if (response) {
        fetchTodosList()
    }
}
