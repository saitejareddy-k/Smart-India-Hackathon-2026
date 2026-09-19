const fs=require("fs"),path=require("path");
const root=path.join(__dirname,"..");
const required=["index.html","package.json","server.js","README.md","REWRITE_MANIFEST.md","assets/css/common.css","assets/js/common.js","pages/marketplace.html","pages/farmers.html","pages/orders.html","pages/ai.html","pages/logistics.html"];
let ok=true;
for(const f of required){const p=path.join(root,f);if(!fs.existsSync(p)){console.error("Missing:",f);ok=false}else console.log("OK",f)}
const html=required.filter(x=>x.endsWith(".html")).map(f=>fs.readFileSync(path.join(root,f),"utf8")).join("\n");
const all=[...fs.readFileSync(path.join(root,"assets/js/common.js"),"utf8"),...html];
for(const token of ["😀","🌱","🚜","🛒","🎙️","📦","❌"]){if(all.includes(token)){console.error("Decorative emoji found:",token);ok=false}}
for(const f of required.filter(x=>x.endsWith(".html"))){const s=fs.readFileSync(path.join(root,f),"utf8");if(!s.includes('viewport')){console.error("Missing viewport:",f);ok=false}}
console.log(ok?"ALL STATIC CHECKS PASSED":"STATIC CHECKS FAILED");
process.exit(ok?0:1);
