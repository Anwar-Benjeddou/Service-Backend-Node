"use strict";(self.webpackChunksubdomaine=self.webpackChunksubdomaine||[]).push([[2226],{55277:function(e,t,n){n.r(t);var a=n(15671),s=n(43144),o=n(97326),r=n(60136),i=n(29388),l=n(72791),c=(n(5118),n(43360)),d=n(78695),u=n(99410),h=n(74292),m=n(74569),p=n.n(m),v=n(74387),f=n(33658),g=n(12804),k=(n(29538),n(30337)),C=(n(58988),n(80184)),b=n(24245)(),Z=(0,g.ZP)(),j=function(e){(0,r.Z)(n,e);var t=(0,i.Z)(n);function n(e){var s;return(0,a.Z)(this,n),(s=t.call(this,e)).handleChange=s.handleChange.bind((0,o.Z)(s)),s.state={items:[],selectedItems:[],drivers:[],iddriver:""},s}return(0,s.Z)(n,[{key:"componentDidMount",value:function(){var e=this,t={headers:{"Content-Type":"application/json","Access-Control-Allow-Headers":"Authorization","x-access-token":localStorage.getItem("token"),Authorization:"Bearer "+localStorage.getItem("token")}},n=p().get(b+"/admin/pickup/list?current_page=1&per_page=500",t),a=p().get(b+"/driver",t);p().all([n,a]).then(p().spread((function(){for(var t=arguments.length,n=new Array(t),a=0;a<t;a++)n[a]=arguments[a];console.log("this respon list0",n[0].data),console.log("this respon list1",n[1].data),e.setState({selectedItems:[]}),e.setState({drivers:n[1].data.data}),e.setState({items:Object.values(n[0].data.data.data).filter((function(e){return 1===e.check_magasinier})).map((function(e){return{value:"oceadddn",label:"Ocedddan"}}))})}))).catch((function(e){console.error(e)}))}},{key:"savedriver",value:function(){var e=this;(0,k._1)({title:"Confirmer dispatch",message:"confirmer dispatch colis?",buttons:[{label:"Yes",onClick:function(){console.log({driver:e.state.iddriver,package:e.state.selectedItems.map((function(e){return{address:e.address,customer:e.id,provider:e.provider}}))});var t={headers:{"Content-Type":"application/json","Access-Control-Allow-Headers":"Authorization","x-access-token":localStorage.getItem("token"),Authorization:"Bearer "+localStorage.getItem("token")}};p().post(b+"/mobile/delivery/add",{driver:e.state.iddriver,colis:e.state.selectedItems.map((function(e){return e.id}))},t).then((function(t){alert("add Succefull"),console.log(t.data),e.componentDidMount()})).catch((function(e){console.log(e)}))}},{label:"No",onClick:null}]})}},{key:"handleChange",value:function(e){this.setState({selectedItems:e})}},{key:"render",value:function(){var e=this,t=this.state,n=t.items;t.selectedItems;return(0,C.jsxs)(v.Z,{children:[(0,C.jsx)(c.Z,{onClick:function(){return console.log(n)},children:" envoyer"}),(0,C.jsxs)(d.Z,{style:{height:"1000px"},children:[(0,C.jsx)(u.Z,{className:"mb-3",children:(0,C.jsxs)(h.Z,{as:"select",id:"{this.state.driver}",onChange:function(t){return e.setState({iddriver:t.target.value})},custom:!0,children:[(0,C.jsx)("option",{children:"Choisir un Chauffeur"}),this.state.drivers.map((function(e,t){return(0,C.jsx)("option",{className:" badge badge-info",value:e.id,children:e.username},e.id)}))]})}),(0,C.jsx)(f.ZP,{closeMenuOnSelect:!1,components:Z,isMulti:!0,options:n})]})]})}}]),n}(l.Component);t.default=j}}]);
//# sourceMappingURL=2226.fe87bedc.chunk.js.map