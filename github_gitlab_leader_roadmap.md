# プロジェクトリーダーのための GitHub / GitLab 実習ロードマップ

> 対象: Git の基本操作(コミット・ブランチ・リポジトリ)は習得済みで、これから「開発管理プラットフォーム」としての GitHub / GitLab をリーダー視点で使いこなしたい人。
> 重点領域: ① Issue / ボードによるタスク・スケジュール管理 ② Merge Request / Pull Request とコードレビュー運用 ③ CI/CD による自動化。
> 進め方: 手を動かす実習中心。各フェーズに「やってみる」課題があります。

---

## 0. 学び方の基本方針 ― 2つを同時に学ぶコツ

GitLab と GitHub は **概念がほぼ共通で、用語と画面が違うだけ** です。だから「片方で本質を理解し、もう片方は対応表で読み替える」のが最速です。

学習用リポジトリは2つ用意します。

- **GitHub** … 個人 / Claude 学習用。CI を遠慮なく回したいので **public リポジトリ** にする(public なら標準ランナーの Actions は無制限・無料)。
- **GitLab.com** … 仕事の予習用。無料枠は CI/CD が月400分しかないので、パイプラインは軽量に保つ。

両方で「同じ題材」を扱うと比較が一気に楽になります。題材は何でもよいですが、`npm test` が走る小さな Node アプリ、または好きな言語の「電卓 + テスト」程度が扱いやすいです。

### 用語・機能の対応表(最重要・常に手元に置く)

| やりたいこと | GitHub | GitLab |
|---|---|---|
| コードのマージ依頼+レビュー | **Pull Request (PR)** | **Merge Request (MR)** |
| タスク・課題の管理 | **Issues** | **Issues** |
| かんばんボード | **Projects**(Projects v2) | **Issue Boards** |
| 期日・マイルストーン | **Milestones** | **Milestones** / **Iterations** |
| 上位の計画(ロードマップ・エピック) | Projects のロードマップ表示(無料) | **Epics / Roadmap**(Premium 以降=有料) |
| CI/CD 定義ファイル | `.github/workflows/*.yml` | `.gitlab-ci.yml`(リポジトリ直下) |
| CI/CD の仕組み | **GitHub Actions** | **GitLab CI/CD** |
| 実行環境 | GitHub-hosted runner | GitLab Runner(共有 or 自前) |
| ブランチ保護 | Branch protection rules / Rulesets | Protected branches / Push rules |
| 自動マージ・依存更新 | Dependabot, Auto-merge | Dependency Scanning(一部 Premium), Merge when pipeline succeeds |
| Wiki / ドキュメント | Wiki, README | Wiki, README |
| パッケージ配布 | GitHub Packages | Package Registry |
| シークレット管理 | Repository / Environment secrets | CI/CD Variables(masked / protected) |

> リーダーとして覚えておく差分: GitLab は「ロードマップ・エピック・MR承認ルール」など計画/統制系の上位機能が **有料(Premium)** に寄っています。無料の GitLab.com では、上位の計画は GitHub Projects で先に体験するのが現実的です。

---

## フェーズ 1 ― Issue とボードでタスク・スケジュールを回す(2〜3日)

リーダーの仕事の中心。コードより先に **「作業の可視化」** を体に入れます。

### 1-1. 学ぶ概念

- **Issue** = 1つの作業単位(バグ・機能・調査)。タイトル・説明・担当者(Assignee)・ラベル・期日・マイルストーンを持つ。
- **Label** = 分類タグ。`type:bug` `priority:high` `status:in-progress` のように **接頭辞で体系化** すると後で効く。
- **Milestone** = 期日付きのまとまり(例: スプリント、リリース v1.2)。進捗バーが出る。
- **Board(かんばん)** = Issue を「未着手 / 進行中 / レビュー中 / 完了」の列にドラッグして管理。
- **テンプレート** = Issue 作成時の入力フォーム。報告品質を揃えられる(リーダー必須)。

### 1-2. 実習(GitHub)

1. public リポジトリを1つ作る。
2. ラベルを設計する(`type:bug` `type:feature` `priority:high/med/low` `status:*`)。
3. Issue を5件作る。うち1件は「他の Issue を子に持つ親タスク」としてチェックリスト(`- [ ] #2` のように Issue 番号を書く)で表現する。
4. **Milestone** を1つ作り(例「Sprint 1」、期日2週間後)、Issue を割り当てる。
5. **Projects(v2)** を作成し、Board ビューと **Table ビュー**、**Roadmap ビュー** を切り替えてみる。Issue を列間でドラッグ。
6. Issue 本文に `Closes #3` と書いた PR を後で作ると Issue が自動クローズされることを、フェーズ2で確認する(連携の予習)。
7. `.github/ISSUE_TEMPLATE/bug_report.md` を作り、バグ報告テンプレートを用意する。

### 1-3. 実習(GitLab・対応付け)

1. GitLab.com にプロジェクトを作る。
2. 同じラベル体系を **スコープ付きラベル**(`status::in-progress` のように `::` 区切り)で作る ― これは GitLab の便利機能で、同じスコープのラベルは1つしか付かない(ステータス管理に最適)。
3. **Issue Boards** を開き、ラベルを列に割り当てる。
4. **Milestone** を作って Issue を割り当てる。
5. `.gitlab/issue_templates/Bug.md` を作る(GitHub と置き場所が違うだけ)。

### 1-4. リーダー視点のチェックリスト

- [ ] 「見ればチームの状況が分かる」ボードが1枚ある
- [ ] ラベルの命名規則が文書化されている(README か Wiki)
- [ ] Issue テンプレートで報告の最低項目(再現手順・期待結果・実際の結果)が強制されている
- [ ] マイルストーン=スプリント or リリースの単位が決まっている

---

## フェーズ 2 ― MR / PR とコードレビュー運用(3〜4日)

チーム開発の品質はここで決まります。**「人がレビューする前に機械にチェックさせる」** 設計を目指します(フェーズ3のCIと連動)。

### 2-1. 学ぶ概念

- **PR / MR** = 「このブランチを main に取り込みたい」という提案。差分(diff)・コメント・レビュー承認・CI結果が1画面に集まる。
- **ブランチ戦略** = 小さなチームなら **GitHub Flow**(main + 短命の feature ブランチ + PR)が最もシンプルでおすすめ。
- **レビュー** = 行コメント、変更提案(suggested changes)、Approve / Request changes。
- **保護ブランチ** = main への直接 push を禁止し、PR + レビュー承認 + CI 成功を必須にする。
- **マージ方式** = Merge commit / Squash / Rebase。小チームは **Squash** が履歴が綺麗で扱いやすい。

### 2-2. 実習(GitHub)

1. `feature/add-validation` ブランチを切り、小さな変更+わざと1つバグを入れてコミット → push。
2. **Pull Request** を作成。本文に `Closes #1` と書く(フェーズ1の Issue と連携)。
3. 自分でレビューコメントを付け、`suggestion` ブロックで修正提案を出して、それを GitHub 上で適用する。
4. **Settings → Branches → Branch protection(または Rulesets)** で main を保護:
   - PR 必須
   - 承認1件以上必須
   - 「ステータスチェック必須」(フェーズ3でCIを入れたら有効化)
5. PR をマージ(Squash and merge)。Issue が自動クローズされることを確認。
6. **CODEOWNERS** ファイル(`.github/CODEOWNERS`)を作り、特定パスの変更に自分を自動レビュアー指定する。

### 2-3. 実習(GitLab・対応付け)

1. 同様に feature ブランチ → push → **Merge Request** 作成。
2. MR の **Changes** タブで行コメント、**Approve**。
3. **Settings → Repository → Protected branches** で main を保護。
4. MR 設定で「**Pipelines must succeed**(パイプライン成功を必須)」「**All discussions must be resolved**(全コメント解決を必須)」をオンにする ― これは無料枠でも使える強力な品質ゲート。
5. **Merge when pipeline succeeds**(パイプライン成功時に自動マージ)を試す。

> 注意: 複数人の「**承認ルール(Approval rules)**」の細かい設定(必須承認者の指定など)は GitLab では Premium 寄り。無料枠では「最低承認数」より「パイプライン必須+ディスカッション解決必須」で品質を担保する設計にする。

### 2-4. リーダー視点のチェックリスト

- [ ] main は保護され、直接 push できない
- [ ] PR/MR テンプレートに「何を・なぜ・どうテストしたか」の欄がある
- [ ] レビュー観点が短いチェックリストとして共有されている
- [ ] マージ方式(Squash 等)がチームで統一されている

---

## フェーズ 3 ― CI/CD による自動化(4〜6日。最重要・最も面白い)

「push したら自動でテスト → 問題なければビルド → main なら自動デプロイ」を組みます。

### 3-1. 学ぶ概念

- **パイプライン** = 一連の自動処理。**ステージ**(test → build → deploy)に分かれ、各ステージに **ジョブ** がある。
- **トリガー** = いつ走るか(push / PR・MR / タグ / 定期実行 / 手動)。
- **ランナー / runner** = ジョブを実行するマシン。クラウド提供 or 自前。
- **アーティファクト** = ジョブの成果物(ビルド済みファイル等)を次のステージや手元に渡す仕組み。
- **シークレット / 変数** = APIキー等。コードに書かず、プラットフォームの暗号化保管に入れる。
- **キャッシュ** = 依存パッケージを使い回して高速化(無料枠の分数節約に効く)。

### 3-2. 実習(GitHub Actions)

`.github/workflows/ci.yml` を作成:

```yaml
name: CI
on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'        # 依存をキャッシュして高速化
      - run: npm ci
      - run: npm test
```

手順:
1. 上記を push し、**Actions タブ** で実行ログを見る。
2. フェーズ2の「ステータスチェック必須」を有効化し、**テストが落ちる PR はマージできない** ことを確認(わざとバグ PR を作って体験)。
3. デプロイ段を足す。例として GitHub Pages へのデプロイ、または `if: github.ref == 'refs/heads/main'` を付けた deploy ジョブを追加し、**main へのマージ時だけ** 走るようにする。
4. **Secrets**(Settings → Secrets and variables → Actions)に値を1つ登録し、`${{ secrets.MY_TOKEN }}` で参照する。
5. **定期実行**(`schedule:` の cron)や **手動実行**(`workflow_dispatch:`)も試す。

### 3-3. 実習(GitLab CI/CD)

リポジトリ直下に `.gitlab-ci.yml` を作成:

```yaml
stages:
  - test
  - build
  - deploy

variables:
  npm_config_cache: "$CI_PROJECT_DIR/.npm"

cache:
  paths:
    - .npm/

test:
  stage: test
  image: node:20
  script:
    - npm ci
    - npm test

build:
  stage: build
  image: node:20
  script:
    - npm run build
  artifacts:
    paths:
      - dist/
    expire_in: 1 week

deploy:
  stage: deploy
  image: node:20
  script:
    - echo "ここに実デプロイコマンド"
  rules:
    - if: '$CI_COMMIT_BRANCH == "main"'   # main のときだけデプロイ
```

手順:
1. push して **Build → Pipelines** で実行を確認。
2. ジョブ間で `artifacts` が `dist/` を受け渡すことを確認。
3. **Settings → CI/CD → Variables** にシークレットを登録(**Masked** と **Protected** にチェック)。
4. `rules:` でブランチ条件を変え、`when: manual` で手動承認デプロイ(=簡易な本番リリースゲート)を作る。
5. **無料枠の節約**: 400分制限があるので、`rules:` で不要なジョブをスキップ、`cache:` を活用、重いジョブは頻度を下げる。どうしても足りなければ自前 Runner を登録すると分数を消費しない。

### 3-4. GitHub Actions と GitLab CI/CD の対応

| 概念 | GitHub Actions | GitLab CI/CD |
|---|---|---|
| 定義ファイル | `.github/workflows/*.yml` | `.gitlab-ci.yml` |
| トリガー | `on:` | `rules:` / `only/except`(旧) |
| 実行単位 | `jobs:` の各 job | `stages:` × 各 job |
| ステップ | `steps:` | `script:` |
| 成果物 | `actions/upload-artifact` | `artifacts:` |
| 再利用部品 | Marketplace の Action(`uses:`) | `include:` / テンプレート |
| 環境変数・秘密 | Secrets / Variables | CI/CD Variables |
| 手動実行 | `workflow_dispatch` | `when: manual` |

### 3-5. リーダー視点のチェックリスト

- [ ] 「テストが緑にならないとマージできない」状態になっている
- [ ] main へのマージ=自動でデプロイ(または手動承認デプロイ)になっている
- [ ] シークレットはコードに書かれず、暗号化保管にある
- [ ] パイプラインの所要時間とコスト(分数)を把握している

---

## フェーズ 4 ― リーダーとして「運用」を設計する(2〜3日)

機能を覚えたら、**チームの約束事(プロセス)** に落とし込みます。これがリーダーの本番。

### 4-1. 5人チームの推奨ベースライン

- **ブランチ戦略**: GitHub Flow(main + 短命 feature + PR/MR)。リリースが厳格ならタグ運用を追加。
- **品質ゲート**: main 保護 + レビュー承認1件 + CI 必須 + コメント全解決。
- **作業の入口**: すべての作業は Issue から始める。Issue 番号を PR/MR に紐づける。
- **計画単位**: 1〜2週間のマイルストーン(スプリント)。ボードで毎朝5分の確認。
- **見える化**: Board 1枚 + Milestone 進捗 + CI のステータスバッジを README に貼る。

### 4-2. ドキュメントとして残すもの(リポジトリに置く)

- `README.md` … プロジェクト概要・セットアップ手順・CI バッジ
- `CONTRIBUTING.md` … ブランチ規則・コミットメッセージ規約・レビュー手順
- Issue / PR(MR)テンプレート
- `CODEOWNERS`(GitHub)/ 承認設計(GitLab)
- ラベル命名規則(Wiki でも可)

### 4-3. 自動化のアイデア(慣れたら追加)

- PR/MR に自動でラベル付け・レビュアー割り当て
- 依存パッケージの自動更新(GitHub: Dependabot)
- Issue を閉じたら関連通知、定期的な棚卸しレポート
- リリースノートの自動生成(タグから)

### 4-4. リーダーとしての最終チェックリスト

- [ ] 新メンバーが README と CONTRIBUTING を読めば1日で参加できる
- [ ] 「誰が・何を・いつまでに」がボードとマイルストーンで一目で分かる
- [ ] 人間のレビュー前に機械(CI)が形式・テストを検査している
- [ ] main は常にデプロイ可能な状態に保たれている
- [ ] プロセスが属人化せず、文書化されている

---

## 推奨スケジュール(目安・約2〜3週間)

| 週 | 内容 |
|---|---|
| 1週目 前半 | フェーズ0(セットアップ)+ フェーズ1(Issue/ボード) |
| 1週目 後半 | フェーズ2(PR/MR・レビュー・保護ブランチ) |
| 2週目 | フェーズ3(CI/CD)を GitHub→GitLab の順でじっくり |
| 3週目 | フェーズ4(運用設計)+ 実際の小さな案件で通し練習 |

---

## つまずきやすいポイント

- **GitLab の CI 400分問題**: 練習中にすぐ枯渇する。`cache:` 活用 / 不要ジョブの `rules:` スキップ / 自前 Runner で回避。
- **GitHub は public で練習**: private だと Actions 分数を消費する。学習用は public 推奨。
- **保護ブランチを早めに有効化**: 「設定だけして体験しない」と身につかない。わざと落ちる PR を作って弾かれる体験をする。
- **用語の混同**: PR↔MR、Actions↔CI/CD。対応表を常に参照。
- **GitLab の上位計画機能は有料**: エピック/ロードマップ/詳細な承認ルールは Premium。無料枠での代替設計(マイルストーン+スコープ付きラベル+パイプライン必須)を覚えておく。

---

## 次の一歩

このロードマップの **フェーズ0〜1** から始めて、最初の Board と Issue を作るところまでやってみてください。各フェーズで具体的なコマンドや YAML の書き方で詰まったら、その箇所を聞いてもらえれば一緒に手を動かせます。
