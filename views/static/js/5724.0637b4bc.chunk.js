/*! For license information please see 5724.0637b4bc.chunk.js.LICENSE.txt */
(self.webpackChunksubdomaine=self.webpackChunksubdomaine||[]).push([[5724],{627:function(e,r,n){"use strict";n.d(r,{Z:function(){return i}});var t=n(29439),s=n(72791),a=n(38122),o=n(80184);function i(e){var r=(0,s.useState)(e.showit),n=(0,t.Z)(r,2),i=n[0],c=n[1];return(0,s.useEffect)((function(){console.log("show message Modal value:",i)}),[i]),(0,o.jsx)(a.Z,{color:e.design,isOpen:i,toggle:function(){return c(!1)},children:(0,o.jsx)("p",{children:e.message})})}},42464:function(e,r,n){"use strict";n(72791);var t=n(99410),s=n(74292),a=n(95693),o=n(80184);r.Z=function(e){var r=e.name,n=e.label,i=e.onChange,c=e.onBlur,l=e.value,d=e.type,u=e.isInvalid,h=e.errors,m=e.touched;return(0,o.jsx)(o.Fragment,{children:"Phone"===n?(0,o.jsxs)(o.Fragment,{children:[(0,o.jsxs)("label",{htmlFor:"basic-url",children:[r," ",(0,o.jsx)(a.Z,{errors:h,touched:m})]}),(0,o.jsxs)(t.Z,{className:"mb-3",children:[(0,o.jsx)(t.Z.Prepend,{children:(0,o.jsx)(t.Z.Text,{id:"basic-addon1",children:"+216"})}),(0,o.jsx)(s.Z,{placeholder:n,"aria-label":r,"aria-describedby":r,onChange:i,onBlur:c,value:l,isInvalid:u,label:n,name:r,type:d})]})]}):(0,o.jsxs)(o.Fragment,{children:[(0,o.jsxs)("label",{htmlFor:"basic-url",children:[n,"  ",(0,o.jsx)(a.Z,{errors:h,touched:m})]}),(0,o.jsx)(t.Z,{className:"mb-3",children:(0,o.jsx)(s.Z,{placeholder:n,"aria-label":n,"aria-describedby":n,onChange:i,onBlur:c,value:l,isInvalid:u,label:n,name:r,type:d})})]})})}},95693:function(e,r,n){"use strict";n.d(r,{Z:function(){return i}});var t=n(29439),s=(n(72791),n(65151)),a=n(22247),o=n(80184),i=function(e){var r=function(e,r){return r?e&&r?["fa-times-circle-o input-invalid",e]:!e&&r?["fa-check-circle-o input-valid",a.Z.t("valid-field")]:void 0:[]}(e.errors,e.touched),n=(0,t.Z)(r,2),i=n[0],c=n[1];return(0,o.jsx)(s.ZP,{title:Array.isArray(c)?c.map((function(e){return(0,o.jsxs)("span",{className:"tooltip-message",children:[e," ",(0,o.jsx)("br",{})]})})):(0,o.jsxs)("span",{className:"tooltip-message",children:[c," ",(0,o.jsx)("br",{})]}),placement:"right",children:(0,o.jsx)("span",{children:(0,o.jsx)("i",{className:"fa "+i})})})}},25724:function(e,r,n){"use strict";n.r(r),n.d(r,{default:function(){return T}});var t=n(15671),s=n(43144),a=n(60136),o=n(29388),i=n(72791),c=n(89743),l=n(2677),d=n(78695),u=n(43360),h=n(62591),m=n(78417),f=n(74569),p=n.n(f),Z=(n(58988),n(74387)),g=n(29439),x=n(99410),v=n(74292),j=n(38780),b=n(55705),y=n(76863),C=n(42464),k=n(627),N=n(22247),P=n(80184),O=n(24245)(),S=y.Ry().shape({email:y.Z_().email("Invalid Email").required("Email is Required"),phone_number:y.Z_().matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,"Phone number is not valid").required("Phone is Required"),city:y.Z_().min(2,N.Z.t("error-short-city")).max(20,N.Z.t("error-long-city")).required(N.Z.t("error-required-city")),gouvernorat:y.Z_().min(2,N.Z.t("error-short-governorate")).max(20,N.Z.t("error-long-governorate")).required(N.Z.t("error-required-governorate")),description:y.Z_().min(2,"description is Too Short!").max(20,"description is Too Long!").required("description is Required"),name:y.Z_().min(2,"name is Too Short!").max(20,"name is Too Long!").required("name is Required"),code:y.Z_().min(2,"code is Too Short!").max(20,"code is Too Long!").required("code is Required"),address:y.Z_().required(N.Z.t("error-address"))});var w=function(e){var r=this,n=(0,i.useState)(!1),t=(0,g.Z)(n,2),s=t[0],a=t[1],o=(0,i.useState)(e.zone),h=(0,g.Z)(o,1)[0],m=(0,i.useState)([]),f=(0,g.Z)(m,2),y=f[0],w=f[1],E=function(){return a(!1)},A=(0,i.useState)({display:!1,type:"success",message:null}),T=(0,g.Z)(A,2),B=T[0],q=T[1];(0,i.useEffect)((function(){var e={headers:{"Content-Type":"application/json","Access-Control-Allow-Headers":"x-access-token","x-access-token":localStorage.getItem("token"),Authorization:"Bearer "+localStorage.getItem("token")}};p().get(O+"/agence",e).then((function(e){console.log("this respon list",e.data),w(e.data.data)})).catch((function(e){console.log(e)}))}),[]),(0,i.useEffect)((function(){}),[B]);var z=function(r){var n=r.values,t=r.errors,s=r.touched,a=r.handleChange,o=(r.handleSubmit,r.handleBlur),i=(r.setFieldValue,r.isSubmitting,r.dirty,r.isValid,r.handleReset);return(0,P.jsx)(Z.Z,{children:(0,P.jsx)(c.Z,{children:(0,P.jsx)(l.Z,{children:(0,P.jsxs)(d.Z,{children:[(0,P.jsx)(d.Z.Header,{children:(0,P.jsx)(d.Z.Title,{as:"h5"})}),1==B.display?(0,P.jsx)(k.Z,{message:B.message,design:B.type,showit:B.display}):null,(0,P.jsxs)(d.Z.Body,{children:[(0,P.jsxs)(c.Z,{children:[(0,P.jsxs)(l.Z,{md:6,children:[(0,P.jsx)(C.Z,{name:"gouvernorat",label:N.Z.t("governorate"),onChange:a,onBlur:o,value:n.gouvernorat,errors:t.gouvernorat,touched:s.gouvernorat}),(0,P.jsx)(C.Z,{name:"city",label:N.Z.t("city"),onChange:a,onBlur:o,value:n.city,errors:t.city,touched:s.city})]}),(0,P.jsxs)(l.Z,{md:6,children:[(0,P.jsx)("label",{htmlFor:"basic-url",children:N.Z.t("agency")}),(0,P.jsx)(x.Z,{className:"mb-3",children:(0,P.jsxs)(v.Z,{as:"select",id:"agence",custom:!0,onChange:a,onBlur:o,value:n.Formateur,children:[(0,P.jsx)("option",{children:N.Z.t("choose-agency")}),y.map((function(e,r){return(0,P.jsx)("option",{value:e.id,children:e.name},e.id)}))]})})]})]}),(0,P.jsx)(u.Z,{onClick:function(){!function(r){q({display:!1,type:"success",message:null}),console.log(r);var n={headers:{"Content-Type":"application/json","Access-Control-Allow-Headers":"x-access-token","x-access-token":localStorage.getItem("token"),Authorization:"Bearer "+localStorage.getItem("token")}};p().put(O+"/zone/"+h.id,r,n).then((function(r){q({display:!0,type:"success",message:N.Z.t("success-update-zone")}),console.log(r.data),e.change(),E()})).catch((function(e){q({display:!0,type:"danger",message:N.Z.t("error-update-zone")}),console.log(e)}))}(n),i()},children:N.Z.t("save")})]})]})})})})};return(0,P.jsxs)(P.Fragment,{children:[(0,P.jsxs)(u.Z,{variant:"info",onClick:function(){return a(!0)},children:[" ",(0,P.jsx)("span",{className:"fa fa-pencil"})]}),(0,P.jsxs)(j.Z,{show:s,onHide:E,children:[(0,P.jsx)(j.Z.Header,{closeButton:!0,children:(0,P.jsx)(j.Z.Title,{children:N.Z.t("update-zone")})}),(0,P.jsx)(j.Z.Body,{children:(0,P.jsx)(b.J9,{initialValues:{agence:"".concat(h.agence.id),city:"".concat(h.city),gouvernorat:"".concat(h.gouvernorat)},onSubmit:function(e,n){var t=n.setSubmitting;r.submitForm(e),t(!1)},validationSchema:S,children:function(e){return z(e)}})}),(0,P.jsx)(j.Z.Footer,{children:(0,P.jsx)(u.Z,{variant:"secondary",onClick:E,children:N.Z.t("close")})})]})]})},E=n(24245)(),A=function(e){(0,a.Z)(n,e);var r=(0,o.Z)(n);function n(){var e;(0,t.Z)(this,n);for(var s=arguments.length,a=new Array(s),o=0;o<s;o++)a[o]=arguments[o];return(e=r.call.apply(r,[this].concat(a))).state={Zones:[]},e}return(0,s.Z)(n,[{key:"componentDidMount",value:function(){var e=this,r={headers:{"Content-Type":"application/json","Access-Control-Allow-Headers":"x-access-token","x-access-token":localStorage.getItem("token"),Authorization:"Bearer "+localStorage.getItem("token")}};p().get(E+"/zone",r).then((function(r){console.log("this respon list",r.data),e.setState({Zones:r.data.data})})).catch((function(e){console.log(e)}))}},{key:"Delette",value:function(e){console.log("hellodelet",e.id)}},{key:"render",value:function(){var e=this;return(0,P.jsx)(Z.Z,{children:(0,P.jsx)(c.Z,{children:(0,P.jsx)(l.Z,{children:(0,P.jsxs)(d.Z,{children:[(0,P.jsx)(d.Z.Header,{children:(0,P.jsxs)(d.Z.Title,{as:"h5",children:["   ",(0,P.jsxs)(m.Z,{to:"/Add/zone",children:["  ",(0,P.jsx)(u.Z,{children:N.Z.t("add-zone")})," "]})," "]})}),(0,P.jsx)(d.Z.Body,{children:(0,P.jsxs)(h.Z,{striped:!0,responsive:!0,children:[(0,P.jsx)("thead",{children:(0,P.jsxs)("tr",{children:[(0,P.jsx)("th",{children:N.Z.t("code")}),(0,P.jsx)("th",{children:N.Z.t("governorate")}),(0,P.jsx)("th",{children:N.Z.t("zone")}),(0,P.jsx)("th",{children:N.Z.t("address")}),(0,P.jsx)("th",{children:N.Z.t("agency")}),(0,P.jsx)("th",{children:N.Z.t("action-event")})]})}),(0,P.jsx)("tbody",{children:this.state.Zones.map((function(r,n){return(0,P.jsxs)("tr",{children:[(0,P.jsxs)("td",{children:[r.name," "]}),(0,P.jsxs)("td",{children:[r.gouvernorat," "]}),(0,P.jsxs)("td",{children:[r.city," "]}),(0,P.jsxs)("td",{children:[r.address,"  ",r.city," "]}),(0,P.jsxs)("td",{children:[r.agence.name," "]}),(0,P.jsxs)("td",{children:["  ",(0,P.jsxs)(u.Z,{variant:"danger",onClick:function(){return e.Delette(r)},children:[" ",(0,P.jsx)("span",{className:"fa fa-trash"})]}),(0,P.jsx)(w,{zone:r,change:function(){return e.componentDidMount()}})]})]},r.id)}))})]})})]})})})})}}]),n}(i.Component),T=A},81694:function(e,r){var n;!function(){"use strict";var t={}.hasOwnProperty;function s(){for(var e=[],r=0;r<arguments.length;r++){var n=arguments[r];if(n){var a=typeof n;if("string"===a||"number"===a)e.push(n);else if(Array.isArray(n))e.push(s.apply(null,n));else if("object"===a)for(var o in n)t.call(n,o)&&n[o]&&e.push(o)}}return e.join(" ")}e.exports?e.exports=s:void 0===(n=function(){return s}.apply(r,[]))||(e.exports=n)}()},78695:function(e,r,n){"use strict";n.d(r,{Z:function(){return O}});var t=n(87462),s=n(63366),a=n(60654),o=n.n(a),i=n(72791),c=n(10162),l=n(71923),d=n(27472),u=n(87338),h=["bsPrefix","className","variant","as"],m=i.forwardRef((function(e,r){var n=e.bsPrefix,a=e.className,l=e.variant,d=e.as,u=void 0===d?"img":d,m=(0,s.Z)(e,h),f=(0,c.vE)(n,"card-img");return i.createElement(u,(0,t.Z)({ref:r,className:o()(l?f+"-"+l:f,a)},m))}));m.displayName="CardImg",m.defaultProps={variant:null};var f=m,p=["bsPrefix","className","bg","text","border","body","children","as"],Z=(0,d.Z)("h5"),g=(0,d.Z)("h6"),x=(0,l.Z)("card-body"),v=(0,l.Z)("card-title",{Component:Z}),j=(0,l.Z)("card-subtitle",{Component:g}),b=(0,l.Z)("card-link",{Component:"a"}),y=(0,l.Z)("card-text",{Component:"p"}),C=(0,l.Z)("card-header"),k=(0,l.Z)("card-footer"),N=(0,l.Z)("card-img-overlay"),P=i.forwardRef((function(e,r){var n=e.bsPrefix,a=e.className,l=e.bg,d=e.text,h=e.border,m=e.body,f=e.children,Z=e.as,g=void 0===Z?"div":Z,v=(0,s.Z)(e,p),j=(0,c.vE)(n,"card"),b=(0,i.useMemo)((function(){return{cardHeaderBsPrefix:j+"-header"}}),[j]);return i.createElement(u.Z.Provider,{value:b},i.createElement(g,(0,t.Z)({ref:r},v,{className:o()(a,j,l&&"bg-"+l,d&&"text-"+d,h&&"border-"+h)}),m?i.createElement(x,null,f):f))}));P.displayName="Card",P.defaultProps={body:!1},P.Img=f,P.Title=v,P.Subtitle=j,P.Body=x,P.Link=b,P.Text=y,P.Header=C,P.Footer=k,P.ImgOverlay=N;var O=P},62591:function(e,r,n){"use strict";var t=n(87462),s=n(63366),a=n(60654),o=n.n(a),i=n(72791),c=n(10162),l=["bsPrefix","className","striped","bordered","borderless","hover","size","variant","responsive"],d=i.forwardRef((function(e,r){var n=e.bsPrefix,a=e.className,d=e.striped,u=e.bordered,h=e.borderless,m=e.hover,f=e.size,p=e.variant,Z=e.responsive,g=(0,s.Z)(e,l),x=(0,c.vE)(n,"table"),v=o()(a,x,p&&x+"-"+p,f&&x+"-"+f,d&&x+"-striped",u&&x+"-bordered",h&&x+"-borderless",m&&x+"-hover"),j=i.createElement("table",(0,t.Z)({},g,{className:v,ref:r}));if(Z){var b=x+"-responsive";return"string"===typeof Z&&(b=b+"-"+Z),i.createElement("div",{className:b},j)}return j}));r.Z=d},38122:function(e,r,n){"use strict";var t=n(87462),s=n(63366),a=n(4942),o=n(72791),i=n(52007),c=n.n(i),l=n(81694),d=n.n(l),u=n(15489),h=n(3600),m=["className","closeClassName","closeAriaLabel","cssModule","tag","color","isOpen","toggle","children","transition","fade","innerRef"];function f(e,r){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);r&&(t=t.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),n.push.apply(n,t)}return n}function p(e){for(var r=1;r<arguments.length;r++){var n=null!=arguments[r]?arguments[r]:{};r%2?f(Object(n),!0).forEach((function(r){(0,a.Z)(e,r,n[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):f(Object(n)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))}))}return e}var Z={children:c().node,className:c().string,closeClassName:c().string,closeAriaLabel:c().string,cssModule:c().object,color:c().string,fade:c().bool,isOpen:c().bool,toggle:c().func,tag:u.iC,transition:c().shape(h.Z.propTypes),innerRef:c().oneOfType([c().object,c().string,c().func])},g={color:"success",isOpen:!0,tag:"div",closeAriaLabel:"Close",fade:!0,transition:p(p({},h.Z.defaultProps),{},{unmountOnExit:!0})};function x(e){var r=e.className,n=e.closeClassName,a=e.closeAriaLabel,i=e.cssModule,c=e.tag,l=e.color,f=e.isOpen,Z=e.toggle,g=e.children,x=e.transition,v=e.fade,j=e.innerRef,b=(0,s.Z)(e,m),y=(0,u.mx)(d()(r,"alert","alert-"+l,{"alert-dismissible":Z}),i),C=(0,u.mx)(d()("close",n),i),k=p(p(p({},h.Z.defaultProps),x),{},{baseClass:v?x.baseClass:"",timeout:v?x.timeout:0});return o.createElement(h.Z,(0,t.Z)({},b,k,{tag:c,className:y,in:f,role:"alert",innerRef:j}),Z?o.createElement("button",{type:"button",className:C,"aria-label":a,onClick:Z},o.createElement("span",{"aria-hidden":"true"},"\xd7")):null,g)}x.propTypes=Z,x.defaultProps=g,r.Z=x},58988:function(){}}]);
//# sourceMappingURL=5724.0637b4bc.chunk.js.map