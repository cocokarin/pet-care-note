import { useState } from "react";

function RecordFormPage({ onCancel }) {
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [memo, setMemo] = useState("");

  async function handleSave() {
    if (!date || !category || !content.trim()) {
      alert("日付・種類・内容を入力してください");
      return;
    }
    const response = await fetch("/api/pets/1/records", {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        date,
        category,
        content,
        memo,
      }),
    });

    if (response.ok) {
      alert("記録を保存しました");
      onCancel();
    } else {
      alert("記録に失敗しました");
    }
  }

  return (
    <div>
      <h1>日常記録の登録・編集</h1>
      <div>
        <label htmlFor="recordDate">日付（必須）</label>
        <input
          id="recordDate"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="recordType">種類（必須）</label>
        <select
          id="recordType"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">選択してください</option>
          <option value="健康">健康</option>
          <option value="日常">日常</option>
          <option value="その他">その他</option>
        </select>
      </div>
      <div>
        <label htmlFor="content">内容（必須）</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="memo">メモ（任意）</label>
        <textarea
          id="memo"
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
        />
      </div>
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

export default RecordFormPage;
