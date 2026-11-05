import { useState } from "react";

function PetFormPage({ onCancel, editingPet = null }) {
  const [name, setName] = useState(editingPet?.name ?? "");
  const [species, setSpecies] = useState(editingPet?.species ?? "");
  const [birthday, setBirthday] = useState(editingPet?.birthday ?? "");

  async function handleSave() {
    if (!name.trim() || !species) {
      alert("ペット名・種類を入力してください");
      return;
    }

    const url = editingPet ? `/api/pets/${editingPet.petId}` : "/api/pets";

    const response = await fetch(url, {
      method: editingPet ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, species, birthday }),
    });

    if (response.ok) {
      alert("ペット情報を保存しました");
      onCancel();
    } else {
      alert("ペット情報の保存に失敗しました");
    }
  }

  return (
    <div className="pet-form-page">
      <h1>ペット情報の登録・編集</h1>
      <p>ペットの基本情報を入力する画面です。</p>
      <div className="pet-form-box">
        <div>
          <label htmlFor="petName">ペット名（必須）</label>
          <input
            id="petName"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="species">種類（必須）</label>
          <select
            id="species"
            value={species}
            onChange={(e) => setSpecies(e.target.value)}
            required
          >
            <option value="">選択してください</option>
            <option value="犬">犬</option>
            <option value="猫">猫</option>
            <option value="その他">その他</option>
          </select>
        </div>
        <div>
          <label htmlFor="birthday">生年月日（任意）</label>
          <input
            id="birthday"
            type="date"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
          />
        </div>
      </div>{" "}
      {/* pet-form-box を閉じる */}
      <div>
        <button type="button" onClick={handleSave}>
          保存
        </button>
        <button type="button" onClick={onCancel}>
          キャンセル
        </button>
      </div>
    </div>
  );
}

export default PetFormPage;
