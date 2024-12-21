//Necesito traerme los datos de las 3 entidades. 
import UserDAO from "../dao/classes/user.dao.js";
import OrderDAO from "../dao/classes/order.dao.js";
import BusinessDAO from "../dao/classes/business.dao.js";

const userService = new UserDAO(); 
const orderService = new OrderDAO(); 
const businessService = new BusinessDAO(); 

const getOrders = async (req, res) => {
    let result = await orderService.getOrders();
    res.send(result); 
}

const getOrderById = async (req, res) => {
    const { oid } = req.params;
    let order = await orderService.getOrderById(oid);
    res.send(order); 
}

const createOrder = async (req, res) => {
    const {user, business, products} = req.body; 

    const resultUser = await userService.getUserById(user);
    const resultBusiness = await businessService.getBusinessById(business); 
    let actualOrders = resultBusiness.products.filter(product => products.includes(product.id));
    let sum = actualOrders.reduce((acc, prev) => {
        acc+= prev.price
        return acc; 
    }, 0) ; 

    let orderNumber = Date.now() + Math.floor(Math.random() * 10000 + 1);

    let order = {
        number : orderNumber, 
        business, 
        user,
        status: "pending", 
        products: actualOrders.map(product => product.id),
        totalPrice: sum
    }

    let orderResult = await orderService.createOrder(order);
    resultUser.orders.push(orderResult._id);
    await userService.updateUser(user, resultUser);
    res.send(orderResult); 
}

const resolveOrder = async (req, res) => {
    const { resolve } = req.query; 
    let order = await orderService.getOrderById(req.params.oid);
    order.status = resolve; 
    await orderService.resolveOrder(order._id, order); 
    res.send({result: "Orden termianda"}); 
}

export {
    getOrders,
    getOrderById,
    createOrder,
    resolveOrder
}