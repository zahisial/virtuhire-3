const chokidar = require('chokidar')
const fs = require('fs')
const path = require('path')

const EN_PATH = path.resolve('./src/locales/en.json')
const AR_PATH = path.resolve('./src/locales/ar.json')
const COMPONENTS_GLOB = './src/**/*.{tsx,ts,jsx,js}'

function loadJSON(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'))
}

function saveJSON(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf-8')
}

// Set a nested key like "hero.title" into an object
function setNestedKey(obj, keyPath, value) {
  const keys = keyPath.split('.')
  let current = obj
  for (let i = 0; i < keys.length - 1; i++) {
    if (!current[keys[i]] || typeof current[keys[i]] !== 'object') {
      current[keys[i]] = {}
    }
    current = current[keys[i]]
  }
  const lastKey = keys[keys.length - 1]
  if (current[lastKey] === undefined) {
    current[lastKey] = value
    return true // was added
  }
  return false // already exists
}

// Extract all t('...') and t("...") calls from file content
function extractKeys(content) {
  const regex = /\bt\(\s*['"`]([^'"`]+)['"`]\s*\)/g
  const keys = []
  let match
  while ((match = regex.exec(content)) !== null) {
    keys.push(match[1])
  }
  return keys
}

function processFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8')
  const keys = extractKeys(content)
  if (keys.length === 0) return

  const en = loadJSON(EN_PATH)
  const ar = loadJSON(AR_PATH)

  let enUpdated = false
  let arUpdated = false

  keys.forEach(key => {
    const added = setNestedKey(en, key, `TODO: ${key}`)
    if (added) {
      enUpdated = true
      console.log(`✅ Added to en.json: ${key}`)
    }
    const addedAr = setNestedKey(ar, key, `TODO_AR: ${key}`)
    if (addedAr) {
      arUpdated = true
      console.log(`✅ Added to ar.json: ${key}`)
    }
  })

  if (enUpdated) saveJSON(EN_PATH, en)
  if (arUpdated) saveJSON(AR_PATH, ar)
}

// Watch all component files
const watcher = chokidar.watch(COMPONENTS_GLOB, {
  ignored: /node_modules/,
  persistent: true,
  ignoreInitial: false,
})

console.log('👀 Watching components for new translation keys...\n')

watcher
  .on('add', processFile)
  .on('change', processFile)