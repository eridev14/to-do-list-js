import { listMonth } from "./variables";

listMonth;
export function getLastId(tasksArray) {
  return tasksArray.length > 0 ? tasksArray.slice(-1)[0].id : 0;
}

export function renderTask(tasksArray, _tasksContainer) {
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
        <span class="task__text ${task.check ? "active" : ""}">${
      task.text
    }</span>
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

export function dateNameForm(dateMain) {
  let date = new Date();
  let month = date.getMonth();
  let dat = date.getDate();
  if (dat > 9) {
    dateMain.textContent = `${listMonth[month]} ${dat}`;
  } else {
    dateMain.textContent = `${listMonth[month]} 0${dat}`;
  }
}
