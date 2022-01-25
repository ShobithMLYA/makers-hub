const router = require('express').Router()

router.get('/', (req, res) => {
    res.status(200).send('Login');
})

router.get('/:id', (req, res) => {
    res.status(200).send('Login');
})

router.post('/', (req, res) => {
    res.status(200).send('Login');
})

router.delete('/', (req, res) => {
    res.status(200).send('Login');
})

module.exports = router