import axios from 'axios';

(function () {
  // TODO:

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

    newTodos.forEach(todo => {
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
  // function addTodo(todo) {
  //   if (!todo) return;
  //   todos = [{
  //     id: getNextID(),
  //     content: todo,
  //     completed: false
  //   }].concat(todos);
  //   renderHTML();
  // }

  const getTodos = function () {
    axios.get('/todos')
      .then(({ data }) => {
        todos = data;
        renderHTML();
        console.log('[GET]\n', todos);
      })
      .catch(err => console.log(err.response))
  };

  const addTodo = function (content) {
    const newTodos = { id: getNextID(), content, completed: false };

    axios.post('/todos', newTodos)
      .then(({ data }) => {
        console.log('[ADD]\n', data);
        getTodos();
      })
      .catch(err => console.log(err.response));
  };

  const removeTodo = function (id) {
    axios.delete(`/todos/${id}`)
      .then(() => {
        console.log('Delete todo', id);
        getTodos();
      })
      .catch(err => console.log(err.response));
  };

  const toggleTodocompleted = function (id) {
    const { completed } = todos.find(todo => todo.id === +id);
    axios.patch(`/todos/${id}`, { completed: !completed })
      .then(() => {
        console.log('toggle completed', id);
        getTodos();
      })
      .catch(err => console.log(err.response));
  };

  const toggleAll = function (chkStatement) {
    axios.patch('/todos', { completed: chkStatement })
      .then(() => {
        console.log('toggle all completed', chkStatement);
        getTodos();
      })
      .catch(err => console.log(err.response));
  };

  const removecompleted = function () {
    axios.delete('/todos/completed')
      .then(() => {
        console.log('[REMOVE]');
        getTodos();
      })
      .catch(err => console.log(err.response));
  };

  // event
  window.addEventListener('load', getTodos());

  inputtodo.addEventListener('keyup', e => {
    if (e.keyCode !== 13 || !inputtodo.value) return;
    addTodo(inputtodo.value);
    inputtodo.value = '';
    getTodos();
    // renderHTML();
    // console.log(todos);
  });

  // delete
  list.addEventListener('click', e => {
    if (!e.target.dataset.id || e.target.nodeName !== 'SPAN' || e.target.parentNode.nodeName === 'LABEL') return;
    // if (e.target.nodeName === 'SPAN') { todos = todos.filter(todo => todo.id !== +e.target.dataset.id); }
    removeTodo(e.target.dataset.id);
    getTodos();
    // renderHTML();
  });

  // change toogle
  list.addEventListener('change', e => {
    toggleTodocompleted(e.target.id);
  });

  tabMenu.addEventListener('click', e => {
    if (!e.target || !e.target.nodeName === 'A') return;
    e.target.parentNode.parentNode.childNodes.forEach(node => {
      if (e.target.parentNode.nodeName === 'LI') { 
        node.className = ''; }
    });
    e.target.parentNode.className = 'active';
    tabStatement = e.target.parentNode.id;
    renderHTML();
  });

  // checked all Completed
  allCom.addEventListener('change', e => {
    toggleTodocompleted();
  });
  // console.log(e.target.checked)

  // all remove list
  removeCom.addEventListener('click', () => {
    removecompleted();
  });

  window.addEventListener('load', () => {
    axios.get('/todos')
      .then(({ data }) => {
        todos = data;
        console.log(todos);
        renderHTML();
      });
  });
}(axios));
