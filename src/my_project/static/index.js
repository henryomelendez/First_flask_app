/* function addTask() {
    const task = document.getElementsByClassName("section1")[0].querySelector("input").value;
    
    let  li = document.createElement("li");
    let checkebox = document.createElement("input");
    let labels = document.createElement("label");
    checkebox.addEventListener('change', completedTask);

    checkebox.setAttribute("type", "checkbox");
    labels.setAttribute('id', 'todo');
    labels.innerHTML = task;
    
    li.appendChild(checkebox);
    li.appendChild(labels);

    let editButtom = document.createElement("button");
    editButtom.innerText = "Edit";
    editButtom.className = "edit";
    editButtom.onclick = editTask;

    let deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.className = "delete";
    deleteButton.onclick = deleteTask;

    li.appendChild(editButtom);
    li.appendChild(deleteButton);

    let doclist = document.getElementById("incomplete-tasks");
    doclist.appendChild(li);
    
}
*/

window.onload = function() {
    fetch('/tasks')
    .then(response => response.json())
    .then(tasks => {
        for (let i = 0; i < tasks.length; i++) {
            var li = document.createElement('li');
            li.setAttribute('data-id', tasks[i].id);
            var label = document.createElement('label');
            label.textContent = tasks[i].task;
            li.appendChild(label);
            if (tasks[i].status === '1') {
                document.getElementById('completed-tasks').appendChild(li);
            } else {
                document.getElementById('incomplete-tasks').appendChild(li);
            }
        }
    });
}



document.getElementById('submit-task').addEventListener('click', function(e) {
    e.preventDefault();
    var taskInput = document.getElementById('task');
    var task = taskInput.value;
    taskInput.value = '';
    fetch('/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'task=' + encodeURIComponent(task),
    })
    .then(response => response.json())
    .then(data => {
        var li = document.createElement('li');
        var label = document.createElement('label');
        label.textContent = data.task;
        li.appendChild(label);
        document.getElementById('incomplete-tasks').appendChild(li);
    });
});
/*
function editTask(){
    let li = this.parentNode;
    let label = li.querySelector("label");
    let input = li.querySelector("input[type=text]");

    let containclass = li.classList.contains("editMode");

    if (containclass){
        if(input) {
            label.innerText = input.value;
        }
    } 
    else {
        
        if(!input){
            input = document.createElement("input");
            input.type = "text";
            li.insertBefore(input, label);
        }
        input.value = label.innerText;
    }
    li.classList.toggle("editMode");
}
*/

function editTask() {
    var li = this.parentNode;
    var label = li.querySelector("label");
    var input = li.querySelector("input[type=text]");
    var id = li.getAttribute('data-id'); 

    var containclass = li.classList.contains("editMode");
    if (containclass) {
        
        label.innerText = input.value;
        fetch('/update/' + id, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'task=' + encodeURIComponent(input.value),
        });
    } else {
        // switch to .editMode
        // input value becomes the label's text
        input.value = label.innerText;
    }

    // Toggle .editMode on the parent
    li.classList.toggle("editMode");
}

/*
function deleteTask(){
    let li = this.parentNode;
    let ul = li.parentNode;
    ul.removeChild(li);
}
*/

document.querySelectorAll('.delete-button').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        var li = this.parentNode;
        var id = li.getAttribute('data-id'); 

        fetch('/delete/' + id, {
            method: 'DELETE',
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert(data.error);
            } else {
                
                li.parentNode.removeChild(li);
            }
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
    });
});




function bindTaskEvents(taskListItem){
    let editButton = taskListItem.querySelector("button.edit");
    let deleteButton = taskListItem.querySelector("button.delete");

    editButton.onclick = editTask;
    editButton.onclick = deleteTask;
}

let tasks = document.querySelectorAll("#incomplete-tasks li, #completed-tasks li");
for (let i = 0; i < tasks.length; i++){
    bindTaskEvents(tasks[i]);
}

function clearAll() {
    const tasks = document.getElementById("completed-tasks");

    tasks.innerHTML = "";

    console.log(tasks);
}

function completedTask(){
    let li = this.parentNode;
    let completedTasks = document.getElementById("completed-tasks");

    if(this.checked){
        completedTasks.appendChild(li);
    }

    else {
        document.getElementById("imcompleted-tasks").appendChild(li);
    }
}

const thmeBtn = document.getElementById("m");

thmeBtn.onclick = () => {
    thmeBtn.classList.toggle("dark");

    if(thmeBtn.classList.contains("dark")){
        document.body.classList.toggle("dark");
        thmeBtn.innerText = "ON";
    }
    else{
        document.body.classList.remove("dark");
        thmeBtn.innerText = "OFF";
    }
}
