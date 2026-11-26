/*! ha-appliance-cards v1.32.0 - https://github.com/gabor-io/ha-appliance-custom-card - MIT licence */
var l="media-room-card",u="media-room-card-editor",K="1.32.0",B="media_player",D5=["unknown","unavailable","off","idle","on","paused","buffering","playing"],O=Object.fromEntries(D5.map((r,C)=>[r,C])),q=O.idle,j=O.on,m={PAUSE:1,SEEK:2,VOLUME_SET:4,VOLUME_MUTE:8,PREVIOUS_TRACK:16,NEXT_TRACK:32,TURN_ON:128,TURN_OFF:256,PLAY_MEDIA:512,VOLUME_STEP:1024,SELECT_SOURCE:2048,STOP:4096,PLAY:16384,SHUFFLE_SET:32768,SELECT_SOUND_MODE:65536,BROWSE_MEDIA:131072,REPEAT_SET:262144},Y={tvshow:"tv",episode:"tv",movie:"movie",video:"movie",music:"music",playlist:"music",podcast:"podcast",game:"game",app:"apps",channel:"tv",url:"cast"},X=["channel","app"],h={apple:{up:"up",down:"down",left:"left",right:"right",select:"select",back:"menu",home:"home",menu:"top_menu",rewind:"skip_backward",forward:"skip_forward"},samsung:{up:"KEY_UP",down:"KEY_DOWN",left:"KEY_LEFT",right:"KEY_RIGHT",select:"KEY_ENTER",back:"KEY_RETURN",home:"KEY_HOME",menu:"KEY_MENU",rewind:"KEY_REWIND",forward:"KEY_FF"}},J={apple_tv:"apple",samsungtv:"samsung",samsungtv_smart:"samsung"},C1=[[null,"up",null],["left","select","right"],[null,"down",null]],H1=["back","home","menu","rewind","forward"],V1={up:"chevron_up",down:"chevron",left:"chevron_left",right:"chevron_right",select:"dot",back:"back",home:"home",menu:"menu",rewind:"rewind",forward:"forward"},L1=/^(.+?)\*(\d+)$/,y=120,M1=1e3;function r1(r,C,H){let V=r?.language&&r.language!=="auto"?r.language:null,L=(C?.locale?.language||C?.language||"en").slice(0,2).toLowerCase(),M=V||L;return H.includes(M)?M:"en"}function e1(r,C,H="en"){let V=r[C]||r[H],L=r[H],M=(e,i)=>i.split(".").reduce((o,a)=>o?o[a]:void 0,e);return(e,i="")=>{let o=M(V,e);if(o!==void 0)return o;let a=M(L,e);return a!==void 0?a:i}}var E5={card_name:"M\xE9diaszoba",state:{playing:"Megy",paused:"Meg\xE1ll\xEDtva",buffering:"T\xF6lt\u0151dik",idle:"K\xE9szenl\xE9tben",on:"Bekapcsolva",off:"Kikapcsolva",unavailable:"Nem v\xE1laszol",unknown:"Ismeretlen"},ui:{nothing:"Most semmi nem megy",nothing_sub:"Mindk\xE9t lej\xE1tsz\xF3 n\xE9ma \u2013 ami elindul, az jelenik meg itt.",nothing_sub_one:"A lej\xE1tsz\xF3 n\xE9ma \u2013 ami elindul, az jelenik meg itt.",no_entities:"Nincs megadva lej\xE1tsz\xF3. \xCDrd be az `entities:` al\xE1 azokat a media_player entit\xE1sokat, amik ugyanazt a k\xE9perny\u0151t hajtj\xE1k.",missing_entities:"A megadott lej\xE1tsz\xF3k egyike sem l\xE9tezik ebben a Home Assistantban.",players:"Lej\xE1tsz\xF3k",pinned:"r\xF6gz\xEDtve",pin_hint:"Koppints egy lej\xE1tsz\xF3ra, hogy azt mutassa a k\xE1rtya",volume:"Hanger\u0151",muted:"N\xE9m\xEDtva",volume_of:"hanger\u0151: {name}",source:"Forr\xE1s",sound_mode:"Hangz\xE1s",remote:"T\xE1vir\xE1ny\xEDt\xF3",sending:"megy\u2026",left:"m\xE9g {time}",of:"{elapsed} / {duration}",power:"Be/ki",prev:"El\u0151z\u0151",next:"K\xF6vetkez\u0151",play:"Lej\xE1tsz\xE1s",pause:"Sz\xFCnet",stop:"Le\xE1ll\xEDt\xE1s",mute:"N\xE9m\xEDt\xE1s",unmute:"N\xE9m\xEDt\xE1s vissza",unavailable_player:"nem v\xE1laszol",missing_player:"nincs ilyen entit\xE1s"},key:{up:"Fel",down:"Le",left:"Balra",right:"Jobbra",select:"OK",back:"Vissza",home:"F\u0151men\xFC",menu:"Men\xFC",rewind:"Vissza egy kicsit",forward:"El\u0151re egy kicsit"},editor:{entities:"Lej\xE1tsz\xF3k",volume_entity:"A hanger\u0151 ez\xE9",volume_entity_hint:"Ha a hang nem abb\xF3l j\xF6n, ami j\xE1tszik \u2013 p\xE9ld\xE1ul a box k\xE9pet ad, a TV hangot \u2013, itt add meg a TV-t.",volume_entity_auto:"Ami \xE9pp megy",entities_hint:"Amelyik elindul, az jelenik meg. Egyenl\u0151 \xE1llapotn\xE1l a lista sorrendje d\xF6nt.",name:"N\xE9v",language:"Nyelv",language_auto:"Automatikus",sections:"Mit mutasson",show_artwork:"Bor\xEDt\xF3k\xE9p",show_progress:"J\xE1t\xE9kid\u0151",show_volume:"Hanger\u0151",show_players:"Lej\xE1tsz\xF3k sora",show_sources:"Forr\xE1s \xE9s hangz\xE1s",show_remote:"T\xE1vir\xE1ny\xEDt\xF3 gomb",show_macros:"Makr\xF3gombok",compact:"T\xF6m\xF6r"}},_5={card_name:"Media room",state:{playing:"Playing",paused:"Paused",buffering:"Buffering",idle:"Idle",on:"On",off:"Off",unavailable:"Not answering",unknown:"Unknown"},ui:{nothing:"Nothing playing",nothing_sub:"Both players are quiet - whichever starts will show up here.",nothing_sub_one:"The player is quiet - whatever starts will show up here.",no_entities:"No players configured. List the media_player entities that drive the same screen under `entities:`.",missing_entities:"None of the configured players exist in this Home Assistant.",players:"Players",pinned:"pinned",pin_hint:"Tap a player to make the card show that one",volume:"Volume",muted:"Muted",volume_of:"volume: {name}",source:"Source",sound_mode:"Sound mode",remote:"Remote",sending:"sending\u2026",left:"{time} left",of:"{elapsed} / {duration}",power:"Power",prev:"Previous",next:"Next",play:"Play",pause:"Pause",stop:"Stop",mute:"Mute",unmute:"Unmute",unavailable_player:"not answering",missing_player:"no such entity"},key:{up:"Up",down:"Down",left:"Left",right:"Right",select:"OK",back:"Back",home:"Home",menu:"Menu",rewind:"Skip back",forward:"Skip forward"},editor:{entities:"Players",volume_entity:"Volume belongs to",volume_entity_hint:"When the sound comes from something other than the player - a box for the picture, the TV for the sound - name the TV here.",volume_entity_auto:"Whatever is playing",entities_hint:"Whichever starts is shown. On equal states the list order decides.",name:"Name",language:"Language",language_auto:"Automatic",sections:"What to show",show_artwork:"Artwork",show_progress:"Progress",show_volume:"Volume",show_players:"Player row",show_sources:"Source and sound mode",show_remote:"Remote button",show_macros:"Macro buttons",compact:"Compact"}},t1={hu:E5,en:_5},P=Object.keys(t1);function g(r,C){return r1(r,C,P)}function f(r){return e1(t1,r,"hu")}function s(r,C){return String(r).replace(/\{(\w+)\}/g,(H,V)=>C[V]===void 0?H:String(C[V]))}function N5(r){return Object.values(r?.entities||{})}function c(r){let C=new Set(N5(r).map(H=>H.entity_id).filter(H=>H.startsWith(`${B}.`)));for(let H of Object.keys(r?.states||{}))H.startsWith(`${B}.`)&&C.add(H);return[...C].map(H=>({id:H,name:k(r,H)})).sort((H,V)=>H.name.localeCompare(V.name))}function k(r,C){return r?.states?.[C]?.attributes?.friendly_name||r?.entities?.[C]?.name||C.split(".").slice(1).join(".")}function w(r){let C=r?.entities??r?.entity??[],H=Array.isArray(C)?C:[C],V=new Set,L=[];for(let M of H){let e=typeof M=="string"?M:M?.entity;typeof e!="string"||!e.includes(".")||V.has(e)||(V.add(e),L.push({entityId:e,name:typeof M=="object"&&M?.name||null}))}return L}function i1(r,C){let H=r?.entities?.[C];if(!H?.device_id)return null;let V=Object.values(r.entities).find(L=>L.device_id===H.device_id&&L.entity_id.startsWith("remote."));return!V||!r.states?.[V.entity_id]?null:{entityId:V.entity_id,keys:J[V.platform]||null,platform:V.platform||null}}var W5=r=>O[r]??0;function v(r,C){return!!((Number(r?.attributes?.supported_features)||0)&C)}function I5(r,C=Date.now()){let H=r?.attributes||{},V=Number(H.media_duration),L=Number(H.media_position);if(!Number.isFinite(V)||V<=0||!Number.isFinite(L))return null;let M=L;if(r.state==="playing"&&H.media_position_updated_at){let e=(C-Date.parse(H.media_position_updated_at))/1e3;Number.isFinite(e)&&e>0&&(M+=e)}return M=Math.max(0,Math.min(V,M)),{elapsed:M,duration:V,remaining:V-M,percent:M/V*100}}function G5(r){let C=Number(r?.media_season),H=Number(r?.media_episode),V=L=>String(L).padStart(2,"0");return Number.isFinite(C)&&Number.isFinite(H)?`S${V(C)}E${V(H)}`:Number.isFinite(H)?`E${V(H)}`:r?.media_episode?String(r.media_episode):null}function Q5(r,C){let H=r?.attributes||{},V=H.media_title||H.media_channel||null,L=G5(H),M=[];return H.media_series_title&&H.media_series_title!==V&&M.push(H.media_series_title),L&&M.push(L),H.media_artist&&H.media_artist!==V&&M.push(H.media_artist),H.media_album_name&&H.media_album_name!==V&&M.push(H.media_album_name),{title:V||C(`state.${r?.state}`,C("state.unknown")),sub:M.join(" \xB7 ")||null,hasMedia:!!V}}function U5(r,C,H){let V=C?.volume_entity,L=V&&r?.states?.[V]||H?.stateObj||null;if(!L)return null;let M=L.entity_id||H?.entityId,e=Number(L.attributes?.volume_level);return{entityId:M,name:k(r,M),other:!!(V&&r?.states?.[V]&&M!==H?.entityId),level:Number.isFinite(e)?e:null,muted:!!L.attributes?.is_volume_muted,modes:A1(L,"sound_mode_list","sound_mode",m.SELECT_SOUND_MODE),can:{set:v(L,m.VOLUME_SET),mute:v(L,m.VOLUME_MUTE),step:v(L,m.VOLUME_STEP)}}}function A1(r,C,H,V){if(!v(r,V))return null;let L=r?.attributes?.[C];if(!Array.isArray(L)||L.length<2)return null;let M=[...new Set(L.filter(e=>typeof e=="string"))];return M.length<2?null:{options:M,current:r.attributes?.[H]??null}}function z5(r,C,H){if(C?.show_remote===!1)return null;let V=C?.remote_entity,L=V?{entityId:V,keys:null,platform:r?.entities?.[V]?.platform||null}:i1(r,H?.entityId);if(!L||!r?.states?.[L.entityId])return null;let M=C?.remote_keys&&C.remote_keys!=="auto"?C.remote_keys:null,e=typeof M=="object"&&M||h[M]||h[L.keys]||h[{apple_tv:"apple",samsungtv:"samsung",samsungtv_smart:"samsung"}[L.platform]]||null;return e?{entityId:L.entityId,keys:e}:null}function $5(r,C){let H=[];for(let V of Array.isArray(r)?r:[]){let L=String(V).trim();if(!L)continue;let M=L1.exec(L),e=M?M[1]:L,i=M?Math.min(Number(M[2]),y):1;for(let o=0;o<i;o+=1)if(C&&H.length&&H.push(String(C)),H.push(e),H.length>=y)return H}return H}function K5(r,C,H){return(Array.isArray(C?.macros)?C.macros:[]).map((L,M)=>{let e=$5(L?.keys,L?.delay_ms),i=L?.entity||H?.entityId||null;if(!e.length||!i||!r?.states?.[i])return null;let o=L?.sets?.entity?L.sets:null,a=o?r?.states?.[o.entity]?.state:null;return{index:M,name:String(L?.name||`#${M+1}`),icon:L?.icon||"remote",entityId:i,keys:e,sets:o,active:o?a===String(o.state??"on"):null}}).filter(Boolean)}function q5(r){let C=String(r?.attributes?.media_content_type||"").toLowerCase();return Y[C]||(r?.attributes?.media_title?"cast_on":"tv")}function T(r,C,H,V=null){let L=w(C);if(!L.length)return{ok:!1,reason:"no_entities"};let M=L.map(x=>{let Z=r?.states?.[x.entityId]||null,$=Z?.state||"unavailable";return{entityId:x.entityId,name:x.name||k(r,x.entityId),stateObj:Z,state:$,rank:W5($),missing:!Z,app:Z?.attributes?.app_name||null}});if(M.every(x=>x.missing))return{ok:!1,reason:"missing_entities"};let e=M.filter(x=>x.rank>=q),i=e.find(x=>x.entityId===V)||null,o=e.reduce((x,Z)=>!x||Z.rank>x.rank?Z:x,null),a=i||o;if(!a)return{ok:!0,idle:!0,players:M,active:null,name:C?.name||null};let d=a.stateObj,A=z5(r,C,a),p=Q5(d,H),R5=String(d.attributes?.media_content_type||"").toLowerCase(),b=a.app||d.attributes?.source||null;return{ok:!0,idle:!1,players:M,active:a,pinned:!!i,name:C?.name||a.name,state:a.state,playing:a.state==="playing",buffering:a.state==="buffering",live:a.rank>=j,title:p.title,sub:p.sub,hasMedia:p.hasMedia,app:b&&b!==p.title?b:null,artwork:d.attributes?.entity_picture||null,logo:X.includes(R5),icon:q5(d),progress:I5(d),sound:U5(r,C,a),sources:A1(d,"source_list","source",m.SELECT_SOURCE),pad:A,macros:K5(r,C,A),can:{power:v(d,m.TURN_ON)||v(d,m.TURN_OFF),turnOn:v(d,m.TURN_ON),turnOff:v(d,m.TURN_OFF),play:v(d,m.PLAY),pause:v(d,m.PAUSE),stop:v(d,m.STOP),prev:v(d,m.PREVIOUS_TRACK),next:v(d,m.NEXT_TRACK),seek:v(d,m.SEEK)}}}function S(r){if(!Number.isFinite(r)||r<0)return"0:00";let C=Math.floor(r),H=C%60,V=Math.floor(C/60)%60,L=Math.floor(C/3600),M=e=>String(e).padStart(2,"0");return L>0?`${L}:${M(V)}:${M(H)}`:`${V}:${M(H)}`}var o1=`
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
`;var a1=`
${o1}

:host { --mr-bg: var(--ha-card-background, var(--card-background-color, #fff)); }

/* the artwork runs to the card's own edges, so the padding belongs to each
   strip rather than to one box around all of them */
.wrap { display: block; padding: 0; gap: 0; }

/* ---------- the hero: artwork behind, everything else in front ---------- */
.hero {
  position: relative; isolation: isolate; overflow: hidden;
  padding: 16px; display: grid; grid-template-columns: minmax(0, 1fr);
  min-height: 172px;
}
/* the single row has to fill the hero, or the column inside it has no spare
   height to push the buttons down into */
.hero > .fg { align-self: stretch; }
.compact .hero { padding: 12px; min-height: 128px; gap: 10px; }

.bg { position: absolute; inset: 0; z-index: -1; overflow: hidden; }
/* blurred and oversized, so the blur has pixels to work with past the edges
   instead of fading into nothing at the border */
.bg .blur {
  position: absolute; inset: -30px; width: calc(100% + 60px); height: calc(100% + 60px);
  object-fit: cover; filter: blur(28px) saturate(1.25); opacity: .65;
}
/* the sharp copy would otherwise start with a visible vertical seam against
   the blurred one behind it; the mask dissolves its left edge instead */
.bg .shot {
  position: absolute; top: 0; right: 0; height: 100%; width: 40%;
  object-fit: cover; cursor: pointer;
  -webkit-mask-image: linear-gradient(to right, transparent 0%, #000 26%);
  mask-image: linear-gradient(to right, transparent 0%, #000 26%);
}
/* logo mode: contained, padded, no blurred copy and no veil over it */
.bg.logo { display: grid; }
.bg.logo .shot {
  position: absolute; top: 0; right: 0; height: 100%; width: 34%;
  object-fit: contain; padding: 14px 16px 14px 0; box-sizing: border-box;
  -webkit-mask-image: none; mask-image: none;
}
.bg .mark { position: absolute; top: 0; right: 0; height: 100%; width: 40%;
  display: grid; place-items: center; }
.bg .mark .icon { width: 56px; height: 56px; color: var(--ap-muted); opacity: .35; }
/* opaque enough on the left to read a title over, gone by the right edge so
   the picture is a picture there; never fully opaque, or the blurred copy
   under it could not tint anything */
.bg .veil {
  position: absolute; inset: 0;
  background: linear-gradient(to right,
    color-mix(in srgb, var(--mr-bg) 96%, transparent) 0%,
    color-mix(in srgb, var(--mr-bg) 93%, transparent) 38%,
    color-mix(in srgb, var(--mr-bg) 55%, transparent) 58%,
    transparent 74%);
}
.wrap.noart .hero { min-height: 0; }
.wrap.logo .hero { min-height: 140px; }

.fg { display: grid; gap: 12px; align-content: space-between; min-width: 0; }
/* The artwork is on the right, so the title and the buttons stop before it.
   This is a padding rather than a max-width on the children, because a
   percentage width inside an auto-sized grid track resolves against a width
   that is itself being derived from the children - the column collapses to
   a sliver. The header is deliberately outside it: its right-hand badge
   belongs over the picture, the way the stock card puts the runtime there. */
.body { display: grid; gap: 12px; min-width: 0; padding-right: 42%; }
.wrap.noart .body { padding-right: 0; }
@container (max-width: 400px) { .body { padding-right: 34%; } }
@container (max-width: 320px) { .body { padding-right: 24%; } }

/* ---------- header ---------- */
.head { display: flex; align-items: flex-start; gap: 10px; min-width: 0; }
.head .who { min-width: 0; }
.head .room { font-size: .98rem; font-weight: 600; color: var(--ap-text); line-height: 1.2;
  cursor: pointer; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.head .src { font-size: .76rem; color: var(--ap-muted); display: flex; align-items: center; gap: 5px;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.head .src .icon { width: 13px; height: 13px; flex: none; }
.head .spacer { flex: 1; }
/* this badge sits over the picture, where the card's own accent-on-tint
   colours have nothing to hold on to - it gets its own scrim instead, the
   way the stock card writes the runtime over the artwork */
.head .pill { flex: none; background: rgba(0, 0, 0, .42); color: #fff; backdrop-filter: blur(2px); }
.wrap.noart .head .pill, .wrap.logo .head .pill {
  background: color-mix(in srgb, var(--ap-accent) 16%, transparent);
  color: var(--ap-accent); backdrop-filter: none;
}

/* ---------- what is playing ---------- */
.said { min-width: 0; display: grid; gap: 3px; }
.said .title {
  font-size: 1.3rem; font-weight: 700; line-height: 1.22; color: var(--ap-text);
  overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;
}
.compact .said .title { font-size: 1.08rem; -webkit-line-clamp: 1; }
.said .sub { font-size: .85rem; color: var(--ap-muted); overflow: hidden;
  display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; }

/* ---------- controls ---------- */
/* flat icons rather than filled circles: over a picture a row of solid discs
   reads as a second card sitting on the first */
.controls { display: flex; align-items: center; gap: 2px; flex-wrap: wrap; margin-left: -8px; }
.ctl {
  width: 38px; height: 38px; border-radius: 50%; border: none; cursor: pointer;
  display: grid; place-items: center; padding: 0; background: none; color: var(--ap-text);
}
.ctl .icon { width: 23px; height: 23px; }
.ctl.main .icon { width: 32px; height: 32px; color: var(--ap-accent); }
.ctl:hover { background: color-mix(in srgb, var(--ap-text) 12%, transparent); }
.ctl[disabled] { opacity: .35; cursor: default; }
.compact .ctl { width: 36px; height: 36px; }

/* ---------- progress, as the strip under the artwork ---------- */
.prog { display: grid; gap: 4px; padding: 10px 16px 12px; }
.compact .prog { padding: 8px 12px 10px; }
.prog .bar { height: 4px; }
.prog .bar > i { transition: width .95s linear; }
.paused .prog .bar > i { transition: none; }
.prog .times { display: flex; justify-content: space-between; font-size: .73rem;
  color: var(--ap-muted); font-variant-numeric: tabular-nums; }

/* ---------- volume ---------- */
.vol { display: flex; align-items: center; gap: 10px; padding: 0 16px 12px; }
.compact .vol { padding: 0 12px 10px; }
.vol input[type="range"] { flex: 1; accent-color: var(--ap-accent); min-width: 80px; }
.vol .icon { width: 18px; height: 18px; color: var(--ap-muted); }
.vol .mute { cursor: pointer; background: none; border: none; padding: 0; display: grid; place-items: center; }
.vol .mute.on .icon { color: var(--error-color, #db4437); }
.vol .only { font-size: .8rem; color: var(--ap-muted); }
.vol .val { font-size: .76rem; color: var(--ap-muted); font-variant-numeric: tabular-nums;
  min-width: 34px; text-align: right; }
.vol .whose { font-size: .73rem; color: var(--ap-muted); opacity: .8; white-space: nowrap;
  overflow: hidden; text-overflow: ellipsis; max-width: 42%; }

/* ---------- a seekable bar has to look touchable ---------- */
.prog .bar.seek { cursor: pointer; height: 6px; margin: -3px 0; }
.prog .bar.seek:hover > i { filter: brightness(1.1); }

/* ---------- source, sound mode, remote toggle ---------- */
.picks { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; padding: 0 16px 12px; }
.compact .picks { padding: 0 12px 10px; }
.pick { display: inline-flex; align-items: center; gap: 6px; min-width: 0; flex: 1 1 150px; }
.pick .icon { width: 16px; height: 16px; color: var(--ap-muted); flex: none; }
.pick select {
  font: inherit; font-size: .8rem; min-width: 0; width: 100%;
  padding: 6px 8px; border-radius: 9px;
  border: 1px solid var(--ap-line); background: transparent; color: var(--ap-text);
}
.ctl.pad-toggle { width: 34px; height: 34px; flex: none; border: 1px solid var(--ap-line); }
.ctl.pad-toggle.on { background: color-mix(in srgb, var(--ap-accent) 18%, transparent);
  color: var(--ap-accent); border-color: var(--ap-accent-soft); }
.ctl.small { width: 30px; height: 30px; border: 1px solid var(--ap-line); flex: none; }
.ctl.small .icon { width: 16px; height: 16px; }

/* ---------- macro buttons ---------- */
.macros { display: flex; gap: 8px; flex-wrap: wrap; padding: 0 16px 12px; }
.compact .macros { padding: 0 12px 10px; }
.macros .chip.macro { gap: 6px; }
.macros .chip.macro .icon { width: 15px; height: 15px; flex: none; }
.macros .chip.macro .what { font-size: .72rem; opacity: .8; }
.macros .chip.macro.busy { color: var(--ap-accent); border-color: var(--ap-accent-soft); }
.macros .chip.macro[disabled] { cursor: default; }
.macros .chip.macro[disabled]:not(.busy) { opacity: .45; }

/* ---------- the direction pad ---------- */
.pad { display: grid; gap: 10px; justify-items: center; padding: 0 16px 14px; }
.dpad { display: grid; grid-template-columns: repeat(3, 44px); gap: 6px; }
.padkey {
  width: 44px; height: 44px; border-radius: 12px; border: 1px solid var(--ap-line);
  background: transparent; color: var(--ap-text); cursor: pointer;
  display: grid; place-items: center; padding: 0;
}
.padkey .icon { width: 22px; height: 22px; }
.padkey:hover { background: color-mix(in srgb, var(--ap-text) 10%, transparent); }
.padkey:active { background: color-mix(in srgb, var(--ap-accent) 22%, transparent); }
.padkey.mid { border-radius: 50%; border-color: var(--ap-accent-soft); color: var(--ap-accent); }
.extras { display: flex; gap: 6px; flex-wrap: wrap; justify-content: center; }
.extras .padkey { width: 40px; height: 36px; border-radius: 10px; }

/* ---------- the player row ---------- */
.players { display: flex; gap: 8px; flex-wrap: wrap; padding: 0 16px 14px; }
.compact .players { padding: 0 12px 12px; }
.chip {
  display: inline-flex; align-items: center; gap: 7px; min-width: 0;
  padding: 6px 11px; border-radius: 999px; cursor: pointer;
  border: 1px solid var(--ap-line); background: transparent;
  color: var(--ap-muted); font: inherit; font-size: .78rem;
}
.chip .dot { width: 8px; height: 8px; border-radius: 50%; background: currentColor; flex: none; opacity: .45; }
.chip .label { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.chip .what { opacity: .75; }
.chip.live { color: var(--ap-accent); border-color: var(--ap-accent-soft); }
.chip.live .dot { opacity: 1; }
.chip.shown { background: color-mix(in srgb, var(--ap-accent) 14%, transparent); font-weight: 600; }
.chip.dead { opacity: .55; }
.chip.gone { color: var(--error-color, #db4437); border-style: dashed; }

/* ---------- nothing playing ---------- */
.quiet { display: flex; align-items: center; gap: 12px; padding: 16px; }
.quiet .icon { width: 30px; height: 30px; color: var(--ap-muted); flex: none; }
.quiet .lines { min-width: 0; }
.quiet .big { font-size: 1.02rem; font-weight: 600; color: var(--ap-text); }
.quiet .small { font-size: .8rem; color: var(--ap-muted); }

.empty { display: flex; align-items: center; gap: 12px; color: var(--ap-muted); font-size: .9rem; padding: 16px; }
.empty .icon { width: 26px; height: 26px; flex: none; }
`;var d1="M6.59,0.66C8.93,-1.15 11.47,1.06 12.04,4.5C12.47,4.5 12.89,4.62 13.27,4.84C13.79,4.24 14.25,3.42 14.07,2.5C13.65,0.35 16.06,-1.39 18.35,1.58C20.16,3.92 17.95,6.46 14.5,7.03C14.5,7.46 14.39,7.89 14.16,8.27C14.76,8.78 15.58,9.24 16.5,9.06C18.63,8.64 20.38,11.04 17.41,13.34C15.07,15.15 12.53,12.94 11.96,9.5C11.53,9.5 11.11,9.37 10.74,9.15C10.22,9.75 9.75,10.58 9.93,11.5C10.35,13.64 7.94,15.39 5.65,12.42C3.83,10.07 6.05,7.53 9.5,6.97C9.5,6.54 9.63,6.12 9.85,5.74C9.25,5.23 8.43,4.76 7.5,4.94C5.37,5.36 3.62,2.96 6.59,0.66M5,16H7A2,2 0 0,1 9,18V24H7V22H5V24H3V18A2,2 0 0,1 5,16M5,18V20H7V18H5M12.93,16H15L12.07,24H10L12.93,16M18,16H21V18H18V22H21V24H18A2,2 0 0,1 16,22V18A2,2 0 0,1 18,16Z",F="M19,18.31V20A2,2 0 0,1 17,22H7A2,2 0 0,1 5,20V16.3C4.54,16.12 3.95,16 3,16A1,1 0 0,1 2,15A1,1 0 0,1 3,14C3.82,14 4.47,14.08 5,14.21V12.3C4.54,12.12 3.95,12 3,12A1,1 0 0,1 2,11A1,1 0 0,1 3,10C3.82,10 4.47,10.08 5,10.21V8.3C4.54,8.12 3.95,8 3,8A1,1 0 0,1 2,7A1,1 0 0,1 3,6C3.82,6 4.47,6.08 5,6.21V4A2,2 0 0,1 7,2H17A2,2 0 0,1 19,4V6.16C20.78,6.47 21.54,7.13 21.71,7.29C22.1,7.68 22.1,8.32 21.71,8.71C21.32,9.1 20.8,9.09 20.29,8.71V8.71C20.29,8.71 19.25,8 17,8C15.74,8 14.91,8.41 13.95,8.9C12.91,9.41 11.74,10 10,10C9.64,10 9.31,10 9,9.96V7.95C9.3,8 9.63,8 10,8C11.26,8 12.09,7.59 13.05,7.11C14.09,6.59 15.27,6 17,6V4H7V20H17V18C18.5,18 18.97,18.29 19,18.31M17,10C15.27,10 14.09,10.59 13.05,11.11C12.09,11.59 11.26,12 10,12C9.63,12 9.3,12 9,11.95V13.96C9.31,14 9.64,14 10,14C11.74,14 12.91,13.41 13.95,12.9C14.91,12.42 15.74,12 17,12C19.25,12 20.29,12.71 20.29,12.71V12.71C20.8,13.1 21.32,13.1 21.71,12.71C22.1,12.32 22.1,11.69 21.71,11.29C21.5,11.08 20.25,10 17,10M17,14C15.27,14 14.09,14.59 13.05,15.11C12.09,15.59 11.26,16 10,16C9.63,16 9.3,16 9,15.95V17.96C9.31,18 9.64,18 10,18C11.74,18 12.91,17.41 13.95,16.9C14.91,16.42 15.74,16 17,16C19.25,16 20.29,16.71 20.29,16.71V16.71C20.8,17.1 21.32,17.1 21.71,16.71C22.1,16.32 22.1,15.69 21.71,15.29C21.5,15.08 20.25,14 17,14Z";var p1="M13,13H11V7H13M13,17H11V15H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z";var m1="M12,2L1,21H23M12,6L19.53,19H4.47M11,10V14H13V10M11,16V18H13V16";var n1="M16,20H20V16H16M16,14H20V10H16M10,8H14V4H10M16,8H20V4H16M10,14H14V10H10M4,14H8V10H4M4,20H8V16H4M10,20H14V16H10M4,8H8V4H4V8Z";var x1="M13,9V15H16L12,19L8,15H11V9H8L12,5L16,9H13M4,2H20V4H4V2M4,20H20V22H4V20Z";var v1="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z";var l1="M6 14H9L5 18L1 14H4C4 11.3 5.7 6.6 11 6.1V8.1C7.6 8.6 6 11.9 6 14M20 14C20 11.3 18.3 6.6 13 6.1V8.1C16.4 8.7 18 11.9 18 14H15L19 18L23 14H20Z";var Z1="M12,6V9L16,5L12,1V4A8,8 0 0,0 4,12C4,13.57 4.46,15.03 5.24,16.26L6.7,14.8C6.25,13.97 6,13 6,12A6,6 0 0,1 12,6M18.76,7.74L17.3,9.2C17.74,10.04 18,11 18,12A6,6 0 0,1 12,18V15L8,19L12,23V20A8,8 0 0,0 20,12C20,10.43 19.54,8.97 18.76,7.74Z";var S1="M9.5 18V9H8V18M12.75 18V9H11.25V18M16 18V9H14.5V18M17.03 6C18.11 6 19 6.88 19 8V19C19 20.13 18.11 21 17.03 21C17.03 21.58 16.56 22 16 22C15.5 22 15 21.58 15 21H9C9 21.58 8.5 22 8 22C7.44 22 6.97 21.58 6.97 21C5.89 21 5 20.13 5 19V8C5 6.88 5.89 6 6.97 6H9V3C9 2.42 9.46 2 10 2H14C14.54 2 15 2.42 15 3V6M10.5 3.5V6H13.5V3.5M17.03 19V8H6.97V19";var u1="M16,20H8V6H16M16.67,4H15V2H9V4H7.33A1.33,1.33 0 0,0 6,5.33V20.67C6,21.4 6.6,22 7.33,22H16.67A1.33,1.33 0 0,0 18,20.67V5.33C18,4.6 17.4,4 16.67,4Z";var s1="M10,21H14A2,2 0 0,1 12,23A2,2 0 0,1 10,21M21,19V20H3V19L5,17V11C5,7.9 7.03,5.17 10,4.29C10,4.19 10,4.1 10,4A2,2 0 0,1 12,2A2,2 0 0,1 14,4C14,4.1 14,4.19 14,4.29C16.97,5.17 19,7.9 19,11V17L21,19M17,11A5,5 0 0,0 12,6A5,5 0 0,0 7,11V18H17V11M19.75,3.19L18.33,4.61C20.04,6.3 21,8.6 21,11H23C23,8.07 21.84,5.25 19.75,3.19M1,11H3C3,8.6 3.96,6.3 5.67,4.61L4.25,3.19C2.16,5.25 1,8.07 1,11Z";var c1="M12,18V6A6,6 0 0,1 18,12A6,6 0 0,1 12,18M20,15.31L23.31,12L20,8.69V4H15.31L12,0.69L8.69,4H4V8.69L0.69,12L4,15.31V20H8.69L12,23.31L15.31,20H20V15.31Z";var O1="M19.36,2.72L20.78,4.14L15.06,9.85C16.13,11.39 16.28,13.24 15.38,14.44L9.06,8.12C10.26,7.22 12.11,7.37 13.65,8.44L19.36,2.72M5.93,17.57C3.92,15.56 2.69,13.16 2.35,10.92L7.23,8.83L14.67,16.27L12.58,21.15C10.34,20.81 7.94,19.58 5.93,17.57Z";var h1="M7 11H9V13H7V11M21 5V19C21 20.11 20.11 21 19 21H5C3.89 21 3 20.1 3 19V5C3 3.9 3.9 3 5 3H6V1H8V3H16V1H18V3H19C20.11 3 21 3.9 21 5M5 7H19V5H5V7M19 19V9H5V19H19M15 13V11H17V13H15M11 13V11H13V13H11M7 15H9V17H7V15M15 17V15H17V17H15M11 17V15H13V17H11Z";var g1="M6,11L7,7H17L18,11M18.92,6C18.71,5.4 18.14,5 17.5,5H6.5C5.86,5 5.29,5.4 5.08,6L3,12V20A1,1 0 0,0 4,21H5A1,1 0 0,0 6,20V18H18V20A1,1 0 0,0 19,21H20A1,1 0 0,0 21,20V12L18.92,6M7,16H5V14H7V16M19,16H17V14H19V16M14,16H10V14H14V16Z",f1="M4,3V6H1V20H23V6H20V3H14V6H10V3H4M3,8H21V18H3V8M15,10V12H13V14H15V16H17V14H19V12H17V10H15M5,12V14H11V12H5Z";var k1="M12,3C7,3 3,7 3,12C3,17 7,21 12,21C17,21 21,17 21,12C21,7 17,3 12,3M12,19C8.1,19 5,15.9 5,12C5,8.1 8.1,5 12,5C15.9,5 19,8.1 19,12C19,15.9 15.9,19 12,19M20.5,20.5C22.7,18.3 24,15.3 24,12C24,8.7 22.7,5.7 20.5,3.5L19.4,4.6C21.3,6.5 22.5,9.1 22.5,12C22.5,14.9 21.3,17.5 19.4,19.4L20.5,20.5M4.6,19.4C2.7,17.5 1.5,14.9 1.5,12C1.5,9.1 2.7,6.5 4.6,4.6L3.5,3.5C1.3,5.7 0,8.7 0,12C0,15.3 1.3,18.3 3.5,20.5L4.6,19.4M9.5,7V17H11.5V13H13.5A2,2 0 0,0 15.5,11V9A2,2 0 0,0 13.5,7H9.5M11.5,9H13.5V11H11.5V9Z";var w1="M23 8C23 4.13 19.87 1 16 1C12.47 1 9.57 3.61 9.08 7H4.5C3.84 7 3.28 7.42 3.08 8L1 14V22C1 22.55 1.45 23 2 23H3C3.55 23 4 22.55 4 22V21H16V22C16 22.55 16.45 23 17 23H18C18.55 23 19 22.55 19 22V14.32C21.36 13.19 23 10.79 23 8M4.5 8.5H9.03C9.15 10.26 9.92 11.84 11.11 13H3L4.5 8.5M4.5 18C3.67 18 3 17.33 3 16.5S3.67 15 4.5 15 6 15.67 6 16.5 5.33 18 4.5 18M15.5 18C14.67 18 14 17.33 14 16.5S14.67 15 15.5 15 17 15.67 17 16.5 16.33 18 15.5 18M16 13C14.61 13 13.44 12.5 12.47 11.53C11.5 10.56 11 9.39 11 8C11 6.64 11.5 5.46 12.47 4.5C13.44 3.5 14.61 3 16 3C17.36 3 18.54 3.5 19.5 4.5C20.5 5.46 21 6.64 21 8C21 9.39 20.5 10.56 19.5 11.53C18.54 12.5 17.36 13 16 13M16.5 8.25L19.36 9.94L18.61 11.16L15 9V4H16.5V8.25Z";var b1="M6.5 5C5.84 5 5.28 5.42 5.08 6L3 12V20A1 1 0 0 0 4 21H5A1 1 0 0 0 6 20V19H11.3A7 7 0 0 1 11 17A7 7 0 0 1 14.41 11H5L6.5 6.5H17.5L18.68 10.03A7 7 0 0 1 20.47 10.46L18.92 6C18.72 5.42 18.16 5 17.5 5H6.5M17 12C16.87 12 16.76 12.09 16.74 12.21L16.55 13.53C16.25 13.66 15.96 13.82 15.7 14L14.46 13.5C14.35 13.5 14.22 13.5 14.15 13.63L13.15 15.36C13.09 15.47 13.11 15.6 13.21 15.68L14.27 16.5C14.25 16.67 14.24 16.83 14.24 17C14.24 17.17 14.25 17.33 14.27 17.5L13.21 18.32C13.12 18.4 13.09 18.53 13.15 18.64L14.15 20.37C14.21 20.5 14.34 20.5 14.46 20.5L15.7 20C15.96 20.18 16.24 20.35 16.55 20.47L16.74 21.79C16.76 21.91 16.86 22 17 22H19C19.11 22 19.22 21.91 19.24 21.79L19.43 20.47C19.73 20.34 20 20.18 20.27 20L21.5 20.5C21.63 20.5 21.76 20.5 21.83 20.37L22.83 18.64C22.89 18.53 22.86 18.4 22.77 18.32L21.7 17.5C21.72 17.33 21.74 17.17 21.74 17C21.74 16.83 21.73 16.67 21.7 16.5L22.76 15.68C22.85 15.6 22.88 15.47 22.82 15.36L21.82 13.63C21.76 13.5 21.63 13.5 21.5 13.5L20.27 14C20 13.82 19.73 13.65 19.42 13.53L19.23 12.21C19.22 12.09 19.11 12 19 12H17M6.5 13A1.5 1.5 0 0 1 8 14.5A1.5 1.5 0 0 1 6.5 16A1.5 1.5 0 0 1 5 14.5A1.5 1.5 0 0 1 6.5 13M18 15.5C18.83 15.5 19.5 16.17 19.5 17C19.5 17.83 18.83 18.5 18 18.5C17.16 18.5 16.5 17.83 16.5 17C16.5 16.17 17.17 15.5 18 15.5Z",B1="M5,14H19L17.5,9.5H6.5L5,14M17.5,19A1.5,1.5 0 0,0 19,17.5A1.5,1.5 0 0,0 17.5,16A1.5,1.5 0 0,0 16,17.5A1.5,1.5 0 0,0 17.5,19M6.5,19A1.5,1.5 0 0,0 8,17.5A1.5,1.5 0 0,0 6.5,16A1.5,1.5 0 0,0 5,17.5A1.5,1.5 0 0,0 6.5,19M18.92,9L21,15V23A1,1 0 0,1 20,24H19A1,1 0 0,1 18,23V22H6V23A1,1 0 0,1 5,24H4A1,1 0 0,1 3,23V15L5.08,9C5.28,8.42 5.85,8 6.5,8H17.5C18.15,8 18.72,8.42 18.92,9M12,0C14.12,0 16.15,0.86 17.65,2.35L16.23,3.77C15.11,2.65 13.58,2 12,2C10.42,2 8.89,2.65 7.77,3.77L6.36,2.35C7.85,0.86 9.88,0 12,0M12,4C13.06,4 14.07,4.44 14.82,5.18L13.4,6.6C13.03,6.23 12.53,6 12,6C11.5,6 10.97,6.23 10.6,6.6L9.18,5.18C9.93,4.44 10.94,4 12,4Z",y1="M16,6L15,6.75L17.5,10H13.5V8.5H12V10H3C1.89,10 1,10.89 1,12V15H3A3,3 0 0,0 6,18A3,3 0 0,0 9,15H15A3,3 0 0,0 18,18A3,3 0 0,0 21,15H23V12C23,10.89 22.11,10 21,10H19L16,6M6,13.5A1.5,1.5 0 0,1 7.5,15A1.5,1.5 0 0,1 6,16.5A1.5,1.5 0 0,1 4.5,15A1.5,1.5 0 0,1 6,13.5M18,13.5A1.5,1.5 0 0,1 19.5,15A1.5,1.5 0 0,1 18,16.5A1.5,1.5 0 0,1 16.5,15A1.5,1.5 0 0,1 18,13.5Z";var P1="M19,14H16V16H19V14M22,21H3V11L11,3H21A1,1 0 0,1 22,4V21M11.83,5L5.83,11H20V5H11.83Z";var T1="M3,6H16L19,10H21C22.11,10 23,10.89 23,12V15H21A3,3 0 0,1 18,18A3,3 0 0,1 15,15H9A3,3 0 0,1 6,18A3,3 0 0,1 3,15H1V8C1,6.89 1.89,6 3,6M2.5,7.5V10H10.5V7.5H2.5M12,7.5V10H17.14L15.25,7.5H12M6,13.5A1.5,1.5 0 0,0 4.5,15A1.5,1.5 0 0,0 6,16.5A1.5,1.5 0 0,0 7.5,15A1.5,1.5 0 0,0 6,13.5M18,13.5A1.5,1.5 0 0,0 16.5,15A1.5,1.5 0 0,0 18,16.5A1.5,1.5 0 0,0 19.5,15A1.5,1.5 0 0,0 18,13.5Z";var F1="M13,4.8C9,4.8 9,19.2 13,19.2C17,19.2 22,16.5 22,12C22,7.5 17,4.8 13,4.8M13.1,17.2C12.7,16.8 12,15 12,12C12,9 12.7,7.2 13.1,6.8C16,6.9 20,8.7 20,12C20,15.3 16,17.1 13.1,17.2M2,5H9.5C9.3,5.4 9,5.8 8.9,6.4C8.8,6.6 8.8,6.8 8.7,7H2V5M8,11H2V9H8.2C8.1,9.6 8.1,10.3 8,11M8.7,17C8.9,17.8 9.2,18.4 9.6,19H2.1V17H8.7M8.2,15H2V13H8C8.1,13.7 8.1,14.4 8.2,15Z";var R1="M18 15C18 17.6 16.8 19.9 14.9 21.3L14.4 20.8L12.3 18.7L13.7 17.3L14.9 18.5C15.4 17.8 15.8 16.9 15.9 16H14V14H15.9C15.7 13.1 15.4 12.3 14.9 11.5L13.7 12.7L12.3 11.3L13.5 10.1C12.8 9.6 11.9 9.2 11 9.1V11H9V9.1C8.1 9.3 7.3 9.6 6.5 10.1L9.5 13.1C9.7 13.1 9.8 13 10 13C11.11 13 12 13.9 12 15S11.11 17 10 17 8 16.11 8 15C8 14.8 8 14.7 8.1 14.5L5.1 11.5C4.6 12.2 4.2 13.1 4.1 14H6V16H4.1C4.3 16.9 4.6 17.7 5.1 18.5L6.3 17.3L7.7 18.7L5.1 21.3C3.2 19.9 2 17.6 2 15C2 10.58 5.58 7 10 7S18 10.58 18 15M23 5C23 3.34 21.66 2 20 2S17 3.34 17 5C17 6.3 17.84 7.4 19 7.82V11H21V7.82C22.16 7.4 23 6.3 23 5M20 6C19.45 6 19 5.55 19 5S19.45 4 20 4 21 4.45 21 5 20.55 6 20 6Z";var D1="M16,10L15.8,11H13.5A0.5,0.5 0 0,0 13,11.5A0.5,0.5 0 0,0 13.5,12H15.6L14.6,17H12.5A0.5,0.5 0 0,0 12,17.5A0.5,0.5 0 0,0 12.5,18H14.4L14,20A2,2 0 0,1 12,22A2,2 0 0,1 10,20L9,15H10.5A0.5,0.5 0 0,0 11,14.5A0.5,0.5 0 0,0 10.5,14H8.8L8,10C8,8.8 8.93,7.77 10.29,7.29L8.9,5.28C8.59,4.82 8.7,4.2 9.16,3.89C9.61,3.57 10.23,3.69 10.55,4.14L11,4.8V3A1,1 0 0,1 12,2A1,1 0 0,1 13,3V5.28L14.5,3.54C14.83,3.12 15.47,3.07 15.89,3.43C16.31,3.78 16.36,4.41 16,4.84L13.87,7.35C15.14,7.85 16,8.85 16,10Z";var E1="M1,10V12A9,9 0 0,1 10,21H12C12,14.92 7.07,10 1,10M1,14V16A5,5 0 0,1 6,21H8A7,7 0 0,0 1,14M1,18V21H4A3,3 0 0,0 1,18M21,3H3C1.89,3 1,3.89 1,5V8H3V5H21V19H14V21H21A2,2 0 0,0 23,19V5C23,3.89 22.1,3 21,3Z";var _1="M21,3H3C1.89,3 1,3.89 1,5V8H3V5H21V19H14V21H21A2,2 0 0,0 23,19V5C23,3.89 22.1,3 21,3M1,10V12A9,9 0 0,1 10,21H12C12,14.92 7.07,10 1,10M19,7H5V8.63C8.96,9.91 12.09,13.04 13.37,17H19M1,14V16A5,5 0 0,1 6,21H8A7,7 0 0,0 1,14M1,18V21H4A3,3 0 0,0 1,18Z";var N1="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z";var W1="M12.5,1.5C10.73,1.5 9.17,2.67 8.67,4.37C8.14,4.13 7.58,4 7,4A4,4 0 0,0 3,8C3,9.82 4.24,11.41 6,11.87V19H19V11.87C20.76,11.41 22,9.82 22,8A4,4 0 0,0 18,4C17.42,4 16.86,4.13 16.33,4.37C15.83,2.67 14.27,1.5 12.5,1.5M12,10.5H13V17.5H12V10.5M9,12.5H10V17.5H9V12.5M15,12.5H16V17.5H15V12.5M6,20V21A1,1 0 0,0 7,22H18A1,1 0 0,0 19,21V20H6Z";var I1="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z";var G1="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z";var Q1="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z";var U1="M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z";var z1="M12,8A4,4 0 0,0 8,12A4,4 0 0,0 12,16A4,4 0 0,0 16,12A4,4 0 0,0 12,8Z";var $1="M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z";var K1="M6,7H18A5,5 0 0,1 23,12A5,5 0 0,1 18,17C16.36,17 14.91,16.21 14,15H10C9.09,16.21 7.64,17 6,17A5,5 0 0,1 1,12A5,5 0 0,1 6,7M19.75,9.5A1.25,1.25 0 0,0 18.5,10.75A1.25,1.25 0 0,0 19.75,12A1.25,1.25 0 0,0 21,10.75A1.25,1.25 0 0,0 19.75,9.5M17.25,12A1.25,1.25 0 0,0 16,13.25A1.25,1.25 0 0,0 17.25,14.5A1.25,1.25 0 0,0 18.5,13.25A1.25,1.25 0 0,0 17.25,12M5,9V11H3V13H5V15H7V13H9V11H7V9H5Z";var q1="M4,4H20A2,2 0 0,1 22,6V18A2,2 0 0,1 20,20H4A2,2 0 0,1 2,18V6A2,2 0 0,1 4,4M4,6V18H11V6H4M20,18V6H18.76C19,6.54 18.95,7.07 18.95,7.13C18.88,7.8 18.41,8.5 18.24,8.75L15.91,11.3L19.23,11.28L19.24,12.5L14.04,12.47L14,11.47C14,11.47 17.05,8.24 17.2,7.95C17.34,7.67 17.91,6 16.5,6C15.27,6.05 15.41,7.3 15.41,7.3L13.87,7.31C13.87,7.31 13.88,6.65 14.25,6H13V18H15.58L15.57,17.14L16.54,17.13C16.54,17.13 17.45,16.97 17.46,16.08C17.5,15.08 16.65,15.08 16.5,15.08C16.37,15.08 15.43,15.13 15.43,15.95H13.91C13.91,15.95 13.95,13.89 16.5,13.89C19.1,13.89 18.96,15.91 18.96,15.91C18.96,15.91 19,17.16 17.85,17.63L18.37,18H20M8.92,16H7.42V10.2L5.62,10.76V9.53L8.76,8.41H8.92V16Z";var j1="M21,16.5C21,16.88 20.79,17.21 20.47,17.38L12.57,21.82C12.41,21.94 12.21,22 12,22C11.79,22 11.59,21.94 11.43,21.82L3.53,17.38C3.21,17.21 3,16.88 3,16.5V7.5C3,7.12 3.21,6.79 3.53,6.62L11.43,2.18C11.59,2.06 11.79,2 12,2C12.21,2 12.41,2.06 12.57,2.18L20.47,6.62C20.79,6.79 21,7.12 21,7.5V16.5M12,4.15L6.04,7.5L12,10.85L17.96,7.5L12,4.15M5,15.91L11,19.29V12.58L5,9.21V15.91M19,15.91V9.21L13,12.58V19.29L19,15.91Z";var Y1="M18.32,8H5.67L5.23,4H18.77M12,19A3,3 0 0,1 9,16C9,14 12,10.6 12,10.6C12,10.6 15,14 15,16A3,3 0 0,1 12,19M3,2L5,20.23C5.13,21.23 5.97,22 7,22H17C18,22 18.87,21.23 19,20.23L21,2H3Z";var X1="M12,1.5A2.5,2.5 0 0,1 14.5,4A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 9.5,4A2.5,2.5 0 0,1 12,1.5M15.87,5C18,5 20,7 20,9C22.7,9 22.7,13 20,13H4C1.3,13 1.3,9 4,9C4,7 6,5 8.13,5C8.57,6.73 10.14,8 12,8C13.86,8 15.43,6.73 15.87,5M5,15H8L9,22H7L5,15M10,15H14L13,22H11L10,15M16,15H19L17,22H15L16,15Z";var J1="M18,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V4A2,2 0 0,0 18,2M10,4A1,1 0 0,1 11,5A1,1 0 0,1 10,6A1,1 0 0,1 9,5A1,1 0 0,1 10,4M7,4A1,1 0 0,1 8,5A1,1 0 0,1 7,6A1,1 0 0,1 6,5A1,1 0 0,1 7,4M18,20H6V8H18V20M14.67,15.33C14.69,16.03 14.41,16.71 13.91,17.21C12.86,18.26 11.15,18.27 10.09,17.21C9.59,16.71 9.31,16.03 9.33,15.33C9.4,14.62 9.63,13.94 10,13.33C10.37,12.5 10.81,11.73 11.33,11L12,10C13.79,12.59 14.67,14.36 14.67,15.33";var C2="M16,11H18V13H16V11M12,3H19C20.11,3 21,3.89 21,5V19H22V21H2V19H10V5C10,3.89 10.89,3 12,3M12,5V19H19V5H12Z";var H2="M12,3C10.89,3 10,3.89 10,5H3V19H2V21H22V19H21V5C21,3.89 20.11,3 19,3H12M12,5H19V19H12V5M5,11H7V13H5V11Z";var V2="M16,12A2,2 0 0,1 18,10A2,2 0 0,1 20,12A2,2 0 0,1 18,14A2,2 0 0,1 16,12M10,12A2,2 0 0,1 12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12M4,12A2,2 0 0,1 6,10A2,2 0 0,1 8,12A2,2 0 0,1 6,14A2,2 0 0,1 4,12Z";var L2="M19.77,7.23L19.78,7.22L16.06,3.5L15,4.56L17.11,6.67C16.17,7.03 15.5,7.93 15.5,9A2.5,2.5 0 0,0 18,11.5C18.36,11.5 18.69,11.42 19,11.29V18.5A1,1 0 0,1 18,19.5A1,1 0 0,1 17,18.5V14A2,2 0 0,0 15,12H14V5A2,2 0 0,0 12,3H6A2,2 0 0,0 4,5V21H14V13.5H15.5V18.5A2.5,2.5 0 0,0 18,21A2.5,2.5 0 0,0 20.5,18.5V9C20.5,8.31 20.22,7.68 19.77,7.23M18,10A1,1 0 0,1 17,9A1,1 0 0,1 18,8A1,1 0 0,1 19,9A1,1 0 0,1 18,10M8,18V13.5H6L10,6V11H12L8,18Z";var M2="M12,11A1,1 0 0,0 11,12A1,1 0 0,0 12,13A1,1 0 0,0 13,12A1,1 0 0,0 12,11M12.5,2C17,2 17.11,5.57 14.75,6.75C13.76,7.24 13.32,8.29 13.13,9.22C13.61,9.42 14.03,9.73 14.35,10.13C18.05,8.13 22.03,8.92 22.03,12.5C22.03,17 18.46,17.1 17.28,14.73C16.78,13.74 15.72,13.3 14.79,13.11C14.59,13.59 14.28,14 13.88,14.34C15.87,18.03 15.08,22 11.5,22C7,22 6.91,18.42 9.27,17.24C10.25,16.75 10.69,15.71 10.89,14.79C10.4,14.59 9.97,14.27 9.65,13.87C5.96,15.85 2,15.07 2,11.5C2,7 5.56,6.89 6.74,9.26C7.24,10.25 8.29,10.68 9.22,10.87C9.41,10.39 9.73,9.97 10.14,9.65C8.15,5.96 8.94,2 12.5,2Z";var r2="M13,6V18L21.5,12M4,18L12.5,12L4,6V18Z";var e2="M17.66 11.2C17.43 10.9 17.15 10.64 16.89 10.38C16.22 9.78 15.46 9.35 14.82 8.72C13.33 7.26 13 4.85 13.95 3C13 3.23 12.17 3.75 11.46 4.32C8.87 6.4 7.85 10.07 9.07 13.22C9.11 13.32 9.15 13.42 9.15 13.55C9.15 13.77 9 13.97 8.8 14.05C8.57 14.15 8.33 14.09 8.14 13.93C8.08 13.88 8.04 13.83 8 13.76C6.87 12.33 6.69 10.28 7.45 8.64C5.78 10 4.87 12.3 5 14.47C5.06 14.97 5.12 15.47 5.29 15.97C5.43 16.57 5.7 17.17 6 17.7C7.08 19.43 8.95 20.67 10.96 20.92C13.1 21.19 15.39 20.8 17.03 19.32C18.86 17.66 19.5 15 18.56 12.72L18.43 12.46C18.22 12 17.66 11.2 17.66 11.2M14.5 17.5C14.22 17.74 13.76 18 13.4 18.1C12.28 18.5 11.16 17.94 10.5 17.28C11.69 17 12.4 16.12 12.61 15.23C12.78 14.43 12.46 13.77 12.33 13C12.21 12.26 12.23 11.63 12.5 10.94C12.69 11.32 12.89 11.7 13.13 12C13.9 13 15.11 13.44 15.37 14.8C15.41 14.94 15.43 15.08 15.43 15.23C15.46 16.05 15.1 16.95 14.5 17.5H14.5Z";var t2="M12,20L12.76,17C9.5,16.79 6.59,15.4 5.75,13.58C5.66,14.06 5.53,14.5 5.33,14.83C4.67,16 3.33,16 2,16C3.1,16 3.5,14.43 3.5,12.5C3.5,10.57 3.1,9 2,9C3.33,9 4.67,9 5.33,10.17C5.53,10.5 5.66,10.94 5.75,11.42C6.4,10 8.32,8.85 10.66,8.32L9,5C11,5 13,5 14.33,5.67C15.46,6.23 16.11,7.27 16.69,8.38C19.61,9.08 22,10.66 22,12.5C22,14.38 19.5,16 16.5,16.66C15.67,17.76 14.86,18.78 14.17,19.33C13.33,20 12.67,20 12,20M17,11A1,1 0 0,0 16,12A1,1 0 0,0 17,13A1,1 0 0,0 18,12A1,1 0 0,0 17,11Z";var i2="M7,2V13H10V22L17,10H13L17,2H7Z";var A2="M15 21H17V19H15M19 9H21V7H19M3 5V19C3 20.1 3.9 21 5 21H9V19H5V5H9V3H5C3.9 3 3 3.9 3 5M19 3V5H21C21 3.9 20.1 3 19 3M11 23H13V1H11M19 17H21V15H19M15 5H17V3H15M19 13H21V11H19M19 21C20.1 21 21 20.1 21 19H19Z";var o2="M20.16 12.73C22.93 9.96 22.57 5.26 19.09 3C17.08 1.67 14.39 1.66 12.36 2.97C10.6 4.1 9.63 5.86 9.46 7.68C9.33 9 8.83 10.23 7.91 11.15L7.88 11.18C6.72 12.34 6.72 14.11 7.81 15.19L8.8 16.18C9.89 17.27 11.66 17.27 12.75 16.18C13.72 15.21 15 14.68 16.39 14.53C17.76 14.38 19.1 13.78 20.16 12.73M6.26 19.86C6.53 20.42 6.44 21.1 5.97 21.56C5.39 22.15 4.44 22.15 3.85 21.56C3.58 21.29 3.44 20.94 3.42 20.58C3.06 20.56 2.71 20.42 2.44 20.15C1.85 19.56 1.85 18.61 2.44 18.03C2.9 17.57 3.59 17.47 4.14 17.74L6.62 15.31C6.76 15.5 6.92 15.72 7.1 15.9L8.09 16.89C8.3 17.09 8.5 17.26 8.76 17.41L6.26 19.86Z";var a2="M11.9 2C8 2 4.9 5.4 5 9.3C5.1 11.9 6.6 14.1 8.7 15.2C10.1 15.9 11 17.3 11 18.8V19C11 20.7 12.3 22 14 22C18 22 19 17 19 9C19 9 19 2 11.9 2M14 20C13.4 20 13 19.6 13 19V18.8C13 16.6 11.7 14.5 9.7 13.4C8.1 12.6 7.1 11 7 9.2C7 7.9 7.5 6.5 8.4 5.5C9.3 4.5 10.6 4 11.8 4C16.7 4 17 8.2 17 9C17 18.9 15.3 20 14 20M15.8 7.6L8.3 10.3C8.1 10 8 9.6 8 9.1C8 8.4 8.2 7.8 8.5 7.1L13.7 5.2C14.9 5.8 15.5 6.7 15.8 7.6M12.9 15.1L15.7 14.1C15.6 15.6 15.3 16.7 15.1 17.4L13.8 17.9C13.8 16.9 13.5 16 12.9 15.1M16 9.2C16 10.4 16 11.5 15.9 12.4L11.9 13.9C11.4 13.4 10.8 12.9 10.1 12.6C9.7 12.4 9.3 12.1 9 11.8L16 9.2Z";var d2="M22,18A4,4 0 0,1 18,22H15A4,4 0 0,1 11,18V16H17.79L20.55,11.23L22.11,12.13L19.87,16H22V18M9,22H2C2,19 2,16 2.33,12.83C2.6,10.3 3.08,7.66 3.6,5H3V3H4L7,3H8V5H7.4C7.92,7.66 8.4,10.3 8.67,12.83C9,16 9,19 9,22Z";var p2="M18 11V6H15V4H12V2H8V5H6V11H5L7 22H17L19 11H18M15.86 11C15.7 11.61 15.4 12.16 15 12.62V8.62L17 9.62V11H15.86M17 7V8.5L15 7.5V7H17M12 5H14V8.5L12 9.5V5M12 10.62L14 9.62V13.45C13.41 13.8 12.73 14 12 14V10.62M11 13.86C10.21 13.65 9.5 13.22 9 12.62V9.62L11 8.62V13.86M9 3H11V7.5L10 8V5H9V3M7 6H9V8.5L8 9V11H7V6Z";var m2="M9,21V22H7V21A2,2 0 0,1 5,19V4A2,2 0 0,1 7,2H17A2,2 0 0,1 19,4V19A2,2 0 0,1 17,21V22H15V21H9M7,4V9H17V4H7M7,19H17V11H7V19M8,12H10V15H8V12M8,6H10V8H8V6Z";var n2="M18,10A1,1 0 0,1 17,9A1,1 0 0,1 18,8A1,1 0 0,1 19,9A1,1 0 0,1 18,10M12,10H6V5H12M19.77,7.23L19.78,7.22L16.06,3.5L15,4.56L17.11,6.67C16.17,7 15.5,7.93 15.5,9A2.5,2.5 0 0,0 18,11.5C18.36,11.5 18.69,11.42 19,11.29V18.5A1,1 0 0,1 18,19.5A1,1 0 0,1 17,18.5V14C17,12.89 16.1,12 15,12H14V5C14,3.89 13.1,3 12,3H6C4.89,3 4,3.89 4,5V21H14V13.5H15.5V18.5A2.5,2.5 0 0,0 18,21A2.5,2.5 0 0,0 20.5,18.5V9C20.5,8.31 20.22,7.68 19.77,7.23Z";var x2="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12C20,14.4 19,16.5 17.3,18C15.9,16.7 14,16 12,16C10,16 8.2,16.7 6.7,18C5,16.5 4,14.4 4,12A8,8 0 0,1 12,4M14,5.89C13.62,5.9 13.26,6.15 13.1,6.54L11.81,9.77L11.71,10C11,10.13 10.41,10.6 10.14,11.26C9.73,12.29 10.23,13.45 11.26,13.86C12.29,14.27 13.45,13.77 13.86,12.74C14.12,12.08 14,11.32 13.57,10.76L13.67,10.5L14.96,7.29L14.97,7.26C15.17,6.75 14.92,6.17 14.41,5.96C14.28,5.91 14.15,5.89 14,5.89M10,6A1,1 0 0,0 9,7A1,1 0 0,0 10,8A1,1 0 0,0 11,7A1,1 0 0,0 10,6M7,9A1,1 0 0,0 6,10A1,1 0 0,0 7,11A1,1 0 0,0 8,10A1,1 0 0,0 7,9M17,9A1,1 0 0,0 16,10A1,1 0 0,0 17,11A1,1 0 0,0 18,10A1,1 0 0,0 17,9Z";var R="M10,9A1,1 0 0,1 11,8A1,1 0 0,1 12,9V13.47L13.21,13.6L18.15,15.79C18.68,16.03 19,16.56 19,17.14V21.5C18.97,22.32 18.32,22.97 17.5,23H11C10.62,23 10.26,22.85 10,22.57L5.1,18.37L5.84,17.6C6.03,17.39 6.3,17.28 6.58,17.28H6.8L10,19V9M11,5A4,4 0 0,1 15,9C15,10.5 14.2,11.77 13,12.46V11.24C13.61,10.69 14,9.89 14,9A3,3 0 0,0 11,6A3,3 0 0,0 8,9C8,9.89 8.39,10.69 9,11.24V12.46C7.8,11.77 7,10.5 7,9A4,4 0 0,1 11,5Z";var v2="M15.5,21.27L14.66,21.18C13.9,21.11 13.25,20.6 13,19.87C12.47,17.91 12.47,15.83 13,13.87C15.32,13.4 17,11.37 17,9C17,7 15,2 15,2H9C9,2 7,7 7,9C7,11.38 8.67,13.42 11,13.9C11.53,15.86 11.53,17.94 11,19.9C10.76,20.62 10.12,21.13 9.37,21.21L8.5,21.3C8.5,21.3 8,21.28 8,22H16C16,21.28 15.5,21.27 15.5,21.27M9.44,7L10.44,4H13.56L14.56,7H9.44Z";var l2="M10,12A2,2 0 0,0 8,14A2,2 0 0,0 10,16A2,2 0 0,0 12,14A2,2 0 0,0 10,12M6,8A2,2 0 0,0 4,10A2,2 0 0,0 6,12A2,2 0 0,0 8,10A2,2 0 0,0 6,8M6,16A2,2 0 0,0 4,18A2,2 0 0,0 6,20A2,2 0 0,0 8,18A2,2 0 0,0 6,16M18,8A2,2 0 0,0 20,6A2,2 0 0,0 18,4A2,2 0 0,0 16,6A2,2 0 0,0 18,8M14,16A2,2 0 0,0 12,18A2,2 0 0,0 14,20A2,2 0 0,0 16,18A2,2 0 0,0 14,16M18,12A2,2 0 0,0 16,14A2,2 0 0,0 18,16A2,2 0 0,0 20,14A2,2 0 0,0 18,12M14,8A2,2 0 0,0 12,10A2,2 0 0,0 14,12A2,2 0 0,0 16,10A2,2 0 0,0 14,8M10,4A2,2 0 0,0 8,6A2,2 0 0,0 10,8A2,2 0 0,0 12,6A2,2 0 0,0 10,4Z";var Z2="M8.06,2C7.88,3.17 8.17,4.16 8.95,4.97C9.45,5.47 9.61,6.14 9.42,7H10.41C10.53,6.45 10.55,6 10.45,5.55C10.36,5.13 10.05,4.63 9.5,4.03C9.05,3.47 8.89,2.8 9.05,2H8.06M10.55,2C10.36,3.17 10.66,4.16 11.44,4.97C11.94,5.47 12.09,6.14 11.91,7H12.89C13,6.45 13.03,6 12.94,5.55C12.84,5.13 12.53,4.63 12,4.03C11.53,3.47 11.38,2.8 11.53,2H10.55M13.08,2C12.89,3.17 13.19,4.16 13.97,4.97C14.47,5.47 14.61,6.14 14.39,7H15.42C15.55,6.45 15.56,6 15.47,5.55C15.38,5.13 15.06,4.63 14.53,4.03C14.06,3.47 13.91,2.8 14.06,2H13.08M5,8C5,9.42 5.39,10.7 6.14,11.84C6.87,12.96 7.91,13.85 9.14,14.39L5.16,20.44C5.06,20.56 5,20.75 5,21C5,21.41 5.16,21.69 5.44,21.84C5.56,21.94 5.75,22 6,22C6.41,22 6.69,21.84 6.84,21.56L7.83,19.97H14.2C14.41,20.55 14.79,21.05 15.28,21.42C15.78,21.8 16.36,22 17,22C17.83,22 18.53,21.69 19.13,21.09C19.72,20.5 20,19.8 20,19C20,18.17 19.72,17.47 19.13,16.88C18.53,16.28 17.83,16 17,16C16.36,16 15.78,16.17 15.28,16.55C14.78,16.92 14.42,17.41 14.2,18H9.14L11.11,14.95C11.27,15 11.56,15 12,15C12.44,15 12.73,15 12.89,14.95L13.88,16.5C14.29,15.96 14.84,15.54 15.47,15.28L14.91,14.39C16.03,13.89 17,13 17.79,11.77C18.59,10.5 19,9.27 19,8H5M17,18C17.3,18 17.53,18.09 17.72,18.28C17.91,18.47 18,18.72 18,19C18,19.27 17.91,19.5 17.72,19.71C17.54,19.91 17.28,20 17,20C16.74,20 16.5,19.91 16.29,19.71C16.09,19.5 16,19.26 16,19C16,18.7 16.09,18.47 16.29,18.28C16.5,18.09 16.73,18 17,18Z";var D="M8.5 4.5L5.4 9.5L8.5 14.7L5.2 20.5L3.4 19.6L6.1 14.7L3 9.5L6.7 3.6L8.5 4.5M14.7 4.4L11.6 9.5L14.7 14.5L11.4 20.3L9.6 19.4L12.3 14.5L9.2 9.5L12.9 3.5L14.7 4.4M21 4.4L17.9 9.5L21 14.5L17.7 20.3L15.9 19.4L18.6 14.5L15.5 9.5L19.2 3.5L21 4.4";var S2="M13.5,8H12V13L16.28,15.54L17,14.33L13.5,12.25V8M13,3A9,9 0 0,0 4,12H1L4.96,16.03L9,12H6A7,7 0 0,1 13,5A7,7 0 0,1 20,12A7,7 0 0,1 13,19C11.07,19 9.32,18.21 8.06,16.94L6.64,18.36C8.27,20 10.5,21 13,21A9,9 0 0,0 22,12A9,9 0 0,0 13,3";var u2="M24 13L20 17V14H11V12H20V9L24 13M4 20V12H1L11 3L18 9.3V10H15.79L11 5.69L6 10.19V18H16V16H18V20H4Z";var s2="M15 13L11 17V14H2V12H11V9L15 13M5 20V16H7V18H17V10.19L12 5.69L7.21 10H4.22L12 3L22 12H19V20H5Z";var c2="M12 5.69L17 10.19V18H15V12H9V18H7V10.19L12 5.69M12 3L2 12H5V20H11V14H13V20H19V12H22";var O2="M19 8C20.11 8 21 8.9 21 10V16.76C21.61 17.31 22 18.11 22 19C22 20.66 20.66 22 19 22C17.34 22 16 20.66 16 19C16 18.11 16.39 17.31 17 16.76V10C17 8.9 17.9 8 19 8M19 9C18.45 9 18 9.45 18 10V11H20V10C20 9.45 19.55 9 19 9M12 5.69L7 10.19V18H14.1L14 19L14.1 20H5V12H2L12 3L16.4 6.96C15.89 7.4 15.5 7.97 15.25 8.61L12 5.69Z";var h2="M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11V17Z";var g2="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z";var f2="M20.84 22.73L15.14 17.03C13.26 18.79 10.92 20 8 20C7.64 20 7.14 19.87 6.66 19.7L5.71 22L3.82 21.34C5.15 18.03 6.5 14.32 9.66 11.55L8.77 10.66C6.76 12.03 4.86 14.1 3.75 17.25C3.75 17.25 2 15.5 2 13.5C2 12 3.12 9.32 5.72 7.61L1.11 3L2.39 1.73C2.39 1.73 16.39 15.74 16.39 15.74L22.11 21.46L20.84 22.73M17 8C15.35 8.37 13.93 8.88 12.7 9.5L17.5 14.29C20.87 9.35 22 3 22 3C21.03 4.95 14.35 5.24 9.38 6.18L12.15 8.95C14.81 8 17 8 17 8Z";var k2="M12,2A7,7 0 0,1 19,9C19,11.38 17.81,13.47 16,14.74V17A1,1 0 0,1 15,18H9A1,1 0 0,1 8,17V14.74C6.19,13.47 5,11.38 5,9A7,7 0 0,1 12,2M9,21V20H15V21A1,1 0 0,1 14,22H10A1,1 0 0,1 9,21M12,4A5,5 0 0,0 7,9C7,11.05 8.23,12.81 10,13.58V16H14V13.58C15.77,12.81 17,11.05 17,9A5,5 0 0,0 12,4Z";var E="M11 15H6L13 1V9H18L11 23V15Z";var w2="M12,17A2,2 0 0,0 14,15C14,13.89 13.1,13 12,13A2,2 0 0,0 10,15A2,2 0 0,0 12,17M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V10C4,8.89 4.9,8 6,8H7V6A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,3A3,3 0 0,0 9,6V8H15V6A3,3 0 0,0 12,3Z";var b2="M18 1C15.24 1 13 3.24 13 6V8H4C2.9 8 2 8.89 2 10V20C2 21.11 2.9 22 4 22H16C17.11 22 18 21.11 18 20V10C18 8.9 17.11 8 16 8H15V6C15 4.34 16.34 3 18 3C19.66 3 21 4.34 21 6V8H23V6C23 3.24 20.76 1 18 1M10 13C11.1 13 12 13.89 12 15C12 16.11 11.11 17 10 17C8.9 17 8 16.11 8 15C8 13.9 8.9 13 10 13Z";var B2="M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z";var y2="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z";var P2="M5,7A2,2 0 0,0 3,9V15A2,2 0 0,0 5,17H8V15H5V9H8V7H5M11,7A2,2 0 0,0 9,9V15A2,2 0 0,0 11,17H13A2,2 0 0,0 15,15V9A2,2 0 0,0 13,7H11M11,9H13V15H11V9M16,10.5V12H19V13.5H17.5A1.5,1.5 0 0,0 16,15V18H20.5V16.5H17.5V15H19A1.5,1.5 0 0,0 20.5,13.5V12A1.5,1.5 0 0,0 19,10.5H16Z";var T2="M20.84 2.18L16.91 2.96L19.65 6.5L21.62 6.1L20.84 2.18M13.97 3.54L12 3.93L14.75 7.46L16.71 7.07L13.97 3.54M9.07 4.5L7.1 4.91L9.85 8.44L11.81 8.05L9.07 4.5M4.16 5.5L3.18 5.69C2.1 5.9 1.39 6.96 1.61 8.04L2 10L6.9 9.03L4.16 5.5M20 12V20H4V12H20M22 10H2V20C2 21.11 2.9 22 4 22H20C21.11 22 22 21.11 22 20V10Z";var F2="M21,3V15.5A3.5,3.5 0 0,1 17.5,19A3.5,3.5 0 0,1 14,15.5A3.5,3.5 0 0,1 17.5,12C18.04,12 18.55,12.12 19,12.34V6.47L9,8.6V17.5A3.5,3.5 0 0,1 5.5,21A3.5,3.5 0 0,1 2,17.5A3.5,3.5 0 0,1 5.5,14C6.04,14 6.55,14.12 7,14.34V6L21,3Z";var R2="M8 18C6.67 18 5.79 18.79 5.29 19.29S4.67 20 4 20 3.21 19.79 2.71 19.29C2.35 18.93 1.79 18.42 1 18.16V20.41C1.09 20.5 1.18 20.59 1.29 20.71C1.79 21.21 2.67 22 4 22S6.21 21.21 6.71 20.71 7.33 20 8 20 8.79 20.21 9.29 20.71C9.73 21.14 10.44 21.8 11.5 21.96C11.66 22 11.83 22 12 22C13.33 22 14.21 21.21 14.71 20.71S15.33 20 16 20 16.79 20.21 17.29 20.71 18.67 22 20 22 22.21 21.21 22.71 20.71C22.82 20.59 22.91 20.5 23 20.41V18.16C22.21 18.42 21.65 18.93 21.29 19.29C20.79 19.79 20.67 20 20 20S19.21 19.79 18.71 19.29 17.33 18 16 18 13.79 18.79 13.29 19.29 12.67 20 12 20C11.78 20 11.63 19.97 11.5 19.92C11.22 19.82 11.05 19.63 10.71 19.29C10.21 18.79 9.33 18 8 18M22 10.5C22 10.5 24 12.67 24 14C24 15.1 23.1 16 22 16S20 15.1 20 14C20 12.67 22 10.5 22 10.5M22.5 7.13L19.24 5.24L12.73 9C12.39 8.4 11.74 8 11 8H9V6H10C10.55 6 11 5.55 11 5S10.55 4 10 4H6C5.45 4 5 4.45 5 5S5.45 6 6 6H7V8H5C3.9 8 3 8.9 3 10V13C3 14.1 3.9 15 5 15H14C14.75 15 15.41 14.58 15.75 13.97L19.4 7.65L21.5 8.86C22 9.14 22.59 8.97 22.87 8.5C23.14 8 23 7.4 22.5 7.13M14 13H5V10H11.69L12.6 11.43L16.06 9.43L14 13M3.5 6.92L1.79 8.62A1 1 0 0 1 .38 7.21L2.09 5.5A1 1 0 0 1 3.5 5.5C3.89 5.89 3.89 6.5 3.5 6.92Z";var D2="M17.5,12A1.5,1.5 0 0,1 16,10.5A1.5,1.5 0 0,1 17.5,9A1.5,1.5 0 0,1 19,10.5A1.5,1.5 0 0,1 17.5,12M14.5,8A1.5,1.5 0 0,1 13,6.5A1.5,1.5 0 0,1 14.5,5A1.5,1.5 0 0,1 16,6.5A1.5,1.5 0 0,1 14.5,8M9.5,8A1.5,1.5 0 0,1 8,6.5A1.5,1.5 0 0,1 9.5,5A1.5,1.5 0 0,1 11,6.5A1.5,1.5 0 0,1 9.5,8M6.5,12A1.5,1.5 0 0,1 5,10.5A1.5,1.5 0 0,1 6.5,9A1.5,1.5 0 0,1 8,10.5A1.5,1.5 0 0,1 6.5,12M12,3A9,9 0 0,0 3,12A9,9 0 0,0 12,21A1.5,1.5 0 0,0 13.5,19.5C13.5,19.11 13.35,18.76 13.11,18.5C12.88,18.23 12.73,17.88 12.73,17.5A1.5,1.5 0 0,1 14.23,16H16A5,5 0 0,0 21,11C21,6.58 16.97,3 12,3Z";var E2="M14.53 1.45L13.45 2.53L15.05 4.13C15.27 4.38 15.38 4.67 15.38 5S15.27 5.64 15.05 5.86L11.5 9.47L12.5 10.55L16.13 6.94C16.66 6.35 16.92 5.7 16.92 5C16.92 4.3 16.66 3.64 16.13 3.05L14.53 1.45M10.55 3.47L9.47 4.55L10.08 5.11C10.3 5.33 10.41 5.63 10.41 6S10.3 6.67 10.08 6.89L9.47 7.45L10.55 8.53L11.11 7.92C11.64 7.33 11.91 6.69 11.91 6C11.91 5.28 11.64 4.63 11.11 4.03L10.55 3.47M21 5.06C20.31 5.06 19.67 5.33 19.08 5.86L13.45 11.5L14.53 12.5L20.11 6.94C20.36 6.69 20.66 6.56 21 6.56S21.64 6.69 21.89 6.94L22.5 7.55L23.53 6.47L22.97 5.86C22.38 5.33 21.72 5.06 21 5.06M7 8L2 22L16 17L7 8M19 11.06C18.3 11.06 17.66 11.33 17.06 11.86L15.47 13.45L16.55 14.53L18.14 12.94C18.39 12.69 18.67 12.56 19 12.56C19.33 12.56 19.63 12.69 19.88 12.94L21.5 14.53L22.55 13.5L20.95 11.86C20.36 11.33 19.7 11.06 19 11.06Z";var _2="M14,19H18V5H14M6,19H10V5H6V19Z";var N2="M8,5.14V19.14L19,12.14L8,5.14Z";var W2="M17,18.25V21.5H7V18.25C7,16.87 9.24,15.75 12,15.75C14.76,15.75 17,16.87 17,18.25M12,5.5A6.5,6.5 0 0,1 18.5,12C18.5,13.25 18.15,14.42 17.54,15.41L16,14.04C16.32,13.43 16.5,12.73 16.5,12C16.5,9.5 14.5,7.5 12,7.5C9.5,7.5 7.5,9.5 7.5,12C7.5,12.73 7.68,13.43 8,14.04L6.46,15.41C5.85,14.42 5.5,13.25 5.5,12A6.5,6.5 0 0,1 12,5.5M12,1.5A10.5,10.5 0 0,1 22.5,12C22.5,14.28 21.77,16.39 20.54,18.11L19.04,16.76C19.96,15.4 20.5,13.76 20.5,12A8.5,8.5 0 0,0 12,3.5A8.5,8.5 0 0,0 3.5,12C3.5,13.76 4.04,15.4 4.96,16.76L3.46,18.11C2.23,16.39 1.5,14.28 1.5,12A10.5,10.5 0 0,1 12,1.5M12,9.5A2.5,2.5 0 0,1 14.5,12A2.5,2.5 0 0,1 12,14.5A2.5,2.5 0 0,1 9.5,12A2.5,2.5 0 0,1 12,9.5Z";var I2="M14.6 9L18 3.1L19.7 4.1L16.9 9H14.6M14 10H3V12H5V19C5 20.1 5.9 21 7 21H17C18.1 21 19 20.1 19 19V12H21V10H14Z";var G2="M19 19C19 20.11 18.11 21 17 21H7C5.9 21 5 20.11 5 19V12H3V10H21V12H19M8 1.5C6.15 1.5 4.65 3 4.65 4.85C4.65 6.7 6.15 8.2 8 8.2H9.53C9.92 8.2 10.29 8.3 10.61 8.5H12.63C12.05 7.45 10.86 6.75 9.53 6.75H8C7 6.75 6.15 5.77 6.15 4.75C6.15 3.73 7 3 8 3M12.85 2C12.85 3 12 3.85 11 3.85V5.35C12.92 5.35 14.5 6.7 14.89 8.5H16.42C16.12 6.67 14.96 5.15 13.35 4.38C13.97 3.77 14.35 2.93 14.35 2Z";var Q2="M16.56,5.44L15.11,6.89C16.84,7.94 18,9.83 18,12A6,6 0 0,1 12,18A6,6 0 0,1 6,12C6,9.83 7.16,7.94 8.88,6.88L7.44,5.44C5.36,6.88 4,9.28 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12C20,9.28 18.64,6.88 16.56,5.44M13,3H11V13H13";var U2="M18.73,18C15.4,21.69 9.71,22 6,18.64C2.33,15.31 2.04,9.62 5.37,5.93C6.9,4.25 9,3.2 11.27,3C7.96,6.7 8.27,12.39 12,15.71C13.63,17.19 15.78,18 18,18C18.25,18 18.5,18 18.73,18Z";var z2="M16,6C14.87,6 13.77,6.35 12.84,7H4C2.89,7 2,7.89 2,9V15C2,16.11 2.89,17 4,17H5V18A1,1 0 0,0 6,19H8A1,1 0 0,0 9,18V17H15V18A1,1 0 0,0 16,19H18A1,1 0 0,0 19,18V17H20C21.11,17 22,16.11 22,15V9C22,7.89 21.11,7 20,7H19.15C18.23,6.35 17.13,6 16,6M16,7.5A3.5,3.5 0 0,1 19.5,11A3.5,3.5 0 0,1 16,14.5A3.5,3.5 0 0,1 12.5,11A3.5,3.5 0 0,1 16,7.5M4,9H8V10H4V9M16,9A2,2 0 0,0 14,11A2,2 0 0,0 16,13A2,2 0 0,0 18,11A2,2 0 0,0 16,9M4,11H8V12H4V11M4,13H8V14H4V13Z";var $2="M7.95,3L6.53,5.19L7.95,7.4H7.94L5.95,10.5L4.22,9.6L5.64,7.39L4.22,5.19L6.22,2.09L7.95,3M13.95,2.89L12.53,5.1L13.95,7.3L13.94,7.31L11.95,10.4L10.22,9.5L11.64,7.3L10.22,5.1L12.22,2L13.95,2.89M20,2.89L18.56,5.1L20,7.3V7.31L18,10.4L16.25,9.5L17.67,7.3L16.25,5.1L18.25,2L20,2.89M2,22V14A2,2 0 0,1 4,12H20A2,2 0 0,1 22,14V22H20V20H4V22H2M6,14A1,1 0 0,0 5,15V17A1,1 0 0,0 6,18A1,1 0 0,0 7,17V15A1,1 0 0,0 6,14M10,14A1,1 0 0,0 9,15V17A1,1 0 0,0 10,18A1,1 0 0,0 11,17V15A1,1 0 0,0 10,14M14,14A1,1 0 0,0 13,15V17A1,1 0 0,0 14,18A1,1 0 0,0 15,17V15A1,1 0 0,0 14,14M18,14A1,1 0 0,0 17,15V17A1,1 0 0,0 18,18A1,1 0 0,0 19,17V15A1,1 0 0,0 18,14Z";var K2="M12,0C8.96,0 6.21,1.23 4.22,3.22L5.63,4.63C7.26,3 9.5,2 12,2C14.5,2 16.74,3 18.36,4.64L19.77,3.23C17.79,1.23 15.04,0 12,0M7.05,6.05L8.46,7.46C9.37,6.56 10.62,6 12,6C13.38,6 14.63,6.56 15.54,7.46L16.95,6.05C15.68,4.78 13.93,4 12,4C10.07,4 8.32,4.78 7.05,6.05M12,15A2,2 0 0,1 10,13A2,2 0 0,1 12,11A2,2 0 0,1 14,13A2,2 0 0,1 12,15M15,9H9A1,1 0 0,0 8,10V22A1,1 0 0,0 9,23H15A1,1 0 0,0 16,22V10A1,1 0 0,0 15,9Z";var q2="M12,4C14.1,4 16.1,4.8 17.6,6.3C20.7,9.4 20.7,14.5 17.6,17.6C15.8,19.5 13.3,20.2 10.9,19.9L11.4,17.9C13.1,18.1 14.9,17.5 16.2,16.2C18.5,13.9 18.5,10.1 16.2,7.7C15.1,6.6 13.5,6 12,6V10.6L7,5.6L12,0.6V4M6.3,17.6C3.7,15 3.3,11 5.1,7.9L6.6,9.4C5.5,11.6 5.9,14.4 7.8,16.2C8.3,16.7 8.9,17.1 9.6,17.4L9,19.4C8,19 7.1,18.4 6.3,17.6Z";var j2="M11.5,12L20,18V6M11,18V6L2.5,12L11,18Z";var Y2="M18.1,4.8C18,4.3 17.6,4 17.1,4H13L13.2,7H10.8L11,4H6.8C6.3,4 5.9,4.4 5.8,4.8L3.1,18.8C3,19.4 3.5,20 4.1,20H10L10.3,15H13.7L14,20H19.8C20.4,20 20.9,19.4 20.8,18.8L18.1,4.8M10.4,13L10.6,9H13.2L13.4,13H10.4Z";var X2="M16.88 4L16.88 4L19.03 6.1L13.5 10.5L12.5 9.5L16.87 4L16.88 4M16.88 2C16.3 2 15.73 2.24 15.33 2.72L9.8 9.65L13.34 13.19L20.28 7.67C21.18 6.91 21.25 5.54 20.41 4.7L18.3 2.59C17.9 2.19 17.39 2 16.88 2M9.1 10.36L8.39 11.07C8 11.46 8 12.09 8.39 12.5L10.5 14.6C10.71 14.8 10.96 14.89 11.22 14.89S11.73 14.8 11.93 14.6L12.63 13.9L9.1 10.36M6 15C5.45 15 5 15.45 5 16C5 16.55 5.45 17 6 17C6.55 17 7 16.55 7 16C7 15.45 6.55 15 6 15M9 16C8.45 16 8 16.45 8 17S8.45 18 9 18C9.55 18 10 17.55 10 17S9.55 16 9 16M4 18C3.45 18 3 18.45 3 19S3.45 20 4 20C4.55 20 5 19.55 5 19S4.55 18 4 18M7 19C6.45 19 6 19.45 6 20S6.45 21 7 21C7.55 21 8 20.55 8 20S7.55 19 7 19Z";var _="M10.6 9.6L9 15L7.4 9.6L2 8L7.4 6.4L9 1L10.6 6.4L16 8L10.6 9.6M17 14.2L21 12L18.8 16L21 20L17 17.8L13 20L15.2 16L13 12L17 14.2M10 16L8.3 19L10 22L7 20.3L4 22L5.7 19L4 16L7 17.7L10 16";var J2="M16,18H18V6H16M6,18L14.5,12L6,6V18Z";var C5="M6,18V6H8V18H6M9.5,12L18,6V18L9.5,12Z";var H5="M20.79,13.95L18.46,14.57L16.46,13.44V10.56L18.46,9.43L20.79,10.05L21.31,8.12L19.54,7.65L20,5.88L18.07,5.36L17.45,7.69L15.45,8.82L13,7.38V5.12L14.71,3.41L13.29,2L12,3.29L10.71,2L9.29,3.41L11,5.12V7.38L8.5,8.82L6.5,7.69L5.92,5.36L4,5.88L4.47,7.65L2.7,8.12L3.22,10.05L5.55,9.43L7.55,10.56V13.45L5.55,14.58L3.22,13.96L2.7,15.89L4.47,16.36L4,18.12L5.93,18.64L6.55,16.31L8.55,15.18L11,16.62V18.88L9.29,20.59L10.71,22L12,20.71L13.29,22L14.7,20.59L13,18.88V16.62L15.5,15.17L17.5,16.3L18.12,18.63L20,18.12L19.53,16.35L21.3,15.88L20.79,13.95M9.5,10.56L12,9.11L14.5,10.56V13.44L12,14.89L9.5,13.44V10.56Z",V5="M16.46,9.41L13,7.38V5.12L14.71,3.41L13.29,2L12,3.29L10.71,2L9.29,3.41L11,5.12V7.38L8.5,8.82L6.5,7.69L5.92,5.36L4,5.88L4.47,7.65L2.7,8.12L3.22,10.05L5.55,9.43L7.55,10.56V13.45L5.55,14.58L3.22,13.96L2.7,15.89L4.47,16.36L4,18.12L5.93,18.64L6.55,16.31L8.55,15.18L11,16.62V18.88L9.29,20.59L10.71,22L12,20.71L13.29,22L14.7,20.59L13,18.88V16.62L16.46,14.61M9.5,10.56L12,9.11L14.5,10.56V13.44L12,14.89L9.5,13.44M19,13V7H21V13H19M19,17V15H21V17H19Z";var L5="M8 17.85C8 19.04 7.11 20 6 20S4 19.04 4 17.85C4 16.42 6 14 6 14S8 16.42 8 17.85M16.46 12V10.56L18.46 9.43L20.79 10.05L21.31 8.12L19.54 7.65L20 5.88L18.07 5.36L17.45 7.69L15.45 8.82L13 7.38V5.12L14.71 3.41L13.29 2L12 3.29L10.71 2L9.29 3.41L11 5.12V7.38L8.5 8.82L6.5 7.69L5.92 5.36L4 5.88L4.47 7.65L2.7 8.12L3.22 10.05L5.55 9.43L7.55 10.56V12H2V13H22V12H16.46M9.5 12V10.56L12 9.11L14.5 10.56V12H9.5M20 17.85C20 19.04 19.11 20 18 20S16 19.04 16 17.85C16 16.42 18 14 18 14S20 16.42 20 17.85M14 20.85C14 22.04 13.11 23 12 23S10 22.04 10 20.85C10 19.42 12 17 12 17S14 19.42 14 20.85Z";var M5="M14.25,12L16.27,11H23L22,9H18.03L20.42,5.83L19.43,3.83L15.37,9.2L13.35,10.21L13.75,8L17.83,2.62L15.64,2.22L12,7L8.4,2.2L6.2,2.6L10.26,8L10.66,10.21L8.82,9.29L8.66,9.21L4.6,3.8L3.6,5.8L6,9H2L1,11H7.77L9.75,12L7.73,13H1L2,15H5.97L3.58,18.17L4.57,20.17L8.63,14.8L10.65,13.79L10.25,16L6.17,21.38L8.36,21.79L12,17L15.6,21.8L17.8,21.4L13.74,16L13.34,13.79L15.34,14.79L19.4,20.2L20.4,18.2L18,15H22L23,13H16.23";var r5="M12,16A3,3 0 0,1 9,13C9,11.88 9.61,10.9 10.5,10.39L20.21,4.77L14.68,14.35C14.18,15.33 13.17,16 12,16M12,3C13.81,3 15.5,3.5 16.97,4.32L14.87,5.53C14,5.19 13,5 12,5A8,8 0 0,0 4,13C4,15.21 4.89,17.21 6.34,18.65H6.35C6.74,19.04 6.74,19.67 6.35,20.06C5.96,20.45 5.32,20.45 4.93,20.07V20.07C3.12,18.26 2,15.76 2,13A10,10 0 0,1 12,3M22,13C22,15.76 20.88,18.26 19.07,20.07V20.07C18.68,20.45 18.05,20.45 17.66,20.06C17.27,19.67 17.27,19.04 17.66,18.65V18.65C19.11,17.2 20,15.21 20,13C20,12 19.81,11 19.46,10.1L20.67,8C21.5,9.5 22,11.18 22,13Z";var e5="M16.72 10.43C14.68 8.39 14.5 4.66 14.5 4H13V6H9V4H7C7 2.9 7.9 2 9 2H16V3C16 3.08 16.04 7.63 17.78 9.37L16.72 10.43M17 2V4H18V2H17M15 12C13 10 13 7 13 7H9V9C9 10 9 10 8 11S7 13 7 13V20C7 21.1 7.9 22 9 22H13C14.1 22 15 21.1 15 20V12Z";var t5="M12,15.39L8.24,17.66L9.23,13.38L5.91,10.5L10.29,10.13L12,6.09L13.71,10.13L18.09,10.5L14.77,13.38L15.76,17.66M22,9.24L14.81,8.63L12,2L9.19,8.63L2,9.24L7.45,13.97L5.82,21L12,17.27L18.18,21L16.54,13.97L22,9.24Z";var i5="M13,19.92C14.8,19.7 16.35,18.95 17.65,17.65C18.95,16.35 19.7,14.8 19.92,13H16.92C16.7,14 16.24,14.84 15.54,15.54C14.84,16.24 14,16.7 13,16.92V19.92M10,8H14L17,11H19.92C19.67,9.05 18.79,7.38 17.27,6C15.76,4.66 14,4 12,4C10,4 8.24,4.66 6.73,6C5.21,7.38 4.33,9.05 4.08,11H7L10,8M11,19.92V16.92C10,16.7 9.16,16.24 8.46,15.54C7.76,14.84 7.3,14 7.08,13H4.08C4.3,14.77 5.05,16.3 6.35,17.6C7.65,18.9 9.2,19.67 11,19.92M12,2C14.75,2 17.1,3 19.05,4.95C21,6.9 22,9.25 22,12C22,14.75 21,17.1 19.05,19.05C17.1,21 14.75,22 12,22C9.25,22 6.9,21 4.95,19.05C3,17.1 2,14.75 2,12C2,9.25 3,6.9 4.95,4.95C6.9,3 9.25,2 12,2Z";var A5="M18,18H6V6H18V18Z";var o5="M10 2L7.6 5.4C8.4 5.2 9.2 5 10 5S11.6 5.2 12.4 5.4L10 2M21 13.8V7C21 5.9 20.1 5 19 5S17 5.9 17 7V13.8C16.4 14.4 16 15.2 16 16C16 17.7 17.3 19 19 19S22 17.7 22 16C22 15.1 21.6 14.3 21 13.8M20 8H18V7C18 6.4 18.4 6 19 6S20 6.4 20 7V8M5.5 6.7L1.3 7L3.1 10.8C3.2 10 3.5 9.2 3.9 8.5C4.4 7.8 4.9 7.2 5.5 6.7M10 7C7.2 7 5 9.2 5 12S7.2 17 10 17 15 14.8 15 12 12.8 7 10 7M10 15C8.3 15 7 13.7 7 12S8.3 9 10 9 13 10.3 13 12 11.7 15 10 15M3.2 13.2L1.4 17L5.5 17.4C5 16.9 4.4 16.2 4 15.5C3.5 14.8 3.3 14 3.2 13.2M7.6 18.6L10 22L12.4 18.6C11.6 18.8 10.8 19 10 19C9.1 19 8.3 18.8 7.6 18.6Z";var a5="M22.08,11.04H20.08V4H13.05V2H11.04V4H4V11.04H2V13.05H4V20.08H11.04V22.08H13.05V20.08H20.08V13.05H22.08V11.04M18.07,18.07H13.05V16.06H11.04V18.07H6V13.05H8.03V11.04H6V6H11.04V8.03H13.05V6H18.07V11.04H16.06V13.05H18.07V18.07M13.05,12.05A1,1 0 0,1 12.05,13.05C11.5,13.05 11.04,12.6 11.04,12.05C11.04,11.5 11.5,11.04 12.05,11.04C12.6,11.04 13.05,11.5 13.05,12.05Z";var d5="M8.16,3L6.75,4.41L9.34,7H4C2.89,7 2,7.89 2,9V19C2,20.11 2.89,21 4,21H20C21.11,21 22,20.11 22,19V9C22,7.89 21.11,7 20,7H14.66L17.25,4.41L15.84,3L12,6.84L8.16,3M4,9H17V19H4V9M19.5,9A1,1 0 0,1 20.5,10A1,1 0 0,1 19.5,11A1,1 0 0,1 18.5,10A1,1 0 0,1 19.5,9M19.5,12A1,1 0 0,1 20.5,13A1,1 0 0,1 19.5,14A1,1 0 0,1 18.5,13A1,1 0 0,1 19.5,12Z";var p5="M15 13V5A3 3 0 0 0 9 5V13A5 5 0 1 0 15 13M12 4A1 1 0 0 1 13 5V8H11V5A1 1 0 0 1 12 4Z";var m5="M19.47 3.47L13.47 9.47L10.53 10C10.22 10.03 9.94 10.18 9.72 10.4L2.81 17.31C1.74 18.38 1.74 20.12 2.81 21.2C3.88 22.27 5.62 22.27 6.7 21.2L13.61 14.29C13.83 14.07 14 13.79 14.03 13.5L14.54 10.54L20.54 4.54L22 2L19.47 3.47M11 14.38C10.24 14.38 9.62 13.76 9.62 13S10.24 11.62 11 11.62 12.38 12.24 12.38 13C12.37 13.76 11.76 14.38 11 14.38Z";var n5="M12,20A7,7 0 0,1 5,13A7,7 0 0,1 12,6A7,7 0 0,1 19,13A7,7 0 0,1 12,20M19.03,7.39L20.45,5.97C20,5.46 19.55,5 19.04,4.56L17.62,6C16.07,4.74 14.12,4 12,4A9,9 0 0,0 3,13A9,9 0 0,0 12,22C17,22 21,17.97 21,13C21,10.88 20.26,8.93 19.03,7.39M11,14H13V8H11M15,1H9V3H15V1Z";var x5="M6,2H18V8H18V8L14,12L18,16V16H18V22H6V16H6V16L10,12L6,8V8H6V2M16,16.5L12,12.5L8,16.5V20H16V16.5M12,11.5L16,7.5V4H8V7.5L12,11.5M10,6H14V6.75L12,8.75L10,6.75V6Z";var v5="M4,5A2,2 0 0,0 2,7V17A2,2 0 0,0 4,19H20A2,2 0 0,0 22,17V7A2,2 0 0,0 20,5H4M4,7H16V17H4V7M19,7A1,1 0 0,1 20,8A1,1 0 0,1 19,9A1,1 0 0,1 18,8A1,1 0 0,1 19,7M6,9V11H14V9H6M19,11A1,1 0 0,1 20,12A1,1 0 0,1 19,13A1,1 0 0,1 18,12A1,1 0 0,1 19,11Z";var l5="M2 12H4V17H20V12H22V17C22 18.11 21.11 19 20 19H4C2.9 19 2 18.11 2 17V12M12 15L17.55 9.54L16.13 8.13L13 11.25V2H11V11.25L7.88 8.13L6.46 9.55L12 15Z";var Z5="M16,18L18.29,15.71L13.41,10.83L9.41,14.83L2,7.41L3.41,6L9.41,12L13.41,8L19.71,14.29L22,12V18H16Z",S5="M22,12L18,8V11H3V13H18V16L22,12Z",u5="M16,6L18.29,8.29L13.41,13.17L9.41,9.17L2,16.59L3.41,18L9.41,12L13.41,16L19.71,9.71L22,12V6H16Z";var s5="M8 13C6.14 13 4.59 14.28 4.14 16H2V18H4.14C4.59 19.72 6.14 21 8 21S11.41 19.72 11.86 18H22V16H11.86C11.41 14.28 9.86 13 8 13M8 19C6.9 19 6 18.1 6 17C6 15.9 6.9 15 8 15S10 15.9 10 17C10 18.1 9.1 19 8 19M19.86 6C19.41 4.28 17.86 3 16 3S12.59 4.28 12.14 6H2V8H12.14C12.59 9.72 14.14 11 16 11S19.41 9.72 19.86 8H22V6H19.86M16 9C14.9 9 14 8.1 14 7C14 5.9 14.9 5 16 5S18 5.9 18 7C18 8.1 17.1 9 16 9Z";var c5="M21,10.12H14.22L16.96,7.3C14.23,4.6 9.81,4.5 7.08,7.2C4.35,9.91 4.35,14.28 7.08,17C9.81,19.7 14.23,19.7 16.96,17C18.32,15.65 19,14.08 19,12.1H21C21,14.08 20.12,16.65 18.36,18.39C14.85,21.87 9.15,21.87 5.64,18.39C2.14,14.92 2.11,9.28 5.62,5.81C9.13,2.34 14.76,2.34 18.27,5.81L21,3V10.12M12.5,8V12.25L16,14.33L15.28,15.54L11,13V8H12.5Z";var N="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z";var W="M12,4L9.91,6.09L12,8.18M4.27,3L3,4.27L7.73,9H3V15H7L12,20V13.27L16.25,17.53C15.58,18.04 14.83,18.46 14,18.7V20.77C15.38,20.45 16.63,19.82 17.68,18.96L19.73,21L21,19.73L12,10.73M19,12C19,12.94 18.8,13.82 18.46,14.64L19.97,16.15C20.62,14.91 21,13.5 21,12C21,7.72 18,4.14 14,3.23V5.29C16.89,6.15 19,8.83 19,12M16.5,12C16.5,10.23 15.5,8.71 14,7.97V10.18L16.45,12.63C16.5,12.43 16.5,12.21 16.5,12Z";var O5="M12,20A6,6 0 0,1 6,14C6,10 12,3.25 12,3.25C12,3.25 18,10 18,14A6,6 0 0,1 12,20Z";var I="M12,3.25C12,3.25 6,10 6,14C6,17.32 8.69,20 12,20A6,6 0 0,0 18,14C18,10 12,3.25 12,3.25M14.47,9.97L15.53,11.03L9.53,17.03L8.47,15.97M9.75,10A1.25,1.25 0 0,1 11,11.25A1.25,1.25 0 0,1 9.75,12.5A1.25,1.25 0 0,1 8.5,11.25A1.25,1.25 0 0,1 9.75,10M14.25,14.5A1.25,1.25 0 0,1 15.5,15.75A1.25,1.25 0 0,1 14.25,17A1.25,1.25 0 0,1 13,15.75A1.25,1.25 0 0,1 14.25,14.5Z";var h5="M3,15H13A1,1 0 0,1 14,16A1,1 0 0,1 13,17H3A1,1 0 0,1 2,16A1,1 0 0,1 3,15M16,15H21A1,1 0 0,1 22,16A1,1 0 0,1 21,17H16A1,1 0 0,1 15,16A1,1 0 0,1 16,15M1,12A5,5 0 0,1 6,7C7,4.65 9.3,3 12,3C15.43,3 18.24,5.66 18.5,9.03L19,9C21.19,9 22.97,10.76 23,13H21A2,2 0 0,0 19,11H17V10A5,5 0 0,0 12,5C9.5,5 7.45,6.82 7.06,9.19C6.73,9.07 6.37,9 6,9A3,3 0 0,0 3,12C3,12.35 3.06,12.69 3.17,13H1.1L1,12M3,19H5A1,1 0 0,1 6,20A1,1 0 0,1 5,21H3A1,1 0 0,1 2,20A1,1 0 0,1 3,19M8,19H21A1,1 0 0,1 22,20A1,1 0 0,1 21,21H8A1,1 0 0,1 7,20A1,1 0 0,1 8,19Z";var g5="M17.75,4.09L15.22,6.03L16.13,9.09L13.5,7.28L10.87,9.09L11.78,6.03L9.25,4.09L12.44,4L13.5,1L14.56,4L17.75,4.09M21.25,11L19.61,12.25L20.2,14.23L18.5,13.06L16.8,14.23L17.39,12.25L15.75,11L17.81,10.95L18.5,9L19.19,10.95L21.25,11M18.97,15.95C19.8,15.87 20.69,17.05 20.16,17.8C19.84,18.25 19.5,18.67 19.08,19.07C15.17,23 8.84,23 4.94,19.07C1.03,15.17 1.03,8.83 4.94,4.93C5.34,4.53 5.76,4.17 6.21,3.85C6.96,3.32 8.14,4.21 8.06,5.04C7.79,7.9 8.75,10.87 10.95,13.06C13.14,15.26 16.1,16.22 18.97,15.95M17.33,17.97C14.5,17.81 11.7,16.64 9.53,14.5C7.36,12.31 6.2,9.5 6.04,6.68C3.23,9.82 3.34,14.64 6.35,17.66C9.37,20.67 14.19,20.78 17.33,17.97Z";var f5="M4,10A1,1 0 0,1 3,9A1,1 0 0,1 4,8H12A2,2 0 0,0 14,6A2,2 0 0,0 12,4C11.45,4 10.95,4.22 10.59,4.59C10.2,5 9.56,5 9.17,4.59C8.78,4.2 8.78,3.56 9.17,3.17C9.9,2.45 10.9,2 12,2A4,4 0 0,1 16,6A4,4 0 0,1 12,10H4M19,12A1,1 0 0,0 20,11A1,1 0 0,0 19,10C18.72,10 18.47,10.11 18.29,10.29C17.9,10.68 17.27,10.68 16.88,10.29C16.5,9.9 16.5,9.27 16.88,8.88C17.42,8.34 18.17,8 19,8A3,3 0 0,1 22,11A3,3 0 0,1 19,14H5A1,1 0 0,1 4,13A1,1 0 0,1 5,12H19M18,18H4A1,1 0 0,1 3,17A1,1 0 0,1 4,16H18A3,3 0 0,1 21,19A3,3 0 0,1 18,22C17.17,22 16.42,21.66 15.88,21.12C15.5,20.73 15.5,20.1 15.88,19.71C16.27,19.32 16.9,19.32 17.29,19.71C17.47,19.89 17.72,20 18,20A1,1 0 0,0 19,19A1,1 0 0,0 18,18Z";var k5="M12,21L15.6,16.2C14.6,15.45 13.35,15 12,15C10.65,15 9.4,15.45 8.4,16.2L12,21M12,3C7.95,3 4.21,4.34 1.2,6.6L3,9C5.5,7.12 8.62,6 12,6C15.38,6 18.5,7.12 21,9L22.8,6.6C19.79,4.34 16.05,3 12,3M12,9C9.3,9 6.81,9.89 4.8,11.4L6.6,13.8C8.1,12.67 9.97,12 12,12C14.03,12 15.9,12.67 17.4,13.8L19.2,11.4C17.19,9.89 14.7,9 12,9Z";var G="M2.28,3L1,4.27L2.47,5.74C2.04,6 1.61,6.29 1.2,6.6L3,9C3.53,8.6 4.08,8.25 4.66,7.93L6.89,10.16C6.15,10.5 5.44,10.91 4.8,11.4L6.6,13.8C7.38,13.22 8.26,12.77 9.2,12.47L11.75,15C10.5,15.07 9.34,15.5 8.4,16.2L12,21L14.46,17.73L17.74,21L19,19.72M12,3C9.85,3 7.8,3.38 5.9,4.07L8.29,6.47C9.5,6.16 10.72,6 12,6C15.38,6 18.5,7.11 21,9L22.8,6.6C19.79,4.34 16.06,3 12,3M12,9C11.62,9 11.25,9 10.88,9.05L14.07,12.25C15.29,12.53 16.43,13.07 17.4,13.8L19.2,11.4C17.2,9.89 14.7,9 12,9Z";var w5="M21 20V2H3V20H1V23H23V20M19 4V11H13V4M5 4H11V11H5M5 20V13H11V20M13 20V13H19V20Z";var b5="M21 20V2H3V20H1V23H23V20M19 4V11H17V4M5 4H7V11H5M5 20V13H7V20M9 20V4H15V20M17 20V13H19V20Z";var B5="M10 6.2C10 4.3 8.8 2.6 7 2V5.7H4V2C2.2 2.6 1 4.3 1 6.2C1 8.1 2.2 9.8 4 10.4V21.4C4 21.8 4.2 22 4.5 22H6.5C6.8 22 7 21.8 7 21.5V10.5C8.8 9.9 10 8.2 10 6.2M16 8C16 8 15.9 8 16 8C12.1 8.1 9 11.2 9 15C9 18.9 12.1 22 16 22S23 18.9 23 15 19.9 8 16 8M16 20C13.2 20 11 17.8 11 15S13.2 10 16 10 21 12.2 21 15 18.8 20 16 20M15 11V16L18.6 18.2L19.4 17L16.5 15.3V11H15Z";var y5="M22.61,19L13.53,9.91C14.46,7.57 14,4.81 12.09,2.91C9.79,0.61 6.21,0.4 3.66,2.26L7.5,6.11L6.08,7.5L2.25,3.69C0.39,6.23 0.6,9.82 2.9,12.11C4.76,13.97 7.47,14.46 9.79,13.59L18.9,22.7C19.29,23.09 19.92,23.09 20.31,22.7L22.61,20.4C23,20 23,19.39 22.61,19M19.61,20.59L10.15,11.13C9.54,11.58 8.86,11.85 8.15,11.95C6.79,12.15 5.36,11.74 4.32,10.7C3.37,9.76 2.93,8.5 3,7.26L6.09,10.35L10.33,6.11L7.24,3C8.5,2.95 9.73,3.39 10.68,4.33C11.76,5.41 12.17,6.9 11.92,8.29C11.8,9 11.5,9.66 11.04,10.25L20.5,19.7L19.61,20.59Z";var P5={alert:m1,check:N1,chevron:I1,chevron_up:U1,clock:$1,counter:q1,dots:V2,error:p1,info:h2,pause:_2,play:N2,power:Q2,remote:K2,stop:A5,timer:x5,water:O5,wifi:k5,wifi_off:G,auto:Z1,care:y5,brightness:c1,dishwasher:J1,door:H2,door_closed:C2,dry:F,end_sound:s1,energy:E,floor_light:z2,glass:v2,leaf:g2,key_tone:R,quick:i2,rack:x1,rinse:Y1,sanitize:_,silent:W,spray:e5,water_percent:I,zone:I,bake:X1,chicken:o2,clean:O1,defrost:L5,drawer:l5,fan:M2,fish:t2,flip:A2,fries:p2,fryer:v5,heat:e2,manual:s5,meat:a2,probe:m5,recipe:W1,reheat:D,roast:Z2,shake:X2,slow:I2,snack:d2,star:t5,steam:G2,temperature:p5,vegetable:D1,warm:D,ac:d1,adblue:R2,battery_car:f1,bonnet:b1,car:T1,car_door:P1,charger:L2,fuel:n2,gauge:x2,history:S2,lights:F1,lock:w2,lock_open:b2,marker:B2,motion:R1,odometer:r5,online:B1,parking:k1,range:Y2,service:B5,snowflake:H5,software:c5,steering:i5,travel_time:n5,trip:w1,trunk:g1,sunroof:y1,window_closed:w5,window_open:b5,bulb:k2,fridge:m2,frost:M5,ice:j1,mist:h5,night:g5,party:E2,target:a5,co2:P2,exhaust:u2,filter:F,pm25:l2,reset:q2,sleep:U2,supply:s2,wind:f5,away:S1,indoor:O2,outdoor:o5,swing:l1,battery:u1,boost:E,calendar:h1,frost_guard:V5,radiator:$2,palette:D2,touch:R,sparkle:_,noise:N,offline:G,trend_up:u5,trend_down:Z5,trend_stable:S5,apps:n1,cast:E1,cast_on:_1,game:K1,movie:T2,music:F2,podcast:W2,skip_next:J2,skip_prev:C5,tv:d5,volume:N,volume_off:W,back:v1,chevron_left:G1,chevron_right:Q1,dot:z1,forward:r2,home:c2,menu:y2,rewind:j2,leaf_off:f2};function n(r,C="icon"){let H=P5[r]||P5.info;return`<svg class="${C}" viewBox="0 0 24 24" aria-hidden="true"><path d="${H}"></path></svg>`}function t(r){return String(r??"").replace(/[&<>"']/g,C=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[C])}var U={language:"auto",compact:!1,show_artwork:!0,show_progress:!0,show_volume:!0,show_players:!0,show_sources:!0,show_remote:!0,show_macros:!0},Q=class extends HTMLElement{static getConfigElement(){return document.createElement(u)}static getStubConfig(C){return{type:`custom:${l}`,entities:c(C).slice(0,2).map(H=>H.id)}}constructor(){super(),this.attachShadow({mode:"open"}),this._sections={},this._signatures={},this._built=!1,this._pinned=null,this._macroBusy=null}setConfig(C){this._config={...U,...C||{}},this._signatures={},this._pinned=null,this._hass&&this._render()}set hass(C){this._hass=C,this._render()}get hass(){return this._hass}connectedCallback(){this._timer=window.setInterval(()=>this._tick(),M1)}disconnectedCallback(){this._timer&&window.clearInterval(this._timer),this._timer=void 0}getCardSize(){return this._config?.compact?4:6}getGridOptions(){return{columns:12,min_columns:6,rows:"auto"}}_build(){let C=document.createElement("style");C.textContent=a1;let H=document.createElement("ha-card"),V=document.createElement("div");V.className="wrap",V.addEventListener("click",L=>this._onClick(L)),V.addEventListener("input",L=>this._onInput(L)),V.addEventListener("change",L=>this._onChange(L));for(let L of["hero","foot","vol","sources","macros","pad","players"]){let M=document.createElement("div");M.dataset.section=L,this._sections[L]=M,V.appendChild(M)}H.appendChild(V),this.shadowRoot.replaceChildren(C,H),this._wrap=V,this._built=!0}_render(){if(!this._hass||!this._config)return;this._built||this._build();let C=f(g(this._config,this._hass)),H=T(this._hass,this._config,C,this._pinned);if(this._model=H,this._t=C,!H.ok){this._renderEmpty(H,C);return}if(this._emptyShown=null,this._applyWrapClasses(H),H.idle){this._section("hero",this._quietHtml(H,C)),this._section("foot",""),this._section("vol",""),this._section("sources",""),this._section("macros",""),this._section("pad",""),this._section("players",this._config.show_players?this._playersHtml(H,C):"");return}this._section("hero",this._heroHtml(H,C)),this._section("foot",this._config.show_progress?this._progHtml(H,C):""),this._section("vol",this._config.show_volume?this._volHtml(H,C):""),this._section("sources",this._config.show_sources?this._sourcesHtml(H,C):""),this._section("macros",this._config.show_macros?this._macrosHtml(H,C):""),this._section("pad",this._padOpen?this._padHtml(H,C):""),this._section("players",this._config.show_players?this._playersHtml(H,C):"")}_renderEmpty(C,H){if(this._emptyShown!==C.reason){this._emptyShown=C.reason,this._signatures={};for(let[V,L]of Object.entries(this._sections))L.innerHTML="",L.hidden=V!=="hero";this._sections.hero.innerHTML=`
      <div class="empty">${n("cast")}<div>${t(H(`ui.${C.reason}`))}</div></div>`}}_section(C,H){this._signatures[C]!==H&&(this._signatures[C]=H,this._sections[C].innerHTML=H,this._sections[C].hidden=!H)}_applyWrapClasses(C){let H=["wrap"];this._config.compact&&H.push("compact"),C.state==="paused"&&H.push("paused"),(!this._config.show_artwork||!C.artwork&&!C.hasMedia)&&H.push("noart"),C.logo&&H.push("logo"),this._hass.themes?.darkMode&&H.push("dark");let V=H.join(" ");this._wrap.className!==V&&(this._wrap.className=V)}_heroHtml(C,H){let V=[C.app,C.active.name].filter(Boolean),L=this._controlsHtml(C,H);return`
      <div class="hero">
        ${this._config.show_artwork?this._bgHtml(C):""}
        <div class="fg">
          <div class="head">
            <div class="who">
              <div class="room" data-action="more-info">${t(C.name)}</div>
              <div class="src">${n("cast_on")}<span>${t(V.join(" \xB7 "))}</span></div>
            </div>
            <div class="spacer"></div>
            <div class="pill">${t(H(`state.${C.state}`,C.state))}</div>
          </div>
          <div class="body">
            <div class="said">
              <div class="title">${t(C.title)}</div>
              ${C.sub?`<div class="sub">${t(C.sub)}</div>`:""}
              ${C.hasMedia?"":`<div class="sub">${t(H("ui.nothing_sub_one"))}</div>`}
            </div>
            ${L}
          </div>
        </div>
      </div>`}_bgHtml(C){if(!C.artwork)return C.hasMedia?`<div class="bg"><div class="mark">${n(C.icon)}</div><div class="veil"></div></div>`:"";let H=t(C.artwork);return C.logo?`
        <div class="bg logo">
          <img class="shot" src="${H}" alt="" data-action="more-info">
        </div>`:`
      <div class="bg">
        <img class="blur" src="${H}" alt="" aria-hidden="true">
        <img class="shot" src="${H}" alt="" data-action="more-info">
        <div class="veil"></div>
      </div>`}_progHtml(C,H){if(!C.progress)return"";let{elapsed:V,duration:L,remaining:M,percent:e}=C.progress;return`
      <div class="prog">
        <div class="bar${C.can.seek?" seek":""}"${C.can.seek?` data-action="seek" role="slider" tabindex="0" aria-valuemin="0" aria-valuemax="${Math.round(L)}" aria-valuenow="${Math.round(V)}"`:""}><i style="width:${e.toFixed(2)}%"></i></div>
        <div class="times">
          <span data-role="elapsed">${t(s(H("ui.of"),{elapsed:S(V),duration:S(L)}))}</span>
          <span data-role="left">${t(s(H("ui.left"),{time:S(M)}))}</span>
        </div>
      </div>`}_controlsHtml(C,H){let V=(e,i,o,{on:a=!0,main:d=!1,cls:A=""}={})=>`<button class="ctl${d?" main":""}${A?` ${A}`:""}" data-action="${e}"
        title="${t(o)}" aria-label="${t(o)}" ${a?"":"disabled"}>
        ${n(i)}
      </button>`,L=[];if(C.can.power&&L.push(V("power","power",H("ui.power"))),C.can.prev&&L.push(V("prev","skip_prev",H("ui.prev"))),C.can.pause||C.can.play){let e=C.playing||C.buffering;L.push(V("playpause",e?"pause":"play",H(e?"ui.pause":"ui.play"),{main:!0,on:e?C.can.pause:C.can.play}))}return C.can.next&&L.push(V("next","skip_next",H("ui.next"))),C.can.stop&&C.live&&L.push(V("stop","stop",H("ui.stop"))),L.length?`<div class="controls">${L.join("")}</div>`:""}_volHtml(C,H){let V=C.sound;if(!V||!V.can.set&&!V.can.mute)return"";let L=V.level===null?null:Math.round(V.level*100),M=V.can.mute?`<button class="mute${V.muted?" on":""}" data-action="mute"
          title="${t(V.muted?H("ui.unmute"):H("ui.mute"))}"
          aria-label="${t(V.muted?H("ui.unmute"):H("ui.mute"))}">
          ${n(V.muted?"volume_off":"volume")}
        </button>`:n("volume"),e=V.can.set&&L!==null?`<input type="range" min="0" max="100" step="1" value="${L}"
             data-action="volume" aria-label="${t(H("ui.volume"))}">
           <span class="val">${V.muted?t(H("ui.muted")):`${L}%`}</span>`:`<span class="only">${t(V.muted?H("ui.muted"):H("ui.mute"))}</span>`,i=!V.can.set&&V.can.step?`<button class="ctl small" data-action="vol-down" title="-" aria-label="-">${n("chevron")}</button>
           <button class="ctl small" data-action="vol-up" title="+" aria-label="+">${n("chevron_up")}</button>`:"",o=V.other?`<span class="whose">${t(V.name)}</span>`:"";return`<div class="vol">${M}${e}${i}${o}</div>`}_sourcesHtml(C,H){let V=[];return C.sources&&V.push(this._pickerHtml("source",n("apps"),H("ui.source"),C.sources)),C.sound?.modes&&V.push(this._pickerHtml("sound-mode",n("volume"),H("ui.sound_mode"),C.sound.modes)),C.pad&&V.push(`<button class="ctl pad-toggle${this._padOpen?" on":""}" data-action="pad"
           title="${t(H("ui.remote"))}" aria-label="${t(H("ui.remote"))}"
           aria-pressed="${this._padOpen?"true":"false"}">${n("remote")}</button>`),V.length?`<div class="picks">${V.join("")}</div>`:""}_pickerHtml(C,H,V,L){let M=L.options.map(i=>`<option value="${t(i)}" ${i===L.current?"selected":""}>${t(i)}</option>`).join(""),e=L.current&&!L.options.includes(L.current)?`<option value="" selected disabled>${t(L.current)}</option>`:"";return`<label class="pick" title="${t(V)}">${H}
      <select data-action="${C}" aria-label="${t(V)}">${e}${M}</select>
    </label>`}_macrosHtml(C,H){if(!C.macros?.length)return"";let V=this._macroBusy;return`<div class="macros">${C.macros.map(M=>{let e=["chip","macro"];return M.active===!0&&e.push("shown"),M.active===!1&&e.push("dead"),V===M.index&&e.push("busy"),`<button class="${e.join(" ")}" data-action="macro" data-macro="${M.index}"
            ${V!=null?"disabled":""}
            title="${t(M.name)}">
            ${n(M.icon)}<span class="label">${t(M.name)}</span>
            ${V===M.index?`<span class="what">${t(H("ui.sending"))}</span>`:""}
          </button>`}).join("")}</div>`}_padHtml(C,H){if(!C.pad)return"";let V=C.pad.keys,L=i=>V[i]?`<button class="padkey${i==="select"?" mid":""}" data-action="key" data-key="${t(i)}"
             title="${t(H(`key.${i}`,i))}" aria-label="${t(H(`key.${i}`,i))}">
             ${n(V1[i])}</button>`:"<span></span>",M=C1.map(i=>i.map(o=>o?L(o):"<span></span>").join("")).join(""),e=H1.filter(i=>V[i]).map(L).join("");return`<div class="pad"><div class="dpad">${M}</div><div class="extras">${e}</div></div>`}_playersHtml(C,H){return C.players.length<2&&!C.players.some(L=>L.missing)?"":`<div class="players">${C.players.map(L=>{let M=C.active?.entityId===L.entityId,e=L.rank>=4,i=["chip"];e&&i.push("live"),M&&i.push("shown"),L.missing?i.push("gone"):e||i.push("dead");let o=L.missing?H("ui.missing_player"):H(`state.${L.state}`,L.state);return`<button class="${i.join(" ")}" data-action="pin"
            data-entity="${t(L.entityId)}" title="${t(L.name)}">
            <span class="dot"></span>
            <span class="label">${t(L.name)}</span>
            <span class="what">\xB7 ${t(o)}</span>
          </button>`}).join("")}</div>`}_quietHtml(C,H){let V=C.players.length>1;return`
      <div class="quiet">
        ${n("cast")}
        <div class="lines">
          <div class="big">${t(C.name||H("ui.nothing"))}</div>
          <div class="small">${t(H(V?"ui.nothing_sub":"ui.nothing_sub_one"))}</div>
        </div>
      </div>`}_tick(){let C=this._model;if(!C?.ok||C.idle||!C.playing||!this._config?.show_progress||!C.progress)return;let H=T(this._hass,this._config,this._t,this._pinned);if(!H.ok||!H.progress)return;this._model=H;let V=this._sections.foot.querySelector(".bar > i"),L=this._sections.foot.querySelector('[data-role="elapsed"]'),M=this._sections.foot.querySelector('[data-role="left"]');V&&(V.style.width=`${H.progress.percent.toFixed(2)}%`),L&&(L.textContent=s(this._t("ui.of"),{elapsed:S(H.progress.elapsed),duration:S(H.progress.duration)})),M&&(M.textContent=s(this._t("ui.left"),{time:S(H.progress.remaining)})),this._signatures.foot=null}_onChange(C){let H=C.target.closest("select[data-action]");if(!H||!H.value)return;let{action:V}=H.dataset;this._haptic("light"),V==="source"&&this._call("select_source",{source:H.value}),V==="sound-mode"&&this._callOn(this._model?.sound?.entityId,"select_sound_mode",{sound_mode:H.value})}_onInput(C){let H=C.target.closest('[data-action="volume"]');if(!H)return;let V=Number(H.value),L=H.parentElement.querySelector(".val");L&&(L.textContent=`${V}%`),clearTimeout(this._volTimer),this._volTimer=setTimeout(()=>{this._haptic("light"),this._callOn(this._model?.sound?.entityId,"volume_set",{volume_level:V/100})},200)}_onClick(C){let H=C.target.closest("[data-action]");if(!H||H.hasAttribute("disabled"))return;let{action:V,entity:L,key:M}=H.dataset,e=this._model;if(e?.ok)switch(V){case"more-info":this._moreInfo(L||e.active?.entityId);break;case"pin":{this._pinned=this._pinned===L?null:L,this._haptic("light"),this._render();break}case"power":{let i=!e.live;(i?!e.can.turnOn:!e.can.turnOff)?this._call("toggle",{}):this._call(i?"turn_on":"turn_off",{}),this._haptic(i?"light":"medium");break}case"playpause":this._haptic("light"),this._call("media_play_pause",{});break;case"prev":this._haptic("light"),this._call("media_previous_track",{});break;case"next":this._haptic("light"),this._call("media_next_track",{});break;case"stop":this._haptic("medium"),this._call("media_stop",{});break;case"seek":{let i=H.getBoundingClientRect(),o=e.progress?.duration;if(!o||!i.width)break;let a=Math.min(1,Math.max(0,(C.clientX-i.left)/i.width));this._haptic("light"),this._call("media_seek",{seek_position:Math.round(a*o)});break}case"pad":this._padOpen=!this._padOpen,this._haptic("light"),this._render();break;case"key":if(!e.pad?.keys?.[M])break;this._haptic("light"),this._hass.callService("remote","send_command",{entity_id:e.pad.entityId,command:e.pad.keys[M]});break;case"macro":this._runMacro(e,Number(H.dataset.macro));break;case"vol-up":case"vol-down":this._haptic("light"),this._callOn(e.sound?.entityId,V==="vol-up"?"volume_up":"volume_down",{});break;case"mute":this._haptic("light"),this._callOn(e.sound?.entityId,"volume_mute",{is_volume_muted:!e.sound?.muted});break;default:break}}async _runMacro(C,H){if(this._macroBusy!==null&&this._macroBusy!==void 0)return;let V=C.macros?.find(L=>L.index===H);if(V){this._macroBusy=H,this._render(),this._haptic("medium");try{if(await this._hass.callService("remote","send_command",{entity_id:V.entityId,command:V.keys}),V.sets?.entity){let L=V.sets.entity.split(".")[0],M=String(V.sets.state??"on")==="on";L==="input_boolean"||L==="switch"?await this._hass.callService(L,M?"turn_on":"turn_off",{entity_id:V.sets.entity}):(L==="input_text"||L==="input_select")&&await this._hass.callService(L,L==="input_text"?"set_value":"select_option",L==="input_text"?{entity_id:V.sets.entity,value:String(V.sets.state)}:{entity_id:V.sets.entity,option:String(V.sets.state)})}}finally{this._macroBusy=null,this._render()}}}_call(C,H){return this._callOn(this._model?.active?.entityId,C,H)}_callOn(C,H,V){return C?this._hass.callService("media_player",H,{entity_id:C,...V}):Promise.resolve()}_moreInfo(C){C&&this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:C},bubbles:!0,composed:!0}))}_haptic(C){this.dispatchEvent(new CustomEvent("haptic",{detail:C,bubbles:!0,composed:!0}))}};function T5(){customElements.get(l)||(customElements.define(l,Q),window.customCards=window.customCards||[],window.customCards.push({type:l,name:"Media Room Card",description:"One card for a screen with several players: it shows whichever of them is actually playing, with artwork, progress, transport controls and volume.",preview:!0,documentationURL:"https://github.com/gabor-io/ha-appliance-custom-card"}),console.info(`%c ${l} %c ${K} `,"color:#fff;background:#00897b;font-weight:700;border-radius:3px 0 0 3px","color:#00897b;background:#e0f2f1;font-weight:700;border-radius:0 3px 3px 0"))}var j5=`
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
.hint { font-size: .78rem; color: var(--secondary-text-color, #70757a); }
.chosen { display: grid; gap: 6px; }
.row {
  display: flex; align-items: center; gap: 8px; padding: 7px 10px;
  border: 1px solid var(--divider-color, rgba(127,127,127,.35)); border-radius: 10px;
  color: var(--primary-text-color, #212121); font-size: .85rem;
}
.row .grow { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.row .id { font-size: .72rem; color: var(--secondary-text-color, #70757a); }
.row button {
  font: inherit; cursor: pointer; border: none; background: none; padding: 2px 6px;
  color: var(--secondary-text-color, #70757a); border-radius: 6px;
}
.row button:hover { background: var(--divider-color, rgba(127,127,127,.2)); }
.row button[disabled] { opacity: .3; cursor: default; }
.toggles { display: grid; grid-template-columns: repeat(auto-fit, minmax(170px, 1fr)); gap: 8px; }
.toggle { display: flex; align-items: center; gap: 8px; font-size: .85rem;
  color: var(--primary-text-color, #212121); cursor: pointer; }
`,Y5=["show_artwork","show_progress","show_volume","show_sources","show_remote","show_macros","show_players","compact"],z=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}setConfig(C){this._config={...C},this._render()}set hass(C){let H=!this._hass;if(this._hass=C,H){this._render();return}this.shadowRoot.activeElement||this._playerSignature()!==this._players&&this._render()}_playerSignature(){return this._hass?c(this._hass).map(C=>`${C.id}:${C.name}`).join("|"):""}_chosen(){return w(this._config).map(C=>C.entityId)}_render(){if(!this._config||!this._hass)return;this._players=this._playerSignature();let C=f(g(this._config,this._hass)),H=c(this._hass),V=new Map(H.map(A=>[A.id,A.name])),L=this._chosen(),M=L.map((A,p)=>`
        <div class="row">
          <span class="grow">${t(V.get(A)||A)}
            <span class="id">${t(A)}</span></span>
          <button data-move="${p}" data-dir="-1" ${p===0?"disabled":""}
            title="fel" aria-label="fel">&#9650;</button>
          <button data-move="${p}" data-dir="1" ${p===L.length-1?"disabled":""}
            title="le" aria-label="le">&#9660;</button>
          <button data-remove="${p}" title="t\xF6rl\xE9s" aria-label="t\xF6rl\xE9s">&#10005;</button>
        </div>`).join(""),i=['<option value="" selected>+</option>',...H.filter(A=>!L.includes(A.id)).map(A=>`<option value="${t(A.id)}">${t(A.name)} (${t(A.id)})</option>`)].join(""),o=[`<option value="">${t(C("editor.volume_entity_auto"))}</option>`,...H.map(A=>`<option value="${t(A.id)}" ${A.id===this._config.volume_entity?"selected":""}>${t(A.name)}</option>`)].join(""),a=[`<option value="auto">${t(C("editor.language_auto"))}</option>`,...P.map(A=>`<option value="${A}" ${this._config.language===A?"selected":""}>${A.toUpperCase()}</option>`)].join(""),d=Y5.map(A=>{let p=this._config[A]??U[A]??!1;return`<label class="toggle"><input type="checkbox" data-key="${A}" ${p?"checked":""}>
        <span>${t(C(`editor.${A}`))}</span></label>`}).join("");this.shadowRoot.innerHTML=`
      <style>${j5}</style>
      <div class="form">
        <div class="title">${t(C("editor.entities"))}</div>
        <div class="hint">${t(C("editor.entities_hint"))}</div>
        <div class="chosen">${M}</div>
        <label><select data-add>${i}</select></label>
        <label>${t(C("editor.volume_entity"))}
          <select data-key="volume_entity">${o}</select>
        </label>
        <div class="hint">${t(C("editor.volume_entity_hint"))}</div>
        <label>${t(C("editor.name"))}
          <input type="text" data-key="name" value="${t(this._config.name||"")}">
        </label>
        <label>${t(C("editor.language"))}
          <select data-key="language">${a}</select>
        </label>
        <div class="title">${t(C("editor.sections"))}</div>
        <div class="toggles">${d}</div>
      </div>`,this.shadowRoot.querySelectorAll("[data-key]").forEach(A=>A.addEventListener("change",p=>this._onChange(p))),this.shadowRoot.querySelector("[data-add]")?.addEventListener("change",A=>this._onAdd(A)),this.shadowRoot.querySelectorAll("[data-move], [data-remove]").forEach(A=>A.addEventListener("click",p=>this._onOrder(p)))}_emit(C){this._config=C,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:C},bubbles:!0,composed:!0})),this._render()}_base(){return{...this._config,type:this._config.type||`custom:${l}`}}_onAdd(C){let H=C.target.value;H&&this._emit({...this._base(),entity:void 0,entities:[...this._chosen(),H]})}_onOrder(C){let H=C.currentTarget,V=this._chosen();if(H.dataset.remove!==void 0)V.splice(Number(H.dataset.remove),1);else{let L=Number(H.dataset.move),M=L+Number(H.dataset.dir);if(M<0||M>=V.length)return;[V[L],V[M]]=[V[M],V[L]]}this._emit({...this._base(),entity:void 0,entities:V})}_onChange(C){let H=C.target,V=H.dataset.key,L=this._base();H.type==="checkbox"?L[V]=H.checked:H.value===""?delete L[V]:L[V]=H.value,this._emit(L)}};function F5(){customElements.get(u)||customElements.define(u,z)}F5();T5();
