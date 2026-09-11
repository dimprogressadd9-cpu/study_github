# study_github — GitHub 学習用リポジトリ

[![CI](https://github.com/dimprogressadd9-cpu/study_github/actions/workflows/ci.yml/badge.svg)](https://github.com/dimprogressadd9-cpu/study_github/actions/workflows/ci.yml)

プロジェクトリーダーになる準備として、開発管理プラットフォーム(GitHub / GitLab)を
実習で学ぶための練習用リポジトリです。題材は小さな「電卓アプリ」。

## セットアップ

前提: Node.js 20 以上。

```bash
git clone https://github.com/dimprogressadd9-cpu/study_github.git
cd study_github
npm test
```

## テスト

```bash
npm test   # node --test でユニットテストを実行
```

CI(GitHub Actions)が push / PR のたびに同じテストを自動実行します。

## 開発フロー(このリポジトリの約束)

- すべての作業は **Issue** から始める
- `feature/*` `fix/*` `docs/*` ブランチを切り、**PR** で master に取り込む
- master は保護:**PR 必須 + CI 緑必須**(直接 push 不可)
- マージ方式は **Squash and merge**

詳しい貢献手順は [CONTRIBUTING.md](CONTRIBUTING.md)、
学習の全体像は [github_gitlab_leader_roadmap.md](github_gitlab_leader_roadmap.md) を参照。

## ライセンス

MIT
