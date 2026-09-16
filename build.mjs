import { build, context } from 'esbuild';
import { readFileSync } from 'node:fs';

const pkg = JSON.parse(readFileSync('./package.json', 'utf8'));

const options = {
  entryPoints: ['src/index.js'],
  outfile: 'dist/aeg-dishwasher-card.js',
  bundle: true,
  format: 'esm',
  target: ['es2021'],
  minify: !process.argv.includes('--dev'),
  legalComments: 'none',
  banner: {
    js: `/*! ${pkg.name} v${pkg.version} - ${pkg.homepage} - MIT licence */`,
  },
};

if (process.argv.includes('--watch')) {
  const ctx = await context(options);
  await ctx.watch();
  console.log('watching...');
} else {
  await build(options);
  console.log(`built ${options.outfile}`);
}
