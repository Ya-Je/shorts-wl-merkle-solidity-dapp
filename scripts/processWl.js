// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const fs = require("fs");
const readline = require("readline");
const MerkleCalculator = require("./MerkleCalculator");

const END_LINE = '\r\n';
const SEPARATOR = ";";

async function gereateWlList() {
    const wls = [];
    for (let i = 0; i < 150; i++) {
        const wallet = await hre.ethers.Wallet.createRandom().connect(hre.ethers.provider);
        wls.push(`${[wallet.address]}${separator}${parseInt(Math.random() * 10) + 1};`)
    }
    fs.writeFileSync(__dirname + '/wl.csv', wls.join(END_LINE));
}

async function main() {

    const csvInFile = __dirname + '/wl.csv';
    const jsonOutFile = __dirname + '/wl.json';

    // parse the CSV file and create a memory list from it
    const fileStream = fs.createReadStream(csvInFile);
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });
    const items = [];
    for await (const line of rl) {
        const cells =  line.split(SEPARATOR);
        items.push({address: cells[0],quantity: cells[1] });
    }
    // we process the addess to generate the root keys and the proofs
    const calculator = new MerkleCalculator();
    calculator.processList(items);

    // we generate the dapp file
    items.map( it => {
        it.proof =  calculator.getProof(it.address);
    });
    fs.writeFileSync(jsonOutFile, JSON.stringify(items));

    // outputs
    console.log(`Dapp file generated  :${jsonOutFile} `);
    console.log(`Root key for the smart contract :${calculator.root} `);


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
