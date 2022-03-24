const puppeteer = require('puppeteer');
require('colors');


const createTaskTodoist = async (list) => {

  try {
    console.log(`${'-'.gray} Accediendo a ${'https://todoist.com/'.blue}`);

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://todoist.com/');

    const anchorlogInPage = '._3XsmI>li:nth-child(1)';
    const email = '#email';
    const password = '#password';
    const button = '.sel_login';
    const add_button = '.plus_add_button';

    console.log(`${'-'.gray} Iniciando sesión`);

    page.click(anchorlogInPage);
    await page.waitForSelector(email);
    await page.type(email, 'omaresendiz22@hotmail.com');
    await page.waitForSelector(password);
    await page.type(password, 'Test2022*');
    page.click(button);
    await page.waitForTimeout(7000);
    
    console.log(`${'-'.gray} Sesión iniciada con éxito`);
    
    console.log(`${'-'.gray} Creando tareas`);
    
    await page.waitForSelector(add_button);
    page.click(add_button);
    await page.waitForTimeout(1000);

    for (task of list) {
      await page.keyboard.type(task);
      await page.waitForTimeout(200);
      page.keyboard.press('Enter');
      await page.waitForTimeout(200);
    }

    page.keyboard.press('Escape');
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'todoist-list.png' });
    await browser.close();

    console.log(`${'-'.gray} Tares creadas con éxito`);
  } catch (error) {
    console.log('<================ Ha ocurrido un error al crear las tareas en todoist ================>'.red);
    throw new Error(error);
  }
}

module.exports = { createTaskTodoist }