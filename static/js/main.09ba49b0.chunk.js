(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{108:function(e,a,t){"use strict";t.r(a);var n=t(30),c=t(57),r=t(0),o=t.n(r),l=t(8),i=t.n(l),s=(t(85),t(41)),d=t(6),f=t.n(d),u=function(e){return"https://api.airtable.com/v0/appfS3glFVXDszRVn/".concat(e,"?api_key=").concat("keyFRBqnIvAd1gkXG")},p={headerText:"EIC Consultants",colors:{primary:"#1b63c188",secondary:"#5a87c144",outline:"#6d2e00bd"}},b=function(e){return e*Math.PI/180},m=function(e){return e*(Math.random()-.5)},g=b(13),h=b(10),v=2*Math.PI/9,E=function(e){var a=g;a+=m(h),a+=e*v;var t=m(1.2)+16*Math.sin(a)-8*Math.cos(a)/2,n=m(1.2)-16*Math.cos(a)-8*Math.sin(a)/2,c=180*a/Math.PI;return"translate(".concat(t,", ").concat(n,") rotate(").concat(c,")")},y=f.a.uniq(["#63b598","#ce7d78","#ea9e70","#a48a9e","#c6e1e8","#648177","#0d5ac1","#f205e6","#1c0365","#14a9ad","#4ca2f9","#a4e43f","#d298e2","#6119d0","#d2737d","#c0a43c","#f2510e","#79806e","#cd2f00","#9348af","#01ac53","#c5a4fb","#996635","#b11573","#75d89e","#2f3f94","#2f7b99","#da967d","#34891f","#b0d87b","#ca4751","#7e50a8","#c4d647","#e0eeb8","#11dec1","#566ca0","#ffdbe1","#935b6d","#916988","#aead3a","#9e6d71","#4b5bdc","#0cd36d","#250662","#cb5bea","#ac3e1b","#df514a","#539397","#880977","#f697c1","#ba96ce","#679c9d","#c6c42c","#5d2c52","#48b41b","#e1cf3b","#5be4f0","#57c4d8","#a4d17a","#be608b","#96b00c","#088baf","#f158bf","#e145ba","#ee91e3","#05d371","#5426e0","#4834d0","#802234","#6749e8","#0971f0","#8fb413","#b2b4f0","#c3c89d","#c9a941","#41d158","#fb21a3","#51aed9","#5bb32d","#21538e","#89d534","#d36647","#7fb411","#0023b8","#3b8c2a","#986b53","#f50422","#983f7a","#ea24a3","#79352c","#521250","#c79ed2","#d6dd92","#e33e52","#b2be57","#fa06ec","#1bb699","#6b2e5f","#64820f","#21538e","#89d534","#d36647","#7fb411","#0023b8","#3b8c2a","#986b53","#f50422","#983f7a","#ea24a3","#79352c","#521250","#c79ed2","#d6dd92","#e33e52","#b2be57","#fa06ec","#1bb699","#6b2e5f","#64820f","#9cb64a","#996c48","#9ab9b7","#06e052","#e3a481","#0eb621","#fc458e","#b2db15","#aa226d","#792ed8","#73872a","#520d3a","#cefcb8","#a5b3d9","#7d1d85","#c4fd57","#f1ae16","#8fe22a","#ef6e3c","#243eeb","#dd93fd","#3f8473","#e7dbce","#421f79","#7a3d93","#635f6d","#93f2d7","#9b5c2a","#15b9ee","#0f5997","#409188","#911e20","#1350ce","#10e5b1","#fff4d7","#cb2582","#ce00be","#32d5d6","#608572","#c79bc2","#00f87c","#77772a","#6995ba","#fc6b57","#f07815","#8fd883","#060e27","#96e591","#21d52e","#d00043","#b47162","#1ec227","#4f0f6f","#1d1d58","#947002","#bde052","#e08c56","#28fcfd","#36486a","#d02e29","#1ae6db","#3e464c","#a84a8f","#911e7e","#3f16d9","#0f525f","#ac7c0a","#b4c086","#c9d730","#30cc49","#3d6751","#fb4c03","#640fc1","#62c03e","#d3493a","#88aa0b","#406df9","#615af0","#2a3434","#4a543f","#79bca0","#a8b8d4","#00efd4","#7ad236","#7260d8","#1deaa7","#06f43a","#823c59","#e3d94c","#dc1c06","#f53b2a","#b46238","#2dfff6","#a82b89","#1a8011","#436a9f","#1a806a","#4cf09d","#c188a2","#67eb4b","#b308d3","#fc7e41","#af3101","#71b1f4","#a2f8a5","#e23dd0","#d3486d","#00f7f9","#474893","#3cec35","#1c65cb","#5d1d0c","#2d7d2a","#ff3420","#5cdd87","#a259a4","#e4ac44","#1bede6","#8798a4","#d7790f","#b2c24f","#de73c2","#d70a9c","#88e9b8","#c2b0e2","#86e98f","#ae90e2","#1a806b","#436a9e","#0ec0ff","#f812b3","#b17fc9","#8d6c2f","#d3277a","#2ca1ae","#9685eb","#8a96c6","#dba2e6","#76fc1b","#608fa4","#20f6ba","#07d7f6","#dce77a","#77ecca"]),k=t(136),O=Object(k.a)(function(e){return{root:{zIndex:-1,position:"absolute",height:"100vh",width:"100vw"}}}),M=function(e){var a=e.allMembers,t=e.visibleMemberMap,n=e.setTooltipContent,c=e.setSelectedMember;console.log("allMembers: ",a);var l=p,i=(l.headerText,l.colors),d=Object(r.useMemo)(function(){return a.reduce(function(e,a,t){var r=a.name,l=a.latitude,i=a.longitude,d=a.col_rotation,f=void 0===d?0:d;return t||console.log("RUNNING MEMOIZED MEMBER CREATION"),e[a.index]=o.a.createElement(s.Marker,{key:r,coordinates:[i,l],onClick:c.bind(null,a),onMouseEnter:function(e){n(r)},onMouseLeave:function(){n("")}},o.a.createElement("g",{transform:E(f)},o.a.createElement("rect",{ry:".5",x:3.2,y:4,width:1.6,height:12,fill:"url(#shaft-reflection)",className:"pin-shaft",strokeWidth:"0",strokeOpacity:"0"}),o.a.createElement("circle",{cx:4,cy:4,r:4,className:"pin-head",stroke:"#555",strokeOpacity:1,strokeWidth:0,fill:y[t%(y.length-1)],fillOpacity:1}),o.a.createElement("circle",{cx:4,cy:4,r:4,className:"pin-head-grad",stroke:"transparent",fill:"url(#head-reflection)",fillOpacity:.3}))),e},{})},[a,n]),u=f.a.chain(t).map(function(e,a){return a}).sort(function(e,a){return Number(e)-Number(a)}).map(function(e){return d[e]}).value(),b=O();return o.a.createElement("div",{className:b.root},o.a.createElement(s.ComposableMap,{"data-tip":""},o.a.createElement("defs",null,o.a.createElement("radialGradient",{id:"head-reflection",cx:"46%",cy:"60%",r:"50%",fx:"46%",fy:"60%"},o.a.createElement("stop",{offset:"0%",stopOpacity:"0",stopColor:"#fff"}),o.a.createElement("stop",{offset:"100%",stopOpacity:"1",stopColor:"#000"})),o.a.createElement("linearGradient",{id:"shaft-reflection",x1:"0%",y1:"0%",x2:"100%",y2:"0%"},o.a.createElement("stop",{offset:"0%",stopOpacity:"1",stopColor:"#777"}),o.a.createElement("stop",{offset:"46%",stopOpacity:"1",stopColor:"#fcfcfc"}),o.a.createElement("stop",{offset:"100%",stopOpacity:"1",stopColor:"#777"}))),o.a.createElement(s.ZoomableGroup,{zoom:1},o.a.createElement(s.Geographies,{geography:"https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json"},function(e){return e.geographies.map(function(e){return o.a.createElement(s.Geography,{fill:i.secondary,stroke:i.outline,strokeWidth:".1",key:e.rsmKey,geography:e,onMouseEnter:function(a){a.target.setAttribute("fill",i.primary),n(e.properties.NAME)},onMouseLeave:function(e){e.target.setAttribute("fill",i.secondary),n("")}})})}),u)))},N=t(69),j=t(21),C=t(109),S=t(138),x=t(143),w=t(145),T=t(4),_=Object(k.a)(function(e){return{modal:{display:"flex",alignItems:"center",justifyContent:"center"},paper:{position:"absolute",maxWidth:500,maxHeight:"85vh",overflowY:"scroll",backgroundColor:"#e8f2ff",border:"1px solid #000",boxShadow:e.shadows[5],padding:e.spacing(3,4),margin:e.spacing(2)},introDetails:{display:"inline-block",minWidth:"220px"},bodyDetails:{paddingBottom:e.spacing(2)},name:{fontSize:"1.5rem",fontVariant:"petite-caps",letterSpacing:"0.8px",verticalAlign:"top",textAlign:"unset",display:"inline-block",borderBottom:"2px solid #0858c0",marginBottom:e.spacing(2)},detailTitle:{fontSize:".6rem",letterSpacing:"1.6px",lineHeight:1.5,fontFamily:"monospace",textTransform:"uppercase",paddingTop:e.spacing(1)},detailValue:{fontSize:".75rem",display:"inline"},selectedAttribute:{fontWeight:"700"},profileLink:{fontSize:".75rem",fontFamily:"monospace",display:"inline-block",paddingBottom:e.spacing(3),color:"#0858c0"},headshot:{maxWidth:"75px",marginLeft:e.spacing(2),verticalAlign:"top"}}}),A=[{key:"membership",title:"Membership"},{key:"consulting_status",title:"Consulting Status"},{key:"location_&_timezone",title:"Location & Timezone"},{key:"educational_background",title:"Educational Background"}],L=function(e){var a=e.selectedMember,t=e.unselectMemberHandler,n=e.selectedOptionsMap,c=e.MULTI_SELECT_CONFIG,r=_();if(!a)return null;f.a.get(a,"profile_pic.0.url");var l=f.a.get(a,"online_profile_link"),i=o.a.createElement("div",{className:r.paper},o.a.createElement("div",{className:r.introDetails},o.a.createElement(C.a,{className:r.name,variant:"h2"},a.name),A.map(function(e){var t=e.key,n=e.title;return e.link,o.a.createElement(o.a.Fragment,null,o.a.createElement(C.a,{className:r.detailTitle,variant:"subtitle1"},n),o.a.createElement(C.a,{className:r.detailValue,variant:"body1"},f.a.get(a,t,"N/A")))})),o.a.createElement("div",{className:r.bodyDetails},c.map(function(e){var t=e.key,c=e.title,l=e.nameMap;return o.a.createElement("div",{key:t},o.a.createElement(C.a,{className:r.detailTitle,variant:"subtitle1"},c),function(e,t){var c=f.a.get(a,e,[]);if(!c.length)return o.a.createElement(C.a,{className:r.detailValue,variant:"body1"},"N/A");var l=f.a.chain(c).map(function(a){return{value:a,label:f.a.get(t,a),selected:f.a.some(n[e],function(e){return e.value===a})}}).sort(function(e,a){return e.label.toLowerCase()>a.label.toLowerCase()}).value();return o.a.createElement(o.a.Fragment,null,l.map(function(e,a){var t=e.label,n=e.selected,l=Object(T.a)(r.detailValue,Object(j.a)({},r.selectedAttribute,n));return o.a.createElement(C.a,{className:l,variant:"body1"},t,a!==c.length-1?", ":"")}))}(t,l))})),l&&o.a.createElement(S.a,{className:r.profileLink,href:l,rel:"noreferrer",target:"_blank"},l));return o.a.createElement(x.a,{className:r.modal,open:!0,onClose:t,"aria-labelledby":"simple-modal-title","aria-describedby":"simple-modal-description",BackdropComponent:w.a,BackdropProps:{timeout:500}},i)},B=t(144),I=t(146),z=t(139),F=t(68),G=t(140),P=Object(k.a)(function(e){var a;return{paper:(a={width:"100vw",backgroundColor:"#e6e3d7",boxShadow:e.shadows[5]},Object(j.a)(a,e.breakpoints.up(500),{width:"254px"}),Object(j.a)(a,e.breakpoints.up("md"),{width:"320px","& $content":{padding:e.spacing(3,4)}}),a),content:{overflowY:"scroll",height:"100%",width:"100%",padding:e.spacing(2),boxSizing:"border-box"},header:{fontSize:".75rem",lineHeight:1.25,paddingRight:e.spacing(4),paddingTop:e.spacing(1)},multiSelect:{fontSize:".75rem"},detailTitle:{fontSize:".6rem",letterSpacing:"1.6px",lineHeight:1.5,fontFamily:"monospace",textTransform:"uppercase",paddingTop:e.spacing(1)},toggleButton:{position:"absolute",top:e.spacing(1),right:e.spacing(1)}}}),D=function(e){var a=e.multiSelectConfig,t=e.handleSelectOptions,n=(e.selectedOptionsMap,e.togglePanelOpen),c=e.panelOpen,r=P();return o.a.createElement(B.a,{classes:{paper:[r.paper]},open:c,variant:"persistent",anchor:"right"},o.a.createElement(I.a,{className:r.toggleButton,onClick:n},o.a.createElement(z.a,{onClick:n},o.a.createElement(G.a,null))),o.a.createElement("div",{className:r.content},o.a.createElement(C.a,{className:r.header,variant:"body1"},"Filter to members fitting ",o.a.createElement("em",null,"all")," of the following criteria"),a.map(function(e){var a=e.title,n=e.options,c=e.key;return o.a.createElement("div",{key:c,className:r.selectWrapper},o.a.createElement(C.a,{className:r.detailTitle,variant:"subtitle1"},a),o.a.createElement(F.a,{className:r.multiSelect,placeholder:"Any",id:c,isMulti:!0,closeMenuOnSelect:!1,defaultValue:null,onChange:t.bind(void 0,c),options:n}))})))},H=t(36),V=t(141),W=t(142),R=/(col_\w+)/,q=[{key:"focus_area",title:"Focus Area",options:[],nameMap:{},tableName:"focus%20area",fieldName:"Focus Area"},{key:"core_skills",title:"Core Skills",options:[],nameMap:{},tableName:"skills",fieldName:"Core Skill"},{key:"projects",title:"Projects",options:[],nameMap:{},tableName:"projects",fieldName:"Project Name"}],U=f.a.reduce(q,function(e,a){return e[a.key]=[],e},{}),J=function(e){e.forEach(function(e){f.a.each(q,function(a){var t=a.key,n=a.options,r=e[t]||[];n.push.apply(n,Object(c.a)(r))})}),q.forEach(function(e,a){var t=e.options,n=e.nameMap;q[a].options=f.a.chain(t).uniq().map(function(e){return{label:n[e],value:e}}).sort(function(e,a){return e.label.toLowerCase()>a.label.toLowerCase()}).value()})},X=Object(k.a)(function(e){return{app:{},filterButton:{position:"absolute",top:e.spacing(1),right:e.spacing(1)}}});function Y(){var e=Object(r.useState)({}),a=Object(n.a)(e,2),t=a[0],l=a[1],i=Object(r.useState)([]),s=Object(n.a)(i,2),d=s[0],p=s[1],b=Object(r.useState)(""),m=Object(n.a)(b,2),g=m[0],h=m[1],v=Object(r.useState)(U),E=Object(n.a)(v,2),y=E[0],k=E[1],O=Object(r.useState)(null),j=Object(n.a)(O,2),C=j[0],S=j[1],x=Object(r.useState)(!1),w=Object(n.a)(x,2),T=w[0],_=w[1],A=function(){return _(!T)},B=Object(H.a)(),I=Object(V.a)(B.breakpoints.up("sm"),{noSsr:!0});Object(r.useEffect)(function(){Promise.all(q.map(function(e){var a=e.title,t=e.nameMap,n=e.tableName,c=e.fieldName;return fetch(u(n)).then(function(e){return e.json()}).then(function(e){console.log("FETCH ",a),e.records.forEach(function(e){return t[e.id]=e.fields[c]})}).catch(function(e){console.error(e)})})).then(function(){console.log("FETCH MEMBER DATA"),fetch(u("members")).then(function(e){return e.json()}).then(function(e){var a={},t=e.records.filter(function(e){return e.fields.Latitude&&e.fields.Longitude}).sort(function(e,a){return a.fields.Latitude-e.fields.Latitude}).map(function(e,t){var n={index:t};a[t]=!0,Object.keys(e.fields).forEach(function(a){var t=e.fields[a],c=a.match(R);if(c&&c[0]){var r=c[0];n[r]=t}else{var o=a.toLowerCase().replaceAll("-"," ").replaceAll(/\s+/g,"_");n[o]=t}});var r=f.a.get(n,"project_lead",[]),o=f.a.get(n,"project_consultant",[]);return n.projects=f.a.uniq([].concat(Object(c.a)(r),Object(c.a)(o))),n});J(t),p(t),I&&_(!0)}).catch(function(e){console.error(e)})})},[]);var F=f.a.debounce(function(){var e=d.reduce(function(e,a){return f.a.every(y,function(e,t){return e.every(function(e){var n=e.value;return a[t]&&a[t].includes(n)})})&&(e[a.index]=!0),e},{});console.log("visibleMap: ",e),l(e)},500);Object(r.useEffect)(F,[y,d]);var G=X();return o.a.createElement("div",{classes:G.app},o.a.createElement(z.a,{onClick:A,className:G.filterButton},o.a.createElement(W.a,null)),o.a.createElement(D,{multiSelectConfig:q,selectedOptionsMap:y,handleSelectOptions:function(e,a){var t=f.a.cloneDeep(y);f.a.set(t,e,a),k(t)},panelOpen:T,togglePanelOpen:A}),o.a.createElement(L,{selectedMember:C,unselectMemberHandler:function(){return S(null)},selectedOptionsMap:y,MULTI_SELECT_CONFIG:q}),o.a.createElement(N.a,null,g),o.a.createElement(M,{allMembers:d,visibleMemberMap:t,setSelectedMember:S,setTooltipContent:h}))}var Z=document.getElementById("root");i.a.render(o.a.createElement(Y,null),Z)},80:function(e,a,t){e.exports=t(108)},85:function(e,a,t){}},[[80,1,2]]]);
//# sourceMappingURL=main.09ba49b0.chunk.js.map