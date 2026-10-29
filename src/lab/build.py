import sys,os
d=os.path.dirname(os.path.abspath(__file__))
css=open(os.path.join(d,'../app/styles.css')).read()+open(os.path.join(d,'extra.css')).read()
js=open(os.path.join(d,'lab.js')).read()
js+="\ndocument.getElementById('menu').onclick=()=>document.getElementById('side').classList.toggle('open');document.getElementById('exlist').addEventListener('click',()=>document.getElementById('side').classList.remove('open'));"
assert '</script' not in js
h=open(os.path.join(d,'shell.html')).read().replace('/*CSS*/',css).replace('/*JS*/',js)
open(sys.argv[1],'w').write(h); print(len(h))
