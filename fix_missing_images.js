const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/Aman/Desktop/IQ HOMETUTIONS/src/content/blog/';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.mdx'));

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    const slug = file.replace('.mdx', '');
    
    if (!content.includes('image:')) {
        content = content.replace('---', '---\nimage: "/blog/' + slug + '.jpg"');
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Added missing image to', file);
    }
});
