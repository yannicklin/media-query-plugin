
const postcss = require('postcss');
const store = require('./store');

module.exports = postcss.plugin('MediaQueryPostCSS', options => {

    function addToStore(name, atRule) {

        const css = postcss.root().append(atRule).toString();
        
        store.addMedia(name, css);
    }

    return (css, result) => {

        css.walkAtRules('media', atRule => {

            const queryname = options.queries[atRule.params];

            if (queryname) {
                const name = `${options.basename}-${queryname}`;
                addToStore(name, atRule);
                atRule.remove();
            }
        });
    };
});