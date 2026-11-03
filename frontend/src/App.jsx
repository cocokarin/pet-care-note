import "./App.css";
import { useState } from "react";
import PetFormPage from "./pages/PetFormPage";
import PetRecordPage from "./pages/PetRecordPage";
import RecordFormPage from "./pages/RecordFormPage";

function App() {
  const [currentPage, setCurrentPage] = useState("login");

  if (currentPage === "home") {
    return (
      <PetRecordPage
        onLogout={() => setCurrentPage("login")}
        onEditPet={() => setCurrentPage("petForm")}
        onAddRecord={() => setCurrentPage("recordForm")}
      />
    );
  }

  if (currentPage === "recordForm") {
    return <RecordFormPage onCancel={() => setCurrentPage("home")} />;
  }

  if (currentPage === "petForm") {
    return <PetFormPage onCancel={() => setCurrentPage("home")} />;
  }

  return (
    <div>
      <h1>ペットケアノート</h1>
      <p>Pet Life</p>
      <h2>ログイン</h2>

      <form>
        <div>
          <label htmlFor="loginId">ログインID</label>
          <input id="loginId" type="text" />
        </div>

        <div>
          <label htmlFor="password">パスワード</label>
          <input id="password" type="password" />
        </div>

        <button type="button" onClick={() => setCurrentPage("home")}>
          ログイン
        </button>
      </form>
    </div>
  );
}

export default App;
