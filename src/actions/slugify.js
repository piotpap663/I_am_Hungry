module.exports = str => {
    const from = 'ąàáäâãåæćęęèéëêìíïîłńòóöôõøśùúüûñçżź',
        to = 'aaaaaaaaceeeeeeiiiilnoooooosuuuunczz',
        regex = new RegExp('[' + from.replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1') + ']', 'g');

    if (str === null) return '';

    str = String(str)
        .toLowerCase()
        .replace(regex, function(c) {
            return to.charAt(from.indexOf(c)) || '-';
        });

    return str
        .replace(/[^\w\s-]/g, '')
        .replace(/([A-Z])/g, '-$1')
        .replace(/[-_\s]+/g, '-')
        .toLowerCase();
};
