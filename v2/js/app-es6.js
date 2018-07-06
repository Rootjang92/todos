// DOM
let todos = [];
const inputtodo = document.querySelector('#input-todo');
const list = document.querySelector('#todo-list');
const tabMenu = document.querySelector('.nav');
const completedTodos = document.querySelector('#completedTodos');
const allCom = document.querySelector('#chk-allComplete');
const removeCom = document.querySelector('#btn-removeCompletedTodos');
const activeTodos = document.querySelector('#activeTodos');

// tabstatement
let tabStatement = 'all';

// rendering
function countCom() {
  const countlist = todos.filter(todo => todo.completed).length;
  completedTodos.innerHTML = countlist;
  activeTodos.innerHTML = todos.length - countlist;
}

function renderHTML() {
  let newTodos = [];
  list.innerHTML = '';

  if (tabStatement === 'active') {
    newTodos = todos.filter(todo => !todo.completed);
  } else if (tabStatement === 'completed') {
    newTodos = todos.filter(todo => todo.completed);
  } else {
    newTodos = todos;
  }

  newTodos.forEach((todo) => {
    const checked = todo.completed ? 'checked' : '';
    list.innerHTML += `<li class="list-group-item"><div class="hover-anchor">
    <a class="hover-action text-muted">
    <span class="glyphicon glyphicon-remove-circle pull-right" data-id=${todo.id}></span></a>
    <label class="i-checks" for=${todo.id}>
    <input type="checkbox" id=${todo.id} ${checked}><i></i>
    <span> ${todo.content} </span></label></div></li>`;
  });
  countCom();
}
// Get ID
function getNextID() {
  const ids = todos.map(todo => todo.id);
  return todos.length ? Math.max(...ids) + 1 : 1;
}

// Add list
function addTodo(todo) {
  if (!todo) return;
  todos = [{
    id: getNextID(),
    content: todo,
    completed: false
  }].concat(todos);
  renderHTML();
}

// event
inputtodo.addEventListener('keyup', (e) => {
  if (e.keyCode !== 13) return;
  addTodo(inputtodo.value);
  inputtodo.value = '';
  renderHTML();
});

// delete

list.addEventListener('click', (e) => {
  if (!e.target.dataset.id) return;
  if (e.target.nodeName === 'SPAN') { todos = todos.filter(todo => todo.id !== +e.target.dataset.id); }
  renderHTML();
});

// change toogle
list.addEventListener('change', (e) => {
  // console.log(e);
  if (e.target.nodeName === 'INPUT') {
    todos = todos.map((todo) => {
      return todo.id === +e.target.id ? Object.assign({}, todo, { completed: !todo.completed }) : todo;
    });
    renderHTML();
  }
});

tabMenu.addEventListener('click', (e) => {
  if (!e.target || !e.target.nodeName === 'A') return;
  e.target.parentNode.parentNode.childNodes.forEach((node) => {
    if (e.target.parentNode.nodeName === 'LI') { node.className = ''; }
  });
  e.target.parentNode.className = 'active';
  tabStatement = e.target.parentNode.id;
  renderHTML();
});
// checked all Completed
allCom.addEventListener('change', (e) => {
  todos = todos.map(todo => Object.assign({}, todo, { completed: e.target.checked }));
  renderHTML();
});
// console.log(e.target.checked)

// all remove list
removeCom.addEventListener('click', () => {
  todos = todos.filter(todo => !todo.completed);
  renderHTML();
});

// windowlist

window.addEventListener('load', () => {
  todos = [
    { id: 1, content: 'HTML', completed: false },
    { id: 2, content: 'JS', completed: false },
    { id: 3, content: 'CSS', completed: false }
  ];
  renderHTML();
});