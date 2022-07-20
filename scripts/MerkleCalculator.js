const {MerkleTree} = require("merkletreejs");
const keccak256 = require("keccak256");
const {ethers} = require("hardhat");

class MerkleCalculator {

    proofs = {};
    root = null;

    //  when  method call  the trees is calculated and the proof of each adresses is added in (proofs)
    processList(allowList) {
        const encodedList = [];
        // first we add all the leaf in the list.
        allowList.map(it => {
            encodedList.push(this._encodeLeaf(it.address, it.quantity))
        })
        // we compute the tree
        const merkleTree = new MerkleTree(encodedList, keccak256, {hashLeaves: true, sortPairs: true});

        // we collect all the proofs
        allowList.map((it, index) => {
            this.proofs[it.address] = merkleTree.getHexProof(keccak256(encodedList[index]));
        })
        // we get the merkle root.
        this.root = merkleTree.getHexRoot();
    }

    getProof(address) {
        return this.proofs[address] || [];
    }

    _encodeLeaf(address, quantity) {
        // we use the abiEncoder to have a  string representation of our attributes
        return ethers.utils.defaultAbiCoder.encode(
            ["address", "uint64"],
            [address, quantity]
        );
    }
}

module.exports = MerkleCalculator;