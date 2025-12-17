import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000";

export default function App() {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState([]);

  const load = async () => {
    const res = await axios.get(`${API}/todos`);
    setTodos(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  const addTodo = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    await axios.post(`${API}/todos`, { text });
    setText("");
    load();
  };

  const deleteTodo = async (id) => {
    await axios.delete(`${API}/todos/${id}`);
    load();
  };

  return (
    <div style={{ maxWidth: 520, margin: "40px auto", fontFamily: "Arial" }}>
      <h2>To-Do App</h2>

      <form onSubmit={addTodo} style={{ display: "flex", gap: 8 }}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Nowe zadanie..."
          style={{ flex: 1, padding: 8 }}
        />
        <button type="submit">Dodaj</button>
      </form>

      <ul style={{ marginTop: 20 }}>
        {todos.map((t) => (
          <li
            key={t.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 8,
            }}
          >
            <span>{t.text}</span>
            <button onClick={() => deleteTodo(t.id)}>Usuń</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
