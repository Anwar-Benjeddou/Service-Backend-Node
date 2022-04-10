"use strict";(self.webpackChunksubdomaine=self.webpackChunksubdomaine||[]).push([[4575],{44575:function(e,i,t){var r=t(15671),o=t(43144),n=t(60136),c=t(29388),a=t(72791),l=t(78417),s=t(23197),p=t(69466),d=t(91923),u=t(74387),m=t(80184),h=function(e){(0,n.Z)(t,e);var i=(0,c.Z)(t);function t(){var e;(0,r.Z)(this,t);for(var o=arguments.length,n=new Array(o),c=0;c<o;c++)n[c]=arguments[c];return(e=i.call.apply(i,[this].concat(n))).state={main:[],item:[]},e.componentWillReceiveProps=function(){p.Z.items.map((function(i,t){return i.type&&"group"===i.type&&e.getCollapse(i),!1}))},e.getCollapse=function(i){i.children&&i.children.filter((function(t){return t.type&&"collapse"===t.type?e.getCollapse(t):t.type&&"item"===t.type&&document.location.pathname===s.Z.basename+t.url&&e.setState({item:t,main:i}),!1}))},e}return(0,o.Z)(t,[{key:"componentDidMount",value:function(){var e=this;p.Z.items.map((function(i,t){return i.type&&"group"===i.type&&e.getCollapse(i,t),!1}))}},{key:"render",value:function(){var e,i,t="",r="Welcome";return this.state.main&&"collapse"===this.state.main.type&&(e=(0,m.jsx)("li",{className:"breadcrumb-item",children:(0,m.jsx)("a",{href:d.Z.BLANK_LINK,children:this.state.main.title})})),this.state.item&&"item"===this.state.item.type&&(r=this.state.item.title,i=(0,m.jsx)("li",{className:"breadcrumb-item",children:(0,m.jsx)("a",{href:d.Z.BLANK_LINK,children:r})}),!1!==this.state.item.breadcrumbs&&(t=(0,m.jsx)("div",{className:"page-header",children:(0,m.jsx)("div",{className:"page-block",children:(0,m.jsx)("div",{className:"row align-items-center",children:(0,m.jsxs)("div",{className:"col-md-12",children:[(0,m.jsx)("div",{className:"page-header-title",children:(0,m.jsx)("h5",{className:"m-b-10",children:r})}),(0,m.jsxs)("ul",{className:"breadcrumb",children:[(0,m.jsx)("li",{className:"breadcrumb-item",children:(0,m.jsx)(l.Z,{to:"/",children:(0,m.jsx)("i",{className:"feather icon-home"})})}),e,i]})]})})})}))),document.title=r+" | Logistic",(0,m.jsx)(u.Z,{children:t})}}]),t}(a.Component);i.Z=h},69466:function(e,i,t){var r=t(22247);i.Z={items:[{id:"navigation",title:r.Z.t("navigation"),type:"group",icon:"icon-navigation",role:"ROLE_ADMIN",children:[{id:"dashboard",title:r.Z.t("dashboard"),type:"item",url:"/dashboard/default",icon:"feather icon-home",role:"ROLE_ADMIN"}]},{id:"Pickupadmin",title:r.Z.t("pickup-management"),type:"group",icon:"icon-ui",role:"ROLE_ADMIN",children:[{id:"Pickupadmins",title:r.Z.t("pickups"),type:"collapse",icon:"feather icon-airplay",children:[{id:"Pickup",title:r.Z.t("pickup-assignment"),type:"item",url:"/admin/List/pickup",icon:"feather icon-upload"},{id:"Pickup",title:r.Z.t("pickup-assignment"),type:"item",url:"/admin/decisions/valid/pickup",icon:"feather icon-upload"},{id:"Pickupsszza",title:r.Z.t("pickup-group-assignment"),type:"item",url:"/admin/List/pickups",icon:"feather icon-upload"},{id:"Pickupszs",title:r.Z.t("pickup-provider-assignment"),type:"item",url:"/admin/List/pickups/provider",icon:"feather icon-upload"},{id:"Pickusfrps",title:r.Z.t("pickup-forcing"),type:"item",url:"/admin/List/pickups/provider/frocage",icon:"feather icon-upload"},{id:"ReplanificationPickups",title:r.Z.t("pickup-reschedule"),type:"item",url:"/admin/replanification/pickups",icon:"feather icon-compass"},{id:"listannu",title:r.Z.t("cancel-name"),type:"item",url:"/admin/annulation/pickups",icon:"feather icon-x-circle"}]}]},{id:"Dispatche",title:r.Z.t("dispatch-management"),type:"group",icon:"icon-ui",role:"ROLE_ADMIN",children:[{id:"Dispatchs",title:r.Z.t("dispatch"),type:"collapse",icon:"feather icon-repeat",children:[{id:"Dispatch",title:r.Z.t("dispatch-packages"),type:"item",url:"/admin/decision/dispatch",icon:"feather icon-rotate-cw"},{id:"Dispatchs",title:r.Z.t("dispatch-group-packages")+" D",type:"item",url:"/admin/decisions/dispatchdouchette",icon:"feather icon-rotate-cw"},{id:"Dispatchs",title:r.Z.t("dispatch-group-packages"),type:"item",url:"/admin/decisions/dispatchs",icon:"feather icon-rotate-cw"},{id:"Dispatchsconsole",title:r.Z.t("dispatch-group-transfers"),type:"item",url:"/admin/decisions/consoles",icon:"feather icon-rotate-cw"},{id:"Dispatchcon",title:r.Z.t("dispatch-delivery-transfers"),type:"item",url:"/admin/decisions/console/dispatchs",icon:"feather icon-rotate-cw"},{id:"RetourManagmenets",title:r.Z.t("dispatch-provisional-returns"),type:"item",url:"/retour/delivery/reschedule",icon:"feather icon-log-in "}]}]},{id:"statusColis",title:r.Z.t("packages-satatus"),type:"group",icon:"icon-ui",role:"ROLE_ADMIN",children:[{id:"statusColi",title:r.Z.t("package"),type:"collapse",icon:"feather icon-box",children:[{id:"statucolis",title:r.Z.t("packages-to-deliver"),type:"item",url:"/admin/colis/status",icon:"feather icon-box"},{id:"statucolismanifeste",title:r.Z.t("delivery-note"),type:"item",url:"/admin/colis/manieste/driver",icon:"feather icon-calendar"}]}]},{id:"statusConsole",title:r.Z.t("transfers-management"),type:"group",icon:"icon-ui",role:"ROLE_ADMIN",children:[{id:"statusConsol",title:r.Z.t("transferts"),type:"collapse",icon:"feather icon-repeat",children:[{id:"statuConsoles",title:r.Z.t("incoming-transfers"),type:"item",url:"/admin/Consolesto/status",icon:"feather icon-log-in "},{id:"statuConsole",title:r.Z.t("outgoing-transfers"),type:"item",url:"/admin/Consolesfrom/status",icon:"feather icon-log-out "},{id:"statucolismanifestekif",title:r.Z.t("outgoing-transfers-note"),type:"item",url:"/admin/colis/maniesteconsole/driver",icon:"feather icon-calendar"}]}]},{id:"RetourManagmenets",title:r.Z.t("return-management"),type:"group",icon:"icon-ui",role:"ROLE_ADMIN",children:[{id:"RetourManagmenets",title:r.Z.t("return-management"),type:"collapse",icon:"feather icon-repeat",children:[{id:"Retourdispatch",title:r.Z.t("dispatch-returns"),type:"item",url:"/retour/delivery/dispatch",icon:"feather icon-log-in "},{id:"Retourdispatch",title:r.Z.t("dispatch-returns-for-provider"),type:"item",url:"/retour/delivery/reschedule/direct_toprovider",icon:"feather icon-log-in "},{id:"Retourdispatchprovider",title:r.Z.t("provider-to-returns"),type:"item",url:"/retour/retour/toprovider",icon:"feather icon-log-in "},{id:"Retourdispatchprovider",title:r.Z.t("manifest-returns"),type:"item",url:"/manifeste/retourfinal/provider",icon:"feather icon-file "},{id:"Retourdispatchagence",title:r.Z.t("incoming-returns-to-my-agency"),type:"item",url:"/retour/retour/toagence",icon:"feather icon-log-in "},{id:"fromagence",title:r.Z.t("outgoing-returns-to-other-agencies"),type:"item",url:"/retour/retour/fromagence",icon:"feather icon-log-in "},{id:"fromagencecdf",title:r.Z.t("manifest-returns-for-agency"),type:"item",url:"/manifeste/retourfinal/liste/agence",icon:"feather icon-file "}]}]},{id:"ui-elemenAnomalies",title:r.Z.t("attempts-management"),type:"group",icon:"icon-ui",role:"ROLE_ADMIN",children:[{id:"pro_lisAnomalies",title:r.Z.t("anomalies"),type:"collapse",icon:"feather icon-bell",children:[{id:"ProviderAnomalies",title:r.Z.t("anomalies"),type:"item",url:"/provider/anomalies/list",icon:"feather icon-bell"}]}]},{id:"facturation",title:r.Z.t("billing"),type:"group",icon:"icon-ui",role:"ROLE_ADMIN",children:[{id:"facturationtss",title:r.Z.t("invoices-management"),type:"collapse",icon:"feather icon-file-text",children:[{id:"statuSConsoless",title:r.Z.t("invoices"),type:"item",url:"/facture/provider",icon:"feather icon-file-text "},{id:"facetures",title:r.Z.t("invoices-simulation"),type:"item",url:"/factures/provider",icon:"feather icon-file-text "},{id:"factCAISrress",title:r.Z.t("verify-invoice-collection"),type:"item",url:"/caisse/gestion/livaraison/colis",icon:"feather icon-file-text "},{id:"factCAISrressforn",title:r.Z.t("verify-invoice-collection-per-provider"),type:"item",url:"/caisse/gestion/livaraison/colis/provider",icon:"feather icon-file-text "},{id:"factCAISrress",title:r.Z.t("checkout-management"),type:"item",url:"/caisse/gestion/livaraison",icon:"feather icon-file-text "}]}]},{id:"Ticket",title:r.Z.t("tickets-management"),type:"group",icon:"icon-ui",role:"ROLE_ADMIN",children:[{id:"Tickets",title:r.Z.t("providers-orders"),type:"collapse",icon:"feather icon-feather",children:[{id:"TicketList",title:r.Z.t("tickets-list"),type:"item",url:"/ticket/List",icon:"feather icon-feather "},{id:"TicketListd",title:r.Z.t("tickets-list-details"),type:"item",url:"/ticket/List/details",icon:"feather icon-feather "}]}]},{id:"Settings",title:r.Z.t("general-parms"),type:"group",icon:"icon-ui",role:"ROLE_ADMIN",children:[{id:"Settingsd",title:r.Z.t("general-parms"),type:"collapse",icon:"feather icon-settings",children:[{id:"Agency",title:r.Z.t("agency-management-title"),type:"item",url:"/List/agency",icon:"feather icon-pocket"},{id:"zone",title:r.Z.t("zone-management-title"),type:"item",url:"/List/zone",icon:"feather icon-map-pin"},{id:"privilege",title:r.Z.t("user-privilege"),type:"item",url:"/List/privilege",icon:"feather icon-underline"},{id:"permission",title:r.Z.t("permissions"),type:"item",url:"/List/permission",icon:"feather icon-zap"},{id:"admin",title:r.Z.t("admins"),type:"item",url:"/List/admin",icon:"feather icon-users"},{id:"vehicule",title:r.Z.t("vehicules"),type:"item",url:"/List/vehicule",icon:"feather icon-target"},{id:"driver",title:r.Z.t("drivers"),type:"item",url:"/List/driver",icon:"feather icon-user-check"},{id:"storekeeper",title:r.Z.t("store-keepers"),type:"item",url:"/List/storekeeper",icon:"feather icon-clipboard"},{id:"Fournisseur",title:r.Z.t("providers"),type:"item",url:"/List/provider",icon:"feather icon-link"},{id:"Article",title:r.Z.t("accounting-balance"),type:"item",url:"/List/article",icon:"feather icon-layout"},{id:"Anomalypickups",title:r.Z.t("anomalies-attempts"),type:"item",url:"/admin/List/Anomalypickups",icon:"feather icon-bell"}]}]},{id:"Archive",title:r.Z.t("archives-management"),type:"group",icon:"icon-ui",role:"ROLE_ADMIN",children:[{id:"Archiveadmin",title:r.Z.t("archives"),type:"collapse",icon:"feather icon-briefcase",children:[{id:"Archivepickup",title:r.Z.t("pickup-archive"),type:"item",url:"/admin/archive/pickup",icon:"feather icon-briefcase"},{id:"Archiveconsol",title:r.Z.t("incoming-tansfer-archive"),type:"item",url:"/admin/archive/console_from",icon:"feather icon-briefcase"},{id:"Archiveconsolto",title:r.Z.t("outgoing-tansfer-archive"),type:"item",url:"/admin/archive/console_to",icon:"feather icon-briefcase"},{id:"Archiveconsoltozyt",title:r.Z.t("delivery-archive"),type:"item",url:"/admin/archive/livraison",icon:"feather icon-briefcase"},{id:"Archiveconsdolto",title:r.Z.t("return-archive"),type:"item",url:"/admin/archive/retour",icon:"feather icon-briefcase"}]}]},{id:"Statistic",title:r.Z.t("statistics-and-econometrics"),type:"group",icon:"icon-ui",role:"ROLE_ADMIN",children:[{id:"Statistictest",title:r.Z.t("stitstics"),type:"collapse",icon:"feather icon-bar-chart",children:[{id:"Statistictestd",title:r.Z.t("global-statistics")+" dashbord",type:"item",url:"/admin/statistic/DashboardGlobal",icon:"feather icon-bar-chart"},{id:"Statistictestd",title:r.Z.t("global-statistics"),type:"item",url:"/admin/statistic/global",icon:"feather icon-bar-chart"},{id:"Statistictestd",title:r.Z.t("global-statistics")+" fournisseur",type:"item",url:"/admin/statistic/provider",icon:"feather icon-bar-chart"},{id:"Statistictessstd",title:r.Z.t("global-statistics")+" agence",type:"item",url:"/admin/statistic/agence",icon:"feather icon-bar-chart"}]}]},{id:"chart-dd",title:r.Z.t("download-apk"),type:"group",icon:"icon-charts",role:"ROLE_ADMIN",children:[{id:"charts",title:r.Z.t("mobile-app-download"),type:"item",icon:"feather icon-pie-chart",url:"/getapk/dashbord/getapk"}]},{id:"Statizzstic",title:"",type:"group",icon:"icon-ui",role:"ROLE_ADMIN"},{id:"Statisstic",title:"",type:"group",icon:"icon-ui",role:"ROLE_ADMIN"},{id:"dashboard",title:r.Z.t("navigation"),type:"group",icon:"icon-navigation",role:"ROLE_PROVIDER",children:[{id:"dashboard",title:r.Z.t("dashboard"),type:"item",url:"/provider/dashboard/default",icon:"feather icon-home",role:"ROLE_PROVIDER"}]},{id:"ui-element",title:r.Z.t("pickups"),type:"group",icon:"icon-ui",role:"ROLE_PROVIDER",children:[{id:"basic",title:r.Z.t("pickups"),type:"collapse",icon:"feather icon-box",children:[{id:"Pickups",title:r.Z.t("add-package-excel"),type:"item",url:"/provider/Add/pickups",icon:"feather icon-upload"},{id:"Pickup",title:r.Z.t("add-package"),type:"item",url:"/provider/Add/pickup",icon:"feather icon-plus"},{id:"ProviderPickup",title:r.Z.t("print-border"),type:"item",url:"/provider/List/pickup",icon:"feather icon-folder"},{id:"ProviderPickups",title:r.Z.t("packages-list-details"),type:"item",url:"/provider/List/pickup/status",icon:"feather icon-arrow-up"},{id:"depot",title:r.Z.t("deposit-list"),type:"item",url:"/provider/List/depot/status",icon:"feather icon-arrow-up"}]}]},{id:"ui-element livraison",title:r.Z.t("deliveries"),type:"group",icon:"icon-ui",role:"ROLE_PROVIDER",children:[{id:"basiclivraison",title:r.Z.t("deliveries"),type:"collapse",icon:"feather icon-box",children:[{id:"Providerlivraison",title:r.Z.t("delivery-list"),type:"item",url:"/provider/List/livraison",icon:"feather icon-box"},{id:"Providerlivraison",title:r.Z.t("delivery-list-all"),type:"item",url:"/provider/List/livraison/all",icon:"feather icon-aperture"}]}]},{id:"ui-element facture",title:r.Z.t("billing"),type:"group",icon:"icon-ui",role:"ROLE_PROVIDER",children:[{id:"pro_list facture",title:r.Z.t("invoices"),type:"collapse",icon:"feather icon-file",children:[{id:"Providerfacture",title:r.Z.t("invoice-status"),type:"item",url:"/provider/List/facture",icon:"feather icon-file"}]}]},{id:"ui-elemententative retour",title:r.Z.t("attempts"),type:"group",icon:"icon-ui",role:"ROLE_PROVIDER",children:[{id:"protentativeretour",title:r.Z.t("attempted-returns"),type:"collapse",icon:"feather icon-bell",children:[{id:"listretour",title:r.Z.t("provisional-returns-list"),type:"item",url:"/provider/list/retour/provisoire",icon:"feather icon-bell"},{id:"listretour",title:r.Z.t("unplanned-final-returns-list"),type:"item",url:"/provider/list/retour/finals/dispatched",icon:"feather icon-bell"},{id:"listretour",title:r.Z.t("return-list"),type:"item",url:"/provider/List/retour",icon:"feather icon-bell"},{id:"retourtentative",title:r.Z.t("attempt-list"),type:"item",url:"/provider/List/retour/status",icon:"feather icon-bell"}]}]},{id:"ui-elementss",title:r.Z.t("archives"),type:"group",icon:"icon-ui",role:"ROLE_PROVIDER",children:[{id:"basicArchivess",title:r.Z.t("archives"),type:"collapse",icon:"feather icon-briefcase",children:[{id:"qedq",title:r.Z.t("pickup-archive"),type:"item",url:"/provider/archive/pickup",icon:"feather icon-briefcase"},{id:"Picksup",title:r.Z.t("delivery-archive"),type:"item",url:"/provider/archive/livraison",icon:"feather icon-briefcase"},{id:"Pickusaep",title:r.Z.t("return-archive"),type:"item",url:"/provider/archive/retour",icon:"feather icon-briefcase"}]}]},{id:"ui-element",title:"UI ELEMENT",type:"group",icon:"icon-ui",children:[{id:"basic",title:"Component",type:"collapse",icon:"feather icon-box",children:[{id:"button",title:"Button",type:"item",url:"/basic/button"},{id:"badges",title:"Badges",type:"item",url:"/basic/badges"},{id:"breadcrumb-pagination",title:"Breadcrumb & Pagination",type:"item",url:"/basic/breadcrumb-paging"},{id:"collapse",title:"Collapse",type:"item",url:"/basic/collapse"},{id:"tabs-pills",title:"Tabs & Pills",type:"item",url:"/basic/tabs-pills"},{id:"typography",title:"Typography",type:"item",url:"/basic/typography"}]}]},{id:"ui-forms",title:"Forms & Tables",type:"group",icon:"icon-group",children:[{id:"form-basic",title:"Form Elements",type:"item",url:"/forms/form-basic",icon:"feather icon-file-text"},{id:"bootstrap",title:"Table",type:"item",icon:"feather icon-server",url:"/tables/bootstrap"}]},{id:"pages",title:"Pages",type:"group",icon:"icon-pages",children:[{id:"auth",title:"Authentication",type:"collapse",icon:"feather icon-lock",badge:{title:"New",type:"label-danger"},children:[{id:"signup-1",title:"Sign up",type:"item",url:"/auth/signup-1",target:!0,breadcrumbs:!1},{id:"signin-1",title:"Sign in",type:"item",url:"/auth/signin-1",target:!0,breadcrumbs:!1}]},{id:"sample-page",title:"Sample Page",type:"item",url:"/sample-page",classes:"nav-item",icon:"feather icon-sidebar"},{id:"docs",title:"Documentation",type:"item",url:"/docs",classes:"nav-item",icon:"feather icon-help-circle"},{id:"menu-level",title:"Menu Levels",type:"collapse",icon:"feather icon-menu",children:[{id:"menu-level-1.1",title:"Menu Level 1.1",type:"item",url:"#!"},{id:"menu-level-1.2",title:"Menu Level 2.2",type:"collapse",children:[{id:"menu-level-2.1",title:"Menu Level 2.1",type:"item",url:"#"},{id:"menu-level-2.2",title:"Menu Level 2.2",type:"collapse",children:[{id:"menu-level-3.1",title:"Menu Level 3.1",type:"item",url:"#"},{id:"menu-level-3.2",title:"Menu Level 3.2",type:"item",url:"#"}]}]}]},{id:"disabled-menu",title:"Disabled Menu",type:"item",url:"#",classes:"nav-item disabled",icon:"feather icon-power"}]}]}},91923:function(e,i){i.Z={BLANK_LINK:"#!"}}}]);
//# sourceMappingURL=4575.9a31ae8c.chunk.js.map