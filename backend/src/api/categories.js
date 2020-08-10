module.exports = db =>{
    const save = async (req , res) =>{ 
        const categorie = {...req.body}
        console.log(categorie)
        await db('categories')
        .insert(categorie)
        .then(_ => res.status(204).send())
        .catch(error => res.status(500).send(error))
    }
    
    const get = async (req, res) =>{
        await db('categories')
        .then(categories => res.json(categories))
        .catch(error => res.status(500).send(error))
    }

    const getById = async (req , res) => {
        await db('categories')
        .where({id: req.params.id})
        .first()
        .then(categorie => res.json(categorie) )
        .catch(error => res.status(500).send(error))
    }

    return {save , get , getById}
}