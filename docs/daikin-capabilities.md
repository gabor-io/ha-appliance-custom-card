# Daikin klíma kártya – mit lát a kártya

A kártya a Home Assistant beépített [`daikin`](https://www.home-assistant.io/integrations/daikin/)
integrációjára épül (a `pydaikin` a helyi BRP069 WiFi adapterrel beszél), és
ugyanezzel a kártyával vezérelhető egy **klíma csoport** is.

## Entitások

| Mire | Hogyan találja meg | Példa |
| --- | --- | --- |
| klíma | `entity`, vagy az egyetlen `daikin` platformú `climate` | `climate.halo_szoba` |
| belső hőmérő | a készülék `inside_temperature` kulcsú szenzora | `sensor.…_belso_homerseklet` |
| külső hőmérő | a készülék `outside_temperature` kulcsú szenzora | `sensor.…_kulso_homerseklet` |

A feloldás **a regiszterből** megy (platform + `translation_key`), nem az
objektum-azonosítóból – így a magyar nyelvű HA átnevezett entitásaival is
működik.

## Külső források

A Daikin a legtöbb érdekes értéket **nem** adja. A `support_*` jelzők szerint a
tipikus lakossági gépen nincs páratartalom- és energiamérés. Ezeket a kártya
onnan veszi, ahová mutatsz:

```yaml
sources:
  temperature: sensor.halo_szoba_homerseklet   # szobában mérő hőmérő
  humidity: sensor.halo_szoba_paratartalom
  power: sensor.halo_szoba_klima_teljesitmeny  # konnektormérő, W
  energy: sensor.halo_szoba_klima_havi         # kWh
  outside: sensor.idojaras_homerseklet         # felülírja a gép kültéri mérőjét
```

**A `temperature` a legfontosabb.** A gép saját hőmérője a beltéri egység
beszívójában ül, a plafon közelében, és a saját keringetett levegőjét méri –
fűtésnél többet mutat a szobánál, hűtésnél kevesebbet. Ha megadsz szobában
mérő szenzort, a kártya **azt** használja mindenhez: a nagy számhoz, az
állapotmondathoz és a csoport átlagához. A gép saját értéke nem tűnik el,
halványan mellé kerül (`gép 25`), mert az eltérés maga is információ.

**A `power` megválaszolja, dolgozik-e a gép.** A Daikin kompresszor-frekvencia
szenzora alapból le van tiltva a regiszterben, és egyes adaptereken
helyőrzőt küld. Egy konnektormérő sokkal többet mond: a kártya 100 W alatt
kiírja, hogy *„A kompresszor áll"*.

## Csoport

Ha a megadott entitás **csoport** (pl. a
[`climate_group`](https://github.com/bjrnptrsn/climate_group) integrációból), a
kártya sorokra bontva mutatja a tagokat. A tagokat nem kell felsorolnod: a
csoport entitás az `entity_id` attribútumában megadja őket.

```yaml
type: custom:daikin-ac-card
entity: climate.daikin_acs
units:
  climate.halo_szoba:
    name: Hálószoba
    sources:
      temperature: sensor.halo_szoba_homerseklet
```

A `units` csak a forrásokat és a nevet köti a tagokhoz; amelyik gépet nem
említed, a saját hőmérőjét használja.

**A csoport számai átlagok.** A `climate_group` a cél- és a mért
hőmérsékletet minden tagból átlagolja (a kikapcsoltakból is), a módnál pedig a
leggyakoribb nem-`off` módot jelenti. Ezért a kártya „Átlag" feliratot ír, és
ha a gépek eltérően állnak, **egyetlen mód-gombot sem jelöl kiemeltnek** –
nem állítja, hogy egységesek.

## Nyitásérzékelők

A kártya megmondja, ha a gép nyitott ablakba fűt vagy hűt. Nem kell felsorolni
semmit: a párosítás **terület** alapján megy, és a területet a Home Assistant
már tudja.

Három dolog miatt pont így működik, és mindhárom éles rendszeren derült ki:

- **A terület az eszközön van, nem az entitáson.** Az entity registry
  `area_id`-je jellemzően `null`, és az entitás a készülékétől örökli. A
  kártya ezért a készüléken keresztül néz utána.
- **Az autó is jelez ajtót és ablakot.** A `binary_sensor.skoda_..._ablakok`
  ugyanolyan `window` osztályú kontaktus, mint a nappali ablaka. Ezért a
  keresés a szobából indul, soha nem az érzékelőből: ami nem a klíma
  területén van, az nem a klíma ablaka.
- **A mosogatógép ajtaja nem huzat.** Alapból csak a `window` osztály számít,
  az ajtók külön kérésre (`openings.classes`).

A figyelmeztetés **30 másodperc** nyitás után szólal meg. Nem szimmetrikus
késleltetés: éles előzményen a legrövidebb valódi szellőztetés 47 másodperc
volt, a hamis záródások viszont 1–2 másodpercesek, ezért a hosszú késleltetés
elrejtené a rövid szellőztetéseket.

### Bukó-nyíló ablak: két kontaktus, egy ablak

Ha egy ablakon **két** kontaktus van – egy a szárny tetején, egy az alján –,
az nem két ablak. A bukó-nyíló szárny az alsó élén billen, ezért:

| top | bottom | Az ablak |
| --- | --- | --- |
| zárva | zárva | zárva |
| **nyitva** | zárva | **bukóra** van |
| nyitva | nyitva | teljesen nyitva |

A kártya ezért kontaktusok helyett **ablakokat** számol: a sarkig kitárt
bukó-nyíló ablak két kontaktust húz el, és továbbra is egy nyitott ablak –
nem „2 nyitva".

A párosítás a végződésből megy. Alapból a `_top`/`_bottom`, a `_felso`/`_also`
és az `_upper`/`_lower` párokat ismeri fel, a végükön megtűrve egy
`_contact`, `_sensor`, `_nyitas`, `_allapot` vagy `_state` szót is. Az első
végződés mindig a **felső** kontaktus – abból derül ki a bukó állapot.

Ha az azonosítóid nem követnek konvenciót, párosítsd kézzel. **Az első entitás
a felső kontaktus:**

```yaml
openings:
  windows:
    Hálószoba ablak:
      - binary_sensor.zigbee_0x001   # felső
      - binary_sensor.zigbee_0x002   # alsó
```

Vagy ha csak a végződésed más:

```yaml
openings:
  pairs:
    - [bukó, nyíló]
```

Bukót csak akkor tud megkülönböztetni, ha **mindkét** kontaktus megvan: egy
magányos felső kontaktus nyitott állapota lehet bukó is, teljesen nyitott is,
ezért a kártya ilyenkor „nyitva"-t mond, nem találgat. Ha csak az **alsó** van
nyitva, az nem olyan alak, amit a vasalat elő tud állítani (elcsúszott mágnes
vagy halott felső kontaktus), ezért az is „nyitva".

A figyelmeztetés ugyanúgy szól bukóra, mint teljesen nyitott ablakra – a
bukóra hagyott ablak a klasszikus módja annak, hogy az utcát fűtsük –, csak
kimondja, melyikről van szó.

Mit mutat:

| Helyzet | Mit látsz |
| --- | --- |
| a gép fűt/hűt/párátlanít és nyitva az ablak | narancs figyelmeztetés a névvel és azzal, mióta |
| a gép áll vagy csak keringet, de nyitva az ablak | halvány „nyitva" jelvény, figyelmeztetés nélkül |
| csoportnézet | jelvény az érintett gép sorában, és egy figyelmeztetés szobánként |
| nincs kontaktus a szobában | semmi – a kártya nem állítja, hogy zárva van |

Csak keringetés (`fan_only`) közben nincs riasztás: az a levegőt mozgatja, amit
amúgy is a szobában van, tehát a nyitott ablak nem kerül pénzbe.

Finomhangolás:

```yaml
type: custom:daikin-ac-card
entity: climate.nappali
openings:
  classes: [window, door]        # az ajtók is számítsanak
  ignore:
    - binary_sensor.nappali_szellozo   # ez szándékosan nyitva van
  entities:
    - binary_sensor.terasz_ajto  # kontaktus, aminek nincs területe
open_delay: 120                  # 2 perc, ha sokat nyitogatjátok
```

| Kulcs | Mit csinál |
| --- | --- |
| `openings.auto` | `false` esetén csak a felsorolt entitásokat nézi |
| `openings.area` | másik terület, ha a gép rossz szobához van rendelve |
| `openings.classes` | mely `device_class`-ok számítanak (alap: `[window]`) |
| `openings.entities` | kontaktusok név szerint, terület nélkül is |
| `openings.ignore` | kihagyandó kontaktusok |
| `openings.pairs` | bukó-nyíló végződés-párok, felső elöl (alap: top/bottom, felso/also, upper/lower) |
| `openings.windows` | kézi párosítás: `név: [felső, alsó]` |
| `open_delay` | hány másodperc nyitás után szóljon (alap: 30) |

Csoportnál a tagonkénti blokk felülírja a kártyaszintűt:

```yaml
units:
  climate.gyerekszoba:
    openings:
      ignore: [binary_sensor.gyerek_ablak_bukoban]
```

## Amit szándékosan nem mutat

**Vízszintes és 3D lamella.** A `pydaikin` a lamella-listát fix fordítótáblából
adja vissza, nem a géptől kérdezi, ezért minden BRP069 adapter felkínálja a
`Horizontal` és `3D` opciót – akkor is, ha a beltéri egységben nincsenek
oldalra fordítható terelőlapok. A kártya alapból a két mindig működő opciót
tartja meg, és egy **Lamella** kapcsolóvá vonja össze őket. Ha a te gépedben
tényleg van oldalirányú terelés:

```yaml
show_all_swing: true
```

**Streamer.** A HA `switch.py`-ja vakon létrehozza a Streamer kapcsolót, ha a
gép ismeri az `adv` kulcsot – a forrásban ez áll: *„It isn't possible to find
out from the API responses if a specific device supports the streamer, so
assume so if it does support advanced modes."* A kártya ezért nem jeleníti
meg. Ha a gépedben van ionizátor, tedd ki külön entitás-sorral.

**Kompresszor-frekvencia és firmware.** Nem állapot, hanem diagnosztika. A
„dolgozik-e épp" kérdésre a fogyasztásmérő válaszol, a többi a HA eszközoldalán
megtalálható.

## Beállítások

| Kulcs | Alapérték | Mit csinál |
| --- | --- | --- |
| `entity` | automatikus | a klíma vagy a csoport entitása |
| `device` | – | eszköz azonosító az entitás helyett |
| `name` | eszköz neve | fejléc felirat |
| `sources` | – | külső szenzorok (egy gép esetén) |
| `units` | – | tagonkénti nevek és források (csoportnál) |
| `language` | `auto` | `hu` / `en` |
| `compact` | `false` | kisebb rajz, sűrűbb elrendezés |
| `animate` | `true` | animációk ki/be |
| `show_art` | `true` | készülékrajz |
| `show_readings` | `true` | mért értékek a fejlécben |
| `show_modes` | `true` | üzemmód-sáv |
| `show_fan` | `true` | ventilátor fokozat |
| `show_presets` | `true` | Turbó / Eco / Távollét |
| `show_all_swing` | `false` | mind a négy lamella-opció |
| `show_openings` | `true` | nyitásérzékelők |
| `openings` | – | a nyitásérzékelők finomhangolása (lásd fent) |
| `open_delay` | `30` | hány másodperc nyitás után figyelmeztessen |
