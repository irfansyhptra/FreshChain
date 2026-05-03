// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FreshChain {

    struct Farmer {
        string name;
        string location;
        string product;
        uint timestamp;
    }

    Farmer[] public farmers;

    function addFarmer(
        string memory _name,
        string memory _location,
        string memory _product
    ) public {
        farmers.push(Farmer(_name, _location, _product, block.timestamp));
    }

    function getFarmer(uint index) public view returns (Farmer memory) {
        return farmers[index];
    }
}
