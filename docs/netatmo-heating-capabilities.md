# Netatmo fűtés kártya – mit lát a kártya

A kártya a Home Assistant beépített
[`netatmo`](https://www.home-assistant.io/integrations/netatmo/) integrációjára
épül: egy `climate` entitás minden fűtött szobára, egy `select` a ház
ütemtervére, és fejenként egy elemszint-szenzor.

## Entitások

| Mire | Hogyan találja meg |
| --- | --- |
| szobák | minden `climate` entitás a `netatmo` platformon |
| ütemterv | az egyetlen `select` a `netatmo` platformon |
| elemszintek | `sensor`, `device_class: battery`, a szoba területén |
| nyitásérzékelők | `binary_sensor`, `device_class: window`, a szoba területén |

**Szobahőmérséklet-szenzor nincs**, és a kártya nem is keres ilyet. A Netatmo
fűtési eszközei (szelep, termosztát) kizárólag elemszint-szenzort hoznak
létre; a hőmérséklet a climate entitás `current_temperature` attribútumában
van. Önálló hőmérséklet-szenzor csak ott létezik, ahol időjárás-állomás modul
is van – és az másik eszköz.

## Három dolog, amit élő rendszeren tanultunk

**A termosztát nem jelent fűtési igényt.** A szelepek `heating_power_request`
attribútumot adnak 0–100 %-ban, a Smart Thermostat viszont **nem** – nála a
kulcs egyszerűen nem létezik. Ez nem nulla: ha nullaként kezelnénk, a
termosztátos szoba sötét maradna fűtés közben is. A kártya ezért megnézi, hogy
létezik-e a kulcs, és ha nem, a `hvac_action`-re támaszkodik. A százalékos sáv
ilyenkor elmarad – nincs mit mutatni.

**Egy elhallgatott szelep megtartja az entitását.** Lemerült elemnél a climate
entitás `unavailable` lesz, de nem tűnik el: minden attribútuma elvész, a
hőmérséklet és a cél is. A kártya ezt külön állapotként mutatja („Nem
válaszol"), nem hihető nullákkal tölti ki.

**A terület az eszközön van, nem az entitáson.** A nyitásérzékelők
`area_id`-je a regiszter entitás-rekordjában `null`; a terület az eszközről
öröklődik. A kártya ezért mindkettőt megnézi – enélkül egyetlen ablakot sem
találna meg.

## Nyitásérzékelők

A kártya területi egyezés alapján párosítja őket a szobákhoz, tehát nem kell
felsorolnod semmit:

```yaml
openings:
  auto: true                  # terület alapján (alapértelmezés)
  classes: [window]           # alapból csak ablak; a `door` opcionális
  ignore:
    - binary_sensor.belso_ajto
  rooms:                      # terület nélküli érzékelők kézzel
    climate.halo_szoba:
      - binary_sensor.terasz_ajto
```

**Alapból csak a `window` osztály számít.** Egy mosogatógép ajtaja (`opening`)
és egy sütőfiók (`door`) nem huzat, az autó ajtaja és ablaka pedig a saját
területén ül – a területi párosítás ezeket eleve kizárja.

**Figyelmeztetés csak akkor**, ha a szoba épp fűt. Nyitott ablak kikapcsolt
fűtés mellett nem hír; ilyenkor csak halvány jelzés kerül a szoba neve mellé.
A küszöb 30 másodperc (`open_delay`), mert valódi szellőztetés már 47
másodperctől előfordul, a kontaktpattogás viszont másodperc alatti.

Ahol **nincs** érzékelő, a kártya ezt ki is írja („nincs érzékelő") – nem tesz
úgy, mintha zárva lenne.

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

A párosítás az azonosítóból megy, és a pozíciószó **bárhol** lehet benne, nem
csak a végén. Éles rendszeren ugyanis így néznek ki:

```
binary_sensor.<szoba>_window_top_sensor_street_contact
binary_sensor.<szoba>_window_bottom_sensor_street_contact
```

A pozíció középen ül, az utolsó szó pedig azt mondja meg, a szoba *melyik*
ablakáról van szó. A kártya a pozíciószót kiveszi, és ami marad, az a közös
alap – így talál egymásra a két kontaktus:

```
<szoba>_window_top_sensor_street     ->  <szoba>_window_sensor_street
<szoba>_window_bottom_sensor_street  ->  <szoba>_window_sensor_street
```

Ugyanebből következik, hogy a szoba **másik** ablaka külön marad, mert az
utolsó szava más (`..._garden`).

Alapból a `_top`/`_bottom`, `_felso`/`_also` és `_upper`/`_lower` szavakat
ismeri fel; az első mindig a **felső** kontaktus. A szónak teljes, aláhúzással
határolt szakasznak kell lennie, tehát a `laptop` és a `rooftop` nem pozíció.
A végén megtűr egy `_contact`, `_sensor`, `_nyitas`, `_allapot` vagy `_state`
szót is.

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


> A „mióta nyitva" a `last_changed`-ből jön, amit a Home Assistant újraindítás
> után nulláz, és egyes kontaktok egy-két másodperces hamis záródása is
> visszaállít. Mindkettő **rövidebbnek** mutatja a nyitást a valóságnál, tehát
> a figyelmeztetés legfeljebb késik, hamisan sosem szólal meg.

## Egy szoba kártyája

A kártyának két nézete van. Alapból az egész házat mutatja. Ha **egy szobát**
adsz meg, szobakártyává alakul:

```yaml
# a szoba climate entitásával
type: custom:netatmo-heating-card
entity: climate.halo_szoba

# vagy a vizuális szerkesztőben: válaszd ki az eszközt a listából
type: custom:netatmo-heating-card
device: 1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d
```

A Netatmo-nál egy szobához **egy** climate entitás tartozik – a szoba
kívánt hőfoka –, amit az integráció valamelyik fejhez regisztrál. A szoba
többi feje csak elemszenzort hoz létre. Ezért „a termosztát kiválasztása" és
„a szoba kiválasztása" ugyanaz a döntés: a kártya a szoba összes fejét
mutatja, nem csak azt az egyet, amelyiket kiválasztottad.

Mi változik a házkártyához képest:

| | Egész ház | Egy szoba |
| --- | --- | --- |
| fejléc | „Fűtés", 5 szoba, 8 fej | a szoba neve, hány fej van benne |
| rajz | a fali termosztát, a ház fűtésére világít | **ennek a szobának** az eszköze, a saját igényére |
| főcím | „2 szobában megy a fűtés" | „Fűt 21 °C-ra" / „21 °C-ot tart" |
| nagy szám | kinti hőmérséklet | **a szoba** hőmérséklete |
| fűtési igény | soronként | a főcím alatt, sávval |
| üzemmód-sáv | ott van | **nincs** (lásd lent) |
| programválasztó | ott van | **nincs** |
| szobalista | minden szoba | nincs – a kártya maga a szoba |
| vezérlők | a sort kinyitva | rögtön láthatóak |

**A házmód nem vezérlő a szobakártyán.** A Netatmo az üzemmódot (ütemterv /
távollét / fagyvédelem) az egész házra állítja, és egy szoba csempéjéről az
egész házat átbillenteni könnyű baleset. Viszont *látszik*: a fejlécben
jelvényként, és a főcím alatt szövegként – mert ez magyarázza meg, miért áll
7 °C-on a szoba. Ha mégis kell rá, kapcsold be:

```yaml
show_modes: true
```

A `view` kulccsal mindkét irányban felülbírálható a választás:

```yaml
view: room     # szobakártya akkor is, ha a ház egyetlen szobából áll
view: house    # házkártya akkor is, ha egy szobát adtál meg
```

## Elemszintek

A Netatmo lépcsős skálát ad (90 / 75 / 50 …), nem valódi százalékot, ezért a
küszöb **30 % alatt figyelmeztet, 15 % alatt riaszt** – két lépcső közé esik,
így nem szólal meg kétszer ugyanarra a szintre.

Egy fej, ami **semmit** nem jelent, rosszabb, mint egy alacsony szám: az azt
jelenti, hogy az eszköz már nem jelentkezik be. Erre külön üzenet van.

A fejek címkéje az entitás-azonosítóból készül, nem a nevéből: három szobában
két-két fej **pontosan ugyanazt a friendly_name-et** viseli, így a néven
alapuló címke megkülönböztethetetlen sorokat adna. Az azonosítóból „window" és
„slim radiator" lesz.

## Beállítások

| Kulcs | Alapérték | Mit csinál |
| --- | --- | --- |
| `entity` | – | **egy** szoba climate entitása → szobakártya |
| `device` | – | ugyanaz, eszközzel (ezt írja a vizuális szerkesztő) |
| `entities` | automatikus | a szobák climate entitásai |
| `view` | automatikus | `room` vagy `house`, felülírja a választást |
| `schedule_entity` | automatikus | az ütemterv-választó |
| `name` | „Fűtés" | fejléc felirat |
| `rooms` | – | szobánkénti név felülírás |
| `sources.outside` | – | kültéri hőmérséklet entitás |
| `sources.outside_connectivity` | – | a kültéri modul csatlakozás-jelzője |
| `openings` | lásd fent | nyitásérzékelők (`pairs`, `windows` is) |
| `open_delay` | `30` | ennyi másodperc után szól a nyitott ablakról |
| `language` | `auto` | `hu` / `en` |
| `compact` | `false` | sűrűbb elrendezés |
| `animate` | `true` | animációk ki/be |
| `show_art` | `true` | készülékrajz |
| `show_schedule` | `true` | ütemterv-választó |
| `show_modes` | a nézet szerint | házmód-sáv: házkártyán igen, szobakártyán nem |
| `show_openings` | `true` | nyitásérzékelők |
| `show_batteries` | `true` | elemszintek |
