"use strict";(self.webpackChunksubdomaine=self.webpackChunksubdomaine||[]).push([[2394],{50054:function(e,t,n){var o=n(29439),r=n(72791),l=n(43360),i=n(38780),s=(n(30456),n(45310)),d=(n(74569),n(80184));n(24245)();t.Z=function(e){var t=(0,r.useState)(!1),n=(0,o.Z)(t,2),c=n[0],a=n[1],h=(0,r.useState)(e.providerinfo),u=(0,o.Z)(h,2),x=u[0],F=u[1];(0,r.useEffect)((function(){var t;F(null===(t=e.providerinfo)||void 0===t?void 0:t.data[0])}),[]);var g=function(){return a(!1)};return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsxs)(l.Z,{variant:"success",onClick:function(){return a(!0)},children:[" ",(0,d.jsx)("span",{className:"fa fa-print"})]}),(0,d.jsxs)(i.Z,{size:"xl",show:c,onHide:g,children:[(0,d.jsx)(i.Z.Header,{closeButton:!0,children:(0,d.jsx)(i.Z.Title,{children:" Fast Box  "})}),(0,d.jsx)(i.Z.Body,{children:(0,d.jsx)("div",{style:{paddingLeft:50},children:(0,d.jsx)(s.Z,{Template:e.Template,providerinfo:x})})}),(0,d.jsx)(i.Z.Footer,{children:(0,d.jsx)(l.Z,{variant:"secondary",onClick:g,children:"Fermer"})})]})]})}},23085:function(e,t,n){n.d(t,{Z:function(){return C}});var o=n(29439),r=n(72791),l=n(43360),i=n(38780),s=n(30456),d=n(93433),c=n(4942),a=n(15671),h=n(43144),u=n(60136),x=n(29388),F=n(72024),g=(n(34648),n(33237)),p=n(61146),f=n.n(p),y=n(84763),b=n.n(y),j=n(80184),m=function(e){(0,u.Z)(n,e);var t=(0,x.Z)(n);function n(e){var o;return(0,a.Z)(this,n),(o=t.call(this,e)).state={checkbox:!1,dropdownValue:"fa"},o}return(0,h.Z)(n,[{key:"changeDropdown",value:function(e){this.setState({dropdownValue:e.target.value})}},{key:"render",value:function(){var e=this;return(0,j.jsx)("div",{style:{paddingTop:50,paddingLeft:15},children:this.props.Template.map((function(t){var n,o,r,l,i,s,a,h;return(0,j.jsxs)("div",{style:{paddingTop:50,paddingLeft:60},children:[(0,j.jsxs)("table",{children:[(0,j.jsxs)("thead",{children:[(0,j.jsx)("th",{style:{width:300}}),(0,j.jsx)("th",{style:{width:300}}),(0,j.jsx)("th",{style:{width:320}})]}),(0,j.jsx)("tbody",{children:(0,j.jsxs)("tr",{children:[(0,j.jsx)("td",{style:(0,c.Z)({paddingLeft:40,alignItems:"center",border:"2px solid #000000",backgroundColor:"#FFFFFF"},"backgroundColor","#FFFFFF"),children:(0,j.jsx)(g.QRCode,{bgColor:"#FFFFFF",fgColor:"#000000",level:"H",style:{width:150,height:150,marginTop:30},value:t.colis.id,children:"   "})}),(0,j.jsxs)("td",{style:(0,c.Z)({textAlign:"center",border:"2px solid #000000",backgroundColor:"#FFFFFF"},"backgroundColor","#FFFFFF"),children:[(0,j.jsx)("img",{style:{width:"300px",float:"left"},src:F.Z.images,alt:"activity-user"}),(0,j.jsx)("br",{}),(0,j.jsxs)("p",{style:{"font-weight":"bold",color:"#000000"},children:["MF : ",F.Z.matricule]}),(0,j.jsx)("p",{style:{"font-weight":"bold",color:"#000000"},children:F.Z.addresse1+F.Z.addresse2})]}),(0,j.jsxs)("td",{style:{paddingLeft:20,border:"2px solid #000000",backgroundColor:"#FFFFFF"},children:[(0,j.jsx)(b(),{height:35,width:1,value:t.colis.id,fontSize:11}),(0,j.jsx)("h5",{style:{textAlign:"center",fontFamily:"bold"},children:"BORDEREAU D'ENVOI N\xb0 "}),(0,j.jsxs)("h3",{style:{textAlign:"center",fontFamily:"bold"},children:[" ",t.colis.index_colis]})]})]})})]}),(0,j.jsxs)("table",{children:[(0,j.jsxs)("thead",{children:[(0,j.jsx)("th",{style:{width:450}}),(0,j.jsx)("th",{style:{width:150}}),(0,j.jsx)("th",{style:{width:320}})]}),(0,j.jsx)("tbody",{children:(0,j.jsxs)("tr",{children:[(0,j.jsxs)("td",{style:{backgroundColor:"#FFFFFF"},children:[(0,j.jsxs)("p",{style:{textAlign:"left","font-weight":"bold",fontSize:18,color:"#000000"},children:["Destinataire : ",t.colis.name_complete]}),(0,j.jsxs)("p",{style:{textAlign:"left","font-weight":"bold",fontSize:18,color:"#000000"},children:["T\xe9l : ",t.colis.phone_number]}),(0,j.jsxs)("p",{style:{textAlign:"left","font-weight":"bold",fontSize:18,color:"#000000"},children:["addresse : ",t.colis.gouvernorat," - ",t.colis.city]}),(0,j.jsx)("p",{style:{textAlign:"left","font-weight":"bold",color:"#000000",fontSize:18},children:t.colis.address})]}),(0,j.jsx)("td",{style:{backgroundColor:"#FFFFFF"}}),(0,j.jsxs)("td",{style:{backgroundColor:"#FFFFFF",border:"2px solid #9da69c"},children:[(0,j.jsxs)("p",{style:{"font-weight":"bold",color:"#000000",fontSize:18},children:["Exp\xe9diteur : ",e.props.providerinfo.username]}),(0,j.jsxs)("p",{style:{"font-weight":"bold",color:"#000000",fontSize:18},children:["Soci\xe9t\xe9 : ",e.props.providerinfo.company]}),(0,j.jsxs)("p",{style:{"font-weight":"bold",color:"#000000",fontSize:18},children:["T\xe9l : ",e.props.providerinfo.phone_number]}),(0,j.jsxs)("p",{style:{"font-weight":"bold",color:"#000000",fontSize:18},children:["fiscal /cin :",e.props.providerinfo.code_fiscal]})]})]})})]}),(0,j.jsxs)("table",{children:[(0,j.jsx)("thead",{}),(0,j.jsxs)("tbody",{children:[(0,j.jsxs)("tr",{children:[(0,j.jsx)("td",{style:{backgroundColor:"#FFFFFF",textAlign:"center",width:300,border:"2px solid #000000"},children:(0,j.jsx)("p",{style:{textAlign:"center","font-weight":"bold",color:"#000000"},children:"DESIGNATION"})}),(0,j.jsx)("td",{style:{backgroundColor:"#FFFFFF",textAlign:"center",width:150,border:"2px solid #000000"},children:(0,j.jsx)("p",{style:{textAlign:"center","font-weight":"bold",color:"#000000"},children:"QTE"})}),(0,j.jsx)("td",{style:{backgroundColor:"#FFFFFF",textAlign:"center",width:150,border:"2px solid #000000"},children:(0,j.jsx)("p",{style:{textAlign:"center","font-weight":"bold",color:"#000000"},children:"PU HT"})}),(0,j.jsx)("td",{style:{backgroundColor:"#FFFFFF",textAlign:"center",width:320,border:"2px solid #000000"},children:(0,j.jsx)("p",{style:{textAlign:"center","font-weight":"bold",color:"#000000"},children:"PT HT"})})]}),(0,j.jsxs)("tr",{children:[(0,j.jsx)("td",{style:{backgroundColor:"#FFFFFF",textAlign:"center",heigh:60,width:300,border:"2px solid #000000"},children:(0,j.jsx)("p",{style:{textAlign:"center","font-weight":"bold",color:"#000000"},children:null===(n=t.colis)||void 0===n?void 0:n.designation})}),(0,j.jsx)("td",{style:{backgroundColor:"#FFFFFF",textAlign:"center",heigh:60,width:150,border:"2px solid #000000"},children:(0,j.jsx)("p",{style:{textAlign:"center","font-weight":"bold",color:"#000000"},children:"1"})}),(0,j.jsx)("td",{style:{backgroundColor:"#FFFFFF",textAlign:"center",height:60,width:150,border:"2px solid #000000"},children:(0,j.jsx)("p",{style:{textAlign:"center","font-weight":"bold",color:"#000000"},children:.89*(null===(o=t.colis)||void 0===o?void 0:o.price)})}),(0,j.jsx)("td",{style:{backgroundColor:"#FFFFFF",textAlign:"center",height:60,width:300,border:"2px solid #000000"},children:(0,j.jsx)("p",{style:{textAlign:"center","font-weight":"bold",color:"#000000"},children:.89*(null===(r=t.colis)||void 0===r?void 0:r.price)})})]}),(0,j.jsxs)("tr",{children:[(0,j.jsxs)("td",{style:{backgroundColor:"#FFFFFF",textAlign:"center",heigh:40,width:300},children:["1/ ",t.colis.lot]}),(0,j.jsx)("td",{style:{backgroundColor:"#FFFFFF",textAlign:"center",heigh:40,width:150}}),(0,j.jsx)("td",{style:{backgroundColor:"#FFFFFF",textAlign:"center",height:40,width:150,border:"2px solid #000000"},children:(0,j.jsx)("p",{style:{textAlign:"center","font-weight":"bold",color:"#000000"},children:" TOTAL HT"})}),(0,j.jsx)("td",{style:{backgroundColor:"#FFFFFF",textAlign:"center",height:40,width:300,border:"2px solid #000000"},children:(0,j.jsx)("p",{style:{textAlign:"center","font-weight":"bold",color:"#000000"},children:.89*(null===(l=t.colis)||void 0===l?void 0:l.price)})})]}),(0,j.jsxs)("tr",{children:[(0,j.jsx)("td",{style:{backgroundColor:"#FFFFFF",textAlign:"center",heigh:40,width:300},children:(0,j.jsx)("div",{style:{border:"2px solid #000000",height:50},children:"note"})}),(0,j.jsx)("td",{style:{backgroundColor:"#FFFFFF",textAlign:"center",heigh:40,width:150}}),(0,j.jsx)("td",{style:{backgroundColor:"#FFFFFF",textAlign:"center",height:40,width:150,border:"2px solid #000000"},children:(0,j.jsx)("p",{style:{textAlign:"center","font-weight":"bold",color:"#000000"},children:" TVA 19%"})}),(0,j.jsx)("td",{style:{backgroundColor:"#FFFFFF",textAlign:"center",height:40,width:300,border:"2px solid #000000"},children:(0,j.jsx)("p",{style:{textAlign:"center","font-weight":"bold",color:"#000000"},children:.19*(null===(i=t.colis)||void 0===i?void 0:i.price)})})]}),(0,j.jsxs)("tr",{children:[(0,j.jsxs)("td",{style:{backgroundColor:"#FFFFFF",textAlign:"center",heigh:40,width:300},children:[(0,j.jsx)("p",{style:{textAlign:"center","font-weight":"bold",color:"#000000"},children:null===(s=t.colis)||void 0===s?void 0:s.payment_mode}),(0,j.jsx)("p",{style:{textAlign:"center","font-weight":"bold",color:"#000000"},children:null===(a=t.colis)||void 0===a?void 0:a.type_envoi})]}),(0,j.jsx)("td",{style:{backgroundColor:"#FFFFFF",textAlign:"center",heigh:40,width:150}}),(0,j.jsx)("td",{style:{backgroundColor:"#FFFFFF",textAlign:"center",height:40,width:150,border:"2px solid #000000"},children:(0,j.jsx)("p",{style:{textAlign:"center","font-weight":"bold",color:"#000000"},children:" NET A PAYER"})}),(0,j.jsx)("td",{style:{backgroundColor:"#FFFFFF",textAlign:"center",height:40,width:300,border:"2px solid #000000"},children:(0,j.jsx)("p",{style:{textAlign:"center","font-weight":"bold",color:"#000000"},children:null===(h=t.colis)||void 0===h?void 0:h.price})})]})]})]}),(0,j.jsxs)("div",{style:{width:"100%",textAlign:"center",margin:"20px 20px 20px 0px",marginTop:"40px"},children:[(0,j.jsx)("span",{children:"\u2702"}),"---------------------------------------------------------------------------------------------------------------------------------------------------------------------"]}),t.colis.lot&&(0,d.Z)(Array(t.colis.lot-1)).map((function(n,o){var r;return(0,j.jsxs)("div",{style:{paddingTop:50,paddingLeft:15,height:650},children:[(0,j.jsxs)("table",{children:[(0,j.jsxs)("thead",{children:[(0,j.jsx)("th",{style:{width:300}}),(0,j.jsx)("th",{style:{width:300}}),(0,j.jsx)("th",{style:{width:320}})]}),(0,j.jsx)("tbody",{children:(0,j.jsxs)("tr",{children:[(0,j.jsx)("td",{style:{backgroundColor:"#FFFFFF",textAlign:"center",border:"2px solid #000000"},children:(0,j.jsx)(g.QRCode,{bgColor:"#FFFFFF",fgColor:"#000000",level:"H",style:{width:150,height:150,marginTop:30},value:t.colis.id,children:"   "})}),(0,j.jsxs)("td",{style:{backgroundColor:"#FFFFFF",textAlign:"center",border:"2px solid #000000"},children:[(0,j.jsx)("img",{style:{width:"300px",float:"left"},src:F.Z.images,alt:"activity-user"}),(0,j.jsx)("br",{}),(0,j.jsxs)("p",{style:{"font-weight":"bold",color:"#000000"},children:["MF : ",F.Z.matricule]}),(0,j.jsx)("p",{style:{"font-weight":"bold",color:"#000000"},children:F.Z.addresse1+F.Z.addresse2})]}),(0,j.jsxs)("td",{style:{backgroundColor:"#FFFFFF",border:"2px solid #000000"},children:[(0,j.jsx)(b(),{height:35,width:1,value:t.colis.id,fontSize:11}),(0,j.jsx)("h5",{style:{textAlign:"left",fontFamily:"bold"},children:"BORDEREAU D'ENVOI N\xb0 "}),(0,j.jsxs)("h3",{style:{textAlign:"center",fontFamily:"bold"},children:[" ",t.colis.index_colis]})]})]})})]}),(0,j.jsxs)("table",{children:[(0,j.jsxs)("thead",{children:[(0,j.jsx)("th",{style:{width:450}}),(0,j.jsx)("th",{style:{width:150}}),(0,j.jsx)("th",{style:{width:320}})]}),(0,j.jsx)("tbody",{children:(0,j.jsxs)("tr",{children:[(0,j.jsxs)("td",{style:{backgroundColor:"#FFFFFF",textAlign:"center"},children:[(0,j.jsxs)("p",{style:{textAlign:"left","font-weight":"bold",color:"#000000",fontSize:18},children:["Destinataire : ",t.colis.name_complete]}),(0,j.jsxs)("p",{style:{textAlign:"left","font-weight":"bold",color:"#000000",fontSize:18},children:["T\xe9l : ",t.colis.phone_number]}),(0,j.jsxs)("p",{style:{textAlign:"left","font-weight":"bold",color:"#000000",fontSize:18},children:["addresse : ",t.colis.gouvernorat," - ",t.colis.city]}),(0,j.jsx)("p",{style:{textAlign:"left","font-weight":"bold",color:"#000000",fontSize:18},children:t.colis.address})]}),(0,j.jsx)("td",{style:{backgroundColor:"#FFFFFF",textAlign:"center"}}),(0,j.jsxs)("td",{style:{backgroundColor:"#FFFFFF",border:"2px solid #9da69c"},children:[(0,j.jsxs)("p",{style:{"font-weight":"bold",color:"#000000",fontSize:18},children:["Exp\xe9diteur : ",e.props.providerinfo.username]}),(0,j.jsxs)("p",{style:{"font-weight":"bold",color:"#000000",fontSize:18},children:["Soci\xe9t\xe9 : ",e.props.providerinfo.company]}),(0,j.jsxs)("p",{style:{"font-weight":"bold",color:"#000000",fontSize:18},children:["T\xe9l : ",e.props.providerinfo.phone_number]}),(0,j.jsxs)("p",{style:{"font-weight":"bold",color:"#000000",fontSize:18},children:["fiscal /cin :",e.props.providerinfo.code_fiscal]})]})]})})]}),(0,j.jsxs)("table",{children:[(0,j.jsx)("thead",{}),(0,j.jsxs)("tbody",{children:[(0,j.jsxs)("tr",{children:[(0,j.jsx)("td",{style:{backgroundColor:"#FFFFFF",textAlign:"center",width:300,border:"2px solid #000000"},children:(0,j.jsx)("p",{style:{textAlign:"center","font-weight":"bold",color:"#000000"},children:"DESIGNATION"})}),(0,j.jsx)("td",{style:{backgroundColor:"#FFFFFF",textAlign:"center",width:150,border:"2px solid #000000"},children:(0,j.jsx)("p",{style:{textAlign:"center","font-weight":"bold",color:"#000000"},children:"QTE"})}),(0,j.jsx)("td",{style:{backgroundColor:"#FFFFFF",textAlign:"center",width:150,border:"2px solid #000000"},children:(0,j.jsx)("p",{style:{textAlign:"center","font-weight":"bold",color:"#000000"},children:"PU HT"})}),(0,j.jsx)("td",{style:{backgroundColor:"#FFFFFF",textAlign:"center",width:300,border:"2px solid #000000"},children:(0,j.jsx)("p",{style:{textAlign:"center","font-weight":"bold",color:"#000000"},children:"PT HT"})})]}),(0,j.jsxs)("tr",{children:[(0,j.jsx)("td",{style:{backgroundColor:"#FFFFFF",textAlign:"center",heigh:60,width:300,border:"2px solid #000000"},children:(0,j.jsx)("p",{style:{textAlign:"center","font-weight":"bold",color:"#000000"},children:null===(r=t.colis)||void 0===r?void 0:r.designation})}),(0,j.jsx)("td",{style:{backgroundColor:"#FFFFFF",textAlign:"center",heigh:60,width:150,border:"2px solid #000000"},children:(0,j.jsx)("p",{style:{textAlign:"center","font-weight":"bold",color:"#000000"},children:"1"})}),(0,j.jsx)("td",{style:{backgroundColor:"#FFFFFF",textAlign:"center",height:60,width:150,border:"2px solid #000000"},children:(0,j.jsx)("p",{style:{textAlign:"center","font-weight":"bold",color:"#000000"},children:"0"})}),(0,j.jsx)("td",{style:{backgroundColor:"#FFFFFF",textAlign:"center",height:60,width:300,border:"2px solid #000000"},children:(0,j.jsx)("p",{style:{textAlign:"center","font-weight":"bold",color:"#000000"},children:"0"})})]}),(0,j.jsxs)("tr",{children:[(0,j.jsxs)("td",{style:{backgroundColor:"#FFFFFF",textAlign:"center",heigh:40,width:300},children:[o+2," / ",t.colis.lot]}),(0,j.jsx)("td",{style:{backgroundColor:"#FFFFFF",textAlign:"center",heigh:40,width:150}}),(0,j.jsx)("td",{style:{backgroundColor:"#FFFFFF",textAlign:"center",height:40,width:150,border:"2px solid #000000"},children:(0,j.jsx)("p",{style:{textAlign:"center","font-weight":"bold",color:"#000000"},children:" TOTAL HT"})}),(0,j.jsx)("td",{style:{backgroundColor:"#FFFFFF",textAlign:"center",height:40,width:300,border:"2px solid #000000"},children:(0,j.jsx)("p",{style:{textAlign:"center","font-weight":"bold",color:"#000000"},children:"0"})})]}),(0,j.jsxs)("tr",{children:[(0,j.jsx)("td",{style:{backgroundColor:"#FFFFFF",textAlign:"center",heigh:40,width:300},children:(0,j.jsx)("div",{style:{border:"2px solid #000000",height:50},children:"note"})}),(0,j.jsx)("td",{style:{backgroundColor:"#FFFFFF",textAlign:"center",heigh:40,width:150}}),(0,j.jsx)("td",{style:{backgroundColor:"#FFFFFF",textAlign:"center",height:40,width:150,border:"2px solid #000000"},children:(0,j.jsx)("p",{style:{textAlign:"center","font-weight":"bold",color:"#000000"},children:" TVA 19%"})}),(0,j.jsx)("td",{style:{backgroundColor:"#FFFFFF",textAlign:"center",height:40,width:300,border:"2px solid #000000"},children:(0,j.jsx)("p",{style:{textAlign:"center","font-weight":"bold",color:"#000000"},children:"0"})})]}),(0,j.jsxs)("tr",{children:[(0,j.jsx)("td",{style:{backgroundColor:"#FFFFFF",textAlign:"center",heigh:40,width:300}}),(0,j.jsx)("td",{style:{backgroundColor:"#FFFFFF",textAlign:"center",heigh:40,width:150}}),(0,j.jsx)("td",{style:{backgroundColor:"#FFFFFF",textAlign:"center",height:40,width:150,border:"2px solid #000000"},children:(0,j.jsx)("p",{style:{textAlign:"center","font-weight":"bold",color:"#000000"},children:" NET A PAYER"})}),(0,j.jsx)("td",{style:{backgroundColor:"#FFFFFF",textAlign:"center",height:40,width:300,border:"2px solid #000000"},children:(0,j.jsx)("p",{style:{textAlign:"center","font-weight":"bold",color:"#000000"},children:"0"})})]})]})]}),(0,j.jsxs)("div",{style:{width:"100%",textAlign:"center",margin:"20px 20px 20px 0px",marginTop:"40px"},children:[(0,j.jsx)("span",{children:"\u2702"}),"---------------------------------------------------------------------------------------------------------------------------------------------------------------------"]})]})}))]})}))})}}]),n}(r.Component),v=function(e){(0,u.Z)(n,e);var t=(0,x.Z)(n);function n(){return(0,a.Z)(this,n),t.apply(this,arguments)}return(0,h.Z)(n,[{key:"render",value:function(){var e=this;return(0,j.jsxs)("div",{style:{alignContent:"center",alignItems:"center"},children:[(0,j.jsx)(f(),{trigger:function(){return(0,j.jsxs)("button",{className:"btn btn-primary",children:[(0,j.jsx)("span",{className:"fa fa-print"}),"Impression "]})},content:function(){return e.componentRef}}),(0,j.jsx)(m,{ref:function(t){return e.componentRef=t},Template:this.props.Template,providerinfo:this.props.providerinfo})]})}}]),n}(r.Component),w=v;var C=function(e){var t=(0,r.useState)(!1),n=(0,o.Z)(t,2),d=n[0],c=n[1],a=(0,r.useState)({}),h=(0,o.Z)(a,2),u=h[0],x=h[1];(0,r.useEffect)((function(){x((0,s.Z)(localStorage.getItem("token")))}),[]);var F=function(){return c(!1)};return(0,j.jsxs)(j.Fragment,{children:[(0,j.jsxs)(l.Z,{variant:"success",onClick:function(){return c(!0)},children:[" ",(0,j.jsx)("span",{className:"fa fa-print"})," Imprimer Data"]}),(0,j.jsxs)(i.Z,{size:"xl",show:d,onHide:F,children:[(0,j.jsx)(i.Z.Header,{closeButton:!0,children:(0,j.jsx)(i.Z.Title,{children:" Faster  "})}),(0,j.jsx)(i.Z.Body,{children:(0,j.jsx)("div",{className:"center",children:(0,j.jsx)(w,{Template:e.Template,providerinfo:u})})}),(0,j.jsx)(i.Z.Footer,{children:(0,j.jsx)(l.Z,{variant:"secondary",onClick:F,children:"Close"})})]})]})}},21461:function(e,t,n){var o=n(29439),r=n(72791),l=n(89743),i=n(2677),s=n(78695),d=n(99410),c=n(74292),a=n(43360),h=n(38780),u=n(55705),x=n(76863),F=n(42464),g=n(95693),p=n(74387),f=n(74569),y=n.n(f),b=n(80184),j=n(24245)(),m=x.Ry().shape({email:x.Z_().email("Invalid Email").required("Email is Required"),phone_number:x.Z_().matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,"Phone number is not valid").required("Phone is Required"),city:x.Z_().min(2,"City is Too Short!").max(20,"City is Too Long!").required("City is Required"),description:x.Z_().min(2,"description is Too Short!").max(20,"description is Too Long!").required("description is Required"),name:x.Z_().min(2,"name is Too Short!").max(20,"name is Too Long!").required("name is Required"),code:x.Z_().min(2,"code is Too Short!").max(20,"code is Too Long!").required("code is Required")});t.Z=function(e){var t=this,n=(0,r.useState)(!1),x=(0,o.Z)(n,2),f=x[0],v=x[1],w=function(){return v(!1)};(0,r.useEffect)((function(){}),[]);var C=function(t){var n=t.values,o=t.errors,r=t.touched,h=t.handleChange,u=(t.handleSubmit,t.handleBlur),x=(t.setFieldValue,t.isSubmitting,t.dirty,t.isValid,t.handleReset);return(0,b.jsx)(p.Z,{children:(0,b.jsx)(l.Z,{children:(0,b.jsx)(i.Z,{children:(0,b.jsxs)(s.Z,{children:[(0,b.jsx)(s.Z.Header,{children:(0,b.jsx)(s.Z.Title,{as:"h5",children:"Ajouter  demande pour modifier colis"})}),(0,b.jsxs)(s.Z.Body,{children:[(0,b.jsxs)(l.Z,{children:[(0,b.jsxs)(i.Z,{md:12,children:[(0,b.jsx)(d.Z,{className:"mb-3",children:(0,b.jsxs)(c.Z,{as:"select",id:"type",custom:!0,onChange:h,onBlur:u,value:n.type,children:[(0,b.jsx)("option",{children:"choisir Type de demande"}),["Change Prix","Change date livraison","changer addresse","changer N. de t\xe9l\xe9phone","changer mode de payement","changer type d'envoi"].map((function(e,t){return(0,b.jsx)("option",{value:e,children:e},e)}))]})}),(0,b.jsx)("label",{htmlFor:"basic-url",children:"Priorit\xe9"}),(0,b.jsx)(d.Z,{className:"mb-3",children:(0,b.jsxs)(c.Z,{as:"select",id:"priority",custom:!0,onChange:h,onBlur:u,children:[(0,b.jsx)("option",{children:"choose priorit\xe9"}),[{name:"Haute",value:"2"},{name:"moyenne",value:"1"},{name:"failbe",value:"0"}].map((function(e,t){return(0,b.jsx)("option",{value:e.value,children:e.name},e.name)}))]})}),(0,b.jsx)(F.Z,{name:"message",label:"message",onChange:h,onBlur:u,value:n.message,errors:o.message,touched:r.message,type:"message"}),"Change Prix"===n.type&&(0,b.jsx)(F.Z,{name:"price",label:"prix",onChange:h,onBlur:u,value:n.price,errors:o.price,touched:r.price}),"changer addresse"===n.type&&(0,b.jsx)(F.Z,{name:"city",label:"city",onChange:h,onBlur:u,value:n.city,errors:o.city,touched:r.city,type:"message"}),"changer addresse"===n.type&&(0,b.jsx)(F.Z,{name:"gouvernorat",label:"gouvernorat",onChange:h,onBlur:u,value:n.gouvernorat,errors:o.gouvernorat,touched:r.gouvernorat}),"changer addresse"===n.type&&(0,b.jsx)(F.Z,{name:"address",label:"address",onChange:h,onBlur:u,value:n.address,errors:o.address,touched:r.address}),"changer N. de t\xe9l\xe9phone"===n.type&&(0,b.jsx)(F.Z,{name:"phone_number",label:"N. de t\xe9l\xe9phone",onChange:h,onBlur:u,value:n.phone_number,errors:o.phone_number,touched:r.phone_number}),"changer type d'envoi"===n.type&&(0,b.jsxs)("div",{children:[(0,b.jsxs)("label",{htmlFor:"basic-url",children:["type_envoi ",(0,b.jsx)(g.Z,{errors:o.type_envoi,touched:r.type_envoi})]}),(0,b.jsx)(d.Z,{className:"mb-3",children:(0,b.jsxs)(c.Z,{as:"select",id:"type_envoi",custom:!0,onChange:h,onBlur:u,value:n.type_envoi,children:[(0,b.jsx)("option",{children:"type envoi"}),["LIVRAISON A DOMICILE","ECHANGE","RECUPERATION"].map((function(e,t){return(0,b.jsx)("option",{value:e,children:e},e)}))]})})]})]}),(0,b.jsx)(i.Z,{md:6})]}),(0,b.jsx)(a.Z,{onClick:function(){!function(t){console.log(e.colis.id),console.log(t),console.log(e.colis.id);var n={headers:{"Content-Type":"application/json","Access-Control-Allow-Headers":"Authorization","x-access-token":localStorage.getItem("token"),Authorization:"Bearer "+localStorage.getItem("token")}};y().post(j+"/ticket/add",{message:t.message,colis:e.colis.id,type:t.type,priority:t.priority,value:{price:t.price,city:t.city,gouvernorat:t.gouvernorat,address:t.address,type_envoi:t.type_envoi,payment_mode:t.payment_mode}},n).then((function(e){alert("add Succefull"),console.log(e.data),w()})).catch((function(e){console.log(e)}))}(n),x()},children:"Envoyer demande"})]})]})})})})};return(0,b.jsxs)(b.Fragment,{children:[(0,b.jsxs)(a.Z,{variant:"secondary",onClick:function(){return v(!0)},children:[" ",(0,b.jsx)("span",{className:"fa fa-ticket"})]}),(0,b.jsxs)(h.Z,{show:f,onHide:w,children:[(0,b.jsx)(h.Z.Header,{closeButton:!0,children:(0,b.jsx)(h.Z.Title,{children:" "})}),(0,b.jsx)(h.Z.Body,{children:(0,b.jsx)(u.J9,{initialValues:{message:"",price:e.colis.price,city:e.colis.city,address:e.colis.address,gouvernorat:e.colis.gouvernorat,type_envoi:e.colis.type_envoi,payment_mode:e.colis.payment_mode,phone_number:e.colis.phone_number},onSubmit:function(e,n){var o=n.setSubmitting;t.submitForm(e),o(!1)},validationSchema:m,children:function(e){return C(e)}})}),(0,b.jsx)(h.Z.Footer,{children:(0,b.jsx)(a.Z,{variant:"secondary",onClick:w,children:"Fermer"})})]})]})}},30337:function(e,t,n){var o,r,l=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}();t._1=function(e){document.body.classList.add("react-confirm-alert-body-element"),function(){if(document.getElementById("react-confirm-alert-firm-svg"))return;var e="http://www.w3.org/2000/svg",t=document.createElementNS(e,"feGaussianBlur");t.setAttribute("stdDeviation","0.3");var n=document.createElementNS(e,"filter");n.setAttribute("id","gaussian-blur"),n.appendChild(t);var o=document.createElementNS(e,"svg");o.setAttribute("id","react-confirm-alert-firm-svg"),o.setAttribute("class","react-confirm-alert-svg"),o.appendChild(n),document.body.appendChild(o)}(),function(e){var t=document.getElementById("react-confirm-alert");t||(document.body.children[0].classList.add("react-confirm-alert-blur"),(t=document.createElement("div")).id="react-confirm-alert",document.body.appendChild(t)),(0,c.render)(s.default.createElement(x,e),t)}(e)};var i=n(72791),s=a(i),d=a(n(52007)),c=n(54164);function a(e){return e&&e.__esModule?e:{default:e}}function h(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function u(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}var x=(r=o=function(e){function t(){var e,n,o;h(this,t);for(var r=arguments.length,l=Array(r),i=0;i<r;i++)l[i]=arguments[i];return n=o=u(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(l))),o.handleClickButton=function(e){e.onClick&&e.onClick(),o.close()},o.handleClickOverlay=function(e){var t=o.props,n=t.closeOnClickOutside,r=t.onClickOutside,l=e.target===o.overlay;n&&l&&(r(),o.close())},o.close=function(){var e=o.props.afterClose;p(),g(),F(e)},o.keyboardClose=function(e){var t=o.props,n=t.closeOnEscape,r=t.onKeypressEscape,l=27===e.keyCode;n&&l&&(r(e),o.close())},o.componentDidMount=function(){document.addEventListener("keydown",o.keyboardClose,!1)},o.componentWillUnmount=function(){document.removeEventListener("keydown",o.keyboardClose,!1),o.props.willUnmount()},o.renderCustomUI=function(){var e=o.props,t=e.title,n=e.message,r=e.buttons;return(0,e.customUI)({title:t,message:n,buttons:r,onClose:o.close})},u(o,n)}return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),l(t,[{key:"render",value:function(){var e=this,t=this.props,n=t.title,o=t.message,r=t.buttons,l=t.childrenElement,i=t.customUI,d=t.overlayClassName;return s.default.createElement("div",{className:"react-confirm-alert-overlay "+d,ref:function(t){return e.overlay=t},onClick:this.handleClickOverlay},s.default.createElement("div",{className:"react-confirm-alert"},i?this.renderCustomUI():s.default.createElement("div",{className:"react-confirm-alert-body"},n&&s.default.createElement("h1",null,n),o,l(),s.default.createElement("div",{className:"react-confirm-alert-button-group"},r.map((function(t,n){return s.default.createElement("button",{key:n,onClick:function(){return e.handleClickButton(t)},className:t.className},t.label)}))))))}}]),t}(i.Component),o.propTypes={title:d.default.string,message:d.default.string,buttons:d.default.array.isRequired,childrenElement:d.default.func,customUI:d.default.func,closeOnClickOutside:d.default.bool,closeOnEscape:d.default.bool,willUnmount:d.default.func,afterClose:d.default.func,onClickOutside:d.default.func,onKeypressEscape:d.default.func,overlayClassName:d.default.string},o.defaultProps={buttons:[{label:"Cancel",onClick:function(){return null},className:null},{label:"Confirm",onClick:function(){return null},className:null}],childrenElement:function(){return null},closeOnClickOutside:!0,closeOnEscape:!0,willUnmount:function(){return null},afterClose:function(){return null},onClickOutside:function(){return null},onKeypressEscape:function(){return null}},r);function F(e){var t=document.getElementById("react-confirm-alert-firm-svg");t&&t.parentNode.removeChild(t),document.body.children[0].classList.remove("react-confirm-alert-blur"),e()}function g(){var e=document.getElementById("react-confirm-alert");e&&((0,c.unmountComponentAtNode)(e),e.parentNode.removeChild(e))}function p(){document.body.classList.remove("react-confirm-alert-body-element")}},58988:function(){}}]);
//# sourceMappingURL=2394.6e463c55.chunk.js.map