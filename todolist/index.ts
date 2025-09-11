(()=>{
  const taskInput = document.getElementById("taskInput") as HTMLInputElement;  
  const addBtn = document.getElementById("addBtn") as HTMLButtonElement;
  const taskList = document.getElementById("taskList") as HTMLUListElement;

  if (!taskInput || !addBtn || !taskList) {
    return;
  }
  
  addBtn.addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    if (taskText === "") {
      alert("You idiot you haven't wrote anything yet");
      return;
    }

    const li = document.createElement("li");
    li.className = "flex items-center p-2 border-b gap-2";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "form-checkbox h-5 w-5 text-green-500";
    const textWrapper = document.createElement("div");
    textWrapper.className = "flex-1";

    const span = document.createElement("span");
    span.className = "block w-full bg-gray-100 text-black px-2 py-1 rounded-md font-bold truncate";
    span.textContent = taskText;
    textWrapper.appendChild(span);
    
    const editBtn = document.createElement("button"); 
    editBtn.textContent = "🖋️"; 
    editBtn.className = "px-2 py-1 text-blue-600 hover:text-blue-800";
    editBtn.addEventListener("click", () => {
      const editInput = document.createElement("input");
      editInput.type = "text";
      editInput.value = span.textContent ?? "";

      editInput.className =
        "block w-full text-black px-2 py-1 rounded-md border font-bold focus:outline-none focus:ring focus:ring-blue-300";

      textWrapper.replaceChild(editInput, span);
      editInput.focus();

      const save = () => {
        span.textContent = editInput.value.trim() || span.textContent;
        textWrapper.replaceChild(span, editInput);
      };

      editInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") save();
      });
      editInput.addEventListener("blur", save);
    });

    const delBtn = document.createElement("button");
    delBtn.textContent = "🚮";
    delBtn.className = "px-2 py-1 text-red-600 hover:text-red-800";
    delBtn.addEventListener("click", () => {
      li.remove();
    });

    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        span.classList.add("line-through", "text-gray-400");
      } else {
        span.classList.remove("line-through", "text-gray-400");
      }
    });

    li.appendChild(checkbox);
    li.appendChild(textWrapper);
    li.appendChild(editBtn);
    li.appendChild(delBtn);
    taskList.appendChild(li);

    taskInput.value = "";
  });

  taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      addBtn.click();
    }
  });
})();
