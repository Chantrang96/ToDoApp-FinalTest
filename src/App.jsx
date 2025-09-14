import React, { useState } from "react";
import "./App.css";

const tabs = { ALL: "All", ACTIVE: "Active", COMPLETED: "Completed" };

const App = () => {
  const [todos, setTodos] = useState([
    { id: "1", title: "Do coding challenges", active: true },
    { id: "2", title: "Do coding challenges", active: true },
    { id: "3", title: "Do coding challenges", active: false },
  ]);

  const [tab, setTab] = useState(tabs.ALL);
  const [value, setValue] = useState("");

  let list = todos;
  if (tab === tabs.ACTIVE) {
    list = todos.filter((item) => item.active);
  } else if (tab === tabs.COMPLETED) {
    list = todos.filter((item) => !item.active);
  }
  const Add = (e) => {
    e.preventDefault();
    if (tab === tabs.COMPLETED) return;
    const title = value.trim();
    if (!title) return;
    const newTask = { id: Date.now(), title, active: true };
    setTodos((prev) => [...prev, newTask]);
    setValue("");
  };
  const deleteTask = (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };
  const deleteAllTask = () => {
    setTodos((prev) => prev.filter((t) => t.active));
  };

  const finishTask = (id) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, active: !t.active } : t))
    );
  };

  return (
    <main className="container">
      <div className="todoapp">
        <h1 className="title">#todo</h1>
        <div className="tabs">
          <button
            className={`tab ${tab === tabs.ALL && "active"}`}
            onClick={() => setTab(tabs.ALL)}
          >
            All
          </button>
          <button
            className={`tab ${tab === tabs.ACTIVE && "active"}`}
            onClick={() => setTab(tabs.ACTIVE)}
          >
            Active
          </button>
          <button
            className={`tab ${tab === tabs.COMPLETED && "active"}`}
            onClick={() => setTab(tabs.COMPLETED)}
          >
            Completed
          </button>
        </div>
        <hr className="divider" />
        <div className="input">
          <input
            type="text"
            placeholder="add details"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button
            className="add"
            type="submit"
            onClick={Add}
            disabled={tab === tabs.COMPLETED}
          >
            Add
          </button>
        </div>
        <ul className="list">
          {list.map((t) => (
            <li key={t.id} className="todo-row">
              <input
                type="checkbox"
                checked={!t.active}
                onChange={() => finishTask(t.id)}
              />
              <span className={t.active ? "" : "done"}>{t.title}</span>
              {tab === tabs.COMPLETED && (
                <button className="delete" onClick={() => deleteTask(t.id)}>
                  🗑
                </button>
              )}
            </li>
          ))}
        </ul>
        {tab === tabs.COMPLETED && list.length > 0 && (
          <div className="actions">
            <button className="detelteAll" onClick={deleteAllTask}>
              🗑 Delete All
            </button>
          </div>
        )}
      </div>
    </main>
  );
};

export default App;
