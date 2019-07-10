'use strict';

function printReceipt(inputs) {
  console.log(isBarCodeValid(inputs));
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