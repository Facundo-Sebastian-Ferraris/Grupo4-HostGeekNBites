// const chalk = require('chalk');

// console.log(chalk.blue('Texto en azul'));
// console.log(chalk.red('Texto en rojo'));


//en mi pc no funca lo de arriba, asi que mando esto que si me funciona (no lo analice)

(async () => {
    const chalk = (await import('chalk')).default;

    console.log(chalk.blue('Texto en azul'));
    console.log(chalk.red('Texto en rojo'));
})();

