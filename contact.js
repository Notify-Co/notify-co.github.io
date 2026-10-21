/* Contact Us tab. Its look comes from caleb's "Corvel" reference page: warm paper, ink and signal orange, Inter Tight
   display type, JetBrains Mono labels, Newsreader body copy, halftone art drawn in code, and GSAP scroll animation.
   index.html loads this file (and contact.css) the first time someone opens the tab, then calls NotifyContact.show()
   with the live pick data. Every figure on the page is worked out from that data. */
(() => {
/* Generative SVG art, from the reference. Every "photo" is drawn from a seeded random generator. */
const R=seed=>{let s=(seed*7919+13)%233280;return()=>(s=(s*9301+49297)%233280)/233280};
const n=v=>Math.round(v*10)/10;
const G={
wafer(r,W,H,id,opt){const cx=W/2,cy=H/2,R0=Math.min(W,H)/2-14,st=R0/8.2,bins=opt==='bins';
 let b=`<defs><radialGradient id="wg${id}" cx=".36" cy=".3" r=".9"><stop offset="0" style="stop-color:var(--paper-hi)"/><stop offset=".55" style="stop-color:#8b939e"/><stop offset="1" style="stop-color:#262c35"/></radialGradient></defs><rect width="${W}" height="${H}" class="a-ink"/><circle cx="${cx}" cy="${cy}" r="${R0}" fill="url(#wg${id})"/>`;
 for(let x=cx-R0;x<cx+R0;x+=st)for(let y=cy-R0;y<cy+R0;y+=st){if(Math.hypot(x+st/2-cx,y+st/2-cy)>R0-st*.75)continue;const v=r();let c,o;
  if(bins){c=v<.08?'a-red':v<.2?'a-mid':'a-pap';o=v<.2?1:n(.55+r()*.4)}else{c=v<.06?'a-red':v<.14?'a-ink':'';o=v<.06?1:.35}
  b+=`<rect x="${n(x+1)}" y="${n(y+1)}" width="${n(st-2)}" height="${n(st-2)}" fill="none" class="${c} s-ink" fill-opacity="${o}" stroke-opacity=".45" stroke-width=".7"/>`}
 b+=`<path d="M${n(cx-9)} ${n(cy+R0)}l9-11 9 11z" class="a-ink"/><circle cx="${cx}" cy="${cy}" r="${R0}" fill="none" class="s-pap" stroke-opacity=".5"/><path d="M${n(cx-R0*.7)} ${n(cy+R0*.7)}L${n(cx+R0*.7)} ${n(cy-R0*.7)}" class="s-pap" stroke-opacity=".12" stroke-width="${n(R0*.25)}"/>`;return b},
die(r,W,H){const s=Math.min(W,H)*.66,x0=(W-s)/2,y0=(H-s)/2,np=12,L=Math.max(W,H)*.2;let b=`<rect width="${W}" height="${H}" class="a-ink"/><g fill="none" class="s-pap" stroke-opacity=".45" stroke-width=".8">`;
 for(let i=0;i<np;i++){const t=x0+s*(i+.5)/np,u=y0+s*(i+.5)/np;b+=`<path d="M${n(t)} ${n(y0)}L${n(t+(t-W/2)*.3)} ${n(y0-L)}M${n(t)} ${n(y0+s)}L${n(t+(t-W/2)*.3)} ${n(y0+s+L)}M${n(x0)} ${n(u)}L${n(x0-L)} ${n(u+(u-H/2)*.3)}M${n(x0+s)} ${n(u)}L${n(x0+s+L)} ${n(u+(u-H/2)*.3)}"/>`}
 b+=`</g><rect x="${n(x0)}" y="${n(y0)}" width="${n(s)}" height="${n(s)}" rx="3" style="fill:#363d48"/>`;
 for(let i=0;i<np;i++){const t=x0+s*(i+.5)/np,u=y0+s*(i+.5)/np;b+=`<g class="a-pap" fill-opacity=".85"><rect x="${n(t-3)}" y="${n(y0+4)}" width="6" height="6"/><rect x="${n(t-3)}" y="${n(y0+s-10)}" width="6" height="6"/><rect x="${n(x0+4)}" y="${n(u-3)}" width="6" height="6"/><rect x="${n(x0+s-10)}" y="${n(u-3)}" width="6" height="6"/></g>`}
 const m=18,cw=(s-m*2)/4;for(let i=0;i<4;i++)for(let j=0;j<4;j++){const v=r(),bx=x0+m+i*cw+3,by=y0+m+j*cw+3,w=cw-6;
  if(v<.14)b+=`<rect x="${n(bx)}" y="${n(by)}" width="${n(w)}" height="${n(w)}" class="a-red"/>`;
  else if(v<.45){b+=`<rect x="${n(bx)}" y="${n(by)}" width="${n(w)}" height="${n(w)}" class="a-pap" fill-opacity=".1"/>`;for(let k=1;k<7;k++)b+=`<line x1="${n(bx)}" x2="${n(bx+w)}" y1="${n(by+w*k/7)}" y2="${n(by+w*k/7)}" class="s-pap" stroke-opacity=".4" stroke-width=".7"/>`}
  else b+=`<rect x="${n(bx)}" y="${n(by)}" width="${n(w)}" height="${n(w)}" class="a-pap" fill-opacity="${n(.08+r()*.38)}"/>`}
 return b},
orbit(r,W,H,id){const cx=W/2,cy=H/2,m=Math.min(W,H);let b=`<defs><radialGradient id="og${id}" cx=".35" cy=".3" r=".8"><stop offset="0" style="stop-color:var(--paper-hi)"/><stop offset=".6" style="stop-color:#6d7581"/><stop offset="1" style="stop-color:#1a1f27"/></radialGradient></defs><rect width="${W}" height="${H}" class="a-ink"/>`;
 for(let i=0;i<50;i++)b+=`<circle cx="${n(r()*W)}" cy="${n(r()*H)}" r="${n(.4+r()*1.1)}" class="a-pap" fill-opacity="${n(.2+r()*.6)}"/>`;
 b+=`<circle cx="${cx}" cy="${cy}" r="${n(m*.2)}" fill="url(#og${id})"/>`;
 [[-20,.44,.15],[25,.4,.12],[70,.46,.18]].forEach(([a,rx,ry],i)=>{b+=`<g transform="rotate(${a} ${cx} ${cy})"><ellipse cx="${cx}" cy="${cy}" rx="${n(m*rx)}" ry="${n(m*ry)}" fill="none" class="s-pap" stroke-opacity=".55"${i==1?' stroke-dasharray="4 5"':''}/><circle cx="${n(cx+m*rx)}" cy="${cy}" r="${n(m*.024)}" class="a-red"/></g>`});return b},
candles(r,W,H){const N=Math.max(18,Math.round(W/16)),cw=W/N;let p=100;const d=[];
 for(let i=0;i<N;i++){const o=p,c=o+(r()-.46)*6,hi=Math.max(o,c)+r()*3,lo=Math.min(o,c)-r()*3;d.push([o,c,hi,lo]);p=c}
 const mx=Math.max(...d.map(x=>x[2])),mn=Math.min(...d.map(x=>x[3])),Y=v=>n(H*.1+(mx-v)/(mx-mn)*H*.8);
 let b=`<rect width="${W}" height="${H}" class="a-pap"/>`;for(let k=1;k<6;k++)b+=`<line x1="0" x2="${W}" y1="${n(H*k/6)}" y2="${n(H*k/6)}" class="s-ink" stroke-opacity=".12"/>`;
 let ma='';d.forEach(([o,c,hi,lo],i)=>{const x=i*cw+cw/2,up=c>=o;b+=`<line x1="${n(x)}" x2="${n(x)}" y1="${Y(hi)}" y2="${Y(lo)}" class="s-ink" stroke-width="1.2"/><rect x="${n(x-cw*.32)}" y="${Math.min(Y(o),Y(c))}" width="${n(cw*.64)}" height="${n(Math.max(1.5,Math.abs(Y(o)-Y(c))))}" class="${up?'a-red':'a-ink'}"/>`;
  const sl=d.slice(Math.max(0,i-4),i+1);ma+=`${i?'L':'M'}${n(x)} ${Y(sl.reduce((a,q)=>a+q[1],0)/sl.length)}`});
 return b+`<path d="${ma}" fill="none" class="s-ink" stroke-opacity=".55" stroke-width="1.5"/>`},
curve(r,W,H){let b=`<rect width="${W}" height="${H}" class="a-ink"/>`;
 for(let k=1;k<8;k++)b+=`<line x1="${n(W*k/8)}" x2="${n(W*k/8)}" y1="0" y2="${H}" class="s-pap" stroke-opacity=".08"/>`;
 for(let k=1;k<6;k++)b+=`<line y1="${n(H*k/6)}" y2="${n(H*k/6)}" x1="0" x2="${W}" class="s-pap" stroke-opacity=".08"/>`;
 for(let c=0;c<6;c++){const base=H*(.8-c*.05-r()*.04),amp=H*(.2+r()*.2),kk=.15+r()*.25,last=c==5;let d='';
  for(let i=0;i<=40;i++){const t=i/40;d+=`${i?'L':'M'}${n(W*.06+t*W*.88)} ${n(base-amp*(1-Math.exp(-t/kk)))}`}
  b+=`<path d="${d}" fill="none" class="${last?'s-red':'s-pap'}" stroke-opacity="${last?1:n(.2+c*.08)}" stroke-width="${last?2.5:1.2}"/>`}
 ['3M','2Y','5Y','10Y','30Y'].forEach((t,i)=>b+=`<text x="${n(W*.06+i/4*W*.88)}" y="${n(H*.95)}" class="a-pap" fill-opacity=".55" font-size="${n(H*.045)}" text-anchor="middle" style="font-family:var(--f-mono)">${t}</text>`);return b},
reactor(r,W,H,id){const cx=W/2,cy=H/2,m=Math.min(W,H);let b=`<defs><radialGradient id="rg${id}"><stop offset=".3" style="stop-color:#1a1f27"/><stop offset=".62" style="stop-color:var(--paper-hi)"/><stop offset=".82" style="stop-color:#8b939e"/><stop offset="1" style="stop-color:#1a1f27"/></radialGradient><radialGradient id="rh${id}"><stop offset="0" style="stop-color:#5b6370"/><stop offset="1" style="stop-color:var(--ink)"/></radialGradient></defs><rect width="${W}" height="${H}" fill="url(#rh${id})"/><circle cx="${cx}" cy="${cy}" r="${n(m*.42)}" fill="url(#rg${id})"/>`;
 for(let k=0;k<9;k++)b+=`<circle cx="${cx}" cy="${cy}" r="${n(m*(.2+k*.022))}" fill="none" class="s-pap" stroke-opacity="${n(.15+r()*.45)}"/>`;
 for(let i=0;i<16;i++)b+=`<rect x="${n(cx-m*.03)}" y="${n(cy-m*.48)}" width="${n(m*.06)}" height="${n(m*.13)}" rx="2" class="a-pap s-ink" fill-opacity=".85" transform="rotate(${i*22.5} ${cx} ${cy})"/>`;
 b+=`<circle cx="${cx}" cy="${cy}" r="${n(m*.08)}" class="a-mid s-ink"/>`;
 for(let i=0;i<3;i++){const a=(i*120+20)*Math.PI/180;b+=`<line x1="${n(cx+Math.cos(a)*m*.5)}" y1="${n(cy+Math.sin(a)*m*.5)}" x2="${n(cx+Math.cos(a)*m*.24)}" y2="${n(cy+Math.sin(a)*m*.24)}" class="s-red" stroke-width="2" stroke-dasharray="6 4"/>`}return b},
constellation(r,W,H,id){let b=`<defs><radialGradient id="eg${id}" cx=".5" cy="0" r="1"><stop offset="0" style="stop-color:#4a5260"/><stop offset=".35" style="stop-color:var(--ink)"/></radialGradient></defs><rect width="${W}" height="${H}" class="a-ink"/>`;
 for(let i=0;i<80;i++)b+=`<circle cx="${n(r()*W)}" cy="${n(r()*H*.7)}" r="${n(.4+r())}" class="a-pap" fill-opacity="${n(.15+r()*.6)}"/>`;
 const ex=W/2,ey=H*2.4,ER=H*1.75;b+=`<circle cx="${ex}" cy="${n(ey)}" r="${n(ER)}" fill="url(#eg${id})"/><circle cx="${ex}" cy="${n(ey)}" r="${n(ER)}" fill="none" class="s-red" stroke-opacity=".8" stroke-width="1.5"/>`;
 const rows=[1.1,1.17,1.25].map((k,o)=>{const Rr=ER*k;b+=`<circle cx="${ex}" cy="${n(ey)}" r="${n(Rr)}" fill="none" class="s-pap" stroke-opacity=".22"${o==1?' stroke-dasharray="3 6"':''}/>`;const row=[];for(let j=0;j<11;j++){const a=-Math.PI/2+(j-5)*.11+o*.04;row.push([ex+Rr*Math.cos(a),ey+Rr*Math.sin(a)])}return row});
 rows.forEach((row,o)=>row.forEach(([x,y],j)=>{if(j)b+=`<line x1="${n(row[j-1][0])}" y1="${n(row[j-1][1])}" x2="${n(x)}" y2="${n(y)}" class="s-red" stroke-opacity=".7" stroke-dasharray="3 4"/>`;if(o)b+=`<line x1="${n(rows[o-1][j][0])}" y1="${n(rows[o-1][j][1])}" x2="${n(x)}" y2="${n(y)}" class="s-pap" stroke-opacity=".18"/>`;
  if(r()<.3){const dx=(x-ex),dy=(y-ey),l=Math.hypot(dx,dy);b+=`<line x1="${n(x)}" y1="${n(y)}" x2="${n(ex+dx/l*ER)}" y2="${n(ey+dy/l*ER)}" class="s-pap" stroke-opacity=".16"/>`}}));
 rows.flat().forEach(([x,y])=>b+=`<rect x="${n(x-7)}" y="${n(y-1.5)}" width="14" height="3" class="a-pap" fill-opacity=".8"/><circle cx="${n(x)}" cy="${n(y)}" r="2.6" class="a-red"/>`);return b},
storage(r,W,H){let b=`<rect width="${W}" height="${H}" class="a-ink"/>`;const cols=10,rows=4,gx=W*.06,gy=H*.1,cw=(W-gx*2)/cols,ch=H*.44/rows;
 for(let i=0;i<cols;i++)for(let j=0;j<rows;j++){const v=r();b+=`<rect x="${n(gx+i*cw+3)}" y="${n(gy+j*ch+3)}" width="${n(cw-6)}" height="${n(ch-6)}" class="${v<.22?'a-red':'a-pap'} s-pap" fill-opacity="${v<.22?.85:n(.05+r()*.15)}" stroke-opacity=".35"/>`}
 const y0=H*.92,top=H*.62,pts=[];for(let i=0;i<=48;i++){const t=i/48,v=.5+.38*Math.sin(t*Math.PI*2-1.2)+.06*(r()-.5);pts.push([gx+t*(W-gx*2),y0-v*(y0-top)])}
 const line=pts.map((p,i)=>`${i?'L':'M'}${n(p[0])} ${n(p[1])}`).join('');
 b+=`<line x1="${n(gx)}" x2="${n(W-gx)}" y1="${n(y0)}" y2="${n(y0)}" class="s-pap" stroke-opacity=".3"/><path d="${line}L${n(W-gx)} ${n(y0)}L${n(gx)} ${n(y0)}Z" class="a-red" fill-opacity=".14"/><path d="${line}" fill="none" class="s-red" stroke-width="2"/>`;
 ['00:00','06:00','12:00','18:00','24:00'].forEach((t,i)=>b+=`<text x="${n(gx+i/4*(W-gx*2))}" y="${n(H*.985)}" font-size="${n(H*.035)}" text-anchor="middle" class="a-pap" fill-opacity=".5" style="font-family:var(--f-mono)">${t}</text>`);return b},
tokamak(r,W,H,id){const cx=W*.56,cy=H/2,m=H*.4;let b=`<defs><radialGradient id="tg${id}" cx=".45" cy=".5" r=".6"><stop offset="0" style="stop-color:var(--red)"/><stop offset=".55" style="stop-color:var(--red);stop-opacity:.35"/><stop offset="1" style="stop-color:var(--red);stop-opacity:0"/></radialGradient></defs><rect width="${W}" height="${H}" class="a-ink"/>`;
 const D=s=>{const x0=cx-m*.55*s,xr=cx+m*.95*s;return`M${n(x0)} ${n(cy-m*s)}C${n(xr)} ${n(cy-m*s-m*.08*s)} ${n(xr)} ${n(cy+m*s+m*.08*s)} ${n(x0)} ${n(cy+m*s)}Z`};
 b+=`<rect x="${n(cx-m*1.05)}" y="${n(cy-m*1.1)}" width="${n(m*.2)}" height="${n(m*2.2)}" class="a-pap s-pap" fill-opacity=".1" stroke-opacity=".4"/><path d="${D(1.34)}" fill="none" class="s-pap" stroke-opacity=".14" stroke-width="${n(m*.08)}"/><path d="${D(1.34)}" fill="none" class="s-pap" stroke-opacity=".45"/><path d="${D(1.12)}" fill="none" class="s-pap" stroke-opacity=".75" stroke-width="2"/><path d="${D(.95)}" fill="url(#tg${id})"/>`;
 for(let k=1;k<8;k++)b+=`<path d="${D(.95-k*.11)}" fill="none" class="${k==3?'s-red':'s-pap'}" stroke-opacity="${k==3?.95:.28}"/>`;
 [[-.15,-1.3],[.75,-.95],[1.1,0],[.75,.95],[-.15,1.3]].forEach(([a,c])=>b+=`<rect x="${n(cx+a*m-7)}" y="${n(cy+c*m-7)}" width="14" height="14" class="a-pap" fill-opacity=".6"/>`);
 b+=`<text x="${n(W*.04)}" y="${n(H*.2)}" font-size="${n(H*.04)}" class="a-pap" fill-opacity=".6" style="font-family:var(--f-mono)">Ip 8.7 MA</text><text x="${n(W*.04)}" y="${n(H*.26)}" font-size="${n(H*.04)}" class="a-red" style="font-family:var(--f-mono)">B0 12.2 T</text>`;return b},
portrait(r,W,H,id){const dx=(r()-.5)*24,hs=.92+r()*.16,cx=W/2+dx,hy=H*.37,rx=W*.19*hs,ry=H*.17*hs;
 let b=`<defs><linearGradient id="pb${id}" x2="0" y2="1"><stop offset="0" style="stop-color:var(--paper-hi)"/><stop offset="1" style="stop-color:#7b838f"/></linearGradient><linearGradient id="pf${id}" x2="1" y2="1"><stop offset="0" style="stop-color:#a3aab3"/><stop offset=".5" style="stop-color:#3c434e"/><stop offset="1" style="stop-color:#14181e"/></linearGradient></defs><rect width="${W}" height="${H}" fill="url(#pb${id})"/>`;
 b+=`<path d="M${n(cx-W*.44)} ${H}C${n(cx-W*.42)} ${n(H*.7)} ${n(cx-W*.22)} ${n(H*.64)} ${n(cx)} ${n(H*.64)}C${n(cx+W*.22)} ${n(H*.64)} ${n(cx+W*.42)} ${n(H*.7)} ${n(cx+W*.44)} ${H}Z" fill="url(#pf${id})"/><rect x="${n(cx-W*.07)}" y="${n(hy+ry*.6)}" width="${n(W*.14)}" height="${n(H*.14)}" fill="url(#pf${id})"/><ellipse cx="${n(cx)}" cy="${n(hy)}" rx="${n(rx)}" ry="${n(ry)}" fill="url(#pf${id})"/>`;
 if(r()>.25)b+=`<path d="M${n(cx-rx*1.02)} ${n(hy)}C${n(cx-rx*1.05)} ${n(hy-ry*1.4)} ${n(cx+rx*1.05)} ${n(hy-ry*1.4)} ${n(cx+rx*1.02)} ${n(hy)}C${n(cx+rx*.7)} ${n(hy-ry*.55)} ${n(cx-rx*.6)} ${n(hy-ry*.6)} ${n(cx-rx*1.02)} ${n(hy)}Z" style="fill:#14181e" fill-opacity=".9"/>`;
 return b+`<path d="M${n(cx-W*.1)} ${n(H*.66)}L${n(cx)} ${n(H*.78)}L${n(cx+W*.1)} ${n(H*.66)}" fill="none" class="s-pap" stroke-opacity=".7" stroke-width="3"/>`},
pcb(r,W,H){const g=20;let b=`<rect width="${W}" height="${H}" class="a-ink"/>`;
 for(let t=0;t<34;t++){let x=0,y=Math.round(r()*H/g)*g,d=`M0 ${y}`;const hot=r()<.12;
  while(x<W){x+=g*(2+Math.floor(r()*6));d+=`L${x} ${y}`;if(r()<.6){const s=(r()<.5?-1:1)*g*(1+Math.floor(r()*2));x+=Math.abs(s);y=Math.min(H-g,Math.max(g,y+s));d+=`L${x} ${y}`}}
  b+=`<path d="${d}" fill="none" class="${hot?'s-red':'s-pap'}" stroke-opacity="${hot?.95:n(.12+r()*.22)}" stroke-width="${hot?2.4:1.6}" stroke-linejoin="round"/>`}
 for(let i=0;i<46;i++)b+=`<circle cx="${Math.round(r()*W/g)*g}" cy="${Math.round(r()*H/g)*g}" r="4" class="a-ink s-pap" stroke-opacity=".5"/>`;
 const cs=Math.min(W,H)*.3,cx=W*.55,cy=H*.48;for(let i=0;i<14;i++){const t=-cs/2+cs*(i+.5)/14;b+=`<g class="s-pap" stroke-opacity=".7" stroke-width="2"><line x1="${n(cx+t)}" x2="${n(cx+t)}" y1="${n(cy-cs/2-10)}" y2="${n(cy+cs/2+10)}"/><line y1="${n(cy+t)}" y2="${n(cy+t)}" x1="${n(cx-cs/2-10)}" x2="${n(cx+cs/2+10)}"/></g>`}
 return b+`<rect x="${n(cx-cs/2)}" y="${n(cy-cs/2)}" width="${n(cs)}" height="${n(cs)}" rx="4" style="fill:#1f252e" class="s-pap" stroke-opacity=".6"/><circle cx="${n(cx-cs/2+12)}" cy="${n(cy-cs/2+12)}" r="4" class="a-red"/><text x="${n(cx)}" y="${n(cy+5)}" text-anchor="middle" font-size="${n(cs*.11)}" class="a-pap" fill-opacity=".7" style="font-family:var(--f-mono)">CVL-7</text>`},
depth(r,W,H){const mid=W/2,N=22;let b=`<rect width="${W}" height="${H}" class="a-pap"/>`;for(let k=1;k<5;k++)b+=`<line x1="0" x2="${W}" y1="${n(H*k/5)}" y2="${n(H*k/5)}" class="s-ink" stroke-opacity=".12"/>`;
 const side=dir=>{let y=H*.92,x=mid,p=`M${mid} ${H}`;for(let i=0;i<N;i++){const nx=mid+dir*(i+1)*(mid/N);y=Math.max(H*.08,y-r()*H*.04*(1+i*.06));p+=`L${n(x)} ${n(y)}L${n(nx)} ${n(y)}`;x=nx}return p+`L${n(x)} ${H}Z`};
 return b+`<path d="${side(-1)}" style="fill:#2a313c"/><path d="${side(1)}" class="a-red"/><line x1="${mid}" x2="${mid}" y1="0" y2="${H}" class="s-ink" stroke-dasharray="4 4"/>`},
spectrum(r,W,H){const N=56,bw=W/N,pk=[.18,.41,.66].map(c=>c*N);let b=`<rect width="${W}" height="${H}" class="a-ink"/>`;
 for(let i=0;i<N;i++){let v=.08+r()*.12;pk.forEach((p,j)=>v+=(.75-j*.15)*Math.exp(-((i-p)**2)/(2*(1.6+j)**2)));v=Math.min(.95,v);const h=v*H*.9,hot=pk.some(p=>Math.abs(i-p)<1.2);
  b+=`<rect x="${n(i*bw+bw*.15)}" y="${n(H-h)}" width="${n(bw*.7)}" height="${n(h)}" class="${hot?'a-red':'a-pap'}" fill-opacity="${hot?1:n(.35+v*.6)}"/>`}return b},
contour(r,W,H){let b=`<rect width="${W}" height="${H}" class="a-pap"/>`;
 [[W*.38,H*.45,1.2],[W*.76,H*.66,.75]].forEach(([cx,cy,sc],ci)=>{const p1=r()*6,p2=r()*6;for(let k=1;k<=12;k++){const r0=k*Math.min(W,H)*.045*sc;let d='';
  for(let i=0;i<=72;i++){const t=i/72*Math.PI*2,rr=r0*(1+.16*Math.sin(3*t+p1+k*.15)+.08*Math.sin(5*t+p2));d+=`${i?'L':'M'}${n(cx+rr*Math.cos(t))} ${n(cy+rr*Math.sin(t))}`}
  const hot=ci==0&&k==7;b+=`<path d="${d}Z" fill="none" class="${hot?'s-red':'s-ink'}" stroke-opacity="${hot?1:(k%4==0?.7:.32)}" stroke-width="${hot?2:(k%4==0?1.4:.8)}"/>`}
  b+=`<path d="M${n(cx-6)} ${n(cy)}h12M${n(cx)} ${n(cy-6)}v12" class="s-red" stroke-width="1.5"/>`});return b}
};
/* Data-driven art: the same plates, drawn from the real picks. */
let D = null;
Object.assign(G, {
// The wafer, with one die per recent pick: orange for a win, ink for a loss, grey for a push. opt narrows any plate to one capper.
tally(r, W, H, id, opt) {
  const cx = W / 2, cy = H / 2, R0 = Math.min(W, H) / 2 - 14, st = R0 / 8.2, res = D ? pick(opt).recent : [];
  let b = `<defs><radialGradient id="wg${id}" cx=".36" cy=".3" r=".9"><stop offset="0" style="stop-color:var(--paper-hi)"/><stop offset=".55" style="stop-color:#8b939e"/><stop offset="1" style="stop-color:#262c35"/></radialGradient></defs><rect width="${W}" height="${H}" class="a-ink"/><circle cx="${cx}" cy="${cy}" r="${R0}" fill="url(#wg${id})"/>`;
  let k = 0;
  for (let y = cy - R0; y < cy + R0; y += st) for (let x = cx - R0; x < cx + R0; x += st) {
    if (Math.hypot(x + st / 2 - cx, y + st / 2 - cy) > R0 - st * .75) continue;
    const v = res[k++], c = v === "W" ? "a-red" : v === "L" ? "a-ink" : v ? "a-mid" : "a-pap", o = v ? 1 : .25;
    b += `<rect x="${n(x + 1)}" y="${n(y + 1)}" width="${n(st - 2)}" height="${n(st - 2)}" class="${c} s-ink" fill-opacity="${o}" stroke-opacity=".45" stroke-width=".7"/>`;
  }
  return b + `<path d="M${n(cx - 9)} ${n(cy + R0)}l9-11 9 11z" class="a-ink"/><circle cx="${cx}" cy="${cy}" r="${R0}" fill="none" class="s-pap" stroke-opacity=".5"/>`;
},
// Running total in units for each capper, with the whole team (or the chosen capper) drawn in orange.
runs(r, W, H, id, opt) {
  let b = `<rect width="${W}" height="${H}" class="a-ink"/>`;
  for (let k = 1; k < 8; k++) b += `<line x1="${n(W * k / 8)}" x2="${n(W * k / 8)}" y1="0" y2="${H}" class="s-pap" stroke-opacity=".08"/>`;
  for (let k = 1; k < 6; k++) b += `<line y1="${n(H * k / 6)}" y2="${n(H * k / 6)}" x1="0" x2="${W}" class="s-pap" stroke-opacity=".08"/>`;
  if (!D || !D.days.length) return b;
  const all = [...D.series.map(s => s.pts), D.team], vals = all.flat();
  const mx = Math.max(0, ...vals), mn = Math.min(0, ...vals), N = D.days.length - 1 || 1;
  const X = i => n(W * .06 + i / N * W * .88), Y = v => n(H * .1 + (mx - v) / (mx - mn || 1) * H * .78);
  b += `<line x1="${X(0)}" x2="${X(N)}" y1="${Y(0)}" y2="${Y(0)}" class="s-pap" stroke-opacity=".35" stroke-dasharray="4 5"/>`;
  const hot = opt ? D.series.findIndex(s => slug(s.name) === opt) : all.length - 1;
  all.forEach((pts, c) => {
    if (opt && c === all.length - 1) return;
    const team = c === hot;
    b += `<path d="${pts.map((v, i) => `${i ? "L" : "M"}${X(i)} ${Y(v)}`).join("")}" fill="none" class="${team ? "s-red" : "s-pap"}" stroke-opacity="${team ? 1 : n(.3 + c * .12)}" stroke-width="${team ? 2.5 : 1.2}"/>`;
  });
  return b;
},
// One candle per month: where the team's running total opened and closed, and its high and low.
months(r, W, H, id, opt) {
  let b = `<rect width="${W}" height="${H}" class="a-pap"/>`;
  for (let k = 1; k < 6; k++) b += `<line x1="0" x2="${W}" y1="${n(H * k / 6)}" y2="${n(H * k / 6)}" class="s-ink" stroke-opacity=".12"/>`;
  const d = D ? pick(opt).candles : [];
  if (!d.length) return b;
  const cw = W / Math.max(d.length, 8), x0 = (W - cw * d.length) / 2;
  const mx = Math.max(...d.map(x => x[2])), mn = Math.min(...d.map(x => x[3])), Y = v => n(H * .1 + (mx - v) / (mx - mn || 1) * H * .8);
  d.forEach(([o, c, hi, lo], i) => {
    const x = x0 + i * cw + cw / 2;
    b += `<line x1="${n(x)}" x2="${n(x)}" y1="${Y(hi)}" y2="${Y(lo)}" class="s-ink" stroke-width="1.2"/><rect x="${n(x - cw * .32)}" y="${Math.min(Y(o), Y(c))}" width="${n(cw * .64)}" height="${n(Math.max(1.5, Math.abs(Y(o) - Y(c))))}" class="${c >= o ? "a-red" : "a-ink"}"/>`;
  });
  return b;
},
// Net units by sport, best first. Winning sports are orange bars, losing ones hang below the line in grey.
sports(r, W, H, id, opt) {
  let b = `<rect width="${W}" height="${H}" class="a-ink"/>`;
  const s = D ? pick(opt).sports : [];
  if (!s.length) return b;
  const mx = Math.max(0, ...s.map(x => x.net)), mn = Math.min(0, ...s.map(x => x.net)), span = mx - mn || 1;
  const bw = W * .88 / s.length, zero = H * .12 + mx / span * H * .7, fs = n(Math.min(H * .06, bw * .3));
  s.forEach((x, i) => {
    const h = Math.abs(x.net) / span * H * .7, X = W * .06 + i * bw, up = x.net >= 0;
    b += `<rect x="${n(X + bw * .15)}" y="${n(up ? zero - h : zero)}" width="${n(bw * .7)}" height="${n(Math.max(1.5, h))}" class="${up ? "a-red" : "a-mid"}"/>`;
    b += `<text x="${n(X + bw / 2)}" y="${n(H * .96)}" font-size="${fs}" text-anchor="middle" class="a-pap" fill-opacity=".6" style="font-family:var(--f-mono)">${x.short}</text>`;
  });
  return b + `<line x1="${n(W * .04)}" x2="${n(W * .96)}" y1="${n(zero)}" y2="${n(zero)}" class="s-pap" stroke-opacity=".5"/>`;
}
});
const pick = opt => (opt && D.by[opt]) || D;
// How many dies fit on the wafer, so the caption can say how many picks it shows.
const DIES = (() => { let k = 0; const R0 = 186, st = R0 / 8.2; for (let y = -R0; y < R0; y += st) for (let x = -R0; x < R0; x += st) if (Math.hypot(x + st / 2, y + st / 2) <= R0 - st * .75) k++; return k; })();
const draw = (root, live) => root.querySelectorAll(live ? "[data-art][data-live]" : "[data-art]").forEach((el, i) => {
  const fn = G[el.dataset.art]; if (!fn) return;
  const [W, H] = (el.dataset.vb || "400 400").split(" ").map(Number), id = el.dataset.id || (el.dataset.id = "a" + i);
  try { el.innerHTML = `<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid ${el.dataset.fit || "slice"}" aria-hidden="true" focusable="false">${fn(R(+(el.dataset.seed || i + 1)), W, H, id, el.dataset.opt)}</svg>`; } catch (e) { console.error(e); }
});

/* ---------- The numbers ---------- */
const SHORT = { NBA: "NBA", WNBA: "WNBA", NFL: "NFL", CFB: "CFB", MLB: "MLB", UNR: "UNR", FIBA: "FIBA", SOC: "SOC" };
const ROLE = { caleb: "Head of Notify", sammy: "Basketball", quentin: "Football", footy: "Soccer" };
const slug = c => c.toLowerCase().replace(/[^a-z0-9]+/g, "-");
const TEAM_URL = "https://dubclub.win/NotifyPicks/";
function crunch(x) {
  const rows = [...x.rows].sort((a, b) => a.date < b.date ? -1 : 1), sn = s => x.sportNames[s] || s;
  const days = [...new Set(rows.map(r => r.date))];
  const cum = rs => { const by = {}; rs.forEach(r => by[r.date] = (by[r.date] || 0) + r.net); let t = 0; return days.map(d => t += by[d] || 0); };
  const sportsOf = rs => { const c = {}; rs.forEach(r => c[r.sport] = (c[r.sport] || 0) + 1); return Object.keys(c).sort((a, b) => c[b] - c[a]).map(sn); };
  const cappers = x.cappers.map(name => {
    const rs = rows.filter(r => r.capper === name), bio = x.bios[slug(name)] || {}, link = bio.link || "";
    return { name, slug: slug(name), rs, a: x.agg(rs), sports: sportsOf(rs), bio, url: bio.url || TEAM_URL, logo: bio.logo,
      price: (link.match(/\$\d+(?:\.\d+)?\/mo/) || [""])[0], plat: (link.match(/^\S+/) || ["DubClub"])[0],
      role: ROLE[slug(name)] || "Capper", first: (bio.text || "").split(/,|\./)[0] };
  });
  // The plates' data for a set of picks: recent results, monthly candles of the running total, and net units by sport.
  const plates = rs => {
    const months = {}; let t = 0;
    rs.forEach(r => { const m = r.date.slice(0, 7), o = months[m] || (months[m] = [t, t, t, t]); t += r.net; o[1] = t; o[2] = Math.max(o[2], t); o[3] = Math.min(o[3], t); });
    const bySport = {}; rs.forEach(r => (bySport[r.sport] = bySport[r.sport] || []).push(r));
    return { candles: Object.keys(months).sort().slice(-24).map(m => months[m]), recent: rs.slice(-DIES).reverse().map(r => r.res),
      sports: Object.entries(bySport).map(([k, s]) => ({ k, short: SHORT[k] || k.slice(0, 4), net: x.agg(s).net })).sort((p, q) => q.net - p.net) };
  };
  return {
    rows, days, team: cum(rows), a: x.agg(rows), cappers, series: cappers.map(c => ({ name: c.name, pts: cum(c.rs) })), ...plates(rows),
    by: Object.fromEntries(cappers.map(c => [c.slug, plates(c.rs)])), first: rows.length ? x.fmtDate(rows[0].date) : "",
    fmtU: x.fmtU, fmtP: x.fmtP,
  };
}
const len = s => String(s).length;
// Every live number on the page, keyed by its data-k slot.
function fills(d) {
  const f = { "net": d.fmtU(d.a.net), "roi": d.fmtP(d.a.roi), "picks": d.a.n.toLocaleString("en-US"), "hit": (d.a.hit * 100).toFixed(1) + "%",
    "since": d.first, "recent": Math.min(d.rows.length, DIES) + "", "record": `${d.a.w}–${d.a.l}` };
  d.cappers.forEach(c => {
    f[c.slug + "-net"] = d.fmtU(c.a.net);
    f[c.slug + "-sports"] = c.sports.join(" · ") || "Picks loading";
    f[c.slug + "-result"] = `${c.a.w}–${c.a.l} record · ${d.fmtP(c.a.roi)} ROI · ${c.a.n} picks graded`;
    f[c.slug + "-list"] = c.sports.slice(0, 4).map(s => `<li>${s}</li>`).join("");
    f[c.slug + "-chipv"] = c.sports.slice(0, 2).join(", ") || "—";
  });
  return f;
}
function fill(root, d) {
  const f = fills(d);
  root.querySelectorAll("[data-k]").forEach(el => { const v = f[el.dataset.k]; if (v == null) return; el.innerHTML = v; if (el.style.getPropertyValue("--len")) el.style.setProperty("--len", len(el.textContent)); });
}

/* ---------- Markup ---------- */
const chev = '<svg viewBox="0 0 10 16" aria-hidden="true"><path d="M2 2l6 6-6 6" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>';
const qmark = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 18h6l2-6V5H3v7h3zm10 0h6l2-6V5h-8v7h3z" fill="currentColor"/></svg>';
const down = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 6l5 5 5-5" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>';
const ext = 'target="_blank" rel="noopener"';
const PLAT_LOGO = { DubClub: "logos/dubclub.png", Patreon: "logos/patreon.png", Winible: "logos/winible.png", Whop: "logos/whop.png" };
const ALT = { runs: "Running total in units", months: "Running total as monthly candles", tally: "Recent picks, one square each", sports: "Net units by sport" };
const ART = { caleb: ["runs", 23, "600 400"], sammy: ["months", 31, "600 400"], quentin: ["tally", 41, "400 400"], footy: ["sports", 53, "600 400"] };
function markup(d) {
  const C = d.cappers, names = C.map(c => c.name), list = names.slice(0, -1).join(", ") + " and " + names[names.length - 1];
  const f = fills(d), k = (key, tag = "span", extra = "") => `<${tag} data-k="${key}"${extra}>${f[key] ?? ""}</${tag}>`;
  const big = (key) => `<b data-k="${key}" style="--len:${len(f[key])}">${f[key]}</b>`;
  return `
<svg width="0" height="0" style="position:absolute" aria-hidden="true">
  <symbol id="sym-orbit" viewBox="-160 -160 320 170">
    <g fill="none" stroke="currentColor" stroke-width="1.2" vector-effect="non-scaling-stroke">
      <ellipse cx="0" cy="-75" rx="150" ry="34"/><ellipse cx="0" cy="-75" rx="150" ry="34" transform="rotate(28 0 -75)"/>
      <ellipse cx="0" cy="-75" rx="150" ry="34" transform="rotate(-28 0 -75)" stroke-dasharray="4 6"/><ellipse cx="0" cy="-75" rx="58" ry="58" stroke-dasharray="1 5"/>
      <circle class="sym-core" cx="0" cy="-75" r="28"/><circle cx="0" cy="-75" r="16"/><path d="M-10 -75h20M0 -85v20"/>
    </g>
    <circle class="sym-node" cx="132.4" cy="-4.6" r="5"/><circle class="sym-node" cx="132.4" cy="-145.4" r="5"/><circle class="sym-node" cx="-150" cy="-75" r="5"/><circle class="sym-node" cx="0" cy="-109" r="4"/>
  </symbol>
</svg>

<section class="cover" id="ct-cover">
  <div class="cover-pin">
    <div class="cover-stage" data-cover-stage>
      <svg class="dandelion dandelion--l" aria-hidden="true"><use href="#sym-orbit"/></svg>
      <svg class="dandelion dandelion--r" aria-hidden="true"><use href="#sym-orbit"/></svg>
      <div class="cover-head">
        <h1 class="cover-title"><span class="mast" style="--len:6" data-mast>notify</span><span class="cover-tag">Four specialists. Every pick graded.</span></h1>
        <a class="cover-mail tlink" href="${TEAM_URL}" ${ext}>dubclub.win/NotifyPicks</a>
      </div>
      <div class="cover-art" data-burst>
        <svg class="cover-lines" viewBox="-1500 -1500 3000 3000" aria-hidden="true"><line x1="-299.3" y1="20.9" x2="-1496.3" y2="104.6"/><line x1="-311.6" y1="-25.8" x2="-1494.9" y2="-123.8"/><line x1="-309" y1="-82.4" x2="-1449.4" y2="-386.5"/><line x1="-297.7" y1="-148.2" x2="-1342.8" y2="-668.4"/><line x1="-277.7" y1="-211.4" x2="-1193.6" y2="-908.5" class="dash"/><line x1="-235.6" y1="-248.5" x2="-1032.1" y2="-1088.5"/><line x1="-201.2" y1="-275.4" x2="-884.9" y2="-1211.2"/><line x1="-139.6" y1="-319.3" x2="-601" y2="-1374.3" class="dash"/><line x1="-83.2" y1="-345.5" x2="-351.2" y2="-1458.3"/><line x1="-15.6" y1="-334.3" x2="-70.1" y2="-1498.4"/><line x1="54.7" y1="-317.7" x2="254.6" y2="-1478.2" class="dash"/><line x1="118.8" y1="-297.1" x2="556.9" y2="-1392.8" class="dash"/><line x1="165.7" y1="-280.4" x2="763.1" y2="-1291.4" class="dash"/><line x1="228.3" y1="-243.1" x2="1026.9" y2="-1093.4"/><line x1="250.1" y1="-172" x2="1235.8" y2="-850.2" class="dash"/><line x1="301.6" y1="-135.3" x2="1368.6" y2="-614"/><line x1="340.8" y1="-97.8" x2="1441.8" y2="-413.6" class="dash"/><line x1="318.4" y1="-38" x2="1489.4" y2="-178"/></svg>
        <div class="arch-line"></div>
        <div class="arch" data-arch>
          <div class="rays-turn" data-rays-turn><div class="rays"></div></div>
          <div class="arch-dots"></div>
          <div class="arch-grain"></div>
        </div>
        <span class="ray-word ray-word--a" data-fly>Research</span>
        <span class="ray-word ray-word--b" data-fly>Notify</span>
        <figure class="print" data-print>
          <div class="ht"><div class="ht-scr"><div class="art" data-art="tally" data-live data-seed="11" data-vb="400 400" role="img" aria-label="A wafer with one square per recent pick: orange for a win, ink for a loss"></div></div></div>
          <figcaption>Last ${k("recent")} picks</figcaption>
        </figure>
        <figure class="cv-f cv-f--a" data-fly><div class="ph"><div class="art" data-art="die" data-seed="3" data-vb="300 350" role="img" aria-label="A chip die, drawn in code"></div></div></figure>
        <figure class="cv-f cv-f--b" data-fly><div class="ph"><div class="art" data-art="orbit" data-seed="5" data-vb="300 300" role="img" aria-label="A planet with three orbits"></div></div></figure>
        <figure class="cv-f cv-f--c" data-fly><div class="ph"><div class="art" data-art="months" data-live data-seed="8" data-vb="300 420" role="img" aria-label="The team's running total as monthly candles"></div></div></figure>
        <figure class="cv-f cv-f--d" data-fly><div class="ph"><div class="art" data-art="runs" data-live data-seed="2" data-vb="520 400" role="img" aria-label="Running total in units for each capper"></div></div></figure>
        <p class="bubble" data-fly><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.5 2 4 14h7l-1.5 8L19 10h-7z" fill="currentColor"/></svg><span>${k("net")} net, every pick graded</span></p>
      </div>
      <div class="cover-chips">
        <p class="ct-chip"><span class="chip-k">Plate</span><span class="chip-v">Our last picks, drawn from the tracker</span></p>
        <a class="btn" href="${TEAM_URL}" ${ext}><span>Join Notify</span><span class="btn-v">DubClub</span></a>
      </div>
    </div>
  </div>
  <div class="cover-extra ct-wrap">
    <nav class="cover-aside toc" aria-label="On this tab">
      <ul>
        <li><a href="#" data-goto="ct-people"><b>Meet the four cappers</b>${chev}<small>The team</small></a></li>
        <li><a href="#" data-goto="ct-pricing"><b>Premium picks, one link each</b>${chev}<small>Plans</small></a></li>
        <li><a href="#" data-goto="ct-contact"><b>Where to find us</b>${chev}<small>Contact</small></a></li>
      </ul>
    </nav>
    <p class="cover-no"><b>${C.length}</b><span>specialists, one Notify team</span></p>
  </div>
</section>

<section class="contents" id="ct-contents">
  <div class="ct-wrap contents-grid">
    <div class="contents-head">
      <svg class="dandelion-s" viewBox="-160 -160 320 170" aria-hidden="true"><use href="#sym-orbit"/></svg>
      <h2 class="h2" data-split>${C.length} specialists, one feed</h2>
      <p class="lede" data-reveal>Each of us covers the sports we know best. Follow the whole team on Notify, or pick one capper and subscribe on their own platform.</p>
    </div>
    <ul>
      <li class="svc" data-rule>
        <h3>Notify</h3>
        <span class="svc-price">team · DubClub</span>
        <p>Picks from ${list}, sent from one place.</p>
        <ul class="svc-list">${[...new Set(C.flatMap(c => c.sports))].slice(0, 6).map(s => `<li>${s}</li>`).join("")}</ul>
      </li>
      ${C.map(c => `<li class="svc" data-rule>
        <h3>${c.name}</h3>
        <span class="svc-price">${c.price ? "from " + c.price : c.plat}</span>
        <p>${c.bio.text || ""}</p>
        <ul class="svc-list" data-k="${c.slug}-list">${f[c.slug + "-list"]}</ul>
      </li>`).join("")}
    </ul>
  </div>
</section>

<section class="feature" id="ct-feature">
  <div class="ct-wrap feature-grid">
    <figure class="reg" data-reg>
      <div class="reg-stack">
        <div class="reg-plate reg-plate--k ht" data-plate-k><div class="ht-scr"><div class="art" data-art="orbit" data-seed="19" data-vb="400 500" role="img" aria-label="A planet with three orbits, drawn in code"></div></div></div>
      </div>
      <svg class="reg-mark tl" viewBox="0 0 44 44" aria-hidden="true" data-mark-k><circle cx="22" cy="22" r="11"/><line x1="22" y1="2" x2="22" y2="42"/><line x1="2" y1="22" x2="42" y2="22"/></svg>
      <svg class="reg-mark br" viewBox="0 0 44 44" aria-hidden="true" data-mark-k><circle cx="22" cy="22" r="11"/><line x1="22" y1="2" x2="22" y2="42"/><line x1="2" y1="22" x2="42" y2="22"/></svg>
      <figcaption class="ct-chip"><span class="chip-k">Galaxy</span><span class="chip-v">Every player is a star</span></figcaption>
    </figure>
    <div class="feature-text">
      <h2 class="h2 reg-title" data-reg-title>Every pick, graded in public.</h2>
      <p class="lede" data-reveal>Every pick we send is logged in the tracker and graded on this site. Open any tab to see the record, the units and the ROI.</p>
      <div class="cols" data-reveal>
        <p class="dropcap">Units are our standard stake size, so results compare fairly no matter how much you bet per play. ROI is net units divided by units risked.</p>
        <p>Since ${k("since")} we have graded ${k("picks")} picks, going ${k("record")} for ${k("net")} and a ${k("roi")} return on every unit risked.</p>
      </div>
      <p class="sign" data-reveal>${list}</p>
    </div>
  </div>
</section>

<section class="work ramp-top" id="ct-work">
  <div class="ct-wrap work-head">
    <h2 class="h2" data-split>Four cappers, every record public</h2>
    <p class="lede" data-reveal>Each capper's own results, straight from the tracker. Open their tab for every pick.</p>
  </div>
  <div class="work-pin" data-track>
    <div class="work-stage">
      <div class="work-track">
        ${C.map(c => { const [art, seed, vb] = ART[c.slug] || ["curve", 7, "600 400"]; return `<article class="spread">
          <figure class="spread-ph ph"><div class="art" data-art="${art}" data-opt="${c.slug}" data-live data-seed="${seed}" data-vb="${vb}" data-fit="meet" role="img" aria-label="${ALT[art]} for ${c.name}"></div></figure>
          <div class="spread-txt">
            <p class="spread-year">${big(c.slug + "-net")}<span data-k="${c.slug}-sports">${f[c.slug + "-sports"]}</span></p>
            <h3 class="spread-name">${c.name}</h3>
            <p>${c.bio.text || ""}</p>
            <p class="spread-result"><span data-k="${c.slug}-result">${f[c.slug + "-result"]}</span> · <a class="tlink" href="#${c.slug}">See every pick</a></p>
          </div>
        </article>`; }).join("")}
      </div>
    </div>
  </div>
</section>

<section class="ct-team" id="ct-people">
  <div class="ct-wrap">
    <div class="team-head">
      <h2 class="h2" data-split>Four cappers, one team</h2>
      <p class="lede" data-reveal>Basketball, football and soccer, covered by the people who bet them every day.</p>
    </div>
    <ul class="people" data-people>
      ${C.map((c, i) => `<li class="person">
        <div class="person-arch ht"><div class="ht-scr"><div class="art" data-art="portrait" data-seed="${[61, 72, 88, 97][i % 4]}" data-vb="300 400" role="img" aria-label="Halftone portrait silhouette standing in for ${c.name}"></div></div></div>
        <h3 class="person-name">${c.name}</h3>
        <p class="ct-chip"><span class="chip-k">${c.role}</span><span class="chip-v" data-k="${c.slug}-chipv">${f[c.slug + "-chipv"]}</span></p>
        <p class="person-note">${c.bio.text || ""} <a class="tlink" href="${c.url}" ${ext}>${c.plat}</a></p>
      </li>`).join("")}
    </ul>
  </div>
</section>

<section class="voices ramp-top" id="ct-voices">
  <div class="ct-wrap voices-head">
    <h2 class="h2" data-split>What subscribers say</h2>
    <p class="lede" data-reveal>Subscriber reviews are coming soon.</p>
  </div>
  <div class="marquee" data-marquee>
    <ul class="mq-track">
      ${C.map(c => `<li class="quote">${qmark}<blockquote>[A ${c.name} subscriber's review goes here.]</blockquote><p class="quote-by"><b>[Subscriber]</b><span>${c.name} on ${c.plat}</span></p></li>`).join("")}
      <li class="quote">${qmark}<blockquote>[A Notify subscriber's review goes here.]</blockquote><p class="quote-by"><b>[Subscriber]</b><span>Notify on DubClub</span></p></li>
    </ul>
  </div>
</section>

<section class="pricing ramp-top" id="ct-pricing">
  <div class="ct-wrap">
    <div class="pricing-head">
      <h2 class="h2" data-split>Premium picks, one link each</h2>
      <div class="bill" role="group" aria-label="Show" data-bill>
        <button type="button" class="bill-opt" aria-pressed="true" data-bill-set="once">Price</button>
        <button type="button" class="bill-opt" aria-pressed="false" data-bill-set="monthly">Platform</button>
      </div>
    </div>
    <ul class="tags" data-tags>
      <li class="tag tag--hot">
        <h3 class="tag-name">Notify</h3>
        <p class="tag-for">The whole team in one feed.</p>
        <p class="tag-price"><b class="bill-once" style="--len:5">All ${C.length}</b><b class="bill-monthly" style="--len:7">DubClub</b><span class="bill-once">cappers, one subscription</span><span class="bill-monthly">where the team posts</span></p>
        <ul class="tag-list">${C.map(c => `<li>${c.name}</li>`).join("")}</ul>
        <a class="btn" href="${TEAM_URL}" ${ext}><span>Join Notify</span></a>
      </li>
      ${C.map(c => `<li class="tag">
        <h3 class="tag-name">${c.name}</h3>
        <p class="tag-for">${c.first || c.role}.</p>
        <p class="tag-price"><b class="bill-once" style="--len:${len(c.price || c.plat)}">${c.price || c.plat}</b><b class="bill-monthly" style="--len:${len(c.plat)}">${c.plat}</b><span class="bill-once">as low as, on ${c.plat}</span><span class="bill-monthly"><img class="tag-logo" src="${PLAT_LOGO[c.plat] || c.logo || ""}" alt="" width="18" height="18">their own platform</span></p>
        <ul class="tag-list" data-k="${c.slug}-list">${f[c.slug + "-list"]}</ul>
        <a class="btn btn--light" href="${c.url}" ${ext}><span>Join ${c.name}</span></a>
      </li>`).join("")}
    </ul>
    <p class="pricing-note">Prices are each platform's lowest listed tier. Check the platform for current pricing and what each tier includes.</p>
  </div>
</section>

<section class="faq" id="ct-faq">
  <div class="ct-wrap">
    <div class="faq-head">
      <h2 class="h2" data-split>Questions people ask us first</h2>
      <p class="lede" data-reveal>Anything else, find the team at <a class="tlink" href="${TEAM_URL}" ${ext}>dubclub.win/NotifyPicks</a>.</p>
    </div>
    <div class="qa-list">
      <details class="qa" data-rule><summary><span>What is a unit?</span>${down}</summary><div class="qa-a"><p>Our standard stake size. Results are counted in units so they compare fairly no matter how much you bet per play.</p></div></details>
      <details class="qa" data-rule><summary><span>How is ROI worked out?</span>${down}</summary><div class="qa-a"><p>Net units divided by units risked, across every graded pick.</p></div></details>
      <details class="qa" data-rule><summary><span>Which sports do you cover?</span>${down}</summary><div class="qa-a"><p>${C.map(c => `${c.name}: <span data-k="${c.slug}-sports">${f[c.slug + "-sports"]}</span>.`).join(" ")}</p></div></details>
      <details class="qa" data-rule><summary><span>Are leans counted in the record?</span>${down}</summary><div class="qa-a"><p>No. Leans are left out of the record. Every other pick counts, win or lose.</p></div></details>
      <details class="qa" data-rule><summary><span>Where can I see past picks?</span>${down}</summary><div class="qa-a"><p>On this site. The <a class="tlink" href="#team">Notify tab</a> has every team pick, each capper has a tab of their own, and every tab ends with a searchable pick log.</p></div></details>
    </div>
  </div>
</section>

<section class="contact" id="ct-contact">
  <svg class="contact-burst" aria-hidden="true" data-burst-lines></svg>
  <div class="contact-sun" aria-hidden="true" data-sun><div class="contact-sun-rays"></div><div class="arch-grain"></div></div>
  <div class="ct-wrap contact-in">
    <div class="contact-intro" data-burst-center>
      <h2 class="contact-title">Pick your specialist.</h2>
      <p class="lede contact-lede">Join the whole team on DubClub, or follow one capper on their own platform.</p>
    </div>
    <div class="contact-card">
      <dl class="contact-list">
        <div><dt>Notify team</dt><dd><a class="tlink" href="${TEAM_URL}" ${ext}>dubclub.win/NotifyPicks</a></dd></div>
        ${C.map(c => `<div><dt>${c.name} · ${c.plat}</dt><dd><a class="tlink" href="${c.url}" ${ext}>${c.url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}</a></dd></div>`).join("")}
      </dl>
      <div class="contact-ctas">
        <p class="meta">Start here</p>
        <a class="btn" href="${TEAM_URL}" ${ext}><span>Join Notify</span><span class="btn-v">DubClub</span></a>
        ${C.map(c => `<a class="btn btn--light" href="${c.url}" ${ext}><span>Follow ${c.name}</span><span class="btn-v">${c.plat}</span></a>`).join("")}
      </div>
    </div>
  </div>
</section>

<div class="site-foot ramp-top">
  <div class="ct-wrap">
    <div class="foot-grid">
      <div><h3>Notify team</h3><ul><li><a class="tlink" href="${TEAM_URL}" ${ext}>DubClub</a></li></ul></div>
      <div><h3>Cappers</h3><ul>${C.map(c => `<li><a class="tlink" href="${c.url}" ${ext}>${c.name} on ${c.plat}</a></li>`).join("")}</ul></div>
      <div><h3>Results</h3><ul><li><a class="tlink" href="#team">Notify</a></li>${C.map(c => `<li><a class="tlink" href="#${c.slug}">${c.name}</a></li>`).join("")}<li><a class="tlink" href="#galaxy">Galaxy</a></li></ul></div>
    </div>
    <div class="foot-base">
      <p class="ct-chip"><span class="chip-k">© ${new Date().getFullYear()}</span><span class="chip-v">NotifyPicks</span></p>
      <p class="ct-chip"><span class="chip-k">Graded</span><span class="chip-v">every pick, win or lose</span></p>
    </div>
  </div>
</div>`;
}

/* ---------- Behaviour ---------- */
const $ = (s, r) => r.querySelector(s), $$ = (s, r) => [...r.querySelectorAll(s)];
const init = (root, sel, fn) => $$(sel, root).forEach(el => { try { fn(el); } catch (e) { console.error(e); } });
const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const loadScript = src => new Promise((ok, no) => { const s = document.createElement("script"); s.src = src; s.onload = ok; s.onerror = no; document.head.appendChild(s); });
const GSAP = "https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/";

function wire(root) {
  // In-page links scroll; they can't use #hashes because the hash picks the tab.
  $$("[data-goto]", root).forEach(a => a.addEventListener("click", e => { e.preventDefault(); const t = document.getElementById(a.dataset.goto); if (t) t.scrollIntoView({ behavior: reduced() ? "auto" : "smooth" }); }));
  init(root, "[data-proofs]", list => [...list.children].forEach((c, i) => { c.style.setProperty("--i", i); c.style.setProperty("--tilt", (i % 2 ? 0.9 : -0.7) + "deg"); }));
  // The two-plate print: a second, orange copy of the plate, slightly out of register.
  init(root, "[data-reg]", fig => {
    const k = $("[data-plate-k]", fig); if (!k) return;
    const r = k.cloneNode(true); r.removeAttribute("data-plate-k"); r.classList.remove("reg-plate--k"); r.classList.add("reg-plate--r", "ht--red"); r.setAttribute("aria-hidden", "true");
    const a = $(".art", r); if (a) { a.removeAttribute("role"); a.removeAttribute("aria-label"); }
    k.after(r); fig.__plateR = r;
    fig.__marksR = $$("[data-mark-k]", fig).map(m => { const c = m.cloneNode(true); c.removeAttribute("data-mark-k"); c.classList.add("reg-mark--r"); m.after(c); return c; });
  });
  init(root, "[data-bill]", bill => {
    const host = bill.closest("section"), opts = $$("[data-bill-set]", bill);
    opts.forEach(o => o.addEventListener("click", () => { opts.forEach(x => x.setAttribute("aria-pressed", x === o)); host.setAttribute("data-bill-state", o.dataset.billSet); }));
  });
  // Sunburst lines around the contact headline, measured from the headline itself.
  init(root, "[data-burst-lines]", svg => {
    const sec = svg.closest("section"), c = $("[data-burst-center]", sec); if (!c) return;
    const NS = "http://www.w3.org/2000/svg", n = innerWidth < 700 ? 24 : 38, items = [];
    for (let i = 0; i < n; i++) {
      const l = document.createElementNS(NS, "line"); l.setAttribute("pathLength", "1"); if (i % 4 === 2) l.setAttribute("class", "dash"); svg.append(l);
      const dot = i % 3 === 0 ? document.createElementNS(NS, "circle") : null; if (dot) { dot.setAttribute("r", "6.5"); svg.append(dot); }
      items.push({ l, dot, a: (i + 0.35 * Math.sin(i * 2.1)) / n * Math.PI * 2 });
    }
    svg.__burst = items;
    const draw = () => {
      const sr = sec.getBoundingClientRect(), cr = c.getBoundingClientRect(); if (!sr.width) return;
      const W = sr.width, H = sr.height, cx = cr.left - sr.left + cr.width / 2, cy = cr.top - sr.top + cr.height / 2;
      const rx = cr.width / 2 + 36, ry = cr.height / 2 + 36, R = Math.hypot(Math.max(cx, W - cx), Math.max(cy, H - cy));
      svg.setAttribute("viewBox", "0 0 " + W + " " + H);
      items.forEach(({ l, dot, a }, i) => {
        const cos = Math.cos(a), sin = Math.sin(a), r0 = 1 / Math.sqrt(cos * cos / (rx * rx) + sin * sin / (ry * ry)), r1 = dot ? r0 + 70 + i * 53 % 150 : R;
        l.setAttribute("x1", cx + cos * r0); l.setAttribute("y1", cy + sin * r0); l.setAttribute("x2", cx + cos * r1); l.setAttribute("y2", cy + sin * r1);
        if (dot) { dot.setAttribute("cx", cx + cos * (r1 + 6.5)); dot.setAttribute("cy", cy + sin * (r1 + 6.5)); }
      });
    };
    root.__burstDraw = draw; draw();
    let t; addEventListener("resize", () => { clearTimeout(t); t = setTimeout(draw, 150); });
    if (document.fonts) document.fonts.ready.then(draw);
  });
  init(root, "[data-marquee]", mq => {
    const track = $(".mq-track", mq); if (!track || !track.children.length) return;
    [...track.children].forEach(li => { const c = li.cloneNode(true); c.setAttribute("aria-hidden", "true"); track.append(c); });
    const setDur = () => track.style.setProperty("--mq-dur", Math.max(30, track.scrollWidth / 2 / 38) + "s"); setDur(); addEventListener("resize", setDur);
  });
}

// Scroll animation from the reference, run once GSAP has loaded.
function animate(root) {
  const { gsap, ScrollTrigger } = window;
  gsap.registerPlugin(ScrollTrigger); if (window.SplitText) gsap.registerPlugin(window.SplitText);
  const onNear = (els, fn, margin = "0px 0px -12% 0px") => { if (!els.length) return; const io = new IntersectionObserver(es => es.forEach(e => { if (!e.isIntersecting) return; io.unobserve(e.target); try { fn(e.target); } catch (err) { console.error(err); } }), { rootMargin: margin }); els.forEach(el => io.observe(el)); };
  onNear($$("[data-reveal]", root), el => gsap.fromTo(el, { opacity: 0, y: 36 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out", clearProps: "transform" }));
  onNear($$("[data-rule]", root), el => { el.classList.add("ruled"); gsap.fromTo(el.children, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.06, ease: "power3.out", clearProps: "transform" }); });
  if (!window.SplitText) $$("[data-split]", root).forEach(el => el.style.visibility = "visible");
  else document.fonts.ready.then(() => onNear($$("[data-split]", root), el => window.SplitText.create(el, { type: "lines", mask: "lines", autoSplit: true, onSplit: s => { gsap.set(el, { visibility: "visible" }); return gsap.from(s.lines, { yPercent: 105, duration: 1.05, stagger: 0.09, ease: "power4.out" }); } })));
  // The cover: as you scroll, the masthead letters and the floating plates blow outward and the sunburst turns.
  init(root, "[data-cover-stage]", stage => {
    const art = $("[data-burst]", stage), turn = $("[data-rays-turn]", stage), pin = stage.parentElement, flyers = art ? $$("[data-fly]", art) : [];
    new IntersectionObserver(es => es.forEach(e => stage.classList.toggle("is-off", !e.isIntersecting))).observe(stage);
    if (!art) return;
    const tl = gsap.timeline({ scrollTrigger: { trigger: pin, start: "top top", end: "bottom bottom", scrub: 0.6, invalidateOnRefresh: true } });
    const origin = () => { const r = art.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height * 0.6 }; };
    flyers.forEach((f, i) => {
      const vec = () => { const o = origin(), r = f.getBoundingClientRect(), dx = r.left + r.width / 2 - o.x, dy = r.top + r.height / 2 - o.y, d = Math.hypot(dx, dy) || 1; return { x: dx / d, y: dy / d }; };
      const k = 0.75 + i % 3 * 0.2;
      tl.to(f, { xPercent: () => vec().x * 260 * k, yPercent: () => vec().y * 220 * k, x: () => vec().x * innerWidth * 0.18 * k, y: () => vec().y * innerHeight * 0.2 * k, rotation: (i % 2 ? 1 : -1) * (18 + i * 5), ease: "power2.in", duration: 1 }, 0);
    });
    if (turn) tl.to(turn, { rotation: 55, scale: 1.25, ease: "none", duration: 1 }, 0);
    tl.to($$(".arch, .arch-line", art), { scale: 1.32, transformOrigin: "50% 100%", ease: "power1.inOut", duration: 1 }, 0);
    const lines = $(".cover-lines", art); if (lines) tl.to(lines, { scale: 1.35, rotation: -8, ease: "none", duration: 1 }, 0);
    const print = $("[data-print]", art); if (print) tl.to(print, { rotation: 0, scale: 1.18, yPercent: -6, ease: "power2.inOut", duration: 1 }, 0);
    const head = $(".cover-head", stage); if (head) tl.to(head, { yPercent: -55, ease: "power1.in", duration: 1 }, 0);
    const dands = $$(".dandelion", stage); if (dands.length) tl.to(dands, { opacity: 0, y: -60, ease: "power1.in", duration: 0.6 }, 0);
    const chips = $(".cover-chips", stage); if (chips) tl.to(chips, { opacity: 0, y: 30, duration: 0.4 }, 0);
    const mast = $("[data-mast]", stage);
    if (mast && window.SplitText) document.fonts.ready.then(() => {
      const split = window.SplitText.create(mast, { type: "chars", charsClass: "mast-ch" }), n = split.chars.length, mid = (n - 1) / 2;
      split.chars.forEach((c, i) => { const off = n > 1 ? (i - mid) / mid : 0; tl.to(c, { xPercent: off * 150, yPercent: -20 - Math.abs(off) * 60, rotation: off * 22, ease: "power1.inOut", duration: 1 }, 0); });
      ScrollTrigger.refresh();
    });
  });
  init(root, "[data-reg]", fig => {
    const k = $("[data-plate-k]", fig), r = fig.__plateR, marksR = fig.__marksR || []; if (!k || !r) return;
    const title = $("[data-reg-title]", fig.closest("section"));
    const tl = gsap.timeline({ scrollTrigger: { trigger: fig, start: "top 85%", end: "center 45%", scrub: 0.8 } });
    tl.fromTo(r, { xPercent: -7, yPercent: 5, rotation: -2.2 }, { xPercent: 0, yPercent: 0, rotation: 0, ease: "power2.out", duration: 1 }, 0)
      .fromTo(k, { xPercent: 4, yPercent: -3 }, { xPercent: 0, yPercent: 0, ease: "power2.out", duration: 1 }, 0)
      .fromTo(marksR, { x: -26, y: 18 }, { x: 0, y: 0, ease: "power2.out", duration: 1 }, 0);
    if (title) tl.fromTo(title, { "--mx": "0.09em", "--my": "-0.06em" }, { "--mx": "0em", "--my": "0em", ease: "power2.out", duration: 1 }, 0.1);
  });
  // The capper spreads slide sideways while the section is pinned.
  init(root, "[data-track]", pin => {
    const track = $(".work-track", pin); if (!track) return;
    [...track.children].forEach((c, i) => c.style.setProperty("--tilt", (i % 2 ? 0.8 : -1) + "deg"));
    const dist = () => Math.max(0, track.scrollWidth - innerWidth), setDist = () => pin.style.setProperty("--dist", dist() + "px"); setDist();
    gsap.to(track, { x: () => -dist(), ease: "none", scrollTrigger: { trigger: pin, start: "top top", end: () => "+=" + dist(), scrub: 0.5, invalidateOnRefresh: true, onRefreshInit: setDist } });
  });
  onNear($$(".fig-list", root), list => gsap.fromTo($$("[data-stamp] b", list), { opacity: 0, scale: 1.45, rotation: -9 }, { opacity: 1, scale: 1, rotation: 0, duration: 0.55, stagger: 0.14, ease: "back.out(2.2)", clearProps: "transform" }), "0px 0px -20% 0px");
  onNear($$("[data-people]", root), list => {
    list.classList.add("is-in");
    gsap.fromTo($$(".person-arch", list), { clipPath: "inset(100% 0 0 0)" }, { clipPath: "inset(0% 0 0 0)", duration: 1.3, stagger: 0.12, ease: "power3.inOut", clearProps: "clipPath" });
    gsap.from($$(".person-arch .art", list), { scale: 1.18, duration: 1.6, stagger: 0.12, ease: "power3.out", clearProps: "transform" });
  }, "0px 0px -15% 0px");
  init(root, "[data-marquee]", mq => new IntersectionObserver(es => es.forEach(e => mq.classList.toggle("is-off", !e.isIntersecting))).observe(mq));
  onNear($$("[data-develop]", root), grid => $$(".g", grid).forEach((g, i) => setTimeout(() => { g.classList.add("is-in"); setTimeout(() => g.classList.add("is-done"), 1400); }, i * 160)), "0px 0px -18% 0px");
  onNear($$("[data-tags]", root), list => gsap.fromTo([...list.children], { opacity: 0, y: -70, rotation: i => i % 2 ? 5 : -4 }, { opacity: 1, y: 0, rotation: 0, duration: 0.9, stagger: 0.13, ease: "back.out(1.6)", clearProps: "transform" }), "0px 0px -15% 0px");
  init(root, "[data-burst-lines]", svg => {
    const items = svg.__burst, sec = svg.closest("section"); if (!items) return;
    const sun = $("[data-sun]", sec);
    new IntersectionObserver(es => es.forEach(e => sec.classList.toggle("is-off", !e.isIntersecting))).observe(sec);
    const tl = gsap.timeline({ scrollTrigger: { trigger: sec, start: "top 80%", end: "center 50%", scrub: 0.7 } });
    tl.fromTo(items.map(x => x.l), { strokeDasharray: "1 1", strokeDashoffset: 1 }, { strokeDashoffset: 0, ease: "power2.out", duration: 1, stagger: { each: 0.02, from: "random" } }, 0);
    const dots = items.map(x => x.dot).filter(Boolean);
    if (dots.length) tl.fromTo(dots, { scale: 0, transformOrigin: "50% 50%" }, { scale: 1, ease: "back.out(3)", duration: 0.3, stagger: { each: 0.03, from: "random" } }, 0.75);
    if (sun) tl.fromTo(sun, { yPercent: 75 }, { yPercent: 0, ease: "power2.out", duration: 1.2 }, 0);
  });
}

let root = null, gsapState = "none";
function mount(host, d) {
  root = host;
  host.innerHTML = markup(d);
  draw(host);
  wire(host);
  if (reduced()) return;
  // Hidden-until-animated states only apply under .motion, so the tab is complete if GSAP never arrives.
  host.classList.add("motion");
  const bail = setTimeout(() => { if (gsapState !== "ready") host.classList.remove("motion"); }, 4000);
  gsapState = "loading";
  loadScript(GSAP + "gsap.min.js").then(() => Promise.all([loadScript(GSAP + "ScrollTrigger.min.js"), loadScript(GSAP + "SplitText.min.js").catch(() => {})]))
    .then(() => {
      if (!host.classList.contains("motion")) return;
      clearTimeout(bail); gsapState = "ready";
      try { animate(host); } catch (e) { console.error(e); host.classList.remove("motion"); }
    })
    .catch(() => { clearTimeout(bail); host.classList.remove("motion"); });
}
let lastRows = null;
window.NotifyContact = {
  show(host, data) {
    D = crunch(data);
    if (!root) { mount(host, D); lastRows = data.rows; }
    else if (data.rows !== lastRows) { lastRows = data.rows; fill(root, D); draw(root, true); }
    requestAnimationFrame(() => { if (root.__burstDraw) root.__burstDraw(); if (gsapState === "ready") window.ScrollTrigger.refresh(); });
  },
};
})();
