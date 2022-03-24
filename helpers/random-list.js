const puppeteer = require('puppeteer');
require('colors');

const generateRandomList = async (list) => {
  try {
    console.log(`${'-'.gray} Accediendo a ${'https://psychicscience.org/randomlist'.blue}`);
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://psychicscience.org/randomlist');
    console.log(`${'-'.gray} Generando lista de tareas random`);

    const button = '#go';
    const textArea = '#output'

    page.click(button);
    await page.waitForTimeout(400)
    await page.waitForSelector(textArea);

    await page.type(textArea, list);
    page.click(button);

    await page.waitForTimeout(1000)
    console.log(`${'-'.gray} Recuperando lista de tareas randomizada`);

    const result = await page.$(textArea);
    const resultText = await page.evaluate(element => element.value, result);

    const randomizedList = String(resultText).split('\n\n')[0].split('\n');

    await page.screenshot({ path: 'randomized-list.png' });
    await browser.close();

    console.log(`${'-'.gray} Lista de tareas recuperada con éxito`);
    return randomizedList;
  } catch (error) {
    console.log('<================ Ha ocurrido un error al generar la lista ================>'.red);
    throw new Error(error);
  }
}

module.exports = { generateRandomList }