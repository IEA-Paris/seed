import{f as r,n,M as c,J as h,S as o,N as l,o as u,c as d,i as f}from"./entry.38098624.js";const g=["src","alt","width","height"],p=r({__name:"ProseImg",props:{src:{type:String,default:""},alt:{type:String,default:""},width:{type:[String,Number],default:void 0},height:{type:[String,Number],default:void 0}},setup(e){const t=e,a=n(()=>{var i;if((i=t.src)!=null&&i.startsWith("/")&&!t.src.startsWith("//")){const s=c(h(o().app.baseURL));if(s!=="/"&&!t.src.startsWith(s))return l(s,t.src)}return t.src});return(i,s)=>(u(),d("img",{src:f(a),alt:e.alt,width:e.width,height:e.height},null,8,g))}});export{p as default};
