const child_process = require('child_process')
const iconv = require('iconv-lite')

module.exports = {
   printFiles (pdfFiles, printerName) {
      var createFile = "";
      createFile += '@echo off \n';
      createFile += 'cd \n';

      if (printerName) {
         for (var i = 0; i < pdfFiles.length; i++) {
            createFile += 'SumatraPDF.exe -print-to "' + printerName +'" "' + pdfFiles[i] + '" \n';
         }
      } else {
         for (var i = 0; i < pdfFiles.length; i++) {
            createFile += 'SumatraPDF.exe -print-to-default "' + pdfFiles[i] + '" \n';
         }
      }

      createFile += 'exit /b 0 \n';


      createFile += 'pause>nul \n';

      var fs = require("fs");
      fs.writeFile("printpdffilesumatra.bat", createFile, function (err) {
         if (err) {
            console.log("something going wrong .....");
         }
      });

      child_process.exec("printpdffilesumatra.bat", function (error, stdout) {
         if (error) {
            console.log("*************");
            console.log(error);
         } else {
            console.log(stdout);
         }
      });
   },
   listPrinter () {
      return new Promise((resolve, reject) => {
         child_process.exec('%WINdir%\\System32\\cscript.exe %WINdir%\\System32\\printing_Admin_Scripts\\zh-CN\\prnmngr.vbs -l | find /i "打印机名"', {
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