'use strict'

var dbm
var type
var seed

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function (options, seedLink) {
    dbm = options.dbmigrate
    type = dbm.dataType
    seed = seedLink
}

exports.up = function (db) {
    const promises = []

    promises.push(db.insert('technicians', ['id', 'nombre'], ['1', 'camilo']))
    promises.push(db.insert('technicians', ['id', 'nombre'], ['2', 'sara']))
    promises.push(db.insert('technicians', ['id', 'nombre'], ['3', 'juan']))

    return Promise.all(promises)
}

exports.down = function (db) {
    return null
}

exports._meta = {
    version: 1,
}
