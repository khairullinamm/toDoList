
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
let oddFlag = false;
let evenFlag = false;
console.log(allTasks)
function checkLocalStorage() {
    if (localStorage.length === 2) //там только odd и even
        return;

    for (let len = 0; len < localStorage.length - 2; len++ ) {
        let item = localStorage.getItem(`task #${len}`);
        addSaveTasks(JSON.parse(item));
    }

    addItemsColor();
}
function createToDoApp() {
    checkLocalStorage();
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
function showWarning(type) {
    
    warningText.textContent = "The button action cannot be performed because there are no active tasks.";

    if (!toDoList.children.length) {
        warningText.style.display = 'block';
        return false;
    }

    if (type === 'even') {
        if (allTasks.length === 1) {

            warningText.textContent = "We can't color the tasks because there are no even elements.";
            warningText.style.display = 'block';
            return false;
        }
    }
        warningText.style.display = 'none';
        return true;
}

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
    let indexItem = index;

    btnComplete.addEventListener("click", function() {
        document.querySelector('.duplicate').style.display = 'none';
        changeTasksPosition();
        saveList();
    })

    btnDelete.addEventListener("click", function() {
        console.log(allTasks)
        document.querySelector('.duplicate').style.display = 'none';
        
        task.style.opacity = 0;
        setTimeout(() => { task.remove(); }, 600);

        allTasks.splice(indexItem,1);
        console.log(allTasks)

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

            allTasks.push(allTasks[indexItem]);
            allTasks[allTasks.length-1].complete = true;
    
            allTasks.splice(indexItem, 1);

            indexItem = allTasks.length - 1;
            
            allTasks.forEach((item, i) => {
                item.index = i;
            })
        }
        
        else {
            btnComplete.textContent = "Complete";
            allTasks[indexItem].complete = false;
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
function addSaveTasks(item) {
    allTasks.push(item);
    
    toDoTask = createToDoTask(item.taskText);

    if (item.complete === true) { 
        toDoTask.taskText.classList.toggle('task__complete')
        toDoTask.btnComplete.textContent = "Return task";
    }
}
function addItemsColor() {
    
    if (localStorage.getItem('odd') === 'true') {
        colorOddTasks(toDoList.classList.toggle('color__odd'));
    }

    if (localStorage.getItem('even') === 'true') {
        colorEvenTasks(toDoList.classList.toggle('color__even'));
    }
}
function colorOddTasks(flag) {
    if (flag) {
        for (el of toDoList.children)
            el.classList.add('odd');
        oddFlag = true;
    } else {
        for (el of toDoList.children)
            el.classList.remove('odd'); 
        oddFlag = false;
    }
}
function colorEvenTasks(flag) {
    if (flag) {
        for (el of toDoList.children)
            el.classList.add('even');
        evenFlag = true;
    } else {
        for (el of toDoList.children)
            el.classList.remove('even'); 
        evenFlag = false;
    }

}
function saveList() {
    localStorage.clear();
    allTasks.forEach((item, index) => {
        localStorage.setItem(`task #${index}`, JSON.stringify(item));
        console.log(localStorage.getItem(`task #${index}`));
    })

    localStorage.setItem('odd', oddFlag);
    localStorage.setItem('even', evenFlag);
}
btnDeleteLast.addEventListener('click', function() {
    document.querySelector('.duplicate').style.display = 'none';
    if (showWarning('default'))
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
    if (showWarning('default')) {
        //console.log(toDoList.children[0])
        toDoList.children[0].style.opacity = 0;
        setTimeout(() => { toDoList.children[0].remove(); }, 2000);

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
    if (showWarning('default')) colorOddTasks(toDoList.classList.toggle('color__odd'));    
    saveList()
})
btnColorEven.addEventListener('click', function() {
    document.querySelector('.duplicate').style.display = 'none';
    if (showWarning('even')) colorEvenTasks(toDoList.classList.toggle('color__even'));
    saveList()
})

