"use strict";(self.webpackChunksubdomaine=self.webpackChunksubdomaine||[]).push([[4460],{42464:function(e,t,l){l(72791);var o=l(99410),i=l(74292),r=l(95693),n=l(80184);t.Z=function(e){var t=e.name,l=e.label,s=e.onChange,d=e.onBlur,c=e.value,h=e.type,x=e.isInvalid,p=e.errors,g=e.touched;return(0,n.jsx)(n.Fragment,{children:"Phone"===l?(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)("label",{htmlFor:"basic-url",children:[t," ",(0,n.jsx)(r.Z,{errors:p,touched:g})]}),(0,n.jsxs)(o.Z,{className:"mb-3",children:[(0,n.jsx)(o.Z.Prepend,{children:(0,n.jsx)(o.Z.Text,{id:"basic-addon1",children:"+216"})}),(0,n.jsx)(i.Z,{placeholder:l,"aria-label":t,"aria-describedby":t,onChange:s,onBlur:d,value:c,isInvalid:x,label:l,name:t,type:h})]})]}):(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)("label",{htmlFor:"basic-url",children:[l,"  ",(0,n.jsx)(r.Z,{errors:p,touched:g})]}),(0,n.jsx)(o.Z,{className:"mb-3",children:(0,n.jsx)(i.Z,{placeholder:l,"aria-label":l,"aria-describedby":l,onChange:s,onBlur:d,value:c,isInvalid:x,label:l,name:t,type:h})})]})})}},95693:function(e,t,l){l.d(t,{Z:function(){return s}});var o=l(29439),i=(l(72791),l(65151)),r=l(22247),n=l(80184),s=function(e){var t=function(e,t){return t?e&&t?["fa-times-circle-o input-invalid",e]:!e&&t?["fa-check-circle-o input-valid",r.Z.t("valid-field")]:void 0:[]}(e.errors,e.touched),l=(0,o.Z)(t,2),s=l[0],d=l[1];return(0,n.jsx)(i.ZP,{title:Array.isArray(d)?d.map((function(e){return(0,n.jsxs)("span",{className:"tooltip-message",children:[e," ",(0,n.jsx)("br",{})]})})):(0,n.jsxs)("span",{className:"tooltip-message",children:[d," ",(0,n.jsx)("br",{})]}),placement:"right",children:(0,n.jsx)("span",{children:(0,n.jsx)("i",{className:"fa "+s})})})}},72024:function(e,t,l){var o=l(43348);l(95792),l(24579);t.Z={images:o,matricule:"MF",addresse1:"",addresse2:"iteslab Tunis"}},45310:function(e,t,l){var o=l(93433),i=l(4942),r=l(15671),n=l(43144),s=l(60136),d=l(29388),c=l(72791),h=(l(34648),l(33237)),x=l(61146),p=l.n(x),g=l(72024),F=l(84763),a=l.n(F),j=l(80184),b=function(e){(0,s.Z)(l,e);var t=(0,d.Z)(l);function l(e){var o;return(0,r.Z)(this,l),(o=t.call(this,e)).state={checkbox:!1,dropdownValue:"fa"},o}return(0,n.Z)(l,[{key:"changeDropdown",value:function(e){this.setState({dropdownValue:e.target.value})}},{key:"render",value:function(){var e,t,l,r,n,s,d,c,x=this;return(0,j.jsxs)("div",{style:{paddingTop:50,paddingLeft:60},children:[(0,j.jsxs)("table",{children:[(0,j.jsxs)("thead",{children:[(0,j.jsx)("th",{style:{width:300}}),(0,j.jsx)("th",{style:{width:300}}),(0,j.jsx)("th",{style:{width:320}})]}),(0,j.jsx)("tbody",{children:(0,j.jsxs)("tr",{children:[(0,j.jsx)("td",{style:(0,i.Z)({paddingLeft:40,alignItems:"center",border:"2px solid #000000",backgroundColor:"#FFFFFF"},"backgroundColor","#FFFFFF"),children:(0,j.jsx)(h.QRCode,{bgColor:"#FFFFFF",fgColor:"#000000",level:"H",style:{width:150,height:150,marginTop:30},value:this.props.Template.colis.id,children:"   "})}),(0,j.jsxs)("td",{style:(0,i.Z)({textAlign:"center",border:"2px solid #000000",backgroundColor:"#FFFFFF"},"backgroundColor","#FFFFFF"),children:[(0,j.jsx)("img",{style:{width:"300px",float:"left"},src:g.Z.images,alt:"activity-user"}),(0,j.jsx)("br",{}),(0,j.jsxs)("p",{style:{"font-weight":"bold",color:"#000000"},children:["MF : ",g.Z.matricule]}),(0,j.jsx)("p",{style:{"font-weight":"bold",color:"#000000"},children:g.Z.addresse1+g.Z.addresse2})]}),(0,j.jsxs)("td",{style:(0,i.Z)({paddingLeft:20,border:"2px solid #000000",backgroundColor:"#FFFFFF"},"backgroundColor","#FFFFFF"),children:[(0,j.jsx)(a(),{height:35,width:1,value:this.props.Template.colis.id,fontSize:11}),(0,j.jsx)("h5",{style:{textAlign:"center",fontFamily:"bold"},children:"BORDEREAU D'ENVOI N\xb0 "}),(0,j.jsxs)("h3",{style:{textAlign:"center",fontFamily:"bold"},children:[" ",this.props.Template.colis.index_colis]})]})]})})]}),(0,j.jsxs)("table",{children:[(0,j.jsxs)("thead",{children:[(0,j.jsx)("th",{style:{width:450}}),(0,j.jsx)("th",{style:{width:150}}),(0,j.jsx)("th",{style:{width:320}})]}),(0,j.jsx)("tbody",{children:(0,j.jsxs)("tr",{children:[(0,j.jsxs)("td",{style:{backgroundColor:"#FFFFFF"},children:[(0,j.jsxs)("p",{style:{textAlign:"left","font-weight":"bold",color:"#000000",fontSize:18},children:["Destinataire : ",this.props.Template.colis.name_complete]}),(0,j.jsxs)("p",{style:{textAlign:"left","font-weight":"bold",color:"#000000",fontSize:18},children:["T\xe9l : ",this.props.Template.colis.phone_number]}),(0,j.jsxs)("p",{style:{textAlign:"left","font-weight":"bold",color:"#000000",fontSize:18},children:["addresse : ",this.props.Template.colis.gouvernorat," - ",this.props.Template.colis.city]}),(0,j.jsx)("p",{style:{textAlign:"left","font-weight":"bold",color:"#000000",fontSize:18},children:this.props.Template.colis.address})]}),(0,j.jsx)("td",{style:{backgroundColor:"#FFFFFF"}}),(0,j.jsxs)("td",{style:{border:"2px solid #9da69c",backgroundColor:"#FFFFFF"},children:[(0,j.jsxs)("p",{style:{"font-weight":"bold",color:"#000000",fontSize:18},children:["Exp\xe9diteur : ",this.props.providerinfo.username]}),(0,j.jsxs)("p",{style:{"font-weight":"bold",color:"#000000",fontSize:18},children:["Soci\xe9t\xe9 : ",this.props.providerinfo.company]}),(0,j.jsxs)("p",{style:{"font-weight":"bold",color:"#000000",fontSize:18},children:["T\xe9l : ",this.props.providerinfo.phone_number]}),(0,j.jsxs)("p",{style:{"font-weight":"bold",color:"#000000",fontSize:18},children:["fiscal /cin  :",this.props.providerinfo.code_fiscal]})]})]})})]}),(0,j.jsxs)("table",{children:[(0,j.jsx)("thead",{}),(0,j.jsxs)("tbody",{children:[(0,j.jsxs)("tr",{children:[(0,j.jsx)("td",{style:{textAlign:"center",width:300,border:"2px solid #000000",backgroundColor:"#FFFFFF"},children:(0,j.jsx)("p",{style:{textAlign:"center","font-weight":"bold",color:"#000000"},children:"DESIGNATION"})}),(0,j.jsx)("td",{style:{textAlign:"center",width:150,border:"2px solid #000000",backgroundColor:"#FFFFFF"},children:(0,j.jsx)("p",{style:{textAlign:"center","font-weight":"bold",color:"#000000"},children:"QTE"})}),(0,j.jsx)("td",{style:{textAlign:"center",width:150,border:"2px solid #000000",backgroundColor:"#FFFFFF"},children:(0,j.jsx)("p",{style:{textAlign:"center","font-weight":"bold",color:"#000000"},children:"PU HT"})}),(0,j.jsx)("td",{style:{textAlign:"center",width:320,border:"2px solid #000000",backgroundColor:"#FFFFFF"},children:(0,j.jsx)("p",{style:{textAlign:"center","font-weight":"bold",color:"#000000"},children:"PT HT"})})]}),(0,j.jsxs)("tr",{children:[(0,j.jsx)("td",{style:{textAlign:"center",heigh:60,width:300,border:"2px solid #000000",backgroundColor:"#FFFFFF"},children:(0,j.jsx)("p",{style:{textAlign:"center","font-weight":"bold",color:"#000000"},children:null===(e=this.props.Template.colis)||void 0===e?void 0:e.designation})}),(0,j.jsx)("td",{style:{textAlign:"center",heigh:60,width:150,border:"2px solid #000000",backgroundColor:"#FFFFFF"},children:(0,j.jsx)("p",{style:{textAlign:"center","font-weight":"bold",color:"#000000"},children:"1"})}),(0,j.jsx)("td",{style:{textAlign:"center",height:60,width:150,border:"2px solid #000000",backgroundColor:"#FFFFFF"},children:(0,j.jsx)("p",{style:{textAlign:"center","font-weight":"bold",color:"#000000"},children:.89*(null===(t=this.props.Template.colis)||void 0===t?void 0:t.price)})}),(0,j.jsx)("td",{style:{textAlign:"center",height:60,width:300,border:"2px solid #000000",backgroundColor:"#FFFFFF"},children:(0,j.jsx)("p",{style:{textAlign:"center","font-weight":"bold",color:"#000000"},children:.89*(null===(l=this.props.Template.colis)||void 0===l?void 0:l.price)})})]}),(0,j.jsxs)("tr",{children:[(0,j.jsxs)("td",{style:{textAlign:"center",heigh:40,width:300},children:["1/ ",this.props.Template.colis.lot]}),(0,j.jsx)("td",{style:{textAlign:"center",heigh:40,width:150}}),(0,j.jsx)("td",{style:{textAlign:"center",height:40,width:150,border:"2px solid #000000",backgroundColor:"#FFFFFF"},children:(0,j.jsx)("p",{style:{textAlign:"center","font-weight":"bold",color:"#000000"},children:" TOTAL HT"})}),(0,j.jsx)("td",{style:{textAlign:"center",height:40,width:300,border:"2px solid #000000",backgroundColor:"#FFFFFF"},children:(0,j.jsx)("p",{style:{textAlign:"center","font-weight":"bold",color:"#000000"},children:.89*(null===(r=this.props.Template.colis)||void 0===r?void 0:r.price)})})]}),(0,j.jsxs)("tr",{children:[(0,j.jsx)("td",{style:{textAlign:"center",heigh:40,width:300},children:(0,j.jsx)("div",{style:{border:"2px solid #000000",backgroundColor:"#FFFFFF",height:50},children:"note"})}),(0,j.jsx)("td",{style:{textAlign:"center",heigh:40,width:150}}),(0,j.jsx)("td",{style:{textAlign:"center",height:40,width:150,border:"2px solid #000000",backgroundColor:"#FFFFFF"},children:(0,j.jsx)("p",{style:{textAlign:"center","font-weight":"bold",color:"#000000"},children:" TVA 19%"})}),(0,j.jsx)("td",{style:{textAlign:"center",height:40,width:300,border:"2px solid #000000",backgroundColor:"#FFFFFF"},children:(0,j.jsx)("p",{style:{textAlign:"center","font-weight":"bold",color:"#000000"},children:.19*(null===(n=this.props.Template.colis)||void 0===n?void 0:n.price)})})]}),(0,j.jsxs)("tr",{children:[(0,j.jsxs)("td",{style:{textAlign:"center",heigh:40,width:300},children:[(0,j.jsx)("p",{style:{textAlign:"center","font-weight":"bold",color:"#000000"},children:null===(s=this.props.Template.colis)||void 0===s?void 0:s.payment_mode}),(0,j.jsx)("p",{style:{textAlign:"center","font-weight":"bold",color:"#000000"},children:null===(d=this.props.Template.colis)||void 0===d?void 0:d.type_envoi})]}),(0,j.jsx)("td",{style:{textAlign:"center",heigh:40,width:150}}),(0,j.jsx)("td",{style:{textAlign:"center",height:40,width:150,border:"2px solid #000000",backgroundColor:"#FFFFFF"},children:(0,j.jsx)("p",{style:{textAlign:"center","font-weight":"bold",color:"#000000"},children:" NET A PAYER"})}),(0,j.jsx)("td",{style:{textAlign:"center",height:40,width:300,border:"2px solid #000000",backgroundColor:"#FFFFFF"},children:(0,j.jsx)("p",{style:{textAlign:"center","font-weight":"bold",color:"#000000"},children:null===(c=this.props.Template.colis)||void 0===c?void 0:c.price})})]})]})]}),(0,j.jsxs)("div",{style:{width:"100%",textAlign:"center",margin:"20px 20px 20px 0px",marginTop:"40px"},children:[(0,j.jsx)("span",{children:"\u2702"}),"---------------------------------------------------------------------------------------------------------------------------------------------------------------------"]}),this.props.Template.colis.lot&&(0,o.Z)(Array(this.props.Template.colis.lot-1)).map((function(e,t){var l;return(0,j.jsxs)("div",{style:{paddingTop:50,height:650},children:[(0,j.jsxs)("table",{children:[(0,j.jsxs)("thead",{children:[(0,j.jsx)("th",{style:{width:300}}),(0,j.jsx)("th",{style:{width:300}}),(0,j.jsx)("th",{style:{width:320}})]}),(0,j.jsx)("tbody",{children:(0,j.jsxs)("tr",{children:[(0,j.jsx)("td",{style:{textAlign:"center",border:"2px solid #000000",backgroundColor:"#FFFFFF"},children:(0,j.jsx)(h.QRCode,{bgColor:"#FFFFFF",fgColor:"#000000",level:"H",style:{width:150,height:150,marginTop:30},value:x.props.Template.colis.id,children:"   "})}),(0,j.jsxs)("td",{style:{textAlign:"center",border:"2px solid #000000",backgroundColor:"#FFFFFF"},children:[(0,j.jsx)("img",{style:{width:"300px",float:"left"},src:g.Z.images,alt:"activity-user"}),(0,j.jsx)("br",{}),(0,j.jsxs)("p",{style:{"font-weight":"bold",color:"#000000"},children:["MF : ",g.Z.matricule]}),(0,j.jsxs)("p",{style:{"font-weight":"bold",color:"#000000"},children:[" ",g.Z.addresse1+g.Z.addresse2," "]})]}),(0,j.jsxs)("td",{style:{paddingLeft:20,border:"2px solid #000000",backgroundColor:"#FFFFFF"},children:[(0,j.jsx)(a(),{height:35,width:1,value:x.props.Template.colis.id,fontSize:11}),(0,j.jsx)("h5",{style:{textAlign:"left",fontFamily:"bold"},children:"BORDEREAU D'ENVOI N\xb0 "}),(0,j.jsxs)("h3",{style:{textAlign:"center",fontFamily:"bold"},children:[" ",x.props.Template.colis.index_colis]})]})]})})]}),(0,j.jsxs)("table",{children:[(0,j.jsxs)("thead",{children:[(0,j.jsx)("th",{style:{width:450}}),(0,j.jsx)("th",{style:{width:150}}),(0,j.jsx)("th",{style:{width:320}})]}),(0,j.jsx)("tbody",{children:(0,j.jsxs)("tr",{children:[(0,j.jsxs)("td",{style:{textAlign:"center",backgroundColor:"#FFFFFF"},children:[(0,j.jsxs)("p",{style:{textAlign:"left","font-weight":"bold",color:"#000000",fontSize:18},children:["Destinataire : ",x.props.Template.colis.name_complete]}),(0,j.jsxs)("p",{style:{textAlign:"left","font-weight":"bold",color:"#000000",fontSize:18},children:["T\xe9l : ",x.props.Template.colis.phone_number]}),(0,j.jsxs)("p",{style:{textAlign:"left","font-weight":"bold",color:"#000000",fontSize:18},children:["addresse : ",x.props.Template.colis.gouvernorat," - ",x.props.Template.colis.city]}),(0,j.jsx)("p",{style:{textAlign:"left","font-weight":"bold",color:"#000000",fontSize:18},children:x.props.Template.colis.address})]}),(0,j.jsx)("td",{style:{textAlign:"center",backgroundColor:"#FFFFFF"}}),(0,j.jsxs)("td",{style:{border:"2px solid #000000",backgroundColor:"#FFFFFF"},children:[(0,j.jsxs)("p",{style:{"font-weight":"bold",color:"#000000",fontSize:18},children:["Exp\xe9diteur : ",x.props.providerinfo.username]}),(0,j.jsxs)("p",{style:{"font-weight":"bold",color:"#000000",fontSize:18},children:["Soci\xe9t\xe9 : ",x.props.providerinfo.company]}),(0,j.jsxs)("p",{style:{"font-weight":"bold",color:"#000000",fontSize:18},children:["T\xe9l : ",x.props.providerinfo.phone_number]}),(0,j.jsxs)("p",{style:{"font-weight":"bold",color:"#000000",fontSize:18},children:["fiscal /cin :",x.props.providerinfo.code_fiscal]})]})]})})]}),(0,j.jsxs)("table",{children:[(0,j.jsx)("thead",{}),(0,j.jsxs)("tbody",{children:[(0,j.jsxs)("tr",{children:[(0,j.jsx)("td",{style:{textAlign:"center",width:300,border:"2px solid #000000",backgroundColor:"#FFFFFF"},children:(0,j.jsx)("p",{style:{textAlign:"center","font-weight":"bold",color:"#000000"},children:"DESIGNATION"})}),(0,j.jsx)("td",{style:{textAlign:"center",width:150,border:"2px solid #000000",backgroundColor:"#FFFFFF"},children:(0,j.jsx)("p",{style:{textAlign:"center","font-weight":"bold",color:"#000000"},children:"QTE"})}),(0,j.jsx)("td",{style:{textAlign:"center",width:150,border:"2px solid #000000",backgroundColor:"#FFFFFF"},children:(0,j.jsx)("p",{style:{textAlign:"center","font-weight":"bold",color:"#000000"},children:"PU HT"})}),(0,j.jsx)("td",{style:{textAlign:"center",width:320,border:"2px solid #000000",backgroundColor:"#FFFFFF"},children:(0,j.jsx)("p",{style:{textAlign:"center","font-weight":"bold",color:"#000000"},children:"PT HT"})})]}),(0,j.jsxs)("tr",{children:[(0,j.jsx)("td",{style:{textAlign:"center",heigh:60,width:300,border:"2px solid #000000",backgroundColor:"#FFFFFF"},children:(0,j.jsx)("p",{style:{textAlign:"center","font-weight":"bold",color:"#000000"},children:null===(l=x.props.Template.colis)||void 0===l?void 0:l.designation})}),(0,j.jsx)("td",{style:{textAlign:"center",heigh:60,width:150,border:"2px solid #000000",backgroundColor:"#FFFFFF"},children:(0,j.jsx)("p",{style:{textAlign:"center","font-weight":"bold",color:"#000000"},children:"1"})}),(0,j.jsx)("td",{style:{textAlign:"center",height:60,width:150,border:"2px solid #000000",backgroundColor:"#FFFFFF"},children:(0,j.jsx)("p",{style:{textAlign:"center","font-weight":"bold",color:"#000000"},children:"0"})}),(0,j.jsx)("td",{style:{textAlign:"center",height:60,width:300,border:"2px solid #000000",backgroundColor:"#FFFFFF"},children:(0,j.jsx)("p",{style:{textAlign:"center","font-weight":"bold",color:"#000000"},children:"0"})})]}),(0,j.jsxs)("tr",{children:[(0,j.jsxs)("td",{style:{textAlign:"center",heigh:40,width:300},children:[t+2," / ",x.props.Template.colis.lot]}),(0,j.jsx)("td",{style:{textAlign:"center",heigh:40,width:150}}),(0,j.jsx)("td",{style:{textAlign:"center",height:40,width:150,border:"2px solid #000000",backgroundColor:"#FFFFFF"},children:(0,j.jsx)("p",{style:{textAlign:"center","font-weight":"bold",color:"#000000"},children:" TOTAL HT"})}),(0,j.jsx)("td",{style:{textAlign:"center",height:40,width:300,border:"2px solid #000000",backgroundColor:"#FFFFFF"},children:(0,j.jsx)("p",{style:{textAlign:"center","font-weight":"bold",color:"#000000"},children:"0"})})]}),(0,j.jsxs)("tr",{children:[(0,j.jsx)("td",{style:{textAlign:"center",heigh:40,width:300},children:(0,j.jsx)("div",{style:{border:"2px solid #000000",backgroundColor:"#FFFFFF",height:50},children:"note"})}),(0,j.jsx)("td",{style:{textAlign:"center",heigh:40,width:150}}),(0,j.jsx)("td",{style:{textAlign:"center",height:40,width:150,border:"2px solid #000000",backgroundColor:"#FFFFFF"},children:(0,j.jsx)("p",{style:{textAlign:"center","font-weight":"bold",color:"#000000"},children:" TVA 19%"})}),(0,j.jsx)("td",{style:{textAlign:"center",height:40,width:300,border:"2px solid #000000",backgroundColor:"#FFFFFF"},children:(0,j.jsx)("p",{style:{textAlign:"center","font-weight":"bold",color:"#000000"},children:"0"})})]}),(0,j.jsxs)("tr",{children:[(0,j.jsx)("td",{style:{textAlign:"center",heigh:40,width:300}}),(0,j.jsx)("td",{style:{textAlign:"center",heigh:40,width:150}}),(0,j.jsx)("td",{style:{textAlign:"center",height:40,width:150,border:"2px solid #000000",backgroundColor:"#FFFFFF"},children:(0,j.jsx)("p",{style:{textAlign:"center","font-weight":"bold",color:"#000000"},children:" NET A PAYER"})}),(0,j.jsx)("td",{style:{textAlign:"center",height:40,width:300,border:"2px solid #000000",backgroundColor:"#FFFFFF"},children:(0,j.jsx)("p",{style:{textAlign:"center","font-weight":"bold",color:"#000000"},children:"0"})})]})]})]}),(0,j.jsxs)("div",{style:{width:"100%",textAlign:"center",margin:"20px 20px 20px 0px",marginTop:"40px"},children:[(0,j.jsx)("span",{children:"\u2702"}),"---------------------------------------------------------------------------------------------------------------------------------------------------------------------"]})]})}))]})}}]),l}(c.Component),y=function(e){(0,s.Z)(l,e);var t=(0,d.Z)(l);function l(){return(0,r.Z)(this,l),t.apply(this,arguments)}return(0,n.Z)(l,[{key:"render",value:function(){var e=this;return(0,j.jsxs)("div",{style:{alignContent:"center",alignItems:"center"},children:[(0,j.jsx)(p(),{trigger:function(){return(0,j.jsxs)("button",{className:"btn btn-primary",children:[(0,j.jsx)("span",{className:"fa fa-print"}),"Impression "]})},content:function(){return e.componentRef}}),(0,j.jsx)(b,{ref:function(t){return e.componentRef=t},Template:this.props.Template,providerinfo:this.props.providerinfo})]})}}]),l}(c.Component);t.Z=y},34648:function(e,t,l){l(87757),l(25498),l(66435)},43348:function(e,t,l){e.exports=l.p+"static/media/logo.2921fe808a1ef3a74e36.jpeg"},95792:function(e){e.exports="data:image/png;base64,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"},24579:function(e,t,l){e.exports=l.p+"static/media/twins.b952510bade0daf8680f.jpg"}}]);
//# sourceMappingURL=4460.868a130e.chunk.js.map