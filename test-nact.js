require('dotenv').config();
const { start, dispatch, stop, spawnStateless, spawn, query, configurePersistence, spawnPersistent } = require("nact");
const { PostgresPersistenceEngine } = require("nact-persistence-postgres");
const system = start(
	configurePersistence(
		new PostgresPersistenceEngine(
			process.env.DB_URL,
		)
	)
);

const delay = (time) => new Promise((res) => setTimeout(res, time));

// minimal complete verifiable example:

const persistentSum = spawnPersistent(
	system,
	async (total = 0, num = 0, ctx) => {
		console.log(num); // never gets called?
		if (!ctx.recovering && ctx.persist) {
			await ctx.persist(num);
		}
		return total + num;
	},
	"persistentsum", // persistence key
	"persistentsum", // actor name
);

for (let num of [1, 2, 3, 4, 5]) {
	dispatch(persistentSum, num);
}

(async function() {
	// wait for 5 seconds just in case
	await delay(5_000);
	stop(system);
})();

