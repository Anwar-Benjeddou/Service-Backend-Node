"use strict";(self.webpackChunksubdomaine=self.webpackChunksubdomaine||[]).push([[364],{50364:function(e,t,c){c.r(t),c.d(t,{default:function(){return G}});var a=c(15671),n=c(43144),s=c(60136),i=c(29388),r=c(72791),l=c(89743),o=c(2677),d=(c(36397),c(74387)),u=c(74569),x=c.n(u),m=(c(33222),c(46685)),h=c(17945),f=c(94440),p=c(25766),g=c(97069),v=c(2227),Z=c(49288),k=c(31788),j=c(48912),b=c(23570),y=c(98773),w=c(37726),C=c(88210),N=c(97491),P=c(97872),E=c(22948),S=c(16883),A=c(78695),D=c(80184);var I=function(e){return(0,D.jsxs)(A.Z,{children:[(0,D.jsx)("h6",{style:{textAlign:"center",paddingTop:2},children:e.text}),(0,D.jsx)("div",{className:"row d-flex align-items-center",children:(0,D.jsxs)(l.Z,{children:[(0,D.jsx)(o.Z,{}),(0,D.jsx)(o.Z,{children:(0,D.jsxs)("div",{className:"col-9",children:[(0,D.jsxs)("h3",{style:{fontWeight:"bold"},className:"f-w-300 d-flex align-items-center m-b-0",children:[(0,D.jsx)("i",{className:e.classicon})," ",e.valuecard]}),!1]})}),(0,D.jsxs)(o.Z,{children:[" ",(0,D.jsx)("div",{className:"col-1",children:(0,D.jsx)("img",{src:e.image,style:{width:"75px"},alt:"pending"})})]})]})})]})},O=c(22247),T=c(24245)(),_=function(e){(0,s.Z)(c,e);var t=(0,i.Z)(c);function c(e){var n;return(0,a.Z)(this,c),(n=t.call(this,e)).state={Drivers:[],pickupcount:{},coliscount:{},exchangefromcount:{},exchangetocount:{}},n}return(0,n.Z)(c,[{key:"componentDidMount",value:function(){var e=this,t={headers:{"Content-Type":"application/json","Access-Control-Allow-Headers":"Authorization","x-access-token":localStorage.getItem("token"),Authorization:"Bearer "+localStorage.getItem("token")}},c=x().get(T+"/statistic/admin/pickup/count",t);x().get(T+"/driver",t).then((function(t){e.setState({Drivers:t.data.data})})).catch((function(e){}));var a=x().get(T+"/statistic/admin/colis/count",t),n=x().get(T+"/statistic/console_from/count",t),s=x().get(T+"/statistic/console_to/count",t);x().all([c,a,n,s]).then(x().spread((function(){for(var t=arguments.length,c=new Array(t),a=0;a<t;a++)c[a]=arguments[a];console.log("this responconsole list0",c[0].data),e.setState({pickupcount:c[0].data}),e.setState({coliscount:c[1].data}),e.setState({exchangefromcount:c[2].data}),e.setState({exchangetocount:c[3].data})}))).catch((function(e){console.error(e)}))}},{key:"afficherdonner",value:function(){this.componentDidMount()}},{key:"render",value:function(){return(0,D.jsx)(d.Z,{children:(0,D.jsxs)(l.Z,{children:[(0,D.jsx)(o.Z,{md:6,xl:2,children:(0,D.jsx)(I,{text:O.Z.t("waiting-pickup"),image:m,url:"/admin/List/pickup",valuecard:this.state.pickupcount.pickupPending,classicon:"feather icon-clock text-c-yellow f-30 m-r-5"})}),(0,D.jsx)(o.Z,{md:6,xl:2,children:(0,D.jsx)(I,{text:O.Z.t("engoing-pickup"),image:f,url:"/admin/List/pickup",valuecard:this.state.pickupcount.pickupOnGoing,classicon:"feather icon-refresh-cw  text-c-green f-30 m-r-5"})}),(0,D.jsx)(o.Z,{md:6,xl:2,children:(0,D.jsx)(I,{text:O.Z.t("collected-pickup"),image:h,url:"/admin/List/pickup",valuecard:this.state.pickupcount.pickupEnleve,classicon:"feather icon-check-circle text-c-blue f-30 m-r-5"})}),(0,D.jsx)(o.Z,{md:6,xl:2,children:(0,D.jsx)(I,{text:O.Z.t("stock"),image:E,url:"/admin/decision/dispatch",valuecard:this.state.pickupcount.pickupEnleve_check,classicon:"feather icon-clock text-c-yellow f-30 m-r-5"})}),(0,D.jsx)(o.Z,{md:6,xl:2,children:(0,D.jsx)(I,{text:O.Z.t("total-pickup"),image:S,url:"/admin/decision/dispatch",valuecard:this.state.pickupcount.pickupTotal,classicon:"feather icon-check-circle text-c-blue f-30 m-r-5"})}),(0,D.jsx)(o.Z,{md:6,xl:2,children:(0,D.jsx)(I,{text:O.Z.t("uncompleted-pickup"),image:p,url:"/admin/replanification/pickups",valuecard:this.state.pickupcount.pickupAnomaly,classicon:"feather icon-x-circle text-c-red f-30 m-r-5"})}),(0,D.jsx)(o.Z,{md:6,xl:2,children:(0,D.jsx)(I,{text:O.Z.t("outgoing-planned-transfers"),image:g,url:"/admin/Consolesfrom/status",valuecard:this.state.exchangefromcount.exchangePending,classicon:"feather icon-clock text-c-yellow f-30 m-r-5"})}),(0,D.jsx)(o.Z,{md:6,xl:2,children:(0,D.jsx)(I,{text:O.Z.t("outgoing-in-progress-transfers"),image:Z,url:"/admin/Consolesfrom/status",valuecard:this.state.exchangefromcount.exchangeOnGoing,classicon:"feather icon-refresh-cw  text-c-green f-30 m-r-5"})}),(0,D.jsx)(o.Z,{xl:2,children:(0,D.jsx)(I,{text:O.Z.t("outgoing-completed-transfers"),image:b,url:"/admin/Consolesfrom/status",valuecard:this.state.exchangefromcount.exchangeDone,classicon:"feather icon-check-circle text-c-blue f-30 m-r-5"})}),(0,D.jsx)(o.Z,{md:6,xl:2,children:(0,D.jsx)(I,{text:O.Z.t("inbound-planned-transfers"),image:b,url:"/admin/Consolesto/status",valuecard:this.state.exchangetocount.exchangePending,classicon:"feather icon-clock text-c-yellow f-30 m-r-5"})}),(0,D.jsx)(o.Z,{md:6,xl:2,children:(0,D.jsx)(I,{text:O.Z.t("inbound-in-progress-transfers"),image:k,url:"/admin/Consolesto/status",valuecard:this.state.exchangetocount.exchangeOnGoing,classicon:"feather  icon-refresh-cw  text-c-green f-30 m-r-5"})}),(0,D.jsx)(o.Z,{xl:2,children:(0,D.jsx)(I,{text:O.Z.t("incoming-completed-transfers"),image:j,url:"/admin/Consolesto/status",valuecard:this.state.exchangetocount.exchangeDone,classicon:"feather  icon-check-circle text-c-blue f-30 m-r-5"})}),(0,D.jsx)(o.Z,{md:6,xl:2,children:(0,D.jsx)(I,{text:O.Z.t("planned-deliveries"),image:y,url:"/admin/colis/status",valuecard:this.state.coliscount.deliveryPending,classicon:"feather  icon-clock text-c-yellow  f-30 m-r-5"})}),(0,D.jsx)(o.Z,{md:6,xl:2,children:(0,D.jsx)(I,{text:O.Z.t("in-progress-deliveries"),image:C,url:"/admin/colis/status",valuecard:this.state.coliscount.deliveryOnGoing,classicon:"feather  icon-refresh-cw  text-c-green  f-30 m-r-5"})}),(0,D.jsx)(o.Z,{md:6,xl:2,children:(0,D.jsx)(I,{text:O.Z.t("packages-delivered"),image:w,url:"/admin/colis/status",valuecard:this.state.coliscount.deliveryDelivery,classicon:"feather  icon-check-circle  text-c-blue  f-30 m-r-5"})}),(0,D.jsx)(o.Z,{md:6,xl:2,children:(0,D.jsx)(I,{text:O.Z.t("packages-delivered-cashed"),image:v,url:"/admin/colis/status",valuecard:this.state.coliscount.deliveryencaissed,classicon:"feather  icon-check-circle  text-c-blue  f-30 m-r-5"})}),(0,D.jsx)(o.Z,{md:6,xl:2,children:(0,D.jsx)(I,{text:O.Z.t("parcel-delivered-value"),image:P,url:"/admin/colis/status",valuecard:this.state.coliscount.total_payment?this.state.coliscount.total_payment.toFixed(0):"0",classicon:"feather  icon-check-circle  text-c-blue  f-30 m-r-5"})}),(0,D.jsx)(o.Z,{md:6,xl:2,children:(0,D.jsx)(I,{text:O.Z.t("shipper-returns"),image:N,url:"/admin/colis/status",valuecard:"0",classicon:"feather  icon-check-circle  text-c-blue  f-30 m-r-5"})})]})})}}]),c}(r.Component),G=_},78695:function(e,t,c){c.d(t,{Z:function(){return P}});var a=c(87462),n=c(63366),s=c(60654),i=c.n(s),r=c(72791),l=c(10162),o=c(71923),d=c(27472),u=c(87338),x=["bsPrefix","className","variant","as"],m=r.forwardRef((function(e,t){var c=e.bsPrefix,s=e.className,o=e.variant,d=e.as,u=void 0===d?"img":d,m=(0,n.Z)(e,x),h=(0,l.vE)(c,"card-img");return r.createElement(u,(0,a.Z)({ref:t,className:i()(o?h+"-"+o:h,s)},m))}));m.displayName="CardImg",m.defaultProps={variant:null};var h=m,f=["bsPrefix","className","bg","text","border","body","children","as"],p=(0,d.Z)("h5"),g=(0,d.Z)("h6"),v=(0,o.Z)("card-body"),Z=(0,o.Z)("card-title",{Component:p}),k=(0,o.Z)("card-subtitle",{Component:g}),j=(0,o.Z)("card-link",{Component:"a"}),b=(0,o.Z)("card-text",{Component:"p"}),y=(0,o.Z)("card-header"),w=(0,o.Z)("card-footer"),C=(0,o.Z)("card-img-overlay"),N=r.forwardRef((function(e,t){var c=e.bsPrefix,s=e.className,o=e.bg,d=e.text,x=e.border,m=e.body,h=e.children,p=e.as,g=void 0===p?"div":p,Z=(0,n.Z)(e,f),k=(0,l.vE)(c,"card"),j=(0,r.useMemo)((function(){return{cardHeaderBsPrefix:k+"-header"}}),[k]);return r.createElement(u.Z.Provider,{value:j},r.createElement(g,(0,a.Z)({ref:t},Z,{className:i()(s,k,o&&"bg-"+o,d&&"text-"+d,x&&"border-"+x)}),m?r.createElement(v,null,h):h))}));N.displayName="Card",N.defaultProps={body:!1},N.Img=h,N.Title=Z,N.Subtitle=k,N.Body=v,N.Link=j,N.Text=b,N.Header=y,N.Footer=w,N.ImgOverlay=C;var P=N}}]);
//# sourceMappingURL=364.a9c966b1.chunk.js.map