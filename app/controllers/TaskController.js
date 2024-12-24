export const CreateTask = async (req, res) => { 
  res.json({status: "success", message: "Task Created"});
}

export const UpdateTaskStatus = async (req, res) => { 
  res.json({status: "success", message: "Task Status Updated"});
}

export const TaskListByStatus = async (req, res) => { 
  res.json({status: "success", message: "Task By Status"});
}

export const DeleteTask = async (req, res) => {   
  res.json({status: "success", message: "Task Deleted"});
}


export const CountTask = async (req, res) => {   
  res.json({status: "success", message: "Task Count"});
}



