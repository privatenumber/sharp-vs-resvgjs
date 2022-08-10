import fs from 'fs/promises';
import path from 'path';
import sharp from './sharp.js';
import resvg from './resvg.js';
import { startTimer, writeToDisk } from './utils.js';

(async () => {
	// Get array of icons
	const iconsDirectory = './node_modules/simple-icons/icons';
	const iconPaths = await fs.readdir(iconsDirectory);
	const svgs = await Promise.all(
		iconPaths
			.slice(0, 400) // Comment out to see resvg crash
			.map(
				async iconName => [
					iconName,
					await fs.readFile(path.join(iconsDirectory, iconName)),
				],
			),
	);

	// Benchmark resvg
	const resvgTime = await (async () => {
		const stopTimer = startTimer();
		const pngs = svgs.map(([iconName, buffer]) => [
			path.join('pngs/resvg', `${iconName}.png`),
			resvg(buffer),
		]);
		const elapsed = stopTimer();

		console.log('resvg:', {
			duration: `${elapsed}ms`,
			icons: pngs.length,
		});

		await writeToDisk(pngs);

		return elapsed;
	})();

	// Benchmark sharp
	const sharpTime = await (async () => {
		const stopTimer = startTimer();
		const pngs = await Promise.all(
			svgs.map(async ([iconName, buffer]) => [
				path.join('pngs/sharp', `${iconName}.png`),
				await sharp(buffer),
			]),
		);
		const elapsed = stopTimer();

		console.log('sharp:', {
			duration: `${elapsed}ms`,
			icons: pngs.length,
		});

		await writeToDisk(pngs);

		return elapsed;
	})();

	console.log('sharp is faster by', (resvgTime / sharpTime).toFixed(2) + 'x');
})();
