
exports.up = function(knex) {
  return knex.schema.createTable('questions' , table =>{
      table.increments().primary();
      table.text('content').notNullable();
      table.string('date').notNullable();
      table.string('studentId').references('registration')
      .inTable('students').notNullable();
      table.integer('categoryId').references('id')
       .inTable('categories').notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('questions')
};
