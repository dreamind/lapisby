## Table

From https://tree.taiga.io/support/misc/taiga-markdown-syntax/#inline

| Header 1 | Header 2                                                                                                                                                                                                           |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Cell 1.1 | Cell 1.2                                                                                                                                                                                                           |
| Cell 2.1 | Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. |

:::{.flat}
| Header 1 | Header 2 |
| -------- | -------- |
| Cell 1.1 | Cell 1.2 |
| Cell 2.1 | Cell 2.2 |
| Cell 3.1 | Cell 3.2 |
:::

An example with inline Markdown.

| Header 1   | Header 2          |
| ---------- | ----------------- |
| _Cell 1.1_ | http://cell12.com |
| Cell 2.1   | ~~Cell 2.2~~      |

| First Header | Second Header |
| ------------ | ------------- |
| Content Cell | Content Cell  |
| Content Cell | Content Cell  |

| Command                                                                                                | Description                                    |
| ------------------------------------------------------------------------------------------------------ | ---------------------------------------------- |
| $$ \displaystyle \int_{0}^{\infty} \frac{1}{x} $$                                                      | List all new or modified files                 |
| ![Armenian Mountain](./images/fermat-point-obtuse.svg 'Monastery'){#mountain .mountain-image prop=val} | Show file differences that haven't been staged |

| Command      | Description                                        |
| ------------ | -------------------------------------------------- |
| `git status` | List all _new or modified_ files                   |
| `git diff`   | Show file differences that **haven't been** staged |

| Left-aligned | Center-aligned | Right-aligned |
| :----------- | :------------: | ------------: |
| git status   |   git status   |    git status |
| git diff     |    git diff    |      git diff |

| Name     | Character |
| -------- | --------- |
| Backtick | `         |
| Pipe     | \|        |