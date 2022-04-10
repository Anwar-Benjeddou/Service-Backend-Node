"use strict";(self.webpackChunksubdomaine=self.webpackChunksubdomaine||[]).push([[9908],{42464:function(e,n,t){t(72791);var r=t(99410),i=t(74292),a=t(95693),o=t(80184);n.Z=function(e){var n=e.name,t=e.label,l=e.onChange,s=e.onBlur,c=e.value,d=e.type,u=e.isInvalid,f=e.errors,m=e.touched;return(0,o.jsx)(o.Fragment,{children:"Phone"===t?(0,o.jsxs)(o.Fragment,{children:[(0,o.jsxs)("label",{htmlFor:"basic-url",children:[n," ",(0,o.jsx)(a.Z,{errors:f,touched:m})]}),(0,o.jsxs)(r.Z,{className:"mb-3",children:[(0,o.jsx)(r.Z.Prepend,{children:(0,o.jsx)(r.Z.Text,{id:"basic-addon1",children:"+216"})}),(0,o.jsx)(i.Z,{placeholder:t,"aria-label":n,"aria-describedby":n,onChange:l,onBlur:s,value:c,isInvalid:u,label:t,name:n,type:d})]})]}):(0,o.jsxs)(o.Fragment,{children:[(0,o.jsxs)("label",{htmlFor:"basic-url",children:[t,"  ",(0,o.jsx)(a.Z,{errors:f,touched:m})]}),(0,o.jsx)(r.Z,{className:"mb-3",children:(0,o.jsx)(i.Z,{placeholder:t,"aria-label":t,"aria-describedby":t,onChange:l,onBlur:s,value:c,isInvalid:u,label:t,name:n,type:d})})]})})}},95693:function(e,n,t){t.d(n,{Z:function(){return l}});var r=t(29439),i=(t(72791),t(65151)),a=t(22247),o=t(80184),l=function(e){var n=function(e,n){return n?e&&n?["fa-times-circle-o input-invalid",e]:!e&&n?["fa-check-circle-o input-valid",a.Z.t("valid-field")]:void 0:[]}(e.errors,e.touched),t=(0,r.Z)(n,2),l=t[0],s=t[1];return(0,o.jsx)(i.ZP,{title:Array.isArray(s)?s.map((function(e){return(0,o.jsxs)("span",{className:"tooltip-message",children:[e," ",(0,o.jsx)("br",{})]})})):(0,o.jsxs)("span",{className:"tooltip-message",children:[s," ",(0,o.jsx)("br",{})]}),placement:"right",children:(0,o.jsx)("span",{children:(0,o.jsx)("i",{className:"fa "+l})})})}},89908:function(e,n,t){t.r(n),t.d(n,{default:function(){return _}});var r=t(93433),i=t(15671),a=t(43144),o=t(60136),l=t(29388),s=t(72791),c=t(89743),d=t(2677),u=t(78695),f=t(43360),m=t(62591),h=t(78417),p=t(74569),v=t.n(p),b=t(30337),x=(t(58988),t(74387)),y=t(29439),j=t(38780),g=t(55705),Z=t(76863),C=t(42464),k=t(80184),E=t(24245)(),N=Z.Ry().shape({email:Z.Z_().email("Invalid Email").required("Email is Required"),phone_number:Z.Z_().matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,"Phone number is not valid").required("Phone is Required"),city:Z.Z_().min(2,"City is Too Short!").max(20,"City is Too Long!").required("City is Required"),description:Z.Z_().min(2,"description is Too Short!").max(20,"description is Too Long!").required("description is Required"),name:Z.Z_().min(2,"name is Too Short!").max(20,"name is Too Long!").required("name is Required"),code:Z.Z_().min(2,"code is Too Short!").max(20,"code is Too Long!").required("code is Required")});var w=function(e){var n=this,t=(0,s.useState)(!1),r=(0,y.Z)(t,2),i=r[0],a=r[1],o=function(){return a(!1)};(0,s.useEffect)((function(){}),[]);var l=function(n){var t=n.values,r=n.errors,i=n.touched,a=n.handleChange,l=(n.handleSubmit,n.handleBlur),s=(n.setFieldValue,n.isSubmitting,n.dirty,n.isValid,n.handleReset);return(0,k.jsx)(x.Z,{children:(0,k.jsx)(c.Z,{children:(0,k.jsx)(d.Z,{children:(0,k.jsxs)(u.Z,{children:[(0,k.jsx)(u.Z.Header,{children:(0,k.jsx)(u.Z.Title,{as:"h5",children:"Caisse"})}),(0,k.jsxs)(u.Z.Body,{children:[(0,k.jsx)(c.Z,{children:(0,k.jsx)(d.Z,{md:12,children:(0,k.jsx)(C.Z,{name:"prix",label:"prix",type:"number",onChange:a,onBlur:l,value:t.prix,touched:i.prix,errors:r.prix})})}),(0,k.jsx)(f.Z,{onClick:function(){!function(n){var t={headers:{"Content-Type":"application/json","Access-Control-Allow-Headers":"Authorization","x-access-token":localStorage.getItem("token"),Authorization:"Bearer "+localStorage.getItem("token")}};v().put(E+"/facture/driver/set_money",{driver:e.drive,frais:n.prix},t).then((function(n){alert("add Succefull"),console.log(n.data),e.change(),o()})).catch((function(e){console.log(e)}))}(t),s()},children:"Save"})]})]})})})})};return(0,k.jsxs)(k.Fragment,{children:[(0,k.jsxs)(f.Z,{variant:"info",onClick:function(){return a(!0)},children:[" ",(0,k.jsx)("span",{className:"fa fa-paper-plane"})]}),(0,k.jsxs)(j.Z,{show:i,onHide:o,children:[(0,k.jsx)(j.Z.Header,{closeButton:!0,children:(0,k.jsx)(j.Z.Title,{children:"Caisse   "})}),(0,k.jsx)(j.Z.Body,{children:(0,k.jsx)(g.J9,{initialValues:{prix:0},onSubmit:function(e,t){var r=t.setSubmitting;n.submitForm(e),r(!1)},validationSchema:N,children:function(e){return l(e)}})}),(0,k.jsx)(j.Z.Footer,{children:(0,k.jsx)(f.Z,{variant:"secondary",onClick:o,children:"Close"})})]})]})},O=t(24245)(),S=function(e){(0,o.Z)(t,e);var n=(0,l.Z)(t);function t(){var e;(0,i.Z)(this,t);for(var r=arguments.length,a=new Array(r),o=0;o<r;o++)a[o]=arguments[o];return(e=n.call.apply(n,[this].concat(a))).state={Drivers:[]},e}return(0,a.Z)(t,[{key:"componentDidMount",value:function(){var e=this,n={headers:{"Content-Type":"application/json","Access-Control-Allow-Headers":"Authorization","x-access-token":localStorage.getItem("token"),Authorization:"Bearer "+localStorage.getItem("token")}};v().get(O+"/driver",n).then((function(n){console.log("this respon list",n.data),e.setState({Drivers:n.data.data})})).catch((function(e){console.log(e)}))}},{key:"Delette",value:function(e){var n=this;console.log("hellodelet",e.id),(0,b._1)({title:"Confirm Delete",message:"Are you sure to do Delete?",buttons:[{label:"Yes",onClick:function(){v().delete("http://localhost:5000/api/v1/Drivers/"+e.id).then((function(){var t=(0,r.Z)(n.state.Drivers),i=t.indexOf(e);-1!==i&&(t.splice(i,1),n.setState({Drivers:t}))}))}},{label:"No",onClick:null}]})}},{key:"render",value:function(){var e=this;return(0,k.jsx)(x.Z,{children:(0,k.jsx)(c.Z,{children:(0,k.jsx)(d.Z,{children:(0,k.jsxs)(u.Z,{children:[(0,k.jsx)(u.Z.Header,{children:(0,k.jsxs)(u.Z.Title,{as:"h5",children:["caisse",(0,k.jsxs)(h.Z,{to:"/Add/driver",children:[" ",(0,k.jsx)(f.Z,{children:" Ajouter Driver"})," "]})," "]})}),(0,k.jsx)(u.Z.Body,{children:(0,k.jsxs)(m.Z,{striped:!0,responsive:!0,children:[(0,k.jsx)("thead",{children:(0,k.jsxs)("tr",{children:[(0,k.jsx)("th",{children:"Nom"}),(0,k.jsx)("th",{children:"username"}),(0,k.jsx)("th",{children:"N. de t\xe9l\xe9phone"}),(0,k.jsx)("th",{children:"agence"}),(0,k.jsx)("th",{children:"Montant"}),(0,k.jsx)("th",{children:"Actions"})]})}),(0,k.jsx)("tbody",{children:this.state.Drivers.map((function(n,t){var r;return(0,k.jsxs)("tr",{children:[(0,k.jsxs)("td",{children:[n.firstname," ",n.lastname]}),(0,k.jsxs)("td",{children:[n.username," "]}),(0,k.jsxs)("td",{children:[n.phone_number," "]}),(0,k.jsxs)("td",{children:[null===(r=n.zone)||void 0===r?void 0:r.name," "]}),(0,k.jsxs)("td",{style:{fontWeight:"bold"},className:"font-weight-bold text-black",children:[" ",n.frais_livraision,"  TND "]}),(0,k.jsxs)("td",{children:[" ",(0,k.jsx)(w,{price:n.frais_livraision,drive:n.id,change:function(){return e.componentDidMount()}}),(0,k.jsx)(h.Z,{to:"/history/driver/"+n.id,children:(0,k.jsxs)(f.Z,{variant:"success",onClick:function(){return console.log("not yet")},children:[" ",(0,k.jsx)("span",{className:"fa fa-file"})]})})]})]},n.id)}))})]})})]})})})})}}]),t}(s.Component),_=S},78695:function(e,n,t){t.d(n,{Z:function(){return w}});var r=t(87462),i=t(63366),a=t(60654),o=t.n(a),l=t(72791),s=t(10162),c=t(71923),d=t(27472),u=t(87338),f=["bsPrefix","className","variant","as"],m=l.forwardRef((function(e,n){var t=e.bsPrefix,a=e.className,c=e.variant,d=e.as,u=void 0===d?"img":d,m=(0,i.Z)(e,f),h=(0,s.vE)(t,"card-img");return l.createElement(u,(0,r.Z)({ref:n,className:o()(c?h+"-"+c:h,a)},m))}));m.displayName="CardImg",m.defaultProps={variant:null};var h=m,p=["bsPrefix","className","bg","text","border","body","children","as"],v=(0,d.Z)("h5"),b=(0,d.Z)("h6"),x=(0,c.Z)("card-body"),y=(0,c.Z)("card-title",{Component:v}),j=(0,c.Z)("card-subtitle",{Component:b}),g=(0,c.Z)("card-link",{Component:"a"}),Z=(0,c.Z)("card-text",{Component:"p"}),C=(0,c.Z)("card-header"),k=(0,c.Z)("card-footer"),E=(0,c.Z)("card-img-overlay"),N=l.forwardRef((function(e,n){var t=e.bsPrefix,a=e.className,c=e.bg,d=e.text,f=e.border,m=e.body,h=e.children,v=e.as,b=void 0===v?"div":v,y=(0,i.Z)(e,p),j=(0,s.vE)(t,"card"),g=(0,l.useMemo)((function(){return{cardHeaderBsPrefix:j+"-header"}}),[j]);return l.createElement(u.Z.Provider,{value:g},l.createElement(b,(0,r.Z)({ref:n},y,{className:o()(a,j,c&&"bg-"+c,d&&"text-"+d,f&&"border-"+f)}),m?l.createElement(x,null,h):h))}));N.displayName="Card",N.defaultProps={body:!1},N.Img=h,N.Title=y,N.Subtitle=j,N.Body=x,N.Link=g,N.Text=Z,N.Header=C,N.Footer=k,N.ImgOverlay=E;var w=N},62591:function(e,n,t){var r=t(87462),i=t(63366),a=t(60654),o=t.n(a),l=t(72791),s=t(10162),c=["bsPrefix","className","striped","bordered","borderless","hover","size","variant","responsive"],d=l.forwardRef((function(e,n){var t=e.bsPrefix,a=e.className,d=e.striped,u=e.bordered,f=e.borderless,m=e.hover,h=e.size,p=e.variant,v=e.responsive,b=(0,i.Z)(e,c),x=(0,s.vE)(t,"table"),y=o()(a,x,p&&x+"-"+p,h&&x+"-"+h,d&&x+"-striped",u&&x+"-bordered",f&&x+"-borderless",m&&x+"-hover"),j=l.createElement("table",(0,r.Z)({},b,{className:y,ref:n}));if(v){var g=x+"-responsive";return"string"===typeof v&&(g=g+"-"+v),l.createElement("div",{className:g},j)}return j}));n.Z=d},30337:function(e,n,t){var r,i,a=function(){function e(e,n){for(var t=0;t<n.length;t++){var r=n[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(n,t,r){return t&&e(n.prototype,t),r&&e(n,r),n}}();n._1=function(e){document.body.classList.add("react-confirm-alert-body-element"),function(){if(document.getElementById("react-confirm-alert-firm-svg"))return;var e="http://www.w3.org/2000/svg",n=document.createElementNS(e,"feGaussianBlur");n.setAttribute("stdDeviation","0.3");var t=document.createElementNS(e,"filter");t.setAttribute("id","gaussian-blur"),t.appendChild(n);var r=document.createElementNS(e,"svg");r.setAttribute("id","react-confirm-alert-firm-svg"),r.setAttribute("class","react-confirm-alert-svg"),r.appendChild(t),document.body.appendChild(r)}(),function(e){var n=document.getElementById("react-confirm-alert");n||(document.body.children[0].classList.add("react-confirm-alert-blur"),(n=document.createElement("div")).id="react-confirm-alert",document.body.appendChild(n)),(0,c.render)(l.default.createElement(m,e),n)}(e)};var o=t(72791),l=d(o),s=d(t(52007)),c=t(54164);function d(e){return e&&e.__esModule?e:{default:e}}function u(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function f(e,n){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!n||"object"!==typeof n&&"function"!==typeof n?e:n}var m=(i=r=function(e){function n(){var e,t,r;u(this,n);for(var i=arguments.length,a=Array(i),o=0;o<i;o++)a[o]=arguments[o];return t=r=f(this,(e=n.__proto__||Object.getPrototypeOf(n)).call.apply(e,[this].concat(a))),r.handleClickButton=function(e){e.onClick&&e.onClick(),r.close()},r.handleClickOverlay=function(e){var n=r.props,t=n.closeOnClickOutside,i=n.onClickOutside,a=e.target===r.overlay;t&&a&&(i(),r.close())},r.close=function(){var e=r.props.afterClose;v(),p(),h(e)},r.keyboardClose=function(e){var n=r.props,t=n.closeOnEscape,i=n.onKeypressEscape,a=27===e.keyCode;t&&a&&(i(e),r.close())},r.componentDidMount=function(){document.addEventListener("keydown",r.keyboardClose,!1)},r.componentWillUnmount=function(){document.removeEventListener("keydown",r.keyboardClose,!1),r.props.willUnmount()},r.renderCustomUI=function(){var e=r.props,n=e.title,t=e.message,i=e.buttons;return(0,e.customUI)({title:n,message:t,buttons:i,onClose:r.close})},f(r,t)}return function(e,n){if("function"!==typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function, not "+typeof n);e.prototype=Object.create(n&&n.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),n&&(Object.setPrototypeOf?Object.setPrototypeOf(e,n):e.__proto__=n)}(n,e),a(n,[{key:"render",value:function(){var e=this,n=this.props,t=n.title,r=n.message,i=n.buttons,a=n.childrenElement,o=n.customUI,s=n.overlayClassName;return l.default.createElement("div",{className:"react-confirm-alert-overlay "+s,ref:function(n){return e.overlay=n},onClick:this.handleClickOverlay},l.default.createElement("div",{className:"react-confirm-alert"},o?this.renderCustomUI():l.default.createElement("div",{className:"react-confirm-alert-body"},t&&l.default.createElement("h1",null,t),r,a(),l.default.createElement("div",{className:"react-confirm-alert-button-group"},i.map((function(n,t){return l.default.createElement("button",{key:t,onClick:function(){return e.handleClickButton(n)},className:n.className},n.label)}))))))}}]),n}(o.Component),r.propTypes={title:s.default.string,message:s.default.string,buttons:s.default.array.isRequired,childrenElement:s.default.func,customUI:s.default.func,closeOnClickOutside:s.default.bool,closeOnEscape:s.default.bool,willUnmount:s.default.func,afterClose:s.default.func,onClickOutside:s.default.func,onKeypressEscape:s.default.func,overlayClassName:s.default.string},r.defaultProps={buttons:[{label:"Cancel",onClick:function(){return null},className:null},{label:"Confirm",onClick:function(){return null},className:null}],childrenElement:function(){return null},closeOnClickOutside:!0,closeOnEscape:!0,willUnmount:function(){return null},afterClose:function(){return null},onClickOutside:function(){return null},onKeypressEscape:function(){return null}},i);function h(e){var n=document.getElementById("react-confirm-alert-firm-svg");n&&n.parentNode.removeChild(n),document.body.children[0].classList.remove("react-confirm-alert-blur"),e()}function p(){var e=document.getElementById("react-confirm-alert");e&&((0,c.unmountComponentAtNode)(e),e.parentNode.removeChild(e))}function v(){document.body.classList.remove("react-confirm-alert-body-element")}},58988:function(){}}]);
//# sourceMappingURL=9908.84fc47a9.chunk.js.map