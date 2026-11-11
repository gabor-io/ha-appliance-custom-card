/*! ha-appliance-cards v1.24.0 - https://github.com/gabor-io/ha-appliance-custom-card - MIT licence */
var y="house-heating-card",C1="house-heating-card-editor",B="heating-rooms-card",H1="heating-rooms-card-editor",_="heating-schedule-card",V1="heating-schedule-card-editor",G="1.24.0",y1={meter:"sensor.gazora_allas",manual:"input_number.gazora_kezi_allas",manual_time:"input_datetime.gazora_kezi_idopont",stale:"binary_sensor.gazadat_elavult",budget:"sensor.gazkeret_m3",used:"sensor.gazkeret_felhasznalt",left:"sensor.gazkeret_maradek",allowed:"sensor.gazkeret_megengedett_eddig",reserve:"input_number.gazkeret_tartalek",days_left:"sensor.gazkeret_hatralevo_nap",pace:"sensor.gaz_napi_utem",heating_daily:"sensor.gaz_futesi_keret_napi",hot_water_daily:"input_number.gaz_melegviz_napi",forecast:"sensor.gaz_elorejelzes_csak_gaz",balance:"sensor.gaz_elorejelzes_egyenleg",mode:"input_select.futes_mod",season_select:"input_select.klima_evszak",season_active:"sensor.klima_evszak_aktiv",source:"sensor.futes_forras",reason:"sensor.futes_forras_indoklas",boiler:"input_boolean.kazan_uzemkesz",automation:"input_boolean.futes_automatika",erv_lock:"input_boolean.szellozteto_gaz_retesz",schedule:"schedule.futes_komfort",zone_select:"input_select.futes_zona",outside:null,outdoor_3day:null},B1={temperature:["sensor","homerseklet"],target:["sensor","cel"],override:["input_number","felulir"],override_until:["input_datetime","felulir_vege"],source:["input_select","forras"],active:["sensor","aktiv"],window:["sensor","ablak"],paused:["binary_sensor","szunetel"],preheat:["sensor",null],frost:["binary_sensor","fagyveszely"],target_number:["input_number","cel"],mode:["input_select","uzemmod"],lagging:["binary_sensor","elmarad"],suggestion:["sensor","forras_javaslat"],suggestion_reason:["sensor","forras_indoklas"],leading:["sensor","mertado"],aggregation:["input_select","aggregalas"],overshoot:["binary_sensor","tulloves_korlat"]},_1=[{key:"auto",icon:"auto"},{key:"csak_gaz",icon:"heat"},{key:"csak_klima",icon:"ac"},{key:"tavol",icon:"away"},{key:"ki",icon:"power"}],P1=[{key:"auto",icon:"auto"},{key:"futes",icon:"heat"},{key:"hutes",icon:"snowflake"}];var T1={gaz:{icon:"heat",accent:"gas"},hibrid:{icon:"manual",accent:"hybrid"},klima:{icon:"ac",accent:"ac"},hutes:{icon:"snowflake",accent:"cool"},fagyvedelem:{icon:"frost_guard",accent:"frost"},ki:{icon:"power",accent:"idle"}},F1={radiator:{icon:"radiator",accent:"gas"},klima_futes:{icon:"ac",accent:"ac"},klima_hutes:{icon:"snowflake",accent:"cool"},aeno:{icon:"reheat",accent:"gas"},nincs:{icon:"power",accent:"idle"}},R1={gaz:{icon:"heat",accent:"gas"},klima:{icon:"ac",accent:"ac"},hutes:{icon:"snowflake",accent:"cool"},aeno:{icon:"reheat",accent:"gas"},szunetel:{icon:"window_open",accent:"idle"},ki:{icon:"power",accent:"idle"}},E1={zarva:{icon:"window_closed",warn:!1},buko:{icon:"window_open",warn:!0},nyitva:{icon:"window_open",warn:!0}},D1={hideg:"cold",huvos:"cold",h\u0171v\u00F6s:"cold",kellemes:"good",meleg:"warm","tul meleg":"hot","t\xFAl meleg":"hot"},L1=["klima","gaz","hutes","aeno"],A1=.5,d1=1.5,p1={default:{start:-.05,stop:.15,hardStop:null},aeno:{start:-.1,stop:.1,hardStop:.3}},g=["komfort","ejszaka"],j=[{key:"komfort",icon:"heat",colour:"#f5b301"},{key:"ejszaka",icon:"night",colour:"#3f6fd8"},{key:"eco",icon:"leaf",colour:"#3d9970"},{key:"tavol",icon:"away",colour:"#9aa0a6"},{key:"fagyvedelem",icon:"frost_guard",colour:"#7fc6e8"}],K3=j.map(V=>V.key),N=["mon","tue","wed","thu","fri","sat","sun"],P=.5,T=5,F=30,M1={month:5,day:1},r1={month:9,day:30},z1=24,N1=30;function $1(V,C,H){let L=V?.language&&V.language!=="auto"?V.language:null,M=(C?.locale?.language||C?.language||"en").slice(0,2).toLowerCase(),r=L||M;return H.includes(r)?r:"en"}function W1(V,C,H="en"){let L=V[C]||V[H],M=V[H],r=(t,i)=>i.split(".").reduce((o,a)=>o?o[a]:void 0,t);return(t,i="")=>{let o=r(L,t);if(o!==void 0)return o;let a=r(M,t);return a!==void 0?a:i}}var u3={house_card_name:"F\u0171t\xE9s \xE9s g\xE1zkeret",rooms_card_name:"Szob\xE1k",schedule_card_name:"F\u0171t\xE9si \xFCtemterv",mode:{auto:"Automata",csak_gaz:"Csak g\xE1z",csak_klima:"Csak kl\xEDma",tavol:"T\xE1vol",ki:"Ki"},season:{auto:"Automata",futes:"F\u0171t\xE9s",hutes:"H\u0171t\xE9s",atmeneti:"\xC1tmeneti"},source:{auto:"Automata",gaz:"G\xE1z",hibrid:"Hibrid",klima:"Kl\xEDma",hutes:"H\u0171t\xE9s",aeno:"Infrapanel",fagyvedelem:"Fagyv\xE9delem",ki:"Ki",unknown:"Ismeretlen"},hvac:{heat:"F\u0171t\xE9s",cool:"H\u0171t\xE9s",off:"Ki",auto:"Automata",heat_cool:"F\u0171t\xE9s/h\u0171t\xE9s"},suggestion:{gaz:"G\xE1z f\u0171t",klima:"Kl\xEDma f\u0171t",hutes:"Kl\xEDma h\u0171t",aeno:"Infrapanel",szunetel:"Sz\xFCnetel",ki:"Nem f\u0171t"},active:{radiator:"Radi\xE1tor",klima_futes:"Kl\xEDma f\u0171t",klima_hutes:"Kl\xEDma h\u0171t",aeno:"Infrapanel",nincs:"Nem f\u0171t"},window:{zarva:"Z\xE1rva",buko:"Buk\xF3ban",nyitva:"Nyitva"},zone:{komfort:"Komfort",ejszaka:"\xC9jszaka",eco:"Eco",tavol:"T\xE1vol",fagyvedelem:"Fagyv\xE9delem"},day:{mon:"H",tue:"K",wed:"Sze",thu:"Cs",fri:"P",sat:"Szo",sun:"V"},day_long:{mon:"h\xE9tf\u0151",tue:"kedd",wed:"szerda",thu:"cs\xFCt\xF6rt\xF6k",fri:"p\xE9ntek",sat:"szombat",sun:"vas\xE1rnap"},aggregation:{auto:"Automata",atlag:"\xC1tlag",auto_heat:"a leghidegebb pont",auto_cool:"a legmelegebb pont",average:"a h\xE1rom m\xE9r\u0151 \xE1tlaga"},ui:{budget:"G\xE1zkeret",used_of:"{used} / {total} m\xB3",megajoule:"{value} MJ",pace_marker:"Eddig elhaszn\xE1lhat\xF3",reserve:"Tartal\xE9k",left:"Marad\xE9k",days_left:"H\xE1tral\xE9v\u0151 nap: {days}",pace_title:"\xDCtem",pace_actual:"Mostani",pace_allowed:"F\u0171t\xE9sre engedett",per_day:"m\xB3/nap",pace_unknown:"m\xE9g nincs el\xE9g leolvas\xE1s",lasts:"Ezzel az \xFCtemmel a keret ~{days} napig tart",lasts_short:"Ezzel az \xFCtemmel a keret nem tart ki az id\u0151szak v\xE9g\xE9ig",forecast_title:"El\u0151rejelz\xE9s",forecast_ok:"Csak g\xE1zzal is belef\xE9rne: {balance} m\xB3 maradna",forecast_bad:"Csak g\xE1zzal {balance} m\xB3-rel l\xE9pn\xE9 t\xFAl a keretet",hot_water:"Melegv\xEDz \xE9s f\u0151z\xE9s: {value} m\xB3/nap",source_title:"Most f\u0171t",source_cooling:"Most h\u0171t",source_idle:"F\u0171t\xE9si forr\xE1s",season_title:"\xC9vszak",outdoor_3day:"3 napos kinti \xE1tlag: {value} \xB0C",mode_title:"\xDCzemm\xF3d",overridden:"A rendszer fel\xFClb\xEDr\xE1lta a v\xE1laszt\xE1st",boiler_off:"A kaz\xE1n nincs \xFCzemk\xE9sz \xE1llapotban",erv_lock:"A szell\u0151ztet\u0151 g\xE1zreteszt kapott",window_warn:"{room} ablaka {minutes} perce {state}",window_warn_cold:"{room} ablaka {minutes} perce {state}, kint {temp} \xB0C",meter_title:"G\xE1z\xF3ra",meter_value:"\xD3ra\xE1ll\xE1s",meter_manual:"K\xE9zi leolvas\xE1s",meter_save:"R\xF6gz\xEDt",meter_last:"Utols\xF3 leolvas\xE1s: {when}",stale:"Az \xF3ra\xE1ll\xE1s 24 \xF3r\xE1n\xE1l r\xE9gebbi \u2013 olvasd le a g\xE1z\xF3r\xE1t",power_budget:"\xC1ramkeret: elfogyott",cool_confirm:"F\u0171t\xE9si id\xE9nyben k\xE9zi h\u0171t\xE9s \u2013 biztos?",cool_confirm_hint:"Okt\xF3ber \xE9s \xE1prilis k\xF6z\xF6tt a rendszer mag\xE1t\xF3l soha nem h\u0171t.",yes:"Igen, h\u0171ts\xF6n",cancel:"M\xE9gsem",now:"Most",target:"C\xE9l",boost:"Boost 1 \xF3ra",paused_window:"Sz\xFCnetel \u2013 ablak nyitva",override_until:"Fel\xFCl\xEDrva {when}-ig",preheat:"El\u0151f\u0171t\xE9s indul {when}",precool:"El\u0151h\u0171t\xE9s indul {when}",readonly:"Csak m\xE9r\xE9s",frost_risk:"Fagyvesz\xE9ly",leading:"m\xE9rvad\xF3",kitchen_excluded:"a f\u0151z\xE9s miatt kihagyva",overshoot:"Egy pont t\xFAll\xF6v\xE9s miatt korl\xE1toz",no_rooms:"Add meg a szob\xE1kat a k\xE1rtya be\xE1ll\xEDt\xE1saiban",aggregation_title:"Z\xF3na\xE9rt\xE9k",learning:"tanul\u2026",learning_detail:"{source} \xB7 {from} \xB0C-r\xF3l {target} \xB0C-ra",learned_title:"Tanult sebess\xE9g",predicted:"{minutes} perc m\xFAlva \u2248 {value} \xB0C",trend_rate:"Trend: {value} \xB0C/\xF3ra",verdict_start:"a f\u0171t\xE9s indul",verdict_stop:"a f\u0171t\xE9s le\xE1ll",verdict_cool_start:"a h\u0171t\xE9s indul",verdict_cool_stop:"a h\u0171t\xE9s le\xE1ll",learned_rate:"{source} {value} \xB0C/\xF3ra",felt:"H\u0151\xE9rzet {value} \xB0C",humidity:"P\xE1ratartalom",lagging:"A kl\xEDma nem b\xEDrja",history_hint:"Az elm\xFAlt 24 \xF3ra \u2013 a vonal a m\xE9rt h\u0151m\xE9rs\xE9klet, a l\xE9pcs\u0151 a c\xE9l",thermostat_off:"Kikapcsolva",automation:"F\u0171t\xE9sautomatika",boiler:"Kaz\xE1n \xFCzemk\xE9sz",erv_lock_switch:"Szell\u0151ztet\u0151 g\xE1zretesz",zones_title:"Z\xF3nah\u0151m\xE9rs\xE9kletek",timeline_title:"Napi menetrend",slots_title:"Szakaszok",plan_rooms:"Szob\xE1k",band_until:"{zone} {time}-ig",copy_day:"Nap m\xE1sol\xE1sa",copy_to:"M\xE1sol\xE1s ezekre a napokra",add_slot:"Szakasz hozz\xE1ad\xE1sa",remove_slot:"Szakasz t\xF6rl\xE9se",heating_tab:"F\u0171t\xE9s",cooling_tab:"H\u0171t\xE9s",current_zone:"Most: {zone}",next_change:"{zone} {time}-kor",no_schedule:"Nincs be\xE1ll\xEDtva heti \xFCtemterv",no_bands:"Ezen a napon nincs komfort s\xE1v",outside_bands:"A s\xE1vokon k\xEDv\xFCl: {zone}",loading:"\xDCtemterv bet\xF6lt\xE9se\u2026",schedule_hint:"A s\xE1vok a Home Assistant heti \xFCtemez\u0151j\xE9t \xEDrj\xE1k",save:"Ment\xE9s",saving:"Ment\xE9s\u2026",minute_short:"p",hour_short:"\xF3",unavailable:"Nem el\xE9rhet\u0151",not_configured:"Nincs be\xE1ll\xEDtva"},editor:{language:"Nyelv",language_auto:"Automatikus",name:"N\xE9v",sections:"Megjelen\u0151 r\xE9szek",custom:"Egyedi (YAML-ben)",prefix:"Entit\xE1s-el\u0151tag",show_gas:"G\xE1zkeret",show_pace:"\xDCtem",show_forecast:"El\u0151rejelz\xE9s",show_source:"Akt\xEDv forr\xE1s",show_mode:"\xDCzemm\xF3d \xE9s \xE9vszak",show_meter:"G\xE1z\xF3ra",show_rooms:"Szobalista",show_history:"24 \xF3r\xE1s g\xF6rbe",show_switches:"Kaz\xE1n \xE9s retesz kapcsol\xF3",show_power_note:"\xC1ramkeret jelz\xE9s",show_rooms:"Szob\xE1k",show_zones:"Z\xF3nat\xE1bl\xE1zat",show_timeline:"Id\u0151vonal",compact:"T\xF6m\xF6r elrendez\xE9s",animate:"Anim\xE1ci\xF3k"}},c3={house_card_name:"Heating and gas budget",rooms_card_name:"Rooms",schedule_card_name:"Heating schedule",mode:{auto:"Automatic",csak_gaz:"Gas only",csak_klima:"Heat pump only",tavol:"Away",ki:"Off"},season:{auto:"Automatic",futes:"Heating",hutes:"Cooling",atmeneti:"Shoulder season"},source:{auto:"Automatic",gaz:"Gas",hibrid:"Hybrid",klima:"Heat pump",hutes:"Cooling",aeno:"Infrared panel",fagyvedelem:"Frost guard",ki:"Off",unknown:"Unknown"},hvac:{heat:"Heat",cool:"Cool",off:"Off",auto:"Auto",heat_cool:"Heat/cool"},suggestion:{gaz:"Gas",klima:"Heat pump",hutes:"Cooling",aeno:"Infrared panel",szunetel:"Paused",ki:"Not heating"},active:{radiator:"Radiator",klima_futes:"Heat pump heating",klima_hutes:"Heat pump cooling",aeno:"Infrared panel",nincs:"Not heating"},window:{zarva:"Closed",buko:"On the latch",nyitva:"Open"},zone:{komfort:"Comfort",ejszaka:"Night",eco:"Eco",tavol:"Away",fagyvedelem:"Frost guard"},day:{mon:"Mo",tue:"Tu",wed:"We",thu:"Th",fri:"Fr",sat:"Sa",sun:"Su"},day_long:{mon:"Monday",tue:"Tuesday",wed:"Wednesday",thu:"Thursday",fri:"Friday",sat:"Saturday",sun:"Sunday"},aggregation:{auto:"Automatic",atlag:"Average",auto_heat:"the coldest point",auto_cool:"the warmest point",average:"the average of the three sensors"},ui:{budget:"Gas budget",used_of:"{used} / {total} m\xB3",megajoule:"{value} MJ",pace_marker:"Allowed so far",reserve:"Reserve",left:"Left",days_left:"Days left: {days}",pace_title:"Pace",pace_actual:"Current",pace_allowed:"Allowed for heating",per_day:"m\xB3/day",pace_unknown:"not enough readings yet",lasts:"At this pace the budget lasts ~{days} days",lasts_short:"At this pace the budget will not last to the end of the period",forecast_title:"Forecast",forecast_ok:"Gas alone would fit, with {balance} m\xB3 to spare",forecast_bad:"Gas alone would overshoot the budget by {balance} m\xB3",hot_water:"Hot water and cooking: {value} m\xB3/day",source_title:"Heating now",source_cooling:"Cooling now",source_idle:"Heat source",season_title:"Season",outdoor_3day:"Three-day outdoor average: {value} \xB0C",mode_title:"Mode",overridden:"The system overrode this choice",boiler_off:"The boiler is not ready to heat",erv_lock:"The ventilator holds a gas interlock",window_warn:"{room}: window {state} for {minutes} minutes",window_warn_cold:"{room}: window {state} for {minutes} minutes, {temp} \xB0C outside",meter_title:"Gas meter",meter_value:"Reading",meter_manual:"Manual reading",meter_save:"Save",meter_last:"Last reading: {when}",stale:"The meter reading is over 24 hours old - please read the meter",power_budget:"Electricity budget: used up",cool_confirm:"Manual cooling during the heating season - are you sure?",cool_confirm_hint:"Between October and April the system never cools on its own.",yes:"Yes, cool",cancel:"Cancel",now:"Now",target:"Target",boost:"Boost 1 hour",paused_window:"Paused - window open",override_until:"Overridden until {when}",preheat:"Pre-heating starts at {when}",precool:"Pre-cooling starts at {when}",readonly:"Measurement only",frost_risk:"Frost risk",leading:"leading",kitchen_excluded:"left out while cooking",overshoot:"One point is capping the room",no_rooms:"Add the rooms in the card settings",aggregation_title:"Zone value",learning:"learning...",learning_detail:"{source} \xB7 from {from} \xB0C to {target} \xB0C",learned_title:"Learned rate",predicted:"in {minutes} minutes \u2248 {value} \xB0C",trend_rate:"Trend: {value} \xB0C/h",verdict_start:"heating starts",verdict_stop:"heating stops",verdict_cool_start:"cooling starts",verdict_cool_stop:"cooling stops",learned_rate:"{source} {value} \xB0C/h",felt:"Feels like {value} \xB0C",humidity:"Humidity",lagging:"The heat pump cannot keep up",history_hint:"The last 24 hours - the line is measured, the step is the target",thermostat_off:"Off",automation:"Heating automation",boiler:"Boiler ready",erv_lock_switch:"Ventilator gas interlock",zones_title:"Zone temperatures",timeline_title:"Daily plan",slots_title:"Segments",plan_rooms:"Rooms",band_until:"{zone} until {time}",copy_day:"Copy day",copy_to:"Copy to these days",add_slot:"Add segment",remove_slot:"Remove segment",heating_tab:"Heating",cooling_tab:"Cooling",current_zone:"Now: {zone}",next_change:"{zone} at {time}",no_schedule:"No weekly schedule is configured",no_bands:"No comfort band on this day",outside_bands:"Outside the bands: {zone}",loading:"Loading the schedule...",schedule_hint:"The bands are stored in Home Assistant's own weekly schedule",save:"Save",saving:"Saving...",minute_short:"min",hour_short:"h",unavailable:"Unavailable",not_configured:"Not configured"},editor:{language:"Language",language_auto:"Automatic",name:"Name",sections:"Sections",custom:"Custom (in YAML)",prefix:"Entity prefix",show_gas:"Gas budget",show_pace:"Pace",show_forecast:"Forecast",show_source:"Active source",show_mode:"Mode and season",show_meter:"Gas meter",show_rooms:"Room list",show_history:"24 hour chart",show_switches:"Boiler and interlock switches",show_power_note:"Electricity budget note",show_rooms:"Rooms",show_zones:"Zone table",show_timeline:"Timeline",compact:"Compact layout",animate:"Animations"}},I1={hu:u3,en:c3},n1=Object.keys(I1);function R(V,C){return $1(V,C,n1)}function E(V){return W1(I1,V)}function v(V,C){return String(V).replace(/\{(\w+)\}/g,(H,L)=>C[L]===void 0||C[L]===null?H:String(C[L]))}var S3="futes";function q(V){return{...y1,...V?.entities||{}}}function m1(V,C,H,L){return`${V}.${C}_${H}_${L}`}function Y(V){let C=V?.prefix||S3;return(V?.rooms||[]).filter(H=>H&&(H.key||H.entity)).map(H=>{let L=H.key||H.name||"",M={};for(let[o,[a,d]]of Object.entries(B1))d&&(M[o]=m1(a,C,L,d));M.preheat=`sensor.${C}_elofutes_${L}`,M.learning=`input_text.${C}_tanulas_${L}`,M.trend=`sensor.${C}_trend_${L}`,H.humidity&&(M.humidity=H.humidity),H.history&&(M.history=H.history),H.climate&&(M.climate=H.climate);let r=(H.parts||[]).map(o=>({key:o.key,name:o.name||o.key,comfortKey:o.comfort_key||o.key,humidity:o.humidity||null,entity:o.entity||m1("sensor",C,L,o.key),excluded:o.excluded||m1("binary_sensor",C,L,`${o.key}_kizarva`)})),t={};for(let o of L1)t[o]=H.learned?.[o]||`input_number.${C}_tanult_${L}_${o}`;let i=H.comfort_key||L;return{key:L,name:H.name||L,comfortKey:i,learnedIds:t,readonly:!!H.readonly,scheduleEntity:H.schedule_entity||null,scheduleId:H.schedule_id||null,boost:H.boost,parts:r,entities:{...M,...H.entities||{}}}})}function G1(V,C,H,L){return`${C==="hutes"?V?.cool_prefix||"input_number.hutes_zona":V?.heat_prefix||"input_number.futes_zona"}_${H}_${L}`}function u(V,C){return C?V?.states?.[C]:void 0}function Z(V,C){return u(V,C)?.state}function b(V){return V==null||V==="unavailable"||V==="unknown"}function l(V,C){let H=Z(V,C);if(b(H))return null;let L=Number(H);return Number.isFinite(L)?L:null}function O(V,C){return Z(V,C)==="on"}function U(V,C){let H=u(V,C)?.attributes;return Array.isArray(H?.options)?H.options:[]}function e1(V,C){let H=u(V,C);if(!H||b(H.state))return null;let L=H.attributes?.timestamp?H.attributes.timestamp*1e3:Date.parse(H.state),M=new Date(L);return Number.isFinite(M.getTime())?M:null}function U1(V){return V?Math.max(0,Math.round((Date.now()-V.getTime())/6e4)):null}var h3=34.92,l1=V=>Math.min(1,Math.max(0,V));function g3(V,C,H,L){if(V==null||C===null||C===void 0)return null;let M=Math.min(d1,Math.max(-d1,V)),r=C+M*A1,t=null;return H!=null&&(r<H+L.start?t="start":(r>H+L.stop||L.hardStop!==null&&C>=H+L.hardStop)&&(t="stop")),{rate:V,clamped:M,clipped:M!==V,predicted:r,minutes:Math.round(A1*60),direction:V>.05?"up":V<-.05?"down":"flat",verdict:t}}function O3(V){let[C,H,L,M,r]=String(V).split("|"),t=Number(C);return{raw:V,startedAt:Number.isFinite(t)?new Date(t*1e3):null,from:Number(H),source:L||null,target:Number(M),up:r!=="le"}}function Q1(V,C,H){if(!H)return null;let L=`${C?.felt_prefix||"sensor.hoerzet"}_${H}`,M=`${C?.comfort_prefix||"sensor.komfort"}_${H}`,r=l(V,L),t=Z(V,M);if(r===null&&(!t||b(t)))return null;let i=String(t||"").split("\xB7")[0].trim().toLowerCase();return{felt:r,text:b(t)?null:t,level:D1[i]||null}}function Q(V,C){let H=q(C),L=Number(C?.heating_value)||h3,M=l(V,H.used),r=l(V,H.budget),t=l(V,H.left),i=l(V,H.allowed),o=l(V,H.reserve),a=l(V,H.days_left),d=M!==null||r!==null,n=r&&r>0?{used:l1((M||0)/r),allowed:i===null?null:l1(i/r),reserve:o===null?0:l1(o/r)}:null,m="ok";M!==null&&i!==null&&M>i&&(m="warn"),M!==null&&r!==null&&o!==null&&M>r-o&&(m="bad");let x=l(V,H.pace),k=x===null&&b(Z(V,H.pace)),W=l(V,H.heating_daily),I=l(V,H.hot_water_daily),s=t===null?null:t-(o||0),S=x&&x>0&&s!==null?Math.floor(s/x):null,z=l(V,H.balance),h=Z(V,H.source),c=T1[h]||null,s3=e1(V,H.manual_time);return{ok:d,reason:d?null:"not_configured",entities:H,gas:{used:M,budget:r,left:t,allowed:i,reserve:o,daysLeft:a,ratios:n,level:m,usedMj:M===null?null:Math.round(M*L),budgetMj:Number(C?.budget_mj)||(r===null?null:Math.round(r*L))},pace:{actual:x,unknown:k,heatingDaily:W,hotWater:I,lastsDays:S},forecast:{gasOnly:l(V,H.forecast),balance:z},source:{key:b(h)?null:h,icon:c?.icon||"info",accent:c?.accent||"idle",reason:Z(V,H.reason),cooling:h==="hutes"},season:{choice:Z(V,H.season_select)||null,active:Z(V,H.season_active)||null,options:U(V,H.season_select),outdoor3:l(V,H.outdoor_3day),outside:l(V,H.outside)},mode:{key:Z(V,H.mode)||null,options:U(V,H.mode)},meter:{value:l(V,H.meter),manual:l(V,H.manual),lastRead:s3,stale:O(V,H.stale)},flags:{automation:u(V,H.automation)?O(V,H.automation):null,automationEntity:H.automation,boiler:u(V,H.boiler)?O(V,H.boiler):null,ervLock:u(V,H.erv_lock)?O(V,H.erv_lock):null}}}function j1(V=new Date){let C=V.getMonth()+1,H=V.getDate(),L=C>M1.month||C===M1.month&&H>=M1.day,M=C<r1.month||C===r1.month&&H<=r1.day;return!(L&&M)}function t1(V,C){let H=Y(C).map(L=>{let M=L.entities,r=Z(V,M.window),t=E1[r]||null,i=u(V,M.window)?.last_changed?new Date(u(V,M.window).last_changed):null,o=Z(V,M.active),a=F1[o]||null,d=Z(V,M.suggestion),n=R1[d]||null,m=L.parts.map(c=>({key:c.key,name:c.name,value:l(V,c.entity),humidity:l(V,c.humidity),excluded:O(V,c.excluded),comfort:Q1(V,C,c.comfortKey)})),x=M.climate?u(V,M.climate):null,k=x?.attributes?.temperature,W=x?.attributes?.current_temperature,I=L.readonly?null:k!=null?Number(k):l(V,M.target_number)??l(V,M.target),s=l(V,M.temperature)??W??null,S=Z(V,M.learning),z=S&&!b(S)&&S.trim()!==""?O3(S):null,h={};for(let c of L1)h[c]=l(V,L.learnedIds?.[c]);return{key:L.key,name:L.name,readonly:L.readonly,temperature:s,target:I,climate:x?{entity:M.climate,mode:x.state,modes:x.attributes?.hvac_modes||[],step:x.attributes?.target_temp_step||P,min:x.attributes?.min_temp??T,max:x.attributes?.max_temp??F,action:x.attributes?.hvac_action||null}:null,mode:{value:Z(V,M.mode),options:U(V,M.mode),entity:M.mode},learning:z,learned:h,trend:g3(l(V,M.trend),s,I,h.aeno!==null?p1.aeno:p1.default),humidity:l(V,M.humidity),lagging:O(V,M.lagging),historyEntity:M.history||M.temperature||M.climate||null,targetEntity:M.target_number||null,boost:L.boost,schedule:f3(V,C,L.scheduleEntity),comfort:Q1(V,C,L.comfortKey),active:a?{key:o,...a}:null,suggestion:n?{key:d,...n,reason:Z(V,M.suggestion_reason)}:null,window:t?{state:r,icon:t.icon,warn:t.warn,minutes:U1(i)}:null,paused:O(V,M.paused),override:{value:l(V,M.override),until:e1(V,M.override_until),entity:M.override},source:{value:Z(V,M.source),options:U(V,M.source),entity:M.source},preheat:e1(V,M.preheat),preheatDirection:u(V,M.preheat)?.attributes?.irany||null,frost:O(V,M.frost),parts:m,leading:Z(V,M.leading)||null,aggregation:{value:Z(V,M.aggregation),options:U(V,M.aggregation),entity:M.aggregation},overshoot:O(V,M.overshoot),unavailable:b(Z(V,M.temperature)),entities:M}});return{ok:H.length>0,reason:H.length?null:"no_rooms",rooms:H}}function f3(V,C,H){let L=q(C),M=H||C?.schedule_entity||L.schedule,r=u(V,M);if(!r)return null;let t=C?.zone_on||g[0],i=C?.zone_off||g[1],o=r.attributes?.next_event?new Date(r.attributes.next_event):null;return{entity:M,own:!!H,zone:r.state==="on"?t:i,nextEvent:o&&Number.isFinite(o.getTime())?o:null}}function q1(V,C){return V.filter(H=>H.window?.warn&&(H.window.minutes??0)>=C)}var K1=V=>String(V).padStart(2,"0");function X(V){let C=(Math.round(V)%1440+1440)%1440;return`${K1(Math.floor(C/60))}:${K1(C%60)}`}var f={mon:"monday",tue:"tuesday",wed:"wednesday",thu:"thursday",fri:"friday",sat:"saturday",sun:"sunday"};function w(V){let[C,H]=String(V).split(":"),L=Number(C)*60+Number(H||0);return Number.isFinite(L)?L:null}function k3(V,C,H){let L=(V||[]).map(t=>({start:w(t.from),end:w(t.to)})).filter(t=>t.start!==null&&t.end!==null&&t.end>t.start).sort((t,i)=>t.start-i.start),M=[],r=0;return L.forEach((t,i)=>{t.start>r&&M.push({start:r,end:t.start,zone:H,index:null}),M.push({start:t.start,end:t.end,zone:C,index:i}),r=t.end}),r<1440&&M.push({start:r,end:1440,zone:H,index:null}),M}function Y1(V,C,H,L){let M=q(C),r=L||C?.schedule_entity||M.schedule,t=u(V,r),i=C?.zone_on||g[0],o=C?.zone_off||g[1],a={};for(let m of N)a[m]=k3(H?.[f[m]],i,o);let d=t?.attributes?.next_event,n=d?new Date(d):null;return{ok:!!t&&!!H,reason:t?H?null:"loading":"no_schedule",entityId:r,zoneOn:i,zoneOff:o,zones:C?.zones||g,zoneNow:t?t.state==="on"?i:o:null,nextEvent:n&&Number.isFinite(n.getTime())?n:null,days:a,blocks:H||null}}function i1(V){let C=q(V),H=V?.schedule_entity||C.schedule,L=new Map;for(let M of Y(V)){if(M.readonly)continue;let r=M.scheduleEntity||H;L.has(r)||L.set(r,{entity:r,id:M.scheduleId||null,rooms:[]});let t=L.get(r);t.rooms.push(M),M.scheduleId&&(t.id=M.scheduleId)}return L.size||L.set(H,{entity:H,id:null,rooms:[]}),[...L.values()].sort((M,r)=>r.rooms.length-M.rooms.length).map(M=>({...M,label:M.rooms.length&&M.rooms.length<=2?M.rooms.map(r=>r.name).join(", "):null}))}function J(V,C,H,L){let M={};for(let r of C?.zones||g){M[r]={};for(let t of L){let i=G1(C,H,r,t.key);M[r][t.key]={entity:i,value:l(V,i)}}}return M}var X1="M6.59,0.66C8.93,-1.15 11.47,1.06 12.04,4.5C12.47,4.5 12.89,4.62 13.27,4.84C13.79,4.24 14.25,3.42 14.07,2.5C13.65,0.35 16.06,-1.39 18.35,1.58C20.16,3.92 17.95,6.46 14.5,7.03C14.5,7.46 14.39,7.89 14.16,8.27C14.76,8.78 15.58,9.24 16.5,9.06C18.63,8.64 20.38,11.04 17.41,13.34C15.07,15.15 12.53,12.94 11.96,9.5C11.53,9.5 11.11,9.37 10.74,9.15C10.22,9.75 9.75,10.58 9.93,11.5C10.35,13.64 7.94,15.39 5.65,12.42C3.83,10.07 6.05,7.53 9.5,6.97C9.5,6.54 9.63,6.12 9.85,5.74C9.25,5.23 8.43,4.76 7.5,4.94C5.37,5.36 3.62,2.96 6.59,0.66M5,16H7A2,2 0 0,1 9,18V24H7V22H5V24H3V18A2,2 0 0,1 5,16M5,18V20H7V18H5M12.93,16H15L12.07,24H10L12.93,16M18,16H21V18H18V22H21V24H18A2,2 0 0,1 16,22V18A2,2 0 0,1 18,16Z",v1="M19,18.31V20A2,2 0 0,1 17,22H7A2,2 0 0,1 5,20V16.3C4.54,16.12 3.95,16 3,16A1,1 0 0,1 2,15A1,1 0 0,1 3,14C3.82,14 4.47,14.08 5,14.21V12.3C4.54,12.12 3.95,12 3,12A1,1 0 0,1 2,11A1,1 0 0,1 3,10C3.82,10 4.47,10.08 5,10.21V8.3C4.54,8.12 3.95,8 3,8A1,1 0 0,1 2,7A1,1 0 0,1 3,6C3.82,6 4.47,6.08 5,6.21V4A2,2 0 0,1 7,2H17A2,2 0 0,1 19,4V6.16C20.78,6.47 21.54,7.13 21.71,7.29C22.1,7.68 22.1,8.32 21.71,8.71C21.32,9.1 20.8,9.09 20.29,8.71V8.71C20.29,8.71 19.25,8 17,8C15.74,8 14.91,8.41 13.95,8.9C12.91,9.41 11.74,10 10,10C9.64,10 9.31,10 9,9.96V7.95C9.3,8 9.63,8 10,8C11.26,8 12.09,7.59 13.05,7.11C14.09,6.59 15.27,6 17,6V4H7V20H17V18C18.5,18 18.97,18.29 19,18.31M17,10C15.27,10 14.09,10.59 13.05,11.11C12.09,11.59 11.26,12 10,12C9.63,12 9.3,12 9,11.95V13.96C9.31,14 9.64,14 10,14C11.74,14 12.91,13.41 13.95,12.9C14.91,12.42 15.74,12 17,12C19.25,12 20.29,12.71 20.29,12.71V12.71C20.8,13.1 21.32,13.1 21.71,12.71C22.1,12.32 22.1,11.69 21.71,11.29C21.5,11.08 20.25,10 17,10M17,14C15.27,14 14.09,14.59 13.05,15.11C12.09,15.59 11.26,16 10,16C9.63,16 9.3,16 9,15.95V17.96C9.31,18 9.64,18 10,18C11.74,18 12.91,17.41 13.95,16.9C14.91,16.42 15.74,16 17,16C19.25,16 20.29,16.71 20.29,16.71V16.71C20.8,17.1 21.32,17.1 21.71,16.71C22.1,16.32 22.1,15.69 21.71,15.29C21.5,15.08 20.25,14 17,14Z";var J1="M13,13H11V7H13M13,17H11V15H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z";var C2="M12,2L1,21H23M12,6L19.53,19H4.47M11,10V14H13V10M11,16V18H13V16";var H2="M13,9V15H16L12,19L8,15H11V9H8L12,5L16,9H13M4,2H20V4H4V2M4,20H20V22H4V20Z";var V2="M6 14H9L5 18L1 14H4C4 11.3 5.7 6.6 11 6.1V8.1C7.6 8.6 6 11.9 6 14M20 14C20 11.3 18.3 6.6 13 6.1V8.1C16.4 8.7 18 11.9 18 14H15L19 18L23 14H20Z";var L2="M12,6V9L16,5L12,1V4A8,8 0 0,0 4,12C4,13.57 4.46,15.03 5.24,16.26L6.7,14.8C6.25,13.97 6,13 6,12A6,6 0 0,1 12,6M18.76,7.74L17.3,9.2C17.74,10.04 18,11 18,12A6,6 0 0,1 12,18V15L8,19L12,23V20A8,8 0 0,0 20,12C20,10.43 19.54,8.97 18.76,7.74Z";var M2="M9.5 18V9H8V18M12.75 18V9H11.25V18M16 18V9H14.5V18M17.03 6C18.11 6 19 6.88 19 8V19C19 20.13 18.11 21 17.03 21C17.03 21.58 16.56 22 16 22C15.5 22 15 21.58 15 21H9C9 21.58 8.5 22 8 22C7.44 22 6.97 21.58 6.97 21C5.89 21 5 20.13 5 19V8C5 6.88 5.89 6 6.97 6H9V3C9 2.42 9.46 2 10 2H14C14.54 2 15 2.42 15 3V6M10.5 3.5V6H13.5V3.5M17.03 19V8H6.97V19";var r2="M16,20H8V6H16M16.67,4H15V2H9V4H7.33A1.33,1.33 0 0,0 6,5.33V20.67C6,21.4 6.6,22 7.33,22H16.67A1.33,1.33 0 0,0 18,20.67V5.33C18,4.6 17.4,4 16.67,4Z";var e2="M10,21H14A2,2 0 0,1 12,23A2,2 0 0,1 10,21M21,19V20H3V19L5,17V11C5,7.9 7.03,5.17 10,4.29C10,4.19 10,4.1 10,4A2,2 0 0,1 12,2A2,2 0 0,1 14,4C14,4.1 14,4.19 14,4.29C16.97,5.17 19,7.9 19,11V17L21,19M17,11A5,5 0 0,0 12,6A5,5 0 0,0 7,11V18H17V11M19.75,3.19L18.33,4.61C20.04,6.3 21,8.6 21,11H23C23,8.07 21.84,5.25 19.75,3.19M1,11H3C3,8.6 3.96,6.3 5.67,4.61L4.25,3.19C2.16,5.25 1,8.07 1,11Z";var t2="M12,18V6A6,6 0 0,1 18,12A6,6 0 0,1 12,18M20,15.31L23.31,12L20,8.69V4H15.31L12,0.69L8.69,4H4V8.69L0.69,12L4,15.31V20H8.69L12,23.31L15.31,20H20V15.31Z";var i2="M19.36,2.72L20.78,4.14L15.06,9.85C16.13,11.39 16.28,13.24 15.38,14.44L9.06,8.12C10.26,7.22 12.11,7.37 13.65,8.44L19.36,2.72M5.93,17.57C3.92,15.56 2.69,13.16 2.35,10.92L7.23,8.83L14.67,16.27L12.58,21.15C10.34,20.81 7.94,19.58 5.93,17.57Z";var o2="M7 11H9V13H7V11M21 5V19C21 20.11 20.11 21 19 21H5C3.89 21 3 20.1 3 19V5C3 3.9 3.9 3 5 3H6V1H8V3H16V1H18V3H19C20.11 3 21 3.9 21 5M5 7H19V5H5V7M19 19V9H5V19H19M15 13V11H17V13H15M11 13V11H13V13H11M7 15H9V17H7V15M15 17V15H17V17H15M11 17V15H13V17H11Z";var a2="M6,11L7,7H17L18,11M18.92,6C18.71,5.4 18.14,5 17.5,5H6.5C5.86,5 5.29,5.4 5.08,6L3,12V20A1,1 0 0,0 4,21H5A1,1 0 0,0 6,20V18H18V20A1,1 0 0,0 19,21H20A1,1 0 0,0 21,20V12L18.92,6M7,16H5V14H7V16M19,16H17V14H19V16M14,16H10V14H14V16Z",A2="M4,3V6H1V20H23V6H20V3H14V6H10V3H4M3,8H21V18H3V8M15,10V12H13V14H15V16H17V14H19V12H17V10H15M5,12V14H11V12H5Z";var d2="M12,3C7,3 3,7 3,12C3,17 7,21 12,21C17,21 21,17 21,12C21,7 17,3 12,3M12,19C8.1,19 5,15.9 5,12C5,8.1 8.1,5 12,5C15.9,5 19,8.1 19,12C19,15.9 15.9,19 12,19M20.5,20.5C22.7,18.3 24,15.3 24,12C24,8.7 22.7,5.7 20.5,3.5L19.4,4.6C21.3,6.5 22.5,9.1 22.5,12C22.5,14.9 21.3,17.5 19.4,19.4L20.5,20.5M4.6,19.4C2.7,17.5 1.5,14.9 1.5,12C1.5,9.1 2.7,6.5 4.6,4.6L3.5,3.5C1.3,5.7 0,8.7 0,12C0,15.3 1.3,18.3 3.5,20.5L4.6,19.4M9.5,7V17H11.5V13H13.5A2,2 0 0,0 15.5,11V9A2,2 0 0,0 13.5,7H9.5M11.5,9H13.5V11H11.5V9Z";var p2="M23 8C23 4.13 19.87 1 16 1C12.47 1 9.57 3.61 9.08 7H4.5C3.84 7 3.28 7.42 3.08 8L1 14V22C1 22.55 1.45 23 2 23H3C3.55 23 4 22.55 4 22V21H16V22C16 22.55 16.45 23 17 23H18C18.55 23 19 22.55 19 22V14.32C21.36 13.19 23 10.79 23 8M4.5 8.5H9.03C9.15 10.26 9.92 11.84 11.11 13H3L4.5 8.5M4.5 18C3.67 18 3 17.33 3 16.5S3.67 15 4.5 15 6 15.67 6 16.5 5.33 18 4.5 18M15.5 18C14.67 18 14 17.33 14 16.5S14.67 15 15.5 15 17 15.67 17 16.5 16.33 18 15.5 18M16 13C14.61 13 13.44 12.5 12.47 11.53C11.5 10.56 11 9.39 11 8C11 6.64 11.5 5.46 12.47 4.5C13.44 3.5 14.61 3 16 3C17.36 3 18.54 3.5 19.5 4.5C20.5 5.46 21 6.64 21 8C21 9.39 20.5 10.56 19.5 11.53C18.54 12.5 17.36 13 16 13M16.5 8.25L19.36 9.94L18.61 11.16L15 9V4H16.5V8.25Z";var n2="M6.5 5C5.84 5 5.28 5.42 5.08 6L3 12V20A1 1 0 0 0 4 21H5A1 1 0 0 0 6 20V19H11.3A7 7 0 0 1 11 17A7 7 0 0 1 14.41 11H5L6.5 6.5H17.5L18.68 10.03A7 7 0 0 1 20.47 10.46L18.92 6C18.72 5.42 18.16 5 17.5 5H6.5M17 12C16.87 12 16.76 12.09 16.74 12.21L16.55 13.53C16.25 13.66 15.96 13.82 15.7 14L14.46 13.5C14.35 13.5 14.22 13.5 14.15 13.63L13.15 15.36C13.09 15.47 13.11 15.6 13.21 15.68L14.27 16.5C14.25 16.67 14.24 16.83 14.24 17C14.24 17.17 14.25 17.33 14.27 17.5L13.21 18.32C13.12 18.4 13.09 18.53 13.15 18.64L14.15 20.37C14.21 20.5 14.34 20.5 14.46 20.5L15.7 20C15.96 20.18 16.24 20.35 16.55 20.47L16.74 21.79C16.76 21.91 16.86 22 17 22H19C19.11 22 19.22 21.91 19.24 21.79L19.43 20.47C19.73 20.34 20 20.18 20.27 20L21.5 20.5C21.63 20.5 21.76 20.5 21.83 20.37L22.83 18.64C22.89 18.53 22.86 18.4 22.77 18.32L21.7 17.5C21.72 17.33 21.74 17.17 21.74 17C21.74 16.83 21.73 16.67 21.7 16.5L22.76 15.68C22.85 15.6 22.88 15.47 22.82 15.36L21.82 13.63C21.76 13.5 21.63 13.5 21.5 13.5L20.27 14C20 13.82 19.73 13.65 19.42 13.53L19.23 12.21C19.22 12.09 19.11 12 19 12H17M6.5 13A1.5 1.5 0 0 1 8 14.5A1.5 1.5 0 0 1 6.5 16A1.5 1.5 0 0 1 5 14.5A1.5 1.5 0 0 1 6.5 13M18 15.5C18.83 15.5 19.5 16.17 19.5 17C19.5 17.83 18.83 18.5 18 18.5C17.16 18.5 16.5 17.83 16.5 17C16.5 16.17 17.17 15.5 18 15.5Z",m2="M5,14H19L17.5,9.5H6.5L5,14M17.5,19A1.5,1.5 0 0,0 19,17.5A1.5,1.5 0 0,0 17.5,16A1.5,1.5 0 0,0 16,17.5A1.5,1.5 0 0,0 17.5,19M6.5,19A1.5,1.5 0 0,0 8,17.5A1.5,1.5 0 0,0 6.5,16A1.5,1.5 0 0,0 5,17.5A1.5,1.5 0 0,0 6.5,19M18.92,9L21,15V23A1,1 0 0,1 20,24H19A1,1 0 0,1 18,23V22H6V23A1,1 0 0,1 5,24H4A1,1 0 0,1 3,23V15L5.08,9C5.28,8.42 5.85,8 6.5,8H17.5C18.15,8 18.72,8.42 18.92,9M12,0C14.12,0 16.15,0.86 17.65,2.35L16.23,3.77C15.11,2.65 13.58,2 12,2C10.42,2 8.89,2.65 7.77,3.77L6.36,2.35C7.85,0.86 9.88,0 12,0M12,4C13.06,4 14.07,4.44 14.82,5.18L13.4,6.6C13.03,6.23 12.53,6 12,6C11.5,6 10.97,6.23 10.6,6.6L9.18,5.18C9.93,4.44 10.94,4 12,4Z",l2="M16,6L15,6.75L17.5,10H13.5V8.5H12V10H3C1.89,10 1,10.89 1,12V15H3A3,3 0 0,0 6,18A3,3 0 0,0 9,15H15A3,3 0 0,0 18,18A3,3 0 0,0 21,15H23V12C23,10.89 22.11,10 21,10H19L16,6M6,13.5A1.5,1.5 0 0,1 7.5,15A1.5,1.5 0 0,1 6,16.5A1.5,1.5 0 0,1 4.5,15A1.5,1.5 0 0,1 6,13.5M18,13.5A1.5,1.5 0 0,1 19.5,15A1.5,1.5 0 0,1 18,16.5A1.5,1.5 0 0,1 16.5,15A1.5,1.5 0 0,1 18,13.5Z";var v2="M19,14H16V16H19V14M22,21H3V11L11,3H21A1,1 0 0,1 22,4V21M11.83,5L5.83,11H20V5H11.83Z";var x2="M3,6H16L19,10H21C22.11,10 23,10.89 23,12V15H21A3,3 0 0,1 18,18A3,3 0 0,1 15,15H9A3,3 0 0,1 6,18A3,3 0 0,1 3,15H1V8C1,6.89 1.89,6 3,6M2.5,7.5V10H10.5V7.5H2.5M12,7.5V10H17.14L15.25,7.5H12M6,13.5A1.5,1.5 0 0,0 4.5,15A1.5,1.5 0 0,0 6,16.5A1.5,1.5 0 0,0 7.5,15A1.5,1.5 0 0,0 6,13.5M18,13.5A1.5,1.5 0 0,0 16.5,15A1.5,1.5 0 0,0 18,16.5A1.5,1.5 0 0,0 19.5,15A1.5,1.5 0 0,0 18,13.5Z";var Z2="M13,4.8C9,4.8 9,19.2 13,19.2C17,19.2 22,16.5 22,12C22,7.5 17,4.8 13,4.8M13.1,17.2C12.7,16.8 12,15 12,12C12,9 12.7,7.2 13.1,6.8C16,6.9 20,8.7 20,12C20,15.3 16,17.1 13.1,17.2M2,5H9.5C9.3,5.4 9,5.8 8.9,6.4C8.8,6.6 8.8,6.8 8.7,7H2V5M8,11H2V9H8.2C8.1,9.6 8.1,10.3 8,11M8.7,17C8.9,17.8 9.2,18.4 9.6,19H2.1V17H8.7M8.2,15H2V13H8C8.1,13.7 8.1,14.4 8.2,15Z";var s2="M18 15C18 17.6 16.8 19.9 14.9 21.3L14.4 20.8L12.3 18.7L13.7 17.3L14.9 18.5C15.4 17.8 15.8 16.9 15.9 16H14V14H15.9C15.7 13.1 15.4 12.3 14.9 11.5L13.7 12.7L12.3 11.3L13.5 10.1C12.8 9.6 11.9 9.2 11 9.1V11H9V9.1C8.1 9.3 7.3 9.6 6.5 10.1L9.5 13.1C9.7 13.1 9.8 13 10 13C11.11 13 12 13.9 12 15S11.11 17 10 17 8 16.11 8 15C8 14.8 8 14.7 8.1 14.5L5.1 11.5C4.6 12.2 4.2 13.1 4.1 14H6V16H4.1C4.3 16.9 4.6 17.7 5.1 18.5L6.3 17.3L7.7 18.7L5.1 21.3C3.2 19.9 2 17.6 2 15C2 10.58 5.58 7 10 7S18 10.58 18 15M23 5C23 3.34 21.66 2 20 2S17 3.34 17 5C17 6.3 17.84 7.4 19 7.82V11H21V7.82C22.16 7.4 23 6.3 23 5M20 6C19.45 6 19 5.55 19 5S19.45 4 20 4 21 4.45 21 5 20.55 6 20 6Z";var u2="M16,10L15.8,11H13.5A0.5,0.5 0 0,0 13,11.5A0.5,0.5 0 0,0 13.5,12H15.6L14.6,17H12.5A0.5,0.5 0 0,0 12,17.5A0.5,0.5 0 0,0 12.5,18H14.4L14,20A2,2 0 0,1 12,22A2,2 0 0,1 10,20L9,15H10.5A0.5,0.5 0 0,0 11,14.5A0.5,0.5 0 0,0 10.5,14H8.8L8,10C8,8.8 8.93,7.77 10.29,7.29L8.9,5.28C8.59,4.82 8.7,4.2 9.16,3.89C9.61,3.57 10.23,3.69 10.55,4.14L11,4.8V3A1,1 0 0,1 12,2A1,1 0 0,1 13,3V5.28L14.5,3.54C14.83,3.12 15.47,3.07 15.89,3.43C16.31,3.78 16.36,4.41 16,4.84L13.87,7.35C15.14,7.85 16,8.85 16,10Z";var c2="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z";var S2="M12.5,1.5C10.73,1.5 9.17,2.67 8.67,4.37C8.14,4.13 7.58,4 7,4A4,4 0 0,0 3,8C3,9.82 4.24,11.41 6,11.87V19H19V11.87C20.76,11.41 22,9.82 22,8A4,4 0 0,0 18,4C17.42,4 16.86,4.13 16.33,4.37C15.83,2.67 14.27,1.5 12.5,1.5M12,10.5H13V17.5H12V10.5M9,12.5H10V17.5H9V12.5M15,12.5H16V17.5H15V12.5M6,20V21A1,1 0 0,0 7,22H18A1,1 0 0,0 19,21V20H6Z";var h2="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z";var g2="M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z";var O2="M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z";var f2="M4,4H20A2,2 0 0,1 22,6V18A2,2 0 0,1 20,20H4A2,2 0 0,1 2,18V6A2,2 0 0,1 4,4M4,6V18H11V6H4M20,18V6H18.76C19,6.54 18.95,7.07 18.95,7.13C18.88,7.8 18.41,8.5 18.24,8.75L15.91,11.3L19.23,11.28L19.24,12.5L14.04,12.47L14,11.47C14,11.47 17.05,8.24 17.2,7.95C17.34,7.67 17.91,6 16.5,6C15.27,6.05 15.41,7.3 15.41,7.3L13.87,7.31C13.87,7.31 13.88,6.65 14.25,6H13V18H15.58L15.57,17.14L16.54,17.13C16.54,17.13 17.45,16.97 17.46,16.08C17.5,15.08 16.65,15.08 16.5,15.08C16.37,15.08 15.43,15.13 15.43,15.95H13.91C13.91,15.95 13.95,13.89 16.5,13.89C19.1,13.89 18.96,15.91 18.96,15.91C18.96,15.91 19,17.16 17.85,17.63L18.37,18H20M8.92,16H7.42V10.2L5.62,10.76V9.53L8.76,8.41H8.92V16Z";var k2="M21,16.5C21,16.88 20.79,17.21 20.47,17.38L12.57,21.82C12.41,21.94 12.21,22 12,22C11.79,22 11.59,21.94 11.43,21.82L3.53,17.38C3.21,17.21 3,16.88 3,16.5V7.5C3,7.12 3.21,6.79 3.53,6.62L11.43,2.18C11.59,2.06 11.79,2 12,2C12.21,2 12.41,2.06 12.57,2.18L20.47,6.62C20.79,6.79 21,7.12 21,7.5V16.5M12,4.15L6.04,7.5L12,10.85L17.96,7.5L12,4.15M5,15.91L11,19.29V12.58L5,9.21V15.91M19,15.91V9.21L13,12.58V19.29L19,15.91Z";var b2="M18.32,8H5.67L5.23,4H18.77M12,19A3,3 0 0,1 9,16C9,14 12,10.6 12,10.6C12,10.6 15,14 15,16A3,3 0 0,1 12,19M3,2L5,20.23C5.13,21.23 5.97,22 7,22H17C18,22 18.87,21.23 19,20.23L21,2H3Z";var w2="M12,1.5A2.5,2.5 0 0,1 14.5,4A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 9.5,4A2.5,2.5 0 0,1 12,1.5M15.87,5C18,5 20,7 20,9C22.7,9 22.7,13 20,13H4C1.3,13 1.3,9 4,9C4,7 6,5 8.13,5C8.57,6.73 10.14,8 12,8C13.86,8 15.43,6.73 15.87,5M5,15H8L9,22H7L5,15M10,15H14L13,22H11L10,15M16,15H19L17,22H15L16,15Z";var y2="M18,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V4A2,2 0 0,0 18,2M10,4A1,1 0 0,1 11,5A1,1 0 0,1 10,6A1,1 0 0,1 9,5A1,1 0 0,1 10,4M7,4A1,1 0 0,1 8,5A1,1 0 0,1 7,6A1,1 0 0,1 6,5A1,1 0 0,1 7,4M18,20H6V8H18V20M14.67,15.33C14.69,16.03 14.41,16.71 13.91,17.21C12.86,18.26 11.15,18.27 10.09,17.21C9.59,16.71 9.31,16.03 9.33,15.33C9.4,14.62 9.63,13.94 10,13.33C10.37,12.5 10.81,11.73 11.33,11L12,10C13.79,12.59 14.67,14.36 14.67,15.33";var B2="M16,11H18V13H16V11M12,3H19C20.11,3 21,3.89 21,5V19H22V21H2V19H10V5C10,3.89 10.89,3 12,3M12,5V19H19V5H12Z";var _2="M12,3C10.89,3 10,3.89 10,5H3V19H2V21H22V19H21V5C21,3.89 20.11,3 19,3H12M12,5H19V19H12V5M5,11H7V13H5V11Z";var P2="M16,12A2,2 0 0,1 18,10A2,2 0 0,1 20,12A2,2 0 0,1 18,14A2,2 0 0,1 16,12M10,12A2,2 0 0,1 12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12M4,12A2,2 0 0,1 6,10A2,2 0 0,1 8,12A2,2 0 0,1 6,14A2,2 0 0,1 4,12Z";var T2="M19.77,7.23L19.78,7.22L16.06,3.5L15,4.56L17.11,6.67C16.17,7.03 15.5,7.93 15.5,9A2.5,2.5 0 0,0 18,11.5C18.36,11.5 18.69,11.42 19,11.29V18.5A1,1 0 0,1 18,19.5A1,1 0 0,1 17,18.5V14A2,2 0 0,0 15,12H14V5A2,2 0 0,0 12,3H6A2,2 0 0,0 4,5V21H14V13.5H15.5V18.5A2.5,2.5 0 0,0 18,21A2.5,2.5 0 0,0 20.5,18.5V9C20.5,8.31 20.22,7.68 19.77,7.23M18,10A1,1 0 0,1 17,9A1,1 0 0,1 18,8A1,1 0 0,1 19,9A1,1 0 0,1 18,10M8,18V13.5H6L10,6V11H12L8,18Z";var F2="M12,11A1,1 0 0,0 11,12A1,1 0 0,0 12,13A1,1 0 0,0 13,12A1,1 0 0,0 12,11M12.5,2C17,2 17.11,5.57 14.75,6.75C13.76,7.24 13.32,8.29 13.13,9.22C13.61,9.42 14.03,9.73 14.35,10.13C18.05,8.13 22.03,8.92 22.03,12.5C22.03,17 18.46,17.1 17.28,14.73C16.78,13.74 15.72,13.3 14.79,13.11C14.59,13.59 14.28,14 13.88,14.34C15.87,18.03 15.08,22 11.5,22C7,22 6.91,18.42 9.27,17.24C10.25,16.75 10.69,15.71 10.89,14.79C10.4,14.59 9.97,14.27 9.65,13.87C5.96,15.85 2,15.07 2,11.5C2,7 5.56,6.89 6.74,9.26C7.24,10.25 8.29,10.68 9.22,10.87C9.41,10.39 9.73,9.97 10.14,9.65C8.15,5.96 8.94,2 12.5,2Z";var R2="M17.66 11.2C17.43 10.9 17.15 10.64 16.89 10.38C16.22 9.78 15.46 9.35 14.82 8.72C13.33 7.26 13 4.85 13.95 3C13 3.23 12.17 3.75 11.46 4.32C8.87 6.4 7.85 10.07 9.07 13.22C9.11 13.32 9.15 13.42 9.15 13.55C9.15 13.77 9 13.97 8.8 14.05C8.57 14.15 8.33 14.09 8.14 13.93C8.08 13.88 8.04 13.83 8 13.76C6.87 12.33 6.69 10.28 7.45 8.64C5.78 10 4.87 12.3 5 14.47C5.06 14.97 5.12 15.47 5.29 15.97C5.43 16.57 5.7 17.17 6 17.7C7.08 19.43 8.95 20.67 10.96 20.92C13.1 21.19 15.39 20.8 17.03 19.32C18.86 17.66 19.5 15 18.56 12.72L18.43 12.46C18.22 12 17.66 11.2 17.66 11.2M14.5 17.5C14.22 17.74 13.76 18 13.4 18.1C12.28 18.5 11.16 17.94 10.5 17.28C11.69 17 12.4 16.12 12.61 15.23C12.78 14.43 12.46 13.77 12.33 13C12.21 12.26 12.23 11.63 12.5 10.94C12.69 11.32 12.89 11.7 13.13 12C13.9 13 15.11 13.44 15.37 14.8C15.41 14.94 15.43 15.08 15.43 15.23C15.46 16.05 15.1 16.95 14.5 17.5H14.5Z";var E2="M12,20L12.76,17C9.5,16.79 6.59,15.4 5.75,13.58C5.66,14.06 5.53,14.5 5.33,14.83C4.67,16 3.33,16 2,16C3.1,16 3.5,14.43 3.5,12.5C3.5,10.57 3.1,9 2,9C3.33,9 4.67,9 5.33,10.17C5.53,10.5 5.66,10.94 5.75,11.42C6.4,10 8.32,8.85 10.66,8.32L9,5C11,5 13,5 14.33,5.67C15.46,6.23 16.11,7.27 16.69,8.38C19.61,9.08 22,10.66 22,12.5C22,14.38 19.5,16 16.5,16.66C15.67,17.76 14.86,18.78 14.17,19.33C13.33,20 12.67,20 12,20M17,11A1,1 0 0,0 16,12A1,1 0 0,0 17,13A1,1 0 0,0 18,12A1,1 0 0,0 17,11Z";var D2="M7,2V13H10V22L17,10H13L17,2H7Z";var z2="M15 21H17V19H15M19 9H21V7H19M3 5V19C3 20.1 3.9 21 5 21H9V19H5V5H9V3H5C3.9 3 3 3.9 3 5M19 3V5H21C21 3.9 20.1 3 19 3M11 23H13V1H11M19 17H21V15H19M15 5H17V3H15M19 13H21V11H19M19 21C20.1 21 21 20.1 21 19H19Z";var N2="M20.16 12.73C22.93 9.96 22.57 5.26 19.09 3C17.08 1.67 14.39 1.66 12.36 2.97C10.6 4.1 9.63 5.86 9.46 7.68C9.33 9 8.83 10.23 7.91 11.15L7.88 11.18C6.72 12.34 6.72 14.11 7.81 15.19L8.8 16.18C9.89 17.27 11.66 17.27 12.75 16.18C13.72 15.21 15 14.68 16.39 14.53C17.76 14.38 19.1 13.78 20.16 12.73M6.26 19.86C6.53 20.42 6.44 21.1 5.97 21.56C5.39 22.15 4.44 22.15 3.85 21.56C3.58 21.29 3.44 20.94 3.42 20.58C3.06 20.56 2.71 20.42 2.44 20.15C1.85 19.56 1.85 18.61 2.44 18.03C2.9 17.57 3.59 17.47 4.14 17.74L6.62 15.31C6.76 15.5 6.92 15.72 7.1 15.9L8.09 16.89C8.3 17.09 8.5 17.26 8.76 17.41L6.26 19.86Z";var $2="M11.9 2C8 2 4.9 5.4 5 9.3C5.1 11.9 6.6 14.1 8.7 15.2C10.1 15.9 11 17.3 11 18.8V19C11 20.7 12.3 22 14 22C18 22 19 17 19 9C19 9 19 2 11.9 2M14 20C13.4 20 13 19.6 13 19V18.8C13 16.6 11.7 14.5 9.7 13.4C8.1 12.6 7.1 11 7 9.2C7 7.9 7.5 6.5 8.4 5.5C9.3 4.5 10.6 4 11.8 4C16.7 4 17 8.2 17 9C17 18.9 15.3 20 14 20M15.8 7.6L8.3 10.3C8.1 10 8 9.6 8 9.1C8 8.4 8.2 7.8 8.5 7.1L13.7 5.2C14.9 5.8 15.5 6.7 15.8 7.6M12.9 15.1L15.7 14.1C15.6 15.6 15.3 16.7 15.1 17.4L13.8 17.9C13.8 16.9 13.5 16 12.9 15.1M16 9.2C16 10.4 16 11.5 15.9 12.4L11.9 13.9C11.4 13.4 10.8 12.9 10.1 12.6C9.7 12.4 9.3 12.1 9 11.8L16 9.2Z";var W2="M22,18A4,4 0 0,1 18,22H15A4,4 0 0,1 11,18V16H17.79L20.55,11.23L22.11,12.13L19.87,16H22V18M9,22H2C2,19 2,16 2.33,12.83C2.6,10.3 3.08,7.66 3.6,5H3V3H4L7,3H8V5H7.4C7.92,7.66 8.4,10.3 8.67,12.83C9,16 9,19 9,22Z";var I2="M18 11V6H15V4H12V2H8V5H6V11H5L7 22H17L19 11H18M15.86 11C15.7 11.61 15.4 12.16 15 12.62V8.62L17 9.62V11H15.86M17 7V8.5L15 7.5V7H17M12 5H14V8.5L12 9.5V5M12 10.62L14 9.62V13.45C13.41 13.8 12.73 14 12 14V10.62M11 13.86C10.21 13.65 9.5 13.22 9 12.62V9.62L11 8.62V13.86M9 3H11V7.5L10 8V5H9V3M7 6H9V8.5L8 9V11H7V6Z";var G2="M9,21V22H7V21A2,2 0 0,1 5,19V4A2,2 0 0,1 7,2H17A2,2 0 0,1 19,4V19A2,2 0 0,1 17,21V22H15V21H9M7,4V9H17V4H7M7,19H17V11H7V19M8,12H10V15H8V12M8,6H10V8H8V6Z";var U2="M18,10A1,1 0 0,1 17,9A1,1 0 0,1 18,8A1,1 0 0,1 19,9A1,1 0 0,1 18,10M12,10H6V5H12M19.77,7.23L19.78,7.22L16.06,3.5L15,4.56L17.11,6.67C16.17,7 15.5,7.93 15.5,9A2.5,2.5 0 0,0 18,11.5C18.36,11.5 18.69,11.42 19,11.29V18.5A1,1 0 0,1 18,19.5A1,1 0 0,1 17,18.5V14C17,12.89 16.1,12 15,12H14V5C14,3.89 13.1,3 12,3H6C4.89,3 4,3.89 4,5V21H14V13.5H15.5V18.5A2.5,2.5 0 0,0 18,21A2.5,2.5 0 0,0 20.5,18.5V9C20.5,8.31 20.22,7.68 19.77,7.23Z";var Q2="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12C20,14.4 19,16.5 17.3,18C15.9,16.7 14,16 12,16C10,16 8.2,16.7 6.7,18C5,16.5 4,14.4 4,12A8,8 0 0,1 12,4M14,5.89C13.62,5.9 13.26,6.15 13.1,6.54L11.81,9.77L11.71,10C11,10.13 10.41,10.6 10.14,11.26C9.73,12.29 10.23,13.45 11.26,13.86C12.29,14.27 13.45,13.77 13.86,12.74C14.12,12.08 14,11.32 13.57,10.76L13.67,10.5L14.96,7.29L14.97,7.26C15.17,6.75 14.92,6.17 14.41,5.96C14.28,5.91 14.15,5.89 14,5.89M10,6A1,1 0 0,0 9,7A1,1 0 0,0 10,8A1,1 0 0,0 11,7A1,1 0 0,0 10,6M7,9A1,1 0 0,0 6,10A1,1 0 0,0 7,11A1,1 0 0,0 8,10A1,1 0 0,0 7,9M17,9A1,1 0 0,0 16,10A1,1 0 0,0 17,11A1,1 0 0,0 18,10A1,1 0 0,0 17,9Z";var x1="M10,9A1,1 0 0,1 11,8A1,1 0 0,1 12,9V13.47L13.21,13.6L18.15,15.79C18.68,16.03 19,16.56 19,17.14V21.5C18.97,22.32 18.32,22.97 17.5,23H11C10.62,23 10.26,22.85 10,22.57L5.1,18.37L5.84,17.6C6.03,17.39 6.3,17.28 6.58,17.28H6.8L10,19V9M11,5A4,4 0 0,1 15,9C15,10.5 14.2,11.77 13,12.46V11.24C13.61,10.69 14,9.89 14,9A3,3 0 0,0 11,6A3,3 0 0,0 8,9C8,9.89 8.39,10.69 9,11.24V12.46C7.8,11.77 7,10.5 7,9A4,4 0 0,1 11,5Z";var K2="M15.5,21.27L14.66,21.18C13.9,21.11 13.25,20.6 13,19.87C12.47,17.91 12.47,15.83 13,13.87C15.32,13.4 17,11.37 17,9C17,7 15,2 15,2H9C9,2 7,7 7,9C7,11.38 8.67,13.42 11,13.9C11.53,15.86 11.53,17.94 11,19.9C10.76,20.62 10.12,21.13 9.37,21.21L8.5,21.3C8.5,21.3 8,21.28 8,22H16C16,21.28 15.5,21.27 15.5,21.27M9.44,7L10.44,4H13.56L14.56,7H9.44Z";var j2="M10,12A2,2 0 0,0 8,14A2,2 0 0,0 10,16A2,2 0 0,0 12,14A2,2 0 0,0 10,12M6,8A2,2 0 0,0 4,10A2,2 0 0,0 6,12A2,2 0 0,0 8,10A2,2 0 0,0 6,8M6,16A2,2 0 0,0 4,18A2,2 0 0,0 6,20A2,2 0 0,0 8,18A2,2 0 0,0 6,16M18,8A2,2 0 0,0 20,6A2,2 0 0,0 18,4A2,2 0 0,0 16,6A2,2 0 0,0 18,8M14,16A2,2 0 0,0 12,18A2,2 0 0,0 14,20A2,2 0 0,0 16,18A2,2 0 0,0 14,16M18,12A2,2 0 0,0 16,14A2,2 0 0,0 18,16A2,2 0 0,0 20,14A2,2 0 0,0 18,12M14,8A2,2 0 0,0 12,10A2,2 0 0,0 14,12A2,2 0 0,0 16,10A2,2 0 0,0 14,8M10,4A2,2 0 0,0 8,6A2,2 0 0,0 10,8A2,2 0 0,0 12,6A2,2 0 0,0 10,4Z";var q2="M8.06,2C7.88,3.17 8.17,4.16 8.95,4.97C9.45,5.47 9.61,6.14 9.42,7H10.41C10.53,6.45 10.55,6 10.45,5.55C10.36,5.13 10.05,4.63 9.5,4.03C9.05,3.47 8.89,2.8 9.05,2H8.06M10.55,2C10.36,3.17 10.66,4.16 11.44,4.97C11.94,5.47 12.09,6.14 11.91,7H12.89C13,6.45 13.03,6 12.94,5.55C12.84,5.13 12.53,4.63 12,4.03C11.53,3.47 11.38,2.8 11.53,2H10.55M13.08,2C12.89,3.17 13.19,4.16 13.97,4.97C14.47,5.47 14.61,6.14 14.39,7H15.42C15.55,6.45 15.56,6 15.47,5.55C15.38,5.13 15.06,4.63 14.53,4.03C14.06,3.47 13.91,2.8 14.06,2H13.08M5,8C5,9.42 5.39,10.7 6.14,11.84C6.87,12.96 7.91,13.85 9.14,14.39L5.16,20.44C5.06,20.56 5,20.75 5,21C5,21.41 5.16,21.69 5.44,21.84C5.56,21.94 5.75,22 6,22C6.41,22 6.69,21.84 6.84,21.56L7.83,19.97H14.2C14.41,20.55 14.79,21.05 15.28,21.42C15.78,21.8 16.36,22 17,22C17.83,22 18.53,21.69 19.13,21.09C19.72,20.5 20,19.8 20,19C20,18.17 19.72,17.47 19.13,16.88C18.53,16.28 17.83,16 17,16C16.36,16 15.78,16.17 15.28,16.55C14.78,16.92 14.42,17.41 14.2,18H9.14L11.11,14.95C11.27,15 11.56,15 12,15C12.44,15 12.73,15 12.89,14.95L13.88,16.5C14.29,15.96 14.84,15.54 15.47,15.28L14.91,14.39C16.03,13.89 17,13 17.79,11.77C18.59,10.5 19,9.27 19,8H5M17,18C17.3,18 17.53,18.09 17.72,18.28C17.91,18.47 18,18.72 18,19C18,19.27 17.91,19.5 17.72,19.71C17.54,19.91 17.28,20 17,20C16.74,20 16.5,19.91 16.29,19.71C16.09,19.5 16,19.26 16,19C16,18.7 16.09,18.47 16.29,18.28C16.5,18.09 16.73,18 17,18Z";var Z1="M8.5 4.5L5.4 9.5L8.5 14.7L5.2 20.5L3.4 19.6L6.1 14.7L3 9.5L6.7 3.6L8.5 4.5M14.7 4.4L11.6 9.5L14.7 14.5L11.4 20.3L9.6 19.4L12.3 14.5L9.2 9.5L12.9 3.5L14.7 4.4M21 4.4L17.9 9.5L21 14.5L17.7 20.3L15.9 19.4L18.6 14.5L15.5 9.5L19.2 3.5L21 4.4";var Y2="M13.5,8H12V13L16.28,15.54L17,14.33L13.5,12.25V8M13,3A9,9 0 0,0 4,12H1L4.96,16.03L9,12H6A7,7 0 0,1 13,5A7,7 0 0,1 20,12A7,7 0 0,1 13,19C11.07,19 9.32,18.21 8.06,16.94L6.64,18.36C8.27,20 10.5,21 13,21A9,9 0 0,0 22,12A9,9 0 0,0 13,3";var X2="M24 13L20 17V14H11V12H20V9L24 13M4 20V12H1L11 3L18 9.3V10H15.79L11 5.69L6 10.19V18H16V16H18V20H4Z";var J2="M15 13L11 17V14H2V12H11V9L15 13M5 20V16H7V18H17V10.19L12 5.69L7.21 10H4.22L12 3L22 12H19V20H5Z";var C5="M19 8C20.11 8 21 8.9 21 10V16.76C21.61 17.31 22 18.11 22 19C22 20.66 20.66 22 19 22C17.34 22 16 20.66 16 19C16 18.11 16.39 17.31 17 16.76V10C17 8.9 17.9 8 19 8M19 9C18.45 9 18 9.45 18 10V11H20V10C20 9.45 19.55 9 19 9M12 5.69L7 10.19V18H14.1L14 19L14.1 20H5V12H2L12 3L16.4 6.96C15.89 7.4 15.5 7.97 15.25 8.61L12 5.69Z";var H5="M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11V17Z";var V5="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z";var L5="M12,2A7,7 0 0,1 19,9C19,11.38 17.81,13.47 16,14.74V17A1,1 0 0,1 15,18H9A1,1 0 0,1 8,17V14.74C6.19,13.47 5,11.38 5,9A7,7 0 0,1 12,2M9,21V20H15V21A1,1 0 0,1 14,22H10A1,1 0 0,1 9,21M12,4A5,5 0 0,0 7,9C7,11.05 8.23,12.81 10,13.58V16H14V13.58C15.77,12.81 17,11.05 17,9A5,5 0 0,0 12,4Z";var s1="M11 15H6L13 1V9H18L11 23V15Z";var M5="M12,17A2,2 0 0,0 14,15C14,13.89 13.1,13 12,13A2,2 0 0,0 10,15A2,2 0 0,0 12,17M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V10C4,8.89 4.9,8 6,8H7V6A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,3A3,3 0 0,0 9,6V8H15V6A3,3 0 0,0 12,3Z";var r5="M18 1C15.24 1 13 3.24 13 6V8H4C2.9 8 2 8.89 2 10V20C2 21.11 2.9 22 4 22H16C17.11 22 18 21.11 18 20V10C18 8.9 17.11 8 16 8H15V6C15 4.34 16.34 3 18 3C19.66 3 21 4.34 21 6V8H23V6C23 3.24 20.76 1 18 1M10 13C11.1 13 12 13.89 12 15C12 16.11 11.11 17 10 17C8.9 17 8 16.11 8 15C8 13.9 8.9 13 10 13Z";var e5="M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z";var t5="M5,7A2,2 0 0,0 3,9V15A2,2 0 0,0 5,17H8V15H5V9H8V7H5M11,7A2,2 0 0,0 9,9V15A2,2 0 0,0 11,17H13A2,2 0 0,0 15,15V9A2,2 0 0,0 13,7H11M11,9H13V15H11V9M16,10.5V12H19V13.5H17.5A1.5,1.5 0 0,0 16,15V18H20.5V16.5H17.5V15H19A1.5,1.5 0 0,0 20.5,13.5V12A1.5,1.5 0 0,0 19,10.5H16Z";var i5="M8 18C6.67 18 5.79 18.79 5.29 19.29S4.67 20 4 20 3.21 19.79 2.71 19.29C2.35 18.93 1.79 18.42 1 18.16V20.41C1.09 20.5 1.18 20.59 1.29 20.71C1.79 21.21 2.67 22 4 22S6.21 21.21 6.71 20.71 7.33 20 8 20 8.79 20.21 9.29 20.71C9.73 21.14 10.44 21.8 11.5 21.96C11.66 22 11.83 22 12 22C13.33 22 14.21 21.21 14.71 20.71S15.33 20 16 20 16.79 20.21 17.29 20.71 18.67 22 20 22 22.21 21.21 22.71 20.71C22.82 20.59 22.91 20.5 23 20.41V18.16C22.21 18.42 21.65 18.93 21.29 19.29C20.79 19.79 20.67 20 20 20S19.21 19.79 18.71 19.29 17.33 18 16 18 13.79 18.79 13.29 19.29 12.67 20 12 20C11.78 20 11.63 19.97 11.5 19.92C11.22 19.82 11.05 19.63 10.71 19.29C10.21 18.79 9.33 18 8 18M22 10.5C22 10.5 24 12.67 24 14C24 15.1 23.1 16 22 16S20 15.1 20 14C20 12.67 22 10.5 22 10.5M22.5 7.13L19.24 5.24L12.73 9C12.39 8.4 11.74 8 11 8H9V6H10C10.55 6 11 5.55 11 5S10.55 4 10 4H6C5.45 4 5 4.45 5 5S5.45 6 6 6H7V8H5C3.9 8 3 8.9 3 10V13C3 14.1 3.9 15 5 15H14C14.75 15 15.41 14.58 15.75 13.97L19.4 7.65L21.5 8.86C22 9.14 22.59 8.97 22.87 8.5C23.14 8 23 7.4 22.5 7.13M14 13H5V10H11.69L12.6 11.43L16.06 9.43L14 13M3.5 6.92L1.79 8.62A1 1 0 0 1 .38 7.21L2.09 5.5A1 1 0 0 1 3.5 5.5C3.89 5.89 3.89 6.5 3.5 6.92Z";var o5="M17.5,12A1.5,1.5 0 0,1 16,10.5A1.5,1.5 0 0,1 17.5,9A1.5,1.5 0 0,1 19,10.5A1.5,1.5 0 0,1 17.5,12M14.5,8A1.5,1.5 0 0,1 13,6.5A1.5,1.5 0 0,1 14.5,5A1.5,1.5 0 0,1 16,6.5A1.5,1.5 0 0,1 14.5,8M9.5,8A1.5,1.5 0 0,1 8,6.5A1.5,1.5 0 0,1 9.5,5A1.5,1.5 0 0,1 11,6.5A1.5,1.5 0 0,1 9.5,8M6.5,12A1.5,1.5 0 0,1 5,10.5A1.5,1.5 0 0,1 6.5,9A1.5,1.5 0 0,1 8,10.5A1.5,1.5 0 0,1 6.5,12M12,3A9,9 0 0,0 3,12A9,9 0 0,0 12,21A1.5,1.5 0 0,0 13.5,19.5C13.5,19.11 13.35,18.76 13.11,18.5C12.88,18.23 12.73,17.88 12.73,17.5A1.5,1.5 0 0,1 14.23,16H16A5,5 0 0,0 21,11C21,6.58 16.97,3 12,3Z";var a5="M14.53 1.45L13.45 2.53L15.05 4.13C15.27 4.38 15.38 4.67 15.38 5S15.27 5.64 15.05 5.86L11.5 9.47L12.5 10.55L16.13 6.94C16.66 6.35 16.92 5.7 16.92 5C16.92 4.3 16.66 3.64 16.13 3.05L14.53 1.45M10.55 3.47L9.47 4.55L10.08 5.11C10.3 5.33 10.41 5.63 10.41 6S10.3 6.67 10.08 6.89L9.47 7.45L10.55 8.53L11.11 7.92C11.64 7.33 11.91 6.69 11.91 6C11.91 5.28 11.64 4.63 11.11 4.03L10.55 3.47M21 5.06C20.31 5.06 19.67 5.33 19.08 5.86L13.45 11.5L14.53 12.5L20.11 6.94C20.36 6.69 20.66 6.56 21 6.56S21.64 6.69 21.89 6.94L22.5 7.55L23.53 6.47L22.97 5.86C22.38 5.33 21.72 5.06 21 5.06M7 8L2 22L16 17L7 8M19 11.06C18.3 11.06 17.66 11.33 17.06 11.86L15.47 13.45L16.55 14.53L18.14 12.94C18.39 12.69 18.67 12.56 19 12.56C19.33 12.56 19.63 12.69 19.88 12.94L21.5 14.53L22.55 13.5L20.95 11.86C20.36 11.33 19.7 11.06 19 11.06Z";var A5="M14,19H18V5H14M6,19H10V5H6V19Z";var d5="M8,5.14V19.14L19,12.14L8,5.14Z";var p5="M14.6 9L18 3.1L19.7 4.1L16.9 9H14.6M14 10H3V12H5V19C5 20.1 5.9 21 7 21H17C18.1 21 19 20.1 19 19V12H21V10H14Z";var n5="M19 19C19 20.11 18.11 21 17 21H7C5.9 21 5 20.11 5 19V12H3V10H21V12H19M8 1.5C6.15 1.5 4.65 3 4.65 4.85C4.65 6.7 6.15 8.2 8 8.2H9.53C9.92 8.2 10.29 8.3 10.61 8.5H12.63C12.05 7.45 10.86 6.75 9.53 6.75H8C7 6.75 6.15 5.77 6.15 4.75C6.15 3.73 7 3 8 3M12.85 2C12.85 3 12 3.85 11 3.85V5.35C12.92 5.35 14.5 6.7 14.89 8.5H16.42C16.12 6.67 14.96 5.15 13.35 4.38C13.97 3.77 14.35 2.93 14.35 2Z";var m5="M16.56,5.44L15.11,6.89C16.84,7.94 18,9.83 18,12A6,6 0 0,1 12,18A6,6 0 0,1 6,12C6,9.83 7.16,7.94 8.88,6.88L7.44,5.44C5.36,6.88 4,9.28 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12C20,9.28 18.64,6.88 16.56,5.44M13,3H11V13H13";var l5="M18.73,18C15.4,21.69 9.71,22 6,18.64C2.33,15.31 2.04,9.62 5.37,5.93C6.9,4.25 9,3.2 11.27,3C7.96,6.7 8.27,12.39 12,15.71C13.63,17.19 15.78,18 18,18C18.25,18 18.5,18 18.73,18Z";var v5="M16,6C14.87,6 13.77,6.35 12.84,7H4C2.89,7 2,7.89 2,9V15C2,16.11 2.89,17 4,17H5V18A1,1 0 0,0 6,19H8A1,1 0 0,0 9,18V17H15V18A1,1 0 0,0 16,19H18A1,1 0 0,0 19,18V17H20C21.11,17 22,16.11 22,15V9C22,7.89 21.11,7 20,7H19.15C18.23,6.35 17.13,6 16,6M16,7.5A3.5,3.5 0 0,1 19.5,11A3.5,3.5 0 0,1 16,14.5A3.5,3.5 0 0,1 12.5,11A3.5,3.5 0 0,1 16,7.5M4,9H8V10H4V9M16,9A2,2 0 0,0 14,11A2,2 0 0,0 16,13A2,2 0 0,0 18,11A2,2 0 0,0 16,9M4,11H8V12H4V11M4,13H8V14H4V13Z";var x5="M7.95,3L6.53,5.19L7.95,7.4H7.94L5.95,10.5L4.22,9.6L5.64,7.39L4.22,5.19L6.22,2.09L7.95,3M13.95,2.89L12.53,5.1L13.95,7.3L13.94,7.31L11.95,10.4L10.22,9.5L11.64,7.3L10.22,5.1L12.22,2L13.95,2.89M20,2.89L18.56,5.1L20,7.3V7.31L18,10.4L16.25,9.5L17.67,7.3L16.25,5.1L18.25,2L20,2.89M2,22V14A2,2 0 0,1 4,12H20A2,2 0 0,1 22,14V22H20V20H4V22H2M6,14A1,1 0 0,0 5,15V17A1,1 0 0,0 6,18A1,1 0 0,0 7,17V15A1,1 0 0,0 6,14M10,14A1,1 0 0,0 9,15V17A1,1 0 0,0 10,18A1,1 0 0,0 11,17V15A1,1 0 0,0 10,14M14,14A1,1 0 0,0 13,15V17A1,1 0 0,0 14,18A1,1 0 0,0 15,17V15A1,1 0 0,0 14,14M18,14A1,1 0 0,0 17,15V17A1,1 0 0,0 18,18A1,1 0 0,0 19,17V15A1,1 0 0,0 18,14Z";var Z5="M12,0C8.96,0 6.21,1.23 4.22,3.22L5.63,4.63C7.26,3 9.5,2 12,2C14.5,2 16.74,3 18.36,4.64L19.77,3.23C17.79,1.23 15.04,0 12,0M7.05,6.05L8.46,7.46C9.37,6.56 10.62,6 12,6C13.38,6 14.63,6.56 15.54,7.46L16.95,6.05C15.68,4.78 13.93,4 12,4C10.07,4 8.32,4.78 7.05,6.05M12,15A2,2 0 0,1 10,13A2,2 0 0,1 12,11A2,2 0 0,1 14,13A2,2 0 0,1 12,15M15,9H9A1,1 0 0,0 8,10V22A1,1 0 0,0 9,23H15A1,1 0 0,0 16,22V10A1,1 0 0,0 15,9Z";var s5="M12,4C14.1,4 16.1,4.8 17.6,6.3C20.7,9.4 20.7,14.5 17.6,17.6C15.8,19.5 13.3,20.2 10.9,19.9L11.4,17.9C13.1,18.1 14.9,17.5 16.2,16.2C18.5,13.9 18.5,10.1 16.2,7.7C15.1,6.6 13.5,6 12,6V10.6L7,5.6L12,0.6V4M6.3,17.6C3.7,15 3.3,11 5.1,7.9L6.6,9.4C5.5,11.6 5.9,14.4 7.8,16.2C8.3,16.7 8.9,17.1 9.6,17.4L9,19.4C8,19 7.1,18.4 6.3,17.6Z";var u5="M18.1,4.8C18,4.3 17.6,4 17.1,4H13L13.2,7H10.8L11,4H6.8C6.3,4 5.9,4.4 5.8,4.8L3.1,18.8C3,19.4 3.5,20 4.1,20H10L10.3,15H13.7L14,20H19.8C20.4,20 20.9,19.4 20.8,18.8L18.1,4.8M10.4,13L10.6,9H13.2L13.4,13H10.4Z";var c5="M16.88 4L16.88 4L19.03 6.1L13.5 10.5L12.5 9.5L16.87 4L16.88 4M16.88 2C16.3 2 15.73 2.24 15.33 2.72L9.8 9.65L13.34 13.19L20.28 7.67C21.18 6.91 21.25 5.54 20.41 4.7L18.3 2.59C17.9 2.19 17.39 2 16.88 2M9.1 10.36L8.39 11.07C8 11.46 8 12.09 8.39 12.5L10.5 14.6C10.71 14.8 10.96 14.89 11.22 14.89S11.73 14.8 11.93 14.6L12.63 13.9L9.1 10.36M6 15C5.45 15 5 15.45 5 16C5 16.55 5.45 17 6 17C6.55 17 7 16.55 7 16C7 15.45 6.55 15 6 15M9 16C8.45 16 8 16.45 8 17S8.45 18 9 18C9.55 18 10 17.55 10 17S9.55 16 9 16M4 18C3.45 18 3 18.45 3 19S3.45 20 4 20C4.55 20 5 19.55 5 19S4.55 18 4 18M7 19C6.45 19 6 19.45 6 20S6.45 21 7 21C7.55 21 8 20.55 8 20S7.55 19 7 19Z";var u1="M10.6 9.6L9 15L7.4 9.6L2 8L7.4 6.4L9 1L10.6 6.4L16 8L10.6 9.6M17 14.2L21 12L18.8 16L21 20L17 17.8L13 20L15.2 16L13 12L17 14.2M10 16L8.3 19L10 22L7 20.3L4 22L5.7 19L4 16L7 17.7L10 16";var S5="M20.79,13.95L18.46,14.57L16.46,13.44V10.56L18.46,9.43L20.79,10.05L21.31,8.12L19.54,7.65L20,5.88L18.07,5.36L17.45,7.69L15.45,8.82L13,7.38V5.12L14.71,3.41L13.29,2L12,3.29L10.71,2L9.29,3.41L11,5.12V7.38L8.5,8.82L6.5,7.69L5.92,5.36L4,5.88L4.47,7.65L2.7,8.12L3.22,10.05L5.55,9.43L7.55,10.56V13.45L5.55,14.58L3.22,13.96L2.7,15.89L4.47,16.36L4,18.12L5.93,18.64L6.55,16.31L8.55,15.18L11,16.62V18.88L9.29,20.59L10.71,22L12,20.71L13.29,22L14.7,20.59L13,18.88V16.62L15.5,15.17L17.5,16.3L18.12,18.63L20,18.12L19.53,16.35L21.3,15.88L20.79,13.95M9.5,10.56L12,9.11L14.5,10.56V13.44L12,14.89L9.5,13.44V10.56Z",h5="M16.46,9.41L13,7.38V5.12L14.71,3.41L13.29,2L12,3.29L10.71,2L9.29,3.41L11,5.12V7.38L8.5,8.82L6.5,7.69L5.92,5.36L4,5.88L4.47,7.65L2.7,8.12L3.22,10.05L5.55,9.43L7.55,10.56V13.45L5.55,14.58L3.22,13.96L2.7,15.89L4.47,16.36L4,18.12L5.93,18.64L6.55,16.31L8.55,15.18L11,16.62V18.88L9.29,20.59L10.71,22L12,20.71L13.29,22L14.7,20.59L13,18.88V16.62L16.46,14.61M9.5,10.56L12,9.11L14.5,10.56V13.44L12,14.89L9.5,13.44M19,13V7H21V13H19M19,17V15H21V17H19Z";var g5="M8 17.85C8 19.04 7.11 20 6 20S4 19.04 4 17.85C4 16.42 6 14 6 14S8 16.42 8 17.85M16.46 12V10.56L18.46 9.43L20.79 10.05L21.31 8.12L19.54 7.65L20 5.88L18.07 5.36L17.45 7.69L15.45 8.82L13 7.38V5.12L14.71 3.41L13.29 2L12 3.29L10.71 2L9.29 3.41L11 5.12V7.38L8.5 8.82L6.5 7.69L5.92 5.36L4 5.88L4.47 7.65L2.7 8.12L3.22 10.05L5.55 9.43L7.55 10.56V12H2V13H22V12H16.46M9.5 12V10.56L12 9.11L14.5 10.56V12H9.5M20 17.85C20 19.04 19.11 20 18 20S16 19.04 16 17.85C16 16.42 18 14 18 14S20 16.42 20 17.85M14 20.85C14 22.04 13.11 23 12 23S10 22.04 10 20.85C10 19.42 12 17 12 17S14 19.42 14 20.85Z";var O5="M14.25,12L16.27,11H23L22,9H18.03L20.42,5.83L19.43,3.83L15.37,9.2L13.35,10.21L13.75,8L17.83,2.62L15.64,2.22L12,7L8.4,2.2L6.2,2.6L10.26,8L10.66,10.21L8.82,9.29L8.66,9.21L4.6,3.8L3.6,5.8L6,9H2L1,11H7.77L9.75,12L7.73,13H1L2,15H5.97L3.58,18.17L4.57,20.17L8.63,14.8L10.65,13.79L10.25,16L6.17,21.38L8.36,21.79L12,17L15.6,21.8L17.8,21.4L13.74,16L13.34,13.79L15.34,14.79L19.4,20.2L20.4,18.2L18,15H22L23,13H16.23";var f5="M12,16A3,3 0 0,1 9,13C9,11.88 9.61,10.9 10.5,10.39L20.21,4.77L14.68,14.35C14.18,15.33 13.17,16 12,16M12,3C13.81,3 15.5,3.5 16.97,4.32L14.87,5.53C14,5.19 13,5 12,5A8,8 0 0,0 4,13C4,15.21 4.89,17.21 6.34,18.65H6.35C6.74,19.04 6.74,19.67 6.35,20.06C5.96,20.45 5.32,20.45 4.93,20.07V20.07C3.12,18.26 2,15.76 2,13A10,10 0 0,1 12,3M22,13C22,15.76 20.88,18.26 19.07,20.07V20.07C18.68,20.45 18.05,20.45 17.66,20.06C17.27,19.67 17.27,19.04 17.66,18.65V18.65C19.11,17.2 20,15.21 20,13C20,12 19.81,11 19.46,10.1L20.67,8C21.5,9.5 22,11.18 22,13Z";var k5="M16.72 10.43C14.68 8.39 14.5 4.66 14.5 4H13V6H9V4H7C7 2.9 7.9 2 9 2H16V3C16 3.08 16.04 7.63 17.78 9.37L16.72 10.43M17 2V4H18V2H17M15 12C13 10 13 7 13 7H9V9C9 10 9 10 8 11S7 13 7 13V20C7 21.1 7.9 22 9 22H13C14.1 22 15 21.1 15 20V12Z";var b5="M12,15.39L8.24,17.66L9.23,13.38L5.91,10.5L10.29,10.13L12,6.09L13.71,10.13L18.09,10.5L14.77,13.38L15.76,17.66M22,9.24L14.81,8.63L12,2L9.19,8.63L2,9.24L7.45,13.97L5.82,21L12,17.27L18.18,21L16.54,13.97L22,9.24Z";var w5="M13,19.92C14.8,19.7 16.35,18.95 17.65,17.65C18.95,16.35 19.7,14.8 19.92,13H16.92C16.7,14 16.24,14.84 15.54,15.54C14.84,16.24 14,16.7 13,16.92V19.92M10,8H14L17,11H19.92C19.67,9.05 18.79,7.38 17.27,6C15.76,4.66 14,4 12,4C10,4 8.24,4.66 6.73,6C5.21,7.38 4.33,9.05 4.08,11H7L10,8M11,19.92V16.92C10,16.7 9.16,16.24 8.46,15.54C7.76,14.84 7.3,14 7.08,13H4.08C4.3,14.77 5.05,16.3 6.35,17.6C7.65,18.9 9.2,19.67 11,19.92M12,2C14.75,2 17.1,3 19.05,4.95C21,6.9 22,9.25 22,12C22,14.75 21,17.1 19.05,19.05C17.1,21 14.75,22 12,22C9.25,22 6.9,21 4.95,19.05C3,17.1 2,14.75 2,12C2,9.25 3,6.9 4.95,4.95C6.9,3 9.25,2 12,2Z";var y5="M18,18H6V6H18V18Z";var B5="M10 2L7.6 5.4C8.4 5.2 9.2 5 10 5S11.6 5.2 12.4 5.4L10 2M21 13.8V7C21 5.9 20.1 5 19 5S17 5.9 17 7V13.8C16.4 14.4 16 15.2 16 16C16 17.7 17.3 19 19 19S22 17.7 22 16C22 15.1 21.6 14.3 21 13.8M20 8H18V7C18 6.4 18.4 6 19 6S20 6.4 20 7V8M5.5 6.7L1.3 7L3.1 10.8C3.2 10 3.5 9.2 3.9 8.5C4.4 7.8 4.9 7.2 5.5 6.7M10 7C7.2 7 5 9.2 5 12S7.2 17 10 17 15 14.8 15 12 12.8 7 10 7M10 15C8.3 15 7 13.7 7 12S8.3 9 10 9 13 10.3 13 12 11.7 15 10 15M3.2 13.2L1.4 17L5.5 17.4C5 16.9 4.4 16.2 4 15.5C3.5 14.8 3.3 14 3.2 13.2M7.6 18.6L10 22L12.4 18.6C11.6 18.8 10.8 19 10 19C9.1 19 8.3 18.8 7.6 18.6Z";var _5="M22.08,11.04H20.08V4H13.05V2H11.04V4H4V11.04H2V13.05H4V20.08H11.04V22.08H13.05V20.08H20.08V13.05H22.08V11.04M18.07,18.07H13.05V16.06H11.04V18.07H6V13.05H8.03V11.04H6V6H11.04V8.03H13.05V6H18.07V11.04H16.06V13.05H18.07V18.07M13.05,12.05A1,1 0 0,1 12.05,13.05C11.5,13.05 11.04,12.6 11.04,12.05C11.04,11.5 11.5,11.04 12.05,11.04C12.6,11.04 13.05,11.5 13.05,12.05Z";var P5="M15 13V5A3 3 0 0 0 9 5V13A5 5 0 1 0 15 13M12 4A1 1 0 0 1 13 5V8H11V5A1 1 0 0 1 12 4Z";var T5="M19.47 3.47L13.47 9.47L10.53 10C10.22 10.03 9.94 10.18 9.72 10.4L2.81 17.31C1.74 18.38 1.74 20.12 2.81 21.2C3.88 22.27 5.62 22.27 6.7 21.2L13.61 14.29C13.83 14.07 14 13.79 14.03 13.5L14.54 10.54L20.54 4.54L22 2L19.47 3.47M11 14.38C10.24 14.38 9.62 13.76 9.62 13S10.24 11.62 11 11.62 12.38 12.24 12.38 13C12.37 13.76 11.76 14.38 11 14.38Z";var F5="M12,20A7,7 0 0,1 5,13A7,7 0 0,1 12,6A7,7 0 0,1 19,13A7,7 0 0,1 12,20M19.03,7.39L20.45,5.97C20,5.46 19.55,5 19.04,4.56L17.62,6C16.07,4.74 14.12,4 12,4A9,9 0 0,0 3,13A9,9 0 0,0 12,22C17,22 21,17.97 21,13C21,10.88 20.26,8.93 19.03,7.39M11,14H13V8H11M15,1H9V3H15V1Z";var R5="M6,2H18V8H18V8L14,12L18,16V16H18V22H6V16H6V16L10,12L6,8V8H6V2M16,16.5L12,12.5L8,16.5V20H16V16.5M12,11.5L16,7.5V4H8V7.5L12,11.5M10,6H14V6.75L12,8.75L10,6.75V6Z";var E5="M4,5A2,2 0 0,0 2,7V17A2,2 0 0,0 4,19H20A2,2 0 0,0 22,17V7A2,2 0 0,0 20,5H4M4,7H16V17H4V7M19,7A1,1 0 0,1 20,8A1,1 0 0,1 19,9A1,1 0 0,1 18,8A1,1 0 0,1 19,7M6,9V11H14V9H6M19,11A1,1 0 0,1 20,12A1,1 0 0,1 19,13A1,1 0 0,1 18,12A1,1 0 0,1 19,11Z";var D5="M2 12H4V17H20V12H22V17C22 18.11 21.11 19 20 19H4C2.9 19 2 18.11 2 17V12M12 15L17.55 9.54L16.13 8.13L13 11.25V2H11V11.25L7.88 8.13L6.46 9.55L12 15Z";var z5="M16,18L18.29,15.71L13.41,10.83L9.41,14.83L2,7.41L3.41,6L9.41,12L13.41,8L19.71,14.29L22,12V18H16Z",N5="M22,12L18,8V11H3V13H18V16L22,12Z",$5="M16,6L18.29,8.29L13.41,13.17L9.41,9.17L2,16.59L3.41,18L9.41,12L13.41,16L19.71,9.71L22,12V6H16Z";var W5="M8 13C6.14 13 4.59 14.28 4.14 16H2V18H4.14C4.59 19.72 6.14 21 8 21S11.41 19.72 11.86 18H22V16H11.86C11.41 14.28 9.86 13 8 13M8 19C6.9 19 6 18.1 6 17C6 15.9 6.9 15 8 15S10 15.9 10 17C10 18.1 9.1 19 8 19M19.86 6C19.41 4.28 17.86 3 16 3S12.59 4.28 12.14 6H2V8H12.14C12.59 9.72 14.14 11 16 11S19.41 9.72 19.86 8H22V6H19.86M16 9C14.9 9 14 8.1 14 7C14 5.9 14.9 5 16 5S18 5.9 18 7C18 8.1 17.1 9 16 9Z";var I5="M21,10.12H14.22L16.96,7.3C14.23,4.6 9.81,4.5 7.08,7.2C4.35,9.91 4.35,14.28 7.08,17C9.81,19.7 14.23,19.7 16.96,17C18.32,15.65 19,14.08 19,12.1H21C21,14.08 20.12,16.65 18.36,18.39C14.85,21.87 9.15,21.87 5.64,18.39C2.14,14.92 2.11,9.28 5.62,5.81C9.13,2.34 14.76,2.34 18.27,5.81L21,3V10.12M12.5,8V12.25L16,14.33L15.28,15.54L11,13V8H12.5Z";var G5="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z";var U5="M12,4L9.91,6.09L12,8.18M4.27,3L3,4.27L7.73,9H3V15H7L12,20V13.27L16.25,17.53C15.58,18.04 14.83,18.46 14,18.7V20.77C15.38,20.45 16.63,19.82 17.68,18.96L19.73,21L21,19.73L12,10.73M19,12C19,12.94 18.8,13.82 18.46,14.64L19.97,16.15C20.62,14.91 21,13.5 21,12C21,7.72 18,4.14 14,3.23V5.29C16.89,6.15 19,8.83 19,12M16.5,12C16.5,10.23 15.5,8.71 14,7.97V10.18L16.45,12.63C16.5,12.43 16.5,12.21 16.5,12Z";var Q5="M12,20A6,6 0 0,1 6,14C6,10 12,3.25 12,3.25C12,3.25 18,10 18,14A6,6 0 0,1 12,20Z";var c1="M12,3.25C12,3.25 6,10 6,14C6,17.32 8.69,20 12,20A6,6 0 0,0 18,14C18,10 12,3.25 12,3.25M14.47,9.97L15.53,11.03L9.53,17.03L8.47,15.97M9.75,10A1.25,1.25 0 0,1 11,11.25A1.25,1.25 0 0,1 9.75,12.5A1.25,1.25 0 0,1 8.5,11.25A1.25,1.25 0 0,1 9.75,10M14.25,14.5A1.25,1.25 0 0,1 15.5,15.75A1.25,1.25 0 0,1 14.25,17A1.25,1.25 0 0,1 13,15.75A1.25,1.25 0 0,1 14.25,14.5Z";var K5="M3,15H13A1,1 0 0,1 14,16A1,1 0 0,1 13,17H3A1,1 0 0,1 2,16A1,1 0 0,1 3,15M16,15H21A1,1 0 0,1 22,16A1,1 0 0,1 21,17H16A1,1 0 0,1 15,16A1,1 0 0,1 16,15M1,12A5,5 0 0,1 6,7C7,4.65 9.3,3 12,3C15.43,3 18.24,5.66 18.5,9.03L19,9C21.19,9 22.97,10.76 23,13H21A2,2 0 0,0 19,11H17V10A5,5 0 0,0 12,5C9.5,5 7.45,6.82 7.06,9.19C6.73,9.07 6.37,9 6,9A3,3 0 0,0 3,12C3,12.35 3.06,12.69 3.17,13H1.1L1,12M3,19H5A1,1 0 0,1 6,20A1,1 0 0,1 5,21H3A1,1 0 0,1 2,20A1,1 0 0,1 3,19M8,19H21A1,1 0 0,1 22,20A1,1 0 0,1 21,21H8A1,1 0 0,1 7,20A1,1 0 0,1 8,19Z";var j5="M17.75,4.09L15.22,6.03L16.13,9.09L13.5,7.28L10.87,9.09L11.78,6.03L9.25,4.09L12.44,4L13.5,1L14.56,4L17.75,4.09M21.25,11L19.61,12.25L20.2,14.23L18.5,13.06L16.8,14.23L17.39,12.25L15.75,11L17.81,10.95L18.5,9L19.19,10.95L21.25,11M18.97,15.95C19.8,15.87 20.69,17.05 20.16,17.8C19.84,18.25 19.5,18.67 19.08,19.07C15.17,23 8.84,23 4.94,19.07C1.03,15.17 1.03,8.83 4.94,4.93C5.34,4.53 5.76,4.17 6.21,3.85C6.96,3.32 8.14,4.21 8.06,5.04C7.79,7.9 8.75,10.87 10.95,13.06C13.14,15.26 16.1,16.22 18.97,15.95M17.33,17.97C14.5,17.81 11.7,16.64 9.53,14.5C7.36,12.31 6.2,9.5 6.04,6.68C3.23,9.82 3.34,14.64 6.35,17.66C9.37,20.67 14.19,20.78 17.33,17.97Z";var q5="M4,10A1,1 0 0,1 3,9A1,1 0 0,1 4,8H12A2,2 0 0,0 14,6A2,2 0 0,0 12,4C11.45,4 10.95,4.22 10.59,4.59C10.2,5 9.56,5 9.17,4.59C8.78,4.2 8.78,3.56 9.17,3.17C9.9,2.45 10.9,2 12,2A4,4 0 0,1 16,6A4,4 0 0,1 12,10H4M19,12A1,1 0 0,0 20,11A1,1 0 0,0 19,10C18.72,10 18.47,10.11 18.29,10.29C17.9,10.68 17.27,10.68 16.88,10.29C16.5,9.9 16.5,9.27 16.88,8.88C17.42,8.34 18.17,8 19,8A3,3 0 0,1 22,11A3,3 0 0,1 19,14H5A1,1 0 0,1 4,13A1,1 0 0,1 5,12H19M18,18H4A1,1 0 0,1 3,17A1,1 0 0,1 4,16H18A3,3 0 0,1 21,19A3,3 0 0,1 18,22C17.17,22 16.42,21.66 15.88,21.12C15.5,20.73 15.5,20.1 15.88,19.71C16.27,19.32 16.9,19.32 17.29,19.71C17.47,19.89 17.72,20 18,20A1,1 0 0,0 19,19A1,1 0 0,0 18,18Z";var Y5="M12,21L15.6,16.2C14.6,15.45 13.35,15 12,15C10.65,15 9.4,15.45 8.4,16.2L12,21M12,3C7.95,3 4.21,4.34 1.2,6.6L3,9C5.5,7.12 8.62,6 12,6C15.38,6 18.5,7.12 21,9L22.8,6.6C19.79,4.34 16.05,3 12,3M12,9C9.3,9 6.81,9.89 4.8,11.4L6.6,13.8C8.1,12.67 9.97,12 12,12C14.03,12 15.9,12.67 17.4,13.8L19.2,11.4C17.19,9.89 14.7,9 12,9Z";var S1="M2.28,3L1,4.27L2.47,5.74C2.04,6 1.61,6.29 1.2,6.6L3,9C3.53,8.6 4.08,8.25 4.66,7.93L6.89,10.16C6.15,10.5 5.44,10.91 4.8,11.4L6.6,13.8C7.38,13.22 8.26,12.77 9.2,12.47L11.75,15C10.5,15.07 9.34,15.5 8.4,16.2L12,21L14.46,17.73L17.74,21L19,19.72M12,3C9.85,3 7.8,3.38 5.9,4.07L8.29,6.47C9.5,6.16 10.72,6 12,6C15.38,6 18.5,7.11 21,9L22.8,6.6C19.79,4.34 16.06,3 12,3M12,9C11.62,9 11.25,9 10.88,9.05L14.07,12.25C15.29,12.53 16.43,13.07 17.4,13.8L19.2,11.4C17.2,9.89 14.7,9 12,9Z";var X5="M21 20V2H3V20H1V23H23V20M19 4V11H13V4M5 4H11V11H5M5 20V13H11V20M13 20V13H19V20Z";var J5="M21 20V2H3V20H1V23H23V20M19 4V11H17V4M5 4H7V11H5M5 20V13H7V20M9 20V4H15V20M17 20V13H19V20Z";var C3="M10 6.2C10 4.3 8.8 2.6 7 2V5.7H4V2C2.2 2.6 1 4.3 1 6.2C1 8.1 2.2 9.8 4 10.4V21.4C4 21.8 4.2 22 4.5 22H6.5C6.8 22 7 21.8 7 21.5V10.5C8.8 9.9 10 8.2 10 6.2M16 8C16 8 15.9 8 16 8C12.1 8.1 9 11.2 9 15C9 18.9 12.1 22 16 22S23 18.9 23 15 19.9 8 16 8M16 20C13.2 20 11 17.8 11 15S13.2 10 16 10 21 12.2 21 15 18.8 20 16 20M15 11V16L18.6 18.2L19.4 17L16.5 15.3V11H15Z";var H3="M22.61,19L13.53,9.91C14.46,7.57 14,4.81 12.09,2.91C9.79,0.61 6.21,0.4 3.66,2.26L7.5,6.11L6.08,7.5L2.25,3.69C0.39,6.23 0.6,9.82 2.9,12.11C4.76,13.97 7.47,14.46 9.79,13.59L18.9,22.7C19.29,23.09 19.92,23.09 20.31,22.7L22.61,20.4C23,20 23,19.39 22.61,19M19.61,20.59L10.15,11.13C9.54,11.58 8.86,11.85 8.15,11.95C6.79,12.15 5.36,11.74 4.32,10.7C3.37,9.76 2.93,8.5 3,7.26L6.09,10.35L10.33,6.11L7.24,3C8.5,2.95 9.73,3.39 10.68,4.33C11.76,5.41 12.17,6.9 11.92,8.29C11.8,9 11.5,9.66 11.04,10.25L20.5,19.7L19.61,20.59Z";var V3={alert:C2,check:c2,chevron:h2,chevron_up:g2,clock:O2,counter:f2,dots:P2,error:J1,info:H5,pause:A5,play:d5,power:m5,remote:Z5,stop:y5,timer:R5,water:Q5,wifi:Y5,wifi_off:S1,auto:L2,care:H3,brightness:t2,dishwasher:y2,door:_2,door_closed:B2,dry:v1,end_sound:e2,energy:s1,floor_light:v5,glass:K2,leaf:V5,key_tone:x1,quick:D2,rack:H2,rinse:b2,sanitize:u1,silent:U5,spray:k5,water_percent:c1,zone:c1,bake:w2,chicken:N2,clean:i2,defrost:g5,drawer:D5,fan:F2,fish:E2,flip:z2,fries:I2,fryer:E5,heat:R2,manual:W5,meat:$2,probe:T5,recipe:S2,reheat:Z1,roast:q2,shake:c5,slow:p5,snack:W2,star:b5,steam:n5,temperature:P5,vegetable:u2,warm:Z1,ac:X1,adblue:i5,battery_car:A2,bonnet:n2,car:x2,car_door:v2,charger:T2,fuel:U2,gauge:Q2,history:Y2,lights:Z2,lock:M5,lock_open:r5,marker:e5,motion:s2,odometer:f5,online:m2,parking:d2,range:u5,service:C3,snowflake:S5,software:I5,steering:w5,travel_time:F5,trip:p2,trunk:a2,sunroof:l2,window_closed:X5,window_open:J5,bulb:L5,fridge:G2,frost:O5,ice:k2,mist:K5,night:j5,party:a5,target:_5,co2:t5,exhaust:X2,filter:v1,pm25:j2,reset:s5,sleep:l5,supply:J2,wind:q5,away:M2,indoor:C5,outdoor:B5,swing:V2,battery:r2,boost:s1,calendar:o2,frost_guard:h5,radiator:x5,palette:o5,touch:x1,sparkle:u1,noise:G5,offline:S1,trend_up:$5,trend_down:z5,trend_stable:N5};function A(V,C="icon"){let H=V3[V]||V3.info;return`<svg class="${C}" viewBox="0 0 24 24" aria-hidden="true"><path d="${H}"></path></svg>`}function D(V,C){if(!V)return"";let H=C?.locale?.language||C?.language||"hu",L=C?.locale?.time_format,M={hour:"2-digit",minute:"2-digit"};L==="12"&&(M.hour12=!0),L==="24"&&(M.hour12=!1);try{return new Intl.DateTimeFormat(H,M).format(V)}catch{return V.toTimeString().slice(0,5)}}function p(V,C,H=1){if(V==null||!Number.isFinite(Number(V)))return"\u2013";let L=C?.locale?.language||C?.language||"en";try{return new Intl.NumberFormat(L,{maximumFractionDigits:H,minimumFractionDigits:0}).format(Number(V))}catch{return b3(Number(V),H)}}function b3(V,C=1){return V==null||!Number.isFinite(V)?"\u2013":V.toFixed(C).replace(/\.0$/,"")}function e(V){return String(V??"").replace(/[&<>"']/g,C=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[C])}var $=(V,C)=>V==null?"\u2013":`${p(V,C,1)} \xB0C`;function w3(V,{t:C}){let H=[];if(V.paused?H.push(`<span class="tag warn">${A("window_open")}${e(C("ui.paused_window"))}</span>`):V.active&&H.push(`<span class="tag${V.active.key==="nincs"?" idle":""}">${A(V.active.icon)}${e(C(`active.${V.active.key}`))}</span>`),V.window?.warn){let L=V.window.minutes===null?"":` \xB7 ${V.window.minutes} ${C("ui.minute_short")}`;H.push(`<span class="tag warn">${A(V.window.icon)}${e(C(`window.${V.window.state}`))}${e(L)}</span>`)}return H.push(B3(V,{t:C})),H.filter(Boolean).join("")}function y3(V,{t:C,hass:H}){let L=V.comfort;if(!L||!L.text&&L.felt===null)return"";let M=L.felt===null?"":` title="${e(v(C("ui.felt"),{value:p(L.felt,H,1)}))}"`;return`<span class="tag comfort${L.level?` comfort-${L.level}`:""}"${M}>${A("target")}${e(L.text||"")}</span>`}function B3(V,{t:C}){if(!V.learning)return"";let H=v(C("ui.learning_detail"),{source:C(`source.${V.learning.source}`,V.learning.source||""),from:V.learning.from,target:V.learning.target});return`<span class="tag idle" title="${e(H)}">${A("timer")}${e(C("ui.learning"))}</span>`}function L3(V,{t:C,hass:H}){let L=Object.entries(V.learned||{}).filter(([,M])=>M!=null).map(([M,r])=>v(C("ui.learned_rate"),{source:C(`source.${M}`,M),value:p(r,H,2)}));return L.length?`<div class="note">${e(C("ui.learned_title"))}: ${e(L.join(" \xB7 "))}</div>`:""}function _3(V,{t:C,hass:H}){return V.humidity===null||V.humidity===void 0?"":`<span class="tag idle" title="${e(C("ui.humidity"))}">${A("water_percent")}${e(p(V.humidity,H,0))}%</span>`}function P3(V,{t:C}){return V.lagging?`<span class="tag warn">${A("alert")}${e(C("ui.lagging"))}</span>`:""}function T3(V,{t:C,hass:H}){if(!V?.points?.length)return"";let{points:L,targets:M=[]}=V,r=[...L.map(s=>s.v),...M.map(s=>s.v)],t=Math.min(...r),i=Math.max(...r),o=Math.max(.5,i-t),a=L[0].t,d=L[L.length-1].t,n=Math.max(1,d-a),m=s=>(s-a)/n*100,x=s=>28-(s-t)/o*24,k=L.map((s,S)=>`${S?"L":"M"}${m(s.t).toFixed(2)},${x(s.v).toFixed(2)}`).join(""),W=M.map((s,S)=>{let z=m(s.t).toFixed(2),h=x(s.v).toFixed(2);return S===0?`M${z},${h}`:`L${z},${x(M[S-1].v).toFixed(2)}L${z},${h}`}).join(""),I=M.length?`L100,${x(M[M.length-1].v).toFixed(2)}`:"";return`
    <div class="spark" title="${e(C("ui.history_hint"))}">
      <svg viewBox="0 0 100 30" preserveAspectRatio="none" aria-hidden="true">
        ${W?`<path class="target" d="${W}${I}"></path>`:""}
        <path class="measured" d="${k}"></path>
      </svg>
      <div class="scale"><span>${e(p(i,H,1))}</span><span>${e(p(t,H,1))}</span></div>
    </div>`}function F3(V,{t:C,hass:H,zones:L=[],season:M}){let r=L.filter(t=>t.entity);return r.length?`
    <div class="zoneset">
      <div class="section-title">${e(C("ui.zones_title"))} \xB7 ${e(C(M==="hutes"?"ui.cooling_tab":"ui.heating_tab"))}</div>
      ${r.map(t=>`
        <div class="zonerow">
          <i class="zdot" style="background:${t.colour}"></i>
          <span class="zname">${e(C(`zone.${t.key}`,t.key))}</span>
          <div class="spacer"></div>
          <button class="step-btn" type="button" data-action="zone-step" data-entity="${e(t.entity)}" data-dir="-1">\u2212</button>
          <span class="zval">${e(t.value===null?"\u2013":`${p(t.value,H,1)} \xB0C`)}</span>
          <button class="step-btn" type="button" data-action="zone-step" data-entity="${e(t.entity)}" data-dir="1">+</button>
        </div>`).join("")}
    </div>`:""}function M3(V,{t:C,hass:H}){let L=V.schedule;if(!L)return"";let M=C(`zone.${L.zone}`,L.zone);return L.nextEvent?v(C("ui.band_until"),{zone:M,time:D(L.nextEvent,H)}):M}function R3(V,C){let H=M3(V,C);return H?`<span class="tag idle">${A("calendar")}${e(H)}</span>`:""}function r3(V,{t:C,hass:H,season:L}){let M=V.trend;if(!M)return"";let r=M.direction==="up"?"trend_up":M.direction==="down"?"trend_down":"trend_stable",t=v(C("ui.predicted"),{minutes:M.minutes,value:p(M.predicted,H,1)}),i=L==="hutes",o=M.verdict==="start"?C(i?"ui.verdict_cool_start":"ui.verdict_start"):M.verdict==="stop"?C(i?"ui.verdict_cool_stop":"ui.verdict_stop"):"",a=v(C("ui.trend_rate"),{value:p(M.rate,H,2)});return`<div class="note trend" title="${e(a)}">${A(r)} ${e(t)}${o?` \xB7 ${e(o)}`:""}</div>`}var E3={radiator:"gaz",klima_futes:"klima",klima_hutes:"hutes",aeno:"aeno",nincs:"ki"};function e3(V,{t:C,withReason:H=!0}){if(!V.suggestion)return"";if(V.active&&E3[V.active.key]===V.suggestion.key)return V.suggestion.reason&&H?`<div class="note">${e(V.suggestion.reason)}</div>`:"";let M=C(`suggestion.${V.suggestion.key}`,V.suggestion.key),r=H&&V.suggestion.reason?`<div class="note">${e(V.suggestion.reason)}</div>`:"";return`
    <div class="suggest accent-${V.suggestion.accent}">
      <span class="tag">${A(V.suggestion.icon)}${e(M)}</span>
    </div>${r}`}function t3(V,{t:C,hass:H}){return V.parts.length?`<div class="parts">${V.parts.map(L=>{let M=[];L.key===V.leading&&M.push("lead"),L.excluded&&M.push("out");let r=L.excluded?` (${C("ui.kitchen_excluded")})`:L.key===V.leading?` (${C("ui.leading")})`:"",t=L.humidity===null||L.humidity===void 0?"":` ${p(L.humidity,H,0)}%`;return`<span class="${M.join(" ")}">${e(L.name)} <b>${e($(L.value,H))}</b>${e(t)}${e(r)}</span>`}).join("")}</div>`:""}function i3(V,{t:C,hass:H,season:L}){let M=[];if(V.overshoot&&M.push(C("ui.overshoot")),V.override.until&&M.push(v(C("ui.override_until"),{when:D(V.override.until,H)})),V.preheat){let r=V.preheatDirection==="hutes"||L==="hutes";M.push(v(C(r?"ui.precool":"ui.preheat"),{when:D(V.preheat,H)}))}return M.length?`<div class="note">${e(M.join(" \xB7 "))}</div>`:""}function o3(V,{t:C}){let H=V.climate||V.override.entity?"":"disabled";return`
    <button class="step-btn" type="button" data-action="step" data-room="${e(V.key)}" data-dir="-1"
      aria-label="${e(C("ui.target"))} \u2212" ${H}>\u2212</button>
    <button class="step-btn" type="button" data-action="step" data-room="${e(V.key)}" data-dir="1"
      aria-label="${e(C("ui.target"))} +" ${H}>+</button>`}function D3(V,{t:C}){let H=V.climate?.modes||[];return H.length?`
    <div class="seg small">
      ${H.map(L=>`<button type="button" data-action="hvac" data-room="${e(V.key)}" data-value="${e(L)}"
              aria-pressed="${L===V.climate.mode}">${e(C(`hvac.${L}`,L))}</button>`).join("")}
    </div>`:""}function a3(V,C){let{t:H,showBoost:L=!0}=C,M=(o,a,d,n)=>a.length?`<select data-action="${o}" data-room="${e(V.key)}" title="${e(n)}">
          ${a.map(m=>`<option value="${e(m)}" ${m===d?"selected":""}>${e(H(`${o==="source"?"source":"aggregation"}.${m}`,m))}</option>`).join("")}
        </select>`:"",t=(V.boost===void 0?L:!!V.boost)?`<button class="chip" type="button" data-action="boost" data-room="${e(V.key)}">
        ${A("boost")}<span>${e(H("ui.boost"))}</span></button>`:"",i=V.climate?D3(V,C):M("source",V.source.options,V.source.value,H("ui.source_title"));return`
    <div class="controls">
      ${o3(V,C)}
      ${i}
      ${V.parts.length?M("aggregation",V.aggregation.options,V.aggregation.value,H("ui.aggregation_title")):""}
      ${t}
    </div>`}function z3(V,{t:C,hass:H}){let L=V.frost?`<span class="tag bad">${A("frost")}${e(C("ui.frost_risk"))}</span>`:"";return`
    <div class="room readonly" data-room="${e(V.key)}">
      <div class="line">
        <div class="name">${e(V.name)}</div>
        <div class="spacer"></div>
        ${L}
        <div><div class="temp">${e($(V.temperature,H))}</div></div>
      </div>
      <div class="note">${e(C("ui.readonly"))}</div>
    </div>`}function A3(V,C){let{t:H,hass:L,showControls:M=!0,showParts:r=!0}=C;if(V.readonly)return z3(V,C);let t=V.target===null?"":`<div class="goal">${e(H("ui.target"))} ${e($(V.target,L))}</div>`;return`
    <div class="room" data-room="${e(V.key)}">
      <div class="line">
        <div class="name">${e(V.name)}</div>
        <div class="spacer"></div>
        ${y3(V,C)}
        ${_3(V,C)}
        ${P3(V,C)}
        ${R3(V,C)}
        ${w3(V,C)}
        <div>
          <div class="temp">${e($(V.temperature,L))}</div>
          ${t}
        </div>
      </div>
      ${e3(V,C)}
      ${r?t3(V,C):""}
      ${r3(V,C)}
      ${C.series?T3(C.series,C):""}
      ${i3(V,C)}
      ${L3(V,C)}
      ${M?a3(V,C):""}
      ${C.zones?F3(V,C):""}
    </div>`}function d3(V,C){let{t:H,hass:L,expanded:M}=C;if(V.readonly){let t=V.frost?`<span class="tag bad">${A("frost")}</span>`:"";return`
      <div class="room readonly" data-room="${e(V.key)}">
        <div class="line">
          <div class="name">${e(V.name)}</div>
          <div class="spacer"></div>
          ${t}
          <div class="temp">${e($(V.temperature,L))}</div>
        </div>
      </div>`}let r=[];return V.suggestion&&r.push(`<span class="mark accent-${V.suggestion.accent}" title="${e(H(`suggestion.${V.suggestion.key}`,V.suggestion.key))}">${A(V.suggestion.icon)}</span>`),V.window?.warn&&r.push(`<span class="mark warn" title="${e(H(`window.${V.window.state}`))}">${A(V.window.icon)}</span>`),V.learning&&r.push(`<span class="mark" title="${e(H("ui.learning"))}">${A("timer")}</span>`),V.lagging&&r.push(`<span class="mark warn" title="${e(H("ui.lagging"))}">${A("alert")}</span>`),V.schedule?.own&&r.push(`<span class="mark" title="${e(M3(V,{t:H,hass:L}))}">${A("calendar")}</span>`),V.comfort?.level&&r.push(`<span class="mark comfort-${V.comfort.level}" title="${e(V.comfort.text||"")}">${A("target")}</span>`),`
    <div class="room compact${M?" open":""}" data-room="${e(V.key)}">
      <div class="line" data-action="toggle-room" data-room="${e(V.key)}">
        <div class="name">${e(V.name)}</div>
        <div class="spacer"></div>
        <div class="marks">${r.join("")}</div>
        <div class="nums">
          <span class="temp">${e($(V.temperature,L))}</span>
          <span class="goal">${e(V.target===null?"":$(V.target,L))}</span>
        </div>
        <span class="quick">${o3(V,C)}</span>
        ${A(M?"chevron_up":"chevron")}
      </div>
      ${M?`${e3(V,C)}${t3(V,C)}${r3(V,C)}${i3(V,C)}${L3(V,C)}${a3(V,C)}`:""}
    </div>`}function o1({hass:V,config:C,room:H,action:L,target:M}){let r=(t,i,o)=>V?.callService?.(t,i,o);if(L==="step"){let t=Number(M.dataset.dir);if(H.climate){let a=H.target??H.temperature;if(a==null)return!1;let d=H.climate.step||P,n=Math.min(H.climate.max??F,Math.max(H.climate.min??T,a+t*d));return n===a?!1:(r("climate","set_temperature",{entity_id:H.climate.entity,temperature:n}),!0)}let i=H.override.value??H.target??H.temperature;if(i==null||!H.override.entity)return!1;let o=Math.min(F,Math.max(T,i+t*P));return o===i?!1:(r("input_number","set_value",{entity_id:H.override.entity,value:o}),!0)}if(L==="hvac")return H.climate?(r("climate","set_hvac_mode",{entity_id:H.climate.entity,hvac_mode:M.dataset.value}),!0):!1;if(L==="source")return r("input_select","select_option",{entity_id:H.source.entity,option:M.value}),!0;if(L==="aggregation")return r("input_select","select_option",{entity_id:H.aggregation.entity,option:M.value}),!0;if(L==="zone-step"){let t=M.dataset.entity,i=Number(V?.states?.[t]?.state);if(!t||!Number.isFinite(i))return!1;let o=Number(V.states[t].attributes?.step)||P,a=Math.min(Number(V.states[t].attributes?.max??F),Math.max(Number(V.states[t].attributes?.min??T),i+Number(M.dataset.dir)*o));return a===i?!1:(r("input_number","set_value",{entity_id:t,value:a}),!0)}if(L==="boost"){let t=C?.boost_script||"script.futes_boost",[,i]=t.split(".");return i?(r("script",i,{szoba:H.key}),!0):!1}return!1}var p3=`
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
`;var N3=`
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
`,K=p3+N3;var g1={language:"auto",compact:!1,animate:!0,show_gas:!0,show_pace:!0,show_forecast:!0,show_source:!0,show_mode:!0,show_meter:!0,show_rooms:!0,show_switches:!0,show_power_note:!1},$3=["header","alerts","gas","pace","source","mode","rooms","meter"],h1=class extends HTMLElement{static getConfigElement(){return document.createElement(C1)}static getStubConfig(){return{type:`custom:${y}`}}constructor(){super(),this.attachShadow({mode:"open"}),this._sections={},this._signatures={},this._built=!1,this._pendingSeason=null,this._open=new Set}setConfig(C){this._config={...g1,...C||{}},this._signatures={},this._hass&&this._render()}set hass(C){this._hass=C,this._render()}get hass(){return this._hass}connectedCallback(){this._timer=window.setInterval(()=>this._render(),6e4)}disconnectedCallback(){this._timer&&window.clearInterval(this._timer),this._timer=void 0}getCardSize(){return 7}getGridOptions(){return{columns:12,min_columns:6,rows:"auto"}}_build(){let C=document.createElement("style");C.textContent=K;let H=document.createElement("ha-card"),L=document.createElement("div");L.className="wrap",L.addEventListener("click",M=>this._onClick(M)),L.addEventListener("change",M=>this._onChange(M));for(let M of $3){let r=document.createElement("div");r.dataset.section=M,this._sections[M]=r,L.appendChild(r)}H.appendChild(L),this.shadowRoot.replaceChildren(C,H),this._wrap=L,this._built=!0}_render(){if(!this._hass||!this._config)return;this._built||this._build();let C=E(R(this._config,this._hass)),H=Q(this._hass,this._config),L=t1(this._hass,this._config).rooms;this._model=H,this._rooms=L;let M=["wrap",`accent-${H.source.accent}`];H.season.active==="hutes"&&M.push("cooling"),this._config.compact&&M.push("compact"),this._config.animate||M.push("no-animation");let r=M.join(" ");this._wrap.className!==r&&(this._wrap.className=r),this._section("header",this._headerHtml(H,C)),this._section("alerts",this._alertsHtml(H,L,C)),this._section("gas",this._config.show_gas?this._gasHtml(H,C):""),this._section("pace",this._config.show_pace?this._paceHtml(H,C):""),this._section("source",this._config.show_source?this._sourceHtml(H,C):""),this._section("mode",this._config.show_mode?this._modeHtml(H,C):""),this._section("rooms",this._config.show_rooms?this._roomsHtml(L,C):""),this._section("meter",this._config.show_meter?this._meterHtml(H,C):"")}_section(C,H){this._signatures[C]!==H&&(this._signatures[C]=H,this._sections[C].innerHTML=H,this._sections[C].hidden=!H,C==="meter"&&this._restoreMeterInput())}_headerHtml(C,H){let L=e(this._config.name||H("house_card_name")),M=C.season.active?`<div class="pill">${A(C.season.active==="hutes"?"snowflake":"heat")}${e(H(`season.${C.season.active}`))}</div>`:"",r=this._config.show_power_note?`<span class="tag bad" title="${e(H("ui.power_budget"))}">${A("alert")}${e(H("ui.power_budget"))}</span>`:"";return`
      <div class="header">
        <div>
          <div class="title" data-action="more-info">${L}</div>
        </div>
        <div class="spacer"></div>
        <div class="meta">${r}${M}</div>
      </div>`}_alertsHtml(C,H,L){let M=[];if(C.meter.stale&&M.push(`<div class="alert error">${A("alert")}<span>${e(L("ui.stale"))}</span></div>`),C.forecast.balance!==null&&C.forecast.balance<0&&M.push(`<div class="alert">${A("heat")}<span>${e(v(L("ui.forecast_bad"),{balance:p(Math.abs(C.forecast.balance),this._hass,1)}))}</span></div>`),C.season.active!=="atmeneti"){let r=l(this._hass,C.entities.outside);for(let t of q1(H,N1)){let i={room:t.name,minutes:t.window.minutes,state:L(`window.${t.window.state}`).toLowerCase(),temp:r===null?"":p(r,this._hass,0)},o=r===null?v(L("ui.window_warn"),i):v(L("ui.window_warn_cold"),i);M.push(`<div class="alert">${A("window_open")}<span>${e(o)}</span></div>`)}}return C.flags.boiler===!1&&["gaz","hibrid"].includes(C.source.key)&&M.push(`<div class="alert">${A("info")}<span>${e(L("ui.boiler_off"))}</span></div>`),C.flags.ervLock&&M.push(`<div class="alert info">${A("info")}<span>${e(L("ui.erv_lock"))}</span></div>`),M.length?`<div class="alerts">${M.join("")}</div>`:""}_gasHtml(C,H){let{gas:L}=C;if(!L.ratios)return`<div class="section"><div class="section-title">${e(H("ui.budget"))}</div>
        <div class="muted">${e(H("ui.not_configured"))}</div></div>`;let M=a=>`${(a*100).toFixed(2)}%`,r=L.ratios.allowed===null?"":`<i class="pace" style="left:${M(L.ratios.allowed)}"></i>`,t=L.ratios.reserve?`<i class="reserve" style="width:${M(L.ratios.reserve)}"></i>`:"",i=L.usedMj===null||L.budgetMj===null?"":`<div class="mj">${e(v(H("ui.megajoule"),{value:p(L.usedMj,this._hass,0)}))} / ${e(v(H("ui.megajoule"),{value:p(L.budgetMj,this._hass,0)}))}</div>`,o=L.daysLeft===null?"":`<span>${e(v(H("ui.days_left"),{days:p(L.daysLeft,this._hass,0)}))}</span>`;return`
      <div class="section">
        <div class="section-title">${e(H("ui.budget"))}</div>
        <div class="barline">
          <div>
            <div class="big">${e(v(H("ui.used_of"),{used:p(L.used,this._hass,1),total:p(L.budget,this._hass,1)}))}</div>
            ${i}
          </div>
          <div class="muted">${e(H("ui.left"))}: <b>${e(p(L.left,this._hass,1))} m\xB3</b></div>
        </div>
        <div class="gasbar level-${L.level}">
          <i class="fill" style="width:${M(L.ratios.used)}"></i>
          ${t}${r}
        </div>
        <div class="legend">
          <span><i class="dot pace"></i>${e(H("ui.pace_marker"))}: ${e(p(L.allowed,this._hass,0))} m\xB3</span>
          <span><i class="dot reserve"></i>${e(H("ui.reserve"))}: ${e(p(L.reserve,this._hass,0))} m\xB3</span>
          ${o}
        </div>
      </div>`}_paceHtml(C,H){let{pace:L,forecast:M,gas:r}=C;if(L.actual===null&&!L.unknown&&L.heatingDaily===null)return"";let t=L.heatingDaily===null?null:L.heatingDaily+(L.hotWater||0),o=[`<div class="pacebox${t!==null&&L.actual!==null&&L.actual>t?" over":""}">
        <div class="k">${e(H("ui.pace_actual"))}</div>
        <div class="v">${e(L.unknown?"\u2013":p(L.actual,this._hass,1))}</div>
        <div class="u">${e(L.unknown?H("ui.pace_unknown"):H("ui.per_day"))}</div>
      </div>`,t===null?"":`<div class="pacebox">
            <div class="k">${e(H("ui.pace_allowed"))}</div>
            <div class="v">${e(p(t,this._hass,1))}</div>
            <div class="u">${e(H("ui.per_day"))}</div>
          </div>`].join(""),a=L.lastsDays===null?"":r.daysLeft!==null&&L.lastsDays<r.daysLeft?`<div class="muted">${e(H("ui.lasts_short"))}</div>`:`<div class="muted">${e(v(H("ui.lasts"),{days:L.lastsDays}))}</div>`,d=L.hotWater===null?"":`<div class="muted">${e(v(H("ui.hot_water"),{value:p(L.hotWater,this._hass,1)}))}</div>`,n=!this._config.show_forecast||M.balance===null?"":`<div class="muted">${e(M.balance<0?v(H("ui.forecast_bad"),{balance:p(Math.abs(M.balance),this._hass,1)}):v(H("ui.forecast_ok"),{balance:p(M.balance,this._hass,1)}))}</div>`;return`
      <div class="section">
        <div class="section-title">${e(H("ui.pace_title"))}</div>
        <div class="pacegrid">${o}</div>
        ${a}${d}${n}
      </div>`}_sourceHtml(C,H){if(!C.source.key)return"";let L=H(`source.${C.source.key}`,H("source.unknown")),M=C.source.reason?`<div class="why">${e(C.source.reason)}</div>`:"";return`
      <div class="section">
        <div class="section-title">${e(this._sourceTitle(C,H))}</div>
        <div class="sourcebox">
          <div class="ring">${A(C.source.icon)}</div>
          <div>
            <div class="label">${e(L)}</div>
            ${M}
          </div>
        </div>
      </div>`}_sourceTitle(C,H){return C.source.cooling?H("ui.source_cooling"):C.source.key==="ki"?H("ui.source_idle"):H("ui.source_title")}_modeHtml(C,H){let L=this._segment(_1.filter(n=>!C.mode.options.length||C.mode.options.includes(n.key)),C.mode.key,"mode",H),M=this._segment(P1.filter(n=>!C.season.options.length||C.season.options.includes(n.key)),C.season.choice,"season",H),r=C.mode.key==="csak_gaz"&&["klima","hibrid"].includes(C.source.key)?`<div class="muted">${A("info")} ${e(H("ui.overridden"))}</div>`:"",t=C.season.outdoor3===null?"":`<div class="muted">${e(v(H("ui.outdoor_3day"),{value:p(C.season.outdoor3,this._hass,1)}))}</div>`,i=this._pendingSeason?`<div class="confirm">
          <div class="q">${e(H("ui.cool_confirm"))}</div>
          <div class="hint">${e(H("ui.cool_confirm_hint"))}</div>
          <div class="row">
            <button class="btn primary" type="button" data-action="season-confirm">${e(H("ui.yes"))}</button>
            <button class="btn" type="button" data-action="season-cancel">${e(H("ui.cancel"))}</button>
          </div>
        </div>`:"",o=(n,m,x,k)=>n===null?"":`<button class="chip" type="button" data-action="toggle-flag" data-entity="${e(m)}"
            aria-pressed="${n}">${A(x)}<span>${e(H(k))}</span></button>`,d=[o(C.flags.automation,C.entities.automation,"auto","ui.automation"),this._config.show_switches===!1?"":o(C.flags.boiler,C.entities.boiler,"heat","ui.boiler"),this._config.show_switches===!1?"":o(C.flags.ervLock,C.entities.erv_lock,"exhaust","ui.erv_lock_switch")].filter(Boolean).join("");return`
      <div class="section">
        ${d?`<div class="chips">${d}</div>`:""}
        <div class="section-title">${e(H("ui.mode_title"))}</div>
        <div class="seg" data-group="mode">${L}</div>
        <div class="section-title">${e(H("ui.season_title"))}</div>
        <div class="seg" data-group="season">${M}</div>
        ${t}${r}${i}
      </div>`}_roomsHtml(C,H){if(!C.length)return"";let L={t:H,hass:this._hass,season:this._model.season.active,showBoost:!0};return`
      <div class="section">
        <div class="section-title">${e(H("rooms_card_name"))}</div>
        <div class="rooms">${C.map(M=>d3(M,{...L,expanded:this._open.has(M.key)})).join("")}</div>
      </div>`}_segment(C,H,L,M){return C.map(r=>`<button type="button" data-action="${L}" data-value="${e(r.key)}"
          aria-pressed="${r.key===H}">${A(r.icon)}<span>${e(M(`${L}.${r.key}`))}</span></button>`).join("")}_meterHtml(C,H){let{meter:L}=C,M=L.lastRead?`<div class="muted">${e(v(H("ui.meter_last"),{when:this._when(L.lastRead)}))}</div>`:"",r=L.value===null?"":`<div class="muted">${e(H("ui.meter_value"))}: <b>${e(p(L.value,this._hass,2))} m\xB3</b></div>`;return`
      <div class="section">
        <div class="section-title">${e(H("ui.meter_title"))}</div>
        ${r}
        <div class="meter">
          <label class="field">
            <span>${e(H("ui.meter_manual"))}</span>
            <input type="number" inputmode="decimal" step="0.01" data-action="meter-input"
              placeholder="${e(p(L.manual??L.value,this._hass,2))}">
          </label>
          <button class="btn primary" type="button" data-action="meter-save">${A("check")}<span>${e(H("ui.meter_save"))}</span></button>
        </div>
        ${M}
      </div>`}_when(C){let H=new Date,L=C.toDateString()===H.toDateString(),M=D(C,this._hass);if(L)return M;let r=this._hass?.locale?.language||"hu";try{return`${new Intl.DateTimeFormat(r,{month:"short",day:"numeric"}).format(C)} ${M}`}catch{return M}}_restoreMeterInput(){let C=this._sections.meter?.querySelector('[data-action="meter-input"]');C&&this._meterDraft!==void 0&&(C.value=this._meterDraft),C&&!C.dataset.bound&&(C.dataset.bound="1",C.addEventListener("input",()=>{this._meterDraft=C.value}))}_onClick(C){let H=C.target.closest("[data-action]");if(!H||H.hasAttribute("disabled"))return;let{action:L,value:M}=H.dataset,r=this._model;if(r)switch(L){case"more-info":this._moreInfo(r.entities.source);break;case"mode":this._select(r.entities.mode,M);break;case"season":this._chooseSeason(M);break;case"season-confirm":{let t=this._pendingSeason;this._pendingSeason=null,this._select(r.entities.season_select,t);break}case"season-cancel":this._pendingSeason=null,this._render();break;case"meter-save":this._saveMeter();break;case"toggle-flag":this._haptic("medium"),this._call("input_boolean","toggle",{entity_id:H.dataset.entity});break;case"toggle-room":this._open.has(H.dataset.room)?this._open.delete(H.dataset.room):this._open.add(H.dataset.room),this._render();break;case"step":case"boost":case"hvac":this._roomAction(H);break;default:break}}_onChange(C){let H=C.target.closest("[data-action]");H&&["source","aggregation"].includes(H.dataset.action)&&this._roomAction(H)}_roomAction(C){let H=this._rooms?.find(M=>M.key===C.dataset.room);if(!H)return;o1({hass:this._hass,config:this._config,room:H,action:C.dataset.action,target:C})&&this._haptic(C.dataset.action==="boost"?"medium":"light")}_chooseSeason(C){if(C==="hutes"&&j1()){this._pendingSeason=C,this._render();return}this._pendingSeason=null,this._select(this._model.entities.season_select,C)}_saveMeter(){let C=this._sections.meter?.querySelector('[data-action="meter-input"]'),H=C?.value,L=Number(H);H===void 0||H===""||!Number.isFinite(L)||(this._haptic("medium"),this._call("input_number","set_value",{entity_id:this._model.entities.manual,value:L}),this._meterDraft="",C&&(C.value=""))}_select(C,H){!C||!H||(this._haptic("light"),this._call("input_select","select_option",{entity_id:C,option:H}))}_call(C,H,L){this._hass?.callService?.(C,H,L)}_haptic(C){this.dispatchEvent(new CustomEvent("haptic",{bubbles:!0,composed:!0,detail:C}))}_moreInfo(C){C&&this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:C},bubbles:!0,composed:!0}))}};function n3(){customElements.get(y)||(customElements.define(y,h1),window.customCards=window.customCards||[],window.customCards.push({type:y,name:"F\u0171t\xE9s \xE9s g\xE1zkeret",description:"A g\xE1zkeret \xE1ll\xE1sa \xFCtemjel\xF6l\u0151vel, a napi \xFCtem, az akt\xEDv f\u0171t\xE9si forr\xE1s az indokl\xE1s\xE1val, \xFCzemm\xF3d- \xE9s \xE9vszakv\xE1lt\xF3, \xE9s a g\xE1z\xF3ra k\xE9zi leolvas\xE1sa.",preview:!0,documentationURL:"https://github.com/gabor-io/ha-appliance-custom-card"}),console.info(`%c ${y} %c ${G} `,"color:#fff;background:#e8710a;font-weight:700;border-radius:3px 0 0 3px","color:#e8710a;background:#fff3e0;font-weight:700;border-radius:0 3px 3px 0"))}var f1={language:"auto",compact:!1,animate:!0,show_controls:!0,show_parts:!0,show_boost:!0,show_history:null,show_zones:null},W3=Object.fromEntries(j.map(V=>[V.key,V])),O1=class extends HTMLElement{static getConfigElement(){return document.createElement(H1)}static getStubConfig(){return{type:`custom:${B}`,rooms:[]}}constructor(){super(),this.attachShadow({mode:"open"}),this._sections={},this._signatures={},this._built=!1,this._history={},this._historyAt=0}setConfig(C){this._config={...f1,...C||{}},this._signatures={},this._hass&&this._render()}set hass(C){this._hass=C,this._render(),this._loadHistory()}get hass(){return this._hass}connectedCallback(){this._timer=window.setInterval(()=>this._render(),6e4)}disconnectedCallback(){this._timer&&window.clearInterval(this._timer),this._timer=void 0}get _wantsHistory(){return this._config.show_history===null?!!this._only:!!this._config.show_history}get _wantsZones(){return this._config.show_zones===null?!!this._only:!!this._config.show_zones}async _loadHistory(){if(!this._wantsHistory||!this._hass?.callWS||this._historyLoading||Date.now()-this._historyAt<15*6e4)return;let C=this._rooms||[],H=[];for(let L of C)L.readonly||(L.historyEntity&&H.push(L.historyEntity),L.targetEntity&&H.push(L.targetEntity));if(H.length){this._historyLoading=!0;try{let L=new Date(Date.now()-z1*3600*1e3).toISOString(),M=await this._hass.callWS({type:"history/history_during_period",start_time:L,entity_ids:H,minimal_response:!H.some(r=>r.startsWith("climate.")),no_attributes:!H.some(r=>r.startsWith("climate.")),significant_changes_only:!1});this._history=M||{},this._historyAt=Date.now(),this._signatures={},this._render()}catch{this._historyAt=Date.now()}finally{this._historyLoading=!1}}}_series(C){if(!this._wantsHistory)return null;let H=(M,r)=>{let t=this._history?.[M];return Array.isArray(t)?t.map(i=>{let o=r?i.a?.current_temperature:i.s,a=Number(o),d=Number(i.lu??i.lc);return Number.isFinite(a)&&Number.isFinite(d)?{t:d,v:a}:null}).filter(Boolean):[]},L=H(C.historyEntity,String(C.historyEntity).startsWith("climate."));return L.length<2?null:{points:L,targets:H(C.targetEntity,!1)}}_zones(C){if(!this._wantsZones)return null;let H=this._season==="hutes"?"hutes":"futes",L=this._config.zones||g,M=J(this._hass,this._config,H,[C]);return L.map(r=>({key:r,colour:W3[r]?.colour||"var(--ap-line)",entity:M[r]?.[C.key]?.entity,value:M[r]?.[C.key]?.value??null})).filter(r=>r.entity&&this._hass.states[r.entity])}getCardSize(){return 2+(this._rooms?.length||1)*2}getGridOptions(){return{columns:12,min_columns:6,rows:"auto"}}get _only(){return this._config?.room||this._config?.szoba||null}_build(){let C=document.createElement("style");C.textContent=K;let H=document.createElement("ha-card"),L=document.createElement("div");L.className="wrap",L.addEventListener("click",M=>this._onClick(M)),L.addEventListener("change",M=>this._onChange(M));for(let M of["header","rooms"]){let r=document.createElement("div");r.dataset.section=M,this._sections[M]=r,L.appendChild(r)}H.appendChild(L),this.shadowRoot.replaceChildren(C,H),this._wrap=L,this._built=!0}_render(){if(!this._hass||!this._config)return;this._built||this._build();let C=E(R(this._config,this._hass)),H=t1(this._hass,this._config),L=Q(this._hass,this._config),M=this._only,r=M?H.rooms.filter(a=>a.key===M):H.rooms;this._model=H,this._rooms=r,this._season=L.season.active;let i=["wrap",`accent-${M&&r[0]?.suggestion?.accent||L.source.accent}`];this._config.compact&&i.push("compact"),this._config.animate||i.push("no-animation");let o=i.join(" ");this._wrap.className!==o&&(this._wrap.className=o),this._section("header",this._headerHtml(r,C)),this._section("rooms",this._roomsHtml(r,C))}_section(C,H){this._signatures[C]!==H&&(this._signatures[C]=H,this._sections[C].innerHTML=H,this._sections[C].hidden=!H)}_headerHtml(C,H){let L=this._only,M=L?C[0]?.name||L:H("rooms_card_name");return`<div class="header"><div><div class="title">${e(this._config.name||M)}</div></div></div>`}_roomsHtml(C,H){if(!C.length)return`<div class="empty">${A("radiator")}<div>${e(H("ui.no_rooms"))}</div></div>`;let L={t:H,hass:this._hass,season:this._season,showControls:this._config.show_controls,showParts:this._config.show_parts,showBoost:this._config.show_boost};return`<div class="rooms">${C.map(M=>A3(M,{...L,series:this._series(M),zones:this._zones(M)})).join("")}</div>`}_room(C){return this._rooms?.find(H=>H.key===C)||null}_act(C){let H=C.target.closest("[data-action]");if(!H||H.hasAttribute("disabled"))return;let L=H.dataset.action==="zone-step"?this._rooms?.[0]:this._room(H.dataset.room);if(!L)return;o1({hass:this._hass,config:this._config,room:L,action:H.dataset.action,target:H})&&this._haptic(H.dataset.action==="boost"?"medium":"light")}_onClick(C){this._act(C)}_onChange(C){this._act(C)}_haptic(C){this.dispatchEvent(new CustomEvent("haptic",{bubbles:!0,composed:!0,detail:C}))}};function m3(){customElements.get(B)||(customElements.define(B,O1),window.customCards=window.customCards||[],window.customCards.push({type:B,name:"F\u0171t\xE9s \u2013 szob\xE1k",description:"Szob\xE1nk\xE9nti m\xE9rt \xE9s c\xE9lh\u0151m\xE9rs\xE9klet, k\xE9zi fel\xFCl\xEDr\xE1s, forr\xE1sjavaslat az indokl\xE1s\xE1val, ablak\xE1llapot \xE9s boost \u2013 mindig helper entit\xE1sokon kereszt\xFCl. Egy szob\xE1ra sz\u0171k\xEDthet\u0151.",preview:!0,documentationURL:"https://github.com/gabor-io/ha-appliance-custom-card"}),console.info(`%c ${B} %c ${G} `,"color:#fff;background:#1a73e8;font-weight:700;border-radius:3px 0 0 3px","color:#1a73e8;background:#fff3e0;font-weight:700;border-radius:0 3px 3px 0"))}var b1={language:"auto",compact:!1,animate:!0,show_timeline:!0,show_zones:!0},a1=Object.fromEntries(j.map(V=>[V.key,V])),l3=Object.fromEntries(Object.values(f).map(V=>[V,[]])),v3=V=>String(V).length===5?`${V}:00`:String(V),k1=class extends HTMLElement{static getConfigElement(){return document.createElement(V1)}static getStubConfig(){return{type:`custom:${_}`,rooms:[]}}constructor(){super(),this.attachShadow({mode:"open"}),this._sections={},this._signatures={},this._built=!1,this._day=N[(new Date().getDay()+6)%7],this._tab=null,this._copyOpen=!1,this._blocksByEntity={},this._idByEntity={},this._group=0,this._loading=!1,this._error=null}setConfig(C){this._config={...b1,...C||{}},this._signatures={},this._blocksByEntity={},this._idByEntity={},this._group=0,this._hass&&this._render()}set hass(C){let H=this._hass;this._hass=C,(this._config?i1(this._config):[]).some(r=>!this._blocksByEntity[r.entity]||H?.states?.[r.entity]!==C?.states?.[r.entity])&&this._loadBlocks(),this._render()}get hass(){return this._hass}getCardSize(){return 9}getGridOptions(){return{columns:12,min_columns:8,rows:"auto"}}get _groups(){return i1(this._config)}get _entity(){let C=this._groups;return(C[this._group]||C[0])?.entity}get _season(){return this._tab?this._tab:this._houseSeason==="hutes"?"hutes":"futes"}async _resolveScheduleId(C,H){if(this._config.schedule_id)return this._config.schedule_id;try{let r=await this._hass.callWS({type:"config/entity_registry/get",entity_id:H});if(r?.unique_id&&C.some(t=>t.id===r.unique_id))return r.unique_id}catch{}if(C.length===1)return C[0].id;let L=H.split(".")[1];return C.find(r=>String(r.name||"").toLowerCase().replace(/[^a-z0-9]+/g,"_")===L)?.id||null}async _loadBlocks(){if(this._loading||!this._hass?.callWS)return;let C=i1(this._config);if(C.some(H=>u(this._hass,H.entity))){this._loading=!0;try{let H=await this._hass.callWS({type:"schedule/list"}),L={},M={};for(let r of C){if(!u(this._hass,r.entity))continue;let t=r.id||await this._resolveScheduleId(H||[],r.entity),i=(H||[]).find(o=>o.id===t);M[r.entity]=t,L[r.entity]=i?Object.fromEntries(Object.values(f).map(o=>[o,i[o]||[]])):{...l3},i?.name&&(this._names={...this._names,[r.entity]:i.name})}this._blocksByEntity=L,this._idByEntity=M,this._error=null}catch(H){this._error=String(H?.message||H)}finally{this._loading=!1,this._signatures={},this._render()}}}async _save(C){let H=this._entity,L=this._idByEntity[H];if(!(!L||!this._hass?.callWS)){this._blocksByEntity={...this._blocksByEntity,[H]:C},this._signatures={},this._render();try{await this._hass.callWS({type:"schedule/update",schedule_id:L,name:this._names?.[H]||this._config.name||"F\u0171t\xE9s",...C})}catch(M){this._error=String(M?.message||M),this._loadBlocks()}}}_build(){let C=document.createElement("style");C.textContent=K;let H=document.createElement("ha-card"),L=document.createElement("div");L.className="wrap",L.addEventListener("click",M=>this._onClick(M)),L.addEventListener("change",M=>this._onChange(M));for(let M of["header","tabs","days","timeline","slots","copy","zones"]){let r=document.createElement("div");r.dataset.section=M,this._sections[M]=r,L.appendChild(r)}H.appendChild(L),this.shadowRoot.replaceChildren(C,H),this._wrap=L,this._built=!0}_render(){if(!this._hass||!this._config)return;this._built||this._build();let C=E(R(this._config,this._hass)),H=Q(this._hass,this._config);this._houseSeason=H.season.active;let L=this._groups,M=L[this._group]||L[0],r=Y1(this._hass,this._config,this._blocksByEntity[M.entity],M.entity),t=M.rooms.length?M.rooms:Y(this._config).filter(a=>!a.readonly);this._model=r,this._rooms=t;let i=["wrap",`accent-${this._season==="hutes"?"cool":"gas"}`];this._config.compact&&i.push("compact"),this._config.animate||i.push("no-animation");let o=i.join(" ");this._wrap.className!==o&&(this._wrap.className=o),this._section("header",this._headerHtml(r,C)),this._section("tabs",`${this._plansHtml(L,C)}${this._tabsHtml(C)}`),this._section("days",r.ok?this._daysHtml(C):""),this._section("timeline",r.ok&&this._config.show_timeline?this._timelineHtml(r,C):""),this._section("slots",r.ok?this._bandsHtml(r,t,C):this._emptyHtml(r,C)),this._section("copy",this._copyHtml(C)),this._section("zones",this._config.show_zones?this._zonesHtml(r,t,C):"")}_section(C,H){this._signatures[C]!==H&&(this._signatures[C]=H,this._sections[C].innerHTML=H,this._sections[C].hidden=!H)}_emptyHtml(C,H){let L=this._error?this._error:C.reason==="loading"?H("ui.loading"):H("ui.no_schedule");return`<div class="empty">${A("calendar")}<div>${e(L)}</div></div>`}_headerHtml(C,H){let L=e(this._config.name||H("schedule_card_name")),M=C.zoneNow?`<div class="pill">${A(a1[C.zoneNow]?.icon||"calendar")}${e(v(H("ui.current_zone"),{zone:H(`zone.${C.zoneNow}`,C.zoneNow)}))}</div>`:"",r=C.nextEvent?`<div class="sub">${e(v(H("ui.next_change"),{zone:H(`zone.${C.zoneNow===C.zoneOn?C.zoneOff:C.zoneOn}`),time:D(C.nextEvent,this._hass)}))}</div>`:"";return`
      <div class="header">
        <div>
          <div class="title">${L}</div>
          ${r}
        </div>
        <div class="spacer"></div>
        <div class="meta">${M}</div>
      </div>`}_plansHtml(C,H){return C.length<2?"":`
      <div class="tabs plans">
        ${C.map((L,M)=>`<button type="button" data-action="plan" data-value="${M}" aria-pressed="${M===this._group}">
                ${e(L.label||H("ui.plan_rooms"))}</button>`).join("")}
      </div>`}_tabsHtml(C){let H=this._season;return`
      <div class="tabs">
        <button type="button" data-action="tab" data-value="futes" aria-pressed="${H==="futes"}">${e(C("ui.heating_tab"))}</button>
        <button type="button" data-action="tab" data-value="hutes" aria-pressed="${H==="hutes"}">${e(C("ui.cooling_tab"))}</button>
      </div>`}_daysHtml(C){let H=N[(new Date().getDay()+6)%7];return`
      <div class="days">
        ${N.map(L=>`<button type="button" class="${L===H?"today":""}" data-action="day" data-value="${L}"
              aria-pressed="${L===this._day}" title="${e(C(`day_long.${L}`))}">${e(C(`day.${L}`))}</button>`).join("")}
      </div>`}_timelineHtml(C,H){let M=(C.days[this._day]||[]).map(r=>{let t=a1[r.zone]?.colour||"var(--ap-line)",i=(r.end-r.start)/1440*100,o=`${X(r.start)}\u2013${X(r.end)} ${H(`zone.${r.zone}`,r.zone)}`;return`<i class="seg-block" style="flex:0 0 ${i.toFixed(3)}%;background:${t}" title="${e(o)}"></i>`}).join("");return`
      <div class="section">
        <div class="section-title">${e(H("ui.timeline_title"))}</div>
        <div class="timeline">${M}</div>
        <div class="hours"><span>0</span><span>6</span><span>12</span><span>18</span><span>24</span></div>
      </div>`}_bandsHtml(C,H,L){let M=f[this._day],r=C.blocks?.[M]||[],t=J(this._hass,this._config,this._season,H),i=d=>H.map(n=>{let m=t[d]?.[n.key];return m&&m.value!==null?`${n.name} ${p(m.value,this._hass,1)}`:null}).filter(Boolean).join(" \xB7 "),o=r.map((d,n)=>{let m=a1[C.zoneOn];return`
          <div class="slot" data-index="${n}">
            <i class="swatch" style="background:${m?.colour||"var(--ap-line)"}"></i>
            <span class="zone">${e(L(`zone.${C.zoneOn}`,C.zoneOn))}</span>
            <input type="time" value="${e(String(d.from).slice(0,5))}" data-action="band-from">
            <span class="zone">\u2013</span>
            <input type="time" value="${e(String(d.to).slice(0,5))}" data-action="band-to">
            <div class="spacer"></div>
            <button class="step-btn" type="button" data-action="band-remove" title="${e(L("ui.remove_slot"))}">\u2212</button>
            <div class="temps">${e(i(C.zoneOn))}</div>
          </div>`}).join(""),a=`<div class="muted">${A("night")} ${e(v(L("ui.outside_bands"),{zone:L(`zone.${C.zoneOff}`,C.zoneOff)}))}${i(C.zoneOff)?` \xB7 ${e(i(C.zoneOff))}`:""}</div>`;return`
      <div class="section">
        <div class="section-title">${e(L("ui.slots_title"))}</div>
        <div class="slots">${o||`<div class="muted">${e(L("ui.no_bands"))}</div>`}</div>
        ${a}
        <div class="controls">
          <button class="chip" type="button" data-action="band-add">${A("clock")}<span>${e(L("ui.add_slot"))}</span></button>
          <button class="chip" type="button" data-action="copy-open">${A("calendar")}<span>${e(L("ui.copy_day"))}</span></button>
        </div>
        <div class="muted">${e(L("ui.schedule_hint"))}</div>
      </div>`}_copyHtml(C){if(!this._copyOpen)return"";let H=N.filter(L=>L!==this._day).map(L=>`<label class="chip"><input type="checkbox" data-copy="${L}"> <span>${e(C(`day_long.${L}`))}</span></label>`).join("");return`
      <div class="section">
        <div class="section-title">${e(C("ui.copy_to"))}</div>
        <div class="chips">${H}</div>
        <div class="controls">
          <button class="btn primary" type="button" data-action="copy-apply">${e(C("ui.save"))}</button>
          <button class="btn" type="button" data-action="copy-cancel">${e(C("ui.cancel"))}</button>
        </div>
      </div>`}_zonesHtml(C,H,L){if(!H.length)return`<div class="muted">${e(L("ui.no_rooms"))}</div>`;let M=this._config.zones||C.zones||g,r=J(this._hass,this._config,this._season,H),t=H.map(o=>`<th>${e(o.name)}</th>`).join(""),i=M.map(o=>{let a=a1[o],d=H.map(n=>{let m=r[o]?.[n.key];return!m||!u(this._hass,m.entity)?'<td class="muted">\u2013</td>':`<td><input class="val" type="number" step="${P}" min="${T}" max="${F}"
              value="${m.value===null?"":m.value}"
              data-action="zone-temp" data-entity="${e(m.entity)}"></td>`}).join("");return`<tr>
          <td class="rowhead"><i class="zdot" style="background:${a?.colour||"var(--ap-line)"}"></i>${e(L(`zone.${o}`,o))}</td>
          ${d}
        </tr>`}).join("");return`
      <div class="section">
        <div class="section-title">${e(L("ui.zones_title"))} \xB7 ${e(this._season==="hutes"?L("ui.cooling_tab"):L("ui.heating_tab"))}</div>
        <div class="tablewrap">
          <table class="ztable">
            <thead><tr><th class="rowhead"></th>${t}</tr></thead>
            <tbody>${i}</tbody>
          </table>
        </div>
      </div>`}_onClick(C){let H=C.target.closest("[data-action]");if(!H||H.hasAttribute("disabled"))return;let{action:L,value:M}=H.dataset;switch(L){case"plan":this._group=Number(M),this._signatures={},this._render();break;case"tab":this._tab=M,this._signatures={},this._render();break;case"day":this._day=M,this._render();break;case"band-add":this._addBand();break;case"band-remove":this._removeBand(Number(H.closest(".slot").dataset.index));break;case"copy-open":this._copyOpen=!0,this._render();break;case"copy-cancel":this._copyOpen=!1,this._render();break;case"copy-apply":this._applyCopy();break;default:break}}_onChange(C){let H=C.target.closest("[data-action]");if(!H)return;let{action:L}=H.dataset;if(L==="zone-temp"){let M=Number(H.value);if(!H.dataset.entity||!Number.isFinite(M))return;this._hass.callService("input_number","set_value",{entity_id:H.dataset.entity,value:M});return}if(L==="band-from"||L==="band-to"){let M=Number(H.closest(".slot").dataset.index);this._editBand(M,L==="band-from"?{from:v3(H.value)}:{to:v3(H.value)})}}_week(){return{...l3,...this._blocksByEntity[this._entity]||{}}}_normalise(C){return[...C].filter(H=>w(H.to)>w(H.from)).sort((H,L)=>w(H.from)-w(L.from)).filter((H,L,M)=>L===0||w(M[L-1].to)<=w(H.from))}_writeDay(C,H){let L=this._week();L[C]=this._normalise(H),this._save(L)}_editBand(C,H){let L=f[this._day],M=(this._week()[L]||[]).map((r,t)=>t===C?{...r,...H}:r);this._writeDay(L,M)}_removeBand(C){let H=f[this._day];this._writeDay(H,(this._week()[H]||[]).filter((L,M)=>M!==C))}_addBand(){let C=f[this._day],H=this._week()[C]||[],L=(this._model.days[this._day]||[]).filter(o=>o.zone===this._model.zoneOff);if(!L.length)return;let M=L.reduce((o,a)=>a.end-a.start>o.end-o.start?a:o),r=M.end-M.start,t=M.start+Math.max(0,Math.round(r/3/15)*15),i=Math.min(1440,t+Math.max(60,Math.round(r/3/15)*15));i<=t||this._writeDay(C,[...H,{from:`${X(t)}:00`,to:i===1440?"24:00:00":`${X(i)}:00`}])}_applyCopy(){let H=[...this._sections.copy.querySelectorAll("[data-copy]")].filter(r=>r.checked).map(r=>r.dataset.copy);if(this._copyOpen=!1,!H.length){this._render();return}let L=this._week(),M=L[f[this._day]]||[];for(let r of H)L[f[r]]=M.map(t=>({...t}));this._save(L)}};function x3(){customElements.get(_)||(customElements.define(_,k1),window.customCards=window.customCards||[],window.customCards.push({type:_,name:"F\u0171t\xE9s \u2013 \xFCtemterv",description:"Heti \xFCtemterv sz\xEDnes id\u0151vonallal a Home Assistant be\xE9p\xEDtett schedule helpere f\xF6l\xF6tt, komfort s\xE1vok szerkeszt\xE9s\xE9vel \xE9s z\xF3n\xE1nk\xE9nti h\u0151m\xE9rs\xE9klet-t\xE1bl\xE1zattal, f\u0171t\xE9sre \xE9s h\u0171t\xE9sre.",preview:!0,documentationURL:"https://github.com/gabor-io/ha-appliance-custom-card"}),console.info(`%c ${_} %c ${G} `,"color:#fff;background:#3d9970;font-weight:700;border-radius:3px 0 0 3px","color:#3d9970;background:#fff3e0;font-weight:700;border-radius:0 3px 3px 0"))}var I3=`
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
`;function w1({cardName:V,toggles:C,defaults:H}){return class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}setConfig(M){this._config={...M},this._render()}set hass(M){let r=!this._hass;this._hass=M,r&&this._render()}_render(){if(!this._config||!this._hass)return;let M=E(R(this._config,this._hass)),r=[`<option value="auto">${e(M("editor.language_auto"))}</option>`,...n1.map(i=>`<option value="${i}" ${this._config.language===i?"selected":""}>${i.toUpperCase()}</option>`)].join(""),t=C.map(i=>{let o=this._config[i]??H[i]??!1;return`<label class="toggle"><input type="checkbox" data-key="${i}" ${o?"checked":""}>
            <span>${e(M(`editor.${i}`))}</span></label>`}).join("");this.shadowRoot.innerHTML=`
        <style>${I3}</style>
        <div class="form">
          <label>${e(M("editor.name"))}
            <input type="text" data-key="name" value="${e(this._config.name||"")}">
          </label>
          <label>${e(M("editor.language"))}
            <select data-key="language">${r}</select>
          </label>
          <label>${e(M("editor.prefix"))}
            <input type="text" data-key="prefix" value="${e(this._config.prefix||"")}" placeholder="futes">
          </label>
          <div class="title">${e(M("editor.sections"))}</div>
          <div class="toggles">${t}</div>
        </div>`,this.shadowRoot.querySelectorAll("[data-key]").forEach(i=>i.addEventListener("change",o=>this._onChange(o)))}_onChange(M){let r=M.target,t=r.dataset.key,i={...this._config,type:this._config.type||`custom:${V}`};r.type==="checkbox"?i[t]=r.checked:r.value===""?delete i[t]:i[t]=r.value,this._config=i,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:i},bubbles:!0,composed:!0}))}}}var G3=w1({cardName:y,toggles:["show_gas","show_pace","show_forecast","show_source","show_mode","show_meter","show_rooms","show_switches","show_power_note","compact","animate"],defaults:g1}),U3=w1({cardName:B,toggles:["show_controls","show_parts","show_boost","show_history","compact","animate"],defaults:f1}),Q3=w1({cardName:_,toggles:["show_timeline","show_zones","compact","animate"],defaults:b1});function Z3(){let V=[[C1,G3],[H1,U3],[V1,Q3]];for(let[C,H]of V)customElements.get(C)||customElements.define(C,H)}Z3();n3();m3();x3();
