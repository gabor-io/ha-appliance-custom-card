/*! aeg-dishwasher-card v1.0.0 - https://github.com/gabor-io/ha-appliance-custom-card - MIT licence */
var l="aeg-dishwasher-card",s="aeg-dishwasher-card-editor",Q="1.0.0",e={OFF:"OFF",IDLE:"IDLE",READY_TO_START:"READY_TO_START",DELAYED_START:"DELAYED_START",RUNNING:"RUNNING",PAUSED:"PAUSED",END_OF_CYCLE:"END_OF_CYCLE",ALARM:"ALARM",UNKNOWN:"UNKNOWN"},$={[e.OFF]:"idle",[e.IDLE]:"idle",[e.READY_TO_START]:"ready",[e.DELAYED_START]:"delayed",[e.RUNNING]:"running",[e.PAUSED]:"paused",[e.END_OF_CYCLE]:"done",[e.ALARM]:"alarm",[e.UNKNOWN]:"idle"},Z={PREWASH:"PREWASH",MAINWASH:"MAINWASH",COLDRINSE:"COLDRINSE",HOTRINSE:"HOTRINSE",EXTRARINSE:"EXTRARINSE",DRYING:"DRYING",ADO_DRYING:"ADO_DRYING",UNAVAILABLE:"UNAVAILABLE"},T=["PREWASH","MAINWASH","RINSE","DRYING"],K={[Z.PREWASH]:"PREWASH",[Z.MAINWASH]:"MAINWASH",[Z.COLDRINSE]:"RINSE",[Z.HOTRINSE]:"RINSE",[Z.EXTRARINSE]:"RINSE",[Z.DRYING]:"DRYING",[Z.ADO_DRYING]:"DRYING"},p={ECO:{icon:"leaf",water:8.4,energy:.488,duration:310,steps:["PREWASH","MAINWASH","RINSE","DRYING"]},AUTO:{icon:"auto",water:12.5,energy:1,duration:180,steps:["PREWASH","MAINWASH","RINSE","DRYING"]},QUICK30:{icon:"quick",water:8.5,energy:.475,duration:30,steps:["MAINWASH","RINSE"]},QUICK60:{icon:"clock",water:10.5,energy:1,duration:60,steps:["MAINWASH","RINSE","DRYING"]},NORMAL90:{icon:"clock",water:10.5,energy:1,duration:90,steps:["MAINWASH","RINSE","DRYING"]},"120_MIN":{icon:"clock",water:10.5,energy:.9,duration:120,steps:["MAINWASH","RINSE","DRYING"]},RINSE:{icon:"rinse",water:4,energy:.15,duration:15,steps:["PREWASH"]},MACHINE_CARE:{icon:"care",water:10,energy:.575,duration:60,steps:["MAINWASH","RINSE","DRYING"]}},R=["ECO","AUTO","QUICK30","QUICK60","NORMAL90","120_MIN","RINSE","MACHINE_CARE"],Y=[{key:"xtra_dry",entity:"xtra_dry_option",icon:"dry",programs:["ECO","QUICK60","NORMAL90","120_MIN"]},{key:"extra_power",entity:"extra_power_option",icon:"power",programs:["QUICK30","QUICK60","NORMAL90","120_MIN"]},{key:"extra_silent",entity:"extra_silent_option",icon:"silent",programs:["ECO","NORMAL90","120_MIN"]},{key:"glass_care",entity:"glass_care_option",icon:"glass",programs:["QUICK30","QUICK60","NORMAL90","120_MIN"]},{key:"sanitize",entity:"sanitize_option",icon:"sanitize",programs:["QUICK30","QUICK60","NORMAL90","120_MIN"]},{key:"spray_zone",entity:"spray_zone_option",icon:"spray",programs:["QUICK30","QUICK60","NORMAL90","120_MIN"]},{key:"zone_clean",entity:"zone_clean_option",icon:"zone",programs:["QUICK30","QUICK60","NORMAL90","120_MIN"]},{key:"one_rack",entity:"one_rack_option",icon:"rack",programs:["QUICK30","QUICK60"]},{key:"auto_door_opener",entity:"auto_door_opener",icon:"door",programs:null}],q={[e.OFF]:["on"],[e.IDLE]:["start","off"],[e.READY_TO_START]:["start","off"],[e.DELAYED_START]:["stopreset"],[e.RUNNING]:["pause"],[e.PAUSED]:["resume","stopreset"],[e.END_OF_CYCLE]:["stopreset","off"],[e.ALARM]:["stopreset","off"],[e.UNKNOWN]:[]},j={on:{icon:"power",style:"ghost"},off:{icon:"power",style:"ghost"},start:{icon:"play",style:"primary"},pause:{icon:"pause",style:"primary"},resume:{icon:"play",style:"primary"},stopreset:{icon:"stop",style:"ghost"}},F={DISH_ALARM_SALT_MISSING:"warning",DISH_ALARM_RINSE_AID_LOW:"warning",DISH_ALARM_I10:"error",DISH_ALARM_I11:"error",DISH_ALARM_I20:"error",DISH_ALARM_I30:"error",DISH_ALARM_I41:"error",DISH_ALARM_I43:"error",DISH_ALARM_I44:"error",DISH_ALARM_IF1:"error"},X=[60,120,180,240,360,480,720];var j1={card_name:"Mosogat\xF3g\xE9p",state:{OFF:"Kikapcsolva",IDLE:"K\xE9szenl\xE9tben",READY_TO_START:"Ind\xEDt\xE1sra k\xE9sz",DELAYED_START:"K\xE9sleltetett ind\xEDt\xE1s",RUNNING:"Program fut",PAUSED:"Sz\xFCneteltetve",END_OF_CYCLE:"Elk\xE9sz\xFClt",ALARM:"Hiba",UNKNOWN:"Ismeretlen"},phase:{PREWASH:"El\u0151mos\xE1s",MAINWASH:"Mosogat\xE1s",RINSE:"\xD6bl\xEDt\xE9s",DRYING:"Sz\xE1r\xEDt\xE1s",UNAVAILABLE:"\u2013"},phase_long:{PREWASH:"El\u0151mos\xE1s",MAINWASH:"Mosogat\xE1s",COLDRINSE:"Hideg \xF6bl\xEDt\xE9s",HOTRINSE:"Meleg \xF6bl\xEDt\xE9s",EXTRARINSE:"Extra \xF6bl\xEDt\xE9s",DRYING:"Sz\xE1r\xEDt\xE1s",ADO_DRYING:"AirDry sz\xE1r\xEDt\xE1s",UNAVAILABLE:"Nincs fut\xF3 f\xE1zis"},program:{ECO:"Eco",AUTO:"Auto",QUICK30:"Quick 30",QUICK60:"1h00m",NORMAL90:"1h30m","120_MIN":"2h00m",RINSE:"\xD6bl\xEDt\xE9s \xE9s v\xE1rakoz\xE1s",MACHINE_CARE:"G\xE9p\xE1pol\xE1s"},program_hint:{ECO:"Norm\xE1l szennyezetts\xE9g, a leghat\xE9konyabb v\xEDz- \xE9s energiafogyaszt\xE1s.",AUTO:"B\xE1rmilyen szennyezetts\xE9g, a g\xE9p m\xE9ri a t\xF6ltetet \xE9s a koszt.",QUICK30:"Friss szennyez\u0151d\xE9s, sz\xE1r\xEDt\xE1si f\xE1zis n\xE9lk\xFCl.",QUICK60:"Friss, enyh\xE9n r\xE1sz\xE1radt szennyez\u0151d\xE9s.",NORMAL90:"Norm\xE1l, enyh\xE9n r\xE1sz\xE1radt szennyez\u0151d\xE9s, l\xE1basokhoz is.","120_MIN":"Norm\xE1l, r\xE1sz\xE1radt szennyez\u0151d\xE9s, l\xE1basokhoz \xE9s serpeny\u0151kh\xF6z.",RINSE:"Felfriss\xEDti a k\xE9s\u0151bb mosand\xF3 ed\xE9nyeket. Mos\xF3szer n\xE9lk\xFCl!",MACHINE_CARE:"A g\xE9p belsej\xE9nek tiszt\xEDt\xE1sa v\xEDzk\u0151 \xE9s zs\xEDr ellen."},option:{xtra_dry:"ExtraDry",extra_power:"ExtraPower",extra_silent:"ExtraSilent",glass_care:"GlassCare",sanitize:"Fert\u0151tlen\xEDt\xE9s",spray_zone:"SprayZone",zone_clean:"ZoneClean",one_rack:"Egy kos\xE1r",auto_door_opener:"AutoOpen ajt\xF3"},option_hint:{xtra_dry:"Intenz\xEDvebb sz\xE1r\xEDt\xE1s a program v\xE9g\xE9n.",extra_power:"Er\u0151sebb mosogat\xE1s makacs szennyez\u0151d\xE9shez.",extra_silent:"Halkabb m\u0171k\xF6d\xE9s, hosszabb program.",glass_care:"\xDCveg\xE1rut k\xEDm\xE9l\u0151, max. 45 \xB0C.",sanitize:"Extra fert\u0151tlen\xEDt\u0151 \xF6bl\xEDt\xE9s.",spray_zone:"F\xF3kusz\xE1lt v\xEDzsug\xE1r az als\xF3 kos\xE1rban.",zone_clean:"Als\xF3 kos\xE1r er\u0151s, fels\u0151 kos\xE1r k\xEDm\xE9l\u0151 mos\xE1s.",one_rack:"Csak az egyik kos\xE1r mos\xE1sa.",auto_door_opener:"A ciklus v\xE9g\xE9n automatikusan kinyitja az ajt\xF3t."},command:{on:"Bekapcsol\xE1s",off:"Kikapcsol\xE1s",start:"Ind\xEDt\xE1s",pause:"Sz\xFCnet",resume:"Folytat\xE1s",stopreset:"Le\xE1ll\xEDt\xE1s"},alert:{DISH_ALARM_SALT_MISSING:"A s\xF3tart\xE1lyt fel kell t\xF6lteni",DISH_ALARM_RINSE_AID_LOW:"Az \xF6bl\xEDt\u0151szer-adagol\xF3 ki\xFCr\xFClt",DISH_ALARM_I10:"i10 \u2013 a k\xE9sz\xFCl\xE9k nem t\xF6lt be vizet. Ellen\u0151rizze a v\xEDzcsapot \xE9s a sz\u0171r\u0151t.",DISH_ALARM_I11:"i11 \u2013 a k\xE9sz\xFCl\xE9k nem t\xF6lt be vizet. Ellen\u0151rizze a v\xEDzcsapot \xE9s a sz\u0171r\u0151t.",DISH_ALARM_I20:"i20 \u2013 a k\xE9sz\xFCl\xE9k nem ereszti le a vizet. Ellen\u0151rizze a szifont \xE9s a sz\u0171r\u0151ket.",DISH_ALARM_I30:"i30 \u2013 a t\xFAlcsordul\xE1sg\xE1tl\xF3 bekapcsolt. Z\xE1rja el a v\xEDzcsapot!",DISH_ALARM_IF1:"iF1 \u2013 t\xFAl magas a v\xEDzszint a k\xE9sz\xFCl\xE9kben."},alert_generic:"Riaszt\xE1s",ui:{remaining:"H\xE1tral\xE9v\u0151 id\u0151",ready_at:"Elk\xE9sz\xFCl",starts_at:"Indul",start_in:"Ind\xEDt\xE1s eddig",door:"Ajt\xF3",door_open:"Az ajt\xF3 nyitva",door_closed:"Ajt\xF3 z\xE1rva",program:"Program",options:"Kieg\xE9sz\xEDt\u0151 funkci\xF3k",no_options:"Ehhez a programhoz nincs v\xE1laszthat\xF3 funkci\xF3.",delay:"K\xE9sleltetett ind\xEDt\xE1s",delay_off:"Nincs",delay_cancel:"T\xF6rl\xE9s",scores:"Hat\xE9konys\xE1g",eco_score:"Eco",energy_score:"Energia",water_score:"V\xEDz",consumption:"V\xE1rhat\xF3 fogyaszt\xE1s",water:"V\xEDz",energy:"Energia",duration:"Id\u0151tartam",details:"R\xE9szletek",remote:"T\xE1vvez\xE9rl\xE9s",remote_on:"Enged\xE9lyezve",remote_off:"Tiltva",remote_locked:"Ideiglenesen z\xE1rolva",cycles:"Lefutott ciklusok",wifi:"Wi-Fi jel",eco_mode:"Eco m\xF3d",rinse_aid:"\xD6bl\xEDt\u0151szer szintje",water_hardness:"V\xEDzkem\xE9nys\xE9g",offline:"Nincs kapcsolat a k\xE9sz\xFCl\xE9kkel",unavailable:"A k\xE9sz\xFCl\xE9k entit\xE1sai nem \xE9rhet\u0151k el",not_configured:"Nem tal\xE1lhat\xF3 Electrolux mosogat\xF3g\xE9p. Add meg a device vagy a prefix be\xE1ll\xEDt\xE1st a k\xE1rtya konfigur\xE1ci\xF3j\xE1ban.",remote_disabled_hint:"A vez\xE9rl\xE9shez enged\xE9lyezd a t\xE1vind\xEDt\xE1st a k\xE9sz\xFCl\xE9ken.",minute_short:"p",hour_short:"\xF3",finished:"A mosogat\xE1s elk\xE9sz\xFClt",finished_hint:"Kipakolhat\xF3",more:"T\xF6bb",less:"Kevesebb",just_now:"kevesebb mint egy perc"},editor:{device:"K\xE9sz\xFCl\xE9k",device_auto:"Automatikus felismer\xE9s",name:"N\xE9v",language:"Nyelv",language_auto:"Automatikus (HA nyelve)",sections:"Megjelen\xEDtett r\xE9szek",show_programs:"Programv\xE1laszt\xF3",show_options:"Kieg\xE9sz\xEDt\u0151 funkci\xF3k",show_delay:"K\xE9sleltetett ind\xEDt\xE1s",show_scores:"Hat\xE9konys\xE1gi pontok",show_consumption:"Fogyaszt\xE1si adatok",show_details:"R\xE9szletek",show_controls:"Vez\xE9rl\u0151gombok",compact:"Kompakt n\xE9zet",animate:"Anim\xE1ci\xF3k"}},D={card_name:"Dishwasher",state:{OFF:"Off",IDLE:"Idle",READY_TO_START:"Ready to start",DELAYED_START:"Delayed start",RUNNING:"Running",PAUSED:"Paused",END_OF_CYCLE:"Finished",ALARM:"Fault",UNKNOWN:"Unknown"},phase:{PREWASH:"Prewash",MAINWASH:"Main wash",RINSE:"Rinse",DRYING:"Drying",UNAVAILABLE:"\u2013"},phase_long:{PREWASH:"Prewash",MAINWASH:"Main wash",COLDRINSE:"Cold rinse",HOTRINSE:"Hot rinse",EXTRARINSE:"Extra rinse",DRYING:"Drying",ADO_DRYING:"AirDry drying",UNAVAILABLE:"No active phase"},program:{ECO:"Eco",AUTO:"Auto",QUICK30:"Quick 30",QUICK60:"1h00m",NORMAL90:"1h30m","120_MIN":"2h00m",RINSE:"Rinse & Hold",MACHINE_CARE:"MachineCare"},program_hint:{ECO:"Normally soiled load, most efficient water and energy use.",AUTO:"Any soil level, the machine senses load and soiling.",QUICK30:"Freshly soiled load, no drying phase.",QUICK60:"Fresh, lightly dried-on soiling.",NORMAL90:"Normal, lightly dried-on soiling, pots included.","120_MIN":"Normal, dried-on soiling, pots and pans.",RINSE:"Refreshes dishes waiting for a full cycle. No detergent!",MACHINE_CARE:"Cleans the inside of the machine from limescale and grease."},option:{xtra_dry:"ExtraDry",extra_power:"ExtraPower",extra_silent:"ExtraSilent",glass_care:"GlassCare",sanitize:"Sanitize",spray_zone:"SprayZone",zone_clean:"ZoneClean",one_rack:"One rack",auto_door_opener:"AutoOpen door"},option_hint:{xtra_dry:"Stronger drying at the end of the program.",extra_power:"More powerful wash for stubborn soiling.",extra_silent:"Quieter operation, longer program.",glass_care:"Protects glassware, max. 45 \xB0C.",sanitize:"Extra sanitising rinse.",spray_zone:"Focused spray in the lower basket.",zone_clean:"Intensive lower basket, gentle upper basket.",one_rack:"Washes a single basket only.",auto_door_opener:"Opens the door automatically at the end of the cycle."},command:{on:"Turn on",off:"Turn off",start:"Start",pause:"Pause",resume:"Resume",stopreset:"Stop"},alert:{DISH_ALARM_SALT_MISSING:"Salt container needs refilling",DISH_ALARM_RINSE_AID_LOW:"Rinse aid dispenser is empty",DISH_ALARM_I10:"i10 \u2013 the appliance does not fill with water. Check the tap and the filter.",DISH_ALARM_I11:"i11 \u2013 the appliance does not fill with water. Check the tap and the filter.",DISH_ALARM_I20:"i20 \u2013 the appliance does not drain. Check the siphon and the filters.",DISH_ALARM_I30:"i30 \u2013 anti-flood device triggered. Close the water tap!",DISH_ALARM_IF1:"iF1 \u2013 water level inside the appliance is too high."},alert_generic:"Alert",ui:{remaining:"Remaining",ready_at:"Ready at",starts_at:"Starts at",start_in:"Start in",door:"Door",door_open:"Door is open",door_closed:"Door closed",program:"Program",options:"Options",no_options:"This program has no selectable options.",delay:"Delayed start",delay_off:"None",delay_cancel:"Cancel",scores:"Efficiency",eco_score:"Eco",energy_score:"Energy",water_score:"Water",consumption:"Estimated use",water:"Water",energy:"Energy",duration:"Duration",details:"Details",remote:"Remote control",remote_on:"Enabled",remote_off:"Disabled",remote_locked:"Temporarily locked",cycles:"Total cycles",wifi:"Wi-Fi signal",eco_mode:"Eco mode",rinse_aid:"Rinse aid level",water_hardness:"Water hardness",offline:"The appliance is offline",unavailable:"The appliance entities are unavailable",not_configured:"No Electrolux dishwasher found. Set the device or prefix option in the card configuration.",remote_disabled_hint:"Enable remote start on the appliance to control it.",minute_short:"m",hour_short:"h",finished:"The cycle has finished",finished_hint:"Ready to unload",more:"More",less:"Less",just_now:"less than a minute"},editor:{device:"Device",device_auto:"Auto detect",name:"Name",language:"Language",language_auto:"Automatic (HA language)",sections:"Visible sections",show_programs:"Program picker",show_options:"Options",show_delay:"Delayed start",show_scores:"Efficiency scores",show_consumption:"Consumption figures",show_details:"Details",show_controls:"Control buttons",compact:"Compact layout",animate:"Animations"}},E={hu:j1,en:D};function k(M,C){let H=M?.language&&M.language!=="auto"?M.language:null,V=(C?.locale?.language||C?.language||"en").slice(0,2).toLowerCase(),L=H||V;return E[L]?L:"en"}function w(M){let C=E[M]||D;return(H,V="")=>{let L=H.split(".").reduce((t,i)=>t?t[i]:void 0,C);if(L!==void 0)return L;let r=H.split(".").reduce((t,i)=>t?t[i]:void 0,D);return r!==void 0?r:V}}var J=Object.keys(E);var C1={appliance_state:["sensor","appliance_state"],cycle_phase:["sensor","cycle_phase"],time_to_end:["sensor","time_to_end"],alerts:["sensor","alerts"],eco_score:["sensor","eco_score"],energy_score:["sensor","energy_score"],water_score:["sensor","water_score"],total_cycle_counter:["sensor","total_cycle_counter"],remote_control:["sensor","remote_control"],link_quality:["sensor","network_interface_link_quality_indicator"],door_state:["binary_sensor","door_state"],connectivity:["binary_sensor","connectivity_state"],eco_mode:["binary_sensor","miscellaneous_state_eco_mode"],program:["select","program_uid"],water_hardness:["select","water_hardness"],start_time:["number","start_time"],rinse_aid_level:["number","rinse_aid_level"],cmd_on:["button","execute_command_on"],cmd_off:["button","execute_command_off"],cmd_start:["button","execute_command_start"],cmd_pause:["button","execute_command_pause"],cmd_resume:["button","execute_command_resume"],cmd_stopreset:["button","execute_command_stopreset"]};function X1(M,C){if(C?.prefix)return C.prefix;if(C?.device&&M?.entities){let V=Object.values(M.entities).find(r=>r.device_id===C.device&&/_appliance_state$/.test(r.entity_id));if(V)return V.entity_id.replace(/^sensor\./,"").replace(/_appliance_state$/,"");let L=Object.values(M.entities).filter(r=>r.device_id===C.device).map(r=>r.entity_id.split(".")[1]);if(L.length)return J1(L)}if(C?.entities?.appliance_state)return C.entities.appliance_state.replace(/^sensor\./,"").replace(/_appliance_state$/,"");let H=Object.keys(M?.states||{}).filter(V=>/^sensor\..+_appliance_state$/.test(V));return H.length===1?H[0].replace(/^sensor\./,"").replace(/_appliance_state$/,""):null}function J1(M){if(!M.length)return null;let C=M[0];for(let H of M.slice(1)){let V=0;for(;V<C.length&&V<H.length&&C[V]===H[V];)V+=1;C=C.slice(0,V)}return C.replace(/_+$/,"")||null}function H1(M,C){let H=X1(M,C),V=C?.entities||{},L={},r=new Set([...Object.keys(C1),...Object.keys(V)]);for(let t of r){let i=V[t];if(i){L[t]=i;continue}let o=C1[t];if(!o||!H)continue;let a=`${o[0]}.${H}_${o[1]}`;M?.states?.[a]&&(L[t]=a)}if(H){L.options={};for(let t of["xtra_dry_option","extra_power_option","extra_silent_option","glass_care_option","sanitize_option","spray_zone_option","zone_clean_option","one_rack_option","auto_door_opener"]){let i=`switch.${H}_${t}`;M?.states?.[i]&&(L.options[t]=i)}}return L.prefix=H,L}function y(M){if(!M?.entities||!M?.devices)return[];let C=new Map;for(let H of Object.values(M.entities)){if(!/_appliance_state$/.test(H.entity_id)||!H.device_id)continue;let V=M.devices[H.device_id];V&&C.set(H.device_id,V.name_by_user||V.name||H.device_id)}return[...C.entries()].map(([H,V])=>({id:H,name:V}))}function x(M){return M==null?"":String(M).toUpperCase().replace(/[\s\-.]+/g,"_").replace(/_+/g,"_")}function _(M){return!M||M.state==="unavailable"||M.state==="unknown"}var L1="aeg-dishwasher-card:progress";function S(M){if(_(M))return null;let C=Number(M.state);return Number.isFinite(C)?C:null}function C2(M){let C=S(M);if(C===null||C<0)return null;let H=(M.attributes?.unit_of_measurement||"").toLowerCase();return H==="s"||H==="sec"||H==="seconds"?Math.round(C/60):H==="h"?Math.round(C*60):H?Math.round(C):C>1e3?Math.round(C/60):Math.round(C)}function H2(M){if(_(M))return[];let C=M.attributes?.alerts??M.attributes?.alert_list??M.state,H=[];return Array.isArray(C)?H=C.map(V=>typeof V=="string"?V:V?.code):typeof C=="string"&&(H=C.split(/[,;]/)),H.map(V=>x(V)).filter(V=>V&&!["NONE","OFF","OK","0","UNKNOWN","UNAVAILABLE"].includes(V))}function V2(){try{return JSON.parse(window.localStorage.getItem(L1)||"{}")}catch{return{}}}function V1(M){try{window.localStorage.setItem(L1,JSON.stringify(M))}catch{}}function L2(M,C,H,V){let L=H===e.RUNNING||H===e.PAUSED,r=V2(),t=r[M];if(!L)return t&&H!==e.DELAYED_START&&(delete r[M],V1(r)),{progress:H===e.END_OF_CYCLE?1:0,total:null};if(V===null)return{progress:0,total:null};let i=p[C]?.duration||0,o=t&&t.program===C,a=Math.max(V,i,o?t.total:0);return(!o||a!==t.total)&&(r[M]={program:C,total:a},V1(r)),{progress:a?Math.min(1,Math.max(0,1-V/a)):0,total:a}}function M1(M,C){let H=H1(M,C),V=m=>H[m]?M.states[H[m]]:void 0,L=V("appliance_state");if(!H.prefix||!L)return{ok:!1,reason:H.prefix?"unavailable":"not_configured",entities:H};let r=x(L.state)in e?x(L.state):e.UNKNOWN,t=V("program"),i=x(t?.state),o=p[i]?i:null,a=x(V("cycle_phase")?.state)||"UNAVAILABLE",v=K[a]||null,n=C2(V("time_to_end")),{progress:B}=L2(H.prefix,o,r,n),u=S(V("start_time")),g=u!==null&&u>0?u:0,f=V("door_state"),G1=f?f.state==="on":null,G=V("connectivity"),U1=G?G.state==="on":!0,P=x(V("remote_control")?.state),Q1=P===""||P.includes("ENABLED"),$1=(r===e.RUNNING||r===e.PAUSED||r===e.DELAYED_START)&&n!==null?new Date(Date.now()+n*6e4):null,K1=r===e.DELAYED_START&&g?new Date(Date.now()+g*6e4):null,Y1=Y.map(m=>{let b=H.options?.[m.entity],U=b?M.states[b]:void 0;return{...m,entityId:b,on:U?.state==="on",exists:!!U,supported:!m.programs||!o||m.programs.includes(o)}}).filter(m=>m.exists),q1=(t?.attributes?.options||[]).map(m=>({label:m,key:x(m)}));return{ok:!0,entities:H,state:r,accent:$[r]||"idle",phase:a,step:v,program:o,programRaw:t?.state||null,programOptions:q1,remaining:n,progress:B,finishAt:$1,startAt:K1,delay:g,delayEntity:H.start_time,doorOpen:G1,online:U1,remote:P,remoteEnabled:Q1,alerts:H2(V("alerts")),scores:{eco:S(V("eco_score")),energy:S(V("energy_score")),water:S(V("water_score"))},cycles:S(V("total_cycle_counter")),linkQuality:x(V("link_quality")?.state),ecoMode:V("eco_mode")?.state==="on",rinseAid:S(V("rinse_aid_level")),waterHardness:V("water_hardness")?.state||null,options:Y1,name:C.name||L.attributes?.friendly_name?.replace(/\s*Appliance state$/i,"")||null}}function r1(M,C,H,V,L){return[`M${M+L},${C}`,`H${M+H-L}`,`A${L},${L} 0 0 1 ${M+H},${C+L}`,`V${C+V-L}`,`A${L},${L} 0 0 1 ${M+H-L},${C+V}`,`H${M+L}`,`A${L},${L} 0 0 1 ${M},${C+V-L}`,`V${C+L}`,`A${L},${L} 0 0 1 ${M+L},${C}`,"Z"].join(" ")}var M2=`${r1(8,6,164,202,18)} ${r1(26,52,128,136,12)}`;function e1(){return`
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

    <!-- interior: stays put while the door swings open -->
    <g class="cavity">
      <rect class="tub-body" x="26" y="52" width="128" height="136" rx="12"/>
      <g clip-path="url(#dw-tub-clip)">
        <rect class="cavity-glow" x="26" y="52" width="128" height="136"/>

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
      <path class="door-panel" d="${M2}" fill-rule="evenodd"/>
      <rect class="panel-strip" x="18" y="14" width="144" height="28" rx="10"/>
      <circle class="led" cx="32" cy="28" r="4"/>
      <rect class="display" x="60" y="19" width="60" height="18" rx="6"/>
      <text class="display-text" x="90" y="32" text-anchor="middle">--:--</text>
      <rect class="handle" x="18" y="196" width="144" height="7" rx="3.5"/>
    </g>
  </svg>`}function t1(M,C){let H=M.querySelector(".display-text");H&&H.textContent!==C&&(H.textContent=C)}var i1="M19,18.31V20A2,2 0 0,1 17,22H7A2,2 0 0,1 5,20V16.3C4.54,16.12 3.95,16 3,16A1,1 0 0,1 2,15A1,1 0 0,1 3,14C3.82,14 4.47,14.08 5,14.21V12.3C4.54,12.12 3.95,12 3,12A1,1 0 0,1 2,11A1,1 0 0,1 3,10C3.82,10 4.47,10.08 5,10.21V8.3C4.54,8.12 3.95,8 3,8A1,1 0 0,1 2,7A1,1 0 0,1 3,6C3.82,6 4.47,6.08 5,6.21V4A2,2 0 0,1 7,2H17A2,2 0 0,1 19,4V6.16C20.78,6.47 21.54,7.13 21.71,7.29C22.1,7.68 22.1,8.32 21.71,8.71C21.32,9.1 20.8,9.09 20.29,8.71V8.71C20.29,8.71 19.25,8 17,8C15.74,8 14.91,8.41 13.95,8.9C12.91,9.41 11.74,10 10,10C9.64,10 9.31,10 9,9.96V7.95C9.3,8 9.63,8 10,8C11.26,8 12.09,7.59 13.05,7.11C14.09,6.59 15.27,6 17,6V4H7V20H17V18C18.5,18 18.97,18.29 19,18.31M17,10C15.27,10 14.09,10.59 13.05,11.11C12.09,11.59 11.26,12 10,12C9.63,12 9.3,12 9,11.95V13.96C9.31,14 9.64,14 10,14C11.74,14 12.91,13.41 13.95,12.9C14.91,12.42 15.74,12 17,12C19.25,12 20.29,12.71 20.29,12.71V12.71C20.8,13.1 21.32,13.1 21.71,12.71C22.1,12.32 22.1,11.69 21.71,11.29C21.5,11.08 20.25,10 17,10M17,14C15.27,14 14.09,14.59 13.05,15.11C12.09,15.59 11.26,16 10,16C9.63,16 9.3,16 9,15.95V17.96C9.31,18 9.64,18 10,18C11.74,18 12.91,17.41 13.95,16.9C14.91,16.42 15.74,16 17,16C19.25,16 20.29,16.71 20.29,16.71V16.71C20.8,17.1 21.32,17.1 21.71,16.71C22.1,16.32 22.1,15.69 21.71,15.29C21.5,15.08 20.25,14 17,14Z";var A1="M13,13H11V7H13M13,17H11V15H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z";var o1="M12,2L1,21H23M12,6L19.53,19H4.47M11,10V14H13V10M11,16V18H13V16";var a1="M13,9V15H16L12,19L8,15H11V9H8L12,5L16,9H13M4,2H20V4H4V2M4,20H20V22H4V20Z";var d1="M12,6V9L16,5L12,1V4A8,8 0 0,0 4,12C4,13.57 4.46,15.03 5.24,16.26L6.7,14.8C6.25,13.97 6,13 6,12A6,6 0 0,1 12,6M18.76,7.74L17.3,9.2C17.74,10.04 18,11 18,12A6,6 0 0,1 12,18V15L8,19L12,23V20A8,8 0 0,0 20,12C20,10.43 19.54,8.97 18.76,7.74Z";var p1="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z";var m1="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z";var n1="M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z";var x1="M4,4H20A2,2 0 0,1 22,6V18A2,2 0 0,1 20,20H4A2,2 0 0,1 2,18V6A2,2 0 0,1 4,4M4,6V18H11V6H4M20,18V6H18.76C19,6.54 18.95,7.07 18.95,7.13C18.88,7.8 18.41,8.5 18.24,8.75L15.91,11.3L19.23,11.28L19.24,12.5L14.04,12.47L14,11.47C14,11.47 17.05,8.24 17.2,7.95C17.34,7.67 17.91,6 16.5,6C15.27,6.05 15.41,7.3 15.41,7.3L13.87,7.31C13.87,7.31 13.88,6.65 14.25,6H13V18H15.58L15.57,17.14L16.54,17.13C16.54,17.13 17.45,16.97 17.46,16.08C17.5,15.08 16.65,15.08 16.5,15.08C16.37,15.08 15.43,15.13 15.43,15.95H13.91C13.91,15.95 13.95,13.89 16.5,13.89C19.1,13.89 18.96,15.91 18.96,15.91C18.96,15.91 19,17.16 17.85,17.63L18.37,18H20M8.92,16H7.42V10.2L5.62,10.76V9.53L8.76,8.41H8.92V16Z";var v1="M18.32,8H5.67L5.23,4H18.77M12,19A3,3 0 0,1 9,16C9,14 12,10.6 12,10.6C12,10.6 15,14 15,16A3,3 0 0,1 12,19M3,2L5,20.23C5.13,21.23 5.97,22 7,22H17C18,22 18.87,21.23 19,20.23L21,2H3Z";var l1="M18,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V4A2,2 0 0,0 18,2M10,4A1,1 0 0,1 11,5A1,1 0 0,1 10,6A1,1 0 0,1 9,5A1,1 0 0,1 10,4M7,4A1,1 0 0,1 8,5A1,1 0 0,1 7,6A1,1 0 0,1 6,5A1,1 0 0,1 7,4M18,20H6V8H18V20M14.67,15.33C14.69,16.03 14.41,16.71 13.91,17.21C12.86,18.26 11.15,18.27 10.09,17.21C9.59,16.71 9.31,16.03 9.33,15.33C9.4,14.62 9.63,13.94 10,13.33C10.37,12.5 10.81,11.73 11.33,11L12,10C13.79,12.59 14.67,14.36 14.67,15.33";var Z1="M16,11H18V13H16V11M12,3H19C20.11,3 21,3.89 21,5V19H22V21H2V19H10V5C10,3.89 10.89,3 12,3M12,5V19H19V5H12Z";var S1="M12,3C10.89,3 10,3.89 10,5H3V19H2V21H22V19H21V5C21,3.89 20.11,3 19,3H12M12,5H19V19H12V5M5,11H7V13H5V11Z";var u1="M7,2V13H10V22L17,10H13L17,2H7Z";var s1="M15.5,21.27L14.66,21.18C13.9,21.11 13.25,20.6 13,19.87C12.47,17.91 12.47,15.83 13,13.87C15.32,13.4 17,11.37 17,9C17,7 15,2 15,2H9C9,2 7,7 7,9C7,11.38 8.67,13.42 11,13.9C11.53,15.86 11.53,17.94 11,19.9C10.76,20.62 10.12,21.13 9.37,21.21L8.5,21.3C8.5,21.3 8,21.28 8,22H16C16,21.28 15.5,21.27 15.5,21.27M9.44,7L10.44,4H13.56L14.56,7H9.44Z";var c1="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z";var O1="M11 15H6L13 1V9H18L11 23V15Z";var h1="M14,19H18V5H14M6,19H10V5H6V19Z";var g1="M8,5.14V19.14L19,12.14L8,5.14Z";var f1="M16.56,5.44L15.11,6.89C16.84,7.94 18,9.83 18,12A6,6 0 0,1 12,18A6,6 0 0,1 6,12C6,9.83 7.16,7.94 8.88,6.88L7.44,5.44C5.36,6.88 4,9.28 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12C20,9.28 18.64,6.88 16.56,5.44M13,3H11V13H13";var k1="M12,0C8.96,0 6.21,1.23 4.22,3.22L5.63,4.63C7.26,3 9.5,2 12,2C14.5,2 16.74,3 18.36,4.64L19.77,3.23C17.79,1.23 15.04,0 12,0M7.05,6.05L8.46,7.46C9.37,6.56 10.62,6 12,6C13.38,6 14.63,6.56 15.54,7.46L16.95,6.05C15.68,4.78 13.93,4 12,4C10.07,4 8.32,4.78 7.05,6.05M12,15A2,2 0 0,1 10,13A2,2 0 0,1 12,11A2,2 0 0,1 14,13A2,2 0 0,1 12,15M15,9H9A1,1 0 0,0 8,10V22A1,1 0 0,0 9,23H15A1,1 0 0,0 16,22V10A1,1 0 0,0 15,9Z";var w1="M10.6 9.6L9 15L7.4 9.6L2 8L7.4 6.4L9 1L10.6 6.4L16 8L10.6 9.6M17 14.2L21 12L18.8 16L21 20L17 17.8L13 20L15.2 16L13 12L17 14.2M10 16L8.3 19L10 22L7 20.3L4 22L5.7 19L4 16L7 17.7L10 16";var y1="M16.72 10.43C14.68 8.39 14.5 4.66 14.5 4H13V6H9V4H7C7 2.9 7.9 2 9 2H16V3C16 3.08 16.04 7.63 17.78 9.37L16.72 10.43M17 2V4H18V2H17M15 12C13 10 13 7 13 7H9V9C9 10 9 10 8 11S7 13 7 13V20C7 21.1 7.9 22 9 22H13C14.1 22 15 21.1 15 20V12Z";var B1="M18,18H6V6H18V18Z";var P1="M6,2H18V8H18V8L14,12L18,16V16H18V22H6V16H6V16L10,12L6,8V8H6V2M16,16.5L12,12.5L8,16.5V20H16V16.5M12,11.5L16,7.5V4H8V7.5L12,11.5M10,6H14V6.75L12,8.75L10,6.75V6Z";var b1="M12,4L9.91,6.09L12,8.18M4.27,3L3,4.27L7.73,9H3V15H7L12,20V13.27L16.25,17.53C15.58,18.04 14.83,18.46 14,18.7V20.77C15.38,20.45 16.63,19.82 17.68,18.96L19.73,21L21,19.73L12,10.73M19,12C19,12.94 18.8,13.82 18.46,14.64L19.97,16.15C20.62,14.91 21,13.5 21,12C21,7.72 18,4.14 14,3.23V5.29C16.89,6.15 19,8.83 19,12M16.5,12C16.5,10.23 15.5,8.71 14,7.97V10.18L16.45,12.63C16.5,12.43 16.5,12.21 16.5,12Z";var T1="M12,20A6,6 0 0,1 6,14C6,10 12,3.25 12,3.25C12,3.25 18,10 18,14A6,6 0 0,1 12,20Z";var N="M12,3.25C12,3.25 6,10 6,14C6,17.32 8.69,20 12,20A6,6 0 0,0 18,14C18,10 12,3.25 12,3.25M14.47,9.97L15.53,11.03L9.53,17.03L8.47,15.97M9.75,10A1.25,1.25 0 0,1 11,11.25A1.25,1.25 0 0,1 9.75,12.5A1.25,1.25 0 0,1 8.5,11.25A1.25,1.25 0 0,1 9.75,10M14.25,14.5A1.25,1.25 0 0,1 15.5,15.75A1.25,1.25 0 0,1 14.25,17A1.25,1.25 0 0,1 13,15.75A1.25,1.25 0 0,1 14.25,14.5Z";var R1="M12,21L15.6,16.2C14.6,15.45 13.35,15 12,15C10.65,15 9.4,15.45 8.4,16.2L12,21M12,3C7.95,3 4.21,4.34 1.2,6.6L3,9C5.5,7.12 8.62,6 12,6C15.38,6 18.5,7.12 21,9L22.8,6.6C19.79,4.34 16.05,3 12,3M12,9C9.3,9 6.81,9.89 4.8,11.4L6.6,13.8C8.1,12.67 9.97,12 12,12C14.03,12 15.9,12.67 17.4,13.8L19.2,11.4C17.19,9.89 14.7,9 12,9Z";var F1="M2.28,3L1,4.27L2.47,5.74C2.04,6 1.61,6.29 1.2,6.6L3,9C3.53,8.6 4.08,8.25 4.66,7.93L6.89,10.16C6.15,10.5 5.44,10.91 4.8,11.4L6.6,13.8C7.38,13.22 8.26,12.77 9.2,12.47L11.75,15C10.5,15.07 9.34,15.5 8.4,16.2L12,21L14.46,17.73L17.74,21L19,19.72M12,3C9.85,3 7.8,3.38 5.9,4.07L8.29,6.47C9.5,6.16 10.72,6 12,6C15.38,6 18.5,7.11 21,9L22.8,6.6C19.79,4.34 16.06,3 12,3M12,9C11.62,9 11.25,9 10.88,9.05L14.07,12.25C15.29,12.53 16.43,13.07 17.4,13.8L19.2,11.4C17.2,9.89 14.7,9 12,9Z";var D1="M22.61,19L13.53,9.91C14.46,7.57 14,4.81 12.09,2.91C9.79,0.61 6.21,0.4 3.66,2.26L7.5,6.11L6.08,7.5L2.25,3.69C0.39,6.23 0.6,9.82 2.9,12.11C4.76,13.97 7.47,14.46 9.79,13.59L18.9,22.7C19.29,23.09 19.92,23.09 20.31,22.7L22.61,20.4C23,20 23,19.39 22.61,19M19.61,20.59L10.15,11.13C9.54,11.58 8.86,11.85 8.15,11.95C6.79,12.15 5.36,11.74 4.32,10.7C3.37,9.76 2.93,8.5 3,7.26L6.09,10.35L10.33,6.11L7.24,3C8.5,2.95 9.73,3.39 10.68,4.33C11.76,5.41 12.17,6.9 11.92,8.29C11.8,9 11.5,9.66 11.04,10.25L20.5,19.7L19.61,20.59Z";var E1={alert:o1,error:A1,auto:d1,care:D1,check:p1,chevron:m1,clock:n1,counter:x1,dishwasher:l1,door:S1,door_closed:Z1,dry:i1,energy:O1,glass:s1,leaf:c1,pause:h1,play:g1,power:f1,quick:u1,rack:a1,remote:k1,rinse:v1,sanitize:w1,silent:b1,spray:y1,stop:B1,timer:P1,water:T1,water_percent:N,wifi:R1,wifi_off:F1,zone:N};function d(M,C="icon"){let H=E1[M]||E1.dishwasher;return`<svg class="${C}" viewBox="0 0 24 24" aria-hidden="true"><path d="${H}"></path></svg>`}var _1=`
:host {
  display: block;
  --dw-radius: 18px;
  --dw-accent: var(--primary-color, #03a9f4);
  --dw-accent-soft: color-mix(in srgb, var(--dw-accent) 45%, transparent);
  --dw-body-1: color-mix(in srgb, var(--card-background-color, #fff) 92%, var(--primary-text-color, #000) 8%);
  --dw-body-2: color-mix(in srgb, var(--card-background-color, #fff) 78%, var(--primary-text-color, #000) 22%);
  --dw-tub-1: color-mix(in srgb, var(--card-background-color, #fff) 60%, #0b2430 40%);
  --dw-tub-2: color-mix(in srgb, var(--card-background-color, #fff) 40%, #06131c 60%);
  --dw-line: var(--divider-color, rgba(127,127,127,.25));
  --dw-muted: var(--secondary-text-color, #70757a);
  --dw-text: var(--primary-text-color, #212121);
}

ha-card {
  overflow: hidden;
  container-type: inline-size;
}

.wrap { padding: 16px; display: grid; gap: 16px; }
.wrap.compact { gap: 12px; padding: 12px; }

/* ---------- header ---------- */
.header { display: flex; align-items: center; gap: 10px; }
.header .title { font-size: 1.05rem; font-weight: 600; color: var(--dw-text); line-height: 1.2; }
.header .sub { font-size: .78rem; color: var(--dw-muted); }
.header .spacer { flex: 1; }
.badges { display: flex; align-items: center; gap: 6px; color: var(--dw-muted); }
.badges .icon { width: 18px; height: 18px; }
.badges .bad { color: var(--error-color, #db4437); }

.pill {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 4px 10px; border-radius: 999px;
  background: color-mix(in srgb, var(--dw-accent) 16%, transparent);
  color: var(--dw-accent); font-size: .76rem; font-weight: 600;
  white-space: nowrap;
}
.pill .icon { width: 14px; height: 14px; }

/* ---------- hero ---------- */
.hero { display: grid; grid-template-columns: 148px minmax(0, 1fr); gap: 18px; align-items: center; }
.compact .hero { grid-template-columns: 104px minmax(0, 1fr); gap: 14px; }
@container (max-width: 360px) { .hero { grid-template-columns: 96px minmax(0, 1fr); gap: 12px; } }

.status { min-width: 0; display: grid; gap: 10px; }
.status-line { display: flex; align-items: baseline; gap: 8px; flex-wrap: wrap; }
.state-text { font-size: 1.45rem; font-weight: 700; color: var(--dw-accent); line-height: 1.1; }
.compact .state-text { font-size: 1.2rem; }
.phase-text { font-size: .85rem; color: var(--dw-muted); }
.program-line { display: flex; align-items: center; gap: 6px; font-size: .9rem; color: var(--dw-text); }
.program-line .icon { width: 16px; height: 16px; color: var(--dw-muted); }

.countdown { display: flex; align-items: baseline; gap: 10px; flex-wrap: wrap; }
.countdown .value { font-size: 2.1rem; font-weight: 700; letter-spacing: -.02em; color: var(--dw-text); line-height: 1; font-variant-numeric: tabular-nums; }
.compact .countdown .value { font-size: 1.6rem; }
.countdown .unit { font-size: .95rem; font-weight: 600; color: var(--dw-muted); }
.countdown .at { font-size: .82rem; color: var(--dw-muted); display: inline-flex; align-items: center; gap: 4px; }
.countdown .at .icon { width: 14px; height: 14px; }

.bar { height: 8px; border-radius: 999px; background: var(--dw-line); overflow: hidden; }
.bar > i {
  display: block; height: 100%; border-radius: 999px;
  background: linear-gradient(90deg, var(--dw-accent-soft), var(--dw-accent));
  width: 0%; transition: width .8s ease;
}
.running .bar > i {
  background-image: linear-gradient(90deg, var(--dw-accent-soft), var(--dw-accent)),
    repeating-linear-gradient(115deg, rgba(255,255,255,.28) 0 10px, transparent 10px 20px);
  animation: stripes 1.1s linear infinite;
}
@keyframes stripes { to { background-position: 0 0, 40px 0; } }

/* ---------- timeline ---------- */
.timeline { display: grid; grid-auto-flow: column; grid-auto-columns: 1fr; gap: 4px; }
.step { display: grid; justify-items: center; gap: 5px; opacity: .45; }
.step .dot {
  width: 100%; height: 4px; border-radius: 999px; background: var(--dw-line);
}
.step .label { font-size: .7rem; color: var(--dw-muted); text-align: center; line-height: 1.15; }
.step.done { opacity: 1; }
.step.done .dot { background: color-mix(in srgb, var(--dw-accent) 55%, transparent); }
.step.active { opacity: 1; }
.step.active .dot { background: var(--dw-accent); box-shadow: 0 0 0 3px color-mix(in srgb, var(--dw-accent) 18%, transparent); }
.step.active .label { color: var(--dw-accent); font-weight: 600; }
.step.skip { opacity: .2; }

/* ---------- alerts ---------- */
.alerts { display: grid; gap: 8px; }
.alert {
  display: flex; align-items: center; gap: 10px; padding: 10px 12px;
  border-radius: 12px; font-size: .84rem; line-height: 1.3;
  background: color-mix(in srgb, var(--warning-color, #ffa726) 16%, transparent);
  color: var(--dw-text);
}
.alert.error { background: color-mix(in srgb, var(--error-color, #db4437) 16%, transparent); }
.alert .icon { width: 20px; height: 20px; flex: 0 0 auto; color: var(--warning-color, #ffa726); }
.alert.error .icon { color: var(--error-color, #db4437); }

/* ---------- sections ---------- */
.section { display: grid; gap: 8px; }
.section-title {
  font-size: .72rem; font-weight: 700; letter-spacing: .08em; text-transform: uppercase;
  color: var(--dw-muted);
}
.section-title .hint { float: right; font-weight: 500; letter-spacing: 0; text-transform: none; }

.chips { display: flex; flex-wrap: wrap; gap: 8px; }
.chip {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 7px 12px; border-radius: 999px; cursor: pointer;
  border: 1px solid var(--dw-line); background: transparent;
  color: var(--dw-text); font: inherit; font-size: .82rem; font-weight: 500;
  transition: background .2s ease, border-color .2s ease, color .2s ease, transform .1s ease;
}
.chip .icon { width: 16px; height: 16px; color: var(--dw-muted); }
.chip:hover:not([disabled]) { border-color: var(--dw-accent); }
.chip:active:not([disabled]) { transform: scale(.97); }
.chip[aria-pressed="true"] {
  background: color-mix(in srgb, var(--dw-accent) 16%, transparent);
  border-color: color-mix(in srgb, var(--dw-accent) 45%, transparent);
  color: var(--dw-accent);
}
.chip[aria-pressed="true"] .icon { color: var(--dw-accent); }
.chip[disabled] { opacity: .38; cursor: not-allowed; }
.chip[disabled][aria-pressed="true"] { opacity: .8; }

/* ---------- meters ---------- */
.meters { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; }
.meter { display: grid; gap: 6px; }
.meter .top { display: flex; align-items: center; gap: 6px; font-size: .76rem; color: var(--dw-muted); }
.meter .top .icon { width: 15px; height: 15px; }
.meter .top .val { margin-left: auto; font-weight: 600; color: var(--dw-text); font-variant-numeric: tabular-nums; }
.meter .track { display: grid; grid-auto-flow: column; gap: 3px; }
.meter .track i { height: 5px; border-radius: 2px; background: var(--dw-line); }
.meter.eco .track i.on { background: var(--success-color, #43a047); }
.meter.energy .track i.on { background: var(--warning-color, #fb8c00); }
.meter.water .track i.on { background: var(--info-color, #039be5); }

.facts { display: flex; flex-wrap: wrap; gap: 8px; }
.fact {
  display: inline-flex; align-items: center; gap: 6px; padding: 6px 10px;
  border-radius: 10px; background: color-mix(in srgb, var(--dw-text) 6%, transparent);
  font-size: .78rem; color: var(--dw-text);
}
.fact .icon { width: 15px; height: 15px; color: var(--dw-muted); }
.fact b { font-weight: 600; }

/* ---------- controls ---------- */
.controls { display: flex; gap: 10px; flex-wrap: wrap; }
.btn {
  flex: 1 1 auto; min-width: 116px;
  display: inline-flex; align-items: center; justify-content: center; gap: 8px;
  padding: 12px 16px; border-radius: 14px; cursor: pointer;
  border: 1px solid var(--dw-line); background: transparent; color: var(--dw-text);
  font: inherit; font-size: .88rem; font-weight: 600;
  transition: transform .1s ease, box-shadow .2s ease, background .2s ease;
}
.btn .icon { width: 18px; height: 18px; }
.btn.primary {
  background: var(--dw-accent); border-color: transparent; color: var(--text-primary-color, #fff);
  box-shadow: 0 6px 18px -8px var(--dw-accent);
}
.btn.primary .icon { color: currentColor; }
.btn:hover:not([disabled]) { box-shadow: 0 6px 16px -10px rgba(0,0,0,.6); }
.btn:active:not([disabled]) { transform: scale(.98); }
.btn[disabled] { opacity: .4; cursor: not-allowed; }

.note { font-size: .76rem; color: var(--dw-muted); display: flex; align-items: center; gap: 6px; }
.note .icon { width: 15px; height: 15px; }

.details { display: grid; grid-template-columns: repeat(auto-fit, minmax(128px, 1fr)); gap: 10px; }
.detail { display: grid; gap: 2px; padding: 10px 12px; border-radius: 12px; background: color-mix(in srgb, var(--dw-text) 5%, transparent); }
.detail .k { font-size: .7rem; color: var(--dw-muted); text-transform: uppercase; letter-spacing: .05em; }
.detail .v { font-size: .86rem; font-weight: 600; color: var(--dw-text); display: flex; align-items: center; gap: 6px; }
.detail .v .icon { width: 15px; height: 15px; color: var(--dw-muted); }

.empty { padding: 24px 16px; text-align: center; color: var(--dw-muted); font-size: .9rem; display: grid; gap: 10px; justify-items: center; }
.empty .icon { width: 36px; height: 36px; }

/* ---------- machine illustration ---------- */
.machine { width: 100%; height: auto; perspective: 620px; overflow: visible; }
.machine .cabinet { fill: color-mix(in srgb, var(--dw-text) 10%, transparent); }
.machine .cavity-glow { fill: color-mix(in srgb, var(--dw-accent) 12%, transparent); opacity: 0; transition: opacity .4s ease; }
.machine .glass { fill: url(#dw-glass); }
.machine .door {
  transform-box: view-box; transform-origin: 90px 206px;
  transition: transform .7s cubic-bezier(.4, 0, .2, 1);
}
.machine .panel-strip { fill: color-mix(in srgb, var(--dw-text) 8%, transparent); }
.machine .handle { fill: color-mix(in srgb, var(--dw-text) 22%, transparent); }
.machine .door-panel { fill: url(#dw-body); stroke: var(--dw-line); stroke-width: 1.2; }
.machine .display { fill: color-mix(in srgb, #04121a 82%, var(--card-background-color, #fff)); }
.machine .display-text {
  fill: var(--dw-accent); font-size: 12px; font-weight: 700;
  font-family: var(--paper-font-body1_-_font-family, inherit); font-variant-numeric: tabular-nums;
  letter-spacing: .04em;
}
.machine .led { fill: var(--dw-accent); }
.machine .tub-body { fill: url(#dw-tub); }
.machine .rack line { stroke: color-mix(in srgb, #ffffff 42%, transparent); stroke-width: 2; stroke-linecap: round; }
.machine .plates rect { fill: color-mix(in srgb, #ffffff 68%, transparent); }
.machine .glasses path { fill: color-mix(in srgb, #ffffff 34%, transparent); }
.machine .spray-arm rect, .machine .spray-arm circle { fill: color-mix(in srgb, #ffffff 55%, transparent); }
.machine .spray-arm .jet { fill: var(--dw-accent); }
.machine .spray-arm { transform-box: view-box; transform-origin: 90px 170px; }
.machine .water path { stroke: var(--dw-accent); stroke-width: 2; stroke-linecap: round; fill: none; opacity: 0; }
.machine .droplets circle { fill: var(--dw-accent); opacity: 0; }
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

.phase-drying .machine .water path, .phase-drying .machine .droplets circle { animation: none; opacity: 0; }
.phase-drying .machine .spray-arm { animation-duration: 8s; }
.phase-drying .machine .steam path { animation: steam 3.4s ease-in-out infinite; }
.phase-drying .machine .steam path:nth-child(2) { animation-delay: .6s; }
.phase-drying .machine .steam path:nth-child(3) { animation-delay: 1.2s; }

.paused .machine .led { animation: blink 1s steps(2, end) infinite; }
.paused .machine .plates rect { opacity: .8; }

.done .machine .sparkles path { animation: twinkle 2.6s ease-in-out infinite; }
.done .machine .sparkles path:nth-child(2) { animation-delay: .6s; }
.done .machine .sparkles path:nth-child(3) { animation-delay: 1.2s; }

.off .machine { filter: saturate(.25); }
.off .machine .display-text { fill: color-mix(in srgb, var(--dw-muted) 60%, transparent); }
.off .machine .led { fill: color-mix(in srgb, var(--dw-muted) 50%, transparent); }

.alarm .machine .led { animation: blink .7s steps(2, end) infinite; }

.door-open .machine .door { transform: rotateX(58deg); }
.door-open .machine .cavity-glow { opacity: 1; }

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
@keyframes twinkle {
  0%, 100% { opacity: 0; transform: scale(.7); }
  50% { opacity: 1; transform: scale(1); }
}

.no-animation .machine * { animation: none !important; }
.no-animation .bar > i { animation: none !important; }

@media (prefers-reduced-motion: reduce) {
  .machine * { animation: none !important; }
  .bar > i { animation: none !important; transition: none; }
}

/* accents per state */
.accent-idle { --dw-accent: var(--state-icon-color, #8a9199); }
.accent-ready { --dw-accent: var(--success-color, #43a047); }
.accent-running { --dw-accent: var(--info-color, #039be5); }
.accent-delayed { --dw-accent: #7e57c2; }
.accent-paused { --dw-accent: var(--warning-color, #fb8c00); }
.accent-done { --dw-accent: var(--success-color, #43a047); }
.accent-alarm { --dw-accent: var(--error-color, #db4437); }
`;function I(M,C){if(!M)return"";let H=C?.locale?.language||C?.language||"hu",V=C?.locale?.time_format,L={hour:"2-digit",minute:"2-digit"};V==="12"&&(L.hour12=!0),V==="24"&&(L.hour12=!1);try{return new Intl.DateTimeFormat(H,L).format(M)}catch{return M.toTimeString().slice(0,5)}}function c(M,C){if(M==null)return null;let H=Math.max(0,Math.round(M));if(H<60)return{value:String(H),unit:C("ui.minute_short")};let V=Math.floor(H/60),L=H%60;return{value:`${V}:${String(L).padStart(2,"0")}`,unit:C("ui.hour_short")}}function O(M,C){let H=c(M,C);return H?`${H.value} ${H.unit}`:""}function N1(M){if(M==null)return null;let C=Math.max(0,Math.round(M)),H=Math.floor(C/60),V=C%60;return H?`${H}:${String(V).padStart(2,"0")}`:`0:${String(V).padStart(2,"0")}`}function h(M,C=1){return M==null||!Number.isFinite(M)?"\u2013":M.toFixed(C).replace(/\.0$/,"")}function A(M){return String(M??"").replace(/[&<>"']/g,C=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[C])}var r2={language:"auto",compact:!1,animate:!0,show_programs:!0,show_options:!0,show_delay:!0,show_scores:!0,show_consumption:!0,show_details:!0,show_controls:!0},e2=[e.OFF,e.IDLE,e.READY_TO_START],I1=[e.IDLE,e.READY_TO_START],W=class extends HTMLElement{static getConfigElement(){return document.createElement(s)}static getStubConfig(C){let H=y(C);return{type:`custom:${l}`,device:H[0]?.id}}constructor(){super(),this.attachShadow({mode:"open"}),this._sections={},this._signatures={},this._built=!1}setConfig(C){this._config={...r2,...C||{}},this._signatures={},this._hass&&this._render()}set hass(C){this._hass=C,this._render()}get hass(){return this._hass}connectedCallback(){this._timer=window.setInterval(()=>this._render(),3e4)}disconnectedCallback(){this._timer&&window.clearInterval(this._timer),this._timer=void 0}getCardSize(){return this._config?.compact?5:9}getGridOptions(){return{columns:12,min_columns:6,rows:this._config?.compact?6:"auto"}}_build(){let C=document.createElement("style");C.textContent=_1;let H=document.createElement("ha-card"),V=document.createElement("div");V.className="wrap",V.addEventListener("click",L=>this._onClick(L));for(let L of["header","hero","alerts","programs","options","delay","meters","controls","details"]){let r=document.createElement("div");r.dataset.section=L,this._sections[L]=r,V.appendChild(r)}H.appendChild(V),this.shadowRoot.replaceChildren(C,H),this._card=H,this._wrap=V,this._built=!0}_render(){if(!this._hass||!this._config)return;this._built||this._build();let C=k(this._config,this._hass),H=w(C);this._t=H;let V=M1(this._hass,this._config);if(this._model=V,!V.ok){this._renderEmpty(V,H);return}this._emptyShown=!1,this._applyHostClasses(V),this._section("header",this._headerHtml(V,H)),this._heroSection(V,H),this._section("alerts",this._alertsHtml(V,H)),this._section("programs",this._config.show_programs?this._programsHtml(V,H):""),this._section("options",this._config.show_options?this._optionsHtml(V,H):""),this._section("delay",this._config.show_delay?this._delayHtml(V,H):""),this._section("meters",this._metersHtml(V,H)),this._section("controls",this._config.show_controls?this._controlsHtml(V,H):""),this._section("details",this._config.show_details?this._detailsHtml(V,H):"")}_renderEmpty(C,H){if(this._emptyShown!==C.reason){this._emptyShown=C.reason,this._signatures={};for(let V of Object.values(this._sections))V.innerHTML="";this._sections.header.innerHTML=`
      <div class="empty">
        ${d("dishwasher")}
        <div>${A(H(`ui.${C.reason}`))}</div>
      </div>`}}_section(C,H){this._signatures[C]!==H&&(this._signatures[C]=H,this._sections[C].innerHTML=H)}_applyHostClasses(C){let H=["wrap"];this._config.compact&&H.push("compact"),this._config.animate||H.push("no-animation"),H.push(`accent-${C.accent}`),C.state===e.RUNNING&&H.push("running"),C.state===e.PAUSED&&H.push("paused"),C.state===e.END_OF_CYCLE&&H.push("done"),C.state===e.OFF&&H.push("off"),(C.state===e.ALARM||C.alerts.some(L=>F[L]==="error"))&&H.push("alarm"),C.step==="DRYING"&&H.push("phase-drying"),C.doorOpen&&H.push("door-open");let V=H.join(" ");this._wrap.className!==V&&(this._wrap.className=V)}_headerHtml(C,H){let V=A(C.name||H("card_name")),L=C.program&&p[C.program]?`${H(`program.${C.program}`)} \xB7 ${O(p[C.program].duration,H)}`:C.programRaw||"",r=[];return C.online?C.linkQuality&&r.push(`<span title="${H("ui.wifi")}: ${C.linkQuality}">${d("wifi")}</span>`):r.push(`<span class="bad" title="${H("ui.offline")}">${d("wifi_off")}</span>`),C.doorOpen&&r.push(`<span class="bad" title="${H("ui.door_open")}">${d("door")}</span>`),C.ecoMode&&r.push(`<span title="${H("ui.eco_mode")}">${d("leaf")}</span>`),`
      <div class="header">
        <div>
          <div class="title" data-action="more-info">${V}</div>
          ${L?`<div class="sub">${A(L)}</div>`:""}
        </div>
        <div class="spacer"></div>
        <div class="badges">${r.join("")}</div>
        <div class="pill">${d(this._stateIcon(C))}${A(H(`state.${C.state}`))}</div>
      </div>`}_stateIcon(C){switch(C.state){case e.RUNNING:return"water";case e.PAUSED:return"pause";case e.END_OF_CYCLE:return"check";case e.DELAYED_START:return"timer";case e.ALARM:return"error";case e.READY_TO_START:return"play";default:return"power"}}_heroSection(C,H){this._sections.hero.querySelector(".machine")||(this._sections.hero.innerHTML=`
        <div class="hero">
          <div class="machine-wrap" data-action="more-info">${e1()}</div>
          <div class="status"></div>
        </div>`,this._statusNode=this._sections.hero.querySelector(".status"));let V=this._statusHtml(C,H);this._signatures.status!==V&&(this._signatures.status=V,this._statusNode.innerHTML=V),t1(this._sections.hero,this._displayText(C,H))}_displayText(C,H){return C.state===e.OFF?"":C.remaining!==null&&[e.RUNNING,e.PAUSED,e.DELAYED_START].includes(C.state)?N1(C.remaining):C.state===e.END_OF_CYCLE?"0:00":C.program?H(`program.${C.program}`).slice(0,8):"--:--"}_statusHtml(C,H){let V=[],L=C.state===e.RUNNING&&C.phase!=="UNAVAILABLE"?`<span class="phase-text">${A(H(`phase_long.${C.phase}`))}</span>`:"";V.push(`
      <div class="status-line">
        <span class="state-text">${A(H(`state.${C.state}`))}</span>
        ${L}
      </div>`),C.program&&V.push(`
        <div class="program-line">
          ${d(p[C.program]?.icon||"dishwasher")}
          <span>${A(H(`program.${C.program}`))}</span>
        </div>`);let r=this._countdownHtml(C,H);return r&&V.push(r),[e.RUNNING,e.PAUSED,e.END_OF_CYCLE].includes(C.state)&&(V.push(`<div class="bar"><i style="width:${Math.round(C.progress*100)}%"></i></div>`),V.push(this._timelineHtml(C,H))),V.join("")}_countdownHtml(C,H){if(C.state===e.END_OF_CYCLE)return`<div class="countdown"><span class="at">${d("check")}${A(H("ui.finished_hint"))}</span></div>`;if(C.state===e.DELAYED_START){let V=c(C.delay||C.remaining,H),L=C.startAt?`<span class="at">${d("clock")}${A(H("ui.starts_at"))} ${I(C.startAt,this._hass)}</span>`:"";return V?`<div class="countdown"><span class="value">${V.value}</span><span class="unit">${V.unit}</span>${L}</div>`:""}if([e.RUNNING,e.PAUSED].includes(C.state)){let V=c(C.remaining,H);if(!V)return"";let L=C.finishAt?`<span class="at">${d("clock")}${A(H("ui.ready_at"))} ${I(C.finishAt,this._hass)}</span>`:"";return`<div class="countdown"><span class="value">${V.value}</span><span class="unit">${V.unit}</span>${L}</div>`}if(C.program&&p[C.program]&&[e.OFF,e.IDLE,e.READY_TO_START].includes(C.state)){let V=c(p[C.program].duration,H);return`<div class="countdown"><span class="value">${V.value}</span><span class="unit">${V.unit}</span>
        <span class="at">${d("timer")}${A(H("ui.duration"))}</span></div>`}return""}_timelineHtml(C,H){let V=p[C.program]?.steps||T,L=C.step?V.indexOf(C.step):-1;return`<div class="timeline">${T.map(t=>{let i=V.includes(t),o=V.indexOf(t),a="step";return i?L>=0&&o<L?a+=" done":L>=0&&o===L?a+=" active":C.state===e.END_OF_CYCLE&&(a+=" done"):a+=" skip",`<div class="${a}"><span class="dot"></span><span class="label">${A(H(`phase.${t}`))}</span></div>`}).join("")}</div>`}_alertsHtml(C,H){let V=[];C.doorOpen&&C.state!==e.OFF&&V.push({severity:"warning",text:H("ui.door_open"),iconName:"door"});for(let L of C.alerts){let r=F[L]||"warning",t=H(`alert.${L}`,`${H("alert_generic")}: ${L}`);V.push({severity:r,text:t,iconName:r==="error"?"error":"alert"})}return C.online||V.push({severity:"error",text:H("ui.offline"),iconName:"wifi_off"}),V.length?`<div class="alerts">${V.map(L=>`<div class="alert ${L.severity}">${d(L.iconName)}<span>${A(L.text)}</span></div>`).join("")}</div>`:""}_programsHtml(C,H){if(!C.entities.program||!C.programOptions.length)return"";let V=e2.includes(C.state)&&C.remoteEnabled,L=C.programOptions.filter(o=>p[o.key]),t=[...R.map(o=>L.find(a=>a.key===o)).filter(Boolean),...L.filter(o=>!R.includes(o.key))].map(o=>{let a=o.key===C.program,v=p[o.key],n=`${H(`program_hint.${o.key}`)} \xB7 ${h(v.water)} l \xB7 ${h(v.energy,3)} kWh \xB7 ${O(v.duration,H)}`;return`<button class="chip" type="button" data-action="program" data-value="${A(o.label)}"
        aria-pressed="${a}" title="${A(n)}" ${V?"":"disabled"}>
        ${d(v.icon)}<span>${A(H(`program.${o.key}`))}</span></button>`}),i=C.program?A(H(`program_hint.${C.program}`)):"";return`
      <div class="section">
        <div class="section-title">${A(H("ui.program"))}</div>
        <div class="chips">${t.join("")}</div>
        ${i?`<div class="note">${i}</div>`:""}
      </div>`}_optionsHtml(C,H){if(!C.options.length)return"";let V=I1.includes(C.state)&&C.remoteEnabled,L=C.options.filter(t=>t.supported||t.on);if(!L.length)return`
        <div class="section">
          <div class="section-title">${A(H("ui.options"))}</div>
          <div class="note">${A(H("ui.no_options"))}</div>
        </div>`;let r=L.map(t=>`<button class="chip" type="button" data-action="option" data-value="${t.entityId}"
        aria-pressed="${t.on}" title="${A(H(`option_hint.${t.key}`))}"
        ${V&&t.supported?"":"disabled"}>
        ${d(t.icon)}<span>${A(H(`option.${t.key}`))}</span></button>`);return`
      <div class="section">
        <div class="section-title">${A(H("ui.options"))}</div>
        <div class="chips">${r.join("")}</div>
      </div>`}_delayHtml(C,H){if(!C.entities.start_time)return"";let V=C.state===e.DELAYED_START||C.delay>0,L=(I1.includes(C.state)||C.state===e.DELAYED_START)&&C.remoteEnabled;if(!L&&!V)return"";let r=X.map(i=>{let o=C.delay===i;return`<button class="chip" type="button" data-action="delay" data-value="${i}"
        aria-pressed="${o}" ${L?"":"disabled"}>
        ${d("timer")}<span>${i/60} ${A(H("ui.hour_short"))}</span></button>`});V&&r.push(`<button class="chip" type="button" data-action="delay" data-value="-1" ${L?"":"disabled"}>
        ${d("stop")}<span>${A(H("ui.delay_cancel"))}</span></button>`);let t=V?`<span class="hint">${A(O(C.delay,H))}</span>`:`<span class="hint">${A(H("ui.delay_off"))}</span>`;return`
      <div class="section">
        <div class="section-title">${A(H("ui.delay"))}${t}</div>
        <div class="chips">${r.join("")}</div>
      </div>`}_metersHtml(C,H){let V=[],{eco:L,energy:r,water:t}=C.scores;if(this._config.show_scores&&(L!==null||r!==null||t!==null)){let i=(o,a,v,n)=>{let B=Math.max(0,Math.min(7,n??0)),u=Array.from({length:7},(g,f)=>`<i class="${f<B?"on":""}"></i>`).join("");return`
          <div class="meter ${a}">
            <div class="top">${d(v)}<span>${A(H(`ui.${o}`))}</span>
              <span class="val">${n===null?"\u2013":`${n}/7`}</span></div>
            <div class="track">${u}</div>
          </div>`};V.push(`
        <div class="meters">
          ${i("eco_score","eco","leaf",L)}
          ${i("energy_score","energy","energy",r)}
          ${i("water_score","water","water",t)}
        </div>`)}if(this._config.show_consumption&&C.program&&p[C.program]){let i=p[C.program];V.push(`
        <div class="facts">
          <span class="fact">${d("water")}<b>${h(i.water)}</b> l</span>
          <span class="fact">${d("energy")}<b>${h(i.energy,3)}</b> kWh</span>
          <span class="fact">${d("timer")}<b>${A(O(i.duration,H))}</b></span>
        </div>`)}return V.length?`
      <div class="section">
        <div class="section-title">${A(H("ui.scores"))}</div>
        ${V.join("")}
      </div>`:""}_controlsHtml(C,H){let L=(q[C.state]||[]).filter(t=>C.entities[`cmd_${t}`]).map(t=>{let i=j[t],o=!C.remoteEnabled&&t!=="off"?"disabled":"";return`<button class="btn ${i.style}" type="button" data-action="command" data-value="${t}" ${o}>
          ${d(i.icon)}<span>${A(H(`command.${t}`))}</span></button>`});if(!L.length)return"";let r=C.remoteEnabled?"":`<div class="note">${d("remote")}${A(H("ui.remote_disabled_hint"))}</div>`;return`<div class="section"><div class="controls">${L.join("")}</div>${r}</div>`}_detailsHtml(C,H){let V=[],L=(r,t,i)=>{t==null||t===""||V.push(`
        <div class="detail">
          <span class="k">${A(H(`ui.${r}`))}</span>
          <span class="v">${d(i)}${A(String(t))}</span>
        </div>`)};if(C.doorOpen!==null&&L("door",C.doorOpen?H("ui.door_open"):H("ui.door_closed"),C.doorOpen?"door":"door_closed"),C.remote){let r=C.remote.includes("TEMPORARY")?H("ui.remote_locked"):C.remoteEnabled?H("ui.remote_on"):H("ui.remote_off");L("remote",r,"remote")}if(C.linkQuality){let r=C.linkQuality.replace(/_/g," ").toLowerCase();L("wifi",r.charAt(0).toUpperCase()+r.slice(1),"wifi")}return C.cycles!==null&&L("cycles",C.cycles,"counter"),C.rinseAid!==null&&L("rinse_aid",`${C.rinseAid}/8`,"water_percent"),C.waterHardness&&L("water_hardness",C.waterHardness,"water"),V.length?`
      <div class="section">
        <div class="section-title">${A(H("ui.details"))}</div>
        <div class="details">${V.join("")}</div>
      </div>`:""}_onClick(C){let H=C.target.closest("[data-action]");if(!H||H.hasAttribute("disabled"))return;let{action:V,value:L}=H.dataset,r=this._model;if(!(!r?.ok&&V!=="more-info"))switch(V){case"more-info":this._moreInfo(r?.entities?.appliance_state);break;case"program":this._selectProgram(L);break;case"option":this._haptic("light"),this._call("switch","toggle",{entity_id:L});break;case"command":this._haptic("medium"),this._call("button","press",{entity_id:r.entities[`cmd_${L}`]});break;case"delay":this._haptic("light"),this._call("number","set_value",{entity_id:r.entities.start_time,value:Number(L)});break;default:break}}async _selectProgram(C){let H=this._model;this._haptic("light"),H.state===e.OFF&&H.entities.cmd_on&&(await this._call("button","press",{entity_id:H.entities.cmd_on}),await new Promise(V=>window.setTimeout(V,1500))),await this._call("select","select_option",{entity_id:H.entities.program,option:C})}_call(C,H,V){return V.entity_id?this._hass.callService(C,H,V):Promise.resolve()}_moreInfo(C){C&&this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:C},bubbles:!0,composed:!0}))}_haptic(C){this.dispatchEvent(new CustomEvent("haptic",{detail:C,bubbles:!0,composed:!0}))}};function W1(){customElements.get(l)||(customElements.define(l,W),window.customCards=window.customCards||[],window.customCards.push({type:l,name:"AEG / Electrolux Dishwasher Card",description:"Rich status card for AEG and Electrolux dishwashers: phases, remaining time, programs, options and controls.",preview:!0,documentationURL:"https://github.com/gabor-io/ha-appliance-custom-card"}),console.info(`%c ${l} %c ${Q} `,"color:#fff;background:#039be5;font-weight:700;border-radius:3px 0 0 3px","color:#039be5;background:#e1f5fe;font-weight:700;border-radius:0 3px 3px 0"))}var t2=["show_programs","show_options","show_delay","show_scores","show_consumption","show_details","show_controls","compact","animate"],i2=`
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
.toggles { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 8px; }
.toggle { display: flex; align-items: center; gap: 8px; font-size: .85rem;
  color: var(--primary-text-color, #212121); cursor: pointer; }
`,z=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}setConfig(C){this._config={...C},this._render()}set hass(C){this._hass=C,this._render()}_render(){if(!this._config||!this._hass)return;let C=w(k(this._config,this._hass)),H=y(this._hass),V=this._config.device||"",L=[`<option value="" ${V?"":"selected"}>${A(C("editor.device_auto"))}</option>`,...H.map(i=>`<option value="${A(i.id)}" ${i.id===V?"selected":""}>${A(i.name)}</option>`)].join(""),r=[`<option value="auto">${A(C("editor.language_auto"))}</option>`,...J.map(i=>`<option value="${i}" ${this._config.language===i?"selected":""}>${i.toUpperCase()}</option>`)].join(""),t=t2.map(i=>{let o=this._config[i]!==!1,a=i==="compact"?this._config.compact===!0:o;return`<label class="toggle"><input type="checkbox" data-key="${i}" ${a?"checked":""}>
        <span>${A(C(`editor.${i}`))}</span></label>`}).join("");this.shadowRoot.innerHTML=`
      <style>${i2}</style>
      <div class="form">
        <label>${A(C("editor.device"))}
          <select data-key="device">${L}</select>
        </label>
        <label>${A(C("editor.name"))}
          <input type="text" data-key="name" value="${A(this._config.name||"")}">
        </label>
        <label>${A(C("editor.language"))}
          <select data-key="language">${r}</select>
        </label>
        <div class="title">${A(C("editor.sections"))}</div>
        <div class="toggles">${t}</div>
      </div>`,this.shadowRoot.querySelectorAll("[data-key]").forEach(i=>{let o=(i.type==="text","change");i.addEventListener(o,a=>this._onChange(a))})}_onChange(C){let H=C.target,V=H.dataset.key,L={...this._config,type:this._config.type||`custom:${l}`};H.type==="checkbox"?L[V]=H.checked:H.value===""?delete L[V]:L[V]=H.value,this._config=L,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:L},bubbles:!0,composed:!0}))}};function z1(){customElements.get(s)||customElements.define(s,z)}z1();W1();
