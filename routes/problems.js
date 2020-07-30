const express = require('express')
const router = express.Router()
const Problem = require('../models/Problems')
const passport = require('passport')
const { ensureAuthenticated } = require('../config/auth')


// Ścieżka do listy zadań
router.get('/', ensureAuthenticated, async (req, res) => {
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
router.get('/new', ensureAuthenticated, (req, res) => {
    res.render('problems/new', { problem: new Problem() })
})

// Tworzenie nowego zadnia
router.post('/', ensureAuthenticated, async (req, res) => {
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
        res.redirect(`problems/${newProblem.title}`)
    } catch(error){
        if(error.errors.title.kind == 'unique'){
            res.render('problems/new', {
                problem: problem,
                error_msg: "Zadanie o takiej nazwie juz istnieje!"
            })
        } else {
            res.render('problems/new', {
                problem: problem,
            })
        }
    }
})

// Ścieżka do wyświetlenia strony konkretnego zadania
router.get('/:title', ensureAuthenticated, async (req, res) => {
    try{
        const problem = await Problem.findOne({ title: req.params.title }).exec()
        res.render('problems/show', { problem: problem })
    } catch {
        res.redirect('/')
    }
})

// Strona do edytowania zadań
router.get('/:title/edit', ensureAuthenticated, async (req, res) => {
    try{
        const problem = await Problem.findOne({ title: req.params.title }).exec()
        res.render('problems/edit', { problem: problem })
    } catch {
        res.redirect('/problems')
    }
})


// Zapisywanie zmian do bazy danych
router.put('/:id', ensureAuthenticated, async (req, res) => {
    let problem
    try{
        problem = await Problem.findById(req.params.id)
        problem.title = req.body.title
        problem.contents = req.body.contents
        problem.explanation = req.body.explanation
        problem.solution = req.body.solution
        problem.school = req.body.school
        await problem.save()
        res.redirect(`/problems/${problem.title}`)
    } catch {
        if(problem == null){
            res.redirect('/')
        }
        res.render('problems/edit', {
            problem: problem,
            error_msg: 'Wystąpił błąd podczas edytowania zadania.'
        })
    }
})

router.delete('/:id', async (req, res) => {
    let problem
    try {
        problem = await Problem.findById(req.params.id)
        await problem.remove()
        res.redirect('/dashboard')
    } catch {
        if(problem == null){
            res.redirect('/dashboard')
        }
        res.redirect(`/problems/${problem.title}`)
    }
})

module.exports = router