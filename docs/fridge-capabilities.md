# Liebherr hűtő kártya – mit tud és honnan

A kártya a Home Assistant beépített
[`liebherr`](https://www.home-assistant.io/integrations/liebherr) integrációjának
entitásait olvassa és vezérli (hőmérséklet, SuperCool / SuperFrost, éjszakai
mód, BioFresh-Plus, HydroBreeze, jégkészítő, belső világítás).

## Entitásfelismerés

Az integráció csak akkor teszi a zóna nevét az entitásba, ha a készüléknek több
zónája van. Egy egyzónás hűtőnél:

| Entitás | Példa |
| --- | --- |
| aktuális hőmérséklet | `sensor.liebherr_cooler` (a szenzor a készülék nevét kapja) |
| beállított hőmérséklet | `number.liebherr_cooler_setpoint` |
| SuperCool | `switch.liebherr_cooler_supercool` |
| éjszakai mód | `switch.liebherr_cooler_nightmode` |

Egy hűtő-fagyasztónál ugyanezek `_top_zone`, `_middle_zone`, `_bottom_zone`
előtaggal jelennek meg (`number.liebherr_combi_top_zone_setpoint`,
`sensor.liebherr_combi_bottom_zone`, …).

Mivel az egyzónás szenzornak nincs saját fordítási kulcsa, a kártya elsősorban
az **entitásregisztert** használja (ott megvan az integráció `translation_key`
értéke és a platform neve), és csak annak hiányában esik vissza az
objektum-azonosítók illesztésére. Minden entitás felülírható:

```yaml
type: custom:liebherr-fridge-card
entities:
  nightmode: switch.liebherr_cooler_nightmode
  zone1_temp: sensor.liebherr_cooler
  zone1_setpoint: number.liebherr_cooler_setpoint
  zone1_supercool: switch.liebherr_cooler_supercool
```

A `zone<N>_` előtag a zónákat számozza felülről lefelé (`zone1_`, `zone2_`, …),
a többi kulcs (`nightmode`, `partymode`, `light`) a készülék egészére vonatkozik.

## Készülékrajz

Egyetlen SVG, ami annyi ajtóra oszlik, ahány zónát a készülék jelent (1–3).
Minden állapot CSS-osztály a egyszer felépített rajzon, így az animációk nem
indulnak újra egy frissítéskor:

| Állapot | Forrás | Megjelenés |
| --- | --- | --- |
| hűtés | az aktuális hőmérséklet a beállított fölött van | hideg levegő áramlik a belső térben |
| SuperCool / SuperFrost | `switch.*_supercool`, `switch.*_superfrost` | a belső tér kékre vált, hópelyhek szállnak |
| éjszakai mód | `switch.*_nightmode` | a kijelző és a jelzőfény elhalványul |
| belső világítás | `light.*_presentation_light` | meleg fény tölti meg a belső teret |
| aktuális hőmérséklet | a zóna szenzora | a felső ajtó kijelzőjén |

## A kártya felépítése

1. **Fejléc**: a készülék neve, alatta a típusa (a device registry `model_id`
   mezője, pl. `Rd 5000-150 2`), jobbra az aktuális üzemmód.
2. **Rajz és állapot**: nagy aktuális hőmérséklet, mellette a beállított érték,
   alatta egy sor arról, hogy hőmérsékleten van-e vagy épp hűt, és a bekapcsolt
   üzemmódok.
3. **Zónák**: zónánként egy blokk a beállított hőmérséklettel, −/+ léptetővel és
   gyorsgombokkal (a gyorsgombok közül csak azok jelennek meg, amelyek beleesnek
   a készülék által elfogadott tartományba – fagyasztónál például egy sem).
4. **Üzemmódok**: SuperCool, SuperFrost, éjszakai mód, PartyMode, belső
   világítás kapcsolók.
5. **BioFresh-Plus / HydroBreeze / jégkészítő**: zónánként egy-egy választósor.
6. **Részletek**: zónák száma, AutoDoor állapota, világítás fényereje, és
   `show_extra: true` esetén minden további Liebherr entitás.

## Amit az integráció nem ad

Nincs ajtónyitás-érzékelő és nincs riasztás-entitás, ezért a kártya sem tud
ilyet mutatni. A készülék típusától függ, mely vezérlők jelennek meg: az
Rd 5000-150 2 például hőmérsékletet, SuperCool-t és éjszakai módot küld, a
BioFresh, HydroBreeze, jégkészítő és AutoDoor sorok csak azoknál a gépeknél
jelennek meg, amelyek jelentik őket.

## Beállítások

| Kulcs | Alap | Jelentés |
| --- | --- | --- |
| `device` | automatikus | a készülék device_id-ja |
| `prefix` | automatikus | objektum-azonosító előtag |
| `entities` | – | entitás-felülírások (`zone1_…`, `nightmode`, …) |
| `name` | eszköz neve | fejléc felirat |
| `subtitle` | típus | fejléc alcím (üres sztring: elrejtve) |
| `language` | `auto` | `hu` / `en` |
| `compact` | `false` | kisebb rajz, sűrűbb elrendezés |
| `animate` | `true` | animációk ki/be |
| `show_zones` | `true` | zónák és hőmérséklet-állítás |
| `show_modes` | `true` | üzemmódok |
| `show_selects` | `true` | BioFresh / HydroBreeze / jégkészítő |
| `show_details` | `true` | részletek |
| `show_extra` | `false` | további entitások |
