const childProcess = require('child_process')
const iconv = require('iconv-lite')
const fs = require('fs')
const path = require('path')

module.exports = {
  printFiles(pdfFiles, printerName) {
    return new Promise((resolve, reject) => {
      const execPath = path.join(__dirname.replace('app.asar', 'app.asar.unpacked'))
      let createFile = '@echo off \n'
      createFile += 'cd ' + execPath + '\n'

      if (printerName) {
        printerName = ' "' + printerName + '"'
      } else {
        printerName = ''
      }

      for (var i = 0; i < pdfFiles.length; i++) {
        createFile += 'PDFtoPrinter.exe "' + pdfFiles[i] + '"' + printerName + '\n'
      }

      createFile += 'exit /b 0 \n'
      createFile += 'pause>nul \n'

      const batFileUrl = path.join(execPath, 'printTmp.bat')
      fs.writeFile(batFileUrl, createFile, function (err) {
        if (err) {
          reject(err)
        } else {
          childProcess.exec('"' + batFileUrl + '"', function (error, stdout) {
            if (error) {
              reject(error)
            } else {
              resolve(true)
            }
          })
        }
      })
    })
  },
  listPrinter(language = 'en-US') {
    return new Promise((resolve, reject) => {
      const langs = {
        'zh-CN': {
          encoding: 'cp936',
          printerNameLabel: '打印机名'
        },
        'en-US': {
          encoding: null,
          printerNameLabel: 'Printer name'
        },
      };
      childProcess.exec('%WINdir%\\System32\\cscript.exe %WINdir%\\System32\\printing_Admin_Scripts\\' + language + '\\prnmngr.vbs -l | find /i "' + langs[language].printerNameLabel + '"', {
        encoding: 'buffer'
      }, function (error, stdout) {
        if (error) {
          reject(error)
        } else {
          let arr;
          if (langs[language]) {
            if (langs[language].encoding !== null) {
              arr = iconv.decode(stdout, langs[language].encoding).toString('utf-8').split('\r\n')
            } else {
              arr = stdout.toString('utf-8').split('\r\n')
            }
          }
          stdout = arr.map(item => {
            return item.substr(langs[language].printerNameLabel.length + 1)
          })
          stdout.pop()
          resolve(stdout)
        }
      })
    })
  }
}