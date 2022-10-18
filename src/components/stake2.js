import React, { Component, useState, useEffect } from "react"

import Web3 from "web3"
import DaiToken from "abis/DaiToken.json"
import DappToken from "abis/DappToken.json"
import TokenFarm from "abis/TokenFarm.json"

import Main from "components/Main"

const Stake = () => {
  const [account, setAccount] = useState("0x0")
  const [daiToken, setDaiToken] = useState({})
  const [dappToken, setDappToken] = useState({})
  const [tokenFarm, setTokenFarm] = useState({})
  const [daiTokenBalance, setDaiTokenBalance] = useState("0")
  const [dappTokenBalance, setDappTokenBalance] = useState("0")
  const [stakingBalance, setStakingBalance] = useState("0")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadWeb3()
    loadBlockchainData()
  }, [])

  const loadBlockchainData = async () => {
    const web3 = window.web3

    const accounts = await web3.eth.getAccounts()
    setAccount({ account: accounts[0] })

    const networkId = await web3.eth.net.getId()

    // Load DaiToken
    const daiTokenData = DaiToken.networks[networkId]
    if (daiTokenData) {
      const daiToken = new web3.eth.Contract(DaiToken.abi, daiTokenData.address)
      setDaiToken({ daiToken })
      let daiTokenBalance = await daiToken.methods.balanceOf(account).call()
      setDaiTokenBalance({ daiTokenBalance: daiTokenBalance.toString() })
    } else {
      window.alert("DaiToken contract not deployed to detected network.")
    }

    // Load DappToken
    const dappTokenData = DappToken.networks[networkId]
    if (dappTokenData) {
      const dappToken = new web3.eth.Contract(
        DappToken.abi,
        dappTokenData.address
      )
      setDappToken({ dappToken })
      let dappTokenBalance = await dappToken.methods.balanceOf(account).call()
      setDappTokenBalance({ dappTokenBalance: dappTokenBalance.toString() })
    } else {
      window.alert("DappToken contract not deployed to detected network.")
    }

    // Load TokenFarm
    const tokenFarmData = TokenFarm.networks[networkId]
    if (tokenFarmData) {
      const tokenFarm = new web3.eth.Contract(
        TokenFarm.abi,
        tokenFarmData.address
      )
      setTokenFarm({ tokenFarm })
      let stakingBalance = await tokenFarm.methods
        .stakingBalance(account)
        .call()
      setStakingBalance({ stakingBalance: stakingBalance.toString() })
    } else {
      window.alert("TokenFarm contract not deployed to detected network.")
    }

    setLoading({ loading: false })
  }

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      )
    }
  }

  const stakeTokens = (amount) => {
    setLoading({ loading: true })
    daiToken.methods
      .approve(tokenFarm._address, amount)
      .send({ from: account })
      .on("transactionHash", (hash) => {
        tokenFarm.methods
          .stakeTokens(amount)
          .send({ from: account })
          .on("transactionHash", (hash) => {
            setLoading({ loading: false })
          })
      })
  }

  const unstakeTokens = (amount) => {
    setLoading({ loading: true })
    tokenFarm.methods
      .unstakeTokens()
      .send({ from: account })
      .on("transactionHash", (hash) => {
        setLoading({ loading: false })
      })
  }
  const issueTokens = (amount) => {
    setLoading({ loading: true })
    tokenFarm.methods
      .issueTokens()
      .send({ from: this.state.account })
      .on("transactionHash", (hash) => {
        setLoading({ loading: false })
      })
  }

  let content

  return (
    <div>
      {/* <Navbar account={this.state.account} /> */}
      {loading
        ? (content = (
            <p id='loader' className='text-center'>
              Loading...
            </p>
          ))
        : (content = (
            <Main
              daiTokenBalance={daiTokenBalance}
              dappTokenBalance={dappTokenBalance}
              stakingBalance={stakingBalance}
              stakeTokens={stakeTokens}
              unstakeTokens={unstakeTokens}
              issueTokens={issueTokens}
            />
          ))}
      <div className='container-fluid mt-5'>
        <div className='row'>
          <main
            role='main'
            className='col-lg-12 ml-auto mr-auto'
            style={{ maxWidth: "600px" }}
          >
            <div className='content mr-auto ml-auto'>{content}</div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default Stake
