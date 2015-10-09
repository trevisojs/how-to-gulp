How to Gulp
========================================

Questo è un repository per capire e testare le funzionalità di [Gulp].

Leggi il [tutorial] per maggiori informazioni.

## Gulp Tasks

Questo starter kit utilizza i seguenti task:

* `styles` – Compiliamo i file sass in css, usiamo autoprefixer per aggiungere i prefissi compatibili ed infine minifichiamo il risultato in web/css.
* `scripts` – Concateniamo i file js e li minifichiamo con uglify.
* `images` – Ottimizziamo immagini con imagemin.
* `build` – Lanciamo 'styles' e 'scripts' contemporaneamente.
* `watch` – Lanciamo 'styles' e 'scripts' quando ci sono modifiche ai file.
* 'copy:html' - Usiamo questo task per prendere i file html da _views e portarli minificati in web.
* `serve` – Usiamo browsersync per creare un server locale e per aggiornare il browser ad ogni modifica sui file.
* `default` – lanciando semplicemente 'gulp' dal terminale, è come se si lanciasse il task 'serve'


# Installing

Clona questo repository e lancia 'npm install' per scaricare le dipendenze di Node

    npm install

Non appena che le dipendenze sono state installate potete usare il task 'gulp' per far partire il progetto

    gulp

-------------------
[Gulp]:http://gulpjs.com/
[tutorial]:https://medium.com/@nicholasruggeri/how-to-gulp-7829775242b4
