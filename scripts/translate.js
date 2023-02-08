const fs = require('fs');
const path = require('path');
const glob = require('glob');
const logger = require('./logger');

const TEMPLATE_PATH = 'config/templates/redirectTemplate.md';
const TRANSLATED_DOCS_PATH = 'i18n/en/docusaurus-plugin-content-docs/current/';
const DOCS_ORIGIN_PATH = 'docs/';

const EXTENSIONS = ['md', 'mdx'];
const REG_EXP_EXTENSIONS = `.{${EXTENSIONS.join(',')}}`;

const compose =
  (...fns) =>
  (x) =>
    fns.reduceRight((y, f) => f(y), x);

const parseFilePath = (filePath) => {
  try {
    return path.parse(filePath);
  } catch (err) {
    return {};
  }
};

const createNewDir = (filePath) => {
  const { dir } = parseFilePath(filePath);

  fs.mkdirSync(dir, { recursive: true });
};

const copyFileToPath = (src, dest) => {
  try {
    createNewDir(dest);
    fs.copyFileSync(src, dest, fs.constants.COPYFILE_EXCL);

    logger({
      success: 'add translation:',
      primary: dest,
    });
  } catch (err) {
    if (err.code !== 'EEXIST') {
      console.error(err);
    }
  }
};

const deleteUnusedTranslation = (filePath) => {
  try {
    fs.unlinkSync(filePath);

    logger({
      success: 'delete unused translation:',
      primary: filePath,
    });
  } catch (err) {
    console.error(err);
  }
};

const getFilesByFolder = (originFolder) => {
  const targetPath = `${originFolder}**/*${REG_EXP_EXTENSIONS}`;

  return glob.sync(targetPath);
};

const getTranslationFile = (originPath) => {
  const targetPath = getDestinationPath(originPath.replace(/\.\w*/, REG_EXP_EXTENSIONS));

  return glob.sync(targetPath)[0];
};

const getDestinationPath = (sourcePath) =>
  sourcePath.replace(DOCS_ORIGIN_PATH, TRANSLATED_DOCS_PATH);

const removeUnusedTranslations = (files) => {
  files.forEach(({ enExt, ruExt, enFilePath }) => {
    if (enExt !== ruExt && enFilePath) {
      deleteUnusedTranslation(enFilePath);
    }
  });
};

const makeTranslations = (files) => {
  files.forEach(({ enExt, ruExt, enFilePath, filePath }) => {
    if (enExt === ruExt) {
      return;
    }

    const fileSrc = !enExt ? TEMPLATE_PATH : enFilePath;

    copyFileToPath(fileSrc, getDestinationPath(filePath));
  });

  return files;
};

const getArticlesFiles = (originFiles) =>
  originFiles.map((filePath) => {
    const translatedFile = getTranslationFile(filePath);

    return {
      filePath,
      ruExt: parseFilePath(filePath).ext,
      enFilePath: translatedFile,
      enExt: parseFilePath(translatedFile).ext,
    };
  });

const translate = compose(
  removeUnusedTranslations,
  makeTranslations,
  getArticlesFiles,
  getFilesByFolder.bind(this, DOCS_ORIGIN_PATH)
);

translate();
