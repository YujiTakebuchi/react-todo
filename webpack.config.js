const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { glob } = require("glob");
const CopyFilePlugin = require("copy-webpack-plugin");

const mode = "development";
const isDevMode = mode === "development";

const entriesJS = {};
glob.sync("./src/**/entry.js", {
    ignore: "./src/**/_*.js",
}).map((file) => {
    console.log(file);
    const regEx = new RegExp("./src");
    const fileOriginalName = file.replace(regEx, "");
    const key = fileOriginalName.replace("entry.js", "bundle.js");
    entriesJS[key] = file;
});

const entriesSass = {};
glob.sync("./src/**/*.scss", {
    ignore: "./src/**/_*.scss",
}).map((file) => {
    console.log(file);
    const regEx = new RegExp("./src");
    const fileOriginalName = file.replace(regEx, "");
    const fileChangeDirName = fileOriginalName.replace("/style/", "/css/");
    const fileChangeExtName = fileChangeDirName.replace(".scss", ".css");
    entriesSass[fileChangeExtName] = file;
});

module.exports = [
    {
        mode: mode,
        entry: entriesJS,
        output: {
            filename: "[name]",
            path: path.join(__dirname + "/dist"),
        },
        module: {
            rules: [
                {
                    test: /\.js/,
                    exclude: /node_modules/,
                    loader: "babel-loader",
                },
            ],
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: "./src/index.html",
            }),
        ],
        devtool: "source-map",
        devServer: {
            static: "dist",
            open: true,
        },
    },

    {
        mode: mode,
        entry: entriesSass,
        output: {
            path: path.join(__dirname + "/dist/css"),
            filename: "../../webpack/hash/[contenthash]",
        },
        module: {
            rules: [
                {
                    test: /\.scss/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                        },
                        {
                            loader: "css-loader",
                            options: {
                                url: false,
                                sourceMap: isDevMode,
                                importLoaders: 2,
                            },
                        },
                        {
                            loader: "postcss-loader",
                            options: {
                                postcssOptions: {
                                    plugins: [["autoprefixer", { grid: true }]],
                                },
                            },
                        },
                        {
                            loader: "sass-loader",
                            options: {
                                sourceMap: isDevMode,
                            },
                        },
                    ],
                },
            ],
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: "style.css",
            }),
            new CopyFilePlugin(
                {
                    patterns: [
                        {
                            context: "src",
                            from: "**/*.png",
                            to: path.resolve(__dirname, "dist/"),
                        },
                        {
                            context: "src",
                            from: "**/*.jpg",
                            to: path.resolve(__dirname, "dist/"),
                        },
                        {
                            context: "src",
                            from: "**/*.svg",
                            to: path.resolve(__dirname, "dist/"),
                        },
                        {
                            context: "src",
                            from: "**/*.mp4",
                            to: path.resolve(__dirname, "dist/"),
                        },
                        {
                            context: "src",
                            from: "**/*.json",
                            to: path.resolve(__dirname, "dist/")
                        }
                    ]
                },
                { copyUnmodified: true }
            ),
        ],
        target: ["web", "es5"],
        devtool: "source-map",
    },
];
