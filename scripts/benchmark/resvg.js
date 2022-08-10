import { Resvg } from '@resvg/resvg-js';

export default svg => (
	new Resvg(svg, {
		font: {
			loadSystemFonts: false,
		},
		logLevel: 'off',
		imageRendering: 1,
		textRendering: 0,
		shapeRendering: 0,
		fitTo: {
			mode: 'width',
			value: 800,
		},
		dpi: 2400,
	}).render().asPng()
);
