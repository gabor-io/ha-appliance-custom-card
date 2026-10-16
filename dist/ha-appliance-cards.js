/*! ha-appliance-cards v1.10.0 - https://github.com/gabor-io/ha-appliance-custom-card - MIT licence */
var z="aeg-dishwasher-card",n1="aeg-dishwasher-card-editor",D2="1.10.0",p={OFF:"OFF",IDLE:"IDLE",READY_TO_START:"READY_TO_START",DELAYED_START:"DELAYED_START",RUNNING:"RUNNING",PAUSED:"PAUSED",END_OF_CYCLE:"END_OF_CYCLE",ALARM:"ALARM",UNKNOWN:"UNKNOWN"},N2={[p.OFF]:"idle",[p.IDLE]:"idle",[p.READY_TO_START]:"ready",[p.DELAYED_START]:"delayed",[p.RUNNING]:"running",[p.PAUSED]:"paused",[p.END_OF_CYCLE]:"done",[p.ALARM]:"alarm",[p.UNKNOWN]:"idle"},q={PREWASH:"PREWASH",MAINWASH:"MAINWASH",COLDRINSE:"COLDRINSE",HOTRINSE:"HOTRINSE",EXTRARINSE:"EXTRARINSE",DRYING:"DRYING",ADO_DRYING:"ADO_DRYING",UNAVAILABLE:"UNAVAILABLE"},L2=["PREWASH","MAINWASH","RINSE","DRYING"],$2={[q.PREWASH]:"PREWASH",[q.MAINWASH]:"MAINWASH",[q.COLDRINSE]:"RINSE",[q.HOTRINSE]:"RINSE",[q.EXTRARINSE]:"RINSE",[q.DRYING]:"DRYING",[q.ADO_DRYING]:"DRYING"},k={ECO:{icon:"leaf",water:8.4,energy:.488,duration:310,steps:["PREWASH","MAINWASH","RINSE","DRYING"]},AUTO:{icon:"auto",water:12.5,energy:1,duration:180,steps:["PREWASH","MAINWASH","RINSE","DRYING"]},QUICK30:{icon:"quick",water:8.5,energy:.475,duration:30,steps:["MAINWASH","RINSE"]},QUICK60:{icon:"clock",water:10.5,energy:1,duration:60,steps:["MAINWASH","RINSE","DRYING"]},NORMAL90:{icon:"clock",water:10.5,energy:1,duration:90,steps:["MAINWASH","RINSE","DRYING"]},"120_MIN":{icon:"clock",water:10.5,energy:.9,duration:120,steps:["MAINWASH","RINSE","DRYING"]},RINSE:{icon:"rinse",water:4,energy:.15,duration:15,steps:["PREWASH"],scores:!1},MACHINE_CARE:{icon:"care",water:10,energy:.575,duration:60,steps:["MAINWASH","RINSE","DRYING"],scores:!1}},e2=["ECO","AUTO","QUICK30","QUICK60","NORMAL90","120_MIN","RINSE","MACHINE_CARE"],I2=[{key:"xtra_dry",entity:"xtra_dry_option",icon:"dry",programs:["ECO","QUICK60","NORMAL90","120_MIN"]},{key:"extra_power",entity:"extra_power_option",icon:"power",programs:["QUICK30","QUICK60","NORMAL90","120_MIN"]},{key:"extra_silent",entity:"extra_silent_option",icon:"silent",programs:["ECO","NORMAL90","120_MIN"]},{key:"glass_care",entity:"glass_care_option",icon:"glass",programs:["QUICK30","QUICK60","NORMAL90","120_MIN"]},{key:"sanitize",entity:"sanitize_option",icon:"sanitize",programs:["QUICK30","QUICK60","NORMAL90","120_MIN"]},{key:"spray_zone",entity:"spray_zone_option",icon:"spray",programs:["QUICK30","QUICK60","NORMAL90","120_MIN"]},{key:"zone_clean",entity:"zone_clean_option",icon:"zone",programs:["QUICK30","QUICK60","NORMAL90","120_MIN"]},{key:"one_rack",entity:"one_rack_option",icon:"rack",programs:["QUICK30","QUICK60"]},{key:"auto_door_opener",entity:"auto_door_opener",icon:"door",programs:null}],z2={[p.OFF]:["on"],[p.IDLE]:["start","off"],[p.READY_TO_START]:["start","off"],[p.DELAYED_START]:["stopreset"],[p.RUNNING]:["pause"],[p.PAUSED]:["resume","stopreset"],[p.END_OF_CYCLE]:["stopreset","off"],[p.ALARM]:["stopreset","off"],[p.UNKNOWN]:[]},W2={on:{icon:"power",style:"ghost"},off:{icon:"power",style:"ghost"},start:{icon:"play",style:"primary"},pause:{icon:"pause",style:"primary"},resume:{icon:"play",style:"primary"},stopreset:{icon:"stop",style:"ghost"}},r2={DISH_ALARM_SALT_MISSING:"warning",DISH_ALARM_RINSE_AID_LOW:"warning",DISH_ALARM_I10:"error",DISH_ALARM_I11:"error",DISH_ALARM_I20:"error",DISH_ALARM_I30:"error",DISH_ALARM_I41:"error",DISH_ALARM_I43:"error",DISH_ALARM_I44:"error",DISH_ALARM_IF1:"error"},G2=[60,120,180,240,360,480,720],X=10,J=1440;function E(e,C,H){let V=e?.language&&e.language!=="auto"?e.language:null,L=(C?.locale?.language||C?.language||"en").slice(0,2).toLowerCase(),r=V||L;return H.includes(r)?r:"en"}function R(e,C,H="en"){let V=e[C]||e[H],L=e[H],r=(t,M)=>M.split(".").reduce((a,o)=>a?a[o]:void 0,t);return(t,M="")=>{let a=r(V,t);if(a!==void 0)return a;let o=r(L,t);return o!==void 0?o:M}}var G7={card_name:"Mosogat\xF3g\xE9p",state:{OFF:"Kikapcsolva",IDLE:"K\xE9szenl\xE9tben",READY_TO_START:"Ind\xEDt\xE1sra k\xE9sz",DELAYED_START:"K\xE9sleltetett ind\xEDt\xE1s",RUNNING:"Program fut",PAUSED:"Sz\xFCneteltetve",END_OF_CYCLE:"Elk\xE9sz\xFClt",ALARM:"Hiba",UNKNOWN:"Ismeretlen"},phase:{PREWASH:"El\u0151mos\xE1s",MAINWASH:"Mosogat\xE1s",RINSE:"\xD6bl\xEDt\xE9s",DRYING:"Sz\xE1r\xEDt\xE1s",UNAVAILABLE:"\u2013"},phase_long:{PREWASH:"El\u0151mos\xE1s",MAINWASH:"Mosogat\xE1s",COLDRINSE:"Hideg \xF6bl\xEDt\xE9s",HOTRINSE:"Meleg \xF6bl\xEDt\xE9s",EXTRARINSE:"Extra \xF6bl\xEDt\xE9s",DRYING:"Sz\xE1r\xEDt\xE1s",ADO_DRYING:"AirDry sz\xE1r\xEDt\xE1s",UNAVAILABLE:"Nincs fut\xF3 f\xE1zis"},program:{ECO:"Eco",AUTO:"Auto",QUICK30:"Quick 30",QUICK60:"1h00m",NORMAL90:"1h30m","120_MIN":"2h00m",RINSE:"\xD6bl\xEDt\xE9s \xE9s v\xE1rakoz\xE1s",MACHINE_CARE:"G\xE9p\xE1pol\xE1s"},program_hint:{ECO:"Norm\xE1l szennyezetts\xE9g, a leghat\xE9konyabb v\xEDz- \xE9s energiafogyaszt\xE1s.",AUTO:"B\xE1rmilyen szennyezetts\xE9g, a g\xE9p m\xE9ri a t\xF6ltetet \xE9s a koszt.",QUICK30:"Friss szennyez\u0151d\xE9s, sz\xE1r\xEDt\xE1si f\xE1zis n\xE9lk\xFCl.",QUICK60:"Friss, enyh\xE9n r\xE1sz\xE1radt szennyez\u0151d\xE9s.",NORMAL90:"Norm\xE1l, enyh\xE9n r\xE1sz\xE1radt szennyez\u0151d\xE9s, l\xE1basokhoz is.","120_MIN":"Norm\xE1l, r\xE1sz\xE1radt szennyez\u0151d\xE9s, l\xE1basokhoz \xE9s serpeny\u0151kh\xF6z.",RINSE:"Felfriss\xEDti a k\xE9s\u0151bb mosand\xF3 ed\xE9nyeket. Mos\xF3szer n\xE9lk\xFCl!",MACHINE_CARE:"A g\xE9p belsej\xE9nek tiszt\xEDt\xE1sa v\xEDzk\u0151 \xE9s zs\xEDr ellen."},option:{xtra_dry:"ExtraDry",extra_power:"ExtraPower",extra_silent:"ExtraSilent",glass_care:"GlassCare",sanitize:"Fert\u0151tlen\xEDt\xE9s",spray_zone:"SprayZone",zone_clean:"ZoneClean",one_rack:"Egy kos\xE1r",auto_door_opener:"AutoOpen ajt\xF3"},option_hint:{xtra_dry:"Intenz\xEDvebb sz\xE1r\xEDt\xE1s a program v\xE9g\xE9n.",extra_power:"Er\u0151sebb mosogat\xE1s makacs szennyez\u0151d\xE9shez.",extra_silent:"Halkabb m\u0171k\xF6d\xE9s, hosszabb program.",glass_care:"\xDCveg\xE1rut k\xEDm\xE9l\u0151, max. 45 \xB0C.",sanitize:"Extra fert\u0151tlen\xEDt\u0151 \xF6bl\xEDt\xE9s.",spray_zone:"F\xF3kusz\xE1lt v\xEDzsug\xE1r az als\xF3 kos\xE1rban.",zone_clean:"Als\xF3 kos\xE1r er\u0151s, fels\u0151 kos\xE1r k\xEDm\xE9l\u0151 mos\xE1s.",one_rack:"Csak az egyik kos\xE1r mos\xE1sa.",auto_door_opener:"A ciklus v\xE9g\xE9n automatikusan kinyitja az ajt\xF3t."},command:{on:"Bekapcsol\xE1s",off:"Kikapcsol\xE1s",start:"Ind\xEDt\xE1s",pause:"Sz\xFCnet",resume:"Folytat\xE1s",stopreset:"Le\xE1ll\xEDt\xE1s"},alert:{DISH_ALARM_SALT_MISSING:"A s\xF3tart\xE1lyt fel kell t\xF6lteni",DISH_ALARM_RINSE_AID_LOW:"Az \xF6bl\xEDt\u0151szer-adagol\xF3 ki\xFCr\xFClt",DISH_ALARM_I10:"i10 \u2013 a k\xE9sz\xFCl\xE9k nem t\xF6lt be vizet. Ellen\u0151rizze a v\xEDzcsapot \xE9s a sz\u0171r\u0151t.",DISH_ALARM_I11:"i11 \u2013 a k\xE9sz\xFCl\xE9k nem t\xF6lt be vizet. Ellen\u0151rizze a v\xEDzcsapot \xE9s a sz\u0171r\u0151t.",DISH_ALARM_I20:"i20 \u2013 a k\xE9sz\xFCl\xE9k nem ereszti le a vizet. Ellen\u0151rizze a szifont \xE9s a sz\u0171r\u0151ket.",DISH_ALARM_I30:"i30 \u2013 a t\xFAlcsordul\xE1sg\xE1tl\xF3 bekapcsolt. Z\xE1rja el a v\xEDzcsapot!",DISH_ALARM_IF1:"iF1 \u2013 t\xFAl magas a v\xEDzszint a k\xE9sz\xFCl\xE9kben."},alert_generic:"Riaszt\xE1s",ui:{remaining:"H\xE1tral\xE9v\u0151 id\u0151",ready_at:"Elk\xE9sz\xFCl",starts_at:"Indul",start_in:"Ind\xEDt\xE1s eddig",door:"Ajt\xF3",door_open:"Az ajt\xF3 nyitva",door_closed:"Ajt\xF3 z\xE1rva",program:"Program",options:"Kieg\xE9sz\xEDt\u0151 funkci\xF3k",no_options:"Ehhez a programhoz nincs v\xE1laszthat\xF3 funkci\xF3.",delay:"K\xE9sleltetett ind\xEDt\xE1s",delay_off:"Nincs",delay_cancel:"T\xF6rl\xE9s",delay_amount:"K\xE9sleltet\xE9s",ready_by:"Legyen k\xE9sz",ready_by_hint:"Add meg, mikorra legyen k\xE9sz, majd nyomd meg a pip\xE1t \u2013 a k\xE1rtya kisz\xE1molja a k\xE9sleltet\xE9st, 10 percre lefel\xE9 kerek\xEDtve.",ready_by_apply:"K\xE9sleltet\xE9s kisz\xE1m\xEDt\xE1sa",ready_by_too_soon:"Ennyi id\u0151 alatt nem f\xE9r bele, a legkor\xE1bbi befejez\xE9s",ready_by_max:"A g\xE9p legfeljebb 24 \xF3ra k\xE9sleltet\xE9st fogad el, ennyire \xE1ll\xEDtottam",ready_by_set:"K\xE9sleltet\xE9s be\xE1ll\xEDtva",scores:"Hat\xE9konys\xE1g",scores_updating:"friss\xFCl\u2026",eco_score:"Eco",energy_score:"Energia",water_score:"V\xEDz",consumption:"V\xE1rhat\xF3 fogyaszt\xE1s",water:"V\xEDz",energy:"Energia",duration:"Id\u0151tartam",details:"R\xE9szletek",appliance_settings:"K\xE9sz\xFCl\xE9k be\xE1ll\xEDt\xE1sok",brightness:"Kijelz\u0151 f\xE9nyereje",floor_light:"TimeOnFloor",floor_light_hint:"A h\xE1tral\xE9v\u0151 id\u0151t a padl\xF3ra vet\xEDti.",end_sound:"Befejez\xE9s hangja",end_sound_hint:"Hangjelz\xE9s a program v\xE9g\xE9n.",key_tone:"Gombhangok",key_tone_hint:"A kezel\u0151panel gombjainak hangja.",brightness_hint:"A k\xE9sz\xFCl\xE9k kijelz\u0151j\xE9nek f\xE9nyereje (0\u20139).",remote:"T\xE1vvez\xE9rl\xE9s",remote_on:"Enged\xE9lyezve",remote_off:"Tiltva",remote_locked:"Ideiglenesen z\xE1rolva",cycles:"Lefutott ciklusok",wifi:"Wi-Fi jel",eco_mode:"Eco m\xF3d",rinse_aid:"\xD6bl\xEDt\u0151szer szintje",water_hardness:"V\xEDzkem\xE9nys\xE9g",offline:"Nincs kapcsolat a k\xE9sz\xFCl\xE9kkel",unavailable:"A k\xE9sz\xFCl\xE9k entit\xE1sai nem \xE9rhet\u0151k el",not_configured:"Nem tal\xE1lhat\xF3 Electrolux mosogat\xF3g\xE9p. Add meg a device vagy a prefix be\xE1ll\xEDt\xE1st a k\xE1rtya konfigur\xE1ci\xF3j\xE1ban.",remote_disabled_hint:"A vez\xE9rl\xE9shez enged\xE9lyezd a t\xE1vind\xEDt\xE1st a k\xE9sz\xFCl\xE9ken.",minute_short:"p",hour_short:"\xF3",finished:"A mosogat\xE1s elk\xE9sz\xFClt",finished_hint:"Kipakolhat\xF3",more:"T\xF6bb",less:"Kevesebb",just_now:"kevesebb mint egy perc"},editor:{device:"K\xE9sz\xFCl\xE9k",device_auto:"Automatikus felismer\xE9s",name:"N\xE9v",language:"Nyelv",language_auto:"Automatikus (HA nyelve)",sections:"Megjelen\xEDtett r\xE9szek",show_programs:"Programv\xE1laszt\xF3",show_options:"Kieg\xE9sz\xEDt\u0151 funkci\xF3k",show_delay:"K\xE9sleltetett ind\xEDt\xE1s",show_scores:"Hat\xE9konys\xE1gi pontok",show_consumption:"Fogyaszt\xE1si adatok",show_appliance_settings:"K\xE9sz\xFCl\xE9k be\xE1ll\xEDt\xE1sok",show_details:"R\xE9szletek",show_controls:"Vez\xE9rl\u0151gombok",compact:"Kompakt n\xE9zet",animate:"Anim\xE1ci\xF3k"}},U7={card_name:"Dishwasher",state:{OFF:"Off",IDLE:"Idle",READY_TO_START:"Ready to start",DELAYED_START:"Delayed start",RUNNING:"Running",PAUSED:"Paused",END_OF_CYCLE:"Finished",ALARM:"Fault",UNKNOWN:"Unknown"},phase:{PREWASH:"Prewash",MAINWASH:"Main wash",RINSE:"Rinse",DRYING:"Drying",UNAVAILABLE:"\u2013"},phase_long:{PREWASH:"Prewash",MAINWASH:"Main wash",COLDRINSE:"Cold rinse",HOTRINSE:"Hot rinse",EXTRARINSE:"Extra rinse",DRYING:"Drying",ADO_DRYING:"AirDry drying",UNAVAILABLE:"No active phase"},program:{ECO:"Eco",AUTO:"Auto",QUICK30:"Quick 30",QUICK60:"1h00m",NORMAL90:"1h30m","120_MIN":"2h00m",RINSE:"Rinse & Hold",MACHINE_CARE:"MachineCare"},program_hint:{ECO:"Normally soiled load, most efficient water and energy use.",AUTO:"Any soil level, the machine senses load and soiling.",QUICK30:"Freshly soiled load, no drying phase.",QUICK60:"Fresh, lightly dried-on soiling.",NORMAL90:"Normal, lightly dried-on soiling, pots included.","120_MIN":"Normal, dried-on soiling, pots and pans.",RINSE:"Refreshes dishes waiting for a full cycle. No detergent!",MACHINE_CARE:"Cleans the inside of the machine from limescale and grease."},option:{xtra_dry:"ExtraDry",extra_power:"ExtraPower",extra_silent:"ExtraSilent",glass_care:"GlassCare",sanitize:"Sanitize",spray_zone:"SprayZone",zone_clean:"ZoneClean",one_rack:"One rack",auto_door_opener:"AutoOpen door"},option_hint:{xtra_dry:"Stronger drying at the end of the program.",extra_power:"More powerful wash for stubborn soiling.",extra_silent:"Quieter operation, longer program.",glass_care:"Protects glassware, max. 45 \xB0C.",sanitize:"Extra sanitising rinse.",spray_zone:"Focused spray in the lower basket.",zone_clean:"Intensive lower basket, gentle upper basket.",one_rack:"Washes a single basket only.",auto_door_opener:"Opens the door automatically at the end of the cycle."},command:{on:"Turn on",off:"Turn off",start:"Start",pause:"Pause",resume:"Resume",stopreset:"Stop"},alert:{DISH_ALARM_SALT_MISSING:"Salt container needs refilling",DISH_ALARM_RINSE_AID_LOW:"Rinse aid dispenser is empty",DISH_ALARM_I10:"i10 \u2013 the appliance does not fill with water. Check the tap and the filter.",DISH_ALARM_I11:"i11 \u2013 the appliance does not fill with water. Check the tap and the filter.",DISH_ALARM_I20:"i20 \u2013 the appliance does not drain. Check the siphon and the filters.",DISH_ALARM_I30:"i30 \u2013 anti-flood device triggered. Close the water tap!",DISH_ALARM_IF1:"iF1 \u2013 water level inside the appliance is too high."},alert_generic:"Alert",ui:{remaining:"Remaining",ready_at:"Ready at",starts_at:"Starts at",start_in:"Start in",door:"Door",door_open:"Door is open",door_closed:"Door closed",program:"Program",options:"Options",no_options:"This program has no selectable options.",delay:"Delayed start",delay_off:"None",delay_cancel:"Cancel",delay_amount:"Delay",ready_by:"Ready by",ready_by_hint:"Pick when it should be done and press the tick - the card works out the delay, rounded down to 10 minutes.",ready_by_apply:"Work out the delay",ready_by_too_soon:"That is too soon, the earliest finish is",ready_by_max:"The appliance accepts at most 24 hours, so it was set to that",ready_by_set:"Delay set",scores:"Efficiency",scores_updating:"updating\u2026",eco_score:"Eco",energy_score:"Energy",water_score:"Water",consumption:"Estimated use",water:"Water",energy:"Energy",duration:"Duration",details:"Details",appliance_settings:"Appliance settings",brightness:"Display brightness",floor_light:"TimeOnFloor",floor_light_hint:"Projects the remaining time onto the floor.",end_sound:"End of cycle sound",end_sound_hint:"Beeps when the program finishes.",key_tone:"Key tone",key_tone_hint:"Sound of the control panel buttons.",brightness_hint:"Brightness of the appliance display (0-9).",remote:"Remote control",remote_on:"Enabled",remote_off:"Disabled",remote_locked:"Temporarily locked",cycles:"Total cycles",wifi:"Wi-Fi signal",eco_mode:"Eco mode",rinse_aid:"Rinse aid level",water_hardness:"Water hardness",offline:"The appliance is offline",unavailable:"The appliance entities are unavailable",not_configured:"No Electrolux dishwasher found. Set the device or prefix option in the card configuration.",remote_disabled_hint:"Enable remote start on the appliance to control it.",minute_short:"m",hour_short:"h",finished:"The cycle has finished",finished_hint:"Ready to unload",more:"More",less:"Less",just_now:"less than a minute"},editor:{device:"Device",device_auto:"Auto detect",name:"Name",language:"Language",language_auto:"Automatic (HA language)",sections:"Visible sections",show_programs:"Program picker",show_options:"Options",show_delay:"Delayed start",show_scores:"Efficiency scores",show_consumption:"Consumption figures",show_appliance_settings:"Appliance settings",show_details:"Details",show_controls:"Control buttons",compact:"Compact layout",animate:"Animations"}},U2={hu:G7,en:U7},t2=Object.keys(U2);function O1(e,C){return E(e,C,t2)}function k1(e){return R(U2,e)}function g(e){return e==null?"":String(e).toUpperCase().replace(/[\s\-.]+/g,"_").replace(/_+/g,"_")}function h(e){return!e||e.state==="unavailable"||e.state==="unknown"}function Q7(e){if(!e.length)return null;let C=e[0];for(let H of e.slice(1)){let V=0;for(;V<C.length&&V<H.length&&C[V]===H[V];)V+=1;C=C.slice(0,V)}return C.replace(/_+$/,"")||null}function b1(e,C,H){if(C?.prefix)return C.prefix;let V=new RegExp(`^${H.domain}\\..+_${H.suffix}$`),L=M=>M.replace(new RegExp(`^${H.domain}\\.`),"").replace(new RegExp(`_${H.suffix}$`),"");if(C?.device&&e?.entities){let M=Object.values(e.entities).find(o=>o.device_id===C.device&&V.test(o.entity_id));if(M)return L(M.entity_id);let a=Object.values(e.entities).filter(o=>o.device_id===C.device).map(o=>o.entity_id.split(".")[1]);if(a.length)return Q7(a)}let r=C?.entities?.[H.key];if(r)return L(r);let t=Object.keys(e?.states||{}).filter(M=>V.test(M));return t.length===1?L(t[0]):null}function w1(e,C,H,V){let L=C?.entities||{},r={};for(let t of new Set([...Object.keys(H),...Object.keys(L)])){let M=L[t];if(M){r[t]=M;continue}let a=H[t];if(!a||!V)continue;let o=`${a[0]}.${V}_${a[1]}`;e?.states?.[o]&&(r[t]=o)}return r}function T1(e,C){if(!e?.entities||!e?.devices)return[];let H=new RegExp(`^${C.domain}\\..+_${C.suffix}$`),V=new Map;for(let L of Object.values(e.entities)){if(!L.device_id||!H.test(L.entity_id))continue;let r=e.devices[L.device_id];r&&V.set(L.device_id,r.name_by_user||r.name||L.device_id)}return[...V.entries()].map(([L,r])=>({id:L,name:r}))}var Q2={domain:"sensor",suffix:"appliance_state",key:"appliance_state"},K7={appliance_state:["sensor","appliance_state"],cycle_phase:["sensor","cycle_phase"],time_to_end:["sensor","time_to_end"],alerts:["sensor","alerts"],eco_score:["sensor","eco_score"],energy_score:["sensor","energy_score"],water_score:["sensor","water_score"],total_cycle_counter:["sensor","total_cycle_counter"],remote_control:["sensor","remote_control"],link_quality:["sensor","network_interface_link_quality_indicator"],door_state:["binary_sensor","door_state"],connectivity:["binary_sensor","connectivity_state"],eco_mode:["binary_sensor","miscellaneous_state_eco_mode"],program:["select","program_uid"],water_hardness:["select","water_hardness"],display_light:["select","display_light"],display_on_floor:["select","display_on_floor"],end_of_cycle_sound:["select","end_of_cycle_sound"],key_tone:["switch","key_tone"],start_time:["number","start_time"],rinse_aid_level:["number","rinse_aid_level"],cmd_on:["button","execute_command_on"],cmd_off:["button","execute_command_off"],cmd_start:["button","execute_command_start"],cmd_pause:["button","execute_command_pause"],cmd_resume:["button","execute_command_resume"],cmd_stopreset:["button","execute_command_stopreset"]},j7=["xtra_dry_option","extra_power_option","extra_silent_option","glass_care_option","sanitize_option","spray_zone_option","zone_clean_option","one_rack_option","auto_door_opener"];function Y7(e,C){return b1(e,C,Q2)}function K2(e,C){let H=Y7(e,C),V=w1(e,C,K7,H);if(V.options={},H)for(let L of j7){let r=`switch.${H}_${L}`;e?.states?.[r]&&(V.options[L]=r)}return V.prefix=H,V}function E1(e){return T1(e,Q2)}var X2="aeg-dishwasher-card:progress";function C1(e){if(h(e))return null;let C=Number(e.state);return Number.isFinite(C)?C:null}function q7(e){let C=C1(e);if(C===null||C<0)return null;let H=(e.attributes?.unit_of_measurement||"").toLowerCase();return H==="s"||H==="sec"||H==="seconds"?Math.round(C/60):H==="h"?Math.round(C*60):H?Math.round(C):C>1e3?Math.round(C/60):Math.round(C)}var j2=["NONE","OFF","OK","0","UNKNOWN","UNAVAILABLE"];function X7(e){if(h(e))return[];let C=e.attributes||{},H=Object.entries(C).filter(([M,a])=>/^[A-Z][A-Z0-9_]*$/.test(M)&&typeof a=="string").filter(([,M])=>!j2.includes(g(M).split("-")[0])).map(([M,a])=>({code:g(M),severity:g(String(a).split("-")[0])}));if(H.length)return H;let V=C.alerts??C.alert_list??e.state,L=[];Array.isArray(V)?L=V.map(M=>typeof M=="string"?M:M?.code):typeof V=="string"&&!/^\d+$/.test(V.trim())&&(L=V.split(/[,;]/));let r=L.map(M=>g(M)).filter(M=>M&&!j2.includes(M)).map(M=>({code:M,severity:""}));if(r.length)return r;let t=Number(e.state);return Number.isFinite(t)&&t>0?[{code:"",severity:"",count:t}]:[]}function J7(e){if(!e)return null;let C=e.attributes||{},H=String(C.unit_of_measurement||"").toLowerCase(),V=Number.isFinite(C.max)?C.max:1440,L=H==="s"||H==="sec"||H==="seconds"||!H&&V>5e3,r=C1(e);return{raw:r,seconds:L,step:Number.isFinite(C.step)?C.step:L?60:1,min:Number.isFinite(C.min)?C.min:-1,max:V,maxMinutes:L?Math.round(V/60):V,minutes:r===null||r<=0?0:L?Math.round(r/60):r}}function C4(){try{return JSON.parse(window.localStorage.getItem(X2)||"{}")}catch{return{}}}function Y2(e){try{window.localStorage.setItem(X2,JSON.stringify(e))}catch{}}function H4(e,C,H,V){let L=H===p.RUNNING||H===p.PAUSED,r=C4(),t=r[e];if(!L)return t&&H!==p.DELAYED_START&&(delete r[e],Y2(r)),{progress:H===p.END_OF_CYCLE?1:0,total:null};if(V===null)return{progress:0,total:null};let M=k[C]?.duration||0,a=t&&t.program===C,o=Math.max(V,M,a?t.total:0);return(!a||o!==t.total)&&(r[e]={program:C,total:o},Y2(r)),{progress:o?Math.min(1,Math.max(0,1-V/o)):0,total:o}}function q2(e,C){if(h(e))return null;let H=e.attributes?.options||[],V=t=>C.includes(g(t)),L=H.find(V)||null,r=H.find(t=>!V(t))||null;return!L||!r?null:{on:!V(e.state),onOption:r,offOption:L}}function V4(e){if(h(e))return null;let C=L=>{let r=String(L).match(/(\d+)\s*$/);return r?Number(r[1]):null},H=(e.attributes?.options||[]).map(L=>({label:L,value:C(L)})).filter(L=>L.value!==null).sort((L,r)=>L.value-r.value);if(!H.length)return null;let V=H.find(L=>L.label===e.state);return{levels:H,value:V?V.value:C(e.state),min:H[0].value,max:H[H.length-1].value}}function J2(e,C){let H=K2(e,C),V=b=>H[b]?e.states[H[b]]:void 0,L=V("appliance_state");if(!H.prefix||!L)return{ok:!1,reason:H.prefix?"unavailable":"not_configured",entities:H};let r=g(L.state)in p?g(L.state):p.UNKNOWN,t=V("program"),M=g(t?.state),a=k[M]?M:null,o=g(V("cycle_phase")?.state)||"UNAVAILABLE",n=$2[o]||null,s=q7(V("time_to_end")),{progress:l}=H4(H.prefix,a,r,s),d=J7(V("start_time")),u=d?d.minutes:0,x=V("door_state"),m=x?x.state==="on":null,S=V("connectivity"),Z=S?S.state==="on":!0,_=g(V("remote_control")?.state),y=_===""||_.includes("ENABLED"),w=k[a]?.duration||0,c=s!==null&&s>0?s:null,O=null;if(r===p.RUNNING||r===p.PAUSED)O=s;else if(r===p.DELAYED_START)O=c!==null&&c>u?c:w?u+w:null;else if(r===p.IDLE||r===p.READY_TO_START){let b=c!==null?c:w||null;O=b===null?null:b+u}let D=O!==null?new Date(Date.now()+O*6e4):null,_1=u?new Date(Date.now()+u*6e4):null,y1=I2.map(b=>{let V2=H.options?.[b.entity],F2=V2?e.states[V2]:void 0;return{...b,entityId:V2,on:F2?.state==="on",exists:!!F2,supported:!b.programs||!a||b.programs.includes(a)}}).filter(b=>b.exists),Y=(t?.attributes?.options||[]).map(b=>({label:b,key:g(b)}));return{ok:!0,entities:H,state:r,accent:N2[r]||"idle",phase:o,step:n,program:a,programRaw:t?.state||null,programOptions:Y,remaining:s,minutesToFinish:O,progress:l,finishAt:D,startAt:_1,delay:u,delayControl:d,delayEntity:H.start_time,doorOpen:m,online:Z,remote:_,remoteEnabled:y,alerts:X7(V("alerts")),scores:{eco:C1(V("eco_score")),energy:C1(V("energy_score")),water:C1(V("water_score"))},cycles:C1(V("total_cycle_counter")),linkQuality:g(V("link_quality")?.state),ecoMode:V("eco_mode")?.state==="on",rinseAid:C1(V("rinse_aid_level")),waterHardness:V("water_hardness")?.state||null,settings:{brightness:V4(V("display_light")),floorLight:q2(V("display_on_floor"),["OFF"]),endSound:q2(V("end_of_cycle_sound"),["NO_SOUND","OFF"]),keyTone:H.key_tone?{on:V("key_tone")?.state==="on"}:null},options:y1,name:C.name||L.attributes?.friendly_name?.replace(/\s*Appliance state$/i,"")||null}}function C5(e,C,H,V,L){return[`M${e+L},${C}`,`H${e+H-L}`,`A${L},${L} 0 0 1 ${e+H},${C+L}`,`V${C+V-L}`,`A${L},${L} 0 0 1 ${e+H-L},${C+V}`,`H${e+L}`,`A${L},${L} 0 0 1 ${e},${C+V-L}`,`V${C+L}`,`A${L},${L} 0 0 1 ${e+L},${C}`,"Z"].join(" ")}var L4=`${C5(8,6,164,202,18)} ${C5(26,52,128,136,12)}`;function H5(){return`
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
      <path class="door-panel" d="${L4}" fill-rule="evenodd"/>
      <rect class="panel-strip" x="18" y="14" width="144" height="28" rx="10"/>
      <circle class="led-ring" cx="32" cy="28" r="7"/>
      <circle class="led" cx="32" cy="28" r="4"/>
      <rect class="display" x="60" y="19" width="60" height="18" rx="6"/>
      <text class="display-text" x="90" y="32" text-anchor="middle">--:--</text>
      <rect class="handle" x="18" y="196" width="144" height="7" rx="3.5"/>
    </g>
  </svg>`}function V5(e,C){let H=e.querySelector(".display-text");H&&H.textContent!==C&&(H.textContent=C)}var L5="M6.59,0.66C8.93,-1.15 11.47,1.06 12.04,4.5C12.47,4.5 12.89,4.62 13.27,4.84C13.79,4.24 14.25,3.42 14.07,2.5C13.65,0.35 16.06,-1.39 18.35,1.58C20.16,3.92 17.95,6.46 14.5,7.03C14.5,7.46 14.39,7.89 14.16,8.27C14.76,8.78 15.58,9.24 16.5,9.06C18.63,8.64 20.38,11.04 17.41,13.34C15.07,15.15 12.53,12.94 11.96,9.5C11.53,9.5 11.11,9.37 10.74,9.15C10.22,9.75 9.75,10.58 9.93,11.5C10.35,13.64 7.94,15.39 5.65,12.42C3.83,10.07 6.05,7.53 9.5,6.97C9.5,6.54 9.63,6.12 9.85,5.74C9.25,5.23 8.43,4.76 7.5,4.94C5.37,5.36 3.62,2.96 6.59,0.66M5,16H7A2,2 0 0,1 9,18V24H7V22H5V24H3V18A2,2 0 0,1 5,16M5,18V20H7V18H5M12.93,16H15L12.07,24H10L12.93,16M18,16H21V18H18V22H21V24H18A2,2 0 0,1 16,22V18A2,2 0 0,1 18,16Z",M2="M19,18.31V20A2,2 0 0,1 17,22H7A2,2 0 0,1 5,20V16.3C4.54,16.12 3.95,16 3,16A1,1 0 0,1 2,15A1,1 0 0,1 3,14C3.82,14 4.47,14.08 5,14.21V12.3C4.54,12.12 3.95,12 3,12A1,1 0 0,1 2,11A1,1 0 0,1 3,10C3.82,10 4.47,10.08 5,10.21V8.3C4.54,8.12 3.95,8 3,8A1,1 0 0,1 2,7A1,1 0 0,1 3,6C3.82,6 4.47,6.08 5,6.21V4A2,2 0 0,1 7,2H17A2,2 0 0,1 19,4V6.16C20.78,6.47 21.54,7.13 21.71,7.29C22.1,7.68 22.1,8.32 21.71,8.71C21.32,9.1 20.8,9.09 20.29,8.71V8.71C20.29,8.71 19.25,8 17,8C15.74,8 14.91,8.41 13.95,8.9C12.91,9.41 11.74,10 10,10C9.64,10 9.31,10 9,9.96V7.95C9.3,8 9.63,8 10,8C11.26,8 12.09,7.59 13.05,7.11C14.09,6.59 15.27,6 17,6V4H7V20H17V18C18.5,18 18.97,18.29 19,18.31M17,10C15.27,10 14.09,10.59 13.05,11.11C12.09,11.59 11.26,12 10,12C9.63,12 9.3,12 9,11.95V13.96C9.31,14 9.64,14 10,14C11.74,14 12.91,13.41 13.95,12.9C14.91,12.42 15.74,12 17,12C19.25,12 20.29,12.71 20.29,12.71V12.71C20.8,13.1 21.32,13.1 21.71,12.71C22.1,12.32 22.1,11.69 21.71,11.29C21.5,11.08 20.25,10 17,10M17,14C15.27,14 14.09,14.59 13.05,15.11C12.09,15.59 11.26,16 10,16C9.63,16 9.3,16 9,15.95V17.96C9.31,18 9.64,18 10,18C11.74,18 12.91,17.41 13.95,16.9C14.91,16.42 15.74,16 17,16C19.25,16 20.29,16.71 20.29,16.71V16.71C20.8,17.1 21.32,17.1 21.71,16.71C22.1,16.32 22.1,15.69 21.71,15.29C21.5,15.08 20.25,14 17,14Z";var e5="M13,13H11V7H13M13,17H11V15H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z";var r5="M12,2L1,21H23M12,6L19.53,19H4.47M11,10V14H13V10M11,16V18H13V16";var t5="M13,9V15H16L12,19L8,15H11V9H8L12,5L16,9H13M4,2H20V4H4V2M4,20H20V22H4V20Z";var M5="M6 14H9L5 18L1 14H4C4 11.3 5.7 6.6 11 6.1V8.1C7.6 8.6 6 11.9 6 14M20 14C20 11.3 18.3 6.6 13 6.1V8.1C16.4 8.7 18 11.9 18 14H15L19 18L23 14H20Z";var i5="M12,6V9L16,5L12,1V4A8,8 0 0,0 4,12C4,13.57 4.46,15.03 5.24,16.26L6.7,14.8C6.25,13.97 6,13 6,12A6,6 0 0,1 12,6M18.76,7.74L17.3,9.2C17.74,10.04 18,11 18,12A6,6 0 0,1 12,18V15L8,19L12,23V20A8,8 0 0,0 20,12C20,10.43 19.54,8.97 18.76,7.74Z";var a5="M9.5 18V9H8V18M12.75 18V9H11.25V18M16 18V9H14.5V18M17.03 6C18.11 6 19 6.88 19 8V19C19 20.13 18.11 21 17.03 21C17.03 21.58 16.56 22 16 22C15.5 22 15 21.58 15 21H9C9 21.58 8.5 22 8 22C7.44 22 6.97 21.58 6.97 21C5.89 21 5 20.13 5 19V8C5 6.88 5.89 6 6.97 6H9V3C9 2.42 9.46 2 10 2H14C14.54 2 15 2.42 15 3V6M10.5 3.5V6H13.5V3.5M17.03 19V8H6.97V19";var o5="M10,21H14A2,2 0 0,1 12,23A2,2 0 0,1 10,21M21,19V20H3V19L5,17V11C5,7.9 7.03,5.17 10,4.29C10,4.19 10,4.1 10,4A2,2 0 0,1 12,2A2,2 0 0,1 14,4C14,4.1 14,4.19 14,4.29C16.97,5.17 19,7.9 19,11V17L21,19M17,11A5,5 0 0,0 12,6A5,5 0 0,0 7,11V18H17V11M19.75,3.19L18.33,4.61C20.04,6.3 21,8.6 21,11H23C23,8.07 21.84,5.25 19.75,3.19M1,11H3C3,8.6 3.96,6.3 5.67,4.61L4.25,3.19C2.16,5.25 1,8.07 1,11Z";var n5="M12,18V6A6,6 0 0,1 18,12A6,6 0 0,1 12,18M20,15.31L23.31,12L20,8.69V4H15.31L12,0.69L8.69,4H4V8.69L0.69,12L4,15.31V20H8.69L12,23.31L15.31,20H20V15.31Z";var A5="M19.36,2.72L20.78,4.14L15.06,9.85C16.13,11.39 16.28,13.24 15.38,14.44L9.06,8.12C10.26,7.22 12.11,7.37 13.65,8.44L19.36,2.72M5.93,17.57C3.92,15.56 2.69,13.16 2.35,10.92L7.23,8.83L14.67,16.27L12.58,21.15C10.34,20.81 7.94,19.58 5.93,17.57Z";var d5="M6,11L7,7H17L18,11M18.92,6C18.71,5.4 18.14,5 17.5,5H6.5C5.86,5 5.29,5.4 5.08,6L3,12V20A1,1 0 0,0 4,21H5A1,1 0 0,0 6,20V18H18V20A1,1 0 0,0 19,21H20A1,1 0 0,0 21,20V12L18.92,6M7,16H5V14H7V16M19,16H17V14H19V16M14,16H10V14H14V16Z",p5="M4,3V6H1V20H23V6H20V3H14V6H10V3H4M3,8H21V18H3V8M15,10V12H13V14H15V16H17V14H19V12H17V10H15M5,12V14H11V12H5Z";var s5="M12,3C7,3 3,7 3,12C3,17 7,21 12,21C17,21 21,17 21,12C21,7 17,3 12,3M12,19C8.1,19 5,15.9 5,12C5,8.1 8.1,5 12,5C15.9,5 19,8.1 19,12C19,15.9 15.9,19 12,19M20.5,20.5C22.7,18.3 24,15.3 24,12C24,8.7 22.7,5.7 20.5,3.5L19.4,4.6C21.3,6.5 22.5,9.1 22.5,12C22.5,14.9 21.3,17.5 19.4,19.4L20.5,20.5M4.6,19.4C2.7,17.5 1.5,14.9 1.5,12C1.5,9.1 2.7,6.5 4.6,4.6L3.5,3.5C1.3,5.7 0,8.7 0,12C0,15.3 1.3,18.3 3.5,20.5L4.6,19.4M9.5,7V17H11.5V13H13.5A2,2 0 0,0 15.5,11V9A2,2 0 0,0 13.5,7H9.5M11.5,9H13.5V11H11.5V9Z";var l5="M23 8C23 4.13 19.87 1 16 1C12.47 1 9.57 3.61 9.08 7H4.5C3.84 7 3.28 7.42 3.08 8L1 14V22C1 22.55 1.45 23 2 23H3C3.55 23 4 22.55 4 22V21H16V22C16 22.55 16.45 23 17 23H18C18.55 23 19 22.55 19 22V14.32C21.36 13.19 23 10.79 23 8M4.5 8.5H9.03C9.15 10.26 9.92 11.84 11.11 13H3L4.5 8.5M4.5 18C3.67 18 3 17.33 3 16.5S3.67 15 4.5 15 6 15.67 6 16.5 5.33 18 4.5 18M15.5 18C14.67 18 14 17.33 14 16.5S14.67 15 15.5 15 17 15.67 17 16.5 16.33 18 15.5 18M16 13C14.61 13 13.44 12.5 12.47 11.53C11.5 10.56 11 9.39 11 8C11 6.64 11.5 5.46 12.47 4.5C13.44 3.5 14.61 3 16 3C17.36 3 18.54 3.5 19.5 4.5C20.5 5.46 21 6.64 21 8C21 9.39 20.5 10.56 19.5 11.53C18.54 12.5 17.36 13 16 13M16.5 8.25L19.36 9.94L18.61 11.16L15 9V4H16.5V8.25Z";var m5="M6.5 5C5.84 5 5.28 5.42 5.08 6L3 12V20A1 1 0 0 0 4 21H5A1 1 0 0 0 6 20V19H11.3A7 7 0 0 1 11 17A7 7 0 0 1 14.41 11H5L6.5 6.5H17.5L18.68 10.03A7 7 0 0 1 20.47 10.46L18.92 6C18.72 5.42 18.16 5 17.5 5H6.5M17 12C16.87 12 16.76 12.09 16.74 12.21L16.55 13.53C16.25 13.66 15.96 13.82 15.7 14L14.46 13.5C14.35 13.5 14.22 13.5 14.15 13.63L13.15 15.36C13.09 15.47 13.11 15.6 13.21 15.68L14.27 16.5C14.25 16.67 14.24 16.83 14.24 17C14.24 17.17 14.25 17.33 14.27 17.5L13.21 18.32C13.12 18.4 13.09 18.53 13.15 18.64L14.15 20.37C14.21 20.5 14.34 20.5 14.46 20.5L15.7 20C15.96 20.18 16.24 20.35 16.55 20.47L16.74 21.79C16.76 21.91 16.86 22 17 22H19C19.11 22 19.22 21.91 19.24 21.79L19.43 20.47C19.73 20.34 20 20.18 20.27 20L21.5 20.5C21.63 20.5 21.76 20.5 21.83 20.37L22.83 18.64C22.89 18.53 22.86 18.4 22.77 18.32L21.7 17.5C21.72 17.33 21.74 17.17 21.74 17C21.74 16.83 21.73 16.67 21.7 16.5L22.76 15.68C22.85 15.6 22.88 15.47 22.82 15.36L21.82 13.63C21.76 13.5 21.63 13.5 21.5 13.5L20.27 14C20 13.82 19.73 13.65 19.42 13.53L19.23 12.21C19.22 12.09 19.11 12 19 12H17M6.5 13A1.5 1.5 0 0 1 8 14.5A1.5 1.5 0 0 1 6.5 16A1.5 1.5 0 0 1 5 14.5A1.5 1.5 0 0 1 6.5 13M18 15.5C18.83 15.5 19.5 16.17 19.5 17C19.5 17.83 18.83 18.5 18 18.5C17.16 18.5 16.5 17.83 16.5 17C16.5 16.17 17.17 15.5 18 15.5Z",v5="M5,14H19L17.5,9.5H6.5L5,14M17.5,19A1.5,1.5 0 0,0 19,17.5A1.5,1.5 0 0,0 17.5,16A1.5,1.5 0 0,0 16,17.5A1.5,1.5 0 0,0 17.5,19M6.5,19A1.5,1.5 0 0,0 8,17.5A1.5,1.5 0 0,0 6.5,16A1.5,1.5 0 0,0 5,17.5A1.5,1.5 0 0,0 6.5,19M18.92,9L21,15V23A1,1 0 0,1 20,24H19A1,1 0 0,1 18,23V22H6V23A1,1 0 0,1 5,24H4A1,1 0 0,1 3,23V15L5.08,9C5.28,8.42 5.85,8 6.5,8H17.5C18.15,8 18.72,8.42 18.92,9M12,0C14.12,0 16.15,0.86 17.65,2.35L16.23,3.77C15.11,2.65 13.58,2 12,2C10.42,2 8.89,2.65 7.77,3.77L6.36,2.35C7.85,0.86 9.88,0 12,0M12,4C13.06,4 14.07,4.44 14.82,5.18L13.4,6.6C13.03,6.23 12.53,6 12,6C11.5,6 10.97,6.23 10.6,6.6L9.18,5.18C9.93,4.44 10.94,4 12,4Z",c5="M16,6L15,6.75L17.5,10H13.5V8.5H12V10H3C1.89,10 1,10.89 1,12V15H3A3,3 0 0,0 6,18A3,3 0 0,0 9,15H15A3,3 0 0,0 18,18A3,3 0 0,0 21,15H23V12C23,10.89 22.11,10 21,10H19L16,6M6,13.5A1.5,1.5 0 0,1 7.5,15A1.5,1.5 0 0,1 6,16.5A1.5,1.5 0 0,1 4.5,15A1.5,1.5 0 0,1 6,13.5M18,13.5A1.5,1.5 0 0,1 19.5,15A1.5,1.5 0 0,1 18,16.5A1.5,1.5 0 0,1 16.5,15A1.5,1.5 0 0,1 18,13.5Z";var x5="M19,14H16V16H19V14M22,21H3V11L11,3H21A1,1 0 0,1 22,4V21M11.83,5L5.83,11H20V5H11.83Z";var u5="M3,6H16L19,10H21C22.11,10 23,10.89 23,12V15H21A3,3 0 0,1 18,18A3,3 0 0,1 15,15H9A3,3 0 0,1 6,18A3,3 0 0,1 3,15H1V8C1,6.89 1.89,6 3,6M2.5,7.5V10H10.5V7.5H2.5M12,7.5V10H17.14L15.25,7.5H12M6,13.5A1.5,1.5 0 0,0 4.5,15A1.5,1.5 0 0,0 6,16.5A1.5,1.5 0 0,0 7.5,15A1.5,1.5 0 0,0 6,13.5M18,13.5A1.5,1.5 0 0,0 16.5,15A1.5,1.5 0 0,0 18,16.5A1.5,1.5 0 0,0 19.5,15A1.5,1.5 0 0,0 18,13.5Z";var Z5="M13,4.8C9,4.8 9,19.2 13,19.2C17,19.2 22,16.5 22,12C22,7.5 17,4.8 13,4.8M13.1,17.2C12.7,16.8 12,15 12,12C12,9 12.7,7.2 13.1,6.8C16,6.9 20,8.7 20,12C20,15.3 16,17.1 13.1,17.2M2,5H9.5C9.3,5.4 9,5.8 8.9,6.4C8.8,6.6 8.8,6.8 8.7,7H2V5M8,11H2V9H8.2C8.1,9.6 8.1,10.3 8,11M8.7,17C8.9,17.8 9.2,18.4 9.6,19H2.1V17H8.7M8.2,15H2V13H8C8.1,13.7 8.1,14.4 8.2,15Z";var S5="M18 15C18 17.6 16.8 19.9 14.9 21.3L14.4 20.8L12.3 18.7L13.7 17.3L14.9 18.5C15.4 17.8 15.8 16.9 15.9 16H14V14H15.9C15.7 13.1 15.4 12.3 14.9 11.5L13.7 12.7L12.3 11.3L13.5 10.1C12.8 9.6 11.9 9.2 11 9.1V11H9V9.1C8.1 9.3 7.3 9.6 6.5 10.1L9.5 13.1C9.7 13.1 9.8 13 10 13C11.11 13 12 13.9 12 15S11.11 17 10 17 8 16.11 8 15C8 14.8 8 14.7 8.1 14.5L5.1 11.5C4.6 12.2 4.2 13.1 4.1 14H6V16H4.1C4.3 16.9 4.6 17.7 5.1 18.5L6.3 17.3L7.7 18.7L5.1 21.3C3.2 19.9 2 17.6 2 15C2 10.58 5.58 7 10 7S18 10.58 18 15M23 5C23 3.34 21.66 2 20 2S17 3.34 17 5C17 6.3 17.84 7.4 19 7.82V11H21V7.82C22.16 7.4 23 6.3 23 5M20 6C19.45 6 19 5.55 19 5S19.45 4 20 4 21 4.45 21 5 20.55 6 20 6Z";var h5="M16,10L15.8,11H13.5A0.5,0.5 0 0,0 13,11.5A0.5,0.5 0 0,0 13.5,12H15.6L14.6,17H12.5A0.5,0.5 0 0,0 12,17.5A0.5,0.5 0 0,0 12.5,18H14.4L14,20A2,2 0 0,1 12,22A2,2 0 0,1 10,20L9,15H10.5A0.5,0.5 0 0,0 11,14.5A0.5,0.5 0 0,0 10.5,14H8.8L8,10C8,8.8 8.93,7.77 10.29,7.29L8.9,5.28C8.59,4.82 8.7,4.2 9.16,3.89C9.61,3.57 10.23,3.69 10.55,4.14L11,4.8V3A1,1 0 0,1 12,2A1,1 0 0,1 13,3V5.28L14.5,3.54C14.83,3.12 15.47,3.07 15.89,3.43C16.31,3.78 16.36,4.41 16,4.84L13.87,7.35C15.14,7.85 16,8.85 16,10Z";var f5="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z";var g5="M12.5,1.5C10.73,1.5 9.17,2.67 8.67,4.37C8.14,4.13 7.58,4 7,4A4,4 0 0,0 3,8C3,9.82 4.24,11.41 6,11.87V19H19V11.87C20.76,11.41 22,9.82 22,8A4,4 0 0,0 18,4C17.42,4 16.86,4.13 16.33,4.37C15.83,2.67 14.27,1.5 12.5,1.5M12,10.5H13V17.5H12V10.5M9,12.5H10V17.5H9V12.5M15,12.5H16V17.5H15V12.5M6,20V21A1,1 0 0,0 7,22H18A1,1 0 0,0 19,21V20H6Z";var _5="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z";var y5="M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z";var O5="M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z";var k5="M4,4H20A2,2 0 0,1 22,6V18A2,2 0 0,1 20,20H4A2,2 0 0,1 2,18V6A2,2 0 0,1 4,4M4,6V18H11V6H4M20,18V6H18.76C19,6.54 18.95,7.07 18.95,7.13C18.88,7.8 18.41,8.5 18.24,8.75L15.91,11.3L19.23,11.28L19.24,12.5L14.04,12.47L14,11.47C14,11.47 17.05,8.24 17.2,7.95C17.34,7.67 17.91,6 16.5,6C15.27,6.05 15.41,7.3 15.41,7.3L13.87,7.31C13.87,7.31 13.88,6.65 14.25,6H13V18H15.58L15.57,17.14L16.54,17.13C16.54,17.13 17.45,16.97 17.46,16.08C17.5,15.08 16.65,15.08 16.5,15.08C16.37,15.08 15.43,15.13 15.43,15.95H13.91C13.91,15.95 13.95,13.89 16.5,13.89C19.1,13.89 18.96,15.91 18.96,15.91C18.96,15.91 19,17.16 17.85,17.63L18.37,18H20M8.92,16H7.42V10.2L5.62,10.76V9.53L8.76,8.41H8.92V16Z";var b5="M21,16.5C21,16.88 20.79,17.21 20.47,17.38L12.57,21.82C12.41,21.94 12.21,22 12,22C11.79,22 11.59,21.94 11.43,21.82L3.53,17.38C3.21,17.21 3,16.88 3,16.5V7.5C3,7.12 3.21,6.79 3.53,6.62L11.43,2.18C11.59,2.06 11.79,2 12,2C12.21,2 12.41,2.06 12.57,2.18L20.47,6.62C20.79,6.79 21,7.12 21,7.5V16.5M12,4.15L6.04,7.5L12,10.85L17.96,7.5L12,4.15M5,15.91L11,19.29V12.58L5,9.21V15.91M19,15.91V9.21L13,12.58V19.29L19,15.91Z";var w5="M18.32,8H5.67L5.23,4H18.77M12,19A3,3 0 0,1 9,16C9,14 12,10.6 12,10.6C12,10.6 15,14 15,16A3,3 0 0,1 12,19M3,2L5,20.23C5.13,21.23 5.97,22 7,22H17C18,22 18.87,21.23 19,20.23L21,2H3Z";var T5="M12,1.5A2.5,2.5 0 0,1 14.5,4A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 9.5,4A2.5,2.5 0 0,1 12,1.5M15.87,5C18,5 20,7 20,9C22.7,9 22.7,13 20,13H4C1.3,13 1.3,9 4,9C4,7 6,5 8.13,5C8.57,6.73 10.14,8 12,8C13.86,8 15.43,6.73 15.87,5M5,15H8L9,22H7L5,15M10,15H14L13,22H11L10,15M16,15H19L17,22H15L16,15Z";var E5="M18,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V4A2,2 0 0,0 18,2M10,4A1,1 0 0,1 11,5A1,1 0 0,1 10,6A1,1 0 0,1 9,5A1,1 0 0,1 10,4M7,4A1,1 0 0,1 8,5A1,1 0 0,1 7,6A1,1 0 0,1 6,5A1,1 0 0,1 7,4M18,20H6V8H18V20M14.67,15.33C14.69,16.03 14.41,16.71 13.91,17.21C12.86,18.26 11.15,18.27 10.09,17.21C9.59,16.71 9.31,16.03 9.33,15.33C9.4,14.62 9.63,13.94 10,13.33C10.37,12.5 10.81,11.73 11.33,11L12,10C13.79,12.59 14.67,14.36 14.67,15.33";var R5="M16,11H18V13H16V11M12,3H19C20.11,3 21,3.89 21,5V19H22V21H2V19H10V5C10,3.89 10.89,3 12,3M12,5V19H19V5H12Z";var P5="M12,3C10.89,3 10,3.89 10,5H3V19H2V21H22V19H21V5C21,3.89 20.11,3 19,3H12M12,5H19V19H12V5M5,11H7V13H5V11Z";var B5="M16,12A2,2 0 0,1 18,10A2,2 0 0,1 20,12A2,2 0 0,1 18,14A2,2 0 0,1 16,12M10,12A2,2 0 0,1 12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12M4,12A2,2 0 0,1 6,10A2,2 0 0,1 8,12A2,2 0 0,1 6,14A2,2 0 0,1 4,12Z";var F5="M19.77,7.23L19.78,7.22L16.06,3.5L15,4.56L17.11,6.67C16.17,7.03 15.5,7.93 15.5,9A2.5,2.5 0 0,0 18,11.5C18.36,11.5 18.69,11.42 19,11.29V18.5A1,1 0 0,1 18,19.5A1,1 0 0,1 17,18.5V14A2,2 0 0,0 15,12H14V5A2,2 0 0,0 12,3H6A2,2 0 0,0 4,5V21H14V13.5H15.5V18.5A2.5,2.5 0 0,0 18,21A2.5,2.5 0 0,0 20.5,18.5V9C20.5,8.31 20.22,7.68 19.77,7.23M18,10A1,1 0 0,1 17,9A1,1 0 0,1 18,8A1,1 0 0,1 19,9A1,1 0 0,1 18,10M8,18V13.5H6L10,6V11H12L8,18Z";var D5="M12,11A1,1 0 0,0 11,12A1,1 0 0,0 12,13A1,1 0 0,0 13,12A1,1 0 0,0 12,11M12.5,2C17,2 17.11,5.57 14.75,6.75C13.76,7.24 13.32,8.29 13.13,9.22C13.61,9.42 14.03,9.73 14.35,10.13C18.05,8.13 22.03,8.92 22.03,12.5C22.03,17 18.46,17.1 17.28,14.73C16.78,13.74 15.72,13.3 14.79,13.11C14.59,13.59 14.28,14 13.88,14.34C15.87,18.03 15.08,22 11.5,22C7,22 6.91,18.42 9.27,17.24C10.25,16.75 10.69,15.71 10.89,14.79C10.4,14.59 9.97,14.27 9.65,13.87C5.96,15.85 2,15.07 2,11.5C2,7 5.56,6.89 6.74,9.26C7.24,10.25 8.29,10.68 9.22,10.87C9.41,10.39 9.73,9.97 10.14,9.65C8.15,5.96 8.94,2 12.5,2Z";var N5="M17.66 11.2C17.43 10.9 17.15 10.64 16.89 10.38C16.22 9.78 15.46 9.35 14.82 8.72C13.33 7.26 13 4.85 13.95 3C13 3.23 12.17 3.75 11.46 4.32C8.87 6.4 7.85 10.07 9.07 13.22C9.11 13.32 9.15 13.42 9.15 13.55C9.15 13.77 9 13.97 8.8 14.05C8.57 14.15 8.33 14.09 8.14 13.93C8.08 13.88 8.04 13.83 8 13.76C6.87 12.33 6.69 10.28 7.45 8.64C5.78 10 4.87 12.3 5 14.47C5.06 14.97 5.12 15.47 5.29 15.97C5.43 16.57 5.7 17.17 6 17.7C7.08 19.43 8.95 20.67 10.96 20.92C13.1 21.19 15.39 20.8 17.03 19.32C18.86 17.66 19.5 15 18.56 12.72L18.43 12.46C18.22 12 17.66 11.2 17.66 11.2M14.5 17.5C14.22 17.74 13.76 18 13.4 18.1C12.28 18.5 11.16 17.94 10.5 17.28C11.69 17 12.4 16.12 12.61 15.23C12.78 14.43 12.46 13.77 12.33 13C12.21 12.26 12.23 11.63 12.5 10.94C12.69 11.32 12.89 11.7 13.13 12C13.9 13 15.11 13.44 15.37 14.8C15.41 14.94 15.43 15.08 15.43 15.23C15.46 16.05 15.1 16.95 14.5 17.5H14.5Z";var $5="M12,20L12.76,17C9.5,16.79 6.59,15.4 5.75,13.58C5.66,14.06 5.53,14.5 5.33,14.83C4.67,16 3.33,16 2,16C3.1,16 3.5,14.43 3.5,12.5C3.5,10.57 3.1,9 2,9C3.33,9 4.67,9 5.33,10.17C5.53,10.5 5.66,10.94 5.75,11.42C6.4,10 8.32,8.85 10.66,8.32L9,5C11,5 13,5 14.33,5.67C15.46,6.23 16.11,7.27 16.69,8.38C19.61,9.08 22,10.66 22,12.5C22,14.38 19.5,16 16.5,16.66C15.67,17.76 14.86,18.78 14.17,19.33C13.33,20 12.67,20 12,20M17,11A1,1 0 0,0 16,12A1,1 0 0,0 17,13A1,1 0 0,0 18,12A1,1 0 0,0 17,11Z";var I5="M7,2V13H10V22L17,10H13L17,2H7Z";var z5="M15 21H17V19H15M19 9H21V7H19M3 5V19C3 20.1 3.9 21 5 21H9V19H5V5H9V3H5C3.9 3 3 3.9 3 5M19 3V5H21C21 3.9 20.1 3 19 3M11 23H13V1H11M19 17H21V15H19M15 5H17V3H15M19 13H21V11H19M19 21C20.1 21 21 20.1 21 19H19Z";var W5="M20.16 12.73C22.93 9.96 22.57 5.26 19.09 3C17.08 1.67 14.39 1.66 12.36 2.97C10.6 4.1 9.63 5.86 9.46 7.68C9.33 9 8.83 10.23 7.91 11.15L7.88 11.18C6.72 12.34 6.72 14.11 7.81 15.19L8.8 16.18C9.89 17.27 11.66 17.27 12.75 16.18C13.72 15.21 15 14.68 16.39 14.53C17.76 14.38 19.1 13.78 20.16 12.73M6.26 19.86C6.53 20.42 6.44 21.1 5.97 21.56C5.39 22.15 4.44 22.15 3.85 21.56C3.58 21.29 3.44 20.94 3.42 20.58C3.06 20.56 2.71 20.42 2.44 20.15C1.85 19.56 1.85 18.61 2.44 18.03C2.9 17.57 3.59 17.47 4.14 17.74L6.62 15.31C6.76 15.5 6.92 15.72 7.1 15.9L8.09 16.89C8.3 17.09 8.5 17.26 8.76 17.41L6.26 19.86Z";var G5="M11.9 2C8 2 4.9 5.4 5 9.3C5.1 11.9 6.6 14.1 8.7 15.2C10.1 15.9 11 17.3 11 18.8V19C11 20.7 12.3 22 14 22C18 22 19 17 19 9C19 9 19 2 11.9 2M14 20C13.4 20 13 19.6 13 19V18.8C13 16.6 11.7 14.5 9.7 13.4C8.1 12.6 7.1 11 7 9.2C7 7.9 7.5 6.5 8.4 5.5C9.3 4.5 10.6 4 11.8 4C16.7 4 17 8.2 17 9C17 18.9 15.3 20 14 20M15.8 7.6L8.3 10.3C8.1 10 8 9.6 8 9.1C8 8.4 8.2 7.8 8.5 7.1L13.7 5.2C14.9 5.8 15.5 6.7 15.8 7.6M12.9 15.1L15.7 14.1C15.6 15.6 15.3 16.7 15.1 17.4L13.8 17.9C13.8 16.9 13.5 16 12.9 15.1M16 9.2C16 10.4 16 11.5 15.9 12.4L11.9 13.9C11.4 13.4 10.8 12.9 10.1 12.6C9.7 12.4 9.3 12.1 9 11.8L16 9.2Z";var U5="M22,18A4,4 0 0,1 18,22H15A4,4 0 0,1 11,18V16H17.79L20.55,11.23L22.11,12.13L19.87,16H22V18M9,22H2C2,19 2,16 2.33,12.83C2.6,10.3 3.08,7.66 3.6,5H3V3H4L7,3H8V5H7.4C7.92,7.66 8.4,10.3 8.67,12.83C9,16 9,19 9,22Z";var Q5="M18 11V6H15V4H12V2H8V5H6V11H5L7 22H17L19 11H18M15.86 11C15.7 11.61 15.4 12.16 15 12.62V8.62L17 9.62V11H15.86M17 7V8.5L15 7.5V7H17M12 5H14V8.5L12 9.5V5M12 10.62L14 9.62V13.45C13.41 13.8 12.73 14 12 14V10.62M11 13.86C10.21 13.65 9.5 13.22 9 12.62V9.62L11 8.62V13.86M9 3H11V7.5L10 8V5H9V3M7 6H9V8.5L8 9V11H7V6Z";var K5="M9,21V22H7V21A2,2 0 0,1 5,19V4A2,2 0 0,1 7,2H17A2,2 0 0,1 19,4V19A2,2 0 0,1 17,21V22H15V21H9M7,4V9H17V4H7M7,19H17V11H7V19M8,12H10V15H8V12M8,6H10V8H8V6Z";var j5="M18,10A1,1 0 0,1 17,9A1,1 0 0,1 18,8A1,1 0 0,1 19,9A1,1 0 0,1 18,10M12,10H6V5H12M19.77,7.23L19.78,7.22L16.06,3.5L15,4.56L17.11,6.67C16.17,7 15.5,7.93 15.5,9A2.5,2.5 0 0,0 18,11.5C18.36,11.5 18.69,11.42 19,11.29V18.5A1,1 0 0,1 18,19.5A1,1 0 0,1 17,18.5V14C17,12.89 16.1,12 15,12H14V5C14,3.89 13.1,3 12,3H6C4.89,3 4,3.89 4,5V21H14V13.5H15.5V18.5A2.5,2.5 0 0,0 18,21A2.5,2.5 0 0,0 20.5,18.5V9C20.5,8.31 20.22,7.68 19.77,7.23Z";var Y5="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12C20,14.4 19,16.5 17.3,18C15.9,16.7 14,16 12,16C10,16 8.2,16.7 6.7,18C5,16.5 4,14.4 4,12A8,8 0 0,1 12,4M14,5.89C13.62,5.9 13.26,6.15 13.1,6.54L11.81,9.77L11.71,10C11,10.13 10.41,10.6 10.14,11.26C9.73,12.29 10.23,13.45 11.26,13.86C12.29,14.27 13.45,13.77 13.86,12.74C14.12,12.08 14,11.32 13.57,10.76L13.67,10.5L14.96,7.29L14.97,7.26C15.17,6.75 14.92,6.17 14.41,5.96C14.28,5.91 14.15,5.89 14,5.89M10,6A1,1 0 0,0 9,7A1,1 0 0,0 10,8A1,1 0 0,0 11,7A1,1 0 0,0 10,6M7,9A1,1 0 0,0 6,10A1,1 0 0,0 7,11A1,1 0 0,0 8,10A1,1 0 0,0 7,9M17,9A1,1 0 0,0 16,10A1,1 0 0,0 17,11A1,1 0 0,0 18,10A1,1 0 0,0 17,9Z";var q5="M10,9A1,1 0 0,1 11,8A1,1 0 0,1 12,9V13.47L13.21,13.6L18.15,15.79C18.68,16.03 19,16.56 19,17.14V21.5C18.97,22.32 18.32,22.97 17.5,23H11C10.62,23 10.26,22.85 10,22.57L5.1,18.37L5.84,17.6C6.03,17.39 6.3,17.28 6.58,17.28H6.8L10,19V9M11,5A4,4 0 0,1 15,9C15,10.5 14.2,11.77 13,12.46V11.24C13.61,10.69 14,9.89 14,9A3,3 0 0,0 11,6A3,3 0 0,0 8,9C8,9.89 8.39,10.69 9,11.24V12.46C7.8,11.77 7,10.5 7,9A4,4 0 0,1 11,5Z";var X5="M15.5,21.27L14.66,21.18C13.9,21.11 13.25,20.6 13,19.87C12.47,17.91 12.47,15.83 13,13.87C15.32,13.4 17,11.37 17,9C17,7 15,2 15,2H9C9,2 7,7 7,9C7,11.38 8.67,13.42 11,13.9C11.53,15.86 11.53,17.94 11,19.9C10.76,20.62 10.12,21.13 9.37,21.21L8.5,21.3C8.5,21.3 8,21.28 8,22H16C16,21.28 15.5,21.27 15.5,21.27M9.44,7L10.44,4H13.56L14.56,7H9.44Z";var J5="M10,12A2,2 0 0,0 8,14A2,2 0 0,0 10,16A2,2 0 0,0 12,14A2,2 0 0,0 10,12M6,8A2,2 0 0,0 4,10A2,2 0 0,0 6,12A2,2 0 0,0 8,10A2,2 0 0,0 6,8M6,16A2,2 0 0,0 4,18A2,2 0 0,0 6,20A2,2 0 0,0 8,18A2,2 0 0,0 6,16M18,8A2,2 0 0,0 20,6A2,2 0 0,0 18,4A2,2 0 0,0 16,6A2,2 0 0,0 18,8M14,16A2,2 0 0,0 12,18A2,2 0 0,0 14,20A2,2 0 0,0 16,18A2,2 0 0,0 14,16M18,12A2,2 0 0,0 16,14A2,2 0 0,0 18,16A2,2 0 0,0 20,14A2,2 0 0,0 18,12M14,8A2,2 0 0,0 12,10A2,2 0 0,0 14,12A2,2 0 0,0 16,10A2,2 0 0,0 14,8M10,4A2,2 0 0,0 8,6A2,2 0 0,0 10,8A2,2 0 0,0 12,6A2,2 0 0,0 10,4Z";var C3="M8.06,2C7.88,3.17 8.17,4.16 8.95,4.97C9.45,5.47 9.61,6.14 9.42,7H10.41C10.53,6.45 10.55,6 10.45,5.55C10.36,5.13 10.05,4.63 9.5,4.03C9.05,3.47 8.89,2.8 9.05,2H8.06M10.55,2C10.36,3.17 10.66,4.16 11.44,4.97C11.94,5.47 12.09,6.14 11.91,7H12.89C13,6.45 13.03,6 12.94,5.55C12.84,5.13 12.53,4.63 12,4.03C11.53,3.47 11.38,2.8 11.53,2H10.55M13.08,2C12.89,3.17 13.19,4.16 13.97,4.97C14.47,5.47 14.61,6.14 14.39,7H15.42C15.55,6.45 15.56,6 15.47,5.55C15.38,5.13 15.06,4.63 14.53,4.03C14.06,3.47 13.91,2.8 14.06,2H13.08M5,8C5,9.42 5.39,10.7 6.14,11.84C6.87,12.96 7.91,13.85 9.14,14.39L5.16,20.44C5.06,20.56 5,20.75 5,21C5,21.41 5.16,21.69 5.44,21.84C5.56,21.94 5.75,22 6,22C6.41,22 6.69,21.84 6.84,21.56L7.83,19.97H14.2C14.41,20.55 14.79,21.05 15.28,21.42C15.78,21.8 16.36,22 17,22C17.83,22 18.53,21.69 19.13,21.09C19.72,20.5 20,19.8 20,19C20,18.17 19.72,17.47 19.13,16.88C18.53,16.28 17.83,16 17,16C16.36,16 15.78,16.17 15.28,16.55C14.78,16.92 14.42,17.41 14.2,18H9.14L11.11,14.95C11.27,15 11.56,15 12,15C12.44,15 12.73,15 12.89,14.95L13.88,16.5C14.29,15.96 14.84,15.54 15.47,15.28L14.91,14.39C16.03,13.89 17,13 17.79,11.77C18.59,10.5 19,9.27 19,8H5M17,18C17.3,18 17.53,18.09 17.72,18.28C17.91,18.47 18,18.72 18,19C18,19.27 17.91,19.5 17.72,19.71C17.54,19.91 17.28,20 17,20C16.74,20 16.5,19.91 16.29,19.71C16.09,19.5 16,19.26 16,19C16,18.7 16.09,18.47 16.29,18.28C16.5,18.09 16.73,18 17,18Z";var i2="M8.5 4.5L5.4 9.5L8.5 14.7L5.2 20.5L3.4 19.6L6.1 14.7L3 9.5L6.7 3.6L8.5 4.5M14.7 4.4L11.6 9.5L14.7 14.5L11.4 20.3L9.6 19.4L12.3 14.5L9.2 9.5L12.9 3.5L14.7 4.4M21 4.4L17.9 9.5L21 14.5L17.7 20.3L15.9 19.4L18.6 14.5L15.5 9.5L19.2 3.5L21 4.4";var H3="M13.5,8H12V13L16.28,15.54L17,14.33L13.5,12.25V8M13,3A9,9 0 0,0 4,12H1L4.96,16.03L9,12H6A7,7 0 0,1 13,5A7,7 0 0,1 20,12A7,7 0 0,1 13,19C11.07,19 9.32,18.21 8.06,16.94L6.64,18.36C8.27,20 10.5,21 13,21A9,9 0 0,0 22,12A9,9 0 0,0 13,3";var V3="M24 13L20 17V14H11V12H20V9L24 13M4 20V12H1L11 3L18 9.3V10H15.79L11 5.69L6 10.19V18H16V16H18V20H4Z";var L3="M15 13L11 17V14H2V12H11V9L15 13M5 20V16H7V18H17V10.19L12 5.69L7.21 10H4.22L12 3L22 12H19V20H5Z";var e3="M19 8C20.11 8 21 8.9 21 10V16.76C21.61 17.31 22 18.11 22 19C22 20.66 20.66 22 19 22C17.34 22 16 20.66 16 19C16 18.11 16.39 17.31 17 16.76V10C17 8.9 17.9 8 19 8M19 9C18.45 9 18 9.45 18 10V11H20V10C20 9.45 19.55 9 19 9M12 5.69L7 10.19V18H14.1L14 19L14.1 20H5V12H2L12 3L16.4 6.96C15.89 7.4 15.5 7.97 15.25 8.61L12 5.69Z";var r3="M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11V17Z";var t3="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z";var M3="M12,2A7,7 0 0,1 19,9C19,11.38 17.81,13.47 16,14.74V17A1,1 0 0,1 15,18H9A1,1 0 0,1 8,17V14.74C6.19,13.47 5,11.38 5,9A7,7 0 0,1 12,2M9,21V20H15V21A1,1 0 0,1 14,22H10A1,1 0 0,1 9,21M12,4A5,5 0 0,0 7,9C7,11.05 8.23,12.81 10,13.58V16H14V13.58C15.77,12.81 17,11.05 17,9A5,5 0 0,0 12,4Z";var i3="M11 15H6L13 1V9H18L11 23V15Z";var a3="M12,17A2,2 0 0,0 14,15C14,13.89 13.1,13 12,13A2,2 0 0,0 10,15A2,2 0 0,0 12,17M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V10C4,8.89 4.9,8 6,8H7V6A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,3A3,3 0 0,0 9,6V8H15V6A3,3 0 0,0 12,3Z";var o3="M18 1C15.24 1 13 3.24 13 6V8H4C2.9 8 2 8.89 2 10V20C2 21.11 2.9 22 4 22H16C17.11 22 18 21.11 18 20V10C18 8.9 17.11 8 16 8H15V6C15 4.34 16.34 3 18 3C19.66 3 21 4.34 21 6V8H23V6C23 3.24 20.76 1 18 1M10 13C11.1 13 12 13.89 12 15C12 16.11 11.11 17 10 17C8.9 17 8 16.11 8 15C8 13.9 8.9 13 10 13Z";var n3="M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z";var A3="M5,7A2,2 0 0,0 3,9V15A2,2 0 0,0 5,17H8V15H5V9H8V7H5M11,7A2,2 0 0,0 9,9V15A2,2 0 0,0 11,17H13A2,2 0 0,0 15,15V9A2,2 0 0,0 13,7H11M11,9H13V15H11V9M16,10.5V12H19V13.5H17.5A1.5,1.5 0 0,0 16,15V18H20.5V16.5H17.5V15H19A1.5,1.5 0 0,0 20.5,13.5V12A1.5,1.5 0 0,0 19,10.5H16Z";var d3="M8 18C6.67 18 5.79 18.79 5.29 19.29S4.67 20 4 20 3.21 19.79 2.71 19.29C2.35 18.93 1.79 18.42 1 18.16V20.41C1.09 20.5 1.18 20.59 1.29 20.71C1.79 21.21 2.67 22 4 22S6.21 21.21 6.71 20.71 7.33 20 8 20 8.79 20.21 9.29 20.71C9.73 21.14 10.44 21.8 11.5 21.96C11.66 22 11.83 22 12 22C13.33 22 14.21 21.21 14.71 20.71S15.33 20 16 20 16.79 20.21 17.29 20.71 18.67 22 20 22 22.21 21.21 22.71 20.71C22.82 20.59 22.91 20.5 23 20.41V18.16C22.21 18.42 21.65 18.93 21.29 19.29C20.79 19.79 20.67 20 20 20S19.21 19.79 18.71 19.29 17.33 18 16 18 13.79 18.79 13.29 19.29 12.67 20 12 20C11.78 20 11.63 19.97 11.5 19.92C11.22 19.82 11.05 19.63 10.71 19.29C10.21 18.79 9.33 18 8 18M22 10.5C22 10.5 24 12.67 24 14C24 15.1 23.1 16 22 16S20 15.1 20 14C20 12.67 22 10.5 22 10.5M22.5 7.13L19.24 5.24L12.73 9C12.39 8.4 11.74 8 11 8H9V6H10C10.55 6 11 5.55 11 5S10.55 4 10 4H6C5.45 4 5 4.45 5 5S5.45 6 6 6H7V8H5C3.9 8 3 8.9 3 10V13C3 14.1 3.9 15 5 15H14C14.75 15 15.41 14.58 15.75 13.97L19.4 7.65L21.5 8.86C22 9.14 22.59 8.97 22.87 8.5C23.14 8 23 7.4 22.5 7.13M14 13H5V10H11.69L12.6 11.43L16.06 9.43L14 13M3.5 6.92L1.79 8.62A1 1 0 0 1 .38 7.21L2.09 5.5A1 1 0 0 1 3.5 5.5C3.89 5.89 3.89 6.5 3.5 6.92Z";var p3="M14.53 1.45L13.45 2.53L15.05 4.13C15.27 4.38 15.38 4.67 15.38 5S15.27 5.64 15.05 5.86L11.5 9.47L12.5 10.55L16.13 6.94C16.66 6.35 16.92 5.7 16.92 5C16.92 4.3 16.66 3.64 16.13 3.05L14.53 1.45M10.55 3.47L9.47 4.55L10.08 5.11C10.3 5.33 10.41 5.63 10.41 6S10.3 6.67 10.08 6.89L9.47 7.45L10.55 8.53L11.11 7.92C11.64 7.33 11.91 6.69 11.91 6C11.91 5.28 11.64 4.63 11.11 4.03L10.55 3.47M21 5.06C20.31 5.06 19.67 5.33 19.08 5.86L13.45 11.5L14.53 12.5L20.11 6.94C20.36 6.69 20.66 6.56 21 6.56S21.64 6.69 21.89 6.94L22.5 7.55L23.53 6.47L22.97 5.86C22.38 5.33 21.72 5.06 21 5.06M7 8L2 22L16 17L7 8M19 11.06C18.3 11.06 17.66 11.33 17.06 11.86L15.47 13.45L16.55 14.53L18.14 12.94C18.39 12.69 18.67 12.56 19 12.56C19.33 12.56 19.63 12.69 19.88 12.94L21.5 14.53L22.55 13.5L20.95 11.86C20.36 11.33 19.7 11.06 19 11.06Z";var s3="M14,19H18V5H14M6,19H10V5H6V19Z";var l3="M8,5.14V19.14L19,12.14L8,5.14Z";var m3="M14.6 9L18 3.1L19.7 4.1L16.9 9H14.6M14 10H3V12H5V19C5 20.1 5.9 21 7 21H17C18.1 21 19 20.1 19 19V12H21V10H14Z";var v3="M19 19C19 20.11 18.11 21 17 21H7C5.9 21 5 20.11 5 19V12H3V10H21V12H19M8 1.5C6.15 1.5 4.65 3 4.65 4.85C4.65 6.7 6.15 8.2 8 8.2H9.53C9.92 8.2 10.29 8.3 10.61 8.5H12.63C12.05 7.45 10.86 6.75 9.53 6.75H8C7 6.75 6.15 5.77 6.15 4.75C6.15 3.73 7 3 8 3M12.85 2C12.85 3 12 3.85 11 3.85V5.35C12.92 5.35 14.5 6.7 14.89 8.5H16.42C16.12 6.67 14.96 5.15 13.35 4.38C13.97 3.77 14.35 2.93 14.35 2Z";var c3="M16.56,5.44L15.11,6.89C16.84,7.94 18,9.83 18,12A6,6 0 0,1 12,18A6,6 0 0,1 6,12C6,9.83 7.16,7.94 8.88,6.88L7.44,5.44C5.36,6.88 4,9.28 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12C20,9.28 18.64,6.88 16.56,5.44M13,3H11V13H13";var x3="M18.73,18C15.4,21.69 9.71,22 6,18.64C2.33,15.31 2.04,9.62 5.37,5.93C6.9,4.25 9,3.2 11.27,3C7.96,6.7 8.27,12.39 12,15.71C13.63,17.19 15.78,18 18,18C18.25,18 18.5,18 18.73,18Z";var u3="M16,6C14.87,6 13.77,6.35 12.84,7H4C2.89,7 2,7.89 2,9V15C2,16.11 2.89,17 4,17H5V18A1,1 0 0,0 6,19H8A1,1 0 0,0 9,18V17H15V18A1,1 0 0,0 16,19H18A1,1 0 0,0 19,18V17H20C21.11,17 22,16.11 22,15V9C22,7.89 21.11,7 20,7H19.15C18.23,6.35 17.13,6 16,6M16,7.5A3.5,3.5 0 0,1 19.5,11A3.5,3.5 0 0,1 16,14.5A3.5,3.5 0 0,1 12.5,11A3.5,3.5 0 0,1 16,7.5M4,9H8V10H4V9M16,9A2,2 0 0,0 14,11A2,2 0 0,0 16,13A2,2 0 0,0 18,11A2,2 0 0,0 16,9M4,11H8V12H4V11M4,13H8V14H4V13Z";var Z3="M12,0C8.96,0 6.21,1.23 4.22,3.22L5.63,4.63C7.26,3 9.5,2 12,2C14.5,2 16.74,3 18.36,4.64L19.77,3.23C17.79,1.23 15.04,0 12,0M7.05,6.05L8.46,7.46C9.37,6.56 10.62,6 12,6C13.38,6 14.63,6.56 15.54,7.46L16.95,6.05C15.68,4.78 13.93,4 12,4C10.07,4 8.32,4.78 7.05,6.05M12,15A2,2 0 0,1 10,13A2,2 0 0,1 12,11A2,2 0 0,1 14,13A2,2 0 0,1 12,15M15,9H9A1,1 0 0,0 8,10V22A1,1 0 0,0 9,23H15A1,1 0 0,0 16,22V10A1,1 0 0,0 15,9Z";var S3="M12,4C14.1,4 16.1,4.8 17.6,6.3C20.7,9.4 20.7,14.5 17.6,17.6C15.8,19.5 13.3,20.2 10.9,19.9L11.4,17.9C13.1,18.1 14.9,17.5 16.2,16.2C18.5,13.9 18.5,10.1 16.2,7.7C15.1,6.6 13.5,6 12,6V10.6L7,5.6L12,0.6V4M6.3,17.6C3.7,15 3.3,11 5.1,7.9L6.6,9.4C5.5,11.6 5.9,14.4 7.8,16.2C8.3,16.7 8.9,17.1 9.6,17.4L9,19.4C8,19 7.1,18.4 6.3,17.6Z";var h3="M18.1,4.8C18,4.3 17.6,4 17.1,4H13L13.2,7H10.8L11,4H6.8C6.3,4 5.9,4.4 5.8,4.8L3.1,18.8C3,19.4 3.5,20 4.1,20H10L10.3,15H13.7L14,20H19.8C20.4,20 20.9,19.4 20.8,18.8L18.1,4.8M10.4,13L10.6,9H13.2L13.4,13H10.4Z";var f3="M16.88 4L16.88 4L19.03 6.1L13.5 10.5L12.5 9.5L16.87 4L16.88 4M16.88 2C16.3 2 15.73 2.24 15.33 2.72L9.8 9.65L13.34 13.19L20.28 7.67C21.18 6.91 21.25 5.54 20.41 4.7L18.3 2.59C17.9 2.19 17.39 2 16.88 2M9.1 10.36L8.39 11.07C8 11.46 8 12.09 8.39 12.5L10.5 14.6C10.71 14.8 10.96 14.89 11.22 14.89S11.73 14.8 11.93 14.6L12.63 13.9L9.1 10.36M6 15C5.45 15 5 15.45 5 16C5 16.55 5.45 17 6 17C6.55 17 7 16.55 7 16C7 15.45 6.55 15 6 15M9 16C8.45 16 8 16.45 8 17S8.45 18 9 18C9.55 18 10 17.55 10 17S9.55 16 9 16M4 18C3.45 18 3 18.45 3 19S3.45 20 4 20C4.55 20 5 19.55 5 19S4.55 18 4 18M7 19C6.45 19 6 19.45 6 20S6.45 21 7 21C7.55 21 8 20.55 8 20S7.55 19 7 19Z";var g3="M10.6 9.6L9 15L7.4 9.6L2 8L7.4 6.4L9 1L10.6 6.4L16 8L10.6 9.6M17 14.2L21 12L18.8 16L21 20L17 17.8L13 20L15.2 16L13 12L17 14.2M10 16L8.3 19L10 22L7 20.3L4 22L5.7 19L4 16L7 17.7L10 16";var _3="M20.79,13.95L18.46,14.57L16.46,13.44V10.56L18.46,9.43L20.79,10.05L21.31,8.12L19.54,7.65L20,5.88L18.07,5.36L17.45,7.69L15.45,8.82L13,7.38V5.12L14.71,3.41L13.29,2L12,3.29L10.71,2L9.29,3.41L11,5.12V7.38L8.5,8.82L6.5,7.69L5.92,5.36L4,5.88L4.47,7.65L2.7,8.12L3.22,10.05L5.55,9.43L7.55,10.56V13.45L5.55,14.58L3.22,13.96L2.7,15.89L4.47,16.36L4,18.12L5.93,18.64L6.55,16.31L8.55,15.18L11,16.62V18.88L9.29,20.59L10.71,22L12,20.71L13.29,22L14.7,20.59L13,18.88V16.62L15.5,15.17L17.5,16.3L18.12,18.63L20,18.12L19.53,16.35L21.3,15.88L20.79,13.95M9.5,10.56L12,9.11L14.5,10.56V13.44L12,14.89L9.5,13.44V10.56Z";var y3="M8 17.85C8 19.04 7.11 20 6 20S4 19.04 4 17.85C4 16.42 6 14 6 14S8 16.42 8 17.85M16.46 12V10.56L18.46 9.43L20.79 10.05L21.31 8.12L19.54 7.65L20 5.88L18.07 5.36L17.45 7.69L15.45 8.82L13 7.38V5.12L14.71 3.41L13.29 2L12 3.29L10.71 2L9.29 3.41L11 5.12V7.38L8.5 8.82L6.5 7.69L5.92 5.36L4 5.88L4.47 7.65L2.7 8.12L3.22 10.05L5.55 9.43L7.55 10.56V12H2V13H22V12H16.46M9.5 12V10.56L12 9.11L14.5 10.56V12H9.5M20 17.85C20 19.04 19.11 20 18 20S16 19.04 16 17.85C16 16.42 18 14 18 14S20 16.42 20 17.85M14 20.85C14 22.04 13.11 23 12 23S10 22.04 10 20.85C10 19.42 12 17 12 17S14 19.42 14 20.85Z";var O3="M14.25,12L16.27,11H23L22,9H18.03L20.42,5.83L19.43,3.83L15.37,9.2L13.35,10.21L13.75,8L17.83,2.62L15.64,2.22L12,7L8.4,2.2L6.2,2.6L10.26,8L10.66,10.21L8.82,9.29L8.66,9.21L4.6,3.8L3.6,5.8L6,9H2L1,11H7.77L9.75,12L7.73,13H1L2,15H5.97L3.58,18.17L4.57,20.17L8.63,14.8L10.65,13.79L10.25,16L6.17,21.38L8.36,21.79L12,17L15.6,21.8L17.8,21.4L13.74,16L13.34,13.79L15.34,14.79L19.4,20.2L20.4,18.2L18,15H22L23,13H16.23";var k3="M12,16A3,3 0 0,1 9,13C9,11.88 9.61,10.9 10.5,10.39L20.21,4.77L14.68,14.35C14.18,15.33 13.17,16 12,16M12,3C13.81,3 15.5,3.5 16.97,4.32L14.87,5.53C14,5.19 13,5 12,5A8,8 0 0,0 4,13C4,15.21 4.89,17.21 6.34,18.65H6.35C6.74,19.04 6.74,19.67 6.35,20.06C5.96,20.45 5.32,20.45 4.93,20.07V20.07C3.12,18.26 2,15.76 2,13A10,10 0 0,1 12,3M22,13C22,15.76 20.88,18.26 19.07,20.07V20.07C18.68,20.45 18.05,20.45 17.66,20.06C17.27,19.67 17.27,19.04 17.66,18.65V18.65C19.11,17.2 20,15.21 20,13C20,12 19.81,11 19.46,10.1L20.67,8C21.5,9.5 22,11.18 22,13Z";var b3="M16.72 10.43C14.68 8.39 14.5 4.66 14.5 4H13V6H9V4H7C7 2.9 7.9 2 9 2H16V3C16 3.08 16.04 7.63 17.78 9.37L16.72 10.43M17 2V4H18V2H17M15 12C13 10 13 7 13 7H9V9C9 10 9 10 8 11S7 13 7 13V20C7 21.1 7.9 22 9 22H13C14.1 22 15 21.1 15 20V12Z";var w3="M12,15.39L8.24,17.66L9.23,13.38L5.91,10.5L10.29,10.13L12,6.09L13.71,10.13L18.09,10.5L14.77,13.38L15.76,17.66M22,9.24L14.81,8.63L12,2L9.19,8.63L2,9.24L7.45,13.97L5.82,21L12,17.27L18.18,21L16.54,13.97L22,9.24Z";var T3="M13,19.92C14.8,19.7 16.35,18.95 17.65,17.65C18.95,16.35 19.7,14.8 19.92,13H16.92C16.7,14 16.24,14.84 15.54,15.54C14.84,16.24 14,16.7 13,16.92V19.92M10,8H14L17,11H19.92C19.67,9.05 18.79,7.38 17.27,6C15.76,4.66 14,4 12,4C10,4 8.24,4.66 6.73,6C5.21,7.38 4.33,9.05 4.08,11H7L10,8M11,19.92V16.92C10,16.7 9.16,16.24 8.46,15.54C7.76,14.84 7.3,14 7.08,13H4.08C4.3,14.77 5.05,16.3 6.35,17.6C7.65,18.9 9.2,19.67 11,19.92M12,2C14.75,2 17.1,3 19.05,4.95C21,6.9 22,9.25 22,12C22,14.75 21,17.1 19.05,19.05C17.1,21 14.75,22 12,22C9.25,22 6.9,21 4.95,19.05C3,17.1 2,14.75 2,12C2,9.25 3,6.9 4.95,4.95C6.9,3 9.25,2 12,2Z";var E3="M18,18H6V6H18V18Z";var R3="M10 2L7.6 5.4C8.4 5.2 9.2 5 10 5S11.6 5.2 12.4 5.4L10 2M21 13.8V7C21 5.9 20.1 5 19 5S17 5.9 17 7V13.8C16.4 14.4 16 15.2 16 16C16 17.7 17.3 19 19 19S22 17.7 22 16C22 15.1 21.6 14.3 21 13.8M20 8H18V7C18 6.4 18.4 6 19 6S20 6.4 20 7V8M5.5 6.7L1.3 7L3.1 10.8C3.2 10 3.5 9.2 3.9 8.5C4.4 7.8 4.9 7.2 5.5 6.7M10 7C7.2 7 5 9.2 5 12S7.2 17 10 17 15 14.8 15 12 12.8 7 10 7M10 15C8.3 15 7 13.7 7 12S8.3 9 10 9 13 10.3 13 12 11.7 15 10 15M3.2 13.2L1.4 17L5.5 17.4C5 16.9 4.4 16.2 4 15.5C3.5 14.8 3.3 14 3.2 13.2M7.6 18.6L10 22L12.4 18.6C11.6 18.8 10.8 19 10 19C9.1 19 8.3 18.8 7.6 18.6Z";var P3="M22.08,11.04H20.08V4H13.05V2H11.04V4H4V11.04H2V13.05H4V20.08H11.04V22.08H13.05V20.08H20.08V13.05H22.08V11.04M18.07,18.07H13.05V16.06H11.04V18.07H6V13.05H8.03V11.04H6V6H11.04V8.03H13.05V6H18.07V11.04H16.06V13.05H18.07V18.07M13.05,12.05A1,1 0 0,1 12.05,13.05C11.5,13.05 11.04,12.6 11.04,12.05C11.04,11.5 11.5,11.04 12.05,11.04C12.6,11.04 13.05,11.5 13.05,12.05Z";var B3="M15 13V5A3 3 0 0 0 9 5V13A5 5 0 1 0 15 13M12 4A1 1 0 0 1 13 5V8H11V5A1 1 0 0 1 12 4Z";var F3="M19.47 3.47L13.47 9.47L10.53 10C10.22 10.03 9.94 10.18 9.72 10.4L2.81 17.31C1.74 18.38 1.74 20.12 2.81 21.2C3.88 22.27 5.62 22.27 6.7 21.2L13.61 14.29C13.83 14.07 14 13.79 14.03 13.5L14.54 10.54L20.54 4.54L22 2L19.47 3.47M11 14.38C10.24 14.38 9.62 13.76 9.62 13S10.24 11.62 11 11.62 12.38 12.24 12.38 13C12.37 13.76 11.76 14.38 11 14.38Z";var D3="M12,20A7,7 0 0,1 5,13A7,7 0 0,1 12,6A7,7 0 0,1 19,13A7,7 0 0,1 12,20M19.03,7.39L20.45,5.97C20,5.46 19.55,5 19.04,4.56L17.62,6C16.07,4.74 14.12,4 12,4A9,9 0 0,0 3,13A9,9 0 0,0 12,22C17,22 21,17.97 21,13C21,10.88 20.26,8.93 19.03,7.39M11,14H13V8H11M15,1H9V3H15V1Z";var N3="M6,2H18V8H18V8L14,12L18,16V16H18V22H6V16H6V16L10,12L6,8V8H6V2M16,16.5L12,12.5L8,16.5V20H16V16.5M12,11.5L16,7.5V4H8V7.5L12,11.5M10,6H14V6.75L12,8.75L10,6.75V6Z";var $3="M4,5A2,2 0 0,0 2,7V17A2,2 0 0,0 4,19H20A2,2 0 0,0 22,17V7A2,2 0 0,0 20,5H4M4,7H16V17H4V7M19,7A1,1 0 0,1 20,8A1,1 0 0,1 19,9A1,1 0 0,1 18,8A1,1 0 0,1 19,7M6,9V11H14V9H6M19,11A1,1 0 0,1 20,12A1,1 0 0,1 19,13A1,1 0 0,1 18,12A1,1 0 0,1 19,11Z";var I3="M2 12H4V17H20V12H22V17C22 18.11 21.11 19 20 19H4C2.9 19 2 18.11 2 17V12M12 15L17.55 9.54L16.13 8.13L13 11.25V2H11V11.25L7.88 8.13L6.46 9.55L12 15Z";var z3="M8 13C6.14 13 4.59 14.28 4.14 16H2V18H4.14C4.59 19.72 6.14 21 8 21S11.41 19.72 11.86 18H22V16H11.86C11.41 14.28 9.86 13 8 13M8 19C6.9 19 6 18.1 6 17C6 15.9 6.9 15 8 15S10 15.9 10 17C10 18.1 9.1 19 8 19M19.86 6C19.41 4.28 17.86 3 16 3S12.59 4.28 12.14 6H2V8H12.14C12.59 9.72 14.14 11 16 11S19.41 9.72 19.86 8H22V6H19.86M16 9C14.9 9 14 8.1 14 7C14 5.9 14.9 5 16 5S18 5.9 18 7C18 8.1 17.1 9 16 9Z";var W3="M21,10.12H14.22L16.96,7.3C14.23,4.6 9.81,4.5 7.08,7.2C4.35,9.91 4.35,14.28 7.08,17C9.81,19.7 14.23,19.7 16.96,17C18.32,15.65 19,14.08 19,12.1H21C21,14.08 20.12,16.65 18.36,18.39C14.85,21.87 9.15,21.87 5.64,18.39C2.14,14.92 2.11,9.28 5.62,5.81C9.13,2.34 14.76,2.34 18.27,5.81L21,3V10.12M12.5,8V12.25L16,14.33L15.28,15.54L11,13V8H12.5Z";var G3="M12,4L9.91,6.09L12,8.18M4.27,3L3,4.27L7.73,9H3V15H7L12,20V13.27L16.25,17.53C15.58,18.04 14.83,18.46 14,18.7V20.77C15.38,20.45 16.63,19.82 17.68,18.96L19.73,21L21,19.73L12,10.73M19,12C19,12.94 18.8,13.82 18.46,14.64L19.97,16.15C20.62,14.91 21,13.5 21,12C21,7.72 18,4.14 14,3.23V5.29C16.89,6.15 19,8.83 19,12M16.5,12C16.5,10.23 15.5,8.71 14,7.97V10.18L16.45,12.63C16.5,12.43 16.5,12.21 16.5,12Z";var U3="M12,20A6,6 0 0,1 6,14C6,10 12,3.25 12,3.25C12,3.25 18,10 18,14A6,6 0 0,1 12,20Z";var a2="M12,3.25C12,3.25 6,10 6,14C6,17.32 8.69,20 12,20A6,6 0 0,0 18,14C18,10 12,3.25 12,3.25M14.47,9.97L15.53,11.03L9.53,17.03L8.47,15.97M9.75,10A1.25,1.25 0 0,1 11,11.25A1.25,1.25 0 0,1 9.75,12.5A1.25,1.25 0 0,1 8.5,11.25A1.25,1.25 0 0,1 9.75,10M14.25,14.5A1.25,1.25 0 0,1 15.5,15.75A1.25,1.25 0 0,1 14.25,17A1.25,1.25 0 0,1 13,15.75A1.25,1.25 0 0,1 14.25,14.5Z";var Q3="M3,15H13A1,1 0 0,1 14,16A1,1 0 0,1 13,17H3A1,1 0 0,1 2,16A1,1 0 0,1 3,15M16,15H21A1,1 0 0,1 22,16A1,1 0 0,1 21,17H16A1,1 0 0,1 15,16A1,1 0 0,1 16,15M1,12A5,5 0 0,1 6,7C7,4.65 9.3,3 12,3C15.43,3 18.24,5.66 18.5,9.03L19,9C21.19,9 22.97,10.76 23,13H21A2,2 0 0,0 19,11H17V10A5,5 0 0,0 12,5C9.5,5 7.45,6.82 7.06,9.19C6.73,9.07 6.37,9 6,9A3,3 0 0,0 3,12C3,12.35 3.06,12.69 3.17,13H1.1L1,12M3,19H5A1,1 0 0,1 6,20A1,1 0 0,1 5,21H3A1,1 0 0,1 2,20A1,1 0 0,1 3,19M8,19H21A1,1 0 0,1 22,20A1,1 0 0,1 21,21H8A1,1 0 0,1 7,20A1,1 0 0,1 8,19Z";var K3="M17.75,4.09L15.22,6.03L16.13,9.09L13.5,7.28L10.87,9.09L11.78,6.03L9.25,4.09L12.44,4L13.5,1L14.56,4L17.75,4.09M21.25,11L19.61,12.25L20.2,14.23L18.5,13.06L16.8,14.23L17.39,12.25L15.75,11L17.81,10.95L18.5,9L19.19,10.95L21.25,11M18.97,15.95C19.8,15.87 20.69,17.05 20.16,17.8C19.84,18.25 19.5,18.67 19.08,19.07C15.17,23 8.84,23 4.94,19.07C1.03,15.17 1.03,8.83 4.94,4.93C5.34,4.53 5.76,4.17 6.21,3.85C6.96,3.32 8.14,4.21 8.06,5.04C7.79,7.9 8.75,10.87 10.95,13.06C13.14,15.26 16.1,16.22 18.97,15.95M17.33,17.97C14.5,17.81 11.7,16.64 9.53,14.5C7.36,12.31 6.2,9.5 6.04,6.68C3.23,9.82 3.34,14.64 6.35,17.66C9.37,20.67 14.19,20.78 17.33,17.97Z";var j3="M4,10A1,1 0 0,1 3,9A1,1 0 0,1 4,8H12A2,2 0 0,0 14,6A2,2 0 0,0 12,4C11.45,4 10.95,4.22 10.59,4.59C10.2,5 9.56,5 9.17,4.59C8.78,4.2 8.78,3.56 9.17,3.17C9.9,2.45 10.9,2 12,2A4,4 0 0,1 16,6A4,4 0 0,1 12,10H4M19,12A1,1 0 0,0 20,11A1,1 0 0,0 19,10C18.72,10 18.47,10.11 18.29,10.29C17.9,10.68 17.27,10.68 16.88,10.29C16.5,9.9 16.5,9.27 16.88,8.88C17.42,8.34 18.17,8 19,8A3,3 0 0,1 22,11A3,3 0 0,1 19,14H5A1,1 0 0,1 4,13A1,1 0 0,1 5,12H19M18,18H4A1,1 0 0,1 3,17A1,1 0 0,1 4,16H18A3,3 0 0,1 21,19A3,3 0 0,1 18,22C17.17,22 16.42,21.66 15.88,21.12C15.5,20.73 15.5,20.1 15.88,19.71C16.27,19.32 16.9,19.32 17.29,19.71C17.47,19.89 17.72,20 18,20A1,1 0 0,0 19,19A1,1 0 0,0 18,18Z";var Y3="M12,21L15.6,16.2C14.6,15.45 13.35,15 12,15C10.65,15 9.4,15.45 8.4,16.2L12,21M12,3C7.95,3 4.21,4.34 1.2,6.6L3,9C5.5,7.12 8.62,6 12,6C15.38,6 18.5,7.12 21,9L22.8,6.6C19.79,4.34 16.05,3 12,3M12,9C9.3,9 6.81,9.89 4.8,11.4L6.6,13.8C8.1,12.67 9.97,12 12,12C14.03,12 15.9,12.67 17.4,13.8L19.2,11.4C17.19,9.89 14.7,9 12,9Z";var q3="M2.28,3L1,4.27L2.47,5.74C2.04,6 1.61,6.29 1.2,6.6L3,9C3.53,8.6 4.08,8.25 4.66,7.93L6.89,10.16C6.15,10.5 5.44,10.91 4.8,11.4L6.6,13.8C7.38,13.22 8.26,12.77 9.2,12.47L11.75,15C10.5,15.07 9.34,15.5 8.4,16.2L12,21L14.46,17.73L17.74,21L19,19.72M12,3C9.85,3 7.8,3.38 5.9,4.07L8.29,6.47C9.5,6.16 10.72,6 12,6C15.38,6 18.5,7.11 21,9L22.8,6.6C19.79,4.34 16.06,3 12,3M12,9C11.62,9 11.25,9 10.88,9.05L14.07,12.25C15.29,12.53 16.43,13.07 17.4,13.8L19.2,11.4C17.2,9.89 14.7,9 12,9Z";var X3="M21 20V2H3V20H1V23H23V20M19 4V11H13V4M5 4H11V11H5M5 20V13H11V20M13 20V13H19V20Z";var J3="M21 20V2H3V20H1V23H23V20M19 4V11H17V4M5 4H7V11H5M5 20V13H7V20M9 20V4H15V20M17 20V13H19V20Z";var C0="M10 6.2C10 4.3 8.8 2.6 7 2V5.7H4V2C2.2 2.6 1 4.3 1 6.2C1 8.1 2.2 9.8 4 10.4V21.4C4 21.8 4.2 22 4.5 22H6.5C6.8 22 7 21.8 7 21.5V10.5C8.8 9.9 10 8.2 10 6.2M16 8C16 8 15.9 8 16 8C12.1 8.1 9 11.2 9 15C9 18.9 12.1 22 16 22S23 18.9 23 15 19.9 8 16 8M16 20C13.2 20 11 17.8 11 15S13.2 10 16 10 21 12.2 21 15 18.8 20 16 20M15 11V16L18.6 18.2L19.4 17L16.5 15.3V11H15Z";var H0="M22.61,19L13.53,9.91C14.46,7.57 14,4.81 12.09,2.91C9.79,0.61 6.21,0.4 3.66,2.26L7.5,6.11L6.08,7.5L2.25,3.69C0.39,6.23 0.6,9.82 2.9,12.11C4.76,13.97 7.47,14.46 9.79,13.59L18.9,22.7C19.29,23.09 19.92,23.09 20.31,22.7L22.61,20.4C23,20 23,19.39 22.61,19M19.61,20.59L10.15,11.13C9.54,11.58 8.86,11.85 8.15,11.95C6.79,12.15 5.36,11.74 4.32,10.7C3.37,9.76 2.93,8.5 3,7.26L6.09,10.35L10.33,6.11L7.24,3C8.5,2.95 9.73,3.39 10.68,4.33C11.76,5.41 12.17,6.9 11.92,8.29C11.8,9 11.5,9.66 11.04,10.25L20.5,19.7L19.61,20.59Z";var V0={alert:r5,check:f5,chevron:_5,chevron_up:y5,clock:O5,counter:k5,dots:B5,error:e5,info:r3,pause:s3,play:l3,power:c3,remote:Z3,stop:E3,timer:N3,water:U3,wifi:Y3,wifi_off:q3,auto:i5,care:H0,brightness:n5,dishwasher:E5,door:P5,door_closed:R5,dry:M2,end_sound:o5,energy:i3,floor_light:u3,glass:X5,leaf:t3,key_tone:q5,quick:I5,rack:t5,rinse:w5,sanitize:g3,silent:G3,spray:b3,water_percent:a2,zone:a2,bake:T5,chicken:W5,clean:A5,defrost:y3,drawer:I3,fan:D5,fish:$5,flip:z5,fries:Q5,fryer:$3,heat:N5,manual:z3,meat:G5,probe:F3,recipe:g5,reheat:i2,roast:C3,shake:f3,slow:m3,snack:U5,star:w3,steam:v3,temperature:B3,vegetable:h5,warm:i2,ac:L5,adblue:d3,battery_car:p5,bonnet:m5,car:u5,car_door:x5,charger:F5,fuel:j5,gauge:Y5,history:H3,lights:Z5,lock:a3,lock_open:o3,marker:n3,motion:S5,odometer:k3,online:v5,parking:s5,range:h3,service:C0,snowflake:_3,software:W3,steering:T3,travel_time:D3,trip:l5,trunk:d5,sunroof:c5,window_closed:X3,window_open:J3,bulb:M3,fridge:K5,frost:O3,ice:b5,mist:Q3,night:K3,party:p3,target:P3,co2:A3,exhaust:V3,filter:M2,pm25:J5,reset:S3,sleep:x3,supply:L3,wind:j3,away:a5,indoor:e3,outdoor:R3,swing:M5};function A(e,C="icon"){let H=V0[e]||V0.info;return`<svg class="${C}" viewBox="0 0 24 24" aria-hidden="true"><path d="${H}"></path></svg>`}var P=`
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
`;var e4=`
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
`,L0=P+e4;function T(e,C){if(!e)return"";let H=C?.locale?.language||C?.language||"hu",V=C?.locale?.time_format,L={hour:"2-digit",minute:"2-digit"};V==="12"&&(L.hour12=!0),V==="24"&&(L.hour12=!1);try{return new Intl.DateTimeFormat(H,L).format(e)}catch{return e.toTimeString().slice(0,5)}}function L1(e,C){if(e==null)return null;let H=Math.max(0,Math.round(e));if(H<60)return{value:String(H),unit:C("ui.minute_short")};let V=Math.floor(H/60),L=H%60;return{value:`${V}:${String(L).padStart(2,"0")}`,unit:C("ui.hour_short")}}function H1(e,C){let H=L1(e,C);return H?`${H.value} ${H.unit}`:""}function o2(e){if(e==null)return null;let C=Math.max(0,Math.round(e)),H=Math.floor(C/60),V=C%60;return H?`${H}:${String(V).padStart(2,"0")}`:`0:${String(V).padStart(2,"0")}`}function f(e,C=1){return e==null||!Number.isFinite(e)?"\u2013":e.toFixed(C).replace(/\.0$/,"")}function i(e){return String(e??"").replace(/[&<>"']/g,C=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[C])}var A2={language:"auto",compact:!1,animate:!0,show_programs:!0,show_options:!0,show_delay:!0,show_scores:!0,show_consumption:!0,show_details:!0,show_controls:!0,show_appliance_settings:!0},r4=[p.IDLE,p.READY_TO_START],e0=[p.IDLE,p.READY_TO_START],n2=class extends HTMLElement{static getConfigElement(){return document.createElement(n1)}static getStubConfig(C){let H=E1(C);return{type:`custom:${z}`,device:H[0]?.id}}constructor(){super(),this.attachShadow({mode:"open"}),this._sections={},this._signatures={},this._built=!1}setConfig(C){this._config={...A2,...C||{}},this._signatures={},this._hass&&this._render()}set hass(C){this._hass=C,this._render()}get hass(){return this._hass}connectedCallback(){this._timer=window.setInterval(()=>this._render(),3e4)}disconnectedCallback(){this._timer&&window.clearInterval(this._timer),this._timer=void 0}getCardSize(){return this._config?.compact?5:9}getGridOptions(){return{columns:12,min_columns:6,rows:this._config?.compact?6:"auto"}}_build(){let C=document.createElement("style");C.textContent=L0;let H=document.createElement("ha-card"),V=document.createElement("div");V.className="wrap",V.addEventListener("click",L=>this._onClick(L)),V.addEventListener("input",L=>this._onInput(L)),V.addEventListener("keydown",L=>this._onKeyDown(L));for(let L of["header","hero","alerts","programs","options","delay","meters","controls","appliance","details"]){let r=document.createElement("div");r.dataset.section=L,this._sections[L]=r,V.appendChild(r)}H.appendChild(V),this.shadowRoot.replaceChildren(C,H),this._card=H,this._wrap=V,this._built=!0}_render(){if(!this._hass||!this._config)return;this._built||this._build();let C=O1(this._config,this._hass),H=k1(C);this._t=H;let V=J2(this._hass,this._config);if(this._model=V,!V.ok){this._renderEmpty(V,H);return}this._emptyShown=!1,this._applyHostClasses(V),this._section("header",this._headerHtml(V,H)),this._heroSection(V,H),this._section("alerts",this._alertsHtml(V,H)),this._section("programs",this._config.show_programs?this._programsHtml(V,H):""),this._section("options",this._config.show_options?this._optionsHtml(V,H):""),this._section("delay",this._config.show_delay?this._delayHtml(V,H):""),this._section("meters",this._metersHtml(V,H)),this._section("controls",this._config.show_controls?this._controlsHtml(V,H):""),this._section("appliance",this._config.show_appliance_settings?this._applianceSettingsHtml(V,H):""),this._section("details",this._config.show_details?this._detailsHtml(V,H):"")}_renderEmpty(C,H){if(this._emptyShown!==C.reason){this._emptyShown=C.reason,this._signatures={};for(let V of Object.values(this._sections))V.innerHTML="";this._sections.header.innerHTML=`
      <div class="empty">
        ${A("dishwasher")}
        <div>${i(H(`ui.${C.reason}`))}</div>
      </div>`}}_section(C,H){this._signatures[C]!==H&&(this._signatures[C]=H,this._sections[C].innerHTML=H,this._sections[C].hidden=!H,C==="delay"&&this._restoreReadyBy())}_applyHostClasses(C){let H=["wrap"];this._config.compact&&H.push("compact"),this._config.animate||H.push("no-animation"),H.push(`accent-${C.accent}`),C.state===p.RUNNING&&H.push("running","busy"),C.state===p.PAUSED&&H.push("paused"),C.state===p.END_OF_CYCLE&&H.push("done"),C.state===p.OFF&&H.push("off"),(C.state===p.ALARM||C.alerts.some(L=>r2[L]==="error"))&&H.push("alarm"),C.step==="DRYING"&&H.push("phase-drying"),C.doorOpen&&H.push("door-open");let V=H.join(" ");this._wrap.className!==V&&(this._wrap.className=V)}_headerHtml(C,H){let V=i(C.name||H("card_name")),L=[p.IDLE,p.READY_TO_START].includes(C.state)?this._cycleMinutes(C):k[C.program]?.duration,r=C.state===p.OFF?"":C.program&&L?`${H(`program.${C.program}`)} \xB7 ${H1(L,H)}`:C.programRaw||"",t=[];return C.online?C.linkQuality&&t.push(`<span title="${H("ui.wifi")}: ${C.linkQuality}">${A("wifi")}</span>`):t.push(`<span class="bad" title="${H("ui.offline")}">${A("wifi_off")}</span>`),C.doorOpen&&t.push(`<span class="bad" title="${H("ui.door_open")}">${A("door")}</span>`),C.ecoMode&&t.push(`<span title="${H("ui.eco_mode")}">${A("leaf")}</span>`),`
      <div class="header">
        <div>
          <div class="title" data-action="more-info">${V}</div>
          ${r?`<div class="sub">${i(r)}</div>`:""}
        </div>
        <div class="spacer"></div>
        <div class="badges">${t.join("")}</div>
        <div class="pill">${A(this._stateIcon(C))}${i(H(`state.${C.state}`))}</div>
      </div>`}_stateIcon(C){switch(C.state){case p.RUNNING:return"water";case p.PAUSED:return"pause";case p.END_OF_CYCLE:return"check";case p.DELAYED_START:return"timer";case p.ALARM:return"error";case p.READY_TO_START:return"play";default:return"power"}}_heroSection(C,H){this._sections.hero.querySelector(".machine")||(this._sections.hero.innerHTML=`
        <div class="hero">
          <div class="machine-wrap" data-action="more-info">${H5()}</div>
          <div class="status"></div>
        </div>`,this._statusNode=this._sections.hero.querySelector(".status"));let V=this._statusHtml(C,H);this._signatures.status!==V&&(this._signatures.status=V,this._statusNode.innerHTML=V),V5(this._sections.hero,this._displayText(C,H))}_displayText(C,H){return C.state===p.OFF?"":C.state===p.DELAYED_START&&C.delay?o2(C.delay):C.remaining!==null&&[p.RUNNING,p.PAUSED,p.DELAYED_START].includes(C.state)?o2(C.remaining):C.state===p.END_OF_CYCLE?"0:00":C.program?H(`program.${C.program}`).slice(0,8):"--:--"}_statusHtml(C,H){let V=[],L=C.state===p.RUNNING&&C.phase!=="UNAVAILABLE"?`<span class="phase-text">${i(H(`phase_long.${C.phase}`))}</span>`:"";V.push(`
      <div class="status-line">
        <span class="state-text">${i(H(`state.${C.state}`))}</span>
        ${L}
      </div>`),C.program&&C.state!==p.OFF&&V.push(`
        <div class="program-line">
          ${A(k[C.program]?.icon||"dishwasher")}
          <span>${i(H(`program.${C.program}`))}</span>
        </div>`);let r=this._countdownHtml(C,H);return r&&V.push(r),[p.RUNNING,p.PAUSED,p.END_OF_CYCLE].includes(C.state)&&(V.push(`<div class="bar"><i style="width:${Math.round(C.progress*100)}%"></i></div>`),V.push(this._timelineHtml(C,H))),V.join("")}_cycleMinutes(C){let H=k[C.program]?.duration??null,V=C.remaining!==null&&C.remaining>0?C.remaining:null;if(![p.IDLE,p.READY_TO_START].includes(C.state))return V??H;let L=this._durationTrack;return L?L.program!==C.program?this._durationTrack={program:C.program,reported:V,stale:!0}:L.stale&&V!==L.reported&&(L.stale=!1):this._durationTrack={program:C.program,reported:V,stale:!1},this._durationTrack.stale?H??V:V??H}_countdownHtml(C,H){if(C.state===p.END_OF_CYCLE)return`<div class="countdown"><span class="at">${A("check")}${i(H("ui.finished_hint"))}</span></div>`;if(C.state===p.DELAYED_START){let V=L1(C.delay||C.remaining,H);if(!V)return"";let L=[C.startAt?`<span class="at">${A("timer")}${i(H("ui.starts_at"))} ${T(C.startAt,this._hass)}</span>`:"",C.finishAt?`<span class="at">${A("clock")}${i(H("ui.ready_at"))} ${T(C.finishAt,this._hass)}</span>`:""].join("");return`<div class="countdown"><span class="value">${V.value}</span><span class="unit">${V.unit}</span>${L}</div>`}if([p.RUNNING,p.PAUSED].includes(C.state)){let V=L1(C.remaining,H);if(!V)return"";let L=C.finishAt?`<span class="at">${A("clock")}${i(H("ui.ready_at"))} ${T(C.finishAt,this._hass)}</span>`:"";return`<div class="countdown"><span class="value">${V.value}</span><span class="unit">${V.unit}</span>${L}</div>`}if([p.IDLE,p.READY_TO_START].includes(C.state)){let V=this._cycleMinutes(C),L=L1(V,H);if(!L)return"";let r=C.delay?new Date(Date.now()+C.delay*6e4):null,t=new Date(Date.now()+(V+C.delay)*6e4),M=[r?`<span class="at">${A("timer")}${i(H("ui.starts_at"))} ${T(r,this._hass)}</span>`:"",`<span class="at">${A("clock")}${i(H("ui.ready_at"))} ${T(t,this._hass)}</span>`].join("");return`<div class="countdown"><span class="value">${L.value}</span><span class="unit">${L.unit}</span>${M}</div>`}if(C.state===p.OFF&&C.delay&&C.program&&k[C.program]){let V=k[C.program].duration,L=L1(V,H),r=new Date(Date.now()+C.delay*6e4),t=new Date(Date.now()+(V+C.delay)*6e4);return`<div class="countdown"><span class="value">${L.value}</span><span class="unit">${L.unit}</span>
        <span class="at">${A("timer")}${i(H("ui.starts_at"))} ${T(r,this._hass)}</span>
        <span class="at">${A("clock")}${i(H("ui.ready_at"))} ${T(t,this._hass)}</span></div>`}return""}_timelineHtml(C,H){let V=k[C.program]?.steps||L2,L=C.step?V.indexOf(C.step):-1;return`<div class="timeline">${L2.map(t=>{let M=V.includes(t),a=V.indexOf(t),o="step";return M?L>=0&&a<L?o+=" done":L>=0&&a===L?o+=" active":C.state===p.END_OF_CYCLE&&(o+=" done"):o+=" skip",`<div class="${o}"><span class="dot"></span><span class="label">${i(H(`phase.${t}`))}</span></div>`}).join("")}</div>`}_alertsHtml(C,H){let V=[];C.doorOpen&&C.state!==p.OFF&&V.push({severity:"warning",text:H("ui.door_open"),iconName:"door"});for(let L of C.alerts){let{code:r,count:t}=L,a=(L.severity==="ERROR"||L.severity==="CRITICAL"?"error":"")||r2[r]||"warning",o=r?H(`alert.${r}`,`${H("alert_generic")}: ${r.replace(/^DISH_ALARM_/,"")}`):`${H("alert_generic")}: ${t}`;V.push({severity:a,text:o,iconName:a==="error"?"error":"alert"})}return C.online||V.push({severity:"error",text:H("ui.offline"),iconName:"wifi_off"}),V.length?`<div class="alerts">${V.map(L=>`<div class="alert ${L.severity}">${A(L.iconName)}<span>${i(L.text)}</span></div>`).join("")}</div>`:""}_programsHtml(C,H){if(!C.entities.program||!C.programOptions.length)return"";let V=r4.includes(C.state)&&C.remoteEnabled,L=C.programOptions.filter(o=>k[o.key]),r=[...e2.map(o=>L.find(n=>n.key===o)).filter(Boolean),...L.filter(o=>!e2.includes(o.key))],t=C.state===p.OFF?null:C.program,M=r.map(o=>{let n=o.key===t,s=k[o.key],l=`${H(`program_hint.${o.key}`)} \xB7 ${f(s.water)} l \xB7 ${f(s.energy,3)} kWh \xB7 ${H1(s.duration,H)}`;return`<button class="chip" type="button" data-action="program" data-value="${i(o.label)}"
        aria-pressed="${n}" title="${i(l)}" ${V?"":"disabled"}>
        ${A(s.icon)}<span>${i(H(`program.${o.key}`))}</span></button>`}),a=t?i(H(`program_hint.${t}`)):"";return`
      <div class="section">
        <div class="section-title">${i(H("ui.program"))}</div>
        <div class="chips">${M.join("")}</div>
        ${a?`<div class="note">${a}</div>`:""}
      </div>`}_optionsHtml(C,H){if(!C.options.length||C.state===p.OFF)return"";let V=e0.includes(C.state)&&C.remoteEnabled,L=C.options.filter(t=>t.supported||t.on);if(!L.length)return`
        <div class="section">
          <div class="section-title">${i(H("ui.options"))}</div>
          <div class="note">${i(H("ui.no_options"))}</div>
        </div>`;let r=L.map(t=>`<button class="chip" type="button" data-action="option" data-value="${t.entityId}"
        aria-pressed="${t.on}" title="${i(H(`option_hint.${t.key}`))}"
        ${V&&t.supported?"":"disabled"}>
        ${A(t.icon)}<span>${i(H(`option.${t.key}`))}</span></button>`);return`
      <div class="section">
        <div class="section-title">${i(H("ui.options"))}</div>
        <div class="chips">${r.join("")}</div>
      </div>`}_delayHtml(C,H){if(!C.entities.start_time)return"";let V=C.state===p.DELAYED_START||C.delay>0,L=(e0.includes(C.state)||C.state===p.DELAYED_START)&&C.remoteEnabled;if(!L&&!V)return"";let r=G2.map(n=>{let s=C.delay===n;return`<button class="chip" type="button" data-action="delay" data-value="${n}"
        aria-pressed="${s}" ${L?"":"disabled"}>
        ${A("timer")}<span>${n/60} ${i(H("ui.hour_short"))}</span></button>`});V&&r.push(`<button class="chip" type="button" data-action="delay" data-value="-1" ${L?"":"disabled"}>
        ${A("stop")}<span>${i(H("ui.delay_cancel"))}</span></button>`);let t=V?`<span class="hint">${i(H1(C.delay,H))}</span>`:`<span class="hint">${i(H("ui.delay_off"))}</span>`,M=Math.min(C.delayControl?.maxMinutes??J,J),a=`
      <div class="steppers narrow">
        <div class="stepper">
          <span class="label">${i(H("ui.delay_amount"))}</span>
          <div class="row">
            <button class="step-btn" type="button" data-action="delay-step" data-dir="-1"
              ${L&&C.delay>0?"":"disabled"} aria-label="\u2212">\u2212</button>
            <span class="value">${i(C.delay?H1(C.delay,H):H("ui.delay_off"))}</span>
            <button class="step-btn" type="button" data-action="delay-step" data-dir="1"
              ${L&&C.delay<M?"":"disabled"} aria-label="+">+</button>
          </div>
        </div>
        <div class="stepper" title="${i(H("ui.ready_by_hint"))}">
          <span class="label">${i(H("ui.ready_by"))}</span>
          <div class="row">
            <input class="time-input" type="time" data-action="ready-by" ${L?"":"disabled"}>
            <button class="step-btn wide" type="button" data-action="ready-by-apply"
              ${L?"":"disabled"} title="${i(H("ui.ready_by_apply"))}">
              ${A("check")}</button>
          </div>
        </div>
      </div>`,o=this._delayNotice&&Date.now()-this._delayNotice.at<2e4?`<div class="note">${A("info")}${i(this._delayNotice.text)}</div>`:"";return`
      <div class="section">
        <div class="section-title">${i(H("ui.delay"))}${t}</div>
        <div class="chips">${r.join("")}</div>
        ${a}
        ${o}
      </div>`}_scoresStale(C){let H=[C.scores.eco,C.scores.energy,C.scores.water].join("/"),V=this._scoreTrack;return V?V.program!==C.program?this._scoreTrack={program:C.program,values:H,stale:!0,since:Date.now()}:V.stale&&(H!==V.values||Date.now()-V.since>3e4)&&(V.stale=!1):this._scoreTrack={program:C.program,values:H,stale:!1,since:0},this._scoreTrack.stale}_metersHtml(C,H){if(C.state===p.OFF)return"";let V=[],{eco:L,energy:r,water:t}=C.scores,M=k[C.program]?.scores!==!1,a=this._scoresStale(C);if(this._config.show_scores&&M&&(L!==null||r!==null||t!==null)){let n=(s,l,d,u)=>{let x=Math.max(0,Math.min(7,u??0)),m=Array.from({length:7},(S,Z)=>`<i class="${Z<x?"on":""}"></i>`).join("");return`
          <div class="meter ${l}">
            <div class="top">${A(d)}<span>${i(H(`ui.${s}`))}</span>
              <span class="val">${u===null?"\u2013":`${u}/7`}</span></div>
            <div class="track">${m}</div>
          </div>`};V.push(`
        <div class="meters${a?" stale":""}">
          ${n("eco_score","eco","leaf",L)}
          ${n("energy_score","energy","energy",r)}
          ${n("water_score","water","water",t)}
        </div>`)}if(this._config.show_consumption&&C.program&&k[C.program]){let n=k[C.program];V.push(`
        <div class="facts">
          <span class="fact">${A("water")}<b>${f(n.water)}</b> l</span>
          <span class="fact">${A("energy")}<b>${f(n.energy,3)}</b> kWh</span>
          <span class="fact">${A("timer")}<b>${i(H1(n.duration,H))}</b></span>
        </div>`)}if(!V.length)return"";let o=a&&M?`<span class="hint">${i(H("ui.scores_updating"))}</span>`:"";return`
      <div class="section">
        <div class="section-title">${i(H("ui.scores"))}${o}</div>
        ${V.join("")}
      </div>`}_controlsHtml(C,H){let L=(z2[C.state]||[]).filter(t=>C.entities[`cmd_${t}`]).map(t=>{let M=W2[t],a=!C.remoteEnabled&&t!=="off"?"disabled":"";return`<button class="btn ${M.style}" type="button" data-action="command" data-value="${t}" ${a}>
          ${A(M.icon)}<span>${i(H(`command.${t}`))}</span></button>`});if(!L.length)return"";let r=C.remoteEnabled?"":`<div class="note">${A("remote")}${i(H("ui.remote_disabled_hint"))}</div>`;return`<div class="section"><div class="controls">${L.join("")}</div>${r}</div>`}_applianceSettingsHtml(C,H){let{brightness:V,floorLight:L,endSound:r,keyTone:t}=C.settings;if(!V&&!L&&!r&&!t)return"";let M=C.online&&C.remoteEnabled,a=(s,l,d,u)=>u?`<button class="chip" type="button" data-action="setting" data-value="${s}"
            aria-pressed="${u.on}" title="${i(H(`ui.${d}_hint`,""))}"
            ${M?"":"disabled"}>
            ${A(l)}<span>${i(H(`ui.${d}`))}</span>
          </button>`:"",o=[a("floor","floor_light","floor_light",L),a("sound","end_sound","end_sound",r),a("key","key_tone","key_tone",t)].filter(Boolean),n=V?`<div class="steppers narrow">
          <div class="stepper" title="${i(H("ui.brightness_hint",""))}">
            <span class="label">${i(H("ui.brightness"))}</span>
            <div class="row">
              <button class="step-btn" type="button" data-action="brightness" data-dir="-1"
                ${M&&V.value>V.min?"":"disabled"} aria-label="\u2212">\u2212</button>
              <span class="value">${V.value}</span>
              <button class="step-btn" type="button" data-action="brightness" data-dir="1"
                ${M&&V.value<V.max?"":"disabled"} aria-label="+">+</button>
            </div>
          </div>
        </div>`:"";return`
      <div class="section">
        <div class="section-title">${i(H("ui.appliance_settings"))}</div>
        ${o.length?`<div class="chips">${o.join("")}</div>`:""}
        ${n}
      </div>`}_detailsHtml(C,H){let V=[],L=(r,t,M)=>{t==null||t===""||V.push(`
        <div class="detail">
          <span class="k">${i(H(`ui.${r}`))}</span>
          <span class="v">${A(M)}${i(String(t))}</span>
        </div>`)};if(C.doorOpen!==null&&L("door",C.doorOpen?H("ui.door_open"):H("ui.door_closed"),C.doorOpen?"door":"door_closed"),C.remote){let r=C.remote.includes("TEMPORARY")?H("ui.remote_locked"):C.remoteEnabled?H("ui.remote_on"):H("ui.remote_off");L("remote",r,"remote")}if(C.linkQuality){let r=C.linkQuality.replace(/_/g," ").toLowerCase();L("wifi",r.charAt(0).toUpperCase()+r.slice(1),"wifi")}return C.cycles!==null&&L("cycles",C.cycles,"counter"),C.rinseAid!==null&&L("rinse_aid",`${C.rinseAid}/8`,"water_percent"),C.waterHardness&&L("water_hardness",C.waterHardness,"water"),V.length?`
      <div class="section">
        <div class="section-title">${i(H("ui.details"))}</div>
        <div class="details">${V.join("")}</div>
      </div>`:""}_onInput(C){let H=C.target.closest('[data-action="ready-by"]');H&&(this._readyByValue=H.value)}_onKeyDown(C){if(C.key!=="Enter")return;let H=C.target.closest('[data-action="ready-by"]');!H||H.hasAttribute("disabled")||(C.preventDefault(),this._applyReadyBy(H.value))}_applyReadyBy(C){!this._model?.ok||!/^\d{1,2}:\d{2}$/.test(C||"")||(this._readyByValue=C,this._readyBy(C,this._t),this._render())}_restoreReadyBy(){if(!this._readyByValue)return;let C=this._sections.delay?.querySelector('[data-action="ready-by"]');C&&C.value!==this._readyByValue&&(C.value=this._readyByValue)}_onClick(C){let H=C.target.closest("[data-action]");if(!H||H.hasAttribute("disabled"))return;let{action:V,value:L}=H.dataset,r=this._model;if(!(!r?.ok&&V!=="more-info"))switch(V){case"more-info":this._moreInfo(r?.entities?.appliance_state);break;case"program":this._selectProgram(L);break;case"option":this._haptic("light"),this._call("switch","toggle",{entity_id:L});break;case"command":this._haptic("medium"),this._call("button","press",{entity_id:r.entities[`cmd_${L}`]});break;case"setting":this._toggleSetting(L);break;case"brightness":this._stepBrightness(Number(H.dataset.dir));break;case"delay":this._setDelay(Number(L));break;case"delay-step":this._stepDelay(Number(H.dataset.dir));break;case"ready-by-apply":this._applyReadyBy(this._sections.delay?.querySelector('[data-action="ready-by"]')?.value);break;default:break}}_setDelay(C){let H=this._model,V=H.entities.start_time;if(!V)return;let L=H.delayControl,r;if(C<=0)r=L?L.min:-1;else{let t=L?L.seconds?L.step/60:L.step:1,M=Math.max(X,t||1),a=Math.floor(C/M)*M;if(a<=0)return this._setDelay(0);r=L?.seconds?a*60:a}return this._haptic("light"),this._call("number","set_value",{entity_id:V,value:r})}_stepDelay(C){let H=this._model,V=Math.min(H.delayControl?.maxMinutes??J,J),L=Math.floor(H.delay/X)*X,r=Math.min(V,Math.max(0,L+C*X));r!==H.delay&&this._setDelay(r)}_readyBy(C,H){let V=this._model,L=/^(\d{1,2}):(\d{2})$/.exec(C||"");if(!L)return;let r=new Date;r.setSeconds(0,0);let t=new Date(r);t.setHours(Number(L[1]),Number(L[2]),0,0),t<=r&&t.setDate(t.getDate()+1);let M=this._cycleMinutes(V)||0,a=Math.round((t.getTime()-r.getTime())/6e4),o=Math.min(V.delayControl?.maxMinutes??J,J),n=Math.floor((a-M)/X)*X;if(n<=0){let s=new Date(Date.now()+M*6e4);this._delayNotice={at:Date.now(),text:`${H("ui.ready_by_too_soon")} ${T(s,this._hass)}`},n=0}else if(n>o)n=o,this._delayNotice={at:Date.now(),text:H("ui.ready_by_max")};else{let s=new Date(Date.now()+(n+M)*6e4);this._delayNotice={at:Date.now(),text:`${H("ui.ready_by_set")}: ${H1(n,H)} \xB7 ${H("ui.ready_at")} ${T(s,this._hass)}`}}this._setDelay(n)}_toggleSetting(C){let H=this._model;if(this._haptic("light"),C==="key")return this._call("switch","toggle",{entity_id:H.entities.key_tone});let[V,L]=C==="floor"?["floorLight","display_on_floor"]:["endSound","end_of_cycle_sound"],r=H.settings[V];if(r)return this._call("select","select_option",{entity_id:H.entities[L],option:r.on?r.offOption:r.onOption})}_stepBrightness(C){let{brightness:H}=this._model.settings;if(!H)return;let V=H.levels.findIndex(r=>r.value===H.value),L=H.levels[(V===-1?0:V)+C];L&&(this._haptic("light"),this._call("select","select_option",{entity_id:this._model.entities.display_light,option:L.label}))}_selectProgram(C){return this._haptic("light"),this._call("select","select_option",{entity_id:this._model.entities.program,option:C})}_call(C,H,V){return V.entity_id?this._hass.callService(C,H,V):Promise.resolve()}_moreInfo(C){C&&this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:C},bubbles:!0,composed:!0}))}_haptic(C){this.dispatchEvent(new CustomEvent("haptic",{detail:C,bubbles:!0,composed:!0}))}};function r0(){customElements.get(z)||(customElements.define(z,n2),window.customCards=window.customCards||[],window.customCards.push({type:z,name:"AEG / Electrolux Dishwasher Card",description:"Rich status card for AEG and Electrolux dishwashers: phases, remaining time, programs, options and controls.",preview:!0,documentationURL:"https://github.com/gabor-io/ha-appliance-custom-card"}),console.info(`%c ${z} %c ${D2} `,"color:#fff;background:#039be5;font-weight:700;border-radius:3px 0 0 3px","color:#039be5;background:#e1f5fe;font-weight:700;border-radius:0 3px 3px 0"))}var t4=`
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
`;function B(e){return class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}setConfig(H){this._config={...H},this._render()}set hass(H){this._hass=H,this._render()}_render(){if(!this._config||!this._hass)return;let H=e.translator(e.getLanguage(this._config,this._hass)),V=e.listDevices(this._hass),L=this._config.device||"",r=[`<option value="" ${L?"":"selected"}>${i(H("editor.device_auto"))}</option>`,...V.map(a=>`<option value="${i(a.id)}" ${a.id===L?"selected":""}>${i(a.name)}</option>`)].join(""),t=[`<option value="auto">${i(H("editor.language_auto"))}</option>`,...e.languages.map(a=>`<option value="${a}" ${this._config.language===a?"selected":""}>${a.toUpperCase()}</option>`)].join(""),M=e.toggles.map(a=>{let o=this._config[a]??e.defaults[a]??!1;return`<label class="toggle"><input type="checkbox" data-key="${a}" ${o?"checked":""}>
            <span>${i(H(`editor.${a}`))}</span></label>`}).join("");this.shadowRoot.innerHTML=`
        <style>${t4}</style>
        <div class="form">
          <label>${i(H("editor.device"))}
            <select data-key="device">${r}</select>
          </label>
          <label>${i(H("editor.name"))}
            <input type="text" data-key="name" value="${i(this._config.name||"")}">
          </label>
          <label>${i(H("editor.language"))}
            <select data-key="language">${t}</select>
          </label>
          <div class="title">${i(H("editor.sections"))}</div>
          <div class="toggles">${M}</div>
        </div>`,this.shadowRoot.querySelectorAll("[data-key]").forEach(a=>a.addEventListener("change",o=>this._onChange(o)))}_onChange(H){let V=H.target,L=V.dataset.key,r={...this._config,type:this._config.type||`custom:${e.cardName}`};V.type==="checkbox"?r[L]=V.checked:V.value===""?delete r[L]:r[L]=V.value,this._config=r,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:r},bubbles:!0,composed:!0}))}}}var M4=B({cardName:z,toggles:["show_programs","show_options","show_delay","show_scores","show_consumption","show_appliance_settings","show_details","show_controls","compact","animate"],defaults:A2,listDevices:E1,getLanguage:O1,translator:k1,languages:t2});function t0(){customElements.get(n1)||customElements.define(n1,M4)}t0();r0();var W="philips-airfryer-card",A1="philips-airfryer-card-editor",M0="1.10.0",v={STANDBY:"STANDBY",POWERSAVE:"POWERSAVE",MAINMENU:"MAINMENU",IDLE:"IDLE",SETTING:"SETTING",PARASETTING:"PARASETTING",PRECOOK:"PRECOOK",COOKING:"COOKING",PAUSE:"PAUSE",USER_ACTION:"USER_ACTION",MAINTAIN:"MAINTAIN",FINISH:"FINISH",PAIRING:"PAIRING",UNKNOWN:"UNKNOWN"},i0={[v.STANDBY]:"idle",[v.POWERSAVE]:"idle",[v.MAINMENU]:"idle",[v.IDLE]:"ready",[v.SETTING]:"ready",[v.PARASETTING]:"ready",[v.PRECOOK]:"preheat",[v.COOKING]:"cooking",[v.PAUSE]:"paused",[v.USER_ACTION]:"paused",[v.MAINTAIN]:"warm",[v.FINISH]:"done",[v.PAIRING]:"idle",[v.UNKNOWN]:"idle"},V1=[v.PRECOOK,v.COOKING,v.MAINTAIN],e1=[...V1,v.PAUSE,v.USER_ACTION],R1=[v.IDLE,v.SETTING,v.PARASETTING,v.MAINMENU,v.STANDBY],a0={[v.STANDBY]:["power_on"],[v.POWERSAVE]:["power_on"],[v.MAINMENU]:["start","power_off"],[v.IDLE]:["start","power_off"],[v.SETTING]:["start","power_off"],[v.PARASETTING]:["start","power_off"],[v.PRECOOK]:["pause","stop"],[v.COOKING]:["pause","stop"],[v.PAUSE]:["start","stop"],[v.USER_ACTION]:["start","stop"],[v.MAINTAIN]:["stop"],[v.FINISH]:["keep_warm","stop"],[v.PAIRING]:[],[v.UNKNOWN]:[]},P1={power_on:{icon:"power",style:"primary",entity:"power",service:["switch","turn_on"]},power_off:{icon:"power",style:"ghost",entity:"power",service:["switch","turn_off"]},start:{icon:"play",style:"primary",entity:"btn_start",service:["button","press"]},pause:{icon:"pause",style:"primary",entity:"btn_pause",service:["button","press"]},stop:{icon:"stop",style:"ghost",entity:"btn_stop",service:["button","press"]},keep_warm:{icon:"warm",style:"ghost",entity:"btn_keep_warm",service:["button","press"]}},d1={MANUAL:{icon:"manual"},AUTO_COOK:{icon:"auto"},KEEP_WARM:{icon:"warm"},RECIPE:{icon:"recipe"},NO_SELECTION:{icon:"dots"},AIR_STEAM:{icon:"steam"},AIR_STEAM_PRO:{icon:"steam"},STEAMING:{icon:"steam"},ROAST:{icon:"roast"},BAKE:{icon:"bake"},GRILL:{icon:"roast"},SLOW_COOK:{icon:"slow"},STEW:{icon:"slow"},DEFROST:{icon:"defrost"},REHEAT:{icon:"reheat"},SOUS_VIDE:{icon:"probe"},EASY_CLEAN:{icon:"clean"},USER_PRESET:{icon:"star"},FROZEN_SNACKS:{icon:"snack"},FRESH_FRIES:{icon:"fries"},CHICKEN:{icon:"chicken"},FISH:{icon:"fish"},MUFFINS_CAKE:{icon:"bake"},MEAT_CHOPS:{icon:"meat"},VEGETABLES:{icon:"vegetable"}},o0=["AIR_STEAM","AIR_STEAM_PRO","STEAMING","STEW","SLOW_COOK"],p1={temperature:{min:40,max:200,step:5},time:{min:1,max:60,step:1},probe:{min:40,max:100,step:1},airspeed:{min:1,max:2,step:1}},n0=[{food:"poultry",doneness:"done",range:"80\u201385 \xB0C"},{food:"poultry_breast",doneness:"juicy",range:"70\u201374 \xB0C"},{food:"beef",doneness:"rare",range:"45\u201350 \xB0C"},{food:"beef",doneness:"medium",range:"55\u201360 \xB0C"},{food:"beef",doneness:"well_done",range:"65\u201370 \xB0C"},{food:"pork",doneness:"done",range:"70\u201373 \xB0C"},{food:"pork_chop",doneness:"medium",range:"58\u201363 \xB0C"},{food:"fish",doneness:"translucent",range:"50\u201355 \xB0C"},{food:"potato",doneness:"well_done",range:"92\u201395 \xB0C"}],A0=[160,180,200],d0=[5,10,15,20,30];var i4={card_name:"Airfryer",status:{STANDBY:"K\xE9szenl\xE9t",POWERSAVE:"Energiatakar\xE9kos",MAINMENU:"F\u0151men\xFC",IDLE:"K\xE9sz az ind\xEDt\xE1sra",SETTING:"Be\xE1ll\xEDt\xE1s",PARASETTING:"Be\xE1ll\xEDt\xE1s",PRECOOK:"El\u0151meleg\xEDt\xE9s",COOKING:"S\xFCt\xE9s",PAUSE:"Sz\xFCneteltetve",USER_ACTION:"Beavatkoz\xE1s sz\xFCks\xE9ges",MAINTAIN:"Melegen tart\xE1s",FINISH:"Elk\xE9sz\xFClt",PAIRING:"P\xE1ros\xEDt\xE1s",UNKNOWN:"Ismeretlen"},method:{MANUAL:"Manu\xE1lis",AUTO_COOK:"Auto-Cook",KEEP_WARM:"Melegen tart\xE1s",RECIPE:"Recept",NO_SELECTION:"Nincs kiv\xE1lasztva",AIR_STEAM:"Air Steam",AIR_STEAM_PRO:"Air Steam Pro",STEAMING:"P\xE1rol\xE1s",ROAST:"S\xFCt\xE9s (roast)",BAKE:"S\xFCtem\xE9ny",GRILL:"Grill",SLOW_COOK:"Lass\xFA f\u0151z\xE9s",STEW:"P\xE1rolt \xE9tel",DEFROST:"Kiolvaszt\xE1s",REHEAT:"\xDAjrameleg\xEDt\xE9s",SOUS_VIDE:"Sous-vide",EASY_CLEAN:"Tiszt\xEDt\xE1s",USER_PRESET:"Saj\xE1t program",FROZEN_SNACKS:"Fagyasztott snack",FRESH_FRIES:"Friss has\xE1b",CHICKEN:"Csirke",FISH:"Hal",MUFFINS_CAKE:"Muffin / s\xFCtem\xE9ny",MEAT_CHOPS:"H\xFAsszeletek",VEGETABLES:"Z\xF6lds\xE9g"},method_hint:{MANUAL:"Id\u0151, h\u0151m\xE9rs\xE9klet \xE9s leveg\u0151sebess\xE9g k\xE9zzel: 40\u2013200 \xB0C, 1\u2013180 perc.",AUTO_COOK:"A g\xE9p a t\xF6lt\xE9si szint \xE9s a k\xEDv\xE1nt elk\xE9sz\xFClts\xE9g alapj\xE1n sz\xE1mol mindent.",KEEP_WARM:"A k\xE9sz \xE9tel melegen tart\xE1sa.",RECIPE:"A NutriU alkalmaz\xE1sb\xF3l k\xFCld\xF6tt recept l\xE9p\xE9sei."},command:{power_on:"Bekapcsol\xE1s",power_off:"Kikapcsol\xE1s",start:"Ind\xEDt\xE1s",pause:"Sz\xFCnet",stop:"Le\xE1ll\xEDt\xE1s",keep_warm:"Melegen tart\xE1s"},alert:{drawer_open:"A fi\xF3k nyitva \u2013 a s\xFCt\xE9s sz\xFCnetel",drawer_open_idle:"A fi\xF3k nyitva van",shake:"R\xE1zd meg az \xE9telt!",flip:"Ford\xEDtsd meg az \xE9telt!",probe_required:"Ehhez a programhoz be kell dugni az \xE9telh\u0151m\xE9r\u0151t",probe_unplugged:"Az \xE9telh\u0151m\xE9r\u0151 nincs csatlakoztatva",resting:"Pihentet\xE9s \u2013 hagyd m\xE9g a k\xE9sz\xFCl\xE9kben",error:"Hibak\xF3d",user_action:"A k\xE9sz\xFCl\xE9k beavatkoz\xE1sra v\xE1r"},ui:{remaining:"H\xE1tral\xE9v\u0151 id\u0151",ready_at:"K\xE9sz",temperature:"H\u0151m\xE9rs\xE9klet",current_temp:"Aktu\xE1lis",target_temp:"C\xE9l",probe:"\xC9telh\u0151m\xE9r\u0151",probe_core:"Magh\u0151m\xE9rs\xE9klet",method:"\xC9telk\xE9sz\xEDt\xE9si m\xF3d",presets:"Saj\xE1t programok",autocook:"Auto-Cook program",recipe:"Recept",settings:"Be\xE1ll\xEDt\xE1sok",cook_time:"S\xFCt\xE9si id\u0151",airspeed:"Leveg\u0151sebess\xE9g",airspeed_low:"Alacsony",airspeed_high:"Magas",preheat:"El\u0151meleg\xEDt\xE9s",keep_warm:"Melegen tart\xE1s",details:"R\xE9szletek",drawer:"Fi\xF3k",drawer_open:"Nyitva",drawer_closed:"Z\xE1rva",total_time:"Teljes id\u0151",stage:"F\xE1zis",voltage:"Fesz\xFClts\xE9g",error_code:"Hibak\xF3d",on:"Be",off:"Ki",none:"Nincs",minute_short:"p",hour_short:"\xF3",finished:"Az \xE9tel elk\xE9sz\xFClt",finished_hint:"Kivehet\u0151",unavailable:"A k\xE9sz\xFCl\xE9k entit\xE1sai nem \xE9rhet\u0151k el",not_configured:"Nem tal\xE1lhat\xF3 Philips airfryer. Add meg a device vagy a prefix be\xE1ll\xEDt\xE1st a k\xE1rtya konfigur\xE1ci\xF3j\xE1ban.",core_temp_help:"Aj\xE1nlott magh\u0151m\xE9rs\xE9kletek",food:{poultry:"Baromfi",poultry_breast:"Baromfimell",beef:"Marha, borj\xFA, b\xE1r\xE1ny",pork:"Sert\xE9s",pork_chop:"Sert\xE9skaraj",fish:"Hal",potato:"Eg\xE9sz burgonya"},doneness:{done:"k\xE9sz",juicy:"szaftos",rare:"v\xE9res",medium:"k\xF6zepes",well_done:"j\xF3l \xE1ts\xFCtve",translucent:"\xE1ttetsz\u0151"}},editor:{device:"K\xE9sz\xFCl\xE9k",device_auto:"Automatikus felismer\xE9s",name:"N\xE9v",language:"Nyelv",language_auto:"Automatikus (HA nyelve)",sections:"Megjelen\xEDtett r\xE9szek",show_methods:"\xC9telk\xE9sz\xEDt\xE9si m\xF3dok",show_presets:"Saj\xE1t programok",show_settings:"H\u0151m\xE9rs\xE9klet \xE9s id\u0151 \xE1ll\xEDt\xE1sa",show_probe:"\xC9telh\u0151m\xE9r\u0151",show_details:"R\xE9szletek",show_controls:"Vez\xE9rl\u0151gombok",compact:"Kompakt n\xE9zet",animate:"Anim\xE1ci\xF3k"}},a4={card_name:"Airfryer",status:{STANDBY:"Standby",POWERSAVE:"Power save",MAINMENU:"Main menu",IDLE:"Ready to start",SETTING:"Setting up",PARASETTING:"Setting up",PRECOOK:"Preheating",COOKING:"Cooking",PAUSE:"Paused",USER_ACTION:"Action needed",MAINTAIN:"Keeping warm",FINISH:"Finished",PAIRING:"Pairing",UNKNOWN:"Unknown"},method:{MANUAL:"Manual",AUTO_COOK:"Auto-Cook",KEEP_WARM:"Keep warm",RECIPE:"Recipe",NO_SELECTION:"No selection",AIR_STEAM:"Air Steam",AIR_STEAM_PRO:"Air Steam Pro",STEAMING:"Steaming",ROAST:"Roast",BAKE:"Bake",GRILL:"Grill",SLOW_COOK:"Slow cook",STEW:"Stew",DEFROST:"Defrost",REHEAT:"Reheat",SOUS_VIDE:"Sous-vide",EASY_CLEAN:"Easy clean",USER_PRESET:"My preset",FROZEN_SNACKS:"Frozen snacks",FRESH_FRIES:"Fresh fries",CHICKEN:"Chicken",FISH:"Fish",MUFFINS_CAKE:"Muffins / cake",MEAT_CHOPS:"Meat chops",VEGETABLES:"Vegetables"},method_hint:{MANUAL:"Set time, temperature and air speed yourself: 40\u2013200 \xB0C, 1\u2013180 min.",AUTO_COOK:"The appliance works out every parameter from load and doneness.",KEEP_WARM:"Keeps finished food warm.",RECIPE:"Steps of a recipe sent from the NutriU app."},command:{power_on:"Turn on",power_off:"Turn off",start:"Start",pause:"Pause",stop:"Stop",keep_warm:"Keep warm"},alert:{drawer_open:"Drawer is open \u2013 cooking is paused",drawer_open_idle:"The drawer is open",shake:"Shake the food!",flip:"Flip the food!",probe_required:"This program needs the food probe plugged in",probe_unplugged:"The food probe is unplugged",resting:"Resting \u2013 leave the food inside",error:"Error code",user_action:"The appliance is waiting for you"},ui:{remaining:"Remaining",ready_at:"Ready at",temperature:"Temperature",current_temp:"Current",target_temp:"Target",probe:"Food probe",probe_core:"Core temperature",method:"Cooking method",presets:"My presets",autocook:"Auto-Cook program",recipe:"Recipe",settings:"Settings",cook_time:"Cook time",airspeed:"Air speed",airspeed_low:"Low",airspeed_high:"High",preheat:"Preheat",keep_warm:"Keep warm",details:"Details",drawer:"Drawer",drawer_open:"Open",drawer_closed:"Closed",total_time:"Total time",stage:"Stage",voltage:"Voltage",error_code:"Error code",on:"On",off:"Off",none:"None",minute_short:"m",hour_short:"h",finished:"The food is ready",finished_hint:"Ready to serve",unavailable:"The appliance entities are unavailable",not_configured:"No Philips airfryer found. Set the device or prefix option in the card configuration.",core_temp_help:"Recommended core temperatures",food:{poultry:"Poultry",poultry_breast:"Poultry breast",beef:"Beef, veal, lamb",pork:"Pork",pork_chop:"Pork chop",fish:"Fish",potato:"Whole potato"},doneness:{done:"done",juicy:"juicy",rare:"rare",medium:"medium",well_done:"well done",translucent:"translucent"}},editor:{device:"Device",device_auto:"Auto detect",name:"Name",language:"Language",language_auto:"Automatic (HA language)",sections:"Visible sections",show_methods:"Cooking methods",show_presets:"My presets",show_settings:"Temperature and time controls",show_probe:"Food probe",show_details:"Details",show_controls:"Control buttons",compact:"Compact layout",animate:"Animations"}},p0={hu:i4,en:a4},d2=Object.keys(p0);function B1(e,C){return E(e,C,d2)}function F1(e){return R(p0,e)}var s0={domain:"sensor",suffix:"cooking_status",key:"status"},o4={status:["sensor","cooking_status"],target_temp:["sensor","target_temperature"],current_temp:["sensor","current_temperature"],total_time:["sensor","total_cook_time"],remaining:["sensor","time_remaining"],preset:["sensor","preset"],recipe:["sensor","recipe"],error:["sensor","error_code"],preheat_status:["sensor","preheat_status"],keep_warm_status:["sensor","keep_warm"],airspeed:["sensor","air_speed"],probe_target:["sensor","probe_temperature"],probe_current:["sensor","current_probe_temperature"],dialog:["sensor","dialog"],stage:["sensor","current_stage"],voltage:["sensor","voltage"],drawer:["binary_sensor","drawer"],shake:["binary_sensor","shake_reminder"],flip:["binary_sensor","flip_reminder"],preheat_active:["binary_sensor","preheat_active"],probe_unplugged:["binary_sensor","probe_unplugged"],probe_required:["binary_sensor","probe_required"],resting:["binary_sensor","resting"],btn_start:["button","start_cooking"],btn_pause:["button","pause"],btn_stop:["button","stop"],btn_keep_warm:["button","keep_warm"],num_temp:["number","set_temperature"],num_time:["number","set_cook_time"],num_airspeed:["number","set_air_speed"],num_probe:["number","set_probe_temperature"],num_keep_warm_time:["number","keep_warm_duration"],num_keep_warm_temp:["number","keep_warm_temperature"],sel_method:["select","cooking_method"],sel_preset:["select","my_presets"],sel_autocook:["select","autocook_program"],power:["switch","power"],sw_preheat:["switch","preheat"]};function n4(e,C){return b1(e,C,s0)}function l0(e,C){let H=n4(e,C),V=w1(e,C,o4,H);return V.prefix=H,V}function D1(e){return T1(e,s0)}function $(e){if(h(e))return null;let C=Number(e.state);return Number.isFinite(C)?C:null}function m0(e){let C=$(e);if(C===null||C<0)return null;let H=(e.attributes?.unit_of_measurement||"s").toLowerCase();return Math.round(H==="min"||H==="m"?C*60:H==="h"?C*3600:C)}function N1(e,C){if(!e)return null;let H=e.attributes||{};return{value:$(e),min:Number.isFinite(H.min)?H.min:C.min,max:Number.isFinite(H.max)?H.max:C.max,step:Number.isFinite(H.step)?H.step:C.step,unit:H.unit_of_measurement||""}}function v0(e){let C=e?.attributes?.options;return Array.isArray(C)?C:[]}function N(e){return e?.state==="on"}function A4(e){if(h(e))return null;let C=String(e.state).trim();return!C||C==="0"||/^(none|no|off|ok)$/i.test(C)?null:C}function c0(e,C){let H=l0(e,C),V=Y=>H[Y]?e.states[H[Y]]:void 0,L=V("status");if(!H.prefix||!L)return{ok:!1,reason:H.prefix?"unavailable":"not_configured",entities:H};let r=g(L.state),t=r in v?r:v.UNKNOWN,M=V("sel_method"),a=g(M?.state),o=d1[a]?a:null,n=m0(V("remaining")),s=m0(V("total_time")),l=V1.includes(t),u=e1.includes(t)&&n!==null&&s?Math.min(1,Math.max(0,1-n/s)):t===v.FINISH?1:0,x=$(V("current_temp")),m=$(V("target_temp")),S=V("current_temp")?.attributes?.unit_of_measurement||"\xB0C",Z=V("probe_unplugged")?!N(V("probe_unplugged")):!1,_=$(V("probe_current")),y=$(V("probe_target")),w=V("drawer"),c=w?N(w):null,O=l&&n!==null&&n>0?new Date(Date.now()+n*1e3):null,D=V("recipe")?.state,_1=V("keep_warm_status")?.state,y1=V("preheat_status")?.state;return{ok:!0,entities:H,status:t,accent:i0[t]||"idle",power:V("power")?N(V("power")):t!==v.STANDBY,method:o,methodRaw:M?.state||null,methodOptions:v0(M).map(Y=>({label:Y,key:g(Y)})),presetOptions:v0(V("sel_preset")),presetSelected:V("sel_preset")?.state||null,autocookSelected:V("sel_autocook")?.state||null,steam:o0.includes(o),remaining:n,total:s,progress:u,finishAt:O,currentTemp:x,targetTemp:m,tempUnit:S,heating:l&&x!==null&&m?x<m-2:!1,probe:{plugged:Z,required:N(V("probe_required")),current:_,target:y,progress:Z&&_!==null&&y?Math.min(1,Math.max(0,_/y)):0},drawerOpen:c,shake:N(V("shake")),flip:N(V("flip")),resting:N(V("resting")),preheatActive:N(V("preheat_active")),preheatStatus:y1&&!h(V("preheat_status"))?y1:null,preheatEnabled:V("sw_preheat")?N(V("sw_preheat")):null,keepWarm:_1&&!h(V("keep_warm_status"))?_1:null,recipe:D&&!h(V("recipe"))&&D!=="unknown"?D:null,stage:$(V("stage")),voltage:$(V("voltage")),error:A4(V("error")),controls:{temperature:N1(V("num_temp"),p1.temperature),time:N1(V("num_time"),p1.time),airspeed:N1(V("num_airspeed"),p1.airspeed),probe:N1(V("num_probe"),p1.probe)},airspeed:$(V("airspeed")),name:C.name||L.attributes?.friendly_name?.replace(/\s*Cooking Status$/i,"")||null}}function x0(){return`
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
  </svg>`}function u0(e,C,H){let V=e.querySelector(".display-main"),L=e.querySelector(".display-sub");V&&V.textContent!==C&&(V.textContent=C),L&&L.textContent!==H&&(L.textContent=H)}var d4=`
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
`,Z0=P+d4;var s2={language:"auto",compact:!1,animate:!0,show_methods:!0,show_presets:!0,show_settings:!0,show_probe:!0,show_details:!0,show_controls:!0};function S0(e,C){if(e==null)return null;let H=Math.max(0,Math.round(e));if(H>=3600){let r=Math.floor(H/3600),t=Math.round(H%3600/60);return{value:`${r}:${String(t).padStart(2,"0")}`,unit:C("ui.hour_short")}}let V=Math.floor(H/60),L=H%60;return{value:`${V}:${String(L).padStart(2,"0")}`,unit:C("ui.minute_short")}}var p2=class extends HTMLElement{static getConfigElement(){return document.createElement(A1)}static getStubConfig(C){let H=D1(C);return{type:`custom:${W}`,device:H[0]?.id}}constructor(){super(),this.attachShadow({mode:"open"}),this._sections={},this._signatures={},this._built=!1}setConfig(C){this._config={...s2,...C||{}},this._signatures={},this._hass&&this._render()}set hass(C){this._hass=C,this._render()}get hass(){return this._hass}connectedCallback(){this._timer=window.setInterval(()=>this._render(),3e4)}disconnectedCallback(){this._timer&&window.clearInterval(this._timer),this._timer=void 0}getCardSize(){return this._config?.compact?5:8}getGridOptions(){return{columns:12,min_columns:6,rows:this._config?.compact?6:"auto"}}_build(){let C=document.createElement("style");C.textContent=Z0;let H=document.createElement("ha-card"),V=document.createElement("div");V.className="wrap",V.addEventListener("click",L=>this._onClick(L));for(let L of["header","hero","alerts","gauges","methods","presets","settings","controls","details"]){let r=document.createElement("div");r.dataset.section=L,this._sections[L]=r,V.appendChild(r)}H.appendChild(V),this.shadowRoot.replaceChildren(C,H),this._wrap=V,this._built=!0}_render(){if(!this._hass||!this._config)return;this._built||this._build();let C=F1(B1(this._config,this._hass)),H=c0(this._hass,this._config);if(this._model=H,!H.ok){this._renderEmpty(H,C);return}this._emptyShown=!1,this._applyHostClasses(H),this._section("header",this._headerHtml(H,C)),this._heroSection(H,C),this._section("alerts",this._alertsHtml(H,C)),this._section("gauges",this._gaugesHtml(H,C)),this._section("methods",this._config.show_methods?this._methodsHtml(H,C):""),this._section("presets",this._config.show_presets?this._presetsHtml(H,C):""),this._section("settings",this._config.show_settings?this._settingsHtml(H,C):""),this._section("controls",this._config.show_controls?this._controlsHtml(H,C):""),this._section("details",this._config.show_details?this._detailsHtml(H,C):"")}_renderEmpty(C,H){if(this._emptyShown!==C.reason){this._emptyShown=C.reason,this._signatures={};for(let V of Object.values(this._sections))V.innerHTML="";this._sections.header.innerHTML=`
      <div class="empty">
        ${A("fryer")}
        <div>${i(H(`ui.${C.reason}`))}</div>
      </div>`}}_section(C,H){this._signatures[C]!==H&&(this._signatures[C]=H,this._sections[C].innerHTML=H,this._sections[C].hidden=!H)}_applyHostClasses(C){let H=["wrap"];this._config.compact&&H.push("compact"),this._config.animate||H.push("no-animation"),H.push(`accent-${C.accent}`),C.status===v.COOKING&&H.push("cooking","busy"),C.status===v.PRECOOK&&H.push("preheat","busy","heating"),C.status===v.MAINTAIN&&H.push("cooking"),(C.status===v.PAUSE||C.status===v.USER_ACTION)&&H.push("paused"),C.status===v.FINISH&&H.push("done"),[v.STANDBY,v.POWERSAVE].includes(C.status)&&H.push("off"),C.heating&&V1.includes(C.status)&&H.push("heating"),C.steam&&V1.includes(C.status)&&H.push("steam-mode"),C.drawerOpen&&H.push("drawer-open"),C.probe.plugged&&H.push("probe-plugged"),(C.shake||C.flip)&&H.push("shake-now");let V=H.join(" ");this._wrap.className!==V&&(this._wrap.className=V)}_headerHtml(C,H){let V=i(C.name||H("card_name")),L=C.recipe||(C.method?H(`method.${C.method}`):""),r=[];return C.drawerOpen&&r.push(`<span class="warn" title="${H("ui.drawer")}: ${H("ui.drawer_open")}">${A("drawer")}</span>`),C.probe.plugged&&r.push(`<span title="${H("ui.probe")}">${A("probe")}</span>`),C.error&&r.push(`<span class="bad" title="${H("alert.error")} ${C.error}">${A("error")}</span>`),`
      <div class="header">
        <div>
          <div class="title" data-action="more-info">${V}</div>
          ${L?`<div class="sub">${i(L)}</div>`:""}
        </div>
        <div class="spacer"></div>
        <div class="badges">${r.join("")}</div>
        <div class="pill">${A(this._statusIcon(C))}${i(H(`status.${C.status}`))}</div>
      </div>`}_statusIcon(C){switch(C.status){case v.COOKING:return"heat";case v.PRECOOK:return"temperature";case v.PAUSE:return"pause";case v.USER_ACTION:return"alert";case v.MAINTAIN:return"warm";case v.FINISH:return"check";case v.IDLE:case v.SETTING:case v.PARASETTING:return"play";default:return"power"}}_heroSection(C,H){this._sections.hero.querySelector(".fryer")||(this._sections.hero.innerHTML=`
        <div class="hero">
          <div class="fryer-wrap" data-action="more-info">${x0()}</div>
          <div class="status"></div>
        </div>`,this._statusNode=this._sections.hero.querySelector(".status"));let V=this._statusHtml(C,H);this._signatures.status!==V&&(this._signatures.status=V,this._statusNode.innerHTML=V);let L=S0(C.remaining,H),r=e1.includes(C.status)&&L&&C.remaining>0;u0(this._sections.hero,C.status===v.STANDBY||C.status===v.POWERSAVE?"":r?L.value:"--:--",C.currentTemp!==null&&C.status!==v.STANDBY?`${Math.round(C.currentTemp)}\xB0`:"")}_statusHtml(C,H){let V=[],L=C.status===v.PRECOOK&&C.targetTemp?`<span class="phase-text">${Math.round(C.targetTemp)} ${i(C.tempUnit)}</span>`:C.resting?`<span class="phase-text">${i(H("alert.resting"))}</span>`:"";V.push(`
      <div class="status-line">
        <span class="state-text">${i(H(`status.${C.status}`))}</span>
        ${L}
      </div>`),(C.method||C.recipe)&&V.push(`
        <div class="program-line">
          ${A(d1[C.method]?.icon||"manual")}
          <span>${i(C.recipe||H(`method.${C.method}`))}</span>
        </div>`);let r=S0(C.remaining,H);if(e1.includes(C.status)&&r&&C.remaining>0){let t=C.finishAt?`<span class="at">${A("clock")}${i(H("ui.ready_at"))} ${T(C.finishAt,this._hass)}</span>`:"";V.push(`
        <div class="countdown">
          <span class="value">${r.value}</span><span class="unit">${r.unit}</span>${t}
        </div>`)}else C.status===v.FINISH?V.push(`
        <div class="countdown">
          <span class="at">${A("check")}${i(H("ui.finished_hint"))}</span>
        </div>`):C.controls.temperature?.value&&C.controls.time?.value&&V.push(`
        <div class="countdown">
          <span class="value">${Math.round(C.controls.temperature.value)}\xB0</span>
          <span class="unit">${i(C.tempUnit.replace("\xB0",""))}</span>
          <span class="at">${A("timer")}${Math.round(C.controls.time.value)} ${i(H("ui.minute_short"))}</span>
        </div>`);return(e1.includes(C.status)||C.status===v.FINISH)&&V.push(`<div class="bar"><i style="width:${Math.round(C.progress*100)}%"></i></div>`),V.join("")}_alertsHtml(C,H){let V=[];if(C.error&&V.push({severity:"error",text:`${H("alert.error")}: ${C.error}`,iconName:"error"}),C.drawerOpen){let L=V1.includes(C.status);V.push({severity:L?"warning":"info",text:H(L?"alert.drawer_open":"alert.drawer_open_idle"),iconName:"drawer",pulse:L})}return C.shake&&V.push({severity:"warning",text:H("alert.shake"),iconName:"shake",pulse:!0}),C.flip&&V.push({severity:"warning",text:H("alert.flip"),iconName:"flip",pulse:!0}),C.status===v.USER_ACTION&&!C.shake&&!C.flip&&V.push({severity:"warning",text:H("alert.user_action"),iconName:"alert",pulse:!0}),C.probe.required&&!C.probe.plugged&&V.push({severity:"warning",text:H("alert.probe_required"),iconName:"probe"}),C.resting&&V.push({severity:"info",text:H("alert.resting"),iconName:"timer"}),V.length?`<div class="alerts">${V.map(L=>`<div class="alert ${L.severity}${L.pulse?" pulse":""}">${A(L.iconName)}<span>${i(L.text)}</span></div>`).join("")}</div>`:""}_gaugesHtml(C,H){let V=[],L=i(C.tempUnit);if(C.currentTemp!==null||C.targetTemp!==null){let r=C.currentTemp!==null&&C.targetTemp?Math.min(1,Math.max(0,C.currentTemp/C.targetTemp)):0,t=C.targetTemp!==null&&C.targetTemp>0?`<b>${Math.round(C.currentTemp??0)}</b> / ${Math.round(C.targetTemp)} ${L}`:`<b>${Math.round(C.currentTemp??0)}</b> ${L}`;V.push(`
        <div class="gauge heat">
          <div class="top">${A("temperature")}<span>${i(H("ui.temperature"))}</span>
            <span class="val">${t}</span></div>
          <div class="track"><i style="width:${Math.round(r*100)}%"></i></div>
        </div>`)}if(this._config.show_probe&&C.probe.plugged){let r=C.probe.target?`<b>${Math.round(C.probe.current??0)}</b> / ${Math.round(C.probe.target)} ${L}`:`<b>${Math.round(C.probe.current??0)}</b> ${L}`;V.push(`
        <div class="gauge probe">
          <div class="top">${A("probe")}<span>${i(H("ui.probe_core"))}</span>
            <span class="val">${r}</span></div>
          <div class="track"><i style="width:${Math.round(C.probe.progress*100)}%"></i></div>
        </div>`)}return V.length?`<div class="gauges">${V.join("")}</div>`:""}_methodsHtml(C,H){if(!C.entities.sel_method||!C.methodOptions.length)return"";let V=R1.includes(C.status),L=C.methodOptions.map(t=>{let M=d1[t.key],a=M?H(`method.${t.key}`):t.label,o=H(`method_hint.${t.key}`,"");return`<button class="chip" type="button" data-action="method" data-value="${i(t.label)}"
        aria-pressed="${t.key===C.method}" ${o?`title="${i(o)}"`:""}
        ${V?"":"disabled"}>
        ${A(M?.icon||"manual")}<span>${i(a)}</span></button>`}),r=C.method?i(H(`method_hint.${C.method}`,"")):"";return`
      <div class="section">
        <div class="section-title">${i(H("ui.method"))}</div>
        <div class="chips">${L.join("")}</div>
        ${r?`<div class="note">${r}</div>`:""}
      </div>`}_presetsHtml(C,H){if(!C.entities.sel_preset||!C.presetOptions.length)return"";let V=R1.includes(C.status),L=C.presetOptions.map(r=>`<button class="chip" type="button" data-action="preset" data-value="${i(r)}"
        aria-pressed="${r===C.presetSelected}" ${V?"":"disabled"}>
        ${A("star")}<span>${i(r)}</span></button>`);return`
      <div class="section">
        <div class="section-title">${i(H("ui.presets"))}</div>
        <div class="chips">${L.join("")}</div>
      </div>`}_settingsHtml(C,H){let V=R1.includes(C.status)||C.status===v.PAUSE,L=[],r=(a,o,n,s,l)=>{if(!n||!C.entities[l])return"";let d=n.value??n.min,u=V&&d>n.min,x=V&&d<n.max;return`
        <div class="stepper">
          <span class="label">${i(o)}</span>
          <div class="row">
            <button class="step-btn" type="button" data-action="step" data-value="${a}" data-dir="-1"
              ${u?"":"disabled"} aria-label="\u2212">\u2212</button>
            <span class="value">${Math.round(d)}${i(s)}</span>
            <button class="step-btn" type="button" data-action="step" data-value="${a}" data-dir="1"
              ${x?"":"disabled"} aria-label="+">+</button>
          </div>
        </div>`},t=[r("temperature",H("ui.temperature"),C.controls.temperature,` ${C.tempUnit}`,"num_temp"),r("time",H("ui.cook_time"),C.controls.time,` ${H("ui.minute_short")}`,"num_time"),C.probe.plugged?r("probe",H("ui.probe_core"),C.controls.probe,` ${C.tempUnit}`,"num_probe"):""].filter(Boolean);t.length&&L.push(`<div class="steppers">${t.join("")}</div>`);let M=[];if(C.entities.num_temp&&M.push(...A0.map(a=>`<button class="chip" type="button" data-action="set" data-value="temperature:${a}"
            aria-pressed="${Math.round(C.controls.temperature?.value??-1)===a}" ${V?"":"disabled"}>
            ${A("temperature")}<span>${a}\xB0</span></button>`)),C.entities.num_time&&M.push(...d0.filter(a=>a<=(C.controls.time?.max??60)).map(a=>`<button class="chip" type="button" data-action="set" data-value="time:${a}"
            aria-pressed="${Math.round(C.controls.time?.value??-1)===a}" ${V?"":"disabled"}>
            ${A("timer")}<span>${a} ${i(H("ui.minute_short"))}</span></button>`)),C.entities.num_airspeed){let a=C.controls.airspeed?.value;M.push(`<button class="chip" type="button" data-action="set" data-value="airspeed:1"
          aria-pressed="${a===1}" ${V?"":"disabled"}>
          ${A("fan")}<span>${i(H("ui.airspeed_low"))}</span></button>`,`<button class="chip" type="button" data-action="set" data-value="airspeed:2"
          aria-pressed="${a===2}" ${V?"":"disabled"}>
          ${A("fan")}<span>${i(H("ui.airspeed_high"))}</span></button>`)}if(M.length&&L.push(`<div class="chips">${M.join("")}</div>`),this._config.show_probe&&C.probe.plugged){let a=n0.map(o=>`<div class="row"><span>${i(H(`ui.food.${o.food}`))} \u2013 ${i(H(`ui.doneness.${o.doneness}`))}</span><b>${o.range}</b></div>`).join("");L.push(`
        <details class="core-temps">
          <summary>${i(H("ui.core_temp_help"))}</summary>
          ${a}
        </details>`)}return L.length?`
      <div class="section">
        <div class="section-title">${i(H("ui.settings"))}</div>
        ${L.join("")}
      </div>`:""}_controlsHtml(C,H){let L=(a0[C.status]||[]).filter(t=>C.entities[P1[t].entity]).map(t=>{let M=P1[t],a=C.drawerOpen&&["start"].includes(t);return`<button class="btn ${M.style}" type="button" data-action="command" data-value="${t}"
          ${a?"disabled":""}>
          ${A(M.icon)}<span>${i(H(`command.${t}`))}</span></button>`});if(!L.length)return"";let r=C.drawerOpen?`<div class="note">${A("drawer")}${i(H("alert.drawer_open_idle"))}</div>`:"";return`<div class="section"><div class="controls">${L.join("")}</div>${r}</div>`}_detailsHtml(C,H){let V=[],L=(r,t,M)=>{t==null||t===""||V.push(`
        <div class="detail">
          <span class="k">${i(H(`ui.${r}`))}</span>
          <span class="v">${A(M)}${i(String(t))}</span>
        </div>`)};return C.drawerOpen!==null&&L("drawer",C.drawerOpen?H("ui.drawer_open"):H("ui.drawer_closed"),"drawer"),C.airspeed!==null&&L("airspeed",C.airspeed>=2?H("ui.airspeed_high"):H("ui.airspeed_low"),"fan"),C.total&&L("total_time",`${Math.round(C.total/60)} ${H("ui.minute_short")}`,"timer"),C.preheatEnabled!==null?L("preheat",C.preheatEnabled?H("ui.on"):H("ui.off"),"temperature"):C.preheatStatus&&L("preheat",this._onOff(C.preheatStatus,H),"temperature"),C.keepWarm&&L("keep_warm",this._onOff(C.keepWarm,H),"warm"),C.stage&&L("stage",C.stage,"info"),C.voltage!==null&&L("voltage",`${C.voltage} V`,"info"),C.error&&L("error_code",C.error,"error"),V.length?`
      <div class="section">
        <div class="section-title">${i(H("ui.details"))}</div>
        <div class="details">${V.join("")}</div>
      </div>`:""}_onOff(C,H){let V=String(C).toLowerCase();return["on","true","yes","1"].includes(V)?H("ui.on"):["off","false","no","0"].includes(V)?H("ui.off"):C}_onClick(C){let H=C.target.closest("[data-action]");if(!H||H.hasAttribute("disabled"))return;let{action:V,value:L,dir:r}=H.dataset,t=this._model;if(!(!t?.ok&&V!=="more-info"))switch(V){case"more-info":this._moreInfo(t?.entities?.status);break;case"method":this._haptic("light"),this._call("select","select_option",{entity_id:t.entities.sel_method,option:L});break;case"preset":this._haptic("light"),this._call("select","select_option",{entity_id:t.entities.sel_preset,option:L});break;case"step":this._step(L,Number(r));break;case"set":{let[M,a]=L.split(":");this._setControl(M,Number(a));break}case"command":{let M=P1[L];this._haptic("medium"),this._call(M.service[0],M.service[1],{entity_id:t.entities[M.entity]});break}default:break}}_controlEntity(C){return{temperature:"num_temp",time:"num_time",probe:"num_probe",airspeed:"num_airspeed"}[C]}_step(C,H){let V=this._model.controls[C];if(!V)return;let L=V.value??V.min,r=Math.min(V.max,Math.max(V.min,L+H*V.step));r!==L&&this._setControl(C,r)}_setControl(C,H){let V=this._model.entities[this._controlEntity(C)];if(!V)return;let L=this._model.controls[C],r=L?Math.min(L.max,Math.max(L.min,H)):H;this._haptic("light"),this._call("number","set_value",{entity_id:V,value:r})}_call(C,H,V){return V.entity_id?this._hass.callService(C,H,V):Promise.resolve()}_moreInfo(C){C&&this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:C},bubbles:!0,composed:!0}))}_haptic(C){this.dispatchEvent(new CustomEvent("haptic",{detail:C,bubbles:!0,composed:!0}))}};function h0(){customElements.get(W)||(customElements.define(W,p2),window.customCards=window.customCards||[],window.customCards.push({type:W,name:"Philips Airfryer Card",description:"Rich status card for Philips airfryers: cooking status, drawer, temperature, probe, timers and controls.",preview:!0,documentationURL:"https://github.com/gabor-io/ha-appliance-custom-card"}),console.info(`%c ${W} %c ${M0} `,"color:#fff;background:#f4511e;font-weight:700;border-radius:3px 0 0 3px","color:#f4511e;background:#fbe9e7;font-weight:700;border-radius:0 3px 3px 0"))}var p4=B({cardName:W,toggles:["show_methods","show_presets","show_settings","show_probe","show_details","show_controls","compact","animate"],defaults:s2,listDevices:D1,getLanguage:B1,translator:F1,languages:d2});function f0(){customElements.get(A1)||customElements.define(A1,p4)}f0();h0();var G="skoda-car-card",s1="skoda-car-card-editor",g0="1.10.0",_0=["front_left","front_right","rear_left","rear_right"],l2={front_left:"fl",front_right:"fr",rear_left:"rl",rear_right:"rr"};var y0=["fuel_level","gas_level","battery_percentage"],O0=["range","combustion_range","electric_range","gas_range"],k0=[["last_trip_mileage","range"],["last_trip_travel_time","travel_time"],["last_trip_average_speed","gauge"],["last_trip_average_fuel_consumption","fuel"],["last_trip_average_electric_consumption","charger"],["overall_mileage","odometer"],["overall_travel_time","travel_time"],["overall_average_speed","gauge"],["overall_average_fuel_consumption","fuel"],["overall_average_electric_consumption","charger"]],b0=[["inspection","service"],["inspection_in_km","service"],["oil_service_in_days","adblue"],["oil_service_in_km","adblue"]],w0=[["software_version","software"],["car_captured","history"],["operation","info"],["service_event","info"],["camping_mode_ends_at","ac"]],T0=[["charging_state","charger"],["charging_power","charger"],["charging_rate","charger"],["remaining_charging_time","travel_time"],["target_battery_percentage","battery_car"],["electric_range","range"]];var s4={card_name:"Aut\xF3",status:{parked:"Parkol",moving:"\xDAton",offline:"Nem el\xE9rhet\u0151",charging:"T\xF6lt\xE9s"},opening:{door_front_left:"Bal els\u0151 ajt\xF3",door_front_right:"Jobb els\u0151 ajt\xF3",door_rear_left:"Bal h\xE1ts\xF3 ajt\xF3",door_rear_right:"Jobb h\xE1ts\xF3 ajt\xF3",window_front_left:"Bal els\u0151 ablak",window_front_right:"Jobb els\u0151 ablak",window_rear_left:"Bal h\xE1ts\xF3 ablak",window_rear_right:"Jobb h\xE1ts\xF3 ablak",trunk:"Csomagtart\xF3",bonnet:"Motorh\xE1ztet\u0151",sunroof:"Tet\u0151ablak"},state:{open:"nyitva",closed:"z\xE1rva",lowered:"leh\xFAzva",up:"felh\xFAzva",on:"be",off:"ki",locked:"Z\xE1rva",unlocked:"Nyitva",unknown:"ismeretlen",none:"nincs"},alert:{door_open:"{name} nyitva",doors_open:"{count} ajt\xF3 nyitva",window_open:"{name} leh\xFAzva",windows_open:"{count} ablak leh\xFAzva",trunk_open:"Csomagtart\xF3 nyitva",bonnet_open:"Motorh\xE1ztet\u0151 nyitva",sunroof_open:"Tet\u0151ablak nyitva",lights_on:"Parkol\xF3f\xE9ny \xE9g",unlocked:"Az aut\xF3 nincs lez\xE1rva",all_closed:"Minden ny\xEDl\xE1sz\xE1r\xF3 z\xE1rva",offline:"Az aut\xF3 nem el\xE9rhet\u0151 (alszik vagy nincs t\xE9rer\u0151)"},section:{openings:"Ny\xEDl\xE1sz\xE1r\xF3k",drive:"Menetadatok",trip:"\xD6sszes\xEDtett utak",service:"Szerviz",last_trip:"Utols\xF3 \xFAt",score:"Pontsz\xE1m",charging:"T\xF6lt\xE9s",climate:"Kl\xEDma",system:"Poz\xEDci\xF3 \xE9s rendszer",extra:"Tov\xE1bbi entit\xE1sok"},ui:{range:"Hat\xF3t\xE1v",fuel:"\xDCzemanyag",level:"T\xF6lt\xF6tts\xE9g",odometer:"Km \xF3ra",outside:"K\xFCls\u0151 h\u0151m\xE9rs\xE9klet",adblue:"AdBlue hat\xF3t\xE1v",doors:"Ajt\xF3k",windows:"Ablakok",position:"Hely",last_update:"Utols\xF3 adat",updated:"Friss\xEDtve",not_configured:"Nem tal\xE1lhat\xF3 MySkoda aut\xF3. V\xE1laszd ki az eszk\xF6zt a k\xE1rtya be\xE1ll\xEDt\xE1saiban.",unavailable:"Az aut\xF3 entit\xE1sai nem \xE9rhet\u0151k el.",in_motion:"Mozg\xE1sban",reachable:"online",not_reachable:"offline",battery_protection:"akkumul\xE1tor-v\xE9delem",lights:"Parkol\xF3f\xE9ny",lights_on:"parkol\xF3f\xE9ny \xE9g",charging_plug:"csatlakoztatva",climate_state:"Kl\xEDma",target_temp:"C\xE9l h\u0151m\xE9rs\xE9klet",current_temp:"Bels\u0151 h\u0151m\xE9rs\xE9klet",read_only:"Csak \xE1llapotjelz\xE9s \u2013 a k\xE1rtya nem vez\xE9rli az aut\xF3t."},primary:{outside_temperature:"K\xFCls\u0151 h\u0151m.",adblue_range:"AdBlue",inspection:"Szerviz"},panel:{inspection:"Szerviz",inspection_in_km:"Km-ig",oil_service_in_days:"Olaj",oil_service_in_km:"Olaj km",last_trip_mileage:"T\xE1v",last_trip_travel_time:"Id\u0151",last_trip_average_fuel_consumption:"Fogy.",last_trip_average_electric_consumption:"Fogy.",score_daily:"Napi",score_weekly:"Heti",score_monthly:"Havi"},entity:{mileage:"Km \xF3ra",range:"Hat\xF3t\xE1v",combustion_range:"Hat\xF3t\xE1v (\xFCzemanyag)",electric_range:"Hat\xF3t\xE1v (elektromos)",gas_range:"Hat\xF3t\xE1v (g\xE1z)",fuel_level:"Tankszint",gas_level:"G\xE1zszint",battery_percentage:"Akkumul\xE1tor",adblue_range:"AdBlue hat\xF3t\xE1v",outside_temperature:"K\xFCls\u0151 h\u0151m\xE9rs\xE9klet",inspection:"K\xF6telez\u0151 szervizig",inspection_in_km:"K\xF6telez\u0151 szervizig h\xE1tral\xE9v\u0151 t\xE1v",oil_service_in_days:"Olajcser\xE9ig",oil_service_in_km:"Olajcser\xE9ig h\xE1tral\xE9v\u0151 t\xE1v",software_version:"Szoftver verzi\xF3",car_captured:"Utols\xF3 adat",operation:"Utols\xF3 m\u0171velet",service_event:"Utols\xF3 szervizesem\xE9ny",camping_mode_ends_at:"Camping m\xF3d v\xE9ge",last_trip_mileage:"Utols\xF3 \xFAt \u2013 t\xE1v",last_trip_travel_time:"Utols\xF3 \xFAt \u2013 id\u0151",last_trip_average_speed:"Utols\xF3 \xFAt \u2013 \xE1tlagsebess\xE9g",last_trip_average_fuel_consumption:"Utols\xF3 \xFAt \u2013 fogyaszt\xE1s",last_trip_average_electric_consumption:"Utols\xF3 \xFAt \u2013 fogyaszt\xE1s (el.)",overall_mileage:"\xD6sszesen \u2013 t\xE1v",overall_travel_time:"\xD6sszesen \u2013 id\u0151",overall_average_speed:"\xD6sszesen \u2013 \xE1tlagsebess\xE9g",overall_average_fuel_consumption:"\xD6sszesen \u2013 fogyaszt\xE1s",overall_average_electric_consumption:"\xD6sszesen \u2013 fogyaszt\xE1s (el.)",charging_state:"T\xF6lt\xE9s \xE1llapota",charging_power:"T\xF6lt\xE9si teljes\xEDtm\xE9ny",charging_rate:"T\xF6lt\xE9si sebess\xE9g",charge_type:"T\xF6lt\xE9s t\xEDpusa",remaining_charging_time:"H\xE1tral\xE9v\u0151 t\xF6lt\xE9si id\u0151",target_battery_percentage:"C\xE9l t\xF6lt\xF6tts\xE9g"},editor:{device:"Eszk\xF6z",device_auto:"Automatikus felismer\xE9s",name:"N\xE9v",language:"Nyelv",language_auto:"Automatikus (HA nyelve)",sections:"L\xE1that\xF3 szekci\xF3k",show_alerts:"Figyelmeztet\xE9sek",show_panels:"Szerviz / \xFAt / pontsz\xE1m panelek",show_drive:"Menetadatok",show_trip:"Utak",show_service:"Szerviz",show_charging:"T\xF6lt\xE9s",show_climate:"Kl\xEDma",show_system:"Poz\xEDci\xF3 \xE9s rendszer",show_extra:"Tov\xE1bbi entit\xE1sok",compact:"Kompakt elrendez\xE9s",animate:"Anim\xE1ci\xF3k"}},l4={card_name:"Car",status:{parked:"Parked",moving:"Driving",offline:"Not reachable",charging:"Charging"},opening:{door_front_left:"Front left door",door_front_right:"Front right door",door_rear_left:"Rear left door",door_rear_right:"Rear right door",window_front_left:"Front left window",window_front_right:"Front right window",window_rear_left:"Rear left window",window_rear_right:"Rear right window",trunk:"Trunk",bonnet:"Bonnet",sunroof:"Sunroof"},state:{open:"open",closed:"closed",lowered:"open",up:"closed",on:"on",off:"off",locked:"Locked",unlocked:"Unlocked",unknown:"unknown",none:"not fitted"},alert:{door_open:"{name} is open",doors_open:"{count} doors are open",window_open:"{name} is open",windows_open:"{count} windows are open",trunk_open:"Trunk is open",bonnet_open:"Bonnet is open",sunroof_open:"Sunroof is open",lights_on:"Parking lights are on",unlocked:"The car is not locked",all_closed:"Everything is closed",offline:"The car is not reachable (asleep or out of coverage)"},section:{openings:"Openings",drive:"Drive data",trip:"Overall trips",service:"Service",last_trip:"Last trip",score:"Score",charging:"Charging",climate:"Climate",system:"Position and system",extra:"Other entities"},ui:{range:"Range",fuel:"Fuel",level:"Level",odometer:"Odometer",outside:"Outside temperature",adblue:"AdBlue range",doors:"Doors",windows:"Windows",position:"Location",last_update:"Last update",updated:"Updated",not_configured:"No MySkoda vehicle found. Pick the device in the card settings.",unavailable:"The vehicle entities are unavailable.",in_motion:"In motion",reachable:"online",not_reachable:"offline",battery_protection:"battery protection",lights:"Parking lights",lights_on:"parking lights on",charging_plug:"plugged in",climate_state:"Air conditioning",target_temp:"Target temperature",current_temp:"Cabin temperature",read_only:"Status only - this card never controls the car."},primary:{outside_temperature:"Outside",adblue_range:"AdBlue",inspection:"Service"},panel:{inspection:"Service",inspection_in_km:"In",oil_service_in_days:"Oil",oil_service_in_km:"Oil in",last_trip_mileage:"Distance",last_trip_travel_time:"Time",last_trip_average_fuel_consumption:"Cons.",last_trip_average_electric_consumption:"Cons.",score_daily:"Daily",score_weekly:"Weekly",score_monthly:"Monthly"},entity:{mileage:"Odometer",range:"Range",combustion_range:"Range (fuel)",electric_range:"Range (electric)",gas_range:"Range (gas)",fuel_level:"Fuel level",gas_level:"Gas level",battery_percentage:"Battery",adblue_range:"AdBlue range",outside_temperature:"Outside temperature",inspection:"Next service in",inspection_in_km:"Next service in (distance)",oil_service_in_days:"Oil service in",oil_service_in_km:"Oil service in",software_version:"Software version",car_captured:"Last update",operation:"Last operation",service_event:"Last service event",camping_mode_ends_at:"Camping mode ends",last_trip_mileage:"Last trip - distance",last_trip_travel_time:"Last trip - time",last_trip_average_speed:"Last trip - average speed",last_trip_average_fuel_consumption:"Last trip - consumption",last_trip_average_electric_consumption:"Last trip - consumption (el.)",overall_mileage:"Overall - distance",overall_travel_time:"Overall - time",overall_average_speed:"Overall - average speed",overall_average_fuel_consumption:"Overall - consumption",overall_average_electric_consumption:"Overall - consumption (el.)",charging_state:"Charging state",charging_power:"Charging power",charging_rate:"Charging rate",charge_type:"Charge type",remaining_charging_time:"Remaining charging time",target_battery_percentage:"Target battery level"},editor:{device:"Device",device_auto:"Auto detect",name:"Name",language:"Language",language_auto:"Automatic (HA language)",sections:"Visible sections",show_alerts:"Alerts",show_panels:"Service / trip / score panels",show_drive:"Drive data",show_trip:"Trips",show_service:"Service",show_charging:"Charging",show_climate:"Climate",show_system:"Position and system",show_extra:"Other entities",compact:"Compact layout",animate:"Animations"}},E0={hu:s4,en:l4},m2=Object.keys(E0);function $1(e,C){return E(e,C,m2)}function I1(e){return R(E0,e)}var z1="myskoda",m4={lock_vehicle:["binary_sensor","vehicle_lock","vehicle_locked"],lock_doors:["binary_sensor","doors_lock","doors_locked"],doors_open:["binary_sensor","doors_open","doors_open"],windows_open:["binary_sensor","windows_open","windows"],trunk:["binary_sensor","trunk_open","trunk"],bonnet:["binary_sensor","bonnet_open","bonnet"],sunroof:["binary_sensor","sunroof_open","sunroof"],door_front_left:["binary_sensor","door_open_front_left","door_front_left"],door_front_right:["binary_sensor","door_open_front_right","door_front_right"],door_rear_left:["binary_sensor","door_open_rear_left","door_rear_left"],door_rear_right:["binary_sensor","door_open_rear_right","door_rear_right"],window_front_left:["binary_sensor","window_open_front_left","window_front_left"],window_front_right:["binary_sensor","window_open_front_right","window_front_right"],window_rear_left:["binary_sensor","window_open_rear_left","window_rear_left"],window_rear_right:["binary_sensor","window_open_rear_right","window_rear_right"],lights:["binary_sensor","parkinglights_on","parking_lights"],in_motion:["binary_sensor","vehicle_in_motion","in_motion"],reachable:["binary_sensor","vehicle_reachable","reachable"],battery_protection:["binary_sensor","vehicle_battery_protection","battery_protection"],charger_connected:["binary_sensor","charger_connected","charger_connected"],charger_lock:["binary_sensor","charger_lock","charge_lock"],mileage:["sensor","mileage","mileage"],range:["sensor","range","range"],combustion_range:["sensor","combustion_range","combustion_range"],electric_range:["sensor","electric_range","electric_range"],gas_range:["sensor","gas_range","gas_range"],fuel_level:["sensor","fuel_level","fuel_level"],gas_level:["sensor","gas_level","gas_level"],battery_percentage:["sensor","battery_percentage","battery_percentage"],adblue_range:["sensor","adblue_range","adblue_range"],outside_temperature:["sensor","outside_temperature","outside_temperature"],inspection:["sensor","inspection","next_inspection"],inspection_in_km:["sensor","inspection_in_km","next_inspection_2"],oil_service_in_days:["sensor","oil_service_in_days","oil_service"],oil_service_in_km:["sensor","oil_service_in_km","oil_service_2"],software_version:["sensor","software_version","software_version"],car_captured:["sensor","car_captured","last_updated"],operation:["sensor","operation","last_operation"],service_event:["sensor","service_event","last_service_event"],camping_mode_ends_at:["sensor","camping_mode_ends_at","camping_mode_ends"],last_trip_mileage:["sensor","last_trip_mileage","last_trip_mileage"],last_trip_travel_time:["sensor","last_trip_travel_time","last_trip_travel_time"],last_trip_average_speed:["sensor","last_trip_average_speed","last_trip_average_speed"],last_trip_average_fuel_consumption:["sensor","last_trip_average_fuel_consumption","last_trip_average_fuel_consumption"],last_trip_average_electric_consumption:["sensor","last_trip_average_electric_consumption","last_trip_average_electric_consumption"],overall_mileage:["sensor","overall_mileage","overall_mileage"],overall_travel_time:["sensor","overall_travel_time","overall_travel_time"],overall_average_speed:["sensor","overall_average_speed","overall_average_speed"],overall_average_fuel_consumption:["sensor","overall_average_fuel_consumption","overall_average_fuel_consumption"],overall_average_electric_consumption:["sensor","overall_average_electric_consumption","overall_average_electric_consumption"],charging_state:["sensor","charging_state","charging_state"],charging_power:["sensor","charging_power","charging_power"],charging_rate:["sensor","charging_rate","charging_rate"],charge_type:["sensor","charge_type","charge_type"],remaining_charging_time:["sensor","remaining_charging_time","remaining_charging_time"],target_battery_percentage:["sensor","target_battery_percentage","target_battery_percentage"],score_daily:["sensor","driving_score_daily","driving_score_daily"],score_weekly:["sensor","driving_score_weekly","driving_score_weekly"],score_monthly:["sensor","driving_score_monthly","driving_score_monthly"],position:["device_tracker","device_tracker",null],climate:["climate","climate","air_conditioning"],render:["image","render_vehicle_main","main_render_of_vehicle"]},v4=["sensor","binary_sensor","device_tracker"];function W1(e){return Object.values(e?.entities||{})}function c4(e){return!e.platform||e.platform===z1}function l1(e){let C=new Map;for(let H of W1(e)){if(H.platform!==z1||!H.device_id)continue;let V=e.devices?.[H.device_id];V&&C.set(H.device_id,V.name_by_user||V.name||H.device_id)}return[...C.entries()].map(([H,V])=>({id:H,name:V}))}function x4(e,C){if(C?.device)return C.device;let H=l1(e);return H.length===1?H[0].id:null}function u4(e){let C=Object.keys(e?.states||{}).filter(H=>/^sensor\..+_mileage$/.test(H));return C.length!==1?null:C[0].replace(/^sensor\./,"").replace(/_mileage$/,"")}function Z4(e,C){let H=W1(e).filter(L=>L.device_id===C&&c4(L)).map(L=>L.entity_id.split(".")[1]);if(!H.length)return null;let V=H[0];for(let L of H.slice(1)){let r=0;for(;r<V.length&&r<L.length&&V[r]===L[r];)r+=1;V=V.slice(0,r)}return V.replace(/_+$/,"")||null}function R0(e,C){let H=x4(e,C),V=C?.prefix||Z4(e,H)||u4(e),L=C?.entities||{},r={prefix:V,device:H},t=new Set,M=new Map;for(let a of W1(e))a.platform===z1&&(H&&a.device_id!==H||!a.translation_key||M.has(a.translation_key)||M.set(a.translation_key,a.entity_id));for(let[a,[o,n,s]]of Object.entries(m4)){let l=L[a];if(l){r[a]=l,t.add(l);continue}let d=M.get(n);if(d&&d.startsWith(`${o}.`)&&e?.states?.[d]){r[a]=d,t.add(d);continue}if(!V||!s)continue;let u=`${o}.${V}_${s}`;e?.states?.[u]&&(r[a]=u,t.add(u))}if(!r.position&&V){for(let a of[`device_tracker.${V}`,`device_tracker.${V}_${V}`])if(e?.states?.[a]){r.position=a,t.add(a);break}}return r.extra=W1(e).filter(a=>a.platform===z1&&(!H||a.device_id===H)&&v4.includes(a.entity_id.split(".")[0])&&!t.has(a.entity_id)&&e?.states?.[a.entity_id]).map(a=>a.entity_id).sort(),r}var S4=[["outside_temperature","temperature"],["adblue_range","adblue"],["inspection","service"]],h4=[["outside_temperature","temperature"],["adblue_range","adblue"],["combustion_range","range"],["electric_range","range"],["gas_range","range"],["gas_level","fuel"],["battery_percentage","battery_car"]];function m1(e){if(h(e))return null;let C=Number(e.state);return Number.isFinite(C)?C:null}function F(e){return h(e)?null:e.state==="on"}function P0(e){let C=F(e);return C===null?null:!C}function B0(e){if(!e)return null;let C=new Date(e);return Number.isNaN(C.getTime())?null:C}function F0(e,C){if(!e)return null;let H=C?.locale?.language||C?.language||"hu",V=(e.getTime()-Date.now())/1e3,L=Math.abs(V),r=[["second",1,60],["minute",60,3600],["hour",3600,86400],["day",86400,2592e3],["month",2592e3,31536e3],["year",31536e3,1/0]],[t,M]=r.find(([,,a])=>L<a)||r[r.length-1];try{return new Intl.RelativeTimeFormat(H,{numeric:"auto"}).format(Math.round(V/M),t)}catch{return e.toLocaleString()}}function U(e,C){if(h(C))return null;let H=C.attributes||{};if(H.device_class==="timestamp"){let r=B0(C.state);if(r)return F0(r,e)}if(typeof e?.formatEntityState=="function")try{let r=e.formatEntityState(C);if(r)return r}catch{}let V=Number(C.state);if(Number.isFinite(V)){let r=e?.locale?.language||e?.language||"hu",t;try{t=new Intl.NumberFormat(r,{maximumFractionDigits:1}).format(V)}catch{t=String(V)}return H.unit_of_measurement?`${t} ${H.unit_of_measurement}`:t}let L=String(C.state);return L.charAt(0).toUpperCase()+L.slice(1).replace(/_/g," ")}function f4(e){let C=m1(e),H=(e?.attributes?.unit_of_measurement||"").toLowerCase();return C===null||!["min","m"].includes(H)||C<120?null:`${Math.floor(C/60)} h ${Math.round(C%60)} min`}function I(e,C,H,V=[]){let L=[];for(let[r,t]of H){let M=C[r];if(!M)continue;let a=e.states[M],o=r.endsWith("travel_time")&&f4(a)||U(e,a);o!==null&&(r.endsWith("_range")&&V.includes(o)||L.push({key:r,entityId:M,value:o,icon:t}))}return L}function g4(e,C,H){if(C?.subtitle!==void 0)return C.subtitle||null;let V=H.device?e.devices?.[H.device]:null;if(!V)return null;let L=/(\d{4})$/.exec(V.hw_version||"")?.[1],r=[V.model,L].filter(Boolean);return r.length?r.join(" \xB7 "):null}function _4(e,C,H){if(C?.name)return C.name;let V=H.device?e.devices?.[H.device]:null;return V?V.name_by_user||V.name:(H.mileage?e.states[H.mileage]:null)?.attributes?.friendly_name?.replace(/\s*Mileage$/i,"")||null}function D0(e,C){let H=R0(e,C),V=c=>H[c]?e.states[H[c]]:void 0;if(!Object.keys(H).filter(c=>!["prefix","device","extra"].includes(c)&&H[c]).length)return{ok:!1,reason:H.prefix||H.device?"unavailable":"not_configured",entities:H};let r={},t={},M=[];for(let c of _0){let O=F(V(`door_${c}`)),D=F(V(`window_${c}`));r[l2[c]]=O===!0,t[l2[c]]=D===!0,O!==null&&M.push({key:`door_${c}`,kind:"door",open:O,entityId:H[`door_${c}`]}),D!==null&&M.push({key:`window_${c}`,kind:"window",open:D,entityId:H[`window_${c}`]})}let a=F(V("trunk")),o=F(V("bonnet")),n=F(V("sunroof"));for(let[c,O]of[["trunk",a],["bonnet",o],["sunroof",n]])O!==null&&M.push({key:c,kind:"extra",open:O,entityId:H[c]});let s=y0.find(c=>H[c]&&m1(V(c))!==null),l=O0.find(c=>H[c]&&m1(V(c))!==null),d=s?V(s):null,u=l?V(l):null,x=V("position"),m=F(V("reachable")),S=B0(V("car_captured")?.state),Z=C?.show_panels!==!1,_=new Set([s,l,"mileage","car_captured","outside_temperature","adblue_range","inspection",...Z?["inspection_in_km","oil_service_in_days","last_trip_mileage","last_trip_travel_time","last_trip_average_fuel_consumption","last_trip_average_electric_consumption"]:[]].filter(Boolean)),y=c=>c.filter(([O])=>!_.has(O)),w=[u?U(e,u):null].filter(Boolean);return{ok:!0,entities:H,name:_4(e,C,H),spec:g4(e,C,H),locked:P0(V("lock_vehicle"))??P0(V("lock_doors")),lockEntity:H.lock_vehicle||H.lock_doors||null,moving:F(V("in_motion"))===!0,offline:m===!1,reachable:m,lights:F(V("lights"))===!0,batteryProtection:F(V("battery_protection")),chargerConnected:F(V("charger_connected")),doors:r,windows:t,trunk:a===!0,bonnet:o===!0,sunroof:n,openings:M,openCount:M.filter(c=>c.open).length,level:d?{key:s,entityId:H[s],value:m1(d),unit:d.attributes?.unit_of_measurement||"%"}:null,range:u?{key:l,entityId:H[l],value:m1(u),unit:u.attributes?.unit_of_measurement||"km",text:U(e,u)}:null,odometer:H.mileage?{entityId:H.mileage,text:U(e,V("mileage"))}:null,position:x?{entityId:H.position,address:x.attributes?.parking_address||null,zone:U(e,x)}:null,lastUpdate:S?{entityId:H.car_captured,date:S,text:F0(S,e)}:null,climate:H.climate?(()=>{let c=V("climate");return h(c)||c.state==="invalid"?null:{entityId:H.climate,state:U(e,c),current:c.attributes?.current_temperature??null,target:c.attributes?.temperature??null,unit:e.config?.unit_system?.temperature||"\xB0C"}})():null,primaryRows:I(e,H,S4),panels:{service:I(e,H,[["inspection","service"],["oil_service_in_days","adblue"],["inspection_in_km","service"]]),trip:I(e,H,[["last_trip_mileage","range"],["last_trip_travel_time","travel_time"],["last_trip_average_fuel_consumption","fuel"],["last_trip_average_electric_consumption","charger"]]).slice(0,3),score:I(e,H,[["score_daily","trophy"],["score_weekly","trophy"],["score_monthly","trophy"]])},rows:{drive:I(e,H,y(h4),w),trip:I(e,H,y(k0)),service:I(e,H,y(b0)),charging:I(e,H,y(T0),w),system:I(e,H,y(w0))},extra:(H.extra||[]).map(c=>({entityId:c,name:e.states[c]?.attributes?.friendly_name||c,value:U(e,e.states[c])}))}}var v2="M130 24 C104 24 86 28 72 36 C58 44 48 60 45 80 C42 100 41 120 41 150 C41 220 41 320 41 390 C41 430 43 455 46 468 C49 482 56 492 68 494 C86 497 174 497 192 494 C204 492 211 482 214 468 C217 455 219 430 219 390 C219 320 219 220 219 150 C219 120 218 100 215 80 C212 60 202 44 188 36 C174 28 156 24 130 24 Z",N0={fl:{x:41,y:230,w:26,h:76,hinge:[42,230]},rl:{x:41,y:308,w:26,h:68,hinge:[42,308]},fr:{x:193,y:230,w:26,h:76,hinge:[218,230]},rr:{x:193,y:308,w:26,h:68,hinge:[218,308]}},c2={fl:{arm:"M43 242 L34 238 Q28 239 28 245 Q28 251 34 251 L43 251 Z",glass:"M41 242 L35 240 Q31 241 31 245 Q31 249 35 249 L41 249 Z"},fr:{arm:"M217 242 L226 238 Q232 239 232 245 Q232 251 226 251 L217 251 Z",glass:"M219 242 L225 240 Q229 241 229 245 Q229 249 225 249 L219 249 Z"}};function y4(e){let C=N0[e],H=e==="fl"||e==="rl",V=H?C.x+C.w-9:C.x+2,L=H?C.x+2:C.x+C.w-5,r=c2[e]?`<path class="mirror-arm" d="${c2[e].arm}"/><path class="mirror-glass" d="${c2[e].glass}"/>`:"";return`
    <g class="door" data-door="${e}" style="--hinge-x:${C.hinge[0]}px;--hinge-y:${C.hinge[1]}px;">
      <rect class="panel" x="${C.x}" y="${C.y}" width="${C.w}" height="${C.h}" rx="2"/>
      <rect class="panel-shade" x="${C.x}" y="${C.y}" width="${C.w}" height="${C.h}" rx="2"/>
      <rect class="window${e.startsWith("r")?" tinted":""}" data-window="${e}"
        x="${V}" y="${C.y+7}" width="7" height="${C.h-14}" rx="2.5"/>
      <rect class="handle" x="${L}" y="${C.y+C.h-30}" width="3" height="13" rx="1.5"/>
      ${r}
    </g>`}function $0(){return`
<svg class="car" viewBox="0 0 260 528" role="img" aria-hidden="true">
  <defs>
    <clipPath id="car-body"><path d="${v2}"/></clipPath>

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
  <path class="contact" d="${v2}" filter="url(#car-contact)"/>

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

  <path class="outline" d="${v2}"/>

  ${Object.keys(N0).map(y4).join("")}

  <!-- sunroof marker, only drawn when the car reports one -->
  <rect class="sunroof" x="92" y="244" width="76" height="86" rx="10"/>
</svg>`}function I0(e,C){let H=e.querySelector(".car");if(!H)return;let V=(r,t,M)=>{r&&r.classList.toggle(t,!!M)};for(let[r,t]of Object.entries(C.doors))V(H.querySelector(`[data-door="${r}"]`),"open",t);for(let[r,t]of Object.entries(C.windows))V(H.querySelector(`[data-window="${r}"]`),"open",t);V(H.querySelector(".bonnet"),"open",C.bonnet),V(H.querySelector(".trunk"),"open",C.trunk);let L=H.querySelector(".sunroof");V(L,"visible",C.sunroof!==null),V(L,"open",C.sunroof),H.classList.toggle("lights-on",!!C.lights),H.classList.toggle("offline",!!C.offline)}var O4=`
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
`,z0=`${P}
${O4}`;var u2={language:"auto",compact:!1,animate:!0,show_alerts:!0,show_panels:!0,show_drive:!0,show_trip:!0,show_service:!0,show_charging:!0,show_climate:!0,show_system:!0,show_extra:!1},k4=[{name:"drive",option:"show_drive",icon:"range"},{name:"trip",option:"show_trip",icon:"trip"},{name:"service",option:"show_service",icon:"service"},{name:"charging",option:"show_charging",icon:"charger"},{name:"system",option:"show_system",icon:"marker"}],x2=class extends HTMLElement{static getConfigElement(){return document.createElement(s1)}static getStubConfig(C){let H=l1(C);return{type:`custom:${G}`,device:H[0]?.id}}constructor(){super(),this.attachShadow({mode:"open"}),this._sections={},this._signatures={},this._open={},this._built=!1}setConfig(C){this._config={...u2,...C||{}},this._signatures={},this._hass&&this._render()}set hass(C){this._hass=C,this._render()}get hass(){return this._hass}connectedCallback(){this._timer=window.setInterval(()=>this._render(),6e4)}disconnectedCallback(){this._timer&&window.clearInterval(this._timer),this._timer=void 0}getCardSize(){return this._config?.compact?5:8}getGridOptions(){return{columns:12,min_columns:6,rows:"auto"}}_build(){let C=document.createElement("style");C.textContent=z0;let H=document.createElement("ha-card"),V=document.createElement("div");V.className="wrap",V.addEventListener("click",L=>this._onClick(L)),V.addEventListener("toggle",L=>this._onToggle(L),!0);for(let L of["header","hero","alerts","panels","folds","footer"]){let r=document.createElement("div");r.dataset.section=L,this._sections[L]=r,V.appendChild(r)}H.appendChild(V),this.shadowRoot.replaceChildren(C,H),this._wrap=V,this._built=!0}_render(){if(!this._hass||!this._config)return;this._built||this._build();let C=I1($1(this._config,this._hass)),H=D0(this._hass,this._config);if(this._model=H,!H.ok){this._renderEmpty(H,C);return}this._emptyShown=!1,this._applyHostClasses(H),this._section("header",this._headerHtml(H,C)),this._heroSection(H,C),this._section("alerts",this._config.show_alerts?this._alertsHtml(H,C):""),this._section("panels",this._config.show_panels?this._panelsHtml(H,C):""),this._section("folds",this._foldsHtml(H,C)),this._section("footer",this._footerHtml(H,C))}_renderEmpty(C,H){if(this._emptyShown!==C.reason){this._emptyShown=C.reason,this._signatures={};for(let V of Object.values(this._sections))V.innerHTML="",V.hidden=!1;this._sections.header.innerHTML=`
      <div class="empty">
        ${A("car")}
        <div>${i(H(`ui.${C.reason}`))}</div>
      </div>`}}_section(C,H){this._signatures[C]!==H&&(this._signatures[C]=H,this._sections[C].innerHTML=H,this._sections[C].hidden=!H)}_applyHostClasses(C){let H=["wrap"];this._config.compact&&H.push("compact"),this._config.animate||H.push("no-animation"),this._hass.themes?.darkMode&&H.push("dark"),H.push(`accent-${this._accent(C)}`);let V=H.join(" ");this._wrap.className!==V&&(this._wrap.className=V)}_accent(C){return C.offline?"idle":C.openCount?"paused":C.moving?"running":C.locked===!1?"paused":"ready"}_headerHtml(C,H){let V=i(C.name||H("card_name")),L=C.spec||"",r=[];C.lights&&r.push(`<span class="warn" title="${i(H("ui.lights"))}">${A("lights")}</span>`),C.offline&&r.push(`<span title="${i(H("ui.not_reachable"))}">${A("wifi_off")}</span>`);let t=C.locked===null?"":`<div class="pill" data-action="more-info" data-entity="${i(C.lockEntity||"")}">
            ${A(C.locked?"lock":"lock_open")}
            ${i(H(C.locked?"state.locked":"state.unlocked"))}
          </div>`;return`
      <div class="header">
        <div>
          <div class="title" data-action="more-info">${V}</div>
          ${L?`<div class="sub">${i(L)}</div>`:""}
        </div>
        <div class="spacer"></div>
        <div class="badges">${r.join("")}</div>
        ${t}
      </div>`}_heroSection(C,H){this._sections.hero.querySelector(".car")||(this._sections.hero.innerHTML=`
        <div class="split">
          <div class="stage" data-action="more-info">${$0()}</div>
          <div class="primary"></div>
        </div>`,this._primaryNode=this._sections.hero.querySelector(".primary"));let V=this._primaryHtml(C,H);this._signatures.primary!==V&&(this._signatures.primary=V,this._primaryNode.innerHTML=V),I0(this._sections.hero,C)}_primaryHtml(C,H){let V=[],L=C.offline?"offline":C.moving?"moving":"parked",r=[];if(C.reachable!==null&&r.push(H(C.reachable?"ui.reachable":"ui.not_reachable")),C.lights&&r.push(H("ui.lights_on")),C.chargerConnected&&r.push(H("ui.charging_plug")),C.batteryProtection&&r.push(H("ui.battery_protection")),V.push(`
      <div class="state-block">
        <div class="state-text">${i(H(`status.${L}`))}</div>
        ${r.length?`<div class="state-sub">${i(r.join(" \xB7 "))}</div>`:""}
      </div>`),C.level){let t=Math.max(0,Math.min(100,Math.round(C.level.value))),M=t<=10?" empty-tank":t<=25?" low":"",a=C.level.key==="battery_percentage"?"level":"fuel",o=C.range?.text?`<b>${t} ${i(C.level.unit)}</b> \xB7 ${i(C.range.text)}`:`<b>${t} ${i(C.level.unit)}</b>`;V.push(`
        <div class="metric${M}" data-action="more-info" data-entity="${i(C.level.entityId)}">
          <div class="top">${A(a==="level"?"battery_car":"fuel")}
            <span>${i(H(`ui.${a}`))}</span><span class="val">${o}</span></div>
          <div class="bar"><i style="width:${t}%"></i></div>
        </div>`)}else C.range?.text&&V.push(this._lineHtml("range",H("ui.range"),C.range.text,C.range.entityId));C.odometer?.text&&V.push(this._lineHtml("odometer",H("ui.odometer"),C.odometer.text,C.odometer.entityId));for(let t of C.primaryRows)V.push(this._lineHtml(t.icon,H(`primary.${t.key}`,H(`entity.${t.key}`,t.key)),t.value,t.entityId));return V.join("")}_panelsHtml(C,H){let V=(r,t)=>{if(!t.length)return"";let M=t.map(a=>`
          <div class="line" data-action="more-info" data-entity="${i(a.entityId)}">
            <span>${i(H(`panel.${a.key}`,H(`entity.${a.key}`,a.key)))}</span>
            <b>${i(a.value)}</b>
          </div>`).join("");return`
        <div class="panel">
          <h4>${i(H(`section.${r}`))}</h4>
          ${M}
        </div>`},L=[V("service",C.panels.service),V("last_trip",C.panels.trip),V("score",C.panels.score)].filter(Boolean);return L.length?`<div class="panels">${L.join("")}</div>`:""}_footerHtml(C,H){let V=C.position?.address||C.position?.zone,L=C.position?.entityId||C.entities.car_captured||"";return`${V||C.lastUpdate?`
        <div class="footer" data-action="more-info" data-entity="${i(L)}">
          <span class="k">${A("marker")}<span>${i(V||H("ui.position"))}</span></span>
          ${C.lastUpdate?`<span class="v">${i(C.lastUpdate.text)}</span>`:""}
        </div>`:""}
      <div class="readonly">${A("info")}<span>${i(H("ui.read_only"))}</span></div>`}_lineHtml(C,H,V,L){return`
      <div class="line" data-action="more-info" data-entity="${i(L||"")}">
        <span class="k">${A(C)}<span>${i(H)}</span></span>
        <span class="v">${i(V)}</span>
      </div>`}_alertsHtml(C,H){let V=[];C.offline&&V.push({severity:"info",text:H("alert.offline"),iconName:"wifi_off"});let L=M=>C.openings.filter(a=>a.open&&a.kind===M),r=L("door"),t=L("window");if(r.length>2)V.push({severity:"warning",text:H("alert.doors_open").replace("{count}",r.length),iconName:"car_door",entityId:C.entities.doors_open});else for(let M of r)V.push({severity:"warning",text:H("alert.door_open").replace("{name}",H(`opening.${M.key}`)),iconName:"car_door",entityId:M.entityId});if(t.length>2)V.push({severity:"error",text:H("alert.windows_open").replace("{count}",t.length),iconName:"window_open",entityId:C.entities.windows_open});else for(let M of t)V.push({severity:"error",text:H("alert.window_open").replace("{name}",H(`opening.${M.key}`)),iconName:"window_open",entityId:M.entityId});for(let M of L("extra"))V.push({severity:"warning",text:H(`alert.${M.key}_open`),iconName:M.key==="trunk"?"trunk":M.key==="bonnet"?"bonnet":"sunroof",entityId:M.entityId});return C.locked===!1&&V.push({severity:"warning",text:H("alert.unlocked"),iconName:"lock_open",entityId:C.lockEntity}),C.lights&&V.push({severity:"warning",text:H("alert.lights_on"),iconName:"lights",entityId:C.entities.lights}),!V.length&&C.openings.length&&V.push({severity:"ok",text:H("alert.all_closed"),iconName:"check"}),V.length?`<div class="alerts">${V.map(M=>`
        <div class="alert ${M.severity==="ok"?"info ok":M.severity}"
          data-action="more-info" data-entity="${i(M.entityId||"")}">
          ${A(M.iconName)}<span>${i(M.text)}</span>
        </div>`).join("")}</div>`:""}_foldsHtml(C,H){let V=[];for(let L of k4){if(!this._config[L.option])continue;let r=C.rows[L.name]||[],t=L.name==="system"?this._systemExtras(C,H):[];if(!r.length&&!t.length)continue;let M=[...t,...r.map(a=>this._lineHtml(a.icon,H(`entity.${a.key}`,a.key),a.value,a.entityId))].join("");V.push(this._foldHtml(L.name,L.icon,H(`section.${L.name}`),M))}if(this._config.show_climate&&C.climate){let L=[this._lineHtml("ac",H("ui.climate_state"),C.climate.state,C.climate.entityId)];C.climate.current!==null&&L.push(this._lineHtml("snowflake",H("ui.current_temp"),`${C.climate.current} ${C.climate.unit}`,C.climate.entityId)),C.climate.target!==null&&L.push(this._lineHtml("ac",H("ui.target_temp"),`${C.climate.target} ${C.climate.unit}`,C.climate.entityId)),V.push(this._foldHtml("climate","ac",H("section.climate"),L.join("")))}if(this._config.show_extra&&C.extra.length){let L=C.extra.map(r=>this._lineHtml("info",r.name,r.value??"\u2013",r.entityId)).join("");V.push(this._foldHtml("extra","info",H("section.extra"),L))}return V.join("")}_systemExtras(C,H){let V=[];return C.position&&V.push(this._lineHtml("marker",H("ui.position"),C.position.address||C.position.zone||"\u2013",C.position.entityId)),C.batteryProtection!==null&&V.push(this._lineHtml("battery_car",H("ui.battery_protection"),H(C.batteryProtection?"state.on":"state.off"),C.entities.battery_protection)),V}_foldHtml(C,H,V,L){let r=this._open[C]?" open":"";return`
      <details class="fold" data-fold="${C}"${r}>
        <summary>${A(H)}<span>${i(V)}</span>${A("chevron","icon chev")}</summary>
        <div class="body">${L}</div>
      </details>`}_onToggle(C){let H=C.target;H?.dataset?.fold&&(this._open[H.dataset.fold]=H.open)}_onClick(C){let H=C.target.closest("[data-action]");if(!H||H.dataset.action!=="more-info")return;let V=H.dataset.entity||this._model?.entities?.lock_vehicle||this._model?.entities?.mileage||this._model?.entities?.position;V&&this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:V},bubbles:!0,composed:!0}))}};function W0(){customElements.get(G)||(customElements.define(G,x2),window.customCards=window.customCards||[],window.customCards.push({type:G,name:"\u0160koda Car Card",description:"Top-view status card for \u0160koda vehicles (MySkoda): doors, windows, range, service and trips. Status only.",preview:!0,documentationURL:"https://github.com/gabor-io/ha-appliance-custom-card"}),console.info(`%c ${G} %c ${g0} `,"color:#fff;background:#0e3a2f;font-weight:700;border-radius:3px 0 0 3px","color:#0e3a2f;background:#d6f2e6;font-weight:700;border-radius:0 3px 3px 0"))}var b4=B({cardName:G,toggles:["show_alerts","show_panels","show_drive","show_trip","show_service","show_charging","show_climate","show_system","show_extra","compact","animate"],defaults:u2,listDevices:l1,getLanguage:$1,translator:I1,languages:m2});function G0(){customElements.get(s1)||customElements.define(s1,b4)}G0();W0();var Q="liebherr-fridge-card",v1="liebherr-fridge-card-editor",U0="1.10.0",Q0=["top","middle","bottom"],c1={top:"top_zone",middle:"middle_zone",bottom:"bottom_zone"},r1={supercool:["super_cool","supercool","snowflake"],superfrost:["super_frost","superfrost","frost"]},x1={nightmode:["night_mode","nightmode","night"],partymode:["party_mode","partymode","party"]},t1={icemaker:["ice_maker","icemaker","ice"],hydrobreeze:["hydro_breeze","hydrobreeze","mist"],biofresh:["bio_fresh_plus","biofresh_plus","leaf"]},K0=[2,4,5,7],Z2=.6;var w4={card_name:"H\u0171t\u0151",zone:{single:"H\u0171t\u0151t\xE9r",top:"Fels\u0151 z\xF3na",middle:"K\xF6z\xE9ps\u0151 z\xF3na",bottom:"Als\xF3 z\xF3na"},mode:{supercool:"SuperCool",superfrost:"SuperFrost",nightmode:"\xC9jszakai m\xF3d",partymode:"PartyMode",light:"Bels\u0151 vil\xE1g\xEDt\xE1s"},mode_hint:{supercool:"Gyors leh\u0171t\xE9s friss bev\xE1s\xE1rl\xE1s ut\xE1n; a g\xE9p egy id\u0151 ut\xE1n mag\xE1t\xF3l kikapcsolja.",superfrost:"Gyorsfagyaszt\xE1s: a fagyaszt\xF3t\xE9r a betett \xE9tel meg\xF3v\xE1s\xE1\xE9rt m\xE9lyh\u0171t.",nightmode:"A kijelz\u0151 \xE9s a hangjelz\xE9sek elhalv\xE1nyulnak \xE9jszak\xE1ra.",partymode:"Italh\u0171t\xE9s vend\xE9gs\xE9gre: a g\xE9p er\u0151sebben h\u0171t."},select:{icemaker:"J\xE9gk\xE9sz\xEDt\u0151",hydrobreeze:"HydroBreeze",biofresh:"BioFresh-Plus"},option:{off:"Ki",on:"Be",low:"Alacsony",medium:"K\xF6zepes",high:"Magas",max_ice:"MaxIce",minus_two_minus_two:"-2 \xB0C | -2 \xB0C",minus_two_zero:"-2 \xB0C | 0 \xB0C",zero_minus_two:"0 \xB0C | -2 \xB0C",zero_zero:"0 \xB0C | 0 \xB0C"},alert:{door_open:"Az ajt\xF3 nyitva \u2013 csukd be, hogy tartsa a h\u0151m\xE9rs\xE9kletet"},status:{normal:"Norm\xE1l \xFCzem",cooling:"H\u0171t",supercool:"SuperCool",superfrost:"SuperFrost",party:"PartyMode",night:"\xC9jszakai m\xF3d"},ui:{current:"Aktu\xE1lis",target:"C\xE9l",setpoint:"Be\xE1ll\xEDtott h\u0151m\xE9rs\xE9klet",at_target:"H\u0151m\xE9rs\xE9kleten",cooling_down:"H\u0171t a be\xE1ll\xEDtott \xE9rt\xE9kre",above_target:"{diff} \xB0C-kal melegebb a be\xE1ll\xEDtottn\xE1l",below_target:"{diff} \xB0C-kal hidegebb a be\xE1ll\xEDtottn\xE1l",boosting_cool:"SuperCool: gyors leh\u0171t\xE9s fut",boosting_frost:"SuperFrost: gyorsfagyaszt\xE1s fut",modes:"\xDCzemm\xF3dok",zones:"Z\xF3n\xE1k",details:"R\xE9szletek",model:"T\xEDpus",zone_count:"Z\xF3n\xE1k sz\xE1ma",door:"AutoDoor",door_open:"Az ajt\xF3 nyitva",door_state:"Ajt\xF3",light_level:"F\xE9nyer\u0151",other:"Tov\xE1bbi entit\xE1sok",not_configured:"Nem tal\xE1lhat\xF3 Liebherr k\xE9sz\xFCl\xE9k. V\xE1laszd ki az eszk\xF6zt a k\xE1rtya be\xE1ll\xEDt\xE1saiban.",unavailable:"A k\xE9sz\xFCl\xE9k entit\xE1sai nem \xE9rhet\u0151k el.",open:"nyitva",closed:"z\xE1rva"},editor:{device:"Eszk\xF6z",device_auto:"Automatikus felismer\xE9s",name:"N\xE9v",language:"Nyelv",language_auto:"Automatikus (HA nyelve)",sections:"L\xE1that\xF3 szekci\xF3k",show_zones:"Z\xF3n\xE1k \xE9s h\u0151m\xE9rs\xE9klet-\xE1ll\xEDt\xE1s",show_modes:"\xDCzemm\xF3dok",show_selects:"BioFresh / HydroBreeze / j\xE9gk\xE9sz\xEDt\u0151",show_details:"R\xE9szletek",show_extra:"Tov\xE1bbi entit\xE1sok",compact:"Kompakt elrendez\xE9s",animate:"Anim\xE1ci\xF3k"}},T4={card_name:"Fridge",zone:{single:"Fridge",top:"Top zone",middle:"Middle zone",bottom:"Bottom zone"},mode:{supercool:"SuperCool",superfrost:"SuperFrost",nightmode:"Night mode",partymode:"PartyMode",light:"Interior light"},mode_hint:{supercool:"Rapid cooling after a big shop; the appliance turns it off again by itself.",superfrost:"Rapid freezing so fresh food keeps what is already frozen.",nightmode:"Dims the display and the alarms for the night.",partymode:"Chills drinks faster for guests."},select:{icemaker:"Ice maker",hydrobreeze:"HydroBreeze",biofresh:"BioFresh-Plus"},option:{off:"Off",on:"On",low:"Low",medium:"Medium",high:"High",max_ice:"MaxIce",minus_two_minus_two:"-2 \xB0C | -2 \xB0C",minus_two_zero:"-2 \xB0C | 0 \xB0C",zero_minus_two:"0 \xB0C | -2 \xB0C",zero_zero:"0 \xB0C | 0 \xB0C"},alert:{door_open:"The door is open - close it to keep the temperature"},status:{normal:"Running",cooling:"Cooling",supercool:"SuperCool",superfrost:"SuperFrost",party:"PartyMode",night:"Night mode"},ui:{current:"Current",target:"Target",setpoint:"Setpoint",at_target:"At temperature",cooling_down:"Cooling to the setpoint",above_target:"{diff} \xB0C above the setpoint",below_target:"{diff} \xB0C below the setpoint",boosting_cool:"SuperCool is running",boosting_frost:"SuperFrost is running",modes:"Modes",zones:"Zones",details:"Details",model:"Model",zone_count:"Zones",door:"AutoDoor",door_open:"The door is open",door_state:"Door",light_level:"Brightness",other:"Other entities",not_configured:"No Liebherr appliance found. Pick the device in the card settings.",unavailable:"The appliance entities are unavailable.",open:"open",closed:"closed"},editor:{device:"Device",device_auto:"Auto detect",name:"Name",language:"Language",language_auto:"Automatic (HA language)",sections:"Visible sections",show_zones:"Zones and temperature control",show_modes:"Modes",show_selects:"BioFresh / HydroBreeze / ice maker",show_details:"Details",show_extra:"Other entities",compact:"Compact layout",animate:"Animations"}},j0={hu:w4,en:T4},S2=Object.keys(j0);function G1(e,C){return E(e,C,S2)}function U1(e){return R(j0,e)}var h2="liebherr";function f2(e){return Object.values(e?.entities||{})}function u1(e){let C=new Map;for(let H of f2(e)){if(H.platform!==h2||!H.device_id)continue;let V=e.devices?.[H.device_id];V&&C.set(H.device_id,V.name_by_user||V.name||H.device_id)}return[...C.entries()].map(([H,V])=>({id:H,name:V}))}function E4(e,C){if(C?.device)return C.device;let H=u1(e);return H.length===1?H[0].id:null}function R4(e){let C=Object.keys(e?.states||{}).filter(H=>/^number\..+_setpoint(_temperature)?$/.test(H));return C.length!==1?null:C[0].replace(/^number\./,"").replace(/_setpoint(_temperature)?$/,"")}function P4(e,C){let H=f2(e).filter(L=>L.device_id===C&&L.platform===h2).map(L=>L.entity_id.split(".")[1]);if(!H.length)return null;let V=H[0];for(let L of H.slice(1)){let r=0;for(;r<V.length&&r<L.length&&V[r]===L[r];)r+=1;V=V.slice(0,r)}return V.replace(/_+$/,"")||null}function Y0(e,C){let H=E4(e,C),V=C?.prefix||P4(e,H)||R4(e),L=C?.entities||{},r=new Set,t=f2(e).filter(m=>m.platform===h2&&(!H||m.device_id===H)),M=new Map;for(let m of t)m.translation_key&&!M.has(m.translation_key)&&M.set(m.translation_key,m.entity_id);let a=m=>m&&e?.states?.[m]?m:null,o=(m,S,Z,_)=>{let y=_?`${S}_${c1[_]}`:S,w=M.get(y);if(w&&w.startsWith(`${m}.`)&&a(w))return w;if(!V||!Z)return null;let c=_?`${V}_${c1[_]}_${Z}`:`${V}_${Z}`;return a(`${m}.${c}`)},n=m=>{if(m){let Z=M.get(c1[m]);return Z&&Z.startsWith("sensor.")&&a(Z)?Z:V?a(`sensor.${V}_${c1[m]}`):null}let S=t.find(Z=>Z.entity_id.startsWith("sensor.")&&!Z.translation_key&&e?.states?.[Z.entity_id]?.attributes?.device_class==="temperature");return S?S.entity_id:V?a(`sensor.${V}`):null},s=m=>{let S={position:m};S.temp=n(m),S.setpoint=o("number","setpoint_temperature","setpoint",m);for(let[Z,[_,y]]of Object.entries(r1))S[Z]=o("switch",_,y,m);for(let[Z,[_,y]]of Object.entries(t1))S[Z]=o("select",_,y,m);return S.autodoor=o("cover","auto_door","autodoor",m),S},l=Q0.map(s).filter(m=>m.setpoint||m.temp),d={...s(null),temp:n(null)},u=l.length?l:d.setpoint||d.temp?[d]:[],x={device:H,prefix:V,zones:u,light:o("light","presentation_light","presentation_light",null)};for(let[m,[S,Z]]of Object.entries(x1))x[m]=o("switch",S,Z,null);for(let[m,S]of Object.entries(L)){let Z=/^zone(\d)_(.+)$/.exec(m);if(Z){let _=x.zones[Number(Z[1])-1];_&&(_[Z[2]]=S);continue}x[m]=S}for(let m of x.zones)for(let S of Object.values(m))typeof S=="string"&&r.add(S);for(let m of["light",...Object.keys(x1)])x[m]&&r.add(x[m]);return x.extra=t.map(m=>m.entity_id).filter(m=>!r.has(m)&&e?.states?.[m]).sort(),x}function X0(e){if(h(e))return null;let C=Number(e.state);return Number.isFinite(C)?C:null}function g2(e){return h(e)?null:e.state==="on"}function B4(e){if(!e||h(e))return null;let C=e.attributes||{};return{value:X0(e),min:Number.isFinite(C.min)?C.min:2,max:Number.isFinite(C.max)?C.max:9,step:Number.isFinite(C.step)&&C.step>0?C.step:1,unit:C.unit_of_measurement||"\xB0C"}}function q0(e){if(!e||h(e))return null;let C=String(e.state).toLowerCase();return["on","open","opening"].includes(C)?!0:["off","closed","closing"].includes(C)?!1:null}function F4(e){if(!e||h(e))return null;let C=e.attributes?.options;return{state:e.state,options:Array.isArray(C)?C:[]}}function D4(e,C,H){if(C?.name)return C.name;let V=H.device?e.devices?.[H.device]:null;return V?V.name_by_user||V.name:(H.zones[0]?.temp?e.states[H.zones[0].temp]:null)?.attributes?.friendly_name||null}function N4(e,C,H){if(C?.subtitle!==void 0)return C.subtitle||null;let V=H.device?e.devices?.[H.device]:null;return V&&(V.model_id||V.model)||null}function J0(e,C){let H=Y0(e,C),V=n=>n?e.states[n]:void 0;if(!H.zones.length)return{ok:!1,reason:H.device||H.prefix?"unavailable":"not_configured",entities:H};let L=H.zones.map((n,s)=>{let l=B4(V(n.setpoint)),d=X0(V(n.temp)),u=V(n.temp)?.attributes?.unit_of_measurement||l?.unit||"\xB0C",x=l?.value??null,m={};for(let Z of Object.keys(r1))m[Z]=n[Z]?{entityId:n[Z],on:g2(V(n[Z]))}:null;let S={};for(let Z of Object.keys(t1))S[Z]=n[Z]?{entityId:n[Z],...F4(V(n[Z]))}:null;return{index:s,position:n.position,entityIds:n,current:d,target:x,unit:u,setpoint:l,switches:m,selects:S,autodoor:n.autodoor?{entityId:n.autodoor,state:V(n.autodoor)?.state}:null,door:(()=>{let Z=n.door||n.autodoor;return Z?{entityId:Z,open:q0(V(Z))}:null})(),warming:d!==null&&x!==null?d-x>Z2:!1,atTarget:d!==null&&x!==null?Math.abs(d-x)<=Z2:null}}),r={};for(let n of Object.keys(x1))r[n]=H[n]?{entityId:H[n],on:g2(V(H[n]))}:null;let t=H.door?{entityId:H.door,open:q0(V(H.door))}:null,M=L.map((n,s)=>({index:s,zone:n})).filter(({zone:n})=>n.door?.open===!0);t?.open===!0&&!M.length&&M.push({index:0,zone:L[0]});let a=V(H.light),o=L.some(n=>n.switches.supercool?.on||n.switches.superfrost?.on);return{ok:!0,entities:H,name:D4(e,C,H),model:N4(e,C,H),zones:L,modes:r,light:a?{entityId:H.light,on:g2(a),brightness:a.attributes?.brightness??null}:null,boosting:o,door:t,openDoors:M.map(({index:n})=>n),doorOpen:M.length>0,nightMode:r.nightmode?.on===!0,partyMode:r.partymode?.on===!0,cooling:o||L.some(n=>n.warming),extra:(H.extra||[]).map(n=>({entityId:n,name:e.states[n]?.attributes?.friendly_name||n,state:e.states[n]?.state}))}}function $4(e){let C=Math.min(Math.max(e,1),3),H=C===1?[1]:C===2?[1.55,1]:[1.4,1,1],V=H.reduce((M,a)=>M+a,0),L=248-6*(C-1),r=[],t=8;for(let M of H){let a=L*M/V;r.push({y:t,height:a}),t+=a+6}return r}function I4(e,C){let{y:H,height:V}=e,L={x:34,y:H+22,w:108,h:V-36};return`
  <g class="compartment" data-zone="${C}">
    <g class="interior" clip-path="url(#fridge-inner-${C})">
      <rect class="cavity" x="${L.x}" y="${L.y}" width="${L.w}" height="${L.h}" rx="5"/>
      <rect class="glow" x="${L.x}" y="${L.y}" width="${L.w}" height="${L.h}" rx="5"/>
      <g class="shelves">
        ${[.3,.56].map(r=>`<rect x="${L.x+6}" y="${(L.y+L.h*r).toFixed(1)}" width="${L.w-12}" height="3" rx="1.5"/>`).join("")}
        <rect class="drawer" x="${L.x+6}" y="${(L.y+L.h*.76).toFixed(1)}"
          width="${L.w-12}" height="${(L.h*.2).toFixed(1)}" rx="3"/>
      </g>
      <g class="airflow">
        ${[.2,.45,.7].map((r,t)=>`<path style="--delay:${t*.5}s" d="M${L.x+14} ${(L.y+L.h*r).toFixed(1)} h${L.w-28}"/>`).join("")}
      </g>
      <g class="flakes">
        ${[[.28,.18],[.62,.12],[.45,.42],[.78,.3]].map(([r,t],M)=>`<g transform="translate(${(L.x+L.w*r).toFixed(1)} ${(L.y+L.h*t).toFixed(1)})">
                 <g class="flake" style="--delay:${M*.7}s">
                   <path d="M0 -4 V4 M-3.5 -2 L3.5 2 M-3.5 2 L3.5 -2"/>
                 </g>
               </g>`).join("")}
      </g>
    </g>
    <rect class="inner-frame" x="${L.x}" y="${L.y}" width="${L.w}" height="${L.h}" rx="5"/>
  </g>`}function z4(e,C,H){let{y:V,height:L}=e,r={x:34,y:V+22,w:108,h:L-36},t=C===0;return`
  <g class="door" data-zone="${C}" style="--hinge-y:${(V+L/2).toFixed(1)}px">
    <rect class="door-panel" x="22" y="${V}" width="156" height="${L}" rx="8"/>
    <rect class="door-shade" x="22" y="${V}" width="156" height="${L}" rx="8"/>
    <rect class="door-inset" x="${r.x}" y="${r.y}" width="${r.w}" height="${r.h}" rx="5"/>

    ${t?`<g class="display">
             <rect class="display-body" x="${r.x}" y="${V+7}" width="${r.w}" height="12" rx="3"/>
             <text class="display-text" x="${r.x+r.w/2}" y="${V+16.4}" text-anchor="middle">--</text>
             <circle class="display-led" cx="${r.x+7}" cy="${V+13}" r="2"/>
           </g>`:""}

    <rect class="handle" x="150" y="${V+12}" width="7" height="${Math.max(24,L-30)}" rx="3.5"/>
    ${H>1&&C<H-1?`<path class="seam" d="M22 ${(V+L+6/2).toFixed(1)} H178"/>`:""}
  </g>`}function C7(e=1){let C=$4(e),H=C.map((V,L)=>`<clipPath id="fridge-inner-${L}"><rect x="34" y="${V.y+22}" width="108" height="${V.height-36}" rx="5"/></clipPath>`).join("");return`
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
  ${C.map((V,L)=>I4(V,L)).join("")}
  ${C.map((V,L)=>z4(V,L,C.length)).join("")}
  <g class="feet"><rect x="26" y="258" width="14" height="5" rx="2"/><rect x="160" y="258" width="14" height="5" rx="2"/></g>
</svg>`}function H7(e,C){let H=e.querySelector(".display-text");H&&H.textContent!==C&&(H.textContent=C)}var W4=`
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
`,V7=`${P}
${W4}`;var O2={language:"auto",compact:!1,animate:!0,show_zones:!0,show_modes:!0,show_selects:!0,show_details:!0,show_extra:!1},_2={supercool:"snowflake",superfrost:"frost",nightmode:"night",partymode:"party"},G4={icemaker:"ice",hydrobreeze:"mist",biofresh:"leaf"},y2=class extends HTMLElement{static getConfigElement(){return document.createElement(v1)}static getStubConfig(C){let H=u1(C);return{type:`custom:${Q}`,device:H[0]?.id}}constructor(){super(),this.attachShadow({mode:"open"}),this._sections={},this._signatures={},this._built=!1}setConfig(C){this._config={...O2,...C||{}},this._signatures={},this._hass&&this._render()}set hass(C){this._hass=C,this._render()}get hass(){return this._hass}getCardSize(){return this._config?.compact?4:7}getGridOptions(){return{columns:12,min_columns:6,rows:"auto"}}_build(){let C=document.createElement("style");C.textContent=V7;let H=document.createElement("ha-card"),V=document.createElement("div");V.className="wrap",V.addEventListener("click",L=>this._onClick(L));for(let L of["header","hero","alerts","zones","modes","selects","details"]){let r=document.createElement("div");r.dataset.section=L,this._sections[L]=r,V.appendChild(r)}H.appendChild(V),this.shadowRoot.replaceChildren(C,H),this._wrap=V,this._built=!0}_render(){if(!this._hass||!this._config)return;this._built||this._build();let C=U1(G1(this._config,this._hass)),H=J0(this._hass,this._config);if(this._model=H,!H.ok){this._renderEmpty(H,C);return}this._emptyShown=!1,this._applyHostClasses(H),this._section("header",this._headerHtml(H,C)),this._heroSection(H,C),this._section("alerts",this._alertsHtml(H,C)),this._section("zones",this._config.show_zones?this._zonesHtml(H,C):""),this._section("modes",this._config.show_modes?this._modesHtml(H,C):""),this._section("selects",this._config.show_selects?this._selectsHtml(H,C):""),this._section("details",this._detailsHtml(H,C))}_renderEmpty(C,H){if(this._emptyShown!==C.reason){this._emptyShown=C.reason,this._signatures={};for(let V of Object.values(this._sections))V.innerHTML="",V.hidden=!1;this._sections.header.innerHTML=`
      <div class="empty">
        ${A("fridge")}
        <div>${i(H(`ui.${C.reason}`))}</div>
      </div>`}}_section(C,H){this._signatures[C]!==H&&(this._signatures[C]=H,this._sections[C].innerHTML=H,this._sections[C].hidden=!H)}_applyHostClasses(C){let H=["wrap"];this._config.compact&&H.push("compact"),this._config.animate||H.push("no-animation"),this._hass.themes?.darkMode&&H.push("dark"),H.push(`accent-${this._accent(C)}`);let V=H.join(" ");this._wrap.className!==V&&(this._wrap.className=V)}_accent(C){return C.boosting?"running":C.nightMode?"idle":C.cooling?"running":"ready"}_status(C){return C.zones.some(H=>H.switches.superfrost?.on)?"superfrost":C.zones.some(H=>H.switches.supercool?.on)?"supercool":C.partyMode?"party":C.nightMode?"night":C.cooling?"cooling":"normal"}_headerHtml(C,H){let V=[];C.doorOpen&&V.push(`<span class="warn" title="${i(H("ui.door_open"))}">${A("door")}</span>`),C.nightMode&&V.push(`<span title="${i(H("mode.nightmode"))}">${A("night")}</span>`),C.partyMode&&V.push(`<span title="${i(H("mode.partymode"))}">${A("party")}</span>`),C.light?.on&&V.push(`<span title="${i(H("mode.light"))}">${A("bulb")}</span>`);let L=this._status(C);return`
      <div class="header">
        <div>
          <div class="title" data-action="more-info">${i(C.name||H("card_name"))}</div>
          ${C.model?`<div class="sub">${i(C.model)}</div>`:""}
        </div>
        <div class="spacer"></div>
        <div class="badges">${V.join("")}</div>
        <div class="pill">${A(L==="night"?"night":L==="party"?"party":"snowflake")}
          ${i(H(`status.${L}`))}</div>
      </div>`}_alertsHtml(C,H){if(!C.doorOpen)return"";let V=C.door?.entityId||C.zones[C.openDoors[0]]?.door?.entityId||"",L=C.zones.length>1&&C.openDoors.length?` \xB7 ${H(`zone.${C.zones[C.openDoors[0]].position||"single"}`)}`:"";return`
      <div class="alerts">
        <div class="alert pulse" data-action="more-info" data-entity="${i(V)}">
          ${A("door")}<span>${i(H("alert.door_open")+L)}</span>
        </div>
      </div>`}_heroSection(C,H){let V=C.zones.length;(!this._sections.hero.querySelector(".fridge")||this._zoneCount!==V)&&(this._zoneCount=V,this._sections.hero.innerHTML=`
        <div class="hero">
          <div class="fridge-wrap" data-action="more-info">${C7(V)}</div>
          <div class="status"></div>
        </div>`,this._statusNode=this._sections.hero.querySelector(".status"),this._signatures.status=void 0);let L=this._statusHtml(C,H);this._signatures.status!==L&&(this._signatures.status=L,this._statusNode.innerHTML=L);let r=this._sections.hero.querySelector(".fridge");r&&(r.classList.toggle("cooling",C.cooling),r.classList.toggle("boost",C.boosting),r.classList.toggle("night",C.nightMode),r.classList.toggle("light-on",!!C.light?.on),r.classList.toggle("door-open",C.doorOpen),r.querySelectorAll(".door").forEach(M=>{M.classList.toggle("open",C.openDoors.includes(Number(M.dataset.zone)))}));let t=C.zones[0];H7(this._sections.hero,t?.current!==null&&t?.current!==void 0?`${f(t.current,0)}\xB0`:"--")}_statusHtml(C,H){let V=C.zones[0],L=[];if(V?.current!==null&&V?.current!==void 0){let M=V.target!==null?`<span class="aim">${A("target")}${i(H("ui.target"))} ${f(V.target,0)} ${i(V.unit)}</span>`:"";L.push(`
        <div class="reading">
          <span class="value">${f(V.current,1)}</span>
          <span class="unit">${i(V.unit)}</span>
          ${M}
        </div>`)}let r=this._zoneHint(V,H);r&&L.push(`<div class="phase-text">${i(r)}</div>`);let t=[];for(let M of C.zones)for(let[a,o]of Object.entries(M.switches))o?.on&&t.push(`<span class="fact">${A(_2[a])}${i(H(`mode.${a}`))}${C.zones.length>1?` \xB7 ${i(H(`zone.${M.position||"single"}`))}`:""}</span>`);return C.nightMode&&t.push(`<span class="fact">${A("night")}${i(H("mode.nightmode"))}</span>`),t.length&&L.push(`<div class="facts">${t.join("")}</div>`),L.join("")}_zoneHint(C,H){if(!C||C.current===null||C.target===null)return"";if(C.switches.supercool?.on)return H("ui.boosting_cool");if(C.switches.superfrost?.on)return H("ui.boosting_frost");if(C.atTarget)return H("ui.at_target");let V=C.current-C.target;return V>0?H("ui.above_target").replace("{diff}",f(V,1)):H("ui.below_target").replace("{diff}",f(-V,1))}_zonesHtml(C,H){let V=C.zones.map((L,r)=>{let t=H(`zone.${L.position||"single"}`),M=C.zones.length>1,a=M&&L.current!==null?`<span class="now"><b>${f(L.current,1)}</b> ${i(L.unit)}</span>`:"",o=L.setpoint,n=o?`
          <div class="row">
            <button class="step-btn" type="button" data-action="step" data-zone="${r}" data-dir="-1"
              ${o.value!==null&&o.value<=o.min?"disabled":""}>\u2212</button>
            <div class="target">${o.value!==null?f(o.value,0):"\u2013"}<small>${i(o.unit)}</small></div>
            <button class="step-btn" type="button" data-action="step" data-zone="${r}" data-dir="1"
              ${o.value!==null&&o.value>=o.max?"disabled":""}>+</button>
            <div class="spacer"></div>
            <div class="chips">${this._presetsHtml(L,r)}</div>
          </div>`:"",s=M?this._zoneHint(L,H):"";return`
        <div class="zone ${L.atTarget?"at-target":""}">
          <div class="zone-head">${A("temperature")}<span>${i(M?t:H("ui.setpoint"))}</span>${a}</div>
          ${n}
          ${s?`<div class="hint">${i(s)}</div>`:""}
        </div>`});return V.length?`
      <div class="section">
        ${C.zones.length>1?`<div class="section-title">${i(H("ui.zones"))}</div>`:""}
        <div class="zones">${V.join("")}</div>
      </div>`:""}_presetsHtml(C,H){let V=C.setpoint;return V?K0.filter(L=>L>=V.min&&L<=V.max).map(L=>`
        <button class="chip" type="button" data-action="set" data-zone="${H}" data-value="${L}"
          aria-pressed="${V.value===L}">${L}\xB0</button>`).join(""):""}_modesHtml(C,H){let V=[];C.zones.forEach((L,r)=>{for(let t of Object.keys(r1)){let M=L.switches[t];if(!M)continue;let a=C.zones.length>1?`${H(`mode.${t}`)} \xB7 ${H(`zone.${L.position||"single"}`)}`:H(`mode.${t}`);V.push(`
          <button class="chip" type="button" data-action="toggle" data-entity="${i(M.entityId)}"
            aria-pressed="${M.on===!0}" title="${i(H(`mode_hint.${t}`,""))}">
            ${A(_2[t])}<span>${i(a)}</span></button>`)}});for(let L of["nightmode","partymode"]){let r=C.modes[L];r&&V.push(`
        <button class="chip" type="button" data-action="toggle" data-entity="${i(r.entityId)}"
          aria-pressed="${r.on===!0}" title="${i(H(`mode_hint.${L}`,""))}">
          ${A(_2[L])}<span>${i(H(`mode.${L}`))}</span></button>`)}return C.light&&V.push(`
        <button class="chip" type="button" data-action="toggle" data-entity="${i(C.light.entityId)}"
          aria-pressed="${C.light.on===!0}">
          ${A("bulb")}<span>${i(H("mode.light"))}</span></button>`),V.length?`
      <div class="section">
        <div class="section-title">${i(H("ui.modes"))}</div>
        <div class="chips">${V.join("")}</div>
      </div>`:""}_selectsHtml(C,H){let V=[];for(let L of C.zones)for(let r of Object.keys(t1)){let t=L.selects[r];if(!t||!t.options.length)continue;let M=C.zones.length>1?`${H(`select.${r}`)} \xB7 ${H(`zone.${L.position||"single"}`)}`:H(`select.${r}`),a=t.options.map(o=>`
            <button class="chip" type="button" data-action="select" data-entity="${i(t.entityId)}"
              data-value="${i(o)}" aria-pressed="${t.state===o}">
              ${i(H(`option.${o}`,o))}</button>`).join("");V.push(`
          <div class="section">
            <div class="section-title">${A(G4[r])} ${i(M)}</div>
            <div class="chips">${a}</div>
          </div>`)}return V.join("")}_detailsHtml(C,H){let V=[],L=(r,t,M)=>{t==null||t===""||V.push(`
        <div class="detail">
          <span class="k">${i(H(`ui.${r}`,r))}</span>
          <span class="v">${A(M)}${i(String(t))}</span>
        </div>`)};if(this._config.show_details){C.zones.length>1&&L("zone_count",C.zones.length,"fridge");for(let r of C.zones)r.autodoor?.state&&L("door",H(r.autodoor.state==="open"?"ui.open":"ui.closed"),"door");C.light?.brightness!==null&&C.light?.brightness!==void 0&&L("light_level",`${Math.round(C.light.brightness/255*100)} %`,"bulb")}if(this._config.show_extra)for(let r of C.extra)V.push(`
          <div class="detail" data-action="more-info" data-entity="${i(r.entityId)}">
            <span class="k">${i(r.name)}</span>
            <span class="v">${A("info")}${i(String(r.state??"\u2013"))}</span>
          </div>`);return V.length?`
      <div class="section">
        <div class="section-title">${i(H("ui.details"))}</div>
        <div class="details">${V.join("")}</div>
      </div>`:""}_onClick(C){let H=C.target.closest("[data-action]");if(!H||H.hasAttribute("disabled"))return;let{action:V,entity:L,value:r,zone:t,dir:M}=H.dataset,a=this._model;if(!(!a?.ok&&V!=="more-info"))switch(V){case"more-info":this._moreInfo(L||a?.zones?.[0]?.entityIds?.temp);break;case"toggle":this._haptic("light"),this._call(L.split(".")[0],"toggle",{entity_id:L});break;case"select":this._haptic("light"),this._call("select","select_option",{entity_id:L,option:r});break;case"step":this._step(Number(t),Number(M));break;case"set":this._setTemperature(Number(t),Number(r));break;default:break}}_step(C,H){let V=this._model?.zones?.[C]?.setpoint;if(!V)return;let L=V.value??V.min,r=Math.min(V.max,Math.max(V.min,L+H*V.step));r!==L&&this._setTemperature(C,r)}_setTemperature(C,H){let V=this._model?.zones?.[C];if(!V?.setpoint||!V.entityIds.setpoint)return;let L=Math.min(V.setpoint.max,Math.max(V.setpoint.min,H));this._haptic("light"),this._call("number","set_value",{entity_id:V.entityIds.setpoint,value:L})}_call(C,H,V){return V.entity_id?this._hass.callService(C,H,V):Promise.resolve()}_moreInfo(C){C&&this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:C},bubbles:!0,composed:!0}))}_haptic(C){this.dispatchEvent(new CustomEvent("haptic",{detail:C,bubbles:!0,composed:!0}))}};function L7(){customElements.get(Q)||(customElements.define(Q,y2),window.customCards=window.customCards||[],window.customCards.push({type:Q,name:"Liebherr Fridge Card",description:"Card for Liebherr fridges and freezers: temperature per zone, SuperCool / SuperFrost, night mode and BioFresh.",preview:!0,documentationURL:"https://github.com/gabor-io/ha-appliance-custom-card"}),console.info(`%c ${Q} %c ${U0} `,"color:#fff;background:#0b6ea8;font-weight:700;border-radius:3px 0 0 3px","color:#0b6ea8;background:#e1f3fb;font-weight:700;border-radius:0 3px 3px 0"))}var U4=B({cardName:Q,toggles:["show_zones","show_modes","show_selects","show_details","show_extra","compact","animate"],defaults:O2,listDevices:u1,getLanguage:G1,translator:U1,languages:S2});function e7(){customElements.get(v1)||customElements.define(v1,U4)}e7();L7();var K="fisher-erv-card",Z1="fisher-erv-card-editor",r7="1.10.0",Q1=[{key:"manual",option:"Manual",icon:"manual"},{key:"auto",option:"auto",icon:"auto"},{key:"sleep",option:"sleep",icon:"sleep"},{key:"pure_l",option:"Pure L",icon:"leaf"},{key:"pure_m",option:"Pure M",icon:"leaf"},{key:"pure_h",option:"Pure H",icon:"leaf"}],K1=[{key:"supply",icon:"supply"},{key:"exhaust",icon:"exhaust"}],t7=[{max:600,level:"excellent"},{max:800,level:"good"},{max:1e3,level:"fair"},{max:1400,level:"poor"},{max:1/0,level:"bad"}],M7=[{max:10,level:"excellent"},{max:15,level:"good"},{max:25,level:"fair"},{max:50,level:"poor"},{max:1/0,level:"bad"}],i7=14;var Q4={card_name:"Szell\u0151ztet\u0151",preset:{manual:"K\xE9zi",auto:"Automata",sleep:"Alv\xF3",pure_l:"Pure L",pure_m:"Pure M",pure_h:"Pure H"},preset_hint:{manual:"A k\xE9t ventil\xE1tor fordulatsz\xE1m\xE1t te \xE1ll\xEDtod.",auto:"A g\xE9p a m\xE9rt CO\u2082 alapj\xE1n szab\xE1lyoz.",sleep:"Halk \xE9jszakai \xFCzem, minim\xE1lis fordulatsz\xE1mon.",pure_l:"Tiszt\xEDt\xE1s alacsony fokozaton.",pure_m:"Tiszt\xEDt\xE1s k\xF6zepes fokozaton.",pure_h:"Tiszt\xEDt\xE1s magas fokozaton."},level:{excellent:"Kiv\xE1l\xF3",good:"J\xF3",fair:"Megfelel\u0151",poor:"M\xE9rs\xE9kelt",bad:"Rossz"},alert:{problem:"A k\xE9sz\xFCl\xE9k hib\xE1t jelez",problem_code:"A k\xE9sz\xFCl\xE9k hib\xE1t jelez (k\xF3d: {code})",filter_due:"A sz\u0171r\u0151 \xE9lettartama lej\xE1r: {days} nap van h\xE1tra",filter_over:"A sz\u0171r\u0151 \xE9lettartama lej\xE1rt \u2013 cser\xE9ld ki, majd null\xE1zd",co2_high:"Magas CO\u2082-szint: {value} ppm \u2013 \xE9rdemes szell\u0151ztetni"},ui:{co2:"Sz\xE9n-dioxid",pm25:"Sz\xE1ll\xF3 por (PM2,5)",temperature:"H\u0151m\xE9rs\xE9klet",humidity:"P\xE1ratartalom",modes:"\xDCzemm\xF3dok",speeds:"Fordulatsz\xE1m",supply:"Bef\xFAv\xE1s",exhaust:"Elsz\xEDv\xE1s",filter:"Sz\u0171r\u0151",filter_left:"H\xE1tral\xE9v\u0151 \xE9lettartam",filter_lifespan:"Sz\u0171r\u0151 \xE9lettartama",filter_reset:"Sz\u0171r\u0151 null\xE1z\xE1sa",details:"R\xE9szletek",other:"Tov\xE1bbi entit\xE1sok",off:"Kikapcsolva",on:"M\u0171k\xF6dik",power_on:"Bekapcsol\xE1s",power_off:"Kikapcsol\xE1s",not_configured:"Nem tal\xE1lhat\xF3 Tuya szell\u0151ztet\u0151. V\xE1laszd ki az eszk\xF6zt a k\xE1rtya be\xE1ll\xEDt\xE1saiban.",unavailable:"A k\xE9sz\xFCl\xE9k entit\xE1sai nem \xE9rhet\u0151k el.",days:"nap",no_pm25:"A k\xE9sz\xFCl\xE9k nem k\xFCld PM2,5 \xE9rt\xE9ket"},editor:{device:"Eszk\xF6z",device_auto:"Automatikus felismer\xE9s",name:"N\xE9v",language:"Nyelv",language_auto:"Automatikus (HA nyelve)",sections:"L\xE1that\xF3 szekci\xF3k",show_air:"Leveg\u0151min\u0151s\xE9g",show_pm25:"PM2,5 csempe",show_modes:"\xDCzemm\xF3dok",show_speeds:"Fordulatsz\xE1mok",show_filter:"Sz\u0171r\u0151",show_extra:"Tov\xE1bbi entit\xE1sok",compact:"Kompakt elrendez\xE9s",animate:"Anim\xE1ci\xF3k"}},K4={card_name:"Ventilator",preset:{manual:"Manual",auto:"Auto",sleep:"Sleep",pure_l:"Pure L",pure_m:"Pure M",pure_h:"Pure H"},preset_hint:{manual:"You set both fan speeds yourself.",auto:"The appliance follows the measured CO\u2082.",sleep:"Quiet night mode at the lowest speed.",pure_l:"Cleaning at low speed.",pure_m:"Cleaning at medium speed.",pure_h:"Cleaning at high speed."},level:{excellent:"Excellent",good:"Good",fair:"Fair",poor:"Poor",bad:"Bad"},alert:{problem:"The appliance reports a fault",problem_code:"The appliance reports a fault (code {code})",filter_due:"Filter life is running out: {days} days left",filter_over:"Filter life is over - replace it and reset the counter",co2_high:"High CO\u2082: {value} ppm - time to ventilate"},ui:{co2:"Carbon dioxide",pm25:"Particulates (PM2.5)",temperature:"Temperature",humidity:"Humidity",modes:"Modes",speeds:"Fan speed",supply:"Supply",exhaust:"Exhaust",filter:"Filter",filter_left:"Life left",filter_lifespan:"Filter lifespan",filter_reset:"Reset filter",details:"Details",other:"Other entities",off:"Off",on:"Running",power_on:"Turn on",power_off:"Turn off",not_configured:"No Tuya ventilator found. Pick the device in the card settings.",unavailable:"The appliance entities are unavailable.",days:"days",no_pm25:"The appliance reports no PM2.5 value"},editor:{device:"Device",device_auto:"Auto detect",name:"Name",language:"Language",language_auto:"Automatic (HA language)",sections:"Visible sections",show_air:"Air quality",show_pm25:"PM2.5 tile",show_modes:"Modes",show_speeds:"Fan speeds",show_filter:"Filter",show_extra:"Other entities",compact:"Compact layout",animate:"Animations"}},a7={hu:Q4,en:K4},k2=Object.keys(a7);function j1(e,C){return E(e,C,k2)}function Y1(e){return R(a7,e)}var o7="tuya_local";function n7(e){return Object.values(e?.entities||{})}function S1(e){let C=new Map;for(let H of n7(e)){if(H.platform!==o7||!H.device_id||!H.entity_id.startsWith("fan."))continue;let V=e.devices?.[H.device_id];V&&C.set(H.device_id,V.name_by_user||V.name||H.device_id)}return[...C.entries()].map(([H,V])=>({id:H,name:V}))}function j4(e,C){if(C?.device)return C.device;let H=S1(e);return H.length===1?H[0].id:null}function Y4(e){let C=Object.keys(e?.states||{}).filter(H=>H.startsWith("fan."));return C.length===1?C[0].slice(4):null}function A7(e,C){let H=j4(e,C),V=C?.prefix||Y4(e),L=C?.entities||{},r=n7(e).filter(d=>d.platform===o7&&(H?d.device_id===H:!0)&&e?.states?.[d.entity_id]),t=r.length?r.map(d=>d.entity_id):Object.keys(e?.states||{}).filter(d=>V&&d.includes(V)),M=d=>e?.states?.[d],a=d=>d.split(".")[0],o=d=>M(d)?.attributes?.device_class||null,n=(d,{deviceClass:u=null,hint:x=null}={})=>t.find(m=>!(a(m)!==d||u&&o(m)!==u||x&&!m.includes(x)))||null,s={device:H,prefix:V,fan:n("fan"),co2:n("sensor",{deviceClass:"carbon_dioxide"}),pm25:n("sensor",{deviceClass:"pm25"}),humidity:n("sensor",{deviceClass:"humidity"}),temperature:n("sensor",{deviceClass:"temperature"}),filter_life:n("sensor",{deviceClass:"duration"}),filter_lifespan:n("select"),filter_reset:n("button"),problem:n("binary_sensor",{deviceClass:"problem"}),supply:n("number",{hint:"supply"})||n("number"),exhaust:n("number",{hint:"exhaust"})};s.exhaust&&s.exhaust===s.supply&&(s.exhaust=null),s.exhaust||(s.exhaust=t.find(d=>a(d)==="number"&&d!==s.supply)||null);for(let[d,u]of Object.entries(L))s[d]=u;let l=new Set(Object.values(s).filter(d=>typeof d=="string"&&d.includes(".")));return s.extra=t.filter(d=>!l.has(d)).sort(),s}function h1(e){if(h(e))return null;let C=Number(e.state);return Number.isFinite(C)?C:null}function d7(e,C){if(!e||h(e))return null;let H=h1(e);if(H===null)return null;let V=C.find(r=>H<=r.max)||C[C.length-1],L=C[C.length-2]?.max||1;return{value:H,unit:e.attributes?.unit_of_measurement||"",level:V.level,ratio:Math.max(0,Math.min(1,H/L))}}function q4(e){if(!e||h(e))return null;let C=e.attributes||{};return{value:h1(e),min:Number.isFinite(C.min)?C.min:1,max:Number.isFinite(C.max)?C.max:8,step:Number.isFinite(C.step)&&C.step>0?C.step:1}}function p7(e,C,H){if(C?.name)return C.name;let V=H.device?e.devices?.[H.device]:null;return V?V.name_by_user||V.name:e.states[H.fan]?.attributes?.friendly_name||null}function X4(e,C,H,V){if(C?.subtitle!==void 0)return C.subtitle||null;let L=H.device?e.devices?.[H.device]:null;if(!L)return null;let r=(V||"").toLowerCase();return[L.model_id,L.model].filter(Boolean).find(M=>!r.includes(String(M).toLowerCase()))||null}function s7(e,C){let H=A7(e,C),V=x=>x?e.states[x]:void 0,L=V(H.fan);if(!L)return{ok:!1,reason:H.device||H.prefix?"unavailable":"not_configured",entities:H};let r=L.state==="on",t=L.attributes?.preset_mode||null,M=Array.isArray(L.attributes?.preset_modes)?L.attributes.preset_modes:[],a=Q1.find(x=>x.option===t)||null,o={};for(let{key:x}of K1){let m=H[x];o[x]=m?{entityId:m,...q4(V(m))||{}}:null}let n=h1(V(H.filter_life)),s=V(H.filter_lifespan),l=V(H.problem),d=d7(V(H.co2),t7),u=d7(V(H.pm25),M7);return{ok:!0,entities:H,name:p7(e,C,H),model:X4(e,C,H,p7(e,C,H)),on:r,preset:a,presetOption:t,presetOptions:M,co2:d,pm25:u,temperature:h1(V(H.temperature)),temperatureUnit:V(H.temperature)?.attributes?.unit_of_measurement||"\xB0C",humidity:h1(V(H.humidity)),speeds:o,speedDigit:o.supply?.value??o.exhaust?.value??null,filter:{days:n,entityId:H.filter_life,due:n!==null&&n<=i7,lifespan:s?{entityId:H.filter_lifespan,state:s.state,options:Array.isArray(s.attributes?.options)?s.attributes.options:[]}:null,reset:H.filter_reset||null},problem:l?{entityId:H.problem,on:l.state==="on",code:l.attributes?.fault_code??null}:null,extra:(H.extra||[]).map(x=>({entityId:x,name:e.states[x]?.attributes?.friendly_name||x,state:e.states[x]?.state}))}}function l7(){return`
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
      ${[36,58,80].map((e,C)=>`<path style="--delay:${C*.4}s" d="M${e} 36 V196"/>`).join("")}
    </g>
    <g class="stream out">
      ${[47,69,91].map((e,C)=>`<path style="--delay:${C*.4+.2}s" d="M${e} 196 V36"/>`).join("")}
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
</svg>`}function m7(e,{co2:C,temp:H,humidity:V,speed:L,clock:r}){let t=(a,o)=>{let n=e.querySelector(a);n&&o!==void 0&&n.textContent!==o&&(n.textContent=o)};t(".erv .co2-value",C),t(".erv .speed",L),t(".erv .clock",r);let M=e.querySelectorAll(".erv text.small");M[0]&&M[0].textContent!==H&&(M[0].textContent=H),M[1]&&M[1].textContent!==V&&(M[1].textContent=V)}var J4=`
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
`,v7=`${P}
${J4}`;var w2={language:"auto",compact:!1,animate:!0,show_air:!0,show_pm25:!0,show_modes:!0,show_speeds:!0,show_filter:!0,show_extra:!1},b2=class extends HTMLElement{static getConfigElement(){return document.createElement(Z1)}static getStubConfig(C){let H=S1(C);return{type:`custom:${K}`,device:H[0]?.id}}constructor(){super(),this.attachShadow({mode:"open"}),this._sections={},this._signatures={},this._built=!1}setConfig(C){this._config={...w2,...C||{}},this._signatures={},this._hass&&this._render()}set hass(C){this._hass=C,this._render()}get hass(){return this._hass}connectedCallback(){this._timer=window.setInterval(()=>this._render(),3e4)}disconnectedCallback(){this._timer&&window.clearInterval(this._timer),this._timer=void 0}getCardSize(){return this._config?.compact?5:8}getGridOptions(){return{columns:12,min_columns:6,rows:"auto"}}_build(){let C=document.createElement("style");C.textContent=v7;let H=document.createElement("ha-card"),V=document.createElement("div");V.className="wrap",V.addEventListener("click",L=>this._onClick(L));for(let L of["header","hero","alerts","modes","speeds","filter","details"]){let r=document.createElement("div");r.dataset.section=L,this._sections[L]=r,V.appendChild(r)}H.appendChild(V),this.shadowRoot.replaceChildren(C,H),this._wrap=V,this._built=!0}_render(){if(!this._hass||!this._config)return;this._built||this._build();let C=Y1(j1(this._config,this._hass)),H=s7(this._hass,this._config);if(this._model=H,!H.ok){this._renderEmpty(H,C);return}this._emptyShown=!1,this._applyHostClasses(H),this._section("header",this._headerHtml(H,C)),this._heroSection(H,C),this._section("alerts",this._alertsHtml(H,C)),this._section("modes",this._config.show_modes?this._modesHtml(H,C):""),this._section("speeds",this._config.show_speeds?this._speedsHtml(H,C):""),this._section("filter",this._config.show_filter?this._filterHtml(H,C):""),this._section("details",this._detailsHtml(H,C))}_renderEmpty(C,H){if(this._emptyShown!==C.reason){this._emptyShown=C.reason,this._signatures={};for(let V of Object.values(this._sections))V.innerHTML="",V.hidden=!1;this._sections.header.innerHTML=`
      <div class="empty">
        ${A("wind")}
        <div>${i(H(`ui.${C.reason}`))}</div>
      </div>`}}_section(C,H){this._signatures[C]!==H&&(this._signatures[C]=H,this._sections[C].innerHTML=H,this._sections[C].hidden=!H)}_applyHostClasses(C){let H=["wrap"];this._config.compact&&H.push("compact"),this._config.animate||H.push("no-animation"),this._hass.themes?.darkMode&&H.push("dark"),H.push(`accent-${this._accent(C)}`);let V=H.join(" ");this._wrap.className!==V&&(this._wrap.className=V)}_accent(C){if(!C.on)return"idle";if(C.problem?.on)return"alarm";let H=C.co2?.level;return H==="bad"||H==="poor"?"paused":"running"}_headerHtml(C,H){let V=[];C.problem?.on&&V.push(`<span class="bad" title="${i(H("alert.problem"))}">${A("error")}</span>`),C.filter.due&&V.push(`<span class="warn" title="${i(H("ui.filter"))}">${A("filter")}</span>`);let L=C.on?C.preset?H(`preset.${C.preset.key}`):C.presetOption||H("ui.on"):H("ui.off");return`
      <div class="header">
        <div>
          <div class="title" data-action="more-info">${i(C.name||H("card_name"))}</div>
          ${C.model?`<div class="sub">${i(C.model)}</div>`:""}
        </div>
        <div class="spacer"></div>
        <div class="badges">${V.join("")}</div>
        <div class="pill">${A(C.on?"fan":"power")}${i(L)}</div>
      </div>`}_heroSection(C,H){this._sections.hero.querySelector(".erv")||(this._sections.hero.innerHTML=`
        <div class="hero">
          <div class="erv-wrap" data-action="more-info">${l7()}</div>
          <div class="status"></div>
        </div>`,this._statusNode=this._sections.hero.querySelector(".status"));let V=this._config.show_air?this._airHtml(C,H):"";this._signatures.air!==V&&(this._signatures.air=V,this._statusNode.innerHTML=V);let L=this._sections.hero.querySelector(".erv");if(L){L.classList.toggle("running",C.on),L.classList.toggle("off",!C.on),L.classList.toggle("filter-due",C.filter.due);let r=C.speedDigit??1;L.style.setProperty("--flow-duration",`${(3.4-r*.3).toFixed(2)}s`)}m7(this._sections.hero,{co2:C.co2?String(Math.round(C.co2.value)):"---",temp:C.temperature!==null?`${Math.round(C.temperature)}\xB0C`:"--\xB0C",humidity:C.humidity!==null?`${Math.round(C.humidity)}%`:"--%",speed:C.on&&C.speedDigit!==null?String(C.speedDigit):"-",clock:T(new Date,this._hass)})}_airHtml(C,H){let V=[],L=(t,M,a,o)=>M?`
        <div class="reading" data-action="more-info" data-entity="${i(o||"")}">
          <div class="top">${A(a)}<span>${i(H(`ui.${t}`))}</span>
            <span class="val level-${M.level}"><b>${f(M.value,0)}</b><small>${i(M.unit)}</small></span>
          </div>
          <div class="meter"><i class="fill-${M.level}" style="width:${Math.round(M.ratio*100)}%"></i></div>
          <div class="band level-${M.level}">${i(H(`level.${M.level}`))}</div>
        </div>`:"";V.push(L("co2",C.co2,"co2",C.entities.co2)),this._config.show_pm25&&V.push(L("pm25",C.pm25,"pm25",C.entities.pm25));let r=[];return C.temperature!==null&&r.push(`<span class="fact" data-action="more-info" data-entity="${i(C.entities.temperature||"")}">
        ${A("temperature")}<b>${f(C.temperature,0)} ${i(C.temperatureUnit)}</b></span>`),C.humidity!==null&&r.push(`<span class="fact" data-action="more-info" data-entity="${i(C.entities.humidity||"")}">
        ${A("water_percent")}<b>${f(C.humidity,0)} %</b></span>`),r.length&&V.push(`<div class="climate">${r.join("")}</div>`),`<div class="air">${V.filter(Boolean).join("")}</div>`}_alertsHtml(C,H){let V=[];return C.problem?.on&&V.push({severity:"error",text:C.problem.code?H("alert.problem_code").replace("{code}",C.problem.code):H("alert.problem"),iconName:"error",entityId:C.problem.entityId}),C.filter.days!==null&&C.filter.days<=0?V.push({severity:"warning",text:H("alert.filter_over"),iconName:"filter",entityId:C.filter.entityId}):C.filter.due&&V.push({severity:"warning",text:H("alert.filter_due").replace("{days}",C.filter.days),iconName:"filter",entityId:C.filter.entityId}),C.on&&(C.co2?.level==="bad"||C.co2?.level==="poor")&&V.push({severity:"warning",text:H("alert.co2_high").replace("{value}",f(C.co2.value,0)),iconName:"co2",entityId:C.entities.co2}),V.length?`<div class="alerts">${V.map(L=>`
        <div class="alert ${L.severity}" data-action="more-info" data-entity="${i(L.entityId||"")}">
          ${A(L.iconName)}<span>${i(L.text)}</span>
        </div>`).join("")}</div>`:""}_modesHtml(C,H){let V=[];for(let L of C.presetOptions){let r=Q1.find(a=>a.option===L),t=r?H(`preset.${r.key}`):L,M=r?H(`preset_hint.${r.key}`,""):"";V.push(`
        <button class="chip" type="button" data-action="preset" data-value="${i(L)}"
          aria-pressed="${C.presetOption===L}" ${M?`title="${i(M)}"`:""}
          ${C.on?"":"disabled"}>
          ${A(r?.icon||"fan")}<span>${i(t)}</span></button>`)}return`
      <div class="section">
        <div class="section-title">${i(H("ui.modes"))}</div>
        <div class="chips">${V.join("")}</div>
        <div class="controls">
          <button class="btn ${C.on?"":"primary"}" type="button" data-action="power">
            ${A("power")}<span>${i(H(C.on?"ui.power_off":"ui.power_on"))}</span>
          </button>
        </div>
      </div>`}_speedsHtml(C,H){let V=K1.map(({key:r,icon:t})=>{let M=C.speeds[r];if(!M||M.value===null||M.value===void 0)return"";let a=[];for(let o=M.min;o<=M.max;o+=M.step)a.push(`<i class="${o<=M.value?"on":""}"></i>`);return`
        <div class="speed-box">
          <div class="label">${A(t)}<span>${i(H(`ui.${r}`))}</span></div>
          <div class="row">
            <button class="step-btn" type="button" data-action="step" data-speed="${r}" data-dir="-1"
              ${M.value<=M.min?"disabled":""}>\u2212</button>
            <div class="value">${f(M.value,0)}</div>
            <button class="step-btn" type="button" data-action="step" data-speed="${r}" data-dir="1"
              ${M.value>=M.max?"disabled":""}>+</button>
            <div class="ticks">${a.join("")}</div>
          </div>
        </div>`}).filter(Boolean);if(!V.length)return"";let L=C.presetOption&&C.presetOption!=="Manual"?`<div class="note">${A("info")}<span>${i(H("preset_hint.auto"))}</span></div>`:"";return`
      <div class="section">
        <div class="section-title">${i(H("ui.speeds"))}</div>
        <div class="speeds">${V.join("")}</div>
        ${L}
      </div>`}_filterHtml(C,H){let V=[];C.filter.days!==null&&V.push(`
        <div class="fact" data-action="more-info" data-entity="${i(C.filter.entityId||"")}">
          ${A("filter")}<span>${i(H("ui.filter_left"))}</span>
          <b>${f(C.filter.days,0)} ${i(H("ui.days"))}</b></div>`),C.filter.reset&&V.push(`
        <button class="chip" type="button" data-action="filter-reset">
          ${A("reset")}<span>${i(H("ui.filter_reset"))}</span></button>`);let L=C.filter.lifespan,r=L?L.options.map(t=>`
          <button class="chip" type="button" data-action="lifespan" data-value="${i(t)}"
            aria-pressed="${L.state===t}">${i(this._lifespanLabel(t,H))}</button>`).join(""):"";return!V.length&&!r?"":`
      <div class="section">
        <div class="section-title">${i(H("ui.filter"))}</div>
        ${V.length?`<div class="facts">${V.join("")}</div>`:""}
        ${r?`<div class="chips">${r}</div>`:""}
      </div>`}_lifespanLabel(C,H){let V=/^(\d+)\s*days?$/i.exec(String(C).trim());return V?`${V[1]} ${H("ui.days")}`:C}_detailsHtml(C,H){if(!this._config.show_extra||!C.extra.length)return"";let V=C.extra.map(L=>`
        <div class="detail" data-action="more-info" data-entity="${i(L.entityId)}">
          <span class="k">${i(L.name)}</span>
          <span class="v">${A("info")}${i(String(L.state??"\u2013"))}</span>
        </div>`).join("");return`
      <div class="section">
        <div class="section-title">${i(H("ui.other"))}</div>
        <div class="details">${V}</div>
      </div>`}_onClick(C){let H=C.target.closest("[data-action]");if(!H||H.hasAttribute("disabled"))return;let{action:V,entity:L,value:r,speed:t,dir:M}=H.dataset,a=this._model;if(!(!a?.ok&&V!=="more-info"))switch(V){case"more-info":this._moreInfo(L||a?.entities?.fan);break;case"power":this._haptic("medium"),this._call("fan",a.on?"turn_off":"turn_on",{entity_id:a.entities.fan});break;case"preset":this._haptic("light"),this._call("fan","set_preset_mode",{entity_id:a.entities.fan,preset_mode:r});break;case"step":this._step(t,Number(M));break;case"lifespan":this._haptic("light"),this._call("select","select_option",{entity_id:a.filter.lifespan?.entityId,option:r});break;case"filter-reset":this._haptic("medium"),this._call("button","press",{entity_id:a.filter.reset});break;default:break}}_step(C,H){let V=this._model?.speeds?.[C];if(!V||V.value===null)return;let L=Math.min(V.max,Math.max(V.min,V.value+H*V.step));L!==V.value&&(this._haptic("light"),this._call("number","set_value",{entity_id:V.entityId,value:L}))}_call(C,H,V){return V.entity_id?this._hass.callService(C,H,V):Promise.resolve()}_moreInfo(C){C&&this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:C},bubbles:!0,composed:!0}))}_haptic(C){this.dispatchEvent(new CustomEvent("haptic",{detail:C,bubbles:!0,composed:!0}))}};function c7(){customElements.get(K)||(customElements.define(K,b2),window.customCards=window.customCards||[],window.customCards.push({type:K,name:"Fisher ERV Card",description:"Card for Tuya heat-recovery ventilators: CO2 and PM2.5, temperature, humidity, fan speeds and the filter.",preview:!0,documentationURL:"https://github.com/gabor-io/ha-appliance-custom-card"}),console.info(`%c ${K} %c ${r7} `,"color:#fff;background:#00796b;font-weight:700;border-radius:3px 0 0 3px","color:#00796b;background:#e0f2f1;font-weight:700;border-radius:0 3px 3px 0"))}var C9=B({cardName:K,toggles:["show_air","show_pm25","show_modes","show_speeds","show_filter","show_extra","compact","animate"],defaults:w2,listDevices:S1,getLanguage:j1,translator:Y1,languages:k2});function x7(){customElements.get(Z1)||customElements.define(Z1,C9)}x7();c7();var j="daikin-ac-card",f1="daikin-ac-card-editor",u7="1.10.0",q1="daikin",M1=[{key:"off",icon:"power",colour:"var(--ap-off)"},{key:"heat_cool",icon:"auto",colour:"var(--ap-auto)"},{key:"heat",icon:"heat",colour:"var(--ap-heat)"},{key:"cool",icon:"snowflake",colour:"var(--ap-cool)"},{key:"dry",icon:"water",colour:"var(--ap-dry)"},{key:"fan_only",icon:"fan",colour:"var(--ap-fan)"}],T2=M1.map(e=>e.key),Z7=["off","vertical"],S7=[{key:"boost",icon:"quick"},{key:"eco",icon:"leaf"},{key:"away",icon:"away"}],i1=["auto","silence","1","2","3","4","5"],h7=.5,f7=100,a1={min:1.5,max:4.6};var H9={card_name:"Kl\xEDma",group_name:"Kl\xEDm\xE1k",mode:{off:"Ki",heat_cool:"Auto",heat:"F\u0171t\xE9s",cool:"H\u0171t\xE9s",dry:"P\xE1ra",fan_only:"Vent"},mode_long:{off:"Kikapcsolva",heat_cool:"Automata",heat:"F\u0171t\xE9s",cool:"H\u0171t\xE9s",dry:"P\xE1r\xE1tlan\xEDt\xE1s",fan_only:"Ventil\xE1tor"},fan:{auto:"Auto",silence:"Csendes",1:"1. fok",2:"2. fok",3:"3. fok",4:"4. fok",5:"5. fok"},swing:{off:"Ki",vertical:"F\xFCgg\u0151leges",horizontal:"V\xEDzszintes","3d":"3D"},preset:{boost:"Turb\xF3",eco:"Eco",away:"T\xE1voll\xE9t"},state:{standby:"K\xE9szenl\xE9tben",unavailable:"Nem el\xE9rhet\u0151",drying:"P\xE1r\xE1tlan\xEDt",fan_only:"Csak keringet",holding:"Tartja a {target} \xB0C-ot",heating_to:"F\u0171t {target} \xB0C-ra",cooling_to:"H\u0171t {target} \xB0C-ra",above_target:"A c\xE9lh\u0151fok felett",below_target:"A c\xE9lh\u0151fok alatt"},sub:{unavailable:"A g\xE9p nem v\xE1laszol",last_target:"Legut\xF3bbi c\xE9l {target} \xB0C",reached:"El\xE9rte a c\xE9lh\u0151m\xE9rs\xE9kletet",above_by:"{diff} \xB0C-kal a c\xE9l felett",below_by:"{diff} \xB0C-kal a c\xE9l alatt",compressor_idle:"A kompresszor \xE1ll",compressor_idle_power:"A kompresszor \xE1ll \xB7 {power} W"},group:{running:"{running} / {total} g\xE9p megy",all_off:"Mind \xE1ll",mixed:"Vegyes \xFCzem",mixed_note:"A sz\xE1mok \xE1tlagok \u2013 a g\xE9pek elt\xE9r\u0151en \xE1llnak",in_step:"Minden g\xE9p egyform\xE1n \xE1ll",units:"G\xE9pek",unit_count:"{total} g\xE9p",average:"\xE1tlag",tap_hint:"koppints a r\xE9szletek\xE9rt"},alert:{away:"T\xE1voll\xE9t m\xF3d \u2013 a g\xE9p csak fagyv\xE9delemre f\u0171t"},ui:{inside:"Bent",outside:"Kint",humidity:"P\xE1ratartalom",power:"Fogyaszt\xE1s",energy:"Havi fogyaszt\xE1s",device_reads:"g\xE9p",fan:"Vent",swing:"Lamella",warmer:"Melegebb",cooler:"Hidegebb",standby_short:"\xC1ll",no_entity:"Nem tal\xE1ltam Daikin kl\xEDm\xE1t. Add meg az `entity` be\xE1ll\xEDt\xE1st.",missing_entity:"A megadott entit\xE1s nem l\xE9tezik.",empty_group:"A csoportnak nincs egyetlen kl\xEDma tagja sem."},editor:{device:"K\xE9sz\xFCl\xE9k",device_auto:"Automatikus",language:"Nyelv",language_auto:"Automatikus",show_art:"K\xE9sz\xFCl\xE9krajz",show_readings:"M\xE9rt \xE9rt\xE9kek",show_modes:"\xDCzemm\xF3dok",show_fan:"Ventil\xE1tor",show_presets:"Turb\xF3 / Eco / T\xE1voll\xE9t",show_all_swing:"Minden lamella-opci\xF3",compact:"Kompakt",animate:"Anim\xE1ci\xF3k"}},V9={card_name:"Air conditioner",group_name:"Air conditioners",mode:{off:"Off",heat_cool:"Auto",heat:"Heat",cool:"Cool",dry:"Dry",fan_only:"Fan"},mode_long:{off:"Off",heat_cool:"Automatic",heat:"Heating",cool:"Cooling",dry:"Drying",fan_only:"Fan only"},fan:{auto:"Auto",silence:"Silence",1:"Step 1",2:"Step 2",3:"Step 3",4:"Step 4",5:"Step 5"},swing:{off:"Off",vertical:"Vertical",horizontal:"Horizontal","3d":"3D"},preset:{boost:"Powerful",eco:"Econo",away:"Away"},state:{standby:"Standing by",unavailable:"Unavailable",drying:"Drying",fan_only:"Moving air only",holding:"Holding {target} \xB0C",heating_to:"Heating to {target} \xB0C",cooling_to:"Cooling to {target} \xB0C",above_target:"Above the target",below_target:"Below the target"},sub:{unavailable:"The unit is not answering",last_target:"Last target {target} \xB0C",reached:"Target reached",above_by:"{diff} \xB0C above target",below_by:"{diff} \xB0C below target",compressor_idle:"Compressor idle",compressor_idle_power:"Compressor idle \xB7 {power} W"},group:{running:"{running} of {total} running",all_off:"All off",mixed:"Mixed",mixed_note:"These are averages \u2013 the units differ",in_step:"All units in step",units:"Units",unit_count:"{total} units",average:"avg",tap_hint:"tap for controls"},alert:{away:"Away mode \u2013 frost protection only"},ui:{inside:"Inside",outside:"Outside",humidity:"Humidity",power:"Power",energy:"Energy this month",device_reads:"unit",fan:"Fan",swing:"Swing",warmer:"Warmer",cooler:"Cooler",standby_short:"Off",no_entity:"No Daikin climate entity found. Set the `entity` option.",missing_entity:"That entity does not exist.",empty_group:"The group has no climate members."},editor:{device:"Device",device_auto:"Automatic",language:"Language",language_auto:"Automatic",show_art:"Unit drawing",show_readings:"Readings",show_modes:"Modes",show_fan:"Fan",show_presets:"Powerful / Econo / Away",show_all_swing:"All swing options",compact:"Compact",animate:"Animations"}},g7={hu:H9,en:V9},E2=Object.keys(g7);function X1(e,C){return E(e,C,E2)}function J1(e){return R(g7,e)}function g1(e,C={}){return Object.entries(C).reduce((H,[V,L])=>H.replace(`{${V}}`,String(L)),e)}var L9={inside:"inside_temperature",outside:"outside_temperature"};function C2(e){return Object.values(e?.entities||{})}function e9(e){return C2(e).filter(C=>C.platform===q1&&C.entity_id.startsWith("climate.")).map(C=>C.entity_id)}function H2(e){let C=new Map;for(let H of C2(e)){if(H.platform!==q1||!H.device_id||!H.entity_id.startsWith("climate."))continue;let V=e.devices?.[H.device_id];V&&C.set(H.device_id,V.name_by_user||V.name||H.device_id)}return[...C.entries()].map(([H,V])=>({id:H,name:V}))}function _7(e,C){let H=e?.states?.[C]?.attributes?.entity_id;return Array.isArray(H)?H.filter(V=>typeof V=="string"&&V.startsWith("climate.")):[]}function y7(e,C){if(C?.entity)return C.entity;if(C?.device){let V=C2(e).find(L=>L.device_id===C.device&&L.entity_id.startsWith("climate."));if(V)return V.entity_id}let H=e9(e);return H.length===1?H[0]:null}function r9(e,C){let V=e?.entities?.[C]?.device_id;if(!V)return{};let L={};for(let r of C2(e))if(!(r.device_id!==V||r.platform!==q1))for(let[t,M]of Object.entries(L9))r.translation_key===M&&(L[t]=r.entity_id);return L}function O7(e,C,H={}){let V=r9(e,C);return{climate:C,inside:V.inside,outside:H.outside||V.outside,room:H.temperature||null,humidity:H.humidity||null,power:H.power||null,energy:H.energy||null}}function o1(e,C){if(!C)return null;let H=e?.states?.[C];if(h(H))return null;let V=Number(H.state);return Number.isFinite(V)?V:null}function k7(e,C,H=""){return e?.states?.[C]?.attributes?.unit_of_measurement||H}function w7(e,C){return e?.states?.[C]?.attributes?.friendly_name||""}function t9(e){let C=H=>{let V=i1.indexOf(String(H).toLowerCase());return V===-1?i1.length:V};return[...e].sort((H,V)=>C(H)-C(V))}function T7(e,C,H={},V={}){let L=e?.states?.[C];if(!L)return null;let r=O7(e,C,H),t=L.attributes||{},M=L.state,a=M!=="off"&&!h(L),o=o1(e,r.inside)??t.current_temperature??null,n=o1(e,r.room),s=n??o,l=t.temperature??null,d=(t.swing_modes||[]).filter(S=>V.show_all_swing?!0:Z7.includes(String(S).toLowerCase())),u=t.preset_modes||[],x=S7.filter(S=>u.includes(S.key)).map(S=>({...S,on:t.preset_mode===S.key})),m=o1(e,r.power);return{entityId:C,entities:r,name:H.name||w7(e,C)||C,available:!h(L),on:a,mode:M,action:t.hvac_action||null,modes:(t.hvac_modes||[]).filter(S=>T2.includes(S)),target:l,targetStep:t.target_temp_step||1,minTemp:t.min_temp??16,maxTemp:t.max_temp??32,unit:e?.config?.unit_system?.temperature||"\xB0C",inside:o,room:n,measured:s,external:n!==null,outside:o1(e,r.outside),humidity:o1(e,r.humidity),power:m,powerUnit:k7(e,r.power,"W"),energy:o1(e,r.energy),energyUnit:k7(e,r.energy,"kWh"),fanModes:t9(t.fan_modes||[]),fanMode:t.fan_mode||null,swingModes:d,swingMode:t.swing_mode||null,swinging:!!t.swing_mode&&String(t.swing_mode).toLowerCase()!=="off",presets:x,presetMode:t.preset_mode||null,away:t.preset_mode==="away",idle:a&&m!==null?m<f7:a&&t.hvac_action==="idle"}}function E7(e){if(e.measured===null||e.target===null)return null;let C=e.measured-e.target;return Math.abs(C)<h7?"at":C>0?"above":"below"}function R7(e){if(!e.available)return{key:"state.unavailable"};if(!e.on)return{key:"state.standby"};if(e.mode==="dry")return{key:"state.drying"};if(e.mode==="fan_only")return{key:"state.fan_only"};let C=E7(e);return C==="at"||C===null?{key:"state.holding",target:e.target}:e.mode==="heat"?C==="below"?{key:"state.heating_to",target:e.target}:{key:"state.above_target"}:e.mode==="cool"?C==="above"?{key:"state.cooling_to",target:e.target}:{key:"state.below_target"}:{key:"state.holding",target:e.target}}function P7(e){if(!e.available)return{key:"sub.unavailable"};if(!e.on)return{key:"sub.last_target",target:e.target};if(e.idle&&e.power!==null)return{key:"sub.compressor_idle_power",power:e.power};if(e.idle)return{key:"sub.compressor_idle"};let C=E7(e);if(C===null)return{key:""};if(C==="at")return{key:"sub.reached"};let H=Math.round(Math.abs(e.measured-e.target)*10)/10;return{key:C==="above"?"sub.above_by":"sub.below_by",diff:H}}function b7(e){let C=e.filter(H=>H!==null&&Number.isFinite(H));return C.length?C.reduce((H,V)=>H+V,0)/C.length:null}function M9(e,C,H,V){let L=V?.units||{},r=H.map(l=>T7(e,l,L[l]||{},V)).filter(Boolean),t=e?.states?.[C],M=t?.attributes||{},a=r.filter(l=>l.on),o=a.map(l=>l.mode),n=o.length?[...new Set(o)].sort((l,d)=>o.filter(u=>u===d).length-o.filter(u=>u===l).length)[0]:"off",s=r.map(l=>l.power).filter(l=>l!==null);return{isGroup:!0,entityId:C,name:V?.name||w7(e,C)||C,available:!h(t),units:r,running:a.length,total:r.length,on:a.length>0,mode:M.hvac_mode||(t?.state!=="off"?t?.state:null)||n,mixed:new Set(r.map(l=>l.on?l.mode:"off")).size>1||new Set(r.map(l=>l.target)).size>1,modes:(M.hvac_modes||[]).filter(l=>T2.includes(l)),target:M.temperature??b7(r.map(l=>l.target)),targetStep:M.target_temp_step||1,minTemp:M.min_temp??16,maxTemp:M.max_temp??32,unit:e?.config?.unit_system?.temperature||"\xB0C",measured:b7(r.map(l=>l.measured)),outside:r.map(l=>l.outside).find(l=>l!==null)??null,power:s.length?s.reduce((l,d)=>l+d,0):null,powerUnit:"W"}}function B7(e,C){let H=y7(e,C);if(!H)return{ok:!1,reason:"no_entity"};if(!e?.states?.[H])return{ok:!1,reason:"missing_entity"};let V=_7(e,H);if(V.length){let r=M9(e,H,V,C);return r.units.length?{ok:!0,...r}:{ok:!1,reason:"empty_group"}}let L=T7(e,H,C?.sources||{},C);return L?{ok:!0,isGroup:!1,...L,name:C?.name||L.name}:{ok:!1,reason:"missing_entity"}}function i9(e){let C=i1.indexOf(String(e??"").toLowerCase()),H=i1.length-1;if(C<=0)return(a1.min+a1.max)/2;let V=(C-1)/Math.max(1,H-1);return a1.max-V*(a1.max-a1.min)}function F7(e){return`
  <svg class="defs" width="0" height="0" aria-hidden="true">
    <defs>
      <linearGradient id="${e}-case" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#ffffff"/>
        <stop offset=".5" stop-color="#f5f7f9"/>
        <stop offset="1" stop-color="#dde3e8"/>
      </linearGradient>
      <linearGradient id="${e}-flap" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#f3f5f7"/>
        <stop offset="1" stop-color="#c4ccd3"/>
      </linearGradient>
      <linearGradient id="${e}-cavity" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#1b2630"/>
        <stop offset="1" stop-color="#39474f"/>
      </linearGradient>
      <linearGradient id="${e}-wash" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="currentColor"/>
        <stop offset="1" stop-color="currentColor" stop-opacity="0"/>
      </linearGradient>
      <filter id="${e}-soft" x="-40%" y="-40%" width="180%" height="200%">
        <feGaussianBlur stdDeviation="5"/>
      </filter>
    </defs>
  </svg>`}function D7(e){return`
  <svg class="ac" viewBox="0 0 200 176" role="img" aria-hidden="true">
    <path class="wash" d="M26 92h148l26 84H0Z" fill="url(#${e}-wash)"/>
    <ellipse class="shadow" cx="100" cy="90" rx="84" ry="8" filter="url(#${e}-soft)"/>
    <g class="body">
      <rect x="10" y="22" width="180" height="62" rx="15" fill="url(#${e}-case)"/>
      <rect class="outline" x="10" y="22" width="180" height="62" rx="15"/>
      <g class="grille">
        <line x1="34" y1="33" x2="166" y2="33"/>
        <line x1="34" y1="38.5" x2="166" y2="38.5"/>
        <line x1="34" y1="44" x2="166" y2="44"/>
      </g>
      <path class="sheen" d="M18 54h164"/>
      <circle class="led" cx="170" cy="76" r="2.5"/>
      <rect x="22" y="68" width="140" height="18" rx="6" fill="url(#${e}-cavity)"/>
      <g class="louver">
        <rect x="22" y="68" width="140" height="18" rx="6" fill="url(#${e}-flap)"/>
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
  </svg>`}function N7(e){return`
  <svg class="mini" viewBox="0 0 60 58" role="img" aria-hidden="true">
    <rect class="mbody" x="4" y="10" width="52" height="22" rx="6"/>
    <g class="grille">
      <line x1="14" y1="16" x2="46" y2="16"/>
      <line x1="14" y1="19.5" x2="46" y2="19.5"/>
    </g>
    <rect class="mcavity" x="8" y="25" width="44" height="7" rx="2.5"/>
    <rect class="mflap" x="8" y="25" width="44" height="7" rx="2.5" fill="url(#${e}-flap)"/>
    <g class="stream">
      <path d="M20 36c-1 8 -2 12 -4 20"/>
      <path d="M40 36c1 8 2 12 4 20"/>
    </g>
  </svg>`}function R2(e,C){e&&(e.classList.toggle("on",!!C.on),e.classList.toggle("off",!C.on),e.classList.toggle("swing",!!(C.on&&C.swinging)),e.classList.toggle("fixed",!!(C.on&&!C.swinging)),e.style.setProperty("--flow-duration",`${i9(C.fanMode).toFixed(2)}s`))}var $7=`
${P}

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

.wash { opacity: 0; transition: opacity .6s; color: var(--ap-accent); }
.ac.on .wash { opacity: .15; }
.led { fill: #c9d2d8; }
.ac.on .led { fill: var(--ap-accent); }
.ac.off .body { opacity: .72; }
.mini.off { opacity: .45; }
`;var B2={language:"auto",compact:!1,animate:!0,show_art:!0,show_readings:!0,show_modes:!0,show_fan:!0,show_presets:!0,show_all_swing:!1},I7=0,P2=class extends HTMLElement{static getConfigElement(){return document.createElement(f1)}static getStubConfig(C){let H=H2(C);return{type:`custom:${j}`,device:H[0]?.id}}constructor(){super(),this.attachShadow({mode:"open"}),this._sections={},this._signatures={},this._rows=new Map,this._open=new Set,this._built=!1,I7+=1,this._uid=`daikin${I7}`}setConfig(C){this._config={...B2,...C||{}},this._signatures={},this._rows.clear(),this._hass&&this._render()}set hass(C){this._hass=C,this._render()}get hass(){return this._hass}getCardSize(){return this._model?.isGroup?4+(this._model.units?.length||0):this._config?.compact?4:6}getGridOptions(){return{columns:12,min_columns:6,rows:"auto"}}_build(){let C=document.createElement("style");C.textContent=$7;let H=document.createElement("ha-card"),V=document.createElement("div");V.className="wrap",V.addEventListener("click",L=>this._onClick(L)),V.insertAdjacentHTML("beforeend",F7(this._uid));for(let L of["top","hero","alerts","modes","fan","buttons","units"]){let r=document.createElement("div");r.dataset.section=L,this._sections[L]=r,V.appendChild(r)}H.appendChild(V),this.shadowRoot.replaceChildren(C,H),this._wrap=V,this._built=!0}_render(){if(!this._hass||!this._config)return;this._built||this._build();let C=J1(X1(this._config,this._hass)),H=B7(this._hass,this._config);if(this._model=H,!H.ok){this._renderEmpty(H,C);return}this._emptyShown=!1,this._applyWrapClasses(H),H.isGroup?this._renderGroup(H,C):this._renderSingle(H,C)}_renderEmpty(C,H){if(this._emptyShown!==C.reason){this._emptyShown=C.reason,this._signatures={},this._rows.clear();for(let[V,L]of Object.entries(this._sections))L.innerHTML="",L.hidden=V!=="top";this._sections.top.innerHTML=`
      <div class="empty">
        ${A("ac")}
        <div>${i(H(`ui.${C.reason}`))}</div>
      </div>`}}_section(C,H){this._signatures[C]!==H&&(this._signatures[C]=H,this._sections[C].innerHTML=H,this._sections[C].hidden=!H)}_applyWrapClasses(C){let H=["wrap"];this._config.compact&&H.push("compact"),this._config.animate||H.push("no-animation"),this._hass.themes?.darkMode&&H.push("dark");let V=H.join(" ");this._wrap.className!==V&&(this._wrap.className=V);let L=this._accent(C.isGroup?C.running?C.mode:"off":C.on?C.mode:"off");this._wrap.style.getPropertyValue("--ap-accent")!==L&&this._wrap.style.setProperty("--ap-accent",L)}_accent(C){return(M1.find(H=>H.key===C)||M1[0]).colour}_renderSingle(C,H){this._section("top",this._topHtml(C,H)),this._heroSection(C,H),this._section("alerts",this._alertsHtml(C,H)),this._section("modes",this._config.show_modes?this._segHtml(C,H):""),this._section("fan",this._config.show_fan?this._fanHtml(C,H):""),this._section("buttons",this._buttonsHtml(C,H)),this._section("units","")}_topHtml(C,H){let V=C.isGroup?`${i(g1(H("group.unit_count"),C))} \xB7 ${i(C.entityId)}`:"Daikin";return`
      <div class="top">
        <div>
          <div class="name" data-action="more-info">${i(C.name)}</div>
          <div class="sub">${V}</div>
        </div>
        <div class="spacer"></div>
        <div class="ind">${this._readingsHtml(C,H)}</div>
      </div>`}_readingsHtml(C,H){if(!this._config.show_readings)return"";let V=[],L=(t,M,a,o,n,s="")=>{M!=null&&V.push(`
        <span data-action="more-info" data-entity="${i(n||"")}">
          ${A(t)}<b>${f(M,a)} ${i(o)}</b>${s}
        </span>`)};if(C.isGroup)return L("indoor",C.measured,1,C.unit,"",`<span class="raw">${i(H("group.average"))}</span>`),L("outdoor",C.outside,0,C.unit,""),L("energy",C.power,0,C.powerUnit,""),V.join("");let r=C.external&&C.inside!==null?`<span class="raw">${i(H("ui.device_reads"))} ${f(C.inside,0)}</span>`:"";return L("indoor",C.measured,1,C.unit,C.entities.room||C.entities.inside,r),L("water_percent",C.humidity,0,"%",C.entities.humidity),L("outdoor",C.outside,0,C.unit,C.entities.outside),L("energy",C.power,0,C.powerUnit,C.entities.power),L("counter",C.energy,1,C.energyUnit,C.entities.energy),V.join("")}_heroSection(C,H){let V=this._config.show_art;this._sections.hero.querySelector(".hero")||(this._sections.hero.innerHTML=`
        <div class="hero">
          <div class="art" data-action="more-info">${D7(this._uid)}</div>
          <div class="status"></div>
          <div class="dial"></div>
        </div>`,this._heroNode=this._sections.hero.querySelector(".hero"),this._statusNode=this._sections.hero.querySelector(".status"),this._dialNode=this._sections.hero.querySelector(".dial")),this._heroNode.classList.toggle("no-art",!V);let L=this._sections.hero.querySelector(".art");L.hidden=!V,V&&R2(L.querySelector(".ac"),C);let r=R7(C),t=P7(C),M=`
      <div class="mode-name">${i(H(`mode_long.${C.on?C.mode:"off"}`,C.mode))}</div>
      <div class="state">${i(g1(H(r.key),r))}</div>
      <div class="state-sub">${i(t.key?g1(H(t.key),t):"")}</div>`;this._signatures.status!==M&&(this._signatures.status=M,this._statusNode.innerHTML=M);let a=this._dialHtml(C);this._signatures.dial!==a&&(this._signatures.dial=a,this._dialNode.innerHTML=a)}_dialHtml(C,H=!1){let V=C.target,L=!C.on||V===null,r=`<button type="button" data-action="temp" data-dir="1" data-target="${i(C.entityId)}"
      ${L||V>=C.maxTemp?"disabled":""} aria-label="+">${A("chevron_up")}</button>`,t=`<button type="button" data-action="temp" data-dir="-1" data-target="${i(C.entityId)}"
      ${L||V<=C.minTemp?"disabled":""} aria-label="\u2212">${A("chevron")}</button>`,M=`<div class="big">${V===null?"\u2013\u2013":f(V,1)}<small> ${i(C.unit)}</small></div>`;return H?`<div class="updown">${t}${r}</div>${M}`:`${M}<div class="updown">${r}${t}</div>`}_alertsHtml(C,H){return C.isGroup||!C.away?"":`
      <div class="alerts">
        <div class="alert">${A("away")}<span>${i(H("alert.away"))}</span></div>
      </div>`}_segHtml(C,H){let V=C.modes?.length?C.modes:M1.map(M=>M.key),L=C.isGroup?C.mixed||!C.running?null:C.mode:C.on?C.mode:"off",r=C.isGroup?C.running===0:!C.on;return`<div class="seg">${M1.filter(M=>M.key==="off"||V.includes(M.key)).map(M=>{let a=M.key==="off"?r:L===M.key;return`
        <button type="button" class="${M.key==="off"?"power":""}"
          data-action="mode" data-value="${M.key}" data-target="${i(C.entityId)}"
          aria-pressed="${a}">
          ${A(M.icon)}<span>${i(H(`mode.${M.key}`))}</span>
        </button>`}).join("")}</div>`}_fanHtml(C,H){if(!C.fanModes.length)return"";let V=C.fanModes.filter(r=>String(r).toLowerCase()!=="auto"),L=C.fanModes.map((r,t)=>{let M=String(r).toLowerCase(),a=C.fanMode===r;if(M==="auto")return`<button type="button" class="auto ${a?"on":""}" data-action="fan"
            data-value="${i(r)}" data-target="${i(C.entityId)}"
            ${C.on?"":"disabled"} aria-label="Auto">A</button>`;let o=V.indexOf(r),n=8+o*1.8;return`<button type="button" class="${C.fanMode!==null&&String(C.fanMode).toLowerCase()!=="auto"&&o<=V.indexOf(C.fanMode)?"on":""}" style="height:${n.toFixed(1)}px"
          data-action="fan" data-value="${i(r)}" data-target="${i(C.entityId)}"
          ${C.on?"":"disabled"} aria-label="${i(this._fanLabel(r,H))}"></button>`}).join("");return`
      <div class="fan">
        <span class="cap">${i(H("ui.fan"))}</span>
        <div class="ticks">${L}</div>
        <span class="val">${i(C.fanMode?this._fanLabel(C.fanMode,H):"\u2013")}</span>
      </div>`}_fanLabel(C,H){return H(`fan.${String(C).toLowerCase()}`,String(C))}_swingLabel(C,H){return H(`swing.${String(C).toLowerCase()}`,String(C))}_buttonsHtml(C,H){let V=[];if(C.swingModes.length>1)if(this._config.show_all_swing)for(let L of C.swingModes)V.push(`
            <button type="button" class="ghost" data-action="swing" data-value="${i(L)}"
              data-target="${i(C.entityId)}" aria-pressed="${C.swingMode===L}"
              ${C.on?"":"disabled"}>${A("swing")}${i(this._swingLabel(L,H))}</button>`);else{let L=C.swingModes.find(t=>String(t).toLowerCase()!=="off"),r=C.swingModes.find(t=>String(t).toLowerCase()==="off");V.push(`
          <button type="button" class="ghost" data-action="swing"
            data-value="${i(C.swinging?r??"off":L??"vertical")}"
            data-target="${i(C.entityId)}" aria-pressed="${C.swinging}"
            ${C.on?"":"disabled"}>${A("swing")}${i(H("ui.swing"))}</button>`)}if(this._config.show_presets)for(let L of C.presets)V.push(`
          <button type="button" class="ghost" data-action="preset" data-value="${L.key}"
            data-target="${i(C.entityId)}" aria-pressed="${L.on}"
            ${C.on?"":"disabled"}>${A(L.icon)}${i(H(`preset.${L.key}`))}</button>`);return V.length?`<div class="btnrow">${V.join("")}</div>`:""}_renderGroup(C,H){this._section("top",this._topHtml(C,H)),this._groupHero(C,H),this._section("alerts",""),this._section("modes",this._config.show_modes?this._segHtml(C,H):""),this._section("fan",""),this._section("buttons",""),this._unitsSection(C,H)}_groupHero(C,H){this._sections.hero.querySelector(".hero")||(this._sections.hero.innerHTML=`
        <div class="hero no-art">
          <div class="status"></div>
          <div class="dial"></div>
        </div>`,this._heroNode=this._sections.hero.querySelector(".hero"),this._statusNode=this._sections.hero.querySelector(".status"),this._dialNode=this._sections.hero.querySelector(".dial")),this._heroNode.classList.add("no-art");let V=this._sections.hero.querySelector(".art");V&&(V.hidden=!0);let L=C.running===0?H("group.all_off"):C.mixed?H("group.mixed"):H(`mode_long.${C.mode}`,C.mode),r=`
      <div class="mode-name">${i(L)}</div>
      <div class="state">${i(g1(H("group.running"),C))}</div>
      <div class="state-sub">${i(C.mixed&&C.running?H("group.mixed_note"):H("group.in_step"))}</div>`;this._signatures.status!==r&&(this._signatures.status=r,this._statusNode.innerHTML=r);let t=this._dialHtml({...C,on:!0});this._signatures.dial!==t&&(this._signatures.dial=t,this._dialNode.innerHTML=t)}_unitsSection(C,H){let V=this._sections.units;V.querySelector(".rows")||(V.innerHTML=`
        <div class="divider"></div>
        <div class="sec-cap">${i(H("group.units"))}
          <span style="float:right;font-weight:500;letter-spacing:0;text-transform:none">
            ${i(H("group.tap_hint"))}</span></div>
        <div class="rows"></div>`,this._rowsNode=V.querySelector(".rows"),this._rows.clear()),V.hidden=!1;let L=new Set;for(let r of C.units){L.add(r.entityId);let t=this._rows.get(r.entityId);if(!t){let d=document.createElement("div");d.className="row",d.innerHTML=`
          <button class="row-head" type="button" data-action="toggle-row" data-target="${i(r.entityId)}">
            ${N7(this._uid)}
            <span><span class="rname"></span><span class="rstate"></span></span>
            <span class="rtemp"></span>
            ${A("chevron","icon caret")}
          </button>
          <div class="row-body"></div>`,this._rowsNode.appendChild(d),t={el:d,mini:d.querySelector(".mini"),name:d.querySelector(".rname"),state:d.querySelector(".rstate"),temp:d.querySelector(".rtemp"),body:d.querySelector(".row-body"),sig:{}},this._rows.set(r.entityId,t)}let M=this._open.has(r.entityId);t.el.classList.toggle("open",M),t.el.style.setProperty("--row-accent",this._accent(r.on?r.mode:"off")),R2(t.mini,r);let a=r.name;t.sig.name!==a&&(t.sig.name=a,t.name.textContent=a);let o=`${i(H(`mode_long.${r.on?r.mode:"off"}`,r.mode))}${r.on&&r.fanMode?` \xB7 ${i(this._fanLabel(r.fanMode,H))}`:""}${r.power!==null?`<em> \xB7 ${f(r.power,0)} ${i(r.powerUnit)}</em>`:""}`;t.sig.state!==o&&(t.sig.state=o,t.state.innerHTML=o);let n=r.measured===null?"\u2013\u2013":f(r.measured,1),s=r.on?`${n} ${i(r.unit)} \u2192 <b>${f(r.target,1)} ${i(r.unit)}</b>`:`${n} ${i(r.unit)} \xB7 <b>${i(H("ui.standby_short"))}</b>`;t.sig.temp!==s&&(t.sig.temp=s,t.temp.innerHTML=s);let l=M?`${this._segHtml(r,H)}
           ${this._config.show_fan?this._fanHtml(r,H):""}
           <div class="rowbottom">
             <div>${this._buttonsHtml(r,H)}</div>
             <div class="dial">${this._dialHtml(r,!0)}</div>
           </div>`:"";t.sig.body!==l&&(t.sig.body=l,t.body.innerHTML=l)}for(let[r,t]of this._rows)L.has(r)||(t.el.remove(),this._rows.delete(r))}_onClick(C){let H=C.target.closest("[data-action]");if(!H||H.hasAttribute("disabled"))return;let{action:V,entity:L,value:r,dir:t,target:M}=H.dataset,a=this._model;if(!(!a?.ok&&V!=="more-info"))switch(V){case"more-info":this._moreInfo(L||a?.entityId);break;case"toggle-row":this._haptic("selection"),this._open.has(M)?this._open.delete(M):this._open.add(M),this._render();break;case"mode":this._haptic(r==="off"?"medium":"light"),this._call("set_hvac_mode",{entity_id:M,hvac_mode:r});break;case"fan":this._haptic("light"),this._call("set_fan_mode",{entity_id:M,fan_mode:r});break;case"swing":this._haptic("light"),this._call("set_swing_mode",{entity_id:M,swing_mode:r});break;case"preset":this._haptic("light"),this._call("set_preset_mode",{entity_id:M,preset_mode:H.getAttribute("aria-pressed")==="true"?"none":r});break;case"temp":this._stepTemperature(M,Number(t));break;default:break}}_stepTemperature(C,H){let V=this._model,L=V.isGroup&&C===V.entityId?V:V.isGroup?V.units.find(M=>M.entityId===C):V;if(!L||L.target===null)return;let r=L.targetStep||1,t=Math.min(L.maxTemp,Math.max(L.minTemp,Math.round((L.target+H*r)*10)/10));t!==L.target&&(this._haptic("light"),this._call("set_temperature",{entity_id:C,temperature:t}))}_call(C,H){return H.entity_id?this._hass.callService("climate",C,H):Promise.resolve()}_moreInfo(C){C&&this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:C},bubbles:!0,composed:!0}))}_haptic(C){this.dispatchEvent(new CustomEvent("haptic",{detail:C,bubbles:!0,composed:!0}))}};function z7(){customElements.get(j)||(customElements.define(j,P2),window.customCards=window.customCards||[],window.customCards.push({type:j,name:"Daikin AC Card",description:"Card for Daikin air conditioners: modes, target temperature, fan and louver, with room sensors and a plug meter. Drives a climate group too.",preview:!0,documentationURL:"https://github.com/gabor-io/ha-appliance-custom-card"}),console.info(`%c ${j} %c ${u7} `,"color:#fff;background:#0288d1;font-weight:700;border-radius:3px 0 0 3px","color:#0288d1;background:#e1f5fe;font-weight:700;border-radius:0 3px 3px 0"))}var a9=B({cardName:j,toggles:["show_art","show_readings","show_modes","show_fan","show_presets","show_all_swing","compact","animate"],defaults:B2,listDevices:H2,getLanguage:X1,translator:J1,languages:E2});function W7(){customElements.get(f1)||customElements.define(f1,a9)}W7();z7();
