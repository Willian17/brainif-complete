
exports.up = function(knex) {
  return knex.schema.createTable('responses' , table =>{
      table.increments().primary();
      table.text('content').notNullable();
      table.string('date').notNullable();
      table.integer('teacherId').references('id')
       .inTable('teachers').notNullable();
       table.integer('questionId').references('id')
       .inTable('questions').notNullable();

       
  })
};


exports.down = function(knex) {
  return knex.schema.dropTable('responses')
};
