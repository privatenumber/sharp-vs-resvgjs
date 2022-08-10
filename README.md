# sharp vs resvg-js

A comparison between [sharp](https://github.com/lovell/sharp) vs [resvg-js](https://github.com/yisibl/resvg-js) performance to bulk convert SVGs to PNGs.

Sharp configuration: [`scripts/benchmark/sharp.js`](/scripts/benchmark/sharp.js)

rsvg-js configuration: [`scripts/benchmark/resvg.js`](/scripts/benchmark/resvg.js)


## Reproduction

1. Install dependencies:

	```sh
	pnnpm i
	```

2. Benchmark:

	```sh
	pnpm benchmark
	```

## Results

### sharp is much faster

When converting 400 SVG icons from [simple-icons](https://www.npmjs.com/package/simple-icons) to 2500 DPI 800px width PNGs, sharp is 3x faster than resvg-js.

```
resvg: { duration: '5472ms', icons: 400 }
sharp: { duration: '1569ms', icons: 400 }
sharp is faster by 3.49x
```

### resvg-js crashes on too many icons

The number of icons is limited to 400 because when processing too many icons at once, resvg crashes the whole Node.js process:

```
$ pnpm benchmark

> node scripts/benchmark

thread '<unnamed>' panicked at 'the previous segment must be M/L/C', /Users/runner/.cargo/git/checkouts/resvg-4b7e4ee32ad6d954/cab0b15/usvg/src/pathdata.rs:160:17
note: run with `RUST_BACKTRACE=1` environment variable to display a backtrace
fatal runtime error: failed to initiate panic, error 5
```

### rsvg-js doesn't yield expected DPI
After benchmarking, the resulting PNGs are saved to `pngs/`. When comparing icons between sharp and rsvg, the DPI on sharp is 2400 (as expected), but the DPI on rsvg is 72.


| resvg-js (72 DPI) | sharp (2400 DPI) |
| - | - |
| <img src="./pngs/resvg/500px.svg.png"> | <img src="./pngs/sharp/500px.svg.png"> |
