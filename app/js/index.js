import EmbarkJS from 'Embark/EmbarkJS';
//@Dev custom packages start

import $ from 'jquery';
import notify from "bootstrap-notify";
import https from 'https';
//@Dev custom packages end

//@Dev import contract start
import XSSToken from "Embark/contracts/XSSToken";
import XEUASToken from "Embark/contracts/XEUASToken";

//@Dev import end


//EmbarkJS.onReady(() => {
$(document).ready(() => {
    EmbarkJS.onReady((error) => {

        /**
         *@dev code for registration page  start
         */
        $(".email-signup").hide();
        $("#signup-box-link").click(function () {
            $(".email-login").fadeOut(100);
            $(".email-signup").delay(100).fadeIn(100);
            $("#login-box-link").removeClass("active");
            $("#signup-box-link").addClass("active");
        });
        $("#login-box-link").click(function () {
            $(".email-login").delay(100).fadeIn(100);;
            $(".email-signup").fadeOut(100);
            $("#login-box-link").addClass("active");
            $("#signup-box-link").removeClass("active");
        });

        /**
         * @dev code for registration end
         */

        /**
         * @dev interaction with CoinAPI start
         */

        var account;
        web3.eth.getAccounts().then(function (e) {
            account = e[0];
            console.log(account);
        })
        global.fetch = require('node-fetch')
        const cc = require('cryptocompare')
        var usdperETH;
        var usdperBTC;

        // Basic Usage:


        // Passing a single pair of currencies:
        cc.price('ETH', 'USD')
            .then(prices => {
                console.log(prices.USD)
                usdperETH = prices.USD;
                $("#ETH").html("ETH in USD: " + usdperETH);
            })
            .catch(console.error)

        cc.price('BTC', 'USD')
            .then(prices => {
                console.log(prices.BTC)
                usdperBTC = prices.USD;
                $("#BTC").html("BTC in USD: " + usdperBTC);

            })
            .catch(console.error)

        //@dev end interaction with coinAPI

        /*
              buy token Form start
           */
        $('.registration-form fieldset:first-child').fadeIn('slow');

        $('.registration-form input[type="text"], .registration-form input[type="password"], .registration-form textarea').focus(function () {
            $(this).removeClass('input-error');
        });

        // next step
        $('.btn-next').click(function () {
            var parent_fieldset = $(this).parents('fieldset');
            var next_step = true;

            parent_fieldset.find('input[type="number"], input[type="password"], textarea').each(function () {
                if ($(this).val() == "") {
                    $(this).addClass('input-error');
                    next_step = false;
                    alert("error");
                } else {
                    $(this).removeClass('input-error');
                }
            });

            if (next_step) {
                parent_fieldset.fadeOut(400, function () {
                    $(this).next().fadeIn();
                });
            }

        });

        /**
         * Smooth Scrolling start
         */
        $("a[href^='#']").click(function(e) {
            e.preventDefault();
            
            var position = $($(this).attr("href")).offset().top;
        
            $("body, html").animate({
                scrollTop: position
            } ,1000 );
        });;

        /**
         * End
         */
        /**
         * @dev sigin button click
         */
        $("#Signin").click(function (e) {
            e.preventDefault();
            window.location.replace("./Main.html");
        });

        /**
         * End
         */
        /**
         * @dev sigin button signup
         */
        $("#SigninM").click(function (e) {
            window.location.replace("./login.html");
        });
        $("#DoneXEUAS").click(function (e) {
            var account;
            web3.eth.getAccounts().then(function (e) {
                account = e[0];
                console.log(account);

                var xeuas = $("#form-Ether1").val();
                xeuas = Math.round(xeuas);
                XEUASToken.methods.BuyTokens().send({
                    from: account,
                    gas: 4000000,
                    value: xeuas * 10 ** 18
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

        })

        $("#DoneXSS").click(function () {
            var account;
            web3.eth.getAccounts().then(function (e) {
                account = e[0];
                console.log(account);
                var xss = $("#form-Ether").val();
                xss = Math.round(xss);
                XSSToken.methods.BuyTokens().send({
                    gas: 4000000,
                    from: account,
                    value: xss * 10 ** 18
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
                            },
                            onShow: function () {
                                this.css({
                                    'width': 'auto',
                                    'height': 'auto'
                                });
                            },
                        });

                    }
                })
            })

        })

        /**
         * View Balance button
         */
        $("#accountBalance").click(function (e) {
            e.preventDefault();
            var address = $("#AccountToView").val();
            if (address == "") {
                $.notify("Invalid address or address box is empty", {
                    allow_dismiss: false,
                    type: "danger",
                    placement: {
                        from: 'bottom',
                        align: 'center',
                        delay: 10000,
                        mouse_over: "pause"
                    },
                    animate: {
                        enter: 'animated bounceInDown',
                        exit: 'animated bounceOutUp'
                    },
                    onShow: function () {
                        this.css({
                            'width': 'auto',
                            'height': 'auto'
                        });
                    },
                });
                return;
            }
            var whichToken = $('#SelectLm option:selected').text();
            if (whichToken == "XSS") {
                web3.eth.getAccounts().then(function (e) {
                    var account = e[0];
                    console.log(account);
                    XSSToken.methods.balanceOf(account).call({
                        gas: 4000000,
                        from: account
                    }).then(function (val, err) {
                        if (err) {
                            $.notify("Something went wrong please try again", {
                                allow_dismiss: false,
                                type: "danger",
                                placement: {
                                    from: 'bottom',
                                    align: 'center',
                                    delay: 10000,
                                    mouse_over: "pause"
                                },
                                animate: {
                                    enter: 'animated bounceInDown',
                                    exit: 'animated bounceOutUp'
                                },
                                onShow: function () {
                                    this.css({
                                        'width': 'auto',
                                        'height': 'auto'
                                    });
                                },
                            });
                        } else
                            $.notify("XSS Token Balance= " + val/10**18, {
                                allow_dismiss: false,
                                type: "success",
                                placement: {
                                    from: 'bottom',
                                    align: 'center',
                                    delay: 10000,
                                    mouse_over: "pause"
                                },
                                animate: {
                                    enter: 'animated bounceInDown',
                                    exit: 'animated bounceOutUp'
                                },
                                onShow: function () {
                                    this.css({
                                        'width': 'auto',
                                        'height': 'auto'
                                    });
                                },
                            });
                        document.getElementById("outPut").innerHTML = "XSS Token Balance= " + val/10**18;
                    })
                })
            } else if (whichToken == "XEAUS") {
                web3.eth.getAccounts().then(function (e) {
                    var account = e[0];
                    console.log(account);
                    XEUASToken.methods.balanceOf(account).call({
                        gas: 4000000,
                        from: account
                    }).then(function (val, err) {
                        if (err) {
                            $.notify("Something went wrong please try again", {
                                allow_dismiss: false,
                                type: "danger",
                                placement: {
                                    from: 'bottom',
                                    align: 'center',
                                    delay: 10000,
                                    mouse_over: "pause"
                                },
                                animate: {
                                    enter: 'animated bounceInDown',
                                    exit: 'animated bounceOutUp'
                                },
                                onShow: function () {
                                    this.css({
                                        'width': 'auto',
                                        'height': 'auto'
                                    });
                                },
                            });
                        } else {
                            $.notify("XEUAS Token Balance= " + val/10**18, {
                                allow_dismiss: false,
                                type: "success",
                                placement: {
                                    from: 'bottom',
                                    align: 'center',
                                    delay: 10000,
                                    mouse_over: "pause"
                                },
                                animate: {
                                    enter: 'animated bounceInDown',
                                    exit: 'animated bounceOutUp'
                                },
                                onShow: function () {
                                    this.css({
                                        'width': 'auto',
                                        'height': 'auto'
                                    });
                                },
                            });
                            document.getElementById("outPut").innerHTML = "XEUAS Token Balance= " + val/10**18;
                        }
                    })
                })
            } else {
                $.notify("Something went wrong please try again", {
                    allow_dismiss: false,
                    type: "danger",
                    placement: {
                        from: 'bottom',
                        align: 'center',
                        delay: 10000,
                        mouse_over: "pause"
                    },
                    animate: {
                        enter: 'animated bounceInDown',
                        exit: 'animated bounceOutUp'
                    },
                    onShow: function () {
                        this.css({
                            'width': 'auto',
                            'height': 'auto'
                        });
                    },
                });
            }


        });
        // previous step
        $('.btn-previous').click(function () {
            $(this).parents('fieldset').fadeOut(400, function () {
                $(this).prev().fadeIn();
            });
        });

        // submit
        $('.registration-form').submit(function (e) {

            $(this).find('input[type="text"], input[type="password"], textarea').each(function () {
                if ($(this).val() == "") {
                    e.preventDefault();
                    $(this).addClass('input-error');
                } else {
                    $(this).removeClass('input-error');
                }
            });

        });
        //@dev auto calculate as no of ether is entered start

        $('#form-Ether').each(function () {
            $(this).on('keyup', function () {
                var ether = $('#form-Ether').val() == '' ? '0' : $('#form-Ether').val();
                if (ether == '') return;
                // $('#form-Ether').html(ether);
                $("#amountCrypto").html(ether + ".0000000000");
                $("#beforeBonus").html(ether * usdperETH);
                $("#AmountAfter").html((ether * usdperETH) + (ether * usdperETH) * 0.045);
                var val = web3.utils.toWei(ether, "ether");
                val = Math.round(val / 500000000000000);
                $('#form-last-tokens').val(val);
            });
        });
        $('#form-last-tokens').each(function () {
            $(this).on('keyup', function () {
                var ether = $('#form-last-tokens').val() == '' ? '0' : $('#form-last-tokens').val();
                if (ether == '') return;
                //  $('#form-last-tokens').html(ether / usdperETH);
                $("#amountCrypto").html((ether / usdperETH) + ".0000000000");
                $("#beforeBonus").html((ether / usdperETH));
                $("#AmountAfter").html((ether / usdperETH) + (ether / usdperETH) * 0.045);
                // var val = web3.utils.toWei(ether, "ether");
                //val = Math.round(val / 500000000000000);
                $('#form-Ether').val(ether / usdperETH);
            });
        });
        $('#form-last-tokens1').each(function () {
            $(this).on('keyup', function () {
                var ether = $('#form-last-tokens1').val() == '' ? '0' : $('#form-last-tokens1').val();
                if (ether == '') return;
                $('#form-Ether1').html(ether / usdperETH);
                $("#amountCrypto1").html((ether / usdperETH) + ".0000000000");
                $("#beforeBonus1").html((ether / usdperETH));
                $("#AmountAfter1").html((ether / usdperETH) + (ether / usdperETH) * 0.045);
                // var val = web3.utils.toWei(ether, "ether");
                //val = Math.round(val / 500000000000000);
                $('#form-Ether1').val(ether / usdperETH);
            });
        });
        $('#form-Ether1').each(function () {
            $(this).on('keyup', function () {
                var ether = $('#form-Ether1').val() == '' ? '0' : $('#form-Ether1').val();
                if (ether == '') return;
                $('#form-Ether1').html(ether);
                $("#amountCrypto1").html(ether + ".0000000000");
                $("#beforeBonus1").html(ether * usdperETH);
                $("#AmountAfter1").html((ether * usdperETH) + (ether * usdperETH) * 0.045);
                var val = web3.utils.toWei(ether, "ether");
                val = Math.round(val / 500000000000000);
                $('#form-last-tokens1').val(val);
            });
        });
        //@dev end calculate
        //@dev end buy tokens form


        /**
         * 
         * @param value value returned by the blockchain 
         * @param loggerName name of the logger with which we want returns value of 
         */
        function outputTransactionRecipt(value, loggerName) {
            var transactionEvents = value.events;
            var temp = loggerName;
            var returnValues = "";
            if (!transactionEvents) return "an error ocurred";
            loggerName = (loggerName == "TokensPurchased" ? transactionEvents.TokensPurchased : loggerName == "Transfer" ? transactionEvents.Transfer : null);
            if (!loggerName) return "Succesful Transaction error printing transaction hash";
            var string = "Address: " + loggerName.address + "\n blockHash: " + loggerName.blockHash + "\n BlockNumber: " + loggerName.blockNumber + "\n event: " + loggerName.event + "\n Id: " + loggerName.id + "\n Value returned: " + loggerName.returnValues[0];
            string += "\n Gasused: " + loggerName.cumulativeGasUsed + "\n TransactionHash : " + loggerName.transactionHash + "\n Transactionstatus: " + value.status;
            let transactionsList = JSON.parse(localStorage.getItem('TransactionsList'));
            returnValues = value.status == "0x1" ? "Succesfull Transaction" : "Something went wrong during transaction";
            var toReturn = (returnValues.message != null) ? returnValues.message : returnValues.count; //@Dev if you were to create function within your smart contracts that return various data types you would have to add those variables 
            if (transactionsList == null) {
                transactionsList = [];
                }
            transactionsList.push({
                Signiture: loggerName.signature,
                Address: loggerName.address,
                BlockHash: loggerName.blockHash,
                BlockNumber: value.blockNumber,
                GasUsed: value.cumulativeGasUsed,
                TransactionHash: loggerName.transactionHash,
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
