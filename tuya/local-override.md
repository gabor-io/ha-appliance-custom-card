# Hogy a saját profil túlélje a tuya-local frissítéseket

## Miért van erre szükség

A tuya-local a `get_config()`-ban így keresi a profilt:

```python
_CONFIG_DIR = dirname(config_dir.__file__)   # custom_components/tuya_local/devices
fpath = join(_CONFIG_DIR, conf_type + ".yaml")
```

Nincs benne felhasználói könyvtár, környezeti változó, semmi: a profilnak az
integráció saját `devices/` könyvtárában kell lennie. A HACS viszont
frissítéskor ezt a könyvtárat cseréli, tehát a bemásolt fájl eltűnik.

Ha eltűnik, az `async_setup_entry` ezt teszi:

```python
device_conf = await hass.async_add_executor_job(get_config, entry.data[CONF_TYPE])
if device_conf is None:
    _LOGGER.error(NOT_FOUND, config[CONF_TYPE])
    return False
```

Vagyis a panel bejegyzése **véglegesen elhasal** (nem `ConfigEntryNotReady`,
nincs újrapróbálkozás), az entitásai eltűnnek, a naplóban pedig ott lesz a
„not found" hibasor. Innen csak a fájl visszamásolása és egy újratöltés segít.

## A) Visszamásoló automatizmus – ez a kevesebb munka

A profilok „igazi" helye egy olyan könyvtár legyen, amihez a HACS nem ér hozzá:

```
/config/tuya_local_profiles/aeno_agh0001s_heater.yaml
```

### `configuration.yaml`

```yaml
shell_command:
  tuya_local_profilok: >-
    sh -c 'rc=0; src=/config/tuya_local_profiles;
    dst=/config/custom_components/tuya_local/devices;
    for f in "$src"/*.yaml; do [ -e "$f" ] || continue;
    t="$dst/$(basename "$f")";
    cmp -s "$f" "$t" || { cp -f "$f" "$t" && rc=1; }; done; exit $rc'
```

A `shell_command` a Home Assistant konténerében fut, a `/config` pedig onnan
írható, szóval a másoláshoz nem kell se addon, se SSH. A kilépési kód mondja
meg, kellett-e másolni: `0` = minden a helyén volt, `1` = visszaállítottunk
valamit.

### Automatizmus

```yaml
alias: tuya-local saját profilok visszaállítása
mode: single
trigger:
  - platform: homeassistant
    event: start
action:
  - service: shell_command.tuya_local_profilok
    response_variable: masolas
  - condition: template
    value_template: "{{ masolas.returncode == 1 }}"
  - service: persistent_notification.create
    data:
      title: tuya-local profil visszaállítva
      message: >-
        A frissítés letörölte a saját eszközprofilt, visszamásoltam.
        A Home Assistant mindjárt újraindul, hogy betöltse.
  - delay: "00:00:10"
  - service: homeassistant.restart
```

Ahogy ez működik: normál indulásnál a `cmp` egyezik, a feltétel megáll, nem
történik semmi. Egy tuya-local frissítés utáni első induláskor a fájl hiányzik,
visszakerül, kapsz egy értesítést, és a HA egyszer újraindul – utána a panel
megint ott van.

**Nem tud végtelen újraindulási körbe esni:** a másolás után a két fájl már
egyezik, tehát a következő induláskor a kilépési kód `0`. Ha a másolás maga nem
sikerülne (írásvédett cél), az `rc` nem áll 1-re, tehát akkor sem indul újra –
csak a panel marad hiányzó, ami a naplóból látszik.

Egy újraindulás az ára frissítésenként. Ha ez bántja: a `homeassistant.restart`
helyett `homeassistant.reload_config_entry` is elég, de ahhoz a panel
bejegyzésének `entry_id`-ja kell (a `/config/.storage/core.config_entries`
fájlban van meg), és a bejegyzés ekkor már elhasalt állapotban van, szóval csak
`entry_id`-val célozható, eszközzel vagy entitással nem.

**Nem teszteltem a te rendszereden** – a logikát a forrásból vezettem le, de a
`shell_command` idézőjelezése az a fajta dolog, ami első próbálkozásra el tud
hasalni. Ha nem megy, a napló `shell_command` sora megmondja, miért.

## B) Fork + HACS custom repository

Ez is tiszta út, csak több vele a munka.

1. Fork a `make-all/tuya-local`-ról.
2. A forkba bekerül a profil (ez a commit a te ágadon él).
3. HACS-ban az eredeti tuya-local **eltávolítása** – két repó nem adhatja
   ugyanazt a `tuya_local` domaint.
4. HACS → Custom repositories → a forkod, típus: Integration.

Amivel számolni kell:

- **A HACS kiadásokból (tagokból) telepít, a fork pedig az upstream tagjait
  örökli – azokban nincs benne a te commitod.** Tehát minden upstream-merge
  után saját tagot és kiadást kell nyomni a forkban, különben a HACS olyan
  verziót telepít, amiben nincs ott a profil.
- Frissítéskor neked kell behúznod az upstream változásait a forkba.
- Az „update available" jelzés is a forkodtól jön, nem az upstreamtől.

Ez akkor éri meg, ha hosszú távon több saját módosítást viszel a tuya-localban.
Egyetlen profilhoz az A) változat kevesebb vesződés, és maradsz az upstream
kiadásain.

## Amiért a beküldés ettől függetlenül megy

Mindkét fenti megoldás ideiglenes: ha a profil bekerül az upstreambe, az egészet
ki lehet dobni, és a panel a gyári kiadásban lesz támogatott. A beküldés
lépései: [`upstream-pr.md`](upstream-pr.md).
