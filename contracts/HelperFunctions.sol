pragma solidity 0.4 .24;
import "./IERC20.sol";
import "./IPlatformToken.sol";

//@Dev this Contract sole purpose is to contain functions that will aid other contracts with certain
//Tasks like checking if a string is null or empty
//Created for abstraction purposes
//Also keep common data structures
contract HelperFunctions {


    //@Dev constructor
    constructor() public {

    }

    //@Dev user
    struct User {
        address ID;
        uint signupDate;
        uint256 dividends;
        bool Active;

    }
    //@Dev platform token
    struct Token {
        IPlatformToken tokenInstance;
        uint256 ID;
        bool listed;
    }
    struct _DateTime {
        uint16 year;
        uint8 month;
        uint8 day;
        uint8 hour;
        uint8 minute;
        uint8 second;
        uint8 weekday;
    }
    //@Dev called when user purchases tokens
    event TokensPurchased(uint256 amount);
    //@Dev Used to log messages returned by functions 
    event GeneralLogger(string message);
    //@Dev Converts bytes32 to string
    function bytes32ToString(bytes32 x) pure public returns(string) {
        bytes memory bytesString = new bytes(32);
        uint charCount = 0;
        for (uint j = 0; j < 32; j++) {
            byte char = byte(bytes32(uint(x) * 2 ** (8 * j)));
            if (char != 0) {
                bytesString[charCount] = char;
                charCount++;
            }
        }
        bytes memory bytesStringTrimmed = new bytes(charCount);
        for (j = 0; j < charCount; j++) {
            bytesStringTrimmed[j] = bytesString[j];
        }
        return string(bytesStringTrimmed);
    }

    //@Dev Converts a string to bytes 32 
    function stringToBytes32(string memory x) pure public returns(bytes32 result) {
        require(!isStringNullorEmpty(x)); //@Dev ensure that the string is not null
        bytes memory newString = bytes(x);
        assembly {
            result: = mload(add(newString, 32))
        }
    }
    //@Dev this functions tests if a given string is null or empty by converting it to a type bytes and checking
    //if the length of the bytes is greater than zero   
    function isStringNullorEmpty(string value) pure public returns(bool success) {
        bytes memory tester = bytes(value); //@Dev Uses memory
        success = tester.length == 0;
        return success;
    }

}