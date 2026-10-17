# Netatmo időjárás-állomás kártya – mit lát a kártya

A beépített [`netatmo`](https://www.home-assistant.io/integrations/netatmo)
integrációval, az alapegységre (NAMain) és a moduljaira. A kártya egy
állomást mutat: kint hány fok van, mennyi a légnyomás, és szobánként milyen a
levegő.

## Entitások

Semmit nem kell felsorolni. A kártya az entity registryből dolgozik, és
**device_class** alapján keres, nem objektum-azonosító alapján: a Home
Assistant a lefordított névből gyártja az id-t, tehát ugyanaz a szenzor
magyarul `sensor.<szoba>_szen_dioxid`, angolul `sensor.<room>_co2`, a
device_class viszont mindkettőn `carbon_dioxide`.

| Amit keres | device_class |
| --- | --- |
| hőmérséklet | `temperature` |
| páratartalom | `humidity` |
| CO₂ | `carbon_dioxide` |
| légnyomás | `atmospheric_pressure` (régebbi HA-n `pressure`) |
| zaj | `sound_pressure` |
| elem | `battery` |
| kapcsolat | `connectivity` (binary_sensor) |

A trendszenzoroknak nincs device_class-uk – felsorolás-típusúak
(`up` / `down` / `stable`) –, azokat a `translation_key` adja
(`temp_trend`, `pressure_trend`).

### Hogyan tudja, melyik modul melyik

Nem a nevéből. A hardver abban különbözik, hogy mit mér:

- **alapegység (NAMain)**: az egyetlen modul, amin van légnyomásmérő;
- **beltéri modul (NAModule4)**: mér CO₂-t;
- **kültéri modul (NAModule1)**: hőmérséklet és páratartalom, CO₂ nélkül.

A fűtési oldal – a termosztát és a szelepek – ugyanazon a `netatmo`
platformon van, de **csak elemszenzort** hoz létre, hőmérsékletet nem (ez
éles rendszeren derült ki), ezért magától kiesik a listából.

Ha a házad alakja ettől eltér (például két kültéri modul van), felülírhatod:

```yaml
sources:
  main: <device_id>
  outdoor: <device_id>
```

## A csapda: a leszakadt modul nem lesz „unavailable"

Ez határozza meg az egész kártya alakját.

Ha egy modul lejön a rádióról, **nem** megy unavailable állapotba. Továbbra
is közli az utolsó mérését, akár órákon át, és semmi nem jelzi, hogy a szám
régi. Az egyetlen entitás, ami igazat mond, a modul `connectivity` binary
sensora.

Ezért minden modulnak **három** állapota van, nem kettő:

| Állapot | Mi történt | Mit mutat a kártya |
| --- | --- | --- |
| **él** | friss mérés | érték, trendnyíl, CO₂ sáv |
| **nem frissül** | a rádiókapcsolat elment, az értékek befagytak | az értékek szürkén, „nem frissül" jelvénnyel, CO₂ sáv **nélkül** |
| **nem válaszol** | maguk a mérések unavailable-ek (általában lemerült elem) | „–", „nem válaszol" jelvény |

A befagyott mérés mellől azért tűnik el a mérősáv, mert a sáv alakja
„éppen most"-ot jelent, és a jelvény mellett is annak olvasódna.

A kártya színét is csak **élő** modul adhatja: egy tegnap délutáni 1800 ppm
nem festheti pirosra a kártyát.

## Amit a kártya mutat

- **Kint**: a kültéri modul hőmérséklete nagyban, trendnyíllal, mellette a
  páratartalom és az alapegység légnyomása a saját trendjével.
- **Készülékrajz**: az alapegység hengere, a réssel, ami a legrosszabb élő
  szoba levegőjét világítja – pont azt csinálja, amit a valódi gép, ha
  ráteszed a kezed a tetejére.
- **Szobák**: modulonként hőmérséklet, trend, páratartalom, az
  alapegységnél zaj is, alatta a CO₂ mérősáv öt sávval és felirattal.
- **Figyelmeztetések**: magas CO₂, leszakadt vagy néma modul, fogyó elem.

### A lámpa három fokozat, a mérősáv öt

A mérősávon mind az öt sáv ott van (Kiváló / Jó / Közepes / Gyenge / Rossz),
mert ott a szám és a felirat hordozza a részletet. A rajzon viszont csak
három szín van – zöld / sárga / piros –, mert a valódi gép is ennyit mutat,
és öt, egymáshoz pár száz ppm-re lévő árnyalatot egy 34 képpontos hengeren
sem normál, sem színtévesztő látással nem lehet megkülönböztetni. (A
paletta-ellenőrző az ötöt el is bukja, a hármat átengedi.)

## Amit szándékosan nem mutat

**Grafikont.** A pillanatnyi érték plusz a trendnyíl megmondja, amit tudni
kell: emelkedik, süllyed vagy áll. Az előzményre ott a HA saját
`history-graph` kártyája.

**A publikus „weather area"-kat** (Budapest, Home). Azok nem a te
állomásod adatai.

**Szél- és esőmérőt.** Nincs ilyen modul az állomáson; ha lenne, külön kör
lenne, nem egy üres sor.

## Beállítások

| Kulcs | Alapérték | Mit csinál |
| --- | --- | --- |
| `name` | „Időjárás-állomás" | fejléc felirat |
| `sources.main` | automatikus | az alapegység device_id-je |
| `sources.outdoor` | automatikus | a kültéri modul device_id-je |
| `language` | `auto` | `hu` / `en` |
| `compact` | `false` | kisebb rajz, sűrűbb elrendezés |
| `animate` | `true` | a lámpa lélegzése ki/be |
| `show_art` | `true` | készülékrajzok |
| `show_rooms` | `true` | a szobalista |
| `show_co2` | `true` | a CO₂ mérősáv |
| `show_alerts` | `true` | figyelmeztetések |
