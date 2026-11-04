import { useEffect, useState } from "react";

function PetRecordPage({ onLogout, onEditPet, onAddRecord, onEditRecord }) {
  const [pet, setPet] = useState(null);
  const [records, setRecords] = useState([]);

  useEffect(() => {
    async function fetchPets() {
      const response = await fetch("/api/pets");
      const data = await response.json();
      setPet(data[0] ?? null);

      if (data[0]) {
        const recordsResponse = await fetch(
          `/api/pets/${data[0].petId}/records`,
        );
        if (recordsResponse.ok) {
          const recordsData = await recordsResponse.json();
          setRecords(recordsData);
        }
      }
    }
    fetchPets();
  }, []);

  async function handleDelete(recordId) {
    const confirmed = window.confirm("この記録を削除しますか？");

    if (!confirmed) {
      return;
    }

    const response = await fetch(`api/pets/${pet.petId}/records/${recordId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setRecords(records.filter((record) => record.recordId !== recordId));
      alert("記録を削除しました");
    } else {
      alert("記録の削除に失敗しました");
    }
  }

  return (
    <div className="pet-record-page">
      <header className="pet-header">
        <h1>ペットケアノート</h1>
        <button type="button" onClick={onLogout}>
          ログアウト
        </button>
      </header>
      <section>
        <div className="pet-info-box">
          <h3>ペット基本情報</h3>
          <p>名前：{pet ? pet.name : "未登録"}</p>
          <p>種類：{pet ? pet.species : "未登録"}</p>
          <p>生年月日：{pet ? pet.birthday : "未登録"}</p>
        </div>
        <button type="button" onClick={onEditPet}>
          ペット情報を編集する
        </button>
      </section>

      <section>
        <h3>日常記録一覧</h3>
        <table>
          <thead>
            <tr>
              <th>日付</th>
              <th>種類</th>
              <th>内容</th>
              <th>メモ</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {records.length === 0 && (
              <tr>
                <td colSpan="5">記録がありません</td>
              </tr>
            )}
            {records.map((record) => (
              <tr key={record.recordId}>
                <td>{record.date}</td>
                <td>{record.category}</td>
                <td>{record.content}</td>
                <td>{record.memo}</td>
                <td>
                  <button type="button" onClick={() => onEditRecord(record)}>
                    編集
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(record.recordId)}
                  >
                    削除
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button type="button" onClick={onAddRecord}>
          新しい記録を登録する
        </button>
      </section>
    </div>
  );
}

export default PetRecordPage;
