var ProductsContract = artifacts.require("./ProductsContract.sol");

module.exports = function(deployer) {
	deployer.deploy(ProductsContract);
};