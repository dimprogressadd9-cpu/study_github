// GitHub 学習用の電卓アプリ。
// フェーズ2以降、機能を1つずつ追加していく。

// 2つの数値の和を返す。
function add(a, b) {
  return a + b;
}

// 2つの数値の商を返す。
// 【わざとバグ】0 で割ったときにエラーを投げず Infinity を返してしまう。
function divide(a, b) {
  return a / b;
}

module.exports = { add, divide };
