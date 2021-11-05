pragma solidity ^0.5.0;

contract ProductsContract {
    address owner;

    struct Product {
        uint256 id;
        address factory;
        address payable deliver;
        address client;
        uint price;
    }

    mapping(uint256 => Product) products;
    uint256[] public ProductsList;

    constructor() public {
        owner = msg.sender;
    }

    function setFactory(uint256 _id, uint _price) public {
        require(!idExist(_id), "this Id exists yet!");
        products[_id].id = _id;
        products[_id].factory = msg.sender;
        products[_id].price = _price;
        ProductsList.push(_id) - 1;
    }

    function setDeliver(uint256 _id) public {
        products[_id].deliver = msg.sender;
    }

    function setClient(uint256 _id) public payable {
        require(msg.value == products[_id].price, "Algo Paso en el requerimiento");
        products[_id].client = msg.sender;
        products[_id].deliver.transfer(products[_id].price / 5);
    }

    function getProducts() public view returns (uint256[] memory) {
        return ProductsList;
    }

    function getProduct(uint256 _id)
        public
        view
        returns (
            address,
            address,
            address,
            uint
        )
    {
        return (
            products[_id].factory,
            products[_id].deliver,
            products[_id].client,
            products[_id].price
        );
    }

    function countProducts() public view returns (uint256) {
        return ProductsList.length;
    }

    function idExist(uint256 _id) private returns (bool) {
        if (products[_id].id == 0) {
            return false;
        }
        return true;
    }

    //
    function withdraw() public {
        require(msg.sender == owner);
        msg.sender.transfer(address(this).balance);
    }

    function getBalance() public view returns (uint256) {
        require(msg.sender == owner);
        return address(this).balance;
    }
}
