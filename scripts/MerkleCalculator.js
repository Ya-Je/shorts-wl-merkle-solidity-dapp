const {MerkleTree} = require("merkletreejs");
const keccak256 = require("keccak256");
const {ethers} = require("hardhat");

class MerkleCalculator {

    proofs = {};
    root = null;

    //  when  method call  the trees is calculated and the proof of each adresses is added in (proofs)
    processList(allowList) {
        const encodedList = [];
        allowList.map(it => {
            encodedList.push(this._encodeLeaf(it.address, it.quantity))
        })
        const merkleTree = new MerkleTree(encodedList, keccak256, {hashLeaves: true, sortPairs: true});
        allowList.map((it, index) => {
            this.proofs[it.address] = merkleTree.getHexProof(keccak256(encodedList[index]));
        })
        this.root = merkleTree.getHexRoot();
    }

    getProof(address) {
        return this.proofs[address] || [];
    }

    _encodeLeaf(address, quantity) {
        return ethers.utils.defaultAbiCoder.encode(
            ["address", "uint64"],
            [address, quantity]
        );
    }
}

module.exports = MerkleCalculator;