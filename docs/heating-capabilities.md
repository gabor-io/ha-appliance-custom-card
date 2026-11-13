# Fűtési kártyák – entitás-szerződés

Három kártya egy családban:

| Kártya | Mit mutat |
| --- | --- |
| `custom:house-heating-card` | gázkeret, ütem, előrejelzés, aktív fűtési forrás, üzemmód és évszak, gázóra |
| `custom:heating-rooms-card` | szobánkénti hőmérséklet, cél, felülírás, forrás, ablak, boost |
| `custom:heating-schedule-card` | heti zóna-ütemterv idővonallal és zónahőmérséklet-táblázattal |

Mindhárom egy `dist/heating-cards.js` fájlban van.

## Alapelv: a kártya nem nyúl a készülékekhez

A fűtési logika Home Assistantban fut, és **ő** vezérli a tényleges
készülékeket: a Daikin klímákat, a Netatmo szelepeket, az infrapanelt. A
kártyák ezekhez nem nyúlnak.

Amit a kártya ír, az kétféle lehet:

1. **Helper entitások** (`input_select`, `input_number`, `input_boolean`,
   `input_text`) és scriptek.
2. **A szoba saját termosztátja**: egy `climate.*` **template** entitás,
   amit a fűtési logika pont ebből a célból tesz közzé. Ez nem a hardver,
   hanem a logika felülete – a szobakártya fő vezérlője ez.

A kártya nem számol célhőmérsékletet és nem dönt forrásról. Amit mutat, azt
Home Assistant már eldöntötte.

## Ház szintű entitások

Mind felülírható a kártya `entities:` blokkjából; itt az alapértelmezés áll.

| Szerep | Alapértelmezett entitás | Mértékegység |
| --- | --- | --- |
| óraállás | `sensor.gazora_allas` | m³ |
| kézi leolvasás | `input_number.gazora_kezi_allas` | m³ |
| kézi leolvasás ideje | `input_datetime.gazora_kezi_idopont` | – |
| elavult adat | `binary_sensor.gazadat_elavult` | on/off |
| keret | `sensor.gazkeret_m3` | m³ |
| felhasznált | `sensor.gazkeret_felhasznalt` | m³ |
| maradék | `sensor.gazkeret_maradek` | m³ |
| eddig elhasználható | `sensor.gazkeret_megengedett_eddig` | m³ |
| tartalék | `input_number.gazkeret_tartalek` | m³ |
| hátralévő nap | `sensor.gazkeret_hatralevo_nap` | nap |
| napi ütem | `sensor.gaz_napi_utem` | m³/nap |
| fűtésre engedett napi | `sensor.gaz_futesi_keret_napi` | m³/nap |
| melegvíz napi | `input_number.gaz_melegviz_napi` | m³/nap |
| előrejelzés csak gázzal | `sensor.gaz_elorejelzes_csak_gaz` | m³ |
| előrejelzés egyenleg | `sensor.gaz_elorejelzes_egyenleg` | m³ (negatív = túllépne) |
| üzemmód | `input_select.futes_mod` | `auto` \| `csak_gaz` \| `csak_klima` \| `tavol` \| `ki` |
| évszak (kézi) | `input_select.klima_evszak` | `auto` \| `futes` \| `hutes` |
| évszak (tényleges) | `sensor.klima_evszak_aktiv` | `futes` \| `hutes` \| `atmeneti` |
| forrás | `sensor.futes_forras` | `gaz` \| `hibrid` \| `klima` \| `hutes` \| `fagyvedelem` \| `ki` |
| indoklás | `sensor.futes_forras_indoklas` | magyar mondat |
| fűtésautomatika | `input_boolean.futes_automatika` | on/off, **kapcsolható a kártyáról** |
| kazán üzemkész | `input_boolean.kazan_uzemkesz` | on/off, **kapcsolható a kártyáról** |
| szellőztető gázretesz | `input_boolean.szellozteto_gaz_retesz` | on/off, **kapcsolható a kártyáról** |
| heti ütemterv | `schedule.futes_komfort` | on = komfort sáv, off = éjszaka |
| kinti hőmérséklet | nincs alapértelmezés (`entities.outside`) | °C |
| 3 napos kinti átlag | nincs alapértelmezés (`entities.outdoor_3day`) | °C |
| klíma COP | nincs alapértelmezés (`entities.cop`) | szám |
| klímás hő ára | nincs alapértelmezés (`entities.heat_cost`) | pl. Ft/kWh |
| klíma nem hatékony | nincs alapértelmezés (`entities.inefficient`) | on/off |

`auto` évszakban a hűtést a 3 napos kinti átlag dönti el, ezért a kártya az
évszakváltó alatt ki is írja, ha meg van adva.

**A napi ütem hiányozhat.** Amíg nincs elég leolvasás az ablakban, a
`sensor.gaz_napi_utem` `unavailable`, ami nem ugyanaz, mint a nulla: a kártya
ilyenkor „még nincs elég leolvasás" feliratot ír a szám helyére.

A három klíma-entitás egy háztartás saját számítása (COP a kinti
hőmérsékletből, abból a hő ára), ezért nincs rájuk alapértelmezett
azonosító. Ha meg vannak adva, az aktív forrás alatt megjelenik egy sor
(„Klíma COP 3,2 · 21,9 Ft/kWh"), és ha a „nem hatékony" jelző bekapcsol, a
kártya figyelmeztet, hogy érdemes gázra váltani.

### Ami a kártyában számolódik

- **A sáv színe.** Zöld, amíg a felhasznált nem több, mint az eddig
  elhasználható; sárga fölötte; piros, ha a tartalékba nyúlna.
- **„Ezzel az ütemmel a keret ~X napig tart"**: (maradék − tartalék) / napi
  ütem, egész napra lefelé.
- **MJ.** A kártya a m³ értéket szorozza az égéshővel (alap: 34,92 MJ/m³).
  **A keretet érdemes MJ-ban megadni** a `budget_mj:` kulccsal, mert a
  számlán az a hiteles szám: 63 645 MJ ÷ 34,92 = **1822,44 m³**. Ha a m³-es
  keretet felfelé kerekítve adod meg (1822,5), az egy olyan korlátnál, amit
  nem szabad túllépni, rossz irányba téved.

## Szobák

A szobalista a kártya configjában van, mert a szobák nevei a háztartásé – a
repóban nincs és nem is lesz saját szobalista. A kulcsból és az előtagból
(`prefix`, alapból `futes`) áll össze minden entitás:

| Szerep | Entitás |
| --- | --- |
| termosztát | `climate.*` – **a configból**, mert nincs rá névszabály |
| mért hőmérséklet | `sensor.<prefix>_<szoba>_homerseklet`, ha van (zónánál ez a számolt érték); egyébként a termosztát `current_temperature`-je |
| cél | a termosztát `temperature` attribútuma; mögötte `input_number.<prefix>_<szoba>_cel` |
| üzemmód | a termosztát `hvac_modes` / állapota; mögötte `input_select.<prefix>_<szoba>_uzemmod` |
| mi fut | `sensor.<prefix>_<szoba>_aktiv` (`radiator`/`klima_futes`/`klima_hutes`/`aeno`/`nincs`) |
| ablak | `sensor.<prefix>_<szoba>_ablak` (`zarva`/`buko`/`nyitva`) |
| szünetel | `binary_sensor.<prefix>_<szoba>_szunetel` |
| elő-fűtés/-hűtés | `sensor.<prefix>_elofutes_<szoba>` (timestamp) |
| hőtrend | `sensor.<prefix>_trend_<szoba>` (°C/óra) |
| tanulás folyik | `input_text.<prefix>_tanulas_<szoba>` (`unixidő\|kezdő°C\|forrás\|cél\|fel/le`) |
| tanult sebesség | `input_number.<prefix>_tanult_<szoba>_<klima\|gaz\|hutes\|aeno>` (°C/óra) |
| szelep-eltolás | `input_number.<prefix>_szelep_eltolas_<szoba>` (°C) |
| sebesség most | `sensor.<prefix>_sebesseg_<szoba>` (°C/óra) |
| hőveszteség | `input_number.<prefix>_hoveszteseg_<szoba>` (°C/óra/K) |
| klíma COP | nincs alapértelmezés (`rooms[].entities.cop`) |
| klímás hő ára | nincs alapértelmezés (`rooms[].entities.heat_cost`) |
| klíma nem hatékony | nincs alapértelmezés (`rooms[].entities.inefficient`) |

Egy házban több gép lehet, és ugyanabban az időjárásban **nem egyforma a
COP-juk** – hogy melyik a jobb, az a típustól függ, nem a méretétől. Ezért
a három klíma-szerep szobánként is megadható, és több szoba nyugodtan
mutathat ugyanarra a szenzorra. Ahol nincs megadva, ott nem jelenik meg
semmi (a fürdőben nincs klíma, ott nincs is mit írni).
| páratartalom | nincs névszabály – `rooms[].humidity`, részpontnál `parts[].humidity` |
| hőérzet | `sensor.hoerzet_<kulcs>` (°C) |
| komfortszó | `sensor.komfort_<kulcs>` (Hideg / Hűvös / Kellemes / Meleg / Túl meleg, utána `· száraz` vagy `· párás`) |
| fagyveszély | `binary_sensor.<prefix>_<szoba>_fagyveszely` |
| klíma nem bírja | `binary_sensor.<prefix>_<szoba>_elmarad` |
| forrásjavaslat | `sensor.<prefix>_<szoba>_forras_javaslat` (`gaz`/`klima`/`hutes`/`aeno`/`szunetel`/`ki`) |
| javaslat indoklása | `sensor.<prefix>_<szoba>_forras_indoklas` |

A komfortszenzorok kulcsa nem feltétlenül a szobakulcs (egy zóna pontjainak
saját kulcsuk van), ezért `comfort_key`-jel felülírható, szobára és
részpontra is.

Az előfűtés-szenzornak nem kell `irany` attribútum: ha nincs, a kártya a
`sensor.klima_evszak_aktiv`-ból dönt (hűtés → előhűtés). Az `unknown` állapot
sem hiba – a komfort sávon belül nincs mit számolni.

Tanult sebességből csak az jelenik meg, amihez van entitás. A fürdőnek nincs
hőszivattyúja, ezért ott csak a gáz és az infrapanel (`aeno`) látszik – a
hiányzó entitás nem nulla, hanem „nem értelmezett".

**A +/− a termosztátot írja** (`climate.set_temperature`), az üzemmód-gombok
pedig a `climate.set_hvac_mode`-ot. A beállított cél a következő ütemezett
váltásig él – ezt a logika intézi, a kártya nem ír időpontot. Ha egy szobához
nincs termosztát megadva, a kártya visszaesik a régi
`input_number.<prefix>_<szoba>_felulir` helperre.

A szoba forrása eltérhet a házétól, és ez nem hiba: egy klíma nélküli fürdő
gázzal megy, miközben a ház a klímán, egy nyitott ablakú szoba pedig szünetel,
bármit csinál a ház.

Többhőmérős zóna (`parts:`) esetén még:

| Szerep | Entitás |
| --- | --- |
| részérték | `sensor.<prefix>_<szoba>_<resz>`, vagy a `parts[].entity` szerinti bármilyen szenzor |
| rész kihagyva | `binary_sensor.<prefix>_<szoba>_<resz>_kizarva` |
| mérvadó pont | `sensor.<prefix>_<szoba>_mertado` |
| aggregálás | `input_select.<prefix>_<szoba>_aggregalas` (`auto`/`atlag`) |
| túllövés-korlát | `binary_sensor.<prefix>_<szoba>_tulloves_korlat` |

Az ablak kora a `sensor.*_ablak` entitás `last_changed` idejéből jön, nem
attribútumból: a HA ezt magától vezeti, és így nem lehet elcsúszni tőle.

## A kézi óraállás

A beviteli mező **szöveges**, nem szám típusú, és vesszőt is elfogad. Magyar
billentyűzeten a tizedes gomb vesszőt ad; egy `type="number"` mező ettől
érvénytelenné válik, és üres sztringként olvasható vissza – a leolvasás így
csendben sehova nem jutott. A kártya most maga értelmezi, amit beírtak:
levágja a szóközöket, a vesszőt pontra cseréli, és ha az eredmény nem szám,
**kiírja a hibát** ahelyett, hogy nem csinálna semmit.

## Tanult sebesség és a ΔT

Egy „°C/óra" önmagában nem mond semmit: a szoba gyorsabban melegszik, ha
kint enyhe van. A fűtési logika ezért minden tanult sebességet egy
**referencia-különbségre** vetít – fűtésnél 15 K, hűtésnél 8 K –, és a
kártya ezt ki is írja: „Tanult sebesség (15 K-on): …".

Mellé két sor kerül, ha a hozzájuk tartozó entitás létezik:

- **„Most, ΔT 18 K mellett: 1,20 °C/óra (Klíma)"** – a
  `sensor.<prefix>_sebesseg_<szoba>` értéke, vagyis ugyanaz a sebesség a
  mostani időjárásra számolva. A képletet a kártya **nem** számolja, azt a
  HA adja; a ΔT-t viszont igen, a szoba hőmérsékletéből és a kinti
  értékből (fűtésnél bent − kint, hűtésnél kint − bent). A forrás nevét a
  szenzor `forras` attribútumából veszi, ha van, különben abból, ami épp
  fut.
- **„Hőveszteség 0,015 °C/óra/K"** – a `input_number.<prefix>_hoveszteseg_<szoba>`
  értéke, halványan.

**A ΔT-hez a szobakártyának is kell a kinti hőmérséklet.** Ez ház szintű
adat, ezért a szobakártya configjába is bele kell írni:

```yaml
type: custom:heating-rooms-card
entities:
  outside: sensor.kinti_homerseklet
```

Enélkül a sor megjelenik, csak a ΔT marad le róla.

## 24 órás görbe

A szobakártya kirajzolja az elmúlt napot: a vonal a mért hőmérséklet, a
szaggatott lépcső a cél. A kettő közti rés maga a hőingadozás.

Az előzmény nincs az állapotgépben, ezért a kártya websocketen kéri le
(`history/history_during_period`), negyedóránként egyszer. Amit kirajzol, ebben a
sorrendben, az **elsőt, ami tényleg létezik**: `rooms[].history`; a mért
hőmérséklet szenzora; végül maga a termosztát – olyankor a kártya az
attribútumokat is elkéri, mert ott a mért érték a `current_temperature`.
A „tényleg létezik" lényeges: a névszabályból képzett azonosító akkor is
létrejön, ha olyan entitás nincs, és a kártya korábban ezért kérdezett rá
egy nem létező szenzorra ahelyett, hogy a termosztátra esett volna vissza.

A két lekérdezés külön megy: a sima szenzorok attribútumok nélkül (sokkal
olcsóbb), a termosztátok attribútumostul. A célt a `input_number.<prefix>_<szoba>_cel`
előzményéből veszi.

Recorder nélkül, vagy ha a felhasználónak nincs joga az előzményhez, a
kártya egyszerűen nem rajzol görbét.

Alapértelmezésben csak az **egy szobára szűkített** kártyán jelenik meg (öt
szoba öt görbéje feleslegesen terheli a recordert); a `show_history`
kapcsolóval mindkét irányba felülbírálható.

## Hőtrend és előrejelzés

A szabályozás nem a mért értékre lép, hanem egy fél órás előrejelzésre:

```
előrejelzés = mért + trend × 0,5 óra        (a trend ±1,5 °C/órára vágva)
fűtés indul, ha  előrejelzés < cél − 0,05   (infrapanelnél − 0,1)
fűtés leáll, ha  előrejelzés > cél + 0,15   (infrapanelnél + 0,1,
                                             vagy ha a mért ≥ cél + 0,3)
```

A kártya ugyanezt számolja ki, és a szoba sorában kiírja: egy nyíl, a
„30 perc múlva ≈ x,x °C", és ha a küszöböt átlépi, az is, hogy emiatt indul
vagy leáll a fűtés. **Ettől lesz érthető az a szoba, ami a célja alatt van,
mégsem fűt**: már elég gyorsan melegszik magától.

Melyik küszöbpárt használja, abból derül ki, hogy a szobának van-e
`..._tanult_<szoba>_aeno` helpere – az infrapanel gyorsabban reagál, ezért
szűkebb sávot kap, ahogy a logika is.

A trendszenzor neve a funkciót teszi a szoba elé (`sensor.futes_trend_<szoba>`),
mint az előfűtésnél. Amíg egy szobánál még más a neve, `rooms[].entities.trend`
alatt megadható.

## Melyik kártya mit csinál

A három elem közül kettő ugyanaz a kártya, más beállítással:

- **Központi kártya**: `house-heating-card` – felül a gázkeret-sáv, az
  üzemmód- és évszakváltó, alattuk az öt szoba egy-egy sorban (aktuális/cél,
  +/−, a forrás és az ablak ikonja). A sorra koppintva nyílik a szoba teljes
  nézete az indoklással és a vezérlőkkel. A `show_rooms: false` kikapcsolja a
  listát, ha csak a gázkeret kell.
- **Szobakártya**: `heating-rooms-card` a `room:` (vagy `szoba:`) kulccsal –
  egyetlen szoba teljes nézete, a kártya színe is a szoba saját forrását
  követi.
- **Szobalista**: ugyanaz a kártya `room:` nélkül – minden szoba teljes
  nézetben, egymás alatt.

Így a szoba sora és a szobakártya ugyanazt a kódot használja, tehát nem tudnak
elcsúszni egymástól.

## Ütemterv

A heti ütemtervet a **Home Assistant beépített `schedule` helpere** tárolja
(`schedule.futes_komfort`). A sávon belül komfort, a sávon kívül éjszaka –
egyelőre ez a két zóna van, az eco és a távol később jön.

A HA core 2026.10 forrásából ellenőrizve:

- Az entitás állapota `on`/`off`, és egyetlen érdemi attribútuma a
  `next_event`. **A heti blokkok nincsenek az állapotgépben.**
- A blokkok a helper tárolt gyűjteményében vannak, websocketen érhetők el:
  `schedule/list` olvas, `schedule/update` ír. A kártya ugyanezt a kettőt
  használja, mint a helper saját szerkesztője.
- Egy nap `{from, to}` tartományok listája (`monday` … `sunday`), rendezve,
  átfedés nélkül, `from` < `to`; a `24:00:00` megengedett záróidő.
- Az `update` a **teljes** elemet lecseréli, ezért a kártya mindig az egész
  hetet küldi, és mentés előtt rendezi és kiszűri az átfedő sávokat.
- A `create` / `update` / `delete` parancsok **admin jogot** kérnek: nem
  admin felhasználónál a kártya kirajzolja az ütemtervet, de a mentés
  elutasításra kerül.

### Több ütemterv egyszerre

Egy szoba saját heti tervet követhet: a fürdő zuhany előtt felmelegszik és
jóval a ház előtt vissza is hűl. Ezt a `rooms[].schedule_entity` (és ha a
felismerés bizonytalan, a `rooms[].schedule_id`) adja meg, ami felülírja a
kártyaszintű `schedule_entity`-t.

Ilyenkor az ütemterv-kártya tetején megjelenik egy **tervválasztó**: a
legtöbb szobát vivő terv az első, és minden terv a saját szobáit mutatja a
zónatáblázatban. A szobasorokban pedig ott a saját sávjuk („Komfort
21:30-ig"), a saját helperük `next_event`-je szerint – így látszik, miért
tér el az a szoba a többitől. Egy `schedule/list` hívás minden tervet
lehoz, tehát a második terv nem kerül külön körbe.

A tárolt elem azonosítója (`schedule_id`) az entitás unique_id-ja, ami nincs
benne az állapotgépben. A kártya ezért az entitásregiszterből olvassa ki;
ha az nem elérhető, egyetlen elem esetén azt használja, egyébként név
szerint próbál párosítani. Ha ez bizonytalan, add meg kézzel:
`schedule_id: futes_komfort`.

A zónák hőmérsékletei külön helperekben vannak, évszakonként:

```
input_number.futes_zona_<zona>_<szoba>
input_number.hutes_zona_<zona>_<szoba>
```

Amelyik szobának nincs adott évszakra készlete – a fürdőnek nincs hűtési –,
annál a táblázat gondolatjelet mutat, nem üres beviteli mezőt.

## Zóna-hőmérsékletek a szobakártyán

Egy szobaoldalon nem a ház egész táblázata kell, hanem annak az egy szobának
a komfort- és éjszakai hőfoka. A szobakártya ezért +/− gombokkal kiírja a
saját zónaértékeit az épp aktív évszakra. Ez is az egy szobára szűkített
kártyán alapértelmezés, és a `show_zones` kapcsolóval állítható.

## Hűtés

- A kártya fűtés/hűtés fülre vált, és az aktív évszak készletét szerkeszti.
  Amelyik szobának nincs hűtési készlete, ott a táblázat gondolatjelet mutat.
- Hűtésben a gázkeret és az ütem a kártyán marad, de halványítva: a keret
  olyankor is korlát, csak nem az a nap kérdése.
- Az előfűtés felirata „előhűtés" lesz.
- **Fűtési idényben a kézi `hutes` választás megerősítést kér.** A logika
  magától csak május 1. és szeptember 30. között hűt, tehát egy téli kézi
  hűtés nem lehet félrenyúlás következménye.

## Beállítások

| Kulcs | Alap | Jelentés |
| --- | --- | --- |
| `entities` | – | entitás-felülírások (a fenti táblák szerepnevei) |
| `rooms` | `[]` | szobalista: `{key, name, parts?, readonly?, entities?}` |
| `prefix` | `futes` | a szobaentitások előtagja |
| `zones` | az öt zóna | zónakulcsok sorrendben |
| `schedule_entity` | `schedule.futes_komfort` | a heti ütemterv helpere |
| `schedule_id` | automatikus | a tárolt elem azonosítója, ha a felismerés bizonytalan |
| `zone_on` / `zone_off` | `komfort` / `ejszaka` | a sávon belüli és kívüli zóna |
| `felt_prefix` / `comfort_prefix` | `sensor.hoerzet` / `sensor.komfort` | a komfortszenzorok előtagja |
| `heat_prefix` / `cool_prefix` | `input_number.futes_zona` / `input_number.hutes_zona` | zónahőmérséklet-helperek előtagja |
| `heating_value` | `34.92` | égéshő, MJ/m³ |
| `budget_mj` | – | a keret MJ-ban, ha a számlán ez a hiteles szám |
| `room` / `szoba` | – | egyetlen szobára szűkíti a szobakártyát |
| `rooms[].climate` | – | a szoba termosztátja (template `climate` entitás) |
| `rooms[].comfort_key` | a szobakulcs | melyik `hoerzet`/`komfort` szenzorhoz tartozik |
| `rooms[].schedule_entity` | a kártyaszintű | a szoba saját heti terve |
| `rooms[].schedule_id` | automatikus | a saját terv tárolt azonosítója |
| `rooms[].boost` | a kártyaszintű `show_boost` | van-e boost ebben a szobában |
| `rooms[].entities.trend` | `sensor.<prefix>_trend_<szoba>` | a hőtrend szenzora |
| `rooms[].entities.lagging` | `binary_sensor.<prefix>_<szoba>_elmarad` | „a klíma nem bírja" jelzés |
| `rooms[].humidity` | – | a szoba páraszenzora |
| `rooms[].entities.cop` / `heat_cost` / `inefficient` | – | a szobát fűtő klíma hatékonysága |
| `rooms[].history` | a mért hőmérséklet, majd a termosztát | amit a 24 órás görbe rajzol |
| `show_history` | egy szobánál igen | 24 órás görbe a szobakártyán |
| `show_zones` (szobakártya) | egy szobánál igen | a szoba saját zónaértékei |
| `show_switches` (házkártya) | `true` | kazán és gázretesz kapcsoló |
| `boost_script` | `script.futes_boost` | a boost gomb scriptje, `szoba` mezővel |
| `name`, `language`, `compact`, `animate` | – | mint a többi kártyán |
| `show_*` | `true` | szakaszok ki/be (szerkesztőből is) |

Példa:

```yaml
type: custom:heating-rooms-card
prefix: futes
rooms:
  - key: bathroom
    name: Fürdő
    climate: climate.furdo
    schedule_entity: schedule.furdo_komfort
    boost: false
  - key: living
    name: Étkező
    climate: climate.etkezo_zona
    parts:
      - { key: etkezo, name: Étkező, entity: sensor.dining_room_temperature_sensor_temperature, comfort_key: dining }
      - { key: konyha, name: Konyha, entity: sensor.kitchen_temperature_sensor_temperature, comfort_key: kitchen }
      - { key: eloszoba, name: Előszoba, entity: sensor.ante_room_temperature_sensor_temperature, comfort_key: eloszoba }
  - key: hall
    name: Előtér
    readonly: true
```

## Demó

`demo/heating.html` mock adatokkal fut, élő Home Assistant nélkül: évszakváltó
(fűtés / hűtés / átmeneti), bukóban lévő ablak, negatív gázkeret-előrejelzés és
a téli kézi hűtés megerősítő kérdése. A demó visszaírja a kártyák
szolgáltatáshívásait a mock állapotba, így a felülírás, a zónatáblázat és az
ütemterv szerkesztése is kipróbálható.
