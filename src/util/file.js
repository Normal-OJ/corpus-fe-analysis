class File {
    constructor({
        name,
        children = [],
        fullName = '',
        parent = null,
    } = {}) {
        this.name = name
        this.children = children
        this.fullName = fullName
        this.parent = parent
        this.data = ''
    }
    pushDir(name) {
        let fullName = `${this.fullName}/${name}`
        this.children.push(new File({
            name,
            fullName,
            children: [],
            parent: this,
        }))
    }
    pushFile(name) {
        let fullName = `${this.fullName}/${name}`
        this.children.push(new File({
            name,
            fullName,
            parent: this,
        }))
    }
}

module.exports = File