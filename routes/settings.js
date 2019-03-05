const fs = require('fs');

module.exports = {
    getSettings: (file) => {
         let file_read = fs.readFileSync(file, 'utf8');
         return file_read;
    },

    updateSettings: (newSettings) => {
        try {
            fs.readFile(settings, 'utf-8', (err, file) => {
                if (err)
                    throw err;
    
                fs.writeFile(settings, newSettings + file, function(err, data) {});
            });
        } catch (e) {
            console.log('Error occurred: ' + e.name + ":" + e.message + "\n" + e.stack);
        }
    }
};