/*! ha-appliance-cards v1.6.0 - https://github.com/gabor-io/ha-appliance-custom-card - MIT licence */
var R="aeg-dishwasher-card",C1="aeg-dishwasher-card-editor",U1="1.6.0",A={OFF:"OFF",IDLE:"IDLE",READY_TO_START:"READY_TO_START",DELAYED_START:"DELAYED_START",RUNNING:"RUNNING",PAUSED:"PAUSED",END_OF_CYCLE:"END_OF_CYCLE",ALARM:"ALARM",UNKNOWN:"UNKNOWN"},G1={[A.OFF]:"idle",[A.IDLE]:"idle",[A.READY_TO_START]:"ready",[A.DELAYED_START]:"delayed",[A.RUNNING]:"running",[A.PAUSED]:"paused",[A.END_OF_CYCLE]:"done",[A.ALARM]:"alarm",[A.UNKNOWN]:"idle"},I={PREWASH:"PREWASH",MAINWASH:"MAINWASH",COLDRINSE:"COLDRINSE",HOTRINSE:"HOTRINSE",EXTRARINSE:"EXTRARINSE",DRYING:"DRYING",ADO_DRYING:"ADO_DRYING",UNAVAILABLE:"UNAVAILABLE"},y1=["PREWASH","MAINWASH","RINSE","DRYING"],Q1={[I.PREWASH]:"PREWASH",[I.MAINWASH]:"MAINWASH",[I.COLDRINSE]:"RINSE",[I.HOTRINSE]:"RINSE",[I.EXTRARINSE]:"RINSE",[I.DRYING]:"DRYING",[I.ADO_DRYING]:"DRYING"},S={ECO:{icon:"leaf",water:8.4,energy:.488,duration:310,steps:["PREWASH","MAINWASH","RINSE","DRYING"]},AUTO:{icon:"auto",water:12.5,energy:1,duration:180,steps:["PREWASH","MAINWASH","RINSE","DRYING"]},QUICK30:{icon:"quick",water:8.5,energy:.475,duration:30,steps:["MAINWASH","RINSE"]},QUICK60:{icon:"clock",water:10.5,energy:1,duration:60,steps:["MAINWASH","RINSE","DRYING"]},NORMAL90:{icon:"clock",water:10.5,energy:1,duration:90,steps:["MAINWASH","RINSE","DRYING"]},"120_MIN":{icon:"clock",water:10.5,energy:.9,duration:120,steps:["MAINWASH","RINSE","DRYING"]},RINSE:{icon:"rinse",water:4,energy:.15,duration:15,steps:["PREWASH"],scores:!1},MACHINE_CARE:{icon:"care",water:10,energy:.575,duration:60,steps:["MAINWASH","RINSE","DRYING"],scores:!1}},k1=["ECO","AUTO","QUICK30","QUICK60","NORMAL90","120_MIN","RINSE","MACHINE_CARE"],K1=[{key:"xtra_dry",entity:"xtra_dry_option",icon:"dry",programs:["ECO","QUICK60","NORMAL90","120_MIN"]},{key:"extra_power",entity:"extra_power_option",icon:"power",programs:["QUICK30","QUICK60","NORMAL90","120_MIN"]},{key:"extra_silent",entity:"extra_silent_option",icon:"silent",programs:["ECO","NORMAL90","120_MIN"]},{key:"glass_care",entity:"glass_care_option",icon:"glass",programs:["QUICK30","QUICK60","NORMAL90","120_MIN"]},{key:"sanitize",entity:"sanitize_option",icon:"sanitize",programs:["QUICK30","QUICK60","NORMAL90","120_MIN"]},{key:"spray_zone",entity:"spray_zone_option",icon:"spray",programs:["QUICK30","QUICK60","NORMAL90","120_MIN"]},{key:"zone_clean",entity:"zone_clean_option",icon:"zone",programs:["QUICK30","QUICK60","NORMAL90","120_MIN"]},{key:"one_rack",entity:"one_rack_option",icon:"rack",programs:["QUICK30","QUICK60"]},{key:"auto_door_opener",entity:"auto_door_opener",icon:"door",programs:null}],Y1={[A.OFF]:["on"],[A.IDLE]:["start","off"],[A.READY_TO_START]:["start","off"],[A.DELAYED_START]:["stopreset"],[A.RUNNING]:["pause"],[A.PAUSED]:["resume","stopreset"],[A.END_OF_CYCLE]:["stopreset","off"],[A.ALARM]:["stopreset","off"],[A.UNKNOWN]:[]},j1={on:{icon:"power",style:"ghost"},off:{icon:"power",style:"ghost"},start:{icon:"play",style:"primary"},pause:{icon:"pause",style:"primary"},resume:{icon:"play",style:"primary"},stopreset:{icon:"stop",style:"ghost"}},_1={DISH_ALARM_SALT_MISSING:"warning",DISH_ALARM_RINSE_AID_LOW:"warning",DISH_ALARM_I10:"error",DISH_ALARM_I11:"error",DISH_ALARM_I20:"error",DISH_ALARM_I30:"error",DISH_ALARM_I41:"error",DISH_ALARM_I43:"error",DISH_ALARM_I44:"error",DISH_ALARM_IF1:"error"},q1=[60,120,180,240,360,480,720],$=10,z=1440;function Q(M,C,H){let V=M?.language&&M.language!=="auto"?M.language:null,L=(C?.locale?.language||C?.language||"en").slice(0,2).toLowerCase(),r=V||L;return H.includes(r)?r:"en"}function K(M,C,H="en"){let V=M[C]||M[H],L=M[H],r=(e,i)=>i.split(".").reduce((t,o)=>t?t[o]:void 0,e);return(e,i="")=>{let t=r(V,e);if(t!==void 0)return t;let o=r(L,e);return o!==void 0?o:i}}var P3={card_name:"Mosogat\xF3g\xE9p",state:{OFF:"Kikapcsolva",IDLE:"K\xE9szenl\xE9tben",READY_TO_START:"Ind\xEDt\xE1sra k\xE9sz",DELAYED_START:"K\xE9sleltetett ind\xEDt\xE1s",RUNNING:"Program fut",PAUSED:"Sz\xFCneteltetve",END_OF_CYCLE:"Elk\xE9sz\xFClt",ALARM:"Hiba",UNKNOWN:"Ismeretlen"},phase:{PREWASH:"El\u0151mos\xE1s",MAINWASH:"Mosogat\xE1s",RINSE:"\xD6bl\xEDt\xE9s",DRYING:"Sz\xE1r\xEDt\xE1s",UNAVAILABLE:"\u2013"},phase_long:{PREWASH:"El\u0151mos\xE1s",MAINWASH:"Mosogat\xE1s",COLDRINSE:"Hideg \xF6bl\xEDt\xE9s",HOTRINSE:"Meleg \xF6bl\xEDt\xE9s",EXTRARINSE:"Extra \xF6bl\xEDt\xE9s",DRYING:"Sz\xE1r\xEDt\xE1s",ADO_DRYING:"AirDry sz\xE1r\xEDt\xE1s",UNAVAILABLE:"Nincs fut\xF3 f\xE1zis"},program:{ECO:"Eco",AUTO:"Auto",QUICK30:"Quick 30",QUICK60:"1h00m",NORMAL90:"1h30m","120_MIN":"2h00m",RINSE:"\xD6bl\xEDt\xE9s \xE9s v\xE1rakoz\xE1s",MACHINE_CARE:"G\xE9p\xE1pol\xE1s"},program_hint:{ECO:"Norm\xE1l szennyezetts\xE9g, a leghat\xE9konyabb v\xEDz- \xE9s energiafogyaszt\xE1s.",AUTO:"B\xE1rmilyen szennyezetts\xE9g, a g\xE9p m\xE9ri a t\xF6ltetet \xE9s a koszt.",QUICK30:"Friss szennyez\u0151d\xE9s, sz\xE1r\xEDt\xE1si f\xE1zis n\xE9lk\xFCl.",QUICK60:"Friss, enyh\xE9n r\xE1sz\xE1radt szennyez\u0151d\xE9s.",NORMAL90:"Norm\xE1l, enyh\xE9n r\xE1sz\xE1radt szennyez\u0151d\xE9s, l\xE1basokhoz is.","120_MIN":"Norm\xE1l, r\xE1sz\xE1radt szennyez\u0151d\xE9s, l\xE1basokhoz \xE9s serpeny\u0151kh\xF6z.",RINSE:"Felfriss\xEDti a k\xE9s\u0151bb mosand\xF3 ed\xE9nyeket. Mos\xF3szer n\xE9lk\xFCl!",MACHINE_CARE:"A g\xE9p belsej\xE9nek tiszt\xEDt\xE1sa v\xEDzk\u0151 \xE9s zs\xEDr ellen."},option:{xtra_dry:"ExtraDry",extra_power:"ExtraPower",extra_silent:"ExtraSilent",glass_care:"GlassCare",sanitize:"Fert\u0151tlen\xEDt\xE9s",spray_zone:"SprayZone",zone_clean:"ZoneClean",one_rack:"Egy kos\xE1r",auto_door_opener:"AutoOpen ajt\xF3"},option_hint:{xtra_dry:"Intenz\xEDvebb sz\xE1r\xEDt\xE1s a program v\xE9g\xE9n.",extra_power:"Er\u0151sebb mosogat\xE1s makacs szennyez\u0151d\xE9shez.",extra_silent:"Halkabb m\u0171k\xF6d\xE9s, hosszabb program.",glass_care:"\xDCveg\xE1rut k\xEDm\xE9l\u0151, max. 45 \xB0C.",sanitize:"Extra fert\u0151tlen\xEDt\u0151 \xF6bl\xEDt\xE9s.",spray_zone:"F\xF3kusz\xE1lt v\xEDzsug\xE1r az als\xF3 kos\xE1rban.",zone_clean:"Als\xF3 kos\xE1r er\u0151s, fels\u0151 kos\xE1r k\xEDm\xE9l\u0151 mos\xE1s.",one_rack:"Csak az egyik kos\xE1r mos\xE1sa.",auto_door_opener:"A ciklus v\xE9g\xE9n automatikusan kinyitja az ajt\xF3t."},command:{on:"Bekapcsol\xE1s",off:"Kikapcsol\xE1s",start:"Ind\xEDt\xE1s",pause:"Sz\xFCnet",resume:"Folytat\xE1s",stopreset:"Le\xE1ll\xEDt\xE1s"},alert:{DISH_ALARM_SALT_MISSING:"A s\xF3tart\xE1lyt fel kell t\xF6lteni",DISH_ALARM_RINSE_AID_LOW:"Az \xF6bl\xEDt\u0151szer-adagol\xF3 ki\xFCr\xFClt",DISH_ALARM_I10:"i10 \u2013 a k\xE9sz\xFCl\xE9k nem t\xF6lt be vizet. Ellen\u0151rizze a v\xEDzcsapot \xE9s a sz\u0171r\u0151t.",DISH_ALARM_I11:"i11 \u2013 a k\xE9sz\xFCl\xE9k nem t\xF6lt be vizet. Ellen\u0151rizze a v\xEDzcsapot \xE9s a sz\u0171r\u0151t.",DISH_ALARM_I20:"i20 \u2013 a k\xE9sz\xFCl\xE9k nem ereszti le a vizet. Ellen\u0151rizze a szifont \xE9s a sz\u0171r\u0151ket.",DISH_ALARM_I30:"i30 \u2013 a t\xFAlcsordul\xE1sg\xE1tl\xF3 bekapcsolt. Z\xE1rja el a v\xEDzcsapot!",DISH_ALARM_IF1:"iF1 \u2013 t\xFAl magas a v\xEDzszint a k\xE9sz\xFCl\xE9kben."},alert_generic:"Riaszt\xE1s",ui:{remaining:"H\xE1tral\xE9v\u0151 id\u0151",ready_at:"Elk\xE9sz\xFCl",starts_at:"Indul",start_in:"Ind\xEDt\xE1s eddig",door:"Ajt\xF3",door_open:"Az ajt\xF3 nyitva",door_closed:"Ajt\xF3 z\xE1rva",program:"Program",options:"Kieg\xE9sz\xEDt\u0151 funkci\xF3k",no_options:"Ehhez a programhoz nincs v\xE1laszthat\xF3 funkci\xF3.",delay:"K\xE9sleltetett ind\xEDt\xE1s",delay_off:"Nincs",delay_cancel:"T\xF6rl\xE9s",delay_amount:"K\xE9sleltet\xE9s",ready_by:"Legyen k\xE9sz",ready_by_hint:"Add meg, mikorra legyen k\xE9sz, majd nyomd meg a pip\xE1t \u2013 a k\xE1rtya kisz\xE1molja a k\xE9sleltet\xE9st, 10 percre lefel\xE9 kerek\xEDtve.",ready_by_apply:"K\xE9sleltet\xE9s kisz\xE1m\xEDt\xE1sa",ready_by_too_soon:"Ennyi id\u0151 alatt nem f\xE9r bele, a legkor\xE1bbi befejez\xE9s",ready_by_max:"A g\xE9p legfeljebb 24 \xF3ra k\xE9sleltet\xE9st fogad el, ennyire \xE1ll\xEDtottam",ready_by_set:"K\xE9sleltet\xE9s be\xE1ll\xEDtva",scores:"Hat\xE9konys\xE1g",scores_updating:"friss\xFCl\u2026",eco_score:"Eco",energy_score:"Energia",water_score:"V\xEDz",consumption:"V\xE1rhat\xF3 fogyaszt\xE1s",water:"V\xEDz",energy:"Energia",duration:"Id\u0151tartam",details:"R\xE9szletek",appliance_settings:"K\xE9sz\xFCl\xE9k be\xE1ll\xEDt\xE1sok",brightness:"Kijelz\u0151 f\xE9nyereje",floor_light:"TimeOnFloor",floor_light_hint:"A h\xE1tral\xE9v\u0151 id\u0151t a padl\xF3ra vet\xEDti.",end_sound:"Befejez\xE9s hangja",end_sound_hint:"Hangjelz\xE9s a program v\xE9g\xE9n.",key_tone:"Gombhangok",key_tone_hint:"A kezel\u0151panel gombjainak hangja.",brightness_hint:"A k\xE9sz\xFCl\xE9k kijelz\u0151j\xE9nek f\xE9nyereje (0\u20139).",remote:"T\xE1vvez\xE9rl\xE9s",remote_on:"Enged\xE9lyezve",remote_off:"Tiltva",remote_locked:"Ideiglenesen z\xE1rolva",cycles:"Lefutott ciklusok",wifi:"Wi-Fi jel",eco_mode:"Eco m\xF3d",rinse_aid:"\xD6bl\xEDt\u0151szer szintje",water_hardness:"V\xEDzkem\xE9nys\xE9g",offline:"Nincs kapcsolat a k\xE9sz\xFCl\xE9kkel",unavailable:"A k\xE9sz\xFCl\xE9k entit\xE1sai nem \xE9rhet\u0151k el",not_configured:"Nem tal\xE1lhat\xF3 Electrolux mosogat\xF3g\xE9p. Add meg a device vagy a prefix be\xE1ll\xEDt\xE1st a k\xE1rtya konfigur\xE1ci\xF3j\xE1ban.",remote_disabled_hint:"A vez\xE9rl\xE9shez enged\xE9lyezd a t\xE1vind\xEDt\xE1st a k\xE9sz\xFCl\xE9ken.",minute_short:"p",hour_short:"\xF3",finished:"A mosogat\xE1s elk\xE9sz\xFClt",finished_hint:"Kipakolhat\xF3",more:"T\xF6bb",less:"Kevesebb",just_now:"kevesebb mint egy perc"},editor:{device:"K\xE9sz\xFCl\xE9k",device_auto:"Automatikus felismer\xE9s",name:"N\xE9v",language:"Nyelv",language_auto:"Automatikus (HA nyelve)",sections:"Megjelen\xEDtett r\xE9szek",show_programs:"Programv\xE1laszt\xF3",show_options:"Kieg\xE9sz\xEDt\u0151 funkci\xF3k",show_delay:"K\xE9sleltetett ind\xEDt\xE1s",show_scores:"Hat\xE9konys\xE1gi pontok",show_consumption:"Fogyaszt\xE1si adatok",show_appliance_settings:"K\xE9sz\xFCl\xE9k be\xE1ll\xEDt\xE1sok",show_details:"R\xE9szletek",show_controls:"Vez\xE9rl\u0151gombok",compact:"Kompakt n\xE9zet",animate:"Anim\xE1ci\xF3k"}},R3={card_name:"Dishwasher",state:{OFF:"Off",IDLE:"Idle",READY_TO_START:"Ready to start",DELAYED_START:"Delayed start",RUNNING:"Running",PAUSED:"Paused",END_OF_CYCLE:"Finished",ALARM:"Fault",UNKNOWN:"Unknown"},phase:{PREWASH:"Prewash",MAINWASH:"Main wash",RINSE:"Rinse",DRYING:"Drying",UNAVAILABLE:"\u2013"},phase_long:{PREWASH:"Prewash",MAINWASH:"Main wash",COLDRINSE:"Cold rinse",HOTRINSE:"Hot rinse",EXTRARINSE:"Extra rinse",DRYING:"Drying",ADO_DRYING:"AirDry drying",UNAVAILABLE:"No active phase"},program:{ECO:"Eco",AUTO:"Auto",QUICK30:"Quick 30",QUICK60:"1h00m",NORMAL90:"1h30m","120_MIN":"2h00m",RINSE:"Rinse & Hold",MACHINE_CARE:"MachineCare"},program_hint:{ECO:"Normally soiled load, most efficient water and energy use.",AUTO:"Any soil level, the machine senses load and soiling.",QUICK30:"Freshly soiled load, no drying phase.",QUICK60:"Fresh, lightly dried-on soiling.",NORMAL90:"Normal, lightly dried-on soiling, pots included.","120_MIN":"Normal, dried-on soiling, pots and pans.",RINSE:"Refreshes dishes waiting for a full cycle. No detergent!",MACHINE_CARE:"Cleans the inside of the machine from limescale and grease."},option:{xtra_dry:"ExtraDry",extra_power:"ExtraPower",extra_silent:"ExtraSilent",glass_care:"GlassCare",sanitize:"Sanitize",spray_zone:"SprayZone",zone_clean:"ZoneClean",one_rack:"One rack",auto_door_opener:"AutoOpen door"},option_hint:{xtra_dry:"Stronger drying at the end of the program.",extra_power:"More powerful wash for stubborn soiling.",extra_silent:"Quieter operation, longer program.",glass_care:"Protects glassware, max. 45 \xB0C.",sanitize:"Extra sanitising rinse.",spray_zone:"Focused spray in the lower basket.",zone_clean:"Intensive lower basket, gentle upper basket.",one_rack:"Washes a single basket only.",auto_door_opener:"Opens the door automatically at the end of the cycle."},command:{on:"Turn on",off:"Turn off",start:"Start",pause:"Pause",resume:"Resume",stopreset:"Stop"},alert:{DISH_ALARM_SALT_MISSING:"Salt container needs refilling",DISH_ALARM_RINSE_AID_LOW:"Rinse aid dispenser is empty",DISH_ALARM_I10:"i10 \u2013 the appliance does not fill with water. Check the tap and the filter.",DISH_ALARM_I11:"i11 \u2013 the appliance does not fill with water. Check the tap and the filter.",DISH_ALARM_I20:"i20 \u2013 the appliance does not drain. Check the siphon and the filters.",DISH_ALARM_I30:"i30 \u2013 anti-flood device triggered. Close the water tap!",DISH_ALARM_IF1:"iF1 \u2013 water level inside the appliance is too high."},alert_generic:"Alert",ui:{remaining:"Remaining",ready_at:"Ready at",starts_at:"Starts at",start_in:"Start in",door:"Door",door_open:"Door is open",door_closed:"Door closed",program:"Program",options:"Options",no_options:"This program has no selectable options.",delay:"Delayed start",delay_off:"None",delay_cancel:"Cancel",delay_amount:"Delay",ready_by:"Ready by",ready_by_hint:"Pick when it should be done and press the tick - the card works out the delay, rounded down to 10 minutes.",ready_by_apply:"Work out the delay",ready_by_too_soon:"That is too soon, the earliest finish is",ready_by_max:"The appliance accepts at most 24 hours, so it was set to that",ready_by_set:"Delay set",scores:"Efficiency",scores_updating:"updating\u2026",eco_score:"Eco",energy_score:"Energy",water_score:"Water",consumption:"Estimated use",water:"Water",energy:"Energy",duration:"Duration",details:"Details",appliance_settings:"Appliance settings",brightness:"Display brightness",floor_light:"TimeOnFloor",floor_light_hint:"Projects the remaining time onto the floor.",end_sound:"End of cycle sound",end_sound_hint:"Beeps when the program finishes.",key_tone:"Key tone",key_tone_hint:"Sound of the control panel buttons.",brightness_hint:"Brightness of the appliance display (0-9).",remote:"Remote control",remote_on:"Enabled",remote_off:"Disabled",remote_locked:"Temporarily locked",cycles:"Total cycles",wifi:"Wi-Fi signal",eco_mode:"Eco mode",rinse_aid:"Rinse aid level",water_hardness:"Water hardness",offline:"The appliance is offline",unavailable:"The appliance entities are unavailable",not_configured:"No Electrolux dishwasher found. Set the device or prefix option in the card configuration.",remote_disabled_hint:"Enable remote start on the appliance to control it.",minute_short:"m",hour_short:"h",finished:"The cycle has finished",finished_hint:"Ready to unload",more:"More",less:"Less",just_now:"less than a minute"},editor:{device:"Device",device_auto:"Auto detect",name:"Name",language:"Language",language_auto:"Automatic (HA language)",sections:"Visible sections",show_programs:"Program picker",show_options:"Options",show_delay:"Delayed start",show_scores:"Efficiency scores",show_consumption:"Consumption figures",show_appliance_settings:"Appliance settings",show_details:"Details",show_controls:"Control buttons",compact:"Compact layout",animate:"Animations"}},X1={hu:P3,en:R3},w1=Object.keys(X1);function A1(M,C){return Q(M,C,w1)}function n1(M){return K(X1,M)}function c(M){return M==null?"":String(M).toUpperCase().replace(/[\s\-.]+/g,"_").replace(/_+/g,"_")}function Z(M){return!M||M.state==="unavailable"||M.state==="unknown"}function E3(M){if(!M.length)return null;let C=M[0];for(let H of M.slice(1)){let V=0;for(;V<C.length&&V<H.length&&C[V]===H[V];)V+=1;C=C.slice(0,V)}return C.replace(/_+$/,"")||null}function p1(M,C,H){if(C?.prefix)return C.prefix;let V=new RegExp(`^${H.domain}\\..+_${H.suffix}$`),L=i=>i.replace(new RegExp(`^${H.domain}\\.`),"").replace(new RegExp(`_${H.suffix}$`),"");if(C?.device&&M?.entities){let i=Object.values(M.entities).find(o=>o.device_id===C.device&&V.test(o.entity_id));if(i)return L(i.entity_id);let t=Object.values(M.entities).filter(o=>o.device_id===C.device).map(o=>o.entity_id.split(".")[1]);if(t.length)return E3(t)}let r=C?.entities?.[H.key];if(r)return L(r);let e=Object.keys(M?.states||{}).filter(i=>V.test(i));return e.length===1?L(e[0]):null}function d1(M,C,H,V){let L=C?.entities||{},r={};for(let e of new Set([...Object.keys(H),...Object.keys(L)])){let i=L[e];if(i){r[e]=i;continue}let t=H[e];if(!t||!V)continue;let o=`${t[0]}.${V}_${t[1]}`;M?.states?.[o]&&(r[e]=o)}return r}function m1(M,C){if(!M?.entities||!M?.devices)return[];let H=new RegExp(`^${C.domain}\\..+_${C.suffix}$`),V=new Map;for(let L of Object.values(M.entities)){if(!L.device_id||!H.test(L.entity_id))continue;let r=M.devices[L.device_id];r&&V.set(L.device_id,r.name_by_user||r.name||L.device_id)}return[...V.entries()].map(([L,r])=>({id:L,name:r}))}var J1={domain:"sensor",suffix:"appliance_state",key:"appliance_state"},F3={appliance_state:["sensor","appliance_state"],cycle_phase:["sensor","cycle_phase"],time_to_end:["sensor","time_to_end"],alerts:["sensor","alerts"],eco_score:["sensor","eco_score"],energy_score:["sensor","energy_score"],water_score:["sensor","water_score"],total_cycle_counter:["sensor","total_cycle_counter"],remote_control:["sensor","remote_control"],link_quality:["sensor","network_interface_link_quality_indicator"],door_state:["binary_sensor","door_state"],connectivity:["binary_sensor","connectivity_state"],eco_mode:["binary_sensor","miscellaneous_state_eco_mode"],program:["select","program_uid"],water_hardness:["select","water_hardness"],display_light:["select","display_light"],display_on_floor:["select","display_on_floor"],end_of_cycle_sound:["select","end_of_cycle_sound"],key_tone:["switch","key_tone"],start_time:["number","start_time"],rinse_aid_level:["number","rinse_aid_level"],cmd_on:["button","execute_command_on"],cmd_off:["button","execute_command_off"],cmd_start:["button","execute_command_start"],cmd_pause:["button","execute_command_pause"],cmd_resume:["button","execute_command_resume"],cmd_stopreset:["button","execute_command_stopreset"]},D3=["xtra_dry_option","extra_power_option","extra_silent_option","glass_care_option","sanitize_option","spray_zone_option","zone_clean_option","one_rack_option","auto_door_opener"];function N3(M,C){return p1(M,C,J1)}function C2(M,C){let H=N3(M,C),V=d1(M,C,F3,H);if(V.options={},H)for(let L of D3){let r=`switch.${H}_${L}`;M?.states?.[r]&&(V.options[L]=r)}return V.prefix=H,V}function l1(M){return m1(M,J1)}var M2="aeg-dishwasher-card:progress";function W(M){if(Z(M))return null;let C=Number(M.state);return Number.isFinite(C)?C:null}function I3(M){let C=W(M);if(C===null||C<0)return null;let H=(M.attributes?.unit_of_measurement||"").toLowerCase();return H==="s"||H==="sec"||H==="seconds"?Math.round(C/60):H==="h"?Math.round(C*60):H?Math.round(C):C>1e3?Math.round(C/60):Math.round(C)}var H2=["NONE","OFF","OK","0","UNKNOWN","UNAVAILABLE"];function $3(M){if(Z(M))return[];let C=M.attributes||{},H=Object.entries(C).filter(([i,t])=>/^[A-Z][A-Z0-9_]*$/.test(i)&&typeof t=="string").filter(([,i])=>!H2.includes(c(i).split("-")[0])).map(([i,t])=>({code:c(i),severity:c(String(t).split("-")[0])}));if(H.length)return H;let V=C.alerts??C.alert_list??M.state,L=[];Array.isArray(V)?L=V.map(i=>typeof i=="string"?i:i?.code):typeof V=="string"&&!/^\d+$/.test(V.trim())&&(L=V.split(/[,;]/));let r=L.map(i=>c(i)).filter(i=>i&&!H2.includes(i)).map(i=>({code:i,severity:""}));if(r.length)return r;let e=Number(M.state);return Number.isFinite(e)&&e>0?[{code:"",severity:"",count:e}]:[]}function z3(M){if(!M)return null;let C=M.attributes||{},H=String(C.unit_of_measurement||"").toLowerCase(),V=Number.isFinite(C.max)?C.max:1440,L=H==="s"||H==="sec"||H==="seconds"||!H&&V>5e3,r=W(M);return{raw:r,seconds:L,step:Number.isFinite(C.step)?C.step:L?60:1,min:Number.isFinite(C.min)?C.min:-1,max:V,maxMinutes:L?Math.round(V/60):V,minutes:r===null||r<=0?0:L?Math.round(r/60):r}}function W3(){try{return JSON.parse(window.localStorage.getItem(M2)||"{}")}catch{return{}}}function V2(M){try{window.localStorage.setItem(M2,JSON.stringify(M))}catch{}}function U3(M,C,H,V){let L=H===A.RUNNING||H===A.PAUSED,r=W3(),e=r[M];if(!L)return e&&H!==A.DELAYED_START&&(delete r[M],V2(r)),{progress:H===A.END_OF_CYCLE?1:0,total:null};if(V===null)return{progress:0,total:null};let i=S[C]?.duration||0,t=e&&e.program===C,o=Math.max(V,i,t?e.total:0);return(!t||o!==e.total)&&(r[M]={program:C,total:o},V2(r)),{progress:o?Math.min(1,Math.max(0,1-V/o)):0,total:o}}function L2(M,C){if(Z(M))return null;let H=M.attributes?.options||[],V=e=>C.includes(c(e)),L=H.find(V)||null,r=H.find(e=>!V(e))||null;return!L||!r?null:{on:!V(M.state),onOption:r,offOption:L}}function G3(M){if(Z(M))return null;let C=L=>{let r=String(L).match(/(\d+)\s*$/);return r?Number(r[1]):null},H=(M.attributes?.options||[]).map(L=>({label:L,value:C(L)})).filter(L=>L.value!==null).sort((L,r)=>L.value-r.value);if(!H.length)return null;let V=H.find(L=>L.label===M.state);return{levels:H,value:V?V.value:C(M.state),min:H[0].value,max:H[H.length-1].value}}function r2(M,C){let H=C2(M,C),V=h=>H[h]?M.states[H[h]]:void 0,L=V("appliance_state");if(!H.prefix||!L)return{ok:!1,reason:H.prefix?"unavailable":"not_configured",entities:H};let r=c(L.state)in A?c(L.state):A.UNKNOWN,e=V("program"),i=c(e?.state),t=S[i]?i:null,o=c(V("cycle_phase")?.state)||"UNAVAILABLE",d=Q1[o]||null,l=I3(V("time_to_end")),{progress:x}=U3(H.prefix,t,r,l),v=z3(V("start_time")),s=v?v.minutes:0,f=V("door_state"),_=f?f.state==="on":null,w=V("connectivity"),B=w?w.state==="on":!0,g=c(V("remote_control")?.state),P=g===""||g.includes("ENABLED"),m=S[t]?.duration||0,u=l!==null&&l>0?l:null,O=null;if(r===A.RUNNING||r===A.PAUSED)O=l;else if(r===A.DELAYED_START)O=u!==null&&u>s?u:m?s+m:null;else if(r===A.IDLE||r===A.READY_TO_START){let h=u!==null?u:m||null;O=h===null?null:h+s}let J=O!==null?new Date(Date.now()+O*6e4):null,a1=s?new Date(Date.now()+s*6e4):null,o1=K1.map(h=>{let O1=H.options?.[h.entity],W1=O1?M.states[O1]:void 0;return{...h,entityId:O1,on:W1?.state==="on",exists:!!W1,supported:!h.programs||!t||h.programs.includes(t)}}).filter(h=>h.exists),N=(e?.attributes?.options||[]).map(h=>({label:h,key:c(h)}));return{ok:!0,entities:H,state:r,accent:G1[r]||"idle",phase:o,step:d,program:t,programRaw:e?.state||null,programOptions:N,remaining:l,minutesToFinish:O,progress:x,finishAt:J,startAt:a1,delay:s,delayControl:v,delayEntity:H.start_time,doorOpen:_,online:B,remote:g,remoteEnabled:P,alerts:$3(V("alerts")),scores:{eco:W(V("eco_score")),energy:W(V("energy_score")),water:W(V("water_score"))},cycles:W(V("total_cycle_counter")),linkQuality:c(V("link_quality")?.state),ecoMode:V("eco_mode")?.state==="on",rinseAid:W(V("rinse_aid_level")),waterHardness:V("water_hardness")?.state||null,settings:{brightness:G3(V("display_light")),floorLight:L2(V("display_on_floor"),["OFF"]),endSound:L2(V("end_of_cycle_sound"),["NO_SOUND","OFF"]),keyTone:H.key_tone?{on:V("key_tone")?.state==="on"}:null},options:o1,name:C.name||L.attributes?.friendly_name?.replace(/\s*Appliance state$/i,"")||null}}function e2(M,C,H,V,L){return[`M${M+L},${C}`,`H${M+H-L}`,`A${L},${L} 0 0 1 ${M+H},${C+L}`,`V${C+V-L}`,`A${L},${L} 0 0 1 ${M+H-L},${C+V}`,`H${M+L}`,`A${L},${L} 0 0 1 ${M},${C+V-L}`,`V${C+L}`,`A${L},${L} 0 0 1 ${M+L},${C}`,"Z"].join(" ")}var Q3=`${e2(8,6,164,202,18)} ${e2(26,52,128,136,12)}`;function t2(){return`
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
      <path class="door-panel" d="${Q3}" fill-rule="evenodd"/>
      <rect class="panel-strip" x="18" y="14" width="144" height="28" rx="10"/>
      <circle class="led-ring" cx="32" cy="28" r="7"/>
      <circle class="led" cx="32" cy="28" r="4"/>
      <rect class="display" x="60" y="19" width="60" height="18" rx="6"/>
      <text class="display-text" x="90" y="32" text-anchor="middle">--:--</text>
      <rect class="handle" x="18" y="196" width="144" height="7" rx="3.5"/>
    </g>
  </svg>`}function i2(M,C){let H=M.querySelector(".display-text");H&&H.textContent!==C&&(H.textContent=C)}var a2="M6.59,0.66C8.93,-1.15 11.47,1.06 12.04,4.5C12.47,4.5 12.89,4.62 13.27,4.84C13.79,4.24 14.25,3.42 14.07,2.5C13.65,0.35 16.06,-1.39 18.35,1.58C20.16,3.92 17.95,6.46 14.5,7.03C14.5,7.46 14.39,7.89 14.16,8.27C14.76,8.78 15.58,9.24 16.5,9.06C18.63,8.64 20.38,11.04 17.41,13.34C15.07,15.15 12.53,12.94 11.96,9.5C11.53,9.5 11.11,9.37 10.74,9.15C10.22,9.75 9.75,10.58 9.93,11.5C10.35,13.64 7.94,15.39 5.65,12.42C3.83,10.07 6.05,7.53 9.5,6.97C9.5,6.54 9.63,6.12 9.85,5.74C9.25,5.23 8.43,4.76 7.5,4.94C5.37,5.36 3.62,2.96 6.59,0.66M5,16H7A2,2 0 0,1 9,18V24H7V22H5V24H3V18A2,2 0 0,1 5,16M5,18V20H7V18H5M12.93,16H15L12.07,24H10L12.93,16M18,16H21V18H18V22H21V24H18A2,2 0 0,1 16,22V18A2,2 0 0,1 18,16Z",o2="M19,18.31V20A2,2 0 0,1 17,22H7A2,2 0 0,1 5,20V16.3C4.54,16.12 3.95,16 3,16A1,1 0 0,1 2,15A1,1 0 0,1 3,14C3.82,14 4.47,14.08 5,14.21V12.3C4.54,12.12 3.95,12 3,12A1,1 0 0,1 2,11A1,1 0 0,1 3,10C3.82,10 4.47,10.08 5,10.21V8.3C4.54,8.12 3.95,8 3,8A1,1 0 0,1 2,7A1,1 0 0,1 3,6C3.82,6 4.47,6.08 5,6.21V4A2,2 0 0,1 7,2H17A2,2 0 0,1 19,4V6.16C20.78,6.47 21.54,7.13 21.71,7.29C22.1,7.68 22.1,8.32 21.71,8.71C21.32,9.1 20.8,9.09 20.29,8.71V8.71C20.29,8.71 19.25,8 17,8C15.74,8 14.91,8.41 13.95,8.9C12.91,9.41 11.74,10 10,10C9.64,10 9.31,10 9,9.96V7.95C9.3,8 9.63,8 10,8C11.26,8 12.09,7.59 13.05,7.11C14.09,6.59 15.27,6 17,6V4H7V20H17V18C18.5,18 18.97,18.29 19,18.31M17,10C15.27,10 14.09,10.59 13.05,11.11C12.09,11.59 11.26,12 10,12C9.63,12 9.3,12 9,11.95V13.96C9.31,14 9.64,14 10,14C11.74,14 12.91,13.41 13.95,12.9C14.91,12.42 15.74,12 17,12C19.25,12 20.29,12.71 20.29,12.71V12.71C20.8,13.1 21.32,13.1 21.71,12.71C22.1,12.32 22.1,11.69 21.71,11.29C21.5,11.08 20.25,10 17,10M17,14C15.27,14 14.09,14.59 13.05,15.11C12.09,15.59 11.26,16 10,16C9.63,16 9.3,16 9,15.95V17.96C9.31,18 9.64,18 10,18C11.74,18 12.91,17.41 13.95,16.9C14.91,16.42 15.74,16 17,16C19.25,16 20.29,16.71 20.29,16.71V16.71C20.8,17.1 21.32,17.1 21.71,16.71C22.1,16.32 22.1,15.69 21.71,15.29C21.5,15.08 20.25,14 17,14Z";var A2="M13,13H11V7H13M13,17H11V15H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z";var n2="M12,2L1,21H23M12,6L19.53,19H4.47M11,10V14H13V10M11,16V18H13V16";var p2="M13,9V15H16L12,19L8,15H11V9H8L12,5L16,9H13M4,2H20V4H4V2M4,20H20V22H4V20Z";var d2="M12,6V9L16,5L12,1V4A8,8 0 0,0 4,12C4,13.57 4.46,15.03 5.24,16.26L6.7,14.8C6.25,13.97 6,13 6,12A6,6 0 0,1 12,6M18.76,7.74L17.3,9.2C17.74,10.04 18,11 18,12A6,6 0 0,1 12,18V15L8,19L12,23V20A8,8 0 0,0 20,12C20,10.43 19.54,8.97 18.76,7.74Z";var m2="M10,21H14A2,2 0 0,1 12,23A2,2 0 0,1 10,21M21,19V20H3V19L5,17V11C5,7.9 7.03,5.17 10,4.29C10,4.19 10,4.1 10,4A2,2 0 0,1 12,2A2,2 0 0,1 14,4C14,4.1 14,4.19 14,4.29C16.97,5.17 19,7.9 19,11V17L21,19M17,11A5,5 0 0,0 12,6A5,5 0 0,0 7,11V18H17V11M19.75,3.19L18.33,4.61C20.04,6.3 21,8.6 21,11H23C23,8.07 21.84,5.25 19.75,3.19M1,11H3C3,8.6 3.96,6.3 5.67,4.61L4.25,3.19C2.16,5.25 1,8.07 1,11Z";var l2="M12,18V6A6,6 0 0,1 18,12A6,6 0 0,1 12,18M20,15.31L23.31,12L20,8.69V4H15.31L12,0.69L8.69,4H4V8.69L0.69,12L4,15.31V20H8.69L12,23.31L15.31,20H20V15.31Z";var s2="M19.36,2.72L20.78,4.14L15.06,9.85C16.13,11.39 16.28,13.24 15.38,14.44L9.06,8.12C10.26,7.22 12.11,7.37 13.65,8.44L19.36,2.72M5.93,17.57C3.92,15.56 2.69,13.16 2.35,10.92L7.23,8.83L14.67,16.27L12.58,21.15C10.34,20.81 7.94,19.58 5.93,17.57Z";var v2="M6,11L7,7H17L18,11M18.92,6C18.71,5.4 18.14,5 17.5,5H6.5C5.86,5 5.29,5.4 5.08,6L3,12V20A1,1 0 0,0 4,21H5A1,1 0 0,0 6,20V18H18V20A1,1 0 0,0 19,21H20A1,1 0 0,0 21,20V12L18.92,6M7,16H5V14H7V16M19,16H17V14H19V16M14,16H10V14H14V16Z",x2="M4,3V6H1V20H23V6H20V3H14V6H10V3H4M3,8H21V18H3V8M15,10V12H13V14H15V16H17V14H19V12H17V10H15M5,12V14H11V12H5Z";var c2="M12,3C7,3 3,7 3,12C3,17 7,21 12,21C17,21 21,17 21,12C21,7 17,3 12,3M12,19C8.1,19 5,15.9 5,12C5,8.1 8.1,5 12,5C15.9,5 19,8.1 19,12C19,15.9 15.9,19 12,19M20.5,20.5C22.7,18.3 24,15.3 24,12C24,8.7 22.7,5.7 20.5,3.5L19.4,4.6C21.3,6.5 22.5,9.1 22.5,12C22.5,14.9 21.3,17.5 19.4,19.4L20.5,20.5M4.6,19.4C2.7,17.5 1.5,14.9 1.5,12C1.5,9.1 2.7,6.5 4.6,4.6L3.5,3.5C1.3,5.7 0,8.7 0,12C0,15.3 1.3,18.3 3.5,20.5L4.6,19.4M9.5,7V17H11.5V13H13.5A2,2 0 0,0 15.5,11V9A2,2 0 0,0 13.5,7H9.5M11.5,9H13.5V11H11.5V9Z";var Z2="M23 8C23 4.13 19.87 1 16 1C12.47 1 9.57 3.61 9.08 7H4.5C3.84 7 3.28 7.42 3.08 8L1 14V22C1 22.55 1.45 23 2 23H3C3.55 23 4 22.55 4 22V21H16V22C16 22.55 16.45 23 17 23H18C18.55 23 19 22.55 19 22V14.32C21.36 13.19 23 10.79 23 8M4.5 8.5H9.03C9.15 10.26 9.92 11.84 11.11 13H3L4.5 8.5M4.5 18C3.67 18 3 17.33 3 16.5S3.67 15 4.5 15 6 15.67 6 16.5 5.33 18 4.5 18M15.5 18C14.67 18 14 17.33 14 16.5S14.67 15 15.5 15 17 15.67 17 16.5 16.33 18 15.5 18M16 13C14.61 13 13.44 12.5 12.47 11.53C11.5 10.56 11 9.39 11 8C11 6.64 11.5 5.46 12.47 4.5C13.44 3.5 14.61 3 16 3C17.36 3 18.54 3.5 19.5 4.5C20.5 5.46 21 6.64 21 8C21 9.39 20.5 10.56 19.5 11.53C18.54 12.5 17.36 13 16 13M16.5 8.25L19.36 9.94L18.61 11.16L15 9V4H16.5V8.25Z";var u2="M6.5 5C5.84 5 5.28 5.42 5.08 6L3 12V20A1 1 0 0 0 4 21H5A1 1 0 0 0 6 20V19H11.3A7 7 0 0 1 11 17A7 7 0 0 1 14.41 11H5L6.5 6.5H17.5L18.68 10.03A7 7 0 0 1 20.47 10.46L18.92 6C18.72 5.42 18.16 5 17.5 5H6.5M17 12C16.87 12 16.76 12.09 16.74 12.21L16.55 13.53C16.25 13.66 15.96 13.82 15.7 14L14.46 13.5C14.35 13.5 14.22 13.5 14.15 13.63L13.15 15.36C13.09 15.47 13.11 15.6 13.21 15.68L14.27 16.5C14.25 16.67 14.24 16.83 14.24 17C14.24 17.17 14.25 17.33 14.27 17.5L13.21 18.32C13.12 18.4 13.09 18.53 13.15 18.64L14.15 20.37C14.21 20.5 14.34 20.5 14.46 20.5L15.7 20C15.96 20.18 16.24 20.35 16.55 20.47L16.74 21.79C16.76 21.91 16.86 22 17 22H19C19.11 22 19.22 21.91 19.24 21.79L19.43 20.47C19.73 20.34 20 20.18 20.27 20L21.5 20.5C21.63 20.5 21.76 20.5 21.83 20.37L22.83 18.64C22.89 18.53 22.86 18.4 22.77 18.32L21.7 17.5C21.72 17.33 21.74 17.17 21.74 17C21.74 16.83 21.73 16.67 21.7 16.5L22.76 15.68C22.85 15.6 22.88 15.47 22.82 15.36L21.82 13.63C21.76 13.5 21.63 13.5 21.5 13.5L20.27 14C20 13.82 19.73 13.65 19.42 13.53L19.23 12.21C19.22 12.09 19.11 12 19 12H17M6.5 13A1.5 1.5 0 0 1 8 14.5A1.5 1.5 0 0 1 6.5 16A1.5 1.5 0 0 1 5 14.5A1.5 1.5 0 0 1 6.5 13M18 15.5C18.83 15.5 19.5 16.17 19.5 17C19.5 17.83 18.83 18.5 18 18.5C17.16 18.5 16.5 17.83 16.5 17C16.5 16.17 17.17 15.5 18 15.5Z",S2="M5,14H19L17.5,9.5H6.5L5,14M17.5,19A1.5,1.5 0 0,0 19,17.5A1.5,1.5 0 0,0 17.5,16A1.5,1.5 0 0,0 16,17.5A1.5,1.5 0 0,0 17.5,19M6.5,19A1.5,1.5 0 0,0 8,17.5A1.5,1.5 0 0,0 6.5,16A1.5,1.5 0 0,0 5,17.5A1.5,1.5 0 0,0 6.5,19M18.92,9L21,15V23A1,1 0 0,1 20,24H19A1,1 0 0,1 18,23V22H6V23A1,1 0 0,1 5,24H4A1,1 0 0,1 3,23V15L5.08,9C5.28,8.42 5.85,8 6.5,8H17.5C18.15,8 18.72,8.42 18.92,9M12,0C14.12,0 16.15,0.86 17.65,2.35L16.23,3.77C15.11,2.65 13.58,2 12,2C10.42,2 8.89,2.65 7.77,3.77L6.36,2.35C7.85,0.86 9.88,0 12,0M12,4C13.06,4 14.07,4.44 14.82,5.18L13.4,6.6C13.03,6.23 12.53,6 12,6C11.5,6 10.97,6.23 10.6,6.6L9.18,5.18C9.93,4.44 10.94,4 12,4Z",h2="M16,6L15,6.75L17.5,10H13.5V8.5H12V10H3C1.89,10 1,10.89 1,12V15H3A3,3 0 0,0 6,18A3,3 0 0,0 9,15H15A3,3 0 0,0 18,18A3,3 0 0,0 21,15H23V12C23,10.89 22.11,10 21,10H19L16,6M6,13.5A1.5,1.5 0 0,1 7.5,15A1.5,1.5 0 0,1 6,16.5A1.5,1.5 0 0,1 4.5,15A1.5,1.5 0 0,1 6,13.5M18,13.5A1.5,1.5 0 0,1 19.5,15A1.5,1.5 0 0,1 18,16.5A1.5,1.5 0 0,1 16.5,15A1.5,1.5 0 0,1 18,13.5Z";var f2="M19,14H16V16H19V14M22,21H3V11L11,3H21A1,1 0 0,1 22,4V21M11.83,5L5.83,11H20V5H11.83Z";var g2="M3,6H16L19,10H21C22.11,10 23,10.89 23,12V15H21A3,3 0 0,1 18,18A3,3 0 0,1 15,15H9A3,3 0 0,1 6,18A3,3 0 0,1 3,15H1V8C1,6.89 1.89,6 3,6M2.5,7.5V10H10.5V7.5H2.5M12,7.5V10H17.14L15.25,7.5H12M6,13.5A1.5,1.5 0 0,0 4.5,15A1.5,1.5 0 0,0 6,16.5A1.5,1.5 0 0,0 7.5,15A1.5,1.5 0 0,0 6,13.5M18,13.5A1.5,1.5 0 0,0 16.5,15A1.5,1.5 0 0,0 18,16.5A1.5,1.5 0 0,0 19.5,15A1.5,1.5 0 0,0 18,13.5Z";var O2="M13,4.8C9,4.8 9,19.2 13,19.2C17,19.2 22,16.5 22,12C22,7.5 17,4.8 13,4.8M13.1,17.2C12.7,16.8 12,15 12,12C12,9 12.7,7.2 13.1,6.8C16,6.9 20,8.7 20,12C20,15.3 16,17.1 13.1,17.2M2,5H9.5C9.3,5.4 9,5.8 8.9,6.4C8.8,6.6 8.8,6.8 8.7,7H2V5M8,11H2V9H8.2C8.1,9.6 8.1,10.3 8,11M8.7,17C8.9,17.8 9.2,18.4 9.6,19H2.1V17H8.7M8.2,15H2V13H8C8.1,13.7 8.1,14.4 8.2,15Z";var y2="M18 15C18 17.6 16.8 19.9 14.9 21.3L14.4 20.8L12.3 18.7L13.7 17.3L14.9 18.5C15.4 17.8 15.8 16.9 15.9 16H14V14H15.9C15.7 13.1 15.4 12.3 14.9 11.5L13.7 12.7L12.3 11.3L13.5 10.1C12.8 9.6 11.9 9.2 11 9.1V11H9V9.1C8.1 9.3 7.3 9.6 6.5 10.1L9.5 13.1C9.7 13.1 9.8 13 10 13C11.11 13 12 13.9 12 15S11.11 17 10 17 8 16.11 8 15C8 14.8 8 14.7 8.1 14.5L5.1 11.5C4.6 12.2 4.2 13.1 4.1 14H6V16H4.1C4.3 16.9 4.6 17.7 5.1 18.5L6.3 17.3L7.7 18.7L5.1 21.3C3.2 19.9 2 17.6 2 15C2 10.58 5.58 7 10 7S18 10.58 18 15M23 5C23 3.34 21.66 2 20 2S17 3.34 17 5C17 6.3 17.84 7.4 19 7.82V11H21V7.82C22.16 7.4 23 6.3 23 5M20 6C19.45 6 19 5.55 19 5S19.45 4 20 4 21 4.45 21 5 20.55 6 20 6Z";var k2="M16,10L15.8,11H13.5A0.5,0.5 0 0,0 13,11.5A0.5,0.5 0 0,0 13.5,12H15.6L14.6,17H12.5A0.5,0.5 0 0,0 12,17.5A0.5,0.5 0 0,0 12.5,18H14.4L14,20A2,2 0 0,1 12,22A2,2 0 0,1 10,20L9,15H10.5A0.5,0.5 0 0,0 11,14.5A0.5,0.5 0 0,0 10.5,14H8.8L8,10C8,8.8 8.93,7.77 10.29,7.29L8.9,5.28C8.59,4.82 8.7,4.2 9.16,3.89C9.61,3.57 10.23,3.69 10.55,4.14L11,4.8V3A1,1 0 0,1 12,2A1,1 0 0,1 13,3V5.28L14.5,3.54C14.83,3.12 15.47,3.07 15.89,3.43C16.31,3.78 16.36,4.41 16,4.84L13.87,7.35C15.14,7.85 16,8.85 16,10Z";var _2="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z";var w2="M12.5,1.5C10.73,1.5 9.17,2.67 8.67,4.37C8.14,4.13 7.58,4 7,4A4,4 0 0,0 3,8C3,9.82 4.24,11.41 6,11.87V19H19V11.87C20.76,11.41 22,9.82 22,8A4,4 0 0,0 18,4C17.42,4 16.86,4.13 16.33,4.37C15.83,2.67 14.27,1.5 12.5,1.5M12,10.5H13V17.5H12V10.5M9,12.5H10V17.5H9V12.5M15,12.5H16V17.5H15V12.5M6,20V21A1,1 0 0,0 7,22H18A1,1 0 0,0 19,21V20H6Z";var b2="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z";var T2="M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z";var B2="M4,4H20A2,2 0 0,1 22,6V18A2,2 0 0,1 20,20H4A2,2 0 0,1 2,18V6A2,2 0 0,1 4,4M4,6V18H11V6H4M20,18V6H18.76C19,6.54 18.95,7.07 18.95,7.13C18.88,7.8 18.41,8.5 18.24,8.75L15.91,11.3L19.23,11.28L19.24,12.5L14.04,12.47L14,11.47C14,11.47 17.05,8.24 17.2,7.95C17.34,7.67 17.91,6 16.5,6C15.27,6.05 15.41,7.3 15.41,7.3L13.87,7.31C13.87,7.31 13.88,6.65 14.25,6H13V18H15.58L15.57,17.14L16.54,17.13C16.54,17.13 17.45,16.97 17.46,16.08C17.5,15.08 16.65,15.08 16.5,15.08C16.37,15.08 15.43,15.13 15.43,15.95H13.91C13.91,15.95 13.95,13.89 16.5,13.89C19.1,13.89 18.96,15.91 18.96,15.91C18.96,15.91 19,17.16 17.85,17.63L18.37,18H20M8.92,16H7.42V10.2L5.62,10.76V9.53L8.76,8.41H8.92V16Z";var P2="M18.32,8H5.67L5.23,4H18.77M12,19A3,3 0 0,1 9,16C9,14 12,10.6 12,10.6C12,10.6 15,14 15,16A3,3 0 0,1 12,19M3,2L5,20.23C5.13,21.23 5.97,22 7,22H17C18,22 18.87,21.23 19,20.23L21,2H3Z";var R2="M12,1.5A2.5,2.5 0 0,1 14.5,4A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 9.5,4A2.5,2.5 0 0,1 12,1.5M15.87,5C18,5 20,7 20,9C22.7,9 22.7,13 20,13H4C1.3,13 1.3,9 4,9C4,7 6,5 8.13,5C8.57,6.73 10.14,8 12,8C13.86,8 15.43,6.73 15.87,5M5,15H8L9,22H7L5,15M10,15H14L13,22H11L10,15M16,15H19L17,22H15L16,15Z";var E2="M18,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V4A2,2 0 0,0 18,2M10,4A1,1 0 0,1 11,5A1,1 0 0,1 10,6A1,1 0 0,1 9,5A1,1 0 0,1 10,4M7,4A1,1 0 0,1 8,5A1,1 0 0,1 7,6A1,1 0 0,1 6,5A1,1 0 0,1 7,4M18,20H6V8H18V20M14.67,15.33C14.69,16.03 14.41,16.71 13.91,17.21C12.86,18.26 11.15,18.27 10.09,17.21C9.59,16.71 9.31,16.03 9.33,15.33C9.4,14.62 9.63,13.94 10,13.33C10.37,12.5 10.81,11.73 11.33,11L12,10C13.79,12.59 14.67,14.36 14.67,15.33";var F2="M16,11H18V13H16V11M12,3H19C20.11,3 21,3.89 21,5V19H22V21H2V19H10V5C10,3.89 10.89,3 12,3M12,5V19H19V5H12Z";var D2="M12,3C10.89,3 10,3.89 10,5H3V19H2V21H22V19H21V5C21,3.89 20.11,3 19,3H12M12,5H19V19H12V5M5,11H7V13H5V11Z";var N2="M16,12A2,2 0 0,1 18,10A2,2 0 0,1 20,12A2,2 0 0,1 18,14A2,2 0 0,1 16,12M10,12A2,2 0 0,1 12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12M4,12A2,2 0 0,1 6,10A2,2 0 0,1 8,12A2,2 0 0,1 6,14A2,2 0 0,1 4,12Z";var I2="M19.77,7.23L19.78,7.22L16.06,3.5L15,4.56L17.11,6.67C16.17,7.03 15.5,7.93 15.5,9A2.5,2.5 0 0,0 18,11.5C18.36,11.5 18.69,11.42 19,11.29V18.5A1,1 0 0,1 18,19.5A1,1 0 0,1 17,18.5V14A2,2 0 0,0 15,12H14V5A2,2 0 0,0 12,3H6A2,2 0 0,0 4,5V21H14V13.5H15.5V18.5A2.5,2.5 0 0,0 18,21A2.5,2.5 0 0,0 20.5,18.5V9C20.5,8.31 20.22,7.68 19.77,7.23M18,10A1,1 0 0,1 17,9A1,1 0 0,1 18,8A1,1 0 0,1 19,9A1,1 0 0,1 18,10M8,18V13.5H6L10,6V11H12L8,18Z";var $2="M12,11A1,1 0 0,0 11,12A1,1 0 0,0 12,13A1,1 0 0,0 13,12A1,1 0 0,0 12,11M12.5,2C17,2 17.11,5.57 14.75,6.75C13.76,7.24 13.32,8.29 13.13,9.22C13.61,9.42 14.03,9.73 14.35,10.13C18.05,8.13 22.03,8.92 22.03,12.5C22.03,17 18.46,17.1 17.28,14.73C16.78,13.74 15.72,13.3 14.79,13.11C14.59,13.59 14.28,14 13.88,14.34C15.87,18.03 15.08,22 11.5,22C7,22 6.91,18.42 9.27,17.24C10.25,16.75 10.69,15.71 10.89,14.79C10.4,14.59 9.97,14.27 9.65,13.87C5.96,15.85 2,15.07 2,11.5C2,7 5.56,6.89 6.74,9.26C7.24,10.25 8.29,10.68 9.22,10.87C9.41,10.39 9.73,9.97 10.14,9.65C8.15,5.96 8.94,2 12.5,2Z";var z2="M17.66 11.2C17.43 10.9 17.15 10.64 16.89 10.38C16.22 9.78 15.46 9.35 14.82 8.72C13.33 7.26 13 4.85 13.95 3C13 3.23 12.17 3.75 11.46 4.32C8.87 6.4 7.85 10.07 9.07 13.22C9.11 13.32 9.15 13.42 9.15 13.55C9.15 13.77 9 13.97 8.8 14.05C8.57 14.15 8.33 14.09 8.14 13.93C8.08 13.88 8.04 13.83 8 13.76C6.87 12.33 6.69 10.28 7.45 8.64C5.78 10 4.87 12.3 5 14.47C5.06 14.97 5.12 15.47 5.29 15.97C5.43 16.57 5.7 17.17 6 17.7C7.08 19.43 8.95 20.67 10.96 20.92C13.1 21.19 15.39 20.8 17.03 19.32C18.86 17.66 19.5 15 18.56 12.72L18.43 12.46C18.22 12 17.66 11.2 17.66 11.2M14.5 17.5C14.22 17.74 13.76 18 13.4 18.1C12.28 18.5 11.16 17.94 10.5 17.28C11.69 17 12.4 16.12 12.61 15.23C12.78 14.43 12.46 13.77 12.33 13C12.21 12.26 12.23 11.63 12.5 10.94C12.69 11.32 12.89 11.7 13.13 12C13.9 13 15.11 13.44 15.37 14.8C15.41 14.94 15.43 15.08 15.43 15.23C15.46 16.05 15.1 16.95 14.5 17.5H14.5Z";var W2="M12,20L12.76,17C9.5,16.79 6.59,15.4 5.75,13.58C5.66,14.06 5.53,14.5 5.33,14.83C4.67,16 3.33,16 2,16C3.1,16 3.5,14.43 3.5,12.5C3.5,10.57 3.1,9 2,9C3.33,9 4.67,9 5.33,10.17C5.53,10.5 5.66,10.94 5.75,11.42C6.4,10 8.32,8.85 10.66,8.32L9,5C11,5 13,5 14.33,5.67C15.46,6.23 16.11,7.27 16.69,8.38C19.61,9.08 22,10.66 22,12.5C22,14.38 19.5,16 16.5,16.66C15.67,17.76 14.86,18.78 14.17,19.33C13.33,20 12.67,20 12,20M17,11A1,1 0 0,0 16,12A1,1 0 0,0 17,13A1,1 0 0,0 18,12A1,1 0 0,0 17,11Z";var U2="M7,2V13H10V22L17,10H13L17,2H7Z";var G2="M15 21H17V19H15M19 9H21V7H19M3 5V19C3 20.1 3.9 21 5 21H9V19H5V5H9V3H5C3.9 3 3 3.9 3 5M19 3V5H21C21 3.9 20.1 3 19 3M11 23H13V1H11M19 17H21V15H19M15 5H17V3H15M19 13H21V11H19M19 21C20.1 21 21 20.1 21 19H19Z";var Q2="M20.16 12.73C22.93 9.96 22.57 5.26 19.09 3C17.08 1.67 14.39 1.66 12.36 2.97C10.6 4.1 9.63 5.86 9.46 7.68C9.33 9 8.83 10.23 7.91 11.15L7.88 11.18C6.72 12.34 6.72 14.11 7.81 15.19L8.8 16.18C9.89 17.27 11.66 17.27 12.75 16.18C13.72 15.21 15 14.68 16.39 14.53C17.76 14.38 19.1 13.78 20.16 12.73M6.26 19.86C6.53 20.42 6.44 21.1 5.97 21.56C5.39 22.15 4.44 22.15 3.85 21.56C3.58 21.29 3.44 20.94 3.42 20.58C3.06 20.56 2.71 20.42 2.44 20.15C1.85 19.56 1.85 18.61 2.44 18.03C2.9 17.57 3.59 17.47 4.14 17.74L6.62 15.31C6.76 15.5 6.92 15.72 7.1 15.9L8.09 16.89C8.3 17.09 8.5 17.26 8.76 17.41L6.26 19.86Z";var K2="M11.9 2C8 2 4.9 5.4 5 9.3C5.1 11.9 6.6 14.1 8.7 15.2C10.1 15.9 11 17.3 11 18.8V19C11 20.7 12.3 22 14 22C18 22 19 17 19 9C19 9 19 2 11.9 2M14 20C13.4 20 13 19.6 13 19V18.8C13 16.6 11.7 14.5 9.7 13.4C8.1 12.6 7.1 11 7 9.2C7 7.9 7.5 6.5 8.4 5.5C9.3 4.5 10.6 4 11.8 4C16.7 4 17 8.2 17 9C17 18.9 15.3 20 14 20M15.8 7.6L8.3 10.3C8.1 10 8 9.6 8 9.1C8 8.4 8.2 7.8 8.5 7.1L13.7 5.2C14.9 5.8 15.5 6.7 15.8 7.6M12.9 15.1L15.7 14.1C15.6 15.6 15.3 16.7 15.1 17.4L13.8 17.9C13.8 16.9 13.5 16 12.9 15.1M16 9.2C16 10.4 16 11.5 15.9 12.4L11.9 13.9C11.4 13.4 10.8 12.9 10.1 12.6C9.7 12.4 9.3 12.1 9 11.8L16 9.2Z";var Y2="M22,18A4,4 0 0,1 18,22H15A4,4 0 0,1 11,18V16H17.79L20.55,11.23L22.11,12.13L19.87,16H22V18M9,22H2C2,19 2,16 2.33,12.83C2.6,10.3 3.08,7.66 3.6,5H3V3H4L7,3H8V5H7.4C7.92,7.66 8.4,10.3 8.67,12.83C9,16 9,19 9,22Z";var j2="M18 11V6H15V4H12V2H8V5H6V11H5L7 22H17L19 11H18M15.86 11C15.7 11.61 15.4 12.16 15 12.62V8.62L17 9.62V11H15.86M17 7V8.5L15 7.5V7H17M12 5H14V8.5L12 9.5V5M12 10.62L14 9.62V13.45C13.41 13.8 12.73 14 12 14V10.62M11 13.86C10.21 13.65 9.5 13.22 9 12.62V9.62L11 8.62V13.86M9 3H11V7.5L10 8V5H9V3M7 6H9V8.5L8 9V11H7V6Z";var q2="M18,10A1,1 0 0,1 17,9A1,1 0 0,1 18,8A1,1 0 0,1 19,9A1,1 0 0,1 18,10M12,10H6V5H12M19.77,7.23L19.78,7.22L16.06,3.5L15,4.56L17.11,6.67C16.17,7 15.5,7.93 15.5,9A2.5,2.5 0 0,0 18,11.5C18.36,11.5 18.69,11.42 19,11.29V18.5A1,1 0 0,1 18,19.5A1,1 0 0,1 17,18.5V14C17,12.89 16.1,12 15,12H14V5C14,3.89 13.1,3 12,3H6C4.89,3 4,3.89 4,5V21H14V13.5H15.5V18.5A2.5,2.5 0 0,0 18,21A2.5,2.5 0 0,0 20.5,18.5V9C20.5,8.31 20.22,7.68 19.77,7.23Z";var X2="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12C20,14.4 19,16.5 17.3,18C15.9,16.7 14,16 12,16C10,16 8.2,16.7 6.7,18C5,16.5 4,14.4 4,12A8,8 0 0,1 12,4M14,5.89C13.62,5.9 13.26,6.15 13.1,6.54L11.81,9.77L11.71,10C11,10.13 10.41,10.6 10.14,11.26C9.73,12.29 10.23,13.45 11.26,13.86C12.29,14.27 13.45,13.77 13.86,12.74C14.12,12.08 14,11.32 13.57,10.76L13.67,10.5L14.96,7.29L14.97,7.26C15.17,6.75 14.92,6.17 14.41,5.96C14.28,5.91 14.15,5.89 14,5.89M10,6A1,1 0 0,0 9,7A1,1 0 0,0 10,8A1,1 0 0,0 11,7A1,1 0 0,0 10,6M7,9A1,1 0 0,0 6,10A1,1 0 0,0 7,11A1,1 0 0,0 8,10A1,1 0 0,0 7,9M17,9A1,1 0 0,0 16,10A1,1 0 0,0 17,11A1,1 0 0,0 18,10A1,1 0 0,0 17,9Z";var J2="M10,9A1,1 0 0,1 11,8A1,1 0 0,1 12,9V13.47L13.21,13.6L18.15,15.79C18.68,16.03 19,16.56 19,17.14V21.5C18.97,22.32 18.32,22.97 17.5,23H11C10.62,23 10.26,22.85 10,22.57L5.1,18.37L5.84,17.6C6.03,17.39 6.3,17.28 6.58,17.28H6.8L10,19V9M11,5A4,4 0 0,1 15,9C15,10.5 14.2,11.77 13,12.46V11.24C13.61,10.69 14,9.89 14,9A3,3 0 0,0 11,6A3,3 0 0,0 8,9C8,9.89 8.39,10.69 9,11.24V12.46C7.8,11.77 7,10.5 7,9A4,4 0 0,1 11,5Z";var C5="M15.5,21.27L14.66,21.18C13.9,21.11 13.25,20.6 13,19.87C12.47,17.91 12.47,15.83 13,13.87C15.32,13.4 17,11.37 17,9C17,7 15,2 15,2H9C9,2 7,7 7,9C7,11.38 8.67,13.42 11,13.9C11.53,15.86 11.53,17.94 11,19.9C10.76,20.62 10.12,21.13 9.37,21.21L8.5,21.3C8.5,21.3 8,21.28 8,22H16C16,21.28 15.5,21.27 15.5,21.27M9.44,7L10.44,4H13.56L14.56,7H9.44Z";var H5="M8.06,2C7.88,3.17 8.17,4.16 8.95,4.97C9.45,5.47 9.61,6.14 9.42,7H10.41C10.53,6.45 10.55,6 10.45,5.55C10.36,5.13 10.05,4.63 9.5,4.03C9.05,3.47 8.89,2.8 9.05,2H8.06M10.55,2C10.36,3.17 10.66,4.16 11.44,4.97C11.94,5.47 12.09,6.14 11.91,7H12.89C13,6.45 13.03,6 12.94,5.55C12.84,5.13 12.53,4.63 12,4.03C11.53,3.47 11.38,2.8 11.53,2H10.55M13.08,2C12.89,3.17 13.19,4.16 13.97,4.97C14.47,5.47 14.61,6.14 14.39,7H15.42C15.55,6.45 15.56,6 15.47,5.55C15.38,5.13 15.06,4.63 14.53,4.03C14.06,3.47 13.91,2.8 14.06,2H13.08M5,8C5,9.42 5.39,10.7 6.14,11.84C6.87,12.96 7.91,13.85 9.14,14.39L5.16,20.44C5.06,20.56 5,20.75 5,21C5,21.41 5.16,21.69 5.44,21.84C5.56,21.94 5.75,22 6,22C6.41,22 6.69,21.84 6.84,21.56L7.83,19.97H14.2C14.41,20.55 14.79,21.05 15.28,21.42C15.78,21.8 16.36,22 17,22C17.83,22 18.53,21.69 19.13,21.09C19.72,20.5 20,19.8 20,19C20,18.17 19.72,17.47 19.13,16.88C18.53,16.28 17.83,16 17,16C16.36,16 15.78,16.17 15.28,16.55C14.78,16.92 14.42,17.41 14.2,18H9.14L11.11,14.95C11.27,15 11.56,15 12,15C12.44,15 12.73,15 12.89,14.95L13.88,16.5C14.29,15.96 14.84,15.54 15.47,15.28L14.91,14.39C16.03,13.89 17,13 17.79,11.77C18.59,10.5 19,9.27 19,8H5M17,18C17.3,18 17.53,18.09 17.72,18.28C17.91,18.47 18,18.72 18,19C18,19.27 17.91,19.5 17.72,19.71C17.54,19.91 17.28,20 17,20C16.74,20 16.5,19.91 16.29,19.71C16.09,19.5 16,19.26 16,19C16,18.7 16.09,18.47 16.29,18.28C16.5,18.09 16.73,18 17,18Z";var b1="M8.5 4.5L5.4 9.5L8.5 14.7L5.2 20.5L3.4 19.6L6.1 14.7L3 9.5L6.7 3.6L8.5 4.5M14.7 4.4L11.6 9.5L14.7 14.5L11.4 20.3L9.6 19.4L12.3 14.5L9.2 9.5L12.9 3.5L14.7 4.4M21 4.4L17.9 9.5L21 14.5L17.7 20.3L15.9 19.4L18.6 14.5L15.5 9.5L19.2 3.5L21 4.4";var V5="M13.5,8H12V13L16.28,15.54L17,14.33L13.5,12.25V8M13,3A9,9 0 0,0 4,12H1L4.96,16.03L9,12H6A7,7 0 0,1 13,5A7,7 0 0,1 20,12A7,7 0 0,1 13,19C11.07,19 9.32,18.21 8.06,16.94L6.64,18.36C8.27,20 10.5,21 13,21A9,9 0 0,0 22,12A9,9 0 0,0 13,3";var L5="M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11V17Z";var M5="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z";var r5="M11 15H6L13 1V9H18L11 23V15Z";var e5="M12,17A2,2 0 0,0 14,15C14,13.89 13.1,13 12,13A2,2 0 0,0 10,15A2,2 0 0,0 12,17M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V10C4,8.89 4.9,8 6,8H7V6A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,3A3,3 0 0,0 9,6V8H15V6A3,3 0 0,0 12,3Z";var t5="M18 1C15.24 1 13 3.24 13 6V8H4C2.9 8 2 8.89 2 10V20C2 21.11 2.9 22 4 22H16C17.11 22 18 21.11 18 20V10C18 8.9 17.11 8 16 8H15V6C15 4.34 16.34 3 18 3C19.66 3 21 4.34 21 6V8H23V6C23 3.24 20.76 1 18 1M10 13C11.1 13 12 13.89 12 15C12 16.11 11.11 17 10 17C8.9 17 8 16.11 8 15C8 13.9 8.9 13 10 13Z";var i5="M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z";var a5="M8 18C6.67 18 5.79 18.79 5.29 19.29S4.67 20 4 20 3.21 19.79 2.71 19.29C2.35 18.93 1.79 18.42 1 18.16V20.41C1.09 20.5 1.18 20.59 1.29 20.71C1.79 21.21 2.67 22 4 22S6.21 21.21 6.71 20.71 7.33 20 8 20 8.79 20.21 9.29 20.71C9.73 21.14 10.44 21.8 11.5 21.96C11.66 22 11.83 22 12 22C13.33 22 14.21 21.21 14.71 20.71S15.33 20 16 20 16.79 20.21 17.29 20.71 18.67 22 20 22 22.21 21.21 22.71 20.71C22.82 20.59 22.91 20.5 23 20.41V18.16C22.21 18.42 21.65 18.93 21.29 19.29C20.79 19.79 20.67 20 20 20S19.21 19.79 18.71 19.29 17.33 18 16 18 13.79 18.79 13.29 19.29 12.67 20 12 20C11.78 20 11.63 19.97 11.5 19.92C11.22 19.82 11.05 19.63 10.71 19.29C10.21 18.79 9.33 18 8 18M22 10.5C22 10.5 24 12.67 24 14C24 15.1 23.1 16 22 16S20 15.1 20 14C20 12.67 22 10.5 22 10.5M22.5 7.13L19.24 5.24L12.73 9C12.39 8.4 11.74 8 11 8H9V6H10C10.55 6 11 5.55 11 5S10.55 4 10 4H6C5.45 4 5 4.45 5 5S5.45 6 6 6H7V8H5C3.9 8 3 8.9 3 10V13C3 14.1 3.9 15 5 15H14C14.75 15 15.41 14.58 15.75 13.97L19.4 7.65L21.5 8.86C22 9.14 22.59 8.97 22.87 8.5C23.14 8 23 7.4 22.5 7.13M14 13H5V10H11.69L12.6 11.43L16.06 9.43L14 13M3.5 6.92L1.79 8.62A1 1 0 0 1 .38 7.21L2.09 5.5A1 1 0 0 1 3.5 5.5C3.89 5.89 3.89 6.5 3.5 6.92Z";var o5="M14,19H18V5H14M6,19H10V5H6V19Z";var A5="M8,5.14V19.14L19,12.14L8,5.14Z";var n5="M14.6 9L18 3.1L19.7 4.1L16.9 9H14.6M14 10H3V12H5V19C5 20.1 5.9 21 7 21H17C18.1 21 19 20.1 19 19V12H21V10H14Z";var p5="M19 19C19 20.11 18.11 21 17 21H7C5.9 21 5 20.11 5 19V12H3V10H21V12H19M8 1.5C6.15 1.5 4.65 3 4.65 4.85C4.65 6.7 6.15 8.2 8 8.2H9.53C9.92 8.2 10.29 8.3 10.61 8.5H12.63C12.05 7.45 10.86 6.75 9.53 6.75H8C7 6.75 6.15 5.77 6.15 4.75C6.15 3.73 7 3 8 3M12.85 2C12.85 3 12 3.85 11 3.85V5.35C12.92 5.35 14.5 6.7 14.89 8.5H16.42C16.12 6.67 14.96 5.15 13.35 4.38C13.97 3.77 14.35 2.93 14.35 2Z";var d5="M16.56,5.44L15.11,6.89C16.84,7.94 18,9.83 18,12A6,6 0 0,1 12,18A6,6 0 0,1 6,12C6,9.83 7.16,7.94 8.88,6.88L7.44,5.44C5.36,6.88 4,9.28 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12C20,9.28 18.64,6.88 16.56,5.44M13,3H11V13H13";var m5="M16,6C14.87,6 13.77,6.35 12.84,7H4C2.89,7 2,7.89 2,9V15C2,16.11 2.89,17 4,17H5V18A1,1 0 0,0 6,19H8A1,1 0 0,0 9,18V17H15V18A1,1 0 0,0 16,19H18A1,1 0 0,0 19,18V17H20C21.11,17 22,16.11 22,15V9C22,7.89 21.11,7 20,7H19.15C18.23,6.35 17.13,6 16,6M16,7.5A3.5,3.5 0 0,1 19.5,11A3.5,3.5 0 0,1 16,14.5A3.5,3.5 0 0,1 12.5,11A3.5,3.5 0 0,1 16,7.5M4,9H8V10H4V9M16,9A2,2 0 0,0 14,11A2,2 0 0,0 16,13A2,2 0 0,0 18,11A2,2 0 0,0 16,9M4,11H8V12H4V11M4,13H8V14H4V13Z";var l5="M12,0C8.96,0 6.21,1.23 4.22,3.22L5.63,4.63C7.26,3 9.5,2 12,2C14.5,2 16.74,3 18.36,4.64L19.77,3.23C17.79,1.23 15.04,0 12,0M7.05,6.05L8.46,7.46C9.37,6.56 10.62,6 12,6C13.38,6 14.63,6.56 15.54,7.46L16.95,6.05C15.68,4.78 13.93,4 12,4C10.07,4 8.32,4.78 7.05,6.05M12,15A2,2 0 0,1 10,13A2,2 0 0,1 12,11A2,2 0 0,1 14,13A2,2 0 0,1 12,15M15,9H9A1,1 0 0,0 8,10V22A1,1 0 0,0 9,23H15A1,1 0 0,0 16,22V10A1,1 0 0,0 15,9Z";var s5="M18.1,4.8C18,4.3 17.6,4 17.1,4H13L13.2,7H10.8L11,4H6.8C6.3,4 5.9,4.4 5.8,4.8L3.1,18.8C3,19.4 3.5,20 4.1,20H10L10.3,15H13.7L14,20H19.8C20.4,20 20.9,19.4 20.8,18.8L18.1,4.8M10.4,13L10.6,9H13.2L13.4,13H10.4Z";var v5="M16.88 4L16.88 4L19.03 6.1L13.5 10.5L12.5 9.5L16.87 4L16.88 4M16.88 2C16.3 2 15.73 2.24 15.33 2.72L9.8 9.65L13.34 13.19L20.28 7.67C21.18 6.91 21.25 5.54 20.41 4.7L18.3 2.59C17.9 2.19 17.39 2 16.88 2M9.1 10.36L8.39 11.07C8 11.46 8 12.09 8.39 12.5L10.5 14.6C10.71 14.8 10.96 14.89 11.22 14.89S11.73 14.8 11.93 14.6L12.63 13.9L9.1 10.36M6 15C5.45 15 5 15.45 5 16C5 16.55 5.45 17 6 17C6.55 17 7 16.55 7 16C7 15.45 6.55 15 6 15M9 16C8.45 16 8 16.45 8 17S8.45 18 9 18C9.55 18 10 17.55 10 17S9.55 16 9 16M4 18C3.45 18 3 18.45 3 19S3.45 20 4 20C4.55 20 5 19.55 5 19S4.55 18 4 18M7 19C6.45 19 6 19.45 6 20S6.45 21 7 21C7.55 21 8 20.55 8 20S7.55 19 7 19Z";var x5="M10.6 9.6L9 15L7.4 9.6L2 8L7.4 6.4L9 1L10.6 6.4L16 8L10.6 9.6M17 14.2L21 12L18.8 16L21 20L17 17.8L13 20L15.2 16L13 12L17 14.2M10 16L8.3 19L10 22L7 20.3L4 22L5.7 19L4 16L7 17.7L10 16";var c5="M20.79,13.95L18.46,14.57L16.46,13.44V10.56L18.46,9.43L20.79,10.05L21.31,8.12L19.54,7.65L20,5.88L18.07,5.36L17.45,7.69L15.45,8.82L13,7.38V5.12L14.71,3.41L13.29,2L12,3.29L10.71,2L9.29,3.41L11,5.12V7.38L8.5,8.82L6.5,7.69L5.92,5.36L4,5.88L4.47,7.65L2.7,8.12L3.22,10.05L5.55,9.43L7.55,10.56V13.45L5.55,14.58L3.22,13.96L2.7,15.89L4.47,16.36L4,18.12L5.93,18.64L6.55,16.31L8.55,15.18L11,16.62V18.88L9.29,20.59L10.71,22L12,20.71L13.29,22L14.7,20.59L13,18.88V16.62L15.5,15.17L17.5,16.3L18.12,18.63L20,18.12L19.53,16.35L21.3,15.88L20.79,13.95M9.5,10.56L12,9.11L14.5,10.56V13.44L12,14.89L9.5,13.44V10.56Z";var Z5="M8 17.85C8 19.04 7.11 20 6 20S4 19.04 4 17.85C4 16.42 6 14 6 14S8 16.42 8 17.85M16.46 12V10.56L18.46 9.43L20.79 10.05L21.31 8.12L19.54 7.65L20 5.88L18.07 5.36L17.45 7.69L15.45 8.82L13 7.38V5.12L14.71 3.41L13.29 2L12 3.29L10.71 2L9.29 3.41L11 5.12V7.38L8.5 8.82L6.5 7.69L5.92 5.36L4 5.88L4.47 7.65L2.7 8.12L3.22 10.05L5.55 9.43L7.55 10.56V12H2V13H22V12H16.46M9.5 12V10.56L12 9.11L14.5 10.56V12H9.5M20 17.85C20 19.04 19.11 20 18 20S16 19.04 16 17.85C16 16.42 18 14 18 14S20 16.42 20 17.85M14 20.85C14 22.04 13.11 23 12 23S10 22.04 10 20.85C10 19.42 12 17 12 17S14 19.42 14 20.85Z";var u5="M12,16A3,3 0 0,1 9,13C9,11.88 9.61,10.9 10.5,10.39L20.21,4.77L14.68,14.35C14.18,15.33 13.17,16 12,16M12,3C13.81,3 15.5,3.5 16.97,4.32L14.87,5.53C14,5.19 13,5 12,5A8,8 0 0,0 4,13C4,15.21 4.89,17.21 6.34,18.65H6.35C6.74,19.04 6.74,19.67 6.35,20.06C5.96,20.45 5.32,20.45 4.93,20.07V20.07C3.12,18.26 2,15.76 2,13A10,10 0 0,1 12,3M22,13C22,15.76 20.88,18.26 19.07,20.07V20.07C18.68,20.45 18.05,20.45 17.66,20.06C17.27,19.67 17.27,19.04 17.66,18.65V18.65C19.11,17.2 20,15.21 20,13C20,12 19.81,11 19.46,10.1L20.67,8C21.5,9.5 22,11.18 22,13Z";var S5="M16.72 10.43C14.68 8.39 14.5 4.66 14.5 4H13V6H9V4H7C7 2.9 7.9 2 9 2H16V3C16 3.08 16.04 7.63 17.78 9.37L16.72 10.43M17 2V4H18V2H17M15 12C13 10 13 7 13 7H9V9C9 10 9 10 8 11S7 13 7 13V20C7 21.1 7.9 22 9 22H13C14.1 22 15 21.1 15 20V12Z";var h5="M12,15.39L8.24,17.66L9.23,13.38L5.91,10.5L10.29,10.13L12,6.09L13.71,10.13L18.09,10.5L14.77,13.38L15.76,17.66M22,9.24L14.81,8.63L12,2L9.19,8.63L2,9.24L7.45,13.97L5.82,21L12,17.27L18.18,21L16.54,13.97L22,9.24Z";var f5="M13,19.92C14.8,19.7 16.35,18.95 17.65,17.65C18.95,16.35 19.7,14.8 19.92,13H16.92C16.7,14 16.24,14.84 15.54,15.54C14.84,16.24 14,16.7 13,16.92V19.92M10,8H14L17,11H19.92C19.67,9.05 18.79,7.38 17.27,6C15.76,4.66 14,4 12,4C10,4 8.24,4.66 6.73,6C5.21,7.38 4.33,9.05 4.08,11H7L10,8M11,19.92V16.92C10,16.7 9.16,16.24 8.46,15.54C7.76,14.84 7.3,14 7.08,13H4.08C4.3,14.77 5.05,16.3 6.35,17.6C7.65,18.9 9.2,19.67 11,19.92M12,2C14.75,2 17.1,3 19.05,4.95C21,6.9 22,9.25 22,12C22,14.75 21,17.1 19.05,19.05C17.1,21 14.75,22 12,22C9.25,22 6.9,21 4.95,19.05C3,17.1 2,14.75 2,12C2,9.25 3,6.9 4.95,4.95C6.9,3 9.25,2 12,2Z";var g5="M18,18H6V6H18V18Z";var O5="M15 13V5A3 3 0 0 0 9 5V13A5 5 0 1 0 15 13M12 4A1 1 0 0 1 13 5V8H11V5A1 1 0 0 1 12 4Z";var y5="M19.47 3.47L13.47 9.47L10.53 10C10.22 10.03 9.94 10.18 9.72 10.4L2.81 17.31C1.74 18.38 1.74 20.12 2.81 21.2C3.88 22.27 5.62 22.27 6.7 21.2L13.61 14.29C13.83 14.07 14 13.79 14.03 13.5L14.54 10.54L20.54 4.54L22 2L19.47 3.47M11 14.38C10.24 14.38 9.62 13.76 9.62 13S10.24 11.62 11 11.62 12.38 12.24 12.38 13C12.37 13.76 11.76 14.38 11 14.38Z";var k5="M12,20A7,7 0 0,1 5,13A7,7 0 0,1 12,6A7,7 0 0,1 19,13A7,7 0 0,1 12,20M19.03,7.39L20.45,5.97C20,5.46 19.55,5 19.04,4.56L17.62,6C16.07,4.74 14.12,4 12,4A9,9 0 0,0 3,13A9,9 0 0,0 12,22C17,22 21,17.97 21,13C21,10.88 20.26,8.93 19.03,7.39M11,14H13V8H11M15,1H9V3H15V1Z";var _5="M6,2H18V8H18V8L14,12L18,16V16H18V22H6V16H6V16L10,12L6,8V8H6V2M16,16.5L12,12.5L8,16.5V20H16V16.5M12,11.5L16,7.5V4H8V7.5L12,11.5M10,6H14V6.75L12,8.75L10,6.75V6Z";var w5="M4,5A2,2 0 0,0 2,7V17A2,2 0 0,0 4,19H20A2,2 0 0,0 22,17V7A2,2 0 0,0 20,5H4M4,7H16V17H4V7M19,7A1,1 0 0,1 20,8A1,1 0 0,1 19,9A1,1 0 0,1 18,8A1,1 0 0,1 19,7M6,9V11H14V9H6M19,11A1,1 0 0,1 20,12A1,1 0 0,1 19,13A1,1 0 0,1 18,12A1,1 0 0,1 19,11Z";var b5="M2 12H4V17H20V12H22V17C22 18.11 21.11 19 20 19H4C2.9 19 2 18.11 2 17V12M12 15L17.55 9.54L16.13 8.13L13 11.25V2H11V11.25L7.88 8.13L6.46 9.55L12 15Z";var T5="M8 13C6.14 13 4.59 14.28 4.14 16H2V18H4.14C4.59 19.72 6.14 21 8 21S11.41 19.72 11.86 18H22V16H11.86C11.41 14.28 9.86 13 8 13M8 19C6.9 19 6 18.1 6 17C6 15.9 6.9 15 8 15S10 15.9 10 17C10 18.1 9.1 19 8 19M19.86 6C19.41 4.28 17.86 3 16 3S12.59 4.28 12.14 6H2V8H12.14C12.59 9.72 14.14 11 16 11S19.41 9.72 19.86 8H22V6H19.86M16 9C14.9 9 14 8.1 14 7C14 5.9 14.9 5 16 5S18 5.9 18 7C18 8.1 17.1 9 16 9Z";var B5="M21,10.12H14.22L16.96,7.3C14.23,4.6 9.81,4.5 7.08,7.2C4.35,9.91 4.35,14.28 7.08,17C9.81,19.7 14.23,19.7 16.96,17C18.32,15.65 19,14.08 19,12.1H21C21,14.08 20.12,16.65 18.36,18.39C14.85,21.87 9.15,21.87 5.64,18.39C2.14,14.92 2.11,9.28 5.62,5.81C9.13,2.34 14.76,2.34 18.27,5.81L21,3V10.12M12.5,8V12.25L16,14.33L15.28,15.54L11,13V8H12.5Z";var P5="M12,4L9.91,6.09L12,8.18M4.27,3L3,4.27L7.73,9H3V15H7L12,20V13.27L16.25,17.53C15.58,18.04 14.83,18.46 14,18.7V20.77C15.38,20.45 16.63,19.82 17.68,18.96L19.73,21L21,19.73L12,10.73M19,12C19,12.94 18.8,13.82 18.46,14.64L19.97,16.15C20.62,14.91 21,13.5 21,12C21,7.72 18,4.14 14,3.23V5.29C16.89,6.15 19,8.83 19,12M16.5,12C16.5,10.23 15.5,8.71 14,7.97V10.18L16.45,12.63C16.5,12.43 16.5,12.21 16.5,12Z";var R5="M12,20A6,6 0 0,1 6,14C6,10 12,3.25 12,3.25C12,3.25 18,10 18,14A6,6 0 0,1 12,20Z";var T1="M12,3.25C12,3.25 6,10 6,14C6,17.32 8.69,20 12,20A6,6 0 0,0 18,14C18,10 12,3.25 12,3.25M14.47,9.97L15.53,11.03L9.53,17.03L8.47,15.97M9.75,10A1.25,1.25 0 0,1 11,11.25A1.25,1.25 0 0,1 9.75,12.5A1.25,1.25 0 0,1 8.5,11.25A1.25,1.25 0 0,1 9.75,10M14.25,14.5A1.25,1.25 0 0,1 15.5,15.75A1.25,1.25 0 0,1 14.25,17A1.25,1.25 0 0,1 13,15.75A1.25,1.25 0 0,1 14.25,14.5Z";var E5="M12,21L15.6,16.2C14.6,15.45 13.35,15 12,15C10.65,15 9.4,15.45 8.4,16.2L12,21M12,3C7.95,3 4.21,4.34 1.2,6.6L3,9C5.5,7.12 8.62,6 12,6C15.38,6 18.5,7.12 21,9L22.8,6.6C19.79,4.34 16.05,3 12,3M12,9C9.3,9 6.81,9.89 4.8,11.4L6.6,13.8C8.1,12.67 9.97,12 12,12C14.03,12 15.9,12.67 17.4,13.8L19.2,11.4C17.19,9.89 14.7,9 12,9Z";var F5="M2.28,3L1,4.27L2.47,5.74C2.04,6 1.61,6.29 1.2,6.6L3,9C3.53,8.6 4.08,8.25 4.66,7.93L6.89,10.16C6.15,10.5 5.44,10.91 4.8,11.4L6.6,13.8C7.38,13.22 8.26,12.77 9.2,12.47L11.75,15C10.5,15.07 9.34,15.5 8.4,16.2L12,21L14.46,17.73L17.74,21L19,19.72M12,3C9.85,3 7.8,3.38 5.9,4.07L8.29,6.47C9.5,6.16 10.72,6 12,6C15.38,6 18.5,7.11 21,9L22.8,6.6C19.79,4.34 16.06,3 12,3M12,9C11.62,9 11.25,9 10.88,9.05L14.07,12.25C15.29,12.53 16.43,13.07 17.4,13.8L19.2,11.4C17.2,9.89 14.7,9 12,9Z";var D5="M21 20V2H3V20H1V23H23V20M19 4V11H13V4M5 4H11V11H5M5 20V13H11V20M13 20V13H19V20Z";var N5="M21 20V2H3V20H1V23H23V20M19 4V11H17V4M5 4H7V11H5M5 20V13H7V20M9 20V4H15V20M17 20V13H19V20Z";var I5="M10 6.2C10 4.3 8.8 2.6 7 2V5.7H4V2C2.2 2.6 1 4.3 1 6.2C1 8.1 2.2 9.8 4 10.4V21.4C4 21.8 4.2 22 4.5 22H6.5C6.8 22 7 21.8 7 21.5V10.5C8.8 9.9 10 8.2 10 6.2M16 8C16 8 15.9 8 16 8C12.1 8.1 9 11.2 9 15C9 18.9 12.1 22 16 22S23 18.9 23 15 19.9 8 16 8M16 20C13.2 20 11 17.8 11 15S13.2 10 16 10 21 12.2 21 15 18.8 20 16 20M15 11V16L18.6 18.2L19.4 17L16.5 15.3V11H15Z";var $5="M22.61,19L13.53,9.91C14.46,7.57 14,4.81 12.09,2.91C9.79,0.61 6.21,0.4 3.66,2.26L7.5,6.11L6.08,7.5L2.25,3.69C0.39,6.23 0.6,9.82 2.9,12.11C4.76,13.97 7.47,14.46 9.79,13.59L18.9,22.7C19.29,23.09 19.92,23.09 20.31,22.7L22.61,20.4C23,20 23,19.39 22.61,19M19.61,20.59L10.15,11.13C9.54,11.58 8.86,11.85 8.15,11.95C6.79,12.15 5.36,11.74 4.32,10.7C3.37,9.76 2.93,8.5 3,7.26L6.09,10.35L10.33,6.11L7.24,3C8.5,2.95 9.73,3.39 10.68,4.33C11.76,5.41 12.17,6.9 11.92,8.29C11.8,9 11.5,9.66 11.04,10.25L20.5,19.7L19.61,20.59Z";var z5={alert:n2,check:_2,chevron:b2,clock:T2,counter:B2,dots:N2,error:A2,info:L5,pause:o5,play:A5,power:d5,remote:l5,stop:g5,timer:_5,water:R5,wifi:E5,wifi_off:F5,auto:d2,care:$5,brightness:l2,dishwasher:E2,door:D2,door_closed:F2,dry:o2,end_sound:m2,energy:r5,floor_light:m5,glass:C5,leaf:M5,key_tone:J2,quick:U2,rack:p2,rinse:P2,sanitize:x5,silent:P5,spray:S5,water_percent:T1,zone:T1,bake:R2,chicken:Q2,clean:s2,defrost:Z5,drawer:b5,fan:$2,fish:W2,flip:G2,fries:j2,fryer:w5,heat:z2,manual:T5,meat:K2,probe:y5,recipe:w2,reheat:b1,roast:H5,shake:v5,slow:n5,snack:Y2,star:h5,steam:p5,temperature:O5,vegetable:k2,warm:b1,ac:a2,adblue:a5,battery_car:x2,bonnet:u2,car:g2,car_door:f2,charger:I2,fuel:q2,gauge:X2,history:V5,lights:O2,lock:e5,lock_open:t5,marker:i5,motion:y2,odometer:u5,online:S2,parking:c2,range:s5,service:I5,snowflake:c5,software:B5,steering:f5,travel_time:k5,trip:Z2,trunk:v2,sunroof:h2,window_closed:D5,window_open:N5};function p(M,C="icon"){let H=z5[M]||z5.info;return`<svg class="${C}" viewBox="0 0 24 24" aria-hidden="true"><path d="${H}"></path></svg>`}var Y=`
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
`;var K3=`
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
`,W5=Y+K3;function y(M,C){if(!M)return"";let H=C?.locale?.language||C?.language||"hu",V=C?.locale?.time_format,L={hour:"2-digit",minute:"2-digit"};V==="12"&&(L.hour12=!0),V==="24"&&(L.hour12=!1);try{return new Intl.DateTimeFormat(H,L).format(M)}catch{return M.toTimeString().slice(0,5)}}function j(M,C){if(M==null)return null;let H=Math.max(0,Math.round(M));if(H<60)return{value:String(H),unit:C("ui.minute_short")};let V=Math.floor(H/60),L=H%60;return{value:`${V}:${String(L).padStart(2,"0")}`,unit:C("ui.hour_short")}}function U(M,C){let H=j(M,C);return H?`${H.value} ${H.unit}`:""}function B1(M){if(M==null)return null;let C=Math.max(0,Math.round(M)),H=Math.floor(C/60),V=C%60;return H?`${H}:${String(V).padStart(2,"0")}`:`0:${String(V).padStart(2,"0")}`}function H1(M,C=1){return M==null||!Number.isFinite(M)?"\u2013":M.toFixed(C).replace(/\.0$/,"")}function a(M){return String(M??"").replace(/[&<>"']/g,C=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[C])}var R1={language:"auto",compact:!1,animate:!0,show_programs:!0,show_options:!0,show_delay:!0,show_scores:!0,show_consumption:!0,show_details:!0,show_controls:!0,show_appliance_settings:!0},Y3=[A.IDLE,A.READY_TO_START],U5=[A.IDLE,A.READY_TO_START],P1=class extends HTMLElement{static getConfigElement(){return document.createElement(C1)}static getStubConfig(C){let H=l1(C);return{type:`custom:${R}`,device:H[0]?.id}}constructor(){super(),this.attachShadow({mode:"open"}),this._sections={},this._signatures={},this._built=!1}setConfig(C){this._config={...R1,...C||{}},this._signatures={},this._hass&&this._render()}set hass(C){this._hass=C,this._render()}get hass(){return this._hass}connectedCallback(){this._timer=window.setInterval(()=>this._render(),3e4)}disconnectedCallback(){this._timer&&window.clearInterval(this._timer),this._timer=void 0}getCardSize(){return this._config?.compact?5:9}getGridOptions(){return{columns:12,min_columns:6,rows:this._config?.compact?6:"auto"}}_build(){let C=document.createElement("style");C.textContent=W5;let H=document.createElement("ha-card"),V=document.createElement("div");V.className="wrap",V.addEventListener("click",L=>this._onClick(L)),V.addEventListener("input",L=>this._onInput(L)),V.addEventListener("keydown",L=>this._onKeyDown(L));for(let L of["header","hero","alerts","programs","options","delay","meters","controls","appliance","details"]){let r=document.createElement("div");r.dataset.section=L,this._sections[L]=r,V.appendChild(r)}H.appendChild(V),this.shadowRoot.replaceChildren(C,H),this._card=H,this._wrap=V,this._built=!0}_render(){if(!this._hass||!this._config)return;this._built||this._build();let C=A1(this._config,this._hass),H=n1(C);this._t=H;let V=r2(this._hass,this._config);if(this._model=V,!V.ok){this._renderEmpty(V,H);return}this._emptyShown=!1,this._applyHostClasses(V),this._section("header",this._headerHtml(V,H)),this._heroSection(V,H),this._section("alerts",this._alertsHtml(V,H)),this._section("programs",this._config.show_programs?this._programsHtml(V,H):""),this._section("options",this._config.show_options?this._optionsHtml(V,H):""),this._section("delay",this._config.show_delay?this._delayHtml(V,H):""),this._section("meters",this._metersHtml(V,H)),this._section("controls",this._config.show_controls?this._controlsHtml(V,H):""),this._section("appliance",this._config.show_appliance_settings?this._applianceSettingsHtml(V,H):""),this._section("details",this._config.show_details?this._detailsHtml(V,H):"")}_renderEmpty(C,H){if(this._emptyShown!==C.reason){this._emptyShown=C.reason,this._signatures={};for(let V of Object.values(this._sections))V.innerHTML="";this._sections.header.innerHTML=`
      <div class="empty">
        ${p("dishwasher")}
        <div>${a(H(`ui.${C.reason}`))}</div>
      </div>`}}_section(C,H){this._signatures[C]!==H&&(this._signatures[C]=H,this._sections[C].innerHTML=H,this._sections[C].hidden=!H,C==="delay"&&this._restoreReadyBy())}_applyHostClasses(C){let H=["wrap"];this._config.compact&&H.push("compact"),this._config.animate||H.push("no-animation"),H.push(`accent-${C.accent}`),C.state===A.RUNNING&&H.push("running","busy"),C.state===A.PAUSED&&H.push("paused"),C.state===A.END_OF_CYCLE&&H.push("done"),C.state===A.OFF&&H.push("off"),(C.state===A.ALARM||C.alerts.some(L=>_1[L]==="error"))&&H.push("alarm"),C.step==="DRYING"&&H.push("phase-drying"),C.doorOpen&&H.push("door-open");let V=H.join(" ");this._wrap.className!==V&&(this._wrap.className=V)}_headerHtml(C,H){let V=a(C.name||H("card_name")),L=[A.IDLE,A.READY_TO_START].includes(C.state)?this._cycleMinutes(C):S[C.program]?.duration,r=C.state===A.OFF?"":C.program&&L?`${H(`program.${C.program}`)} \xB7 ${U(L,H)}`:C.programRaw||"",e=[];return C.online?C.linkQuality&&e.push(`<span title="${H("ui.wifi")}: ${C.linkQuality}">${p("wifi")}</span>`):e.push(`<span class="bad" title="${H("ui.offline")}">${p("wifi_off")}</span>`),C.doorOpen&&e.push(`<span class="bad" title="${H("ui.door_open")}">${p("door")}</span>`),C.ecoMode&&e.push(`<span title="${H("ui.eco_mode")}">${p("leaf")}</span>`),`
      <div class="header">
        <div>
          <div class="title" data-action="more-info">${V}</div>
          ${r?`<div class="sub">${a(r)}</div>`:""}
        </div>
        <div class="spacer"></div>
        <div class="badges">${e.join("")}</div>
        <div class="pill">${p(this._stateIcon(C))}${a(H(`state.${C.state}`))}</div>
      </div>`}_stateIcon(C){switch(C.state){case A.RUNNING:return"water";case A.PAUSED:return"pause";case A.END_OF_CYCLE:return"check";case A.DELAYED_START:return"timer";case A.ALARM:return"error";case A.READY_TO_START:return"play";default:return"power"}}_heroSection(C,H){this._sections.hero.querySelector(".machine")||(this._sections.hero.innerHTML=`
        <div class="hero">
          <div class="machine-wrap" data-action="more-info">${t2()}</div>
          <div class="status"></div>
        </div>`,this._statusNode=this._sections.hero.querySelector(".status"));let V=this._statusHtml(C,H);this._signatures.status!==V&&(this._signatures.status=V,this._statusNode.innerHTML=V),i2(this._sections.hero,this._displayText(C,H))}_displayText(C,H){return C.state===A.OFF?"":C.state===A.DELAYED_START&&C.delay?B1(C.delay):C.remaining!==null&&[A.RUNNING,A.PAUSED,A.DELAYED_START].includes(C.state)?B1(C.remaining):C.state===A.END_OF_CYCLE?"0:00":C.program?H(`program.${C.program}`).slice(0,8):"--:--"}_statusHtml(C,H){let V=[],L=C.state===A.RUNNING&&C.phase!=="UNAVAILABLE"?`<span class="phase-text">${a(H(`phase_long.${C.phase}`))}</span>`:"";V.push(`
      <div class="status-line">
        <span class="state-text">${a(H(`state.${C.state}`))}</span>
        ${L}
      </div>`),C.program&&C.state!==A.OFF&&V.push(`
        <div class="program-line">
          ${p(S[C.program]?.icon||"dishwasher")}
          <span>${a(H(`program.${C.program}`))}</span>
        </div>`);let r=this._countdownHtml(C,H);return r&&V.push(r),[A.RUNNING,A.PAUSED,A.END_OF_CYCLE].includes(C.state)&&(V.push(`<div class="bar"><i style="width:${Math.round(C.progress*100)}%"></i></div>`),V.push(this._timelineHtml(C,H))),V.join("")}_cycleMinutes(C){let H=S[C.program]?.duration??null,V=C.remaining!==null&&C.remaining>0?C.remaining:null;if(![A.IDLE,A.READY_TO_START].includes(C.state))return V??H;let L=this._durationTrack;return L?L.program!==C.program?this._durationTrack={program:C.program,reported:V,stale:!0}:L.stale&&V!==L.reported&&(L.stale=!1):this._durationTrack={program:C.program,reported:V,stale:!1},this._durationTrack.stale?H??V:V??H}_countdownHtml(C,H){if(C.state===A.END_OF_CYCLE)return`<div class="countdown"><span class="at">${p("check")}${a(H("ui.finished_hint"))}</span></div>`;if(C.state===A.DELAYED_START){let V=j(C.delay||C.remaining,H);if(!V)return"";let L=[C.startAt?`<span class="at">${p("timer")}${a(H("ui.starts_at"))} ${y(C.startAt,this._hass)}</span>`:"",C.finishAt?`<span class="at">${p("clock")}${a(H("ui.ready_at"))} ${y(C.finishAt,this._hass)}</span>`:""].join("");return`<div class="countdown"><span class="value">${V.value}</span><span class="unit">${V.unit}</span>${L}</div>`}if([A.RUNNING,A.PAUSED].includes(C.state)){let V=j(C.remaining,H);if(!V)return"";let L=C.finishAt?`<span class="at">${p("clock")}${a(H("ui.ready_at"))} ${y(C.finishAt,this._hass)}</span>`:"";return`<div class="countdown"><span class="value">${V.value}</span><span class="unit">${V.unit}</span>${L}</div>`}if([A.IDLE,A.READY_TO_START].includes(C.state)){let V=this._cycleMinutes(C),L=j(V,H);if(!L)return"";let r=C.delay?new Date(Date.now()+C.delay*6e4):null,e=new Date(Date.now()+(V+C.delay)*6e4),i=[r?`<span class="at">${p("timer")}${a(H("ui.starts_at"))} ${y(r,this._hass)}</span>`:"",`<span class="at">${p("clock")}${a(H("ui.ready_at"))} ${y(e,this._hass)}</span>`].join("");return`<div class="countdown"><span class="value">${L.value}</span><span class="unit">${L.unit}</span>${i}</div>`}if(C.state===A.OFF&&C.delay&&C.program&&S[C.program]){let V=S[C.program].duration,L=j(V,H),r=new Date(Date.now()+C.delay*6e4),e=new Date(Date.now()+(V+C.delay)*6e4);return`<div class="countdown"><span class="value">${L.value}</span><span class="unit">${L.unit}</span>
        <span class="at">${p("timer")}${a(H("ui.starts_at"))} ${y(r,this._hass)}</span>
        <span class="at">${p("clock")}${a(H("ui.ready_at"))} ${y(e,this._hass)}</span></div>`}return""}_timelineHtml(C,H){let V=S[C.program]?.steps||y1,L=C.step?V.indexOf(C.step):-1;return`<div class="timeline">${y1.map(e=>{let i=V.includes(e),t=V.indexOf(e),o="step";return i?L>=0&&t<L?o+=" done":L>=0&&t===L?o+=" active":C.state===A.END_OF_CYCLE&&(o+=" done"):o+=" skip",`<div class="${o}"><span class="dot"></span><span class="label">${a(H(`phase.${e}`))}</span></div>`}).join("")}</div>`}_alertsHtml(C,H){let V=[];C.doorOpen&&C.state!==A.OFF&&V.push({severity:"warning",text:H("ui.door_open"),iconName:"door"});for(let L of C.alerts){let{code:r,count:e}=L,t=(L.severity==="ERROR"||L.severity==="CRITICAL"?"error":"")||_1[r]||"warning",o=r?H(`alert.${r}`,`${H("alert_generic")}: ${r.replace(/^DISH_ALARM_/,"")}`):`${H("alert_generic")}: ${e}`;V.push({severity:t,text:o,iconName:t==="error"?"error":"alert"})}return C.online||V.push({severity:"error",text:H("ui.offline"),iconName:"wifi_off"}),V.length?`<div class="alerts">${V.map(L=>`<div class="alert ${L.severity}">${p(L.iconName)}<span>${a(L.text)}</span></div>`).join("")}</div>`:""}_programsHtml(C,H){if(!C.entities.program||!C.programOptions.length)return"";let V=Y3.includes(C.state)&&C.remoteEnabled,L=C.programOptions.filter(o=>S[o.key]),r=[...k1.map(o=>L.find(d=>d.key===o)).filter(Boolean),...L.filter(o=>!k1.includes(o.key))],e=C.state===A.OFF?null:C.program,i=r.map(o=>{let d=o.key===e,l=S[o.key],x=`${H(`program_hint.${o.key}`)} \xB7 ${H1(l.water)} l \xB7 ${H1(l.energy,3)} kWh \xB7 ${U(l.duration,H)}`;return`<button class="chip" type="button" data-action="program" data-value="${a(o.label)}"
        aria-pressed="${d}" title="${a(x)}" ${V?"":"disabled"}>
        ${p(l.icon)}<span>${a(H(`program.${o.key}`))}</span></button>`}),t=e?a(H(`program_hint.${e}`)):"";return`
      <div class="section">
        <div class="section-title">${a(H("ui.program"))}</div>
        <div class="chips">${i.join("")}</div>
        ${t?`<div class="note">${t}</div>`:""}
      </div>`}_optionsHtml(C,H){if(!C.options.length||C.state===A.OFF)return"";let V=U5.includes(C.state)&&C.remoteEnabled,L=C.options.filter(e=>e.supported||e.on);if(!L.length)return`
        <div class="section">
          <div class="section-title">${a(H("ui.options"))}</div>
          <div class="note">${a(H("ui.no_options"))}</div>
        </div>`;let r=L.map(e=>`<button class="chip" type="button" data-action="option" data-value="${e.entityId}"
        aria-pressed="${e.on}" title="${a(H(`option_hint.${e.key}`))}"
        ${V&&e.supported?"":"disabled"}>
        ${p(e.icon)}<span>${a(H(`option.${e.key}`))}</span></button>`);return`
      <div class="section">
        <div class="section-title">${a(H("ui.options"))}</div>
        <div class="chips">${r.join("")}</div>
      </div>`}_delayHtml(C,H){if(!C.entities.start_time)return"";let V=C.state===A.DELAYED_START||C.delay>0,L=(U5.includes(C.state)||C.state===A.DELAYED_START)&&C.remoteEnabled;if(!L&&!V)return"";let r=q1.map(d=>{let l=C.delay===d;return`<button class="chip" type="button" data-action="delay" data-value="${d}"
        aria-pressed="${l}" ${L?"":"disabled"}>
        ${p("timer")}<span>${d/60} ${a(H("ui.hour_short"))}</span></button>`});V&&r.push(`<button class="chip" type="button" data-action="delay" data-value="-1" ${L?"":"disabled"}>
        ${p("stop")}<span>${a(H("ui.delay_cancel"))}</span></button>`);let e=V?`<span class="hint">${a(U(C.delay,H))}</span>`:`<span class="hint">${a(H("ui.delay_off"))}</span>`,i=Math.min(C.delayControl?.maxMinutes??z,z),t=`
      <div class="steppers narrow">
        <div class="stepper">
          <span class="label">${a(H("ui.delay_amount"))}</span>
          <div class="row">
            <button class="step-btn" type="button" data-action="delay-step" data-dir="-1"
              ${L&&C.delay>0?"":"disabled"} aria-label="\u2212">\u2212</button>
            <span class="value">${a(C.delay?U(C.delay,H):H("ui.delay_off"))}</span>
            <button class="step-btn" type="button" data-action="delay-step" data-dir="1"
              ${L&&C.delay<i?"":"disabled"} aria-label="+">+</button>
          </div>
        </div>
        <div class="stepper" title="${a(H("ui.ready_by_hint"))}">
          <span class="label">${a(H("ui.ready_by"))}</span>
          <div class="row">
            <input class="time-input" type="time" data-action="ready-by" ${L?"":"disabled"}>
            <button class="step-btn wide" type="button" data-action="ready-by-apply"
              ${L?"":"disabled"} title="${a(H("ui.ready_by_apply"))}">
              ${p("check")}</button>
          </div>
        </div>
      </div>`,o=this._delayNotice&&Date.now()-this._delayNotice.at<2e4?`<div class="note">${p("info")}${a(this._delayNotice.text)}</div>`:"";return`
      <div class="section">
        <div class="section-title">${a(H("ui.delay"))}${e}</div>
        <div class="chips">${r.join("")}</div>
        ${t}
        ${o}
      </div>`}_scoresStale(C){let H=[C.scores.eco,C.scores.energy,C.scores.water].join("/"),V=this._scoreTrack;return V?V.program!==C.program?this._scoreTrack={program:C.program,values:H,stale:!0,since:Date.now()}:V.stale&&(H!==V.values||Date.now()-V.since>3e4)&&(V.stale=!1):this._scoreTrack={program:C.program,values:H,stale:!1,since:0},this._scoreTrack.stale}_metersHtml(C,H){if(C.state===A.OFF)return"";let V=[],{eco:L,energy:r,water:e}=C.scores,i=S[C.program]?.scores!==!1,t=this._scoresStale(C);if(this._config.show_scores&&i&&(L!==null||r!==null||e!==null)){let d=(l,x,v,s)=>{let f=Math.max(0,Math.min(7,s??0)),_=Array.from({length:7},(w,B)=>`<i class="${B<f?"on":""}"></i>`).join("");return`
          <div class="meter ${x}">
            <div class="top">${p(v)}<span>${a(H(`ui.${l}`))}</span>
              <span class="val">${s===null?"\u2013":`${s}/7`}</span></div>
            <div class="track">${_}</div>
          </div>`};V.push(`
        <div class="meters${t?" stale":""}">
          ${d("eco_score","eco","leaf",L)}
          ${d("energy_score","energy","energy",r)}
          ${d("water_score","water","water",e)}
        </div>`)}if(this._config.show_consumption&&C.program&&S[C.program]){let d=S[C.program];V.push(`
        <div class="facts">
          <span class="fact">${p("water")}<b>${H1(d.water)}</b> l</span>
          <span class="fact">${p("energy")}<b>${H1(d.energy,3)}</b> kWh</span>
          <span class="fact">${p("timer")}<b>${a(U(d.duration,H))}</b></span>
        </div>`)}if(!V.length)return"";let o=t&&i?`<span class="hint">${a(H("ui.scores_updating"))}</span>`:"";return`
      <div class="section">
        <div class="section-title">${a(H("ui.scores"))}${o}</div>
        ${V.join("")}
      </div>`}_controlsHtml(C,H){let L=(Y1[C.state]||[]).filter(e=>C.entities[`cmd_${e}`]).map(e=>{let i=j1[e],t=!C.remoteEnabled&&e!=="off"?"disabled":"";return`<button class="btn ${i.style}" type="button" data-action="command" data-value="${e}" ${t}>
          ${p(i.icon)}<span>${a(H(`command.${e}`))}</span></button>`});if(!L.length)return"";let r=C.remoteEnabled?"":`<div class="note">${p("remote")}${a(H("ui.remote_disabled_hint"))}</div>`;return`<div class="section"><div class="controls">${L.join("")}</div>${r}</div>`}_applianceSettingsHtml(C,H){let{brightness:V,floorLight:L,endSound:r,keyTone:e}=C.settings;if(!V&&!L&&!r&&!e)return"";let i=C.online&&C.remoteEnabled,t=(l,x,v,s)=>s?`<button class="chip" type="button" data-action="setting" data-value="${l}"
            aria-pressed="${s.on}" title="${a(H(`ui.${v}_hint`,""))}"
            ${i?"":"disabled"}>
            ${p(x)}<span>${a(H(`ui.${v}`))}</span>
          </button>`:"",o=[t("floor","floor_light","floor_light",L),t("sound","end_sound","end_sound",r),t("key","key_tone","key_tone",e)].filter(Boolean),d=V?`<div class="steppers narrow">
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
        ${o.length?`<div class="chips">${o.join("")}</div>`:""}
        ${d}
      </div>`}_detailsHtml(C,H){let V=[],L=(r,e,i)=>{e==null||e===""||V.push(`
        <div class="detail">
          <span class="k">${a(H(`ui.${r}`))}</span>
          <span class="v">${p(i)}${a(String(e))}</span>
        </div>`)};if(C.doorOpen!==null&&L("door",C.doorOpen?H("ui.door_open"):H("ui.door_closed"),C.doorOpen?"door":"door_closed"),C.remote){let r=C.remote.includes("TEMPORARY")?H("ui.remote_locked"):C.remoteEnabled?H("ui.remote_on"):H("ui.remote_off");L("remote",r,"remote")}if(C.linkQuality){let r=C.linkQuality.replace(/_/g," ").toLowerCase();L("wifi",r.charAt(0).toUpperCase()+r.slice(1),"wifi")}return C.cycles!==null&&L("cycles",C.cycles,"counter"),C.rinseAid!==null&&L("rinse_aid",`${C.rinseAid}/8`,"water_percent"),C.waterHardness&&L("water_hardness",C.waterHardness,"water"),V.length?`
      <div class="section">
        <div class="section-title">${a(H("ui.details"))}</div>
        <div class="details">${V.join("")}</div>
      </div>`:""}_onInput(C){let H=C.target.closest('[data-action="ready-by"]');H&&(this._readyByValue=H.value)}_onKeyDown(C){if(C.key!=="Enter")return;let H=C.target.closest('[data-action="ready-by"]');!H||H.hasAttribute("disabled")||(C.preventDefault(),this._applyReadyBy(H.value))}_applyReadyBy(C){!this._model?.ok||!/^\d{1,2}:\d{2}$/.test(C||"")||(this._readyByValue=C,this._readyBy(C,this._t),this._render())}_restoreReadyBy(){if(!this._readyByValue)return;let C=this._sections.delay?.querySelector('[data-action="ready-by"]');C&&C.value!==this._readyByValue&&(C.value=this._readyByValue)}_onClick(C){let H=C.target.closest("[data-action]");if(!H||H.hasAttribute("disabled"))return;let{action:V,value:L}=H.dataset,r=this._model;if(!(!r?.ok&&V!=="more-info"))switch(V){case"more-info":this._moreInfo(r?.entities?.appliance_state);break;case"program":this._selectProgram(L);break;case"option":this._haptic("light"),this._call("switch","toggle",{entity_id:L});break;case"command":this._haptic("medium"),this._call("button","press",{entity_id:r.entities[`cmd_${L}`]});break;case"setting":this._toggleSetting(L);break;case"brightness":this._stepBrightness(Number(H.dataset.dir));break;case"delay":this._setDelay(Number(L));break;case"delay-step":this._stepDelay(Number(H.dataset.dir));break;case"ready-by-apply":this._applyReadyBy(this._sections.delay?.querySelector('[data-action="ready-by"]')?.value);break;default:break}}_setDelay(C){let H=this._model,V=H.entities.start_time;if(!V)return;let L=H.delayControl,r;if(C<=0)r=L?L.min:-1;else{let e=L?L.seconds?L.step/60:L.step:1,i=Math.max($,e||1),t=Math.floor(C/i)*i;if(t<=0)return this._setDelay(0);r=L?.seconds?t*60:t}return this._haptic("light"),this._call("number","set_value",{entity_id:V,value:r})}_stepDelay(C){let H=this._model,V=Math.min(H.delayControl?.maxMinutes??z,z),L=Math.floor(H.delay/$)*$,r=Math.min(V,Math.max(0,L+C*$));r!==H.delay&&this._setDelay(r)}_readyBy(C,H){let V=this._model,L=/^(\d{1,2}):(\d{2})$/.exec(C||"");if(!L)return;let r=new Date;r.setSeconds(0,0);let e=new Date(r);e.setHours(Number(L[1]),Number(L[2]),0,0),e<=r&&e.setDate(e.getDate()+1);let i=this._cycleMinutes(V)||0,t=Math.round((e.getTime()-r.getTime())/6e4),o=Math.min(V.delayControl?.maxMinutes??z,z),d=Math.floor((t-i)/$)*$;if(d<=0){let l=new Date(Date.now()+i*6e4);this._delayNotice={at:Date.now(),text:`${H("ui.ready_by_too_soon")} ${y(l,this._hass)}`},d=0}else if(d>o)d=o,this._delayNotice={at:Date.now(),text:H("ui.ready_by_max")};else{let l=new Date(Date.now()+(d+i)*6e4);this._delayNotice={at:Date.now(),text:`${H("ui.ready_by_set")}: ${U(d,H)} \xB7 ${H("ui.ready_at")} ${y(l,this._hass)}`}}this._setDelay(d)}_toggleSetting(C){let H=this._model;if(this._haptic("light"),C==="key")return this._call("switch","toggle",{entity_id:H.entities.key_tone});let[V,L]=C==="floor"?["floorLight","display_on_floor"]:["endSound","end_of_cycle_sound"],r=H.settings[V];if(r)return this._call("select","select_option",{entity_id:H.entities[L],option:r.on?r.offOption:r.onOption})}_stepBrightness(C){let{brightness:H}=this._model.settings;if(!H)return;let V=H.levels.findIndex(r=>r.value===H.value),L=H.levels[(V===-1?0:V)+C];L&&(this._haptic("light"),this._call("select","select_option",{entity_id:this._model.entities.display_light,option:L.label}))}_selectProgram(C){return this._haptic("light"),this._call("select","select_option",{entity_id:this._model.entities.program,option:C})}_call(C,H,V){return V.entity_id?this._hass.callService(C,H,V):Promise.resolve()}_moreInfo(C){C&&this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:C},bubbles:!0,composed:!0}))}_haptic(C){this.dispatchEvent(new CustomEvent("haptic",{detail:C,bubbles:!0,composed:!0}))}};function G5(){customElements.get(R)||(customElements.define(R,P1),window.customCards=window.customCards||[],window.customCards.push({type:R,name:"AEG / Electrolux Dishwasher Card",description:"Rich status card for AEG and Electrolux dishwashers: phases, remaining time, programs, options and controls.",preview:!0,documentationURL:"https://github.com/gabor-io/ha-appliance-custom-card"}),console.info(`%c ${R} %c ${U1} `,"color:#fff;background:#039be5;font-weight:700;border-radius:3px 0 0 3px","color:#039be5;background:#e1f5fe;font-weight:700;border-radius:0 3px 3px 0"))}var j3=`
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
`;function q(M){return class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}setConfig(H){this._config={...H},this._render()}set hass(H){this._hass=H,this._render()}_render(){if(!this._config||!this._hass)return;let H=M.translator(M.getLanguage(this._config,this._hass)),V=M.listDevices(this._hass),L=this._config.device||"",r=[`<option value="" ${L?"":"selected"}>${a(H("editor.device_auto"))}</option>`,...V.map(t=>`<option value="${a(t.id)}" ${t.id===L?"selected":""}>${a(t.name)}</option>`)].join(""),e=[`<option value="auto">${a(H("editor.language_auto"))}</option>`,...M.languages.map(t=>`<option value="${t}" ${this._config.language===t?"selected":""}>${t.toUpperCase()}</option>`)].join(""),i=M.toggles.map(t=>{let o=this._config[t]??M.defaults[t]??!1;return`<label class="toggle"><input type="checkbox" data-key="${t}" ${o?"checked":""}>
            <span>${a(H(`editor.${t}`))}</span></label>`}).join("");this.shadowRoot.innerHTML=`
        <style>${j3}</style>
        <div class="form">
          <label>${a(H("editor.device"))}
            <select data-key="device">${r}</select>
          </label>
          <label>${a(H("editor.name"))}
            <input type="text" data-key="name" value="${a(this._config.name||"")}">
          </label>
          <label>${a(H("editor.language"))}
            <select data-key="language">${e}</select>
          </label>
          <div class="title">${a(H("editor.sections"))}</div>
          <div class="toggles">${i}</div>
        </div>`,this.shadowRoot.querySelectorAll("[data-key]").forEach(t=>t.addEventListener("change",o=>this._onChange(o)))}_onChange(H){let V=H.target,L=V.dataset.key,r={...this._config,type:this._config.type||`custom:${M.cardName}`};V.type==="checkbox"?r[L]=V.checked:V.value===""?delete r[L]:r[L]=V.value,this._config=r,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:r},bubbles:!0,composed:!0}))}}}var q3=q({cardName:R,toggles:["show_programs","show_options","show_delay","show_scores","show_consumption","show_appliance_settings","show_details","show_controls","compact","animate"],defaults:R1,listDevices:l1,getLanguage:A1,translator:n1,languages:w1});function Q5(){customElements.get(C1)||customElements.define(C1,q3)}Q5();G5();var E="philips-airfryer-card",V1="philips-airfryer-card-editor",K5="1.6.0",n={STANDBY:"STANDBY",POWERSAVE:"POWERSAVE",MAINMENU:"MAINMENU",IDLE:"IDLE",SETTING:"SETTING",PARASETTING:"PARASETTING",PRECOOK:"PRECOOK",COOKING:"COOKING",PAUSE:"PAUSE",USER_ACTION:"USER_ACTION",MAINTAIN:"MAINTAIN",FINISH:"FINISH",PAIRING:"PAIRING",UNKNOWN:"UNKNOWN"},Y5={[n.STANDBY]:"idle",[n.POWERSAVE]:"idle",[n.MAINMENU]:"idle",[n.IDLE]:"ready",[n.SETTING]:"ready",[n.PARASETTING]:"ready",[n.PRECOOK]:"preheat",[n.COOKING]:"cooking",[n.PAUSE]:"paused",[n.USER_ACTION]:"paused",[n.MAINTAIN]:"warm",[n.FINISH]:"done",[n.PAIRING]:"idle",[n.UNKNOWN]:"idle"},G=[n.PRECOOK,n.COOKING,n.MAINTAIN],X=[...G,n.PAUSE,n.USER_ACTION],s1=[n.IDLE,n.SETTING,n.PARASETTING,n.MAINMENU,n.STANDBY],j5={[n.STANDBY]:["power_on"],[n.POWERSAVE]:["power_on"],[n.MAINMENU]:["start","power_off"],[n.IDLE]:["start","power_off"],[n.SETTING]:["start","power_off"],[n.PARASETTING]:["start","power_off"],[n.PRECOOK]:["pause","stop"],[n.COOKING]:["pause","stop"],[n.PAUSE]:["start","stop"],[n.USER_ACTION]:["start","stop"],[n.MAINTAIN]:["stop"],[n.FINISH]:["keep_warm","stop"],[n.PAIRING]:[],[n.UNKNOWN]:[]},v1={power_on:{icon:"power",style:"primary",entity:"power",service:["switch","turn_on"]},power_off:{icon:"power",style:"ghost",entity:"power",service:["switch","turn_off"]},start:{icon:"play",style:"primary",entity:"btn_start",service:["button","press"]},pause:{icon:"pause",style:"primary",entity:"btn_pause",service:["button","press"]},stop:{icon:"stop",style:"ghost",entity:"btn_stop",service:["button","press"]},keep_warm:{icon:"warm",style:"ghost",entity:"btn_keep_warm",service:["button","press"]}},L1={MANUAL:{icon:"manual"},AUTO_COOK:{icon:"auto"},KEEP_WARM:{icon:"warm"},RECIPE:{icon:"recipe"},NO_SELECTION:{icon:"dots"},AIR_STEAM:{icon:"steam"},AIR_STEAM_PRO:{icon:"steam"},STEAMING:{icon:"steam"},ROAST:{icon:"roast"},BAKE:{icon:"bake"},GRILL:{icon:"roast"},SLOW_COOK:{icon:"slow"},STEW:{icon:"slow"},DEFROST:{icon:"defrost"},REHEAT:{icon:"reheat"},SOUS_VIDE:{icon:"probe"},EASY_CLEAN:{icon:"clean"},USER_PRESET:{icon:"star"},FROZEN_SNACKS:{icon:"snack"},FRESH_FRIES:{icon:"fries"},CHICKEN:{icon:"chicken"},FISH:{icon:"fish"},MUFFINS_CAKE:{icon:"bake"},MEAT_CHOPS:{icon:"meat"},VEGETABLES:{icon:"vegetable"}},q5=["AIR_STEAM","AIR_STEAM_PRO","STEAMING","STEW","SLOW_COOK"],M1={temperature:{min:40,max:200,step:5},time:{min:1,max:60,step:1},probe:{min:40,max:100,step:1},airspeed:{min:1,max:2,step:1}},X5=[{food:"poultry",doneness:"done",range:"80\u201385 \xB0C"},{food:"poultry_breast",doneness:"juicy",range:"70\u201374 \xB0C"},{food:"beef",doneness:"rare",range:"45\u201350 \xB0C"},{food:"beef",doneness:"medium",range:"55\u201360 \xB0C"},{food:"beef",doneness:"well_done",range:"65\u201370 \xB0C"},{food:"pork",doneness:"done",range:"70\u201373 \xB0C"},{food:"pork_chop",doneness:"medium",range:"58\u201363 \xB0C"},{food:"fish",doneness:"translucent",range:"50\u201355 \xB0C"},{food:"potato",doneness:"well_done",range:"92\u201395 \xB0C"}],J5=[160,180,200],C3=[5,10,15,20,30];var X3={card_name:"Airfryer",status:{STANDBY:"K\xE9szenl\xE9t",POWERSAVE:"Energiatakar\xE9kos",MAINMENU:"F\u0151men\xFC",IDLE:"K\xE9sz az ind\xEDt\xE1sra",SETTING:"Be\xE1ll\xEDt\xE1s",PARASETTING:"Be\xE1ll\xEDt\xE1s",PRECOOK:"El\u0151meleg\xEDt\xE9s",COOKING:"S\xFCt\xE9s",PAUSE:"Sz\xFCneteltetve",USER_ACTION:"Beavatkoz\xE1s sz\xFCks\xE9ges",MAINTAIN:"Melegen tart\xE1s",FINISH:"Elk\xE9sz\xFClt",PAIRING:"P\xE1ros\xEDt\xE1s",UNKNOWN:"Ismeretlen"},method:{MANUAL:"Manu\xE1lis",AUTO_COOK:"Auto-Cook",KEEP_WARM:"Melegen tart\xE1s",RECIPE:"Recept",NO_SELECTION:"Nincs kiv\xE1lasztva",AIR_STEAM:"Air Steam",AIR_STEAM_PRO:"Air Steam Pro",STEAMING:"P\xE1rol\xE1s",ROAST:"S\xFCt\xE9s (roast)",BAKE:"S\xFCtem\xE9ny",GRILL:"Grill",SLOW_COOK:"Lass\xFA f\u0151z\xE9s",STEW:"P\xE1rolt \xE9tel",DEFROST:"Kiolvaszt\xE1s",REHEAT:"\xDAjrameleg\xEDt\xE9s",SOUS_VIDE:"Sous-vide",EASY_CLEAN:"Tiszt\xEDt\xE1s",USER_PRESET:"Saj\xE1t program",FROZEN_SNACKS:"Fagyasztott snack",FRESH_FRIES:"Friss has\xE1b",CHICKEN:"Csirke",FISH:"Hal",MUFFINS_CAKE:"Muffin / s\xFCtem\xE9ny",MEAT_CHOPS:"H\xFAsszeletek",VEGETABLES:"Z\xF6lds\xE9g"},method_hint:{MANUAL:"Id\u0151, h\u0151m\xE9rs\xE9klet \xE9s leveg\u0151sebess\xE9g k\xE9zzel: 40\u2013200 \xB0C, 1\u2013180 perc.",AUTO_COOK:"A g\xE9p a t\xF6lt\xE9si szint \xE9s a k\xEDv\xE1nt elk\xE9sz\xFClts\xE9g alapj\xE1n sz\xE1mol mindent.",KEEP_WARM:"A k\xE9sz \xE9tel melegen tart\xE1sa.",RECIPE:"A NutriU alkalmaz\xE1sb\xF3l k\xFCld\xF6tt recept l\xE9p\xE9sei."},command:{power_on:"Bekapcsol\xE1s",power_off:"Kikapcsol\xE1s",start:"Ind\xEDt\xE1s",pause:"Sz\xFCnet",stop:"Le\xE1ll\xEDt\xE1s",keep_warm:"Melegen tart\xE1s"},alert:{drawer_open:"A fi\xF3k nyitva \u2013 a s\xFCt\xE9s sz\xFCnetel",drawer_open_idle:"A fi\xF3k nyitva van",shake:"R\xE1zd meg az \xE9telt!",flip:"Ford\xEDtsd meg az \xE9telt!",probe_required:"Ehhez a programhoz be kell dugni az \xE9telh\u0151m\xE9r\u0151t",probe_unplugged:"Az \xE9telh\u0151m\xE9r\u0151 nincs csatlakoztatva",resting:"Pihentet\xE9s \u2013 hagyd m\xE9g a k\xE9sz\xFCl\xE9kben",error:"Hibak\xF3d",user_action:"A k\xE9sz\xFCl\xE9k beavatkoz\xE1sra v\xE1r"},ui:{remaining:"H\xE1tral\xE9v\u0151 id\u0151",ready_at:"K\xE9sz",temperature:"H\u0151m\xE9rs\xE9klet",current_temp:"Aktu\xE1lis",target_temp:"C\xE9l",probe:"\xC9telh\u0151m\xE9r\u0151",probe_core:"Magh\u0151m\xE9rs\xE9klet",method:"\xC9telk\xE9sz\xEDt\xE9si m\xF3d",presets:"Saj\xE1t programok",autocook:"Auto-Cook program",recipe:"Recept",settings:"Be\xE1ll\xEDt\xE1sok",cook_time:"S\xFCt\xE9si id\u0151",airspeed:"Leveg\u0151sebess\xE9g",airspeed_low:"Alacsony",airspeed_high:"Magas",preheat:"El\u0151meleg\xEDt\xE9s",keep_warm:"Melegen tart\xE1s",details:"R\xE9szletek",drawer:"Fi\xF3k",drawer_open:"Nyitva",drawer_closed:"Z\xE1rva",total_time:"Teljes id\u0151",stage:"F\xE1zis",voltage:"Fesz\xFClts\xE9g",error_code:"Hibak\xF3d",on:"Be",off:"Ki",none:"Nincs",minute_short:"p",hour_short:"\xF3",finished:"Az \xE9tel elk\xE9sz\xFClt",finished_hint:"Kivehet\u0151",unavailable:"A k\xE9sz\xFCl\xE9k entit\xE1sai nem \xE9rhet\u0151k el",not_configured:"Nem tal\xE1lhat\xF3 Philips airfryer. Add meg a device vagy a prefix be\xE1ll\xEDt\xE1st a k\xE1rtya konfigur\xE1ci\xF3j\xE1ban.",core_temp_help:"Aj\xE1nlott magh\u0151m\xE9rs\xE9kletek",food:{poultry:"Baromfi",poultry_breast:"Baromfimell",beef:"Marha, borj\xFA, b\xE1r\xE1ny",pork:"Sert\xE9s",pork_chop:"Sert\xE9skaraj",fish:"Hal",potato:"Eg\xE9sz burgonya"},doneness:{done:"k\xE9sz",juicy:"szaftos",rare:"v\xE9res",medium:"k\xF6zepes",well_done:"j\xF3l \xE1ts\xFCtve",translucent:"\xE1ttetsz\u0151"}},editor:{device:"K\xE9sz\xFCl\xE9k",device_auto:"Automatikus felismer\xE9s",name:"N\xE9v",language:"Nyelv",language_auto:"Automatikus (HA nyelve)",sections:"Megjelen\xEDtett r\xE9szek",show_methods:"\xC9telk\xE9sz\xEDt\xE9si m\xF3dok",show_presets:"Saj\xE1t programok",show_settings:"H\u0151m\xE9rs\xE9klet \xE9s id\u0151 \xE1ll\xEDt\xE1sa",show_probe:"\xC9telh\u0151m\xE9r\u0151",show_details:"R\xE9szletek",show_controls:"Vez\xE9rl\u0151gombok",compact:"Kompakt n\xE9zet",animate:"Anim\xE1ci\xF3k"}},J3={card_name:"Airfryer",status:{STANDBY:"Standby",POWERSAVE:"Power save",MAINMENU:"Main menu",IDLE:"Ready to start",SETTING:"Setting up",PARASETTING:"Setting up",PRECOOK:"Preheating",COOKING:"Cooking",PAUSE:"Paused",USER_ACTION:"Action needed",MAINTAIN:"Keeping warm",FINISH:"Finished",PAIRING:"Pairing",UNKNOWN:"Unknown"},method:{MANUAL:"Manual",AUTO_COOK:"Auto-Cook",KEEP_WARM:"Keep warm",RECIPE:"Recipe",NO_SELECTION:"No selection",AIR_STEAM:"Air Steam",AIR_STEAM_PRO:"Air Steam Pro",STEAMING:"Steaming",ROAST:"Roast",BAKE:"Bake",GRILL:"Grill",SLOW_COOK:"Slow cook",STEW:"Stew",DEFROST:"Defrost",REHEAT:"Reheat",SOUS_VIDE:"Sous-vide",EASY_CLEAN:"Easy clean",USER_PRESET:"My preset",FROZEN_SNACKS:"Frozen snacks",FRESH_FRIES:"Fresh fries",CHICKEN:"Chicken",FISH:"Fish",MUFFINS_CAKE:"Muffins / cake",MEAT_CHOPS:"Meat chops",VEGETABLES:"Vegetables"},method_hint:{MANUAL:"Set time, temperature and air speed yourself: 40\u2013200 \xB0C, 1\u2013180 min.",AUTO_COOK:"The appliance works out every parameter from load and doneness.",KEEP_WARM:"Keeps finished food warm.",RECIPE:"Steps of a recipe sent from the NutriU app."},command:{power_on:"Turn on",power_off:"Turn off",start:"Start",pause:"Pause",stop:"Stop",keep_warm:"Keep warm"},alert:{drawer_open:"Drawer is open \u2013 cooking is paused",drawer_open_idle:"The drawer is open",shake:"Shake the food!",flip:"Flip the food!",probe_required:"This program needs the food probe plugged in",probe_unplugged:"The food probe is unplugged",resting:"Resting \u2013 leave the food inside",error:"Error code",user_action:"The appliance is waiting for you"},ui:{remaining:"Remaining",ready_at:"Ready at",temperature:"Temperature",current_temp:"Current",target_temp:"Target",probe:"Food probe",probe_core:"Core temperature",method:"Cooking method",presets:"My presets",autocook:"Auto-Cook program",recipe:"Recipe",settings:"Settings",cook_time:"Cook time",airspeed:"Air speed",airspeed_low:"Low",airspeed_high:"High",preheat:"Preheat",keep_warm:"Keep warm",details:"Details",drawer:"Drawer",drawer_open:"Open",drawer_closed:"Closed",total_time:"Total time",stage:"Stage",voltage:"Voltage",error_code:"Error code",on:"On",off:"Off",none:"None",minute_short:"m",hour_short:"h",finished:"The food is ready",finished_hint:"Ready to serve",unavailable:"The appliance entities are unavailable",not_configured:"No Philips airfryer found. Set the device or prefix option in the card configuration.",core_temp_help:"Recommended core temperatures",food:{poultry:"Poultry",poultry_breast:"Poultry breast",beef:"Beef, veal, lamb",pork:"Pork",pork_chop:"Pork chop",fish:"Fish",potato:"Whole potato"},doneness:{done:"done",juicy:"juicy",rare:"rare",medium:"medium",well_done:"well done",translucent:"translucent"}},editor:{device:"Device",device_auto:"Auto detect",name:"Name",language:"Language",language_auto:"Automatic (HA language)",sections:"Visible sections",show_methods:"Cooking methods",show_presets:"My presets",show_settings:"Temperature and time controls",show_probe:"Food probe",show_details:"Details",show_controls:"Control buttons",compact:"Compact layout",animate:"Animations"}},H3={hu:X3,en:J3},E1=Object.keys(H3);function x1(M,C){return Q(M,C,E1)}function c1(M){return K(H3,M)}var V3={domain:"sensor",suffix:"cooking_status",key:"status"},C0={status:["sensor","cooking_status"],target_temp:["sensor","target_temperature"],current_temp:["sensor","current_temperature"],total_time:["sensor","total_cook_time"],remaining:["sensor","time_remaining"],preset:["sensor","preset"],recipe:["sensor","recipe"],error:["sensor","error_code"],preheat_status:["sensor","preheat_status"],keep_warm_status:["sensor","keep_warm"],airspeed:["sensor","air_speed"],probe_target:["sensor","probe_temperature"],probe_current:["sensor","current_probe_temperature"],dialog:["sensor","dialog"],stage:["sensor","current_stage"],voltage:["sensor","voltage"],drawer:["binary_sensor","drawer"],shake:["binary_sensor","shake_reminder"],flip:["binary_sensor","flip_reminder"],preheat_active:["binary_sensor","preheat_active"],probe_unplugged:["binary_sensor","probe_unplugged"],probe_required:["binary_sensor","probe_required"],resting:["binary_sensor","resting"],btn_start:["button","start_cooking"],btn_pause:["button","pause"],btn_stop:["button","stop"],btn_keep_warm:["button","keep_warm"],num_temp:["number","set_temperature"],num_time:["number","set_cook_time"],num_airspeed:["number","set_air_speed"],num_probe:["number","set_probe_temperature"],num_keep_warm_time:["number","keep_warm_duration"],num_keep_warm_temp:["number","keep_warm_temperature"],sel_method:["select","cooking_method"],sel_preset:["select","my_presets"],sel_autocook:["select","autocook_program"],power:["switch","power"],sw_preheat:["switch","preheat"]};function H0(M,C){return p1(M,C,V3)}function L3(M,C){let H=H0(M,C),V=d1(M,C,C0,H);return V.prefix=H,V}function Z1(M){return m1(M,V3)}function T(M){if(Z(M))return null;let C=Number(M.state);return Number.isFinite(C)?C:null}function M3(M){let C=T(M);if(C===null||C<0)return null;let H=(M.attributes?.unit_of_measurement||"s").toLowerCase();return Math.round(H==="min"||H==="m"?C*60:H==="h"?C*3600:C)}function u1(M,C){if(!M)return null;let H=M.attributes||{};return{value:T(M),min:Number.isFinite(H.min)?H.min:C.min,max:Number.isFinite(H.max)?H.max:C.max,step:Number.isFinite(H.step)?H.step:C.step,unit:H.unit_of_measurement||""}}function r3(M){let C=M?.attributes?.options;return Array.isArray(C)?C:[]}function b(M){return M?.state==="on"}function V0(M){if(Z(M))return null;let C=String(M.state).trim();return!C||C==="0"||/^(none|no|off|ok)$/i.test(C)?null:C}function e3(M,C){let H=L3(M,C),V=N=>H[N]?M.states[H[N]]:void 0,L=V("status");if(!H.prefix||!L)return{ok:!1,reason:H.prefix?"unavailable":"not_configured",entities:H};let r=c(L.state),e=r in n?r:n.UNKNOWN,i=V("sel_method"),t=c(i?.state),o=L1[t]?t:null,d=M3(V("remaining")),l=M3(V("total_time")),x=G.includes(e),s=X.includes(e)&&d!==null&&l?Math.min(1,Math.max(0,1-d/l)):e===n.FINISH?1:0,f=T(V("current_temp")),_=T(V("target_temp")),w=V("current_temp")?.attributes?.unit_of_measurement||"\xB0C",B=V("probe_unplugged")?!b(V("probe_unplugged")):!1,g=T(V("probe_current")),P=T(V("probe_target")),m=V("drawer"),u=m?b(m):null,O=x&&d!==null&&d>0?new Date(Date.now()+d*1e3):null,J=V("recipe")?.state,a1=V("keep_warm_status")?.state,o1=V("preheat_status")?.state;return{ok:!0,entities:H,status:e,accent:Y5[e]||"idle",power:V("power")?b(V("power")):e!==n.STANDBY,method:o,methodRaw:i?.state||null,methodOptions:r3(i).map(N=>({label:N,key:c(N)})),presetOptions:r3(V("sel_preset")),presetSelected:V("sel_preset")?.state||null,autocookSelected:V("sel_autocook")?.state||null,steam:q5.includes(o),remaining:d,total:l,progress:s,finishAt:O,currentTemp:f,targetTemp:_,tempUnit:w,heating:x&&f!==null&&_?f<_-2:!1,probe:{plugged:B,required:b(V("probe_required")),current:g,target:P,progress:B&&g!==null&&P?Math.min(1,Math.max(0,g/P)):0},drawerOpen:u,shake:b(V("shake")),flip:b(V("flip")),resting:b(V("resting")),preheatActive:b(V("preheat_active")),preheatStatus:o1&&!Z(V("preheat_status"))?o1:null,preheatEnabled:V("sw_preheat")?b(V("sw_preheat")):null,keepWarm:a1&&!Z(V("keep_warm_status"))?a1:null,recipe:J&&!Z(V("recipe"))&&J!=="unknown"?J:null,stage:T(V("stage")),voltage:T(V("voltage")),error:V0(V("error")),controls:{temperature:u1(V("num_temp"),M1.temperature),time:u1(V("num_time"),M1.time),airspeed:u1(V("num_airspeed"),M1.airspeed),probe:u1(V("num_probe"),M1.probe)},airspeed:T(V("airspeed")),name:C.name||L.attributes?.friendly_name?.replace(/\s*Cooking Status$/i,"")||null}}function t3(){return`
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
  </svg>`}function i3(M,C,H){let V=M.querySelector(".display-main"),L=M.querySelector(".display-sub");V&&V.textContent!==C&&(V.textContent=C),L&&L.textContent!==H&&(L.textContent=H)}var L0=`
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
`,a3=Y+L0;var D1={language:"auto",compact:!1,animate:!0,show_methods:!0,show_presets:!0,show_settings:!0,show_probe:!0,show_details:!0,show_controls:!0};function o3(M,C){if(M==null)return null;let H=Math.max(0,Math.round(M));if(H>=3600){let r=Math.floor(H/3600),e=Math.round(H%3600/60);return{value:`${r}:${String(e).padStart(2,"0")}`,unit:C("ui.hour_short")}}let V=Math.floor(H/60),L=H%60;return{value:`${V}:${String(L).padStart(2,"0")}`,unit:C("ui.minute_short")}}var F1=class extends HTMLElement{static getConfigElement(){return document.createElement(V1)}static getStubConfig(C){let H=Z1(C);return{type:`custom:${E}`,device:H[0]?.id}}constructor(){super(),this.attachShadow({mode:"open"}),this._sections={},this._signatures={},this._built=!1}setConfig(C){this._config={...D1,...C||{}},this._signatures={},this._hass&&this._render()}set hass(C){this._hass=C,this._render()}get hass(){return this._hass}connectedCallback(){this._timer=window.setInterval(()=>this._render(),3e4)}disconnectedCallback(){this._timer&&window.clearInterval(this._timer),this._timer=void 0}getCardSize(){return this._config?.compact?5:8}getGridOptions(){return{columns:12,min_columns:6,rows:this._config?.compact?6:"auto"}}_build(){let C=document.createElement("style");C.textContent=a3;let H=document.createElement("ha-card"),V=document.createElement("div");V.className="wrap",V.addEventListener("click",L=>this._onClick(L));for(let L of["header","hero","alerts","gauges","methods","presets","settings","controls","details"]){let r=document.createElement("div");r.dataset.section=L,this._sections[L]=r,V.appendChild(r)}H.appendChild(V),this.shadowRoot.replaceChildren(C,H),this._wrap=V,this._built=!0}_render(){if(!this._hass||!this._config)return;this._built||this._build();let C=c1(x1(this._config,this._hass)),H=e3(this._hass,this._config);if(this._model=H,!H.ok){this._renderEmpty(H,C);return}this._emptyShown=!1,this._applyHostClasses(H),this._section("header",this._headerHtml(H,C)),this._heroSection(H,C),this._section("alerts",this._alertsHtml(H,C)),this._section("gauges",this._gaugesHtml(H,C)),this._section("methods",this._config.show_methods?this._methodsHtml(H,C):""),this._section("presets",this._config.show_presets?this._presetsHtml(H,C):""),this._section("settings",this._config.show_settings?this._settingsHtml(H,C):""),this._section("controls",this._config.show_controls?this._controlsHtml(H,C):""),this._section("details",this._config.show_details?this._detailsHtml(H,C):"")}_renderEmpty(C,H){if(this._emptyShown!==C.reason){this._emptyShown=C.reason,this._signatures={};for(let V of Object.values(this._sections))V.innerHTML="";this._sections.header.innerHTML=`
      <div class="empty">
        ${p("fryer")}
        <div>${a(H(`ui.${C.reason}`))}</div>
      </div>`}}_section(C,H){this._signatures[C]!==H&&(this._signatures[C]=H,this._sections[C].innerHTML=H,this._sections[C].hidden=!H)}_applyHostClasses(C){let H=["wrap"];this._config.compact&&H.push("compact"),this._config.animate||H.push("no-animation"),H.push(`accent-${C.accent}`),C.status===n.COOKING&&H.push("cooking","busy"),C.status===n.PRECOOK&&H.push("preheat","busy","heating"),C.status===n.MAINTAIN&&H.push("cooking"),(C.status===n.PAUSE||C.status===n.USER_ACTION)&&H.push("paused"),C.status===n.FINISH&&H.push("done"),[n.STANDBY,n.POWERSAVE].includes(C.status)&&H.push("off"),C.heating&&G.includes(C.status)&&H.push("heating"),C.steam&&G.includes(C.status)&&H.push("steam-mode"),C.drawerOpen&&H.push("drawer-open"),C.probe.plugged&&H.push("probe-plugged"),(C.shake||C.flip)&&H.push("shake-now");let V=H.join(" ");this._wrap.className!==V&&(this._wrap.className=V)}_headerHtml(C,H){let V=a(C.name||H("card_name")),L=C.recipe||(C.method?H(`method.${C.method}`):""),r=[];return C.drawerOpen&&r.push(`<span class="warn" title="${H("ui.drawer")}: ${H("ui.drawer_open")}">${p("drawer")}</span>`),C.probe.plugged&&r.push(`<span title="${H("ui.probe")}">${p("probe")}</span>`),C.error&&r.push(`<span class="bad" title="${H("alert.error")} ${C.error}">${p("error")}</span>`),`
      <div class="header">
        <div>
          <div class="title" data-action="more-info">${V}</div>
          ${L?`<div class="sub">${a(L)}</div>`:""}
        </div>
        <div class="spacer"></div>
        <div class="badges">${r.join("")}</div>
        <div class="pill">${p(this._statusIcon(C))}${a(H(`status.${C.status}`))}</div>
      </div>`}_statusIcon(C){switch(C.status){case n.COOKING:return"heat";case n.PRECOOK:return"temperature";case n.PAUSE:return"pause";case n.USER_ACTION:return"alert";case n.MAINTAIN:return"warm";case n.FINISH:return"check";case n.IDLE:case n.SETTING:case n.PARASETTING:return"play";default:return"power"}}_heroSection(C,H){this._sections.hero.querySelector(".fryer")||(this._sections.hero.innerHTML=`
        <div class="hero">
          <div class="fryer-wrap" data-action="more-info">${t3()}</div>
          <div class="status"></div>
        </div>`,this._statusNode=this._sections.hero.querySelector(".status"));let V=this._statusHtml(C,H);this._signatures.status!==V&&(this._signatures.status=V,this._statusNode.innerHTML=V);let L=o3(C.remaining,H),r=X.includes(C.status)&&L&&C.remaining>0;i3(this._sections.hero,C.status===n.STANDBY||C.status===n.POWERSAVE?"":r?L.value:"--:--",C.currentTemp!==null&&C.status!==n.STANDBY?`${Math.round(C.currentTemp)}\xB0`:"")}_statusHtml(C,H){let V=[],L=C.status===n.PRECOOK&&C.targetTemp?`<span class="phase-text">${Math.round(C.targetTemp)} ${a(C.tempUnit)}</span>`:C.resting?`<span class="phase-text">${a(H("alert.resting"))}</span>`:"";V.push(`
      <div class="status-line">
        <span class="state-text">${a(H(`status.${C.status}`))}</span>
        ${L}
      </div>`),(C.method||C.recipe)&&V.push(`
        <div class="program-line">
          ${p(L1[C.method]?.icon||"manual")}
          <span>${a(C.recipe||H(`method.${C.method}`))}</span>
        </div>`);let r=o3(C.remaining,H);if(X.includes(C.status)&&r&&C.remaining>0){let e=C.finishAt?`<span class="at">${p("clock")}${a(H("ui.ready_at"))} ${y(C.finishAt,this._hass)}</span>`:"";V.push(`
        <div class="countdown">
          <span class="value">${r.value}</span><span class="unit">${r.unit}</span>${e}
        </div>`)}else C.status===n.FINISH?V.push(`
        <div class="countdown">
          <span class="at">${p("check")}${a(H("ui.finished_hint"))}</span>
        </div>`):C.controls.temperature?.value&&C.controls.time?.value&&V.push(`
        <div class="countdown">
          <span class="value">${Math.round(C.controls.temperature.value)}\xB0</span>
          <span class="unit">${a(C.tempUnit.replace("\xB0",""))}</span>
          <span class="at">${p("timer")}${Math.round(C.controls.time.value)} ${a(H("ui.minute_short"))}</span>
        </div>`);return(X.includes(C.status)||C.status===n.FINISH)&&V.push(`<div class="bar"><i style="width:${Math.round(C.progress*100)}%"></i></div>`),V.join("")}_alertsHtml(C,H){let V=[];if(C.error&&V.push({severity:"error",text:`${H("alert.error")}: ${C.error}`,iconName:"error"}),C.drawerOpen){let L=G.includes(C.status);V.push({severity:L?"warning":"info",text:H(L?"alert.drawer_open":"alert.drawer_open_idle"),iconName:"drawer",pulse:L})}return C.shake&&V.push({severity:"warning",text:H("alert.shake"),iconName:"shake",pulse:!0}),C.flip&&V.push({severity:"warning",text:H("alert.flip"),iconName:"flip",pulse:!0}),C.status===n.USER_ACTION&&!C.shake&&!C.flip&&V.push({severity:"warning",text:H("alert.user_action"),iconName:"alert",pulse:!0}),C.probe.required&&!C.probe.plugged&&V.push({severity:"warning",text:H("alert.probe_required"),iconName:"probe"}),C.resting&&V.push({severity:"info",text:H("alert.resting"),iconName:"timer"}),V.length?`<div class="alerts">${V.map(L=>`<div class="alert ${L.severity}${L.pulse?" pulse":""}">${p(L.iconName)}<span>${a(L.text)}</span></div>`).join("")}</div>`:""}_gaugesHtml(C,H){let V=[],L=a(C.tempUnit);if(C.currentTemp!==null||C.targetTemp!==null){let r=C.currentTemp!==null&&C.targetTemp?Math.min(1,Math.max(0,C.currentTemp/C.targetTemp)):0,e=C.targetTemp!==null&&C.targetTemp>0?`<b>${Math.round(C.currentTemp??0)}</b> / ${Math.round(C.targetTemp)} ${L}`:`<b>${Math.round(C.currentTemp??0)}</b> ${L}`;V.push(`
        <div class="gauge heat">
          <div class="top">${p("temperature")}<span>${a(H("ui.temperature"))}</span>
            <span class="val">${e}</span></div>
          <div class="track"><i style="width:${Math.round(r*100)}%"></i></div>
        </div>`)}if(this._config.show_probe&&C.probe.plugged){let r=C.probe.target?`<b>${Math.round(C.probe.current??0)}</b> / ${Math.round(C.probe.target)} ${L}`:`<b>${Math.round(C.probe.current??0)}</b> ${L}`;V.push(`
        <div class="gauge probe">
          <div class="top">${p("probe")}<span>${a(H("ui.probe_core"))}</span>
            <span class="val">${r}</span></div>
          <div class="track"><i style="width:${Math.round(C.probe.progress*100)}%"></i></div>
        </div>`)}return V.length?`<div class="gauges">${V.join("")}</div>`:""}_methodsHtml(C,H){if(!C.entities.sel_method||!C.methodOptions.length)return"";let V=s1.includes(C.status),L=C.methodOptions.map(e=>{let i=L1[e.key],t=i?H(`method.${e.key}`):e.label,o=H(`method_hint.${e.key}`,"");return`<button class="chip" type="button" data-action="method" data-value="${a(e.label)}"
        aria-pressed="${e.key===C.method}" ${o?`title="${a(o)}"`:""}
        ${V?"":"disabled"}>
        ${p(i?.icon||"manual")}<span>${a(t)}</span></button>`}),r=C.method?a(H(`method_hint.${C.method}`,"")):"";return`
      <div class="section">
        <div class="section-title">${a(H("ui.method"))}</div>
        <div class="chips">${L.join("")}</div>
        ${r?`<div class="note">${r}</div>`:""}
      </div>`}_presetsHtml(C,H){if(!C.entities.sel_preset||!C.presetOptions.length)return"";let V=s1.includes(C.status),L=C.presetOptions.map(r=>`<button class="chip" type="button" data-action="preset" data-value="${a(r)}"
        aria-pressed="${r===C.presetSelected}" ${V?"":"disabled"}>
        ${p("star")}<span>${a(r)}</span></button>`);return`
      <div class="section">
        <div class="section-title">${a(H("ui.presets"))}</div>
        <div class="chips">${L.join("")}</div>
      </div>`}_settingsHtml(C,H){let V=s1.includes(C.status)||C.status===n.PAUSE,L=[],r=(t,o,d,l,x)=>{if(!d||!C.entities[x])return"";let v=d.value??d.min,s=V&&v>d.min,f=V&&v<d.max;return`
        <div class="stepper">
          <span class="label">${a(o)}</span>
          <div class="row">
            <button class="step-btn" type="button" data-action="step" data-value="${t}" data-dir="-1"
              ${s?"":"disabled"} aria-label="\u2212">\u2212</button>
            <span class="value">${Math.round(v)}${a(l)}</span>
            <button class="step-btn" type="button" data-action="step" data-value="${t}" data-dir="1"
              ${f?"":"disabled"} aria-label="+">+</button>
          </div>
        </div>`},e=[r("temperature",H("ui.temperature"),C.controls.temperature,` ${C.tempUnit}`,"num_temp"),r("time",H("ui.cook_time"),C.controls.time,` ${H("ui.minute_short")}`,"num_time"),C.probe.plugged?r("probe",H("ui.probe_core"),C.controls.probe,` ${C.tempUnit}`,"num_probe"):""].filter(Boolean);e.length&&L.push(`<div class="steppers">${e.join("")}</div>`);let i=[];if(C.entities.num_temp&&i.push(...J5.map(t=>`<button class="chip" type="button" data-action="set" data-value="temperature:${t}"
            aria-pressed="${Math.round(C.controls.temperature?.value??-1)===t}" ${V?"":"disabled"}>
            ${p("temperature")}<span>${t}\xB0</span></button>`)),C.entities.num_time&&i.push(...C3.filter(t=>t<=(C.controls.time?.max??60)).map(t=>`<button class="chip" type="button" data-action="set" data-value="time:${t}"
            aria-pressed="${Math.round(C.controls.time?.value??-1)===t}" ${V?"":"disabled"}>
            ${p("timer")}<span>${t} ${a(H("ui.minute_short"))}</span></button>`)),C.entities.num_airspeed){let t=C.controls.airspeed?.value;i.push(`<button class="chip" type="button" data-action="set" data-value="airspeed:1"
          aria-pressed="${t===1}" ${V?"":"disabled"}>
          ${p("fan")}<span>${a(H("ui.airspeed_low"))}</span></button>`,`<button class="chip" type="button" data-action="set" data-value="airspeed:2"
          aria-pressed="${t===2}" ${V?"":"disabled"}>
          ${p("fan")}<span>${a(H("ui.airspeed_high"))}</span></button>`)}if(i.length&&L.push(`<div class="chips">${i.join("")}</div>`),this._config.show_probe&&C.probe.plugged){let t=X5.map(o=>`<div class="row"><span>${a(H(`ui.food.${o.food}`))} \u2013 ${a(H(`ui.doneness.${o.doneness}`))}</span><b>${o.range}</b></div>`).join("");L.push(`
        <details class="core-temps">
          <summary>${a(H("ui.core_temp_help"))}</summary>
          ${t}
        </details>`)}return L.length?`
      <div class="section">
        <div class="section-title">${a(H("ui.settings"))}</div>
        ${L.join("")}
      </div>`:""}_controlsHtml(C,H){let L=(j5[C.status]||[]).filter(e=>C.entities[v1[e].entity]).map(e=>{let i=v1[e],t=C.drawerOpen&&["start"].includes(e);return`<button class="btn ${i.style}" type="button" data-action="command" data-value="${e}"
          ${t?"disabled":""}>
          ${p(i.icon)}<span>${a(H(`command.${e}`))}</span></button>`});if(!L.length)return"";let r=C.drawerOpen?`<div class="note">${p("drawer")}${a(H("alert.drawer_open_idle"))}</div>`:"";return`<div class="section"><div class="controls">${L.join("")}</div>${r}</div>`}_detailsHtml(C,H){let V=[],L=(r,e,i)=>{e==null||e===""||V.push(`
        <div class="detail">
          <span class="k">${a(H(`ui.${r}`))}</span>
          <span class="v">${p(i)}${a(String(e))}</span>
        </div>`)};return C.drawerOpen!==null&&L("drawer",C.drawerOpen?H("ui.drawer_open"):H("ui.drawer_closed"),"drawer"),C.airspeed!==null&&L("airspeed",C.airspeed>=2?H("ui.airspeed_high"):H("ui.airspeed_low"),"fan"),C.total&&L("total_time",`${Math.round(C.total/60)} ${H("ui.minute_short")}`,"timer"),C.preheatEnabled!==null?L("preheat",C.preheatEnabled?H("ui.on"):H("ui.off"),"temperature"):C.preheatStatus&&L("preheat",this._onOff(C.preheatStatus,H),"temperature"),C.keepWarm&&L("keep_warm",this._onOff(C.keepWarm,H),"warm"),C.stage&&L("stage",C.stage,"info"),C.voltage!==null&&L("voltage",`${C.voltage} V`,"info"),C.error&&L("error_code",C.error,"error"),V.length?`
      <div class="section">
        <div class="section-title">${a(H("ui.details"))}</div>
        <div class="details">${V.join("")}</div>
      </div>`:""}_onOff(C,H){let V=String(C).toLowerCase();return["on","true","yes","1"].includes(V)?H("ui.on"):["off","false","no","0"].includes(V)?H("ui.off"):C}_onClick(C){let H=C.target.closest("[data-action]");if(!H||H.hasAttribute("disabled"))return;let{action:V,value:L,dir:r}=H.dataset,e=this._model;if(!(!e?.ok&&V!=="more-info"))switch(V){case"more-info":this._moreInfo(e?.entities?.status);break;case"method":this._haptic("light"),this._call("select","select_option",{entity_id:e.entities.sel_method,option:L});break;case"preset":this._haptic("light"),this._call("select","select_option",{entity_id:e.entities.sel_preset,option:L});break;case"step":this._step(L,Number(r));break;case"set":{let[i,t]=L.split(":");this._setControl(i,Number(t));break}case"command":{let i=v1[L];this._haptic("medium"),this._call(i.service[0],i.service[1],{entity_id:e.entities[i.entity]});break}default:break}}_controlEntity(C){return{temperature:"num_temp",time:"num_time",probe:"num_probe",airspeed:"num_airspeed"}[C]}_step(C,H){let V=this._model.controls[C];if(!V)return;let L=V.value??V.min,r=Math.min(V.max,Math.max(V.min,L+H*V.step));r!==L&&this._setControl(C,r)}_setControl(C,H){let V=this._model.entities[this._controlEntity(C)];if(!V)return;let L=this._model.controls[C],r=L?Math.min(L.max,Math.max(L.min,H)):H;this._haptic("light"),this._call("number","set_value",{entity_id:V,value:r})}_call(C,H,V){return V.entity_id?this._hass.callService(C,H,V):Promise.resolve()}_moreInfo(C){C&&this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:C},bubbles:!0,composed:!0}))}_haptic(C){this.dispatchEvent(new CustomEvent("haptic",{detail:C,bubbles:!0,composed:!0}))}};function A3(){customElements.get(E)||(customElements.define(E,F1),window.customCards=window.customCards||[],window.customCards.push({type:E,name:"Philips Airfryer Card",description:"Rich status card for Philips airfryers: cooking status, drawer, temperature, probe, timers and controls.",preview:!0,documentationURL:"https://github.com/gabor-io/ha-appliance-custom-card"}),console.info(`%c ${E} %c ${K5} `,"color:#fff;background:#f4511e;font-weight:700;border-radius:3px 0 0 3px","color:#f4511e;background:#fbe9e7;font-weight:700;border-radius:0 3px 3px 0"))}var M0=q({cardName:E,toggles:["show_methods","show_presets","show_settings","show_probe","show_details","show_controls","compact","animate"],defaults:D1,listDevices:Z1,getLanguage:x1,translator:c1,languages:E1});function n3(){customElements.get(V1)||customElements.define(V1,M0)}n3();A3();var F="skoda-car-card",r1="skoda-car-card-editor",p3="1.6.0",d3=["front_left","front_right","rear_left","rear_right"],N1={front_left:"fl",front_right:"fr",rear_left:"rl",rear_right:"rr"};var m3=["fuel_level","gas_level","battery_percentage"],l3=["range","combustion_range","electric_range","gas_range"],s3=[["last_trip_mileage","range"],["last_trip_travel_time","travel_time"],["last_trip_average_speed","gauge"],["last_trip_average_fuel_consumption","fuel"],["last_trip_average_electric_consumption","charger"],["overall_mileage","odometer"],["overall_travel_time","travel_time"],["overall_average_speed","gauge"],["overall_average_fuel_consumption","fuel"],["overall_average_electric_consumption","charger"]],v3=[["inspection","service"],["inspection_in_km","service"],["oil_service_in_days","adblue"],["oil_service_in_km","adblue"],["software_version","software"]],x3=[["car_captured","history"],["operation","info"],["service_event","info"],["camping_mode_ends_at","ac"]],c3=[["charging_state","charger"],["charging_power","charger"],["charging_rate","charger"],["remaining_charging_time","travel_time"],["target_battery_percentage","battery_car"],["electric_range","range"]];var r0={card_name:"Aut\xF3",status:{parked:"Parkol",moving:"\xDAton",offline:"Nem el\xE9rhet\u0151",charging:"T\xF6lt\xE9s"},opening:{door_front_left:"Bal els\u0151 ajt\xF3",door_front_right:"Jobb els\u0151 ajt\xF3",door_rear_left:"Bal h\xE1ts\xF3 ajt\xF3",door_rear_right:"Jobb h\xE1ts\xF3 ajt\xF3",window_front_left:"Bal els\u0151 ablak",window_front_right:"Jobb els\u0151 ablak",window_rear_left:"Bal h\xE1ts\xF3 ablak",window_rear_right:"Jobb h\xE1ts\xF3 ablak",trunk:"Csomagtart\xF3",bonnet:"Motorh\xE1ztet\u0151",sunroof:"Tet\u0151ablak"},state:{open:"nyitva",closed:"z\xE1rva",lowered:"leh\xFAzva",up:"felh\xFAzva",on:"be",off:"ki",locked:"Z\xE1rva",unlocked:"Nyitva",unknown:"ismeretlen",none:"nincs"},alert:{door_open:"{name} nyitva",doors_open:"{count} ajt\xF3 nyitva",window_open:"{name} leh\xFAzva",windows_open:"{count} ablak leh\xFAzva",trunk_open:"Csomagtart\xF3 nyitva",bonnet_open:"Motorh\xE1ztet\u0151 nyitva",sunroof_open:"Tet\u0151ablak nyitva",lights_on:"Parkol\xF3f\xE9ny \xE9g",unlocked:"Az aut\xF3 nincs lez\xE1rva",all_closed:"Minden ny\xEDl\xE1sz\xE1r\xF3 z\xE1rva",offline:"Az aut\xF3 nem el\xE9rhet\u0151 (alszik vagy nincs t\xE9rer\u0151)"},section:{openings:"Ny\xEDl\xE1sz\xE1r\xF3k",drive:"Menetadatok",trip:"Utak",service:"Szerviz",charging:"T\xF6lt\xE9s",climate:"Kl\xEDma",system:"Poz\xEDci\xF3 \xE9s rendszer",extra:"Tov\xE1bbi entit\xE1sok"},ui:{range:"Hat\xF3t\xE1v",fuel:"\xDCzemanyag",level:"T\xF6lt\xF6tts\xE9g",odometer:"Km \xF3ra",outside:"K\xFCls\u0151 h\u0151m\xE9rs\xE9klet",adblue:"AdBlue hat\xF3t\xE1v",doors:"Ajt\xF3k",windows:"Ablakok",position:"Hely",last_update:"Utols\xF3 adat",updated:"Friss\xEDtve",not_configured:"Nem tal\xE1lhat\xF3 MySkoda aut\xF3. V\xE1laszd ki az eszk\xF6zt a k\xE1rtya be\xE1ll\xEDt\xE1saiban.",unavailable:"Az aut\xF3 entit\xE1sai nem \xE9rhet\u0151k el.",in_motion:"Mozg\xE1sban",reachable:"Online",not_reachable:"Offline",battery_protection:"Akkumul\xE1tor-v\xE9delem",lights:"Parkol\xF3f\xE9ny",charging_plug:"Csatlakoztatva",climate_state:"Kl\xEDma",target_temp:"C\xE9l h\u0151m\xE9rs\xE9klet",current_temp:"Bels\u0151 h\u0151m\xE9rs\xE9klet",read_only:"Csak \xE1llapotjelz\xE9s \u2013 a k\xE1rtya nem vez\xE9rli az aut\xF3t."},entity:{mileage:"Km \xF3ra",range:"Hat\xF3t\xE1v",combustion_range:"Hat\xF3t\xE1v (\xFCzemanyag)",electric_range:"Hat\xF3t\xE1v (elektromos)",gas_range:"Hat\xF3t\xE1v (g\xE1z)",fuel_level:"Tankszint",gas_level:"G\xE1zszint",battery_percentage:"Akkumul\xE1tor",adblue_range:"AdBlue hat\xF3t\xE1v",outside_temperature:"K\xFCls\u0151 h\u0151m\xE9rs\xE9klet",inspection:"K\xF6vetkez\u0151 vizsga",inspection_in_km:"Vizsg\xE1ig h\xE1tral\xE9v\u0151 t\xE1v",oil_service_in_days:"Olajcser\xE9ig",oil_service_in_km:"Olajcser\xE9ig h\xE1tral\xE9v\u0151 t\xE1v",software_version:"Szoftver verzi\xF3",car_captured:"Utols\xF3 adat",operation:"Utols\xF3 m\u0171velet",service_event:"Utols\xF3 szervizesem\xE9ny",camping_mode_ends_at:"Camping m\xF3d v\xE9ge",last_trip_mileage:"Utols\xF3 \xFAt \u2013 t\xE1v",last_trip_travel_time:"Utols\xF3 \xFAt \u2013 id\u0151",last_trip_average_speed:"Utols\xF3 \xFAt \u2013 \xE1tlagsebess\xE9g",last_trip_average_fuel_consumption:"Utols\xF3 \xFAt \u2013 fogyaszt\xE1s",last_trip_average_electric_consumption:"Utols\xF3 \xFAt \u2013 fogyaszt\xE1s (el.)",overall_mileage:"\xD6sszesen \u2013 t\xE1v",overall_travel_time:"\xD6sszesen \u2013 id\u0151",overall_average_speed:"\xD6sszesen \u2013 \xE1tlagsebess\xE9g",overall_average_fuel_consumption:"\xD6sszesen \u2013 fogyaszt\xE1s",overall_average_electric_consumption:"\xD6sszesen \u2013 fogyaszt\xE1s (el.)",charging_state:"T\xF6lt\xE9s \xE1llapota",charging_power:"T\xF6lt\xE9si teljes\xEDtm\xE9ny",charging_rate:"T\xF6lt\xE9si sebess\xE9g",charge_type:"T\xF6lt\xE9s t\xEDpusa",remaining_charging_time:"H\xE1tral\xE9v\u0151 t\xF6lt\xE9si id\u0151",target_battery_percentage:"C\xE9l t\xF6lt\xF6tts\xE9g"},editor:{device:"Eszk\xF6z",device_auto:"Automatikus felismer\xE9s",name:"N\xE9v",language:"Nyelv",language_auto:"Automatikus (HA nyelve)",sections:"L\xE1that\xF3 szekci\xF3k",show_alerts:"Figyelmeztet\xE9sek",show_drive:"Menetadatok",show_trip:"Utak",show_service:"Szerviz",show_charging:"T\xF6lt\xE9s",show_climate:"Kl\xEDma",show_system:"Poz\xEDci\xF3 \xE9s rendszer",show_extra:"Tov\xE1bbi entit\xE1sok",compact:"Kompakt elrendez\xE9s",animate:"Anim\xE1ci\xF3k"}},e0={card_name:"Car",status:{parked:"Parked",moving:"Driving",offline:"Not reachable",charging:"Charging"},opening:{door_front_left:"Front left door",door_front_right:"Front right door",door_rear_left:"Rear left door",door_rear_right:"Rear right door",window_front_left:"Front left window",window_front_right:"Front right window",window_rear_left:"Rear left window",window_rear_right:"Rear right window",trunk:"Trunk",bonnet:"Bonnet",sunroof:"Sunroof"},state:{open:"open",closed:"closed",lowered:"open",up:"closed",on:"on",off:"off",locked:"Locked",unlocked:"Unlocked",unknown:"unknown",none:"not fitted"},alert:{door_open:"{name} is open",doors_open:"{count} doors are open",window_open:"{name} is open",windows_open:"{count} windows are open",trunk_open:"Trunk is open",bonnet_open:"Bonnet is open",sunroof_open:"Sunroof is open",lights_on:"Parking lights are on",unlocked:"The car is not locked",all_closed:"Everything is closed",offline:"The car is not reachable (asleep or out of coverage)"},section:{openings:"Openings",drive:"Drive data",trip:"Trips",service:"Service",charging:"Charging",climate:"Climate",system:"Position and system",extra:"Other entities"},ui:{range:"Range",fuel:"Fuel",level:"Level",odometer:"Odometer",outside:"Outside temperature",adblue:"AdBlue range",doors:"Doors",windows:"Windows",position:"Location",last_update:"Last update",updated:"Updated",not_configured:"No MySkoda vehicle found. Pick the device in the card settings.",unavailable:"The vehicle entities are unavailable.",in_motion:"In motion",reachable:"Online",not_reachable:"Offline",battery_protection:"Battery protection",lights:"Parking lights",charging_plug:"Plugged in",climate_state:"Air conditioning",target_temp:"Target temperature",current_temp:"Cabin temperature",read_only:"Status only - this card never controls the car."},entity:{mileage:"Odometer",range:"Range",combustion_range:"Range (fuel)",electric_range:"Range (electric)",gas_range:"Range (gas)",fuel_level:"Fuel level",gas_level:"Gas level",battery_percentage:"Battery",adblue_range:"AdBlue range",outside_temperature:"Outside temperature",inspection:"Next inspection",inspection_in_km:"Inspection in",oil_service_in_days:"Oil service in",oil_service_in_km:"Oil service in",software_version:"Software version",car_captured:"Last update",operation:"Last operation",service_event:"Last service event",camping_mode_ends_at:"Camping mode ends",last_trip_mileage:"Last trip - distance",last_trip_travel_time:"Last trip - time",last_trip_average_speed:"Last trip - average speed",last_trip_average_fuel_consumption:"Last trip - consumption",last_trip_average_electric_consumption:"Last trip - consumption (el.)",overall_mileage:"Overall - distance",overall_travel_time:"Overall - time",overall_average_speed:"Overall - average speed",overall_average_fuel_consumption:"Overall - consumption",overall_average_electric_consumption:"Overall - consumption (el.)",charging_state:"Charging state",charging_power:"Charging power",charging_rate:"Charging rate",charge_type:"Charge type",remaining_charging_time:"Remaining charging time",target_battery_percentage:"Target battery level"},editor:{device:"Device",device_auto:"Auto detect",name:"Name",language:"Language",language_auto:"Automatic (HA language)",sections:"Visible sections",show_alerts:"Alerts",show_drive:"Drive data",show_trip:"Trips",show_service:"Service",show_charging:"Charging",show_climate:"Climate",show_system:"Position and system",show_extra:"Other entities",compact:"Compact layout",animate:"Animations"}},Z3={hu:r0,en:e0},I1=Object.keys(Z3);function S1(M,C){return Q(M,C,I1)}function h1(M){return K(Z3,M)}var f1="myskoda",t0={lock_vehicle:["binary_sensor","vehicle_lock","vehicle_locked"],lock_doors:["binary_sensor","doors_lock","doors_locked"],doors_open:["binary_sensor","doors_open","doors_open"],windows_open:["binary_sensor","windows_open","windows"],trunk:["binary_sensor","trunk_open","trunk"],bonnet:["binary_sensor","bonnet_open","bonnet"],sunroof:["binary_sensor","sunroof_open","sunroof"],door_front_left:["binary_sensor","door_open_front_left","door_front_left"],door_front_right:["binary_sensor","door_open_front_right","door_front_right"],door_rear_left:["binary_sensor","door_open_rear_left","door_rear_left"],door_rear_right:["binary_sensor","door_open_rear_right","door_rear_right"],window_front_left:["binary_sensor","window_open_front_left","window_front_left"],window_front_right:["binary_sensor","window_open_front_right","window_front_right"],window_rear_left:["binary_sensor","window_open_rear_left","window_rear_left"],window_rear_right:["binary_sensor","window_open_rear_right","window_rear_right"],lights:["binary_sensor","parkinglights_on","parking_lights"],in_motion:["binary_sensor","vehicle_in_motion","in_motion"],reachable:["binary_sensor","vehicle_reachable","reachable"],battery_protection:["binary_sensor","vehicle_battery_protection","battery_protection"],charger_connected:["binary_sensor","charger_connected","charger_connected"],charger_lock:["binary_sensor","charger_lock","charge_lock"],mileage:["sensor","mileage","mileage"],range:["sensor","range","range"],combustion_range:["sensor","combustion_range","combustion_range"],electric_range:["sensor","electric_range","electric_range"],gas_range:["sensor","gas_range","gas_range"],fuel_level:["sensor","fuel_level","fuel_level"],gas_level:["sensor","gas_level","gas_level"],battery_percentage:["sensor","battery_percentage","battery_percentage"],adblue_range:["sensor","adblue_range","adblue_range"],outside_temperature:["sensor","outside_temperature","outside_temperature"],inspection:["sensor","inspection","next_inspection"],inspection_in_km:["sensor","inspection_in_km","next_inspection_2"],oil_service_in_days:["sensor","oil_service_in_days","oil_service"],oil_service_in_km:["sensor","oil_service_in_km","oil_service_2"],software_version:["sensor","software_version","software_version"],car_captured:["sensor","car_captured","last_updated"],operation:["sensor","operation","last_operation"],service_event:["sensor","service_event","last_service_event"],camping_mode_ends_at:["sensor","camping_mode_ends_at","camping_mode_ends"],last_trip_mileage:["sensor","last_trip_mileage","last_trip_mileage"],last_trip_travel_time:["sensor","last_trip_travel_time","last_trip_travel_time"],last_trip_average_speed:["sensor","last_trip_average_speed","last_trip_average_speed"],last_trip_average_fuel_consumption:["sensor","last_trip_average_fuel_consumption","last_trip_average_fuel_consumption"],last_trip_average_electric_consumption:["sensor","last_trip_average_electric_consumption","last_trip_average_electric_consumption"],overall_mileage:["sensor","overall_mileage","overall_mileage"],overall_travel_time:["sensor","overall_travel_time","overall_travel_time"],overall_average_speed:["sensor","overall_average_speed","overall_average_speed"],overall_average_fuel_consumption:["sensor","overall_average_fuel_consumption","overall_average_fuel_consumption"],overall_average_electric_consumption:["sensor","overall_average_electric_consumption","overall_average_electric_consumption"],charging_state:["sensor","charging_state","charging_state"],charging_power:["sensor","charging_power","charging_power"],charging_rate:["sensor","charging_rate","charging_rate"],charge_type:["sensor","charge_type","charge_type"],remaining_charging_time:["sensor","remaining_charging_time","remaining_charging_time"],target_battery_percentage:["sensor","target_battery_percentage","target_battery_percentage"],position:["device_tracker","device_tracker",null],climate:["climate","climate","air_conditioning"],render:["image","render_vehicle_main","main_render_of_vehicle"]},i0=["sensor","binary_sensor","device_tracker"];function g1(M){return Object.values(M?.entities||{})}function a0(M){return!M.platform||M.platform===f1}function e1(M){let C=new Map;for(let H of g1(M)){if(H.platform!==f1||!H.device_id)continue;let V=M.devices?.[H.device_id];V&&C.set(H.device_id,V.name_by_user||V.name||H.device_id)}return[...C.entries()].map(([H,V])=>({id:H,name:V}))}function o0(M,C){if(C?.device)return C.device;let H=e1(M);return H.length===1?H[0].id:null}function A0(M){let C=Object.keys(M?.states||{}).filter(H=>/^sensor\..+_mileage$/.test(H));return C.length!==1?null:C[0].replace(/^sensor\./,"").replace(/_mileage$/,"")}function n0(M,C){let H=g1(M).filter(L=>L.device_id===C&&a0(L)).map(L=>L.entity_id.split(".")[1]);if(!H.length)return null;let V=H[0];for(let L of H.slice(1)){let r=0;for(;r<V.length&&r<L.length&&V[r]===L[r];)r+=1;V=V.slice(0,r)}return V.replace(/_+$/,"")||null}function u3(M,C){let H=o0(M,C),V=C?.prefix||n0(M,H)||A0(M),L=C?.entities||{},r={prefix:V,device:H},e=new Set,i=new Map;for(let t of g1(M))t.platform===f1&&(H&&t.device_id!==H||!t.translation_key||i.has(t.translation_key)||i.set(t.translation_key,t.entity_id));for(let[t,[o,d,l]]of Object.entries(t0)){let x=L[t];if(x){r[t]=x,e.add(x);continue}let v=i.get(d);if(v&&v.startsWith(`${o}.`)&&M?.states?.[v]){r[t]=v,e.add(v);continue}if(!V||!l)continue;let s=`${o}.${V}_${l}`;M?.states?.[s]&&(r[t]=s,e.add(s))}if(!r.position&&V){for(let t of[`device_tracker.${V}`,`device_tracker.${V}_${V}`])if(M?.states?.[t]){r.position=t,e.add(t);break}}return r.extra=g1(M).filter(t=>t.platform===f1&&(!H||t.device_id===H)&&i0.includes(t.entity_id.split(".")[0])&&!e.has(t.entity_id)&&M?.states?.[t.entity_id]).map(t=>t.entity_id).sort(),r}var p0=[["outside_temperature","temperature"],["adblue_range","adblue"],["combustion_range","range"],["electric_range","range"],["gas_range","range"],["gas_level","fuel"],["battery_percentage","battery_car"]];function i1(M){if(Z(M))return null;let C=Number(M.state);return Number.isFinite(C)?C:null}function k(M){return Z(M)?null:M.state==="on"}function S3(M){let C=k(M);return C===null?null:!C}function h3(M){if(!M)return null;let C=new Date(M);return Number.isNaN(C.getTime())?null:C}function f3(M,C){if(!M)return null;let H=C?.locale?.language||C?.language||"hu",V=(M.getTime()-Date.now())/1e3,L=Math.abs(V),r=[["second",1,60],["minute",60,3600],["hour",3600,86400],["day",86400,2592e3],["month",2592e3,31536e3],["year",31536e3,1/0]],[e,i]=r.find(([,,t])=>L<t)||r[r.length-1];try{return new Intl.RelativeTimeFormat(H,{numeric:"auto"}).format(Math.round(V/i),e)}catch{return M.toLocaleString()}}function D(M,C){if(Z(C))return null;let H=C.attributes||{};if(H.device_class==="timestamp"){let r=h3(C.state);if(r)return f3(r,M)}if(typeof M?.formatEntityState=="function")try{let r=M.formatEntityState(C);if(r)return r}catch{}let V=Number(C.state);if(Number.isFinite(V)){let r=M?.locale?.language||M?.language||"hu",e;try{e=new Intl.NumberFormat(r,{maximumFractionDigits:1}).format(V)}catch{e=String(V)}return H.unit_of_measurement?`${e} ${H.unit_of_measurement}`:e}let L=String(C.state);return L.charAt(0).toUpperCase()+L.slice(1).replace(/_/g," ")}function d0(M){let C=i1(M),H=(M?.attributes?.unit_of_measurement||"").toLowerCase();return C===null||!["min","m"].includes(H)||C<120?null:`${Math.floor(C/60)} h ${Math.round(C%60)} min`}function t1(M,C,H,V=[]){let L=[];for(let[r,e]of H){let i=C[r];if(!i)continue;let t=M.states[i],o=r.endsWith("travel_time")&&d0(t)||D(M,t);o!==null&&(r.endsWith("_range")&&V.includes(o)||L.push({key:r,entityId:i,value:o,icon:e}))}return L}function m0(M,C,H){if(C?.name)return C.name;let V=H.device?M.devices?.[H.device]:null;return V?V.name_by_user||V.name:(H.mileage?M.states[H.mileage]:null)?.attributes?.friendly_name?.replace(/\s*Mileage$/i,"")||null}function g3(M,C){let H=u3(M,C),V=m=>H[m]?M.states[H[m]]:void 0;if(!Object.keys(H).filter(m=>!["prefix","device","extra"].includes(m)&&H[m]).length)return{ok:!1,reason:H.prefix||H.device?"unavailable":"not_configured",entities:H};let r={},e={},i=[];for(let m of d3){let u=k(V(`door_${m}`)),O=k(V(`window_${m}`));r[N1[m]]=u===!0,e[N1[m]]=O===!0,u!==null&&i.push({key:`door_${m}`,kind:"door",open:u,entityId:H[`door_${m}`]}),O!==null&&i.push({key:`window_${m}`,kind:"window",open:O,entityId:H[`window_${m}`]})}let t=k(V("trunk")),o=k(V("bonnet")),d=k(V("sunroof"));for(let[m,u]of[["trunk",t],["bonnet",o],["sunroof",d]])u!==null&&i.push({key:m,kind:"extra",open:u,entityId:H[m]});let l=m3.find(m=>H[m]&&i1(V(m))!==null),x=l3.find(m=>H[m]&&i1(V(m))!==null),v=l?V(l):null,s=x?V(x):null,f=V("position"),_=k(V("reachable")),w=h3(V("car_captured")?.state),B=new Set([l,x,"mileage","car_captured"].filter(Boolean)),g=m=>m.filter(([u])=>!B.has(u)),P=[s?D(M,s):null].filter(Boolean);return{ok:!0,entities:H,name:m0(M,C,H),locked:S3(V("lock_vehicle"))??S3(V("lock_doors")),lockEntity:H.lock_vehicle||H.lock_doors||null,moving:k(V("in_motion"))===!0,offline:_===!1,reachable:_,lights:k(V("lights"))===!0,batteryProtection:k(V("battery_protection")),chargerConnected:k(V("charger_connected")),doors:r,windows:e,trunk:t===!0,bonnet:o===!0,sunroof:d,openings:i,openCount:i.filter(m=>m.open).length,level:v?{key:l,entityId:H[l],value:i1(v),unit:v.attributes?.unit_of_measurement||"%"}:null,range:s?{key:x,entityId:H[x],value:i1(s),unit:s.attributes?.unit_of_measurement||"km",text:D(M,s)}:null,odometer:H.mileage?{entityId:H.mileage,text:D(M,V("mileage"))}:null,position:f?{entityId:H.position,address:f.attributes?.parking_address||null,zone:D(M,f)}:null,lastUpdate:w?{entityId:H.car_captured,date:w,text:f3(w,M)}:null,climate:H.climate?(()=>{let m=V("climate");return Z(m)||m.state==="invalid"?null:{entityId:H.climate,state:D(M,m),current:m.attributes?.current_temperature??null,target:m.attributes?.temperature??null,unit:M.config?.unit_system?.temperature||"\xB0C"}})():null,rows:{drive:t1(M,H,g(p0),P),trip:t1(M,H,g(s3)),service:t1(M,H,g(v3)),charging:t1(M,H,g(c3),P),system:t1(M,H,g(x3))},extra:(H.extra||[]).map(m=>({entityId:m,name:M.states[m]?.attributes?.friendly_name||m,value:D(M,M.states[m])}))}}var O3="M66 44 C56 56 50 74 46 96 L41 150 C38 205 38 300 41 356 L45 420 C47 442 52 456 62 462 L68 464 L172 464 L178 462 C188 456 193 442 195 420 L199 356 C202 300 202 205 199 150 L194 96 C190 74 184 56 174 44 C166 34 150 28 120 28 C90 28 74 34 66 44 Z",k3={fl:{x:33,y:202,w:22,h:70,hinge:[34,202]},rl:{x:33,y:274,w:22,h:62,hinge:[34,274]},fr:{x:185,y:202,w:22,h:70,hinge:[206,202]},rr:{x:185,y:274,w:22,h:62,hinge:[206,274]}},y3={fl:"M34 212 L20 206 Q13 208 14 215 Q15 222 22 222 L34 222 Z",fr:"M206 212 L220 206 Q227 208 226 215 Q225 222 218 222 L206 222 Z"},l0={fl:"M32 211 L21 207 Q16 209 17 214 Q18 219 23 219 L32 219 Z",fr:"M208 211 L219 207 Q224 209 223 214 Q222 219 217 219 L208 219 Z"};function s0(M){let C=k3[M],V=M==="fl"||M==="rl"?C.x+1.5:C.x+C.w-4.5,L=y3[M]?`<path class="mirror" d="${y3[M]}"/><path class="mirror-glass" d="${l0[M]}"/>`:"";return`
    <g class="door" data-door="${M}" style="--hinge-x:${C.hinge[0]}px;--hinge-y:${C.hinge[1]}px;">
      <rect class="panel" x="${C.x}" y="${C.y}" width="${C.w}" height="${C.h}" rx="5"/>
      <rect class="window" data-window="${M}" x="${C.x+4}" y="${C.y+9}"
        width="${C.w-8}" height="${C.h-18}" rx="3"/>
      <rect class="handle" x="${V}" y="${C.y+C.h-26}" width="3" height="11" rx="1.5"/>
      ${L}
    </g>`}function _3(){return`
<svg class="car" viewBox="-28 6 296 486" role="img" aria-hidden="true">
  <defs>
    <clipPath id="car-body"><path d="${O3}"/></clipPath>
    <linearGradient id="car-paint" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="var(--car-paint-dark)"/>
      <stop offset=".34" stop-color="var(--car-paint)"/>
      <stop offset=".58" stop-color="var(--car-paint-light)"/>
      <stop offset="1" stop-color="var(--car-paint-dark)"/>
    </linearGradient>
    <linearGradient id="car-glass" x1="0" y1="0" x2=".85" y2="1">
      <stop offset="0" stop-color="var(--car-glass-light)"/>
      <stop offset="1" stop-color="var(--car-glass)"/>
    </linearGradient>
    <linearGradient id="car-sheen" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#fff" stop-opacity="0"/>
      <stop offset=".45" stop-color="#fff" stop-opacity=".30"/>
      <stop offset=".7" stop-color="#fff" stop-opacity="0"/>
    </linearGradient>
  </defs>

  <ellipse class="shadow" cx="120" cy="250" rx="92" ry="216"/>

  <g class="tyres">
    <rect x="37" y="100" width="11" height="46" rx="5"/>
    <rect x="192" y="100" width="11" height="46" rx="5"/>
    <rect x="37" y="340" width="11" height="46" rx="5"/>
    <rect x="192" y="340" width="11" height="46" rx="5"/>
  </g>

  <g clip-path="url(#car-body)">
    <rect class="paint" x="20" y="10" width="200" height="478"/>

    <!-- bonnet: hinged at the windscreen, tips up when open -->
    <rect class="bay" x="32" y="18" width="176" height="132" rx="22"/>
    <g class="lid bonnet">
      <rect class="paint" x="20" y="10" width="200" height="142"/>
      <rect class="grille" x="86" y="20" width="68" height="9" rx="4"/>
      <path class="seam bumper" d="M44 62 C72 44 168 44 196 62"/>
      <path class="seam" d="M64 58 L61 148 M176 58 L179 148"/>
      <path class="seam" d="M120 40 L120 150" />
      <g class="lamp head left">
        <rect class="lens" x="50" y="34" width="46" height="15" rx="7"/>
        <rect class="led" x="54" y="46" width="38" height="3" rx="1.5"/>
      </g>
      <g class="lamp head right">
        <rect class="lens" x="144" y="34" width="46" height="15" rx="7"/>
        <rect class="led" x="148" y="46" width="38" height="3" rx="1.5"/>
      </g>
    </g>

    <!-- tailgate: hinged at the roof, tips up when open -->
    <rect class="bay" x="32" y="358" width="176" height="100" rx="18"/>
    <g class="lid trunk">
      <rect class="paint" x="20" y="356" width="200" height="132"/>
      <path class="seam" d="M48 406 C72 400 168 400 192 406"/>
      <path class="seam bumper" d="M46 452 C74 458 166 458 194 452"/>
      <g class="lamp tail left">
        <rect class="lens" x="42" y="428" width="46" height="14" rx="6"/>
      </g>
      <g class="lamp tail right">
        <rect class="lens" x="152" y="428" width="46" height="14" rx="6"/>
      </g>
      <rect class="plate" x="97" y="440" width="46" height="13" rx="2"/>
    </g>

    <!-- the openings the doors leave behind when they swing out -->
    <rect class="aperture" x="33" y="202" width="22" height="70" rx="5"/>
    <rect class="aperture" x="33" y="274" width="22" height="62" rx="5"/>
    <rect class="aperture" x="185" y="202" width="22" height="70" rx="5"/>
    <rect class="aperture" x="185" y="274" width="22" height="62" rx="5"/>

    <!-- glazing -->
    <path class="glass windscreen" d="M46 154 L194 154 L178 204 L62 204 Z"/>
    <path class="wiper" d="M70 200 L104 184 M112 200 L146 184"/>
    <rect class="roof" x="58" y="204" width="124" height="104" rx="12"/>
    <rect class="glass sunroof-glass" x="78" y="212" width="84" height="84" rx="9"/>
    <rect class="rail" x="58" y="208" width="9" height="96" rx="4.5"/>
    <rect class="rail" x="173" y="208" width="9" height="96" rx="4.5"/>
    <path class="antenna" d="M120 302 Q115 316 113 326 L127 326 Q125 316 120 302 Z"/>
    <path class="seam spoiler" d="M58 308 L182 308"/>
    <path class="glass rear-window" d="M60 310 L180 310 L190 354 L50 354 Z"/>
    <path class="seam" d="M33 338 L207 338"/>
    <circle class="filler" cx="196" cy="322" r="6"/>
    <rect class="sheen" x="20" y="10" width="200" height="478"/>
  </g>

  <path class="outline" d="${O3}"/>

  ${Object.keys(k3).map(s0).join("")}

  <!-- sunroof marker, only shown when the car reports one -->
  <rect class="sunroof" x="78" y="212" width="84" height="84" rx="9"/>
</svg>`}function w3(M,C){let H=M.querySelector(".car");if(!H)return;let V=(r,e,i)=>{r&&r.classList.toggle(e,!!i)};for(let[r,e]of Object.entries(C.doors))V(H.querySelector(`[data-door="${r}"]`),"open",e);for(let[r,e]of Object.entries(C.windows))V(H.querySelector(`[data-window="${r}"]`),"open",e);V(H.querySelector(".bonnet"),"open",C.bonnet),V(H.querySelector(".trunk"),"open",C.trunk);let L=H.querySelector(".sunroof");V(L,"visible",C.sunroof!==null),V(L,"open",C.sunroof),H.classList.toggle("lights-on",!!C.lights),H.classList.toggle("offline",!!C.offline)}var v0=`
:host {
  --car-paint: #c6ccd4;
  --car-paint-light: #e6eaef;
  --car-paint-dark: #97a0ab;
  --car-cabin: #2b3138;
  --car-glass: #8ea3b5;
  --car-glass-light: #c2d1dd;
  --car-roof: #b6bec8;
  --car-line: rgba(30,35,42,.42);
  --car-tyre: #4a5058;
  --car-light-off: #dfe4ea;
  --car-open: #f2a63c;
  --car-open-line: #b9711a;
  --car-alarm: var(--error-color, #e03b2c);
  --car-stage: 152px;
}

/* the drawn car keeps its own palette on a dark theme so it stays a silver car */
.wrap.dark {
  --car-paint: #9aa2ac;
  --car-paint-light: #c3cad2;
  --car-paint-dark: #6e767f;
  --car-cabin: #14181c;
  --car-glass: #5d7183;
  --car-glass-light: #8ea3b5;
  --car-roof: #858e98;
  --car-line: rgba(0,0,0,.5);
  --car-tyre: #23282e;
  --car-light-off: #aeb5bd;
}

/* ---------- hero ---------- */
.split { display: grid; grid-template-columns: var(--car-stage) minmax(0, 1fr); gap: 16px; align-items: start; }
.compact .split { --car-stage: 112px; gap: 12px; }
@container (max-width: 340px) { .split { grid-template-columns: 1fr; justify-items: center; } .split .primary { width: 100%; } }

.stage { width: 100%; max-width: var(--car-stage); margin: 0 auto; }
.primary { display: grid; gap: 10px; min-width: 0; }
.state-line { display: flex; align-items: baseline; gap: 8px; flex-wrap: wrap; }
.state-text { font-size: 1.35rem; font-weight: 700; color: var(--ap-accent); line-height: 1.1; }
.compact .state-text { font-size: 1.15rem; }
.state-sub { font-size: .78rem; color: var(--ap-muted); }

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
.car .shadow { fill: rgba(0,0,0,.2); filter: blur(11px); }
.car .tyres rect { fill: var(--car-tyre); opacity: .85; }
.car .paint { fill: url(#car-paint); }
.car .aperture { fill: var(--car-cabin); }
.car .bay { fill: color-mix(in srgb, var(--car-cabin) 62%, var(--car-paint-dark)); }
.car .glass { fill: url(#car-glass); stroke: var(--car-line); stroke-width: 1.2; }
.car .roof { fill: var(--car-roof); stroke: var(--car-line); stroke-width: 1.2; }
.car .sunroof-glass { stroke: none; fill: color-mix(in srgb, var(--car-glass) 62%, transparent); }
.car .rail { fill: var(--car-paint-dark); stroke: var(--car-line); stroke-width: .8; }
.car .antenna { fill: var(--car-paint-dark); stroke: var(--car-line); stroke-width: .8; }
.car .outline { fill: none; stroke: var(--car-line); stroke-width: 2.6; }
.car .seam { stroke: var(--car-line); stroke-width: 1.1; fill: none; opacity: .42; }
.car .seam.bumper { stroke-width: 1.8; opacity: .28; }
.car .seam.spoiler { stroke-width: 2; opacity: .35; }
.car .wiper { stroke: var(--car-cabin); stroke-width: 1.6; stroke-linecap: round; opacity: .45; fill: none; }
.car .grille { fill: var(--car-cabin); opacity: .75; }
.car .plate { fill: #f2f4f6; stroke: var(--car-line); stroke-width: .8; }
.car .filler { fill: none; stroke: var(--car-line); stroke-width: 1; opacity: .5; }
.car .sheen { fill: url(#car-sheen); pointer-events: none; }

.car .lamp .lens { fill: var(--car-light-off); stroke: var(--car-line); stroke-width: .8; }
.car .lamp .led { fill: color-mix(in srgb, #ffe082 60%, var(--car-light-off)); }
.car .lamp.tail .lens { fill: color-mix(in srgb, #c62828 55%, var(--car-light-off)); }
.car.lights-on .lamp.head .lens { fill: #fff3c4; filter: drop-shadow(0 0 7px rgba(255,214,86,.95)); }
.car.lights-on .lamp.tail .lens { fill: #ff5f52; filter: drop-shadow(0 0 7px rgba(255,80,70,.9)); }
.car.offline { opacity: .55; filter: grayscale(.45); }

.car .door { transform-box: view-box; transform-origin: var(--hinge-x) var(--hinge-y); }
.car .door .panel { fill: url(#car-paint); stroke: var(--car-line); stroke-width: 1.4; }
.car .door .window { fill: var(--car-glass); stroke: var(--car-line); stroke-width: 1; }
.car .door .handle { fill: var(--car-paint-dark); stroke: var(--car-line); stroke-width: .6; }
.car .mirror { fill: var(--car-paint-dark); stroke: var(--car-line); stroke-width: 1.1; }
.car .mirror-glass { fill: var(--car-glass); }

.car .door.open .panel { fill: var(--car-open); stroke: var(--car-open-line); }
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

.car .lid { transform-box: view-box; }
.car .bonnet { transform-origin: 120px 152px; }
.car .trunk { transform-origin: 120px 356px; }
.car .lid.open { animation: car-lid 820ms cubic-bezier(.22,.9,.28,1) forwards; }
.car .lid.open .paint { fill: var(--car-open); }
.car .lid.open .lamp, .car .lid.open .plate, .car .lid.open .grille { opacity: 0; }
@keyframes car-lid { 0% { transform: scaleY(1); } 100% { transform: scaleY(.4); } }

.car .sunroof { fill: none; stroke: none; }
.car .sunroof.visible { stroke: var(--car-line); stroke-width: 1; stroke-dasharray: 4 3; }
.car .sunroof.visible.open {
  fill: color-mix(in srgb, var(--car-alarm) 55%, transparent);
  stroke: var(--car-alarm); stroke-dasharray: none;
  animation: car-window 1.7s ease-in-out infinite;
}
`,b3=`${Y}
${v0}`;var z1={language:"auto",compact:!1,animate:!0,show_alerts:!0,show_drive:!0,show_trip:!0,show_service:!0,show_charging:!0,show_climate:!0,show_system:!0,show_extra:!1},x0=[{name:"drive",option:"show_drive",icon:"range"},{name:"trip",option:"show_trip",icon:"trip"},{name:"service",option:"show_service",icon:"service"},{name:"charging",option:"show_charging",icon:"charger"},{name:"system",option:"show_system",icon:"marker"}],$1=class extends HTMLElement{static getConfigElement(){return document.createElement(r1)}static getStubConfig(C){let H=e1(C);return{type:`custom:${F}`,device:H[0]?.id}}constructor(){super(),this.attachShadow({mode:"open"}),this._sections={},this._signatures={},this._open={},this._built=!1}setConfig(C){this._config={...z1,...C||{}},this._signatures={},this._hass&&this._render()}set hass(C){this._hass=C,this._render()}get hass(){return this._hass}connectedCallback(){this._timer=window.setInterval(()=>this._render(),6e4)}disconnectedCallback(){this._timer&&window.clearInterval(this._timer),this._timer=void 0}getCardSize(){return this._config?.compact?5:8}getGridOptions(){return{columns:12,min_columns:6,rows:"auto"}}_build(){let C=document.createElement("style");C.textContent=b3;let H=document.createElement("ha-card"),V=document.createElement("div");V.className="wrap",V.addEventListener("click",L=>this._onClick(L)),V.addEventListener("toggle",L=>this._onToggle(L),!0);for(let L of["header","hero","alerts","folds"]){let r=document.createElement("div");r.dataset.section=L,this._sections[L]=r,V.appendChild(r)}H.appendChild(V),this.shadowRoot.replaceChildren(C,H),this._wrap=V,this._built=!0}_render(){if(!this._hass||!this._config)return;this._built||this._build();let C=h1(S1(this._config,this._hass)),H=g3(this._hass,this._config);if(this._model=H,!H.ok){this._renderEmpty(H,C);return}this._emptyShown=!1,this._applyHostClasses(H),this._section("header",this._headerHtml(H,C)),this._heroSection(H,C),this._section("alerts",this._config.show_alerts?this._alertsHtml(H,C):""),this._section("folds",this._foldsHtml(H,C))}_renderEmpty(C,H){if(this._emptyShown!==C.reason){this._emptyShown=C.reason,this._signatures={};for(let V of Object.values(this._sections))V.innerHTML="",V.hidden=!1;this._sections.header.innerHTML=`
      <div class="empty">
        ${p("car")}
        <div>${a(H(`ui.${C.reason}`))}</div>
      </div>`}}_section(C,H){this._signatures[C]!==H&&(this._signatures[C]=H,this._sections[C].innerHTML=H,this._sections[C].hidden=!H)}_applyHostClasses(C){let H=["wrap"];this._config.compact&&H.push("compact"),this._config.animate||H.push("no-animation"),this._hass.themes?.darkMode&&H.push("dark"),H.push(`accent-${this._accent(C)}`);let V=H.join(" ");this._wrap.className!==V&&(this._wrap.className=V)}_accent(C){return C.offline?"idle":C.openCount?"paused":C.moving?"running":C.locked===!1?"paused":"ready"}_headerHtml(C,H){let V=a(C.name||H("card_name")),L=C.lastUpdate?.text?`${H("ui.updated")} ${C.lastUpdate.text}`:"",r=[];C.lights&&r.push(`<span class="warn" title="${a(H("ui.lights"))}">${p("lights")}</span>`),C.offline&&r.push(`<span title="${a(H("ui.not_reachable"))}">${p("wifi_off")}</span>`);let e=C.locked===null?"":`<div class="pill" data-action="more-info" data-entity="${a(C.lockEntity||"")}">
            ${p(C.locked?"lock":"lock_open")}
            ${a(H(C.locked?"state.locked":"state.unlocked"))}
          </div>`;return`
      <div class="header">
        <div>
          <div class="title" data-action="more-info">${V}</div>
          ${L?`<div class="sub">${a(L)}</div>`:""}
        </div>
        <div class="spacer"></div>
        <div class="badges">${r.join("")}</div>
        ${e}
      </div>`}_heroSection(C,H){this._sections.hero.querySelector(".car")||(this._sections.hero.innerHTML=`
        <div class="split">
          <div class="stage" data-action="more-info">${_3()}</div>
          <div class="primary"></div>
        </div>`,this._primaryNode=this._sections.hero.querySelector(".primary"));let V=this._primaryHtml(C,H);this._signatures.primary!==V&&(this._signatures.primary=V,this._primaryNode.innerHTML=V),w3(this._sections.hero,C)}_primaryHtml(C,H){let V=[],L=C.offline?"offline":C.moving?"moving":"parked",r=[];if(C.position?.address?r.push(C.position.address):C.position?.zone&&r.push(C.position.zone),V.push(`
      <div class="state-line">
        <span class="state-text">${a(H(`status.${L}`))}</span>
        ${r.length?`<span class="state-sub">${a(r.join(" \xB7 "))}</span>`:""}
      </div>`),C.level){let i=Math.max(0,Math.min(100,Math.round(C.level.value))),t=i<=10?" empty-tank":i<=25?" low":"",o=C.level.key==="battery_percentage"?"level":"fuel",d=C.range?.text?`<b>${i} ${a(C.level.unit)}</b> \xB7 ${a(C.range.text)}`:`<b>${i} ${a(C.level.unit)}</b>`;V.push(`
        <div class="metric${t}" data-action="more-info" data-entity="${a(C.level.entityId)}">
          <div class="top">${p(o==="level"?"battery_car":"fuel")}
            <span>${a(H(`ui.${o}`))}</span><span class="val">${d}</span></div>
          <div class="bar"><i style="width:${i}%"></i></div>
        </div>`)}else C.range?.text&&V.push(this._lineHtml("range",H("ui.range"),C.range.text,C.range.entityId));C.odometer?.text&&V.push(this._lineHtml("odometer",H("ui.odometer"),C.odometer.text,C.odometer.entityId));let e=[];return C.moving&&e.push(`<span class="fact">${p("motion")}${a(H("ui.in_motion"))}</span>`),C.reachable!==null&&e.push(`<span class="fact">${p(C.reachable?"online":"wifi_off")}${a(H(C.reachable?"ui.reachable":"ui.not_reachable"))}</span>`),C.chargerConnected&&e.push(`<span class="fact">${p("charger")}${a(H("ui.charging_plug","Plug"))}</span>`),e.length&&V.push(`<div class="facts">${e.join("")}</div>`),V.join("")}_lineHtml(C,H,V,L){return`
      <div class="line" data-action="more-info" data-entity="${a(L||"")}">
        <span class="k">${p(C)}<span>${a(H)}</span></span>
        <span class="v">${a(V)}</span>
      </div>`}_alertsHtml(C,H){let V=[];C.offline&&V.push({severity:"info",text:H("alert.offline"),iconName:"wifi_off"});let L=i=>C.openings.filter(t=>t.open&&t.kind===i),r=L("door"),e=L("window");if(r.length>2)V.push({severity:"warning",text:H("alert.doors_open").replace("{count}",r.length),iconName:"car_door",entityId:C.entities.doors_open});else for(let i of r)V.push({severity:"warning",text:H("alert.door_open").replace("{name}",H(`opening.${i.key}`)),iconName:"car_door",entityId:i.entityId});if(e.length>2)V.push({severity:"error",text:H("alert.windows_open").replace("{count}",e.length),iconName:"window_open",entityId:C.entities.windows_open});else for(let i of e)V.push({severity:"error",text:H("alert.window_open").replace("{name}",H(`opening.${i.key}`)),iconName:"window_open",entityId:i.entityId});for(let i of L("extra"))V.push({severity:"warning",text:H(`alert.${i.key}_open`),iconName:i.key==="trunk"?"trunk":i.key==="bonnet"?"bonnet":"sunroof",entityId:i.entityId});return C.locked===!1&&V.push({severity:"warning",text:H("alert.unlocked"),iconName:"lock_open",entityId:C.lockEntity}),C.lights&&V.push({severity:"warning",text:H("alert.lights_on"),iconName:"lights",entityId:C.entities.lights}),!V.length&&C.openings.length&&V.push({severity:"ok",text:H("alert.all_closed"),iconName:"check"}),V.length?`<div class="alerts">${V.map(i=>`
        <div class="alert ${i.severity==="ok"?"info ok":i.severity}"
          data-action="more-info" data-entity="${a(i.entityId||"")}">
          ${p(i.iconName)}<span>${a(i.text)}</span>
        </div>`).join("")}</div>`:""}_foldsHtml(C,H){let V=[];for(let L of x0){if(!this._config[L.option])continue;let r=C.rows[L.name]||[],e=L.name==="system"?this._systemExtras(C,H):[];if(!r.length&&!e.length)continue;let i=[...e,...r.map(t=>this._lineHtml(t.icon,H(`entity.${t.key}`,t.key),t.value,t.entityId))].join("");V.push(this._foldHtml(L.name,L.icon,H(`section.${L.name}`),i))}if(this._config.show_climate&&C.climate){let L=[this._lineHtml("ac",H("ui.climate_state"),C.climate.state,C.climate.entityId)];C.climate.current!==null&&L.push(this._lineHtml("snowflake",H("ui.current_temp"),`${C.climate.current} ${C.climate.unit}`,C.climate.entityId)),C.climate.target!==null&&L.push(this._lineHtml("ac",H("ui.target_temp"),`${C.climate.target} ${C.climate.unit}`,C.climate.entityId)),V.push(this._foldHtml("climate","ac",H("section.climate"),L.join("")))}if(this._config.show_extra&&C.extra.length){let L=C.extra.map(r=>this._lineHtml("info",r.name,r.value??"\u2013",r.entityId)).join("");V.push(this._foldHtml("extra","info",H("section.extra"),L))}return V.length?`${V.join("")}
      <div class="readonly">${p("info")}<span>${a(H("ui.read_only"))}</span></div>`:""}_systemExtras(C,H){let V=[];return C.position&&V.push(this._lineHtml("marker",H("ui.position"),C.position.address||C.position.zone||"\u2013",C.position.entityId)),C.batteryProtection!==null&&V.push(this._lineHtml("battery_car",H("ui.battery_protection"),H(C.batteryProtection?"state.on":"state.off"),C.entities.battery_protection)),V}_foldHtml(C,H,V,L){let r=this._open[C]?" open":"";return`
      <details class="fold" data-fold="${C}"${r}>
        <summary>${p(H)}<span>${a(V)}</span>${p("chevron","icon chev")}</summary>
        <div class="body">${L}</div>
      </details>`}_onToggle(C){let H=C.target;H?.dataset?.fold&&(this._open[H.dataset.fold]=H.open)}_onClick(C){let H=C.target.closest("[data-action]");if(!H||H.dataset.action!=="more-info")return;let V=H.dataset.entity||this._model?.entities?.lock_vehicle||this._model?.entities?.mileage||this._model?.entities?.position;V&&this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:V},bubbles:!0,composed:!0}))}};function T3(){customElements.get(F)||(customElements.define(F,$1),window.customCards=window.customCards||[],window.customCards.push({type:F,name:"\u0160koda Car Card",description:"Top-view status card for \u0160koda vehicles (MySkoda): doors, windows, range, service and trips. Status only.",preview:!0,documentationURL:"https://github.com/gabor-io/ha-appliance-custom-card"}),console.info(`%c ${F} %c ${p3} `,"color:#fff;background:#0e3a2f;font-weight:700;border-radius:3px 0 0 3px","color:#0e3a2f;background:#d6f2e6;font-weight:700;border-radius:0 3px 3px 0"))}var c0=q({cardName:F,toggles:["show_alerts","show_drive","show_trip","show_service","show_charging","show_climate","show_system","show_extra","compact","animate"],defaults:z1,listDevices:e1,getLanguage:S1,translator:h1,languages:I1});function B3(){customElements.get(r1)||customElements.define(r1,c0)}B3();T3();
