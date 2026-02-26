// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import {e, ebool, euint256, inco} from "@inco/lightning/src/Lib.sol";

contract PrivateVoting {
    error InsufficientFees();
    error ProposalNotFound();
    error VotingNotEnded();
    error VotingEnded();
    error AlreadyVoted();
    error AlreadyTallied();
    error InvalidOption();

    struct Proposal {
        string title;
        string description;
        string[] options;
        uint256 deadline;
        address creator;
        bool tallied;
        uint256 optionCount;
    }

    uint256 public proposalCount;
    mapping(uint256 => Proposal) internal proposals;
    // proposalId => optionIndex => encrypted tally
    mapping(uint256 => mapping(uint256 => euint256)) internal encryptedTallies;
    // proposalId => voter => has voted
    mapping(uint256 => mapping(address => bool)) public hasVoted;
    // proposalId => optionIndex => plaintext result (after reveal)
    mapping(uint256 => mapping(uint256 => uint256)) public revealedResults;

    event ProposalCreated(uint256 indexed proposalId, address indexed creator, string title, uint256 deadline);
    event VoteCast(uint256 indexed proposalId, address indexed voter);
    event TallyInitiated(uint256 indexed proposalId);

    function createProposal(
        string calldata title,
        string calldata description,
        string[] calldata options,
        uint256 deadline
    ) external {
        require(options.length >= 2, "Need at least 2 options");
        require(deadline > block.timestamp, "Deadline must be in future");

        uint256 proposalId = proposalCount;
        Proposal storage p = proposals[proposalId];
        p.title = title;
        p.description = description;
        p.deadline = deadline;
        p.creator = msg.sender;
        p.optionCount = options.length;

        for (uint256 i = 0; i < options.length; i++) {
            p.options.push(options[i]);
            // Initialize each tally to encrypted 0
            encryptedTallies[proposalId][i] = e.asEuint256(0);
            e.allowThis(encryptedTallies[proposalId][i]);
        }

        proposalCount++;
        emit ProposalCreated(proposalId, msg.sender, title, deadline);
    }

    function castVote(uint256 proposalId, bytes calldata encryptedVote) external payable {
        if (proposalId >= proposalCount) revert ProposalNotFound();
        Proposal storage p = proposals[proposalId];
        if (block.timestamp >= p.deadline) revert VotingEnded();
        if (hasVoted[proposalId][msg.sender]) revert AlreadyVoted();

        // Fee: 1 newEuint256 + optionCount eq + optionCount select + optionCount add = 1 + 3*optionCount
        uint256 requiredFee = inco.getFee() * (1 + 3 * p.optionCount);
        if (msg.value < requiredFee) revert InsufficientFees();

        // Decrypt user's encrypted vote choice into an euint256
        euint256 voteChoice = e.newEuint256(encryptedVote);
        e.allowThis(voteChoice);

        // Multiplexer: for each option, check if vote matches that index,
        // and if so add 1 to that option's tally
        for (uint256 i = 0; i < p.optionCount; i++) {
            ebool isThisOption = e.eq(voteChoice, i);
            euint256 increment = e.select(isThisOption, e.asEuint256(1), e.asEuint256(0));
            encryptedTallies[proposalId][i] = e.add(encryptedTallies[proposalId][i], increment);
            e.allowThis(encryptedTallies[proposalId][i]);
        }

        hasVoted[proposalId][msg.sender] = true;
        emit VoteCast(proposalId, msg.sender);
    }

    function initiateTally(uint256 proposalId) external {
        if (proposalId >= proposalCount) revert ProposalNotFound();
        Proposal storage p = proposals[proposalId];
        if (block.timestamp < p.deadline) revert VotingNotEnded();
        if (p.tallied) revert AlreadyTallied();

        p.tallied = true;

        // Call reveal on each encrypted tally so Inco makes them publicly decryptable
        for (uint256 i = 0; i < p.optionCount; i++) {
            e.reveal(encryptedTallies[proposalId][i]);
        }

        emit TallyInitiated(proposalId);
    }

    // --- View functions ---

    function getProposal(uint256 proposalId)
        external
        view
        returns (
            string memory title,
            string memory description,
            uint256 deadline,
            address creator,
            bool tallied,
            uint256 optionCount
        )
    {
        if (proposalId >= proposalCount) revert ProposalNotFound();
        Proposal storage p = proposals[proposalId];
        return (p.title, p.description, p.deadline, p.creator, p.tallied, p.optionCount);
    }

    function getProposalOptions(uint256 proposalId) external view returns (string[] memory) {
        if (proposalId >= proposalCount) revert ProposalNotFound();
        return proposals[proposalId].options;
    }

    function getTallyHandle(uint256 proposalId, uint256 optionIndex) external view returns (euint256) {
        if (proposalId >= proposalCount) revert ProposalNotFound();
        if (optionIndex >= proposals[proposalId].optionCount) revert InvalidOption();
        return encryptedTallies[proposalId][optionIndex];
    }

    function getRevealedResult(uint256 proposalId, uint256 optionIndex) external view returns (uint256) {
        return revealedResults[proposalId][optionIndex];
    }
}
