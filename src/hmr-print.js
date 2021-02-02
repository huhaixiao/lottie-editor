window.c = window.c || 1

export default function printMe() {
  console.log('I get called from print.js!');
  console.log('Updating print.js...');
  console.log(window.c++)
}

console.log('?....')