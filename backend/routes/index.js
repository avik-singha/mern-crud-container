const express = require("express");
const router = express.Router();
const vmController = require('../controller/vmdetails')

router.get('/getvm',vmController.readAllVMdetails);
router.post('/createvm',vmController.createVMdetails);
router.post('/updatevm',vmController.updateVMdetails);
router.post('/deletevm',vmController.deleteVMdetails);

module.exports = router;