document.addEventListener("DOMContentLoaded", () => {
  const textBox = document.querySelector("input[type='text']");
  const todoList = document.querySelector("ul");
  const priorities = ["highPriority","medPriority","lowPriority"];
  
  //new to do item creation on submit
  document.querySelector("input[type='submit']").addEventListener("click", (e) => {
    const newTodo = document.createElement("li");
    newTodo.innerHTML = '<span class="textValue">'+textBox.value+'</span>  <span class="pencil">\u270f</span><span class="xMark">\u2715</span>';
    switch(document.querySelector("form select").value) {
      case 'high': newTodo.style = "color: red";
                   newTodo.class = "highPriority";
                   break;
      case 'med' : newTodo.style = "color: #F6BE00";
                   newTodo.class = "medPriority";
                   break;
      default :    newTodo.style = "color:green";
                   newTodo.class = "lowPriority";
    }
    
    // add listener to new li to detect deletion event
    newTodo.querySelector(".xMark").addEventListener("click", ()=> newTodo.querySelector("span").parentElement.remove());
    
    // add listener to new li to detect edit event
    newTodo.querySelector(".pencil").addEventListener("click", (e) => {
      const textValue = e.target.parentElement.querySelector(".textValue");
      e.target.innerHTML = textValue.getAttribute('contenteditable') === 'false' ? '\u2713' : '\u270f';  
      textValue.setAttribute('contenteditable', textValue.getAttribute('contenteditable') === 'true' ? 'false' : 'true');
    })

    //append new list element with embeded event listeners
    todoList.appendChild(newTodo);

    //prevent default action of click
    e.preventDefault();
  })

  // sorting function by priority
  document.querySelectorAll(".sorter").forEach(elem=> elem.addEventListener("click", (e) => {
      const listArray = Array.prototype.slice.call(document.querySelectorAll("li"),0);
      const sortedListArray = listArray.sort((a,b) => {
        return e.target.id === "sortAscending" ? priorities.indexOf(a.class) - priorities.indexOf(b.class) : priorities.indexOf(b.class) - priorities.indexOf(a.class);
      })
      while(todoList.firstChild) {
        todoList.removeChild(todoList.firstChild);
      }
      sortedListArray.forEach(element => todoList.appendChild(element));
  }))
});
