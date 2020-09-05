function trimPrefix(s, ch) {
    if (ch.length !== 1)
        throw 'ch must be a character';
    let i = 0;
    while (s[i] === ch)
        i++;
    return s.slice(i);
}

exports.default = {
    trimPrefix,
}