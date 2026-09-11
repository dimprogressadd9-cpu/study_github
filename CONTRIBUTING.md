# CONTRIBUTING

このリポジトリで作業する際のルールをまとめます。個人学習用リポジトリですが、
実際のチーム開発を想定した運用で練習します。

## 1. 開発の始め方

- すべての作業は **Issue** から始めます。思いついた作業でも、まず Issue を立てます。
- Issue には `type:*` / `priority:*` / `status:*` のラベルを付けます(詳細は後述)。
- 作業に着手したら Issue を Board 上で `status:in-progress` に移します。
- PR には `Closes #<Issue番号>` を書き、Issue と紐づけます。マージ時に Issue が自動クローズされます。

## 2. ブランチ戦略

**GitHub Flow** を採用します。`main` + 短命のトピックブランチ + PR、というシンプルな形です。

- `main` からブランチを切る
- 作業が終わったら PR を出し、レビュー・CI を通してから `main` にマージする
- マージ後は不要になったブランチを削除する

### ブランチ命名

| プレフィックス | 用途 |
| --- | --- |
| `feature/...` | 新機能・改善 |
| `fix/...` | バグ修正 |
| `docs/...` | ドキュメントのみの変更 |

例: `feature/add-multiply`, `fix/divide-by-zero`, `docs/contributing-guide`

## 3. コミットメッセージ

1行目は要約から始めます。

```
feat: add input validation
```

慣れてきたら **Conventional Commits** に寄せます。

| プレフィックス | 意味 |
| --- | --- |
| `feat` | 新機能 |
| `fix` | バグ修正 |
| `docs` | ドキュメントのみの変更 |
| `chore` | ビルド・設定など、機能に影響しない変更 |

## 4. PR の出し方とレビュー

- PR は必ず **PR テンプレート**に沿って書きます(`.github/pull_request_template.md`)。
- `main` は保護されており、直接 push はできません。PR + CI 成功が必須です。
- パスによっては `CODEOWNERS` で自動的にレビュアーが割り当てられます。
- レビューコメントはすべて解決(Resolve)してからマージします。
- マージ方式は **Squash and merge** で、履歴を1コミットに簡潔にまとめます。

## 5. ラベル体系

3軸で管理します。組み合わせて使います。

| 軸 | ラベル | 意味 |
| --- | --- | --- |
| 種別 | `type:bug` | バグ・不具合 |
| | `type:feature` | 新機能・改善 |
| | `type:docs` | ドキュメント |
| 優先度 | `priority:high` | 高:すぐ着手 |
| | `priority:med` | 中:通常 |
| | `priority:low` | 低:余裕があれば |
| 状態 | `status:todo` | 未着手 |
| | `status:in-progress` | 進行中 |
| | `status:review` | レビュー中 |
| | `status:done` | 完了 |

---

より詳しい学習の全体像は [github_gitlab_leader_roadmap.md](github_gitlab_leader_roadmap.md) を参照してください。
