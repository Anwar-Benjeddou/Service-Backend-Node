"use strict";(self.webpackChunksubdomaine=self.webpackChunksubdomaine||[]).push([[7426],{84810:function(e,t,n){n.r(t);var o=n(93433),r=n(29439),a=n(72791),i=n(43360),c=n(78695),l=n(89743),s=n(2677),d=n(99410),u=n(74292),h=n(74569),f=n.n(h),x=n(2002),p=n(63081),m=n.n(p),g=n(98472),j=(n(78417),n(36161)),v=(n(21461),n(50054),n(23085),n(30337),n(58988),n(92746)),Z=n(80184),b=n(24245)();t.default=function(){var e=(0,a.useState)([]),t=(0,r.Z)(e,2),n=t[0],h=t[1],p=(0,a.useState)([]),k=(0,r.Z)(p,2),N=k[0],y=k[1],S=(0,a.useState)([]),A=(0,r.Z)(S,2),C=A[0],F=A[1],T=(0,a.useState)([]),D=(0,r.Z)(T,2),w=(D[0],D[1]),z=(0,a.useState)([]),P=(0,r.Z)(z,2),_=P[0],I=P[1],E=(0,a.useState)([]),H=(0,r.Z)(E,2),B=H[0],L=H[1],R=(0,a.useState)([]),W=(0,r.Z)(R,2),M=W[0],O=W[1];function V(e,t,n){n.sortElement;var o=n.filterElement;return(0,Z.jsxs)("div",{style:{display:"flex",flexDirection:"column"},children:[o,e.text,"  ",(0,Z.jsx)("span",{className:"fa fa-filter"})]})}(0,a.useEffect)((function(){q()}),[]);var q=function(){var e={headers:{"Content-Type":"application/json","Access-Control-Allow-Headers":"Authorization","x-access-token":localStorage.getItem("token"),Authorization:"Bearer "+localStorage.getItem("token")}};f().get(b+"/driver",e).then((function(e){I(e.data.data)})).catch((function(e){console.log(e)}))},G={parentClassName:"parent-expand-foo",renderer:function(e,t){var n;return(0,Z.jsxs)("div",{children:[(0,Z.jsxs)("p",{children:["    ",(0,Z.jsxs)("span",{style:{color:"black",fontWeight:"bold",textAlign:"center"},children:["  ","prix :"," "," "]})," ",e.colis.price," (TND) "]}),(0,Z.jsxs)("p",{children:[(0,Z.jsxs)("span",{style:{color:"black",fontWeight:"bold",textAlign:"center"},children:["  ","Mode de paiment ","     :"," "]})," ",null===(n=e.colis)||void 0===n?void 0:n.payment_mode," "]}),(0,Z.jsxs)("p",{children:["Description produit: ",e.colis.designation]})]})},onlyOneExpanding:!0},J=function(e){O(e);var t={headers:{"Content-Type":"application/json","Access-Control-Allow-Headers":"Authorization","x-access-token":localStorage.getItem("token"),Authorization:"Bearer "+localStorage.getItem("token")}};f().get(b+"/facture/delivery/driver/not_paid/"+e,t).then((function(e){h(e.data.data)})).catch((function(e){console.log(e)}))},K=[{dataField:"colis.index_colis",text:"Num colis",headerFormatter:V,filter:(0,v.DN)(),sort:!0},{dataField:"colis.lot",text:"lot",headerFormatter:V,filter:(0,v.DN)()},{dataField:"colis.name_complete",text:"Nom client",formatter:function(e,t){return(0,Z.jsxs)("div",{children:["".concat(t.colis.name_complete," "),(0,Z.jsx)("br",{}),"".concat(t.colis.gouvernorat," ")," ",(0,Z.jsx)("br",{})," ","".concat(t.colis.city)," ","  "," ","".concat(t.colis.address)," "]})},headerFormatter:V,filter:(0,v.DN)()},{dataField:"colis.phone_number",text:"N.Telecphone",style:{textAlign:"center"},headerFormatter:V,filter:(0,v.DN)()},{dataField:"colis.provider.username",text:"Expediteur",headerFormatter:V,filter:(0,v.DN)()},{dataField:"colis.price",text:"Prix(TND)",headerFormatter:V,filter:(0,v.DN)()}],Q={mode:"checkbox",clickToSelect:!0,style:{background:"#c8e6c9"},onSelect:function(e,t,n){t?(y((function(t){return[].concat((0,o.Z)(t),[e.colis.id])})),F((function(t){return[].concat((0,o.Z)(t),[e.id])})),L((function(t){return[].concat((0,o.Z)(t),[e.colis])}))):(y((function(t){return t.filter((function(t){return t!==e.colis.id}))})),F((function(t){return t.filter((function(t){return t!==e.id}))})),L((function(t){return t.filter((function(t){return t!==e.colis}))})))},hideSelectAll:!0};return(0,Z.jsx)(a.Fragment,{children:(0,Z.jsxs)(c.Z,{className:"card-box mb-4",children:[(0,Z.jsxs)(c.Z.Header,{children:[(0,Z.jsxs)(c.Z.Title,{as:"h5",children:["  Total colis   ",N.length,"  "]}),(0,Z.jsx)("br",{}),(0,Z.jsxs)(c.Z.Title,{as:"h5",children:["  Total encaissment ",function(){for(var e=0,t=0,n=B.length;t<n;t++)e+=parseFloat(B[t].price);return e}(),"   "]})]}),(0,Z.jsx)(m(),{children:(0,Z.jsx)("div",{className:"app-row",children:(0,Z.jsxs)("div",{className:"app-col-xs-12 app-col-md-12",children:[(0,Z.jsxs)(l.Z,{children:[(0,Z.jsx)(s.Z,{md:12,xl:8,children:(0,Z.jsx)(d.Z,{className:"mb-3",children:(0,Z.jsxs)(u.Z,{as:"select",id:"{this.state.driver}",onChange:function(e){J(e.target.value)},custom:!0,children:[(0,Z.jsx)("option",{children:"Choisir un chauffeur"}),_.map((function(e,t){return(0,Z.jsx)("option",{className:" badge badge-info",value:e.id,children:e.username},e.id)}))]})})}),(0,Z.jsx)(s.Z,{md:12,xl:2,children:0!==N.length&&(0,Z.jsxs)(i.Z,{variant:"secondary",style:{float:"right"},onClick:function(){return function(){console.log(N),console.log(C),console.log(n);var e={headers:{"Content-Type":"application/json","Access-Control-Allow-Headers":"Authorization","x-access-token":localStorage.getItem("token"),Authorization:"Bearer "+localStorage.getItem("token")}};f().put(b+"/facture/driver/to_paid",{colis:N,factures:C},e).then((function(e){alert("colis checked delivred"),J(M),y([]),F([]),w([]),L([])})).catch((function(e){console.log(e)}))}()},children:[" ",(0,Z.jsx)("span",{className:"fa fa-money"})," Colis encaiss\xe9 "]})})]}),(0,Z.jsx)(x.Z,{striped:!0,bordered:!0,hover:!0,variant:"dark",expandRow:G,bootstrap4:!0,keyField:"id",data:n,columns:K,selectRow:Q,pagination:(0,j.ZP)({sizePerPage:25,sizePerPageList:[5,10,15,20,25]}),filter:(0,v.ZP)(),headerClasses:"table thead-light mb-0"}),(0,Z.jsx)(g.CSVLink,{data:n,children:(0,Z.jsx)(i.Z,{color:"primary",variant:"contained"})})]})})})]})})}}}]);
//# sourceMappingURL=7426.efdc16bb.chunk.js.map