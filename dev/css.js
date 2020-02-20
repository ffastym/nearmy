/**
 * @author Yuriy Matviyuk
 *
 * This file used for generation of all styles imports into
 * ../src/styles/ChatView.scss file which will be processed by postCss
 * and will create app main styles file ../src/styles/ChatView.scss
 *
 * Run build:css script when any new style will be created for adding to imports
 */
const fs = require('fs')
const path = require('path')

const COMPONENTS_DIR_NAME = 'components'
const IMPORTED_STYLES_DIR_NAME = 'scss'
const MAIN_STYLES_DIR_NAME = 'styles'
const MIXINS_DIR_NAME = 'mixins'
const SOURCE_DIR_NAME = 'src'
const STYLES_FILE_NAME = 'ChatView.scss'
const THEMES_DIR_NAME = 'themes'
const VARIABLES_DIR_NAME = 'variables'

const mainStylesFilePath = path.resolve(
  __dirname,
  '..',
  SOURCE_DIR_NAME,
  MAIN_STYLES_DIR_NAME,
  STYLES_FILE_NAME
)

let mainStylesFileContent = ''

/**
 * Get path to the component styles directory
 *
 * @param componentName
 * @returns {string}
 */
function getPathToComponentStyleIndex (componentName) { // Component name equals to component dir name
  return path.resolve(
    __dirname,
    '..',
    SOURCE_DIR_NAME,
    COMPONENTS_DIR_NAME,
    `${componentName}/${IMPORTED_STYLES_DIR_NAME}/${STYLES_FILE_NAME}`
  )
}

/**
 * Get full import path to component's styles index file
 *
 * @param componentName
 * @returns {string}
 */
function getComponentStylesImportPath (componentName) {
  return `../${COMPONENTS_DIR_NAME}/${componentName}/${IMPORTED_STYLES_DIR_NAME}/${STYLES_FILE_NAME}`
}

/**
 * Try to create an empty main styles file
 */
function createMainStylesFile (mainStylesFilePath) {
  try {
    fs.writeFileSync(mainStylesFilePath, '', 'utf-8')
    console.log(`New empty file {${mainStylesFilePath}} created`)
  } catch (err) {
    console.error(err)
  }
}

/**
 * Prepare main styles file before style imports
 */
function prepareMainStylesFile () {
  try {
    fs.writeFileSync(mainStylesFilePath, mainStylesFileContent)
  } catch (err) {
    console.warn(`Can't find main styles index {${mainStylesFilePath}} file`)

    // Try to create new empty file
    createMainStylesFile(mainStylesFilePath)
  }
}

/**
 * Append component styles file import in main styles file
 *
 * @param importPath
 */
function appendImport (importPath) {
  mainStylesFileContent += `@import "${importPath}";\n`
  console.log(`Created styles import {${importPath}}`)
}

/**
 * Write all imports to main styles file
 */
function writeMainStylesFile () {
  fs.writeFile(mainStylesFilePath, mainStylesFileContent, 'utf-8', err => {
    if (err) {
      throw err
    }

    console.log('Imports was build successfully')
  })
}

/**
 * Add variables imports to main styles file
 */
function appendVariablesImports () {
  try {
    const variables = fs.readdirSync(
      path.resolve(
        __dirname,
        '..',
        SOURCE_DIR_NAME,
        MAIN_STYLES_DIR_NAME,
        IMPORTED_STYLES_DIR_NAME,
        VARIABLES_DIR_NAME
      )
    )

    if (!variables.length) {
      return
    }

    mainStylesFileContent += '// Variables\n'

    variables.forEach(variable => {
      appendImport(`${IMPORTED_STYLES_DIR_NAME}/${VARIABLES_DIR_NAME}/${variable}`)
    })
  } catch (err) {
    console.error('Can\'t import variables')
  }
}

/**
 * Add mixins to the main styles dir
 */
function appendMixinsImports () {
  try {
    const mixins = fs.readdirSync(
      path.resolve(
        __dirname,
        '..',
        SOURCE_DIR_NAME,
        MAIN_STYLES_DIR_NAME,
        IMPORTED_STYLES_DIR_NAME,
        MIXINS_DIR_NAME
      )
    )

    if (!mixins.length) {
      return
    }

    mainStylesFileContent += '// Mixins\n'

    mixins.forEach(mixin => {
      appendImport(`${IMPORTED_STYLES_DIR_NAME}/${MIXINS_DIR_NAME}/${mixin}`)
    })
  } catch (err) {
    console.error('Can\'t import mixins')
  }
}

/**
 * Add react components styles imports
 */
function appendComponentsStyles () {
  try {
    const components = fs.readdirSync(
      path.resolve(
        __dirname,
        '..',
        SOURCE_DIR_NAME,
        COMPONENTS_DIR_NAME
      )
    )

    if (!components.length) {
      return
    }

    mainStylesFileContent += '// Components\n'

    components.forEach(componentName => {
      try {
        if (fs.existsSync(getPathToComponentStyleIndex(componentName))) {
          appendImport(getComponentStylesImportPath(componentName))
        }
      } catch (err) {
        throw err
      }
    })
  } catch (err) {
    throw err
  }
}

/**
 * Add themes styles to the main styles file
 */
function appendThemesStyles () {
  try {
    const themes = fs.readdirSync(
      path.resolve(
        __dirname,
        '..',
        SOURCE_DIR_NAME,
        MAIN_STYLES_DIR_NAME,
        IMPORTED_STYLES_DIR_NAME,
        THEMES_DIR_NAME
      )
    )

    if (!themes.length) {
      return
    }

    mainStylesFileContent += '// Themes\n'

    themes.forEach(theme => {
      appendImport(`${IMPORTED_STYLES_DIR_NAME}/${THEMES_DIR_NAME}/${theme}/${STYLES_FILE_NAME}`)
    })
  } catch (err) {
    console.error('Can\'t import themes')
  }
}

/**
 * Execute styles imports generation
 */
function exec () {
  prepareMainStylesFile()
  appendVariablesImports()
  appendMixinsImports()
  appendComponentsStyles()
  appendThemesStyles()
  writeMainStylesFile()
}

exec()
