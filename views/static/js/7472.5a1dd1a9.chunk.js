/*! For license information please see 7472.5a1dd1a9.chunk.js.LICENSE.txt */
(self.webpackChunksubdomaine=self.webpackChunksubdomaine||[]).push([[7472],{627:function(e,t,a){"use strict";a.d(t,{Z:function(){return i}});var s=a(29439),n=a(72791),r=a(38122),o=a(80184);function i(e){var t=(0,n.useState)(e.showit),a=(0,s.Z)(t,2),i=a[0],l=a[1];return(0,n.useEffect)((function(){console.log("show message Modal value:",i)}),[i]),(0,o.jsx)(r.Z,{color:e.design,isOpen:i,toggle:function(){return l(!1)},children:(0,o.jsx)("p",{children:e.message})})}},17472:function(e,t,a){"use strict";a.r(t);var s=a(93433),n=a(15671),r=a(43144),o=a(97326),i=a(60136),l=a(29388),c=a(72791),d=a(89743),u=a(2677),m=a(78695),h=a(99410),p=a(74292),f=a(43360),g=a(55705),Z=a(76863),y=a(74569),b=a.n(y),v=a(74387),x=a(627),j=a(22247),C=a(80184),P=a(24245)(),w=Z.Ry().shape({email:Z.Z_().email("Invalid Email").required("Email is Required"),phone_number:Z.Z_().matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,"Phone number is not valid").required("Phone is Required"),city:Z.Z_().min(2,"City is Too Short!").max(20,"City is Too Long!").required("City is Required"),description:Z.Z_().min(2,"description is Too Short!").max(20,"description is Too Long!").required("description is Required"),name:Z.Z_().min(2,"name is Too Short!").max(20,"name is Too Long!").required("name is Required"),code:Z.Z_().min(2,"code is Too Short!").max(20,"code is Too Long!").required("code is Required")}),O=function(e){(0,i.Z)(a,e);var t=(0,l.Z)(a);function a(){var e;(0,n.Z)(this,a);for(var s=arguments.length,r=new Array(s),i=0;i<s;i++)r[i]=arguments[i];return(e=t.call.apply(t,[this].concat(r))).state={message:[],showMessageParams:{display:!1,type:"success",message:null}},e.handlSubmit=function(t){e.setState({showMessageParams:{display:!1,type:"success",message:null}}),console.log(e.state.message);var a={headers:{"Content-Type":"application/json","Access-Control-Allow-Headers":"Authorization","x-access-token":localStorage.getItem("token"),Authorization:"Bearer "+localStorage.getItem("token")}};b().post(P+"/anomaly/create/",{name:t.name,messages:e.state.message},a).then((function(t){e.setState({showMessageParams:{display:!0,type:"success",message:j.Z.t("success-add-anomaly")}}),console.log(t.data),e.setState({message:[]})})).catch((function(t){e.setState({showMessageParams:{display:!0,type:"danger",message:j.Z.t("error-add-anomaly")}}),console.log(t)}))},e.showForm=function(t){var a=t.values,s=(t.errors,t.touched,t.handleChange),n=(t.handleSubmit,t.handleBlur),r=(t.setFieldValue,t.isSubmitting,t.dirty,t.isValid,t.handleReset),i=e.state.showMessageParams;return(0,C.jsx)(v.Z,{children:(0,C.jsx)(d.Z,{children:(0,C.jsx)(u.Z,{children:(0,C.jsxs)(m.Z,{children:[(0,C.jsx)(m.Z.Header,{children:(0,C.jsx)(m.Z.Title,{as:"h5",children:j.Z.t("add-pickup-anomaly")})}),1==i.display?(0,C.jsx)(x.Z,{message:i.message,design:i.type,showit:i.display}):null,(0,C.jsxs)(m.Z.Body,{children:[(0,C.jsx)(d.Z,{children:(0,C.jsx)(u.Z,{md:6,children:(0,C.jsx)(h.Z,{className:"mb-3",children:(0,C.jsxs)(p.Z,{as:"select",id:"name",custom:!0,onChange:s,onBlur:n,value:a.name,children:[(0,C.jsx)("option",{children:j.Z.t("choose-anomaly-type")}),["PICKUP","DELIVERY","ANNULATION"].map((function(e,t){return(0,C.jsx)("option",{value:e,children:e},e)}))]})})})}),(0,C.jsx)(u.Z,{md:12,children:(0,C.jsx)(f.Z,{variant:"secondary",onClick:e.handleAddRow.bind((0,o.Z)(e)),children:j.Z.t("add-message")})}),(0,C.jsx)(d.Z,{children:e.state.message.map((function(t,a){return(0,C.jsx)(u.Z,{md:6,children:(0,C.jsxs)(h.Z,{className:"mb-3",children:[(0,C.jsx)(p.Z,{type:"text",placeholder:j.Z.t("message"),className:"form-control",value:e.state.message[a],onChange:e.handleKeyChange.bind((0,o.Z)(e),a)}),"        ",(0,C.jsx)(h.Z.Prepend,{children:(0,C.jsxs)(f.Z,{variant:"danger",onClick:e.handleDeleteRow.bind((0,o.Z)(e),a),children:[j.Z.t("delete")," "]})})]})})}))}),(0,C.jsx)(f.Z,{onClick:function(){e.handlSubmit(a),r()},children:j.Z.t("save")})]})]})})})})},e}return(0,r.Z)(a,[{key:"componentDidMount",value:function(){}},{key:"handleAddRow",value:function(e){this.setState({message:[].concat((0,s.Z)(this.state.message),[""])}),console.log("added")}},{key:"handleDeleteRow",value:function(e){var t=this.state.message;t.splice(e,1),this.setState({message:this.state.message.length>0?t:[]})}},{key:"handleKeyChange",value:function(e,t){var a=(0,s.Z)(this.state.message);this.setState({message:a.map((function(a,s){return s===e?t.target.value:a}))})}},{key:"render",value:function(){var e=this;return(0,C.jsx)(g.J9,{initialValues:{name:""},onSubmit:function(t,a){var s=a.setSubmitting;e.submitForm(t),s(!1)},validationSchema:w,children:function(t){return e.showForm(t)}})}}]),a}(c.Component);t.default=O},81694:function(e,t){var a;!function(){"use strict";var s={}.hasOwnProperty;function n(){for(var e=[],t=0;t<arguments.length;t++){var a=arguments[t];if(a){var r=typeof a;if("string"===r||"number"===r)e.push(a);else if(Array.isArray(a))e.push(n.apply(null,a));else if("object"===r)for(var o in a)s.call(a,o)&&a[o]&&e.push(o)}}return e.join(" ")}e.exports?e.exports=n:void 0===(a=function(){return n}.apply(t,[]))||(e.exports=a)}()},78695:function(e,t,a){"use strict";a.d(t,{Z:function(){return N}});var s=a(87462),n=a(63366),r=a(60654),o=a.n(r),i=a(72791),l=a(10162),c=a(71923),d=a(27472),u=a(87338),m=["bsPrefix","className","variant","as"],h=i.forwardRef((function(e,t){var a=e.bsPrefix,r=e.className,c=e.variant,d=e.as,u=void 0===d?"img":d,h=(0,n.Z)(e,m),p=(0,l.vE)(a,"card-img");return i.createElement(u,(0,s.Z)({ref:t,className:o()(c?p+"-"+c:p,r)},h))}));h.displayName="CardImg",h.defaultProps={variant:null};var p=h,f=["bsPrefix","className","bg","text","border","body","children","as"],g=(0,d.Z)("h5"),Z=(0,d.Z)("h6"),y=(0,c.Z)("card-body"),b=(0,c.Z)("card-title",{Component:g}),v=(0,c.Z)("card-subtitle",{Component:Z}),x=(0,c.Z)("card-link",{Component:"a"}),j=(0,c.Z)("card-text",{Component:"p"}),C=(0,c.Z)("card-header"),P=(0,c.Z)("card-footer"),w=(0,c.Z)("card-img-overlay"),O=i.forwardRef((function(e,t){var a=e.bsPrefix,r=e.className,c=e.bg,d=e.text,m=e.border,h=e.body,p=e.children,g=e.as,Z=void 0===g?"div":g,b=(0,n.Z)(e,f),v=(0,l.vE)(a,"card"),x=(0,i.useMemo)((function(){return{cardHeaderBsPrefix:v+"-header"}}),[v]);return i.createElement(u.Z.Provider,{value:x},i.createElement(Z,(0,s.Z)({ref:t},b,{className:o()(r,v,c&&"bg-"+c,d&&"text-"+d,m&&"border-"+m)}),h?i.createElement(y,null,p):p))}));O.displayName="Card",O.defaultProps={body:!1},O.Img=p,O.Title=b,O.Subtitle=v,O.Body=y,O.Link=x,O.Text=j,O.Header=C,O.Footer=P,O.ImgOverlay=w;var N=O},87338:function(e,t,a){"use strict";var s=a(72791).createContext(null);s.displayName="CardContext",t.Z=s},27472:function(e,t,a){"use strict";var s=a(87462),n=a(72791),r=a(60654),o=a.n(r);t.Z=function(e){return n.forwardRef((function(t,a){return n.createElement("div",(0,s.Z)({},t,{ref:a,className:o()(t.className,e)}))}))}},38122:function(e,t,a){"use strict";var s=a(87462),n=a(63366),r=a(4942),o=a(72791),i=a(52007),l=a.n(i),c=a(81694),d=a.n(c),u=a(15489),m=a(3600),h=["className","closeClassName","closeAriaLabel","cssModule","tag","color","isOpen","toggle","children","transition","fade","innerRef"];function p(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);t&&(s=s.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,s)}return a}function f(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?p(Object(a),!0).forEach((function(t){(0,r.Z)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):p(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var g={children:l().node,className:l().string,closeClassName:l().string,closeAriaLabel:l().string,cssModule:l().object,color:l().string,fade:l().bool,isOpen:l().bool,toggle:l().func,tag:u.iC,transition:l().shape(m.Z.propTypes),innerRef:l().oneOfType([l().object,l().string,l().func])},Z={color:"success",isOpen:!0,tag:"div",closeAriaLabel:"Close",fade:!0,transition:f(f({},m.Z.defaultProps),{},{unmountOnExit:!0})};function y(e){var t=e.className,a=e.closeClassName,r=e.closeAriaLabel,i=e.cssModule,l=e.tag,c=e.color,p=e.isOpen,g=e.toggle,Z=e.children,y=e.transition,b=e.fade,v=e.innerRef,x=(0,n.Z)(e,h),j=(0,u.mx)(d()(t,"alert","alert-"+c,{"alert-dismissible":g}),i),C=(0,u.mx)(d()("close",a),i),P=f(f(f({},m.Z.defaultProps),y),{},{baseClass:b?y.baseClass:"",timeout:b?y.timeout:0});return o.createElement(m.Z,(0,s.Z)({},x,P,{tag:l,className:j,in:p,role:"alert",innerRef:v}),g?o.createElement("button",{type:"button",className:C,"aria-label":r,onClick:g},o.createElement("span",{"aria-hidden":"true"},"\xd7")):null,Z)}y.propTypes=g,y.defaultProps=Z,t.Z=y}}]);
//# sourceMappingURL=7472.5a1dd1a9.chunk.js.map