import{g as w,u as k,h as b,r as t,o as l,d as m,a as e,w as o,f as a,b as C,t as A,F as B,e as D,c as N,i as j}from"./entry.0a92484f.js";import{u as q}from"./asyncData.63291627.js";import{u as F}from"./composables.62e22472.js";import{q as L}from"./query.16828b1f.js";import{u as O}from"./root.dae782a6.js";import"./preview.befd0c73.js";const R={style:{"background-color":"white"}},H={__name:"[slug]",async setup(S){let n,c;O();const r=w();k();const{$i18n:d}=j();F(),console.log("route.params.slug: ",r.params.slug);const{data:s}=([n,c]=b(()=>q("fellowship",()=>L("fellowship/"+d.locale.value+"/"+r.params.slug).findOne())),n=await n,c(),n);return console.log("data: ",s),(_,V)=>{const f=t("v-img"),v=t("v-card-text"),p=t("v-col"),u=t("v-row"),g=t("v-expansion-panel"),x=t("v-expansion-panels"),h=t("v-card"),y=t("v-container");return l(),m("section",R,[e(y,null,{default:o(()=>[e(u,null,{default:o(()=>[e(p,{cols:"12"},{default:o(()=>[e(f,{block:"",src:a(s).picture,height:"250px"},null,8,["src"]),e(v,{class:"my-6"},{default:o(()=>[C(A(a(s).description),1)]),_:1})]),_:1})]),_:1}),e(u,{"no-gutters":""},{default:o(()=>[e(p,{cols:"12"},{default:o(()=>[e(h,{class:"d-flex flex-column justify-center",link:""},{default:o(()=>[e(x,{eager:"",ripple:""},{default:o(()=>[(l(!0),m(B,null,D(Object.keys(a(s).details),i=>(l(),N(g,{key:_.i,title:_.$t(i),style:{"white-space":"pre"},text:a(s).details[i]},null,8,["title","text"]))),128))]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})])}}};export{H as default};
