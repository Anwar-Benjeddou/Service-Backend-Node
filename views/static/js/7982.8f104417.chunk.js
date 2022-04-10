"use strict";(self.webpackChunksubdomaine=self.webpackChunksubdomaine||[]).push([[7982],{75418:function(e,t,r){r.r(t);var a=r(29439),n=r(72791),i=r(43360),l=r(89743),o=r(2677),d=r(78695),s=r(74569),c=r.n(s),u=(r(30337),r(50933)),f=(r(58988),r(74387)),h=r(95857),p=r(2002),x=(r(98472),r(36161)),m=r(92746),Z=r(72426),v=r.n(Z),j=r(22247),y=r(80184),_=r(24245)();t.default=function(){function e(e,t,r){var a=r.sortElement,n=r.filterElement;return(0,y.jsxs)("div",{style:{display:"flex",flexDirection:"column"},children:[n,e.text,a,(0,y.jsx)("span",{className:"fa fa-filter"})]})}var t=(0,n.useState)([]),r=(0,a.Z)(t,2),s=r[0],Z=r[1];(0,n.useEffect)((function(){g()}),[]);var g=function(){var e={headers:{"Content-Type":"application/json","Access-Control-Allow-Headers":"Authorization","x-access-token":localStorage.getItem("token"),Authorization:"Bearer "+localStorage.getItem("token")}};c().get(_+"/provider/facture/final/status",e).then((function(e){console.log("this respon list",e.data),Z(e.data.data.reverse())})).catch((function(e){console.log(e)}))},F=[{dataField:"code_facture",text:j.Z.t("payment"),headerFormatter:e,style:{textAlign:"center"},filter:(0,m.DN)({placeholder:j.Z.t("search")}),formatter:function(e,t){return 1===t.status_facture?(0,y.jsxs)("div",{children:["  ",(0,y.jsx)(i.Z,{variant:"success",children:(0,y.jsx)(u.Z,{text:j.Z.t("paid")})},t.id)]}):(0,y.jsxs)("div",{children:["  ",(0,y.jsx)(i.Z,{variant:"warning",children:(0,y.jsx)(u.Z,{text:j.Z.t("not-paid")})},t.id)]})},sort:!0},{dataField:"code_facture",text:j.Z.t("invoice-code"),headerFormatter:e,filter:(0,m.DN)({placeholder:j.Z.t("search")}),sort:!0},{text:j.Z.t("package-total-number"),dataField:"nb_colis",headerFormatter:e,filter:(0,m.DN)({placeholder:j.Z.t("search")}),sort:!0},{text:j.Z.t("total-fee"),dataField:"frais_livraision",headerFormatter:e,filter:(0,m.DN)({placeholder:j.Z.t("search")}),sort:!0},{text:j.Z.t("delivery-fee"),dataField:"frais_total",headerFormatter:e,filter:(0,m.DN)({placeholder:j.Z.t("search")}),sort:!0},{text:j.Z.t("payment-type"),dataField:"mode_payment",formatter:function(e,t){if(t.mode_payment)return(0,y.jsxs)("div",{children:["".concat(t.mode_payment," ")," ",(0,y.jsx)("br",{})," ","".concat(t.order)]})},headerFormatter:e,filter:(0,m.DN)({placeholder:j.Z.t("search")}),sort:!0},{text:j.Z.t("amount-for-supplier"),dataField:"frais_livraision",headerFormatter:e,formatter:function(e,t){return(0,y.jsxs)("div",{children:["".concat(t.frais_livraision-t.frais_total)," "]})},filter:(0,m.DN)({placeholder:j.Z.t("search")}),sort:!0},{text:j.Z.t("title-date"),dataField:"updated_at",headerFormatter:e,formatter:function(e,t){return(0,y.jsxs)("div",{children:["".concat(v()(t.updated_at).format("DD/MM/YYYY [at] HH:mm")," ")," "]})},filter:(0,m.DN)({placeholder:j.Z.t("search")}),sort:!0},{text:j.Z.t("packages-list"),dataField:"mode_payement",headerFormatter:e,style:{textAlign:"center"},filter:(0,m.DN)({placeholder:j.Z.t("search")}),formatter:function(e,t){return(0,y.jsxs)("div",{children:[(0,y.jsx)(h.Z,{codefacture:t}),"  "]})},sort:!0}];return(0,y.jsx)(f.Z,{children:(0,y.jsx)(l.Z,{children:(0,y.jsx)(o.Z,{children:(0,y.jsxs)(d.Z,{children:[(0,y.jsx)(d.Z.Header,{children:(0,y.jsx)(d.Z.Title,{as:"h5",children:j.Z.t("invoice-list")})}),(0,y.jsx)(d.Z.Body,{children:(0,y.jsx)(p.Z,{striped:!0,bordered:!0,hover:!0,variant:"dark",bootstrap4:!0,keyField:"id",data:s,columns:F,pagination:(0,x.ZP)({sizePerPage:15,sizePerPageList:[5,10,15,20,25]}),filter:(0,m.ZP)(),headerClasses:"table thead-light mb-0"})})]})})})})}},75348:function(e,t,r){var a=r(72791);t.Z=a.createContext(null)},33573:function(e,t,r){Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(){for(var e=arguments.length,t=Array(e),r=0;r<e;r++)t[r]=arguments[r];function a(){for(var e=arguments.length,r=Array(e),a=0;a<e;a++)r[a]=arguments[a];var n=null;return t.forEach((function(e){if(null==n){var t=e.apply(void 0,r);null!=t&&(n=t)}})),n}return(0,i.default)(a)};var a,n=r(46054),i=(a=n)&&a.__esModule?a:{default:a};e.exports=t.default},46054:function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){function t(t,r,a,n,i,l){var o=n||"<<anonymous>>",d=l||a;if(null==r[a])return t?new Error("Required "+i+" `"+d+"` was not specified in `"+o+"`."):null;for(var s=arguments.length,c=Array(s>6?s-6:0),u=6;u<s;u++)c[u-6]=arguments[u];return e.apply(void 0,[r,a,o,i,d].concat(c))}var r=t.bind(null,!1);return r.isRequired=t.bind(null,!0),r},e.exports=t.default}}]);
//# sourceMappingURL=7982.8f104417.chunk.js.map