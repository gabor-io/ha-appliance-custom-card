# Médiaszoba kártya – mit vár és mit csinál

Ez a kártya nem egy készülékhez tartozik, hanem egy **képernyőhöz**. Egy
TV-hez tipikusan több dolog tud lejátszani – egy streaming box és magának a
TV-nek az appja –, és a Home Assistant mindegyiknek külön `media_player`
entitást ad. Mindkettő létezik egész nap, ezért a dashboardon két kártya van
ott, ahol a szobában egy képernyő van.

## Config

```yaml
type: custom:media-room-card
name: Hálószoba
entities:
  - media_player.az_egyik
  - media_player.a_masik
```

| Kulcs | Alap | Mit csinál |
| --- | --- | --- |
| `entities` | – | A lejátszók listája. **A sorrend számít**, lásd lentebb. |
| `name` | az aktív lejátszó neve | A kártya fejléce. |
| `language` | `auto` | `hu`, `en` vagy `auto` (a HA nyelvéből). |
| `show_artwork` | `true` | Borítókép. |
| `show_progress` | `true` | Játékidő-sáv és az idők. |
| `show_volume` | `true` | Hangerő és némítás. |
| `show_players` | `true` | A lejátszók sora a kártya alján. |
| `volume_entity` | az aktív lejátszó | Amelyik a hangot adja, ha nem az, amelyik játszik. |
| `show_sources` | `true` | Forrás- és hangzásmód-választó. |
| `show_remote` | `true` | A távirányító gomb (a pad csak koppintásra nyílik ki). |
| `remote_entity` | az aktív lejátszó dobozáé | Melyik `remote` entitásnak menjenek a gombok. |
| `remote_keys` | `auto` | `apple`, `samsung`, vagy saját `{gomb: parancs}` térkép. |
| `macros` | – | Saját gombok, amik gombnyomás-sorozatot küldenek. |
| `show_macros` | `true` | A makrógombok sora. |
| `compact` | `false` | Kisebb borító, szorosabb térköz. |

Egyetlen entitás is megadható `entity:`-vel; ekkor a lejátszók sora magától
elmarad.

## Melyik lejátszót mutatja

A kártya azt a lejátszót mutatja, amelyiknek a legmagasabb az állapota ebben a
sorrendben:

```
unknown < unavailable < off < idle < on < paused < buffering < playing
```

`idle` alattiakat figyelmen kívül hagyja, és **holtversenynél a configban
előbb szereplő nyer**. Ez nem saját kitalálás: szó szerint ez a szabály van a
Home Assistant beépített `universal` media playerében (`STATES_ORDER` a
`homeassistant/components/universal/media_player.py`-ban), ami ugyanezt a
feladatot oldja meg entitás szinten. Ha a kártya és az integráció mást
választana, az két különböző „aktív lejátszó" fogalmat jelentene ugyanabban a
házban.

A lejátszók sorában **bármelyikre koppintva az lesz a megjelenített**, amíg
újra rá nem koppintasz. Ez akkor hasznos, ha tényleg megy mindkettő.

## Ha a hang nem onnan jön, ami játszik

Egy TV-hez kötött streaming boxnál a kép az egyik entitás, a hang a másik: a
box `supported_features`-ében **nincs** hangerő, a TV-ében van. Egy olyan
kártya, ami mindig az aktív lejátszóra küld, pont akkor marad hangerő nélkül,
amikor használnád.

Ezért a `volume_entity` azt nevezi meg, ami a hangot adja:

```yaml
type: custom:media-room-card
name: Hálószoba
entities:
  - media_player.a_box
  - media_player.a_televizio
volume_entity: media_player.a_televizio
```

Innentől a hangerő-csúszka és a némítás **mindig** arra az entitásra megy, a
lejátszás/szünet/előre-hátra pedig arra, ami épp játszik. A csúszka mellett
ott van annak a neve, amelyiké a hangerő – különben úgy nézne ki, mintha a
képernyőn látszó lejátszóé lenne.

A TV-t érdemes az `entities` listába is betenni: így adásnézéskor (amikor
egyetlen lejátszó sem „playing") a kártya a TV-t mutatja. A sorrendnél a
lista végére kerüljön, mert az `on` úgyis kisebb, mint a `playing`.

## Csatornalogó és app-ikon

Ha a `media_content_type` `channel` vagy `app`, az `entity_picture` **nem
állókép, hanem logó**. Ilyenkor a kártya nem háttérként vágja be, hanem
arányosan, kicsinyítve mutatja a jobb oldalon, és elhagyja az elmosott
másolatot: egy elmosott logó vagy egy színfolt, vagy – ha átlátszó – semmi.

## Forrás, hangzásmód, tekerés

Ezek mind a `supported_features`-ből jönnek, és csak akkor jelennek meg, ha
tényleg van mit választani (kétnél kevesebb elemű lista nem választó):

- **Forrás** – `SELECT_SOURCE` (2048) és `source_list`. Az *aktív lejátszóé*:
  egy TV-nél ez a bemenetek és appok listája, egy Apple TV-nél a telepített
  appoké (`LaunchApp`).
- **Hangzásmód** – `SELECT_SOUND_MODE` (65536) és `sound_mode_list`. Ez a
  *hangot adó* entitásé, nem az aktív lejátszóé, mert a hangzás az erősítő
  dolga.
- **Tekerés** – `SEEK` (2). Ilyenkor a játékidő-sávra lehet koppintani, és
  oda ugrik. Az Apple TV ezt tudja (`SetPosition`), a TV nem.

## Távirányító

Ha az aktív lejátszó dobozán van `remote` entitás, a kártyán megjelenik egy
távirányító gomb, ami kinyit egy iránypadot (fel/le/balra/jobbra/OK, plusz
vissza, főmenü, menü, és egy kicsit vissza/előre).

A két integráció **nem ugyanazokat a parancsokat** érti:

| Gomb | Apple TV (pyatv) | Samsung (Tizen) |
| --- | --- | --- |
| fel / le / balra / jobbra | `up` `down` `left` `right` | `KEY_UP` `KEY_DOWN` `KEY_LEFT` `KEY_RIGHT` |
| OK | `select` | `KEY_ENTER` |
| vissza | `menu` | `KEY_RETURN` |
| főmenü | `home` | `KEY_HOME` |
| menü | `top_menu` | `KEY_MENU` |
| vissza/előre | `skip_backward` `skip_forward` | `KEY_REWIND` `KEY_FF` |

A kártya ezért **nem az entitás nevéből találgat**, hanem a `remote` entitás
*platformjából* választ térképet (`apple_tv` → Apple, `samsungtv_smart` és
`samsungtv` → Samsung). Ismeretlen platformnál inkább nincs pad, mint olyan,
ami minden gombnyomásra „Command not found"-ot dob. Saját térkép is adható:

```yaml
remote_keys:
  up: KEY_UP
  select: KEY_ENTER
  back: KEY_RETURN
```

A pad mindig ahhoz a dobozhoz tartozik, **ami épp megy**: ha a box játszik,
az Apple TV-t irányítja; ha a TV az aktív, a TV-t.

## Makrógombok

Van, amit a készülék nem ad ki entitásként, csak a saját menüjében lehet
állítani – egy Samsungnál ilyen az Eco mód. Ezekre való a `macros`: egy
gomb, ami végigsétál a menün.

```yaml
macros:
  - name: Eco be
    icon: leaf
    keys: [KEY_MENU, KEY_LEFT*10, KEY_ENTER, KEY_DOWN*3, KEY_RIGHT,
           KEY_DOWN*3, KEY_ENTER, KEY_DOWN*2, KEY_ENTER,
           KEY_DOWN*3, KEY_ENTER, KEY_RETURN*4]
    sets: { entity: input_boolean.tv_eco, state: 'on' }
  - name: Eco ki
    icon: leaf_off
    keys: [KEY_MENU, KEY_LEFT*10, KEY_ENTER, KEY_DOWN*3, KEY_RIGHT,
           KEY_DOWN*3, KEY_ENTER, KEY_DOWN*2, KEY_ENTER,
           KEY_UP*3, KEY_ENTER, KEY_RETURN*4]
    sets: { entity: input_boolean.tv_eco, state: 'off' }
```

| Mező | Mit jelent |
| --- | --- |
| `name` | a gomb felirata |
| `icon` | ikonnév a kártya készletéből (`leaf`, `leaf_off`, `remote`, …) |
| `keys` | a parancsok; `KEY_LEFT*10` tíz megnyomást jelent |
| `entity` | melyik `remote` entitásnak menjen (lásd lentebb: magától is megtalálja) |
| `delay_ms` | saját szünet a gombok között, ha a menü lassan rajzol |
| `sets` | egy helper, amit a kártya a küldés után beállít |

**Egy hívás az egész.** A `samsungtv_smart` a `remote.send_command` listáját
`+`-szal fűzi össze, és magától tesz **0,5 másodperc** szünetet a gombok közé
(egy szám a listában ezredmásodperces várakozás, 0,2–2 s közé vágva). A fenti
sorozat 31 gombnyomás, tehát nagyjából **15 másodpercig** tart – a kártya
ezért a futás idejére letiltja a makrógombokat, különben a második makró
belekezdene az elsőbe, és a menü valahol félúton maradna.

### Melyik távirányítóra megy

A `KEY_MENU` Tizen kódja a Samsungnak szól, a `menu` pedig a pyatv
metódusneve az Apple TV-nek — egy szobában a két doboz egy-egy nyelvet ért.
A kártya ezért **a parancsokból olvassa ki, melyik nyelven van a makró**, és
azt a távirányítót keresi hozzá, amelyik azt a nyelvet beszéli. Csak ha ilyet
nem talál, esik vissza arra a dobozra, amelyik épp játszik.

Ez nem kozmetika: enélkül egy `KEY_*` sorozat ahhoz a dobozhoz ment, ami
éppen ment — tipikusan a streaming boxhoz —, ahol a pyatv minden gombra
„Command not found"-ot dobott, a TV-n pedig nem történt semmi. Az `entity:`
mezővel felül lehet bírálni; ha megadod, és a makró nyelve nem illik ahhoz a
dobozhoz, a kártya **nem küldi el**, hanem letiltva mutatja a gombot, és a
buborékban megírja, mi a baj.

### Amit tudni kell róla

- **A makró vak.** A kártya elküldi a sorozatot, és nem látja, hova jutott a
  menü. Ha a TV nem onnan indul, ahonnan a sorozatot írtad – például már nyitva
  van egy menü –, akkor máshol köt ki, és **más beállítást írhat át**. Ez nem
  a kártya hibája, hanem a módszeré.
- **A TV nem mondja meg, hogy be van-e kapcsolva az Eco.** Nincs rá attribútum
  és nincs rá `supported_features` bit. Ezért két gomb van, nem egy kapcsoló.
- **A `sets` csak annyit tud, amennyit elküldtek.** A megadott helpert a kártya
  a küldés után beállítja, és a két gomb ettől úgy néz ki, mint egy kapcsoló –
  de ez **azt mutatja, mit küldtél utoljára**, nem azt, mi van a TV-ben. Ha a
  távirányítóval állítod át, a helper hazudni fog, amíg újra a kártyáról nem
  nyúlsz hozzá.

## Melyik gomb jelenik meg

A kártya csak azt a vezérlőt rajzolja ki, amire az **épp aktív** lejátszó
`supported_features` bitje azt mondja, hogy tudja. A bitek a
`MediaPlayerEntityFeature`-ből jönnek
(`homeassistant/components/media_player/const.py`):

| Gomb | Bit |
| --- | --- |
| Be/ki | `TURN_ON` (128) vagy `TURN_OFF` (256) |
| Előző / következő | `PREVIOUS_TRACK` (16), `NEXT_TRACK` (32) |
| Lejátszás / szünet | `PLAY` (16384), `PAUSE` (1) |
| Leállítás | `STOP` (4096) |
| Hangerő | `VOLUME_SET` (4) |
| Némítás | `VOLUME_MUTE` (8) |

Ez azért fontos, mert a két lejátszó nem ugyanazt tudja: egy Apple TV-t be- és
kikapcsolni lehet, egy Plex kliensnek nincs ilyenje, viszont van hangereje.
Váltáskor tehát **változik a gombsor** – ez nem hiba, hanem az, amit az adott
doboz tud. Egy gomb, ami csendben nem csinál semmit, rosszabb, mint ha ott sem
lenne.

## Honnan jön a szöveg

| Sor | Attribútum |
| --- | --- |
| Cím | `media_title`, ennek híján `media_channel` |
| Alcím | `media_series_title`, `S{media_season}E{media_episode}`, `media_artist`, `media_album_name` – ami van, ponttal elválasztva, az azonos szövegek kihagyásával |
| Fejléc alsó sora | `app_name` és az aktív lejátszó neve |
| Borító | `entity_picture` |

## A kinézet

A borító a kártya **háttere**, nem egy bélyegkép a szöveg mellett: jobb oldalt
ül, balra elhalványodva, a szöveg és a gombok előtte. Ez a gyári
`media-control` kártya elrendezése, és azért ez a jó, mert egy filmkockán vagy
egy poszteren nincs mit elolvasni – a jobb szélre tolva és balra kifuttatva a
kártya megkapja tőle annak a színét, ami megy, miközben a címet hordozó fele
tisztán olvasható marad.

Két példányban szerepel ugyanaz a kép: egy elmosott az egész kártyán, és egy
éles a jobb oldalon. Az elmosott adja a bal oldal színét. A gyári kártya ezt
úgy oldja meg, hogy canvasra rajzolva kiolvassa a domináns színt; az elmosott
másolat ugyanoda érkezik anélkül, hogy a képpontokhoz nyúlna – ezért olyan
képen sem tud elhasalni, amit a böngésző nem enged beolvasni.

Amit a kártya ebből magának tart fenn: a cím és a gombok sávja a kép előtt
megáll (jobb oldali belső margó, nem százalékos `max-width` – az egy
automata rácsoszlopban körkörös hivatkozás, és a tartalom egy csíkká esik
össze). A fejléc viszont szándékosan végigér: a jobb felső állapotcímke a kép
fölé való, ahogy a gyári kártyán is ott van a hossz.

## A játékidő

A `media_position` **pillanatfelvétel**, nem élő érték: a hozzá tartozó
`media_position_updated_at` mondja meg, mikor készült. Egy lejátszó percekig
ugyanazt a számot küldi. A kártya ezért az eltelt időt így számolja:

```
eltelt = media_position + (most - media_position_updated_at)
```

de **csak amíg a lejátszó `playing`** – megállított lejátszónál a
pillanatfelvétel már pontos, és hozzáadni az azóta eltelt időt azt jelentené,
hogy a sáv kifut egy olyan film végére, amit senki nem néz.

A kártya emellett másodpercenként újraszámol, különben a sáv állna két
állapotfrissítés között. Ilyenkor csak a sáv és a két időkijelző íródik át, a
kártya többi része nem – egy teljes újrarajzolás kirántaná a hangerő-csúszkát
az ujjad alól.

## Amit nem csinál

- **Nem böngészi a médiatárat.** A `BROWSE_MEDIA` dialógust a Home Assistant
  saját „részletek" ablaka nyitja – a kártya fejlécére koppintva eléred.
- **Nincs keverés és ismétlés.** Egyik eszköz sem jelenti be őket: az Apple
  TV diagnosztikájában a `SetShuffle` és a `SetRepeat` `Unavailable`, a TV
  `supported_features`-ében sincs benne a két bit.
- **Nincs képmód-választó.** A `samsungtv_smart` ad hozzá egy saját
  szolgáltatást, de ezen a készüléken a `picture_mode_list` egyetlen elemű
  (`HDR+`), tehát a választó egy soha nem változó gomb lenne.
- **Nincs AirPlay kimenet-választó.** A pyatv tudja
  (`OutputDevices`, `SetOutputDevices`), de a Home Assistant `media_player`
  entitása ezt nem adja át, így a kártyának sincs mihez nyúlnia.
- **Nem hoz létre entitást.** Ha olyan összevont lejátszó kell, amire
  automatizálás vagy más kártya is hivatkozhat, arra a beépített
  [`universal`](https://www.home-assistant.io/integrations/universal/) media
  player platform való – ez a kártya csak megjelenít.
- **Nem vált át magától a másik lejátszóra.** Nem indít és nem állít le
  semmit azon kívül, amit a gombbal kérsz.
- **Nem böngészi a médiatárat.** Az a `BROWSE_MEDIA` dialógus dolga, amit az
  entitás saját „részletek" ablaka nyit meg – a fejlécre koppintva eléred.
