const fs = require('fs')
const readline = require('readline')
const Enquirer = require('enquirer')
const args = process.argv
const readInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const loadMemos = () => {
  const memos = fs.readFileSync('file.json', 'utf8')
  return JSON.parse(memos)
}

const create = () => {
  process.stdin.resume()
  process.stdin.setEncoding('utf8')
  const texts = loadMemos()
  const lines = []
  readInterface.on('line', (line) => {
    lines.push(line)
  })
  readInterface.on('close', () => {
    readInterface.close()
    const memo = {'title': lines[0],'body': lines}
    if (texts.some(text => text.title === memo.title)) {
      console.log('Title:\'' + lines[0] + '\' is already exists')
      process.exit()
    } else {
      texts.push(memo)
    }
    const txt = JSON.stringify(texts)
    fs.writeFileSync('file.json', txt)
    process.exit()
  })
}

const index = () => {
  const texts = loadMemos()
  for (const text of texts) {
    console.log(text.title)
  }
  process.exit()
}

const show = () => {
  const memos = loadMemos()
  const text = []
  for (const memo of memos) {
    text.push(memo.title)
  }
  (async () => {
    const question = {
      type: 'select',
      name: 'title',
      message: 'Choose a note you want to see:',
      choices: text
    }
    const answer = await Enquirer.prompt(question)
    const filtered = memos.filter(memo => memo.title === `${answer.title}`)
    const memoAll = filtered[0].body
    for (const memo of memoAll) {
      console.log(memo)
    }
  })()
}

const destroy = () => {
  const memos = loadMemos()
  const text = []
  for (const memo of memos) {
    text.push(memo.title)
  }
  (async () => {
    const question = {
      type: 'select',
      name: 'memo',
      message: 'Choose a note you want to delete:',
      choices: text
    }
    const answer = await Enquirer.prompt(question)
    const filteredMemos = memos.filter(memo => memo.title !== `${answer.memo}`)
    const txt = JSON.stringify(filteredMemos)
    fs.writeFileSync('file.json', txt)
  })()
}
if (args.length > 3) {
  console.log('Options are too much. Specify only one option.')
  process.exit()
} else if (args.includes('-d')) {
  destroy()
} else if (args.includes('-l')) {
  index()
} else if (args.includes('-r')) {
  show()
} else {
  create()
}
