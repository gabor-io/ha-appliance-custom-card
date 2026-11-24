# Beküldés a make-all/tuya-local projektbe

Két külön PR, mert a projekt szabálya: **egy eszköz = egy PR, saját ágon**.
A PR-sablon néhány dolgot kifejezetten kér, ezek már be vannak tartva:

- **Ne módosítsd a `DEVICES.md`-t és az `ACKNOWLEDGEMENTS.md`-t** – ütközésveszély
  miatt a karbantartó maga vezeti őket.
- **Ne force-pusholj** a beküldés után, csak ütközés feloldásakor.
- **Rövid leírás.** A sablon szó szerint kéri, hogy ne legyen több oldalas,
  AI-val generált történet. Az alábbi szövegek ezért rövidek.
- A sablon azt is kéri, hogy aki beküldi, **értse, mi van benne**. Lentebb van
  egy pár soros összefoglaló, amivel egy review-kérdésre válaszolni tudsz.

---

## 1. PR – az AENO profil (új fájl)

**Ág:** `aeno-agh0001s-heater`
**Fájl:** `custom_components/tuya_local/devices/aeno_agh0001s_heater.yaml`
**Tartalom:** a repó `tuya/aeno_agh0001s_heater.yaml` fájlja, változtatás nélkül.

**PR cím:**

```
Add config for AENO AGH0001S panel heater
```

**PR leírás:**

```
AENO AGH0001S infrared panel heater (Tuya category qn, sold as "AENO Premium Heater").

These heaters currently match princess_panel_heater, which describes 6 of the 22 dps
the device sends. This config describes 19 of them, adding: heating/idle action,
smart vs constant mode, power, cumulative energy, voltage, current, the panel's own
surface temperature, child lock, maximum panel temperature, a timer (off plus 1-24h)
and the indicator brightness.

The climate and temperature unit entities are kept exactly as princess_panel_heater
has them, so heaters moved to this config keep their entity ids and history. The one
difference is the setpoint range: this device accepts 0-40C (32-104F), princess has
0-37C.

Mapped from 14 diagnostics snapshots of two units, changing one setting at a time in
the AENO app. dps 21, 103 and 104 are left out because no snapshot showed them change.
```

## 2. PR – a Fisher product id (meglévő fájl)

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

**PR cím:**

```
Add product id to fisher_ervq_hd_hrv
```

**PR leírás:**

```
The product id was unknown in this config. Read from the device's own LAN broadcast
(tinytuya scan) on an F-ERVQ-B150CO2-I: swvgufvbhmpxhut9.

No other change. The config already matches the device; it describes 12 of the 13 dps
it sends.
```

---

## Lépések

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
