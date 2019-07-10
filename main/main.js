'use strict';

function printReceipt(inputs) {
  console.log(calculateTotalPrice(inputs));
  // console.log(createReceipt(inputs));
}

function isBarCodeValid(barcodes) {
  const database = loadAllItems();
  let flag = true;
  const barcodeList = database.map((data) => data.barcode);
  barcodes.map((barcode) => barcode.slice(1,10)).forEach(barcode => {
    if (barcodeList.indexOf(barcode) === -1) {
      flag = false;
    }
  });
  return flag;
}

function calculateTotalPrice(barcodes) {
  const database = loadAllItems();
  const barcodeAndNumbers = barcodes.map((barcode)=>barcode.split('-')); 
  let price = 0;
  database.forEach(data => {
    barcodeAndNumbers.forEach(barcodeAndNumber => {
      if (data.barcode === barcodeAndNumber[0]) {
        barcodeAndNumber.length <= 1 ? price += data.price : price += data.price*barcodeAndNumber[1];
    }
    });
  });
  return price;
}