
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

    if (toDoList.classList.contains("color__odd"))
        colorOddTasks(true);
    if (toDoList.classList.contains('color__even'))
        colorEvenTasks(true);

    toDoTask.btnComplete.addEventListener("click", function() {
        changeTasksOrders(toDoTask.task, toDoTask.taskText.classList.toggle('task__complete'));
    })
    toDoTask.btnDelete.addEventListener("click", function() {
        toDoTask.task.remove();
    })
    function createToDoTask(text) {
        let task = document.createElement('li');
        let taskText = document.createElement('span');
        let btnComplete = document.createElement('button');
        let btnDelete = document.createElement('button');

        task.classList.add('item__task');
        btnComplete.classList.add('item-btn', 'btn__complete');
        btnComplete.classList.add('item-btn', 'btn__delete');

        btnComplete.innerHTML = 'Complete';
        btnDelete.innerHTML = 'Delete';
        taskText.innerHTML = text;

        task.style.order = toDoList.children.length;

        toDoList.append(task);
        task.append(taskText, btnComplete, btnDelete);

        return  {
            task,
            taskText,
            btnComplete,
            btnDelete
        }
    }
    function changeTasksOrders(task, flag) {
        let minOrder = 0;

        if (flag) {
            for (let element of toDoList.children) {
                if (element !== task && Number(element.style.order) > 0)
                    element.style.order = Number(element.style.order) - 1;
            }
            task.style.order = Number(toDoList.children.length) - 1;
            toDoTask.btnComplete.innerHTML = 'Return';

        } else {
            for (let element of toDoList.children) {
                if (element !== task)
                    element.style.order = Number(element.style.order) + 1;
                minOrder = element.style.order < minOrder ? element.style.order : minOrder;
            }
            task.style.order = Number(minOrder);
            toDoTask.btnComplete.innerHTML = 'Complete';
        }
    }

})

btnDeleteLast.addEventListener('click', function() {
    toDoList.lastChild.remove();
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