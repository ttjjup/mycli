const co = require('co');
const prompt = require('co-prompt');
const config = require('../templates');
const chalk = require('chalk');
const fs = require('fs');

module.exports = () => {
    co( function *() {
        // waiting input
        let tplName = yield prompt('Template name: ');
        
        // del
        if(config[tplName]) {
            delete config[tplName];
        }
        else {
            console.log(chalk.red('Template does not exist!'));
            process.exit();
        }

        // write
        fs.writeFile(__dirname + '/../templates.json', 
        JSON.stringify(config), 'utf-8', (res, err) => {
           if(!err) {
               console.log(chalk.green(tplName + ' template delete!\n'));
               console.log(chalk.grey('The last template list is: \n'));
               console.log(config);
               console.log('\n');
           }
           else {
               console.log(err);
           }
           process.exit();
        });
    });
};