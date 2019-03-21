# Node.js PDF Printer
Print PDF files in Windows OS by node.js.

(Only node.js without c++).

## Usage
```
npm i node-pdf-printer
```

```javascript
const NodePdfPrinter = require('node-pdf-printer')

NodePdfPrinter.listPrinter() // List all printer name.

const array = ['C:\\abc\\a.pdf', 'D:\\abd\\b.pdf']

NodePdfPrinter.printFiles(array) // Printer files to the default Windows printer.

NodePdfPrinter.printFiles(array, printerName) // Printer files to the specific printer by the printer name.
```

## Reference

Thanks [krdheeraj51](https://github.com/krdheeraj51) and [qwqVictor](https://github.com/qwqVictor), [Columbia University](https://www.columbia.edu/).

- https://github.com/krdheeraj51/node-printer
- https://www.sumatrapdfreader.org/docs/Command-line-arguments.html
- https://github.com/qwqVictor/PDFPrinter-WinPHP
- http://www.columbia.edu/~em36/pdftoprinter.html

## Legal Infomations
- [PDFtoPrinter.exe](http://www.columbia.edu/~em36/pdftoprinter.html)'s all right reserved by Edward Mendelson in Columbia University.
