const fs = require('fs');

const files = [
  'app/(dashboard)/petani/dashboard/page.tsx',
  'app/(dashboard)/petani/investments/page.tsx'
];

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Replace the My Farms block
    const oldBlock = '<Link href="#" className="flex items-center gap-3 px-4 py-3 text-slate-gray hover:bg-white/60 rounded-xl transition-all duration-200 ease-in-out">\n              <span className="material-symbols-outlined">agriculture</span>\n              <span className="text-sm">My Farms</span>\n            </Link>';
    
    // Because I ran the sed script earlier, "My Farms" was partially changed. Let's do a more robust regex pass instead.
    
    content = content.replace(/<Link href="#" className="flex items-center gap-3 px-4 py-3 text-slate-gray hover:bg-white/60 rounded-xl transition-all duration-200 ease-in-out">\s*<span className="material-symbols-outlined">campaign<\/span>\s*<span className="text-sm">Crowdfunding<\/span>\s*<\/Link>/g, `<Link href="/petani/crowdfunding" className="flex items-center gap-3 px-4 py-3 text-slate-gray hover:bg-white/60 rounded-xl transition-all duration-200 ease-in-out">\n              <span className="material-symbols-outlined">campaign</span>\n              <span className="text-sm">Crowdfunding</span>\n            </Link>`);
    
    fs.writeFileSync(file, content);
  }
});
