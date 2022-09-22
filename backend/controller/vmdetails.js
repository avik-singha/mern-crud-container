const { db } = require('../model/vmdetails');
const vm = require('../model/vmdetails');


module.exports={

    createVMdetails : function(req,res,next){
        if (!req.body.vmName || !req.body.vmType || !req.body.vmLocation) {
            return res.status(400).json({
              message: "Please fillup all details",
            });
          } else {
            var newVM = new vm({
                VmId : Math.round(Math.random()*1000000000+Math.random()*10000000),  
                VmName : req.body.vmName ,  
                VmType : req.body.vmType,  
                VmLocation : req.body.vmLocation, 
            });
            newVM.save(function (err, data) {
              if (err) {
                return res
                  .status(400)
                  .json({ message: "Error occured" , err });
              }
      
              res.status(200).json({
                message: "VM details created successfully",
                vm: data,
              });
            });
          }
    },

    readAllVMdetails : function(req,res,next){

        vm.find({},{_id:0},function(err,docs){
            if(err){
               return res.status(400).json({
                    isError: true,
                    message: "Failed",
                    statuscode: 500,
                    details: null
                  });
            }
            if(docs){
               return res.status(200).json({
                    isError: false,
                    message: "VM details",
                    statuscode: 200,
                    details: docs
                  });
            }
        })
    },

    updateVMdetails : function(req,res,next){
        if (!req.body.vmId || !req.body.vmName || !req.body.vmType || !req.body.vmLocation) {
            return res.status(404).json({
              message: "Please fillup all details",
            });
          }
        var querywith = {
            VmId : req.body.vmId
          };
      
          var updatewith = {
            VmName : req.body.vmName ,  
            VmType : req.body.vmType,  
            VmLocation : req.body.vmLocation, 
          };
      
          vm.updateOne(querywith, updatewith, function(err, res1) {
            if (err) {
              return res.status(400).json({
                isError: true,
                message: "Some error occured",
                statuscode: 501,
                details: null
              });
            } else {              
              if (res1.modifiedCount == 1) {
                return res.status(200).json({
                  isError: false,
                  message: "VM Details Updated Successfully",
                  statuscode: 200,
                  details: null
                });
              } else {
                return res.status(400).json({
                  isError: true,
                  message: "Some error occured",
                  statuscode: 502,
                  details: null
                });
              }
            }
          });  
    },

    deleteVMdetails : function(req,res,next){
        if (!req.body.vmId ) {
            return res.status(404).json({
              message: "Please send vmId to delete",
            });
          }
        
        vm.deleteOne({"VmId" : req.body.vmId}, function(err, res1) {
            if(err)
            {
                return res.status(400).json({
                    isError: true,
                    message: "Some error occured",
                    statuscode: 502,
                    details: err
                  });
            }
            else{
                return res.status(200).json({
                    isError: false,
                    message: "Deleted successfully",
                    statuscode: 200,
                    details: res1
                  });
            }
        });
    }

    
}