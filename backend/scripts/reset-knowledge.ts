import knex from "../database/index.schema";

async function run() {
  console.log("--- Deleting Non-Anstric Agents ---");
  await knex("agents").where("id", "!=", 4).del();
  
  console.log("--- Deleting All Sources ---");
  await knex("sources").del();
  
  console.log("--- Resetting Anstric Agent Training Status ---");
  await knex("agents").where("id", 4).update({ 
    training_status: "idle", 
    training_progress: 0, 
    embedded_sources_count: 0,
    training_error: null 
  });
  
  const agents = await knex("agents").select("id", "name", "training_status", "embedded_sources_count");
  console.log("Current Agents:", agents);

  console.log("Done.");
  process.exit(0);
}

run().catch(console.error);
