import DataBase from '../../infrastructure/database'

export class Storage {
    protected database: DataBase
    constructor() {
        this.database = DataBase.createConnection()
    }
}
