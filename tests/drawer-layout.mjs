import {chromium,expect} from '@playwright/test';
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true,args:['--no-sandbox']});
const page=await browser.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
await page.goto('http://127.0.0.1:5173/');await page.getByRole('heading',{name:'2025 return overview'}).waitFor();
await page.locator('nav').getByRole('button',{name:'Documents',exact:true}).click();
async function openDocument(id){await page.getByRole('textbox',{name:'Search documents'}).fill(id);await Promise.all([page.waitForResponse(r=>r.url().endsWith('/api/workpaper')&&r.request().method()==='POST'),page.getByRole('button',{name:'Inspect',exact:true}).click()]);return page.getByRole('dialog',{name:'Source document'});}
async function checkLayout(drawer,context){const geometry=await drawer.evaluate(el=>{const paper=el.querySelector('.document-paper'),text=el.querySelector('.printed-text'),fields=el.querySelector('.drawer-section');return {paperBottom:paper.getBoundingClientRect().bottom,textBottom:text.getBoundingClientRect().bottom,fieldsTop:fields.getBoundingClientRect().top,titleHeight:el.querySelector('.drawer-title').getBoundingClientRect().height,scrollWidth:el.scrollWidth,width:el.clientWidth};});if(geometry.textBottom>geometry.paperBottom||geometry.textBottom>geometry.fieldsTop)throw Error(context+': document overlaps fields');if(geometry.scrollWidth>geometry.width+1)throw Error(context+': drawer overflows horizontally');if(geometry.titleHeight<50)throw Error(context+': title collapsed');}
for(const width of [1440,768,390]){
 await page.setViewportSize({width,height:900});
 for(const id of ['D23','D31','D74','D08','D36']){
  const drawer=await openDocument(id);await expect(drawer).toBeVisible();await checkLayout(drawer,`${width}px ${id} page 1`);
  if(id==='D23'){
   await expect(drawer.getByRole('button',{name:/Trip 1 miles/})).toContainText('118 mi');
   if(width===1440){await page.screenshot({path:'docs/drawer-overflow-fixed.png'});await drawer.getByRole('button',{name:/Trip 1 miles/}).scrollIntoViewIfNeeded();await page.screenshot({path:'docs/drawer-fields-fixed.png'});}
   for(let n=2;n<=4;n++){await drawer.getByRole('button',{name:'Next',exact:true}).click();await expect(drawer.locator('.page-switch')).toContainText(`Page ${n} of 4`);await checkLayout(drawer,`${width}px D23 page ${n}`);}
  }
  if(id==='D31'){for(let n=2;n<=32;n++){await drawer.getByRole('button',{name:'Next',exact:true}).click();await expect(drawer.locator('.page-switch')).toContainText(`Page ${n} of 32`);}await checkLayout(drawer,`${width}px D31 supplemental page`);await expect(drawer.locator('.printed-text')).toContainText('M18');}
  await drawer.getByRole('button',{name:'Close evidence drawer'}).click();await expect(drawer).not.toBeVisible();
 }
 console.log(`Document layout verified at ${width}px: mileage pages, corrected brokerage supplemental page, large sales, W-2 and foreign statement`);
}
await page.setViewportSize({width:1440,height:900});
await page.getByRole('combobox',{name:'Select role',exact:true}).selectOption('st-05');
await expect(page.locator('.actor strong')).toHaveText('Jo Kimura');
await page.locator('nav').getByRole('button',{name:'Firm & activity'}).click();
await page.getByRole('button',{name:'Edit',exact:true}).click();
await page.setViewportSize({width:390,height:480});
const dialog=page.getByRole('dialog',{name:'Firm standards'});await expect(dialog).toBeVisible();
const bounds=await dialog.evaluate(el=>{const header=el.querySelector('.modal-header'),form=el.querySelector('form'),textarea=el.querySelector('textarea'),footer=el.querySelector('.modal-footer');return {headerBottom:header.getBoundingClientRect().bottom,formTop:form.getBoundingClientRect().top,textareaBottom:textarea.getBoundingClientRect().bottom,footerTop:footer.getBoundingClientRect().top};});
if(bounds.formTop<bounds.headerBottom-1||bounds.footerTop<bounds.textareaBottom)throw Error('Long dialog sections overlap on a short mobile screen');
await dialog.getByRole('button',{name:'Cancel',exact:true}).scrollIntoViewIfNeeded();await dialog.getByRole('button',{name:'Cancel',exact:true}).click();
await expect(dialog).not.toBeVisible();await page.getByRole('combobox',{name:'Switch demo role'}).selectOption('st-01');
console.log('Long dialog scrolling verified on a 390px × 480px screen');
await browser.close();if(errors.length)throw Error(errors.join('\n'));console.log('No document overlap or horizontal overflow');
