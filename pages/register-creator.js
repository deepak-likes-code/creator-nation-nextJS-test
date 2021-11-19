import { ethers, Signer } from 'ethers'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Web3Modal from "web3modal"
import { useRouter } from 'next/router'


import {
    nftmarketaddress, nftaddress, ownerPrivateKey
} from '../config'

import Market from '../artifacts/contracts/Market.sol/NFTMarket.json'
import NFT from '../artifacts/contracts/NFT.sol/MyToken.json'

export default function register() {



    const [creatorName, setCreatorName] = useState("");


    const registerCreator = async () => {

        if (creatorName === "") {
            alert('Fill in the creator Name ')
        } else if (creatorName !== "") {


            const web3Modal = new Web3Modal()
            const connection = await web3Modal.connect()
            const provider = new ethers.providers.Web3Provider(connection)
            const ownerWallet = new ethers.Wallet(ownerPrivateKey, provider)
            console.log(ownerWallet)
            const signer = await provider.getSigner()
            // console.log(signer)
            const signerAddress = await signer.getAddress()
            console.log(signerAddress)

            let contract = new ethers.Contract(nftaddress, NFT.abi, ownerWallet)
            const isCreatorRegistered = await contract.registeredCreator(signerAddress);

            if (isCreatorRegistered[3]) {
                console.log('Creator already registered')
            } else {
                const register = await contract.registerCreator(signerAddress, creatorName);
                console.log(register);
                console.log("New creator registered")
                router.push('/create-item')

            }
        }
    }


    return (
        <div className="flex justify-center">

            <div className="w-1/2 flex flex-col pb-12">
                <h1 className="mt-4 text-center font-bold">Creator KYC</h1>
                <input
                    placeholder="Random KYC stuff"
                    className="mt-8 border rounded p-4"
                // onChange={e => updateFormInput({ ...formInput, name: e.target.value })}
                />
                <input
                    placeholder="Creator Name"
                    className="mt-2 border rounded p-4"
                    onChange={e => setCreatorName(e.target.value)}
                />

                <button onClick={registerCreator} className="font-bold mt-4 bg-blue-500 text-white rounded p-4 shadow-lg">
                    Register Creator
        </button>
            </div>
        </div>

    )

}