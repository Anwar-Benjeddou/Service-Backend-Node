"use strict";(self.webpackChunksubdomaine=self.webpackChunksubdomaine||[]).push([[6686],{45586:function(e,a,r){r.r(a);var t=r(29439),s=r(72791),l=r(88749),c=r(41971),i=r(51695),n=r(42953),o=(r(43360),r(99410),r(74292),r(74569)),d=r.n(o),h=r(89743),p=r(2677),u=r(59151),m=r(3637),x=r(2002),Z=(r(98472),r(36161)),f=r(92746),v=(r(1235),r(58826)),N=(r(64802),r(58484),r(74387)),j=(r(627),r(71628),r(72426),r(22247)),b=r(80184),D=r(24245)();a.default=function(){var e=(0,s.useState)([]),a=(0,t.Z)(e,2),r=a[0],o=a[1],g=(0,s.useState)([]),y=(0,t.Z)(g,2),k=(y[0],y[1],(0,s.useState)([])),F=(0,t.Z)(k,2),A=(F[0],F[1],(0,s.useState)({display:!1,type:"success",message:null})),S=(0,t.Z)(A,2),_=S[0],w=(S[1],(0,s.useState)([])),C=(0,t.Z)(w,2);function P(e,a,r){var t=r.sortElement,s=r.filterElement;return(0,b.jsxs)("div",{style:{display:"flex",flexDirection:"column"},children:[s,e.text,t,(0,b.jsx)("span",{className:"fa fa-filter"})]})}C[0],C[1];var z=function(){var e={headers:{"Content-Type":"application/json","Access-Control-Allow-Headers":"Authorization","x-access-token":localStorage.getItem("token"),Authorization:"Bearer "+localStorage.getItem("token")}},a=d().get(D+"/admin/pickup/annuler?current_page=1&per_page=500",e);d().all([a]).then(d().spread((function(){for(var e=arguments.length,a=new Array(e),r=0;r<e;r++)a[r]=arguments[r];o(a[0].data.data.data)}))).catch((function(e){console.error(e)}))};(0,s.useEffect)((function(){z()}),[]);var E=[{dataField:"colis.index_colis",text:j.Z.t("package-number"),headerFormatter:P,filter:(0,f.DN)({placeholder:j.Z.t("search")}),sort:!0},{dataField:"colis.provider.username",text:j.Z.t("sender"),formatter:function(e,a){var r,t;return(0,b.jsxs)("div",{children:["".concat(null===(r=a.colis.provider)||void 0===r?void 0:r.username," ")," ",(0,b.jsx)("br",{})," ","".concat(null===(t=a.colis.provider)||void 0===t?void 0:t.phone_number)]})},headerFormatter:P,filter:(0,f.DN)({placeholder:j.Z.t("search")})},{dataField:"colis.name_complete",text:j.Z.t("client-name"),headerFormatter:P,filter:(0,f.DN)({placeholder:j.Z.t("search")})},{dataField:"colis.address",text:j.Z.t("address"),headerFormatter:P,filter:(0,f.DN)({placeholder:j.Z.t("search")}),style:{textAlign:"center"},formatter:function(e,a){return(0,b.jsxs)("div",{children:["".concat(a.colis.gouvernorat," ")," ",(0,b.jsx)("br",{})," ","".concat(a.colis.address)]})}},{dataField:"colis.phone_number",text:j.Z.t("phone-number"),headerFormatter:P,filter:(0,f.DN)({placeholder:j.Z.t("search")})},{dataField:"colis.name_complete",text:j.Z.t("qr-code"),formatter:function(e,a){return(0,b.jsx)("div",{children:(0,b.jsx)(v.Z,{url:a.colis.id})})}}];return(0,f.DN)({placeholder:j.Z.t("search")}),(0,f.DN)({placeholder:j.Z.t("search")}),(0,f.DN)({placeholder:j.Z.t("search")}),(0,f.DN)({placeholder:j.Z.t("search")}),(0,f.DN)({placeholder:j.Z.t("search")}),(0,f.DN)({placeholder:j.Z.t("search")}),(0,f.DN)({placeholder:j.Z.t("search")}),(0,f.DN)({placeholder:j.Z.t("search")}),(0,f.DN)({placeholder:j.Z.t("search")}),(0,f.DN)({placeholder:j.Z.t("search")}),(0,f.DN)({placeholder:j.Z.t("search")}),(0,f.DN)({placeholder:j.Z.t("search")}),(0,s.useEffect)((function(){}),[_]),(0,b.jsx)(N.Z,{children:(0,b.jsx)(h.Z,{children:(0,b.jsxs)(p.Z,{children:[(0,b.jsxs)("button",{className:"btn btn-info",onClick:function(){return z()},children:[" ",(0,b.jsx)("span",{className:"fa fa-refresh"}),j.Z.t("refresh")]}),(0,b.jsx)("hr",{}),(0,b.jsx)(u.Z,{defaultActiveKey:"home",children:(0,b.jsx)(m.Z,{eventKey:"home",title:j.Z.t("cancel-name"),children:(0,b.jsxs)(l.Z,{className:"card-box mb-4",children:[(0,b.jsxs)("div",{className:"card-header",children:[(0,b.jsx)("div",{className:"card-header--title"}),(0,b.jsx)(c.Z,{className:"card-header--actions",children:(0,b.jsx)(i.Z,{size:"small",color:"primary",className:"text-primary",title:"View details"})})]}),(0,b.jsx)(n.Z,{className:"p-0",children:(0,b.jsx)("div",{className:"table-responsive",children:(0,b.jsx)("div",{className:"table-responsive",style:{height:"2000px"},children:(0,b.jsx)("div",{className:"app-row",children:(0,b.jsx)("div",{className:"app-col-xs-12 app-col-md-12",children:(0,b.jsx)(x.Z,{striped:!0,bordered:!0,hover:!0,variant:"dark",bootstrap4:!0,keyField:"id",data:r,columns:E,pagination:(0,Z.ZP)({sizePerPage:15,sizePerPageList:[5,10,15,20,25]}),filter:(0,f.ZP)(),headerClasses:"table thead-light mb-0"})})})})})})]})})})]})})})}}}]);
//# sourceMappingURL=6686.13a7354d.chunk.js.map