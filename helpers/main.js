const { generateRandomList } = require('../helpers/random-list');
const { createTaskTodoist } = require('../helpers/create-task');
require('colors');

const main = async (list) => {
  try {
    console.clear();
    console.log('================================'.green);
    console.log('        App Inicializada        '.bgGreen.black);
    console.log('================================\n'.green);

    // generar la lista random
    const randomList = await generateRandomList(list);

    // agregar cada campo de la lista en todoist
    await createTaskTodoist(randomList);
    console.log();
    console.log('================================'.green);
    console.log('         App Finalizada         '.bgGreen.black);
    console.log('================================\n'.green);
  } catch (error) {
    console.log(error)
  }
}

module.exports = { main }