import { useEffect, useState } from "react";

function PetRecordPage({ onLogout, onEditPet, onAddRecord }) {
  const [pet, setPet] = useState(null);

  useEffect(() => {
    async function fetchPets() {
      const response = await fetch("/api/pets");
      const data = await response.json();
      setPet(data[0] ?? null);
    }
    fetchPets();
  }, []);

  return (
    <div>
      <h1>ペットケアノート</h1>
      <h2>ペット記録</h2>
      <button type="button" onClick={onLogout}>
        ログアウト
      </button>
      <section>
        <h3>ペット基本情報</h3>
        <p>名前：{pet ? pet.name : "未登録"}</p>
        <p>種類：{pet ? pet.species : "未登録"}</p>
        <p>生年月日：{pet ? pet.birthday : "未登録"}</p>
        <button type="button" onClick={onEditPet}>
          ペット情報を編集する
        </button>
      </section>

      <section>
        <h3>日常記録一覧</h3>
        <button type="button" onClick={onAddRecord}>
          新しい記録を登録する
        </button>
        <table>
          <thead>
            <tr>
              <th>日付</th>
              <th>種類</th>
              <th>内容</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2026-11-02</td>
              <td>健康</td>
              <td>元気に散歩し、食欲もあった。</td>
              <td>
                <button type="button">編集</button>
                <button type="button">削除</button>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default PetRecordPage;
