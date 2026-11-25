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

- **Nem hoz létre entitást.** Ha olyan összevont lejátszó kell, amire
  automatizálás vagy más kártya is hivatkozhat, arra a beépített
  [`universal`](https://www.home-assistant.io/integrations/universal/) media
  player platform való – ez a kártya csak megjelenít.
- **Nem vált át magától a másik lejátszóra.** Nem indít és nem állít le
  semmit azon kívül, amit a gombbal kérsz.
- **Nem böngészi a médiatárat.** Az a `BROWSE_MEDIA` dialógus dolga, amit az
  entitás saját „részletek" ablaka nyit meg – a fejlécre koppintva eléred.
