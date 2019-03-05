const express = require('express');
const fs = require('fs');
const Settings = require('./routes/settings');

const router = express.Router();

const settingsData = './db/settings.json';

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

router.get('/', (req, res) => {
    res.send('Server is listening...');
});

router.get('/settings', (req, res) => {
    return res.send(Settings.getSettings(settingsData));
});

router.post('/settings', (req, res) => {
    let _res = {
        type: '',   // success | error
        data: {     // object
            body: {},
            text: ''
        }    
    }

    if (Object.keys(req.body).length === 0) {
        _res.type = 'error';
        _res.data.text = 'Данные формы не получены';
    }


    if (_res.type !== 'error') {
        try {
            for (let room in req.body.rooms) {
                if (req.body.rooms[room].length === 0)
                    delete req.body.rooms[room];
            }
            
            if (Object.keys(req.body.rooms).length === 0) {
                _res.type = 'error';
                _res.data.text = 'Необходимо задать площади хотя бы для одного типа квартир';
            }

            if (_res.type !== 'error') {
                // Убираю первый null элемент
                req.body.prices.shift();
                // Удаляю временУю часть из даты
                req.body.period = req.body.period.split('T')[0];

                const reqBody = {
                    ...req.body,
                    minprice: +Math.min.apply(null, req.body.prices),
                    floor: +req.body.prices.length
                }

                // console.log(reqBody);

                let file_read = fs.readFileSync(settingsData, 'utf8');
                let newSettings = JSON.parse(file_read);
                for (let key in newSettings) {
                    if (reqBody.hasOwnProperty(key)) {
                        newSettings[key] = isNumeric(reqBody[key]) 
                                        ? +reqBody[key] 
                                        : (key === 'prices') ? reqBody[key].map((price, k) => +price) : reqBody[key];
                    }
                }
                fs.writeFileSync(settingsData, JSON.stringify(newSettings));

                _res.type = 'success';
                _res.data.body = newSettings;
                _res.data.text = 'Настройки успешно сохранены';

            }

            res.send(JSON.stringify(_res));
            
        } catch (err) {
        //    console.log('Error occurred: ' + err.name + ":" + err.message + "\n" + err.stack);
            console.log('Error occurred: ', err);
            res.send(err);
        }
   
    } else {
        res.send(JSON.stringify(_res));
    }

});

module.exports = router;