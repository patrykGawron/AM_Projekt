const express = require('express')
const router = express.Router()
const Problem = require('../models/Problems')
const passport = require('passport')


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

// Strona dodawania nowego zadania
router.get('/new', (req, res) => {
    res.render('problems/new', { problem: new Problem() })
})

// Tworzenie nowego zadnia
router.post('/', async (req, res) => {
    const problem = new Problem({
        title: req.body.title,
        contents: req.body.contents,
        explanation: req.body.explanation,
        solution: req.body.solution,
        school: req.body.school,
        author: req.user === undefined ? 'anonymous' : req.user.name,
    })
    try {
        const newProblem = await problem.save()
        res.redirect(`problems/${newProblem.id}`)
    } catch{
        res.render('problems/new', {
            problem: problem,
        })
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