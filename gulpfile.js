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
		"src": "./src/*.scss",
		"dist": "./css/",
		"root": "./"
	},
	"prefix": ["last 2 versions"],
}

gulp.task("build:css", () => {
	return gulp.src(options.paths.src)
		.pipe(sass().on("error", sass.logError))
		.pipe(prefix({options: options.prefix }))
		.pipe(header("/* ${pkg.name} - ${pkg.version} */\n", { pkg: pkg }))
		.pipe(gulp.dest(options.paths.dist))
		.pipe(minify())
		.pipe(rename({ suffix: ".min" }))
		.pipe(size())
		.pipe(header("/* ${pkg.name} - ${pkg.version} */\n", { pkg: pkg }))
		.pipe(gulp.dest(options.paths.dist))
});

gulp.task("default", ["build:css"], () => {
	gulp.watch(options.paths.src, ["build:css"]);
})