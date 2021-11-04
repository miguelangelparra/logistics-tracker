pragma solidity ^0.5.0;

contract ProductsContract {
    struct Product {
        address factory;
        address deliver;
        address client;
    }

    mapping(uint256 => Product) products;
    uint256[] public ProductsList;

    constructor() public {}

    function setFactory(uint256 _id) public {
        /////////////// VALIDAR SI EL ID EXISTE
      //  if (!haveId(_id))
        ///////////////

        products[_id].factory = msg.sender;
        ProductsList.push(_id) - 1;
    }

    function setDeliver(uint256 _id) public {
        products[_id].deliver = msg.sender;
    }

    function setClient(uint256 _id) public {
        products[_id].client = msg.sender;
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
            address
        )
    {
        return (
            products[_id].factory,
            products[_id].deliver,
            products[_id].client
        );
    }

    function countProducts() public view returns (uint256) {
        return ProductsList.length;
    }

   // function haveId(address id) returns (bool) {
     //   if (products[id].isValue) throw; // duplicate key
       // return true;
   // }
}
