/*! ha-appliance-cards v1.24.1 - https://github.com/gabor-io/ha-appliance-custom-card - MIT licence */
var r1="aeg-dishwasher-card",t2="aeg-dishwasher-card-editor",M0="1.24.1",u={OFF:"OFF",IDLE:"IDLE",READY_TO_START:"READY_TO_START",DELAYED_START:"DELAYED_START",RUNNING:"RUNNING",PAUSED:"PAUSED",END_OF_CYCLE:"END_OF_CYCLE",ALARM:"ALARM",UNKNOWN:"UNKNOWN"},n0={[u.OFF]:"idle",[u.IDLE]:"idle",[u.READY_TO_START]:"ready",[u.DELAYED_START]:"delayed",[u.RUNNING]:"running",[u.PAUSED]:"paused",[u.END_OF_CYCLE]:"done",[u.ALARM]:"alarm",[u.UNKNOWN]:"idle"},_1={PREWASH:"PREWASH",MAINWASH:"MAINWASH",COLDRINSE:"COLDRINSE",HOTRINSE:"HOTRINSE",EXTRARINSE:"EXTRARINSE",DRYING:"DRYING",ADO_DRYING:"ADO_DRYING",UNAVAILABLE:"UNAVAILABLE"},O5=["PREWASH","MAINWASH","RINSE","DRYING"],s0={[_1.PREWASH]:"PREWASH",[_1.MAINWASH]:"MAINWASH",[_1.COLDRINSE]:"RINSE",[_1.HOTRINSE]:"RINSE",[_1.EXTRARINSE]:"RINSE",[_1.DRYING]:"DRYING",[_1.ADO_DRYING]:"DRYING"},z={ECO:{icon:"leaf",water:8.4,energy:.488,duration:310,steps:["PREWASH","MAINWASH","RINSE","DRYING"]},AUTO:{icon:"auto",water:12.5,energy:1,duration:180,steps:["PREWASH","MAINWASH","RINSE","DRYING"]},QUICK30:{icon:"quick",water:8.5,energy:.475,duration:30,steps:["MAINWASH","RINSE"]},QUICK60:{icon:"clock",water:10.5,energy:1,duration:60,steps:["MAINWASH","RINSE","DRYING"]},NORMAL90:{icon:"clock",water:10.5,energy:1,duration:90,steps:["MAINWASH","RINSE","DRYING"]},"120_MIN":{icon:"clock",water:10.5,energy:.9,duration:120,steps:["MAINWASH","RINSE","DRYING"]},RINSE:{icon:"rinse",water:4,energy:.15,duration:15,steps:["PREWASH"],scores:!1},MACHINE_CARE:{icon:"care",water:10,energy:.575,duration:60,steps:["MAINWASH","RINSE","DRYING"],scores:!1}},E5=["ECO","AUTO","QUICK30","QUICK60","NORMAL90","120_MIN","RINSE","MACHINE_CARE"],l0=[{key:"xtra_dry",entity:"xtra_dry_option",icon:"dry",programs:["ECO","QUICK60","NORMAL90","120_MIN"]},{key:"extra_power",entity:"extra_power_option",icon:"power",programs:["QUICK30","QUICK60","NORMAL90","120_MIN"]},{key:"extra_silent",entity:"extra_silent_option",icon:"silent",programs:["ECO","NORMAL90","120_MIN"]},{key:"glass_care",entity:"glass_care_option",icon:"glass",programs:["QUICK30","QUICK60","NORMAL90","120_MIN"]},{key:"sanitize",entity:"sanitize_option",icon:"sanitize",programs:["QUICK30","QUICK60","NORMAL90","120_MIN"]},{key:"spray_zone",entity:"spray_zone_option",icon:"spray",programs:["QUICK30","QUICK60","NORMAL90","120_MIN"]},{key:"zone_clean",entity:"zone_clean_option",icon:"zone",programs:["QUICK30","QUICK60","NORMAL90","120_MIN"]},{key:"one_rack",entity:"one_rack_option",icon:"rack",programs:["QUICK30","QUICK60"]},{key:"auto_door_opener",entity:"auto_door_opener",icon:"door",programs:null}],d0={[u.OFF]:[],[u.IDLE]:["start"],[u.READY_TO_START]:["start"],[u.DELAYED_START]:["stopreset"],[u.RUNNING]:["pause"],[u.PAUSED]:["resume","stopreset"],[u.END_OF_CYCLE]:["stopreset"],[u.ALARM]:["stopreset"],[u.UNKNOWN]:[]},p0={start:{icon:"play",style:"primary"},pause:{icon:"pause",style:"primary"},resume:{icon:"play",style:"primary"},stopreset:{icon:"stop",style:"ghost"}},w2={DISH_ALARM_SALT_MISSING:"warning",DISH_ALARM_RINSE_AID_LOW:"warning",DISH_ALARM_I10:"error",DISH_ALARM_I11:"error",DISH_ALARM_I20:"error",DISH_ALARM_I30:"error",DISH_ALARM_I41:"error",DISH_ALARM_I43:"error",DISH_ALARM_I44:"error",DISH_ALARM_IF1:"error"},A0=[60,120,180,240,360,480,720],y1=10,b1=1440;function T(t,C,e){let H=t?.language&&t.language!=="auto"?t.language:null,V=(C?.locale?.language||C?.language||"en").slice(0,2).toLowerCase(),r=H||V;return e.includes(r)?r:"en"}function $(t,C,e="en"){let H=t[C]||t[e],V=t[e],r=(L,a)=>a.split(".").reduce((o,M)=>o?o[M]:void 0,L);return(L,a="")=>{let o=r(H,L);if(o!==void 0)return o;let M=r(V,L);return M!==void 0?M:a}}var BC={card_name:"Mosogat\xF3g\xE9p",state:{OFF:"Kikapcsolva",IDLE:"K\xE9szenl\xE9tben",READY_TO_START:"Ind\xEDt\xE1sra k\xE9sz",DELAYED_START:"K\xE9sleltetett ind\xEDt\xE1s",RUNNING:"Program fut",PAUSED:"Sz\xFCneteltetve",END_OF_CYCLE:"Elk\xE9sz\xFClt",ALARM:"Hiba",UNKNOWN:"Ismeretlen"},phase:{PREWASH:"El\u0151mos\xE1s",MAINWASH:"Mosogat\xE1s",RINSE:"\xD6bl\xEDt\xE9s",DRYING:"Sz\xE1r\xEDt\xE1s",UNAVAILABLE:"\u2013"},phase_long:{PREWASH:"El\u0151mos\xE1s",MAINWASH:"Mosogat\xE1s",COLDRINSE:"Hideg \xF6bl\xEDt\xE9s",HOTRINSE:"Meleg \xF6bl\xEDt\xE9s",EXTRARINSE:"Extra \xF6bl\xEDt\xE9s",DRYING:"Sz\xE1r\xEDt\xE1s",ADO_DRYING:"AirDry sz\xE1r\xEDt\xE1s",UNAVAILABLE:"Nincs fut\xF3 f\xE1zis"},program:{ECO:"Eco",AUTO:"Auto",QUICK30:"Quick 30",QUICK60:"1h00m",NORMAL90:"1h30m","120_MIN":"2h00m",RINSE:"\xD6bl\xEDt\xE9s \xE9s v\xE1rakoz\xE1s",MACHINE_CARE:"G\xE9p\xE1pol\xE1s"},program_hint:{ECO:"Norm\xE1l szennyezetts\xE9g, a leghat\xE9konyabb v\xEDz- \xE9s energiafogyaszt\xE1s.",AUTO:"B\xE1rmilyen szennyezetts\xE9g, a g\xE9p m\xE9ri a t\xF6ltetet \xE9s a koszt.",QUICK30:"Friss szennyez\u0151d\xE9s, sz\xE1r\xEDt\xE1si f\xE1zis n\xE9lk\xFCl.",QUICK60:"Friss, enyh\xE9n r\xE1sz\xE1radt szennyez\u0151d\xE9s.",NORMAL90:"Norm\xE1l, enyh\xE9n r\xE1sz\xE1radt szennyez\u0151d\xE9s, l\xE1basokhoz is.","120_MIN":"Norm\xE1l, r\xE1sz\xE1radt szennyez\u0151d\xE9s, l\xE1basokhoz \xE9s serpeny\u0151kh\xF6z.",RINSE:"Felfriss\xEDti a k\xE9s\u0151bb mosand\xF3 ed\xE9nyeket. Mos\xF3szer n\xE9lk\xFCl!",MACHINE_CARE:"A g\xE9p belsej\xE9nek tiszt\xEDt\xE1sa v\xEDzk\u0151 \xE9s zs\xEDr ellen."},option:{xtra_dry:"ExtraDry",extra_power:"ExtraPower",extra_silent:"ExtraSilent",glass_care:"GlassCare",sanitize:"Fert\u0151tlen\xEDt\xE9s",spray_zone:"SprayZone",zone_clean:"ZoneClean",one_rack:"Egy kos\xE1r",auto_door_opener:"AutoOpen ajt\xF3"},option_hint:{xtra_dry:"Intenz\xEDvebb sz\xE1r\xEDt\xE1s a program v\xE9g\xE9n.",extra_power:"Er\u0151sebb mosogat\xE1s makacs szennyez\u0151d\xE9shez.",extra_silent:"Halkabb m\u0171k\xF6d\xE9s, hosszabb program.",glass_care:"\xDCveg\xE1rut k\xEDm\xE9l\u0151, max. 45 \xB0C.",sanitize:"Extra fert\u0151tlen\xEDt\u0151 \xF6bl\xEDt\xE9s.",spray_zone:"F\xF3kusz\xE1lt v\xEDzsug\xE1r az als\xF3 kos\xE1rban.",zone_clean:"Als\xF3 kos\xE1r er\u0151s, fels\u0151 kos\xE1r k\xEDm\xE9l\u0151 mos\xE1s.",one_rack:"Csak az egyik kos\xE1r mos\xE1sa.",auto_door_opener:"A ciklus v\xE9g\xE9n automatikusan kinyitja az ajt\xF3t."},command:{on:"Bekapcsol\xE1s",off:"Kikapcsol\xE1s",start:"Ind\xEDt\xE1s",pause:"Sz\xFCnet",resume:"Folytat\xE1s",stopreset:"Le\xE1ll\xEDt\xE1s"},alert:{DISH_ALARM_SALT_MISSING:"A s\xF3tart\xE1lyt fel kell t\xF6lteni",DISH_ALARM_RINSE_AID_LOW:"Az \xF6bl\xEDt\u0151szer-adagol\xF3 ki\xFCr\xFClt",DISH_ALARM_I10:"i10 \u2013 a k\xE9sz\xFCl\xE9k nem t\xF6lt be vizet. Ellen\u0151rizze a v\xEDzcsapot \xE9s a sz\u0171r\u0151t.",DISH_ALARM_I11:"i11 \u2013 a k\xE9sz\xFCl\xE9k nem t\xF6lt be vizet. Ellen\u0151rizze a v\xEDzcsapot \xE9s a sz\u0171r\u0151t.",DISH_ALARM_I20:"i20 \u2013 a k\xE9sz\xFCl\xE9k nem ereszti le a vizet. Ellen\u0151rizze a szifont \xE9s a sz\u0171r\u0151ket.",DISH_ALARM_I30:"i30 \u2013 a t\xFAlcsordul\xE1sg\xE1tl\xF3 bekapcsolt. Z\xE1rja el a v\xEDzcsapot!",DISH_ALARM_IF1:"iF1 \u2013 t\xFAl magas a v\xEDzszint a k\xE9sz\xFCl\xE9kben."},alert_generic:"Riaszt\xE1s",ui:{remaining:"H\xE1tral\xE9v\u0151 id\u0151",ready_at:"Elk\xE9sz\xFCl",starts_at:"Indul",start_in:"Ind\xEDt\xE1s eddig",door:"Ajt\xF3",door_open:"Az ajt\xF3 nyitva",door_closed:"Ajt\xF3 z\xE1rva",program:"Program",options:"Kieg\xE9sz\xEDt\u0151 funkci\xF3k",no_options:"Ehhez a programhoz nincs v\xE1laszthat\xF3 funkci\xF3.",delay:"K\xE9sleltetett ind\xEDt\xE1s",delay_off:"Nincs",delay_cancel:"T\xF6rl\xE9s",delay_amount:"K\xE9sleltet\xE9s",ready_by:"Legyen k\xE9sz",ready_by_hint:"Add meg, mikorra legyen k\xE9sz, majd nyomd meg a pip\xE1t \u2013 a k\xE1rtya kisz\xE1molja a k\xE9sleltet\xE9st, 10 percre lefel\xE9 kerek\xEDtve.",ready_by_apply:"K\xE9sleltet\xE9s kisz\xE1m\xEDt\xE1sa",ready_by_too_soon:"Ennyi id\u0151 alatt nem f\xE9r bele, a legkor\xE1bbi befejez\xE9s",ready_by_max:"A g\xE9p legfeljebb 24 \xF3ra k\xE9sleltet\xE9st fogad el, ennyire \xE1ll\xEDtottam",ready_by_set:"K\xE9sleltet\xE9s be\xE1ll\xEDtva",scores:"Hat\xE9konys\xE1g",scores_updating:"friss\xFCl\u2026",eco_score:"Eco",energy_score:"Energia",water_score:"V\xEDz",consumption:"V\xE1rhat\xF3 fogyaszt\xE1s",water:"V\xEDz",energy:"Energia",duration:"Id\u0151tartam",details:"R\xE9szletek",appliance_settings:"K\xE9sz\xFCl\xE9k be\xE1ll\xEDt\xE1sok",brightness:"Kijelz\u0151 f\xE9nyereje",floor_light:"TimeOnFloor",floor_light_hint:"A h\xE1tral\xE9v\u0151 id\u0151t a padl\xF3ra vet\xEDti.",end_sound:"Befejez\xE9s hangja",end_sound_hint:"Hangjelz\xE9s a program v\xE9g\xE9n.",key_tone:"Gombhangok",key_tone_hint:"A kezel\u0151panel gombjainak hangja.",brightness_hint:"A k\xE9sz\xFCl\xE9k kijelz\u0151j\xE9nek f\xE9nyereje (0\u20139).",remote:"T\xE1vvez\xE9rl\xE9s",remote_on:"Enged\xE9lyezve",remote_off:"Tiltva",remote_locked:"Ideiglenesen z\xE1rolva",cycles:"Lefutott ciklusok",wifi:"Wi-Fi jel",eco_mode:"Eco m\xF3d",rinse_aid:"\xD6bl\xEDt\u0151szer szintje",water_hardness:"V\xEDzkem\xE9nys\xE9g",offline:"Nincs kapcsolat a k\xE9sz\xFCl\xE9kkel",unavailable:"A k\xE9sz\xFCl\xE9k entit\xE1sai nem \xE9rhet\u0151k el",not_configured:"Nem tal\xE1lhat\xF3 Electrolux mosogat\xF3g\xE9p. Add meg a device vagy a prefix be\xE1ll\xEDt\xE1st a k\xE1rtya konfigur\xE1ci\xF3j\xE1ban.",remote_disabled_hint:"A vez\xE9rl\xE9shez enged\xE9lyezd a t\xE1vind\xEDt\xE1st a k\xE9sz\xFCl\xE9ken.",minute_short:"p",hour_short:"\xF3",finished:"A mosogat\xE1s elk\xE9sz\xFClt",finished_hint:"Kipakolhat\xF3",more:"T\xF6bb",less:"Kevesebb",just_now:"kevesebb mint egy perc"},editor:{device:"K\xE9sz\xFCl\xE9k",device_auto:"Automatikus felismer\xE9s",name:"N\xE9v",language:"Nyelv",language_auto:"Automatikus (HA nyelve)",sections:"Megjelen\xEDtett r\xE9szek",show_programs:"Programv\xE1laszt\xF3",show_options:"Kieg\xE9sz\xEDt\u0151 funkci\xF3k",show_delay:"K\xE9sleltetett ind\xEDt\xE1s",show_scores:"Hat\xE9konys\xE1gi pontok",show_consumption:"Fogyaszt\xE1si adatok",show_appliance_settings:"K\xE9sz\xFCl\xE9k be\xE1ll\xEDt\xE1sok",show_details:"R\xE9szletek",show_controls:"Vez\xE9rl\u0151gombok",compact:"Kompakt n\xE9zet",animate:"Anim\xE1ci\xF3k"}},PC={card_name:"Dishwasher",state:{OFF:"Off",IDLE:"Idle",READY_TO_START:"Ready to start",DELAYED_START:"Delayed start",RUNNING:"Running",PAUSED:"Paused",END_OF_CYCLE:"Finished",ALARM:"Fault",UNKNOWN:"Unknown"},phase:{PREWASH:"Prewash",MAINWASH:"Main wash",RINSE:"Rinse",DRYING:"Drying",UNAVAILABLE:"\u2013"},phase_long:{PREWASH:"Prewash",MAINWASH:"Main wash",COLDRINSE:"Cold rinse",HOTRINSE:"Hot rinse",EXTRARINSE:"Extra rinse",DRYING:"Drying",ADO_DRYING:"AirDry drying",UNAVAILABLE:"No active phase"},program:{ECO:"Eco",AUTO:"Auto",QUICK30:"Quick 30",QUICK60:"1h00m",NORMAL90:"1h30m","120_MIN":"2h00m",RINSE:"Rinse & Hold",MACHINE_CARE:"MachineCare"},program_hint:{ECO:"Normally soiled load, most efficient water and energy use.",AUTO:"Any soil level, the machine senses load and soiling.",QUICK30:"Freshly soiled load, no drying phase.",QUICK60:"Fresh, lightly dried-on soiling.",NORMAL90:"Normal, lightly dried-on soiling, pots included.","120_MIN":"Normal, dried-on soiling, pots and pans.",RINSE:"Refreshes dishes waiting for a full cycle. No detergent!",MACHINE_CARE:"Cleans the inside of the machine from limescale and grease."},option:{xtra_dry:"ExtraDry",extra_power:"ExtraPower",extra_silent:"ExtraSilent",glass_care:"GlassCare",sanitize:"Sanitize",spray_zone:"SprayZone",zone_clean:"ZoneClean",one_rack:"One rack",auto_door_opener:"AutoOpen door"},option_hint:{xtra_dry:"Stronger drying at the end of the program.",extra_power:"More powerful wash for stubborn soiling.",extra_silent:"Quieter operation, longer program.",glass_care:"Protects glassware, max. 45 \xB0C.",sanitize:"Extra sanitising rinse.",spray_zone:"Focused spray in the lower basket.",zone_clean:"Intensive lower basket, gentle upper basket.",one_rack:"Washes a single basket only.",auto_door_opener:"Opens the door automatically at the end of the cycle."},command:{on:"Turn on",off:"Turn off",start:"Start",pause:"Pause",resume:"Resume",stopreset:"Stop"},alert:{DISH_ALARM_SALT_MISSING:"Salt container needs refilling",DISH_ALARM_RINSE_AID_LOW:"Rinse aid dispenser is empty",DISH_ALARM_I10:"i10 \u2013 the appliance does not fill with water. Check the tap and the filter.",DISH_ALARM_I11:"i11 \u2013 the appliance does not fill with water. Check the tap and the filter.",DISH_ALARM_I20:"i20 \u2013 the appliance does not drain. Check the siphon and the filters.",DISH_ALARM_I30:"i30 \u2013 anti-flood device triggered. Close the water tap!",DISH_ALARM_IF1:"iF1 \u2013 water level inside the appliance is too high."},alert_generic:"Alert",ui:{remaining:"Remaining",ready_at:"Ready at",starts_at:"Starts at",start_in:"Start in",door:"Door",door_open:"Door is open",door_closed:"Door closed",program:"Program",options:"Options",no_options:"This program has no selectable options.",delay:"Delayed start",delay_off:"None",delay_cancel:"Cancel",delay_amount:"Delay",ready_by:"Ready by",ready_by_hint:"Pick when it should be done and press the tick - the card works out the delay, rounded down to 10 minutes.",ready_by_apply:"Work out the delay",ready_by_too_soon:"That is too soon, the earliest finish is",ready_by_max:"The appliance accepts at most 24 hours, so it was set to that",ready_by_set:"Delay set",scores:"Efficiency",scores_updating:"updating\u2026",eco_score:"Eco",energy_score:"Energy",water_score:"Water",consumption:"Estimated use",water:"Water",energy:"Energy",duration:"Duration",details:"Details",appliance_settings:"Appliance settings",brightness:"Display brightness",floor_light:"TimeOnFloor",floor_light_hint:"Projects the remaining time onto the floor.",end_sound:"End of cycle sound",end_sound_hint:"Beeps when the program finishes.",key_tone:"Key tone",key_tone_hint:"Sound of the control panel buttons.",brightness_hint:"Brightness of the appliance display (0-9).",remote:"Remote control",remote_on:"Enabled",remote_off:"Disabled",remote_locked:"Temporarily locked",cycles:"Total cycles",wifi:"Wi-Fi signal",eco_mode:"Eco mode",rinse_aid:"Rinse aid level",water_hardness:"Water hardness",offline:"The appliance is offline",unavailable:"The appliance entities are unavailable",not_configured:"No Electrolux dishwasher found. Set the device or prefix option in the card configuration.",remote_disabled_hint:"Enable remote start on the appliance to control it.",minute_short:"m",hour_short:"h",finished:"The cycle has finished",finished_hint:"Ready to unload",more:"More",less:"Less",just_now:"less than a minute"},editor:{device:"Device",device_auto:"Auto detect",name:"Name",language:"Language",language_auto:"Automatic (HA language)",sections:"Visible sections",show_programs:"Program picker",show_options:"Options",show_delay:"Delayed start",show_scores:"Efficiency scores",show_consumption:"Consumption figures",show_appliance_settings:"Appliance settings",show_details:"Details",show_controls:"Control buttons",compact:"Compact layout",animate:"Animations"}},m0={hu:BC,en:PC},T5=Object.keys(m0);function k2(t,C){return T(t,C,T5)}function O2(t){return $(m0,t)}function O(t){return t==null?"":String(t).toUpperCase().replace(/[\s\-.]+/g,"_").replace(/_+/g,"_")}function x(t){return!t||t.state==="unavailable"||t.state==="unknown"}function NC(t){if(!t.length)return null;let C=t[0];for(let e of t.slice(1)){let H=0;for(;H<C.length&&H<e.length&&C[H]===e[H];)H+=1;C=C.slice(0,H)}return C.replace(/_+$/,"")||null}function E2(t,C,e){if(C?.prefix)return C.prefix;let H=new RegExp(`^${e.domain}\\..+_${e.suffix}$`),V=a=>a.replace(new RegExp(`^${e.domain}\\.`),"").replace(new RegExp(`_${e.suffix}$`),"");if(C?.device&&t?.entities){let a=Object.values(t.entities).find(M=>M.device_id===C.device&&H.test(M.entity_id));if(a)return V(a.entity_id);let o=Object.values(t.entities).filter(M=>M.device_id===C.device).map(M=>M.entity_id.split(".")[1]);if(o.length)return NC(o)}let r=C?.entities?.[e.key];if(r)return V(r);let L=Object.keys(t?.states||{}).filter(a=>H.test(a));return L.length===1?V(L[0]):null}function c0(t,C,e,H){if(!H||!t?.entities)return C;for(let[V,r]of Object.entries(e)){if(C[V]||!r)continue;let[L,a]=r,o=Object.values(t.entities).find(M=>M.device_id===H&&M.entity_id.startsWith(`${L}.`)&&M.entity_id.endsWith(`_${a}`)&&t.states?.[M.entity_id]);o&&(C[V]=o.entity_id)}return C}function u0(t,C){for(let e of C){let H=t?.entities?.[e]?.device_id;if(H)return H}return null}function T2(t,C,e,H){let V=C?.entities||{},r={};for(let L of new Set([...Object.keys(e),...Object.keys(V)])){let a=V[L];if(a){r[L]=a;continue}let o=e[L];if(!o||!H)continue;let M=`${o[0]}.${H}_${o[1]}`;t?.states?.[M]&&(r[L]=M)}return r}function $2(t,C){if(!t?.entities||!t?.devices)return[];let e=new RegExp(`^${C.domain}\\..+_${C.suffix}$`),H=new Map;for(let V of Object.values(t.entities)){if(!V.device_id||!e.test(V.entity_id))continue;let r=t.devices[V.device_id];r&&H.set(V.device_id,r.name_by_user||r.name||V.device_id)}return[...H.entries()].map(([V,r])=>({id:V,name:r}))}var x0={domain:"sensor",suffix:"appliance_state",key:"appliance_state"},v0={appliance_state:["sensor","appliance_state"],cycle_phase:["sensor","cycle_phase"],time_to_end:["sensor","time_to_end"],alerts:["sensor","alerts"],eco_score:["sensor","eco_score"],energy_score:["sensor","energy_score"],water_score:["sensor","water_score"],total_cycle_counter:["sensor","total_cycle_counter"],remote_control:["sensor","remote_control"],link_quality:["sensor","network_interface_link_quality_indicator"],door_state:["binary_sensor","door_state"],salt_missing:["binary_sensor","salt_missing"],rinse_aid_low:["binary_sensor","rinse_aid_low"],connectivity:["binary_sensor","connectivity_state"],eco_mode:["binary_sensor","miscellaneous_state_eco_mode"],program:["select","program_uid"],water_hardness:["select","water_hardness"],display_light:["select","display_light"],display_on_floor:["select","display_on_floor"],end_of_cycle_sound:["select","end_of_cycle_sound"],key_tone:["switch","key_tone"],start_time:["number","start_time"],rinse_aid_level:["number","rinse_aid_level"],cmd_on:["button","execute_command_on"],cmd_off:["button","execute_command_off"],cmd_start:["button","execute_command_start"],cmd_pause:["button","execute_command_pause"],cmd_resume:["button","execute_command_resume"],cmd_stopreset:["button","execute_command_stopreset"]},FC=["xtra_dry_option","extra_power_option","extra_silent_option","glass_care_option","sanitize_option","spray_zone_option","zone_clean_option","one_rack_option","auto_door_opener"];function DC(t,C){return E2(t,C,x0)}function h0(t,C){let e=DC(t,C),H=T2(t,C,v0,e),V=C?.device||u0(t,Object.values(H));if(c0(t,H,v0,V),H.device=V||null,H.options={},e)for(let r of FC){let L=`switch.${e}_${r}`;t?.states?.[L]&&(H.options[r]=L)}return H.prefix=e,H}function R2(t){return $2(t,x0)}var S0="aeg-dishwasher-card:progress";function w1(t){if(x(t))return null;let C=Number(t.state);return Number.isFinite(C)?C:null}function zC(t){let C=w1(t);if(C===null||C<0)return null;let e=(t.attributes?.unit_of_measurement||"").toLowerCase();return e==="s"||e==="sec"||e==="seconds"?Math.round(C/60):e==="h"?Math.round(C*60):e?Math.round(C):C>1e3?Math.round(C/60):Math.round(C)}var f0=["NONE","OFF","OK","0","UNKNOWN","UNAVAILABLE"];function IC(t){if(x(t))return[];let C=t.attributes||{},e=Object.entries(C).filter(([a,o])=>/^[A-Z][A-Z0-9_]*$/.test(a)&&typeof o=="string").filter(([,a])=>!f0.includes(O(a).split("-")[0])).map(([a,o])=>({code:O(a),severity:O(String(o).split("-")[0])}));if(e.length)return e;let H=C.alerts??C.alert_list??t.state,V=[];Array.isArray(H)?V=H.map(a=>typeof a=="string"?a:a?.code):typeof H=="string"&&!/^\d+$/.test(H.trim())&&(V=H.split(/[,;]/));let r=V.map(a=>O(a)).filter(a=>a&&!f0.includes(a)).map(a=>({code:a,severity:""}));if(r.length)return r;let L=Number(t.state);return Number.isFinite(L)&&L>0?[{code:"",severity:"",count:L}]:[]}function WC(t){if(!t)return null;let C=t.attributes||{},e=String(C.unit_of_measurement||"").toLowerCase(),H=Number.isFinite(C.max)?C.max:1440,V=e==="s"||e==="sec"||e==="seconds"||!e&&H>5e3,r=w1(t);return{raw:r,seconds:V,step:Number.isFinite(C.step)?C.step:V?60:1,min:Number.isFinite(C.min)?C.min:-1,max:H,maxMinutes:V?Math.round(H/60):H,minutes:r===null||r<=0?0:V?Math.round(r/60):r}}function UC(){try{return JSON.parse(window.localStorage.getItem(S0)||"{}")}catch{return{}}}function g0(t){try{window.localStorage.setItem(S0,JSON.stringify(t))}catch{}}function GC(t,C,e,H){let V=e===u.RUNNING||e===u.PAUSED,r=UC(),L=r[t];if(!V)return L&&e!==u.DELAYED_START&&(delete r[t],g0(r)),{progress:e===u.END_OF_CYCLE?1:0,total:null};if(H===null)return{progress:0,total:null};let a=z[C]?.duration||0,o=L&&L.program===C,M=Math.max(H,a,o?L.total:0);return(!o||M!==L.total)&&(r[t]={program:C,total:M},g0(r)),{progress:M?Math.min(1,Math.max(0,1-H/M)):0,total:M}}function Z0(t,C){if(x(t))return null;let e=t.attributes?.options||[],H=L=>C.includes(O(L)),V=e.find(H)||null,r=e.find(L=>!H(L))||null;return!V||!r?null:{on:!H(t.state),onOption:r,offOption:V}}function jC(t){if(x(t))return null;let C=V=>{let r=String(V).match(/(\d+)\s*$/);return r?Number(r[1]):null},e=(t.attributes?.options||[]).map(V=>({label:V,value:C(V)})).filter(V=>V.value!==null).sort((V,r)=>V.value-r.value);if(!e.length)return null;let H=e.find(V=>V.label===t.state);return{levels:e,value:H?H.value:C(t.state),min:e[0].value,max:e[e.length-1].value}}function _0(t,C){let e=h0(t,C),H=E=>e[E]?t.states[e[E]]:void 0,V=H("appliance_state");if(!e.prefix||!V)return{ok:!1,reason:e.prefix?"unavailable":"not_configured",entities:e};let r=O(V.state)in u?O(V.state):u.UNKNOWN,L=H("program"),a=O(L?.state),o=z[a]?a:null,M=O(H("cycle_phase")?.state)||"UNAVAILABLE",n=s0[M]||null,l=zC(H("time_to_end")),{progress:d}=GC(e.prefix,o,r,l),p=WC(H("start_time")),c=p?p.minutes:0,h=H("door_state"),m=h?h.state==="on":null,g=H("connectivity"),A=g?g.state==="on":!0,y=O(H("remote_control")?.state),_=y===""||y.includes("ENABLED"),S=z[o]?.duration||0,f=l!==null&&l>0?l:null,P=null;if(r===u.RUNNING||r===u.PAUSED)P=l;else if(r===u.DELAYED_START)P=f!==null&&f>c?f:S?c+S:null;else if(r===u.IDLE||r===u.READY_TO_START){let E=f!==null?f:S||null;P=E===null?null:E+c}let U=P!==null?new Date(Date.now()+P*6e4):null,X=c?new Date(Date.now()+c*6e4):null,N1=l0.map(E=>{let k5=e.options?.[E.entity],o0=k5?t.states[k5]:void 0;return{...E,entityId:k5,on:o0?.state==="on",exists:!!o0,supported:!E.programs||!o||E.programs.includes(o)}}).filter(E=>E.exists),K=(L?.attributes?.options||[]).map(E=>({label:E,key:O(E)}));return{ok:!0,entities:e,state:r,accent:n0[r]||"idle",phase:M,step:n,program:o,programRaw:L?.state||null,programOptions:K,remaining:l,minutesToFinish:P,progress:d,finishAt:U,startAt:X,delay:c,delayControl:p,delayEntity:e.start_time,doorOpen:m,online:A,remote:y,remoteEnabled:_,alerts:IC(H("alerts")),consumables:{salt:H("salt_missing")?H("salt_missing").state==="on":null,rinseAid:H("rinse_aid_low")?H("rinse_aid_low").state==="on":null},scores:{eco:w1(H("eco_score")),energy:w1(H("energy_score")),water:w1(H("water_score"))},cycles:w1(H("total_cycle_counter")),linkQuality:O(H("link_quality")?.state),ecoMode:H("eco_mode")?.state==="on",rinseAid:w1(H("rinse_aid_level")),waterHardness:H("water_hardness")?.state||null,settings:{brightness:jC(H("display_light")),floorLight:Z0(H("display_on_floor"),["OFF"]),endSound:Z0(H("end_of_cycle_sound"),["NO_SOUND","OFF"]),keyTone:e.key_tone?{on:H("key_tone")?.state==="on"}:null},options:N1,name:C.name||V.attributes?.friendly_name?.replace(/\s*Appliance state$/i,"")||null}}function y0(t,C,e,H,V){return[`M${t+V},${C}`,`H${t+e-V}`,`A${V},${V} 0 0 1 ${t+e},${C+V}`,`V${C+H-V}`,`A${V},${V} 0 0 1 ${t+e-V},${C+H}`,`H${t+V}`,`A${V},${V} 0 0 1 ${t},${C+H-V}`,`V${C+V}`,`A${V},${V} 0 0 1 ${t+V},${C}`,"Z"].join(" ")}var KC=`${y0(8,6,164,202,18)} ${y0(26,52,128,136,12)}`;function b0(){return`
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
      <path class="door-panel" d="${KC}" fill-rule="evenodd"/>
      <rect class="panel-strip" x="18" y="14" width="144" height="28" rx="10"/>
      <circle class="led-ring" cx="32" cy="28" r="7"/>
      <circle class="led" cx="32" cy="28" r="4"/>
      <rect class="display" x="60" y="19" width="60" height="18" rx="6"/>
      <text class="display-text" x="90" y="32" text-anchor="middle">--:--</text>
      <rect class="handle" x="18" y="196" width="144" height="7" rx="3.5"/>
    </g>
  </svg>`}function w0(t,C){let e=t.querySelector(".display-text");e&&e.textContent!==C&&(e.textContent=C)}var k0="M6.59,0.66C8.93,-1.15 11.47,1.06 12.04,4.5C12.47,4.5 12.89,4.62 13.27,4.84C13.79,4.24 14.25,3.42 14.07,2.5C13.65,0.35 16.06,-1.39 18.35,1.58C20.16,3.92 17.95,6.46 14.5,7.03C14.5,7.46 14.39,7.89 14.16,8.27C14.76,8.78 15.58,9.24 16.5,9.06C18.63,8.64 20.38,11.04 17.41,13.34C15.07,15.15 12.53,12.94 11.96,9.5C11.53,9.5 11.11,9.37 10.74,9.15C10.22,9.75 9.75,10.58 9.93,11.5C10.35,13.64 7.94,15.39 5.65,12.42C3.83,10.07 6.05,7.53 9.5,6.97C9.5,6.54 9.63,6.12 9.85,5.74C9.25,5.23 8.43,4.76 7.5,4.94C5.37,5.36 3.62,2.96 6.59,0.66M5,16H7A2,2 0 0,1 9,18V24H7V22H5V24H3V18A2,2 0 0,1 5,16M5,18V20H7V18H5M12.93,16H15L12.07,24H10L12.93,16M18,16H21V18H18V22H21V24H18A2,2 0 0,1 16,22V18A2,2 0 0,1 18,16Z",$5="M19,18.31V20A2,2 0 0,1 17,22H7A2,2 0 0,1 5,20V16.3C4.54,16.12 3.95,16 3,16A1,1 0 0,1 2,15A1,1 0 0,1 3,14C3.82,14 4.47,14.08 5,14.21V12.3C4.54,12.12 3.95,12 3,12A1,1 0 0,1 2,11A1,1 0 0,1 3,10C3.82,10 4.47,10.08 5,10.21V8.3C4.54,8.12 3.95,8 3,8A1,1 0 0,1 2,7A1,1 0 0,1 3,6C3.82,6 4.47,6.08 5,6.21V4A2,2 0 0,1 7,2H17A2,2 0 0,1 19,4V6.16C20.78,6.47 21.54,7.13 21.71,7.29C22.1,7.68 22.1,8.32 21.71,8.71C21.32,9.1 20.8,9.09 20.29,8.71V8.71C20.29,8.71 19.25,8 17,8C15.74,8 14.91,8.41 13.95,8.9C12.91,9.41 11.74,10 10,10C9.64,10 9.31,10 9,9.96V7.95C9.3,8 9.63,8 10,8C11.26,8 12.09,7.59 13.05,7.11C14.09,6.59 15.27,6 17,6V4H7V20H17V18C18.5,18 18.97,18.29 19,18.31M17,10C15.27,10 14.09,10.59 13.05,11.11C12.09,11.59 11.26,12 10,12C9.63,12 9.3,12 9,11.95V13.96C9.31,14 9.64,14 10,14C11.74,14 12.91,13.41 13.95,12.9C14.91,12.42 15.74,12 17,12C19.25,12 20.29,12.71 20.29,12.71V12.71C20.8,13.1 21.32,13.1 21.71,12.71C22.1,12.32 22.1,11.69 21.71,11.29C21.5,11.08 20.25,10 17,10M17,14C15.27,14 14.09,14.59 13.05,15.11C12.09,15.59 11.26,16 10,16C9.63,16 9.3,16 9,15.95V17.96C9.31,18 9.64,18 10,18C11.74,18 12.91,17.41 13.95,16.9C14.91,16.42 15.74,16 17,16C19.25,16 20.29,16.71 20.29,16.71V16.71C20.8,17.1 21.32,17.1 21.71,16.71C22.1,16.32 22.1,15.69 21.71,15.29C21.5,15.08 20.25,14 17,14Z";var O0="M13,13H11V7H13M13,17H11V15H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z";var E0="M12,2L1,21H23M12,6L19.53,19H4.47M11,10V14H13V10M11,16V18H13V16";var T0="M13,9V15H16L12,19L8,15H11V9H8L12,5L16,9H13M4,2H20V4H4V2M4,20H20V22H4V20Z";var $0="M6 14H9L5 18L1 14H4C4 11.3 5.7 6.6 11 6.1V8.1C7.6 8.6 6 11.9 6 14M20 14C20 11.3 18.3 6.6 13 6.1V8.1C16.4 8.7 18 11.9 18 14H15L19 18L23 14H20Z";var R0="M12,6V9L16,5L12,1V4A8,8 0 0,0 4,12C4,13.57 4.46,15.03 5.24,16.26L6.7,14.8C6.25,13.97 6,13 6,12A6,6 0 0,1 12,6M18.76,7.74L17.3,9.2C17.74,10.04 18,11 18,12A6,6 0 0,1 12,18V15L8,19L12,23V20A8,8 0 0,0 20,12C20,10.43 19.54,8.97 18.76,7.74Z";var B0="M9.5 18V9H8V18M12.75 18V9H11.25V18M16 18V9H14.5V18M17.03 6C18.11 6 19 6.88 19 8V19C19 20.13 18.11 21 17.03 21C17.03 21.58 16.56 22 16 22C15.5 22 15 21.58 15 21H9C9 21.58 8.5 22 8 22C7.44 22 6.97 21.58 6.97 21C5.89 21 5 20.13 5 19V8C5 6.88 5.89 6 6.97 6H9V3C9 2.42 9.46 2 10 2H14C14.54 2 15 2.42 15 3V6M10.5 3.5V6H13.5V3.5M17.03 19V8H6.97V19";var P0="M16,20H8V6H16M16.67,4H15V2H9V4H7.33A1.33,1.33 0 0,0 6,5.33V20.67C6,21.4 6.6,22 7.33,22H16.67A1.33,1.33 0 0,0 18,20.67V5.33C18,4.6 17.4,4 16.67,4Z";var N0="M10,21H14A2,2 0 0,1 12,23A2,2 0 0,1 10,21M21,19V20H3V19L5,17V11C5,7.9 7.03,5.17 10,4.29C10,4.19 10,4.1 10,4A2,2 0 0,1 12,2A2,2 0 0,1 14,4C14,4.1 14,4.19 14,4.29C16.97,5.17 19,7.9 19,11V17L21,19M17,11A5,5 0 0,0 12,6A5,5 0 0,0 7,11V18H17V11M19.75,3.19L18.33,4.61C20.04,6.3 21,8.6 21,11H23C23,8.07 21.84,5.25 19.75,3.19M1,11H3C3,8.6 3.96,6.3 5.67,4.61L4.25,3.19C2.16,5.25 1,8.07 1,11Z";var F0="M12,18V6A6,6 0 0,1 18,12A6,6 0 0,1 12,18M20,15.31L23.31,12L20,8.69V4H15.31L12,0.69L8.69,4H4V8.69L0.69,12L4,15.31V20H8.69L12,23.31L15.31,20H20V15.31Z";var D0="M19.36,2.72L20.78,4.14L15.06,9.85C16.13,11.39 16.28,13.24 15.38,14.44L9.06,8.12C10.26,7.22 12.11,7.37 13.65,8.44L19.36,2.72M5.93,17.57C3.92,15.56 2.69,13.16 2.35,10.92L7.23,8.83L14.67,16.27L12.58,21.15C10.34,20.81 7.94,19.58 5.93,17.57Z";var z0="M7 11H9V13H7V11M21 5V19C21 20.11 20.11 21 19 21H5C3.89 21 3 20.1 3 19V5C3 3.9 3.9 3 5 3H6V1H8V3H16V1H18V3H19C20.11 3 21 3.9 21 5M5 7H19V5H5V7M19 19V9H5V19H19M15 13V11H17V13H15M11 13V11H13V13H11M7 15H9V17H7V15M15 17V15H17V17H15M11 17V15H13V17H11Z";var I0="M6,11L7,7H17L18,11M18.92,6C18.71,5.4 18.14,5 17.5,5H6.5C5.86,5 5.29,5.4 5.08,6L3,12V20A1,1 0 0,0 4,21H5A1,1 0 0,0 6,20V18H18V20A1,1 0 0,0 19,21H20A1,1 0 0,0 21,20V12L18.92,6M7,16H5V14H7V16M19,16H17V14H19V16M14,16H10V14H14V16Z",W0="M4,3V6H1V20H23V6H20V3H14V6H10V3H4M3,8H21V18H3V8M15,10V12H13V14H15V16H17V14H19V12H17V10H15M5,12V14H11V12H5Z";var U0="M12,3C7,3 3,7 3,12C3,17 7,21 12,21C17,21 21,17 21,12C21,7 17,3 12,3M12,19C8.1,19 5,15.9 5,12C5,8.1 8.1,5 12,5C15.9,5 19,8.1 19,12C19,15.9 15.9,19 12,19M20.5,20.5C22.7,18.3 24,15.3 24,12C24,8.7 22.7,5.7 20.5,3.5L19.4,4.6C21.3,6.5 22.5,9.1 22.5,12C22.5,14.9 21.3,17.5 19.4,19.4L20.5,20.5M4.6,19.4C2.7,17.5 1.5,14.9 1.5,12C1.5,9.1 2.7,6.5 4.6,4.6L3.5,3.5C1.3,5.7 0,8.7 0,12C0,15.3 1.3,18.3 3.5,20.5L4.6,19.4M9.5,7V17H11.5V13H13.5A2,2 0 0,0 15.5,11V9A2,2 0 0,0 13.5,7H9.5M11.5,9H13.5V11H11.5V9Z";var G0="M23 8C23 4.13 19.87 1 16 1C12.47 1 9.57 3.61 9.08 7H4.5C3.84 7 3.28 7.42 3.08 8L1 14V22C1 22.55 1.45 23 2 23H3C3.55 23 4 22.55 4 22V21H16V22C16 22.55 16.45 23 17 23H18C18.55 23 19 22.55 19 22V14.32C21.36 13.19 23 10.79 23 8M4.5 8.5H9.03C9.15 10.26 9.92 11.84 11.11 13H3L4.5 8.5M4.5 18C3.67 18 3 17.33 3 16.5S3.67 15 4.5 15 6 15.67 6 16.5 5.33 18 4.5 18M15.5 18C14.67 18 14 17.33 14 16.5S14.67 15 15.5 15 17 15.67 17 16.5 16.33 18 15.5 18M16 13C14.61 13 13.44 12.5 12.47 11.53C11.5 10.56 11 9.39 11 8C11 6.64 11.5 5.46 12.47 4.5C13.44 3.5 14.61 3 16 3C17.36 3 18.54 3.5 19.5 4.5C20.5 5.46 21 6.64 21 8C21 9.39 20.5 10.56 19.5 11.53C18.54 12.5 17.36 13 16 13M16.5 8.25L19.36 9.94L18.61 11.16L15 9V4H16.5V8.25Z";var j0="M6.5 5C5.84 5 5.28 5.42 5.08 6L3 12V20A1 1 0 0 0 4 21H5A1 1 0 0 0 6 20V19H11.3A7 7 0 0 1 11 17A7 7 0 0 1 14.41 11H5L6.5 6.5H17.5L18.68 10.03A7 7 0 0 1 20.47 10.46L18.92 6C18.72 5.42 18.16 5 17.5 5H6.5M17 12C16.87 12 16.76 12.09 16.74 12.21L16.55 13.53C16.25 13.66 15.96 13.82 15.7 14L14.46 13.5C14.35 13.5 14.22 13.5 14.15 13.63L13.15 15.36C13.09 15.47 13.11 15.6 13.21 15.68L14.27 16.5C14.25 16.67 14.24 16.83 14.24 17C14.24 17.17 14.25 17.33 14.27 17.5L13.21 18.32C13.12 18.4 13.09 18.53 13.15 18.64L14.15 20.37C14.21 20.5 14.34 20.5 14.46 20.5L15.7 20C15.96 20.18 16.24 20.35 16.55 20.47L16.74 21.79C16.76 21.91 16.86 22 17 22H19C19.11 22 19.22 21.91 19.24 21.79L19.43 20.47C19.73 20.34 20 20.18 20.27 20L21.5 20.5C21.63 20.5 21.76 20.5 21.83 20.37L22.83 18.64C22.89 18.53 22.86 18.4 22.77 18.32L21.7 17.5C21.72 17.33 21.74 17.17 21.74 17C21.74 16.83 21.73 16.67 21.7 16.5L22.76 15.68C22.85 15.6 22.88 15.47 22.82 15.36L21.82 13.63C21.76 13.5 21.63 13.5 21.5 13.5L20.27 14C20 13.82 19.73 13.65 19.42 13.53L19.23 12.21C19.22 12.09 19.11 12 19 12H17M6.5 13A1.5 1.5 0 0 1 8 14.5A1.5 1.5 0 0 1 6.5 16A1.5 1.5 0 0 1 5 14.5A1.5 1.5 0 0 1 6.5 13M18 15.5C18.83 15.5 19.5 16.17 19.5 17C19.5 17.83 18.83 18.5 18 18.5C17.16 18.5 16.5 17.83 16.5 17C16.5 16.17 17.17 15.5 18 15.5Z",K0="M5,14H19L17.5,9.5H6.5L5,14M17.5,19A1.5,1.5 0 0,0 19,17.5A1.5,1.5 0 0,0 17.5,16A1.5,1.5 0 0,0 16,17.5A1.5,1.5 0 0,0 17.5,19M6.5,19A1.5,1.5 0 0,0 8,17.5A1.5,1.5 0 0,0 6.5,16A1.5,1.5 0 0,0 5,17.5A1.5,1.5 0 0,0 6.5,19M18.92,9L21,15V23A1,1 0 0,1 20,24H19A1,1 0 0,1 18,23V22H6V23A1,1 0 0,1 5,24H4A1,1 0 0,1 3,23V15L5.08,9C5.28,8.42 5.85,8 6.5,8H17.5C18.15,8 18.72,8.42 18.92,9M12,0C14.12,0 16.15,0.86 17.65,2.35L16.23,3.77C15.11,2.65 13.58,2 12,2C10.42,2 8.89,2.65 7.77,3.77L6.36,2.35C7.85,0.86 9.88,0 12,0M12,4C13.06,4 14.07,4.44 14.82,5.18L13.4,6.6C13.03,6.23 12.53,6 12,6C11.5,6 10.97,6.23 10.6,6.6L9.18,5.18C9.93,4.44 10.94,4 12,4Z",Q0="M16,6L15,6.75L17.5,10H13.5V8.5H12V10H3C1.89,10 1,10.89 1,12V15H3A3,3 0 0,0 6,18A3,3 0 0,0 9,15H15A3,3 0 0,0 18,18A3,3 0 0,0 21,15H23V12C23,10.89 22.11,10 21,10H19L16,6M6,13.5A1.5,1.5 0 0,1 7.5,15A1.5,1.5 0 0,1 6,16.5A1.5,1.5 0 0,1 4.5,15A1.5,1.5 0 0,1 6,13.5M18,13.5A1.5,1.5 0 0,1 19.5,15A1.5,1.5 0 0,1 18,16.5A1.5,1.5 0 0,1 16.5,15A1.5,1.5 0 0,1 18,13.5Z";var Y0="M19,14H16V16H19V14M22,21H3V11L11,3H21A1,1 0 0,1 22,4V21M11.83,5L5.83,11H20V5H11.83Z";var q0="M3,6H16L19,10H21C22.11,10 23,10.89 23,12V15H21A3,3 0 0,1 18,18A3,3 0 0,1 15,15H9A3,3 0 0,1 6,18A3,3 0 0,1 3,15H1V8C1,6.89 1.89,6 3,6M2.5,7.5V10H10.5V7.5H2.5M12,7.5V10H17.14L15.25,7.5H12M6,13.5A1.5,1.5 0 0,0 4.5,15A1.5,1.5 0 0,0 6,16.5A1.5,1.5 0 0,0 7.5,15A1.5,1.5 0 0,0 6,13.5M18,13.5A1.5,1.5 0 0,0 16.5,15A1.5,1.5 0 0,0 18,16.5A1.5,1.5 0 0,0 19.5,15A1.5,1.5 0 0,0 18,13.5Z";var X0="M13,4.8C9,4.8 9,19.2 13,19.2C17,19.2 22,16.5 22,12C22,7.5 17,4.8 13,4.8M13.1,17.2C12.7,16.8 12,15 12,12C12,9 12.7,7.2 13.1,6.8C16,6.9 20,8.7 20,12C20,15.3 16,17.1 13.1,17.2M2,5H9.5C9.3,5.4 9,5.8 8.9,6.4C8.8,6.6 8.8,6.8 8.7,7H2V5M8,11H2V9H8.2C8.1,9.6 8.1,10.3 8,11M8.7,17C8.9,17.8 9.2,18.4 9.6,19H2.1V17H8.7M8.2,15H2V13H8C8.1,13.7 8.1,14.4 8.2,15Z";var J0="M18 15C18 17.6 16.8 19.9 14.9 21.3L14.4 20.8L12.3 18.7L13.7 17.3L14.9 18.5C15.4 17.8 15.8 16.9 15.9 16H14V14H15.9C15.7 13.1 15.4 12.3 14.9 11.5L13.7 12.7L12.3 11.3L13.5 10.1C12.8 9.6 11.9 9.2 11 9.1V11H9V9.1C8.1 9.3 7.3 9.6 6.5 10.1L9.5 13.1C9.7 13.1 9.8 13 10 13C11.11 13 12 13.9 12 15S11.11 17 10 17 8 16.11 8 15C8 14.8 8 14.7 8.1 14.5L5.1 11.5C4.6 12.2 4.2 13.1 4.1 14H6V16H4.1C4.3 16.9 4.6 17.7 5.1 18.5L6.3 17.3L7.7 18.7L5.1 21.3C3.2 19.9 2 17.6 2 15C2 10.58 5.58 7 10 7S18 10.58 18 15M23 5C23 3.34 21.66 2 20 2S17 3.34 17 5C17 6.3 17.84 7.4 19 7.82V11H21V7.82C22.16 7.4 23 6.3 23 5M20 6C19.45 6 19 5.55 19 5S19.45 4 20 4 21 4.45 21 5 20.55 6 20 6Z";var C7="M16,10L15.8,11H13.5A0.5,0.5 0 0,0 13,11.5A0.5,0.5 0 0,0 13.5,12H15.6L14.6,17H12.5A0.5,0.5 0 0,0 12,17.5A0.5,0.5 0 0,0 12.5,18H14.4L14,20A2,2 0 0,1 12,22A2,2 0 0,1 10,20L9,15H10.5A0.5,0.5 0 0,0 11,14.5A0.5,0.5 0 0,0 10.5,14H8.8L8,10C8,8.8 8.93,7.77 10.29,7.29L8.9,5.28C8.59,4.82 8.7,4.2 9.16,3.89C9.61,3.57 10.23,3.69 10.55,4.14L11,4.8V3A1,1 0 0,1 12,2A1,1 0 0,1 13,3V5.28L14.5,3.54C14.83,3.12 15.47,3.07 15.89,3.43C16.31,3.78 16.36,4.41 16,4.84L13.87,7.35C15.14,7.85 16,8.85 16,10Z";var e7="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z";var H7="M12.5,1.5C10.73,1.5 9.17,2.67 8.67,4.37C8.14,4.13 7.58,4 7,4A4,4 0 0,0 3,8C3,9.82 4.24,11.41 6,11.87V19H19V11.87C20.76,11.41 22,9.82 22,8A4,4 0 0,0 18,4C17.42,4 16.86,4.13 16.33,4.37C15.83,2.67 14.27,1.5 12.5,1.5M12,10.5H13V17.5H12V10.5M9,12.5H10V17.5H9V12.5M15,12.5H16V17.5H15V12.5M6,20V21A1,1 0 0,0 7,22H18A1,1 0 0,0 19,21V20H6Z";var V7="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z";var t7="M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z";var r7="M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z";var L7="M4,4H20A2,2 0 0,1 22,6V18A2,2 0 0,1 20,20H4A2,2 0 0,1 2,18V6A2,2 0 0,1 4,4M4,6V18H11V6H4M20,18V6H18.76C19,6.54 18.95,7.07 18.95,7.13C18.88,7.8 18.41,8.5 18.24,8.75L15.91,11.3L19.23,11.28L19.24,12.5L14.04,12.47L14,11.47C14,11.47 17.05,8.24 17.2,7.95C17.34,7.67 17.91,6 16.5,6C15.27,6.05 15.41,7.3 15.41,7.3L13.87,7.31C13.87,7.31 13.88,6.65 14.25,6H13V18H15.58L15.57,17.14L16.54,17.13C16.54,17.13 17.45,16.97 17.46,16.08C17.5,15.08 16.65,15.08 16.5,15.08C16.37,15.08 15.43,15.13 15.43,15.95H13.91C13.91,15.95 13.95,13.89 16.5,13.89C19.1,13.89 18.96,15.91 18.96,15.91C18.96,15.91 19,17.16 17.85,17.63L18.37,18H20M8.92,16H7.42V10.2L5.62,10.76V9.53L8.76,8.41H8.92V16Z";var i7="M21,16.5C21,16.88 20.79,17.21 20.47,17.38L12.57,21.82C12.41,21.94 12.21,22 12,22C11.79,22 11.59,21.94 11.43,21.82L3.53,17.38C3.21,17.21 3,16.88 3,16.5V7.5C3,7.12 3.21,6.79 3.53,6.62L11.43,2.18C11.59,2.06 11.79,2 12,2C12.21,2 12.41,2.06 12.57,2.18L20.47,6.62C20.79,6.79 21,7.12 21,7.5V16.5M12,4.15L6.04,7.5L12,10.85L17.96,7.5L12,4.15M5,15.91L11,19.29V12.58L5,9.21V15.91M19,15.91V9.21L13,12.58V19.29L19,15.91Z";var a7="M18.32,8H5.67L5.23,4H18.77M12,19A3,3 0 0,1 9,16C9,14 12,10.6 12,10.6C12,10.6 15,14 15,16A3,3 0 0,1 12,19M3,2L5,20.23C5.13,21.23 5.97,22 7,22H17C18,22 18.87,21.23 19,20.23L21,2H3Z";var o7="M12,1.5A2.5,2.5 0 0,1 14.5,4A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 9.5,4A2.5,2.5 0 0,1 12,1.5M15.87,5C18,5 20,7 20,9C22.7,9 22.7,13 20,13H4C1.3,13 1.3,9 4,9C4,7 6,5 8.13,5C8.57,6.73 10.14,8 12,8C13.86,8 15.43,6.73 15.87,5M5,15H8L9,22H7L5,15M10,15H14L13,22H11L10,15M16,15H19L17,22H15L16,15Z";var M7="M18,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V4A2,2 0 0,0 18,2M10,4A1,1 0 0,1 11,5A1,1 0 0,1 10,6A1,1 0 0,1 9,5A1,1 0 0,1 10,4M7,4A1,1 0 0,1 8,5A1,1 0 0,1 7,6A1,1 0 0,1 6,5A1,1 0 0,1 7,4M18,20H6V8H18V20M14.67,15.33C14.69,16.03 14.41,16.71 13.91,17.21C12.86,18.26 11.15,18.27 10.09,17.21C9.59,16.71 9.31,16.03 9.33,15.33C9.4,14.62 9.63,13.94 10,13.33C10.37,12.5 10.81,11.73 11.33,11L12,10C13.79,12.59 14.67,14.36 14.67,15.33";var n7="M16,11H18V13H16V11M12,3H19C20.11,3 21,3.89 21,5V19H22V21H2V19H10V5C10,3.89 10.89,3 12,3M12,5V19H19V5H12Z";var s7="M12,3C10.89,3 10,3.89 10,5H3V19H2V21H22V19H21V5C21,3.89 20.11,3 19,3H12M12,5H19V19H12V5M5,11H7V13H5V11Z";var l7="M16,12A2,2 0 0,1 18,10A2,2 0 0,1 20,12A2,2 0 0,1 18,14A2,2 0 0,1 16,12M10,12A2,2 0 0,1 12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12M4,12A2,2 0 0,1 6,10A2,2 0 0,1 8,12A2,2 0 0,1 6,14A2,2 0 0,1 4,12Z";var d7="M19.77,7.23L19.78,7.22L16.06,3.5L15,4.56L17.11,6.67C16.17,7.03 15.5,7.93 15.5,9A2.5,2.5 0 0,0 18,11.5C18.36,11.5 18.69,11.42 19,11.29V18.5A1,1 0 0,1 18,19.5A1,1 0 0,1 17,18.5V14A2,2 0 0,0 15,12H14V5A2,2 0 0,0 12,3H6A2,2 0 0,0 4,5V21H14V13.5H15.5V18.5A2.5,2.5 0 0,0 18,21A2.5,2.5 0 0,0 20.5,18.5V9C20.5,8.31 20.22,7.68 19.77,7.23M18,10A1,1 0 0,1 17,9A1,1 0 0,1 18,8A1,1 0 0,1 19,9A1,1 0 0,1 18,10M8,18V13.5H6L10,6V11H12L8,18Z";var p7="M12,11A1,1 0 0,0 11,12A1,1 0 0,0 12,13A1,1 0 0,0 13,12A1,1 0 0,0 12,11M12.5,2C17,2 17.11,5.57 14.75,6.75C13.76,7.24 13.32,8.29 13.13,9.22C13.61,9.42 14.03,9.73 14.35,10.13C18.05,8.13 22.03,8.92 22.03,12.5C22.03,17 18.46,17.1 17.28,14.73C16.78,13.74 15.72,13.3 14.79,13.11C14.59,13.59 14.28,14 13.88,14.34C15.87,18.03 15.08,22 11.5,22C7,22 6.91,18.42 9.27,17.24C10.25,16.75 10.69,15.71 10.89,14.79C10.4,14.59 9.97,14.27 9.65,13.87C5.96,15.85 2,15.07 2,11.5C2,7 5.56,6.89 6.74,9.26C7.24,10.25 8.29,10.68 9.22,10.87C9.41,10.39 9.73,9.97 10.14,9.65C8.15,5.96 8.94,2 12.5,2Z";var A7="M17.66 11.2C17.43 10.9 17.15 10.64 16.89 10.38C16.22 9.78 15.46 9.35 14.82 8.72C13.33 7.26 13 4.85 13.95 3C13 3.23 12.17 3.75 11.46 4.32C8.87 6.4 7.85 10.07 9.07 13.22C9.11 13.32 9.15 13.42 9.15 13.55C9.15 13.77 9 13.97 8.8 14.05C8.57 14.15 8.33 14.09 8.14 13.93C8.08 13.88 8.04 13.83 8 13.76C6.87 12.33 6.69 10.28 7.45 8.64C5.78 10 4.87 12.3 5 14.47C5.06 14.97 5.12 15.47 5.29 15.97C5.43 16.57 5.7 17.17 6 17.7C7.08 19.43 8.95 20.67 10.96 20.92C13.1 21.19 15.39 20.8 17.03 19.32C18.86 17.66 19.5 15 18.56 12.72L18.43 12.46C18.22 12 17.66 11.2 17.66 11.2M14.5 17.5C14.22 17.74 13.76 18 13.4 18.1C12.28 18.5 11.16 17.94 10.5 17.28C11.69 17 12.4 16.12 12.61 15.23C12.78 14.43 12.46 13.77 12.33 13C12.21 12.26 12.23 11.63 12.5 10.94C12.69 11.32 12.89 11.7 13.13 12C13.9 13 15.11 13.44 15.37 14.8C15.41 14.94 15.43 15.08 15.43 15.23C15.46 16.05 15.1 16.95 14.5 17.5H14.5Z";var m7="M12,20L12.76,17C9.5,16.79 6.59,15.4 5.75,13.58C5.66,14.06 5.53,14.5 5.33,14.83C4.67,16 3.33,16 2,16C3.1,16 3.5,14.43 3.5,12.5C3.5,10.57 3.1,9 2,9C3.33,9 4.67,9 5.33,10.17C5.53,10.5 5.66,10.94 5.75,11.42C6.4,10 8.32,8.85 10.66,8.32L9,5C11,5 13,5 14.33,5.67C15.46,6.23 16.11,7.27 16.69,8.38C19.61,9.08 22,10.66 22,12.5C22,14.38 19.5,16 16.5,16.66C15.67,17.76 14.86,18.78 14.17,19.33C13.33,20 12.67,20 12,20M17,11A1,1 0 0,0 16,12A1,1 0 0,0 17,13A1,1 0 0,0 18,12A1,1 0 0,0 17,11Z";var c7="M7,2V13H10V22L17,10H13L17,2H7Z";var u7="M15 21H17V19H15M19 9H21V7H19M3 5V19C3 20.1 3.9 21 5 21H9V19H5V5H9V3H5C3.9 3 3 3.9 3 5M19 3V5H21C21 3.9 20.1 3 19 3M11 23H13V1H11M19 17H21V15H19M15 5H17V3H15M19 13H21V11H19M19 21C20.1 21 21 20.1 21 19H19Z";var v7="M20.16 12.73C22.93 9.96 22.57 5.26 19.09 3C17.08 1.67 14.39 1.66 12.36 2.97C10.6 4.1 9.63 5.86 9.46 7.68C9.33 9 8.83 10.23 7.91 11.15L7.88 11.18C6.72 12.34 6.72 14.11 7.81 15.19L8.8 16.18C9.89 17.27 11.66 17.27 12.75 16.18C13.72 15.21 15 14.68 16.39 14.53C17.76 14.38 19.1 13.78 20.16 12.73M6.26 19.86C6.53 20.42 6.44 21.1 5.97 21.56C5.39 22.15 4.44 22.15 3.85 21.56C3.58 21.29 3.44 20.94 3.42 20.58C3.06 20.56 2.71 20.42 2.44 20.15C1.85 19.56 1.85 18.61 2.44 18.03C2.9 17.57 3.59 17.47 4.14 17.74L6.62 15.31C6.76 15.5 6.92 15.72 7.1 15.9L8.09 16.89C8.3 17.09 8.5 17.26 8.76 17.41L6.26 19.86Z";var x7="M11.9 2C8 2 4.9 5.4 5 9.3C5.1 11.9 6.6 14.1 8.7 15.2C10.1 15.9 11 17.3 11 18.8V19C11 20.7 12.3 22 14 22C18 22 19 17 19 9C19 9 19 2 11.9 2M14 20C13.4 20 13 19.6 13 19V18.8C13 16.6 11.7 14.5 9.7 13.4C8.1 12.6 7.1 11 7 9.2C7 7.9 7.5 6.5 8.4 5.5C9.3 4.5 10.6 4 11.8 4C16.7 4 17 8.2 17 9C17 18.9 15.3 20 14 20M15.8 7.6L8.3 10.3C8.1 10 8 9.6 8 9.1C8 8.4 8.2 7.8 8.5 7.1L13.7 5.2C14.9 5.8 15.5 6.7 15.8 7.6M12.9 15.1L15.7 14.1C15.6 15.6 15.3 16.7 15.1 17.4L13.8 17.9C13.8 16.9 13.5 16 12.9 15.1M16 9.2C16 10.4 16 11.5 15.9 12.4L11.9 13.9C11.4 13.4 10.8 12.9 10.1 12.6C9.7 12.4 9.3 12.1 9 11.8L16 9.2Z";var h7="M22,18A4,4 0 0,1 18,22H15A4,4 0 0,1 11,18V16H17.79L20.55,11.23L22.11,12.13L19.87,16H22V18M9,22H2C2,19 2,16 2.33,12.83C2.6,10.3 3.08,7.66 3.6,5H3V3H4L7,3H8V5H7.4C7.92,7.66 8.4,10.3 8.67,12.83C9,16 9,19 9,22Z";var f7="M18 11V6H15V4H12V2H8V5H6V11H5L7 22H17L19 11H18M15.86 11C15.7 11.61 15.4 12.16 15 12.62V8.62L17 9.62V11H15.86M17 7V8.5L15 7.5V7H17M12 5H14V8.5L12 9.5V5M12 10.62L14 9.62V13.45C13.41 13.8 12.73 14 12 14V10.62M11 13.86C10.21 13.65 9.5 13.22 9 12.62V9.62L11 8.62V13.86M9 3H11V7.5L10 8V5H9V3M7 6H9V8.5L8 9V11H7V6Z";var g7="M9,21V22H7V21A2,2 0 0,1 5,19V4A2,2 0 0,1 7,2H17A2,2 0 0,1 19,4V19A2,2 0 0,1 17,21V22H15V21H9M7,4V9H17V4H7M7,19H17V11H7V19M8,12H10V15H8V12M8,6H10V8H8V6Z";var Z7="M18,10A1,1 0 0,1 17,9A1,1 0 0,1 18,8A1,1 0 0,1 19,9A1,1 0 0,1 18,10M12,10H6V5H12M19.77,7.23L19.78,7.22L16.06,3.5L15,4.56L17.11,6.67C16.17,7 15.5,7.93 15.5,9A2.5,2.5 0 0,0 18,11.5C18.36,11.5 18.69,11.42 19,11.29V18.5A1,1 0 0,1 18,19.5A1,1 0 0,1 17,18.5V14C17,12.89 16.1,12 15,12H14V5C14,3.89 13.1,3 12,3H6C4.89,3 4,3.89 4,5V21H14V13.5H15.5V18.5A2.5,2.5 0 0,0 18,21A2.5,2.5 0 0,0 20.5,18.5V9C20.5,8.31 20.22,7.68 19.77,7.23Z";var S7="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12C20,14.4 19,16.5 17.3,18C15.9,16.7 14,16 12,16C10,16 8.2,16.7 6.7,18C5,16.5 4,14.4 4,12A8,8 0 0,1 12,4M14,5.89C13.62,5.9 13.26,6.15 13.1,6.54L11.81,9.77L11.71,10C11,10.13 10.41,10.6 10.14,11.26C9.73,12.29 10.23,13.45 11.26,13.86C12.29,14.27 13.45,13.77 13.86,12.74C14.12,12.08 14,11.32 13.57,10.76L13.67,10.5L14.96,7.29L14.97,7.26C15.17,6.75 14.92,6.17 14.41,5.96C14.28,5.91 14.15,5.89 14,5.89M10,6A1,1 0 0,0 9,7A1,1 0 0,0 10,8A1,1 0 0,0 11,7A1,1 0 0,0 10,6M7,9A1,1 0 0,0 6,10A1,1 0 0,0 7,11A1,1 0 0,0 8,10A1,1 0 0,0 7,9M17,9A1,1 0 0,0 16,10A1,1 0 0,0 17,11A1,1 0 0,0 18,10A1,1 0 0,0 17,9Z";var R5="M10,9A1,1 0 0,1 11,8A1,1 0 0,1 12,9V13.47L13.21,13.6L18.15,15.79C18.68,16.03 19,16.56 19,17.14V21.5C18.97,22.32 18.32,22.97 17.5,23H11C10.62,23 10.26,22.85 10,22.57L5.1,18.37L5.84,17.6C6.03,17.39 6.3,17.28 6.58,17.28H6.8L10,19V9M11,5A4,4 0 0,1 15,9C15,10.5 14.2,11.77 13,12.46V11.24C13.61,10.69 14,9.89 14,9A3,3 0 0,0 11,6A3,3 0 0,0 8,9C8,9.89 8.39,10.69 9,11.24V12.46C7.8,11.77 7,10.5 7,9A4,4 0 0,1 11,5Z";var _7="M15.5,21.27L14.66,21.18C13.9,21.11 13.25,20.6 13,19.87C12.47,17.91 12.47,15.83 13,13.87C15.32,13.4 17,11.37 17,9C17,7 15,2 15,2H9C9,2 7,7 7,9C7,11.38 8.67,13.42 11,13.9C11.53,15.86 11.53,17.94 11,19.9C10.76,20.62 10.12,21.13 9.37,21.21L8.5,21.3C8.5,21.3 8,21.28 8,22H16C16,21.28 15.5,21.27 15.5,21.27M9.44,7L10.44,4H13.56L14.56,7H9.44Z";var y7="M10,12A2,2 0 0,0 8,14A2,2 0 0,0 10,16A2,2 0 0,0 12,14A2,2 0 0,0 10,12M6,8A2,2 0 0,0 4,10A2,2 0 0,0 6,12A2,2 0 0,0 8,10A2,2 0 0,0 6,8M6,16A2,2 0 0,0 4,18A2,2 0 0,0 6,20A2,2 0 0,0 8,18A2,2 0 0,0 6,16M18,8A2,2 0 0,0 20,6A2,2 0 0,0 18,4A2,2 0 0,0 16,6A2,2 0 0,0 18,8M14,16A2,2 0 0,0 12,18A2,2 0 0,0 14,20A2,2 0 0,0 16,18A2,2 0 0,0 14,16M18,12A2,2 0 0,0 16,14A2,2 0 0,0 18,16A2,2 0 0,0 20,14A2,2 0 0,0 18,12M14,8A2,2 0 0,0 12,10A2,2 0 0,0 14,12A2,2 0 0,0 16,10A2,2 0 0,0 14,8M10,4A2,2 0 0,0 8,6A2,2 0 0,0 10,8A2,2 0 0,0 12,6A2,2 0 0,0 10,4Z";var b7="M8.06,2C7.88,3.17 8.17,4.16 8.95,4.97C9.45,5.47 9.61,6.14 9.42,7H10.41C10.53,6.45 10.55,6 10.45,5.55C10.36,5.13 10.05,4.63 9.5,4.03C9.05,3.47 8.89,2.8 9.05,2H8.06M10.55,2C10.36,3.17 10.66,4.16 11.44,4.97C11.94,5.47 12.09,6.14 11.91,7H12.89C13,6.45 13.03,6 12.94,5.55C12.84,5.13 12.53,4.63 12,4.03C11.53,3.47 11.38,2.8 11.53,2H10.55M13.08,2C12.89,3.17 13.19,4.16 13.97,4.97C14.47,5.47 14.61,6.14 14.39,7H15.42C15.55,6.45 15.56,6 15.47,5.55C15.38,5.13 15.06,4.63 14.53,4.03C14.06,3.47 13.91,2.8 14.06,2H13.08M5,8C5,9.42 5.39,10.7 6.14,11.84C6.87,12.96 7.91,13.85 9.14,14.39L5.16,20.44C5.06,20.56 5,20.75 5,21C5,21.41 5.16,21.69 5.44,21.84C5.56,21.94 5.75,22 6,22C6.41,22 6.69,21.84 6.84,21.56L7.83,19.97H14.2C14.41,20.55 14.79,21.05 15.28,21.42C15.78,21.8 16.36,22 17,22C17.83,22 18.53,21.69 19.13,21.09C19.72,20.5 20,19.8 20,19C20,18.17 19.72,17.47 19.13,16.88C18.53,16.28 17.83,16 17,16C16.36,16 15.78,16.17 15.28,16.55C14.78,16.92 14.42,17.41 14.2,18H9.14L11.11,14.95C11.27,15 11.56,15 12,15C12.44,15 12.73,15 12.89,14.95L13.88,16.5C14.29,15.96 14.84,15.54 15.47,15.28L14.91,14.39C16.03,13.89 17,13 17.79,11.77C18.59,10.5 19,9.27 19,8H5M17,18C17.3,18 17.53,18.09 17.72,18.28C17.91,18.47 18,18.72 18,19C18,19.27 17.91,19.5 17.72,19.71C17.54,19.91 17.28,20 17,20C16.74,20 16.5,19.91 16.29,19.71C16.09,19.5 16,19.26 16,19C16,18.7 16.09,18.47 16.29,18.28C16.5,18.09 16.73,18 17,18Z";var B5="M8.5 4.5L5.4 9.5L8.5 14.7L5.2 20.5L3.4 19.6L6.1 14.7L3 9.5L6.7 3.6L8.5 4.5M14.7 4.4L11.6 9.5L14.7 14.5L11.4 20.3L9.6 19.4L12.3 14.5L9.2 9.5L12.9 3.5L14.7 4.4M21 4.4L17.9 9.5L21 14.5L17.7 20.3L15.9 19.4L18.6 14.5L15.5 9.5L19.2 3.5L21 4.4";var w7="M13.5,8H12V13L16.28,15.54L17,14.33L13.5,12.25V8M13,3A9,9 0 0,0 4,12H1L4.96,16.03L9,12H6A7,7 0 0,1 13,5A7,7 0 0,1 20,12A7,7 0 0,1 13,19C11.07,19 9.32,18.21 8.06,16.94L6.64,18.36C8.27,20 10.5,21 13,21A9,9 0 0,0 22,12A9,9 0 0,0 13,3";var k7="M24 13L20 17V14H11V12H20V9L24 13M4 20V12H1L11 3L18 9.3V10H15.79L11 5.69L6 10.19V18H16V16H18V20H4Z";var O7="M15 13L11 17V14H2V12H11V9L15 13M5 20V16H7V18H17V10.19L12 5.69L7.21 10H4.22L12 3L22 12H19V20H5Z";var E7="M19 8C20.11 8 21 8.9 21 10V16.76C21.61 17.31 22 18.11 22 19C22 20.66 20.66 22 19 22C17.34 22 16 20.66 16 19C16 18.11 16.39 17.31 17 16.76V10C17 8.9 17.9 8 19 8M19 9C18.45 9 18 9.45 18 10V11H20V10C20 9.45 19.55 9 19 9M12 5.69L7 10.19V18H14.1L14 19L14.1 20H5V12H2L12 3L16.4 6.96C15.89 7.4 15.5 7.97 15.25 8.61L12 5.69Z";var T7="M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11V17Z";var $7="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z";var R7="M12,2A7,7 0 0,1 19,9C19,11.38 17.81,13.47 16,14.74V17A1,1 0 0,1 15,18H9A1,1 0 0,1 8,17V14.74C6.19,13.47 5,11.38 5,9A7,7 0 0,1 12,2M9,21V20H15V21A1,1 0 0,1 14,22H10A1,1 0 0,1 9,21M12,4A5,5 0 0,0 7,9C7,11.05 8.23,12.81 10,13.58V16H14V13.58C15.77,12.81 17,11.05 17,9A5,5 0 0,0 12,4Z";var P5="M11 15H6L13 1V9H18L11 23V15Z";var B7="M12,17A2,2 0 0,0 14,15C14,13.89 13.1,13 12,13A2,2 0 0,0 10,15A2,2 0 0,0 12,17M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V10C4,8.89 4.9,8 6,8H7V6A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,3A3,3 0 0,0 9,6V8H15V6A3,3 0 0,0 12,3Z";var P7="M18 1C15.24 1 13 3.24 13 6V8H4C2.9 8 2 8.89 2 10V20C2 21.11 2.9 22 4 22H16C17.11 22 18 21.11 18 20V10C18 8.9 17.11 8 16 8H15V6C15 4.34 16.34 3 18 3C19.66 3 21 4.34 21 6V8H23V6C23 3.24 20.76 1 18 1M10 13C11.1 13 12 13.89 12 15C12 16.11 11.11 17 10 17C8.9 17 8 16.11 8 15C8 13.9 8.9 13 10 13Z";var N7="M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z";var F7="M5,7A2,2 0 0,0 3,9V15A2,2 0 0,0 5,17H8V15H5V9H8V7H5M11,7A2,2 0 0,0 9,9V15A2,2 0 0,0 11,17H13A2,2 0 0,0 15,15V9A2,2 0 0,0 13,7H11M11,9H13V15H11V9M16,10.5V12H19V13.5H17.5A1.5,1.5 0 0,0 16,15V18H20.5V16.5H17.5V15H19A1.5,1.5 0 0,0 20.5,13.5V12A1.5,1.5 0 0,0 19,10.5H16Z";var D7="M8 18C6.67 18 5.79 18.79 5.29 19.29S4.67 20 4 20 3.21 19.79 2.71 19.29C2.35 18.93 1.79 18.42 1 18.16V20.41C1.09 20.5 1.18 20.59 1.29 20.71C1.79 21.21 2.67 22 4 22S6.21 21.21 6.71 20.71 7.33 20 8 20 8.79 20.21 9.29 20.71C9.73 21.14 10.44 21.8 11.5 21.96C11.66 22 11.83 22 12 22C13.33 22 14.21 21.21 14.71 20.71S15.33 20 16 20 16.79 20.21 17.29 20.71 18.67 22 20 22 22.21 21.21 22.71 20.71C22.82 20.59 22.91 20.5 23 20.41V18.16C22.21 18.42 21.65 18.93 21.29 19.29C20.79 19.79 20.67 20 20 20S19.21 19.79 18.71 19.29 17.33 18 16 18 13.79 18.79 13.29 19.29 12.67 20 12 20C11.78 20 11.63 19.97 11.5 19.92C11.22 19.82 11.05 19.63 10.71 19.29C10.21 18.79 9.33 18 8 18M22 10.5C22 10.5 24 12.67 24 14C24 15.1 23.1 16 22 16S20 15.1 20 14C20 12.67 22 10.5 22 10.5M22.5 7.13L19.24 5.24L12.73 9C12.39 8.4 11.74 8 11 8H9V6H10C10.55 6 11 5.55 11 5S10.55 4 10 4H6C5.45 4 5 4.45 5 5S5.45 6 6 6H7V8H5C3.9 8 3 8.9 3 10V13C3 14.1 3.9 15 5 15H14C14.75 15 15.41 14.58 15.75 13.97L19.4 7.65L21.5 8.86C22 9.14 22.59 8.97 22.87 8.5C23.14 8 23 7.4 22.5 7.13M14 13H5V10H11.69L12.6 11.43L16.06 9.43L14 13M3.5 6.92L1.79 8.62A1 1 0 0 1 .38 7.21L2.09 5.5A1 1 0 0 1 3.5 5.5C3.89 5.89 3.89 6.5 3.5 6.92Z";var z7="M17.5,12A1.5,1.5 0 0,1 16,10.5A1.5,1.5 0 0,1 17.5,9A1.5,1.5 0 0,1 19,10.5A1.5,1.5 0 0,1 17.5,12M14.5,8A1.5,1.5 0 0,1 13,6.5A1.5,1.5 0 0,1 14.5,5A1.5,1.5 0 0,1 16,6.5A1.5,1.5 0 0,1 14.5,8M9.5,8A1.5,1.5 0 0,1 8,6.5A1.5,1.5 0 0,1 9.5,5A1.5,1.5 0 0,1 11,6.5A1.5,1.5 0 0,1 9.5,8M6.5,12A1.5,1.5 0 0,1 5,10.5A1.5,1.5 0 0,1 6.5,9A1.5,1.5 0 0,1 8,10.5A1.5,1.5 0 0,1 6.5,12M12,3A9,9 0 0,0 3,12A9,9 0 0,0 12,21A1.5,1.5 0 0,0 13.5,19.5C13.5,19.11 13.35,18.76 13.11,18.5C12.88,18.23 12.73,17.88 12.73,17.5A1.5,1.5 0 0,1 14.23,16H16A5,5 0 0,0 21,11C21,6.58 16.97,3 12,3Z";var I7="M14.53 1.45L13.45 2.53L15.05 4.13C15.27 4.38 15.38 4.67 15.38 5S15.27 5.64 15.05 5.86L11.5 9.47L12.5 10.55L16.13 6.94C16.66 6.35 16.92 5.7 16.92 5C16.92 4.3 16.66 3.64 16.13 3.05L14.53 1.45M10.55 3.47L9.47 4.55L10.08 5.11C10.3 5.33 10.41 5.63 10.41 6S10.3 6.67 10.08 6.89L9.47 7.45L10.55 8.53L11.11 7.92C11.64 7.33 11.91 6.69 11.91 6C11.91 5.28 11.64 4.63 11.11 4.03L10.55 3.47M21 5.06C20.31 5.06 19.67 5.33 19.08 5.86L13.45 11.5L14.53 12.5L20.11 6.94C20.36 6.69 20.66 6.56 21 6.56S21.64 6.69 21.89 6.94L22.5 7.55L23.53 6.47L22.97 5.86C22.38 5.33 21.72 5.06 21 5.06M7 8L2 22L16 17L7 8M19 11.06C18.3 11.06 17.66 11.33 17.06 11.86L15.47 13.45L16.55 14.53L18.14 12.94C18.39 12.69 18.67 12.56 19 12.56C19.33 12.56 19.63 12.69 19.88 12.94L21.5 14.53L22.55 13.5L20.95 11.86C20.36 11.33 19.7 11.06 19 11.06Z";var W7="M14,19H18V5H14M6,19H10V5H6V19Z";var U7="M8,5.14V19.14L19,12.14L8,5.14Z";var G7="M14.6 9L18 3.1L19.7 4.1L16.9 9H14.6M14 10H3V12H5V19C5 20.1 5.9 21 7 21H17C18.1 21 19 20.1 19 19V12H21V10H14Z";var j7="M19 19C19 20.11 18.11 21 17 21H7C5.9 21 5 20.11 5 19V12H3V10H21V12H19M8 1.5C6.15 1.5 4.65 3 4.65 4.85C4.65 6.7 6.15 8.2 8 8.2H9.53C9.92 8.2 10.29 8.3 10.61 8.5H12.63C12.05 7.45 10.86 6.75 9.53 6.75H8C7 6.75 6.15 5.77 6.15 4.75C6.15 3.73 7 3 8 3M12.85 2C12.85 3 12 3.85 11 3.85V5.35C12.92 5.35 14.5 6.7 14.89 8.5H16.42C16.12 6.67 14.96 5.15 13.35 4.38C13.97 3.77 14.35 2.93 14.35 2Z";var K7="M16.56,5.44L15.11,6.89C16.84,7.94 18,9.83 18,12A6,6 0 0,1 12,18A6,6 0 0,1 6,12C6,9.83 7.16,7.94 8.88,6.88L7.44,5.44C5.36,6.88 4,9.28 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12C20,9.28 18.64,6.88 16.56,5.44M13,3H11V13H13";var Q7="M18.73,18C15.4,21.69 9.71,22 6,18.64C2.33,15.31 2.04,9.62 5.37,5.93C6.9,4.25 9,3.2 11.27,3C7.96,6.7 8.27,12.39 12,15.71C13.63,17.19 15.78,18 18,18C18.25,18 18.5,18 18.73,18Z";var Y7="M16,6C14.87,6 13.77,6.35 12.84,7H4C2.89,7 2,7.89 2,9V15C2,16.11 2.89,17 4,17H5V18A1,1 0 0,0 6,19H8A1,1 0 0,0 9,18V17H15V18A1,1 0 0,0 16,19H18A1,1 0 0,0 19,18V17H20C21.11,17 22,16.11 22,15V9C22,7.89 21.11,7 20,7H19.15C18.23,6.35 17.13,6 16,6M16,7.5A3.5,3.5 0 0,1 19.5,11A3.5,3.5 0 0,1 16,14.5A3.5,3.5 0 0,1 12.5,11A3.5,3.5 0 0,1 16,7.5M4,9H8V10H4V9M16,9A2,2 0 0,0 14,11A2,2 0 0,0 16,13A2,2 0 0,0 18,11A2,2 0 0,0 16,9M4,11H8V12H4V11M4,13H8V14H4V13Z";var q7="M7.95,3L6.53,5.19L7.95,7.4H7.94L5.95,10.5L4.22,9.6L5.64,7.39L4.22,5.19L6.22,2.09L7.95,3M13.95,2.89L12.53,5.1L13.95,7.3L13.94,7.31L11.95,10.4L10.22,9.5L11.64,7.3L10.22,5.1L12.22,2L13.95,2.89M20,2.89L18.56,5.1L20,7.3V7.31L18,10.4L16.25,9.5L17.67,7.3L16.25,5.1L18.25,2L20,2.89M2,22V14A2,2 0 0,1 4,12H20A2,2 0 0,1 22,14V22H20V20H4V22H2M6,14A1,1 0 0,0 5,15V17A1,1 0 0,0 6,18A1,1 0 0,0 7,17V15A1,1 0 0,0 6,14M10,14A1,1 0 0,0 9,15V17A1,1 0 0,0 10,18A1,1 0 0,0 11,17V15A1,1 0 0,0 10,14M14,14A1,1 0 0,0 13,15V17A1,1 0 0,0 14,18A1,1 0 0,0 15,17V15A1,1 0 0,0 14,14M18,14A1,1 0 0,0 17,15V17A1,1 0 0,0 18,18A1,1 0 0,0 19,17V15A1,1 0 0,0 18,14Z";var X7="M12,0C8.96,0 6.21,1.23 4.22,3.22L5.63,4.63C7.26,3 9.5,2 12,2C14.5,2 16.74,3 18.36,4.64L19.77,3.23C17.79,1.23 15.04,0 12,0M7.05,6.05L8.46,7.46C9.37,6.56 10.62,6 12,6C13.38,6 14.63,6.56 15.54,7.46L16.95,6.05C15.68,4.78 13.93,4 12,4C10.07,4 8.32,4.78 7.05,6.05M12,15A2,2 0 0,1 10,13A2,2 0 0,1 12,11A2,2 0 0,1 14,13A2,2 0 0,1 12,15M15,9H9A1,1 0 0,0 8,10V22A1,1 0 0,0 9,23H15A1,1 0 0,0 16,22V10A1,1 0 0,0 15,9Z";var J7="M12,4C14.1,4 16.1,4.8 17.6,6.3C20.7,9.4 20.7,14.5 17.6,17.6C15.8,19.5 13.3,20.2 10.9,19.9L11.4,17.9C13.1,18.1 14.9,17.5 16.2,16.2C18.5,13.9 18.5,10.1 16.2,7.7C15.1,6.6 13.5,6 12,6V10.6L7,5.6L12,0.6V4M6.3,17.6C3.7,15 3.3,11 5.1,7.9L6.6,9.4C5.5,11.6 5.9,14.4 7.8,16.2C8.3,16.7 8.9,17.1 9.6,17.4L9,19.4C8,19 7.1,18.4 6.3,17.6Z";var C4="M18.1,4.8C18,4.3 17.6,4 17.1,4H13L13.2,7H10.8L11,4H6.8C6.3,4 5.9,4.4 5.8,4.8L3.1,18.8C3,19.4 3.5,20 4.1,20H10L10.3,15H13.7L14,20H19.8C20.4,20 20.9,19.4 20.8,18.8L18.1,4.8M10.4,13L10.6,9H13.2L13.4,13H10.4Z";var e4="M16.88 4L16.88 4L19.03 6.1L13.5 10.5L12.5 9.5L16.87 4L16.88 4M16.88 2C16.3 2 15.73 2.24 15.33 2.72L9.8 9.65L13.34 13.19L20.28 7.67C21.18 6.91 21.25 5.54 20.41 4.7L18.3 2.59C17.9 2.19 17.39 2 16.88 2M9.1 10.36L8.39 11.07C8 11.46 8 12.09 8.39 12.5L10.5 14.6C10.71 14.8 10.96 14.89 11.22 14.89S11.73 14.8 11.93 14.6L12.63 13.9L9.1 10.36M6 15C5.45 15 5 15.45 5 16C5 16.55 5.45 17 6 17C6.55 17 7 16.55 7 16C7 15.45 6.55 15 6 15M9 16C8.45 16 8 16.45 8 17S8.45 18 9 18C9.55 18 10 17.55 10 17S9.55 16 9 16M4 18C3.45 18 3 18.45 3 19S3.45 20 4 20C4.55 20 5 19.55 5 19S4.55 18 4 18M7 19C6.45 19 6 19.45 6 20S6.45 21 7 21C7.55 21 8 20.55 8 20S7.55 19 7 19Z";var N5="M10.6 9.6L9 15L7.4 9.6L2 8L7.4 6.4L9 1L10.6 6.4L16 8L10.6 9.6M17 14.2L21 12L18.8 16L21 20L17 17.8L13 20L15.2 16L13 12L17 14.2M10 16L8.3 19L10 22L7 20.3L4 22L5.7 19L4 16L7 17.7L10 16";var H4="M20.79,13.95L18.46,14.57L16.46,13.44V10.56L18.46,9.43L20.79,10.05L21.31,8.12L19.54,7.65L20,5.88L18.07,5.36L17.45,7.69L15.45,8.82L13,7.38V5.12L14.71,3.41L13.29,2L12,3.29L10.71,2L9.29,3.41L11,5.12V7.38L8.5,8.82L6.5,7.69L5.92,5.36L4,5.88L4.47,7.65L2.7,8.12L3.22,10.05L5.55,9.43L7.55,10.56V13.45L5.55,14.58L3.22,13.96L2.7,15.89L4.47,16.36L4,18.12L5.93,18.64L6.55,16.31L8.55,15.18L11,16.62V18.88L9.29,20.59L10.71,22L12,20.71L13.29,22L14.7,20.59L13,18.88V16.62L15.5,15.17L17.5,16.3L18.12,18.63L20,18.12L19.53,16.35L21.3,15.88L20.79,13.95M9.5,10.56L12,9.11L14.5,10.56V13.44L12,14.89L9.5,13.44V10.56Z",V4="M16.46,9.41L13,7.38V5.12L14.71,3.41L13.29,2L12,3.29L10.71,2L9.29,3.41L11,5.12V7.38L8.5,8.82L6.5,7.69L5.92,5.36L4,5.88L4.47,7.65L2.7,8.12L3.22,10.05L5.55,9.43L7.55,10.56V13.45L5.55,14.58L3.22,13.96L2.7,15.89L4.47,16.36L4,18.12L5.93,18.64L6.55,16.31L8.55,15.18L11,16.62V18.88L9.29,20.59L10.71,22L12,20.71L13.29,22L14.7,20.59L13,18.88V16.62L16.46,14.61M9.5,10.56L12,9.11L14.5,10.56V13.44L12,14.89L9.5,13.44M19,13V7H21V13H19M19,17V15H21V17H19Z";var t4="M8 17.85C8 19.04 7.11 20 6 20S4 19.04 4 17.85C4 16.42 6 14 6 14S8 16.42 8 17.85M16.46 12V10.56L18.46 9.43L20.79 10.05L21.31 8.12L19.54 7.65L20 5.88L18.07 5.36L17.45 7.69L15.45 8.82L13 7.38V5.12L14.71 3.41L13.29 2L12 3.29L10.71 2L9.29 3.41L11 5.12V7.38L8.5 8.82L6.5 7.69L5.92 5.36L4 5.88L4.47 7.65L2.7 8.12L3.22 10.05L5.55 9.43L7.55 10.56V12H2V13H22V12H16.46M9.5 12V10.56L12 9.11L14.5 10.56V12H9.5M20 17.85C20 19.04 19.11 20 18 20S16 19.04 16 17.85C16 16.42 18 14 18 14S20 16.42 20 17.85M14 20.85C14 22.04 13.11 23 12 23S10 22.04 10 20.85C10 19.42 12 17 12 17S14 19.42 14 20.85Z";var r4="M14.25,12L16.27,11H23L22,9H18.03L20.42,5.83L19.43,3.83L15.37,9.2L13.35,10.21L13.75,8L17.83,2.62L15.64,2.22L12,7L8.4,2.2L6.2,2.6L10.26,8L10.66,10.21L8.82,9.29L8.66,9.21L4.6,3.8L3.6,5.8L6,9H2L1,11H7.77L9.75,12L7.73,13H1L2,15H5.97L3.58,18.17L4.57,20.17L8.63,14.8L10.65,13.79L10.25,16L6.17,21.38L8.36,21.79L12,17L15.6,21.8L17.8,21.4L13.74,16L13.34,13.79L15.34,14.79L19.4,20.2L20.4,18.2L18,15H22L23,13H16.23";var L4="M12,16A3,3 0 0,1 9,13C9,11.88 9.61,10.9 10.5,10.39L20.21,4.77L14.68,14.35C14.18,15.33 13.17,16 12,16M12,3C13.81,3 15.5,3.5 16.97,4.32L14.87,5.53C14,5.19 13,5 12,5A8,8 0 0,0 4,13C4,15.21 4.89,17.21 6.34,18.65H6.35C6.74,19.04 6.74,19.67 6.35,20.06C5.96,20.45 5.32,20.45 4.93,20.07V20.07C3.12,18.26 2,15.76 2,13A10,10 0 0,1 12,3M22,13C22,15.76 20.88,18.26 19.07,20.07V20.07C18.68,20.45 18.05,20.45 17.66,20.06C17.27,19.67 17.27,19.04 17.66,18.65V18.65C19.11,17.2 20,15.21 20,13C20,12 19.81,11 19.46,10.1L20.67,8C21.5,9.5 22,11.18 22,13Z";var i4="M16.72 10.43C14.68 8.39 14.5 4.66 14.5 4H13V6H9V4H7C7 2.9 7.9 2 9 2H16V3C16 3.08 16.04 7.63 17.78 9.37L16.72 10.43M17 2V4H18V2H17M15 12C13 10 13 7 13 7H9V9C9 10 9 10 8 11S7 13 7 13V20C7 21.1 7.9 22 9 22H13C14.1 22 15 21.1 15 20V12Z";var a4="M12,15.39L8.24,17.66L9.23,13.38L5.91,10.5L10.29,10.13L12,6.09L13.71,10.13L18.09,10.5L14.77,13.38L15.76,17.66M22,9.24L14.81,8.63L12,2L9.19,8.63L2,9.24L7.45,13.97L5.82,21L12,17.27L18.18,21L16.54,13.97L22,9.24Z";var o4="M13,19.92C14.8,19.7 16.35,18.95 17.65,17.65C18.95,16.35 19.7,14.8 19.92,13H16.92C16.7,14 16.24,14.84 15.54,15.54C14.84,16.24 14,16.7 13,16.92V19.92M10,8H14L17,11H19.92C19.67,9.05 18.79,7.38 17.27,6C15.76,4.66 14,4 12,4C10,4 8.24,4.66 6.73,6C5.21,7.38 4.33,9.05 4.08,11H7L10,8M11,19.92V16.92C10,16.7 9.16,16.24 8.46,15.54C7.76,14.84 7.3,14 7.08,13H4.08C4.3,14.77 5.05,16.3 6.35,17.6C7.65,18.9 9.2,19.67 11,19.92M12,2C14.75,2 17.1,3 19.05,4.95C21,6.9 22,9.25 22,12C22,14.75 21,17.1 19.05,19.05C17.1,21 14.75,22 12,22C9.25,22 6.9,21 4.95,19.05C3,17.1 2,14.75 2,12C2,9.25 3,6.9 4.95,4.95C6.9,3 9.25,2 12,2Z";var M4="M18,18H6V6H18V18Z";var n4="M10 2L7.6 5.4C8.4 5.2 9.2 5 10 5S11.6 5.2 12.4 5.4L10 2M21 13.8V7C21 5.9 20.1 5 19 5S17 5.9 17 7V13.8C16.4 14.4 16 15.2 16 16C16 17.7 17.3 19 19 19S22 17.7 22 16C22 15.1 21.6 14.3 21 13.8M20 8H18V7C18 6.4 18.4 6 19 6S20 6.4 20 7V8M5.5 6.7L1.3 7L3.1 10.8C3.2 10 3.5 9.2 3.9 8.5C4.4 7.8 4.9 7.2 5.5 6.7M10 7C7.2 7 5 9.2 5 12S7.2 17 10 17 15 14.8 15 12 12.8 7 10 7M10 15C8.3 15 7 13.7 7 12S8.3 9 10 9 13 10.3 13 12 11.7 15 10 15M3.2 13.2L1.4 17L5.5 17.4C5 16.9 4.4 16.2 4 15.5C3.5 14.8 3.3 14 3.2 13.2M7.6 18.6L10 22L12.4 18.6C11.6 18.8 10.8 19 10 19C9.1 19 8.3 18.8 7.6 18.6Z";var s4="M22.08,11.04H20.08V4H13.05V2H11.04V4H4V11.04H2V13.05H4V20.08H11.04V22.08H13.05V20.08H20.08V13.05H22.08V11.04M18.07,18.07H13.05V16.06H11.04V18.07H6V13.05H8.03V11.04H6V6H11.04V8.03H13.05V6H18.07V11.04H16.06V13.05H18.07V18.07M13.05,12.05A1,1 0 0,1 12.05,13.05C11.5,13.05 11.04,12.6 11.04,12.05C11.04,11.5 11.5,11.04 12.05,11.04C12.6,11.04 13.05,11.5 13.05,12.05Z";var l4="M15 13V5A3 3 0 0 0 9 5V13A5 5 0 1 0 15 13M12 4A1 1 0 0 1 13 5V8H11V5A1 1 0 0 1 12 4Z";var d4="M19.47 3.47L13.47 9.47L10.53 10C10.22 10.03 9.94 10.18 9.72 10.4L2.81 17.31C1.74 18.38 1.74 20.12 2.81 21.2C3.88 22.27 5.62 22.27 6.7 21.2L13.61 14.29C13.83 14.07 14 13.79 14.03 13.5L14.54 10.54L20.54 4.54L22 2L19.47 3.47M11 14.38C10.24 14.38 9.62 13.76 9.62 13S10.24 11.62 11 11.62 12.38 12.24 12.38 13C12.37 13.76 11.76 14.38 11 14.38Z";var p4="M12,20A7,7 0 0,1 5,13A7,7 0 0,1 12,6A7,7 0 0,1 19,13A7,7 0 0,1 12,20M19.03,7.39L20.45,5.97C20,5.46 19.55,5 19.04,4.56L17.62,6C16.07,4.74 14.12,4 12,4A9,9 0 0,0 3,13A9,9 0 0,0 12,22C17,22 21,17.97 21,13C21,10.88 20.26,8.93 19.03,7.39M11,14H13V8H11M15,1H9V3H15V1Z";var A4="M6,2H18V8H18V8L14,12L18,16V16H18V22H6V16H6V16L10,12L6,8V8H6V2M16,16.5L12,12.5L8,16.5V20H16V16.5M12,11.5L16,7.5V4H8V7.5L12,11.5M10,6H14V6.75L12,8.75L10,6.75V6Z";var m4="M4,5A2,2 0 0,0 2,7V17A2,2 0 0,0 4,19H20A2,2 0 0,0 22,17V7A2,2 0 0,0 20,5H4M4,7H16V17H4V7M19,7A1,1 0 0,1 20,8A1,1 0 0,1 19,9A1,1 0 0,1 18,8A1,1 0 0,1 19,7M6,9V11H14V9H6M19,11A1,1 0 0,1 20,12A1,1 0 0,1 19,13A1,1 0 0,1 18,12A1,1 0 0,1 19,11Z";var c4="M2 12H4V17H20V12H22V17C22 18.11 21.11 19 20 19H4C2.9 19 2 18.11 2 17V12M12 15L17.55 9.54L16.13 8.13L13 11.25V2H11V11.25L7.88 8.13L6.46 9.55L12 15Z";var u4="M16,18L18.29,15.71L13.41,10.83L9.41,14.83L2,7.41L3.41,6L9.41,12L13.41,8L19.71,14.29L22,12V18H16Z",v4="M22,12L18,8V11H3V13H18V16L22,12Z",x4="M16,6L18.29,8.29L13.41,13.17L9.41,9.17L2,16.59L3.41,18L9.41,12L13.41,16L19.71,9.71L22,12V6H16Z";var h4="M8 13C6.14 13 4.59 14.28 4.14 16H2V18H4.14C4.59 19.72 6.14 21 8 21S11.41 19.72 11.86 18H22V16H11.86C11.41 14.28 9.86 13 8 13M8 19C6.9 19 6 18.1 6 17C6 15.9 6.9 15 8 15S10 15.9 10 17C10 18.1 9.1 19 8 19M19.86 6C19.41 4.28 17.86 3 16 3S12.59 4.28 12.14 6H2V8H12.14C12.59 9.72 14.14 11 16 11S19.41 9.72 19.86 8H22V6H19.86M16 9C14.9 9 14 8.1 14 7C14 5.9 14.9 5 16 5S18 5.9 18 7C18 8.1 17.1 9 16 9Z";var f4="M21,10.12H14.22L16.96,7.3C14.23,4.6 9.81,4.5 7.08,7.2C4.35,9.91 4.35,14.28 7.08,17C9.81,19.7 14.23,19.7 16.96,17C18.32,15.65 19,14.08 19,12.1H21C21,14.08 20.12,16.65 18.36,18.39C14.85,21.87 9.15,21.87 5.64,18.39C2.14,14.92 2.11,9.28 5.62,5.81C9.13,2.34 14.76,2.34 18.27,5.81L21,3V10.12M12.5,8V12.25L16,14.33L15.28,15.54L11,13V8H12.5Z";var g4="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z";var Z4="M12,4L9.91,6.09L12,8.18M4.27,3L3,4.27L7.73,9H3V15H7L12,20V13.27L16.25,17.53C15.58,18.04 14.83,18.46 14,18.7V20.77C15.38,20.45 16.63,19.82 17.68,18.96L19.73,21L21,19.73L12,10.73M19,12C19,12.94 18.8,13.82 18.46,14.64L19.97,16.15C20.62,14.91 21,13.5 21,12C21,7.72 18,4.14 14,3.23V5.29C16.89,6.15 19,8.83 19,12M16.5,12C16.5,10.23 15.5,8.71 14,7.97V10.18L16.45,12.63C16.5,12.43 16.5,12.21 16.5,12Z";var S4="M12,20A6,6 0 0,1 6,14C6,10 12,3.25 12,3.25C12,3.25 18,10 18,14A6,6 0 0,1 12,20Z";var F5="M12,3.25C12,3.25 6,10 6,14C6,17.32 8.69,20 12,20A6,6 0 0,0 18,14C18,10 12,3.25 12,3.25M14.47,9.97L15.53,11.03L9.53,17.03L8.47,15.97M9.75,10A1.25,1.25 0 0,1 11,11.25A1.25,1.25 0 0,1 9.75,12.5A1.25,1.25 0 0,1 8.5,11.25A1.25,1.25 0 0,1 9.75,10M14.25,14.5A1.25,1.25 0 0,1 15.5,15.75A1.25,1.25 0 0,1 14.25,17A1.25,1.25 0 0,1 13,15.75A1.25,1.25 0 0,1 14.25,14.5Z";var _4="M3,15H13A1,1 0 0,1 14,16A1,1 0 0,1 13,17H3A1,1 0 0,1 2,16A1,1 0 0,1 3,15M16,15H21A1,1 0 0,1 22,16A1,1 0 0,1 21,17H16A1,1 0 0,1 15,16A1,1 0 0,1 16,15M1,12A5,5 0 0,1 6,7C7,4.65 9.3,3 12,3C15.43,3 18.24,5.66 18.5,9.03L19,9C21.19,9 22.97,10.76 23,13H21A2,2 0 0,0 19,11H17V10A5,5 0 0,0 12,5C9.5,5 7.45,6.82 7.06,9.19C6.73,9.07 6.37,9 6,9A3,3 0 0,0 3,12C3,12.35 3.06,12.69 3.17,13H1.1L1,12M3,19H5A1,1 0 0,1 6,20A1,1 0 0,1 5,21H3A1,1 0 0,1 2,20A1,1 0 0,1 3,19M8,19H21A1,1 0 0,1 22,20A1,1 0 0,1 21,21H8A1,1 0 0,1 7,20A1,1 0 0,1 8,19Z";var y4="M17.75,4.09L15.22,6.03L16.13,9.09L13.5,7.28L10.87,9.09L11.78,6.03L9.25,4.09L12.44,4L13.5,1L14.56,4L17.75,4.09M21.25,11L19.61,12.25L20.2,14.23L18.5,13.06L16.8,14.23L17.39,12.25L15.75,11L17.81,10.95L18.5,9L19.19,10.95L21.25,11M18.97,15.95C19.8,15.87 20.69,17.05 20.16,17.8C19.84,18.25 19.5,18.67 19.08,19.07C15.17,23 8.84,23 4.94,19.07C1.03,15.17 1.03,8.83 4.94,4.93C5.34,4.53 5.76,4.17 6.21,3.85C6.96,3.32 8.14,4.21 8.06,5.04C7.79,7.9 8.75,10.87 10.95,13.06C13.14,15.26 16.1,16.22 18.97,15.95M17.33,17.97C14.5,17.81 11.7,16.64 9.53,14.5C7.36,12.31 6.2,9.5 6.04,6.68C3.23,9.82 3.34,14.64 6.35,17.66C9.37,20.67 14.19,20.78 17.33,17.97Z";var b4="M4,10A1,1 0 0,1 3,9A1,1 0 0,1 4,8H12A2,2 0 0,0 14,6A2,2 0 0,0 12,4C11.45,4 10.95,4.22 10.59,4.59C10.2,5 9.56,5 9.17,4.59C8.78,4.2 8.78,3.56 9.17,3.17C9.9,2.45 10.9,2 12,2A4,4 0 0,1 16,6A4,4 0 0,1 12,10H4M19,12A1,1 0 0,0 20,11A1,1 0 0,0 19,10C18.72,10 18.47,10.11 18.29,10.29C17.9,10.68 17.27,10.68 16.88,10.29C16.5,9.9 16.5,9.27 16.88,8.88C17.42,8.34 18.17,8 19,8A3,3 0 0,1 22,11A3,3 0 0,1 19,14H5A1,1 0 0,1 4,13A1,1 0 0,1 5,12H19M18,18H4A1,1 0 0,1 3,17A1,1 0 0,1 4,16H18A3,3 0 0,1 21,19A3,3 0 0,1 18,22C17.17,22 16.42,21.66 15.88,21.12C15.5,20.73 15.5,20.1 15.88,19.71C16.27,19.32 16.9,19.32 17.29,19.71C17.47,19.89 17.72,20 18,20A1,1 0 0,0 19,19A1,1 0 0,0 18,18Z";var w4="M12,21L15.6,16.2C14.6,15.45 13.35,15 12,15C10.65,15 9.4,15.45 8.4,16.2L12,21M12,3C7.95,3 4.21,4.34 1.2,6.6L3,9C5.5,7.12 8.62,6 12,6C15.38,6 18.5,7.12 21,9L22.8,6.6C19.79,4.34 16.05,3 12,3M12,9C9.3,9 6.81,9.89 4.8,11.4L6.6,13.8C8.1,12.67 9.97,12 12,12C14.03,12 15.9,12.67 17.4,13.8L19.2,11.4C17.19,9.89 14.7,9 12,9Z";var D5="M2.28,3L1,4.27L2.47,5.74C2.04,6 1.61,6.29 1.2,6.6L3,9C3.53,8.6 4.08,8.25 4.66,7.93L6.89,10.16C6.15,10.5 5.44,10.91 4.8,11.4L6.6,13.8C7.38,13.22 8.26,12.77 9.2,12.47L11.75,15C10.5,15.07 9.34,15.5 8.4,16.2L12,21L14.46,17.73L17.74,21L19,19.72M12,3C9.85,3 7.8,3.38 5.9,4.07L8.29,6.47C9.5,6.16 10.72,6 12,6C15.38,6 18.5,7.11 21,9L22.8,6.6C19.79,4.34 16.06,3 12,3M12,9C11.62,9 11.25,9 10.88,9.05L14.07,12.25C15.29,12.53 16.43,13.07 17.4,13.8L19.2,11.4C17.2,9.89 14.7,9 12,9Z";var k4="M21 20V2H3V20H1V23H23V20M19 4V11H13V4M5 4H11V11H5M5 20V13H11V20M13 20V13H19V20Z";var O4="M21 20V2H3V20H1V23H23V20M19 4V11H17V4M5 4H7V11H5M5 20V13H7V20M9 20V4H15V20M17 20V13H19V20Z";var E4="M10 6.2C10 4.3 8.8 2.6 7 2V5.7H4V2C2.2 2.6 1 4.3 1 6.2C1 8.1 2.2 9.8 4 10.4V21.4C4 21.8 4.2 22 4.5 22H6.5C6.8 22 7 21.8 7 21.5V10.5C8.8 9.9 10 8.2 10 6.2M16 8C16 8 15.9 8 16 8C12.1 8.1 9 11.2 9 15C9 18.9 12.1 22 16 22S23 18.9 23 15 19.9 8 16 8M16 20C13.2 20 11 17.8 11 15S13.2 10 16 10 21 12.2 21 15 18.8 20 16 20M15 11V16L18.6 18.2L19.4 17L16.5 15.3V11H15Z";var T4="M22.61,19L13.53,9.91C14.46,7.57 14,4.81 12.09,2.91C9.79,0.61 6.21,0.4 3.66,2.26L7.5,6.11L6.08,7.5L2.25,3.69C0.39,6.23 0.6,9.82 2.9,12.11C4.76,13.97 7.47,14.46 9.79,13.59L18.9,22.7C19.29,23.09 19.92,23.09 20.31,22.7L22.61,20.4C23,20 23,19.39 22.61,19M19.61,20.59L10.15,11.13C9.54,11.58 8.86,11.85 8.15,11.95C6.79,12.15 5.36,11.74 4.32,10.7C3.37,9.76 2.93,8.5 3,7.26L6.09,10.35L10.33,6.11L7.24,3C8.5,2.95 9.73,3.39 10.68,4.33C11.76,5.41 12.17,6.9 11.92,8.29C11.8,9 11.5,9.66 11.04,10.25L20.5,19.7L19.61,20.59Z";var $4={alert:E0,check:e7,chevron:V7,chevron_up:t7,clock:r7,counter:L7,dots:l7,error:O0,info:T7,pause:W7,play:U7,power:K7,remote:X7,stop:M4,timer:A4,water:S4,wifi:w4,wifi_off:D5,auto:R0,care:T4,brightness:F0,dishwasher:M7,door:s7,door_closed:n7,dry:$5,end_sound:N0,energy:P5,floor_light:Y7,glass:_7,leaf:$7,key_tone:R5,quick:c7,rack:T0,rinse:a7,sanitize:N5,silent:Z4,spray:i4,water_percent:F5,zone:F5,bake:o7,chicken:v7,clean:D0,defrost:t4,drawer:c4,fan:p7,fish:m7,flip:u7,fries:f7,fryer:m4,heat:A7,manual:h4,meat:x7,probe:d4,recipe:H7,reheat:B5,roast:b7,shake:e4,slow:G7,snack:h7,star:a4,steam:j7,temperature:l4,vegetable:C7,warm:B5,ac:k0,adblue:D7,battery_car:W0,bonnet:j0,car:q0,car_door:Y0,charger:d7,fuel:Z7,gauge:S7,history:w7,lights:X0,lock:B7,lock_open:P7,marker:N7,motion:J0,odometer:L4,online:K0,parking:U0,range:C4,service:E4,snowflake:H4,software:f4,steering:o4,travel_time:p4,trip:G0,trunk:I0,sunroof:Q0,window_closed:k4,window_open:O4,bulb:R7,fridge:g7,frost:r4,ice:i7,mist:_4,night:y4,party:I7,target:s4,co2:F7,exhaust:k7,filter:$5,pm25:y7,reset:J7,sleep:Q7,supply:O7,wind:b4,away:B0,indoor:E7,outdoor:n4,swing:$0,battery:P0,boost:P5,calendar:z0,frost_guard:V4,radiator:q7,palette:z7,touch:R5,sparkle:N5,noise:g4,offline:D5,trend_up:x4,trend_down:u4,trend_stable:v4};function s(t,C="icon"){let e=$4[t]||$4.info;return`<svg class="${C}" viewBox="0 0 24 24" aria-hidden="true"><path d="${e}"></path></svg>`}var R=`
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
`;var QC=`
:host {
  --dw-body-1: color-mix(in srgb, var(--card-background-color, #fff) 92%, var(--primary-text-color, #000) 8%);
  --dw-body-2: color-mix(in srgb, var(--card-background-color, #fff) 78%, var(--primary-text-color, #000) 22%);
  --dw-tub-1: color-mix(in srgb, var(--card-background-color, #fff) 60%, #0b2430 40%);
  --dw-tub-2: color-mix(in srgb, var(--card-background-color, #fff) 40%, #06131c 60%);
}

/* ---------- header power toggle ---------- */
/* Round so it reads as a power switch rather than one more status pill, and
   shrink-proof: the title beside it is what gives way on a narrow card. */
.power {
  flex: 0 0 auto; width: 36px; height: 36px; padding: 0;
  display: inline-flex; align-items: center; justify-content: center;
  border: 1px solid var(--ap-line); border-radius: 50%;
  background: transparent; color: var(--ap-muted); cursor: pointer;
  transition: background .2s ease, border-color .2s ease, color .2s ease, transform .1s ease;
}
.power .icon { width: 20px; height: 20px; }
.power[aria-pressed="true"] {
  background: color-mix(in srgb, var(--ap-accent) 16%, transparent);
  border-color: color-mix(in srgb, var(--ap-accent) 45%, transparent);
  color: var(--ap-accent);
}
.power:hover:not([disabled]) { border-color: var(--ap-accent); }
.power:active:not([disabled]) { transform: scale(.94); }
.power[disabled] { opacity: .4; cursor: not-allowed; }
/* The state pill, the badges and the toggle travel together and drop to a
   line of their own rather than forcing the card wider than its column: on a
   phone they no longer fit beside the appliance name, and a card that cannot
   shrink hangs off the edge of the screen. */
.header { flex-wrap: wrap; }
.header .meta { display: flex; align-items: center; gap: 8px; margin-left: auto; }
.header > div:first-child { min-width: 0; }

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
`,R4=R+QC;function B(t,C){if(!t)return"";let e=C?.locale?.language||C?.language||"hu",H=C?.locale?.time_format,V={hour:"2-digit",minute:"2-digit"};H==="12"&&(V.hour12=!0),H==="24"&&(V.hour12=!1);try{return new Intl.DateTimeFormat(e,V).format(t)}catch{return t.toTimeString().slice(0,5)}}function F1(t,C){if(t==null)return null;let e=Math.max(0,Math.round(t));if(e<60)return{value:String(e),unit:C("ui.minute_short")};let H=Math.floor(e/60),V=e%60;return{value:`${H}:${String(V).padStart(2,"0")}`,unit:C("ui.hour_short")}}function k1(t,C){let e=F1(t,C);return e?`${e.value} ${e.unit}`:""}function z5(t){if(t==null)return null;let C=Math.max(0,Math.round(t)),e=Math.floor(C/60),H=C%60;return e?`${e}:${String(H).padStart(2,"0")}`:`0:${String(H).padStart(2,"0")}`}function Z(t,C,e=1){if(t==null||!Number.isFinite(Number(t)))return"\u2013";let H=C?.locale?.language||C?.language||"en";try{return new Intl.NumberFormat(H,{maximumFractionDigits:e,minimumFractionDigits:0}).format(Number(t))}catch{return b(Number(t),e)}}function b(t,C=1){return t==null||!Number.isFinite(t)?"\u2013":t.toFixed(C).replace(/\.0$/,"")}function i(t){return String(t??"").replace(/[&<>"']/g,C=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[C])}var W5={language:"auto",compact:!1,animate:!0,show_programs:!0,show_options:!0,show_delay:!0,show_scores:!0,show_consumption:!0,show_details:!0,show_controls:!0,show_appliance_settings:!0},YC=[u.IDLE,u.READY_TO_START],B4=[u.IDLE,u.READY_TO_START],I5=class extends HTMLElement{static getConfigElement(){return document.createElement(t2)}static getStubConfig(C){let e=R2(C);return{type:`custom:${r1}`,device:e[0]?.id}}constructor(){super(),this.attachShadow({mode:"open"}),this._sections={},this._signatures={},this._built=!1}setConfig(C){this._config={...W5,...C||{}},this._signatures={},this._hass&&this._render()}set hass(C){this._hass=C,this._render()}get hass(){return this._hass}connectedCallback(){this._timer=window.setInterval(()=>this._render(),3e4)}disconnectedCallback(){this._timer&&window.clearInterval(this._timer),this._timer=void 0}getCardSize(){return this._config?.compact?5:9}getGridOptions(){return{columns:12,min_columns:6,rows:this._config?.compact?6:"auto"}}_build(){let C=document.createElement("style");C.textContent=R4;let e=document.createElement("ha-card"),H=document.createElement("div");H.className="wrap",H.addEventListener("click",V=>this._onClick(V)),H.addEventListener("input",V=>this._onInput(V)),H.addEventListener("keydown",V=>this._onKeyDown(V));for(let V of["header","hero","alerts","programs","options","delay","meters","controls","appliance","details"]){let r=document.createElement("div");r.dataset.section=V,this._sections[V]=r,H.appendChild(r)}e.appendChild(H),this.shadowRoot.replaceChildren(C,e),this._card=e,this._wrap=H,this._built=!0}_render(){if(!this._hass||!this._config)return;this._built||this._build();let C=k2(this._config,this._hass),e=O2(C);this._t=e;let H=_0(this._hass,this._config);if(this._model=H,!H.ok){this._renderEmpty(H,e);return}this._emptyShown=!1,this._applyHostClasses(H),this._section("header",this._headerHtml(H,e)),this._heroSection(H,e),this._section("alerts",this._alertsHtml(H,e)),this._section("programs",this._config.show_programs?this._programsHtml(H,e):""),this._section("options",this._config.show_options?this._optionsHtml(H,e):""),this._section("delay",this._config.show_delay?this._delayHtml(H,e):""),this._section("meters",this._metersHtml(H,e)),this._section("controls",this._config.show_controls?this._controlsHtml(H,e):""),this._section("appliance",this._config.show_appliance_settings?this._applianceSettingsHtml(H,e):""),this._section("details",this._config.show_details?this._detailsHtml(H,e):"")}_renderEmpty(C,e){if(this._emptyShown!==C.reason){this._emptyShown=C.reason,this._signatures={};for(let H of Object.values(this._sections))H.innerHTML="";this._sections.header.innerHTML=`
      <div class="empty">
        ${s("dishwasher")}
        <div>${i(e(`ui.${C.reason}`))}</div>
      </div>`}}_section(C,e){this._signatures[C]!==e&&(this._signatures[C]=e,this._sections[C].innerHTML=e,this._sections[C].hidden=!e,C==="delay"&&this._restoreReadyBy())}_applyHostClasses(C){let e=["wrap"];this._config.compact&&e.push("compact"),this._config.animate||e.push("no-animation"),e.push(`accent-${C.accent}`),C.state===u.RUNNING&&e.push("running","busy"),C.state===u.PAUSED&&e.push("paused"),C.state===u.END_OF_CYCLE&&e.push("done"),C.state===u.OFF&&e.push("off"),(C.state===u.ALARM||C.alerts.some(V=>w2[V]==="error"))&&e.push("alarm"),C.step==="DRYING"&&e.push("phase-drying"),C.doorOpen&&e.push("door-open");let H=e.join(" ");this._wrap.className!==H&&(this._wrap.className=H)}_headerHtml(C,e){let H=i(C.name||e("card_name")),V=[u.IDLE,u.READY_TO_START].includes(C.state)?this._cycleMinutes(C):z[C.program]?.duration,r=C.state===u.OFF?"":C.program&&V?`${e(`program.${C.program}`)} \xB7 ${k1(V,e)}`:C.programRaw||"",L=[];return C.online?C.linkQuality&&L.push(`<span title="${e("ui.wifi")}: ${C.linkQuality}">${s("wifi")}</span>`):L.push(`<span class="bad" title="${e("ui.offline")}">${s("wifi_off")}</span>`),C.doorOpen&&L.push(`<span class="bad" title="${e("ui.door_open")}">${s("door")}</span>`),C.ecoMode&&L.push(`<span title="${e("ui.eco_mode")}">${s("leaf")}</span>`),`
      <div class="header">
        <div>
          <div class="title" data-action="more-info">${H}</div>
          ${r?`<div class="sub">${i(r)}</div>`:""}
        </div>
        <div class="spacer"></div>
        <div class="meta">
          <div class="badges">${L.join("")}</div>
          <div class="pill">${s(this._stateIcon(C))}${i(e(`state.${C.state}`))}</div>
          ${this._powerHtml(C,e)}
        </div>
      </div>`}_powerHtml(C,e){let H=C.state!==u.OFF,V=H?"off":"on";if(!C.entities[`cmd_${V}`])return"";let L=i(e(`command.${V}`));return`<button class="power" type="button" data-action="command" data-value="${V}"
        aria-pressed="${H}" aria-label="${L}" title="${L}">${s("power")}</button>`}_stateIcon(C){switch(C.state){case u.RUNNING:return"water";case u.PAUSED:return"pause";case u.END_OF_CYCLE:return"check";case u.DELAYED_START:return"timer";case u.ALARM:return"error";case u.READY_TO_START:return"play";default:return"power"}}_heroSection(C,e){this._sections.hero.querySelector(".machine")||(this._sections.hero.innerHTML=`
        <div class="hero">
          <div class="machine-wrap" data-action="more-info">${b0()}</div>
          <div class="status"></div>
        </div>`,this._statusNode=this._sections.hero.querySelector(".status"));let H=this._statusHtml(C,e);this._signatures.status!==H&&(this._signatures.status=H,this._statusNode.innerHTML=H),w0(this._sections.hero,this._displayText(C,e))}_displayText(C,e){return C.state===u.OFF?"":C.state===u.DELAYED_START&&C.delay?z5(C.delay):C.remaining!==null&&[u.RUNNING,u.PAUSED,u.DELAYED_START].includes(C.state)?z5(C.remaining):C.state===u.END_OF_CYCLE?"0:00":C.program?e(`program.${C.program}`).slice(0,8):"--:--"}_statusHtml(C,e){let H=[],V=C.state===u.RUNNING&&C.phase!=="UNAVAILABLE"?`<span class="phase-text">${i(e(`phase_long.${C.phase}`))}</span>`:"";H.push(`
      <div class="status-line">
        <span class="state-text">${i(e(`state.${C.state}`))}</span>
        ${V}
      </div>`),C.program&&C.state!==u.OFF&&H.push(`
        <div class="program-line">
          ${s(z[C.program]?.icon||"dishwasher")}
          <span>${i(e(`program.${C.program}`))}</span>
        </div>`);let r=this._countdownHtml(C,e);return r&&H.push(r),[u.RUNNING,u.PAUSED,u.END_OF_CYCLE].includes(C.state)&&(H.push(`<div class="bar"><i style="width:${Math.round(C.progress*100)}%"></i></div>`),H.push(this._timelineHtml(C,e))),H.join("")}_cycleMinutes(C){let e=z[C.program]?.duration??null,H=C.remaining!==null&&C.remaining>0?C.remaining:null;if(![u.IDLE,u.READY_TO_START].includes(C.state))return H??e;let V=this._durationTrack;return V?V.program!==C.program?this._durationTrack={program:C.program,reported:H,stale:!0}:V.stale&&H!==V.reported&&(V.stale=!1):this._durationTrack={program:C.program,reported:H,stale:!1},this._durationTrack.stale?e??H:H??e}_countdownHtml(C,e){if(C.state===u.END_OF_CYCLE)return`<div class="countdown"><span class="at">${s("check")}${i(e("ui.finished_hint"))}</span></div>`;if(C.state===u.DELAYED_START){let H=F1(C.delay||C.remaining,e);if(!H)return"";let V=[C.startAt?`<span class="at">${s("timer")}${i(e("ui.starts_at"))} ${B(C.startAt,this._hass)}</span>`:"",C.finishAt?`<span class="at">${s("clock")}${i(e("ui.ready_at"))} ${B(C.finishAt,this._hass)}</span>`:""].join("");return`<div class="countdown"><span class="value">${H.value}</span><span class="unit">${H.unit}</span>${V}</div>`}if([u.RUNNING,u.PAUSED].includes(C.state)){let H=F1(C.remaining,e);if(!H)return"";let V=C.finishAt?`<span class="at">${s("clock")}${i(e("ui.ready_at"))} ${B(C.finishAt,this._hass)}</span>`:"";return`<div class="countdown"><span class="value">${H.value}</span><span class="unit">${H.unit}</span>${V}</div>`}if([u.IDLE,u.READY_TO_START].includes(C.state)){let H=this._cycleMinutes(C),V=F1(H,e);if(!V)return"";let r=C.delay?new Date(Date.now()+C.delay*6e4):null,L=new Date(Date.now()+(H+C.delay)*6e4),a=[r?`<span class="at">${s("timer")}${i(e("ui.starts_at"))} ${B(r,this._hass)}</span>`:"",`<span class="at">${s("clock")}${i(e("ui.ready_at"))} ${B(L,this._hass)}</span>`].join("");return`<div class="countdown"><span class="value">${V.value}</span><span class="unit">${V.unit}</span>${a}</div>`}if(C.state===u.OFF&&C.delay&&C.program&&z[C.program]){let H=z[C.program].duration,V=F1(H,e),r=new Date(Date.now()+C.delay*6e4),L=new Date(Date.now()+(H+C.delay)*6e4);return`<div class="countdown"><span class="value">${V.value}</span><span class="unit">${V.unit}</span>
        <span class="at">${s("timer")}${i(e("ui.starts_at"))} ${B(r,this._hass)}</span>
        <span class="at">${s("clock")}${i(e("ui.ready_at"))} ${B(L,this._hass)}</span></div>`}return""}_timelineHtml(C,e){let H=z[C.program]?.steps||O5,V=C.step?H.indexOf(C.step):-1;return`<div class="timeline">${O5.map(L=>{let a=H.includes(L),o=H.indexOf(L),M="step";return a?V>=0&&o<V?M+=" done":V>=0&&o===V?M+=" active":C.state===u.END_OF_CYCLE&&(M+=" done"):M+=" skip",`<div class="${M}"><span class="dot"></span><span class="label">${i(e(`phase.${L}`))}</span></div>`}).join("")}</div>`}_alertsHtml(C,e){let H=[];C.doorOpen&&C.state!==u.OFF&&H.push({severity:"warning",text:e("ui.door_open"),iconName:"door"});let V=new Set(C.alerts.map(L=>L.code).filter(Boolean)),r=(L,a)=>{!L||V.has(a)||(V.add(a),H.push({severity:w2[a]||"warning",text:e(`alert.${a}`),iconName:"alert"}))};for(let L of C.alerts){let{code:a,count:o}=L,n=(L.severity==="ERROR"||L.severity==="CRITICAL"?"error":"")||w2[a]||"warning",l=a?e(`alert.${a}`,`${e("alert_generic")}: ${a.replace(/^DISH_ALARM_/,"")}`):`${e("alert_generic")}: ${o}`;H.push({severity:n,text:l,iconName:n==="error"?"error":"alert"})}return r(C.consumables.salt,"DISH_ALARM_SALT_MISSING"),r(C.consumables.rinseAid,"DISH_ALARM_RINSE_AID_LOW"),C.online||H.push({severity:"error",text:e("ui.offline"),iconName:"wifi_off"}),H.length?`<div class="alerts">${H.map(L=>`<div class="alert ${L.severity}">${s(L.iconName)}<span>${i(L.text)}</span></div>`).join("")}</div>`:""}_programsHtml(C,e){if(!C.entities.program||!C.programOptions.length)return"";let H=YC.includes(C.state)&&C.remoteEnabled,V=C.programOptions.filter(M=>z[M.key]),r=[...E5.map(M=>V.find(n=>n.key===M)).filter(Boolean),...V.filter(M=>!E5.includes(M.key))],L=C.state===u.OFF?null:C.program,a=r.map(M=>{let n=M.key===L,l=z[M.key],d=`${e(`program_hint.${M.key}`)} \xB7 ${b(l.water)} l \xB7 ${b(l.energy,3)} kWh \xB7 ${k1(l.duration,e)}`;return`<button class="chip" type="button" data-action="program" data-value="${i(M.label)}"
        aria-pressed="${n}" title="${i(d)}" ${H?"":"disabled"}>
        ${s(l.icon)}<span>${i(e(`program.${M.key}`))}</span></button>`}),o=L?i(e(`program_hint.${L}`)):"";return`
      <div class="section">
        <div class="section-title">${i(e("ui.program"))}</div>
        <div class="chips">${a.join("")}</div>
        ${o?`<div class="note">${o}</div>`:""}
      </div>`}_optionsHtml(C,e){if(!C.options.length||C.state===u.OFF)return"";let H=B4.includes(C.state)&&C.remoteEnabled,V=C.options.filter(L=>L.supported||L.on);if(!V.length)return`
        <div class="section">
          <div class="section-title">${i(e("ui.options"))}</div>
          <div class="note">${i(e("ui.no_options"))}</div>
        </div>`;let r=V.map(L=>`<button class="chip" type="button" data-action="option" data-value="${L.entityId}"
        aria-pressed="${L.on}" title="${i(e(`option_hint.${L.key}`))}"
        ${H&&L.supported?"":"disabled"}>
        ${s(L.icon)}<span>${i(e(`option.${L.key}`))}</span></button>`);return`
      <div class="section">
        <div class="section-title">${i(e("ui.options"))}</div>
        <div class="chips">${r.join("")}</div>
      </div>`}_delayHtml(C,e){if(!C.entities.start_time)return"";let H=C.state===u.DELAYED_START||C.delay>0,V=(B4.includes(C.state)||C.state===u.DELAYED_START)&&C.remoteEnabled;if(!V&&!H)return"";let r=A0.map(n=>{let l=C.delay===n;return`<button class="chip" type="button" data-action="delay" data-value="${n}"
        aria-pressed="${l}" ${V?"":"disabled"}>
        ${s("timer")}<span>${n/60} ${i(e("ui.hour_short"))}</span></button>`});H&&r.push(`<button class="chip" type="button" data-action="delay" data-value="-1" ${V?"":"disabled"}>
        ${s("stop")}<span>${i(e("ui.delay_cancel"))}</span></button>`);let L=H?`<span class="hint">${i(k1(C.delay,e))}</span>`:`<span class="hint">${i(e("ui.delay_off"))}</span>`,a=Math.min(C.delayControl?.maxMinutes??b1,b1),o=`
      <div class="steppers narrow">
        <div class="stepper">
          <span class="label">${i(e("ui.delay_amount"))}</span>
          <div class="row">
            <button class="step-btn" type="button" data-action="delay-step" data-dir="-1"
              ${V&&C.delay>0?"":"disabled"} aria-label="\u2212">\u2212</button>
            <span class="value">${i(C.delay?k1(C.delay,e):e("ui.delay_off"))}</span>
            <button class="step-btn" type="button" data-action="delay-step" data-dir="1"
              ${V&&C.delay<a?"":"disabled"} aria-label="+">+</button>
          </div>
        </div>
        <div class="stepper" title="${i(e("ui.ready_by_hint"))}">
          <span class="label">${i(e("ui.ready_by"))}</span>
          <div class="row">
            <input class="time-input" type="time" data-action="ready-by" ${V?"":"disabled"}>
            <button class="step-btn wide" type="button" data-action="ready-by-apply"
              ${V?"":"disabled"} title="${i(e("ui.ready_by_apply"))}">
              ${s("check")}</button>
          </div>
        </div>
      </div>`,M=this._delayNotice&&Date.now()-this._delayNotice.at<2e4?`<div class="note">${s("info")}${i(this._delayNotice.text)}</div>`:"";return`
      <div class="section">
        <div class="section-title">${i(e("ui.delay"))}${L}</div>
        <div class="chips">${r.join("")}</div>
        ${o}
        ${M}
      </div>`}_scoresStale(C){let e=[C.scores.eco,C.scores.energy,C.scores.water].join("/"),H=this._scoreTrack;return H?H.program!==C.program?this._scoreTrack={program:C.program,values:e,stale:!0,since:Date.now()}:H.stale&&(e!==H.values||Date.now()-H.since>3e4)&&(H.stale=!1):this._scoreTrack={program:C.program,values:e,stale:!1,since:0},this._scoreTrack.stale}_metersHtml(C,e){if(C.state===u.OFF)return"";let H=[],{eco:V,energy:r,water:L}=C.scores,a=z[C.program]?.scores!==!1,o=this._scoresStale(C);if(this._config.show_scores&&a&&(V!==null||r!==null||L!==null)){let n=(l,d,p,c)=>{let h=Math.max(0,Math.min(7,c??0)),m=Array.from({length:7},(g,A)=>`<i class="${A<h?"on":""}"></i>`).join("");return`
          <div class="meter ${d}">
            <div class="top">${s(p)}<span>${i(e(`ui.${l}`))}</span>
              <span class="val">${c===null?"\u2013":`${c}/7`}</span></div>
            <div class="track">${m}</div>
          </div>`};H.push(`
        <div class="meters${o?" stale":""}">
          ${n("eco_score","eco","leaf",V)}
          ${n("energy_score","energy","energy",r)}
          ${n("water_score","water","water",L)}
        </div>`)}if(this._config.show_consumption&&C.program&&z[C.program]){let n=z[C.program];H.push(`
        <div class="facts">
          <span class="fact">${s("water")}<b>${b(n.water)}</b> l</span>
          <span class="fact">${s("energy")}<b>${b(n.energy,3)}</b> kWh</span>
          <span class="fact">${s("timer")}<b>${i(k1(n.duration,e))}</b></span>
        </div>`)}if(!H.length)return"";let M=o&&a?`<span class="hint">${i(e("ui.scores_updating"))}</span>`:"";return`
      <div class="section">
        <div class="section-title">${i(e("ui.scores"))}${M}</div>
        ${H.join("")}
      </div>`}_controlsHtml(C,e){let V=(d0[C.state]||[]).filter(L=>C.entities[`cmd_${L}`]).map(L=>{let a=p0[L],o=C.remoteEnabled?"":"disabled";return`<button class="btn ${a.style}" type="button" data-action="command" data-value="${L}" ${o}>
          ${s(a.icon)}<span>${i(e(`command.${L}`))}</span></button>`});if(!V.length)return"";let r=C.remoteEnabled?"":`<div class="note">${s("remote")}${i(e("ui.remote_disabled_hint"))}</div>`;return`<div class="section"><div class="controls">${V.join("")}</div>${r}</div>`}_applianceSettingsHtml(C,e){let{brightness:H,floorLight:V,endSound:r,keyTone:L}=C.settings;if(!H&&!V&&!r&&!L)return"";let a=C.online&&C.remoteEnabled,o=(l,d,p,c)=>c?`<button class="chip" type="button" data-action="setting" data-value="${l}"
            aria-pressed="${c.on}" title="${i(e(`ui.${p}_hint`,""))}"
            ${a?"":"disabled"}>
            ${s(d)}<span>${i(e(`ui.${p}`))}</span>
          </button>`:"",M=[o("floor","floor_light","floor_light",V),o("sound","end_sound","end_sound",r),o("key","key_tone","key_tone",L)].filter(Boolean),n=H?`<div class="steppers narrow">
          <div class="stepper" title="${i(e("ui.brightness_hint",""))}">
            <span class="label">${i(e("ui.brightness"))}</span>
            <div class="row">
              <button class="step-btn" type="button" data-action="brightness" data-dir="-1"
                ${a&&H.value>H.min?"":"disabled"} aria-label="\u2212">\u2212</button>
              <span class="value">${H.value}</span>
              <button class="step-btn" type="button" data-action="brightness" data-dir="1"
                ${a&&H.value<H.max?"":"disabled"} aria-label="+">+</button>
            </div>
          </div>
        </div>`:"";return`
      <div class="section">
        <div class="section-title">${i(e("ui.appliance_settings"))}</div>
        ${M.length?`<div class="chips">${M.join("")}</div>`:""}
        ${n}
      </div>`}_detailsHtml(C,e){let H=[],V=(r,L,a)=>{L==null||L===""||H.push(`
        <div class="detail">
          <span class="k">${i(e(`ui.${r}`))}</span>
          <span class="v">${s(a)}${i(String(L))}</span>
        </div>`)};if(C.doorOpen!==null&&V("door",C.doorOpen?e("ui.door_open"):e("ui.door_closed"),C.doorOpen?"door":"door_closed"),C.remote){let r=C.remote.includes("TEMPORARY")?e("ui.remote_locked"):C.remoteEnabled?e("ui.remote_on"):e("ui.remote_off");V("remote",r,"remote")}if(C.linkQuality){let r=C.linkQuality.replace(/_/g," ").toLowerCase();V("wifi",r.charAt(0).toUpperCase()+r.slice(1),"wifi")}return C.cycles!==null&&V("cycles",C.cycles,"counter"),C.rinseAid!==null&&V("rinse_aid",`${C.rinseAid}/8`,"water_percent"),C.waterHardness&&V("water_hardness",C.waterHardness,"water"),H.length?`
      <div class="section">
        <div class="section-title">${i(e("ui.details"))}</div>
        <div class="details">${H.join("")}</div>
      </div>`:""}_onInput(C){let e=C.target.closest('[data-action="ready-by"]');e&&(this._readyByValue=e.value)}_onKeyDown(C){if(C.key!=="Enter")return;let e=C.target.closest('[data-action="ready-by"]');!e||e.hasAttribute("disabled")||(C.preventDefault(),this._applyReadyBy(e.value))}_applyReadyBy(C){!this._model?.ok||!/^\d{1,2}:\d{2}$/.test(C||"")||(this._readyByValue=C,this._readyBy(C,this._t),this._render())}_restoreReadyBy(){if(!this._readyByValue)return;let C=this._sections.delay?.querySelector('[data-action="ready-by"]');C&&C.value!==this._readyByValue&&(C.value=this._readyByValue)}_onClick(C){let e=C.target.closest("[data-action]");if(!e||e.hasAttribute("disabled"))return;let{action:H,value:V}=e.dataset,r=this._model;if(!(!r?.ok&&H!=="more-info"))switch(H){case"more-info":this._moreInfo(r?.entities?.appliance_state);break;case"program":this._selectProgram(V);break;case"option":this._haptic("light"),this._call("switch","toggle",{entity_id:V});break;case"command":this._haptic("medium"),this._call("button","press",{entity_id:r.entities[`cmd_${V}`]});break;case"setting":this._toggleSetting(V);break;case"brightness":this._stepBrightness(Number(e.dataset.dir));break;case"delay":this._setDelay(Number(V));break;case"delay-step":this._stepDelay(Number(e.dataset.dir));break;case"ready-by-apply":this._applyReadyBy(this._sections.delay?.querySelector('[data-action="ready-by"]')?.value);break;default:break}}_setDelay(C){let e=this._model,H=e.entities.start_time;if(!H)return;let V=e.delayControl,r;if(C<=0)r=V?V.min:-1;else{let L=V?V.seconds?V.step/60:V.step:1,a=Math.max(y1,L||1),o=Math.floor(C/a)*a;if(o<=0)return this._setDelay(0);r=V?.seconds?o*60:o}return this._haptic("light"),this._call("number","set_value",{entity_id:H,value:r})}_stepDelay(C){let e=this._model,H=Math.min(e.delayControl?.maxMinutes??b1,b1),V=Math.floor(e.delay/y1)*y1,r=Math.min(H,Math.max(0,V+C*y1));r!==e.delay&&this._setDelay(r)}_readyBy(C,e){let H=this._model,V=/^(\d{1,2}):(\d{2})$/.exec(C||"");if(!V)return;let r=new Date;r.setSeconds(0,0);let L=new Date(r);L.setHours(Number(V[1]),Number(V[2]),0,0),L<=r&&L.setDate(L.getDate()+1);let a=this._cycleMinutes(H)||0,o=Math.round((L.getTime()-r.getTime())/6e4),M=Math.min(H.delayControl?.maxMinutes??b1,b1),n=Math.floor((o-a)/y1)*y1;if(n<=0){let l=new Date(Date.now()+a*6e4);this._delayNotice={at:Date.now(),text:`${e("ui.ready_by_too_soon")} ${B(l,this._hass)}`},n=0}else if(n>M)n=M,this._delayNotice={at:Date.now(),text:e("ui.ready_by_max")};else{let l=new Date(Date.now()+(n+a)*6e4);this._delayNotice={at:Date.now(),text:`${e("ui.ready_by_set")}: ${k1(n,e)} \xB7 ${e("ui.ready_at")} ${B(l,this._hass)}`}}this._setDelay(n)}_toggleSetting(C){let e=this._model;if(this._haptic("light"),C==="key")return this._call("switch","toggle",{entity_id:e.entities.key_tone});let[H,V]=C==="floor"?["floorLight","display_on_floor"]:["endSound","end_of_cycle_sound"],r=e.settings[H];if(r)return this._call("select","select_option",{entity_id:e.entities[V],option:r.on?r.offOption:r.onOption})}_stepBrightness(C){let{brightness:e}=this._model.settings;if(!e)return;let H=e.levels.findIndex(r=>r.value===e.value),V=e.levels[(H===-1?0:H)+C];V&&(this._haptic("light"),this._call("select","select_option",{entity_id:this._model.entities.display_light,option:V.label}))}_selectProgram(C){return this._haptic("light"),this._call("select","select_option",{entity_id:this._model.entities.program,option:C})}_call(C,e,H){return H.entity_id?this._hass.callService(C,e,H):Promise.resolve()}_moreInfo(C){C&&this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:C},bubbles:!0,composed:!0}))}_haptic(C){this.dispatchEvent(new CustomEvent("haptic",{detail:C,bubbles:!0,composed:!0}))}};function P4(){customElements.get(r1)||(customElements.define(r1,I5),window.customCards=window.customCards||[],window.customCards.push({type:r1,name:"AEG / Electrolux Dishwasher Card",description:"Rich status card for AEG and Electrolux dishwashers: phases, remaining time, programs, options and controls.",preview:!0,documentationURL:"https://github.com/gabor-io/ha-appliance-custom-card"}),console.info(`%c ${r1} %c ${M0} `,"color:#fff;background:#039be5;font-weight:700;border-radius:3px 0 0 3px","color:#039be5;background:#e1f5fe;font-weight:700;border-radius:0 3px 3px 0"))}var qC=`
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
`;function N(t){return class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}setConfig(e){this._config={...e},this._render()}set hass(e){let H=!this._hass;if(this._hass=e,H){this._render();return}this.shadowRoot.activeElement||this._deviceSignature()!==this._devices&&this._render()}_deviceSignature(){return this._hass?t.listDevices(this._hass).map(e=>`${e.id}:${e.name}`).join("|"):""}_render(){if(!this._config||!this._hass)return;this._devices=this._deviceSignature();let e=t.translator(t.getLanguage(this._config,this._hass)),H=t.listDevices(this._hass),V=this._config.device||"",r=[`<option value="" ${V?"":"selected"}>${i(e("editor.device_auto"))}</option>`,...H.map(M=>`<option value="${i(M.id)}" ${M.id===V?"selected":""}>${i(M.name)}</option>`)].join(""),L=[`<option value="auto">${i(e("editor.language_auto"))}</option>`,...t.languages.map(M=>`<option value="${M}" ${this._config.language===M?"selected":""}>${M.toUpperCase()}</option>`)].join(""),a=(t.selects||[]).map(({key:M,options:n})=>{let l=this._config[M],d=n.some(h=>h.value===l),p=l!==void 0&&!d?`<option value="" selected disabled>${i(e("editor.custom"))}</option>`:"",c=n.map(h=>`<option value="${i(h.value)}" ${h.value===l?"selected":""}>${i(h.label)}</option>`).join("");return`<label>${i(e(`editor.${M}`))}
            <select data-key="${M}">${p}${c}</select>
          </label>`}).join(""),o=t.toggles.map(M=>{let n=this._config[M]??t.defaults[M]??!1;return`<label class="toggle"><input type="checkbox" data-key="${M}" ${n?"checked":""}>
            <span>${i(e(`editor.${M}`))}</span></label>`}).join("");this.shadowRoot.innerHTML=`
        <style>${qC}</style>
        <div class="form">
          <label>${i(e("editor.device"))}
            <select data-key="device">${r}</select>
          </label>
          <label>${i(e("editor.name"))}
            <input type="text" data-key="name" value="${i(this._config.name||"")}">
          </label>
          <label>${i(e("editor.language"))}
            <select data-key="language">${L}</select>
          </label>
          ${a}
          <div class="title">${i(e("editor.sections"))}</div>
          <div class="toggles">${o}</div>
        </div>`,this.shadowRoot.querySelectorAll("[data-key]").forEach(M=>M.addEventListener("change",n=>this._onChange(n)))}_onChange(e){let H=e.target,V=H.dataset.key,r={...this._config,type:this._config.type||`custom:${t.cardName}`};H.type==="checkbox"?r[V]=H.checked:H.value===""?delete r[V]:r[V]=H.value,V==="device"&&delete r.entity,this._config=r,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:r},bubbles:!0,composed:!0}))}}}var XC=N({cardName:r1,toggles:["show_programs","show_options","show_delay","show_scores","show_consumption","show_appliance_settings","show_details","show_controls","compact","animate"],defaults:W5,listDevices:R2,getLanguage:k2,translator:O2,languages:T5});function N4(){customElements.get(t2)||customElements.define(t2,XC)}N4();P4();var L1="philips-airfryer-card",r2="philips-airfryer-card-editor",F4="1.24.1",v={STANDBY:"STANDBY",POWERSAVE:"POWERSAVE",MAINMENU:"MAINMENU",IDLE:"IDLE",SETTING:"SETTING",PARASETTING:"PARASETTING",PRECOOK:"PRECOOK",COOKING:"COOKING",PAUSE:"PAUSE",USER_ACTION:"USER_ACTION",MAINTAIN:"MAINTAIN",FINISH:"FINISH",PAIRING:"PAIRING",UNKNOWN:"UNKNOWN"},D4={[v.STANDBY]:"idle",[v.POWERSAVE]:"idle",[v.MAINMENU]:"idle",[v.IDLE]:"ready",[v.SETTING]:"ready",[v.PARASETTING]:"ready",[v.PRECOOK]:"preheat",[v.COOKING]:"cooking",[v.PAUSE]:"paused",[v.USER_ACTION]:"paused",[v.MAINTAIN]:"warm",[v.FINISH]:"done",[v.PAIRING]:"idle",[v.UNKNOWN]:"idle"},O1=[v.PRECOOK,v.COOKING,v.MAINTAIN],D1=[...O1,v.PAUSE,v.USER_ACTION],B2=[v.IDLE,v.SETTING,v.PARASETTING,v.MAINMENU,v.STANDBY],z4={[v.STANDBY]:["power_on"],[v.POWERSAVE]:["power_on"],[v.MAINMENU]:["start","power_off"],[v.IDLE]:["start","power_off"],[v.SETTING]:["start","power_off"],[v.PARASETTING]:["start","power_off"],[v.PRECOOK]:["pause","stop"],[v.COOKING]:["pause","stop"],[v.PAUSE]:["start","stop"],[v.USER_ACTION]:["start","stop"],[v.MAINTAIN]:["stop"],[v.FINISH]:["keep_warm","stop"],[v.PAIRING]:[],[v.UNKNOWN]:[]},P2={power_on:{icon:"power",style:"primary",entity:"power",service:["switch","turn_on"]},power_off:{icon:"power",style:"ghost",entity:"power",service:["switch","turn_off"]},start:{icon:"play",style:"primary",entity:"btn_start",service:["button","press"]},pause:{icon:"pause",style:"primary",entity:"btn_pause",service:["button","press"]},stop:{icon:"stop",style:"ghost",entity:"btn_stop",service:["button","press"]},keep_warm:{icon:"warm",style:"ghost",entity:"btn_keep_warm",service:["button","press"]}},L2={MANUAL:{icon:"manual"},AUTO_COOK:{icon:"auto"},KEEP_WARM:{icon:"warm"},RECIPE:{icon:"recipe"},NO_SELECTION:{icon:"dots"},AIR_STEAM:{icon:"steam"},AIR_STEAM_PRO:{icon:"steam"},STEAMING:{icon:"steam"},ROAST:{icon:"roast"},BAKE:{icon:"bake"},GRILL:{icon:"roast"},SLOW_COOK:{icon:"slow"},STEW:{icon:"slow"},DEFROST:{icon:"defrost"},REHEAT:{icon:"reheat"},SOUS_VIDE:{icon:"probe"},EASY_CLEAN:{icon:"clean"},USER_PRESET:{icon:"star"},FROZEN_SNACKS:{icon:"snack"},FRESH_FRIES:{icon:"fries"},CHICKEN:{icon:"chicken"},FISH:{icon:"fish"},MUFFINS_CAKE:{icon:"bake"},MEAT_CHOPS:{icon:"meat"},VEGETABLES:{icon:"vegetable"}},I4=["AIR_STEAM","AIR_STEAM_PRO","STEAMING","STEW","SLOW_COOK"],i2={temperature:{min:40,max:200,step:5},time:{min:1,max:60,step:1},probe:{min:40,max:100,step:1},airspeed:{min:1,max:2,step:1}},W4=[{food:"poultry",doneness:"done",range:"80\u201385 \xB0C"},{food:"poultry_breast",doneness:"juicy",range:"70\u201374 \xB0C"},{food:"beef",doneness:"rare",range:"45\u201350 \xB0C"},{food:"beef",doneness:"medium",range:"55\u201360 \xB0C"},{food:"beef",doneness:"well_done",range:"65\u201370 \xB0C"},{food:"pork",doneness:"done",range:"70\u201373 \xB0C"},{food:"pork_chop",doneness:"medium",range:"58\u201363 \xB0C"},{food:"fish",doneness:"translucent",range:"50\u201355 \xB0C"},{food:"potato",doneness:"well_done",range:"92\u201395 \xB0C"}],U4=[160,180,200],G4=[5,10,15,20,30];var JC={card_name:"Airfryer",status:{STANDBY:"K\xE9szenl\xE9t",POWERSAVE:"Energiatakar\xE9kos",MAINMENU:"F\u0151men\xFC",IDLE:"K\xE9sz az ind\xEDt\xE1sra",SETTING:"Be\xE1ll\xEDt\xE1s",PARASETTING:"Be\xE1ll\xEDt\xE1s",PRECOOK:"El\u0151meleg\xEDt\xE9s",COOKING:"S\xFCt\xE9s",PAUSE:"Sz\xFCneteltetve",USER_ACTION:"Beavatkoz\xE1s sz\xFCks\xE9ges",MAINTAIN:"Melegen tart\xE1s",FINISH:"Elk\xE9sz\xFClt",PAIRING:"P\xE1ros\xEDt\xE1s",UNKNOWN:"Ismeretlen"},method:{MANUAL:"Manu\xE1lis",AUTO_COOK:"Auto-Cook",KEEP_WARM:"Melegen tart\xE1s",RECIPE:"Recept",NO_SELECTION:"Nincs kiv\xE1lasztva",AIR_STEAM:"Air Steam",AIR_STEAM_PRO:"Air Steam Pro",STEAMING:"P\xE1rol\xE1s",ROAST:"S\xFCt\xE9s (roast)",BAKE:"S\xFCtem\xE9ny",GRILL:"Grill",SLOW_COOK:"Lass\xFA f\u0151z\xE9s",STEW:"P\xE1rolt \xE9tel",DEFROST:"Kiolvaszt\xE1s",REHEAT:"\xDAjrameleg\xEDt\xE9s",SOUS_VIDE:"Sous-vide",EASY_CLEAN:"Tiszt\xEDt\xE1s",USER_PRESET:"Saj\xE1t program",FROZEN_SNACKS:"Fagyasztott snack",FRESH_FRIES:"Friss has\xE1b",CHICKEN:"Csirke",FISH:"Hal",MUFFINS_CAKE:"Muffin / s\xFCtem\xE9ny",MEAT_CHOPS:"H\xFAsszeletek",VEGETABLES:"Z\xF6lds\xE9g"},method_hint:{MANUAL:"Id\u0151, h\u0151m\xE9rs\xE9klet \xE9s leveg\u0151sebess\xE9g k\xE9zzel: 40\u2013200 \xB0C, 1\u2013180 perc.",AUTO_COOK:"A g\xE9p a t\xF6lt\xE9si szint \xE9s a k\xEDv\xE1nt elk\xE9sz\xFClts\xE9g alapj\xE1n sz\xE1mol mindent.",KEEP_WARM:"A k\xE9sz \xE9tel melegen tart\xE1sa.",RECIPE:"A NutriU alkalmaz\xE1sb\xF3l k\xFCld\xF6tt recept l\xE9p\xE9sei."},command:{power_on:"Bekapcsol\xE1s",power_off:"Kikapcsol\xE1s",start:"Ind\xEDt\xE1s",pause:"Sz\xFCnet",stop:"Le\xE1ll\xEDt\xE1s",keep_warm:"Melegen tart\xE1s"},alert:{drawer_open:"A fi\xF3k nyitva \u2013 a s\xFCt\xE9s sz\xFCnetel",drawer_open_idle:"A fi\xF3k nyitva van",shake:"R\xE1zd meg az \xE9telt!",flip:"Ford\xEDtsd meg az \xE9telt!",probe_required:"Ehhez a programhoz be kell dugni az \xE9telh\u0151m\xE9r\u0151t",probe_unplugged:"Az \xE9telh\u0151m\xE9r\u0151 nincs csatlakoztatva",resting:"Pihentet\xE9s \u2013 hagyd m\xE9g a k\xE9sz\xFCl\xE9kben",error:"Hibak\xF3d",user_action:"A k\xE9sz\xFCl\xE9k beavatkoz\xE1sra v\xE1r"},ui:{remaining:"H\xE1tral\xE9v\u0151 id\u0151",ready_at:"K\xE9sz",temperature:"H\u0151m\xE9rs\xE9klet",current_temp:"Aktu\xE1lis",target_temp:"C\xE9l",probe:"\xC9telh\u0151m\xE9r\u0151",probe_core:"Magh\u0151m\xE9rs\xE9klet",method:"\xC9telk\xE9sz\xEDt\xE9si m\xF3d",presets:"Saj\xE1t programok",autocook:"Auto-Cook program",recipe:"Recept",settings:"Be\xE1ll\xEDt\xE1sok",cook_time:"S\xFCt\xE9si id\u0151",airspeed:"Leveg\u0151sebess\xE9g",airspeed_low:"Alacsony",airspeed_high:"Magas",preheat:"El\u0151meleg\xEDt\xE9s",keep_warm:"Melegen tart\xE1s",details:"R\xE9szletek",drawer:"Fi\xF3k",drawer_open:"Nyitva",drawer_closed:"Z\xE1rva",total_time:"Teljes id\u0151",stage:"F\xE1zis",voltage:"Fesz\xFClts\xE9g",error_code:"Hibak\xF3d",on:"Be",off:"Ki",none:"Nincs",minute_short:"p",hour_short:"\xF3",finished:"Az \xE9tel elk\xE9sz\xFClt",finished_hint:"Kivehet\u0151",unavailable:"A k\xE9sz\xFCl\xE9k entit\xE1sai nem \xE9rhet\u0151k el",not_configured:"Nem tal\xE1lhat\xF3 Philips airfryer. Add meg a device vagy a prefix be\xE1ll\xEDt\xE1st a k\xE1rtya konfigur\xE1ci\xF3j\xE1ban.",core_temp_help:"Aj\xE1nlott magh\u0151m\xE9rs\xE9kletek",food:{poultry:"Baromfi",poultry_breast:"Baromfimell",beef:"Marha, borj\xFA, b\xE1r\xE1ny",pork:"Sert\xE9s",pork_chop:"Sert\xE9skaraj",fish:"Hal",potato:"Eg\xE9sz burgonya"},doneness:{done:"k\xE9sz",juicy:"szaftos",rare:"v\xE9res",medium:"k\xF6zepes",well_done:"j\xF3l \xE1ts\xFCtve",translucent:"\xE1ttetsz\u0151"}},editor:{device:"K\xE9sz\xFCl\xE9k",device_auto:"Automatikus felismer\xE9s",name:"N\xE9v",language:"Nyelv",language_auto:"Automatikus (HA nyelve)",sections:"Megjelen\xEDtett r\xE9szek",show_methods:"\xC9telk\xE9sz\xEDt\xE9si m\xF3dok",show_presets:"Saj\xE1t programok",show_settings:"H\u0151m\xE9rs\xE9klet \xE9s id\u0151 \xE1ll\xEDt\xE1sa",show_probe:"\xC9telh\u0151m\xE9r\u0151",show_details:"R\xE9szletek",show_controls:"Vez\xE9rl\u0151gombok",compact:"Kompakt n\xE9zet",animate:"Anim\xE1ci\xF3k"}},Ce={card_name:"Airfryer",status:{STANDBY:"Standby",POWERSAVE:"Power save",MAINMENU:"Main menu",IDLE:"Ready to start",SETTING:"Setting up",PARASETTING:"Setting up",PRECOOK:"Preheating",COOKING:"Cooking",PAUSE:"Paused",USER_ACTION:"Action needed",MAINTAIN:"Keeping warm",FINISH:"Finished",PAIRING:"Pairing",UNKNOWN:"Unknown"},method:{MANUAL:"Manual",AUTO_COOK:"Auto-Cook",KEEP_WARM:"Keep warm",RECIPE:"Recipe",NO_SELECTION:"No selection",AIR_STEAM:"Air Steam",AIR_STEAM_PRO:"Air Steam Pro",STEAMING:"Steaming",ROAST:"Roast",BAKE:"Bake",GRILL:"Grill",SLOW_COOK:"Slow cook",STEW:"Stew",DEFROST:"Defrost",REHEAT:"Reheat",SOUS_VIDE:"Sous-vide",EASY_CLEAN:"Easy clean",USER_PRESET:"My preset",FROZEN_SNACKS:"Frozen snacks",FRESH_FRIES:"Fresh fries",CHICKEN:"Chicken",FISH:"Fish",MUFFINS_CAKE:"Muffins / cake",MEAT_CHOPS:"Meat chops",VEGETABLES:"Vegetables"},method_hint:{MANUAL:"Set time, temperature and air speed yourself: 40\u2013200 \xB0C, 1\u2013180 min.",AUTO_COOK:"The appliance works out every parameter from load and doneness.",KEEP_WARM:"Keeps finished food warm.",RECIPE:"Steps of a recipe sent from the NutriU app."},command:{power_on:"Turn on",power_off:"Turn off",start:"Start",pause:"Pause",stop:"Stop",keep_warm:"Keep warm"},alert:{drawer_open:"Drawer is open \u2013 cooking is paused",drawer_open_idle:"The drawer is open",shake:"Shake the food!",flip:"Flip the food!",probe_required:"This program needs the food probe plugged in",probe_unplugged:"The food probe is unplugged",resting:"Resting \u2013 leave the food inside",error:"Error code",user_action:"The appliance is waiting for you"},ui:{remaining:"Remaining",ready_at:"Ready at",temperature:"Temperature",current_temp:"Current",target_temp:"Target",probe:"Food probe",probe_core:"Core temperature",method:"Cooking method",presets:"My presets",autocook:"Auto-Cook program",recipe:"Recipe",settings:"Settings",cook_time:"Cook time",airspeed:"Air speed",airspeed_low:"Low",airspeed_high:"High",preheat:"Preheat",keep_warm:"Keep warm",details:"Details",drawer:"Drawer",drawer_open:"Open",drawer_closed:"Closed",total_time:"Total time",stage:"Stage",voltage:"Voltage",error_code:"Error code",on:"On",off:"Off",none:"None",minute_short:"m",hour_short:"h",finished:"The food is ready",finished_hint:"Ready to serve",unavailable:"The appliance entities are unavailable",not_configured:"No Philips airfryer found. Set the device or prefix option in the card configuration.",core_temp_help:"Recommended core temperatures",food:{poultry:"Poultry",poultry_breast:"Poultry breast",beef:"Beef, veal, lamb",pork:"Pork",pork_chop:"Pork chop",fish:"Fish",potato:"Whole potato"},doneness:{done:"done",juicy:"juicy",rare:"rare",medium:"medium",well_done:"well done",translucent:"translucent"}},editor:{device:"Device",device_auto:"Auto detect",name:"Name",language:"Language",language_auto:"Automatic (HA language)",sections:"Visible sections",show_methods:"Cooking methods",show_presets:"My presets",show_settings:"Temperature and time controls",show_probe:"Food probe",show_details:"Details",show_controls:"Control buttons",compact:"Compact layout",animate:"Animations"}},j4={hu:JC,en:Ce},U5=Object.keys(j4);function N2(t,C){return T(t,C,U5)}function F2(t){return $(j4,t)}var K4={domain:"sensor",suffix:"cooking_status",key:"status"},ee={status:["sensor","cooking_status"],target_temp:["sensor","target_temperature"],current_temp:["sensor","current_temperature"],total_time:["sensor","total_cook_time"],remaining:["sensor","time_remaining"],preset:["sensor","preset"],recipe:["sensor","recipe"],error:["sensor","error_code"],preheat_status:["sensor","preheat_status"],keep_warm_status:["sensor","keep_warm"],airspeed:["sensor","air_speed"],probe_target:["sensor","probe_temperature"],probe_current:["sensor","current_probe_temperature"],dialog:["sensor","dialog"],stage:["sensor","current_stage"],voltage:["sensor","voltage"],drawer:["binary_sensor","drawer"],shake:["binary_sensor","shake_reminder"],flip:["binary_sensor","flip_reminder"],preheat_active:["binary_sensor","preheat_active"],probe_unplugged:["binary_sensor","probe_unplugged"],probe_required:["binary_sensor","probe_required"],resting:["binary_sensor","resting"],btn_start:["button","start_cooking"],btn_pause:["button","pause"],btn_stop:["button","stop"],btn_keep_warm:["button","keep_warm"],num_temp:["number","set_temperature"],num_time:["number","set_cook_time"],num_airspeed:["number","set_air_speed"],num_probe:["number","set_probe_temperature"],num_keep_warm_time:["number","keep_warm_duration"],num_keep_warm_temp:["number","keep_warm_temperature"],sel_method:["select","cooking_method"],sel_preset:["select","my_presets"],sel_autocook:["select","autocook_program"],power:["switch","power"],sw_preheat:["switch","preheat"]};function He(t,C){return E2(t,C,K4)}function Q4(t,C){let e=He(t,C),H=T2(t,C,ee,e);return H.prefix=e,H}function D2(t){return $2(t,K4)}function C1(t){if(x(t))return null;let C=Number(t.state);return Number.isFinite(C)?C:null}function Y4(t){let C=C1(t);if(C===null||C<0)return null;let e=(t.attributes?.unit_of_measurement||"s").toLowerCase();return Math.round(e==="min"||e==="m"?C*60:e==="h"?C*3600:C)}function z2(t,C){if(!t)return null;let e=t.attributes||{};return{value:C1(t),min:Number.isFinite(e.min)?e.min:C.min,max:Number.isFinite(e.max)?e.max:C.max,step:Number.isFinite(e.step)?e.step:C.step,unit:e.unit_of_measurement||""}}function q4(t){let C=t?.attributes?.options;return Array.isArray(C)?C:[]}function J(t){return t?.state==="on"}function Ve(t){if(x(t))return null;let C=String(t.state).trim();return!C||C==="0"||/^(none|no|off|ok)$/i.test(C)?null:C}function X4(t,C){let e=Q4(t,C),H=K=>e[K]?t.states[e[K]]:void 0,V=H("status");if(!e.prefix||!V)return{ok:!1,reason:e.prefix?"unavailable":"not_configured",entities:e};let r=O(V.state),L=r in v?r:v.UNKNOWN,a=H("sel_method"),o=O(a?.state),M=L2[o]?o:null,n=Y4(H("remaining")),l=Y4(H("total_time")),d=O1.includes(L),c=D1.includes(L)&&n!==null&&l?Math.min(1,Math.max(0,1-n/l)):L===v.FINISH?1:0,h=C1(H("current_temp")),m=C1(H("target_temp")),g=H("current_temp")?.attributes?.unit_of_measurement||"\xB0C",A=H("probe_unplugged")?!J(H("probe_unplugged")):!1,y=C1(H("probe_current")),_=C1(H("probe_target")),S=H("drawer"),f=S?J(S):null,P=d&&n!==null&&n>0?new Date(Date.now()+n*1e3):null,U=H("recipe")?.state,X=H("keep_warm_status")?.state,N1=H("preheat_status")?.state;return{ok:!0,entities:e,status:L,accent:D4[L]||"idle",power:H("power")?J(H("power")):L!==v.STANDBY,method:M,methodRaw:a?.state||null,methodOptions:q4(a).map(K=>({label:K,key:O(K)})),presetOptions:q4(H("sel_preset")),presetSelected:H("sel_preset")?.state||null,autocookSelected:H("sel_autocook")?.state||null,steam:I4.includes(M),remaining:n,total:l,progress:c,finishAt:P,currentTemp:h,targetTemp:m,tempUnit:g,heating:d&&h!==null&&m?h<m-2:!1,probe:{plugged:A,required:J(H("probe_required")),current:y,target:_,progress:A&&y!==null&&_?Math.min(1,Math.max(0,y/_)):0},drawerOpen:f,shake:J(H("shake")),flip:J(H("flip")),resting:J(H("resting")),preheatActive:J(H("preheat_active")),preheatStatus:N1&&!x(H("preheat_status"))?N1:null,preheatEnabled:H("sw_preheat")?J(H("sw_preheat")):null,keepWarm:X&&!x(H("keep_warm_status"))?X:null,recipe:U&&!x(H("recipe"))&&U!=="unknown"?U:null,stage:C1(H("stage")),voltage:C1(H("voltage")),error:Ve(H("error")),controls:{temperature:z2(H("num_temp"),i2.temperature),time:z2(H("num_time"),i2.time),airspeed:z2(H("num_airspeed"),i2.airspeed),probe:z2(H("num_probe"),i2.probe)},airspeed:C1(H("airspeed")),name:C.name||V.attributes?.friendly_name?.replace(/\s*Cooking Status$/i,"")||null}}function J4(){return`
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
  </svg>`}function C9(t,C,e){let H=t.querySelector(".display-main"),V=t.querySelector(".display-sub");H&&H.textContent!==C&&(H.textContent=C),V&&V.textContent!==e&&(V.textContent=e)}var te=`
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
`,e9=R+te;var j5={language:"auto",compact:!1,animate:!0,show_methods:!0,show_presets:!0,show_settings:!0,show_probe:!0,show_details:!0,show_controls:!0};function H9(t,C){if(t==null)return null;let e=Math.max(0,Math.round(t));if(e>=3600){let r=Math.floor(e/3600),L=Math.round(e%3600/60);return{value:`${r}:${String(L).padStart(2,"0")}`,unit:C("ui.hour_short")}}let H=Math.floor(e/60),V=e%60;return{value:`${H}:${String(V).padStart(2,"0")}`,unit:C("ui.minute_short")}}var G5=class extends HTMLElement{static getConfigElement(){return document.createElement(r2)}static getStubConfig(C){let e=D2(C);return{type:`custom:${L1}`,device:e[0]?.id}}constructor(){super(),this.attachShadow({mode:"open"}),this._sections={},this._signatures={},this._built=!1}setConfig(C){this._config={...j5,...C||{}},this._signatures={},this._hass&&this._render()}set hass(C){this._hass=C,this._render()}get hass(){return this._hass}connectedCallback(){this._timer=window.setInterval(()=>this._render(),3e4)}disconnectedCallback(){this._timer&&window.clearInterval(this._timer),this._timer=void 0}getCardSize(){return this._config?.compact?5:8}getGridOptions(){return{columns:12,min_columns:6,rows:this._config?.compact?6:"auto"}}_build(){let C=document.createElement("style");C.textContent=e9;let e=document.createElement("ha-card"),H=document.createElement("div");H.className="wrap",H.addEventListener("click",V=>this._onClick(V));for(let V of["header","hero","alerts","gauges","methods","presets","settings","controls","details"]){let r=document.createElement("div");r.dataset.section=V,this._sections[V]=r,H.appendChild(r)}e.appendChild(H),this.shadowRoot.replaceChildren(C,e),this._wrap=H,this._built=!0}_render(){if(!this._hass||!this._config)return;this._built||this._build();let C=F2(N2(this._config,this._hass)),e=X4(this._hass,this._config);if(this._model=e,!e.ok){this._renderEmpty(e,C);return}this._emptyShown=!1,this._applyHostClasses(e),this._section("header",this._headerHtml(e,C)),this._heroSection(e,C),this._section("alerts",this._alertsHtml(e,C)),this._section("gauges",this._gaugesHtml(e,C)),this._section("methods",this._config.show_methods?this._methodsHtml(e,C):""),this._section("presets",this._config.show_presets?this._presetsHtml(e,C):""),this._section("settings",this._config.show_settings?this._settingsHtml(e,C):""),this._section("controls",this._config.show_controls?this._controlsHtml(e,C):""),this._section("details",this._config.show_details?this._detailsHtml(e,C):"")}_renderEmpty(C,e){if(this._emptyShown!==C.reason){this._emptyShown=C.reason,this._signatures={};for(let H of Object.values(this._sections))H.innerHTML="";this._sections.header.innerHTML=`
      <div class="empty">
        ${s("fryer")}
        <div>${i(e(`ui.${C.reason}`))}</div>
      </div>`}}_section(C,e){this._signatures[C]!==e&&(this._signatures[C]=e,this._sections[C].innerHTML=e,this._sections[C].hidden=!e)}_applyHostClasses(C){let e=["wrap"];this._config.compact&&e.push("compact"),this._config.animate||e.push("no-animation"),e.push(`accent-${C.accent}`),C.status===v.COOKING&&e.push("cooking","busy"),C.status===v.PRECOOK&&e.push("preheat","busy","heating"),C.status===v.MAINTAIN&&e.push("cooking"),(C.status===v.PAUSE||C.status===v.USER_ACTION)&&e.push("paused"),C.status===v.FINISH&&e.push("done"),[v.STANDBY,v.POWERSAVE].includes(C.status)&&e.push("off"),C.heating&&O1.includes(C.status)&&e.push("heating"),C.steam&&O1.includes(C.status)&&e.push("steam-mode"),C.drawerOpen&&e.push("drawer-open"),C.probe.plugged&&e.push("probe-plugged"),(C.shake||C.flip)&&e.push("shake-now");let H=e.join(" ");this._wrap.className!==H&&(this._wrap.className=H)}_headerHtml(C,e){let H=i(C.name||e("card_name")),V=C.recipe||(C.method?e(`method.${C.method}`):""),r=[];return C.drawerOpen&&r.push(`<span class="warn" title="${e("ui.drawer")}: ${e("ui.drawer_open")}">${s("drawer")}</span>`),C.probe.plugged&&r.push(`<span title="${e("ui.probe")}">${s("probe")}</span>`),C.error&&r.push(`<span class="bad" title="${e("alert.error")} ${C.error}">${s("error")}</span>`),`
      <div class="header">
        <div>
          <div class="title" data-action="more-info">${H}</div>
          ${V?`<div class="sub">${i(V)}</div>`:""}
        </div>
        <div class="spacer"></div>
        <div class="badges">${r.join("")}</div>
        <div class="pill">${s(this._statusIcon(C))}${i(e(`status.${C.status}`))}</div>
      </div>`}_statusIcon(C){switch(C.status){case v.COOKING:return"heat";case v.PRECOOK:return"temperature";case v.PAUSE:return"pause";case v.USER_ACTION:return"alert";case v.MAINTAIN:return"warm";case v.FINISH:return"check";case v.IDLE:case v.SETTING:case v.PARASETTING:return"play";default:return"power"}}_heroSection(C,e){this._sections.hero.querySelector(".fryer")||(this._sections.hero.innerHTML=`
        <div class="hero">
          <div class="fryer-wrap" data-action="more-info">${J4()}</div>
          <div class="status"></div>
        </div>`,this._statusNode=this._sections.hero.querySelector(".status"));let H=this._statusHtml(C,e);this._signatures.status!==H&&(this._signatures.status=H,this._statusNode.innerHTML=H);let V=H9(C.remaining,e),r=D1.includes(C.status)&&V&&C.remaining>0;C9(this._sections.hero,C.status===v.STANDBY||C.status===v.POWERSAVE?"":r?V.value:"--:--",C.currentTemp!==null&&C.status!==v.STANDBY?`${Math.round(C.currentTemp)}\xB0`:"")}_statusHtml(C,e){let H=[],V=C.status===v.PRECOOK&&C.targetTemp?`<span class="phase-text">${Math.round(C.targetTemp)} ${i(C.tempUnit)}</span>`:C.resting?`<span class="phase-text">${i(e("alert.resting"))}</span>`:"";H.push(`
      <div class="status-line">
        <span class="state-text">${i(e(`status.${C.status}`))}</span>
        ${V}
      </div>`),(C.method||C.recipe)&&H.push(`
        <div class="program-line">
          ${s(L2[C.method]?.icon||"manual")}
          <span>${i(C.recipe||e(`method.${C.method}`))}</span>
        </div>`);let r=H9(C.remaining,e);if(D1.includes(C.status)&&r&&C.remaining>0){let L=C.finishAt?`<span class="at">${s("clock")}${i(e("ui.ready_at"))} ${B(C.finishAt,this._hass)}</span>`:"";H.push(`
        <div class="countdown">
          <span class="value">${r.value}</span><span class="unit">${r.unit}</span>${L}
        </div>`)}else C.status===v.FINISH?H.push(`
        <div class="countdown">
          <span class="at">${s("check")}${i(e("ui.finished_hint"))}</span>
        </div>`):C.controls.temperature?.value&&C.controls.time?.value&&H.push(`
        <div class="countdown">
          <span class="value">${Math.round(C.controls.temperature.value)}\xB0</span>
          <span class="unit">${i(C.tempUnit.replace("\xB0",""))}</span>
          <span class="at">${s("timer")}${Math.round(C.controls.time.value)} ${i(e("ui.minute_short"))}</span>
        </div>`);return(D1.includes(C.status)||C.status===v.FINISH)&&H.push(`<div class="bar"><i style="width:${Math.round(C.progress*100)}%"></i></div>`),H.join("")}_alertsHtml(C,e){let H=[];if(C.error&&H.push({severity:"error",text:`${e("alert.error")}: ${C.error}`,iconName:"error"}),C.drawerOpen){let V=O1.includes(C.status);H.push({severity:V?"warning":"info",text:e(V?"alert.drawer_open":"alert.drawer_open_idle"),iconName:"drawer",pulse:V})}return C.shake&&H.push({severity:"warning",text:e("alert.shake"),iconName:"shake",pulse:!0}),C.flip&&H.push({severity:"warning",text:e("alert.flip"),iconName:"flip",pulse:!0}),C.status===v.USER_ACTION&&!C.shake&&!C.flip&&H.push({severity:"warning",text:e("alert.user_action"),iconName:"alert",pulse:!0}),C.probe.required&&!C.probe.plugged&&H.push({severity:"warning",text:e("alert.probe_required"),iconName:"probe"}),C.resting&&H.push({severity:"info",text:e("alert.resting"),iconName:"timer"}),H.length?`<div class="alerts">${H.map(V=>`<div class="alert ${V.severity}${V.pulse?" pulse":""}">${s(V.iconName)}<span>${i(V.text)}</span></div>`).join("")}</div>`:""}_gaugesHtml(C,e){let H=[],V=i(C.tempUnit);if(C.currentTemp!==null||C.targetTemp!==null){let r=C.currentTemp!==null&&C.targetTemp?Math.min(1,Math.max(0,C.currentTemp/C.targetTemp)):0,L=C.targetTemp!==null&&C.targetTemp>0?`<b>${Math.round(C.currentTemp??0)}</b> / ${Math.round(C.targetTemp)} ${V}`:`<b>${Math.round(C.currentTemp??0)}</b> ${V}`;H.push(`
        <div class="gauge heat">
          <div class="top">${s("temperature")}<span>${i(e("ui.temperature"))}</span>
            <span class="val">${L}</span></div>
          <div class="track"><i style="width:${Math.round(r*100)}%"></i></div>
        </div>`)}if(this._config.show_probe&&C.probe.plugged){let r=C.probe.target?`<b>${Math.round(C.probe.current??0)}</b> / ${Math.round(C.probe.target)} ${V}`:`<b>${Math.round(C.probe.current??0)}</b> ${V}`;H.push(`
        <div class="gauge probe">
          <div class="top">${s("probe")}<span>${i(e("ui.probe_core"))}</span>
            <span class="val">${r}</span></div>
          <div class="track"><i style="width:${Math.round(C.probe.progress*100)}%"></i></div>
        </div>`)}return H.length?`<div class="gauges">${H.join("")}</div>`:""}_methodsHtml(C,e){if(!C.entities.sel_method||!C.methodOptions.length)return"";let H=B2.includes(C.status),V=C.methodOptions.map(L=>{let a=L2[L.key],o=a?e(`method.${L.key}`):L.label,M=e(`method_hint.${L.key}`,"");return`<button class="chip" type="button" data-action="method" data-value="${i(L.label)}"
        aria-pressed="${L.key===C.method}" ${M?`title="${i(M)}"`:""}
        ${H?"":"disabled"}>
        ${s(a?.icon||"manual")}<span>${i(o)}</span></button>`}),r=C.method?i(e(`method_hint.${C.method}`,"")):"";return`
      <div class="section">
        <div class="section-title">${i(e("ui.method"))}</div>
        <div class="chips">${V.join("")}</div>
        ${r?`<div class="note">${r}</div>`:""}
      </div>`}_presetsHtml(C,e){if(!C.entities.sel_preset||!C.presetOptions.length)return"";let H=B2.includes(C.status),V=C.presetOptions.map(r=>`<button class="chip" type="button" data-action="preset" data-value="${i(r)}"
        aria-pressed="${r===C.presetSelected}" ${H?"":"disabled"}>
        ${s("star")}<span>${i(r)}</span></button>`);return`
      <div class="section">
        <div class="section-title">${i(e("ui.presets"))}</div>
        <div class="chips">${V.join("")}</div>
      </div>`}_settingsHtml(C,e){let H=B2.includes(C.status)||C.status===v.PAUSE,V=[],r=(o,M,n,l,d)=>{if(!n||!C.entities[d])return"";let p=n.value??n.min,c=H&&p>n.min,h=H&&p<n.max;return`
        <div class="stepper">
          <span class="label">${i(M)}</span>
          <div class="row">
            <button class="step-btn" type="button" data-action="step" data-value="${o}" data-dir="-1"
              ${c?"":"disabled"} aria-label="\u2212">\u2212</button>
            <span class="value">${Math.round(p)}${i(l)}</span>
            <button class="step-btn" type="button" data-action="step" data-value="${o}" data-dir="1"
              ${h?"":"disabled"} aria-label="+">+</button>
          </div>
        </div>`},L=[r("temperature",e("ui.temperature"),C.controls.temperature,` ${C.tempUnit}`,"num_temp"),r("time",e("ui.cook_time"),C.controls.time,` ${e("ui.minute_short")}`,"num_time"),C.probe.plugged?r("probe",e("ui.probe_core"),C.controls.probe,` ${C.tempUnit}`,"num_probe"):""].filter(Boolean);L.length&&V.push(`<div class="steppers">${L.join("")}</div>`);let a=[];if(C.entities.num_temp&&a.push(...U4.map(o=>`<button class="chip" type="button" data-action="set" data-value="temperature:${o}"
            aria-pressed="${Math.round(C.controls.temperature?.value??-1)===o}" ${H?"":"disabled"}>
            ${s("temperature")}<span>${o}\xB0</span></button>`)),C.entities.num_time&&a.push(...G4.filter(o=>o<=(C.controls.time?.max??60)).map(o=>`<button class="chip" type="button" data-action="set" data-value="time:${o}"
            aria-pressed="${Math.round(C.controls.time?.value??-1)===o}" ${H?"":"disabled"}>
            ${s("timer")}<span>${o} ${i(e("ui.minute_short"))}</span></button>`)),C.entities.num_airspeed){let o=C.controls.airspeed?.value;a.push(`<button class="chip" type="button" data-action="set" data-value="airspeed:1"
          aria-pressed="${o===1}" ${H?"":"disabled"}>
          ${s("fan")}<span>${i(e("ui.airspeed_low"))}</span></button>`,`<button class="chip" type="button" data-action="set" data-value="airspeed:2"
          aria-pressed="${o===2}" ${H?"":"disabled"}>
          ${s("fan")}<span>${i(e("ui.airspeed_high"))}</span></button>`)}if(a.length&&V.push(`<div class="chips">${a.join("")}</div>`),this._config.show_probe&&C.probe.plugged){let o=W4.map(M=>`<div class="row"><span>${i(e(`ui.food.${M.food}`))} \u2013 ${i(e(`ui.doneness.${M.doneness}`))}</span><b>${M.range}</b></div>`).join("");V.push(`
        <details class="core-temps">
          <summary>${i(e("ui.core_temp_help"))}</summary>
          ${o}
        </details>`)}return V.length?`
      <div class="section">
        <div class="section-title">${i(e("ui.settings"))}</div>
        ${V.join("")}
      </div>`:""}_controlsHtml(C,e){let V=(z4[C.status]||[]).filter(L=>C.entities[P2[L].entity]).map(L=>{let a=P2[L],o=C.drawerOpen&&["start"].includes(L);return`<button class="btn ${a.style}" type="button" data-action="command" data-value="${L}"
          ${o?"disabled":""}>
          ${s(a.icon)}<span>${i(e(`command.${L}`))}</span></button>`});if(!V.length)return"";let r=C.drawerOpen?`<div class="note">${s("drawer")}${i(e("alert.drawer_open_idle"))}</div>`:"";return`<div class="section"><div class="controls">${V.join("")}</div>${r}</div>`}_detailsHtml(C,e){let H=[],V=(r,L,a)=>{L==null||L===""||H.push(`
        <div class="detail">
          <span class="k">${i(e(`ui.${r}`))}</span>
          <span class="v">${s(a)}${i(String(L))}</span>
        </div>`)};return C.drawerOpen!==null&&V("drawer",C.drawerOpen?e("ui.drawer_open"):e("ui.drawer_closed"),"drawer"),C.airspeed!==null&&V("airspeed",C.airspeed>=2?e("ui.airspeed_high"):e("ui.airspeed_low"),"fan"),C.total&&V("total_time",`${Math.round(C.total/60)} ${e("ui.minute_short")}`,"timer"),C.preheatEnabled!==null?V("preheat",C.preheatEnabled?e("ui.on"):e("ui.off"),"temperature"):C.preheatStatus&&V("preheat",this._onOff(C.preheatStatus,e),"temperature"),C.keepWarm&&V("keep_warm",this._onOff(C.keepWarm,e),"warm"),C.stage&&V("stage",C.stage,"info"),C.voltage!==null&&V("voltage",`${C.voltage} V`,"info"),C.error&&V("error_code",C.error,"error"),H.length?`
      <div class="section">
        <div class="section-title">${i(e("ui.details"))}</div>
        <div class="details">${H.join("")}</div>
      </div>`:""}_onOff(C,e){let H=String(C).toLowerCase();return["on","true","yes","1"].includes(H)?e("ui.on"):["off","false","no","0"].includes(H)?e("ui.off"):C}_onClick(C){let e=C.target.closest("[data-action]");if(!e||e.hasAttribute("disabled"))return;let{action:H,value:V,dir:r}=e.dataset,L=this._model;if(!(!L?.ok&&H!=="more-info"))switch(H){case"more-info":this._moreInfo(L?.entities?.status);break;case"method":this._haptic("light"),this._call("select","select_option",{entity_id:L.entities.sel_method,option:V});break;case"preset":this._haptic("light"),this._call("select","select_option",{entity_id:L.entities.sel_preset,option:V});break;case"step":this._step(V,Number(r));break;case"set":{let[a,o]=V.split(":");this._setControl(a,Number(o));break}case"command":{let a=P2[V];this._haptic("medium"),this._call(a.service[0],a.service[1],{entity_id:L.entities[a.entity]});break}default:break}}_controlEntity(C){return{temperature:"num_temp",time:"num_time",probe:"num_probe",airspeed:"num_airspeed"}[C]}_step(C,e){let H=this._model.controls[C];if(!H)return;let V=H.value??H.min,r=Math.min(H.max,Math.max(H.min,V+e*H.step));r!==V&&this._setControl(C,r)}_setControl(C,e){let H=this._model.entities[this._controlEntity(C)];if(!H)return;let V=this._model.controls[C],r=V?Math.min(V.max,Math.max(V.min,e)):e;this._haptic("light"),this._call("number","set_value",{entity_id:H,value:r})}_call(C,e,H){return H.entity_id?this._hass.callService(C,e,H):Promise.resolve()}_moreInfo(C){C&&this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:C},bubbles:!0,composed:!0}))}_haptic(C){this.dispatchEvent(new CustomEvent("haptic",{detail:C,bubbles:!0,composed:!0}))}};function V9(){customElements.get(L1)||(customElements.define(L1,G5),window.customCards=window.customCards||[],window.customCards.push({type:L1,name:"Philips Airfryer Card",description:"Rich status card for Philips airfryers: cooking status, drawer, temperature, probe, timers and controls.",preview:!0,documentationURL:"https://github.com/gabor-io/ha-appliance-custom-card"}),console.info(`%c ${L1} %c ${F4} `,"color:#fff;background:#f4511e;font-weight:700;border-radius:3px 0 0 3px","color:#f4511e;background:#fbe9e7;font-weight:700;border-radius:0 3px 3px 0"))}var re=N({cardName:L1,toggles:["show_methods","show_presets","show_settings","show_probe","show_details","show_controls","compact","animate"],defaults:j5,listDevices:D2,getLanguage:N2,translator:F2,languages:U5});function t9(){customElements.get(r2)||customElements.define(r2,re)}t9();V9();var i1="skoda-car-card",a2="skoda-car-card-editor",r9="1.24.1",L9=["front_left","front_right","rear_left","rear_right"],K5={front_left:"fl",front_right:"fr",rear_left:"rl",rear_right:"rr"};var i9=["fuel_level","gas_level","battery_percentage"],a9=["range","combustion_range","electric_range","gas_range"],o9=[["last_trip_mileage","range"],["last_trip_travel_time","travel_time"],["last_trip_average_speed","gauge"],["last_trip_average_fuel_consumption","fuel"],["last_trip_average_electric_consumption","charger"],["overall_mileage","odometer"],["overall_travel_time","travel_time"],["overall_average_speed","gauge"],["overall_average_fuel_consumption","fuel"],["overall_average_electric_consumption","charger"]],M9=[["inspection","service"],["inspection_in_km","service"],["oil_service_in_days","adblue"],["oil_service_in_km","adblue"]],n9=[["software_version","software"],["car_captured","history"],["operation","info"],["service_event","info"],["camping_mode_ends_at","ac"]],s9=[["charging_state","charger"],["charging_power","charger"],["charging_rate","charger"],["remaining_charging_time","travel_time"],["target_battery_percentage","battery_car"],["electric_range","range"]];var Le={card_name:"Aut\xF3",status:{parked:"Parkol",moving:"\xDAton",offline:"Nem el\xE9rhet\u0151",charging:"T\xF6lt\xE9s"},opening:{door_front_left:"Bal els\u0151 ajt\xF3",door_front_right:"Jobb els\u0151 ajt\xF3",door_rear_left:"Bal h\xE1ts\xF3 ajt\xF3",door_rear_right:"Jobb h\xE1ts\xF3 ajt\xF3",window_front_left:"Bal els\u0151 ablak",window_front_right:"Jobb els\u0151 ablak",window_rear_left:"Bal h\xE1ts\xF3 ablak",window_rear_right:"Jobb h\xE1ts\xF3 ablak",trunk:"Csomagtart\xF3",bonnet:"Motorh\xE1ztet\u0151",sunroof:"Tet\u0151ablak"},state:{open:"nyitva",closed:"z\xE1rva",lowered:"leh\xFAzva",up:"felh\xFAzva",on:"be",off:"ki",locked:"Z\xE1rva",unlocked:"Nyitva",unknown:"ismeretlen",none:"nincs"},alert:{door_open:"{name} nyitva",doors_open:"{count} ajt\xF3 nyitva",window_open:"{name} leh\xFAzva",windows_open:"{count} ablak leh\xFAzva",trunk_open:"Csomagtart\xF3 nyitva",bonnet_open:"Motorh\xE1ztet\u0151 nyitva",sunroof_open:"Tet\u0151ablak nyitva",lights_on:"Parkol\xF3f\xE9ny \xE9g",unlocked:"Az aut\xF3 nincs lez\xE1rva",all_closed:"Minden ny\xEDl\xE1sz\xE1r\xF3 z\xE1rva",offline:"Az aut\xF3 nem el\xE9rhet\u0151 (alszik vagy nincs t\xE9rer\u0151)"},section:{openings:"Ny\xEDl\xE1sz\xE1r\xF3k",drive:"Menetadatok",trip:"\xD6sszes\xEDtett utak",service:"Szerviz",last_trip:"Utols\xF3 \xFAt",score:"Pontsz\xE1m",charging:"T\xF6lt\xE9s",climate:"Kl\xEDma",system:"Poz\xEDci\xF3 \xE9s rendszer",extra:"Tov\xE1bbi entit\xE1sok"},ui:{range:"Hat\xF3t\xE1v",fuel:"\xDCzemanyag",level:"T\xF6lt\xF6tts\xE9g",odometer:"Km \xF3ra",outside:"K\xFCls\u0151 h\u0151m\xE9rs\xE9klet",adblue:"AdBlue hat\xF3t\xE1v",doors:"Ajt\xF3k",windows:"Ablakok",position:"Hely",last_update:"Utols\xF3 adat",updated:"Friss\xEDtve",not_configured:"Nem tal\xE1lhat\xF3 MySkoda aut\xF3. V\xE1laszd ki az eszk\xF6zt a k\xE1rtya be\xE1ll\xEDt\xE1saiban.",unavailable:"Az aut\xF3 entit\xE1sai nem \xE9rhet\u0151k el.",in_motion:"Mozg\xE1sban",reachable:"online",not_reachable:"offline",battery_protection:"akkumul\xE1tor-v\xE9delem",lights:"Parkol\xF3f\xE9ny",lights_on:"parkol\xF3f\xE9ny \xE9g",charging_plug:"csatlakoztatva",climate_state:"Kl\xEDma",target_temp:"C\xE9l h\u0151m\xE9rs\xE9klet",current_temp:"Bels\u0151 h\u0151m\xE9rs\xE9klet",read_only:"Csak \xE1llapotjelz\xE9s \u2013 a k\xE1rtya nem vez\xE9rli az aut\xF3t."},primary:{outside_temperature:"K\xFCls\u0151 h\u0151m.",adblue_range:"AdBlue",inspection:"Szerviz"},panel:{inspection:"Szerviz",inspection_in_km:"Km-ig",oil_service_in_days:"Olaj",oil_service_in_km:"Olaj km",last_trip_mileage:"T\xE1v",last_trip_travel_time:"Id\u0151",last_trip_average_fuel_consumption:"Fogy.",last_trip_average_electric_consumption:"Fogy.",score_daily:"Napi",score_weekly:"Heti",score_monthly:"Havi"},entity:{mileage:"Km \xF3ra",range:"Hat\xF3t\xE1v",combustion_range:"Hat\xF3t\xE1v (\xFCzemanyag)",electric_range:"Hat\xF3t\xE1v (elektromos)",gas_range:"Hat\xF3t\xE1v (g\xE1z)",fuel_level:"Tankszint",gas_level:"G\xE1zszint",battery_percentage:"Akkumul\xE1tor",adblue_range:"AdBlue hat\xF3t\xE1v",outside_temperature:"K\xFCls\u0151 h\u0151m\xE9rs\xE9klet",inspection:"K\xF6telez\u0151 szervizig",inspection_in_km:"K\xF6telez\u0151 szervizig h\xE1tral\xE9v\u0151 t\xE1v",oil_service_in_days:"Olajcser\xE9ig",oil_service_in_km:"Olajcser\xE9ig h\xE1tral\xE9v\u0151 t\xE1v",software_version:"Szoftver verzi\xF3",car_captured:"Utols\xF3 adat",operation:"Utols\xF3 m\u0171velet",service_event:"Utols\xF3 szervizesem\xE9ny",camping_mode_ends_at:"Camping m\xF3d v\xE9ge",last_trip_mileage:"Utols\xF3 \xFAt \u2013 t\xE1v",last_trip_travel_time:"Utols\xF3 \xFAt \u2013 id\u0151",last_trip_average_speed:"Utols\xF3 \xFAt \u2013 \xE1tlagsebess\xE9g",last_trip_average_fuel_consumption:"Utols\xF3 \xFAt \u2013 fogyaszt\xE1s",last_trip_average_electric_consumption:"Utols\xF3 \xFAt \u2013 fogyaszt\xE1s (el.)",overall_mileage:"\xD6sszesen \u2013 t\xE1v",overall_travel_time:"\xD6sszesen \u2013 id\u0151",overall_average_speed:"\xD6sszesen \u2013 \xE1tlagsebess\xE9g",overall_average_fuel_consumption:"\xD6sszesen \u2013 fogyaszt\xE1s",overall_average_electric_consumption:"\xD6sszesen \u2013 fogyaszt\xE1s (el.)",charging_state:"T\xF6lt\xE9s \xE1llapota",charging_power:"T\xF6lt\xE9si teljes\xEDtm\xE9ny",charging_rate:"T\xF6lt\xE9si sebess\xE9g",charge_type:"T\xF6lt\xE9s t\xEDpusa",remaining_charging_time:"H\xE1tral\xE9v\u0151 t\xF6lt\xE9si id\u0151",target_battery_percentage:"C\xE9l t\xF6lt\xF6tts\xE9g"},editor:{device:"Eszk\xF6z",device_auto:"Automatikus felismer\xE9s",name:"N\xE9v",language:"Nyelv",language_auto:"Automatikus (HA nyelve)",sections:"L\xE1that\xF3 szekci\xF3k",show_alerts:"Figyelmeztet\xE9sek",show_panels:"Szerviz / \xFAt / pontsz\xE1m panelek",show_drive:"Menetadatok",show_trip:"Utak",show_service:"Szerviz",show_charging:"T\xF6lt\xE9s",show_climate:"Kl\xEDma",show_system:"Poz\xEDci\xF3 \xE9s rendszer",show_extra:"Tov\xE1bbi entit\xE1sok",compact:"Kompakt elrendez\xE9s",animate:"Anim\xE1ci\xF3k"}},ie={card_name:"Car",status:{parked:"Parked",moving:"Driving",offline:"Not reachable",charging:"Charging"},opening:{door_front_left:"Front left door",door_front_right:"Front right door",door_rear_left:"Rear left door",door_rear_right:"Rear right door",window_front_left:"Front left window",window_front_right:"Front right window",window_rear_left:"Rear left window",window_rear_right:"Rear right window",trunk:"Trunk",bonnet:"Bonnet",sunroof:"Sunroof"},state:{open:"open",closed:"closed",lowered:"open",up:"closed",on:"on",off:"off",locked:"Locked",unlocked:"Unlocked",unknown:"unknown",none:"not fitted"},alert:{door_open:"{name} is open",doors_open:"{count} doors are open",window_open:"{name} is open",windows_open:"{count} windows are open",trunk_open:"Trunk is open",bonnet_open:"Bonnet is open",sunroof_open:"Sunroof is open",lights_on:"Parking lights are on",unlocked:"The car is not locked",all_closed:"Everything is closed",offline:"The car is not reachable (asleep or out of coverage)"},section:{openings:"Openings",drive:"Drive data",trip:"Overall trips",service:"Service",last_trip:"Last trip",score:"Score",charging:"Charging",climate:"Climate",system:"Position and system",extra:"Other entities"},ui:{range:"Range",fuel:"Fuel",level:"Level",odometer:"Odometer",outside:"Outside temperature",adblue:"AdBlue range",doors:"Doors",windows:"Windows",position:"Location",last_update:"Last update",updated:"Updated",not_configured:"No MySkoda vehicle found. Pick the device in the card settings.",unavailable:"The vehicle entities are unavailable.",in_motion:"In motion",reachable:"online",not_reachable:"offline",battery_protection:"battery protection",lights:"Parking lights",lights_on:"parking lights on",charging_plug:"plugged in",climate_state:"Air conditioning",target_temp:"Target temperature",current_temp:"Cabin temperature",read_only:"Status only - this card never controls the car."},primary:{outside_temperature:"Outside",adblue_range:"AdBlue",inspection:"Service"},panel:{inspection:"Service",inspection_in_km:"In",oil_service_in_days:"Oil",oil_service_in_km:"Oil in",last_trip_mileage:"Distance",last_trip_travel_time:"Time",last_trip_average_fuel_consumption:"Cons.",last_trip_average_electric_consumption:"Cons.",score_daily:"Daily",score_weekly:"Weekly",score_monthly:"Monthly"},entity:{mileage:"Odometer",range:"Range",combustion_range:"Range (fuel)",electric_range:"Range (electric)",gas_range:"Range (gas)",fuel_level:"Fuel level",gas_level:"Gas level",battery_percentage:"Battery",adblue_range:"AdBlue range",outside_temperature:"Outside temperature",inspection:"Next service in",inspection_in_km:"Next service in (distance)",oil_service_in_days:"Oil service in",oil_service_in_km:"Oil service in",software_version:"Software version",car_captured:"Last update",operation:"Last operation",service_event:"Last service event",camping_mode_ends_at:"Camping mode ends",last_trip_mileage:"Last trip - distance",last_trip_travel_time:"Last trip - time",last_trip_average_speed:"Last trip - average speed",last_trip_average_fuel_consumption:"Last trip - consumption",last_trip_average_electric_consumption:"Last trip - consumption (el.)",overall_mileage:"Overall - distance",overall_travel_time:"Overall - time",overall_average_speed:"Overall - average speed",overall_average_fuel_consumption:"Overall - consumption",overall_average_electric_consumption:"Overall - consumption (el.)",charging_state:"Charging state",charging_power:"Charging power",charging_rate:"Charging rate",charge_type:"Charge type",remaining_charging_time:"Remaining charging time",target_battery_percentage:"Target battery level"},editor:{device:"Device",device_auto:"Auto detect",name:"Name",language:"Language",language_auto:"Automatic (HA language)",sections:"Visible sections",show_alerts:"Alerts",show_panels:"Service / trip / score panels",show_drive:"Drive data",show_trip:"Trips",show_service:"Service",show_charging:"Charging",show_climate:"Climate",show_system:"Position and system",show_extra:"Other entities",compact:"Compact layout",animate:"Animations"}},l9={hu:Le,en:ie},Q5=Object.keys(l9);function I2(t,C){return T(t,C,Q5)}function W2(t){return $(l9,t)}var U2="myskoda",ae={lock_vehicle:["binary_sensor","vehicle_lock","vehicle_locked"],lock_doors:["binary_sensor","doors_lock","doors_locked"],doors_open:["binary_sensor","doors_open","doors_open"],windows_open:["binary_sensor","windows_open","windows"],trunk:["binary_sensor","trunk_open","trunk"],bonnet:["binary_sensor","bonnet_open","bonnet"],sunroof:["binary_sensor","sunroof_open","sunroof"],door_front_left:["binary_sensor","door_open_front_left","door_front_left"],door_front_right:["binary_sensor","door_open_front_right","door_front_right"],door_rear_left:["binary_sensor","door_open_rear_left","door_rear_left"],door_rear_right:["binary_sensor","door_open_rear_right","door_rear_right"],window_front_left:["binary_sensor","window_open_front_left","window_front_left"],window_front_right:["binary_sensor","window_open_front_right","window_front_right"],window_rear_left:["binary_sensor","window_open_rear_left","window_rear_left"],window_rear_right:["binary_sensor","window_open_rear_right","window_rear_right"],lights:["binary_sensor","parkinglights_on","parking_lights"],in_motion:["binary_sensor","vehicle_in_motion","in_motion"],reachable:["binary_sensor","vehicle_reachable","reachable"],battery_protection:["binary_sensor","vehicle_battery_protection","battery_protection"],charger_connected:["binary_sensor","charger_connected","charger_connected"],charger_lock:["binary_sensor","charger_lock","charge_lock"],mileage:["sensor","mileage","mileage"],range:["sensor","range","range"],combustion_range:["sensor","combustion_range","combustion_range"],electric_range:["sensor","electric_range","electric_range"],gas_range:["sensor","gas_range","gas_range"],fuel_level:["sensor","fuel_level","fuel_level"],gas_level:["sensor","gas_level","gas_level"],battery_percentage:["sensor","battery_percentage","battery_percentage"],adblue_range:["sensor","adblue_range","adblue_range"],outside_temperature:["sensor","outside_temperature","outside_temperature"],inspection:["sensor","inspection","next_inspection"],inspection_in_km:["sensor","inspection_in_km","next_inspection_2"],oil_service_in_days:["sensor","oil_service_in_days","oil_service"],oil_service_in_km:["sensor","oil_service_in_km","oil_service_2"],software_version:["sensor","software_version","software_version"],car_captured:["sensor","car_captured","last_updated"],operation:["sensor","operation","last_operation"],service_event:["sensor","service_event","last_service_event"],camping_mode_ends_at:["sensor","camping_mode_ends_at","camping_mode_ends"],last_trip_mileage:["sensor","last_trip_mileage","last_trip_mileage"],last_trip_travel_time:["sensor","last_trip_travel_time","last_trip_travel_time"],last_trip_average_speed:["sensor","last_trip_average_speed","last_trip_average_speed"],last_trip_average_fuel_consumption:["sensor","last_trip_average_fuel_consumption","last_trip_average_fuel_consumption"],last_trip_average_electric_consumption:["sensor","last_trip_average_electric_consumption","last_trip_average_electric_consumption"],overall_mileage:["sensor","overall_mileage","overall_mileage"],overall_travel_time:["sensor","overall_travel_time","overall_travel_time"],overall_average_speed:["sensor","overall_average_speed","overall_average_speed"],overall_average_fuel_consumption:["sensor","overall_average_fuel_consumption","overall_average_fuel_consumption"],overall_average_electric_consumption:["sensor","overall_average_electric_consumption","overall_average_electric_consumption"],charging_state:["sensor","charging_state","charging_state"],charging_power:["sensor","charging_power","charging_power"],charging_rate:["sensor","charging_rate","charging_rate"],charge_type:["sensor","charge_type","charge_type"],remaining_charging_time:["sensor","remaining_charging_time","remaining_charging_time"],target_battery_percentage:["sensor","target_battery_percentage","target_battery_percentage"],score_daily:["sensor","driving_score_daily","driving_score_daily"],score_weekly:["sensor","driving_score_weekly","driving_score_weekly"],score_monthly:["sensor","driving_score_monthly","driving_score_monthly"],position:["device_tracker","device_tracker",null],climate:["climate","climate","air_conditioning"],render:["image","render_vehicle_main","main_render_of_vehicle"]},oe=["sensor","binary_sensor","device_tracker"];function G2(t){return Object.values(t?.entities||{})}function Me(t){return!t.platform||t.platform===U2}function o2(t){let C=new Map;for(let e of G2(t)){if(e.platform!==U2||!e.device_id)continue;let H=t.devices?.[e.device_id];H&&C.set(e.device_id,H.name_by_user||H.name||e.device_id)}return[...C.entries()].map(([e,H])=>({id:e,name:H}))}function ne(t,C){if(C?.device)return C.device;let e=o2(t);return e.length===1?e[0].id:null}function se(t){let C=Object.keys(t?.states||{}).filter(e=>/^sensor\..+_mileage$/.test(e));return C.length!==1?null:C[0].replace(/^sensor\./,"").replace(/_mileage$/,"")}function le(t,C){let e=G2(t).filter(V=>V.device_id===C&&Me(V)).map(V=>V.entity_id.split(".")[1]);if(!e.length)return null;let H=e[0];for(let V of e.slice(1)){let r=0;for(;r<H.length&&r<V.length&&H[r]===V[r];)r+=1;H=H.slice(0,r)}return H.replace(/_+$/,"")||null}function d9(t,C){let e=ne(t,C),H=C?.prefix||le(t,e)||se(t),V=C?.entities||{},r={prefix:H,device:e},L=new Set,a=new Map;for(let o of G2(t))o.platform===U2&&(e&&o.device_id!==e||!o.translation_key||a.has(o.translation_key)||a.set(o.translation_key,o.entity_id));for(let[o,[M,n,l]]of Object.entries(ae)){let d=V[o];if(d){r[o]=d,L.add(d);continue}let p=a.get(n);if(p&&p.startsWith(`${M}.`)&&t?.states?.[p]){r[o]=p,L.add(p);continue}if(!H||!l)continue;let c=`${M}.${H}_${l}`;t?.states?.[c]&&(r[o]=c,L.add(c))}if(!r.position&&H){for(let o of[`device_tracker.${H}`,`device_tracker.${H}_${H}`])if(t?.states?.[o]){r.position=o,L.add(o);break}}return r.extra=G2(t).filter(o=>o.platform===U2&&(!e||o.device_id===e)&&oe.includes(o.entity_id.split(".")[0])&&!L.has(o.entity_id)&&t?.states?.[o.entity_id]).map(o=>o.entity_id).sort(),r}var de=[["outside_temperature","temperature"],["adblue_range","adblue"],["inspection","service"]],pe=[["outside_temperature","temperature"],["adblue_range","adblue"],["combustion_range","range"],["electric_range","range"],["gas_range","range"],["gas_level","fuel"],["battery_percentage","battery_car"]];function M2(t){if(x(t))return null;let C=Number(t.state);return Number.isFinite(C)?C:null}function G(t){return x(t)?null:t.state==="on"}function p9(t){let C=G(t);return C===null?null:!C}function A9(t){if(!t)return null;let C=new Date(t);return Number.isNaN(C.getTime())?null:C}function m9(t,C){if(!t)return null;let e=C?.locale?.language||C?.language||"hu",H=(t.getTime()-Date.now())/1e3,V=Math.abs(H),r=[["second",1,60],["minute",60,3600],["hour",3600,86400],["day",86400,2592e3],["month",2592e3,31536e3],["year",31536e3,1/0]],[L,a]=r.find(([,,o])=>V<o)||r[r.length-1];try{return new Intl.RelativeTimeFormat(e,{numeric:"auto"}).format(Math.round(H/a),L)}catch{return t.toLocaleString()}}function a1(t,C){if(x(C))return null;let e=C.attributes||{};if(e.device_class==="timestamp"){let r=A9(C.state);if(r)return m9(r,t)}if(typeof t?.formatEntityState=="function")try{let r=t.formatEntityState(C);if(r)return r}catch{}let H=Number(C.state);if(Number.isFinite(H)){let r=t?.locale?.language||t?.language||"hu",L;try{L=new Intl.NumberFormat(r,{maximumFractionDigits:1}).format(H)}catch{L=String(H)}return e.unit_of_measurement?`${L} ${e.unit_of_measurement}`:L}let V=String(C.state);return V.charAt(0).toUpperCase()+V.slice(1).replace(/_/g," ")}function Ae(t){let C=M2(t),e=(t?.attributes?.unit_of_measurement||"").toLowerCase();return C===null||!["min","m"].includes(e)||C<120?null:`${Math.floor(C/60)} h ${Math.round(C%60)} min`}function e1(t,C,e,H=[]){let V=[];for(let[r,L]of e){let a=C[r];if(!a)continue;let o=t.states[a],M=r.endsWith("travel_time")&&Ae(o)||a1(t,o);M!==null&&(r.endsWith("_range")&&H.includes(M)||V.push({key:r,entityId:a,value:M,icon:L}))}return V}function me(t,C,e){if(C?.subtitle!==void 0)return C.subtitle||null;let H=e.device?t.devices?.[e.device]:null;if(!H)return null;let V=/(\d{4})$/.exec(H.hw_version||"")?.[1],r=[H.model,V].filter(Boolean);return r.length?r.join(" \xB7 "):null}function ce(t,C,e){if(C?.name)return C.name;let H=e.device?t.devices?.[e.device]:null;return H?H.name_by_user||H.name:(e.mileage?t.states[e.mileage]:null)?.attributes?.friendly_name?.replace(/\s*Mileage$/i,"")||null}function c9(t,C){let e=d9(t,C),H=f=>e[f]?t.states[e[f]]:void 0;if(!Object.keys(e).filter(f=>!["prefix","device","extra"].includes(f)&&e[f]).length)return{ok:!1,reason:e.prefix||e.device?"unavailable":"not_configured",entities:e};let r={},L={},a=[];for(let f of L9){let P=G(H(`door_${f}`)),U=G(H(`window_${f}`));r[K5[f]]=P===!0,L[K5[f]]=U===!0,P!==null&&a.push({key:`door_${f}`,kind:"door",open:P,entityId:e[`door_${f}`]}),U!==null&&a.push({key:`window_${f}`,kind:"window",open:U,entityId:e[`window_${f}`]})}let o=G(H("trunk")),M=G(H("bonnet")),n=G(H("sunroof"));for(let[f,P]of[["trunk",o],["bonnet",M],["sunroof",n]])P!==null&&a.push({key:f,kind:"extra",open:P,entityId:e[f]});let l=i9.find(f=>e[f]&&M2(H(f))!==null),d=a9.find(f=>e[f]&&M2(H(f))!==null),p=l?H(l):null,c=d?H(d):null,h=H("position"),m=G(H("reachable")),g=A9(H("car_captured")?.state),A=C?.show_panels!==!1,y=new Set([l,d,"mileage","car_captured","outside_temperature","adblue_range","inspection",...A?["inspection_in_km","oil_service_in_days","last_trip_mileage","last_trip_travel_time","last_trip_average_fuel_consumption","last_trip_average_electric_consumption"]:[]].filter(Boolean)),_=f=>f.filter(([P])=>!y.has(P)),S=[c?a1(t,c):null].filter(Boolean);return{ok:!0,entities:e,name:ce(t,C,e),spec:me(t,C,e),locked:p9(H("lock_vehicle"))??p9(H("lock_doors")),lockEntity:e.lock_vehicle||e.lock_doors||null,moving:G(H("in_motion"))===!0,offline:m===!1,reachable:m,lights:G(H("lights"))===!0,batteryProtection:G(H("battery_protection")),chargerConnected:G(H("charger_connected")),doors:r,windows:L,trunk:o===!0,bonnet:M===!0,sunroof:n,openings:a,openCount:a.filter(f=>f.open).length,level:p?{key:l,entityId:e[l],value:M2(p),unit:p.attributes?.unit_of_measurement||"%"}:null,range:c?{key:d,entityId:e[d],value:M2(c),unit:c.attributes?.unit_of_measurement||"km",text:a1(t,c)}:null,odometer:e.mileage?{entityId:e.mileage,text:a1(t,H("mileage"))}:null,position:h?{entityId:e.position,address:h.attributes?.parking_address||null,zone:a1(t,h)}:null,lastUpdate:g?{entityId:e.car_captured,date:g,text:m9(g,t)}:null,climate:e.climate?(()=>{let f=H("climate");return x(f)||f.state==="invalid"?null:{entityId:e.climate,state:a1(t,f),current:f.attributes?.current_temperature??null,target:f.attributes?.temperature??null,unit:t.config?.unit_system?.temperature||"\xB0C"}})():null,primaryRows:e1(t,e,de),panels:{service:e1(t,e,[["inspection","service"],["oil_service_in_days","adblue"],["inspection_in_km","service"]]),trip:e1(t,e,[["last_trip_mileage","range"],["last_trip_travel_time","travel_time"],["last_trip_average_fuel_consumption","fuel"],["last_trip_average_electric_consumption","charger"]]).slice(0,3),score:e1(t,e,[["score_daily","trophy"],["score_weekly","trophy"],["score_monthly","trophy"]])},rows:{drive:e1(t,e,_(pe),S),trip:e1(t,e,_(o9)),service:e1(t,e,_(M9)),charging:e1(t,e,_(s9),S),system:e1(t,e,_(n9))},extra:(e.extra||[]).map(f=>({entityId:f,name:t.states[f]?.attributes?.friendly_name||f,value:a1(t,t.states[f])}))}}var Y5="M130 24 C104 24 86 28 72 36 C58 44 48 60 45 80 C42 100 41 120 41 150 C41 220 41 320 41 390 C41 430 43 455 46 468 C49 482 56 492 68 494 C86 497 174 497 192 494 C204 492 211 482 214 468 C217 455 219 430 219 390 C219 320 219 220 219 150 C219 120 218 100 215 80 C212 60 202 44 188 36 C174 28 156 24 130 24 Z",u9={fl:{x:41,y:230,w:26,h:76,hinge:[42,230]},rl:{x:41,y:308,w:26,h:68,hinge:[42,308]},fr:{x:193,y:230,w:26,h:76,hinge:[218,230]},rr:{x:193,y:308,w:26,h:68,hinge:[218,308]}},q5={fl:{arm:"M43 242 L34 238 Q28 239 28 245 Q28 251 34 251 L43 251 Z",glass:"M41 242 L35 240 Q31 241 31 245 Q31 249 35 249 L41 249 Z"},fr:{arm:"M217 242 L226 238 Q232 239 232 245 Q232 251 226 251 L217 251 Z",glass:"M219 242 L225 240 Q229 241 229 245 Q229 249 225 249 L219 249 Z"}};function ue(t){let C=u9[t],e=t==="fl"||t==="rl",H=e?C.x+C.w-9:C.x+2,V=e?C.x+2:C.x+C.w-5,r=q5[t]?`<path class="mirror-arm" d="${q5[t].arm}"/><path class="mirror-glass" d="${q5[t].glass}"/>`:"";return`
    <g class="door" data-door="${t}" style="--hinge-x:${C.hinge[0]}px;--hinge-y:${C.hinge[1]}px;">
      <rect class="panel" x="${C.x}" y="${C.y}" width="${C.w}" height="${C.h}" rx="2"/>
      <rect class="panel-shade" x="${C.x}" y="${C.y}" width="${C.w}" height="${C.h}" rx="2"/>
      <rect class="window${t.startsWith("r")?" tinted":""}" data-window="${t}"
        x="${H}" y="${C.y+7}" width="7" height="${C.h-14}" rx="2.5"/>
      <rect class="handle" x="${V}" y="${C.y+C.h-30}" width="3" height="13" rx="1.5"/>
      ${r}
    </g>`}function v9(){return`
<svg class="car" viewBox="0 0 260 528" role="img" aria-hidden="true">
  <defs>
    <clipPath id="car-body"><path d="${Y5}"/></clipPath>

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
  <path class="contact" d="${Y5}" filter="url(#car-contact)"/>

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

  <path class="outline" d="${Y5}"/>

  ${Object.keys(u9).map(ue).join("")}

  <!-- sunroof marker, only drawn when the car reports one -->
  <rect class="sunroof" x="92" y="244" width="76" height="86" rx="10"/>
</svg>`}function x9(t,C){let e=t.querySelector(".car");if(!e)return;let H=(r,L,a)=>{r&&r.classList.toggle(L,!!a)};for(let[r,L]of Object.entries(C.doors))H(e.querySelector(`[data-door="${r}"]`),"open",L);for(let[r,L]of Object.entries(C.windows))H(e.querySelector(`[data-window="${r}"]`),"open",L);H(e.querySelector(".bonnet"),"open",C.bonnet),H(e.querySelector(".trunk"),"open",C.trunk);let V=e.querySelector(".sunroof");H(V,"visible",C.sunroof!==null),H(V,"open",C.sunroof),e.classList.toggle("lights-on",!!C.lights),e.classList.toggle("offline",!!C.offline)}var ve=`
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
`,h9=`${R}
${ve}`;var J5={language:"auto",compact:!1,animate:!0,show_alerts:!0,show_panels:!0,show_drive:!0,show_trip:!0,show_service:!0,show_charging:!0,show_climate:!0,show_system:!0,show_extra:!1},xe=[{name:"drive",option:"show_drive",icon:"range"},{name:"trip",option:"show_trip",icon:"trip"},{name:"service",option:"show_service",icon:"service"},{name:"charging",option:"show_charging",icon:"charger"},{name:"system",option:"show_system",icon:"marker"}],X5=class extends HTMLElement{static getConfigElement(){return document.createElement(a2)}static getStubConfig(C){let e=o2(C);return{type:`custom:${i1}`,device:e[0]?.id}}constructor(){super(),this.attachShadow({mode:"open"}),this._sections={},this._signatures={},this._open={},this._built=!1}setConfig(C){this._config={...J5,...C||{}},this._signatures={},this._hass&&this._render()}set hass(C){this._hass=C,this._render()}get hass(){return this._hass}connectedCallback(){this._timer=window.setInterval(()=>this._render(),6e4)}disconnectedCallback(){this._timer&&window.clearInterval(this._timer),this._timer=void 0}getCardSize(){return this._config?.compact?5:8}getGridOptions(){return{columns:12,min_columns:6,rows:"auto"}}_build(){let C=document.createElement("style");C.textContent=h9;let e=document.createElement("ha-card"),H=document.createElement("div");H.className="wrap",H.addEventListener("click",V=>this._onClick(V)),H.addEventListener("toggle",V=>this._onToggle(V),!0);for(let V of["header","hero","alerts","panels","folds","footer"]){let r=document.createElement("div");r.dataset.section=V,this._sections[V]=r,H.appendChild(r)}e.appendChild(H),this.shadowRoot.replaceChildren(C,e),this._wrap=H,this._built=!0}_render(){if(!this._hass||!this._config)return;this._built||this._build();let C=W2(I2(this._config,this._hass)),e=c9(this._hass,this._config);if(this._model=e,!e.ok){this._renderEmpty(e,C);return}this._emptyShown=!1,this._applyHostClasses(e),this._section("header",this._headerHtml(e,C)),this._heroSection(e,C),this._section("alerts",this._config.show_alerts?this._alertsHtml(e,C):""),this._section("panels",this._config.show_panels?this._panelsHtml(e,C):""),this._section("folds",this._foldsHtml(e,C)),this._section("footer",this._footerHtml(e,C))}_renderEmpty(C,e){if(this._emptyShown!==C.reason){this._emptyShown=C.reason,this._signatures={};for(let H of Object.values(this._sections))H.innerHTML="",H.hidden=!1;this._sections.header.innerHTML=`
      <div class="empty">
        ${s("car")}
        <div>${i(e(`ui.${C.reason}`))}</div>
      </div>`}}_section(C,e){this._signatures[C]!==e&&(this._signatures[C]=e,this._sections[C].innerHTML=e,this._sections[C].hidden=!e)}_applyHostClasses(C){let e=["wrap"];this._config.compact&&e.push("compact"),this._config.animate||e.push("no-animation"),this._hass.themes?.darkMode&&e.push("dark"),e.push(`accent-${this._accent(C)}`);let H=e.join(" ");this._wrap.className!==H&&(this._wrap.className=H)}_accent(C){return C.offline?"idle":C.openCount?"paused":C.moving?"running":C.locked===!1?"paused":"ready"}_headerHtml(C,e){let H=i(C.name||e("card_name")),V=C.spec||"",r=[];C.lights&&r.push(`<span class="warn" title="${i(e("ui.lights"))}">${s("lights")}</span>`),C.offline&&r.push(`<span title="${i(e("ui.not_reachable"))}">${s("wifi_off")}</span>`);let L=C.locked===null?"":`<div class="pill" data-action="more-info" data-entity="${i(C.lockEntity||"")}">
            ${s(C.locked?"lock":"lock_open")}
            ${i(e(C.locked?"state.locked":"state.unlocked"))}
          </div>`;return`
      <div class="header">
        <div>
          <div class="title" data-action="more-info">${H}</div>
          ${V?`<div class="sub">${i(V)}</div>`:""}
        </div>
        <div class="spacer"></div>
        <div class="badges">${r.join("")}</div>
        ${L}
      </div>`}_heroSection(C,e){this._sections.hero.querySelector(".car")||(this._sections.hero.innerHTML=`
        <div class="split">
          <div class="stage" data-action="more-info">${v9()}</div>
          <div class="primary"></div>
        </div>`,this._primaryNode=this._sections.hero.querySelector(".primary"));let H=this._primaryHtml(C,e);this._signatures.primary!==H&&(this._signatures.primary=H,this._primaryNode.innerHTML=H),x9(this._sections.hero,C)}_primaryHtml(C,e){let H=[],V=C.offline?"offline":C.moving?"moving":"parked",r=[];if(C.reachable!==null&&r.push(e(C.reachable?"ui.reachable":"ui.not_reachable")),C.lights&&r.push(e("ui.lights_on")),C.chargerConnected&&r.push(e("ui.charging_plug")),C.batteryProtection&&r.push(e("ui.battery_protection")),H.push(`
      <div class="state-block">
        <div class="state-text">${i(e(`status.${V}`))}</div>
        ${r.length?`<div class="state-sub">${i(r.join(" \xB7 "))}</div>`:""}
      </div>`),C.level){let L=Math.max(0,Math.min(100,Math.round(C.level.value))),a=L<=10?" empty-tank":L<=25?" low":"",o=C.level.key==="battery_percentage"?"level":"fuel",M=C.range?.text?`<b>${L} ${i(C.level.unit)}</b> \xB7 ${i(C.range.text)}`:`<b>${L} ${i(C.level.unit)}</b>`;H.push(`
        <div class="metric${a}" data-action="more-info" data-entity="${i(C.level.entityId)}">
          <div class="top">${s(o==="level"?"battery_car":"fuel")}
            <span>${i(e(`ui.${o}`))}</span><span class="val">${M}</span></div>
          <div class="bar"><i style="width:${L}%"></i></div>
        </div>`)}else C.range?.text&&H.push(this._lineHtml("range",e("ui.range"),C.range.text,C.range.entityId));C.odometer?.text&&H.push(this._lineHtml("odometer",e("ui.odometer"),C.odometer.text,C.odometer.entityId));for(let L of C.primaryRows)H.push(this._lineHtml(L.icon,e(`primary.${L.key}`,e(`entity.${L.key}`,L.key)),L.value,L.entityId));return H.join("")}_panelsHtml(C,e){let H=(r,L)=>{if(!L.length)return"";let a=L.map(o=>`
          <div class="line" data-action="more-info" data-entity="${i(o.entityId)}">
            <span>${i(e(`panel.${o.key}`,e(`entity.${o.key}`,o.key)))}</span>
            <b>${i(o.value)}</b>
          </div>`).join("");return`
        <div class="panel">
          <h4>${i(e(`section.${r}`))}</h4>
          ${a}
        </div>`},V=[H("service",C.panels.service),H("last_trip",C.panels.trip),H("score",C.panels.score)].filter(Boolean);return V.length?`<div class="panels">${V.join("")}</div>`:""}_footerHtml(C,e){let H=C.position?.address||C.position?.zone,V=C.position?.entityId||C.entities.car_captured||"";return`${H||C.lastUpdate?`
        <div class="footer" data-action="more-info" data-entity="${i(V)}">
          <span class="k">${s("marker")}<span>${i(H||e("ui.position"))}</span></span>
          ${C.lastUpdate?`<span class="v">${i(C.lastUpdate.text)}</span>`:""}
        </div>`:""}
      <div class="readonly">${s("info")}<span>${i(e("ui.read_only"))}</span></div>`}_lineHtml(C,e,H,V){return`
      <div class="line" data-action="more-info" data-entity="${i(V||"")}">
        <span class="k">${s(C)}<span>${i(e)}</span></span>
        <span class="v">${i(H)}</span>
      </div>`}_alertsHtml(C,e){let H=[];C.offline&&H.push({severity:"info",text:e("alert.offline"),iconName:"wifi_off"});let V=a=>C.openings.filter(o=>o.open&&o.kind===a),r=V("door"),L=V("window");if(r.length>2)H.push({severity:"warning",text:e("alert.doors_open").replace("{count}",r.length),iconName:"car_door",entityId:C.entities.doors_open});else for(let a of r)H.push({severity:"warning",text:e("alert.door_open").replace("{name}",e(`opening.${a.key}`)),iconName:"car_door",entityId:a.entityId});if(L.length>2)H.push({severity:"error",text:e("alert.windows_open").replace("{count}",L.length),iconName:"window_open",entityId:C.entities.windows_open});else for(let a of L)H.push({severity:"error",text:e("alert.window_open").replace("{name}",e(`opening.${a.key}`)),iconName:"window_open",entityId:a.entityId});for(let a of V("extra"))H.push({severity:"warning",text:e(`alert.${a.key}_open`),iconName:a.key==="trunk"?"trunk":a.key==="bonnet"?"bonnet":"sunroof",entityId:a.entityId});return C.locked===!1&&H.push({severity:"warning",text:e("alert.unlocked"),iconName:"lock_open",entityId:C.lockEntity}),C.lights&&H.push({severity:"warning",text:e("alert.lights_on"),iconName:"lights",entityId:C.entities.lights}),!H.length&&C.openings.length&&H.push({severity:"ok",text:e("alert.all_closed"),iconName:"check"}),H.length?`<div class="alerts">${H.map(a=>`
        <div class="alert ${a.severity==="ok"?"info ok":a.severity}"
          data-action="more-info" data-entity="${i(a.entityId||"")}">
          ${s(a.iconName)}<span>${i(a.text)}</span>
        </div>`).join("")}</div>`:""}_foldsHtml(C,e){let H=[];for(let V of xe){if(!this._config[V.option])continue;let r=C.rows[V.name]||[],L=V.name==="system"?this._systemExtras(C,e):[];if(!r.length&&!L.length)continue;let a=[...L,...r.map(o=>this._lineHtml(o.icon,e(`entity.${o.key}`,o.key),o.value,o.entityId))].join("");H.push(this._foldHtml(V.name,V.icon,e(`section.${V.name}`),a))}if(this._config.show_climate&&C.climate){let V=[this._lineHtml("ac",e("ui.climate_state"),C.climate.state,C.climate.entityId)];C.climate.current!==null&&V.push(this._lineHtml("snowflake",e("ui.current_temp"),`${C.climate.current} ${C.climate.unit}`,C.climate.entityId)),C.climate.target!==null&&V.push(this._lineHtml("ac",e("ui.target_temp"),`${C.climate.target} ${C.climate.unit}`,C.climate.entityId)),H.push(this._foldHtml("climate","ac",e("section.climate"),V.join("")))}if(this._config.show_extra&&C.extra.length){let V=C.extra.map(r=>this._lineHtml("info",r.name,r.value??"\u2013",r.entityId)).join("");H.push(this._foldHtml("extra","info",e("section.extra"),V))}return H.join("")}_systemExtras(C,e){let H=[];return C.position&&H.push(this._lineHtml("marker",e("ui.position"),C.position.address||C.position.zone||"\u2013",C.position.entityId)),C.batteryProtection!==null&&H.push(this._lineHtml("battery_car",e("ui.battery_protection"),e(C.batteryProtection?"state.on":"state.off"),C.entities.battery_protection)),H}_foldHtml(C,e,H,V){let r=this._open[C]?" open":"";return`
      <details class="fold" data-fold="${C}"${r}>
        <summary>${s(e)}<span>${i(H)}</span>${s("chevron","icon chev")}</summary>
        <div class="body">${V}</div>
      </details>`}_onToggle(C){let e=C.target;e?.dataset?.fold&&(this._open[e.dataset.fold]=e.open)}_onClick(C){let e=C.target.closest("[data-action]");if(!e||e.dataset.action!=="more-info")return;let H=e.dataset.entity||this._model?.entities?.lock_vehicle||this._model?.entities?.mileage||this._model?.entities?.position;H&&this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:H},bubbles:!0,composed:!0}))}};function f9(){customElements.get(i1)||(customElements.define(i1,X5),window.customCards=window.customCards||[],window.customCards.push({type:i1,name:"\u0160koda Car Card",description:"Top-view status card for \u0160koda vehicles (MySkoda): doors, windows, range, service and trips. Status only.",preview:!0,documentationURL:"https://github.com/gabor-io/ha-appliance-custom-card"}),console.info(`%c ${i1} %c ${r9} `,"color:#fff;background:#0e3a2f;font-weight:700;border-radius:3px 0 0 3px","color:#0e3a2f;background:#d6f2e6;font-weight:700;border-radius:0 3px 3px 0"))}var he=N({cardName:i1,toggles:["show_alerts","show_panels","show_drive","show_trip","show_service","show_charging","show_climate","show_system","show_extra","compact","animate"],defaults:J5,listDevices:o2,getLanguage:I2,translator:W2,languages:Q5});function g9(){customElements.get(a2)||customElements.define(a2,he)}g9();f9();var o1="liebherr-fridge-card",n2="liebherr-fridge-card-editor",Z9="1.24.1",S9=["top","middle","bottom"],s2={top:"top_zone",middle:"middle_zone",bottom:"bottom_zone"},z1={supercool:["super_cool","supercool","snowflake"],superfrost:["super_frost","superfrost","frost"]},l2={nightmode:["night_mode","nightmode","night"],partymode:["party_mode","partymode","party"]},I1={icemaker:["ice_maker","icemaker","ice"],hydrobreeze:["hydro_breeze","hydrobreeze","mist"],biofresh:["bio_fresh_plus","biofresh_plus","leaf"]},_9=[2,4,5,7],C3=.6;var fe={card_name:"H\u0171t\u0151",zone:{single:"H\u0171t\u0151t\xE9r",top:"Fels\u0151 z\xF3na",middle:"K\xF6z\xE9ps\u0151 z\xF3na",bottom:"Als\xF3 z\xF3na"},mode:{supercool:"SuperCool",superfrost:"SuperFrost",nightmode:"\xC9jszakai m\xF3d",partymode:"PartyMode",light:"Bels\u0151 vil\xE1g\xEDt\xE1s"},mode_hint:{supercool:"Gyors leh\u0171t\xE9s friss bev\xE1s\xE1rl\xE1s ut\xE1n; a g\xE9p egy id\u0151 ut\xE1n mag\xE1t\xF3l kikapcsolja.",superfrost:"Gyorsfagyaszt\xE1s: a fagyaszt\xF3t\xE9r a betett \xE9tel meg\xF3v\xE1s\xE1\xE9rt m\xE9lyh\u0171t.",nightmode:"A kijelz\u0151 \xE9s a hangjelz\xE9sek elhalv\xE1nyulnak \xE9jszak\xE1ra.",partymode:"Italh\u0171t\xE9s vend\xE9gs\xE9gre: a g\xE9p er\u0151sebben h\u0171t."},select:{icemaker:"J\xE9gk\xE9sz\xEDt\u0151",hydrobreeze:"HydroBreeze",biofresh:"BioFresh-Plus"},option:{off:"Ki",on:"Be",low:"Alacsony",medium:"K\xF6zepes",high:"Magas",max_ice:"MaxIce",minus_two_minus_two:"-2 \xB0C | -2 \xB0C",minus_two_zero:"-2 \xB0C | 0 \xB0C",zero_minus_two:"0 \xB0C | -2 \xB0C",zero_zero:"0 \xB0C | 0 \xB0C"},alert:{door_open:"Az ajt\xF3 nyitva \u2013 csukd be, hogy tartsa a h\u0151m\xE9rs\xE9kletet"},status:{normal:"Norm\xE1l \xFCzem",cooling:"H\u0171t",supercool:"SuperCool",superfrost:"SuperFrost",party:"PartyMode",night:"\xC9jszakai m\xF3d"},ui:{current:"Aktu\xE1lis",target:"C\xE9l",setpoint:"Be\xE1ll\xEDtott h\u0151m\xE9rs\xE9klet",at_target:"H\u0151m\xE9rs\xE9kleten",cooling_down:"H\u0171t a be\xE1ll\xEDtott \xE9rt\xE9kre",above_target:"{diff} \xB0C-kal melegebb a be\xE1ll\xEDtottn\xE1l",below_target:"{diff} \xB0C-kal hidegebb a be\xE1ll\xEDtottn\xE1l",boosting_cool:"SuperCool: gyors leh\u0171t\xE9s fut",boosting_frost:"SuperFrost: gyorsfagyaszt\xE1s fut",modes:"\xDCzemm\xF3dok",zones:"Z\xF3n\xE1k",details:"R\xE9szletek",model:"T\xEDpus",zone_count:"Z\xF3n\xE1k sz\xE1ma",door:"AutoDoor",door_open:"Az ajt\xF3 nyitva",door_state:"Ajt\xF3",light_level:"F\xE9nyer\u0151",other:"Tov\xE1bbi entit\xE1sok",not_configured:"Nem tal\xE1lhat\xF3 Liebherr k\xE9sz\xFCl\xE9k. V\xE1laszd ki az eszk\xF6zt a k\xE1rtya be\xE1ll\xEDt\xE1saiban.",unavailable:"A k\xE9sz\xFCl\xE9k entit\xE1sai nem \xE9rhet\u0151k el.",open:"nyitva",closed:"z\xE1rva"},editor:{device:"Eszk\xF6z",device_auto:"Automatikus felismer\xE9s",name:"N\xE9v",language:"Nyelv",language_auto:"Automatikus (HA nyelve)",sections:"L\xE1that\xF3 szekci\xF3k",show_zones:"Z\xF3n\xE1k \xE9s h\u0151m\xE9rs\xE9klet-\xE1ll\xEDt\xE1s",show_modes:"\xDCzemm\xF3dok",show_selects:"BioFresh / HydroBreeze / j\xE9gk\xE9sz\xEDt\u0151",show_details:"R\xE9szletek",show_extra:"Tov\xE1bbi entit\xE1sok",compact:"Kompakt elrendez\xE9s",animate:"Anim\xE1ci\xF3k"}},ge={card_name:"Fridge",zone:{single:"Fridge",top:"Top zone",middle:"Middle zone",bottom:"Bottom zone"},mode:{supercool:"SuperCool",superfrost:"SuperFrost",nightmode:"Night mode",partymode:"PartyMode",light:"Interior light"},mode_hint:{supercool:"Rapid cooling after a big shop; the appliance turns it off again by itself.",superfrost:"Rapid freezing so fresh food keeps what is already frozen.",nightmode:"Dims the display and the alarms for the night.",partymode:"Chills drinks faster for guests."},select:{icemaker:"Ice maker",hydrobreeze:"HydroBreeze",biofresh:"BioFresh-Plus"},option:{off:"Off",on:"On",low:"Low",medium:"Medium",high:"High",max_ice:"MaxIce",minus_two_minus_two:"-2 \xB0C | -2 \xB0C",minus_two_zero:"-2 \xB0C | 0 \xB0C",zero_minus_two:"0 \xB0C | -2 \xB0C",zero_zero:"0 \xB0C | 0 \xB0C"},alert:{door_open:"The door is open - close it to keep the temperature"},status:{normal:"Running",cooling:"Cooling",supercool:"SuperCool",superfrost:"SuperFrost",party:"PartyMode",night:"Night mode"},ui:{current:"Current",target:"Target",setpoint:"Setpoint",at_target:"At temperature",cooling_down:"Cooling to the setpoint",above_target:"{diff} \xB0C above the setpoint",below_target:"{diff} \xB0C below the setpoint",boosting_cool:"SuperCool is running",boosting_frost:"SuperFrost is running",modes:"Modes",zones:"Zones",details:"Details",model:"Model",zone_count:"Zones",door:"AutoDoor",door_open:"The door is open",door_state:"Door",light_level:"Brightness",other:"Other entities",not_configured:"No Liebherr appliance found. Pick the device in the card settings.",unavailable:"The appliance entities are unavailable.",open:"open",closed:"closed"},editor:{device:"Device",device_auto:"Auto detect",name:"Name",language:"Language",language_auto:"Automatic (HA language)",sections:"Visible sections",show_zones:"Zones and temperature control",show_modes:"Modes",show_selects:"BioFresh / HydroBreeze / ice maker",show_details:"Details",show_extra:"Other entities",compact:"Compact layout",animate:"Animations"}},y9={hu:fe,en:ge},e3=Object.keys(y9);function j2(t,C){return T(t,C,e3)}function K2(t){return $(y9,t)}var H3="liebherr";function V3(t){return Object.values(t?.entities||{})}function d2(t){let C=new Map;for(let e of V3(t)){if(e.platform!==H3||!e.device_id)continue;let H=t.devices?.[e.device_id];H&&C.set(e.device_id,H.name_by_user||H.name||e.device_id)}return[...C.entries()].map(([e,H])=>({id:e,name:H}))}function Ze(t,C){if(C?.device)return C.device;let e=d2(t);return e.length===1?e[0].id:null}function Se(t){let C=Object.keys(t?.states||{}).filter(e=>/^number\..+_setpoint(_temperature)?$/.test(e));return C.length!==1?null:C[0].replace(/^number\./,"").replace(/_setpoint(_temperature)?$/,"")}function _e(t,C){let e=V3(t).filter(V=>V.device_id===C&&V.platform===H3).map(V=>V.entity_id.split(".")[1]);if(!e.length)return null;let H=e[0];for(let V of e.slice(1)){let r=0;for(;r<H.length&&r<V.length&&H[r]===V[r];)r+=1;H=H.slice(0,r)}return H.replace(/_+$/,"")||null}function b9(t,C){let e=Ze(t,C),H=C?.prefix||_e(t,e)||Se(t),V=C?.entities||{},r=new Set,L=V3(t).filter(m=>m.platform===H3&&(!e||m.device_id===e)),a=new Map;for(let m of L)m.translation_key&&!a.has(m.translation_key)&&a.set(m.translation_key,m.entity_id);let o=m=>m&&t?.states?.[m]?m:null,M=(m,g,A,y)=>{let _=y?`${g}_${s2[y]}`:g,S=a.get(_);if(S&&S.startsWith(`${m}.`)&&o(S))return S;if(!H||!A)return null;let f=y?`${H}_${s2[y]}_${A}`:`${H}_${A}`;return o(`${m}.${f}`)},n=m=>{if(m){let A=a.get(s2[m]);return A&&A.startsWith("sensor.")&&o(A)?A:H?o(`sensor.${H}_${s2[m]}`):null}let g=L.find(A=>A.entity_id.startsWith("sensor.")&&!A.translation_key&&t?.states?.[A.entity_id]?.attributes?.device_class==="temperature");return g?g.entity_id:H?o(`sensor.${H}`):null},l=m=>{let g={position:m};g.temp=n(m),g.setpoint=M("number","setpoint_temperature","setpoint",m);for(let[A,[y,_]]of Object.entries(z1))g[A]=M("switch",y,_,m);for(let[A,[y,_]]of Object.entries(I1))g[A]=M("select",y,_,m);return g.autodoor=M("cover","auto_door","autodoor",m),g},d=S9.map(l).filter(m=>m.setpoint||m.temp),p={...l(null),temp:n(null)},c=d.length?d:p.setpoint||p.temp?[p]:[],h={device:e,prefix:H,zones:c,light:M("light","presentation_light","presentation_light",null)};for(let[m,[g,A]]of Object.entries(l2))h[m]=M("switch",g,A,null);for(let[m,g]of Object.entries(V)){let A=/^zone(\d)_(.+)$/.exec(m);if(A){let y=h.zones[Number(A[1])-1];y&&(y[A[2]]=g);continue}h[m]=g}for(let m of h.zones)for(let g of Object.values(m))typeof g=="string"&&r.add(g);for(let m of["light",...Object.keys(l2)])h[m]&&r.add(h[m]);return h.extra=L.map(m=>m.entity_id).filter(m=>!r.has(m)&&t?.states?.[m]).sort(),h}function k9(t){if(x(t))return null;let C=Number(t.state);return Number.isFinite(C)?C:null}function t3(t){return x(t)?null:t.state==="on"}function ye(t){if(!t||x(t))return null;let C=t.attributes||{};return{value:k9(t),min:Number.isFinite(C.min)?C.min:2,max:Number.isFinite(C.max)?C.max:9,step:Number.isFinite(C.step)&&C.step>0?C.step:1,unit:C.unit_of_measurement||"\xB0C"}}function w9(t){if(!t||x(t))return null;let C=String(t.state).toLowerCase();return["on","open","opening"].includes(C)?!0:["off","closed","closing"].includes(C)?!1:null}function be(t){if(!t||x(t))return null;let C=t.attributes?.options;return{state:t.state,options:Array.isArray(C)?C:[]}}function we(t,C,e){if(C?.name)return C.name;let H=e.device?t.devices?.[e.device]:null;return H?H.name_by_user||H.name:(e.zones[0]?.temp?t.states[e.zones[0].temp]:null)?.attributes?.friendly_name||null}function ke(t,C,e){if(C?.subtitle!==void 0)return C.subtitle||null;let H=e.device?t.devices?.[e.device]:null;return H&&(H.model_id||H.model)||null}function O9(t,C){let e=b9(t,C),H=n=>n?t.states[n]:void 0;if(!e.zones.length)return{ok:!1,reason:e.device||e.prefix?"unavailable":"not_configured",entities:e};let V=e.zones.map((n,l)=>{let d=ye(H(n.setpoint)),p=k9(H(n.temp)),c=H(n.temp)?.attributes?.unit_of_measurement||d?.unit||"\xB0C",h=d?.value??null,m={};for(let A of Object.keys(z1))m[A]=n[A]?{entityId:n[A],on:t3(H(n[A]))}:null;let g={};for(let A of Object.keys(I1))g[A]=n[A]?{entityId:n[A],...be(H(n[A]))}:null;return{index:l,position:n.position,entityIds:n,current:p,target:h,unit:c,setpoint:d,switches:m,selects:g,autodoor:n.autodoor?{entityId:n.autodoor,state:H(n.autodoor)?.state}:null,door:(()=>{let A=n.door||n.autodoor;return A?{entityId:A,open:w9(H(A))}:null})(),warming:p!==null&&h!==null?p-h>C3:!1,atTarget:p!==null&&h!==null?Math.abs(p-h)<=C3:null}}),r={};for(let n of Object.keys(l2))r[n]=e[n]?{entityId:e[n],on:t3(H(e[n]))}:null;let L=e.door?{entityId:e.door,open:w9(H(e.door))}:null,a=V.map((n,l)=>({index:l,zone:n})).filter(({zone:n})=>n.door?.open===!0);L?.open===!0&&!a.length&&a.push({index:0,zone:V[0]});let o=H(e.light),M=V.some(n=>n.switches.supercool?.on||n.switches.superfrost?.on);return{ok:!0,entities:e,name:we(t,C,e),model:ke(t,C,e),zones:V,modes:r,light:o?{entityId:e.light,on:t3(o),brightness:o.attributes?.brightness??null}:null,boosting:M,door:L,openDoors:a.map(({index:n})=>n),doorOpen:a.length>0,nightMode:r.nightmode?.on===!0,partyMode:r.partymode?.on===!0,cooling:M||V.some(n=>n.warming),extra:(e.extra||[]).map(n=>({entityId:n,name:t.states[n]?.attributes?.friendly_name||n,state:t.states[n]?.state}))}}function Oe(t){let C=Math.min(Math.max(t,1),3),e=C===1?[1]:C===2?[1.55,1]:[1.4,1,1],H=e.reduce((a,o)=>a+o,0),V=248-6*(C-1),r=[],L=8;for(let a of e){let o=V*a/H;r.push({y:L,height:o}),L+=o+6}return r}function Ee(t,C){let{y:e,height:H}=t,V={x:34,y:e+22,w:108,h:H-36};return`
  <g class="compartment" data-zone="${C}">
    <g class="interior" clip-path="url(#fridge-inner-${C})">
      <rect class="cavity" x="${V.x}" y="${V.y}" width="${V.w}" height="${V.h}" rx="5"/>
      <rect class="glow" x="${V.x}" y="${V.y}" width="${V.w}" height="${V.h}" rx="5"/>
      <g class="shelves">
        ${[.3,.56].map(r=>`<rect x="${V.x+6}" y="${(V.y+V.h*r).toFixed(1)}" width="${V.w-12}" height="3" rx="1.5"/>`).join("")}
        <rect class="drawer" x="${V.x+6}" y="${(V.y+V.h*.76).toFixed(1)}"
          width="${V.w-12}" height="${(V.h*.2).toFixed(1)}" rx="3"/>
      </g>
      <g class="airflow">
        ${[.2,.45,.7].map((r,L)=>`<path style="--delay:${L*.5}s" d="M${V.x+14} ${(V.y+V.h*r).toFixed(1)} h${V.w-28}"/>`).join("")}
      </g>
      <g class="flakes">
        ${[[.28,.18],[.62,.12],[.45,.42],[.78,.3]].map(([r,L],a)=>`<g transform="translate(${(V.x+V.w*r).toFixed(1)} ${(V.y+V.h*L).toFixed(1)})">
                 <g class="flake" style="--delay:${a*.7}s">
                   <path d="M0 -4 V4 M-3.5 -2 L3.5 2 M-3.5 2 L3.5 -2"/>
                 </g>
               </g>`).join("")}
      </g>
    </g>
    <rect class="inner-frame" x="${V.x}" y="${V.y}" width="${V.w}" height="${V.h}" rx="5"/>
  </g>`}function Te(t,C,e){let{y:H,height:V}=t,r={x:34,y:H+22,w:108,h:V-36},L=C===0;return`
  <g class="door" data-zone="${C}" style="--hinge-y:${(H+V/2).toFixed(1)}px">
    <rect class="door-panel" x="22" y="${H}" width="156" height="${V}" rx="8"/>
    <rect class="door-shade" x="22" y="${H}" width="156" height="${V}" rx="8"/>
    <rect class="door-inset" x="${r.x}" y="${r.y}" width="${r.w}" height="${r.h}" rx="5"/>

    ${L?`<g class="display">
             <rect class="display-body" x="${r.x}" y="${H+7}" width="${r.w}" height="12" rx="3"/>
             <text class="display-text" x="${r.x+r.w/2}" y="${H+16.4}" text-anchor="middle">--</text>
             <circle class="display-led" cx="${r.x+7}" cy="${H+13}" r="2"/>
           </g>`:""}

    <rect class="handle" x="150" y="${H+12}" width="7" height="${Math.max(24,V-30)}" rx="3.5"/>
    ${e>1&&C<e-1?`<path class="seam" d="M22 ${(H+V+6/2).toFixed(1)} H178"/>`:""}
  </g>`}function E9(t=1){let C=Oe(t),e=C.map((H,V)=>`<clipPath id="fridge-inner-${V}"><rect x="34" y="${H.y+22}" width="108" height="${H.height-36}" rx="5"/></clipPath>`).join("");return`
<svg class="fridge" viewBox="0 0 200 264" role="img" aria-hidden="true" data-zones="${C.length}">
  <defs>
    ${e}
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
  ${C.map((H,V)=>Ee(H,V)).join("")}
  ${C.map((H,V)=>Te(H,V,C.length)).join("")}
  <g class="feet"><rect x="26" y="258" width="14" height="5" rx="2"/><rect x="160" y="258" width="14" height="5" rx="2"/></g>
</svg>`}function T9(t,C){let e=t.querySelector(".display-text");e&&e.textContent!==C&&(e.textContent=C)}var $e=`
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
`,$9=`${R}
${$e}`;var i3={language:"auto",compact:!1,animate:!0,show_zones:!0,show_modes:!0,show_selects:!0,show_details:!0,show_extra:!1},r3={supercool:"snowflake",superfrost:"frost",nightmode:"night",partymode:"party"},Re={icemaker:"ice",hydrobreeze:"mist",biofresh:"leaf"},L3=class extends HTMLElement{static getConfigElement(){return document.createElement(n2)}static getStubConfig(C){let e=d2(C);return{type:`custom:${o1}`,device:e[0]?.id}}constructor(){super(),this.attachShadow({mode:"open"}),this._sections={},this._signatures={},this._built=!1}setConfig(C){this._config={...i3,...C||{}},this._signatures={},this._hass&&this._render()}set hass(C){this._hass=C,this._render()}get hass(){return this._hass}getCardSize(){return this._config?.compact?4:7}getGridOptions(){return{columns:12,min_columns:6,rows:"auto"}}_build(){let C=document.createElement("style");C.textContent=$9;let e=document.createElement("ha-card"),H=document.createElement("div");H.className="wrap",H.addEventListener("click",V=>this._onClick(V));for(let V of["header","hero","alerts","zones","modes","selects","details"]){let r=document.createElement("div");r.dataset.section=V,this._sections[V]=r,H.appendChild(r)}e.appendChild(H),this.shadowRoot.replaceChildren(C,e),this._wrap=H,this._built=!0}_render(){if(!this._hass||!this._config)return;this._built||this._build();let C=K2(j2(this._config,this._hass)),e=O9(this._hass,this._config);if(this._model=e,!e.ok){this._renderEmpty(e,C);return}this._emptyShown=!1,this._applyHostClasses(e),this._section("header",this._headerHtml(e,C)),this._heroSection(e,C),this._section("alerts",this._alertsHtml(e,C)),this._section("zones",this._config.show_zones?this._zonesHtml(e,C):""),this._section("modes",this._config.show_modes?this._modesHtml(e,C):""),this._section("selects",this._config.show_selects?this._selectsHtml(e,C):""),this._section("details",this._detailsHtml(e,C))}_renderEmpty(C,e){if(this._emptyShown!==C.reason){this._emptyShown=C.reason,this._signatures={};for(let H of Object.values(this._sections))H.innerHTML="",H.hidden=!1;this._sections.header.innerHTML=`
      <div class="empty">
        ${s("fridge")}
        <div>${i(e(`ui.${C.reason}`))}</div>
      </div>`}}_section(C,e){this._signatures[C]!==e&&(this._signatures[C]=e,this._sections[C].innerHTML=e,this._sections[C].hidden=!e)}_applyHostClasses(C){let e=["wrap"];this._config.compact&&e.push("compact"),this._config.animate||e.push("no-animation"),this._hass.themes?.darkMode&&e.push("dark"),e.push(`accent-${this._accent(C)}`);let H=e.join(" ");this._wrap.className!==H&&(this._wrap.className=H)}_accent(C){return C.boosting?"running":C.nightMode?"idle":C.cooling?"running":"ready"}_status(C){return C.zones.some(e=>e.switches.superfrost?.on)?"superfrost":C.zones.some(e=>e.switches.supercool?.on)?"supercool":C.partyMode?"party":C.nightMode?"night":C.cooling?"cooling":"normal"}_headerHtml(C,e){let H=[];C.doorOpen&&H.push(`<span class="warn" title="${i(e("ui.door_open"))}">${s("door")}</span>`),C.nightMode&&H.push(`<span title="${i(e("mode.nightmode"))}">${s("night")}</span>`),C.partyMode&&H.push(`<span title="${i(e("mode.partymode"))}">${s("party")}</span>`),C.light?.on&&H.push(`<span title="${i(e("mode.light"))}">${s("bulb")}</span>`);let V=this._status(C);return`
      <div class="header">
        <div>
          <div class="title" data-action="more-info">${i(C.name||e("card_name"))}</div>
          ${C.model?`<div class="sub">${i(C.model)}</div>`:""}
        </div>
        <div class="spacer"></div>
        <div class="badges">${H.join("")}</div>
        <div class="pill">${s(V==="night"?"night":V==="party"?"party":"snowflake")}
          ${i(e(`status.${V}`))}</div>
      </div>`}_alertsHtml(C,e){if(!C.doorOpen)return"";let H=C.door?.entityId||C.zones[C.openDoors[0]]?.door?.entityId||"",V=C.zones.length>1&&C.openDoors.length?` \xB7 ${e(`zone.${C.zones[C.openDoors[0]].position||"single"}`)}`:"";return`
      <div class="alerts">
        <div class="alert pulse" data-action="more-info" data-entity="${i(H)}">
          ${s("door")}<span>${i(e("alert.door_open")+V)}</span>
        </div>
      </div>`}_heroSection(C,e){let H=C.zones.length;(!this._sections.hero.querySelector(".fridge")||this._zoneCount!==H)&&(this._zoneCount=H,this._sections.hero.innerHTML=`
        <div class="hero">
          <div class="fridge-wrap" data-action="more-info">${E9(H)}</div>
          <div class="status"></div>
        </div>`,this._statusNode=this._sections.hero.querySelector(".status"),this._signatures.status=void 0);let V=this._statusHtml(C,e);this._signatures.status!==V&&(this._signatures.status=V,this._statusNode.innerHTML=V);let r=this._sections.hero.querySelector(".fridge");r&&(r.classList.toggle("cooling",C.cooling),r.classList.toggle("boost",C.boosting),r.classList.toggle("night",C.nightMode),r.classList.toggle("light-on",!!C.light?.on),r.classList.toggle("door-open",C.doorOpen),r.querySelectorAll(".door").forEach(a=>{a.classList.toggle("open",C.openDoors.includes(Number(a.dataset.zone)))}));let L=C.zones[0];T9(this._sections.hero,L?.current!==null&&L?.current!==void 0?`${b(L.current,0)}\xB0`:"--")}_statusHtml(C,e){let H=C.zones[0],V=[];if(H?.current!==null&&H?.current!==void 0){let a=H.target!==null?`<span class="aim">${s("target")}${i(e("ui.target"))} ${b(H.target,0)} ${i(H.unit)}</span>`:"";V.push(`
        <div class="reading">
          <span class="value">${b(H.current,1)}</span>
          <span class="unit">${i(H.unit)}</span>
          ${a}
        </div>`)}let r=this._zoneHint(H,e);r&&V.push(`<div class="phase-text">${i(r)}</div>`);let L=[];for(let a of C.zones)for(let[o,M]of Object.entries(a.switches))M?.on&&L.push(`<span class="fact">${s(r3[o])}${i(e(`mode.${o}`))}${C.zones.length>1?` \xB7 ${i(e(`zone.${a.position||"single"}`))}`:""}</span>`);return C.nightMode&&L.push(`<span class="fact">${s("night")}${i(e("mode.nightmode"))}</span>`),L.length&&V.push(`<div class="facts">${L.join("")}</div>`),V.join("")}_zoneHint(C,e){if(!C||C.current===null||C.target===null)return"";if(C.switches.supercool?.on)return e("ui.boosting_cool");if(C.switches.superfrost?.on)return e("ui.boosting_frost");if(C.atTarget)return e("ui.at_target");let H=C.current-C.target;return H>0?e("ui.above_target").replace("{diff}",b(H,1)):e("ui.below_target").replace("{diff}",b(-H,1))}_zonesHtml(C,e){let H=C.zones.map((V,r)=>{let L=e(`zone.${V.position||"single"}`),a=C.zones.length>1,o=a&&V.current!==null?`<span class="now"><b>${b(V.current,1)}</b> ${i(V.unit)}</span>`:"",M=V.setpoint,n=M?`
          <div class="row">
            <button class="step-btn" type="button" data-action="step" data-zone="${r}" data-dir="-1"
              ${M.value!==null&&M.value<=M.min?"disabled":""}>\u2212</button>
            <div class="target">${M.value!==null?b(M.value,0):"\u2013"}<small>${i(M.unit)}</small></div>
            <button class="step-btn" type="button" data-action="step" data-zone="${r}" data-dir="1"
              ${M.value!==null&&M.value>=M.max?"disabled":""}>+</button>
            <div class="spacer"></div>
            <div class="chips">${this._presetsHtml(V,r)}</div>
          </div>`:"",l=a?this._zoneHint(V,e):"";return`
        <div class="zone ${V.atTarget?"at-target":""}">
          <div class="zone-head">${s("temperature")}<span>${i(a?L:e("ui.setpoint"))}</span>${o}</div>
          ${n}
          ${l?`<div class="hint">${i(l)}</div>`:""}
        </div>`});return H.length?`
      <div class="section">
        ${C.zones.length>1?`<div class="section-title">${i(e("ui.zones"))}</div>`:""}
        <div class="zones">${H.join("")}</div>
      </div>`:""}_presetsHtml(C,e){let H=C.setpoint;return H?_9.filter(V=>V>=H.min&&V<=H.max).map(V=>`
        <button class="chip" type="button" data-action="set" data-zone="${e}" data-value="${V}"
          aria-pressed="${H.value===V}">${V}\xB0</button>`).join(""):""}_modesHtml(C,e){let H=[];C.zones.forEach((V,r)=>{for(let L of Object.keys(z1)){let a=V.switches[L];if(!a)continue;let o=C.zones.length>1?`${e(`mode.${L}`)} \xB7 ${e(`zone.${V.position||"single"}`)}`:e(`mode.${L}`);H.push(`
          <button class="chip" type="button" data-action="toggle" data-entity="${i(a.entityId)}"
            aria-pressed="${a.on===!0}" title="${i(e(`mode_hint.${L}`,""))}">
            ${s(r3[L])}<span>${i(o)}</span></button>`)}});for(let V of["nightmode","partymode"]){let r=C.modes[V];r&&H.push(`
        <button class="chip" type="button" data-action="toggle" data-entity="${i(r.entityId)}"
          aria-pressed="${r.on===!0}" title="${i(e(`mode_hint.${V}`,""))}">
          ${s(r3[V])}<span>${i(e(`mode.${V}`))}</span></button>`)}return C.light&&H.push(`
        <button class="chip" type="button" data-action="toggle" data-entity="${i(C.light.entityId)}"
          aria-pressed="${C.light.on===!0}">
          ${s("bulb")}<span>${i(e("mode.light"))}</span></button>`),H.length?`
      <div class="section">
        <div class="section-title">${i(e("ui.modes"))}</div>
        <div class="chips">${H.join("")}</div>
      </div>`:""}_selectsHtml(C,e){let H=[];for(let V of C.zones)for(let r of Object.keys(I1)){let L=V.selects[r];if(!L||!L.options.length)continue;let a=C.zones.length>1?`${e(`select.${r}`)} \xB7 ${e(`zone.${V.position||"single"}`)}`:e(`select.${r}`),o=L.options.map(M=>`
            <button class="chip" type="button" data-action="select" data-entity="${i(L.entityId)}"
              data-value="${i(M)}" aria-pressed="${L.state===M}">
              ${i(e(`option.${M}`,M))}</button>`).join("");H.push(`
          <div class="section">
            <div class="section-title">${s(Re[r])} ${i(a)}</div>
            <div class="chips">${o}</div>
          </div>`)}return H.join("")}_detailsHtml(C,e){let H=[],V=(r,L,a)=>{L==null||L===""||H.push(`
        <div class="detail">
          <span class="k">${i(e(`ui.${r}`,r))}</span>
          <span class="v">${s(a)}${i(String(L))}</span>
        </div>`)};if(this._config.show_details){C.zones.length>1&&V("zone_count",C.zones.length,"fridge");for(let r of C.zones)r.autodoor?.state&&V("door",e(r.autodoor.state==="open"?"ui.open":"ui.closed"),"door");C.light?.brightness!==null&&C.light?.brightness!==void 0&&V("light_level",`${Math.round(C.light.brightness/255*100)} %`,"bulb")}if(this._config.show_extra)for(let r of C.extra)H.push(`
          <div class="detail" data-action="more-info" data-entity="${i(r.entityId)}">
            <span class="k">${i(r.name)}</span>
            <span class="v">${s("info")}${i(String(r.state??"\u2013"))}</span>
          </div>`);return H.length?`
      <div class="section">
        <div class="section-title">${i(e("ui.details"))}</div>
        <div class="details">${H.join("")}</div>
      </div>`:""}_onClick(C){let e=C.target.closest("[data-action]");if(!e||e.hasAttribute("disabled"))return;let{action:H,entity:V,value:r,zone:L,dir:a}=e.dataset,o=this._model;if(!(!o?.ok&&H!=="more-info"))switch(H){case"more-info":this._moreInfo(V||o?.zones?.[0]?.entityIds?.temp);break;case"toggle":this._haptic("light"),this._call(V.split(".")[0],"toggle",{entity_id:V});break;case"select":this._haptic("light"),this._call("select","select_option",{entity_id:V,option:r});break;case"step":this._step(Number(L),Number(a));break;case"set":this._setTemperature(Number(L),Number(r));break;default:break}}_step(C,e){let H=this._model?.zones?.[C]?.setpoint;if(!H)return;let V=H.value??H.min,r=Math.min(H.max,Math.max(H.min,V+e*H.step));r!==V&&this._setTemperature(C,r)}_setTemperature(C,e){let H=this._model?.zones?.[C];if(!H?.setpoint||!H.entityIds.setpoint)return;let V=Math.min(H.setpoint.max,Math.max(H.setpoint.min,e));this._haptic("light"),this._call("number","set_value",{entity_id:H.entityIds.setpoint,value:V})}_call(C,e,H){return H.entity_id?this._hass.callService(C,e,H):Promise.resolve()}_moreInfo(C){C&&this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:C},bubbles:!0,composed:!0}))}_haptic(C){this.dispatchEvent(new CustomEvent("haptic",{detail:C,bubbles:!0,composed:!0}))}};function R9(){customElements.get(o1)||(customElements.define(o1,L3),window.customCards=window.customCards||[],window.customCards.push({type:o1,name:"Liebherr Fridge Card",description:"Card for Liebherr fridges and freezers: temperature per zone, SuperCool / SuperFrost, night mode and BioFresh.",preview:!0,documentationURL:"https://github.com/gabor-io/ha-appliance-custom-card"}),console.info(`%c ${o1} %c ${Z9} `,"color:#fff;background:#0b6ea8;font-weight:700;border-radius:3px 0 0 3px","color:#0b6ea8;background:#e1f3fb;font-weight:700;border-radius:0 3px 3px 0"))}var Be=N({cardName:o1,toggles:["show_zones","show_modes","show_selects","show_details","show_extra","compact","animate"],defaults:i3,listDevices:d2,getLanguage:j2,translator:K2,languages:e3});function B9(){customElements.get(n2)||customElements.define(n2,Be)}B9();R9();var M1="fisher-erv-card",p2="fisher-erv-card-editor",P9="1.24.1",Q2=[{key:"manual",option:"Manual",icon:"manual"},{key:"auto",option:"auto",icon:"auto"},{key:"sleep",option:"sleep",icon:"sleep"},{key:"pure_l",option:"Pure L",icon:"leaf"},{key:"pure_m",option:"Pure M",icon:"leaf"},{key:"pure_h",option:"Pure H",icon:"leaf"}],Y2=[{key:"supply",icon:"supply"},{key:"exhaust",icon:"exhaust"}],N9=[{max:600,level:"excellent"},{max:800,level:"good"},{max:1e3,level:"fair"},{max:1400,level:"poor"},{max:1/0,level:"bad"}],F9=[{max:10,level:"excellent"},{max:15,level:"good"},{max:25,level:"fair"},{max:50,level:"poor"},{max:1/0,level:"bad"}],D9=1,z9=14;var Pe={card_name:"Szell\u0151ztet\u0151",preset:{manual:"K\xE9zi",auto:"Automata",sleep:"Alv\xF3",pure_l:"Pure L",pure_m:"Pure M",pure_h:"Pure H"},preset_hint:{manual:"A k\xE9t ventil\xE1tor fordulatsz\xE1m\xE1t te \xE1ll\xEDtod.",auto:"A g\xE9p a m\xE9rt CO\u2082 alapj\xE1n szab\xE1lyoz.",sleep:"Halk \xE9jszakai \xFCzem, minim\xE1lis fordulatsz\xE1mon.",pure_l:"Tiszt\xEDt\xE1s alacsony fokozaton.",pure_m:"Tiszt\xEDt\xE1s k\xF6zepes fokozaton.",pure_h:"Tiszt\xEDt\xE1s magas fokozaton."},level:{excellent:"Kiv\xE1l\xF3",good:"J\xF3",fair:"Megfelel\u0151",poor:"M\xE9rs\xE9kelt",bad:"Rossz"},alert:{problem:"A k\xE9sz\xFCl\xE9k hib\xE1t jelez",problem_code:"A k\xE9sz\xFCl\xE9k hib\xE1t jelez (k\xF3d: {code})",filter_due:"A sz\u0171r\u0151 \xE9lettartama lej\xE1r: {days} nap van h\xE1tra",filter_over:"A sz\u0171r\u0151 \xE9lettartama lej\xE1rt \u2013 cser\xE9ld ki, majd null\xE1zd",co2_high:"Magas CO\u2082-szint: {value} ppm \u2013 \xE9rdemes szell\u0151ztetni",offline:"A k\xE9sz\xFCl\xE9k nem v\xE1laszol \u2013 ezek nem friss adatok"},ui:{co2:"Sz\xE9n-dioxid",not_sampling:"\xC1ll\xF3 g\xE9pn\xE9l nem m\xE9r",pm25:"Sz\xE1ll\xF3 por (PM2,5)",temperature:"H\u0151m\xE9rs\xE9klet",humidity:"P\xE1ratartalom",modes:"\xDCzemm\xF3dok",speeds:"Fordulatsz\xE1m",supply:"Bef\xFAv\xE1s",exhaust:"Elsz\xEDv\xE1s",filter:"Sz\u0171r\u0151",filter_left:"H\xE1tral\xE9v\u0151 \xE9lettartam",filter_lifespan:"Sz\u0171r\u0151 \xE9lettartama",filter_reset:"Sz\u0171r\u0151 null\xE1z\xE1sa",details:"R\xE9szletek",other:"Tov\xE1bbi entit\xE1sok",off:"Kikapcsolva",on:"M\u0171k\xF6dik",offline:"Nem el\xE9rhet\u0151",power_on:"Bekapcsol\xE1s",power_off:"Kikapcsol\xE1s",not_configured:"Nem tal\xE1lhat\xF3 Tuya szell\u0151ztet\u0151. V\xE1laszd ki az eszk\xF6zt a k\xE1rtya be\xE1ll\xEDt\xE1saiban.",unavailable:"A k\xE9sz\xFCl\xE9k entit\xE1sai nem \xE9rhet\u0151k el.",days:"nap",no_pm25:"A k\xE9sz\xFCl\xE9k nem k\xFCld PM2,5 \xE9rt\xE9ket"},editor:{device:"Eszk\xF6z",device_auto:"Automatikus felismer\xE9s",name:"N\xE9v",language:"Nyelv",language_auto:"Automatikus (HA nyelve)",sections:"L\xE1that\xF3 szekci\xF3k",show_air:"Leveg\u0151min\u0151s\xE9g",show_pm25:"PM2,5 csempe",show_modes:"\xDCzemm\xF3dok",show_speeds:"Fordulatsz\xE1mok",show_filter:"Sz\u0171r\u0151",show_extra:"Tov\xE1bbi entit\xE1sok",compact:"Kompakt elrendez\xE9s",animate:"Anim\xE1ci\xF3k"}},Ne={card_name:"Ventilator",preset:{manual:"Manual",auto:"Auto",sleep:"Sleep",pure_l:"Pure L",pure_m:"Pure M",pure_h:"Pure H"},preset_hint:{manual:"You set both fan speeds yourself.",auto:"The appliance follows the measured CO\u2082.",sleep:"Quiet night mode at the lowest speed.",pure_l:"Cleaning at low speed.",pure_m:"Cleaning at medium speed.",pure_h:"Cleaning at high speed."},level:{excellent:"Excellent",good:"Good",fair:"Fair",poor:"Poor",bad:"Bad"},alert:{problem:"The appliance reports a fault",problem_code:"The appliance reports a fault (code {code})",filter_due:"Filter life is running out: {days} days left",filter_over:"Filter life is over - replace it and reset the counter",co2_high:"High CO\u2082: {value} ppm - time to ventilate",offline:"The appliance is not responding - these readings are not current"},ui:{co2:"Carbon dioxide",not_sampling:"Not sampling while stopped",pm25:"Particulates (PM2.5)",temperature:"Temperature",humidity:"Humidity",modes:"Modes",speeds:"Fan speed",supply:"Supply",exhaust:"Exhaust",filter:"Filter",filter_left:"Life left",filter_lifespan:"Filter lifespan",filter_reset:"Reset filter",details:"Details",other:"Other entities",off:"Off",on:"Running",offline:"Unavailable",power_on:"Turn on",power_off:"Turn off",not_configured:"No Tuya ventilator found. Pick the device in the card settings.",unavailable:"The appliance entities are unavailable.",days:"days",no_pm25:"The appliance reports no PM2.5 value"},editor:{device:"Device",device_auto:"Auto detect",name:"Name",language:"Language",language_auto:"Automatic (HA language)",sections:"Visible sections",show_air:"Air quality",show_pm25:"PM2.5 tile",show_modes:"Modes",show_speeds:"Fan speeds",show_filter:"Filter",show_extra:"Other entities",compact:"Compact layout",animate:"Animations"}},I9={hu:Pe,en:Ne},a3=Object.keys(I9);function q2(t,C){return T(t,C,a3)}function X2(t){return $(I9,t)}var W9="tuya_local";function U9(t){return Object.values(t?.entities||{})}function A2(t){let C=new Map;for(let e of U9(t)){if(e.platform!==W9||!e.device_id||!e.entity_id.startsWith("fan."))continue;let H=t.devices?.[e.device_id];H&&C.set(e.device_id,H.name_by_user||H.name||e.device_id)}return[...C.entries()].map(([e,H])=>({id:e,name:H}))}function Fe(t,C){if(C?.device)return C.device;let e=A2(t);return e.length===1?e[0].id:null}function De(t){let C=Object.keys(t?.states||{}).filter(e=>e.startsWith("fan."));return C.length===1?C[0].slice(4):null}function G9(t,C){let e=Fe(t,C),H=C?.prefix||De(t),V=C?.entities||{},r=U9(t).filter(p=>p.platform===W9&&(e?p.device_id===e:!0)&&t?.states?.[p.entity_id]),L=r.length?r.map(p=>p.entity_id):Object.keys(t?.states||{}).filter(p=>H&&p.includes(H)),a=p=>t?.states?.[p],o=p=>p.split(".")[0],M=p=>a(p)?.attributes?.device_class||null,n=(p,{deviceClass:c=null,hint:h=null}={})=>L.find(m=>!(o(m)!==p||c&&M(m)!==c||h&&!m.includes(h)))||null,l={device:e,prefix:H,fan:n("fan"),co2:n("sensor",{deviceClass:"carbon_dioxide"}),pm25:n("sensor",{deviceClass:"pm25"}),humidity:n("sensor",{deviceClass:"humidity"}),temperature:n("sensor",{deviceClass:"temperature"}),filter_life:n("sensor",{deviceClass:"duration"}),filter_lifespan:n("select"),filter_reset:n("button"),problem:n("binary_sensor",{deviceClass:"problem"}),supply:n("number",{hint:"supply"})||n("number"),exhaust:n("number",{hint:"exhaust"})};l.exhaust&&l.exhaust===l.supply&&(l.exhaust=null),l.exhaust||(l.exhaust=L.find(p=>o(p)==="number"&&p!==l.supply)||null);for(let[p,c]of Object.entries(V))l[p]=c;let d=new Set(Object.values(l).filter(p=>typeof p=="string"&&p.includes(".")));return l.extra=L.filter(p=>!d.has(p)).sort(),l}function E1(t){if(x(t))return null;let C=Number(t.state);return Number.isFinite(C)?C:null}function j9(t,C,e=!0){if(!t||x(t))return null;let H=E1(t);if(H===null)return null;let V=t.attributes?.unit_of_measurement||"";if(!e)return{value:H,unit:V,level:null,ratio:0,measuring:!1};let r=C.find(a=>H<=a.max)||C[C.length-1],L=C[C.length-2]?.max||1;return{value:H,unit:V,level:r.level,ratio:Math.max(0,Math.min(1,H/L)),measuring:!0}}function ze(t){if(!t||x(t))return null;let C=t.attributes||{};return{value:E1(t),min:Number.isFinite(C.min)?C.min:1,max:Number.isFinite(C.max)?C.max:8,step:Number.isFinite(C.step)&&C.step>0?C.step:1}}function K9(t,C,e){if(C?.name)return C.name;let H=e.device?t.devices?.[e.device]:null;return H?H.name_by_user||H.name:t.states[e.fan]?.attributes?.friendly_name||null}function Ie(t,C,e,H){if(C?.subtitle!==void 0)return C.subtitle||null;let V=e.device?t.devices?.[e.device]:null;if(!V)return null;let r=(H||"").toLowerCase();return[V.model_id,V.model].filter(Boolean).find(a=>!r.includes(String(a).toLowerCase()))||null}function Q9(t,C){let e=G9(t,C),H=A=>A?t.states[A]:void 0,V=H(e.fan);if(!V)return{ok:!1,reason:e.device||e.prefix?"unavailable":"not_configured",entities:e};let r=!x(V),L=r&&V.state==="on",a=V.attributes?.preset_mode||null,o=Array.isArray(V.attributes?.preset_modes)?V.attributes.preset_modes:[],M=Q2.find(A=>A.option===a)||null,n={};for(let{key:A}of Y2){let y=e[A];n[A]=y?{entityId:y,...ze(H(y))||{}}:null}let l=E1(H(e.filter_life)),d=H(e.filter_lifespan),p=H(e.problem),c=E1(H(e.co2)),h=E1(H(e.pm25)),m=j9(H(e.co2),N9,c===null||c>=D9),g=j9(H(e.pm25),F9,L||h===null||h>0);return{ok:!0,entities:e,available:r,name:K9(t,C,e),model:Ie(t,C,e,K9(t,C,e)),on:L,preset:M,presetOption:a,presetOptions:o,co2:m,pm25:g,temperature:E1(H(e.temperature)),temperatureUnit:H(e.temperature)?.attributes?.unit_of_measurement||"\xB0C",humidity:E1(H(e.humidity)),speeds:n,speedDigit:n.supply?.value??n.exhaust?.value??null,filter:{days:l,entityId:e.filter_life,due:l!==null&&l<=z9,lifespan:d?{entityId:e.filter_lifespan,state:d.state,options:Array.isArray(d.attributes?.options)?d.attributes.options:[]}:null,reset:e.filter_reset||null},problem:p?{entityId:e.problem,on:p.state==="on",code:p.attributes?.fault_code??null}:null,extra:(e.extra||[]).map(A=>({entityId:A,name:t.states[A]?.attributes?.friendly_name||A,state:t.states[A]?.state}))}}function Y9(){return`
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
      ${[36,58,80].map((t,C)=>`<path style="--delay:${C*.4}s" d="M${t} 36 V196"/>`).join("")}
    </g>
    <g class="stream out">
      ${[47,69,91].map((t,C)=>`<path style="--delay:${C*.4+.2}s" d="M${t} 196 V36"/>`).join("")}
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
</svg>`}function q9(t,{co2:C,temp:e,humidity:H,speed:V,clock:r}){let L=(o,M)=>{let n=t.querySelector(o);n&&M!==void 0&&n.textContent!==M&&(n.textContent=M)};L(".erv .co2-value",C),L(".erv .speed",V),L(".erv .clock",r);let a=t.querySelectorAll(".erv text.small");a[0]&&a[0].textContent!==e&&(a[0].textContent=e),a[1]&&a[1].textContent!==H&&(a[1].textContent=H)}var We=`
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
`,X9=`${R}
${We}`;var M3={language:"auto",compact:!1,animate:!0,show_air:!0,show_pm25:!0,show_modes:!0,show_speeds:!0,show_filter:!0,show_extra:!1},o3=class extends HTMLElement{static getConfigElement(){return document.createElement(p2)}static getStubConfig(C){let e=A2(C);return{type:`custom:${M1}`,device:e[0]?.id}}constructor(){super(),this.attachShadow({mode:"open"}),this._sections={},this._signatures={},this._built=!1}setConfig(C){this._config={...M3,...C||{}},this._signatures={},this._hass&&this._render()}set hass(C){this._hass=C,this._render()}get hass(){return this._hass}connectedCallback(){this._timer=window.setInterval(()=>this._render(),3e4)}disconnectedCallback(){this._timer&&window.clearInterval(this._timer),this._timer=void 0}getCardSize(){return this._config?.compact?5:8}getGridOptions(){return{columns:12,min_columns:6,rows:"auto"}}_build(){let C=document.createElement("style");C.textContent=X9;let e=document.createElement("ha-card"),H=document.createElement("div");H.className="wrap",H.addEventListener("click",V=>this._onClick(V));for(let V of["header","hero","alerts","modes","speeds","filter","details"]){let r=document.createElement("div");r.dataset.section=V,this._sections[V]=r,H.appendChild(r)}e.appendChild(H),this.shadowRoot.replaceChildren(C,e),this._wrap=H,this._built=!0}_render(){if(!this._hass||!this._config)return;this._built||this._build();let C=X2(q2(this._config,this._hass)),e=Q9(this._hass,this._config);if(this._model=e,!e.ok){this._renderEmpty(e,C);return}this._emptyShown=!1,this._applyHostClasses(e),this._section("header",this._headerHtml(e,C)),this._heroSection(e,C),this._section("alerts",this._alertsHtml(e,C)),this._section("modes",this._config.show_modes?this._modesHtml(e,C):""),this._section("speeds",this._config.show_speeds?this._speedsHtml(e,C):""),this._section("filter",this._config.show_filter?this._filterHtml(e,C):""),this._section("details",this._detailsHtml(e,C))}_renderEmpty(C,e){if(this._emptyShown!==C.reason){this._emptyShown=C.reason,this._signatures={};for(let H of Object.values(this._sections))H.innerHTML="",H.hidden=!1;this._sections.header.innerHTML=`
      <div class="empty">
        ${s("wind")}
        <div>${i(e(`ui.${C.reason}`))}</div>
      </div>`}}_section(C,e){this._signatures[C]!==e&&(this._signatures[C]=e,this._sections[C].innerHTML=e,this._sections[C].hidden=!e)}_applyHostClasses(C){let e=["wrap"];this._config.compact&&e.push("compact"),this._config.animate||e.push("no-animation"),this._hass.themes?.darkMode&&e.push("dark"),e.push(`accent-${this._accent(C)}`);let H=e.join(" ");this._wrap.className!==H&&(this._wrap.className=H)}_accent(C){if(!C.available||!C.on)return"idle";if(C.problem?.on)return"alarm";let e=C.co2?.level;return e==="bad"||e==="poor"?"paused":"running"}_headerHtml(C,e){let H=[];C.problem?.on&&H.push(`<span class="bad" title="${i(e("alert.problem"))}">${s("error")}</span>`),C.filter.due&&H.push(`<span class="warn" title="${i(e("ui.filter"))}">${s("filter")}</span>`);let V=C.available?C.on?C.preset?e(`preset.${C.preset.key}`):C.presetOption||e("ui.on"):e("ui.off"):e("ui.offline");return`
      <div class="header">
        <div>
          <div class="title" data-action="more-info">${i(C.name||e("card_name"))}</div>
          ${C.model?`<div class="sub">${i(C.model)}</div>`:""}
        </div>
        <div class="spacer"></div>
        <div class="badges">${H.join("")}</div>
        <div class="pill">${s(C.available?C.on?"fan":"power":"offline")}${i(V)}</div>
      </div>`}_heroSection(C,e){this._sections.hero.querySelector(".erv")||(this._sections.hero.innerHTML=`
        <div class="hero">
          <div class="erv-wrap" data-action="more-info">${Y9()}</div>
          <div class="status"></div>
        </div>`,this._statusNode=this._sections.hero.querySelector(".status"));let H=this._config.show_air?this._airHtml(C,e):"";this._signatures.air!==H&&(this._signatures.air=H,this._statusNode.innerHTML=H);let V=this._sections.hero.querySelector(".erv");if(V){V.classList.toggle("running",C.on),V.classList.toggle("off",!C.on),V.classList.toggle("filter-due",C.filter.due);let r=C.speedDigit??1;V.style.setProperty("--flow-duration",`${(3.4-r*.3).toFixed(2)}s`)}q9(this._sections.hero,{co2:C.co2?.measuring?String(Math.round(C.co2.value)):"---",temp:C.temperature!==null?`${Math.round(C.temperature)}\xB0C`:"--\xB0C",humidity:C.humidity!==null?`${Math.round(C.humidity)}%`:"--%",speed:C.on&&C.speedDigit!==null?String(C.speedDigit):"-",clock:B(new Date,this._hass)})}_airHtml(C,e){let H=[],V=(L,a,o,M)=>a?a.measuring?`
        <div class="reading" data-action="more-info" data-entity="${i(M||"")}">
          <div class="top">${s(o)}<span>${i(e(`ui.${L}`))}</span>
            <span class="val level-${a.level}"><b>${b(a.value,0)}</b><small>${i(a.unit)}</small></span>
          </div>
          <div class="meter"><i class="fill-${a.level}" style="width:${Math.round(a.ratio*100)}%"></i></div>
          <div class="band level-${a.level}">${i(e(`level.${a.level}`))}</div>
        </div>`:`
        <div class="reading idle" data-action="more-info" data-entity="${i(M||"")}">
          <div class="top">${s(o)}<span>${i(e(`ui.${L}`))}</span>
            <span class="val">\u2013</span>
          </div>
          <div class="band">${i(e("ui.not_sampling"))}</div>
        </div>`:"";H.push(V("co2",C.co2,"co2",C.entities.co2)),this._config.show_pm25&&H.push(V("pm25",C.pm25,"pm25",C.entities.pm25));let r=[];return C.temperature!==null&&r.push(`<span class="fact" data-action="more-info" data-entity="${i(C.entities.temperature||"")}">
        ${s("temperature")}<b>${b(C.temperature,0)} ${i(C.temperatureUnit)}</b></span>`),C.humidity!==null&&r.push(`<span class="fact" data-action="more-info" data-entity="${i(C.entities.humidity||"")}">
        ${s("water_percent")}<b>${b(C.humidity,0)} %</b></span>`),r.length&&H.push(`<div class="climate">${r.join("")}</div>`),`<div class="air">${H.filter(Boolean).join("")}</div>`}_alertsHtml(C,e){let H=[];return C.available||H.push({severity:"error",text:e("alert.offline"),iconName:"offline",entityId:C.entities.fan}),C.problem?.on&&H.push({severity:"error",text:C.problem.code?e("alert.problem_code").replace("{code}",C.problem.code):e("alert.problem"),iconName:"error",entityId:C.problem.entityId}),C.filter.days!==null&&C.filter.days<=0?H.push({severity:"warning",text:e("alert.filter_over"),iconName:"filter",entityId:C.filter.entityId}):C.filter.due&&H.push({severity:"warning",text:e("alert.filter_due").replace("{days}",C.filter.days),iconName:"filter",entityId:C.filter.entityId}),C.on&&(C.co2?.level==="bad"||C.co2?.level==="poor")&&H.push({severity:"warning",text:e("alert.co2_high").replace("{value}",b(C.co2.value,0)),iconName:"co2",entityId:C.entities.co2}),H.length?`<div class="alerts">${H.map(V=>`
        <div class="alert ${V.severity}" data-action="more-info" data-entity="${i(V.entityId||"")}">
          ${s(V.iconName)}<span>${i(V.text)}</span>
        </div>`).join("")}</div>`:""}_modesHtml(C,e){let H=[];for(let V of C.presetOptions){let r=Q2.find(o=>o.option===V),L=r?e(`preset.${r.key}`):V,a=r?e(`preset_hint.${r.key}`,""):"";H.push(`
        <button class="chip" type="button" data-action="preset" data-value="${i(V)}"
          aria-pressed="${C.presetOption===V}" ${a?`title="${i(a)}"`:""}
          ${C.on?"":"disabled"}>
          ${s(r?.icon||"fan")}<span>${i(L)}</span></button>`)}return`
      <div class="section">
        <div class="section-title">${i(e("ui.modes"))}</div>
        <div class="chips">${H.join("")}</div>
        <div class="controls">
          <button class="btn ${C.on||!C.available?"":"primary"}" type="button"
            data-action="power" ${C.available?"":"disabled"}>
            ${s("power")}<span>${i(e(C.on?"ui.power_off":"ui.power_on"))}</span>
          </button>
        </div>
      </div>`}_speedsHtml(C,e){let H=Y2.map(({key:r,icon:L})=>{let a=C.speeds[r];if(!a||a.value===null||a.value===void 0)return"";let o=[];for(let M=a.min;M<=a.max;M+=a.step)o.push(`<i class="${M<=a.value?"on":""}"></i>`);return`
        <div class="speed-box">
          <div class="label">${s(L)}<span>${i(e(`ui.${r}`))}</span></div>
          <div class="row">
            <button class="step-btn" type="button" data-action="step" data-speed="${r}" data-dir="-1"
              ${a.value<=a.min?"disabled":""}>\u2212</button>
            <div class="value">${b(a.value,0)}</div>
            <button class="step-btn" type="button" data-action="step" data-speed="${r}" data-dir="1"
              ${a.value>=a.max?"disabled":""}>+</button>
            <div class="ticks">${o.join("")}</div>
          </div>
        </div>`}).filter(Boolean);if(!H.length)return"";let V=C.presetOption&&C.presetOption!=="Manual"?`<div class="note">${s("info")}<span>${i(e("preset_hint.auto"))}</span></div>`:"";return`
      <div class="section">
        <div class="section-title">${i(e("ui.speeds"))}</div>
        <div class="speeds">${H.join("")}</div>
        ${V}
      </div>`}_filterHtml(C,e){let H=[];C.filter.days!==null&&H.push(`
        <div class="fact" data-action="more-info" data-entity="${i(C.filter.entityId||"")}">
          ${s("filter")}<span>${i(e("ui.filter_left"))}</span>
          <b>${b(C.filter.days,0)} ${i(e("ui.days"))}</b></div>`),C.filter.reset&&H.push(`
        <button class="chip" type="button" data-action="filter-reset">
          ${s("reset")}<span>${i(e("ui.filter_reset"))}</span></button>`);let V=C.filter.lifespan,r=V?V.options.map(L=>`
          <button class="chip" type="button" data-action="lifespan" data-value="${i(L)}"
            aria-pressed="${V.state===L}">${i(this._lifespanLabel(L,e))}</button>`).join(""):"";return!H.length&&!r?"":`
      <div class="section">
        <div class="section-title">${i(e("ui.filter"))}</div>
        ${H.length?`<div class="facts">${H.join("")}</div>`:""}
        ${r?`<div class="chips">${r}</div>`:""}
      </div>`}_lifespanLabel(C,e){let H=/^(\d+)\s*days?$/i.exec(String(C).trim());return H?`${H[1]} ${e("ui.days")}`:C}_detailsHtml(C,e){if(!this._config.show_extra||!C.extra.length)return"";let H=C.extra.map(V=>`
        <div class="detail" data-action="more-info" data-entity="${i(V.entityId)}">
          <span class="k">${i(V.name)}</span>
          <span class="v">${s("info")}${i(String(V.state??"\u2013"))}</span>
        </div>`).join("");return`
      <div class="section">
        <div class="section-title">${i(e("ui.other"))}</div>
        <div class="details">${H}</div>
      </div>`}_onClick(C){let e=C.target.closest("[data-action]");if(!e||e.hasAttribute("disabled"))return;let{action:H,entity:V,value:r,speed:L,dir:a}=e.dataset,o=this._model;if(!(!o?.ok&&H!=="more-info"))switch(H){case"more-info":this._moreInfo(V||o?.entities?.fan);break;case"power":this._haptic("medium"),this._call("fan",o.on?"turn_off":"turn_on",{entity_id:o.entities.fan});break;case"preset":this._haptic("light"),this._call("fan","set_preset_mode",{entity_id:o.entities.fan,preset_mode:r});break;case"step":this._step(L,Number(a));break;case"lifespan":this._haptic("light"),this._call("select","select_option",{entity_id:o.filter.lifespan?.entityId,option:r});break;case"filter-reset":this._haptic("medium"),this._call("button","press",{entity_id:o.filter.reset});break;default:break}}_step(C,e){let H=this._model?.speeds?.[C];if(!H||H.value===null)return;let V=Math.min(H.max,Math.max(H.min,H.value+e*H.step));V!==H.value&&(this._haptic("light"),this._call("number","set_value",{entity_id:H.entityId,value:V}))}_call(C,e,H){return H.entity_id?this._hass.callService(C,e,H):Promise.resolve()}_moreInfo(C){C&&this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:C},bubbles:!0,composed:!0}))}_haptic(C){this.dispatchEvent(new CustomEvent("haptic",{detail:C,bubbles:!0,composed:!0}))}};function J9(){customElements.get(M1)||(customElements.define(M1,o3),window.customCards=window.customCards||[],window.customCards.push({type:M1,name:"Fisher ERV Card",description:"Card for Tuya heat-recovery ventilators: CO2 and PM2.5, temperature, humidity, fan speeds and the filter.",preview:!0,documentationURL:"https://github.com/gabor-io/ha-appliance-custom-card"}),console.info(`%c ${M1} %c ${P9} `,"color:#fff;background:#00796b;font-weight:700;border-radius:3px 0 0 3px","color:#00796b;background:#e0f2f1;font-weight:700;border-radius:0 3px 3px 0"))}var Ue=N({cardName:M1,toggles:["show_air","show_pm25","show_modes","show_speeds","show_filter","show_extra","compact","animate"],defaults:M3,listDevices:A2,getLanguage:q2,translator:X2,languages:a3});function C6(){customElements.get(p2)||customElements.define(p2,Ue)}C6();J9();var n1="daikin-ac-card",m2="daikin-ac-card-editor",e6="1.24.1",J2="daikin",W1=[{key:"off",icon:"power",colour:"var(--ap-off)"},{key:"heat_cool",icon:"auto",colour:"var(--ap-auto)"},{key:"heat",icon:"heat",colour:"var(--ap-heat)"},{key:"cool",icon:"snowflake",colour:"var(--ap-cool)"},{key:"dry",icon:"water",colour:"var(--ap-dry)"},{key:"fan_only",icon:"fan",colour:"var(--ap-fan)"}],n3=W1.map(t=>t.key),H6=["off","vertical"],V6=[{key:"boost",icon:"quick"},{key:"eco",icon:"leaf"},{key:"away",icon:"away"}],U1=["auto","silence","1","2","3","4","5"],t6=.5,r6=100,L6=["heat","cool","heat_cool","dry"],G1={min:1.5,max:4.6};var Ge={card_name:"Kl\xEDma",group_name:"Kl\xEDm\xE1k",mode:{off:"Ki",heat_cool:"Auto",heat:"F\u0171t\xE9s",cool:"H\u0171t\xE9s",dry:"P\xE1ra",fan_only:"Vent"},mode_long:{off:"Kikapcsolva",heat_cool:"Automata",heat:"F\u0171t\xE9s",cool:"H\u0171t\xE9s",dry:"P\xE1r\xE1tlan\xEDt\xE1s",fan_only:"Ventil\xE1tor"},fan:{auto:"Auto",silence:"Csendes",1:"1. fok",2:"2. fok",3:"3. fok",4:"4. fok",5:"5. fok"},swing:{off:"Ki",vertical:"F\xFCgg\u0151leges",horizontal:"V\xEDzszintes","3d":"3D"},preset:{boost:"Turb\xF3",eco:"Eco",away:"T\xE1voll\xE9t"},state:{standby:"K\xE9szenl\xE9tben",unavailable:"Nem el\xE9rhet\u0151",drying:"P\xE1r\xE1tlan\xEDt",fan_only:"Csak keringet",holding:"Tartja a {target} \xB0C-ot",heating_to:"F\u0171t {target} \xB0C-ra",cooling_to:"H\u0171t {target} \xB0C-ra",above_target:"A c\xE9lh\u0151fok felett",below_target:"A c\xE9lh\u0151fok alatt"},sub:{unavailable:"A g\xE9p nem v\xE1laszol",last_target:"Legut\xF3bbi c\xE9l {target} \xB0C",reached:"El\xE9rte a c\xE9lh\u0151m\xE9rs\xE9kletet",above_by:"{diff} \xB0C-kal a c\xE9l felett",below_by:"{diff} \xB0C-kal a c\xE9l alatt",compressor_idle:"A kompresszor \xE1ll",compressor_idle_power:"A kompresszor \xE1ll \xB7 {power} W"},group:{running:"{running} / {total} g\xE9p megy",all_off:"Mind \xE1ll",mixed:"Vegyes \xFCzem",mixed_note:"A sz\xE1mok \xE1tlagok \u2013 a g\xE9pek elt\xE9r\u0151en \xE1llnak",in_step:"Minden g\xE9p egyform\xE1n \xE1ll",units:"G\xE9pek",unit_count:"{total} g\xE9p",average:"\xE1tlag",tap_hint:"koppints a r\xE9szletek\xE9rt"},alert:{away:"T\xE1voll\xE9t m\xF3d \u2013 a g\xE9p csak fagyv\xE9delemre f\u0171t",window_open:"{name} \xB7 nyitva, mik\xF6zben a g\xE9p dolgozik ({duration})",window_tilted:"{name} \xB7 buk\xF3ra van, mik\xF6zben a g\xE9p dolgozik ({duration})",window_open_unit:"{unit} \xB7 nyitva az ablak, mik\xF6zben a g\xE9p dolgozik ({duration})",window_tilted_unit:"{unit} \xB7 buk\xF3ra van az ablak, mik\xF6zben a g\xE9p dolgozik ({duration})"},ui:{inside:"Bent",outside:"Kint",humidity:"P\xE1ratartalom",power:"Fogyaszt\xE1s",energy:"Havi fogyaszt\xE1s",device_reads:"g\xE9p",fan:"Vent",swing:"Lamella",warmer:"Melegebb",cooler:"Hidegebb",standby_short:"\xC1ll",window:"ablak",window_open:"nyitva",window_tilted:"buk\xF3ra",windows_open:"{count} nyitva",minute_short:"perce",hour_short:"\xF3r\xE1ja",no_entity:"Nem tal\xE1ltam Daikin kl\xEDm\xE1t. Add meg az `entity` be\xE1ll\xEDt\xE1st.",missing_entity:"A megadott entit\xE1s nem l\xE9tezik.",empty_group:"A csoportnak nincs egyetlen kl\xEDma tagja sem."},editor:{device:"K\xE9sz\xFCl\xE9k",device_auto:"Automatikus",language:"Nyelv",language_auto:"Automatikus",show_art:"K\xE9sz\xFCl\xE9krajz",show_readings:"M\xE9rt \xE9rt\xE9kek",show_modes:"\xDCzemm\xF3dok",show_fan:"Ventil\xE1tor",show_presets:"Turb\xF3 / Eco / T\xE1voll\xE9t",show_all_swing:"Minden lamella-opci\xF3",show_openings:"Nyit\xE1s\xE9rz\xE9kel\u0151k",compact:"Kompakt",animate:"Anim\xE1ci\xF3k"}},je={card_name:"Air conditioner",group_name:"Air conditioners",mode:{off:"Off",heat_cool:"Auto",heat:"Heat",cool:"Cool",dry:"Dry",fan_only:"Fan"},mode_long:{off:"Off",heat_cool:"Automatic",heat:"Heating",cool:"Cooling",dry:"Drying",fan_only:"Fan only"},fan:{auto:"Auto",silence:"Silence",1:"Step 1",2:"Step 2",3:"Step 3",4:"Step 4",5:"Step 5"},swing:{off:"Off",vertical:"Vertical",horizontal:"Horizontal","3d":"3D"},preset:{boost:"Powerful",eco:"Econo",away:"Away"},state:{standby:"Standing by",unavailable:"Unavailable",drying:"Drying",fan_only:"Moving air only",holding:"Holding {target} \xB0C",heating_to:"Heating to {target} \xB0C",cooling_to:"Cooling to {target} \xB0C",above_target:"Above the target",below_target:"Below the target"},sub:{unavailable:"The unit is not answering",last_target:"Last target {target} \xB0C",reached:"Target reached",above_by:"{diff} \xB0C above target",below_by:"{diff} \xB0C below target",compressor_idle:"Compressor idle",compressor_idle_power:"Compressor idle \xB7 {power} W"},group:{running:"{running} of {total} running",all_off:"All off",mixed:"Mixed",mixed_note:"These are averages \u2013 the units differ",in_step:"All units in step",units:"Units",unit_count:"{total} units",average:"avg",tap_hint:"tap for controls"},alert:{away:"Away mode \u2013 frost protection only",window_open:"{name} has been open for {duration} while the unit runs",window_tilted:"{name} has been on the latch for {duration} while the unit runs",window_open_unit:"{unit} \xB7 window open for {duration} while the unit runs",window_tilted_unit:"{unit} \xB7 window on the latch for {duration} while the unit runs"},ui:{inside:"Inside",outside:"Outside",humidity:"Humidity",power:"Power",energy:"Energy this month",device_reads:"unit",fan:"Fan",swing:"Swing",warmer:"Warmer",cooler:"Cooler",standby_short:"Off",window:"a window",window_open:"open",window_tilted:"on the latch",windows_open:"{count} open",minute_short:"min",hour_short:"h",no_entity:"No Daikin climate entity found. Set the `entity` option.",missing_entity:"That entity does not exist.",empty_group:"The group has no climate members."},editor:{device:"Device",device_auto:"Automatic",language:"Language",language_auto:"Automatic",show_art:"Unit drawing",show_readings:"Readings",show_modes:"Modes",show_fan:"Fan",show_presets:"Powerful / Econo / Away",show_all_swing:"All swing options",show_openings:"Opening sensors",compact:"Compact",animate:"Animations"}},i6={hu:Ge,en:je},s3=Object.keys(i6);function C5(t,C){return T(t,C,s3)}function e5(t){return $(i6,t)}function s1(t,C={}){return Object.entries(C).reduce((e,[H,V])=>e.replace(`{${H}}`,String(V)),t)}var T1=["window"],$1=30;function W(t,C){let e=t?.entities?.[C];return e?e.area_id?e.area_id:(e.device_id?t.devices?.[e.device_id]:null)?.area_id||null:null}function Ke(t){let C=t?.last_changed;if(!C)return null;let e=(Date.now()-new Date(C).getTime())/1e3;return Number.isFinite(e)?Math.max(0,e):null}function a6(t,C){let e=t?.states?.[C],H=t?.entities?.[C],V=e?.attributes?.device_class||H?.original_device_class||null,r=e?.attributes?.friendly_name||C;if(x(e))return{entityId:C,name:r,deviceClass:V,available:!1,open:!1,openFor:null};let L=e.state==="on";return{entityId:C,name:r,deviceClass:V,available:!0,open:L,openFor:L?Ke(e):null}}function j1(t,{areas:C=[],classes:e=T1,include:H=[],exclude:V=[]}={}){let r=new Set(C.filter(Boolean)),L=new Set(V),a=new Map;if(r.size)for(let o of Object.keys(t?.states||{})){if(!o.startsWith("binary_sensor.")||L.has(o))continue;let M=t.states[o],n=t.entities?.[o],l=M.attributes?.device_class||n?.original_device_class;if(!e.includes(l))continue;let d=W(t,o);!d||!r.has(d)||a.set(o,a6(t,o))}for(let o of H)L.has(o)||a.has(o)||t?.states?.[o]&&a.set(o,a6(t,o));return[...a.values()]}var Qe=[["top","bottom"],["felso","also"],["upper","lower"]],Ye=/_(contact|sensor|nyitas|allapot|state)$/;function qe(t){return t.includes(".")?t.slice(t.indexOf(".")+1):t}function Xe(t,C){let e=qe(t).replace(Ye,"");for(let[H,V]of C)for(let[r,L]of[[H,"top"],[V,"bottom"]]){let a=new RegExp(`_${r}(?=_|$)`,"g"),o=null;for(let n=a.exec(e);n;n=a.exec(e))o=n;if(!o)continue;let M=e.slice(0,o.index)+e.slice(o.index+o[0].length);if(M)return{base:M,role:L,word:r}}return null}function o6(t){return t.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase()}function Je(t){let C=t[0],e=C.position?.word;return e&&C.name.split(/([\s_-]+)/).filter((L,a)=>!(a%2===0&&o6(L)===o6(e))).join("").replace(/[\s_-]{2,}/g," ").trim().replace(/[\s_-]+$/,"")||C.name}function CH(t,{pairs:C=Qe,windows:e={}}={}){let H=new Map(t.map(a=>[a.entityId,a])),V=[],r=new Set;for(let[a,o]of Object.entries(e)){let M=(Array.isArray(o)?o:[o]).map((n,l)=>{let d=H.get(n);return d?{...d,position:{role:l===0?"top":"bottom"}}:null}).filter(Boolean);if(M.length){for(let n of M)r.add(n.entityId);V.push({key:a,name:a,parts:M})}}let L=new Map;for(let a of t){if(r.has(a.entityId))continue;let o=Xe(a.entityId,C);if(!o){V.push({key:a.entityId,name:a.name,parts:[{...a,position:null}]});continue}L.has(o.base)||L.set(o.base,[]),L.get(o.base).push({...a,position:o})}for(let[a,o]of L){let M=n=>n.position.role==="top"?0:1;o.sort((n,l)=>M(n)-M(l)),V.push({key:a,name:Je(o),parts:o})}return V.map(eH).sort((a,o)=>a.name.localeCompare(o.name))}function eH(t){let C=t.parts,e=C.filter(M=>M.available),H=C.find(M=>M.position?.role==="top"),V=C.find(M=>M.position?.role==="bottom"),r=!!(H&&V&&H.available&&V.available),L=e.filter(M=>M.open),a=L.reduce((M,n)=>(n.openFor??0)>M?n.openFor:M,0),o="closed";return e.length?r&&H.open&&!V.open?o="tilted":L.length&&(o="open"):o="unavailable",{...t,state:o,available:e.length>0,open:o==="tilted"||o==="open",tilted:o==="tilted",paired:r,openFor:L.length?a:null,entityId:(H||C[0]).entityId}}function l1(t,C=$1,e={}){let H=CH(t,e),V=H.filter(a=>a.open),r=V.filter(a=>(a.openFor??0)>=C),L=r.reduce((a,o)=>(o.openFor??0)>(a?.openFor??-1)?o:a,null);return{windows:H,total:H.length,none:H.length===0,unavailable:H.filter(a=>!a.available).length,open:V.length,tilted:V.filter(a=>a.tilted).length,warn:r.length>0,longest:L,openFor:L?.openFor??null}}function Q(t,C,e){if(t==null)return"";let H=Math.round(t/60);return H<60?`${Math.max(1,H)} ${C}`:`${Math.round(H/60)} ${e}`}var HH={inside:"inside_temperature",outside:"outside_temperature"};function H5(t){return Object.values(t?.entities||{})}function VH(t){return H5(t).filter(C=>C.platform===J2&&C.entity_id.startsWith("climate.")).map(C=>C.entity_id)}function V5(t){let C=new Map;for(let e of H5(t)){if(e.platform!==J2||!e.device_id||!e.entity_id.startsWith("climate."))continue;let H=t.devices?.[e.device_id];H&&C.set(e.device_id,H.name_by_user||H.name||e.device_id)}return[...C.entries()].map(([e,H])=>({id:e,name:H}))}function M6(t,C){let e=t?.states?.[C]?.attributes?.entity_id;return Array.isArray(e)?e.filter(H=>typeof H=="string"&&H.startsWith("climate.")):[]}function n6(t,C){if(C?.entity)return C.entity;if(C?.device){let H=H5(t).find(V=>V.device_id===C.device&&V.entity_id.startsWith("climate."));if(H)return H.entity_id}let e=VH(t);return e.length===1?e[0]:null}function tH(t,C){let H=t?.entities?.[C]?.device_id;if(!H)return{};let V={};for(let r of H5(t))if(!(r.device_id!==H||r.platform!==J2))for(let[L,a]of Object.entries(HH))r.translation_key===a&&(V[L]=r.entity_id);return V}function s6(t,C,e={}){let H=tH(t,C);return{climate:C,inside:H.inside,outside:e.outside||H.outside,room:e.temperature||null,humidity:e.humidity||null,power:e.power||null,energy:e.energy||null}}function l6(t,C,e={}){let H=e.openings||{},V=H.entities||[];if(H.auto===!1&&!V.length)return[];let r=H.area||W(t,C);return j1(t,{areas:H.auto===!1?[]:[r].filter(Boolean),classes:H.classes||T1,include:V,exclude:H.ignore||[]})}function K1(t,C){if(!C)return null;let e=t?.states?.[C];if(x(e))return null;let H=Number(e.state);return Number.isFinite(H)?H:null}function d6(t,C,e=""){return t?.states?.[C]?.attributes?.unit_of_measurement||e}function A6(t,C){return t?.states?.[C]?.attributes?.friendly_name||""}function rH(t){let C=e=>{let H=U1.indexOf(String(e).toLowerCase());return H===-1?U1.length:H};return[...t].sort((e,H)=>C(e)-C(H))}function m6(t,C,e={},H={}){let V=t?.states?.[C];if(!V)return null;let r=s6(t,C,e),L=V.attributes||{},a=V.state,o=a!=="off"&&!x(V),M=K1(t,r.inside)??L.current_temperature??null,n=K1(t,r.room),l=n??M,d=L.temperature??null,p=(L.swing_modes||[]).filter(A=>H.show_all_swing?!0:H6.includes(String(A).toLowerCase())),c=L.preset_modes||[],h=V6.filter(A=>c.includes(A.key)).map(A=>({...A,on:L.preset_mode===A.key})),m=K1(t,r.power),g=H.show_openings===!1?l1([]):l1(l6(t,C,{openings:{...H.openings||{},...e.openings||{}}}),H.open_delay??$1,{pairs:H.openings?.pairs??e.openings?.pairs,windows:H.openings?.windows??e.openings?.windows});return{entityId:C,entities:r,name:e.name||A6(t,C)||C,available:!x(V),on:o,mode:a,action:L.hvac_action||null,modes:(L.hvac_modes||[]).filter(A=>n3.includes(A)),target:d,targetStep:L.target_temp_step||1,minTemp:L.min_temp??16,maxTemp:L.max_temp??32,unit:t?.config?.unit_system?.temperature||"\xB0C",inside:M,room:n,measured:l,external:n!==null,outside:K1(t,r.outside),humidity:K1(t,r.humidity),power:m,powerUnit:d6(t,r.power,"W"),energy:K1(t,r.energy),energyUnit:d6(t,r.energy,"kWh"),fanModes:rH(L.fan_modes||[]),fanMode:L.fan_mode||null,swingModes:p,swingMode:L.swing_mode||null,swinging:!!L.swing_mode&&String(L.swing_mode).toLowerCase()!=="off",presets:h,presetMode:L.preset_mode||null,away:L.preset_mode==="away",idle:o&&m!==null?m<r6:o&&L.hvac_action==="idle",openings:g,draughty:o&&L6.includes(a)&&g.warn}}function c6(t){if(t.measured===null||t.target===null)return null;let C=t.measured-t.target;return Math.abs(C)<t6?"at":C>0?"above":"below"}function u6(t){if(!t.available)return{key:"state.unavailable"};if(!t.on)return{key:"state.standby"};if(t.mode==="dry")return{key:"state.drying"};if(t.mode==="fan_only")return{key:"state.fan_only"};let C=c6(t);return C==="at"||C===null?{key:"state.holding",target:t.target}:t.mode==="heat"?C==="below"?{key:"state.heating_to",target:t.target}:{key:"state.above_target"}:t.mode==="cool"?C==="above"?{key:"state.cooling_to",target:t.target}:{key:"state.below_target"}:{key:"state.holding",target:t.target}}function v6(t){if(!t.available)return{key:"sub.unavailable"};if(!t.on)return{key:"sub.last_target",target:t.target};if(t.idle&&t.power!==null)return{key:"sub.compressor_idle_power",power:t.power};if(t.idle)return{key:"sub.compressor_idle"};let C=c6(t);if(C===null)return{key:""};if(C==="at")return{key:"sub.reached"};let e=Math.round(Math.abs(t.measured-t.target)*10)/10;return{key:C==="above"?"sub.above_by":"sub.below_by",diff:e}}function p6(t){let C=t.filter(e=>e!==null&&Number.isFinite(e));return C.length?C.reduce((e,H)=>e+H,0)/C.length:null}function LH(t,C,e,H){let V=H?.units||{},r=e.map(d=>m6(t,d,V[d]||{},H)).filter(Boolean),L=t?.states?.[C],a=L?.attributes||{},o=r.filter(d=>d.on),M=o.map(d=>d.mode),n=M.length?[...new Set(M)].sort((d,p)=>M.filter(c=>c===p).length-M.filter(c=>c===d).length)[0]:"off",l=r.map(d=>d.power).filter(d=>d!==null);return{isGroup:!0,entityId:C,name:H?.name||A6(t,C)||C,available:!x(L),units:r,running:o.length,total:r.length,on:o.length>0,mode:a.hvac_mode||(L?.state!=="off"?L?.state:null)||n,mixed:new Set(r.map(d=>d.on?d.mode:"off")).size>1||new Set(r.map(d=>d.target)).size>1,modes:(a.hvac_modes||[]).filter(d=>n3.includes(d)),target:a.temperature??p6(r.map(d=>d.target)),targetStep:a.target_temp_step||1,minTemp:a.min_temp??16,maxTemp:a.max_temp??32,unit:t?.config?.unit_system?.temperature||"\xB0C",measured:p6(r.map(d=>d.measured)),draughty:r.filter(d=>d.draughty),outside:r.map(d=>d.outside).find(d=>d!==null)??null,power:l.length?l.reduce((d,p)=>d+p,0):null,powerUnit:"W"}}function x6(t,C){let e=n6(t,C);if(!e)return{ok:!1,reason:"no_entity"};if(!t?.states?.[e])return{ok:!1,reason:"missing_entity"};let H=M6(t,e);if(H.length){let r=LH(t,e,H,C);return r.units.length?{ok:!0,...r}:{ok:!1,reason:"empty_group"}}let V=m6(t,e,C?.sources||{},C);return V?{ok:!0,isGroup:!1,...V,name:C?.name||V.name}:{ok:!1,reason:"missing_entity"}}function iH(t){let C=U1.indexOf(String(t??"").toLowerCase()),e=U1.length-1;if(C<=0)return(G1.min+G1.max)/2;let H=(C-1)/Math.max(1,e-1);return G1.max-H*(G1.max-G1.min)}function h6(t){return`
  <svg class="defs" width="0" height="0" aria-hidden="true">
    <defs>
      <linearGradient id="${t}-case" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#ffffff"/>
        <stop offset=".5" stop-color="#f5f7f9"/>
        <stop offset="1" stop-color="#dde3e8"/>
      </linearGradient>
      <linearGradient id="${t}-flap" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#f3f5f7"/>
        <stop offset="1" stop-color="#c4ccd3"/>
      </linearGradient>
      <linearGradient id="${t}-cavity" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#1b2630"/>
        <stop offset="1" stop-color="#39474f"/>
      </linearGradient>
      <linearGradient id="${t}-wash" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="currentColor"/>
        <stop offset="1" stop-color="currentColor" stop-opacity="0"/>
      </linearGradient>
      <filter id="${t}-soft" x="-40%" y="-40%" width="180%" height="200%">
        <feGaussianBlur stdDeviation="5"/>
      </filter>
    </defs>
  </svg>`}function f6(t){return`
  <svg class="ac" viewBox="0 0 200 176" role="img" aria-hidden="true">
    <path class="wash" d="M26 92h148l26 84H0Z" fill="url(#${t}-wash)"/>
    <ellipse class="shadow" cx="100" cy="90" rx="84" ry="8" filter="url(#${t}-soft)"/>
    <g class="body">
      <rect x="10" y="22" width="180" height="62" rx="15" fill="url(#${t}-case)"/>
      <rect class="outline" x="10" y="22" width="180" height="62" rx="15"/>
      <g class="grille">
        <line x1="34" y1="33" x2="166" y2="33"/>
        <line x1="34" y1="38.5" x2="166" y2="38.5"/>
        <line x1="34" y1="44" x2="166" y2="44"/>
      </g>
      <path class="sheen" d="M18 54h164"/>
      <circle class="led" cx="170" cy="76" r="2.5"/>
      <rect x="22" y="68" width="140" height="18" rx="6" fill="url(#${t}-cavity)"/>
      <g class="louver">
        <rect x="22" y="68" width="140" height="18" rx="6" fill="url(#${t}-flap)"/>
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
  </svg>`}function g6(t){return`
  <svg class="mini" viewBox="0 0 60 58" role="img" aria-hidden="true">
    <rect class="mbody" x="4" y="10" width="52" height="22" rx="6"/>
    <g class="grille">
      <line x1="14" y1="16" x2="46" y2="16"/>
      <line x1="14" y1="19.5" x2="46" y2="19.5"/>
    </g>
    <rect class="mcavity" x="8" y="25" width="44" height="7" rx="2.5"/>
    <rect class="mflap" x="8" y="25" width="44" height="7" rx="2.5" fill="url(#${t}-flap)"/>
    <g class="stream">
      <path d="M20 36c-1 8 -2 12 -4 20"/>
      <path d="M40 36c1 8 2 12 4 20"/>
    </g>
  </svg>`}function l3(t,C){t&&(t.classList.toggle("on",!!C.on),t.classList.toggle("off",!C.on),t.classList.toggle("swing",!!(C.on&&C.swinging)),t.classList.toggle("fixed",!!(C.on&&!C.swinging)),t.style.setProperty("--flow-duration",`${iH(C.fanMode).toFixed(2)}s`))}var Z6=`
${R}

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
/* One row of equal buttons while they fit, and a second row when they do not.
   As a grid of columns this could never be narrower than all of them side by
   side - on a phone that pushed the whole card off the right of the screen. */
.btnrow { display: flex; flex-wrap: wrap; gap: 7px; }
.btnrow > * { flex: 1 1 92px; }
.ghost {
  display: inline-flex; align-items: center; justify-content: center; gap: 5px;
  padding: 7px 10px; border-radius: 10px; cursor: pointer;
  border: 1px solid var(--ap-line); background: transparent; color: var(--ap-text);
  font: inherit; font-size: .74rem; font-weight: 600; white-space: nowrap;
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
.rowbottom { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 10px; }
.rowbottom .big { font-size: 1.45rem; }
.rowbottom .big small { font-size: .72rem; }
/* only as wide as its buttons, so the setpoint keeps its place beside them
   on a wide card and drops below only when the line truly runs out */
.rowbottom .btnrow { flex: 0 1 auto; }
.rowbottom .btnrow > * { flex: 0 1 auto; }
/* the setpoint keeps its place beside the buttons, and drops under them
   rather than squeezing them when the row runs out of width */
.rowbottom .dial { flex: 0 0 auto; margin-left: auto; }
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
`;var p3={language:"auto",compact:!1,animate:!0,show_art:!0,show_readings:!0,show_modes:!0,show_fan:!0,show_presets:!0,show_all_swing:!1,show_openings:!0},S6=0,d3=class extends HTMLElement{static getConfigElement(){return document.createElement(m2)}static getStubConfig(C){let e=V5(C);return{type:`custom:${n1}`,device:e[0]?.id}}constructor(){super(),this.attachShadow({mode:"open"}),this._sections={},this._signatures={},this._rows=new Map,this._open=new Set,this._built=!1,S6+=1,this._uid=`daikin${S6}`}setConfig(C){this._config={...p3,...C||{}},this._signatures={},this._rows.clear(),this._hass&&this._render()}set hass(C){this._hass=C,this._render()}get hass(){return this._hass}getCardSize(){return this._model?.isGroup?4+(this._model.units?.length||0):this._config?.compact?4:6}getGridOptions(){return{columns:12,min_columns:6,rows:"auto"}}_build(){let C=document.createElement("style");C.textContent=Z6;let e=document.createElement("ha-card"),H=document.createElement("div");H.className="wrap",H.addEventListener("click",V=>this._onClick(V)),H.insertAdjacentHTML("beforeend",h6(this._uid));for(let V of["top","hero","alerts","modes","fan","buttons","units"]){let r=document.createElement("div");r.dataset.section=V,this._sections[V]=r,H.appendChild(r)}e.appendChild(H),this.shadowRoot.replaceChildren(C,e),this._wrap=H,this._built=!0}_render(){if(!this._hass||!this._config)return;this._built||this._build();let C=e5(C5(this._config,this._hass)),e=x6(this._hass,this._config);if(this._model=e,!e.ok){this._renderEmpty(e,C);return}this._emptyShown=!1,this._applyWrapClasses(e),e.isGroup?this._renderGroup(e,C):this._renderSingle(e,C)}_renderEmpty(C,e){if(this._emptyShown!==C.reason){this._emptyShown=C.reason,this._signatures={},this._rows.clear();for(let[H,V]of Object.entries(this._sections))V.innerHTML="",V.hidden=H!=="top";this._sections.top.innerHTML=`
      <div class="empty">
        ${s("ac")}
        <div>${i(e(`ui.${C.reason}`))}</div>
      </div>`}}_section(C,e){this._signatures[C]!==e&&(this._signatures[C]=e,this._sections[C].innerHTML=e,this._sections[C].hidden=!e)}_applyWrapClasses(C){let e=["wrap"];this._config.compact&&e.push("compact"),this._config.animate||e.push("no-animation"),this._hass.themes?.darkMode&&e.push("dark");let H=e.join(" ");this._wrap.className!==H&&(this._wrap.className=H);let V=this._accent(C.isGroup?C.running?C.mode:"off":C.on?C.mode:"off");this._wrap.style.getPropertyValue("--ap-accent")!==V&&this._wrap.style.setProperty("--ap-accent",V)}_accent(C){return(W1.find(e=>e.key===C)||W1[0]).colour}_renderSingle(C,e){this._section("top",this._topHtml(C,e)),this._heroSection(C,e),this._section("alerts",this._alertsHtml(C,e)),this._section("modes",this._config.show_modes?this._segHtml(C,e):""),this._section("fan",this._config.show_fan?this._fanHtml(C,e):""),this._section("buttons",this._buttonsHtml(C,e)),this._section("units","")}_topHtml(C,e){let H=C.isGroup?`${i(s1(e("group.unit_count"),C))} \xB7 ${i(C.entityId)}`:`Daikin${C.draughty?"":this._openBadge(C,e)}`;return`
      <div class="top">
        <div>
          <div class="name" data-action="more-info">${i(C.name)}</div>
          <div class="sub">${H}</div>
        </div>
        <div class="spacer"></div>
        <div class="ind">${this._readingsHtml(C,e)}</div>
      </div>`}_readingsHtml(C,e){if(!this._config.show_readings)return"";let H=[],V=(L,a,o,M,n,l="")=>{a!=null&&H.push(`
        <span data-action="more-info" data-entity="${i(n||"")}">
          ${s(L)}<b>${b(a,o)} ${i(M)}</b>${l}
        </span>`)};if(C.isGroup)return V("indoor",C.measured,1,C.unit,"",`<span class="raw">${i(e("group.average"))}</span>`),V("outdoor",C.outside,0,C.unit,""),V("energy",C.power,0,C.powerUnit,""),H.join("");let r=C.external&&C.inside!==null?`<span class="raw">${i(e("ui.device_reads"))} ${b(C.inside,0)}</span>`:"";return V("indoor",C.measured,1,C.unit,C.entities.room||C.entities.inside,r),V("water_percent",C.humidity,0,"%",C.entities.humidity),V("outdoor",C.outside,0,C.unit,C.entities.outside),V("energy",C.power,0,C.powerUnit,C.entities.power),V("counter",C.energy,1,C.energyUnit,C.entities.energy),H.join("")}_heroSection(C,e){let H=this._config.show_art;this._sections.hero.querySelector(".hero")||(this._sections.hero.innerHTML=`
        <div class="hero">
          <div class="art" data-action="more-info">${f6(this._uid)}</div>
          <div class="status"></div>
          <div class="dial"></div>
        </div>`,this._heroNode=this._sections.hero.querySelector(".hero"),this._statusNode=this._sections.hero.querySelector(".status"),this._dialNode=this._sections.hero.querySelector(".dial")),this._heroNode.classList.toggle("no-art",!H);let V=this._sections.hero.querySelector(".art");V.hidden=!H,H&&l3(V.querySelector(".ac"),C);let r=u6(C),L=v6(C),a=`
      <div class="mode-name">${i(e(`mode_long.${C.on?C.mode:"off"}`,C.mode))}</div>
      <div class="state">${i(s1(e(r.key),r))}</div>
      <div class="state-sub">${i(L.key?s1(e(L.key),L):"")}</div>`;this._signatures.status!==a&&(this._signatures.status=a,this._statusNode.innerHTML=a);let o=this._dialHtml(C);this._signatures.dial!==o&&(this._signatures.dial=o,this._dialNode.innerHTML=o)}_dialHtml(C,e=!1){let H=C.target,V=!C.on||H===null,r=`<button type="button" data-action="temp" data-dir="1" data-target="${i(C.entityId)}"
      ${V||H>=C.maxTemp?"disabled":""} aria-label="+">${s("chevron_up")}</button>`,L=`<button type="button" data-action="temp" data-dir="-1" data-target="${i(C.entityId)}"
      ${V||H<=C.minTemp?"disabled":""} aria-label="\u2212">${s("chevron")}</button>`,a=`<div class="big">${H===null?"\u2013\u2013":b(H,1)}<small> ${i(C.unit)}</small></div>`;return e?`<div class="updown">${L}${r}</div>${a}`:`${a}<div class="updown">${r}${L}</div>`}_alertsHtml(C,e){let H=[];if(!C.isGroup&&C.away&&H.push(["info","away",e("alert.away")]),this._config.show_openings){let r=C.isGroup?C.draughty:C.draughty?[C]:[];for(let L of r){let a=this._ago(L.openings.openFor,e),o=L.openings.longest?.tilted;H.push(["","window_open",C.isGroup?s1(e(o?"alert.window_tilted_unit":"alert.window_open_unit"),{unit:L.name,duration:a}):s1(e(o?"alert.window_tilted":"alert.window_open"),{name:L.openings.longest?.name||e("ui.window"),duration:a})])}}return H.length?`<div class="alerts">${H.map(([r,L,a])=>`<div class="alert${r?` ${r}`:""}">${s(L)}<span>${i(a)}</span></div>`).join("")}</div>`:""}_ago(C,e){return Q(C,e("ui.minute_short"),e("ui.hour_short"))}_openBadge(C,e){if(!this._config.show_openings)return"";let H=C.openings;if(H.none||!H.open)return"";let V=H.open>1?s1(e("ui.windows_open"),{count:H.open}):e(H.tilted?"ui.window_tilted":"ui.window_open");return`<span class="open-badge${C.draughty?"":" calm"}">${s("window_open")}${i(V)}</span>`}_segHtml(C,e){let H=C.modes?.length?C.modes:W1.map(a=>a.key),V=C.isGroup?C.mixed||!C.running?null:C.mode:C.on?C.mode:"off",r=C.isGroup?C.running===0:!C.on;return`<div class="seg">${W1.filter(a=>a.key==="off"||H.includes(a.key)).map(a=>{let o=a.key==="off"?r:V===a.key;return`
        <button type="button" class="${a.key==="off"?"power":""}"
          data-action="mode" data-value="${a.key}" data-target="${i(C.entityId)}"
          aria-pressed="${o}">
          ${s(a.icon)}<span>${i(e(`mode.${a.key}`))}</span>
        </button>`}).join("")}</div>`}_fanHtml(C,e){if(!C.fanModes.length)return"";let H=C.fanModes.filter(r=>String(r).toLowerCase()!=="auto"),V=C.fanModes.map((r,L)=>{let a=String(r).toLowerCase(),o=C.fanMode===r;if(a==="auto")return`<button type="button" class="auto ${o?"on":""}" data-action="fan"
            data-value="${i(r)}" data-target="${i(C.entityId)}"
            ${C.on?"":"disabled"} aria-label="Auto">A</button>`;let M=H.indexOf(r),n=8+M*1.8;return`<button type="button" class="${C.fanMode!==null&&String(C.fanMode).toLowerCase()!=="auto"&&M<=H.indexOf(C.fanMode)?"on":""}" style="height:${n.toFixed(1)}px"
          data-action="fan" data-value="${i(r)}" data-target="${i(C.entityId)}"
          ${C.on?"":"disabled"} aria-label="${i(this._fanLabel(r,e))}"></button>`}).join("");return`
      <div class="fan">
        <span class="cap">${i(e("ui.fan"))}</span>
        <div class="ticks">${V}</div>
        <span class="val">${i(C.fanMode?this._fanLabel(C.fanMode,e):"\u2013")}</span>
      </div>`}_fanLabel(C,e){return e(`fan.${String(C).toLowerCase()}`,String(C))}_swingLabel(C,e){return e(`swing.${String(C).toLowerCase()}`,String(C))}_buttonsHtml(C,e){let H=[];if(C.swingModes.length>1)if(this._config.show_all_swing)for(let V of C.swingModes)H.push(`
            <button type="button" class="ghost" data-action="swing" data-value="${i(V)}"
              data-target="${i(C.entityId)}" aria-pressed="${C.swingMode===V}"
              ${C.on?"":"disabled"}>${s("swing")}${i(this._swingLabel(V,e))}</button>`);else{let V=C.swingModes.find(L=>String(L).toLowerCase()!=="off"),r=C.swingModes.find(L=>String(L).toLowerCase()==="off");H.push(`
          <button type="button" class="ghost" data-action="swing"
            data-value="${i(C.swinging?r??"off":V??"vertical")}"
            data-target="${i(C.entityId)}" aria-pressed="${C.swinging}"
            ${C.on?"":"disabled"}>${s("swing")}${i(e("ui.swing"))}</button>`)}if(this._config.show_presets)for(let V of C.presets)H.push(`
          <button type="button" class="ghost" data-action="preset" data-value="${V.key}"
            data-target="${i(C.entityId)}" aria-pressed="${V.on}"
            ${C.on?"":"disabled"}>${s(V.icon)}${i(e(`preset.${V.key}`))}</button>`);return H.length?`<div class="btnrow">${H.join("")}</div>`:""}_renderGroup(C,e){this._section("top",this._topHtml(C,e)),this._groupHero(C,e),this._section("alerts",this._alertsHtml(C,e)),this._section("modes",this._config.show_modes?this._segHtml(C,e):""),this._section("fan",""),this._section("buttons",""),this._unitsSection(C,e)}_groupHero(C,e){this._sections.hero.querySelector(".hero")||(this._sections.hero.innerHTML=`
        <div class="hero no-art">
          <div class="status"></div>
          <div class="dial"></div>
        </div>`,this._heroNode=this._sections.hero.querySelector(".hero"),this._statusNode=this._sections.hero.querySelector(".status"),this._dialNode=this._sections.hero.querySelector(".dial")),this._heroNode.classList.add("no-art");let H=this._sections.hero.querySelector(".art");H&&(H.hidden=!0);let V=C.running===0?e("group.all_off"):C.mixed?e("group.mixed"):e(`mode_long.${C.mode}`,C.mode),r=`
      <div class="mode-name">${i(V)}</div>
      <div class="state">${i(s1(e("group.running"),C))}</div>
      <div class="state-sub">${i(C.mixed&&C.running?e("group.mixed_note"):e("group.in_step"))}</div>`;this._signatures.status!==r&&(this._signatures.status=r,this._statusNode.innerHTML=r);let L=this._dialHtml({...C,on:!0});this._signatures.dial!==L&&(this._signatures.dial=L,this._dialNode.innerHTML=L)}_unitsSection(C,e){let H=this._sections.units;H.querySelector(".rows")||(H.innerHTML=`
        <div class="divider"></div>
        <div class="sec-cap">${i(e("group.units"))}
          <span style="float:right;font-weight:500;letter-spacing:0;text-transform:none">
            ${i(e("group.tap_hint"))}</span></div>
        <div class="rows"></div>`,this._rowsNode=H.querySelector(".rows"),this._rows.clear()),H.hidden=!1;let V=new Set;for(let r of C.units){V.add(r.entityId);let L=this._rows.get(r.entityId);if(!L){let p=document.createElement("div");p.className="row",p.innerHTML=`
          <button class="row-head" type="button" data-action="toggle-row" data-target="${i(r.entityId)}">
            ${g6(this._uid)}
            <span><span class="rname"></span><span class="rstate"></span></span>
            <span class="rtemp"></span>
            ${s("chevron","icon caret")}
          </button>
          <div class="row-body"></div>`,this._rowsNode.appendChild(p),L={el:p,mini:p.querySelector(".mini"),name:p.querySelector(".rname"),state:p.querySelector(".rstate"),temp:p.querySelector(".rtemp"),body:p.querySelector(".row-body"),sig:{}},this._rows.set(r.entityId,L)}let a=this._open.has(r.entityId);L.el.classList.toggle("open",a),L.el.style.setProperty("--row-accent",this._accent(r.on?r.mode:"off")),l3(L.mini,r);let o=r.name;L.sig.name!==o&&(L.sig.name=o,L.name.textContent=o);let M=`${i(e(`mode_long.${r.on?r.mode:"off"}`,r.mode))}${r.on&&r.fanMode?` \xB7 ${i(this._fanLabel(r.fanMode,e))}`:""}${r.power!==null?`<em> \xB7 ${b(r.power,0)} ${i(r.powerUnit)}</em>`:""}${this._openBadge(r,e)}`;L.sig.state!==M&&(L.sig.state=M,L.state.innerHTML=M);let n=r.measured===null?"\u2013\u2013":b(r.measured,1),l=r.on?`${n} ${i(r.unit)} \u2192 <b>${b(r.target,1)} ${i(r.unit)}</b>`:`${n} ${i(r.unit)} \xB7 <b>${i(e("ui.standby_short"))}</b>`;L.sig.temp!==l&&(L.sig.temp=l,L.temp.innerHTML=l);let d=a?`${this._segHtml(r,e)}
           ${this._config.show_fan?this._fanHtml(r,e):""}
           <div class="rowbottom">
             <div>${this._buttonsHtml(r,e)}</div>
             <div class="dial">${this._dialHtml(r,!0)}</div>
           </div>`:"";L.sig.body!==d&&(L.sig.body=d,L.body.innerHTML=d)}for(let[r,L]of this._rows)V.has(r)||(L.el.remove(),this._rows.delete(r))}_onClick(C){let e=C.target.closest("[data-action]");if(!e||e.hasAttribute("disabled"))return;let{action:H,entity:V,value:r,dir:L,target:a}=e.dataset,o=this._model;if(!(!o?.ok&&H!=="more-info"))switch(H){case"more-info":this._moreInfo(V||o?.entityId);break;case"toggle-row":this._haptic("selection"),this._open.has(a)?this._open.delete(a):this._open.add(a),this._render();break;case"mode":this._haptic(r==="off"?"medium":"light"),this._call("set_hvac_mode",{entity_id:a,hvac_mode:r});break;case"fan":this._haptic("light"),this._call("set_fan_mode",{entity_id:a,fan_mode:r});break;case"swing":this._haptic("light"),this._call("set_swing_mode",{entity_id:a,swing_mode:r});break;case"preset":this._haptic("light"),this._call("set_preset_mode",{entity_id:a,preset_mode:e.getAttribute("aria-pressed")==="true"?"none":r});break;case"temp":this._stepTemperature(a,Number(L));break;default:break}}_stepTemperature(C,e){let H=this._model,V=H.isGroup&&C===H.entityId?H:H.isGroup?H.units.find(a=>a.entityId===C):H;if(!V||V.target===null)return;let r=V.targetStep||1,L=Math.min(V.maxTemp,Math.max(V.minTemp,Math.round((V.target+e*r)*10)/10));L!==V.target&&(this._haptic("light"),this._call("set_temperature",{entity_id:C,temperature:L}))}_call(C,e){return e.entity_id?this._hass.callService("climate",C,e):Promise.resolve()}_moreInfo(C){C&&this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:C},bubbles:!0,composed:!0}))}_haptic(C){this.dispatchEvent(new CustomEvent("haptic",{detail:C,bubbles:!0,composed:!0}))}};function _6(){customElements.get(n1)||(customElements.define(n1,d3),window.customCards=window.customCards||[],window.customCards.push({type:n1,name:"Daikin AC Card",description:"Card for Daikin air conditioners: modes, target temperature, fan and louver, with room sensors and a plug meter. Drives a climate group too.",preview:!0,documentationURL:"https://github.com/gabor-io/ha-appliance-custom-card"}),console.info(`%c ${n1} %c ${e6} `,"color:#fff;background:#0288d1;font-weight:700;border-radius:3px 0 0 3px","color:#0288d1;background:#e1f5fe;font-weight:700;border-radius:0 3px 3px 0"))}var aH=N({cardName:n1,toggles:["show_art","show_readings","show_modes","show_fan","show_presets","show_all_swing","show_openings","compact","animate"],defaults:p3,listDevices:V5,getLanguage:C5,translator:e5,languages:s3});function y6(){customElements.get(m2)||customElements.define(m2,aH)}y6();_6();var d1="netatmo-heating-card",c2="netatmo-heating-card-editor",b6="1.24.1",Q1="netatmo",R1=[{key:"schedule",icon:"calendar",colour:"var(--nh-heat)"},{key:"away",icon:"away",colour:"var(--nh-away)"},{key:"frost_guard",icon:"frost_guard",colour:"var(--nh-frost)"}],w6=R1.map(t=>t.key);var t5=30,r5=15;var oH={card_name:"F\u0171t\xE9s",mode:{schedule:"\xDCtemterv",away:"T\xE1voll\xE9t",frost_guard:"Fagyv\xE9delem"},state:{heating_rooms:"{count} szob\xE1ban megy a f\u0171t\xE9s",nothing:"Egyik szoba sem k\xE9r h\u0151t",all_off:"A f\u0171t\xE9s \xE1ll",unavailable:"A f\u0171t\xE9s nem el\xE9rhet\u0151",room_heating:"F\u0171t {temp} \xB0C-ra",room_reached:"{temp} \xB0C-ot tart",room_dead:"A szelep nem v\xE1laszol"},sub:{schedule:"\xDCtemterv: {name}",away:"T\xE1voll\xE9ti h\u0151fok: {temp} \xB0C",frost_guard:"Fagyv\xE9delmi h\u0151fok: {temp} \xB0C"},head:{thermostat:"termoszt\xE1t",valve:"szelep"},room:{heating:"F\u0171t",reached:"El\xE9rte a h\u0151fokot",boost:"R\xE1seg\xEDt\xE9s",away:"T\xE1voll\xE9t",frost_guard:"Fagyv\xE9delem",unavailable:"Nem v\xE1laszol"},alert:{frost_guard:"Fagyv\xE9delem \u2013 a f\u0171t\xE9s ki van kapcsolva, csak {temp} \xB0C al\xE1 nem engedi a h\xE1zat",room_dead:"{room} \xB7 a szelep nem v\xE1laszol",battery_low:"{room} ({head}) \xB7 fogy az elem ({value} %)",battery_critical:"{room} ({head}) \xB7 az elem kritikus ({value} %) \u2013 cser\xE9ld ki",battery_silent:"{count} fej nem jelent elemszintet \u2013 n\xE9zd meg \u0151ket",window_open:"{room} \xB7 nyitva az ablak, mik\xF6zben f\u0171t ({duration})",window_tilted:"{room} \xB7 buk\xF3ra van az ablak, mik\xF6zben f\u0171t ({duration})",window_open_here:"Nyitva az ablak, mik\xF6zben f\u0171t ({duration})",window_tilted_here:"Buk\xF3ra van az ablak, mik\xF6zben f\u0171t ({duration})"},ui:{rooms:"Szob\xE1k",rooms_count:"{count} szoba",schedule:"\xDCtemterv",tap_hint:"koppints a vez\xE9rl\u0151k\xE9rt",outside:"Kint",boost:"R\xE1seg\xEDt\xE9s",turn_off:"Kikapcsol\xE1s",heads:"Fejek",heads_count:"{count} fej",no_sensor:"nincs \xE9rz\xE9kel\u0151",window_open:"nyitva",window_tilted:"buk\xF3ra",windows_open:"{count} nyitva",silent:"nem jelent",dead_hint:"A szelep nem jelentkezik be \u2013 val\xF3sz\xEDn\u0171leg lemer\xFClt az eleme.",stale:"nem friss\xFCl",current:"Most",no_entity:"Nem tal\xE1ltam Netatmo f\u0171t\xE9st ebben a Home Assistantban.",minute_short:"perce",hour_short:"\xF3r\xE1ja"},editor:{device:"K\xE9sz\xFCl\xE9k",device_auto:"Automatikus",language:"Nyelv",language_auto:"Automatikus",show_art:"K\xE9sz\xFCl\xE9krajz",show_schedule:"\xDCtemtervek",show_openings:"Nyit\xE1s\xE9rz\xE9kel\u0151k",show_batteries:"Elemszintek",compact:"Kompakt",animate:"Anim\xE1ci\xF3k"}},MH={card_name:"Heating",mode:{schedule:"Schedule",away:"Away",frost_guard:"Frost guard"},state:{heating_rooms:"Heating in {count} rooms",nothing:"No room is calling for heat",all_off:"Heating is off",unavailable:"Heating is unavailable",room_heating:"Heating to {temp} \xB0C",room_reached:"Holding {temp} \xB0C",room_dead:"The valve is not responding"},sub:{schedule:"Schedule: {name}",away:"Away temperature: {temp} \xB0C",frost_guard:"Frost guard: {temp} \xB0C"},head:{thermostat:"thermostat",valve:"valve"},room:{heating:"Heating",reached:"At temperature",boost:"Boost",away:"Away",frost_guard:"Frost guard",unavailable:"Not responding"},alert:{frost_guard:"Frost guard \u2013 heating is off, the house is only kept above {temp} \xB0C",room_dead:"{room} \xB7 the valve is not responding",battery_low:"{room} ({head}) \xB7 battery getting low ({value} %)",battery_critical:"{room} ({head}) \xB7 battery critical ({value} %) \u2013 replace it",battery_silent:"{count} heads report no battery level \u2013 check them",window_open:"{room} \xB7 window open while heating ({duration})",window_tilted:"{room} \xB7 window on the latch while heating ({duration})",window_open_here:"Window open while heating ({duration})",window_tilted_here:"Window on the latch while heating ({duration})"},ui:{rooms:"Rooms",rooms_count:"{count} rooms",schedule:"Schedule",tap_hint:"tap for controls",outside:"Outside",boost:"Boost",turn_off:"Turn off",heads:"Heads",heads_count:"{count} heads",no_sensor:"no sensor",window_open:"open",window_tilted:"on the latch",windows_open:"{count} open",silent:"silent",dead_hint:"The valve is not checking in \u2013 most likely a flat battery.",stale:"stale",current:"Now",no_entity:"No Netatmo heating found in this Home Assistant.",minute_short:"min",hour_short:"h"},editor:{device:"Device",device_auto:"Automatic",language:"Language",language_auto:"Automatic",show_art:"Device drawing",show_schedule:"Schedules",show_openings:"Opening sensors",show_batteries:"Battery levels",compact:"Compact",animate:"Animations"}},k6={hu:oH,en:MH},A3=Object.keys(k6);function L5(t,C){return T(t,C,A3)}function i5(t){return $(k6,t)}function I(t,C={}){return Object.entries(C).reduce((e,[H,V])=>e.replace(`{${H}}`,String(V)),t)}function u2(t){return Object.values(t?.entities||{})}function O6(t){return u2(t).filter(C=>C.platform===Q1&&C.entity_id.startsWith("climate.")).map(C=>C.entity_id).sort()}function E6(t){return u2(t).find(e=>e.platform===Q1&&e.entity_id.startsWith("select."))?.entity_id||null}function T6(t,C){return C?u2(t).filter(e=>e.device_id===C&&e.platform===Q1&&e.entity_id.startsWith("climate.")).map(e=>e.entity_id):[]}function $6(t){let C=new Map;for(let e of u2(t)){if(e.platform!==Q1||!e.device_id||!e.entity_id.startsWith("climate."))continue;let H=t.devices?.[e.device_id];H&&C.set(e.device_id,H.name_by_user||H.name||e.device_id)}return[...C.entries()].map(([e,H])=>({id:e,name:H}))}function R6(t,C,e){let H=e?t?.areas?.[e]:null;if(H?.name)return H.name;let V=t?.states?.[C]?.attributes?.friendly_name;return V?V.replace(/\s+Netatmo\s+(Valve|Thermostat)$/i,"").trim()||V:C}function nH(t,C){let e=t.replace(/^sensor\./,"").replace(/_battery(_percent)?$/,"");C&&e.startsWith(`${C}_`)&&(e=e.slice(C.length+1)),e=e.replace(/^netatmo_/,"");let H=/^(valve|thermostat)_(.+)$/.exec(e);return H&&(e=H[2]),e.replace(/_/g," ").trim()||t}function B6(t,C){if(!C)return[];let e=[];for(let H of u2(t)){if(H.platform!==Q1||!H.entity_id.startsWith("sensor.")||W(t,H.entity_id)!==C)continue;let V=t.states?.[H.entity_id];if((V?.attributes?.device_class||H.original_device_class)!=="battery")continue;let L=x(V)?null:Number(V.state);e.push({entityId:H.entity_id,label:nH(H.entity_id,C),battery:Number.isFinite(L)?L:null})}return e.sort((H,V)=>H.entityId.localeCompare(V.entityId))}function P6(t,C,e,H){let V=e?.openings||{};return V.auto===!1&&!V.rooms?.[H]?[]:j1(t,{areas:C?[C]:[],classes:V.classes||T1,include:V.rooms?.[H]||[],exclude:V.ignore||[]})}function sH(t,C){if(!C)return null;let e=t?.states?.[C];if(x(e))return null;let H=Number(e.state);return Number.isFinite(H)?H:null}function lH(t,C,e){let H=t?.states?.[C];if(!H)return null;let V=H.attributes||{},r=W(t,C),L=!x(H),a=Object.prototype.hasOwnProperty.call(V,"heating_power_request"),o=a?Number(V.heating_power_request):null,M=L?a?o>0:V.hvac_action==="heating":!1,n=e?.show_batteries===!1?[]:B6(t,r),l=e?.show_openings===!1?[]:P6(t,r,e,C);return{entityId:C,area:r,name:e?.rooms?.[C]?.name||R6(t,C,r),available:L,mode:H.state,action:V.hvac_action||null,preset:V.preset_mode||null,boost:V.preset_mode==="boost",current:V.current_temperature??null,target:V.temperature??null,minTemp:V.min_temp??7,maxTemp:V.max_temp??30,step:V.target_temp_step??.5,schedule:V.selected_schedule||null,request:a?o:null,heating:M,canTurnOff:(V.hvac_modes||[]).includes("off"),heads:n,openings:l1(l,e?.open_delay??$1,{pairs:e?.openings?.pairs,windows:e?.openings?.windows})}}function dH(t){let C=t.filter(e=>e.available&&e.preset&&w6.includes(e.preset)).map(e=>e.preset);return C.length?[...new Set(C)].sort((e,H)=>C.filter(V=>V===H).length-C.filter(V=>V===e).length)[0]:"schedule"}function pH(t,C){if(C?.entity)return{ids:[C.entity],picked:!0};if(C?.device){let e=T6(t,C.device);if(e.length)return{ids:e,picked:!0}}return C?.entities?.length?{ids:C.entities,picked:!0}:{ids:O6(t),picked:!1}}function N6(t,C){let{ids:e,picked:H}=pH(t,C);if(!e.length)return{ok:!1,reason:"no_entity"};let V=e.map(d=>lH(t,d,C)).filter(Boolean);if(!V.length)return{ok:!1,reason:"no_entity"};let r=C?.schedule_entity||E6(t),L=r?t?.states?.[r]:null,a=V.filter(d=>d.available),o=V.filter(d=>d.heating),M=a[0]||V[0],n=V.flatMap(d=>d.heads.map(p=>({...p,room:d.name})));return{ok:!0,single:C?.view==="room"||C?.view!=="house"&&H&&V.length===1,room:V[0],rooms:V,heating:o.length,mode:dH(V),schedule:{entityId:r,current:L&&!x(L)?L.state:null,options:L?.attributes?.options||[]},setpoint:M?.target??null,outside:sH(t,C?.sources?.outside),outsideStale:AH(t,C?.sources?.outside_connectivity),heads:n,batteryLow:n.filter(d=>d.battery!==null&&d.battery<=t5),batteryCritical:n.filter(d=>d.battery!==null&&d.battery<=r5),batterySilent:n.filter(d=>d.battery===null).length,dead:V.filter(d=>!d.available),draughty:V.filter(d=>d.heating&&d.openings.warn)}}function AH(t,C){if(!C)return!1;let e=t?.states?.[C];return e?e.state==="off":!1}function F6(t){return`
  <svg class="defs" width="0" height="0" aria-hidden="true"><defs>
    <linearGradient id="${t}-knurl" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#b9bec2"/><stop offset=".3" stop-color="#eceef0"/>
      <stop offset=".6" stop-color="#c3c8cc"/><stop offset="1" stop-color="#9aa0a5"/>
    </linearGradient>
    <linearGradient id="${t}-body" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#ffffff"/><stop offset=".55" stop-color="#f7f9fa"/>
      <stop offset="1" stop-color="#e2e6e9"/>
    </linearGradient>
    <filter id="${t}-warm" x="-60%" y="-60%" width="220%" height="220%">
      <feGaussianBlur stdDeviation="4"/>
    </filter>
    <filter id="${t}-soft" x="-50%" y="-40%" width="200%" height="190%">
      <feGaussianBlur stdDeviation="3"/>
    </filter>
  </defs></svg>`}function m3(t){return`
  <svg class="dev thermostat" viewBox="0 0 120 120" role="img" aria-hidden="true">
    <ellipse class="shadow" cx="62" cy="106" rx="40" ry="5" filter="url(#${t}-soft)"/>
    <rect class="glow soft" x="12" y="10" width="84" height="84" rx="9" filter="url(#${t}-warm)"/>
    <rect class="shade" x="14" y="12" width="80" height="80" rx="8"/>
    <rect class="edge" x="14" y="12" width="80" height="80" rx="8"/>
    <rect class="glow soft" x="24" y="20" width="86" height="86" rx="10" filter="url(#${t}-warm)"/>
    <rect x="26" y="22" width="82" height="82" rx="9" fill="url(#${t}-body)"/>
    <rect class="edge" x="26" y="22" width="82" height="82" rx="9"/>
    <rect class="glow" x="26" y="98" width="82" height="6" rx="3"/>
    <rect class="glow" x="104" y="22" width="4" height="82" rx="2"/>
    <rect class="screen" x="46" y="42" width="42" height="42" rx="3"/>
    <text class="digit current" x="52" y="66" font-size="22">--</text>
    <text class="digit frac" x="78" y="55" font-size="10"></text>
    <text class="digit ghost target" x="52" y="80" font-size="13">--</text>
  </svg>`}function c3(t){return`
  <svg class="dev valve" viewBox="0 0 120 70" role="img" aria-hidden="true">
    <ellipse class="shadow" cx="62" cy="60" rx="38" ry="4" filter="url(#${t}-soft)"/>
    <rect x="8" y="20" width="16" height="26" rx="3" fill="url(#${t}-knurl)"/>
    <rect class="glow soft" x="20" y="10" width="86" height="46" rx="12" filter="url(#${t}-warm)"/>
    <rect x="22" y="12" width="82" height="42" rx="11" fill="url(#${t}-body)"/>
    <rect class="edge" x="22" y="12" width="82" height="42" rx="11"/>
    <rect class="glow" x="88" y="12" width="7" height="42" rx="3.5"/>
    <ellipse class="shade" cx="99" cy="33" rx="9" ry="21"/>
    <ellipse cx="99" cy="33" rx="7" ry="18" fill="#fcfdfd"/>
    <ellipse class="edge" cx="99" cy="33" rx="9" ry="21"/>
    <rect class="screen" x="40" y="20" width="26" height="17" rx="2"/>
    <text class="digit target" x="44" y="34" font-size="13">--</text>
  </svg>`}function u3(t,C){if(!t)return;t.classList.toggle("lit",!!C.heating),t.classList.toggle("dead",!C.available);let e=C.request===null?.85:.4+Math.min(100,C.request)/200;t.style.setProperty("--lit",e.toFixed(2));let H=(V,r)=>{let L=t.querySelector(V);L&&L.textContent!==r&&(L.textContent=r)};if(!C.available){H(".current","--"),H(".frac",""),H(".target","--");return}C.current!==null&&(H(".current",String(Math.floor(C.current))),H(".frac",String(Math.round(C.current%1*10)))),C.target!==null&&H(".target",String(C.target).replace(".5","\u2075"))}var D6=`
${R}

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
`;var x3={language:"auto",compact:!1,animate:!0,show_art:!0,show_schedule:!0,show_openings:!0,show_batteries:!0,show_modes:null},z6=0,v3=class extends HTMLElement{static getConfigElement(){return document.createElement(c2)}static getStubConfig(){return{type:`custom:${d1}`}}constructor(){super(),this.attachShadow({mode:"open"}),this._sections={},this._signatures={},this._rows=new Map,this._open=new Set,this._built=!1,z6+=1,this._uid=`nheat${z6}`}setConfig(C){this._config={...x3,...C||{}},this._signatures={},this._rows.clear(),this._hass&&this._render()}set hass(C){this._hass=C,this._render()}get hass(){return this._hass}connectedCallback(){this._timer=window.setInterval(()=>this._render(),6e4)}disconnectedCallback(){this._timer&&window.clearInterval(this._timer),this._timer=void 0}getCardSize(){return 5+(this._model?.rooms?.length||0)}getGridOptions(){return{columns:12,min_columns:6,rows:"auto"}}_build(){let C=document.createElement("style");C.textContent=D6;let e=document.createElement("ha-card"),H=document.createElement("div");H.className="wrap",H.addEventListener("click",V=>this._onClick(V)),H.insertAdjacentHTML("beforeend",F6(this._uid));for(let V of["top","hero","alerts","modes","schedule","rooms"]){let r=document.createElement("div");r.dataset.section=V,this._sections[V]=r,H.appendChild(r)}e.appendChild(H),this.shadowRoot.replaceChildren(C,e),this._wrap=H,this._built=!0}_render(){if(!this._hass||!this._config)return;this._built||this._build();let C=i5(L5(this._config,this._hass)),e=N6(this._hass,this._config);if(this._model=e,!e.ok){this._renderEmpty(e,C);return}this._emptyShown=!1,this._applyWrapClasses(e),this._section("top",this._topHtml(e,C)),this._heroSection(e,C),this._section("alerts",this._alertsHtml(e,C));let H=this._config.show_modes??!e.single;this._section("modes",H?this._segHtml(e,C):""),this._section("schedule",H?this._scheduleHtml(e,C):""),e.single?this._singleRoomSection(e,C):this._roomsSection(e,C)}_singleRoomSection(C,e){this._rows.clear();let H=this._sections.rooms,V=`<div class="divider"></div>
      <div class="rbody single">${this._roomBodyHtml(C.room,e)}</div>`;this._signatures.single!==V&&(this._signatures.single=V,H.innerHTML=V),H.hidden=!1}_renderEmpty(C,e){if(this._emptyShown!==C.reason){this._emptyShown=C.reason,this._signatures={},this._rows.clear();for(let[H,V]of Object.entries(this._sections))V.innerHTML="",V.hidden=H!=="top";this._sections.top.innerHTML=`
      <div class="empty">${s("radiator")}
        <div>${i(e(`ui.${C.reason}`))}</div>
      </div>`}}_section(C,e){this._signatures[C]!==e&&(this._signatures[C]=e,this._sections[C].innerHTML=e,this._sections[C].hidden=!e)}_applyWrapClasses(C){let e=["wrap"];this._config.compact&&e.push("compact"),this._config.animate||e.push("no-animation"),this._hass.themes?.darkMode&&e.push("dark");let H=e.join(" ");this._wrap.className!==H&&(this._wrap.className=H);let V=(R1.find(r=>r.key===C.mode)||R1[0]).colour;this._wrap.style.getPropertyValue("--ap-accent")!==V&&this._wrap.style.setProperty("--ap-accent",V)}_topHtml(C,e){let H=R1.find(L=>L.key===C.mode)||R1[0],V=this._config.name||(C.single?C.room.name:e("card_name")),r=C.single?`Netatmo \xB7 ${i(I(e("ui.heads_count"),{count:C.room.heads.length}))}`:`Netatmo \xB7 ${i(I(e("ui.rooms_count"),{count:C.rooms.length}))}${C.heads.length?`, ${i(I(e("ui.heads_count"),{count:C.heads.length}))}`:""}`;return`
      <div class="top">
        <div>
          <div class="name">${i(V)}</div>
          <div class="sub">${r}</div>
        </div>
        <div class="spacer"></div>
        <span class="pill">${s(H.icon)}${i(e(`mode.${H.key}`))}</span>
      </div>`}_hasThermostat(C){return!!C?.heads.some(e=>/thermostat/i.test(e.label))}_heroSection(C,e){let H=C.single&&!this._hasThermostat(C.room);this._heroShape!==(H?"valve":"thermostat")&&(this._heroShape=H?"valve":"thermostat",this._sections.hero.innerHTML=`
        <div class="hero">
          <div class="art">${H?c3(this._uid):m3(this._uid)}</div>
          <div class="status"></div>
          <div class="outside"></div>
        </div>`,this._statusNode=this._sections.hero.querySelector(".status"),this._outsideNode=this._sections.hero.querySelector(".outside"),this._signatures.status=null,this._signatures.outside=null);let V=this._sections.hero.querySelector(".art");if(V.hidden=!this._config.show_art,this._config.show_art){let d=C.single?C.room:C.rooms.find(p=>this._hasThermostat(p))||C.rooms.find(p=>p.heating)||C.rooms[0];u3(V.querySelector(".dev"),{...d,heating:C.single?d.heating:C.heating>0,request:C.single?d.request:null})}let r=C.single?this._roomHeadline(C.room,C.mode,e):C.heating?I(e("state.heating_rooms"),{count:C.heating}):C.mode==="frost_guard"?e("state.all_off"):e("state.nothing"),L=C.mode==="schedule"?I(e("sub.schedule"),{name:C.schedule.current||"\u2013"}):I(e(`sub.${C.mode}`),{temp:Z(C.setpoint,this._hass,1)}),a=C.single?C.room:null,M=!!(a?.heating&&a.request!==null)?`<div class="req single"><div class="track"><i style="width:${Math.min(100,a.request)}%"></i></div>
           <span class="req-val">${a.request} %</span></div>`:"",n=`
      <div class="mode-name">${i(e(`mode.${C.mode}`))}</div>
      <div class="state">${i(r)}</div>
      <div class="state-sub">${i(L)}</div>
      ${M}`;this._signatures.status!==n&&(this._signatures.status=n,this._statusNode.innerHTML=n);let l=C.single?this._roomReadingHtml(C.room,e):C.outside===null?"":`<div class="cap">${i(e("ui.outside"))}${C.outsideStale?`<span class="open-badge none">${i(e("ui.stale"))}</span>`:""}</div>
           <div class="big ${C.outsideStale?"muted":""}">${Z(C.outside,this._hass,1)}<small> \xB0C</small></div>`;this._signatures.outside!==l&&(this._signatures.outside=l,this._outsideNode.innerHTML=l)}_roomHeadline(C,e,H){return C.available?C.heating&&C.target!==null?I(H("state.room_heating"),{temp:Z(C.target,this._hass,1)}):C.target!==null?I(H("state.room_reached"),{temp:Z(C.target,this._hass,1)}):this._roomState(C,e,H):H("state.room_dead")}_roomReadingHtml(C,e){let H=C.current===null?"\u2013":`${Z(C.current,this._hass,1)}<small> \xB0C</small>`;return`<div class="cap">${i(e("ui.current"))}</div>
      <div class="big ${C.available?"":"muted"}">${H}</div>`}_alertsHtml(C,e){let H=[];C.mode==="frost_guard"&&H.push(["","frost_guard",I(e("alert.frost_guard"),{temp:Z(C.setpoint,this._hass,1)})]);for(let V of C.draughty){let L=`alert.window_${V.openings.longest?.tilted?"tilted":"open"}${C.single?"_here":""}`;H.push(["warn","window_open",I(e(L),{room:V.name,duration:this._ago(V.openings.openFor,e)})])}if(!C.single)for(let V of C.dead)H.push(["quiet","battery",I(e("alert.room_dead"),{room:V.name})]);for(let V of C.batteryLow){let r=V.battery<=r5;H.push([r?"warn":"quiet","battery",I(e(r?"alert.battery_critical":"alert.battery_low"),{room:V.room,head:V.label,value:V.battery})])}return C.batterySilent&&H.push(["quiet","battery",I(e("alert.battery_silent"),{count:C.batterySilent})]),H.length?H.map(([V,r,L])=>`<div class="alert ${V}">${s(r)}<span>${i(L)}</span></div>`).join(""):""}_ago(C,e){return Q(C,e("ui.minute_short"),e("ui.hour_short"))}_segHtml(C,e){return`<div class="seg">${R1.map(V=>`
      <button type="button" data-action="mode" data-value="${V.key}"
        aria-pressed="${V.key===C.mode}">
        ${s(V.icon)}<span>${i(e(`mode.${V.key}`))}</span>
      </button>`).join("")}</div>`}_scheduleHtml(C,e){if(!this._config.show_schedule||C.mode!=="schedule"||!C.schedule.options.length)return"";let H=C.schedule.options.map(V=>`
        <button type="button" class="chip" data-action="schedule" data-value="${i(V)}"
          aria-pressed="${V===C.schedule.current}">${i(V)}</button>`).join("");return`
      <div>
        <div class="cap" style="margin-bottom:6px">${i(e("ui.schedule"))}</div>
        <div class="chips">${H}</div>
      </div>`}_roomsSection(C,e){let H=this._sections.rooms;H.querySelector(".rooms")||(H.innerHTML=`
        <div class="divider"></div>
        <div class="cap">${i(e("ui.rooms"))}<span class="hint">${i(e("ui.tap_hint"))}</span></div>
        <div class="rooms"></div>`,this._roomsNode=H.querySelector(".rooms"),this._rows.clear()),H.hidden=!1;let V=new Set;for(let r of C.rooms){V.add(r.entityId);let L=this._rows.get(r.entityId);if(!L){let c=document.createElement("div");c.className="room",c.innerHTML=`
          <button class="rhead" type="button" data-action="toggle-row" data-room="${i(r.entityId)}">
            <div class="art">${r.heads.some(h=>/thermostat/.test(h.label))?m3(this._uid):c3(this._uid)}</div>
            <span><span class="rname"></span><span class="rstate"></span></span>
            <span class="rtemp"></span>
            ${s("chevron","icon caret")}
            <div class="req" hidden><div class="track"><i></i></div></div>
          </button>
          <div class="rbody"></div>`,this._roomsNode.appendChild(c),L={el:c,dev:c.querySelector(".dev"),name:c.querySelector(".rname"),state:c.querySelector(".rstate"),temp:c.querySelector(".rtemp"),req:c.querySelector(".req"),bar:c.querySelector(".req i"),body:c.querySelector(".rbody"),sig:{}},this._rows.set(r.entityId,L)}let a=this._open.has(r.entityId);L.el.classList.toggle("open",a),L.el.classList.toggle("dead",!r.available),L.el.style.setProperty("--row-accent",this._roomColour(r,C.mode)),u3(L.dev,r);let o=this._openBadge(r,e),M=`${i(r.name)}${r.heads.length>1?` <em>\xB7 ${i(I(e("ui.heads_count"),{count:r.heads.length}))}</em>`:""}${o}`;L.sig.name!==M&&(L.sig.name=M,L.name.innerHTML=M);let n=`${i(this._roomState(r,C.mode,e))}${r.heating&&r.request!==null?`<em> \xB7 ${r.request} %</em>`:""}`;L.sig.state!==n&&(L.sig.state=n,L.state.innerHTML=n);let l=r.available?`${Z(r.current,this._hass,1)} \xB0C \u2192 <b>${Z(r.target,this._hass,1)} \xB0C</b>`:"<b>\u2013</b>";L.sig.temp!==l&&(L.sig.temp=l,L.temp.innerHTML=l);let d=r.heating&&r.request!==null;L.req.hidden=!d,d&&(L.bar.style.width=`${Math.min(100,r.request)}%`);let p=a?this._roomBodyHtml(r,e):"";L.sig.body!==p&&(L.sig.body=p,L.body.innerHTML=p)}for(let[r,L]of this._rows)V.has(r)||(L.el.remove(),this._rows.delete(r))}_roomColour(C,e){return C.available?C.heating?"var(--nh-heat)":e==="frost_guard"?"var(--nh-frost)":e==="away"?"var(--nh-away)":"var(--nh-idle)":"var(--nh-idle)"}_roomState(C,e,H){return C.available?C.boost?H("room.boost"):C.heating?H("room.heating"):H(e==="frost_guard"?"room.frost_guard":e==="away"?"room.away":"room.reached"):H("room.unavailable")}_openBadge(C,e){if(!this._config.show_openings)return"";let H=C.openings;if(H.none)return`<span class="open-badge none">${s("window_open")}${i(e("ui.no_sensor"))}</span>`;if(!H.open)return"";let V=this._openLabel(H,e);return`<span class="open-badge">${s("window_open")}${i(V)}</span>`}_openLabel(C,e){return C.open>1?I(e("ui.windows_open"),{count:C.open}):e(C.tilted?"ui.window_tilted":"ui.window_open")}_roomBodyHtml(C,e){if(!C.available)return`<div class="quiet">${i(e("ui.dead_hint"))}</div>${this._headsHtml(C,e)}`;let H=C.target===null;return`${`
      <div class="rrow">
        <div class="chips">
          <button type="button" class="chip" data-action="boost" data-room="${i(C.entityId)}"
            aria-pressed="${C.boost}">${s("boost")}${i(e("ui.boost"))}</button>
          ${C.canTurnOff?`<button type="button" class="chip" data-action="off" data-room="${i(C.entityId)}"
                 aria-pressed="${C.mode==="off"}">${s("power")}${i(e("ui.turn_off"))}</button>`:""}
        </div>
        <div style="display:flex;align-items:center;gap:8px">
          <div class="updown">
            <button type="button" data-action="temp" data-room="${i(C.entityId)}" data-dir="-1"
              ${H||C.target<=C.minTemp?"disabled":""}>${s("chevron")}</button>
            <button type="button" data-action="temp" data-room="${i(C.entityId)}" data-dir="1"
              ${H||C.target>=C.maxTemp?"disabled":""}>${s("chevron_up")}</button>
          </div>
          <div class="big">${Z(C.target,this._hass,1)}<small> \xB0C</small></div>
        </div>
      </div>`}${this._openingsHtml(C,e)}${this._headsHtml(C,e)}`}_openingsHtml(C,e){if(!this._config.show_openings||C.openings.none)return"";let H=C.openings;if(!H.open)return"";let V=H.longest?.name||e("ui.window_open"),r=H.longest?.tilted?` \xB7 ${e("ui.window_tilted")}`:"";return`<div class="tags"><span class="tag low">${s("window_open")}
      ${i(V+r)}
      <b>${i(this._ago(H.openFor,e))}</b></span></div>`}_headsHtml(C,e){return!this._config.show_batteries||!C.heads.length?"":`<div class="tags">${C.heads.map(V=>{let r=V.battery===null?"silent":V.battery<=t5?"low":"",L=V.battery===null?e("ui.silent"):`${V.battery} %`,a=e(`head.${V.label}`,V.label);return`<span class="tag ${r}" data-action="more-info" data-entity="${i(V.entityId)}">
          ${s("battery")}${i(a)} <b>${i(L)}</b></span>`}).join("")}</div>`}_onClick(C){let e=C.target.closest("[data-action]");if(!e||e.hasAttribute("disabled"))return;let{action:H,room:V,value:r,dir:L,entity:a}=e.dataset,o=this._model;if(!(!o?.ok&&H!=="more-info"))switch(H){case"more-info":this._moreInfo(a);break;case"toggle-row":this._haptic("selection"),this._open.has(V)?this._open.delete(V):this._open.add(V),this._render();break;case"mode":this._haptic("medium"),this._call("set_preset_mode",{entity_id:o.rooms.map(M=>M.entityId),preset_mode:r});break;case"schedule":this._haptic("light"),o.schedule.entityId&&this._hass.callService("select","select_option",{entity_id:o.schedule.entityId,option:r});break;case"boost":{this._haptic("light");let M=o.rooms.find(n=>n.entityId===V);this._call("set_preset_mode",{entity_id:V,preset_mode:M?.boost?"schedule":"boost"});break}case"off":this._haptic("medium"),this._call("set_hvac_mode",{entity_id:V,hvac_mode:"off"});break;case"temp":this._stepTemperature(V,Number(L));break;default:break}}_stepTemperature(C,e){let H=this._model?.rooms?.find(r=>r.entityId===C);if(!H||H.target===null)return;let V=Math.min(H.maxTemp,Math.max(H.minTemp,Math.round((H.target+e*H.step)*10)/10));V!==H.target&&(this._haptic("light"),this._call("set_temperature",{entity_id:C,temperature:V}))}_call(C,e){return e.entity_id?this._hass.callService("climate",C,e):Promise.resolve()}_moreInfo(C){C&&this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:C},bubbles:!0,composed:!0}))}_haptic(C){this.dispatchEvent(new CustomEvent("haptic",{detail:C,bubbles:!0,composed:!0}))}};function I6(){customElements.get(d1)||(customElements.define(d1,v3),window.customCards=window.customCards||[],window.customCards.push({type:d1,name:"Netatmo Heating Card",description:"Card for a Netatmo heating system: rooms, schedules, frost guard, battery levels and open windows.",preview:!0,documentationURL:"https://github.com/gabor-io/ha-appliance-custom-card"}),console.info(`%c ${d1} %c ${b6} `,"color:#fff;background:#f57c00;font-weight:700;border-radius:3px 0 0 3px","color:#f57c00;background:#fff3e0;font-weight:700;border-radius:0 3px 3px 0"))}var mH=N({cardName:d1,toggles:["show_art","show_schedule","show_openings","show_batteries","compact","animate"],defaults:x3,listDevices:$6,getLanguage:L5,translator:i5,languages:A3});function W6(){customElements.get(c2)||customElements.define(c2,mH)}W6();I6();var p1="netatmo-weather-card",v2="netatmo-weather-card-editor",U6="1.24.1",G6="netatmo",a5=[{level:"excellent",max:800},{level:"good",max:1e3},{level:"fair",max:1400},{level:"poor",max:2e3},{level:"bad",max:1/0}],j6=2e3,K6=1e3,h3=1400,o5=[{max:800,colour:"var(--air-excellent)"},{max:h3,colour:"var(--air-fair)"},{max:1/0,colour:"var(--air-bad)"}],Q6=30,Y6=15,q6={up:"trend_up",down:"trend_down",stable:"trend_stable"},X6=20;var cH={card_name:"Id\u0151j\xE1r\xE1s-\xE1llom\xE1s",trend:{up:"emelkedik",down:"s\xFCllyed",stable:"\xE1lland\xF3"},band:{excellent:"Kiv\xE1l\xF3",good:"J\xF3",fair:"K\xF6zepes",poor:"Gyenge",bad:"Rossz"},state:{outdoor_stale:"A k\xFClt\xE9ri modul leszakadt",outdoor_dead:"A k\xFClt\xE9ri modul nem v\xE1laszol",no_outdoor:"Nincs k\xFClt\xE9ri modul"},alert:{co2_high:"{name} \xB7 kezd elhaszn\xE1l\xF3dni a leveg\u0151 ({value} ppm)",co2_bad:"{name} \xB7 szell\u0151ztess, magas a CO\u2082 ({value} ppm)",stale:"{name} \xB7 a modul leszakadt, az adat nem friss\xFCl",dead:"{name} \xB7 a modul nem v\xE1laszol",battery_low:"{name} \xB7 fogy az elem ({value} %)",battery_critical:"{name} \xB7 az elem kritikus ({value} %) \u2013 cser\xE9ld ki"},ui:{outside:"Kint",rooms:"Szob\xE1k",stale_badge:"nem friss\xFCl",dead_badge:"nem v\xE1laszol",stale_hint:"A modul leszakadt \u2013 ezek a legut\xF3bbi m\xE9rt \xE9rt\xE9kek.",dead_hint:"A modul nem k\xFCld m\xE9r\xE9st.",co2:"CO\u2082",updated:"{age} friss\xFClt",just_now:"\xE9pp most",minute_short:"perce",hour_short:"\xF3r\xE1ja",no_station:"Nem tal\xE1ltam Netatmo id\u0151j\xE1r\xE1s-\xE1llom\xE1st."},editor:{device:"K\xE9sz\xFCl\xE9k",device_auto:"Automatikus",language:"Nyelv",language_auto:"Automatikus",show_art:"K\xE9sz\xFCl\xE9krajz",show_rooms:"Szob\xE1k",show_co2:"CO\u2082 m\xE9r\u0151s\xE1v",show_alerts:"Figyelmeztet\xE9sek",compact:"Kompakt",animate:"Anim\xE1ci\xF3k"}},uH={card_name:"Weather station",trend:{up:"rising",down:"falling",stable:"steady"},band:{excellent:"Excellent",good:"Good",fair:"Fair",poor:"Poor",bad:"Bad"},state:{outdoor_stale:"The outdoor module is offline",outdoor_dead:"The outdoor module is not responding",no_outdoor:"No outdoor module"},alert:{co2_high:"{name} \xB7 the air is getting stale ({value} ppm)",co2_bad:"{name} \xB7 open a window, CO\u2082 is high ({value} ppm)",stale:"{name} \xB7 the module is offline, the reading is not updating",dead:"{name} \xB7 the module is not responding",battery_low:"{name} \xB7 battery getting low ({value} %)",battery_critical:"{name} \xB7 battery critical ({value} %) \u2013 replace it"},ui:{outside:"Outside",rooms:"Rooms",stale_badge:"not updating",dead_badge:"no answer",stale_hint:"The module is offline \u2013 these are its last readings.",dead_hint:"The module is sending no readings.",co2:"CO\u2082",updated:"updated {age}",just_now:"just now",minute_short:"min ago",hour_short:"h ago",no_station:"No Netatmo weather station found."},editor:{device:"Device",device_auto:"Automatic",language:"Language",language_auto:"Automatic",show_art:"Device drawing",show_rooms:"Rooms",show_co2:"CO\u2082 meter",show_alerts:"Alerts",compact:"Compact",animate:"Animations"}},J6={hu:cH,en:uH},f3=Object.keys(J6);function M5(t,C){return T(t,C,f3)}function n5(t){return $(J6,t)}function g3(t,C={}){return Object.entries(C).reduce((e,[H,V])=>e.replace(`{${H}}`,String(V)),t)}var vH={temperature:["temperature"],humidity:["humidity"],co2:["carbon_dioxide"],pressure:["atmospheric_pressure","pressure"],noise:["sound_pressure"],battery:["battery"],signal:["signal_strength"],rain:["precipitation","precipitation_intensity"],wind:["wind_speed"]};function xH(t){return Object.values(t?.entities||{})}function hH(t){return t.translation_key==="temp_trend"?"temperature":t.translation_key==="pressure_trend"?"pressure":/_(temp|temperature)_trend$/.test(t.entity_id)?"temperature":/_pressure_trend$/.test(t.entity_id)?"pressure":null}function fH(t,C){return t?.states?.[C.entity_id]?.attributes?.device_class||C.original_device_class||null}function gH(t){let C=new Map,e=H=>(C.has(H)||C.set(H,{sensors:{},trend:{},reachable:null}),C.get(H));for(let H of xH(t)){if(H.platform!==G6||!H.device_id)continue;let V=fH(t,H);if(H.entity_id.startsWith("binary_sensor.")){V==="connectivity"&&(e(H.device_id).reachable=H.entity_id);continue}if(!H.entity_id.startsWith("sensor."))continue;let r=hH(H);if(r){e(H.device_id).trend[r]=H.entity_id;continue}for(let[L,a]of Object.entries(vH))a.includes(V)&&(e(H.device_id).sensors[L]=H.entity_id)}return C}function ZH(t,C){return/public/i.test(t?.model||"")?!0:!!(C.rain||C.wind)}function Z3(t,C={}){let e=C.sources||{},H=gH(t),V=[];for(let[M,n]of H){if(!n.sensors.temperature)continue;let l=t?.devices?.[M];ZH(l,n.sensors)||V.push({deviceId:M,name:l?.name_by_user||l?.name||M,model:l?.model||"",area:l?.area_id||W(t,n.sensors.temperature),...n})}let r=M=>V.find(n=>n.deviceId===M)||null,L=e.main?r(e.main):null;L||(L=V.find(M=>M.sensors.pressure)||null);let a=e.outdoor?r(e.outdoor):null;a||(a=V.find(M=>M!==L&&/outdoor/i.test(M.model))||null),a||(a=V.find(M=>M!==L&&!M.sensors.co2)||null);for(let M of V)M.label=SH(M.name,L?.name);let o=V.filter(M=>M!==a);return{main:L,outdoor:a,indoor:o,all:V}}function SH(t,C){if(!C||t===C)return t;let e=`${C} `;return t.startsWith(e)?t.slice(e.length):t}function S3(t){return Z3(t).all.map(C=>({id:C.deviceId,name:C.name}))}function C8(t,C){let e=C.area?t?.areas?.[C.area]:null;return e?.name?e.name:C.label||C.name}function Y1(t,C){if(!C)return null;let e=t?.states?.[C];if(x(e))return null;let H=Number(e.state);return Number.isFinite(H)?H:null}function _3(t,C){if(!C)return null;let e=t?.states?.[C];return x(e)?null:e.state}function _H(t,C,e){return t?.states?.[C]?.attributes?.unit_of_measurement||e}function yH(t,C){let e=t?.states?.[C]?.last_updated||t?.states?.[C]?.last_changed;if(!e)return null;let H=(Date.now()-new Date(e).getTime())/1e3;return Number.isFinite(H)?Math.max(0,H):null}function bH(t){return t==null?null:{level:(a5.find(e=>t<e.max)||a5[a5.length-1]).level,ratio:Math.min(1,t/j6)}}function e8(t){return t==null?null:(o5.find(C=>t<C.max)||o5[o5.length-1]).colour}function y3(t,C,e){if(!C)return null;let{sensors:H,trend:V,reachable:r}=C,L=Y1(t,H.temperature),a=L===null,o=_3(t,r),M=!a&&o==="off",n=Y1(t,H.co2);return{kind:e,deviceId:C.deviceId,name:C8(t,C),entityId:H.temperature||H.battery||null,sensors:H,live:!a&&!M,stale:M,dead:a,temperature:L,temperatureTrend:_3(t,V.temperature),humidity:Y1(t,H.humidity),co2:n,band:bH(n),glow:a||M?null:e8(n),noise:Y1(t,H.noise),pressure:Y1(t,H.pressure),pressureUnit:_H(t,H.pressure,"hPa"),pressureTrend:_3(t,V.pressure),battery:Y1(t,H.battery),age:yH(t,H.temperature)}}function H8(t,C){let e=Z3(t,C);if(!e.main&&!e.outdoor&&!e.indoor.length)return{ok:!1,reason:"no_station"};let H=y3(t,e.main,"main"),V=y3(t,e.outdoor,"outdoor"),r=e.indoor.map(l=>y3(t,l,l===e.main?"main":"module")).filter(Boolean),L=H?.pressure??null,o=r.filter(l=>l.live).reduce((l,d)=>d.co2!==null&&d.co2>l?d.co2:l,0),M=[];for(let l of r){if(l.dead){M.push({kind:"quiet",icon:"offline",key:"alert.dead",values:{name:l.name}});continue}if(l.stale){M.push({kind:"",icon:"offline",key:"alert.stale",values:{name:l.name}});continue}l.co2!==null&&l.co2>=h3?M.push({kind:"error",icon:"alert",key:"alert.co2_bad",values:{name:l.name,value:l.co2}}):l.co2!==null&&l.co2>=K6&&M.push({kind:"",icon:"alert",key:"alert.co2_high",values:{name:l.name,value:l.co2}})}V?.dead?M.push({kind:"quiet",icon:"offline",key:"alert.dead",values:{name:V.name}}):V?.stale&&M.push({kind:"",icon:"offline",key:"alert.stale",values:{name:V.name}});for(let l of[...r,V].filter(Boolean))l.battery!==null&&(l.battery<=Y6?M.push({kind:"error",icon:"battery",key:"alert.battery_critical",values:{name:l.name,value:l.battery}}):l.battery<=Q6&&M.push({kind:"quiet",icon:"battery",key:"alert.battery_low",values:{name:l.name,value:l.battery}}));let n=[H,V,...r].filter(l=>l?.live&&l.age!==null).map(l=>l.age);return{ok:!0,main:H,outdoor:V,indoor:r,pressure:L,pressureUnit:H?.pressureUnit||"hPa",pressureTrend:H?.pressureTrend??null,worstCo2:o||null,heroGlow:e8(o||null),alerts:M,age:n.length?Math.min(...n):null,quietFor:n.length&&Math.min(...n)>X6*60}}function V8(t){return`
  <svg class="defs" width="0" height="0" aria-hidden="true">
    <defs>
      <linearGradient id="${t}-alu" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#b4b9bc"/>
        <stop offset=".18" stop-color="#dfe3e5"/>
        <stop offset=".42" stop-color="#f4f6f7"/>
        <stop offset=".72" stop-color="#dde1e4"/>
        <stop offset="1" stop-color="#aeb3b7"/>
      </linearGradient>
      <filter id="${t}-soft" x="-60%" y="-20%" width="220%" height="170%">
        <feGaussianBlur stdDeviation="3"/>
      </filter>
    </defs>
  </svg>`}function b3(t,{tall:C=!1,notch:e=!1}={}){let H=C?196:138,V=16,r=C?162:104,L=52,a=(100-L)/2,o=V+r*.22,M=r*.56,n=16,l=V+r-n;return`
  <svg class="dev" viewBox="0 0 100 ${H}" role="img" aria-hidden="true">
    <ellipse class="shadow" cx="50" cy="${V+r+6}" rx="30" ry="5" filter="url(#${t}-soft)"/>
    <rect class="shell" x="${a}" y="${V}" width="${L}" height="${r}" rx="3"
      fill="url(#${t}-alu)"/>
    <rect class="base" x="${a}" y="${l}" width="${L}" height="${n}" rx="3"/>
    <ellipse class="base" cx="50" cy="${V+r}" rx="${L/2}" ry="4.5"/>
    ${e?`<rect class="groove" x="48" y="${V+r-3}" width="4" height="6" rx="2"/>`:""}
    <ellipse class="cap" cx="50" cy="${V}" rx="${L/2}" ry="6"/>
    <ellipse class="cap-inner" cx="50" cy="${V+.6}" rx="${L/2-7}" ry="3.6"/>
    <rect class="groove" x="48.3" y="${o}" width="3.4" height="${M}" rx="1.7"/>
    <rect class="halo" x="47.2" y="${o}" width="5.6" height="${M}" rx="2.8"/>
    <rect class="lamp" x="48.3" y="${o}" width="3.4" height="${M}" rx="1.7"/>
  </svg>`}function w3(t,{glow:C=null,dead:e=!1,stale:H=!1}={}){if(!t)return;t.classList.toggle("lit",!!C),t.classList.toggle("dead",!!e),t.classList.toggle("stale",!!H);let V=t.style.getPropertyValue("--glow");C&&V!==C&&t.style.setProperty("--glow",C),!C&&V&&t.style.removeProperty("--glow")}var t8=`
${R}

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
`;var O3={language:"auto",compact:!1,animate:!0,show_art:!0,show_rooms:!0,show_co2:!0,show_alerts:!0},r8=0,k3=class extends HTMLElement{static getConfigElement(){return document.createElement(v2)}static getStubConfig(){return{type:`custom:${p1}`}}constructor(){super(),this.attachShadow({mode:"open"}),this._sections={},this._signatures={},this._rows=new Map,this._built=!1,r8+=1,this._uid=`netatmo${r8}`}setConfig(C){this._config={...O3,...C||{}},this._signatures={},this._rows.clear(),this._hass&&this._render()}set hass(C){this._hass=C,this._render()}get hass(){return this._hass}getCardSize(){let C=this._model?.indoor?.length||1;return(this._config?.compact?3:4)+C}getGridOptions(){return{columns:12,min_columns:6,rows:"auto"}}_build(){let C=document.createElement("style");C.textContent=t8;let e=document.createElement("ha-card"),H=document.createElement("div");H.className="wrap",H.addEventListener("click",V=>this._onClick(V)),H.insertAdjacentHTML("beforeend",V8(this._uid));for(let V of["top","hero","alerts","rooms"]){let r=document.createElement("div");r.dataset.section=V,this._sections[V]=r,H.appendChild(r)}e.appendChild(H),this.shadowRoot.replaceChildren(C,e),this._wrap=H,this._built=!0}_render(){if(!this._hass||!this._config)return;this._built||this._build();let C=n5(M5(this._config,this._hass)),e=H8(this._hass,this._config);if(this._model=e,!e.ok){this._renderEmpty(e,C);return}this._emptyShown=!1,this._applyWrapClasses(e),this._section("top",this._topHtml(e,C)),this._heroSection(e,C),this._section("alerts",this._config.show_alerts?this._alertsHtml(e,C):""),this._roomsSection(e,C)}_renderEmpty(C,e){if(this._emptyShown!==C.reason){this._emptyShown=C.reason,this._signatures={},this._rows.clear();for(let[H,V]of Object.entries(this._sections))V.innerHTML="",V.hidden=H!=="top";this._sections.top.innerHTML=`
      <div class="empty">
        ${s("gauge")}
        <div>${i(e(`ui.${C.reason}`))}</div>
      </div>`}}_section(C,e){this._signatures[C]!==e&&(this._signatures[C]=e,this._sections[C].innerHTML=e,this._sections[C].hidden=!e)}_applyWrapClasses(C){let e=["wrap"];this._config.compact&&e.push("compact"),this._config.animate||e.push("no-animation"),this._hass.themes?.darkMode&&e.push("dark");let H=e.join(" ");this._wrap.className!==H&&(this._wrap.className=H);let V=C.heroGlow||"var(--primary-color, #03a9f4)";this._wrap.style.getPropertyValue("--ap-accent")!==V&&this._wrap.style.setProperty("--ap-accent",V)}_topHtml(C,e){let H=C.age===null?"":`<span class="age ${C.quietFor?"late":""}">${i(g3(e("ui.updated"),{age:this._ago(C.age,e)}))}</span>`;return`
      <div class="top">
        <span class="name" data-action="more-info" data-entity="${i(C.main?.entityId||"")}">${i(this._config.name||e("card_name"))}</span>
        <span class="spacer"></span>
        ${H}
      </div>`}_heroSection(C,e){this._sections.hero.querySelector(".hero")||(this._sections.hero.innerHTML=`
        <div class="hero">
          <div class="art" data-action="more-info">${b3(this._uid,{tall:!0})}</div>
          <div class="status"></div>
          <div class="reading"></div>
        </div>`,this._heroNode=this._sections.hero.querySelector(".hero"),this._statusNode=this._sections.hero.querySelector(".status"),this._readingNode=this._sections.hero.querySelector(".reading"));let H=this._sections.hero.querySelector(".art");H.hidden=!this._config.show_art,this._config.show_art&&(w3(H.querySelector(".dev"),{glow:C.heroGlow,dead:!!C.main?.dead,stale:!!C.main?.stale}),H.dataset.entity=C.main?.entityId||"");let V=C.outdoor,r=V?V.dead?e("state.outdoor_dead"):V.stale?e("state.outdoor_stale"):this._trendHtml(V.temperatureTrend,e):e("state.no_outdoor"),L=[];V?.live&&V.humidity!==null&&L.push(this._fact("water_percent",`${Math.round(V.humidity)} %`)),C.pressure!==null&&L.push(this._fact("gauge",`${Z(C.pressure,this._hass,1)} ${i(C.pressureUnit)}`,this._trendHtml(C.pressureTrend,e)));let a=V?.stale||V?.dead?`<span class="tag">${i(e(V.dead?"ui.dead_badge":"ui.stale_badge"))}</span>`:"",o=`
      <div class="cap">${i(e("ui.outside"))}${a}</div>
      <div class="state">${r}</div>
      ${L.length?`<div class="facts">${L.join("")}</div>`:""}`;this._signatures.status!==o&&(this._signatures.status=o,this._statusNode.innerHTML=o);let M=!V||V.dead?"\u2013":`${Z(V.temperature,this._hass,1)}<small> \xB0C</small>`,n=`<div class="big ${V?.live?"":"muted"}">${M}</div>`;this._signatures.reading!==n&&(this._signatures.reading=n,this._readingNode.innerHTML=n)}_fact(C,e,H=""){return`<span class="fact">${s(C)}<b>${e}</b>${H}</span>`}_trendHtml(C,e){let H=q6[C];return H?`<span class="trend ${i(C)}">${s(H)}${i(e(`trend.${C}`))}</span>`:""}_alertsHtml(C,e){return C.alerts.length?`<div class="alerts">${C.alerts.map(V=>`<div class="alert${V.kind?` ${V.kind}`:""}">${s(V.icon)}<span>${i(g3(e(V.key),V.values))}</span></div>`).join("")}</div>`:""}_roomsSection(C,e){let H=this._sections.rooms;if(!this._config.show_rooms||!C.indoor.length){H.innerHTML="",H.hidden=!0,this._rows.clear();return}H.querySelector(".rooms")||(H.innerHTML=`
        <div class="divider"></div>
        <div class="sec-cap">${i(e("ui.rooms"))}</div>
        <div class="rooms"></div>`,this._roomsNode=H.querySelector(".rooms"),this._rows.clear()),H.hidden=!1;let V=new Set;for(let r of C.indoor){V.add(r.deviceId);let L=this._rows.get(r.deviceId);if(!L){let n=document.createElement("button");n.type="button",n.className="room",n.dataset.action="more-info",n.innerHTML=`
          <span class="art">${b3(this._uid)}</span>
          <span>
            <span class="rname"></span>
            <span class="body"></span>
          </span>`,this._roomsNode.appendChild(n),L={el:n,dev:n.querySelector(".dev"),name:n.querySelector(".rname"),body:n.querySelector(".body"),sig:{}},this._rows.set(r.deviceId,L)}L.el.dataset.entity=r.entityId||"",L.el.classList.toggle("dead",r.dead),L.el.classList.toggle("stale",r.stale),L.el.querySelector(".art").hidden=!this._config.show_art,w3(L.dev,{glow:r.glow,dead:r.dead,stale:r.stale});let a=r.dead?`<span class="tag quiet">${i(e("ui.dead_badge"))}</span>`:r.stale?`<span class="tag">${i(e("ui.stale_badge"))}</span>`:"",o=`${i(r.name)}${a}`;L.sig.name!==o&&(L.sig.name=o,L.name.innerHTML=o);let M=this._roomBodyHtml(r,e);L.sig.body!==M&&(L.sig.body=M,L.body.innerHTML=M)}for(let[r,L]of this._rows)V.has(r)||(L.el.remove(),this._rows.delete(r))}_roomBodyHtml(C,e){if(C.dead)return`<span class="rline"><span class="rtemp">\u2013</span></span>
        <div class="quiet">${i(e("ui.dead_hint"))}</div>`;let H=[];C.humidity!==null&&H.push(this._fact("water_percent",`${Math.round(C.humidity)} %`)),C.noise!==null&&H.push(this._fact("noise",`${Math.round(C.noise)} dB`));let V=`
      <span class="rline">
        <span class="rtemp">${Z(C.temperature,this._hass,1)} \xB0C</span>
        ${C.stale?"":this._trendHtml(C.temperatureTrend,e)}
        ${H.join("")}
      </span>`;return C.stale?`${V}<div class="quiet">${i(e("ui.stale_hint"))}</div>`:!this._config.show_co2||!C.band?V:`${V}
      <div class="co2">
        <div class="track"><i class="fill-${C.band.level}"
          style="width:${Math.round(C.band.ratio*100)}%"></i></div>
        <div class="read">
          <span>${i(e("ui.co2"))}</span>
          <b>${C.co2} ppm</b>
          <span class="band level-${C.band.level}">${i(e(`band.${C.band.level}`))}</span>
        </div>
      </div>`}_ago(C,e){return C<90?e("ui.just_now"):Q(C,e("ui.minute_short"),e("ui.hour_short"))}_onClick(C){let e=C.target.closest("[data-action]");e&&e.dataset.action==="more-info"&&this._moreInfo(e.dataset.entity)}_moreInfo(C){C&&this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:C},bubbles:!0,composed:!0}))}};function L8(){customElements.get(p1)||(customElements.define(p1,k3),window.customCards=window.customCards||[],window.customCards.push({type:p1,name:"Netatmo Weather Card",description:"Card for a Netatmo weather station: outdoor temperature, pressure, and CO\u2082 per room, with modules that have gone quiet called out rather than shown as current.",preview:!0,documentationURL:"https://github.com/gabor-io/ha-appliance-custom-card"}),console.info(`%c ${p1} %c ${U6} `,"color:#fff;background:#0288d1;font-weight:700;border-radius:3px 0 0 3px","color:#0288d1;background:#e1f5fe;font-weight:700;border-radius:0 3px 3px 0"))}var wH=N({cardName:p1,toggles:["show_art","show_rooms","show_co2","show_alerts","compact","animate"],defaults:O3,listDevices:S3,getLanguage:M5,translator:n5,languages:f3});function i8(){customElements.get(v2)||customElements.define(v2,wH)}i8();L8();var A1="aeno-heater-card",x2="aeno-heater-card-editor",a8="1.24.1",E3="tuya_local",o8="heater",m1={lock:"child_lock",limit:"maximum_temperature",remaining:"time_remaining",timer:"timer",unit:"temperature_unit"},q1=[{key:"off",icon:"power",colour:"var(--ae-off)"},{key:"heat",icon:"heat",colour:"var(--ae-heat)"}],M8=q1.map(t=>t.key),n8=[{key:"comfort",icon:"target"},{key:"manual",icon:"manual"}],s8="manual",T3=.5,l8=50,d8=120,p8=.4,$3={min:0,max:40};var kH={card_name:"Infrapanel",mode:{off:"Ki",heat:"F\u0171t\xE9s"},mode_long:{off:"Kikapcsolva",heat:"F\u0171t\xE9s"},preset:{comfort:"Smart",manual:"Folyamatos"},state:{unavailable:"A panel nem v\xE1laszol",off:"Kikapcsolva",heating_to:"F\u0171t {temp} \xB0C-ra",holding:"{temp} \xB0C-ot tart",above:"Melegebb a be\xE1ll\xEDtottn\xE1l",continuous:"Folyamatosan f\u0171t",warming_up:"Melegszik"},sub:{unavailable:"Nincs v\xE1lasz a panelr\u0151l \u2013 \xE1ram vagy h\xE1l\xF3zat",off:"Legut\xF3bbi c\xE9l: {temp} \xB0C",off_no_target:"A panel \xE1ll",reached:"El\xE9rte a h\u0151fokot, az elem nem f\u0171t",below_by:"{diff} \xB0C-kal hidegebb a szoba",above_by:"{diff} \xB0C-kal melegebb a szoba",continuous:"Folyamatos m\xF3dban az elem a be\xE1ll\xEDtott h\u0151fokt\xF3l f\xFCggetlen\xFCl megy",panel_warming:"A lap {temp} \xB0C-os, m\xE9g melegszik",panel_hot:"A lap {temp} \xB0C-os"},alert:{window_open:"{name} nyitva {duration} \u2013 a panel nyitott ablakba f\u0171t",window_tilted:"{name} buk\xF3ra van {duration} \u2013 a panel nyitott ablakba f\u0171t",continuous:"Folyamatos m\xF3d: a panel a h\u0151fok el\xE9r\xE9se ut\xE1n sem \xE1ll le",locked:"Gyerekz\xE1r \u2013 a panel gombjai nem m\u0171k\xF6dnek",timer:"Id\u0151z\xEDt\u0151: {remaining} m\xFAlva kikapcsol"},ui:{device:"AENO AGH0001S",room:"Szoba",panel:"Lap",power:"Teljes\xEDtm\xE9ny",energy:"Fogyaszt\xE1s",device_reads:"a panel szerint",limit:"Lap max.",lock:"Gyerekz\xE1r",timer:"Id\u0151z\xEDt\u0151",timer_off:"nincs",timer_cancel:"Id\u0151z\xEDt\u0151 t\xF6rl\xE9se",window:"Ablak",window_open:"nyitva",window_tilted:"buk\xF3ra",windows_open:"{count} ablak nyitva",no_window_sensor:"nincs nyit\xE1s\xE9rz\xE9kel\u0151",minute_short:"perc",hour_short:"\xF3",no_entity:"Nem tal\xE1ltam infrapanelt ebben a Home Assistantban.",many_entities:"T\xF6bb panel is van \u2013 v\xE1laszd ki, melyikr\u0151l sz\xF3ljon a k\xE1rtya.",missing_entity:"A megadott entit\xE1s nem l\xE9tezik."},editor:{device:"Eszk\xF6z",device_auto:"Automatikus",name:"N\xE9v (\xFCresen a ter\xFClet neve)",language:"Nyelv",language_auto:"Automatikus",sections:"Mit mutasson",show_art:"Panelrajz",show_readings:"M\xE9rt \xE9rt\xE9kek",show_modes:"Be/ki s\xE1v",show_presets:"F\u0171t\xE9si m\xF3d",show_setpoint:"H\u0151fok a panelen",show_extras:"Gyerekz\xE1r, lap max.",show_openings:"Nyit\xE1s\xE9rz\xE9kel\u0151k",compact:"Kompakt",animate:"Anim\xE1ci\xF3k"}},OH={card_name:"Panel heater",mode:{off:"Off",heat:"Heat"},mode_long:{off:"Off",heat:"Heating"},preset:{comfort:"Smart",manual:"Constant"},state:{unavailable:"The panel is not responding",off:"Off",heating_to:"Heating to {temp} \xB0C",holding:"Holding {temp} \xB0C",above:"Warmer than the setpoint",continuous:"Heating continuously",warming_up:"Warming up"},sub:{unavailable:"No answer from the panel - power or network",off:"Last target: {temp} \xB0C",off_no_target:"The panel is idle",reached:"At temperature, the element is off",below_by:"The room is {diff} \xB0C cooler",above_by:"The room is {diff} \xB0C warmer",continuous:"In Constant mode the element runs whatever the setpoint says",panel_warming:"The surface is at {temp} \xB0C and still warming",panel_hot:"The surface is at {temp} \xB0C"},alert:{window_open:"{name} has been open {duration} - the panel is heating it",window_tilted:"{name} has been on the latch {duration} - the panel is heating it",continuous:"Constant mode: the panel will not stop at the setpoint",locked:"Child lock - the panel buttons do nothing",timer:"Timer: switches off in {remaining}"},ui:{device:"AENO AGH0001S",room:"Room",panel:"Surface",power:"Power",energy:"Energy",device_reads:"panel reads",limit:"Element max.",lock:"Child lock",timer:"Timer",timer_off:"none",timer_cancel:"Cancel timer",window:"Window",window_open:"open",window_tilted:"on the latch",windows_open:"{count} windows open",no_window_sensor:"no opening sensor",minute_short:"min",hour_short:"h",no_entity:"No panel heater found in this Home Assistant.",many_entities:"There is more than one panel - pick the one this card is about.",missing_entity:"The configured entity does not exist."},editor:{device:"Device",device_auto:"Automatic",name:"Name (the area name when empty)",language:"Language",language_auto:"Automatic",sections:"Sections",show_art:"Panel drawing",show_readings:"Readings",show_modes:"On/off bar",show_presets:"Heating mode",show_setpoint:"Setpoint on the panel",show_extras:"Child lock, element max.",show_openings:"Opening sensors",compact:"Compact",animate:"Animations"}},A8={hu:kH,en:OH},R3=Object.keys(A8);function s5(t,C){return T(t,C,R3)}function l5(t){return $(A8,t)}function X1(t,C={}){return Object.entries(C).reduce((e,[H,V])=>e.replace(`{${H}}`,String(V)),t)}function d5(t){return Object.values(t?.entities||{})}function m8(t,C){if(C.platform!==E3||!C.entity_id.startsWith("climate."))return!1;if(C.translation_key===o8)return!0;let e=t?.states?.[C.entity_id]?.attributes?.hvac_modes;return Array.isArray(e)&&e.length>0&&e.every(H=>H==="off"||H==="heat")}function c8(t){return d5(t).filter(C=>m8(t,C)).map(C=>C.entity_id)}function p5(t){let C=new Map;for(let e of d5(t)){if(!e.device_id||!m8(t,e))continue;let H=t.devices?.[e.device_id];if(!H)continue;let V=H.name_by_user||H.name||e.device_id,r=B3(t,H.area_id);C.set(e.device_id,r?`${r} \u2013 ${V}`:V)}return[...C.entries()].map(([e,H])=>({id:e,name:H}))}function B3(t,C){return C&&t?.areas?.[C]?.name||null}function u8(t,C){let e=C?.device?d5(t).find(V=>V.device_id===C.device&&V.entity_id.startsWith("climate."))?.entity_id:null;if(C?.entity&&(!e||t?.entities?.[C.entity]?.device_id===C.device))return C.entity;if(e)return e;let H=c8(t);return H.length===1?H[0]:null}function v8(t){return c8(t).length>1}function EH(t,C){let e=t?.entities?.[C]?.device_id;if(!e)return{};let H=d5(t).filter(n=>n.device_id===e&&n.platform===E3),V={},r=n=>H.find(l=>l.translation_key===n)?.entity_id,L=H.filter(n=>n.entity_id.startsWith("sensor.")),a=n=>t.states?.[n.entity_id]?.attributes?.device_class||n.original_device_class||null,o=n=>L.find(l=>a(l)===n)?.entity_id,M=(n,l=[])=>{let d=H.filter(p=>p.entity_id.startsWith(`${n}.`)&&!l.includes(p.translation_key));return d.length===1?d[0].entity_id:void 0};return V.unit=r(m1.unit),V.lock=r(m1.lock),V.limit=r(m1.limit),V.timer=r(m1.timer),V.remaining=r(m1.remaining),V.power=o("power"),V.energy=o("energy"),V.panel=o("temperature"),V.mount=M("switch"),V.brightness=M("select",[m1.unit,m1.timer]),V}function x8(t,C,e={}){let H=EH(t,C);return{climate:C,room:e.temperature||null,humidity:e.humidity||null,panel:H.panel,power:e.power||H.power,energy:e.energy||H.energy,lock:H.lock,limit:H.limit,timer:H.timer,remaining:H.remaining,mount:H.mount,brightness:H.brightness,unit:H.unit}}function h8(t,C,e={}){let H=e.openings||{},V=H.entities||[];if(H.auto===!1&&!V.length)return[];let r=H.area||W(t,C);return j1(t,{areas:H.auto===!1?[]:[r].filter(Boolean),classes:H.classes||T1,include:V,exclude:H.ignore||[]})}function J1(t,C){if(!C)return null;let e=t?.states?.[C];if(x(e))return null;let H=Number(e.state);return Number.isFinite(H)?H:null}function TH(t,C){if(!C)return null;let e=t?.states?.[C];return x(e)?null:e.state}function f8(t,C,e=""){return t?.states?.[C]?.attributes?.unit_of_measurement||e}function $H(t,C){return t?.states?.[C]?.attributes?.friendly_name||""}function RH(t,C,e){if(C?.name)return C.name;let H=B3(t,W(t,e));if(H)return H;let V=t?.entities?.[e]?.device_id,r=V?t.devices?.[V]:null;return r?.name_by_user||r?.name||$H(t,e)||e}function BH(t){return t===null?null:Math.max(0,Math.min(1,t/d8))}function PH(t,C,e={}){let H=t?.states?.[C];if(!H)return null;let V=x8(t,C,e?.sources||{}),r=H.attributes||{},L=!x(H),a=H.state,o=L&&a!=="off",M=r.current_temperature??null,n=J1(t,V.room),l=n??M,d=r.temperature??null,p=r.preset_modes||[],c=n8.filter(E=>p.includes(E.key)).map(E=>({...E,on:r.preset_mode===E.key})),h=o&&r.preset_mode===s8,m=J1(t,V.power),g=J1(t,V.panel),A=o?r.hvac_action||null:L?"off":null,y=A!==null||m!==null,_;o?A?_=A==="heating":m!==null?_=m>=l8:_=l===null||d===null?!0:l<d-T3:_=!1;let S=t?.states?.[V.limit],f=S&&!x(S)?{entityId:V.limit,value:Number(S.state),min:S.attributes?.min??60,max:S.attributes?.max??120,step:S.attributes?.step??5,unit:S.attributes?.unit_of_measurement||"\xB0C"}:null,P=t?.states?.[V.lock],U=P&&!x(P)?P.state==="locked":null,X=TH(t,V.timer),N1={entityId:V.timer,set:!!X&&X!=="cancel"&&X!=="off",label:X,remaining:J1(t,V.remaining)},K=e.show_openings===!1?l1([]):l1(h8(t,C,e),e.open_delay??$1,{pairs:e.openings?.pairs,windows:e.openings?.windows});return{entityId:C,entities:V,name:RH(t,e,C),available:L,on:o,mode:a,modes:(r.hvac_modes||[]).filter(E=>M8.includes(E)),action:A,heating:_,heatingKnown:y,continuous:h,target:d,targetStep:r.target_temp_step||1,minTemp:r.min_temp??$3.min,maxTemp:r.max_temp??$3.max,unit:t?.config?.unit_system?.temperature||"\xB0C",inside:M,room:n,measured:l,external:n!==null,humidity:J1(t,V.humidity),panelTemp:g,glow:BH(g),power:m,powerUnit:f8(t,V.power,"W"),energy:J1(t,V.energy),energyUnit:f8(t,V.energy,"kWh"),presets:c,presetMode:r.preset_mode||null,locked:U,limit:f,timer:N1,openings:K,draughty:o&&_&&K.warn}}function g8(t){if(t.measured===null||t.target===null)return null;let C=t.measured-t.target;return Math.abs(C)<T3?"at":C>0?"above":"below"}function Z8(t){if(!t.available)return{key:"state.unavailable"};if(!t.on)return{key:"state.off"};if(t.continuous)return{key:"state.continuous"};if(t.target===null)return{key:t.heating?"state.warming_up":"state.off"};let C=g8(t);return t.heating&&C!=="above"?{key:"state.heating_to",temp:t.target}:C==="above"?{key:"state.above"}:{key:"state.holding",temp:t.target}}function S8(t){if(!t.available)return{key:"sub.unavailable"};if(!t.on)return t.target===null?{key:"sub.off_no_target"}:{key:"sub.off",temp:t.target};if(t.panelTemp!==null&&t.heating&&t.glow!==null&&t.glow<p8)return{key:"sub.panel_warming",temp:Math.round(t.panelTemp)};if(!t.heating&&t.heatingKnown)return{key:"sub.reached"};let C=g8(t);if(C===null||C==="at")return t.panelTemp!==null?{key:"sub.panel_hot",temp:Math.round(t.panelTemp)}:{key:""};let e=Math.round(Math.abs(t.measured-t.target)*10)/10;return{key:C==="above"?"sub.above_by":"sub.below_by",diff:e}}function _8(t,C){let e=u8(t,C);if(!e)return{ok:!1,reason:v8(t)?"many_entities":"no_entity"};if(!t?.states?.[e])return{ok:!1,reason:"missing_entity"};let H=PH(t,e,C);return H?{ok:!0,...H}:{ok:!1,reason:"missing_entity"}}var H1=[[0,[154,163,168]],[.2,[168,176,181]],[.42,[240,169,43]],[.7,[239,108,42]],[1,[216,27,27]]];function NH(t){if(t==null)return`rgb(${H1[0][1].join()})`;let C=Math.max(0,Math.min(1,t)),e=H1[0],H=H1[H1.length-1];for(let a=0;a<H1.length-1;a+=1)if(C>=H1[a][0]&&C<=H1[a+1][0]){e=H1[a],H=H1[a+1];break}let V=H[0]-e[0],r=V===0?0:(C-e[0])/V;return`rgb(${e[1].map((a,o)=>Math.round(a+(H[1][o]-a)*r)).join()})`}function y8(t){return`
  <svg class="defs" width="0" height="0" aria-hidden="true">
    <defs>
      <!-- the glass: light at the top, a reflection band, a paler foot -->
      <linearGradient id="${t}-glass" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#ffffff"/>
        <stop offset=".30" stop-color="#f6f8fa"/>
        <stop offset=".345" stop-color="#dfe5ea"/>
        <stop offset=".40" stop-color="#fbfcfd"/>
        <stop offset=".78" stop-color="#eff2f5"/>
        <stop offset="1" stop-color="#e4e9ed"/>
      </linearGradient>
      <!-- the bright band that runs across the real plate -->
      <linearGradient id="${t}-sheen" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#fff" stop-opacity="0"/>
        <stop offset=".18" stop-color="#fff" stop-opacity=".95"/>
        <stop offset=".62" stop-color="#fff" stop-opacity=".75"/>
        <stop offset="1" stop-color="#fff" stop-opacity="0"/>
      </linearGradient>
      <filter id="${t}-wall" x="-30%" y="-40%" width="160%" height="200%">
        <feGaussianBlur stdDeviation="4"/>
      </filter>
      <filter id="${t}-glow" x="-45%" y="-70%" width="190%" height="260%">
        <feGaussianBlur stdDeviation="7"/>
      </filter>
    </defs>
  </svg>`}function b8(t){return`
  <svg class="panel" viewBox="0 0 264 124" role="img" aria-hidden="true">
    <!-- the radiated heat, leaving the face of the plate -->
    <g class="heat">
      <rect class="halo" x="16" y="14" width="232" height="96" rx="7" filter="url(#${t}-glow)"/>
      <g class="waves" filter="url(#${t}-glow)">
        <rect class="wave w0" x="16" y="14" width="232" height="96" rx="7" fill="none"/>
        <rect class="wave w1" x="16" y="14" width="232" height="96" rx="7" fill="none"/>
        <rect class="wave w2" x="16" y="14" width="232" height="96" rx="7" fill="none"/>
      </g>
    </g>

    <!-- the wall behind: the panel stands a few centimetres off it -->
    <rect class="wall" x="22" y="22" width="220" height="92" rx="6" filter="url(#${t}-wall)"/>

    <rect class="glass" x="16" y="14" width="232" height="96" rx="6" fill="url(#${t}-glass)"/>
    <rect class="sheen" x="21" y="40" width="222" height="7" rx="3.5" fill="url(#${t}-sheen)"/>
    <rect class="sheen-soft" x="21" y="47" width="222" height="15" rx="7.5" fill="url(#${t}-sheen)" opacity=".3"/>

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
  </svg>`}function w8(t,C,e=!0){if(!t)return;let H=C.on&&C.heating;t.classList.toggle("hot",!!H),t.classList.toggle("dead",!C.available),t.classList.toggle("measured",C.glow!==null);let V=C.glow!==null?C.glow:H?.5:0;t.style.setProperty("--ae-glow",V.toFixed(2)),t.style.setProperty("--ae-frame",NH(C.glow));let r=e&&C.target!==null?String(Math.round(C.target)):"",L=t.querySelector(".setpoint .value"),a=t.querySelector(".setpoint .unit");L.textContent!==r&&(L.textContent=r);let o=r?"\xB0C":"";a.textContent!==o&&(a.textContent=o);let M=t.querySelector(".surface"),n=C.panelTemp===null?"":`${Math.round(C.panelTemp)} \xB0C`;M.textContent!==n&&(M.textContent=n)}var k8=`
${R}

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
`;var N3={language:"auto",compact:!1,animate:!0,show_art:!0,show_readings:!0,show_modes:!0,show_presets:!0,show_setpoint:!0,show_extras:!0,show_openings:!0},O8=0,P3=class extends HTMLElement{static getConfigElement(){return document.createElement(x2)}static getStubConfig(C){let e=p5(C);return{type:`custom:${A1}`,device:e[0]?.id}}constructor(){super(),this.attachShadow({mode:"open"}),this._sections={},this._signatures={},this._built=!1,O8+=1,this._uid=`aeno${O8}`}setConfig(C){this._config={...N3,...C||{}},this._signatures={},this._hass&&this._render()}set hass(C){this._hass=C,this._render()}get hass(){return this._hass}getCardSize(){return this._config?.compact?4:5}getGridOptions(){return{columns:12,min_columns:6,rows:"auto"}}_build(){let C=document.createElement("style");C.textContent=k8;let e=document.createElement("ha-card"),H=document.createElement("div");H.className="wrap",H.addEventListener("click",V=>this._onClick(V)),H.insertAdjacentHTML("beforeend",y8(this._uid));for(let V of["top","hero","alerts","modes","buttons"]){let r=document.createElement("div");r.dataset.section=V,this._sections[V]=r,H.appendChild(r)}e.appendChild(H),this.shadowRoot.replaceChildren(C,e),this._wrap=H,this._built=!0}_render(){if(!this._hass||!this._config)return;this._built||this._build();let C=l5(s5(this._config,this._hass)),e=_8(this._hass,this._config);if(this._model=e,!e.ok){this._renderEmpty(e,C);return}this._emptyShown=!1,this._applyWrapClasses(e),this._section("top",this._topHtml(e,C)),this._heroSection(e,C),this._section("alerts",this._alertsHtml(e,C)),this._section("modes",this._config.show_modes?this._segHtml(e,C):""),this._section("buttons",this._buttonsHtml(e,C))}_renderEmpty(C,e){if(this._emptyShown!==C.reason){this._emptyShown=C.reason,this._signatures={},this._wrap.style.setProperty("--ap-accent","var(--ae-off)");for(let[H,V]of Object.entries(this._sections))V.innerHTML="",V.hidden=H!=="top";this._sections.top.innerHTML=`
      <div class="empty">
        ${s("radiator")}
        <div>${i(e(`ui.${C.reason}`))}</div>
      </div>`}}_section(C,e){this._signatures[C]!==e&&(this._signatures[C]=e,this._sections[C].innerHTML=e,this._sections[C].hidden=!e)}_applyWrapClasses(C){let e=["wrap"];this._config.compact&&e.push("compact"),this._config.animate||e.push("no-animation"),this._hass.themes?.darkMode&&e.push("dark");let H=e.join(" ");this._wrap.className!==H&&(this._wrap.className=H);let V=(q1.find(r=>r.key===(C.on?"heat":"off"))||q1[0]).colour;this._wrap.style.getPropertyValue("--ap-accent")!==V&&this._wrap.style.setProperty("--ap-accent",V)}_topHtml(C,e){let H=C.draughty?"":this._openBadge(C,e);return`
      <div class="top">
        <div>
          <div class="name" data-action="more-info">${i(C.name)}</div>
          <div class="sub">${i(e("ui.device"))}${H}</div>
        </div>
        <div class="spacer"></div>
        <div class="ind">${this._readingsHtml(C,e)}</div>
      </div>`}_readingsHtml(C,e){if(!this._config.show_readings)return"";let H=[],V=(L,a,o,M,n,l="")=>{a!=null&&H.push(`
        <span data-action="more-info" data-entity="${i(n||"")}">
          ${s(L)}<b>${this._decimal(a,o)} ${i(M)}</b>${l}
        </span>`)},r=C.external&&C.inside!==null?`<span class="raw">${i(e("ui.device_reads"))} ${this._decimal(C.inside,0)}</span>`:"";return V("indoor",C.measured,1,C.unit,C.entities.room||C.entityId,r),V("water_percent",C.humidity,0,"%",C.entities.humidity),V("temperature",C.panelTemp,0,C.unit,C.entities.panel),V("energy",C.power,0,C.powerUnit,C.entities.power),V("counter",C.energy,1,C.energyUnit,C.entities.energy),H.join("")}_openBadge(C,e){if(!this._config.show_openings)return"";let H=C.openings;if(H.none||!H.open)return"";let V=H.open>1?X1(e("ui.windows_open"),{count:H.open}):e(H.tilted?"ui.window_tilted":"ui.window_open");return` <span class="open-badge${C.draughty?"":" calm"}">${s("window_open")}${i(V)}</span>`}_heroSection(C,e){let H=this._config.show_art;this._sections.hero.querySelector(".hero")||(this._sections.hero.innerHTML=`
        <div class="hero">
          <div class="art" data-action="more-info">${b8(this._uid)}</div>
          <div class="status"></div>
          <div class="dial"></div>
        </div>`,this._heroNode=this._sections.hero.querySelector(".hero"),this._statusNode=this._sections.hero.querySelector(".status"),this._dialNode=this._sections.hero.querySelector(".dial")),this._heroNode.classList.toggle("no-art",!H);let V=this._sections.hero.querySelector(".art");V.hidden=!H,H&&w8(V.querySelector(".panel"),C,this._config.show_setpoint);let r=this._localise(Z8(C)),L=this._localise(S8(C)),a=`
      <div class="mode-name">${i(e(`mode_long.${C.on?"heat":"off"}`))}</div>
      <div class="state">${i(X1(e(r.key),r))}</div>
      <div class="state-sub">${i(L.key?X1(e(L.key),L):"")}</div>`;this._signatures.status!==a&&(this._signatures.status=a,this._statusNode.innerHTML=a);let o=this._dialHtml(C);this._signatures.dial!==o&&(this._signatures.dial=o,this._dialNode.innerHTML=o)}_dialHtml(C){let e=C.target,H=!C.available||e===null,V=`<button type="button" data-action="temp" data-dir="1"
      ${H||e>=C.maxTemp?"disabled":""} aria-label="+">${s("chevron_up")}</button>`,r=`<button type="button" data-action="temp" data-dir="-1"
      ${H||e<=C.minTemp?"disabled":""} aria-label="\u2212">${s("chevron")}</button>`;return`${`<div class="big">${e===null?"\u2013\u2013":this._decimal(e,1)}<small> ${i(C.unit)}</small></div>`}<div class="updown">${V}${r}</div>`}_alertsHtml(C,e){let H=[];if(this._config.show_openings&&C.draughty){let r=this._ago(C.openings.openFor,e),L=C.openings.longest?.tilted;H.push(["","window_open",X1(e(L?"alert.window_tilted":"alert.window_open"),{name:C.openings.longest?.name||e("ui.window"),duration:r})])}return C.continuous&&H.push(["","manual",e("alert.continuous")]),C.on&&C.timer.set&&C.timer.remaining!==null&&H.push(["info","timer",X1(e("alert.timer"),{remaining:this._ago(C.timer.remaining*60,e)})]),C.locked&&H.push(["info","lock",e("alert.locked")]),H.length?`<div class="alerts">${H.map(([r,L,a])=>`<div class="alert${r?` ${r}`:""}">${s(L)}<span>${i(a)}</span></div>`).join("")}</div>`:""}_ago(C,e){return Q(C,e("ui.minute_short"),e("ui.hour_short"))}_decimal(C,e=1){return Z(C,this._hass,e)}_localise(C){let e={...C};return typeof e.temp=="number"&&(e.temp=this._decimal(e.temp,1)),typeof e.diff=="number"&&(e.diff=this._decimal(e.diff,1)),e}_segHtml(C,e){let H=C.modes?.length?C.modes:q1.map(r=>r.key);return`<div class="seg">${q1.filter(r=>r.key==="off"||H.includes(r.key)).map(r=>{let L=C.available&&(r.key==="off"?!C.on:C.on);return`
        <button type="button" class="${r.key==="off"?"power":""}"
          data-action="mode" data-value="${r.key}" aria-pressed="${L}"
          ${C.available?"":"disabled"}>
          ${s(r.icon)}<span>${i(e(`mode.${r.key}`))}</span>
        </button>`}).join("")}</div>`}_buttonsHtml(C,e){let H=[];if(this._config.show_presets)for(let V of C.presets)H.push(`
          <button type="button" class="ghost" data-action="preset" data-value="${V.key}"
            aria-pressed="${V.on}" ${C.on?"":"disabled"}>
            ${s(V.icon)}${i(e(`preset.${V.key}`))}
          </button>`);if(this._config.show_extras&&(C.locked!==null&&H.push(`
          <button type="button" class="ghost" data-action="lock" aria-pressed="${C.locked}"
            ${C.available?"":"disabled"}>
            ${s(C.locked?"lock":"lock_open")}${i(e("ui.lock"))}
          </button>`),C.timer.set&&C.timer.entityId&&H.push(`
          <button type="button" class="ghost" data-action="timer-cancel"
            ${C.available?"":"disabled"}>
            ${s("timer")}${i(e("ui.timer_cancel"))}
          </button>`),C.limit)){let{value:V,min:r,max:L,unit:a}=C.limit;H.push(`
          <span class="limit">
            ${i(e("ui.limit"))} <b>${b(V,0)} ${i(a)}</b>
            <button type="button" data-action="limit" data-dir="-1"
              ${!C.available||V<=r?"disabled":""} aria-label="\u2212">${s("chevron")}</button>
            <button type="button" data-action="limit" data-dir="1"
              ${!C.available||V>=L?"disabled":""} aria-label="+">${s("chevron_up")}</button>
          </span>`)}return H.length?`<div class="btnrow">${H.join("")}</div>`:""}_onClick(C){let e=C.target.closest("[data-action]");if(!e||e.hasAttribute("disabled"))return;let{action:H,entity:V,value:r,dir:L}=e.dataset,a=this._model;if(!(!a?.ok&&H!=="more-info"))switch(H){case"more-info":this._moreInfo(V||a?.entityId);break;case"mode":this._haptic(r==="off"?"medium":"light"),this._climate("set_hvac_mode",{entity_id:a.entityId,hvac_mode:r});break;case"preset":this._haptic("light"),e.getAttribute("aria-pressed")!=="true"&&this._climate("set_preset_mode",{entity_id:a.entityId,preset_mode:r});break;case"timer-cancel":this._haptic("medium"),this._hass.callService("select","select_option",{entity_id:a.timer.entityId,option:"cancel"});break;case"lock":this._haptic("medium"),this._hass.callService("lock",a.locked?"unlock":"lock",{entity_id:a.entities.lock});break;case"temp":this._stepTemperature(Number(L));break;case"limit":this._stepLimit(Number(L));break;default:break}}_stepTemperature(C){let e=this._model;if(!e||e.target===null)return;let H=e.targetStep||1,V=Math.min(e.maxTemp,Math.max(e.minTemp,Math.round((e.target+C*H)*10)/10));V!==e.target&&(this._haptic("light"),this._climate("set_temperature",{entity_id:e.entityId,temperature:V}))}_stepLimit(C){let e=this._model?.limit;if(!e||!Number.isFinite(e.value))return;let H=Math.min(e.max,Math.max(e.min,e.value+C*(e.step||5)));H!==e.value&&(this._haptic("light"),this._hass.callService("number","set_value",{entity_id:e.entityId,value:H}))}_climate(C,e){return e.entity_id?this._hass.callService("climate",C,e):Promise.resolve()}_moreInfo(C){C&&this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:C},bubbles:!0,composed:!0}))}_haptic(C){this.dispatchEvent(new CustomEvent("haptic",{detail:C,bubbles:!0,composed:!0}))}};function E8(){customElements.get(A1)||(customElements.define(A1,P3),window.customCards=window.customCards||[],window.customCards.push({type:A1,name:"AENO Heater Card",description:"Card for AENO infrared panel heaters behind tuya-local: the panel drawn with the setpoint etched on it, radiated heat scaled to the measured surface temperature, heating mode, child lock, element limit and window contacts.",preview:!0,documentationURL:"https://github.com/gabor-io/ha-appliance-custom-card"}),console.info(`%c ${A1} %c ${a8} `,"color:#fff;background:#ef6c00;font-weight:700;border-radius:3px 0 0 3px","color:#ef6c00;background:#fff3e0;font-weight:700;border-radius:0 3px 3px 0"))}var FH=N({cardName:A1,toggles:["show_art","show_readings","show_modes","show_presets","show_setpoint","show_extras","show_openings","compact","animate"],defaults:N3,listDevices:p5,getLanguage:s5,translator:l5,languages:R3});function T8(){customElements.get(x2)||customElements.define(x2,FH)}T8();E8();var c1="nanoleaf-shapes-card",h2="nanoleaf-shapes-card-editor",$8="1.24.1",A5="nanoleaf",R8=[{key:"single_tap",icon:"gesture_tap"},{key:"double_tap",icon:"gesture_tap"},{key:"swipe_up",icon:"chevron_up"},{key:"swipe_down",icon:"chevron"},{key:"swipe_left",icon:"chevron"},{key:"swipe_right",icon:"chevron"}],B8=[1200,2700,4e3,5e3,6500],F3={beatdrop:["#ff2d95","#7b2ff7","#00e5ff"],blaze:["#7a0d00","#ff4d00","#ffb300"],"cocoa beach":["#ffd9a0","#ff8a5c","#19c6c6"],"cotton candy":["#ffc2e2","#c9b6ff","#a6e8ff"],"date night":["#4a0032","#c2185b","#ff5c8a"],"hip hop":["#ff6f00","#ff1f6b","#8e24aa"],"hot sauce":["#8b0000","#ff2a00","#ff7a00"],jungle:["#063d1e","#2e9e3e","#b5e61d"],lightscape:["#ffb3c7","#b8c6ff","#9ef0d9"],"morning sky":["#1b3a6b","#7aa8e0","#ffc7a8"],"northern lights":["#06243d","#1de9b6","#7c4dff"],"pop rocks":["#ff1744","#ffea00","#00e5ff"],prism:["#ff0000","#ffd400","#00c853","#00b0ff","#aa00ff"],starlight:["#0b1736","#cfe3ff","#ffffff"],sundown:["#ff8f00","#ff4081","#6a1b9a"],waterfall:["#003f73","#00a3e0","#b3ecff"]},P8=["#8a9199","#c3c9cf","#8a9199"],f2={flower7:[[0,0],[1,0],[0,1],[-1,1],[-1,0],[0,-1],[1,-1]],zigzag9:[[0,0],[1,-1],[2,-1],[3,-2],[4,-2],[5,-3],[6,-3],[7,-4],[8,-4]],row5:[[0,0],[1,0],[2,0],[3,0],[4,0]]},D3=f2.flower7,N8=2.4;var DH={card_name:"Nanoleaf",mode:{off:"Kikapcsolva",effect:"Jelenet",white:"Feh\xE9r",colour:"Sz\xEDn"},power:{off:"Ki",on:"Be"},state:{unavailable:"A panelek nem v\xE1laszolnak",off:"Kikapcsolva",effect:"{effect}",white:"{kelvin} K feh\xE9r",colour:"Fix sz\xEDn"},sub:{unavailable:"Nincs v\xE1lasz \u2013 \xE1ram vagy h\xE1l\xF3zat",off:"A panelek s\xF6t\xE9tek",brightness:"F\xE9nyer\u0151 {percent}%"},ui:{device:"Nanoleaf Shapes",brightness:"F\xE9nyer\u0151",effects:"Jelenetek",white:"Feh\xE9r",colour:"Sz\xEDn",identify:"Felvillant\xE1s",touch:"\xC9rint\xE9s",touch_never:"m\xE9g nem volt",open_colour:"Sz\xEDnv\xE1laszt\xF3",no_entity:"Nem tal\xE1ltam Nanoleaf panelt ebben a Home Assistantban.",many_entities:"T\xF6bb Nanoleaf is van \u2013 v\xE1laszd ki, melyikr\u0151l sz\xF3ljon a k\xE1rtya.",missing_entity:"A megadott entit\xE1s nem l\xE9tezik.",minute_short:"perc",hour_short:"\xF3",unknown_effect:"ismeretlen jelenet"},gesture:{single_tap:"Koppint\xE1s",double_tap:"Dupla koppint\xE1s",swipe_up:"Felfel\xE9 h\xFAz\xE1s",swipe_down:"Lefel\xE9 h\xFAz\xE1s",swipe_left:"Balra h\xFAz\xE1s",swipe_right:"Jobbra h\xFAz\xE1s"},editor:{device:"Eszk\xF6z",device_auto:"Automatikus",name:"N\xE9v",language:"Nyelv",language_auto:"Automatikus",layout:"Elrendez\xE9s",custom:"Egyedi (YAML-ben)",sections:"Mit mutasson",show_art:"Panelrajz",show_brightness:"F\xE9nyer\u0151",show_effects:"Jelenetek",show_white:"Feh\xE9r fokozatok",show_touch:"\xC9rint\xE9s",show_identify:"Felvillant\xE1s",compact:"Kompakt",animate:"Anim\xE1ci\xF3k"}},zH={card_name:"Nanoleaf",mode:{off:"Off",effect:"Scene",white:"White",colour:"Colour"},power:{off:"Off",on:"On"},state:{unavailable:"The panels are not responding",off:"Off",effect:"{effect}",white:"{kelvin} K white",colour:"Solid colour"},sub:{unavailable:"No answer - power or network",off:"The panels are dark",brightness:"Brightness {percent}%"},ui:{device:"Nanoleaf Shapes",brightness:"Brightness",effects:"Scenes",white:"White",colour:"Colour",identify:"Identify",touch:"Touch",touch_never:"nothing yet",open_colour:"Colour picker",no_entity:"No Nanoleaf found in this Home Assistant.",many_entities:"There is more than one Nanoleaf - pick the one this card is about.",missing_entity:"The configured entity does not exist.",minute_short:"min",hour_short:"h",unknown_effect:"unknown scene"},gesture:{single_tap:"Tap",double_tap:"Double tap",swipe_up:"Swipe up",swipe_down:"Swipe down",swipe_left:"Swipe left",swipe_right:"Swipe right"},editor:{device:"Device",device_auto:"Automatic",name:"Name",language:"Language",language_auto:"Automatic",layout:"Layout",custom:"Custom (in YAML)",sections:"Sections",show_art:"Panel drawing",show_brightness:"Brightness",show_effects:"Scenes",show_white:"White presets",show_touch:"Touch",show_identify:"Identify",compact:"Compact",animate:"Animations"}},F8={hu:DH,en:zH},z3=Object.keys(F8);function m5(t,C){return T(t,C,z3)}function c5(t){return $(F8,t)}function I3(t,C={}){return Object.entries(C).reduce((e,[H,V])=>e.replace(`{${H}}`,String(V)),t)}function u5(t){return Object.values(t?.entities||{})}function D8(t){return u5(t).filter(C=>C.platform===A5&&C.entity_id.startsWith("light.")).map(C=>C.entity_id)}function v5(t){let C=new Map;for(let e of u5(t)){if(e.platform!==A5||!e.device_id||!e.entity_id.startsWith("light."))continue;let H=t.devices?.[e.device_id];H&&C.set(e.device_id,H.name_by_user||H.name||e.device_id)}return[...C.entries()].map(([e,H])=>({id:e,name:H}))}function z8(t,C){let e=C?.device?u5(t).find(V=>V.device_id===C.device&&V.entity_id.startsWith("light."))?.entity_id:null;if(C?.entity&&(!e||t?.entities?.[C.entity]?.device_id===C.device))return C.entity;if(e)return e;let H=D8(t);return H.length===1?H[0]:null}function I8(t){return D8(t).length>1}function W8(t,C){let e=t?.entities?.[C]?.device_id;if(!e)return{};let H=u5(t).filter(r=>r.device_id===e&&r.platform===A5),V=r=>H.find(L=>L.entity_id.startsWith(`${r}.`))?.entity_id;return{identify:V("button"),touch:V("event")}}function W3(t){return t?F3[String(t).trim().toLowerCase()]||P8:null}function U3(t){return!!t&&String(t).trim().toLowerCase()in F3}function U8(t,C){let e=t?.states?.[C]?.attributes?.friendly_name;if(e)return e;let H=t?.entities?.[C]?.device_id,V=H?t.devices?.[H]:null;return V?.name_by_user||V?.name||""}function IH(t,C,e){let H=t?.entities?.[C]?.device_id,V=H?t.devices?.[H]:null,r=(e||"").toLowerCase();return[V?.model_id,V?.model].filter(Boolean).find(a=>!r.includes(String(a).toLowerCase()))||null}function WH(t,C){return t==null||C===null||C===void 0?null:{hue:t,saturation:C,css:`hsl(${t} ${C}% 50%)`}}function G3(t){if(t==null)return null;let C=[[1200,[255,147,41]],[2700,[255,197,143]],[4e3,[255,228,206]],[5e3,[255,244,237]],[6500,[227,238,255]]],e=Math.max(C[0][0],Math.min(C[C.length-1][0],t)),H=C[0],V=C[C.length-1];for(let o=0;o<C.length-1;o+=1)if(e>=C[o][0]&&e<=C[o+1][0]){H=C[o],V=C[o+1];break}let r=V[0]-H[0],L=r===0?0:(e-H[0])/r;return`rgb(${H[1].map((o,M)=>Math.round(o+(V[1][M]-o)*L)).join()})`}function UH(t,C){let e=C?t?.states?.[C]:null;if(!e||x(e))return null;let H=e.attributes?.event_type||null,V=Date.parse(e.state);return!H||Number.isNaN(V)?null:{entityId:C,type:H,icon:R8.find(r=>r.key===H)?.icon||"gesture_tap",secondsAgo:Math.max(0,Math.round((Date.now()-V)/1e3))}}function G8(t,C){let e=z8(t,C);if(!e)return{ok:!1,reason:I8(t)?"many_entities":"no_entity"};let H=t?.states?.[e];if(!H)return{ok:!1,reason:"missing_entity"};let V=W8(t,e),r=H.attributes||{},L=!x(H),a=L&&H.state==="on",o=a&&r.effect||null,M=Array.isArray(r.effect_list)?r.effect_list:[],n=r.brightness??null,l=r.color_temp_kelvin??null,d=a&&!o&&r.color_mode==="color_temp",p=a&&!o&&!d?WH(r.hs_color?.[0],r.hs_color?.[1]):null;return{ok:!0,entityId:e,entities:{light:e,...V},name:C?.name||U8(t,e)||e,model:C?.subtitle!==void 0?C.subtitle||null:IH(t,e,C?.name||U8(t,e)),available:L,on:a,mode:a?o?"effect":d?"white":"colour":"off",effect:o,effects:M,palette:W3(o),knownEffect:U3(o),brightness:n,brightnessPct:n===null?null:Math.round(n/255*100),kelvin:l,kelvinMin:r.min_color_temp_kelvin??1200,kelvinMax:r.max_color_temp_kelvin??6500,kelvinCss:G3(l),hs:p,gesture:UH(t,V.touch),touchable:!!V.touch}}function j8(t){return t.available?t.on?t.mode==="effect"?{key:"state.effect",effect:t.effect}:t.mode==="white"?{key:"state.white",kelvin:t.kelvin}:{key:"state.colour"}:{key:"state.off"}:{key:"state.unavailable"}}function K8(t){return t.available?t.on?t.brightnessPct===null?{key:""}:{key:"sub.brightness",percent:t.brightnessPct}:{key:"sub.off"}:{key:"sub.unavailable"}}function GH([t,C]){return{x:10*1.5*t,y:10*Math.sqrt(3)*(C+t/2)}}function jH(t,C){return Array.from({length:6},(e,H)=>{let V=Math.PI/180*(60*H);return`${(t+10*Math.cos(V)).toFixed(2)},${(C+10*Math.sin(V)).toFixed(2)}`}).join(" ")}function j3(t){let C=t.map((d,p)=>{let{x:c,y:h}=GH(d);return{index:p,x:c,y:h,points:jH(c,h)}});if(!C.length)return{panels:C,viewBox:"0 0 1 1",width:1,height:1};let e=10*.8,H=10*.4,V=10*1.87,r=C.map(d=>d.x),L=C.map(d=>d.y),a=Math.min(...r)-10-e,o=Math.max(...r)+10+e,M=Math.min(...L)-10*.87-H,n=Math.max(...L.map(d=>d+10*.87),C[0].y+V)+H,l=Math.max(1,o-a+(n-M));for(let d of C)d.phase=(d.x-a+(d.y-M))/l;return{panels:C,viewBox:`${a.toFixed(2)} ${M.toFixed(2)} ${(o-a).toFixed(2)} ${(n-M).toFixed(2)}`,width:o-a,height:n-M}}function Q8(t){return`
  <svg class="defs" width="0" height="0" aria-hidden="true">
    <defs>
      <filter id="${t}-bloom" x="-60%" y="-60%" width="220%" height="220%">
        <feGaussianBlur stdDeviation="6"/>
      </filter>
      <!-- The diffuser is a shallow dome, not a flat pane: on the wall each
           panel is brightest in the middle and falls off into its frame. A
           top-to-bottom wash makes them look like printed tiles instead. -->
      <radialGradient id="${t}-face" cx=".5" cy=".42" r=".62">
        <stop offset="0" stop-color="#fff" stop-opacity=".30"/>
        <stop offset=".45" stop-color="#fff" stop-opacity=".10"/>
        <stop offset=".78" stop-color="#000" stop-opacity=".06"/>
        <stop offset="1" stop-color="#000" stop-opacity=".26"/>
      </radialGradient>
    </defs>
  </svg>`}function Y8(t,C){let{panels:e,viewBox:H}=j3(C),V=e.map(M=>`<polygon class="glow" points="${M.points}" style="--phase:${M.phase.toFixed(3)}"/>`).join(""),r=e.map(M=>`<g class="panel" style="--phase:${M.phase.toFixed(3)}">
        <polygon class="lit" points="${M.points}"/>
        <polygon class="sheen" points="${M.points}" fill="url(#${t}-face)"/>
        <polygon class="frame" points="${M.points}"/>
      </g>`).join(""),L=e[0],a=L?L.x-10*.5:0,o=L?`<g class="lead">
        <path d="M${a.toFixed(2)} ${(L.y+10*.87).toFixed(2)}
                 c0 ${(10*.5).toFixed(2)} ${(-10*.35).toFixed(2)} ${(10*.5).toFixed(2)}
                 ${(-10*.35).toFixed(2)} ${10 .toFixed(2)}"/>
      </g>`:"";return`
  <svg class="panels" viewBox="${H}" role="img" aria-hidden="true">
    <g class="bloom" filter="url(#${t}-bloom)">${V}</g>
    ${r}
    ${o}
  </svg>`}function q8(t,C){if(!t)return;t.classList.toggle("on",!!C.on),t.classList.toggle("dead",!C.available),t.classList.toggle("scene",C.mode==="effect");let e=C.mode==="effect"?C.palette:[C.mode==="white"?C.kelvinCss:C.hs?.css].filter(Boolean),H=e&&e.length?e:["#2b2f33"];for(let r=0;r<5;r+=1)t.style.setProperty(`--nl-c${r}`,H[r%H.length]);let V=C.on&&C.brightness!==null?C.brightness/255:0;t.style.setProperty("--nl-level",C.on?Math.max(.25,V).toFixed(2):"0")}var X8=`
${R}

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

/* The seam is the frames of two neighbouring panels meeting, and on the wall
   it is a thin dark line, not a bar: about a fifteenth of a panel's width.
   The stroke straddles the shared edge, so this is the whole visible band. */
.panels .frame { fill: none; stroke: var(--nl-frame); stroke-width: 1.3; }
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
`;var Q3={language:"auto",compact:!1,animate:!0,show_art:!0,show_brightness:!0,show_effects:!0,show_white:!0,show_touch:!0,show_identify:!0},J8=0,K3=class extends HTMLElement{static getConfigElement(){return document.createElement(h2)}static getStubConfig(C){let e=v5(C);return{type:`custom:${c1}`,device:e[0]?.id}}constructor(){super(),this.attachShadow({mode:"open"}),this._sections={},this._signatures={},this._built=!1,J8+=1,this._uid=`nl${J8}`}setConfig(C){this._config={...Q3,...C||{}},this._signatures={},this._layoutKey=null,this._hass&&this._render()}set hass(C){this._hass=C,this._render()}get hass(){return this._hass}getCardSize(){return this._config?.compact?4:6}getGridOptions(){return{columns:12,min_columns:6,rows:"auto"}}get _layout(){let C=this._config?.layout;return typeof C=="string"?f2[C]||D3:!Array.isArray(C)||!C.length?D3:C.map(e=>Array.isArray(e)?[Number(e[0]),Number(e[1])]:null).filter(e=>e&&Number.isFinite(e[0])&&Number.isFinite(e[1]))}_build(){let C=document.createElement("style");C.textContent=X8;let e=document.createElement("ha-card"),H=document.createElement("div");H.className="wrap",H.addEventListener("click",V=>this._onClick(V)),H.addEventListener("input",V=>this._onInput(V)),H.insertAdjacentHTML("beforeend",Q8(this._uid));for(let V of["top","hero","bright","scenes","whites","buttons"]){let r=document.createElement("div");r.dataset.section=V,this._sections[V]=r,H.appendChild(r)}e.appendChild(H),this.shadowRoot.replaceChildren(C,e),this._wrap=H,this._built=!0}_render(){if(!this._hass||!this._config)return;this._built||this._build();let C=c5(m5(this._config,this._hass)),e=G8(this._hass,this._config);if(this._model=e,!e.ok){this._renderEmpty(e,C);return}this._emptyShown=!1,this._applyWrapClasses(e),this._section("top",this._topHtml(e,C)),this._heroSection(e,C),this._section("bright",this._config.show_brightness?this._brightHtml(e,C):""),this._section("scenes",this._config.show_effects?this._scenesHtml(e,C):""),this._section("whites",this._config.show_white?this._whitesHtml(e,C):""),this._section("buttons",this._buttonsHtml(e,C))}_renderEmpty(C,e){if(this._emptyShown!==C.reason){this._emptyShown=C.reason,this._signatures={},this._wrap.style.setProperty("--ap-accent","var(--state-icon-color, #8a9199)");for(let[H,V]of Object.entries(this._sections))V.innerHTML="",V.hidden=H!=="top";this._sections.top.innerHTML=`
      <div class="empty">
        ${s("bulb")}
        <div>${i(e(`ui.${C.reason}`))}</div>
      </div>`}}_section(C,e){this._signatures[C]!==e&&(this._signatures[C]=e,this._sections[C].innerHTML=e,this._sections[C].hidden=!e)}_applyWrapClasses(C){let e=["wrap"];this._config.compact&&e.push("compact"),this._config.animate||e.push("no-animation"),this._hass.themes?.darkMode&&e.push("dark");let H=e.join(" ");this._wrap.className!==H&&(this._wrap.className=H);let V=C.on?C.mode==="effect"?C.palette[Math.floor(C.palette.length/2)]:C.mode==="white"?C.kelvinCss:C.hs?.css||"var(--primary-color, #03a9f4)":"var(--state-icon-color, #8a9199)";this._wrap.style.getPropertyValue("--ap-accent")!==V&&this._wrap.style.setProperty("--ap-accent",V)}_topHtml(C,e){let H=[];return C.available?(C.brightnessPct!==null&&C.on&&H.push(`<span>${s("brightness")}<b>${C.brightnessPct}%</b></span>`),this._config.show_touch&&C.gesture&&H.push(`<span>${s("touch")}<b>${i(e(`gesture.${C.gesture.type}`,C.gesture.type))}</b></span>`),this._headerHtml(C,H.join(""))):this._headerHtml(C,"")}_headerHtml(C,e){return`
      <div class="top">
        <div>
          <div class="name" data-action="more-info">${i(C.name)}</div>
          ${C.model?`<div class="sub">${i(C.model)}</div>`:""}
        </div>
        <div class="spacer"></div>
        <div class="ind">${e}</div>
      </div>`}_heroSection(C,e){let H=JSON.stringify(this._layout);H!==this._layoutKey&&(this._layoutKey=H,this._sections.hero.innerHTML=`
        <div class="hero">
          <div class="art" data-action="toggle">${Y8(this._uid,this._layout)}</div>
          <div class="status"></div>
        </div>`,this._heroNode=this._sections.hero.querySelector(".hero"),this._statusNode=this._sections.hero.querySelector(".status"),this._signatures.status=null);let V=this._config.show_art,{width:r,height:L}=j3(this._layout);this._heroNode.classList.toggle("wide",V&&r/L>=N8),this._heroNode.classList.toggle("no-art",!V);let a=this._sections.hero.querySelector(".art");a.hidden=!V,V&&q8(a.querySelector(".panels"),C);let o=j8(C),M=K8(C),n=`
      <div class="mode-name">${i(e(`mode.${C.mode}`))}</div>
      <div class="state">${i(I3(e(o.key),o))}</div>
      <div class="state-sub">${i(M.key?I3(e(M.key),M):"")}</div>
      ${this._seg(C,e)}`;this._signatures.status!==n&&(this._signatures.status=n,this._statusNode.innerHTML=n)}_seg(C,e){let H=(V,r,L,a)=>`
      <button type="button" data-action="power" data-value="${V}" aria-pressed="${a}"
        ${C.available?"":"disabled"}>${s(r)}<span>${i(L)}</span></button>`;return`<div class="seg">
      ${H("off","power",e("power.off"),C.available&&!C.on)}
      ${H("on","bulb",e("power.on"),C.on)}
    </div>`}_brightHtml(C,e){let H=C.brightnessPct??0;return`
      <div class="bright">
        ${s("brightness")}
        <input type="range" min="1" max="100" step="1" value="${H}"
          data-action="brightness" aria-label="${i(e("ui.brightness"))}"
          ${C.on?"":"disabled"}>
        <span class="val">${C.on?`${H}%`:"\u2013"}</span>
      </div>`}_scenesHtml(C,e){if(!C.effects.length)return"";let H=C.effects.map(V=>{let r=W3(V),L=U3(V),a=`linear-gradient(135deg, ${r.join(", ")})`;return`
        <button type="button" class="scene-chip${L?"":" unknown"}"
          data-action="effect" data-value="${i(V)}"
          aria-pressed="${C.effect===V}" ${C.available?"":"disabled"}
          ${L?"":`title="${i(e("ui.unknown_effect"))}"`}>
          <span class="swatch" style="background:${a}"></span>${i(V)}
        </button>`}).join("");return`<div class="section">
      <div class="section-title">${i(e("ui.effects"))}</div>
      <div class="scenes">${H}</div>
    </div>`}_whitesHtml(C,e){let H=B8.filter(r=>r>=C.kelvinMin&&r<=C.kelvinMax);if(!H.length)return"";let V=H.map(r=>`
        <button type="button" class="white-chip" data-action="kelvin" data-value="${r}"
          style="background:${G3(r)}"
          aria-pressed="${C.mode==="white"&&C.kelvin===r}"
          ${C.available?"":"disabled"}
          aria-label="${r} K" title="${r} K"></button>`).join("");return`<div class="whites"><span class="cap">${i(e("ui.white"))}</span>${V}</div>`}_buttonsHtml(C,e){let H=[];if(H.push(`
      <button type="button" class="ghost" data-action="more-info" data-entity="${i(C.entityId)}">
        ${s("palette")}${i(e("ui.open_colour"))}
      </button>`),this._config.show_identify&&C.entities.identify&&H.push(`
        <button type="button" class="ghost" data-action="identify" ${C.available?"":"disabled"}>
          ${s("sparkle")}${i(e("ui.identify"))}
        </button>`),this._config.show_touch&&C.touchable){let V=C.gesture?`<b>${i(e(`gesture.${C.gesture.type}`,C.gesture.type))}</b> \xB7 ${i(Q(C.gesture.secondsAgo,e("ui.minute_short"),e("ui.hour_short")))}`:i(e("ui.touch_never"));H.push(`
        <span class="touch" data-action="more-info" data-entity="${i(C.entities.touch||"")}">
          ${s("touch")}${V}
        </span>`)}return`<div class="btnrow">${H.join("")}</div>`}_onInput(C){let e=C.target.closest('[data-action="brightness"]');if(!e||e.hasAttribute("disabled"))return;let H=Number(e.value),V=e.parentElement.querySelector(".val");V&&(V.textContent=`${H}%`),clearTimeout(this._brightTimer),this._brightTimer=setTimeout(()=>{this._haptic("light"),this._call("turn_on",{brightness:Math.round(H/100*255)})},220)}_onClick(C){let e=C.target.closest("[data-action]");if(!e||e.hasAttribute("disabled"))return;let{action:H,entity:V,value:r}=e.dataset,L=this._model;if(!(!L?.ok&&H!=="more-info"))switch(H){case"more-info":this._moreInfo(V||L?.entityId);break;case"toggle":case"power":{let a=H==="toggle"?!L.on:r==="on";this._haptic(a?"light":"medium"),this._call(a?"turn_on":"turn_off",{});break}case"effect":this._haptic("light"),this._call("turn_on",{effect:r});break;case"kelvin":this._haptic("light"),this._call("turn_on",{color_temp_kelvin:Number(r)});break;case"identify":this._haptic("medium"),this._hass.callService("button","press",{entity_id:L.entities.identify});break;default:break}}_call(C,e){let H=this._model;return H?.entityId?this._hass.callService("light",C,{entity_id:H.entityId,...e}):Promise.resolve()}_moreInfo(C){C&&this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:C},bubbles:!0,composed:!0}))}_haptic(C){this.dispatchEvent(new CustomEvent("haptic",{detail:C,bubbles:!0,composed:!0}))}};function CC(){customElements.get(c1)||(customElements.define(c1,K3),window.customCards=window.customCards||[],window.customCards.push({type:c1,name:"Nanoleaf Shapes Card",description:"Card for Nanoleaf Shapes: the panels drawn in their own arrangement and lit by what is running on them, scenes as colour swatches, brightness, white presets and the last touch gesture.",preview:!0,documentationURL:"https://github.com/gabor-io/ha-appliance-custom-card"}),console.info(`%c ${c1} %c ${$8} `,"color:#fff;background:#7c4dff;font-weight:700;border-radius:3px 0 0 3px","color:#7c4dff;background:#ede7f6;font-weight:700;border-radius:0 3px 3px 0"))}var KH=Object.keys(f2).map(t=>({value:t,label:{zigzag9:"Cikcakk \xB7 9",flower7:"Vir\xE1g \xB7 7",row5:"Egy sor \xB7 5"}[t]||t})),QH=N({cardName:c1,selects:[{key:"layout",options:KH}],toggles:["show_art","show_brightness","show_effects","show_white","show_touch","show_identify","compact","animate"],defaults:Q3,listDevices:v5,getLanguage:m5,translator:c5,languages:z3});function eC(){customElements.get(h2)||customElements.define(h2,QH)}eC();CC();var u1="house-heating-card",x5="house-heating-card-editor",v1="heating-rooms-card",h5="heating-rooms-card-editor",x1="heating-schedule-card",f5="heating-schedule-card-editor",C2="1.24.1",HC={meter:"sensor.gazora_allas",manual:"input_number.gazora_kezi_allas",manual_time:"input_datetime.gazora_kezi_idopont",stale:"binary_sensor.gazadat_elavult",budget:"sensor.gazkeret_m3",used:"sensor.gazkeret_felhasznalt",left:"sensor.gazkeret_maradek",allowed:"sensor.gazkeret_megengedett_eddig",reserve:"input_number.gazkeret_tartalek",days_left:"sensor.gazkeret_hatralevo_nap",pace:"sensor.gaz_napi_utem",heating_daily:"sensor.gaz_futesi_keret_napi",hot_water_daily:"input_number.gaz_melegviz_napi",forecast:"sensor.gaz_elorejelzes_csak_gaz",balance:"sensor.gaz_elorejelzes_egyenleg",mode:"input_select.futes_mod",season_select:"input_select.klima_evszak",season_active:"sensor.klima_evszak_aktiv",source:"sensor.futes_forras",reason:"sensor.futes_forras_indoklas",boiler:"input_boolean.kazan_uzemkesz",automation:"input_boolean.futes_automatika",erv_lock:"input_boolean.szellozteto_gaz_retesz",schedule:"schedule.futes_komfort",zone_select:"input_select.futes_zona",outside:null,outdoor_3day:null},VC={temperature:["sensor","homerseklet"],target:["sensor","cel"],override:["input_number","felulir"],override_until:["input_datetime","felulir_vege"],source:["input_select","forras"],active:["sensor","aktiv"],window:["sensor","ablak"],paused:["binary_sensor","szunetel"],preheat:["sensor",null],frost:["binary_sensor","fagyveszely"],target_number:["input_number","cel"],mode:["input_select","uzemmod"],lagging:["binary_sensor","elmarad"],suggestion:["sensor","forras_javaslat"],suggestion_reason:["sensor","forras_indoklas"],leading:["sensor","mertado"],aggregation:["input_select","aggregalas"],overshoot:["binary_sensor","tulloves_korlat"]},tC=[{key:"auto",icon:"auto"},{key:"csak_gaz",icon:"heat"},{key:"csak_klima",icon:"ac"},{key:"tavol",icon:"away"},{key:"ki",icon:"power"}],rC=[{key:"auto",icon:"auto"},{key:"futes",icon:"heat"},{key:"hutes",icon:"snowflake"}];var LC={gaz:{icon:"heat",accent:"gas"},hibrid:{icon:"manual",accent:"hybrid"},klima:{icon:"ac",accent:"ac"},hutes:{icon:"snowflake",accent:"cool"},fagyvedelem:{icon:"frost_guard",accent:"frost"},ki:{icon:"power",accent:"idle"}},iC={radiator:{icon:"radiator",accent:"gas"},klima_futes:{icon:"ac",accent:"ac"},klima_hutes:{icon:"snowflake",accent:"cool"},aeno:{icon:"reheat",accent:"gas"},nincs:{icon:"power",accent:"idle"}},aC={gaz:{icon:"heat",accent:"gas"},klima:{icon:"ac",accent:"ac"},hutes:{icon:"snowflake",accent:"cool"},aeno:{icon:"reheat",accent:"gas"},szunetel:{icon:"window_open",accent:"idle"},ki:{icon:"power",accent:"idle"}},oC={zarva:{icon:"window_closed",warn:!1},buko:{icon:"window_open",warn:!0},nyitva:{icon:"window_open",warn:!0}},MC={hideg:"cold",huvos:"cold",h\u0171v\u00F6s:"cold",kellemes:"good",meleg:"warm","tul meleg":"hot","t\xFAl meleg":"hot"},g5=["klima","gaz","hutes","aeno"],Y3=.5,q3=1.5,X3={default:{start:-.05,stop:.15,hardStop:null},aeno:{start:-.1,stop:.1,hardStop:.3}},j=["komfort","ejszaka"],g2=[{key:"komfort",icon:"heat",colour:"#f5b301"},{key:"ejszaka",icon:"night",colour:"#3f6fd8"},{key:"eco",icon:"leaf",colour:"#3d9970"},{key:"tavol",icon:"away",colour:"#9aa0a6"},{key:"fagyvedelem",icon:"frost_guard",colour:"#7fc6e8"}],lo=g2.map(t=>t.key),B1=["mon","tue","wed","thu","fri","sat","sun"],h1=.5,f1=5,g1=30,Z5={month:5,day:1},S5={month:9,day:30},nC=24,sC=30;var YH={house_card_name:"F\u0171t\xE9s \xE9s g\xE1zkeret",rooms_card_name:"Szob\xE1k",schedule_card_name:"F\u0171t\xE9si \xFCtemterv",mode:{auto:"Automata",csak_gaz:"Csak g\xE1z",csak_klima:"Csak kl\xEDma",tavol:"T\xE1vol",ki:"Ki"},season:{auto:"Automata",futes:"F\u0171t\xE9s",hutes:"H\u0171t\xE9s",atmeneti:"\xC1tmeneti"},source:{auto:"Automata",gaz:"G\xE1z",hibrid:"Hibrid",klima:"Kl\xEDma",hutes:"H\u0171t\xE9s",aeno:"Infrapanel",fagyvedelem:"Fagyv\xE9delem",ki:"Ki",unknown:"Ismeretlen"},hvac:{heat:"F\u0171t\xE9s",cool:"H\u0171t\xE9s",off:"Ki",auto:"Automata",heat_cool:"F\u0171t\xE9s/h\u0171t\xE9s"},suggestion:{gaz:"G\xE1z f\u0171t",klima:"Kl\xEDma f\u0171t",hutes:"Kl\xEDma h\u0171t",aeno:"Infrapanel",szunetel:"Sz\xFCnetel",ki:"Nem f\u0171t"},active:{radiator:"Radi\xE1tor",klima_futes:"Kl\xEDma f\u0171t",klima_hutes:"Kl\xEDma h\u0171t",aeno:"Infrapanel",nincs:"Nem f\u0171t"},window:{zarva:"Z\xE1rva",buko:"Buk\xF3ban",nyitva:"Nyitva"},zone:{komfort:"Komfort",ejszaka:"\xC9jszaka",eco:"Eco",tavol:"T\xE1vol",fagyvedelem:"Fagyv\xE9delem"},day:{mon:"H",tue:"K",wed:"Sze",thu:"Cs",fri:"P",sat:"Szo",sun:"V"},day_long:{mon:"h\xE9tf\u0151",tue:"kedd",wed:"szerda",thu:"cs\xFCt\xF6rt\xF6k",fri:"p\xE9ntek",sat:"szombat",sun:"vas\xE1rnap"},aggregation:{auto:"Automata",atlag:"\xC1tlag",auto_heat:"a leghidegebb pont",auto_cool:"a legmelegebb pont",average:"a h\xE1rom m\xE9r\u0151 \xE1tlaga"},ui:{budget:"G\xE1zkeret",used_of:"{used} / {total} m\xB3",megajoule:"{value} MJ",pace_marker:"Eddig elhaszn\xE1lhat\xF3",reserve:"Tartal\xE9k",left:"Marad\xE9k",days_left:"H\xE1tral\xE9v\u0151 nap: {days}",pace_title:"\xDCtem",pace_actual:"Mostani",pace_allowed:"F\u0171t\xE9sre engedett",per_day:"m\xB3/nap",pace_unknown:"m\xE9g nincs el\xE9g leolvas\xE1s",lasts:"Ezzel az \xFCtemmel a keret ~{days} napig tart",lasts_short:"Ezzel az \xFCtemmel a keret nem tart ki az id\u0151szak v\xE9g\xE9ig",forecast_title:"El\u0151rejelz\xE9s",forecast_ok:"Csak g\xE1zzal is belef\xE9rne: {balance} m\xB3 maradna",forecast_bad:"Csak g\xE1zzal {balance} m\xB3-rel l\xE9pn\xE9 t\xFAl a keretet",hot_water:"Melegv\xEDz \xE9s f\u0151z\xE9s: {value} m\xB3/nap",source_title:"Most f\u0171t",source_cooling:"Most h\u0171t",source_idle:"F\u0171t\xE9si forr\xE1s",season_title:"\xC9vszak",outdoor_3day:"3 napos kinti \xE1tlag: {value} \xB0C",mode_title:"\xDCzemm\xF3d",overridden:"A rendszer fel\xFClb\xEDr\xE1lta a v\xE1laszt\xE1st",boiler_off:"A kaz\xE1n nincs \xFCzemk\xE9sz \xE1llapotban",erv_lock:"A szell\u0151ztet\u0151 g\xE1zreteszt kapott",window_warn:"{room} ablaka {minutes} perce {state}",window_warn_cold:"{room} ablaka {minutes} perce {state}, kint {temp} \xB0C",meter_title:"G\xE1z\xF3ra",meter_value:"\xD3ra\xE1ll\xE1s",meter_manual:"K\xE9zi leolvas\xE1s",meter_save:"R\xF6gz\xEDt",meter_last:"Utols\xF3 leolvas\xE1s: {when}",stale:"Az \xF3ra\xE1ll\xE1s 24 \xF3r\xE1n\xE1l r\xE9gebbi \u2013 olvasd le a g\xE1z\xF3r\xE1t",power_budget:"\xC1ramkeret: elfogyott",cool_confirm:"F\u0171t\xE9si id\xE9nyben k\xE9zi h\u0171t\xE9s \u2013 biztos?",cool_confirm_hint:"Okt\xF3ber \xE9s \xE1prilis k\xF6z\xF6tt a rendszer mag\xE1t\xF3l soha nem h\u0171t.",yes:"Igen, h\u0171ts\xF6n",cancel:"M\xE9gsem",now:"Most",target:"C\xE9l",boost:"Boost 1 \xF3ra",paused_window:"Sz\xFCnetel \u2013 ablak nyitva",override_until:"Fel\xFCl\xEDrva {when}-ig",preheat:"El\u0151f\u0171t\xE9s indul {when}",precool:"El\u0151h\u0171t\xE9s indul {when}",readonly:"Csak m\xE9r\xE9s",frost_risk:"Fagyvesz\xE9ly",leading:"m\xE9rvad\xF3",kitchen_excluded:"a f\u0151z\xE9s miatt kihagyva",overshoot:"Egy pont t\xFAll\xF6v\xE9s miatt korl\xE1toz",no_rooms:"Add meg a szob\xE1kat a k\xE1rtya be\xE1ll\xEDt\xE1saiban",aggregation_title:"Z\xF3na\xE9rt\xE9k",learning:"tanul\u2026",learning_detail:"{source} \xB7 {from} \xB0C-r\xF3l {target} \xB0C-ra",learned_title:"Tanult sebess\xE9g",predicted:"{minutes} perc m\xFAlva \u2248 {value} \xB0C",trend_rate:"Trend: {value} \xB0C/\xF3ra",verdict_start:"f\u0171t\xE9st k\xE9r",verdict_stop:"nem k\xE9r f\u0171t\xE9st",verdict_cool_start:"h\u0171t\xE9st k\xE9r",verdict_cool_stop:"nem k\xE9r h\u0171t\xE9st",learned_rate:"{source} {value} \xB0C/\xF3ra",felt:"H\u0151\xE9rzet {value} \xB0C",humidity:"P\xE1ratartalom",lagging:"A kl\xEDma nem b\xEDrja",history_hint:"Az elm\xFAlt 24 \xF3ra \u2013 a vonal a m\xE9rt h\u0151m\xE9rs\xE9klet, a l\xE9pcs\u0151 a c\xE9l",thermostat_off:"Kikapcsolva",automation:"F\u0171t\xE9sautomatika",boiler:"Kaz\xE1n \xFCzemk\xE9sz",erv_lock_switch:"Szell\u0151ztet\u0151 g\xE1zretesz",zones_title:"Z\xF3nah\u0151m\xE9rs\xE9kletek",timeline_title:"Napi menetrend",slots_title:"Szakaszok",plan_rooms:"Szob\xE1k",band_until:"{zone} {time}-ig",copy_day:"Nap m\xE1sol\xE1sa",copy_to:"M\xE1sol\xE1s ezekre a napokra",add_slot:"Szakasz hozz\xE1ad\xE1sa",remove_slot:"Szakasz t\xF6rl\xE9se",heating_tab:"F\u0171t\xE9s",cooling_tab:"H\u0171t\xE9s",current_zone:"Most: {zone}",next_change:"{zone} {time}-kor",no_schedule:"Nincs be\xE1ll\xEDtva heti \xFCtemterv",no_bands:"Ezen a napon nincs komfort s\xE1v",outside_bands:"A s\xE1vokon k\xEDv\xFCl: {zone}",loading:"\xDCtemterv bet\xF6lt\xE9se\u2026",schedule_hint:"A s\xE1vok a Home Assistant heti \xFCtemez\u0151j\xE9t \xEDrj\xE1k",save:"Ment\xE9s",saving:"Ment\xE9s\u2026",minute_short:"p",hour_short:"\xF3",unavailable:"Nem el\xE9rhet\u0151",not_configured:"Nincs be\xE1ll\xEDtva"},editor:{language:"Nyelv",language_auto:"Automatikus",name:"N\xE9v",sections:"Megjelen\u0151 r\xE9szek",custom:"Egyedi (YAML-ben)",prefix:"Entit\xE1s-el\u0151tag",show_gas:"G\xE1zkeret",show_pace:"\xDCtem",show_forecast:"El\u0151rejelz\xE9s",show_source:"Akt\xEDv forr\xE1s",show_mode:"\xDCzemm\xF3d \xE9s \xE9vszak",show_meter:"G\xE1z\xF3ra",show_rooms:"Szobalista",show_history:"24 \xF3r\xE1s g\xF6rbe",show_zones:"Z\xF3nah\u0151m\xE9rs\xE9kletek",show_switches:"Kaz\xE1n \xE9s retesz kapcsol\xF3",show_power_note:"\xC1ramkeret jelz\xE9s",show_rooms:"Szob\xE1k",show_zones:"Z\xF3nat\xE1bl\xE1zat",show_timeline:"Id\u0151vonal",compact:"T\xF6m\xF6r elrendez\xE9s",animate:"Anim\xE1ci\xF3k"}},qH={house_card_name:"Heating and gas budget",rooms_card_name:"Rooms",schedule_card_name:"Heating schedule",mode:{auto:"Automatic",csak_gaz:"Gas only",csak_klima:"Heat pump only",tavol:"Away",ki:"Off"},season:{auto:"Automatic",futes:"Heating",hutes:"Cooling",atmeneti:"Shoulder season"},source:{auto:"Automatic",gaz:"Gas",hibrid:"Hybrid",klima:"Heat pump",hutes:"Cooling",aeno:"Infrared panel",fagyvedelem:"Frost guard",ki:"Off",unknown:"Unknown"},hvac:{heat:"Heat",cool:"Cool",off:"Off",auto:"Auto",heat_cool:"Heat/cool"},suggestion:{gaz:"Gas",klima:"Heat pump",hutes:"Cooling",aeno:"Infrared panel",szunetel:"Paused",ki:"Not heating"},active:{radiator:"Radiator",klima_futes:"Heat pump heating",klima_hutes:"Heat pump cooling",aeno:"Infrared panel",nincs:"Not heating"},window:{zarva:"Closed",buko:"On the latch",nyitva:"Open"},zone:{komfort:"Comfort",ejszaka:"Night",eco:"Eco",tavol:"Away",fagyvedelem:"Frost guard"},day:{mon:"Mo",tue:"Tu",wed:"We",thu:"Th",fri:"Fr",sat:"Sa",sun:"Su"},day_long:{mon:"Monday",tue:"Tuesday",wed:"Wednesday",thu:"Thursday",fri:"Friday",sat:"Saturday",sun:"Sunday"},aggregation:{auto:"Automatic",atlag:"Average",auto_heat:"the coldest point",auto_cool:"the warmest point",average:"the average of the three sensors"},ui:{budget:"Gas budget",used_of:"{used} / {total} m\xB3",megajoule:"{value} MJ",pace_marker:"Allowed so far",reserve:"Reserve",left:"Left",days_left:"Days left: {days}",pace_title:"Pace",pace_actual:"Current",pace_allowed:"Allowed for heating",per_day:"m\xB3/day",pace_unknown:"not enough readings yet",lasts:"At this pace the budget lasts ~{days} days",lasts_short:"At this pace the budget will not last to the end of the period",forecast_title:"Forecast",forecast_ok:"Gas alone would fit, with {balance} m\xB3 to spare",forecast_bad:"Gas alone would overshoot the budget by {balance} m\xB3",hot_water:"Hot water and cooking: {value} m\xB3/day",source_title:"Heating now",source_cooling:"Cooling now",source_idle:"Heat source",season_title:"Season",outdoor_3day:"Three-day outdoor average: {value} \xB0C",mode_title:"Mode",overridden:"The system overrode this choice",boiler_off:"The boiler is not ready to heat",erv_lock:"The ventilator holds a gas interlock",window_warn:"{room}: window {state} for {minutes} minutes",window_warn_cold:"{room}: window {state} for {minutes} minutes, {temp} \xB0C outside",meter_title:"Gas meter",meter_value:"Reading",meter_manual:"Manual reading",meter_save:"Save",meter_last:"Last reading: {when}",stale:"The meter reading is over 24 hours old - please read the meter",power_budget:"Electricity budget: used up",cool_confirm:"Manual cooling during the heating season - are you sure?",cool_confirm_hint:"Between October and April the system never cools on its own.",yes:"Yes, cool",cancel:"Cancel",now:"Now",target:"Target",boost:"Boost 1 hour",paused_window:"Paused - window open",override_until:"Overridden until {when}",preheat:"Pre-heating starts at {when}",precool:"Pre-cooling starts at {when}",readonly:"Measurement only",frost_risk:"Frost risk",leading:"leading",kitchen_excluded:"left out while cooking",overshoot:"One point is capping the room",no_rooms:"Add the rooms in the card settings",aggregation_title:"Zone value",learning:"learning...",learning_detail:"{source} \xB7 from {from} \xB0C to {target} \xB0C",learned_title:"Learned rate",predicted:"in {minutes} minutes \u2248 {value} \xB0C",trend_rate:"Trend: {value} \xB0C/h",verdict_start:"calls for heat",verdict_stop:"no heat needed",verdict_cool_start:"calls for cooling",verdict_cool_stop:"no cooling needed",learned_rate:"{source} {value} \xB0C/h",felt:"Feels like {value} \xB0C",humidity:"Humidity",lagging:"The heat pump cannot keep up",history_hint:"The last 24 hours - the line is measured, the step is the target",thermostat_off:"Off",automation:"Heating automation",boiler:"Boiler ready",erv_lock_switch:"Ventilator gas interlock",zones_title:"Zone temperatures",timeline_title:"Daily plan",slots_title:"Segments",plan_rooms:"Rooms",band_until:"{zone} until {time}",copy_day:"Copy day",copy_to:"Copy to these days",add_slot:"Add segment",remove_slot:"Remove segment",heating_tab:"Heating",cooling_tab:"Cooling",current_zone:"Now: {zone}",next_change:"{zone} at {time}",no_schedule:"No weekly schedule is configured",no_bands:"No comfort band on this day",outside_bands:"Outside the bands: {zone}",loading:"Loading the schedule...",schedule_hint:"The bands are stored in Home Assistant's own weekly schedule",save:"Save",saving:"Saving...",minute_short:"min",hour_short:"h",unavailable:"Unavailable",not_configured:"Not configured"},editor:{language:"Language",language_auto:"Automatic",name:"Name",sections:"Sections",custom:"Custom (in YAML)",prefix:"Entity prefix",show_gas:"Gas budget",show_pace:"Pace",show_forecast:"Forecast",show_source:"Active source",show_mode:"Mode and season",show_meter:"Gas meter",show_rooms:"Room list",show_history:"24 hour chart",show_zones:"Zone temperatures",show_switches:"Boiler and interlock switches",show_power_note:"Electricity budget note",show_rooms:"Rooms",show_zones:"Zone table",show_timeline:"Timeline",compact:"Compact layout",animate:"Animations"}},lC={hu:YH,en:qH},J3=Object.keys(lC);function Z1(t,C){return T(t,C,J3)}function S1(t){return $(lC,t)}function k(t,C){return String(t).replace(/\{(\w+)\}/g,(e,H)=>C[H]===void 0||C[H]===null?e:String(C[H]))}var XH="futes";function Z2(t){return{...HC,...t?.entities||{}}}function C0(t,C,e,H){return`${t}.${C}_${e}_${H}`}function S2(t){let C=t?.prefix||XH;return(t?.rooms||[]).filter(e=>e&&(e.key||e.entity)).map(e=>{let H=e.key||e.name||"",V={};for(let[o,[M,n]]of Object.entries(VC))n&&(V[o]=C0(M,C,H,n));V.preheat=`sensor.${C}_elofutes_${H}`,V.learning=`input_text.${C}_tanulas_${H}`,V.trend=`sensor.${C}_trend_${H}`,e.humidity&&(V.humidity=e.humidity),e.history&&(V.history=e.history),e.climate&&(V.climate=e.climate);let r=(e.parts||[]).map(o=>({key:o.key,name:o.name||o.key,comfortKey:o.comfort_key||o.key,humidity:o.humidity||null,entity:o.entity||C0("sensor",C,H,o.key),excluded:o.excluded||C0("binary_sensor",C,H,`${o.key}_kizarva`)})),L={};for(let o of g5)L[o]=e.learned?.[o]||`input_number.${C}_tanult_${H}_${o}`;let a=e.comfort_key||H;return{key:H,name:e.name||H,comfortKey:a,learnedIds:L,readonly:!!e.readonly,scheduleEntity:e.schedule_entity||null,scheduleId:e.schedule_id||null,boost:e.boost,parts:r,entities:{...V,...e.entities||{}}}})}function dC(t,C,e,H){return`${C==="hutes"?t?.cool_prefix||"input_number.hutes_zona":t?.heat_prefix||"input_number.futes_zona"}_${e}_${H}`}function D(t,C){return C?t?.states?.[C]:void 0}function F(t,C){return D(t,C)?.state}function V1(t){return t==null||t==="unavailable"||t==="unknown"}function w(t,C){let e=F(t,C);if(V1(e))return null;let H=Number(e);return Number.isFinite(H)?H:null}function Y(t,C){return F(t,C)==="on"}function e2(t,C){let e=D(t,C)?.attributes;return Array.isArray(e?.options)?e.options:[]}function _5(t,C){let e=D(t,C);if(!e||V1(e.state))return null;let H=e.attributes?.timestamp?e.attributes.timestamp*1e3:Date.parse(e.state),V=new Date(H);return Number.isFinite(V.getTime())?V:null}function pC(t){return t?Math.max(0,Math.round((Date.now()-t.getTime())/6e4)):null}var JH=34.92,e0=t=>Math.min(1,Math.max(0,t));function CV(t,C,e,H){if(t==null||C===null||C===void 0)return null;let V=Math.min(q3,Math.max(-q3,t)),r=C+V*Y3,L=null;return e!=null&&(r<e+H.start?L="start":(r>e+H.stop||H.hardStop!==null&&C>=e+H.hardStop)&&(L="stop")),{rate:t,clamped:V,clipped:V!==t,predicted:r,minutes:Math.round(Y3*60),direction:t>.05?"up":t<-.05?"down":"flat",verdict:L}}function eV(t){let[C,e,H,V,r]=String(t).split("|"),L=Number(C);return{raw:t,startedAt:Number.isFinite(L)?new Date(L*1e3):null,from:Number(e),source:H||null,target:Number(V),up:r!=="le"}}function AC(t,C,e){if(!e)return null;let H=`${C?.felt_prefix||"sensor.hoerzet"}_${e}`,V=`${C?.comfort_prefix||"sensor.komfort"}_${e}`,r=w(t,H),L=F(t,V);if(r===null&&(!L||V1(L)))return null;let a=String(L||"").split("\xB7")[0].trim().toLowerCase();return{felt:r,text:V1(L)?null:L,level:MC[a]||null}}function H2(t,C){let e=Z2(C),H=Number(C?.heating_value)||JH,V=w(t,e.used),r=w(t,e.budget),L=w(t,e.left),a=w(t,e.allowed),o=w(t,e.reserve),M=w(t,e.days_left),n=V!==null||r!==null,l=r&&r>0?{used:e0((V||0)/r),allowed:a===null?null:e0(a/r),reserve:o===null?0:e0(o/r)}:null,d="ok";V!==null&&a!==null&&V>a&&(d="warn"),V!==null&&r!==null&&o!==null&&V>r-o&&(d="bad");let p=w(t,e.pace),c=p===null&&V1(F(t,e.pace)),h=w(t,e.heating_daily),m=w(t,e.hot_water_daily),g=L===null?null:L-(o||0),A=p&&p>0&&g!==null?Math.floor(g/p):null,y=w(t,e.balance),_=F(t,e.source),S=LC[_]||null,f=_5(t,e.manual_time);return{ok:n,reason:n?null:"not_configured",entities:e,gas:{used:V,budget:r,left:L,allowed:a,reserve:o,daysLeft:M,ratios:l,level:d,usedMj:V===null?null:Math.round(V*H),budgetMj:Number(C?.budget_mj)||(r===null?null:Math.round(r*H))},pace:{actual:p,unknown:c,heatingDaily:h,hotWater:m,lastsDays:A},forecast:{gasOnly:w(t,e.forecast),balance:y},source:{key:V1(_)?null:_,icon:S?.icon||"info",accent:S?.accent||"idle",reason:F(t,e.reason),cooling:_==="hutes"},season:{choice:F(t,e.season_select)||null,active:F(t,e.season_active)||null,options:e2(t,e.season_select),outdoor3:w(t,e.outdoor_3day),outside:w(t,e.outside)},mode:{key:F(t,e.mode)||null,options:e2(t,e.mode)},meter:{value:w(t,e.meter),manual:w(t,e.manual),lastRead:f,stale:Y(t,e.stale)},flags:{automation:D(t,e.automation)?Y(t,e.automation):null,automationEntity:e.automation,boiler:D(t,e.boiler)?Y(t,e.boiler):null,ervLock:D(t,e.erv_lock)?Y(t,e.erv_lock):null}}}function cC(t=new Date){let C=t.getMonth()+1,e=t.getDate(),H=C>Z5.month||C===Z5.month&&e>=Z5.day,V=C<S5.month||C===S5.month&&e<=S5.day;return!(H&&V)}function y5(t,C){let e=S2(C).map(H=>{let V=H.entities,r=F(t,V.window),L=oC[r]||null,a=D(t,V.window)?.last_changed?new Date(D(t,V.window).last_changed):null,o=F(t,V.active),M=iC[o]||null,n=F(t,V.suggestion),l=aC[n]||null,d=H.parts.map(S=>({key:S.key,name:S.name,value:w(t,S.entity),humidity:w(t,S.humidity),excluded:Y(t,S.excluded),comfort:AC(t,C,S.comfortKey)})),p=V.climate?D(t,V.climate):null,c=p?.attributes?.temperature,h=p?.attributes?.current_temperature,m=H.readonly?null:c!=null?Number(c):w(t,V.target_number)??w(t,V.target),g=w(t,V.temperature)??h??null,A=F(t,V.learning),y=A&&!V1(A)&&A.trim()!==""?eV(A):null,_={};for(let S of g5)_[S]=w(t,H.learnedIds?.[S]);return{key:H.key,name:H.name,readonly:H.readonly,temperature:g,target:m,climate:p?{entity:V.climate,mode:p.state,modes:p.attributes?.hvac_modes||[],step:p.attributes?.target_temp_step||h1,min:p.attributes?.min_temp??f1,max:p.attributes?.max_temp??g1,action:p.attributes?.hvac_action||null}:null,mode:{value:F(t,V.mode),options:e2(t,V.mode),entity:V.mode},learning:y,learned:_,trend:CV(w(t,V.trend),g,m,_.aeno!==null?X3.aeno:X3.default),humidity:w(t,V.humidity),lagging:Y(t,V.lagging),historyEntity:[V.history,V.temperature,V.climate].find(S=>S&&D(t,S))||null,targetEntity:[V.target_number,V.target].find(S=>S&&D(t,S))||null,boost:H.boost,schedule:HV(t,C,H.scheduleEntity),comfort:AC(t,C,H.comfortKey),active:M?{key:o,...M}:null,suggestion:l?{key:n,...l,reason:F(t,V.suggestion_reason)}:null,window:L?{state:r,icon:L.icon,warn:L.warn,minutes:pC(a)}:null,paused:Y(t,V.paused),override:{value:w(t,V.override),until:_5(t,V.override_until),entity:V.override},source:{value:F(t,V.source),options:e2(t,V.source),entity:V.source},preheat:_5(t,V.preheat),preheatDirection:D(t,V.preheat)?.attributes?.irany||null,frost:Y(t,V.frost),parts:d,leading:F(t,V.leading)||null,aggregation:{value:F(t,V.aggregation),options:e2(t,V.aggregation),entity:V.aggregation},overshoot:Y(t,V.overshoot),unavailable:V1(F(t,V.temperature)),entities:V}});return{ok:e.length>0,reason:e.length?null:"no_rooms",rooms:e}}function HV(t,C,e){let H=Z2(C),V=e||C?.schedule_entity||H.schedule,r=D(t,V);if(!r)return null;let L=C?.zone_on||j[0],a=C?.zone_off||j[1],o=r.attributes?.next_event?new Date(r.attributes.next_event):null;return{entity:V,own:!!e,zone:r.state==="on"?L:a,nextEvent:o&&Number.isFinite(o.getTime())?o:null}}function uC(t,C){return t.filter(e=>e.window?.warn&&(e.window.minutes??0)>=C)}var mC=t=>String(t).padStart(2,"0");function _2(t){let C=(Math.round(t)%1440+1440)%1440;return`${mC(Math.floor(C/60))}:${mC(C%60)}`}var q={mon:"monday",tue:"tuesday",wed:"wednesday",thu:"thursday",fri:"friday",sat:"saturday",sun:"sunday"};function t1(t){let[C,e]=String(t).split(":"),H=Number(C)*60+Number(e||0);return Number.isFinite(H)?H:null}function VV(t,C,e){let H=(t||[]).map(L=>({start:t1(L.from),end:t1(L.to)})).filter(L=>L.start!==null&&L.end!==null&&L.end>L.start).sort((L,a)=>L.start-a.start),V=[],r=0;return H.forEach((L,a)=>{L.start>r&&V.push({start:r,end:L.start,zone:e,index:null}),V.push({start:L.start,end:L.end,zone:C,index:a}),r=L.end}),r<1440&&V.push({start:r,end:1440,zone:e,index:null}),V}function vC(t,C,e,H){let V=Z2(C),r=H||C?.schedule_entity||V.schedule,L=D(t,r),a=C?.zone_on||j[0],o=C?.zone_off||j[1],M={};for(let d of B1)M[d]=VV(e?.[q[d]],a,o);let n=L?.attributes?.next_event,l=n?new Date(n):null;return{ok:!!L&&!!e,reason:L?e?null:"loading":"no_schedule",entityId:r,zoneOn:a,zoneOff:o,zones:C?.zones||j,zoneNow:L?L.state==="on"?a:o:null,nextEvent:l&&Number.isFinite(l.getTime())?l:null,days:M,blocks:e||null}}function b5(t){let C=Z2(t),e=t?.schedule_entity||C.schedule,H=new Map;for(let V of S2(t)){if(V.readonly)continue;let r=V.scheduleEntity||e;H.has(r)||H.set(r,{entity:r,id:V.scheduleId||null,rooms:[]});let L=H.get(r);L.rooms.push(V),V.scheduleId&&(L.id=V.scheduleId)}return H.size||H.set(e,{entity:e,id:null,rooms:[]}),[...H.values()].sort((V,r)=>r.rooms.length-V.rooms.length).map(V=>({...V,label:V.rooms.length&&V.rooms.length<=2?V.rooms.map(r=>r.name).join(", "):null}))}function y2(t,C,e,H){let V={};for(let r of C?.zones||j){V[r]={};for(let L of H){let a=dC(C,e,r,L.key);V[r][L.key]={entity:a,value:w(t,a)}}}return V}var P1=(t,C)=>t==null?"\u2013":`${Z(t,C,1)} \xB0C`;function tV(t,{t:C}){let e=[];if(t.paused?e.push(`<span class="tag warn">${s("window_open")}${i(C("ui.paused_window"))}</span>`):t.active&&e.push(`<span class="tag${t.active.key==="nincs"?" idle":""}">${s(t.active.icon)}${i(C(`active.${t.active.key}`))}</span>`),t.window?.warn){let H=t.window.minutes===null?"":` \xB7 ${t.window.minutes} ${C("ui.minute_short")}`;e.push(`<span class="tag warn">${s(t.window.icon)}${i(C(`window.${t.window.state}`))}${i(H)}</span>`)}return e.push(LV(t,{t:C})),e.filter(Boolean).join("")}function rV(t,{t:C,hass:e}){let H=t.comfort;if(!H||!H.text&&H.felt===null)return"";let V=H.felt===null?"":` title="${i(k(C("ui.felt"),{value:Z(H.felt,e,1)}))}"`;return`<span class="tag comfort${H.level?` comfort-${H.level}`:""}"${V}>${s("target")}${i(H.text||"")}</span>`}function LV(t,{t:C}){if(!t.learning)return"";let e=k(C("ui.learning_detail"),{source:C(`source.${t.learning.source}`,t.learning.source||""),from:t.learning.from,target:t.learning.target});return`<span class="tag idle" title="${i(e)}">${s("timer")}${i(C("ui.learning"))}</span>`}function xC(t,{t:C,hass:e}){let H=Object.entries(t.learned||{}).filter(([,V])=>V!=null).map(([V,r])=>k(C("ui.learned_rate"),{source:C(`source.${V}`,V),value:Z(r,e,2)}));return H.length?`<div class="note">${i(C("ui.learned_title"))}: ${i(H.join(" \xB7 "))}</div>`:""}function iV(t,{t:C,hass:e}){return t.humidity===null||t.humidity===void 0?"":`<span class="tag idle" title="${i(C("ui.humidity"))}">${s("water_percent")}${i(Z(t.humidity,e,0))}%</span>`}function aV(t,{t:C}){return t.lagging?`<span class="tag warn">${s("alert")}${i(C("ui.lagging"))}</span>`:""}function oV(t,{t:C,hass:e}){if(!t?.points?.length)return"";let{points:H,targets:V=[]}=t,r=[...H.map(A=>A.v),...V.map(A=>A.v)],L=Math.min(...r),a=Math.max(...r),o=Math.max(.5,a-L),M=H[0].t,n=H[H.length-1].t,l=Math.max(1,n-M),d=(A,y,_)=>Math.min(_,Math.max(y,A)),p=A=>d((A-M)/l*100,0,100),c=A=>d(28-(A-L)/o*24,2,28),h=H.map((A,y)=>`${y?"L":"M"}${p(A.t).toFixed(2)},${c(A.v).toFixed(2)}`).join(""),m=V.map((A,y)=>{let _=p(A.t).toFixed(2),S=c(A.v).toFixed(2);return y===0?`M${_},${S}`:`L${_},${c(V[y-1].v).toFixed(2)}L${_},${S}`}).join(""),g=V.length?`L100,${c(V[V.length-1].v).toFixed(2)}`:"";return`
    <div class="spark" title="${i(C("ui.history_hint"))}">
      <svg viewBox="0 0 100 30" preserveAspectRatio="none" aria-hidden="true">
        ${m?`<path class="target" d="${m}${g}"></path>`:""}
        <path class="measured" d="${h}"></path>
      </svg>
      <div class="scale"><span>${i(Z(a,e,1))}</span><span>${i(Z(L,e,1))}</span></div>
    </div>`}function MV(t,{t:C,hass:e,zones:H=[],season:V}){let r=H.filter(L=>L.entity);return r.length?`
    <div class="zoneset">
      <div class="section-title">${i(C("ui.zones_title"))} \xB7 ${i(C(V==="hutes"?"ui.cooling_tab":"ui.heating_tab"))}</div>
      ${r.map(L=>`
        <div class="zonerow">
          <i class="zdot" style="background:${L.colour}"></i>
          <span class="zname">${i(C(`zone.${L.key}`,L.key))}</span>
          <div class="spacer"></div>
          <button class="step-btn" type="button" data-action="zone-step" data-entity="${i(L.entity)}" data-dir="-1">\u2212</button>
          <span class="zval">${i(L.value===null?"\u2013":`${Z(L.value,e,1)} \xB0C`)}</span>
          <button class="step-btn" type="button" data-action="zone-step" data-entity="${i(L.entity)}" data-dir="1">+</button>
        </div>`).join("")}
    </div>`:""}function hC(t,{t:C,hass:e}){let H=t.schedule;if(!H)return"";let V=C(`zone.${H.zone}`,H.zone);return H.nextEvent?k(C("ui.band_until"),{zone:V,time:B(H.nextEvent,e)}):V}function nV(t,C){let e=hC(t,C);return e?`<span class="tag idle">${s("calendar")}${i(e)}</span>`:""}function fC(t,{t:C,hass:e,season:H}){let V=t.trend;if(!V)return"";let r=V.direction==="up"?"trend_up":V.direction==="down"?"trend_down":"trend_stable",L=k(C("ui.predicted"),{minutes:V.minutes,value:Z(V.predicted,e,1)}),a=H==="hutes",o=V.verdict==="start"?C(a?"ui.verdict_cool_start":"ui.verdict_start"):V.verdict==="stop"?C(a?"ui.verdict_cool_stop":"ui.verdict_stop"):"",M=k(C("ui.trend_rate"),{value:Z(V.rate,e,2)});return`<div class="note trend" title="${i(M)}">${s(r)} ${i(L)}${o?` \xB7 ${i(o)}`:""}</div>`}var sV={radiator:"gaz",klima_futes:"klima",klima_hutes:"hutes",aeno:"aeno",nincs:"ki"};function gC(t,{t:C,withReason:e=!0}){if(!t.suggestion)return"";if(t.active&&sV[t.active.key]===t.suggestion.key)return t.suggestion.reason&&e?`<div class="note">${i(t.suggestion.reason)}</div>`:"";let V=C(`suggestion.${t.suggestion.key}`,t.suggestion.key),r=e&&t.suggestion.reason?`<div class="note">${i(t.suggestion.reason)}</div>`:"";return`
    <div class="suggest accent-${t.suggestion.accent}">
      <span class="tag">${s(t.suggestion.icon)}${i(V)}</span>
    </div>${r}`}function ZC(t,{t:C,hass:e}){return t.parts.length?`<div class="parts">${t.parts.map(H=>{let V=[];H.key===t.leading&&V.push("lead"),H.excluded&&V.push("out");let r=H.excluded?` (${C("ui.kitchen_excluded")})`:H.key===t.leading?` (${C("ui.leading")})`:"",L=H.humidity===null||H.humidity===void 0?"":` ${Z(H.humidity,e,0)}%`;return`<span class="${V.join(" ")}">${i(H.name)} <b>${i(P1(H.value,e))}</b>${i(L)}${i(r)}</span>`}).join("")}</div>`:""}function SC(t,{t:C,hass:e,season:H}){let V=[];if(t.overshoot&&V.push(C("ui.overshoot")),t.override.until&&V.push(k(C("ui.override_until"),{when:B(t.override.until,e)})),t.preheat){let r=t.preheatDirection==="hutes"||H==="hutes";V.push(k(C(r?"ui.precool":"ui.preheat"),{when:B(t.preheat,e)}))}return V.length?`<div class="note">${i(V.join(" \xB7 "))}</div>`:""}function _C(t,{t:C}){let e=t.climate||t.override.entity?"":"disabled";return`
    <button class="step-btn" type="button" data-action="step" data-room="${i(t.key)}" data-dir="-1"
      aria-label="${i(C("ui.target"))} \u2212" ${e}>\u2212</button>
    <button class="step-btn" type="button" data-action="step" data-room="${i(t.key)}" data-dir="1"
      aria-label="${i(C("ui.target"))} +" ${e}>+</button>`}function lV(t,{t:C}){let e=t.climate?.modes||[];return e.length?`
    <div class="seg small">
      ${e.map(H=>`<button type="button" data-action="hvac" data-room="${i(t.key)}" data-value="${i(H)}"
              aria-pressed="${H===t.climate.mode}">${i(C(`hvac.${H}`,H))}</button>`).join("")}
    </div>`:""}function yC(t,C){let{t:e,showBoost:H=!0}=C,V=(o,M,n,l)=>M.length?`<select data-action="${o}" data-room="${i(t.key)}" title="${i(l)}">
          ${M.map(d=>`<option value="${i(d)}" ${d===n?"selected":""}>${i(e(`${o==="source"?"source":"aggregation"}.${d}`,d))}</option>`).join("")}
        </select>`:"",L=(t.boost===void 0?H:!!t.boost)?`<button class="chip" type="button" data-action="boost" data-room="${i(t.key)}">
        ${s("boost")}<span>${i(e("ui.boost"))}</span></button>`:"",a=t.climate?lV(t,C):V("source",t.source.options,t.source.value,e("ui.source_title"));return`
    <div class="controls">
      ${_C(t,C)}
      ${a}
      ${t.parts.length?V("aggregation",t.aggregation.options,t.aggregation.value,e("ui.aggregation_title")):""}
      ${L}
    </div>`}function dV(t,{t:C,hass:e}){let H=t.frost?`<span class="tag bad">${s("frost")}${i(C("ui.frost_risk"))}</span>`:"";return`
    <div class="room readonly" data-room="${i(t.key)}">
      <div class="line">
        <div class="name">${i(t.name)}</div>
        <div class="spacer"></div>
        ${H}
        <div><div class="temp">${i(P1(t.temperature,e))}</div></div>
      </div>
      <div class="note">${i(C("ui.readonly"))}</div>
    </div>`}function bC(t,C){let{t:e,hass:H,showControls:V=!0,showParts:r=!0}=C;if(t.readonly)return dV(t,C);let L=t.target===null?"":`<div class="goal">${i(e("ui.target"))} ${i(P1(t.target,H))}</div>`;return`
    <div class="room" data-room="${i(t.key)}">
      <div class="line">
        <div class="name">${i(t.name)}</div>
        <div class="spacer"></div>
        ${rV(t,C)}
        ${iV(t,C)}
        ${aV(t,C)}
        ${nV(t,C)}
        ${tV(t,C)}
        <div>
          <div class="temp">${i(P1(t.temperature,H))}</div>
          ${L}
        </div>
      </div>
      ${gC(t,C)}
      ${r?ZC(t,C):""}
      ${fC(t,C)}
      ${C.series?oV(C.series,C):""}
      ${SC(t,C)}
      ${xC(t,C)}
      ${V?yC(t,C):""}
      ${C.zones?MV(t,C):""}
    </div>`}function wC(t,C){let{t:e,hass:H,expanded:V}=C;if(t.readonly){let L=t.frost?`<span class="tag bad">${s("frost")}</span>`:"";return`
      <div class="room readonly" data-room="${i(t.key)}">
        <div class="line">
          <div class="name">${i(t.name)}</div>
          <div class="spacer"></div>
          ${L}
          <div class="temp">${i(P1(t.temperature,H))}</div>
        </div>
      </div>`}let r=[];return t.suggestion&&r.push(`<span class="mark accent-${t.suggestion.accent}" title="${i(e(`suggestion.${t.suggestion.key}`,t.suggestion.key))}">${s(t.suggestion.icon)}</span>`),t.window?.warn&&r.push(`<span class="mark warn" title="${i(e(`window.${t.window.state}`))}">${s(t.window.icon)}</span>`),t.learning&&r.push(`<span class="mark" title="${i(e("ui.learning"))}">${s("timer")}</span>`),t.lagging&&r.push(`<span class="mark warn" title="${i(e("ui.lagging"))}">${s("alert")}</span>`),t.schedule?.own&&r.push(`<span class="mark" title="${i(hC(t,{t:e,hass:H}))}">${s("calendar")}</span>`),t.comfort?.level&&r.push(`<span class="mark comfort-${t.comfort.level}" title="${i(t.comfort.text||"")}">${s("target")}</span>`),`
    <div class="room compact${V?" open":""}" data-room="${i(t.key)}">
      <div class="line" data-action="toggle-room" data-room="${i(t.key)}">
        <div class="name">${i(t.name)}</div>
        <div class="spacer"></div>
        <div class="marks">${r.join("")}</div>
        <div class="nums">
          <span class="temp">${i(P1(t.temperature,H))}</span>
          <span class="goal">${i(t.target===null?"":P1(t.target,H))}</span>
        </div>
        <span class="quick">${_C(t,C)}</span>
        ${s(V?"chevron_up":"chevron")}
      </div>
      ${V?`${gC(t,C)}${ZC(t,C)}${fC(t,C)}${SC(t,C)}${xC(t,C)}${yC(t,C)}`:""}
    </div>`}function b2({hass:t,config:C,room:e,action:H,target:V}){let r=(L,a,o)=>t?.callService?.(L,a,o);if(H==="step"){let L=Number(V.dataset.dir);if(e.climate){let M=e.target??e.temperature;if(M==null)return!1;let n=e.climate.step||h1,l=Math.min(e.climate.max??g1,Math.max(e.climate.min??f1,M+L*n));return l===M?!1:(r("climate","set_temperature",{entity_id:e.climate.entity,temperature:l}),!0)}let a=e.override.value??e.target??e.temperature;if(a==null||!e.override.entity)return!1;let o=Math.min(g1,Math.max(f1,a+L*h1));return o===a?!1:(r("input_number","set_value",{entity_id:e.override.entity,value:o}),!0)}if(H==="hvac")return e.climate?(r("climate","set_hvac_mode",{entity_id:e.climate.entity,hvac_mode:V.dataset.value}),!0):!1;if(H==="source")return r("input_select","select_option",{entity_id:e.source.entity,option:V.value}),!0;if(H==="aggregation")return r("input_select","select_option",{entity_id:e.aggregation.entity,option:V.value}),!0;if(H==="zone-step"){let L=V.dataset.entity,a=Number(t?.states?.[L]?.state);if(!L||!Number.isFinite(a))return!1;let o=Number(t.states[L].attributes?.step)||h1,M=Math.min(Number(t.states[L].attributes?.max??g1),Math.max(Number(t.states[L].attributes?.min??f1),a+Number(V.dataset.dir)*o));return M===a?!1:(r("input_number","set_value",{entity_id:L,value:M}),!0)}if(H==="boost"){let L=C?.boost_script||"script.futes_boost",[,a]=L.split(".");return a?(r("script",a,{szoba:e.key}),!0):!1}return!1}var pV=`
:host {
  --ht-gas: #e8710a;
  --ht-ac: #1a73e8;
  --ht-cool: #00acc1;
  --ht-hybrid: #8e44ad;
  --ht-frost: #7fc6e8;
  --ht-idle: var(--ap-muted);
  --ht-ok: var(--success-color, #43a047);
  --ht-warn: var(--warning-color, #fb8c00);
  --ht-bad: var(--error-color, #db4437);
}
.wrap.accent-gas { --ap-accent: var(--ht-gas); }
.wrap.accent-ac { --ap-accent: var(--ht-ac); }
.wrap.accent-cool { --ap-accent: var(--ht-cool); }
.wrap.accent-hybrid { --ap-accent: var(--ht-hybrid); }
.wrap.accent-frost { --ap-accent: var(--ht-frost); }
.wrap.accent-idle { --ap-accent: var(--ht-idle); }

/* An inline mdi path has no intrinsic size, so an icon dropped into a plain
   text line - the night note under the bands - would render enormous. Every
   context rule below is more specific, so this only catches the gaps. */
.icon { width: 16px; height: 16px; }

/* the header's status group travels together and drops to its own line on a
   narrow card rather than forcing the card wider than its column */
.header { flex-wrap: wrap; }
.header .meta { display: flex; align-items: center; gap: 8px; margin-left: auto; }
.header > div:first-child { min-width: 0; }

/* ---------- tags ---------- */
.tag {
  display: inline-flex; align-items: center; gap: 5px; padding: 3px 8px; border-radius: 999px;
  font-size: .72rem; font-weight: 600; white-space: nowrap;
  background: color-mix(in srgb, var(--ap-accent) 14%, transparent); color: var(--ap-accent);
}
.tag .icon { width: 13px; height: 13px; }
.tag.warn { background: color-mix(in srgb, var(--ht-warn) 18%, transparent); color: var(--ht-warn); }
.tag.bad { background: color-mix(in srgb, var(--ht-bad) 18%, transparent); color: var(--ht-bad); }
.tag.idle { background: color-mix(in srgb, var(--ap-text) 8%, transparent); color: var(--ap-muted); }

/* ---------- gas budget bar ---------- */
.gasbar { position: relative; height: 22px; border-radius: 999px; background: var(--ap-line); overflow: hidden; }
.gasbar .fill { position: absolute; inset: 0 auto 0 0; border-radius: 999px; transition: width .6s ease; }
.gasbar.level-ok .fill { background: linear-gradient(90deg, color-mix(in srgb, var(--ht-ok) 55%, transparent), var(--ht-ok)); }
.gasbar.level-warn .fill { background: linear-gradient(90deg, color-mix(in srgb, var(--ht-warn) 55%, transparent), var(--ht-warn)); }
.gasbar.level-bad .fill { background: linear-gradient(90deg, color-mix(in srgb, var(--ht-bad) 55%, transparent), var(--ht-bad)); }
/* the reserve is not spendable, so it is drawn as a wall at the far end */
.gasbar .reserve {
  position: absolute; top: 0; bottom: 0; right: 0;
  background: repeating-linear-gradient(135deg,
    color-mix(in srgb, var(--ap-text) 22%, transparent) 0 6px, transparent 6px 12px);
}
/* where the house is allowed to be today - the pace marker */
.gasbar .pace { position: absolute; top: -3px; bottom: -3px; width: 3px; border-radius: 2px; background: var(--ap-text); }
.gasbar .pace::after {
  content: ''; position: absolute; left: 50%; top: -3px; width: 7px; height: 7px;
  transform: translateX(-50%) rotate(45deg); background: var(--ap-text);
}
.barline { display: flex; align-items: baseline; justify-content: space-between; gap: 10px; flex-wrap: wrap; }
.barline .big { font-size: 1.25rem; font-weight: 700; color: var(--ap-text); font-variant-numeric: tabular-nums; }
.barline .mj { font-size: .76rem; color: var(--ap-muted); }
.legend { display: flex; flex-wrap: wrap; gap: 10px 16px; font-size: .74rem; color: var(--ap-muted); }
.legend .dot { width: 9px; height: 9px; border-radius: 50%; display: inline-block; margin-right: 5px; vertical-align: baseline; }
.legend .dot.pace { border-radius: 2px; background: var(--ap-text); }
.legend .dot.reserve { background: color-mix(in srgb, var(--ap-text) 30%, transparent); }

.wrap.cooling [data-section="gas"],
.wrap.cooling [data-section="pace"] { opacity: .55; }

/* ---------- pace ---------- */
.pacegrid { display: grid; grid-template-columns: repeat(auto-fit, minmax(132px, 1fr)); gap: 10px; }
.pacebox { padding: 10px 12px; border-radius: 12px; background: color-mix(in srgb, var(--ap-text) 5%, transparent); display: grid; gap: 2px; }
.pacebox .k { font-size: .7rem; text-transform: uppercase; letter-spacing: .05em; color: var(--ap-muted); }
.pacebox .v { font-size: 1.05rem; font-weight: 700; color: var(--ap-text); font-variant-numeric: tabular-nums; }
.pacebox .u { font-size: .72rem; color: var(--ap-muted); }
.pacebox.over .v { color: var(--ht-bad); }

/* ---------- source hero ---------- */
.sourcebox { display: flex; align-items: center; gap: 14px; }
.sourcebox .ring {
  width: 56px; height: 56px; border-radius: 50%; flex: 0 0 auto;
  display: grid; place-items: center;
  background: color-mix(in srgb, var(--ap-accent) 16%, transparent);
  color: var(--ap-accent);
}
.sourcebox .ring .icon { width: 30px; height: 30px; }
.sourcebox .label { font-size: 1.3rem; font-weight: 700; color: var(--ap-accent); line-height: 1.15; }
.sourcebox .why { font-size: .84rem; color: var(--ap-muted); line-height: 1.35; }

/* ---------- segmented controls ---------- */
.seg { display: flex; flex-wrap: wrap; gap: 6px; }
.seg button {
  flex: 1 1 auto; min-width: 84px;
  display: inline-flex; align-items: center; justify-content: center; gap: 6px;
  padding: 8px 10px; border-radius: 12px; cursor: pointer;
  border: 1px solid var(--ap-line); background: transparent; color: var(--ap-text);
  font: inherit; font-size: .8rem; font-weight: 600;
}
.seg button .icon { width: 16px; height: 16px; color: var(--ap-muted); }
.seg button[aria-pressed="true"] {
  background: color-mix(in srgb, var(--ap-accent) 16%, transparent);
  border-color: color-mix(in srgb, var(--ap-accent) 45%, transparent);
  color: var(--ap-accent);
}
.seg button[aria-pressed="true"] .icon { color: var(--ap-accent); }
.seg button:active:not([disabled]) { transform: scale(.98); }
.seg button[disabled] { opacity: .4; cursor: not-allowed; }

/* ---------- meter ---------- */
.meter { display: flex; flex-wrap: wrap; align-items: flex-end; gap: 10px; }
.meter .field { display: grid; gap: 4px; flex: 1 1 150px; }
.meter .field span { font-size: .7rem; text-transform: uppercase; letter-spacing: .05em; color: var(--ap-muted); }
.meter input {
  font: inherit; font-size: 1rem; font-weight: 600; padding: 9px 10px; border-radius: 10px;
  border: 1px solid var(--ap-line); background: var(--card-background-color, #fff);
  color: var(--ap-text); width: 100%; box-sizing: border-box;
}

/* ---------- confirm ---------- */
.confirm {
  display: grid; gap: 10px; padding: 12px; border-radius: 14px;
  background: color-mix(in srgb, var(--ht-warn) 16%, transparent);
}
.confirm .q { font-size: .9rem; font-weight: 600; color: var(--ap-text); }
.confirm .hint { font-size: .78rem; color: var(--ap-muted); }
.confirm .row { display: flex; gap: 8px; flex-wrap: wrap; }

/* ---------- room rows ---------- */
.rooms { display: grid; gap: 8px; }
.room {
  display: grid; gap: 8px; padding: 10px 12px; border-radius: 14px;
  background: color-mix(in srgb, var(--ap-text) 5%, transparent);
}
.room.readonly { background: transparent; border: 1px dashed var(--ap-line); }
/* a room row has to be able to give way: the name wraps and the tags drop to
   their own line rather than making the whole card too wide for a phone */
.room .line { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
.room .line .name { min-width: 0; }
.room .line > div:last-child { margin-left: auto; text-align: right; }
.room .name { font-size: .92rem; font-weight: 600; color: var(--ap-text); }
.room .spacer { flex: 1; }
.room .temp { font-size: 1.25rem; font-weight: 700; color: var(--ap-text); font-variant-numeric: tabular-nums; }
.room .goal { font-size: .82rem; color: var(--ap-muted); font-variant-numeric: tabular-nums; }
.room .parts { display: flex; flex-wrap: wrap; gap: 4px 12px; font-size: .74rem; color: var(--ap-muted); }
.room .parts b { font-weight: 700; color: var(--ap-text); }
.room .parts .lead { color: var(--ap-accent); }
.room .parts .out { text-decoration: line-through; opacity: .7; }
.room .note { font-size: .74rem; color: var(--ap-muted); }
.room .note.trend { display: flex; align-items: center; gap: 5px; }
.room .note.trend .icon { width: 14px; height: 14px; }
.room .controls { display: flex; flex-wrap: wrap; gap: 6px; align-items: center; }
.step-btn {
  width: 34px; height: 34px; border-radius: 10px; display: grid; place-items: center;
  border: 1px solid var(--ap-line); background: transparent; color: var(--ap-text);
  font: inherit; font-size: 1.1rem; font-weight: 700; cursor: pointer; padding: 0;
}
.step-btn:active:not([disabled]) { transform: scale(.95); }
.controls select {
  font: inherit; font-size: .82rem; padding: 7px 9px; border-radius: 10px;
  border: 1px solid var(--ap-line); background: var(--card-background-color, #fff); color: var(--ap-text);
}
.step-btn[disabled] { opacity: .35; cursor: not-allowed; }

/* ---------- compact room row (house card list) ---------- */
.room.compact { padding: 8px 10px; gap: 6px; }
/* the whole line opens the room; the setpoint buttons inside it still act as
   buttons, because the nearest [data-action] wins */
.room.compact .line { cursor: pointer; gap: 8px; }
.room.compact .line > .icon { width: 18px; height: 18px; color: var(--ap-muted); flex: 0 0 auto; }
.room.compact .nums { display: flex; align-items: baseline; gap: 6px; white-space: nowrap; }
.room.compact .nums .temp { font-size: 1.05rem; }
.room.compact .nums .goal { font-size: .78rem; }
.room.compact .marks { display: flex; gap: 4px; flex: 0 0 auto; }
.room.compact .quick { display: inline-flex; gap: 6px; flex: 0 0 auto; }
.room.compact .step-btn { width: 30px; height: 30px; font-size: 1rem; }
.mark { display: inline-grid; place-items: center; width: 26px; height: 26px; border-radius: 8px;
  background: color-mix(in srgb, var(--ap-accent) 14%, transparent); color: var(--ap-accent); }
.mark .icon { width: 15px; height: 15px; }
.mark.warn { background: color-mix(in srgb, var(--ht-warn) 18%, transparent); color: var(--ht-warn); }
/* a room can be heated differently from the house, so its own row carries
   its own accent rather than borrowing the card's */
.accent-gas { --ap-accent: var(--ht-gas); }
.accent-ac { --ap-accent: var(--ht-ac); }
.accent-cool { --ap-accent: var(--ht-cool); }
.accent-hybrid { --ap-accent: var(--ht-hybrid); }
.accent-frost { --ap-accent: var(--ht-frost); }
.accent-idle { --ap-accent: var(--ht-idle); }
.suggest { display: flex; align-items: center; gap: 8px; }

/* ---------- comfort colours ---------- */
.tag.comfort-cold, .mark.comfort-cold { background: color-mix(in srgb, #3f6fd8 18%, transparent); color: #3f6fd8; }
.tag.comfort-good, .mark.comfort-good { background: color-mix(in srgb, var(--ht-ok) 18%, transparent); color: var(--ht-ok); }
.tag.comfort-warm, .mark.comfort-warm { background: color-mix(in srgb, var(--ht-warn) 18%, transparent); color: var(--ht-warn); }
.tag.comfort-hot, .mark.comfort-hot { background: color-mix(in srgb, var(--ht-bad) 18%, transparent); color: var(--ht-bad); }

/* the thermostat's mode buttons sit in a room row, so they are smaller than
   the house-wide ones */
.seg.small button { min-width: 62px; padding: 6px 8px; font-size: .78rem; }

/* ---------- 24 hour sparkline ---------- */
.spark { display: flex; align-items: stretch; gap: 6px; }
.spark svg { flex: 1 1 auto; height: 46px; width: 100%; overflow: visible; }
.spark path { fill: none; vector-effect: non-scaling-stroke; }
.spark path.measured { stroke: var(--ap-accent); stroke-width: 1.8; stroke-linejoin: round; stroke-linecap: round; }
.spark path.target { stroke: var(--ap-muted); stroke-width: 1.2; stroke-dasharray: 3 3; opacity: .8; }
.spark .scale { display: flex; flex-direction: column; justify-content: space-between;
  font-size: .64rem; color: var(--ap-muted); font-variant-numeric: tabular-nums; }

/* ---------- per-room zone setpoints ---------- */
.zoneset { display: grid; gap: 6px; margin-top: 4px; }
.zonerow { display: flex; align-items: center; gap: 8px; }
.zonerow .zname { font-size: .82rem; color: var(--ap-text); }
.zonerow .zval { font-size: .9rem; font-weight: 700; color: var(--ap-text);
  font-variant-numeric: tabular-nums; min-width: 62px; text-align: center; }

/* ---------- schedule ---------- */
.days { display: flex; gap: 6px; flex-wrap: wrap; }
.days button {
  flex: 1 1 auto; min-width: 38px; padding: 7px 0; border-radius: 10px;
  border: 1px solid var(--ap-line); background: transparent; color: var(--ap-text);
  font: inherit; font-size: .8rem; font-weight: 600; cursor: pointer;
}
.days button[aria-pressed="true"] { background: var(--ap-accent); border-color: transparent; color: var(--text-primary-color, #fff); }
.days button.today { box-shadow: inset 0 -3px 0 color-mix(in srgb, var(--ap-accent) 60%, transparent); }

.timeline { display: flex; height: 30px; border-radius: 10px; overflow: hidden; background: var(--ap-line); }
.timeline .seg-block { position: relative; min-width: 2px; }
.timeline .seg-block[data-selected="true"] { outline: 2px solid var(--ap-text); outline-offset: -2px; }
.hours { display: flex; justify-content: space-between; font-size: .66rem; color: var(--ap-muted); }

.slots { display: grid; gap: 6px; }
.slot { display: flex; align-items: center; gap: 8px; padding: 7px 10px; border-radius: 12px;
  background: color-mix(in srgb, var(--ap-text) 5%, transparent); flex-wrap: wrap; }
/* the setpoint summary is the first thing to move to a line of its own */
.slot .temps { flex: 1 1 100%; order: 10; }
.slot .swatch { width: 12px; height: 12px; border-radius: 4px; flex: 0 0 auto; }
.slot .time { font-size: .86rem; font-weight: 700; color: var(--ap-text); font-variant-numeric: tabular-nums; }
.slot .zone { font-size: .82rem; color: var(--ap-text); }
.slot .temps { font-size: .72rem; color: var(--ap-muted); }
.slot .spacer { flex: 1; }
.slot select, .slot input[type="time"] {
  font: inherit; font-size: .82rem; padding: 5px 7px; border-radius: 9px; min-width: 0;
  border: 1px solid var(--ap-line); background: var(--card-background-color, #fff); color: var(--ap-text);
}

.ztable { width: 100%; border-collapse: collapse; font-size: .8rem; }
.ztable th, .ztable td { padding: 5px 4px; text-align: center; }
.ztable th { font-size: .68rem; text-transform: uppercase; letter-spacing: .04em; color: var(--ap-muted); font-weight: 600; }
.ztable th.rowhead, .ztable td.rowhead { text-align: left; white-space: nowrap; }
.ztable td .cell { display: inline-flex; align-items: center; gap: 4px; }
.ztable td .val { min-width: 42px; font-weight: 700; color: var(--ap-text); font-variant-numeric: tabular-nums; }
.ztable .zdot { width: 9px; height: 9px; border-radius: 3px; display: inline-block; margin-right: 6px; }
/* a wide table scrolls inside the card instead of widening it */
.tablewrap { overflow-x: auto; min-width: 0; }
.section { min-width: 0; }
.controls { min-width: 0; }
.controls select { max-width: 100%; }

.tabs { display: flex; gap: 6px; }
.tabs button {
  padding: 6px 14px; border-radius: 999px; border: 1px solid var(--ap-line);
  background: transparent; color: var(--ap-text); font: inherit; font-size: .8rem; font-weight: 600; cursor: pointer;
}
.tabs button[aria-pressed="true"] { background: color-mix(in srgb, var(--ap-accent) 16%, transparent); border-color: color-mix(in srgb, var(--ap-accent) 45%, transparent); color: var(--ap-accent); }

.muted { font-size: .76rem; color: var(--ap-muted); }
.empty { display: grid; gap: 8px; justify-items: center; padding: 22px 8px; color: var(--ap-muted); text-align: center; }
.empty .icon { width: 42px; height: 42px; opacity: .5; }
`,V2=R+pV;var V0={language:"auto",compact:!1,animate:!0,show_gas:!0,show_pace:!0,show_forecast:!0,show_source:!0,show_mode:!0,show_meter:!0,show_rooms:!0,show_switches:!0,show_power_note:!1},AV=["header","alerts","gas","pace","source","mode","rooms","meter"],H0=class extends HTMLElement{static getConfigElement(){return document.createElement(x5)}static getStubConfig(){return{type:`custom:${u1}`}}constructor(){super(),this.attachShadow({mode:"open"}),this._sections={},this._signatures={},this._built=!1,this._pendingSeason=null,this._open=new Set}setConfig(C){this._config={...V0,...C||{}},this._signatures={},this._hass&&this._render()}set hass(C){this._hass=C,this._render()}get hass(){return this._hass}connectedCallback(){this._timer=window.setInterval(()=>this._render(),6e4)}disconnectedCallback(){this._timer&&window.clearInterval(this._timer),this._timer=void 0}getCardSize(){return 7}getGridOptions(){return{columns:12,min_columns:6,rows:"auto"}}_build(){let C=document.createElement("style");C.textContent=V2;let e=document.createElement("ha-card"),H=document.createElement("div");H.className="wrap",H.addEventListener("click",V=>this._onClick(V)),H.addEventListener("change",V=>this._onChange(V));for(let V of AV){let r=document.createElement("div");r.dataset.section=V,this._sections[V]=r,H.appendChild(r)}e.appendChild(H),this.shadowRoot.replaceChildren(C,e),this._wrap=H,this._built=!0}_render(){if(!this._hass||!this._config)return;this._built||this._build();let C=S1(Z1(this._config,this._hass)),e=H2(this._hass,this._config),H=y5(this._hass,this._config).rooms;this._model=e,this._rooms=H;let V=["wrap",`accent-${e.source.accent}`];e.season.active==="hutes"&&V.push("cooling"),this._config.compact&&V.push("compact"),this._config.animate||V.push("no-animation");let r=V.join(" ");this._wrap.className!==r&&(this._wrap.className=r),this._section("header",this._headerHtml(e,C)),this._section("alerts",this._alertsHtml(e,H,C)),this._section("gas",this._config.show_gas?this._gasHtml(e,C):""),this._section("pace",this._config.show_pace?this._paceHtml(e,C):""),this._section("source",this._config.show_source?this._sourceHtml(e,C):""),this._section("mode",this._config.show_mode?this._modeHtml(e,C):""),this._section("rooms",this._config.show_rooms?this._roomsHtml(H,C):""),this._section("meter",this._config.show_meter?this._meterHtml(e,C):"")}_section(C,e){this._signatures[C]!==e&&(this._signatures[C]=e,this._sections[C].innerHTML=e,this._sections[C].hidden=!e,C==="meter"&&this._restoreMeterInput())}_headerHtml(C,e){let H=i(this._config.name||e("house_card_name")),V=C.season.active?`<div class="pill">${s(C.season.active==="hutes"?"snowflake":"heat")}${i(e(`season.${C.season.active}`))}</div>`:"",r=this._config.show_power_note?`<span class="tag bad" title="${i(e("ui.power_budget"))}">${s("alert")}${i(e("ui.power_budget"))}</span>`:"";return`
      <div class="header">
        <div>
          <div class="title" data-action="more-info">${H}</div>
        </div>
        <div class="spacer"></div>
        <div class="meta">${r}${V}</div>
      </div>`}_alertsHtml(C,e,H){let V=[];if(C.meter.stale&&V.push(`<div class="alert error">${s("alert")}<span>${i(H("ui.stale"))}</span></div>`),C.forecast.balance!==null&&C.forecast.balance<0&&V.push(`<div class="alert">${s("heat")}<span>${i(k(H("ui.forecast_bad"),{balance:Z(Math.abs(C.forecast.balance),this._hass,1)}))}</span></div>`),C.season.active!=="atmeneti"){let r=w(this._hass,C.entities.outside);for(let L of uC(e,sC)){let a={room:L.name,minutes:L.window.minutes,state:H(`window.${L.window.state}`).toLowerCase(),temp:r===null?"":Z(r,this._hass,0)},o=r===null?k(H("ui.window_warn"),a):k(H("ui.window_warn_cold"),a);V.push(`<div class="alert">${s("window_open")}<span>${i(o)}</span></div>`)}}return C.flags.boiler===!1&&["gaz","hibrid"].includes(C.source.key)&&V.push(`<div class="alert">${s("info")}<span>${i(H("ui.boiler_off"))}</span></div>`),C.flags.ervLock&&V.push(`<div class="alert info">${s("info")}<span>${i(H("ui.erv_lock"))}</span></div>`),V.length?`<div class="alerts">${V.join("")}</div>`:""}_gasHtml(C,e){let{gas:H}=C;if(!H.ratios)return`<div class="section"><div class="section-title">${i(e("ui.budget"))}</div>
        <div class="muted">${i(e("ui.not_configured"))}</div></div>`;let V=M=>`${(M*100).toFixed(2)}%`,r=H.ratios.allowed===null?"":`<i class="pace" style="left:${V(H.ratios.allowed)}"></i>`,L=H.ratios.reserve?`<i class="reserve" style="width:${V(H.ratios.reserve)}"></i>`:"",a=H.usedMj===null||H.budgetMj===null?"":`<div class="mj">${i(k(e("ui.megajoule"),{value:Z(H.usedMj,this._hass,0)}))} / ${i(k(e("ui.megajoule"),{value:Z(H.budgetMj,this._hass,0)}))}</div>`,o=H.daysLeft===null?"":`<span>${i(k(e("ui.days_left"),{days:Z(H.daysLeft,this._hass,0)}))}</span>`;return`
      <div class="section">
        <div class="section-title">${i(e("ui.budget"))}</div>
        <div class="barline">
          <div>
            <div class="big">${i(k(e("ui.used_of"),{used:Z(H.used,this._hass,1),total:Z(H.budget,this._hass,1)}))}</div>
            ${a}
          </div>
          <div class="muted">${i(e("ui.left"))}: <b>${i(Z(H.left,this._hass,1))} m\xB3</b></div>
        </div>
        <div class="gasbar level-${H.level}">
          <i class="fill" style="width:${V(H.ratios.used)}"></i>
          ${L}${r}
        </div>
        <div class="legend">
          <span><i class="dot pace"></i>${i(e("ui.pace_marker"))}: ${i(Z(H.allowed,this._hass,0))} m\xB3</span>
          <span><i class="dot reserve"></i>${i(e("ui.reserve"))}: ${i(Z(H.reserve,this._hass,0))} m\xB3</span>
          ${o}
        </div>
      </div>`}_paceHtml(C,e){let{pace:H,forecast:V,gas:r}=C;if(H.actual===null&&!H.unknown&&H.heatingDaily===null)return"";let L=H.heatingDaily===null?null:H.heatingDaily+(H.hotWater||0),o=[`<div class="pacebox${L!==null&&H.actual!==null&&H.actual>L?" over":""}">
        <div class="k">${i(e("ui.pace_actual"))}</div>
        <div class="v">${i(H.unknown?"\u2013":Z(H.actual,this._hass,1))}</div>
        <div class="u">${i(H.unknown?e("ui.pace_unknown"):e("ui.per_day"))}</div>
      </div>`,L===null?"":`<div class="pacebox">
            <div class="k">${i(e("ui.pace_allowed"))}</div>
            <div class="v">${i(Z(L,this._hass,1))}</div>
            <div class="u">${i(e("ui.per_day"))}</div>
          </div>`].join(""),M=H.lastsDays===null?"":r.daysLeft!==null&&H.lastsDays<r.daysLeft?`<div class="muted">${i(e("ui.lasts_short"))}</div>`:`<div class="muted">${i(k(e("ui.lasts"),{days:H.lastsDays}))}</div>`,n=H.hotWater===null?"":`<div class="muted">${i(k(e("ui.hot_water"),{value:Z(H.hotWater,this._hass,1)}))}</div>`,l=!this._config.show_forecast||V.balance===null?"":`<div class="muted">${i(V.balance<0?k(e("ui.forecast_bad"),{balance:Z(Math.abs(V.balance),this._hass,1)}):k(e("ui.forecast_ok"),{balance:Z(V.balance,this._hass,1)}))}</div>`;return`
      <div class="section">
        <div class="section-title">${i(e("ui.pace_title"))}</div>
        <div class="pacegrid">${o}</div>
        ${M}${n}${l}
      </div>`}_sourceHtml(C,e){if(!C.source.key)return"";let H=e(`source.${C.source.key}`,e("source.unknown")),V=C.source.reason?`<div class="why">${i(C.source.reason)}</div>`:"";return`
      <div class="section">
        <div class="section-title">${i(this._sourceTitle(C,e))}</div>
        <div class="sourcebox">
          <div class="ring">${s(C.source.icon)}</div>
          <div>
            <div class="label">${i(H)}</div>
            ${V}
          </div>
        </div>
      </div>`}_sourceTitle(C,e){return C.source.cooling?e("ui.source_cooling"):C.source.key==="ki"?e("ui.source_idle"):e("ui.source_title")}_modeHtml(C,e){let H=this._segment(tC.filter(l=>!C.mode.options.length||C.mode.options.includes(l.key)),C.mode.key,"mode",e),V=this._segment(rC.filter(l=>!C.season.options.length||C.season.options.includes(l.key)),C.season.choice,"season",e),r=C.mode.key==="csak_gaz"&&["klima","hibrid"].includes(C.source.key)?`<div class="muted">${s("info")} ${i(e("ui.overridden"))}</div>`:"",L=C.season.outdoor3===null?"":`<div class="muted">${i(k(e("ui.outdoor_3day"),{value:Z(C.season.outdoor3,this._hass,1)}))}</div>`,a=this._pendingSeason?`<div class="confirm">
          <div class="q">${i(e("ui.cool_confirm"))}</div>
          <div class="hint">${i(e("ui.cool_confirm_hint"))}</div>
          <div class="row">
            <button class="btn primary" type="button" data-action="season-confirm">${i(e("ui.yes"))}</button>
            <button class="btn" type="button" data-action="season-cancel">${i(e("ui.cancel"))}</button>
          </div>
        </div>`:"",o=(l,d,p,c)=>l===null?"":`<button class="chip" type="button" data-action="toggle-flag" data-entity="${i(d)}"
            aria-pressed="${l}">${s(p)}<span>${i(e(c))}</span></button>`,n=[o(C.flags.automation,C.entities.automation,"auto","ui.automation"),this._config.show_switches===!1?"":o(C.flags.boiler,C.entities.boiler,"heat","ui.boiler"),this._config.show_switches===!1?"":o(C.flags.ervLock,C.entities.erv_lock,"exhaust","ui.erv_lock_switch")].filter(Boolean).join("");return`
      <div class="section">
        ${n?`<div class="chips">${n}</div>`:""}
        <div class="section-title">${i(e("ui.mode_title"))}</div>
        <div class="seg" data-group="mode">${H}</div>
        <div class="section-title">${i(e("ui.season_title"))}</div>
        <div class="seg" data-group="season">${V}</div>
        ${L}${r}${a}
      </div>`}_roomsHtml(C,e){if(!C.length)return"";let H={t:e,hass:this._hass,season:this._model.season.active,showBoost:!0};return`
      <div class="section">
        <div class="section-title">${i(e("rooms_card_name"))}</div>
        <div class="rooms">${C.map(V=>wC(V,{...H,expanded:this._open.has(V.key)})).join("")}</div>
      </div>`}_segment(C,e,H,V){return C.map(r=>`<button type="button" data-action="${H}" data-value="${i(r.key)}"
          aria-pressed="${r.key===e}">${s(r.icon)}<span>${i(V(`${H}.${r.key}`))}</span></button>`).join("")}_meterHtml(C,e){let{meter:H}=C,V=H.lastRead?`<div class="muted">${i(k(e("ui.meter_last"),{when:this._when(H.lastRead)}))}</div>`:"",r=H.value===null?"":`<div class="muted">${i(e("ui.meter_value"))}: <b>${i(Z(H.value,this._hass,2))} m\xB3</b></div>`;return`
      <div class="section">
        <div class="section-title">${i(e("ui.meter_title"))}</div>
        ${r}
        <div class="meter">
          <label class="field">
            <span>${i(e("ui.meter_manual"))}</span>
            <input type="number" inputmode="decimal" step="0.01" data-action="meter-input"
              placeholder="${i(Z(H.manual??H.value,this._hass,2))}">
          </label>
          <button class="btn primary" type="button" data-action="meter-save">${s("check")}<span>${i(e("ui.meter_save"))}</span></button>
        </div>
        ${V}
      </div>`}_when(C){let e=new Date,H=C.toDateString()===e.toDateString(),V=B(C,this._hass);if(H)return V;let r=this._hass?.locale?.language||"hu";try{return`${new Intl.DateTimeFormat(r,{month:"short",day:"numeric"}).format(C)} ${V}`}catch{return V}}_restoreMeterInput(){let C=this._sections.meter?.querySelector('[data-action="meter-input"]');C&&this._meterDraft!==void 0&&(C.value=this._meterDraft),C&&!C.dataset.bound&&(C.dataset.bound="1",C.addEventListener("input",()=>{this._meterDraft=C.value}))}_onClick(C){let e=C.target.closest("[data-action]");if(!e||e.hasAttribute("disabled"))return;let{action:H,value:V}=e.dataset,r=this._model;if(r)switch(H){case"more-info":this._moreInfo(r.entities.source);break;case"mode":this._select(r.entities.mode,V);break;case"season":this._chooseSeason(V);break;case"season-confirm":{let L=this._pendingSeason;this._pendingSeason=null,this._select(r.entities.season_select,L);break}case"season-cancel":this._pendingSeason=null,this._render();break;case"meter-save":this._saveMeter();break;case"toggle-flag":this._haptic("medium"),this._call("input_boolean","toggle",{entity_id:e.dataset.entity});break;case"toggle-room":this._open.has(e.dataset.room)?this._open.delete(e.dataset.room):this._open.add(e.dataset.room),this._render();break;case"step":case"boost":case"hvac":this._roomAction(e);break;default:break}}_onChange(C){let e=C.target.closest("[data-action]");e&&["source","aggregation"].includes(e.dataset.action)&&this._roomAction(e)}_roomAction(C){let e=this._rooms?.find(V=>V.key===C.dataset.room);if(!e)return;b2({hass:this._hass,config:this._config,room:e,action:C.dataset.action,target:C})&&this._haptic(C.dataset.action==="boost"?"medium":"light")}_chooseSeason(C){if(C==="hutes"&&cC()){this._pendingSeason=C,this._render();return}this._pendingSeason=null,this._select(this._model.entities.season_select,C)}_saveMeter(){let C=this._sections.meter?.querySelector('[data-action="meter-input"]'),e=C?.value,H=Number(e);e===void 0||e===""||!Number.isFinite(H)||(this._haptic("medium"),this._call("input_number","set_value",{entity_id:this._model.entities.manual,value:H}),this._meterDraft="",C&&(C.value=""))}_select(C,e){!C||!e||(this._haptic("light"),this._call("input_select","select_option",{entity_id:C,option:e}))}_call(C,e,H){this._hass?.callService?.(C,e,H)}_haptic(C){this.dispatchEvent(new CustomEvent("haptic",{bubbles:!0,composed:!0,detail:C}))}_moreInfo(C){C&&this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:C},bubbles:!0,composed:!0}))}};function kC(){customElements.get(u1)||(customElements.define(u1,H0),window.customCards=window.customCards||[],window.customCards.push({type:u1,name:"F\u0171t\xE9s \xE9s g\xE1zkeret",description:"A g\xE1zkeret \xE1ll\xE1sa \xFCtemjel\xF6l\u0151vel, a napi \xFCtem, az akt\xEDv f\u0171t\xE9si forr\xE1s az indokl\xE1s\xE1val, \xFCzemm\xF3d- \xE9s \xE9vszakv\xE1lt\xF3, \xE9s a g\xE1z\xF3ra k\xE9zi leolvas\xE1sa.",preview:!0,documentationURL:"https://github.com/gabor-io/ha-appliance-custom-card"}),console.info(`%c ${u1} %c ${C2} `,"color:#fff;background:#e8710a;font-weight:700;border-radius:3px 0 0 3px","color:#e8710a;background:#fff3e0;font-weight:700;border-radius:0 3px 3px 0"))}var r0={language:"auto",compact:!1,animate:!0,show_controls:!0,show_parts:!0,show_boost:!0,show_history:null,show_zones:null},mV=Object.fromEntries(g2.map(t=>[t.key,t])),t0=class extends HTMLElement{static getConfigElement(){return document.createElement(h5)}static getStubConfig(){return{type:`custom:${v1}`,rooms:[]}}constructor(){super(),this.attachShadow({mode:"open"}),this._sections={},this._signatures={},this._built=!1,this._history={},this._historyAt=0}setConfig(C){this._config={...r0,...C||{}},this._signatures={},this._history={},this._historyAt=0,this._hass&&this._render()}set hass(C){this._hass=C,this._render(),this._loadHistory()}get hass(){return this._hass}connectedCallback(){this._timer=window.setInterval(()=>this._render(),6e4)}disconnectedCallback(){this._timer&&window.clearInterval(this._timer),this._timer=void 0}get _wantsHistory(){return this._config.show_history===null?!!this._only:!!this._config.show_history}get _wantsZones(){return this._config.show_zones===null?!!this._only:!!this._config.show_zones}async _loadHistory(){if(!this._wantsHistory||!this._hass?.callWS||this._historyLoading||Date.now()-this._historyAt<15*6e4)return;let C=this._rooms||[],e=[];for(let H of C)H.readonly||(H.historyEntity&&e.push(H.historyEntity),H.targetEntity&&e.push(H.targetEntity));if(e.length){this._historyLoading=!0;try{let H=new Date(Date.now()-nC*3600*1e3).toISOString(),V=e.filter(M=>!M.startsWith("climate.")),r=e.filter(M=>M.startsWith("climate.")),L=(M,n)=>M.length?this._hass.callWS({type:"history/history_during_period",start_time:H,entity_ids:M,minimal_response:!n,no_attributes:!n,significant_changes_only:!1}):Promise.resolve({}),[a,o]=await Promise.all([L(V,!1),L(r,!0)]);this._history={...a||{},...o||{}},this._historyAt=Date.now(),this._signatures={},this._render()}catch{this._historyAt=Date.now()}finally{this._historyLoading=!1}}}_series(C){if(!this._wantsHistory)return null;let e=(V,r)=>{let L=this._history?.[V];if(!Array.isArray(L))return[];let a=null;return L.map(o=>{r&&o.a?.current_temperature!==void 0&&(a=Number(o.a.current_temperature));let M=r?a:Number(o.s),n=Number(o.lu??o.lc);return Number.isFinite(M)&&Number.isFinite(n)?{t:n,v:M}:null}).filter(Boolean)},H=e(C.historyEntity,String(C.historyEntity).startsWith("climate."));return H.length<2?null:{points:H,targets:e(C.targetEntity,!1)}}_zones(C){if(!this._wantsZones)return null;let e=this._season==="hutes"?"hutes":"futes",H=this._config.zones||j,V=y2(this._hass,this._config,e,[C]);return H.map(r=>({key:r,colour:mV[r]?.colour||"var(--ap-line)",entity:V[r]?.[C.key]?.entity,value:V[r]?.[C.key]?.value??null})).filter(r=>r.entity&&this._hass.states[r.entity])}getCardSize(){return 2+(this._rooms?.length||1)*2}getGridOptions(){return{columns:12,min_columns:6,rows:"auto"}}get _only(){return this._config?.room||this._config?.szoba||null}_build(){let C=document.createElement("style");C.textContent=V2;let e=document.createElement("ha-card"),H=document.createElement("div");H.className="wrap",H.addEventListener("click",V=>this._onClick(V)),H.addEventListener("change",V=>this._onChange(V));for(let V of["header","rooms"]){let r=document.createElement("div");r.dataset.section=V,this._sections[V]=r,H.appendChild(r)}e.appendChild(H),this.shadowRoot.replaceChildren(C,e),this._wrap=H,this._built=!0}_render(){if(!this._hass||!this._config)return;this._built||this._build();let C=S1(Z1(this._config,this._hass)),e=y5(this._hass,this._config),H=H2(this._hass,this._config),V=this._only,r=V?e.rooms.filter(M=>M.key===V):e.rooms;this._model=e,this._rooms=r,this._season=H.season.active;let a=["wrap",`accent-${V&&r[0]?.suggestion?.accent||H.source.accent}`];this._config.compact&&a.push("compact"),this._config.animate||a.push("no-animation");let o=a.join(" ");this._wrap.className!==o&&(this._wrap.className=o),this._section("header",this._headerHtml(r,C)),this._section("rooms",this._roomsHtml(r,C))}_section(C,e){this._signatures[C]!==e&&(this._signatures[C]=e,this._sections[C].innerHTML=e,this._sections[C].hidden=!e)}_headerHtml(C,e){let H=this._only,V=H?C[0]?.name||H:e("rooms_card_name");return`<div class="header"><div><div class="title">${i(this._config.name||V)}</div></div></div>`}_roomsHtml(C,e){if(!C.length)return`<div class="empty">${s("radiator")}<div>${i(e("ui.no_rooms"))}</div></div>`;let H={t:e,hass:this._hass,season:this._season,showControls:this._config.show_controls,showParts:this._config.show_parts,showBoost:this._config.show_boost};return`<div class="rooms">${C.map(V=>bC(V,{...H,series:this._series(V),zones:this._zones(V)})).join("")}</div>`}_room(C){return this._rooms?.find(e=>e.key===C)||null}_act(C){let e=C.target.closest("[data-action]");if(!e||e.hasAttribute("disabled"))return;if(e.dataset.action==="zone-step"){b2({hass:this._hass,config:this._config,room:null,action:"zone-step",target:e})&&this._haptic("light");return}let H=this._room(e.dataset.room);if(!H)return;b2({hass:this._hass,config:this._config,room:H,action:e.dataset.action,target:e})&&this._haptic(e.dataset.action==="boost"?"medium":"light")}_onClick(C){this._act(C)}_onChange(C){this._act(C)}_haptic(C){this.dispatchEvent(new CustomEvent("haptic",{bubbles:!0,composed:!0,detail:C}))}};function OC(){customElements.get(v1)||(customElements.define(v1,t0),window.customCards=window.customCards||[],window.customCards.push({type:v1,name:"F\u0171t\xE9s \u2013 szob\xE1k",description:"Szob\xE1nk\xE9nti m\xE9rt \xE9s c\xE9lh\u0151m\xE9rs\xE9klet, k\xE9zi fel\xFCl\xEDr\xE1s, forr\xE1sjavaslat az indokl\xE1s\xE1val, ablak\xE1llapot \xE9s boost \u2013 mindig helper entit\xE1sokon kereszt\xFCl. Egy szob\xE1ra sz\u0171k\xEDthet\u0151.",preview:!0,documentationURL:"https://github.com/gabor-io/ha-appliance-custom-card"}),console.info(`%c ${v1} %c ${C2} `,"color:#fff;background:#1a73e8;font-weight:700;border-radius:3px 0 0 3px","color:#1a73e8;background:#fff3e0;font-weight:700;border-radius:0 3px 3px 0"))}var i0={language:"auto",compact:!1,animate:!0,show_timeline:!0,show_zones:!0},w5=Object.fromEntries(g2.map(t=>[t.key,t])),EC=Object.fromEntries(Object.values(q).map(t=>[t,[]])),TC=t=>String(t).length===5?`${t}:00`:String(t),L0=class extends HTMLElement{static getConfigElement(){return document.createElement(f5)}static getStubConfig(){return{type:`custom:${x1}`,rooms:[]}}constructor(){super(),this.attachShadow({mode:"open"}),this._sections={},this._signatures={},this._built=!1,this._day=B1[(new Date().getDay()+6)%7],this._tab=null,this._copyOpen=!1,this._blocksByEntity={},this._idByEntity={},this._group=0,this._loading=!1,this._error=null}setConfig(C){this._config={...i0,...C||{}},this._signatures={},this._blocksByEntity={},this._idByEntity={},this._group=0,this._hass&&this._render()}set hass(C){let e=this._hass;this._hass=C,(this._config?b5(this._config):[]).some(r=>!this._blocksByEntity[r.entity]||e?.states?.[r.entity]!==C?.states?.[r.entity])&&this._loadBlocks(),this._render()}get hass(){return this._hass}getCardSize(){return 9}getGridOptions(){return{columns:12,min_columns:8,rows:"auto"}}get _groups(){return b5(this._config)}get _entity(){let C=this._groups;return(C[this._group]||C[0])?.entity}get _season(){return this._tab?this._tab:this._houseSeason==="hutes"?"hutes":"futes"}async _resolveScheduleId(C,e){if(this._config.schedule_id)return this._config.schedule_id;try{let r=await this._hass.callWS({type:"config/entity_registry/get",entity_id:e});if(r?.unique_id&&C.some(L=>L.id===r.unique_id))return r.unique_id}catch{}if(C.length===1)return C[0].id;let H=e.split(".")[1];return C.find(r=>String(r.name||"").toLowerCase().replace(/[^a-z0-9]+/g,"_")===H)?.id||null}async _loadBlocks(){if(this._loading||!this._hass?.callWS)return;let C=b5(this._config);if(C.some(e=>D(this._hass,e.entity))){this._loading=!0;try{let e=await this._hass.callWS({type:"schedule/list"}),H={},V={};for(let r of C){if(!D(this._hass,r.entity))continue;let L=r.id||await this._resolveScheduleId(e||[],r.entity),a=(e||[]).find(o=>o.id===L);V[r.entity]=L,H[r.entity]=a?Object.fromEntries(Object.values(q).map(o=>[o,a[o]||[]])):{...EC},a?.name&&(this._names={...this._names,[r.entity]:a.name})}this._blocksByEntity=H,this._idByEntity=V,this._error=null}catch(e){this._error=String(e?.message||e)}finally{this._loading=!1,this._signatures={},this._render()}}}async _save(C){let e=this._entity,H=this._idByEntity[e];if(!(!H||!this._hass?.callWS)){this._blocksByEntity={...this._blocksByEntity,[e]:C},this._signatures={},this._render();try{await this._hass.callWS({type:"schedule/update",schedule_id:H,name:this._names?.[e]||this._config.name||"F\u0171t\xE9s",...C})}catch(V){this._error=String(V?.message||V),this._loadBlocks()}}}_build(){let C=document.createElement("style");C.textContent=V2;let e=document.createElement("ha-card"),H=document.createElement("div");H.className="wrap",H.addEventListener("click",V=>this._onClick(V)),H.addEventListener("change",V=>this._onChange(V));for(let V of["header","tabs","days","timeline","slots","copy","zones"]){let r=document.createElement("div");r.dataset.section=V,this._sections[V]=r,H.appendChild(r)}e.appendChild(H),this.shadowRoot.replaceChildren(C,e),this._wrap=H,this._built=!0}_render(){if(!this._hass||!this._config)return;this._built||this._build();let C=S1(Z1(this._config,this._hass)),e=H2(this._hass,this._config);this._houseSeason=e.season.active;let H=this._groups,V=H[this._group]||H[0],r=vC(this._hass,this._config,this._blocksByEntity[V.entity],V.entity),L=V.rooms.length?V.rooms:S2(this._config).filter(M=>!M.readonly);this._model=r,this._rooms=L;let a=["wrap",`accent-${this._season==="hutes"?"cool":"gas"}`];this._config.compact&&a.push("compact"),this._config.animate||a.push("no-animation");let o=a.join(" ");this._wrap.className!==o&&(this._wrap.className=o),this._section("header",this._headerHtml(r,C)),this._section("tabs",`${this._plansHtml(H,C)}${this._tabsHtml(C)}`),this._section("days",r.ok?this._daysHtml(C):""),this._section("timeline",r.ok&&this._config.show_timeline?this._timelineHtml(r,C):""),this._section("slots",r.ok?this._bandsHtml(r,L,C):this._emptyHtml(r,C)),this._section("copy",this._copyHtml(C)),this._section("zones",this._config.show_zones?this._zonesHtml(r,L,C):"")}_section(C,e){this._signatures[C]!==e&&(this._signatures[C]=e,this._sections[C].innerHTML=e,this._sections[C].hidden=!e)}_emptyHtml(C,e){let H=this._error?this._error:C.reason==="loading"?e("ui.loading"):e("ui.no_schedule");return`<div class="empty">${s("calendar")}<div>${i(H)}</div></div>`}_headerHtml(C,e){let H=i(this._config.name||e("schedule_card_name")),V=C.zoneNow?`<div class="pill">${s(w5[C.zoneNow]?.icon||"calendar")}${i(k(e("ui.current_zone"),{zone:e(`zone.${C.zoneNow}`,C.zoneNow)}))}</div>`:"",r=C.nextEvent?`<div class="sub">${i(k(e("ui.next_change"),{zone:e(`zone.${C.zoneNow===C.zoneOn?C.zoneOff:C.zoneOn}`),time:B(C.nextEvent,this._hass)}))}</div>`:"";return`
      <div class="header">
        <div>
          <div class="title">${H}</div>
          ${r}
        </div>
        <div class="spacer"></div>
        <div class="meta">${V}</div>
      </div>`}_plansHtml(C,e){return C.length<2?"":`
      <div class="tabs plans">
        ${C.map((H,V)=>`<button type="button" data-action="plan" data-value="${V}" aria-pressed="${V===this._group}">
                ${i(H.label||e("ui.plan_rooms"))}</button>`).join("")}
      </div>`}_tabsHtml(C){let e=this._season;return`
      <div class="tabs">
        <button type="button" data-action="tab" data-value="futes" aria-pressed="${e==="futes"}">${i(C("ui.heating_tab"))}</button>
        <button type="button" data-action="tab" data-value="hutes" aria-pressed="${e==="hutes"}">${i(C("ui.cooling_tab"))}</button>
      </div>`}_daysHtml(C){let e=B1[(new Date().getDay()+6)%7];return`
      <div class="days">
        ${B1.map(H=>`<button type="button" class="${H===e?"today":""}" data-action="day" data-value="${H}"
              aria-pressed="${H===this._day}" title="${i(C(`day_long.${H}`))}">${i(C(`day.${H}`))}</button>`).join("")}
      </div>`}_timelineHtml(C,e){let V=(C.days[this._day]||[]).map(r=>{let L=w5[r.zone]?.colour||"var(--ap-line)",a=(r.end-r.start)/1440*100,o=`${_2(r.start)}\u2013${_2(r.end)} ${e(`zone.${r.zone}`,r.zone)}`;return`<i class="seg-block" style="flex:0 0 ${a.toFixed(3)}%;background:${L}" title="${i(o)}"></i>`}).join("");return`
      <div class="section">
        <div class="section-title">${i(e("ui.timeline_title"))}</div>
        <div class="timeline">${V}</div>
        <div class="hours"><span>0</span><span>6</span><span>12</span><span>18</span><span>24</span></div>
      </div>`}_bandsHtml(C,e,H){let V=q[this._day],r=C.blocks?.[V]||[],L=y2(this._hass,this._config,this._season,e),a=n=>e.map(l=>{let d=L[n]?.[l.key];return d&&d.value!==null?`${l.name} ${Z(d.value,this._hass,1)}`:null}).filter(Boolean).join(" \xB7 "),o=r.map((n,l)=>{let d=w5[C.zoneOn];return`
          <div class="slot" data-index="${l}">
            <i class="swatch" style="background:${d?.colour||"var(--ap-line)"}"></i>
            <span class="zone">${i(H(`zone.${C.zoneOn}`,C.zoneOn))}</span>
            <input type="time" value="${i(String(n.from).slice(0,5))}" data-action="band-from">
            <span class="zone">\u2013</span>
            <input type="time" value="${i(String(n.to).slice(0,5))}" data-action="band-to">
            <div class="spacer"></div>
            <button class="step-btn" type="button" data-action="band-remove" title="${i(H("ui.remove_slot"))}">\u2212</button>
            <div class="temps">${i(a(C.zoneOn))}</div>
          </div>`}).join(""),M=`<div class="muted">${s("night")} ${i(k(H("ui.outside_bands"),{zone:H(`zone.${C.zoneOff}`,C.zoneOff)}))}${a(C.zoneOff)?` \xB7 ${i(a(C.zoneOff))}`:""}</div>`;return`
      <div class="section">
        <div class="section-title">${i(H("ui.slots_title"))}</div>
        <div class="slots">${o||`<div class="muted">${i(H("ui.no_bands"))}</div>`}</div>
        ${M}
        <div class="controls">
          <button class="chip" type="button" data-action="band-add">${s("clock")}<span>${i(H("ui.add_slot"))}</span></button>
          <button class="chip" type="button" data-action="copy-open">${s("calendar")}<span>${i(H("ui.copy_day"))}</span></button>
        </div>
        <div class="muted">${i(H("ui.schedule_hint"))}</div>
      </div>`}_copyHtml(C){if(!this._copyOpen)return"";let e=B1.filter(H=>H!==this._day).map(H=>`<label class="chip"><input type="checkbox" data-copy="${H}"> <span>${i(C(`day_long.${H}`))}</span></label>`).join("");return`
      <div class="section">
        <div class="section-title">${i(C("ui.copy_to"))}</div>
        <div class="chips">${e}</div>
        <div class="controls">
          <button class="btn primary" type="button" data-action="copy-apply">${i(C("ui.save"))}</button>
          <button class="btn" type="button" data-action="copy-cancel">${i(C("ui.cancel"))}</button>
        </div>
      </div>`}_zonesHtml(C,e,H){if(!e.length)return`<div class="muted">${i(H("ui.no_rooms"))}</div>`;let V=this._config.zones||C.zones||j,r=y2(this._hass,this._config,this._season,e),L=e.map(o=>`<th>${i(o.name)}</th>`).join(""),a=V.map(o=>{let M=w5[o],n=e.map(l=>{let d=r[o]?.[l.key];return!d||!D(this._hass,d.entity)?'<td class="muted">\u2013</td>':`<td><input class="val" type="number" step="${h1}" min="${f1}" max="${g1}"
              value="${d.value===null?"":d.value}"
              data-action="zone-temp" data-entity="${i(d.entity)}"></td>`}).join("");return`<tr>
          <td class="rowhead"><i class="zdot" style="background:${M?.colour||"var(--ap-line)"}"></i>${i(H(`zone.${o}`,o))}</td>
          ${n}
        </tr>`}).join("");return`
      <div class="section">
        <div class="section-title">${i(H("ui.zones_title"))} \xB7 ${i(this._season==="hutes"?H("ui.cooling_tab"):H("ui.heating_tab"))}</div>
        <div class="tablewrap">
          <table class="ztable">
            <thead><tr><th class="rowhead"></th>${L}</tr></thead>
            <tbody>${a}</tbody>
          </table>
        </div>
      </div>`}_onClick(C){let e=C.target.closest("[data-action]");if(!e||e.hasAttribute("disabled"))return;let{action:H,value:V}=e.dataset;switch(H){case"plan":this._group=Number(V),this._signatures={},this._render();break;case"tab":this._tab=V,this._signatures={},this._render();break;case"day":this._day=V,this._render();break;case"band-add":this._addBand();break;case"band-remove":this._removeBand(Number(e.closest(".slot").dataset.index));break;case"copy-open":this._copyOpen=!0,this._render();break;case"copy-cancel":this._copyOpen=!1,this._render();break;case"copy-apply":this._applyCopy();break;default:break}}_onChange(C){let e=C.target.closest("[data-action]");if(!e)return;let{action:H}=e.dataset;if(H==="zone-temp"){let V=Number(e.value);if(!e.dataset.entity||!Number.isFinite(V))return;this._hass.callService("input_number","set_value",{entity_id:e.dataset.entity,value:V});return}if(H==="band-from"||H==="band-to"){let V=Number(e.closest(".slot").dataset.index);this._editBand(V,H==="band-from"?{from:TC(e.value)}:{to:TC(e.value)})}}_week(){return{...EC,...this._blocksByEntity[this._entity]||{}}}_normalise(C){return[...C].filter(e=>t1(e.to)>t1(e.from)).sort((e,H)=>t1(e.from)-t1(H.from)).filter((e,H,V)=>H===0||t1(V[H-1].to)<=t1(e.from))}_writeDay(C,e){let H=this._week();H[C]=this._normalise(e),this._save(H)}_editBand(C,e){let H=q[this._day],V=(this._week()[H]||[]).map((r,L)=>L===C?{...r,...e}:r);this._writeDay(H,V)}_removeBand(C){let e=q[this._day];this._writeDay(e,(this._week()[e]||[]).filter((H,V)=>V!==C))}_addBand(){let C=q[this._day],e=this._week()[C]||[],H=(this._model.days[this._day]||[]).filter(o=>o.zone===this._model.zoneOff);if(!H.length)return;let V=H.reduce((o,M)=>M.end-M.start>o.end-o.start?M:o),r=V.end-V.start,L=V.start+Math.max(0,Math.round(r/3/15)*15),a=Math.min(1440,L+Math.max(60,Math.round(r/3/15)*15));a<=L||this._writeDay(C,[...e,{from:`${_2(L)}:00`,to:a===1440?"24:00:00":`${_2(a)}:00`}])}_applyCopy(){let e=[...this._sections.copy.querySelectorAll("[data-copy]")].filter(r=>r.checked).map(r=>r.dataset.copy);if(this._copyOpen=!1,!e.length){this._render();return}let H=this._week(),V=H[q[this._day]]||[];for(let r of e)H[q[r]]=V.map(L=>({...L}));this._save(H)}};function $C(){customElements.get(x1)||(customElements.define(x1,L0),window.customCards=window.customCards||[],window.customCards.push({type:x1,name:"F\u0171t\xE9s \u2013 \xFCtemterv",description:"Heti \xFCtemterv sz\xEDnes id\u0151vonallal a Home Assistant be\xE9p\xEDtett schedule helpere f\xF6l\xF6tt, komfort s\xE1vok szerkeszt\xE9s\xE9vel \xE9s z\xF3n\xE1nk\xE9nti h\u0151m\xE9rs\xE9klet-t\xE1bl\xE1zattal, f\u0171t\xE9sre \xE9s h\u0171t\xE9sre.",preview:!0,documentationURL:"https://github.com/gabor-io/ha-appliance-custom-card"}),console.info(`%c ${x1} %c ${C2} `,"color:#fff;background:#3d9970;font-weight:700;border-radius:3px 0 0 3px","color:#3d9970;background:#fff3e0;font-weight:700;border-radius:0 3px 3px 0"))}var cV=`
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
.hint { font-size: .78rem; color: var(--secondary-text-color, #70757a); }
`;function a0({cardName:t,toggles:C,defaults:e}){return class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}setConfig(V){this._config={...V},this._render()}set hass(V){let r=!this._hass;this._hass=V,r&&this._render()}_render(){if(!this._config||!this._hass)return;let V=S1(Z1(this._config,this._hass)),r=[`<option value="auto">${i(V("editor.language_auto"))}</option>`,...J3.map(a=>`<option value="${a}" ${this._config.language===a?"selected":""}>${a.toUpperCase()}</option>`)].join(""),L=C.map(a=>{let o=this._config[a]??e[a]??!1;return`<label class="toggle"><input type="checkbox" data-key="${a}" ${o?"checked":""}>
            <span>${i(V(`editor.${a}`))}</span></label>`}).join("");this.shadowRoot.innerHTML=`
        <style>${cV}</style>
        <div class="form">
          <label>${i(V("editor.name"))}
            <input type="text" data-key="name" value="${i(this._config.name||"")}">
          </label>
          <label>${i(V("editor.language"))}
            <select data-key="language">${r}</select>
          </label>
          <label>${i(V("editor.prefix"))}
            <input type="text" data-key="prefix" value="${i(this._config.prefix||"")}" placeholder="futes">
          </label>
          <div class="title">${i(V("editor.sections"))}</div>
          <div class="toggles">${L}</div>
        </div>`,this.shadowRoot.querySelectorAll("[data-key]").forEach(a=>a.addEventListener("change",o=>this._onChange(o)))}_onChange(V){let r=V.target,L=r.dataset.key,a={...this._config,type:this._config.type||`custom:${t}`};r.type==="checkbox"?a[L]=r.checked:r.value===""?delete a[L]:a[L]=r.value,this._config=a,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:a},bubbles:!0,composed:!0}))}}}var uV=a0({cardName:u1,toggles:["show_gas","show_pace","show_forecast","show_source","show_mode","show_meter","show_rooms","show_switches","show_power_note","compact","animate"],defaults:V0}),vV=a0({cardName:v1,toggles:["show_controls","show_parts","show_boost","show_history","show_zones","compact","animate"],defaults:r0}),xV=a0({cardName:x1,toggles:["show_timeline","show_zones","compact","animate"],defaults:i0});function RC(){let t=[[x5,uV],[h5,vV],[f5,xV]];for(let[C,e]of t)customElements.get(C)||customElements.define(C,e)}RC();kC();OC();$C();
