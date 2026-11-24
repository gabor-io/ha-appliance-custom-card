# tuya-local eszközprofilok

Itt azok a [tuya-local](https://github.com/make-all/tuya-local) eszközprofilok
vannak, amiket ehhez a házhoz készítettünk, és amik a felső projektben még
nincsenek benne. A kártyák nem függenek tőlük – a profil azt dönti el, hogy
egyáltalán *milyen entitások léteznek*, a kártya pedig azt rajzolja, amit
talál.

| Fájl | Készülék | Tuya product id |
| --- | --- | --- |
| `aeno_agh0001s_heater.yaml` | AENO AGH0001S infra fűtőpanel („AENO Premium Heater", kategória `qn`) | `csibqkjs0mijthmw` |

## Telepítés

A tuya-local csak a saját `devices` mappájából olvas, ezért a fájlt oda kell
másolni, és **a tuya-local minden frissítése után vissza kell tenni**:

```bash
cp aeno_agh0001s_heater.yaml /config/custom_components/tuya_local/devices/
```

Utána Home Assistant újraindítás, majd az eszköznél *Beállítások → Eszközök →
Tuya Local → az eszköz → Újrakonfigurálás*, és a listából az új profil.

Ez a kézi visszamásolás szűnik meg, ha a profil bekerül a tuya-local
projektbe – a `products:` blokk már emiatt van benne.

## Miért nem elég a gyári profil

A panel 22 adatpontot küld. A gyári `princess_panel_heater` ebből hatot ír le
(be/ki, célhőmérséklet, szobahőmérséklet és a Fahrenheit-tükreik), a többi
megérkezik és eldobódik – a lefedettsége 27%. Ez a profil 19-et képez le, ami
86%, és a maradék három olyan adatpont, ami egyetlen mérésen sem változott.

A `climate` blokk szerkezete szándékosan azonos a gyárival
(`translation_only_key: heater`), hogy a már felvett panelek entitás-azonosítói
és előzményük megmaradjanak. Két értékhatár tér el, mert a készülék többet tud,
mint amit a gyári leír: a célhőmérséklet 0–40 °C (32–104 °F) a gyári 0–37 °C
helyett.

Mit ad a gyárihoz képest: fűt-e épp (`hvac_action`), Smart/Folyamatos mód,
pillanatnyi teljesítmény és összfogyasztás, feszültség és áram, a fűtőlap saját
hőmérséklete, gyerekzár, a lap maximális hőfoka, időzítő (Ki, 1–24 óra),
mennyezeti szerelés és a visszajelző fényereje.

A levezetés és a mérések: [`../docs/aeno-capabilities.md`](../docs/aeno-capabilities.md).

## Fisher F-ERVQ-B150CO2-I

Ehhez **nincs** saját profil: a gyári `fisher_ervq_hd_hrv` a készülék 13
adatpontjából 12-t lefed (92%). Az egyetlen kimaradó a 120-as, ami állandó
`"1"` – méréssel kizártuk, hogy a távirányító LOCK gombjához köze lenne.

A gyári profilban a `products:` blokk `id: UNKNOWN`-nal ki van kommentezve; a
készülék valódi product id-ja **`swvgufvbhmpxhut9`**, ha valaki beküldi.
