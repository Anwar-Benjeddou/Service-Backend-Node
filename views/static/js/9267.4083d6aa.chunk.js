/*! For license information please see 9267.4083d6aa.chunk.js.LICENSE.txt */
(self.webpackChunksubdomaine=self.webpackChunksubdomaine||[]).push([[9267],{627:function(e,r,n){"use strict";n.d(r,{Z:function(){return i}});var a=n(29439),t=n(72791),s=n(38122),o=n(80184);function i(e){var r=(0,t.useState)(e.showit),n=(0,a.Z)(r,2),i=n[0],l=n[1];return(0,t.useEffect)((function(){console.log("show message Modal value:",i)}),[i]),(0,o.jsx)(s.Z,{color:e.design,isOpen:i,toggle:function(){return l(!1)},children:(0,o.jsx)("p",{children:e.message})})}},42464:function(e,r,n){"use strict";n(72791);var a=n(99410),t=n(74292),s=n(95693),o=n(80184);r.Z=function(e){var r=e.name,n=e.label,i=e.onChange,l=e.onBlur,c=e.value,u=e.type,d=e.isInvalid,m=e.errors,h=e.touched;return(0,o.jsx)(o.Fragment,{children:"Phone"===n?(0,o.jsxs)(o.Fragment,{children:[(0,o.jsxs)("label",{htmlFor:"basic-url",children:[r," ",(0,o.jsx)(s.Z,{errors:m,touched:h})]}),(0,o.jsxs)(a.Z,{className:"mb-3",children:[(0,o.jsx)(a.Z.Prepend,{children:(0,o.jsx)(a.Z.Text,{id:"basic-addon1",children:"+216"})}),(0,o.jsx)(t.Z,{placeholder:n,"aria-label":r,"aria-describedby":r,onChange:i,onBlur:l,value:c,isInvalid:d,label:n,name:r,type:u})]})]}):(0,o.jsxs)(o.Fragment,{children:[(0,o.jsxs)("label",{htmlFor:"basic-url",children:[n,"  ",(0,o.jsx)(s.Z,{errors:m,touched:h})]}),(0,o.jsx)(a.Z,{className:"mb-3",children:(0,o.jsx)(t.Z,{placeholder:n,"aria-label":n,"aria-describedby":n,onChange:i,onBlur:l,value:c,isInvalid:d,label:n,name:r,type:u})})]})})}},95693:function(e,r,n){"use strict";n.d(r,{Z:function(){return i}});var a=n(29439),t=(n(72791),n(65151)),s=n(22247),o=n(80184),i=function(e){var r=function(e,r){return r?e&&r?["fa-times-circle-o input-invalid",e]:!e&&r?["fa-check-circle-o input-valid",s.Z.t("valid-field")]:void 0:[]}(e.errors,e.touched),n=(0,a.Z)(r,2),i=n[0],l=n[1];return(0,o.jsx)(t.ZP,{title:Array.isArray(l)?l.map((function(e){return(0,o.jsxs)("span",{className:"tooltip-message",children:[e," ",(0,o.jsx)("br",{})]})})):(0,o.jsxs)("span",{className:"tooltip-message",children:[l," ",(0,o.jsx)("br",{})]}),placement:"right",children:(0,o.jsx)("span",{children:(0,o.jsx)("i",{className:"fa "+i})})})}},89267:function(e,r,n){"use strict";n.r(r);var a=n(15671),t=n(43144),s=n(60136),o=n(29388),i=n(72791),l=n(89743),c=n(2677),u=n(78695),d=n(43360),m=n(55705),h=n(76863),p=n(74569),f=n.n(p),g=n(74387),b=n(42464),Z=n(627),v=n(22247),y=n(80184),x=n(24245)(),j=h.Ry().shape({phone_number:h.Z_().matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,v.Z.t("error-phone-number")).required(v.Z.t("error-required-phone-number")),city:h.Z_().min(2,v.Z.t("error-short-governorate")).max(20,v.Z.t("error-long-governorate")).required(v.Z.t("error-required-governorate")),name:h.Z_().min(2,v.Z.t("error-short-agency")).required(v.Z.t("error-required-agency")),address:h.Z_().required(v.Z.t("error-address"))}),C=function(e){(0,s.Z)(n,e);var r=(0,o.Z)(n);function n(){var e;(0,a.Z)(this,n);for(var t=arguments.length,s=new Array(t),o=0;o<t;o++)s[o]=arguments[o];return(e=r.call.apply(r,[this].concat(s))).state={privileges:[],vehicules:[],showMessageParams:{display:!1,type:"success",message:null}},e.handlSubmit=function(r){e.setState({showMessageParams:{display:!1,type:"success",message:null}}),console.log(r),console.log(localStorage.getItem("token"));var n={headers:{"Content-Type":"application/json","Access-Control-Allow-Headers":"Authorization","x-access-token":localStorage.getItem("token"),Authorization:"Bearer "+localStorage.getItem("token")}};f().post(x+"/addAgence ",r,n).then((function(r){e.setState({showMessageParams:{display:!0,type:"success",message:v.Z.t("success-add-agency")}}),console.log(r.data)})).catch((function(r){e.setState({showMessageParams:{display:!0,type:"danger",message:v.Z.t("error-add-agency")}}),console.log(r)}))},e.showForm=function(r){var n=r.values,a=r.errors,t=r.touched,s=r.handleChange,o=(r.handleSubmit,r.handleBlur),i=(r.setFieldValue,r.isSubmitting,r.dirty,r.isValid,r.handleReset),m=e.state.showMessageParams;return(0,y.jsx)(g.Z,{children:(0,y.jsx)(l.Z,{children:(0,y.jsx)(c.Z,{children:(0,y.jsxs)(u.Z,{children:[(0,y.jsx)(u.Z.Header,{children:(0,y.jsx)(u.Z.Title,{as:"h5",children:v.Z.t("add-agency")})}),1==m.display?(0,y.jsx)(Z.Z,{message:m.message,design:m.type,showit:m.display}):null,(0,y.jsxs)(u.Z.Body,{children:[(0,y.jsxs)(l.Z,{children:[(0,y.jsxs)(c.Z,{md:6,children:[(0,y.jsx)(b.Z,{name:"name",onChange:s,onBlur:o,value:n.name,errors:a.name,touched:t.name,label:v.Z.t("agency")}),(0,y.jsx)(b.Z,{name:"phone_number",label:v.Z.t("phone-number"),type:"number",onChange:s,onBlur:o,value:n.phone_number,errors:a.phone_number,touched:t.phone_number})]}),(0,y.jsxs)(c.Z,{md:6,children:[(0,y.jsx)(b.Z,{name:"city",label:v.Z.t("governorate"),onChange:s,onBlur:o,value:n.city,errors:a.city,touched:t.city}),(0,y.jsx)(b.Z,{name:"address",label:v.Z.t("address"),onChange:s,onBlur:o,value:n.address,errors:a.address,touched:t.address})]})]}),(0,y.jsx)(d.Z,{disabled:Object.keys(a).length>0,onClick:function(){e.handlSubmit(n),i()},children:v.Z.t("save")})]})]})})})})},e}return(0,t.Z)(n,[{key:"componentDidMount",value:function(){}},{key:"render",value:function(){var e=this;return(0,y.jsx)(m.J9,{initialValues:{name:"",city:"",phone_number:"",address:""},onSubmit:function(r,n){var a=n.setSubmitting;e.submitForm(r),a(!1)},validationSchema:j,children:function(r){return e.showForm(r)}})}}]),n}(i.Component);r.default=C},81694:function(e,r){var n;!function(){"use strict";var a={}.hasOwnProperty;function t(){for(var e=[],r=0;r<arguments.length;r++){var n=arguments[r];if(n){var s=typeof n;if("string"===s||"number"===s)e.push(n);else if(Array.isArray(n))e.push(t.apply(null,n));else if("object"===s)for(var o in n)a.call(n,o)&&n[o]&&e.push(o)}}return e.join(" ")}e.exports?e.exports=t:void 0===(n=function(){return t}.apply(r,[]))||(e.exports=n)}()},78695:function(e,r,n){"use strict";n.d(r,{Z:function(){return N}});var a=n(87462),t=n(63366),s=n(60654),o=n.n(s),i=n(72791),l=n(10162),c=n(71923),u=n(27472),d=n(87338),m=["bsPrefix","className","variant","as"],h=i.forwardRef((function(e,r){var n=e.bsPrefix,s=e.className,c=e.variant,u=e.as,d=void 0===u?"img":u,h=(0,t.Z)(e,m),p=(0,l.vE)(n,"card-img");return i.createElement(d,(0,a.Z)({ref:r,className:o()(c?p+"-"+c:p,s)},h))}));h.displayName="CardImg",h.defaultProps={variant:null};var p=h,f=["bsPrefix","className","bg","text","border","body","children","as"],g=(0,u.Z)("h5"),b=(0,u.Z)("h6"),Z=(0,c.Z)("card-body"),v=(0,c.Z)("card-title",{Component:g}),y=(0,c.Z)("card-subtitle",{Component:b}),x=(0,c.Z)("card-link",{Component:"a"}),j=(0,c.Z)("card-text",{Component:"p"}),C=(0,c.Z)("card-header"),P=(0,c.Z)("card-footer"),O=(0,c.Z)("card-img-overlay"),w=i.forwardRef((function(e,r){var n=e.bsPrefix,s=e.className,c=e.bg,u=e.text,m=e.border,h=e.body,p=e.children,g=e.as,b=void 0===g?"div":g,v=(0,t.Z)(e,f),y=(0,l.vE)(n,"card"),x=(0,i.useMemo)((function(){return{cardHeaderBsPrefix:y+"-header"}}),[y]);return i.createElement(d.Z.Provider,{value:x},i.createElement(b,(0,a.Z)({ref:r},v,{className:o()(s,y,c&&"bg-"+c,u&&"text-"+u,m&&"border-"+m)}),h?i.createElement(Z,null,p):p))}));w.displayName="Card",w.defaultProps={body:!1},w.Img=p,w.Title=v,w.Subtitle=y,w.Body=Z,w.Link=x,w.Text=j,w.Header=C,w.Footer=P,w.ImgOverlay=O;var N=w},87338:function(e,r,n){"use strict";var a=n(72791).createContext(null);a.displayName="CardContext",r.Z=a},27472:function(e,r,n){"use strict";var a=n(87462),t=n(72791),s=n(60654),o=n.n(s);r.Z=function(e){return t.forwardRef((function(r,n){return t.createElement("div",(0,a.Z)({},r,{ref:n,className:o()(r.className,e)}))}))}},38122:function(e,r,n){"use strict";var a=n(87462),t=n(63366),s=n(4942),o=n(72791),i=n(52007),l=n.n(i),c=n(81694),u=n.n(c),d=n(15489),m=n(3600),h=["className","closeClassName","closeAriaLabel","cssModule","tag","color","isOpen","toggle","children","transition","fade","innerRef"];function p(e,r){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);r&&(a=a.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),n.push.apply(n,a)}return n}function f(e){for(var r=1;r<arguments.length;r++){var n=null!=arguments[r]?arguments[r]:{};r%2?p(Object(n),!0).forEach((function(r){(0,s.Z)(e,r,n[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):p(Object(n)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))}))}return e}var g={children:l().node,className:l().string,closeClassName:l().string,closeAriaLabel:l().string,cssModule:l().object,color:l().string,fade:l().bool,isOpen:l().bool,toggle:l().func,tag:d.iC,transition:l().shape(m.Z.propTypes),innerRef:l().oneOfType([l().object,l().string,l().func])},b={color:"success",isOpen:!0,tag:"div",closeAriaLabel:"Close",fade:!0,transition:f(f({},m.Z.defaultProps),{},{unmountOnExit:!0})};function Z(e){var r=e.className,n=e.closeClassName,s=e.closeAriaLabel,i=e.cssModule,l=e.tag,c=e.color,p=e.isOpen,g=e.toggle,b=e.children,Z=e.transition,v=e.fade,y=e.innerRef,x=(0,t.Z)(e,h),j=(0,d.mx)(u()(r,"alert","alert-"+c,{"alert-dismissible":g}),i),C=(0,d.mx)(u()("close",n),i),P=f(f(f({},m.Z.defaultProps),Z),{},{baseClass:v?Z.baseClass:"",timeout:v?Z.timeout:0});return o.createElement(m.Z,(0,a.Z)({},x,P,{tag:l,className:j,in:p,role:"alert",innerRef:y}),g?o.createElement("button",{type:"button",className:C,"aria-label":s,onClick:g},o.createElement("span",{"aria-hidden":"true"},"\xd7")):null,b)}Z.propTypes=g,Z.defaultProps=b,r.Z=Z}}]);
//# sourceMappingURL=9267.4083d6aa.chunk.js.map