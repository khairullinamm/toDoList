
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
    
    if (toDoList.classList.contains("color__odd")) colorOddTasks(true);
    if (toDoList.classList.contains('color__even')) colorEvenTasks(true);

    toDoTask.btnComplete.addEventListener("click", function() {
        document.querySelector('.duplicate').style.display = 'none';
        changeTasksOrders(toDoTask.taskText.textContent);
    })

    toDoTask.btnDelete.addEventListener("click", function() {
        document.querySelector('.duplicate').style.display = 'none';
        toDoTask.task.style.opacity = 0;
        setTimeout(() => { toDoTask.task.remove(); }, 600);
        allTasks = allTasks.filter(item => item != toDoTask.taskText.textContent);
    })

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

        return  {
            task,
            taskText,
            btnComplete,
            btnDelete
        }
    }
    function changeTasksOrders(text) { //if we want to complete task
    
        if (toDoTask.taskText.classList.toggle('task__complete')) {
            toDoTaskCopy = toDoTask;
            toDoTask.task.remove();
            toDoList.append(toDoTaskCopy.task);
            
            toDoTaskCopy.btnComplete.textContent = "Return task";
        }
        else 
            toDoTask.btnComplete.textContent = "Complete task";
    }

    function checkDuplicate() {
        let flag = true;
        allTasks.forEach(item => {
            if(item === input.value) {
                document.querySelector('.duplicate').style.display = 'block';
                flag = false;
                return;
            }
        })
        if (flag)
            allTasks.push(input.value);
        return flag;
    }
    
    showWarning();
    input.value = '';
    console.log(allTasks);
})

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
        allTasks = allTasks.filter(item => item != toDoTask.taskText.textContent);
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
        allTasks = allTasks.filter(item => item != toDoTask.taskText.textContent);
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
