# AEG GI8200X5TN – entitások és képességek

A kártya ezekre az adatokra épül. Forrás: a Home Assistant Electrolux
integrációjának diagnosztikai exportja és a GI8200X5TN gépkönyve.

## Állapotok (`sensor.<prefix>_appliance_state`)

`OFF`, `IDLE`, `READY_TO_START`, `DELAYED_START`, `RUNNING`, `PAUSED`,
`END_OF_CYCLE`, `ALARM`

Az adott állapotban engedélyezett parancsok (a `applianceState` triggerekből):

| Állapot | Parancs | Program állítható? |
| --- | --- | --- |
| `IDLE` | `ON` | igen |
| `READY_TO_START` | `START` | igen |
| `RUNNING` | `PAUSE` | nem |
| `PAUSED` | `RESUME`, `STOPRESET` | nem |
| `DELAYED_START` | `STOPRESET` | nem |
| `END_OF_CYCLE` | `STOPRESET` | nem |

## Ciklusfázisok (`sensor.<prefix>_cycle_phase`)

`PREWASH`, `MAINWASH`, `COLDRINSE`, `HOTRINSE`, `EXTRARINSE`, `DRYING`,
`ADO_DRYING`, `UNAVAILABLE`

A kártya ezeket négy lépésre vonja össze: Előmosás, Mosogatás, Öblítés,
Szárítás.

## Programok és fogyasztás (gépkönyv, 5.5 fejezet)

| Program UID | Kijelzett név | Víz (l) | Energia (kWh) | Idő (perc) |
| --- | --- | --- | --- | --- |
| `ECO` | Eco | 8.4 | 0.488 | 310 |
| `AUTO` | Auto | 12.5 | 1.000 | 180 |
| `QUICK30` | Quick 30 | 8.5 | 0.475 | 30 |
| `QUICK60` | 1h00m | 10.5 | 1.000 | 60 |
| `NORMAL90` | 1h30m | 10.5 | 1.000 | 90 |
| `120_MIN` | 2h00m | 10.5 | 0.900 | 120 |
| `RINSE` | Öblítés és várakozás | 4.0 | 0.150 | 15 |
| `MACHINE_CARE` | Gépápolás | 10.0 | 0.575 | 60 |

## Melyik program milyen opciót fogad el?

| Program | Elfogadott opciók |
| --- | --- |
| `ECO` | ExtraSilent, XtraDry |
| `AUTO` | – |
| `QUICK30` | ExtraPower, GlassCare, OneRack, Sanitize, SprayZone, ZoneClean |
| `QUICK60` | ExtraPower, GlassCare, OneRack, Sanitize, SprayZone, XtraDry, ZoneClean |
| `NORMAL90` | ExtraPower, ExtraSilent, GlassCare, Sanitize, SprayZone, XtraDry, ZoneClean |
| `120_MIN` | ExtraPower, ExtraSilent, GlassCare, Sanitize, SprayZone, XtraDry, ZoneClean |
| `RINSE` | – |
| `MACHINE_CARE` | – |

Az AutoOpen (`userSelections/autoDoorOpener`) minden programnál elérhető.

## Riasztások (`sensor.<prefix>_alerts`)

Figyelmeztetés: `DISH_ALARM_SALT_MISSING`, `DISH_ALARM_RINSE_AID_LOW`.

Hibakódok a gépkönyv 13. fejezete szerint:

| Kód | Jelentés |
| --- | --- |
| i10 / i11 | A készülék nem tölt be vizet |
| i20 | A készülék nem ereszti le a vizet |
| i23 / i24 / i28 | Leeresztő szivattyú hibája |
| i30 | Túlcsordulásgátló bekapcsolt |
| i51–i59 | Mosószivattyú hibája |
| i61 / i69 | Túl magas vízhőmérséklet vagy érzékelőhiba |
| i97 / i98 / iC0–iC5 | Készülékhiba |
| iF1 | Túl magas vízszint |

## Eco / energia / víz pontszámok

A gép programonként számolja őket (0–7), de **nem minden programhoz**: a
képességleírás szerint az `ECO`, `AUTO`, `QUICK30`, `QUICK60`, `NORMAL90` és
`120_MIN` küld `ecoScore` / `energyScore` / `waterScore` értéket, a `RINSE` és a
`MACHINE_CARE` nem — ezeknél a szenzorok a korábbi program értékén maradnak,
ezért a kártya el is rejti a mérőket. Programváltás után a gép néhány
másodperccel később számolja újra a pontszámokat, addig a kártya halványítva
mutatja a régieket.

## Két entitás, ami máshogy viselkedik, mint elsőre látszik

- **`sensor.<prefix>_alerts`** állapota a riasztások **darabszáma** (pl. `2`), a
  tényleges kódok az attribútumokban vannak: minden ismert kód `OFF`, az aktív
  pedig `"<severity>-<acknowledgeStatus>"` (pl. `WARNING-NOT_NEEDED`). A kártya
  az attribútumokból olvassa ki a kódokat, és csak akkor ír darabszámot, ha
  más nem áll rendelkezésre.
- **A késleltetés felbontása 10 perc**: a gép `startTime` képessége
  `min 0, max 86400, step 600` (másodpercben), vagyis 10 perces lépésekben,
  legfeljebb 24 órára állítható – függetlenül attól, hogy a Home Assistant
  entitás ennél finomabb lépésközt mutat. A kártya minden beállított értéket
  ehhez igazít (lefelé kerekítve).
- **`number.<prefix>_start_time`** egységét az integráció verziója dönti el:
  percben (min -1, max 1440) vagy másodpercben (min -1, max 86400, step 60). A
  kártya az entitás `unit_of_measurement`, `max` és `step` attribútumaiból
  állapítja meg, és ugyanabban az egységben ír vissza.

## A kártya által használt entitások

| Kulcs | Entitás |
| --- | --- |
| `appliance_state` | `sensor.<prefix>_appliance_state` |
| `cycle_phase` | `sensor.<prefix>_cycle_phase` |
| `time_to_end` | `sensor.<prefix>_time_to_end` |
| `alerts` | `sensor.<prefix>_alerts` |
| `eco_score` / `energy_score` / `water_score` | `sensor.<prefix>_*_score` |
| `total_cycle_counter` | `sensor.<prefix>_total_cycle_counter` |
| `remote_control` | `sensor.<prefix>_remote_control` |
| `link_quality` | `sensor.<prefix>_network_interface_link_quality_indicator` |
| `door_state` | `binary_sensor.<prefix>_door_state` |
| `connectivity` | `binary_sensor.<prefix>_connectivity_state` |
| `eco_mode` | `binary_sensor.<prefix>_miscellaneous_state_eco_mode` |
| `program` | `select.<prefix>_program_uid` |
| `water_hardness` | `select.<prefix>_water_hardness` |
| `display_light` | `select.<prefix>_display_light` (`Display Light 0`–`9`) |
| `display_on_floor` | `select.<prefix>_display_on_floor` (`Green` / `Off`) |
| `end_of_cycle_sound` | `select.<prefix>_end_of_cycle_sound` (`Short Sound` / `No Sound`) |
| `key_tone` | `switch.<prefix>_key_tone` |
| `start_time` | `number.<prefix>_start_time` (-1 = nincs késleltetés) |
| `rinse_aid_level` | `number.<prefix>_rinse_aid_level` |
| `cmd_*` | `button.<prefix>_execute_command_{on,off,start,pause,resume,stopreset}` |
| opciók | `switch.<prefix>_{xtra_dry,extra_power,extra_silent,glass_care,sanitize,spray_zone,zone_clean,one_rack}_option`, `switch.<prefix>_auto_door_opener` |

A `<prefix>` az entitások közös része, a példagépnél `aeg_gi8200x5tn`.
