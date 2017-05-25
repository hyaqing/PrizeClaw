class RandomUtils{
    public static limit($from: number,$end: number): number {
        $from = Math.min($from,$end);
        $end = Math.max($from,$end);
        var range: number = $end - $from;
        return $from + Math.random() * range;
    }
}