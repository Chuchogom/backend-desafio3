const fs = require('fs')

class Container {
    constructor(file){
        this.file = file
    }

    async save(product){
        let content = await fs.promises.readFile(this.file)
        let contObj = JSON.parse(content)
        let newId = contObj.length ? contObj[contObj.length-1].id +1 : 1

        product.id = newId;
        contObj.push(product)
        await fs.promises.writeFile(this.file, JSON.stringify(contObj))
    }

    async getAll(){
        let content = await fs.promises.readFile(this.file)
        let contObj = JSON.parse(content)
        return contObj
    }

    async getById(id){
        let contObj = await this.getAll()
        let result = contObj.find(obj => obj.id == id)
        return result
    }

    async deleteById(id){
        let contObj = await this.getAll()
        let newObj = contObj.filter(obj => obj.id !== id)
        await fs.promises.writeFile(this.file, JSON.stringify(newObj))
    }

    async listLength(){
        let list = await this.getAll();
        return await list.length;
    }

    async deleteAll(){
        await fs.promises.writeFile(this.file, "[]")
    }
}

module.exports = Container;
