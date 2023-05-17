const express = require('express')
const app =  express()
const bodyParser = require('body-parser')
const sqlite = require('sqlite3').verbose()
const {resolve,join} = require('path')
const DBPATH = resolve(__dirname,'..','data','CURRICULO.db')
const port = 3000
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(express.static(join(__dirname, "../")))
app.get('/',(req,res)=>{
    res.redirect('frontend/index.html?teste=1')
})
app.get('/criar',(req,res)=>{
    res.redirect('frontend/teste.html')
})
app.get('/ver',(req,res)=>{
    res.redirect('frontend/ver_curriculo.html')
})
app.get('/final',(req,res)=>{
    res.redirect('frontend/final.html')
})
app.get('/experiencia/:id',(req,res)=>{
    const{id}=req.params
    res.redirect(`/frontend/experiencia.html?id=${id}`)
})
app.get('/formacao/:nome',(req,res)=>{
    const{nome}=req.params
    res.redirect(`/frontend/formacao.html?nome=${nome}`)
}) 
app.get('/contatos/:id',(req,res)=>{
    const{id}=req.params
    res.redirect(`/frontend/contatos.html?id=${id}`)
}) 
app.get('/competencia/:id',(req,res)=>{
    const{id}=req.params
    res.redirect(`/frontend/competencia.html?id=${id}`)
}) 
app.get('/curriculo',(req,res)=>{
    const{nome} = req.query
     var sql  = `select * from Pessoa where nome="${nome}";`;
      var db = new sqlite.Database(DBPATH);
      db.all(sql,[],(err,row)=>{
          if(err) return console.log(err)
          res.json(row)
      });
      db.close();
})
app.get('/get_form',(req,res)=>{
    const{id} = req.query
     var sql  = `select * from formacao_academica where pessoa_id=${id};`;
      var db = new sqlite.Database(DBPATH);
      db.all(sql,[],(err,row)=>{
          if(err) return console.log(err)
          res.json(row)
      });
      db.close();
})
app.get('/get_exp',(req,res)=>{
    const{id} = req.query
     var sql  = `select * from experiencia_profissional where id_pessoa=${id};`
      var db = new sqlite.Database(DBPATH);
      db.all(sql,[],(err,row)=>{
          if(err) return console.log(err)
          res.json(row)
      });
      db.close();
})
app.get('/get_cont',(req,res)=>{
    const{id} = req.query
     var sql  = `select * from Contatos where id_pessoa=${id};`
      var db = new sqlite.Database(DBPATH);
      db.all(sql,[],(err,row)=>{
          if(err) return console.log(err)
          res.json(row)
      });
      db.close();
})
app.get('/get_comp',(req,res)=>{
    const{id} = req.query
     var sql  = `select * from competencia where id_pessoa=${id}`;
      var db = new sqlite.Database(DBPATH);
      db.all(sql,[],(err,row)=>{
          if(err) return console.log(err)
          res.json(row)
      });
      db.close();
})
app.post('/formacao',(req,res)=>{
    const{id_pessoa,curso,instituicao,tipo_formacao,inicio,termino} = req.body
    console.log(termino)
     var sql  = `insert into formacao_academica(pessoa_id,nome_curso,instituicao,tipo_formacao,inicio,termino) values(?,?,?,?,?,?)`;
     var db = new sqlite.Database(DBPATH);
     db.all(sql,[id_pessoa,curso,instituicao,tipo_formacao,inicio,termino],(err,row)=>{
         if(err) return console.log(err)
         res.redirect(`/experiencia/${id_pessoa}`)
     });
     db.close();
})
app.post('/contatos',(req,res)=>{
    const{id_pessoa,email,cel,tel} = req.body
     var sql  = `insert into Contatos(id_pessoa,email,numero_celular,numero_fixo) values(?,?,?,?)`;
     var db = new sqlite.Database(DBPATH);
     db.all(sql,[id_pessoa,email,cel,tel],(err,row)=>{
         if(err) return console.log(err)
         res.redirect(`/contatos/${id_pessoa}`)
     });
     db.close();
})
app.post('/competencia',(req,res)=>{
    const{id_pessoa,skill,competencia,nivel} = req.body
    let hard =false
    let soft =false
    console.log(id_pessoa)
    if(skill === 'soft'){
        hard=true
    }else{
        soft = true
    }
      var sql  = `insert into competencia(id_pessoa,competencia,hard_skill,soft_skill,nivel_competencia) values(?,?,?,?,?)`;
      var db = new sqlite.Database(DBPATH);
      db.all(sql,[id_pessoa,competencia,hard,soft,nivel],(err,row)=>{
          if(err) return console.log(err)
          res.redirect(`/competencia/?id_pessoa=${id_pessoa}`)
      });
      db.close();
})
app.post('/experiencia',(req,res)=>{
    const{id_pessoa,curso,instituicao,tipo_formacao,inicio,termino} = req.body
    console.log(termino)
     var sql  = `insert into experiencia_profissional(pessoa_id,empresa,cargo,descricao_atividades,periodo_permanencia) values(?,?,?,?,?)`;
     var db = new sqlite.Database(DBPATH);
     db.all(sql,[id_pessoa,curso,instituicao,tipo_formacao,inicio,termino],(err,row)=>{
         if(err) return console.log(err)
         res.redirect(`/contatos/${id_pessoa}`)
     });
     db.close();
})
app.post('/acharPessoa',(req,res)=>{
    const{nome} = req.body
    console.log(nome) 
    var sql  = `select id_pessoa from Pessoa where nome="${nome}"`; 
    var db = new sqlite.Database(DBPATH);
    db.all(sql,[],(err,row)=>{
        if(err) return console.log(err)
        console.log(row)
        res.json(row)
    });
    db.close();
})
app.post('/criar',(req,res)=>{
    const{nome,sobrenome,idade,endereco} = req.body
    console.log(nome) 
    var sql  = `insert into Pessoa(nome,sobrenome,idade,endereco) values("${nome}","${sobrenome}",${idade},"${endereco}")`;
    var db = new sqlite.Database(DBPATH);
    db.all(sql,[],(err,row)=>{
        if(err) return console.log(err)
        console.log(row)
        res.redirect(`/formacao/${nome}`)
    });
    db.close();
})
app.listen(port, function(){
    console.log()
    console.log('http://localhost:3000')
    console.log()
})