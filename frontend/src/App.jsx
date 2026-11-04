import "./App.css";
import { useState } from "react";
import PetFormPage from "./pages/PetFormPage";
import PetRecordPage from "./pages/PetRecordPage";
import RecordFormPage from "./pages/RecordFormPage";

function App() {
  const [currentPage, setCurrentPage] = useState("login");
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [editingRecord, setEditingRecord] = useState(null);

  async function handleLogin() {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ loginId, password }),
    });

    if (response.ok) {
      setCurrentPage("home");
    } else {
      alert("ログインに失敗しました");
    }
  }

  async function handleLogout() {
    const response = await fetch("/api/auth/logout", {
      method: "POST",
    });

    if (response.ok) {
      setCurrentPage("login");
      setLoginId("");
      setPassword("");
    } else {
      alert("ログアウトに失敗しました");
    }
  }

  if (currentPage === "home") {
    return (
      <PetRecordPage
        onLogout={handleLogout}
        onEditPet={() => setCurrentPage("petForm")}
        onAddRecord={() => setCurrentPage("recordForm")}
        onEditRecord={(record) => {
          setEditingRecord(record);
          setCurrentPage("recordForm");
        }}
      />
    );
  }

  if (currentPage === "recordForm") {
    return (
      <RecordFormPage
        onCancel={() => setCurrentPage("home")}
        editingRecord={editingRecord}
      />
    );
  }

  if (currentPage === "petForm") {
    return <PetFormPage onCancel={() => setCurrentPage("home")} />;
  }

  return (
    <div className="login-page">
      <h1>ペットケアノート</h1>
      <p className="login-subtitle">Pet Life</p>

      <form>
        <div>
          <label htmlFor="loginId">ログインID</label>
          <input
            id="loginId"
            type="text"
            value={loginId}
            onChange={(e) => setLoginId(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="password">パスワード</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="button" onClick={handleLogin}>
          ログイン
        </button>
      </form>
    </div>
  );
}

export default App;
