[![Netlify Status](https://api.netlify.com/api/v1/badges/5d9b784f-1275-4258-9d5d-48d411a3b243/deploy-status)](https://app.netlify.com/sites/sendsay-docs/deploys)

# How to translate a new article

There is a couple of pathes for each translated file:
| Name  	|  Pattern 	| Usage |
|---	|---	|--- |
|  Hidden url	|   `/exclude-from-search`/folder-path/`en-`file-name	| docs/ |
|  Actual shorten url	|   /folder-path/file-name	| i18n/ |
|  Actual full url	|   `/en`/folder-path/file-name	| config/|
|  Sidebar file id	|   `en`/shorten-folder-path/`en-`file-name	| sidebars.js |

<br>

### Notice:
  Despite of the fact that we omit excessive folders for en locale in sidebar, we must keep the path full:


| Name  	|  Pattern 	| Usage |
|---	|---	|--- |
|  url 	|   /en/other-channels`/sms`/how-to-connect-url	|  |
|  folder-path 	|  other-channels`/sms`/how-to-connect-sms	| ru sidebar <br> docs/ <br> i18n/|
|  shorten-folder-path 	|   other-channels/how-to-connect-sms	| en sidebar <br> docs/en/ <br> i18n/**/en/ |

<br>

## Steps:

1) Prepare markdown file with correct translation
2) Place the file in `docs/en/` *(in corresponding folder)* and create correct header:
```
---
  id: en-file-name
  slug: /exclude-from-search/folder-path/en-file-name
---
```
3) Duplicate the file to `i18n/en/docusaurus-plugin-content-docs/current/en` and create correct header:
```
---
  id: en-file-name
  slug: /folder-path/file-name      (without en prefix here)
---
```
4) Change corresponding file from `i18n/en/docusaurus-plugin-content-docs/current/` that follows 'ru' locale folder structure
```.html
---
(delete) hide_title: true
(paste) slug: /exclude-from-search/file-name
---
```
5) Add correct url of the file to `config/translatedLinks.json`
```
[
  ...
  "/en/folder-path/file-name"
]
```
6) Add the file into `sidebars.js` to display in sidebar

This [doc](https://docusaurus.io/docs/sidebar/items#category-shorthand) might help
```
'docs-en': [
  ...
  {
    'Sidebar folder name': [
      'en/shorten-folder-path/en-file-name'  (no leading slash)
    ],
  },
]
```

<br>

# Website

This website is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.

### Installation

```
$ yarn
```

### Local Development

```
$ yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```
$ yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

Using SSH:

```
$ USE_SSH=true yarn deploy
```

Not using SSH:

```
$ GIT_USER=<Your GitHub username> yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.
