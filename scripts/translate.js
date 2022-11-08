const fs = require('fs')
const glob = require('glob')

const TEMPLATE_PATH = 'config/templates/redirectTemplate.md'
const TRANSLATED_DOCS_PATH = 'i18n/en/docusaurus-plugin-content-docs/current/'
const DOCS_ORIGIN_PATH = 'docs/'

const compose = (...fns) => x => fns.reduceRight((y, f) => f(y), x);

const copyTemplateToPath = (destinations) => {
  destinations.forEach((dest => {
    try {
      fs.copyFileSync(TEMPLATE_PATH, dest, fs.constants.COPYFILE_EXCL)

      console.log("\x1b[32m", `add translation:\x1b[0m ${dest}`)
    } catch (err) {
      if (err.code !== 'EEXIST') {
        console.error(err)
      }
    }
  }))
}

const getFilesToTranslate = (extensions) => extensions.reduce((files, ext) => {
  const newFiles = glob.sync(`${DOCS_ORIGIN_PATH}**/*.${ext}`)

  return [...files, ...newFiles]
}, [])

const getDestinationPath = (sourcePathes) =>
  sourcePathes.map((item) => item.replace(DOCS_ORIGIN_PATH, TRANSLATED_DOCS_PATH))

const translate = () => compose(
  copyTemplateToPath,
  getDestinationPath,
  getFilesToTranslate
)(['md', 'mdx'])

translate()
