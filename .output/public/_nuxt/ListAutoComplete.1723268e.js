import{u as p}from"./root.dae782a6.js";import{B as l,N as m,r as d,o as c,c as i,f,Q as y}from"./entry.0a92484f.js";import"./query.16828b1f.js";import"./preview.befd0c73.js";const V={__name:"ListAutoComplete",props:{data:{type:Object,required:!0,default:()=>({})}},setup(s){const e=s,o=p(),t=l({get(){return o[e.data.type].form[e.data.key]},set(a){o.updateForm({key:e.data.key,value:a,type:e.data.type})}});return m(()=>{console.log(e.data)}),(a,r)=>{const u=d("v-autocomplete");return c(),i(u,{modelValue:f(t),"onUpdate:modelValue":r[0]||(r[0]=n=>y(t)?t.value=n:null),items:e.data.items},null,8,["modelValue","items"])}}};export{V as default};
