// date
let dateMain = document.querySelector('.header__date');
let listMonth = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
]

function dateNameForm() {
    let date = new Date();
    let month = date.getMonth();
    let dat = date.getDate()
    dateMain.textContent = `${listMonth[month]} 0${dat}`;
}
dateNameForm();