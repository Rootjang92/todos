var todos = [];
var todoInput = document.querySelector('#input-todo');
var list = document.querySelector('#todo-list');

function renderHTML() {
  list.innerHTML = '';
  todos.forEach(function(todo) {
    var checked = todo.completed ? 'checked' : '';
    list.innerHTML
    += '<li class="list-group-item"><div class="hover-anchor">'
    + '<a class="hover-action text-muted">'
    + '<span class="glyphicon glyphicon-remove-circle pull-right" data-id="' + todo.id + '"></span></a>'
    + '<label class="i-checks" for="' + todo.id + '">'
    + '<input type="checkbox" id="' + todo.id + '"' + checked + '><i></i>'
    + '<span>' + todo.content + '</span></label></div></li>';
  });
}

function getNextId() {
  var ids = todos.map(function(todo) {
    return todo.id;
  });
  return todos.length ? Math.max.apply(null, ids) + 1 : 1;
}

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
  addTodo(this.value);
  this.value = '';
});

list.addEventListener('change', function(e) {
  // console.log(e.target.id);
  if (e.target.nodeName === 'INPUT') {
    todos = todos.map(function(todo) {
      return todo.id === +e.target.id ? Object.assign({}, todo, { completed: !todo.completed }) : todo;
    });
  }
});

list.addEventListener('click', function(e) {
  if (e.target.nodeName === 'SPAN') {
    todos = todos.filter(function(todo) {
      return todo.id !== +e.target.dataset.id;
    });
    renderHTML(todos);
  }
});

window.addEventListener('load', function() {
  todos = [
    { id: 1, content: 'HTML', completed: false },
    { id: 2, content: 'JS', completed: false },
    { id: 3, content: 'CSS', completed: false }
  ];
  renderHTML();
});