pragma solidity ^ 0.4 .24;

import "./HelperFunctions.sol";
import "./ERC20.sol";
//@Dev contract definition
contract XESToken is ERC20, HelperFunctions {

    constructor() public {
        emit GeneralLogger("Constructor called");
        _totalSupply = 1000000000;
    }
}