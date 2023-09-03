
let toDoForm =  document.forms.todo__form;
let toDoList = document.querySelector('.todo__list');
let input = toDoForm.elements[0];

let btnAddTask = document.querySelector('.add__task');
let btnDeleteLast = document.querySelector('.delete__last');
let btnDeleteFirst = document.querySelector('.delete__first');
let btnColorOdd = document.querySelector('.color__odd');
let btnColorEven = document.querySelector('.color__even');
let warningText = document.querySelector('.warning');

let allTasks = [];
let index = -1;

function createToDoTask(text) {
    let task = document.createElement('li');
    let taskText = document.createElement('span');
    let btnComplete = document.createElement('button');
    let btnDelete = document.createElement('button');
    let divBtn = document.createElement('div');

    task.classList.add('item__task');
    btnComplete.classList.add('btn', 'btn__complete');
    btnDelete.classList.add('btn', 'btn__delete');

    btnComplete.textContent = 'Complete';
    btnDelete.textContent = 'Delete';
    taskText.textContent = text;

    toDoList.append(task);
    task.append(taskText, divBtn);
    divBtn.append(btnComplete, btnDelete);
    
    index++;

    btnComplete.addEventListener("click", function() {
        document.querySelector('.duplicate').style.display = 'none';
        changeTasksPosition();
        saveList();
    })

    btnDelete.addEventListener("click", function() {
        document.querySelector('.duplicate').style.display = 'none';
        task.style.opacity = 0;
        setTimeout(() => { task.remove(); }, 600);
        allTasks = allTasks.filter(item => item.taskText != taskText.textContent);
        allTasks.forEach((el, num) => {
            el.index = num;
        }) 
        index--;
        saveList();
        console.log(allTasks)
    })

    function changeTasksPosition() { //if we want to complete task

        if (taskText.classList.toggle('task__complete')) {
            toDoList.append(task);
            btnComplete.textContent = "Return task";

            allTasks.push(allTasks[index]);
            allTasks[allTasks.length-1].complete = true;
    
            allTasks.splice(index, 1);
            index = allTasks.length - 1;
            
            allTasks.forEach((item, i) => {
                item.index = i;
            })
        }
        
        else {
            btnComplete.textContent = "Complete";
            allTasks[index].complete = false;
        }
    }

    return {      
        task,
        taskText,
        btnComplete,
        btnDelete,
        index
    }
}

function checkDuplicate() {
    let flag = true;
    allTasks.forEach(item => {
        if(item.taskText === input.value) {
            document.querySelector('.duplicate').style.display = 'block';
            flag = false;
            return;
        }
    })
    return flag;
}

function createToDoApp() {
    checkLocalStorage();
}

function checkLocalStorage() {
    if (!localStorage.length)
        return;

    //index = localStorage.length - 1; 
    for (let len = 0; len < localStorage.length; len++ ) {
        let item = localStorage.getItem(`task #${len}`);
        addSaveTasks(JSON.parse(item));
    }
}

function addSaveTasks(item) {
    allTasks.push(item);
    console.log(item.taskText)
    
    toDoTask = createToDoTask(item.taskText);
    if (item.complete === true) 
        toDoTask.taskText.classList.toggle('task__complete')
    
    console.log(allTasks)
}

toDoForm.addEventListener('submit', function(e) {
    e.preventDefault();
    document.querySelector('.duplicate').style.display = 'none';
    btnAddTask.disabled = true;

    input.addEventListener('input', () => {
        if (input.value) btnAddTask.disabled = false;
    })

    if (!input.value || !(checkDuplicate()))
        return;

    let toDoTask = createToDoTask(input.value);
    
    allTasks.push ({
        complete: false,
        taskText: toDoTask.taskText.textContent,
        index
    });
    
    if (toDoList.classList.contains("color__odd")) colorOddTasks(true);
    if (toDoList.classList.contains('color__even')) colorEvenTasks(true);

    showWarning();
    input.value = '';
    console.log(allTasks);
    saveList();
})


function showWarning() {
    if (!toDoList.children.length) {
        warningText.style.display = 'block';
        return false;
    }
    warningText.style.display = 'none';
    return true;
}
function colorOddTasks(flag) {
    if (flag) {
        for (el of toDoList.children)
            el.classList.add('odd');
    } else {
        for (el of toDoList.children)
        el.classList.remove('odd'); 
    }
}
function colorEvenTasks(flag) {
    if (flag) {
        for (el of toDoList.children)
            el.classList.add('even');
    } else {
        for (el of toDoList.children)
        el.classList.remove('even'); 
    }

}
function saveList() {
    localStorage.clear();
    allTasks.forEach((item, index) => {
        localStorage.setItem(`task #${index}`, JSON.stringify(item));
        console.log(localStorage.getItem(`task #${index}`));
    })
}

btnDeleteLast.addEventListener('click', function() {
    document.querySelector('.duplicate').style.display = 'none';
    if (showWarning())
    {
        toDoList.lastChild.style.opacity = 0;
        setTimeout(() => { toDoList.lastChild.remove(); }, 2000);

        if (toDoList.classList.contains('color__odd')) 
            colorOddTasks(true);
        if (toDoList.classList.contains('color__even'))
            colorEvenTasks(true);
        allTasks.pop();
        index--;
        console.log(allTasks);
        saveList()
    }
})
btnDeleteFirst.addEventListener('click', function() {
    document.querySelector('.duplicate').style.display = 'none';
    if (showWarning()) {
        toDoList.firstChild.remove();
        if (toDoList.classList.contains('color__odd'))
            colorOddTasks(true);
        if (toDoList.classList.contains('color__even'))
            colorEvenTasks(true);
        allTasks.shift();
        index--;
        console.log(allTasks)
        saveList()
    }
    
})
btnColorOdd.addEventListener('click', function() {
    document.querySelector('.duplicate').style.display = 'none';
    if (showWarning()) colorOddTasks(toDoList.classList.toggle('color__odd'));
})
btnColorEven.addEventListener('click', function() {
    document.querySelector('.duplicate').style.display = 'none';
    if (showWarning()) colorEvenTasks(toDoList.classList.toggle('color__even'));
})

