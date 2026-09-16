# Philips HD9880 (Airfryer Combi 7000 XXL) – entitások és állapotok

A kártya ezekre az adatokra épül. Forrás: a
[philips_homeid](https://github.com/renaudallard/homeassistant_philips_homeid)
integráció entitásdefiníciói és a HD9880 magyar használati útmutatója.

## Állapotok (`sensor.<prefix>_cooking_status`)

| Érték | Jelentés | Kártyán |
| --- | --- | --- |
| `standby` | készenlét | Készenlét |
| `powersave` | energiatakarékos alvás | Energiatakarékos |
| `mainmenu` | főmenü a kijelzőn | Főmenü |
| `idle` | beállítva, indításra vár | Kész az indításra |
| `setting` / `parasetting` | paraméterek állítása | Beállítás |
| `precook` | előmelegítés | Előmelegítés |
| `cooking` | sütés | Sütés |
| `pause` | szünet (pl. nyitott fiók) | Szüneteltetve |
| `user_action` | rázás/fordítás szükséges | Beavatkozás szükséges |
| `maintain` | melegen tartás | Melegen tartás |
| `finish` | kész | Elkészült |
| `pairing` | párosítás | Párosítás |

A vezérlőgombok állapotfüggően jelennek meg: készenlétben bekapcsolás, `idle`
állapotban indítás, sütés közben szünet és leállítás, szünetben folytatás,
a ciklus végén melegen tartás.

## Ételkészítési módok (`select.<prefix>_cooking_method`)

A HD9880 (Venus architektúra) öt módot kínál: `Manual`, `Auto Cook`,
`Keep Warm`, `Recipe`, `No Selection`. A kártya a többi Philips architektúra
módjait (Air Steam, Steaming, Roast, Bake, Slow cook, Defrost, Reheat,
Sous-vide, Stew, Easy clean, …) is felismeri és lefordítja, így más
készülékekkel is használható.

## A gépkönyv szerinti tartományok

| Beállítás | Tartomány | Megjegyzés |
| --- | --- | --- |
| Sütési hőmérséklet | 40–200 °C | manuális és ételhőmérős módban |
| Sütési idő | 1–180 perc | a `number` entitás jelenleg 1–60 percet enged |
| Maghőmérséklet | 40–100 °C | csak ételhőmérős módban |
| Levegősebesség | alacsony / magas | Auto-Cook módban automatikus |

Ajánlott maghőmérsékletek (gépkönyv, 23. oldal): baromfi 80–85 °C, baromfimell
70–74 °C, marha véres 45–50 °C / közepes 55–60 °C / jól átsütve 65–70 °C,
sertés 70–73 °C, sertéskaraj 58–63 °C, hal 50–55 °C, egész burgonya 92–95 °C.
A kártya ezt a táblázatot mutatja, ha az ételhőmérő csatlakoztatva van.

## Fiók és emlékeztetők

A fiók kinyitása szünetelteti a sütést, visszatolás után a készülék
automatikusan folytatja. Manuális módban a beállított idő felénél
rázásemlékeztető szól. A kártya mindhármat jelzi: a fiók nyitva állapotot a
géprajz animációja, egy figyelmeztető sáv és a Részletek is mutatja, rázás és
fordítás esetén pedig villogó figyelmeztetés jelenik meg.

## A kártya által használt entitások

| Kulcs | Entitás |
| --- | --- |
| `status` | `sensor.<prefix>_cooking_status` |
| `current_temp` / `target_temp` | `sensor.<prefix>_current_temperature`, `sensor.<prefix>_target_temperature` |
| `remaining` | `sensor.<prefix>_time_remaining` (másodperc) |
| `total_time` | `sensor.<prefix>_total_cook_time` (perc) |
| `preset` / `recipe` | `sensor.<prefix>_preset`, `sensor.<prefix>_recipe` |
| `error` | `sensor.<prefix>_error_code` |
| `preheat_status` / `keep_warm_status` | `sensor.<prefix>_preheat_status`, `sensor.<prefix>_keep_warm` |
| `airspeed` | `sensor.<prefix>_air_speed` |
| `probe_current` / `probe_target` | `sensor.<prefix>_current_probe_temperature`, `sensor.<prefix>_probe_temperature` |
| `stage` / `voltage` | `sensor.<prefix>_current_stage`, `sensor.<prefix>_voltage` |
| `drawer` | `binary_sensor.<prefix>_drawer` |
| `shake` / `flip` | `binary_sensor.<prefix>_shake_reminder`, `binary_sensor.<prefix>_flip_reminder` |
| `preheat_active` / `resting` | `binary_sensor.<prefix>_preheat_active`, `binary_sensor.<prefix>_resting` |
| `probe_unplugged` / `probe_required` | `binary_sensor.<prefix>_probe_unplugged`, `binary_sensor.<prefix>_probe_required` |
| `btn_start` / `btn_pause` / `btn_stop` / `btn_keep_warm` | `button.<prefix>_start_cooking`, `_pause`, `_stop`, `_keep_warm` |
| `num_temp` / `num_time` / `num_airspeed` / `num_probe` | `number.<prefix>_set_temperature`, `_set_cook_time`, `_set_air_speed`, `_set_probe_temperature` |
| `sel_method` / `sel_preset` / `sel_autocook` | `select.<prefix>_cooking_method`, `_my_presets`, `_autocook_program` |
| `power` / `sw_preheat` | `switch.<prefix>_power`, `switch.<prefix>_preheat` |

A `<prefix>` az entitások közös része, ami a készülék nevéből képződik – a
példagépnél `airfryer_combi_7000_series_xxl_cloud`.
