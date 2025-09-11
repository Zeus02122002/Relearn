(function () {
    var taskInput = document.getElementById("taskInput");
    var addBtn = document.getElementById("addBtn");
    var taskList = document.getElementById("taskList");
    if (!taskInput || !addBtn || !taskList) {
        return;
    }
    addBtn.addEventListener("click", function () {
        var taskText = taskInput.value.trim();
        if (taskText === "") {
            alert("You idiot you haven't wrote anything yet");
            return;
        }
        var checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "form-checkbox h-10 w-10text-green-500";
        var li = document.createElement("li");
        li.className = "flex items-center p-2 border-b";
        var span = document.createElement("span");
        span.className = "text-black px-4 py-2 rounded font-bold";
        span.textContent = taskText;
        var editBtn = document.createElement("button");
        editBtn.textContent = "🖋️";
        editBtn.className = "px-1 py-1 ml-auto";
        editBtn.addEventListener("click", function () {
            var _a;
            var editInput = document.createElement("input");
            editInput.type = "text";
            editInput.value = (_a = span.textContent) !== null && _a !== void 0 ? _a : "";
            editInput.className = "text-black px-4 font-bold";
            li.replaceChild(editInput, span);
            editInput.focus();
            var save = function () {
                span.textContent = editInput.value.trim() || span.textContent;
                li.replaceChild(span, editInput);
            };
            editInput.addEventListener("keypress", function (e) {
                if (e.key === "Enter")
                    save();
            });
            editInput.addEventListener("blur", save);
        });
        var delBtn = document.createElement("button");
        delBtn.textContent = "🚮";
        delBtn.className = "px-2 py-1";
        delBtn.addEventListener("click", function () {
            li.remove();
        });
        checkbox.addEventListener("change", function () {
            if (checkbox.checked) {
                span.classList.add("line-through", "text-gray-400");
            }
            else {
                span.classList.remove("line-through", "text-gray-400");
            }
        });
        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(editBtn);
        li.appendChild(delBtn);
        taskList.appendChild(li);
        taskInput.value = "";
    });
    taskInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            addBtn.click();
        }
    });
})();
