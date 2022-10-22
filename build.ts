import fs from 'node:fs/promises';
import ts from 'typescript';
import packageJson from './package.json';

const build = async () => {
    const buffer = await fs.readFile('./src/index.ts');

    ts.transpile(buffer.toString(), undefined, `${packageJson.name}.js`);
};

if (require.main === module) {
    build();
}

export default build;