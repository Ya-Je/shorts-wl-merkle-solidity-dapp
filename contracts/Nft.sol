pragma solidity ^0.8.0;


import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

contract Nft {

    mapping(address => uint256)  public numberMinted;
    address  public owner;
    bytes32 public merkleRoot;

    constructor(){
        owner = msg.sender;
    }




    function preSaleMint(uint256 quantity, bytes32[] memory proof) external {

        bytes32 leaf = keccak256(abi.encode(msg.sender, quantity));
        require(MerkleProof.verify(proof, merkleRoot, leaf), "PROOF_NOT_VALID");
        require(numberMinted[msg.sender] == 0, "DONT_BE_FOOL");

        numberMinted[msg.sender] = quantity;
    }


    function setMerkleRoot(bytes32 _merkleRoot) external {
        require(msg.sender == owner, 'ONLY_OWNER');
        merkleRoot = _merkleRoot;
    }
}
