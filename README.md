# Home Appliance Cards

Két Lovelace kártya háztartási gépekhez, közös alapokon:

| Kártya | Készülék | Integráció |
| --- | --- | --- |
| `custom:aeg-dishwasher-card` | AEG / Electrolux mosogatógép (fejlesztve: **GI8200X5TN**) | [TTLucian/ha-electrolux](https://github.com/TTLucian/ha-electrolux) |
| `custom:philips-airfryer-card` | Philips airfryer (fejlesztve: **HD9880 Combi 7000 XXL**) | [renaudallard/homeassistant_philips_homeid](https://github.com/renaudallard/homeassistant_philips_homeid) |

Mindkét kártya animált géprajzot, valós állapotkövetést és vezérlést ad,
magyar és angol nyelven, világos és sötét témában.

## Mosogatógép kártya

![Mosogatógép kártya](docs/images/dishwasher-light.png)

- **Animált géprajz**: mosogatás közben forgó szórókar, vízsugarak, hullámzó
  vízszint és felszálló buborékok, gőz a szárítási fázisban, csillogás a ciklus
  végén, a gép kijelzőjén a hátralévő idő.
- **Ajtó és bekapcsolt állapot a képen**: nyitott ajtónál a gép ajtaja lehajlik
  és árnyékot vet, kikapcsolt gépnél sötét a kijelző, a jelzőfény és a belső
  világítás is.
- **Hátralévő idő és pontos befejezés** (`Elkészül 14:12`) + előrehaladás-sáv.
  A gép nem küld százalékot, ezért a ciklus alatt látott leghosszabb hátralévő
  időből (illetve a program névleges hosszából) számol.
- **Fázis-idővonal**: Előmosás → Mosogatás → Öblítés → Szárítás; a program által
  nem használt fázisok halványak.
- **Programválasztó** a gépkönyv szerinti nevekkel, víz-/energiafogyasztással.
- **Kiegészítő funkciók** csak ott, ahol az adott program elfogadja őket.
- **Késleltetett indítás** 1–12 óra, egy kattintással – és kiírja, hogy a gép
  mikor indul, illetve a késleltetéssel és a választott programmal együtt mikor
  lesz kész (`Indul 16:28 · Elkészül 21:38`).
- **Riasztások magyarul**: sóhiány, öblítőszer-hiány, i10/i20/i30/iF1 hibakódok.
- Eco/energia/víz pontszámok, ciklusszám, öblítőszerszint, vízkeménység,
  Wi-Fi jelminőség, távvezérlés állapota.

Részletek: [`docs/dishwasher-capabilities.md`](docs/dishwasher-capabilities.md),
példák: [`examples/dishwasher.yaml`](examples/dishwasher.yaml).

## Airfryer kártya

![Airfryer kártya](docs/images/airfryer-light.png)

- **Animált géprajz**: pörgő ventilátor, izzó fűtőszál, felszálló hő, gőz a
  párolós módokban, pirulő étel, és **kicsúszó fiók, ha kinyitod**.
- **Fiókállapot mindenhol**: a géprajzon, figyelmeztető sávként (sütés közben
  „a fiók nyitva – a sütés szünetel”), fejlécikonként és a Részletek között.
  Nyitott fióknál az indítás gomb le van tiltva.
- **Rázás- és fordításemlékeztető** villogó figyelmeztetéssel (manuális módban a
  beállított idő felénél szól a gép).
- **Hátralévő idő** perc:másodperc pontossággal, pontos befejezési időponttal és
  előrehaladás-sávval (a gép a teljes és a hátralévő időt is küldi).
- **Hőmérséklet-mérő**: aktuális / cél, és **ételhőmérő** esetén a maghőmérséklet
  külön mérővel, valamint a gépkönyv ajánlott maghőmérséklet-táblázatával.
- **Ételkészítési módok és saját programok** választása, hőmérséklet/idő/
  maghőmérséklet állítása léptetőkkel és gyorsgombokkal, levegősebesség.
- **Állapotfüggő vezérlés**: bekapcsolás, indítás, szünet, leállítás, melegen
  tartás.

Részletek: [`docs/airfryer-capabilities.md`](docs/airfryer-capabilities.md),
példák: [`examples/airfryer.yaml`](examples/airfryer.yaml).

| Sötét téma | Mobil / kompakt |
| --- | --- |
| ![Sötét](docs/images/airfryer-dark.png) | ![Mobil](docs/images/airfryer-mobile.png) |

## Telepítés

### HACS (ajánlott)

1. HACS → Frontend → ⋮ → **Custom repositories**
2. URL: `https://github.com/gabor-io/ha-appliance-custom-card`, kategória: **Lovelace**
3. Telepítés után a HACS felveszi a `ha-appliance-cards.js` erőforrást, ami
   mindkét kártyát tartalmazza.

### Kézzel

1. Másold a kívánt fájlt a `config/www/` könyvtárba:
   - `dist/ha-appliance-cards.js` – mindkét kártya, vagy
   - `dist/aeg-dishwasher-card.js` / `dist/philips-airfryer-card.js` – külön-külön.
2. Beállítások → Irányítópultok → ⋮ → **Erőforrások** → Erőforrás hozzáadása:
   - URL: `/local/ha-appliance-cards.js`
   - Típus: **JavaScript modul**
3. Ctrl+F5 a böngészőben.

## Használat

A kártyák maguktól megkeresik a készülék entitásait:

```yaml
type: custom:aeg-dishwasher-card
```

```yaml
type: custom:philips-airfryer-card
```

Ha több hasonló készüléked van, add meg a készüléket (a vizuális szerkesztő
legördülőjéből is választható):

```yaml
type: custom:philips-airfryer-card
device: 8f1c0a2b5d7e4f3a9c6b1d2e3f4a5b6c
name: Airfryer
```

## Beállítások

Közös opciók mindkét kártyán:

| Opció | Típus | Alapértelmezés | Leírás |
| --- | --- | --- | --- |
| `device` | string | automatikus | A készülék `device_id`-ja |
| `prefix` | string | automatikus | Az entitások közös előtagja |
| `entities` | map | automatikus | Egyedi entitás-hozzárendelés |
| `name` | string | a készülék neve | Fejléc felirat |
| `language` | `auto` \| `hu` \| `en` | `auto` | A kártya nyelve |
| `compact` | bool | `false` | Kisebb géprajz, sűrűbb elrendezés |
| `animate` | bool | `true` | Animációk ki/be |
| `show_details` | bool | `true` | Részletek rács |
| `show_controls` | bool | `true` | Vezérlőgombok |

Csak a mosogatógép kártyán: `show_programs`, `show_options`, `show_delay`,
`show_scores`, `show_consumption`.

Csak az airfryer kártyán: `show_methods`, `show_presets`, `show_settings`,
`show_probe`.

Az `entities` alatt felülírható kulcsok a két `docs/*-capabilities.md` fájl
végén találhatók.

## Jó tudni

- **Mosogatógép távvezérlés**: a gép csak akkor fogadja a parancsokat, ha
  engedélyezett a távindítás; a kártya kiszürkíti a gombokat és jelzi az okot.
- **Program választása kikapcsolt mosogatógépen**: a kártya előbb megnyomja az
  `execute_command_on` gombot, vár 1,5 másodpercet, és utána állít programot.
- **Airfryer fiók**: nyitott fióknál a gép szünetel, a kártya nem enged indítást.
- **Mértékegységek**: a kártyák az entitások `unit_of_measurement` attribútumát
  követik, így °C/°F és perc/másodperc alapú érték is jó.

## Fejlesztés

```bash
npm install
npm run build      # dist/*.js (mindhárom bundle)
npm run watch      # figyelő mód, minifikálás nélkül
npm run serve      # http://localhost:8099/demo/ – demók mock hass-szal
```

```
src/
├── shared/      # entitásfelismerés, i18n, ikonok, alapstílusok, szerkesztő
├── dishwasher/  # AEG / Electrolux mosogatógép kártya
└── airfryer/    # Philips airfryer kártya
```

A `demo/` mappa a valódi diagnosztikai adatokból épített állapotokat játssza
vissza (mosogatógép: fut, szárít, szünetel, késleltetve indul, elkészült, hiba,
offline; airfryer: előmelegít, süt, rázás, nyitott fiók, ételhőmérő, párolás,
elkészült, melegen tart, hiba), így a kártyák HA nélkül is fejleszthetők.

## Licenc

MIT
