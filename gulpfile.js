var gulp =require('gulp');

//var jshint=require('gulp-jshint');//用于检测js是否有错误
var sass=require('gulp-sass');//sass
//var concat=require('gulp-concat');//用于合并文件
//var uglify=require('gulp-uglify');//压缩
//var rename=require('gulp-rename');//重命名
//var connect=require('gulp-connect');//gulp http服务器插件
//var imgmin=require('gulp-imagemin');
//var mincss=require('gulp-clean-css');


// gulp.task('scripts',function(){
// 	gulp.src('libs/js/*.js')
// 		.pipe(concat('all.js'))
// 		.pipe(gulp.dest('libs/dist'))
// 		.pipe(rename('all.min.js'))
// 		.pipe(uglify())
// 		.pipe(gulp.dest('libs/dist'));
// });

// //检查脚本
// gulp.task('lint', function() {
//    gulp.src('libs/js/*.js')
//        .pipe(jshint())
//        .pipe(jshint.reporter('default'));
// });

// //压缩图片
// gulp.task('img',function(){
// 	gulp.src('images/*.{jpg,png,gif,ico}')
//         .pipe(imgmin())
//         .pipe(gulp.dest('images/img'));
// })

// //压缩css
// gulp.task('css',function(){
// 	return gulp.src('libs/css/*.css')
// 		   .pipe(rename({suffix:'.min'}))
//            .pipe(mincss({compatibility:'ie7'}))
//            .pipe(gulp.dest('libs/css/mincss'));
// });



// gulp.task('watch',function(){
// 	gulp.watch(['libs/js/*.js'],['scripts']);
// 	gulp.watch(['libs/css/*.css'],['css']);
// })

gulp.task('default',function(){
	gulp.run('sass');
})

gulp.task('sass',function(){
	gulp.src('libs/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('libs/css'));
});

