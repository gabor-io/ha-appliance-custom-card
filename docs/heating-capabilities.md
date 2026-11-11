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
| fűtésautomatika | `input_boolean.futes_automatika` | on/off |
| kazán üzemkész | `input_boolean.kazan_uzemkesz` | on/off |
| szellőztető gázretesz | `input_boolean.szellozteto_gaz_retesz` | on/off |
| heti ütemterv | `schedule.futes_komfort` | on = komfort sáv, off = éjszaka |
| kinti hőmérséklet | nincs alapértelmezés (`entities.outside`) | °C |
| 3 napos kinti átlag | nincs alapértelmezés (`entities.outdoor_3day`) | °C |

`auto` évszakban a hűtést a 3 napos kinti átlag dönti el, ezért a kártya az
évszakváltó alatt ki is írja, ha meg van adva.

**A napi ütem hiányozhat.** Amíg nincs elég leolvasás az ablakban, a
`sensor.gaz_napi_utem` `unavailable`, ami nem ugyanaz, mint a nulla: a kártya
ilyenkor „még nincs elég leolvasás" feliratot ír a szám helyére.

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
| mért hőmérséklet | `sensor.<prefix>_<szoba>_homerseklet` (ha nincs, a termosztát `current_temperature`-je) |
| cél | a termosztát `temperature` attribútuma; mögötte `input_number.<prefix>_<szoba>_cel` |
| üzemmód | a termosztát `hvac_modes` / állapota; mögötte `input_select.<prefix>_<szoba>_uzemmod` |
| mi fut | `sensor.<prefix>_<szoba>_aktiv` (`radiator`/`klima_futes`/`klima_hutes`/`aeno`/`nincs`) |
| ablak | `sensor.<prefix>_<szoba>_ablak` (`zarva`/`buko`/`nyitva`) |
| szünetel | `binary_sensor.<prefix>_<szoba>_szunetel` |
| elő-fűtés/-hűtés | `sensor.<prefix>_elofutes_<szoba>` (timestamp, `irany` attribútum) |
| tanulás folyik | `input_text.<prefix>_tanulas_<szoba>` (`unixidő\|kezdő°C\|forrás\|cél\|fel/le`) |
| tanult sebesség | `input_number.<prefix>_tanult_<szoba>_<klima\|gaz\|hutes>` (°C/óra) |
| hőérzet | `sensor.hoerzet_<kulcs>` (°C) |
| komfortszó | `sensor.komfort_<kulcs>` (Hideg / Hűvös / Kellemes / Meleg / Túl meleg, utána `· száraz` vagy `· párás`) |
| fagyveszély | `binary_sensor.<prefix>_<szoba>_fagyveszely` |
| forrásjavaslat | `sensor.<prefix>_<szoba>_forras_javaslat` (`gaz`/`klima`/`hutes`/`aeno`/`szunetel`/`ki`) |
| javaslat indoklása | `sensor.<prefix>_<szoba>_forras_indoklas` |

A komfortszenzorok kulcsa nem feltétlenül a szobakulcs (egy zóna pontjainak
saját kulcsuk van), ezért `comfort_key`-jel felülírható, szobára és
részpontra is.

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
| `boost_script` | `script.futes_boost` | a boost gomb scriptje, `szoba` mezővel |
| `name`, `language`, `compact`, `animate` | – | mint a többi kártyán |
| `show_*` | `true` | szakaszok ki/be (szerkesztőből is) |

Példa:

```yaml
type: custom:heating-rooms-card
prefix: futes
rooms:
  - key: bath
    name: Fürdő
    climate: climate.furdo
  - key: living
    name: Étkező
    climate: climate.etkezo_zona
    parts:
      - { key: etkezo, name: Étkező, entity: sensor.dining_room_temperature, comfort_key: dining }
      - { key: konyha, name: Konyha, entity: sensor.kitchen_temperature, comfort_key: kitchen }
      - { key: eloszoba, name: Előszoba, entity: sensor.ante_room_temperature, comfort_key: eloszoba }
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
