const gulp   = require("gulp");
const prefix = require("gulp-autoprefixer");
const minify = require("gulp-clean-css");
const header = require("gulp-header");
const rename = require("gulp-rename");
const sass   = require("gulp-sass");
const size   = require("gulp-size");
const pkg    = require("./package.json");

const options = {
	"paths": {
		"srcAll": "./src/*.scss",
		"src": "./src/n0.scss",
		"dist": "./css/",
		"root": "./"
	},
	"prefix": ["last 4 versions"],
}

gulp.task("build:css", () => {
	return gulp.src(options.paths.src)
		.pipe(sass().on("error", sass.logError))
		.pipe(prefix({options: options.prefix }))
		.pipe(header("/* ${pkg.name} - ${pkg.version} */\n", { pkg: pkg }))
		.pipe(gulp.dest(options.paths.dist))
		.pipe(size({title: "Raw"}))
		.pipe(minify())
		.pipe(rename({ suffix: ".min" }))
		.pipe(size({title: "Min"}))
		.pipe(size({title: "Gzip: ", gzip: true}))
		.pipe(header("/* ${pkg.name} - ${pkg.version} */\n", { pkg: pkg }))
		.pipe(gulp.dest(options.paths.dist))
});

gulp.task("default", ["build:css"], () => {
	gulp.watch(options.paths.srcAll, ["build:css"]);
})