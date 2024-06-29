// import { listMonth, listArray } from "./variables";
import { renderTask, getLastId, dateNameForm } from "./functions";

let lastID = 0;
let tasksArray = [];
let idEditTarget = 0;
let textEditTarget = "";

let dateMain = document.querySelector(".header__date");
const _taskAdd = document.querySelector(".add-task__inp");
const _tasksContainer = document.querySelector(".tasks");

dateNameForm(dateMain);

_taskAdd.addEventListener("keyup", (e) => {
  let value = e.target.value;

  if (!value) {
    console.log("el texto no debe estar vacio");
    return;
  }

  if (e.key === "Enter") {
    let newTasksArray = [
      ...tasksArray,
      { id: lastID, text: e.target.value, check: false },
    ];
    tasksArray = [...newTasksArray];
    renderTask(tasksArray, _tasksContainer);
    lastID = getLastId(tasksArray);
    lastID++;
    _taskAdd.value = "";
  }
});

/* Modal */
const _modal = document.querySelector(".modal");
const _modalEditInput = _modal.querySelector(".modal__edit-input");

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
    renderTask(tasksArray, _tasksContainer);
    return;
  }

  if (taskClick.closest(".task__btn--edit")) {
    _modal.classList.add("active");
    idEditTarget = +taskTarget.dataset.id;
    textEditTarget = taskTarget.querySelector(".task__text").textContent;
    _modalEditInput.value = textEditTarget;
    return;
  }

  if (taskTarget) {
    let _check_inp = taskTarget.querySelector(".task__check");
    let checkId = +taskTarget.dataset.id;
    let textCheck = taskTarget.querySelector(".task__text");
    textCheck.style.text;
    _check_inp.checked = !_check_inp.checked;

    let newTasksArray = tasksArray.map((task) => {
      if (task.id === checkId) {
        return {
          ...task,
          check: _check_inp.checked,
        };
      }
      return task;
    });
    tasksArray = [...newTasksArray];
    renderTask(tasksArray, _tasksContainer);
  }
});

_modal.addEventListener("click", (e) => {
  let modalTarget = e.target;
  if (modalTarget.closest(".modal__edit")) {
    if (modalTarget.closest(".modal__edit-delete")) {
      _modal.classList.remove("active");
    }

    if (modalTarget.classList.contains("modal__edit-btn--save")) {
      console.log(idEditTarget, textEditTarget);
      tasksArray = tasksArray.map((task) => {
        if (idEditTarget === task.id) {
          return {
            ...task,
            text: _modalEditInput.value,
          };
        }
        return task;
      });
      renderTask(tasksArray, _tasksContainer);
      _modal.classList.remove("active");
    }
  }
});
