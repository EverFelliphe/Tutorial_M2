const express = require('express')
require('dotenv').config();
const bodyParser = require('body-parser')
const app =express();
const {resolve} = require('path')
const sqlite3 = require('sqlite3').verbose();
const DBPATH = resolve(__dirname, 'CURRICULO.db')
const PORT =  process.env.CAMINHO||3000;
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(express.static(resolve(__dirname, 'public')))
app.get('/',(req,res) =>{
    res.redirect('index.html')
})
app.get('/verificar',(req,res) =>{
    res.redirect('verificar.html')
})
app.get('/pessoas', (req,res)=>{
    const db = new sqlite3.Database(DBPATH)
    const sql = `SELECT * FROM pessoa`
    db.all(sql,[],(err,rows)=>{
        res.json(rows)
    })
})
app.post('/enviar', (req,res)=>{
    const dados= req.body
    console.log(dados)
    const {nome,sobrenome,idade,endereco} = dados
    const db = new sqlite3.Database(DBPATH)
    const sql = `INSERT INTO Pessoa(nome,sobrenome,idade,endereco) VALUES (?,?,?,?)`
    db.all(sql,[nome,sobrenome,idade,endereco],(err,rows)=>{
        if(err) res.send(err.message)
        res.json({msg:'enviado'})
    })
})
app.put('/update/:id', (req,res)=>{
    const {id} = req.params
    if(!id) return res.status(400).json({error:"é necessario selecionar uma pessoa"})
    const dados= req.body
    console.log(dados)
    const {nome,sobrenome,idade,endereco} = dados
    const db = new sqlite3.Database(DBPATH)
    const sql = `UPDATE Pessoa SET nome=?,sobrenome=?,idade=? ,endereco=? WHERE id_pessoa=?`
    db.all(sql,[nome,sobrenome,idade,endereco,id],(err,rows)=>{
        if(err) res.json({err:"ksvhbuçsdgbjl~dsfxghg "})
        res.json({msg:'atualizado'})
    })
})
app.delete('/deletar/:id', (req,res)=>{
    const {id} = req.params
    if(!id) return res.status(400).json({error:"é necessario selecionar uma pessoa"})
    const dados= req.body
    console.log(req)
    const {nome,sobrenome,idade,endereco} = dados
    const db = new sqlite3.Database(DBPATH)
    const sql = `DELETE FROM Pessoa where id_pessoa=?`
    db.all(sql,[id],(err,rows)=>{
        if(err) res.json({err:"ksvhbuçsdgbjl~dsfxghg "})
        res.json({msg:'deletado'})
    })
})
app.get('/show/:id', (req,res)=>{
    const {id} = req.params
    if(!id) return res.status(400).json({error:"é necessario selecionar uma pessoa"})
    const dados= req.body
    console.log(req)
    const {nome,sobrenome,idade,endereco} = dados
    const db = new sqlite3.Database(DBPATH)
    const sql = `SELECT * FROM Pessoa where id_pessoa=?`
    db.all(sql,[id],(err,rows)=>{
        if(err) res.json({err:"ksvhbuçsdgbjl~dsfxghg "})
        res.json({msg:'deletado'})
    })
})

app.listen(PORT,()=>{
    console.log()
    console.log(`http://localhost:${PORT}`)
    console.log()
})