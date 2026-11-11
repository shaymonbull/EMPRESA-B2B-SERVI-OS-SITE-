(()=>{
const $=(s,c=document)=>c.querySelector(s),$$=(s,c=document)=>[...c.querySelectorAll(s)];
const C=window.B2B_CONFIG||{whatsapp:'556133407904',message:'Olá!'};
const wa=t=>`https://wa.me/${C.whatsapp}?text=${encodeURIComponent(t||C.message)}`;

/* WhatsApp links */
$$('[data-wa]').forEach(a=>{a.href=wa(a.dataset.wa);a.target='_blank';a.rel='noopener';});
$('#f').addEventListener('submit',e=>{e.preventDefault();const d=Object.fromEntries(new FormData(e.target));
  window.open(wa(`Olá! Sou da *${d.empresa}*.\nTelefone: ${d.tel}\n\n${d.msg}`),'_blank','noopener');});

/* nav shadow */
const nav=$('#nav');addEventListener('scroll',()=>nav.classList.toggle('sc',scrollY>20),{passive:true});

/* mobile menu */
const mn=$('#menu'),bt=$('#burger');let open=false,mt=null;
const toggle=v=>{open=v;bt.classList.toggle('on',v);document.body.style.overflow=v?'hidden':'';
  if(window.gsap){v?mt.play():mt.reverse();}else{mn.style.visibility=v?'visible':'hidden';mn.style.clipPath=v?'none':'';}};
bt.onclick=()=>toggle(!open);$$('#menu a').forEach(a=>a.addEventListener('click',()=>open&&toggle(false)));

if(!window.gsap||matchMedia('(prefers-reduced-motion:reduce)').matches){
  $$('[data-n]').forEach(el=>el.textContent=(+el.dataset.n).toLocaleString('pt-BR')+el.dataset.s);return;}
gsap.registerPlugin(ScrollTrigger);

mt=gsap.timeline({paused:true,onReverseComplete:()=>mn.style.visibility='hidden'})
 .set(mn,{visibility:'visible'}).to(mn,{clipPath:'circle(150% at 100% 0%)',duration:.8,ease:'expo.inOut'})
 .from('#menu li a',{yPercent:110,stagger:.07,duration:.8,ease:'expo.out'},'-=.4').from('#menu .btn',{opacity:0,y:20,duration:.5},'-=.4');

/* hero intro */
gsap.set('.hero h1 .i',{yPercent:112});
gsap.timeline({delay:.15}).to('.hero h1 .i',{yPercent:0,duration:1.3,stagger:.12,ease:'expo.out'})
 .from('.hero .eyebrow',{opacity:0,x:-20,duration:.8},0);

/* reveals */
$$('.rv').forEach(el=>gsap.from(el,{y:44,opacity:0,duration:1,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 90%'}}));
$$('.clip').forEach(el=>{
  gsap.from(el,{clipPath:'inset(0 100% 0 0)',duration:1.4,ease:'expo.inOut',scrollTrigger:{trigger:el,start:'top 88%'}});
});
gsap.from('.seal',{scale:0,rotation:-20,duration:1,ease:'back.out(1.6)',delay:1});

/* counters */
$$('[data-n]').forEach(el=>{const o={v:0};gsap.to(o,{v:+el.dataset.n,duration:2.2,ease:'expo.out',scrollTrigger:{trigger:el,start:'top 92%'},onUpdate:()=>el.textContent=Math.round(o.v).toLocaleString('pt-BR')+el.dataset.s});});

/* ===== futurista: cidade 3D, HUD, interações ===== */
const clk=$('#clk');if(clk){const u=()=>clk.textContent=new Date().toLocaleTimeString('pt-BR',{timeZone:'America/Sao_Paulo'});u();setInterval(u,1000);}
const mq=$('.mq');if(mq)mq.appendChild(mq.firstElementChild.cloneNode(true));
gsap.to('.steps',{'--p':1,ease:'none',scrollTrigger:{trigger:'.steps',start:'top 75%',end:'bottom 65%',scrub:true}});
const G='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#/%';
$$('.tag').forEach(el=>{const t=el.textContent;ScrollTrigger.create({trigger:el,start:'top 92%',once:true,onEnter:()=>{const o={p:0};gsap.to(o,{p:1,duration:1.1,ease:'none',onUpdate:()=>{const k=Math.floor(o.p*t.length);el.textContent=t.slice(0,k)+[...t.slice(k)].map(c=>c===' '?' ':G[Math.random()*G.length|0]).join('');},onComplete:()=>el.textContent=t});}});});
if(matchMedia('(hover:hover) and (pointer:fine)').matches){
 const c=$('#cur'),qx=gsap.quickTo(c,'x',{duration:.3}),qy=gsap.quickTo(c,'y',{duration:.3});
 addEventListener('mousemove',e=>{qx(e.clientX);qy(e.clientY);});
 $$('a,button').forEach(a=>{a.addEventListener('mouseenter',()=>c.classList.add('big'));a.addEventListener('mouseleave',()=>c.classList.remove('big'));});
 $$('.btn').forEach(b=>{const x=gsap.quickTo(b,'x',{duration:.5,ease:'elastic.out(1,.5)'}),y=gsap.quickTo(b,'y',{duration:.5,ease:'elastic.out(1,.5)'});b.addEventListener('mousemove',e=>{const r=b.getBoundingClientRect();x((e.clientX-r.left-r.width/2)*.25);y((e.clientY-r.top-r.height/2)*.25);});b.addEventListener('mouseleave',()=>{x(0);y(0);});});
 $$('.svc .clip').forEach(el=>{el.addEventListener('mousemove',e=>{const r=el.getBoundingClientRect();gsap.to(el,{rotationY:((e.clientX-r.left)/r.width-.5)*10,rotationX:-((e.clientY-r.top)/r.height-.5)*10,transformPerspective:900,duration:.5});});el.addEventListener('mouseleave',()=>gsap.to(el,{rotationX:0,rotationY:0,duration:.8}));});
}
const cv=$('#gl');
if(window.THREE&&cv){try{
 const mob=innerWidth<768;
 const r=new THREE.WebGLRenderer({canvas:cv,antialias:!mob,alpha:true});r.setPixelRatio(Math.min(devicePixelRatio,mob?1.5:2));
 const sc=new THREE.Scene();sc.fog=new THREE.FogExp2(0x0d0d0d,mob?.06:.04);
 const cam=new THREE.PerspectiveCamera(50,1,.1,100),city=new THREE.Group();sc.add(city);
 const N=mob?9:15,S=1.7,R=new THREE.LineBasicMaterial({color:0xF20505}),W=new THREE.LineBasicMaterial({color:0xffffff,transparent:true,opacity:.2}),F=new THREE.MeshBasicMaterial({color:0x160505});
 let seed=7;const rnd=()=>(seed=seed*16807%2147483647)/2147483647;
 for(let i=0;i<N;i++)for(let j=0;j<N;j++){if(rnd()<.2)continue;const h=.6+Math.pow(rnd(),2.3)*8,g=new THREE.BoxGeometry(1,h,1),m=new THREE.Mesh(g,F),e=new THREE.LineSegments(new THREE.EdgesGeometry(g),rnd()<.2?R:W);
  m.position.set((i-N/2)*S,h/2,(j-N/2)*S);e.position.copy(m.position);city.add(m,e);}
 city.add(new THREE.GridHelper(N*S*1.6,N*3,0xF20505,0x3a0a0a));
 const scan=new THREE.Mesh(new THREE.PlaneGeometry(N*S*1.6,N*S*1.6),new THREE.MeshBasicMaterial({color:0xF20505,transparent:true,opacity:.12,side:THREE.DoubleSide,depthWrite:false}));scan.rotation.x=-Math.PI/2;city.add(scan);
 let H=0,mx=0,my=0,tx=0,ty=0,on=true;
 addEventListener('mousemove',e=>{tx=e.clientX/innerWidth-.5;ty=e.clientY/innerHeight-.5;});
 new IntersectionObserver(([e])=>on=e.isIntersecting).observe($('.hero'));
 const fit=()=>{const w=cv.clientWidth,h=cv.clientHeight;r.setSize(w,h,false);cam.aspect=w/h;cam.updateProjectionMatrix();city.position.x=w<900?0:3.5;};
 addEventListener('resize',fit);fit();
 ScrollTrigger.create({trigger:'.hero',start:'top top',end:'bottom top',scrub:true,onUpdate:s=>H=s.progress});
 gsap.from(cv,{opacity:0,duration:2.2,ease:'power2.out'});
 gsap.ticker.add(t=>{if(!on)return;mx+=(tx-mx)*.05;my+=(ty-my)*.05;
  city.rotation.y=t*.06+mx*.5+H*1.4;cam.position.set(mx*2,5.5-my*1.5+H*7,17-H*9);cam.lookAt(0,2+H*2,0);
  scan.position.y=(t*1.3)%9;scan.material.opacity=.16*(1-scan.position.y/9);r.render(sc,cam);});
}catch(err){cv.style.display='none';console.warn(err);}}
})();
