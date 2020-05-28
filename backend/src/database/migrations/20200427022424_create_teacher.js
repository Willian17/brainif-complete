
exports.up = function(knex) {
  return knex.schema.createTable('teachers' , table =>{
      table.increments().primary();
      table.string('name').notNullable();
      table.string('email').unique().notNullable();
      table.string('password').notNullable();
      table.string('formation').notNullable();
      table.integer('categoryId').references('id')
      .inTable('categories')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('teachers');
};
