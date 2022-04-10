/*! For license information please see 7763.594a53f0.chunk.js.LICENSE.txt */
(self.webpackChunksubdomaine=self.webpackChunksubdomaine||[]).push([[7763],{627:function(e,r,n){"use strict";n.d(r,{Z:function(){return o}});var a=n(29439),t=n(72791),s=n(38122),i=n(80184);function o(e){var r=(0,t.useState)(e.showit),n=(0,a.Z)(r,2),o=n[0],l=n[1];return(0,t.useEffect)((function(){console.log("show message Modal value:",o)}),[o]),(0,i.jsx)(s.Z,{color:e.design,isOpen:o,toggle:function(){return l(!1)},children:(0,i.jsx)("p",{children:e.message})})}},42464:function(e,r,n){"use strict";n(72791);var a=n(99410),t=n(74292),s=n(95693),i=n(80184);r.Z=function(e){var r=e.name,n=e.label,o=e.onChange,l=e.onBlur,c=e.value,d=e.type,u=e.isInvalid,m=e.errors,p=e.touched;return(0,i.jsx)(i.Fragment,{children:"Phone"===n?(0,i.jsxs)(i.Fragment,{children:[(0,i.jsxs)("label",{htmlFor:"basic-url",children:[r," ",(0,i.jsx)(s.Z,{errors:m,touched:p})]}),(0,i.jsxs)(a.Z,{className:"mb-3",children:[(0,i.jsx)(a.Z.Prepend,{children:(0,i.jsx)(a.Z.Text,{id:"basic-addon1",children:"+216"})}),(0,i.jsx)(t.Z,{placeholder:n,"aria-label":r,"aria-describedby":r,onChange:o,onBlur:l,value:c,isInvalid:u,label:n,name:r,type:d})]})]}):(0,i.jsxs)(i.Fragment,{children:[(0,i.jsxs)("label",{htmlFor:"basic-url",children:[n,"  ",(0,i.jsx)(s.Z,{errors:m,touched:p})]}),(0,i.jsx)(a.Z,{className:"mb-3",children:(0,i.jsx)(t.Z,{placeholder:n,"aria-label":n,"aria-describedby":n,onChange:o,onBlur:l,value:c,isInvalid:u,label:n,name:r,type:d})})]})})}},95693:function(e,r,n){"use strict";n.d(r,{Z:function(){return o}});var a=n(29439),t=(n(72791),n(65151)),s=n(22247),i=n(80184),o=function(e){var r=function(e,r){return r?e&&r?["fa-times-circle-o input-invalid",e]:!e&&r?["fa-check-circle-o input-valid",s.Z.t("valid-field")]:void 0:[]}(e.errors,e.touched),n=(0,a.Z)(r,2),o=n[0],l=n[1];return(0,i.jsx)(t.ZP,{title:Array.isArray(l)?l.map((function(e){return(0,i.jsxs)("span",{className:"tooltip-message",children:[e," ",(0,i.jsx)("br",{})]})})):(0,i.jsxs)("span",{className:"tooltip-message",children:[l," ",(0,i.jsx)("br",{})]}),placement:"right",children:(0,i.jsx)("span",{children:(0,i.jsx)("i",{className:"fa "+o})})})}},27763:function(e,r,n){"use strict";n.r(r);var a=n(15671),t=n(43144),s=n(60136),i=n(29388),o=n(72791),l=n(89743),c=n(2677),d=n(78695),u=n(43360),m=n(55705),p=n(76863),f=n(74569),h=n.n(f),g=n(74387),b=n(42464),v=n(627),Z=n(22247),x=n(80184),y=n(24245)(),j=p.Ry().shape({name:p.Z_().required(Z.Z.t("error-required-privilege")),description:p.Z_().min(2,"code is Too Short!").max(20,"code is Too Long!").required("code is Required")}),C=function(e){(0,s.Z)(n,e);var r=(0,i.Z)(n);function n(){var e;(0,a.Z)(this,n);for(var t=arguments.length,s=new Array(t),i=0;i<t;i++)s[i]=arguments[i];return(e=r.call.apply(r,[this].concat(s))).state={privileges:[],agences:[],showMessageParams:{display:!1,type:"success",message:null}},e.handlSubmit=function(r){console.log(r);var n={headers:{"Content-Type":"application/json","Access-Control-Allow-Headers":"Authorization","x-access-token":localStorage.getItem("token"),Authorization:"Bearer "+localStorage.getItem("token")}};h().post(y+"/addPrivilege",r,n).then((function(r){e.setState({showMessageParams:{display:!0,type:"success",message:Z.Z.t("success-add-privilege")}}),console.log(r.data)})).catch((function(r){e.setState({showMessageParams:{display:!0,type:"danger",message:Z.Z.t("error-add-privilege")}}),console.log(r)}))},e.showForm=function(r){var n=r.values,a=r.errors,t=r.touched,s=r.handleChange,i=(r.handleSubmit,r.handleBlur),o=(r.setFieldValue,r.isSubmitting,r.dirty,r.isValid,r.handleReset),m=e.state.showMessageParams;return(0,x.jsx)(g.Z,{children:(0,x.jsx)(l.Z,{children:(0,x.jsx)(c.Z,{children:(0,x.jsxs)(d.Z,{children:[(0,x.jsx)(d.Z.Header,{children:(0,x.jsx)(d.Z.Title,{as:"h5",children:Z.Z.t("add-privilege")})}),1==m.display?(0,x.jsx)(v.Z,{message:m.message,design:m.type,showit:m.display}):null,(0,x.jsxs)(d.Z.Body,{children:[(0,x.jsxs)(l.Z,{children:[(0,x.jsx)(c.Z,{md:6,children:(0,x.jsx)(b.Z,{name:"name",label:Z.Z.t("privilege"),onChange:s,onBlur:i,value:n.name,errors:a.name,touched:t.name})}),(0,x.jsx)(c.Z,{md:6,children:(0,x.jsx)(b.Z,{name:"description",label:Z.Z.t("description"),onChange:s,onBlur:i,value:n.description,errors:a.description,touched:t.description})})]}),(0,x.jsx)(u.Z,{onClick:function(){e.handlSubmit(n),o()},children:Z.Z.t("save")})]})]})})})})},e}return(0,t.Z)(n,[{key:"componentDidMount",value:function(){}},{key:"render",value:function(){var e=this;return(0,x.jsx)(m.J9,{initialValues:{description:"",name:""},onSubmit:function(r,n){var a=n.setSubmitting;e.submitForm(r),a(!1)},validationSchema:j,children:function(r){return e.showForm(r)}})}}]),n}(o.Component);r.default=C},81694:function(e,r){var n;!function(){"use strict";var a={}.hasOwnProperty;function t(){for(var e=[],r=0;r<arguments.length;r++){var n=arguments[r];if(n){var s=typeof n;if("string"===s||"number"===s)e.push(n);else if(Array.isArray(n))e.push(t.apply(null,n));else if("object"===s)for(var i in n)a.call(n,i)&&n[i]&&e.push(i)}}return e.join(" ")}e.exports?e.exports=t:void 0===(n=function(){return t}.apply(r,[]))||(e.exports=n)}()},78695:function(e,r,n){"use strict";n.d(r,{Z:function(){return w}});var a=n(87462),t=n(63366),s=n(60654),i=n.n(s),o=n(72791),l=n(10162),c=n(71923),d=n(27472),u=n(87338),m=["bsPrefix","className","variant","as"],p=o.forwardRef((function(e,r){var n=e.bsPrefix,s=e.className,c=e.variant,d=e.as,u=void 0===d?"img":d,p=(0,t.Z)(e,m),f=(0,l.vE)(n,"card-img");return o.createElement(u,(0,a.Z)({ref:r,className:i()(c?f+"-"+c:f,s)},p))}));p.displayName="CardImg",p.defaultProps={variant:null};var f=p,h=["bsPrefix","className","bg","text","border","body","children","as"],g=(0,d.Z)("h5"),b=(0,d.Z)("h6"),v=(0,c.Z)("card-body"),Z=(0,c.Z)("card-title",{Component:g}),x=(0,c.Z)("card-subtitle",{Component:b}),y=(0,c.Z)("card-link",{Component:"a"}),j=(0,c.Z)("card-text",{Component:"p"}),C=(0,c.Z)("card-header"),P=(0,c.Z)("card-footer"),O=(0,c.Z)("card-img-overlay"),N=o.forwardRef((function(e,r){var n=e.bsPrefix,s=e.className,c=e.bg,d=e.text,m=e.border,p=e.body,f=e.children,g=e.as,b=void 0===g?"div":g,Z=(0,t.Z)(e,h),x=(0,l.vE)(n,"card"),y=(0,o.useMemo)((function(){return{cardHeaderBsPrefix:x+"-header"}}),[x]);return o.createElement(u.Z.Provider,{value:y},o.createElement(b,(0,a.Z)({ref:r},Z,{className:i()(s,x,c&&"bg-"+c,d&&"text-"+d,m&&"border-"+m)}),p?o.createElement(v,null,f):f))}));N.displayName="Card",N.defaultProps={body:!1},N.Img=f,N.Title=Z,N.Subtitle=x,N.Body=v,N.Link=y,N.Text=j,N.Header=C,N.Footer=P,N.ImgOverlay=O;var w=N},87338:function(e,r,n){"use strict";var a=n(72791).createContext(null);a.displayName="CardContext",r.Z=a},27472:function(e,r,n){"use strict";var a=n(87462),t=n(72791),s=n(60654),i=n.n(s);r.Z=function(e){return t.forwardRef((function(r,n){return t.createElement("div",(0,a.Z)({},r,{ref:n,className:i()(r.className,e)}))}))}},38122:function(e,r,n){"use strict";var a=n(87462),t=n(63366),s=n(4942),i=n(72791),o=n(52007),l=n.n(o),c=n(81694),d=n.n(c),u=n(15489),m=n(3600),p=["className","closeClassName","closeAriaLabel","cssModule","tag","color","isOpen","toggle","children","transition","fade","innerRef"];function f(e,r){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);r&&(a=a.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),n.push.apply(n,a)}return n}function h(e){for(var r=1;r<arguments.length;r++){var n=null!=arguments[r]?arguments[r]:{};r%2?f(Object(n),!0).forEach((function(r){(0,s.Z)(e,r,n[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):f(Object(n)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))}))}return e}var g={children:l().node,className:l().string,closeClassName:l().string,closeAriaLabel:l().string,cssModule:l().object,color:l().string,fade:l().bool,isOpen:l().bool,toggle:l().func,tag:u.iC,transition:l().shape(m.Z.propTypes),innerRef:l().oneOfType([l().object,l().string,l().func])},b={color:"success",isOpen:!0,tag:"div",closeAriaLabel:"Close",fade:!0,transition:h(h({},m.Z.defaultProps),{},{unmountOnExit:!0})};function v(e){var r=e.className,n=e.closeClassName,s=e.closeAriaLabel,o=e.cssModule,l=e.tag,c=e.color,f=e.isOpen,g=e.toggle,b=e.children,v=e.transition,Z=e.fade,x=e.innerRef,y=(0,t.Z)(e,p),j=(0,u.mx)(d()(r,"alert","alert-"+c,{"alert-dismissible":g}),o),C=(0,u.mx)(d()("close",n),o),P=h(h(h({},m.Z.defaultProps),v),{},{baseClass:Z?v.baseClass:"",timeout:Z?v.timeout:0});return i.createElement(m.Z,(0,a.Z)({},y,P,{tag:l,className:j,in:f,role:"alert",innerRef:x}),g?i.createElement("button",{type:"button",className:C,"aria-label":s,onClick:g},i.createElement("span",{"aria-hidden":"true"},"\xd7")):null,b)}v.propTypes=g,v.defaultProps=b,r.Z=v}}]);
//# sourceMappingURL=7763.594a53f0.chunk.js.map