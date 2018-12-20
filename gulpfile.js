let gulp = require('gulp');
let uglify=require('gulp-uglify');
let babel=require('gulp-babel');
let cleancss=require('gulp-clean-css');
let webserver=require('gulp-webserver');
let sass=require('gulp-sass');
let template=require('art-template');


gulp.task("buildJS",()=>{
	//只复制
	gulp.src("./src/js/libs/*.js")
	.pipe(gulp.dest("./dist/js/libs"));
	gulp.src("./src/js/json/*.json")
	.pipe(gulp.dest("./dist/js/json"));
	//编译压缩复制
	
	gulp.src("./src/js/*.js")
	.pipe(babel({
		presets:['env']
	}))
	.pipe(uglify())
	.pipe(gulp.dest("./dist/js"));
})

gulp.task("buildCSS",()=>{
	gulp.src("./src/style/*.scss")
	.pipe(sass())
	.pipe(gulp.dest("./dist/style"));
	gulp.src("./src/style/*.css")
	.pipe(gulp.dest("./dist/style"));
})

gulp.task("buildHTML",()=>{
	gulp.src("./src/html/*.html")
	.pipe(gulp.dest("./dist/html"))
})

gulp.task("buildStaticResource",()=>{
	gulp.src("./src/static/font/**/*.*")
	.pipe(gulp.dest("./dist/static/font"))
	gulp.src("./src/static/img/**/*.*")
	.pipe(gulp.dest("./dist/static/img"))
})

gulp.task("watching",()=>{
	gulp.watch("./src/**/*.css",["buildCSS"]);
	gulp.watch("./src/**/*.scss",["buildCSS"]);
	gulp.watch("./src/**/*.html",["buildHTML"]);
	gulp.watch("./src/**/*.*",["buildJS"]);
	gulp.watch("./src/static/**/*.*",["buildStaticResource"]);
})

gulp.task('webserver',["watching"],()=>{
	gulp.src('dist')
	.pipe(webserver({
		livereload:true,
//		https:true,
		port: 3002,//端口
		host: '127.0.0.1',//域名
		proxies:[
			{
				source:'/hotword',
				target:'http://search.yhd.com/hotWord.do'
			}
		]
	}))
})

gulp.task("build",["buildJS","buildCSS","buildHTML", "buildStaticResource"])
gulp.task("default",["webserver","buildJS","buildCSS","buildHTML", "buildStaticResource"])
