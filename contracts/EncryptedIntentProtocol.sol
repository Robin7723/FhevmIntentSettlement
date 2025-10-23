// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "fhevm/lib/TFHE.sol";
import "fhevm/gateway/GatewayCaller.sol";

contract EncryptedIntentProtocol is GatewayCaller {
    struct EncryptedIntent {
        address user;
        euint64 encryptedTokenInAmount;
        euint64 encryptedMinTokenOut;
        euint8 encryptedSourceChain;
        euint8 encryptedDestChain;
        euint64 encryptedDeadline;
        uint256 createdAt;
        bool isActive;
        bool isFilled;
    }

    struct EncryptedOffer {
        address solver;
        uint256 intentId;
        euint64 encryptedRate;
        euint64 encryptedFee;
        euint64 encryptedTimestamp;
        bool isAccepted;
    }

    mapping(uint256 => EncryptedIntent) public intents;
    mapping(uint256 => EncryptedOffer[]) public offersForIntent;
    uint256 public intentCounter;

    event IntentCreated(uint256 indexed intentId, address indexed user, uint256 createdAt);
    event OfferSubmitted(uint256 indexed intentId, address indexed solver, uint256 offerIndex);
    event IntentFilled(uint256 indexed intentId, address indexed solver, uint256 offerIndex);

    function createIntent(
        einput encryptedTokenIn,
        einput encryptedMinOut,
        einput encryptedSourceChain,
        einput encryptedDestChain,
        bytes calldata inputProof
    ) external returns (uint256) {
        uint256 intentId = intentCounter++;

        euint64 tokenInAmount = TFHE.asEuint64(encryptedTokenIn, inputProof);
        euint64 minTokenOut = TFHE.asEuint64(encryptedMinOut, inputProof);
        euint8 sourceChain = TFHE.asEuint8(encryptedSourceChain, inputProof);
        euint8 destChain = TFHE.asEuint8(encryptedDestChain, inputProof);

        euint64 deadline = TFHE.asEuint64(uint64(block.timestamp + 1 hours));

        TFHE.allow(tokenInAmount, address(this));
        TFHE.allow(minTokenOut, address(this));
        TFHE.allow(sourceChain, address(this));
        TFHE.allow(destChain, address(this));
        TFHE.allow(deadline, address(this));

        TFHE.allow(tokenInAmount, msg.sender);
        TFHE.allow(minTokenOut, msg.sender);
        TFHE.allow(sourceChain, msg.sender);
        TFHE.allow(destChain, msg.sender);
        TFHE.allow(deadline, msg.sender);

        intents[intentId] = EncryptedIntent({
            user: msg.sender,
            encryptedTokenInAmount: tokenInAmount,
            encryptedMinTokenOut: minTokenOut,
            encryptedSourceChain: sourceChain,
            encryptedDestChain: destChain,
            encryptedDeadline: deadline,
            createdAt: block.timestamp,
            isActive: true,
            isFilled: false
        });

        emit IntentCreated(intentId, msg.sender, block.timestamp);

        return intentId;
    }

    function submitOffer(
        uint256 intentId,
        einput encryptedRate,
        einput encryptedFee,
        bytes calldata inputProof
    ) external {
        require(intentId < intentCounter, "Intent does not exist");
        require(intents[intentId].isActive, "Intent is not active");
        require(!intents[intentId].isFilled, "Intent is already filled");

        euint64 rate = TFHE.asEuint64(encryptedRate, inputProof);
        euint64 fee = TFHE.asEuint64(encryptedFee, inputProof);
        euint64 timestamp = TFHE.asEuint64(uint64(block.timestamp));

        TFHE.allow(rate, address(this));
        TFHE.allow(fee, address(this));
        TFHE.allow(timestamp, address(this));

        TFHE.allow(rate, msg.sender);
        TFHE.allow(fee, msg.sender);
        TFHE.allow(timestamp, msg.sender);

        uint256 offerIndex = offersForIntent[intentId].length;

        offersForIntent[intentId].push(
            EncryptedOffer({
                solver: msg.sender,
                intentId: intentId,
                encryptedRate: rate,
                encryptedFee: fee,
                encryptedTimestamp: timestamp,
                isAccepted: false
            })
        );

        emit OfferSubmitted(intentId, msg.sender, offerIndex);
    }

    function matchIntent(uint256 intentId) external {
        require(intentId < intentCounter, "Intent does not exist");
        require(intents[intentId].isActive, "Intent is not active");
        require(offersForIntent[intentId].length > 0, "No offers available");

        EncryptedIntent storage intent = intents[intentId];
        EncryptedOffer storage bestOffer = offersForIntent[intentId][0];

        // MVP: Accept first offer (full comparison requires Gateway integration)
        // In production, would use TFHE.ge() and TFHE.le() with Gateway for decryption
        
        intent.isFilled = true;
        intent.isActive = false;
        bestOffer.isAccepted = true;

        emit IntentFilled(intentId, bestOffer.solver, 0);
    }

    function isIntentActive(uint256 intentId) external view returns (bool) {
        require(intentId < intentCounter, "Intent does not exist");
        return intents[intentId].isActive;
    }

    function getOfferCount(uint256 intentId) external view returns (uint256) {
        require(intentId < intentCounter, "Intent does not exist");
        return offersForIntent[intentId].length;
    }

    function getIntentCreator(uint256 intentId) external view returns (address) {
        require(intentId < intentCounter, "Intent does not exist");
        return intents[intentId].user;
    }

    function getIntentTimestamp(uint256 intentId) external view returns (uint256) {
        require(intentId < intentCounter, "Intent does not exist");
        return intents[intentId].createdAt;
    }
}
