# Škoda autó kártya – mit tud és honnan

A kártya a [MySkoda](https://github.com/skodaconnect/homeassistant-myskoda)
integráció entitásait olvassa, és **csak állapotot jelez ki: soha nem hív
szolgáltatást, nem vezérli az autót.** Az egyetlen interakció az, hogy egy sorra
kattintva megnyílik az adott entitás Home Assistant-beli adatlapja (more-info).

## Entitásfelismerés

A MySkoda entitások neve fordított, ezért az entitás-azonosítót a Home Assistant
az **angol** névből képzi (`binary_sensor.superb_combi_door_front_left`). Két
szenzorpár neve azonos („Next Inspection”, „Oil Service”), így a második `_2`
végződést kap. Emiatt a kártya elsősorban az **entitásregisztert** használja: ott
megtalálja az integráció saját `translation_key` értékét, ami egyértelmű. Ha a
regiszter nem elérhető, visszaesik az objektum-azonosító illesztésére, és minden
entitás felülírható a `entities:` blokkban.

- `device:` – a jármű device_id-ja (a vizuális szerkesztőben legördülő lista)
- `prefix:` – az objektum-azonosítók közös előtagja (pl. `superb_combi`)
- `entities:` – kulcsonkénti felülírás (lásd [`examples/car.yaml`](../examples/car.yaml))

## Felülnézeti rajz

Egyetlen SVG, a kombi arányaival (4902 × 1849 mm). Minden mozgó elem külön
csoport, így az állapotváltozás csak egy CSS-osztályt kapcsol – a rajz nem épül
újra, az animációk nem indulnak újra.

| Elem | Forrás | Megjelenés |
| --- | --- | --- |
| Négy ajtó | `door_open_front_left` … `door_open_rear_right` | nyitáskor a zsanér körül kifordul (900 ms), a lap borostyánsárga lesz, alatta látszik a sötét ajtónyílás |
| Négy ablak | `window_open_front_left` … `window_open_rear_right` | lehúzva **pirosan villog** az adott ajtó ablaka |
| Csomagtartó | `trunk_open` | a hátsó lap a tetőél felé „felnyílik”, alatta a sötét csomagtér |
| Motorháztető | `bonnet_open` | a motorháztető a szélvédő felé „felnyílik”, alatta a sötét motortér |
| Tetőablak | `sunroof_open` | ha az autó jelenti: szaggatott kerettel, nyitva pirosan (a Superb Combi `UNSUPPORTED`-ot küld, ilyenkor nincs kirajzolva) |
| Parkolófény | `parkinglights_on` | első és hátsó lámpák felizzanak |
| Elérhetőség | `vehicle_reachable` | offline autónál a rajz elhalványul és kiszürkül |

A fényezés a világos/sötét témához igazodik (`hass.themes.darkMode`), a
karosszéria ezüst marad. Részletek: tetősín, panoráma-tetőüveg, ablaktörlők,
antenna, kilincsek, rendszámtábla-hely, tanksapka, első rács, hátsó lámpák.

## Mindig látható blokk

- **Állapot**: Parkol / Úton (`vehicle_in_motion`) / Nem elérhető (`vehicle_reachable`),
  mellette a parkolási cím a `device_tracker` `parking_address` attribútumából
  (ha nincs, a zóna neve).
- **Zárás**: a fejléc plakettje a `vehicle_lock` (illetve `doors_lock`) alapján.
  Figyelem: a MySkoda ezeket `lock` device_class-szal adja, ahol a `on` a
  **nyitott** állapot – a kártya ezt fordítja.
- **Üzemanyag / töltöttség** csík: `fuel_level`, `gas_level` vagy
  `battery_percentage`, mellette a hatótáv (`range`, ennek hiányában
  `combustion_range` / `electric_range` / `gas_range`). 25 % alatt sárga,
  10 % alatt piros.
- **Km óra**: `mileage`.
- **Chipek**: mozgásban, online/offline, csatlakoztatott töltőkábel.

## Figyelmeztetések

Nyitott ajtó, lehúzott ablak (piros), nyitott csomagtartó/motorháztető/tetőablak,
lezáratlan autó, égve maradt parkolófény, nem elérhető autó. Kettőnél több
nyitott ajtó vagy ablak esetén egy összevont sor jelenik meg („4 ajtó nyitva”).
Ha minden zárva, egyetlen zöld sor: „Minden nyílászáró zárva”.

## Nyitható szekciók

| Szekció | Tartalom |
| --- | --- |
| Menetadatok | külső hőmérséklet, AdBlue hatótáv, másodlagos hatótávok, gáz-/akkumulátorszint |
| Utak | utolsó út (táv, idő, átlagsebesség, fogyasztás) és az összesített statisztika; a percben érkező időket órára váltja |
| Szerviz | következő vizsga (nap és km), olajcsere (nap és km), szoftververzió |
| Töltés | töltési állapot, teljesítmény, sebesség, hátralévő idő, cél töltöttség (csak elektromos/hibrid modelleknél) |
| Klíma | a `climate` entitás állapota és hőmérsékletei – csak kijelzés; ha az autó alszik, `INVALID` állapotot küld, ilyenkor rejtve marad |
| Pozíció és rendszer | cím, akkumulátor-védelem, utolsó adat, utolsó művelet, utolsó szervizesemény, camping mód vége |
| További entitások | `show_extra: true` esetén a jármű minden olyan szenzora és bináris szenzora, amelyre a kártyának nincs külön sora |

A nyitott szekciókat a kártya megjegyzi, így egy állapotfrissítés nem csukja be
őket.

## Amit a MySkoda nem ad (ezért a kártyán sincs)

- **Vezetési pontszám** (napi/heti/havi) – az API küldi, de az integráció nem
  hoz létre hozzá entitást.
- **Figyelmeztető lámpák / health** – szintén nincs entitása.
- **Töltési adatok dízel autónál** – a `charging` végpont hibát ad, így ezek a
  sorok üresen maradnak (a szekció ilyenkor meg sem jelenik).

## Beállítások

| Kulcs | Alap | Jelentés |
| --- | --- | --- |
| `device` | automatikus | a jármű device_id-ja |
| `prefix` | automatikus | objektum-azonosító előtag |
| `entities` | – | entitás-felülírások |
| `name` | eszköz neve | fejléc felirat |
| `language` | `auto` | `hu` / `en` |
| `compact` | `false` | kisebb rajz és sűrűbb elrendezés |
| `animate` | `true` | animációk ki/be |
| `show_alerts` | `true` | figyelmeztetések |
| `show_drive` | `true` | Menetadatok |
| `show_trip` | `true` | Utak |
| `show_service` | `true` | Szerviz |
| `show_charging` | `true` | Töltés |
| `show_climate` | `true` | Klíma |
| `show_system` | `true` | Pozíció és rendszer |
| `show_extra` | `false` | További entitások |
