import { defineConfig } from "vite";
import { createHtmlPlugin } from "vite-plugin-html";
import { viteStaticCopy } from 'vite-plugin-static-copy';

import ejs from "ejs";
import fs from "fs-extra";

const head = ejs.render(fs.readFileSync("./src/assets/templates/head.html", "utf8"));
const topbar = ejs.render(fs.readFileSync("./src/assets/templates/topbar.html", "utf8"));
const hero = ejs.render(fs.readFileSync("./src/assets/templates/hero.html", "utf8"));
const header = ejs.render(fs.readFileSync("./src/assets/templates/header.html", "utf8"));
const footer = ejs.render(fs.readFileSync("./src/assets/templates/footer.html", "utf8"));
const contact = ejs.render(fs.readFileSync("./src/assets/templates/contact.html", "utf8"));
const products = ejs.render(fs.readFileSync("./src/assets/templates/products.html", "utf8"));
const about = ejs.render(fs.readFileSync("./src/assets/templates/about.html", "utf8"));

export default defineConfig({
    plugins: [
        createHtmlPlugin({
            minify: true, 
            template: './index.html',
            inject: {
                data: {
                    head: head,
                    topbar: topbar,
                    hero: hero,
                    contact: contact,
                    header: header,
                    footer: footer,
                    products: products,
                    about: about
                },
                tags: [
                    {
                        tag: 'script',
                        attrs: { type: 'module', src: 'src/assets/js/main.js' },
                        injectTo: 'body'
                    }
                ],
            },
        }),
        viteStaticCopy({
            targets: [
                {
                    src: 'src/assets/', 
                    dest: ''
                }
            ]
        })
    ],
    server: {
        mimeTypes: {
            'css': 'text/css',
            'js': 'application/javascript'
        }
    },
    css: {
        preprocessorOptions: {
            scss: {
                // additionalData: `@import "variables";`,
                
                additionalData: `@use "variables" as *;`,
                includePaths: ["src/assets/scss"]
            },
        },
    },

    build: {
        rollupOptions: {
            preserveEntrySignatures: 'strict',
            input: {
                main: 'index.html', 
            },
            output: {
             
                entryFileNames: 'assets/[name].js',
                chunkFileNames: 'assets/[name].js',
                assetFileNames: 'assets/[name].[ext]',
                manualChunks: undefined, 
            },
        },
    }

});