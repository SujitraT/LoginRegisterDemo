const or_prod = require('../models/oper_ratio')


module.exports = async (req,res) =>{
       try{

                const OR = await or_prod.find()
                res.render('index',{
                     OR           
              })
       } catch (err){
                console.log(err)
                res.status(500).send("<h1>Error loading data</h1>")
       } 
        
}
