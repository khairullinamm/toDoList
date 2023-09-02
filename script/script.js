
let toDoForm =  document.forms.todo__form;
let toDoList = document.querySelector('.todo__list');
let input = toDoForm.elements[0];

let btnDeleteLast = document.querySelector('.delete__last');
let btnDeleteFirst = document.querySelector('.delete__first');
let btnColorOdd = document.querySelector('.color__odd');
let btnColorEven = document.querySelector('.color__even');

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

    if (!input.value) 
        return;
    
    let toDoTask = createToDoTask(input.value);

    if (toDoList.classList.contains("color__odd")) colorOddTasks(true);
    if (toDoList.classList.contains('color__even')) colorEvenTasks(true);

    toDoTask.btnComplete.addEventListener("click", function() {
        console.log(toDoTask)
        changeTasksOrders(toDoTask.taskText.textContent);
        console.log("here");
    })

    toDoTask.btnDelete.addEventListener("click", function() {
        toDoTask.task.style.opacity = 0;
        setTimeout(() => { toDoTask.task.remove(); }, 2000);
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
    console.log(toDoTask)
})

btnDeleteLast.addEventListener('click', function() {
    toDoList.lastChild.style.opacity = 0;
    setTimeout(() => { toDoList.lastChild.remove(); }, 2000);
    
    if (toDoList.classList.contains('color__odd'))
        colorOddTasks(true);
    if (toDoList.classList.contains('color__even'))
        colorEvenTasks(true);
})
btnDeleteFirst.addEventListener('click', function() {
    toDoList.firstChild.remove();
    if (toDoList.classList.contains('color__odd'))
        colorOddTasks(true);
    if (toDoList.classList.contains('color__even'))
        colorEvenTasks(true);
})

btnColorOdd.addEventListener('click', function() {
    colorOddTasks(toDoList.classList.toggle('color__odd'));
})
btnColorEven.addEventListener('click', function() {
    colorEvenTasks(toDoList.classList.toggle('color__even'));
})