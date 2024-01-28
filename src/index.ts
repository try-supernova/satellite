import { program } from "commander";
import {readFile} from "fs/promises"
const {version} = JSON.parse(
    await readFile("./package.json", "utf-8")
);
import {build} from "esbuild"
export { process } from "./SDKindex.ts"

program
    .name("satellite")
    .version(version)
    .description("Satellite build makes it easy for you to build your application");

program.command("build")
    .description("Build the project")
    .option("-C, --config [file]", "Config file pa")
    .action(async (options) => {
        let config;

        console.log("Starting build");
            try {
                config = JSON.parse(await readFile("./program.config.json", "utf-8"))
            } catch (e) {
                if (e.code === "ENOENT") {
                    // no config file found, maybe it was in the options
                    try {
                        if (!options.config) {
                            console.log("Config file not found");
                            process.exit(1)
                        }
                        config = JSON.parse(await readFile(options.config, "utf-8"))
                    } catch (e) {
                        if (e.code === "ENOENT") {
                            console.log("Config file not found");
                            process.exit(1)
                        }
                    }
                } else { // some other error that isn't ENOENT
                    console.log("Error reading config file");
                    process.exit(1)
                }
            }
            console.log("Building")
        await build({
            entryPoints: [config.entry],
            bundle: true,
            outfile: config.output,
            platform: "browser",
            sourcemap: false,
            minify: true,
            external: config.exclude
        })
    });

program.parse(process.argv);