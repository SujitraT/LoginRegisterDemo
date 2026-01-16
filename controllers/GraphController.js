const or_prod = require('../models/oper_ratio')


module.exports.getGraphData = async (req,res) =>{
       try{

                const graph = await or_prod.aggregate([
                {
                        $group: {
                        _id: {
                                line_name:"$line_name",
                                date:{$dateToString: {format: "%Y-%m-%d",date: "$date",timezone: "Asia/Bangkok"
                                }}},
                        plan: { $sum: "$plan" },
                        actual: { $sum: "$actual" }
                        }
                },{
                        $sort:{
                                "_id.date":1,
                                "_id.line_name":1
                        }
                }
                ])
 
                const labels = []
                const plan = []
                const actual = []

                graph.forEach(element => {
                labels.push(element._id.line_name)
                plan.push(element.plan);     // sum plan
                actual.push(element.actual);
                })

                res.status(200).json({labels:labels,plan:plan,actual:actual})
       } catch (err){
                console.log(err)
                res.status(500).json({ message: err.message });
       }
        
}
