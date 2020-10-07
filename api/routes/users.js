const express = require('express'),
    router = express.Router(),
    config = require('config'),
    fs = require('file-system');

router.get('/api/users', (req, res) => res.send(fs.readFileSync(config.get('database.data'), 'utf8')));

module.exports = router;