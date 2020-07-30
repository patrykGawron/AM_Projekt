const express = require('express')
const router = express.Router()
const Problem = require('../models/Problems')


// Ścieżka do listy zadań
router.get('/', async (req, res) => {
    try
    {
        const problems = await Problem.find()
        res.render('problems/index', {
            problems: problems,
        })
    } catch {
        res.redirect('/')
    }
})

// Ścieżka do wyświetlenia strony konkretnego zadania
router.get('/:id', async (req, res) => {
    try{
        const problem = await Problem.findById(req.params.id)
        res.render('problems/show', { problem: problem })
    } catch {
        res.redirect('/')
    }
})

module.exports = router