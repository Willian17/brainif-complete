
exports.up = function(knex) {
  return knex.schema.createTable('categories' , table => {
      table.increments().primary();
      table.string('name').unique().notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('categories')
};
