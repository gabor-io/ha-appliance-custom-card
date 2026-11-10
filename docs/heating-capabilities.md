# Fűtési kártyák – entitás-szerződés

Három kártya egy családban:

| Kártya | Mit mutat |
| --- | --- |
| `custom:house-heating-card` | gázkeret, ütem, előrejelzés, aktív fűtési forrás, üzemmód és évszak, gázóra |
| `custom:heating-rooms-card` | szobánkénti hőmérséklet, cél, felülírás, forrás, ablak, boost |
| `custom:heating-schedule-card` | heti zóna-ütemterv idővonallal és zónahőmérséklet-táblázattal |

Mindhárom egy `dist/heating-cards.js` fájlban van.

## Alapelv: a kártya soha nem ír eszközt

A fűtési logika Home Assistantban fut, és **ő** vezérli a `climate.*`
entitásokat (Daikin klímák, Netatmo szelepek, infrapanel). A kártyák ezekhez
nem nyúlnak: minden gomb egy **helper entitást** ír (`input_select`,
`input_number`, `input_datetime`) vagy egy scriptet hív, és onnantól a logika
dolga, hogy mit kezd vele. Enélkül két gazdája lenne ugyanannak a szelepnek.

Ebből következik két dolog, ami elsőre hiánynak látszik:

- A szobakártya +/− gombja **csak a felülírás értékét** írja, a felülírás
  végét (`..._felulir_vege`) nem. Azt a logika tudja, mert ő ismeri a
  következő zónaváltás időpontját.
- A kártya nem számol célhőmérsékletet és nem dönt forrásról. Amit mutat, azt
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
| kazán üzemkész | `input_boolean.kazan_uzemkesz` | on/off |
| szellőztető gázretesz | `input_boolean.szellozteto_gaz_retesz` | on/off |
| zónaválasztó | `input_select.futes_zona` | `komfort` \| `ejszaka` \| `eco` \| `tavol` \| `fagyvedelem` |
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
| mért hőmérséklet | `sensor.<prefix>_<szoba>_homerseklet` |
| cél | `sensor.<prefix>_<szoba>_cel` |
| kézi felülírás | `input_number.<prefix>_<szoba>_felulir` |
| felülírás vége | `input_datetime.<prefix>_<szoba>_felulir_vege` |
| forrás | `input_select.<prefix>_<szoba>_forras` (`auto`/`gaz`/`klima`/`ki`) |
| mi fut | `sensor.<prefix>_<szoba>_aktiv` (`radiator`/`klima_futes`/`klima_hutes`/`aeno`/`nincs`) |
| ablak | `sensor.<prefix>_<szoba>_ablak` (`zarva`/`buko`/`nyitva`) |
| szünetel | `binary_sensor.<prefix>_<szoba>_szunetel` |
| elő-fűtés/-hűtés | `sensor.<prefix>_elofutes_<szoba>` (timestamp, `irany` attribútum) |
| fagyveszély | `binary_sensor.<prefix>_<szoba>_fagyveszely` |
| forrásjavaslat | `sensor.<prefix>_<szoba>_forras_javaslat` (`gaz`/`klima`/`hutes`/`aeno`/`szunetel`/`ki`) |
| javaslat indoklása | `sensor.<prefix>_<szoba>_forras_indoklas` |

A szoba forrása eltérhet a házétól, és ez nem hiba: egy klíma nélküli fürdő
gázzal megy, miközben a ház a klímán, egy nyitott ablakú szoba pedig szünetel,
bármit csinál a ház. Ezért a `sensor.futes_forras` összesítő marad, a szoba
saját sorában pedig a szobánkénti javaslat a fő jelzés.

Többhőmérős zóna (`parts:`) esetén még:

| Szerep | Entitás |
| --- | --- |
| részérték | `sensor.<prefix>_<szoba>_<resz>` |
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

A heti ütemtervet a [nielsfaber Scheduler](https://github.com/nielsfaber/scheduler-component)
tárolja. **3.3.9-re ellenőrizve**, a `switch.schedule_*` entitás ezeket adja:

- `weekdays`: `["mon","tue"]`, vagy `daily` / `workday` / `weekend`
- `timeslots`: szövegek, `"05:45:00"` vagy `"05:45:00 - 21:30:00"`
- `entities`: amit a bejegyzés állít
- `actions`: időszakonként egy `{service, service_data}`, a célentitás nélkül
- `current_slot`, `next_slot`, `next_trigger`

A kártya **csak azokat a bejegyzéseket kezeli, amelyek `entities` listájában
ott a zónaválasztó.** Egy zónaváltás egy időpont: a timeslotnak csak `start`
ideje van, `stop` nélkül, és az akciója
`input_select.select_option` a zóna nevével. Íráskor a kártya a
`scheduler.edit` / `scheduler.add` / `scheduler.remove` szolgáltatást hívja,
és mindig a bejegyzés **teljes** timeslot-listáját küldi, mert a `scheduler.edit`
lecseréli azt.

A zónák hőmérsékletei külön helperekben vannak, évszakonként:

```
input_number.futes_zona_<zona>_<szoba>
input_number.hutes_zona_<zona>_<szoba>
```

## Hűtés

- A kártya fűtés/hűtés fülre vált, és az aktív évszak készletét szerkeszti.
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
| `zone_select` | `input_select.futes_zona` | amit az ütemterv állít |
| `heat_prefix` / `cool_prefix` | `input_number.futes_zona` / `input_number.hutes_zona` | zónahőmérséklet-helperek előtagja |
| `heating_value` | `34.92` | égéshő, MJ/m³ |
| `budget_mj` | – | a keret MJ-ban, ha a számlán ez a hiteles szám |
| `room` / `szoba` | – | egyetlen szobára szűkíti a szobakártyát |
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
  - key: living
    name: Étkező
    parts:
      - { key: etkezo, name: Étkező }
      - { key: konyha, name: Konyha }
      - { key: eloszoba, name: Előszoba }
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
