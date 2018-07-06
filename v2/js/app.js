// DOM
var todos = [];
var todoInput = document.querySelector('#input-todo');
var list = document.querySelector('#todo-list');
var tabMenu = document.querySelector('.nav');
var completedTodos = document.querySelector('#completedTodos');
var activeTodos = document.querySelector('#activeTodos');
var markallCom = document.querySelector('#chk-allComplete');
var removeallCom = document.querySelector('#btn-removeCompletedTodos');
//
var tabStatement = 'all';
// var newTodos = [];
// count complete
function rendercountCompleted() {
  var countlist = todos.filter(function(todo) {
    return todo.completed;
  }).length;

  completedTodos.innerHTML = countlist;
  activeTodos.innerHTML = todos.length - countlist;
}

// rendering HTML
function renderHTML() {
  var newTodos = [];
  list.innerHTML = '';

  if (tabStatement === 'active') {
    newTodos = todos.filter(function(todo) {
      return !todo.completed;
    });
  } else if (tabStatement === 'completed') {
    newTodos = todos.filter(function(todo) {
      return todo.completed;
    });
  } else {
    newTodos = todos;
  }

  newTodos.forEach(function(todo) {
    var checked = todo.completed ? 'checked' : '';
    list.innerHTML
    += '<li class="list-group-item"><div class="hover-anchor">'
    + '<a class="hover-action text-muted">'
    + '<span class="glyphicon glyphicon-remove-circle pull-right" data-id="' + todo.id + '"></span></a>'
    + '<label class="i-checks" for="' + todo.id + '">'
    + '<input type="checkbox" id="' + todo.id + '"' + checked + '><i></i>'
    + '<span>' + todo.content + '</span></label></div></li>';
  });
  rendercountCompleted();
}

// get ID
function getNextId() {
  var ids = todos.map(function(todo) {
    return todo.id;
  });
  return todos.length ? Math.max(...ids) + 1 : 1;
}
// Add list
function addTodo(todo) {
  if (!todo) return;
  todos = [{
    id: getNextId(),
    content: todo,
    completed: false
  }].concat(todos);
  renderHTML();
}

// event
todoInput.addEventListener('keyup', function(e) {
  if (e.keyCode !== 13) return;
  addTodo(todoInput.value);
  todoInput.value = '';
  renderHTML();
});
// change statement
list.addEventListener('change', function(e) {
  // console.log(e.target.id);
  if (e.target.nodeName === 'INPUT') {
    todos = todos.map(function(todo) {
      return todo.id === +e.target.id ? Object.assign({}, todo, { completed: !todo.completed }) : todo;
    });
    renderHTML();
    markallCom.checked = false;
  }
});
// delete
list.addEventListener('click', function(e) {
  if (e.target.nodeName === 'SPAN') {
    todos = todos.filter(function(todo) {
      return todo.id !== +e.target.dataset.id;
    });
    renderHTML();
  }
});

tabMenu.addEventListener('click', function(e) {
  if (e.target.nodeName !== 'A') return;
  e.target.parentNode.parentNode.childNodes.forEach(function(node) {
    console.log(node);
    if (e.target.parentNode.nodeName === 'LI') node.className = '';
  });
  e.target.parentNode.className = 'active';
  tabStatement = e.target.parentNode.id;

  renderHTML();
  // e.target.parentNode.id = 'active';
});
// all completed
markallCom.addEventListener('change', function(e) {
  // if (e.target.nodeName === 'I') {
  todos = todos.map(function(todo) {
    return Object.assign({}, todo, { completed: e.target.checked });
  });
  renderHTML();
});
// all remove list
removeallCom.addEventListener('click', function() {
  todos = todos.filter(function(todo) {
    return !todo.completed;
  });
  renderHTML();
});

// window list
window.addEventListener('load', function() {
  todos = [
    { id: 1, content: 'HTML', completed: false },
    { id: 2, content: 'JS', completed: false },
    { id: 3, content: 'CSS', completed: false }
  ];
  renderHTML();
});