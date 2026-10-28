# Nanoleaf Shapes kártya – mit lát a kártya

A kártya a beépített
[`nanoleaf`](https://www.home-assistant.io/integrations/nanoleaf) integrációra
épül, ami **pontosan három entitást** hoz létre, és semmi többet.

## Entitások

| Mire | Hogyan találja meg | Mikor van |
| --- | --- | --- |
| a panelek | `light` a `nanoleaf` platformon | mindig |
| felvillantás | `button` ugyanazon az eszközön | ha az eszköznek van eseményfolyama |
| érintés | `event` ugyanazon az eszközön | **csak az érintéses modelleken** |

Az integráció forrásában: `TOUCH_MODELS = {"NL29", "NL42", "NL52"}` – vagyis
Canvas, **Shapes Hexagons** és Elements. A Shapes Triangles (NL47) és Mini
Triangles (NL48) nem kap `event` entitást, és a kártya ilyenkor elhagyja az
érintés-sort, nem mutat olyan vezérlőt, ami sosem sülhet el.

A kártya **eszköz alapján** old fel, nem entitás-azonosítóból: az azonosítók a
Nanoleaf appban adott névből képződnek, ami tetszőleges nyelven és írásmóddal
lehet.

## A csapda: effekt közben a szín nem jelent semmit

A Home Assistantnak **nincs „effekt" színmódja**. A Nanoleaf API három módot
ismer (`ct`, `effect`, `hs`), az integráció viszont az `effect`-et `hs`-ként
jelenti, és a hozzá tartozó `hue`/`saturation` **a legutóbbi fix szín**, nem az,
ami a falon fut. Élő példa egy Shapes-ről, Prism közben:

```
effect: "Prism"          hue: 0        saturation: 0
```

Vagyis fehér – miközben a falon szivárvány megy. A kártya ezért **először az
effektet nézi**: ha fut jelenet, a rajz a jelenet palettájából festi a
paneleket, és a `hs` csak akkor számít, ha nincs futó jelenet.

A `*Solid*`, `*Static*` és `*Dynamic*` fenntartott effekteket maga az
integráció szűri ki (`null`-t jelent helyettük), tehát ha jön név, az mindig
valódi jelenet.

## A jelenetek színei

A Home Assistant a jeleneteknek **csak a nevét** kapja meg – se palettát, se
előnézetet, még azt sem, hogy mozog-e. Enélkül a választó tizenhat egyforma
szövegsor lenne, ami pont az, aminek egy világításkártya nem való.

A kártya ezért saját színmintát tart a gyári jelenetekhez. **Ezek a kártya
olvasatai arról, hogy az egyes jelenetek hogy néznek ki a falon – nem az
eszköz által jelentett értékek.** Amire nincs mintája (saját készítésű jelenet,
vagy újabb firmware-é), az semleges szürke mintát kap, és a tooltipben
kimondja, hogy nem ismeri – ahelyett, hogy olyan színeket festene rá, amiket
senki nem ígért.

## A panelek elrendezése

Az integráció **nem adja át a panelek számát és elhelyezkedését**, pedig a
Nanoleaf API tudja. A kártya ezért a configból veszi, és azt rajzolja, amit
mondanak neki – nem tesz úgy, mintha ismerné a falat.

Három elrendezésnek van neve, azokat elég egy szóval megadni:

```yaml
layout: zigzag9     # kilenc panel futó cikcakkban: öt lent, négy fent
layout: flower7     # a kezdőkészlet hét paneles virága (alapértelmezés)
layout: row5         # öt panel egy sorban
```

Bármi más hatszög-koordinátákban megy, `[q, r]` párokként. Lapos tetejű
hatszögek: `q` jobbra lép, `r` **jobbra-le**. Ebből következik, hogy
`[q+1, r-1]` a jobbra-fel szomszéd, `[q+1, r]` pedig a jobbra-le – a kettő
váltogatása adja a cikcakkot.

```yaml
layout:
  - [0, 0]      # középső
  - [1, 0]      # tőle jobbra-le
  - [0, 1]      # alatta-balra
  - [-1, 1]     # balra-le
  - [-1, 0]     # balra-fel
  - [0, -1]     # fölötte
  - [1, -1]     # jobbra-fel
```

A rajzon a **bal szélső panel alatt ott a tápcsatlakozó**, ahogy a valódi
falon: egy Shapes sor egyetlen panelen keresztül kap áramot, és a falon ez
mondja meg, melyik vég melyik.

Nagyon széles elrendezésnél – a kilenc paneles cikcakk több mint ötször olyan
széles, mint amilyen magas – a rajz **a kártya teljes szélességét** kapja, és
a szöveg alá kerül. Egy 150 képpontos oszlopba préselve csak csík lenne
belőle.

## Fényerő

A csúszka húzás közben nem küldözget: a kártya **220 ms-ig vár**, és csak azt az
értéket adja át, ahol az ujj megállt. Enélkül egy húzás több tucat
`light.turn_on` hívást jelentene a paneleknek.

## Beállítások

| Kulcs | Alapérték | Mit csinál |
| --- | --- | --- |
| `entity` | – | a panelek `light` entitása |
| `device` | – | entitás helyett eszköz (a szerkesztő ezt állítja) |
| `name` | az entitás neve | a kártya címe |
| `subtitle` | a modell | a név alatti sor; üres sztring elrejti |
| `layout` | `flower7` | név (`zigzag9`, `flower7`, `row5`) vagy `[q, r]` párok listája |
| `language` | `auto` | `hu`, `en` vagy a HA nyelve |
| `show_art` | `true` | panelrajz |
| `show_brightness` | `true` | fényerő-csúszka |
| `show_effects` | `true` | jelenetek |
| `show_white` | `true` | fehér fokozatok |
| `show_touch` | `true` | utolsó érintés |
| `show_identify` | `true` | felvillantás gomb |
| `compact` | `false` | kisebb rajz, szűkebb margók |
| `animate` | `true` | animációk |

## Amit a kártya nem csinál

**Nincs saját színkorong.** A `light` entitás saját párbeszédablaka már tud
színt választani, és egy második választó itt csak egy újabb dolog lenne, amit
szinkronban kellene tartani vele. A kártya ezért egy gombbal odaküld.

**Nincs per-panel vezérlés.** Az API tudja, az integráció nem adja át.
