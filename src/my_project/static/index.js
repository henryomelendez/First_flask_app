function addTask() {
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

function deleteTask(){
    let li = this.parentNode;
    let ul = li.parentNode;
    ul.removeChild(li);
}

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
