const {
    loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");

const {expect} = require("chai");
const hre = require("hardhat");
const MerkleCalculator = require('../scripts/MerkleCalculator');


describe("Nft", function () {


    async function deployFixture() {
        // Contracts are deployed using the first signer/account by default
        const [owner, user1, wl1, wl2, wl3] = await hre.ethers.getSigners();

        const Contract = await hre.ethers.getContractFactory("Nft");

        const contract = await Contract.deploy();
        await contract.deployed();

        const merkleCalculator = new MerkleCalculator();
        const wlAddresses = [
            {address: wl1.address, quantity: 1},
            {address: wl2.address, quantity: 2},
            {address: wl3.address, quantity: 3}
        ];
        merkleCalculator.processList(wlAddresses);

        const wls =[];
        for(let i =0 ; i < 150 ;i++){
            const wallet = await hre.ethers.Wallet.createRandom().connect(hre.ethers.provider);
            wls.push([wallet.address],parseInt(Math.random()*10) +1 )
        }
        wls.map( it => {
            console.write(`${it[0]};${it[1]};`)
        })



        return {contract, owner, user1, wl1, wl2, wl3,merkleCalculator};
    }


    describe("Deployment", async () => {
        it("Owner should be defined ", async () => {
            const {contract, owner} = await loadFixture(deployFixture);
            expect(await contract.owner() === owner.address);
        });
    });

    describe("White list", async () => {

        it("expect SetMerkleroot to update merkle root", async () => {
            const {contract, owner, user1, wl1, wl2, wl3,merkleCalculator} = await loadFixture(deployFixture);
            await contract.setMerkleRoot(merkleCalculator.root);
            expect(await contract.merkleRoot() === merkleCalculator.root);
        });

        it("expect preSaleMint should be revert for none Wl users ", async () => {
            const {contract, owner, user1, wl1, wl2, wl3,merkleCalculator} = await loadFixture(deployFixture);
            await contract.setMerkleRoot(merkleCalculator.root);
            await expect(contract.connect(user1).preSaleMint(1, [])).to.be.revertedWith('PROOF_NOT_VALID');
        });

        it("expect preSaleMint to assign 1 to wl1 user  ", async () => {
            const {contract, owner, user1, wl1, wl2, wl3,merkleCalculator} = await loadFixture(deployFixture);
            await contract.setMerkleRoot(merkleCalculator.root);
            await contract.connect(wl1).preSaleMint(1, merkleCalculator.getProof(wl1.address))
            expect(await contract.numberMinted(wl1.address) === 1);
        });

        it("expect preSaleMint to assign 2 to wl2 user  ", async () => {
            const {contract, owner, user1, wl1, wl2, wl3,merkleCalculator} = await loadFixture(deployFixture);
            await contract.setMerkleRoot(merkleCalculator.root);
            await contract.connect(wl2).preSaleMint(2, merkleCalculator.getProof(wl2.address))
            expect(await contract.numberMinted(wl2.address) === 2);
        });

        it("expect preSaleMint to assign 3 to wl3 user  ", async () => {
            const {contract, owner, user1, wl1, wl2, wl3,merkleCalculator} = await loadFixture(deployFixture);
            await contract.setMerkleRoot(merkleCalculator.root);
            await contract.connect(wl3).preSaleMint(3, merkleCalculator.getProof(wl3.address))
            expect(await contract.numberMinted(wl3.address) === 3);
        });

        it("expect preSaleMint twice   be revert  ", async () => {
            const {contract, owner, user1, wl1, wl2, wl3,merkleCalculator} = await loadFixture(deployFixture);
            await contract.setMerkleRoot(merkleCalculator.root);
            await contract.connect(wl1).preSaleMint(1, merkleCalculator.getProof(wl1.address))
            await expect(contract.connect(wl1).preSaleMint(1, merkleCalculator.getProof(wl1.address))).to.be.revertedWith('DONT_BE_FOOL');
        });
    });


});



