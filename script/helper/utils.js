/*
 * @Date: 2021-10-21 12:10:43
 * @LastEditTime: 2021-12-27 20:21:26
 * @Description: 构建辅助工具函数
 */
import path from 'path';
import fs from 'fs';

const getArgValueByKey = (key) => {
  // 参数过多, 复杂的话,可以用yargs, minimist 这些外部库提取方便一些
  const keyArg = process.argv.slice(2).find(item => item.includes(`--${key}`))
  const reg = new RegExp(`--${key}=?`)
  return keyArg ? keyArg.replace(reg, '') || true : '' // has keyArg set key value or true
}


const promisify = (fn) => {
  /**
   * @param {...Any} params The params to pass into *fn*
   * @return {Promise<Any|Any[]>}
   */
  return function promisified(...params) {
    return new Promise((resolve, reject) =>
      fn(...params.concat([(err, ...args) => (err ? reject(err) : resolve(args.length < 2 ? args[0] : args))])),
    );
  };
};

// 遍历文件夹, 动态映射别名
const walk = async (pathRoad) => {
  const suffix = pathRoad === 'components' ? '/index.vue' : ''
  const readDirAsync = promisify(fs.readdir);
  const lstatAsync = promisify(fs.lstat);
  const cwd = process.cwd();
  const pathDir = `${cwd}/src/${pathRoad}`;
  const aliasMap = {}
  return readDirAsync(pathDir)
    .then(async (files) => {
      for (const f of files) {
        const file = path.join(pathDir, f);
        const stat = await lstatAsync(file);
        if (stat.isDirectory()) {
          aliasMap[f] = `/src/${pathRoad}/${f}${suffix}`
        } else {
          const fileName = f.replace(/(.+)\..+/, '$1')
          aliasMap[fileName] = `/src/${pathRoad}/${f}`
        }
      }
      return aliasMap
    })
};

export {
  getArgValueByKey,
  walk,
}
