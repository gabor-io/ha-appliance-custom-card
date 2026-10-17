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


> A „mióta nyitva" a `last_changed`-ből jön, amit a Home Assistant újraindítás
> után nulláz, és egyes kontaktok egy-két másodperces hamis záródása is
> visszaállít. Mindkettő **rövidebbnek** mutatja a nyitást a valóságnál, tehát
> a figyelmeztetés legfeljebb késik, hamisan sosem szólal meg.

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
| `entities` | automatikus | a szobák climate entitásai |
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
| `show_openings` | `true` | nyitásérzékelők |
| `show_batteries` | `true` | elemszintek |
