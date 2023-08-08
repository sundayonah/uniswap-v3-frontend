// const { AlphaRouter } = require('@uniswap/smart-order-router');
// const { Token, CurrencyAmount, TradeType, Percent } = require('@uniswap/sdk-core');
// const { ethers, BigNumber } = require('ethers');
// const JSBI = require('jsbi');
// const ERC20ABI = require('./abi.json');

// const V3_SWAP_ROUTER_ADDRESS = '0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45';
// const REACT_APP_INFURA_URL_TESTNET = process.env.REACT_APP_INFURA_URL_TESTNET;

// const chainId = 5;

// const web3Provider = new ethers.providers.JsonRpcProvider('https://goerli.infura.io/v3/1f9136b294e248fca6fce6f5c95a0811');
// const router = new AlphaRouter({ chainId: chainId, provider: web3Provider });

// const name0 = 'Wrapped Ether';
// const symbol0 = 'WETH';
// const decimals0 = 18;
// // const address0='0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'
// const address0 = '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6';


// const name1 = 'Uniswap Token';
// const symbol1 = 'UNI';
// const decimals1 = 18;
// const address1 = '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984';

// const WETH = new Token(chainId, address0, decimals0, symbol0, name0);
// const UNI = new Token(chainId, address1, decimals1, symbol1, name1);

// export const getWethContract = () => new ethers.Contract(address0, ERC20ABI, web3Provider);
// export const getUniContract = () => new ethers.Contract(address1, ERC20ABI, web3Provider);



// export const getPrice = async (inputAmount, slippageAmount, deadline, walletAddress) => {
//   const percentSlippage = new Percent(slippageAmount, 10);
//   const wei = ethers.utils.parseUnits(inputAmount, decimals0).toString();
//   const currencyAmount = CurrencyAmount.fromRawAmount(WETH, JSBI.BigInt(wei));

//   console.log(wei);
//   console.log(currencyAmount);
//   console.log(WETH);

  // const options = {
  //   recipient: walletAddress,
  //   slippageTolerance: percentSlippage,
  //   deadline: Math.floor(Date.now() / 1000) + 60 * 10,
  //   type: TradeType.EXACT_INPUT,
  // };

  // const route = await router.route(currencyAmount, UNI, options);

// const transaction = {
//   data: route.methodParameters?.calldata,
//   to: V3_SWAP_ROUTER_ADDRESS,
//   value: route?.methodParameters?.value,
//   from: walletAddress,
//   gasPrice: route.gasPriceWei,
//   gasLimit: ethers.utils.hexlify(1000000),
// };

//   const quoteAmountOut = route.quote.toFixed(6);
//   const ratio = (inputAmount / quoteAmountOut).toFixed(3);

//   return [
//     transaction,
//     quoteAmountOut,
//     ratio,
//   ];
// };

// export const runSwap = async (transaction, signer) => {
//   const approvalAmount = ethers.utils.parseUnits('10', 18).toString();
//   const contract0 = getUniContract();
//   await contract0.connect(signer).approve(
//     V3_SWAP_ROUTER_ADDRESS,
//     approvalAmount
//   );

//   await signer.sendTransaction(transaction);
// };


const { AlphaRouter, SwapType } = require('@uniswap/smart-order-router');
const {Token, CurrencyAmount, TradeType, Percent} = require('@uniswap/sdk-core');
const {ethers, BigNumber} = require('ethers');
const ERC20ABI = require('./abi.json');
const JSBI = require('jsbi');

const V3_SWAP_ROUTER_ADDRESS = '0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45';
const REACT_APP_INFURA_URL_TESTNET = process.env.REACT_APP_INFURA_URL_TESTNET

const chainId = 5;

export const web3Provider = new ethers.providers.JsonRpcProvider(REACT_APP_INFURA_URL_TESTNET);
const router = new AlphaRouter({chainId, provider: web3Provider})

const name0 = 'Wrapped Ether'
const symbol0 = 'WETH';
const decimals0 = 18;
const address0 = "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6";

const name1 = "Uniswap Token";
const symbol1 = 'UNI';
const decimals1 = 18;
const address1 = "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984";

const WETH = new Token(chainId, address0, decimals0, symbol0, name0);
const UNI = new Token(chainId, address1, decimals1, symbol1, name1);

export const getWethContract = () => new ethers.Contract(address0, ERC20ABI, web3Provider);
export const getUniContract = () => new ethers.Contract(address1, ERC20ABI, web3Provider);

const tradeToken = (token) => {
    if(token.address === address0) {
        return WETH;
    }
    if(token.address === address1) {
        return UNI;
    }
}

const isApproved = async(walletAddress) => {

}

export const getPrice = async (inputAmount, slippageAmount, deadline, walletAddress, tokenIn, tokenOut) => { 
  const from = tradeToken(tokenIn);
  const to = tradeToken(tokenOut);
  const approve = from.address;
  const percentSlippage = new Percent(slippageAmount, 10);
  const wei = ethers.utils.parseUnits(inputAmount.toString(), decimals0);
  const currencyAmount = CurrencyAmount.fromRawAmount(from, JSBI.BigInt(wei));

  try {
    // console.log('Before router.route:', currencyAmount, to, TradeType.EXACT_INPUT);
    const route = await router.route(
      currencyAmount,
      to,
      TradeType.EXACT_INPUT,
      {
        recipient: walletAddress,
        slippageTolerance: percentSlippage,
        deadline: deadline,
        type: SwapType.SWAP_ROUTER_02
      }
    );

    // const options = {
    //   recipient: walletAddress,
    //   slippageTolerance: percentSlippage,
    //   deadline: Math.floor(Date.now() / 1000) + 60 * 10,
    //   type: TradeType.EXACT_INPUT,
    // };
  
    // const route = await router.route(currencyAmount, to, options);

    // console.log('After router.route:', route);

    const transaction = {
      data: route?.methodParameters?.calldata,
      to: V3_SWAP_ROUTER_ADDRESS,
      value: route?.methodParameters?.value,
      from: walletAddress,
      gasPrice: route?.gasPriceWei,
      gasLimit: ethers.utils.hexlify(500000)
    };
    
    const quoteAmountOut = route?.quote?.toFixed(6);

    const ratio = (inputAmount / quoteAmountOut ).toFixed(3);

    return [
      transaction,
      quoteAmountOut,
      ratio,
    ];
  } catch (error) {
    // console.error('Error in getPrice:', error);
    throw error;
  }
};


export const runSwap = async (transaction, signer) => {
    const approvalAmount = ethers.utils.parseUnits('10', 18).toString();
    const contractWeth = getWethContract();
    const contractUni = getUniContract();
    await contractWeth.connect(signer).approve(
        V3_SWAP_ROUTER_ADDRESS,
        approvalAmount,
    )
    await contractUni.connect(signer).approve(
        V3_SWAP_ROUTER_ADDRESS,
        approvalAmount,
    )

    signer.sendTransaction(transaction);
}