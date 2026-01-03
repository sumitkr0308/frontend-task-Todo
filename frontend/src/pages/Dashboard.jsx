import { useEffect, useState } from "react";
import API from "../services/api";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editStatus, setEditStatus] = useState("pending");

  // Fetch tasks
  const fetchTasks = async () => {
    const res = await API.get("/tasks", {
      params: { search, status: statusFilter },
    });
    setTasks(res.data);
  };

  // Add task
  const addTask = async () => {
    if (!title) return alert("Title is required");

    await API.post("/tasks", { title, description });
    setTitle("");
    setDescription("");
    fetchTasks();
  };

  // Start editing
  const startEdit = (task) => {
    setEditingTaskId(task._id);
    setEditTitle(task.title);
    setEditDescription(task.description || "");
    setEditStatus(task.status);
  };

  // Save edited task
 const saveEdit = async (id) => {
  if (!editTitle) return alert("Title cannot be empty");

  await API.put(`/tasks/${id}`, {
    title: editTitle,
    description: editDescription,
    status: editStatus || "pending",
  });

  setEditingTaskId(null);
  fetchTasks();
};


  // Delete task
  const deleteTask = async (id) => {
    await API.delete(`/tasks/${id}`);
    fetchTasks();
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  useEffect(() => {
    fetchTasks();
  }, [search, statusFilter]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Task Dashboard</h2>
          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg"
          >
            Logout
          </button>
        </div>

        {/* Add Task */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
          <input
            className="p-3 border rounded-lg"
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            className="p-3 border rounded-lg"
            placeholder="Task description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button
            onClick={addTask}
            className="bg-blue-600 text-white rounded-lg"
          >
            Add Task
          </button>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row gap-3 mb-6">
          <input
            className="flex-1 p-3 border rounded-lg"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="p-3 border rounded-lg"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {/* Task List */}
        {tasks.length === 0 ? (
          <p className="text-center text-gray-500">No tasks found</p>
        ) : (
          tasks.map((task) => (
            <div
              key={task._id}
              className="border rounded-lg p-4 mb-3"
            >
              {editingTaskId === task._id ? (
                <>
                  <input
                    className="w-full mb-2 p-2 border rounded"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                  />

                  <input
                    className="w-full mb-2 p-2 border rounded"
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                  />

                  <select
                    className="w-full mb-3 p-2 border rounded"
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value)}
                  >
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                  </select>

                  <div className="flex gap-2">
                    <button
                      onClick={() => saveEdit(task._id)}
                      className="bg-green-600 text-white px-4 py-1 rounded"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingTaskId(null)}
                      className="bg-gray-400 text-white px-4 py-1 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex justify-between items-start">
                  <div>
                    <h3
                      className={`font-semibold ${
                        task.status === "completed"
                          ? "line-through text-gray-500"
                          : ""
                      }`}
                    >
                      {task.title}
                    </h3>
                    {task.description && (
                      <p className="text-sm text-gray-600">
                        {task.description}
                      </p>
                    )}
                    <span
                      className={`inline-block mt-2 px-2 py-1 text-xs rounded ${
                        task.status === "completed"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {task.status}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => startEdit(task)}
                      className="bg-indigo-500 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteTask(task._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      X
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
