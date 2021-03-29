import * as esbuild from 'esbuild-wasm';
import { unpkgPathPlugin } from 'bundler/plugins/unpkg-path-plugin';
import { fetchPlugin } from 'bundler/plugins/fetch-plugin';

let service: any;

const bundle = async (rawCode: string) => {
    if (!service)
        await esbuild
            .initialize({
                worker: true,
                wasmURL: 'https://unpkg.com/esbuild-wasm@0.11.0/esbuild.wasm',
            })
            .then(() => (service = true));

    const result = await esbuild.build({
        entryPoints: ['index.js'],
        bundle: true,
        write: false,
        plugins: [unpkgPathPlugin(), fetchPlugin(rawCode)],
        define: {
            'process.env.NODE_ENV': '"production"',
            global: 'window',
        },
    });
    return result.outputFiles[0].text;
};

export default bundle;
