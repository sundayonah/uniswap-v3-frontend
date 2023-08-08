import React, { useState } from "react";
import "../styles/TokenSelectModal.css"
// import

const TokenSelectModal = (props) => {

    const tokens = [
        { id: 1, icon: "/assets/wrapEther.png", title: "Wrapped Ether", symbol: "WETH", address: "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6" },
        { id: 2, icon: "/assets/uniswap.png", title: "Uniswap", symbol: "UNI", address: "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984" },
    ]

    const setTokens = [
        { id: 1, icon: "/assets/wrapEther.png", symbol: "WETH" },
        { id: 2, icon: "/assets/uniswap.png", symbol: "UNI" },
    ]

    return (
        <div className="select-modal" onClick={props.onClose}>
            <div className="select-modal-content" onClick={e => e.stopPropagation()}>

                <div className="titleHead">
                    <h4 className="titleHeaderSelect">Select a token</h4>
                    <h4  onClick={props.onClose} className="titleHeaderSelect close">X</h4>
                </div>

                <div className="row">
                    <input
                        className="searchToken"
                        placeholder="Search name or paste address..."
                    />
                </div>
                <div className="selectedToken">
                  {setTokens.map(setToken => 
                    <div key={setToken.id}
                    className="setToken">
                      <img
                        className="tokensIcon"
                        src={setToken.icon}
                        width='25%' 
                        height='100%'
                        alt="" />
                        <div>
                            {setToken.symbol}
                        </div>
                    </div>
                  )}
                </div>
                <hr />
                <div className="tokenList"
                    onClick={props.onClose}>
                    {tokens.map(token =>
                        <div key={token.id}
                            className="tokenNames"
                            onClick={() => {
                                props.setTokenName(token.symbol);
                                props.setToken(token);
                            }}
                         >        
                            <img
                            className="tokensIcon"
                            src={token.icon}
                            width='15%' 
                            height='100%'
                            alt="" />
                         <div>
                            <div className="tokensTitle">
                                {token.title}
                            </div>
                            <div className="tokensSymbol">
                                {token.symbol}
                            </div>
                         </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TokenSelectModal;