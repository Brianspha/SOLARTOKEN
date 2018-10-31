import EmbarkJS from 'Embark/EmbarkJS';
//@Dev custom packages start

import $ from 'jquery';
import notify from "bootstrap-notify";

//@Dev custom packages end

//@Dev import contract start
import XSSToken from "Embark/contracts/XSSToken";
import XEUASToken from "Embark/contracts/XEUASToken";

//@Dev import end


//EmbarkJS.onReady(() => {
$(document).ready(() => {
    EmbarkJS.onReady((error) => {
        var selected = document.getElementById("wallets");

        if (error) {
            alert('Error while connecting to web3 ' + error);
        }

        $('.my-inputs').each(function () {
            $(this).on('keyup', function () {
                var val = $('#XSS').val() == '' ? '___' : web3.utils.toWei($('#XSS').val(), "ether");
                val = Math.round(val / 500000000000000);
                $('#result').html("1 Ether will get you " + val * 10 ** 18 + " XSS Tokens");
            });
        });

        $('.my-inputs1').each(function () {
            $(this).on('keyup', function () {
                var val = $('#XEAUS').val() == '' ? '___' : web3.utils.toWei($('#XEAUS').val(), "ether");
                val = Math.round(val / 500000000000000);
                $('#result1').html("1 Ether will get you " + val * 10 ** 18 + " XEAUS Tokens");
            });
        });

        web3.eth.getAccounts(function (err, accounts) {
            console.log("e: " + accounts);
            var x = document.getElementById("wallets");
            for (var i = 0; i < accounts.length; i++) {
                var option = document.createElement("option");
                option.text = accounts[i];
                x.add(option);
            }
        })


        $('#buyXss').click(function (e) {
            var acc = selected.options[selected.selectedIndex].value;
            var amount = document.getElementById("XSS").value;
            XSSToken.methods.BuyTokens().send({
                from: selected.options[selected.length - 1].value,
                gas: 4000000,
                value: amount*10**18
            }).then(function (val, err) {
                if (err) {
                    alert("Something went wrong");
                } else {
                    var value = outputTransactionRecipt(val, "TokensPurchased");
                    $.notify(value, {
                        allow_dismiss: false,
                        placement: {
                            from: 'bottom',
                            align: 'center',
                            delay: 10000,
                            mouse_over: "pause"
                        },
                        animate: {
                            enter: 'animated bounceInDown',
                            exit: 'animated bounceOutUp'
                        }
                    });
                }
            })
        })



        $('#buyXEAUS').click(function (e) {
            var acc = selected.options[selected.selectedIndex].value;
            var amount = document.getElementById("XEAUS").value;
            XEUASToken.methods.BuyTokens().send({
                from: selected.options[selected.length - 1].value,
                gas: 4000000,
                value: amount*10**18
            }).then(function (val, err) {
                if (err) {
                    alert("Something went wrong");
                } else {
                    var value = outputTransactionRecipt(val, "TokensPurchased");
                    $.notify(value, {
                        allow_dismiss: false,
                        placement: {
                            from: 'bottom',
                            align: 'center',
                            delay: 10000,
                            mouse_over: "pause"
                        },
                        animate: {
                            enter: 'animated bounceInDown',
                            exit: 'animated bounceOutUp'
                        }
                    });
                }
            })
        })

        $('#wei').click(function (e) {
            var acc = selected.options[selected.selectedIndex].value;
            XSSToken.methods.getWeiRaised().call({
                from: selected.options[selected.length - 1].value,
                gas: 4000000
            }).then(function (val, err) {
                if (err) {
                    alert("Something went wrong");
                } else {
                    //var value = outputTransactionRecipt(val, "GeneralLogger");
                    $.notify(val + " Total wei raised from token sale of XSSToken", {
                        allow_dismiss: false,
                        placement: {
                            from: 'bottom',
                            align: 'center',
                            delay: 10000,
                            mouse_over: "pause"
                        },
                        animate: {
                            enter: 'animated bounceInDown',
                            exit: 'animated bounceOutUp'
                        }
                    });
                }
            })
        });
        $('#wei1').click(function (e) {
            var acc = selected.options[selected.selectedIndex].value;
            XEUASToken.methods.getWeiRaised().call({
                from: selected.options[selected.length - 1].value,
                gas: 4000000
            }).then(function (val, err) {
                if (err) {
                    alert("Something went wrong");
                } else {
                    //var value = outputTransactionRecipt(val, "GeneralLogger");
                    $.notify(val + " Total wei raised from token sale of XEUASToken", {
                        allow_dismiss: false,
                        placement: {
                            from: 'bottom',
                            align: 'center',
                            delay: 10000,
                            mouse_over: "pause"
                        },
                        animate: {
                            enter: 'animated bounceInDown',
                            exit: 'animated bounceOutUp'
                        }
                    });
                }
            })
        });
        $('#bal').click(function (e) {
            var acc = selected.options[selected.selectedIndex].value;
            XSSToken.methods.balanceOf().call({
                from: selected.options[selected.length - 1].value,
                gas: 4000000
            }).then(function (val, err) {
                if (err) {
                    alert("Something went wrong");
                } else {
                    //var value = outputTransactionRecipt(val, "GeneralLogger");
                    alert(val);
                }
            })
        })

        $('#bal1').click(function (e) {
            var acc = selected.options[selected.selectedIndex].value;
            XEUASToken.methods.balanceOf().call({
                from: selected.options[selected.length - 1].value,
                gas: 4000000
            }).then(function (val, err) {
                if (err) {
                    alert("Something went wrong");
                } else {
                    //var value = outputTransactionRecipt(val, "GeneralLogger");
                    alert(val);
                }
            })
        })

        function outputTransactionRecipt(value, loggerName) {
            var transactionEvents = value.events;
            var returnValues = "";
          //  if (transactionEvents == null) return "an error ocurred";
           // loggerName = (transactionEvents=="TokensPurchased"?transactionEvents.TokensPurchased:loggerName=="Transfer"?transactionEvents.Transfer:null);
         //   if(loggerName ==null) return "an error occured";
            var string = "Address: " + value.address + "\n blockHash: " + value.blockHash + "\n BlockNumber: " + value.blockNumber + "\n event: " + value.event + "\n Id: " + value.id + "\n Value returned: " + value.returnValues[0];
            string += "\n Gasused: " + value.cumulativeGasUsed + "\n TransactionHash : " + value.transactionHash + "\n Transactionstatus: " + value.status;
            let transactionsList = JSON.parse(localStorage.getItem('TransactionsList'));
            returnValues = "success";
            //var toReturn = (returnValues.message != null) ? returnValues.message : returnValues.count; //@Dev if you were to create function within your smart contracts that return various data types you would have to add those variables 
            if (transactionsList == null) {
                transactionsList = [];
                transactionsList.push({
                    Signiture: value.signature,
                    Address: value.address,
                    BlockHash: value.blockHash,
                    BlockNumber: value.blockNumber,
                    GasUsed: value.cumulativeGasUsed,
                    TransactionHash: value.transactionHash,
                    TransactionStatus: value.status,
                    ValueReturned: toReturn
                });
                localStorage.setItem('TransactionsList', JSON.stringify(transactionsList));
                //names in the above conditional statement likes so  (returnValues.message!=null)? returnValues.message:returnValues.count!=null?:returnValues.count: then check for the next thing your looking for etc
            }
            transactionsList.push({
                Signiture: value.signature,
                Address: value.address,
                BlockHash: value.blockHash,
                BlockNumber: value.blockNumber,
                GasUsed: value.cumulativeGasUsed,
                TransactionHash: value.transactionHash,
                TransactionStatus: value.status,
                ValueReturned: toReturn
            });
            localStorage.setItem('TransactionsList', JSON.stringify(transactionsList));
            $.notify(string, {
                allow_dismiss: false,
                placement: {
                    from: 'bottom',
                    align: 'center',
                    delay: 10000,
                    mouse_over: "pause"
                },
                animate: {
                    enter: 'animated bounceInDown',
                    exit: 'animated bounceOutUp'
                }
            });
            return toReturn;
        }

    })
})