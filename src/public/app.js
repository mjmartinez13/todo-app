let todos = [];

searchTitle = {
    text: ''
};

// ========== FETCH DATA
const fetchTodosList = function () {
    fetch('/todos').then(res => {
        return res.json()
    }).then(json => {
        todos = json
        renderPriorityList(todos, searchTitle)
    }).catch(err => {
        console.log(err)
    })
}

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
        }
        
        document.querySelector('#list').appendChild(div)
        div.innerHTML = "<p>" + priority.title + "</p><button class='check-btn'><i><i class='far fa-check-circle'></i></button>";

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


document.addEventListener('click', function(e) {
    if (e.target.parentNode.parentNode.classList == 'check-btn') {
        
        const item = e.target.parentNode.parentNode.parentNode.querySelector('p').textContent

       const selectedItem = todos.filter( todo => {
           return todo.title.toLocaleLowerCase() === item.toLocaleLowerCase()
       })

       fetch(`/todos/${selectedItem[0]._id}`, {
           method: "PUT",
        //    headers: { "Content-Type": "application/json" },
        //    body: JSON.stringify({  })
       }).then( res => {
           fetchTodosList();
           console.log(todos)
       })
       .catch( err => {
           console.log(err)
       })
    }
})

// document.querySelector("#list").addEventListener("click", function(e) {
  
// //   const priorityCompleted = e.target.parentNode.toLocaleLowerCase();

    
//     console.log(e.target.parentNode.parentNode.parentNode)

// //   todos.forEach(function(priority) {
// //     if (priority.title.toLocaleLowerCase() === priorityCompleted) {
// //       priority.completed ? (priority.completed = false) : (priority.completed = true);
// //     }
// //   });
// //   renderPriorityList(todos, searchTitle);
// });

// ============ SEARCH INPUT
document.querySelector('#search-task').addEventListener('input', function (e) {
    searchTitle.text = e.target.value.toLocaleLowerCase();
    renderPriorityList(todos, searchTitle);
})


// ============ SENDING TODO ITEM TO API
function sendItemToApi(item) {
    fetch('/todos', { 
        method: "POST", 
        headers: { "Content-Type": "application/json"}, 
        body: JSON.stringify({ title: item, completed: false })})
        .then(res => {
            fetchTodosList();
        })
        .catch(err => { console.log(err) })
}



