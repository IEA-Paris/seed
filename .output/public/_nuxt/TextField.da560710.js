import{u as p}from"./root.dae782a6.js";import{B as u,N as m,r as d,o as c,c as v,O as f,f as g,Q as i}from"./entry.0a92484f.js";import"./query.16828b1f.js";import"./preview.befd0c73.js";const B={__name:"TextField",props:{args:{type:Object,required:!0,default:()=>({})},level:{type:Array,required:!0}},setup(s){const e=s,o=p(),t=u({get(){return o.getKey({key:e.args.key,level:e.level,store:o[e.args.type].form})},set(r){console.log("props.level: ",e.level),o.updateForm({key:e.args.key,value:r,type:e.args.type,level:e.level})}});return m(()=>{console.log("ARGS",e.args)}),(r,l)=>{const a=d("v-text-field");return c(),v(a,f({modelValue:g(t),"onUpdate:modelValue":l[0]||(l[0]=n=>i(t)?t.value=n:null)},r.$attrs),null,16,["modelValue"])}}};export{B as default};
