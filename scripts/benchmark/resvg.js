import { Resvg } from '@resvg/resvg-js';

export default svg => (
	new Resvg(svg, {
		font: {
			loadSystemFonts: false,
		},
		logLevel: 'off',
		fitTo: {
			mode: 'width',
			value: 800,
		},
	}).render().asPng()
);
