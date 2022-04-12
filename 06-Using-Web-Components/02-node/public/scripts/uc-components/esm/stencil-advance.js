import { p as promiseResolve, b as bootstrapLazy } from './index-38b5e78e.js';

/*
 Stencil Client Patch Browser v2.15.0 | MIT Licensed | https://stenciljs.com
 */
const patchBrowser = () => {
    const importMeta = import.meta.url;
    const opts = {};
    if (importMeta !== '') {
        opts.resourcesUrl = new URL('.', importMeta).href;
    }
    return promiseResolve(opts);
};

patchBrowser().then(options => {
  return bootstrapLazy([["my-component",[[1,"my-component",{"first":[1],"middle":[1],"last":[1]}]]],["app-spinner_3",[[1,"app-stock-finder",{"searchResults":[32],"loading":[32]}],[1,"app-stock-price",{"stockSymbol":[1537,"stock-symbol"],"price":[32],"stockUserInput":[32],"stockInputValid":[32],"error":[32],"loading":[32]},[[16,"ucSymbolSelected","onStockSymbolSelected"]]],[1,"app-spinner"]]]], options);
});
