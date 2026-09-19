const http=require("http"),fs=require("fs"),path=require("path");
const PORT=Number(process.env.PORT)||3000, ROOT=path.resolve(__dirname);
const MIME={".html":"text/html; charset=utf-8",".css":"text/css; charset=utf-8",".js":"application/javascript; charset=utf-8",".json":"application/json; charset=utf-8",".svg":"image/svg+xml",".png":"image/png",".jpg":"image/jpeg",".jpeg":"image/jpeg",".webp":"image/webp",".ico":"image/x-icon"};
function safeFile(url){try{const decoded=decodeURIComponent(url.split("?")[0]);const rel=decoded==="/"?"/index.html":decoded;const file=path.resolve(ROOT,"."+rel);if(file!==ROOT&&!file.startsWith(ROOT+path.sep))return null;return file}catch{return null}}
const server=http.createServer((req,res)=>{const file=safeFile(req.url||"/");if(!file){res.writeHead(403,{"Content-Type":"text/plain"});return res.end("Forbidden")}
fs.stat(file,(err,st)=>{if(err||!st.isFile()){res.writeHead(404,{"Content-Type":"text/html; charset=utf-8"});return res.end("<h1>404</h1><p>Page not found.</p>")}
const ext=path.extname(file).toLowerCase();res.writeHead(200,{"Content-Type":MIME[ext]||"application/octet-stream","Cache-Control":"no-cache","X-Content-Type-Options":"nosniff","Referrer-Policy":"strict-origin-when-cross-origin"});fs.createReadStream(file).on("error",()=>{if(!res.headersSent)res.writeHead(500);res.end("Internal Server Error")}).pipe(res)})});
server.listen(PORT,()=>console.log(`AgriDirect running at http://localhost:${PORT}`));
