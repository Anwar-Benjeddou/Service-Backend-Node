"use strict";(self.webpackChunksubdomaine=self.webpackChunksubdomaine||[]).push([[1801],{75869:function(e,t,n){n.r(t),n.d(t,{default:function(){return T}});var o=n(29439),i=n(74569),r=n.n(i),s=n(72791),l=n(3637),c=n(69240),a=n(2677),d=n(78695),u=n(89743),h=n(43360),f=n(74387),p=n(38780),x=n(15671),m=n(43144),g=n(60136),j=n(29388),Z=n(97562),y=(n(33700),n(72426)),v=n.n(y),k=n(77447),C=n(80184),b=n(24245)(),A=function(e){(0,g.Z)(n,e);var t=(0,j.Z)(n);function n(e){var o;return(0,x.Z)(this,n),(o=t.call(this,e)).state={Historys:[]},o}return(0,m.Z)(n,[{key:"componentDidMount",value:function(){var e=this,t={headers:{"Content-Type":"application/json","Access-Control-Allow-Headers":"Authorization","x-access-token":localStorage.getItem("token"),Authorization:"Bearer "+localStorage.getItem("token")}};r().get(b+"/colis/history/"+this.props.id,t).then((function(t){console.log(t.data),e.setState({Historys:t.data.data.sort((function(e,t){return new Date(t.update_at)-new Date(e.update_at)}))})}))}},{key:"eventcreate",value:function(e){return JSON.parse(e.event).action}},{key:"render",value:function(){return(0,C.jsxs)(f.Z,{children:[(0,C.jsx)("div",{style:{height:"60vh",width:"100%"},children:(0,C.jsx)(k.Z,{fortracking:"colis",locationto:this.props.id})},this.props.key),(0,C.jsx)(d.Z,{children:(0,C.jsx)(Z.VerticalTimeline,{children:this.state.Historys.map((function(e){return(0,C.jsxs)(Z.VerticalTimelineElement,{className:"vertical-timeline-element--work",contentStyle:{background:"rgb(33, 150, 243)",color:"#fff"},contentArrowStyle:{borderRight:"7px solid  rgb(33, 150, 243)"},date:v()(e.created_at).format("YYYY-MM-DD [at] HH:mm:ss"),iconStyle:{background:"rgb(33, 150, 243)",color:"#fff"},children:[(0,C.jsxs)("h3",{className:"vertical-timeline-element-title",children:["Action: ",e.event," "]}),(0,C.jsxs)("h4",{className:"vertical-timeline-element-subtitle",children:["Date :",v()(e.created_at).format("YYYY-MM-DD [at] HH:mm:ss")]}),(0,C.jsxs)("p",{children:["User : ",e.actionneurs?e.actionneurs.username:e.actionneurs]})]})}))})})]})}}]),n}(s.Component);n(12537);var S=function(e){var t=(0,s.useState)(!1),n=(0,o.Z)(t,2),i=n[0],r=n[1],l=function(){return r(!1)};return(0,s.useEffect)((function(){console.log("props.id")}),[]),(0,C.jsxs)(C.Fragment,{children:[(0,C.jsxs)(h.Z,{variant:"secondary",onClick:function(){return r(!0)},children:[" ",(0,C.jsx)("span",{className:"fa fa-list"})]}),(0,C.jsxs)(p.Z,{dialogClassName:"my-modal",show:i,onHide:l,children:[(0,C.jsx)(p.Z.Header,{closeButton:!0,children:(0,C.jsx)(p.Z.Title,{children:" "})}),(0,C.jsx)(p.Z.Body,{children:(0,C.jsx)(A,{id:e.id.id})}),(0,C.jsx)(p.Z.Footer,{children:(0,C.jsx)(h.Z,{variant:"secondary",onClick:l,children:"Close"})})]})]})},w=n(74889),z=n.n(w),H=n(24245)(),I={"overflow-y":"scroll",border:"1px solid ",height:"1000px",with:"100%",position:"relative"};var T=function(){var e=(0,s.useState)([]),t=(0,o.Z)(e,2),n=t[0],i=t[1],p=(0,s.useState)([]),x=(0,o.Z)(p,2),m=x[0],g=x[1],j=function(){var e={headers:{"Content-Type":"application/json","Access-Control-Allow-Headers":"Authorization","x-access-token":localStorage.getItem("token"),Authorization:"Bearer "+localStorage.getItem("token")}};r().get(H+"/ticket/list?current_page=1&per_page=500",e).then((function(e){i(e.data.data.data.filter((function(e){return 0==e.status}))),g(e.data.data.data.filter((function(e){return 0!==e.status}))),console.log(e.data.data.data)})).catch((function(){console.log("'eeh")}))};(0,s.useEffect)((function(){j()}),[]);var Z=function(e){switch(e){case"0":return"#d8d9e1";case"1":return"#c5e89d";case"2":return"#e29de8"}};return(0,C.jsx)(f.Z,{children:(0,C.jsx)(l.Z.Container,{defaultActiveKey:"home",children:(0,C.jsxs)(u.Z,{children:[(0,C.jsx)(a.Z,{sm:2,children:(0,C.jsxs)(c.Z,{variant:"pills",className:"flex-column",children:[(0,C.jsx)(c.Z.Item,{children:(0,C.jsx)(c.Z.Link,{eventKey:"home",children:"Ticket en cours"})}),(0,C.jsx)(c.Z.Item,{children:(0,C.jsx)(c.Z.Link,{eventKey:"profile",children:"Ticket Trait\xe9s"})})]})}),(0,C.jsx)(a.Z,{sm:10,children:(0,C.jsxs)(l.Z.Content,{children:[(0,C.jsx)(l.Z.Pane,{eventKey:"home",children:(0,C.jsx)(u.Z,{style:{height:"1000px"},children:(0,C.jsx)(a.Z,{md:12,style:I,children:(0,C.jsx)(u.Z,{children:n.map((function(e){return(0,C.jsx)(a.Z,{md:3,children:(0,C.jsxs)(d.Z,{style:{backgroundColor:Z(e.priority)},children:[(0,C.jsxs)(d.Z.Title,{style:{fontWeight:"bold",color:"#000000"},children:[" ",e.code," colis : ",null===e||void 0===e?void 0:e.colis.index_colis," "]}),(0,C.jsxs)(d.Z.Body,{style:{fontWeight:"bold",color:"#000000"},children:[e.type,(0,C.jsx)("p",{style:{fontWeight:"bold",color:"#000000"},children:e.message}),(0,C.jsx)("p",{style:{fontWeight:"bold",color:"#000000"},children:e.colis.index_colis}),(0,C.jsxs)("div",{children:[(0,C.jsx)(S,{id:e.colis}),(0,C.jsx)(h.Z,{style:{backgroundColor:"#8c948c"},onClick:function(){return function(e){console.log(e);var t={headers:{"Content-Type":"application/json","Access-Control-Allow-Headers":"Authorization","x-access-token":localStorage.getItem("token"),Authorization:"Bearer "+localStorage.getItem("token")}};r().put(H+"/ticket/close/"+e,t).then((function(e){j()})).catch((function(){console.log("'eeh")}))}(e.id)},children:" fermer "}),(0,C.jsx)(h.Z,{style:{backgroundColor:"#8c948c"},onClick:function(){return function(e){var t={headers:{"Content-Type":"application/json","Access-Control-Allow-Headers":"Authorization","x-access-token":localStorage.getItem("token"),Authorization:"Bearer "+localStorage.getItem("token")}};r().put(H+"/ticket/valid/"+e,t).then((function(e){j()})).catch((function(){console.log("'eeh")}))}(e.id)},children:" Valider "})]})]})]})})}))})})})}),(0,C.jsx)(l.Z.Pane,{eventKey:"profile",children:(0,C.jsx)(u.Z,{style:{height:"1000px"},children:(0,C.jsx)(a.Z,{md:12,style:I,children:(0,C.jsx)(u.Z,{children:(0,C.jsx)(z(),{list:m,renderItem:function(e,t){return(0,C.jsx)(a.Z,{md:4,children:(0,C.jsxs)(d.Z,{children:[(0,C.jsxs)(d.Z.Title,{children:[" ",e.code]}),(0,C.jsxs)(d.Z.Body,{children:[e.type,(0,C.jsx)("p",{style:{fontWeight:"bold"},children:e.message}),(0,C.jsx)(S,{id:e.colis})]})]})})},renderWhenEmpty:function(){return(0,C.jsx)("div",{children:"List is empty!"})},sortBy:["code",{key:"lastName",descending:!0}]})})})})})]})})]})})})}},77447:function(e,t,n){n.d(t,{Z:function(){return x}});var o=n(15671),i=n(43144),r=n(60136),s=n(29388),l=n(72791),c=n(2040),a={position:"absolute",width:40,height:40,left:-20,top:-20,border:"5px solid #f44336",borderRadius:40,backgroundColor:"white",textAlign:"center",color:"#3f51b5",fontSize:16,fontWeight:"bold",padding:4},d=n(80184),u=function(e){(0,r.Z)(n,e);var t=(0,s.Z)(n);function n(){return(0,o.Z)(this,n),t.apply(this,arguments)}return(0,i.Z)(n,[{key:"render",value:function(){return(0,d.jsx)("div",{style:a,children:this.props.text},this.props.id)}}]),n}(l.Component),h=n(74569),f=n.n(h),p=n(24245)(),x=function(e){(0,r.Z)(n,e);var t=(0,s.Z)(n);function n(e){var i;return(0,o.Z)(this,n),(i=t.call(this,e)).state={listPosition:[]},i}return(0,i.Z)(n,[{key:"componentDidMount",value:function(){var e=this;console.log(this.props.locationto);var t={headers:{"Content-Type":"application/json","Access-Control-Allow-Headers":"Authorization","x-access-token":localStorage.getItem("token"),Authorization:"Bearer "+localStorage.getItem("token")}};f().get(p+"/"+this.props.fortracking+"/location/"+this.props.locationto,t).then((function(t){console.log("this respon locationto",t.data.data),e.setState({listPosition:t.data.data})})).catch((function(e){console.log(e)}))}},{key:"render",value:function(){return(0,d.jsx)(c.ZP,{bootstrapURLKeys:{key:"AIzaSyB82mLJM4AnpZmSQmnvXjXsUETGidCj3Yo"},defaultCenter:this.props.center,defaultZoom:this.props.zoom,children:this.state.listPosition.map((function(e){return(0,d.jsx)(u,{lat:e.latitude,lng:e.longitude,text:"A"},e.id)}))})}}]),n}(l.Component);x.defaultProps={center:{lat:36.1,lng:10.1},zoom:8}},12537:function(){}}]);
//# sourceMappingURL=1801.3da8f27d.chunk.js.map