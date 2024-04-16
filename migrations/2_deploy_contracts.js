// Đầu tiên bạn cần yêu cầu contract "Auction"
var Auction = artifacts.require("./Auction.sol");

module.exports = function(deployer) {
  // Thời gian cho phiên đấu giá:
  var biddingTime = 60; // Ví dụ, đặt thời gian đấu giá
  // Địa chỉ của người sẽ nhận tiền từ phiên đấu giá:
  var beneficiary = "0x376cf9212f9e5Cee037752FE0fcEff77fd3076ee"; // Thay "0x..." bằng địa chỉ thật của người hưởng thụ

  // Tiếp theo, sử dụng deployer để triển khai contract với các tham số.
  deployer.deploy(Auction, biddingTime, beneficiary);
};