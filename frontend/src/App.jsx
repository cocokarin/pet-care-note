import "./App.css";

function App() {
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

        <button type="button">ログイン</button>
      </form>
    </div>
  );
}

export default App;
