// import React from 'react';

// const ConfigModal = ({onClose, slippageAmount, setSlippageAmount, deadlineMinutes, setDeadlineMinutes }) => {
//   return(
//     <div className="modaly" onClick={onClose}>
//       <div className="modal-content" onClick={e => e.stopPropagation()}>
//         <div className="modal-body">
//           <h4 className="titleHeader">Transaction Settings</h4>

//           <div className="row">
//             <label className="labelField">Slippage Tolerance</label>
//           </div>
//           <div className="row">
//             <div className="col-md-9 fieldContainer">
//               <input
//                 className="inputField"
//                 placeholder="1.0%"
//                 value={slippageAmount}
//                 onChange={e => setSlippageAmount(e.target.value)}
//               />
//             </div>
//             <div className="col-md-3 inputFieldUnitsContainer">
//               <span>%</span>
//             </div>
//           </div>
//           <div className="row">
//             <label className="labelField">Transaction Deadline</label>
//           </div>
//           <div className="row">
//             <div className="col-md-9 fieldContainer">
//               <input
//                 className="inputField"
//                 placeholder="10"
//                 value={deadlineMinutes}
//                 onChange={e => setDeadlineMinutes(e.target.value)}
//               />
//             </div>
//             <div className="col-md-3 inputFieldUnitsContainer">
//               <span>minutes</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }


// export default ConfigModal



import React from "react";
import "../styles/ConfigModal.css"

const ConfigModal = (props) => {
    
    return (
        <div className="modaly" onClick={props.onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-body">
                    <h4 className="titleHeader">Settings</h4>

                    <div className="row">
                        <label className="labelField">Slippage tolerance</label>
                    </div>
                    <div className="row">
                        <div className="fieldContainer">
                            <button 
                              className="autoButton"
                              onClick={e => props.setSlippageAmount(2.0)}
                                >
                                 Auto
                            </button>
                            <input 
                                className="inputField"
                                placeholder="2.0"
                                value={props.slippageAmount}
                                onChange={e => props.setSlippageAmount(e.target.value)}
                            />
                                <span>%</span>
                            {/* <div className="inputFieldUnitsContainer">
                            </div> */}
                        </div>
                    </div>
                    <div className="row">
                        <label className="labelField">Transaction deadline</label>
                        <div className="col-md-9 fieldContainer">
                            <input 
                                className="inputField"
                                placeholder="10"
                                value={props.deadlineMinutes}
                                onChange={e => props.setDeadlineMinutes(e.target.value)}
                            />
                                <span className="unitMinute">minutes</span>
                            {/* <div className="inputFieldUnitsContainer">
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>    
    )
}

export default ConfigModal;