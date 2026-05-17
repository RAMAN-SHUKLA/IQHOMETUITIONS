const https = require('https');
const fs = require('fs');

const options = {
  headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
};

https.get('https://en.wikipedia.org/wiki/Kanpur', options, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const match = data.match(/src="(\/\/upload\.wikimedia\.org\/wikipedia\/commons\/thumb\/[^"]+\.jpg\/[^"]+px-[^"]+\.jpg)"/i);
    if(match) {
        let imgUrl = "https:" + match[1];
        console.log("Found image:", imgUrl);
        const file = fs.createWriteStream('c:/Users/Aman/Desktop/IQ HOMETUTIONS/public/features/local-presence.png');
        https.get(imgUrl, options, (imgRes) => {
            imgRes.pipe(file);
            file.on('finish', () => console.log('Download Completed'));
        });
    } else {
        console.log('No image found');
    }
  });
});
