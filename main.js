/*
Copyright 2022 Julian Tonti-Filippini

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
if (require.main !== module) process.exit(0);
const {resolve} = require('path');
const {readFileSync} = require('fs');
const code = process.argv[2]?.trim() ?? 'console.log';
if (code == '--help' || code == '-h') console.log(readFileSync(resolve(__dirname,'README.md')).toString());
else try {
  let count = 0; const transformer = code.match(/\.js$/) ? require(resolve(code)) : new Function(`return ${code}`)(); 
  require('readline').createInterface({ input: process.stdin }).on('line', line => process.stdout.write(`${transformer(line,count++) ?? ''}`));
} catch(e) { console.error(`\n${e}\n\n${code}\n`); }
