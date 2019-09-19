# Node.js PDF Printer

[![npm version](https://img.shields.io/npm/v/node-pdf-printer.svg?style=flat-square)](https://www.npmjs.org/package/node-pdf-printer)
[![npm](https://img.shields.io/npm/dt/node-pdf-printer.svg?style=flat-square)](http://npm-stat.com/charts.html?package=node-pdf-printer)
[![license](https://img.shields.io/github/license/yi-ge/node-pdf-printer.svg?style=flat-square)](https://github.com/yi-ge/node-pdf-printer/blob/master/LICENSE)
[![GitHub last commit](https://img.shields.io/github/last-commit/yi-ge/node-pdf-printer.svg?style=flat-square)](https://github.com/yi-ge/node-pdf-printer)

[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)

Print PDF files in Windows OS by node.js. (supports Node, Electron. Only node.js without c++)

If you use it in electron, check out: https://github.com/sindresorhus/electron-util#fixpathforasarunpackpath

## Usage

```
npm i node-pdf-printer
```

```javascript
import NodePdfPrinter from 'node-pdf-printer'
import path from 'path'

NodePdfPrinter.listPrinter('en-US') // Returns a promise with the array of printer names, this isn't a mandatory step

const array = [
  'C:\\abc\\a.pdf',
  path.resolve('./<your project folder>/some-pdf.pdf')
]

NodePdfPrinter.printFiles(array) // Printer files to the default Windows printer.

NodePdfPrinter.printFiles(array, printerName) // Printer files to the specific printer by the printer name.
```

## Duplex printing

> PDF-XChange Viewer cannot save a duplex-printing option as the default. To print in duplex mode, modify the settings of your Windows printer (in the Windows Control Panel or Settings app) to enable duplex printing, or create a duplicate copy of your Windows printer, set it to print in duplex by default, and specify that printer when running PDFtoPrinter.exe. Search the web if you don't know how to create a duplicate copy of your Windows printer or if you don't know how to specify duplex printing in your Windows printer properties.

More: http://www.columbia.edu/~em36/pdftoprinter.html

## Reference

Thanks [krdheeraj51](https://github.com/krdheeraj51) and [qwqVictor](https://github.com/qwqVictor), [Columbia University](https://www.columbia.edu/).

- https://github.com/krdheeraj51/node-printer
- https://www.sumatrapdfreader.org/docs/Command-line-arguments.html
- https://github.com/qwqVictor/PDFPrinter-WinPHP
- http://www.columbia.edu/~em36/pdftoprinter.html

## Legal Infomations

- [PDFtoPrinter.exe](http://www.columbia.edu/~em36/pdftoprinter.html)'s all right reserved by Edward Mendelson in Columbia University.
