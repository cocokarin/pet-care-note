function PetFormPage({ onCancel }) {
  return (
    <div>
      <h1>ペット情報の登録・編集</h1>
      <p>ペットの基本情報を入力する画面です。</p>
      <div>
        <label htmlFor="petName">ペット名（必須）</label>
        <input id="petName" type="text" required />
      </div>
      <div>
        <label htmlFor="species">種類（必須）</label>
        <select id="species" required>
          <option value="">選択してください</option>
          <option value="犬">犬</option>
          <option value="猫">猫</option>
          <option value="その他">その他</option>
        </select>
      </div>
      <div>
        <label htmlFor="birthday">生年月日（任意）</label>
        <input id="birthday" type="date" />
      </div>
      <div>
        <button type="button">保存</button>
        <button type="button" onClick={onCancel}>
          キャンセル
        </button>
      </div>
    </div>
  );
}

export default PetFormPage;
