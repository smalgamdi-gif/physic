import sys
d=sys.argv[1]; out=sys.argv[2]
shell=open(d+'/shell.html',encoding='utf-8').read()
css=open(d+'/styles.css',encoding='utf-8').read()
js='\n'.join(open(d+'/'+f,encoding='utf-8').read() for f in ['../shared/rtl.js','content1.js','content2.js','content3.js','content_words.js','content_forms.js','content_found.js','content_serway.js','content_ar.js','app.js'])
assert '</script' not in js
html=shell.replace('/*CSS*/',css).replace('/*JS*/',js)
open(out,'w',encoding='utf-8').write(html)
print(len(html))
