How to Gulp
========================================

Questo è un repository per capire e testare le funzionalità di Gulp.

## Gulp Tasks

Questo starter kit utilizza i seguenti task:

* `styles` – Compiliamo i file sass in css, usiamo autoprefixer per aggiungere i prefissi compatibili ed infine minifichiamo il risultato in web/css.
* `scripts` – Concateniamo i file js e li minifichiamo con uglify.
* `build` – Lanciamo 'styles' e 'scripts' contemporaneamente.
* `watch` – Lanciamo 'styles' e 'scripts' quando uno ci sono modifiche ai file.
* `serve` – Usiamo browsersync per creare un server locale e per aggiornare il browser ad ogni modifica sui file.
* `default` – lanciando semplicemente 'gulp' dal terminale, è come se si lanciasse il task 'serve'


# Installing

Clona questo repository e lancia 'npm install' per scaricare le dipendenze di Node

    npm install
    
Non appena che le dipendenze sono state installate potete usare il task 'gulp' per far partire il progetto

    gulp
    
