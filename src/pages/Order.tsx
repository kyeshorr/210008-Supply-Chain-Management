import React, { useState, useEffect } from "react";
import { Container, Table, Form, Button } from "react-bootstrap";
import { ethers} from "ethers";
import "../index.css";
import ColorSchemesExample from "../components/Nav";
const Order = () => {
  const [itemName, setItemName] = useState("");
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [orderStatus, setOrderStatus] = useState("");
  const [error, setError] = useState("");
  const [contract, setContract] = useState(null);
  const [conntected, SetConnected] = useState(false);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const contractAddress = "0x9596eBF9315A0601db951303e62abA393835BdEa";
    const contractABI = [
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "string",
            name: "name",
            type: "string",
          },
        ],
        name: "ItemCreated",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
        ],
        name: "ItemDelivered",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
        ],
        name: "ItemShipped",
        type: "event",
      },
      {
        inputs: [{ internalType: "string", name: "_name", type: "string" }],
        name: "createItem",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [{ internalType: "uint256", name: "_itemId", type: "uint256" }],
        name: "deliverItem",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "itemCount",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        name: "items",
        outputs: [
          { internalType: "uint256", name: "id", type: "uint256" },
          { internalType: "string", name: "name", type: "string" },
          {
            internalType: "enum SupplyChain.ItemStatus",
            name: "status",
            type: "uint8",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [{ internalType: "uint256", name: "_itemId", type: "uint256" }],
        name: "shipItem",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
    ];

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    setContract(contract);
  }, []);
  useEffect(() => {
    // Fetch and update orders from the blockchain
    const fetchOrders = async () => {
      if (!contract) return;

      const count = await contract.itemCount();
      const fetchedOrders = [];
      for (let i = 0; i < count; i++) {
        const order = await contract.items(i);
        fetchedOrders.push(order);
      }
      setOrders(fetchedOrders);
    };

    fetchOrders();
  }, [contract]);
  console.log(orders);
  const handleOrder = async (e) => {
    e.preventDefault();

    try {
      if (!contract) {
        console.error("Contract not initialized.");
        return;
      }

      // Estimate gas and gasPrice
      const gasEstimate = await contract.estimateGas.createItem(itemName);
      const gasPrice = await contract.provider.getGasPrice();

      const tx = await contract.createItem(itemName, {
        gasLimit: gasEstimate.mul(2),
        gasPrice: gasPrice,
      });

      await tx.wait();

      setIsOrderPlaced(true);
      setOrderStatus("Created");
      setError("");
      alert(`Order Created . Item Name: ${itemName}`)
      window.location.reload()
    } catch (error) {
      setError("Order error: " + error.message);
    }
  };

  const connectToMetaMask = async () => {
    try {
      if (typeof window.ethereum === "undefined") {
        console.error("MetaMask is not installed or not detected.");
        return;
      }

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      if (accounts.length > 0) {
        // SetConnected(true);
      }
    } catch (error) {
      console.error("MetaMask connection error:", error);
    }
  };
  function myFunction() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[1]; // Assuming you're filtering by item name
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }
  console.log(orders);
  return (
    <>
      <ColorSchemesExample />
      <Container>
        <center>
          <h1>Place Order</h1>
        </center>
          <center>
            {" "}
            <Button variant="primary" onClick={connectToMetaMask}>
              Connect to MetaMask
            </Button>
          </center>
        <br />

        <Form onSubmit={handleOrder}>
          <Form.Group className="mb-3" controlId="itemName">
            <Form.Label>
              <h3>Item Name</h3>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Item Name"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
          </Form.Group>

          <div>
            <Button variant="primary" type="submit">
              Place Order
            </Button>
          </div>
        </Form>
        <br />
        <br />
        {error && <p className="error">{error}</p>}
        {isOrderPlaced && (
          <div>
            <p>Your order for {itemName} has been placed.</p>
          </div>
        )}
        <h2>Order History</h2>
        <div className="containerBox">
          <input
            type="text"
            id="myInput"
            onKeyUp={myFunction}
            placeholder="Search for Items"
            title="Type in a name"
          />
          <Table striped bordered hover id="myTable">
            <thead>
              <tr>
                <th>ID</th>
                <th>Item Name</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id._hex}>
                  <td>{order.id._hex}</td>
                  <td>{order.name}</td>
                  <td>
                    {order.status == 0
                      ? "Order Placed"
                      : order.status == 2
                      ? "Order Shipped"
                      : "Order Delivered"}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Container>
    </>
  );
};

export default Order;
