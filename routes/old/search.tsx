export default function SearchPage() {
    function performSearch() {
    }

    function deleteSelected() {
    }

    function editSelected() {
    }

    function confirmDelete() {
    }

    function closePopup() {
    }

    return (
        <>
            <head>
                <title>検索画面</title>
                <link rel="stylesheet" type="text/css" href="/old/search.css" />
            </head>
            <header>
                <h1>契約者検索画面</h1>
            </header>
            <main>
                {/* アコーディオンメニュー */}
                <div class="accordion">
                    <button class="accordion-button">検索窓</button>
                    <div class="accordion-content">
                        <input type="text" id="search" placeholder="検索..." />
                        <button onClick={performSearch}>検索</button>
                    </div>
                </div>

                {/* 検索結果リスト */}
                <div class="results">
                    <h2>検索結果</h2>
                    <button onClick={deleteSelected}>削除</button>
                    <button onClick={editSelected}>編集</button>
                    <ul id="resultList">
                        {/* 検索結果はJavaScriptで動的に追加されます */}
                    </ul>
                </div>

                {/* 選択されたアイテムの詳細表示 */}
                <div id="details" class="details">
                    <h2>詳細情報</h2>
                    <p id="detailsContent">
                        選択されたアイテムの詳細がここに表示されます。
                    </p>
                </div>
            </main>
            {/* 削除確認ポップアップ */}
            <div id="deleteConfirmation" class="popup">
                <div class="popup-content">
                    <p>本当に削除しますか？</p>
                    <input
                        type="password"
                        id="password"
                        placeholder="パスワード"
                    />
                    <button onClick={confirmDelete}>はい</button>
                    <button onClick={closePopup}>いいえ</button>
                </div>
            </div>
        </>
    );
}
