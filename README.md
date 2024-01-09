[![Netlify Status](https://api.netlify.com/api/v1/badges/5d9b784f-1275-4258-9d5d-48d411a3b243/deploy-status)](https://app.netlify.com/sites/sendsay-docs/deploys)

# Links

[List of changes in swizzled components](https://sendsay.fibery.io/%D0%A0%D0%B0%D0%B7%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0_app/Dev-Swizzled-components-630)

<br>

# Working with articles

### Adding a month update page

1. add a new file with `.mdx` extension to the `/docs/updates/list`, `sidebar_position` should be in NEGATIVE REVERSE order (where `-1` is `January` and `-12` is `December`)

2. change import in the root file `docs/updates/index.mdx` to a new article

```
import ChangeLog from './updates-may-2023.mdx';`
```

3. (optional) create previous year folder and move pages from past year -> add `_category_.json` file with position in REVERSE order (where `"position": 1000` is for `2023`)

```
{
   "label": "2023",
   "position": 999
}
```

<br>

# How to restrict access to an _article_ or _category_:

1. add `restrictedAccessHref` custom prop in `_category_.json` or article header<br>
   _value should be uniq across all docs_
2. add full route to `config/restrictedAccessRoutes.json` <br>
   _to exclude it from search_
3. add lines into `static/robots.txt`

```
User-agent: *
Disallow: /automations/automations-by-event/welcome-series/
```

<br>

# How to translate a new article

There is a couple of pathes for each translated file:
| Name | Pattern | Usage |
|--- |--- |--- |
| Actual shorten url | /folder-path/file-name | i18n/ |
| Actual full url | `/en`/folder-path/file-name | config/|
| Sidebar file id | `en`/shorten-folder-path/`en-`file-name | sidebars.js |

<br>

### Notice:

Despite of the fact that we omit excessive folders for en locale in sidebar, we must keep the path full:

| Name                | Pattern                                     | Usage                                       |
| ------------------- | ------------------------------------------- | ------------------------------------------- |
| url                 | /en/other-channels`/sms`/how-to-connect-url |                                             |
| folder-path         | other-channels`/sms`/how-to-connect-sms     | ru sidebar <br> docs/ <br> i18n/            |
| shorten-folder-path | other-channels/how-to-connect-sms           | en sidebar <br> docs/en/ <br> i18n/\*\*/en/ |

<br>

## Steps:

1. Prepare markdown file with correct translation

2. Place the file to `i18n/en/docusaurus-plugin-content-docs/current/en` and create correct header:

```
---
  id: en-file-name
  slug: /folder-path/file-name      (without en prefix here)
---
```

3. Create empty file with same name in `docs/en/` _(in corresponding to sidebar folder)_ and create correct header:

```
---
  id: en-file-name
  draft: true
---
```

4. Change corresponding file from `i18n/en/docusaurus-plugin-content-docs/current/` that follows 'ru' locale folder structure

```.html
---
(delete) hide_title: true
(paste) draft: true
---
```

5. Add correct url of the file to `config/translatedLinks.json`

```
[
  ...
  "/en/folder-path/file-name"
]
```

6. Add the file into `sidebars.js` to display in sidebar

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
