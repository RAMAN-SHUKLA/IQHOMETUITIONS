const puppeteer = require('puppeteer');
const { spawn } = require('child_process');

(async () => {
    // Start Next.js production server
    const server = spawn('npm', ['run', 'start'], { stdio: 'ignore', shell: true });
    
    // Wait for the server to start (give it 5 seconds)
    console.log("Waiting for Next.js to start...");
    await new Promise(resolve => setTimeout(resolve, 5000));

    console.log("Launching browser...");
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });

    try {
        console.log("Navigating to http://localhost:3000...");
        await page.goto('http://localhost:3000', { waitUntil: 'networkidle0', timeout: 30000 });
        
        // Wait an extra second for Framer Motion animations to settle
        await new Promise(resolve => setTimeout(resolve, 1000));

        console.log("Taking hero screenshot...");
        await page.screenshot({ path: 'docs/hero.png', clip: { x: 0, y: 0, width: 1280, height: 800 } });

        console.log("Scrolling to footer...");
        await page.evaluate(() => {
            window.scrollTo(0, document.body.scrollHeight);
        });
        
        // Wait for scroll and animations
        await new Promise(resolve => setTimeout(resolve, 1000));

        console.log("Taking footer screenshot...");
        // Capture a rectangle at the bottom
        const height = await page.evaluate(() => document.body.scrollHeight);
        await page.screenshot({ path: 'docs/footer.png', clip: { x: 0, y: height - 800, width: 1280, height: 800 } });
        
        console.log("Screenshots captured successfully!");
    } catch (e) {
        console.error("Error capturing screenshots:", e);
    } finally {
        await browser.close();
        server.kill();
        process.exit(0);
    }
})();
