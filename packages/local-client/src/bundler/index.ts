import * as esbuild from 'esbuild-wasm';
import { unpkgPathPlugin } from 'bundler/plugins/unpkg-path-plugin';
import { fetchPlugin } from 'bundler/plugins/fetch-plugin';

let service: boolean;

const bundle = async (rawCode: string) => {
    if (!service)
        await esbuild
            // @ts-ignore
            .initialize({
                worker: true,
                wasmURL: 'https://unpkg.com/esbuild-wasm@0.11.0/esbuild.wasm',
            })
            .then(() => (service = true));

    try {
        const result = await esbuild.build({
            entryPoints: ['index.js'],
            bundle: true,
            write: false,
            plugins: [unpkgPathPlugin(), fetchPlugin(rawCode)],
            define: {
                'process.env.NODE_ENV': '"production"',
                global: 'window',
            },
            jsxFactory: '_React.createElement',
            jsxFragment: '_React.Fragment',
        });
        console.log('Result is being returned!');
        return { code: result.outputFiles[0].text, err: '' };
    } catch (err: any) {
        return {
            code: '',
            err: err.message,
        };
    }
};

export default bundle;
