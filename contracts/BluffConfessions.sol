// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract BluffConfessions is ReentrancyGuard, Ownable {
    // ──────────────────────────────────────────────
    // Types
    // ──────────────────────────────────────────────

    struct Confession {
        address confessor;
        string text;
        uint8 category;
        uint8 stateCode;
        string city;
        uint256 unlockCount;
        uint256 totalUnlockPaid;
        uint256 blockPosted;
    }

    /// @notice Public metadata without confession body (pay to read full text).
    struct ConfessionPreview {
        address confessor;
        uint8 category;
        uint8 stateCode;
        string city;
        uint256 unlockCount;
        uint256 totalUnlockPaid;
        uint256 blockPosted;
    }

    struct StateStats {
        uint256 confessionCount;
        uint256 totalUnlockPaid;
        uint256 unlockTxCount;
    }

    struct CategoryStats {
        uint256 confessionCount;
        uint256 totalUnlockPaid;
    }

    // ──────────────────────────────────────────────
    // State
    // ──────────────────────────────────────────────

    uint256 public confessionCounter;
    uint256 public confessionFee;
    uint256 public unlockFee;

    uint256 public constant CONFESSOR_SHARE = 70;
    uint256 public constant DEV_SHARE = 30;
    uint256 public constant SHARE_DENOMINATOR = 100;
    uint8 public constant MAX_CATEGORIES = 7;
    uint8 public constant MAX_STATE_CODE = 36;

    mapping(uint256 => Confession) public confessions;

    mapping(uint256 => mapping(address => bool)) public hasUnlocked;

    mapping(uint8 => StateStats) public stateStats;
    mapping(uint8 => CategoryStats) public categoryStats;

    uint256 public totalUnlockVolume;
    uint256 public totalFeesCollected;

    // ──────────────────────────────────────────────
    // Events
    // ──────────────────────────────────────────────

    event ConfessionPosted(
        uint256 indexed confessionId,
        address indexed confessor,
        uint8 category,
        uint8 stateCode,
        string city,
        uint256 blockNumber
    );

    event ConfessionUnlocked(
        uint256 indexed confessionId,
        address indexed reader,
        uint256 amount,
        uint256 confessorShare,
        uint256 devShare
    );

    event ConfessionFeeUpdated(uint256 oldFee, uint256 newFee);
    event UnlockFeeUpdated(uint256 oldFee, uint256 newFee);

    // ──────────────────────────────────────────────
    // Errors
    // ──────────────────────────────────────────────

    error InvalidCategory();
    error InvalidStateCode();
    error EmptyText();
    error InsufficientFee();
    error InsufficientUnlockFee();
    error ConfessionNotFound();
    error NotUnlocked();
    error AlreadyUnlocked();
    error CannotUnlockOwn();
    error TransferFailed();

    // ──────────────────────────────────────────────
    // Constructor
    // ──────────────────────────────────────────────

    constructor(uint256 _confessionFee, uint256 _unlockFee) Ownable(msg.sender) {
        confessionFee = _confessionFee;
        unlockFee = _unlockFee;
    }

    // ──────────────────────────────────────────────
    // Core Functions
    // ──────────────────────────────────────────────

    function confess(
        string calldata _text,
        uint8 _category,
        uint8 _stateCode,
        string calldata _city
    ) external payable {
        if (bytes(_text).length == 0) revert EmptyText();
        if (_category < 1 || _category > MAX_CATEGORIES) revert InvalidCategory();
        if (_stateCode < 1 || _stateCode > MAX_STATE_CODE) revert InvalidStateCode();
        if (msg.value < confessionFee) revert InsufficientFee();

        confessionCounter++;
        uint256 newId = confessionCounter;

        confessions[newId] = Confession({
            confessor: msg.sender,
            text: _text,
            category: _category,
            stateCode: _stateCode,
            city: _city,
            unlockCount: 0,
            totalUnlockPaid: 0,
            blockPosted: block.number
        });

        stateStats[_stateCode].confessionCount++;
        categoryStats[_category].confessionCount++;
        totalFeesCollected += msg.value;

        emit ConfessionPosted(newId, msg.sender, _category, _stateCode, _city, block.number);
    }

    /// @notice Pay to unlock reading the full confession text. Confessor always reads free via `getConfessionFull`.
    function unlockConfession(uint256 _confessionId) external payable nonReentrant {
        if (_confessionId == 0 || _confessionId > confessionCounter) revert ConfessionNotFound();

        Confession storage c = confessions[_confessionId];
        if (msg.sender == c.confessor) revert CannotUnlockOwn();
        if (hasUnlocked[_confessionId][msg.sender]) revert AlreadyUnlocked();
        if (msg.value < unlockFee) revert InsufficientUnlockFee();

        hasUnlocked[_confessionId][msg.sender] = true;

        c.unlockCount++;
        c.totalUnlockPaid += msg.value;

        stateStats[c.stateCode].totalUnlockPaid += msg.value;
        stateStats[c.stateCode].unlockTxCount++;

        categoryStats[c.category].totalUnlockPaid += msg.value;

        totalUnlockVolume += msg.value;

        uint256 confessorAmount = (msg.value * CONFESSOR_SHARE) / SHARE_DENOMINATOR;
        uint256 devAmount = msg.value - confessorAmount;

        (bool sentToConfessor, ) = payable(c.confessor).call{value: confessorAmount}("");
        if (!sentToConfessor) revert TransferFailed();

        (bool sentToDev, ) = payable(owner()).call{value: devAmount}("");
        if (!sentToDev) revert TransferFailed();

        emit ConfessionUnlocked(_confessionId, msg.sender, msg.value, confessorAmount, devAmount);
    }

    // ──────────────────────────────────────────────
    // View Functions
    // ──────────────────────────────────────────────

    function _preview(Confession storage c) private view returns (ConfessionPreview memory) {
        return ConfessionPreview({
            confessor: c.confessor,
            category: c.category,
            stateCode: c.stateCode,
            city: c.city,
            unlockCount: c.unlockCount,
            totalUnlockPaid: c.totalUnlockPaid,
            blockPosted: c.blockPosted
        });
    }

    function getConfessionPreview(uint256 _id) external view returns (ConfessionPreview memory) {
        if (_id == 0 || _id > confessionCounter) revert ConfessionNotFound();
        return _preview(confessions[_id]);
    }

    /// @notice Full confession including text. Reverts if reader has not unlocked (and is not the confessor).
    function getConfessionFull(uint256 _id) external view returns (Confession memory) {
        if (_id == 0 || _id > confessionCounter) revert ConfessionNotFound();
        Confession storage c = confessions[_id];
        if (msg.sender != c.confessor && !hasUnlocked[_id][msg.sender]) revert NotUnlocked();
        return c;
    }

    function checkUnlocked(uint256 _confessionId, address _user) external view returns (bool) {
        if (_confessionId == 0 || _confessionId > confessionCounter) return false;
        Confession storage c = confessions[_confessionId];
        if (c.confessor == _user) return true;
        return hasUnlocked[_confessionId][_user];
    }

    function getConfessionsBatch(uint256 _fromId, uint256 _toId)
        external
        view
        returns (ConfessionPreview[] memory)
    {
        if (_fromId == 0) _fromId = 1;
        if (_toId > confessionCounter) _toId = confessionCounter;
        if (_fromId > _toId) return new ConfessionPreview[](0);

        uint256 count = _toId - _fromId + 1;
        ConfessionPreview[] memory result = new ConfessionPreview[](count);
        for (uint256 i = 0; i < count; i++) {
            result[i] = _preview(confessions[_fromId + i]);
        }
        return result;
    }

    function getLatestConfessionPreviews(uint256 _count)
        external
        view
        returns (ConfessionPreview[] memory, uint256[] memory)
    {
        if (_count > confessionCounter) _count = confessionCounter;
        ConfessionPreview[] memory result = new ConfessionPreview[](_count);
        uint256[] memory ids = new uint256[](_count);

        for (uint256 i = 0; i < _count; i++) {
            uint256 id = confessionCounter - i;
            result[i] = _preview(confessions[id]);
            ids[i] = id;
        }
        return (result, ids);
    }

    function getStateStats(uint8 _stateCode) external view returns (StateStats memory) {
        return stateStats[_stateCode];
    }

    function getAllStateStats() external view returns (StateStats[] memory) {
        StateStats[] memory result = new StateStats[](MAX_STATE_CODE);
        for (uint8 i = 1; i <= MAX_STATE_CODE; i++) {
            result[i - 1] = stateStats[i];
        }
        return result;
    }

    function getCategoryStats(uint8 _category) external view returns (CategoryStats memory) {
        return categoryStats[_category];
    }

    function getAllCategoryStats() external view returns (CategoryStats[] memory) {
        CategoryStats[] memory result = new CategoryStats[](MAX_CATEGORIES);
        for (uint8 i = 1; i <= MAX_CATEGORIES; i++) {
            result[i - 1] = categoryStats[i];
        }
        return result;
    }

    function getProtocolStats()
        external
        view
        returns (uint256 totalConfessions, uint256 totalUnlocksPaid, uint256 totalConfessionFees)
    {
        return (confessionCounter, totalUnlockVolume, totalFeesCollected);
    }

    // ──────────────────────────────────────────────
    // Admin Functions
    // ──────────────────────────────────────────────

    function setConfessionFee(uint256 _newFee) external onlyOwner {
        uint256 oldFee = confessionFee;
        confessionFee = _newFee;
        emit ConfessionFeeUpdated(oldFee, _newFee);
    }

    function setUnlockFee(uint256 _newFee) external onlyOwner {
        uint256 oldFee = unlockFee;
        unlockFee = _newFee;
        emit UnlockFeeUpdated(oldFee, _newFee);
    }

    function withdrawFees() external onlyOwner {
        uint256 balance = address(this).balance;
        if (balance == 0) revert TransferFailed();
        (bool sent, ) = payable(owner()).call{value: balance}("");
        if (!sent) revert TransferFailed();
    }
}
