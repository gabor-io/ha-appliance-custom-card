/*! ha-appliance-cards v1.8.0 - https://github.com/gabor-io/ha-appliance-custom-card - MIT licence */
var S="aeg-dishwasher-card",B="aeg-dishwasher-card-editor",C1="1.8.0",t={OFF:"OFF",IDLE:"IDLE",READY_TO_START:"READY_TO_START",DELAYED_START:"DELAYED_START",RUNNING:"RUNNING",PAUSED:"PAUSED",END_OF_CYCLE:"END_OF_CYCLE",ALARM:"ALARM",UNKNOWN:"UNKNOWN"},H1={[t.OFF]:"idle",[t.IDLE]:"idle",[t.READY_TO_START]:"ready",[t.DELAYED_START]:"delayed",[t.RUNNING]:"running",[t.PAUSED]:"paused",[t.END_OF_CYCLE]:"done",[t.ALARM]:"alarm",[t.UNKNOWN]:"idle"},c={PREWASH:"PREWASH",MAINWASH:"MAINWASH",COLDRINSE:"COLDRINSE",HOTRINSE:"HOTRINSE",EXTRARINSE:"EXTRARINSE",DRYING:"DRYING",ADO_DRYING:"ADO_DRYING",UNAVAILABLE:"UNAVAILABLE"},G=["PREWASH","MAINWASH","RINSE","DRYING"],V1={[c.PREWASH]:"PREWASH",[c.MAINWASH]:"MAINWASH",[c.COLDRINSE]:"RINSE",[c.HOTRINSE]:"RINSE",[c.EXTRARINSE]:"RINSE",[c.DRYING]:"DRYING",[c.ADO_DRYING]:"DRYING"},n={ECO:{icon:"leaf",water:8.4,energy:.488,duration:310,steps:["PREWASH","MAINWASH","RINSE","DRYING"]},AUTO:{icon:"auto",water:12.5,energy:1,duration:180,steps:["PREWASH","MAINWASH","RINSE","DRYING"]},QUICK30:{icon:"quick",water:8.5,energy:.475,duration:30,steps:["MAINWASH","RINSE"]},QUICK60:{icon:"clock",water:10.5,energy:1,duration:60,steps:["MAINWASH","RINSE","DRYING"]},NORMAL90:{icon:"clock",water:10.5,energy:1,duration:90,steps:["MAINWASH","RINSE","DRYING"]},"120_MIN":{icon:"clock",water:10.5,energy:.9,duration:120,steps:["MAINWASH","RINSE","DRYING"]},RINSE:{icon:"rinse",water:4,energy:.15,duration:15,steps:["PREWASH"],scores:!1},MACHINE_CARE:{icon:"care",water:10,energy:.575,duration:60,steps:["MAINWASH","RINSE","DRYING"],scores:!1}},U=["ECO","AUTO","QUICK30","QUICK60","NORMAL90","120_MIN","RINSE","MACHINE_CARE"],L1=[{key:"xtra_dry",entity:"xtra_dry_option",icon:"dry",programs:["ECO","QUICK60","NORMAL90","120_MIN"]},{key:"extra_power",entity:"extra_power_option",icon:"power",programs:["QUICK30","QUICK60","NORMAL90","120_MIN"]},{key:"extra_silent",entity:"extra_silent_option",icon:"silent",programs:["ECO","NORMAL90","120_MIN"]},{key:"glass_care",entity:"glass_care_option",icon:"glass",programs:["QUICK30","QUICK60","NORMAL90","120_MIN"]},{key:"sanitize",entity:"sanitize_option",icon:"sanitize",programs:["QUICK30","QUICK60","NORMAL90","120_MIN"]},{key:"spray_zone",entity:"spray_zone_option",icon:"spray",programs:["QUICK30","QUICK60","NORMAL90","120_MIN"]},{key:"zone_clean",entity:"zone_clean_option",icon:"zone",programs:["QUICK30","QUICK60","NORMAL90","120_MIN"]},{key:"one_rack",entity:"one_rack_option",icon:"rack",programs:["QUICK30","QUICK60"]},{key:"auto_door_opener",entity:"auto_door_opener",icon:"door",programs:null}],M1={[t.OFF]:["on"],[t.IDLE]:["start","off"],[t.READY_TO_START]:["start","off"],[t.DELAYED_START]:["stopreset"],[t.RUNNING]:["pause"],[t.PAUSED]:["resume","stopreset"],[t.END_OF_CYCLE]:["stopreset","off"],[t.ALARM]:["stopreset","off"],[t.UNKNOWN]:[]},r1={on:{icon:"power",style:"ghost"},off:{icon:"power",style:"ghost"},start:{icon:"play",style:"primary"},pause:{icon:"pause",style:"primary"},resume:{icon:"play",style:"primary"},stopreset:{icon:"stop",style:"ghost"}},Q={DISH_ALARM_SALT_MISSING:"warning",DISH_ALARM_RINSE_AID_LOW:"warning",DISH_ALARM_I10:"error",DISH_ALARM_I11:"error",DISH_ALARM_I20:"error",DISH_ALARM_I30:"error",DISH_ALARM_I41:"error",DISH_ALARM_I43:"error",DISH_ALARM_I44:"error",DISH_ALARM_IF1:"error"},e1=[60,120,180,240,360,480,720],h=10,O=1440;function t1(r,C,H){let V=r?.language&&r.language!=="auto"?r.language:null,L=(C?.locale?.language||C?.language||"en").slice(0,2).toLowerCase(),M=V||L;return H.includes(M)?M:"en"}function i1(r,C,H="en"){let V=r[C]||r[H],L=r[H],M=(e,a)=>a.split(".").reduce((i,o)=>i?i[o]:void 0,e);return(e,a="")=>{let i=M(V,e);if(i!==void 0)return i;let o=M(L,e);return o!==void 0?o:a}}var c5={card_name:"Mosogat\xF3g\xE9p",state:{OFF:"Kikapcsolva",IDLE:"K\xE9szenl\xE9tben",READY_TO_START:"Ind\xEDt\xE1sra k\xE9sz",DELAYED_START:"K\xE9sleltetett ind\xEDt\xE1s",RUNNING:"Program fut",PAUSED:"Sz\xFCneteltetve",END_OF_CYCLE:"Elk\xE9sz\xFClt",ALARM:"Hiba",UNKNOWN:"Ismeretlen"},phase:{PREWASH:"El\u0151mos\xE1s",MAINWASH:"Mosogat\xE1s",RINSE:"\xD6bl\xEDt\xE9s",DRYING:"Sz\xE1r\xEDt\xE1s",UNAVAILABLE:"\u2013"},phase_long:{PREWASH:"El\u0151mos\xE1s",MAINWASH:"Mosogat\xE1s",COLDRINSE:"Hideg \xF6bl\xEDt\xE9s",HOTRINSE:"Meleg \xF6bl\xEDt\xE9s",EXTRARINSE:"Extra \xF6bl\xEDt\xE9s",DRYING:"Sz\xE1r\xEDt\xE1s",ADO_DRYING:"AirDry sz\xE1r\xEDt\xE1s",UNAVAILABLE:"Nincs fut\xF3 f\xE1zis"},program:{ECO:"Eco",AUTO:"Auto",QUICK30:"Quick 30",QUICK60:"1h00m",NORMAL90:"1h30m","120_MIN":"2h00m",RINSE:"\xD6bl\xEDt\xE9s \xE9s v\xE1rakoz\xE1s",MACHINE_CARE:"G\xE9p\xE1pol\xE1s"},program_hint:{ECO:"Norm\xE1l szennyezetts\xE9g, a leghat\xE9konyabb v\xEDz- \xE9s energiafogyaszt\xE1s.",AUTO:"B\xE1rmilyen szennyezetts\xE9g, a g\xE9p m\xE9ri a t\xF6ltetet \xE9s a koszt.",QUICK30:"Friss szennyez\u0151d\xE9s, sz\xE1r\xEDt\xE1si f\xE1zis n\xE9lk\xFCl.",QUICK60:"Friss, enyh\xE9n r\xE1sz\xE1radt szennyez\u0151d\xE9s.",NORMAL90:"Norm\xE1l, enyh\xE9n r\xE1sz\xE1radt szennyez\u0151d\xE9s, l\xE1basokhoz is.","120_MIN":"Norm\xE1l, r\xE1sz\xE1radt szennyez\u0151d\xE9s, l\xE1basokhoz \xE9s serpeny\u0151kh\xF6z.",RINSE:"Felfriss\xEDti a k\xE9s\u0151bb mosand\xF3 ed\xE9nyeket. Mos\xF3szer n\xE9lk\xFCl!",MACHINE_CARE:"A g\xE9p belsej\xE9nek tiszt\xEDt\xE1sa v\xEDzk\u0151 \xE9s zs\xEDr ellen."},option:{xtra_dry:"ExtraDry",extra_power:"ExtraPower",extra_silent:"ExtraSilent",glass_care:"GlassCare",sanitize:"Fert\u0151tlen\xEDt\xE9s",spray_zone:"SprayZone",zone_clean:"ZoneClean",one_rack:"Egy kos\xE1r",auto_door_opener:"AutoOpen ajt\xF3"},option_hint:{xtra_dry:"Intenz\xEDvebb sz\xE1r\xEDt\xE1s a program v\xE9g\xE9n.",extra_power:"Er\u0151sebb mosogat\xE1s makacs szennyez\u0151d\xE9shez.",extra_silent:"Halkabb m\u0171k\xF6d\xE9s, hosszabb program.",glass_care:"\xDCveg\xE1rut k\xEDm\xE9l\u0151, max. 45 \xB0C.",sanitize:"Extra fert\u0151tlen\xEDt\u0151 \xF6bl\xEDt\xE9s.",spray_zone:"F\xF3kusz\xE1lt v\xEDzsug\xE1r az als\xF3 kos\xE1rban.",zone_clean:"Als\xF3 kos\xE1r er\u0151s, fels\u0151 kos\xE1r k\xEDm\xE9l\u0151 mos\xE1s.",one_rack:"Csak az egyik kos\xE1r mos\xE1sa.",auto_door_opener:"A ciklus v\xE9g\xE9n automatikusan kinyitja az ajt\xF3t."},command:{on:"Bekapcsol\xE1s",off:"Kikapcsol\xE1s",start:"Ind\xEDt\xE1s",pause:"Sz\xFCnet",resume:"Folytat\xE1s",stopreset:"Le\xE1ll\xEDt\xE1s"},alert:{DISH_ALARM_SALT_MISSING:"A s\xF3tart\xE1lyt fel kell t\xF6lteni",DISH_ALARM_RINSE_AID_LOW:"Az \xF6bl\xEDt\u0151szer-adagol\xF3 ki\xFCr\xFClt",DISH_ALARM_I10:"i10 \u2013 a k\xE9sz\xFCl\xE9k nem t\xF6lt be vizet. Ellen\u0151rizze a v\xEDzcsapot \xE9s a sz\u0171r\u0151t.",DISH_ALARM_I11:"i11 \u2013 a k\xE9sz\xFCl\xE9k nem t\xF6lt be vizet. Ellen\u0151rizze a v\xEDzcsapot \xE9s a sz\u0171r\u0151t.",DISH_ALARM_I20:"i20 \u2013 a k\xE9sz\xFCl\xE9k nem ereszti le a vizet. Ellen\u0151rizze a szifont \xE9s a sz\u0171r\u0151ket.",DISH_ALARM_I30:"i30 \u2013 a t\xFAlcsordul\xE1sg\xE1tl\xF3 bekapcsolt. Z\xE1rja el a v\xEDzcsapot!",DISH_ALARM_IF1:"iF1 \u2013 t\xFAl magas a v\xEDzszint a k\xE9sz\xFCl\xE9kben."},alert_generic:"Riaszt\xE1s",ui:{remaining:"H\xE1tral\xE9v\u0151 id\u0151",ready_at:"Elk\xE9sz\xFCl",starts_at:"Indul",start_in:"Ind\xEDt\xE1s eddig",door:"Ajt\xF3",door_open:"Az ajt\xF3 nyitva",door_closed:"Ajt\xF3 z\xE1rva",program:"Program",options:"Kieg\xE9sz\xEDt\u0151 funkci\xF3k",no_options:"Ehhez a programhoz nincs v\xE1laszthat\xF3 funkci\xF3.",delay:"K\xE9sleltetett ind\xEDt\xE1s",delay_off:"Nincs",delay_cancel:"T\xF6rl\xE9s",delay_amount:"K\xE9sleltet\xE9s",ready_by:"Legyen k\xE9sz",ready_by_hint:"Add meg, mikorra legyen k\xE9sz, majd nyomd meg a pip\xE1t \u2013 a k\xE1rtya kisz\xE1molja a k\xE9sleltet\xE9st, 10 percre lefel\xE9 kerek\xEDtve.",ready_by_apply:"K\xE9sleltet\xE9s kisz\xE1m\xEDt\xE1sa",ready_by_too_soon:"Ennyi id\u0151 alatt nem f\xE9r bele, a legkor\xE1bbi befejez\xE9s",ready_by_max:"A g\xE9p legfeljebb 24 \xF3ra k\xE9sleltet\xE9st fogad el, ennyire \xE1ll\xEDtottam",ready_by_set:"K\xE9sleltet\xE9s be\xE1ll\xEDtva",scores:"Hat\xE9konys\xE1g",scores_updating:"friss\xFCl\u2026",eco_score:"Eco",energy_score:"Energia",water_score:"V\xEDz",consumption:"V\xE1rhat\xF3 fogyaszt\xE1s",water:"V\xEDz",energy:"Energia",duration:"Id\u0151tartam",details:"R\xE9szletek",appliance_settings:"K\xE9sz\xFCl\xE9k be\xE1ll\xEDt\xE1sok",brightness:"Kijelz\u0151 f\xE9nyereje",floor_light:"TimeOnFloor",floor_light_hint:"A h\xE1tral\xE9v\u0151 id\u0151t a padl\xF3ra vet\xEDti.",end_sound:"Befejez\xE9s hangja",end_sound_hint:"Hangjelz\xE9s a program v\xE9g\xE9n.",key_tone:"Gombhangok",key_tone_hint:"A kezel\u0151panel gombjainak hangja.",brightness_hint:"A k\xE9sz\xFCl\xE9k kijelz\u0151j\xE9nek f\xE9nyereje (0\u20139).",remote:"T\xE1vvez\xE9rl\xE9s",remote_on:"Enged\xE9lyezve",remote_off:"Tiltva",remote_locked:"Ideiglenesen z\xE1rolva",cycles:"Lefutott ciklusok",wifi:"Wi-Fi jel",eco_mode:"Eco m\xF3d",rinse_aid:"\xD6bl\xEDt\u0151szer szintje",water_hardness:"V\xEDzkem\xE9nys\xE9g",offline:"Nincs kapcsolat a k\xE9sz\xFCl\xE9kkel",unavailable:"A k\xE9sz\xFCl\xE9k entit\xE1sai nem \xE9rhet\u0151k el",not_configured:"Nem tal\xE1lhat\xF3 Electrolux mosogat\xF3g\xE9p. Add meg a device vagy a prefix be\xE1ll\xEDt\xE1st a k\xE1rtya konfigur\xE1ci\xF3j\xE1ban.",remote_disabled_hint:"A vez\xE9rl\xE9shez enged\xE9lyezd a t\xE1vind\xEDt\xE1st a k\xE9sz\xFCl\xE9ken.",minute_short:"p",hour_short:"\xF3",finished:"A mosogat\xE1s elk\xE9sz\xFClt",finished_hint:"Kipakolhat\xF3",more:"T\xF6bb",less:"Kevesebb",just_now:"kevesebb mint egy perc"},editor:{device:"K\xE9sz\xFCl\xE9k",device_auto:"Automatikus felismer\xE9s",name:"N\xE9v",language:"Nyelv",language_auto:"Automatikus (HA nyelve)",sections:"Megjelen\xEDtett r\xE9szek",show_programs:"Programv\xE1laszt\xF3",show_options:"Kieg\xE9sz\xEDt\u0151 funkci\xF3k",show_delay:"K\xE9sleltetett ind\xEDt\xE1s",show_scores:"Hat\xE9konys\xE1gi pontok",show_consumption:"Fogyaszt\xE1si adatok",show_appliance_settings:"K\xE9sz\xFCl\xE9k be\xE1ll\xEDt\xE1sok",show_details:"R\xE9szletek",show_controls:"Vez\xE9rl\u0151gombok",compact:"Kompakt n\xE9zet",animate:"Anim\xE1ci\xF3k"}},h5={card_name:"Dishwasher",state:{OFF:"Off",IDLE:"Idle",READY_TO_START:"Ready to start",DELAYED_START:"Delayed start",RUNNING:"Running",PAUSED:"Paused",END_OF_CYCLE:"Finished",ALARM:"Fault",UNKNOWN:"Unknown"},phase:{PREWASH:"Prewash",MAINWASH:"Main wash",RINSE:"Rinse",DRYING:"Drying",UNAVAILABLE:"\u2013"},phase_long:{PREWASH:"Prewash",MAINWASH:"Main wash",COLDRINSE:"Cold rinse",HOTRINSE:"Hot rinse",EXTRARINSE:"Extra rinse",DRYING:"Drying",ADO_DRYING:"AirDry drying",UNAVAILABLE:"No active phase"},program:{ECO:"Eco",AUTO:"Auto",QUICK30:"Quick 30",QUICK60:"1h00m",NORMAL90:"1h30m","120_MIN":"2h00m",RINSE:"Rinse & Hold",MACHINE_CARE:"MachineCare"},program_hint:{ECO:"Normally soiled load, most efficient water and energy use.",AUTO:"Any soil level, the machine senses load and soiling.",QUICK30:"Freshly soiled load, no drying phase.",QUICK60:"Fresh, lightly dried-on soiling.",NORMAL90:"Normal, lightly dried-on soiling, pots included.","120_MIN":"Normal, dried-on soiling, pots and pans.",RINSE:"Refreshes dishes waiting for a full cycle. No detergent!",MACHINE_CARE:"Cleans the inside of the machine from limescale and grease."},option:{xtra_dry:"ExtraDry",extra_power:"ExtraPower",extra_silent:"ExtraSilent",glass_care:"GlassCare",sanitize:"Sanitize",spray_zone:"SprayZone",zone_clean:"ZoneClean",one_rack:"One rack",auto_door_opener:"AutoOpen door"},option_hint:{xtra_dry:"Stronger drying at the end of the program.",extra_power:"More powerful wash for stubborn soiling.",extra_silent:"Quieter operation, longer program.",glass_care:"Protects glassware, max. 45 \xB0C.",sanitize:"Extra sanitising rinse.",spray_zone:"Focused spray in the lower basket.",zone_clean:"Intensive lower basket, gentle upper basket.",one_rack:"Washes a single basket only.",auto_door_opener:"Opens the door automatically at the end of the cycle."},command:{on:"Turn on",off:"Turn off",start:"Start",pause:"Pause",resume:"Resume",stopreset:"Stop"},alert:{DISH_ALARM_SALT_MISSING:"Salt container needs refilling",DISH_ALARM_RINSE_AID_LOW:"Rinse aid dispenser is empty",DISH_ALARM_I10:"i10 \u2013 the appliance does not fill with water. Check the tap and the filter.",DISH_ALARM_I11:"i11 \u2013 the appliance does not fill with water. Check the tap and the filter.",DISH_ALARM_I20:"i20 \u2013 the appliance does not drain. Check the siphon and the filters.",DISH_ALARM_I30:"i30 \u2013 anti-flood device triggered. Close the water tap!",DISH_ALARM_IF1:"iF1 \u2013 water level inside the appliance is too high."},alert_generic:"Alert",ui:{remaining:"Remaining",ready_at:"Ready at",starts_at:"Starts at",start_in:"Start in",door:"Door",door_open:"Door is open",door_closed:"Door closed",program:"Program",options:"Options",no_options:"This program has no selectable options.",delay:"Delayed start",delay_off:"None",delay_cancel:"Cancel",delay_amount:"Delay",ready_by:"Ready by",ready_by_hint:"Pick when it should be done and press the tick - the card works out the delay, rounded down to 10 minutes.",ready_by_apply:"Work out the delay",ready_by_too_soon:"That is too soon, the earliest finish is",ready_by_max:"The appliance accepts at most 24 hours, so it was set to that",ready_by_set:"Delay set",scores:"Efficiency",scores_updating:"updating\u2026",eco_score:"Eco",energy_score:"Energy",water_score:"Water",consumption:"Estimated use",water:"Water",energy:"Energy",duration:"Duration",details:"Details",appliance_settings:"Appliance settings",brightness:"Display brightness",floor_light:"TimeOnFloor",floor_light_hint:"Projects the remaining time onto the floor.",end_sound:"End of cycle sound",end_sound_hint:"Beeps when the program finishes.",key_tone:"Key tone",key_tone_hint:"Sound of the control panel buttons.",brightness_hint:"Brightness of the appliance display (0-9).",remote:"Remote control",remote_on:"Enabled",remote_off:"Disabled",remote_locked:"Temporarily locked",cycles:"Total cycles",wifi:"Wi-Fi signal",eco_mode:"Eco mode",rinse_aid:"Rinse aid level",water_hardness:"Water hardness",offline:"The appliance is offline",unavailable:"The appliance entities are unavailable",not_configured:"No Electrolux dishwasher found. Set the device or prefix option in the card configuration.",remote_disabled_hint:"Enable remote start on the appliance to control it.",minute_short:"m",hour_short:"h",finished:"The cycle has finished",finished_hint:"Ready to unload",more:"More",less:"Less",just_now:"less than a minute"},editor:{device:"Device",device_auto:"Auto detect",name:"Name",language:"Language",language_auto:"Automatic (HA language)",sections:"Visible sections",show_programs:"Program picker",show_options:"Options",show_delay:"Delayed start",show_scores:"Efficiency scores",show_consumption:"Consumption figures",show_appliance_settings:"Appliance settings",show_details:"Details",show_controls:"Control buttons",compact:"Compact layout",animate:"Animations"}},a1={hu:c5,en:h5},$=Object.keys(a1);function R(r,C){return t1(r,C,$)}function F(r){return i1(a1,r)}function x(r){return r==null?"":String(r).toUpperCase().replace(/[\s\-.]+/g,"_").replace(/_+/g,"_")}function y(r){return!r||r.state==="unavailable"||r.state==="unknown"}function O5(r){if(!r.length)return null;let C=r[0];for(let H of r.slice(1)){let V=0;for(;V<C.length&&V<H.length&&C[V]===H[V];)V+=1;C=C.slice(0,V)}return C.replace(/_+$/,"")||null}function A1(r,C,H){if(C?.prefix)return C.prefix;let V=new RegExp(`^${H.domain}\\..+_${H.suffix}$`),L=a=>a.replace(new RegExp(`^${H.domain}\\.`),"").replace(new RegExp(`_${H.suffix}$`),"");if(C?.device&&r?.entities){let a=Object.values(r.entities).find(o=>o.device_id===C.device&&V.test(o.entity_id));if(a)return L(a.entity_id);let i=Object.values(r.entities).filter(o=>o.device_id===C.device).map(o=>o.entity_id.split(".")[1]);if(i.length)return O5(i)}let M=C?.entities?.[H.key];if(M)return L(M);let e=Object.keys(r?.states||{}).filter(a=>V.test(a));return e.length===1?L(e[0]):null}function o1(r,C,H,V){let L=C?.entities||{},M={};for(let e of new Set([...Object.keys(H),...Object.keys(L)])){let a=L[e];if(a){M[e]=a;continue}let i=H[e];if(!i||!V)continue;let o=`${i[0]}.${V}_${i[1]}`;r?.states?.[o]&&(M[e]=o)}return M}function d1(r,C){if(!r?.entities||!r?.devices)return[];let H=new RegExp(`^${C.domain}\\..+_${C.suffix}$`),V=new Map;for(let L of Object.values(r.entities)){if(!L.device_id||!H.test(L.entity_id))continue;let M=r.devices[L.device_id];M&&V.set(L.device_id,M.name_by_user||M.name||L.device_id)}return[...V.entries()].map(([L,M])=>({id:L,name:M}))}var p1={domain:"sensor",suffix:"appliance_state",key:"appliance_state"},g5={appliance_state:["sensor","appliance_state"],cycle_phase:["sensor","cycle_phase"],time_to_end:["sensor","time_to_end"],alerts:["sensor","alerts"],eco_score:["sensor","eco_score"],energy_score:["sensor","energy_score"],water_score:["sensor","water_score"],total_cycle_counter:["sensor","total_cycle_counter"],remote_control:["sensor","remote_control"],link_quality:["sensor","network_interface_link_quality_indicator"],door_state:["binary_sensor","door_state"],connectivity:["binary_sensor","connectivity_state"],eco_mode:["binary_sensor","miscellaneous_state_eco_mode"],program:["select","program_uid"],water_hardness:["select","water_hardness"],display_light:["select","display_light"],display_on_floor:["select","display_on_floor"],end_of_cycle_sound:["select","end_of_cycle_sound"],key_tone:["switch","key_tone"],start_time:["number","start_time"],rinse_aid_level:["number","rinse_aid_level"],cmd_on:["button","execute_command_on"],cmd_off:["button","execute_command_off"],cmd_start:["button","execute_command_start"],cmd_pause:["button","execute_command_pause"],cmd_resume:["button","execute_command_resume"],cmd_stopreset:["button","execute_command_stopreset"]},f5=["xtra_dry_option","extra_power_option","extra_silent_option","glass_care_option","sanitize_option","spray_zone_option","zone_clean_option","one_rack_option","auto_door_opener"];function k5(r,C){return A1(r,C,p1)}function m1(r,C){let H=k5(r,C),V=o1(r,C,g5,H);if(V.options={},H)for(let L of f5){let M=`switch.${H}_${L}`;r?.states?.[M]&&(V.options[L]=M)}return V.prefix=H,V}function _(r){return d1(r,p1)}var v1="aeg-dishwasher-card:progress";function g(r){if(y(r))return null;let C=Number(r.state);return Number.isFinite(C)?C:null}function y5(r){let C=g(r);if(C===null||C<0)return null;let H=(r.attributes?.unit_of_measurement||"").toLowerCase();return H==="s"||H==="sec"||H==="seconds"?Math.round(C/60):H==="h"?Math.round(C*60):H?Math.round(C):C>1e3?Math.round(C/60):Math.round(C)}var n1=["NONE","OFF","OK","0","UNKNOWN","UNAVAILABLE"];function w5(r){if(y(r))return[];let C=r.attributes||{},H=Object.entries(C).filter(([a,i])=>/^[A-Z][A-Z0-9_]*$/.test(a)&&typeof i=="string").filter(([,a])=>!n1.includes(x(a).split("-")[0])).map(([a,i])=>({code:x(a),severity:x(String(i).split("-")[0])}));if(H.length)return H;let V=C.alerts??C.alert_list??r.state,L=[];Array.isArray(V)?L=V.map(a=>typeof a=="string"?a:a?.code):typeof V=="string"&&!/^\d+$/.test(V.trim())&&(L=V.split(/[,;]/));let M=L.map(a=>x(a)).filter(a=>a&&!n1.includes(a)).map(a=>({code:a,severity:""}));if(M.length)return M;let e=Number(r.state);return Number.isFinite(e)&&e>0?[{code:"",severity:"",count:e}]:[]}function b5(r){if(!r)return null;let C=r.attributes||{},H=String(C.unit_of_measurement||"").toLowerCase(),V=Number.isFinite(C.max)?C.max:1440,L=H==="s"||H==="sec"||H==="seconds"||!H&&V>5e3,M=g(r);return{raw:M,seconds:L,step:Number.isFinite(C.step)?C.step:L?60:1,min:Number.isFinite(C.min)?C.min:-1,max:V,maxMinutes:L?Math.round(V/60):V,minutes:M===null||M<=0?0:L?Math.round(M/60):M}}function B5(){try{return JSON.parse(window.localStorage.getItem(v1)||"{}")}catch{return{}}}function l1(r){try{window.localStorage.setItem(v1,JSON.stringify(r))}catch{}}function P5(r,C,H,V){let L=H===t.RUNNING||H===t.PAUSED,M=B5(),e=M[r];if(!L)return e&&H!==t.DELAYED_START&&(delete M[r],l1(M)),{progress:H===t.END_OF_CYCLE?1:0,total:null};if(V===null)return{progress:0,total:null};let a=n[C]?.duration||0,i=e&&e.program===C,o=Math.max(V,a,i?e.total:0);return(!i||o!==e.total)&&(M[r]={program:C,total:o},l1(M)),{progress:o?Math.min(1,Math.max(0,1-V/o)):0,total:o}}function x1(r,C){if(y(r))return null;let H=r.attributes?.options||[],V=e=>C.includes(x(e)),L=H.find(V)||null,M=H.find(e=>!V(e))||null;return!L||!M?null:{on:!V(r.state),onOption:M,offOption:L}}function T5(r){if(y(r))return null;let C=L=>{let M=String(L).match(/(\d+)\s*$/);return M?Number(M[1]):null},H=(r.attributes?.options||[]).map(L=>({label:L,value:C(L)})).filter(L=>L.value!==null).sort((L,M)=>L.value-M.value);if(!H.length)return null;let V=H.find(L=>L.label===r.state);return{levels:H,value:V?V.value:C(r.state),min:H[0].value,max:H[H.length-1].value}}function Z1(r,C){let H=m1(r,C),V=l=>H[l]?r.states[H[l]]:void 0,L=V("appliance_state");if(!H.prefix||!L)return{ok:!1,reason:H.prefix?"unavailable":"not_configured",entities:H};let M=x(L.state)in t?x(L.state):t.UNKNOWN,e=V("program"),a=x(e?.state),i=n[a]?a:null,o=x(V("cycle_phase")?.state)||"UNAVAILABLE",p=V1[o]||null,m=y5(V("time_to_end")),{progress:u}=P5(H.prefix,i,M,m),s=b5(V("start_time")),v=s?s.minutes:0,T=V("door_state"),D=T?T.state==="on":null,E=V("connectivity"),N=E?E.state==="on":!0,I=x(V("remote_control")?.state),v5=I===""||I.includes("ENABLED"),W=n[i]?.duration||0,b=m!==null&&m>0?m:null,k=null;if(M===t.RUNNING||M===t.PAUSED)k=m;else if(M===t.DELAYED_START)k=b!==null&&b>v?b:W?v+W:null;else if(M===t.IDLE||M===t.READY_TO_START){let l=b!==null?b:W||null;k=l===null?null:l+v}let Z5=k!==null?new Date(Date.now()+k*6e4):null,s5=v?new Date(Date.now()+v*6e4):null,S5=L1.map(l=>{let z=H.options?.[l.entity],J=z?r.states[z]:void 0;return{...l,entityId:z,on:J?.state==="on",exists:!!J,supported:!l.programs||!i||l.programs.includes(i)}}).filter(l=>l.exists),u5=(e?.attributes?.options||[]).map(l=>({label:l,key:x(l)}));return{ok:!0,entities:H,state:M,accent:H1[M]||"idle",phase:o,step:p,program:i,programRaw:e?.state||null,programOptions:u5,remaining:m,minutesToFinish:k,progress:u,finishAt:Z5,startAt:s5,delay:v,delayControl:s,delayEntity:H.start_time,doorOpen:D,online:N,remote:I,remoteEnabled:v5,alerts:w5(V("alerts")),scores:{eco:g(V("eco_score")),energy:g(V("energy_score")),water:g(V("water_score"))},cycles:g(V("total_cycle_counter")),linkQuality:x(V("link_quality")?.state),ecoMode:V("eco_mode")?.state==="on",rinseAid:g(V("rinse_aid_level")),waterHardness:V("water_hardness")?.state||null,settings:{brightness:T5(V("display_light")),floorLight:x1(V("display_on_floor"),["OFF"]),endSound:x1(V("end_of_cycle_sound"),["NO_SOUND","OFF"]),keyTone:H.key_tone?{on:V("key_tone")?.state==="on"}:null},options:S5,name:C.name||L.attributes?.friendly_name?.replace(/\s*Appliance state$/i,"")||null}}function s1(r,C,H,V,L){return[`M${r+L},${C}`,`H${r+H-L}`,`A${L},${L} 0 0 1 ${r+H},${C+L}`,`V${C+V-L}`,`A${L},${L} 0 0 1 ${r+H-L},${C+V}`,`H${r+L}`,`A${L},${L} 0 0 1 ${r},${C+V-L}`,`V${C+L}`,`A${L},${L} 0 0 1 ${r+L},${C}`,"Z"].join(" ")}var R5=`${s1(8,6,164,202,18)} ${s1(26,52,128,136,12)}`;function S1(){return`
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
      <path class="door-panel" d="${R5}" fill-rule="evenodd"/>
      <rect class="panel-strip" x="18" y="14" width="144" height="28" rx="10"/>
      <circle class="led-ring" cx="32" cy="28" r="7"/>
      <circle class="led" cx="32" cy="28" r="4"/>
      <rect class="display" x="60" y="19" width="60" height="18" rx="6"/>
      <text class="display-text" x="90" y="32" text-anchor="middle">--:--</text>
      <rect class="handle" x="18" y="196" width="144" height="7" rx="3.5"/>
    </g>
  </svg>`}function u1(r,C){let H=r.querySelector(".display-text");H&&H.textContent!==C&&(H.textContent=C)}var c1="M6.59,0.66C8.93,-1.15 11.47,1.06 12.04,4.5C12.47,4.5 12.89,4.62 13.27,4.84C13.79,4.24 14.25,3.42 14.07,2.5C13.65,0.35 16.06,-1.39 18.35,1.58C20.16,3.92 17.95,6.46 14.5,7.03C14.5,7.46 14.39,7.89 14.16,8.27C14.76,8.78 15.58,9.24 16.5,9.06C18.63,8.64 20.38,11.04 17.41,13.34C15.07,15.15 12.53,12.94 11.96,9.5C11.53,9.5 11.11,9.37 10.74,9.15C10.22,9.75 9.75,10.58 9.93,11.5C10.35,13.64 7.94,15.39 5.65,12.42C3.83,10.07 6.05,7.53 9.5,6.97C9.5,6.54 9.63,6.12 9.85,5.74C9.25,5.23 8.43,4.76 7.5,4.94C5.37,5.36 3.62,2.96 6.59,0.66M5,16H7A2,2 0 0,1 9,18V24H7V22H5V24H3V18A2,2 0 0,1 5,16M5,18V20H7V18H5M12.93,16H15L12.07,24H10L12.93,16M18,16H21V18H18V22H21V24H18A2,2 0 0,1 16,22V18A2,2 0 0,1 18,16Z",h1="M19,18.31V20A2,2 0 0,1 17,22H7A2,2 0 0,1 5,20V16.3C4.54,16.12 3.95,16 3,16A1,1 0 0,1 2,15A1,1 0 0,1 3,14C3.82,14 4.47,14.08 5,14.21V12.3C4.54,12.12 3.95,12 3,12A1,1 0 0,1 2,11A1,1 0 0,1 3,10C3.82,10 4.47,10.08 5,10.21V8.3C4.54,8.12 3.95,8 3,8A1,1 0 0,1 2,7A1,1 0 0,1 3,6C3.82,6 4.47,6.08 5,6.21V4A2,2 0 0,1 7,2H17A2,2 0 0,1 19,4V6.16C20.78,6.47 21.54,7.13 21.71,7.29C22.1,7.68 22.1,8.32 21.71,8.71C21.32,9.1 20.8,9.09 20.29,8.71V8.71C20.29,8.71 19.25,8 17,8C15.74,8 14.91,8.41 13.95,8.9C12.91,9.41 11.74,10 10,10C9.64,10 9.31,10 9,9.96V7.95C9.3,8 9.63,8 10,8C11.26,8 12.09,7.59 13.05,7.11C14.09,6.59 15.27,6 17,6V4H7V20H17V18C18.5,18 18.97,18.29 19,18.31M17,10C15.27,10 14.09,10.59 13.05,11.11C12.09,11.59 11.26,12 10,12C9.63,12 9.3,12 9,11.95V13.96C9.31,14 9.64,14 10,14C11.74,14 12.91,13.41 13.95,12.9C14.91,12.42 15.74,12 17,12C19.25,12 20.29,12.71 20.29,12.71V12.71C20.8,13.1 21.32,13.1 21.71,12.71C22.1,12.32 22.1,11.69 21.71,11.29C21.5,11.08 20.25,10 17,10M17,14C15.27,14 14.09,14.59 13.05,15.11C12.09,15.59 11.26,16 10,16C9.63,16 9.3,16 9,15.95V17.96C9.31,18 9.64,18 10,18C11.74,18 12.91,17.41 13.95,16.9C14.91,16.42 15.74,16 17,16C19.25,16 20.29,16.71 20.29,16.71V16.71C20.8,17.1 21.32,17.1 21.71,16.71C22.1,16.32 22.1,15.69 21.71,15.29C21.5,15.08 20.25,14 17,14Z";var O1="M13,13H11V7H13M13,17H11V15H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z";var g1="M12,2L1,21H23M12,6L19.53,19H4.47M11,10V14H13V10M11,16V18H13V16";var f1="M13,9V15H16L12,19L8,15H11V9H8L12,5L16,9H13M4,2H20V4H4V2M4,20H20V22H4V20Z";var k1="M12,6V9L16,5L12,1V4A8,8 0 0,0 4,12C4,13.57 4.46,15.03 5.24,16.26L6.7,14.8C6.25,13.97 6,13 6,12A6,6 0 0,1 12,6M18.76,7.74L17.3,9.2C17.74,10.04 18,11 18,12A6,6 0 0,1 12,18V15L8,19L12,23V20A8,8 0 0,0 20,12C20,10.43 19.54,8.97 18.76,7.74Z";var y1="M10,21H14A2,2 0 0,1 12,23A2,2 0 0,1 10,21M21,19V20H3V19L5,17V11C5,7.9 7.03,5.17 10,4.29C10,4.19 10,4.1 10,4A2,2 0 0,1 12,2A2,2 0 0,1 14,4C14,4.1 14,4.19 14,4.29C16.97,5.17 19,7.9 19,11V17L21,19M17,11A5,5 0 0,0 12,6A5,5 0 0,0 7,11V18H17V11M19.75,3.19L18.33,4.61C20.04,6.3 21,8.6 21,11H23C23,8.07 21.84,5.25 19.75,3.19M1,11H3C3,8.6 3.96,6.3 5.67,4.61L4.25,3.19C2.16,5.25 1,8.07 1,11Z";var w1="M12,18V6A6,6 0 0,1 18,12A6,6 0 0,1 12,18M20,15.31L23.31,12L20,8.69V4H15.31L12,0.69L8.69,4H4V8.69L0.69,12L4,15.31V20H8.69L12,23.31L15.31,20H20V15.31Z";var b1="M19.36,2.72L20.78,4.14L15.06,9.85C16.13,11.39 16.28,13.24 15.38,14.44L9.06,8.12C10.26,7.22 12.11,7.37 13.65,8.44L19.36,2.72M5.93,17.57C3.92,15.56 2.69,13.16 2.35,10.92L7.23,8.83L14.67,16.27L12.58,21.15C10.34,20.81 7.94,19.58 5.93,17.57Z";var B1="M6,11L7,7H17L18,11M18.92,6C18.71,5.4 18.14,5 17.5,5H6.5C5.86,5 5.29,5.4 5.08,6L3,12V20A1,1 0 0,0 4,21H5A1,1 0 0,0 6,20V18H18V20A1,1 0 0,0 19,21H20A1,1 0 0,0 21,20V12L18.92,6M7,16H5V14H7V16M19,16H17V14H19V16M14,16H10V14H14V16Z",P1="M4,3V6H1V20H23V6H20V3H14V6H10V3H4M3,8H21V18H3V8M15,10V12H13V14H15V16H17V14H19V12H17V10H15M5,12V14H11V12H5Z";var T1="M12,3C7,3 3,7 3,12C3,17 7,21 12,21C17,21 21,17 21,12C21,7 17,3 12,3M12,19C8.1,19 5,15.9 5,12C5,8.1 8.1,5 12,5C15.9,5 19,8.1 19,12C19,15.9 15.9,19 12,19M20.5,20.5C22.7,18.3 24,15.3 24,12C24,8.7 22.7,5.7 20.5,3.5L19.4,4.6C21.3,6.5 22.5,9.1 22.5,12C22.5,14.9 21.3,17.5 19.4,19.4L20.5,20.5M4.6,19.4C2.7,17.5 1.5,14.9 1.5,12C1.5,9.1 2.7,6.5 4.6,4.6L3.5,3.5C1.3,5.7 0,8.7 0,12C0,15.3 1.3,18.3 3.5,20.5L4.6,19.4M9.5,7V17H11.5V13H13.5A2,2 0 0,0 15.5,11V9A2,2 0 0,0 13.5,7H9.5M11.5,9H13.5V11H11.5V9Z";var R1="M23 8C23 4.13 19.87 1 16 1C12.47 1 9.57 3.61 9.08 7H4.5C3.84 7 3.28 7.42 3.08 8L1 14V22C1 22.55 1.45 23 2 23H3C3.55 23 4 22.55 4 22V21H16V22C16 22.55 16.45 23 17 23H18C18.55 23 19 22.55 19 22V14.32C21.36 13.19 23 10.79 23 8M4.5 8.5H9.03C9.15 10.26 9.92 11.84 11.11 13H3L4.5 8.5M4.5 18C3.67 18 3 17.33 3 16.5S3.67 15 4.5 15 6 15.67 6 16.5 5.33 18 4.5 18M15.5 18C14.67 18 14 17.33 14 16.5S14.67 15 15.5 15 17 15.67 17 16.5 16.33 18 15.5 18M16 13C14.61 13 13.44 12.5 12.47 11.53C11.5 10.56 11 9.39 11 8C11 6.64 11.5 5.46 12.47 4.5C13.44 3.5 14.61 3 16 3C17.36 3 18.54 3.5 19.5 4.5C20.5 5.46 21 6.64 21 8C21 9.39 20.5 10.56 19.5 11.53C18.54 12.5 17.36 13 16 13M16.5 8.25L19.36 9.94L18.61 11.16L15 9V4H16.5V8.25Z";var F1="M6.5 5C5.84 5 5.28 5.42 5.08 6L3 12V20A1 1 0 0 0 4 21H5A1 1 0 0 0 6 20V19H11.3A7 7 0 0 1 11 17A7 7 0 0 1 14.41 11H5L6.5 6.5H17.5L18.68 10.03A7 7 0 0 1 20.47 10.46L18.92 6C18.72 5.42 18.16 5 17.5 5H6.5M17 12C16.87 12 16.76 12.09 16.74 12.21L16.55 13.53C16.25 13.66 15.96 13.82 15.7 14L14.46 13.5C14.35 13.5 14.22 13.5 14.15 13.63L13.15 15.36C13.09 15.47 13.11 15.6 13.21 15.68L14.27 16.5C14.25 16.67 14.24 16.83 14.24 17C14.24 17.17 14.25 17.33 14.27 17.5L13.21 18.32C13.12 18.4 13.09 18.53 13.15 18.64L14.15 20.37C14.21 20.5 14.34 20.5 14.46 20.5L15.7 20C15.96 20.18 16.24 20.35 16.55 20.47L16.74 21.79C16.76 21.91 16.86 22 17 22H19C19.11 22 19.22 21.91 19.24 21.79L19.43 20.47C19.73 20.34 20 20.18 20.27 20L21.5 20.5C21.63 20.5 21.76 20.5 21.83 20.37L22.83 18.64C22.89 18.53 22.86 18.4 22.77 18.32L21.7 17.5C21.72 17.33 21.74 17.17 21.74 17C21.74 16.83 21.73 16.67 21.7 16.5L22.76 15.68C22.85 15.6 22.88 15.47 22.82 15.36L21.82 13.63C21.76 13.5 21.63 13.5 21.5 13.5L20.27 14C20 13.82 19.73 13.65 19.42 13.53L19.23 12.21C19.22 12.09 19.11 12 19 12H17M6.5 13A1.5 1.5 0 0 1 8 14.5A1.5 1.5 0 0 1 6.5 16A1.5 1.5 0 0 1 5 14.5A1.5 1.5 0 0 1 6.5 13M18 15.5C18.83 15.5 19.5 16.17 19.5 17C19.5 17.83 18.83 18.5 18 18.5C17.16 18.5 16.5 17.83 16.5 17C16.5 16.17 17.17 15.5 18 15.5Z",_1="M5,14H19L17.5,9.5H6.5L5,14M17.5,19A1.5,1.5 0 0,0 19,17.5A1.5,1.5 0 0,0 17.5,16A1.5,1.5 0 0,0 16,17.5A1.5,1.5 0 0,0 17.5,19M6.5,19A1.5,1.5 0 0,0 8,17.5A1.5,1.5 0 0,0 6.5,16A1.5,1.5 0 0,0 5,17.5A1.5,1.5 0 0,0 6.5,19M18.92,9L21,15V23A1,1 0 0,1 20,24H19A1,1 0 0,1 18,23V22H6V23A1,1 0 0,1 5,24H4A1,1 0 0,1 3,23V15L5.08,9C5.28,8.42 5.85,8 6.5,8H17.5C18.15,8 18.72,8.42 18.92,9M12,0C14.12,0 16.15,0.86 17.65,2.35L16.23,3.77C15.11,2.65 13.58,2 12,2C10.42,2 8.89,2.65 7.77,3.77L6.36,2.35C7.85,0.86 9.88,0 12,0M12,4C13.06,4 14.07,4.44 14.82,5.18L13.4,6.6C13.03,6.23 12.53,6 12,6C11.5,6 10.97,6.23 10.6,6.6L9.18,5.18C9.93,4.44 10.94,4 12,4Z",D1="M16,6L15,6.75L17.5,10H13.5V8.5H12V10H3C1.89,10 1,10.89 1,12V15H3A3,3 0 0,0 6,18A3,3 0 0,0 9,15H15A3,3 0 0,0 18,18A3,3 0 0,0 21,15H23V12C23,10.89 22.11,10 21,10H19L16,6M6,13.5A1.5,1.5 0 0,1 7.5,15A1.5,1.5 0 0,1 6,16.5A1.5,1.5 0 0,1 4.5,15A1.5,1.5 0 0,1 6,13.5M18,13.5A1.5,1.5 0 0,1 19.5,15A1.5,1.5 0 0,1 18,16.5A1.5,1.5 0 0,1 16.5,15A1.5,1.5 0 0,1 18,13.5Z";var E1="M19,14H16V16H19V14M22,21H3V11L11,3H21A1,1 0 0,1 22,4V21M11.83,5L5.83,11H20V5H11.83Z";var N1="M3,6H16L19,10H21C22.11,10 23,10.89 23,12V15H21A3,3 0 0,1 18,18A3,3 0 0,1 15,15H9A3,3 0 0,1 6,18A3,3 0 0,1 3,15H1V8C1,6.89 1.89,6 3,6M2.5,7.5V10H10.5V7.5H2.5M12,7.5V10H17.14L15.25,7.5H12M6,13.5A1.5,1.5 0 0,0 4.5,15A1.5,1.5 0 0,0 6,16.5A1.5,1.5 0 0,0 7.5,15A1.5,1.5 0 0,0 6,13.5M18,13.5A1.5,1.5 0 0,0 16.5,15A1.5,1.5 0 0,0 18,16.5A1.5,1.5 0 0,0 19.5,15A1.5,1.5 0 0,0 18,13.5Z";var I1="M13,4.8C9,4.8 9,19.2 13,19.2C17,19.2 22,16.5 22,12C22,7.5 17,4.8 13,4.8M13.1,17.2C12.7,16.8 12,15 12,12C12,9 12.7,7.2 13.1,6.8C16,6.9 20,8.7 20,12C20,15.3 16,17.1 13.1,17.2M2,5H9.5C9.3,5.4 9,5.8 8.9,6.4C8.8,6.6 8.8,6.8 8.7,7H2V5M8,11H2V9H8.2C8.1,9.6 8.1,10.3 8,11M8.7,17C8.9,17.8 9.2,18.4 9.6,19H2.1V17H8.7M8.2,15H2V13H8C8.1,13.7 8.1,14.4 8.2,15Z";var W1="M18 15C18 17.6 16.8 19.9 14.9 21.3L14.4 20.8L12.3 18.7L13.7 17.3L14.9 18.5C15.4 17.8 15.8 16.9 15.9 16H14V14H15.9C15.7 13.1 15.4 12.3 14.9 11.5L13.7 12.7L12.3 11.3L13.5 10.1C12.8 9.6 11.9 9.2 11 9.1V11H9V9.1C8.1 9.3 7.3 9.6 6.5 10.1L9.5 13.1C9.7 13.1 9.8 13 10 13C11.11 13 12 13.9 12 15S11.11 17 10 17 8 16.11 8 15C8 14.8 8 14.7 8.1 14.5L5.1 11.5C4.6 12.2 4.2 13.1 4.1 14H6V16H4.1C4.3 16.9 4.6 17.7 5.1 18.5L6.3 17.3L7.7 18.7L5.1 21.3C3.2 19.9 2 17.6 2 15C2 10.58 5.58 7 10 7S18 10.58 18 15M23 5C23 3.34 21.66 2 20 2S17 3.34 17 5C17 6.3 17.84 7.4 19 7.82V11H21V7.82C22.16 7.4 23 6.3 23 5M20 6C19.45 6 19 5.55 19 5S19.45 4 20 4 21 4.45 21 5 20.55 6 20 6Z";var z1="M16,10L15.8,11H13.5A0.5,0.5 0 0,0 13,11.5A0.5,0.5 0 0,0 13.5,12H15.6L14.6,17H12.5A0.5,0.5 0 0,0 12,17.5A0.5,0.5 0 0,0 12.5,18H14.4L14,20A2,2 0 0,1 12,22A2,2 0 0,1 10,20L9,15H10.5A0.5,0.5 0 0,0 11,14.5A0.5,0.5 0 0,0 10.5,14H8.8L8,10C8,8.8 8.93,7.77 10.29,7.29L8.9,5.28C8.59,4.82 8.7,4.2 9.16,3.89C9.61,3.57 10.23,3.69 10.55,4.14L11,4.8V3A1,1 0 0,1 12,2A1,1 0 0,1 13,3V5.28L14.5,3.54C14.83,3.12 15.47,3.07 15.89,3.43C16.31,3.78 16.36,4.41 16,4.84L13.87,7.35C15.14,7.85 16,8.85 16,10Z";var G1="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z";var U1="M12.5,1.5C10.73,1.5 9.17,2.67 8.67,4.37C8.14,4.13 7.58,4 7,4A4,4 0 0,0 3,8C3,9.82 4.24,11.41 6,11.87V19H19V11.87C20.76,11.41 22,9.82 22,8A4,4 0 0,0 18,4C17.42,4 16.86,4.13 16.33,4.37C15.83,2.67 14.27,1.5 12.5,1.5M12,10.5H13V17.5H12V10.5M9,12.5H10V17.5H9V12.5M15,12.5H16V17.5H15V12.5M6,20V21A1,1 0 0,0 7,22H18A1,1 0 0,0 19,21V20H6Z";var Q1="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z";var $1="M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z";var K1="M4,4H20A2,2 0 0,1 22,6V18A2,2 0 0,1 20,20H4A2,2 0 0,1 2,18V6A2,2 0 0,1 4,4M4,6V18H11V6H4M20,18V6H18.76C19,6.54 18.95,7.07 18.95,7.13C18.88,7.8 18.41,8.5 18.24,8.75L15.91,11.3L19.23,11.28L19.24,12.5L14.04,12.47L14,11.47C14,11.47 17.05,8.24 17.2,7.95C17.34,7.67 17.91,6 16.5,6C15.27,6.05 15.41,7.3 15.41,7.3L13.87,7.31C13.87,7.31 13.88,6.65 14.25,6H13V18H15.58L15.57,17.14L16.54,17.13C16.54,17.13 17.45,16.97 17.46,16.08C17.5,15.08 16.65,15.08 16.5,15.08C16.37,15.08 15.43,15.13 15.43,15.95H13.91C13.91,15.95 13.95,13.89 16.5,13.89C19.1,13.89 18.96,15.91 18.96,15.91C18.96,15.91 19,17.16 17.85,17.63L18.37,18H20M8.92,16H7.42V10.2L5.62,10.76V9.53L8.76,8.41H8.92V16Z";var Y1="M21,16.5C21,16.88 20.79,17.21 20.47,17.38L12.57,21.82C12.41,21.94 12.21,22 12,22C11.79,22 11.59,21.94 11.43,21.82L3.53,17.38C3.21,17.21 3,16.88 3,16.5V7.5C3,7.12 3.21,6.79 3.53,6.62L11.43,2.18C11.59,2.06 11.79,2 12,2C12.21,2 12.41,2.06 12.57,2.18L20.47,6.62C20.79,6.79 21,7.12 21,7.5V16.5M12,4.15L6.04,7.5L12,10.85L17.96,7.5L12,4.15M5,15.91L11,19.29V12.58L5,9.21V15.91M19,15.91V9.21L13,12.58V19.29L19,15.91Z";var j1="M18.32,8H5.67L5.23,4H18.77M12,19A3,3 0 0,1 9,16C9,14 12,10.6 12,10.6C12,10.6 15,14 15,16A3,3 0 0,1 12,19M3,2L5,20.23C5.13,21.23 5.97,22 7,22H17C18,22 18.87,21.23 19,20.23L21,2H3Z";var q1="M12,1.5A2.5,2.5 0 0,1 14.5,4A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 9.5,4A2.5,2.5 0 0,1 12,1.5M15.87,5C18,5 20,7 20,9C22.7,9 22.7,13 20,13H4C1.3,13 1.3,9 4,9C4,7 6,5 8.13,5C8.57,6.73 10.14,8 12,8C13.86,8 15.43,6.73 15.87,5M5,15H8L9,22H7L5,15M10,15H14L13,22H11L10,15M16,15H19L17,22H15L16,15Z";var X1="M18,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V4A2,2 0 0,0 18,2M10,4A1,1 0 0,1 11,5A1,1 0 0,1 10,6A1,1 0 0,1 9,5A1,1 0 0,1 10,4M7,4A1,1 0 0,1 8,5A1,1 0 0,1 7,6A1,1 0 0,1 6,5A1,1 0 0,1 7,4M18,20H6V8H18V20M14.67,15.33C14.69,16.03 14.41,16.71 13.91,17.21C12.86,18.26 11.15,18.27 10.09,17.21C9.59,16.71 9.31,16.03 9.33,15.33C9.4,14.62 9.63,13.94 10,13.33C10.37,12.5 10.81,11.73 11.33,11L12,10C13.79,12.59 14.67,14.36 14.67,15.33";var J1="M16,11H18V13H16V11M12,3H19C20.11,3 21,3.89 21,5V19H22V21H2V19H10V5C10,3.89 10.89,3 12,3M12,5V19H19V5H12Z";var C2="M12,3C10.89,3 10,3.89 10,5H3V19H2V21H22V19H21V5C21,3.89 20.11,3 19,3H12M12,5H19V19H12V5M5,11H7V13H5V11Z";var H2="M16,12A2,2 0 0,1 18,10A2,2 0 0,1 20,12A2,2 0 0,1 18,14A2,2 0 0,1 16,12M10,12A2,2 0 0,1 12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12M4,12A2,2 0 0,1 6,10A2,2 0 0,1 8,12A2,2 0 0,1 6,14A2,2 0 0,1 4,12Z";var V2="M19.77,7.23L19.78,7.22L16.06,3.5L15,4.56L17.11,6.67C16.17,7.03 15.5,7.93 15.5,9A2.5,2.5 0 0,0 18,11.5C18.36,11.5 18.69,11.42 19,11.29V18.5A1,1 0 0,1 18,19.5A1,1 0 0,1 17,18.5V14A2,2 0 0,0 15,12H14V5A2,2 0 0,0 12,3H6A2,2 0 0,0 4,5V21H14V13.5H15.5V18.5A2.5,2.5 0 0,0 18,21A2.5,2.5 0 0,0 20.5,18.5V9C20.5,8.31 20.22,7.68 19.77,7.23M18,10A1,1 0 0,1 17,9A1,1 0 0,1 18,8A1,1 0 0,1 19,9A1,1 0 0,1 18,10M8,18V13.5H6L10,6V11H12L8,18Z";var L2="M12,11A1,1 0 0,0 11,12A1,1 0 0,0 12,13A1,1 0 0,0 13,12A1,1 0 0,0 12,11M12.5,2C17,2 17.11,5.57 14.75,6.75C13.76,7.24 13.32,8.29 13.13,9.22C13.61,9.42 14.03,9.73 14.35,10.13C18.05,8.13 22.03,8.92 22.03,12.5C22.03,17 18.46,17.1 17.28,14.73C16.78,13.74 15.72,13.3 14.79,13.11C14.59,13.59 14.28,14 13.88,14.34C15.87,18.03 15.08,22 11.5,22C7,22 6.91,18.42 9.27,17.24C10.25,16.75 10.69,15.71 10.89,14.79C10.4,14.59 9.97,14.27 9.65,13.87C5.96,15.85 2,15.07 2,11.5C2,7 5.56,6.89 6.74,9.26C7.24,10.25 8.29,10.68 9.22,10.87C9.41,10.39 9.73,9.97 10.14,9.65C8.15,5.96 8.94,2 12.5,2Z";var M2="M17.66 11.2C17.43 10.9 17.15 10.64 16.89 10.38C16.22 9.78 15.46 9.35 14.82 8.72C13.33 7.26 13 4.85 13.95 3C13 3.23 12.17 3.75 11.46 4.32C8.87 6.4 7.85 10.07 9.07 13.22C9.11 13.32 9.15 13.42 9.15 13.55C9.15 13.77 9 13.97 8.8 14.05C8.57 14.15 8.33 14.09 8.14 13.93C8.08 13.88 8.04 13.83 8 13.76C6.87 12.33 6.69 10.28 7.45 8.64C5.78 10 4.87 12.3 5 14.47C5.06 14.97 5.12 15.47 5.29 15.97C5.43 16.57 5.7 17.17 6 17.7C7.08 19.43 8.95 20.67 10.96 20.92C13.1 21.19 15.39 20.8 17.03 19.32C18.86 17.66 19.5 15 18.56 12.72L18.43 12.46C18.22 12 17.66 11.2 17.66 11.2M14.5 17.5C14.22 17.74 13.76 18 13.4 18.1C12.28 18.5 11.16 17.94 10.5 17.28C11.69 17 12.4 16.12 12.61 15.23C12.78 14.43 12.46 13.77 12.33 13C12.21 12.26 12.23 11.63 12.5 10.94C12.69 11.32 12.89 11.7 13.13 12C13.9 13 15.11 13.44 15.37 14.8C15.41 14.94 15.43 15.08 15.43 15.23C15.46 16.05 15.1 16.95 14.5 17.5H14.5Z";var r2="M12,20L12.76,17C9.5,16.79 6.59,15.4 5.75,13.58C5.66,14.06 5.53,14.5 5.33,14.83C4.67,16 3.33,16 2,16C3.1,16 3.5,14.43 3.5,12.5C3.5,10.57 3.1,9 2,9C3.33,9 4.67,9 5.33,10.17C5.53,10.5 5.66,10.94 5.75,11.42C6.4,10 8.32,8.85 10.66,8.32L9,5C11,5 13,5 14.33,5.67C15.46,6.23 16.11,7.27 16.69,8.38C19.61,9.08 22,10.66 22,12.5C22,14.38 19.5,16 16.5,16.66C15.67,17.76 14.86,18.78 14.17,19.33C13.33,20 12.67,20 12,20M17,11A1,1 0 0,0 16,12A1,1 0 0,0 17,13A1,1 0 0,0 18,12A1,1 0 0,0 17,11Z";var e2="M7,2V13H10V22L17,10H13L17,2H7Z";var t2="M15 21H17V19H15M19 9H21V7H19M3 5V19C3 20.1 3.9 21 5 21H9V19H5V5H9V3H5C3.9 3 3 3.9 3 5M19 3V5H21C21 3.9 20.1 3 19 3M11 23H13V1H11M19 17H21V15H19M15 5H17V3H15M19 13H21V11H19M19 21C20.1 21 21 20.1 21 19H19Z";var i2="M20.16 12.73C22.93 9.96 22.57 5.26 19.09 3C17.08 1.67 14.39 1.66 12.36 2.97C10.6 4.1 9.63 5.86 9.46 7.68C9.33 9 8.83 10.23 7.91 11.15L7.88 11.18C6.72 12.34 6.72 14.11 7.81 15.19L8.8 16.18C9.89 17.27 11.66 17.27 12.75 16.18C13.72 15.21 15 14.68 16.39 14.53C17.76 14.38 19.1 13.78 20.16 12.73M6.26 19.86C6.53 20.42 6.44 21.1 5.97 21.56C5.39 22.15 4.44 22.15 3.85 21.56C3.58 21.29 3.44 20.94 3.42 20.58C3.06 20.56 2.71 20.42 2.44 20.15C1.85 19.56 1.85 18.61 2.44 18.03C2.9 17.57 3.59 17.47 4.14 17.74L6.62 15.31C6.76 15.5 6.92 15.72 7.1 15.9L8.09 16.89C8.3 17.09 8.5 17.26 8.76 17.41L6.26 19.86Z";var a2="M11.9 2C8 2 4.9 5.4 5 9.3C5.1 11.9 6.6 14.1 8.7 15.2C10.1 15.9 11 17.3 11 18.8V19C11 20.7 12.3 22 14 22C18 22 19 17 19 9C19 9 19 2 11.9 2M14 20C13.4 20 13 19.6 13 19V18.8C13 16.6 11.7 14.5 9.7 13.4C8.1 12.6 7.1 11 7 9.2C7 7.9 7.5 6.5 8.4 5.5C9.3 4.5 10.6 4 11.8 4C16.7 4 17 8.2 17 9C17 18.9 15.3 20 14 20M15.8 7.6L8.3 10.3C8.1 10 8 9.6 8 9.1C8 8.4 8.2 7.8 8.5 7.1L13.7 5.2C14.9 5.8 15.5 6.7 15.8 7.6M12.9 15.1L15.7 14.1C15.6 15.6 15.3 16.7 15.1 17.4L13.8 17.9C13.8 16.9 13.5 16 12.9 15.1M16 9.2C16 10.4 16 11.5 15.9 12.4L11.9 13.9C11.4 13.4 10.8 12.9 10.1 12.6C9.7 12.4 9.3 12.1 9 11.8L16 9.2Z";var A2="M22,18A4,4 0 0,1 18,22H15A4,4 0 0,1 11,18V16H17.79L20.55,11.23L22.11,12.13L19.87,16H22V18M9,22H2C2,19 2,16 2.33,12.83C2.6,10.3 3.08,7.66 3.6,5H3V3H4L7,3H8V5H7.4C7.92,7.66 8.4,10.3 8.67,12.83C9,16 9,19 9,22Z";var o2="M18 11V6H15V4H12V2H8V5H6V11H5L7 22H17L19 11H18M15.86 11C15.7 11.61 15.4 12.16 15 12.62V8.62L17 9.62V11H15.86M17 7V8.5L15 7.5V7H17M12 5H14V8.5L12 9.5V5M12 10.62L14 9.62V13.45C13.41 13.8 12.73 14 12 14V10.62M11 13.86C10.21 13.65 9.5 13.22 9 12.62V9.62L11 8.62V13.86M9 3H11V7.5L10 8V5H9V3M7 6H9V8.5L8 9V11H7V6Z";var d2="M9,21V22H7V21A2,2 0 0,1 5,19V4A2,2 0 0,1 7,2H17A2,2 0 0,1 19,4V19A2,2 0 0,1 17,21V22H15V21H9M7,4V9H17V4H7M7,19H17V11H7V19M8,12H10V15H8V12M8,6H10V8H8V6Z";var p2="M18,10A1,1 0 0,1 17,9A1,1 0 0,1 18,8A1,1 0 0,1 19,9A1,1 0 0,1 18,10M12,10H6V5H12M19.77,7.23L19.78,7.22L16.06,3.5L15,4.56L17.11,6.67C16.17,7 15.5,7.93 15.5,9A2.5,2.5 0 0,0 18,11.5C18.36,11.5 18.69,11.42 19,11.29V18.5A1,1 0 0,1 18,19.5A1,1 0 0,1 17,18.5V14C17,12.89 16.1,12 15,12H14V5C14,3.89 13.1,3 12,3H6C4.89,3 4,3.89 4,5V21H14V13.5H15.5V18.5A2.5,2.5 0 0,0 18,21A2.5,2.5 0 0,0 20.5,18.5V9C20.5,8.31 20.22,7.68 19.77,7.23Z";var m2="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12C20,14.4 19,16.5 17.3,18C15.9,16.7 14,16 12,16C10,16 8.2,16.7 6.7,18C5,16.5 4,14.4 4,12A8,8 0 0,1 12,4M14,5.89C13.62,5.9 13.26,6.15 13.1,6.54L11.81,9.77L11.71,10C11,10.13 10.41,10.6 10.14,11.26C9.73,12.29 10.23,13.45 11.26,13.86C12.29,14.27 13.45,13.77 13.86,12.74C14.12,12.08 14,11.32 13.57,10.76L13.67,10.5L14.96,7.29L14.97,7.26C15.17,6.75 14.92,6.17 14.41,5.96C14.28,5.91 14.15,5.89 14,5.89M10,6A1,1 0 0,0 9,7A1,1 0 0,0 10,8A1,1 0 0,0 11,7A1,1 0 0,0 10,6M7,9A1,1 0 0,0 6,10A1,1 0 0,0 7,11A1,1 0 0,0 8,10A1,1 0 0,0 7,9M17,9A1,1 0 0,0 16,10A1,1 0 0,0 17,11A1,1 0 0,0 18,10A1,1 0 0,0 17,9Z";var n2="M10,9A1,1 0 0,1 11,8A1,1 0 0,1 12,9V13.47L13.21,13.6L18.15,15.79C18.68,16.03 19,16.56 19,17.14V21.5C18.97,22.32 18.32,22.97 17.5,23H11C10.62,23 10.26,22.85 10,22.57L5.1,18.37L5.84,17.6C6.03,17.39 6.3,17.28 6.58,17.28H6.8L10,19V9M11,5A4,4 0 0,1 15,9C15,10.5 14.2,11.77 13,12.46V11.24C13.61,10.69 14,9.89 14,9A3,3 0 0,0 11,6A3,3 0 0,0 8,9C8,9.89 8.39,10.69 9,11.24V12.46C7.8,11.77 7,10.5 7,9A4,4 0 0,1 11,5Z";var l2="M15.5,21.27L14.66,21.18C13.9,21.11 13.25,20.6 13,19.87C12.47,17.91 12.47,15.83 13,13.87C15.32,13.4 17,11.37 17,9C17,7 15,2 15,2H9C9,2 7,7 7,9C7,11.38 8.67,13.42 11,13.9C11.53,15.86 11.53,17.94 11,19.9C10.76,20.62 10.12,21.13 9.37,21.21L8.5,21.3C8.5,21.3 8,21.28 8,22H16C16,21.28 15.5,21.27 15.5,21.27M9.44,7L10.44,4H13.56L14.56,7H9.44Z";var x2="M8.06,2C7.88,3.17 8.17,4.16 8.95,4.97C9.45,5.47 9.61,6.14 9.42,7H10.41C10.53,6.45 10.55,6 10.45,5.55C10.36,5.13 10.05,4.63 9.5,4.03C9.05,3.47 8.89,2.8 9.05,2H8.06M10.55,2C10.36,3.17 10.66,4.16 11.44,4.97C11.94,5.47 12.09,6.14 11.91,7H12.89C13,6.45 13.03,6 12.94,5.55C12.84,5.13 12.53,4.63 12,4.03C11.53,3.47 11.38,2.8 11.53,2H10.55M13.08,2C12.89,3.17 13.19,4.16 13.97,4.97C14.47,5.47 14.61,6.14 14.39,7H15.42C15.55,6.45 15.56,6 15.47,5.55C15.38,5.13 15.06,4.63 14.53,4.03C14.06,3.47 13.91,2.8 14.06,2H13.08M5,8C5,9.42 5.39,10.7 6.14,11.84C6.87,12.96 7.91,13.85 9.14,14.39L5.16,20.44C5.06,20.56 5,20.75 5,21C5,21.41 5.16,21.69 5.44,21.84C5.56,21.94 5.75,22 6,22C6.41,22 6.69,21.84 6.84,21.56L7.83,19.97H14.2C14.41,20.55 14.79,21.05 15.28,21.42C15.78,21.8 16.36,22 17,22C17.83,22 18.53,21.69 19.13,21.09C19.72,20.5 20,19.8 20,19C20,18.17 19.72,17.47 19.13,16.88C18.53,16.28 17.83,16 17,16C16.36,16 15.78,16.17 15.28,16.55C14.78,16.92 14.42,17.41 14.2,18H9.14L11.11,14.95C11.27,15 11.56,15 12,15C12.44,15 12.73,15 12.89,14.95L13.88,16.5C14.29,15.96 14.84,15.54 15.47,15.28L14.91,14.39C16.03,13.89 17,13 17.79,11.77C18.59,10.5 19,9.27 19,8H5M17,18C17.3,18 17.53,18.09 17.72,18.28C17.91,18.47 18,18.72 18,19C18,19.27 17.91,19.5 17.72,19.71C17.54,19.91 17.28,20 17,20C16.74,20 16.5,19.91 16.29,19.71C16.09,19.5 16,19.26 16,19C16,18.7 16.09,18.47 16.29,18.28C16.5,18.09 16.73,18 17,18Z";var K="M8.5 4.5L5.4 9.5L8.5 14.7L5.2 20.5L3.4 19.6L6.1 14.7L3 9.5L6.7 3.6L8.5 4.5M14.7 4.4L11.6 9.5L14.7 14.5L11.4 20.3L9.6 19.4L12.3 14.5L9.2 9.5L12.9 3.5L14.7 4.4M21 4.4L17.9 9.5L21 14.5L17.7 20.3L15.9 19.4L18.6 14.5L15.5 9.5L19.2 3.5L21 4.4";var v2="M13.5,8H12V13L16.28,15.54L17,14.33L13.5,12.25V8M13,3A9,9 0 0,0 4,12H1L4.96,16.03L9,12H6A7,7 0 0,1 13,5A7,7 0 0,1 20,12A7,7 0 0,1 13,19C11.07,19 9.32,18.21 8.06,16.94L6.64,18.36C8.27,20 10.5,21 13,21A9,9 0 0,0 22,12A9,9 0 0,0 13,3";var Z2="M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11V17Z";var s2="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z";var S2="M12,2A7,7 0 0,1 19,9C19,11.38 17.81,13.47 16,14.74V17A1,1 0 0,1 15,18H9A1,1 0 0,1 8,17V14.74C6.19,13.47 5,11.38 5,9A7,7 0 0,1 12,2M9,21V20H15V21A1,1 0 0,1 14,22H10A1,1 0 0,1 9,21M12,4A5,5 0 0,0 7,9C7,11.05 8.23,12.81 10,13.58V16H14V13.58C15.77,12.81 17,11.05 17,9A5,5 0 0,0 12,4Z";var u2="M11 15H6L13 1V9H18L11 23V15Z";var c2="M12,17A2,2 0 0,0 14,15C14,13.89 13.1,13 12,13A2,2 0 0,0 10,15A2,2 0 0,0 12,17M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V10C4,8.89 4.9,8 6,8H7V6A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,3A3,3 0 0,0 9,6V8H15V6A3,3 0 0,0 12,3Z";var h2="M18 1C15.24 1 13 3.24 13 6V8H4C2.9 8 2 8.89 2 10V20C2 21.11 2.9 22 4 22H16C17.11 22 18 21.11 18 20V10C18 8.9 17.11 8 16 8H15V6C15 4.34 16.34 3 18 3C19.66 3 21 4.34 21 6V8H23V6C23 3.24 20.76 1 18 1M10 13C11.1 13 12 13.89 12 15C12 16.11 11.11 17 10 17C8.9 17 8 16.11 8 15C8 13.9 8.9 13 10 13Z";var O2="M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z";var g2="M8 18C6.67 18 5.79 18.79 5.29 19.29S4.67 20 4 20 3.21 19.79 2.71 19.29C2.35 18.93 1.79 18.42 1 18.16V20.41C1.09 20.5 1.18 20.59 1.29 20.71C1.79 21.21 2.67 22 4 22S6.21 21.21 6.71 20.71 7.33 20 8 20 8.79 20.21 9.29 20.71C9.73 21.14 10.44 21.8 11.5 21.96C11.66 22 11.83 22 12 22C13.33 22 14.21 21.21 14.71 20.71S15.33 20 16 20 16.79 20.21 17.29 20.71 18.67 22 20 22 22.21 21.21 22.71 20.71C22.82 20.59 22.91 20.5 23 20.41V18.16C22.21 18.42 21.65 18.93 21.29 19.29C20.79 19.79 20.67 20 20 20S19.21 19.79 18.71 19.29 17.33 18 16 18 13.79 18.79 13.29 19.29 12.67 20 12 20C11.78 20 11.63 19.97 11.5 19.92C11.22 19.82 11.05 19.63 10.71 19.29C10.21 18.79 9.33 18 8 18M22 10.5C22 10.5 24 12.67 24 14C24 15.1 23.1 16 22 16S20 15.1 20 14C20 12.67 22 10.5 22 10.5M22.5 7.13L19.24 5.24L12.73 9C12.39 8.4 11.74 8 11 8H9V6H10C10.55 6 11 5.55 11 5S10.55 4 10 4H6C5.45 4 5 4.45 5 5S5.45 6 6 6H7V8H5C3.9 8 3 8.9 3 10V13C3 14.1 3.9 15 5 15H14C14.75 15 15.41 14.58 15.75 13.97L19.4 7.65L21.5 8.86C22 9.14 22.59 8.97 22.87 8.5C23.14 8 23 7.4 22.5 7.13M14 13H5V10H11.69L12.6 11.43L16.06 9.43L14 13M3.5 6.92L1.79 8.62A1 1 0 0 1 .38 7.21L2.09 5.5A1 1 0 0 1 3.5 5.5C3.89 5.89 3.89 6.5 3.5 6.92Z";var f2="M14.53 1.45L13.45 2.53L15.05 4.13C15.27 4.38 15.38 4.67 15.38 5S15.27 5.64 15.05 5.86L11.5 9.47L12.5 10.55L16.13 6.94C16.66 6.35 16.92 5.7 16.92 5C16.92 4.3 16.66 3.64 16.13 3.05L14.53 1.45M10.55 3.47L9.47 4.55L10.08 5.11C10.3 5.33 10.41 5.63 10.41 6S10.3 6.67 10.08 6.89L9.47 7.45L10.55 8.53L11.11 7.92C11.64 7.33 11.91 6.69 11.91 6C11.91 5.28 11.64 4.63 11.11 4.03L10.55 3.47M21 5.06C20.31 5.06 19.67 5.33 19.08 5.86L13.45 11.5L14.53 12.5L20.11 6.94C20.36 6.69 20.66 6.56 21 6.56S21.64 6.69 21.89 6.94L22.5 7.55L23.53 6.47L22.97 5.86C22.38 5.33 21.72 5.06 21 5.06M7 8L2 22L16 17L7 8M19 11.06C18.3 11.06 17.66 11.33 17.06 11.86L15.47 13.45L16.55 14.53L18.14 12.94C18.39 12.69 18.67 12.56 19 12.56C19.33 12.56 19.63 12.69 19.88 12.94L21.5 14.53L22.55 13.5L20.95 11.86C20.36 11.33 19.7 11.06 19 11.06Z";var k2="M14,19H18V5H14M6,19H10V5H6V19Z";var y2="M8,5.14V19.14L19,12.14L8,5.14Z";var w2="M14.6 9L18 3.1L19.7 4.1L16.9 9H14.6M14 10H3V12H5V19C5 20.1 5.9 21 7 21H17C18.1 21 19 20.1 19 19V12H21V10H14Z";var b2="M19 19C19 20.11 18.11 21 17 21H7C5.9 21 5 20.11 5 19V12H3V10H21V12H19M8 1.5C6.15 1.5 4.65 3 4.65 4.85C4.65 6.7 6.15 8.2 8 8.2H9.53C9.92 8.2 10.29 8.3 10.61 8.5H12.63C12.05 7.45 10.86 6.75 9.53 6.75H8C7 6.75 6.15 5.77 6.15 4.75C6.15 3.73 7 3 8 3M12.85 2C12.85 3 12 3.85 11 3.85V5.35C12.92 5.35 14.5 6.7 14.89 8.5H16.42C16.12 6.67 14.96 5.15 13.35 4.38C13.97 3.77 14.35 2.93 14.35 2Z";var B2="M16.56,5.44L15.11,6.89C16.84,7.94 18,9.83 18,12A6,6 0 0,1 12,18A6,6 0 0,1 6,12C6,9.83 7.16,7.94 8.88,6.88L7.44,5.44C5.36,6.88 4,9.28 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12C20,9.28 18.64,6.88 16.56,5.44M13,3H11V13H13";var P2="M16,6C14.87,6 13.77,6.35 12.84,7H4C2.89,7 2,7.89 2,9V15C2,16.11 2.89,17 4,17H5V18A1,1 0 0,0 6,19H8A1,1 0 0,0 9,18V17H15V18A1,1 0 0,0 16,19H18A1,1 0 0,0 19,18V17H20C21.11,17 22,16.11 22,15V9C22,7.89 21.11,7 20,7H19.15C18.23,6.35 17.13,6 16,6M16,7.5A3.5,3.5 0 0,1 19.5,11A3.5,3.5 0 0,1 16,14.5A3.5,3.5 0 0,1 12.5,11A3.5,3.5 0 0,1 16,7.5M4,9H8V10H4V9M16,9A2,2 0 0,0 14,11A2,2 0 0,0 16,13A2,2 0 0,0 18,11A2,2 0 0,0 16,9M4,11H8V12H4V11M4,13H8V14H4V13Z";var T2="M12,0C8.96,0 6.21,1.23 4.22,3.22L5.63,4.63C7.26,3 9.5,2 12,2C14.5,2 16.74,3 18.36,4.64L19.77,3.23C17.79,1.23 15.04,0 12,0M7.05,6.05L8.46,7.46C9.37,6.56 10.62,6 12,6C13.38,6 14.63,6.56 15.54,7.46L16.95,6.05C15.68,4.78 13.93,4 12,4C10.07,4 8.32,4.78 7.05,6.05M12,15A2,2 0 0,1 10,13A2,2 0 0,1 12,11A2,2 0 0,1 14,13A2,2 0 0,1 12,15M15,9H9A1,1 0 0,0 8,10V22A1,1 0 0,0 9,23H15A1,1 0 0,0 16,22V10A1,1 0 0,0 15,9Z";var R2="M18.1,4.8C18,4.3 17.6,4 17.1,4H13L13.2,7H10.8L11,4H6.8C6.3,4 5.9,4.4 5.8,4.8L3.1,18.8C3,19.4 3.5,20 4.1,20H10L10.3,15H13.7L14,20H19.8C20.4,20 20.9,19.4 20.8,18.8L18.1,4.8M10.4,13L10.6,9H13.2L13.4,13H10.4Z";var F2="M16.88 4L16.88 4L19.03 6.1L13.5 10.5L12.5 9.5L16.87 4L16.88 4M16.88 2C16.3 2 15.73 2.24 15.33 2.72L9.8 9.65L13.34 13.19L20.28 7.67C21.18 6.91 21.25 5.54 20.41 4.7L18.3 2.59C17.9 2.19 17.39 2 16.88 2M9.1 10.36L8.39 11.07C8 11.46 8 12.09 8.39 12.5L10.5 14.6C10.71 14.8 10.96 14.89 11.22 14.89S11.73 14.8 11.93 14.6L12.63 13.9L9.1 10.36M6 15C5.45 15 5 15.45 5 16C5 16.55 5.45 17 6 17C6.55 17 7 16.55 7 16C7 15.45 6.55 15 6 15M9 16C8.45 16 8 16.45 8 17S8.45 18 9 18C9.55 18 10 17.55 10 17S9.55 16 9 16M4 18C3.45 18 3 18.45 3 19S3.45 20 4 20C4.55 20 5 19.55 5 19S4.55 18 4 18M7 19C6.45 19 6 19.45 6 20S6.45 21 7 21C7.55 21 8 20.55 8 20S7.55 19 7 19Z";var _2="M10.6 9.6L9 15L7.4 9.6L2 8L7.4 6.4L9 1L10.6 6.4L16 8L10.6 9.6M17 14.2L21 12L18.8 16L21 20L17 17.8L13 20L15.2 16L13 12L17 14.2M10 16L8.3 19L10 22L7 20.3L4 22L5.7 19L4 16L7 17.7L10 16";var D2="M20.79,13.95L18.46,14.57L16.46,13.44V10.56L18.46,9.43L20.79,10.05L21.31,8.12L19.54,7.65L20,5.88L18.07,5.36L17.45,7.69L15.45,8.82L13,7.38V5.12L14.71,3.41L13.29,2L12,3.29L10.71,2L9.29,3.41L11,5.12V7.38L8.5,8.82L6.5,7.69L5.92,5.36L4,5.88L4.47,7.65L2.7,8.12L3.22,10.05L5.55,9.43L7.55,10.56V13.45L5.55,14.58L3.22,13.96L2.7,15.89L4.47,16.36L4,18.12L5.93,18.64L6.55,16.31L8.55,15.18L11,16.62V18.88L9.29,20.59L10.71,22L12,20.71L13.29,22L14.7,20.59L13,18.88V16.62L15.5,15.17L17.5,16.3L18.12,18.63L20,18.12L19.53,16.35L21.3,15.88L20.79,13.95M9.5,10.56L12,9.11L14.5,10.56V13.44L12,14.89L9.5,13.44V10.56Z";var E2="M8 17.85C8 19.04 7.11 20 6 20S4 19.04 4 17.85C4 16.42 6 14 6 14S8 16.42 8 17.85M16.46 12V10.56L18.46 9.43L20.79 10.05L21.31 8.12L19.54 7.65L20 5.88L18.07 5.36L17.45 7.69L15.45 8.82L13 7.38V5.12L14.71 3.41L13.29 2L12 3.29L10.71 2L9.29 3.41L11 5.12V7.38L8.5 8.82L6.5 7.69L5.92 5.36L4 5.88L4.47 7.65L2.7 8.12L3.22 10.05L5.55 9.43L7.55 10.56V12H2V13H22V12H16.46M9.5 12V10.56L12 9.11L14.5 10.56V12H9.5M20 17.85C20 19.04 19.11 20 18 20S16 19.04 16 17.85C16 16.42 18 14 18 14S20 16.42 20 17.85M14 20.85C14 22.04 13.11 23 12 23S10 22.04 10 20.85C10 19.42 12 17 12 17S14 19.42 14 20.85Z";var N2="M14.25,12L16.27,11H23L22,9H18.03L20.42,5.83L19.43,3.83L15.37,9.2L13.35,10.21L13.75,8L17.83,2.62L15.64,2.22L12,7L8.4,2.2L6.2,2.6L10.26,8L10.66,10.21L8.82,9.29L8.66,9.21L4.6,3.8L3.6,5.8L6,9H2L1,11H7.77L9.75,12L7.73,13H1L2,15H5.97L3.58,18.17L4.57,20.17L8.63,14.8L10.65,13.79L10.25,16L6.17,21.38L8.36,21.79L12,17L15.6,21.8L17.8,21.4L13.74,16L13.34,13.79L15.34,14.79L19.4,20.2L20.4,18.2L18,15H22L23,13H16.23";var I2="M12,16A3,3 0 0,1 9,13C9,11.88 9.61,10.9 10.5,10.39L20.21,4.77L14.68,14.35C14.18,15.33 13.17,16 12,16M12,3C13.81,3 15.5,3.5 16.97,4.32L14.87,5.53C14,5.19 13,5 12,5A8,8 0 0,0 4,13C4,15.21 4.89,17.21 6.34,18.65H6.35C6.74,19.04 6.74,19.67 6.35,20.06C5.96,20.45 5.32,20.45 4.93,20.07V20.07C3.12,18.26 2,15.76 2,13A10,10 0 0,1 12,3M22,13C22,15.76 20.88,18.26 19.07,20.07V20.07C18.68,20.45 18.05,20.45 17.66,20.06C17.27,19.67 17.27,19.04 17.66,18.65V18.65C19.11,17.2 20,15.21 20,13C20,12 19.81,11 19.46,10.1L20.67,8C21.5,9.5 22,11.18 22,13Z";var W2="M16.72 10.43C14.68 8.39 14.5 4.66 14.5 4H13V6H9V4H7C7 2.9 7.9 2 9 2H16V3C16 3.08 16.04 7.63 17.78 9.37L16.72 10.43M17 2V4H18V2H17M15 12C13 10 13 7 13 7H9V9C9 10 9 10 8 11S7 13 7 13V20C7 21.1 7.9 22 9 22H13C14.1 22 15 21.1 15 20V12Z";var z2="M12,15.39L8.24,17.66L9.23,13.38L5.91,10.5L10.29,10.13L12,6.09L13.71,10.13L18.09,10.5L14.77,13.38L15.76,17.66M22,9.24L14.81,8.63L12,2L9.19,8.63L2,9.24L7.45,13.97L5.82,21L12,17.27L18.18,21L16.54,13.97L22,9.24Z";var G2="M13,19.92C14.8,19.7 16.35,18.95 17.65,17.65C18.95,16.35 19.7,14.8 19.92,13H16.92C16.7,14 16.24,14.84 15.54,15.54C14.84,16.24 14,16.7 13,16.92V19.92M10,8H14L17,11H19.92C19.67,9.05 18.79,7.38 17.27,6C15.76,4.66 14,4 12,4C10,4 8.24,4.66 6.73,6C5.21,7.38 4.33,9.05 4.08,11H7L10,8M11,19.92V16.92C10,16.7 9.16,16.24 8.46,15.54C7.76,14.84 7.3,14 7.08,13H4.08C4.3,14.77 5.05,16.3 6.35,17.6C7.65,18.9 9.2,19.67 11,19.92M12,2C14.75,2 17.1,3 19.05,4.95C21,6.9 22,9.25 22,12C22,14.75 21,17.1 19.05,19.05C17.1,21 14.75,22 12,22C9.25,22 6.9,21 4.95,19.05C3,17.1 2,14.75 2,12C2,9.25 3,6.9 4.95,4.95C6.9,3 9.25,2 12,2Z";var U2="M18,18H6V6H18V18Z";var Q2="M22.08,11.04H20.08V4H13.05V2H11.04V4H4V11.04H2V13.05H4V20.08H11.04V22.08H13.05V20.08H20.08V13.05H22.08V11.04M18.07,18.07H13.05V16.06H11.04V18.07H6V13.05H8.03V11.04H6V6H11.04V8.03H13.05V6H18.07V11.04H16.06V13.05H18.07V18.07M13.05,12.05A1,1 0 0,1 12.05,13.05C11.5,13.05 11.04,12.6 11.04,12.05C11.04,11.5 11.5,11.04 12.05,11.04C12.6,11.04 13.05,11.5 13.05,12.05Z";var $2="M15 13V5A3 3 0 0 0 9 5V13A5 5 0 1 0 15 13M12 4A1 1 0 0 1 13 5V8H11V5A1 1 0 0 1 12 4Z";var K2="M19.47 3.47L13.47 9.47L10.53 10C10.22 10.03 9.94 10.18 9.72 10.4L2.81 17.31C1.74 18.38 1.74 20.12 2.81 21.2C3.88 22.27 5.62 22.27 6.7 21.2L13.61 14.29C13.83 14.07 14 13.79 14.03 13.5L14.54 10.54L20.54 4.54L22 2L19.47 3.47M11 14.38C10.24 14.38 9.62 13.76 9.62 13S10.24 11.62 11 11.62 12.38 12.24 12.38 13C12.37 13.76 11.76 14.38 11 14.38Z";var Y2="M12,20A7,7 0 0,1 5,13A7,7 0 0,1 12,6A7,7 0 0,1 19,13A7,7 0 0,1 12,20M19.03,7.39L20.45,5.97C20,5.46 19.55,5 19.04,4.56L17.62,6C16.07,4.74 14.12,4 12,4A9,9 0 0,0 3,13A9,9 0 0,0 12,22C17,22 21,17.97 21,13C21,10.88 20.26,8.93 19.03,7.39M11,14H13V8H11M15,1H9V3H15V1Z";var j2="M6,2H18V8H18V8L14,12L18,16V16H18V22H6V16H6V16L10,12L6,8V8H6V2M16,16.5L12,12.5L8,16.5V20H16V16.5M12,11.5L16,7.5V4H8V7.5L12,11.5M10,6H14V6.75L12,8.75L10,6.75V6Z";var q2="M4,5A2,2 0 0,0 2,7V17A2,2 0 0,0 4,19H20A2,2 0 0,0 22,17V7A2,2 0 0,0 20,5H4M4,7H16V17H4V7M19,7A1,1 0 0,1 20,8A1,1 0 0,1 19,9A1,1 0 0,1 18,8A1,1 0 0,1 19,7M6,9V11H14V9H6M19,11A1,1 0 0,1 20,12A1,1 0 0,1 19,13A1,1 0 0,1 18,12A1,1 0 0,1 19,11Z";var X2="M2 12H4V17H20V12H22V17C22 18.11 21.11 19 20 19H4C2.9 19 2 18.11 2 17V12M12 15L17.55 9.54L16.13 8.13L13 11.25V2H11V11.25L7.88 8.13L6.46 9.55L12 15Z";var J2="M8 13C6.14 13 4.59 14.28 4.14 16H2V18H4.14C4.59 19.72 6.14 21 8 21S11.41 19.72 11.86 18H22V16H11.86C11.41 14.28 9.86 13 8 13M8 19C6.9 19 6 18.1 6 17C6 15.9 6.9 15 8 15S10 15.9 10 17C10 18.1 9.1 19 8 19M19.86 6C19.41 4.28 17.86 3 16 3S12.59 4.28 12.14 6H2V8H12.14C12.59 9.72 14.14 11 16 11S19.41 9.72 19.86 8H22V6H19.86M16 9C14.9 9 14 8.1 14 7C14 5.9 14.9 5 16 5S18 5.9 18 7C18 8.1 17.1 9 16 9Z";var C5="M21,10.12H14.22L16.96,7.3C14.23,4.6 9.81,4.5 7.08,7.2C4.35,9.91 4.35,14.28 7.08,17C9.81,19.7 14.23,19.7 16.96,17C18.32,15.65 19,14.08 19,12.1H21C21,14.08 20.12,16.65 18.36,18.39C14.85,21.87 9.15,21.87 5.64,18.39C2.14,14.92 2.11,9.28 5.62,5.81C9.13,2.34 14.76,2.34 18.27,5.81L21,3V10.12M12.5,8V12.25L16,14.33L15.28,15.54L11,13V8H12.5Z";var H5="M12,4L9.91,6.09L12,8.18M4.27,3L3,4.27L7.73,9H3V15H7L12,20V13.27L16.25,17.53C15.58,18.04 14.83,18.46 14,18.7V20.77C15.38,20.45 16.63,19.82 17.68,18.96L19.73,21L21,19.73L12,10.73M19,12C19,12.94 18.8,13.82 18.46,14.64L19.97,16.15C20.62,14.91 21,13.5 21,12C21,7.72 18,4.14 14,3.23V5.29C16.89,6.15 19,8.83 19,12M16.5,12C16.5,10.23 15.5,8.71 14,7.97V10.18L16.45,12.63C16.5,12.43 16.5,12.21 16.5,12Z";var V5="M12,20A6,6 0 0,1 6,14C6,10 12,3.25 12,3.25C12,3.25 18,10 18,14A6,6 0 0,1 12,20Z";var Y="M12,3.25C12,3.25 6,10 6,14C6,17.32 8.69,20 12,20A6,6 0 0,0 18,14C18,10 12,3.25 12,3.25M14.47,9.97L15.53,11.03L9.53,17.03L8.47,15.97M9.75,10A1.25,1.25 0 0,1 11,11.25A1.25,1.25 0 0,1 9.75,12.5A1.25,1.25 0 0,1 8.5,11.25A1.25,1.25 0 0,1 9.75,10M14.25,14.5A1.25,1.25 0 0,1 15.5,15.75A1.25,1.25 0 0,1 14.25,17A1.25,1.25 0 0,1 13,15.75A1.25,1.25 0 0,1 14.25,14.5Z";var L5="M3,15H13A1,1 0 0,1 14,16A1,1 0 0,1 13,17H3A1,1 0 0,1 2,16A1,1 0 0,1 3,15M16,15H21A1,1 0 0,1 22,16A1,1 0 0,1 21,17H16A1,1 0 0,1 15,16A1,1 0 0,1 16,15M1,12A5,5 0 0,1 6,7C7,4.65 9.3,3 12,3C15.43,3 18.24,5.66 18.5,9.03L19,9C21.19,9 22.97,10.76 23,13H21A2,2 0 0,0 19,11H17V10A5,5 0 0,0 12,5C9.5,5 7.45,6.82 7.06,9.19C6.73,9.07 6.37,9 6,9A3,3 0 0,0 3,12C3,12.35 3.06,12.69 3.17,13H1.1L1,12M3,19H5A1,1 0 0,1 6,20A1,1 0 0,1 5,21H3A1,1 0 0,1 2,20A1,1 0 0,1 3,19M8,19H21A1,1 0 0,1 22,20A1,1 0 0,1 21,21H8A1,1 0 0,1 7,20A1,1 0 0,1 8,19Z";var M5="M17.75,4.09L15.22,6.03L16.13,9.09L13.5,7.28L10.87,9.09L11.78,6.03L9.25,4.09L12.44,4L13.5,1L14.56,4L17.75,4.09M21.25,11L19.61,12.25L20.2,14.23L18.5,13.06L16.8,14.23L17.39,12.25L15.75,11L17.81,10.95L18.5,9L19.19,10.95L21.25,11M18.97,15.95C19.8,15.87 20.69,17.05 20.16,17.8C19.84,18.25 19.5,18.67 19.08,19.07C15.17,23 8.84,23 4.94,19.07C1.03,15.17 1.03,8.83 4.94,4.93C5.34,4.53 5.76,4.17 6.21,3.85C6.96,3.32 8.14,4.21 8.06,5.04C7.79,7.9 8.75,10.87 10.95,13.06C13.14,15.26 16.1,16.22 18.97,15.95M17.33,17.97C14.5,17.81 11.7,16.64 9.53,14.5C7.36,12.31 6.2,9.5 6.04,6.68C3.23,9.82 3.34,14.64 6.35,17.66C9.37,20.67 14.19,20.78 17.33,17.97Z";var r5="M12,21L15.6,16.2C14.6,15.45 13.35,15 12,15C10.65,15 9.4,15.45 8.4,16.2L12,21M12,3C7.95,3 4.21,4.34 1.2,6.6L3,9C5.5,7.12 8.62,6 12,6C15.38,6 18.5,7.12 21,9L22.8,6.6C19.79,4.34 16.05,3 12,3M12,9C9.3,9 6.81,9.89 4.8,11.4L6.6,13.8C8.1,12.67 9.97,12 12,12C14.03,12 15.9,12.67 17.4,13.8L19.2,11.4C17.19,9.89 14.7,9 12,9Z";var e5="M2.28,3L1,4.27L2.47,5.74C2.04,6 1.61,6.29 1.2,6.6L3,9C3.53,8.6 4.08,8.25 4.66,7.93L6.89,10.16C6.15,10.5 5.44,10.91 4.8,11.4L6.6,13.8C7.38,13.22 8.26,12.77 9.2,12.47L11.75,15C10.5,15.07 9.34,15.5 8.4,16.2L12,21L14.46,17.73L17.74,21L19,19.72M12,3C9.85,3 7.8,3.38 5.9,4.07L8.29,6.47C9.5,6.16 10.72,6 12,6C15.38,6 18.5,7.11 21,9L22.8,6.6C19.79,4.34 16.06,3 12,3M12,9C11.62,9 11.25,9 10.88,9.05L14.07,12.25C15.29,12.53 16.43,13.07 17.4,13.8L19.2,11.4C17.2,9.89 14.7,9 12,9Z";var t5="M21 20V2H3V20H1V23H23V20M19 4V11H13V4M5 4H11V11H5M5 20V13H11V20M13 20V13H19V20Z";var i5="M21 20V2H3V20H1V23H23V20M19 4V11H17V4M5 4H7V11H5M5 20V13H7V20M9 20V4H15V20M17 20V13H19V20Z";var a5="M10 6.2C10 4.3 8.8 2.6 7 2V5.7H4V2C2.2 2.6 1 4.3 1 6.2C1 8.1 2.2 9.8 4 10.4V21.4C4 21.8 4.2 22 4.5 22H6.5C6.8 22 7 21.8 7 21.5V10.5C8.8 9.9 10 8.2 10 6.2M16 8C16 8 15.9 8 16 8C12.1 8.1 9 11.2 9 15C9 18.9 12.1 22 16 22S23 18.9 23 15 19.9 8 16 8M16 20C13.2 20 11 17.8 11 15S13.2 10 16 10 21 12.2 21 15 18.8 20 16 20M15 11V16L18.6 18.2L19.4 17L16.5 15.3V11H15Z";var A5="M22.61,19L13.53,9.91C14.46,7.57 14,4.81 12.09,2.91C9.79,0.61 6.21,0.4 3.66,2.26L7.5,6.11L6.08,7.5L2.25,3.69C0.39,6.23 0.6,9.82 2.9,12.11C4.76,13.97 7.47,14.46 9.79,13.59L18.9,22.7C19.29,23.09 19.92,23.09 20.31,22.7L22.61,20.4C23,20 23,19.39 22.61,19M19.61,20.59L10.15,11.13C9.54,11.58 8.86,11.85 8.15,11.95C6.79,12.15 5.36,11.74 4.32,10.7C3.37,9.76 2.93,8.5 3,7.26L6.09,10.35L10.33,6.11L7.24,3C8.5,2.95 9.73,3.39 10.68,4.33C11.76,5.41 12.17,6.9 11.92,8.29C11.8,9 11.5,9.66 11.04,10.25L20.5,19.7L19.61,20.59Z";var o5={alert:g1,check:G1,chevron:Q1,clock:$1,counter:K1,dots:H2,error:O1,info:Z2,pause:k2,play:y2,power:B2,remote:T2,stop:U2,timer:j2,water:V5,wifi:r5,wifi_off:e5,auto:k1,care:A5,brightness:w1,dishwasher:X1,door:C2,door_closed:J1,dry:h1,end_sound:y1,energy:u2,floor_light:P2,glass:l2,leaf:s2,key_tone:n2,quick:e2,rack:f1,rinse:j1,sanitize:_2,silent:H5,spray:W2,water_percent:Y,zone:Y,bake:q1,chicken:i2,clean:b1,defrost:E2,drawer:X2,fan:L2,fish:r2,flip:t2,fries:o2,fryer:q2,heat:M2,manual:J2,meat:a2,probe:K2,recipe:U1,reheat:K,roast:x2,shake:F2,slow:w2,snack:A2,star:z2,steam:b2,temperature:$2,vegetable:z1,warm:K,ac:c1,adblue:g2,battery_car:P1,bonnet:F1,car:N1,car_door:E1,charger:V2,fuel:p2,gauge:m2,history:v2,lights:I1,lock:c2,lock_open:h2,marker:O2,motion:W1,odometer:I2,online:_1,parking:T1,range:R2,service:a5,snowflake:D2,software:C5,steering:G2,travel_time:Y2,trip:R1,trunk:B1,sunroof:D1,window_closed:t5,window_open:i5,bulb:S2,fridge:d2,frost:N2,ice:Y1,mist:L5,night:M5,party:f2,target:Q2};function d(r,C="icon"){let H=o5[r]||o5.info;return`<svg class="${C}" viewBox="0 0 24 24" aria-hidden="true"><path d="${H}"></path></svg>`}var d5=`
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
`;var F5=`
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
`,p5=d5+F5;function Z(r,C){if(!r)return"";let H=C?.locale?.language||C?.language||"hu",V=C?.locale?.time_format,L={hour:"2-digit",minute:"2-digit"};V==="12"&&(L.hour12=!0),V==="24"&&(L.hour12=!1);try{return new Intl.DateTimeFormat(H,L).format(r)}catch{return r.toTimeString().slice(0,5)}}function w(r,C){if(r==null)return null;let H=Math.max(0,Math.round(r));if(H<60)return{value:String(H),unit:C("ui.minute_short")};let V=Math.floor(H/60),L=H%60;return{value:`${V}:${String(L).padStart(2,"0")}`,unit:C("ui.hour_short")}}function f(r,C){let H=w(r,C);return H?`${H.value} ${H.unit}`:""}function j(r){if(r==null)return null;let C=Math.max(0,Math.round(r)),H=Math.floor(C/60),V=C%60;return H?`${H}:${String(V).padStart(2,"0")}`:`0:${String(V).padStart(2,"0")}`}function P(r,C=1){return r==null||!Number.isFinite(r)?"\u2013":r.toFixed(C).replace(/\.0$/,"")}function A(r){return String(r??"").replace(/[&<>"']/g,C=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[C])}var X={language:"auto",compact:!1,animate:!0,show_programs:!0,show_options:!0,show_delay:!0,show_scores:!0,show_consumption:!0,show_details:!0,show_controls:!0,show_appliance_settings:!0},_5=[t.IDLE,t.READY_TO_START],m5=[t.IDLE,t.READY_TO_START],q=class extends HTMLElement{static getConfigElement(){return document.createElement(B)}static getStubConfig(C){let H=_(C);return{type:`custom:${S}`,device:H[0]?.id}}constructor(){super(),this.attachShadow({mode:"open"}),this._sections={},this._signatures={},this._built=!1}setConfig(C){this._config={...X,...C||{}},this._signatures={},this._hass&&this._render()}set hass(C){this._hass=C,this._render()}get hass(){return this._hass}connectedCallback(){this._timer=window.setInterval(()=>this._render(),3e4)}disconnectedCallback(){this._timer&&window.clearInterval(this._timer),this._timer=void 0}getCardSize(){return this._config?.compact?5:9}getGridOptions(){return{columns:12,min_columns:6,rows:this._config?.compact?6:"auto"}}_build(){let C=document.createElement("style");C.textContent=p5;let H=document.createElement("ha-card"),V=document.createElement("div");V.className="wrap",V.addEventListener("click",L=>this._onClick(L)),V.addEventListener("input",L=>this._onInput(L)),V.addEventListener("keydown",L=>this._onKeyDown(L));for(let L of["header","hero","alerts","programs","options","delay","meters","controls","appliance","details"]){let M=document.createElement("div");M.dataset.section=L,this._sections[L]=M,V.appendChild(M)}H.appendChild(V),this.shadowRoot.replaceChildren(C,H),this._card=H,this._wrap=V,this._built=!0}_render(){if(!this._hass||!this._config)return;this._built||this._build();let C=R(this._config,this._hass),H=F(C);this._t=H;let V=Z1(this._hass,this._config);if(this._model=V,!V.ok){this._renderEmpty(V,H);return}this._emptyShown=!1,this._applyHostClasses(V),this._section("header",this._headerHtml(V,H)),this._heroSection(V,H),this._section("alerts",this._alertsHtml(V,H)),this._section("programs",this._config.show_programs?this._programsHtml(V,H):""),this._section("options",this._config.show_options?this._optionsHtml(V,H):""),this._section("delay",this._config.show_delay?this._delayHtml(V,H):""),this._section("meters",this._metersHtml(V,H)),this._section("controls",this._config.show_controls?this._controlsHtml(V,H):""),this._section("appliance",this._config.show_appliance_settings?this._applianceSettingsHtml(V,H):""),this._section("details",this._config.show_details?this._detailsHtml(V,H):"")}_renderEmpty(C,H){if(this._emptyShown!==C.reason){this._emptyShown=C.reason,this._signatures={};for(let V of Object.values(this._sections))V.innerHTML="";this._sections.header.innerHTML=`
      <div class="empty">
        ${d("dishwasher")}
        <div>${A(H(`ui.${C.reason}`))}</div>
      </div>`}}_section(C,H){this._signatures[C]!==H&&(this._signatures[C]=H,this._sections[C].innerHTML=H,this._sections[C].hidden=!H,C==="delay"&&this._restoreReadyBy())}_applyHostClasses(C){let H=["wrap"];this._config.compact&&H.push("compact"),this._config.animate||H.push("no-animation"),H.push(`accent-${C.accent}`),C.state===t.RUNNING&&H.push("running","busy"),C.state===t.PAUSED&&H.push("paused"),C.state===t.END_OF_CYCLE&&H.push("done"),C.state===t.OFF&&H.push("off"),(C.state===t.ALARM||C.alerts.some(L=>Q[L]==="error"))&&H.push("alarm"),C.step==="DRYING"&&H.push("phase-drying"),C.doorOpen&&H.push("door-open");let V=H.join(" ");this._wrap.className!==V&&(this._wrap.className=V)}_headerHtml(C,H){let V=A(C.name||H("card_name")),L=[t.IDLE,t.READY_TO_START].includes(C.state)?this._cycleMinutes(C):n[C.program]?.duration,M=C.state===t.OFF?"":C.program&&L?`${H(`program.${C.program}`)} \xB7 ${f(L,H)}`:C.programRaw||"",e=[];return C.online?C.linkQuality&&e.push(`<span title="${H("ui.wifi")}: ${C.linkQuality}">${d("wifi")}</span>`):e.push(`<span class="bad" title="${H("ui.offline")}">${d("wifi_off")}</span>`),C.doorOpen&&e.push(`<span class="bad" title="${H("ui.door_open")}">${d("door")}</span>`),C.ecoMode&&e.push(`<span title="${H("ui.eco_mode")}">${d("leaf")}</span>`),`
      <div class="header">
        <div>
          <div class="title" data-action="more-info">${V}</div>
          ${M?`<div class="sub">${A(M)}</div>`:""}
        </div>
        <div class="spacer"></div>
        <div class="badges">${e.join("")}</div>
        <div class="pill">${d(this._stateIcon(C))}${A(H(`state.${C.state}`))}</div>
      </div>`}_stateIcon(C){switch(C.state){case t.RUNNING:return"water";case t.PAUSED:return"pause";case t.END_OF_CYCLE:return"check";case t.DELAYED_START:return"timer";case t.ALARM:return"error";case t.READY_TO_START:return"play";default:return"power"}}_heroSection(C,H){this._sections.hero.querySelector(".machine")||(this._sections.hero.innerHTML=`
        <div class="hero">
          <div class="machine-wrap" data-action="more-info">${S1()}</div>
          <div class="status"></div>
        </div>`,this._statusNode=this._sections.hero.querySelector(".status"));let V=this._statusHtml(C,H);this._signatures.status!==V&&(this._signatures.status=V,this._statusNode.innerHTML=V),u1(this._sections.hero,this._displayText(C,H))}_displayText(C,H){return C.state===t.OFF?"":C.state===t.DELAYED_START&&C.delay?j(C.delay):C.remaining!==null&&[t.RUNNING,t.PAUSED,t.DELAYED_START].includes(C.state)?j(C.remaining):C.state===t.END_OF_CYCLE?"0:00":C.program?H(`program.${C.program}`).slice(0,8):"--:--"}_statusHtml(C,H){let V=[],L=C.state===t.RUNNING&&C.phase!=="UNAVAILABLE"?`<span class="phase-text">${A(H(`phase_long.${C.phase}`))}</span>`:"";V.push(`
      <div class="status-line">
        <span class="state-text">${A(H(`state.${C.state}`))}</span>
        ${L}
      </div>`),C.program&&C.state!==t.OFF&&V.push(`
        <div class="program-line">
          ${d(n[C.program]?.icon||"dishwasher")}
          <span>${A(H(`program.${C.program}`))}</span>
        </div>`);let M=this._countdownHtml(C,H);return M&&V.push(M),[t.RUNNING,t.PAUSED,t.END_OF_CYCLE].includes(C.state)&&(V.push(`<div class="bar"><i style="width:${Math.round(C.progress*100)}%"></i></div>`),V.push(this._timelineHtml(C,H))),V.join("")}_cycleMinutes(C){let H=n[C.program]?.duration??null,V=C.remaining!==null&&C.remaining>0?C.remaining:null;if(![t.IDLE,t.READY_TO_START].includes(C.state))return V??H;let L=this._durationTrack;return L?L.program!==C.program?this._durationTrack={program:C.program,reported:V,stale:!0}:L.stale&&V!==L.reported&&(L.stale=!1):this._durationTrack={program:C.program,reported:V,stale:!1},this._durationTrack.stale?H??V:V??H}_countdownHtml(C,H){if(C.state===t.END_OF_CYCLE)return`<div class="countdown"><span class="at">${d("check")}${A(H("ui.finished_hint"))}</span></div>`;if(C.state===t.DELAYED_START){let V=w(C.delay||C.remaining,H);if(!V)return"";let L=[C.startAt?`<span class="at">${d("timer")}${A(H("ui.starts_at"))} ${Z(C.startAt,this._hass)}</span>`:"",C.finishAt?`<span class="at">${d("clock")}${A(H("ui.ready_at"))} ${Z(C.finishAt,this._hass)}</span>`:""].join("");return`<div class="countdown"><span class="value">${V.value}</span><span class="unit">${V.unit}</span>${L}</div>`}if([t.RUNNING,t.PAUSED].includes(C.state)){let V=w(C.remaining,H);if(!V)return"";let L=C.finishAt?`<span class="at">${d("clock")}${A(H("ui.ready_at"))} ${Z(C.finishAt,this._hass)}</span>`:"";return`<div class="countdown"><span class="value">${V.value}</span><span class="unit">${V.unit}</span>${L}</div>`}if([t.IDLE,t.READY_TO_START].includes(C.state)){let V=this._cycleMinutes(C),L=w(V,H);if(!L)return"";let M=C.delay?new Date(Date.now()+C.delay*6e4):null,e=new Date(Date.now()+(V+C.delay)*6e4),a=[M?`<span class="at">${d("timer")}${A(H("ui.starts_at"))} ${Z(M,this._hass)}</span>`:"",`<span class="at">${d("clock")}${A(H("ui.ready_at"))} ${Z(e,this._hass)}</span>`].join("");return`<div class="countdown"><span class="value">${L.value}</span><span class="unit">${L.unit}</span>${a}</div>`}if(C.state===t.OFF&&C.delay&&C.program&&n[C.program]){let V=n[C.program].duration,L=w(V,H),M=new Date(Date.now()+C.delay*6e4),e=new Date(Date.now()+(V+C.delay)*6e4);return`<div class="countdown"><span class="value">${L.value}</span><span class="unit">${L.unit}</span>
        <span class="at">${d("timer")}${A(H("ui.starts_at"))} ${Z(M,this._hass)}</span>
        <span class="at">${d("clock")}${A(H("ui.ready_at"))} ${Z(e,this._hass)}</span></div>`}return""}_timelineHtml(C,H){let V=n[C.program]?.steps||G,L=C.step?V.indexOf(C.step):-1;return`<div class="timeline">${G.map(e=>{let a=V.includes(e),i=V.indexOf(e),o="step";return a?L>=0&&i<L?o+=" done":L>=0&&i===L?o+=" active":C.state===t.END_OF_CYCLE&&(o+=" done"):o+=" skip",`<div class="${o}"><span class="dot"></span><span class="label">${A(H(`phase.${e}`))}</span></div>`}).join("")}</div>`}_alertsHtml(C,H){let V=[];C.doorOpen&&C.state!==t.OFF&&V.push({severity:"warning",text:H("ui.door_open"),iconName:"door"});for(let L of C.alerts){let{code:M,count:e}=L,i=(L.severity==="ERROR"||L.severity==="CRITICAL"?"error":"")||Q[M]||"warning",o=M?H(`alert.${M}`,`${H("alert_generic")}: ${M.replace(/^DISH_ALARM_/,"")}`):`${H("alert_generic")}: ${e}`;V.push({severity:i,text:o,iconName:i==="error"?"error":"alert"})}return C.online||V.push({severity:"error",text:H("ui.offline"),iconName:"wifi_off"}),V.length?`<div class="alerts">${V.map(L=>`<div class="alert ${L.severity}">${d(L.iconName)}<span>${A(L.text)}</span></div>`).join("")}</div>`:""}_programsHtml(C,H){if(!C.entities.program||!C.programOptions.length)return"";let V=_5.includes(C.state)&&C.remoteEnabled,L=C.programOptions.filter(o=>n[o.key]),M=[...U.map(o=>L.find(p=>p.key===o)).filter(Boolean),...L.filter(o=>!U.includes(o.key))],e=C.state===t.OFF?null:C.program,a=M.map(o=>{let p=o.key===e,m=n[o.key],u=`${H(`program_hint.${o.key}`)} \xB7 ${P(m.water)} l \xB7 ${P(m.energy,3)} kWh \xB7 ${f(m.duration,H)}`;return`<button class="chip" type="button" data-action="program" data-value="${A(o.label)}"
        aria-pressed="${p}" title="${A(u)}" ${V?"":"disabled"}>
        ${d(m.icon)}<span>${A(H(`program.${o.key}`))}</span></button>`}),i=e?A(H(`program_hint.${e}`)):"";return`
      <div class="section">
        <div class="section-title">${A(H("ui.program"))}</div>
        <div class="chips">${a.join("")}</div>
        ${i?`<div class="note">${i}</div>`:""}
      </div>`}_optionsHtml(C,H){if(!C.options.length||C.state===t.OFF)return"";let V=m5.includes(C.state)&&C.remoteEnabled,L=C.options.filter(e=>e.supported||e.on);if(!L.length)return`
        <div class="section">
          <div class="section-title">${A(H("ui.options"))}</div>
          <div class="note">${A(H("ui.no_options"))}</div>
        </div>`;let M=L.map(e=>`<button class="chip" type="button" data-action="option" data-value="${e.entityId}"
        aria-pressed="${e.on}" title="${A(H(`option_hint.${e.key}`))}"
        ${V&&e.supported?"":"disabled"}>
        ${d(e.icon)}<span>${A(H(`option.${e.key}`))}</span></button>`);return`
      <div class="section">
        <div class="section-title">${A(H("ui.options"))}</div>
        <div class="chips">${M.join("")}</div>
      </div>`}_delayHtml(C,H){if(!C.entities.start_time)return"";let V=C.state===t.DELAYED_START||C.delay>0,L=(m5.includes(C.state)||C.state===t.DELAYED_START)&&C.remoteEnabled;if(!L&&!V)return"";let M=e1.map(p=>{let m=C.delay===p;return`<button class="chip" type="button" data-action="delay" data-value="${p}"
        aria-pressed="${m}" ${L?"":"disabled"}>
        ${d("timer")}<span>${p/60} ${A(H("ui.hour_short"))}</span></button>`});V&&M.push(`<button class="chip" type="button" data-action="delay" data-value="-1" ${L?"":"disabled"}>
        ${d("stop")}<span>${A(H("ui.delay_cancel"))}</span></button>`);let e=V?`<span class="hint">${A(f(C.delay,H))}</span>`:`<span class="hint">${A(H("ui.delay_off"))}</span>`,a=Math.min(C.delayControl?.maxMinutes??O,O),i=`
      <div class="steppers narrow">
        <div class="stepper">
          <span class="label">${A(H("ui.delay_amount"))}</span>
          <div class="row">
            <button class="step-btn" type="button" data-action="delay-step" data-dir="-1"
              ${L&&C.delay>0?"":"disabled"} aria-label="\u2212">\u2212</button>
            <span class="value">${A(C.delay?f(C.delay,H):H("ui.delay_off"))}</span>
            <button class="step-btn" type="button" data-action="delay-step" data-dir="1"
              ${L&&C.delay<a?"":"disabled"} aria-label="+">+</button>
          </div>
        </div>
        <div class="stepper" title="${A(H("ui.ready_by_hint"))}">
          <span class="label">${A(H("ui.ready_by"))}</span>
          <div class="row">
            <input class="time-input" type="time" data-action="ready-by" ${L?"":"disabled"}>
            <button class="step-btn wide" type="button" data-action="ready-by-apply"
              ${L?"":"disabled"} title="${A(H("ui.ready_by_apply"))}">
              ${d("check")}</button>
          </div>
        </div>
      </div>`,o=this._delayNotice&&Date.now()-this._delayNotice.at<2e4?`<div class="note">${d("info")}${A(this._delayNotice.text)}</div>`:"";return`
      <div class="section">
        <div class="section-title">${A(H("ui.delay"))}${e}</div>
        <div class="chips">${M.join("")}</div>
        ${i}
        ${o}
      </div>`}_scoresStale(C){let H=[C.scores.eco,C.scores.energy,C.scores.water].join("/"),V=this._scoreTrack;return V?V.program!==C.program?this._scoreTrack={program:C.program,values:H,stale:!0,since:Date.now()}:V.stale&&(H!==V.values||Date.now()-V.since>3e4)&&(V.stale=!1):this._scoreTrack={program:C.program,values:H,stale:!1,since:0},this._scoreTrack.stale}_metersHtml(C,H){if(C.state===t.OFF)return"";let V=[],{eco:L,energy:M,water:e}=C.scores,a=n[C.program]?.scores!==!1,i=this._scoresStale(C);if(this._config.show_scores&&a&&(L!==null||M!==null||e!==null)){let p=(m,u,s,v)=>{let T=Math.max(0,Math.min(7,v??0)),D=Array.from({length:7},(E,N)=>`<i class="${N<T?"on":""}"></i>`).join("");return`
          <div class="meter ${u}">
            <div class="top">${d(s)}<span>${A(H(`ui.${m}`))}</span>
              <span class="val">${v===null?"\u2013":`${v}/7`}</span></div>
            <div class="track">${D}</div>
          </div>`};V.push(`
        <div class="meters${i?" stale":""}">
          ${p("eco_score","eco","leaf",L)}
          ${p("energy_score","energy","energy",M)}
          ${p("water_score","water","water",e)}
        </div>`)}if(this._config.show_consumption&&C.program&&n[C.program]){let p=n[C.program];V.push(`
        <div class="facts">
          <span class="fact">${d("water")}<b>${P(p.water)}</b> l</span>
          <span class="fact">${d("energy")}<b>${P(p.energy,3)}</b> kWh</span>
          <span class="fact">${d("timer")}<b>${A(f(p.duration,H))}</b></span>
        </div>`)}if(!V.length)return"";let o=i&&a?`<span class="hint">${A(H("ui.scores_updating"))}</span>`:"";return`
      <div class="section">
        <div class="section-title">${A(H("ui.scores"))}${o}</div>
        ${V.join("")}
      </div>`}_controlsHtml(C,H){let L=(M1[C.state]||[]).filter(e=>C.entities[`cmd_${e}`]).map(e=>{let a=r1[e],i=!C.remoteEnabled&&e!=="off"?"disabled":"";return`<button class="btn ${a.style}" type="button" data-action="command" data-value="${e}" ${i}>
          ${d(a.icon)}<span>${A(H(`command.${e}`))}</span></button>`});if(!L.length)return"";let M=C.remoteEnabled?"":`<div class="note">${d("remote")}${A(H("ui.remote_disabled_hint"))}</div>`;return`<div class="section"><div class="controls">${L.join("")}</div>${M}</div>`}_applianceSettingsHtml(C,H){let{brightness:V,floorLight:L,endSound:M,keyTone:e}=C.settings;if(!V&&!L&&!M&&!e)return"";let a=C.online&&C.remoteEnabled,i=(m,u,s,v)=>v?`<button class="chip" type="button" data-action="setting" data-value="${m}"
            aria-pressed="${v.on}" title="${A(H(`ui.${s}_hint`,""))}"
            ${a?"":"disabled"}>
            ${d(u)}<span>${A(H(`ui.${s}`))}</span>
          </button>`:"",o=[i("floor","floor_light","floor_light",L),i("sound","end_sound","end_sound",M),i("key","key_tone","key_tone",e)].filter(Boolean),p=V?`<div class="steppers narrow">
          <div class="stepper" title="${A(H("ui.brightness_hint",""))}">
            <span class="label">${A(H("ui.brightness"))}</span>
            <div class="row">
              <button class="step-btn" type="button" data-action="brightness" data-dir="-1"
                ${a&&V.value>V.min?"":"disabled"} aria-label="\u2212">\u2212</button>
              <span class="value">${V.value}</span>
              <button class="step-btn" type="button" data-action="brightness" data-dir="1"
                ${a&&V.value<V.max?"":"disabled"} aria-label="+">+</button>
            </div>
          </div>
        </div>`:"";return`
      <div class="section">
        <div class="section-title">${A(H("ui.appliance_settings"))}</div>
        ${o.length?`<div class="chips">${o.join("")}</div>`:""}
        ${p}
      </div>`}_detailsHtml(C,H){let V=[],L=(M,e,a)=>{e==null||e===""||V.push(`
        <div class="detail">
          <span class="k">${A(H(`ui.${M}`))}</span>
          <span class="v">${d(a)}${A(String(e))}</span>
        </div>`)};if(C.doorOpen!==null&&L("door",C.doorOpen?H("ui.door_open"):H("ui.door_closed"),C.doorOpen?"door":"door_closed"),C.remote){let M=C.remote.includes("TEMPORARY")?H("ui.remote_locked"):C.remoteEnabled?H("ui.remote_on"):H("ui.remote_off");L("remote",M,"remote")}if(C.linkQuality){let M=C.linkQuality.replace(/_/g," ").toLowerCase();L("wifi",M.charAt(0).toUpperCase()+M.slice(1),"wifi")}return C.cycles!==null&&L("cycles",C.cycles,"counter"),C.rinseAid!==null&&L("rinse_aid",`${C.rinseAid}/8`,"water_percent"),C.waterHardness&&L("water_hardness",C.waterHardness,"water"),V.length?`
      <div class="section">
        <div class="section-title">${A(H("ui.details"))}</div>
        <div class="details">${V.join("")}</div>
      </div>`:""}_onInput(C){let H=C.target.closest('[data-action="ready-by"]');H&&(this._readyByValue=H.value)}_onKeyDown(C){if(C.key!=="Enter")return;let H=C.target.closest('[data-action="ready-by"]');!H||H.hasAttribute("disabled")||(C.preventDefault(),this._applyReadyBy(H.value))}_applyReadyBy(C){!this._model?.ok||!/^\d{1,2}:\d{2}$/.test(C||"")||(this._readyByValue=C,this._readyBy(C,this._t),this._render())}_restoreReadyBy(){if(!this._readyByValue)return;let C=this._sections.delay?.querySelector('[data-action="ready-by"]');C&&C.value!==this._readyByValue&&(C.value=this._readyByValue)}_onClick(C){let H=C.target.closest("[data-action]");if(!H||H.hasAttribute("disabled"))return;let{action:V,value:L}=H.dataset,M=this._model;if(!(!M?.ok&&V!=="more-info"))switch(V){case"more-info":this._moreInfo(M?.entities?.appliance_state);break;case"program":this._selectProgram(L);break;case"option":this._haptic("light"),this._call("switch","toggle",{entity_id:L});break;case"command":this._haptic("medium"),this._call("button","press",{entity_id:M.entities[`cmd_${L}`]});break;case"setting":this._toggleSetting(L);break;case"brightness":this._stepBrightness(Number(H.dataset.dir));break;case"delay":this._setDelay(Number(L));break;case"delay-step":this._stepDelay(Number(H.dataset.dir));break;case"ready-by-apply":this._applyReadyBy(this._sections.delay?.querySelector('[data-action="ready-by"]')?.value);break;default:break}}_setDelay(C){let H=this._model,V=H.entities.start_time;if(!V)return;let L=H.delayControl,M;if(C<=0)M=L?L.min:-1;else{let e=L?L.seconds?L.step/60:L.step:1,a=Math.max(h,e||1),i=Math.floor(C/a)*a;if(i<=0)return this._setDelay(0);M=L?.seconds?i*60:i}return this._haptic("light"),this._call("number","set_value",{entity_id:V,value:M})}_stepDelay(C){let H=this._model,V=Math.min(H.delayControl?.maxMinutes??O,O),L=Math.floor(H.delay/h)*h,M=Math.min(V,Math.max(0,L+C*h));M!==H.delay&&this._setDelay(M)}_readyBy(C,H){let V=this._model,L=/^(\d{1,2}):(\d{2})$/.exec(C||"");if(!L)return;let M=new Date;M.setSeconds(0,0);let e=new Date(M);e.setHours(Number(L[1]),Number(L[2]),0,0),e<=M&&e.setDate(e.getDate()+1);let a=this._cycleMinutes(V)||0,i=Math.round((e.getTime()-M.getTime())/6e4),o=Math.min(V.delayControl?.maxMinutes??O,O),p=Math.floor((i-a)/h)*h;if(p<=0){let m=new Date(Date.now()+a*6e4);this._delayNotice={at:Date.now(),text:`${H("ui.ready_by_too_soon")} ${Z(m,this._hass)}`},p=0}else if(p>o)p=o,this._delayNotice={at:Date.now(),text:H("ui.ready_by_max")};else{let m=new Date(Date.now()+(p+a)*6e4);this._delayNotice={at:Date.now(),text:`${H("ui.ready_by_set")}: ${f(p,H)} \xB7 ${H("ui.ready_at")} ${Z(m,this._hass)}`}}this._setDelay(p)}_toggleSetting(C){let H=this._model;if(this._haptic("light"),C==="key")return this._call("switch","toggle",{entity_id:H.entities.key_tone});let[V,L]=C==="floor"?["floorLight","display_on_floor"]:["endSound","end_of_cycle_sound"],M=H.settings[V];if(M)return this._call("select","select_option",{entity_id:H.entities[L],option:M.on?M.offOption:M.onOption})}_stepBrightness(C){let{brightness:H}=this._model.settings;if(!H)return;let V=H.levels.findIndex(M=>M.value===H.value),L=H.levels[(V===-1?0:V)+C];L&&(this._haptic("light"),this._call("select","select_option",{entity_id:this._model.entities.display_light,option:L.label}))}_selectProgram(C){return this._haptic("light"),this._call("select","select_option",{entity_id:this._model.entities.program,option:C})}_call(C,H,V){return V.entity_id?this._hass.callService(C,H,V):Promise.resolve()}_moreInfo(C){C&&this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:C},bubbles:!0,composed:!0}))}_haptic(C){this.dispatchEvent(new CustomEvent("haptic",{detail:C,bubbles:!0,composed:!0}))}};function n5(){customElements.get(S)||(customElements.define(S,q),window.customCards=window.customCards||[],window.customCards.push({type:S,name:"AEG / Electrolux Dishwasher Card",description:"Rich status card for AEG and Electrolux dishwashers: phases, remaining time, programs, options and controls.",preview:!0,documentationURL:"https://github.com/gabor-io/ha-appliance-custom-card"}),console.info(`%c ${S} %c ${C1} `,"color:#fff;background:#039be5;font-weight:700;border-radius:3px 0 0 3px","color:#039be5;background:#e1f5fe;font-weight:700;border-radius:0 3px 3px 0"))}var D5=`
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
`;function l5(r){return class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}setConfig(H){this._config={...H},this._render()}set hass(H){this._hass=H,this._render()}_render(){if(!this._config||!this._hass)return;let H=r.translator(r.getLanguage(this._config,this._hass)),V=r.listDevices(this._hass),L=this._config.device||"",M=[`<option value="" ${L?"":"selected"}>${A(H("editor.device_auto"))}</option>`,...V.map(i=>`<option value="${A(i.id)}" ${i.id===L?"selected":""}>${A(i.name)}</option>`)].join(""),e=[`<option value="auto">${A(H("editor.language_auto"))}</option>`,...r.languages.map(i=>`<option value="${i}" ${this._config.language===i?"selected":""}>${i.toUpperCase()}</option>`)].join(""),a=r.toggles.map(i=>{let o=this._config[i]??r.defaults[i]??!1;return`<label class="toggle"><input type="checkbox" data-key="${i}" ${o?"checked":""}>
            <span>${A(H(`editor.${i}`))}</span></label>`}).join("");this.shadowRoot.innerHTML=`
        <style>${D5}</style>
        <div class="form">
          <label>${A(H("editor.device"))}
            <select data-key="device">${M}</select>
          </label>
          <label>${A(H("editor.name"))}
            <input type="text" data-key="name" value="${A(this._config.name||"")}">
          </label>
          <label>${A(H("editor.language"))}
            <select data-key="language">${e}</select>
          </label>
          <div class="title">${A(H("editor.sections"))}</div>
          <div class="toggles">${a}</div>
        </div>`,this.shadowRoot.querySelectorAll("[data-key]").forEach(i=>i.addEventListener("change",o=>this._onChange(o)))}_onChange(H){let V=H.target,L=V.dataset.key,M={...this._config,type:this._config.type||`custom:${r.cardName}`};V.type==="checkbox"?M[L]=V.checked:V.value===""?delete M[L]:M[L]=V.value,this._config=M,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:M},bubbles:!0,composed:!0}))}}}var E5=l5({cardName:S,toggles:["show_programs","show_options","show_delay","show_scores","show_consumption","show_appliance_settings","show_details","show_controls","compact","animate"],defaults:X,listDevices:_,getLanguage:R,translator:F,languages:$});function x5(){customElements.get(B)||customElements.define(B,E5)}x5();n5();
