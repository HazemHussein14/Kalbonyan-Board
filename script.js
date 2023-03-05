const edit = document.querySelector('button')
const task = document.querySelector('li')

edit.addEventListener('click', () => {
  task.contentEditable = true;
  task.focus();
})
