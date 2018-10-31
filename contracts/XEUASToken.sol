pragma solidity ^ 0.4 .24;

import "./HelperFunctions.sol";
import "./ERC20.sol";
import "./ERC20Mintable.sol";
import "../ownership/Ownable.sol";
import "../math/SafeMath.sol";

contract XEUASToken is ERC20Mintable, HelperFunctions, Ownable {
    //@Dev string representing the name of the token
    string public tokenName = "XEUASToken";
    //@Dev token acronym
    string public symbol = "XEUAS";
    uint256 decimals = 18;
    uint256 public constant price = 500000000000000; //@Dev this represents .1 USD this is in wei
    uint256 totalWeiRaised;
    /*========================================================================== */
    /*@Dev the following address will be used as to hold the token that will be
    minted to the appropiate individuals 
    */
    address creator;
    /*============================================ */

    //@Dev total supply of tokens
    uint256 TotalSupply = (3500000000 * (10 ** 18));

    //@Dev constructor
    constructor() public {
        require(msg.sender != address(0), "Invalid sender address");
        _mint(msg.sender, TotalSupply); //@Dev allocate all tokens to token creator
        creator = msg.sender; //@Dev assign address of token creator
        totalWeiRaised = 0;

    }
    //=======================Modifiers============================
    modifier onlyCreator() {
        require(msg.sender == creator, "only creator can call this function");
        _;
    }
    //===============================================================


    function getWeiRaised() public view returns(uint256 amount) {
        return totalWeiRaised;
    }

    function deductWeiRaised(uint256 amount) public view onlyCreator returns(uint256 balance) {
        require(totalWeiRaised >= amount, "Insufficient balance");
        totalWeiRaised.sub(amount);
        balance = totalWeiRaised;
        return balance;
    }
    /**
     * allows to purchase a certain amount of tokens
     * based of the number ether they have sent to the 
     * contract
     */
    function BuyTokens() external payable {
        require(msg.sender != address(0), "Invalid sender address");
        require(msg.value > 0, "Insufficient funds to purchase tokens");
        totalWeiRaised += (msg.value * 10 ** 18);
        //  emit TokensPurchased(totalWeiRaised);
        uint256 noOfTokens = msg.value.div(price) * 10 ** 18;
        _transfer(creator, msg.sender, noOfTokens);
        //creator.transfer(msg.value); //@Dev send the ether to the creator of the token
        emit TokensPurchased(noOfTokens);
    }





}