# AENO infrapanel kártya – mit lát a kártya

A kártya az [AENO AGH0001S](https://aeno.com/) infra fűtőpanelt mutatja, amit
a [tuya-local](https://github.com/make-all/tuya-local) hoz be Home
Assistantba. Ez az integráció minden entitást egy YAML **eszközprofilból**
épít, tehát hogy mi létezik egyáltalán, az a profilon múlik – a kártya ezért
mindkettővel működik, és csak azt rajzolja ki, amit tényleg megtalál.

## A két profil

| | gyári `princess_panel_heater` | a panel saját profilja |
| --- | --- | --- |
| be/ki, célhőmérséklet, szobahőmérséklet | ✓ | ✓ |
| °C / °F váltó | ✓ | ✓ |
| fűt-e épp (`hvac_action`) | – | ✓ |
| Smart / Folyamatos mód | – | ✓ |
| pillanatnyi teljesítmény, össz fogyasztás | – | ✓ |
| a **lap** saját hőmérséklete | – | ✓ |
| gyerekzár, lap max. hőfoka, időzítő | – | ✓ |
| feszültség, áram, mennyezeti szerelés, visszajelző fényereje | – | ✓ |

A gyári profil a panel 22 adatpontjából hetet ír le; a többi megérkezik, és
eldobódik. A saját profil ugyanezeket a dps-eket képezi le, és a `climate`
blokkot **változatlanul** átveszi a gyáritól, hogy a meglévő entitások
azonosítója és előzménye megmaradjon.

## Entitások

| Mire | Hogyan találja meg |
| --- | --- |
| a panel | `climate` a `tuya_local` platformon, `translation_key: heater` |
| szobahőmérséklet | a `climate` entitás `current_temperature` attribútuma |
| lap hőmérséklete | az eszköz egyetlen `temperature` osztályú szenzora |
| teljesítmény, fogyasztás | `power`, illetve `energy` osztályú szenzor |
| gyerekzár | `lock`, `translation_key: child_lock` |
| lap max. hőfoka | `number`, `translation_key: maximum_temperature` |
| időzítő | `select`, `translation_key: timer` + `sensor` `time_remaining` |
| nyitásérzékelők | `binary_sensor`, `device_class: window`, a panel területén |

**A nevükből semmit nem találna meg.** Mindkét panel ugyanazt a
`friendly_name`-et adja („AENO Smart Heater"), mert az appban is így hívják
őket – ezért a kártya címe a **területről** jön, a szerkesztő eszközválasztója
pedig kiírja a szoba nevét is. Ugyanezért nincs az entitás-azonosítóra épülő
találgatás sehol: a tuya-local a profil fordítási kulcsaiból képzi őket, tehát
magyar Home Assistanton `select.aeno_smart_heater_homerseklet_mertekegysege`
lesz belőlük, angolon más.

## Amit az eszközön tanultunk

**A Folyamatos mód nem veszi figyelembe a beállított hőfokot.** A panel két
szabályozási módot ismer: Smart (az appban SMART) és Folyamatos (Constant). A
diagnosztikai mintákon látszik, hogy Folyamatos módban 24 °C-os szobában,
24 °C-os célnál is `heating` a jelzés, Smart módban ugyanott `idle`. Ez a
panel egyetlen csapdája: ott felejtve egész nap fűt. A kártya ezért külön
figyelmeztetést ír ki rá, nem csak egy megnyomott gombot mutat.

**A lap hőmérséklete nem a szobáé.** Az eszköz két hőmérsékletet küld: a
szobáét (20–24 °C a méréseken) és a sajátját, ami fűtés közben negyed óra
alatt 25-ről 70 °C-ra ment. A rajz izzása ez utóbbit követi, nem a fűtési
jelzést: egy perce bekapcsolt panel már „fűt", de még nem sugároz semmit, és a
kép nem állíthatja az ellenkezőjét.

**A fogyasztásmérő önmagával igazolható.** `dps 12 = 802 W`, és ugyanabban a
pillanatban `dps 107/10 × dps 108/1000 = 235,1 V × 3,424 A = 805 W` – 0,4 %
eltérés. Az energiaszámláló 16 perc alatt 112 Wh-val nőtt, ami ~800 W mellett
pont 8,4 perc elemidő. Az `energy` szenzor `total_increasing`, kWh-ban, tehát
a **Home Assistant energia felületére** egyből felvehető egyedi eszközként.

**A panel akkor is jelez fűtési igényt, amikor ki van kapcsolva.** A `dps 11`
a termosztát igényét mondja, nem azt, hogy megy-e az elem. A tuya-local ezt
kezeli (kikapcsolt gépnél `off`-ot ad vissza), de a profilban ezért van
megjegyzés mellette.

## Nyitásérzékelők

A párosítás a panel **területe** alapján megy, tehát nem kell felsorolni
semmit:

```yaml
openings:
  auto: true                  # terület alapján (alapértelmezés)
  classes: [window]           # alapból csak ablak; a `door` opcionális
  entities: []                # kontaktus, aminek nincs területe
  ignore: []                  # szándékosan nyitva hagyott szellőző
open_delay: 30                # ennyi másodperc után szól
```

Bukó-nyíló ablaknál a két kontaktus **egy ablak**: ha csak a felső nyitott,
az bukó állapot, ha mindkettő, akkor teljesen nyitva van. A `_top`/`_bottom`,
`_felso`/`_also` és `_upper`/`_lower` szóalakokat magától párosítja, bárhol
álljanak az azonosítóban.

Álló panelnél csak halvány jelvény kerül a fejlécbe, figyelmeztetés nem: a
nyitott ablak akkor kerül pénzbe, ha a panel épp fűt.

## Beállítások

| Kulcs | Alapérték | Mit csinál |
| --- | --- | --- |
| `entity` | – | a panel `climate` entitása |
| `device` | – | entitás helyett eszköz (a szerkesztő ezt állítja) |
| `name` | a terület neve | a kártya címe |
| `language` | `auto` | `hu`, `en` vagy a HA nyelve |
| `sources.temperature` | – | szobában mérő hőmérő, a panel sajátja helyett |
| `sources.humidity` | – | páratartalom |
| `sources.power` / `.energy` | a profil szenzorai | konnektormérő, ha van |
| `show_art` | `true` | panelrajz |
| `show_setpoint` | `true` | a beállított hőfok a panel üvegén |
| `show_readings` | `true` | mért értékek a fejlécben |
| `show_modes` | `true` | be/ki sáv |
| `show_presets` | `true` | Smart / Folyamatos |
| `show_extras` | `true` | gyerekzár, lap max., időzítő törlése |
| `show_openings` | `true` | nyitásérzékelők |
| `compact` | `false` | kisebb rajz, szűkebb margók |
| `animate` | `true` | animációk |

Ha egyetlen panel van a rendszerben, az `entity` és a `device` is elhagyható.
Kettőnél viszont **nem**: a kártya ilyenkor kiírja, hogy válassz, ahelyett
hogy véletlenszerűen az egyiket mutatná.

## A panel rajza

Infrapanelről van szó: a hőt a lap **síkjából kifelé** sugározza, nem felszálló
légárammal, mint egy konvektor. A rajzon ezért meleg glória veszi körbe, és
abból indulnak kifelé a hullámok. Falra szerelve nincs lába, a vezérlődoboz a
jobb szélen ül a zöld visszajelzővel.

Keskeny kártyán – telefonon álló nézetben ez tipikusan 390 képpont – a rajz
nem tűnik el, hanem a felső sorba kerül, teljes szélességben, alatta az
állapottal és a hőfokállítóval. A `show_art: false` viszont tényleg elhagyja.

A valódi panelen **nincs kijelző**. A beállított hőfok mégis rajta van a
kártya rajzán – de vésett felirattá halványítva, nem világító számként, mert a
kártya kiegészítése, nem a hardver része.
