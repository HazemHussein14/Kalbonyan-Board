 const localStorageTasks = localStorage.getItem("Tasks");

// Read from local storage
 function read() {
  if (!localStorageTasks) {
    return [
      {
        id: 1,
        status: "Not Started",
        tasks: [],
      },
      {
        id: 2,
        status: "In Progress",
        tasks: [],
      },
      {
        id: 3,
        status: "Completed",
        tasks: [],
      },
    ];
  }
  return JSON.parse(localStorageTasks);
}

 function save(data) {
  localStorage.setItem("Tasks", JSON.stringify(data));
}

// get tasks from local Storage
 function getTasks(columnId) {
  const column = read().find((column) => column.id === columnId);

  return !column ? [] : column.tasks;
}

 function insertTask(columnId, content) {
  const data = read();
  const column = data.find((column) => column.id === columnId);
  const task = {
    id: generateId(),
    content,
  };

  if (!column) {
    throw new Error("Column does not exist");
  }
  column.tasks.push(task);
  save(data);

  return task;
}

 function updateItem(taskId, newProps) {
  const data = read();
  const [task, currentColumn] = (() => {
    for (const column of data) {
      const task = column.tasks.find((task) => task.id === taskId);

      if (task) {
        return [task, column];
      }
    }
  })();

  if (!task) {
    throw new Error("Task not found");
  }

  task.content =
    newProps.content === undefined ? task.content : newProps.content;

  // Update colum and position
  if (newProps.columnId !== undefined && newProps.position !== undefined) {
    const targetColumn = data.find((column) => column.id === newProps.columnId);

    if (!targetColumn) {
      throw new Error("Target column not found.");
    }
    // Delete task from it's current column
    currentColumn.tasks.splice(currentColumn.tasks.indexOf(task), 1);

    // Move task into new column
    targetColumn.tasks.splice(newProps.position, 0, task);
  }
  save(data)
}

 function deleteTask(taskId) {
  const data = read();
  for (const column of data) {
    const task = column.tasks.find((task) => task.id === taskId)

    if (task) {
      column.tasks.splice(column.tasks.indexOf(task), 1)
    }
  }
  save(data)
}

