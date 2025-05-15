var m=Object.defineProperty;var p=(n,t,e)=>t in n?m(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e;var i=(n,t,e)=>p(n,typeof t!="symbol"?t+"":t,e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const d of a.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&s(d)}).observe(document,{childList:!0,subtree:!0});function e(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerPolicy&&(a.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?a.credentials="include":r.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(r){if(r.ep)return;r.ep=!0;const a=e(r);fetch(r.href,a)}})();class b{constructor(t,e){this.parent=t,this.data=e}addListeners(t,e){document.getElementById(`btn-delete-${e.id}`).addEventListener("click",t)}getHTML(t){return`
                <button class="btn btn-danger flex-grow-1" data-id = ${t.id} id = "btn-delete-${t.id}" style = "max-width: 100px; background: #e9e9e9; border:#e9e9e9; color:black;" >Удалить</button>
            `}render(t,e){const s=this.getHTML(e);this.parent.insertAdjacentHTML("beforeend",s),this.addListeners(t,e)}}class f{constructor(t,e){this.parent=t,this.data=e}getHTML(t){return`
                 <p>
                 <span class = "badge bg-secondary m-1" id = "tag-${this.data.id}-${t}">
                    ${t}
                 </span>
                 </p>
        `}render(t){const e=this.getHTML(t);this.parent.insertAdjacentHTML("beforeend",e)}}class y{constructor(t,e,s){this.parent=t,this.mainPage=e,this.data=s}addListeners(t,e,s){document.getElementById(`click-card-${t.id}`).addEventListener("click",e),document.getElementById(`edit-card-${t.id}`).addEventListener("click",s)}getButtonsRoot(){return document.getElementById(`card-buttons-${this.buttonData.id}`)}getTagsRoot(){return document.getElementById(`tags-${this.buttonData.id}`)}getHTML(t){return`
            <div class="card m-2 d-flex flex-column align-items-stretch" style="max-width: 300px; flex: 1 1 300px; ">
                <img class="card-img-top" src="${t.src}" alt="картинка">
                <div class="card-body d-flex flex-column align-items-between">
                    <h5 class="card-title">${t.title}  </h5>
                    <p class="card-text">${t.text}</p>
                    <div id = "tags-${t.id}" class = "d-flex flex-wrap" ></div>
                    <div id = "card-buttons-${t.id}" class = "mt-auto" > 
                        <div  class = "d-flex justify-content-between mb-2" >
                            <button class="btn btn-primary" style = "background: #e60023; border:#e60023"   id="click-card-${t.id}" data-id = ${t.id}>Подробнее</button>
                            <button class="btn btn-primary" style = "background: #e60023; border:#e60023"   id="edit-card-${t.id}" data-id = ${t.id}>Изменить</button>
                        </div>
                    </div>
                </div>
            </div>
        `}render(t,e,s,r){this.buttonData=t;const a=this.getHTML(t);this.parent.insertAdjacentHTML("beforeend",a),new b(this.getButtonsRoot()).render(s,t),t.tags.forEach(g=>{new f(this.getTagsRoot(),this.data).render(g)}),this.addListeners(t,e,r)}}class v{constructor(t){this.parent=t}getHTML(){return`
             <button type="submit" id = "new-card-add" class="btn btn-primary w-100" style="background:#e60023; border:#e60023">Добавить карточку</button>
        `}addListeners(t){document.getElementById("new-card-add").addEventListener("click",t)}render(t){this.parent.insertAdjacentHTML("beforeend",this.getHTML()),this.addListeners(t)}}class T{constructor(t){this.parent=t}getHTML(){return`
             <button type="submit" id = "card-update" class="btn btn-primary w-100" style="background:#e60023; border:#e60023">Обновить карточку</button>
        `}addListeners(t){document.getElementById("card-update").addEventListener("click",t)}render(t){this.parent.insertAdjacentHTML("beforeend",this.getHTML()),this.addListeners(t)}}class L{constructor(){this.baseUrl="http://localhost:3000"}getPosts(){return`${this.baseUrl}/posts`}getPostById(t){return`${this.baseUrl}/posts/${t}`}getPostsByTitle(t){return`${this.baseUrl}/posts?title=${t}`}createPost(){return`${this.baseUrl}/posts`}removePostById(t){return`${this.baseUrl}/posts/${t}`}updatePostById(t){return`${this.baseUrl}/posts/${t}`}}const l=new L;class u{constructor(t){i(this,"clickAdd",async()=>{try{fetch(l.createPost(),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(this.getFormData())}).then(()=>{new c(this.parent).render()})}catch(t){console.log(t)}});i(this,"fillFields",async t=>{try{fetch(l.getPostById(t)).then(e=>e.json()).then(e=>{document.getElementById("title").value=e.title,document.getElementById("text").value=e.text,document.getElementById("src").value=e.src,document.getElementById("tags-input").value=e.tags})}catch(e){console.log(e)}});i(this,"clickUpdate",async()=>{try{fetch(l.updatePostById(this.currentCard),{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify(this.getFormData())}).then(()=>{new c(this.parent).render()})}catch(t){console.log(t)}});this.parent=t,this.currentCard=null}getButtonRoot(){return document.getElementById("add-card-form")}getHTML(){return`
                <div class="container py-5">
    <h2 class="mb-4 text-center">Добавить новую карточку</h2>

    <form id="add-card-form" class="bg-white p-4 rounded shadow-sm">
      <div class="mb-3">
        <label for="title" class="form-label">Название</label>
        <input type="text" class="form-control" id="title" placeholder="Заголовок карточки" >
      </div>

      <div class="mb-3">
        <label for="src" class="form-label">Ссылка на изображение</label>
        <input type="url" class="form-control" id="src" placeholder="https://example.com/image.jpg" >
      </div>

      <div class="mb-3">
        <label for="text" class="form-label">Описание</label>
        <textarea class="form-control"  id="text" rows="3" placeholder="Описание карточки..." ></textarea>
      </div>

      <div class="mb-3">
        <label for="tags-input" class="form-label">Теги (через запятую)</label>
        <input type="text" class="form-control" id="tags-input" placeholder="Например: пейзаж, фотография">
      </div>

    </form>
  </div>    
        `}getFormData(){return{title:document.getElementById("title").value,src:document.getElementById("src").value,text:document.getElementById("text").value,tags:document.getElementById("tags-input").value.split(",")}}render(t=null){this.parent.innerHTML="";const e=this.getHTML();new h(this.parent,this.data).render(),this.parent.insertAdjacentHTML("beforeend",e),t==null?new v(this.getButtonRoot()).render(this.clickAdd.bind(this)):(this.currentCard=t,this.fillFields(this.currentCard),new T(this.getButtonRoot()).render(this.clickUpdate.bind(this)))}}class h{constructor(t){this.parent=t}getHTML(){return`
                <header class=" py-3 mb-5"  >
                    <div class="container">
                        <div class="d-flex justify-content-between align-items-center" id = "header-main">
                            <h1 class="m-0" id = "home-button" style = "cursor:pointer;">Фотохостинг</h1>
                        </div>
                    </div>
                </header>
            `}getBackButtonRoot(){return document.getElementById("header-main")}clickHome(){const t=new c(this.parent);o.clearTags(),t.render()}addListeners(t){document.getElementById("home-button").addEventListener("click",t)}render(){const t=this.getHTML();this.parent.insertAdjacentHTML("afterbegin",t),this.addListeners(this.clickHome.bind(this))}}class w{constructor(t){this.parent=t}addListeners(t){document.getElementById("add-button").addEventListener("click",t)}getHTML(){return'<button type = "button" id = "add-button" class = "btn btn-primary" style = "width: 150px; background:#e60023; border:#e60023">Добавить </button>'}render(t){const e=this.getHTML();this.parent.insertAdjacentHTML("beforeend",e),this.addListeners(t)}}class H{constructor(t){this.parent=t}getHTML(){return`
             <div class="col-md-6">
                <div class="input-group">
                    <input type="text" class="form-control" id="search-input" placeholder="Поиск...">
                    <button class="btn btn-outline-secondary" id="search-btn" type="button">Найти</button>
                </div>
            </div>
        `}addListeners(t){document.getElementById("search-btn").addEventListener("click",()=>{const e=document.getElementById("search-input").value;t(e)})}render(t){const e=this.getHTML();this.parent.insertAdjacentHTML("beforeend",e),this.addListeners(t)}}class B{constructor(t){this.parent=t}getOptionsRoot(){return document.getElementById("main-options")}getHTML(){return`
                <div class="row g-3 justify-content-around mb-3" id = "main-options">
                
                </div>
            `}clickAdd(){new u(this.parent).render()}isPolindrom(t){const e=String(t).toLowerCase().replace(/[^а-яa-z0-9]/g,"");return e==e.split("").reverse().join("")}isPolindrom2(t){const e=String(t).toLowerCase().replace(/[^а-яa-z0-9]/g,"");let s=0,r=e.length-1;for(;s<r;){if(e[s]!==e[r])return!1;s++,r--}if(e[s]===e[r])return!0}clickPolindrom(){}sumOfSquares(t){return t.reduce((e,s)=>e+s*s,0)}sumOfUnic(t){return[...new Set(t)].reduce((s,r)=>s+r,0)}clickSortPopular(){const t=new Map;this.data.forEach(r=>{r.tags.forEach(a=>{t.set(a,(t.get(a)||0)+1)})}),this.data.forEach(r=>{const a=[...r.tags].map(d=>t.get(d));r.stats=this.sumOfSquares(a)});const e=[...this.data].sort((r,a)=>a.stats-r.stats);new c(this.parent,this.allData).render(e)}getSelectedTags(){this.getTags().forEach(t=>{document.getElementById(`tag-${t}`).checked?o.addTag(t):o.getSelectedTags().includes(t)&&o.removeTag(t)})}hasCommon(t,e){return e.length==0?!0:t.some(s=>e.includes(s))}clickTagFilter(){this.getSelectedTags();const t=this.allData.filter(s=>this.hasCommon(s.tags,o.getSelectedTags()));new c(this.parent,this.allData).render(t)}getTags(){const t=new Set;return this.allData.forEach(e=>{e.tags.forEach(s=>{t.add(s)})}),Array.from(t).sort((e,s)=>s.localeCompare(e))}resetFilter(){const t=new c(this.parent,this.allData);o.clearTags(),t.render(this.allData)}clickSearch(t){new c(this.parent).render(t)}render(){const t=this.getHTML();this.parent.insertAdjacentHTML("beforeend",t),new w(this.getOptionsRoot()).render(this.clickAdd.bind(this)),new H(this.getOptionsRoot()).render(r=>{this.clickSearch(r)}),this.sumOfUnic([1,1,1,12,3])}}class M{constructor(t,e){this.parent=t,this.cards=e}isEqualObj(t,e){if(!t||!e||!t.tags||!e.tags||t.id==e.id)return!1;const s=new Set(t.tags),r=new Set(e.tags);let a=0;for(const d of s)if(r.has(d)&&(a++,a>=3))return!0;return!1}getRoot(t){return document.getElementById(`similar-for-card-${t.id}`)}getHTML(t){return`
                    <div id = "similar-for-card-${t.id}"> </div>
                `}render(t){const e=this.getHTML(t);this.parent.insertAdjacentHTML("beforeend",e),this.cards.filter(s=>this.isEqualObj(s,t)).forEach(s=>{new E(this.getRoot(t),this.cards).render(s)})}}class P{constructor(t){this.parent=t}getHTML(t){return`
                <div class="card mb-3" style="width: 540px;">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src="${t.src}" class="img-fluid" alt="картинка">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">${t.title}</h5>
                                <p class="card-text">${t.text}</p>
                            </div>
                        </div>
                    </div>
                </div>
            `}render(t){const e=this.getHTML(t);this.parent.insertAdjacentHTML("beforeend",e),new M(this.parent).render(t)}}class E{constructor(t){this.parent=t}getHTML(t){return`
                <div class="card mb-3" style="width: 540px;">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src="${t.src}" class="img-fluid" alt="картинка">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">${t.title}</h5>
                                <p class="card-text">${t.text}</p>
                            </div>
                        </div>
                    </div>
                </div>
            `}render(t){const e=this.getHTML(t);this.parent.insertAdjacentHTML("beforeend",e)}}class x{constructor(t,e){i(this,"getData",async()=>{try{fetch(l.getPostById(this.id)).then(t=>t.json()).then(t=>{this.renderData(t)})}catch(t){console.log(t)}});this.parent=t,this.id=e}renderData(t){new P(this.pageRoot()).render(t)}pageRoot(){return document.getElementById("product-page")}getHTML(){return`
                <div id="product-page"> </div>
            `}render(){this.parent.innerHTML="";const t=this.getHTML();new h(this.parent,this.data).render(),this.parent.insertAdjacentHTML("beforeend",t),this.getData()}}class c{constructor(t){i(this,"clickDelete",async t=>{const e=t.target.dataset.id;try{fetch(l.removePostById(e),{method:"DELETE"}).then(()=>this.render())}catch(s){console.log(s)}});i(this,"getDataFromServer",async()=>{try{fetch(l.getPosts()).then(t=>t.json()).then(t=>this.renderData(t))}catch(t){console.log(t)}});i(this,"getFilteredData",async t=>{try{fetch(l.getPostsByTitle(t)).then(e=>e.json()).then(e=>this.renderData(e))}catch(e){console.log(e)}});this.parent=t}getRoot(){return document.getElementById("main-page")}getMainRoot(){return document.getElementById("main")}getHtml(){return`<div id = "main">
                   <div id="main-page" class="d-flex flex-wrap align-items-stretch" style="max-width: 1000px; margin: 0 auto; gap: 16px;"> </div>
                </div>
                `}clickCard(t){const e=t.target.dataset.id;new x(this.parent,e).render()}editCard(t){const e=t.target.dataset.id;new u(this.parent).render(e)}renderData(t){t.forEach(e=>{new y(this.getRoot(),this,t).render(e,this.clickCard.bind(this),this.clickDelete.bind(this),this.editCard.bind(this))})}render(t=null){this.parent.innerHTML="",new h(this.parent).render(),new B(this.parent).render();const r=this.getHtml();this.parent.insertAdjacentHTML("beforeend",r),t==null?this.getDataFromServer():this.getFilteredData(t)}}const I=document.getElementById("root");class o{static addTag(t){this.selectedTags.includes(t)||(console.log(t),this.selectedTags.push(t))}static removeTag(t){this.selectedTags=this.selectedTags.filter(e=>e!==t)}static clearTags(){this.selectedTags=[]}static getSelectedTags(){return[...this.selectedTags]}}i(o,"selectedTags",[]);const $=new c(I);$.render();
