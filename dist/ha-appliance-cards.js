/*! ha-appliance-cards v1.1.0 - https://github.com/gabor-io/ha-appliance-custom-card - MIT licence */
var g="aeg-dishwasher-card",W="aeg-dishwasher-card-editor",g1="1.1.0",a={OFF:"OFF",IDLE:"IDLE",READY_TO_START:"READY_TO_START",DELAYED_START:"DELAYED_START",RUNNING:"RUNNING",PAUSED:"PAUSED",END_OF_CYCLE:"END_OF_CYCLE",ALARM:"ALARM",UNKNOWN:"UNKNOWN"},k1={[a.OFF]:"idle",[a.IDLE]:"idle",[a.READY_TO_START]:"ready",[a.DELAYED_START]:"delayed",[a.RUNNING]:"running",[a.PAUSED]:"paused",[a.END_OF_CYCLE]:"done",[a.ALARM]:"alarm",[a.UNKNOWN]:"idle"},T={PREWASH:"PREWASH",MAINWASH:"MAINWASH",COLDRINSE:"COLDRINSE",HOTRINSE:"HOTRINSE",EXTRARINSE:"EXTRARINSE",DRYING:"DRYING",ADO_DRYING:"ADO_DRYING",UNAVAILABLE:"UNAVAILABLE"},n1=["PREWASH","MAINWASH","RINSE","DRYING"],y1={[T.PREWASH]:"PREWASH",[T.MAINWASH]:"MAINWASH",[T.COLDRINSE]:"RINSE",[T.HOTRINSE]:"RINSE",[T.EXTRARINSE]:"RINSE",[T.DRYING]:"DRYING",[T.ADO_DRYING]:"DRYING"},x={ECO:{icon:"leaf",water:8.4,energy:.488,duration:310,steps:["PREWASH","MAINWASH","RINSE","DRYING"]},AUTO:{icon:"auto",water:12.5,energy:1,duration:180,steps:["PREWASH","MAINWASH","RINSE","DRYING"]},QUICK30:{icon:"quick",water:8.5,energy:.475,duration:30,steps:["MAINWASH","RINSE"]},QUICK60:{icon:"clock",water:10.5,energy:1,duration:60,steps:["MAINWASH","RINSE","DRYING"]},NORMAL90:{icon:"clock",water:10.5,energy:1,duration:90,steps:["MAINWASH","RINSE","DRYING"]},"120_MIN":{icon:"clock",water:10.5,energy:.9,duration:120,steps:["MAINWASH","RINSE","DRYING"]},RINSE:{icon:"rinse",water:4,energy:.15,duration:15,steps:["PREWASH"]},MACHINE_CARE:{icon:"care",water:10,energy:.575,duration:60,steps:["MAINWASH","RINSE","DRYING"]}},l1=["ECO","AUTO","QUICK30","QUICK60","NORMAL90","120_MIN","RINSE","MACHINE_CARE"],w1=[{key:"xtra_dry",entity:"xtra_dry_option",icon:"dry",programs:["ECO","QUICK60","NORMAL90","120_MIN"]},{key:"extra_power",entity:"extra_power_option",icon:"power",programs:["QUICK30","QUICK60","NORMAL90","120_MIN"]},{key:"extra_silent",entity:"extra_silent_option",icon:"silent",programs:["ECO","NORMAL90","120_MIN"]},{key:"glass_care",entity:"glass_care_option",icon:"glass",programs:["QUICK30","QUICK60","NORMAL90","120_MIN"]},{key:"sanitize",entity:"sanitize_option",icon:"sanitize",programs:["QUICK30","QUICK60","NORMAL90","120_MIN"]},{key:"spray_zone",entity:"spray_zone_option",icon:"spray",programs:["QUICK30","QUICK60","NORMAL90","120_MIN"]},{key:"zone_clean",entity:"zone_clean_option",icon:"zone",programs:["QUICK30","QUICK60","NORMAL90","120_MIN"]},{key:"one_rack",entity:"one_rack_option",icon:"rack",programs:["QUICK30","QUICK60"]},{key:"auto_door_opener",entity:"auto_door_opener",icon:"door",programs:null}],b1={[a.OFF]:["on"],[a.IDLE]:["start","off"],[a.READY_TO_START]:["start","off"],[a.DELAYED_START]:["stopreset"],[a.RUNNING]:["pause"],[a.PAUSED]:["resume","stopreset"],[a.END_OF_CYCLE]:["stopreset","off"],[a.ALARM]:["stopreset","off"],[a.UNKNOWN]:[]},T1={on:{icon:"power",style:"ghost"},off:{icon:"power",style:"ghost"},start:{icon:"play",style:"primary"},pause:{icon:"pause",style:"primary"},resume:{icon:"play",style:"primary"},stopreset:{icon:"stop",style:"ghost"}},x1={DISH_ALARM_SALT_MISSING:"warning",DISH_ALARM_RINSE_AID_LOW:"warning",DISH_ALARM_I10:"error",DISH_ALARM_I11:"error",DISH_ALARM_I20:"error",DISH_ALARM_I30:"error",DISH_ALARM_I41:"error",DISH_ALARM_I43:"error",DISH_ALARM_I44:"error",DISH_ALARM_IF1:"error"},B1=[60,120,180,240,360,480,720];function X(M,C,H){let V=M?.language&&M.language!=="auto"?M.language:null,L=(C?.locale?.language||C?.language||"en").slice(0,2).toLowerCase(),r=V||L;return H.includes(r)?r:"en"}function J(M,C,H="en"){let V=M[C]||M[H],L=M[H],r=(e,A)=>A.split(".").reduce((i,p)=>i?i[p]:void 0,e);return(e,A="")=>{let i=r(V,e);if(i!==void 0)return i;let p=r(L,e);return p!==void 0?p:A}}var n5={card_name:"Mosogat\xF3g\xE9p",state:{OFF:"Kikapcsolva",IDLE:"K\xE9szenl\xE9tben",READY_TO_START:"Ind\xEDt\xE1sra k\xE9sz",DELAYED_START:"K\xE9sleltetett ind\xEDt\xE1s",RUNNING:"Program fut",PAUSED:"Sz\xFCneteltetve",END_OF_CYCLE:"Elk\xE9sz\xFClt",ALARM:"Hiba",UNKNOWN:"Ismeretlen"},phase:{PREWASH:"El\u0151mos\xE1s",MAINWASH:"Mosogat\xE1s",RINSE:"\xD6bl\xEDt\xE9s",DRYING:"Sz\xE1r\xEDt\xE1s",UNAVAILABLE:"\u2013"},phase_long:{PREWASH:"El\u0151mos\xE1s",MAINWASH:"Mosogat\xE1s",COLDRINSE:"Hideg \xF6bl\xEDt\xE9s",HOTRINSE:"Meleg \xF6bl\xEDt\xE9s",EXTRARINSE:"Extra \xF6bl\xEDt\xE9s",DRYING:"Sz\xE1r\xEDt\xE1s",ADO_DRYING:"AirDry sz\xE1r\xEDt\xE1s",UNAVAILABLE:"Nincs fut\xF3 f\xE1zis"},program:{ECO:"Eco",AUTO:"Auto",QUICK30:"Quick 30",QUICK60:"1h00m",NORMAL90:"1h30m","120_MIN":"2h00m",RINSE:"\xD6bl\xEDt\xE9s \xE9s v\xE1rakoz\xE1s",MACHINE_CARE:"G\xE9p\xE1pol\xE1s"},program_hint:{ECO:"Norm\xE1l szennyezetts\xE9g, a leghat\xE9konyabb v\xEDz- \xE9s energiafogyaszt\xE1s.",AUTO:"B\xE1rmilyen szennyezetts\xE9g, a g\xE9p m\xE9ri a t\xF6ltetet \xE9s a koszt.",QUICK30:"Friss szennyez\u0151d\xE9s, sz\xE1r\xEDt\xE1si f\xE1zis n\xE9lk\xFCl.",QUICK60:"Friss, enyh\xE9n r\xE1sz\xE1radt szennyez\u0151d\xE9s.",NORMAL90:"Norm\xE1l, enyh\xE9n r\xE1sz\xE1radt szennyez\u0151d\xE9s, l\xE1basokhoz is.","120_MIN":"Norm\xE1l, r\xE1sz\xE1radt szennyez\u0151d\xE9s, l\xE1basokhoz \xE9s serpeny\u0151kh\xF6z.",RINSE:"Felfriss\xEDti a k\xE9s\u0151bb mosand\xF3 ed\xE9nyeket. Mos\xF3szer n\xE9lk\xFCl!",MACHINE_CARE:"A g\xE9p belsej\xE9nek tiszt\xEDt\xE1sa v\xEDzk\u0151 \xE9s zs\xEDr ellen."},option:{xtra_dry:"ExtraDry",extra_power:"ExtraPower",extra_silent:"ExtraSilent",glass_care:"GlassCare",sanitize:"Fert\u0151tlen\xEDt\xE9s",spray_zone:"SprayZone",zone_clean:"ZoneClean",one_rack:"Egy kos\xE1r",auto_door_opener:"AutoOpen ajt\xF3"},option_hint:{xtra_dry:"Intenz\xEDvebb sz\xE1r\xEDt\xE1s a program v\xE9g\xE9n.",extra_power:"Er\u0151sebb mosogat\xE1s makacs szennyez\u0151d\xE9shez.",extra_silent:"Halkabb m\u0171k\xF6d\xE9s, hosszabb program.",glass_care:"\xDCveg\xE1rut k\xEDm\xE9l\u0151, max. 45 \xB0C.",sanitize:"Extra fert\u0151tlen\xEDt\u0151 \xF6bl\xEDt\xE9s.",spray_zone:"F\xF3kusz\xE1lt v\xEDzsug\xE1r az als\xF3 kos\xE1rban.",zone_clean:"Als\xF3 kos\xE1r er\u0151s, fels\u0151 kos\xE1r k\xEDm\xE9l\u0151 mos\xE1s.",one_rack:"Csak az egyik kos\xE1r mos\xE1sa.",auto_door_opener:"A ciklus v\xE9g\xE9n automatikusan kinyitja az ajt\xF3t."},command:{on:"Bekapcsol\xE1s",off:"Kikapcsol\xE1s",start:"Ind\xEDt\xE1s",pause:"Sz\xFCnet",resume:"Folytat\xE1s",stopreset:"Le\xE1ll\xEDt\xE1s"},alert:{DISH_ALARM_SALT_MISSING:"A s\xF3tart\xE1lyt fel kell t\xF6lteni",DISH_ALARM_RINSE_AID_LOW:"Az \xF6bl\xEDt\u0151szer-adagol\xF3 ki\xFCr\xFClt",DISH_ALARM_I10:"i10 \u2013 a k\xE9sz\xFCl\xE9k nem t\xF6lt be vizet. Ellen\u0151rizze a v\xEDzcsapot \xE9s a sz\u0171r\u0151t.",DISH_ALARM_I11:"i11 \u2013 a k\xE9sz\xFCl\xE9k nem t\xF6lt be vizet. Ellen\u0151rizze a v\xEDzcsapot \xE9s a sz\u0171r\u0151t.",DISH_ALARM_I20:"i20 \u2013 a k\xE9sz\xFCl\xE9k nem ereszti le a vizet. Ellen\u0151rizze a szifont \xE9s a sz\u0171r\u0151ket.",DISH_ALARM_I30:"i30 \u2013 a t\xFAlcsordul\xE1sg\xE1tl\xF3 bekapcsolt. Z\xE1rja el a v\xEDzcsapot!",DISH_ALARM_IF1:"iF1 \u2013 t\xFAl magas a v\xEDzszint a k\xE9sz\xFCl\xE9kben."},alert_generic:"Riaszt\xE1s",ui:{remaining:"H\xE1tral\xE9v\u0151 id\u0151",ready_at:"Elk\xE9sz\xFCl",starts_at:"Indul",start_in:"Ind\xEDt\xE1s eddig",door:"Ajt\xF3",door_open:"Az ajt\xF3 nyitva",door_closed:"Ajt\xF3 z\xE1rva",program:"Program",options:"Kieg\xE9sz\xEDt\u0151 funkci\xF3k",no_options:"Ehhez a programhoz nincs v\xE1laszthat\xF3 funkci\xF3.",delay:"K\xE9sleltetett ind\xEDt\xE1s",delay_off:"Nincs",delay_cancel:"T\xF6rl\xE9s",scores:"Hat\xE9konys\xE1g",eco_score:"Eco",energy_score:"Energia",water_score:"V\xEDz",consumption:"V\xE1rhat\xF3 fogyaszt\xE1s",water:"V\xEDz",energy:"Energia",duration:"Id\u0151tartam",details:"R\xE9szletek",remote:"T\xE1vvez\xE9rl\xE9s",remote_on:"Enged\xE9lyezve",remote_off:"Tiltva",remote_locked:"Ideiglenesen z\xE1rolva",cycles:"Lefutott ciklusok",wifi:"Wi-Fi jel",eco_mode:"Eco m\xF3d",rinse_aid:"\xD6bl\xEDt\u0151szer szintje",water_hardness:"V\xEDzkem\xE9nys\xE9g",offline:"Nincs kapcsolat a k\xE9sz\xFCl\xE9kkel",unavailable:"A k\xE9sz\xFCl\xE9k entit\xE1sai nem \xE9rhet\u0151k el",not_configured:"Nem tal\xE1lhat\xF3 Electrolux mosogat\xF3g\xE9p. Add meg a device vagy a prefix be\xE1ll\xEDt\xE1st a k\xE1rtya konfigur\xE1ci\xF3j\xE1ban.",remote_disabled_hint:"A vez\xE9rl\xE9shez enged\xE9lyezd a t\xE1vind\xEDt\xE1st a k\xE9sz\xFCl\xE9ken.",minute_short:"p",hour_short:"\xF3",finished:"A mosogat\xE1s elk\xE9sz\xFClt",finished_hint:"Kipakolhat\xF3",more:"T\xF6bb",less:"Kevesebb",just_now:"kevesebb mint egy perc"},editor:{device:"K\xE9sz\xFCl\xE9k",device_auto:"Automatikus felismer\xE9s",name:"N\xE9v",language:"Nyelv",language_auto:"Automatikus (HA nyelve)",sections:"Megjelen\xEDtett r\xE9szek",show_programs:"Programv\xE1laszt\xF3",show_options:"Kieg\xE9sz\xEDt\u0151 funkci\xF3k",show_delay:"K\xE9sleltetett ind\xEDt\xE1s",show_scores:"Hat\xE9konys\xE1gi pontok",show_consumption:"Fogyaszt\xE1si adatok",show_details:"R\xE9szletek",show_controls:"Vez\xE9rl\u0151gombok",compact:"Kompakt n\xE9zet",animate:"Anim\xE1ci\xF3k"}},l5={card_name:"Dishwasher",state:{OFF:"Off",IDLE:"Idle",READY_TO_START:"Ready to start",DELAYED_START:"Delayed start",RUNNING:"Running",PAUSED:"Paused",END_OF_CYCLE:"Finished",ALARM:"Fault",UNKNOWN:"Unknown"},phase:{PREWASH:"Prewash",MAINWASH:"Main wash",RINSE:"Rinse",DRYING:"Drying",UNAVAILABLE:"\u2013"},phase_long:{PREWASH:"Prewash",MAINWASH:"Main wash",COLDRINSE:"Cold rinse",HOTRINSE:"Hot rinse",EXTRARINSE:"Extra rinse",DRYING:"Drying",ADO_DRYING:"AirDry drying",UNAVAILABLE:"No active phase"},program:{ECO:"Eco",AUTO:"Auto",QUICK30:"Quick 30",QUICK60:"1h00m",NORMAL90:"1h30m","120_MIN":"2h00m",RINSE:"Rinse & Hold",MACHINE_CARE:"MachineCare"},program_hint:{ECO:"Normally soiled load, most efficient water and energy use.",AUTO:"Any soil level, the machine senses load and soiling.",QUICK30:"Freshly soiled load, no drying phase.",QUICK60:"Fresh, lightly dried-on soiling.",NORMAL90:"Normal, lightly dried-on soiling, pots included.","120_MIN":"Normal, dried-on soiling, pots and pans.",RINSE:"Refreshes dishes waiting for a full cycle. No detergent!",MACHINE_CARE:"Cleans the inside of the machine from limescale and grease."},option:{xtra_dry:"ExtraDry",extra_power:"ExtraPower",extra_silent:"ExtraSilent",glass_care:"GlassCare",sanitize:"Sanitize",spray_zone:"SprayZone",zone_clean:"ZoneClean",one_rack:"One rack",auto_door_opener:"AutoOpen door"},option_hint:{xtra_dry:"Stronger drying at the end of the program.",extra_power:"More powerful wash for stubborn soiling.",extra_silent:"Quieter operation, longer program.",glass_care:"Protects glassware, max. 45 \xB0C.",sanitize:"Extra sanitising rinse.",spray_zone:"Focused spray in the lower basket.",zone_clean:"Intensive lower basket, gentle upper basket.",one_rack:"Washes a single basket only.",auto_door_opener:"Opens the door automatically at the end of the cycle."},command:{on:"Turn on",off:"Turn off",start:"Start",pause:"Pause",resume:"Resume",stopreset:"Stop"},alert:{DISH_ALARM_SALT_MISSING:"Salt container needs refilling",DISH_ALARM_RINSE_AID_LOW:"Rinse aid dispenser is empty",DISH_ALARM_I10:"i10 \u2013 the appliance does not fill with water. Check the tap and the filter.",DISH_ALARM_I11:"i11 \u2013 the appliance does not fill with water. Check the tap and the filter.",DISH_ALARM_I20:"i20 \u2013 the appliance does not drain. Check the siphon and the filters.",DISH_ALARM_I30:"i30 \u2013 anti-flood device triggered. Close the water tap!",DISH_ALARM_IF1:"iF1 \u2013 water level inside the appliance is too high."},alert_generic:"Alert",ui:{remaining:"Remaining",ready_at:"Ready at",starts_at:"Starts at",start_in:"Start in",door:"Door",door_open:"Door is open",door_closed:"Door closed",program:"Program",options:"Options",no_options:"This program has no selectable options.",delay:"Delayed start",delay_off:"None",delay_cancel:"Cancel",scores:"Efficiency",eco_score:"Eco",energy_score:"Energy",water_score:"Water",consumption:"Estimated use",water:"Water",energy:"Energy",duration:"Duration",details:"Details",remote:"Remote control",remote_on:"Enabled",remote_off:"Disabled",remote_locked:"Temporarily locked",cycles:"Total cycles",wifi:"Wi-Fi signal",eco_mode:"Eco mode",rinse_aid:"Rinse aid level",water_hardness:"Water hardness",offline:"The appliance is offline",unavailable:"The appliance entities are unavailable",not_configured:"No Electrolux dishwasher found. Set the device or prefix option in the card configuration.",remote_disabled_hint:"Enable remote start on the appliance to control it.",minute_short:"m",hour_short:"h",finished:"The cycle has finished",finished_hint:"Ready to unload",more:"More",less:"Less",just_now:"less than a minute"},editor:{device:"Device",device_auto:"Auto detect",name:"Name",language:"Language",language_auto:"Automatic (HA language)",sections:"Visible sections",show_programs:"Program picker",show_options:"Options",show_delay:"Delayed start",show_scores:"Efficiency scores",show_consumption:"Consumption figures",show_details:"Details",show_controls:"Control buttons",compact:"Compact layout",animate:"Animations"}},P1={hu:n5,en:l5},v1=Object.keys(P1);function C1(M,C){return X(M,C,v1)}function H1(M){return J(P1,M)}function l(M){return M==null?"":String(M).toUpperCase().replace(/[\s\-.]+/g,"_").replace(/_+/g,"_")}function s(M){return!M||M.state==="unavailable"||M.state==="unknown"}function x5(M){if(!M.length)return null;let C=M[0];for(let H of M.slice(1)){let V=0;for(;V<C.length&&V<H.length&&C[V]===H[V];)V+=1;C=C.slice(0,V)}return C.replace(/_+$/,"")||null}function V1(M,C,H){if(C?.prefix)return C.prefix;let V=new RegExp(`^${H.domain}\\..+_${H.suffix}$`),L=A=>A.replace(new RegExp(`^${H.domain}\\.`),"").replace(new RegExp(`_${H.suffix}$`),"");if(C?.device&&M?.entities){let A=Object.values(M.entities).find(p=>p.device_id===C.device&&V.test(p.entity_id));if(A)return L(A.entity_id);let i=Object.values(M.entities).filter(p=>p.device_id===C.device).map(p=>p.entity_id.split(".")[1]);if(i.length)return x5(i)}let r=C?.entities?.[H.key];if(r)return L(r);let e=Object.keys(M?.states||{}).filter(A=>V.test(A));return e.length===1?L(e[0]):null}function L1(M,C,H,V){let L=C?.entities||{},r={};for(let e of new Set([...Object.keys(H),...Object.keys(L)])){let A=L[e];if(A){r[e]=A;continue}let i=H[e];if(!i||!V)continue;let p=`${i[0]}.${V}_${i[1]}`;M?.states?.[p]&&(r[e]=p)}return r}function M1(M,C){if(!M?.entities||!M?.devices)return[];let H=new RegExp(`^${C.domain}\\..+_${C.suffix}$`),V=new Map;for(let L of Object.values(M.entities)){if(!L.device_id||!H.test(L.entity_id))continue;let r=M.devices[L.device_id];r&&V.set(L.device_id,r.name_by_user||r.name||L.device_id)}return[...V.entries()].map(([L,r])=>({id:L,name:r}))}var R1={domain:"sensor",suffix:"appliance_state",key:"appliance_state"},v5={appliance_state:["sensor","appliance_state"],cycle_phase:["sensor","cycle_phase"],time_to_end:["sensor","time_to_end"],alerts:["sensor","alerts"],eco_score:["sensor","eco_score"],energy_score:["sensor","energy_score"],water_score:["sensor","water_score"],total_cycle_counter:["sensor","total_cycle_counter"],remote_control:["sensor","remote_control"],link_quality:["sensor","network_interface_link_quality_indicator"],door_state:["binary_sensor","door_state"],connectivity:["binary_sensor","connectivity_state"],eco_mode:["binary_sensor","miscellaneous_state_eco_mode"],program:["select","program_uid"],water_hardness:["select","water_hardness"],start_time:["number","start_time"],rinse_aid_level:["number","rinse_aid_level"],cmd_on:["button","execute_command_on"],cmd_off:["button","execute_command_off"],cmd_start:["button","execute_command_start"],cmd_pause:["button","execute_command_pause"],cmd_resume:["button","execute_command_resume"],cmd_stopreset:["button","execute_command_stopreset"]},s5=["xtra_dry_option","extra_power_option","extra_silent_option","glass_care_option","sanitize_option","spray_zone_option","zone_clean_option","one_rack_option","auto_door_opener"];function Z5(M,C){return V1(M,C,R1)}function _1(M,C){let H=Z5(M,C),V=L1(M,C,v5,H);if(V.options={},H)for(let L of s5){let r=`switch.${H}_${L}`;M?.states?.[r]&&(V.options[L]=r)}return V.prefix=H,V}function r1(M){return M1(M,R1)}var F1="aeg-dishwasher-card:progress";function B(M){if(s(M))return null;let C=Number(M.state);return Number.isFinite(C)?C:null}function u5(M){let C=B(M);if(C===null||C<0)return null;let H=(M.attributes?.unit_of_measurement||"").toLowerCase();return H==="s"||H==="sec"||H==="seconds"?Math.round(C/60):H==="h"?Math.round(C*60):H?Math.round(C):C>1e3?Math.round(C/60):Math.round(C)}function S5(M){if(s(M))return[];let C=M.attributes?.alerts??M.attributes?.alert_list??M.state,H=[];return Array.isArray(C)?H=C.map(V=>typeof V=="string"?V:V?.code):typeof C=="string"&&(H=C.split(/[,;]/)),H.map(V=>l(V)).filter(V=>V&&!["NONE","OFF","OK","0","UNKNOWN","UNAVAILABLE"].includes(V))}function c5(){try{return JSON.parse(window.localStorage.getItem(F1)||"{}")}catch{return{}}}function E1(M){try{window.localStorage.setItem(F1,JSON.stringify(M))}catch{}}function h5(M,C,H,V){let L=H===a.RUNNING||H===a.PAUSED,r=c5(),e=r[M];if(!L)return e&&H!==a.DELAYED_START&&(delete r[M],E1(r)),{progress:H===a.END_OF_CYCLE?1:0,total:null};if(V===null)return{progress:0,total:null};let A=x[C]?.duration||0,i=e&&e.program===C,p=Math.max(V,A,i?e.total:0);return(!i||p!==e.total)&&(r[M]={program:C,total:p},E1(r)),{progress:p?Math.min(1,Math.max(0,1-V/p)):0,total:p}}function D1(M,C){let H=_1(M,C),V=v=>H[v]?M.states[H[v]]:void 0,L=V("appliance_state");if(!H.prefix||!L)return{ok:!1,reason:H.prefix?"unavailable":"not_configured",entities:H};let r=l(L.state)in a?l(L.state):a.UNKNOWN,e=V("program"),A=l(e?.state),i=x[A]?A:null,p=l(V("cycle_phase")?.state)||"UNAVAILABLE",m=y1[p]||null,n=u5(V("time_to_end")),{progress:O}=h5(H.prefix,i,r,n),Z=B(V("start_time")),u=Z!==null&&Z>0?Z:0,S=V("door_state"),D=S?S.state==="on":null,K=V("connectivity"),Y=K?K.state==="on":!0,y=l(V("remote_control")?.state),N=y===""||y.includes("ENABLED"),_=x[i]?.duration||0,w=n!==null&&n>0?n:null,f=null;r===a.RUNNING||r===a.PAUSED?f=n:r===a.DELAYED_START?f=w!==null&&w>u?w:_?u+_:null:(r===a.IDLE||r===a.READY_TO_START)&&(f=w!==null?w:_||null);let I=f!==null?new Date(Date.now()+f*6e4):null,j=r===a.DELAYED_START&&u?new Date(Date.now()+u*6e4):null,q=w1.map(v=>{let m1=H.options?.[v.entity],f1=m1?M.states[m1]:void 0;return{...v,entityId:m1,on:f1?.state==="on",exists:!!f1,supported:!v.programs||!i||v.programs.includes(i)}}).filter(v=>v.exists),b=(e?.attributes?.options||[]).map(v=>({label:v,key:l(v)}));return{ok:!0,entities:H,state:r,accent:k1[r]||"idle",phase:p,step:m,program:i,programRaw:e?.state||null,programOptions:b,remaining:n,minutesToFinish:f,progress:O,finishAt:I,startAt:j,delay:u,delayEntity:H.start_time,doorOpen:D,online:Y,remote:y,remoteEnabled:N,alerts:S5(V("alerts")),scores:{eco:B(V("eco_score")),energy:B(V("energy_score")),water:B(V("water_score"))},cycles:B(V("total_cycle_counter")),linkQuality:l(V("link_quality")?.state),ecoMode:V("eco_mode")?.state==="on",rinseAid:B(V("rinse_aid_level")),waterHardness:V("water_hardness")?.state||null,options:q,name:C.name||L.attributes?.friendly_name?.replace(/\s*Appliance state$/i,"")||null}}function N1(M,C,H,V,L){return[`M${M+L},${C}`,`H${M+H-L}`,`A${L},${L} 0 0 1 ${M+H},${C+L}`,`V${C+V-L}`,`A${L},${L} 0 0 1 ${M+H-L},${C+V}`,`H${M+L}`,`A${L},${L} 0 0 1 ${M},${C+V-L}`,`V${C+L}`,`A${L},${L} 0 0 1 ${M+L},${C}`,"Z"].join(" ")}var O5=`${N1(8,6,164,202,18)} ${N1(26,52,128,136,12)}`;function I1(){return`
  <svg class="machine" viewBox="0 0 180 214" role="img" aria-hidden="true">
    <defs>
      <linearGradient id="dw-body" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="var(--dw-body-1)"/>
        <stop offset="100%" stop-color="var(--dw-body-2)"/>
      </linearGradient>
      <linearGradient id="dw-tub" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="var(--dw-tub-1)"/>
        <stop offset="100%" stop-color="var(--dw-tub-2)"/>
      </linearGradient>
      <linearGradient id="dw-glass" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#ffffff" stop-opacity=".22"/>
        <stop offset="45%" stop-color="#ffffff" stop-opacity=".04"/>
        <stop offset="100%" stop-color="#000000" stop-opacity=".12"/>
      </linearGradient>
      <clipPath id="dw-tub-clip">
        <rect x="26" y="52" width="128" height="136" rx="12"/>
      </clipPath>
    </defs>

    <rect class="cabinet" x="8" y="6" width="164" height="202" rx="18"/>
    <ellipse class="door-shadow" cx="90" cy="206" rx="78" ry="7"/>

    <!-- interior: stays put while the door swings open -->
    <g class="cavity">
      <rect class="tub-body" x="26" y="52" width="128" height="136" rx="12"/>
      <g clip-path="url(#dw-tub-clip)">
        <rect class="cavity-glow" x="26" y="52" width="128" height="136"/>
        <rect class="cavity-light" x="26" y="52" width="128" height="136"/>

        <g class="rack rack-top">
          <line x1="34" y1="94" x2="146" y2="94"/>
          <g class="plates">
            <rect x="44" y="70" width="7" height="24" rx="3.5"/>
            <rect x="56" y="66" width="7" height="28" rx="3.5"/>
            <rect x="68" y="68" width="7" height="26" rx="3.5"/>
            <rect x="80" y="64" width="7" height="30" rx="3.5"/>
            <rect x="92" y="68" width="7" height="26" rx="3.5"/>
            <rect x="104" y="66" width="7" height="28" rx="3.5"/>
            <rect x="116" y="70" width="7" height="24" rx="3.5"/>
          </g>
          <g class="glasses">
            <path d="M129 74h13v12a6.5 6.5 0 0 1-13 0z"/>
          </g>
        </g>

        <g class="rack rack-bottom">
          <line x1="34" y1="150" x2="146" y2="150"/>
          <g class="plates">
            <rect x="40" y="120" width="8" height="30" rx="4"/>
            <rect x="53" y="116" width="8" height="34" rx="4"/>
            <rect x="66" y="118" width="8" height="32" rx="4"/>
            <rect x="79" y="114" width="8" height="36" rx="4"/>
            <rect x="92" y="118" width="8" height="32" rx="4"/>
            <rect x="105" y="116" width="8" height="34" rx="4"/>
            <rect x="118" y="120" width="8" height="30" rx="4"/>
            <rect x="131" y="122" width="8" height="28" rx="4"/>
          </g>
        </g>

        <g class="spray">
          <g class="water">
            <path d="M70 166c6-16 12-26 20-34"/>
            <path d="M110 166c-6-16-12-26-20-34"/>
            <path d="M90 164V118"/>
          </g>
          <g class="droplets">
            <circle cx="62" cy="130" r="2.4"/>
            <circle cx="90" cy="108" r="2.8"/>
            <circle cx="120" cy="134" r="2.2"/>
            <circle cx="76" cy="146" r="2"/>
            <circle cx="106" cy="120" r="2.4"/>
          </g>
          <g class="spray-arm">
            <rect x="58" y="167" width="64" height="6" rx="3"/>
            <circle cx="90" cy="170" r="6"/>
            <circle class="jet" cx="66" cy="170" r="1.6"/>
            <circle class="jet" cx="78" cy="170" r="1.6"/>
            <circle class="jet" cx="102" cy="170" r="1.6"/>
            <circle class="jet" cx="114" cy="170" r="1.6"/>
          </g>
        </g>

        <g class="wash-water">
          <path class="pool" d="M20 178c10-4 18 4 28 0s18-6 28-2 18 6 28 2 18-6 28-2 18 4 28 0v18H20z"/>
          <path class="pool pool-back" d="M20 182c10-4 18 4 28 0s18-6 28-2 18 6 28 2 18-6 28-2 18 4 28 0v14H20z"/>
        </g>

        <g class="bubbles">
          <circle cx="54" cy="176" r="2.6"/>
          <circle cx="72" cy="176" r="1.8"/>
          <circle cx="96" cy="176" r="3"/>
          <circle cx="114" cy="176" r="2.2"/>
          <circle cx="132" cy="176" r="2.6"/>
          <circle cx="84" cy="176" r="2"/>
        </g>

        <g class="steam">
          <path d="M68 140c8-10-8-18 0-28"/>
          <path d="M90 134c8-10-8-18 0-28"/>
          <path d="M112 140c8-10-8-18 0-28"/>
        </g>

        <g class="sparkles">
          <path d="M62 96l2.4 5.6L70 104l-5.6 2.4L62 112l-2.4-5.6L54 104l5.6-2.4z"/>
          <path d="M118 126l2 4.8 4.8 2-4.8 2-2 4.8-2-4.8-4.8-2 4.8-2z"/>
          <path d="M92 84l1.6 3.8 3.8 1.6-3.8 1.6L92 95l-1.6-4-3.8-1.6 3.8-1.6z"/>
        </g>
      </g>
    </g>

    <!-- door: frame with a window cut-out, control strip and handle -->
    <g class="door">
      <rect class="glass" x="26" y="52" width="128" height="136" rx="12"/>
      <path class="door-panel" d="${O5}" fill-rule="evenodd"/>
      <rect class="panel-strip" x="18" y="14" width="144" height="28" rx="10"/>
      <circle class="led-ring" cx="32" cy="28" r="7"/>
      <circle class="led" cx="32" cy="28" r="4"/>
      <rect class="display" x="60" y="19" width="60" height="18" rx="6"/>
      <text class="display-text" x="90" y="32" text-anchor="middle">--:--</text>
      <rect class="handle" x="18" y="196" width="144" height="7" rx="3.5"/>
    </g>
  </svg>`}function W1(M,C){let H=M.querySelector(".display-text");H&&H.textContent!==C&&(H.textContent=C)}var z1="M19,18.31V20A2,2 0 0,1 17,22H7A2,2 0 0,1 5,20V16.3C4.54,16.12 3.95,16 3,16A1,1 0 0,1 2,15A1,1 0 0,1 3,14C3.82,14 4.47,14.08 5,14.21V12.3C4.54,12.12 3.95,12 3,12A1,1 0 0,1 2,11A1,1 0 0,1 3,10C3.82,10 4.47,10.08 5,10.21V8.3C4.54,8.12 3.95,8 3,8A1,1 0 0,1 2,7A1,1 0 0,1 3,6C3.82,6 4.47,6.08 5,6.21V4A2,2 0 0,1 7,2H17A2,2 0 0,1 19,4V6.16C20.78,6.47 21.54,7.13 21.71,7.29C22.1,7.68 22.1,8.32 21.71,8.71C21.32,9.1 20.8,9.09 20.29,8.71V8.71C20.29,8.71 19.25,8 17,8C15.74,8 14.91,8.41 13.95,8.9C12.91,9.41 11.74,10 10,10C9.64,10 9.31,10 9,9.96V7.95C9.3,8 9.63,8 10,8C11.26,8 12.09,7.59 13.05,7.11C14.09,6.59 15.27,6 17,6V4H7V20H17V18C18.5,18 18.97,18.29 19,18.31M17,10C15.27,10 14.09,10.59 13.05,11.11C12.09,11.59 11.26,12 10,12C9.63,12 9.3,12 9,11.95V13.96C9.31,14 9.64,14 10,14C11.74,14 12.91,13.41 13.95,12.9C14.91,12.42 15.74,12 17,12C19.25,12 20.29,12.71 20.29,12.71V12.71C20.8,13.1 21.32,13.1 21.71,12.71C22.1,12.32 22.1,11.69 21.71,11.29C21.5,11.08 20.25,10 17,10M17,14C15.27,14 14.09,14.59 13.05,15.11C12.09,15.59 11.26,16 10,16C9.63,16 9.3,16 9,15.95V17.96C9.31,18 9.64,18 10,18C11.74,18 12.91,17.41 13.95,16.9C14.91,16.42 15.74,16 17,16C19.25,16 20.29,16.71 20.29,16.71V16.71C20.8,17.1 21.32,17.1 21.71,16.71C22.1,16.32 22.1,15.69 21.71,15.29C21.5,15.08 20.25,14 17,14Z";var U1="M13,13H11V7H13M13,17H11V15H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z";var $1="M12,2L1,21H23M12,6L19.53,19H4.47M11,10V14H13V10M11,16V18H13V16";var G1="M13,9V15H16L12,19L8,15H11V9H8L12,5L16,9H13M4,2H20V4H4V2M4,20H20V22H4V20Z";var Q1="M12,6V9L16,5L12,1V4A8,8 0 0,0 4,12C4,13.57 4.46,15.03 5.24,16.26L6.7,14.8C6.25,13.97 6,13 6,12A6,6 0 0,1 12,6M18.76,7.74L17.3,9.2C17.74,10.04 18,11 18,12A6,6 0 0,1 12,18V15L8,19L12,23V20A8,8 0 0,0 20,12C20,10.43 19.54,8.97 18.76,7.74Z";var K1="M19.36,2.72L20.78,4.14L15.06,9.85C16.13,11.39 16.28,13.24 15.38,14.44L9.06,8.12C10.26,7.22 12.11,7.37 13.65,8.44L19.36,2.72M5.93,17.57C3.92,15.56 2.69,13.16 2.35,10.92L7.23,8.83L14.67,16.27L12.58,21.15C10.34,20.81 7.94,19.58 5.93,17.57Z";var Y1="M16,10L15.8,11H13.5A0.5,0.5 0 0,0 13,11.5A0.5,0.5 0 0,0 13.5,12H15.6L14.6,17H12.5A0.5,0.5 0 0,0 12,17.5A0.5,0.5 0 0,0 12.5,18H14.4L14,20A2,2 0 0,1 12,22A2,2 0 0,1 10,20L9,15H10.5A0.5,0.5 0 0,0 11,14.5A0.5,0.5 0 0,0 10.5,14H8.8L8,10C8,8.8 8.93,7.77 10.29,7.29L8.9,5.28C8.59,4.82 8.7,4.2 9.16,3.89C9.61,3.57 10.23,3.69 10.55,4.14L11,4.8V3A1,1 0 0,1 12,2A1,1 0 0,1 13,3V5.28L14.5,3.54C14.83,3.12 15.47,3.07 15.89,3.43C16.31,3.78 16.36,4.41 16,4.84L13.87,7.35C15.14,7.85 16,8.85 16,10Z";var j1="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z";var q1="M12.5,1.5C10.73,1.5 9.17,2.67 8.67,4.37C8.14,4.13 7.58,4 7,4A4,4 0 0,0 3,8C3,9.82 4.24,11.41 6,11.87V19H19V11.87C20.76,11.41 22,9.82 22,8A4,4 0 0,0 18,4C17.42,4 16.86,4.13 16.33,4.37C15.83,2.67 14.27,1.5 12.5,1.5M12,10.5H13V17.5H12V10.5M9,12.5H10V17.5H9V12.5M15,12.5H16V17.5H15V12.5M6,20V21A1,1 0 0,0 7,22H18A1,1 0 0,0 19,21V20H6Z";var X1="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z";var J1="M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z";var C2="M4,4H20A2,2 0 0,1 22,6V18A2,2 0 0,1 20,20H4A2,2 0 0,1 2,18V6A2,2 0 0,1 4,4M4,6V18H11V6H4M20,18V6H18.76C19,6.54 18.95,7.07 18.95,7.13C18.88,7.8 18.41,8.5 18.24,8.75L15.91,11.3L19.23,11.28L19.24,12.5L14.04,12.47L14,11.47C14,11.47 17.05,8.24 17.2,7.95C17.34,7.67 17.91,6 16.5,6C15.27,6.05 15.41,7.3 15.41,7.3L13.87,7.31C13.87,7.31 13.88,6.65 14.25,6H13V18H15.58L15.57,17.14L16.54,17.13C16.54,17.13 17.45,16.97 17.46,16.08C17.5,15.08 16.65,15.08 16.5,15.08C16.37,15.08 15.43,15.13 15.43,15.95H13.91C13.91,15.95 13.95,13.89 16.5,13.89C19.1,13.89 18.96,15.91 18.96,15.91C18.96,15.91 19,17.16 17.85,17.63L18.37,18H20M8.92,16H7.42V10.2L5.62,10.76V9.53L8.76,8.41H8.92V16Z";var H2="M18.32,8H5.67L5.23,4H18.77M12,19A3,3 0 0,1 9,16C9,14 12,10.6 12,10.6C12,10.6 15,14 15,16A3,3 0 0,1 12,19M3,2L5,20.23C5.13,21.23 5.97,22 7,22H17C18,22 18.87,21.23 19,20.23L21,2H3Z";var V2="M12,1.5A2.5,2.5 0 0,1 14.5,4A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 9.5,4A2.5,2.5 0 0,1 12,1.5M15.87,5C18,5 20,7 20,9C22.7,9 22.7,13 20,13H4C1.3,13 1.3,9 4,9C4,7 6,5 8.13,5C8.57,6.73 10.14,8 12,8C13.86,8 15.43,6.73 15.87,5M5,15H8L9,22H7L5,15M10,15H14L13,22H11L10,15M16,15H19L17,22H15L16,15Z";var L2="M18,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V4A2,2 0 0,0 18,2M10,4A1,1 0 0,1 11,5A1,1 0 0,1 10,6A1,1 0 0,1 9,5A1,1 0 0,1 10,4M7,4A1,1 0 0,1 8,5A1,1 0 0,1 7,6A1,1 0 0,1 6,5A1,1 0 0,1 7,4M18,20H6V8H18V20M14.67,15.33C14.69,16.03 14.41,16.71 13.91,17.21C12.86,18.26 11.15,18.27 10.09,17.21C9.59,16.71 9.31,16.03 9.33,15.33C9.4,14.62 9.63,13.94 10,13.33C10.37,12.5 10.81,11.73 11.33,11L12,10C13.79,12.59 14.67,14.36 14.67,15.33";var M2="M16,11H18V13H16V11M12,3H19C20.11,3 21,3.89 21,5V19H22V21H2V19H10V5C10,3.89 10.89,3 12,3M12,5V19H19V5H12Z";var r2="M12,3C10.89,3 10,3.89 10,5H3V19H2V21H22V19H21V5C21,3.89 20.11,3 19,3H12M12,5H19V19H12V5M5,11H7V13H5V11Z";var e2="M16,12A2,2 0 0,1 18,10A2,2 0 0,1 20,12A2,2 0 0,1 18,14A2,2 0 0,1 16,12M10,12A2,2 0 0,1 12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12M4,12A2,2 0 0,1 6,10A2,2 0 0,1 8,12A2,2 0 0,1 6,14A2,2 0 0,1 4,12Z";var t2="M12,11A1,1 0 0,0 11,12A1,1 0 0,0 12,13A1,1 0 0,0 13,12A1,1 0 0,0 12,11M12.5,2C17,2 17.11,5.57 14.75,6.75C13.76,7.24 13.32,8.29 13.13,9.22C13.61,9.42 14.03,9.73 14.35,10.13C18.05,8.13 22.03,8.92 22.03,12.5C22.03,17 18.46,17.1 17.28,14.73C16.78,13.74 15.72,13.3 14.79,13.11C14.59,13.59 14.28,14 13.88,14.34C15.87,18.03 15.08,22 11.5,22C7,22 6.91,18.42 9.27,17.24C10.25,16.75 10.69,15.71 10.89,14.79C10.4,14.59 9.97,14.27 9.65,13.87C5.96,15.85 2,15.07 2,11.5C2,7 5.56,6.89 6.74,9.26C7.24,10.25 8.29,10.68 9.22,10.87C9.41,10.39 9.73,9.97 10.14,9.65C8.15,5.96 8.94,2 12.5,2Z";var i2="M17.66 11.2C17.43 10.9 17.15 10.64 16.89 10.38C16.22 9.78 15.46 9.35 14.82 8.72C13.33 7.26 13 4.85 13.95 3C13 3.23 12.17 3.75 11.46 4.32C8.87 6.4 7.85 10.07 9.07 13.22C9.11 13.32 9.15 13.42 9.15 13.55C9.15 13.77 9 13.97 8.8 14.05C8.57 14.15 8.33 14.09 8.14 13.93C8.08 13.88 8.04 13.83 8 13.76C6.87 12.33 6.69 10.28 7.45 8.64C5.78 10 4.87 12.3 5 14.47C5.06 14.97 5.12 15.47 5.29 15.97C5.43 16.57 5.7 17.17 6 17.7C7.08 19.43 8.95 20.67 10.96 20.92C13.1 21.19 15.39 20.8 17.03 19.32C18.86 17.66 19.5 15 18.56 12.72L18.43 12.46C18.22 12 17.66 11.2 17.66 11.2M14.5 17.5C14.22 17.74 13.76 18 13.4 18.1C12.28 18.5 11.16 17.94 10.5 17.28C11.69 17 12.4 16.12 12.61 15.23C12.78 14.43 12.46 13.77 12.33 13C12.21 12.26 12.23 11.63 12.5 10.94C12.69 11.32 12.89 11.7 13.13 12C13.9 13 15.11 13.44 15.37 14.8C15.41 14.94 15.43 15.08 15.43 15.23C15.46 16.05 15.1 16.95 14.5 17.5H14.5Z";var a2="M12,20L12.76,17C9.5,16.79 6.59,15.4 5.75,13.58C5.66,14.06 5.53,14.5 5.33,14.83C4.67,16 3.33,16 2,16C3.1,16 3.5,14.43 3.5,12.5C3.5,10.57 3.1,9 2,9C3.33,9 4.67,9 5.33,10.17C5.53,10.5 5.66,10.94 5.75,11.42C6.4,10 8.32,8.85 10.66,8.32L9,5C11,5 13,5 14.33,5.67C15.46,6.23 16.11,7.27 16.69,8.38C19.61,9.08 22,10.66 22,12.5C22,14.38 19.5,16 16.5,16.66C15.67,17.76 14.86,18.78 14.17,19.33C13.33,20 12.67,20 12,20M17,11A1,1 0 0,0 16,12A1,1 0 0,0 17,13A1,1 0 0,0 18,12A1,1 0 0,0 17,11Z";var o2="M7,2V13H10V22L17,10H13L17,2H7Z";var A2="M15 21H17V19H15M19 9H21V7H19M3 5V19C3 20.1 3.9 21 5 21H9V19H5V5H9V3H5C3.9 3 3 3.9 3 5M19 3V5H21C21 3.9 20.1 3 19 3M11 23H13V1H11M19 17H21V15H19M15 5H17V3H15M19 13H21V11H19M19 21C20.1 21 21 20.1 21 19H19Z";var p2="M20.16 12.73C22.93 9.96 22.57 5.26 19.09 3C17.08 1.67 14.39 1.66 12.36 2.97C10.6 4.1 9.63 5.86 9.46 7.68C9.33 9 8.83 10.23 7.91 11.15L7.88 11.18C6.72 12.34 6.72 14.11 7.81 15.19L8.8 16.18C9.89 17.27 11.66 17.27 12.75 16.18C13.72 15.21 15 14.68 16.39 14.53C17.76 14.38 19.1 13.78 20.16 12.73M6.26 19.86C6.53 20.42 6.44 21.1 5.97 21.56C5.39 22.15 4.44 22.15 3.85 21.56C3.58 21.29 3.44 20.94 3.42 20.58C3.06 20.56 2.71 20.42 2.44 20.15C1.85 19.56 1.85 18.61 2.44 18.03C2.9 17.57 3.59 17.47 4.14 17.74L6.62 15.31C6.76 15.5 6.92 15.72 7.1 15.9L8.09 16.89C8.3 17.09 8.5 17.26 8.76 17.41L6.26 19.86Z";var d2="M11.9 2C8 2 4.9 5.4 5 9.3C5.1 11.9 6.6 14.1 8.7 15.2C10.1 15.9 11 17.3 11 18.8V19C11 20.7 12.3 22 14 22C18 22 19 17 19 9C19 9 19 2 11.9 2M14 20C13.4 20 13 19.6 13 19V18.8C13 16.6 11.7 14.5 9.7 13.4C8.1 12.6 7.1 11 7 9.2C7 7.9 7.5 6.5 8.4 5.5C9.3 4.5 10.6 4 11.8 4C16.7 4 17 8.2 17 9C17 18.9 15.3 20 14 20M15.8 7.6L8.3 10.3C8.1 10 8 9.6 8 9.1C8 8.4 8.2 7.8 8.5 7.1L13.7 5.2C14.9 5.8 15.5 6.7 15.8 7.6M12.9 15.1L15.7 14.1C15.6 15.6 15.3 16.7 15.1 17.4L13.8 17.9C13.8 16.9 13.5 16 12.9 15.1M16 9.2C16 10.4 16 11.5 15.9 12.4L11.9 13.9C11.4 13.4 10.8 12.9 10.1 12.6C9.7 12.4 9.3 12.1 9 11.8L16 9.2Z";var m2="M22,18A4,4 0 0,1 18,22H15A4,4 0 0,1 11,18V16H17.79L20.55,11.23L22.11,12.13L19.87,16H22V18M9,22H2C2,19 2,16 2.33,12.83C2.6,10.3 3.08,7.66 3.6,5H3V3H4L7,3H8V5H7.4C7.92,7.66 8.4,10.3 8.67,12.83C9,16 9,19 9,22Z";var n2="M18 11V6H15V4H12V2H8V5H6V11H5L7 22H17L19 11H18M15.86 11C15.7 11.61 15.4 12.16 15 12.62V8.62L17 9.62V11H15.86M17 7V8.5L15 7.5V7H17M12 5H14V8.5L12 9.5V5M12 10.62L14 9.62V13.45C13.41 13.8 12.73 14 12 14V10.62M11 13.86C10.21 13.65 9.5 13.22 9 12.62V9.62L11 8.62V13.86M9 3H11V7.5L10 8V5H9V3M7 6H9V8.5L8 9V11H7V6Z";var l2="M15.5,21.27L14.66,21.18C13.9,21.11 13.25,20.6 13,19.87C12.47,17.91 12.47,15.83 13,13.87C15.32,13.4 17,11.37 17,9C17,7 15,2 15,2H9C9,2 7,7 7,9C7,11.38 8.67,13.42 11,13.9C11.53,15.86 11.53,17.94 11,19.9C10.76,20.62 10.12,21.13 9.37,21.21L8.5,21.3C8.5,21.3 8,21.28 8,22H16C16,21.28 15.5,21.27 15.5,21.27M9.44,7L10.44,4H13.56L14.56,7H9.44Z";var x2="M8.06,2C7.88,3.17 8.17,4.16 8.95,4.97C9.45,5.47 9.61,6.14 9.42,7H10.41C10.53,6.45 10.55,6 10.45,5.55C10.36,5.13 10.05,4.63 9.5,4.03C9.05,3.47 8.89,2.8 9.05,2H8.06M10.55,2C10.36,3.17 10.66,4.16 11.44,4.97C11.94,5.47 12.09,6.14 11.91,7H12.89C13,6.45 13.03,6 12.94,5.55C12.84,5.13 12.53,4.63 12,4.03C11.53,3.47 11.38,2.8 11.53,2H10.55M13.08,2C12.89,3.17 13.19,4.16 13.97,4.97C14.47,5.47 14.61,6.14 14.39,7H15.42C15.55,6.45 15.56,6 15.47,5.55C15.38,5.13 15.06,4.63 14.53,4.03C14.06,3.47 13.91,2.8 14.06,2H13.08M5,8C5,9.42 5.39,10.7 6.14,11.84C6.87,12.96 7.91,13.85 9.14,14.39L5.16,20.44C5.06,20.56 5,20.75 5,21C5,21.41 5.16,21.69 5.44,21.84C5.56,21.94 5.75,22 6,22C6.41,22 6.69,21.84 6.84,21.56L7.83,19.97H14.2C14.41,20.55 14.79,21.05 15.28,21.42C15.78,21.8 16.36,22 17,22C17.83,22 18.53,21.69 19.13,21.09C19.72,20.5 20,19.8 20,19C20,18.17 19.72,17.47 19.13,16.88C18.53,16.28 17.83,16 17,16C16.36,16 15.78,16.17 15.28,16.55C14.78,16.92 14.42,17.41 14.2,18H9.14L11.11,14.95C11.27,15 11.56,15 12,15C12.44,15 12.73,15 12.89,14.95L13.88,16.5C14.29,15.96 14.84,15.54 15.47,15.28L14.91,14.39C16.03,13.89 17,13 17.79,11.77C18.59,10.5 19,9.27 19,8H5M17,18C17.3,18 17.53,18.09 17.72,18.28C17.91,18.47 18,18.72 18,19C18,19.27 17.91,19.5 17.72,19.71C17.54,19.91 17.28,20 17,20C16.74,20 16.5,19.91 16.29,19.71C16.09,19.5 16,19.26 16,19C16,18.7 16.09,18.47 16.29,18.28C16.5,18.09 16.73,18 17,18Z";var s1="M8.5 4.5L5.4 9.5L8.5 14.7L5.2 20.5L3.4 19.6L6.1 14.7L3 9.5L6.7 3.6L8.5 4.5M14.7 4.4L11.6 9.5L14.7 14.5L11.4 20.3L9.6 19.4L12.3 14.5L9.2 9.5L12.9 3.5L14.7 4.4M21 4.4L17.9 9.5L21 14.5L17.7 20.3L15.9 19.4L18.6 14.5L15.5 9.5L19.2 3.5L21 4.4";var v2="M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11V17Z";var s2="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z";var Z2="M11 15H6L13 1V9H18L11 23V15Z";var u2="M14,19H18V5H14M6,19H10V5H6V19Z";var S2="M8,5.14V19.14L19,12.14L8,5.14Z";var c2="M14.6 9L18 3.1L19.7 4.1L16.9 9H14.6M14 10H3V12H5V19C5 20.1 5.9 21 7 21H17C18.1 21 19 20.1 19 19V12H21V10H14Z";var h2="M19 19C19 20.11 18.11 21 17 21H7C5.9 21 5 20.11 5 19V12H3V10H21V12H19M8 1.5C6.15 1.5 4.65 3 4.65 4.85C4.65 6.7 6.15 8.2 8 8.2H9.53C9.92 8.2 10.29 8.3 10.61 8.5H12.63C12.05 7.45 10.86 6.75 9.53 6.75H8C7 6.75 6.15 5.77 6.15 4.75C6.15 3.73 7 3 8 3M12.85 2C12.85 3 12 3.85 11 3.85V5.35C12.92 5.35 14.5 6.7 14.89 8.5H16.42C16.12 6.67 14.96 5.15 13.35 4.38C13.97 3.77 14.35 2.93 14.35 2Z";var O2="M16.56,5.44L15.11,6.89C16.84,7.94 18,9.83 18,12A6,6 0 0,1 12,18A6,6 0 0,1 6,12C6,9.83 7.16,7.94 8.88,6.88L7.44,5.44C5.36,6.88 4,9.28 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12C20,9.28 18.64,6.88 16.56,5.44M13,3H11V13H13";var f2="M12,0C8.96,0 6.21,1.23 4.22,3.22L5.63,4.63C7.26,3 9.5,2 12,2C14.5,2 16.74,3 18.36,4.64L19.77,3.23C17.79,1.23 15.04,0 12,0M7.05,6.05L8.46,7.46C9.37,6.56 10.62,6 12,6C13.38,6 14.63,6.56 15.54,7.46L16.95,6.05C15.68,4.78 13.93,4 12,4C10.07,4 8.32,4.78 7.05,6.05M12,15A2,2 0 0,1 10,13A2,2 0 0,1 12,11A2,2 0 0,1 14,13A2,2 0 0,1 12,15M15,9H9A1,1 0 0,0 8,10V22A1,1 0 0,0 9,23H15A1,1 0 0,0 16,22V10A1,1 0 0,0 15,9Z";var g2="M16.88 4L16.88 4L19.03 6.1L13.5 10.5L12.5 9.5L16.87 4L16.88 4M16.88 2C16.3 2 15.73 2.24 15.33 2.72L9.8 9.65L13.34 13.19L20.28 7.67C21.18 6.91 21.25 5.54 20.41 4.7L18.3 2.59C17.9 2.19 17.39 2 16.88 2M9.1 10.36L8.39 11.07C8 11.46 8 12.09 8.39 12.5L10.5 14.6C10.71 14.8 10.96 14.89 11.22 14.89S11.73 14.8 11.93 14.6L12.63 13.9L9.1 10.36M6 15C5.45 15 5 15.45 5 16C5 16.55 5.45 17 6 17C6.55 17 7 16.55 7 16C7 15.45 6.55 15 6 15M9 16C8.45 16 8 16.45 8 17S8.45 18 9 18C9.55 18 10 17.55 10 17S9.55 16 9 16M4 18C3.45 18 3 18.45 3 19S3.45 20 4 20C4.55 20 5 19.55 5 19S4.55 18 4 18M7 19C6.45 19 6 19.45 6 20S6.45 21 7 21C7.55 21 8 20.55 8 20S7.55 19 7 19Z";var k2="M10.6 9.6L9 15L7.4 9.6L2 8L7.4 6.4L9 1L10.6 6.4L16 8L10.6 9.6M17 14.2L21 12L18.8 16L21 20L17 17.8L13 20L15.2 16L13 12L17 14.2M10 16L8.3 19L10 22L7 20.3L4 22L5.7 19L4 16L7 17.7L10 16";var y2="M8 17.85C8 19.04 7.11 20 6 20S4 19.04 4 17.85C4 16.42 6 14 6 14S8 16.42 8 17.85M16.46 12V10.56L18.46 9.43L20.79 10.05L21.31 8.12L19.54 7.65L20 5.88L18.07 5.36L17.45 7.69L15.45 8.82L13 7.38V5.12L14.71 3.41L13.29 2L12 3.29L10.71 2L9.29 3.41L11 5.12V7.38L8.5 8.82L6.5 7.69L5.92 5.36L4 5.88L4.47 7.65L2.7 8.12L3.22 10.05L5.55 9.43L7.55 10.56V12H2V13H22V12H16.46M9.5 12V10.56L12 9.11L14.5 10.56V12H9.5M20 17.85C20 19.04 19.11 20 18 20S16 19.04 16 17.85C16 16.42 18 14 18 14S20 16.42 20 17.85M14 20.85C14 22.04 13.11 23 12 23S10 22.04 10 20.85C10 19.42 12 17 12 17S14 19.42 14 20.85Z";var w2="M16.72 10.43C14.68 8.39 14.5 4.66 14.5 4H13V6H9V4H7C7 2.9 7.9 2 9 2H16V3C16 3.08 16.04 7.63 17.78 9.37L16.72 10.43M17 2V4H18V2H17M15 12C13 10 13 7 13 7H9V9C9 10 9 10 8 11S7 13 7 13V20C7 21.1 7.9 22 9 22H13C14.1 22 15 21.1 15 20V12Z";var b2="M12,15.39L8.24,17.66L9.23,13.38L5.91,10.5L10.29,10.13L12,6.09L13.71,10.13L18.09,10.5L14.77,13.38L15.76,17.66M22,9.24L14.81,8.63L12,2L9.19,8.63L2,9.24L7.45,13.97L5.82,21L12,17.27L18.18,21L16.54,13.97L22,9.24Z";var T2="M18,18H6V6H18V18Z";var B2="M15 13V5A3 3 0 0 0 9 5V13A5 5 0 1 0 15 13M12 4A1 1 0 0 1 13 5V8H11V5A1 1 0 0 1 12 4Z";var P2="M19.47 3.47L13.47 9.47L10.53 10C10.22 10.03 9.94 10.18 9.72 10.4L2.81 17.31C1.74 18.38 1.74 20.12 2.81 21.2C3.88 22.27 5.62 22.27 6.7 21.2L13.61 14.29C13.83 14.07 14 13.79 14.03 13.5L14.54 10.54L20.54 4.54L22 2L19.47 3.47M11 14.38C10.24 14.38 9.62 13.76 9.62 13S10.24 11.62 11 11.62 12.38 12.24 12.38 13C12.37 13.76 11.76 14.38 11 14.38Z";var R2="M6,2H18V8H18V8L14,12L18,16V16H18V22H6V16H6V16L10,12L6,8V8H6V2M16,16.5L12,12.5L8,16.5V20H16V16.5M12,11.5L16,7.5V4H8V7.5L12,11.5M10,6H14V6.75L12,8.75L10,6.75V6Z";var _2="M4,5A2,2 0 0,0 2,7V17A2,2 0 0,0 4,19H20A2,2 0 0,0 22,17V7A2,2 0 0,0 20,5H4M4,7H16V17H4V7M19,7A1,1 0 0,1 20,8A1,1 0 0,1 19,9A1,1 0 0,1 18,8A1,1 0 0,1 19,7M6,9V11H14V9H6M19,11A1,1 0 0,1 20,12A1,1 0 0,1 19,13A1,1 0 0,1 18,12A1,1 0 0,1 19,11Z";var E2="M2 12H4V17H20V12H22V17C22 18.11 21.11 19 20 19H4C2.9 19 2 18.11 2 17V12M12 15L17.55 9.54L16.13 8.13L13 11.25V2H11V11.25L7.88 8.13L6.46 9.55L12 15Z";var F2="M8 13C6.14 13 4.59 14.28 4.14 16H2V18H4.14C4.59 19.72 6.14 21 8 21S11.41 19.72 11.86 18H22V16H11.86C11.41 14.28 9.86 13 8 13M8 19C6.9 19 6 18.1 6 17C6 15.9 6.9 15 8 15S10 15.9 10 17C10 18.1 9.1 19 8 19M19.86 6C19.41 4.28 17.86 3 16 3S12.59 4.28 12.14 6H2V8H12.14C12.59 9.72 14.14 11 16 11S19.41 9.72 19.86 8H22V6H19.86M16 9C14.9 9 14 8.1 14 7C14 5.9 14.9 5 16 5S18 5.9 18 7C18 8.1 17.1 9 16 9Z";var D2="M12,4L9.91,6.09L12,8.18M4.27,3L3,4.27L7.73,9H3V15H7L12,20V13.27L16.25,17.53C15.58,18.04 14.83,18.46 14,18.7V20.77C15.38,20.45 16.63,19.82 17.68,18.96L19.73,21L21,19.73L12,10.73M19,12C19,12.94 18.8,13.82 18.46,14.64L19.97,16.15C20.62,14.91 21,13.5 21,12C21,7.72 18,4.14 14,3.23V5.29C16.89,6.15 19,8.83 19,12M16.5,12C16.5,10.23 15.5,8.71 14,7.97V10.18L16.45,12.63C16.5,12.43 16.5,12.21 16.5,12Z";var N2="M12,20A6,6 0 0,1 6,14C6,10 12,3.25 12,3.25C12,3.25 18,10 18,14A6,6 0 0,1 12,20Z";var Z1="M12,3.25C12,3.25 6,10 6,14C6,17.32 8.69,20 12,20A6,6 0 0,0 18,14C18,10 12,3.25 12,3.25M14.47,9.97L15.53,11.03L9.53,17.03L8.47,15.97M9.75,10A1.25,1.25 0 0,1 11,11.25A1.25,1.25 0 0,1 9.75,12.5A1.25,1.25 0 0,1 8.5,11.25A1.25,1.25 0 0,1 9.75,10M14.25,14.5A1.25,1.25 0 0,1 15.5,15.75A1.25,1.25 0 0,1 14.25,17A1.25,1.25 0 0,1 13,15.75A1.25,1.25 0 0,1 14.25,14.5Z";var I2="M12,21L15.6,16.2C14.6,15.45 13.35,15 12,15C10.65,15 9.4,15.45 8.4,16.2L12,21M12,3C7.95,3 4.21,4.34 1.2,6.6L3,9C5.5,7.12 8.62,6 12,6C15.38,6 18.5,7.12 21,9L22.8,6.6C19.79,4.34 16.05,3 12,3M12,9C9.3,9 6.81,9.89 4.8,11.4L6.6,13.8C8.1,12.67 9.97,12 12,12C14.03,12 15.9,12.67 17.4,13.8L19.2,11.4C17.19,9.89 14.7,9 12,9Z";var W2="M2.28,3L1,4.27L2.47,5.74C2.04,6 1.61,6.29 1.2,6.6L3,9C3.53,8.6 4.08,8.25 4.66,7.93L6.89,10.16C6.15,10.5 5.44,10.91 4.8,11.4L6.6,13.8C7.38,13.22 8.26,12.77 9.2,12.47L11.75,15C10.5,15.07 9.34,15.5 8.4,16.2L12,21L14.46,17.73L17.74,21L19,19.72M12,3C9.85,3 7.8,3.38 5.9,4.07L8.29,6.47C9.5,6.16 10.72,6 12,6C15.38,6 18.5,7.11 21,9L22.8,6.6C19.79,4.34 16.06,3 12,3M12,9C11.62,9 11.25,9 10.88,9.05L14.07,12.25C15.29,12.53 16.43,13.07 17.4,13.8L19.2,11.4C17.2,9.89 14.7,9 12,9Z";var z2="M22.61,19L13.53,9.91C14.46,7.57 14,4.81 12.09,2.91C9.79,0.61 6.21,0.4 3.66,2.26L7.5,6.11L6.08,7.5L2.25,3.69C0.39,6.23 0.6,9.82 2.9,12.11C4.76,13.97 7.47,14.46 9.79,13.59L18.9,22.7C19.29,23.09 19.92,23.09 20.31,22.7L22.61,20.4C23,20 23,19.39 22.61,19M19.61,20.59L10.15,11.13C9.54,11.58 8.86,11.85 8.15,11.95C6.79,12.15 5.36,11.74 4.32,10.7C3.37,9.76 2.93,8.5 3,7.26L6.09,10.35L10.33,6.11L7.24,3C8.5,2.95 9.73,3.39 10.68,4.33C11.76,5.41 12.17,6.9 11.92,8.29C11.8,9 11.5,9.66 11.04,10.25L20.5,19.7L19.61,20.59Z";var U2={alert:$1,check:j1,chevron:X1,clock:J1,counter:C2,dots:e2,error:U1,info:v2,pause:u2,play:S2,power:O2,remote:f2,stop:T2,timer:R2,water:N2,wifi:I2,wifi_off:W2,auto:Q1,care:z2,dishwasher:L2,door:r2,door_closed:M2,dry:z1,energy:Z2,glass:l2,leaf:s2,quick:o2,rack:G1,rinse:H2,sanitize:k2,silent:D2,spray:w2,water_percent:Z1,zone:Z1,bake:V2,chicken:p2,clean:K1,defrost:y2,drawer:E2,fan:t2,fish:a2,flip:A2,fries:n2,fryer:_2,heat:i2,manual:F2,meat:d2,probe:P2,recipe:q1,reheat:s1,roast:x2,shake:g2,slow:c2,snack:m2,star:b2,steam:h2,temperature:B2,vegetable:Y1,warm:s1};function d(M,C="icon"){let H=U2[M]||U2.info;return`<svg class="${C}" viewBox="0 0 24 24" aria-hidden="true"><path d="${H}"></path></svg>`}var e1=`
:host {
  display: block;
  --ap-accent: var(--primary-color, #03a9f4);
  --ap-accent-soft: color-mix(in srgb, var(--ap-accent) 45%, transparent);
  --ap-line: var(--divider-color, rgba(127,127,127,.25));
  --ap-muted: var(--secondary-text-color, #70757a);
  --ap-text: var(--primary-text-color, #212121);
  --ap-hero: 148px;
}

ha-card { overflow: hidden; container-type: inline-size; }

.wrap { padding: 16px; display: grid; gap: 16px; }
.wrap.compact { gap: 12px; padding: 12px; --ap-hero: 104px; }

/* ---------- header ---------- */
.header { display: flex; align-items: center; gap: 10px; }
.header .title { font-size: 1.05rem; font-weight: 600; color: var(--ap-text); line-height: 1.2; cursor: pointer; }
.header .sub { font-size: .78rem; color: var(--ap-muted); }
.header .spacer { flex: 1; }
.badges { display: flex; align-items: center; gap: 6px; color: var(--ap-muted); }
.badges .icon { width: 18px; height: 18px; }
.badges .bad { color: var(--error-color, #db4437); }
.badges .warn { color: var(--warning-color, #fb8c00); }

.pill {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 4px 10px; border-radius: 999px;
  background: color-mix(in srgb, var(--ap-accent) 16%, transparent);
  color: var(--ap-accent); font-size: .76rem; font-weight: 600; white-space: nowrap;
}
.pill .icon { width: 14px; height: 14px; }

/* ---------- hero ---------- */
.hero { display: grid; grid-template-columns: var(--ap-hero) minmax(0, 1fr); gap: 18px; align-items: center; }
.compact .hero { gap: 14px; }
@container (max-width: 360px) { .wrap { --ap-hero: 96px; } .hero { gap: 12px; } }

.status { min-width: 0; display: grid; gap: 10px; }
.status-line { display: flex; align-items: baseline; gap: 8px; flex-wrap: wrap; }
.state-text { font-size: 1.45rem; font-weight: 700; color: var(--ap-accent); line-height: 1.1; }
.compact .state-text { font-size: 1.2rem; }
.phase-text { font-size: .85rem; color: var(--ap-muted); }
.program-line { display: flex; align-items: center; gap: 6px; font-size: .9rem; color: var(--ap-text); }
.program-line .icon { width: 16px; height: 16px; color: var(--ap-muted); }

.countdown { display: flex; align-items: baseline; gap: 10px; flex-wrap: wrap; }
.countdown .value { font-size: 2.1rem; font-weight: 700; letter-spacing: -.02em; color: var(--ap-text); line-height: 1; font-variant-numeric: tabular-nums; }
.compact .countdown .value { font-size: 1.6rem; }
.countdown .unit { font-size: .95rem; font-weight: 600; color: var(--ap-muted); }
.countdown .at { font-size: .82rem; color: var(--ap-muted); display: inline-flex; align-items: center; gap: 4px; }
.countdown .at .icon { width: 14px; height: 14px; }

.bar { height: 8px; border-radius: 999px; background: var(--ap-line); overflow: hidden; }
.bar > i {
  display: block; height: 100%; border-radius: 999px;
  background: linear-gradient(90deg, var(--ap-accent-soft), var(--ap-accent));
  width: 0%; transition: width .8s ease;
}
.busy .bar > i {
  background-image: linear-gradient(90deg, var(--ap-accent-soft), var(--ap-accent)),
    repeating-linear-gradient(115deg, rgba(255,255,255,.28) 0 10px, transparent 10px 20px);
  animation: stripes 1.1s linear infinite;
}
@keyframes stripes { to { background-position: 0 0, 40px 0; } }

/* ---------- alerts ---------- */
.alerts { display: grid; gap: 8px; }
.alert {
  display: flex; align-items: center; gap: 10px; padding: 10px 12px;
  border-radius: 12px; font-size: .84rem; line-height: 1.3;
  background: color-mix(in srgb, var(--warning-color, #ffa726) 16%, transparent);
  color: var(--ap-text);
}
.alert.error { background: color-mix(in srgb, var(--error-color, #db4437) 16%, transparent); }
.alert.info { background: color-mix(in srgb, var(--ap-accent) 14%, transparent); }
.alert .icon { width: 20px; height: 20px; flex: 0 0 auto; color: var(--warning-color, #ffa726); }
.alert.error .icon { color: var(--error-color, #db4437); }
.alert.info .icon { color: var(--ap-accent); }
.alert.pulse { animation: pulse 1.6s ease-in-out infinite; }
@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: .62; } }

/* ---------- sections ---------- */
.section { display: grid; gap: 8px; }
.section-title {
  font-size: .72rem; font-weight: 700; letter-spacing: .08em; text-transform: uppercase;
  color: var(--ap-muted);
}
.section-title .hint { float: right; font-weight: 500; letter-spacing: 0; text-transform: none; }

.chips { display: flex; flex-wrap: wrap; gap: 8px; }
.chip {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 7px 12px; border-radius: 999px; cursor: pointer;
  border: 1px solid var(--ap-line); background: transparent;
  color: var(--ap-text); font: inherit; font-size: .82rem; font-weight: 500;
  transition: background .2s ease, border-color .2s ease, color .2s ease, transform .1s ease;
}
.chip .icon { width: 16px; height: 16px; color: var(--ap-muted); }
.chip:hover:not([disabled]) { border-color: var(--ap-accent); }
.chip:active:not([disabled]) { transform: scale(.97); }
.chip[aria-pressed="true"] {
  background: color-mix(in srgb, var(--ap-accent) 16%, transparent);
  border-color: color-mix(in srgb, var(--ap-accent) 45%, transparent);
  color: var(--ap-accent);
}
.chip[aria-pressed="true"] .icon { color: var(--ap-accent); }
.chip[disabled] { opacity: .38; cursor: not-allowed; }
.chip[disabled][aria-pressed="true"] { opacity: .8; }

.facts { display: flex; flex-wrap: wrap; gap: 8px; }
.fact {
  display: inline-flex; align-items: center; gap: 6px; padding: 6px 10px;
  border-radius: 10px; background: color-mix(in srgb, var(--ap-text) 6%, transparent);
  font-size: .78rem; color: var(--ap-text);
}
.fact .icon { width: 15px; height: 15px; color: var(--ap-muted); }
.fact b { font-weight: 600; }

/* ---------- controls ---------- */
.controls { display: flex; gap: 10px; flex-wrap: wrap; }
.btn {
  flex: 1 1 auto; min-width: 116px;
  display: inline-flex; align-items: center; justify-content: center; gap: 8px;
  padding: 12px 16px; border-radius: 14px; cursor: pointer;
  border: 1px solid var(--ap-line); background: transparent; color: var(--ap-text);
  font: inherit; font-size: .88rem; font-weight: 600;
  transition: transform .1s ease, box-shadow .2s ease, background .2s ease;
}
.btn .icon { width: 18px; height: 18px; }
.btn.primary {
  background: var(--ap-accent); border-color: transparent; color: var(--text-primary-color, #fff);
  box-shadow: 0 6px 18px -8px var(--ap-accent);
}
.btn.primary .icon { color: currentColor; }
.btn:hover:not([disabled]) { box-shadow: 0 6px 16px -10px rgba(0,0,0,.6); }
.btn:active:not([disabled]) { transform: scale(.98); }
.btn[disabled] { opacity: .4; cursor: not-allowed; }

.note { font-size: .76rem; color: var(--ap-muted); display: flex; align-items: center; gap: 6px; }
.note .icon { width: 15px; height: 15px; }

.details { display: grid; grid-template-columns: repeat(auto-fit, minmax(128px, 1fr)); gap: 10px; }
.detail { display: grid; gap: 2px; padding: 10px 12px; border-radius: 12px; background: color-mix(in srgb, var(--ap-text) 5%, transparent); }
.detail .k { font-size: .7rem; color: var(--ap-muted); text-transform: uppercase; letter-spacing: .05em; }
.detail .v { font-size: .86rem; font-weight: 600; color: var(--ap-text); display: flex; align-items: center; gap: 6px; }
.detail .v .icon { width: 15px; height: 15px; color: var(--ap-muted); }

.empty { padding: 24px 16px; text-align: center; color: var(--ap-muted); font-size: .9rem; display: grid; gap: 10px; justify-items: center; }
.empty .icon { width: 36px; height: 36px; }

/* ---------- accents ---------- */
.accent-idle { --ap-accent: var(--state-icon-color, #8a9199); }
.accent-ready { --ap-accent: var(--success-color, #43a047); }
.accent-running, .accent-cooking { --ap-accent: var(--info-color, #039be5); }
.accent-delayed { --ap-accent: #7e57c2; }
.accent-paused { --ap-accent: var(--warning-color, #fb8c00); }
.accent-done { --ap-accent: var(--success-color, #43a047); }
.accent-alarm { --ap-accent: var(--error-color, #db4437); }
.accent-preheat { --ap-accent: #f4511e; }
.accent-warm { --ap-accent: #fb8c00; }

.no-animation svg * { animation: none !important; }
.no-animation .bar > i, .no-animation .alert { animation: none !important; }

@media (prefers-reduced-motion: reduce) {
  svg * { animation: none !important; }
  .bar > i { animation: none !important; transition: none; }
  .alert { animation: none !important; }
}
`;var f5=`
:host {
  --dw-body-1: color-mix(in srgb, var(--card-background-color, #fff) 92%, var(--primary-text-color, #000) 8%);
  --dw-body-2: color-mix(in srgb, var(--card-background-color, #fff) 78%, var(--primary-text-color, #000) 22%);
  --dw-tub-1: color-mix(in srgb, var(--card-background-color, #fff) 60%, #0b2430 40%);
  --dw-tub-2: color-mix(in srgb, var(--card-background-color, #fff) 40%, #06131c 60%);
}

/* ---------- timeline ---------- */
.timeline { display: grid; grid-auto-flow: column; grid-auto-columns: 1fr; gap: 4px; }
.step { display: grid; justify-items: center; gap: 5px; opacity: .45; }
.step .dot { width: 100%; height: 4px; border-radius: 999px; background: var(--ap-line); }
.step .label { font-size: .7rem; color: var(--ap-muted); text-align: center; line-height: 1.15; }
.step.done { opacity: 1; }
.step.done .dot { background: color-mix(in srgb, var(--ap-accent) 55%, transparent); }
.step.active { opacity: 1; }
.step.active .dot { background: var(--ap-accent); box-shadow: 0 0 0 3px color-mix(in srgb, var(--ap-accent) 18%, transparent); }
.step.active .label { color: var(--ap-accent); font-weight: 600; }
.step.skip { opacity: .2; }

/* ---------- score meters ---------- */
.meters { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; }
.meter { display: grid; gap: 6px; }
.meter .top { display: flex; align-items: center; gap: 6px; font-size: .76rem; color: var(--ap-muted); }
.meter .top .icon { width: 15px; height: 15px; }
.meter .top .val { margin-left: auto; font-weight: 600; color: var(--ap-text); font-variant-numeric: tabular-nums; }
.meter .track { display: grid; grid-auto-flow: column; gap: 3px; }
.meter .track i { height: 5px; border-radius: 2px; background: var(--ap-line); }
.meter.eco .track i.on { background: var(--success-color, #43a047); }
.meter.energy .track i.on { background: var(--warning-color, #fb8c00); }
.meter.water .track i.on { background: var(--info-color, #039be5); }

/* ---------- machine illustration ---------- */
.machine { width: 100%; height: auto; perspective: 620px; overflow: visible; }
.machine .cabinet { fill: color-mix(in srgb, var(--ap-text) 10%, transparent); }
.machine .cavity-glow { fill: color-mix(in srgb, var(--ap-accent) 12%, transparent); opacity: 0; transition: opacity .4s ease; }
.machine .cavity-light { fill: color-mix(in srgb, #ffffff 10%, transparent); opacity: 0; transition: opacity .5s ease; }
.machine .door-shadow { fill: rgba(0, 0, 0, .35); opacity: 0; transition: opacity .5s ease; }
.machine .led-ring { fill: none; stroke: color-mix(in srgb, var(--ap-muted) 55%, transparent); stroke-width: 1.4; }
.machine .wash-water .pool { fill: color-mix(in srgb, var(--ap-accent) 42%, transparent); opacity: 0; transition: opacity .5s ease; }
.machine .wash-water .pool-back { fill: color-mix(in srgb, var(--ap-accent) 22%, transparent); }
.machine .bubbles circle { fill: color-mix(in srgb, #ffffff 65%, transparent); opacity: 0; }
.machine .glass { fill: url(#dw-glass); }
.machine .door {
  transform-box: view-box; transform-origin: 90px 206px;
  transition: transform .7s cubic-bezier(.4, 0, .2, 1);
}
.machine .panel-strip { fill: color-mix(in srgb, var(--ap-text) 8%, transparent); }
.machine .handle { fill: color-mix(in srgb, var(--ap-text) 22%, transparent); }
.machine .door-panel { fill: url(#dw-body); stroke: var(--ap-line); stroke-width: 1.2; }
.machine .display { fill: color-mix(in srgb, #04121a 82%, var(--card-background-color, #fff)); }
.machine .display-text {
  fill: var(--ap-accent); font-size: 12px; font-weight: 700;
  font-family: var(--paper-font-body1_-_font-family, inherit); font-variant-numeric: tabular-nums;
  letter-spacing: .04em;
}
.machine .led { fill: var(--ap-accent); filter: drop-shadow(0 0 3px var(--ap-accent)); transition: fill .3s ease; }
.machine .tub-body { fill: url(#dw-tub); }
.machine .rack line { stroke: color-mix(in srgb, #ffffff 42%, transparent); stroke-width: 2; stroke-linecap: round; }
.machine .plates rect { fill: color-mix(in srgb, #ffffff 68%, transparent); }
.machine .glasses path { fill: color-mix(in srgb, #ffffff 34%, transparent); }
.machine .spray-arm rect, .machine .spray-arm circle { fill: color-mix(in srgb, #ffffff 55%, transparent); }
.machine .spray-arm .jet { fill: var(--ap-accent); }
.machine .spray-arm { transform-box: view-box; transform-origin: 90px 170px; }
.machine .water path { stroke: var(--ap-accent); stroke-width: 2; stroke-linecap: round; fill: none; opacity: 0; }
.machine .droplets circle { fill: var(--ap-accent); opacity: 0; }
.machine .steam path { stroke: color-mix(in srgb, #ffffff 55%, transparent); stroke-width: 2.4; stroke-linecap: round; fill: none; opacity: 0; }
.machine .sparkles path { fill: var(--success-color, #43a047); opacity: 0; }

/* state driven behaviour */
.running .machine .spray-arm { animation: spin 2.6s linear infinite; }
.running .machine .water path { animation: jet 1.4s ease-in-out infinite; }
.running .machine .water path:nth-child(2) { animation-delay: .25s; }
.running .machine .water path:nth-child(3) { animation-delay: .5s; }
.running .machine .droplets circle { animation: drop 2.4s ease-in infinite; }
.running .machine .droplets circle:nth-child(2) { animation-delay: .5s; }
.running .machine .droplets circle:nth-child(3) { animation-delay: .9s; }
.running .machine .droplets circle:nth-child(4) { animation-delay: 1.4s; }
.running .machine .droplets circle:nth-child(5) { animation-delay: 1.9s; }
.running .machine .led { animation: blink 2.2s ease-in-out infinite; }
.running .machine .wash-water .pool { opacity: 1; animation: swell 3.6s ease-in-out infinite; }
.running .machine .wash-water .pool-back { animation-delay: .9s; animation-duration: 4.4s; }
.running .machine .bubbles circle { animation: bubble 3.2s ease-in infinite; }
.running .machine .bubbles circle:nth-child(2) { animation-delay: .6s; }
.running .machine .bubbles circle:nth-child(3) { animation-delay: 1.1s; }
.running .machine .bubbles circle:nth-child(4) { animation-delay: 1.7s; }
.running .machine .bubbles circle:nth-child(5) { animation-delay: 2.2s; }
.running .machine .bubbles circle:nth-child(6) { animation-delay: 2.8s; }
.running .machine .plates rect { animation: shine 4s ease-in-out infinite; }

.phase-drying .machine .water path, .phase-drying .machine .droplets circle { animation: none; opacity: 0; }
.phase-drying .machine .wash-water .pool, .phase-drying .machine .bubbles circle { animation: none; opacity: 0; }
.phase-drying .machine .spray-arm { animation-duration: 8s; }
.phase-drying .machine .steam path { animation: steam 3.4s ease-in-out infinite; }
.phase-drying .machine .steam path:nth-child(2) { animation-delay: .6s; }
.phase-drying .machine .steam path:nth-child(3) { animation-delay: 1.2s; }

.paused .machine .led { animation: blink 1s steps(2, end) infinite; }
.paused .machine .plates rect { opacity: .8; }
.paused .machine .wash-water .pool { opacity: .85; }

.done .machine .sparkles path { animation: twinkle 2.6s ease-in-out infinite; }
.done .machine .sparkles path:nth-child(2) { animation-delay: .6s; }
.done .machine .sparkles path:nth-child(3) { animation-delay: 1.2s; }

/* powered on: the tub is lit from inside */
.machine .cavity-light { opacity: 1; }

/* powered off: dark display, dark led, no interior light */
.off .machine { filter: saturate(.2); }
.off .machine .display { fill: color-mix(in srgb, #04121a 90%, var(--card-background-color, #fff)); }
.off .machine .display-text { fill: transparent; }
.off .machine .cavity-light { opacity: 0; }
.off .machine .led { fill: color-mix(in srgb, var(--ap-muted) 35%, transparent); filter: none; }
.off .machine .plates rect { fill: color-mix(in srgb, #ffffff 34%, transparent); }

.alarm .machine .led { animation: blink .7s steps(2, end) infinite; }

/* the door drops nearly flat so the tub stays readable behind it */
.door-open .machine .door { transform: rotateX(78deg) translateY(4px); }
.door-open .machine .glass { opacity: .35; }
.door-open .machine .cavity-glow { opacity: 1; }
.door-open .machine .door-shadow { opacity: 1; }

@keyframes spin { to { transform: rotate(360deg); } }
@keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: .25; } }
@keyframes jet {
  0% { opacity: 0; stroke-dasharray: 2 60; stroke-dashoffset: 0; }
  40% { opacity: .9; }
  100% { opacity: 0; stroke-dasharray: 22 40; stroke-dashoffset: -50; }
}
@keyframes drop {
  0% { opacity: 0; transform: translateY(0); }
  20% { opacity: .85; }
  100% { opacity: 0; transform: translateY(26px); }
}
@keyframes steam {
  0% { opacity: 0; transform: translateY(6px) scale(.9); }
  40% { opacity: .7; }
  100% { opacity: 0; transform: translateY(-16px) scale(1.06); }
}
@keyframes swell {
  0%, 100% { transform: translateX(-6px); }
  50% { transform: translateX(6px); }
}
@keyframes bubble {
  0% { opacity: 0; transform: translateY(0) scale(.6); }
  15% { opacity: .9; }
  100% { opacity: 0; transform: translateY(-46px) scale(1.15); }
}
@keyframes shine {
  0%, 100% { fill: color-mix(in srgb, #ffffff 68%, transparent); }
  50% { fill: color-mix(in srgb, #ffffff 92%, transparent); }
}
@keyframes twinkle {
  0%, 100% { opacity: 0; transform: scale(.7); }
  50% { opacity: 1; transform: scale(1); }
}
`,$2=e1+f5;function P(M,C){if(!M)return"";let H=C?.locale?.language||C?.language||"hu",V=C?.locale?.time_format,L={hour:"2-digit",minute:"2-digit"};V==="12"&&(L.hour12=!0),V==="24"&&(L.hour12=!1);try{return new Intl.DateTimeFormat(H,L).format(M)}catch{return M.toTimeString().slice(0,5)}}function E(M,C){if(M==null)return null;let H=Math.max(0,Math.round(M));if(H<60)return{value:String(H),unit:C("ui.minute_short")};let V=Math.floor(H/60),L=H%60;return{value:`${V}:${String(L).padStart(2,"0")}`,unit:C("ui.hour_short")}}function z(M,C){let H=E(M,C);return H?`${H.value} ${H.unit}`:""}function G2(M){if(M==null)return null;let C=Math.max(0,Math.round(M)),H=Math.floor(C/60),V=C%60;return H?`${H}:${String(V).padStart(2,"0")}`:`0:${String(V).padStart(2,"0")}`}function U(M,C=1){return M==null||!Number.isFinite(M)?"\u2013":M.toFixed(C).replace(/\.0$/,"")}function t(M){return String(M??"").replace(/[&<>"']/g,C=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[C])}var S1={language:"auto",compact:!1,animate:!0,show_programs:!0,show_options:!0,show_delay:!0,show_scores:!0,show_consumption:!0,show_details:!0,show_controls:!0},g5=[a.OFF,a.IDLE,a.READY_TO_START],Q2=[a.IDLE,a.READY_TO_START],u1=class extends HTMLElement{static getConfigElement(){return document.createElement(W)}static getStubConfig(C){let H=r1(C);return{type:`custom:${g}`,device:H[0]?.id}}constructor(){super(),this.attachShadow({mode:"open"}),this._sections={},this._signatures={},this._built=!1}setConfig(C){this._config={...S1,...C||{}},this._signatures={},this._hass&&this._render()}set hass(C){this._hass=C,this._render()}get hass(){return this._hass}connectedCallback(){this._timer=window.setInterval(()=>this._render(),3e4)}disconnectedCallback(){this._timer&&window.clearInterval(this._timer),this._timer=void 0}getCardSize(){return this._config?.compact?5:9}getGridOptions(){return{columns:12,min_columns:6,rows:this._config?.compact?6:"auto"}}_build(){let C=document.createElement("style");C.textContent=$2;let H=document.createElement("ha-card"),V=document.createElement("div");V.className="wrap",V.addEventListener("click",L=>this._onClick(L));for(let L of["header","hero","alerts","programs","options","delay","meters","controls","details"]){let r=document.createElement("div");r.dataset.section=L,this._sections[L]=r,V.appendChild(r)}H.appendChild(V),this.shadowRoot.replaceChildren(C,H),this._card=H,this._wrap=V,this._built=!0}_render(){if(!this._hass||!this._config)return;this._built||this._build();let C=C1(this._config,this._hass),H=H1(C);this._t=H;let V=D1(this._hass,this._config);if(this._model=V,!V.ok){this._renderEmpty(V,H);return}this._emptyShown=!1,this._applyHostClasses(V),this._section("header",this._headerHtml(V,H)),this._heroSection(V,H),this._section("alerts",this._alertsHtml(V,H)),this._section("programs",this._config.show_programs?this._programsHtml(V,H):""),this._section("options",this._config.show_options?this._optionsHtml(V,H):""),this._section("delay",this._config.show_delay?this._delayHtml(V,H):""),this._section("meters",this._metersHtml(V,H)),this._section("controls",this._config.show_controls?this._controlsHtml(V,H):""),this._section("details",this._config.show_details?this._detailsHtml(V,H):"")}_renderEmpty(C,H){if(this._emptyShown!==C.reason){this._emptyShown=C.reason,this._signatures={};for(let V of Object.values(this._sections))V.innerHTML="";this._sections.header.innerHTML=`
      <div class="empty">
        ${d("dishwasher")}
        <div>${t(H(`ui.${C.reason}`))}</div>
      </div>`}}_section(C,H){this._signatures[C]!==H&&(this._signatures[C]=H,this._sections[C].innerHTML=H)}_applyHostClasses(C){let H=["wrap"];this._config.compact&&H.push("compact"),this._config.animate||H.push("no-animation"),H.push(`accent-${C.accent}`),C.state===a.RUNNING&&H.push("running","busy"),C.state===a.PAUSED&&H.push("paused"),C.state===a.END_OF_CYCLE&&H.push("done"),C.state===a.OFF&&H.push("off"),(C.state===a.ALARM||C.alerts.some(L=>x1[L]==="error"))&&H.push("alarm"),C.step==="DRYING"&&H.push("phase-drying"),C.doorOpen&&H.push("door-open");let V=H.join(" ");this._wrap.className!==V&&(this._wrap.className=V)}_headerHtml(C,H){let V=t(C.name||H("card_name")),L=[a.IDLE,a.READY_TO_START].includes(C.state)&&C.minutesToFinish?C.minutesToFinish:x[C.program]?.duration,r=C.program&&L?`${H(`program.${C.program}`)} \xB7 ${z(L,H)}`:C.programRaw||"",e=[];return C.online?C.linkQuality&&e.push(`<span title="${H("ui.wifi")}: ${C.linkQuality}">${d("wifi")}</span>`):e.push(`<span class="bad" title="${H("ui.offline")}">${d("wifi_off")}</span>`),C.doorOpen&&e.push(`<span class="bad" title="${H("ui.door_open")}">${d("door")}</span>`),C.ecoMode&&e.push(`<span title="${H("ui.eco_mode")}">${d("leaf")}</span>`),`
      <div class="header">
        <div>
          <div class="title" data-action="more-info">${V}</div>
          ${r?`<div class="sub">${t(r)}</div>`:""}
        </div>
        <div class="spacer"></div>
        <div class="badges">${e.join("")}</div>
        <div class="pill">${d(this._stateIcon(C))}${t(H(`state.${C.state}`))}</div>
      </div>`}_stateIcon(C){switch(C.state){case a.RUNNING:return"water";case a.PAUSED:return"pause";case a.END_OF_CYCLE:return"check";case a.DELAYED_START:return"timer";case a.ALARM:return"error";case a.READY_TO_START:return"play";default:return"power"}}_heroSection(C,H){this._sections.hero.querySelector(".machine")||(this._sections.hero.innerHTML=`
        <div class="hero">
          <div class="machine-wrap" data-action="more-info">${I1()}</div>
          <div class="status"></div>
        </div>`,this._statusNode=this._sections.hero.querySelector(".status"));let V=this._statusHtml(C,H);this._signatures.status!==V&&(this._signatures.status=V,this._statusNode.innerHTML=V),W1(this._sections.hero,this._displayText(C,H))}_displayText(C,H){return C.state===a.OFF?"":C.remaining!==null&&[a.RUNNING,a.PAUSED,a.DELAYED_START].includes(C.state)?G2(C.remaining):C.state===a.END_OF_CYCLE?"0:00":C.program?H(`program.${C.program}`).slice(0,8):"--:--"}_statusHtml(C,H){let V=[],L=C.state===a.RUNNING&&C.phase!=="UNAVAILABLE"?`<span class="phase-text">${t(H(`phase_long.${C.phase}`))}</span>`:"";V.push(`
      <div class="status-line">
        <span class="state-text">${t(H(`state.${C.state}`))}</span>
        ${L}
      </div>`),C.program&&V.push(`
        <div class="program-line">
          ${d(x[C.program]?.icon||"dishwasher")}
          <span>${t(H(`program.${C.program}`))}</span>
        </div>`);let r=this._countdownHtml(C,H);return r&&V.push(r),[a.RUNNING,a.PAUSED,a.END_OF_CYCLE].includes(C.state)&&(V.push(`<div class="bar"><i style="width:${Math.round(C.progress*100)}%"></i></div>`),V.push(this._timelineHtml(C,H))),V.join("")}_countdownHtml(C,H){if(C.state===a.END_OF_CYCLE)return`<div class="countdown"><span class="at">${d("check")}${t(H("ui.finished_hint"))}</span></div>`;if(C.state===a.DELAYED_START){let V=E(C.delay||C.remaining,H);if(!V)return"";let L=[C.startAt?`<span class="at">${d("timer")}${t(H("ui.starts_at"))} ${P(C.startAt,this._hass)}</span>`:"",C.finishAt?`<span class="at">${d("clock")}${t(H("ui.ready_at"))} ${P(C.finishAt,this._hass)}</span>`:""].join("");return`<div class="countdown"><span class="value">${V.value}</span><span class="unit">${V.unit}</span>${L}</div>`}if([a.RUNNING,a.PAUSED].includes(C.state)){let V=E(C.remaining,H);if(!V)return"";let L=C.finishAt?`<span class="at">${d("clock")}${t(H("ui.ready_at"))} ${P(C.finishAt,this._hass)}</span>`:"";return`<div class="countdown"><span class="value">${V.value}</span><span class="unit">${V.unit}</span>${L}</div>`}if([a.IDLE,a.READY_TO_START].includes(C.state)){let V=E(C.minutesToFinish??x[C.program]?.duration,H);if(!V)return"";let L=C.finishAt?`<span class="at">${d("clock")}${t(H("ui.ready_at"))} ${P(C.finishAt,this._hass)}</span>`:"";return`<div class="countdown"><span class="value">${V.value}</span><span class="unit">${V.unit}</span>${L}</div>`}if(C.state===a.OFF&&C.program&&x[C.program]){let V=E(x[C.program].duration,H);return`<div class="countdown"><span class="value">${V.value}</span><span class="unit">${V.unit}</span>
        <span class="at">${d("timer")}${t(H("ui.duration"))}</span></div>`}return""}_timelineHtml(C,H){let V=x[C.program]?.steps||n1,L=C.step?V.indexOf(C.step):-1;return`<div class="timeline">${n1.map(e=>{let A=V.includes(e),i=V.indexOf(e),p="step";return A?L>=0&&i<L?p+=" done":L>=0&&i===L?p+=" active":C.state===a.END_OF_CYCLE&&(p+=" done"):p+=" skip",`<div class="${p}"><span class="dot"></span><span class="label">${t(H(`phase.${e}`))}</span></div>`}).join("")}</div>`}_alertsHtml(C,H){let V=[];C.doorOpen&&C.state!==a.OFF&&V.push({severity:"warning",text:H("ui.door_open"),iconName:"door"});for(let L of C.alerts){let r=x1[L]||"warning",e=H(`alert.${L}`,`${H("alert_generic")}: ${L}`);V.push({severity:r,text:e,iconName:r==="error"?"error":"alert"})}return C.online||V.push({severity:"error",text:H("ui.offline"),iconName:"wifi_off"}),V.length?`<div class="alerts">${V.map(L=>`<div class="alert ${L.severity}">${d(L.iconName)}<span>${t(L.text)}</span></div>`).join("")}</div>`:""}_programsHtml(C,H){if(!C.entities.program||!C.programOptions.length)return"";let V=g5.includes(C.state)&&C.remoteEnabled,L=C.programOptions.filter(i=>x[i.key]),e=[...l1.map(i=>L.find(p=>p.key===i)).filter(Boolean),...L.filter(i=>!l1.includes(i.key))].map(i=>{let p=i.key===C.program,m=x[i.key],n=`${H(`program_hint.${i.key}`)} \xB7 ${U(m.water)} l \xB7 ${U(m.energy,3)} kWh \xB7 ${z(m.duration,H)}`;return`<button class="chip" type="button" data-action="program" data-value="${t(i.label)}"
        aria-pressed="${p}" title="${t(n)}" ${V?"":"disabled"}>
        ${d(m.icon)}<span>${t(H(`program.${i.key}`))}</span></button>`}),A=C.program?t(H(`program_hint.${C.program}`)):"";return`
      <div class="section">
        <div class="section-title">${t(H("ui.program"))}</div>
        <div class="chips">${e.join("")}</div>
        ${A?`<div class="note">${A}</div>`:""}
      </div>`}_optionsHtml(C,H){if(!C.options.length)return"";let V=Q2.includes(C.state)&&C.remoteEnabled,L=C.options.filter(e=>e.supported||e.on);if(!L.length)return`
        <div class="section">
          <div class="section-title">${t(H("ui.options"))}</div>
          <div class="note">${t(H("ui.no_options"))}</div>
        </div>`;let r=L.map(e=>`<button class="chip" type="button" data-action="option" data-value="${e.entityId}"
        aria-pressed="${e.on}" title="${t(H(`option_hint.${e.key}`))}"
        ${V&&e.supported?"":"disabled"}>
        ${d(e.icon)}<span>${t(H(`option.${e.key}`))}</span></button>`);return`
      <div class="section">
        <div class="section-title">${t(H("ui.options"))}</div>
        <div class="chips">${r.join("")}</div>
      </div>`}_delayHtml(C,H){if(!C.entities.start_time)return"";let V=C.state===a.DELAYED_START||C.delay>0,L=(Q2.includes(C.state)||C.state===a.DELAYED_START)&&C.remoteEnabled;if(!L&&!V)return"";let r=B1.map(A=>{let i=C.delay===A;return`<button class="chip" type="button" data-action="delay" data-value="${A}"
        aria-pressed="${i}" ${L?"":"disabled"}>
        ${d("timer")}<span>${A/60} ${t(H("ui.hour_short"))}</span></button>`});V&&r.push(`<button class="chip" type="button" data-action="delay" data-value="-1" ${L?"":"disabled"}>
        ${d("stop")}<span>${t(H("ui.delay_cancel"))}</span></button>`);let e=V?`<span class="hint">${t(z(C.delay,H))}</span>`:`<span class="hint">${t(H("ui.delay_off"))}</span>`;return`
      <div class="section">
        <div class="section-title">${t(H("ui.delay"))}${e}</div>
        <div class="chips">${r.join("")}</div>
      </div>`}_metersHtml(C,H){let V=[],{eco:L,energy:r,water:e}=C.scores;if(this._config.show_scores&&(L!==null||r!==null||e!==null)){let A=(i,p,m,n)=>{let O=Math.max(0,Math.min(7,n??0)),Z=Array.from({length:7},(u,S)=>`<i class="${S<O?"on":""}"></i>`).join("");return`
          <div class="meter ${p}">
            <div class="top">${d(m)}<span>${t(H(`ui.${i}`))}</span>
              <span class="val">${n===null?"\u2013":`${n}/7`}</span></div>
            <div class="track">${Z}</div>
          </div>`};V.push(`
        <div class="meters">
          ${A("eco_score","eco","leaf",L)}
          ${A("energy_score","energy","energy",r)}
          ${A("water_score","water","water",e)}
        </div>`)}if(this._config.show_consumption&&C.program&&x[C.program]){let A=x[C.program];V.push(`
        <div class="facts">
          <span class="fact">${d("water")}<b>${U(A.water)}</b> l</span>
          <span class="fact">${d("energy")}<b>${U(A.energy,3)}</b> kWh</span>
          <span class="fact">${d("timer")}<b>${t(z(A.duration,H))}</b></span>
        </div>`)}return V.length?`
      <div class="section">
        <div class="section-title">${t(H("ui.scores"))}</div>
        ${V.join("")}
      </div>`:""}_controlsHtml(C,H){let L=(b1[C.state]||[]).filter(e=>C.entities[`cmd_${e}`]).map(e=>{let A=T1[e],i=!C.remoteEnabled&&e!=="off"?"disabled":"";return`<button class="btn ${A.style}" type="button" data-action="command" data-value="${e}" ${i}>
          ${d(A.icon)}<span>${t(H(`command.${e}`))}</span></button>`});if(!L.length)return"";let r=C.remoteEnabled?"":`<div class="note">${d("remote")}${t(H("ui.remote_disabled_hint"))}</div>`;return`<div class="section"><div class="controls">${L.join("")}</div>${r}</div>`}_detailsHtml(C,H){let V=[],L=(r,e,A)=>{e==null||e===""||V.push(`
        <div class="detail">
          <span class="k">${t(H(`ui.${r}`))}</span>
          <span class="v">${d(A)}${t(String(e))}</span>
        </div>`)};if(C.doorOpen!==null&&L("door",C.doorOpen?H("ui.door_open"):H("ui.door_closed"),C.doorOpen?"door":"door_closed"),C.remote){let r=C.remote.includes("TEMPORARY")?H("ui.remote_locked"):C.remoteEnabled?H("ui.remote_on"):H("ui.remote_off");L("remote",r,"remote")}if(C.linkQuality){let r=C.linkQuality.replace(/_/g," ").toLowerCase();L("wifi",r.charAt(0).toUpperCase()+r.slice(1),"wifi")}return C.cycles!==null&&L("cycles",C.cycles,"counter"),C.rinseAid!==null&&L("rinse_aid",`${C.rinseAid}/8`,"water_percent"),C.waterHardness&&L("water_hardness",C.waterHardness,"water"),V.length?`
      <div class="section">
        <div class="section-title">${t(H("ui.details"))}</div>
        <div class="details">${V.join("")}</div>
      </div>`:""}_onClick(C){let H=C.target.closest("[data-action]");if(!H||H.hasAttribute("disabled"))return;let{action:V,value:L}=H.dataset,r=this._model;if(!(!r?.ok&&V!=="more-info"))switch(V){case"more-info":this._moreInfo(r?.entities?.appliance_state);break;case"program":this._selectProgram(L);break;case"option":this._haptic("light"),this._call("switch","toggle",{entity_id:L});break;case"command":this._haptic("medium"),this._call("button","press",{entity_id:r.entities[`cmd_${L}`]});break;case"delay":this._haptic("light"),this._call("number","set_value",{entity_id:r.entities.start_time,value:Number(L)});break;default:break}}async _selectProgram(C){let H=this._model;this._haptic("light"),H.state===a.OFF&&H.entities.cmd_on&&(await this._call("button","press",{entity_id:H.entities.cmd_on}),await new Promise(V=>window.setTimeout(V,1500))),await this._call("select","select_option",{entity_id:H.entities.program,option:C})}_call(C,H,V){return V.entity_id?this._hass.callService(C,H,V):Promise.resolve()}_moreInfo(C){C&&this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:C},bubbles:!0,composed:!0}))}_haptic(C){this.dispatchEvent(new CustomEvent("haptic",{detail:C,bubbles:!0,composed:!0}))}};function K2(){customElements.get(g)||(customElements.define(g,u1),window.customCards=window.customCards||[],window.customCards.push({type:g,name:"AEG / Electrolux Dishwasher Card",description:"Rich status card for AEG and Electrolux dishwashers: phases, remaining time, programs, options and controls.",preview:!0,documentationURL:"https://github.com/gabor-io/ha-appliance-custom-card"}),console.info(`%c ${g} %c ${g1} `,"color:#fff;background:#039be5;font-weight:700;border-radius:3px 0 0 3px","color:#039be5;background:#e1f5fe;font-weight:700;border-radius:0 3px 3px 0"))}var k5=`
:host { display: block; }
.form { display: grid; gap: 14px; padding: 4px 0; }
label { display: grid; gap: 4px; font-size: .85rem; color: var(--secondary-text-color, #70757a); }
input[type="text"], select {
  font: inherit; padding: 9px 10px; border-radius: 10px;
  border: 1px solid var(--divider-color, rgba(127,127,127,.35));
  background: var(--card-background-color, #fff); color: var(--primary-text-color, #212121);
}
.title { font-size: .72rem; font-weight: 700; letter-spacing: .08em; text-transform: uppercase;
  color: var(--secondary-text-color, #70757a); margin-top: 4px; }
.toggles { display: grid; grid-template-columns: repeat(auto-fit, minmax(170px, 1fr)); gap: 8px; }
.toggle { display: flex; align-items: center; gap: 8px; font-size: .85rem;
  color: var(--primary-text-color, #212121); cursor: pointer; }
`;function t1(M){return class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}setConfig(H){this._config={...H},this._render()}set hass(H){this._hass=H,this._render()}_render(){if(!this._config||!this._hass)return;let H=M.translator(M.getLanguage(this._config,this._hass)),V=M.listDevices(this._hass),L=this._config.device||"",r=[`<option value="" ${L?"":"selected"}>${t(H("editor.device_auto"))}</option>`,...V.map(i=>`<option value="${t(i.id)}" ${i.id===L?"selected":""}>${t(i.name)}</option>`)].join(""),e=[`<option value="auto">${t(H("editor.language_auto"))}</option>`,...M.languages.map(i=>`<option value="${i}" ${this._config.language===i?"selected":""}>${i.toUpperCase()}</option>`)].join(""),A=M.toggles.map(i=>{let p=this._config[i]??M.defaults[i]??!1;return`<label class="toggle"><input type="checkbox" data-key="${i}" ${p?"checked":""}>
            <span>${t(H(`editor.${i}`))}</span></label>`}).join("");this.shadowRoot.innerHTML=`
        <style>${k5}</style>
        <div class="form">
          <label>${t(H("editor.device"))}
            <select data-key="device">${r}</select>
          </label>
          <label>${t(H("editor.name"))}
            <input type="text" data-key="name" value="${t(this._config.name||"")}">
          </label>
          <label>${t(H("editor.language"))}
            <select data-key="language">${e}</select>
          </label>
          <div class="title">${t(H("editor.sections"))}</div>
          <div class="toggles">${A}</div>
        </div>`,this.shadowRoot.querySelectorAll("[data-key]").forEach(i=>i.addEventListener("change",p=>this._onChange(p)))}_onChange(H){let V=H.target,L=V.dataset.key,r={...this._config,type:this._config.type||`custom:${M.cardName}`};V.type==="checkbox"?r[L]=V.checked:V.value===""?delete r[L]:r[L]=V.value,this._config=r,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:r},bubbles:!0,composed:!0}))}}}var y5=t1({cardName:g,toggles:["show_programs","show_options","show_delay","show_scores","show_consumption","show_details","show_controls","compact","animate"],defaults:S1,listDevices:r1,getLanguage:C1,translator:H1,languages:v1});function Y2(){customElements.get(W)||customElements.define(W,y5)}Y2();K2();var k="philips-airfryer-card",$="philips-airfryer-card-editor",j2="1.1.0",o={STANDBY:"STANDBY",POWERSAVE:"POWERSAVE",MAINMENU:"MAINMENU",IDLE:"IDLE",SETTING:"SETTING",PARASETTING:"PARASETTING",PRECOOK:"PRECOOK",COOKING:"COOKING",PAUSE:"PAUSE",USER_ACTION:"USER_ACTION",MAINTAIN:"MAINTAIN",FINISH:"FINISH",PAIRING:"PAIRING",UNKNOWN:"UNKNOWN"},q2={[o.STANDBY]:"idle",[o.POWERSAVE]:"idle",[o.MAINMENU]:"idle",[o.IDLE]:"ready",[o.SETTING]:"ready",[o.PARASETTING]:"ready",[o.PRECOOK]:"preheat",[o.COOKING]:"cooking",[o.PAUSE]:"paused",[o.USER_ACTION]:"paused",[o.MAINTAIN]:"warm",[o.FINISH]:"done",[o.PAIRING]:"idle",[o.UNKNOWN]:"idle"},R=[o.PRECOOK,o.COOKING,o.MAINTAIN],F=[...R,o.PAUSE,o.USER_ACTION],i1=[o.IDLE,o.SETTING,o.PARASETTING,o.MAINMENU,o.STANDBY],X2={[o.STANDBY]:["power_on"],[o.POWERSAVE]:["power_on"],[o.MAINMENU]:["start","power_off"],[o.IDLE]:["start","power_off"],[o.SETTING]:["start","power_off"],[o.PARASETTING]:["start","power_off"],[o.PRECOOK]:["pause","stop"],[o.COOKING]:["pause","stop"],[o.PAUSE]:["start","stop"],[o.USER_ACTION]:["start","stop"],[o.MAINTAIN]:["stop"],[o.FINISH]:["keep_warm","stop"],[o.PAIRING]:[],[o.UNKNOWN]:[]},a1={power_on:{icon:"power",style:"primary",entity:"power",service:["switch","turn_on"]},power_off:{icon:"power",style:"ghost",entity:"power",service:["switch","turn_off"]},start:{icon:"play",style:"primary",entity:"btn_start",service:["button","press"]},pause:{icon:"pause",style:"primary",entity:"btn_pause",service:["button","press"]},stop:{icon:"stop",style:"ghost",entity:"btn_stop",service:["button","press"]},keep_warm:{icon:"warm",style:"ghost",entity:"btn_keep_warm",service:["button","press"]}},G={MANUAL:{icon:"manual"},AUTO_COOK:{icon:"auto"},KEEP_WARM:{icon:"warm"},RECIPE:{icon:"recipe"},NO_SELECTION:{icon:"dots"},AIR_STEAM:{icon:"steam"},AIR_STEAM_PRO:{icon:"steam"},STEAMING:{icon:"steam"},ROAST:{icon:"roast"},BAKE:{icon:"bake"},GRILL:{icon:"roast"},SLOW_COOK:{icon:"slow"},STEW:{icon:"slow"},DEFROST:{icon:"defrost"},REHEAT:{icon:"reheat"},SOUS_VIDE:{icon:"probe"},EASY_CLEAN:{icon:"clean"},USER_PRESET:{icon:"star"},FROZEN_SNACKS:{icon:"snack"},FRESH_FRIES:{icon:"fries"},CHICKEN:{icon:"chicken"},FISH:{icon:"fish"},MUFFINS_CAKE:{icon:"bake"},MEAT_CHOPS:{icon:"meat"},VEGETABLES:{icon:"vegetable"}},J2=["AIR_STEAM","AIR_STEAM_PRO","STEAMING","STEW","SLOW_COOK"],Q={temperature:{min:40,max:200,step:5},time:{min:1,max:60,step:1},probe:{min:40,max:100,step:1},airspeed:{min:1,max:2,step:1}},C5=[{food:"poultry",doneness:"done",range:"80\u201385 \xB0C"},{food:"poultry_breast",doneness:"juicy",range:"70\u201374 \xB0C"},{food:"beef",doneness:"rare",range:"45\u201350 \xB0C"},{food:"beef",doneness:"medium",range:"55\u201360 \xB0C"},{food:"beef",doneness:"well_done",range:"65\u201370 \xB0C"},{food:"pork",doneness:"done",range:"70\u201373 \xB0C"},{food:"pork_chop",doneness:"medium",range:"58\u201363 \xB0C"},{food:"fish",doneness:"translucent",range:"50\u201355 \xB0C"},{food:"potato",doneness:"well_done",range:"92\u201395 \xB0C"}],H5=[160,180,200],V5=[5,10,15,20,30];var w5={card_name:"Airfryer",status:{STANDBY:"K\xE9szenl\xE9t",POWERSAVE:"Energiatakar\xE9kos",MAINMENU:"F\u0151men\xFC",IDLE:"K\xE9sz az ind\xEDt\xE1sra",SETTING:"Be\xE1ll\xEDt\xE1s",PARASETTING:"Be\xE1ll\xEDt\xE1s",PRECOOK:"El\u0151meleg\xEDt\xE9s",COOKING:"S\xFCt\xE9s",PAUSE:"Sz\xFCneteltetve",USER_ACTION:"Beavatkoz\xE1s sz\xFCks\xE9ges",MAINTAIN:"Melegen tart\xE1s",FINISH:"Elk\xE9sz\xFClt",PAIRING:"P\xE1ros\xEDt\xE1s",UNKNOWN:"Ismeretlen"},method:{MANUAL:"Manu\xE1lis",AUTO_COOK:"Auto-Cook",KEEP_WARM:"Melegen tart\xE1s",RECIPE:"Recept",NO_SELECTION:"Nincs kiv\xE1lasztva",AIR_STEAM:"Air Steam",AIR_STEAM_PRO:"Air Steam Pro",STEAMING:"P\xE1rol\xE1s",ROAST:"S\xFCt\xE9s (roast)",BAKE:"S\xFCtem\xE9ny",GRILL:"Grill",SLOW_COOK:"Lass\xFA f\u0151z\xE9s",STEW:"P\xE1rolt \xE9tel",DEFROST:"Kiolvaszt\xE1s",REHEAT:"\xDAjrameleg\xEDt\xE9s",SOUS_VIDE:"Sous-vide",EASY_CLEAN:"Tiszt\xEDt\xE1s",USER_PRESET:"Saj\xE1t program",FROZEN_SNACKS:"Fagyasztott snack",FRESH_FRIES:"Friss has\xE1b",CHICKEN:"Csirke",FISH:"Hal",MUFFINS_CAKE:"Muffin / s\xFCtem\xE9ny",MEAT_CHOPS:"H\xFAsszeletek",VEGETABLES:"Z\xF6lds\xE9g"},method_hint:{MANUAL:"Id\u0151, h\u0151m\xE9rs\xE9klet \xE9s leveg\u0151sebess\xE9g k\xE9zzel: 40\u2013200 \xB0C, 1\u2013180 perc.",AUTO_COOK:"A g\xE9p a t\xF6lt\xE9si szint \xE9s a k\xEDv\xE1nt elk\xE9sz\xFClts\xE9g alapj\xE1n sz\xE1mol mindent.",KEEP_WARM:"A k\xE9sz \xE9tel melegen tart\xE1sa.",RECIPE:"A NutriU alkalmaz\xE1sb\xF3l k\xFCld\xF6tt recept l\xE9p\xE9sei."},command:{power_on:"Bekapcsol\xE1s",power_off:"Kikapcsol\xE1s",start:"Ind\xEDt\xE1s",pause:"Sz\xFCnet",stop:"Le\xE1ll\xEDt\xE1s",keep_warm:"Melegen tart\xE1s"},alert:{drawer_open:"A fi\xF3k nyitva \u2013 a s\xFCt\xE9s sz\xFCnetel",drawer_open_idle:"A fi\xF3k nyitva van",shake:"R\xE1zd meg az \xE9telt!",flip:"Ford\xEDtsd meg az \xE9telt!",probe_required:"Ehhez a programhoz be kell dugni az \xE9telh\u0151m\xE9r\u0151t",probe_unplugged:"Az \xE9telh\u0151m\xE9r\u0151 nincs csatlakoztatva",resting:"Pihentet\xE9s \u2013 hagyd m\xE9g a k\xE9sz\xFCl\xE9kben",error:"Hibak\xF3d",user_action:"A k\xE9sz\xFCl\xE9k beavatkoz\xE1sra v\xE1r"},ui:{remaining:"H\xE1tral\xE9v\u0151 id\u0151",ready_at:"K\xE9sz",temperature:"H\u0151m\xE9rs\xE9klet",current_temp:"Aktu\xE1lis",target_temp:"C\xE9l",probe:"\xC9telh\u0151m\xE9r\u0151",probe_core:"Magh\u0151m\xE9rs\xE9klet",method:"\xC9telk\xE9sz\xEDt\xE9si m\xF3d",presets:"Saj\xE1t programok",autocook:"Auto-Cook program",recipe:"Recept",settings:"Be\xE1ll\xEDt\xE1sok",cook_time:"S\xFCt\xE9si id\u0151",airspeed:"Leveg\u0151sebess\xE9g",airspeed_low:"Alacsony",airspeed_high:"Magas",preheat:"El\u0151meleg\xEDt\xE9s",keep_warm:"Melegen tart\xE1s",details:"R\xE9szletek",drawer:"Fi\xF3k",drawer_open:"Nyitva",drawer_closed:"Z\xE1rva",total_time:"Teljes id\u0151",stage:"F\xE1zis",voltage:"Fesz\xFClts\xE9g",error_code:"Hibak\xF3d",on:"Be",off:"Ki",none:"Nincs",minute_short:"p",hour_short:"\xF3",finished:"Az \xE9tel elk\xE9sz\xFClt",finished_hint:"Kivehet\u0151",unavailable:"A k\xE9sz\xFCl\xE9k entit\xE1sai nem \xE9rhet\u0151k el",not_configured:"Nem tal\xE1lhat\xF3 Philips airfryer. Add meg a device vagy a prefix be\xE1ll\xEDt\xE1st a k\xE1rtya konfigur\xE1ci\xF3j\xE1ban.",core_temp_help:"Aj\xE1nlott magh\u0151m\xE9rs\xE9kletek",food:{poultry:"Baromfi",poultry_breast:"Baromfimell",beef:"Marha, borj\xFA, b\xE1r\xE1ny",pork:"Sert\xE9s",pork_chop:"Sert\xE9skaraj",fish:"Hal",potato:"Eg\xE9sz burgonya"},doneness:{done:"k\xE9sz",juicy:"szaftos",rare:"v\xE9res",medium:"k\xF6zepes",well_done:"j\xF3l \xE1ts\xFCtve",translucent:"\xE1ttetsz\u0151"}},editor:{device:"K\xE9sz\xFCl\xE9k",device_auto:"Automatikus felismer\xE9s",name:"N\xE9v",language:"Nyelv",language_auto:"Automatikus (HA nyelve)",sections:"Megjelen\xEDtett r\xE9szek",show_methods:"\xC9telk\xE9sz\xEDt\xE9si m\xF3dok",show_presets:"Saj\xE1t programok",show_settings:"H\u0151m\xE9rs\xE9klet \xE9s id\u0151 \xE1ll\xEDt\xE1sa",show_probe:"\xC9telh\u0151m\xE9r\u0151",show_details:"R\xE9szletek",show_controls:"Vez\xE9rl\u0151gombok",compact:"Kompakt n\xE9zet",animate:"Anim\xE1ci\xF3k"}},b5={card_name:"Airfryer",status:{STANDBY:"Standby",POWERSAVE:"Power save",MAINMENU:"Main menu",IDLE:"Ready to start",SETTING:"Setting up",PARASETTING:"Setting up",PRECOOK:"Preheating",COOKING:"Cooking",PAUSE:"Paused",USER_ACTION:"Action needed",MAINTAIN:"Keeping warm",FINISH:"Finished",PAIRING:"Pairing",UNKNOWN:"Unknown"},method:{MANUAL:"Manual",AUTO_COOK:"Auto-Cook",KEEP_WARM:"Keep warm",RECIPE:"Recipe",NO_SELECTION:"No selection",AIR_STEAM:"Air Steam",AIR_STEAM_PRO:"Air Steam Pro",STEAMING:"Steaming",ROAST:"Roast",BAKE:"Bake",GRILL:"Grill",SLOW_COOK:"Slow cook",STEW:"Stew",DEFROST:"Defrost",REHEAT:"Reheat",SOUS_VIDE:"Sous-vide",EASY_CLEAN:"Easy clean",USER_PRESET:"My preset",FROZEN_SNACKS:"Frozen snacks",FRESH_FRIES:"Fresh fries",CHICKEN:"Chicken",FISH:"Fish",MUFFINS_CAKE:"Muffins / cake",MEAT_CHOPS:"Meat chops",VEGETABLES:"Vegetables"},method_hint:{MANUAL:"Set time, temperature and air speed yourself: 40\u2013200 \xB0C, 1\u2013180 min.",AUTO_COOK:"The appliance works out every parameter from load and doneness.",KEEP_WARM:"Keeps finished food warm.",RECIPE:"Steps of a recipe sent from the NutriU app."},command:{power_on:"Turn on",power_off:"Turn off",start:"Start",pause:"Pause",stop:"Stop",keep_warm:"Keep warm"},alert:{drawer_open:"Drawer is open \u2013 cooking is paused",drawer_open_idle:"The drawer is open",shake:"Shake the food!",flip:"Flip the food!",probe_required:"This program needs the food probe plugged in",probe_unplugged:"The food probe is unplugged",resting:"Resting \u2013 leave the food inside",error:"Error code",user_action:"The appliance is waiting for you"},ui:{remaining:"Remaining",ready_at:"Ready at",temperature:"Temperature",current_temp:"Current",target_temp:"Target",probe:"Food probe",probe_core:"Core temperature",method:"Cooking method",presets:"My presets",autocook:"Auto-Cook program",recipe:"Recipe",settings:"Settings",cook_time:"Cook time",airspeed:"Air speed",airspeed_low:"Low",airspeed_high:"High",preheat:"Preheat",keep_warm:"Keep warm",details:"Details",drawer:"Drawer",drawer_open:"Open",drawer_closed:"Closed",total_time:"Total time",stage:"Stage",voltage:"Voltage",error_code:"Error code",on:"On",off:"Off",none:"None",minute_short:"m",hour_short:"h",finished:"The food is ready",finished_hint:"Ready to serve",unavailable:"The appliance entities are unavailable",not_configured:"No Philips airfryer found. Set the device or prefix option in the card configuration.",core_temp_help:"Recommended core temperatures",food:{poultry:"Poultry",poultry_breast:"Poultry breast",beef:"Beef, veal, lamb",pork:"Pork",pork_chop:"Pork chop",fish:"Fish",potato:"Whole potato"},doneness:{done:"done",juicy:"juicy",rare:"rare",medium:"medium",well_done:"well done",translucent:"translucent"}},editor:{device:"Device",device_auto:"Auto detect",name:"Name",language:"Language",language_auto:"Automatic (HA language)",sections:"Visible sections",show_methods:"Cooking methods",show_presets:"My presets",show_settings:"Temperature and time controls",show_probe:"Food probe",show_details:"Details",show_controls:"Control buttons",compact:"Compact layout",animate:"Animations"}},L5={hu:w5,en:b5},c1=Object.keys(L5);function o1(M,C){return X(M,C,c1)}function A1(M){return J(L5,M)}var M5={domain:"sensor",suffix:"cooking_status",key:"status"},T5={status:["sensor","cooking_status"],target_temp:["sensor","target_temperature"],current_temp:["sensor","current_temperature"],total_time:["sensor","total_cook_time"],remaining:["sensor","time_remaining"],preset:["sensor","preset"],recipe:["sensor","recipe"],error:["sensor","error_code"],preheat_status:["sensor","preheat_status"],keep_warm_status:["sensor","keep_warm"],airspeed:["sensor","air_speed"],probe_target:["sensor","probe_temperature"],probe_current:["sensor","current_probe_temperature"],dialog:["sensor","dialog"],stage:["sensor","current_stage"],voltage:["sensor","voltage"],drawer:["binary_sensor","drawer"],shake:["binary_sensor","shake_reminder"],flip:["binary_sensor","flip_reminder"],preheat_active:["binary_sensor","preheat_active"],probe_unplugged:["binary_sensor","probe_unplugged"],probe_required:["binary_sensor","probe_required"],resting:["binary_sensor","resting"],btn_start:["button","start_cooking"],btn_pause:["button","pause"],btn_stop:["button","stop"],btn_keep_warm:["button","keep_warm"],num_temp:["number","set_temperature"],num_time:["number","set_cook_time"],num_airspeed:["number","set_air_speed"],num_probe:["number","set_probe_temperature"],num_keep_warm_time:["number","keep_warm_duration"],num_keep_warm_temp:["number","keep_warm_temperature"],sel_method:["select","cooking_method"],sel_preset:["select","my_presets"],sel_autocook:["select","autocook_program"],power:["switch","power"],sw_preheat:["switch","preheat"]};function B5(M,C){return V1(M,C,M5)}function r5(M,C){let H=B5(M,C),V=L1(M,C,T5,H);return V.prefix=H,V}function p1(M){return M1(M,M5)}function h(M){if(s(M))return null;let C=Number(M.state);return Number.isFinite(C)?C:null}function e5(M){let C=h(M);if(C===null||C<0)return null;let H=(M.attributes?.unit_of_measurement||"s").toLowerCase();return Math.round(H==="min"||H==="m"?C*60:H==="h"?C*3600:C)}function d1(M,C){if(!M)return null;let H=M.attributes||{};return{value:h(M),min:Number.isFinite(H.min)?H.min:C.min,max:Number.isFinite(H.max)?H.max:C.max,step:Number.isFinite(H.step)?H.step:C.step,unit:H.unit_of_measurement||""}}function t5(M){let C=M?.attributes?.options;return Array.isArray(C)?C:[]}function c(M){return M?.state==="on"}function P5(M){if(s(M))return null;let C=String(M.state).trim();return!C||C==="0"||/^(none|no|off|ok)$/i.test(C)?null:C}function i5(M,C){let H=r5(M,C),V=b=>H[b]?M.states[H[b]]:void 0,L=V("status");if(!H.prefix||!L)return{ok:!1,reason:H.prefix?"unavailable":"not_configured",entities:H};let r=l(L.state),e=r in o?r:o.UNKNOWN,A=V("sel_method"),i=l(A?.state),p=G[i]?i:null,m=e5(V("remaining")),n=e5(V("total_time")),O=R.includes(e),u=F.includes(e)&&m!==null&&n?Math.min(1,Math.max(0,1-m/n)):e===o.FINISH?1:0,S=h(V("current_temp")),D=h(V("target_temp")),K=V("current_temp")?.attributes?.unit_of_measurement||"\xB0C",Y=V("probe_unplugged")?!c(V("probe_unplugged")):!1,y=h(V("probe_current")),N=h(V("probe_target")),_=V("drawer"),w=_?c(_):null,f=O&&m!==null&&m>0?new Date(Date.now()+m*1e3):null,I=V("recipe")?.state,j=V("keep_warm_status")?.state,q=V("preheat_status")?.state;return{ok:!0,entities:H,status:e,accent:q2[e]||"idle",power:V("power")?c(V("power")):e!==o.STANDBY,method:p,methodRaw:A?.state||null,methodOptions:t5(A).map(b=>({label:b,key:l(b)})),presetOptions:t5(V("sel_preset")),presetSelected:V("sel_preset")?.state||null,autocookSelected:V("sel_autocook")?.state||null,steam:J2.includes(p),remaining:m,total:n,progress:u,finishAt:f,currentTemp:S,targetTemp:D,tempUnit:K,heating:O&&S!==null&&D?S<D-2:!1,probe:{plugged:Y,required:c(V("probe_required")),current:y,target:N,progress:Y&&y!==null&&N?Math.min(1,Math.max(0,y/N)):0},drawerOpen:w,shake:c(V("shake")),flip:c(V("flip")),resting:c(V("resting")),preheatActive:c(V("preheat_active")),preheatStatus:q&&!s(V("preheat_status"))?q:null,preheatEnabled:V("sw_preheat")?c(V("sw_preheat")):null,keepWarm:j&&!s(V("keep_warm_status"))?j:null,recipe:I&&!s(V("recipe"))&&I!=="unknown"?I:null,stage:h(V("stage")),voltage:h(V("voltage")),error:P5(V("error")),controls:{temperature:d1(V("num_temp"),Q.temperature),time:d1(V("num_time"),Q.time),airspeed:d1(V("num_airspeed"),Q.airspeed),probe:d1(V("num_probe"),Q.probe)},airspeed:h(V("airspeed")),name:C.name||L.attributes?.friendly_name?.replace(/\s*Cooking Status$/i,"")||null}}function a5(){return`
  <svg class="fryer" viewBox="0 0 200 206" role="img" aria-hidden="true">
    <defs>
      <linearGradient id="af-body" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="var(--af-body-1)"/>
        <stop offset="100%" stop-color="var(--af-body-2)"/>
      </linearGradient>
      <linearGradient id="af-cavity" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="var(--af-cavity-1)"/>
        <stop offset="100%" stop-color="var(--af-cavity-2)"/>
      </linearGradient>
      <linearGradient id="af-glass" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#ffffff" stop-opacity=".20"/>
        <stop offset="50%" stop-color="#ffffff" stop-opacity=".04"/>
        <stop offset="100%" stop-color="#000000" stop-opacity=".14"/>
      </linearGradient>
      <radialGradient id="af-heat" cx="50%" cy="0%" r="90%">
        <stop offset="0%" stop-color="var(--af-heat)" stop-opacity=".85"/>
        <stop offset="100%" stop-color="var(--af-heat)" stop-opacity="0"/>
      </radialGradient>
      <clipPath id="af-cavity-clip">
        <rect x="26" y="58" width="148" height="112" rx="12"/>
      </clipPath>
    </defs>

    <!-- body -->
    <rect class="shell" x="8" y="10" width="184" height="188" rx="22"/>

    <!-- control panel -->
    <g class="panel">
      <rect class="display" x="28" y="22" width="88" height="26" rx="8"/>
      <text class="display-main" x="40" y="40">--:--</text>
      <text class="display-sub" x="108" y="40" text-anchor="end">--\xB0</text>
      <circle class="knob" cx="152" cy="35" r="15"/>
      <circle class="knob-dot" cx="152" cy="26" r="2.6"/>
      <circle class="wifi-led" cx="128" cy="35" r="3"/>
    </g>

    <!-- cooking chamber -->
    <g class="cavity">
      <rect class="cavity-body" x="26" y="58" width="148" height="112" rx="12"/>
      <g clip-path="url(#af-cavity-clip)">
        <rect class="heat-glow" x="26" y="58" width="148" height="112"/>

        <!-- heating element + fan -->
        <g class="heater">
          <path d="M40 74h120" />
          <path d="M46 82h108" />
        </g>
        <g class="fan">
          <circle class="fan-hub" cx="100" cy="78" r="4"/>
          <g class="fan-blades">
            <path d="M100 78c0-9 5-14 12-14 3 6 0 14-12 14z"/>
            <path d="M100 78c9 0 14 5 14 12-6 3-14 0-14-12z"/>
            <path d="M100 78c0 9-5 14-12 14-3-6 0-14 12-14z"/>
            <path d="M100 78c-9 0-14-5-14-12 6-3 14 0 14 12z"/>
          </g>
        </g>

        <!-- rising heat and steam -->
        <g class="heatwaves">
          <path d="M62 132c7-9-7-16 0-25"/>
          <path d="M100 128c7-9-7-16 0-25"/>
          <path d="M138 132c7-9-7-16 0-25"/>
        </g>
        <g class="steam">
          <path d="M76 126c8-11-8-20 0-31"/>
          <path d="M100 120c8-11-8-20 0-31"/>
          <path d="M124 126c8-11-8-20 0-31"/>
        </g>
        <g class="sparkles">
          <path d="M60 100l2.2 5.2L67 107l-5 2-2 5-2-5-5-2 5-2z"/>
          <path d="M142 112l1.8 4.4 4.4 1.8-4.4 1.8-1.8 4.4-1.8-4.4-4.4-1.8 4.4-1.8z"/>
        </g>
      </g>
    </g>

    <!-- drawer: slides out and down, revealing the basket from above -->
    <rect class="drawer-gap" x="26" y="126" width="148" height="52" rx="10"/>
    <g class="drawer">
      <g class="basket-top">
        <ellipse class="basket-rim" cx="100" cy="126" rx="66" ry="14"/>
        <ellipse class="basket-inner" cx="100" cy="127" rx="58" ry="10"/>
        <g class="food-top">
          <ellipse cx="74" cy="126" rx="9" ry="5"/>
          <ellipse cx="92" cy="129" rx="8" ry="4.5"/>
          <ellipse cx="110" cy="125" rx="9" ry="5"/>
          <ellipse cx="127" cy="128" rx="8" ry="4.5"/>
        </g>
      </g>
      <rect class="drawer-body" x="26" y="128" width="148" height="56" rx="12"/>
      <rect class="drawer-seam" x="26" y="128" width="148" height="2" rx="1"/>
      <rect class="drawer-window" x="38" y="136" width="124" height="30" rx="8"/>
      <g class="food">
        <rect x="52" y="146" width="18" height="11" rx="5"/>
        <rect x="74" y="143" width="14" height="14" rx="6"/>
        <rect x="92" y="147" width="20" height="10" rx="5"/>
        <rect x="116" y="144" width="15" height="13" rx="6"/>
        <rect x="135" y="147" width="17" height="10" rx="5"/>
      </g>
      <rect class="handle" x="60" y="172" width="80" height="7" rx="3.5"/>
    </g>

    <!-- probe socket -->
    <g class="probe">
      <circle class="probe-socket" cx="180" cy="96" r="6"/>
      <path class="probe-cable" d="M180 96c14 6 14 22 4 30"/>
    </g>
  </svg>`}function o5(M,C,H){let V=M.querySelector(".display-main"),L=M.querySelector(".display-sub");V&&V.textContent!==C&&(V.textContent=C),L&&L.textContent!==H&&(L.textContent=H)}var R5=`
:host {
  --af-body-1: color-mix(in srgb, var(--card-background-color, #fff) 90%, var(--primary-text-color, #000) 10%);
  --af-body-2: color-mix(in srgb, var(--card-background-color, #fff) 72%, var(--primary-text-color, #000) 28%);
  --af-cavity-1: color-mix(in srgb, var(--card-background-color, #fff) 48%, #241207 52%);
  --af-cavity-2: color-mix(in srgb, var(--card-background-color, #fff) 30%, #150a03 70%);
  --af-heat: #ff7043;
}

/* ---------- gauges ---------- */
.gauges { display: grid; gap: 10px; }
.gauge { display: grid; gap: 5px; }
.gauge .top { display: flex; align-items: center; gap: 6px; font-size: .78rem; color: var(--ap-muted); }
.gauge .top .icon { width: 15px; height: 15px; }
.gauge .top .val { margin-left: auto; color: var(--ap-text); font-weight: 600; font-variant-numeric: tabular-nums; }
.gauge .top .val b { font-size: .95rem; }
.gauge .track { height: 6px; border-radius: 999px; background: var(--ap-line); overflow: hidden; }
.gauge .track > i { display: block; height: 100%; border-radius: 999px; transition: width .8s ease; }
.gauge.heat .track > i { background: linear-gradient(90deg, #ffb74d, var(--af-heat)); }
.gauge.probe .track > i { background: linear-gradient(90deg, #81c784, #43a047); }

/* ---------- steppers ---------- */
.steppers { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 10px; }
.stepper {
  display: grid; gap: 6px; padding: 10px 12px; border-radius: 14px;
  background: color-mix(in srgb, var(--ap-text) 5%, transparent);
}
.stepper .label { font-size: .7rem; text-transform: uppercase; letter-spacing: .05em; color: var(--ap-muted); }
.stepper .row { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
.stepper .value { font-size: 1.1rem; font-weight: 700; color: var(--ap-text); font-variant-numeric: tabular-nums; }
.step-btn {
  width: 32px; height: 32px; border-radius: 10px; cursor: pointer; flex: 0 0 auto;
  border: 1px solid var(--ap-line); background: transparent; color: var(--ap-text);
  font: inherit; font-size: 1.05rem; font-weight: 700; line-height: 1;
  display: inline-flex; align-items: center; justify-content: center;
  transition: border-color .2s ease, transform .1s ease;
}
.step-btn:hover:not([disabled]) { border-color: var(--ap-accent); }
.step-btn:active:not([disabled]) { transform: scale(.94); }
.step-btn[disabled] { opacity: .35; cursor: not-allowed; }

.core-temps { font-size: .74rem; color: var(--ap-muted); }
.core-temps > summary {
  cursor: pointer; font-size: .72rem; font-weight: 700; letter-spacing: .05em;
  text-transform: uppercase; color: var(--ap-muted); padding: 4px 0;
}
.core-temps[open] > summary { margin-bottom: 4px; }
.core-temps .row { display: flex; justify-content: space-between; gap: 10px; padding: 1px 0; }
.core-temps .row b { color: var(--ap-text); font-weight: 600; }

/* ---------- appliance illustration ---------- */
.fryer { width: 100%; height: auto; overflow: visible; }
.fryer .shell { fill: url(#af-body); stroke: var(--ap-line); stroke-width: 1.2; }
.fryer .display { fill: color-mix(in srgb, #07131c 84%, var(--card-background-color, #fff)); }
.fryer .display-main, .fryer .display-sub {
  fill: var(--ap-accent); font-weight: 700; font-variant-numeric: tabular-nums;
  font-family: var(--paper-font-body1_-_font-family, inherit);
}
.fryer .display-main { font-size: 13px; }
.fryer .display-sub { font-size: 10px; opacity: .85; }
.fryer .knob { fill: color-mix(in srgb, var(--ap-text) 16%, transparent); }
.fryer .knob-dot { fill: var(--ap-accent); }
.fryer .wifi-led { fill: var(--ap-accent); opacity: .7; }
.fryer .cavity-body { fill: url(#af-cavity); }
.fryer .heat-glow { fill: url(#af-heat); opacity: 0; transition: opacity .6s ease; }
.fryer .heater path {
  stroke: color-mix(in srgb, #ffffff 35%, transparent); stroke-width: 3.4; stroke-linecap: round; fill: none;
  transition: stroke .6s ease;
}
.fryer .fan-hub { fill: color-mix(in srgb, #ffffff 55%, transparent); }
.fryer .fan-blades path { fill: color-mix(in srgb, #ffffff 34%, transparent); }
.fryer .fan-blades { transform-box: view-box; transform-origin: 100px 78px; }
.fryer .heatwaves path, .fryer .steam path {
  stroke-width: 2.6; stroke-linecap: round; fill: none; opacity: 0;
}
.fryer .heatwaves path { stroke: var(--af-heat); }
.fryer .steam path { stroke: color-mix(in srgb, #ffffff 62%, transparent); }
.fryer .sparkles path { fill: var(--success-color, #43a047); opacity: 0; }
.fryer .drawer {
  transform-box: view-box; transform-origin: 100px 156px;
  transition: transform .6s cubic-bezier(.4, 0, .2, 1);
}
.fryer .drawer-gap { fill: #05080b; opacity: 0; transition: opacity .4s ease; }
.fryer .drawer-seam { fill: color-mix(in srgb, var(--ap-text) 16%, transparent); opacity: .7; }
.fryer .basket-top { opacity: 0; transition: opacity .35s ease; }
.fryer .basket-rim { fill: color-mix(in srgb, var(--ap-text) 26%, var(--card-background-color, #fff)); }
.fryer .basket-inner { fill: #241207; }
.fryer .food-top ellipse { fill: #d8a55f; transition: fill .8s ease; }
.fryer .drawer-body { fill: url(#af-body); stroke: var(--ap-line); stroke-width: 1.2; }
.fryer .drawer-window { fill: url(#af-glass); stroke: color-mix(in srgb, var(--ap-text) 12%, transparent); }
.fryer .food rect { fill: #d8a55f; transition: fill .8s ease; }
.fryer .handle { fill: color-mix(in srgb, var(--ap-text) 22%, transparent); }
.fryer .probe-socket { fill: color-mix(in srgb, var(--ap-text) 20%, transparent); }
.fryer .probe-cable { stroke: var(--ap-muted); stroke-width: 2; fill: none; opacity: 0; transition: opacity .3s ease; }

/* state driven behaviour */
.probe-plugged .fryer .probe-socket { fill: var(--success-color, #43a047); }
.probe-plugged .fryer .probe-cable { opacity: .8; }

.heating .fryer .heat-glow { opacity: 1; }
.heating .fryer .heater path { stroke: var(--af-heat); animation: glow 2.4s ease-in-out infinite; }

.cooking .fryer .fan-blades { animation: spin 1.1s linear infinite; }
.cooking .fryer .heatwaves path { animation: rise 2.6s ease-in-out infinite; }
.cooking .fryer .heatwaves path:nth-child(2) { animation-delay: .5s; }
.cooking .fryer .heatwaves path:nth-child(3) { animation-delay: 1s; }
.cooking .fryer .food rect, .cooking .fryer .food-top ellipse { fill: #c07f33; }
.cooking .fryer .wifi-led { animation: blink 2.4s ease-in-out infinite; }

.preheat .fryer .fan-blades { animation: spin 1.6s linear infinite; }

.steam-mode .fryer .steam path { animation: rise 3.2s ease-in-out infinite; }
.steam-mode .fryer .steam path:nth-child(2) { animation-delay: .7s; }
.steam-mode .fryer .steam path:nth-child(3) { animation-delay: 1.4s; }
.steam-mode .fryer .heatwaves path { animation: none; opacity: 0; }

.paused .fryer .fan-blades { animation: spin 5s linear infinite; }
.paused .fryer .heatwaves path { animation: none; opacity: .18; }

.done .fryer .food rect, .done .fryer .food-top ellipse { fill: #a75f22; }
.done .fryer .sparkles path { animation: twinkle 2.4s ease-in-out infinite; }
.done .fryer .sparkles path:nth-child(2) { animation-delay: .8s; }

.off .fryer { filter: saturate(.3); }
.off .fryer .display-main, .off .fryer .display-sub { fill: color-mix(in srgb, var(--ap-muted) 55%, transparent); }
.off .fryer .wifi-led { fill: color-mix(in srgb, var(--ap-muted) 50%, transparent); }

/* pulled out: the drawer comes down and toward the viewer, basket visible */
.drawer-open .fryer .drawer {
  transform: translateY(30px) scale(1.07);
  filter: drop-shadow(0 8px 12px rgba(0, 0, 0, .3));
}
.drawer-open .fryer .basket-top { opacity: 1; }
.drawer-open .fryer .drawer-seam { opacity: 0; }
.drawer-open .fryer .drawer-gap { opacity: 1; }
.drawer-open .fryer .heat-glow { opacity: .35; }

/* shake / flip reminder */
.shake-now:not(.drawer-open) .fryer .drawer { animation: shake .7s ease-in-out infinite; }
.shake-now .fryer .drawer-body { stroke: var(--ap-accent); stroke-width: 2; }
.shake-now .fryer .drawer-window { animation: glow 1.2s ease-in-out infinite; }
.shake-now .fryer .food rect { animation: hop .5s ease-in-out infinite; }
.shake-now .fryer .food rect:nth-child(2) { animation-delay: .08s; }
.shake-now .fryer .food rect:nth-child(3) { animation-delay: .16s; }
.shake-now .fryer .food rect:nth-child(4) { animation-delay: .24s; }
.shake-now .fryer .food rect:nth-child(5) { animation-delay: .32s; }
.shake-now .fryer .food-top ellipse { animation: hop .5s ease-in-out infinite; }
.shake-now .fryer .food-top ellipse:nth-child(2) { animation-delay: .1s; }
.shake-now .fryer .food-top ellipse:nth-child(3) { animation-delay: .2s; }
.shake-now .fryer .food-top ellipse:nth-child(4) { animation-delay: .3s; }

@keyframes spin { to { transform: rotate(360deg); } }
@keyframes blink { 0%, 100% { opacity: .8; } 50% { opacity: .2; } }
@keyframes glow { 0%, 100% { opacity: .75; } 50% { opacity: 1; } }
@keyframes rise {
  0% { opacity: 0; transform: translateY(8px) scale(.92); }
  40% { opacity: .8; }
  100% { opacity: 0; transform: translateY(-18px) scale(1.05); }
}
@keyframes twinkle {
  0%, 100% { opacity: 0; transform: scale(.7); }
  50% { opacity: 1; transform: scale(1); }
}
@keyframes shake {
  0%, 100% { transform: translateX(0) rotate(0deg); }
  20% { transform: translateX(-5px) rotate(-1.2deg); }
  60% { transform: translateX(5px) rotate(1.2deg); }
}
@keyframes hop {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-3px); }
}
`,A5=e1+R5;var O1={language:"auto",compact:!1,animate:!0,show_methods:!0,show_presets:!0,show_settings:!0,show_probe:!0,show_details:!0,show_controls:!0};function p5(M,C){if(M==null)return null;let H=Math.max(0,Math.round(M));if(H>=3600){let r=Math.floor(H/3600),e=Math.round(H%3600/60);return{value:`${r}:${String(e).padStart(2,"0")}`,unit:C("ui.hour_short")}}let V=Math.floor(H/60),L=H%60;return{value:`${V}:${String(L).padStart(2,"0")}`,unit:C("ui.minute_short")}}var h1=class extends HTMLElement{static getConfigElement(){return document.createElement($)}static getStubConfig(C){let H=p1(C);return{type:`custom:${k}`,device:H[0]?.id}}constructor(){super(),this.attachShadow({mode:"open"}),this._sections={},this._signatures={},this._built=!1}setConfig(C){this._config={...O1,...C||{}},this._signatures={},this._hass&&this._render()}set hass(C){this._hass=C,this._render()}get hass(){return this._hass}connectedCallback(){this._timer=window.setInterval(()=>this._render(),3e4)}disconnectedCallback(){this._timer&&window.clearInterval(this._timer),this._timer=void 0}getCardSize(){return this._config?.compact?5:8}getGridOptions(){return{columns:12,min_columns:6,rows:this._config?.compact?6:"auto"}}_build(){let C=document.createElement("style");C.textContent=A5;let H=document.createElement("ha-card"),V=document.createElement("div");V.className="wrap",V.addEventListener("click",L=>this._onClick(L));for(let L of["header","hero","alerts","gauges","methods","presets","settings","controls","details"]){let r=document.createElement("div");r.dataset.section=L,this._sections[L]=r,V.appendChild(r)}H.appendChild(V),this.shadowRoot.replaceChildren(C,H),this._wrap=V,this._built=!0}_render(){if(!this._hass||!this._config)return;this._built||this._build();let C=A1(o1(this._config,this._hass)),H=i5(this._hass,this._config);if(this._model=H,!H.ok){this._renderEmpty(H,C);return}this._emptyShown=!1,this._applyHostClasses(H),this._section("header",this._headerHtml(H,C)),this._heroSection(H,C),this._section("alerts",this._alertsHtml(H,C)),this._section("gauges",this._gaugesHtml(H,C)),this._section("methods",this._config.show_methods?this._methodsHtml(H,C):""),this._section("presets",this._config.show_presets?this._presetsHtml(H,C):""),this._section("settings",this._config.show_settings?this._settingsHtml(H,C):""),this._section("controls",this._config.show_controls?this._controlsHtml(H,C):""),this._section("details",this._config.show_details?this._detailsHtml(H,C):"")}_renderEmpty(C,H){if(this._emptyShown!==C.reason){this._emptyShown=C.reason,this._signatures={};for(let V of Object.values(this._sections))V.innerHTML="";this._sections.header.innerHTML=`
      <div class="empty">
        ${d("fryer")}
        <div>${t(H(`ui.${C.reason}`))}</div>
      </div>`}}_section(C,H){this._signatures[C]!==H&&(this._signatures[C]=H,this._sections[C].innerHTML=H)}_applyHostClasses(C){let H=["wrap"];this._config.compact&&H.push("compact"),this._config.animate||H.push("no-animation"),H.push(`accent-${C.accent}`),C.status===o.COOKING&&H.push("cooking","busy"),C.status===o.PRECOOK&&H.push("preheat","busy","heating"),C.status===o.MAINTAIN&&H.push("cooking"),(C.status===o.PAUSE||C.status===o.USER_ACTION)&&H.push("paused"),C.status===o.FINISH&&H.push("done"),[o.STANDBY,o.POWERSAVE].includes(C.status)&&H.push("off"),C.heating&&R.includes(C.status)&&H.push("heating"),C.steam&&R.includes(C.status)&&H.push("steam-mode"),C.drawerOpen&&H.push("drawer-open"),C.probe.plugged&&H.push("probe-plugged"),(C.shake||C.flip)&&H.push("shake-now");let V=H.join(" ");this._wrap.className!==V&&(this._wrap.className=V)}_headerHtml(C,H){let V=t(C.name||H("card_name")),L=C.recipe||(C.method?H(`method.${C.method}`):""),r=[];return C.drawerOpen&&r.push(`<span class="warn" title="${H("ui.drawer")}: ${H("ui.drawer_open")}">${d("drawer")}</span>`),C.probe.plugged&&r.push(`<span title="${H("ui.probe")}">${d("probe")}</span>`),C.error&&r.push(`<span class="bad" title="${H("alert.error")} ${C.error}">${d("error")}</span>`),`
      <div class="header">
        <div>
          <div class="title" data-action="more-info">${V}</div>
          ${L?`<div class="sub">${t(L)}</div>`:""}
        </div>
        <div class="spacer"></div>
        <div class="badges">${r.join("")}</div>
        <div class="pill">${d(this._statusIcon(C))}${t(H(`status.${C.status}`))}</div>
      </div>`}_statusIcon(C){switch(C.status){case o.COOKING:return"heat";case o.PRECOOK:return"temperature";case o.PAUSE:return"pause";case o.USER_ACTION:return"alert";case o.MAINTAIN:return"warm";case o.FINISH:return"check";case o.IDLE:case o.SETTING:case o.PARASETTING:return"play";default:return"power"}}_heroSection(C,H){this._sections.hero.querySelector(".fryer")||(this._sections.hero.innerHTML=`
        <div class="hero">
          <div class="fryer-wrap" data-action="more-info">${a5()}</div>
          <div class="status"></div>
        </div>`,this._statusNode=this._sections.hero.querySelector(".status"));let V=this._statusHtml(C,H);this._signatures.status!==V&&(this._signatures.status=V,this._statusNode.innerHTML=V);let L=p5(C.remaining,H),r=F.includes(C.status)&&L&&C.remaining>0;o5(this._sections.hero,C.status===o.STANDBY||C.status===o.POWERSAVE?"":r?L.value:"--:--",C.currentTemp!==null&&C.status!==o.STANDBY?`${Math.round(C.currentTemp)}\xB0`:"")}_statusHtml(C,H){let V=[],L=C.status===o.PRECOOK&&C.targetTemp?`<span class="phase-text">${Math.round(C.targetTemp)} ${t(C.tempUnit)}</span>`:C.resting?`<span class="phase-text">${t(H("alert.resting"))}</span>`:"";V.push(`
      <div class="status-line">
        <span class="state-text">${t(H(`status.${C.status}`))}</span>
        ${L}
      </div>`),(C.method||C.recipe)&&V.push(`
        <div class="program-line">
          ${d(G[C.method]?.icon||"manual")}
          <span>${t(C.recipe||H(`method.${C.method}`))}</span>
        </div>`);let r=p5(C.remaining,H);if(F.includes(C.status)&&r&&C.remaining>0){let e=C.finishAt?`<span class="at">${d("clock")}${t(H("ui.ready_at"))} ${P(C.finishAt,this._hass)}</span>`:"";V.push(`
        <div class="countdown">
          <span class="value">${r.value}</span><span class="unit">${r.unit}</span>${e}
        </div>`)}else C.status===o.FINISH?V.push(`
        <div class="countdown">
          <span class="at">${d("check")}${t(H("ui.finished_hint"))}</span>
        </div>`):C.controls.temperature?.value&&C.controls.time?.value&&V.push(`
        <div class="countdown">
          <span class="value">${Math.round(C.controls.temperature.value)}\xB0</span>
          <span class="unit">${t(C.tempUnit.replace("\xB0",""))}</span>
          <span class="at">${d("timer")}${Math.round(C.controls.time.value)} ${t(H("ui.minute_short"))}</span>
        </div>`);return(F.includes(C.status)||C.status===o.FINISH)&&V.push(`<div class="bar"><i style="width:${Math.round(C.progress*100)}%"></i></div>`),V.join("")}_alertsHtml(C,H){let V=[];if(C.error&&V.push({severity:"error",text:`${H("alert.error")}: ${C.error}`,iconName:"error"}),C.drawerOpen){let L=R.includes(C.status);V.push({severity:L?"warning":"info",text:H(L?"alert.drawer_open":"alert.drawer_open_idle"),iconName:"drawer",pulse:L})}return C.shake&&V.push({severity:"warning",text:H("alert.shake"),iconName:"shake",pulse:!0}),C.flip&&V.push({severity:"warning",text:H("alert.flip"),iconName:"flip",pulse:!0}),C.status===o.USER_ACTION&&!C.shake&&!C.flip&&V.push({severity:"warning",text:H("alert.user_action"),iconName:"alert",pulse:!0}),C.probe.required&&!C.probe.plugged&&V.push({severity:"warning",text:H("alert.probe_required"),iconName:"probe"}),C.resting&&V.push({severity:"info",text:H("alert.resting"),iconName:"timer"}),V.length?`<div class="alerts">${V.map(L=>`<div class="alert ${L.severity}${L.pulse?" pulse":""}">${d(L.iconName)}<span>${t(L.text)}</span></div>`).join("")}</div>`:""}_gaugesHtml(C,H){let V=[],L=t(C.tempUnit);if(C.currentTemp!==null||C.targetTemp!==null){let r=C.currentTemp!==null&&C.targetTemp?Math.min(1,Math.max(0,C.currentTemp/C.targetTemp)):0,e=C.targetTemp!==null&&C.targetTemp>0?`<b>${Math.round(C.currentTemp??0)}</b> / ${Math.round(C.targetTemp)} ${L}`:`<b>${Math.round(C.currentTemp??0)}</b> ${L}`;V.push(`
        <div class="gauge heat">
          <div class="top">${d("temperature")}<span>${t(H("ui.temperature"))}</span>
            <span class="val">${e}</span></div>
          <div class="track"><i style="width:${Math.round(r*100)}%"></i></div>
        </div>`)}if(this._config.show_probe&&C.probe.plugged){let r=C.probe.target?`<b>${Math.round(C.probe.current??0)}</b> / ${Math.round(C.probe.target)} ${L}`:`<b>${Math.round(C.probe.current??0)}</b> ${L}`;V.push(`
        <div class="gauge probe">
          <div class="top">${d("probe")}<span>${t(H("ui.probe_core"))}</span>
            <span class="val">${r}</span></div>
          <div class="track"><i style="width:${Math.round(C.probe.progress*100)}%"></i></div>
        </div>`)}return V.length?`<div class="gauges">${V.join("")}</div>`:""}_methodsHtml(C,H){if(!C.entities.sel_method||!C.methodOptions.length)return"";let V=i1.includes(C.status),L=C.methodOptions.map(e=>{let A=G[e.key],i=A?H(`method.${e.key}`):e.label,p=H(`method_hint.${e.key}`,"");return`<button class="chip" type="button" data-action="method" data-value="${t(e.label)}"
        aria-pressed="${e.key===C.method}" ${p?`title="${t(p)}"`:""}
        ${V?"":"disabled"}>
        ${d(A?.icon||"manual")}<span>${t(i)}</span></button>`}),r=C.method?t(H(`method_hint.${C.method}`,"")):"";return`
      <div class="section">
        <div class="section-title">${t(H("ui.method"))}</div>
        <div class="chips">${L.join("")}</div>
        ${r?`<div class="note">${r}</div>`:""}
      </div>`}_presetsHtml(C,H){if(!C.entities.sel_preset||!C.presetOptions.length)return"";let V=i1.includes(C.status),L=C.presetOptions.map(r=>`<button class="chip" type="button" data-action="preset" data-value="${t(r)}"
        aria-pressed="${r===C.presetSelected}" ${V?"":"disabled"}>
        ${d("star")}<span>${t(r)}</span></button>`);return`
      <div class="section">
        <div class="section-title">${t(H("ui.presets"))}</div>
        <div class="chips">${L.join("")}</div>
      </div>`}_settingsHtml(C,H){let V=i1.includes(C.status)||C.status===o.PAUSE,L=[],r=(i,p,m,n,O)=>{if(!m||!C.entities[O])return"";let Z=m.value??m.min,u=V&&Z>m.min,S=V&&Z<m.max;return`
        <div class="stepper">
          <span class="label">${t(p)}</span>
          <div class="row">
            <button class="step-btn" type="button" data-action="step" data-value="${i}" data-dir="-1"
              ${u?"":"disabled"} aria-label="\u2212">\u2212</button>
            <span class="value">${Math.round(Z)}${t(n)}</span>
            <button class="step-btn" type="button" data-action="step" data-value="${i}" data-dir="1"
              ${S?"":"disabled"} aria-label="+">+</button>
          </div>
        </div>`},e=[r("temperature",H("ui.temperature"),C.controls.temperature,` ${C.tempUnit}`,"num_temp"),r("time",H("ui.cook_time"),C.controls.time,` ${H("ui.minute_short")}`,"num_time"),C.probe.plugged?r("probe",H("ui.probe_core"),C.controls.probe,` ${C.tempUnit}`,"num_probe"):""].filter(Boolean);e.length&&L.push(`<div class="steppers">${e.join("")}</div>`);let A=[];if(C.entities.num_temp&&A.push(...H5.map(i=>`<button class="chip" type="button" data-action="set" data-value="temperature:${i}"
            aria-pressed="${Math.round(C.controls.temperature?.value??-1)===i}" ${V?"":"disabled"}>
            ${d("temperature")}<span>${i}\xB0</span></button>`)),C.entities.num_time&&A.push(...V5.filter(i=>i<=(C.controls.time?.max??60)).map(i=>`<button class="chip" type="button" data-action="set" data-value="time:${i}"
            aria-pressed="${Math.round(C.controls.time?.value??-1)===i}" ${V?"":"disabled"}>
            ${d("timer")}<span>${i} ${t(H("ui.minute_short"))}</span></button>`)),C.entities.num_airspeed){let i=C.controls.airspeed?.value;A.push(`<button class="chip" type="button" data-action="set" data-value="airspeed:1"
          aria-pressed="${i===1}" ${V?"":"disabled"}>
          ${d("fan")}<span>${t(H("ui.airspeed_low"))}</span></button>`,`<button class="chip" type="button" data-action="set" data-value="airspeed:2"
          aria-pressed="${i===2}" ${V?"":"disabled"}>
          ${d("fan")}<span>${t(H("ui.airspeed_high"))}</span></button>`)}if(A.length&&L.push(`<div class="chips">${A.join("")}</div>`),this._config.show_probe&&C.probe.plugged){let i=C5.map(p=>`<div class="row"><span>${t(H(`ui.food.${p.food}`))} \u2013 ${t(H(`ui.doneness.${p.doneness}`))}</span><b>${p.range}</b></div>`).join("");L.push(`
        <details class="core-temps">
          <summary>${t(H("ui.core_temp_help"))}</summary>
          ${i}
        </details>`)}return L.length?`
      <div class="section">
        <div class="section-title">${t(H("ui.settings"))}</div>
        ${L.join("")}
      </div>`:""}_controlsHtml(C,H){let L=(X2[C.status]||[]).filter(e=>C.entities[a1[e].entity]).map(e=>{let A=a1[e],i=C.drawerOpen&&["start"].includes(e);return`<button class="btn ${A.style}" type="button" data-action="command" data-value="${e}"
          ${i?"disabled":""}>
          ${d(A.icon)}<span>${t(H(`command.${e}`))}</span></button>`});if(!L.length)return"";let r=C.drawerOpen?`<div class="note">${d("drawer")}${t(H("alert.drawer_open_idle"))}</div>`:"";return`<div class="section"><div class="controls">${L.join("")}</div>${r}</div>`}_detailsHtml(C,H){let V=[],L=(r,e,A)=>{e==null||e===""||V.push(`
        <div class="detail">
          <span class="k">${t(H(`ui.${r}`))}</span>
          <span class="v">${d(A)}${t(String(e))}</span>
        </div>`)};return C.drawerOpen!==null&&L("drawer",C.drawerOpen?H("ui.drawer_open"):H("ui.drawer_closed"),"drawer"),C.airspeed!==null&&L("airspeed",C.airspeed>=2?H("ui.airspeed_high"):H("ui.airspeed_low"),"fan"),C.total&&L("total_time",`${Math.round(C.total/60)} ${H("ui.minute_short")}`,"timer"),C.preheatEnabled!==null?L("preheat",C.preheatEnabled?H("ui.on"):H("ui.off"),"temperature"):C.preheatStatus&&L("preheat",this._onOff(C.preheatStatus,H),"temperature"),C.keepWarm&&L("keep_warm",this._onOff(C.keepWarm,H),"warm"),C.stage&&L("stage",C.stage,"info"),C.voltage!==null&&L("voltage",`${C.voltage} V`,"info"),C.error&&L("error_code",C.error,"error"),V.length?`
      <div class="section">
        <div class="section-title">${t(H("ui.details"))}</div>
        <div class="details">${V.join("")}</div>
      </div>`:""}_onOff(C,H){let V=String(C).toLowerCase();return["on","true","yes","1"].includes(V)?H("ui.on"):["off","false","no","0"].includes(V)?H("ui.off"):C}_onClick(C){let H=C.target.closest("[data-action]");if(!H||H.hasAttribute("disabled"))return;let{action:V,value:L,dir:r}=H.dataset,e=this._model;if(!(!e?.ok&&V!=="more-info"))switch(V){case"more-info":this._moreInfo(e?.entities?.status);break;case"method":this._haptic("light"),this._call("select","select_option",{entity_id:e.entities.sel_method,option:L});break;case"preset":this._haptic("light"),this._call("select","select_option",{entity_id:e.entities.sel_preset,option:L});break;case"step":this._step(L,Number(r));break;case"set":{let[A,i]=L.split(":");this._setControl(A,Number(i));break}case"command":{let A=a1[L];this._haptic("medium"),this._call(A.service[0],A.service[1],{entity_id:e.entities[A.entity]});break}default:break}}_controlEntity(C){return{temperature:"num_temp",time:"num_time",probe:"num_probe",airspeed:"num_airspeed"}[C]}_step(C,H){let V=this._model.controls[C];if(!V)return;let L=V.value??V.min,r=Math.min(V.max,Math.max(V.min,L+H*V.step));r!==L&&this._setControl(C,r)}_setControl(C,H){let V=this._model.entities[this._controlEntity(C)];if(!V)return;let L=this._model.controls[C],r=L?Math.min(L.max,Math.max(L.min,H)):H;this._haptic("light"),this._call("number","set_value",{entity_id:V,value:r})}_call(C,H,V){return V.entity_id?this._hass.callService(C,H,V):Promise.resolve()}_moreInfo(C){C&&this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:C},bubbles:!0,composed:!0}))}_haptic(C){this.dispatchEvent(new CustomEvent("haptic",{detail:C,bubbles:!0,composed:!0}))}};function d5(){customElements.get(k)||(customElements.define(k,h1),window.customCards=window.customCards||[],window.customCards.push({type:k,name:"Philips Airfryer Card",description:"Rich status card for Philips airfryers: cooking status, drawer, temperature, probe, timers and controls.",preview:!0,documentationURL:"https://github.com/gabor-io/ha-appliance-custom-card"}),console.info(`%c ${k} %c ${j2} `,"color:#fff;background:#f4511e;font-weight:700;border-radius:3px 0 0 3px","color:#f4511e;background:#fbe9e7;font-weight:700;border-radius:0 3px 3px 0"))}var _5=t1({cardName:k,toggles:["show_methods","show_presets","show_settings","show_probe","show_details","show_controls","compact","animate"],defaults:O1,listDevices:p1,getLanguage:o1,translator:A1,languages:c1});function m5(){customElements.get($)||customElements.define($,_5)}m5();d5();
