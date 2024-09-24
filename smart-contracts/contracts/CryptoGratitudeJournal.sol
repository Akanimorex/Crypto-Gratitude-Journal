// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";



contract CryptoGratitudeJournal is ERC721URIStorage {
    
    // Counter for unique gratitude entries and NFTs
    uint private _entryIdCounter;
    uint private _tokenIdCounter;
    
    // Structure to store each gratitude entry
    struct GratitudeEntry {
        uint256 entryId;
        string note;
        uint256 date; // Timestamp of the entry
    }
    
    // Mapping to store gratitude entries by user address
    mapping(address => GratitudeEntry[]) private userEntries;
    
    // Mapping to track the last entry date to manage streaks
    mapping(address => uint256) private lastEntryDate;
    
    // Mapping to store streak count per user
    mapping(address => uint256) private userStreaks;

    constructor() ERC721("GratitudeJournalNFT", "JNFT") {}

    // Write a gratitude note (daily entry)
    function writeGratitude(string memory note) external {
        uint256 currentDate = block.timestamp;
        
        // Increment the entry counter
        _entryIdCounter++;
        uint256 newEntryId = _entryIdCounter;
        
        // Store the new gratitude entry
        GratitudeEntry memory newEntry ;

        newEntry.entryId = newEntryId;
        newEntry.note = note;
        newEntry.date = currentDate;    
        userEntries[msg.sender].push(newEntry);


        
        // Update streak based on last entry date (check if it's the next day)
        if (isNewDay(lastEntryDate[msg.sender], currentDate)) {
            userStreaks[msg.sender]++;
        }
        
        // Update the last entry date
        lastEntryDate[msg.sender] = currentDate;
    }

    // View a specific gratitude note by entry ID
    function getGratitude(uint256 entryId) external view returns (GratitudeEntry memory) {
        GratitudeEntry[] memory entries = userEntries[msg.sender];
        for (uint256 i = 0; i < entries.length; i++) {
            if (entries[i].entryId == entryId) {
                return entries[i];
            }
        }
        revert("Entry not found");
    }

    // Get the current streak for a user
    function getStreak(address user) external view returns (uint256) {
        return userStreaks[user];
    }

    // Mint an NFT of a specific gratitude entry
    function mintGratitudeNFT(uint256 entryId, string memory tokenURI) external {
        GratitudeEntry[] memory entries = userEntries[msg.sender];
        for (uint256 i = 0; i < entries.length; i++) {
            if (entries[i].entryId == entryId) {
                _tokenIdCounter += 1;
                uint256 newTokenId = _tokenIdCounter;
                _safeMint(msg.sender, newTokenId);
                _setTokenURI(newTokenId, tokenURI);
                return;
            }
        }
        revert("Entry not found");
    }

    // Helper function to check if it's a new day (24-hour period)
    function isNewDay(uint256 lastDate, uint256 currentDate) internal pure returns (bool) {
        return (currentDate - lastDate) >= 1 days;
    }
}

