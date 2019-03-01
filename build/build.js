const fs = require ('fs');
const path = require ('path');
const ora = require ('ora');
const rootPath = path.resolve (__dirname, '../');
const startPath = path.resolve (rootPath, 'dist/');

let building = ora ('Being building...');

// 递归查找文件并将其导出到lib中
const buildSingle = (targetPath, name) => {
  let isFile = fs.statSync (targetPath).isFile ();

  if (isFile) {
    if (/.map/.test (name)) return;

    fs.readFile (targetPath, (err, data) => {
      const handleContent = data
        .toString ()
        .replace (/\/\/# sourceMappingURL=.*/, '')
        .replace (/from ('|")\.+\/.*/g, match => {
          const splitArr = match.split ('/');
          const lastStr = splitArr[splitArr.length - 1].slice (0, -2);
          const handleStr = `from './${lastStr}'`;
          return handleStr;
        });
      const libPath = path.resolve (rootPath, 'lib');

      fs.writeFileSync (`${libPath}/${name}`, handleContent);
    });
  } else {
    const directory = fs.readdirSync (targetPath);
    directory.forEach (dir => {
      buildSingle (path.resolve (targetPath, dir), dir);
    });
  }
};

async function build () {
  if (!fs.existsSync (path.resolve (rootPath, 'lib'))) {
    fs.mkdirSync (path.resolve (rootPath, 'lib'));
  }
  building.start ();
  Promise.all ([await buildSingle (startPath)])
    .then (([result1]) => {
      building.stop ();
    })
    .catch (e => {
      building.stop ();
      throw e;
    });
}

build ();
