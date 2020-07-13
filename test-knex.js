require('dotenv').config();

// File here is just to prove that the DB_URL
// is correct and we can use it to perform
// schema changes in the DB

const pg = require("knex")({
	client: "pg",
	connection: process.env.DB_URL,
	debug: true,
});

(async function() {
	await pg.schema.hasTable("testing").then((exists) => {
		if (!exists) {
			return pg.schema.createTable("testing", (table) => {
				table.increments();
				table.string('name');
				table.timestamps();
			});
		}
	});

	await pg.destroy();
})();

