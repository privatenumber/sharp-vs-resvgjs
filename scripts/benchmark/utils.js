import fs from 'fs/promises';
import path from 'path';

export const startTimer = () => {
	const startTime = Date.now();
	return () => Date.now() - startTime;
};

export async function writeToDisk(pngs) {
	await Promise.all(
		pngs.map(
			async ([filePath, buffer]) => {
				await fs.mkdir(path.dirname(filePath), { recursive: true });
				await fs.writeFile(
					filePath,
					buffer,
				);
			},
		),
	);
}
