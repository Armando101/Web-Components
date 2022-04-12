'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-9ee92823.js');

/*
 Stencil Client Patch Esm v2.15.0 | MIT Licensed | https://stenciljs.com
 */
const patchEsm = () => {
    return index.promiseResolve();
};

const defineCustomElements = (win, options) => {
  if (typeof window === 'undefined') return Promise.resolve();
  return patchEsm().then(() => {
  return index.bootstrapLazy([["my-component.cjs",[[1,"my-component",{"first":[1],"middle":[1],"last":[1]}]]],["app-spinner_3.cjs",[[1,"app-stock-finder",{"searchResults":[32],"loading":[32]}],[1,"app-stock-price",{"stockSymbol":[1537,"stock-symbol"],"price":[32],"stockUserInput":[32],"stockInputValid":[32],"error":[32],"loading":[32]},[[16,"ucSymbolSelected","onStockSymbolSelected"]]],[1,"app-spinner"]]]], options);
  });
};

exports.defineCustomElements = defineCustomElements;
