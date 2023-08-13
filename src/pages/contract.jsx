const abi = [
  { inputs: [], stateMutability: "nonpayable", type: "constructor" },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "orderId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "customer",
        type: "address",
      },
    ],
    name: "OrderPlaced",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "orderId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "enum OrderTracking.OrderStatus",
        name: "newStatus",
        type: "uint8",
      },
    ],
    name: "OrderStatusUpdated",
    type: "event",
  },
  {
    inputs: [{ internalType: "uint256", name: "_orderId", type: "uint256" }],
    name: "getOrderStatus",
    outputs: [
      {
        internalType: "enum OrderTracking.OrderStatus",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "orderIdCounter",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "orders",
    outputs: [
      { internalType: "uint256", name: "orderId", type: "uint256" },
      { internalType: "address", name: "customer", type: "address" },
      { internalType: "address", name: "supplier", type: "address" },
      { internalType: "uint256", name: "orderAmount", type: "uint256" },
      { internalType: "uint256", name: "timestamp", type: "uint256" },
      {
        internalType: "enum OrderTracking.OrderStatus",
        name: "status",
        type: "uint8",
      },
      { internalType: "string", name: "orderName", type: "string" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_orderAmount", type: "uint256" },
      { internalType: "string", name: "_orderName", type: "string" },
    ],
    name: "placeOrder",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_orderId", type: "uint256" },
      {
        internalType: "enum OrderTracking.OrderStatus",
        name: "_newStatus",
        type: "uint8",
      },
    ],
    name: "updateOrderStatus",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
const contractAddress = "0xd904b39c6e7a65D3B340C216448a3b4FF9f4F7C9";

export default { contractAddress, abi };
