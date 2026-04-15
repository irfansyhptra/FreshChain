// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title FreshChainTraceability
 * @dev Automates digital tracking linked to physical agricultural batches
 */
contract FreshChainTraceability {
    struct TrackingStatus {
        string statusName;      // e.g., "Planted", "Harvested", "Quality Check", "Shipped"
        string location;        // e.g., "Farm Site A", "Warehouse B"
        string metadataHash;    // IPFS Hash for images/certs related to the status
        uint256 timestamp;
        address updater;
    }

    struct Batch {
        string productBrand;    // e.g., "Super Corn B12"
        string farmerName;
        bool exists;
        TrackingStatus[] timeline;
    }

    mapping(string => Batch) public batches; // Mapped by physical Batch ID (UUID/QR)
    mapping(address => bool) public authorizedUpdaters;

    event BatchCreated(string indexed batchId, string productBrand, string farmerName, uint256 timestamp);
    event StatusUpdated(string indexed batchId, string statusName, string location, uint256 timestamp);

    modifier onlyAuthorized() {
        require(authorizedUpdaters[msg.sender], "Not authorized to update tracking");
        _;
    }

    constructor() {
        authorizedUpdaters[msg.sender] = true;
    }

    function addAuthorizedUpdater(address _updater) external onlyAuthorized {
        authorizedUpdaters[_updater] = true;
    }

    function createBatch(string calldata _batchId, string calldata _productBrand, string calldata _farmerName) external onlyAuthorized {
        require(!batches[_batchId].exists, "Batch already exists");
        
        Batch storage b = batches[_batchId];
        b.productBrand = _productBrand;
        b.farmerName = _farmerName;
        b.exists = true;

        emit BatchCreated(_batchId, _productBrand, _farmerName, block.timestamp);
    }

    function updateStatus(string calldata _batchId, string calldata _statusName, string calldata _location, string calldata _metadataHash) external onlyAuthorized {
        require(batches[_batchId].exists, "Batch does not exist");

        batches[_batchId].timeline.push(TrackingStatus({
            statusName: _statusName,
            location: _location,
            metadataHash: _metadataHash,
            timestamp: block.timestamp,
            updater: msg.sender
        }));

        emit StatusUpdated(_batchId, _statusName, _location, block.timestamp);
    }

    function getTimeline(string calldata _batchId) external view returns (TrackingStatus[] memory) {
        require(batches[_batchId].exists, "Batch does not exist");
        return batches[_batchId].timeline;
    }
}
