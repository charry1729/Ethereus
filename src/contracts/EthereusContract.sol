// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract EthereusContract is AccessControl, ReentrancyGuard {
    bytes32 public constant CONTRACT_ADMIN = keccak256("CONTRACT_ADMIN");
    bytes32 public constant PARTY_ROLE = keccak256("PARTY_ROLE");

    enum ContractStatus { Draft, Active, Completed, Terminated }
    enum SignatureStatus { Pending, Signed, Rejected }

    struct Party {
        address wallet;
        string role;
        SignatureStatus signatureStatus;
        uint256 signedAt;
    }

    struct ContractData {
        string contractType;
        string jurisdiction;
        string ipfsHash;
        uint256 createdAt;
        uint256 updatedAt;
        ContractStatus status;
        address[] partyAddresses;
        mapping(address => Party) parties;
        mapping(bytes32 => string) terms;
        bytes32[] termKeys;
    }

    mapping(bytes32 => ContractData) private _contracts;
    bytes32[] private _contractIds;

    event ContractCreated(bytes32 indexed contractId, string contractType, string jurisdiction);
    event ContractSigned(bytes32 indexed contractId, address indexed signer, uint256 timestamp);
    event ContractStatusChanged(bytes32 indexed contractId, ContractStatus newStatus);
    event TermAdded(bytes32 indexed contractId, bytes32 termKey, string termContent);

    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(CONTRACT_ADMIN, msg.sender);
    }

    function createContract(
        string memory contractType,
        string memory jurisdiction,
        string memory ipfsHash,
        address[] memory partyAddresses,
        string[] memory partyRoles
    ) public onlyRole(CONTRACT_ADMIN) returns (bytes32) {
        require(partyAddresses.length == partyRoles.length, "Parties and roles mismatch");
        require(partyAddresses.length >= 2, "Minimum two parties required");

        bytes32 contractId = keccak256(abi.encodePacked(block.timestamp, msg.sender, ipfsHash));
        ContractData storage newContract = _contracts[contractId];
        
        newContract.contractType = contractType;
        newContract.jurisdiction = jurisdiction;
        newContract.ipfsHash = ipfsHash;
        newContract.createdAt = block.timestamp;
        newContract.updatedAt = block.timestamp;
        newContract.status = ContractStatus.Draft;
        newContract.partyAddresses = partyAddresses;

        for (uint i = 0; i < partyAddresses.length; i++) {
            newContract.parties[partyAddresses[i]] = Party({
                wallet: partyAddresses[i],
                role: partyRoles[i],
                signatureStatus: SignatureStatus.Pending,
                signedAt: 0
            });
            _grantRole(PARTY_ROLE, partyAddresses[i]);
        }

        _contractIds.push(contractId);
        emit ContractCreated(contractId, contractType, jurisdiction);
        return contractId;
    }

    function signContract(bytes32 contractId) public onlyRole(PARTY_ROLE) {
        ContractData storage contractData = _contracts[contractId];
        require(contractData.createdAt != 0, "Contract does not exist");
        require(contractData.status == ContractStatus.Draft, "Contract not in draft status");
        
        Party storage party = contractData.parties[msg.sender];
        require(party.wallet == msg.sender, "Not a party to this contract");
        require(party.signatureStatus == SignatureStatus.Pending, "Already processed");

        party.signatureStatus = SignatureStatus.Signed;
        party.signedAt = block.timestamp;

        bool allSigned = true;
        for (uint i = 0; i < contractData.partyAddresses.length; i++) {
            if (contractData.parties[contractData.partyAddresses[i]].signatureStatus != SignatureStatus.Signed) {
                allSigned = false;
                break;
            }
        }

        if (allSigned) {
            contractData.status = ContractStatus.Active;
            emit ContractStatusChanged(contractId, ContractStatus.Active);
        }

        emit ContractSigned(contractId, msg.sender, block.timestamp);
    }

    function addTerm(
        bytes32 contractId,
        string memory termKey,
        string memory termContent
    ) public onlyRole(CONTRACT_ADMIN) {
        ContractData storage contractData = _contracts[contractId];
        require(contractData.createdAt != 0, "Contract does not exist");
        require(contractData.status == ContractStatus.Draft, "Contract not in draft status");

        bytes32 termHash = keccak256(abi.encodePacked(termKey));
        contractData.terms[termHash] = termContent;
        contractData.termKeys.push(termHash);
        contractData.updatedAt = block.timestamp;

        emit TermAdded(contractId, termHash, termContent);
    }

    function getContractDetails(bytes32 contractId) public view returns (
        string memory contractType,
        string memory jurisdiction,
        string memory ipfsHash,
        uint256 createdAt,
        uint256 updatedAt,
        ContractStatus status,
        address[] memory partyAddresses
    ) {
        ContractData storage contractData = _contracts[contractId];
        require(contractData.createdAt != 0, "Contract does not exist");

        return (
            contractData.contractType,
            contractData.jurisdiction,
            contractData.ipfsHash,
            contractData.createdAt,
            contractData.updatedAt,
            contractData.status,
            contractData.partyAddresses
        );
    }

    function getPartyDetails(bytes32 contractId, address partyAddress) public view returns (
        string memory role,
        SignatureStatus signatureStatus,
        uint256 signedAt
    ) {
        ContractData storage contractData = _contracts[contractId];
        require(contractData.createdAt != 0, "Contract does not exist");
        
        Party storage party = contractData.parties[partyAddress];
        require(party.wallet == partyAddress, "Party not found");

        return (
            party.role,
            party.signatureStatus,
            party.signedAt
        );
    }

    function getTerms(bytes32 contractId) public view returns (
        bytes32[] memory termKeys,
        string[] memory termContents
    ) {
        ContractData storage contractData = _contracts[contractId];
        require(contractData.createdAt != 0, "Contract does not exist");

        termKeys = contractData.termKeys;
        termContents = new string[](termKeys.length);
        
        for (uint i = 0; i < termKeys.length; i++) {
            termContents[i] = contractData.terms[termKeys[i]];
        }
    }
}