## 一、安装步骤

---

1.下载demo

2.运行npm install

3.运行`npm run dev` or `lean up`

4.浏览器打开 http://localhost:3000

## 二、pre-commit hooks

### 1 eslint and stylelint

#### 1.1 目的

规范代码风格，避免低级错误

#### 1.2 具体步骤

在`git commit`之前会`eslint`和`stylelint`本次提交的`jsx`,`js`和`less`文件，
如果`eslint`和`stylelint`没有通过，那么本次`commit`也会失败，需要修改`eslint`和`stylelint`的错误后才能继续提交。

#### 1.3 补充

`eslint`对应的rules存放在`.eslintrc`文件里，`stylelint`对应的rules存放在`.stylelintrc`文件里，如果觉得有某些`eslint`和`stylelint`的rules不合理，可以提出来，经讨论后可以添加到对应的规则文件中。

#### 1.4 资源

eslint的规则对应项目：

* https://github.com/airbnb/javascript
* https://github.com/yannickcr/eslint-plugin-react
* https://github.com/evcohen/eslint-plugin-jsx-a11y

stylelint的规则对应项目：

* https://github.com/stylelint/stylelint

### 2 validate-commit-msg

#### 2.1 目的

用于检查Node项目的Commit message是否符合格式，格式化的Commit message。

#### 2.2 好处

1> 提供更多的历史信息，方便快速浏览。

``` sh
git log <last tag> HEAD --pretty=format:%s
```

2> 可以过滤某些commit（比如文档改动），便于快速查找信息。

``` sh
git log <last release> HEAD --grep feature
```

3> 可以直接从commit生成Change log。

#### 2.3 格式

每次提交，Commit message 都包括三个部分：Header，Body 和 Footer。

``` sh
<type>(<scope>): <subject>
// 空一行
<body>
// 空一行
<footer>
```

其中，Header 是必需的，Body 和 Footer 可以省略。
不管是哪一个部分，任何一行都不得超过72个字符（或100个字符）。这是为了避免自动换行影响美观。

本项目规定只输入Header即可。

##### 2.4 Header

Header部分只有一行，包括三个字段：type（必需）、scope（可选）和subject（必需）。

* type
  type用于说明 commit 的类别，只允许使用下面7个标识。

  ``` sh
  feat：新功能（feature）
  fix：修补bug
  docs：文档（documentation）
  style： 格式（不影响代码运行的变动）
  refactor：重构（即不是新增功能，也不是修改bug的代码变动）
  test：增加测试
  chore：构建过程或辅助工具的变动
  ```

  如果type为feat和fix，则该 commit 将肯定出现在 Change log 之中。其他情况（docs、chore、style、refactor、test）由你决定，要不要放入 Change log，建议是不要。

* scope
  scope用于说明 commit 影响的范围，比如数据层、控制层、视图层等等，视项目不同而不同。

* subject
  subject是 commit 目的的简短描述，不超过50个字符。

  ``` sh
  以动词开头，使用第一人称现在时，比如change，而不是changed或changes
  第一个字母小写
  结尾不加句号（.）
  ```

##### 2.5 Body

Body 部分是对本次 commit 的详细描述，可以分成多行。下面是一个范例。

``` sh
More detailed explanatory text, if necessary.  Wrap it to
about 72 characters or so.

Further paragraphs come after blank lines.

- Bullet points are okay, too
- Use a hanging indent
```

有两个注意点。

* 使用第一人称现在时，比如使用change而不是changed或changes。
* 应该说明代码变动的动机，以及与以前行为的对比。

##### 2.6 Footer

Footer 部分只用于两种情况。

* 不兼容变动
  如果当前代码与上一个版本不兼容，则 Footer 部分以BREAKING CHANGE开头，后面是对变动的描述、以及变动理由和迁移方法。

  ``` sh
  BREAKING CHANGE: isolate scope bindings definition has changed.

      To migrate the code follow the example below:

      Before:

      scope: {
        myAttr: 'attribute',
      }

      After:

      scope: {
        myAttr: '@',
      }

      The removed `inject` wasn't generaly useful for directives so there should be no code using it.
  ```

* 关闭 Issue
  如果当前commit针对某个issue，那么可以在Footer部分关闭这个issue。

  ``` sh
  Closes #234
  ```

  也可以一次关闭多个issue。

  ``` sh
  Closes #123, #245, #992
  ```

##### 2.7 Revert

还有一种特殊情况，如果当前 commit 用于撤销以前的 commit，则必须以revert:开头，后面跟着被撤销 Commit 的 Header。

``` sh
revert: feat(pencil): add 'graphiteWidth' option

This reverts commit 667ecc1654a317a13331b17617d973392f415f02.
```

Body部分的格式是固定的，必须写成This reverts commit &lt;hash>.，其中的hash是被撤销 commit 的 SHA 标识符。
如果当前 commit 与被撤销的 commit，在同一个发布（release）里面，那么它们都不会出现在 Change log 里面。如果两者在不同的发布，那么当前 commit，会出现在 Change log 的Reverts小标题下面。

#### 3 单独使用步骤

* 首先，拷贝下面这个JS文件，放入你的代码库。文件名可以取为validate-commit-msg.js。

* 把这个脚本加入 Git 的 hook。下面是在package.json里面使用 ghooks，把这个脚本加为commit-msg时运行。
  ``` sh
  "config": {
      "ghooks": {
        "commit-msg": "./validate-commit-msg.js"
      }
    }
  ```

* 次git commit的时候，这个脚本就会自动检查 Commit message 是否合格。如果不合格，就会报错。
  ``` sh
  git add -A
  git commit -m "edit markdown"
  INVALID COMMIT MSG: does not match "<type>(<scope>): <subject>" ! was: edit markdown
  ```

#### 4 配合husky使用步骤

* 安装husky
  ``` sh
  npm install --save-dev husky
  ```

* 在根目录下添加validate-commit-msg的配置文件
  ``` .vcmrc
  {
    "types": ["feat", "fix", "docs", "style", "refactor", "perf", "test", "build", "ci", "chore", "revert"],
    "scope": {
      "required": false,
      "allowed": ["*"],
      "validate": false,
      "multiple": false
    },
    "warnOnFail": false,
    "maxSubjectLength": 100,
    "subjectPattern": ".+",
    "subjectPatternErrorMsg": "subject does not match subject pattern!",
    "helpMessage": "",
    "autoFix": false
  }
  ```

* 在package.json里面增加验证commit的npm script
  ``` package.json
  "scripts": {
      "commitmsg": "validate-commit-msg"
    }
  ```
