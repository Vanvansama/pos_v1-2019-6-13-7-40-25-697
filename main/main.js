'use strict';

function printReceipt(inputs) {
  console.log(countBarcodeNumbers(inputs));
  // console.log(createReceipt(inputs));
}

function isBarCodeValid(barcodes) {
  const database = loadAllItems();
  let flag = true;
  const barcodeList = database.map((data) => data.barcode);
  barcodes.map((barcode) => barcode.slice(1, 10)).forEach(barcode => {
    if (barcodeList.indexOf(barcode) === -1) {
      flag = false;
    }
  });
  return flag;
}

function countBarcodeNumbers(barcodes) {
  return barcodes.reduce((object, barcode) => {
    const barcodeAndNumber = barcode.split('-');
    if (barcodeAndNumber.length > 1) {
      if (object[barcodeAndNumber[0]]) {
        object[barcodeAndNumber[0]] += parseFloat(barcodeAndNumber[1]);
      } else {
        object[barcodeAndNumber[0]] = parseFloat(barcodeAndNumber[1]);
      }
    } else {
      if (object[barcodeAndNumber[0]]) {
        object[barcodeAndNumber[0]]++;
      } else {
        object[barcodeAndNumber[0]] = 1;
      }
    }
    return object
  }, {});
}

function calculateTotalPrice(barcodes) {
  const database = loadAllItems();
  const barcodeAndNumbers = countBarcodeNumbers(barcodes)
  let price = 0;
  database.forEach(data => {
    
  });
  return price;
}


// Todo:
// function createReceipt(barcodes) {
//   return null;
// }


// Todo: 
// function calculatePromotion(barcode) {
//   const promotions = loadPromotions();
// }