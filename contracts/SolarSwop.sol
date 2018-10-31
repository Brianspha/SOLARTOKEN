pragma solidity ^ 0.4 .24;

import "../math/SafeMath.sol";
import "./HelperFunctions.sol";
import "./XSSToken.sol";
import "./XEUASToken.sol";
import "./IERC20.sol";
import "./SafeERC20.sol";
import "./PlatformToken.sol";

/**
*@dev purpose of contract is allow the admin to add and remove tokens on the platform
 as well as allow people to purchase and trade tokens that are added to the platform
 */
contract SolarSwop is HelperFunctions {
    using SafeMath
    for uint256;

    //@Dev creator
    address Owner;
    //@Dev IDCounter
    uint256 count;


    mapping(address => Token) PlatformTokens; //@Dev the number of tokens deployed on the system
    mapping(address => User) RegisteredUsers; //@Dev number of users registered


    constructor() public {
        require(msg.sender != address(0), "Invalid address");
        Owner = msg.sender; //@Assign owner
        count = 0;
    }
    /*============Modifiers ===============*/
    modifier onlycreator {
        require(msg.sender == Owner);
        _;
    }

    /*===============Modifiers end========= */


    /**  
     * @dev function adds tokens that are exchanged internally
     * @param tokenAddress the token being deplyed onto the platform
     */
    function AddToken(IPlatformToken tokenAddress) public onlycreator {
        require(msg.sender != address(0), "Invalid sender address");
        require(!PlatformTokens[tokenAddress].listed, "Token already listed");
        PlatformTokens[tokenAddress] = Token(tokenAddress, count++, true);
        emit GeneralLogger("Added new token");
    }

    /**
     *@dev function responsible for adding new user to platform
     */
    function UserSignup() public returns(string message) {
        require(msg.sender != address(0), "Invalid sender address");
        require(!RegisteredUsers[msg.sender].Active, "User already registered");
        RegisteredUsers[msg.sender] = User(msg.sender, now, 0, true);
        emit GeneralLogger("Registered user");
        message = "Registered user";
    }

    /**
     *@dev allows user to purchase specificied token
     *@param tokenAddress token which the user wants to purchase
     */
    function BuyToken(IPlatformToken tokenAddress) public payable returns(string message) {
        require(msg.sender != address(0), "Invalid sender address");
        require(tokenAddress != address(0), "Invalid token address");
        require(PlatformTokens[tokenAddress].listed, "Token not listed on platform");
        require(RegisteredUsers[msg.sender].Active, "User not registered");
        IPlatformToken TOK = PlatformTokens[tokenAddress].tokenInstance;
        TOK.BuyTokens.value(msg.value);
        PlatformTokens[tokenAddress].tokenInstance = TOK;
        emit GeneralLogger("Bought tokens succesfully");
        message = "Bought tokens succesfully";
    }
    /**
     *@dev function gets balance of specified token
     *@param function token which the user wants they balance for
     */
    function GetBalance(address tokenAddress) public view returns(uint256 balance) {
        require(tokenAddress != address(0), "Invalid token address");
        require(msg.sender != address(0), "invalid user address");
        require(RegisteredUsers[msg.sender].Active, "User not registered");
        require(PlatformTokens[tokenAddress].listed, "token not listed");
        balance = PlatformTokens[tokenAddress].tokenInstance.balanceOf(msg.sender);
    }

    /**
    function that allows user to widthdraw a certain no of tokens
    * @param to address to which the tokens should be sent to
    * @param tokenAddress the address of the token being traded
    * @param amount the number of tokens
     */
    function TradeToken(address to, address tokenAddress, uint256 amount) public returns(string message) {
        require(msg.sender != address(0), "invalid sender address");
        require(to != address(0), "invalid to address");
        require(amount > 0, "amount must be greater than 0");
        require(RegisteredUsers[msg.sender].Active, "user not registered");
        require(PlatformTokens[tokenAddress].listed, "token not listed");
        PlatformTokens[tokenAddress].tokenInstance.transferFrom(msg.sender, to, amount.mul(10 ** 18));
        message = "Traded tokens succesfully";
        emit GeneralLogger(message);
    }
}