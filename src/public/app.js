let todos = [];

searchTitle = {
    text: ''
};

fetchTodosList();

// ===========  STATUS LABEL
const renderStatusLable = function (status) {
    if (status.length > 0) {
        return "<span>"+status.length+"</span>";
    } else {
        return null
    }
}

// ============ RENDER LIST
const renderPriorityList = function (todos, searchTitle) {
    const statusLabel = document.querySelector("#badge");

    const inCompleteTask = todos.filter(function (task) {
        return task.completed === false;
    })

    statusLabel.innerHTML = renderStatusLable(inCompleteTask);

    const searchListResult = todos.filter(function (task) {
        return task.title.toLocaleLowerCase().includes(searchTitle.text);
    });

    document.querySelector('#list').innerHTML = '';

    // searchListResult.sort(function (a, b) {
    //     if (a.completed < b.completed) {
    //         return -1;
    //     } else if (a.completed > b.completed) {
    //         return 1;
    //     } else {
    //         return 0;
    //     }
    // });

    searchListResult.forEach(priority => {

        const div = document.createElement('div');
        div.classList.add('t-wrapper')
        if (priority.completed) {
            div.classList.add('completed')         
        } 
        div.innerHTML = "<div class='input-wrapper'><input class='checkbox' type='checkbox' name=" + priority._id + "><span class='checkmark'></span></div><p>" + priority.title + "</p><button class='delete-btn'><i class='far fa-trash-alt'></i></button>";
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


// ============ REMOVE TASK
document.addEventListener('click', function(e) {
    if (e.target.parentNode.classList == 'delete-btn') {

        const itemId = e.target.parentNode.parentNode.querySelector("input").name;

        deleteTask(itemId)
        
    }
})

// ============ COMPLETED TASK
document.addEventListener('change', function (e) {
    if (e.target.classList == 'checkbox') {

        fetch(`/todos/${e.target.name}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" }
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

// ============ fetch delete task
async function deleteTask(value) {
    const response = await fetch(`/todos/delete/${value}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" }
    });

    if (response) {
        fetchTodosList()
    }


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


// // ============ Clear all task
// document.querySelector('#clear-btn').addEventListener('click', function(e) {
//     // e.preventDefault()
//     clearCompletedTask();
// })



async function clearCompletedTask() {
    const response = await fetch('/todos', {
        method: "PUT"
    })
    if (response) {
        fetchTodosList()
    }
}


document.querySelector('h1').innerHTML = getTodaysDay(new Date());

function getTodaysDay(date) {
    const monthNames = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
    ]

    const day = date.getDay();
    const month = date.getMonth();

    return monthNames[month] + '<span>, ' + day +'th</span>'
}