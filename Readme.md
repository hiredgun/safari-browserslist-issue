## Safari or UglifyJS issue

This repository allows to reproduce Safari bug which causes `SyntaxError: Unexpected identifier 'e'. Cannot declare a lexical variable twice: 'e'.` 

## Setup 

Clone this repo and then:
```bash
 npm i && npm run build && npx serve -s dist
```

In my case I had:
 - Mac v10.3.0
 - Safari 11.0.3 (13604.5.6) and 
 - Chrome Version 68.0.3440.106 (Official Build) (64-bit)
 - Node v10.3.0

After running above command open `http://localhost:5000` in Chrome and Safari. In Chrome you should see a form input but in Safari you should see a blank page and above console error.

## Possible solutions

At first I thought that this issue is similar to https://github.com/mishoo/UglifyJS2/issues/1753 and setting `safari10: true` will solve the issue but it didn't.

### Solution 1
 - remove destructuring from src/index.js:8

### Solution 2

 - Change the number of supported Safari versions in Browserslist config in package.json

    from:
 
    `last 2 safari major versions` 
 
    to: 
 
    `last 3 safari major versions` or `last 5 safari versions`