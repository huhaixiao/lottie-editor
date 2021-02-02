import { saveAs } from 'file-saver';

export function save() {
  return saveText()
}

function saveText() {
  var blob = new Blob(['hello world'], {type: 'text/plain;charset=utf-8'})
  saveAs(blob, 'hello.txt')
}