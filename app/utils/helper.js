export const isEmpty = ((val) => {
    if (!val) {
        return true;
    }

    if (typeof val === 'string') {
        return !val.trim();
    }

    return !Object.keys(val).length;
});

export const returnPromise = (data) => {
    return Promise.resolve(data)
        .then((results) => {
            return results;
        })
        .catch((error) => {
            throw error;
        });
};
