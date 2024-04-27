// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

//I.bid điều kiện (đấu giá)
//1.thời gian phiên đấu giá còn hoạt động
//2.Giá trị đấu giá lớn hơn giá trị khởi điểm, tại thời điểm đó và > 0

//II. withdraw rút tiền (rút)
//1.người bị out ra khỏi phiên đấu giá(số tiền ng tham gia đấu giá bị thấp hơn số tiền hiện tại)
//2.amount > 0, amount = bid số tiền rút = số tiền đã đặt
//3.after send = 0, sau khi rút thì giá trị ví phải = 0

//III.auctionEnd(kết thúc phiên đấu giá)
//khi nào kêt thúc phiên đấu
//sự kiện: tranfer(chuyển khoản)
//1.tranfer sản phẩm của mình cho người thắng cuộc
//2.tranfer số tiền của người chiến thắng cho người tạo phiên đấu giá



// bao gồm:
// bid: cho phép người dùng đặt cược trong phiên đấu giá.
// withdraw: cho phép người dùng rút tiền từ phiên đấu giá.
// auctionEnd: kết thúc phiên đấu giá và transfer tiền cho người thắng cuộc.
// surplus: trả về số dư hiện tại của hợp đồng thông minh.
// setUpBalance: tăng số dư của người gọi hàm lên 5000.
// timeLeft: trả về thời gian còn lại cho đến khi phiên đấu giá kết thúc.
// checkBalanceBeneficiry: trả về số dư hiện tại của người gọi hàm.

contract Auction {

    address public currentWinner;

    function updateWinner() internal {
    currentWinner = highestBider;
    }


    address payable public beneficiary; 
    // Địa chỉ của người hưởng thụ

    uint public auctionEndTime; 
    // Thời điểm kết thúc phiên đấu giá.

    uint public highestBid; 
    // Giá trị đặt giá cao nhất hiện tại trong phiên đấu giá.

    address public highestBider; 
    // Địa chỉ của người đặt giá cao nhất hiện tại trong phiên đấu giá.

    bool ended; 
    // Biến cờ để kiểm tra xem phiên đấu giá đã kết thúc hay chưa.

    mapping(address => uint) public pendingReturns; 
    // Mapping này theo dõi số tiền mà mỗi địa chỉ có thể rút lại từ phiên đấu giá. 
    //Điều này xảy ra khi họ đã bị vượt qua trong việc đặt giá và cần được hoàn lại tiền.
    mapping(address => uint) public accountBalances; 
    // Mapping mới để theo dõi số dư tài khoản

    //Sự kiện
    event highestBidIncrease(address indexed bidder, uint amount); 
    // Sự kiện được kích hoạt khi có một lần đặt giá mới cao hơn. 
    //Địa chỉ của người đặt giá và số tiền đặt giá được ghi lại.


    event auctionEnded(address winner, uint amount); 
    // Sự kiện được kích hoạt khi phiên đấu giá kết thúc. 
    //Địa chỉ của người thắng cuộc và số tiền đặt giá cao nhất được ghi lại.

    constructor(uint _biddingTime, address payable _beneficiary){
        beneficiary = _beneficiary; // Thiết lập địa chỉ của người hưởng lợi từ phiên đấu giá. 
        //Người này sẽ nhận được tiền từ người thắng cuộc.

        auctionEndTime = block.timestamp + _biddingTime; // Tính toán và thiết lập thời điểm kết thúc 
        //phiên đấu giá dựa trên thời gian đấu giá được cung cấp (_biddingTime) cộng với thời gian hiện tại (block.timestamp).
    }




    // bid: cho phép người dùng đặt cược trong phiên đấu giá.
    function bid() public payable {
        //block.timestamp thời điểm đặt cược
        //giá trị đặt cược phải lớn hơn giá cao nhất
        //ví dụ là: auctionEndTime là 30p mà block.timestamp vượt quá hoặc = 30p thì nó kết thúc
        require(block.timestamp <= auctionEndTime, "Phien dau gia da ket thuc");//không vượt quá
        require(msg.value <= accountBalances[msg.sender], "So du cua ban khong du de dau thau");
        require(msg.value > highestBid, "Gia cua ban thap hon hoac bang gia hien tai");
        if(highestBid != 0){
            // Trả lại Ether cho người đặt giá cao nhất trước đó
            //đặt giá cao nhất đó vào pendingReturns cho người đặt giá cao nhất trước đó (highestBider)
            pendingReturns[highestBider] += highestBid; 
        }
        // Trừ số tiền đặt cược từ stk
        accountBalances[msg.sender] -= msg.value; 

        highestBider  = msg.sender;//Cập nhật giá cao nhất biến highestBider
        highestBid = msg.value; //cập nhật giá trị cao nhất
        updateWinner();  // Cập nhật người thắng cuộc mới
        
        //Increase: tăng
        emit highestBidIncrease(msg.sender, msg.value);
    }

    //Rút tiền
    function withdraw() public returns(bool) {
        // nhập vào địa chỉ thì trả về amount người đó đã đặt
        // amount = này. thì là rút hết tiền
        uint amount = pendingReturns[msg.sender];
        if(amount > 0){
            //Nếu giá trị rút > 0 thì lệnh đc thực hiện
            
            pendingReturns[msg.sender] = 0;//giá trị đầu thầu hiện tại = 0

            accountBalances[msg.sender] += amount; // Cập nhật lại số dư tài khoản

            //gửi amount vào địa chỉ ng nhận msg.sender, nếu khác thì nó hoàn lại số dư
            if (!payable(msg.sender).send(amount)) {
                pendingReturns[msg.sender] = amount; // Nếu gửi không thành công, hoàn lại số dư
                accountBalances[msg.sender] -= amount; // Điều chỉnh lại số dư tài khoản
                return false;//báo giao dịch không thành công
            }
        }
        return true;
    }

    function auctionEnd() public  {
        // Nếu ended là false (nghĩa là phiên đấu giá đã kết thúc), 
        require(!ended, "Phien dau gia da ket thuc");
        require(block.timestamp >= auctionEndTime, "Phien dau gia chua ket thuc");
        require(msg.sender == beneficiary, "Chi nguoi bat dau dau gia moi co the ket thuc phien dau gia");

        ended = true;

        //trả về địa chỉ winner và amount của người đó
        emit auctionEnded(highestBider, highestBid);

        // Cập nhật số dư của người hưởng lợi


        accountBalances[beneficiary] += highestBid;//tăng số dư trong mảng accountBlance 
        //là một đối tượng lưu trữ cặp key-value, với key là tài khoản và value là số dư). 
        // chỉ tồn tại trong bộ nhớ nội bộ của hợp đồng thông minh, 
        //và không có tác động ngoài hợp đồng.
        beneficiary.transfer(highestBid);
        //thực sự chuyển ether từ hợp đồng thông minh tới tài khoản beneficiary.
        //Điều này có tác động lên tình trạng thực tế của tài khoản beneficiary
    }

    function surplus() public view returns (uint balance, address beneficiaryAddress) {
        balance = address(this).balance;// lưu số dư hiện tại của hợp đồng thông minh vào biến balance
        beneficiaryAddress = beneficiary;//gán cái địa chỉ người tạo đấu giá vào biến beneficiaryAddress
    }

    function setUpBalance() public {
        accountBalances[msg.sender] += 5000; // Số dư tối đa là 5000 
    }

    function timeLeft() public view returns (uint) {
        if (block.timestamp >= auctionEndTime) {
            return 0; // Đấu giá đã kết thúc
        } else {
            return auctionEndTime - block.timestamp; // Thời gian còn lại cho đến khi đấu giá kết thúc
        }
        
    }

    function checkBalanceBeneficiry() public view returns (address, uint) {
        return (msg.sender, accountBalances[msg.sender] ); // Trả về số dư hiện tại của người gọi hàm
    }
        // Kiểm tra số dư của một người tham gia
    function checkBalance(address _participant) public view returns (uint) {
        return accountBalances[_participant];
    }
    
}