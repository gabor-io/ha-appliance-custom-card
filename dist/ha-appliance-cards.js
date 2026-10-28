/*! ha-appliance-cards v1.21.0 - https://github.com/gabor-io/ha-appliance-custom-card - MIT licence */
var q="aeg-dishwasher-card",R1="aeg-dishwasher-card-editor",s3="1.21.0",A={OFF:"OFF",IDLE:"IDLE",READY_TO_START:"READY_TO_START",DELAYED_START:"DELAYED_START",RUNNING:"RUNNING",PAUSED:"PAUSED",END_OF_CYCLE:"END_OF_CYCLE",ALARM:"ALARM",UNKNOWN:"UNKNOWN"},l3={[A.OFF]:"idle",[A.IDLE]:"idle",[A.READY_TO_START]:"ready",[A.DELAYED_START]:"delayed",[A.RUNNING]:"running",[A.PAUSED]:"paused",[A.END_OF_CYCLE]:"done",[A.ALARM]:"alarm",[A.UNKNOWN]:"idle"},M1={PREWASH:"PREWASH",MAINWASH:"MAINWASH",COLDRINSE:"COLDRINSE",HOTRINSE:"HOTRINSE",EXTRARINSE:"EXTRARINSE",DRYING:"DRYING",ADO_DRYING:"ADO_DRYING",UNAVAILABLE:"UNAVAILABLE"},U2=["PREWASH","MAINWASH","RINSE","DRYING"],d3={[M1.PREWASH]:"PREWASH",[M1.MAINWASH]:"MAINWASH",[M1.COLDRINSE]:"RINSE",[M1.HOTRINSE]:"RINSE",[M1.EXTRARINSE]:"RINSE",[M1.DRYING]:"DRYING",[M1.ADO_DRYING]:"DRYING"},P={ECO:{icon:"leaf",water:8.4,energy:.488,duration:310,steps:["PREWASH","MAINWASH","RINSE","DRYING"]},AUTO:{icon:"auto",water:12.5,energy:1,duration:180,steps:["PREWASH","MAINWASH","RINSE","DRYING"]},QUICK30:{icon:"quick",water:8.5,energy:.475,duration:30,steps:["MAINWASH","RINSE"]},QUICK60:{icon:"clock",water:10.5,energy:1,duration:60,steps:["MAINWASH","RINSE","DRYING"]},NORMAL90:{icon:"clock",water:10.5,energy:1,duration:90,steps:["MAINWASH","RINSE","DRYING"]},"120_MIN":{icon:"clock",water:10.5,energy:.9,duration:120,steps:["MAINWASH","RINSE","DRYING"]},RINSE:{icon:"rinse",water:4,energy:.15,duration:15,steps:["PREWASH"],scores:!1},MACHINE_CARE:{icon:"care",water:10,energy:.575,duration:60,steps:["MAINWASH","RINSE","DRYING"],scores:!1}},K2=["ECO","AUTO","QUICK30","QUICK60","NORMAL90","120_MIN","RINSE","MACHINE_CARE"],p3=[{key:"xtra_dry",entity:"xtra_dry_option",icon:"dry",programs:["ECO","QUICK60","NORMAL90","120_MIN"]},{key:"extra_power",entity:"extra_power_option",icon:"power",programs:["QUICK30","QUICK60","NORMAL90","120_MIN"]},{key:"extra_silent",entity:"extra_silent_option",icon:"silent",programs:["ECO","NORMAL90","120_MIN"]},{key:"glass_care",entity:"glass_care_option",icon:"glass",programs:["QUICK30","QUICK60","NORMAL90","120_MIN"]},{key:"sanitize",entity:"sanitize_option",icon:"sanitize",programs:["QUICK30","QUICK60","NORMAL90","120_MIN"]},{key:"spray_zone",entity:"spray_zone_option",icon:"spray",programs:["QUICK30","QUICK60","NORMAL90","120_MIN"]},{key:"zone_clean",entity:"zone_clean_option",icon:"zone",programs:["QUICK30","QUICK60","NORMAL90","120_MIN"]},{key:"one_rack",entity:"one_rack_option",icon:"rack",programs:["QUICK30","QUICK60"]},{key:"auto_door_opener",entity:"auto_door_opener",icon:"door",programs:null}],A3={[A.OFF]:["on"],[A.IDLE]:["start","off"],[A.READY_TO_START]:["start","off"],[A.DELAYED_START]:["stopreset"],[A.RUNNING]:["pause"],[A.PAUSED]:["resume","stopreset"],[A.END_OF_CYCLE]:["stopreset","off"],[A.ALARM]:["stopreset","off"],[A.UNKNOWN]:[]},m3={on:{icon:"power",style:"ghost"},off:{icon:"power",style:"ghost"},start:{icon:"play",style:"primary"},pause:{icon:"pause",style:"primary"},resume:{icon:"play",style:"primary"},stopreset:{icon:"stop",style:"ghost"}},C2={DISH_ALARM_SALT_MISSING:"warning",DISH_ALARM_RINSE_AID_LOW:"warning",DISH_ALARM_I10:"error",DISH_ALARM_I11:"error",DISH_ALARM_I20:"error",DISH_ALARM_I30:"error",DISH_ALARM_I41:"error",DISH_ALARM_I43:"error",DISH_ALARM_I44:"error",DISH_ALARM_IF1:"error"},c3=[60,120,180,240,360,480,720],n1=10,s1=1440;function k(L,C,H){let V=L?.language&&L.language!=="auto"?L.language:null,e=(C?.locale?.language||C?.language||"en").slice(0,2).toLowerCase(),t=V||e;return H.includes(t)?t:"en"}function T(L,C,H="en"){let V=L[C]||L[H],e=L[H],t=(r,i)=>i.split(".").reduce((o,M)=>o?o[M]:void 0,r);return(r,i="")=>{let o=t(V,r);if(o!==void 0)return o;let M=t(e,r);return M!==void 0?M:i}}var L8={card_name:"Mosogat\xF3g\xE9p",state:{OFF:"Kikapcsolva",IDLE:"K\xE9szenl\xE9tben",READY_TO_START:"Ind\xEDt\xE1sra k\xE9sz",DELAYED_START:"K\xE9sleltetett ind\xEDt\xE1s",RUNNING:"Program fut",PAUSED:"Sz\xFCneteltetve",END_OF_CYCLE:"Elk\xE9sz\xFClt",ALARM:"Hiba",UNKNOWN:"Ismeretlen"},phase:{PREWASH:"El\u0151mos\xE1s",MAINWASH:"Mosogat\xE1s",RINSE:"\xD6bl\xEDt\xE9s",DRYING:"Sz\xE1r\xEDt\xE1s",UNAVAILABLE:"\u2013"},phase_long:{PREWASH:"El\u0151mos\xE1s",MAINWASH:"Mosogat\xE1s",COLDRINSE:"Hideg \xF6bl\xEDt\xE9s",HOTRINSE:"Meleg \xF6bl\xEDt\xE9s",EXTRARINSE:"Extra \xF6bl\xEDt\xE9s",DRYING:"Sz\xE1r\xEDt\xE1s",ADO_DRYING:"AirDry sz\xE1r\xEDt\xE1s",UNAVAILABLE:"Nincs fut\xF3 f\xE1zis"},program:{ECO:"Eco",AUTO:"Auto",QUICK30:"Quick 30",QUICK60:"1h00m",NORMAL90:"1h30m","120_MIN":"2h00m",RINSE:"\xD6bl\xEDt\xE9s \xE9s v\xE1rakoz\xE1s",MACHINE_CARE:"G\xE9p\xE1pol\xE1s"},program_hint:{ECO:"Norm\xE1l szennyezetts\xE9g, a leghat\xE9konyabb v\xEDz- \xE9s energiafogyaszt\xE1s.",AUTO:"B\xE1rmilyen szennyezetts\xE9g, a g\xE9p m\xE9ri a t\xF6ltetet \xE9s a koszt.",QUICK30:"Friss szennyez\u0151d\xE9s, sz\xE1r\xEDt\xE1si f\xE1zis n\xE9lk\xFCl.",QUICK60:"Friss, enyh\xE9n r\xE1sz\xE1radt szennyez\u0151d\xE9s.",NORMAL90:"Norm\xE1l, enyh\xE9n r\xE1sz\xE1radt szennyez\u0151d\xE9s, l\xE1basokhoz is.","120_MIN":"Norm\xE1l, r\xE1sz\xE1radt szennyez\u0151d\xE9s, l\xE1basokhoz \xE9s serpeny\u0151kh\xF6z.",RINSE:"Felfriss\xEDti a k\xE9s\u0151bb mosand\xF3 ed\xE9nyeket. Mos\xF3szer n\xE9lk\xFCl!",MACHINE_CARE:"A g\xE9p belsej\xE9nek tiszt\xEDt\xE1sa v\xEDzk\u0151 \xE9s zs\xEDr ellen."},option:{xtra_dry:"ExtraDry",extra_power:"ExtraPower",extra_silent:"ExtraSilent",glass_care:"GlassCare",sanitize:"Fert\u0151tlen\xEDt\xE9s",spray_zone:"SprayZone",zone_clean:"ZoneClean",one_rack:"Egy kos\xE1r",auto_door_opener:"AutoOpen ajt\xF3"},option_hint:{xtra_dry:"Intenz\xEDvebb sz\xE1r\xEDt\xE1s a program v\xE9g\xE9n.",extra_power:"Er\u0151sebb mosogat\xE1s makacs szennyez\u0151d\xE9shez.",extra_silent:"Halkabb m\u0171k\xF6d\xE9s, hosszabb program.",glass_care:"\xDCveg\xE1rut k\xEDm\xE9l\u0151, max. 45 \xB0C.",sanitize:"Extra fert\u0151tlen\xEDt\u0151 \xF6bl\xEDt\xE9s.",spray_zone:"F\xF3kusz\xE1lt v\xEDzsug\xE1r az als\xF3 kos\xE1rban.",zone_clean:"Als\xF3 kos\xE1r er\u0151s, fels\u0151 kos\xE1r k\xEDm\xE9l\u0151 mos\xE1s.",one_rack:"Csak az egyik kos\xE1r mos\xE1sa.",auto_door_opener:"A ciklus v\xE9g\xE9n automatikusan kinyitja az ajt\xF3t."},command:{on:"Bekapcsol\xE1s",off:"Kikapcsol\xE1s",start:"Ind\xEDt\xE1s",pause:"Sz\xFCnet",resume:"Folytat\xE1s",stopreset:"Le\xE1ll\xEDt\xE1s"},alert:{DISH_ALARM_SALT_MISSING:"A s\xF3tart\xE1lyt fel kell t\xF6lteni",DISH_ALARM_RINSE_AID_LOW:"Az \xF6bl\xEDt\u0151szer-adagol\xF3 ki\xFCr\xFClt",DISH_ALARM_I10:"i10 \u2013 a k\xE9sz\xFCl\xE9k nem t\xF6lt be vizet. Ellen\u0151rizze a v\xEDzcsapot \xE9s a sz\u0171r\u0151t.",DISH_ALARM_I11:"i11 \u2013 a k\xE9sz\xFCl\xE9k nem t\xF6lt be vizet. Ellen\u0151rizze a v\xEDzcsapot \xE9s a sz\u0171r\u0151t.",DISH_ALARM_I20:"i20 \u2013 a k\xE9sz\xFCl\xE9k nem ereszti le a vizet. Ellen\u0151rizze a szifont \xE9s a sz\u0171r\u0151ket.",DISH_ALARM_I30:"i30 \u2013 a t\xFAlcsordul\xE1sg\xE1tl\xF3 bekapcsolt. Z\xE1rja el a v\xEDzcsapot!",DISH_ALARM_IF1:"iF1 \u2013 t\xFAl magas a v\xEDzszint a k\xE9sz\xFCl\xE9kben."},alert_generic:"Riaszt\xE1s",ui:{remaining:"H\xE1tral\xE9v\u0151 id\u0151",ready_at:"Elk\xE9sz\xFCl",starts_at:"Indul",start_in:"Ind\xEDt\xE1s eddig",door:"Ajt\xF3",door_open:"Az ajt\xF3 nyitva",door_closed:"Ajt\xF3 z\xE1rva",program:"Program",options:"Kieg\xE9sz\xEDt\u0151 funkci\xF3k",no_options:"Ehhez a programhoz nincs v\xE1laszthat\xF3 funkci\xF3.",delay:"K\xE9sleltetett ind\xEDt\xE1s",delay_off:"Nincs",delay_cancel:"T\xF6rl\xE9s",delay_amount:"K\xE9sleltet\xE9s",ready_by:"Legyen k\xE9sz",ready_by_hint:"Add meg, mikorra legyen k\xE9sz, majd nyomd meg a pip\xE1t \u2013 a k\xE1rtya kisz\xE1molja a k\xE9sleltet\xE9st, 10 percre lefel\xE9 kerek\xEDtve.",ready_by_apply:"K\xE9sleltet\xE9s kisz\xE1m\xEDt\xE1sa",ready_by_too_soon:"Ennyi id\u0151 alatt nem f\xE9r bele, a legkor\xE1bbi befejez\xE9s",ready_by_max:"A g\xE9p legfeljebb 24 \xF3ra k\xE9sleltet\xE9st fogad el, ennyire \xE1ll\xEDtottam",ready_by_set:"K\xE9sleltet\xE9s be\xE1ll\xEDtva",scores:"Hat\xE9konys\xE1g",scores_updating:"friss\xFCl\u2026",eco_score:"Eco",energy_score:"Energia",water_score:"V\xEDz",consumption:"V\xE1rhat\xF3 fogyaszt\xE1s",water:"V\xEDz",energy:"Energia",duration:"Id\u0151tartam",details:"R\xE9szletek",appliance_settings:"K\xE9sz\xFCl\xE9k be\xE1ll\xEDt\xE1sok",brightness:"Kijelz\u0151 f\xE9nyereje",floor_light:"TimeOnFloor",floor_light_hint:"A h\xE1tral\xE9v\u0151 id\u0151t a padl\xF3ra vet\xEDti.",end_sound:"Befejez\xE9s hangja",end_sound_hint:"Hangjelz\xE9s a program v\xE9g\xE9n.",key_tone:"Gombhangok",key_tone_hint:"A kezel\u0151panel gombjainak hangja.",brightness_hint:"A k\xE9sz\xFCl\xE9k kijelz\u0151j\xE9nek f\xE9nyereje (0\u20139).",remote:"T\xE1vvez\xE9rl\xE9s",remote_on:"Enged\xE9lyezve",remote_off:"Tiltva",remote_locked:"Ideiglenesen z\xE1rolva",cycles:"Lefutott ciklusok",wifi:"Wi-Fi jel",eco_mode:"Eco m\xF3d",rinse_aid:"\xD6bl\xEDt\u0151szer szintje",water_hardness:"V\xEDzkem\xE9nys\xE9g",offline:"Nincs kapcsolat a k\xE9sz\xFCl\xE9kkel",unavailable:"A k\xE9sz\xFCl\xE9k entit\xE1sai nem \xE9rhet\u0151k el",not_configured:"Nem tal\xE1lhat\xF3 Electrolux mosogat\xF3g\xE9p. Add meg a device vagy a prefix be\xE1ll\xEDt\xE1st a k\xE1rtya konfigur\xE1ci\xF3j\xE1ban.",remote_disabled_hint:"A vez\xE9rl\xE9shez enged\xE9lyezd a t\xE1vind\xEDt\xE1st a k\xE9sz\xFCl\xE9ken.",minute_short:"p",hour_short:"\xF3",finished:"A mosogat\xE1s elk\xE9sz\xFClt",finished_hint:"Kipakolhat\xF3",more:"T\xF6bb",less:"Kevesebb",just_now:"kevesebb mint egy perc"},editor:{device:"K\xE9sz\xFCl\xE9k",device_auto:"Automatikus felismer\xE9s",name:"N\xE9v",language:"Nyelv",language_auto:"Automatikus (HA nyelve)",sections:"Megjelen\xEDtett r\xE9szek",show_programs:"Programv\xE1laszt\xF3",show_options:"Kieg\xE9sz\xEDt\u0151 funkci\xF3k",show_delay:"K\xE9sleltetett ind\xEDt\xE1s",show_scores:"Hat\xE9konys\xE1gi pontok",show_consumption:"Fogyaszt\xE1si adatok",show_appliance_settings:"K\xE9sz\xFCl\xE9k be\xE1ll\xEDt\xE1sok",show_details:"R\xE9szletek",show_controls:"Vez\xE9rl\u0151gombok",compact:"Kompakt n\xE9zet",animate:"Anim\xE1ci\xF3k"}},t8={card_name:"Dishwasher",state:{OFF:"Off",IDLE:"Idle",READY_TO_START:"Ready to start",DELAYED_START:"Delayed start",RUNNING:"Running",PAUSED:"Paused",END_OF_CYCLE:"Finished",ALARM:"Fault",UNKNOWN:"Unknown"},phase:{PREWASH:"Prewash",MAINWASH:"Main wash",RINSE:"Rinse",DRYING:"Drying",UNAVAILABLE:"\u2013"},phase_long:{PREWASH:"Prewash",MAINWASH:"Main wash",COLDRINSE:"Cold rinse",HOTRINSE:"Hot rinse",EXTRARINSE:"Extra rinse",DRYING:"Drying",ADO_DRYING:"AirDry drying",UNAVAILABLE:"No active phase"},program:{ECO:"Eco",AUTO:"Auto",QUICK30:"Quick 30",QUICK60:"1h00m",NORMAL90:"1h30m","120_MIN":"2h00m",RINSE:"Rinse & Hold",MACHINE_CARE:"MachineCare"},program_hint:{ECO:"Normally soiled load, most efficient water and energy use.",AUTO:"Any soil level, the machine senses load and soiling.",QUICK30:"Freshly soiled load, no drying phase.",QUICK60:"Fresh, lightly dried-on soiling.",NORMAL90:"Normal, lightly dried-on soiling, pots included.","120_MIN":"Normal, dried-on soiling, pots and pans.",RINSE:"Refreshes dishes waiting for a full cycle. No detergent!",MACHINE_CARE:"Cleans the inside of the machine from limescale and grease."},option:{xtra_dry:"ExtraDry",extra_power:"ExtraPower",extra_silent:"ExtraSilent",glass_care:"GlassCare",sanitize:"Sanitize",spray_zone:"SprayZone",zone_clean:"ZoneClean",one_rack:"One rack",auto_door_opener:"AutoOpen door"},option_hint:{xtra_dry:"Stronger drying at the end of the program.",extra_power:"More powerful wash for stubborn soiling.",extra_silent:"Quieter operation, longer program.",glass_care:"Protects glassware, max. 45 \xB0C.",sanitize:"Extra sanitising rinse.",spray_zone:"Focused spray in the lower basket.",zone_clean:"Intensive lower basket, gentle upper basket.",one_rack:"Washes a single basket only.",auto_door_opener:"Opens the door automatically at the end of the cycle."},command:{on:"Turn on",off:"Turn off",start:"Start",pause:"Pause",resume:"Resume",stopreset:"Stop"},alert:{DISH_ALARM_SALT_MISSING:"Salt container needs refilling",DISH_ALARM_RINSE_AID_LOW:"Rinse aid dispenser is empty",DISH_ALARM_I10:"i10 \u2013 the appliance does not fill with water. Check the tap and the filter.",DISH_ALARM_I11:"i11 \u2013 the appliance does not fill with water. Check the tap and the filter.",DISH_ALARM_I20:"i20 \u2013 the appliance does not drain. Check the siphon and the filters.",DISH_ALARM_I30:"i30 \u2013 anti-flood device triggered. Close the water tap!",DISH_ALARM_IF1:"iF1 \u2013 water level inside the appliance is too high."},alert_generic:"Alert",ui:{remaining:"Remaining",ready_at:"Ready at",starts_at:"Starts at",start_in:"Start in",door:"Door",door_open:"Door is open",door_closed:"Door closed",program:"Program",options:"Options",no_options:"This program has no selectable options.",delay:"Delayed start",delay_off:"None",delay_cancel:"Cancel",delay_amount:"Delay",ready_by:"Ready by",ready_by_hint:"Pick when it should be done and press the tick - the card works out the delay, rounded down to 10 minutes.",ready_by_apply:"Work out the delay",ready_by_too_soon:"That is too soon, the earliest finish is",ready_by_max:"The appliance accepts at most 24 hours, so it was set to that",ready_by_set:"Delay set",scores:"Efficiency",scores_updating:"updating\u2026",eco_score:"Eco",energy_score:"Energy",water_score:"Water",consumption:"Estimated use",water:"Water",energy:"Energy",duration:"Duration",details:"Details",appliance_settings:"Appliance settings",brightness:"Display brightness",floor_light:"TimeOnFloor",floor_light_hint:"Projects the remaining time onto the floor.",end_sound:"End of cycle sound",end_sound_hint:"Beeps when the program finishes.",key_tone:"Key tone",key_tone_hint:"Sound of the control panel buttons.",brightness_hint:"Brightness of the appliance display (0-9).",remote:"Remote control",remote_on:"Enabled",remote_off:"Disabled",remote_locked:"Temporarily locked",cycles:"Total cycles",wifi:"Wi-Fi signal",eco_mode:"Eco mode",rinse_aid:"Rinse aid level",water_hardness:"Water hardness",offline:"The appliance is offline",unavailable:"The appliance entities are unavailable",not_configured:"No Electrolux dishwasher found. Set the device or prefix option in the card configuration.",remote_disabled_hint:"Enable remote start on the appliance to control it.",minute_short:"m",hour_short:"h",finished:"The cycle has finished",finished_hint:"Ready to unload",more:"More",less:"Less",just_now:"less than a minute"},editor:{device:"Device",device_auto:"Auto detect",name:"Name",language:"Language",language_auto:"Automatic (HA language)",sections:"Visible sections",show_programs:"Program picker",show_options:"Options",show_delay:"Delayed start",show_scores:"Efficiency scores",show_consumption:"Consumption figures",show_appliance_settings:"Appliance settings",show_details:"Details",show_controls:"Control buttons",compact:"Compact layout",animate:"Animations"}},u3={hu:L8,en:t8},j2=Object.keys(u3);function H2(L,C){return k(L,C,j2)}function V2(L){return T(u3,L)}function y(L){return L==null?"":String(L).toUpperCase().replace(/[\s\-.]+/g,"_").replace(/_+/g,"_")}function x(L){return!L||L.state==="unavailable"||L.state==="unknown"}function r8(L){if(!L.length)return null;let C=L[0];for(let H of L.slice(1)){let V=0;for(;V<C.length&&V<H.length&&C[V]===H[V];)V+=1;C=C.slice(0,V)}return C.replace(/_+$/,"")||null}function e2(L,C,H){if(C?.prefix)return C.prefix;let V=new RegExp(`^${H.domain}\\..+_${H.suffix}$`),e=i=>i.replace(new RegExp(`^${H.domain}\\.`),"").replace(new RegExp(`_${H.suffix}$`),"");if(C?.device&&L?.entities){let i=Object.values(L.entities).find(M=>M.device_id===C.device&&V.test(M.entity_id));if(i)return e(i.entity_id);let o=Object.values(L.entities).filter(M=>M.device_id===C.device).map(M=>M.entity_id.split(".")[1]);if(o.length)return r8(o)}let t=C?.entities?.[H.key];if(t)return e(t);let r=Object.keys(L?.states||{}).filter(i=>V.test(i));return r.length===1?e(r[0]):null}function v3(L,C,H,V){if(!V||!L?.entities)return C;for(let[e,t]of Object.entries(H)){if(C[e]||!t)continue;let[r,i]=t,o=Object.values(L.entities).find(M=>M.device_id===V&&M.entity_id.startsWith(`${r}.`)&&M.entity_id.endsWith(`_${i}`)&&L.states?.[M.entity_id]);o&&(C[e]=o.entity_id)}return C}function x3(L,C){for(let H of C){let V=L?.entities?.[H]?.device_id;if(V)return V}return null}function L2(L,C,H,V){let e=C?.entities||{},t={};for(let r of new Set([...Object.keys(H),...Object.keys(e)])){let i=e[r];if(i){t[r]=i;continue}let o=H[r];if(!o||!V)continue;let M=`${o[0]}.${V}_${o[1]}`;L?.states?.[M]&&(t[r]=M)}return t}function t2(L,C){if(!L?.entities||!L?.devices)return[];let H=new RegExp(`^${C.domain}\\..+_${C.suffix}$`),V=new Map;for(let e of Object.values(L.entities)){if(!e.device_id||!H.test(e.entity_id))continue;let t=L.devices[e.device_id];t&&V.set(e.device_id,t.name_by_user||t.name||e.device_id)}return[...V.entries()].map(([e,t])=>({id:e,name:t}))}var f3={domain:"sensor",suffix:"appliance_state",key:"appliance_state"},h3={appliance_state:["sensor","appliance_state"],cycle_phase:["sensor","cycle_phase"],time_to_end:["sensor","time_to_end"],alerts:["sensor","alerts"],eco_score:["sensor","eco_score"],energy_score:["sensor","energy_score"],water_score:["sensor","water_score"],total_cycle_counter:["sensor","total_cycle_counter"],remote_control:["sensor","remote_control"],link_quality:["sensor","network_interface_link_quality_indicator"],door_state:["binary_sensor","door_state"],salt_missing:["binary_sensor","salt_missing"],rinse_aid_low:["binary_sensor","rinse_aid_low"],connectivity:["binary_sensor","connectivity_state"],eco_mode:["binary_sensor","miscellaneous_state_eco_mode"],program:["select","program_uid"],water_hardness:["select","water_hardness"],display_light:["select","display_light"],display_on_floor:["select","display_on_floor"],end_of_cycle_sound:["select","end_of_cycle_sound"],key_tone:["switch","key_tone"],start_time:["number","start_time"],rinse_aid_level:["number","rinse_aid_level"],cmd_on:["button","execute_command_on"],cmd_off:["button","execute_command_off"],cmd_start:["button","execute_command_start"],cmd_pause:["button","execute_command_pause"],cmd_resume:["button","execute_command_resume"],cmd_stopreset:["button","execute_command_stopreset"]},i8=["xtra_dry_option","extra_power_option","extra_silent_option","glass_care_option","sanitize_option","spray_zone_option","zone_clean_option","one_rack_option","auto_door_opener"];function a8(L,C){return e2(L,C,f3)}function Z3(L,C){let H=a8(L,C),V=L2(L,C,h3,H),e=C?.device||x3(L,Object.values(V));if(v3(L,V,h3,e),V.device=e||null,V.options={},H)for(let t of i8){let r=`switch.${H}_${t}`;L?.states?.[r]&&(V.options[t]=r)}return V.prefix=H,V}function r2(L){return t2(L,f3)}var y3="aeg-dishwasher-card:progress";function l1(L){if(x(L))return null;let C=Number(L.state);return Number.isFinite(C)?C:null}function o8(L){let C=l1(L);if(C===null||C<0)return null;let H=(L.attributes?.unit_of_measurement||"").toLowerCase();return H==="s"||H==="sec"||H==="seconds"?Math.round(C/60):H==="h"?Math.round(C*60):H?Math.round(C):C>1e3?Math.round(C/60):Math.round(C)}var g3=["NONE","OFF","OK","0","UNKNOWN","UNAVAILABLE"];function M8(L){if(x(L))return[];let C=L.attributes||{},H=Object.entries(C).filter(([i,o])=>/^[A-Z][A-Z0-9_]*$/.test(i)&&typeof o=="string").filter(([,i])=>!g3.includes(y(i).split("-")[0])).map(([i,o])=>({code:y(i),severity:y(String(o).split("-")[0])}));if(H.length)return H;let V=C.alerts??C.alert_list??L.state,e=[];Array.isArray(V)?e=V.map(i=>typeof i=="string"?i:i?.code):typeof V=="string"&&!/^\d+$/.test(V.trim())&&(e=V.split(/[,;]/));let t=e.map(i=>y(i)).filter(i=>i&&!g3.includes(i)).map(i=>({code:i,severity:""}));if(t.length)return t;let r=Number(L.state);return Number.isFinite(r)&&r>0?[{code:"",severity:"",count:r}]:[]}function n8(L){if(!L)return null;let C=L.attributes||{},H=String(C.unit_of_measurement||"").toLowerCase(),V=Number.isFinite(C.max)?C.max:1440,e=H==="s"||H==="sec"||H==="seconds"||!H&&V>5e3,t=l1(L);return{raw:t,seconds:e,step:Number.isFinite(C.step)?C.step:e?60:1,min:Number.isFinite(C.min)?C.min:-1,max:V,maxMinutes:e?Math.round(V/60):V,minutes:t===null||t<=0?0:e?Math.round(t/60):t}}function s8(){try{return JSON.parse(window.localStorage.getItem(y3)||"{}")}catch{return{}}}function S3(L){try{window.localStorage.setItem(y3,JSON.stringify(L))}catch{}}function l8(L,C,H,V){let e=H===A.RUNNING||H===A.PAUSED,t=s8(),r=t[L];if(!e)return r&&H!==A.DELAYED_START&&(delete t[L],S3(t)),{progress:H===A.END_OF_CYCLE?1:0,total:null};if(V===null)return{progress:0,total:null};let i=P[C]?.duration||0,o=r&&r.program===C,M=Math.max(V,i,o?r.total:0);return(!o||M!==r.total)&&(t[L]={program:C,total:M},S3(t)),{progress:M?Math.min(1,Math.max(0,1-V/M)):0,total:M}}function _3(L,C){if(x(L))return null;let H=L.attributes?.options||[],V=r=>C.includes(y(r)),e=H.find(V)||null,t=H.find(r=>!V(r))||null;return!e||!t?null:{on:!V(L.state),onOption:t,offOption:e}}function d8(L){if(x(L))return null;let C=e=>{let t=String(e).match(/(\d+)\s*$/);return t?Number(t[1]):null},H=(L.attributes?.options||[]).map(e=>({label:e,value:C(e)})).filter(e=>e.value!==null).sort((e,t)=>e.value-t.value);if(!H.length)return null;let V=H.find(e=>e.label===L.state);return{levels:H,value:V?V.value:C(L.state),min:H[0].value,max:H[H.length-1].value}}function b3(L,C){let H=Z3(L,C),V=w=>H[w]?L.states[H[w]]:void 0,e=V("appliance_state");if(!H.prefix||!e)return{ok:!1,reason:H.prefix?"unavailable":"not_configured",entities:H};let t=y(e.state)in A?y(e.state):A.UNKNOWN,r=V("program"),i=y(r?.state),o=P[i]?i:null,M=y(V("cycle_phase")?.state)||"UNAVAILABLE",n=d3[M]||null,l=o8(V("time_to_end")),{progress:d}=l8(H.prefix,o,t,l),p=n8(V("start_time")),v=p?p.minutes:0,f=V("door_state"),m=f?f.state==="on":null,Z=V("connectivity"),c=Z?Z.state==="on":!0,S=y(V("remote_control")?.state),_=S===""||S.includes("ENABLED"),b=P[o]?.duration||0,h=l!==null&&l>0?l:null,O=null;if(t===A.RUNNING||t===A.PAUSED)O=l;else if(t===A.DELAYED_START)O=h!==null&&h>v?h:b?v+b:null;else if(t===A.IDLE||t===A.READY_TO_START){let w=h!==null?h:b||null;O=w===null?null:w+v}let D=O!==null?new Date(Date.now()+O*6e4):null,G=v?new Date(Date.now()+v*6e4):null,v1=p3.map(w=>{let G2=H.options?.[w.entity],n3=G2?L.states[G2]:void 0;return{...w,entityId:G2,on:n3?.state==="on",exists:!!n3,supported:!w.programs||!o||w.programs.includes(o)}}).filter(w=>w.exists),z=(r?.attributes?.options||[]).map(w=>({label:w,key:y(w)}));return{ok:!0,entities:H,state:t,accent:l3[t]||"idle",phase:M,step:n,program:o,programRaw:r?.state||null,programOptions:z,remaining:l,minutesToFinish:O,progress:d,finishAt:D,startAt:G,delay:v,delayControl:p,delayEntity:H.start_time,doorOpen:m,online:c,remote:S,remoteEnabled:_,alerts:M8(V("alerts")),consumables:{salt:V("salt_missing")?V("salt_missing").state==="on":null,rinseAid:V("rinse_aid_low")?V("rinse_aid_low").state==="on":null},scores:{eco:l1(V("eco_score")),energy:l1(V("energy_score")),water:l1(V("water_score"))},cycles:l1(V("total_cycle_counter")),linkQuality:y(V("link_quality")?.state),ecoMode:V("eco_mode")?.state==="on",rinseAid:l1(V("rinse_aid_level")),waterHardness:V("water_hardness")?.state||null,settings:{brightness:d8(V("display_light")),floorLight:_3(V("display_on_floor"),["OFF"]),endSound:_3(V("end_of_cycle_sound"),["NO_SOUND","OFF"]),keyTone:H.key_tone?{on:V("key_tone")?.state==="on"}:null},options:v1,name:C.name||e.attributes?.friendly_name?.replace(/\s*Appliance state$/i,"")||null}}function w3(L,C,H,V,e){return[`M${L+e},${C}`,`H${L+H-e}`,`A${e},${e} 0 0 1 ${L+H},${C+e}`,`V${C+V-e}`,`A${e},${e} 0 0 1 ${L+H-e},${C+V}`,`H${L+e}`,`A${e},${e} 0 0 1 ${L},${C+V-e}`,`V${C+e}`,`A${e},${e} 0 0 1 ${L+e},${C}`,"Z"].join(" ")}var p8=`${w3(8,6,164,202,18)} ${w3(26,52,128,136,12)}`;function O3(){return`
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
      <path class="door-panel" d="${p8}" fill-rule="evenodd"/>
      <rect class="panel-strip" x="18" y="14" width="144" height="28" rx="10"/>
      <circle class="led-ring" cx="32" cy="28" r="7"/>
      <circle class="led" cx="32" cy="28" r="4"/>
      <rect class="display" x="60" y="19" width="60" height="18" rx="6"/>
      <text class="display-text" x="90" y="32" text-anchor="middle">--:--</text>
      <rect class="handle" x="18" y="196" width="144" height="7" rx="3.5"/>
    </g>
  </svg>`}function k3(L,C){let H=L.querySelector(".display-text");H&&H.textContent!==C&&(H.textContent=C)}var T3="M6.59,0.66C8.93,-1.15 11.47,1.06 12.04,4.5C12.47,4.5 12.89,4.62 13.27,4.84C13.79,4.24 14.25,3.42 14.07,2.5C13.65,0.35 16.06,-1.39 18.35,1.58C20.16,3.92 17.95,6.46 14.5,7.03C14.5,7.46 14.39,7.89 14.16,8.27C14.76,8.78 15.58,9.24 16.5,9.06C18.63,8.64 20.38,11.04 17.41,13.34C15.07,15.15 12.53,12.94 11.96,9.5C11.53,9.5 11.11,9.37 10.74,9.15C10.22,9.75 9.75,10.58 9.93,11.5C10.35,13.64 7.94,15.39 5.65,12.42C3.83,10.07 6.05,7.53 9.5,6.97C9.5,6.54 9.63,6.12 9.85,5.74C9.25,5.23 8.43,4.76 7.5,4.94C5.37,5.36 3.62,2.96 6.59,0.66M5,16H7A2,2 0 0,1 9,18V24H7V22H5V24H3V18A2,2 0 0,1 5,16M5,18V20H7V18H5M12.93,16H15L12.07,24H10L12.93,16M18,16H21V18H18V22H21V24H18A2,2 0 0,1 16,22V18A2,2 0 0,1 18,16Z",Q2="M19,18.31V20A2,2 0 0,1 17,22H7A2,2 0 0,1 5,20V16.3C4.54,16.12 3.95,16 3,16A1,1 0 0,1 2,15A1,1 0 0,1 3,14C3.82,14 4.47,14.08 5,14.21V12.3C4.54,12.12 3.95,12 3,12A1,1 0 0,1 2,11A1,1 0 0,1 3,10C3.82,10 4.47,10.08 5,10.21V8.3C4.54,8.12 3.95,8 3,8A1,1 0 0,1 2,7A1,1 0 0,1 3,6C3.82,6 4.47,6.08 5,6.21V4A2,2 0 0,1 7,2H17A2,2 0 0,1 19,4V6.16C20.78,6.47 21.54,7.13 21.71,7.29C22.1,7.68 22.1,8.32 21.71,8.71C21.32,9.1 20.8,9.09 20.29,8.71V8.71C20.29,8.71 19.25,8 17,8C15.74,8 14.91,8.41 13.95,8.9C12.91,9.41 11.74,10 10,10C9.64,10 9.31,10 9,9.96V7.95C9.3,8 9.63,8 10,8C11.26,8 12.09,7.59 13.05,7.11C14.09,6.59 15.27,6 17,6V4H7V20H17V18C18.5,18 18.97,18.29 19,18.31M17,10C15.27,10 14.09,10.59 13.05,11.11C12.09,11.59 11.26,12 10,12C9.63,12 9.3,12 9,11.95V13.96C9.31,14 9.64,14 10,14C11.74,14 12.91,13.41 13.95,12.9C14.91,12.42 15.74,12 17,12C19.25,12 20.29,12.71 20.29,12.71V12.71C20.8,13.1 21.32,13.1 21.71,12.71C22.1,12.32 22.1,11.69 21.71,11.29C21.5,11.08 20.25,10 17,10M17,14C15.27,14 14.09,14.59 13.05,15.11C12.09,15.59 11.26,16 10,16C9.63,16 9.3,16 9,15.95V17.96C9.31,18 9.64,18 10,18C11.74,18 12.91,17.41 13.95,16.9C14.91,16.42 15.74,16 17,16C19.25,16 20.29,16.71 20.29,16.71V16.71C20.8,17.1 21.32,17.1 21.71,16.71C22.1,16.32 22.1,15.69 21.71,15.29C21.5,15.08 20.25,14 17,14Z";var E3="M13,13H11V7H13M13,17H11V15H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z";var R3="M12,2L1,21H23M12,6L19.53,19H4.47M11,10V14H13V10M11,16V18H13V16";var P3="M13,9V15H16L12,19L8,15H11V9H8L12,5L16,9H13M4,2H20V4H4V2M4,20H20V22H4V20Z";var B3="M6 14H9L5 18L1 14H4C4 11.3 5.7 6.6 11 6.1V8.1C7.6 8.6 6 11.9 6 14M20 14C20 11.3 18.3 6.6 13 6.1V8.1C16.4 8.7 18 11.9 18 14H15L19 18L23 14H20Z";var $3="M12,6V9L16,5L12,1V4A8,8 0 0,0 4,12C4,13.57 4.46,15.03 5.24,16.26L6.7,14.8C6.25,13.97 6,13 6,12A6,6 0 0,1 12,6M18.76,7.74L17.3,9.2C17.74,10.04 18,11 18,12A6,6 0 0,1 12,18V15L8,19L12,23V20A8,8 0 0,0 20,12C20,10.43 19.54,8.97 18.76,7.74Z";var F3="M9.5 18V9H8V18M12.75 18V9H11.25V18M16 18V9H14.5V18M17.03 6C18.11 6 19 6.88 19 8V19C19 20.13 18.11 21 17.03 21C17.03 21.58 16.56 22 16 22C15.5 22 15 21.58 15 21H9C9 21.58 8.5 22 8 22C7.44 22 6.97 21.58 6.97 21C5.89 21 5 20.13 5 19V8C5 6.88 5.89 6 6.97 6H9V3C9 2.42 9.46 2 10 2H14C14.54 2 15 2.42 15 3V6M10.5 3.5V6H13.5V3.5M17.03 19V8H6.97V19";var N3="M16,20H8V6H16M16.67,4H15V2H9V4H7.33A1.33,1.33 0 0,0 6,5.33V20.67C6,21.4 6.6,22 7.33,22H16.67A1.33,1.33 0 0,0 18,20.67V5.33C18,4.6 17.4,4 16.67,4Z";var D3="M10,21H14A2,2 0 0,1 12,23A2,2 0 0,1 10,21M21,19V20H3V19L5,17V11C5,7.9 7.03,5.17 10,4.29C10,4.19 10,4.1 10,4A2,2 0 0,1 12,2A2,2 0 0,1 14,4C14,4.1 14,4.19 14,4.29C16.97,5.17 19,7.9 19,11V17L21,19M17,11A5,5 0 0,0 12,6A5,5 0 0,0 7,11V18H17V11M19.75,3.19L18.33,4.61C20.04,6.3 21,8.6 21,11H23C23,8.07 21.84,5.25 19.75,3.19M1,11H3C3,8.6 3.96,6.3 5.67,4.61L4.25,3.19C2.16,5.25 1,8.07 1,11Z";var I3="M12,18V6A6,6 0 0,1 18,12A6,6 0 0,1 12,18M20,15.31L23.31,12L20,8.69V4H15.31L12,0.69L8.69,4H4V8.69L0.69,12L4,15.31V20H8.69L12,23.31L15.31,20H20V15.31Z";var z3="M19.36,2.72L20.78,4.14L15.06,9.85C16.13,11.39 16.28,13.24 15.38,14.44L9.06,8.12C10.26,7.22 12.11,7.37 13.65,8.44L19.36,2.72M5.93,17.57C3.92,15.56 2.69,13.16 2.35,10.92L7.23,8.83L14.67,16.27L12.58,21.15C10.34,20.81 7.94,19.58 5.93,17.57Z";var W3="M7 11H9V13H7V11M21 5V19C21 20.11 20.11 21 19 21H5C3.89 21 3 20.1 3 19V5C3 3.9 3.9 3 5 3H6V1H8V3H16V1H18V3H19C20.11 3 21 3.9 21 5M5 7H19V5H5V7M19 19V9H5V19H19M15 13V11H17V13H15M11 13V11H13V13H11M7 15H9V17H7V15M15 17V15H17V17H15M11 17V15H13V17H11Z";var G3="M6,11L7,7H17L18,11M18.92,6C18.71,5.4 18.14,5 17.5,5H6.5C5.86,5 5.29,5.4 5.08,6L3,12V20A1,1 0 0,0 4,21H5A1,1 0 0,0 6,20V18H18V20A1,1 0 0,0 19,21H20A1,1 0 0,0 21,20V12L18.92,6M7,16H5V14H7V16M19,16H17V14H19V16M14,16H10V14H14V16Z",U3="M4,3V6H1V20H23V6H20V3H14V6H10V3H4M3,8H21V18H3V8M15,10V12H13V14H15V16H17V14H19V12H17V10H15M5,12V14H11V12H5Z";var K3="M12,3C7,3 3,7 3,12C3,17 7,21 12,21C17,21 21,17 21,12C21,7 17,3 12,3M12,19C8.1,19 5,15.9 5,12C5,8.1 8.1,5 12,5C15.9,5 19,8.1 19,12C19,15.9 15.9,19 12,19M20.5,20.5C22.7,18.3 24,15.3 24,12C24,8.7 22.7,5.7 20.5,3.5L19.4,4.6C21.3,6.5 22.5,9.1 22.5,12C22.5,14.9 21.3,17.5 19.4,19.4L20.5,20.5M4.6,19.4C2.7,17.5 1.5,14.9 1.5,12C1.5,9.1 2.7,6.5 4.6,4.6L3.5,3.5C1.3,5.7 0,8.7 0,12C0,15.3 1.3,18.3 3.5,20.5L4.6,19.4M9.5,7V17H11.5V13H13.5A2,2 0 0,0 15.5,11V9A2,2 0 0,0 13.5,7H9.5M11.5,9H13.5V11H11.5V9Z";var j3="M23 8C23 4.13 19.87 1 16 1C12.47 1 9.57 3.61 9.08 7H4.5C3.84 7 3.28 7.42 3.08 8L1 14V22C1 22.55 1.45 23 2 23H3C3.55 23 4 22.55 4 22V21H16V22C16 22.55 16.45 23 17 23H18C18.55 23 19 22.55 19 22V14.32C21.36 13.19 23 10.79 23 8M4.5 8.5H9.03C9.15 10.26 9.92 11.84 11.11 13H3L4.5 8.5M4.5 18C3.67 18 3 17.33 3 16.5S3.67 15 4.5 15 6 15.67 6 16.5 5.33 18 4.5 18M15.5 18C14.67 18 14 17.33 14 16.5S14.67 15 15.5 15 17 15.67 17 16.5 16.33 18 15.5 18M16 13C14.61 13 13.44 12.5 12.47 11.53C11.5 10.56 11 9.39 11 8C11 6.64 11.5 5.46 12.47 4.5C13.44 3.5 14.61 3 16 3C17.36 3 18.54 3.5 19.5 4.5C20.5 5.46 21 6.64 21 8C21 9.39 20.5 10.56 19.5 11.53C18.54 12.5 17.36 13 16 13M16.5 8.25L19.36 9.94L18.61 11.16L15 9V4H16.5V8.25Z";var Q3="M6.5 5C5.84 5 5.28 5.42 5.08 6L3 12V20A1 1 0 0 0 4 21H5A1 1 0 0 0 6 20V19H11.3A7 7 0 0 1 11 17A7 7 0 0 1 14.41 11H5L6.5 6.5H17.5L18.68 10.03A7 7 0 0 1 20.47 10.46L18.92 6C18.72 5.42 18.16 5 17.5 5H6.5M17 12C16.87 12 16.76 12.09 16.74 12.21L16.55 13.53C16.25 13.66 15.96 13.82 15.7 14L14.46 13.5C14.35 13.5 14.22 13.5 14.15 13.63L13.15 15.36C13.09 15.47 13.11 15.6 13.21 15.68L14.27 16.5C14.25 16.67 14.24 16.83 14.24 17C14.24 17.17 14.25 17.33 14.27 17.5L13.21 18.32C13.12 18.4 13.09 18.53 13.15 18.64L14.15 20.37C14.21 20.5 14.34 20.5 14.46 20.5L15.7 20C15.96 20.18 16.24 20.35 16.55 20.47L16.74 21.79C16.76 21.91 16.86 22 17 22H19C19.11 22 19.22 21.91 19.24 21.79L19.43 20.47C19.73 20.34 20 20.18 20.27 20L21.5 20.5C21.63 20.5 21.76 20.5 21.83 20.37L22.83 18.64C22.89 18.53 22.86 18.4 22.77 18.32L21.7 17.5C21.72 17.33 21.74 17.17 21.74 17C21.74 16.83 21.73 16.67 21.7 16.5L22.76 15.68C22.85 15.6 22.88 15.47 22.82 15.36L21.82 13.63C21.76 13.5 21.63 13.5 21.5 13.5L20.27 14C20 13.82 19.73 13.65 19.42 13.53L19.23 12.21C19.22 12.09 19.11 12 19 12H17M6.5 13A1.5 1.5 0 0 1 8 14.5A1.5 1.5 0 0 1 6.5 16A1.5 1.5 0 0 1 5 14.5A1.5 1.5 0 0 1 6.5 13M18 15.5C18.83 15.5 19.5 16.17 19.5 17C19.5 17.83 18.83 18.5 18 18.5C17.16 18.5 16.5 17.83 16.5 17C16.5 16.17 17.17 15.5 18 15.5Z",q3="M5,14H19L17.5,9.5H6.5L5,14M17.5,19A1.5,1.5 0 0,0 19,17.5A1.5,1.5 0 0,0 17.5,16A1.5,1.5 0 0,0 16,17.5A1.5,1.5 0 0,0 17.5,19M6.5,19A1.5,1.5 0 0,0 8,17.5A1.5,1.5 0 0,0 6.5,16A1.5,1.5 0 0,0 5,17.5A1.5,1.5 0 0,0 6.5,19M18.92,9L21,15V23A1,1 0 0,1 20,24H19A1,1 0 0,1 18,23V22H6V23A1,1 0 0,1 5,24H4A1,1 0 0,1 3,23V15L5.08,9C5.28,8.42 5.85,8 6.5,8H17.5C18.15,8 18.72,8.42 18.92,9M12,0C14.12,0 16.15,0.86 17.65,2.35L16.23,3.77C15.11,2.65 13.58,2 12,2C10.42,2 8.89,2.65 7.77,3.77L6.36,2.35C7.85,0.86 9.88,0 12,0M12,4C13.06,4 14.07,4.44 14.82,5.18L13.4,6.6C13.03,6.23 12.53,6 12,6C11.5,6 10.97,6.23 10.6,6.6L9.18,5.18C9.93,4.44 10.94,4 12,4Z",Y3="M16,6L15,6.75L17.5,10H13.5V8.5H12V10H3C1.89,10 1,10.89 1,12V15H3A3,3 0 0,0 6,18A3,3 0 0,0 9,15H15A3,3 0 0,0 18,18A3,3 0 0,0 21,15H23V12C23,10.89 22.11,10 21,10H19L16,6M6,13.5A1.5,1.5 0 0,1 7.5,15A1.5,1.5 0 0,1 6,16.5A1.5,1.5 0 0,1 4.5,15A1.5,1.5 0 0,1 6,13.5M18,13.5A1.5,1.5 0 0,1 19.5,15A1.5,1.5 0 0,1 18,16.5A1.5,1.5 0 0,1 16.5,15A1.5,1.5 0 0,1 18,13.5Z";var X3="M19,14H16V16H19V14M22,21H3V11L11,3H21A1,1 0 0,1 22,4V21M11.83,5L5.83,11H20V5H11.83Z";var J3="M3,6H16L19,10H21C22.11,10 23,10.89 23,12V15H21A3,3 0 0,1 18,18A3,3 0 0,1 15,15H9A3,3 0 0,1 6,18A3,3 0 0,1 3,15H1V8C1,6.89 1.89,6 3,6M2.5,7.5V10H10.5V7.5H2.5M12,7.5V10H17.14L15.25,7.5H12M6,13.5A1.5,1.5 0 0,0 4.5,15A1.5,1.5 0 0,0 6,16.5A1.5,1.5 0 0,0 7.5,15A1.5,1.5 0 0,0 6,13.5M18,13.5A1.5,1.5 0 0,0 16.5,15A1.5,1.5 0 0,0 18,16.5A1.5,1.5 0 0,0 19.5,15A1.5,1.5 0 0,0 18,13.5Z";var C0="M13,4.8C9,4.8 9,19.2 13,19.2C17,19.2 22,16.5 22,12C22,7.5 17,4.8 13,4.8M13.1,17.2C12.7,16.8 12,15 12,12C12,9 12.7,7.2 13.1,6.8C16,6.9 20,8.7 20,12C20,15.3 16,17.1 13.1,17.2M2,5H9.5C9.3,5.4 9,5.8 8.9,6.4C8.8,6.6 8.8,6.8 8.7,7H2V5M8,11H2V9H8.2C8.1,9.6 8.1,10.3 8,11M8.7,17C8.9,17.8 9.2,18.4 9.6,19H2.1V17H8.7M8.2,15H2V13H8C8.1,13.7 8.1,14.4 8.2,15Z";var H0="M18 15C18 17.6 16.8 19.9 14.9 21.3L14.4 20.8L12.3 18.7L13.7 17.3L14.9 18.5C15.4 17.8 15.8 16.9 15.9 16H14V14H15.9C15.7 13.1 15.4 12.3 14.9 11.5L13.7 12.7L12.3 11.3L13.5 10.1C12.8 9.6 11.9 9.2 11 9.1V11H9V9.1C8.1 9.3 7.3 9.6 6.5 10.1L9.5 13.1C9.7 13.1 9.8 13 10 13C11.11 13 12 13.9 12 15S11.11 17 10 17 8 16.11 8 15C8 14.8 8 14.7 8.1 14.5L5.1 11.5C4.6 12.2 4.2 13.1 4.1 14H6V16H4.1C4.3 16.9 4.6 17.7 5.1 18.5L6.3 17.3L7.7 18.7L5.1 21.3C3.2 19.9 2 17.6 2 15C2 10.58 5.58 7 10 7S18 10.58 18 15M23 5C23 3.34 21.66 2 20 2S17 3.34 17 5C17 6.3 17.84 7.4 19 7.82V11H21V7.82C22.16 7.4 23 6.3 23 5M20 6C19.45 6 19 5.55 19 5S19.45 4 20 4 21 4.45 21 5 20.55 6 20 6Z";var V0="M16,10L15.8,11H13.5A0.5,0.5 0 0,0 13,11.5A0.5,0.5 0 0,0 13.5,12H15.6L14.6,17H12.5A0.5,0.5 0 0,0 12,17.5A0.5,0.5 0 0,0 12.5,18H14.4L14,20A2,2 0 0,1 12,22A2,2 0 0,1 10,20L9,15H10.5A0.5,0.5 0 0,0 11,14.5A0.5,0.5 0 0,0 10.5,14H8.8L8,10C8,8.8 8.93,7.77 10.29,7.29L8.9,5.28C8.59,4.82 8.7,4.2 9.16,3.89C9.61,3.57 10.23,3.69 10.55,4.14L11,4.8V3A1,1 0 0,1 12,2A1,1 0 0,1 13,3V5.28L14.5,3.54C14.83,3.12 15.47,3.07 15.89,3.43C16.31,3.78 16.36,4.41 16,4.84L13.87,7.35C15.14,7.85 16,8.85 16,10Z";var e0="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z";var L0="M12.5,1.5C10.73,1.5 9.17,2.67 8.67,4.37C8.14,4.13 7.58,4 7,4A4,4 0 0,0 3,8C3,9.82 4.24,11.41 6,11.87V19H19V11.87C20.76,11.41 22,9.82 22,8A4,4 0 0,0 18,4C17.42,4 16.86,4.13 16.33,4.37C15.83,2.67 14.27,1.5 12.5,1.5M12,10.5H13V17.5H12V10.5M9,12.5H10V17.5H9V12.5M15,12.5H16V17.5H15V12.5M6,20V21A1,1 0 0,0 7,22H18A1,1 0 0,0 19,21V20H6Z";var t0="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z";var r0="M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z";var i0="M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z";var a0="M4,4H20A2,2 0 0,1 22,6V18A2,2 0 0,1 20,20H4A2,2 0 0,1 2,18V6A2,2 0 0,1 4,4M4,6V18H11V6H4M20,18V6H18.76C19,6.54 18.95,7.07 18.95,7.13C18.88,7.8 18.41,8.5 18.24,8.75L15.91,11.3L19.23,11.28L19.24,12.5L14.04,12.47L14,11.47C14,11.47 17.05,8.24 17.2,7.95C17.34,7.67 17.91,6 16.5,6C15.27,6.05 15.41,7.3 15.41,7.3L13.87,7.31C13.87,7.31 13.88,6.65 14.25,6H13V18H15.58L15.57,17.14L16.54,17.13C16.54,17.13 17.45,16.97 17.46,16.08C17.5,15.08 16.65,15.08 16.5,15.08C16.37,15.08 15.43,15.13 15.43,15.95H13.91C13.91,15.95 13.95,13.89 16.5,13.89C19.1,13.89 18.96,15.91 18.96,15.91C18.96,15.91 19,17.16 17.85,17.63L18.37,18H20M8.92,16H7.42V10.2L5.62,10.76V9.53L8.76,8.41H8.92V16Z";var o0="M21,16.5C21,16.88 20.79,17.21 20.47,17.38L12.57,21.82C12.41,21.94 12.21,22 12,22C11.79,22 11.59,21.94 11.43,21.82L3.53,17.38C3.21,17.21 3,16.88 3,16.5V7.5C3,7.12 3.21,6.79 3.53,6.62L11.43,2.18C11.59,2.06 11.79,2 12,2C12.21,2 12.41,2.06 12.57,2.18L20.47,6.62C20.79,6.79 21,7.12 21,7.5V16.5M12,4.15L6.04,7.5L12,10.85L17.96,7.5L12,4.15M5,15.91L11,19.29V12.58L5,9.21V15.91M19,15.91V9.21L13,12.58V19.29L19,15.91Z";var M0="M18.32,8H5.67L5.23,4H18.77M12,19A3,3 0 0,1 9,16C9,14 12,10.6 12,10.6C12,10.6 15,14 15,16A3,3 0 0,1 12,19M3,2L5,20.23C5.13,21.23 5.97,22 7,22H17C18,22 18.87,21.23 19,20.23L21,2H3Z";var n0="M12,1.5A2.5,2.5 0 0,1 14.5,4A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 9.5,4A2.5,2.5 0 0,1 12,1.5M15.87,5C18,5 20,7 20,9C22.7,9 22.7,13 20,13H4C1.3,13 1.3,9 4,9C4,7 6,5 8.13,5C8.57,6.73 10.14,8 12,8C13.86,8 15.43,6.73 15.87,5M5,15H8L9,22H7L5,15M10,15H14L13,22H11L10,15M16,15H19L17,22H15L16,15Z";var s0="M18,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V4A2,2 0 0,0 18,2M10,4A1,1 0 0,1 11,5A1,1 0 0,1 10,6A1,1 0 0,1 9,5A1,1 0 0,1 10,4M7,4A1,1 0 0,1 8,5A1,1 0 0,1 7,6A1,1 0 0,1 6,5A1,1 0 0,1 7,4M18,20H6V8H18V20M14.67,15.33C14.69,16.03 14.41,16.71 13.91,17.21C12.86,18.26 11.15,18.27 10.09,17.21C9.59,16.71 9.31,16.03 9.33,15.33C9.4,14.62 9.63,13.94 10,13.33C10.37,12.5 10.81,11.73 11.33,11L12,10C13.79,12.59 14.67,14.36 14.67,15.33";var l0="M16,11H18V13H16V11M12,3H19C20.11,3 21,3.89 21,5V19H22V21H2V19H10V5C10,3.89 10.89,3 12,3M12,5V19H19V5H12Z";var d0="M12,3C10.89,3 10,3.89 10,5H3V19H2V21H22V19H21V5C21,3.89 20.11,3 19,3H12M12,5H19V19H12V5M5,11H7V13H5V11Z";var p0="M16,12A2,2 0 0,1 18,10A2,2 0 0,1 20,12A2,2 0 0,1 18,14A2,2 0 0,1 16,12M10,12A2,2 0 0,1 12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12M4,12A2,2 0 0,1 6,10A2,2 0 0,1 8,12A2,2 0 0,1 6,14A2,2 0 0,1 4,12Z";var A0="M19.77,7.23L19.78,7.22L16.06,3.5L15,4.56L17.11,6.67C16.17,7.03 15.5,7.93 15.5,9A2.5,2.5 0 0,0 18,11.5C18.36,11.5 18.69,11.42 19,11.29V18.5A1,1 0 0,1 18,19.5A1,1 0 0,1 17,18.5V14A2,2 0 0,0 15,12H14V5A2,2 0 0,0 12,3H6A2,2 0 0,0 4,5V21H14V13.5H15.5V18.5A2.5,2.5 0 0,0 18,21A2.5,2.5 0 0,0 20.5,18.5V9C20.5,8.31 20.22,7.68 19.77,7.23M18,10A1,1 0 0,1 17,9A1,1 0 0,1 18,8A1,1 0 0,1 19,9A1,1 0 0,1 18,10M8,18V13.5H6L10,6V11H12L8,18Z";var m0="M12,11A1,1 0 0,0 11,12A1,1 0 0,0 12,13A1,1 0 0,0 13,12A1,1 0 0,0 12,11M12.5,2C17,2 17.11,5.57 14.75,6.75C13.76,7.24 13.32,8.29 13.13,9.22C13.61,9.42 14.03,9.73 14.35,10.13C18.05,8.13 22.03,8.92 22.03,12.5C22.03,17 18.46,17.1 17.28,14.73C16.78,13.74 15.72,13.3 14.79,13.11C14.59,13.59 14.28,14 13.88,14.34C15.87,18.03 15.08,22 11.5,22C7,22 6.91,18.42 9.27,17.24C10.25,16.75 10.69,15.71 10.89,14.79C10.4,14.59 9.97,14.27 9.65,13.87C5.96,15.85 2,15.07 2,11.5C2,7 5.56,6.89 6.74,9.26C7.24,10.25 8.29,10.68 9.22,10.87C9.41,10.39 9.73,9.97 10.14,9.65C8.15,5.96 8.94,2 12.5,2Z";var c0="M17.66 11.2C17.43 10.9 17.15 10.64 16.89 10.38C16.22 9.78 15.46 9.35 14.82 8.72C13.33 7.26 13 4.85 13.95 3C13 3.23 12.17 3.75 11.46 4.32C8.87 6.4 7.85 10.07 9.07 13.22C9.11 13.32 9.15 13.42 9.15 13.55C9.15 13.77 9 13.97 8.8 14.05C8.57 14.15 8.33 14.09 8.14 13.93C8.08 13.88 8.04 13.83 8 13.76C6.87 12.33 6.69 10.28 7.45 8.64C5.78 10 4.87 12.3 5 14.47C5.06 14.97 5.12 15.47 5.29 15.97C5.43 16.57 5.7 17.17 6 17.7C7.08 19.43 8.95 20.67 10.96 20.92C13.1 21.19 15.39 20.8 17.03 19.32C18.86 17.66 19.5 15 18.56 12.72L18.43 12.46C18.22 12 17.66 11.2 17.66 11.2M14.5 17.5C14.22 17.74 13.76 18 13.4 18.1C12.28 18.5 11.16 17.94 10.5 17.28C11.69 17 12.4 16.12 12.61 15.23C12.78 14.43 12.46 13.77 12.33 13C12.21 12.26 12.23 11.63 12.5 10.94C12.69 11.32 12.89 11.7 13.13 12C13.9 13 15.11 13.44 15.37 14.8C15.41 14.94 15.43 15.08 15.43 15.23C15.46 16.05 15.1 16.95 14.5 17.5H14.5Z";var u0="M12,20L12.76,17C9.5,16.79 6.59,15.4 5.75,13.58C5.66,14.06 5.53,14.5 5.33,14.83C4.67,16 3.33,16 2,16C3.1,16 3.5,14.43 3.5,12.5C3.5,10.57 3.1,9 2,9C3.33,9 4.67,9 5.33,10.17C5.53,10.5 5.66,10.94 5.75,11.42C6.4,10 8.32,8.85 10.66,8.32L9,5C11,5 13,5 14.33,5.67C15.46,6.23 16.11,7.27 16.69,8.38C19.61,9.08 22,10.66 22,12.5C22,14.38 19.5,16 16.5,16.66C15.67,17.76 14.86,18.78 14.17,19.33C13.33,20 12.67,20 12,20M17,11A1,1 0 0,0 16,12A1,1 0 0,0 17,13A1,1 0 0,0 18,12A1,1 0 0,0 17,11Z";var v0="M7,2V13H10V22L17,10H13L17,2H7Z";var x0="M15 21H17V19H15M19 9H21V7H19M3 5V19C3 20.1 3.9 21 5 21H9V19H5V5H9V3H5C3.9 3 3 3.9 3 5M19 3V5H21C21 3.9 20.1 3 19 3M11 23H13V1H11M19 17H21V15H19M15 5H17V3H15M19 13H21V11H19M19 21C20.1 21 21 20.1 21 19H19Z";var h0="M20.16 12.73C22.93 9.96 22.57 5.26 19.09 3C17.08 1.67 14.39 1.66 12.36 2.97C10.6 4.1 9.63 5.86 9.46 7.68C9.33 9 8.83 10.23 7.91 11.15L7.88 11.18C6.72 12.34 6.72 14.11 7.81 15.19L8.8 16.18C9.89 17.27 11.66 17.27 12.75 16.18C13.72 15.21 15 14.68 16.39 14.53C17.76 14.38 19.1 13.78 20.16 12.73M6.26 19.86C6.53 20.42 6.44 21.1 5.97 21.56C5.39 22.15 4.44 22.15 3.85 21.56C3.58 21.29 3.44 20.94 3.42 20.58C3.06 20.56 2.71 20.42 2.44 20.15C1.85 19.56 1.85 18.61 2.44 18.03C2.9 17.57 3.59 17.47 4.14 17.74L6.62 15.31C6.76 15.5 6.92 15.72 7.1 15.9L8.09 16.89C8.3 17.09 8.5 17.26 8.76 17.41L6.26 19.86Z";var f0="M11.9 2C8 2 4.9 5.4 5 9.3C5.1 11.9 6.6 14.1 8.7 15.2C10.1 15.9 11 17.3 11 18.8V19C11 20.7 12.3 22 14 22C18 22 19 17 19 9C19 9 19 2 11.9 2M14 20C13.4 20 13 19.6 13 19V18.8C13 16.6 11.7 14.5 9.7 13.4C8.1 12.6 7.1 11 7 9.2C7 7.9 7.5 6.5 8.4 5.5C9.3 4.5 10.6 4 11.8 4C16.7 4 17 8.2 17 9C17 18.9 15.3 20 14 20M15.8 7.6L8.3 10.3C8.1 10 8 9.6 8 9.1C8 8.4 8.2 7.8 8.5 7.1L13.7 5.2C14.9 5.8 15.5 6.7 15.8 7.6M12.9 15.1L15.7 14.1C15.6 15.6 15.3 16.7 15.1 17.4L13.8 17.9C13.8 16.9 13.5 16 12.9 15.1M16 9.2C16 10.4 16 11.5 15.9 12.4L11.9 13.9C11.4 13.4 10.8 12.9 10.1 12.6C9.7 12.4 9.3 12.1 9 11.8L16 9.2Z";var Z0="M22,18A4,4 0 0,1 18,22H15A4,4 0 0,1 11,18V16H17.79L20.55,11.23L22.11,12.13L19.87,16H22V18M9,22H2C2,19 2,16 2.33,12.83C2.6,10.3 3.08,7.66 3.6,5H3V3H4L7,3H8V5H7.4C7.92,7.66 8.4,10.3 8.67,12.83C9,16 9,19 9,22Z";var g0="M18 11V6H15V4H12V2H8V5H6V11H5L7 22H17L19 11H18M15.86 11C15.7 11.61 15.4 12.16 15 12.62V8.62L17 9.62V11H15.86M17 7V8.5L15 7.5V7H17M12 5H14V8.5L12 9.5V5M12 10.62L14 9.62V13.45C13.41 13.8 12.73 14 12 14V10.62M11 13.86C10.21 13.65 9.5 13.22 9 12.62V9.62L11 8.62V13.86M9 3H11V7.5L10 8V5H9V3M7 6H9V8.5L8 9V11H7V6Z";var S0="M9,21V22H7V21A2,2 0 0,1 5,19V4A2,2 0 0,1 7,2H17A2,2 0 0,1 19,4V19A2,2 0 0,1 17,21V22H15V21H9M7,4V9H17V4H7M7,19H17V11H7V19M8,12H10V15H8V12M8,6H10V8H8V6Z";var _0="M18,10A1,1 0 0,1 17,9A1,1 0 0,1 18,8A1,1 0 0,1 19,9A1,1 0 0,1 18,10M12,10H6V5H12M19.77,7.23L19.78,7.22L16.06,3.5L15,4.56L17.11,6.67C16.17,7 15.5,7.93 15.5,9A2.5,2.5 0 0,0 18,11.5C18.36,11.5 18.69,11.42 19,11.29V18.5A1,1 0 0,1 18,19.5A1,1 0 0,1 17,18.5V14C17,12.89 16.1,12 15,12H14V5C14,3.89 13.1,3 12,3H6C4.89,3 4,3.89 4,5V21H14V13.5H15.5V18.5A2.5,2.5 0 0,0 18,21A2.5,2.5 0 0,0 20.5,18.5V9C20.5,8.31 20.22,7.68 19.77,7.23Z";var y0="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12C20,14.4 19,16.5 17.3,18C15.9,16.7 14,16 12,16C10,16 8.2,16.7 6.7,18C5,16.5 4,14.4 4,12A8,8 0 0,1 12,4M14,5.89C13.62,5.9 13.26,6.15 13.1,6.54L11.81,9.77L11.71,10C11,10.13 10.41,10.6 10.14,11.26C9.73,12.29 10.23,13.45 11.26,13.86C12.29,14.27 13.45,13.77 13.86,12.74C14.12,12.08 14,11.32 13.57,10.76L13.67,10.5L14.96,7.29L14.97,7.26C15.17,6.75 14.92,6.17 14.41,5.96C14.28,5.91 14.15,5.89 14,5.89M10,6A1,1 0 0,0 9,7A1,1 0 0,0 10,8A1,1 0 0,0 11,7A1,1 0 0,0 10,6M7,9A1,1 0 0,0 6,10A1,1 0 0,0 7,11A1,1 0 0,0 8,10A1,1 0 0,0 7,9M17,9A1,1 0 0,0 16,10A1,1 0 0,0 17,11A1,1 0 0,0 18,10A1,1 0 0,0 17,9Z";var q2="M10,9A1,1 0 0,1 11,8A1,1 0 0,1 12,9V13.47L13.21,13.6L18.15,15.79C18.68,16.03 19,16.56 19,17.14V21.5C18.97,22.32 18.32,22.97 17.5,23H11C10.62,23 10.26,22.85 10,22.57L5.1,18.37L5.84,17.6C6.03,17.39 6.3,17.28 6.58,17.28H6.8L10,19V9M11,5A4,4 0 0,1 15,9C15,10.5 14.2,11.77 13,12.46V11.24C13.61,10.69 14,9.89 14,9A3,3 0 0,0 11,6A3,3 0 0,0 8,9C8,9.89 8.39,10.69 9,11.24V12.46C7.8,11.77 7,10.5 7,9A4,4 0 0,1 11,5Z";var b0="M15.5,21.27L14.66,21.18C13.9,21.11 13.25,20.6 13,19.87C12.47,17.91 12.47,15.83 13,13.87C15.32,13.4 17,11.37 17,9C17,7 15,2 15,2H9C9,2 7,7 7,9C7,11.38 8.67,13.42 11,13.9C11.53,15.86 11.53,17.94 11,19.9C10.76,20.62 10.12,21.13 9.37,21.21L8.5,21.3C8.5,21.3 8,21.28 8,22H16C16,21.28 15.5,21.27 15.5,21.27M9.44,7L10.44,4H13.56L14.56,7H9.44Z";var w0="M10,12A2,2 0 0,0 8,14A2,2 0 0,0 10,16A2,2 0 0,0 12,14A2,2 0 0,0 10,12M6,8A2,2 0 0,0 4,10A2,2 0 0,0 6,12A2,2 0 0,0 8,10A2,2 0 0,0 6,8M6,16A2,2 0 0,0 4,18A2,2 0 0,0 6,20A2,2 0 0,0 8,18A2,2 0 0,0 6,16M18,8A2,2 0 0,0 20,6A2,2 0 0,0 18,4A2,2 0 0,0 16,6A2,2 0 0,0 18,8M14,16A2,2 0 0,0 12,18A2,2 0 0,0 14,20A2,2 0 0,0 16,18A2,2 0 0,0 14,16M18,12A2,2 0 0,0 16,14A2,2 0 0,0 18,16A2,2 0 0,0 20,14A2,2 0 0,0 18,12M14,8A2,2 0 0,0 12,10A2,2 0 0,0 14,12A2,2 0 0,0 16,10A2,2 0 0,0 14,8M10,4A2,2 0 0,0 8,6A2,2 0 0,0 10,8A2,2 0 0,0 12,6A2,2 0 0,0 10,4Z";var O0="M8.06,2C7.88,3.17 8.17,4.16 8.95,4.97C9.45,5.47 9.61,6.14 9.42,7H10.41C10.53,6.45 10.55,6 10.45,5.55C10.36,5.13 10.05,4.63 9.5,4.03C9.05,3.47 8.89,2.8 9.05,2H8.06M10.55,2C10.36,3.17 10.66,4.16 11.44,4.97C11.94,5.47 12.09,6.14 11.91,7H12.89C13,6.45 13.03,6 12.94,5.55C12.84,5.13 12.53,4.63 12,4.03C11.53,3.47 11.38,2.8 11.53,2H10.55M13.08,2C12.89,3.17 13.19,4.16 13.97,4.97C14.47,5.47 14.61,6.14 14.39,7H15.42C15.55,6.45 15.56,6 15.47,5.55C15.38,5.13 15.06,4.63 14.53,4.03C14.06,3.47 13.91,2.8 14.06,2H13.08M5,8C5,9.42 5.39,10.7 6.14,11.84C6.87,12.96 7.91,13.85 9.14,14.39L5.16,20.44C5.06,20.56 5,20.75 5,21C5,21.41 5.16,21.69 5.44,21.84C5.56,21.94 5.75,22 6,22C6.41,22 6.69,21.84 6.84,21.56L7.83,19.97H14.2C14.41,20.55 14.79,21.05 15.28,21.42C15.78,21.8 16.36,22 17,22C17.83,22 18.53,21.69 19.13,21.09C19.72,20.5 20,19.8 20,19C20,18.17 19.72,17.47 19.13,16.88C18.53,16.28 17.83,16 17,16C16.36,16 15.78,16.17 15.28,16.55C14.78,16.92 14.42,17.41 14.2,18H9.14L11.11,14.95C11.27,15 11.56,15 12,15C12.44,15 12.73,15 12.89,14.95L13.88,16.5C14.29,15.96 14.84,15.54 15.47,15.28L14.91,14.39C16.03,13.89 17,13 17.79,11.77C18.59,10.5 19,9.27 19,8H5M17,18C17.3,18 17.53,18.09 17.72,18.28C17.91,18.47 18,18.72 18,19C18,19.27 17.91,19.5 17.72,19.71C17.54,19.91 17.28,20 17,20C16.74,20 16.5,19.91 16.29,19.71C16.09,19.5 16,19.26 16,19C16,18.7 16.09,18.47 16.29,18.28C16.5,18.09 16.73,18 17,18Z";var Y2="M8.5 4.5L5.4 9.5L8.5 14.7L5.2 20.5L3.4 19.6L6.1 14.7L3 9.5L6.7 3.6L8.5 4.5M14.7 4.4L11.6 9.5L14.7 14.5L11.4 20.3L9.6 19.4L12.3 14.5L9.2 9.5L12.9 3.5L14.7 4.4M21 4.4L17.9 9.5L21 14.5L17.7 20.3L15.9 19.4L18.6 14.5L15.5 9.5L19.2 3.5L21 4.4";var k0="M13.5,8H12V13L16.28,15.54L17,14.33L13.5,12.25V8M13,3A9,9 0 0,0 4,12H1L4.96,16.03L9,12H6A7,7 0 0,1 13,5A7,7 0 0,1 20,12A7,7 0 0,1 13,19C11.07,19 9.32,18.21 8.06,16.94L6.64,18.36C8.27,20 10.5,21 13,21A9,9 0 0,0 22,12A9,9 0 0,0 13,3";var T0="M24 13L20 17V14H11V12H20V9L24 13M4 20V12H1L11 3L18 9.3V10H15.79L11 5.69L6 10.19V18H16V16H18V20H4Z";var E0="M15 13L11 17V14H2V12H11V9L15 13M5 20V16H7V18H17V10.19L12 5.69L7.21 10H4.22L12 3L22 12H19V20H5Z";var R0="M19 8C20.11 8 21 8.9 21 10V16.76C21.61 17.31 22 18.11 22 19C22 20.66 20.66 22 19 22C17.34 22 16 20.66 16 19C16 18.11 16.39 17.31 17 16.76V10C17 8.9 17.9 8 19 8M19 9C18.45 9 18 9.45 18 10V11H20V10C20 9.45 19.55 9 19 9M12 5.69L7 10.19V18H14.1L14 19L14.1 20H5V12H2L12 3L16.4 6.96C15.89 7.4 15.5 7.97 15.25 8.61L12 5.69Z";var P0="M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11V17Z";var B0="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z";var $0="M12,2A7,7 0 0,1 19,9C19,11.38 17.81,13.47 16,14.74V17A1,1 0 0,1 15,18H9A1,1 0 0,1 8,17V14.74C6.19,13.47 5,11.38 5,9A7,7 0 0,1 12,2M9,21V20H15V21A1,1 0 0,1 14,22H10A1,1 0 0,1 9,21M12,4A5,5 0 0,0 7,9C7,11.05 8.23,12.81 10,13.58V16H14V13.58C15.77,12.81 17,11.05 17,9A5,5 0 0,0 12,4Z";var X2="M11 15H6L13 1V9H18L11 23V15Z";var F0="M12,17A2,2 0 0,0 14,15C14,13.89 13.1,13 12,13A2,2 0 0,0 10,15A2,2 0 0,0 12,17M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V10C4,8.89 4.9,8 6,8H7V6A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,3A3,3 0 0,0 9,6V8H15V6A3,3 0 0,0 12,3Z";var N0="M18 1C15.24 1 13 3.24 13 6V8H4C2.9 8 2 8.89 2 10V20C2 21.11 2.9 22 4 22H16C17.11 22 18 21.11 18 20V10C18 8.9 17.11 8 16 8H15V6C15 4.34 16.34 3 18 3C19.66 3 21 4.34 21 6V8H23V6C23 3.24 20.76 1 18 1M10 13C11.1 13 12 13.89 12 15C12 16.11 11.11 17 10 17C8.9 17 8 16.11 8 15C8 13.9 8.9 13 10 13Z";var D0="M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z";var I0="M5,7A2,2 0 0,0 3,9V15A2,2 0 0,0 5,17H8V15H5V9H8V7H5M11,7A2,2 0 0,0 9,9V15A2,2 0 0,0 11,17H13A2,2 0 0,0 15,15V9A2,2 0 0,0 13,7H11M11,9H13V15H11V9M16,10.5V12H19V13.5H17.5A1.5,1.5 0 0,0 16,15V18H20.5V16.5H17.5V15H19A1.5,1.5 0 0,0 20.5,13.5V12A1.5,1.5 0 0,0 19,10.5H16Z";var z0="M8 18C6.67 18 5.79 18.79 5.29 19.29S4.67 20 4 20 3.21 19.79 2.71 19.29C2.35 18.93 1.79 18.42 1 18.16V20.41C1.09 20.5 1.18 20.59 1.29 20.71C1.79 21.21 2.67 22 4 22S6.21 21.21 6.71 20.71 7.33 20 8 20 8.79 20.21 9.29 20.71C9.73 21.14 10.44 21.8 11.5 21.96C11.66 22 11.83 22 12 22C13.33 22 14.21 21.21 14.71 20.71S15.33 20 16 20 16.79 20.21 17.29 20.71 18.67 22 20 22 22.21 21.21 22.71 20.71C22.82 20.59 22.91 20.5 23 20.41V18.16C22.21 18.42 21.65 18.93 21.29 19.29C20.79 19.79 20.67 20 20 20S19.21 19.79 18.71 19.29 17.33 18 16 18 13.79 18.79 13.29 19.29 12.67 20 12 20C11.78 20 11.63 19.97 11.5 19.92C11.22 19.82 11.05 19.63 10.71 19.29C10.21 18.79 9.33 18 8 18M22 10.5C22 10.5 24 12.67 24 14C24 15.1 23.1 16 22 16S20 15.1 20 14C20 12.67 22 10.5 22 10.5M22.5 7.13L19.24 5.24L12.73 9C12.39 8.4 11.74 8 11 8H9V6H10C10.55 6 11 5.55 11 5S10.55 4 10 4H6C5.45 4 5 4.45 5 5S5.45 6 6 6H7V8H5C3.9 8 3 8.9 3 10V13C3 14.1 3.9 15 5 15H14C14.75 15 15.41 14.58 15.75 13.97L19.4 7.65L21.5 8.86C22 9.14 22.59 8.97 22.87 8.5C23.14 8 23 7.4 22.5 7.13M14 13H5V10H11.69L12.6 11.43L16.06 9.43L14 13M3.5 6.92L1.79 8.62A1 1 0 0 1 .38 7.21L2.09 5.5A1 1 0 0 1 3.5 5.5C3.89 5.89 3.89 6.5 3.5 6.92Z";var W0="M17.5,12A1.5,1.5 0 0,1 16,10.5A1.5,1.5 0 0,1 17.5,9A1.5,1.5 0 0,1 19,10.5A1.5,1.5 0 0,1 17.5,12M14.5,8A1.5,1.5 0 0,1 13,6.5A1.5,1.5 0 0,1 14.5,5A1.5,1.5 0 0,1 16,6.5A1.5,1.5 0 0,1 14.5,8M9.5,8A1.5,1.5 0 0,1 8,6.5A1.5,1.5 0 0,1 9.5,5A1.5,1.5 0 0,1 11,6.5A1.5,1.5 0 0,1 9.5,8M6.5,12A1.5,1.5 0 0,1 5,10.5A1.5,1.5 0 0,1 6.5,9A1.5,1.5 0 0,1 8,10.5A1.5,1.5 0 0,1 6.5,12M12,3A9,9 0 0,0 3,12A9,9 0 0,0 12,21A1.5,1.5 0 0,0 13.5,19.5C13.5,19.11 13.35,18.76 13.11,18.5C12.88,18.23 12.73,17.88 12.73,17.5A1.5,1.5 0 0,1 14.23,16H16A5,5 0 0,0 21,11C21,6.58 16.97,3 12,3Z";var G0="M14.53 1.45L13.45 2.53L15.05 4.13C15.27 4.38 15.38 4.67 15.38 5S15.27 5.64 15.05 5.86L11.5 9.47L12.5 10.55L16.13 6.94C16.66 6.35 16.92 5.7 16.92 5C16.92 4.3 16.66 3.64 16.13 3.05L14.53 1.45M10.55 3.47L9.47 4.55L10.08 5.11C10.3 5.33 10.41 5.63 10.41 6S10.3 6.67 10.08 6.89L9.47 7.45L10.55 8.53L11.11 7.92C11.64 7.33 11.91 6.69 11.91 6C11.91 5.28 11.64 4.63 11.11 4.03L10.55 3.47M21 5.06C20.31 5.06 19.67 5.33 19.08 5.86L13.45 11.5L14.53 12.5L20.11 6.94C20.36 6.69 20.66 6.56 21 6.56S21.64 6.69 21.89 6.94L22.5 7.55L23.53 6.47L22.97 5.86C22.38 5.33 21.72 5.06 21 5.06M7 8L2 22L16 17L7 8M19 11.06C18.3 11.06 17.66 11.33 17.06 11.86L15.47 13.45L16.55 14.53L18.14 12.94C18.39 12.69 18.67 12.56 19 12.56C19.33 12.56 19.63 12.69 19.88 12.94L21.5 14.53L22.55 13.5L20.95 11.86C20.36 11.33 19.7 11.06 19 11.06Z";var U0="M14,19H18V5H14M6,19H10V5H6V19Z";var K0="M8,5.14V19.14L19,12.14L8,5.14Z";var j0="M14.6 9L18 3.1L19.7 4.1L16.9 9H14.6M14 10H3V12H5V19C5 20.1 5.9 21 7 21H17C18.1 21 19 20.1 19 19V12H21V10H14Z";var Q0="M19 19C19 20.11 18.11 21 17 21H7C5.9 21 5 20.11 5 19V12H3V10H21V12H19M8 1.5C6.15 1.5 4.65 3 4.65 4.85C4.65 6.7 6.15 8.2 8 8.2H9.53C9.92 8.2 10.29 8.3 10.61 8.5H12.63C12.05 7.45 10.86 6.75 9.53 6.75H8C7 6.75 6.15 5.77 6.15 4.75C6.15 3.73 7 3 8 3M12.85 2C12.85 3 12 3.85 11 3.85V5.35C12.92 5.35 14.5 6.7 14.89 8.5H16.42C16.12 6.67 14.96 5.15 13.35 4.38C13.97 3.77 14.35 2.93 14.35 2Z";var q0="M16.56,5.44L15.11,6.89C16.84,7.94 18,9.83 18,12A6,6 0 0,1 12,18A6,6 0 0,1 6,12C6,9.83 7.16,7.94 8.88,6.88L7.44,5.44C5.36,6.88 4,9.28 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12C20,9.28 18.64,6.88 16.56,5.44M13,3H11V13H13";var Y0="M18.73,18C15.4,21.69 9.71,22 6,18.64C2.33,15.31 2.04,9.62 5.37,5.93C6.9,4.25 9,3.2 11.27,3C7.96,6.7 8.27,12.39 12,15.71C13.63,17.19 15.78,18 18,18C18.25,18 18.5,18 18.73,18Z";var X0="M16,6C14.87,6 13.77,6.35 12.84,7H4C2.89,7 2,7.89 2,9V15C2,16.11 2.89,17 4,17H5V18A1,1 0 0,0 6,19H8A1,1 0 0,0 9,18V17H15V18A1,1 0 0,0 16,19H18A1,1 0 0,0 19,18V17H20C21.11,17 22,16.11 22,15V9C22,7.89 21.11,7 20,7H19.15C18.23,6.35 17.13,6 16,6M16,7.5A3.5,3.5 0 0,1 19.5,11A3.5,3.5 0 0,1 16,14.5A3.5,3.5 0 0,1 12.5,11A3.5,3.5 0 0,1 16,7.5M4,9H8V10H4V9M16,9A2,2 0 0,0 14,11A2,2 0 0,0 16,13A2,2 0 0,0 18,11A2,2 0 0,0 16,9M4,11H8V12H4V11M4,13H8V14H4V13Z";var J0="M7.95,3L6.53,5.19L7.95,7.4H7.94L5.95,10.5L4.22,9.6L5.64,7.39L4.22,5.19L6.22,2.09L7.95,3M13.95,2.89L12.53,5.1L13.95,7.3L13.94,7.31L11.95,10.4L10.22,9.5L11.64,7.3L10.22,5.1L12.22,2L13.95,2.89M20,2.89L18.56,5.1L20,7.3V7.31L18,10.4L16.25,9.5L17.67,7.3L16.25,5.1L18.25,2L20,2.89M2,22V14A2,2 0 0,1 4,12H20A2,2 0 0,1 22,14V22H20V20H4V22H2M6,14A1,1 0 0,0 5,15V17A1,1 0 0,0 6,18A1,1 0 0,0 7,17V15A1,1 0 0,0 6,14M10,14A1,1 0 0,0 9,15V17A1,1 0 0,0 10,18A1,1 0 0,0 11,17V15A1,1 0 0,0 10,14M14,14A1,1 0 0,0 13,15V17A1,1 0 0,0 14,18A1,1 0 0,0 15,17V15A1,1 0 0,0 14,14M18,14A1,1 0 0,0 17,15V17A1,1 0 0,0 18,18A1,1 0 0,0 19,17V15A1,1 0 0,0 18,14Z";var C7="M12,0C8.96,0 6.21,1.23 4.22,3.22L5.63,4.63C7.26,3 9.5,2 12,2C14.5,2 16.74,3 18.36,4.64L19.77,3.23C17.79,1.23 15.04,0 12,0M7.05,6.05L8.46,7.46C9.37,6.56 10.62,6 12,6C13.38,6 14.63,6.56 15.54,7.46L16.95,6.05C15.68,4.78 13.93,4 12,4C10.07,4 8.32,4.78 7.05,6.05M12,15A2,2 0 0,1 10,13A2,2 0 0,1 12,11A2,2 0 0,1 14,13A2,2 0 0,1 12,15M15,9H9A1,1 0 0,0 8,10V22A1,1 0 0,0 9,23H15A1,1 0 0,0 16,22V10A1,1 0 0,0 15,9Z";var H7="M12,4C14.1,4 16.1,4.8 17.6,6.3C20.7,9.4 20.7,14.5 17.6,17.6C15.8,19.5 13.3,20.2 10.9,19.9L11.4,17.9C13.1,18.1 14.9,17.5 16.2,16.2C18.5,13.9 18.5,10.1 16.2,7.7C15.1,6.6 13.5,6 12,6V10.6L7,5.6L12,0.6V4M6.3,17.6C3.7,15 3.3,11 5.1,7.9L6.6,9.4C5.5,11.6 5.9,14.4 7.8,16.2C8.3,16.7 8.9,17.1 9.6,17.4L9,19.4C8,19 7.1,18.4 6.3,17.6Z";var V7="M18.1,4.8C18,4.3 17.6,4 17.1,4H13L13.2,7H10.8L11,4H6.8C6.3,4 5.9,4.4 5.8,4.8L3.1,18.8C3,19.4 3.5,20 4.1,20H10L10.3,15H13.7L14,20H19.8C20.4,20 20.9,19.4 20.8,18.8L18.1,4.8M10.4,13L10.6,9H13.2L13.4,13H10.4Z";var e7="M16.88 4L16.88 4L19.03 6.1L13.5 10.5L12.5 9.5L16.87 4L16.88 4M16.88 2C16.3 2 15.73 2.24 15.33 2.72L9.8 9.65L13.34 13.19L20.28 7.67C21.18 6.91 21.25 5.54 20.41 4.7L18.3 2.59C17.9 2.19 17.39 2 16.88 2M9.1 10.36L8.39 11.07C8 11.46 8 12.09 8.39 12.5L10.5 14.6C10.71 14.8 10.96 14.89 11.22 14.89S11.73 14.8 11.93 14.6L12.63 13.9L9.1 10.36M6 15C5.45 15 5 15.45 5 16C5 16.55 5.45 17 6 17C6.55 17 7 16.55 7 16C7 15.45 6.55 15 6 15M9 16C8.45 16 8 16.45 8 17S8.45 18 9 18C9.55 18 10 17.55 10 17S9.55 16 9 16M4 18C3.45 18 3 18.45 3 19S3.45 20 4 20C4.55 20 5 19.55 5 19S4.55 18 4 18M7 19C6.45 19 6 19.45 6 20S6.45 21 7 21C7.55 21 8 20.55 8 20S7.55 19 7 19Z";var J2="M10.6 9.6L9 15L7.4 9.6L2 8L7.4 6.4L9 1L10.6 6.4L16 8L10.6 9.6M17 14.2L21 12L18.8 16L21 20L17 17.8L13 20L15.2 16L13 12L17 14.2M10 16L8.3 19L10 22L7 20.3L4 22L5.7 19L4 16L7 17.7L10 16";var L7="M20.79,13.95L18.46,14.57L16.46,13.44V10.56L18.46,9.43L20.79,10.05L21.31,8.12L19.54,7.65L20,5.88L18.07,5.36L17.45,7.69L15.45,8.82L13,7.38V5.12L14.71,3.41L13.29,2L12,3.29L10.71,2L9.29,3.41L11,5.12V7.38L8.5,8.82L6.5,7.69L5.92,5.36L4,5.88L4.47,7.65L2.7,8.12L3.22,10.05L5.55,9.43L7.55,10.56V13.45L5.55,14.58L3.22,13.96L2.7,15.89L4.47,16.36L4,18.12L5.93,18.64L6.55,16.31L8.55,15.18L11,16.62V18.88L9.29,20.59L10.71,22L12,20.71L13.29,22L14.7,20.59L13,18.88V16.62L15.5,15.17L17.5,16.3L18.12,18.63L20,18.12L19.53,16.35L21.3,15.88L20.79,13.95M9.5,10.56L12,9.11L14.5,10.56V13.44L12,14.89L9.5,13.44V10.56Z",t7="M16.46,9.41L13,7.38V5.12L14.71,3.41L13.29,2L12,3.29L10.71,2L9.29,3.41L11,5.12V7.38L8.5,8.82L6.5,7.69L5.92,5.36L4,5.88L4.47,7.65L2.7,8.12L3.22,10.05L5.55,9.43L7.55,10.56V13.45L5.55,14.58L3.22,13.96L2.7,15.89L4.47,16.36L4,18.12L5.93,18.64L6.55,16.31L8.55,15.18L11,16.62V18.88L9.29,20.59L10.71,22L12,20.71L13.29,22L14.7,20.59L13,18.88V16.62L16.46,14.61M9.5,10.56L12,9.11L14.5,10.56V13.44L12,14.89L9.5,13.44M19,13V7H21V13H19M19,17V15H21V17H19Z";var r7="M8 17.85C8 19.04 7.11 20 6 20S4 19.04 4 17.85C4 16.42 6 14 6 14S8 16.42 8 17.85M16.46 12V10.56L18.46 9.43L20.79 10.05L21.31 8.12L19.54 7.65L20 5.88L18.07 5.36L17.45 7.69L15.45 8.82L13 7.38V5.12L14.71 3.41L13.29 2L12 3.29L10.71 2L9.29 3.41L11 5.12V7.38L8.5 8.82L6.5 7.69L5.92 5.36L4 5.88L4.47 7.65L2.7 8.12L3.22 10.05L5.55 9.43L7.55 10.56V12H2V13H22V12H16.46M9.5 12V10.56L12 9.11L14.5 10.56V12H9.5M20 17.85C20 19.04 19.11 20 18 20S16 19.04 16 17.85C16 16.42 18 14 18 14S20 16.42 20 17.85M14 20.85C14 22.04 13.11 23 12 23S10 22.04 10 20.85C10 19.42 12 17 12 17S14 19.42 14 20.85Z";var i7="M14.25,12L16.27,11H23L22,9H18.03L20.42,5.83L19.43,3.83L15.37,9.2L13.35,10.21L13.75,8L17.83,2.62L15.64,2.22L12,7L8.4,2.2L6.2,2.6L10.26,8L10.66,10.21L8.82,9.29L8.66,9.21L4.6,3.8L3.6,5.8L6,9H2L1,11H7.77L9.75,12L7.73,13H1L2,15H5.97L3.58,18.17L4.57,20.17L8.63,14.8L10.65,13.79L10.25,16L6.17,21.38L8.36,21.79L12,17L15.6,21.8L17.8,21.4L13.74,16L13.34,13.79L15.34,14.79L19.4,20.2L20.4,18.2L18,15H22L23,13H16.23";var a7="M12,16A3,3 0 0,1 9,13C9,11.88 9.61,10.9 10.5,10.39L20.21,4.77L14.68,14.35C14.18,15.33 13.17,16 12,16M12,3C13.81,3 15.5,3.5 16.97,4.32L14.87,5.53C14,5.19 13,5 12,5A8,8 0 0,0 4,13C4,15.21 4.89,17.21 6.34,18.65H6.35C6.74,19.04 6.74,19.67 6.35,20.06C5.96,20.45 5.32,20.45 4.93,20.07V20.07C3.12,18.26 2,15.76 2,13A10,10 0 0,1 12,3M22,13C22,15.76 20.88,18.26 19.07,20.07V20.07C18.68,20.45 18.05,20.45 17.66,20.06C17.27,19.67 17.27,19.04 17.66,18.65V18.65C19.11,17.2 20,15.21 20,13C20,12 19.81,11 19.46,10.1L20.67,8C21.5,9.5 22,11.18 22,13Z";var o7="M16.72 10.43C14.68 8.39 14.5 4.66 14.5 4H13V6H9V4H7C7 2.9 7.9 2 9 2H16V3C16 3.08 16.04 7.63 17.78 9.37L16.72 10.43M17 2V4H18V2H17M15 12C13 10 13 7 13 7H9V9C9 10 9 10 8 11S7 13 7 13V20C7 21.1 7.9 22 9 22H13C14.1 22 15 21.1 15 20V12Z";var M7="M12,15.39L8.24,17.66L9.23,13.38L5.91,10.5L10.29,10.13L12,6.09L13.71,10.13L18.09,10.5L14.77,13.38L15.76,17.66M22,9.24L14.81,8.63L12,2L9.19,8.63L2,9.24L7.45,13.97L5.82,21L12,17.27L18.18,21L16.54,13.97L22,9.24Z";var n7="M13,19.92C14.8,19.7 16.35,18.95 17.65,17.65C18.95,16.35 19.7,14.8 19.92,13H16.92C16.7,14 16.24,14.84 15.54,15.54C14.84,16.24 14,16.7 13,16.92V19.92M10,8H14L17,11H19.92C19.67,9.05 18.79,7.38 17.27,6C15.76,4.66 14,4 12,4C10,4 8.24,4.66 6.73,6C5.21,7.38 4.33,9.05 4.08,11H7L10,8M11,19.92V16.92C10,16.7 9.16,16.24 8.46,15.54C7.76,14.84 7.3,14 7.08,13H4.08C4.3,14.77 5.05,16.3 6.35,17.6C7.65,18.9 9.2,19.67 11,19.92M12,2C14.75,2 17.1,3 19.05,4.95C21,6.9 22,9.25 22,12C22,14.75 21,17.1 19.05,19.05C17.1,21 14.75,22 12,22C9.25,22 6.9,21 4.95,19.05C3,17.1 2,14.75 2,12C2,9.25 3,6.9 4.95,4.95C6.9,3 9.25,2 12,2Z";var s7="M18,18H6V6H18V18Z";var l7="M10 2L7.6 5.4C8.4 5.2 9.2 5 10 5S11.6 5.2 12.4 5.4L10 2M21 13.8V7C21 5.9 20.1 5 19 5S17 5.9 17 7V13.8C16.4 14.4 16 15.2 16 16C16 17.7 17.3 19 19 19S22 17.7 22 16C22 15.1 21.6 14.3 21 13.8M20 8H18V7C18 6.4 18.4 6 19 6S20 6.4 20 7V8M5.5 6.7L1.3 7L3.1 10.8C3.2 10 3.5 9.2 3.9 8.5C4.4 7.8 4.9 7.2 5.5 6.7M10 7C7.2 7 5 9.2 5 12S7.2 17 10 17 15 14.8 15 12 12.8 7 10 7M10 15C8.3 15 7 13.7 7 12S8.3 9 10 9 13 10.3 13 12 11.7 15 10 15M3.2 13.2L1.4 17L5.5 17.4C5 16.9 4.4 16.2 4 15.5C3.5 14.8 3.3 14 3.2 13.2M7.6 18.6L10 22L12.4 18.6C11.6 18.8 10.8 19 10 19C9.1 19 8.3 18.8 7.6 18.6Z";var d7="M22.08,11.04H20.08V4H13.05V2H11.04V4H4V11.04H2V13.05H4V20.08H11.04V22.08H13.05V20.08H20.08V13.05H22.08V11.04M18.07,18.07H13.05V16.06H11.04V18.07H6V13.05H8.03V11.04H6V6H11.04V8.03H13.05V6H18.07V11.04H16.06V13.05H18.07V18.07M13.05,12.05A1,1 0 0,1 12.05,13.05C11.5,13.05 11.04,12.6 11.04,12.05C11.04,11.5 11.5,11.04 12.05,11.04C12.6,11.04 13.05,11.5 13.05,12.05Z";var p7="M15 13V5A3 3 0 0 0 9 5V13A5 5 0 1 0 15 13M12 4A1 1 0 0 1 13 5V8H11V5A1 1 0 0 1 12 4Z";var A7="M19.47 3.47L13.47 9.47L10.53 10C10.22 10.03 9.94 10.18 9.72 10.4L2.81 17.31C1.74 18.38 1.74 20.12 2.81 21.2C3.88 22.27 5.62 22.27 6.7 21.2L13.61 14.29C13.83 14.07 14 13.79 14.03 13.5L14.54 10.54L20.54 4.54L22 2L19.47 3.47M11 14.38C10.24 14.38 9.62 13.76 9.62 13S10.24 11.62 11 11.62 12.38 12.24 12.38 13C12.37 13.76 11.76 14.38 11 14.38Z";var m7="M12,20A7,7 0 0,1 5,13A7,7 0 0,1 12,6A7,7 0 0,1 19,13A7,7 0 0,1 12,20M19.03,7.39L20.45,5.97C20,5.46 19.55,5 19.04,4.56L17.62,6C16.07,4.74 14.12,4 12,4A9,9 0 0,0 3,13A9,9 0 0,0 12,22C17,22 21,17.97 21,13C21,10.88 20.26,8.93 19.03,7.39M11,14H13V8H11M15,1H9V3H15V1Z";var c7="M6,2H18V8H18V8L14,12L18,16V16H18V22H6V16H6V16L10,12L6,8V8H6V2M16,16.5L12,12.5L8,16.5V20H16V16.5M12,11.5L16,7.5V4H8V7.5L12,11.5M10,6H14V6.75L12,8.75L10,6.75V6Z";var u7="M4,5A2,2 0 0,0 2,7V17A2,2 0 0,0 4,19H20A2,2 0 0,0 22,17V7A2,2 0 0,0 20,5H4M4,7H16V17H4V7M19,7A1,1 0 0,1 20,8A1,1 0 0,1 19,9A1,1 0 0,1 18,8A1,1 0 0,1 19,7M6,9V11H14V9H6M19,11A1,1 0 0,1 20,12A1,1 0 0,1 19,13A1,1 0 0,1 18,12A1,1 0 0,1 19,11Z";var v7="M2 12H4V17H20V12H22V17C22 18.11 21.11 19 20 19H4C2.9 19 2 18.11 2 17V12M12 15L17.55 9.54L16.13 8.13L13 11.25V2H11V11.25L7.88 8.13L6.46 9.55L12 15Z";var x7="M16,18L18.29,15.71L13.41,10.83L9.41,14.83L2,7.41L3.41,6L9.41,12L13.41,8L19.71,14.29L22,12V18H16Z",h7="M22,12L18,8V11H3V13H18V16L22,12Z",f7="M16,6L18.29,8.29L13.41,13.17L9.41,9.17L2,16.59L3.41,18L9.41,12L13.41,16L19.71,9.71L22,12V6H16Z";var Z7="M8 13C6.14 13 4.59 14.28 4.14 16H2V18H4.14C4.59 19.72 6.14 21 8 21S11.41 19.72 11.86 18H22V16H11.86C11.41 14.28 9.86 13 8 13M8 19C6.9 19 6 18.1 6 17C6 15.9 6.9 15 8 15S10 15.9 10 17C10 18.1 9.1 19 8 19M19.86 6C19.41 4.28 17.86 3 16 3S12.59 4.28 12.14 6H2V8H12.14C12.59 9.72 14.14 11 16 11S19.41 9.72 19.86 8H22V6H19.86M16 9C14.9 9 14 8.1 14 7C14 5.9 14.9 5 16 5S18 5.9 18 7C18 8.1 17.1 9 16 9Z";var g7="M21,10.12H14.22L16.96,7.3C14.23,4.6 9.81,4.5 7.08,7.2C4.35,9.91 4.35,14.28 7.08,17C9.81,19.7 14.23,19.7 16.96,17C18.32,15.65 19,14.08 19,12.1H21C21,14.08 20.12,16.65 18.36,18.39C14.85,21.87 9.15,21.87 5.64,18.39C2.14,14.92 2.11,9.28 5.62,5.81C9.13,2.34 14.76,2.34 18.27,5.81L21,3V10.12M12.5,8V12.25L16,14.33L15.28,15.54L11,13V8H12.5Z";var S7="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z";var _7="M12,4L9.91,6.09L12,8.18M4.27,3L3,4.27L7.73,9H3V15H7L12,20V13.27L16.25,17.53C15.58,18.04 14.83,18.46 14,18.7V20.77C15.38,20.45 16.63,19.82 17.68,18.96L19.73,21L21,19.73L12,10.73M19,12C19,12.94 18.8,13.82 18.46,14.64L19.97,16.15C20.62,14.91 21,13.5 21,12C21,7.72 18,4.14 14,3.23V5.29C16.89,6.15 19,8.83 19,12M16.5,12C16.5,10.23 15.5,8.71 14,7.97V10.18L16.45,12.63C16.5,12.43 16.5,12.21 16.5,12Z";var y7="M12,20A6,6 0 0,1 6,14C6,10 12,3.25 12,3.25C12,3.25 18,10 18,14A6,6 0 0,1 12,20Z";var C5="M12,3.25C12,3.25 6,10 6,14C6,17.32 8.69,20 12,20A6,6 0 0,0 18,14C18,10 12,3.25 12,3.25M14.47,9.97L15.53,11.03L9.53,17.03L8.47,15.97M9.75,10A1.25,1.25 0 0,1 11,11.25A1.25,1.25 0 0,1 9.75,12.5A1.25,1.25 0 0,1 8.5,11.25A1.25,1.25 0 0,1 9.75,10M14.25,14.5A1.25,1.25 0 0,1 15.5,15.75A1.25,1.25 0 0,1 14.25,17A1.25,1.25 0 0,1 13,15.75A1.25,1.25 0 0,1 14.25,14.5Z";var b7="M3,15H13A1,1 0 0,1 14,16A1,1 0 0,1 13,17H3A1,1 0 0,1 2,16A1,1 0 0,1 3,15M16,15H21A1,1 0 0,1 22,16A1,1 0 0,1 21,17H16A1,1 0 0,1 15,16A1,1 0 0,1 16,15M1,12A5,5 0 0,1 6,7C7,4.65 9.3,3 12,3C15.43,3 18.24,5.66 18.5,9.03L19,9C21.19,9 22.97,10.76 23,13H21A2,2 0 0,0 19,11H17V10A5,5 0 0,0 12,5C9.5,5 7.45,6.82 7.06,9.19C6.73,9.07 6.37,9 6,9A3,3 0 0,0 3,12C3,12.35 3.06,12.69 3.17,13H1.1L1,12M3,19H5A1,1 0 0,1 6,20A1,1 0 0,1 5,21H3A1,1 0 0,1 2,20A1,1 0 0,1 3,19M8,19H21A1,1 0 0,1 22,20A1,1 0 0,1 21,21H8A1,1 0 0,1 7,20A1,1 0 0,1 8,19Z";var w7="M17.75,4.09L15.22,6.03L16.13,9.09L13.5,7.28L10.87,9.09L11.78,6.03L9.25,4.09L12.44,4L13.5,1L14.56,4L17.75,4.09M21.25,11L19.61,12.25L20.2,14.23L18.5,13.06L16.8,14.23L17.39,12.25L15.75,11L17.81,10.95L18.5,9L19.19,10.95L21.25,11M18.97,15.95C19.8,15.87 20.69,17.05 20.16,17.8C19.84,18.25 19.5,18.67 19.08,19.07C15.17,23 8.84,23 4.94,19.07C1.03,15.17 1.03,8.83 4.94,4.93C5.34,4.53 5.76,4.17 6.21,3.85C6.96,3.32 8.14,4.21 8.06,5.04C7.79,7.9 8.75,10.87 10.95,13.06C13.14,15.26 16.1,16.22 18.97,15.95M17.33,17.97C14.5,17.81 11.7,16.64 9.53,14.5C7.36,12.31 6.2,9.5 6.04,6.68C3.23,9.82 3.34,14.64 6.35,17.66C9.37,20.67 14.19,20.78 17.33,17.97Z";var O7="M4,10A1,1 0 0,1 3,9A1,1 0 0,1 4,8H12A2,2 0 0,0 14,6A2,2 0 0,0 12,4C11.45,4 10.95,4.22 10.59,4.59C10.2,5 9.56,5 9.17,4.59C8.78,4.2 8.78,3.56 9.17,3.17C9.9,2.45 10.9,2 12,2A4,4 0 0,1 16,6A4,4 0 0,1 12,10H4M19,12A1,1 0 0,0 20,11A1,1 0 0,0 19,10C18.72,10 18.47,10.11 18.29,10.29C17.9,10.68 17.27,10.68 16.88,10.29C16.5,9.9 16.5,9.27 16.88,8.88C17.42,8.34 18.17,8 19,8A3,3 0 0,1 22,11A3,3 0 0,1 19,14H5A1,1 0 0,1 4,13A1,1 0 0,1 5,12H19M18,18H4A1,1 0 0,1 3,17A1,1 0 0,1 4,16H18A3,3 0 0,1 21,19A3,3 0 0,1 18,22C17.17,22 16.42,21.66 15.88,21.12C15.5,20.73 15.5,20.1 15.88,19.71C16.27,19.32 16.9,19.32 17.29,19.71C17.47,19.89 17.72,20 18,20A1,1 0 0,0 19,19A1,1 0 0,0 18,18Z";var k7="M12,21L15.6,16.2C14.6,15.45 13.35,15 12,15C10.65,15 9.4,15.45 8.4,16.2L12,21M12,3C7.95,3 4.21,4.34 1.2,6.6L3,9C5.5,7.12 8.62,6 12,6C15.38,6 18.5,7.12 21,9L22.8,6.6C19.79,4.34 16.05,3 12,3M12,9C9.3,9 6.81,9.89 4.8,11.4L6.6,13.8C8.1,12.67 9.97,12 12,12C14.03,12 15.9,12.67 17.4,13.8L19.2,11.4C17.19,9.89 14.7,9 12,9Z";var H5="M2.28,3L1,4.27L2.47,5.74C2.04,6 1.61,6.29 1.2,6.6L3,9C3.53,8.6 4.08,8.25 4.66,7.93L6.89,10.16C6.15,10.5 5.44,10.91 4.8,11.4L6.6,13.8C7.38,13.22 8.26,12.77 9.2,12.47L11.75,15C10.5,15.07 9.34,15.5 8.4,16.2L12,21L14.46,17.73L17.74,21L19,19.72M12,3C9.85,3 7.8,3.38 5.9,4.07L8.29,6.47C9.5,6.16 10.72,6 12,6C15.38,6 18.5,7.11 21,9L22.8,6.6C19.79,4.34 16.06,3 12,3M12,9C11.62,9 11.25,9 10.88,9.05L14.07,12.25C15.29,12.53 16.43,13.07 17.4,13.8L19.2,11.4C17.2,9.89 14.7,9 12,9Z";var T7="M21 20V2H3V20H1V23H23V20M19 4V11H13V4M5 4H11V11H5M5 20V13H11V20M13 20V13H19V20Z";var E7="M21 20V2H3V20H1V23H23V20M19 4V11H17V4M5 4H7V11H5M5 20V13H7V20M9 20V4H15V20M17 20V13H19V20Z";var R7="M10 6.2C10 4.3 8.8 2.6 7 2V5.7H4V2C2.2 2.6 1 4.3 1 6.2C1 8.1 2.2 9.8 4 10.4V21.4C4 21.8 4.2 22 4.5 22H6.5C6.8 22 7 21.8 7 21.5V10.5C8.8 9.9 10 8.2 10 6.2M16 8C16 8 15.9 8 16 8C12.1 8.1 9 11.2 9 15C9 18.9 12.1 22 16 22S23 18.9 23 15 19.9 8 16 8M16 20C13.2 20 11 17.8 11 15S13.2 10 16 10 21 12.2 21 15 18.8 20 16 20M15 11V16L18.6 18.2L19.4 17L16.5 15.3V11H15Z";var P7="M22.61,19L13.53,9.91C14.46,7.57 14,4.81 12.09,2.91C9.79,0.61 6.21,0.4 3.66,2.26L7.5,6.11L6.08,7.5L2.25,3.69C0.39,6.23 0.6,9.82 2.9,12.11C4.76,13.97 7.47,14.46 9.79,13.59L18.9,22.7C19.29,23.09 19.92,23.09 20.31,22.7L22.61,20.4C23,20 23,19.39 22.61,19M19.61,20.59L10.15,11.13C9.54,11.58 8.86,11.85 8.15,11.95C6.79,12.15 5.36,11.74 4.32,10.7C3.37,9.76 2.93,8.5 3,7.26L6.09,10.35L10.33,6.11L7.24,3C8.5,2.95 9.73,3.39 10.68,4.33C11.76,5.41 12.17,6.9 11.92,8.29C11.8,9 11.5,9.66 11.04,10.25L20.5,19.7L19.61,20.59Z";var B7={alert:R3,check:e0,chevron:t0,chevron_up:r0,clock:i0,counter:a0,dots:p0,error:E3,info:P0,pause:U0,play:K0,power:q0,remote:C7,stop:s7,timer:c7,water:y7,wifi:k7,wifi_off:H5,auto:$3,care:P7,brightness:I3,dishwasher:s0,door:d0,door_closed:l0,dry:Q2,end_sound:D3,energy:X2,floor_light:X0,glass:b0,leaf:B0,key_tone:q2,quick:v0,rack:P3,rinse:M0,sanitize:J2,silent:_7,spray:o7,water_percent:C5,zone:C5,bake:n0,chicken:h0,clean:z3,defrost:r7,drawer:v7,fan:m0,fish:u0,flip:x0,fries:g0,fryer:u7,heat:c0,manual:Z7,meat:f0,probe:A7,recipe:L0,reheat:Y2,roast:O0,shake:e7,slow:j0,snack:Z0,star:M7,steam:Q0,temperature:p7,vegetable:V0,warm:Y2,ac:T3,adblue:z0,battery_car:U3,bonnet:Q3,car:J3,car_door:X3,charger:A0,fuel:_0,gauge:y0,history:k0,lights:C0,lock:F0,lock_open:N0,marker:D0,motion:H0,odometer:a7,online:q3,parking:K3,range:V7,service:R7,snowflake:L7,software:g7,steering:n7,travel_time:m7,trip:j3,trunk:G3,sunroof:Y3,window_closed:T7,window_open:E7,bulb:$0,fridge:S0,frost:i7,ice:o0,mist:b7,night:w7,party:G0,target:d7,co2:I0,exhaust:T0,filter:Q2,pm25:w0,reset:H7,sleep:Y0,supply:E0,wind:O7,away:F3,indoor:R0,outdoor:l7,swing:B3,battery:N3,boost:X2,calendar:W3,frost_guard:t7,radiator:J0,palette:W0,touch:q2,sparkle:J2,noise:S7,offline:H5,trend_up:f7,trend_down:x7,trend_stable:h7};function s(L,C="icon"){let H=B7[L]||B7.info;return`<svg class="${C}" viewBox="0 0 24 24" aria-hidden="true"><path d="${H}"></path></svg>`}var E=`
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

/* Every icon is an inline mdi path with no fill of its own, so without this
   it renders in the SVG default black and ignores the colour the rules below
   set on it - invisible on a dark theme. */
.icon { fill: currentColor; }

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

/* ---------- steppers ---------- */
.steppers { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 10px; }
.steppers.narrow { grid-template-columns: repeat(auto-fit, minmax(150px, 210px)); justify-content: start; }
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
`;var A8=`
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
.meters { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; transition: opacity .3s ease; }
.meters.stale { opacity: .4; }

/* ---------- delayed start ---------- */
.time-input {
  flex: 1; font: inherit; font-size: 1rem; font-weight: 600; text-align: center;
  padding: 4px 8px; border-radius: 10px; color: var(--ap-text);
  border: 1px solid var(--ap-line); background: transparent;
  font-variant-numeric: tabular-nums;
}
.time-input:focus { outline: none; border-color: var(--ap-accent); }
.time-input[disabled] { opacity: .4; }
.step-btn.wide { width: 38px; }
.step-btn.wide .icon { width: 18px; height: 18px; }
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
`,$7=E+A8;function F(L,C){if(!L)return"";let H=C?.locale?.language||C?.language||"hu",V=C?.locale?.time_format,e={hour:"2-digit",minute:"2-digit"};V==="12"&&(e.hour12=!0),V==="24"&&(e.hour12=!1);try{return new Intl.DateTimeFormat(H,e).format(L)}catch{return L.toTimeString().slice(0,5)}}function x1(L,C){if(L==null)return null;let H=Math.max(0,Math.round(L));if(H<60)return{value:String(H),unit:C("ui.minute_short")};let V=Math.floor(H/60),e=H%60;return{value:`${V}:${String(e).padStart(2,"0")}`,unit:C("ui.hour_short")}}function d1(L,C){let H=x1(L,C);return H?`${H.value} ${H.unit}`:""}function V5(L){if(L==null)return null;let C=Math.max(0,Math.round(L)),H=Math.floor(C/60),V=C%60;return H?`${H}:${String(V).padStart(2,"0")}`:`0:${String(V).padStart(2,"0")}`}function B(L,C,H=1){if(L==null||!Number.isFinite(Number(L)))return"\u2013";let V=C?.locale?.language||C?.language||"en";try{return new Intl.NumberFormat(V,{maximumFractionDigits:H,minimumFractionDigits:0}).format(Number(L))}catch{return g(Number(L),H)}}function g(L,C=1){return L==null||!Number.isFinite(L)?"\u2013":L.toFixed(C).replace(/\.0$/,"")}function a(L){return String(L??"").replace(/[&<>"']/g,C=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[C])}var L5={language:"auto",compact:!1,animate:!0,show_programs:!0,show_options:!0,show_delay:!0,show_scores:!0,show_consumption:!0,show_details:!0,show_controls:!0,show_appliance_settings:!0},m8=[A.IDLE,A.READY_TO_START],F7=[A.IDLE,A.READY_TO_START],e5=class extends HTMLElement{static getConfigElement(){return document.createElement(R1)}static getStubConfig(C){let H=r2(C);return{type:`custom:${q}`,device:H[0]?.id}}constructor(){super(),this.attachShadow({mode:"open"}),this._sections={},this._signatures={},this._built=!1}setConfig(C){this._config={...L5,...C||{}},this._signatures={},this._hass&&this._render()}set hass(C){this._hass=C,this._render()}get hass(){return this._hass}connectedCallback(){this._timer=window.setInterval(()=>this._render(),3e4)}disconnectedCallback(){this._timer&&window.clearInterval(this._timer),this._timer=void 0}getCardSize(){return this._config?.compact?5:9}getGridOptions(){return{columns:12,min_columns:6,rows:this._config?.compact?6:"auto"}}_build(){let C=document.createElement("style");C.textContent=$7;let H=document.createElement("ha-card"),V=document.createElement("div");V.className="wrap",V.addEventListener("click",e=>this._onClick(e)),V.addEventListener("input",e=>this._onInput(e)),V.addEventListener("keydown",e=>this._onKeyDown(e));for(let e of["header","hero","alerts","programs","options","delay","meters","controls","appliance","details"]){let t=document.createElement("div");t.dataset.section=e,this._sections[e]=t,V.appendChild(t)}H.appendChild(V),this.shadowRoot.replaceChildren(C,H),this._card=H,this._wrap=V,this._built=!0}_render(){if(!this._hass||!this._config)return;this._built||this._build();let C=H2(this._config,this._hass),H=V2(C);this._t=H;let V=b3(this._hass,this._config);if(this._model=V,!V.ok){this._renderEmpty(V,H);return}this._emptyShown=!1,this._applyHostClasses(V),this._section("header",this._headerHtml(V,H)),this._heroSection(V,H),this._section("alerts",this._alertsHtml(V,H)),this._section("programs",this._config.show_programs?this._programsHtml(V,H):""),this._section("options",this._config.show_options?this._optionsHtml(V,H):""),this._section("delay",this._config.show_delay?this._delayHtml(V,H):""),this._section("meters",this._metersHtml(V,H)),this._section("controls",this._config.show_controls?this._controlsHtml(V,H):""),this._section("appliance",this._config.show_appliance_settings?this._applianceSettingsHtml(V,H):""),this._section("details",this._config.show_details?this._detailsHtml(V,H):"")}_renderEmpty(C,H){if(this._emptyShown!==C.reason){this._emptyShown=C.reason,this._signatures={};for(let V of Object.values(this._sections))V.innerHTML="";this._sections.header.innerHTML=`
      <div class="empty">
        ${s("dishwasher")}
        <div>${a(H(`ui.${C.reason}`))}</div>
      </div>`}}_section(C,H){this._signatures[C]!==H&&(this._signatures[C]=H,this._sections[C].innerHTML=H,this._sections[C].hidden=!H,C==="delay"&&this._restoreReadyBy())}_applyHostClasses(C){let H=["wrap"];this._config.compact&&H.push("compact"),this._config.animate||H.push("no-animation"),H.push(`accent-${C.accent}`),C.state===A.RUNNING&&H.push("running","busy"),C.state===A.PAUSED&&H.push("paused"),C.state===A.END_OF_CYCLE&&H.push("done"),C.state===A.OFF&&H.push("off"),(C.state===A.ALARM||C.alerts.some(e=>C2[e]==="error"))&&H.push("alarm"),C.step==="DRYING"&&H.push("phase-drying"),C.doorOpen&&H.push("door-open");let V=H.join(" ");this._wrap.className!==V&&(this._wrap.className=V)}_headerHtml(C,H){let V=a(C.name||H("card_name")),e=[A.IDLE,A.READY_TO_START].includes(C.state)?this._cycleMinutes(C):P[C.program]?.duration,t=C.state===A.OFF?"":C.program&&e?`${H(`program.${C.program}`)} \xB7 ${d1(e,H)}`:C.programRaw||"",r=[];return C.online?C.linkQuality&&r.push(`<span title="${H("ui.wifi")}: ${C.linkQuality}">${s("wifi")}</span>`):r.push(`<span class="bad" title="${H("ui.offline")}">${s("wifi_off")}</span>`),C.doorOpen&&r.push(`<span class="bad" title="${H("ui.door_open")}">${s("door")}</span>`),C.ecoMode&&r.push(`<span title="${H("ui.eco_mode")}">${s("leaf")}</span>`),`
      <div class="header">
        <div>
          <div class="title" data-action="more-info">${V}</div>
          ${t?`<div class="sub">${a(t)}</div>`:""}
        </div>
        <div class="spacer"></div>
        <div class="badges">${r.join("")}</div>
        <div class="pill">${s(this._stateIcon(C))}${a(H(`state.${C.state}`))}</div>
      </div>`}_stateIcon(C){switch(C.state){case A.RUNNING:return"water";case A.PAUSED:return"pause";case A.END_OF_CYCLE:return"check";case A.DELAYED_START:return"timer";case A.ALARM:return"error";case A.READY_TO_START:return"play";default:return"power"}}_heroSection(C,H){this._sections.hero.querySelector(".machine")||(this._sections.hero.innerHTML=`
        <div class="hero">
          <div class="machine-wrap" data-action="more-info">${O3()}</div>
          <div class="status"></div>
        </div>`,this._statusNode=this._sections.hero.querySelector(".status"));let V=this._statusHtml(C,H);this._signatures.status!==V&&(this._signatures.status=V,this._statusNode.innerHTML=V),k3(this._sections.hero,this._displayText(C,H))}_displayText(C,H){return C.state===A.OFF?"":C.state===A.DELAYED_START&&C.delay?V5(C.delay):C.remaining!==null&&[A.RUNNING,A.PAUSED,A.DELAYED_START].includes(C.state)?V5(C.remaining):C.state===A.END_OF_CYCLE?"0:00":C.program?H(`program.${C.program}`).slice(0,8):"--:--"}_statusHtml(C,H){let V=[],e=C.state===A.RUNNING&&C.phase!=="UNAVAILABLE"?`<span class="phase-text">${a(H(`phase_long.${C.phase}`))}</span>`:"";V.push(`
      <div class="status-line">
        <span class="state-text">${a(H(`state.${C.state}`))}</span>
        ${e}
      </div>`),C.program&&C.state!==A.OFF&&V.push(`
        <div class="program-line">
          ${s(P[C.program]?.icon||"dishwasher")}
          <span>${a(H(`program.${C.program}`))}</span>
        </div>`);let t=this._countdownHtml(C,H);return t&&V.push(t),[A.RUNNING,A.PAUSED,A.END_OF_CYCLE].includes(C.state)&&(V.push(`<div class="bar"><i style="width:${Math.round(C.progress*100)}%"></i></div>`),V.push(this._timelineHtml(C,H))),V.join("")}_cycleMinutes(C){let H=P[C.program]?.duration??null,V=C.remaining!==null&&C.remaining>0?C.remaining:null;if(![A.IDLE,A.READY_TO_START].includes(C.state))return V??H;let e=this._durationTrack;return e?e.program!==C.program?this._durationTrack={program:C.program,reported:V,stale:!0}:e.stale&&V!==e.reported&&(e.stale=!1):this._durationTrack={program:C.program,reported:V,stale:!1},this._durationTrack.stale?H??V:V??H}_countdownHtml(C,H){if(C.state===A.END_OF_CYCLE)return`<div class="countdown"><span class="at">${s("check")}${a(H("ui.finished_hint"))}</span></div>`;if(C.state===A.DELAYED_START){let V=x1(C.delay||C.remaining,H);if(!V)return"";let e=[C.startAt?`<span class="at">${s("timer")}${a(H("ui.starts_at"))} ${F(C.startAt,this._hass)}</span>`:"",C.finishAt?`<span class="at">${s("clock")}${a(H("ui.ready_at"))} ${F(C.finishAt,this._hass)}</span>`:""].join("");return`<div class="countdown"><span class="value">${V.value}</span><span class="unit">${V.unit}</span>${e}</div>`}if([A.RUNNING,A.PAUSED].includes(C.state)){let V=x1(C.remaining,H);if(!V)return"";let e=C.finishAt?`<span class="at">${s("clock")}${a(H("ui.ready_at"))} ${F(C.finishAt,this._hass)}</span>`:"";return`<div class="countdown"><span class="value">${V.value}</span><span class="unit">${V.unit}</span>${e}</div>`}if([A.IDLE,A.READY_TO_START].includes(C.state)){let V=this._cycleMinutes(C),e=x1(V,H);if(!e)return"";let t=C.delay?new Date(Date.now()+C.delay*6e4):null,r=new Date(Date.now()+(V+C.delay)*6e4),i=[t?`<span class="at">${s("timer")}${a(H("ui.starts_at"))} ${F(t,this._hass)}</span>`:"",`<span class="at">${s("clock")}${a(H("ui.ready_at"))} ${F(r,this._hass)}</span>`].join("");return`<div class="countdown"><span class="value">${e.value}</span><span class="unit">${e.unit}</span>${i}</div>`}if(C.state===A.OFF&&C.delay&&C.program&&P[C.program]){let V=P[C.program].duration,e=x1(V,H),t=new Date(Date.now()+C.delay*6e4),r=new Date(Date.now()+(V+C.delay)*6e4);return`<div class="countdown"><span class="value">${e.value}</span><span class="unit">${e.unit}</span>
        <span class="at">${s("timer")}${a(H("ui.starts_at"))} ${F(t,this._hass)}</span>
        <span class="at">${s("clock")}${a(H("ui.ready_at"))} ${F(r,this._hass)}</span></div>`}return""}_timelineHtml(C,H){let V=P[C.program]?.steps||U2,e=C.step?V.indexOf(C.step):-1;return`<div class="timeline">${U2.map(r=>{let i=V.includes(r),o=V.indexOf(r),M="step";return i?e>=0&&o<e?M+=" done":e>=0&&o===e?M+=" active":C.state===A.END_OF_CYCLE&&(M+=" done"):M+=" skip",`<div class="${M}"><span class="dot"></span><span class="label">${a(H(`phase.${r}`))}</span></div>`}).join("")}</div>`}_alertsHtml(C,H){let V=[];C.doorOpen&&C.state!==A.OFF&&V.push({severity:"warning",text:H("ui.door_open"),iconName:"door"});let e=new Set(C.alerts.map(r=>r.code).filter(Boolean)),t=(r,i)=>{!r||e.has(i)||(e.add(i),V.push({severity:C2[i]||"warning",text:H(`alert.${i}`),iconName:"alert"}))};for(let r of C.alerts){let{code:i,count:o}=r,n=(r.severity==="ERROR"||r.severity==="CRITICAL"?"error":"")||C2[i]||"warning",l=i?H(`alert.${i}`,`${H("alert_generic")}: ${i.replace(/^DISH_ALARM_/,"")}`):`${H("alert_generic")}: ${o}`;V.push({severity:n,text:l,iconName:n==="error"?"error":"alert"})}return t(C.consumables.salt,"DISH_ALARM_SALT_MISSING"),t(C.consumables.rinseAid,"DISH_ALARM_RINSE_AID_LOW"),C.online||V.push({severity:"error",text:H("ui.offline"),iconName:"wifi_off"}),V.length?`<div class="alerts">${V.map(r=>`<div class="alert ${r.severity}">${s(r.iconName)}<span>${a(r.text)}</span></div>`).join("")}</div>`:""}_programsHtml(C,H){if(!C.entities.program||!C.programOptions.length)return"";let V=m8.includes(C.state)&&C.remoteEnabled,e=C.programOptions.filter(M=>P[M.key]),t=[...K2.map(M=>e.find(n=>n.key===M)).filter(Boolean),...e.filter(M=>!K2.includes(M.key))],r=C.state===A.OFF?null:C.program,i=t.map(M=>{let n=M.key===r,l=P[M.key],d=`${H(`program_hint.${M.key}`)} \xB7 ${g(l.water)} l \xB7 ${g(l.energy,3)} kWh \xB7 ${d1(l.duration,H)}`;return`<button class="chip" type="button" data-action="program" data-value="${a(M.label)}"
        aria-pressed="${n}" title="${a(d)}" ${V?"":"disabled"}>
        ${s(l.icon)}<span>${a(H(`program.${M.key}`))}</span></button>`}),o=r?a(H(`program_hint.${r}`)):"";return`
      <div class="section">
        <div class="section-title">${a(H("ui.program"))}</div>
        <div class="chips">${i.join("")}</div>
        ${o?`<div class="note">${o}</div>`:""}
      </div>`}_optionsHtml(C,H){if(!C.options.length||C.state===A.OFF)return"";let V=F7.includes(C.state)&&C.remoteEnabled,e=C.options.filter(r=>r.supported||r.on);if(!e.length)return`
        <div class="section">
          <div class="section-title">${a(H("ui.options"))}</div>
          <div class="note">${a(H("ui.no_options"))}</div>
        </div>`;let t=e.map(r=>`<button class="chip" type="button" data-action="option" data-value="${r.entityId}"
        aria-pressed="${r.on}" title="${a(H(`option_hint.${r.key}`))}"
        ${V&&r.supported?"":"disabled"}>
        ${s(r.icon)}<span>${a(H(`option.${r.key}`))}</span></button>`);return`
      <div class="section">
        <div class="section-title">${a(H("ui.options"))}</div>
        <div class="chips">${t.join("")}</div>
      </div>`}_delayHtml(C,H){if(!C.entities.start_time)return"";let V=C.state===A.DELAYED_START||C.delay>0,e=(F7.includes(C.state)||C.state===A.DELAYED_START)&&C.remoteEnabled;if(!e&&!V)return"";let t=c3.map(n=>{let l=C.delay===n;return`<button class="chip" type="button" data-action="delay" data-value="${n}"
        aria-pressed="${l}" ${e?"":"disabled"}>
        ${s("timer")}<span>${n/60} ${a(H("ui.hour_short"))}</span></button>`});V&&t.push(`<button class="chip" type="button" data-action="delay" data-value="-1" ${e?"":"disabled"}>
        ${s("stop")}<span>${a(H("ui.delay_cancel"))}</span></button>`);let r=V?`<span class="hint">${a(d1(C.delay,H))}</span>`:`<span class="hint">${a(H("ui.delay_off"))}</span>`,i=Math.min(C.delayControl?.maxMinutes??s1,s1),o=`
      <div class="steppers narrow">
        <div class="stepper">
          <span class="label">${a(H("ui.delay_amount"))}</span>
          <div class="row">
            <button class="step-btn" type="button" data-action="delay-step" data-dir="-1"
              ${e&&C.delay>0?"":"disabled"} aria-label="\u2212">\u2212</button>
            <span class="value">${a(C.delay?d1(C.delay,H):H("ui.delay_off"))}</span>
            <button class="step-btn" type="button" data-action="delay-step" data-dir="1"
              ${e&&C.delay<i?"":"disabled"} aria-label="+">+</button>
          </div>
        </div>
        <div class="stepper" title="${a(H("ui.ready_by_hint"))}">
          <span class="label">${a(H("ui.ready_by"))}</span>
          <div class="row">
            <input class="time-input" type="time" data-action="ready-by" ${e?"":"disabled"}>
            <button class="step-btn wide" type="button" data-action="ready-by-apply"
              ${e?"":"disabled"} title="${a(H("ui.ready_by_apply"))}">
              ${s("check")}</button>
          </div>
        </div>
      </div>`,M=this._delayNotice&&Date.now()-this._delayNotice.at<2e4?`<div class="note">${s("info")}${a(this._delayNotice.text)}</div>`:"";return`
      <div class="section">
        <div class="section-title">${a(H("ui.delay"))}${r}</div>
        <div class="chips">${t.join("")}</div>
        ${o}
        ${M}
      </div>`}_scoresStale(C){let H=[C.scores.eco,C.scores.energy,C.scores.water].join("/"),V=this._scoreTrack;return V?V.program!==C.program?this._scoreTrack={program:C.program,values:H,stale:!0,since:Date.now()}:V.stale&&(H!==V.values||Date.now()-V.since>3e4)&&(V.stale=!1):this._scoreTrack={program:C.program,values:H,stale:!1,since:0},this._scoreTrack.stale}_metersHtml(C,H){if(C.state===A.OFF)return"";let V=[],{eco:e,energy:t,water:r}=C.scores,i=P[C.program]?.scores!==!1,o=this._scoresStale(C);if(this._config.show_scores&&i&&(e!==null||t!==null||r!==null)){let n=(l,d,p,v)=>{let f=Math.max(0,Math.min(7,v??0)),m=Array.from({length:7},(Z,c)=>`<i class="${c<f?"on":""}"></i>`).join("");return`
          <div class="meter ${d}">
            <div class="top">${s(p)}<span>${a(H(`ui.${l}`))}</span>
              <span class="val">${v===null?"\u2013":`${v}/7`}</span></div>
            <div class="track">${m}</div>
          </div>`};V.push(`
        <div class="meters${o?" stale":""}">
          ${n("eco_score","eco","leaf",e)}
          ${n("energy_score","energy","energy",t)}
          ${n("water_score","water","water",r)}
        </div>`)}if(this._config.show_consumption&&C.program&&P[C.program]){let n=P[C.program];V.push(`
        <div class="facts">
          <span class="fact">${s("water")}<b>${g(n.water)}</b> l</span>
          <span class="fact">${s("energy")}<b>${g(n.energy,3)}</b> kWh</span>
          <span class="fact">${s("timer")}<b>${a(d1(n.duration,H))}</b></span>
        </div>`)}if(!V.length)return"";let M=o&&i?`<span class="hint">${a(H("ui.scores_updating"))}</span>`:"";return`
      <div class="section">
        <div class="section-title">${a(H("ui.scores"))}${M}</div>
        ${V.join("")}
      </div>`}_controlsHtml(C,H){let e=(A3[C.state]||[]).filter(r=>C.entities[`cmd_${r}`]).map(r=>{let i=m3[r],o=!C.remoteEnabled&&r!=="off"?"disabled":"";return`<button class="btn ${i.style}" type="button" data-action="command" data-value="${r}" ${o}>
          ${s(i.icon)}<span>${a(H(`command.${r}`))}</span></button>`});if(!e.length)return"";let t=C.remoteEnabled?"":`<div class="note">${s("remote")}${a(H("ui.remote_disabled_hint"))}</div>`;return`<div class="section"><div class="controls">${e.join("")}</div>${t}</div>`}_applianceSettingsHtml(C,H){let{brightness:V,floorLight:e,endSound:t,keyTone:r}=C.settings;if(!V&&!e&&!t&&!r)return"";let i=C.online&&C.remoteEnabled,o=(l,d,p,v)=>v?`<button class="chip" type="button" data-action="setting" data-value="${l}"
            aria-pressed="${v.on}" title="${a(H(`ui.${p}_hint`,""))}"
            ${i?"":"disabled"}>
            ${s(d)}<span>${a(H(`ui.${p}`))}</span>
          </button>`:"",M=[o("floor","floor_light","floor_light",e),o("sound","end_sound","end_sound",t),o("key","key_tone","key_tone",r)].filter(Boolean),n=V?`<div class="steppers narrow">
          <div class="stepper" title="${a(H("ui.brightness_hint",""))}">
            <span class="label">${a(H("ui.brightness"))}</span>
            <div class="row">
              <button class="step-btn" type="button" data-action="brightness" data-dir="-1"
                ${i&&V.value>V.min?"":"disabled"} aria-label="\u2212">\u2212</button>
              <span class="value">${V.value}</span>
              <button class="step-btn" type="button" data-action="brightness" data-dir="1"
                ${i&&V.value<V.max?"":"disabled"} aria-label="+">+</button>
            </div>
          </div>
        </div>`:"";return`
      <div class="section">
        <div class="section-title">${a(H("ui.appliance_settings"))}</div>
        ${M.length?`<div class="chips">${M.join("")}</div>`:""}
        ${n}
      </div>`}_detailsHtml(C,H){let V=[],e=(t,r,i)=>{r==null||r===""||V.push(`
        <div class="detail">
          <span class="k">${a(H(`ui.${t}`))}</span>
          <span class="v">${s(i)}${a(String(r))}</span>
        </div>`)};if(C.doorOpen!==null&&e("door",C.doorOpen?H("ui.door_open"):H("ui.door_closed"),C.doorOpen?"door":"door_closed"),C.remote){let t=C.remote.includes("TEMPORARY")?H("ui.remote_locked"):C.remoteEnabled?H("ui.remote_on"):H("ui.remote_off");e("remote",t,"remote")}if(C.linkQuality){let t=C.linkQuality.replace(/_/g," ").toLowerCase();e("wifi",t.charAt(0).toUpperCase()+t.slice(1),"wifi")}return C.cycles!==null&&e("cycles",C.cycles,"counter"),C.rinseAid!==null&&e("rinse_aid",`${C.rinseAid}/8`,"water_percent"),C.waterHardness&&e("water_hardness",C.waterHardness,"water"),V.length?`
      <div class="section">
        <div class="section-title">${a(H("ui.details"))}</div>
        <div class="details">${V.join("")}</div>
      </div>`:""}_onInput(C){let H=C.target.closest('[data-action="ready-by"]');H&&(this._readyByValue=H.value)}_onKeyDown(C){if(C.key!=="Enter")return;let H=C.target.closest('[data-action="ready-by"]');!H||H.hasAttribute("disabled")||(C.preventDefault(),this._applyReadyBy(H.value))}_applyReadyBy(C){!this._model?.ok||!/^\d{1,2}:\d{2}$/.test(C||"")||(this._readyByValue=C,this._readyBy(C,this._t),this._render())}_restoreReadyBy(){if(!this._readyByValue)return;let C=this._sections.delay?.querySelector('[data-action="ready-by"]');C&&C.value!==this._readyByValue&&(C.value=this._readyByValue)}_onClick(C){let H=C.target.closest("[data-action]");if(!H||H.hasAttribute("disabled"))return;let{action:V,value:e}=H.dataset,t=this._model;if(!(!t?.ok&&V!=="more-info"))switch(V){case"more-info":this._moreInfo(t?.entities?.appliance_state);break;case"program":this._selectProgram(e);break;case"option":this._haptic("light"),this._call("switch","toggle",{entity_id:e});break;case"command":this._haptic("medium"),this._call("button","press",{entity_id:t.entities[`cmd_${e}`]});break;case"setting":this._toggleSetting(e);break;case"brightness":this._stepBrightness(Number(H.dataset.dir));break;case"delay":this._setDelay(Number(e));break;case"delay-step":this._stepDelay(Number(H.dataset.dir));break;case"ready-by-apply":this._applyReadyBy(this._sections.delay?.querySelector('[data-action="ready-by"]')?.value);break;default:break}}_setDelay(C){let H=this._model,V=H.entities.start_time;if(!V)return;let e=H.delayControl,t;if(C<=0)t=e?e.min:-1;else{let r=e?e.seconds?e.step/60:e.step:1,i=Math.max(n1,r||1),o=Math.floor(C/i)*i;if(o<=0)return this._setDelay(0);t=e?.seconds?o*60:o}return this._haptic("light"),this._call("number","set_value",{entity_id:V,value:t})}_stepDelay(C){let H=this._model,V=Math.min(H.delayControl?.maxMinutes??s1,s1),e=Math.floor(H.delay/n1)*n1,t=Math.min(V,Math.max(0,e+C*n1));t!==H.delay&&this._setDelay(t)}_readyBy(C,H){let V=this._model,e=/^(\d{1,2}):(\d{2})$/.exec(C||"");if(!e)return;let t=new Date;t.setSeconds(0,0);let r=new Date(t);r.setHours(Number(e[1]),Number(e[2]),0,0),r<=t&&r.setDate(r.getDate()+1);let i=this._cycleMinutes(V)||0,o=Math.round((r.getTime()-t.getTime())/6e4),M=Math.min(V.delayControl?.maxMinutes??s1,s1),n=Math.floor((o-i)/n1)*n1;if(n<=0){let l=new Date(Date.now()+i*6e4);this._delayNotice={at:Date.now(),text:`${H("ui.ready_by_too_soon")} ${F(l,this._hass)}`},n=0}else if(n>M)n=M,this._delayNotice={at:Date.now(),text:H("ui.ready_by_max")};else{let l=new Date(Date.now()+(n+i)*6e4);this._delayNotice={at:Date.now(),text:`${H("ui.ready_by_set")}: ${d1(n,H)} \xB7 ${H("ui.ready_at")} ${F(l,this._hass)}`}}this._setDelay(n)}_toggleSetting(C){let H=this._model;if(this._haptic("light"),C==="key")return this._call("switch","toggle",{entity_id:H.entities.key_tone});let[V,e]=C==="floor"?["floorLight","display_on_floor"]:["endSound","end_of_cycle_sound"],t=H.settings[V];if(t)return this._call("select","select_option",{entity_id:H.entities[e],option:t.on?t.offOption:t.onOption})}_stepBrightness(C){let{brightness:H}=this._model.settings;if(!H)return;let V=H.levels.findIndex(t=>t.value===H.value),e=H.levels[(V===-1?0:V)+C];e&&(this._haptic("light"),this._call("select","select_option",{entity_id:this._model.entities.display_light,option:e.label}))}_selectProgram(C){return this._haptic("light"),this._call("select","select_option",{entity_id:this._model.entities.program,option:C})}_call(C,H,V){return V.entity_id?this._hass.callService(C,H,V):Promise.resolve()}_moreInfo(C){C&&this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:C},bubbles:!0,composed:!0}))}_haptic(C){this.dispatchEvent(new CustomEvent("haptic",{detail:C,bubbles:!0,composed:!0}))}};function N7(){customElements.get(q)||(customElements.define(q,e5),window.customCards=window.customCards||[],window.customCards.push({type:q,name:"AEG / Electrolux Dishwasher Card",description:"Rich status card for AEG and Electrolux dishwashers: phases, remaining time, programs, options and controls.",preview:!0,documentationURL:"https://github.com/gabor-io/ha-appliance-custom-card"}),console.info(`%c ${q} %c ${s3} `,"color:#fff;background:#039be5;font-weight:700;border-radius:3px 0 0 3px","color:#039be5;background:#e1f5fe;font-weight:700;border-radius:0 3px 3px 0"))}var c8=`
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
`;function R(L){return class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}setConfig(H){this._config={...H},this._render()}set hass(H){let V=!this._hass;if(this._hass=H,V){this._render();return}this.shadowRoot.activeElement||this._deviceSignature()!==this._devices&&this._render()}_deviceSignature(){return this._hass?L.listDevices(this._hass).map(H=>`${H.id}:${H.name}`).join("|"):""}_render(){if(!this._config||!this._hass)return;this._devices=this._deviceSignature();let H=L.translator(L.getLanguage(this._config,this._hass)),V=L.listDevices(this._hass),e=this._config.device||"",t=[`<option value="" ${e?"":"selected"}>${a(H("editor.device_auto"))}</option>`,...V.map(o=>`<option value="${a(o.id)}" ${o.id===e?"selected":""}>${a(o.name)}</option>`)].join(""),r=[`<option value="auto">${a(H("editor.language_auto"))}</option>`,...L.languages.map(o=>`<option value="${o}" ${this._config.language===o?"selected":""}>${o.toUpperCase()}</option>`)].join(""),i=L.toggles.map(o=>{let M=this._config[o]??L.defaults[o]??!1;return`<label class="toggle"><input type="checkbox" data-key="${o}" ${M?"checked":""}>
            <span>${a(H(`editor.${o}`))}</span></label>`}).join("");this.shadowRoot.innerHTML=`
        <style>${c8}</style>
        <div class="form">
          <label>${a(H("editor.device"))}
            <select data-key="device">${t}</select>
          </label>
          <label>${a(H("editor.name"))}
            <input type="text" data-key="name" value="${a(this._config.name||"")}">
          </label>
          <label>${a(H("editor.language"))}
            <select data-key="language">${r}</select>
          </label>
          <div class="title">${a(H("editor.sections"))}</div>
          <div class="toggles">${i}</div>
        </div>`,this.shadowRoot.querySelectorAll("[data-key]").forEach(o=>o.addEventListener("change",M=>this._onChange(M)))}_onChange(H){let V=H.target,e=V.dataset.key,t={...this._config,type:this._config.type||`custom:${L.cardName}`};V.type==="checkbox"?t[e]=V.checked:V.value===""?delete t[e]:t[e]=V.value,e==="device"&&delete t.entity,this._config=t,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0}))}}}var u8=R({cardName:q,toggles:["show_programs","show_options","show_delay","show_scores","show_consumption","show_appliance_settings","show_details","show_controls","compact","animate"],defaults:L5,listDevices:r2,getLanguage:H2,translator:V2,languages:j2});function D7(){customElements.get(R1)||customElements.define(R1,u8)}D7();N7();var Y="philips-airfryer-card",P1="philips-airfryer-card-editor",I7="1.21.0",u={STANDBY:"STANDBY",POWERSAVE:"POWERSAVE",MAINMENU:"MAINMENU",IDLE:"IDLE",SETTING:"SETTING",PARASETTING:"PARASETTING",PRECOOK:"PRECOOK",COOKING:"COOKING",PAUSE:"PAUSE",USER_ACTION:"USER_ACTION",MAINTAIN:"MAINTAIN",FINISH:"FINISH",PAIRING:"PAIRING",UNKNOWN:"UNKNOWN"},z7={[u.STANDBY]:"idle",[u.POWERSAVE]:"idle",[u.MAINMENU]:"idle",[u.IDLE]:"ready",[u.SETTING]:"ready",[u.PARASETTING]:"ready",[u.PRECOOK]:"preheat",[u.COOKING]:"cooking",[u.PAUSE]:"paused",[u.USER_ACTION]:"paused",[u.MAINTAIN]:"warm",[u.FINISH]:"done",[u.PAIRING]:"idle",[u.UNKNOWN]:"idle"},p1=[u.PRECOOK,u.COOKING,u.MAINTAIN],h1=[...p1,u.PAUSE,u.USER_ACTION],i2=[u.IDLE,u.SETTING,u.PARASETTING,u.MAINMENU,u.STANDBY],W7={[u.STANDBY]:["power_on"],[u.POWERSAVE]:["power_on"],[u.MAINMENU]:["start","power_off"],[u.IDLE]:["start","power_off"],[u.SETTING]:["start","power_off"],[u.PARASETTING]:["start","power_off"],[u.PRECOOK]:["pause","stop"],[u.COOKING]:["pause","stop"],[u.PAUSE]:["start","stop"],[u.USER_ACTION]:["start","stop"],[u.MAINTAIN]:["stop"],[u.FINISH]:["keep_warm","stop"],[u.PAIRING]:[],[u.UNKNOWN]:[]},a2={power_on:{icon:"power",style:"primary",entity:"power",service:["switch","turn_on"]},power_off:{icon:"power",style:"ghost",entity:"power",service:["switch","turn_off"]},start:{icon:"play",style:"primary",entity:"btn_start",service:["button","press"]},pause:{icon:"pause",style:"primary",entity:"btn_pause",service:["button","press"]},stop:{icon:"stop",style:"ghost",entity:"btn_stop",service:["button","press"]},keep_warm:{icon:"warm",style:"ghost",entity:"btn_keep_warm",service:["button","press"]}},B1={MANUAL:{icon:"manual"},AUTO_COOK:{icon:"auto"},KEEP_WARM:{icon:"warm"},RECIPE:{icon:"recipe"},NO_SELECTION:{icon:"dots"},AIR_STEAM:{icon:"steam"},AIR_STEAM_PRO:{icon:"steam"},STEAMING:{icon:"steam"},ROAST:{icon:"roast"},BAKE:{icon:"bake"},GRILL:{icon:"roast"},SLOW_COOK:{icon:"slow"},STEW:{icon:"slow"},DEFROST:{icon:"defrost"},REHEAT:{icon:"reheat"},SOUS_VIDE:{icon:"probe"},EASY_CLEAN:{icon:"clean"},USER_PRESET:{icon:"star"},FROZEN_SNACKS:{icon:"snack"},FRESH_FRIES:{icon:"fries"},CHICKEN:{icon:"chicken"},FISH:{icon:"fish"},MUFFINS_CAKE:{icon:"bake"},MEAT_CHOPS:{icon:"meat"},VEGETABLES:{icon:"vegetable"}},G7=["AIR_STEAM","AIR_STEAM_PRO","STEAMING","STEW","SLOW_COOK"],$1={temperature:{min:40,max:200,step:5},time:{min:1,max:60,step:1},probe:{min:40,max:100,step:1},airspeed:{min:1,max:2,step:1}},U7=[{food:"poultry",doneness:"done",range:"80\u201385 \xB0C"},{food:"poultry_breast",doneness:"juicy",range:"70\u201374 \xB0C"},{food:"beef",doneness:"rare",range:"45\u201350 \xB0C"},{food:"beef",doneness:"medium",range:"55\u201360 \xB0C"},{food:"beef",doneness:"well_done",range:"65\u201370 \xB0C"},{food:"pork",doneness:"done",range:"70\u201373 \xB0C"},{food:"pork_chop",doneness:"medium",range:"58\u201363 \xB0C"},{food:"fish",doneness:"translucent",range:"50\u201355 \xB0C"},{food:"potato",doneness:"well_done",range:"92\u201395 \xB0C"}],K7=[160,180,200],j7=[5,10,15,20,30];var v8={card_name:"Airfryer",status:{STANDBY:"K\xE9szenl\xE9t",POWERSAVE:"Energiatakar\xE9kos",MAINMENU:"F\u0151men\xFC",IDLE:"K\xE9sz az ind\xEDt\xE1sra",SETTING:"Be\xE1ll\xEDt\xE1s",PARASETTING:"Be\xE1ll\xEDt\xE1s",PRECOOK:"El\u0151meleg\xEDt\xE9s",COOKING:"S\xFCt\xE9s",PAUSE:"Sz\xFCneteltetve",USER_ACTION:"Beavatkoz\xE1s sz\xFCks\xE9ges",MAINTAIN:"Melegen tart\xE1s",FINISH:"Elk\xE9sz\xFClt",PAIRING:"P\xE1ros\xEDt\xE1s",UNKNOWN:"Ismeretlen"},method:{MANUAL:"Manu\xE1lis",AUTO_COOK:"Auto-Cook",KEEP_WARM:"Melegen tart\xE1s",RECIPE:"Recept",NO_SELECTION:"Nincs kiv\xE1lasztva",AIR_STEAM:"Air Steam",AIR_STEAM_PRO:"Air Steam Pro",STEAMING:"P\xE1rol\xE1s",ROAST:"S\xFCt\xE9s (roast)",BAKE:"S\xFCtem\xE9ny",GRILL:"Grill",SLOW_COOK:"Lass\xFA f\u0151z\xE9s",STEW:"P\xE1rolt \xE9tel",DEFROST:"Kiolvaszt\xE1s",REHEAT:"\xDAjrameleg\xEDt\xE9s",SOUS_VIDE:"Sous-vide",EASY_CLEAN:"Tiszt\xEDt\xE1s",USER_PRESET:"Saj\xE1t program",FROZEN_SNACKS:"Fagyasztott snack",FRESH_FRIES:"Friss has\xE1b",CHICKEN:"Csirke",FISH:"Hal",MUFFINS_CAKE:"Muffin / s\xFCtem\xE9ny",MEAT_CHOPS:"H\xFAsszeletek",VEGETABLES:"Z\xF6lds\xE9g"},method_hint:{MANUAL:"Id\u0151, h\u0151m\xE9rs\xE9klet \xE9s leveg\u0151sebess\xE9g k\xE9zzel: 40\u2013200 \xB0C, 1\u2013180 perc.",AUTO_COOK:"A g\xE9p a t\xF6lt\xE9si szint \xE9s a k\xEDv\xE1nt elk\xE9sz\xFClts\xE9g alapj\xE1n sz\xE1mol mindent.",KEEP_WARM:"A k\xE9sz \xE9tel melegen tart\xE1sa.",RECIPE:"A NutriU alkalmaz\xE1sb\xF3l k\xFCld\xF6tt recept l\xE9p\xE9sei."},command:{power_on:"Bekapcsol\xE1s",power_off:"Kikapcsol\xE1s",start:"Ind\xEDt\xE1s",pause:"Sz\xFCnet",stop:"Le\xE1ll\xEDt\xE1s",keep_warm:"Melegen tart\xE1s"},alert:{drawer_open:"A fi\xF3k nyitva \u2013 a s\xFCt\xE9s sz\xFCnetel",drawer_open_idle:"A fi\xF3k nyitva van",shake:"R\xE1zd meg az \xE9telt!",flip:"Ford\xEDtsd meg az \xE9telt!",probe_required:"Ehhez a programhoz be kell dugni az \xE9telh\u0151m\xE9r\u0151t",probe_unplugged:"Az \xE9telh\u0151m\xE9r\u0151 nincs csatlakoztatva",resting:"Pihentet\xE9s \u2013 hagyd m\xE9g a k\xE9sz\xFCl\xE9kben",error:"Hibak\xF3d",user_action:"A k\xE9sz\xFCl\xE9k beavatkoz\xE1sra v\xE1r"},ui:{remaining:"H\xE1tral\xE9v\u0151 id\u0151",ready_at:"K\xE9sz",temperature:"H\u0151m\xE9rs\xE9klet",current_temp:"Aktu\xE1lis",target_temp:"C\xE9l",probe:"\xC9telh\u0151m\xE9r\u0151",probe_core:"Magh\u0151m\xE9rs\xE9klet",method:"\xC9telk\xE9sz\xEDt\xE9si m\xF3d",presets:"Saj\xE1t programok",autocook:"Auto-Cook program",recipe:"Recept",settings:"Be\xE1ll\xEDt\xE1sok",cook_time:"S\xFCt\xE9si id\u0151",airspeed:"Leveg\u0151sebess\xE9g",airspeed_low:"Alacsony",airspeed_high:"Magas",preheat:"El\u0151meleg\xEDt\xE9s",keep_warm:"Melegen tart\xE1s",details:"R\xE9szletek",drawer:"Fi\xF3k",drawer_open:"Nyitva",drawer_closed:"Z\xE1rva",total_time:"Teljes id\u0151",stage:"F\xE1zis",voltage:"Fesz\xFClts\xE9g",error_code:"Hibak\xF3d",on:"Be",off:"Ki",none:"Nincs",minute_short:"p",hour_short:"\xF3",finished:"Az \xE9tel elk\xE9sz\xFClt",finished_hint:"Kivehet\u0151",unavailable:"A k\xE9sz\xFCl\xE9k entit\xE1sai nem \xE9rhet\u0151k el",not_configured:"Nem tal\xE1lhat\xF3 Philips airfryer. Add meg a device vagy a prefix be\xE1ll\xEDt\xE1st a k\xE1rtya konfigur\xE1ci\xF3j\xE1ban.",core_temp_help:"Aj\xE1nlott magh\u0151m\xE9rs\xE9kletek",food:{poultry:"Baromfi",poultry_breast:"Baromfimell",beef:"Marha, borj\xFA, b\xE1r\xE1ny",pork:"Sert\xE9s",pork_chop:"Sert\xE9skaraj",fish:"Hal",potato:"Eg\xE9sz burgonya"},doneness:{done:"k\xE9sz",juicy:"szaftos",rare:"v\xE9res",medium:"k\xF6zepes",well_done:"j\xF3l \xE1ts\xFCtve",translucent:"\xE1ttetsz\u0151"}},editor:{device:"K\xE9sz\xFCl\xE9k",device_auto:"Automatikus felismer\xE9s",name:"N\xE9v",language:"Nyelv",language_auto:"Automatikus (HA nyelve)",sections:"Megjelen\xEDtett r\xE9szek",show_methods:"\xC9telk\xE9sz\xEDt\xE9si m\xF3dok",show_presets:"Saj\xE1t programok",show_settings:"H\u0151m\xE9rs\xE9klet \xE9s id\u0151 \xE1ll\xEDt\xE1sa",show_probe:"\xC9telh\u0151m\xE9r\u0151",show_details:"R\xE9szletek",show_controls:"Vez\xE9rl\u0151gombok",compact:"Kompakt n\xE9zet",animate:"Anim\xE1ci\xF3k"}},x8={card_name:"Airfryer",status:{STANDBY:"Standby",POWERSAVE:"Power save",MAINMENU:"Main menu",IDLE:"Ready to start",SETTING:"Setting up",PARASETTING:"Setting up",PRECOOK:"Preheating",COOKING:"Cooking",PAUSE:"Paused",USER_ACTION:"Action needed",MAINTAIN:"Keeping warm",FINISH:"Finished",PAIRING:"Pairing",UNKNOWN:"Unknown"},method:{MANUAL:"Manual",AUTO_COOK:"Auto-Cook",KEEP_WARM:"Keep warm",RECIPE:"Recipe",NO_SELECTION:"No selection",AIR_STEAM:"Air Steam",AIR_STEAM_PRO:"Air Steam Pro",STEAMING:"Steaming",ROAST:"Roast",BAKE:"Bake",GRILL:"Grill",SLOW_COOK:"Slow cook",STEW:"Stew",DEFROST:"Defrost",REHEAT:"Reheat",SOUS_VIDE:"Sous-vide",EASY_CLEAN:"Easy clean",USER_PRESET:"My preset",FROZEN_SNACKS:"Frozen snacks",FRESH_FRIES:"Fresh fries",CHICKEN:"Chicken",FISH:"Fish",MUFFINS_CAKE:"Muffins / cake",MEAT_CHOPS:"Meat chops",VEGETABLES:"Vegetables"},method_hint:{MANUAL:"Set time, temperature and air speed yourself: 40\u2013200 \xB0C, 1\u2013180 min.",AUTO_COOK:"The appliance works out every parameter from load and doneness.",KEEP_WARM:"Keeps finished food warm.",RECIPE:"Steps of a recipe sent from the NutriU app."},command:{power_on:"Turn on",power_off:"Turn off",start:"Start",pause:"Pause",stop:"Stop",keep_warm:"Keep warm"},alert:{drawer_open:"Drawer is open \u2013 cooking is paused",drawer_open_idle:"The drawer is open",shake:"Shake the food!",flip:"Flip the food!",probe_required:"This program needs the food probe plugged in",probe_unplugged:"The food probe is unplugged",resting:"Resting \u2013 leave the food inside",error:"Error code",user_action:"The appliance is waiting for you"},ui:{remaining:"Remaining",ready_at:"Ready at",temperature:"Temperature",current_temp:"Current",target_temp:"Target",probe:"Food probe",probe_core:"Core temperature",method:"Cooking method",presets:"My presets",autocook:"Auto-Cook program",recipe:"Recipe",settings:"Settings",cook_time:"Cook time",airspeed:"Air speed",airspeed_low:"Low",airspeed_high:"High",preheat:"Preheat",keep_warm:"Keep warm",details:"Details",drawer:"Drawer",drawer_open:"Open",drawer_closed:"Closed",total_time:"Total time",stage:"Stage",voltage:"Voltage",error_code:"Error code",on:"On",off:"Off",none:"None",minute_short:"m",hour_short:"h",finished:"The food is ready",finished_hint:"Ready to serve",unavailable:"The appliance entities are unavailable",not_configured:"No Philips airfryer found. Set the device or prefix option in the card configuration.",core_temp_help:"Recommended core temperatures",food:{poultry:"Poultry",poultry_breast:"Poultry breast",beef:"Beef, veal, lamb",pork:"Pork",pork_chop:"Pork chop",fish:"Fish",potato:"Whole potato"},doneness:{done:"done",juicy:"juicy",rare:"rare",medium:"medium",well_done:"well done",translucent:"translucent"}},editor:{device:"Device",device_auto:"Auto detect",name:"Name",language:"Language",language_auto:"Automatic (HA language)",sections:"Visible sections",show_methods:"Cooking methods",show_presets:"My presets",show_settings:"Temperature and time controls",show_probe:"Food probe",show_details:"Details",show_controls:"Control buttons",compact:"Compact layout",animate:"Animations"}},Q7={hu:v8,en:x8},t5=Object.keys(Q7);function o2(L,C){return k(L,C,t5)}function M2(L){return T(Q7,L)}var q7={domain:"sensor",suffix:"cooking_status",key:"status"},h8={status:["sensor","cooking_status"],target_temp:["sensor","target_temperature"],current_temp:["sensor","current_temperature"],total_time:["sensor","total_cook_time"],remaining:["sensor","time_remaining"],preset:["sensor","preset"],recipe:["sensor","recipe"],error:["sensor","error_code"],preheat_status:["sensor","preheat_status"],keep_warm_status:["sensor","keep_warm"],airspeed:["sensor","air_speed"],probe_target:["sensor","probe_temperature"],probe_current:["sensor","current_probe_temperature"],dialog:["sensor","dialog"],stage:["sensor","current_stage"],voltage:["sensor","voltage"],drawer:["binary_sensor","drawer"],shake:["binary_sensor","shake_reminder"],flip:["binary_sensor","flip_reminder"],preheat_active:["binary_sensor","preheat_active"],probe_unplugged:["binary_sensor","probe_unplugged"],probe_required:["binary_sensor","probe_required"],resting:["binary_sensor","resting"],btn_start:["button","start_cooking"],btn_pause:["button","pause"],btn_stop:["button","stop"],btn_keep_warm:["button","keep_warm"],num_temp:["number","set_temperature"],num_time:["number","set_cook_time"],num_airspeed:["number","set_air_speed"],num_probe:["number","set_probe_temperature"],num_keep_warm_time:["number","keep_warm_duration"],num_keep_warm_temp:["number","keep_warm_temperature"],sel_method:["select","cooking_method"],sel_preset:["select","my_presets"],sel_autocook:["select","autocook_program"],power:["switch","power"],sw_preheat:["switch","preheat"]};function f8(L,C){return e2(L,C,q7)}function Y7(L,C){let H=f8(L,C),V=L2(L,C,h8,H);return V.prefix=H,V}function n2(L){return t2(L,q7)}function K(L){if(x(L))return null;let C=Number(L.state);return Number.isFinite(C)?C:null}function X7(L){let C=K(L);if(C===null||C<0)return null;let H=(L.attributes?.unit_of_measurement||"s").toLowerCase();return Math.round(H==="min"||H==="m"?C*60:H==="h"?C*3600:C)}function s2(L,C){if(!L)return null;let H=L.attributes||{};return{value:K(L),min:Number.isFinite(H.min)?H.min:C.min,max:Number.isFinite(H.max)?H.max:C.max,step:Number.isFinite(H.step)?H.step:C.step,unit:H.unit_of_measurement||""}}function J7(L){let C=L?.attributes?.options;return Array.isArray(C)?C:[]}function U(L){return L?.state==="on"}function Z8(L){if(x(L))return null;let C=String(L.state).trim();return!C||C==="0"||/^(none|no|off|ok)$/i.test(C)?null:C}function C4(L,C){let H=Y7(L,C),V=z=>H[z]?L.states[H[z]]:void 0,e=V("status");if(!H.prefix||!e)return{ok:!1,reason:H.prefix?"unavailable":"not_configured",entities:H};let t=y(e.state),r=t in u?t:u.UNKNOWN,i=V("sel_method"),o=y(i?.state),M=B1[o]?o:null,n=X7(V("remaining")),l=X7(V("total_time")),d=p1.includes(r),v=h1.includes(r)&&n!==null&&l?Math.min(1,Math.max(0,1-n/l)):r===u.FINISH?1:0,f=K(V("current_temp")),m=K(V("target_temp")),Z=V("current_temp")?.attributes?.unit_of_measurement||"\xB0C",c=V("probe_unplugged")?!U(V("probe_unplugged")):!1,S=K(V("probe_current")),_=K(V("probe_target")),b=V("drawer"),h=b?U(b):null,O=d&&n!==null&&n>0?new Date(Date.now()+n*1e3):null,D=V("recipe")?.state,G=V("keep_warm_status")?.state,v1=V("preheat_status")?.state;return{ok:!0,entities:H,status:r,accent:z7[r]||"idle",power:V("power")?U(V("power")):r!==u.STANDBY,method:M,methodRaw:i?.state||null,methodOptions:J7(i).map(z=>({label:z,key:y(z)})),presetOptions:J7(V("sel_preset")),presetSelected:V("sel_preset")?.state||null,autocookSelected:V("sel_autocook")?.state||null,steam:G7.includes(M),remaining:n,total:l,progress:v,finishAt:O,currentTemp:f,targetTemp:m,tempUnit:Z,heating:d&&f!==null&&m?f<m-2:!1,probe:{plugged:c,required:U(V("probe_required")),current:S,target:_,progress:c&&S!==null&&_?Math.min(1,Math.max(0,S/_)):0},drawerOpen:h,shake:U(V("shake")),flip:U(V("flip")),resting:U(V("resting")),preheatActive:U(V("preheat_active")),preheatStatus:v1&&!x(V("preheat_status"))?v1:null,preheatEnabled:V("sw_preheat")?U(V("sw_preheat")):null,keepWarm:G&&!x(V("keep_warm_status"))?G:null,recipe:D&&!x(V("recipe"))&&D!=="unknown"?D:null,stage:K(V("stage")),voltage:K(V("voltage")),error:Z8(V("error")),controls:{temperature:s2(V("num_temp"),$1.temperature),time:s2(V("num_time"),$1.time),airspeed:s2(V("num_airspeed"),$1.airspeed),probe:s2(V("num_probe"),$1.probe)},airspeed:K(V("airspeed")),name:C.name||e.attributes?.friendly_name?.replace(/\s*Cooking Status$/i,"")||null}}function H4(){return`
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
  </svg>`}function V4(L,C,H){let V=L.querySelector(".display-main"),e=L.querySelector(".display-sub");V&&V.textContent!==C&&(V.textContent=C),e&&e.textContent!==H&&(e.textContent=H)}var g8=`
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
`,e4=E+g8;var i5={language:"auto",compact:!1,animate:!0,show_methods:!0,show_presets:!0,show_settings:!0,show_probe:!0,show_details:!0,show_controls:!0};function L4(L,C){if(L==null)return null;let H=Math.max(0,Math.round(L));if(H>=3600){let t=Math.floor(H/3600),r=Math.round(H%3600/60);return{value:`${t}:${String(r).padStart(2,"0")}`,unit:C("ui.hour_short")}}let V=Math.floor(H/60),e=H%60;return{value:`${V}:${String(e).padStart(2,"0")}`,unit:C("ui.minute_short")}}var r5=class extends HTMLElement{static getConfigElement(){return document.createElement(P1)}static getStubConfig(C){let H=n2(C);return{type:`custom:${Y}`,device:H[0]?.id}}constructor(){super(),this.attachShadow({mode:"open"}),this._sections={},this._signatures={},this._built=!1}setConfig(C){this._config={...i5,...C||{}},this._signatures={},this._hass&&this._render()}set hass(C){this._hass=C,this._render()}get hass(){return this._hass}connectedCallback(){this._timer=window.setInterval(()=>this._render(),3e4)}disconnectedCallback(){this._timer&&window.clearInterval(this._timer),this._timer=void 0}getCardSize(){return this._config?.compact?5:8}getGridOptions(){return{columns:12,min_columns:6,rows:this._config?.compact?6:"auto"}}_build(){let C=document.createElement("style");C.textContent=e4;let H=document.createElement("ha-card"),V=document.createElement("div");V.className="wrap",V.addEventListener("click",e=>this._onClick(e));for(let e of["header","hero","alerts","gauges","methods","presets","settings","controls","details"]){let t=document.createElement("div");t.dataset.section=e,this._sections[e]=t,V.appendChild(t)}H.appendChild(V),this.shadowRoot.replaceChildren(C,H),this._wrap=V,this._built=!0}_render(){if(!this._hass||!this._config)return;this._built||this._build();let C=M2(o2(this._config,this._hass)),H=C4(this._hass,this._config);if(this._model=H,!H.ok){this._renderEmpty(H,C);return}this._emptyShown=!1,this._applyHostClasses(H),this._section("header",this._headerHtml(H,C)),this._heroSection(H,C),this._section("alerts",this._alertsHtml(H,C)),this._section("gauges",this._gaugesHtml(H,C)),this._section("methods",this._config.show_methods?this._methodsHtml(H,C):""),this._section("presets",this._config.show_presets?this._presetsHtml(H,C):""),this._section("settings",this._config.show_settings?this._settingsHtml(H,C):""),this._section("controls",this._config.show_controls?this._controlsHtml(H,C):""),this._section("details",this._config.show_details?this._detailsHtml(H,C):"")}_renderEmpty(C,H){if(this._emptyShown!==C.reason){this._emptyShown=C.reason,this._signatures={};for(let V of Object.values(this._sections))V.innerHTML="";this._sections.header.innerHTML=`
      <div class="empty">
        ${s("fryer")}
        <div>${a(H(`ui.${C.reason}`))}</div>
      </div>`}}_section(C,H){this._signatures[C]!==H&&(this._signatures[C]=H,this._sections[C].innerHTML=H,this._sections[C].hidden=!H)}_applyHostClasses(C){let H=["wrap"];this._config.compact&&H.push("compact"),this._config.animate||H.push("no-animation"),H.push(`accent-${C.accent}`),C.status===u.COOKING&&H.push("cooking","busy"),C.status===u.PRECOOK&&H.push("preheat","busy","heating"),C.status===u.MAINTAIN&&H.push("cooking"),(C.status===u.PAUSE||C.status===u.USER_ACTION)&&H.push("paused"),C.status===u.FINISH&&H.push("done"),[u.STANDBY,u.POWERSAVE].includes(C.status)&&H.push("off"),C.heating&&p1.includes(C.status)&&H.push("heating"),C.steam&&p1.includes(C.status)&&H.push("steam-mode"),C.drawerOpen&&H.push("drawer-open"),C.probe.plugged&&H.push("probe-plugged"),(C.shake||C.flip)&&H.push("shake-now");let V=H.join(" ");this._wrap.className!==V&&(this._wrap.className=V)}_headerHtml(C,H){let V=a(C.name||H("card_name")),e=C.recipe||(C.method?H(`method.${C.method}`):""),t=[];return C.drawerOpen&&t.push(`<span class="warn" title="${H("ui.drawer")}: ${H("ui.drawer_open")}">${s("drawer")}</span>`),C.probe.plugged&&t.push(`<span title="${H("ui.probe")}">${s("probe")}</span>`),C.error&&t.push(`<span class="bad" title="${H("alert.error")} ${C.error}">${s("error")}</span>`),`
      <div class="header">
        <div>
          <div class="title" data-action="more-info">${V}</div>
          ${e?`<div class="sub">${a(e)}</div>`:""}
        </div>
        <div class="spacer"></div>
        <div class="badges">${t.join("")}</div>
        <div class="pill">${s(this._statusIcon(C))}${a(H(`status.${C.status}`))}</div>
      </div>`}_statusIcon(C){switch(C.status){case u.COOKING:return"heat";case u.PRECOOK:return"temperature";case u.PAUSE:return"pause";case u.USER_ACTION:return"alert";case u.MAINTAIN:return"warm";case u.FINISH:return"check";case u.IDLE:case u.SETTING:case u.PARASETTING:return"play";default:return"power"}}_heroSection(C,H){this._sections.hero.querySelector(".fryer")||(this._sections.hero.innerHTML=`
        <div class="hero">
          <div class="fryer-wrap" data-action="more-info">${H4()}</div>
          <div class="status"></div>
        </div>`,this._statusNode=this._sections.hero.querySelector(".status"));let V=this._statusHtml(C,H);this._signatures.status!==V&&(this._signatures.status=V,this._statusNode.innerHTML=V);let e=L4(C.remaining,H),t=h1.includes(C.status)&&e&&C.remaining>0;V4(this._sections.hero,C.status===u.STANDBY||C.status===u.POWERSAVE?"":t?e.value:"--:--",C.currentTemp!==null&&C.status!==u.STANDBY?`${Math.round(C.currentTemp)}\xB0`:"")}_statusHtml(C,H){let V=[],e=C.status===u.PRECOOK&&C.targetTemp?`<span class="phase-text">${Math.round(C.targetTemp)} ${a(C.tempUnit)}</span>`:C.resting?`<span class="phase-text">${a(H("alert.resting"))}</span>`:"";V.push(`
      <div class="status-line">
        <span class="state-text">${a(H(`status.${C.status}`))}</span>
        ${e}
      </div>`),(C.method||C.recipe)&&V.push(`
        <div class="program-line">
          ${s(B1[C.method]?.icon||"manual")}
          <span>${a(C.recipe||H(`method.${C.method}`))}</span>
        </div>`);let t=L4(C.remaining,H);if(h1.includes(C.status)&&t&&C.remaining>0){let r=C.finishAt?`<span class="at">${s("clock")}${a(H("ui.ready_at"))} ${F(C.finishAt,this._hass)}</span>`:"";V.push(`
        <div class="countdown">
          <span class="value">${t.value}</span><span class="unit">${t.unit}</span>${r}
        </div>`)}else C.status===u.FINISH?V.push(`
        <div class="countdown">
          <span class="at">${s("check")}${a(H("ui.finished_hint"))}</span>
        </div>`):C.controls.temperature?.value&&C.controls.time?.value&&V.push(`
        <div class="countdown">
          <span class="value">${Math.round(C.controls.temperature.value)}\xB0</span>
          <span class="unit">${a(C.tempUnit.replace("\xB0",""))}</span>
          <span class="at">${s("timer")}${Math.round(C.controls.time.value)} ${a(H("ui.minute_short"))}</span>
        </div>`);return(h1.includes(C.status)||C.status===u.FINISH)&&V.push(`<div class="bar"><i style="width:${Math.round(C.progress*100)}%"></i></div>`),V.join("")}_alertsHtml(C,H){let V=[];if(C.error&&V.push({severity:"error",text:`${H("alert.error")}: ${C.error}`,iconName:"error"}),C.drawerOpen){let e=p1.includes(C.status);V.push({severity:e?"warning":"info",text:H(e?"alert.drawer_open":"alert.drawer_open_idle"),iconName:"drawer",pulse:e})}return C.shake&&V.push({severity:"warning",text:H("alert.shake"),iconName:"shake",pulse:!0}),C.flip&&V.push({severity:"warning",text:H("alert.flip"),iconName:"flip",pulse:!0}),C.status===u.USER_ACTION&&!C.shake&&!C.flip&&V.push({severity:"warning",text:H("alert.user_action"),iconName:"alert",pulse:!0}),C.probe.required&&!C.probe.plugged&&V.push({severity:"warning",text:H("alert.probe_required"),iconName:"probe"}),C.resting&&V.push({severity:"info",text:H("alert.resting"),iconName:"timer"}),V.length?`<div class="alerts">${V.map(e=>`<div class="alert ${e.severity}${e.pulse?" pulse":""}">${s(e.iconName)}<span>${a(e.text)}</span></div>`).join("")}</div>`:""}_gaugesHtml(C,H){let V=[],e=a(C.tempUnit);if(C.currentTemp!==null||C.targetTemp!==null){let t=C.currentTemp!==null&&C.targetTemp?Math.min(1,Math.max(0,C.currentTemp/C.targetTemp)):0,r=C.targetTemp!==null&&C.targetTemp>0?`<b>${Math.round(C.currentTemp??0)}</b> / ${Math.round(C.targetTemp)} ${e}`:`<b>${Math.round(C.currentTemp??0)}</b> ${e}`;V.push(`
        <div class="gauge heat">
          <div class="top">${s("temperature")}<span>${a(H("ui.temperature"))}</span>
            <span class="val">${r}</span></div>
          <div class="track"><i style="width:${Math.round(t*100)}%"></i></div>
        </div>`)}if(this._config.show_probe&&C.probe.plugged){let t=C.probe.target?`<b>${Math.round(C.probe.current??0)}</b> / ${Math.round(C.probe.target)} ${e}`:`<b>${Math.round(C.probe.current??0)}</b> ${e}`;V.push(`
        <div class="gauge probe">
          <div class="top">${s("probe")}<span>${a(H("ui.probe_core"))}</span>
            <span class="val">${t}</span></div>
          <div class="track"><i style="width:${Math.round(C.probe.progress*100)}%"></i></div>
        </div>`)}return V.length?`<div class="gauges">${V.join("")}</div>`:""}_methodsHtml(C,H){if(!C.entities.sel_method||!C.methodOptions.length)return"";let V=i2.includes(C.status),e=C.methodOptions.map(r=>{let i=B1[r.key],o=i?H(`method.${r.key}`):r.label,M=H(`method_hint.${r.key}`,"");return`<button class="chip" type="button" data-action="method" data-value="${a(r.label)}"
        aria-pressed="${r.key===C.method}" ${M?`title="${a(M)}"`:""}
        ${V?"":"disabled"}>
        ${s(i?.icon||"manual")}<span>${a(o)}</span></button>`}),t=C.method?a(H(`method_hint.${C.method}`,"")):"";return`
      <div class="section">
        <div class="section-title">${a(H("ui.method"))}</div>
        <div class="chips">${e.join("")}</div>
        ${t?`<div class="note">${t}</div>`:""}
      </div>`}_presetsHtml(C,H){if(!C.entities.sel_preset||!C.presetOptions.length)return"";let V=i2.includes(C.status),e=C.presetOptions.map(t=>`<button class="chip" type="button" data-action="preset" data-value="${a(t)}"
        aria-pressed="${t===C.presetSelected}" ${V?"":"disabled"}>
        ${s("star")}<span>${a(t)}</span></button>`);return`
      <div class="section">
        <div class="section-title">${a(H("ui.presets"))}</div>
        <div class="chips">${e.join("")}</div>
      </div>`}_settingsHtml(C,H){let V=i2.includes(C.status)||C.status===u.PAUSE,e=[],t=(o,M,n,l,d)=>{if(!n||!C.entities[d])return"";let p=n.value??n.min,v=V&&p>n.min,f=V&&p<n.max;return`
        <div class="stepper">
          <span class="label">${a(M)}</span>
          <div class="row">
            <button class="step-btn" type="button" data-action="step" data-value="${o}" data-dir="-1"
              ${v?"":"disabled"} aria-label="\u2212">\u2212</button>
            <span class="value">${Math.round(p)}${a(l)}</span>
            <button class="step-btn" type="button" data-action="step" data-value="${o}" data-dir="1"
              ${f?"":"disabled"} aria-label="+">+</button>
          </div>
        </div>`},r=[t("temperature",H("ui.temperature"),C.controls.temperature,` ${C.tempUnit}`,"num_temp"),t("time",H("ui.cook_time"),C.controls.time,` ${H("ui.minute_short")}`,"num_time"),C.probe.plugged?t("probe",H("ui.probe_core"),C.controls.probe,` ${C.tempUnit}`,"num_probe"):""].filter(Boolean);r.length&&e.push(`<div class="steppers">${r.join("")}</div>`);let i=[];if(C.entities.num_temp&&i.push(...K7.map(o=>`<button class="chip" type="button" data-action="set" data-value="temperature:${o}"
            aria-pressed="${Math.round(C.controls.temperature?.value??-1)===o}" ${V?"":"disabled"}>
            ${s("temperature")}<span>${o}\xB0</span></button>`)),C.entities.num_time&&i.push(...j7.filter(o=>o<=(C.controls.time?.max??60)).map(o=>`<button class="chip" type="button" data-action="set" data-value="time:${o}"
            aria-pressed="${Math.round(C.controls.time?.value??-1)===o}" ${V?"":"disabled"}>
            ${s("timer")}<span>${o} ${a(H("ui.minute_short"))}</span></button>`)),C.entities.num_airspeed){let o=C.controls.airspeed?.value;i.push(`<button class="chip" type="button" data-action="set" data-value="airspeed:1"
          aria-pressed="${o===1}" ${V?"":"disabled"}>
          ${s("fan")}<span>${a(H("ui.airspeed_low"))}</span></button>`,`<button class="chip" type="button" data-action="set" data-value="airspeed:2"
          aria-pressed="${o===2}" ${V?"":"disabled"}>
          ${s("fan")}<span>${a(H("ui.airspeed_high"))}</span></button>`)}if(i.length&&e.push(`<div class="chips">${i.join("")}</div>`),this._config.show_probe&&C.probe.plugged){let o=U7.map(M=>`<div class="row"><span>${a(H(`ui.food.${M.food}`))} \u2013 ${a(H(`ui.doneness.${M.doneness}`))}</span><b>${M.range}</b></div>`).join("");e.push(`
        <details class="core-temps">
          <summary>${a(H("ui.core_temp_help"))}</summary>
          ${o}
        </details>`)}return e.length?`
      <div class="section">
        <div class="section-title">${a(H("ui.settings"))}</div>
        ${e.join("")}
      </div>`:""}_controlsHtml(C,H){let e=(W7[C.status]||[]).filter(r=>C.entities[a2[r].entity]).map(r=>{let i=a2[r],o=C.drawerOpen&&["start"].includes(r);return`<button class="btn ${i.style}" type="button" data-action="command" data-value="${r}"
          ${o?"disabled":""}>
          ${s(i.icon)}<span>${a(H(`command.${r}`))}</span></button>`});if(!e.length)return"";let t=C.drawerOpen?`<div class="note">${s("drawer")}${a(H("alert.drawer_open_idle"))}</div>`:"";return`<div class="section"><div class="controls">${e.join("")}</div>${t}</div>`}_detailsHtml(C,H){let V=[],e=(t,r,i)=>{r==null||r===""||V.push(`
        <div class="detail">
          <span class="k">${a(H(`ui.${t}`))}</span>
          <span class="v">${s(i)}${a(String(r))}</span>
        </div>`)};return C.drawerOpen!==null&&e("drawer",C.drawerOpen?H("ui.drawer_open"):H("ui.drawer_closed"),"drawer"),C.airspeed!==null&&e("airspeed",C.airspeed>=2?H("ui.airspeed_high"):H("ui.airspeed_low"),"fan"),C.total&&e("total_time",`${Math.round(C.total/60)} ${H("ui.minute_short")}`,"timer"),C.preheatEnabled!==null?e("preheat",C.preheatEnabled?H("ui.on"):H("ui.off"),"temperature"):C.preheatStatus&&e("preheat",this._onOff(C.preheatStatus,H),"temperature"),C.keepWarm&&e("keep_warm",this._onOff(C.keepWarm,H),"warm"),C.stage&&e("stage",C.stage,"info"),C.voltage!==null&&e("voltage",`${C.voltage} V`,"info"),C.error&&e("error_code",C.error,"error"),V.length?`
      <div class="section">
        <div class="section-title">${a(H("ui.details"))}</div>
        <div class="details">${V.join("")}</div>
      </div>`:""}_onOff(C,H){let V=String(C).toLowerCase();return["on","true","yes","1"].includes(V)?H("ui.on"):["off","false","no","0"].includes(V)?H("ui.off"):C}_onClick(C){let H=C.target.closest("[data-action]");if(!H||H.hasAttribute("disabled"))return;let{action:V,value:e,dir:t}=H.dataset,r=this._model;if(!(!r?.ok&&V!=="more-info"))switch(V){case"more-info":this._moreInfo(r?.entities?.status);break;case"method":this._haptic("light"),this._call("select","select_option",{entity_id:r.entities.sel_method,option:e});break;case"preset":this._haptic("light"),this._call("select","select_option",{entity_id:r.entities.sel_preset,option:e});break;case"step":this._step(e,Number(t));break;case"set":{let[i,o]=e.split(":");this._setControl(i,Number(o));break}case"command":{let i=a2[e];this._haptic("medium"),this._call(i.service[0],i.service[1],{entity_id:r.entities[i.entity]});break}default:break}}_controlEntity(C){return{temperature:"num_temp",time:"num_time",probe:"num_probe",airspeed:"num_airspeed"}[C]}_step(C,H){let V=this._model.controls[C];if(!V)return;let e=V.value??V.min,t=Math.min(V.max,Math.max(V.min,e+H*V.step));t!==e&&this._setControl(C,t)}_setControl(C,H){let V=this._model.entities[this._controlEntity(C)];if(!V)return;let e=this._model.controls[C],t=e?Math.min(e.max,Math.max(e.min,H)):H;this._haptic("light"),this._call("number","set_value",{entity_id:V,value:t})}_call(C,H,V){return V.entity_id?this._hass.callService(C,H,V):Promise.resolve()}_moreInfo(C){C&&this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:C},bubbles:!0,composed:!0}))}_haptic(C){this.dispatchEvent(new CustomEvent("haptic",{detail:C,bubbles:!0,composed:!0}))}};function t4(){customElements.get(Y)||(customElements.define(Y,r5),window.customCards=window.customCards||[],window.customCards.push({type:Y,name:"Philips Airfryer Card",description:"Rich status card for Philips airfryers: cooking status, drawer, temperature, probe, timers and controls.",preview:!0,documentationURL:"https://github.com/gabor-io/ha-appliance-custom-card"}),console.info(`%c ${Y} %c ${I7} `,"color:#fff;background:#f4511e;font-weight:700;border-radius:3px 0 0 3px","color:#f4511e;background:#fbe9e7;font-weight:700;border-radius:0 3px 3px 0"))}var S8=R({cardName:Y,toggles:["show_methods","show_presets","show_settings","show_probe","show_details","show_controls","compact","animate"],defaults:i5,listDevices:n2,getLanguage:o2,translator:M2,languages:t5});function r4(){customElements.get(P1)||customElements.define(P1,S8)}r4();t4();var X="skoda-car-card",F1="skoda-car-card-editor",i4="1.21.0",a4=["front_left","front_right","rear_left","rear_right"],a5={front_left:"fl",front_right:"fr",rear_left:"rl",rear_right:"rr"};var o4=["fuel_level","gas_level","battery_percentage"],M4=["range","combustion_range","electric_range","gas_range"],n4=[["last_trip_mileage","range"],["last_trip_travel_time","travel_time"],["last_trip_average_speed","gauge"],["last_trip_average_fuel_consumption","fuel"],["last_trip_average_electric_consumption","charger"],["overall_mileage","odometer"],["overall_travel_time","travel_time"],["overall_average_speed","gauge"],["overall_average_fuel_consumption","fuel"],["overall_average_electric_consumption","charger"]],s4=[["inspection","service"],["inspection_in_km","service"],["oil_service_in_days","adblue"],["oil_service_in_km","adblue"]],l4=[["software_version","software"],["car_captured","history"],["operation","info"],["service_event","info"],["camping_mode_ends_at","ac"]],d4=[["charging_state","charger"],["charging_power","charger"],["charging_rate","charger"],["remaining_charging_time","travel_time"],["target_battery_percentage","battery_car"],["electric_range","range"]];var _8={card_name:"Aut\xF3",status:{parked:"Parkol",moving:"\xDAton",offline:"Nem el\xE9rhet\u0151",charging:"T\xF6lt\xE9s"},opening:{door_front_left:"Bal els\u0151 ajt\xF3",door_front_right:"Jobb els\u0151 ajt\xF3",door_rear_left:"Bal h\xE1ts\xF3 ajt\xF3",door_rear_right:"Jobb h\xE1ts\xF3 ajt\xF3",window_front_left:"Bal els\u0151 ablak",window_front_right:"Jobb els\u0151 ablak",window_rear_left:"Bal h\xE1ts\xF3 ablak",window_rear_right:"Jobb h\xE1ts\xF3 ablak",trunk:"Csomagtart\xF3",bonnet:"Motorh\xE1ztet\u0151",sunroof:"Tet\u0151ablak"},state:{open:"nyitva",closed:"z\xE1rva",lowered:"leh\xFAzva",up:"felh\xFAzva",on:"be",off:"ki",locked:"Z\xE1rva",unlocked:"Nyitva",unknown:"ismeretlen",none:"nincs"},alert:{door_open:"{name} nyitva",doors_open:"{count} ajt\xF3 nyitva",window_open:"{name} leh\xFAzva",windows_open:"{count} ablak leh\xFAzva",trunk_open:"Csomagtart\xF3 nyitva",bonnet_open:"Motorh\xE1ztet\u0151 nyitva",sunroof_open:"Tet\u0151ablak nyitva",lights_on:"Parkol\xF3f\xE9ny \xE9g",unlocked:"Az aut\xF3 nincs lez\xE1rva",all_closed:"Minden ny\xEDl\xE1sz\xE1r\xF3 z\xE1rva",offline:"Az aut\xF3 nem el\xE9rhet\u0151 (alszik vagy nincs t\xE9rer\u0151)"},section:{openings:"Ny\xEDl\xE1sz\xE1r\xF3k",drive:"Menetadatok",trip:"\xD6sszes\xEDtett utak",service:"Szerviz",last_trip:"Utols\xF3 \xFAt",score:"Pontsz\xE1m",charging:"T\xF6lt\xE9s",climate:"Kl\xEDma",system:"Poz\xEDci\xF3 \xE9s rendszer",extra:"Tov\xE1bbi entit\xE1sok"},ui:{range:"Hat\xF3t\xE1v",fuel:"\xDCzemanyag",level:"T\xF6lt\xF6tts\xE9g",odometer:"Km \xF3ra",outside:"K\xFCls\u0151 h\u0151m\xE9rs\xE9klet",adblue:"AdBlue hat\xF3t\xE1v",doors:"Ajt\xF3k",windows:"Ablakok",position:"Hely",last_update:"Utols\xF3 adat",updated:"Friss\xEDtve",not_configured:"Nem tal\xE1lhat\xF3 MySkoda aut\xF3. V\xE1laszd ki az eszk\xF6zt a k\xE1rtya be\xE1ll\xEDt\xE1saiban.",unavailable:"Az aut\xF3 entit\xE1sai nem \xE9rhet\u0151k el.",in_motion:"Mozg\xE1sban",reachable:"online",not_reachable:"offline",battery_protection:"akkumul\xE1tor-v\xE9delem",lights:"Parkol\xF3f\xE9ny",lights_on:"parkol\xF3f\xE9ny \xE9g",charging_plug:"csatlakoztatva",climate_state:"Kl\xEDma",target_temp:"C\xE9l h\u0151m\xE9rs\xE9klet",current_temp:"Bels\u0151 h\u0151m\xE9rs\xE9klet",read_only:"Csak \xE1llapotjelz\xE9s \u2013 a k\xE1rtya nem vez\xE9rli az aut\xF3t."},primary:{outside_temperature:"K\xFCls\u0151 h\u0151m.",adblue_range:"AdBlue",inspection:"Szerviz"},panel:{inspection:"Szerviz",inspection_in_km:"Km-ig",oil_service_in_days:"Olaj",oil_service_in_km:"Olaj km",last_trip_mileage:"T\xE1v",last_trip_travel_time:"Id\u0151",last_trip_average_fuel_consumption:"Fogy.",last_trip_average_electric_consumption:"Fogy.",score_daily:"Napi",score_weekly:"Heti",score_monthly:"Havi"},entity:{mileage:"Km \xF3ra",range:"Hat\xF3t\xE1v",combustion_range:"Hat\xF3t\xE1v (\xFCzemanyag)",electric_range:"Hat\xF3t\xE1v (elektromos)",gas_range:"Hat\xF3t\xE1v (g\xE1z)",fuel_level:"Tankszint",gas_level:"G\xE1zszint",battery_percentage:"Akkumul\xE1tor",adblue_range:"AdBlue hat\xF3t\xE1v",outside_temperature:"K\xFCls\u0151 h\u0151m\xE9rs\xE9klet",inspection:"K\xF6telez\u0151 szervizig",inspection_in_km:"K\xF6telez\u0151 szervizig h\xE1tral\xE9v\u0151 t\xE1v",oil_service_in_days:"Olajcser\xE9ig",oil_service_in_km:"Olajcser\xE9ig h\xE1tral\xE9v\u0151 t\xE1v",software_version:"Szoftver verzi\xF3",car_captured:"Utols\xF3 adat",operation:"Utols\xF3 m\u0171velet",service_event:"Utols\xF3 szervizesem\xE9ny",camping_mode_ends_at:"Camping m\xF3d v\xE9ge",last_trip_mileage:"Utols\xF3 \xFAt \u2013 t\xE1v",last_trip_travel_time:"Utols\xF3 \xFAt \u2013 id\u0151",last_trip_average_speed:"Utols\xF3 \xFAt \u2013 \xE1tlagsebess\xE9g",last_trip_average_fuel_consumption:"Utols\xF3 \xFAt \u2013 fogyaszt\xE1s",last_trip_average_electric_consumption:"Utols\xF3 \xFAt \u2013 fogyaszt\xE1s (el.)",overall_mileage:"\xD6sszesen \u2013 t\xE1v",overall_travel_time:"\xD6sszesen \u2013 id\u0151",overall_average_speed:"\xD6sszesen \u2013 \xE1tlagsebess\xE9g",overall_average_fuel_consumption:"\xD6sszesen \u2013 fogyaszt\xE1s",overall_average_electric_consumption:"\xD6sszesen \u2013 fogyaszt\xE1s (el.)",charging_state:"T\xF6lt\xE9s \xE1llapota",charging_power:"T\xF6lt\xE9si teljes\xEDtm\xE9ny",charging_rate:"T\xF6lt\xE9si sebess\xE9g",charge_type:"T\xF6lt\xE9s t\xEDpusa",remaining_charging_time:"H\xE1tral\xE9v\u0151 t\xF6lt\xE9si id\u0151",target_battery_percentage:"C\xE9l t\xF6lt\xF6tts\xE9g"},editor:{device:"Eszk\xF6z",device_auto:"Automatikus felismer\xE9s",name:"N\xE9v",language:"Nyelv",language_auto:"Automatikus (HA nyelve)",sections:"L\xE1that\xF3 szekci\xF3k",show_alerts:"Figyelmeztet\xE9sek",show_panels:"Szerviz / \xFAt / pontsz\xE1m panelek",show_drive:"Menetadatok",show_trip:"Utak",show_service:"Szerviz",show_charging:"T\xF6lt\xE9s",show_climate:"Kl\xEDma",show_system:"Poz\xEDci\xF3 \xE9s rendszer",show_extra:"Tov\xE1bbi entit\xE1sok",compact:"Kompakt elrendez\xE9s",animate:"Anim\xE1ci\xF3k"}},y8={card_name:"Car",status:{parked:"Parked",moving:"Driving",offline:"Not reachable",charging:"Charging"},opening:{door_front_left:"Front left door",door_front_right:"Front right door",door_rear_left:"Rear left door",door_rear_right:"Rear right door",window_front_left:"Front left window",window_front_right:"Front right window",window_rear_left:"Rear left window",window_rear_right:"Rear right window",trunk:"Trunk",bonnet:"Bonnet",sunroof:"Sunroof"},state:{open:"open",closed:"closed",lowered:"open",up:"closed",on:"on",off:"off",locked:"Locked",unlocked:"Unlocked",unknown:"unknown",none:"not fitted"},alert:{door_open:"{name} is open",doors_open:"{count} doors are open",window_open:"{name} is open",windows_open:"{count} windows are open",trunk_open:"Trunk is open",bonnet_open:"Bonnet is open",sunroof_open:"Sunroof is open",lights_on:"Parking lights are on",unlocked:"The car is not locked",all_closed:"Everything is closed",offline:"The car is not reachable (asleep or out of coverage)"},section:{openings:"Openings",drive:"Drive data",trip:"Overall trips",service:"Service",last_trip:"Last trip",score:"Score",charging:"Charging",climate:"Climate",system:"Position and system",extra:"Other entities"},ui:{range:"Range",fuel:"Fuel",level:"Level",odometer:"Odometer",outside:"Outside temperature",adblue:"AdBlue range",doors:"Doors",windows:"Windows",position:"Location",last_update:"Last update",updated:"Updated",not_configured:"No MySkoda vehicle found. Pick the device in the card settings.",unavailable:"The vehicle entities are unavailable.",in_motion:"In motion",reachable:"online",not_reachable:"offline",battery_protection:"battery protection",lights:"Parking lights",lights_on:"parking lights on",charging_plug:"plugged in",climate_state:"Air conditioning",target_temp:"Target temperature",current_temp:"Cabin temperature",read_only:"Status only - this card never controls the car."},primary:{outside_temperature:"Outside",adblue_range:"AdBlue",inspection:"Service"},panel:{inspection:"Service",inspection_in_km:"In",oil_service_in_days:"Oil",oil_service_in_km:"Oil in",last_trip_mileage:"Distance",last_trip_travel_time:"Time",last_trip_average_fuel_consumption:"Cons.",last_trip_average_electric_consumption:"Cons.",score_daily:"Daily",score_weekly:"Weekly",score_monthly:"Monthly"},entity:{mileage:"Odometer",range:"Range",combustion_range:"Range (fuel)",electric_range:"Range (electric)",gas_range:"Range (gas)",fuel_level:"Fuel level",gas_level:"Gas level",battery_percentage:"Battery",adblue_range:"AdBlue range",outside_temperature:"Outside temperature",inspection:"Next service in",inspection_in_km:"Next service in (distance)",oil_service_in_days:"Oil service in",oil_service_in_km:"Oil service in",software_version:"Software version",car_captured:"Last update",operation:"Last operation",service_event:"Last service event",camping_mode_ends_at:"Camping mode ends",last_trip_mileage:"Last trip - distance",last_trip_travel_time:"Last trip - time",last_trip_average_speed:"Last trip - average speed",last_trip_average_fuel_consumption:"Last trip - consumption",last_trip_average_electric_consumption:"Last trip - consumption (el.)",overall_mileage:"Overall - distance",overall_travel_time:"Overall - time",overall_average_speed:"Overall - average speed",overall_average_fuel_consumption:"Overall - consumption",overall_average_electric_consumption:"Overall - consumption (el.)",charging_state:"Charging state",charging_power:"Charging power",charging_rate:"Charging rate",charge_type:"Charge type",remaining_charging_time:"Remaining charging time",target_battery_percentage:"Target battery level"},editor:{device:"Device",device_auto:"Auto detect",name:"Name",language:"Language",language_auto:"Automatic (HA language)",sections:"Visible sections",show_alerts:"Alerts",show_panels:"Service / trip / score panels",show_drive:"Drive data",show_trip:"Trips",show_service:"Service",show_charging:"Charging",show_climate:"Climate",show_system:"Position and system",show_extra:"Other entities",compact:"Compact layout",animate:"Animations"}},p4={hu:_8,en:y8},o5=Object.keys(p4);function l2(L,C){return k(L,C,o5)}function d2(L){return T(p4,L)}var p2="myskoda",b8={lock_vehicle:["binary_sensor","vehicle_lock","vehicle_locked"],lock_doors:["binary_sensor","doors_lock","doors_locked"],doors_open:["binary_sensor","doors_open","doors_open"],windows_open:["binary_sensor","windows_open","windows"],trunk:["binary_sensor","trunk_open","trunk"],bonnet:["binary_sensor","bonnet_open","bonnet"],sunroof:["binary_sensor","sunroof_open","sunroof"],door_front_left:["binary_sensor","door_open_front_left","door_front_left"],door_front_right:["binary_sensor","door_open_front_right","door_front_right"],door_rear_left:["binary_sensor","door_open_rear_left","door_rear_left"],door_rear_right:["binary_sensor","door_open_rear_right","door_rear_right"],window_front_left:["binary_sensor","window_open_front_left","window_front_left"],window_front_right:["binary_sensor","window_open_front_right","window_front_right"],window_rear_left:["binary_sensor","window_open_rear_left","window_rear_left"],window_rear_right:["binary_sensor","window_open_rear_right","window_rear_right"],lights:["binary_sensor","parkinglights_on","parking_lights"],in_motion:["binary_sensor","vehicle_in_motion","in_motion"],reachable:["binary_sensor","vehicle_reachable","reachable"],battery_protection:["binary_sensor","vehicle_battery_protection","battery_protection"],charger_connected:["binary_sensor","charger_connected","charger_connected"],charger_lock:["binary_sensor","charger_lock","charge_lock"],mileage:["sensor","mileage","mileage"],range:["sensor","range","range"],combustion_range:["sensor","combustion_range","combustion_range"],electric_range:["sensor","electric_range","electric_range"],gas_range:["sensor","gas_range","gas_range"],fuel_level:["sensor","fuel_level","fuel_level"],gas_level:["sensor","gas_level","gas_level"],battery_percentage:["sensor","battery_percentage","battery_percentage"],adblue_range:["sensor","adblue_range","adblue_range"],outside_temperature:["sensor","outside_temperature","outside_temperature"],inspection:["sensor","inspection","next_inspection"],inspection_in_km:["sensor","inspection_in_km","next_inspection_2"],oil_service_in_days:["sensor","oil_service_in_days","oil_service"],oil_service_in_km:["sensor","oil_service_in_km","oil_service_2"],software_version:["sensor","software_version","software_version"],car_captured:["sensor","car_captured","last_updated"],operation:["sensor","operation","last_operation"],service_event:["sensor","service_event","last_service_event"],camping_mode_ends_at:["sensor","camping_mode_ends_at","camping_mode_ends"],last_trip_mileage:["sensor","last_trip_mileage","last_trip_mileage"],last_trip_travel_time:["sensor","last_trip_travel_time","last_trip_travel_time"],last_trip_average_speed:["sensor","last_trip_average_speed","last_trip_average_speed"],last_trip_average_fuel_consumption:["sensor","last_trip_average_fuel_consumption","last_trip_average_fuel_consumption"],last_trip_average_electric_consumption:["sensor","last_trip_average_electric_consumption","last_trip_average_electric_consumption"],overall_mileage:["sensor","overall_mileage","overall_mileage"],overall_travel_time:["sensor","overall_travel_time","overall_travel_time"],overall_average_speed:["sensor","overall_average_speed","overall_average_speed"],overall_average_fuel_consumption:["sensor","overall_average_fuel_consumption","overall_average_fuel_consumption"],overall_average_electric_consumption:["sensor","overall_average_electric_consumption","overall_average_electric_consumption"],charging_state:["sensor","charging_state","charging_state"],charging_power:["sensor","charging_power","charging_power"],charging_rate:["sensor","charging_rate","charging_rate"],charge_type:["sensor","charge_type","charge_type"],remaining_charging_time:["sensor","remaining_charging_time","remaining_charging_time"],target_battery_percentage:["sensor","target_battery_percentage","target_battery_percentage"],score_daily:["sensor","driving_score_daily","driving_score_daily"],score_weekly:["sensor","driving_score_weekly","driving_score_weekly"],score_monthly:["sensor","driving_score_monthly","driving_score_monthly"],position:["device_tracker","device_tracker",null],climate:["climate","climate","air_conditioning"],render:["image","render_vehicle_main","main_render_of_vehicle"]},w8=["sensor","binary_sensor","device_tracker"];function A2(L){return Object.values(L?.entities||{})}function O8(L){return!L.platform||L.platform===p2}function N1(L){let C=new Map;for(let H of A2(L)){if(H.platform!==p2||!H.device_id)continue;let V=L.devices?.[H.device_id];V&&C.set(H.device_id,V.name_by_user||V.name||H.device_id)}return[...C.entries()].map(([H,V])=>({id:H,name:V}))}function k8(L,C){if(C?.device)return C.device;let H=N1(L);return H.length===1?H[0].id:null}function T8(L){let C=Object.keys(L?.states||{}).filter(H=>/^sensor\..+_mileage$/.test(H));return C.length!==1?null:C[0].replace(/^sensor\./,"").replace(/_mileage$/,"")}function E8(L,C){let H=A2(L).filter(e=>e.device_id===C&&O8(e)).map(e=>e.entity_id.split(".")[1]);if(!H.length)return null;let V=H[0];for(let e of H.slice(1)){let t=0;for(;t<V.length&&t<e.length&&V[t]===e[t];)t+=1;V=V.slice(0,t)}return V.replace(/_+$/,"")||null}function A4(L,C){let H=k8(L,C),V=C?.prefix||E8(L,H)||T8(L),e=C?.entities||{},t={prefix:V,device:H},r=new Set,i=new Map;for(let o of A2(L))o.platform===p2&&(H&&o.device_id!==H||!o.translation_key||i.has(o.translation_key)||i.set(o.translation_key,o.entity_id));for(let[o,[M,n,l]]of Object.entries(b8)){let d=e[o];if(d){t[o]=d,r.add(d);continue}let p=i.get(n);if(p&&p.startsWith(`${M}.`)&&L?.states?.[p]){t[o]=p,r.add(p);continue}if(!V||!l)continue;let v=`${M}.${V}_${l}`;L?.states?.[v]&&(t[o]=v,r.add(v))}if(!t.position&&V){for(let o of[`device_tracker.${V}`,`device_tracker.${V}_${V}`])if(L?.states?.[o]){t.position=o,r.add(o);break}}return t.extra=A2(L).filter(o=>o.platform===p2&&(!H||o.device_id===H)&&w8.includes(o.entity_id.split(".")[0])&&!r.has(o.entity_id)&&L?.states?.[o.entity_id]).map(o=>o.entity_id).sort(),t}var R8=[["outside_temperature","temperature"],["adblue_range","adblue"],["inspection","service"]],P8=[["outside_temperature","temperature"],["adblue_range","adblue"],["combustion_range","range"],["electric_range","range"],["gas_range","range"],["gas_level","fuel"],["battery_percentage","battery_car"]];function D1(L){if(x(L))return null;let C=Number(L.state);return Number.isFinite(C)?C:null}function I(L){return x(L)?null:L.state==="on"}function m4(L){let C=I(L);return C===null?null:!C}function c4(L){if(!L)return null;let C=new Date(L);return Number.isNaN(C.getTime())?null:C}function u4(L,C){if(!L)return null;let H=C?.locale?.language||C?.language||"hu",V=(L.getTime()-Date.now())/1e3,e=Math.abs(V),t=[["second",1,60],["minute",60,3600],["hour",3600,86400],["day",86400,2592e3],["month",2592e3,31536e3],["year",31536e3,1/0]],[r,i]=t.find(([,,o])=>e<o)||t[t.length-1];try{return new Intl.RelativeTimeFormat(H,{numeric:"auto"}).format(Math.round(V/i),r)}catch{return L.toLocaleString()}}function J(L,C){if(x(C))return null;let H=C.attributes||{};if(H.device_class==="timestamp"){let t=c4(C.state);if(t)return u4(t,L)}if(typeof L?.formatEntityState=="function")try{let t=L.formatEntityState(C);if(t)return t}catch{}let V=Number(C.state);if(Number.isFinite(V)){let t=L?.locale?.language||L?.language||"hu",r;try{r=new Intl.NumberFormat(t,{maximumFractionDigits:1}).format(V)}catch{r=String(V)}return H.unit_of_measurement?`${r} ${H.unit_of_measurement}`:r}let e=String(C.state);return e.charAt(0).toUpperCase()+e.slice(1).replace(/_/g," ")}function B8(L){let C=D1(L),H=(L?.attributes?.unit_of_measurement||"").toLowerCase();return C===null||!["min","m"].includes(H)||C<120?null:`${Math.floor(C/60)} h ${Math.round(C%60)} min`}function j(L,C,H,V=[]){let e=[];for(let[t,r]of H){let i=C[t];if(!i)continue;let o=L.states[i],M=t.endsWith("travel_time")&&B8(o)||J(L,o);M!==null&&(t.endsWith("_range")&&V.includes(M)||e.push({key:t,entityId:i,value:M,icon:r}))}return e}function $8(L,C,H){if(C?.subtitle!==void 0)return C.subtitle||null;let V=H.device?L.devices?.[H.device]:null;if(!V)return null;let e=/(\d{4})$/.exec(V.hw_version||"")?.[1],t=[V.model,e].filter(Boolean);return t.length?t.join(" \xB7 "):null}function F8(L,C,H){if(C?.name)return C.name;let V=H.device?L.devices?.[H.device]:null;return V?V.name_by_user||V.name:(H.mileage?L.states[H.mileage]:null)?.attributes?.friendly_name?.replace(/\s*Mileage$/i,"")||null}function v4(L,C){let H=A4(L,C),V=h=>H[h]?L.states[H[h]]:void 0;if(!Object.keys(H).filter(h=>!["prefix","device","extra"].includes(h)&&H[h]).length)return{ok:!1,reason:H.prefix||H.device?"unavailable":"not_configured",entities:H};let t={},r={},i=[];for(let h of a4){let O=I(V(`door_${h}`)),D=I(V(`window_${h}`));t[a5[h]]=O===!0,r[a5[h]]=D===!0,O!==null&&i.push({key:`door_${h}`,kind:"door",open:O,entityId:H[`door_${h}`]}),D!==null&&i.push({key:`window_${h}`,kind:"window",open:D,entityId:H[`window_${h}`]})}let o=I(V("trunk")),M=I(V("bonnet")),n=I(V("sunroof"));for(let[h,O]of[["trunk",o],["bonnet",M],["sunroof",n]])O!==null&&i.push({key:h,kind:"extra",open:O,entityId:H[h]});let l=o4.find(h=>H[h]&&D1(V(h))!==null),d=M4.find(h=>H[h]&&D1(V(h))!==null),p=l?V(l):null,v=d?V(d):null,f=V("position"),m=I(V("reachable")),Z=c4(V("car_captured")?.state),c=C?.show_panels!==!1,S=new Set([l,d,"mileage","car_captured","outside_temperature","adblue_range","inspection",...c?["inspection_in_km","oil_service_in_days","last_trip_mileage","last_trip_travel_time","last_trip_average_fuel_consumption","last_trip_average_electric_consumption"]:[]].filter(Boolean)),_=h=>h.filter(([O])=>!S.has(O)),b=[v?J(L,v):null].filter(Boolean);return{ok:!0,entities:H,name:F8(L,C,H),spec:$8(L,C,H),locked:m4(V("lock_vehicle"))??m4(V("lock_doors")),lockEntity:H.lock_vehicle||H.lock_doors||null,moving:I(V("in_motion"))===!0,offline:m===!1,reachable:m,lights:I(V("lights"))===!0,batteryProtection:I(V("battery_protection")),chargerConnected:I(V("charger_connected")),doors:t,windows:r,trunk:o===!0,bonnet:M===!0,sunroof:n,openings:i,openCount:i.filter(h=>h.open).length,level:p?{key:l,entityId:H[l],value:D1(p),unit:p.attributes?.unit_of_measurement||"%"}:null,range:v?{key:d,entityId:H[d],value:D1(v),unit:v.attributes?.unit_of_measurement||"km",text:J(L,v)}:null,odometer:H.mileage?{entityId:H.mileage,text:J(L,V("mileage"))}:null,position:f?{entityId:H.position,address:f.attributes?.parking_address||null,zone:J(L,f)}:null,lastUpdate:Z?{entityId:H.car_captured,date:Z,text:u4(Z,L)}:null,climate:H.climate?(()=>{let h=V("climate");return x(h)||h.state==="invalid"?null:{entityId:H.climate,state:J(L,h),current:h.attributes?.current_temperature??null,target:h.attributes?.temperature??null,unit:L.config?.unit_system?.temperature||"\xB0C"}})():null,primaryRows:j(L,H,R8),panels:{service:j(L,H,[["inspection","service"],["oil_service_in_days","adblue"],["inspection_in_km","service"]]),trip:j(L,H,[["last_trip_mileage","range"],["last_trip_travel_time","travel_time"],["last_trip_average_fuel_consumption","fuel"],["last_trip_average_electric_consumption","charger"]]).slice(0,3),score:j(L,H,[["score_daily","trophy"],["score_weekly","trophy"],["score_monthly","trophy"]])},rows:{drive:j(L,H,_(P8),b),trip:j(L,H,_(n4)),service:j(L,H,_(s4)),charging:j(L,H,_(d4),b),system:j(L,H,_(l4))},extra:(H.extra||[]).map(h=>({entityId:h,name:L.states[h]?.attributes?.friendly_name||h,value:J(L,L.states[h])}))}}var M5="M130 24 C104 24 86 28 72 36 C58 44 48 60 45 80 C42 100 41 120 41 150 C41 220 41 320 41 390 C41 430 43 455 46 468 C49 482 56 492 68 494 C86 497 174 497 192 494 C204 492 211 482 214 468 C217 455 219 430 219 390 C219 320 219 220 219 150 C219 120 218 100 215 80 C212 60 202 44 188 36 C174 28 156 24 130 24 Z",x4={fl:{x:41,y:230,w:26,h:76,hinge:[42,230]},rl:{x:41,y:308,w:26,h:68,hinge:[42,308]},fr:{x:193,y:230,w:26,h:76,hinge:[218,230]},rr:{x:193,y:308,w:26,h:68,hinge:[218,308]}},n5={fl:{arm:"M43 242 L34 238 Q28 239 28 245 Q28 251 34 251 L43 251 Z",glass:"M41 242 L35 240 Q31 241 31 245 Q31 249 35 249 L41 249 Z"},fr:{arm:"M217 242 L226 238 Q232 239 232 245 Q232 251 226 251 L217 251 Z",glass:"M219 242 L225 240 Q229 241 229 245 Q229 249 225 249 L219 249 Z"}};function N8(L){let C=x4[L],H=L==="fl"||L==="rl",V=H?C.x+C.w-9:C.x+2,e=H?C.x+2:C.x+C.w-5,t=n5[L]?`<path class="mirror-arm" d="${n5[L].arm}"/><path class="mirror-glass" d="${n5[L].glass}"/>`:"";return`
    <g class="door" data-door="${L}" style="--hinge-x:${C.hinge[0]}px;--hinge-y:${C.hinge[1]}px;">
      <rect class="panel" x="${C.x}" y="${C.y}" width="${C.w}" height="${C.h}" rx="2"/>
      <rect class="panel-shade" x="${C.x}" y="${C.y}" width="${C.w}" height="${C.h}" rx="2"/>
      <rect class="window${L.startsWith("r")?" tinted":""}" data-window="${L}"
        x="${V}" y="${C.y+7}" width="7" height="${C.h-14}" rx="2.5"/>
      <rect class="handle" x="${e}" y="${C.y+C.h-30}" width="3" height="13" rx="1.5"/>
      ${t}
    </g>`}function h4(){return`
<svg class="car" viewBox="0 0 260 528" role="img" aria-hidden="true">
  <defs>
    <clipPath id="car-body"><path d="${M5}"/></clipPath>

    <!-- body paint: dark at the flanks, a bright shoulder highlight either side -->
    <linearGradient id="car-paint" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="var(--car-edge)"/>
      <stop offset=".06" stop-color="var(--car-dark)"/>
      <stop offset=".18" stop-color="var(--car-light)"/>
      <stop offset=".3" stop-color="var(--car-hi)"/>
      <stop offset=".42" stop-color="var(--car-light)"/>
      <stop offset=".6" stop-color="var(--car-paint)"/>
      <stop offset=".78" stop-color="var(--car-dark)"/>
      <stop offset=".9" stop-color="var(--car-light)"/>
      <stop offset="1" stop-color="var(--car-edge)"/>
    </linearGradient>

    <!-- the nose and the tail curve away from the viewer -->
    <linearGradient id="car-ends" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#05080b" stop-opacity=".38"/>
      <stop offset=".07" stop-color="#05080b" stop-opacity=".06"/>
      <stop offset=".16" stop-color="#05080b" stop-opacity="0"/>
      <stop offset=".84" stop-color="#05080b" stop-opacity="0"/>
      <stop offset=".94" stop-color="#05080b" stop-opacity=".08"/>
      <stop offset="1" stop-color="#05080b" stop-opacity=".34"/>
    </linearGradient>

    <!-- crown of a single panel: brighter along its centre line -->
    <linearGradient id="car-crown" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#05080b" stop-opacity=".2"/>
      <stop offset=".22" stop-color="#05080b" stop-opacity=".03"/>
      <stop offset=".45" stop-color="#ffffff" stop-opacity=".09"/>
      <stop offset=".62" stop-color="#ffffff" stop-opacity=".04"/>
      <stop offset=".82" stop-color="#05080b" stop-opacity=".05"/>
      <stop offset="1" stop-color="#05080b" stop-opacity=".22"/>
    </linearGradient>

    <linearGradient id="car-glass" x1="0" y1="0" x2=".8" y2="1">
      <stop offset="0" stop-color="var(--car-glass-light)"/>
      <stop offset=".55" stop-color="var(--car-glass)"/>
      <stop offset="1" stop-color="var(--car-glass-dark)"/>
    </linearGradient>

    <!-- a soft studio reflection running down the car -->
    <linearGradient id="car-sheen" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#ffffff" stop-opacity="0"/>
      <stop offset=".26" stop-color="#ffffff" stop-opacity=".22"/>
      <stop offset=".34" stop-color="#ffffff" stop-opacity=".05"/>
      <stop offset=".86" stop-color="#ffffff" stop-opacity="0"/>
      <stop offset=".95" stop-color="#ffffff" stop-opacity=".12"/>
      <stop offset="1" stop-color="#ffffff" stop-opacity="0"/>
    </linearGradient>

    <linearGradient id="car-rail" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="var(--car-rail-dark)"/>
      <stop offset=".45" stop-color="var(--car-rail)"/>
      <stop offset="1" stop-color="var(--car-rail-dark)"/>
    </linearGradient>

    <linearGradient id="car-headlamp" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="var(--car-lamp-hi)"/>
      <stop offset=".55" stop-color="var(--car-lamp)"/>
      <stop offset="1" stop-color="var(--car-lamp-dark)"/>
    </linearGradient>

    <linearGradient id="car-taillamp" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#e2574c"/>
      <stop offset=".5" stop-color="#c0322a"/>
      <stop offset="1" stop-color="#8e211c"/>
    </linearGradient>

    <filter id="car-shadow" x="-40%" y="-20%" width="180%" height="140%">
      <feGaussianBlur stdDeviation="9"/>
    </filter>
    <filter id="car-contact" x="-40%" y="-40%" width="180%" height="180%">
      <feGaussianBlur stdDeviation="2.4"/>
    </filter>
  </defs>

  <!-- ground shadow -->
  <ellipse class="shadow" cx="132" cy="268" rx="88" ry="230" filter="url(#car-shadow)"/>
  <path class="contact" d="${M5}" filter="url(#car-contact)"/>

  <!-- tyres, barely visible under the arches -->
  <g class="tyres">
    <rect x="40" y="94" width="8" height="42" rx="3.5"/>
    <rect x="212" y="94" width="8" height="42" rx="3.5"/>
    <rect x="40" y="366" width="8" height="42" rx="3.5"/>
    <rect x="212" y="366" width="8" height="42" rx="3.5"/>
  </g>

  <g clip-path="url(#car-body)">
    <rect class="paint" x="30" y="10" width="200" height="510"/>

    <!-- bonnet: hinged at the cowl, tips up when open -->
    <rect class="bay" x="56" y="58" width="148" height="116" rx="26"/>
    <g class="lid bonnet">
      <rect class="paint" x="30" y="10" width="200" height="166"/>
      <rect class="crown" x="46" y="10" width="168" height="166"/>
      <path class="gap" d="M64 66 C64 104 62 140 60 172"/>
      <path class="gap" d="M196 66 C196 104 198 140 200 172"/>
      <path class="crease" d="M96 44 C94 82 93 124 93 172"/>
      <path class="crease" d="M164 44 C166 82 167 124 167 172"/>
      <path class="cowl" d="M58 172 L202 172"/>

      <!-- nose: grille between the wrap-around headlamps -->
      <path class="bumper" d="M48 74 C62 46 92 32 130 32 C168 32 198 46 212 74"/>
      <g class="grille">
        <path class="grille-body" d="M92 28 C110 25 150 25 168 28 L172 42 C150 38 110 38 88 42 Z"/>
        <path class="grille-frame" d="M92 28 C110 25 150 25 168 28 L172 42 C150 38 110 38 88 42 Z"/>
        <path class="grille-slats" d="M100 28 L98 41 M112 27 L111 40 M124 26.5 L124 39.5
          M136 26.5 L136 39.5 M148 27 L149 40 M160 28 L162 41"/>
      </g>
      <g class="lamp head left">
        <path class="lens" d="M52 60 C60 44 74 36 92 33 L98 47 C84 50 72 57 64 70 Z"/>
        <path class="led" d="M58 60 C66 47 76 42 92 39"/>
      </g>
      <g class="lamp head right">
        <path class="lens" d="M208 60 C200 44 186 36 168 33 L162 47 C176 50 188 57 196 70 Z"/>
        <path class="led" d="M202 60 C194 47 184 42 168 39"/>
      </g>
    </g>

    <!-- tailgate: glass and all, hinged at the roof -->
    <rect class="bay" x="58" y="366" width="144" height="118" rx="20"/>
    <g class="lid trunk">
      <rect class="paint" x="30" y="352" width="200" height="168"/>
      <rect class="crown" x="46" y="352" width="168" height="168"/>
      <path class="glass rear-window tinted" d="M74 356 L186 356 L196 436 L64 436 Z"/>
      <path class="glass-hi" d="M88 360 L118 360 L104 432 L78 432 Z"/>
      <path class="chrome" d="M74 356 L186 356 L196 436 L64 436 Z"/>
      <path class="gap" d="M58 444 C88 438 172 438 202 444"/>
      <path class="trim" d="M96 452 L164 452"/>
      <rect class="plate" x="106" y="458" width="48" height="13" rx="2"/>
      <path class="bumper" d="M56 478 C86 486 174 486 204 478"/>
      <g class="lamp tail left">
        <path class="lens" d="M42 434 C54 434 66 436 72 438 L72 450 C64 448 52 447 42 447 Z"/>
        <path class="lens-inner" d="M50 437 C58 437 64 438 69 440 L69 445 C63 443 56 442 50 442 Z"/>
      </g>
      <g class="lamp tail right">
        <path class="lens" d="M218 434 C206 434 194 436 188 438 L188 450 C196 448 208 447 218 447 Z"/>
        <path class="lens-inner" d="M210 437 C202 437 196 438 191 440 L191 445 C197 443 204 442 210 442 Z"/>
      </g>
    </g>

    <!-- door openings, revealed when a door swings out -->
    <rect class="aperture" x="41" y="230" width="26" height="76" rx="3"/>
    <rect class="aperture" x="41" y="308" width="26" height="68" rx="3"/>
    <rect class="aperture" x="193" y="230" width="26" height="76" rx="3"/>
    <rect class="aperture" x="193" y="308" width="26" height="68" rx="3"/>

    <!-- glasshouse -->
    <path class="glass windscreen" d="M62 176 L198 176 L192 232 L68 232 Z"/>
    <path class="glass-hi" d="M78 180 L112 180 L98 229 L72 229 Z"/>
    <path class="chrome" d="M62 176 L198 176 L192 232 L68 232 Z"/>
    <path class="wiper" d="M84 228 C96 216 106 208 116 202"/>
    <path class="wiper" d="M124 228 C136 216 146 208 156 202"/>

    <path class="roof" d="M68 232 L192 232 L188 352 L72 352 Z"/>
    <rect class="crown roof-crown" x="68" y="232" width="124" height="120"/>
    <path class="rail" d="M75 244 L73 342"/>
    <path class="rail" d="M185 244 L187 342"/>
    <path class="antenna" d="M130 326 C128.6 334 127.4 342 126.6 351 C129 350 131 350 133.4 351 C132.6 342 131.4 334 130 326 Z"/>
    <path class="gap" d="M72 352 L188 352"/>

    <!-- shoulder lines down the flanks -->
    <path class="shoulder" d="M46 180 C43 200 42 214 42 228"/>
    <path class="shoulder" d="M214 180 C217 200 218 214 218 228"/>
    <path class="shoulder" d="M42 378 C42 402 44 430 47 452"/>
    <path class="shoulder" d="M218 378 C218 402 216 430 213 452"/>
    <circle class="filler" cx="210" cy="356" r="6"/>

    <rect class="sheen" x="30" y="10" width="200" height="510"/>
    <rect class="curve" x="30" y="10" width="200" height="510"/>
  </g>

  <path class="outline" d="${M5}"/>

  ${Object.keys(x4).map(N8).join("")}

  <!-- sunroof marker, only drawn when the car reports one -->
  <rect class="sunroof" x="92" y="244" width="76" height="86" rx="10"/>
</svg>`}function f4(L,C){let H=L.querySelector(".car");if(!H)return;let V=(t,r,i)=>{t&&t.classList.toggle(r,!!i)};for(let[t,r]of Object.entries(C.doors))V(H.querySelector(`[data-door="${t}"]`),"open",r);for(let[t,r]of Object.entries(C.windows))V(H.querySelector(`[data-window="${t}"]`),"open",r);V(H.querySelector(".bonnet"),"open",C.bonnet),V(H.querySelector(".trunk"),"open",C.trunk);let e=H.querySelector(".sunroof");V(e,"visible",C.sunroof!==null),V(e,"open",C.sunroof),H.classList.toggle("lights-on",!!C.lights),H.classList.toggle("offline",!!C.offline)}var D8=`
:host {
  --car-paint: #c3c9d1;
  --car-light: #dfe4ea;
  --car-hi: #f4f6f8;
  --car-dark: #97a0aa;
  --car-edge: #6f7a85;
  --car-roof: #b9c0c9;
  --car-cabin: #20262c;
  --car-bay: #3b444d;
  --car-glass: #5f7180;
  --car-glass-light: #8fa2b0;
  --car-glass-dark: #46545f;
  --car-chrome: #e6ebef;
  --car-gap: rgba(20, 26, 32, .55);
  --car-line: rgba(20, 26, 32, .35);
  --car-rail: #d6dbe1;
  --car-rail-dark: #96a0a9;
  --car-tyre: #2a2f35;
  --car-lamp-hi: #f2f5f8;
  --car-lamp: #cfd7de;
  --car-lamp-dark: #9aa4ad;
  --car-grille: #262d34;
  --car-grille-slat: #3c444c;
  --car-open: #f2a63c;
  --car-open-line: #b9711a;
  --car-alarm: var(--error-color, #e03b2c);
  --car-stage: 150px;
}

/* the drawn car keeps its own palette on a dark theme so it stays a silver car */
.wrap.dark {
  --car-paint: #9199a3;
  --car-light: #b4bcc5;
  --car-hi: #ccd3da;
  --car-dark: #6c757e;
  --car-edge: #464e57;
  --car-roof: #858d97;
  --car-cabin: #0d1115;
  --car-bay: #262c33;
  --car-glass: #41525f;
  --car-glass-light: #64798a;
  --car-glass-dark: #2f3b45;
  --car-chrome: #b9c2ca;
  --car-gap: rgba(5, 8, 11, .7);
  --car-line: rgba(5, 8, 11, .55);
  --car-rail: #a8b1ba;
  --car-rail-dark: #626a73;
  --car-tyre: #15191d;
  --car-lamp-hi: #c8d1d8;
  --car-lamp: #9ba5ae;
  --car-lamp-dark: #6c757e;
  --car-grille: #0d1115;
  --car-grille-slat: #2a3138;
}

/* ---------- hero ---------- */
.split { display: grid; grid-template-columns: var(--car-stage) minmax(0, 1fr); gap: 16px; align-items: stretch; }
.compact .split { --car-stage: 120px; gap: 12px; }
@container (max-width: 340px) { .split { grid-template-columns: 1fr; justify-items: center; } .split .primary { width: 100%; } }

.stage { width: 100%; max-width: var(--car-stage); margin: 0 auto; }
.primary { display: flex; flex-direction: column; gap: 10px; min-width: 0; }
.state-block { display: grid; gap: 2px; }
.state-text { font-size: 1.5rem; font-weight: 750; color: var(--ap-accent); line-height: 1.1; }
.compact .state-text { font-size: 1.2rem; }
.state-sub { font-size: .78rem; color: var(--ap-muted); }

/* ---------- summary panels ---------- */
.panels { display: grid; grid-template-columns: repeat(auto-fit, minmax(128px, 1fr)); gap: 8px; }
.compact .panels { grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); }
@container (max-width: 380px) { .panels { grid-template-columns: repeat(auto-fit, minmax(118px, 1fr)); } }
.panel { border: 1px solid var(--ap-line); border-radius: 13px; padding: 9px 10px; display: grid; gap: 5px; }
.panel h4 {
  margin: 0; font-size: .66rem; font-weight: 700; letter-spacing: .05em;
  text-transform: uppercase; color: var(--ap-muted);
}
.panel .line { display: flex; justify-content: space-between; gap: 8px; font-size: .78rem; cursor: pointer; }
.panel .line > span { color: var(--ap-muted); }
.panel .line > b { font-weight: 650; font-variant-numeric: tabular-nums; color: var(--ap-text); }

/* ---------- footer ---------- */
.footer {
  display: flex; align-items: center; gap: 8px; cursor: pointer;
  border-top: 1px solid var(--ap-line); padding-top: 10px; margin-bottom: 6px;
  font-size: .78rem; color: var(--ap-muted);
}
.footer .k { display: flex; align-items: center; gap: 6px; min-width: 0; }
.footer .k .icon { width: 15px; height: 15px; }
.footer .k span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.footer .v { margin-left: auto; white-space: nowrap; }

.metric { display: grid; gap: 5px; }
.metric .top { display: flex; align-items: center; gap: 6px; font-size: .8rem; color: var(--ap-muted); }
.metric .top .icon { width: 16px; height: 16px; }
.metric .top .val { margin-left: auto; color: var(--ap-text); font-weight: 600; font-variant-numeric: tabular-nums; }
.metric .top .val b { font-size: .95rem; }
.metric .bar > i { background: linear-gradient(90deg, #7ac47f, var(--success-color, #43a047)); }
.metric.low .bar > i { background: linear-gradient(90deg, #ffb74d, var(--warning-color, #fb8c00)); }
.metric.empty-tank .bar > i { background: linear-gradient(90deg, #ef9a9a, var(--error-color, #db4437)); }

.line { display: flex; align-items: center; gap: 8px; font-size: .84rem; cursor: pointer; }
.line .k { color: var(--ap-muted); display: flex; align-items: center; gap: 6px; min-width: 0; }
.line .k .icon { width: 16px; height: 16px; }
.line .k span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.line .v { margin-left: auto; font-weight: 600; font-variant-numeric: tabular-nums; text-align: right; }

/* ---------- collapsible sections ---------- */
.fold { border-top: 1px solid var(--ap-line); padding-top: 10px; }
.fold > summary {
  cursor: pointer; list-style: none; display: flex; align-items: center; gap: 8px;
  font-size: .78rem; font-weight: 700; letter-spacing: .04em; text-transform: uppercase;
  color: var(--ap-muted);
}
.fold > summary::-webkit-details-marker { display: none; }
.fold > summary .icon { width: 16px; height: 16px; }
.fold > summary .chev { margin-left: auto; transition: transform .2s ease; }
.fold[open] > summary .chev { transform: rotate(180deg); }
.fold .body { display: grid; gap: 8px; padding: 10px 0 4px; }
.fold .body .line { cursor: pointer; }

.readonly { font-size: .72rem; color: var(--ap-muted); display: flex; align-items: center; gap: 6px; }
.readonly .icon { width: 14px; height: 14px; }

/* ---------- vehicle illustration ---------- */
.car { display: block; width: 100%; height: auto; overflow: visible; }
.car .shadow { fill: rgba(10, 16, 22, .22); }
.car .contact { fill: rgba(10, 16, 22, .3); transform: translateY(4px); }
.car .tyres rect { fill: var(--car-tyre); opacity: .7; }

.car .paint { fill: url(#car-paint); }
.car .crown { fill: url(#car-crown); }
.car .curve { fill: url(#car-ends); }
.car .sheen { fill: url(#car-sheen); pointer-events: none; }
.car .bay { fill: var(--car-bay); }
.car .aperture { fill: var(--car-cabin); }
.car .outline { fill: none; stroke: var(--car-line); stroke-width: 1.6; }

/* panel gaps get a dark line with a light lip, the way a shut line catches light */
.car .gap { fill: none; stroke: var(--car-gap); stroke-width: 1.4; stroke-linecap: round; }
.car .crease { fill: none; stroke: var(--car-gap); stroke-width: .9; opacity: .28; }
.car .cowl { fill: none; stroke: var(--car-gap); stroke-width: 2.4; opacity: .55; }
.car .shoulder { fill: none; stroke: #ffffff; stroke-opacity: .16; stroke-width: 1.6; }
.car .bumper { fill: none; stroke: #05080b; stroke-opacity: .16; stroke-width: 3; stroke-linecap: round; }
.car .filler { fill: none; stroke: var(--car-gap); stroke-width: 1; opacity: .45; }

/* glasshouse */
.car .glass { fill: url(#car-glass); }
.car .glass.tinted { fill: color-mix(in srgb, var(--car-glass-dark) 82%, #05090d); }
.car .glass-hi { fill: #ffffff; opacity: .1; }
.car .chrome { fill: none; stroke: var(--car-chrome); stroke-width: 1.6; stroke-linejoin: round; }
.car .wiper { fill: none; stroke: #10161c; stroke-opacity: .5; stroke-width: 1.8; stroke-linecap: round; }
.car .roof { fill: var(--car-roof); }
.car .roof-crown { fill: url(#car-crown); opacity: .9; }
.car .rail { fill: none; stroke: url(#car-rail); stroke-width: 6; stroke-linecap: round; opacity: .85; }
.car .antenna { fill: var(--car-dark); stroke: var(--car-gap); stroke-width: .5; stroke-opacity: .7; }
.car .trim { stroke: #10161c; stroke-opacity: .55; stroke-width: 4; stroke-linecap: round; }
.car .plate { fill: #eef1f4; stroke: var(--car-gap); stroke-width: .6; }

/* lamps */
.car .lamp .lens { fill: url(#car-headlamp); stroke: var(--car-gap); stroke-width: 1.1; }
.car .lamp .led { fill: none; stroke: #ffeaa0; stroke-opacity: .9; stroke-width: 2; stroke-linecap: round; }
.car .lamp.tail .lens { fill: url(#car-taillamp); stroke: #5d1512; stroke-width: .8; stroke-opacity: .5; }
.car .lamp.tail .lens-inner { fill: #ff8a80; opacity: .5; }
.car.lights-on .lamp.head .lens { fill: #fff6d5; filter: drop-shadow(0 0 8px rgba(255, 214, 86, .95)); }
.car.lights-on .lamp.head .led { stroke: #fffdf2; stroke-opacity: 1; }
.car.lights-on .lamp.tail .lens { fill: #ff5044; filter: drop-shadow(0 0 8px rgba(255, 70, 60, .9)); }
.car.offline { opacity: .5; filter: grayscale(.55); }

.car .grille-body { fill: var(--car-grille); }
.car .grille-slats { fill: none; stroke: var(--car-grille-slat); stroke-width: 1.4; stroke-linecap: round; }
.car .grille-frame { fill: none; stroke: var(--car-chrome); stroke-width: 1.2; stroke-opacity: .6; }

/* doors */
.car .door { transform-box: view-box; transform-origin: var(--hinge-x) var(--hinge-y); }
.car .door .panel { fill: url(#car-paint); stroke: var(--car-gap); stroke-width: .9; stroke-opacity: .32; }
.car .door .panel-shade { fill: url(#car-crown); opacity: .55; }
.car .door .window { fill: var(--car-glass); stroke: var(--car-chrome); stroke-width: .7; stroke-opacity: .75; }
.car .door .window.tinted { fill: color-mix(in srgb, var(--car-glass-dark) 82%, #05090d); }
.car .door .handle { fill: var(--car-chrome); stroke: var(--car-gap); stroke-width: .5; stroke-opacity: .6; }
.car .mirror-arm { fill: url(#car-paint); stroke: var(--car-gap); stroke-width: .8; }
.car .mirror-glass { fill: var(--car-glass-dark); opacity: .85; }

.car .door.open .panel { fill: var(--car-open); stroke: var(--car-open-line); stroke-opacity: 1; stroke-width: 1.4; }
.car .door.open .panel-shade { opacity: .28; }
.car .door[data-door="fl"].open, .car .door[data-door="rl"].open {
  animation: car-door-left 900ms cubic-bezier(.22,.9,.28,1) forwards;
}
.car .door[data-door="fr"].open, .car .door[data-door="rr"].open {
  animation: car-door-right 900ms cubic-bezier(.22,.9,.28,1) forwards;
}
@keyframes car-door-left {
  0% { transform: rotate(0deg); } 72% { transform: rotate(42deg); } 100% { transform: rotate(38deg); }
}
@keyframes car-door-right {
  0% { transform: rotate(0deg); } 72% { transform: rotate(-42deg); } 100% { transform: rotate(-38deg); }
}

.car .window.open { fill: var(--car-alarm); stroke: var(--car-alarm); animation: car-window 1.7s ease-in-out infinite; }
@keyframes car-window { 0%, 100% { opacity: 1; } 50% { opacity: .42; } }

/* bonnet and tailgate */
.car .lid { transform-box: view-box; }
.car .bonnet { transform-origin: 130px 176px; }
.car .trunk { transform-origin: 130px 352px; }
.car .lid.open { animation: car-lid 820ms cubic-bezier(.22,.9,.28,1) forwards; }
.car .lid.open .paint { fill: color-mix(in srgb, var(--car-open) 82%, var(--car-paint)); }
.car .lid.open .lamp, .car .lid.open .plate, .car .lid.open .grille,
.car .lid.open .crown, .car .lid.open .glass-hi { opacity: 0; }
@keyframes car-lid { 0% { transform: scaleY(1); } 100% { transform: scaleY(.62); } }

.car .sunroof { fill: none; stroke: none; }
.car .sunroof.visible { stroke: var(--car-gap); stroke-width: 1; stroke-dasharray: 4 3; }
.car .sunroof.visible.open {
  fill: color-mix(in srgb, var(--car-alarm) 55%, transparent);
  stroke: var(--car-alarm); stroke-dasharray: none;
  animation: car-window 1.7s ease-in-out infinite;
}
`,Z4=`${E}
${D8}`;var l5={language:"auto",compact:!1,animate:!0,show_alerts:!0,show_panels:!0,show_drive:!0,show_trip:!0,show_service:!0,show_charging:!0,show_climate:!0,show_system:!0,show_extra:!1},I8=[{name:"drive",option:"show_drive",icon:"range"},{name:"trip",option:"show_trip",icon:"trip"},{name:"service",option:"show_service",icon:"service"},{name:"charging",option:"show_charging",icon:"charger"},{name:"system",option:"show_system",icon:"marker"}],s5=class extends HTMLElement{static getConfigElement(){return document.createElement(F1)}static getStubConfig(C){let H=N1(C);return{type:`custom:${X}`,device:H[0]?.id}}constructor(){super(),this.attachShadow({mode:"open"}),this._sections={},this._signatures={},this._open={},this._built=!1}setConfig(C){this._config={...l5,...C||{}},this._signatures={},this._hass&&this._render()}set hass(C){this._hass=C,this._render()}get hass(){return this._hass}connectedCallback(){this._timer=window.setInterval(()=>this._render(),6e4)}disconnectedCallback(){this._timer&&window.clearInterval(this._timer),this._timer=void 0}getCardSize(){return this._config?.compact?5:8}getGridOptions(){return{columns:12,min_columns:6,rows:"auto"}}_build(){let C=document.createElement("style");C.textContent=Z4;let H=document.createElement("ha-card"),V=document.createElement("div");V.className="wrap",V.addEventListener("click",e=>this._onClick(e)),V.addEventListener("toggle",e=>this._onToggle(e),!0);for(let e of["header","hero","alerts","panels","folds","footer"]){let t=document.createElement("div");t.dataset.section=e,this._sections[e]=t,V.appendChild(t)}H.appendChild(V),this.shadowRoot.replaceChildren(C,H),this._wrap=V,this._built=!0}_render(){if(!this._hass||!this._config)return;this._built||this._build();let C=d2(l2(this._config,this._hass)),H=v4(this._hass,this._config);if(this._model=H,!H.ok){this._renderEmpty(H,C);return}this._emptyShown=!1,this._applyHostClasses(H),this._section("header",this._headerHtml(H,C)),this._heroSection(H,C),this._section("alerts",this._config.show_alerts?this._alertsHtml(H,C):""),this._section("panels",this._config.show_panels?this._panelsHtml(H,C):""),this._section("folds",this._foldsHtml(H,C)),this._section("footer",this._footerHtml(H,C))}_renderEmpty(C,H){if(this._emptyShown!==C.reason){this._emptyShown=C.reason,this._signatures={};for(let V of Object.values(this._sections))V.innerHTML="",V.hidden=!1;this._sections.header.innerHTML=`
      <div class="empty">
        ${s("car")}
        <div>${a(H(`ui.${C.reason}`))}</div>
      </div>`}}_section(C,H){this._signatures[C]!==H&&(this._signatures[C]=H,this._sections[C].innerHTML=H,this._sections[C].hidden=!H)}_applyHostClasses(C){let H=["wrap"];this._config.compact&&H.push("compact"),this._config.animate||H.push("no-animation"),this._hass.themes?.darkMode&&H.push("dark"),H.push(`accent-${this._accent(C)}`);let V=H.join(" ");this._wrap.className!==V&&(this._wrap.className=V)}_accent(C){return C.offline?"idle":C.openCount?"paused":C.moving?"running":C.locked===!1?"paused":"ready"}_headerHtml(C,H){let V=a(C.name||H("card_name")),e=C.spec||"",t=[];C.lights&&t.push(`<span class="warn" title="${a(H("ui.lights"))}">${s("lights")}</span>`),C.offline&&t.push(`<span title="${a(H("ui.not_reachable"))}">${s("wifi_off")}</span>`);let r=C.locked===null?"":`<div class="pill" data-action="more-info" data-entity="${a(C.lockEntity||"")}">
            ${s(C.locked?"lock":"lock_open")}
            ${a(H(C.locked?"state.locked":"state.unlocked"))}
          </div>`;return`
      <div class="header">
        <div>
          <div class="title" data-action="more-info">${V}</div>
          ${e?`<div class="sub">${a(e)}</div>`:""}
        </div>
        <div class="spacer"></div>
        <div class="badges">${t.join("")}</div>
        ${r}
      </div>`}_heroSection(C,H){this._sections.hero.querySelector(".car")||(this._sections.hero.innerHTML=`
        <div class="split">
          <div class="stage" data-action="more-info">${h4()}</div>
          <div class="primary"></div>
        </div>`,this._primaryNode=this._sections.hero.querySelector(".primary"));let V=this._primaryHtml(C,H);this._signatures.primary!==V&&(this._signatures.primary=V,this._primaryNode.innerHTML=V),f4(this._sections.hero,C)}_primaryHtml(C,H){let V=[],e=C.offline?"offline":C.moving?"moving":"parked",t=[];if(C.reachable!==null&&t.push(H(C.reachable?"ui.reachable":"ui.not_reachable")),C.lights&&t.push(H("ui.lights_on")),C.chargerConnected&&t.push(H("ui.charging_plug")),C.batteryProtection&&t.push(H("ui.battery_protection")),V.push(`
      <div class="state-block">
        <div class="state-text">${a(H(`status.${e}`))}</div>
        ${t.length?`<div class="state-sub">${a(t.join(" \xB7 "))}</div>`:""}
      </div>`),C.level){let r=Math.max(0,Math.min(100,Math.round(C.level.value))),i=r<=10?" empty-tank":r<=25?" low":"",o=C.level.key==="battery_percentage"?"level":"fuel",M=C.range?.text?`<b>${r} ${a(C.level.unit)}</b> \xB7 ${a(C.range.text)}`:`<b>${r} ${a(C.level.unit)}</b>`;V.push(`
        <div class="metric${i}" data-action="more-info" data-entity="${a(C.level.entityId)}">
          <div class="top">${s(o==="level"?"battery_car":"fuel")}
            <span>${a(H(`ui.${o}`))}</span><span class="val">${M}</span></div>
          <div class="bar"><i style="width:${r}%"></i></div>
        </div>`)}else C.range?.text&&V.push(this._lineHtml("range",H("ui.range"),C.range.text,C.range.entityId));C.odometer?.text&&V.push(this._lineHtml("odometer",H("ui.odometer"),C.odometer.text,C.odometer.entityId));for(let r of C.primaryRows)V.push(this._lineHtml(r.icon,H(`primary.${r.key}`,H(`entity.${r.key}`,r.key)),r.value,r.entityId));return V.join("")}_panelsHtml(C,H){let V=(t,r)=>{if(!r.length)return"";let i=r.map(o=>`
          <div class="line" data-action="more-info" data-entity="${a(o.entityId)}">
            <span>${a(H(`panel.${o.key}`,H(`entity.${o.key}`,o.key)))}</span>
            <b>${a(o.value)}</b>
          </div>`).join("");return`
        <div class="panel">
          <h4>${a(H(`section.${t}`))}</h4>
          ${i}
        </div>`},e=[V("service",C.panels.service),V("last_trip",C.panels.trip),V("score",C.panels.score)].filter(Boolean);return e.length?`<div class="panels">${e.join("")}</div>`:""}_footerHtml(C,H){let V=C.position?.address||C.position?.zone,e=C.position?.entityId||C.entities.car_captured||"";return`${V||C.lastUpdate?`
        <div class="footer" data-action="more-info" data-entity="${a(e)}">
          <span class="k">${s("marker")}<span>${a(V||H("ui.position"))}</span></span>
          ${C.lastUpdate?`<span class="v">${a(C.lastUpdate.text)}</span>`:""}
        </div>`:""}
      <div class="readonly">${s("info")}<span>${a(H("ui.read_only"))}</span></div>`}_lineHtml(C,H,V,e){return`
      <div class="line" data-action="more-info" data-entity="${a(e||"")}">
        <span class="k">${s(C)}<span>${a(H)}</span></span>
        <span class="v">${a(V)}</span>
      </div>`}_alertsHtml(C,H){let V=[];C.offline&&V.push({severity:"info",text:H("alert.offline"),iconName:"wifi_off"});let e=i=>C.openings.filter(o=>o.open&&o.kind===i),t=e("door"),r=e("window");if(t.length>2)V.push({severity:"warning",text:H("alert.doors_open").replace("{count}",t.length),iconName:"car_door",entityId:C.entities.doors_open});else for(let i of t)V.push({severity:"warning",text:H("alert.door_open").replace("{name}",H(`opening.${i.key}`)),iconName:"car_door",entityId:i.entityId});if(r.length>2)V.push({severity:"error",text:H("alert.windows_open").replace("{count}",r.length),iconName:"window_open",entityId:C.entities.windows_open});else for(let i of r)V.push({severity:"error",text:H("alert.window_open").replace("{name}",H(`opening.${i.key}`)),iconName:"window_open",entityId:i.entityId});for(let i of e("extra"))V.push({severity:"warning",text:H(`alert.${i.key}_open`),iconName:i.key==="trunk"?"trunk":i.key==="bonnet"?"bonnet":"sunroof",entityId:i.entityId});return C.locked===!1&&V.push({severity:"warning",text:H("alert.unlocked"),iconName:"lock_open",entityId:C.lockEntity}),C.lights&&V.push({severity:"warning",text:H("alert.lights_on"),iconName:"lights",entityId:C.entities.lights}),!V.length&&C.openings.length&&V.push({severity:"ok",text:H("alert.all_closed"),iconName:"check"}),V.length?`<div class="alerts">${V.map(i=>`
        <div class="alert ${i.severity==="ok"?"info ok":i.severity}"
          data-action="more-info" data-entity="${a(i.entityId||"")}">
          ${s(i.iconName)}<span>${a(i.text)}</span>
        </div>`).join("")}</div>`:""}_foldsHtml(C,H){let V=[];for(let e of I8){if(!this._config[e.option])continue;let t=C.rows[e.name]||[],r=e.name==="system"?this._systemExtras(C,H):[];if(!t.length&&!r.length)continue;let i=[...r,...t.map(o=>this._lineHtml(o.icon,H(`entity.${o.key}`,o.key),o.value,o.entityId))].join("");V.push(this._foldHtml(e.name,e.icon,H(`section.${e.name}`),i))}if(this._config.show_climate&&C.climate){let e=[this._lineHtml("ac",H("ui.climate_state"),C.climate.state,C.climate.entityId)];C.climate.current!==null&&e.push(this._lineHtml("snowflake",H("ui.current_temp"),`${C.climate.current} ${C.climate.unit}`,C.climate.entityId)),C.climate.target!==null&&e.push(this._lineHtml("ac",H("ui.target_temp"),`${C.climate.target} ${C.climate.unit}`,C.climate.entityId)),V.push(this._foldHtml("climate","ac",H("section.climate"),e.join("")))}if(this._config.show_extra&&C.extra.length){let e=C.extra.map(t=>this._lineHtml("info",t.name,t.value??"\u2013",t.entityId)).join("");V.push(this._foldHtml("extra","info",H("section.extra"),e))}return V.join("")}_systemExtras(C,H){let V=[];return C.position&&V.push(this._lineHtml("marker",H("ui.position"),C.position.address||C.position.zone||"\u2013",C.position.entityId)),C.batteryProtection!==null&&V.push(this._lineHtml("battery_car",H("ui.battery_protection"),H(C.batteryProtection?"state.on":"state.off"),C.entities.battery_protection)),V}_foldHtml(C,H,V,e){let t=this._open[C]?" open":"";return`
      <details class="fold" data-fold="${C}"${t}>
        <summary>${s(H)}<span>${a(V)}</span>${s("chevron","icon chev")}</summary>
        <div class="body">${e}</div>
      </details>`}_onToggle(C){let H=C.target;H?.dataset?.fold&&(this._open[H.dataset.fold]=H.open)}_onClick(C){let H=C.target.closest("[data-action]");if(!H||H.dataset.action!=="more-info")return;let V=H.dataset.entity||this._model?.entities?.lock_vehicle||this._model?.entities?.mileage||this._model?.entities?.position;V&&this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:V},bubbles:!0,composed:!0}))}};function g4(){customElements.get(X)||(customElements.define(X,s5),window.customCards=window.customCards||[],window.customCards.push({type:X,name:"\u0160koda Car Card",description:"Top-view status card for \u0160koda vehicles (MySkoda): doors, windows, range, service and trips. Status only.",preview:!0,documentationURL:"https://github.com/gabor-io/ha-appliance-custom-card"}),console.info(`%c ${X} %c ${i4} `,"color:#fff;background:#0e3a2f;font-weight:700;border-radius:3px 0 0 3px","color:#0e3a2f;background:#d6f2e6;font-weight:700;border-radius:0 3px 3px 0"))}var z8=R({cardName:X,toggles:["show_alerts","show_panels","show_drive","show_trip","show_service","show_charging","show_climate","show_system","show_extra","compact","animate"],defaults:l5,listDevices:N1,getLanguage:l2,translator:d2,languages:o5});function S4(){customElements.get(F1)||customElements.define(F1,z8)}S4();g4();var C1="liebherr-fridge-card",I1="liebherr-fridge-card-editor",_4="1.21.0",y4=["top","middle","bottom"],z1={top:"top_zone",middle:"middle_zone",bottom:"bottom_zone"},f1={supercool:["super_cool","supercool","snowflake"],superfrost:["super_frost","superfrost","frost"]},W1={nightmode:["night_mode","nightmode","night"],partymode:["party_mode","partymode","party"]},Z1={icemaker:["ice_maker","icemaker","ice"],hydrobreeze:["hydro_breeze","hydrobreeze","mist"],biofresh:["bio_fresh_plus","biofresh_plus","leaf"]},b4=[2,4,5,7],d5=.6;var W8={card_name:"H\u0171t\u0151",zone:{single:"H\u0171t\u0151t\xE9r",top:"Fels\u0151 z\xF3na",middle:"K\xF6z\xE9ps\u0151 z\xF3na",bottom:"Als\xF3 z\xF3na"},mode:{supercool:"SuperCool",superfrost:"SuperFrost",nightmode:"\xC9jszakai m\xF3d",partymode:"PartyMode",light:"Bels\u0151 vil\xE1g\xEDt\xE1s"},mode_hint:{supercool:"Gyors leh\u0171t\xE9s friss bev\xE1s\xE1rl\xE1s ut\xE1n; a g\xE9p egy id\u0151 ut\xE1n mag\xE1t\xF3l kikapcsolja.",superfrost:"Gyorsfagyaszt\xE1s: a fagyaszt\xF3t\xE9r a betett \xE9tel meg\xF3v\xE1s\xE1\xE9rt m\xE9lyh\u0171t.",nightmode:"A kijelz\u0151 \xE9s a hangjelz\xE9sek elhalv\xE1nyulnak \xE9jszak\xE1ra.",partymode:"Italh\u0171t\xE9s vend\xE9gs\xE9gre: a g\xE9p er\u0151sebben h\u0171t."},select:{icemaker:"J\xE9gk\xE9sz\xEDt\u0151",hydrobreeze:"HydroBreeze",biofresh:"BioFresh-Plus"},option:{off:"Ki",on:"Be",low:"Alacsony",medium:"K\xF6zepes",high:"Magas",max_ice:"MaxIce",minus_two_minus_two:"-2 \xB0C | -2 \xB0C",minus_two_zero:"-2 \xB0C | 0 \xB0C",zero_minus_two:"0 \xB0C | -2 \xB0C",zero_zero:"0 \xB0C | 0 \xB0C"},alert:{door_open:"Az ajt\xF3 nyitva \u2013 csukd be, hogy tartsa a h\u0151m\xE9rs\xE9kletet"},status:{normal:"Norm\xE1l \xFCzem",cooling:"H\u0171t",supercool:"SuperCool",superfrost:"SuperFrost",party:"PartyMode",night:"\xC9jszakai m\xF3d"},ui:{current:"Aktu\xE1lis",target:"C\xE9l",setpoint:"Be\xE1ll\xEDtott h\u0151m\xE9rs\xE9klet",at_target:"H\u0151m\xE9rs\xE9kleten",cooling_down:"H\u0171t a be\xE1ll\xEDtott \xE9rt\xE9kre",above_target:"{diff} \xB0C-kal melegebb a be\xE1ll\xEDtottn\xE1l",below_target:"{diff} \xB0C-kal hidegebb a be\xE1ll\xEDtottn\xE1l",boosting_cool:"SuperCool: gyors leh\u0171t\xE9s fut",boosting_frost:"SuperFrost: gyorsfagyaszt\xE1s fut",modes:"\xDCzemm\xF3dok",zones:"Z\xF3n\xE1k",details:"R\xE9szletek",model:"T\xEDpus",zone_count:"Z\xF3n\xE1k sz\xE1ma",door:"AutoDoor",door_open:"Az ajt\xF3 nyitva",door_state:"Ajt\xF3",light_level:"F\xE9nyer\u0151",other:"Tov\xE1bbi entit\xE1sok",not_configured:"Nem tal\xE1lhat\xF3 Liebherr k\xE9sz\xFCl\xE9k. V\xE1laszd ki az eszk\xF6zt a k\xE1rtya be\xE1ll\xEDt\xE1saiban.",unavailable:"A k\xE9sz\xFCl\xE9k entit\xE1sai nem \xE9rhet\u0151k el.",open:"nyitva",closed:"z\xE1rva"},editor:{device:"Eszk\xF6z",device_auto:"Automatikus felismer\xE9s",name:"N\xE9v",language:"Nyelv",language_auto:"Automatikus (HA nyelve)",sections:"L\xE1that\xF3 szekci\xF3k",show_zones:"Z\xF3n\xE1k \xE9s h\u0151m\xE9rs\xE9klet-\xE1ll\xEDt\xE1s",show_modes:"\xDCzemm\xF3dok",show_selects:"BioFresh / HydroBreeze / j\xE9gk\xE9sz\xEDt\u0151",show_details:"R\xE9szletek",show_extra:"Tov\xE1bbi entit\xE1sok",compact:"Kompakt elrendez\xE9s",animate:"Anim\xE1ci\xF3k"}},G8={card_name:"Fridge",zone:{single:"Fridge",top:"Top zone",middle:"Middle zone",bottom:"Bottom zone"},mode:{supercool:"SuperCool",superfrost:"SuperFrost",nightmode:"Night mode",partymode:"PartyMode",light:"Interior light"},mode_hint:{supercool:"Rapid cooling after a big shop; the appliance turns it off again by itself.",superfrost:"Rapid freezing so fresh food keeps what is already frozen.",nightmode:"Dims the display and the alarms for the night.",partymode:"Chills drinks faster for guests."},select:{icemaker:"Ice maker",hydrobreeze:"HydroBreeze",biofresh:"BioFresh-Plus"},option:{off:"Off",on:"On",low:"Low",medium:"Medium",high:"High",max_ice:"MaxIce",minus_two_minus_two:"-2 \xB0C | -2 \xB0C",minus_two_zero:"-2 \xB0C | 0 \xB0C",zero_minus_two:"0 \xB0C | -2 \xB0C",zero_zero:"0 \xB0C | 0 \xB0C"},alert:{door_open:"The door is open - close it to keep the temperature"},status:{normal:"Running",cooling:"Cooling",supercool:"SuperCool",superfrost:"SuperFrost",party:"PartyMode",night:"Night mode"},ui:{current:"Current",target:"Target",setpoint:"Setpoint",at_target:"At temperature",cooling_down:"Cooling to the setpoint",above_target:"{diff} \xB0C above the setpoint",below_target:"{diff} \xB0C below the setpoint",boosting_cool:"SuperCool is running",boosting_frost:"SuperFrost is running",modes:"Modes",zones:"Zones",details:"Details",model:"Model",zone_count:"Zones",door:"AutoDoor",door_open:"The door is open",door_state:"Door",light_level:"Brightness",other:"Other entities",not_configured:"No Liebherr appliance found. Pick the device in the card settings.",unavailable:"The appliance entities are unavailable.",open:"open",closed:"closed"},editor:{device:"Device",device_auto:"Auto detect",name:"Name",language:"Language",language_auto:"Automatic (HA language)",sections:"Visible sections",show_zones:"Zones and temperature control",show_modes:"Modes",show_selects:"BioFresh / HydroBreeze / ice maker",show_details:"Details",show_extra:"Other entities",compact:"Compact layout",animate:"Animations"}},w4={hu:W8,en:G8},p5=Object.keys(w4);function m2(L,C){return k(L,C,p5)}function c2(L){return T(w4,L)}var A5="liebherr";function m5(L){return Object.values(L?.entities||{})}function G1(L){let C=new Map;for(let H of m5(L)){if(H.platform!==A5||!H.device_id)continue;let V=L.devices?.[H.device_id];V&&C.set(H.device_id,V.name_by_user||V.name||H.device_id)}return[...C.entries()].map(([H,V])=>({id:H,name:V}))}function U8(L,C){if(C?.device)return C.device;let H=G1(L);return H.length===1?H[0].id:null}function K8(L){let C=Object.keys(L?.states||{}).filter(H=>/^number\..+_setpoint(_temperature)?$/.test(H));return C.length!==1?null:C[0].replace(/^number\./,"").replace(/_setpoint(_temperature)?$/,"")}function j8(L,C){let H=m5(L).filter(e=>e.device_id===C&&e.platform===A5).map(e=>e.entity_id.split(".")[1]);if(!H.length)return null;let V=H[0];for(let e of H.slice(1)){let t=0;for(;t<V.length&&t<e.length&&V[t]===e[t];)t+=1;V=V.slice(0,t)}return V.replace(/_+$/,"")||null}function O4(L,C){let H=U8(L,C),V=C?.prefix||j8(L,H)||K8(L),e=C?.entities||{},t=new Set,r=m5(L).filter(m=>m.platform===A5&&(!H||m.device_id===H)),i=new Map;for(let m of r)m.translation_key&&!i.has(m.translation_key)&&i.set(m.translation_key,m.entity_id);let o=m=>m&&L?.states?.[m]?m:null,M=(m,Z,c,S)=>{let _=S?`${Z}_${z1[S]}`:Z,b=i.get(_);if(b&&b.startsWith(`${m}.`)&&o(b))return b;if(!V||!c)return null;let h=S?`${V}_${z1[S]}_${c}`:`${V}_${c}`;return o(`${m}.${h}`)},n=m=>{if(m){let c=i.get(z1[m]);return c&&c.startsWith("sensor.")&&o(c)?c:V?o(`sensor.${V}_${z1[m]}`):null}let Z=r.find(c=>c.entity_id.startsWith("sensor.")&&!c.translation_key&&L?.states?.[c.entity_id]?.attributes?.device_class==="temperature");return Z?Z.entity_id:V?o(`sensor.${V}`):null},l=m=>{let Z={position:m};Z.temp=n(m),Z.setpoint=M("number","setpoint_temperature","setpoint",m);for(let[c,[S,_]]of Object.entries(f1))Z[c]=M("switch",S,_,m);for(let[c,[S,_]]of Object.entries(Z1))Z[c]=M("select",S,_,m);return Z.autodoor=M("cover","auto_door","autodoor",m),Z},d=y4.map(l).filter(m=>m.setpoint||m.temp),p={...l(null),temp:n(null)},v=d.length?d:p.setpoint||p.temp?[p]:[],f={device:H,prefix:V,zones:v,light:M("light","presentation_light","presentation_light",null)};for(let[m,[Z,c]]of Object.entries(W1))f[m]=M("switch",Z,c,null);for(let[m,Z]of Object.entries(e)){let c=/^zone(\d)_(.+)$/.exec(m);if(c){let S=f.zones[Number(c[1])-1];S&&(S[c[2]]=Z);continue}f[m]=Z}for(let m of f.zones)for(let Z of Object.values(m))typeof Z=="string"&&t.add(Z);for(let m of["light",...Object.keys(W1)])f[m]&&t.add(f[m]);return f.extra=r.map(m=>m.entity_id).filter(m=>!t.has(m)&&L?.states?.[m]).sort(),f}function T4(L){if(x(L))return null;let C=Number(L.state);return Number.isFinite(C)?C:null}function c5(L){return x(L)?null:L.state==="on"}function Q8(L){if(!L||x(L))return null;let C=L.attributes||{};return{value:T4(L),min:Number.isFinite(C.min)?C.min:2,max:Number.isFinite(C.max)?C.max:9,step:Number.isFinite(C.step)&&C.step>0?C.step:1,unit:C.unit_of_measurement||"\xB0C"}}function k4(L){if(!L||x(L))return null;let C=String(L.state).toLowerCase();return["on","open","opening"].includes(C)?!0:["off","closed","closing"].includes(C)?!1:null}function q8(L){if(!L||x(L))return null;let C=L.attributes?.options;return{state:L.state,options:Array.isArray(C)?C:[]}}function Y8(L,C,H){if(C?.name)return C.name;let V=H.device?L.devices?.[H.device]:null;return V?V.name_by_user||V.name:(H.zones[0]?.temp?L.states[H.zones[0].temp]:null)?.attributes?.friendly_name||null}function X8(L,C,H){if(C?.subtitle!==void 0)return C.subtitle||null;let V=H.device?L.devices?.[H.device]:null;return V&&(V.model_id||V.model)||null}function E4(L,C){let H=O4(L,C),V=n=>n?L.states[n]:void 0;if(!H.zones.length)return{ok:!1,reason:H.device||H.prefix?"unavailable":"not_configured",entities:H};let e=H.zones.map((n,l)=>{let d=Q8(V(n.setpoint)),p=T4(V(n.temp)),v=V(n.temp)?.attributes?.unit_of_measurement||d?.unit||"\xB0C",f=d?.value??null,m={};for(let c of Object.keys(f1))m[c]=n[c]?{entityId:n[c],on:c5(V(n[c]))}:null;let Z={};for(let c of Object.keys(Z1))Z[c]=n[c]?{entityId:n[c],...q8(V(n[c]))}:null;return{index:l,position:n.position,entityIds:n,current:p,target:f,unit:v,setpoint:d,switches:m,selects:Z,autodoor:n.autodoor?{entityId:n.autodoor,state:V(n.autodoor)?.state}:null,door:(()=>{let c=n.door||n.autodoor;return c?{entityId:c,open:k4(V(c))}:null})(),warming:p!==null&&f!==null?p-f>d5:!1,atTarget:p!==null&&f!==null?Math.abs(p-f)<=d5:null}}),t={};for(let n of Object.keys(W1))t[n]=H[n]?{entityId:H[n],on:c5(V(H[n]))}:null;let r=H.door?{entityId:H.door,open:k4(V(H.door))}:null,i=e.map((n,l)=>({index:l,zone:n})).filter(({zone:n})=>n.door?.open===!0);r?.open===!0&&!i.length&&i.push({index:0,zone:e[0]});let o=V(H.light),M=e.some(n=>n.switches.supercool?.on||n.switches.superfrost?.on);return{ok:!0,entities:H,name:Y8(L,C,H),model:X8(L,C,H),zones:e,modes:t,light:o?{entityId:H.light,on:c5(o),brightness:o.attributes?.brightness??null}:null,boosting:M,door:r,openDoors:i.map(({index:n})=>n),doorOpen:i.length>0,nightMode:t.nightmode?.on===!0,partyMode:t.partymode?.on===!0,cooling:M||e.some(n=>n.warming),extra:(H.extra||[]).map(n=>({entityId:n,name:L.states[n]?.attributes?.friendly_name||n,state:L.states[n]?.state}))}}function J8(L){let C=Math.min(Math.max(L,1),3),H=C===1?[1]:C===2?[1.55,1]:[1.4,1,1],V=H.reduce((i,o)=>i+o,0),e=248-6*(C-1),t=[],r=8;for(let i of H){let o=e*i/V;t.push({y:r,height:o}),r+=o+6}return t}function CC(L,C){let{y:H,height:V}=L,e={x:34,y:H+22,w:108,h:V-36};return`
  <g class="compartment" data-zone="${C}">
    <g class="interior" clip-path="url(#fridge-inner-${C})">
      <rect class="cavity" x="${e.x}" y="${e.y}" width="${e.w}" height="${e.h}" rx="5"/>
      <rect class="glow" x="${e.x}" y="${e.y}" width="${e.w}" height="${e.h}" rx="5"/>
      <g class="shelves">
        ${[.3,.56].map(t=>`<rect x="${e.x+6}" y="${(e.y+e.h*t).toFixed(1)}" width="${e.w-12}" height="3" rx="1.5"/>`).join("")}
        <rect class="drawer" x="${e.x+6}" y="${(e.y+e.h*.76).toFixed(1)}"
          width="${e.w-12}" height="${(e.h*.2).toFixed(1)}" rx="3"/>
      </g>
      <g class="airflow">
        ${[.2,.45,.7].map((t,r)=>`<path style="--delay:${r*.5}s" d="M${e.x+14} ${(e.y+e.h*t).toFixed(1)} h${e.w-28}"/>`).join("")}
      </g>
      <g class="flakes">
        ${[[.28,.18],[.62,.12],[.45,.42],[.78,.3]].map(([t,r],i)=>`<g transform="translate(${(e.x+e.w*t).toFixed(1)} ${(e.y+e.h*r).toFixed(1)})">
                 <g class="flake" style="--delay:${i*.7}s">
                   <path d="M0 -4 V4 M-3.5 -2 L3.5 2 M-3.5 2 L3.5 -2"/>
                 </g>
               </g>`).join("")}
      </g>
    </g>
    <rect class="inner-frame" x="${e.x}" y="${e.y}" width="${e.w}" height="${e.h}" rx="5"/>
  </g>`}function HC(L,C,H){let{y:V,height:e}=L,t={x:34,y:V+22,w:108,h:e-36},r=C===0;return`
  <g class="door" data-zone="${C}" style="--hinge-y:${(V+e/2).toFixed(1)}px">
    <rect class="door-panel" x="22" y="${V}" width="156" height="${e}" rx="8"/>
    <rect class="door-shade" x="22" y="${V}" width="156" height="${e}" rx="8"/>
    <rect class="door-inset" x="${t.x}" y="${t.y}" width="${t.w}" height="${t.h}" rx="5"/>

    ${r?`<g class="display">
             <rect class="display-body" x="${t.x}" y="${V+7}" width="${t.w}" height="12" rx="3"/>
             <text class="display-text" x="${t.x+t.w/2}" y="${V+16.4}" text-anchor="middle">--</text>
             <circle class="display-led" cx="${t.x+7}" cy="${V+13}" r="2"/>
           </g>`:""}

    <rect class="handle" x="150" y="${V+12}" width="7" height="${Math.max(24,e-30)}" rx="3.5"/>
    ${H>1&&C<H-1?`<path class="seam" d="M22 ${(V+e+6/2).toFixed(1)} H178"/>`:""}
  </g>`}function R4(L=1){let C=J8(L),H=C.map((V,e)=>`<clipPath id="fridge-inner-${e}"><rect x="34" y="${V.y+22}" width="108" height="${V.height-36}" rx="5"/></clipPath>`).join("");return`
<svg class="fridge" viewBox="0 0 200 264" role="img" aria-hidden="true" data-zones="${C.length}">
  <defs>
    ${H}
    <linearGradient id="fridge-body" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="var(--fr-body-dark)"/>
      <stop offset=".22" stop-color="var(--fr-body)"/>
      <stop offset=".45" stop-color="var(--fr-body-light)"/>
      <stop offset=".78" stop-color="var(--fr-body)"/>
      <stop offset="1" stop-color="var(--fr-body-dark)"/>
    </linearGradient>
    <linearGradient id="fridge-door-shade" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#05080b" stop-opacity=".18"/>
      <stop offset=".3" stop-color="#ffffff" stop-opacity=".1"/>
      <stop offset=".65" stop-color="#ffffff" stop-opacity=".02"/>
      <stop offset="1" stop-color="#05080b" stop-opacity=".2"/>
    </linearGradient>
    <linearGradient id="fridge-cavity" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="var(--fr-cavity-light)"/>
      <stop offset="1" stop-color="var(--fr-cavity)"/>
    </linearGradient>
    <radialGradient id="fridge-glow" cx="50%" cy="10%" r="90%">
      <stop offset="0" stop-color="#ffe9b0" stop-opacity=".85"/>
      <stop offset="100%" stop-color="#ffd27a" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <ellipse class="shadow" cx="100" cy="258" rx="78" ry="8"/>
  <rect class="cabinet" x="16" y="4" width="168" height="256" rx="11"/>
  ${C.map((V,e)=>CC(V,e)).join("")}
  ${C.map((V,e)=>HC(V,e,C.length)).join("")}
  <g class="feet"><rect x="26" y="258" width="14" height="5" rx="2"/><rect x="160" y="258" width="14" height="5" rx="2"/></g>
</svg>`}function P4(L,C){let H=L.querySelector(".display-text");H&&H.textContent!==C&&(H.textContent=C)}var VC=`
:host {
  --fr-body: #d7dce2;
  --fr-body-light: #f1f4f7;
  --fr-body-dark: #a8b1ba;
  --fr-line: rgba(20, 26, 32, .28);
  --fr-cavity: #c9d6de;
  --fr-cavity-light: #e8eef2;
  --fr-shelf: rgba(255, 255, 255, .75);
  --fr-cold: #4fc3f7;
  --fr-display: #0d1b24;
  --ap-hero: 132px;
}
.wrap.dark {
  --fr-body: #8d959e;
  --fr-body-light: #b3bbc3;
  --fr-body-dark: #666e76;
  --fr-line: rgba(5, 8, 11, .5);
  --fr-cavity: #5d6f7a;
  --fr-cavity-light: #7f939f;
  --fr-shelf: rgba(255, 255, 255, .55);
}

/* the select sections put their icon in the title */
.section-title { display: flex; align-items: center; gap: 6px; }
.section-title .icon { width: 15px; height: 15px; flex: 0 0 auto; }

/* ---------- zones ---------- */
.zones { display: grid; gap: 10px; }
.zone {
  display: grid; gap: 8px; padding: 10px 12px; border-radius: 14px;
  background: color-mix(in srgb, var(--ap-text) 5%, transparent);
}
.zone .zone-head { display: flex; align-items: center; gap: 8px; font-size: .78rem; color: var(--ap-muted); }
.zone .zone-head .icon { width: 16px; height: 16px; }
.zone .zone-head .now { margin-left: auto; color: var(--ap-text); font-weight: 650; font-variant-numeric: tabular-nums; }
.zone .zone-head .now b { font-size: 1.05rem; }
.zone .row { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
.zone .target { font-size: 1.15rem; font-weight: 700; color: var(--ap-text); font-variant-numeric: tabular-nums; }
.zone .target small { font-size: .72rem; font-weight: 600; color: var(--ap-muted); margin-left: 3px; }
.zone .hint { font-size: .72rem; color: var(--ap-muted); }
.zone.at-target .hint { color: var(--success-color, #43a047); }

/* ---------- hero status ---------- */
.reading { display: flex; align-items: baseline; gap: 10px; flex-wrap: wrap; }
.reading .value { font-size: 2.2rem; font-weight: 750; letter-spacing: -.02em; line-height: 1; color: var(--ap-accent); font-variant-numeric: tabular-nums; }
.compact .reading .value { font-size: 1.7rem; }
.reading .unit { font-size: 1rem; font-weight: 650; color: var(--ap-muted); }
.reading .aim { font-size: .82rem; color: var(--ap-muted); display: inline-flex; align-items: center; gap: 4px; }
.reading .aim .icon { width: 14px; height: 14px; }

/* ---------- appliance illustration ---------- */
.fridge { width: 100%; height: auto; overflow: visible; }
.fridge .shadow { fill: rgba(10, 16, 22, .18); }
.fridge .cabinet { fill: var(--fr-body-dark); stroke: var(--fr-line); stroke-width: 1.2; }
.fridge .door-panel { fill: url(#fridge-body); stroke: var(--fr-line); stroke-width: 1; }
.fridge .door-shade { fill: url(#fridge-door-shade); }
.fridge .handle { fill: var(--fr-body-dark); stroke: var(--fr-line); stroke-width: .8; }
.fridge .seam { stroke: var(--fr-line); stroke-width: 1.4; opacity: .6; }
.fridge .feet rect { fill: var(--fr-body-dark); }
.fridge .cavity { fill: url(#fridge-cavity); }
.fridge .door-inset { fill: color-mix(in srgb, var(--fr-body) 88%, #ffffff); opacity: .9; }
.fridge .inner-frame { fill: none; stroke: var(--fr-line); stroke-width: 1; opacity: .7; }
.fridge .shelves rect { fill: var(--fr-shelf); }
.fridge .shelves .drawer { fill: color-mix(in srgb, var(--fr-cavity) 55%, #ffffff); opacity: .85; }
.fridge .glow { fill: url(#fridge-glow); opacity: 0; transition: opacity .4s ease; }
.fridge.light-on .glow { opacity: 1; }

.fridge .display-body { fill: var(--fr-display); }
.fridge .display-text {
  fill: var(--fr-cold); font-size: 9px; font-weight: 700; font-variant-numeric: tabular-nums;
  font-family: var(--paper-font-body1_-_font-family, inherit);
}
.fridge .display-led { fill: var(--fr-cold); opacity: .9; }
.fridge.night .display-text, .fridge.night .display-led { opacity: .35; }

.fridge .airflow path {
  stroke: var(--fr-cold); stroke-width: 2; stroke-linecap: round; fill: none;
  opacity: 0; stroke-dasharray: 10 14;
}
.fridge.cooling .airflow path {
  animation: fridge-air 2.6s linear infinite; animation-delay: var(--delay, 0s);
}
@keyframes fridge-air {
  0% { opacity: 0; stroke-dashoffset: 0; }
  30% { opacity: .5; }
  100% { opacity: 0; stroke-dashoffset: -48; }
}

.fridge .flake path { stroke: #ffffff; stroke-width: 1.4; stroke-linecap: round; }
.fridge .flake { opacity: 0; }
.fridge.boost .flake {
  animation: fridge-flake 3.2s ease-in-out infinite; animation-delay: var(--delay, 0s);
}
@keyframes fridge-flake {
  0% { opacity: 0; transform: translateY(-6px) rotate(0deg); }
  25% { opacity: .9; }
  100% { opacity: 0; transform: translateY(18px) rotate(160deg); }
}
.fridge.boost .cavity { fill: color-mix(in srgb, var(--fr-cold) 22%, var(--fr-cavity)); }
.fridge.night .door-panel { filter: brightness(.9); }

/* an open door swings towards the viewer around its left hinge */
.fridge .door { transform-box: view-box; transform-origin: 22px var(--hinge-y); }
.fridge .door.open {
  animation: fridge-door 900ms cubic-bezier(.22, .9, .28, 1) forwards;
  filter: drop-shadow(6px 0 8px rgba(10, 16, 22, .35));
}
@keyframes fridge-door {
  0% { transform: scaleX(1) skewY(0deg); }
  70% { transform: scaleX(.34) skewY(1.6deg); }
  100% { transform: scaleX(.4) skewY(1.2deg); }
}
.fridge.door-open .cavity { fill: color-mix(in srgb, var(--fr-cavity) 78%, #ffffff); }
`,B4=`${E}
${VC}`;var x5={language:"auto",compact:!1,animate:!0,show_zones:!0,show_modes:!0,show_selects:!0,show_details:!0,show_extra:!1},u5={supercool:"snowflake",superfrost:"frost",nightmode:"night",partymode:"party"},eC={icemaker:"ice",hydrobreeze:"mist",biofresh:"leaf"},v5=class extends HTMLElement{static getConfigElement(){return document.createElement(I1)}static getStubConfig(C){let H=G1(C);return{type:`custom:${C1}`,device:H[0]?.id}}constructor(){super(),this.attachShadow({mode:"open"}),this._sections={},this._signatures={},this._built=!1}setConfig(C){this._config={...x5,...C||{}},this._signatures={},this._hass&&this._render()}set hass(C){this._hass=C,this._render()}get hass(){return this._hass}getCardSize(){return this._config?.compact?4:7}getGridOptions(){return{columns:12,min_columns:6,rows:"auto"}}_build(){let C=document.createElement("style");C.textContent=B4;let H=document.createElement("ha-card"),V=document.createElement("div");V.className="wrap",V.addEventListener("click",e=>this._onClick(e));for(let e of["header","hero","alerts","zones","modes","selects","details"]){let t=document.createElement("div");t.dataset.section=e,this._sections[e]=t,V.appendChild(t)}H.appendChild(V),this.shadowRoot.replaceChildren(C,H),this._wrap=V,this._built=!0}_render(){if(!this._hass||!this._config)return;this._built||this._build();let C=c2(m2(this._config,this._hass)),H=E4(this._hass,this._config);if(this._model=H,!H.ok){this._renderEmpty(H,C);return}this._emptyShown=!1,this._applyHostClasses(H),this._section("header",this._headerHtml(H,C)),this._heroSection(H,C),this._section("alerts",this._alertsHtml(H,C)),this._section("zones",this._config.show_zones?this._zonesHtml(H,C):""),this._section("modes",this._config.show_modes?this._modesHtml(H,C):""),this._section("selects",this._config.show_selects?this._selectsHtml(H,C):""),this._section("details",this._detailsHtml(H,C))}_renderEmpty(C,H){if(this._emptyShown!==C.reason){this._emptyShown=C.reason,this._signatures={};for(let V of Object.values(this._sections))V.innerHTML="",V.hidden=!1;this._sections.header.innerHTML=`
      <div class="empty">
        ${s("fridge")}
        <div>${a(H(`ui.${C.reason}`))}</div>
      </div>`}}_section(C,H){this._signatures[C]!==H&&(this._signatures[C]=H,this._sections[C].innerHTML=H,this._sections[C].hidden=!H)}_applyHostClasses(C){let H=["wrap"];this._config.compact&&H.push("compact"),this._config.animate||H.push("no-animation"),this._hass.themes?.darkMode&&H.push("dark"),H.push(`accent-${this._accent(C)}`);let V=H.join(" ");this._wrap.className!==V&&(this._wrap.className=V)}_accent(C){return C.boosting?"running":C.nightMode?"idle":C.cooling?"running":"ready"}_status(C){return C.zones.some(H=>H.switches.superfrost?.on)?"superfrost":C.zones.some(H=>H.switches.supercool?.on)?"supercool":C.partyMode?"party":C.nightMode?"night":C.cooling?"cooling":"normal"}_headerHtml(C,H){let V=[];C.doorOpen&&V.push(`<span class="warn" title="${a(H("ui.door_open"))}">${s("door")}</span>`),C.nightMode&&V.push(`<span title="${a(H("mode.nightmode"))}">${s("night")}</span>`),C.partyMode&&V.push(`<span title="${a(H("mode.partymode"))}">${s("party")}</span>`),C.light?.on&&V.push(`<span title="${a(H("mode.light"))}">${s("bulb")}</span>`);let e=this._status(C);return`
      <div class="header">
        <div>
          <div class="title" data-action="more-info">${a(C.name||H("card_name"))}</div>
          ${C.model?`<div class="sub">${a(C.model)}</div>`:""}
        </div>
        <div class="spacer"></div>
        <div class="badges">${V.join("")}</div>
        <div class="pill">${s(e==="night"?"night":e==="party"?"party":"snowflake")}
          ${a(H(`status.${e}`))}</div>
      </div>`}_alertsHtml(C,H){if(!C.doorOpen)return"";let V=C.door?.entityId||C.zones[C.openDoors[0]]?.door?.entityId||"",e=C.zones.length>1&&C.openDoors.length?` \xB7 ${H(`zone.${C.zones[C.openDoors[0]].position||"single"}`)}`:"";return`
      <div class="alerts">
        <div class="alert pulse" data-action="more-info" data-entity="${a(V)}">
          ${s("door")}<span>${a(H("alert.door_open")+e)}</span>
        </div>
      </div>`}_heroSection(C,H){let V=C.zones.length;(!this._sections.hero.querySelector(".fridge")||this._zoneCount!==V)&&(this._zoneCount=V,this._sections.hero.innerHTML=`
        <div class="hero">
          <div class="fridge-wrap" data-action="more-info">${R4(V)}</div>
          <div class="status"></div>
        </div>`,this._statusNode=this._sections.hero.querySelector(".status"),this._signatures.status=void 0);let e=this._statusHtml(C,H);this._signatures.status!==e&&(this._signatures.status=e,this._statusNode.innerHTML=e);let t=this._sections.hero.querySelector(".fridge");t&&(t.classList.toggle("cooling",C.cooling),t.classList.toggle("boost",C.boosting),t.classList.toggle("night",C.nightMode),t.classList.toggle("light-on",!!C.light?.on),t.classList.toggle("door-open",C.doorOpen),t.querySelectorAll(".door").forEach(i=>{i.classList.toggle("open",C.openDoors.includes(Number(i.dataset.zone)))}));let r=C.zones[0];P4(this._sections.hero,r?.current!==null&&r?.current!==void 0?`${g(r.current,0)}\xB0`:"--")}_statusHtml(C,H){let V=C.zones[0],e=[];if(V?.current!==null&&V?.current!==void 0){let i=V.target!==null?`<span class="aim">${s("target")}${a(H("ui.target"))} ${g(V.target,0)} ${a(V.unit)}</span>`:"";e.push(`
        <div class="reading">
          <span class="value">${g(V.current,1)}</span>
          <span class="unit">${a(V.unit)}</span>
          ${i}
        </div>`)}let t=this._zoneHint(V,H);t&&e.push(`<div class="phase-text">${a(t)}</div>`);let r=[];for(let i of C.zones)for(let[o,M]of Object.entries(i.switches))M?.on&&r.push(`<span class="fact">${s(u5[o])}${a(H(`mode.${o}`))}${C.zones.length>1?` \xB7 ${a(H(`zone.${i.position||"single"}`))}`:""}</span>`);return C.nightMode&&r.push(`<span class="fact">${s("night")}${a(H("mode.nightmode"))}</span>`),r.length&&e.push(`<div class="facts">${r.join("")}</div>`),e.join("")}_zoneHint(C,H){if(!C||C.current===null||C.target===null)return"";if(C.switches.supercool?.on)return H("ui.boosting_cool");if(C.switches.superfrost?.on)return H("ui.boosting_frost");if(C.atTarget)return H("ui.at_target");let V=C.current-C.target;return V>0?H("ui.above_target").replace("{diff}",g(V,1)):H("ui.below_target").replace("{diff}",g(-V,1))}_zonesHtml(C,H){let V=C.zones.map((e,t)=>{let r=H(`zone.${e.position||"single"}`),i=C.zones.length>1,o=i&&e.current!==null?`<span class="now"><b>${g(e.current,1)}</b> ${a(e.unit)}</span>`:"",M=e.setpoint,n=M?`
          <div class="row">
            <button class="step-btn" type="button" data-action="step" data-zone="${t}" data-dir="-1"
              ${M.value!==null&&M.value<=M.min?"disabled":""}>\u2212</button>
            <div class="target">${M.value!==null?g(M.value,0):"\u2013"}<small>${a(M.unit)}</small></div>
            <button class="step-btn" type="button" data-action="step" data-zone="${t}" data-dir="1"
              ${M.value!==null&&M.value>=M.max?"disabled":""}>+</button>
            <div class="spacer"></div>
            <div class="chips">${this._presetsHtml(e,t)}</div>
          </div>`:"",l=i?this._zoneHint(e,H):"";return`
        <div class="zone ${e.atTarget?"at-target":""}">
          <div class="zone-head">${s("temperature")}<span>${a(i?r:H("ui.setpoint"))}</span>${o}</div>
          ${n}
          ${l?`<div class="hint">${a(l)}</div>`:""}
        </div>`});return V.length?`
      <div class="section">
        ${C.zones.length>1?`<div class="section-title">${a(H("ui.zones"))}</div>`:""}
        <div class="zones">${V.join("")}</div>
      </div>`:""}_presetsHtml(C,H){let V=C.setpoint;return V?b4.filter(e=>e>=V.min&&e<=V.max).map(e=>`
        <button class="chip" type="button" data-action="set" data-zone="${H}" data-value="${e}"
          aria-pressed="${V.value===e}">${e}\xB0</button>`).join(""):""}_modesHtml(C,H){let V=[];C.zones.forEach((e,t)=>{for(let r of Object.keys(f1)){let i=e.switches[r];if(!i)continue;let o=C.zones.length>1?`${H(`mode.${r}`)} \xB7 ${H(`zone.${e.position||"single"}`)}`:H(`mode.${r}`);V.push(`
          <button class="chip" type="button" data-action="toggle" data-entity="${a(i.entityId)}"
            aria-pressed="${i.on===!0}" title="${a(H(`mode_hint.${r}`,""))}">
            ${s(u5[r])}<span>${a(o)}</span></button>`)}});for(let e of["nightmode","partymode"]){let t=C.modes[e];t&&V.push(`
        <button class="chip" type="button" data-action="toggle" data-entity="${a(t.entityId)}"
          aria-pressed="${t.on===!0}" title="${a(H(`mode_hint.${e}`,""))}">
          ${s(u5[e])}<span>${a(H(`mode.${e}`))}</span></button>`)}return C.light&&V.push(`
        <button class="chip" type="button" data-action="toggle" data-entity="${a(C.light.entityId)}"
          aria-pressed="${C.light.on===!0}">
          ${s("bulb")}<span>${a(H("mode.light"))}</span></button>`),V.length?`
      <div class="section">
        <div class="section-title">${a(H("ui.modes"))}</div>
        <div class="chips">${V.join("")}</div>
      </div>`:""}_selectsHtml(C,H){let V=[];for(let e of C.zones)for(let t of Object.keys(Z1)){let r=e.selects[t];if(!r||!r.options.length)continue;let i=C.zones.length>1?`${H(`select.${t}`)} \xB7 ${H(`zone.${e.position||"single"}`)}`:H(`select.${t}`),o=r.options.map(M=>`
            <button class="chip" type="button" data-action="select" data-entity="${a(r.entityId)}"
              data-value="${a(M)}" aria-pressed="${r.state===M}">
              ${a(H(`option.${M}`,M))}</button>`).join("");V.push(`
          <div class="section">
            <div class="section-title">${s(eC[t])} ${a(i)}</div>
            <div class="chips">${o}</div>
          </div>`)}return V.join("")}_detailsHtml(C,H){let V=[],e=(t,r,i)=>{r==null||r===""||V.push(`
        <div class="detail">
          <span class="k">${a(H(`ui.${t}`,t))}</span>
          <span class="v">${s(i)}${a(String(r))}</span>
        </div>`)};if(this._config.show_details){C.zones.length>1&&e("zone_count",C.zones.length,"fridge");for(let t of C.zones)t.autodoor?.state&&e("door",H(t.autodoor.state==="open"?"ui.open":"ui.closed"),"door");C.light?.brightness!==null&&C.light?.brightness!==void 0&&e("light_level",`${Math.round(C.light.brightness/255*100)} %`,"bulb")}if(this._config.show_extra)for(let t of C.extra)V.push(`
          <div class="detail" data-action="more-info" data-entity="${a(t.entityId)}">
            <span class="k">${a(t.name)}</span>
            <span class="v">${s("info")}${a(String(t.state??"\u2013"))}</span>
          </div>`);return V.length?`
      <div class="section">
        <div class="section-title">${a(H("ui.details"))}</div>
        <div class="details">${V.join("")}</div>
      </div>`:""}_onClick(C){let H=C.target.closest("[data-action]");if(!H||H.hasAttribute("disabled"))return;let{action:V,entity:e,value:t,zone:r,dir:i}=H.dataset,o=this._model;if(!(!o?.ok&&V!=="more-info"))switch(V){case"more-info":this._moreInfo(e||o?.zones?.[0]?.entityIds?.temp);break;case"toggle":this._haptic("light"),this._call(e.split(".")[0],"toggle",{entity_id:e});break;case"select":this._haptic("light"),this._call("select","select_option",{entity_id:e,option:t});break;case"step":this._step(Number(r),Number(i));break;case"set":this._setTemperature(Number(r),Number(t));break;default:break}}_step(C,H){let V=this._model?.zones?.[C]?.setpoint;if(!V)return;let e=V.value??V.min,t=Math.min(V.max,Math.max(V.min,e+H*V.step));t!==e&&this._setTemperature(C,t)}_setTemperature(C,H){let V=this._model?.zones?.[C];if(!V?.setpoint||!V.entityIds.setpoint)return;let e=Math.min(V.setpoint.max,Math.max(V.setpoint.min,H));this._haptic("light"),this._call("number","set_value",{entity_id:V.entityIds.setpoint,value:e})}_call(C,H,V){return V.entity_id?this._hass.callService(C,H,V):Promise.resolve()}_moreInfo(C){C&&this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:C},bubbles:!0,composed:!0}))}_haptic(C){this.dispatchEvent(new CustomEvent("haptic",{detail:C,bubbles:!0,composed:!0}))}};function $4(){customElements.get(C1)||(customElements.define(C1,v5),window.customCards=window.customCards||[],window.customCards.push({type:C1,name:"Liebherr Fridge Card",description:"Card for Liebherr fridges and freezers: temperature per zone, SuperCool / SuperFrost, night mode and BioFresh.",preview:!0,documentationURL:"https://github.com/gabor-io/ha-appliance-custom-card"}),console.info(`%c ${C1} %c ${_4} `,"color:#fff;background:#0b6ea8;font-weight:700;border-radius:3px 0 0 3px","color:#0b6ea8;background:#e1f3fb;font-weight:700;border-radius:0 3px 3px 0"))}var LC=R({cardName:C1,toggles:["show_zones","show_modes","show_selects","show_details","show_extra","compact","animate"],defaults:x5,listDevices:G1,getLanguage:m2,translator:c2,languages:p5});function F4(){customElements.get(I1)||customElements.define(I1,LC)}F4();$4();var H1="fisher-erv-card",U1="fisher-erv-card-editor",N4="1.21.0",u2=[{key:"manual",option:"Manual",icon:"manual"},{key:"auto",option:"auto",icon:"auto"},{key:"sleep",option:"sleep",icon:"sleep"},{key:"pure_l",option:"Pure L",icon:"leaf"},{key:"pure_m",option:"Pure M",icon:"leaf"},{key:"pure_h",option:"Pure H",icon:"leaf"}],v2=[{key:"supply",icon:"supply"},{key:"exhaust",icon:"exhaust"}],D4=[{max:600,level:"excellent"},{max:800,level:"good"},{max:1e3,level:"fair"},{max:1400,level:"poor"},{max:1/0,level:"bad"}],I4=[{max:10,level:"excellent"},{max:15,level:"good"},{max:25,level:"fair"},{max:50,level:"poor"},{max:1/0,level:"bad"}],z4=1,W4=14;var tC={card_name:"Szell\u0151ztet\u0151",preset:{manual:"K\xE9zi",auto:"Automata",sleep:"Alv\xF3",pure_l:"Pure L",pure_m:"Pure M",pure_h:"Pure H"},preset_hint:{manual:"A k\xE9t ventil\xE1tor fordulatsz\xE1m\xE1t te \xE1ll\xEDtod.",auto:"A g\xE9p a m\xE9rt CO\u2082 alapj\xE1n szab\xE1lyoz.",sleep:"Halk \xE9jszakai \xFCzem, minim\xE1lis fordulatsz\xE1mon.",pure_l:"Tiszt\xEDt\xE1s alacsony fokozaton.",pure_m:"Tiszt\xEDt\xE1s k\xF6zepes fokozaton.",pure_h:"Tiszt\xEDt\xE1s magas fokozaton."},level:{excellent:"Kiv\xE1l\xF3",good:"J\xF3",fair:"Megfelel\u0151",poor:"M\xE9rs\xE9kelt",bad:"Rossz"},alert:{problem:"A k\xE9sz\xFCl\xE9k hib\xE1t jelez",problem_code:"A k\xE9sz\xFCl\xE9k hib\xE1t jelez (k\xF3d: {code})",filter_due:"A sz\u0171r\u0151 \xE9lettartama lej\xE1r: {days} nap van h\xE1tra",filter_over:"A sz\u0171r\u0151 \xE9lettartama lej\xE1rt \u2013 cser\xE9ld ki, majd null\xE1zd",co2_high:"Magas CO\u2082-szint: {value} ppm \u2013 \xE9rdemes szell\u0151ztetni",offline:"A k\xE9sz\xFCl\xE9k nem v\xE1laszol \u2013 ezek nem friss adatok"},ui:{co2:"Sz\xE9n-dioxid",not_sampling:"\xC1ll\xF3 g\xE9pn\xE9l nem m\xE9r",pm25:"Sz\xE1ll\xF3 por (PM2,5)",temperature:"H\u0151m\xE9rs\xE9klet",humidity:"P\xE1ratartalom",modes:"\xDCzemm\xF3dok",speeds:"Fordulatsz\xE1m",supply:"Bef\xFAv\xE1s",exhaust:"Elsz\xEDv\xE1s",filter:"Sz\u0171r\u0151",filter_left:"H\xE1tral\xE9v\u0151 \xE9lettartam",filter_lifespan:"Sz\u0171r\u0151 \xE9lettartama",filter_reset:"Sz\u0171r\u0151 null\xE1z\xE1sa",details:"R\xE9szletek",other:"Tov\xE1bbi entit\xE1sok",off:"Kikapcsolva",on:"M\u0171k\xF6dik",offline:"Nem el\xE9rhet\u0151",power_on:"Bekapcsol\xE1s",power_off:"Kikapcsol\xE1s",not_configured:"Nem tal\xE1lhat\xF3 Tuya szell\u0151ztet\u0151. V\xE1laszd ki az eszk\xF6zt a k\xE1rtya be\xE1ll\xEDt\xE1saiban.",unavailable:"A k\xE9sz\xFCl\xE9k entit\xE1sai nem \xE9rhet\u0151k el.",days:"nap",no_pm25:"A k\xE9sz\xFCl\xE9k nem k\xFCld PM2,5 \xE9rt\xE9ket"},editor:{device:"Eszk\xF6z",device_auto:"Automatikus felismer\xE9s",name:"N\xE9v",language:"Nyelv",language_auto:"Automatikus (HA nyelve)",sections:"L\xE1that\xF3 szekci\xF3k",show_air:"Leveg\u0151min\u0151s\xE9g",show_pm25:"PM2,5 csempe",show_modes:"\xDCzemm\xF3dok",show_speeds:"Fordulatsz\xE1mok",show_filter:"Sz\u0171r\u0151",show_extra:"Tov\xE1bbi entit\xE1sok",compact:"Kompakt elrendez\xE9s",animate:"Anim\xE1ci\xF3k"}},rC={card_name:"Ventilator",preset:{manual:"Manual",auto:"Auto",sleep:"Sleep",pure_l:"Pure L",pure_m:"Pure M",pure_h:"Pure H"},preset_hint:{manual:"You set both fan speeds yourself.",auto:"The appliance follows the measured CO\u2082.",sleep:"Quiet night mode at the lowest speed.",pure_l:"Cleaning at low speed.",pure_m:"Cleaning at medium speed.",pure_h:"Cleaning at high speed."},level:{excellent:"Excellent",good:"Good",fair:"Fair",poor:"Poor",bad:"Bad"},alert:{problem:"The appliance reports a fault",problem_code:"The appliance reports a fault (code {code})",filter_due:"Filter life is running out: {days} days left",filter_over:"Filter life is over - replace it and reset the counter",co2_high:"High CO\u2082: {value} ppm - time to ventilate",offline:"The appliance is not responding - these readings are not current"},ui:{co2:"Carbon dioxide",not_sampling:"Not sampling while stopped",pm25:"Particulates (PM2.5)",temperature:"Temperature",humidity:"Humidity",modes:"Modes",speeds:"Fan speed",supply:"Supply",exhaust:"Exhaust",filter:"Filter",filter_left:"Life left",filter_lifespan:"Filter lifespan",filter_reset:"Reset filter",details:"Details",other:"Other entities",off:"Off",on:"Running",offline:"Unavailable",power_on:"Turn on",power_off:"Turn off",not_configured:"No Tuya ventilator found. Pick the device in the card settings.",unavailable:"The appliance entities are unavailable.",days:"days",no_pm25:"The appliance reports no PM2.5 value"},editor:{device:"Device",device_auto:"Auto detect",name:"Name",language:"Language",language_auto:"Automatic (HA language)",sections:"Visible sections",show_air:"Air quality",show_pm25:"PM2.5 tile",show_modes:"Modes",show_speeds:"Fan speeds",show_filter:"Filter",show_extra:"Other entities",compact:"Compact layout",animate:"Animations"}},G4={hu:tC,en:rC},h5=Object.keys(G4);function x2(L,C){return k(L,C,h5)}function h2(L){return T(G4,L)}var U4="tuya_local";function K4(L){return Object.values(L?.entities||{})}function K1(L){let C=new Map;for(let H of K4(L)){if(H.platform!==U4||!H.device_id||!H.entity_id.startsWith("fan."))continue;let V=L.devices?.[H.device_id];V&&C.set(H.device_id,V.name_by_user||V.name||H.device_id)}return[...C.entries()].map(([H,V])=>({id:H,name:V}))}function iC(L,C){if(C?.device)return C.device;let H=K1(L);return H.length===1?H[0].id:null}function aC(L){let C=Object.keys(L?.states||{}).filter(H=>H.startsWith("fan."));return C.length===1?C[0].slice(4):null}function j4(L,C){let H=iC(L,C),V=C?.prefix||aC(L),e=C?.entities||{},t=K4(L).filter(p=>p.platform===U4&&(H?p.device_id===H:!0)&&L?.states?.[p.entity_id]),r=t.length?t.map(p=>p.entity_id):Object.keys(L?.states||{}).filter(p=>V&&p.includes(V)),i=p=>L?.states?.[p],o=p=>p.split(".")[0],M=p=>i(p)?.attributes?.device_class||null,n=(p,{deviceClass:v=null,hint:f=null}={})=>r.find(m=>!(o(m)!==p||v&&M(m)!==v||f&&!m.includes(f)))||null,l={device:H,prefix:V,fan:n("fan"),co2:n("sensor",{deviceClass:"carbon_dioxide"}),pm25:n("sensor",{deviceClass:"pm25"}),humidity:n("sensor",{deviceClass:"humidity"}),temperature:n("sensor",{deviceClass:"temperature"}),filter_life:n("sensor",{deviceClass:"duration"}),filter_lifespan:n("select"),filter_reset:n("button"),problem:n("binary_sensor",{deviceClass:"problem"}),supply:n("number",{hint:"supply"})||n("number"),exhaust:n("number",{hint:"exhaust"})};l.exhaust&&l.exhaust===l.supply&&(l.exhaust=null),l.exhaust||(l.exhaust=r.find(p=>o(p)==="number"&&p!==l.supply)||null);for(let[p,v]of Object.entries(e))l[p]=v;let d=new Set(Object.values(l).filter(p=>typeof p=="string"&&p.includes(".")));return l.extra=r.filter(p=>!d.has(p)).sort(),l}function A1(L){if(x(L))return null;let C=Number(L.state);return Number.isFinite(C)?C:null}function Q4(L,C,H=!0){if(!L||x(L))return null;let V=A1(L);if(V===null)return null;let e=L.attributes?.unit_of_measurement||"";if(!H)return{value:V,unit:e,level:null,ratio:0,measuring:!1};let t=C.find(i=>V<=i.max)||C[C.length-1],r=C[C.length-2]?.max||1;return{value:V,unit:e,level:t.level,ratio:Math.max(0,Math.min(1,V/r)),measuring:!0}}function oC(L){if(!L||x(L))return null;let C=L.attributes||{};return{value:A1(L),min:Number.isFinite(C.min)?C.min:1,max:Number.isFinite(C.max)?C.max:8,step:Number.isFinite(C.step)&&C.step>0?C.step:1}}function q4(L,C,H){if(C?.name)return C.name;let V=H.device?L.devices?.[H.device]:null;return V?V.name_by_user||V.name:L.states[H.fan]?.attributes?.friendly_name||null}function MC(L,C,H,V){if(C?.subtitle!==void 0)return C.subtitle||null;let e=H.device?L.devices?.[H.device]:null;if(!e)return null;let t=(V||"").toLowerCase();return[e.model_id,e.model].filter(Boolean).find(i=>!t.includes(String(i).toLowerCase()))||null}function Y4(L,C){let H=j4(L,C),V=c=>c?L.states[c]:void 0,e=V(H.fan);if(!e)return{ok:!1,reason:H.device||H.prefix?"unavailable":"not_configured",entities:H};let t=!x(e),r=t&&e.state==="on",i=e.attributes?.preset_mode||null,o=Array.isArray(e.attributes?.preset_modes)?e.attributes.preset_modes:[],M=u2.find(c=>c.option===i)||null,n={};for(let{key:c}of v2){let S=H[c];n[c]=S?{entityId:S,...oC(V(S))||{}}:null}let l=A1(V(H.filter_life)),d=V(H.filter_lifespan),p=V(H.problem),v=A1(V(H.co2)),f=A1(V(H.pm25)),m=Q4(V(H.co2),D4,v===null||v>=z4),Z=Q4(V(H.pm25),I4,r||f===null||f>0);return{ok:!0,entities:H,available:t,name:q4(L,C,H),model:MC(L,C,H,q4(L,C,H)),on:r,preset:M,presetOption:i,presetOptions:o,co2:m,pm25:Z,temperature:A1(V(H.temperature)),temperatureUnit:V(H.temperature)?.attributes?.unit_of_measurement||"\xB0C",humidity:A1(V(H.humidity)),speeds:n,speedDigit:n.supply?.value??n.exhaust?.value??null,filter:{days:l,entityId:H.filter_life,due:l!==null&&l<=W4,lifespan:d?{entityId:H.filter_lifespan,state:d.state,options:Array.isArray(d.attributes?.options)?d.attributes.options:[]}:null,reset:H.filter_reset||null},problem:p?{entityId:H.problem,on:p.state==="on",code:p.attributes?.fault_code??null}:null,extra:(H.extra||[]).map(c=>({entityId:c,name:L.states[c]?.attributes?.friendly_name||c,state:L.states[c]?.state}))}}function X4(){return`
<svg class="erv" viewBox="0 0 190 250" role="img" aria-hidden="true">
  <defs>
    <linearGradient id="erv-body" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="var(--erv-body-dark)"/>
      <stop offset=".28" stop-color="var(--erv-body-light)"/>
      <stop offset=".75" stop-color="var(--erv-body)"/>
      <stop offset="1" stop-color="var(--erv-body-dark)"/>
    </linearGradient>
    <linearGradient id="erv-panel" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#2b3137"/>
      <stop offset="1" stop-color="#15191d"/>
    </linearGradient>
    <clipPath id="erv-flow-clip"><rect x="14" y="30" width="100" height="200" rx="10"/></clipPath>
  </defs>

  <ellipse class="shadow" cx="95" cy="244" rx="74" ry="7"/>

  <!-- cabinet -->
  <rect class="body" x="10" y="6" width="170" height="236" rx="14"/>
  <rect class="base" x="10" y="208" width="170" height="34" rx="14"/>
  <rect class="column" x="116" y="6" width="64" height="236" rx="14"/>
  <rect class="front" x="14" y="10" width="104" height="198" rx="12"/>

  <!-- airflow between the two streams -->
  <g class="flow" clip-path="url(#erv-flow-clip)">
    <g class="stream in">
      ${[36,58,80].map((L,C)=>`<path style="--delay:${C*.4}s" d="M${L} 36 V196"/>`).join("")}
    </g>
    <g class="stream out">
      ${[47,69,91].map((L,C)=>`<path style="--delay:${C*.4+.2}s" d="M${L} 196 V36"/>`).join("")}
    </g>
  </g>

  <!-- brand plate -->
  <rect class="plate" x="40" y="96" width="52" height="12" rx="6"/>

  <!-- display -->
  <g class="panel">
    <rect class="panel-body" x="122" y="18" width="52" height="92" rx="7"/>
    <circle class="led wifi" cx="130" cy="26" r="2"/>
    <text class="clock" x="168" y="29" text-anchor="end">--:--</text>

    <rect class="panel-cell" x="126" y="32" width="44" height="30" rx="4"/>
    <text class="co2-value" x="148" y="54" text-anchor="middle">---</text>
    <text class="co2-label" x="128" y="60">CO2</text>

    <rect class="panel-cell" x="126" y="66" width="28" height="24" rx="4"/>
    <text class="small" x="130" y="76">--\xB0C</text>
    <text class="small" x="130" y="86">--%</text>

    <rect class="panel-cell" x="158" y="66" width="12" height="24" rx="4"/>
    <text class="speed" x="164" y="80" text-anchor="middle">-</text>

    <g class="keys">
      <circle cx="134" cy="102" r="4"/>
      <circle cx="148" cy="102" r="4"/>
      <circle cx="162" cy="102" r="4"/>
    </g>
  </g>

  <!-- filter strip -->
  <rect class="filter-strip" x="24" y="214" width="84" height="6" rx="3"/>
</svg>`}function J4(L,{co2:C,temp:H,humidity:V,speed:e,clock:t}){let r=(o,M)=>{let n=L.querySelector(o);n&&M!==void 0&&n.textContent!==M&&(n.textContent=M)};r(".erv .co2-value",C),r(".erv .speed",e),r(".erv .clock",t);let i=L.querySelectorAll(".erv text.small");i[0]&&i[0].textContent!==H&&(i[0].textContent=H),i[1]&&i[1].textContent!==V&&(i[1].textContent=V)}var nC=`
:host {
  --erv-body: #e9edf1;
  --erv-body-light: #ffffff;
  --erv-body-dark: #c3cad1;
  --erv-line: rgba(20, 26, 32, .25);
  --erv-panel-text: #cfe8ff;
  --erv-flow-in: #4fc3f7;
  --erv-flow-out: #b0bec5;
  --ap-hero: 128px;

  --air-excellent: #2e9e5b;
  --air-good: #7cb342;
  --air-fair: #e8b02a;
  --air-poor: #ef7b23;
  --air-bad: #d93a2b;
}
.wrap.dark {
  --erv-body: #9aa2aa;
  --erv-body-light: #c3cad1;
  --erv-body-dark: #6d757d;
  --erv-line: rgba(5, 8, 11, .5);
}

/* ---------- air readings ---------- */
.air { display: grid; gap: 12px; }
.air .reading { display: grid; gap: 5px; cursor: pointer; }
.air .top { display: flex; align-items: center; gap: 6px; font-size: .8rem; color: var(--ap-muted); }
.air .top .icon { width: 16px; height: 16px; }
.air .top .val { margin-left: auto; color: var(--ap-text); font-weight: 650; font-variant-numeric: tabular-nums; }
.air .top .val b { font-size: 1.5rem; letter-spacing: -.01em; }
.air .top .val small { font-size: .72rem; color: var(--ap-muted); margin-left: 3px; }
.air .meter { height: 7px; border-radius: 999px; background: var(--ap-line); overflow: hidden; }
.air .meter > i { display: block; height: 100%; border-radius: 999px; transition: width .6s ease; }
.air .band { font-size: .74rem; font-weight: 600; }
/* a sensor that is saying nothing is stated, not graded */
.air .reading.idle .val { color: var(--ap-muted); font-size: 1.05rem; font-weight: 600; }
.air .reading.idle .band { color: var(--ap-muted); font-weight: 500; }

.level-excellent { color: var(--air-excellent); }
.level-good { color: var(--air-good); }
.level-fair { color: var(--air-fair); }
.level-poor { color: var(--air-poor); }
.level-bad { color: var(--air-bad); }
.fill-excellent { background: var(--air-excellent); }
.fill-good { background: var(--air-good); }
.fill-fair { background: var(--air-fair); }
.fill-poor { background: var(--air-poor); }
.fill-bad { background: var(--air-bad); }

.climate { display: flex; flex-wrap: wrap; gap: 8px; }

/* ---------- fan speeds ---------- */
.speeds { display: grid; grid-template-columns: repeat(auto-fit, minmax(190px, 1fr)); gap: 10px; }
.speed-box { display: grid; gap: 8px; padding: 10px 12px; border-radius: 14px;
  background: color-mix(in srgb, var(--ap-text) 5%, transparent); }
.speed-box .label { display: flex; align-items: center; gap: 6px; font-size: .74rem;
  text-transform: uppercase; letter-spacing: .05em; color: var(--ap-muted); }
.speed-box .label .icon { width: 15px; height: 15px; }
.speed-box .row { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
.speed-box .value { font-size: 1.2rem; font-weight: 700; font-variant-numeric: tabular-nums; }
.speed-box .ticks { display: flex; gap: 3px; flex: 1; }
.speed-box .ticks i { flex: 1; height: 10px; border-radius: 2px; background: var(--ap-line); }
.speed-box .ticks i.on { background: var(--ap-accent); }

/* ---------- appliance illustration ---------- */
.erv { width: 100%; height: auto; overflow: visible; }
.erv .shadow { fill: rgba(10, 16, 22, .18); }
.erv .body { fill: url(#erv-body); stroke: var(--erv-line); stroke-width: 1.1; }
.erv .base { fill: #2c3238; }
.erv .column { fill: #22272c; }
.erv .front { fill: var(--erv-body-light); opacity: .96; }
.erv .plate { fill: color-mix(in srgb, var(--erv-body-dark) 60%, transparent); }
.erv .filter-strip { fill: color-mix(in srgb, var(--erv-body-dark) 70%, transparent); }
.erv.filter-due .filter-strip { fill: var(--warning-color, #e8912a); }

.erv .panel-body { fill: url(#erv-panel); stroke: #0b0e11; stroke-width: .8; }
.erv .panel-cell { fill: #10151a; }
.erv .keys circle { fill: #2f363d; stroke: #434b53; stroke-width: .6; }
.erv .led { fill: var(--erv-panel-text); }
.erv text { fill: var(--erv-panel-text); font-family: var(--paper-font-body1_-_font-family, inherit); font-variant-numeric: tabular-nums; }
.erv .co2-value { font-size: 17px; font-weight: 700; }
.erv .co2-label { font-size: 5px; letter-spacing: .08em; opacity: .8; }
.erv .clock { font-size: 5.5px; opacity: .8; }
.erv .small { font-size: 6px; }
.erv .speed { font-size: 11px; font-weight: 700; }
.erv.off .panel text, .erv.off .led, .erv.off .panel-cell { opacity: .22; }

.erv .stream path { fill: none; stroke-width: 3; stroke-linecap: round; stroke-dasharray: 10 18; opacity: 0; }
.erv .stream.in path { stroke: var(--erv-flow-in); }
.erv .stream.out path { stroke: var(--erv-flow-out); }
.erv.running .stream path {
  animation: erv-flow var(--flow-duration, 2.4s) linear infinite;
  animation-delay: var(--delay, 0s);
}
.erv.running .stream.out path { animation-name: erv-flow-up; }
@keyframes erv-flow {
  0% { opacity: 0; stroke-dashoffset: 56; }
  25% { opacity: .75; }
  100% { opacity: 0; stroke-dashoffset: -56; }
}
@keyframes erv-flow-up {
  0% { opacity: 0; stroke-dashoffset: -56; }
  25% { opacity: .55; }
  100% { opacity: 0; stroke-dashoffset: 56; }
}
`,C9=`${E}
${nC}`;var Z5={language:"auto",compact:!1,animate:!0,show_air:!0,show_pm25:!0,show_modes:!0,show_speeds:!0,show_filter:!0,show_extra:!1},f5=class extends HTMLElement{static getConfigElement(){return document.createElement(U1)}static getStubConfig(C){let H=K1(C);return{type:`custom:${H1}`,device:H[0]?.id}}constructor(){super(),this.attachShadow({mode:"open"}),this._sections={},this._signatures={},this._built=!1}setConfig(C){this._config={...Z5,...C||{}},this._signatures={},this._hass&&this._render()}set hass(C){this._hass=C,this._render()}get hass(){return this._hass}connectedCallback(){this._timer=window.setInterval(()=>this._render(),3e4)}disconnectedCallback(){this._timer&&window.clearInterval(this._timer),this._timer=void 0}getCardSize(){return this._config?.compact?5:8}getGridOptions(){return{columns:12,min_columns:6,rows:"auto"}}_build(){let C=document.createElement("style");C.textContent=C9;let H=document.createElement("ha-card"),V=document.createElement("div");V.className="wrap",V.addEventListener("click",e=>this._onClick(e));for(let e of["header","hero","alerts","modes","speeds","filter","details"]){let t=document.createElement("div");t.dataset.section=e,this._sections[e]=t,V.appendChild(t)}H.appendChild(V),this.shadowRoot.replaceChildren(C,H),this._wrap=V,this._built=!0}_render(){if(!this._hass||!this._config)return;this._built||this._build();let C=h2(x2(this._config,this._hass)),H=Y4(this._hass,this._config);if(this._model=H,!H.ok){this._renderEmpty(H,C);return}this._emptyShown=!1,this._applyHostClasses(H),this._section("header",this._headerHtml(H,C)),this._heroSection(H,C),this._section("alerts",this._alertsHtml(H,C)),this._section("modes",this._config.show_modes?this._modesHtml(H,C):""),this._section("speeds",this._config.show_speeds?this._speedsHtml(H,C):""),this._section("filter",this._config.show_filter?this._filterHtml(H,C):""),this._section("details",this._detailsHtml(H,C))}_renderEmpty(C,H){if(this._emptyShown!==C.reason){this._emptyShown=C.reason,this._signatures={};for(let V of Object.values(this._sections))V.innerHTML="",V.hidden=!1;this._sections.header.innerHTML=`
      <div class="empty">
        ${s("wind")}
        <div>${a(H(`ui.${C.reason}`))}</div>
      </div>`}}_section(C,H){this._signatures[C]!==H&&(this._signatures[C]=H,this._sections[C].innerHTML=H,this._sections[C].hidden=!H)}_applyHostClasses(C){let H=["wrap"];this._config.compact&&H.push("compact"),this._config.animate||H.push("no-animation"),this._hass.themes?.darkMode&&H.push("dark"),H.push(`accent-${this._accent(C)}`);let V=H.join(" ");this._wrap.className!==V&&(this._wrap.className=V)}_accent(C){if(!C.available||!C.on)return"idle";if(C.problem?.on)return"alarm";let H=C.co2?.level;return H==="bad"||H==="poor"?"paused":"running"}_headerHtml(C,H){let V=[];C.problem?.on&&V.push(`<span class="bad" title="${a(H("alert.problem"))}">${s("error")}</span>`),C.filter.due&&V.push(`<span class="warn" title="${a(H("ui.filter"))}">${s("filter")}</span>`);let e=C.available?C.on?C.preset?H(`preset.${C.preset.key}`):C.presetOption||H("ui.on"):H("ui.off"):H("ui.offline");return`
      <div class="header">
        <div>
          <div class="title" data-action="more-info">${a(C.name||H("card_name"))}</div>
          ${C.model?`<div class="sub">${a(C.model)}</div>`:""}
        </div>
        <div class="spacer"></div>
        <div class="badges">${V.join("")}</div>
        <div class="pill">${s(C.available?C.on?"fan":"power":"offline")}${a(e)}</div>
      </div>`}_heroSection(C,H){this._sections.hero.querySelector(".erv")||(this._sections.hero.innerHTML=`
        <div class="hero">
          <div class="erv-wrap" data-action="more-info">${X4()}</div>
          <div class="status"></div>
        </div>`,this._statusNode=this._sections.hero.querySelector(".status"));let V=this._config.show_air?this._airHtml(C,H):"";this._signatures.air!==V&&(this._signatures.air=V,this._statusNode.innerHTML=V);let e=this._sections.hero.querySelector(".erv");if(e){e.classList.toggle("running",C.on),e.classList.toggle("off",!C.on),e.classList.toggle("filter-due",C.filter.due);let t=C.speedDigit??1;e.style.setProperty("--flow-duration",`${(3.4-t*.3).toFixed(2)}s`)}J4(this._sections.hero,{co2:C.co2?.measuring?String(Math.round(C.co2.value)):"---",temp:C.temperature!==null?`${Math.round(C.temperature)}\xB0C`:"--\xB0C",humidity:C.humidity!==null?`${Math.round(C.humidity)}%`:"--%",speed:C.on&&C.speedDigit!==null?String(C.speedDigit):"-",clock:F(new Date,this._hass)})}_airHtml(C,H){let V=[],e=(r,i,o,M)=>i?i.measuring?`
        <div class="reading" data-action="more-info" data-entity="${a(M||"")}">
          <div class="top">${s(o)}<span>${a(H(`ui.${r}`))}</span>
            <span class="val level-${i.level}"><b>${g(i.value,0)}</b><small>${a(i.unit)}</small></span>
          </div>
          <div class="meter"><i class="fill-${i.level}" style="width:${Math.round(i.ratio*100)}%"></i></div>
          <div class="band level-${i.level}">${a(H(`level.${i.level}`))}</div>
        </div>`:`
        <div class="reading idle" data-action="more-info" data-entity="${a(M||"")}">
          <div class="top">${s(o)}<span>${a(H(`ui.${r}`))}</span>
            <span class="val">\u2013</span>
          </div>
          <div class="band">${a(H("ui.not_sampling"))}</div>
        </div>`:"";V.push(e("co2",C.co2,"co2",C.entities.co2)),this._config.show_pm25&&V.push(e("pm25",C.pm25,"pm25",C.entities.pm25));let t=[];return C.temperature!==null&&t.push(`<span class="fact" data-action="more-info" data-entity="${a(C.entities.temperature||"")}">
        ${s("temperature")}<b>${g(C.temperature,0)} ${a(C.temperatureUnit)}</b></span>`),C.humidity!==null&&t.push(`<span class="fact" data-action="more-info" data-entity="${a(C.entities.humidity||"")}">
        ${s("water_percent")}<b>${g(C.humidity,0)} %</b></span>`),t.length&&V.push(`<div class="climate">${t.join("")}</div>`),`<div class="air">${V.filter(Boolean).join("")}</div>`}_alertsHtml(C,H){let V=[];return C.available||V.push({severity:"error",text:H("alert.offline"),iconName:"offline",entityId:C.entities.fan}),C.problem?.on&&V.push({severity:"error",text:C.problem.code?H("alert.problem_code").replace("{code}",C.problem.code):H("alert.problem"),iconName:"error",entityId:C.problem.entityId}),C.filter.days!==null&&C.filter.days<=0?V.push({severity:"warning",text:H("alert.filter_over"),iconName:"filter",entityId:C.filter.entityId}):C.filter.due&&V.push({severity:"warning",text:H("alert.filter_due").replace("{days}",C.filter.days),iconName:"filter",entityId:C.filter.entityId}),C.on&&(C.co2?.level==="bad"||C.co2?.level==="poor")&&V.push({severity:"warning",text:H("alert.co2_high").replace("{value}",g(C.co2.value,0)),iconName:"co2",entityId:C.entities.co2}),V.length?`<div class="alerts">${V.map(e=>`
        <div class="alert ${e.severity}" data-action="more-info" data-entity="${a(e.entityId||"")}">
          ${s(e.iconName)}<span>${a(e.text)}</span>
        </div>`).join("")}</div>`:""}_modesHtml(C,H){let V=[];for(let e of C.presetOptions){let t=u2.find(o=>o.option===e),r=t?H(`preset.${t.key}`):e,i=t?H(`preset_hint.${t.key}`,""):"";V.push(`
        <button class="chip" type="button" data-action="preset" data-value="${a(e)}"
          aria-pressed="${C.presetOption===e}" ${i?`title="${a(i)}"`:""}
          ${C.on?"":"disabled"}>
          ${s(t?.icon||"fan")}<span>${a(r)}</span></button>`)}return`
      <div class="section">
        <div class="section-title">${a(H("ui.modes"))}</div>
        <div class="chips">${V.join("")}</div>
        <div class="controls">
          <button class="btn ${C.on||!C.available?"":"primary"}" type="button"
            data-action="power" ${C.available?"":"disabled"}>
            ${s("power")}<span>${a(H(C.on?"ui.power_off":"ui.power_on"))}</span>
          </button>
        </div>
      </div>`}_speedsHtml(C,H){let V=v2.map(({key:t,icon:r})=>{let i=C.speeds[t];if(!i||i.value===null||i.value===void 0)return"";let o=[];for(let M=i.min;M<=i.max;M+=i.step)o.push(`<i class="${M<=i.value?"on":""}"></i>`);return`
        <div class="speed-box">
          <div class="label">${s(r)}<span>${a(H(`ui.${t}`))}</span></div>
          <div class="row">
            <button class="step-btn" type="button" data-action="step" data-speed="${t}" data-dir="-1"
              ${i.value<=i.min?"disabled":""}>\u2212</button>
            <div class="value">${g(i.value,0)}</div>
            <button class="step-btn" type="button" data-action="step" data-speed="${t}" data-dir="1"
              ${i.value>=i.max?"disabled":""}>+</button>
            <div class="ticks">${o.join("")}</div>
          </div>
        </div>`}).filter(Boolean);if(!V.length)return"";let e=C.presetOption&&C.presetOption!=="Manual"?`<div class="note">${s("info")}<span>${a(H("preset_hint.auto"))}</span></div>`:"";return`
      <div class="section">
        <div class="section-title">${a(H("ui.speeds"))}</div>
        <div class="speeds">${V.join("")}</div>
        ${e}
      </div>`}_filterHtml(C,H){let V=[];C.filter.days!==null&&V.push(`
        <div class="fact" data-action="more-info" data-entity="${a(C.filter.entityId||"")}">
          ${s("filter")}<span>${a(H("ui.filter_left"))}</span>
          <b>${g(C.filter.days,0)} ${a(H("ui.days"))}</b></div>`),C.filter.reset&&V.push(`
        <button class="chip" type="button" data-action="filter-reset">
          ${s("reset")}<span>${a(H("ui.filter_reset"))}</span></button>`);let e=C.filter.lifespan,t=e?e.options.map(r=>`
          <button class="chip" type="button" data-action="lifespan" data-value="${a(r)}"
            aria-pressed="${e.state===r}">${a(this._lifespanLabel(r,H))}</button>`).join(""):"";return!V.length&&!t?"":`
      <div class="section">
        <div class="section-title">${a(H("ui.filter"))}</div>
        ${V.length?`<div class="facts">${V.join("")}</div>`:""}
        ${t?`<div class="chips">${t}</div>`:""}
      </div>`}_lifespanLabel(C,H){let V=/^(\d+)\s*days?$/i.exec(String(C).trim());return V?`${V[1]} ${H("ui.days")}`:C}_detailsHtml(C,H){if(!this._config.show_extra||!C.extra.length)return"";let V=C.extra.map(e=>`
        <div class="detail" data-action="more-info" data-entity="${a(e.entityId)}">
          <span class="k">${a(e.name)}</span>
          <span class="v">${s("info")}${a(String(e.state??"\u2013"))}</span>
        </div>`).join("");return`
      <div class="section">
        <div class="section-title">${a(H("ui.other"))}</div>
        <div class="details">${V}</div>
      </div>`}_onClick(C){let H=C.target.closest("[data-action]");if(!H||H.hasAttribute("disabled"))return;let{action:V,entity:e,value:t,speed:r,dir:i}=H.dataset,o=this._model;if(!(!o?.ok&&V!=="more-info"))switch(V){case"more-info":this._moreInfo(e||o?.entities?.fan);break;case"power":this._haptic("medium"),this._call("fan",o.on?"turn_off":"turn_on",{entity_id:o.entities.fan});break;case"preset":this._haptic("light"),this._call("fan","set_preset_mode",{entity_id:o.entities.fan,preset_mode:t});break;case"step":this._step(r,Number(i));break;case"lifespan":this._haptic("light"),this._call("select","select_option",{entity_id:o.filter.lifespan?.entityId,option:t});break;case"filter-reset":this._haptic("medium"),this._call("button","press",{entity_id:o.filter.reset});break;default:break}}_step(C,H){let V=this._model?.speeds?.[C];if(!V||V.value===null)return;let e=Math.min(V.max,Math.max(V.min,V.value+H*V.step));e!==V.value&&(this._haptic("light"),this._call("number","set_value",{entity_id:V.entityId,value:e}))}_call(C,H,V){return V.entity_id?this._hass.callService(C,H,V):Promise.resolve()}_moreInfo(C){C&&this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:C},bubbles:!0,composed:!0}))}_haptic(C){this.dispatchEvent(new CustomEvent("haptic",{detail:C,bubbles:!0,composed:!0}))}};function H9(){customElements.get(H1)||(customElements.define(H1,f5),window.customCards=window.customCards||[],window.customCards.push({type:H1,name:"Fisher ERV Card",description:"Card for Tuya heat-recovery ventilators: CO2 and PM2.5, temperature, humidity, fan speeds and the filter.",preview:!0,documentationURL:"https://github.com/gabor-io/ha-appliance-custom-card"}),console.info(`%c ${H1} %c ${N4} `,"color:#fff;background:#00796b;font-weight:700;border-radius:3px 0 0 3px","color:#00796b;background:#e0f2f1;font-weight:700;border-radius:0 3px 3px 0"))}var sC=R({cardName:H1,toggles:["show_air","show_pm25","show_modes","show_speeds","show_filter","show_extra","compact","animate"],defaults:Z5,listDevices:K1,getLanguage:x2,translator:h2,languages:h5});function V9(){customElements.get(U1)||customElements.define(U1,sC)}V9();H9();var V1="daikin-ac-card",j1="daikin-ac-card-editor",e9="1.21.0",f2="daikin",g1=[{key:"off",icon:"power",colour:"var(--ap-off)"},{key:"heat_cool",icon:"auto",colour:"var(--ap-auto)"},{key:"heat",icon:"heat",colour:"var(--ap-heat)"},{key:"cool",icon:"snowflake",colour:"var(--ap-cool)"},{key:"dry",icon:"water",colour:"var(--ap-dry)"},{key:"fan_only",icon:"fan",colour:"var(--ap-fan)"}],g5=g1.map(L=>L.key),L9=["off","vertical"],t9=[{key:"boost",icon:"quick"},{key:"eco",icon:"leaf"},{key:"away",icon:"away"}],S1=["auto","silence","1","2","3","4","5"],r9=.5,i9=100,a9=["heat","cool","heat_cool","dry"],_1={min:1.5,max:4.6};var lC={card_name:"Kl\xEDma",group_name:"Kl\xEDm\xE1k",mode:{off:"Ki",heat_cool:"Auto",heat:"F\u0171t\xE9s",cool:"H\u0171t\xE9s",dry:"P\xE1ra",fan_only:"Vent"},mode_long:{off:"Kikapcsolva",heat_cool:"Automata",heat:"F\u0171t\xE9s",cool:"H\u0171t\xE9s",dry:"P\xE1r\xE1tlan\xEDt\xE1s",fan_only:"Ventil\xE1tor"},fan:{auto:"Auto",silence:"Csendes",1:"1. fok",2:"2. fok",3:"3. fok",4:"4. fok",5:"5. fok"},swing:{off:"Ki",vertical:"F\xFCgg\u0151leges",horizontal:"V\xEDzszintes","3d":"3D"},preset:{boost:"Turb\xF3",eco:"Eco",away:"T\xE1voll\xE9t"},state:{standby:"K\xE9szenl\xE9tben",unavailable:"Nem el\xE9rhet\u0151",drying:"P\xE1r\xE1tlan\xEDt",fan_only:"Csak keringet",holding:"Tartja a {target} \xB0C-ot",heating_to:"F\u0171t {target} \xB0C-ra",cooling_to:"H\u0171t {target} \xB0C-ra",above_target:"A c\xE9lh\u0151fok felett",below_target:"A c\xE9lh\u0151fok alatt"},sub:{unavailable:"A g\xE9p nem v\xE1laszol",last_target:"Legut\xF3bbi c\xE9l {target} \xB0C",reached:"El\xE9rte a c\xE9lh\u0151m\xE9rs\xE9kletet",above_by:"{diff} \xB0C-kal a c\xE9l felett",below_by:"{diff} \xB0C-kal a c\xE9l alatt",compressor_idle:"A kompresszor \xE1ll",compressor_idle_power:"A kompresszor \xE1ll \xB7 {power} W"},group:{running:"{running} / {total} g\xE9p megy",all_off:"Mind \xE1ll",mixed:"Vegyes \xFCzem",mixed_note:"A sz\xE1mok \xE1tlagok \u2013 a g\xE9pek elt\xE9r\u0151en \xE1llnak",in_step:"Minden g\xE9p egyform\xE1n \xE1ll",units:"G\xE9pek",unit_count:"{total} g\xE9p",average:"\xE1tlag",tap_hint:"koppints a r\xE9szletek\xE9rt"},alert:{away:"T\xE1voll\xE9t m\xF3d \u2013 a g\xE9p csak fagyv\xE9delemre f\u0171t",window_open:"{name} \xB7 nyitva, mik\xF6zben a g\xE9p dolgozik ({duration})",window_tilted:"{name} \xB7 buk\xF3ra van, mik\xF6zben a g\xE9p dolgozik ({duration})",window_open_unit:"{unit} \xB7 nyitva az ablak, mik\xF6zben a g\xE9p dolgozik ({duration})",window_tilted_unit:"{unit} \xB7 buk\xF3ra van az ablak, mik\xF6zben a g\xE9p dolgozik ({duration})"},ui:{inside:"Bent",outside:"Kint",humidity:"P\xE1ratartalom",power:"Fogyaszt\xE1s",energy:"Havi fogyaszt\xE1s",device_reads:"g\xE9p",fan:"Vent",swing:"Lamella",warmer:"Melegebb",cooler:"Hidegebb",standby_short:"\xC1ll",window:"ablak",window_open:"nyitva",window_tilted:"buk\xF3ra",windows_open:"{count} nyitva",minute_short:"perce",hour_short:"\xF3r\xE1ja",no_entity:"Nem tal\xE1ltam Daikin kl\xEDm\xE1t. Add meg az `entity` be\xE1ll\xEDt\xE1st.",missing_entity:"A megadott entit\xE1s nem l\xE9tezik.",empty_group:"A csoportnak nincs egyetlen kl\xEDma tagja sem."},editor:{device:"K\xE9sz\xFCl\xE9k",device_auto:"Automatikus",language:"Nyelv",language_auto:"Automatikus",show_art:"K\xE9sz\xFCl\xE9krajz",show_readings:"M\xE9rt \xE9rt\xE9kek",show_modes:"\xDCzemm\xF3dok",show_fan:"Ventil\xE1tor",show_presets:"Turb\xF3 / Eco / T\xE1voll\xE9t",show_all_swing:"Minden lamella-opci\xF3",show_openings:"Nyit\xE1s\xE9rz\xE9kel\u0151k",compact:"Kompakt",animate:"Anim\xE1ci\xF3k"}},dC={card_name:"Air conditioner",group_name:"Air conditioners",mode:{off:"Off",heat_cool:"Auto",heat:"Heat",cool:"Cool",dry:"Dry",fan_only:"Fan"},mode_long:{off:"Off",heat_cool:"Automatic",heat:"Heating",cool:"Cooling",dry:"Drying",fan_only:"Fan only"},fan:{auto:"Auto",silence:"Silence",1:"Step 1",2:"Step 2",3:"Step 3",4:"Step 4",5:"Step 5"},swing:{off:"Off",vertical:"Vertical",horizontal:"Horizontal","3d":"3D"},preset:{boost:"Powerful",eco:"Econo",away:"Away"},state:{standby:"Standing by",unavailable:"Unavailable",drying:"Drying",fan_only:"Moving air only",holding:"Holding {target} \xB0C",heating_to:"Heating to {target} \xB0C",cooling_to:"Cooling to {target} \xB0C",above_target:"Above the target",below_target:"Below the target"},sub:{unavailable:"The unit is not answering",last_target:"Last target {target} \xB0C",reached:"Target reached",above_by:"{diff} \xB0C above target",below_by:"{diff} \xB0C below target",compressor_idle:"Compressor idle",compressor_idle_power:"Compressor idle \xB7 {power} W"},group:{running:"{running} of {total} running",all_off:"All off",mixed:"Mixed",mixed_note:"These are averages \u2013 the units differ",in_step:"All units in step",units:"Units",unit_count:"{total} units",average:"avg",tap_hint:"tap for controls"},alert:{away:"Away mode \u2013 frost protection only",window_open:"{name} has been open for {duration} while the unit runs",window_tilted:"{name} has been on the latch for {duration} while the unit runs",window_open_unit:"{unit} \xB7 window open for {duration} while the unit runs",window_tilted_unit:"{unit} \xB7 window on the latch for {duration} while the unit runs"},ui:{inside:"Inside",outside:"Outside",humidity:"Humidity",power:"Power",energy:"Energy this month",device_reads:"unit",fan:"Fan",swing:"Swing",warmer:"Warmer",cooler:"Cooler",standby_short:"Off",window:"a window",window_open:"open",window_tilted:"on the latch",windows_open:"{count} open",minute_short:"min",hour_short:"h",no_entity:"No Daikin climate entity found. Set the `entity` option.",missing_entity:"That entity does not exist.",empty_group:"The group has no climate members."},editor:{device:"Device",device_auto:"Automatic",language:"Language",language_auto:"Automatic",show_art:"Unit drawing",show_readings:"Readings",show_modes:"Modes",show_fan:"Fan",show_presets:"Powerful / Econo / Away",show_all_swing:"All swing options",show_openings:"Opening sensors",compact:"Compact",animate:"Animations"}},o9={hu:lC,en:dC},S5=Object.keys(o9);function Z2(L,C){return k(L,C,S5)}function g2(L){return T(o9,L)}function e1(L,C={}){return Object.entries(C).reduce((H,[V,e])=>H.replace(`{${V}}`,String(e)),L)}var m1=["window"],c1=30;function N(L,C){let H=L?.entities?.[C];return H?H.area_id?H.area_id:(H.device_id?L.devices?.[H.device_id]:null)?.area_id||null:null}function pC(L){let C=L?.last_changed;if(!C)return null;let H=(Date.now()-new Date(C).getTime())/1e3;return Number.isFinite(H)?Math.max(0,H):null}function M9(L,C){let H=L?.states?.[C],V=L?.entities?.[C],e=H?.attributes?.device_class||V?.original_device_class||null,t=H?.attributes?.friendly_name||C;if(x(H))return{entityId:C,name:t,deviceClass:e,available:!1,open:!1,openFor:null};let r=H.state==="on";return{entityId:C,name:t,deviceClass:e,available:!0,open:r,openFor:r?pC(H):null}}function y1(L,{areas:C=[],classes:H=m1,include:V=[],exclude:e=[]}={}){let t=new Set(C.filter(Boolean)),r=new Set(e),i=new Map;if(t.size)for(let o of Object.keys(L?.states||{})){if(!o.startsWith("binary_sensor.")||r.has(o))continue;let M=L.states[o],n=L.entities?.[o],l=M.attributes?.device_class||n?.original_device_class;if(!H.includes(l))continue;let d=N(L,o);!d||!t.has(d)||i.set(o,M9(L,o))}for(let o of V)r.has(o)||i.has(o)||L?.states?.[o]&&i.set(o,M9(L,o));return[...i.values()]}var AC=[["top","bottom"],["felso","also"],["upper","lower"]],mC=/_(contact|sensor|nyitas|allapot|state)$/;function cC(L){return L.includes(".")?L.slice(L.indexOf(".")+1):L}function uC(L,C){let H=cC(L).replace(mC,"");for(let[V,e]of C)for(let[t,r]of[[V,"top"],[e,"bottom"]]){let i=new RegExp(`_${t}(?=_|$)`,"g"),o=null;for(let n=i.exec(H);n;n=i.exec(H))o=n;if(!o)continue;let M=H.slice(0,o.index)+H.slice(o.index+o[0].length);if(M)return{base:M,role:r,word:t}}return null}function n9(L){return L.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase()}function vC(L){let C=L[0],H=C.position?.word;return H&&C.name.split(/([\s_-]+)/).filter((r,i)=>!(i%2===0&&n9(r)===n9(H))).join("").replace(/[\s_-]{2,}/g," ").trim().replace(/[\s_-]+$/,"")||C.name}function xC(L,{pairs:C=AC,windows:H={}}={}){let V=new Map(L.map(i=>[i.entityId,i])),e=[],t=new Set;for(let[i,o]of Object.entries(H)){let M=(Array.isArray(o)?o:[o]).map((n,l)=>{let d=V.get(n);return d?{...d,position:{role:l===0?"top":"bottom"}}:null}).filter(Boolean);if(M.length){for(let n of M)t.add(n.entityId);e.push({key:i,name:i,parts:M})}}let r=new Map;for(let i of L){if(t.has(i.entityId))continue;let o=uC(i.entityId,C);if(!o){e.push({key:i.entityId,name:i.name,parts:[{...i,position:null}]});continue}r.has(o.base)||r.set(o.base,[]),r.get(o.base).push({...i,position:o})}for(let[i,o]of r){let M=n=>n.position.role==="top"?0:1;o.sort((n,l)=>M(n)-M(l)),e.push({key:i,name:vC(o),parts:o})}return e.map(hC).sort((i,o)=>i.name.localeCompare(o.name))}function hC(L){let C=L.parts,H=C.filter(M=>M.available),V=C.find(M=>M.position?.role==="top"),e=C.find(M=>M.position?.role==="bottom"),t=!!(V&&e&&V.available&&e.available),r=H.filter(M=>M.open),i=r.reduce((M,n)=>(n.openFor??0)>M?n.openFor:M,0),o="closed";return H.length?t&&V.open&&!e.open?o="tilted":r.length&&(o="open"):o="unavailable",{...L,state:o,available:H.length>0,open:o==="tilted"||o==="open",tilted:o==="tilted",paired:t,openFor:r.length?i:null,entityId:(V||C[0]).entityId}}function L1(L,C=c1,H={}){let V=xC(L,H),e=V.filter(i=>i.open),t=e.filter(i=>(i.openFor??0)>=C),r=t.reduce((i,o)=>(o.openFor??0)>(i?.openFor??-1)?o:i,null);return{windows:V,total:V.length,none:V.length===0,unavailable:V.filter(i=>!i.available).length,open:e.length,tilted:e.filter(i=>i.tilted).length,warn:t.length>0,longest:r,openFor:r?.openFor??null}}function W(L,C,H){if(L==null)return"";let V=Math.round(L/60);return V<60?`${Math.max(1,V)} ${C}`:`${Math.round(V/60)} ${H}`}var fC={inside:"inside_temperature",outside:"outside_temperature"};function S2(L){return Object.values(L?.entities||{})}function ZC(L){return S2(L).filter(C=>C.platform===f2&&C.entity_id.startsWith("climate.")).map(C=>C.entity_id)}function _2(L){let C=new Map;for(let H of S2(L)){if(H.platform!==f2||!H.device_id||!H.entity_id.startsWith("climate."))continue;let V=L.devices?.[H.device_id];V&&C.set(H.device_id,V.name_by_user||V.name||H.device_id)}return[...C.entries()].map(([H,V])=>({id:H,name:V}))}function s9(L,C){let H=L?.states?.[C]?.attributes?.entity_id;return Array.isArray(H)?H.filter(V=>typeof V=="string"&&V.startsWith("climate.")):[]}function l9(L,C){if(C?.entity)return C.entity;if(C?.device){let V=S2(L).find(e=>e.device_id===C.device&&e.entity_id.startsWith("climate."));if(V)return V.entity_id}let H=ZC(L);return H.length===1?H[0]:null}function gC(L,C){let V=L?.entities?.[C]?.device_id;if(!V)return{};let e={};for(let t of S2(L))if(!(t.device_id!==V||t.platform!==f2))for(let[r,i]of Object.entries(fC))t.translation_key===i&&(e[r]=t.entity_id);return e}function d9(L,C,H={}){let V=gC(L,C);return{climate:C,inside:V.inside,outside:H.outside||V.outside,room:H.temperature||null,humidity:H.humidity||null,power:H.power||null,energy:H.energy||null}}function p9(L,C,H={}){let V=H.openings||{},e=V.entities||[];if(V.auto===!1&&!e.length)return[];let t=V.area||N(L,C);return y1(L,{areas:V.auto===!1?[]:[t].filter(Boolean),classes:V.classes||m1,include:e,exclude:V.ignore||[]})}function b1(L,C){if(!C)return null;let H=L?.states?.[C];if(x(H))return null;let V=Number(H.state);return Number.isFinite(V)?V:null}function A9(L,C,H=""){return L?.states?.[C]?.attributes?.unit_of_measurement||H}function c9(L,C){return L?.states?.[C]?.attributes?.friendly_name||""}function SC(L){let C=H=>{let V=S1.indexOf(String(H).toLowerCase());return V===-1?S1.length:V};return[...L].sort((H,V)=>C(H)-C(V))}function u9(L,C,H={},V={}){let e=L?.states?.[C];if(!e)return null;let t=d9(L,C,H),r=e.attributes||{},i=e.state,o=i!=="off"&&!x(e),M=b1(L,t.inside)??r.current_temperature??null,n=b1(L,t.room),l=n??M,d=r.temperature??null,p=(r.swing_modes||[]).filter(c=>V.show_all_swing?!0:L9.includes(String(c).toLowerCase())),v=r.preset_modes||[],f=t9.filter(c=>v.includes(c.key)).map(c=>({...c,on:r.preset_mode===c.key})),m=b1(L,t.power),Z=V.show_openings===!1?L1([]):L1(p9(L,C,{openings:{...V.openings||{},...H.openings||{}}}),V.open_delay??c1,{pairs:V.openings?.pairs??H.openings?.pairs,windows:V.openings?.windows??H.openings?.windows});return{entityId:C,entities:t,name:H.name||c9(L,C)||C,available:!x(e),on:o,mode:i,action:r.hvac_action||null,modes:(r.hvac_modes||[]).filter(c=>g5.includes(c)),target:d,targetStep:r.target_temp_step||1,minTemp:r.min_temp??16,maxTemp:r.max_temp??32,unit:L?.config?.unit_system?.temperature||"\xB0C",inside:M,room:n,measured:l,external:n!==null,outside:b1(L,t.outside),humidity:b1(L,t.humidity),power:m,powerUnit:A9(L,t.power,"W"),energy:b1(L,t.energy),energyUnit:A9(L,t.energy,"kWh"),fanModes:SC(r.fan_modes||[]),fanMode:r.fan_mode||null,swingModes:p,swingMode:r.swing_mode||null,swinging:!!r.swing_mode&&String(r.swing_mode).toLowerCase()!=="off",presets:f,presetMode:r.preset_mode||null,away:r.preset_mode==="away",idle:o&&m!==null?m<i9:o&&r.hvac_action==="idle",openings:Z,draughty:o&&a9.includes(i)&&Z.warn}}function v9(L){if(L.measured===null||L.target===null)return null;let C=L.measured-L.target;return Math.abs(C)<r9?"at":C>0?"above":"below"}function x9(L){if(!L.available)return{key:"state.unavailable"};if(!L.on)return{key:"state.standby"};if(L.mode==="dry")return{key:"state.drying"};if(L.mode==="fan_only")return{key:"state.fan_only"};let C=v9(L);return C==="at"||C===null?{key:"state.holding",target:L.target}:L.mode==="heat"?C==="below"?{key:"state.heating_to",target:L.target}:{key:"state.above_target"}:L.mode==="cool"?C==="above"?{key:"state.cooling_to",target:L.target}:{key:"state.below_target"}:{key:"state.holding",target:L.target}}function h9(L){if(!L.available)return{key:"sub.unavailable"};if(!L.on)return{key:"sub.last_target",target:L.target};if(L.idle&&L.power!==null)return{key:"sub.compressor_idle_power",power:L.power};if(L.idle)return{key:"sub.compressor_idle"};let C=v9(L);if(C===null)return{key:""};if(C==="at")return{key:"sub.reached"};let H=Math.round(Math.abs(L.measured-L.target)*10)/10;return{key:C==="above"?"sub.above_by":"sub.below_by",diff:H}}function m9(L){let C=L.filter(H=>H!==null&&Number.isFinite(H));return C.length?C.reduce((H,V)=>H+V,0)/C.length:null}function _C(L,C,H,V){let e=V?.units||{},t=H.map(d=>u9(L,d,e[d]||{},V)).filter(Boolean),r=L?.states?.[C],i=r?.attributes||{},o=t.filter(d=>d.on),M=o.map(d=>d.mode),n=M.length?[...new Set(M)].sort((d,p)=>M.filter(v=>v===p).length-M.filter(v=>v===d).length)[0]:"off",l=t.map(d=>d.power).filter(d=>d!==null);return{isGroup:!0,entityId:C,name:V?.name||c9(L,C)||C,available:!x(r),units:t,running:o.length,total:t.length,on:o.length>0,mode:i.hvac_mode||(r?.state!=="off"?r?.state:null)||n,mixed:new Set(t.map(d=>d.on?d.mode:"off")).size>1||new Set(t.map(d=>d.target)).size>1,modes:(i.hvac_modes||[]).filter(d=>g5.includes(d)),target:i.temperature??m9(t.map(d=>d.target)),targetStep:i.target_temp_step||1,minTemp:i.min_temp??16,maxTemp:i.max_temp??32,unit:L?.config?.unit_system?.temperature||"\xB0C",measured:m9(t.map(d=>d.measured)),draughty:t.filter(d=>d.draughty),outside:t.map(d=>d.outside).find(d=>d!==null)??null,power:l.length?l.reduce((d,p)=>d+p,0):null,powerUnit:"W"}}function f9(L,C){let H=l9(L,C);if(!H)return{ok:!1,reason:"no_entity"};if(!L?.states?.[H])return{ok:!1,reason:"missing_entity"};let V=s9(L,H);if(V.length){let t=_C(L,H,V,C);return t.units.length?{ok:!0,...t}:{ok:!1,reason:"empty_group"}}let e=u9(L,H,C?.sources||{},C);return e?{ok:!0,isGroup:!1,...e,name:C?.name||e.name}:{ok:!1,reason:"missing_entity"}}function yC(L){let C=S1.indexOf(String(L??"").toLowerCase()),H=S1.length-1;if(C<=0)return(_1.min+_1.max)/2;let V=(C-1)/Math.max(1,H-1);return _1.max-V*(_1.max-_1.min)}function Z9(L){return`
  <svg class="defs" width="0" height="0" aria-hidden="true">
    <defs>
      <linearGradient id="${L}-case" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#ffffff"/>
        <stop offset=".5" stop-color="#f5f7f9"/>
        <stop offset="1" stop-color="#dde3e8"/>
      </linearGradient>
      <linearGradient id="${L}-flap" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#f3f5f7"/>
        <stop offset="1" stop-color="#c4ccd3"/>
      </linearGradient>
      <linearGradient id="${L}-cavity" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#1b2630"/>
        <stop offset="1" stop-color="#39474f"/>
      </linearGradient>
      <linearGradient id="${L}-wash" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="currentColor"/>
        <stop offset="1" stop-color="currentColor" stop-opacity="0"/>
      </linearGradient>
      <filter id="${L}-soft" x="-40%" y="-40%" width="180%" height="200%">
        <feGaussianBlur stdDeviation="5"/>
      </filter>
    </defs>
  </svg>`}function g9(L){return`
  <svg class="ac" viewBox="0 0 200 176" role="img" aria-hidden="true">
    <path class="wash" d="M26 92h148l26 84H0Z" fill="url(#${L}-wash)"/>
    <ellipse class="shadow" cx="100" cy="90" rx="84" ry="8" filter="url(#${L}-soft)"/>
    <g class="body">
      <rect x="10" y="22" width="180" height="62" rx="15" fill="url(#${L}-case)"/>
      <rect class="outline" x="10" y="22" width="180" height="62" rx="15"/>
      <g class="grille">
        <line x1="34" y1="33" x2="166" y2="33"/>
        <line x1="34" y1="38.5" x2="166" y2="38.5"/>
        <line x1="34" y1="44" x2="166" y2="44"/>
      </g>
      <path class="sheen" d="M18 54h164"/>
      <circle class="led" cx="170" cy="76" r="2.5"/>
      <rect x="22" y="68" width="140" height="18" rx="6" fill="url(#${L}-cavity)"/>
      <g class="louver">
        <rect x="22" y="68" width="140" height="18" rx="6" fill="url(#${L}-flap)"/>
        <rect class="outline" x="22" y="68" width="140" height="18" rx="6"/>
        <path class="flap-sheen" d="M30 72h124"/>
      </g>
    </g>
    <g class="stream">
      <path d="M44 96c-4 24 -8 42 -14 76"/>
      <path d="M76 98c-2 26 -4 44 -6 74"/>
      <path d="M110 98c2 26 4 44 6 74"/>
      <path d="M142 96c4 24 8 42 14 76"/>
    </g>
  </svg>`}function S9(L){return`
  <svg class="mini" viewBox="0 0 60 58" role="img" aria-hidden="true">
    <rect class="mbody" x="4" y="10" width="52" height="22" rx="6"/>
    <g class="grille">
      <line x1="14" y1="16" x2="46" y2="16"/>
      <line x1="14" y1="19.5" x2="46" y2="19.5"/>
    </g>
    <rect class="mcavity" x="8" y="25" width="44" height="7" rx="2.5"/>
    <rect class="mflap" x="8" y="25" width="44" height="7" rx="2.5" fill="url(#${L}-flap)"/>
    <g class="stream">
      <path d="M20 36c-1 8 -2 12 -4 20"/>
      <path d="M40 36c1 8 2 12 4 20"/>
    </g>
  </svg>`}function _5(L,C){L&&(L.classList.toggle("on",!!C.on),L.classList.toggle("off",!C.on),L.classList.toggle("swing",!!(C.on&&C.swinging)),L.classList.toggle("fixed",!!(C.on&&!C.swinging)),L.style.setProperty("--flow-duration",`${yC(C.fanMode).toFixed(2)}s`))}var _9=`
${E}

:host {
  --ap-heat: #f57c00;
  --ap-cool: #0288d1;
  --ap-dry: #00909e;
  --ap-fan: #6d7f8b;
  --ap-auto: #6c4ec4;
  --ap-off: var(--state-icon-color, #8a9199);
}

.wrap { padding: 14px 16px 16px; gap: 12px; position: relative; }
/* a wash of the mode colour, so the card reads as warm or cool at a glance */
.wrap::before {
  content: ''; position: absolute; inset: 0; pointer-events: none;
  background: radial-gradient(120% 80% at 0% 0%,
    color-mix(in srgb, var(--ap-accent) 11%, transparent), transparent 62%);
}
.wrap > * { position: relative; }

/* ---------- header with the readings ---------- */
.top { display: flex; align-items: flex-start; gap: 10px; }
.top .name { font-size: 1rem; font-weight: 650; letter-spacing: -.01em; line-height: 1.15; cursor: pointer; }
.top .sub { font-size: .72rem; color: var(--ap-muted); margin-top: 1px; }
.top .spacer { flex: 1; }

.ind { display: flex; gap: 6px 10px; flex-wrap: wrap; justify-content: flex-end; }
.ind > span {
  display: inline-flex; align-items: center; gap: 4px; cursor: pointer;
  font-size: .74rem; color: var(--ap-muted); font-variant-numeric: tabular-nums; white-space: nowrap;
}
.ind b { color: var(--ap-text); font-weight: 600; }
.ind .icon { width: 13px; height: 13px; opacity: .75; }
.ind .raw { font-size: .68rem; }

/* ---------- hero ---------- */
.hero { display: grid; grid-template-columns: 112px minmax(0,1fr) auto; gap: 12px; align-items: center; }
.hero.no-art { grid-template-columns: minmax(0,1fr) auto; }
.compact .hero { grid-template-columns: 86px minmax(0,1fr) auto; gap: 10px; }
@container (max-width: 340px) {
  .hero { grid-template-columns: minmax(0,1fr) auto; }
  .hero .art { display: none; }
}

.mode-name { font-size: .68rem; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; color: var(--ap-accent); }
.state { font-size: 1.02rem; font-weight: 600; line-height: 1.25; margin-top: 2px; letter-spacing: -.01em; }
.state-sub { font-size: .76rem; color: var(--ap-muted); margin-top: 2px; }

.dial { display: grid; grid-template-columns: auto auto; align-items: center; gap: 8px; }
.big { white-space: nowrap; font-size: 2.9rem; font-weight: 600; letter-spacing: -.04em; line-height: .9;
  font-variant-numeric: tabular-nums; color: var(--ap-text); }
.compact .big { font-size: 2.2rem; }
.big small { font-size: 1rem; font-weight: 600; color: var(--ap-muted); letter-spacing: 0; }
.updown { display: grid; gap: 4px; }
.updown button {
  width: 34px; height: 30px; border-radius: 9px; cursor: pointer; padding: 0;
  border: 1px solid var(--ap-line); background: transparent; color: var(--ap-text);
  display: grid; place-items: center; transition: border-color .15s, color .15s, transform .08s;
}
.updown .icon { width: 16px; height: 16px; }
.updown button:hover:not([disabled]) { border-color: var(--ap-accent); color: var(--ap-accent); }
.updown button:active:not([disabled]) { transform: scale(.93); }
.updown button[disabled] { opacity: .3; cursor: not-allowed; }

/* ---------- segmented mode bar ---------- */
.seg {
  display: grid; grid-auto-flow: column; grid-auto-columns: 1fr; gap: 2px;
  background: color-mix(in srgb, var(--ap-text) 6%, transparent);
  border-radius: 13px; padding: 3px;
}
.seg button {
  border: 0; background: transparent; cursor: pointer; color: var(--ap-muted);
  font: inherit; font-size: .67rem; font-weight: 600;
  display: grid; justify-items: center; gap: 2px; padding: 7px 2px 6px;
  border-radius: 10px; transition: background .18s, color .18s, box-shadow .18s;
}
.seg .icon { width: 19px; height: 19px; }
.seg button:hover:not([disabled]) { color: var(--ap-text); }
.seg button[aria-pressed="true"] {
  background: var(--card-background-color, #fff); color: var(--ap-accent);
  box-shadow: 0 1px 3px rgba(0,0,0,.14), 0 0 0 1px color-mix(in srgb, var(--ap-accent) 22%, transparent);
}
.seg button.power[aria-pressed="true"] { color: var(--ap-muted); }
.seg button[disabled] { opacity: .4; cursor: not-allowed; }

/* ---------- fan ---------- */
.fan {
  display: flex; align-items: center; gap: 9px; min-width: 0;
  padding: 7px 11px; border-radius: 12px;
  background: color-mix(in srgb, var(--ap-text) 5%, transparent);
}
.fan .cap { font-size: .68rem; text-transform: uppercase; letter-spacing: .06em; color: var(--ap-muted); }
.fan .val { margin-left: auto; font-size: .8rem; font-weight: 600; }
.ticks { display: flex; gap: 3px; align-items: flex-end; }
.ticks button {
  width: 13px; border: 0; padding: 0; cursor: pointer; border-radius: 3px;
  background: color-mix(in srgb, var(--ap-text) 14%, transparent);
  transition: background .18s, transform .1s;
}
.ticks button:hover:not([disabled]) { transform: scaleY(1.15); }
.ticks button.on { background: var(--ap-accent); }
.ticks button.auto {
  width: 20px; height: 17px; font: inherit; font-size: .6rem; font-weight: 700;
  color: var(--ap-muted); background: none;
}
.ticks button.auto.on { color: var(--ap-accent); }
.ticks button[disabled] { opacity: .45; cursor: not-allowed; }

/* ---------- ghost buttons ---------- */
.btnrow { display: grid; grid-auto-flow: column; grid-auto-columns: 1fr; gap: 7px; }
.ghost {
  display: inline-flex; align-items: center; justify-content: center; gap: 5px;
  padding: 7px 10px; border-radius: 10px; cursor: pointer;
  border: 1px solid var(--ap-line); background: transparent; color: var(--ap-text);
  font: inherit; font-size: .74rem; font-weight: 600;
  transition: border-color .15s, color .15s, background .15s;
}
.ghost .icon { width: 15px; height: 15px; color: var(--ap-muted); }
.ghost:hover:not([disabled]) { border-color: var(--ap-accent); }
.ghost[aria-pressed="true"] {
  color: var(--ap-accent); border-color: color-mix(in srgb, var(--ap-accent) 40%, transparent);
  background: color-mix(in srgb, var(--ap-accent) 10%, transparent);
}
.ghost[aria-pressed="true"] .icon { color: var(--ap-accent); }
.ghost[disabled] { opacity: .4; cursor: not-allowed; }

/* ---------- group rows ---------- */
.rows { display: grid; gap: 6px; }
.sec-cap { font-size: .66rem; font-weight: 700; letter-spacing: .09em; text-transform: uppercase; color: var(--ap-muted); }
.divider { height: 1px; background: var(--ap-line); }

.row { border-radius: 13px; transition: background .18s; --ap-accent: var(--row-accent); }
.row.open { background: color-mix(in srgb, var(--row-accent) 7%, transparent); }
.row-head {
  display: grid; grid-template-columns: 46px minmax(0,1fr) auto 16px; gap: 10px;
  align-items: center; width: 100%; padding: 7px 10px 7px 6px;
  border: 0; background: transparent; cursor: pointer; border-radius: 13px;
  font: inherit; color: var(--ap-text); text-align: left;
}
.row-head:hover { background: color-mix(in srgb, var(--ap-text) 4%, transparent); }
.row.open .row-head:hover { background: transparent; }
.row .rname { display: block; font-size: .89rem; font-weight: 600; letter-spacing: -.01em; }
.row .rstate { display: block; font-size: .71rem; font-weight: 600; color: var(--row-accent); margin-top: 1px; }
.row .rstate em { font-style: normal; color: var(--ap-muted); font-weight: 500; }
.row .rtemp {
  text-align: right; font-size: .78rem; color: var(--ap-muted);
  font-variant-numeric: tabular-nums; white-space: nowrap;
}
.row .rtemp b { font-size: 1.04rem; color: var(--ap-text); font-weight: 650; letter-spacing: -.02em; }
.row .caret { width: 16px; height: 16px; color: var(--ap-muted); transition: transform .25s; }
.row.open .caret { transform: rotate(180deg); }
.row-body { display: none; padding: 2px 10px 11px; gap: 9px; }
.row.open .row-body { display: grid; }
.rowbottom { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
.rowbottom .big { font-size: 1.45rem; }
.rowbottom .big small { font-size: .72rem; }
.rowbottom .btnrow { grid-auto-columns: auto; }
.rowbottom .updown { grid-auto-flow: column; }
.rowbottom .updown button { width: 31px; height: 29px; }

/* ---------- the drawing ---------- */
.defs { position: absolute; width: 0; height: 0; }
.ac, .mini { width: 100%; height: auto; display: block; }
.art { cursor: pointer; }

.outline { fill: none; stroke: #000; stroke-opacity: .11; }
.grille { stroke: #9aa5ad; stroke-opacity: .45; stroke-width: 1.7; stroke-linecap: round; }
.mini .grille { stroke-width: 1.2; }
.sheen { stroke: #fff; stroke-opacity: .8; stroke-width: 2; }
.flap-sheen { stroke: #fff; stroke-opacity: .75; stroke-width: 1.6; }
.shadow { fill: #000; opacity: .2; }
.mbody { fill: #f2f5f7; stroke: #000; stroke-opacity: .11; }
.mcavity { fill: #2b3740; }

/* seen from the front the flap slides down and foreshortens as it opens */
.louver, .mflap { transform-box: view-box; transition: transform .6s ease; }
.louver { transform-origin: 100px 70px; }
.mflap { transform-origin: 30px 30px; }
.ac.off .louver, .mini.off .mflap { transform: none; }
.ac.fixed .louver { transform: translateY(7px) scaleY(.46); }
.mini.fixed .mflap { transform: translateY(2.5px) scaleY(.45); }
.ac.swing .louver { animation: daikin-louver 5.5s ease-in-out infinite; }
.mini.swing .mflap { animation: daikin-mini-louver 4s ease-in-out infinite; }
@keyframes daikin-louver {
  0%, 100% { transform: translateY(5px) scaleY(.56); }
  50%      { transform: translateY(12px) scaleY(.24); }
}
@keyframes daikin-mini-louver {
  0%, 100% { transform: translateY(2px) scaleY(.55); }
  50%      { transform: translateY(5px) scaleY(.22); }
}

.stream path {
  fill: none; stroke: var(--ap-accent); stroke-linecap: round;
  stroke-width: 3.6; stroke-dasharray: 11 16; opacity: 0; transition: opacity .4s;
}
.mini .stream path { stroke-width: 3; stroke-dasharray: 6 9; }
.ac.on .stream path, .mini.on .stream path { opacity: .78; animation: daikin-flow var(--flow-duration, 2.6s) linear infinite; }
.ac.on .stream path:nth-child(2) { animation-delay: -.4s; }
.ac.on .stream path:nth-child(3) { animation-delay: -.8s; }
.ac.on .stream path:nth-child(4) { animation-delay: -1.2s; }
.mini.on .stream path:nth-child(2) { animation-delay: -.6s; }
@keyframes daikin-flow { from { stroke-dashoffset: 0; } to { stroke-dashoffset: -54; } }
.mini .stream path { animation-name: daikin-mini-flow; }
@keyframes daikin-mini-flow { from { stroke-dashoffset: 0; } to { stroke-dashoffset: -30; } }

/* ---------- the open-window badge on a group row ---------- */
.open-badge {
  display: inline-flex; align-items: center; gap: 4px; margin-left: 7px; padding: 1px 7px;
  border-radius: 999px; font-size: .64rem; font-weight: 700; vertical-align: 1px;
  background: color-mix(in srgb, var(--warning-color, #ffa726) 20%, transparent);
  color: var(--warning-color, #ffa726);
}
.open-badge .icon { width: 11px; height: 11px; }
/* open, but the unit is not conditioning the room - worth noting, not warning */
.open-badge.calm {
  background: color-mix(in srgb, var(--ap-text) 8%, transparent); color: var(--ap-muted); font-weight: 600;
}

.wash { opacity: 0; transition: opacity .6s; color: var(--ap-accent); }
.ac.on .wash { opacity: .15; }
.led { fill: #c9d2d8; }
.ac.on .led { fill: var(--ap-accent); }
.ac.off .body { opacity: .72; }
.mini.off { opacity: .45; }
`;var b5={language:"auto",compact:!1,animate:!0,show_art:!0,show_readings:!0,show_modes:!0,show_fan:!0,show_presets:!0,show_all_swing:!1,show_openings:!0},y9=0,y5=class extends HTMLElement{static getConfigElement(){return document.createElement(j1)}static getStubConfig(C){let H=_2(C);return{type:`custom:${V1}`,device:H[0]?.id}}constructor(){super(),this.attachShadow({mode:"open"}),this._sections={},this._signatures={},this._rows=new Map,this._open=new Set,this._built=!1,y9+=1,this._uid=`daikin${y9}`}setConfig(C){this._config={...b5,...C||{}},this._signatures={},this._rows.clear(),this._hass&&this._render()}set hass(C){this._hass=C,this._render()}get hass(){return this._hass}getCardSize(){return this._model?.isGroup?4+(this._model.units?.length||0):this._config?.compact?4:6}getGridOptions(){return{columns:12,min_columns:6,rows:"auto"}}_build(){let C=document.createElement("style");C.textContent=_9;let H=document.createElement("ha-card"),V=document.createElement("div");V.className="wrap",V.addEventListener("click",e=>this._onClick(e)),V.insertAdjacentHTML("beforeend",Z9(this._uid));for(let e of["top","hero","alerts","modes","fan","buttons","units"]){let t=document.createElement("div");t.dataset.section=e,this._sections[e]=t,V.appendChild(t)}H.appendChild(V),this.shadowRoot.replaceChildren(C,H),this._wrap=V,this._built=!0}_render(){if(!this._hass||!this._config)return;this._built||this._build();let C=g2(Z2(this._config,this._hass)),H=f9(this._hass,this._config);if(this._model=H,!H.ok){this._renderEmpty(H,C);return}this._emptyShown=!1,this._applyWrapClasses(H),H.isGroup?this._renderGroup(H,C):this._renderSingle(H,C)}_renderEmpty(C,H){if(this._emptyShown!==C.reason){this._emptyShown=C.reason,this._signatures={},this._rows.clear();for(let[V,e]of Object.entries(this._sections))e.innerHTML="",e.hidden=V!=="top";this._sections.top.innerHTML=`
      <div class="empty">
        ${s("ac")}
        <div>${a(H(`ui.${C.reason}`))}</div>
      </div>`}}_section(C,H){this._signatures[C]!==H&&(this._signatures[C]=H,this._sections[C].innerHTML=H,this._sections[C].hidden=!H)}_applyWrapClasses(C){let H=["wrap"];this._config.compact&&H.push("compact"),this._config.animate||H.push("no-animation"),this._hass.themes?.darkMode&&H.push("dark");let V=H.join(" ");this._wrap.className!==V&&(this._wrap.className=V);let e=this._accent(C.isGroup?C.running?C.mode:"off":C.on?C.mode:"off");this._wrap.style.getPropertyValue("--ap-accent")!==e&&this._wrap.style.setProperty("--ap-accent",e)}_accent(C){return(g1.find(H=>H.key===C)||g1[0]).colour}_renderSingle(C,H){this._section("top",this._topHtml(C,H)),this._heroSection(C,H),this._section("alerts",this._alertsHtml(C,H)),this._section("modes",this._config.show_modes?this._segHtml(C,H):""),this._section("fan",this._config.show_fan?this._fanHtml(C,H):""),this._section("buttons",this._buttonsHtml(C,H)),this._section("units","")}_topHtml(C,H){let V=C.isGroup?`${a(e1(H("group.unit_count"),C))} \xB7 ${a(C.entityId)}`:`Daikin${C.draughty?"":this._openBadge(C,H)}`;return`
      <div class="top">
        <div>
          <div class="name" data-action="more-info">${a(C.name)}</div>
          <div class="sub">${V}</div>
        </div>
        <div class="spacer"></div>
        <div class="ind">${this._readingsHtml(C,H)}</div>
      </div>`}_readingsHtml(C,H){if(!this._config.show_readings)return"";let V=[],e=(r,i,o,M,n,l="")=>{i!=null&&V.push(`
        <span data-action="more-info" data-entity="${a(n||"")}">
          ${s(r)}<b>${g(i,o)} ${a(M)}</b>${l}
        </span>`)};if(C.isGroup)return e("indoor",C.measured,1,C.unit,"",`<span class="raw">${a(H("group.average"))}</span>`),e("outdoor",C.outside,0,C.unit,""),e("energy",C.power,0,C.powerUnit,""),V.join("");let t=C.external&&C.inside!==null?`<span class="raw">${a(H("ui.device_reads"))} ${g(C.inside,0)}</span>`:"";return e("indoor",C.measured,1,C.unit,C.entities.room||C.entities.inside,t),e("water_percent",C.humidity,0,"%",C.entities.humidity),e("outdoor",C.outside,0,C.unit,C.entities.outside),e("energy",C.power,0,C.powerUnit,C.entities.power),e("counter",C.energy,1,C.energyUnit,C.entities.energy),V.join("")}_heroSection(C,H){let V=this._config.show_art;this._sections.hero.querySelector(".hero")||(this._sections.hero.innerHTML=`
        <div class="hero">
          <div class="art" data-action="more-info">${g9(this._uid)}</div>
          <div class="status"></div>
          <div class="dial"></div>
        </div>`,this._heroNode=this._sections.hero.querySelector(".hero"),this._statusNode=this._sections.hero.querySelector(".status"),this._dialNode=this._sections.hero.querySelector(".dial")),this._heroNode.classList.toggle("no-art",!V);let e=this._sections.hero.querySelector(".art");e.hidden=!V,V&&_5(e.querySelector(".ac"),C);let t=x9(C),r=h9(C),i=`
      <div class="mode-name">${a(H(`mode_long.${C.on?C.mode:"off"}`,C.mode))}</div>
      <div class="state">${a(e1(H(t.key),t))}</div>
      <div class="state-sub">${a(r.key?e1(H(r.key),r):"")}</div>`;this._signatures.status!==i&&(this._signatures.status=i,this._statusNode.innerHTML=i);let o=this._dialHtml(C);this._signatures.dial!==o&&(this._signatures.dial=o,this._dialNode.innerHTML=o)}_dialHtml(C,H=!1){let V=C.target,e=!C.on||V===null,t=`<button type="button" data-action="temp" data-dir="1" data-target="${a(C.entityId)}"
      ${e||V>=C.maxTemp?"disabled":""} aria-label="+">${s("chevron_up")}</button>`,r=`<button type="button" data-action="temp" data-dir="-1" data-target="${a(C.entityId)}"
      ${e||V<=C.minTemp?"disabled":""} aria-label="\u2212">${s("chevron")}</button>`,i=`<div class="big">${V===null?"\u2013\u2013":g(V,1)}<small> ${a(C.unit)}</small></div>`;return H?`<div class="updown">${r}${t}</div>${i}`:`${i}<div class="updown">${t}${r}</div>`}_alertsHtml(C,H){let V=[];if(!C.isGroup&&C.away&&V.push(["info","away",H("alert.away")]),this._config.show_openings){let t=C.isGroup?C.draughty:C.draughty?[C]:[];for(let r of t){let i=this._ago(r.openings.openFor,H),o=r.openings.longest?.tilted;V.push(["","window_open",C.isGroup?e1(H(o?"alert.window_tilted_unit":"alert.window_open_unit"),{unit:r.name,duration:i}):e1(H(o?"alert.window_tilted":"alert.window_open"),{name:r.openings.longest?.name||H("ui.window"),duration:i})])}}return V.length?`<div class="alerts">${V.map(([t,r,i])=>`<div class="alert${t?` ${t}`:""}">${s(r)}<span>${a(i)}</span></div>`).join("")}</div>`:""}_ago(C,H){return W(C,H("ui.minute_short"),H("ui.hour_short"))}_openBadge(C,H){if(!this._config.show_openings)return"";let V=C.openings;if(V.none||!V.open)return"";let e=V.open>1?e1(H("ui.windows_open"),{count:V.open}):H(V.tilted?"ui.window_tilted":"ui.window_open");return`<span class="open-badge${C.draughty?"":" calm"}">${s("window_open")}${a(e)}</span>`}_segHtml(C,H){let V=C.modes?.length?C.modes:g1.map(i=>i.key),e=C.isGroup?C.mixed||!C.running?null:C.mode:C.on?C.mode:"off",t=C.isGroup?C.running===0:!C.on;return`<div class="seg">${g1.filter(i=>i.key==="off"||V.includes(i.key)).map(i=>{let o=i.key==="off"?t:e===i.key;return`
        <button type="button" class="${i.key==="off"?"power":""}"
          data-action="mode" data-value="${i.key}" data-target="${a(C.entityId)}"
          aria-pressed="${o}">
          ${s(i.icon)}<span>${a(H(`mode.${i.key}`))}</span>
        </button>`}).join("")}</div>`}_fanHtml(C,H){if(!C.fanModes.length)return"";let V=C.fanModes.filter(t=>String(t).toLowerCase()!=="auto"),e=C.fanModes.map((t,r)=>{let i=String(t).toLowerCase(),o=C.fanMode===t;if(i==="auto")return`<button type="button" class="auto ${o?"on":""}" data-action="fan"
            data-value="${a(t)}" data-target="${a(C.entityId)}"
            ${C.on?"":"disabled"} aria-label="Auto">A</button>`;let M=V.indexOf(t),n=8+M*1.8;return`<button type="button" class="${C.fanMode!==null&&String(C.fanMode).toLowerCase()!=="auto"&&M<=V.indexOf(C.fanMode)?"on":""}" style="height:${n.toFixed(1)}px"
          data-action="fan" data-value="${a(t)}" data-target="${a(C.entityId)}"
          ${C.on?"":"disabled"} aria-label="${a(this._fanLabel(t,H))}"></button>`}).join("");return`
      <div class="fan">
        <span class="cap">${a(H("ui.fan"))}</span>
        <div class="ticks">${e}</div>
        <span class="val">${a(C.fanMode?this._fanLabel(C.fanMode,H):"\u2013")}</span>
      </div>`}_fanLabel(C,H){return H(`fan.${String(C).toLowerCase()}`,String(C))}_swingLabel(C,H){return H(`swing.${String(C).toLowerCase()}`,String(C))}_buttonsHtml(C,H){let V=[];if(C.swingModes.length>1)if(this._config.show_all_swing)for(let e of C.swingModes)V.push(`
            <button type="button" class="ghost" data-action="swing" data-value="${a(e)}"
              data-target="${a(C.entityId)}" aria-pressed="${C.swingMode===e}"
              ${C.on?"":"disabled"}>${s("swing")}${a(this._swingLabel(e,H))}</button>`);else{let e=C.swingModes.find(r=>String(r).toLowerCase()!=="off"),t=C.swingModes.find(r=>String(r).toLowerCase()==="off");V.push(`
          <button type="button" class="ghost" data-action="swing"
            data-value="${a(C.swinging?t??"off":e??"vertical")}"
            data-target="${a(C.entityId)}" aria-pressed="${C.swinging}"
            ${C.on?"":"disabled"}>${s("swing")}${a(H("ui.swing"))}</button>`)}if(this._config.show_presets)for(let e of C.presets)V.push(`
          <button type="button" class="ghost" data-action="preset" data-value="${e.key}"
            data-target="${a(C.entityId)}" aria-pressed="${e.on}"
            ${C.on?"":"disabled"}>${s(e.icon)}${a(H(`preset.${e.key}`))}</button>`);return V.length?`<div class="btnrow">${V.join("")}</div>`:""}_renderGroup(C,H){this._section("top",this._topHtml(C,H)),this._groupHero(C,H),this._section("alerts",this._alertsHtml(C,H)),this._section("modes",this._config.show_modes?this._segHtml(C,H):""),this._section("fan",""),this._section("buttons",""),this._unitsSection(C,H)}_groupHero(C,H){this._sections.hero.querySelector(".hero")||(this._sections.hero.innerHTML=`
        <div class="hero no-art">
          <div class="status"></div>
          <div class="dial"></div>
        </div>`,this._heroNode=this._sections.hero.querySelector(".hero"),this._statusNode=this._sections.hero.querySelector(".status"),this._dialNode=this._sections.hero.querySelector(".dial")),this._heroNode.classList.add("no-art");let V=this._sections.hero.querySelector(".art");V&&(V.hidden=!0);let e=C.running===0?H("group.all_off"):C.mixed?H("group.mixed"):H(`mode_long.${C.mode}`,C.mode),t=`
      <div class="mode-name">${a(e)}</div>
      <div class="state">${a(e1(H("group.running"),C))}</div>
      <div class="state-sub">${a(C.mixed&&C.running?H("group.mixed_note"):H("group.in_step"))}</div>`;this._signatures.status!==t&&(this._signatures.status=t,this._statusNode.innerHTML=t);let r=this._dialHtml({...C,on:!0});this._signatures.dial!==r&&(this._signatures.dial=r,this._dialNode.innerHTML=r)}_unitsSection(C,H){let V=this._sections.units;V.querySelector(".rows")||(V.innerHTML=`
        <div class="divider"></div>
        <div class="sec-cap">${a(H("group.units"))}
          <span style="float:right;font-weight:500;letter-spacing:0;text-transform:none">
            ${a(H("group.tap_hint"))}</span></div>
        <div class="rows"></div>`,this._rowsNode=V.querySelector(".rows"),this._rows.clear()),V.hidden=!1;let e=new Set;for(let t of C.units){e.add(t.entityId);let r=this._rows.get(t.entityId);if(!r){let p=document.createElement("div");p.className="row",p.innerHTML=`
          <button class="row-head" type="button" data-action="toggle-row" data-target="${a(t.entityId)}">
            ${S9(this._uid)}
            <span><span class="rname"></span><span class="rstate"></span></span>
            <span class="rtemp"></span>
            ${s("chevron","icon caret")}
          </button>
          <div class="row-body"></div>`,this._rowsNode.appendChild(p),r={el:p,mini:p.querySelector(".mini"),name:p.querySelector(".rname"),state:p.querySelector(".rstate"),temp:p.querySelector(".rtemp"),body:p.querySelector(".row-body"),sig:{}},this._rows.set(t.entityId,r)}let i=this._open.has(t.entityId);r.el.classList.toggle("open",i),r.el.style.setProperty("--row-accent",this._accent(t.on?t.mode:"off")),_5(r.mini,t);let o=t.name;r.sig.name!==o&&(r.sig.name=o,r.name.textContent=o);let M=`${a(H(`mode_long.${t.on?t.mode:"off"}`,t.mode))}${t.on&&t.fanMode?` \xB7 ${a(this._fanLabel(t.fanMode,H))}`:""}${t.power!==null?`<em> \xB7 ${g(t.power,0)} ${a(t.powerUnit)}</em>`:""}${this._openBadge(t,H)}`;r.sig.state!==M&&(r.sig.state=M,r.state.innerHTML=M);let n=t.measured===null?"\u2013\u2013":g(t.measured,1),l=t.on?`${n} ${a(t.unit)} \u2192 <b>${g(t.target,1)} ${a(t.unit)}</b>`:`${n} ${a(t.unit)} \xB7 <b>${a(H("ui.standby_short"))}</b>`;r.sig.temp!==l&&(r.sig.temp=l,r.temp.innerHTML=l);let d=i?`${this._segHtml(t,H)}
           ${this._config.show_fan?this._fanHtml(t,H):""}
           <div class="rowbottom">
             <div>${this._buttonsHtml(t,H)}</div>
             <div class="dial">${this._dialHtml(t,!0)}</div>
           </div>`:"";r.sig.body!==d&&(r.sig.body=d,r.body.innerHTML=d)}for(let[t,r]of this._rows)e.has(t)||(r.el.remove(),this._rows.delete(t))}_onClick(C){let H=C.target.closest("[data-action]");if(!H||H.hasAttribute("disabled"))return;let{action:V,entity:e,value:t,dir:r,target:i}=H.dataset,o=this._model;if(!(!o?.ok&&V!=="more-info"))switch(V){case"more-info":this._moreInfo(e||o?.entityId);break;case"toggle-row":this._haptic("selection"),this._open.has(i)?this._open.delete(i):this._open.add(i),this._render();break;case"mode":this._haptic(t==="off"?"medium":"light"),this._call("set_hvac_mode",{entity_id:i,hvac_mode:t});break;case"fan":this._haptic("light"),this._call("set_fan_mode",{entity_id:i,fan_mode:t});break;case"swing":this._haptic("light"),this._call("set_swing_mode",{entity_id:i,swing_mode:t});break;case"preset":this._haptic("light"),this._call("set_preset_mode",{entity_id:i,preset_mode:H.getAttribute("aria-pressed")==="true"?"none":t});break;case"temp":this._stepTemperature(i,Number(r));break;default:break}}_stepTemperature(C,H){let V=this._model,e=V.isGroup&&C===V.entityId?V:V.isGroup?V.units.find(i=>i.entityId===C):V;if(!e||e.target===null)return;let t=e.targetStep||1,r=Math.min(e.maxTemp,Math.max(e.minTemp,Math.round((e.target+H*t)*10)/10));r!==e.target&&(this._haptic("light"),this._call("set_temperature",{entity_id:C,temperature:r}))}_call(C,H){return H.entity_id?this._hass.callService("climate",C,H):Promise.resolve()}_moreInfo(C){C&&this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:C},bubbles:!0,composed:!0}))}_haptic(C){this.dispatchEvent(new CustomEvent("haptic",{detail:C,bubbles:!0,composed:!0}))}};function b9(){customElements.get(V1)||(customElements.define(V1,y5),window.customCards=window.customCards||[],window.customCards.push({type:V1,name:"Daikin AC Card",description:"Card for Daikin air conditioners: modes, target temperature, fan and louver, with room sensors and a plug meter. Drives a climate group too.",preview:!0,documentationURL:"https://github.com/gabor-io/ha-appliance-custom-card"}),console.info(`%c ${V1} %c ${e9} `,"color:#fff;background:#0288d1;font-weight:700;border-radius:3px 0 0 3px","color:#0288d1;background:#e1f5fe;font-weight:700;border-radius:0 3px 3px 0"))}var bC=R({cardName:V1,toggles:["show_art","show_readings","show_modes","show_fan","show_presets","show_all_swing","show_openings","compact","animate"],defaults:b5,listDevices:_2,getLanguage:Z2,translator:g2,languages:S5});function w9(){customElements.get(j1)||customElements.define(j1,bC)}w9();b9();var t1="netatmo-heating-card",Q1="netatmo-heating-card-editor",O9="1.21.0",w1="netatmo",u1=[{key:"schedule",icon:"calendar",colour:"var(--nh-heat)"},{key:"away",icon:"away",colour:"var(--nh-away)"},{key:"frost_guard",icon:"frost_guard",colour:"var(--nh-frost)"}],k9=u1.map(L=>L.key);var y2=30,b2=15;var wC={card_name:"F\u0171t\xE9s",mode:{schedule:"\xDCtemterv",away:"T\xE1voll\xE9t",frost_guard:"Fagyv\xE9delem"},state:{heating_rooms:"{count} szob\xE1ban megy a f\u0171t\xE9s",nothing:"Egyik szoba sem k\xE9r h\u0151t",all_off:"A f\u0171t\xE9s \xE1ll",unavailable:"A f\u0171t\xE9s nem el\xE9rhet\u0151",room_heating:"F\u0171t {temp} \xB0C-ra",room_reached:"{temp} \xB0C-ot tart",room_dead:"A szelep nem v\xE1laszol"},sub:{schedule:"\xDCtemterv: {name}",away:"T\xE1voll\xE9ti h\u0151fok: {temp} \xB0C",frost_guard:"Fagyv\xE9delmi h\u0151fok: {temp} \xB0C"},head:{thermostat:"termoszt\xE1t",valve:"szelep"},room:{heating:"F\u0171t",reached:"El\xE9rte a h\u0151fokot",boost:"R\xE1seg\xEDt\xE9s",away:"T\xE1voll\xE9t",frost_guard:"Fagyv\xE9delem",unavailable:"Nem v\xE1laszol"},alert:{frost_guard:"Fagyv\xE9delem \u2013 a f\u0171t\xE9s ki van kapcsolva, csak {temp} \xB0C al\xE1 nem engedi a h\xE1zat",room_dead:"{room} \xB7 a szelep nem v\xE1laszol",battery_low:"{room} ({head}) \xB7 fogy az elem ({value} %)",battery_critical:"{room} ({head}) \xB7 az elem kritikus ({value} %) \u2013 cser\xE9ld ki",battery_silent:"{count} fej nem jelent elemszintet \u2013 n\xE9zd meg \u0151ket",window_open:"{room} \xB7 nyitva az ablak, mik\xF6zben f\u0171t ({duration})",window_tilted:"{room} \xB7 buk\xF3ra van az ablak, mik\xF6zben f\u0171t ({duration})",window_open_here:"Nyitva az ablak, mik\xF6zben f\u0171t ({duration})",window_tilted_here:"Buk\xF3ra van az ablak, mik\xF6zben f\u0171t ({duration})"},ui:{rooms:"Szob\xE1k",rooms_count:"{count} szoba",schedule:"\xDCtemterv",tap_hint:"koppints a vez\xE9rl\u0151k\xE9rt",outside:"Kint",boost:"R\xE1seg\xEDt\xE9s",turn_off:"Kikapcsol\xE1s",heads:"Fejek",heads_count:"{count} fej",no_sensor:"nincs \xE9rz\xE9kel\u0151",window_open:"nyitva",window_tilted:"buk\xF3ra",windows_open:"{count} nyitva",silent:"nem jelent",dead_hint:"A szelep nem jelentkezik be \u2013 val\xF3sz\xEDn\u0171leg lemer\xFClt az eleme.",stale:"nem friss\xFCl",current:"Most",no_entity:"Nem tal\xE1ltam Netatmo f\u0171t\xE9st ebben a Home Assistantban.",minute_short:"perce",hour_short:"\xF3r\xE1ja"},editor:{device:"K\xE9sz\xFCl\xE9k",device_auto:"Automatikus",language:"Nyelv",language_auto:"Automatikus",show_art:"K\xE9sz\xFCl\xE9krajz",show_schedule:"\xDCtemtervek",show_openings:"Nyit\xE1s\xE9rz\xE9kel\u0151k",show_batteries:"Elemszintek",compact:"Kompakt",animate:"Anim\xE1ci\xF3k"}},OC={card_name:"Heating",mode:{schedule:"Schedule",away:"Away",frost_guard:"Frost guard"},state:{heating_rooms:"Heating in {count} rooms",nothing:"No room is calling for heat",all_off:"Heating is off",unavailable:"Heating is unavailable",room_heating:"Heating to {temp} \xB0C",room_reached:"Holding {temp} \xB0C",room_dead:"The valve is not responding"},sub:{schedule:"Schedule: {name}",away:"Away temperature: {temp} \xB0C",frost_guard:"Frost guard: {temp} \xB0C"},head:{thermostat:"thermostat",valve:"valve"},room:{heating:"Heating",reached:"At temperature",boost:"Boost",away:"Away",frost_guard:"Frost guard",unavailable:"Not responding"},alert:{frost_guard:"Frost guard \u2013 heating is off, the house is only kept above {temp} \xB0C",room_dead:"{room} \xB7 the valve is not responding",battery_low:"{room} ({head}) \xB7 battery getting low ({value} %)",battery_critical:"{room} ({head}) \xB7 battery critical ({value} %) \u2013 replace it",battery_silent:"{count} heads report no battery level \u2013 check them",window_open:"{room} \xB7 window open while heating ({duration})",window_tilted:"{room} \xB7 window on the latch while heating ({duration})",window_open_here:"Window open while heating ({duration})",window_tilted_here:"Window on the latch while heating ({duration})"},ui:{rooms:"Rooms",rooms_count:"{count} rooms",schedule:"Schedule",tap_hint:"tap for controls",outside:"Outside",boost:"Boost",turn_off:"Turn off",heads:"Heads",heads_count:"{count} heads",no_sensor:"no sensor",window_open:"open",window_tilted:"on the latch",windows_open:"{count} open",silent:"silent",dead_hint:"The valve is not checking in \u2013 most likely a flat battery.",stale:"stale",current:"Now",no_entity:"No Netatmo heating found in this Home Assistant.",minute_short:"min",hour_short:"h"},editor:{device:"Device",device_auto:"Automatic",language:"Language",language_auto:"Automatic",show_art:"Device drawing",show_schedule:"Schedules",show_openings:"Opening sensors",show_batteries:"Battery levels",compact:"Compact",animate:"Animations"}},T9={hu:wC,en:OC},w5=Object.keys(T9);function w2(L,C){return k(L,C,w5)}function O2(L){return T(T9,L)}function $(L,C={}){return Object.entries(C).reduce((H,[V,e])=>H.replace(`{${V}}`,String(e)),L)}function q1(L){return Object.values(L?.entities||{})}function E9(L){return q1(L).filter(C=>C.platform===w1&&C.entity_id.startsWith("climate.")).map(C=>C.entity_id).sort()}function R9(L){return q1(L).find(H=>H.platform===w1&&H.entity_id.startsWith("select."))?.entity_id||null}function P9(L,C){return C?q1(L).filter(H=>H.device_id===C&&H.platform===w1&&H.entity_id.startsWith("climate.")).map(H=>H.entity_id):[]}function B9(L){let C=new Map;for(let H of q1(L)){if(H.platform!==w1||!H.device_id||!H.entity_id.startsWith("climate."))continue;let V=L.devices?.[H.device_id];V&&C.set(H.device_id,V.name_by_user||V.name||H.device_id)}return[...C.entries()].map(([H,V])=>({id:H,name:V}))}function $9(L,C,H){let V=H?L?.areas?.[H]:null;if(V?.name)return V.name;let e=L?.states?.[C]?.attributes?.friendly_name;return e?e.replace(/\s+Netatmo\s+(Valve|Thermostat)$/i,"").trim()||e:C}function kC(L,C){let H=L.replace(/^sensor\./,"").replace(/_battery(_percent)?$/,"");C&&H.startsWith(`${C}_`)&&(H=H.slice(C.length+1)),H=H.replace(/^netatmo_/,"");let V=/^(valve|thermostat)_(.+)$/.exec(H);return V&&(H=V[2]),H.replace(/_/g," ").trim()||L}function F9(L,C){if(!C)return[];let H=[];for(let V of q1(L)){if(V.platform!==w1||!V.entity_id.startsWith("sensor.")||N(L,V.entity_id)!==C)continue;let e=L.states?.[V.entity_id];if((e?.attributes?.device_class||V.original_device_class)!=="battery")continue;let r=x(e)?null:Number(e.state);H.push({entityId:V.entity_id,label:kC(V.entity_id,C),battery:Number.isFinite(r)?r:null})}return H.sort((V,e)=>V.entityId.localeCompare(e.entityId))}function N9(L,C,H,V){let e=H?.openings||{};return e.auto===!1&&!e.rooms?.[V]?[]:y1(L,{areas:C?[C]:[],classes:e.classes||m1,include:e.rooms?.[V]||[],exclude:e.ignore||[]})}function TC(L,C){if(!C)return null;let H=L?.states?.[C];if(x(H))return null;let V=Number(H.state);return Number.isFinite(V)?V:null}function EC(L,C,H){let V=L?.states?.[C];if(!V)return null;let e=V.attributes||{},t=N(L,C),r=!x(V),i=Object.prototype.hasOwnProperty.call(e,"heating_power_request"),o=i?Number(e.heating_power_request):null,M=r?i?o>0:e.hvac_action==="heating":!1,n=H?.show_batteries===!1?[]:F9(L,t),l=H?.show_openings===!1?[]:N9(L,t,H,C);return{entityId:C,area:t,name:H?.rooms?.[C]?.name||$9(L,C,t),available:r,mode:V.state,action:e.hvac_action||null,preset:e.preset_mode||null,boost:e.preset_mode==="boost",current:e.current_temperature??null,target:e.temperature??null,minTemp:e.min_temp??7,maxTemp:e.max_temp??30,step:e.target_temp_step??.5,schedule:e.selected_schedule||null,request:i?o:null,heating:M,canTurnOff:(e.hvac_modes||[]).includes("off"),heads:n,openings:L1(l,H?.open_delay??c1,{pairs:H?.openings?.pairs,windows:H?.openings?.windows})}}function RC(L){let C=L.filter(H=>H.available&&H.preset&&k9.includes(H.preset)).map(H=>H.preset);return C.length?[...new Set(C)].sort((H,V)=>C.filter(e=>e===V).length-C.filter(e=>e===H).length)[0]:"schedule"}function PC(L,C){if(C?.entity)return{ids:[C.entity],picked:!0};if(C?.device){let H=P9(L,C.device);if(H.length)return{ids:H,picked:!0}}return C?.entities?.length?{ids:C.entities,picked:!0}:{ids:E9(L),picked:!1}}function D9(L,C){let{ids:H,picked:V}=PC(L,C);if(!H.length)return{ok:!1,reason:"no_entity"};let e=H.map(d=>EC(L,d,C)).filter(Boolean);if(!e.length)return{ok:!1,reason:"no_entity"};let t=C?.schedule_entity||R9(L),r=t?L?.states?.[t]:null,i=e.filter(d=>d.available),o=e.filter(d=>d.heating),M=i[0]||e[0],n=e.flatMap(d=>d.heads.map(p=>({...p,room:d.name})));return{ok:!0,single:C?.view==="room"||C?.view!=="house"&&V&&e.length===1,room:e[0],rooms:e,heating:o.length,mode:RC(e),schedule:{entityId:t,current:r&&!x(r)?r.state:null,options:r?.attributes?.options||[]},setpoint:M?.target??null,outside:TC(L,C?.sources?.outside),outsideStale:BC(L,C?.sources?.outside_connectivity),heads:n,batteryLow:n.filter(d=>d.battery!==null&&d.battery<=y2),batteryCritical:n.filter(d=>d.battery!==null&&d.battery<=b2),batterySilent:n.filter(d=>d.battery===null).length,dead:e.filter(d=>!d.available),draughty:e.filter(d=>d.heating&&d.openings.warn)}}function BC(L,C){if(!C)return!1;let H=L?.states?.[C];return H?H.state==="off":!1}function I9(L){return`
  <svg class="defs" width="0" height="0" aria-hidden="true"><defs>
    <linearGradient id="${L}-knurl" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#b9bec2"/><stop offset=".3" stop-color="#eceef0"/>
      <stop offset=".6" stop-color="#c3c8cc"/><stop offset="1" stop-color="#9aa0a5"/>
    </linearGradient>
    <linearGradient id="${L}-body" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#ffffff"/><stop offset=".55" stop-color="#f7f9fa"/>
      <stop offset="1" stop-color="#e2e6e9"/>
    </linearGradient>
    <filter id="${L}-warm" x="-60%" y="-60%" width="220%" height="220%">
      <feGaussianBlur stdDeviation="4"/>
    </filter>
    <filter id="${L}-soft" x="-50%" y="-40%" width="200%" height="190%">
      <feGaussianBlur stdDeviation="3"/>
    </filter>
  </defs></svg>`}function O5(L){return`
  <svg class="dev thermostat" viewBox="0 0 120 120" role="img" aria-hidden="true">
    <ellipse class="shadow" cx="62" cy="106" rx="40" ry="5" filter="url(#${L}-soft)"/>
    <rect class="glow soft" x="12" y="10" width="84" height="84" rx="9" filter="url(#${L}-warm)"/>
    <rect class="shade" x="14" y="12" width="80" height="80" rx="8"/>
    <rect class="edge" x="14" y="12" width="80" height="80" rx="8"/>
    <rect class="glow soft" x="24" y="20" width="86" height="86" rx="10" filter="url(#${L}-warm)"/>
    <rect x="26" y="22" width="82" height="82" rx="9" fill="url(#${L}-body)"/>
    <rect class="edge" x="26" y="22" width="82" height="82" rx="9"/>
    <rect class="glow" x="26" y="98" width="82" height="6" rx="3"/>
    <rect class="glow" x="104" y="22" width="4" height="82" rx="2"/>
    <rect class="screen" x="46" y="42" width="42" height="42" rx="3"/>
    <text class="digit current" x="52" y="66" font-size="22">--</text>
    <text class="digit frac" x="78" y="55" font-size="10"></text>
    <text class="digit ghost target" x="52" y="80" font-size="13">--</text>
  </svg>`}function k5(L){return`
  <svg class="dev valve" viewBox="0 0 120 70" role="img" aria-hidden="true">
    <ellipse class="shadow" cx="62" cy="60" rx="38" ry="4" filter="url(#${L}-soft)"/>
    <rect x="8" y="20" width="16" height="26" rx="3" fill="url(#${L}-knurl)"/>
    <rect class="glow soft" x="20" y="10" width="86" height="46" rx="12" filter="url(#${L}-warm)"/>
    <rect x="22" y="12" width="82" height="42" rx="11" fill="url(#${L}-body)"/>
    <rect class="edge" x="22" y="12" width="82" height="42" rx="11"/>
    <rect class="glow" x="88" y="12" width="7" height="42" rx="3.5"/>
    <ellipse class="shade" cx="99" cy="33" rx="9" ry="21"/>
    <ellipse cx="99" cy="33" rx="7" ry="18" fill="#fcfdfd"/>
    <ellipse class="edge" cx="99" cy="33" rx="9" ry="21"/>
    <rect class="screen" x="40" y="20" width="26" height="17" rx="2"/>
    <text class="digit target" x="44" y="34" font-size="13">--</text>
  </svg>`}function T5(L,C){if(!L)return;L.classList.toggle("lit",!!C.heating),L.classList.toggle("dead",!C.available);let H=C.request===null?.85:.4+Math.min(100,C.request)/200;L.style.setProperty("--lit",H.toFixed(2));let V=(e,t)=>{let r=L.querySelector(e);r&&r.textContent!==t&&(r.textContent=t)};if(!C.available){V(".current","--"),V(".frac",""),V(".target","--");return}C.current!==null&&(V(".current",String(Math.floor(C.current))),V(".frac",String(Math.round(C.current%1*10)))),C.target!==null&&V(".target",String(C.target).replace(".5","\u2075"))}var z9=`
${E}

:host {
  --nh-heat: #f57c00;
  --nh-away: #6c4ec4;
  --nh-frost: #0288d1;
  --nh-idle: var(--state-icon-color, #8a9199);
}

.wrap { padding: 14px 16px 16px; gap: 12px; position: relative; }
.wrap::before {
  content: ''; position: absolute; inset: 0; pointer-events: none;
  background: radial-gradient(120% 80% at 0% 0%,
    color-mix(in srgb, var(--ap-accent) 11%, transparent), transparent 62%);
}
.wrap > * { position: relative; }

/* ---------- header ---------- */
.top { display: flex; align-items: flex-start; gap: 10px; }
.top .name { font-size: 1rem; font-weight: 650; letter-spacing: -.01em; cursor: pointer; }
.top .sub { font-size: .72rem; color: var(--ap-muted); margin-top: 1px; }
.top .spacer { flex: 1; }

/* ---------- hero ---------- */
.hero { display: grid; grid-template-columns: 92px minmax(0,1fr) auto; gap: 14px; align-items: center; }
.compact .hero { grid-template-columns: 70px minmax(0,1fr) auto; }
@container (max-width: 340px) { .hero { grid-template-columns: minmax(0,1fr) auto; } .hero .art { display: none; } }
.mode-name { font-size: .68rem; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; color: var(--ap-accent); }
.state { font-size: 1.02rem; font-weight: 600; line-height: 1.25; margin-top: 2px; letter-spacing: -.01em; }
.state-sub { font-size: .76rem; color: var(--ap-muted); margin-top: 2px; }
.outside { text-align: right; }
.outside .cap { margin-bottom: 2px; }
.big {
  white-space: nowrap; font-size: 2.5rem; font-weight: 600; letter-spacing: -.04em;
  line-height: .9; font-variant-numeric: tabular-nums; color: var(--ap-text);
}
.big small { font-size: .95rem; font-weight: 600; color: var(--ap-muted); letter-spacing: 0; }
.big.muted { color: var(--ap-muted); }

/* ---------- segmented house mode ---------- */
.seg {
  display: grid; grid-auto-flow: column; grid-auto-columns: 1fr; gap: 2px;
  background: color-mix(in srgb, var(--ap-text) 6%, transparent); border-radius: 13px; padding: 3px;
}
.seg button {
  border: 0; background: transparent; cursor: pointer; color: var(--ap-muted); font: inherit;
  font-size: .68rem; font-weight: 600; display: grid; justify-items: center; gap: 2px;
  padding: 7px 2px 6px; border-radius: 10px; transition: background .18s, color .18s, box-shadow .18s;
}
.seg .icon { width: 18px; height: 18px; }
.seg button:hover { color: var(--ap-text); }
.seg button[aria-pressed="true"] {
  background: var(--card-background-color, #fff); color: var(--ap-accent);
  box-shadow: 0 1px 3px rgba(0,0,0,.14), 0 0 0 1px color-mix(in srgb, var(--ap-accent) 22%, transparent);
}

/* ---------- chips ---------- */
.cap { font-size: .66rem; font-weight: 700; letter-spacing: .09em; text-transform: uppercase; color: var(--ap-muted); }
.cap .hint { float: right; font-weight: 500; letter-spacing: 0; text-transform: none; }
.chips { display: flex; flex-wrap: wrap; gap: 6px; }
.chip {
  display: inline-flex; align-items: center; gap: 5px; padding: 6px 11px; border-radius: 999px;
  border: 1px solid var(--ap-line); background: transparent; color: var(--ap-text);
  font: inherit; font-size: .76rem; font-weight: 500; cursor: pointer;
}
.chip .icon { width: 15px; height: 15px; color: var(--ap-muted); }
.chip:hover:not([disabled]) { border-color: var(--ap-accent); }
.chip[aria-pressed="true"] {
  background: color-mix(in srgb, var(--ap-accent) 14%, transparent);
  border-color: color-mix(in srgb, var(--ap-accent) 40%, transparent);
  color: var(--ap-accent); font-weight: 650;
}
.chip[aria-pressed="true"] .icon { color: var(--ap-accent); }
.chip[disabled] { opacity: .4; cursor: not-allowed; }
.divider { height: 1px; background: var(--ap-line); }

/* ---------- alerts ---------- */
.alert {
  display: flex; align-items: center; gap: 9px; padding: 9px 11px; border-radius: 11px;
  font-size: .79rem; line-height: 1.3;
  background: color-mix(in srgb, var(--ap-accent) 13%, transparent);
}
.alert .icon { width: 17px; height: 17px; flex: 0 0 auto; color: var(--ap-accent); }
.alert.quiet { background: color-mix(in srgb, var(--ap-text) 7%, transparent); }
.alert.quiet .icon { color: var(--ap-muted); }
.alert.warn { background: color-mix(in srgb, var(--nh-heat) 15%, transparent); }
.alert.warn .icon { color: var(--nh-heat); }

/* ---------- rooms ---------- */
.rooms { display: grid; gap: 6px; }
.room { border-radius: 13px; --ap-accent: var(--row-accent); }
.room.open { background: color-mix(in srgb, var(--row-accent) 8%, transparent); }
.rhead {
  display: grid; grid-template-columns: 52px minmax(0,1fr) auto 16px; gap: 10px; align-items: center;
  width: 100%; padding: 7px 10px 7px 6px; border: 0; background: transparent; cursor: pointer;
  border-radius: 13px; font: inherit; color: var(--ap-text); text-align: left;
}
.rhead:hover { background: color-mix(in srgb, var(--ap-text) 4%, transparent); }
.room.open .rhead:hover { background: transparent; }
.rname { display: block; font-size: .89rem; font-weight: 600; letter-spacing: -.01em; }
.rname em { font-style: normal; font-weight: 500; color: var(--ap-muted); font-size: .74rem; }
.rstate { display: block; font-size: .71rem; font-weight: 600; color: var(--row-accent); margin-top: 1px; }
.rstate em { font-style: normal; color: var(--ap-muted); font-weight: 500; }
.rtemp { text-align: right; font-size: .78rem; color: var(--ap-muted); font-variant-numeric: tabular-nums; white-space: nowrap; }
.rtemp b { font-size: 1.02rem; color: var(--ap-text); font-weight: 650; letter-spacing: -.02em; }
.caret { width: 16px; height: 16px; color: var(--ap-muted); transition: transform .25s; }
.room.open .caret { transform: rotate(180deg); }
.room.dead .rname, .room.dead .rtemp { color: var(--ap-muted); }
.room.dead .rhead { opacity: .62; }

/* the heating request, where the device reports one */
.req { grid-column: 2 / -1; margin-top: 4px; }
.req .track { height: 5px; border-radius: 999px; background: color-mix(in srgb, var(--ap-text) 10%, transparent); overflow: hidden; }
.req .track i { display: block; height: 100%; border-radius: 999px; background: var(--nh-heat); transition: width .6s ease; }

.rbody { display: none; padding: 2px 10px 11px; gap: 9px; }
.room.open .rbody { display: grid; }
/* a one-room card is nothing but the body, so it is never folded away */
.rbody.single { display: grid; padding: 10px 2px 2px; gap: 11px; }
/* the same request bar as a room row, but inline under the hero's state */
.req.single { display: flex; align-items: center; gap: 8px; margin-top: 7px; }
.req.single .track { flex: 1; }
.req.single .req-val {
  font-size: .72rem; font-weight: 650; color: var(--nh-heat);
  font-variant-numeric: tabular-nums;
}
.rrow { display: flex; align-items: center; justify-content: space-between; gap: 10px; flex-wrap: wrap; }
.updown { display: inline-grid; grid-auto-flow: column; gap: 5px; }
.updown button {
  width: 31px; height: 29px; border-radius: 9px; cursor: pointer; padding: 0;
  border: 1px solid var(--ap-line); background: transparent; color: var(--ap-text);
  display: grid; place-items: center;
}
.updown .icon { width: 15px; height: 15px; }
.updown button:hover:not([disabled]) { border-color: var(--ap-accent); color: var(--ap-accent); }
.updown button[disabled] { opacity: .35; cursor: not-allowed; }
.rbody .big { font-size: 1.45rem; }
.rbody .big small { font-size: .72rem; }
.quiet { font-size: .76rem; color: var(--ap-muted); }

/* ---------- heads and openings ---------- */
.tags { display: flex; flex-wrap: wrap; gap: 6px; }
.tag {
  display: inline-flex; align-items: center; gap: 4px; padding: 4px 9px; border-radius: 999px;
  background: color-mix(in srgb, var(--ap-text) 6%, transparent);
  font-size: .7rem; color: var(--ap-muted);
}
.tag .icon { width: 12px; height: 12px; }
.tag b { color: var(--ap-text); font-weight: 650; }
.tag.low { background: color-mix(in srgb, var(--nh-heat) 15%, transparent); color: var(--nh-heat); }
.tag.low b { color: var(--nh-heat); }
.tag.silent b { color: var(--ap-muted); font-weight: 500; font-style: italic; }

.open-badge {
  display: inline-flex; align-items: center; gap: 4px; margin-left: 7px; padding: 1px 7px;
  border-radius: 999px; font-size: .64rem; font-weight: 700; vertical-align: 1px;
  background: color-mix(in srgb, var(--nh-heat) 18%, transparent); color: var(--nh-heat);
}
.open-badge .icon { width: 11px; height: 11px; }
.open-badge.none { background: color-mix(in srgb, var(--ap-text) 8%, transparent); color: var(--ap-muted); font-weight: 600; }

/* ---------- the devices ---------- */
.defs { position: absolute; width: 0; height: 0; }
.dev { display: block; width: 100%; height: auto; }
.art { cursor: pointer; }
.shell { fill: #fdfdfd; }
.shade { fill: #eceff1; }
.edge { fill: none; stroke: #000; stroke-opacity: .1; }
.shadow { fill: #000; opacity: .15; }
.screen { fill: #e4e7e8; }
.digit { fill: #4a5158; font-family: "DIN Alternate", "Helvetica Neue", Arial, sans-serif; font-weight: 700; }
.digit.ghost { fill: none; stroke: #8b9298; stroke-width: 1.1; }

.glow { fill: var(--nh-heat); opacity: 0; transition: opacity .5s ease; }
.lit .glow { opacity: var(--lit, .85); animation: nh-ember 5s ease-in-out infinite; }
.lit .glow.soft { opacity: calc(var(--lit, .85) * .7); }
@keyframes nh-ember {
  0%, 100% { opacity: var(--lit, .85); }
  50% { opacity: calc(var(--lit, .85) * .62); }
}
.dev.dead { opacity: .45; }
`;var R5={language:"auto",compact:!1,animate:!0,show_art:!0,show_schedule:!0,show_openings:!0,show_batteries:!0,show_modes:null},W9=0,E5=class extends HTMLElement{static getConfigElement(){return document.createElement(Q1)}static getStubConfig(){return{type:`custom:${t1}`}}constructor(){super(),this.attachShadow({mode:"open"}),this._sections={},this._signatures={},this._rows=new Map,this._open=new Set,this._built=!1,W9+=1,this._uid=`nheat${W9}`}setConfig(C){this._config={...R5,...C||{}},this._signatures={},this._rows.clear(),this._hass&&this._render()}set hass(C){this._hass=C,this._render()}get hass(){return this._hass}connectedCallback(){this._timer=window.setInterval(()=>this._render(),6e4)}disconnectedCallback(){this._timer&&window.clearInterval(this._timer),this._timer=void 0}getCardSize(){return 5+(this._model?.rooms?.length||0)}getGridOptions(){return{columns:12,min_columns:6,rows:"auto"}}_build(){let C=document.createElement("style");C.textContent=z9;let H=document.createElement("ha-card"),V=document.createElement("div");V.className="wrap",V.addEventListener("click",e=>this._onClick(e)),V.insertAdjacentHTML("beforeend",I9(this._uid));for(let e of["top","hero","alerts","modes","schedule","rooms"]){let t=document.createElement("div");t.dataset.section=e,this._sections[e]=t,V.appendChild(t)}H.appendChild(V),this.shadowRoot.replaceChildren(C,H),this._wrap=V,this._built=!0}_render(){if(!this._hass||!this._config)return;this._built||this._build();let C=O2(w2(this._config,this._hass)),H=D9(this._hass,this._config);if(this._model=H,!H.ok){this._renderEmpty(H,C);return}this._emptyShown=!1,this._applyWrapClasses(H),this._section("top",this._topHtml(H,C)),this._heroSection(H,C),this._section("alerts",this._alertsHtml(H,C));let V=this._config.show_modes??!H.single;this._section("modes",V?this._segHtml(H,C):""),this._section("schedule",V?this._scheduleHtml(H,C):""),H.single?this._singleRoomSection(H,C):this._roomsSection(H,C)}_singleRoomSection(C,H){this._rows.clear();let V=this._sections.rooms,e=`<div class="divider"></div>
      <div class="rbody single">${this._roomBodyHtml(C.room,H)}</div>`;this._signatures.single!==e&&(this._signatures.single=e,V.innerHTML=e),V.hidden=!1}_renderEmpty(C,H){if(this._emptyShown!==C.reason){this._emptyShown=C.reason,this._signatures={},this._rows.clear();for(let[V,e]of Object.entries(this._sections))e.innerHTML="",e.hidden=V!=="top";this._sections.top.innerHTML=`
      <div class="empty">${s("radiator")}
        <div>${a(H(`ui.${C.reason}`))}</div>
      </div>`}}_section(C,H){this._signatures[C]!==H&&(this._signatures[C]=H,this._sections[C].innerHTML=H,this._sections[C].hidden=!H)}_applyWrapClasses(C){let H=["wrap"];this._config.compact&&H.push("compact"),this._config.animate||H.push("no-animation"),this._hass.themes?.darkMode&&H.push("dark");let V=H.join(" ");this._wrap.className!==V&&(this._wrap.className=V);let e=(u1.find(t=>t.key===C.mode)||u1[0]).colour;this._wrap.style.getPropertyValue("--ap-accent")!==e&&this._wrap.style.setProperty("--ap-accent",e)}_topHtml(C,H){let V=u1.find(r=>r.key===C.mode)||u1[0],e=this._config.name||(C.single?C.room.name:H("card_name")),t=C.single?`Netatmo \xB7 ${a($(H("ui.heads_count"),{count:C.room.heads.length}))}`:`Netatmo \xB7 ${a($(H("ui.rooms_count"),{count:C.rooms.length}))}${C.heads.length?`, ${a($(H("ui.heads_count"),{count:C.heads.length}))}`:""}`;return`
      <div class="top">
        <div>
          <div class="name">${a(e)}</div>
          <div class="sub">${t}</div>
        </div>
        <div class="spacer"></div>
        <span class="pill">${s(V.icon)}${a(H(`mode.${V.key}`))}</span>
      </div>`}_hasThermostat(C){return!!C?.heads.some(H=>/thermostat/i.test(H.label))}_heroSection(C,H){let V=C.single&&!this._hasThermostat(C.room);this._heroShape!==(V?"valve":"thermostat")&&(this._heroShape=V?"valve":"thermostat",this._sections.hero.innerHTML=`
        <div class="hero">
          <div class="art">${V?k5(this._uid):O5(this._uid)}</div>
          <div class="status"></div>
          <div class="outside"></div>
        </div>`,this._statusNode=this._sections.hero.querySelector(".status"),this._outsideNode=this._sections.hero.querySelector(".outside"),this._signatures.status=null,this._signatures.outside=null);let e=this._sections.hero.querySelector(".art");if(e.hidden=!this._config.show_art,this._config.show_art){let d=C.single?C.room:C.rooms.find(p=>this._hasThermostat(p))||C.rooms.find(p=>p.heating)||C.rooms[0];T5(e.querySelector(".dev"),{...d,heating:C.single?d.heating:C.heating>0,request:C.single?d.request:null})}let t=C.single?this._roomHeadline(C.room,C.mode,H):C.heating?$(H("state.heating_rooms"),{count:C.heating}):C.mode==="frost_guard"?H("state.all_off"):H("state.nothing"),r=C.mode==="schedule"?$(H("sub.schedule"),{name:C.schedule.current||"\u2013"}):$(H(`sub.${C.mode}`),{temp:B(C.setpoint,this._hass,1)}),i=C.single?C.room:null,M=!!(i?.heating&&i.request!==null)?`<div class="req single"><div class="track"><i style="width:${Math.min(100,i.request)}%"></i></div>
           <span class="req-val">${i.request} %</span></div>`:"",n=`
      <div class="mode-name">${a(H(`mode.${C.mode}`))}</div>
      <div class="state">${a(t)}</div>
      <div class="state-sub">${a(r)}</div>
      ${M}`;this._signatures.status!==n&&(this._signatures.status=n,this._statusNode.innerHTML=n);let l=C.single?this._roomReadingHtml(C.room,H):C.outside===null?"":`<div class="cap">${a(H("ui.outside"))}${C.outsideStale?`<span class="open-badge none">${a(H("ui.stale"))}</span>`:""}</div>
           <div class="big ${C.outsideStale?"muted":""}">${B(C.outside,this._hass,1)}<small> \xB0C</small></div>`;this._signatures.outside!==l&&(this._signatures.outside=l,this._outsideNode.innerHTML=l)}_roomHeadline(C,H,V){return C.available?C.heating&&C.target!==null?$(V("state.room_heating"),{temp:B(C.target,this._hass,1)}):C.target!==null?$(V("state.room_reached"),{temp:B(C.target,this._hass,1)}):this._roomState(C,H,V):V("state.room_dead")}_roomReadingHtml(C,H){let V=C.current===null?"\u2013":`${B(C.current,this._hass,1)}<small> \xB0C</small>`;return`<div class="cap">${a(H("ui.current"))}</div>
      <div class="big ${C.available?"":"muted"}">${V}</div>`}_alertsHtml(C,H){let V=[];C.mode==="frost_guard"&&V.push(["","frost_guard",$(H("alert.frost_guard"),{temp:B(C.setpoint,this._hass,1)})]);for(let e of C.draughty){let r=`alert.window_${e.openings.longest?.tilted?"tilted":"open"}${C.single?"_here":""}`;V.push(["warn","window_open",$(H(r),{room:e.name,duration:this._ago(e.openings.openFor,H)})])}if(!C.single)for(let e of C.dead)V.push(["quiet","battery",$(H("alert.room_dead"),{room:e.name})]);for(let e of C.batteryLow){let t=e.battery<=b2;V.push([t?"warn":"quiet","battery",$(H(t?"alert.battery_critical":"alert.battery_low"),{room:e.room,head:e.label,value:e.battery})])}return C.batterySilent&&V.push(["quiet","battery",$(H("alert.battery_silent"),{count:C.batterySilent})]),V.length?V.map(([e,t,r])=>`<div class="alert ${e}">${s(t)}<span>${a(r)}</span></div>`).join(""):""}_ago(C,H){return W(C,H("ui.minute_short"),H("ui.hour_short"))}_segHtml(C,H){return`<div class="seg">${u1.map(e=>`
      <button type="button" data-action="mode" data-value="${e.key}"
        aria-pressed="${e.key===C.mode}">
        ${s(e.icon)}<span>${a(H(`mode.${e.key}`))}</span>
      </button>`).join("")}</div>`}_scheduleHtml(C,H){if(!this._config.show_schedule||C.mode!=="schedule"||!C.schedule.options.length)return"";let V=C.schedule.options.map(e=>`
        <button type="button" class="chip" data-action="schedule" data-value="${a(e)}"
          aria-pressed="${e===C.schedule.current}">${a(e)}</button>`).join("");return`
      <div>
        <div class="cap" style="margin-bottom:6px">${a(H("ui.schedule"))}</div>
        <div class="chips">${V}</div>
      </div>`}_roomsSection(C,H){let V=this._sections.rooms;V.querySelector(".rooms")||(V.innerHTML=`
        <div class="divider"></div>
        <div class="cap">${a(H("ui.rooms"))}<span class="hint">${a(H("ui.tap_hint"))}</span></div>
        <div class="rooms"></div>`,this._roomsNode=V.querySelector(".rooms"),this._rows.clear()),V.hidden=!1;let e=new Set;for(let t of C.rooms){e.add(t.entityId);let r=this._rows.get(t.entityId);if(!r){let v=document.createElement("div");v.className="room",v.innerHTML=`
          <button class="rhead" type="button" data-action="toggle-row" data-room="${a(t.entityId)}">
            <div class="art">${t.heads.some(f=>/thermostat/.test(f.label))?O5(this._uid):k5(this._uid)}</div>
            <span><span class="rname"></span><span class="rstate"></span></span>
            <span class="rtemp"></span>
            ${s("chevron","icon caret")}
            <div class="req" hidden><div class="track"><i></i></div></div>
          </button>
          <div class="rbody"></div>`,this._roomsNode.appendChild(v),r={el:v,dev:v.querySelector(".dev"),name:v.querySelector(".rname"),state:v.querySelector(".rstate"),temp:v.querySelector(".rtemp"),req:v.querySelector(".req"),bar:v.querySelector(".req i"),body:v.querySelector(".rbody"),sig:{}},this._rows.set(t.entityId,r)}let i=this._open.has(t.entityId);r.el.classList.toggle("open",i),r.el.classList.toggle("dead",!t.available),r.el.style.setProperty("--row-accent",this._roomColour(t,C.mode)),T5(r.dev,t);let o=this._openBadge(t,H),M=`${a(t.name)}${t.heads.length>1?` <em>\xB7 ${a($(H("ui.heads_count"),{count:t.heads.length}))}</em>`:""}${o}`;r.sig.name!==M&&(r.sig.name=M,r.name.innerHTML=M);let n=`${a(this._roomState(t,C.mode,H))}${t.heating&&t.request!==null?`<em> \xB7 ${t.request} %</em>`:""}`;r.sig.state!==n&&(r.sig.state=n,r.state.innerHTML=n);let l=t.available?`${B(t.current,this._hass,1)} \xB0C \u2192 <b>${B(t.target,this._hass,1)} \xB0C</b>`:"<b>\u2013</b>";r.sig.temp!==l&&(r.sig.temp=l,r.temp.innerHTML=l);let d=t.heating&&t.request!==null;r.req.hidden=!d,d&&(r.bar.style.width=`${Math.min(100,t.request)}%`);let p=i?this._roomBodyHtml(t,H):"";r.sig.body!==p&&(r.sig.body=p,r.body.innerHTML=p)}for(let[t,r]of this._rows)e.has(t)||(r.el.remove(),this._rows.delete(t))}_roomColour(C,H){return C.available?C.heating?"var(--nh-heat)":H==="frost_guard"?"var(--nh-frost)":H==="away"?"var(--nh-away)":"var(--nh-idle)":"var(--nh-idle)"}_roomState(C,H,V){return C.available?C.boost?V("room.boost"):C.heating?V("room.heating"):V(H==="frost_guard"?"room.frost_guard":H==="away"?"room.away":"room.reached"):V("room.unavailable")}_openBadge(C,H){if(!this._config.show_openings)return"";let V=C.openings;if(V.none)return`<span class="open-badge none">${s("window_open")}${a(H("ui.no_sensor"))}</span>`;if(!V.open)return"";let e=this._openLabel(V,H);return`<span class="open-badge">${s("window_open")}${a(e)}</span>`}_openLabel(C,H){return C.open>1?$(H("ui.windows_open"),{count:C.open}):H(C.tilted?"ui.window_tilted":"ui.window_open")}_roomBodyHtml(C,H){if(!C.available)return`<div class="quiet">${a(H("ui.dead_hint"))}</div>${this._headsHtml(C,H)}`;let V=C.target===null;return`${`
      <div class="rrow">
        <div class="chips">
          <button type="button" class="chip" data-action="boost" data-room="${a(C.entityId)}"
            aria-pressed="${C.boost}">${s("boost")}${a(H("ui.boost"))}</button>
          ${C.canTurnOff?`<button type="button" class="chip" data-action="off" data-room="${a(C.entityId)}"
                 aria-pressed="${C.mode==="off"}">${s("power")}${a(H("ui.turn_off"))}</button>`:""}
        </div>
        <div style="display:flex;align-items:center;gap:8px">
          <div class="updown">
            <button type="button" data-action="temp" data-room="${a(C.entityId)}" data-dir="-1"
              ${V||C.target<=C.minTemp?"disabled":""}>${s("chevron")}</button>
            <button type="button" data-action="temp" data-room="${a(C.entityId)}" data-dir="1"
              ${V||C.target>=C.maxTemp?"disabled":""}>${s("chevron_up")}</button>
          </div>
          <div class="big">${B(C.target,this._hass,1)}<small> \xB0C</small></div>
        </div>
      </div>`}${this._openingsHtml(C,H)}${this._headsHtml(C,H)}`}_openingsHtml(C,H){if(!this._config.show_openings||C.openings.none)return"";let V=C.openings;if(!V.open)return"";let e=V.longest?.name||H("ui.window_open"),t=V.longest?.tilted?` \xB7 ${H("ui.window_tilted")}`:"";return`<div class="tags"><span class="tag low">${s("window_open")}
      ${a(e+t)}
      <b>${a(this._ago(V.openFor,H))}</b></span></div>`}_headsHtml(C,H){return!this._config.show_batteries||!C.heads.length?"":`<div class="tags">${C.heads.map(e=>{let t=e.battery===null?"silent":e.battery<=y2?"low":"",r=e.battery===null?H("ui.silent"):`${e.battery} %`,i=H(`head.${e.label}`,e.label);return`<span class="tag ${t}" data-action="more-info" data-entity="${a(e.entityId)}">
          ${s("battery")}${a(i)} <b>${a(r)}</b></span>`}).join("")}</div>`}_onClick(C){let H=C.target.closest("[data-action]");if(!H||H.hasAttribute("disabled"))return;let{action:V,room:e,value:t,dir:r,entity:i}=H.dataset,o=this._model;if(!(!o?.ok&&V!=="more-info"))switch(V){case"more-info":this._moreInfo(i);break;case"toggle-row":this._haptic("selection"),this._open.has(e)?this._open.delete(e):this._open.add(e),this._render();break;case"mode":this._haptic("medium"),this._call("set_preset_mode",{entity_id:o.rooms.map(M=>M.entityId),preset_mode:t});break;case"schedule":this._haptic("light"),o.schedule.entityId&&this._hass.callService("select","select_option",{entity_id:o.schedule.entityId,option:t});break;case"boost":{this._haptic("light");let M=o.rooms.find(n=>n.entityId===e);this._call("set_preset_mode",{entity_id:e,preset_mode:M?.boost?"schedule":"boost"});break}case"off":this._haptic("medium"),this._call("set_hvac_mode",{entity_id:e,hvac_mode:"off"});break;case"temp":this._stepTemperature(e,Number(r));break;default:break}}_stepTemperature(C,H){let V=this._model?.rooms?.find(t=>t.entityId===C);if(!V||V.target===null)return;let e=Math.min(V.maxTemp,Math.max(V.minTemp,Math.round((V.target+H*V.step)*10)/10));e!==V.target&&(this._haptic("light"),this._call("set_temperature",{entity_id:C,temperature:e}))}_call(C,H){return H.entity_id?this._hass.callService("climate",C,H):Promise.resolve()}_moreInfo(C){C&&this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:C},bubbles:!0,composed:!0}))}_haptic(C){this.dispatchEvent(new CustomEvent("haptic",{detail:C,bubbles:!0,composed:!0}))}};function G9(){customElements.get(t1)||(customElements.define(t1,E5),window.customCards=window.customCards||[],window.customCards.push({type:t1,name:"Netatmo Heating Card",description:"Card for a Netatmo heating system: rooms, schedules, frost guard, battery levels and open windows.",preview:!0,documentationURL:"https://github.com/gabor-io/ha-appliance-custom-card"}),console.info(`%c ${t1} %c ${O9} `,"color:#fff;background:#f57c00;font-weight:700;border-radius:3px 0 0 3px","color:#f57c00;background:#fff3e0;font-weight:700;border-radius:0 3px 3px 0"))}var $C=R({cardName:t1,toggles:["show_art","show_schedule","show_openings","show_batteries","compact","animate"],defaults:R5,listDevices:B9,getLanguage:w2,translator:O2,languages:w5});function U9(){customElements.get(Q1)||customElements.define(Q1,$C)}U9();G9();var r1="netatmo-weather-card",Y1="netatmo-weather-card-editor",K9="1.21.0",j9="netatmo",k2=[{level:"excellent",max:800},{level:"good",max:1e3},{level:"fair",max:1400},{level:"poor",max:2e3},{level:"bad",max:1/0}],Q9=2e3,q9=1e3,P5=1400,T2=[{max:800,colour:"var(--air-excellent)"},{max:P5,colour:"var(--air-fair)"},{max:1/0,colour:"var(--air-bad)"}],Y9=30,X9=15,J9={up:"trend_up",down:"trend_down",stable:"trend_stable"},C6=20;var FC={card_name:"Id\u0151j\xE1r\xE1s-\xE1llom\xE1s",trend:{up:"emelkedik",down:"s\xFCllyed",stable:"\xE1lland\xF3"},band:{excellent:"Kiv\xE1l\xF3",good:"J\xF3",fair:"K\xF6zepes",poor:"Gyenge",bad:"Rossz"},state:{outdoor_stale:"A k\xFClt\xE9ri modul leszakadt",outdoor_dead:"A k\xFClt\xE9ri modul nem v\xE1laszol",no_outdoor:"Nincs k\xFClt\xE9ri modul"},alert:{co2_high:"{name} \xB7 kezd elhaszn\xE1l\xF3dni a leveg\u0151 ({value} ppm)",co2_bad:"{name} \xB7 szell\u0151ztess, magas a CO\u2082 ({value} ppm)",stale:"{name} \xB7 a modul leszakadt, az adat nem friss\xFCl",dead:"{name} \xB7 a modul nem v\xE1laszol",battery_low:"{name} \xB7 fogy az elem ({value} %)",battery_critical:"{name} \xB7 az elem kritikus ({value} %) \u2013 cser\xE9ld ki"},ui:{outside:"Kint",rooms:"Szob\xE1k",stale_badge:"nem friss\xFCl",dead_badge:"nem v\xE1laszol",stale_hint:"A modul leszakadt \u2013 ezek a legut\xF3bbi m\xE9rt \xE9rt\xE9kek.",dead_hint:"A modul nem k\xFCld m\xE9r\xE9st.",co2:"CO\u2082",updated:"{age} friss\xFClt",just_now:"\xE9pp most",minute_short:"perce",hour_short:"\xF3r\xE1ja",no_station:"Nem tal\xE1ltam Netatmo id\u0151j\xE1r\xE1s-\xE1llom\xE1st."},editor:{device:"K\xE9sz\xFCl\xE9k",device_auto:"Automatikus",language:"Nyelv",language_auto:"Automatikus",show_art:"K\xE9sz\xFCl\xE9krajz",show_rooms:"Szob\xE1k",show_co2:"CO\u2082 m\xE9r\u0151s\xE1v",show_alerts:"Figyelmeztet\xE9sek",compact:"Kompakt",animate:"Anim\xE1ci\xF3k"}},NC={card_name:"Weather station",trend:{up:"rising",down:"falling",stable:"steady"},band:{excellent:"Excellent",good:"Good",fair:"Fair",poor:"Poor",bad:"Bad"},state:{outdoor_stale:"The outdoor module is offline",outdoor_dead:"The outdoor module is not responding",no_outdoor:"No outdoor module"},alert:{co2_high:"{name} \xB7 the air is getting stale ({value} ppm)",co2_bad:"{name} \xB7 open a window, CO\u2082 is high ({value} ppm)",stale:"{name} \xB7 the module is offline, the reading is not updating",dead:"{name} \xB7 the module is not responding",battery_low:"{name} \xB7 battery getting low ({value} %)",battery_critical:"{name} \xB7 battery critical ({value} %) \u2013 replace it"},ui:{outside:"Outside",rooms:"Rooms",stale_badge:"not updating",dead_badge:"no answer",stale_hint:"The module is offline \u2013 these are its last readings.",dead_hint:"The module is sending no readings.",co2:"CO\u2082",updated:"updated {age}",just_now:"just now",minute_short:"min ago",hour_short:"h ago",no_station:"No Netatmo weather station found."},editor:{device:"Device",device_auto:"Automatic",language:"Language",language_auto:"Automatic",show_art:"Device drawing",show_rooms:"Rooms",show_co2:"CO\u2082 meter",show_alerts:"Alerts",compact:"Compact",animate:"Animations"}},H6={hu:FC,en:NC},B5=Object.keys(H6);function E2(L,C){return k(L,C,B5)}function R2(L){return T(H6,L)}function $5(L,C={}){return Object.entries(C).reduce((H,[V,e])=>H.replace(`{${V}}`,String(e)),L)}var DC={temperature:["temperature"],humidity:["humidity"],co2:["carbon_dioxide"],pressure:["atmospheric_pressure","pressure"],noise:["sound_pressure"],battery:["battery"],signal:["signal_strength"],rain:["precipitation","precipitation_intensity"],wind:["wind_speed"]};function IC(L){return Object.values(L?.entities||{})}function zC(L){return L.translation_key==="temp_trend"?"temperature":L.translation_key==="pressure_trend"?"pressure":/_(temp|temperature)_trend$/.test(L.entity_id)?"temperature":/_pressure_trend$/.test(L.entity_id)?"pressure":null}function WC(L,C){return L?.states?.[C.entity_id]?.attributes?.device_class||C.original_device_class||null}function GC(L){let C=new Map,H=V=>(C.has(V)||C.set(V,{sensors:{},trend:{},reachable:null}),C.get(V));for(let V of IC(L)){if(V.platform!==j9||!V.device_id)continue;let e=WC(L,V);if(V.entity_id.startsWith("binary_sensor.")){e==="connectivity"&&(H(V.device_id).reachable=V.entity_id);continue}if(!V.entity_id.startsWith("sensor."))continue;let t=zC(V);if(t){H(V.device_id).trend[t]=V.entity_id;continue}for(let[r,i]of Object.entries(DC))i.includes(e)&&(H(V.device_id).sensors[r]=V.entity_id)}return C}function UC(L,C){return/public/i.test(L?.model||"")?!0:!!(C.rain||C.wind)}function F5(L,C={}){let H=C.sources||{},V=GC(L),e=[];for(let[M,n]of V){if(!n.sensors.temperature)continue;let l=L?.devices?.[M];UC(l,n.sensors)||e.push({deviceId:M,name:l?.name_by_user||l?.name||M,model:l?.model||"",area:l?.area_id||N(L,n.sensors.temperature),...n})}let t=M=>e.find(n=>n.deviceId===M)||null,r=H.main?t(H.main):null;r||(r=e.find(M=>M.sensors.pressure)||null);let i=H.outdoor?t(H.outdoor):null;i||(i=e.find(M=>M!==r&&/outdoor/i.test(M.model))||null),i||(i=e.find(M=>M!==r&&!M.sensors.co2)||null);for(let M of e)M.label=KC(M.name,r?.name);let o=e.filter(M=>M!==i);return{main:r,outdoor:i,indoor:o,all:e}}function KC(L,C){if(!C||L===C)return L;let H=`${C} `;return L.startsWith(H)?L.slice(H.length):L}function N5(L){return F5(L).all.map(C=>({id:C.deviceId,name:C.name}))}function V6(L,C){let H=C.area?L?.areas?.[C.area]:null;return H?.name?H.name:C.label||C.name}function O1(L,C){if(!C)return null;let H=L?.states?.[C];if(x(H))return null;let V=Number(H.state);return Number.isFinite(V)?V:null}function D5(L,C){if(!C)return null;let H=L?.states?.[C];return x(H)?null:H.state}function jC(L,C,H){return L?.states?.[C]?.attributes?.unit_of_measurement||H}function QC(L,C){let H=L?.states?.[C]?.last_updated||L?.states?.[C]?.last_changed;if(!H)return null;let V=(Date.now()-new Date(H).getTime())/1e3;return Number.isFinite(V)?Math.max(0,V):null}function qC(L){return L==null?null:{level:(k2.find(H=>L<H.max)||k2[k2.length-1]).level,ratio:Math.min(1,L/Q9)}}function e6(L){return L==null?null:(T2.find(C=>L<C.max)||T2[T2.length-1]).colour}function I5(L,C,H){if(!C)return null;let{sensors:V,trend:e,reachable:t}=C,r=O1(L,V.temperature),i=r===null,o=D5(L,t),M=!i&&o==="off",n=O1(L,V.co2);return{kind:H,deviceId:C.deviceId,name:V6(L,C),entityId:V.temperature||V.battery||null,sensors:V,live:!i&&!M,stale:M,dead:i,temperature:r,temperatureTrend:D5(L,e.temperature),humidity:O1(L,V.humidity),co2:n,band:qC(n),glow:i||M?null:e6(n),noise:O1(L,V.noise),pressure:O1(L,V.pressure),pressureUnit:jC(L,V.pressure,"hPa"),pressureTrend:D5(L,e.pressure),battery:O1(L,V.battery),age:QC(L,V.temperature)}}function L6(L,C){let H=F5(L,C);if(!H.main&&!H.outdoor&&!H.indoor.length)return{ok:!1,reason:"no_station"};let V=I5(L,H.main,"main"),e=I5(L,H.outdoor,"outdoor"),t=H.indoor.map(l=>I5(L,l,l===H.main?"main":"module")).filter(Boolean),r=V?.pressure??null,o=t.filter(l=>l.live).reduce((l,d)=>d.co2!==null&&d.co2>l?d.co2:l,0),M=[];for(let l of t){if(l.dead){M.push({kind:"quiet",icon:"offline",key:"alert.dead",values:{name:l.name}});continue}if(l.stale){M.push({kind:"",icon:"offline",key:"alert.stale",values:{name:l.name}});continue}l.co2!==null&&l.co2>=P5?M.push({kind:"error",icon:"alert",key:"alert.co2_bad",values:{name:l.name,value:l.co2}}):l.co2!==null&&l.co2>=q9&&M.push({kind:"",icon:"alert",key:"alert.co2_high",values:{name:l.name,value:l.co2}})}e?.dead?M.push({kind:"quiet",icon:"offline",key:"alert.dead",values:{name:e.name}}):e?.stale&&M.push({kind:"",icon:"offline",key:"alert.stale",values:{name:e.name}});for(let l of[...t,e].filter(Boolean))l.battery!==null&&(l.battery<=X9?M.push({kind:"error",icon:"battery",key:"alert.battery_critical",values:{name:l.name,value:l.battery}}):l.battery<=Y9&&M.push({kind:"quiet",icon:"battery",key:"alert.battery_low",values:{name:l.name,value:l.battery}}));let n=[V,e,...t].filter(l=>l?.live&&l.age!==null).map(l=>l.age);return{ok:!0,main:V,outdoor:e,indoor:t,pressure:r,pressureUnit:V?.pressureUnit||"hPa",pressureTrend:V?.pressureTrend??null,worstCo2:o||null,heroGlow:e6(o||null),alerts:M,age:n.length?Math.min(...n):null,quietFor:n.length&&Math.min(...n)>C6*60}}function t6(L){return`
  <svg class="defs" width="0" height="0" aria-hidden="true">
    <defs>
      <linearGradient id="${L}-alu" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#b4b9bc"/>
        <stop offset=".18" stop-color="#dfe3e5"/>
        <stop offset=".42" stop-color="#f4f6f7"/>
        <stop offset=".72" stop-color="#dde1e4"/>
        <stop offset="1" stop-color="#aeb3b7"/>
      </linearGradient>
      <filter id="${L}-soft" x="-60%" y="-20%" width="220%" height="170%">
        <feGaussianBlur stdDeviation="3"/>
      </filter>
    </defs>
  </svg>`}function z5(L,{tall:C=!1,notch:H=!1}={}){let V=C?196:138,e=16,t=C?162:104,r=52,i=(100-r)/2,o=e+t*.22,M=t*.56,n=16,l=e+t-n;return`
  <svg class="dev" viewBox="0 0 100 ${V}" role="img" aria-hidden="true">
    <ellipse class="shadow" cx="50" cy="${e+t+6}" rx="30" ry="5" filter="url(#${L}-soft)"/>
    <rect class="shell" x="${i}" y="${e}" width="${r}" height="${t}" rx="3"
      fill="url(#${L}-alu)"/>
    <rect class="base" x="${i}" y="${l}" width="${r}" height="${n}" rx="3"/>
    <ellipse class="base" cx="50" cy="${e+t}" rx="${r/2}" ry="4.5"/>
    ${H?`<rect class="groove" x="48" y="${e+t-3}" width="4" height="6" rx="2"/>`:""}
    <ellipse class="cap" cx="50" cy="${e}" rx="${r/2}" ry="6"/>
    <ellipse class="cap-inner" cx="50" cy="${e+.6}" rx="${r/2-7}" ry="3.6"/>
    <rect class="groove" x="48.3" y="${o}" width="3.4" height="${M}" rx="1.7"/>
    <rect class="halo" x="47.2" y="${o}" width="5.6" height="${M}" rx="2.8"/>
    <rect class="lamp" x="48.3" y="${o}" width="3.4" height="${M}" rx="1.7"/>
  </svg>`}function W5(L,{glow:C=null,dead:H=!1,stale:V=!1}={}){if(!L)return;L.classList.toggle("lit",!!C),L.classList.toggle("dead",!!H),L.classList.toggle("stale",!!V);let e=L.style.getPropertyValue("--glow");C&&e!==C&&L.style.setProperty("--glow",C),!C&&e&&L.style.removeProperty("--glow")}var r6=`
${E}

:host {
  /* the same five bands the ventilation card uses */
  --air-excellent: #2e9e5b;
  --air-good: #7cb342;
  --air-fair: #e8b02a;
  --air-poor: #ef7b23;
  --air-bad: #d93a2b;
  --nw-cool: #0288d1;
}

.wrap { padding: 14px 16px 16px; gap: 12px; position: relative; }
.wrap::before {
  content: ''; position: absolute; inset: 0; pointer-events: none;
  background: radial-gradient(120% 80% at 0% 0%,
    color-mix(in srgb, var(--ap-accent) 11%, transparent), transparent 62%);
}
.wrap > * { position: relative; }

/* ---------- header ---------- */
.top { display: flex; align-items: baseline; gap: 10px; }
.top .name { font-size: 1rem; font-weight: 650; letter-spacing: -.01em; cursor: pointer; }
.top .spacer { flex: 1; }
.top .age { font-size: .72rem; color: var(--ap-muted); }
.top .age.late { color: var(--air-poor); font-weight: 600; }

/* ---------- hero ---------- */
.hero { display: grid; grid-template-columns: 92px minmax(0,1fr) auto; gap: 14px; align-items: center; }
.compact .hero { grid-template-columns: 68px minmax(0,1fr) auto; }
@container (max-width: 340px) { .hero { grid-template-columns: minmax(0,1fr) auto; } .hero .art { display: none; } }
.hero .art { cursor: pointer; }
.cap { font-size: .66rem; font-weight: 700; letter-spacing: .09em; text-transform: uppercase; color: var(--ap-muted); }
.state { font-size: .96rem; font-weight: 600; line-height: 1.25; margin-top: 2px; letter-spacing: -.01em; }
.big {
  white-space: nowrap; font-size: 2.5rem; font-weight: 600; letter-spacing: -.04em;
  line-height: .9; font-variant-numeric: tabular-nums; color: var(--ap-text);
}
.big small { font-size: .95rem; font-weight: 600; color: var(--ap-muted); letter-spacing: 0; }
.big.muted { color: var(--ap-muted); }

/* ---------- facts: humidity, pressure, noise ---------- */
.facts { display: flex; flex-wrap: wrap; gap: 4px 13px; margin-top: 6px; }
/* the shared .fact is a tile; here they sit inline on one line, so the
   padding and the pill background are taken back off */
.fact {
  display: inline-flex; align-items: center; gap: 5px; padding: 0; border-radius: 0;
  background: none; font-size: .78rem; color: var(--ap-muted); font-variant-numeric: tabular-nums;
}
.fact .icon { width: 14px; height: 14px; color: var(--ap-muted); }
.fact b { color: var(--ap-text); font-weight: 600; }

/* ---------- the trend arrow ---------- */
.trend {
  display: inline-flex; align-items: center; gap: 3px;
  font-size: .74rem; color: var(--ap-muted); white-space: nowrap;
}
.trend .icon { width: 14px; height: 14px; }
.trend.up { color: var(--air-poor); }
.trend.down { color: var(--nw-cool); }

/* ---------- badges ---------- */
.tag {
  display: inline-flex; align-items: center; gap: 4px; margin-left: 7px; padding: 1px 7px;
  border-radius: 999px; font-size: .62rem; font-weight: 700; vertical-align: 1px;
  text-transform: uppercase; letter-spacing: .04em;
  background: color-mix(in srgb, var(--air-poor) 18%, transparent); color: var(--air-poor);
}
.tag.quiet {
  background: color-mix(in srgb, var(--ap-text) 8%, transparent);
  color: var(--ap-muted); text-transform: none; letter-spacing: 0; font-weight: 600;
}

/* a module that has gone quiet is a note, not a warning: it needs a new
   battery some time this week, not a window opened now */
.alert.quiet { background: color-mix(in srgb, var(--ap-text) 7%, transparent); }
.alert.quiet .icon { color: var(--ap-muted); }

/* ---------- rooms ---------- */
.divider { height: 1px; background: var(--ap-line); }
.sec-cap { font-size: .66rem; font-weight: 700; letter-spacing: .09em; text-transform: uppercase; color: var(--ap-muted); }
.rooms { display: grid; gap: 4px; }
.room {
  display: grid; grid-template-columns: 38px minmax(0,1fr); gap: 10px; align-items: center;
  width: 100%; padding: 6px 8px; border: 0; background: transparent; border-radius: 12px;
  font: inherit; color: var(--ap-text); text-align: left; cursor: pointer;
}
.room:hover { background: color-mix(in srgb, var(--ap-text) 4%, transparent); }
.rname { display: block; font-size: .88rem; font-weight: 600; letter-spacing: -.01em; }
.rline { display: flex; align-items: baseline; flex-wrap: wrap; gap: 4px 12px; margin-top: 1px; }
.rtemp { font-size: 1.02rem; font-weight: 650; letter-spacing: -.02em; font-variant-numeric: tabular-nums; }
.room.dead .rname, .room.dead .rtemp { color: var(--ap-muted); }
.room.dead, .room.stale { opacity: .78; }
.quiet { font-size: .73rem; color: var(--ap-muted); margin-top: 2px; }

/* ---------- the CO2 meter ---------- */
.co2 { margin-top: 5px; }
.co2 .track {
  height: 5px; border-radius: 999px; overflow: hidden;
  background: color-mix(in srgb, var(--ap-text) 10%, transparent);
}
.co2 .track i { display: block; height: 100%; border-radius: 999px; transition: width .6s ease, background-color .6s ease; }
.co2 .read { display: flex; align-items: baseline; gap: 7px; margin-top: 3px; font-size: .74rem; color: var(--ap-muted); }
.co2 .read b { color: var(--ap-text); font-weight: 650; font-variant-numeric: tabular-nums; }
.co2 .read .band { font-weight: 700; }

.fill-excellent { background: var(--air-excellent); }
.fill-good { background: var(--air-good); }
.fill-fair { background: var(--air-fair); }
.fill-poor { background: var(--air-poor); }
.fill-bad { background: var(--air-bad); }
.level-excellent { color: var(--air-excellent); }
.level-good { color: var(--air-good); }
.level-fair { color: var(--air-fair); }
.level-poor { color: var(--air-poor); }
.level-bad { color: var(--air-bad); }

/* ---------- the drawing ---------- */
.defs { position: absolute; width: 0; height: 0; }
.dev { display: block; width: 100%; height: auto; }
.shell { stroke: rgba(0,0,0,.08); stroke-width: .8; }
.base, .cap { fill: #fcfdfd; stroke: rgba(0,0,0,.07); stroke-width: .7; }
.cap-inner { fill: #eef1f2; }
.groove { fill: #aeb4b8; opacity: .55; }
.shadow { fill: #000; opacity: .16; }

.halo, .lamp { fill: var(--glow, transparent); opacity: 0; transition: opacity .5s ease; }
.dev.lit .lamp { opacity: .95; animation: nw-breathe 5.5s ease-in-out infinite; }
.dev.lit .halo { opacity: .3; filter: blur(2.6px); animation: nw-breathe 5.5s ease-in-out infinite; }
@keyframes nw-breathe {
  0%, 100% { opacity: .95; }
  50% { opacity: .62; }
}
.dev.lit .halo { animation-name: nw-breathe-halo; }
@keyframes nw-breathe-halo {
  0%, 100% { opacity: .3; }
  50% { opacity: .16; }
}
.no-animation .dev.lit .lamp, .no-animation .dev.lit .halo { animation: none; }
.dev.dead { opacity: .4; }
.dev.stale { opacity: .62; filter: saturate(.25); }
`;var U5={language:"auto",compact:!1,animate:!0,show_art:!0,show_rooms:!0,show_co2:!0,show_alerts:!0},i6=0,G5=class extends HTMLElement{static getConfigElement(){return document.createElement(Y1)}static getStubConfig(){return{type:`custom:${r1}`}}constructor(){super(),this.attachShadow({mode:"open"}),this._sections={},this._signatures={},this._rows=new Map,this._built=!1,i6+=1,this._uid=`netatmo${i6}`}setConfig(C){this._config={...U5,...C||{}},this._signatures={},this._rows.clear(),this._hass&&this._render()}set hass(C){this._hass=C,this._render()}get hass(){return this._hass}getCardSize(){let C=this._model?.indoor?.length||1;return(this._config?.compact?3:4)+C}getGridOptions(){return{columns:12,min_columns:6,rows:"auto"}}_build(){let C=document.createElement("style");C.textContent=r6;let H=document.createElement("ha-card"),V=document.createElement("div");V.className="wrap",V.addEventListener("click",e=>this._onClick(e)),V.insertAdjacentHTML("beforeend",t6(this._uid));for(let e of["top","hero","alerts","rooms"]){let t=document.createElement("div");t.dataset.section=e,this._sections[e]=t,V.appendChild(t)}H.appendChild(V),this.shadowRoot.replaceChildren(C,H),this._wrap=V,this._built=!0}_render(){if(!this._hass||!this._config)return;this._built||this._build();let C=R2(E2(this._config,this._hass)),H=L6(this._hass,this._config);if(this._model=H,!H.ok){this._renderEmpty(H,C);return}this._emptyShown=!1,this._applyWrapClasses(H),this._section("top",this._topHtml(H,C)),this._heroSection(H,C),this._section("alerts",this._config.show_alerts?this._alertsHtml(H,C):""),this._roomsSection(H,C)}_renderEmpty(C,H){if(this._emptyShown!==C.reason){this._emptyShown=C.reason,this._signatures={},this._rows.clear();for(let[V,e]of Object.entries(this._sections))e.innerHTML="",e.hidden=V!=="top";this._sections.top.innerHTML=`
      <div class="empty">
        ${s("gauge")}
        <div>${a(H(`ui.${C.reason}`))}</div>
      </div>`}}_section(C,H){this._signatures[C]!==H&&(this._signatures[C]=H,this._sections[C].innerHTML=H,this._sections[C].hidden=!H)}_applyWrapClasses(C){let H=["wrap"];this._config.compact&&H.push("compact"),this._config.animate||H.push("no-animation"),this._hass.themes?.darkMode&&H.push("dark");let V=H.join(" ");this._wrap.className!==V&&(this._wrap.className=V);let e=C.heroGlow||"var(--primary-color, #03a9f4)";this._wrap.style.getPropertyValue("--ap-accent")!==e&&this._wrap.style.setProperty("--ap-accent",e)}_topHtml(C,H){let V=C.age===null?"":`<span class="age ${C.quietFor?"late":""}">${a($5(H("ui.updated"),{age:this._ago(C.age,H)}))}</span>`;return`
      <div class="top">
        <span class="name" data-action="more-info" data-entity="${a(C.main?.entityId||"")}">${a(this._config.name||H("card_name"))}</span>
        <span class="spacer"></span>
        ${V}
      </div>`}_heroSection(C,H){this._sections.hero.querySelector(".hero")||(this._sections.hero.innerHTML=`
        <div class="hero">
          <div class="art" data-action="more-info">${z5(this._uid,{tall:!0})}</div>
          <div class="status"></div>
          <div class="reading"></div>
        </div>`,this._heroNode=this._sections.hero.querySelector(".hero"),this._statusNode=this._sections.hero.querySelector(".status"),this._readingNode=this._sections.hero.querySelector(".reading"));let V=this._sections.hero.querySelector(".art");V.hidden=!this._config.show_art,this._config.show_art&&(W5(V.querySelector(".dev"),{glow:C.heroGlow,dead:!!C.main?.dead,stale:!!C.main?.stale}),V.dataset.entity=C.main?.entityId||"");let e=C.outdoor,t=e?e.dead?H("state.outdoor_dead"):e.stale?H("state.outdoor_stale"):this._trendHtml(e.temperatureTrend,H):H("state.no_outdoor"),r=[];e?.live&&e.humidity!==null&&r.push(this._fact("water_percent",`${Math.round(e.humidity)} %`)),C.pressure!==null&&r.push(this._fact("gauge",`${B(C.pressure,this._hass,1)} ${a(C.pressureUnit)}`,this._trendHtml(C.pressureTrend,H)));let i=e?.stale||e?.dead?`<span class="tag">${a(H(e.dead?"ui.dead_badge":"ui.stale_badge"))}</span>`:"",o=`
      <div class="cap">${a(H("ui.outside"))}${i}</div>
      <div class="state">${t}</div>
      ${r.length?`<div class="facts">${r.join("")}</div>`:""}`;this._signatures.status!==o&&(this._signatures.status=o,this._statusNode.innerHTML=o);let M=!e||e.dead?"\u2013":`${B(e.temperature,this._hass,1)}<small> \xB0C</small>`,n=`<div class="big ${e?.live?"":"muted"}">${M}</div>`;this._signatures.reading!==n&&(this._signatures.reading=n,this._readingNode.innerHTML=n)}_fact(C,H,V=""){return`<span class="fact">${s(C)}<b>${H}</b>${V}</span>`}_trendHtml(C,H){let V=J9[C];return V?`<span class="trend ${a(C)}">${s(V)}${a(H(`trend.${C}`))}</span>`:""}_alertsHtml(C,H){return C.alerts.length?`<div class="alerts">${C.alerts.map(e=>`<div class="alert${e.kind?` ${e.kind}`:""}">${s(e.icon)}<span>${a($5(H(e.key),e.values))}</span></div>`).join("")}</div>`:""}_roomsSection(C,H){let V=this._sections.rooms;if(!this._config.show_rooms||!C.indoor.length){V.innerHTML="",V.hidden=!0,this._rows.clear();return}V.querySelector(".rooms")||(V.innerHTML=`
        <div class="divider"></div>
        <div class="sec-cap">${a(H("ui.rooms"))}</div>
        <div class="rooms"></div>`,this._roomsNode=V.querySelector(".rooms"),this._rows.clear()),V.hidden=!1;let e=new Set;for(let t of C.indoor){e.add(t.deviceId);let r=this._rows.get(t.deviceId);if(!r){let n=document.createElement("button");n.type="button",n.className="room",n.dataset.action="more-info",n.innerHTML=`
          <span class="art">${z5(this._uid)}</span>
          <span>
            <span class="rname"></span>
            <span class="body"></span>
          </span>`,this._roomsNode.appendChild(n),r={el:n,dev:n.querySelector(".dev"),name:n.querySelector(".rname"),body:n.querySelector(".body"),sig:{}},this._rows.set(t.deviceId,r)}r.el.dataset.entity=t.entityId||"",r.el.classList.toggle("dead",t.dead),r.el.classList.toggle("stale",t.stale),r.el.querySelector(".art").hidden=!this._config.show_art,W5(r.dev,{glow:t.glow,dead:t.dead,stale:t.stale});let i=t.dead?`<span class="tag quiet">${a(H("ui.dead_badge"))}</span>`:t.stale?`<span class="tag">${a(H("ui.stale_badge"))}</span>`:"",o=`${a(t.name)}${i}`;r.sig.name!==o&&(r.sig.name=o,r.name.innerHTML=o);let M=this._roomBodyHtml(t,H);r.sig.body!==M&&(r.sig.body=M,r.body.innerHTML=M)}for(let[t,r]of this._rows)e.has(t)||(r.el.remove(),this._rows.delete(t))}_roomBodyHtml(C,H){if(C.dead)return`<span class="rline"><span class="rtemp">\u2013</span></span>
        <div class="quiet">${a(H("ui.dead_hint"))}</div>`;let V=[];C.humidity!==null&&V.push(this._fact("water_percent",`${Math.round(C.humidity)} %`)),C.noise!==null&&V.push(this._fact("noise",`${Math.round(C.noise)} dB`));let e=`
      <span class="rline">
        <span class="rtemp">${B(C.temperature,this._hass,1)} \xB0C</span>
        ${C.stale?"":this._trendHtml(C.temperatureTrend,H)}
        ${V.join("")}
      </span>`;return C.stale?`${e}<div class="quiet">${a(H("ui.stale_hint"))}</div>`:!this._config.show_co2||!C.band?e:`${e}
      <div class="co2">
        <div class="track"><i class="fill-${C.band.level}"
          style="width:${Math.round(C.band.ratio*100)}%"></i></div>
        <div class="read">
          <span>${a(H("ui.co2"))}</span>
          <b>${C.co2} ppm</b>
          <span class="band level-${C.band.level}">${a(H(`band.${C.band.level}`))}</span>
        </div>
      </div>`}_ago(C,H){return C<90?H("ui.just_now"):W(C,H("ui.minute_short"),H("ui.hour_short"))}_onClick(C){let H=C.target.closest("[data-action]");H&&H.dataset.action==="more-info"&&this._moreInfo(H.dataset.entity)}_moreInfo(C){C&&this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:C},bubbles:!0,composed:!0}))}};function a6(){customElements.get(r1)||(customElements.define(r1,G5),window.customCards=window.customCards||[],window.customCards.push({type:r1,name:"Netatmo Weather Card",description:"Card for a Netatmo weather station: outdoor temperature, pressure, and CO\u2082 per room, with modules that have gone quiet called out rather than shown as current.",preview:!0,documentationURL:"https://github.com/gabor-io/ha-appliance-custom-card"}),console.info(`%c ${r1} %c ${K9} `,"color:#fff;background:#0288d1;font-weight:700;border-radius:3px 0 0 3px","color:#0288d1;background:#e1f5fe;font-weight:700;border-radius:0 3px 3px 0"))}var YC=R({cardName:r1,toggles:["show_art","show_rooms","show_co2","show_alerts","compact","animate"],defaults:U5,listDevices:N5,getLanguage:E2,translator:R2,languages:B5});function o6(){customElements.get(Y1)||customElements.define(Y1,YC)}o6();a6();var i1="aeno-heater-card",X1="aeno-heater-card-editor",M6="1.21.0",K5="tuya_local",n6="heater",a1={lock:"child_lock",limit:"maximum_temperature",remaining:"time_remaining",timer:"timer",unit:"temperature_unit"},k1=[{key:"off",icon:"power",colour:"var(--ae-off)"},{key:"heat",icon:"heat",colour:"var(--ae-heat)"}],s6=k1.map(L=>L.key),l6=[{key:"comfort",icon:"target"},{key:"manual",icon:"manual"}],d6="manual",j5=.5,p6=50,A6=120,m6=.4,Q5={min:0,max:40};var XC={card_name:"Infrapanel",mode:{off:"Ki",heat:"F\u0171t\xE9s"},mode_long:{off:"Kikapcsolva",heat:"F\u0171t\xE9s"},preset:{comfort:"Smart",manual:"Folyamatos"},state:{unavailable:"A panel nem v\xE1laszol",off:"Kikapcsolva",heating_to:"F\u0171t {temp} \xB0C-ra",holding:"{temp} \xB0C-ot tart",above:"Melegebb a be\xE1ll\xEDtottn\xE1l",continuous:"Folyamatosan f\u0171t",warming_up:"Melegszik"},sub:{unavailable:"Nincs v\xE1lasz a panelr\u0151l \u2013 \xE1ram vagy h\xE1l\xF3zat",off:"Legut\xF3bbi c\xE9l: {temp} \xB0C",off_no_target:"A panel \xE1ll",reached:"El\xE9rte a h\u0151fokot, az elem nem f\u0171t",below_by:"{diff} \xB0C-kal hidegebb a szoba",above_by:"{diff} \xB0C-kal melegebb a szoba",continuous:"Folyamatos m\xF3dban az elem a be\xE1ll\xEDtott h\u0151fokt\xF3l f\xFCggetlen\xFCl megy",panel_warming:"A lap {temp} \xB0C-os, m\xE9g melegszik",panel_hot:"A lap {temp} \xB0C-os"},alert:{window_open:"{name} nyitva {duration} \u2013 a panel nyitott ablakba f\u0171t",window_tilted:"{name} buk\xF3ra van {duration} \u2013 a panel nyitott ablakba f\u0171t",continuous:"Folyamatos m\xF3d: a panel a h\u0151fok el\xE9r\xE9se ut\xE1n sem \xE1ll le",locked:"Gyerekz\xE1r \u2013 a panel gombjai nem m\u0171k\xF6dnek",timer:"Id\u0151z\xEDt\u0151: {remaining} m\xFAlva kikapcsol"},ui:{device:"AENO AGH0001S",room:"Szoba",panel:"Lap",power:"Teljes\xEDtm\xE9ny",energy:"Fogyaszt\xE1s",device_reads:"a panel szerint",limit:"Lap max.",lock:"Gyerekz\xE1r",timer:"Id\u0151z\xEDt\u0151",timer_off:"nincs",timer_cancel:"Id\u0151z\xEDt\u0151 t\xF6rl\xE9se",window:"Ablak",window_open:"nyitva",window_tilted:"buk\xF3ra",windows_open:"{count} ablak nyitva",no_window_sensor:"nincs nyit\xE1s\xE9rz\xE9kel\u0151",minute_short:"perc",hour_short:"\xF3",no_entity:"Nem tal\xE1ltam infrapanelt ebben a Home Assistantban.",many_entities:"T\xF6bb panel is van \u2013 v\xE1laszd ki, melyikr\u0151l sz\xF3ljon a k\xE1rtya.",missing_entity:"A megadott entit\xE1s nem l\xE9tezik."},editor:{device:"Eszk\xF6z",device_auto:"Automatikus",name:"N\xE9v (\xFCresen a ter\xFClet neve)",language:"Nyelv",language_auto:"Automatikus",sections:"Mit mutasson",show_art:"Panelrajz",show_readings:"M\xE9rt \xE9rt\xE9kek",show_modes:"Be/ki s\xE1v",show_presets:"F\u0171t\xE9si m\xF3d",show_setpoint:"H\u0151fok a panelen",show_extras:"Gyerekz\xE1r, lap max.",show_openings:"Nyit\xE1s\xE9rz\xE9kel\u0151k",compact:"Kompakt",animate:"Anim\xE1ci\xF3k"}},JC={card_name:"Panel heater",mode:{off:"Off",heat:"Heat"},mode_long:{off:"Off",heat:"Heating"},preset:{comfort:"Smart",manual:"Constant"},state:{unavailable:"The panel is not responding",off:"Off",heating_to:"Heating to {temp} \xB0C",holding:"Holding {temp} \xB0C",above:"Warmer than the setpoint",continuous:"Heating continuously",warming_up:"Warming up"},sub:{unavailable:"No answer from the panel - power or network",off:"Last target: {temp} \xB0C",off_no_target:"The panel is idle",reached:"At temperature, the element is off",below_by:"The room is {diff} \xB0C cooler",above_by:"The room is {diff} \xB0C warmer",continuous:"In Constant mode the element runs whatever the setpoint says",panel_warming:"The surface is at {temp} \xB0C and still warming",panel_hot:"The surface is at {temp} \xB0C"},alert:{window_open:"{name} has been open {duration} - the panel is heating it",window_tilted:"{name} has been on the latch {duration} - the panel is heating it",continuous:"Constant mode: the panel will not stop at the setpoint",locked:"Child lock - the panel buttons do nothing",timer:"Timer: switches off in {remaining}"},ui:{device:"AENO AGH0001S",room:"Room",panel:"Surface",power:"Power",energy:"Energy",device_reads:"panel reads",limit:"Element max.",lock:"Child lock",timer:"Timer",timer_off:"none",timer_cancel:"Cancel timer",window:"Window",window_open:"open",window_tilted:"on the latch",windows_open:"{count} windows open",no_window_sensor:"no opening sensor",minute_short:"min",hour_short:"h",no_entity:"No panel heater found in this Home Assistant.",many_entities:"There is more than one panel - pick the one this card is about.",missing_entity:"The configured entity does not exist."},editor:{device:"Device",device_auto:"Automatic",name:"Name (the area name when empty)",language:"Language",language_auto:"Automatic",sections:"Sections",show_art:"Panel drawing",show_readings:"Readings",show_modes:"On/off bar",show_presets:"Heating mode",show_setpoint:"Setpoint on the panel",show_extras:"Child lock, element max.",show_openings:"Opening sensors",compact:"Compact",animate:"Animations"}},c6={hu:XC,en:JC},q5=Object.keys(c6);function P2(L,C){return k(L,C,q5)}function B2(L){return T(c6,L)}function T1(L,C={}){return Object.entries(C).reduce((H,[V,e])=>H.replace(`{${V}}`,String(e)),L)}function $2(L){return Object.values(L?.entities||{})}function u6(L,C){if(C.platform!==K5||!C.entity_id.startsWith("climate."))return!1;if(C.translation_key===n6)return!0;let H=L?.states?.[C.entity_id]?.attributes?.hvac_modes;return Array.isArray(H)&&H.length>0&&H.every(V=>V==="off"||V==="heat")}function v6(L){return $2(L).filter(C=>u6(L,C)).map(C=>C.entity_id)}function F2(L){let C=new Map;for(let H of $2(L)){if(!H.device_id||!u6(L,H))continue;let V=L.devices?.[H.device_id];if(!V)continue;let e=V.name_by_user||V.name||H.device_id,t=Y5(L,V.area_id);C.set(H.device_id,t?`${t} \u2013 ${e}`:e)}return[...C.entries()].map(([H,V])=>({id:H,name:V}))}function Y5(L,C){return C&&L?.areas?.[C]?.name||null}function x6(L,C){let H=C?.device?$2(L).find(e=>e.device_id===C.device&&e.entity_id.startsWith("climate."))?.entity_id:null;if(C?.entity&&(!H||L?.entities?.[C.entity]?.device_id===C.device))return C.entity;if(H)return H;let V=v6(L);return V.length===1?V[0]:null}function h6(L){return v6(L).length>1}function CH(L,C){let H=L?.entities?.[C]?.device_id;if(!H)return{};let V=$2(L).filter(n=>n.device_id===H&&n.platform===K5),e={},t=n=>V.find(l=>l.translation_key===n)?.entity_id,r=V.filter(n=>n.entity_id.startsWith("sensor.")),i=n=>L.states?.[n.entity_id]?.attributes?.device_class||n.original_device_class||null,o=n=>r.find(l=>i(l)===n)?.entity_id,M=(n,l=[])=>{let d=V.filter(p=>p.entity_id.startsWith(`${n}.`)&&!l.includes(p.translation_key));return d.length===1?d[0].entity_id:void 0};return e.unit=t(a1.unit),e.lock=t(a1.lock),e.limit=t(a1.limit),e.timer=t(a1.timer),e.remaining=t(a1.remaining),e.power=o("power"),e.energy=o("energy"),e.panel=o("temperature"),e.mount=M("switch"),e.brightness=M("select",[a1.unit,a1.timer]),e}function f6(L,C,H={}){let V=CH(L,C);return{climate:C,room:H.temperature||null,humidity:H.humidity||null,panel:V.panel,power:H.power||V.power,energy:H.energy||V.energy,lock:V.lock,limit:V.limit,timer:V.timer,remaining:V.remaining,mount:V.mount,brightness:V.brightness,unit:V.unit}}function Z6(L,C,H={}){let V=H.openings||{},e=V.entities||[];if(V.auto===!1&&!e.length)return[];let t=V.area||N(L,C);return y1(L,{areas:V.auto===!1?[]:[t].filter(Boolean),classes:V.classes||m1,include:e,exclude:V.ignore||[]})}function E1(L,C){if(!C)return null;let H=L?.states?.[C];if(x(H))return null;let V=Number(H.state);return Number.isFinite(V)?V:null}function HH(L,C){if(!C)return null;let H=L?.states?.[C];return x(H)?null:H.state}function g6(L,C,H=""){return L?.states?.[C]?.attributes?.unit_of_measurement||H}function VH(L,C){return L?.states?.[C]?.attributes?.friendly_name||""}function eH(L,C,H){if(C?.name)return C.name;let V=Y5(L,N(L,H));if(V)return V;let e=L?.entities?.[H]?.device_id,t=e?L.devices?.[e]:null;return t?.name_by_user||t?.name||VH(L,H)||H}function LH(L){return L===null?null:Math.max(0,Math.min(1,L/A6))}function tH(L,C,H={}){let V=L?.states?.[C];if(!V)return null;let e=f6(L,C,H?.sources||{}),t=V.attributes||{},r=!x(V),i=V.state,o=r&&i!=="off",M=t.current_temperature??null,n=E1(L,e.room),l=n??M,d=t.temperature??null,p=t.preset_modes||[],v=l6.filter(w=>p.includes(w.key)).map(w=>({...w,on:t.preset_mode===w.key})),f=o&&t.preset_mode===d6,m=E1(L,e.power),Z=E1(L,e.panel),c=o?t.hvac_action||null:r?"off":null,S=c!==null||m!==null,_;o?c?_=c==="heating":m!==null?_=m>=p6:_=l===null||d===null?!0:l<d-j5:_=!1;let b=L?.states?.[e.limit],h=b&&!x(b)?{entityId:e.limit,value:Number(b.state),min:b.attributes?.min??60,max:b.attributes?.max??120,step:b.attributes?.step??5,unit:b.attributes?.unit_of_measurement||"\xB0C"}:null,O=L?.states?.[e.lock],D=O&&!x(O)?O.state==="locked":null,G=HH(L,e.timer),v1={entityId:e.timer,set:!!G&&G!=="cancel"&&G!=="off",label:G,remaining:E1(L,e.remaining)},z=H.show_openings===!1?L1([]):L1(Z6(L,C,H),H.open_delay??c1,{pairs:H.openings?.pairs,windows:H.openings?.windows});return{entityId:C,entities:e,name:eH(L,H,C),available:r,on:o,mode:i,modes:(t.hvac_modes||[]).filter(w=>s6.includes(w)),action:c,heating:_,heatingKnown:S,continuous:f,target:d,targetStep:t.target_temp_step||1,minTemp:t.min_temp??Q5.min,maxTemp:t.max_temp??Q5.max,unit:L?.config?.unit_system?.temperature||"\xB0C",inside:M,room:n,measured:l,external:n!==null,humidity:E1(L,e.humidity),panelTemp:Z,glow:LH(Z),power:m,powerUnit:g6(L,e.power,"W"),energy:E1(L,e.energy),energyUnit:g6(L,e.energy,"kWh"),presets:v,presetMode:t.preset_mode||null,locked:D,limit:h,timer:v1,openings:z,draughty:o&&_&&z.warn}}function S6(L){if(L.measured===null||L.target===null)return null;let C=L.measured-L.target;return Math.abs(C)<j5?"at":C>0?"above":"below"}function _6(L){if(!L.available)return{key:"state.unavailable"};if(!L.on)return{key:"state.off"};if(L.continuous)return{key:"state.continuous"};if(L.target===null)return{key:L.heating?"state.warming_up":"state.off"};let C=S6(L);return L.heating&&C!=="above"?{key:"state.heating_to",temp:L.target}:C==="above"?{key:"state.above"}:{key:"state.holding",temp:L.target}}function y6(L){if(!L.available)return{key:"sub.unavailable"};if(!L.on)return L.target===null?{key:"sub.off_no_target"}:{key:"sub.off",temp:L.target};if(L.panelTemp!==null&&L.heating&&L.glow!==null&&L.glow<m6)return{key:"sub.panel_warming",temp:Math.round(L.panelTemp)};if(!L.heating&&L.heatingKnown)return{key:"sub.reached"};let C=S6(L);if(C===null||C==="at")return L.panelTemp!==null?{key:"sub.panel_hot",temp:Math.round(L.panelTemp)}:{key:""};let H=Math.round(Math.abs(L.measured-L.target)*10)/10;return{key:C==="above"?"sub.above_by":"sub.below_by",diff:H}}function b6(L,C){let H=x6(L,C);if(!H)return{ok:!1,reason:h6(L)?"many_entities":"no_entity"};if(!L?.states?.[H])return{ok:!1,reason:"missing_entity"};let V=tH(L,H,C);return V?{ok:!0,...V}:{ok:!1,reason:"missing_entity"}}var Q=[[0,[154,163,168]],[.2,[168,176,181]],[.42,[240,169,43]],[.7,[239,108,42]],[1,[216,27,27]]];function rH(L){if(L==null)return`rgb(${Q[0][1].join()})`;let C=Math.max(0,Math.min(1,L)),H=Q[0],V=Q[Q.length-1];for(let i=0;i<Q.length-1;i+=1)if(C>=Q[i][0]&&C<=Q[i+1][0]){H=Q[i],V=Q[i+1];break}let e=V[0]-H[0],t=e===0?0:(C-H[0])/e;return`rgb(${H[1].map((i,o)=>Math.round(i+(V[1][o]-i)*t)).join()})`}function w6(L){return`
  <svg class="defs" width="0" height="0" aria-hidden="true">
    <defs>
      <!-- the glass: light at the top, a reflection band, a paler foot -->
      <linearGradient id="${L}-glass" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#ffffff"/>
        <stop offset=".30" stop-color="#f6f8fa"/>
        <stop offset=".345" stop-color="#dfe5ea"/>
        <stop offset=".40" stop-color="#fbfcfd"/>
        <stop offset=".78" stop-color="#eff2f5"/>
        <stop offset="1" stop-color="#e4e9ed"/>
      </linearGradient>
      <!-- the bright band that runs across the real plate -->
      <linearGradient id="${L}-sheen" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#fff" stop-opacity="0"/>
        <stop offset=".18" stop-color="#fff" stop-opacity=".95"/>
        <stop offset=".62" stop-color="#fff" stop-opacity=".75"/>
        <stop offset="1" stop-color="#fff" stop-opacity="0"/>
      </linearGradient>
      <filter id="${L}-wall" x="-30%" y="-40%" width="160%" height="200%">
        <feGaussianBlur stdDeviation="4"/>
      </filter>
      <filter id="${L}-glow" x="-45%" y="-70%" width="190%" height="260%">
        <feGaussianBlur stdDeviation="7"/>
      </filter>
    </defs>
  </svg>`}function O6(L){return`
  <svg class="panel" viewBox="0 0 264 124" role="img" aria-hidden="true">
    <!-- the radiated heat, leaving the face of the plate -->
    <g class="heat">
      <rect class="halo" x="16" y="14" width="232" height="96" rx="7" filter="url(#${L}-glow)"/>
      <g class="waves" filter="url(#${L}-glow)">
        <rect class="wave w0" x="16" y="14" width="232" height="96" rx="7" fill="none"/>
        <rect class="wave w1" x="16" y="14" width="232" height="96" rx="7" fill="none"/>
        <rect class="wave w2" x="16" y="14" width="232" height="96" rx="7" fill="none"/>
      </g>
    </g>

    <!-- the wall behind: the panel stands a few centimetres off it -->
    <rect class="wall" x="22" y="22" width="220" height="92" rx="6" filter="url(#${L}-wall)"/>

    <rect class="glass" x="16" y="14" width="232" height="96" rx="6" fill="url(#${L}-glass)"/>
    <rect class="sheen" x="21" y="40" width="222" height="7" rx="3.5" fill="url(#${L}-sheen)"/>
    <rect class="sheen-soft" x="21" y="47" width="222" height="15" rx="7.5" fill="url(#${L}-sheen)" opacity=".3"/>

    <!-- The frame carries the plate's own temperature as colour. The real
         panel has an aluminium edge, so this is the part of it that is
         actually getting hot - not an indicator bolted onto the picture. -->
    <rect class="frame" x="17.3" y="15.3" width="229.4" height="93.4" rx="5.4" fill="none"/>

    <!-- The setpoint, etched into the glass, with the plate's own temperature
         beside it. The real panel has no display at all, so neither is drawn
         as a lit readout: they are the card's annotation of the thing. -->
    <text class="setpoint" x="38" y="80"><tspan class="value"></tspan
      ><tspan class="unit" dx="5" dy="-16"></tspan></text>
    <text class="surface" x="228" y="40" text-anchor="end"></text>

    <text class="brand" x="228" y="99" text-anchor="end">AENO</text>

    <!-- control box on the right edge, with its indicator -->
    <rect class="box" x="246" y="46" width="10" height="30" rx="3"/>
    <circle class="led-halo" cx="251" cy="61" r="4.6"/>
    <circle class="led" cx="251" cy="61" r="2.3"/>
  </svg>`}function k6(L,C,H=!0){if(!L)return;let V=C.on&&C.heating;L.classList.toggle("hot",!!V),L.classList.toggle("dead",!C.available),L.classList.toggle("measured",C.glow!==null);let e=C.glow!==null?C.glow:V?.5:0;L.style.setProperty("--ae-glow",e.toFixed(2)),L.style.setProperty("--ae-frame",rH(C.glow));let t=H&&C.target!==null?String(Math.round(C.target)):"",r=L.querySelector(".setpoint .value"),i=L.querySelector(".setpoint .unit");r.textContent!==t&&(r.textContent=t);let o=t?"\xB0C":"";i.textContent!==o&&(i.textContent=o);let M=L.querySelector(".surface"),n=C.panelTemp===null?"":`${Math.round(C.panelTemp)} \xB0C`;M.textContent!==n&&(M.textContent=n)}var T6=`
${E}

:host {
  --ae-heat: #ef6c00;
  --ae-off: var(--state-icon-color, #8a9199);
  /* how far along cold -> hot the panel surface is, 0 to 1 */
  --ae-glow: 0;
}

.wrap { padding: 14px 16px 16px; gap: 12px; position: relative; }
/* a wash of the accent, so the card reads as warm at a glance */
.wrap::before {
  content: ''; position: absolute; inset: 0; pointer-events: none;
  background: radial-gradient(120% 80% at 0% 0%,
    color-mix(in srgb, var(--ap-accent) 11%, transparent), transparent 62%);
}
.wrap > * { position: relative; }

/* ---------- header with the readings ---------- */
.top { display: flex; align-items: flex-start; gap: 10px; }
.top .name { font-size: 1rem; font-weight: 650; letter-spacing: -.01em; line-height: 1.15; cursor: pointer; }
.top .sub { font-size: .72rem; color: var(--ap-muted); margin-top: 1px; }
.top .spacer { flex: 1; }

.ind { display: flex; gap: 6px 10px; flex-wrap: wrap; justify-content: flex-end; }
.ind > span {
  display: inline-flex; align-items: center; gap: 4px; cursor: pointer;
  font-size: .74rem; color: var(--ap-muted); font-variant-numeric: tabular-nums; white-space: nowrap;
}
.ind b { color: var(--ap-text); font-weight: 600; }
.ind .icon { width: 13px; height: 13px; opacity: .75; }
.ind .raw { font-size: .68rem; }

.open-badge {
  display: inline-flex; align-items: center; gap: 3px; margin-left: 6px;
  color: var(--warning-color, #fb8c00); font-weight: 600;
}
.open-badge .icon { width: 12px; height: 12px; }
.open-badge.calm { color: var(--ap-muted); font-weight: 500; }

/* ---------- hero ---------- */
.hero { display: grid; grid-template-columns: 132px minmax(0,1fr) auto; gap: 14px; align-items: center; }
.hero.no-art { grid-template-columns: minmax(0,1fr) auto; }
.compact .hero { grid-template-columns: 104px minmax(0,1fr) auto; gap: 10px; }
/* On a narrow card the readings cannot share a line with the name without
   breaking the model number in half, so they drop to a line of their own. */
@container (max-width: 420px) {
  .top { flex-wrap: wrap; }
  .top .spacer { display: none; }
  .ind { width: 100%; justify-content: flex-start; }
}

/* A phone card in portrait is about 390px wide: too narrow for the drawing,
   the status text and the setpoint side by side, but no reason to drop the
   drawing - it stacks above the other two instead. */
@container (max-width: 420px) {
  .hero {
    grid-template-columns: minmax(0,1fr) auto;
    grid-template-areas: 'art art' 'status dial';
    gap: 10px 12px;
  }
  .hero .art { grid-area: art; width: 100%; max-width: 230px; justify-self: center; }
  .hero .status { grid-area: status; }
  .hero .dial { grid-area: dial; }
  .hero.no-art { grid-template-areas: 'status dial'; }
}

.mode-name { font-size: .68rem; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; color: var(--ap-accent); }
.state { font-size: 1.02rem; font-weight: 600; line-height: 1.25; margin-top: 2px; letter-spacing: -.01em; }
.state-sub { font-size: .76rem; color: var(--ap-muted); margin-top: 2px; }

.dial { display: flex; align-items: center; gap: 8px; }
.dial .big {
  font-size: 2rem; font-weight: 300; letter-spacing: -.03em; line-height: 1;
  color: var(--ap-text); font-variant-numeric: tabular-nums; white-space: nowrap;
}
.compact .dial .big { font-size: 1.6rem; }
.dial .big small { font-size: .8rem; font-weight: 600; color: var(--ap-muted); margin-left: 3px; }
.updown { display: grid; gap: 4px; }
.updown button {
  width: 30px; height: 26px; border-radius: 8px; cursor: pointer; padding: 0;
  border: 1px solid var(--ap-line); background: transparent; color: var(--ap-text);
  display: inline-flex; align-items: center; justify-content: center;
  transition: border-color .2s ease, transform .1s ease;
}
.updown button .icon { width: 18px; height: 18px; }
.updown button:hover:not([disabled]) { border-color: var(--ap-accent); }
.updown button:active:not([disabled]) { transform: scale(.94); }
.updown button[disabled] { opacity: .32; cursor: not-allowed; }

/* ---------- on/off bar ---------- */
.seg {
  display: grid; grid-auto-flow: column; grid-auto-columns: 1fr; gap: 4px;
  padding: 4px; border-radius: 14px; background: color-mix(in srgb, var(--ap-text) 6%, transparent);
}
.seg button {
  display: inline-flex; align-items: center; justify-content: center; gap: 6px;
  padding: 9px 6px; border-radius: 10px; cursor: pointer; min-width: 0;
  border: 0; background: transparent; color: var(--ap-muted);
  font: inherit; font-size: .78rem; font-weight: 600;
  transition: background .2s ease, color .2s ease, transform .1s ease;
}
.seg button .icon { width: 17px; height: 17px; flex: 0 0 auto; }
.seg button span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.seg button:active { transform: scale(.98); }
.seg button[aria-pressed="true"] {
  background: var(--card-background-color, #fff); color: var(--ap-accent);
  box-shadow: 0 1px 4px rgba(0,0,0,.14);
}
.dark .seg button[aria-pressed="true"] { background: color-mix(in srgb, var(--ap-text) 14%, transparent); }
.seg button.power[aria-pressed="true"] { color: var(--ae-off); }
@container (max-width: 320px) { .seg button span { display: none; } }

/* ---------- control row ---------- */
.btnrow { display: flex; flex-wrap: wrap; gap: 8px; }
.ghost {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 7px 12px; border-radius: 999px; cursor: pointer;
  border: 1px solid var(--ap-line); background: transparent; color: var(--ap-text);
  font: inherit; font-size: .78rem; font-weight: 500;
  transition: border-color .2s ease, background .2s ease, color .2s ease, transform .1s ease;
}
.ghost .icon { width: 15px; height: 15px; color: var(--ap-muted); }
.ghost:hover:not([disabled]) { border-color: var(--ap-accent); }
.ghost:active:not([disabled]) { transform: scale(.97); }
.ghost[aria-pressed="true"] {
  background: color-mix(in srgb, var(--ap-accent) 15%, transparent);
  border-color: color-mix(in srgb, var(--ap-accent) 45%, transparent);
  color: var(--ap-accent);
}
.ghost[aria-pressed="true"] .icon { color: var(--ap-accent); }
.ghost[disabled] { opacity: .4; cursor: not-allowed; }

/* the element limit, as a small stepper on the same row */
.limit {
  display: inline-flex; align-items: center; gap: 6px; padding: 4px 6px 4px 12px;
  border-radius: 999px; border: 1px solid var(--ap-line);
  font-size: .78rem; color: var(--ap-muted);
}
.limit b { color: var(--ap-text); font-weight: 600; font-variant-numeric: tabular-nums; }
.limit button {
  width: 24px; height: 24px; border-radius: 50%; cursor: pointer; padding: 0;
  border: 0; background: color-mix(in srgb, var(--ap-text) 8%, transparent); color: var(--ap-text);
  display: inline-flex; align-items: center; justify-content: center;
}
.limit button .icon { width: 15px; height: 15px; }
.limit button:active:not([disabled]) { transform: scale(.92); }
.limit button[disabled] { opacity: .32; cursor: not-allowed; }

/* ---------- the panel drawing ---------- */
.art { display: block; }
.art[hidden] { display: none; }
.panel { width: 100%; height: auto; display: block; overflow: visible; }
.panel .wall { fill: #000; opacity: .16; }
.panel .glass { stroke: rgba(0,0,0,.06); stroke-width: .6; }
.panel .box { fill: #f1f4f5; stroke: rgba(0,0,0,.14); stroke-width: .7; }
.panel .led { fill: #9aa3a8; transition: fill .5s ease; }
.panel .led-halo { fill: #5bd07a; opacity: 0; transition: opacity .5s ease; }
.panel.hot .led { fill: #5bd07a; }
.panel.hot .led-halo { opacity: .3; }
.panel .brand { font: 600 7px/1 Roboto, Arial, sans-serif; letter-spacing: 1.9px; fill: #a7aeb3; }

/* the frame carries the plate's measured temperature, 0 \xB0C grey to 120 red */
.panel .frame {
  stroke: var(--ae-frame, #9aa3a8); stroke-width: 2.6;
  transition: stroke 1.2s ease, stroke-width .6s ease;
}
/* while the element runs the frame breathes, so motion says "working" and
   colour says "hot" - a panel can be either without being the other */
.panel.hot .frame { stroke-width: 3.4; animation: ae-frame 2.4s ease-in-out infinite; }
@keyframes ae-frame { 0%, 100% { opacity: 1; } 50% { opacity: .55; } }

/* the two numbers etched into the glass */
.panel .setpoint {
  font: 300 46px/1 "DIN Alternate", "Helvetica Neue", Arial, sans-serif;
  letter-spacing: -1.5px; transition: fill 1.2s ease;
  fill: color-mix(in srgb, var(--ae-frame, #9aa3a8) 70%, #6d767c);
}
.panel .setpoint .unit {
  font: 600 14px/1 Roboto, Arial, sans-serif; letter-spacing: 0;
}
.panel .surface {
  font: 600 17px/1 Roboto, Arial, sans-serif; transition: fill 1.2s ease;
  fill: var(--ae-frame, #9aa3a8);
}

/* the radiated heat: colour and strength both follow the surface temperature */
.panel .halo { fill: var(--ae-frame, #ff9336); opacity: 0; transition: opacity 1.2s ease, fill 1.2s ease; }
.panel.hot .halo {
  opacity: calc(.12 + var(--ae-glow) * .34);
  animation: ae-breathe 2.4s ease-in-out infinite;
}
.panel .wave {
  stroke: var(--ae-frame, #ff9336); stroke-width: 5; opacity: 0;
  transform-box: view-box; transform-origin: 50% 50%;
}
.panel.hot .wave { animation: ae-radiate 2.8s ease-out infinite; }
.panel.hot .wave.w1 { animation-delay: -.93s; }
.panel.hot .wave.w2 { animation-delay: -1.86s; }
@keyframes ae-radiate {
  0% { opacity: 0; transform: scale(1); }
  22% { opacity: calc(.3 + var(--ae-glow) * .4); }
  100% { opacity: 0; transform: scale(1.2); }
}
@keyframes ae-breathe {
  0%, 100% { opacity: calc(.12 + var(--ae-glow) * .34); }
  50% { opacity: calc(.06 + var(--ae-glow) * .18); }
}
.panel.dead { opacity: .45; filter: saturate(.25); }

.dark .panel .wall { opacity: .34; }
.dark .panel .box { fill: #d9dee1; }
.dark .panel .brand { fill: #868f96; }
`;var J5={language:"auto",compact:!1,animate:!0,show_art:!0,show_readings:!0,show_modes:!0,show_presets:!0,show_setpoint:!0,show_extras:!0,show_openings:!0},E6=0,X5=class extends HTMLElement{static getConfigElement(){return document.createElement(X1)}static getStubConfig(C){let H=F2(C);return{type:`custom:${i1}`,device:H[0]?.id}}constructor(){super(),this.attachShadow({mode:"open"}),this._sections={},this._signatures={},this._built=!1,E6+=1,this._uid=`aeno${E6}`}setConfig(C){this._config={...J5,...C||{}},this._signatures={},this._hass&&this._render()}set hass(C){this._hass=C,this._render()}get hass(){return this._hass}getCardSize(){return this._config?.compact?4:5}getGridOptions(){return{columns:12,min_columns:6,rows:"auto"}}_build(){let C=document.createElement("style");C.textContent=T6;let H=document.createElement("ha-card"),V=document.createElement("div");V.className="wrap",V.addEventListener("click",e=>this._onClick(e)),V.insertAdjacentHTML("beforeend",w6(this._uid));for(let e of["top","hero","alerts","modes","buttons"]){let t=document.createElement("div");t.dataset.section=e,this._sections[e]=t,V.appendChild(t)}H.appendChild(V),this.shadowRoot.replaceChildren(C,H),this._wrap=V,this._built=!0}_render(){if(!this._hass||!this._config)return;this._built||this._build();let C=B2(P2(this._config,this._hass)),H=b6(this._hass,this._config);if(this._model=H,!H.ok){this._renderEmpty(H,C);return}this._emptyShown=!1,this._applyWrapClasses(H),this._section("top",this._topHtml(H,C)),this._heroSection(H,C),this._section("alerts",this._alertsHtml(H,C)),this._section("modes",this._config.show_modes?this._segHtml(H,C):""),this._section("buttons",this._buttonsHtml(H,C))}_renderEmpty(C,H){if(this._emptyShown!==C.reason){this._emptyShown=C.reason,this._signatures={},this._wrap.style.setProperty("--ap-accent","var(--ae-off)");for(let[V,e]of Object.entries(this._sections))e.innerHTML="",e.hidden=V!=="top";this._sections.top.innerHTML=`
      <div class="empty">
        ${s("radiator")}
        <div>${a(H(`ui.${C.reason}`))}</div>
      </div>`}}_section(C,H){this._signatures[C]!==H&&(this._signatures[C]=H,this._sections[C].innerHTML=H,this._sections[C].hidden=!H)}_applyWrapClasses(C){let H=["wrap"];this._config.compact&&H.push("compact"),this._config.animate||H.push("no-animation"),this._hass.themes?.darkMode&&H.push("dark");let V=H.join(" ");this._wrap.className!==V&&(this._wrap.className=V);let e=(k1.find(t=>t.key===(C.on?"heat":"off"))||k1[0]).colour;this._wrap.style.getPropertyValue("--ap-accent")!==e&&this._wrap.style.setProperty("--ap-accent",e)}_topHtml(C,H){let V=C.draughty?"":this._openBadge(C,H);return`
      <div class="top">
        <div>
          <div class="name" data-action="more-info">${a(C.name)}</div>
          <div class="sub">${a(H("ui.device"))}${V}</div>
        </div>
        <div class="spacer"></div>
        <div class="ind">${this._readingsHtml(C,H)}</div>
      </div>`}_readingsHtml(C,H){if(!this._config.show_readings)return"";let V=[],e=(r,i,o,M,n,l="")=>{i!=null&&V.push(`
        <span data-action="more-info" data-entity="${a(n||"")}">
          ${s(r)}<b>${this._decimal(i,o)} ${a(M)}</b>${l}
        </span>`)},t=C.external&&C.inside!==null?`<span class="raw">${a(H("ui.device_reads"))} ${this._decimal(C.inside,0)}</span>`:"";return e("indoor",C.measured,1,C.unit,C.entities.room||C.entityId,t),e("water_percent",C.humidity,0,"%",C.entities.humidity),e("temperature",C.panelTemp,0,C.unit,C.entities.panel),e("energy",C.power,0,C.powerUnit,C.entities.power),e("counter",C.energy,1,C.energyUnit,C.entities.energy),V.join("")}_openBadge(C,H){if(!this._config.show_openings)return"";let V=C.openings;if(V.none||!V.open)return"";let e=V.open>1?T1(H("ui.windows_open"),{count:V.open}):H(V.tilted?"ui.window_tilted":"ui.window_open");return` <span class="open-badge${C.draughty?"":" calm"}">${s("window_open")}${a(e)}</span>`}_heroSection(C,H){let V=this._config.show_art;this._sections.hero.querySelector(".hero")||(this._sections.hero.innerHTML=`
        <div class="hero">
          <div class="art" data-action="more-info">${O6(this._uid)}</div>
          <div class="status"></div>
          <div class="dial"></div>
        </div>`,this._heroNode=this._sections.hero.querySelector(".hero"),this._statusNode=this._sections.hero.querySelector(".status"),this._dialNode=this._sections.hero.querySelector(".dial")),this._heroNode.classList.toggle("no-art",!V);let e=this._sections.hero.querySelector(".art");e.hidden=!V,V&&k6(e.querySelector(".panel"),C,this._config.show_setpoint);let t=this._localise(_6(C)),r=this._localise(y6(C)),i=`
      <div class="mode-name">${a(H(`mode_long.${C.on?"heat":"off"}`))}</div>
      <div class="state">${a(T1(H(t.key),t))}</div>
      <div class="state-sub">${a(r.key?T1(H(r.key),r):"")}</div>`;this._signatures.status!==i&&(this._signatures.status=i,this._statusNode.innerHTML=i);let o=this._dialHtml(C);this._signatures.dial!==o&&(this._signatures.dial=o,this._dialNode.innerHTML=o)}_dialHtml(C){let H=C.target,V=!C.available||H===null,e=`<button type="button" data-action="temp" data-dir="1"
      ${V||H>=C.maxTemp?"disabled":""} aria-label="+">${s("chevron_up")}</button>`,t=`<button type="button" data-action="temp" data-dir="-1"
      ${V||H<=C.minTemp?"disabled":""} aria-label="\u2212">${s("chevron")}</button>`;return`${`<div class="big">${H===null?"\u2013\u2013":this._decimal(H,1)}<small> ${a(C.unit)}</small></div>`}<div class="updown">${e}${t}</div>`}_alertsHtml(C,H){let V=[];if(this._config.show_openings&&C.draughty){let t=this._ago(C.openings.openFor,H),r=C.openings.longest?.tilted;V.push(["","window_open",T1(H(r?"alert.window_tilted":"alert.window_open"),{name:C.openings.longest?.name||H("ui.window"),duration:t})])}return C.continuous&&V.push(["","manual",H("alert.continuous")]),C.on&&C.timer.set&&C.timer.remaining!==null&&V.push(["info","timer",T1(H("alert.timer"),{remaining:this._ago(C.timer.remaining*60,H)})]),C.locked&&V.push(["info","lock",H("alert.locked")]),V.length?`<div class="alerts">${V.map(([t,r,i])=>`<div class="alert${t?` ${t}`:""}">${s(r)}<span>${a(i)}</span></div>`).join("")}</div>`:""}_ago(C,H){return W(C,H("ui.minute_short"),H("ui.hour_short"))}_decimal(C,H=1){return B(C,this._hass,H)}_localise(C){let H={...C};return typeof H.temp=="number"&&(H.temp=this._decimal(H.temp,1)),typeof H.diff=="number"&&(H.diff=this._decimal(H.diff,1)),H}_segHtml(C,H){let V=C.modes?.length?C.modes:k1.map(t=>t.key);return`<div class="seg">${k1.filter(t=>t.key==="off"||V.includes(t.key)).map(t=>{let r=C.available&&(t.key==="off"?!C.on:C.on);return`
        <button type="button" class="${t.key==="off"?"power":""}"
          data-action="mode" data-value="${t.key}" aria-pressed="${r}"
          ${C.available?"":"disabled"}>
          ${s(t.icon)}<span>${a(H(`mode.${t.key}`))}</span>
        </button>`}).join("")}</div>`}_buttonsHtml(C,H){let V=[];if(this._config.show_presets)for(let e of C.presets)V.push(`
          <button type="button" class="ghost" data-action="preset" data-value="${e.key}"
            aria-pressed="${e.on}" ${C.on?"":"disabled"}>
            ${s(e.icon)}${a(H(`preset.${e.key}`))}
          </button>`);if(this._config.show_extras&&(C.locked!==null&&V.push(`
          <button type="button" class="ghost" data-action="lock" aria-pressed="${C.locked}"
            ${C.available?"":"disabled"}>
            ${s(C.locked?"lock":"lock_open")}${a(H("ui.lock"))}
          </button>`),C.timer.set&&C.timer.entityId&&V.push(`
          <button type="button" class="ghost" data-action="timer-cancel"
            ${C.available?"":"disabled"}>
            ${s("timer")}${a(H("ui.timer_cancel"))}
          </button>`),C.limit)){let{value:e,min:t,max:r,unit:i}=C.limit;V.push(`
          <span class="limit">
            ${a(H("ui.limit"))} <b>${g(e,0)} ${a(i)}</b>
            <button type="button" data-action="limit" data-dir="-1"
              ${!C.available||e<=t?"disabled":""} aria-label="\u2212">${s("chevron")}</button>
            <button type="button" data-action="limit" data-dir="1"
              ${!C.available||e>=r?"disabled":""} aria-label="+">${s("chevron_up")}</button>
          </span>`)}return V.length?`<div class="btnrow">${V.join("")}</div>`:""}_onClick(C){let H=C.target.closest("[data-action]");if(!H||H.hasAttribute("disabled"))return;let{action:V,entity:e,value:t,dir:r}=H.dataset,i=this._model;if(!(!i?.ok&&V!=="more-info"))switch(V){case"more-info":this._moreInfo(e||i?.entityId);break;case"mode":this._haptic(t==="off"?"medium":"light"),this._climate("set_hvac_mode",{entity_id:i.entityId,hvac_mode:t});break;case"preset":this._haptic("light"),H.getAttribute("aria-pressed")!=="true"&&this._climate("set_preset_mode",{entity_id:i.entityId,preset_mode:t});break;case"timer-cancel":this._haptic("medium"),this._hass.callService("select","select_option",{entity_id:i.timer.entityId,option:"cancel"});break;case"lock":this._haptic("medium"),this._hass.callService("lock",i.locked?"unlock":"lock",{entity_id:i.entities.lock});break;case"temp":this._stepTemperature(Number(r));break;case"limit":this._stepLimit(Number(r));break;default:break}}_stepTemperature(C){let H=this._model;if(!H||H.target===null)return;let V=H.targetStep||1,e=Math.min(H.maxTemp,Math.max(H.minTemp,Math.round((H.target+C*V)*10)/10));e!==H.target&&(this._haptic("light"),this._climate("set_temperature",{entity_id:H.entityId,temperature:e}))}_stepLimit(C){let H=this._model?.limit;if(!H||!Number.isFinite(H.value))return;let V=Math.min(H.max,Math.max(H.min,H.value+C*(H.step||5)));V!==H.value&&(this._haptic("light"),this._hass.callService("number","set_value",{entity_id:H.entityId,value:V}))}_climate(C,H){return H.entity_id?this._hass.callService("climate",C,H):Promise.resolve()}_moreInfo(C){C&&this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:C},bubbles:!0,composed:!0}))}_haptic(C){this.dispatchEvent(new CustomEvent("haptic",{detail:C,bubbles:!0,composed:!0}))}};function R6(){customElements.get(i1)||(customElements.define(i1,X5),window.customCards=window.customCards||[],window.customCards.push({type:i1,name:"AENO Heater Card",description:"Card for AENO infrared panel heaters behind tuya-local: the panel drawn with the setpoint etched on it, radiated heat scaled to the measured surface temperature, heating mode, child lock, element limit and window contacts.",preview:!0,documentationURL:"https://github.com/gabor-io/ha-appliance-custom-card"}),console.info(`%c ${i1} %c ${M6} `,"color:#fff;background:#ef6c00;font-weight:700;border-radius:3px 0 0 3px","color:#ef6c00;background:#fff3e0;font-weight:700;border-radius:0 3px 3px 0"))}var iH=R({cardName:i1,toggles:["show_art","show_readings","show_modes","show_presets","show_setpoint","show_extras","show_openings","compact","animate"],defaults:J5,listDevices:F2,getLanguage:P2,translator:B2,languages:q5});function P6(){customElements.get(X1)||customElements.define(X1,iH)}P6();R6();var o1="nanoleaf-shapes-card",J1="nanoleaf-shapes-card-editor",B6="1.21.0",N2="nanoleaf",$6=[{key:"single_tap",icon:"gesture_tap"},{key:"double_tap",icon:"gesture_tap"},{key:"swipe_up",icon:"chevron_up"},{key:"swipe_down",icon:"chevron"},{key:"swipe_left",icon:"chevron"},{key:"swipe_right",icon:"chevron"}],F6=[1200,2700,4e3,5e3,6500],C3={beatdrop:["#ff2d95","#7b2ff7","#00e5ff"],blaze:["#7a0d00","#ff4d00","#ffb300"],"cocoa beach":["#ffd9a0","#ff8a5c","#19c6c6"],"cotton candy":["#ffc2e2","#c9b6ff","#a6e8ff"],"date night":["#4a0032","#c2185b","#ff5c8a"],"hip hop":["#ff6f00","#ff1f6b","#8e24aa"],"hot sauce":["#8b0000","#ff2a00","#ff7a00"],jungle:["#063d1e","#2e9e3e","#b5e61d"],lightscape:["#ffb3c7","#b8c6ff","#9ef0d9"],"morning sky":["#1b3a6b","#7aa8e0","#ffc7a8"],"northern lights":["#06243d","#1de9b6","#7c4dff"],"pop rocks":["#ff1744","#ffea00","#00e5ff"],prism:["#ff0000","#ffd400","#00c853","#00b0ff","#aa00ff"],starlight:["#0b1736","#cfe3ff","#ffffff"],sundown:["#ff8f00","#ff4081","#6a1b9a"],waterfall:["#003f73","#00a3e0","#b3ecff"]},N6=["#8a9199","#c3c9cf","#8a9199"],H3={flower7:[[0,0],[1,0],[0,1],[-1,1],[-1,0],[0,-1],[1,-1]],zigzag9:[[0,0],[1,-1],[2,-1],[3,-2],[4,-2],[5,-3],[6,-3],[7,-4],[8,-4]],row5:[[0,0],[1,0],[2,0],[3,0],[4,0]]},V3=H3.flower7,D6=2.4;var aH={card_name:"Nanoleaf",mode:{off:"Kikapcsolva",effect:"Jelenet",white:"Feh\xE9r",colour:"Sz\xEDn"},power:{off:"Ki",on:"Be"},state:{unavailable:"A panelek nem v\xE1laszolnak",off:"Kikapcsolva",effect:"{effect}",white:"{kelvin} K feh\xE9r",colour:"Fix sz\xEDn"},sub:{unavailable:"Nincs v\xE1lasz \u2013 \xE1ram vagy h\xE1l\xF3zat",off:"A panelek s\xF6t\xE9tek",brightness:"F\xE9nyer\u0151 {percent}%"},ui:{device:"Nanoleaf Shapes",brightness:"F\xE9nyer\u0151",effects:"Jelenetek",white:"Feh\xE9r",colour:"Sz\xEDn",identify:"Felvillant\xE1s",touch:"\xC9rint\xE9s",touch_never:"m\xE9g nem volt",open_colour:"Sz\xEDnv\xE1laszt\xF3",no_entity:"Nem tal\xE1ltam Nanoleaf panelt ebben a Home Assistantban.",many_entities:"T\xF6bb Nanoleaf is van \u2013 v\xE1laszd ki, melyikr\u0151l sz\xF3ljon a k\xE1rtya.",missing_entity:"A megadott entit\xE1s nem l\xE9tezik.",minute_short:"perc",hour_short:"\xF3",unknown_effect:"ismeretlen jelenet"},gesture:{single_tap:"Koppint\xE1s",double_tap:"Dupla koppint\xE1s",swipe_up:"Felfel\xE9 h\xFAz\xE1s",swipe_down:"Lefel\xE9 h\xFAz\xE1s",swipe_left:"Balra h\xFAz\xE1s",swipe_right:"Jobbra h\xFAz\xE1s"},editor:{device:"Eszk\xF6z",device_auto:"Automatikus",name:"N\xE9v",language:"Nyelv",language_auto:"Automatikus",sections:"Mit mutasson",show_art:"Panelrajz",show_brightness:"F\xE9nyer\u0151",show_effects:"Jelenetek",show_white:"Feh\xE9r fokozatok",show_touch:"\xC9rint\xE9s",show_identify:"Felvillant\xE1s",compact:"Kompakt",animate:"Anim\xE1ci\xF3k"}},oH={card_name:"Nanoleaf",mode:{off:"Off",effect:"Scene",white:"White",colour:"Colour"},power:{off:"Off",on:"On"},state:{unavailable:"The panels are not responding",off:"Off",effect:"{effect}",white:"{kelvin} K white",colour:"Solid colour"},sub:{unavailable:"No answer - power or network",off:"The panels are dark",brightness:"Brightness {percent}%"},ui:{device:"Nanoleaf Shapes",brightness:"Brightness",effects:"Scenes",white:"White",colour:"Colour",identify:"Identify",touch:"Touch",touch_never:"nothing yet",open_colour:"Colour picker",no_entity:"No Nanoleaf found in this Home Assistant.",many_entities:"There is more than one Nanoleaf - pick the one this card is about.",missing_entity:"The configured entity does not exist.",minute_short:"min",hour_short:"h",unknown_effect:"unknown scene"},gesture:{single_tap:"Tap",double_tap:"Double tap",swipe_up:"Swipe up",swipe_down:"Swipe down",swipe_left:"Swipe left",swipe_right:"Swipe right"},editor:{device:"Device",device_auto:"Automatic",name:"Name",language:"Language",language_auto:"Automatic",sections:"Sections",show_art:"Panel drawing",show_brightness:"Brightness",show_effects:"Scenes",show_white:"White presets",show_touch:"Touch",show_identify:"Identify",compact:"Compact",animate:"Animations"}},I6={hu:aH,en:oH},e3=Object.keys(I6);function D2(L,C){return k(L,C,e3)}function I2(L){return T(I6,L)}function L3(L,C={}){return Object.entries(C).reduce((H,[V,e])=>H.replace(`{${V}}`,String(e)),L)}function z2(L){return Object.values(L?.entities||{})}function z6(L){return z2(L).filter(C=>C.platform===N2&&C.entity_id.startsWith("light.")).map(C=>C.entity_id)}function W2(L){let C=new Map;for(let H of z2(L)){if(H.platform!==N2||!H.device_id||!H.entity_id.startsWith("light."))continue;let V=L.devices?.[H.device_id];V&&C.set(H.device_id,V.name_by_user||V.name||H.device_id)}return[...C.entries()].map(([H,V])=>({id:H,name:V}))}function W6(L,C){let H=C?.device?z2(L).find(e=>e.device_id===C.device&&e.entity_id.startsWith("light."))?.entity_id:null;if(C?.entity&&(!H||L?.entities?.[C.entity]?.device_id===C.device))return C.entity;if(H)return H;let V=z6(L);return V.length===1?V[0]:null}function G6(L){return z6(L).length>1}function U6(L,C){let H=L?.entities?.[C]?.device_id;if(!H)return{};let V=z2(L).filter(t=>t.device_id===H&&t.platform===N2),e=t=>V.find(r=>r.entity_id.startsWith(`${t}.`))?.entity_id;return{identify:e("button"),touch:e("event")}}function t3(L){return L?C3[String(L).trim().toLowerCase()]||N6:null}function r3(L){return!!L&&String(L).trim().toLowerCase()in C3}function K6(L,C){let H=L?.states?.[C]?.attributes?.friendly_name;if(H)return H;let V=L?.entities?.[C]?.device_id,e=V?L.devices?.[V]:null;return e?.name_by_user||e?.name||""}function MH(L,C,H){let V=L?.entities?.[C]?.device_id,e=V?L.devices?.[V]:null,t=(H||"").toLowerCase();return[e?.model_id,e?.model].filter(Boolean).find(i=>!t.includes(String(i).toLowerCase()))||null}function nH(L,C){return L==null||C===null||C===void 0?null:{hue:L,saturation:C,css:`hsl(${L} ${C}% 50%)`}}function i3(L){if(L==null)return null;let C=[[1200,[255,147,41]],[2700,[255,197,143]],[4e3,[255,228,206]],[5e3,[255,244,237]],[6500,[227,238,255]]],H=Math.max(C[0][0],Math.min(C[C.length-1][0],L)),V=C[0],e=C[C.length-1];for(let o=0;o<C.length-1;o+=1)if(H>=C[o][0]&&H<=C[o+1][0]){V=C[o],e=C[o+1];break}let t=e[0]-V[0],r=t===0?0:(H-V[0])/t;return`rgb(${V[1].map((o,M)=>Math.round(o+(e[1][M]-o)*r)).join()})`}function sH(L,C){let H=C?L?.states?.[C]:null;if(!H||x(H))return null;let V=H.attributes?.event_type||null,e=Date.parse(H.state);return!V||Number.isNaN(e)?null:{entityId:C,type:V,icon:$6.find(t=>t.key===V)?.icon||"gesture_tap",secondsAgo:Math.max(0,Math.round((Date.now()-e)/1e3))}}function j6(L,C){let H=W6(L,C);if(!H)return{ok:!1,reason:G6(L)?"many_entities":"no_entity"};let V=L?.states?.[H];if(!V)return{ok:!1,reason:"missing_entity"};let e=U6(L,H),t=V.attributes||{},r=!x(V),i=r&&V.state==="on",o=i&&t.effect||null,M=Array.isArray(t.effect_list)?t.effect_list:[],n=t.brightness??null,l=t.color_temp_kelvin??null,d=i&&!o&&t.color_mode==="color_temp",p=i&&!o&&!d?nH(t.hs_color?.[0],t.hs_color?.[1]):null;return{ok:!0,entityId:H,entities:{light:H,...e},name:C?.name||K6(L,H)||H,model:C?.subtitle!==void 0?C.subtitle||null:MH(L,H,C?.name||K6(L,H)),available:r,on:i,mode:i?o?"effect":d?"white":"colour":"off",effect:o,effects:M,palette:t3(o),knownEffect:r3(o),brightness:n,brightnessPct:n===null?null:Math.round(n/255*100),kelvin:l,kelvinMin:t.min_color_temp_kelvin??1200,kelvinMax:t.max_color_temp_kelvin??6500,kelvinCss:i3(l),hs:p,gesture:sH(L,e.touch),touchable:!!e.touch}}function Q6(L){return L.available?L.on?L.mode==="effect"?{key:"state.effect",effect:L.effect}:L.mode==="white"?{key:"state.white",kelvin:L.kelvin}:{key:"state.colour"}:{key:"state.off"}:{key:"state.unavailable"}}function q6(L){return L.available?L.on?L.brightnessPct===null?{key:""}:{key:"sub.brightness",percent:L.brightnessPct}:{key:"sub.off"}:{key:"sub.unavailable"}}function lH([L,C]){return{x:10*1.5*L,y:10*Math.sqrt(3)*(C+L/2)}}function dH(L,C){return Array.from({length:6},(H,V)=>{let e=Math.PI/180*(60*V);return`${(L+10*Math.cos(e)).toFixed(2)},${(C+10*Math.sin(e)).toFixed(2)}`}).join(" ")}function a3(L){let C=L.map((d,p)=>{let{x:v,y:f}=lH(d);return{index:p,x:v,y:f,points:dH(v,f)}});if(!C.length)return{panels:C,viewBox:"0 0 1 1",width:1,height:1};let H=10*.8,V=10*.4,e=10*1.87,t=C.map(d=>d.x),r=C.map(d=>d.y),i=Math.min(...t)-10-H,o=Math.max(...t)+10+H,M=Math.min(...r)-10*.87-V,n=Math.max(...r.map(d=>d+10*.87),C[0].y+e)+V,l=Math.max(1,o-i+(n-M));for(let d of C)d.phase=(d.x-i+(d.y-M))/l;return{panels:C,viewBox:`${i.toFixed(2)} ${M.toFixed(2)} ${(o-i).toFixed(2)} ${(n-M).toFixed(2)}`,width:o-i,height:n-M}}function Y6(L){return`
  <svg class="defs" width="0" height="0" aria-hidden="true">
    <defs>
      <filter id="${L}-bloom" x="-60%" y="-60%" width="220%" height="220%">
        <feGaussianBlur stdDeviation="6"/>
      </filter>
      <!-- The diffuser is a shallow dome, not a flat pane: on the wall each
           panel is brightest in the middle and falls off into its frame. A
           top-to-bottom wash makes them look like printed tiles instead. -->
      <radialGradient id="${L}-face" cx=".5" cy=".42" r=".62">
        <stop offset="0" stop-color="#fff" stop-opacity=".30"/>
        <stop offset=".45" stop-color="#fff" stop-opacity=".10"/>
        <stop offset=".78" stop-color="#000" stop-opacity=".06"/>
        <stop offset="1" stop-color="#000" stop-opacity=".26"/>
      </radialGradient>
    </defs>
  </svg>`}function X6(L,C){let{panels:H,viewBox:V}=a3(C),e=H.map(M=>`<polygon class="glow" points="${M.points}" style="--phase:${M.phase.toFixed(3)}"/>`).join(""),t=H.map(M=>`<g class="panel" style="--phase:${M.phase.toFixed(3)}">
        <polygon class="lit" points="${M.points}"/>
        <polygon class="sheen" points="${M.points}" fill="url(#${L}-face)"/>
        <polygon class="frame" points="${M.points}"/>
      </g>`).join(""),r=H[0],i=r?r.x-10*.5:0,o=r?`<g class="lead">
        <path d="M${i.toFixed(2)} ${(r.y+10*.87).toFixed(2)}
                 c0 ${(10*.5).toFixed(2)} ${(-10*.35).toFixed(2)} ${(10*.5).toFixed(2)}
                 ${(-10*.35).toFixed(2)} ${10 .toFixed(2)}"/>
      </g>`:"";return`
  <svg class="panels" viewBox="${V}" role="img" aria-hidden="true">
    <g class="bloom" filter="url(#${L}-bloom)">${e}</g>
    ${t}
    ${o}
  </svg>`}function J6(L,C){if(!L)return;L.classList.toggle("on",!!C.on),L.classList.toggle("dead",!C.available),L.classList.toggle("scene",C.mode==="effect");let H=C.mode==="effect"?C.palette:[C.mode==="white"?C.kelvinCss:C.hs?.css].filter(Boolean),V=H&&H.length?H:["#2b2f33"];for(let t=0;t<5;t+=1)L.style.setProperty(`--nl-c${t}`,V[t%V.length]);let e=C.on&&C.brightness!==null?C.brightness/255:0;L.style.setProperty("--nl-level",C.on?Math.max(.25,e).toFixed(2):"0")}var C8=`
${E}

:host {
  --nl-frame: #15181b;
  --nl-dark: #23272b;
  /* the five palette slots the cluster cycles through */
  --nl-c0: #2b2f33; --nl-c1: #2b2f33; --nl-c2: #2b2f33; --nl-c3: #2b2f33; --nl-c4: #2b2f33;
  --nl-level: 0;
}

.wrap { padding: 14px 16px 16px; gap: 12px; position: relative; }
.wrap::before {
  content: ''; position: absolute; inset: 0; pointer-events: none;
  background: radial-gradient(120% 80% at 0% 0%,
    color-mix(in srgb, var(--ap-accent) 13%, transparent), transparent 62%);
}
.wrap > * { position: relative; }

/* ---------- header ---------- */
.top { display: flex; align-items: flex-start; gap: 10px; }
.top .name { font-size: 1rem; font-weight: 650; letter-spacing: -.01em; line-height: 1.15; cursor: pointer; }
.top .sub { font-size: .72rem; color: var(--ap-muted); margin-top: 1px; }
.top .spacer { flex: 1; }
.ind { display: flex; gap: 6px 10px; flex-wrap: wrap; justify-content: flex-end; }
.ind > span { display: inline-flex; align-items: center; gap: 4px; font-size: .74rem; color: var(--ap-muted); white-space: nowrap; }
.ind .icon { width: 13px; height: 13px; opacity: .75; }
.ind b { color: var(--ap-text); font-weight: 600; }

/* ---------- hero ---------- */
.hero { display: grid; grid-template-columns: 150px minmax(0,1fr); gap: 14px; align-items: center; }
.hero.no-art { grid-template-columns: minmax(0,1fr); }
/* a long run of panels takes the full width and the text goes underneath:
   squeezed into the side column it would be a stripe */
.hero.wide { grid-template-columns: minmax(0,1fr); gap: 10px; }
.compact .hero { grid-template-columns: 112px minmax(0,1fr); gap: 10px; }
@container (max-width: 420px) {
  .hero { grid-template-columns: minmax(0,1fr); }
  .hero .art { max-width: 230px; justify-self: center; }
}

.mode-name { font-size: .68rem; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; color: var(--ap-accent); }
.state { font-size: 1.02rem; font-weight: 600; line-height: 1.25; margin-top: 2px; }
.state-sub { font-size: .76rem; color: var(--ap-muted); margin-top: 2px; }

/* ---------- the panels ---------- */
.art { display: block; cursor: pointer; }
.art[hidden] { display: none; }
.panels { width: 100%; height: auto; display: block; overflow: visible; }

.panels .frame { fill: none; stroke: var(--nl-frame); stroke-width: 2.2; }
.panels .lit { fill: var(--nl-dark); transition: fill 1s ease, opacity .6s ease; }
.panels .sheen { opacity: .9; pointer-events: none; }
.panels .glow { fill: var(--nl-c0); opacity: 0; transition: opacity 1s ease, fill 1s ease; }

.panels.on .lit { fill: var(--nl-c0); opacity: var(--nl-level); }
.panels.on .glow { opacity: calc(var(--nl-level) * .42); }

/* a running scene travels across the wall rather than changing it at once:
   each panel starts the same cycle a little later, by its position */
.panels.scene .lit,
.panels.scene .glow {
  animation: nl-wash 7s linear infinite;
  animation-delay: calc(var(--phase) * -7s);
}
@keyframes nl-wash {
  0%, 100% { fill: var(--nl-c0); }
  20% { fill: var(--nl-c1); }
  40% { fill: var(--nl-c2); }
  60% { fill: var(--nl-c3); }
  80% { fill: var(--nl-c4); }
}
.panels .lead path { stroke: var(--nl-frame); stroke-width: 1.3; fill: none; stroke-linecap: round; }
.panels.dead { opacity: .4; filter: saturate(.2); }

/* ---------- brightness ---------- */
.bright { display: flex; align-items: center; gap: 10px; }
.bright .icon { width: 17px; height: 17px; color: var(--ap-muted); flex: 0 0 auto; }
.bright input {
  flex: 1; min-width: 0; height: 22px; margin: 0; cursor: pointer;
  accent-color: var(--ap-accent); background: transparent;
}
.bright .val { font-size: .8rem; font-weight: 600; font-variant-numeric: tabular-nums; min-width: 42px; text-align: right; }
.bright input[disabled] { opacity: .4; cursor: not-allowed; }

/* ---------- scenes ---------- */
.scenes { display: flex; flex-wrap: wrap; gap: 7px; }
.scene-chip {
  display: inline-flex; align-items: center; gap: 7px;
  padding: 5px 11px 5px 5px; border-radius: 999px; cursor: pointer;
  border: 1px solid var(--ap-line); background: transparent; color: var(--ap-text);
  font: inherit; font-size: .76rem; font-weight: 500;
  transition: border-color .2s ease, background .2s ease, transform .1s ease;
}
.scene-chip .swatch {
  width: 18px; height: 18px; border-radius: 50%; flex: 0 0 auto;
  box-shadow: inset 0 0 0 1px rgba(0,0,0,.18);
}
.scene-chip:hover:not([disabled]) { border-color: var(--ap-accent); }
.scene-chip:active:not([disabled]) { transform: scale(.97); }
.scene-chip[aria-pressed="true"] {
  background: color-mix(in srgb, var(--ap-accent) 16%, transparent);
  border-color: color-mix(in srgb, var(--ap-accent) 48%, transparent);
  font-weight: 650;
}
.scene-chip[disabled] { opacity: .45; cursor: not-allowed; }
/* a scene the card has no palette for says so instead of inventing colours */
.scene-chip.unknown .swatch { box-shadow: inset 0 0 0 1px rgba(127,127,127,.5); }

/* ---------- whites and the rest ---------- */
.whites { display: flex; flex-wrap: wrap; gap: 7px; align-items: center; }
.white-chip {
  width: 30px; height: 30px; border-radius: 50%; cursor: pointer; padding: 0;
  border: 1px solid var(--ap-line); font: inherit;
  transition: transform .1s ease, box-shadow .2s ease, border-color .2s ease;
}
.white-chip:hover:not([disabled]) { border-color: var(--ap-accent); }
.white-chip:active:not([disabled]) { transform: scale(.94); }
.white-chip[aria-pressed="true"] { box-shadow: 0 0 0 2px var(--ap-accent); }
.white-chip[disabled] { opacity: .4; cursor: not-allowed; }
.whites .cap { font-size: .72rem; font-weight: 700; letter-spacing: .06em; text-transform: uppercase; color: var(--ap-muted); margin-right: 2px; }

.btnrow { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; }
.ghost {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 7px 12px; border-radius: 999px; cursor: pointer;
  border: 1px solid var(--ap-line); background: transparent; color: var(--ap-text);
  font: inherit; font-size: .78rem; font-weight: 500;
  transition: border-color .2s ease, transform .1s ease;
}
.ghost .icon { width: 15px; height: 15px; color: var(--ap-muted); }
.ghost:hover:not([disabled]) { border-color: var(--ap-accent); }
.ghost:active:not([disabled]) { transform: scale(.97); }
.ghost[disabled] { opacity: .4; cursor: not-allowed; }

.touch { display: inline-flex; align-items: center; gap: 6px; font-size: .76rem; color: var(--ap-muted); }
.touch .icon { width: 15px; height: 15px; }
.touch b { color: var(--ap-text); font-weight: 600; }

.seg {
  display: grid; grid-auto-flow: column; grid-auto-columns: 1fr; gap: 4px;
  padding: 4px; border-radius: 14px; background: color-mix(in srgb, var(--ap-text) 6%, transparent);
}
.seg button {
  display: inline-flex; align-items: center; justify-content: center; gap: 6px;
  padding: 9px 6px; border-radius: 10px; cursor: pointer; min-width: 0;
  border: 0; background: transparent; color: var(--ap-muted);
  font: inherit; font-size: .78rem; font-weight: 600;
  transition: background .2s ease, color .2s ease, transform .1s ease;
}
.seg button .icon { width: 17px; height: 17px; flex: 0 0 auto; }
.seg button:active { transform: scale(.98); }
.seg button[aria-pressed="true"] {
  background: var(--card-background-color, #fff); color: var(--ap-accent);
  box-shadow: 0 1px 4px rgba(0,0,0,.14);
}
.dark .seg button[aria-pressed="true"] { background: color-mix(in srgb, var(--ap-text) 14%, transparent); }
`;var M3={language:"auto",compact:!1,animate:!0,show_art:!0,show_brightness:!0,show_effects:!0,show_white:!0,show_touch:!0,show_identify:!0},H8=0,o3=class extends HTMLElement{static getConfigElement(){return document.createElement(J1)}static getStubConfig(C){let H=W2(C);return{type:`custom:${o1}`,device:H[0]?.id}}constructor(){super(),this.attachShadow({mode:"open"}),this._sections={},this._signatures={},this._built=!1,H8+=1,this._uid=`nl${H8}`}setConfig(C){this._config={...M3,...C||{}},this._signatures={},this._layoutKey=null,this._hass&&this._render()}set hass(C){this._hass=C,this._render()}get hass(){return this._hass}getCardSize(){return this._config?.compact?4:6}getGridOptions(){return{columns:12,min_columns:6,rows:"auto"}}get _layout(){let C=this._config?.layout;return typeof C=="string"?H3[C]||V3:!Array.isArray(C)||!C.length?V3:C.map(H=>Array.isArray(H)?[Number(H[0]),Number(H[1])]:null).filter(H=>H&&Number.isFinite(H[0])&&Number.isFinite(H[1]))}_build(){let C=document.createElement("style");C.textContent=C8;let H=document.createElement("ha-card"),V=document.createElement("div");V.className="wrap",V.addEventListener("click",e=>this._onClick(e)),V.addEventListener("input",e=>this._onInput(e)),V.insertAdjacentHTML("beforeend",Y6(this._uid));for(let e of["top","hero","bright","scenes","whites","buttons"]){let t=document.createElement("div");t.dataset.section=e,this._sections[e]=t,V.appendChild(t)}H.appendChild(V),this.shadowRoot.replaceChildren(C,H),this._wrap=V,this._built=!0}_render(){if(!this._hass||!this._config)return;this._built||this._build();let C=I2(D2(this._config,this._hass)),H=j6(this._hass,this._config);if(this._model=H,!H.ok){this._renderEmpty(H,C);return}this._emptyShown=!1,this._applyWrapClasses(H),this._section("top",this._topHtml(H,C)),this._heroSection(H,C),this._section("bright",this._config.show_brightness?this._brightHtml(H,C):""),this._section("scenes",this._config.show_effects?this._scenesHtml(H,C):""),this._section("whites",this._config.show_white?this._whitesHtml(H,C):""),this._section("buttons",this._buttonsHtml(H,C))}_renderEmpty(C,H){if(this._emptyShown!==C.reason){this._emptyShown=C.reason,this._signatures={},this._wrap.style.setProperty("--ap-accent","var(--state-icon-color, #8a9199)");for(let[V,e]of Object.entries(this._sections))e.innerHTML="",e.hidden=V!=="top";this._sections.top.innerHTML=`
      <div class="empty">
        ${s("bulb")}
        <div>${a(H(`ui.${C.reason}`))}</div>
      </div>`}}_section(C,H){this._signatures[C]!==H&&(this._signatures[C]=H,this._sections[C].innerHTML=H,this._sections[C].hidden=!H)}_applyWrapClasses(C){let H=["wrap"];this._config.compact&&H.push("compact"),this._config.animate||H.push("no-animation"),this._hass.themes?.darkMode&&H.push("dark");let V=H.join(" ");this._wrap.className!==V&&(this._wrap.className=V);let e=C.on?C.mode==="effect"?C.palette[Math.floor(C.palette.length/2)]:C.mode==="white"?C.kelvinCss:C.hs?.css||"var(--primary-color, #03a9f4)":"var(--state-icon-color, #8a9199)";this._wrap.style.getPropertyValue("--ap-accent")!==e&&this._wrap.style.setProperty("--ap-accent",e)}_topHtml(C,H){let V=[];return C.available?(C.brightnessPct!==null&&C.on&&V.push(`<span>${s("brightness")}<b>${C.brightnessPct}%</b></span>`),this._config.show_touch&&C.gesture&&V.push(`<span>${s("touch")}<b>${a(H(`gesture.${C.gesture.type}`,C.gesture.type))}</b></span>`),this._headerHtml(C,V.join(""))):this._headerHtml(C,"")}_headerHtml(C,H){return`
      <div class="top">
        <div>
          <div class="name" data-action="more-info">${a(C.name)}</div>
          ${C.model?`<div class="sub">${a(C.model)}</div>`:""}
        </div>
        <div class="spacer"></div>
        <div class="ind">${H}</div>
      </div>`}_heroSection(C,H){let V=JSON.stringify(this._layout);V!==this._layoutKey&&(this._layoutKey=V,this._sections.hero.innerHTML=`
        <div class="hero">
          <div class="art" data-action="toggle">${X6(this._uid,this._layout)}</div>
          <div class="status"></div>
        </div>`,this._heroNode=this._sections.hero.querySelector(".hero"),this._statusNode=this._sections.hero.querySelector(".status"),this._signatures.status=null);let e=this._config.show_art,{width:t,height:r}=a3(this._layout);this._heroNode.classList.toggle("wide",e&&t/r>=D6),this._heroNode.classList.toggle("no-art",!e);let i=this._sections.hero.querySelector(".art");i.hidden=!e,e&&J6(i.querySelector(".panels"),C);let o=Q6(C),M=q6(C),n=`
      <div class="mode-name">${a(H(`mode.${C.mode}`))}</div>
      <div class="state">${a(L3(H(o.key),o))}</div>
      <div class="state-sub">${a(M.key?L3(H(M.key),M):"")}</div>
      ${this._seg(C,H)}`;this._signatures.status!==n&&(this._signatures.status=n,this._statusNode.innerHTML=n)}_seg(C,H){let V=(e,t,r,i)=>`
      <button type="button" data-action="power" data-value="${e}" aria-pressed="${i}"
        ${C.available?"":"disabled"}>${s(t)}<span>${a(r)}</span></button>`;return`<div class="seg">
      ${V("off","power",H("power.off"),C.available&&!C.on)}
      ${V("on","bulb",H("power.on"),C.on)}
    </div>`}_brightHtml(C,H){let V=C.brightnessPct??0;return`
      <div class="bright">
        ${s("brightness")}
        <input type="range" min="1" max="100" step="1" value="${V}"
          data-action="brightness" aria-label="${a(H("ui.brightness"))}"
          ${C.on?"":"disabled"}>
        <span class="val">${C.on?`${V}%`:"\u2013"}</span>
      </div>`}_scenesHtml(C,H){if(!C.effects.length)return"";let V=C.effects.map(e=>{let t=t3(e),r=r3(e),i=`linear-gradient(135deg, ${t.join(", ")})`;return`
        <button type="button" class="scene-chip${r?"":" unknown"}"
          data-action="effect" data-value="${a(e)}"
          aria-pressed="${C.effect===e}" ${C.available?"":"disabled"}
          ${r?"":`title="${a(H("ui.unknown_effect"))}"`}>
          <span class="swatch" style="background:${i}"></span>${a(e)}
        </button>`}).join("");return`<div class="section">
      <div class="section-title">${a(H("ui.effects"))}</div>
      <div class="scenes">${V}</div>
    </div>`}_whitesHtml(C,H){let V=F6.filter(t=>t>=C.kelvinMin&&t<=C.kelvinMax);if(!V.length)return"";let e=V.map(t=>`
        <button type="button" class="white-chip" data-action="kelvin" data-value="${t}"
          style="background:${i3(t)}"
          aria-pressed="${C.mode==="white"&&C.kelvin===t}"
          ${C.available?"":"disabled"}
          aria-label="${t} K" title="${t} K"></button>`).join("");return`<div class="whites"><span class="cap">${a(H("ui.white"))}</span>${e}</div>`}_buttonsHtml(C,H){let V=[];if(V.push(`
      <button type="button" class="ghost" data-action="more-info" data-entity="${a(C.entityId)}">
        ${s("palette")}${a(H("ui.open_colour"))}
      </button>`),this._config.show_identify&&C.entities.identify&&V.push(`
        <button type="button" class="ghost" data-action="identify" ${C.available?"":"disabled"}>
          ${s("sparkle")}${a(H("ui.identify"))}
        </button>`),this._config.show_touch&&C.touchable){let e=C.gesture?`<b>${a(H(`gesture.${C.gesture.type}`,C.gesture.type))}</b> \xB7 ${a(W(C.gesture.secondsAgo,H("ui.minute_short"),H("ui.hour_short")))}`:a(H("ui.touch_never"));V.push(`
        <span class="touch" data-action="more-info" data-entity="${a(C.entities.touch||"")}">
          ${s("touch")}${e}
        </span>`)}return`<div class="btnrow">${V.join("")}</div>`}_onInput(C){let H=C.target.closest('[data-action="brightness"]');if(!H||H.hasAttribute("disabled"))return;let V=Number(H.value),e=H.parentElement.querySelector(".val");e&&(e.textContent=`${V}%`),clearTimeout(this._brightTimer),this._brightTimer=setTimeout(()=>{this._haptic("light"),this._call("turn_on",{brightness:Math.round(V/100*255)})},220)}_onClick(C){let H=C.target.closest("[data-action]");if(!H||H.hasAttribute("disabled"))return;let{action:V,entity:e,value:t}=H.dataset,r=this._model;if(!(!r?.ok&&V!=="more-info"))switch(V){case"more-info":this._moreInfo(e||r?.entityId);break;case"toggle":case"power":{let i=V==="toggle"?!r.on:t==="on";this._haptic(i?"light":"medium"),this._call(i?"turn_on":"turn_off",{});break}case"effect":this._haptic("light"),this._call("turn_on",{effect:t});break;case"kelvin":this._haptic("light"),this._call("turn_on",{color_temp_kelvin:Number(t)});break;case"identify":this._haptic("medium"),this._hass.callService("button","press",{entity_id:r.entities.identify});break;default:break}}_call(C,H){let V=this._model;return V?.entityId?this._hass.callService("light",C,{entity_id:V.entityId,...H}):Promise.resolve()}_moreInfo(C){C&&this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:C},bubbles:!0,composed:!0}))}_haptic(C){this.dispatchEvent(new CustomEvent("haptic",{detail:C,bubbles:!0,composed:!0}))}};function V8(){customElements.get(o1)||(customElements.define(o1,o3),window.customCards=window.customCards||[],window.customCards.push({type:o1,name:"Nanoleaf Shapes Card",description:"Card for Nanoleaf Shapes: the panels drawn in their own arrangement and lit by what is running on them, scenes as colour swatches, brightness, white presets and the last touch gesture.",preview:!0,documentationURL:"https://github.com/gabor-io/ha-appliance-custom-card"}),console.info(`%c ${o1} %c ${B6} `,"color:#fff;background:#7c4dff;font-weight:700;border-radius:3px 0 0 3px","color:#7c4dff;background:#ede7f6;font-weight:700;border-radius:0 3px 3px 0"))}var pH=R({cardName:o1,toggles:["show_art","show_brightness","show_effects","show_white","show_touch","show_identify","compact","animate"],defaults:M3,listDevices:W2,getLanguage:D2,translator:I2,languages:e3});function e8(){customElements.get(J1)||customElements.define(J1,pH)}e8();V8();
