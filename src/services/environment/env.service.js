const getEnvironment = () => {
    return process.env.ENVIRONMENT || 'undefined';
}

module.exports = getEnvironment;