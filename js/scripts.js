//Seleção dos elementos HTML
const todoForm = document.querySelector('#todo-form');
const todoInput = document.querySelector('#todo-input');
const todoList = document.querySelector('#todo-list');
const todoListItems = document.querySelector('.todo')
const editForm = document.querySelector('#edit-form');
const editInput = document.querySelector('#edit-input');
const cancelEditBtn = document.querySelector('#cancel-edit-btn');
const searchInput = document.querySelector('#search-input');
const eraseBtn = document.querySelector('#erase-button');
const filterSelect = document.querySelector('#filter-select');

let oldInputValue

//Funções javascript
const saveTodo = (text) => {
  const todo = document.createElement('div')
  todo.classList.add('todo-items')
  // todo.classList.add('todo')

  const todoTitle = document.createElement('h3')
  todoTitle.innerText = text
  todo.appendChild(todoTitle)

  const doneBtn = document.createElement('button')
  doneBtn.classList.add('finish-todo')
  doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>'
  todo.appendChild(doneBtn)

  const editBtn = document.createElement('button')
  editBtn.classList.add('edit-todo')
  editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>'
  todo.appendChild(editBtn)

  const deleteBtn = document.createElement('button')
  deleteBtn.classList.add("remove-todo")
  deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>'
  todo.appendChild(deleteBtn)

  todoListItems.appendChild(todo)
  todoInput.value = ''
  todoInput.focus()
}

const toggleForms = () => {
  editForm.classList.toggle('hide')
  todoForm.classList.toggle('hide')
  todoList.classList.toggle('hide')
}

const updateTodo = (text) => {
  const todos = document.querySelectorAll('.todo-items')

  todos.forEach((todo) => {
    let todoTitle = todo.querySelector('h3')

    if (todoTitle.innerText === oldInputValue) {
      todoTitle.innerText = text
    }
  })
}

function search() {
  const todos = document.querySelectorAll('.todo-items')
  todos.forEach((todo) => {
    let todoTitle = todo.querySelector('h3')

    for (let i = 0; i < todos.length; i++) {
      let item = todos[i]
      let text = item.textContent || item.innerText

      if (text.toUpperCase().indexOf(searchInput.value.toUpperCase()) > -1) {
        item.style.display = ''
      }
      else {
        item.style.display = 'none'
      }
    }
  })
}

function filterByStatus() {
  const todos = document.querySelectorAll('.todo-items')
  const selectedStatus = filterSelect.value

  todos.forEach((todo) => {
    const isDone = todo.classList.contains('done')
    const isVisible = (selectedStatus === 'all') || (selectedStatus === 'done' && isDone) || (selectedStatus === 'todo' && !isDone)

    todo.style.display = isVisible ? '' : 'none'
  })
}

//Eventos
todoForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const inputValue = todoInput.value

  if (inputValue) {
    saveTodo(inputValue)
  }
})

document.addEventListener('click', (e) => {
  const targetEl = e.target
  const parentEl = targetEl.closest('div')
  let todoTitle

  if (parentEl && parentEl.querySelector('h3')) {
    todoTitle = parentEl.querySelector('h3').innerText
  }

  if (targetEl.classList.contains('finish-todo')) {
    parentEl.classList.toggle('done')
  }

  if (targetEl.classList.contains('remove-todo')) {
    parentEl.remove()
  }

  if (targetEl.classList.contains('edit-todo')) {
    console.log('oioioi')
    toggleForms()

    editInput.value = todoTitle
    oldInputValue = todoTitle
  }
})

cancelEditBtn.addEventListener('click', (e) => {
  e.preventDefault()

  toggleForms()
})

editForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const editInputValue = editInput.value

  if (editInputValue) {
    updateTodo(editInputValue)
  }

  toggleForms()
})

eraseBtn.addEventListener('click', (e) => {
  e.preventDefault()

  searchInput.value = ''
})

searchInput.addEventListener('input', search)
filterSelect.addEventListener('change', filterByStatus)