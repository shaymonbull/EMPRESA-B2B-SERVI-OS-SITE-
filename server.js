// Servidor estático sem dependências:  node server.js  [porta]
const http=require('http'),fs=require('fs'),path=require('path'),{exec}=require('child_process');
const PORT=+process.argv[2]||process.env.PORT||3000,ROOT=path.join(__dirname,'public');
const T={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.webp':'image/webp','.ico':'image/x-icon'};
http.createServer((q,s)=>{
  let p=decodeURIComponent(q.url.split('?')[0]);if(p.endsWith('/'))p+='index.html';
  const f=path.normalize(path.join(ROOT,p));
  if(!f.startsWith(ROOT)){s.writeHead(403);return s.end('403');}
  fs.readFile(f,(e,d)=>{if(e){s.writeHead(404);return s.end('404');}
    s.writeHead(200,{'Content-Type':T[path.extname(f)]||'application/octet-stream','Cache-Control':'no-cache'});s.end(d);});
}).listen(PORT,()=>{const u=`http://localhost:${PORT}`;console.log(`\n  B2B Serviços rodando em ${u}\n  (Ctrl+C para parar)\n`);
  if(process.argv.includes('--open'))exec(process.platform==='win32'?`start ${u}`:process.platform==='darwin'?`open ${u}`:`xdg-open ${u}`);});
