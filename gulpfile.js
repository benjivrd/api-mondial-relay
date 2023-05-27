const gulp = require("gulp");
const ts = require("gulp-typescript");
const terser = require('gulp-terser');


const tsProject = ts.createProject("tsconfig.json");

// Tâche pour compiler les fichiers TypeScript
gulp.task("compile", () => {
  return tsProject.src()
  .pipe(tsProject())
  .js
  .pipe(gulp.dest("dist")); 
});

// Tâche pour minifier les fichiers JavaScript compilés
gulp.task("minify", () => {
  return gulp.src("dist/**/*.js")
  .pipe(terser({
    compress: {
      unused: true // Supprimer les variables inutilisées
    },
    format: {
      comments: false // Supprimer les commentaires
    }
  }))
  .pipe(gulp.dest("dist"));
});


// Tâche par défaut qui enchaîne les tâches ci-dessus
gulp.task("build", gulp.series("compile", "minify"));