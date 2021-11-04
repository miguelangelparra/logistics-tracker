const Migrations = artifacts.require("./Migrations");
const ProductsContract = artifacts.require("./ProductsContract");

module.exports = function(deployer) {
    deployer.deploy(Migrations);
    deployer.deploy(ProductsContract);
};
