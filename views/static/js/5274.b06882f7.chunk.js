"use strict";(self.webpackChunksubdomaine=self.webpackChunksubdomaine||[]).push([[5274],{72333:function(e,t,n){n.r(t);var o=n(15671),a=n(43144),s=n(97326),r=n(60136),i=n(29388),l=n(72791),c=(n(5118),n(43360)),d=n(78695),u=n(99410),h=n(74292),p=n(74569),m=n.n(p),v=n(74387),g=n(33658),f=n(12804),k=(n(29538),n(30337)),C=(n(58988),n(80184)),b=n(24245)(),x=(0,f.ZP)(),Z=function(e){(0,r.Z)(n,e);var t=(0,i.Z)(n);function n(e){var a;return(0,o.Z)(this,n),(a=t.call(this,e)).handleChange=a.handleChange.bind((0,s.Z)(a)),a.state={items:[],selectedItems:[],drivers:[],iddriver:""},a}return(0,a.Z)(n,[{key:"componentDidMount",value:function(){var e=this,t={headers:{"Content-Type":"application/json","Access-Control-Allow-Headers":"Authorization","x-access-token":localStorage.getItem("token"),Authorization:"Bearer "+localStorage.getItem("token")}},n=m().get(b+"/admin/pickup/done?current_page=1&per_page=500",t),o=m().get(b+"/driver",t);m().all([n,o]).then(m().spread((function(){for(var t=arguments.length,n=new Array(t),o=0;o<t;o++)n[o]=arguments[o];console.log("this respon list0",n[0].data),console.log("this respon list1",n[1].data),e.setState({selectedItems:[]}),e.setState({drivers:n[1].data.data}),e.setState({items:n[0].data.data.data.map((function(e){return{value:e.id,label:e.colis.index_colis}}))})}))).catch((function(e){console.error(e)}))}},{key:"savedriver",value:function(){var e=this;(0,k._1)({title:"Confirmer dispatch",message:"confirmer dispatch colis?",buttons:[{label:"Yes",onClick:function(){console.log({driver:e.state.iddriver,package:e.state.selectedItems.map((function(e){return{address:e.address,customer:e.id,provider:e.provider}}))});var t={headers:{"Content-Type":"application/json","Access-Control-Allow-Headers":"Authorization","x-access-token":localStorage.getItem("token"),Authorization:"Bearer "+localStorage.getItem("token")}};m().post(b+"/mobile/delivery/add",{driver:e.state.iddriver,colis:e.state.selectedItems.map((function(e){return e.id}))},t).then((function(t){alert("add Succefull"),console.log(t.data),e.componentDidMount()})).catch((function(e){console.log(e)}))}},{label:"No",onClick:null}]})}},{key:"handleChange",value:function(e){this.setState({selectedItems:e})}},{key:"render",value:function(){var e=this,t=this.state,n=t.items,o=t.selectedItems;return(0,C.jsxs)(v.Z,{children:[(0,C.jsx)(c.Z,{onClick:function(){return console.log(o)},children:" envoyer"}),(0,C.jsxs)(d.Z,{style:{height:"1000px"},children:[(0,C.jsx)(u.Z,{className:"mb-3",children:(0,C.jsxs)(h.Z,{as:"select",id:"{this.state.driver}",onChange:function(t){return e.setState({iddriver:t.target.value})},custom:!0,children:[(0,C.jsx)("option",{children:"Choisir un Chauffeur"}),this.state.drivers.map((function(e,t){return(0,C.jsx)("option",{className:" badge badge-info",value:e.id,children:e.username},e.id)}))]})}),(0,C.jsx)(g.ZP,{closeMenuOnSelect:!1,components:x,options:n,onChange:function(e){return console.log(e)}}),"test"]})]})}}]),n}(l.Component);t.default=Z}}]);
//# sourceMappingURL=5274.b06882f7.chunk.js.map