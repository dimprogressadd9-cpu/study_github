// GitHub 学習用の電卓アプリ。
// フェーズ2以降、機能を1つずつ追加していく。

// 2つの数値の和を返す。
function add(a, b) {
  return a + b;
}

// 2つの数値の商を返す。0 で割ろうとした場合はエラーを投げる。
function divide(a, b) {
  if (b === 0) {
    throw new Error('0 では割れません');
  }
  return a / b;
}

module.exports = { add, divide };
