/*
* name;
*/
var RandomUtils = (function () {
    function RandomUtils() {
    }
    RandomUtils.limit = function ($from, $end) {
        $from = Math.min($from, $end);
        $end = Math.max($from, $end);
        var range = $end - $from;
        return $from + Math.random() * range;
    };
    return RandomUtils;
}());
//# sourceMappingURL=RandomUtils.js.map