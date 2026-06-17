const fs = require('fs');
const glob = require('glob');

glob.sync('src/app/**/*.tsx').forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes('import Navbar from "@/components/Navbar"')) {
    content = content.replace('import Navbar from "@/components/Navbar";', 'import Header from "@/components/Header";');
    content = content.replace(/<Navbar \/>/g, '<Header />');
    fs.writeFileSync(file, content, 'utf8');
  }
});
console.log('done');
