const unflattenObject = (data) => {
    const result = {};

    for (const key in data) {
        const keys = key.split('.');

        keys.reduce((acc, part, index) => {
            if (index === keys.length - 1) {
                // Si el valor es 'null', lo cambiamos por null real
                acc[part] = data[key] === 'null' ? null : data[key];
            } else {
                acc[part] = acc[part] || {};
            }
            return acc[part];
        }, result);
    }

    return result;
};

module.exports = { unflattenObject };
