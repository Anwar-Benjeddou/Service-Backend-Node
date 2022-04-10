/*! For license information please see 9261.bb7d6e65.chunk.js.LICENSE.txt */
(self.webpackChunksubdomaine=self.webpackChunksubdomaine||[]).push([[9261],{627:function(e,n,t){"use strict";t.d(n,{Z:function(){return l}});var r=t(29439),s=t(72791),a=t(38122),i=t(80184);function l(e){var n=(0,s.useState)(e.showit),t=(0,r.Z)(n,2),l=t[0],o=t[1];return(0,s.useEffect)((function(){console.log("show message Modal value:",l)}),[l]),(0,i.jsx)(a.Z,{color:e.design,isOpen:l,toggle:function(){return o(!1)},children:(0,i.jsx)("p",{children:e.message})})}},42464:function(e,n,t){"use strict";t(72791);var r=t(99410),s=t(74292),a=t(95693),i=t(80184);n.Z=function(e){var n=e.name,t=e.label,l=e.onChange,o=e.onBlur,c=e.value,d=e.type,u=e.isInvalid,m=e.errors,h=e.touched;return(0,i.jsx)(i.Fragment,{children:"Phone"===t?(0,i.jsxs)(i.Fragment,{children:[(0,i.jsxs)("label",{htmlFor:"basic-url",children:[n," ",(0,i.jsx)(a.Z,{errors:m,touched:h})]}),(0,i.jsxs)(r.Z,{className:"mb-3",children:[(0,i.jsx)(r.Z.Prepend,{children:(0,i.jsx)(r.Z.Text,{id:"basic-addon1",children:"+216"})}),(0,i.jsx)(s.Z,{placeholder:t,"aria-label":n,"aria-describedby":n,onChange:l,onBlur:o,value:c,isInvalid:u,label:t,name:n,type:d})]})]}):(0,i.jsxs)(i.Fragment,{children:[(0,i.jsxs)("label",{htmlFor:"basic-url",children:[t,"  ",(0,i.jsx)(a.Z,{errors:m,touched:h})]}),(0,i.jsx)(r.Z,{className:"mb-3",children:(0,i.jsx)(s.Z,{placeholder:t,"aria-label":t,"aria-describedby":t,onChange:l,onBlur:o,value:c,isInvalid:u,label:t,name:n,type:d})})]})})}},95693:function(e,n,t){"use strict";t.d(n,{Z:function(){return l}});var r=t(29439),s=(t(72791),t(65151)),a=t(22247),i=t(80184),l=function(e){var n=function(e,n){return n?e&&n?["fa-times-circle-o input-invalid",e]:!e&&n?["fa-check-circle-o input-valid",a.Z.t("valid-field")]:void 0:[]}(e.errors,e.touched),t=(0,r.Z)(n,2),l=t[0],o=t[1];return(0,i.jsx)(s.ZP,{title:Array.isArray(o)?o.map((function(e){return(0,i.jsxs)("span",{className:"tooltip-message",children:[e," ",(0,i.jsx)("br",{})]})})):(0,i.jsxs)("span",{className:"tooltip-message",children:[o," ",(0,i.jsx)("br",{})]}),placement:"right",children:(0,i.jsx)("span",{children:(0,i.jsx)("i",{className:"fa "+l})})})}},6118:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return P}});var r=t(93433),s=t(15671),a=t(43144),i=t(60136),l=t(29388),o=t(72791),c=t(89743),d=t(2677),u=t(78695),m=t(43360),h=t(62591),f=t(78417),p=t(74569),x=t.n(p),v=t(30337),j=(t(58988),t(74387)),g=t(29439),Z=t(38780),b=t(22247),y=t(80184);var C=function(e){var n=(0,o.useState)(!1),t=(0,g.Z)(n,2),r=t[0],s=t[1],a=function(){return s(!1)};return(0,y.jsxs)(y.Fragment,{children:[(0,y.jsxs)(m.Z,{variant:"success",onClick:function(){return s(!0)},children:[" ",(0,y.jsx)("span",{className:"fa fa-eye"})]}),(0,y.jsxs)(Z.Z,{show:r,onHide:a,children:[(0,y.jsx)(Z.Z.Header,{closeButton:!0,children:(0,y.jsxs)(Z.Z.Title,{children:[b.Z.t("admin")," : ",e.admin.username,"  "]})}),(0,y.jsxs)(Z.Z.Body,{children:[(0,y.jsxs)("tr",{children:[(0,y.jsxs)("th",{style:{width:"60%"},children:[b.Z.t("fullname"),":"]}),(0,y.jsxs)("td",{style:{width:"60%"},children:[e.admin.firstname," ",e.admin.lastname," "]})]}),(0,y.jsxs)("tr",{children:[(0,y.jsxs)("th",{style:{width:"60%"},children:[b.Z.t("phone-number"),": "]}),(0,y.jsx)("td",{style:{width:"60%"},children:e.admin.phone_number})]}),(0,y.jsxs)("tr",{children:[(0,y.jsxs)("th",{style:{width:"60%"},children:[b.Z.t("email"),":"]}),(0,y.jsx)("td",{style:{width:"60%"},children:e.admin.email})]}),(0,y.jsxs)("tr",{children:[(0,y.jsxs)("th",{style:{width:"60%"},children:[b.Z.t("address"),":"]}),(0,y.jsx)("td",{style:{width:"60%"},children:e.admin.address})]}),(0,y.jsxs)("tr",{children:[(0,y.jsxs)("th",{style:{width:"60%"},children:[b.Z.t("role"),":"]}),(0,y.jsx)("td",{style:{width:"60%"},children:e.admin.descriminator})]}),(0,y.jsxs)("tr",{children:[(0,y.jsxs)("th",{style:{width:"60%"},children:[b.Z.t("agency"),":"]}),(0,y.jsx)("td",{style:{width:"60%"},children:e.admin.agence.name})]})]}),(0,y.jsx)(Z.Z.Footer,{children:(0,y.jsx)(m.Z,{variant:"secondary",onClick:a,children:b.Z.t("close")})})]})]})},k=t(99410),w=t(74292),E=t(55705),A=t(76863),N=t(10475),B=t(42464),S=t(627),_=t(24245)(),O=A.Ry().shape({email:A.Z_().email("Invalid Email").required("Email is Required"),phone_number:A.Z_().matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,"Phone number is not valid").required("Phone is Required"),city:A.Z_().min(2,"City is Too Short!").max(20,"City is Too Long!").required("City is Required"),country:A.Z_().min(2,"Country is Too Short!").max(20,"Country is Too Long!").required("Country is Required"),firstname:A.Z_().min(2,"firstname is Too Short!").max(20,"firstname is Too Long!").required("firstname is Required"),lastname:A.Z_().min(2,"lastname is Too Short!").max(20,"lastname is Too Long!").required("lastname is Required")});var I=function(e){var n=this,t=(0,o.useState)(!1),r=(0,g.Z)(t,2),s=r[0],a=r[1],i=(0,o.useState)(e.admin),l=(0,g.Z)(i,1)[0],h=(0,o.useState)([]),f=(0,g.Z)(h,2),p=f[0],v=f[1],C=(0,o.useState)([]),A=(0,g.Z)(C,2),I=A[0],T=A[1],F=(0,o.useState)([]),P=(0,g.Z)(F,2),q=P[0],R=P[1],L=(0,o.useState)([]),z=(0,g.Z)(L,1)[0],H=function(){return a(!1)},U=(0,o.useState)({display:!1,type:"success",message:null}),D=(0,g.Z)(U,2),M=D[0],K=D[1];(0,o.useEffect)((function(){var e={headers:{"Content-Type":"application/json","Access-Control-Allow-Headers":"Authorization","x-access-token":localStorage.getItem("token"),Authorization:"Bearer "+localStorage.getItem("token")}},n=x().get(_+"/privileges",e),t=x().get(_+"/agence",e),r=x().get(_+"/permissions",e);x().all([n,t,r]).then(x().spread((function(){for(var e=arguments.length,n=new Array(e),t=0;t<e;t++)n[t]=arguments[t];console.log("this respon list0",n[2].data),console.log("this respon list1",n[1].data),v(n[0].data.data),T(n[1].data.data),R(n[2].data.data)}))).catch((function(e){console.error(e)}))}),[]),(0,o.useEffect)((function(){}),[M]);var V=function(t){var r=t.values,s=t.errors,a=t.touched,i=t.handleChange,o=(t.handleSubmit,t.handleBlur),h=(t.setFieldValue,t.isSubmitting,t.dirty,t.isValid,t.handleReset);return(0,y.jsx)(j.Z,{children:(0,y.jsx)(c.Z,{children:(0,y.jsx)(d.Z,{children:(0,y.jsxs)(u.Z,{children:[(0,y.jsx)(u.Z.Header,{children:(0,y.jsx)(u.Z.Title,{as:"h5",children:b.Z.t("update-admin")})}),(0,y.jsxs)(u.Z.Body,{children:[M.display?(0,y.jsx)(S.Z,{message:M.message,design:M.type,showit:M.display}):null,(0,y.jsxs)(c.Z,{children:[(0,y.jsxs)(d.Z,{md:6,children:[(0,y.jsx)(B.Z,{name:"firstname",onChange:i,onBlur:o,value:r.firstname,errors:s.firstname,touched:a.firstname,label:b.Z.t("first-name")}),(0,y.jsx)(B.Z,{name:"lastname",label:b.Z.t("last-name"),onChange:i,onBlur:o,value:r.lastname,errors:s.lastname,touched:a.lastname}),(0,y.jsx)(B.Z,{name:"username",label:b.Z.t("username"),onChange:i,onBlur:o,value:r.username,errors:s.username,touched:a.username}),(0,y.jsx)(B.Z,{name:"password",label:b.Z.t("password"),onChange:i,onBlur:o,value:r.password,errors:s.password,touched:a.password,type:"password"}),(0,y.jsx)(B.Z,{name:"email",label:b.Z.t("email"),onChange:i,onBlur:o,value:r.email,errors:s.email,touched:a.email}),(0,y.jsx)("div",{children:q.map((function(e){return(0,y.jsxs)("div",{children:[(0,y.jsx)(N.Z,{onChange:function(e){return n.handleChange(e)},inputProps:{"aria-label":"primary checkbox"},value:e.id},e.id),"  ",e.name]})}))})]}),(0,y.jsxs)(d.Z,{md:6,children:[(0,y.jsx)(B.Z,{name:"phone_number",label:b.Z.t("phone-number"),onChange:i,onBlur:o,value:r.phone_number,errors:s.phone_number,touched:a.phone_number}),(0,y.jsx)(B.Z,{name:"address",label:b.Z.t("address"),onChange:i,onBlur:o,value:r.address,errors:s.address,touched:a.address}),(0,y.jsx)("label",{htmlFor:"basic-url",children:b.Z.t("descriminator")}),(0,y.jsx)(k.Z,{className:"mb-3",children:(0,y.jsxs)(w.Z,{as:"select",id:"descriminator",custom:!0,onChange:i,onBlur:o,value:r.Formateur,children:[(0,y.jsx)("option",{children:b.Z.t("choose-descriminator")}),["regular_user","magasinier"].map((function(e,n){return(0,y.jsx)("option",{value:e,children:e},e)}))]})}),(0,y.jsx)("label",{htmlFor:"basic-url",children:b.Z.t("privilege")}),(0,y.jsx)(k.Z,{className:"mb-3",children:(0,y.jsxs)(w.Z,{as:"select",id:"privilege",custom:!0,onChange:i,onBlur:o,value:r.privilege,children:[(0,y.jsx)("option",{children:b.Z.t("choose-privilege")}),p.map((function(e,n){return(0,y.jsxs)("option",{value:e.id,children:[e.name," :",e.description]},e.id)}))]})}),(0,y.jsx)("label",{htmlFor:"basic-url",children:b.Z.t("agency")}),(0,y.jsx)(k.Z,{className:"mb-3",children:(0,y.jsxs)(w.Z,{as:"select",id:"agence",custom:!0,onChange:i,onBlur:o,value:r.agence,children:[(0,y.jsx)("option",{children:b.Z.t("choose-agency")}),I.map((function(e,n){return(0,y.jsxs)("option",{value:e.id,children:[e.name," :",e.address]},e.id)}))]})})]})]}),(0,y.jsx)(m.Z,{onClick:function(){!function(n){K({display:!1,type:"success",message:null}),n.permissions=z,console.log(n);var t={headers:{"Content-Type":"application/json","Access-Control-Allow-Headers":"Authorization","x-access-token":localStorage.getItem("token"),Authorization:"Bearer "+localStorage.getItem("token")}};x().put(_+"/user/"+l.id,n,t).then((function(n){K({display:!0,type:"success",message:b.Z.t("success-update-admin")}),console.log(n.data),e.change(),H()})).catch((function(e){K({display:!0,type:"danger",message:b.Z.t("error-update-admin")}),console.log(e)}))}(r),h()},children:b.Z.t("save")})]})]})})})})};return(0,y.jsxs)(y.Fragment,{children:[(0,y.jsxs)(m.Z,{variant:"info",onClick:function(){return a(!0)},children:[" ",(0,y.jsx)("span",{className:"fa fa-pencil"})]}),(0,y.jsxs)(Z.Z,{size:"xl",show:s,onHide:H,children:[(0,y.jsx)(Z.Z.Header,{closeButton:!0,children:(0,y.jsx)(Z.Z.Title,{children:b.Z.t("update-admin")})}),(0,y.jsx)(Z.Z.Body,{children:(0,y.jsx)(E.J9,{initialValues:{firstname:"".concat(l.firstname),lastname:"".concat(l.lastname),username:"".concat(l.username),password:"".concat(l.password),email:"".concat(l.email),phone_number:"".concat(l.phone_number),address:"".concat(l.address),agence:"".concat(l.agence.id),privilege:"".concat(l.privilege)},onSubmit:function(e,t){var r=t.setSubmitting;n.submitForm(e),r(!1)},validationSchema:O,children:function(e){return V(e)}})}),(0,y.jsx)(Z.Z.Footer,{children:(0,y.jsx)(m.Z,{variant:"secondary",onClick:H,children:b.Z.t("close")})})]})]})},T=t(24245)(),F=function(e){(0,i.Z)(t,e);var n=(0,l.Z)(t);function t(){var e;(0,s.Z)(this,t);for(var r=arguments.length,a=new Array(r),i=0;i<r;i++)a[i]=arguments[i];return(e=n.call.apply(n,[this].concat(a))).state={Admins:[]},e}return(0,a.Z)(t,[{key:"componentDidMount",value:function(){var e=this,n={headers:{"Content-Type":"application/json","Access-Control-Allow-Headers":"Authorization","x-access-token":localStorage.getItem("token"),Authorization:"Bearer "+localStorage.getItem("token")}};x().get(T+"/users/admin",n).then((function(n){console.log("this respon list",n.data),e.setState({Admins:n.data.data})})).catch((function(e){console.log(e)}))}},{key:"Delette",value:function(e){var n=this;console.log("hellodelet",e.id),(0,v._1)({title:"Confirm Delete",message:"Are you sure to do Delete?",buttons:[{label:"Yes",onClick:function(){x().delete("http://localhost:5000/api/v1/Admins/"+e.id).then((function(){var t=(0,r.Z)(n.state.Admins),s=t.indexOf(e);-1!==s&&(t.splice(s,1),n.setState({Admins:t}))}))}},{label:"No",onClick:null}]})}},{key:"render",value:function(){var e=this;return(0,y.jsx)(j.Z,{children:(0,y.jsx)(c.Z,{children:(0,y.jsx)(d.Z,{children:(0,y.jsxs)(u.Z,{children:[(0,y.jsx)(u.Z.Header,{children:(0,y.jsxs)(u.Z.Title,{as:"h5",children:[" ",(0,y.jsxs)(f.Z,{to:"/Add/admin",children:["  ",(0,y.jsx)(m.Z,{children:b.Z.t("add-admin")})," "]})," "]})}),(0,y.jsx)(u.Z.Body,{children:(0,y.jsxs)(h.Z,{striped:!0,responsive:!0,children:[(0,y.jsx)("thead",{children:(0,y.jsxs)("tr",{children:[(0,y.jsx)("th",{children:b.Z.t("fullname")}),(0,y.jsx)("th",{children:b.Z.t("username")}),(0,y.jsx)("th",{children:b.Z.t("phone-number")}),(0,y.jsx)("th",{children:b.Z.t("agency")}),(0,y.jsx)("th",{children:b.Z.t("address")}),(0,y.jsx)("th",{children:b.Z.t("role")}),(0,y.jsx)("th",{children:b.Z.t("action-event")})]})}),(0,y.jsx)("tbody",{children:this.state.Admins.map((function(n,t){return(0,y.jsxs)("tr",{children:[(0,y.jsxs)("td",{children:[" ",n.firstname," ",n.lastname]}),(0,y.jsxs)("td",{children:[n.username," "]}),(0,y.jsxs)("td",{children:[n.phone_number," "]}),(0,y.jsxs)("td",{children:[n.agence.name," "]}),(0,y.jsxs)("td",{children:[n.agence.address,"  ",n.city," "]}),(0,y.jsxs)("td",{children:[" ",n.descriminator," "]}),(0,y.jsxs)("td",{children:["  ",(0,y.jsxs)(m.Z,{variant:"danger",onClick:function(){return e.Delette(n)},children:[" ",(0,y.jsx)("span",{className:"fa fa-trash"})]}),(0,y.jsx)(I,{admin:n,change:function(){return e.componentDidMount()}}),(0,y.jsx)(C,{admin:n})]})]},n.id)}))})]})})]})})})})}}]),t}(o.Component),P=F},81694:function(e,n){var t;!function(){"use strict";var r={}.hasOwnProperty;function s(){for(var e=[],n=0;n<arguments.length;n++){var t=arguments[n];if(t){var a=typeof t;if("string"===a||"number"===a)e.push(t);else if(Array.isArray(t))e.push(s.apply(null,t));else if("object"===a)for(var i in t)r.call(t,i)&&t[i]&&e.push(i)}}return e.join(" ")}e.exports?e.exports=s:void 0===(t=function(){return s}.apply(n,[]))||(e.exports=t)}()},62591:function(e,n,t){"use strict";var r=t(87462),s=t(63366),a=t(60654),i=t.n(a),l=t(72791),o=t(10162),c=["bsPrefix","className","striped","bordered","borderless","hover","size","variant","responsive"],d=l.forwardRef((function(e,n){var t=e.bsPrefix,a=e.className,d=e.striped,u=e.bordered,m=e.borderless,h=e.hover,f=e.size,p=e.variant,x=e.responsive,v=(0,s.Z)(e,c),j=(0,o.vE)(t,"table"),g=i()(a,j,p&&j+"-"+p,f&&j+"-"+f,d&&j+"-striped",u&&j+"-bordered",m&&j+"-borderless",h&&j+"-hover"),Z=l.createElement("table",(0,r.Z)({},v,{className:g,ref:n}));if(x){var b=j+"-responsive";return"string"===typeof x&&(b=b+"-"+x),l.createElement("div",{className:b},Z)}return Z}));n.Z=d},30337:function(e,n,t){"use strict";var r,s,a=function(){function e(e,n){for(var t=0;t<n.length;t++){var r=n[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(n,t,r){return t&&e(n.prototype,t),r&&e(n,r),n}}();n._1=function(e){document.body.classList.add("react-confirm-alert-body-element"),function(){if(document.getElementById("react-confirm-alert-firm-svg"))return;var e="http://www.w3.org/2000/svg",n=document.createElementNS(e,"feGaussianBlur");n.setAttribute("stdDeviation","0.3");var t=document.createElementNS(e,"filter");t.setAttribute("id","gaussian-blur"),t.appendChild(n);var r=document.createElementNS(e,"svg");r.setAttribute("id","react-confirm-alert-firm-svg"),r.setAttribute("class","react-confirm-alert-svg"),r.appendChild(t),document.body.appendChild(r)}(),function(e){var n=document.getElementById("react-confirm-alert");n||(document.body.children[0].classList.add("react-confirm-alert-blur"),(n=document.createElement("div")).id="react-confirm-alert",document.body.appendChild(n)),(0,c.render)(l.default.createElement(h,e),n)}(e)};var i=t(72791),l=d(i),o=d(t(52007)),c=t(54164);function d(e){return e&&e.__esModule?e:{default:e}}function u(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function m(e,n){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!n||"object"!==typeof n&&"function"!==typeof n?e:n}var h=(s=r=function(e){function n(){var e,t,r;u(this,n);for(var s=arguments.length,a=Array(s),i=0;i<s;i++)a[i]=arguments[i];return t=r=m(this,(e=n.__proto__||Object.getPrototypeOf(n)).call.apply(e,[this].concat(a))),r.handleClickButton=function(e){e.onClick&&e.onClick(),r.close()},r.handleClickOverlay=function(e){var n=r.props,t=n.closeOnClickOutside,s=n.onClickOutside,a=e.target===r.overlay;t&&a&&(s(),r.close())},r.close=function(){var e=r.props.afterClose;x(),p(),f(e)},r.keyboardClose=function(e){var n=r.props,t=n.closeOnEscape,s=n.onKeypressEscape,a=27===e.keyCode;t&&a&&(s(e),r.close())},r.componentDidMount=function(){document.addEventListener("keydown",r.keyboardClose,!1)},r.componentWillUnmount=function(){document.removeEventListener("keydown",r.keyboardClose,!1),r.props.willUnmount()},r.renderCustomUI=function(){var e=r.props,n=e.title,t=e.message,s=e.buttons;return(0,e.customUI)({title:n,message:t,buttons:s,onClose:r.close})},m(r,t)}return function(e,n){if("function"!==typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function, not "+typeof n);e.prototype=Object.create(n&&n.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),n&&(Object.setPrototypeOf?Object.setPrototypeOf(e,n):e.__proto__=n)}(n,e),a(n,[{key:"render",value:function(){var e=this,n=this.props,t=n.title,r=n.message,s=n.buttons,a=n.childrenElement,i=n.customUI,o=n.overlayClassName;return l.default.createElement("div",{className:"react-confirm-alert-overlay "+o,ref:function(n){return e.overlay=n},onClick:this.handleClickOverlay},l.default.createElement("div",{className:"react-confirm-alert"},i?this.renderCustomUI():l.default.createElement("div",{className:"react-confirm-alert-body"},t&&l.default.createElement("h1",null,t),r,a(),l.default.createElement("div",{className:"react-confirm-alert-button-group"},s.map((function(n,t){return l.default.createElement("button",{key:t,onClick:function(){return e.handleClickButton(n)},className:n.className},n.label)}))))))}}]),n}(i.Component),r.propTypes={title:o.default.string,message:o.default.string,buttons:o.default.array.isRequired,childrenElement:o.default.func,customUI:o.default.func,closeOnClickOutside:o.default.bool,closeOnEscape:o.default.bool,willUnmount:o.default.func,afterClose:o.default.func,onClickOutside:o.default.func,onKeypressEscape:o.default.func,overlayClassName:o.default.string},r.defaultProps={buttons:[{label:"Cancel",onClick:function(){return null},className:null},{label:"Confirm",onClick:function(){return null},className:null}],childrenElement:function(){return null},closeOnClickOutside:!0,closeOnEscape:!0,willUnmount:function(){return null},afterClose:function(){return null},onClickOutside:function(){return null},onKeypressEscape:function(){return null}},s);function f(e){var n=document.getElementById("react-confirm-alert-firm-svg");n&&n.parentNode.removeChild(n),document.body.children[0].classList.remove("react-confirm-alert-blur"),e()}function p(){var e=document.getElementById("react-confirm-alert");e&&((0,c.unmountComponentAtNode)(e),e.parentNode.removeChild(e))}function x(){document.body.classList.remove("react-confirm-alert-body-element")}},58988:function(){}}]);
//# sourceMappingURL=9261.bb7d6e65.chunk.js.map