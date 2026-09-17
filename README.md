# Home Appliance Cards

Három Lovelace kártya a háztartáshoz és a garázshoz, közös alapokon:

| Kártya | Készülék | Integráció |
| --- | --- | --- |
| `custom:aeg-dishwasher-card` | AEG / Electrolux mosogatógép (fejlesztve: **GI8200X5TN**) | [TTLucian/ha-electrolux](https://github.com/TTLucian/ha-electrolux) |
| `custom:philips-airfryer-card` | Philips airfryer (fejlesztve: **HD9880 Combi 7000 XXL**) | [renaudallard/homeassistant_philips_homeid](https://github.com/renaudallard/homeassistant_philips_homeid) |
| `custom:skoda-car-card` | Škoda személyautó (fejlesztve: **Superb Combi**) | [skodaconnect/homeassistant-myskoda](https://github.com/skodaconnect/homeassistant-myskoda) |

Mindegyik kártya animált rajzot és valós állapotkövetést ad, magyar és angol
nyelven, világos és sötét témában. A két konyhai kártya vezérel is; **az autó
kártya szándékosan csak állapotot jelez**, szolgáltatást nem hív.

## Mosogatógép kártya

![Mosogatógép kártya](docs/images/dishwasher-light.png)

- **Animált géprajz**: mosogatás közben forgó szórókar, vízsugarak, hullámzó
  vízszint és felszálló buborékok, gőz a szárítási fázisban, csillogás a ciklus
  végén, a gép kijelzőjén a hátralévő idő.
- **Ajtó és bekapcsolt állapot a képen**: nyitott ajtónál a gép ajtaja lehajlik
  és árnyékot vet, kikapcsolt gépnél sötét a kijelző, a jelzőfény és a belső
  világítás is.
- **Mindig látszik, mikor lesz kész**: bekapcsolt gépnél a kártya akkor is
  kiírja a pontos befejezési időpontot (`Elkészül 19:51`), ha a program még el
  sem indult – a géptől kapott időtartamot használja, ami a bekapcsolt
  kiegészítő funkciókat (pl. ExtraDry, ExtraSilent) is tartalmazza, és csak
  ennek hiányában esik vissza a gépkönyv névleges idejére.
- **Futó ciklusnál** a hátralévő idő, a befejezés időpontja és egy
  előrehaladás-sáv. A gép nem küld százalékot, ezért a ciklus alatt látott
  leghosszabb hátralévő időből (illetve a program névleges hosszából) számol.
- **Fázis-idővonal**: Előmosás → Mosogatás → Öblítés → Szárítás; a program által
  nem használt fázisok halványak.
- **Programválasztó** a gépkönyv szerinti nevekkel, víz-/energiafogyasztással.
- **Kiegészítő funkciók** csak ott, ahol az adott program elfogadja őket.
- **Késleltetett indítás** három módon: gyorsgombok 1–12 óráig, ±10 perces
  léptető (a gép ekkora lépéseket fogad el, max. 24 óra), és **„Legyen kész"
  időpont** – megadod, mikorra kell elkészülnie, majd a pipára kattintva a
  kártya kiszámolja a késleltetést, 10 percre lefelé kerekítve (pl. 00:05-kor
  az 5:10-es Eco programmal 07:00-ra kérve 1:40 késleltetés lesz belőle). A
  beírt időpont addig marad, amíg meg nem erősíted. Mindig kiírja, hogy a gép
  mikor indul és mikor lesz kész (`Indul 16:28 · Elkészül 21:38`).
- **Kikapcsolt gépnél nincs félrevezető adat**: nincs kiválasztott program,
  futásidő, kiegészítő funkció és hatékonysági mérce – a programválasztó
  inaktív, a riasztások, a készülékbeállítások és a részletek maradnak.
- **Riasztások magyarul**: sóhiány, öblítőszer-hiány, i10/i20/i30/iF1 hibakódok
  – a kódokat az `alerts` szenzor attribútumaiból olvassa ki (az állapota csak
  a riasztások darabszáma).
- **Eco/energia/víz pontszámok a géptől**, programonként: az Öblítés és
  várakozás, illetve a Gépápolás programnál a gép nem küld pontszámot, ott a
  kártya el is rejti őket; programváltás után pedig halványan jelzi, hogy még a
  régi értékek látszanak, amíg a gép ki nem számolja az újakat.
- Ciklusszám, öblítőszerszint, vízkeménység, Wi-Fi jelminőség, távvezérlés
  állapota.

Részletek: [`docs/dishwasher-capabilities.md`](docs/dishwasher-capabilities.md),
példák: [`examples/dishwasher.yaml`](examples/dishwasher.yaml).

## Airfryer kártya

![Airfryer kártya](docs/images/airfryer-light.png)

- **Animált géprajz**: pörgő ventilátor, izzó fűtőszál, felszálló hő, gőz a
  párolós módokban, pirulő étel.
- **Nyitott / csukott fiók a képen**: csukva egybefüggő előlap, nyitva a fiók
  kicsúszik a néző felé, árnyékot vet, mögötte sötét rés, és felülnézetből
  látszik a kosár a benne lévő étellel. Ugyanez megjelenik figyelmeztető sávként
  (sütés közben „a fiók nyitva – a sütés szünetel”), fejlécikonként és a
  Részletek között; nyitott fióknál az indítás gomb le van tiltva.
- **Rázás- és fordításemlékeztető animációval**: a fiók rázkódik, az étel
  ugrál benne, a fiók körvonala felvillan, mellé villogó figyelmeztető sáv
  (manuális módban a beállított idő felénél szól a gép).
- **Hátralévő idő** perc:másodperc pontossággal, pontos befejezési időponttal és
  előrehaladás-sávval (a gép a teljes és a hátralévő időt is küldi).
- **Hőmérséklet-mérő**: aktuális / cél, és **ételhőmérő** esetén a maghőmérséklet
  külön mérővel, valamint a gépkönyv ajánlott maghőmérséklet-táblázatával.
- **Ételkészítési módok és saját programok** választása, hőmérséklet/idő/
  maghőmérséklet állítása léptetőkkel és gyorsgombokkal, levegősebesség.
- **Állapotfüggő vezérlés**: bekapcsolás, indítás, szünet, leállítás, melegen
  tartás.

Részletek: [`docs/airfryer-capabilities.md`](docs/airfryer-capabilities.md),
példák: [`examples/airfryer.yaml`](examples/airfryer.yaml).

| Sötét téma | Mobil / kompakt |
| --- | --- |
| ![Sötét](docs/images/airfryer-dark.png) | ![Mobil](docs/images/airfryer-mobile.png) |

## Autó kártya

![Autó kártya](docs/images/car-light.png)

**Csak állapotjelzés – a kártya nem vezérli az autót.** Egyetlen interakció van:
egy sorra kattintva megnyílik az adott entitás adatlapja.

- **Felülnézeti rajz**: kombi arányokkal rajzolt SVG (tetősín, panorámatető,
  ablaktörlők, antenna, kilincsek, lámpák, rendszámtábla-hely, tanksapka), a
  témához igazodó fényezéssel.
- **Animált ajtónyitás**: nyitott ajtónál a lap a zsanér körül kifordul,
  sárgára vált, és alatta látszik a sötét ajtónyílás.
- **Lehúzott ablak pirosan**: az érintett ajtó ablaka piros és villog.
- **Csomagtartó és motorháztető** felnyílik, alatta a sötét csomag-, illetve
  motortér; **parkolófénynél** felizzanak a lámpák; **offline** autónál a rajz
  kiszürkül.
- **Műszerfal elrendezés**: fejlécben a név és a jármű leírása (modell +
  évjárat, `subtitle:`-lel átírható), mellette a zárás; az autó mellett nagy
  állapotfelirat (Parkol / Úton / Nem elérhető), üzemanyagszint-csík a
  hatótávval (25 % alatt sárga, 10 % alatt piros), km óra, külső hőmérséklet,
  AdBlue és a szervizig hátralévő idő.
- **Három összegző panel** a figyelmeztetések alatt: Szerviz, Utolsó út,
  Pontszám (ez utóbbi saját, pl. template szenzorokból), a lábléc pedig a
  parkolási helyet és az adat korát mutatja.
- **Figyelmeztetések**: nyitott ajtó/ablak/csomagtartó/motorháztető, lezáratlan
  autó, égve maradt parkolófény; kettőnél többnél összevont sor („4 ajtó nyitva”).
- **Nyitható szekciók**: Menetadatok, Összesített utak, Szerviz, Töltés
  (elektromos modelleknél), Klíma, Pozíció és rendszer. A `show_extra: true`
  minden további MySkoda szenzort is kilistáz.

Részletek: [`docs/car-capabilities.md`](docs/car-capabilities.md),
példák: [`examples/car.yaml`](examples/car.yaml).

| Sötét téma | Minden nyitva |
| --- | --- |
| ![Sötét](docs/images/car-dark.png) | ![Minden nyitva](docs/images/car-open.png) |

## Telepítés

> **Ez a repó privát.** A HACS hivatalosan csak publikus repókat támogat, ezért
> privát repónál a kézi telepítés a biztos út. (Ha később publikussá teszed a
> repót, a HACS-os mód is működik – lásd lentebb.)

### Kézzel (privát repónál ez ajánlott)

1. Töltsd le a `dist/ha-appliance-cards.js` fájlt – ez tartalmazza mind a három
   kártyát. (Ha csak egy kell: `dist/aeg-dishwasher-card.js`,
   `dist/philips-airfryer-card.js`, illetve `dist/skoda-car-card.js`.)
   - GitHub böngészőből: a fájl oldalán **Download raw file**.
   - Vagy a Home Assistant gépén, személyes hozzáférési tokennel (fine-grained
     token, `Contents: Read` jogosultsággal az adott repóra):

     ```bash
     curl -L \
       -H "Authorization: Bearer <GITHUB_TOKEN>" \
       -H "Accept: application/vnd.github.raw" \
       -o /config/www/ha-appliance-cards.js \
       "https://api.github.com/repos/gabor-io/ha-appliance-custom-card/contents/dist/ha-appliance-cards.js?ref=main"
     ```

2. A fájl kerüljön a `config/www/` könyvtárba (ha még nincs, hozd létre); ez a
   `/local/` útvonalon érhető el.
3. Beállítások → Irányítópultok → ⋮ (jobb felül) → **Erőforrások** → jobb alul
   **+ Erőforrás hozzáadása**:
   - URL: `/local/ha-appliance-cards.js?v=1`
   - Típus: **JavaScript modul**
4. Ctrl+F5 (vagy Cmd+Shift+R) a böngészőben.

Frissítéskor töltsd le újra a fájlt, és növeld az erőforrás URL végén a `?v=`
értéket (`?v=2`, `?v=3`, …), hogy a böngésző ne a régi verziót töltse be.
A letöltést a [`scripts/update-card.sh`](scripts/update-card.sh) automatizálja –
lásd a következő szakaszt.

### HACS (ha publikussá teszed a repót)

1. HACS → ⋮ → **Custom repositories**
2. URL: `https://github.com/gabor-io/ha-appliance-custom-card`, típus: **Dashboard**
3. Telepítés után a HACS magától felveszi a `ha-appliance-cards.js` erőforrást.

### Automatikus frissítés a GitHubról

A [`scripts/update-card.sh`](scripts/update-card.sh) letölti a repóból az aktuális
buildet a Home Assistant `www` mappájába. Privát repónál kell hozzá egy
fine-grained GitHub token (`Contents: Read` az adott repóra), publikusnál token
nélkül is megy.

```bash
GITHUB_TOKEN=github_pat_... ./scripts/update-card.sh
```

Amit tud:

- csak akkor tölt le, ha a fájl tényleg változott (a blob SHA-ját eltárolja a
  cél mellé `.sha` néven), így időzítve is nyugodtan futtatható;
- `--ref latest` esetén a legutóbbi GitHub Release-t húzza le (ha nincs release,
  a `main` branchre esik vissza), `--ref main` (alapértelmezés) mindig a legfrissebb állapotot;
- a letöltést ellenőrzi, és csak ép fájlt tesz a helyére – félbeszakadt letöltés
  soha nem írja felül a működő kártyát;
- `--file`, `--dest`, `--repo`, `--quiet` kapcsolókkal testre szabható
  (mindegyik megadható környezeti változóként is: `REPO`, `REF`, `FILE`, `DEST`,
  `GITHUB_TOKEN`).

**Időzítés a Docker hoston** (HA Container telepítésnél ez a legegyszerűbb) –
`crontab -e`:

```
0 4 * * * GITHUB_TOKEN=github_pat_... /opt/ha/update-card.sh --quiet --dest /path/to/ha-config/www/ha-appliance-cards.js
```

**Vagy magából a Home Assistantból**, `secrets.yaml`:

```yaml
update_cards_cmd: "GITHUB_TOKEN=github_pat_... /config/scripts/update-card.sh --quiet"
```

`configuration.yaml`:

```yaml
shell_command:
  update_appliance_cards: !secret update_cards_cmd
```

…majd egy automatizálás naponta (vagy HA indulásakor) hívja meg a
`shell_command.update_appliance_cards` műveletet. Előtte futtasd le kézzel a
Fejlesztői eszközök → Műveletek alatt: ha a konténerben nincs `curl`, a hostos
cron a megoldás.

Frissítés után a böngészőben Ctrl+F5, vagy növeld a Lovelace erőforrás URL-jében
a `?v=` értéket.

## Használat

A kártyák maguktól megkeresik a készülék entitásait:

```yaml
type: custom:aeg-dishwasher-card
```

```yaml
type: custom:philips-airfryer-card
```

```yaml
type: custom:skoda-car-card
```

Ha több hasonló készüléked van, add meg a készüléket (a vizuális szerkesztő
legördülőjéből is választható):

```yaml
type: custom:philips-airfryer-card
device: 8f1c0a2b5d7e4f3a9c6b1d2e3f4a5b6c
name: Airfryer
```

## Beállítások

Közös opciók mindkét kártyán:

| Opció | Típus | Alapértelmezés | Leírás |
| --- | --- | --- | --- |
| `device` | string | automatikus | A készülék `device_id`-ja |
| `prefix` | string | automatikus | Az entitások közös előtagja |
| `entities` | map | automatikus | Egyedi entitás-hozzárendelés |
| `name` | string | a készülék neve | Fejléc felirat |
| `language` | `auto` \| `hu` \| `en` | `auto` | A kártya nyelve |
| `compact` | bool | `false` | Kisebb géprajz, sűrűbb elrendezés |
| `animate` | bool | `true` | Animációk ki/be |
| `show_details` | bool | `true` | Részletek rács |
| `show_controls` | bool | `true` | Vezérlőgombok |

Csak a mosogatógép kártyán: `show_programs`, `show_options`, `show_delay`,
`show_scores`, `show_consumption`, `show_appliance_settings`.

Csak az airfryer kártyán: `show_methods`, `show_presets`, `show_settings`,
`show_probe`.

Az `entities` alatt felülírható kulcsok a két `docs/*-capabilities.md` fájl
végén találhatók.

## Jó tudni

- **Mosogatógép távvezérlés**: a gép csak akkor fogadja a parancsokat, ha
  engedélyezett a távindítás; a kártya kiszürkíti a gombokat és jelzi az okot.
- **Program választása kikapcsolt mosogatógépen**: a kártya előbb megnyomja az
  `execute_command_on` gombot, vár 1,5 másodpercet, és utána állít programot.
- **Airfryer fiók**: nyitott fióknál a gép szünetel, a kártya nem enged indítást.
- **Mértékegységek**: a kártyák az entitások `unit_of_measurement` attribútumát
  követik, így °C/°F és perc/másodperc alapú érték is jó.

## Fejlesztés

```bash
npm install
npm run build      # dist/*.js (mindhárom bundle)
npm run watch      # figyelő mód, minifikálás nélkül
npm run serve      # http://localhost:8099/demo/ – demók mock hass-szal
```

```
src/
├── shared/      # entitásfelismerés, i18n, ikonok, alapstílusok, szerkesztő
├── dishwasher/  # AEG / Electrolux mosogatógép kártya
└── airfryer/    # Philips airfryer kártya
```

### Kiadás (release)

A verziószám egyetlen helyen él: a `package.json`-ben. A build innen veszi a
bundle fejlécét és a kártyák konzolra írt verzióját is.

Új kiadáshoz csak a verziót kell emelni:

1. `package.json` → `"version": "1.2.0"`
2. `npm run build` (a `dist/` a repóban van, a HACS ezt tölti le)
3. commit + merge a `main`-re

A `.github/workflows/release.yml` innentől automatikus: ha a `main`-en változik
a `package.json`, létrehozza a `v1.2.0` taget és a hozzá tartozó GitHub
Release-t, csatolja a három bundle-t, és a kiadási jegyzeteket a commitokból
generálja. Ha a `dist/` nincs újraépítve, a workflow hibával leáll – így nem
kerülhet ki olyan release, amiben a lefordított fájl elavult. Kézzel is
indítható a Actions fülön (**Run workflow**).

A HACS a GitHub Release-eket látja verzióként, tehát minden ilyen kiadás után
megjelenik a frissítés a HACS-ban.

A `demo/` mappa a valódi diagnosztikai adatokból épített állapotokat játssza
vissza (mosogatógép: fut, szárít, szünetel, késleltetve indul, elkészült, hiba,
offline; airfryer: előmelegít, süt, rázás, nyitott fiók, ételhőmérő, párolás,
elkészült, melegen tart, hiba), így a kártyák HA nélkül is fejleszthetők.

## Licenc

MIT
