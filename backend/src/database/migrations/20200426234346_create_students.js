
exports.up = function(knex) {
  return knex.schema.createTable('students' , table =>{
      table.bigInteger('registration').primary();
      table.string('name').notNullable();
      table.string('username').notNullable().unique();
      table.integer('year').notNullable();
      table.string('password').notNullable();
      table.string('email').notNullable().unique();
      table.string('course').notNullable();

  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('students')
};
