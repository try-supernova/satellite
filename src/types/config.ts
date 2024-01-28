export interface Config {
    entry: string,
    output: string,
    /**
     * Files to bundle separately
     */
    exclude: string[],
}