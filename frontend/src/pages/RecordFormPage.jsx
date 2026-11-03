function RecordFormPage({ onCancel }) {
  return (
    <div>
      <h1>日常記録の登録・編集</h1>
      <div>
        <label htmlFor="recordDate">日付（必須）</label>
        <input id="recordDate" type="date" required />
      </div>
      <div>
        <label htmlFor="recordType">種類（必須）</label>
        <select id="recordType" required>
          <option value="">選択してください</option>
          <option value="健康">健康</option>
          <option value="日常">日常</option>
          <option value="その他">その他</option>
        </select>
      </div>
      <div>
        <label htmlFor="content">内容（必須）</label>
        <textarea id="content" required />
      </div>
      <div>
        <label htmlFor="memo">メモ（任意）</label>
        <textarea id="memo" />
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

export default RecordFormPage;
