(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["register"],{"13d9":function(t,e){t.exports=function(){var t=document.getSelection();if(!t.rangeCount)return function(){};for(var e=document.activeElement,a=[],o=0;o<t.rangeCount;o++)a.push(t.getRangeAt(o));switch(e.tagName.toUpperCase()){case"INPUT":case"TEXTAREA":e.blur();break;default:e=null;break}return t.removeAllRanges(),function(){"Caret"===t.type&&t.removeAllRanges(),t.rangeCount||a.forEach((function(e){t.addRange(e)})),e&&e.focus()}}},9962:function(t,e,a){"use strict";a.r(e);var o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-container",[a("Register")],1)},n=[],i=a("2b0e"),r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-container",[a("v-card",{staticClass:"pa-5 mr-auto ml-auto",attrs:{width:"800"}},[a("v-img",{staticStyle:{width:"250px","margin-left":"auto","margin-right":"auto"},attrs:{src:t.data.shortUser.photoURL}}),a("h1",{staticClass:"text-center mt-3"},[t._v(t._s(t.data.type))]),a("h2",{staticClass:"text-center mt-3",staticStyle:{color:"#20D855 !important"}},[t._v(t._s(t.data.title))]),a("v-row",t._l(t.data.speakers,(function(e,o){return a("v-col",{key:o,staticClass:"text-center pa-3",staticStyle:{"margin-left":"auto","margin-right":"auto"},attrs:{cols:"4",md:"4"}},[a("v-img",{staticStyle:{"border-radius":"50%",width:"150px",height:"150px","object-fit":"cover","margin-left":"auto","margin-right":"auto"},attrs:{src:e.photo}}),a("h2",{staticClass:"mt-3",staticStyle:{color:"#20D855 !important"}},[t._v(t._s(e.name))]),a("h3",{staticStyle:{color:"event"}},[t._v(t._s(e.designation))]),a("h3",{staticStyle:{color:"event"}},[t._v(t._s(e.organization))])],1)})),1),a("v-row",[a("v-col",{attrs:{cols:"12",md:"12"}},[a("h3",{staticClass:"text-center"},[t._v(t._s(t.data.description))])])],1),a("v-row",[a("v-col",{staticClass:"mt-3",staticStyle:{border:"1px solid #20D855","border-radius":"20px"},attrs:{cols:"12",md:"12"}},[a("h2",{staticClass:"text-center"},[t._v(t._s(t.data.date)+" at "+t._s(t.data.time)+" HRS")]),a("div",{directives:[{name:"show",rawName:"v-show",value:void 0!==t.data.zoomData||null!==t.data.zoomData,expression:"data.zoomData !== undefined || data.zoomData !== null"}],staticClass:"d-flex justify-space-around mt-3"},[a("h3",[t._v("Zoom ID: "),a("span",{staticStyle:{color:"#20D855 !important"}},[t._v(t._s(t.data.zoomData[0]))])]),a("h3",[t._v("Password: "),a("span",{staticStyle:{color:"#20D855 !important"}},[t._v(t._s(t.data.zoomData[1]))])]),a("h3",{staticClass:"text-center"},[t._v("Meeting Link - "),a("a",{staticStyle:{color:"#20D855 !important"},attrs:{href:t.data.zoomData[2]}},[t._v("Click here")])])])])],1),a("v-card-actions",{staticClass:"mt-3"},[a("v-spacer"),a("v-btn",{staticStyle:{color:"white"},attrs:{color:"event"},on:{click:function(e){t.eventRegisterModal=!0}}},[t._v(" Register Now "),a("v-icon",[t._v("mdi-login")])],1),a("v-btn",{staticStyle:{color:"white"},attrs:{color:"event"},on:{click:t.copyToClipboard}},[t._v(" Share Event "),a("v-icon",[t._v("mdi-share")])],1),a("v-btn",{staticStyle:{color:"white"},attrs:{color:"event"}},[t._v(" Download Poster "),a("v-icon",[t._v("mdi-download")])],1),a("v-btn",{staticStyle:{color:"white"},attrs:{color:"event"}},[t._v(" Add to Calendar "),a("v-icon",[t._v("mdi-calendar")])],1),a("v-spacer")],1)],1),a("v-row",{attrs:{justify:"center"}},[a("v-dialog",{attrs:{"max-width":"700",persistent:""},model:{value:t.eventRegisterModal,callback:function(e){t.eventRegisterModal=e},expression:"eventRegisterModal"}},[a("v-card",[a("v-card-title",{staticClass:"headline text-center"},[t._v(" Event Registration ")]),a("v-card-text",[a("v-form",{ref:""},[a("v-row",[a("v-col",{attrs:{cols:"6"}},[a("v-text-field",{attrs:{outlined:"",label:"Name","prepend-icon":"mdi-text"},model:{value:t.participant.name,callback:function(e){t.$set(t.participant,"name",e)},expression:"participant.name"}})],1),a("v-col",{attrs:{cols:"6"}},[a("v-text-field",{attrs:{outlined:"",label:"Designation/ Occupation","prepend-icon":"mdi-school"},model:{value:t.participant.designation,callback:function(e){t.$set(t.participant,"designation",e)},expression:"participant.designation"}})],1),a("v-col",{attrs:{cols:"6"}},[a("v-text-field",{attrs:{outlined:"",label:"Organization/ Company","prepend-icon":"mdi-bank"},model:{value:t.participant.organization,callback:function(e){t.$set(t.participant,"organization",e)},expression:"participant.organization"}})],1),a("v-col",{attrs:{cols:"6"}},[a("v-text-field",{attrs:{outlined:"",label:"Email Address","prepend-icon":"mdi-email"},model:{value:t.participant.email,callback:function(e){t.$set(t.participant,"email",e)},expression:"participant.email"}})],1),a("v-col",{attrs:{cols:"6"}},[a("v-text-field",{attrs:{outlined:"",label:"Mobile Number","prepend-icon":"mdi-phone"},model:{value:t.participant.mobile,callback:function(e){t.$set(t.participant,"mobile",e)},expression:"participant.mobile"}})],1)],1)],1)],1),a("v-card-actions",[a("v-spacer"),a("v-btn",{attrs:{color:"event darken-1"},on:{click:function(e){t.eventRegisterModal=!1}}},[t._v(" Close ")]),a("v-btn",{attrs:{color:"event darken-1"},on:{click:t.register}},[t._v(" Register ")])],1)],1)],1)],1)],1)},s=[],l=a("2591"),c=a("f904"),d=a.n(c),p=i["default"].extend({name:"Register",data:()=>({data:{},eventRegisterModal:!1,participant:{name:null,designation:null,organization:null,email:null,mobile:null,community:null,totalEvents:0,shortUser:null,userId:null,shortEvent:null,eventId:null},eventId:null}),async created(){const t=window.location.href,e=t.split("/")[5];this.eventId=e;const a=await l["a"].firestore().collection("events").doc(e).get();this.data=a.data()},methods:{register(){this.participant.shortEvent=this.data,this.participant.eventId=this.eventId,this.participant.shortUser=this.data.shortUser,this.participant.userId=this.data.userId,l["a"].firestore().collection("eventRegistrations").add(this.participant),this.$store.dispatch("showSnackbar",{showing:!0,text:"Registration eventfull",color:"event"}),this.eventRegisterModal=!1},copyToClipboard(){const t=window.location.href.split("/"),e=t[0]+"//"+t[2]+"/event/register/"+t[5];d()(e),this.$store.dispatch("showSnackbar",{showing:!0,text:"Copied to clipboard",color:"event"})}}}),v=p,u=a("2877"),m=Object(u["a"])(v,r,s,!1,null,null,null),f=m.exports,g=i["default"].extend({name:"EventRegister",components:{Register:f}}),h=g,b=Object(u["a"])(h,o,n,!1,null,null,null);e["default"]=b.exports},f904:function(t,e,a){"use strict";var o=a("13d9"),n={"text/plain":"Text","text/html":"Url",default:"Text"},i="Copy to clipboard: #{key}, Enter";function r(t){var e=(/mac os x/i.test(navigator.userAgent)?"⌘":"Ctrl")+"+C";return t.replace(/#{\s*key\s*}/g,e)}function s(t,e){var a,s,l,c,d,p,v=!1;e||(e={}),a=e.debug||!1;try{l=o(),c=document.createRange(),d=document.getSelection(),p=document.createElement("span"),p.textContent=t,p.style.all="unset",p.style.position="fixed",p.style.top=0,p.style.clip="rect(0, 0, 0, 0)",p.style.whiteSpace="pre",p.style.webkitUserSelect="text",p.style.MozUserSelect="text",p.style.msUserSelect="text",p.style.userSelect="text",p.addEventListener("copy",(function(o){if(o.stopPropagation(),e.format)if(o.preventDefault(),"undefined"===typeof o.clipboardData){a&&console.warn("unable to use e.clipboardData"),a&&console.warn("trying IE specific stuff"),window.clipboardData.clearData();var i=n[e.format]||n["default"];window.clipboardData.setData(i,t)}else o.clipboardData.clearData(),o.clipboardData.setData(e.format,t);e.onCopy&&(o.preventDefault(),e.onCopy(o.clipboardData))})),document.body.appendChild(p),c.selectNodeContents(p),d.addRange(c);var u=document.execCommand("copy");if(!u)throw new Error("copy command was unsuccessful");v=!0}catch(m){a&&console.error("unable to copy using execCommand: ",m),a&&console.warn("trying IE specific stuff");try{window.clipboardData.setData(e.format||"text",t),e.onCopy&&e.onCopy(window.clipboardData),v=!0}catch(m){a&&console.error("unable to copy using clipboardData: ",m),a&&console.error("falling back to prompt"),s=r("message"in e?e.message:i),window.prompt(s,t)}}finally{d&&("function"==typeof d.removeRange?d.removeRange(c):d.removeAllRanges()),p&&document.body.removeChild(p),l()}return v}t.exports=s}}]);
//# sourceMappingURL=register.2f60c0ee.js.map