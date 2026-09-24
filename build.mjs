import { build, context } from 'esbuild';
import { readFileSync } from 'node:fs';

const pkg = JSON.parse(readFileSync('./package.json', 'utf8'));

/** Every card ships on its own, plus one bundle that registers all of them. */
const TARGETS = [
  { in: 'src/index.js', out: 'dist/ha-appliance-cards.js' },
  { in: 'src/dishwasher/index.js', out: 'dist/aeg-dishwasher-card.js' },
  { in: 'src/airfryer/index.js', out: 'dist/philips-airfryer-card.js' },
  { in: 'src/car/index.js', out: 'dist/skoda-car-card.js' },
  { in: 'src/fridge/index.js', out: 'dist/liebherr-fridge-card.js' },
];

const dev = process.argv.includes('--dev');

const optionsFor = (target) => ({
  entryPoints: [target.in],
  outfile: target.out,
  bundle: true,
  format: 'esm',
  target: ['es2021'],
  minify: !dev,
  define: { __CARD_VERSION__: JSON.stringify(pkg.version) },
  legalComments: 'none',
  banner: { js: `/*! ${pkg.name} v${pkg.version} - ${pkg.homepage} - MIT licence */` },
});

if (process.argv.includes('--watch')) {
  for (const target of TARGETS) {
    const ctx = await context(optionsFor(target));
    await ctx.watch();
  }
  console.log('watching...');
} else {
  await Promise.all(TARGETS.map((target) => build(optionsFor(target))));
  console.log(TARGETS.map((target) => `built ${target.out}`).join('\n'));
}
