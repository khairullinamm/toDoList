
const toDoForm =  document.forms.todo__form;
const toDoList = document.querySelector('.todo__list');
const input = toDoForm.elements[0];
const btnAddTask = document.querySelector('.add__task');
const btnDeleteLast = document.querySelector('.delete__last');
const btnDeleteFirst = document.querySelector('.delete__first');
const btnColorOdd = document.querySelector('.color__odd');
const btnColorEven = document.querySelector('.color__even');
const warningText = document.querySelector('.warning');

let allTasks = [];
let index = -1;
let oddFlag = false;
let evenFlag = false;


function checkLocalStorage() {
    
    if (localStorage.length === 2) //only even and odd
        return;

    for (let len = 0; len < localStorage.length - 2; len++ ) {
        let item = localStorage.getItem(`task #${len}`);
        addSaveTasks(JSON.parse(item));
    }

    addItemsColor();
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
function createToDoTask(text) {

    if (text.length > 25) {
        showMsgAboutLongText();
        return false;
    }

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
        document.querySelector('.duplicate').style.display = 'none';
        
        task.style.opacity = 0;
        setTimeout(() => { task.remove(); }, 600);

        allTasks.splice(indexItem,1); 

        allTasks.forEach((el, num) => {
            el.index = num;
        }) 

        index--;
        saveList();
    })
    function changeTasksPosition() { 

        if (taskText.classList.toggle('task__complete')) { //put complete task to the end
            
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
        
        else { //click on the btn a second time
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
    if (!toDoTask)
        return;

    allTasks.push ({
        complete: false,
        taskText: toDoTask.taskText.textContent,
        index
    });
    
    //for new elements (if these btns are active)
    if (toDoList.classList.contains("color__odd")) colorOddTasks(true);
    if (toDoList.classList.contains('color__even')) colorEvenTasks(true);

    input.value = '';
    saveList();
})
function checkDuplicate() {
    document.querySelector('.duplicate').textContent = "Such a task has already been added to the list.";
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
    })

    localStorage.setItem('odd', oddFlag);
    localStorage.setItem('even', evenFlag);
}
function showMsgAboutLongText() {
    document.querySelector('.duplicate').style.display =  "block";
    document.querySelector('.duplicate').textContent = "The maximum length of the task is 25 characters.";
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
        saveList()
    }
})
btnDeleteFirst.addEventListener('click', function() {
    document.querySelector('.duplicate').style.display = 'none';
    if (showWarning('default')) {

        toDoList.children[0].style.opacity = 0;
        setTimeout(() => { toDoList.children[0].remove(); }, 2000);

        if (toDoList.classList.contains('color__odd'))
            colorOddTasks(true);
        if (toDoList.classList.contains('color__even'))
            colorEvenTasks(true);

        allTasks.shift();
        index--;
        saveList();
    }
    
})
btnColorOdd.addEventListener('click', function() {
    document.querySelector('.duplicate').style.display = 'none';
    if (showWarning('default')) colorOddTasks(toDoList.classList.toggle('color__odd'));    
    saveList();
})
btnColorEven.addEventListener('click', function() {
    document.querySelector('.duplicate').style.display = 'none';
    if (showWarning('even')) colorEvenTasks(toDoList.classList.toggle('color__even'));
    saveList();
})

