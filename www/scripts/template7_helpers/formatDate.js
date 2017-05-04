Template7.registerHelper('formatDate', function (dateAsString, options) {
    function pad(s) { return (s < 10) ? '0' + s : s; }
    var d = new Date(dateAsString);
    return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/');
});