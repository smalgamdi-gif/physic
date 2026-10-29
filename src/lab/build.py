import sys,os
d=os.path.dirname(os.path.abspath(__file__))
css=open(os.path.join(d,'../app/styles.css'),encoding='utf-8').read()+open(os.path.join(d,'extra.css'),encoding='utf-8').read()
js=open(os.path.join(d,'../shared/rtl.js'),encoding='utf-8').read()+'\n'+open(os.path.join(d,'lab.js'),encoding='utf-8').read()
js+="\n(function(){const side=document.getElementById('side'),wide=matchMedia('(min-width: 861px)');let closed=false;try{closed=localStorage.getItem('lab-side')==='closed'}catch(e){}document.body.classList.toggle('side-closed',closed);document.getElementById('menu').onclick=()=>{if(wide.matches){closed=!closed;document.body.classList.toggle('side-closed',closed);try{localStorage.setItem('lab-side',closed?'closed':'open')}catch(e){}}else side.classList.toggle('open');};})();document.getElementById('exlist').addEventListener('click',()=>document.getElementById('side').classList.remove('open'));"
assert '</script' not in js
h=open(os.path.join(d,'shell.html'),encoding='utf-8').read().replace('/*CSS*/',css).replace('/*JS*/',js)
open(sys.argv[1],'w',encoding='utf-8').write(h); print(len(h))
