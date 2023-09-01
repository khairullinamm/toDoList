
let toDoForm =  document.forms.todo__form;
let toDoList = document.querySelector('.todo__list');
let input = toDoForm.elements[0];

toDoForm.addEventListener('submit', function(e) {
    e.preventDefault();

    if (!input.value) 
        return;
    let toDoTask = createToDoTask(input.value);

    toDoTask.btnComplete.addEventListener("click", function() {
       // toDoTask.taskText.classList.toggle('task__complete');
       // console.log(toDoTask.taskText.classList.toggle('task__complete'))
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

        btnComplete.innerHTML = 'Task complete';
        btnDelete.innerHTML = 'Delete task';
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
        if (flag) {
            for (let element of toDoList.children) {
                if (element !== task)
                    element.style.order = Number(element.style.order) - 1;
            }
            task.style.order = Number(toDoList.children.length);
        } else {
            for (let element of toDoList.children) {
                if (element !== task)
                    element.style.order = Number(element.style.order) + 1;
            }
            task.style.order = -1;
        }
    }
    })
