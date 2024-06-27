// date
let dateMain = document.querySelector(".header__date");
let listMonth = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

let lastID = 0;

let listArray = [];

let tasksArray = [];

function dateNameForm() {
  let date = new Date();
  let month = date.getMonth();
  let dat = date.getDate();
  if (dat > 9) {
    dateMain.textContent = `${listMonth[month]} ${dat}`;
  } else {
    dateMain.textContent = `${listMonth[month]} 0${dat}`;
  }
}

dateNameForm();

const _taskAdd = document.querySelector(".add-task__inp");
const _tasksContainer = document.querySelector(".tasks");

_taskAdd.addEventListener("keyup", (e) => {
  let value = e.target.value;

  if (!value) {
    console.log("el texto no debe estar vacio");
    return;
  }

  if (e.key === "Enter") {
    tasksArray = [
      ...tasksArray,
      { id: lastID, text: e.target.value, check: false },
    ];
    renderTask();
    lastID = getLastId();
    lastID++;
    _taskAdd.value = "";
  }
});

_tasksContainer.addEventListener("click", (e) => {
  let taskClick = e.target;
  let taskTarget = taskClick.closest(".task");
  if (!taskTarget) {
    return;
  }

  if (taskClick.closest(".task__btn--delete")) {
    let idTask = +taskTarget.dataset.id;
    let newArray = tasksArray.filter((taskValue) => taskValue.id !== idTask);
    tasksArray = [...newArray];
    renderTask();
    return;
  }

  if (taskClick.closest(".task__btn--edit")) {

    return;
  }

  if (taskTarget) {
    let _check_inp = taskTarget.querySelector(".task__check");
    let check = _check_inp.checked;
    _check_inp.checked = !check;
    let checkId = +taskTarget.dataset.id;
    let newTasksArray = tasksArray.map((task) => {
      if (task.id === checkId) {
        return {
          ...task,
          check: !check,
        };
      }
      return task;
    });
    tasksArray = [...newTasksArray];
  }
});

function getLastId() {
  return tasksArray.length > 0 ? tasksArray.slice(-1)[0].id : 0;
}

function renderTask() {
  let fragment = document.createDocumentFragment();
  tasksArray.forEach((task) => {
    let taskItem = `
      <input
        type="checkbox"
        name="check"
        id="check"
        class="task__check"
        ${task.check ? "checked" : ""}
      />
      <span class="task__text">${task.text}</span>
      <button class="task__btn task__btn--edit">
          <ion-icon name="create-outline"></ion-icon>
      </button>
      <button class="task__btn task__btn--delete">
          <ion-icon name="trash-outline"></ion-icon>
      </button>
    `;
    let div = document.createElement("div");
    div.classList.add("task", "animate");
    div.dataset.id = task.id;
    div.innerHTML = taskItem;
    fragment.prepend(div);
  });
  _tasksContainer.innerHTML = "";
  _tasksContainer.append(fragment);
}
