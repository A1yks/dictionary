module.exports = {
    webpack(config, env) {
        const forkTsPlugInInstances = config.plugins.find((p) => p.constructor.name === 'ForkTsCheckerWebpackPlugin');
        if (!forkTsPlugInInstances) return config;

        forkTsPlugInInstances.options.typescript.build = true;

        return config;
    },
};
