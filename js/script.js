// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  set,
  onChildAdded,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

/**
 * Config = 機密情報です！！！
 * この部分はGitHubに上げないこと！！！！！！！
 */
const firebaseConfig = {

};

// // Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);//RealtimeDBに接続
const dbRef = ref(database, "chat"); //RealtimeDB内の”chat”に格納

//送信ボタン(id=send)を押したときの処理
$("#send").on("click", function () {

  //入力欄のデータを取得(データの取得⇒Val)
  const userName = $('#userName').val();
  const text = $("#text").val();

  //送信データを”message”で定義：userNameとtextをオブジェクトにまとめる
  const message = {
    userName: userName,
    text: text,
  };
  //【newPostRef】の定義：Firesbase Realtime Databaseにオブジェクト送信⇒push
  const newPostRef = push(dbRef);
  //上で定義したnewPostRef に”message”‥userName,text をセット 
  set(newPostRef, message);
});
//指定した場所にデータが追加されたことを検知(新しく入っている情報がdataに格納されている)
onChildAdded(dbRef, function (data) {
  //追加されたデータをfirebaseから受け取り、分解
  const message = data.val();
  const key = data.key;
  console.log(data, message, key);
  //
  let chatMsg = ` 
    <div>
      <div>${message.userName}</div>
      <div>${message.text}</div>
    </div>
  `;

  $("#output").append(chatMsg);
});

//リセットボタン(id=resetb)を押したときの処理
$("#resetb").on("click", function () {
  userName.value = '';
  text.value = '';
})
