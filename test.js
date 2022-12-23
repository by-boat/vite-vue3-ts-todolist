const fs = require('fs');
const path = require('path');

// 读取data.json文件的数据，操作一番后写入到新的 newdata.json文件中
fs.readFile(path.join(__dirname, './data.json'), (err, data) => {
  if (err) {
    return console.log(err)
  }
  // let data_ = JSON.parse(data.toString())
  let obj = {};
  obj.a = 1;
  obj.b = 2;
  obj.c = 3;

  fs.writeFile(path.join(__dirname, './data.json'), JSON.stringify(obj), (err) => {
    if (err) {
      return console.log(err)
    }
    console.log('写入成功')
  })
})
