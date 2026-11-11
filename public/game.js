/* B2B Runner — estilo "dino" do Chrome */
(()=>{
const cv=document.getElementById('g');if(!cv)return;
const ctx=cv.getContext('2d'),W=800,H=240,GY=H-34,dpr=Math.min(window.devicePixelRatio||1,2);
cv.width=W*dpr;cv.height=H*dpr;ctx.scale(dpr,dpr);
const logo=new Image();logo.src='https://b2bservicos.com/wp-content/uploads/2022/03/logo-B2B.png';
let hi=0;try{hi=+localStorage.getItem('b2bhi')||0}catch(e){}
const P={x:70,y:GY,vy:0,w:40,h:52,on:true};
let st='idle',score=0,speed=330,t=0,last=0,inView=false,next=1,overAt=0,obs=[],far=[],stars=[];
for(let i=0;i<30;i++)stars.push({x:Math.random()*W,y:Math.random()*110,p:Math.random()*6});
function mkFar(){far=[];let x=-20;while(x<W+200){const w=30+Math.random()*50,h=30+Math.random()*70;far.push({x,w,h});x+=w+Math.random()*14;}}
function reset(){score=0;speed=330;next=1;obs=[];P.y=GY;P.vy=0;P.on=true;mkFar();}
function jump(){if(P.on){P.vy=-830;P.on=false;}}
function start(){reset();st='run';jump();}
function act(){if(st==='idle')start();else if(st==='over'){if(performance.now()-overAt>450)start();}else jump();}
function spawn(){
  const mk=(x)=>{const w=40+Math.random()*34|0,h=48+Math.random()*46|0,cols=Math.max(1,(w-10)/12|0),rows=Math.max(1,(h-30)/14|0),win=[];
    for(let i=0;i<cols*rows;i++)win.push(Math.random()<.55);return{x,w,h,cols,rows,win};};
  const a=mk(W+20);obs.push(a);
  if(Math.random()<.22)obs.push(mk(a.x+a.w+2));
  next=.95+Math.random()*.9;
}
function update(dt){
  t+=dt;
  far.forEach(b=>b.x-=speed*.2*dt);
  if(far.length&&far[0].x+far[0].w<0){const lx=far[far.length-1],f=far.shift();f.x=lx.x+lx.w+Math.random()*14;far.push(f);}
  if(st!=='run')return;
  speed=Math.min(720,330+score*.8);score+=speed*dt*.03;
  P.vy+=2600*dt;P.y+=P.vy*dt;if(P.y>=GY){P.y=GY;P.vy=0;P.on=true;}
  next-=dt;if(next<=0)spawn();
  obs.forEach(o=>o.x-=speed*dt);obs=obs.filter(o=>o.x+o.w>-10);
  const l=P.x+9,r=P.x+P.w-9,tp=P.y-P.h+6,b=P.y-2;
  for(const o of obs){if(r>o.x+2&&l<o.x+o.w-2&&b>GY-o.h+3&&tp<GY){
    st='over';overAt=performance.now();
    if(score>hi){hi=Math.floor(score);try{localStorage.setItem('b2bhi',hi)}catch(e){}}break;}}
}
const pad=n=>String(Math.floor(n)).padStart(5,'0');
function drawP(){
  const s=4,x=P.x,y=P.y-52,R='#F20505',D='#9C1C1F',f=Math.floor(t*12)%2;
  const r=(a,b,c,d,col)=>{ctx.fillStyle=col;ctx.fillRect(x+a*s,y+b*s,c*s,d*s);};
  r(2,0,6,2,R);r(1,2,8,1,D);r(3,3,4,3,'#f1c27d');r(6,4,1,1,'#222');
  r(2,6,6,4,R);r(2,8,6,1,'#fff');r(1,6,1,3,D);r(8,6,1,3,D);
  if(!P.on||st!=='run'){r(3,10,2,3,'#222');r(5,10,2,3,'#222');}
  else if(f){r(3,10,2,3,'#222');r(5,10,2,2,'#222');}
  else{r(3,10,2,2,'#222');r(5,10,2,3,'#222');}
}
function drawB(o){
  const y=GY-o.h;
  ctx.fillStyle='#1d1d1d';ctx.fillRect(o.x,y,o.w,o.h);
  ctx.fillStyle='#F20505';ctx.fillRect(o.x,y,o.w,4);
  ctx.fillStyle='#9C1C1F';ctx.fillRect(o.x,y+4,2,o.h-4);
  // plaquinha com a logo
  const ph=13;let pw=o.w-12;
  if(logo.complete&&logo.naturalWidth){pw=Math.min(o.w-10,logo.naturalWidth/logo.naturalHeight*ph+8);
    ctx.fillStyle='#F6F3EE';ctx.fillRect(o.x+(o.w-pw)/2,y+8,pw,ph+2);
    const lw=pw-8,lh=Math.min(ph,lw*logo.naturalHeight/logo.naturalWidth);
    ctx.drawImage(logo,o.x+(o.w-lw)/2,y+9+(ph-lh)/2,lw,lh);
  }else{ctx.fillStyle='#F6F3EE';ctx.fillRect(o.x+(o.w-pw)/2,y+8,pw,ph+2);ctx.fillStyle='#F20505';ctx.font='bold 11px sans-serif';ctx.textAlign='center';ctx.fillText('B2B',o.x+o.w/2,y+19);}
  // janelas
  const gx=(o.w-o.cols*12+4)/2;
  for(let i=0;i<o.cols*o.rows;i++){const c=i%o.cols,rw=i/o.cols|0;
    ctx.fillStyle=o.win[i]?'#ffd27a':'#333';ctx.fillRect(o.x+gx+c*12,y+28+rw*14,8,8);}
}
function draw(){
  ctx.clearRect(0,0,W,H);
  const g=ctx.createLinearGradient(0,0,0,H);g.addColorStop(0,'#0D0D0D');g.addColorStop(1,'#2a0505');ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
  stars.forEach(s=>{ctx.fillStyle=`rgba(255,255,255,${.25+.35*Math.abs(Math.sin(t+s.p))})`;ctx.fillRect(s.x,s.y,2,2);});
  ctx.fillStyle='#181010';far.forEach(b=>ctx.fillRect(b.x,GY-b.h,b.w,b.h));
  ctx.fillStyle='#111';ctx.fillRect(0,GY,W,H-GY);ctx.fillStyle='#F20505';ctx.fillRect(0,GY,W,2);
  ctx.fillStyle='#3a1a1a';for(let i=0;i<14;i++){const x=((i*77-t*speed)%W+W)%W;ctx.fillRect(x,GY+10+(i%3)*8,10,2);}
  obs.forEach(drawB);drawP();
  ctx.font='bold 14px monospace';ctx.textAlign='right';ctx.fillStyle='#8a8680';ctx.fillText('HI '+pad(hi),W-110,24);ctx.fillStyle='#fff';ctx.fillText(pad(score),W-16,24);
  ctx.textAlign='center';
  if(st==='idle'){ctx.fillStyle='#fff';ctx.font='bold 18px monospace';ctx.fillText('Toque ou aperte ESPAÇO para começar',W/2,100);}
  if(st==='over'){ctx.fillStyle='rgba(13,13,13,.6)';ctx.fillRect(0,0,W,GY);ctx.fillStyle='#F20505';ctx.font='bold 34px monospace';ctx.fillText('FIM DE EXPEDIENTE!',W/2,92);
    ctx.fillStyle='#fff';ctx.font='bold 15px monospace';ctx.fillText('Toque ou aperte ESPAÇO para jogar de novo',W/2,124);}
}
function loop(ts){requestAnimationFrame(loop);if(!inView||document.hidden){last=ts;return;}
  const dt=Math.min((ts-last)/1000||0,.04);last=ts;update(dt);draw();}
mkFar();
new IntersectionObserver(([e])=>inView=e.isIntersecting,{threshold:.25}).observe(cv);
addEventListener('keydown',e=>{if(!inView||/INPUT|TEXTAREA/.test(e.target.tagName))return;
  if(e.code==='Space'||e.code==='ArrowUp'||e.code==='KeyW'){e.preventDefault();act();}});
cv.addEventListener('pointerdown',e=>{e.preventDefault();act();});
requestAnimationFrame(loop);
})();
