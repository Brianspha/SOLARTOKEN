pragma solidity ^ 0.4 .24;

import "./HelperFunctions.sol";
import "./ERC20.sol";
import "./ERC20Mintable.sol";
import "../ownership/Ownable.sol";
import "../math/SafeMath.sol";
import "./DateTime.sol";
//@Dev contract definition
contract XSSToken is ERC20Mintable, HelperFunctions, Ownable {
    using SafeMath
    for uint256;

    //@Dev string representing the name of the token
    string public tokenName = "SOLARTOKEN";
    //@Dev token acronym
    string public symbol = "XSS";
    uint256 decimals = 18;
    uint256 public constant price = 500000000000000; //@Dev this represents .1 USD this is in wei
    uint256 public constant minTokensToSell = 500;
    uint256 totalWeiRaised;

    /*========================================================================== */
    /*@Dev the following address will be used as to hold the token that will be
    minted to the appropiate individuals 
    */
    address creator;
    address founderAddress;
    address advisorAddress;
    address contingencyStaff;
    address rewardPoints;
    /*========================================================================== */


    /** @dev Token allocation ratios 
     * @dev the number of tokens is multiplied by the number of decimals i.e. 18 hence 10**18 
     */

    uint256 foundersAllocation = (350000000 * (10 ** 18));
    uint256 advisorsAllocation = (87500000 * (10 ** 18));
    uint256 contingencyAllocation = (175000000 * (10 ** 18));
    uint256 rewardPointsAllocation = (175000000 * (10 ** 18));
    uint256 initialSupply = (3500000000 * (10 ** 18)) - foundersAllocation -
        advisorsAllocation -
        contingencyAllocation -
        rewardPointsAllocation; //@Dev create 3.5 bilion tokens


    /*@Dev Token allocation ratios end */

    //@Dev contract constructor called when the contract is intialised and assigns all
    // Existing tokens to contract creator
    constructor(address fAddress, address adAddress, address conStaff, address rPoints) public {
        require(msg.sender != address(0), "Invalid sender address");
        require(fAddress != address(0), "Invalid founder address");
        require(adAddress != address(0), "Invalid advisor address");
        require(conStaff != address(0), "Invalid contigency staff address");
        require(rPoints != address(0), "Invalid reward Points address");

        /*@Dev allocate tokens to relavant token holder accounts*/
        _mint(fAddress, foundersAllocation);
        _mint(adAddress, advisorsAllocation);
        _mint(conStaff, contingencyAllocation);
        _mint(rPoints, rewardPointsAllocation);
        _mint(msg.sender, initialSupply);

        /*@Dev assign relavant addresses to predefined token holder accounts */
        founderAddress = fAddress;
        advisorAddress = adAddress;
        contingencyStaff = conStaff;
        rewardPoints = rPoints;
        creator = msg.sender;
        emit GeneralLogger("Created Token ");
        totalWeiRaised = 0;
    }
    /**
     * allows to purchase a certain amount of tokens
     * based of the number ether they have sent to the 
     * contract
     to get the number tokens user buys 
      (msg.value which is in wei/the price per token)multiplied by the number of decimal places
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
    //=======================Modifiers============================
    modifier onlyCreator() {
        require(msg.sender == creator, "only creator can call this function");
        _;
    }
    //===============================================================
    // =======================To be reviewed=====================================
    function getWeiRaised() public view returns(uint256 amount) {
        return totalWeiRaised;
    }

    function deductWeiRaised(uint256 amount) public view onlyCreator returns(uint256 balance) {
        require(totalWeiRaised >= amount, "Insufficient balance");
        totalWeiRaised.sub(amount);
        balance = totalWeiRaised;
        return balance;
    }


}