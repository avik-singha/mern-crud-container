import React, { useState } from "react";
import axios from "axios";


const Form = () => {
    const localPath = "http://localhost:4000/";
    const [vmDetails, setVMdetails] = useState([]);
    const [vmId, setVMId] = useState("");
    const [vmName, setVMName] = useState("");
    const [vmType, setVMType] = useState("");
    const [vmCountry, setVMCountry] = useState("");
    const [shouldUpdate, setShouldUpdate] = useState(false);
    const [btnName, setBtnName] = useState("SAVE");



    const insertVMdetails = () => {
        if(btnName==="UPDATE"){
            updateVMdetails();
        }
        else{
            axios
                .post(localPath + "vm/createvm", {
                    "vmName": vmName,
                    "vmType": vmType,
                    "vmLocation": vmCountry
                }, {
                })
                .then(response => {
                    if (!response["data"].isError) {
                        alert("Saved successfully");
                        setShouldUpdate(true);
                    }
                });
        }
    }

    const updateVMdetails = () => {
        axios
            .post(localPath + "vm/updatevm", {
                "vmId": vmId,
                "vmName": vmName,
                "vmType": vmType,
                "vmLocation": vmCountry
            }, {
            })
            .then(response => {
                if (!response["data"].isError) {
                    alert("Updated successfully");
                    setShouldUpdate(true);
                }
            });
    }

    const updateVM = (...vmDetails) =>{
        setBtnName('UPDATE')
        setVMId(vmDetails[0]);
        setVMName(vmDetails[1]);
        setVMType(vmDetails[2]);
        setVMCountry(vmDetails[3]);
    }

    const getVMdetails = () => {
        axios.get(localPath + 'vm/getvm')
            .then(response => {
                if (!response["data"].isError) {
                    setVMdetails(response["data"]["details"]);
                }
            });
    }



    const deleteVMdetails = (VmId) => {
        axios
            .post(localPath + "vm/deletevm", {
                vmId: VmId
            }, {
            })
            .then(response => {
                if (!response["data"].isError) {
                    alert("Deleted successfully");
                    setShouldUpdate(true);
                }
            });
    }




    React.useEffect(() => {
        getVMdetails();
    }, [shouldUpdate]);


    const handleChange = (e) => {
        const target = e.target;
        const value = target.value;
        const name = target.name
        if(name==="vm-id"){
            setVMId(value);
        }
        name === "vm-name" ? setVMName(value) : name === "vm-type" ? setVMType(value) : setVMCountry(value);
    }





    return (
        <main id="mainContent">
            <div className="container">
                <div className="row justify-content-center mt-4">
                    <h4>Fill up VM details</h4>
                </div>
                <div className="row justify-content-center form-inline">
                    <form>
                        <input type="hidden" name="vm-id" value={vmId} onChange={handleChange}/>
                        <input type="text" className="form-control mr-1" name="vm-name"  placeholder="Enter VM name" value={vmName} onChange={handleChange} />
                        <input type="text" className="form-control mr-1" name="vm-type"  placeholder="Enter VM type" value={vmType} onChange={handleChange} />
                        <input type="text" className="form-control mr-1" name="vm-country" placeholder="Enter VM location"  value={vmCountry} onChange={handleChange} />
                        <button type="button" className=" btn btn-primary" onClick={insertVMdetails}>{btnName}</button>
                    </form>
                </div>
                <br /><br />
                <div className="row justify-content-center">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>VM Id</th>
                                <th>VM Name</th>
                                <th>VM Type</th>
                                <th>VM Location</th>
                                <th>Operation</th>
                            </tr>
                        </thead>
                        <tbody>
                            {vmDetails.length > 0 && vmDetails.map(eachVm => (
                                <tr key={eachVm.VmId}>
                                    <td>{eachVm.VmId}</td>
                                    <td>{eachVm.VmName}</td>
                                    <td>{eachVm.VmType}</td>
                                    <td>{eachVm.VmLocation}</td>
                                    <td>
                                        <button className="btn btn-warning"
                                        onClick={()=>updateVM(eachVm.VmId,eachVm.VmName,eachVm.VmType,eachVm.VmLocation)}>
                                            Edit
                                        </button>{" "}
                                         <button className="btn btn-danger" onClick={()=>deleteVMdetails(eachVm.VmId)}>
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </main>

    );
}

export default Form;