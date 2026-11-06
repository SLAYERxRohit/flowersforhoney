function rnd(s){return function(){s=Math.sin(s)*10000;return s-Math.floor(s)}}
// Procedural, layered-petal yellow rose (top view)
function rose(cx,cy,R,seed){
  var r=rnd(seed),o='<g transform="translate('+cx+' '+cy+')"><circle r="'+R*1.02+'" fill="#6b4a08" opacity=".35"/>';
  var P='M0,0C-.55,-.1 -.78,-.7 -.3,-.94Q0,-1.06 .3,-.94C.78,-.7 .55,-.1 0,0Z';
  var rings=[[8,1,.8],[7,.82,.75],[6,.64,.7],[5,.48,.66],[4,.32,.62],[3,.18,.6]];
  rings.forEach(function(g,i){for(var k=0;k<g[0];k++){
    var a=360/g[0]*k+i*31+r()*22,s=R*g[1];
    o+='<g transform="rotate('+a.toFixed(1)+') scale('+s.toFixed(1)+')"><path d="'+P+'" transform="scale('+g[2]+' 1)" fill="url(#pg'+(1+(k+i)%3)+')" stroke="#a57008" stroke-opacity=".35" stroke-width=".014"/><path d="'+P+'" transform="scale('+g[2]+' 1)" fill="url(#hl)"/></g>';}});
  return o+'<circle r="'+R*.1+'" fill="url(#ct)"/></g>';
}
function leaf(x,y,a,s){return '<path transform="translate('+x+' '+y+') rotate('+a+') scale('+s+')" d="M0,0C-40,-30 -42,-100 0,-150C42,-100 40,-30 0,0Z" fill="url(#lf)" stroke="#223f1a" stroke-opacity=".4"/><path transform="translate('+x+' '+y+') rotate('+a+') scale('+s+')" d="M0,0L0,-140" stroke="#9cc27c" stroke-opacity=".5" fill="none"/>';}
// Bouquet
var b='';
[[-62,300,.95],[-40,290,1.15],[-18,285,1],[18,285,1],[40,290,1.15],[62,300,.95]].forEach(function(l){b+=leaf(300,360,l[0],l[2]*1.2)});
b+='<path d="M300,400V560M250,400L290,560M350,400L310,560" stroke="#3b6128" stroke-width="9" stroke-linecap="round"/>';
b+='<path d="M120,330L480,330L318,705Q300,718 282,705Z" fill="url(#pp)" stroke="#d9c58a" stroke-width="1.5"/>';
b+='<path d="M120,330L300,520L480,330" fill="none" stroke="#d9c58a" stroke-opacity=".8"/><path d="M200,330L300,700M400,330L300,700" stroke="#e3d29c" stroke-opacity=".7"/>';
[[300,190,118,1],[185,255,98,2],[415,255,98,3],[232,140,82,4],[368,140,82,5],[300,320,86,6],[170,350,60,7],[430,350,60,8]].forEach(function(p){b+=rose(p[0],p[1],p[2],p[3])});
b+='<path d="M232,548Q300,575 368,548L360,572Q300,598 240,572Z" fill="#e8c24a" stroke="#a8780a" stroke-opacity=".5"/><path d="M300,566C250,520 214,560 252,596C270,606 292,584 300,566ZM300,566C350,520 386,560 348,596C330,606 308,584 300,566Z" fill="#f1cf5e" stroke="#a8780a" stroke-opacity=".5"/><circle cx="300" cy="568" r="10" fill="#d8a92e"/><path d="M296,576L270,650M304,576L330,660" stroke="#e1b83c" stroke-width="7" stroke-linecap="round"/>';
document.getElementById('bouquet').innerHTML=b;

// Interactive roses
var msgs=['You make ordinary days feel golden.','Your smile is my favorite view in the world.','I’m grateful for you every single day.','With you, home is a person.','You are braver and brighter than you know.','Every moment with you is my favorite one.','You are my sunshine on the cloudiest days.','I would choose you in every lifetime.'];
var f=document.getElementById('field'),m=document.getElementById('msg');
msgs.forEach(function(t,i){var d=document.createElement('button');d.className='fr';d.setAttribute('aria-label','Yellow rose '+(i+1));
  d.innerHTML='<svg viewBox="-110 -110 220 220">'+rose(0,0,100,20+i*7)+'</svg>';
  d.onclick=function(){m.style.opacity=0;setTimeout(function(){m.textContent=t;m.style.opacity=1},250);burst(d)};f.appendChild(d)});
var fb='';for(var i=0;i<6;i++)fb+='<svg viewBox="-110 -110 220 220">'+rose(0,0,100,50+i*3)+'</svg>';
document.getElementById('fbg').innerHTML=fb;

// Scrolling + fade-in
document.querySelectorAll('[data-go]').forEach(function(x){x.onclick=function(){document.querySelector(x.dataset.go).scrollIntoView({behavior:'smooth'})}});
var io=new IntersectionObserver(function(e){e.forEach(function(n){if(n.isIntersecting)n.target.classList.add('in')})},{threshold:.2});
document.querySelectorAll('.fade').forEach(function(x){io.observe(x)});

// Particles + falling petals
var c=document.getElementById('fx'),x=c.getContext('2d'),W,H,ps=[],pt=[];
function rs(){W=c.width=innerWidth;H=c.height=innerHeight}rs();addEventListener('resize',rs);
for(var i=0;i<40;i++)ps.push({x:Math.random()*W,y:Math.random()*H,r:Math.random()*2+.6,v:Math.random()*.3+.1,p:Math.random()*6});
for(var i=0;i<14;i++)pt.push(np(true));
function np(init){return{x:Math.random()*W,y:init?Math.random()*H:-20,s:Math.random()*8+7,v:Math.random()*.7+.4,a:Math.random()*6,w:Math.random()*.03+.01,rot:Math.random()*6}}
function burst(el){var b=el.getBoundingClientRect();for(var i=0;i<10;i++){var q=np();q.x=b.left+b.width/2;q.y=b.top+b.height/2;q.v=Math.random()*1.5+.6;pt.push(q)}}
function loop(t){x.clearRect(0,0,W,H);
 ps.forEach(function(p){p.y-=p.v;p.x+=Math.sin(t/1500+p.p)*.3;if(p.y<-5){p.y=H+5;p.x=Math.random()*W}
  x.beginPath();x.fillStyle='rgba(235,190,50,'+(.35+.3*Math.sin(t/600+p.p))+')';x.arc(p.x,p.y,p.r,0,7);x.fill()});
 for(var i=pt.length-1;i>=0;i--){var q=pt[i];q.y+=q.v;q.a+=q.w;q.x+=Math.sin(q.a)*.8;q.rot+=.01;
  if(q.y>H+20){if(i<14)pt[i]=np();else pt.splice(i,1);continue}
  x.save();x.translate(q.x,q.y);x.rotate(q.rot);x.scale(1,.6+.4*Math.sin(q.a));x.fillStyle='rgba(244,205,70,.85)';
  x.beginPath();x.ellipse(0,0,q.s,q.s*.6,0,0,7);x.fill();x.restore()}
 requestAnimationFrame(loop)}
if(!matchMedia('(prefers-reduced-motion:reduce)').matches)requestAnimationFrame(loop);
