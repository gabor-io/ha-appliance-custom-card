# Beküldés a make-all/tuya-local projektbe

## Miért nem megy PR-ral

A GitHub ezt írta a PR nyitásakor:

> You are not authorized to create pull requests in this repository.
> The repository owner has restricted who can propose changes.

Ez nem a te beállításod és nem is hiba: a karbantartó zárta le a PR-nyitást.
A projekt saját issue-sablonjában (`.github/ISSUE_TEMPLATE/new-device.yaml`)
szó szerint ott van az indok is:

> Note: with current workload, only the first two priorities are being worked
> on, and PRs have been temporarily paused due to overloading with level 5
> priority requests.

Tehát a jelenleg nyitva lévő út a projekt **két saját issue-sablonja**. Ezekre
alább kész, bemásolható szöveg van. A lenti utolsó szakaszban megmaradt a két
PR-leírás is, ha a tiltás feloldódik.

## A projekt sorrendje – ez dönti el, mit érdemes beküldeni

Ugyanaz a sablon kiírja, milyen sorrendben dolgozzák fel a beküldéseket:

1. jól megírt pull request
2. jól megírt issue, warning szintű loggal (local dps) **és** a
   QueryThingsDataModel API eredménye eredeti formában
3. issue loggal és annyi adatpont-infóval, amiből használható konfig írható
4. AI-val generált PR, ahol a beküldő nem javítja a kért dolgokat
5. issue loggal és kész, letesztelt konfiggal

A 2. szint nekünk nem elérhető: az iot.tuya.com API Explorer a lejárt IoT Core
előfizetés miatt `28841002`-t ad, így a QueryThingsDataModel eredményt nem
tudjuk mellékelni. A **3. szintet** viszont teljesen ki tudjuk szolgálni: log
plusz hiánytalan adatpont-lista.

Ezért a kész YAML **nem** a beküldés fő tartalma: egy letesztelt konfiggal
érkező issue a lista legalján van (5. szint). A fájlt a végén egy sorban
felajánljuk, de nem azzal kezdünk.

---

## 1. issue – Fisher product id

A könnyebb a kettő közül. Sablon: **Product details**

<https://github.com/make-all/tuya-local/issues/new?template=product-id.yml>

| Mező | Mit írj bele |
| --- | --- |
| Title | `Report a match for existing Heat recovery ventilator (fisher_ervq_hd_hrv)` |
| Product ID | `swvgufvbhmpxhut9` |
| Manufacturer / Brand | `Fisher` |
| Model | `F-ERVQ-B150CO2-I` |
| Upload diagnostics | a szellőztető diagnosztikai exportja (lásd lentebb) |

A sablonnak nincs szabadtext mezője, ezért amit el kell mondani, azt az issue
megnyitása után **egy hozzászólásban** tedd hozzá:

```
Two things the form has no field for:

The product id is not from the HA log: this device was added before tuya-local
read product ids, so I read it from the device's own LAN broadcast with
`tinytuya scan`. The config's products block is currently commented out with
`id: UNKNOWN`.

The match is not quite exact: the config describes 12 of the 13 dps the device
sends. The one left out is dp 120, which is a constant "1" on my unit. I had
assumed it was the remote's LOCK (display off) button, but I ruled that out by
diffing two diagnostics exports taken with the display on and off - dp 120 did
not move, and neither did anything else, so the display state does not appear
to leave the device at all. If you would rather have this as a New Device
report because of that one dp, say so and I will move it.
```

Ezzel a karbantartó dönthet: ha neki ez „exact match", beteszi a product idt;
ha nem, átteszi a másik sablonba. Így nem mi állítunk valótlant.

## 2. issue – AENO panel

Sablon: **New Device**

<https://github.com/make-all/tuya-local/issues/new?template=new-device.yaml>

**Title:** `Request support for AENO Premium Heater (AGH0001S)`

### „Log message" mező – ezt előbb elő kell állítani

Ez a mező kötelező, és a sablon kiírja: *„Reports without local logs from this
integration will be immediately closed."* A kért sort a tuya-local a
`config_flow.py`-ban írja ki:

```
Device matches <konfig> with quality of <xx>%. LOCAL DPS: {...}
Include the previous log messages with any new device request to ...
```

Ez az **eszköztípus-választó** képernyőhöz tartozik, ahova egy már felvett
eszköz nem jut el: a config flow előbb elhasal azon, hogy ez a device id már
be van állítva. Tehát:

1. Beállítások → Eszközök és szolgáltatások → Tuya Local → a panel bejegyzése
   → **törlés**.
2. Hozzáadás újra (a panel a hálózaton látszik, a local key megvan).
3. Amikor az „eszköz típusa" kérdésnél vagy, a log már ki van írva:
   Beállítások → Rendszer → Naplók → *Teljes napló megtekintése*, keress rá a
   `LOCAL DPS` szövegre. A `princess_panel_heater` és egy ~27%-os érték fog
   benne lenni (6 adatpont a 22-ből).
4. Másold ki a két warning sort, a dps JSON-nal együtt, **változtatás nélkül**.
5. Fejezd be a hozzáadást normálisan. Az entitás-azonosítók visszajönnek, mert
   a unique id-k nem a bejegyzéstől függenek – a history megmarad.

A `LOCAL DPS` sorban nincs device id és local key, az biztonsággal beküldhető.

### „Product ID" mező

```
csibqkjs0mijthmw
```

### „Product Name" mező

```
AENO Premium Heater (AGH0001S)
```

### „DPS information" mező

```
No QueryThingsDataModel result available: the IoT Core subscription on this
Tuya developer account has expired, so the API Explorer answers 28841002 for
every call. The list below is instead derived from 14 device diagnostics
exports of two units, taken while changing one setting at a time in the AENO
app. The names are my descriptions of what each dp does, not Tuya's own dp
codes, which I have no way to read without the data model.

dp   type     settable  values / range           what it is
1    boolean  yes       true / false             power
2    integer  yes       0-40 (C)                 setpoint, Celsius
3    integer  no        Celsius                  room temperature
4    enum     yes       smart, manual            regulation mode: "smart" follows
                                                 the setpoint, "manual" (the app
                                                 calls it Constant) ignores it
7    boolean  yes       true / false             child lock (confirmed in the app)
8    boolean  yes       true / false             ceiling mount (confirmed in the app)
11   enum     no        heating, idle            the thermostat's demand signal; it
                                                 keeps reporting "heating" while the
                                                 heater itself is switched off
12   integer  no        W                        present power
13   enum     yes       c, f                     temperature unit
14   integer  yes       32-104 (F)               setpoint in F, mirror of dp 2
15   integer  no        Fahrenheit               room temperature in F, mirror of dp 3
19   enum     yes       cancel, 1h, 2h ... 24h   timer, whole hours as the app offers
                                                 them; note this device spells off as
                                                 "cancel", not "0h"
20   integer  no        minutes                  timer remaining
21   integer  ?         always 0                 unknown
101  integer  no        Wh                       cumulative energy
102  integer  yes       60-120 (C)               maximum panel temperature
103  integer  ?         always 248               unknown. 248F is 120C, so most likely
                                                 the Fahrenheit mirror of dp 102 in the
                                                 way dp 14/15 mirror dp 2/3, but no
                                                 snapshot ever showed it change
104  boolean  ?         always false             unknown
105  integer  no        Celsius                  the panel's own surface temperature,
                                                 not a room temperature
106  enum     yes       off, low, medium, high   brightness of the indicator on the
                                                 control box
107  integer  no        0.1 V                    voltage
108  integer  no        mA                       current

The electrical dps corroborate each other, so the scales above are not guesses:

  dp 12 read 802 W while, in the same snapshot,
  dp 107 / 10 * dp 108 / 1000 = 235.1 V * 3.424 A = 805 W, 0.4% apart.

  dp 101 advanced by 112 Wh across a window in which the element ran for about
  8.4 minutes at 802 W - which is 112 Wh.

dp 105 is the panel, not the room: it climbed from 25 to 70 C over a quarter of
an hour of heating while dp 3 stayed at 23-24 C.
```

### „Information about how the device functions" mező

```
AENO AGH0001S infrared panel heater, Tuya category qn, sold as "AENO Premium
Heater". I have two of them.

They currently match princess_panel_heater, which describes dps 1, 2, 3, 13, 14
and 15 - so on/off, setpoint and room temperature work, and the device's power,
energy, voltage, current, panel temperature, timer and settings arrive and are
discarded. The setpoint range also differs: this device takes 0-40 C, princess
is 0-37 C.

How it behaves, for the parts that are not obvious from the dp list:

- dp 4 is the one that decides whether it is a thermostat at all. In "smart" the
  element follows dp 2; in "manual" it heats regardless of the room temperature.
- dp 11 is the thermostat's demand, not whether the element is drawing power. A
  heater switched off at dp 1 can still report "heating", so it is only
  meaningful while dp 1 is true.
- dp 102 is a safety limit for the panel surface (dp 105), not a room setpoint.
  Values from 60 to 120 can be set from the app.
- dp 106 is called the display in the app, although the panel has no display -
  it is the indicator lamp on the control box.

I have a config for this that I have been running locally for a while and that
is tested on both units. I am not pasting it here, because I gather a finished
config is the lowest priority of the five and PRs are paused - but say the word
and I will attach it or open a PR if you reopen them. Either way I can answer
questions about the device and test changes on two units.
```

Ha a terméklap linkjét is odaadnád, az a sablon szerint hasznos – azt tedd az
első bekezdés után.

---

## Lépések sorrendben

1. **Fisher diagnosztika exportálása**: Beállítások → Eszközök → a szellőztető
   → ⋮ → *Diagnosztika letöltése*.
2. **Átnézni a Fisher exportot** a lenti adatvédelmi lista szerint.
3. Fisher issue megnyitása a `product-id.yml` sablonnal, majd a hozzászólás.
4. **AENO log előállítása**: a panel bejegyzésének törlése és újra felvétele,
   a `LOCAL DPS` sorok kimásolása.
5. AENO issue megnyitása a `new-device.yaml` sablonnal.

Ha az issue-nyitás is tiltott lenne („You can't perform that action at this
time"), akkor a projekt a Discussions oldalra irányít:
<https://github.com/make-all/tuya-local/discussions>. Addig is: a helyi
`tuya/aeno_agh0001s_heater.yaml` működik, csak a tuya-local minden frissítése
után vissza kell másolni.

## Mielőtt elküldöd – adatvédelem

A tuya-local a diagnosztikában magától kicseréli `**REDACTED**`-re a
**device id**-t, a **local key**-t és a **host**-ot, szóval azokkal nincs
dolgod. Amit viszont **nem** cserél ki, és a Fisher exportjában ott lehet:

- `"name"` – a bejegyzés neve,
- `home_assistant.name_by_user` – amire te átnevezted az eszközt,
- az entitások `friendly_name` attribútumai.

Ha ezekben szobanév vagy személynév van, nevezd át az eszközt a HA-ban semleges
névre, exportálj újra, és utána töltsd fel. A `LOCAL DPS` naplósorban csak
számok vannak, azzal nincs teendő.

---

## Ha a PR-tiltás feloldódik

Ekkor a két beküldés PR-ként megy, külön ágon – a projekt szabálya: egy eszköz
egy PR. A PR-sablon kérései: ne módosítsd a `DEVICES.md`-t és az
`ACKNOWLEDGEMENTS.md`-t (azokat a karbantartó vezeti, ütközésveszély miatt), ne
force-pushold a beküldést, és a leírás legyen rövid – a sablon kifejezetten
kéri, hogy ne legyen több oldalas, AI-val generált történet.

### PR 1 – az AENO profil (új fájl)

**Ág:** `aeno-agh0001s-heater`
**Fájl:** `custom_components/tuya_local/devices/aeno_agh0001s_heater.yaml`
(a repó `tuya/aeno_agh0001s_heater.yaml` fájlja, változtatás nélkül)

**Cím:** `Add config for AENO AGH0001S panel heater`

```
AENO AGH0001S infrared panel heater (Tuya category qn, sold as "AENO Premium
Heater").

These heaters currently match princess_panel_heater, which describes 6 of the 22
dps the device sends. This config describes 19 of them, adding: heating/idle
action, smart vs constant mode, power, cumulative energy, voltage, current, the
panel's own surface temperature, child lock, maximum panel temperature, a timer
(off plus 1-24h) and the indicator brightness.

The climate and temperature unit entities are kept exactly as princess_panel_heater
has them, so heaters moved to this config keep their entity ids and history. The one
difference is the setpoint range: this device accepts 0-40C (32-104F), princess has
0-37C.

Mapped from 14 diagnostics snapshots of two units, changing one setting at a time in
the AENO app. dps 21, 103 and 104 are left out because no snapshot showed them change.
```

### PR 2 – a Fisher product id (meglévő fájl)

**Ág:** `fisher-ervq-product-id`
**Fájl:** `custom_components/tuya_local/devices/fisher_ervq_hd_hrv.yaml`

A fájl eleje most ez:

```yaml
name: Heat recovery ventilator
# products:
#  - id: UNKNOWN
#    manufacturer: Fisher
#    model: F-ERVQ-B150CO2-I
```

Erre kell cserélni:

```yaml
name: Heat recovery ventilator
products:
  - id: swvgufvbhmpxhut9
    manufacturer: Fisher
    model: F-ERVQ-B150CO2-I
```

**Cím:** `Add product id to fisher_ervq_hd_hrv`

```
The product id was unknown in this config. Read from the device's own LAN broadcast
(tinytuya scan) on an F-ERVQ-B150CO2-I: swvgufvbhmpxhut9.

No other change. The config already matches the device; it describes 12 of the 13 dps
it sends.
```

### Git-lépések

```bash
# fork a GitHubon, majd:
git clone https://github.com/<te>/tuya-local.git
cd tuya-local

git checkout -b aeno-agh0001s-heater
cp <ebbol-a-repobol>/tuya/aeno_agh0001s_heater.yaml custom_components/tuya_local/devices/
git add custom_components/tuya_local/devices/aeno_agh0001s_heater.yaml
git commit -m "Add config for AENO AGH0001S panel heater"
git push -u origin aeno-agh0001s-heater

# a Fisher külön ágon, a main-ről indulva
git checkout main
git checkout -b fisher-ervq-product-id
# szerkeszd a fenti öt sort
git commit -am "Add product id to fisher_ervq_hd_hrv"
git push -u origin fisher-ervq-product-id
```

Mindkét PR a `make-all/tuya-local` `main` ága ellen megy.

## Amit előre ellenőriztem

A PR-sablon kéri, hogy a CI hibák legyenek javítva. Ezeket futtattam a projekt
mostani fő ágával (1794 profil):

| Ellenőrzés | Eredmény |
| --- | --- |
| `yamllint` a projekt saját `.yamllint.yaml`-jával | hibátlan |
| fordítási kulcsok megléte (`en.json`) | `heater`, `temperature_unit`, `child_lock`, `maximum_temperature`, `timer`, `time_remaining` – mind megvan |
| duplikátum-ellenőrzés | 187 profil illeszkedne a készülék adatpontjaira, a miénk fedi le a legtöbbet (86%); a következő 59%, és az egy hőszivattyú. **Nincs 100%-os egyezés**, tehát új fájl a helyes forma |
| van-e már AENO fűtőpanel a projektben | nincs (csak két vízforraló és egy konyhamérleg) |
| a `climate` blokk egyezése a `princess_panel_heater`-rel | szerkezetileg azonos, `translation_only_key: heater`; csak a két értékhatár tér el (0–40 °C / 32–104 °F) |

Amit **nem** tudtam lefuttatni: a projekt saját `pytest` tesztjeit és az `uv run
duplicates` parancsot, mert ahhoz telepített Home Assistant kell. A fenti
duplikátum-számítás ennek a kézi megfelelője.

## Ha a review rákérdez – a lényeg pár mondatban

- A panel 22 adatpontot küld; a gyári `princess_panel_heater` ebből hatot ír le,
  a többi megérkezik és eldobódik.
- A leképezés 14 diagnosztikai mintából készült, két készülékről, úgy, hogy az
  AENO appban egyszerre egy beállítás változott.
- Az elektromos értékek egymást igazolják: `dps 12 = 802 W`, és ugyanabban a
  pillanatban `dps 107/10 × dps 108/1000 = 235,1 V × 3,424 A = 805 W` (0,4%
  eltérés). A `dps 101` 112 Wh-val nőtt egy olyan ablakban, amiben a fűtőszál
  ~8,4 percig ment 802 W-tal – ami pontosan 112 Wh.
- A `dps 11` a termosztát igényét mondja, nem azt, hogy megy-e az elem: kikapcsolt
  panelnél is `heating` lehet. A tuya-local kikapcsolt gépnél úgyis `off`-ot ad
  vissza, ezért ez nem okoz bajt.
- A `dps 4` a szabályozási mód: `smart` a beállított hőfokot követi, `manual`
  (az appban „Constant") figyelmen kívül hagyja.
- A `dps 105` a fűtőlap saját hőmérséklete, nem a szobáé: negyed óra fűtés alatt
  25-ről 70 °C-ra ment, miközben a szoba 23–24 °C maradt.
- A ki nem képezett három adatpont: `dps 21` (mindig 0), `dps 104` (mindig false)
  és `dps 103` (mindig 248, ami 120 °C Fahrenheitben – valószínűleg a `dps 102`
  maximum Fahrenheit-tükre, de ez egyetlen mérésen sem látszott).
