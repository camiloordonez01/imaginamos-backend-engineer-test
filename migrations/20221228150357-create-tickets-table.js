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
    return db.createTable('tickets', {
        columns: {
            id: { type: 'SERIAL', primaryKey: true },
            token: { type: 'TEXT', notNull: true },
            technicians_id: {
                type: 'INT',
                notNull: true,
                foreignKey: {
                    name: 'fk_tickets_technicians',
                    table: 'technicians',
                    rules: {
                        onDelete: 'RESTRICT',
                        onUpdate: 'RESTRICT',
                    },
                    mapping: 'id',
                },
            },
        },
        ifNotExists: true,
    })
}

exports.down = function (db) {
    return db.dropTable('tickets')
}

exports._meta = {
    version: 1,
}
