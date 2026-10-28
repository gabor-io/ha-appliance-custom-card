# Fisher szellőztető kártya – mit tud és honnan

A kártya a [tuya-local](https://github.com/make-all/tuya-local) `fisher_ervq_hd_hrv`
eszközdefiníciójával felvett hővisszanyerős szellőztetőt (Fisher F-ERVQ-B150CO2-I)
jeleníti meg és vezérli.

## Entitásfelismerés

A tuya-local a legtöbb entitást az eszközosztályából nevezi el, így magyar Home
Assistanton az azonosítók magyarul képződnek (`sensor.…_szen_dioxid`,
`sensor.…_paratartalom`). Objektum-azonosítóra építeni tehát nem lehet: a kártya
az **entitásregisztert** olvassa, kiszűri az adott eszköz `tuya_local` entitásait,
és eszközosztály szerint válogat:

| Kártyabeli szerep | Honnan | Példa (magyar HA) |
| --- | --- | --- |
| ventilátor + üzemmódok | az egyetlen `fan` entitás | `fan.fisher_f_ervq_b150co2_i` |
| CO₂ | `sensor`, `device_class: carbon_dioxide` | `sensor.…_szen_dioxid` |
| PM2,5 | `sensor`, `device_class: pm25` | `sensor.…_szallo_por_25_mm` |
| hőmérséklet / páratartalom | `sensor`, `temperature` / `humidity` | `sensor.…_homerseklet` |
| szűrő élettartam | `sensor`, `device_class: duration` | `sensor.…_szuro_elettartam` |
| hibajelzés | `binary_sensor`, `device_class: problem` | `binary_sensor.…_problema` |
| befúvás / elszívás | `number`, az azonosítóban `supply` / `exhaust` | `number.…_supply_fan_speed` |
| szűrő élettartam beállítás | az egyetlen `select` | `select.…_filter_lifespan` |
| szűrő nullázás | az egyetlen `button` | `button.…_szuro_visszaallitas` |

Minden kulcs felülírható:

```yaml
type: custom:fisher-erv-card
entities:
  co2: sensor.sajat_co2
  supply: number.sajat_befuvas
```

## Levegőminőség

| Szint | CO₂ (ppm) | PM2,5 (µg/m³) |
| --- | --- | --- |
| Kiváló | ≤ 600 | ≤ 10 |
| Jó | ≤ 800 | ≤ 15 |
| Megfelelő | ≤ 1000 | ≤ 25 |
| Mérsékelt | ≤ 1400 | ≤ 50 |
| Rossz | > 1400 | > 50 |

A CO₂ sávok a szokásos beltéri ajánlásokat követik (1000 ppm fölött már érdemes
szellőztetni), a PM2,5 sávok a WHO 2021-es napi irányértékéhez igazodnak.
„Mérsékelt" és „Rossz" CO₂-nél a kártya figyelmeztető sort is kiír.

## Álló gépnél nincs levegőminőség

A gép csak akkor méri a levegőt, amikor mozgatja is: **kikapcsolva 0 ppm-et és
0 µg/m³-t küld**, miközben a hőmérsékletet és a páratartalmat továbbra is
valósan jelenti. Egy szoba CO₂-je viszont soha nem nulla – a szabad levegő is
~420 ppm –, tehát a nulla nem alacsony érték, hanem azt jelenti, hogy nincs
mérés.

A kártya ezért álló gépnél nem minősíti a levegőt: a sor ottmarad (hogy látszódjon,
van ilyen érzékelő), de szám, mérősáv és minősítés helyett azt írja ki, hogy
„Álló gépnél nem mér". Enélkül a legmegnyugtatóbb üzenetet – „Kiváló" – pont
akkor adná, amikor semmit nem tud a levegőről.

A port ez csak álló gépnél érinti: járó gépen a 0 µg/m³ lehet valódi mérés is,
friss szűrővel.

## Ha a PM2,5 mindig 0

Az eszközdefiníció a 3-as adatpontot (DP) képezi le PM2,5-ként, de a
**F-ERVQ-B150CO2-I a CO₂-s változat**: a saját kijelzőjén is CO₂ a nagy szám.
Ha a DP végig 0-t ad, akkor a készülékben nincs részecskeérzékelő, csak a Tuya
sablon tartalmazza a DP-t. Ilyenkor a csempe elrejthető:

```yaml
type: custom:fisher-erv-card
show_pm25: false
```

Mielőtt elrejted, érdemes ellenőrizni: a gép saját kijelzője mutat-e PM2,5
értéket, a Tuya/Smart Life app mutat-e ilyen csempét, és változik-e az érték
„Pure H" fokozaton pár perc után.

## Ha a gép nem elérhető

A `fan` entitás ilyenkor megmarad, csak `unavailable` lesz. Ez nem ugyanaz,
mint hogy valaki kikapcsolta a gépet: a kártya ezért külön állapotként kezeli.

| | Kikapcsolva | Nem elérhető |
| --- | --- | --- |
| a `fan` entitás állapota | `off` | `unavailable` |
| a fejlécben | „Kikapcsolva" | „Nem elérhető", wifi-ikonnal |
| figyelmeztetés | nincs | „A készülék nem válaszol – ezek nem friss adatok" |
| a bekapcsoló gomb | aktív, kiemelve | letiltva |
| a kijelzőn | az utolsó mért értékek | `---` |

## Készülékrajz

A rajz a valódi előlapot követi: fehér test, jobb oldali fekete oszlop a
kijelzővel, amin ugyanaz látszik, mint a gépen – nagy CO₂ érték, alatta a
hőmérséklet és a páratartalom, mellette a fordulatszám számjegye. A fehér
előlapon két légáram animálódik (friss levegő be, elhasznált ki); a sebességük a
befúvó ventilátor fokozatát követi, kikapcsolt gépnél megállnak és a kijelző
elhalványul. A szűrőcsík a gép alján borostyánsárgára vált, ha lejár a szűrő.

## A kártya felépítése

1. **Fejléc**: név, típus, hiba- és szűrőjelző ikon, jobbra az aktuális üzemmód.
2. **Rajz és levegőminőség**: CO₂ és PM2,5 sávval és szöveges minősítéssel,
   mellette a hőmérséklet és a páratartalom.
3. **Figyelmeztetések**: hibakód, lejáró vagy lejárt szűrő, magas CO₂.
4. **Üzemmódok**: a gép által kínált presetek (Kézi, Automata, Alvó, Pure L/M/H)
   és a be-/kikapcsolás.
5. **Fordulatszám**: befúvás és elszívás külön, −/+ léptetővel és fokozatsávval
   (1–8). Nem kézi üzemmódban a kártya kiírja, hogy a gép maga szabályoz.
6. **Szűrő**: hátralévő élettartam, nullázás gomb, élettartam-választó
   (90/120/150/180 nap).
7. **További entitások**: `show_extra: true` esetén minden egyéb `tuya_local`
   entitás az eszközről.

## Beállítások

| Kulcs | Alap | Jelentés |
| --- | --- | --- |
| `device` | automatikus | a készülék device_id-ja |
| `prefix` | automatikus | objektum-azonosító előtag (regiszter nélküli esetre) |
| `entities` | – | entitás-felülírások |
| `name` | eszköz neve | fejléc felirat |
| `subtitle` | típus | fejléc alcím (üres sztring: elrejtve) |
| `language` | `auto` | `hu` / `en` |
| `compact` | `false` | kisebb rajz, sűrűbb elrendezés |
| `animate` | `true` | animációk ki/be |
| `show_air` | `true` | levegőminőség blokk |
| `show_pm25` | `true` | PM2,5 csempe |
| `show_modes` | `true` | üzemmódok |
| `show_speeds` | `true` | fordulatszámok |
| `show_filter` | `true` | szűrő |
| `show_extra` | `false` | további entitások |
