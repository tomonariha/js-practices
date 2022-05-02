const fs = require('fs')
const readline = require('readline')
const Enquirer = require('enquirer')

class FileAccessor {
  static load () {
    const files = fs.readFileSync('file.json', 'utf8')
    return JSON.parse(files)
  }

  static save (memos) {
    const files = JSON.stringify(memos)
    fs.writeFileSync('file.json', files)
  }
}

class Memos {
  constructor (memos) {
    this.memos = memos
  }

  index () {
    for (const memo of this.memos) {
      console.log(memo.title)
    }
    process.exit()
  }

  create () {
    const readInterface = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })
    process.stdin.resume()
    process.stdin.setEncoding('utf8')
    const lines = []
    readInterface.on('line', (line) => {
      lines.push(line)
    })
    readInterface.on('close', () => {
      readInterface.close()
      const newMemo = { title: lines[0], body: lines }
      if (this.memos.some(memo => memo.title === newMemo.title)) {
        console.log(`Title:'${lines[0]}' is already exists`)
        process.exit()
      } else {
        this.memos.push(newMemo)
        FileAccessor.save(this.memos)
        console.log(`Title:'${newMemo.title}' was created`)
      }
    })
  }

  #chooseTitle (action) {
    if (this.memos.length === 0) {
      console.log('Have no memos')
      process.exit()
    }
    const titles = []
    for (const memo of this.memos) {
      titles.push(memo.title)
    }
    const question = {
      type: 'select',
      name: 'title',
      message: `Choose a note you want to ${action}:`,
      choices: titles
    }
    return Enquirer.prompt(question)
  }

  async show () {
    const action = 'see'
    const answer = await this.#chooseTitle(action)
    const chosenMemo = this.memos.filter(memo => memo.title === answer.title)
    const texts = chosenMemo[0].body
    for (const text of texts) {
      console.log(text)
    }
  }

  async destroy () {
    const action = 'delete'
    const answer = await this.#chooseTitle(action)
    const filteredMemos = this.memos.filter(memo => memo.title !== answer.title)
    FileAccessor.save(filteredMemos)
    console.log(`Title:'${answer.title}' was deleted`)
  }
}

const files = FileAccessor.load()
const memos = new Memos(files)
const args = process.argv
if (args.length > 3) {
  console.log('Options are too much. Specify only one option.')
  process.exit()
} else if (args.includes('-d')) {
  memos.destroy()
} else if (args.includes('-l')) {
  memos.index()
} else if (args.includes('-r')) {
  memos.show()
} else {
  memos.create()
}
