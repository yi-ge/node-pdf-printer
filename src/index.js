const childProcess = require('child_process')
const iconv = require('iconv-lite')
const fs = require('fs')
const path = require('path')

module.exports = {
  printFiles (pdfFiles, printerName) {
    return new Promise((resolve, reject) => {
      let createFile = '@echo off \n'
      createFile += 'cd \n'

      if (printerName) printerName = ' "' + printerName + '"'

      for (var i = 0; i < pdfFiles.length; i++) {
        createFile += 'PDFtoPrinter.exe "' + pdfFiles[i] + '"' + printerName + '\n'
      }

      createFile += 'exit /b 0 \n'
      createFile += 'pause>nul \n'

      const batFileUrl = path.join(__dirname.replace('app.asar', 'app.asar.unpacked'), 'printTmp.bat')
      fs.writeFile(batFileUrl, createFile, function (err) {
        if (err) {
          reject(err)
        } else {
          childProcess.exec(batFileUrl, function (error, stdout) {
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
  listPrinter () {
    return new Promise((resolve, reject) => {
      childProcess.exec('%WINdir%\\System32\\cscript.exe %WINdir%\\System32\\printing_Admin_Scripts\\zh-CN\\prnmngr.vbs -l | find /i "打印机名"', {
        encoding: 'buffer'
      }, function (error, stdout) {
        if (error) {
          reject(error)
        } else {
          stdout = iconv.decode(stdout, 'cp936').toString('utf-8').split('\r\n').map(item => {
            return item.substr(5)
          })
          stdout.pop()
          resolve(stdout)
        }
      })
    })
  }
}
