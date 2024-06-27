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

const _task = document.querySelector(".task");
if (_task) {
  _task.addEventListener("click", (e) => {});
}

const _taskAdd = document.querySelector(".add-task__inp");
const _tasksContainer = document.querySelector(".tasks");

_taskAdd.addEventListener("keydown", (e) => {
  console.log(e.target.value);
  if (e.key === "Enter") {
    tasksArray = [
      ...tasksArray,
      { id: lastID, text: e.target.value, check: false },
    ];
    renderTask();
    lastID = getLastId();
    lastID++;
    _taskAdd.value = "";
    console.log(tasksArray);
  }
});

_tasksContainer.addEventListener("click", (e) => {
  let taskClick = e.target;
  if (!taskClick.closest(".task")) {
    return;
  }

  if (taskClick.closest(".task__btn--delete")) {
    console.log("eliminado");
    return;
  }

  if (taskClick.closest(".task__btn--edit")) {
    console.log("editado");
    return;
  }

  let taskTarget = taskClick.closest(".task");
  if (taskTarget) {
    taskTarget.classList.toggle("active");
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
    div.classList.add("task");
    div.innerHTML = taskItem;
    fragment.append(div);
  });
  _tasksContainer.innerHTML = "";
  _tasksContainer.append(fragment);
}
